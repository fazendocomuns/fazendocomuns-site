-- Biblioteca de mídia: não restringir MIME no bucket `fotos`.
-- Arquivos sem extensão (Drive/WhatsApp/mobile) chegam como octet-stream e falhavam com 400.

UPDATE storage.buckets
SET allowed_mime_types = NULL
WHERE id = 'fotos';
