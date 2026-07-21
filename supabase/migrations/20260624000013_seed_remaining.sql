-- Seed: vídeos, podcast, galerias, livros, parceiros

DELETE FROM public.galeria_fotos;
DELETE FROM public.galerias;
DELETE FROM public.videos;
DELETE FROM public.podcast_episodios;
DELETE FROM public.parceiro_logos;
DELETE FROM public.parceiro_grupos;
DELETE FROM public.links_parceiros;
DELETE FROM public.livros;

INSERT INTO public.videos (slug, title, description, video_url, thumbnail_url, thumbnail_alt, color, display_order, status)
VALUES ('video-vamos-falar-do-recreio', 'Vídeo: Vamos falar do recreio?', 'Convite para a discussão pública sobre o recreio nas escolas públicas.', 'https://www.youtube.com/watch?v=jqKPql7r-Lw', '/imgs/videoVamosFalar.jpeg', 'Estudantes no pátio escolar durante o recreio', 'amber', 1, 'active');

INSERT INTO public.videos (slug, title, description, video_url, thumbnail_url, thumbnail_alt, color, display_order, status)
VALUES ('video-debate-o-recreio-em-cena-final', 'Vídeo: Debate o Recreio em Cena', 'Debate sobre o recreio escolar e suas dimensões políticas.', 'https://www.youtube.com/watch?v=foUair-Z6GM', '/imgs/debate.png', 'Arte do debate Recreio em Cena', 'red', 2, 'active');

INSERT INTO public.videos (slug, title, description, video_url, thumbnail_url, thumbnail_alt, color, display_order, status)
VALUES ('video-rap-historias-do-recreio', 'Vídeo: RAP Histórias do Recreio', 'Produção em vídeo com histórias e vivências do recreio escolar.', 'https://www.youtube.com/watch?v=srEgin3qRi4', '/imgs/historiasDoRecreio.png', 'Crianças correndo pelo corredor da escola', 'orange', 3, 'active');

INSERT INTO public.podcast_episodios (slug, title, description, audio_url, duration, display_order, status)
VALUES (
  'direito-ao-recreio',
  'Ouça o podcast "Direito ao Recreio" — Fazendo Comuns',
  'Ouça o podcast "Direito ao Recreio" realizado por HUMANAMENTE, Divulgação Científica em Humanidades/CNPq',
  'https://music.wixstatic.com/mp3/92a7cc_fdffb6f5f48c42cabd1e490f23c719da.mp3',
  '10:41',
  1,
  'active'
);

INSERT INTO public.galerias (id, slug, title, color, cover_url, display_order, status)
VALUES ('a1000001-0000-4000-8000-000000000001', 'atividades-em-roda', 'Atividades em roda', 'amber', 'https://static.wixstatic.com/media/92a7cc_3f13a069f56541959b86857ca1bc3905~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3f13a069f56541959b86857ca1bc3905~mv2.jpeg', 1, 'active');
INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
VALUES ('a1000001-0000-4000-8000-000000000001', 'https://static.wixstatic.com/media/92a7cc_3f13a069f56541959b86857ca1bc3905~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3f13a069f56541959b86857ca1bc3905~mv2.jpeg', 1);
INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
VALUES ('a1000001-0000-4000-8000-000000000001', 'https://static.wixstatic.com/media/92a7cc_a4209e11b84246f2b8b31a7847a7a9b9~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_a4209e11b84246f2b8b31a7847a7a9b9~mv2.jpeg', 2);
INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
VALUES ('a1000001-0000-4000-8000-000000000001', 'https://static.wixstatic.com/media/92a7cc_4ecb1f4d53644e449c88a754807848ed~mv2.jpeg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_4ecb1f4d53644e449c88a754807848ed~mv2.jpeg', 3);

INSERT INTO public.galerias (id, slug, title, color, cover_url, display_order, status)
VALUES ('a1000001-0000-4000-8000-000000000002', 'aula-e-palestra', 'Aula e Palestra', 'red', 'https://static.wixstatic.com/media/92a7cc_3c69ba133e124cf3b1554105db67854e~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3c69ba133e124cf3b1554105db67854e~mv2.jpg', 2, 'active');
INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
VALUES ('a1000001-0000-4000-8000-000000000002', 'https://static.wixstatic.com/media/92a7cc_3c69ba133e124cf3b1554105db67854e~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_3c69ba133e124cf3b1554105db67854e~mv2.jpg', 1);
INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
VALUES ('a1000001-0000-4000-8000-000000000002', 'https://static.wixstatic.com/media/92a7cc_1271edd09dae469e88d1d943fd827ec9~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_1271edd09dae469e88d1d943fd827ec9~mv2.jpg', 2);

