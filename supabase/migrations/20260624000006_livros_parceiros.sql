-- Livros e parceiros

CREATE TABLE public.livros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  cover_url TEXT NOT NULL,
  cover_alt TEXT,
  authors TEXT[] NOT NULL DEFAULT '{}',
  organizers TEXT[] NOT NULL DEFAULT '{}',
  summary JSONB NOT NULL DEFAULT '[]'::jsonb,
  editorial_info JSONB NOT NULL DEFAULT '[]'::jsonb,
  credits JSONB NOT NULL DEFAULT '[]'::jsonb,
  read_url TEXT NOT NULL DEFAULT '',
  download_url TEXT NOT NULL DEFAULT '',
  download_label TEXT,
  date_published DATE,
  isbn TEXT,
  publisher TEXT NOT NULL DEFAULT '',
  category_label TEXT,
  seo JSONB NOT NULL DEFAULT '{}'::jsonb,
  related_links JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.parceiro_grupos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.parceiro_logos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grupo_id UUID NOT NULL REFERENCES public.parceiro_grupos (id) ON DELETE CASCADE,
  logo_url TEXT NOT NULL,
  alt TEXT NOT NULL,
  website TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.links_parceiros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  highlight TEXT,
  description TEXT,
  links JSONB NOT NULL DEFAULT '[]'::jsonb,
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX livros_slug_idx ON public.livros (slug);
CREATE INDEX livros_status_idx ON public.livros (status);
CREATE INDEX parceiro_logos_grupo_idx ON public.parceiro_logos (grupo_id, display_order);
CREATE INDEX links_parceiros_status_idx ON public.links_parceiros (status);

CREATE TRIGGER livros_set_updated_at
  BEFORE UPDATE ON public.livros
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER parceiro_grupos_set_updated_at
  BEFORE UPDATE ON public.parceiro_grupos
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER links_parceiros_set_updated_at
  BEFORE UPDATE ON public.links_parceiros
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
