import { livroPdfUrls } from '@/features/livros/data/livroPdfUrls'

const supabaseStorage =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens'

const eventoFlyer = (file: string) =>
  `${supabaseStorage}/capa-de-eventos/capa-evento-em-comum-recrear-em-mundos-outros/${file}`

const livroCover =
  `${supabaseStorage}/capas-de-livros/capa-do-livro-fazendo-comuns-na-escola-construir-um-mundo-outro.png`

export const recrearMundosOutrosPoster1 = eventoFlyer(
  'em-comum-recrear-em-mundos-outros-flyer.png',
)

export const recrearMundosOutrosPoster2 = eventoFlyer(
  'em-comum-recrear-em-mundos-outros-flyer-02.png',
)

export const recrearMundosOutrosBookCover = livroCover

const bookPdfUrl = livroPdfUrls.recrearMundosOutros

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
      alt: 'Cartaz do evento Em Comum — recrear em mundos outros (verso)',
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
