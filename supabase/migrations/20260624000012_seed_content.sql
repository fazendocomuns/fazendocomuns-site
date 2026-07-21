-- Seed: notícias, editoriais, eventos (conteúdo inicial)
-- Gerado por frontend/scripts/generate-content-seed.mjs

INSERT INTO public.noticias (
  slug, title, summary, content, cover_image_url, author, published_at, tags, featured, display_order, status, categoria_id
) VALUES (
  'podcast-direito-ao-recreio',
  'Ouça o podcast "Direito ao Recreio" — HUMANAMENTE/CNPq',
  'Divulgação científica em humanidades sobre o direito das crianças ao recreio escolar.',
  $n_podcast_direito_ao_recreio$<p>Ouça o podcast "Direito ao Recreio" realizado por HUMANAMENTE, Divulgação Científica em Humanidades/CNPq.</p><p>A produção aborda o direito das crianças ao recreio escolar e dialoga com as pesquisas do projeto Fazendo Comuns.</p>$n_podcast_direito_ao_recreio$,
  '/imgs/vídeoVamosFalar.jpeg',
  'Equipe Fazendo Comuns',
  '2025-06-16',
  ARRAY['recreio', 'podcast', 'divulgação'],
  true,
  1,
  'active',
  (SELECT id FROM public.categorias_noticia WHERE name = 'Podcast' LIMIT 1)
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, summary = EXCLUDED.summary, content = EXCLUDED.content,
  cover_image_url = EXCLUDED.cover_image_url, author = EXCLUDED.author,
  published_at = EXCLUDED.published_at, tags = EXCLUDED.tags, featured = EXCLUDED.featured,
  display_order = EXCLUDED.display_order, status = EXCLUDED.status,
  categoria_id = EXCLUDED.categoria_id, updated_at = now();

INSERT INTO public.noticias (
  slug, title, summary, content, cover_image_url, author, published_at, tags, featured, display_order, status, categoria_id
) VALUES (
  'evento-emerj-recreio',
  'Evento sobre mobilizações públicas acerca do recreio — EMERJ',
  'Parceria com a Escola de Magistratura do Estado do Rio de Janeiro.',
  $n_evento_emerj_recreio$<p>Evento realizado em parceria com a EMERJ sobre mobilizações públicas acerca do recreio escolar.</p>$n_evento_emerj_recreio$,
  '/imgs/banner02.jpg',
  'Equipe Fazendo Comuns',
  '2024-10-03',
  ARRAY['recreio', 'EMERJ', 'mobilização'],
  false,
  2,
  'active',
  (SELECT id FROM public.categorias_noticia WHERE name = 'Evento' LIMIT 1)
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, summary = EXCLUDED.summary, content = EXCLUDED.content,
  cover_image_url = EXCLUDED.cover_image_url, author = EXCLUDED.author,
  published_at = EXCLUDED.published_at, tags = EXCLUDED.tags, featured = EXCLUDED.featured,
  display_order = EXCLUDED.display_order, status = EXCLUDED.status,
  categoria_id = EXCLUDED.categoria_id, updated_at = now();

INSERT INTO public.noticias (
  slug, title, summary, content, cover_image_url, author, published_at, tags, featured, display_order, status, categoria_id
) VALUES (
  'lancamento-site-fazendo-comuns',
  'Lançamento do site Fazendo Comuns',
  'Inauguração da plataforma digital do projeto de pesquisa.',
  $n_lancamento_site_fazendo_comuns$<p>O projeto Fazendo Comuns apresenta este site como interface de comunicação e diálogo com a sociedade.</p>$n_lancamento_site_fazendo_comuns$,
  '/imgs/bannerr01.jpg',
  'Lucia Rabello de Castro',
  '2024-01-15',
  ARRAY['site', 'lançamento'],
  false,
  3,
  'inactive',
  (SELECT id FROM public.categorias_noticia WHERE name = 'Institucional' LIMIT 1)
) ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title, summary = EXCLUDED.summary, content = EXCLUDED.content,
  cover_image_url = EXCLUDED.cover_image_url, author = EXCLUDED.author,
  published_at = EXCLUDED.published_at, tags = EXCLUDED.tags, featured = EXCLUDED.featured,
  display_order = EXCLUDED.display_order, status = EXCLUDED.status,
  categoria_id = EXCLUDED.categoria_id, updated_at = now();

INSERT INTO public.editoriais (
  slug, number, title, summary, content, image_url, author, published_at, tags, display_order, signatures
) VALUES (
  'as-professoras-discutem-o-recreio', '01/2025', 'As professoras discutem o recreio', 'Editorial sobre as perspectivas das docentes acerca do recreio como pauta política das crianças.',
  $e_as_professoras_discutem_o_recreio$<p>"Você entende que é direito da criança ter professor, antes mesmo do recreio?" Deparamo-nos com esta pergunta em uma roda de conversa com professoras.</p>$e_as_professoras_discutem_o_recreio$, '/imgs/bannerr01.jpg', 'Equipe Editorial',
  '2025-01-01', ARRAY['professoras', 'recreio', 'política'], 1,
  '["Equipe Editorial"]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  number = EXCLUDED.number, title = EXCLUDED.title, summary = EXCLUDED.summary,
  content = EXCLUDED.content, image_url = EXCLUDED.image_url, author = EXCLUDED.author,
  published_at = EXCLUDED.published_at, tags = EXCLUDED.tags, display_order = EXCLUDED.display_order,
  signatures = EXCLUDED.signatures, updated_at = now();

INSERT INTO public.editoriais (
  slug, number, title, summary, content, image_url, author, published_at, tags, display_order, signatures
) VALUES (
  'as-criancas-sao-sujeitos-politicos', '02/2024', 'As crianças são sujeitos políticos?', 'Reflexão sobre crianças como sujeitos políticos e a convivência coletiva.',
  $e_as_criancas_sao_sujeitos_politicos$<p>Fazer esta pergunta é preciso. Talvez porque a política resume essencialmente os desafios invariantes da convivência coletiva.</p>$e_as_criancas_sao_sujeitos_politicos$, '/imgs/banner02.jpg', 'Equipe Editorial',
  '2024-01-01', ARRAY['política', 'infância', 'direitos'], 2,
  '["Equipe Editorial"]'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
  number = EXCLUDED.number, title = EXCLUDED.title, summary = EXCLUDED.summary,
  content = EXCLUDED.content, image_url = EXCLUDED.image_url, author = EXCLUDED.author,
  published_at = EXCLUDED.published_at, tags = EXCLUDED.tags, display_order = EXCLUDED.display_order,
  signatures = EXCLUDED.signatures, updated_at = now();

INSERT INTO public.eventos (
  slug, name, short_description, full_description, image_url, event_date, event_time, location, link, featured, has_detail_page, display_order
) VALUES (
  'as-criancas-falam', 'As Crianças Falam', 'Evento de escuta e expressão das crianças sobre o recreio.',
  $n_ev_as_criancas_falam$<p>Encontro público com crianças de escolas municipais do Rio de Janeiro para discutir o recreio como direito e pauta política.</p>$n_ev_as_criancas_falam$, '/imgs/bannerr01.jpg', '2024-11-20',
  '14:00', 'Instituto de Psicologia — UFRJ', '/eventos/as-criancas-falam', true, true, 1
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description, image_url = EXCLUDED.image_url,
  event_date = EXCLUDED.event_date, event_time = EXCLUDED.event_time, location = EXCLUDED.location,
  link = EXCLUDED.link, featured = EXCLUDED.featured, has_detail_page = EXCLUDED.has_detail_page,
  display_order = EXCLUDED.display_order, updated_at = now();

INSERT INTO public.eventos (
  slug, name, short_description, full_description, image_url, event_date, event_time, location, link, featured, has_detail_page, display_order
) VALUES (
  'recrear-mundos-outros', 'Em Comuns… Recrear em mundos outros', 'Mesa de debate sobre recreação e comuns na escola pública.',
  $n_ev_recrear_mundos_outros$<p>Evento acadêmico com pesquisadores, professoras e crianças debatendo práticas de recreação coletiva.</p>$n_ev_recrear_mundos_outros$, '/imgs/banner02.jpg', '2024-09-15',
  '10:00', 'Auditório IP-UFRJ', '/eventos/recrear-mundos-outros', false, true, 2
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name, short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description, image_url = EXCLUDED.image_url,
  event_date = EXCLUDED.event_date, event_time = EXCLUDED.event_time, location = EXCLUDED.location,
  link = EXCLUDED.link, featured = EXCLUDED.featured, has_detail_page = EXCLUDED.has_detail_page,
  display_order = EXCLUDED.display_order, updated_at = now();

