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

export const recrearMundosOutrosPoster1 = wixImage(
  '92a7cc_4d418823ff7642c680c58cfcbb8a9449',
  'png',
  424,
  600,
)

export const recrearMundosOutrosPoster2 = wixImage(
  '92a7cc_df51c62cfab443e09564f43fb85c83e7',
  'png',
  424,
  600,
)

export const recrearMundosOutrosBookCover = wixImage(
  '92a7cc_74ba8ef09b3b40d8a1dcaf51b0687ae0',
  'png',
  501,
  735,
)

const bookPdfUrl =
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf'

export const recrearMundosOutrosEvent = {
  title: 'Em Comuns…Recrear em mundos outros',
  subtitle:
    '8 de maio de 2026 — Colégio Brasileiro de Altos Estudos, CBAE/UFRJ',
  posters: [
    {
      src: recrearMundosOutrosPoster1,
      alt: 'Cartaz do evento Em Comum — recrear em mundos outros',
    },
    {
      src: recrearMundosOutrosPoster2,
      alt: 'Cartaz do evento Em Comum — recrear em mundos outros (detalhe)',
    },
  ],
  date: '8 de maio de 2026',
  location: 'Colégio Brasileiro de Altos Estudos, CBAE/UFRJ',
  intro: [
    'O evento promoveu o lançamento do livro “FAZENDO COMUNS NA ESCOLA… construir um mundo outro”, publicação coordenada pela Profa Lucia Rabello de Castro, do Núcleo Interdisciplinar de Estudos da Infância, Adolescência e Juventude (NIAJ/CFCH), da Universidade Federal do Rio de Janeiro, obra apoiada pela FAPERJ e CNPQ.',
    'O livro, resultado de uma longa e extensa pesquisa nas escolas públicas do Rio de Janeiro, traz o recreio escolar como uma, dentre outras, demandas políticas de crianças e jovens. A obra busca capilarizar o debate sobre como a escuta atenta aos comuns dos estudantes aponta caminhos para a construção de um mundo outro: democrático, coletivo e comprometido com as políticas de vida.',
    'O evento contou com um primeiro momento de conversa entre os autores do livro e o público, e a apresentação de um vídeo curto que resume a trajetória do projeto de pesquisa. Em seguida, houve uma mesa de discussão acerca dos valores da “recreação” como essenciais para a regeneração do mundo e a construção de projetos alternativos de sociedade, em que representantes da comunidade acadêmica e militantes na política e na arte debateram o tema.',
  ],
  videoSection: {
    title: 'Em Comum — recrear em mundos outros',
    description:
      'Veja o vídeo sobre o projeto de pesquisa “Fazendo Comuns: a educação como projeto intra e co-geracional”.',
    videoTitle: 'EM COMUM: RECREAR EM MUNDOS OUTROS',
    videoUrl: 'https://www.youtube.com/watch?v=t-aRc4xkAIo',
  },
  relatedBook: {
    slug: 'recrear-mundos-outros',
    title: 'FAZENDO COMUNS NA ESCOLA…',
    titleLine2: 'CONSTRUIR UM MUNDO OUTRO',
    cover: recrearMundosOutrosBookCover,
    coverAlt: 'Capa do livro Fazendo Comuns na escola — construir um mundo outro',
    href: '/livros/recrear-mundos-outros',
    downloadUrl: bookPdfUrl,
    downloadLabel: 'Download',
  },
}
