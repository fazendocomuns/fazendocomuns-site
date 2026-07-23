import { uploadFile } from '@/lib/supabase/upload'
import { supabase } from '@/lib/supabase/client'
import type { MediaItem } from '@/features/admin/types'
import type { Database } from '@/types/database'

type MidiaRow = Database['public']['Tables']['midia']['Row']

/** Buckets da biblioteca de mídia (por tipo de arquivo). */
export const LIBRARY_BUCKETS = [
  'biblioteca-de-imagens',
  'podcast',
  'livros',
  'documentos',
] as const
export type LibraryBucket = (typeof LIBRARY_BUCKETS)[number]

export const LIBRARY_BUCKET_OPTIONS: Array<{
  value: LibraryBucket
  label: string
  hint: string
}> = [
  {
    value: 'biblioteca-de-imagens',
    label: 'Biblioteca de imagens',
    hint: 'Imagens e vídeos',
  },
  { value: 'podcast', label: 'Podcast', hint: 'Áudio' },
  { value: 'livros', label: 'Livros / PDF', hint: 'PDFs e e-books' },
  { value: 'documentos', label: 'Documentos', hint: 'Outros arquivos de texto' },
]

/** Marcador visível de pasta vazia (image/png). */
const FOLDER_KEEP = '_keep.png'
const LEGACY_FOLDER_KEEP = '.keep.png'
const FOLDER_KEEP_PNG = Uint8Array.from(
  atob(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  ),
  (c) => c.charCodeAt(0),
)

const EXT_MIME: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  heic: 'image/heic',
  heif: 'image/heif',
  avif: 'image/avif',
  mp4: 'video/mp4',
  webm: 'video/webm',
  mov: 'video/quicktime',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  aac: 'audio/aac',
  m4a: 'audio/mp4',
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

const MIME_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
  'image/heic': 'heic',
  'image/heif': 'heif',
  'image/avif': 'avif',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/quicktime': 'mov',
  'audio/mpeg': 'mp3',
  'audio/mp3': 'mp3',
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
  'audio/aac': 'aac',
  'audio/mp4': 'm4a',
  'application/pdf': 'pdf',
}

function extensionFromName(fileName: string): string {
  if (!fileName.includes('.')) return ''
  const ext = (fileName.split('.').pop() ?? '').toLowerCase()
  if (!ext || ext.length > 8 || !/^[a-z0-9]+$/.test(ext)) return ''
  return ext
}

/** Detecta MIME pelos magic bytes quando o browser não informa o tipo. */
async function sniffMimeFromBytes(file: File): Promise<string | null> {
  const buffer = await file.slice(0, 16).arrayBuffer()
  const bytes = new Uint8Array(buffer)
  if (bytes.length < 4) return null

  // JPEG
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
  // PNG
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return 'image/png'
  }
  // GIF
  if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) return 'image/gif'
  // WEBP: RIFF....WEBP
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return 'image/webp'
  }
  // PDF
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) {
    return 'application/pdf'
  }
  // MP3 ID3
  if (bytes[0] === 0x49 && bytes[1] === 0x44 && bytes[2] === 0x33) return 'audio/mpeg'
  // MP3 frame sync
  if (bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0) return 'audio/mpeg'
  // WAV: RIFF....WAVE
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x41 &&
    bytes[10] === 0x56 &&
    bytes[11] === 0x45
  ) {
    return 'audio/wav'
  }
  // MP4/MOV/M4A: ....ftyp
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) {
    const brand = String.fromCharCode(bytes[8] ?? 0, bytes[9] ?? 0, bytes[10] ?? 0, bytes[11] ?? 0)
    if (brand.startsWith('qt')) return 'video/quicktime'
    if (brand.includes('M4A') || brand.includes('mp4a')) return 'audio/mp4'
    return 'video/mp4'
  }

  return null
}

async function resolveMime(file: File): Promise<string> {
  if (file.type && file.type !== 'application/octet-stream') return file.type

  const ext = extensionFromName(file.name)
  if (ext && EXT_MIME[ext]) return EXT_MIME[ext]

  const sniffed = await sniffMimeFromBytes(file)
  if (sniffed) return sniffed

  return 'application/octet-stream'
}

