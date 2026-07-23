import type { Livro } from '@/features/livros/types'
import { livroPdfUrls } from '@/features/livros/data/livroPdfUrls'

const cover =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/capas-de-livros/CAPA-DO-LIVRO-COM-CRIANCAS-FAZENDO.jpg'

const pdfUrl = livroPdfUrls.livretosProjetoCombinacao

export const livretosProjetoCombinacaoBook = {
  slug: 'livretos-projeto-combinacao',
  title: 'Livretos — Projeto CombinAção',
  subtitle: 'Seis situações escolares para pesquisa com crianças',
  cover,
  coverAlt: 'Capa dos livretos do Projeto CombinAção',
  categoryLabel: 'Publicação',
  ogType: 'article',
  schemaType: 'PublicationIssue',
  authors: [
    'Lucia Rabello de Castro',
    'Equipe do Projeto CombinAção / Fazendo Comuns',
  ],
  organizers: [
    'Projeto Fazendo Comuns — Instituto de Psicologia / UFRJ',
    'Projeto CombinAção',
  ],
  summary: [
    'Os livretos do Projeto CombinAção reúnem seis situações escolares — apresentadas em texto e imagem — usadas como dispositivo de pesquisa com crianças do 5º e 6º anos em escolas públicas do Rio de Janeiro.',
    'Cada livreto convida grupos pequenos de estudantes a discutir, combinar e decidir coletivamente uma resposta sobre temas como aprendizagem, materialidades, mudanças na escola, espaços, ações coletivas e afetos.',
    'O material foi concebido a partir do acúmulo de pesquisas anteriores do Fazendo Comuns e articula quatro dimensões centrais: materialidades e corporeidades; agir e participar em conjunto; relações de poder e vínculos; convivência coletiva e fazer junto.',
    'Leia online ou faça o download gratuito do conjunto completo em PDF.',
  ],
  editorialInfo: [
    { label: 'Formato', value: 'Conjunto de 6 livretos (PDF)' },
    { label: 'Idioma', value: 'Português (Brasil)' },
    { label: 'Ano', value: '2022' },
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
      names: ['Equipe do Projeto CombinAção / Fazendo Comuns / UFRJ'],
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
  datePublished: '2022',
  publisher: 'Projeto Fazendo Comuns — UFRJ',
  seo: {
    title: 'Livretos — Projeto CombinAção | Publicação',
    description:
      'Leia online os seis livretos do Projeto CombinAção. Material de pesquisa com crianças sobre experiências coletivas na escola pública.',
  },
  relatedLinks: [
    {
      label: 'O Projeto CombinAção',
      href: '/o-projeto-falatorio',
      description:
        'Conheça a apresentação completa do projeto, os seis livros e as dimensões investigadas.',
    },
    {
      label: 'Produções do projeto',
      href: '/projeto/producoes',
      description: 'Veja artigos, livros e demais produções acadêmicas do Fazendo Comuns.',
    },
  ],
} satisfies Livro
