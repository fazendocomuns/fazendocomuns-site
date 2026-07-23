export type EventPanelColor = 'amber' | 'red' | 'orange' | 'yellow'

export interface EventPanel {
  id: string
  title: string
  description: string
  color: EventPanelColor
  /** URL do YouTube ou Vimeo */
  videoUrl?: string
  /** Título acessível do iframe de vídeo */
  videoTitle?: string
}

export const asCriancasFalamHeroImage =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/capa-de-eventos/capa-evento-as-criancas-falam/as-criancas-falam-flyer.jpg'

export const asCriancasFalamPhotos = [
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Certificados-023.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Certificados-038.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Encerramento-037.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Equipe-e-estudantes-040.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Equipe-Fazendo-Comuns-039.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Mesa-de-Abertura-006.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Mesa-de-Abertura-007.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-I-009.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-I-010.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-I-011.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-I-012.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-II-014.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-II-015.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-II-016.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-II-017.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-II-019.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-II-020.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-II-021.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-027.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-028.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-029.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-030.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-031.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-032.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-033.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-035.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Painel-III-036.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Plateia-008.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Plateia-013.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Plateia-018.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Plateia-022.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Plateia-026.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Plateia-034.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Recepcao-001.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Recepcao-002.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Recepcao-003.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Recepcao-004.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Recepcao-005.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Recreio-024.jpg',
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/evento-as-criancas-falam-fotos/Recreio-025.jpg',
] as const

export const asCriancasFalamEvent = {
  title: 'As Crianças Falam?',
  subtitle:
    'Mobilizações públicas acerca do recreio escolar — evento na EMERJ, 5 de novembro de 2024.',
  image: asCriancasFalamHeroImage,
  imageAlt: 'Cartaz do evento As Crianças Falam? — Mobilizações públicas acerca do recreio escolar',
  posters: [
    {
      src: asCriancasFalamHeroImage,
      alt: 'Cartaz do evento As Crianças Falam? — Mobilizações públicas acerca do recreio escolar',
    },
  ],
  date: '5 de novembro de 2024',
  location: 'Escola de Magistratura do Rio de Janeiro (EMERJ)',
  photos: [...asCriancasFalamPhotos],
  intro: [
    'Qual é o lugar das crianças na construção do projeto de educação pública? Como se dá a resposta dos adultos à fala e à ação coletiva das crianças nas suas reivindicações sobre a educação que recebem?',
    'O acúmulo de pesquisas ao longo de mais de uma década sobre a participação das crianças na escola, e mais recentemente no âmbito do projeto de pesquisa “Fazendo Comuns: a educação como projeto intra e co-geracional”, coordenado pela Profª Lucia Rabello de Castro, da Universidade Federal do Rio de Janeiro, aponta como um dos resultados mais significativos a reivindicação dos estudantes acerca do seu espaço e tempo para o recreio.',
    'O presente evento se propôs a debater, de forma interdisciplinar e co-geracional, essa demanda política das crianças com diferentes atores da sociedade civil organizada. Pretendeu-se dar visibilidade pública para este assunto de modo que as crianças possam ter suas vozes ouvidas e amplificadas na interlocução com outros segmentos sociais.',
  ],
  panels: [
    {
      id: 'mesa-abertura',
      title: 'Mesa de Abertura',
      description:
        'Na abertura, é feita uma introdução ao evento no sentido das razões e motivações para que ele ocorresse. A mesa conta com a participação dos presidentes do Fórum Permanente da Criança, do Adolescente e da Justiça Terapêutica da Escola da Magistratura do Estado do Rio de Janeiro, da coordenadora-geral do Projeto Fazendo Comuns e dos próprios estudantes participantes do projeto.',
      color: 'amber',
      videoUrl: 'https://www.youtube.com/watch?v=bkpRX7piQMA',
      videoTitle: 'Vídeo — Mesa de Abertura',
    },
    {
      id: 'painel-1',
      title: 'Painel 1: De que se trata a pauta política do recreio escolar?',
      description:
        'O primeiro painel do evento levanta o questionamento sobre o que significa a pergunta-título do evento: “As crianças falam?”. Discute a respeito do que está em jogo na demanda política das crianças pelo recreio escolar e como a ação dos estudantes nos ajuda a pensar sobre a relação entre a infância e a democracia.',
      color: 'red',
      videoUrl: 'https://www.youtube.com/watch?v=PYPOh6SvQs4',
      videoTitle: 'Vídeo — Painel 1',
    },
    {
      id: 'painel-2',
      title: 'Painel 2: Mobilizações estudantis frente à demanda política do recreio',
      description:
        'O segundo painel do evento tem falas e depoimentos dos estudantes sobre suas mobilizações visando a reivindicação de tempo e espaço de qualidade para o recreio escolar. Traz também um debate sobre os impactos da falta de recreio para as crianças, a partir de produções artísticas elaboradas por estudantes a partir de suas experiências cotidianas de falta ou insuficiência do recreio escolar.',
      color: 'orange',
      videoUrl: 'https://www.youtube.com/watch?v=kRXxKvMmckc',
      videoTitle: 'Vídeo — Painel 2',
    },
    {
      id: 'painel-3',
      title: 'Painel 3: O "fazer comuns" da escola na relação co-geracional',
      description:
        'O último painel do evento traz para debate a construção co-geracional do cotidiano escolar, isto é, a produção do diálogo sobre o recreio a partir do ponto de vista de diferentes gerações: as crianças, os adolescentes, suas professoras e funcionários da escola. A mesa conta com a exibição de um vídeo com entrevistas realizadas por estudantes com suas professoras; a fala de uma representante do movimento estudantil organizado (UBES e AERJ) sobre a questão do recreio; o depoimento da coordenadora pedagógica de uma escola sobre a demanda política do recreio; e a fala de uma pesquisadora da área da infância sobre a relação adulto-criança na escola brasileira contemporânea.',
      color: 'yellow',
      videoUrl: 'https://www.youtube.com/watch?v=nMPkKAonu5I',
      videoTitle: 'Vídeo — Painel 3',
    },
  ] satisfies EventPanel[],
}
