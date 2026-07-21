import { uploadFile } from '@/lib/supabase/upload'
import { supabase } from '@/lib/supabase/client'
import type { MediaItem } from '@/features/admin/types'
import type { Database } from '@/types/database'

type MidiaRow = Database['public']['Tables']['midia']['Row']

const DEFAULT_BUCKET = 'fotos'
/** Marcador de pasta vazia — precisa ser image/* por causa do MIME do bucket `fotos`. */
const FOLDER_KEEP = '.keep.png'
const FOLDER_KEEP_PNG = Uint8Array.from(
  atob(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  ),
  (c) => c.charCodeAt(0),
)

function bucketForMime(mime: string): string {
  if (mime.startsWith('audio/')) return 'podcast'
  if (
    mime === 'application/pdf' ||
    mime.startsWith('application/msword') ||
    mime.includes('officedocument')
  ) {
    return 'documentos'
  }
  // Imagens e vídeos ficam em `fotos` (MIME ampliado na migration)
  return DEFAULT_BUCKET
}

function formatSize(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Normaliza caminho de pasta: `Podcast/Ep 1` → `podcast/ep-1` */
export function normalizeFolder(input: string): string {
  return input
    .trim()
    .replace(/\\/g, '/')
    .replace(/^\/+|\/+$/g, '')
    .split('/')
    .map((segment) =>
      segment
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    )
    .filter(Boolean)
    .join('/')
}

export function folderFromPath(path: string): string {
  const parts = path.split('/').filter(Boolean)
  if (parts.length <= 1) return ''
  if (parts[parts.length - 1] === FOLDER_KEEP) {
    return parts.slice(0, -1).join('/')
  }
  return parts.slice(0, -1).join('/')
}

function buildStoragePath(folder: string, fileName: string): string {
  const ext = fileName.includes('.') ? (fileName.split('.').pop() ?? 'bin') : 'bin'
  const unique = `${crypto.randomUUID()}.${ext.toLowerCase()}`
  const normalized = normalizeFolder(folder)
  return normalized ? `${normalized}/${unique}` : unique
}

function mapMediaType(mime: string): Database['public']['Enums']['media_type'] {
  if (mime.startsWith('video/')) return 'video'
  if (mime.startsWith('audio/')) return 'audio'
  if (mime.startsWith('image/')) return 'image'
  return 'document'
}

function mapMidia(row: MidiaRow): MediaItem {
  const type =
    row.media_type === 'video'
      ? 'video'
      : row.media_type === 'document'
        ? 'document'
        : row.media_type === 'audio'
          ? 'audio'
          : 'image'

  return {
    id: row.id,
    name: row.name,
    url: row.public_url,
    type,
    size: formatSize(row.size_bytes),
    uploadedAt: row.created_at,
    alt: row.alt ?? row.name,
    folder: folderFromPath(row.path),
  }
}

export async function fetchMidia() {
  const { data, error } = await supabase
    .from('midia')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapMidia)
}

