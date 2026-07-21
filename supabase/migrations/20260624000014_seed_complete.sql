-- Seed complementar: livros e galerias restantes

INSERT INTO public.livros (
  slug, title, subtitle, cover_url, cover_alt, authors, organizers,
  summary, editorial_info, credits, read_url, download_url, download_label,
  date_published, publisher, seo, display_order, status
) VALUES
(
  'manifesto-das-professoras',
  'Manifesto das professoras',
  'As professoras e os professores falam',
  '/imgs/capaLivro.png',
  'Capa do Manifesto das professoras',
  ARRAY['Professoras do Projeto Fazendo Comuns'],
  ARRAY['Projeto Fazendo Comuns — UFRJ'],
  '["O Manifesto das professoras reúne posicionamentos sobre o recreio escolar e a participação das crianças."]'::jsonb,
  '[{"label":"Formato","value":"Publicação digital (PDF)"}]'::jsonb,
  '[{"label":"Coordenação","names":["Lucia Rabello de Castro"]}]'::jsonb,
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf',
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf',
  'Baixar PDF',
  '2025-01-01',
  'Projeto Fazendo Comuns — UFRJ',
  '{"title":"Manifesto das professoras | Livro","description":"Leia o manifesto das professoras do projeto Fazendo Comuns."}'::jsonb,
  2,
  'active'
),
(
  'jornalzinho-da-escola-db',
  'Jornalzinho da escola DB',
  'Publicação das crianças da escola DB',
  '/imgs/img-jornalziho-db.png',
  'Capa do Jornalzinho da escola DB',
  ARRAY['Crianças da escola DB', 'Equipe Fazendo Comuns'],
  ARRAY['Projeto Fazendo Comuns'],
  '["O Jornalzinho da escola DB documenta vivências e produções das crianças sobre o recreio e a vida escolar."]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf',
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf',
  'Baixar PDF',
  '2024-01-01',
  'Projeto Fazendo Comuns — UFRJ',
  '{"title":"Jornalzinho da escola DB","description":"Publicação produzida pelas crianças da escola DB."}'::jsonb,
  3,
  'active'
),
(
  'livretos-projeto-combinacao',
  'Livretos do Projeto Combinação',
  'O Projeto Combinação',
  '/imgs/combinacao.png',
  'Capa dos livretos do Projeto Combinação',
  ARRAY['Equipe do Projeto Combinação'],
  ARRAY['Projeto Fazendo Comuns'],
  '["Livretos produzidos no âmbito do Projeto Combinação sobre recreio, brincadeira e convivência escolar."]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb,
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf',
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf',
  'Baixar PDF',
  '2024-06-01',
  'Projeto Fazendo Comuns — UFRJ',
  '{"title":"Livretos do Projeto Combinação","description":"Livretos do Projeto Combinação."}'::jsonb,
  4,
  'active'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.galerias (id, slug, title, color, cover_url, display_order, status)
VALUES
  (
    'a1000001-0000-4000-8000-000000000005',
    'corredores-salas-e-murais',
    'Corredores, Salas e Murais',
    'amber',
    'https://static.wixstatic.com/media/92a7cc_2f343c8851064f31a35a9a9830f06be8~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_2f343c8851064f31a35a9a9830f06be8~mv2.jpg',
    5,
    'active'
  ),
  (
    'a1000001-0000-4000-8000-000000000006',
    'fazendo-comuns-desenho-logo',
    'Fazendo Comuns (desenho logo)',
    'red',
    'https://static.wixstatic.com/media/92a7cc_e574940c1b8945cb803b803254eb06b6~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_e574940c1b8945cb803b803254eb06b6~mv2.jpg',
    6,
    'active'
  ),
  (
    'a1000001-0000-4000-8000-000000000007',
    'home-do-site',
    'Home do Site',
    'orange',
    'https://static.wixstatic.com/media/92a7cc_4b355f5838434ab69321782f906aafe7~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_4b355f5838434ab69321782f906aafe7~mv2.jpg',
    7,
    'active'
  )
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.galeria_fotos (galeria_id, image_url, display_order)
SELECT g.id, u.url, u.ord
FROM public.galerias g
JOIN (
  VALUES
    ('corredores-salas-e-murais', 'https://static.wixstatic.com/media/92a7cc_2f343c8851064f31a35a9a9830f06be8~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_2f343c8851064f31a35a9a9830f06be8~mv2.jpg', 1),
    ('corredores-salas-e-murais', 'https://static.wixstatic.com/media/92a7cc_4b9ddb13d8c84fc092a1db8e06d15e4c~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_4b9ddb13d8c84fc092a1db8e06d15e4c~mv2.jpg', 2),
    ('fazendo-comuns-desenho-logo', 'https://static.wixstatic.com/media/92a7cc_e574940c1b8945cb803b803254eb06b6~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_e574940c1b8945cb803b803254eb06b6~mv2.jpg', 1),
    ('fazendo-comuns-desenho-logo', 'https://static.wixstatic.com/media/92a7cc_47e2f32e92844c45aab7d6496f4966fa~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_47e2f32e92844c45aab7d6496f4966fa~mv2.jpg', 2),
    ('home-do-site', 'https://static.wixstatic.com/media/92a7cc_4b355f5838434ab69321782f906aafe7~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_4b355f5838434ab69321782f906aafe7~mv2.jpg', 1),
    ('home-do-site', 'https://static.wixstatic.com/media/92a7cc_42e30f9ec070471496076a45e53731e8~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_85,usm_0.66_1.00_0.01/92a7cc_42e30f9ec070471496076a45e53731e8~mv2.jpg', 2)
) AS u(slug, url, ord) ON g.slug = u.slug
WHERE NOT EXISTS (
  SELECT 1 FROM public.galeria_fotos gf WHERE gf.galeria_id = g.id
);
