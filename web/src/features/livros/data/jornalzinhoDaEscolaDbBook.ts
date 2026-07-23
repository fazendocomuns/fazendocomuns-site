import type { Livro } from '@/features/livros/types'
import { livroPdfUrls } from '@/features/livros/data/livroPdfUrls'

const cover =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/capas-de-livros/capa-do-livro-jornal-db.jpeg'

const pdfUrl = livroPdfUrls.jornalzinhoDaEscolaDb

export const jornalzinhoDaEscolaDbBook = {
  slug: 'jornalzinho-da-escola-db',
  title: 'Jornalzinho da escola DB',
  subtitle: 'Publicação produzida por crianças da Escola Municipal Dona Beatriz',
  cover,
  coverAlt: 'Capa do Jornalzinho da escola DB',
  categoryLabel: 'Publicação',
  ogType: 'article',
  schemaType: 'PublicationIssue',
  authors: ['Crianças da Escola Municipal Dona Beatriz', 'Projeto Fazendo Comuns'],
  organizers: [
    'Projeto Fazendo Comuns — Instituto de Psicologia / UFRJ',
    'Escola Municipal Dona Beatriz',
  ],
  summary: [
    'O Jornalzinho da escola DB é uma publicação produzida no âmbito do Projeto Fazendo Comuns, reunindo registros, narrativas e produções das crianças da Escola Municipal Dona Beatriz.',
    'O material documenta experiências de participação, convivência e expressão na escola pública, ampliando a visibilidade das vozes infantis sobre o cotidiano escolar.',
    'Leia online ou faça o download gratuito para conhecer as produções coletivas das crianças e o trabalho de pesquisa-intervenção realizado com a escola parceira.',
  ],
  editorialInfo: [
    { label: 'Formato', value: 'Publicação digital (PDF)' },
    { label: 'Idioma', value: 'Português (Brasil)' },
    { label: 'Ano', value: '2026' },
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
        'Crianças da Escola Municipal Dona Beatriz',
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
  readUrl: pdfUrl,
  downloadUrl: pdfUrl,
  downloadLabel: 'Baixar PDF',
  datePublished: '2026',
  publisher: 'Projeto Fazendo Comuns — UFRJ',
  seo: {
    title: 'Jornalzinho da escola DB | Publicação',
    description:
      'Leia online o Jornalzinho da escola DB. Conheça produções, narrativas e registros das crianças da Escola Municipal Dona Beatriz no Projeto Fazendo Comuns.',
  },
  relatedLinks: [
    {
      label: 'Sobre o Jornalzinho da escola DB',
      href: '/jornalzinho-da-escola-db',
      description:
        'Conheça o contexto da iniciativa e a relação com o Projeto Fazendo Comuns.',
    },
    {
      label: 'As crianças falam',
      href: '/criancas-falam',
      description: 'Veja outras produções e falas das crianças no projeto.',
    },
  ],
} satisfies Livro
