export type EntityStatus = 'active' | 'inactive'

export interface BaseEntity {
  id: string
  displayOrder: number
  status: EntityStatus
  createdAt: string
  updatedAt: string
}

export interface Pesquisador extends BaseEntity {
  name: string
  photo: string
  role: string
  miniBio: string
  fullBio: string
  email: string
  linkedin: string
  lattes: string
}

export interface Assistente extends BaseEntity {
  name: string
  photo: string
  role: string
  miniBio: string
  fullBio: string
  email: string
  linkedin: string
}

export interface Consultor extends BaseEntity {
  name: string
  photo: string
  role: string
  institution: string
  bio: string
  email: string
  linkedin: string
  lattes: string
}

export interface Colaborador extends BaseEntity {
  name: string
  photo: string
  institution: string
  role: string
  description: string
  website: string
}

export interface Noticia extends BaseEntity {
  title: string
  summary: string
  content: string
  coverImage: string
  author: string
  date: string
  category: string
  tags: string[]
  featured: boolean
  heroImage: string
  heroImageAlt: string
  audioUrl: string
  audioDuration: string
  audioLabel: string
  relatedLinkHref: string
  relatedLinkLabel: string
}

export interface EditorialAuthorBlock {
  name: string
  lines: string[]
}

export interface Editorial extends BaseEntity {
  title: string
  subtitle: string
  summary: string
  content: string
  image: string
  author: string
  date: string
  tags: string[]
  closingText: string
  signatures: EditorialAuthorBlock[]
  references: string[]
  /** Título da seção de referências; string vazia = ocultar título. */
  referencesTitle: string
}

export interface Evento extends BaseEntity {
  name: string
  shortDescription: string
  fullDescription: string
  image: string
  date: string
  time: string
  location: string
  link: string
  featured: boolean
}

export type GaleriaColor = 'amber' | 'red' | 'orange' | 'yellow'

export interface AdminVideo extends BaseEntity {
  slug: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  thumbnailAlt: string
  color: GaleriaColor
}

export interface AdminLivro extends BaseEntity {
  slug: string
  title: string
  subtitle: string
  cover: string
  coverAlt: string
  authors: string[]
  organizers: string[]
  summary: string[]
  readUrl: string
  downloadUrl: string
  downloadLabel: string
  datePublished: string
  publisher: string
  categoryLabel: string
  seoTitle: string
  seoDescription: string
}

export interface AdminGaleria extends BaseEntity {
  slug: string
  title: string
  color: GaleriaColor
  cover: string
  imageUrls: string[]
}

export interface AdminPodcastEpisodio extends BaseEntity {
  slug: string
  title: string
  description: string
  audioUrl: string
  duration: string
}

export interface AdminParceiroLogo {
  id?: string
  logoUrl: string
  alt: string
  website: string
  displayOrder: number
}

export interface AdminParceiroGrupo extends BaseEntity {
  title: string
  logos: AdminParceiroLogo[]
}

export interface AdminLinkParceiro extends BaseEntity {
  title: string
  subtitle: string
  highlight: string
  description: string
  links: { label: string; url: string }[]
}

export interface AdminPagina extends BaseEntity {
  slug: string
  title: string
  pageType: string
  contentJson: string
}

export interface MediaItem {
  id: string
  name: string
  url: string
  type: 'image' | 'video' | 'document' | 'audio'
  size: string
  uploadedAt: string
  alt: string
  /** Prefixo de pasta no Storage (ex.: `podcast/episodios`). Vazio = raiz. */
  folder?: string
}

export interface ActivityItem {
  id: string
  action: string
  entity: string
  entityName: string
  timestamp: string
}

export type AdminEntityKey =
  | 'pesquisadores'
  | 'assistentes'
  | 'consultores'
  | 'colaboradores'
  | 'noticias'
  | 'editoriais'
  | 'eventos'
  | 'videos'
  | 'livros'
  | 'galerias'
  | 'podcast'
  | 'parceiros'
  | 'paginas'

export interface ListFilters {
  search: string
  status: EntityStatus | 'all'
  page: number
  pageSize: number
  sortField: string
  sortDirection: 'asc' | 'desc'
}

export const DEFAULT_LIST_FILTERS: ListFilters = {
  search: '',
  status: 'all',
  page: 1,
  pageSize: 10,
  sortField: 'displayOrder',
  sortDirection: 'asc',
}
