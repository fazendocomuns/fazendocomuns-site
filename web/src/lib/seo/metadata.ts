import type { Metadata } from 'next'
import { SITE_NAME, absoluteUrl, getSiteUrl } from '@/lib/site'

const DEFAULT_OG_IMAGE = '/favicon-192.png'

interface PageMetadataInput {
  title: string
  description: string
  path: string
  ogImage?: string
  ogType?: 'website' | 'article' | 'book'
  noindex?: boolean
}

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = 'website',
  noindex = false,
}: PageMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path)
  const imageUrl = ogImage
    ? ogImage.startsWith('http')
      ? ogImage
      : absoluteUrl(ogImage)
    : absoluteUrl(DEFAULT_OG_IMAGE)

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(getSiteUrl()),
    alternates: { canonical: canonicalUrl },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'pt_BR',
      type: ogType,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  }
}
