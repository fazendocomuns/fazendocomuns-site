-- Roteamento da biblioteca: cada tipo no bucket certo + MIME flexível para pastas (_keep.png)

-- fotos: só imagens e vídeos
UPDATE storage.buckets
SET
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
WHERE id = 'fotos';

-- podcast (áudio): tipos de áudio + png para marcador de pasta
UPDATE storage.buckets
SET
  file_size_limit = 104857600,
  allowed_mime_types = ARRAY[
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/x-wav',
    'audio/mp4',
    'audio/aac',
    'audio/ogg',
    'image/png'
  ]
WHERE id = 'podcast';

-- livros: PDFs/docs + png para marcador de pasta
UPDATE storage.buckets
SET
  file_size_limit = 104857600,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
WHERE id = 'livros';

-- documentos: docs + png para marcador
UPDATE storage.buckets
SET
  file_size_limit = 104857600,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/png'
  ]
WHERE id = 'documentos';
