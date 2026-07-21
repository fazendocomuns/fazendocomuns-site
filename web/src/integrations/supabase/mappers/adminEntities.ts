import type {
  GaleriaFormValues,
  LinkParceiroFormValues,
  LivroFormValues,
  PaginaFormValues,
  PodcastEpisodioFormValues,
  VideoFormValues,
} from '@/features/admin/schemas'
import type {
  AdminGaleria,
  AdminLinkParceiro,
  AdminLivro,
  AdminPagina,
  AdminParceiroGrupo,
  AdminPodcastEpisodio,
  AdminVideo,
  GaleriaColor,
} from '@/features/admin/types'
import type { Database } from '@/types/database'

type VideoRow = Database['public']['Tables']['videos']['Row']
type LivroRow = Database['public']['Tables']['livros']['Row']
type GaleriaRow = Database['public']['Tables']['galerias']['Row']
type PodcastRow = Database['public']['Tables']['podcast_episodios']['Row']
type GrupoRow = Database['public']['Tables']['parceiro_grupos']['Row']
type LogoRow = Database['public']['Tables']['parceiro_logos']['Row']
type LinkRow = Database['public']['Tables']['links_parceiros']['Row']
type PaginaRow = Database['public']['Tables']['paginas_conteudo']['Row']

function splitLines(value: string) {
  return value
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
}

function splitCsv(value: string) {
  return value
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
}

export function mapVideoAdmin(row: VideoRow): AdminVideo {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? '',
    videoUrl: row.video_url,
    thumbnail: row.thumbnail_url,
    thumbnailAlt: row.thumbnail_alt ?? '',
    color: row.color as GaleriaColor,
    displayOrder: row.display_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function videoFormToInsert(values: VideoFormValues, slug: string) {
  return {
    slug,
    title: values.title,
    description: values.description || null,
    video_url: values.videoUrl,
    thumbnail_url: values.thumbnail,
    thumbnail_alt: values.thumbnailAlt || null,
    color: values.color,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function videoFormToUpdate(values: VideoFormValues) {
  return {
    title: values.title,
    description: values.description || null,
    video_url: values.videoUrl,
    thumbnail_url: values.thumbnail,
    thumbnail_alt: values.thumbnailAlt || null,
    color: values.color,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function mapLivroAdmin(row: LivroRow): AdminLivro {
  const seo = (row.seo ?? {}) as { title?: string; description?: string }
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? '',
    cover: row.cover_url,
    coverAlt: row.cover_alt ?? row.title,
    authors: row.authors ?? [],
    organizers: row.organizers ?? [],
    summary: (row.summary as string[]) ?? [],
    readUrl: row.read_url,
    downloadUrl: row.download_url,
    downloadLabel: row.download_label ?? '',
    datePublished: row.date_published ?? '',
    publisher: row.publisher,
    categoryLabel: row.category_label ?? '',
    seoTitle: seo.title ?? row.title,
    seoDescription: seo.description ?? '',
    displayOrder: row.display_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function livroFormToInsert(values: LivroFormValues, slug: string) {
  return {
    slug,
    title: values.title,
    subtitle: values.subtitle || null,
    cover_url: values.cover,
    cover_alt: values.coverAlt || null,
    authors: splitCsv(values.authors),
    organizers: splitCsv(values.organizers),
    summary: splitLines(values.summary),
    editorial_info: [],
    credits: [],
    read_url: values.readUrl,
    download_url: values.downloadUrl,
    download_label: values.downloadLabel || null,
    date_published: values.datePublished || null,
    publisher: values.publisher,
    category_label: values.categoryLabel || null,
    seo: { title: values.seoTitle, description: values.seoDescription },
    related_links: [],
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function livroFormToUpdate(values: LivroFormValues) {
  return {
    title: values.title,
    subtitle: values.subtitle || null,
    cover_url: values.cover,
    cover_alt: values.coverAlt || null,
    authors: splitCsv(values.authors),
    organizers: splitCsv(values.organizers),
    summary: splitLines(values.summary),
    read_url: values.readUrl,
    download_url: values.downloadUrl,
    download_label: values.downloadLabel || null,
    date_published: values.datePublished || null,
    publisher: values.publisher,
    category_label: values.categoryLabel || null,
    seo: { title: values.seoTitle, description: values.seoDescription },
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function mapGaleriaAdmin(row: GaleriaRow, imageUrls: string[]): AdminGaleria {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    color: row.color as GaleriaColor,
    cover: row.cover_url,
    imageUrls,
    displayOrder: row.display_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function galeriaFormToInsert(values: GaleriaFormValues, slug: string) {
  return {
    slug,
    title: values.title,
    cover_url: values.cover,
    color: values.color,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function galeriaFormToUpdate(values: GaleriaFormValues) {
  return {
    title: values.title,
    cover_url: values.cover,
    color: values.color,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function parseGaleriaImageUrls(value: string) {
  return splitLines(value)
}

export function mapPodcastAdmin(row: PodcastRow): AdminPodcastEpisodio {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description ?? '',
    audioUrl: row.audio_url,
    duration: row.duration ?? '',
    displayOrder: row.display_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function podcastFormToInsert(values: PodcastEpisodioFormValues, slug: string) {
  return {
    slug,
    title: values.title,
    description: values.description || null,
    audio_url: values.audioUrl,
    duration: values.duration || null,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function podcastFormToUpdate(values: PodcastEpisodioFormValues) {
  return {
    title: values.title,
    description: values.description || null,
    audio_url: values.audioUrl,
    duration: values.duration || null,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function mapParceiroGrupoAdmin(grupo: GrupoRow, logos: LogoRow[]): AdminParceiroGrupo {
  return {
    id: grupo.id,
    title: grupo.title,
    logos: logos.map((logo, index) => ({
      id: logo.id,
      logoUrl: logo.logo_url,
      alt: logo.alt,
      website: logo.website,
      displayOrder: logo.display_order ?? index + 1,
    })),
    displayOrder: grupo.display_order,
    status: grupo.status,
    createdAt: grupo.created_at,
    updatedAt: grupo.updated_at,
  }
}

export function mapLinkParceiroAdmin(row: LinkRow): AdminLinkParceiro {
  const links = Array.isArray(row.links)
    ? (row.links as { label: string; url?: string; href?: string }[]).map((link) => ({
        label: link.label,
        url: link.url ?? link.href ?? '',
      }))
    : []
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? '',
    highlight: row.highlight ?? '',
    description: row.description ?? '',
    links,
    displayOrder: row.display_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function linkParceiroFormToInsert(values: LinkParceiroFormValues) {
  const links = JSON.parse(values.linksJson) as { label: string; url: string }[]
  return {
    title: values.title,
    subtitle: values.subtitle || null,
    highlight: values.highlight || null,
    description: values.description || null,
    links,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function linkParceiroFormToUpdate(values: LinkParceiroFormValues) {
  return linkParceiroFormToInsert(values)
}

export function mapPaginaAdmin(row: PaginaRow): AdminPagina {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    pageType: row.page_type,
    contentJson: JSON.stringify(row.content ?? {}, null, 2),
    displayOrder: 0,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function paginaFormToInsert(values: PaginaFormValues) {
  return {
    slug: values.slug,
    title: values.title,
    page_type: values.pageType,
    content: JSON.parse(values.contentJson),
    status: values.status,
  }
}

export function paginaFormToUpdate(values: PaginaFormValues) {
  return {
    title: values.title,
    page_type: values.pageType,
    content: JSON.parse(values.contentJson),
    status: values.status,
  }
}
