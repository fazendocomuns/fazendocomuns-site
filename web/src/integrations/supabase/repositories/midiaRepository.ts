import { uploadFile } from '@/lib/supabase/upload'
import { supabase } from '@/lib/supabase/client'
import type { MediaItem } from '@/features/admin/types'
import type { Database } from '@/types/database'

type MidiaRow = Database['public']['Tables']['midia']['Row']

function formatSize(bytes: number | null): string {
  if (!bytes) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function mapMidia(row: MidiaRow): MediaItem {
  const type =
    row.media_type === 'video' ? 'video' : row.media_type === 'document' ? 'document' : 'image'

  return {
    id: row.id,
    name: row.name,
    url: row.public_url,
    type,
    size: formatSize(row.size_bytes),
    uploadedAt: row.created_at,
    alt: row.alt ?? row.name,
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

export async function uploadMidiaAsset(file: File, uploadedBy?: string) {
  const ext = file.name.split('.').pop() ?? 'bin'
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`
  const bucket = 'fotos'

  const { publicUrl } = await uploadFile({ bucket, path, file, upsert: false })

  const mediaType: Database['public']['Enums']['media_type'] = file.type.startsWith('video/')
    ? 'video'
    : file.type.startsWith('image/')
      ? 'image'
      : 'document'

  const { data, error } = await supabase
    .from('midia')
    .insert({
      name: file.name,
      bucket,
      path,
      public_url: publicUrl,
      mime_type: file.type || null,
      size_bytes: file.size,
      media_type: mediaType,
      alt: file.name,
      uploaded_by: uploadedBy ?? null,
    })
    .select('*')
    .single()

  if (error) throw error
  return mapMidia(data)
}

export async function deleteMidia(id: string) {
  const { data, error } = await supabase.from('midia').select('bucket, path').eq('id', id).single()
  if (error) throw error

  await supabase.storage.from(data.bucket).remove([data.path])
  const { error: deleteError } = await supabase.from('midia').delete().eq('id', id)
  if (deleteError) throw deleteError
}
