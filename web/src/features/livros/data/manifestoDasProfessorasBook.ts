import { manifestoDasProfessorasContent } from '@/features/professores-falam/data/manifestoDasProfessorasContent'
import type { Livro } from '@/features/livros/types'

const { cover, coverAlt, downloadUrl, heading, title } = manifestoDasProfessorasContent

export const manifestoDasProfessorasBook = {
  slug: 'manifesto-das-professoras',
  title,
  subtitle: heading,
  cover,
  coverAlt,
  categoryLabel: 'Publicação',
  authors: ['Professoras do Projeto Fazendo Comuns'],
  organizers: [
    'Projeto Fazendo Comuns — Instituto de Psicologia / UFRJ',
    'NIAJ — Núcleo de Estudos da Infância, Adolescência e Juventude / UFRJ',
  ],
  summary: [
    'O Manifesto das professoras reúne posicionamentos e reflexões de docentes envolvidas no Projeto Fazendo Comuns sobre o recreio escolar e a participação das crianças na vida escolar.',
    'A publicação amplia o debate sobre como professoras e professores compreendem a importância do recreio como pauta política das crianças nas escolas públicas.',
    'Leia online ou faça o download gratuito para conhecer o manifesto produzido no âmbito da pesquisa “Fazendo Comuns: a educação como projeto intra e co-geracional”.',
  ],
  editorialInfo: [
    { label: 'Formato', value: 'Publicação digital (PDF)' },
    { label: 'Idioma', value: 'Português (Brasil)' },
    { label: 'Ano', value: '2025' },
    { label: 'Editora', value: 'Projeto Fazendo Comuns' },
    {
      label: 'Instituição',
      value: 'Instituto de Psicologia — Universidade Federal do Rio de Janeiro (UFRJ)',
    },
    { label: 'Licença de acesso', value: 'Leitura e download gratuitos' },
  ],
  credits: [
    {
      label: 'Coordenação científica',
      names: ['Lucia Rabello de Castro'],
    },
    {
      label: 'Pesquisa e produção',
      names: [
        'Professoras do Projeto Fazendo Comuns',
        'Equipe do Projeto Fazendo Comuns / UFRJ',
      ],
    },
    {
      label: 'Instituição responsável',
      names: [
        'Instituto de Psicologia — Universidade Federal do Rio de Janeiro (UFRJ)',
      ],
    },
  ],
  readUrl: downloadUrl,
  downloadUrl,
  downloadLabel: 'Baixar PDF',
  datePublished: '2025',
  publisher: 'Projeto Fazendo Comuns — UFRJ',
  seo: {
    title: 'Manifesto das professoras | Publicação',
    description:
      'Leia online o Manifesto das professoras. Publicação do Projeto Fazendo Comuns sobre recreio escolar e a voz das docentes.',
  },
  relatedLinks: [
    {
      label: 'As professoras e os professores falam',
      href: '/professores-falam',
      description:
        'Conheça a reportagem com depoimentos e infográficos sobre o recreio na perspectiva das docentes.',
    },
    {
      label: 'Página do manifesto',
      href: '/manifesto-das-professoras',
      description: 'Acesse a página dedicada ao Manifesto das professoras.',
    },
  ],
} satisfies Livro
