import type {
  Editorial,
  EditorialAuthorBlock,
  EntityStatus,
  Evento,
  Noticia,
} from '@/features/admin/types'
import type {
  EditorialFormValues,
  EventoFormValues,
  NoticiaFormValues,
} from '@/features/admin/schemas'
import {
  formatReferencesText,
  formatSignaturesText,
  parseReferencesText,
  parseSignaturesText,
} from '@/features/admin/lib/editorialFields'
import type { Database, Json } from '@/types/database'

type NoticiaRow = Database['public']['Tables']['noticias']['Row'] & {
  categorias_noticia?: { name: string } | null
}
type EditorialRow = Database['public']['Tables']['editoriais']['Row']
type EventoRow = Database['public']['Tables']['eventos']['Row']

function mapBase(row: {
  id: string
  display_order: number
  status: EntityStatus
  created_at: string
  updated_at: string
}) {
  return {
    id: row.id,
    displayOrder: row.display_order,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

function normalizeSignatures(raw: unknown): EditorialAuthorBlock[] {
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => {
      if (typeof item === 'string') {
        return item.trim() ? { name: item.trim(), lines: [] as string[] } : null
      }
      if (item && typeof item === 'object' && 'name' in item) {
        const record = item as { name?: unknown; lines?: unknown }
        const name = String(record.name ?? '').trim()
        if (!name) return null
        return {
          name,
          lines: Array.isArray(record.lines) ? record.lines.map(String) : [],
        }
      }
      return null
    })
    .filter((item): item is EditorialAuthorBlock => Boolean(item))
}

export function mapNoticia(row: NoticiaRow): Noticia {
  return {
    ...mapBase(row),
    title: row.title,
    summary: row.summary,
    content: row.content,
    coverImage: row.cover_image_url,
    author: row.author,
    date: row.published_at,
    category: row.categorias_noticia?.name ?? 'Institucional',
    tags: row.tags ?? [],
    featured: row.featured,
    heroImage: row.hero_image_url ?? '',
    heroImageAlt: row.hero_image_alt ?? '',
    audioUrl: row.audio_url ?? '',
    audioDuration: row.audio_duration ?? '',
    audioLabel: row.audio_label ?? '',
    relatedLinkHref: row.related_link_href ?? '',
    relatedLinkLabel: row.related_link_label ?? '',
  }
}

export function mapEditorial(row: EditorialRow): Editorial {
  const signatures = normalizeSignatures(row.signatures)
  const references = Array.isArray(row.bibliographic_references)
    ? (row.bibliographic_references as string[])
    : []

  return {
    ...mapBase(row),
    title: row.title,
    subtitle: row.subtitle ?? '',
    summary: row.summary,
    content: row.content,
    image: row.image_url,
    author: row.author,
    date: row.published_at,
    tags: row.tags ?? [],
    closingText: row.closing_text ?? '',
    signatures,
    references,
    referencesTitle: row.references_title ?? 'Referências',
  }
}

export function mapEvento(row: EventoRow): Evento {
  return {
    ...mapBase(row),
    name: row.name,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    image: row.image_url,
    date: row.event_date ?? '',
    time: row.event_time ?? '',
    location: row.location ?? '',
    link: row.link,
    featured: row.featured,
  }
}

function editorialNumber(date: string, displayOrder: number): string {
  const year = date.slice(0, 4)
  return `${String(displayOrder).padStart(2, '0')}/${year}`
}

function editorialSignaturesPayload(values: EditorialFormValues): Json {
  const parsed = parseSignaturesText(values.signaturesText)
  if (parsed.length) return parsed as unknown as Json
  return (values.author.trim() ? [{ name: values.author.trim(), lines: [] }] : []) as unknown as Json
}

export function noticiaFormToInsert(
  values: NoticiaFormValues,
  slug: string,
  categoriaId: string | null,
): Database['public']['Tables']['noticias']['Insert'] {
  return {
    slug,
    title: values.title,
    summary: values.summary,
    content: values.content,
    cover_image_url: values.coverImage,
    author: values.author,
    published_at: values.date,
    categoria_id: categoriaId,
    tags: values.tags,
    featured: values.featured,
    hero_image_url: values.heroImage || null,
    hero_image_alt: values.heroImageAlt || null,
    audio_url: values.audioUrl || null,
    audio_duration: values.audioDuration || null,
    audio_label: values.audioLabel || null,
    related_link_href: values.relatedLinkHref || null,
    related_link_label: values.relatedLinkLabel || null,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function noticiaFormToUpdate(
  values: NoticiaFormValues,
  categoriaId: string | null,
): Database['public']['Tables']['noticias']['Update'] {
  return {
    title: values.title,
    summary: values.summary,
    content: values.content,
    cover_image_url: values.coverImage,
    author: values.author,
    published_at: values.date,
    categoria_id: categoriaId,
    tags: values.tags,
    featured: values.featured,
    hero_image_url: values.heroImage || null,
    hero_image_alt: values.heroImageAlt || null,
    audio_url: values.audioUrl || null,
    audio_duration: values.audioDuration || null,
    audio_label: values.audioLabel || null,
    related_link_href: values.relatedLinkHref || null,
    related_link_label: values.relatedLinkLabel || null,
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function editorialFormToInsert(
  values: EditorialFormValues,
  slug: string,
): Database['public']['Tables']['editoriais']['Insert'] {
  const signatures = editorialSignaturesPayload(values)
  const references = parseReferencesText(values.referencesText)

  return {
    slug,
    number: editorialNumber(values.date, values.displayOrder),
    title: values.title,
    subtitle: values.subtitle || null,
    summary: values.summary,
    content: values.content,
    image_url: values.image,
    author: values.author,
    published_at: values.date,
    tags: values.tags,
    display_order: values.displayOrder,
    status: values.status,
    closing_text: values.closingText || null,
    signatures,
    bibliographic_references: references,
    references_title: values.referencesTitle.trim() === '' ? null : values.referencesTitle,
  }
}

export function editorialFormToUpdate(
  values: EditorialFormValues,
): Database['public']['Tables']['editoriais']['Update'] {
  const signatures = editorialSignaturesPayload(values)
  const references = parseReferencesText(values.referencesText)

  return {
    number: editorialNumber(values.date, values.displayOrder),
    title: values.title,
    subtitle: values.subtitle || null,
    summary: values.summary,
    content: values.content,
    image_url: values.image,
    author: values.author,
    published_at: values.date,
    tags: values.tags,
    display_order: values.displayOrder,
    status: values.status,
    closing_text: values.closingText || null,
    signatures,
    bibliographic_references: references,
    references_title: values.referencesTitle.trim() === '' ? null : values.referencesTitle,
  }
}

export function eventoFormToInsert(
  values: EventoFormValues,
  slug: string,
): Database['public']['Tables']['eventos']['Insert'] {
  return {
    slug,
    name: values.name,
    short_description: values.shortDescription,
    full_description: values.fullDescription,
    image_url: values.image,
    event_date: values.date || null,
    event_time: values.time || null,
    location: values.location || null,
    link: values.link,
    featured: values.featured,
    has_detail_page: values.link.startsWith('/'),
    display_order: values.displayOrder,
    status: values.status,
  }
}

export function eventoFormToUpdate(
  values: EventoFormValues,
): Database['public']['Tables']['eventos']['Update'] {
  return {
    name: values.name,
    short_description: values.shortDescription,
    full_description: values.fullDescription,
    image_url: values.image,
    event_date: values.date || null,
    event_time: values.time || null,
    location: values.location || null,
    link: values.link,
    featured: values.featured,
    has_detail_page: values.link.startsWith('/'),
    display_order: values.displayOrder,
    status: values.status,
  }
}

export { formatReferencesText, formatSignaturesText }
