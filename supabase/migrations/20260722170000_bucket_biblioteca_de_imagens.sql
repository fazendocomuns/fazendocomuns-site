-- Bucket dedicado a imagens/vídeos (substitui o uso da biblioteca no bucket `fotos`).
-- Livros/PDF e podcast permanecem nos respectivos buckets.

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'biblioteca-de-imagens',
  'biblioteca-de-imagens',
  true,
  104857600,
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'image/heic',
    'image/heif',
    'image/avif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS storage_public_buckets_read ON storage.objects;
CREATE POLICY storage_public_buckets_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (
    bucket_id IN (
      'fotos',
      'biblioteca-de-imagens',
      'avatars',
      'editoriais',
      'noticias',
      'livros',
      'podcast',
      'documentos'
    )
  );

DROP POLICY IF EXISTS storage_staff_public_buckets_write ON storage.objects;
CREATE POLICY storage_staff_public_buckets_write ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id IN (
      'fotos',
      'biblioteca-de-imagens',
      'avatars',
      'editoriais',
      'noticias',
      'livros',
      'podcast',
      'documentos'
    )
    AND public.is_editor_or_above()
  )
  WITH CHECK (
    bucket_id IN (
      'fotos',
      'biblioteca-de-imagens',
      'avatars',
      'editoriais',
      'noticias',
      'livros',
      'podcast',
      'documentos'
    )
    AND public.is_editor_or_above()
  );
