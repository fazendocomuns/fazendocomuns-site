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

const wixBase = 'https://static.wixstatic.com/media'

function wixImage(
  fileId: string,
  ext: 'png' | 'jpeg' | 'jpg',
  width: number,
  height: number,
) {
  const file = `${fileId}~mv2.${ext}`
  return `${wixBase}/${file}/v1/fill/w_${width},h_${height},al_c,q_85,usm_0.66_1.00_0.01/${file}`
}

export const asCriancasFalamHeroImage = wixImage(
  '92a7cc_63e27a0ba9bd46e286ed2b11c15e3966',
  'jpg',
  921,
  1300,
)

export const asCriancasFalamEvent = {
  title: 'As Crianças Falam?',
  subtitle:
    'Mobilizações públicas acerca do recreio escolar — evento na EMERJ, 5 de novembro de 2024.',
  image: asCriancasFalamHeroImage,
  imageAlt: 'Cartaz do evento As Crianças Falam? — Mobilizações públicas acerca do recreio escolar',
  date: '5 de novembro de 2024',
  location: 'Escola de Magistratura do Rio de Janeiro (EMERJ)',
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
