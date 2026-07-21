import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Database } from '@/types/database'
import { htmlToParagraphs } from '@/integrations/supabase/helpers'
import type { Editorial as PublicEditorial } from '@/features/editoriais/data/editoriaisContent'
import type { Noticia as PublicNoticia } from '@/features/noticias/data/noticiasContent'

type NoticiaRow = Database['public']['Tables']['noticias']['Row']
type EditorialRow = Database['public']['Tables']['editoriais']['Row']
type EventoRow = Database['public']['Tables']['eventos']['Row']

export interface PublicEventItem {
  id: string
  title: string
  date: string
  location: string
  href: string
  image: string
  imageAlt: string
}

function formatEventDate(date: string | null): string {
  if (!date) return 'Data a confirmar'
  return format(parseISO(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR })
}

export function mapNoticiaToPublic(row: NoticiaRow): PublicNoticia {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.summary,
    date: row.published_at,
    listImage: row.cover_image_url,
    listImageAlt: row.title,
    heroImage: row.hero_image_url ?? row.cover_image_url,
    paragraphs: htmlToParagraphs(row.content),
    audio: row.audio_url
      ? {
          url: row.audio_url,
          duration: row.audio_duration ?? '',
          label: row.audio_label ?? 'Áudio',
        }
      : undefined,
    relatedLink: row.related_link_href
      ? {
          href: row.related_link_href,
          label: row.related_link_label ?? 'Saiba mais',
        }
      : undefined,
  }
}

export function mapEditorialToPublic(row: EditorialRow): PublicEditorial {
  const signaturesRaw = Array.isArray(row.signatures) ? row.signatures : []
  const signatures = signaturesRaw
    .map((item) => {
      if (typeof item === 'string') {
        return { name: item, lines: [] as string[] }
      }
      if (item && typeof item === 'object' && 'name' in item) {
        const record = item as { name?: unknown; lines?: unknown }
        return {
          name: String(record.name ?? ''),
          lines: Array.isArray(record.lines) ? record.lines.map(String) : [],
        }
      }
      return null
    })
    .filter((item): item is { name: string; lines: string[] } => Boolean(item?.name))

  const references = Array.isArray(row.bibliographic_references)
    ? (row.bibliographic_references as string[])
    : []

  return {
    id: row.id,
    number: row.number,
    title: row.title,
    slug: row.slug,
    subtitle: row.subtitle ?? undefined,
    excerpt: row.summary,
    content: htmlToParagraphs(row.content),
    publishedAt: row.published_at,
    closingDate: row.closing_text ?? undefined,
    signature: signatures.length ? signatures : undefined,
    references: references.length ? references : undefined,
    referencesTitle:
      row.references_title == null || row.references_title.trim() === ''
        ? false
        : row.references_title,
  }
}

export function mapEventoToPublic(row: EventoRow): PublicEventItem {
  return {
    id: row.id,
    title: row.name,
    date: formatEventDate(row.event_date),
    location: row.location ?? 'Local a confirmar',
    href: row.link || `/eventos/${row.slug}`,
    image: row.image_url,
    imageAlt: row.name,
  }
}
