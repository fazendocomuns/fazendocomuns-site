export interface LivroCredit {
  label: string
  names: string[]
}

export interface LivroEditorialInfo {
  label: string
  value: string
}

export interface LivroRelatedLink {
  label: string
  href: string
  description?: string
}

export interface Livro {
  slug: string
  title: string
  subtitle?: string
  cover: string
  coverAlt: string
  authors: string[]
  organizers?: string[]
  summary: string[]
  editorialInfo: LivroEditorialInfo[]
  credits: LivroCredit[]
  readUrl: string
  downloadUrl: string
  downloadLabel?: string
  datePublished?: string
  isbn?: string
  publisher: string
  categoryLabel?: string
  ogType?: string
  schemaType?: 'Book' | 'PublicationIssue'
  seo: {
    title: string
    description: string
  }
  relatedLinks?: LivroRelatedLink[]
}
