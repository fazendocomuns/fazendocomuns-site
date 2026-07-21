import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LivroDetailView } from '@/features/livros/components/LivroDetailView'
import {
  getPublicLivroBySlug,
  getPublicLivroSlugs,
} from '@/lib/content/livros.server'
import { buildPageMetadata } from '@/lib/seo/metadata'
import { buildBookJsonLd } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'

export const revalidate = 3600

interface LivroPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublicLivroSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: LivroPageProps): Promise<Metadata> {
  const { slug } = await params
  const livro = await getPublicLivroBySlug(slug)

  if (!livro) {
    return buildPageMetadata({
      title: 'Livro não encontrado',
      description: 'A publicação solicitada não existe ou foi removida.',
      path: `/livros/${slug}`,
      noindex: true,
    })
  }

  return buildPageMetadata({
    title: livro.seo.title,
    description: livro.seo.description,
    path: `/livros/${livro.slug}`,
    ogType: (livro.ogType as 'book' | 'website' | 'article' | undefined) ?? 'book',
    ogImage: livro.cover,
  })
}

export default async function LivroPage({ params }: LivroPageProps) {
  const { slug } = await params
  const livro = await getPublicLivroBySlug(slug)

  if (!livro) {
    notFound()
  }

  const canonicalPath = `/livros/${livro.slug}`
  const jsonLd = buildBookJsonLd({
    name: livro.title,
    alternateName: livro.subtitle,
    description: livro.seo.description,
    url: absoluteUrl(canonicalPath),
    image: absoluteUrl(livro.cover),
    authors: livro.authors,
    editors: livro.organizers,
    publisher: livro.publisher,
    datePublished: livro.datePublished,
    isbn: livro.isbn,
    downloadUrl: livro.downloadUrl,
    schemaType: livro.schemaType,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LivroDetailView livro={livro} />
    </>
  )
}