INSERT INTO public.galerias (id, slug, title, color, cover_url, display_order, status)
VALUES ('a1000001-0000-4000-8000-000000000003', 'brincadeira', 'Brincadeira', 'orange', 'https://static.wixstatic.com/media/92a7cc_b3b7b41f95f541e4aaa5eaf73df5f298~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_b3b7b41f95f541e4aaa5eaf73df5f298~mv2.jpg', 3, 'active');
INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
VALUES ('a1000001-0000-4000-8000-000000000003', 'https://static.wixstatic.com/media/92a7cc_b3b7b41f95f541e4aaa5eaf73df5f298~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_b3b7b41f95f541e4aaa5eaf73df5f298~mv2.jpg', 1);
INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
VALUES ('a1000001-0000-4000-8000-000000000003', 'https://static.wixstatic.com/media/92a7cc_81dd7dfd51274aee9e89175aec23306d~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_81dd7dfd51274aee9e89175aec23306d~mv2.jpg', 2);

INSERT INTO public.galerias (id, slug, title, color, cover_url, display_order, status)
VALUES ('a1000001-0000-4000-8000-000000000004', 'cartazes-sobre-recreio', 'Cartazes sobre Recreio', 'yellow', 'https://static.wixstatic.com/media/92a7cc_df03eecc99794983973b7fc220b5fad3~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_df03eecc99794983973b7fc220b5fad3~mv2.jpg', 4, 'active');
INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
VALUES ('a1000001-0000-4000-8000-000000000004', 'https://static.wixstatic.com/media/92a7cc_df03eecc99794983973b7fc220b5fad3~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_df03eecc99794983973b7fc220b5fad3~mv2.jpg', 1);

INSERT INTO public.livros (
  slug, title, subtitle, cover_url, cover_alt, authors, organizers,
  summary, editorial_info, credits, read_url, download_url, download_label,
  date_published, publisher, seo, display_order, status
) VALUES (
  'recrear-mundos-outros',
  'Recrear Mundos Outros',
  'Fazendo Comuns na escola… construir um mundo outro',
  '/imgs/capaLivro.png',
  'Capa do livro Recrear Mundos Outros',
  ARRAY['Lucia Rabello de Castro', 'Equipe do Projeto Fazendo Comuns'],
  ARRAY['Projeto Fazendo Comuns — Instituto de Psicologia / UFRJ'],
  '["Recrear Mundos Outros reúne reflexões, pesquisas e experiências do Projeto Fazendo Comuns sobre educação como projeto intra e co-geracional nas escolas públicas."]'::jsonb,
  '[{"label":"Formato","value":"Livro digital (PDF)"}]'::jsonb,
  '[{"label":"Coordenação científica","names":["Lucia Rabello de Castro"]}]'::jsonb,
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf',
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf',
  'Baixar PDF',
  '2026-01-01',
  'Projeto Fazendo Comuns — UFRJ',
  '{"title":"Recrear Mundos Outros | Livro","description":"Leia online o livro Recrear Mundos Outros."}'::jsonb,
  1,
  'active'
);

INSERT INTO public.parceiro_grupos (id, title, display_order, status)
VALUES
  ('b2000001-0000-4000-8000-000000000001', 'Secretaria Municipal de Educação (SME) da cidade do Rio', 1, 'active'),
  ('b2000001-0000-4000-8000-000000000002', 'CREs — Coordenadorias Regionais de Educação', 2, 'active');

INSERT INTO public.parceiro_logos (grupo_id, logo_url, alt, display_order)
VALUES
  ('b2000001-0000-4000-8000-000000000001', '/imgs/parceiros/logo-educacao.png', 'Logo da Secretaria Municipal de Educação do Rio de Janeiro', 1),
  ('b2000001-0000-4000-8000-000000000002', '/imgs/parceiros/cre-1.png', 'Logo da Coordenadoria Regional de Educação 1', 1),
  ('b2000001-0000-4000-8000-000000000002', '/imgs/parceiros/cre-2.png', 'Logo da Coordenadoria Regional de Educação 2', 2),
  ('b2000001-0000-4000-8000-000000000002', '/imgs/parceiros/cre-3.png', 'Logo da Coordenadoria Regional de Educação 3', 3);

INSERT INTO public.links_parceiros (title, subtitle, highlight, description, links, display_order, status)
VALUES (
  'HUMANAMENTE',
  'Divulgação científica em Humanidades',
  '"Fazendo Comuns": a Educação como projeto intra- e co-geracional',
  NULL,
  '[{"label":"Projeto no HUMANAMENTE (Fiocruz)","url":"https://humanamente.fiocruz.br/projetos_aprovados/fazendo-comuns-a-educacao-como-projeto-intra-e-co-geracional/"}]'::jsonb,
  1,
  'active'
),
(
  'DESIDADES',
  NULL,
  NULL,
  'DESIDADES é uma revista científica eletrônica na área da infância e juventude latino-americanas.',
  '[{"label":"desidades.ufrj.br","url":"https://desidades.ufrj.br"},{"label":"revistas.ufrj.br/index.php/desidades","url":"https://revistas.ufrj.br/index.php/desidades"}]'::jsonb,
  2,
  'active'
);