function formatStorageError(err: unknown, fileName?: string, mime?: string): Error {
  const message = err instanceof Error ? err.message : String(err)
  const prefix = fileName ? `${fileName}: ` : ''
  const mimeHint = mime ? ` (tipo detectado: ${mime})` : ''
  if (/mime type|not supported|invalid.*mime|content.?type/i.test(message)) {
    return new Error(
      `${prefix}tipo de arquivo não permitido no Storage${mimeHint}. Tente renomear com extensão (.jpg, .png, .mp4…). Detalhe: ${message}`,
    )
  }
  if (/payload|too large|maximum|413/i.test(message)) {
    return new Error(`${prefix}arquivo grande demais (limite 100 MB).`)
  }
  if (/row-level security|permission|not authorized|jwt/i.test(message)) {
    return new Error(`${prefix}sem permissão de upload. Faça login novamente como admin.`)
  }
  return new Error(`${prefix}${message}`)
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

/** Se o 1º segmento da pasta for um bucket reservado, usa esse bucket. */
export function inferBucketFromFolderPath(folderPath: string): LibraryBucket | null {
  const root = normalizeFolder(folderPath).split('/')[0]
  if (!root) return null
  if ((LIBRARY_BUCKETS as readonly string[]).includes(root)) {
    return root as LibraryBucket
  }
  return null
}

function isFolderKeep(name: string): boolean {
  return name === FOLDER_KEEP || name === LEGACY_FOLDER_KEEP
}

export function folderFromPath(path: string): string {
  const parts = path.split('/').filter(Boolean)
  if (parts.length <= 1) return ''
  if (isFolderKeep(parts[parts.length - 1] ?? '')) {
    return parts.slice(0, -1).join('/')
  }
  return parts.slice(0, -1).join('/')
}

function bucketForMime(mime: string): LibraryBucket {
  if (mime.startsWith('audio/')) return 'podcast'
  if (
    mime === 'application/pdf' ||
    mime.startsWith('application/msword') ||
    mime.includes('officedocument')
  ) {
    return 'livros'
  }
  if (mime.startsWith('text/')) return 'documentos'
  // Imagens e vídeos
  return 'biblioteca-de-imagens'
}

function sanitizeBaseName(fileName: string): string {
  const withoutExt = fileName.includes('.')
    ? fileName.slice(0, fileName.lastIndexOf('.'))
    : fileName
  const clean = withoutExt
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._\-\s]+/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
    .slice(0, 120)
  return clean || 'arquivo'
}

function buildPreferredFileName(fileName: string, mime: string): string {
  const ext = extensionFromName(fileName) || MIME_EXT[mime] || 'bin'
  return `${sanitizeBaseName(fileName)}.${ext}`
}

/** Nome exibido (mantém espaços/acentos leves; remove só path separators). */
export function resolveDisplayName(input: string, mime = '', fallbackExt = 'bin'): string {
  const trimmed = input.trim()
  const ext =
    extensionFromName(trimmed) ||
    (mime ? MIME_EXT[mime] : undefined) ||
    fallbackExt
  const baseRaw = trimmed.includes('.')
    ? trimmed.slice(0, trimmed.lastIndexOf('.'))
    : trimmed
  const base = baseRaw.replace(/[\\/]+/g, '-').trim().slice(0, 120) || 'arquivo'
  return `${base}.${ext}`
}

/** Detecta nomes genéricos (ex.: IDs do Google Drive). */
export function looksGenericFileName(fileName: string): boolean {
  const base = fileName.includes('.')
    ? fileName.slice(0, fileName.lastIndexOf('.'))
    : fileName
  if (base.length < 16) return false
  // Só letras/números/_/- sem espaços e bem longo
  if (!/^[A-Za-z0-9_-]+$/.test(base)) return false
  if (base.length >= 20 && /[0-9]/.test(base) && /[A-Za-z]/.test(base)) return true
  return false
}

