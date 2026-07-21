-- Multimídia: galerias, fotos, vídeos, podcast

CREATE TABLE public.galerias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  intro TEXT,
  color public.galeria_color NOT NULL DEFAULT 'amber',
  cover_url TEXT NOT NULL,
  evento_id UUID REFERENCES public.eventos (id) ON DELETE SET NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.galeria_fotos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  galeria_id UUID NOT NULL REFERENCES public.galerias (id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT NOT NULL,
  thumbnail_alt TEXT,
  color public.galeria_color NOT NULL DEFAULT 'amber',
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.podcast_episodios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  duration TEXT,
  published_at DATE,
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX galerias_slug_idx ON public.galerias (slug);
CREATE INDEX galerias_status_idx ON public.galerias (status);
CREATE INDEX galeria_fotos_galeria_idx ON public.galeria_fotos (galeria_id, display_order);
CREATE INDEX videos_slug_idx ON public.videos (slug);
CREATE INDEX podcast_episodios_slug_idx ON public.podcast_episodios (slug);

CREATE TRIGGER galerias_set_updated_at
  BEFORE UPDATE ON public.galerias
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER videos_set_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER podcast_episodios_set_updated_at
  BEFORE UPDATE ON public.podcast_episodios
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
