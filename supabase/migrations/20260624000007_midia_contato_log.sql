-- Mídia, contato e log de atividades

CREATE TABLE public.midia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  bucket TEXT NOT NULL,
  path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  mime_type TEXT,
  size_bytes BIGINT,
  media_type public.media_type NOT NULL DEFAULT 'image',
  alt TEXT,
  uploaded_by UUID REFERENCES public.profiles (id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (bucket, path)
);

CREATE TABLE public.contato_mensagens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL CHECK (char_length(message) <= 2000),
  read_at TIMESTAMPTZ,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.atividades_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  entity_name TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles (id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX midia_media_type_idx ON public.midia (media_type);
CREATE INDEX midia_created_at_idx ON public.midia (created_at DESC);
CREATE INDEX contato_mensagens_created_at_idx ON public.contato_mensagens (created_at DESC);
CREATE INDEX atividades_log_created_at_idx ON public.atividades_log (created_at DESC);
CREATE INDEX atividades_log_user_idx ON public.atividades_log (user_id);
