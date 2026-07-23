-- Recria policies públicas de Storage (sumiram e bloqueavam upload na biblioteca-de-imagens).

DROP POLICY IF EXISTS storage_public_buckets_read ON storage.objects;
CREATE POLICY storage_public_buckets_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (
    bucket_id IN (
      'biblioteca-de-imagens',
      'livros',
      'podcast',
      'documentos',
      'fotos',
      'avatars',
      'editoriais',
      'noticias',
      'eventos'
    )
  );

DROP POLICY IF EXISTS storage_staff_public_buckets_write ON storage.objects;
CREATE POLICY storage_staff_public_buckets_write ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id IN (
      'biblioteca-de-imagens',
      'livros',
      'podcast',
      'documentos',
      'fotos',
      'avatars',
      'editoriais',
      'noticias',
      'eventos'
    )
    AND public.is_editor_or_above()
  )
  WITH CHECK (
    bucket_id IN (
      'biblioteca-de-imagens',
      'livros',
      'podcast',
      'documentos',
      'fotos',
      'avatars',
      'editoriais',
      'noticias',
      'eventos'
    )
    AND public.is_editor_or_above()
  );

-- Garante MIME/limites do bucket de imagens
UPDATE storage.buckets
SET
  public = true,
  file_size_limit = 104857600,
  allowed_mime_types = ARRAY[
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
WHERE id = 'biblioteca-de-imagens';
