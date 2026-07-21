-- Seed: equipe (pesquisadores, assistentes, consultores, colaboradores)
-- Gerado por frontend/scripts/generate-equipe-seed.mjs
-- Idempotente: upsert por slug

INSERT INTO public.pesquisadores (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Lucia Rabello de Castro',
  'lucia-rabello',
  '/imgs/equipe/lucia-rabello.jpg',
  'Coordenadora-Geral',
  'Professora Titular do Instituto de Psicologia da UFRJ e coordenadora científica do NIPIAC.',
  $bio_lucia_rabello$Professora Titular do Instituto de Psicologia da Universidade Federal do Rio de Janeiro, e do Programa de Pós-graduação em Psicologia desse Instituto. Possui Doutorado (Ph.D., 1988) e Mestrado (M.Sc., 1978) em Psicologia pela Universidade de Londres, Grã-Bretanha. Pesquisadora Senior do CNPQ. Membro Fundador do Núcleo Interdisciplinar de Pesquisa na Infância e Adolescência Contemporâneas - NIPIAC/UFRJ, coordenadora geral desse Núcleo (1995-2011), e atual Coordenadora Científica. Co-fundadora e primeira presidente eleita da Associação Nacional Rede de Pesquisadores e Pesquisadoras da Juventude - REDEJUBRA (2017-2020). É membro de redes nacionais e internacionais na área da infância e juventude. Membro de Conselhos Editoriais de periódicos nacionais e internacionais no campo da infância e juventude, como Childhood, Young e outras. Editora Chefe da Revista Científica da Infância, Adolescência e Juventude - DESIDADES lançada em 2013. Tem sido agraciada como Cientista do Nosso Estado pela Faperj (desde 2002). É Titular da Cátedra Pesquisa, Formação e Intervenção na Infância, Adolescência e Juventude do Colégio Brasileiro de Altos Estudos, UFRJ.$bio_lucia_rabello$,
  'lucia.rabello@ufrj.br',
  1,
  'coordenacao'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Adelaide Rezende de Souza',
  'adelaide-rezende',
  '/imgs/equipe/adelaide-rezende.jpg',
  'Pesquisador(a) Assistente',
  'Pós-doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_adelaide_rezende$Pós-doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)

Pesquisadora da ONG Redes da Maré$bio_adelaide_rezende$,
  'equipe+adelaide-rezende@fazendocomuns.org',
  1,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Ana Letícia Lima Silva',
  'ana-leticia-lima',
  '/imgs/equipe/ana-leticia-lima.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_ana_leticia_lima$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_ana_leticia_lima$,
  'equipe+ana-leticia-lima@fazendocomuns.org',
  2,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Davi Alves de Abreu',
  'davi-alves',
  '/imgs/equipe/davi-alves.jpg',
  'Pesquisador(a) Assistente',
  'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_davi_alves$Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_davi_alves$,
  'equipe+davi-alves@fazendocomuns.org',
  3,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Érica dos Santos Vieira',
  'erica-vieira',
  '/imgs/equipe/erica-vieira.jpg',
  'Pesquisador(a) Assistente',
  'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_erica_vieira$Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_erica_vieira$,
  'equipe+erica-vieira@fazendocomuns.org',
  4,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Flávia Chrispino',
  'flavia-chrispino',
  '/imgs/equipe/flavia-chrispino.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_flavia_chrispino$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_flavia_chrispino$,
  'equipe+flavia-chrispino@fazendocomuns.org',
  5,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Gabriela Fernandes Castro',
  'gabriela-castro',
  '/imgs/equipe/gabriela-castro.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_gabriela_castro$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_gabriela_castro$,
  'equipe+gabriela-castro@fazendocomuns.org',
  6,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Giesela Maria Schöpke Marques Talon',
  'giesela-talon',
  '/imgs/equipe/giesela-talon.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_giesela_talon$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_giesela_talon$,
  'equipe+giesela-talon@fazendocomuns.org',
  7,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Isys Boos Vieira',
  'isys-boos',
  '/imgs/equipe/isys-boos.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_isys_boos$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_isys_boos$,
  'equipe+isys-boos@fazendocomuns.org',
  8,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Júlia Junqueira Castillo',
  'julia-junqueira',
  '/imgs/equipe/julia-junqueira-castillo.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_julia_junqueira$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_julia_junqueira$,
  'equipe+julia-junqueira@fazendocomuns.org',
  9,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Julia Moraes',
  'julia-moraes',
  '/imgs/equipe/julia-moraes.jpg',
  'Pesquisador(a) Assistente',
  'Psicóloga formada pelo Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_julia_moraes$Psicóloga formada pelo Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_julia_moraes$,
  'equipe+julia-moraes@fazendocomuns.org',
  10,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Lara de Oliveira Moreira',
  'lara-moreira',
  '/imgs/equipe/lara-moreira.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_lara_moreira$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_lara_moreira$,
  'equipe+lara-moreira@fazendocomuns.org',
  11,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Luan Gall Gagliardi',
  'luan-gagliardi',
  '/imgs/equipe/luan-gagliardi.jpg',
  'Pesquisador(a) Assistente',
  'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_luan_gagliardi$Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_luan_gagliardi$,
  'equipe+luan-gagliardi@fazendocomuns.org',
  12,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Lucas Araujo de Jesus Meireles de Abreu',
  'lucas-abreu',
  '/imgs/equipe/lucas-abreu.jpg',
  'Pesquisador(a) Assistente',
  'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_lucas_abreu$Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_lucas_abreu$,
  'equipe+lucas-abreu@fazendocomuns.org',
  13,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Maria Clara de Lima Caiaffa dos Santos',
  'maria-clara-caiaffa',
  '/imgs/equipe/maria-clara-caiaffa.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_maria_clara_caiaffa$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_maria_clara_caiaffa$,
  'equipe+maria-clara-caiaffa@fazendocomuns.org',
  14,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Marília Fernanda Garcia Costa',
  'marilia-costa',
  '/imgs/equipe/marilia-costa.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_marilia_costa$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_marilia_costa$,
  'equipe+marilia-costa@fazendocomuns.org',
  15,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Michael Santana da Paz',
  'michael-paz',
  '/imgs/equipe/michael-paz.jpg',
  'Pesquisador(a) Assistente',
  'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_michael_paz$Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_michael_paz$,
  'equipe+michael-paz@fazendocomuns.org',
  16,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Paula Pimentel Tumolo',
  'paula-tumolo',
  '/imgs/equipe/paula-tumolo.jpg',
  'Pesquisador(a) Assistente',
  'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_paula_tumolo$Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)

Professora Substituta da Faculdade de Educação da Universidade Federal do Rio de Janeiro (UFRJ)$bio_paula_tumolo$,
  'equipe+paula-tumolo@fazendocomuns.org',
  17,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Pedro Sá Campello Queiroz',
  'pedro-queiroz',
  '/imgs/equipe/pedro-queiroz.jpg',
  'Pesquisador(a) Assistente',
  'Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_pedro_queiroz$Graduando de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_pedro_queiroz$,
  'equipe+pedro-queiroz@fazendocomuns.org',
  18,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Renata Tavares',
  'renata-tavares',
  '/imgs/equipe/renata-tavares.jpg',
  'Pesquisador(a) Assistente',
  'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_renata_tavares$Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_renata_tavares$,
  'equipe+renata-tavares@fazendocomuns.org',
  19,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Sofia Mitie Kanashiro Manzatto',
  'sofia-manzatto',
  '/imgs/equipe/sofia-manzatto.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_sofia_manzatto$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_sofia_manzatto$,
  'equipe+sofia-manzatto@fazendocomuns.org',
  20,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Sofía Hengen',
  'sofia-hengen',
  '/imgs/equipe/sofia-hengen.jpg',
  'Pesquisador(a) Assistente',
  'Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_sofia_hengen$Doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_sofia_hengen$,
  'equipe+sofia-hengen@fazendocomuns.org',
  21,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Sophia Aguiar Gimenez Corrêa',
  'sophia-aguiar',
  '/imgs/equipe/sophia-aguiar.jpg',
  'Pesquisador(a) Assistente',
  'Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_sophia_aguiar$Graduanda de Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_sophia_aguiar$,
  'equipe+sophia-aguiar@fazendocomuns.org',
  22,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Victoria Bersan Barbalho Maia',
  'victoria-maia',
  '/imgs/equipe/victoria-maia.jpg',
  'Pesquisador(a) Assistente',
  'Mestranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_victoria_maia$Mestranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)$bio_victoria_maia$,
  'equipe+victoria-maia@fazendocomuns.org',
  23,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.assistentes (
  name, slug, photo_url, role, mini_bio, full_bio, email, display_order, group_key
) VALUES (
  'Vinícius Vila Nova',
  'vinicius-vila-nova',
  '/imgs/equipe/vinicius-vila-nova.jpg',
  'Pesquisador(a) Assistente',
  'Bolsista de Apoio à Pesquisa',
  $bio_vinicius_vila_nova$Bolsista de Apoio à Pesquisa

Graduando de Engenharia de Computação pela Universidade Veiga de Almeida (UVA)$bio_vinicius_vila_nova$,
  'equipe+vinicius-vila-nova@fazendocomuns.org',
  24,
  'assistentes'
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  mini_bio = EXCLUDED.mini_bio,
  full_bio = EXCLUDED.full_bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.consultores (
  name, slug, photo_url, role, institution, bio, email, display_order
) VALUES (
  'Andrea Szulc',
  'andrea-szulc',
  '/imgs/consultores/andrea-szulc.jpg',
  'Consultor(a) Científico(a)',
  'Universidade de Buenos Aires Pesquisadora do CONICET/Argentina Professora da Universidad de Buenos Aires',
  $bio_andrea_szulc$Doutora em Antropologia pela Universidade de Buenos Aires

Pesquisadora do CONICET/Argentina

Professora da Universidad de Buenos Aires$bio_andrea_szulc$,
  'equipe+andrea-szulc@fazendocomuns.org',
  1
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  institution = EXCLUDED.institution,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.consultores (
  name, slug, photo_url, role, institution, bio, email, display_order
) VALUES (
  'Felipe Salvador Grisolia',
  'felipe-grisolia',
  '/imgs/consultores/icone-placeholder.png',
  'Consultor(a) Científico(a)',
  'Universidade Federal do Rio de Janeiro Professor Substituto da Universidade do Estado do Rio de Janeiro',
  $bio_felipe_grisolia$Doutor em Psicologia pela Universidade Federal do Rio de Janeiro

Professor Substituto da Universidade do Estado do Rio de Janeiro$bio_felipe_grisolia$,
  'equipe+felipe-grisolia@fazendocomuns.org',
  2
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  institution = EXCLUDED.institution,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.consultores (
  name, slug, photo_url, role, institution, bio, email, display_order
) VALUES (
  'Idilva Maria Pires Germano',
  'idilva-germano',
  '/imgs/consultores/icone-placeholder.png',
  'Consultor(a) Científico(a)',
  'Universidade Federal do Ceará Professora Titular da Universidade Federal do Ceará',
  $bio_idilva_germano$Doutora em Sociologia pela Universidade Federal do Ceará

Professora Titular da Universidade Federal do Ceará$bio_idilva_germano$,
  'equipe+idilva-germano@fazendocomuns.org',
  3
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  institution = EXCLUDED.institution,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.consultores (
  name, slug, photo_url, role, institution, bio, email, display_order
) VALUES (
  'Luciana Gageiro Coutinho',
  'luciana-gageiro',
  '/imgs/consultores/luciana-gageiro.jpg',
  'Consultor(a) Científico(a)',
  'UFF',
  $bio_luciana_gageiro$Doutora em Psicologia (PUC-Rio)

Professora Associada da Faculdade de Educação da UFF/ PPG em Psicologia da UFF$bio_luciana_gageiro$,
  'equipe+luciana-gageiro@fazendocomuns.org',
  4
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  institution = EXCLUDED.institution,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.consultores (
  name, slug, photo_url, role, institution, bio, email, display_order
) VALUES (
  'Conceição Firmina Seixas Silva',
  'conceicao-seixas',
  '/imgs/consultores/conceicao-seixas.jpg',
  'Consultor(a) Científico(a)',
  'Universidade do Estado do Rio de Janeiro (UERJ)/ Departamento de Estudos da Infância (DEDI) Professora permanente do Programa de Pós-Graduação em Educação (ProEd/ UERJ) Líder do grupo Espaço de Estudo e Pesquisa sobre Infância (EEPI)',
  $bio_conceicao_seixas$Professora Associada da Faculdade de Educação da Universidade do Estado do Rio de Janeiro (UERJ)/ Departamento de Estudos da Infância (DEDI)

Professora permanente do Programa de Pós-Graduação em Educação (ProEd/ UERJ)

Líder do grupo Espaço de Estudo e Pesquisa sobre Infância (EEPI)$bio_conceicao_seixas$,
  'equipe+conceicao-seixas@fazendocomuns.org',
  5
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  institution = EXCLUDED.institution,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.consultores (
  name, slug, photo_url, role, institution, bio, email, display_order
) VALUES (
  'Heloisa Dias Bezerra',
  'heloisa-bezerra',
  '/imgs/consultores/heloisa-bezerra.jpg',
  'Consultor(a) Científico(a)',
  'Universidade Federal do Estado do Rio de Janeiro (Unirio)',
  $bio_heloisa_bezerra$Professora Titular na Faculdade de Ciências Sociais da Universidade Federal do Estado do Rio de Janeiro (Unirio)$bio_heloisa_bezerra$,
  'equipe+heloisa-bezerra@fazendocomuns.org',
  6
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  institution = EXCLUDED.institution,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.consultores (
  name, slug, photo_url, role, institution, bio, email, display_order
) VALUES (
  'Juliana Siqueira de Lara',
  'juliana-lara',
  '/imgs/consultores/juliana-lara.jpg',
  'Consultor(a) Científico(a)',
  'Universidade Federal do Rio de Janeiro (UFRJ) Professora substituta da Faculdade de Educação da Universidade Federal do Rio de Janeiro (UFRJ)',
  $bio_juliana_lara$Pós-doutoranda em Psicologia no Instituto de Psicologia da Universidade Federal do Rio de Janeiro (UFRJ)

Professora substituta da Faculdade de Educação da Universidade Federal do Rio de Janeiro (UFRJ)$bio_juliana_lara$,
  'equipe+juliana-lara@fazendocomuns.org',
  7
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  institution = EXCLUDED.institution,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.consultores (
  name, slug, photo_url, role, institution, bio, email, display_order
) VALUES (
  'Valeria Llobet',
  'valeria-llobet',
  '/imgs/consultores/valeria-llobet.jpg',
  'Consultor(a) Científico(a)',
  'Universidad Nacional de San Martín (UNSAM) Professora Associada da Universidad Nacional de San Martín (UNSAM) Pesquisadora do Conselho Nacional de Pesquisas Científicas e Técnicas (CONICET) no Laboratório de Pesquisa em Ciências Humanas (LICH)',
  $bio_valeria_llobet$Diretora do Centro de Estudos sobre Desigualdades, Sujeitos e Instituições (CEDESI) da Escola de Humanidades da Universidad Nacional de San Martín (UNSAM)

Professora Associada da Universidad Nacional de San Martín (UNSAM)

Pesquisadora do Conselho Nacional de Pesquisas Científicas e Técnicas (CONICET) no Laboratório de Pesquisa em Ciências Humanas (LICH)$bio_valeria_llobet$,
  'equipe+valeria-llobet@fazendocomuns.org',
  8
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  role = EXCLUDED.role,
  institution = EXCLUDED.institution,
  bio = EXCLUDED.bio,
  email = EXCLUDED.email,
  display_order = EXCLUDED.display_order,
  updated_at = now();

INSERT INTO public.colaboradores (
  name, slug, photo_url, institution, role, description, website, display_order
) VALUES (
  'Ana Paula Pedro',
  'ana-paula-pedro',
  '/imgs/colaboradores/ana-paula-pedro.jpg',
  'Instituto Superior de Educação Pró-Saber',
  'Coordenadora de Arte (Projeto Fazendo Comuns)',
  $bio_ana_paula_pedro$Psicóloga Clínica

Diretora de projetos (Instituto Superior de Educação Pró-Saber)

Coordenadora de Arte (Projeto Fazendo Comuns)$bio_ana_paula_pedro$,
  'https://pro-saber.org',
  1
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  photo_url = EXCLUDED.photo_url,
  institution = EXCLUDED.institution,
  role = EXCLUDED.role,
  description = EXCLUDED.description,
  website = EXCLUDED.website,
  display_order = EXCLUDED.display_order,
  updated_at = now();

