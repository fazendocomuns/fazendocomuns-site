import { uploadFile } from '@/lib/supabase/upload'
import { supabase } from '@/lib/supabase/client'
import type { MediaItem } from '@/features/admin/types'
import type { Database } from '@/types/database'

type MidiaRow = Database['public']['Tables']['midia']['Row']

const DEFAULT_BUCKET = 'fotos'
const FOLDER_KEEP = '.keep'

function bucketForMime(mime: string): string {
  if (mime.startsWith('audio/')) return 'podcast'
  if (mime === 'application/pdf' || mime.startsWith('application/')) return 'documentos'
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
  const ext = fileName.split('.').pop() ?? 'bin'
  const unique = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`
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
  const { error } = await supabase.storage.from(DEFAULT_BUCKET).upload(path, new Blob(['']), {
    upsert: true,
    contentType: 'text/plain',
  })

  if (error && !/exists|duplicate/i.test(error.message)) {
    throw error
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
): Promise<MediaItem[]> {
  const results: MediaItem[] = []
  const errors: string[] = []

  for (const file of files) {
    try {
      results.push(await uploadMidiaAsset(file, uploadedBy, folder))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'erro desconhecido'
      errors.push(`${file.name}: ${message}`)
    }
  }

  if (results.length === 0 && errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  return results
}

export async function deleteMidia(id: string) {
  const { data, error } = await supabase.from('midia').select('bucket, path').eq('id', id).single()
  if (error) throw error

  await supabase.storage.from(data.bucket).remove([data.path])
  const { error: deleteError } = await supabase.from('midia').delete().eq('id', id)
  if (deleteError) throw deleteError
}
