-- Conteúdo editorial: categorias, notícias, editoriais, eventos

CREATE TABLE public.categorias_noticia (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.noticias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image_url TEXT NOT NULL,
  hero_image_url TEXT,
  hero_image_alt TEXT,
  author TEXT NOT NULL,
  published_at DATE NOT NULL,
  categoria_id UUID REFERENCES public.categorias_noticia (id) ON DELETE SET NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  audio_url TEXT,
  audio_duration TEXT,
  audio_label TEXT,
  related_link_href TEXT,
  related_link_label TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.editoriais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  number TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT NOT NULL,
  published_at DATE NOT NULL,
  closing_text TEXT,
  signatures JSONB NOT NULL DEFAULT '[]'::jsonb,
  bibliographic_references JSONB NOT NULL DEFAULT '[]'::jsonb,
  references_title TEXT,
  tags TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.eventos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  event_date DATE,
  event_time TEXT,
  location TEXT,
  link TEXT NOT NULL DEFAULT '',
  featured BOOLEAN NOT NULL DEFAULT false,
  has_detail_page BOOLEAN NOT NULL DEFAULT false,
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.evento_paineis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  evento_id UUID NOT NULL REFERENCES public.eventos (id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  color public.galeria_color NOT NULL DEFAULT 'amber',
  video_url TEXT,
  video_title TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX noticias_slug_idx ON public.noticias (slug);
CREATE INDEX noticias_status_published_idx ON public.noticias (status, published_at DESC);
CREATE INDEX noticias_featured_idx ON public.noticias (featured) WHERE featured = true;
CREATE INDEX noticias_categoria_idx ON public.noticias (categoria_id);

CREATE INDEX editoriais_slug_idx ON public.editoriais (slug);
CREATE INDEX editoriais_status_published_idx ON public.editoriais (status, published_at DESC);
CREATE INDEX editoriais_number_idx ON public.editoriais (number);

CREATE INDEX eventos_slug_idx ON public.eventos (slug);
CREATE INDEX eventos_status_idx ON public.eventos (status);
CREATE INDEX evento_paineis_evento_idx ON public.evento_paineis (evento_id, display_order);

CREATE TRIGGER noticias_set_updated_at
  BEFORE UPDATE ON public.noticias
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER editoriais_set_updated_at
  BEFORE UPDATE ON public.editoriais
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER eventos_set_updated_at
  BEFORE UPDATE ON public.eventos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER evento_paineis_set_updated_at
  BEFORE UPDATE ON public.evento_paineis
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Categorias padrão de notícias
INSERT INTO public.categorias_noticia (name, slug, display_order) VALUES
  ('Institucional', 'institucional', 1),
  ('Evento', 'evento', 2),
  ('Podcast', 'podcast', 3),
  ('Publicação', 'publicacao', 4),
  ('Parceria', 'parceria', 5);
