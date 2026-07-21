import capaLivroImg from '@/assets/imgs/capaLivro.png'
import type { Livro } from '@/features/livros/types'
import { assetSrc } from '@/lib/assetSrc'

const pdfUrl =
  'https://www.fazendocomuns.com.br/_files/ugd/92a7cc_cc2e2e2c9cec4a85b6924959deae39a5.pdf'

export const recrearMundosOutrosBook = {
  slug: 'recrear-mundos-outros',
  title: 'Recrear Mundos Outros',
  subtitle: 'Fazendo Comuns na escola… construir um mundo outro',
  cover: assetSrc(capaLivroImg),
  coverAlt: 'Capa do livro Recrear Mundos Outros — Fazendo Comuns na escola',
  authors: [
    'Lucia Rabello de Castro',
    'Equipe do Projeto Fazendo Comuns',
  ],
  organizers: [
    'Projeto Fazendo Comuns — Instituto de Psicologia / UFRJ',
    'NIAJ — Núcleo de Estudos da Infância, Adolescência e Juventude / UFRJ',
  ],
  summary: [
    'Recrear Mundos Outros reúne reflexões, pesquisas e experiências do Projeto Fazendo Comuns sobre educação como projeto intra e co-geracional nas escolas públicas.',
    'A publicação articula recriação, convivência escolar e a construção de mundos outros a partir das vozes de crianças, professoras, professores e pesquisadoras envolvidas na iniciativa.',
    'Organizado a partir do evento Em Comuns…Recrear em mundos outros, o livro documenta percursos de pesquisa-intervenção que investigam como escolas públicas podem ser espaços de participação, cuidado e reinvenção coletiva.',
    'Leia online ou faça o download gratuito para conhecer registros teóricos e empíricos sobre infâncias, recreio, escola pública e construção de comuns educativos.',
  ],
  editorialInfo: [
    {
      label: 'Formato',
      value: 'Livro digital (PDF)',
    },
    {
      label: 'Idioma',
      value: 'Português (Brasil)',
    },
    {
      label: 'Ano',
      value: '2026',
    },
    {
      label: 'Editora / Instituição',
      value: 'Projeto Fazendo Comuns — UFRJ',
    },
    {
      label: 'Licença de acesso',
      value: 'Leitura e download gratuitos',
    },
  ],
  credits: [
    {
      label: 'Coordenação científica',
      names: ['Lucia Rabello de Castro'],
    },
    {
      label: 'Pesquisa e produção',
      names: ['Equipe do Projeto Fazendo Comuns / UFRJ'],
    },
    {
      label: 'Instituição responsável',
      names: [
        'Instituto de Psicologia — Universidade Federal do Rio de Janeiro (UFRJ)',
      ],
    },
  ],
  readUrl: pdfUrl,
  downloadUrl: pdfUrl,
  downloadLabel: 'Baixar PDF',
  datePublished: '2026',
  publisher: 'Projeto Fazendo Comuns — UFRJ',
  seo: {
    title: 'Recrear Mundos Outros | Livro',
    description:
      'Leia online o livro Recrear Mundos Outros. Conheça reflexões, pesquisas e experiências relacionadas ao universo das infâncias e dos espaços educativos.',
  },
  relatedLinks: [
    {
      label: 'Evento Em Comuns…Recrear em mundos outros',
      href: '/eventos/recrear-mundos-outros',
      description:
        'Conheça o evento que originou esta publicação e outros materiais relacionados.',
    },
    {
      label: 'Produções do projeto',
      href: '/projeto/producoes',
      description: 'Veja artigos, livros e demais produções acadêmicas do Fazendo Comuns.',
    },
  ],
} satisfies Livro
