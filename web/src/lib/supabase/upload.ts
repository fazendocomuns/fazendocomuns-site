import { supabase, isSupabaseReady } from '@/lib/supabase/client'

export interface UploadFileOptions {
  bucket: string
  path: string
  file: File
  upsert?: boolean
}

export interface UploadFileResult {
  path: string
  publicUrl: string
}

/**
 * Envia arquivo ao Supabase Storage e retorna URL pública.
 * Lança erro se Supabase não estiver configurado ou upload falhar.
 */
export async function uploadFile({
  bucket,
  path,
  file,
  upsert = false,
}: UploadFileOptions): Promise<UploadFileResult> {
  if (!isSupabaseReady()) {
    throw new Error('Supabase Storage indisponível: configure VITE_USE_SUPABASE e credenciais.')
  }

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    upsert,
    contentType: file.type || undefined,
  })

  if (error) {
    throw error
  }

  const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)

  return {
    path: data.path,
    publicUrl: urlData.publicUrl,
  }
}
