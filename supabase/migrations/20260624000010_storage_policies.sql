-- Buckets de Storage e políticas de acesso

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('fotos', 'fotos', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('avatars', 'avatars', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('editoriais', 'editoriais', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('noticias', 'noticias', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('livros', 'livros', true, 20971520, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  ('podcast', 'podcast', true, 52428800, ARRAY['audio/mpeg', 'audio/mp3']),
  ('documentos', 'documentos', true, 20971520, ARRAY['application/pdf']),
  ('admin-temp', 'admin-temp', false, 10485760, NULL)
ON CONFLICT (id) DO NOTHING;

-- Leitura pública dos buckets públicos
CREATE POLICY storage_public_buckets_read ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('fotos', 'avatars', 'editoriais', 'noticias', 'livros', 'podcast', 'documentos'));

-- Upload e gestão por editores nos buckets públicos
CREATE POLICY storage_staff_public_buckets_write ON storage.objects
  FOR ALL TO authenticated
  USING (
    bucket_id IN ('fotos', 'avatars', 'editoriais', 'noticias', 'livros', 'podcast', 'documentos')
    AND public.is_editor_or_above()
  )
  WITH CHECK (
    bucket_id IN ('fotos', 'avatars', 'editoriais', 'noticias', 'livros', 'podcast', 'documentos')
    AND public.is_editor_or_above()
  );

-- Bucket privado admin-temp
CREATE POLICY storage_admin_temp_read ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'admin-temp' AND public.is_editor_or_above());

CREATE POLICY storage_admin_temp_write ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'admin-temp' AND public.is_editor_or_above())
  WITH CHECK (bucket_id = 'admin-temp' AND public.is_editor_or_above());
