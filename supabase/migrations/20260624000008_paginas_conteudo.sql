-- Páginas de conteúdo estruturado (campanhas, home, eventos detalhados)

CREATE TABLE public.paginas_conteudo (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  page_type TEXT NOT NULL DEFAULT 'static',
  seo JSONB NOT NULL DEFAULT '{}'::jsonb,
  status public.entity_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX paginas_conteudo_slug_idx ON public.paginas_conteudo (slug);
CREATE INDEX paginas_conteudo_status_idx ON public.paginas_conteudo (status);

CREATE TRIGGER paginas_conteudo_set_updated_at
  BEFORE UPDATE ON public.paginas_conteudo
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
