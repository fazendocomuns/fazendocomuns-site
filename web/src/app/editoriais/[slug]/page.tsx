import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { EditorialDetailView } from '@/features/editoriais/components/EditorialDetailView'
import {
  getPublicEditorialBySlug,
  getPublicEditorialSlugs,
} from '@/lib/content/editoriais.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

interface EditorialPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublicEditorialSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: EditorialPageProps): Promise<Metadata> {
  const { slug } = await params
  const editorial = await getPublicEditorialBySlug(slug)

  if (!editorial) {
    return buildPageMetadata({
      title: 'Editorial não encontrado',
      description: 'O editorial solicitado não existe ou foi removido.',
      path: `/editoriais/${slug}`,
      noindex: true,
    })
  }

  return buildPageMetadata({
    title: editorial.subtitle ?? editorial.title,
    description: editorial.excerpt,
    path: `/editoriais/${editorial.slug}`,
    ogType: 'article',
  })
}

export default async function EditorialPage({ params }: EditorialPageProps) {
  const { slug } = await params
  const editorial = await getPublicEditorialBySlug(slug)

  if (!editorial) {
    notFound()
  }

  return <EditorialDetailView editorial={editorial} />
}
