import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { FotosGalleryPage } from '@/views/multimidia/FotosGalleryPage'
import {
  getPublicGaleriaBySlug,
  getPublicGaleriaSlugs,
} from '@/lib/content/multimidia.server'
import { buildPageMetadata } from '@/lib/seo/metadata'

export const revalidate = 3600

interface GalleryPageProps {
  params: Promise<{ galleryId: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublicGaleriaSlugs()
  return slugs.map((galleryId) => ({ galleryId }))
}

export async function generateMetadata({ params }: GalleryPageProps): Promise<Metadata> {
  const { galleryId } = await params
  const gallery = await getPublicGaleriaBySlug(galleryId)

  if (!gallery) {
    return buildPageMetadata({
      title: 'Galeria não encontrada',
      description: 'A galeria solicitada não existe ou foi removida.',
      path: `/multimidia/fotos/${galleryId}`,
      noindex: true,
    })
  }

  return buildPageMetadata({
    title: gallery.title,
    description: `Galeria fotográfica: ${gallery.title}`,
    path: `/multimidia/fotos/${gallery.id}`,
    ogImage: gallery.cover,
  })
}

export default async function Page({ params }: GalleryPageProps) {
  const { galleryId } = await params
  const gallery = await getPublicGaleriaBySlug(galleryId)

  if (!gallery) {
    notFound()
  }

  return <FotosGalleryPage gallery={gallery} />
}
