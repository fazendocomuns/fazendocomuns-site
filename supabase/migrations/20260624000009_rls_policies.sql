-- Row Level Security para tabelas de conteúdo

-- Macro pattern: conteúdo publicável com coluna status
-- SELECT público: status = active
-- SELECT staff: is_editor_or_above()
-- WRITE staff: is_editor_or_above()

ALTER TABLE public.pesquisadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assistentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colaboradores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categorias_noticia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.noticias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.editoriais ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evento_paineis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galerias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeria_fotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcast_episodios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.livros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiro_grupos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiro_logos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links_parceiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.midia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contato_mensagens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.atividades_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paginas_conteudo ENABLE ROW LEVEL SECURITY;

-- Pesquisadores
CREATE POLICY pesquisadores_public_read ON public.pesquisadores
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY pesquisadores_staff_read ON public.pesquisadores
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY pesquisadores_staff_write ON public.pesquisadores
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Assistentes
CREATE POLICY assistentes_public_read ON public.assistentes
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY assistentes_staff_read ON public.assistentes
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY assistentes_staff_write ON public.assistentes
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Consultores
CREATE POLICY consultores_public_read ON public.consultores
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY consultores_staff_read ON public.consultores
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY consultores_staff_write ON public.consultores
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Colaboradores
CREATE POLICY colaboradores_public_read ON public.colaboradores
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY colaboradores_staff_read ON public.colaboradores
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY colaboradores_staff_write ON public.colaboradores
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Categorias de notícia (dados de referência — leitura pública total)
CREATE POLICY categorias_noticia_public_read ON public.categorias_noticia
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY categorias_noticia_staff_write ON public.categorias_noticia
  FOR ALL TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Notícias
CREATE POLICY noticias_public_read ON public.noticias
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY noticias_staff_read ON public.noticias
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY noticias_staff_write ON public.noticias
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Editoriais
CREATE POLICY editoriais_public_read ON public.editoriais
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY editoriais_staff_read ON public.editoriais
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY editoriais_staff_write ON public.editoriais
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Eventos
CREATE POLICY eventos_public_read ON public.eventos
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY eventos_staff_read ON public.eventos
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY eventos_staff_write ON public.eventos
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Painéis de evento (visíveis se evento pai estiver ativo)
CREATE POLICY evento_paineis_public_read ON public.evento_paineis
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.eventos e
      WHERE e.id = evento_id AND e.status = 'active'
    )
  );

CREATE POLICY evento_paineis_staff_read ON public.evento_paineis
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY evento_paineis_staff_write ON public.evento_paineis
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Galerias
CREATE POLICY galerias_public_read ON public.galerias
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY galerias_staff_read ON public.galerias
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY galerias_staff_write ON public.galerias
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Fotos de galeria
CREATE POLICY galeria_fotos_public_read ON public.galeria_fotos
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.galerias g
      WHERE g.id = galeria_id AND g.status = 'active'
    )
  );

CREATE POLICY galeria_fotos_staff_read ON public.galeria_fotos
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY galeria_fotos_staff_write ON public.galeria_fotos
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Vídeos
CREATE POLICY videos_public_read ON public.videos
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY videos_staff_read ON public.videos
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY videos_staff_write ON public.videos
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Podcast
CREATE POLICY podcast_episodios_public_read ON public.podcast_episodios
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY podcast_episodios_staff_read ON public.podcast_episodios
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY podcast_episodios_staff_write ON public.podcast_episodios
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Livros
CREATE POLICY livros_public_read ON public.livros
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY livros_staff_read ON public.livros
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY livros_staff_write ON public.livros
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Parceiros
CREATE POLICY parceiro_grupos_public_read ON public.parceiro_grupos
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY parceiro_grupos_staff_write ON public.parceiro_grupos
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

CREATE POLICY parceiro_logos_public_read ON public.parceiro_logos
  FOR SELECT TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.parceiro_grupos pg
      WHERE pg.id = grupo_id AND pg.status = 'active'
    )
  );

CREATE POLICY parceiro_logos_staff_write ON public.parceiro_logos
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

CREATE POLICY links_parceiros_public_read ON public.links_parceiros
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY links_parceiros_staff_write ON public.links_parceiros
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Mídia
CREATE POLICY midia_public_read ON public.midia
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY midia_staff_write ON public.midia
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());

-- Contato
CREATE POLICY contato_insert_public ON public.contato_mensagens
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY contato_admin_read ON public.contato_mensagens
  FOR SELECT TO authenticated
  USING (public.is_admin());

CREATE POLICY contato_admin_update ON public.contato_mensagens
  FOR UPDATE TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Log de atividades
CREATE POLICY atividades_staff_read ON public.atividades_log
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY atividades_staff_insert ON public.atividades_log
  FOR INSERT TO authenticated
  WITH CHECK (public.is_editor_or_above());

-- Páginas de conteúdo
CREATE POLICY paginas_conteudo_public_read ON public.paginas_conteudo
  FOR SELECT TO anon, authenticated
  USING (status = 'active');

CREATE POLICY paginas_conteudo_staff_read ON public.paginas_conteudo
  FOR SELECT TO authenticated
  USING (public.is_editor_or_above());

CREATE POLICY paginas_conteudo_staff_write ON public.paginas_conteudo
  FOR ALL TO authenticated
  USING (public.is_editor_or_above())
  WITH CHECK (public.is_editor_or_above());
