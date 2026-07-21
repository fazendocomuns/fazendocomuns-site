-- Equipe: pesquisadores, assistentes, consultores, colaboradores

CREATE TABLE public.pesquisadores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  photo_url TEXT NOT NULL,
  role TEXT NOT NULL,
  mini_bio TEXT NOT NULL,
  full_bio TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL DEFAULT '',
  lattes TEXT NOT NULL DEFAULT '',
  group_key TEXT NOT NULL DEFAULT 'coordenacao',
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.assistentes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  photo_url TEXT NOT NULL,
  role TEXT NOT NULL,
  mini_bio TEXT NOT NULL,
  full_bio TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL DEFAULT '',
  group_key TEXT NOT NULL DEFAULT 'assistentes',
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.consultores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  photo_url TEXT NOT NULL,
  role TEXT NOT NULL,
  institution TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.colaboradores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  photo_url TEXT NOT NULL,
  institution TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT NOT NULL,
  website TEXT NOT NULL DEFAULT '',
  display_order INTEGER NOT NULL DEFAULT 0,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX pesquisadores_status_idx ON public.pesquisadores (status);
CREATE INDEX pesquisadores_display_order_idx ON public.pesquisadores (display_order);
CREATE INDEX assistentes_status_idx ON public.assistentes (status);
CREATE INDEX assistentes_display_order_idx ON public.assistentes (display_order);
CREATE INDEX consultores_status_idx ON public.consultores (status);
CREATE INDEX consultores_display_order_idx ON public.consultores (display_order);
CREATE INDEX colaboradores_status_idx ON public.colaboradores (status);
CREATE INDEX colaboradores_display_order_idx ON public.colaboradores (display_order);

CREATE TRIGGER pesquisadores_set_updated_at
  BEFORE UPDATE ON public.pesquisadores
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER assistentes_set_updated_at
  BEFORE UPDATE ON public.assistentes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER consultores_set_updated_at
  BEFORE UPDATE ON public.consultores
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER colaboradores_set_updated_at
  BEFORE UPDATE ON public.colaboradores
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
