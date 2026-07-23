import { livroPdfUrls } from '@/features/livros/data/livroPdfUrls'

const pdfUrl = livroPdfUrls.manifestoDasProfessoras

const cover =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/capas-de-livros/capa-do-livro-manifesto-da-professoras.jpeg'

export const manifestoDasProfessorasContent = {
  title: 'Manifesto das professoras',
  heading: 'MANIFESTO DAS PROFESSORAS',
  cover,
  coverAlt: 'Capa do Manifesto das professoras',
  downloadUrl: pdfUrl,
  downloadLabel: 'Download',
  bookHref: '/livros/manifesto-das-professoras',
}