/** Lista pastas conhecidas (prefixos em midia + marcadores .keep no Storage). */
export async function listMidiaFolders(): Promise<string[]> {
  const folders = new Set<string>()

  const items = await fetchMidia()
  for (const item of items) {
    if (!item.folder) continue
    const parts = item.folder.split('/')
    for (let i = 1; i <= parts.length; i += 1) {
      folders.add(parts.slice(0, i).join('/'))
    }
  }

  async function walk(prefix: string) {
    const { data, error } = await supabase.storage.from(DEFAULT_BUCKET).list(prefix || undefined, {
      limit: 1000,
      sortBy: { column: 'name', order: 'asc' },
    })
    if (error || !data) return

    for (const entry of data) {
      const fullPath = prefix ? `${prefix}/${entry.name}` : entry.name
      if (entry.name === FOLDER_KEEP) {
        if (prefix) folders.add(prefix)
        continue
      }
      // No Storage, pastas vêm com id null
      if (entry.id === null) {
        folders.add(fullPath)
        await walk(fullPath)
      }
    }
  }

  try {
    await walk('')
  } catch {
    // Storage list é complementar; pastas derivadas de midia já bastam
  }

  return [...folders].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

export async function createMidiaFolder(folderInput: string) {
  const folder = normalizeFolder(folderInput)
  if (!folder) throw new Error('Informe um nome de pasta válido.')

  const path = `${folder}/${FOLDER_KEEP}`
  const { error } = await supabase.storage.from(DEFAULT_BUCKET).upload(
    path,
    new Blob([FOLDER_KEEP_PNG], { type: 'image/png' }),
    {
      upsert: true,
      contentType: 'image/png',
    },
  )

  if (error && !/exists|duplicate|already/i.test(error.message)) {
    throw error
  }

  return folder
}

const MEDIA_BUCKETS = ['fotos', 'podcast', 'documentos', 'avatars', 'editoriais', 'noticias', 'livros'] as const

async function listStoragePathsUnder(bucket: string, folder: string): Promise<string[]> {
  const paths: string[] = []

  async function walk(prefix: string) {
    const { data, error } = await supabase.storage.from(bucket).list(prefix || undefined, {
      limit: 1000,
      sortBy: { column: 'name', order: 'asc' },
    })
    if (error || !data) return

    for (const entry of data) {
      const fullPath = prefix ? `${prefix}/${entry.name}` : entry.name
      if (entry.id === null) {
        await walk(fullPath)
        continue
      }
      paths.push(fullPath)
    }
  }

  await walk(folder)
  return paths
}

function rewritePathPrefix(path: string, fromFolder: string, toFolder: string): string {
  if (path === fromFolder || path.startsWith(`${fromFolder}/`)) {
    return `${toFolder}${path.slice(fromFolder.length)}`
  }
  return path
}

/** Renomeia pasta (e subpastas/arquivos) no Storage + tabela midia. */
export async function renameMidiaFolder(fromFolderInput: string, toNameOrPath: string) {
  const fromFolder = normalizeFolder(fromFolderInput)
  if (!fromFolder) throw new Error('Pasta de origem inválida.')

  const parent = fromFolder.includes('/') ? fromFolder.split('/').slice(0, -1).join('/') : ''
  const toFolder = toNameOrPath.includes('/')
    ? normalizeFolder(toNameOrPath)
    : normalizeFolder(parent ? `${parent}/${toNameOrPath}` : toNameOrPath)

  if (!toFolder) throw new Error('Informe um nome de pasta válido.')
  if (toFolder === fromFolder) return toFolder
  if (toFolder.startsWith(`${fromFolder}/`)) {
    throw new Error('A pasta de destino não pode ficar dentro dela mesma.')
  }

  const existing = await listMidiaFolders()
  if (existing.includes(toFolder)) {
    throw new Error('Já existe uma pasta com esse nome.')
  }

  const { data: rows, error } = await supabase
    .from('midia')
    .select('id, bucket, path')
    .like('path', `${fromFolder}/%`)

  if (error) throw error

  for (const row of rows ?? []) {
    const nextPath = rewritePathPrefix(row.path, fromFolder, toFolder)
    if (nextPath === row.path) continue

    const { error: moveError } = await supabase.storage.from(row.bucket).move(row.path, nextPath)
    if (moveError) throw moveError

    const { data: urlData } = supabase.storage.from(row.bucket).getPublicUrl(nextPath)
    const { error: updateError } = await supabase
      .from('midia')
      .update({ path: nextPath, public_url: urlData.publicUrl })
      .eq('id', row.id)
    if (updateError) throw updateError
  }

  for (const bucket of MEDIA_BUCKETS) {
    const storagePaths = await listStoragePathsUnder(bucket, fromFolder)
    for (const path of storagePaths) {
      const nextPath = rewritePathPrefix(path, fromFolder, toFolder)
      if (nextPath === path) continue
      // Já movido via midia acima
      if ((rows ?? []).some((r) => r.bucket === bucket && r.path === path)) continue
      const { error: moveError } = await supabase.storage.from(bucket).move(path, nextPath)
      if (moveError && !/not found|not_found/i.test(moveError.message)) {
        throw moveError
      }
    }
  }

  return toFolder
}

/** Exclui pasta, arquivos internos (Storage + midia) e marcador .keep. */
export async function deleteMidiaFolder(folderInput: string) {
  const folder = normalizeFolder(folderInput)
  if (!folder) throw new Error('Pasta inválida.')

  const { data: rows, error } = await supabase
    .from('midia')
    .select('id, bucket, path')
    .like('path', `${folder}/%`)

  if (error) throw error

  for (const row of rows ?? []) {
    await supabase.storage.from(row.bucket).remove([row.path])
    const { error: deleteError } = await supabase.from('midia').delete().eq('id', row.id)
    if (deleteError) throw deleteError
  }

  for (const bucket of MEDIA_BUCKETS) {
    const storagePaths = await listStoragePathsUnder(bucket, folder)
    if (storagePaths.length) {
      await supabase.storage.from(bucket).remove(storagePaths)
    }
  }

  return folder
}

export async function uploadMidiaAsset(
  file: File,
  uploadedBy?: string,
  folder = '',
): Promise<MediaItem> {
  const normalizedFolder = normalizeFolder(folder)
  const path = buildStoragePath(normalizedFolder, file.name)
  const bucket = bucketForMime(file.type)

  const { publicUrl } = await uploadFile({ bucket, path, file, upsert: false })

  const { data, error } = await supabase
    .from('midia')
    .insert({
      name: file.name,
      bucket,
      path,
      public_url: publicUrl,
      mime_type: file.type || null,
      size_bytes: file.size,
      media_type: mapMediaType(file.type),
      alt: file.name,
      uploaded_by: uploadedBy ?? null,
    })
    .select('*')
    .single()

  if (error) throw error
  return mapMidia(data)
}

export async function uploadMidiaAssets(
  files: File[],
  uploadedBy?: string,
  folder = '',
  onProgress?: (done: number, total: number, fileName: string) => void,
): Promise<{ uploaded: MediaItem[]; errors: string[] }> {
  const uploaded: MediaItem[] = []
  const errors: string[] = []

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    onProgress?.(i, files.length, file.name)
    try {
      uploaded.push(await uploadMidiaAsset(file, uploadedBy, folder))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'erro desconhecido'
      errors.push(`${file.name}: ${message}`)
    }
  }

  onProgress?.(files.length, files.length, '')

  if (uploaded.length === 0 && errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  return { uploaded, errors }
}

/** Move um arquivo de mídia para outra pasta (ou raiz). */
export async function moveMidiaAsset(id: string, targetFolderInput = '') {
  const targetFolder = normalizeFolder(targetFolderInput)

  const { data: row, error } = await supabase
    .from('midia')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error

  const currentFolder = folderFromPath(row.path)
  if (currentFolder === targetFolder) {
    return mapMidia(row)
  }

  const fileName = row.path.split('/').pop() ?? `${crypto.randomUUID()}.bin`
  const nextPath = targetFolder ? `${targetFolder}/${fileName}` : fileName

  const { error: moveError } = await supabase.storage.from(row.bucket).move(row.path, nextPath)
  if (moveError) throw moveError

  const { data: urlData } = supabase.storage.from(row.bucket).getPublicUrl(nextPath)
  const { data, error: updateError } = await supabase
    .from('midia')
    .update({ path: nextPath, public_url: urlData.publicUrl })
    .eq('id', id)
    .select('*')
    .single()
  if (updateError) throw updateError

  if (targetFolder) {
    await createMidiaFolder(targetFolder).catch(() => undefined)
  }

  return mapMidia(data)
}

export async function deleteMidia(id: string) {
  const { data, error } = await supabase.from('midia').select('bucket, path').eq('id', id).single()
  if (error) throw error

  await supabase.storage.from(data.bucket).remove([data.path])
  const { error: deleteError } = await supabase.from('midia').delete().eq('id', id)
  if (deleteError) throw deleteError
}
