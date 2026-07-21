import type { Livro, LivroCredit, LivroEditorialInfo, LivroRelatedLink } from '@/features/livros/types'
import type { Database } from '@/types/database'

type LivroRow = Database['public']['Tables']['livros']['Row']

export function mapLivro(row: LivroRow): Livro {
  const seo = (row.seo ?? {}) as Livro['seo']
  const relatedLinks = row.related_links as LivroRelatedLink[] | null

  return {
    slug: row.slug,
    title: row.title,
    subtitle: row.subtitle ?? undefined,
    cover: row.cover_url,
    coverAlt: row.cover_alt ?? row.title,
    authors: row.authors ?? [],
    organizers: row.organizers?.length ? row.organizers : undefined,
    summary: (row.summary as string[]) ?? [],
    editorialInfo: (row.editorial_info as unknown as LivroEditorialInfo[]) ?? [],
    credits: (row.credits as unknown as LivroCredit[]) ?? [],
    readUrl: row.read_url,
    downloadUrl: row.download_url,
    downloadLabel: row.download_label ?? undefined,
    datePublished: row.date_published ?? undefined,
    isbn: row.isbn ?? undefined,
    publisher: row.publisher,
    categoryLabel: row.category_label ?? undefined,
    seo: {
      title: seo.title ?? row.title,
      description: seo.description ?? '',
    },
    relatedLinks: relatedLinks?.length ? relatedLinks : undefined,
  }
}
