import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NoticiaDetailView } from '@/features/noticias/components/NoticiaDetailView'
import {
  getPublicNoticiaBySlug,
  getPublicNoticiaSlugs,
} from '@/lib/content/noticias.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

interface NoticiaPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublicNoticiaSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: NoticiaPageProps): Promise<Metadata> {
  const { slug } = await params
  const noticia = await getPublicNoticiaBySlug(slug)

  if (!noticia) {
    return buildPageMetadata({
      title: 'Notícia não encontrada',
      description: 'A notícia solicitada não existe ou foi removida.',
      path: `/noticias/${slug}`,
      noindex: true,
    })
  }

  return buildPageMetadata({
    title: noticia.title,
    description: noticia.excerpt,
    path: `/noticias/${noticia.slug}`,
    ogType: 'article',
    ogImage: noticia.heroImage,
  })
}

export default async function NoticiaPage({ params }: NoticiaPageProps) {
  const { slug } = await params
  const noticia = await getPublicNoticiaBySlug(slug)

  if (!noticia) {
    notFound()
  }

  return <NoticiaDetailView noticia={noticia} />
}