/** Subpastas imediatas a partir de uma lista de pastas. */
export function childFolderNames(allFolders: string[], current: string): string[] {
  const prefix = current ? `${current}/` : ''
  const names = new Set<string>()

  for (const folder of allFolders) {
    if (current) {
      if (!folder.startsWith(prefix)) continue
      const rest = folder.slice(prefix.length)
      const segment = rest.split('/')[0]
      if (segment) names.add(segment)
    } else {
      const segment = folder.split('/')[0]
      if (segment) names.add(segment)
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

async function storageObjectExists(bucket: string, path: string): Promise<boolean> {
  const folder = path.includes('/') ? path.slice(0, path.lastIndexOf('/')) : ''
  const name = path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path
  const { data, error } = await supabase.storage.from(bucket).list(folder || undefined, {
    limit: 1000,
    search: name,
  })
  if (error || !data) return false
  return data.some((entry) => entry.name === name)
}

/** Caminho no Storage com nome legível; se já existir, sufixa -2, -3… */
async function buildStoragePath(
  bucket: string,
  folder: string,
  fileName: string,
  mime: string,
): Promise<string> {
  const preferred = buildPreferredFileName(fileName, mime)
  const ext = extensionFromName(preferred) || MIME_EXT[mime] || 'bin'
  const base = sanitizeBaseName(preferred)
  const normalized = normalizeFolder(folder)

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const name = attempt === 0 ? `${base}.${ext}` : `${base}-${attempt + 1}.${ext}`
    const path = normalized ? `${normalized}/${name}` : name
    if (!(await storageObjectExists(bucket, path))) return path
  }

  const fallback = `${base}-${crypto.randomUUID().slice(0, 8)}.${ext}`
  return normalized ? `${normalized}/${fallback}` : fallback
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

function collectFolderPrefixes(folder: string, into: Set<string>) {
  if (!folder) return
  const parts = folder.split('/')
  for (let i = 1; i <= parts.length; i += 1) {
    into.add(parts.slice(0, i).join('/'))
  }
}

export function foldersFromMidiaItems(
  items: Array<{ folder?: string | null }>,
): string[] {
  const folders = new Set<string>()
  for (const item of items) {
    collectFolderPrefixes(item.folder ?? '', folders)
  }
  return [...folders].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

/** Lista pastas vazias no Storage (marcadores). Pastas com arquivos vêm da tabela midia. */
export async function listStorageFolderMarkers(): Promise<string[]> {
  const folders = new Set<string>()

  async function walk(bucket: string, prefix: string): Promise<void> {
    const { data, error } = await supabase.storage.from(bucket).list(prefix || undefined, {
      limit: 1000,
      sortBy: { column: 'name', order: 'asc' },
    })
    if (error || !data) return

    const nested: Promise<void>[] = []

    for (const entry of data) {
      const fullPath = prefix ? `${prefix}/${entry.name}` : entry.name
      if (isFolderKeep(entry.name)) {
        if (prefix) folders.add(prefix)
        continue
      }
      if (entry.id === null) {
        folders.add(fullPath)
        nested.push(walk(bucket, fullPath))
      }
    }

    if (nested.length) await Promise.all(nested)
  }

  await Promise.all(
    LIBRARY_BUCKETS.map(async (bucket) => {
      try {
        await walk(bucket, '')
      } catch {
        // Storage list é complementar
      }
    }),
  )

  return [...folders].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

/** @deprecated use listStorageFolderMarkers + foldersFromMidiaItems */
export async function listMidiaFolders(): Promise<string[]> {
  const [fromMedia, fromStorage] = await Promise.all([
    fetchMidia().then(foldersFromMidiaItems),
    listStorageFolderMarkers(),
  ])
  return [...new Set([...fromMedia, ...fromStorage])].sort((a, b) =>
    a.localeCompare(b, 'pt-BR'),
  )
}

async function ensureFolderInBucket(bucket: LibraryBucket, folder: string) {
  const segments = folder.split('/').filter(Boolean)
  let current = ''
  for (const segment of segments) {
    current = current ? `${current}/${segment}` : segment
    const path = `${current}/${FOLDER_KEEP}`
    const { error } = await supabase.storage.from(bucket).upload(
      path,
      new Blob([FOLDER_KEEP_PNG], { type: 'image/png' }),
      {
        upsert: true,
        contentType: 'image/png',
        cacheControl: '3600',
      },
    )

    if (error && !/exists|duplicate|already/i.test(error.message)) {
      throw formatStorageError(error)
    }
  }
}

/**
 * Cria pasta vazia em um único bucket (não replica em fotos/podcast/etc.).
 * PDFs → bucket `livros`; imagens → `fotos`; áudio → `podcast`.
 */
export async function createMidiaFolder(
  folderInput: string,
  bucketInput: LibraryBucket = 'biblioteca-de-imagens',
) {
  const folder = normalizeFolder(folderInput)
  if (!folder) throw new Error('Informe um nome de pasta válido.')

  const inferred = inferBucketFromFolderPath(folder)
  const bucket = inferred ?? bucketInput
  if (!(LIBRARY_BUCKETS as readonly string[]).includes(bucket)) {
    throw new Error('Tipo de pasta inválido.')
  }

  await ensureFolderInBucket(bucket, folder)
  return folder
}

/** Remove marcadores de pasta duplicados em buckets errados (ex.: livros/_keep só em fotos). */
export async function cleanupFolderMarkersOutsideBucket(
  folderInput: string,
  keepBucket: LibraryBucket,
) {
  const folder = normalizeFolder(folderInput)
  if (!folder) return

  const path = `${folder}/${FOLDER_KEEP}`
  const legacyPath = `${folder}/${LEGACY_FOLDER_KEEP}`

  await Promise.all(
    LIBRARY_BUCKETS.filter((bucket) => bucket !== keepBucket).map(async (bucket) => {
      await supabase.storage.from(bucket).remove([path, legacyPath])
    }),
  )
}

const MEDIA_BUCKETS = [
  'biblioteca-de-imagens',
  'fotos',
  'podcast',
  'documentos',
  'avatars',
  'editoriais',
  'noticias',
  'livros',
] as const

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
  displayName?: string,
): Promise<MediaItem> {
  const normalizedFolder = normalizeFolder(folder)
  const mime = await resolveMime(file)
  const bucket = bucketForMime(mime)
  const label = resolveDisplayName(displayName?.trim() || file.name, mime)
  const path = await buildStoragePath(bucket, normalizedFolder, label, mime)

  if (normalizedFolder) {
    await ensureFolderInBucket(bucket, normalizedFolder)
  }

  let publicUrl: string
  try {
    const storageName = path.includes('/') ? path.slice(path.lastIndexOf('/') + 1) : path
    const typedFile = new File([file], storageName, {
      type: mime,
      lastModified: file.lastModified,
    })
    ;({ publicUrl } = await uploadFile({
      bucket,
      path,
      file: typedFile,
      upsert: false,
    }))
  } catch (err) {
    throw formatStorageError(err, label, mime)
  }

  const { data, error } = await supabase
    .from('midia')
    .insert({
      name: label,
      bucket,
      path,
      public_url: publicUrl,
      mime_type: mime || null,
      size_bytes: file.size,
      media_type: mapMediaType(mime),
      alt: label,
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
  displayNames?: Array<string | undefined>,
): Promise<{ uploaded: MediaItem[]; errors: string[] }> {
  const uploaded: MediaItem[] = []
  const errors: string[] = []

  for (let i = 0; i < files.length; i += 1) {
    const file = files[i]
    const label = displayNames?.[i]?.trim() || file.name
    onProgress?.(i, files.length, label)
    try {
      uploaded.push(await uploadMidiaAsset(file, uploadedBy, folder, label))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'erro desconhecido'
      errors.push(message.includes(file.name) ? message : `${file.name}: ${message}`)
    }
  }

  onProgress?.(files.length, files.length, '')

  if (uploaded.length === 0 && errors.length > 0) {
    throw new Error(errors.join('\n'))
  }

  return { uploaded, errors }
}

/** Renomeia o arquivo (nome exibido + caminho no Storage). */
export async function renameMidiaAsset(id: string, newNameInput: string) {
  const { data: row, error } = await supabase.from('midia').select('*').eq('id', id).single()
  if (error) throw error

  const mime = row.mime_type || 'application/octet-stream'
  const fallbackExt =
    extensionFromName(row.path) || extensionFromName(row.name) || MIME_EXT[mime] || 'bin'
  const label = resolveDisplayName(newNameInput, mime, fallbackExt)
  const folder = folderFromPath(row.path)
  const preferredStorage = buildPreferredFileName(label, mime)
  let nextPath = folder ? `${folder}/${preferredStorage}` : preferredStorage

  if (nextPath !== row.path) {
    if (await storageObjectExists(row.bucket, nextPath)) {
      nextPath = await buildStoragePath(row.bucket, folder, label, mime)
    }
    const { error: moveError } = await supabase.storage.from(row.bucket).move(row.path, nextPath)
    if (moveError) throw moveError
  }

  const { data: urlData } = supabase.storage.from(row.bucket).getPublicUrl(nextPath)
  const { data, error: updateError } = await supabase
    .from('midia')
    .update({
      name: label,
      alt: label,
      path: nextPath,
      public_url: urlData.publicUrl,
    })
    .eq('id', id)
    .select('*')
    .single()
  if (updateError) throw updateError

  return mapMidia(data)
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
    const bucket = LIBRARY_BUCKETS.includes(row.bucket as LibraryBucket)
      ? (row.bucket as LibraryBucket)
      : 'biblioteca-de-imagens'
    await ensureFolderInBucket(bucket, targetFolder).catch(() => undefined)
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
