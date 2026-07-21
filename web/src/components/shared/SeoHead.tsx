import { useEffect } from 'react'
import { applySeo, clearSeoJsonLd, type SeoConfig } from '@/lib/seo'
import { absoluteUrl } from '@/lib/site'

interface SeoHeadProps extends SeoConfig {
  canonicalPath: string
}

export function SeoHead({
  title,
  description,
  canonicalPath,
  ogType,
  ogImage,
  twitterCard,
  noindex,
  jsonLd,
}: SeoHeadProps) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(canonicalPath)
    const ogImageUrl = ogImage
      ? ogImage.startsWith('http')
        ? ogImage
        : absoluteUrl(ogImage)
      : absoluteUrl('/favicon-192.png')

    applySeo(
      {
        title,
        description,
        ogType,
        twitterCard,
        noindex,
        jsonLd,
      },
      canonicalUrl,
      ogImageUrl,
    )

    return () => {
      clearSeoJsonLd()
    }
  }, [
    title,
    description,
    canonicalPath,
    ogType,
    ogImage,
    twitterCard,
    noindex,
    jsonLd,
  ])

  return null
}
