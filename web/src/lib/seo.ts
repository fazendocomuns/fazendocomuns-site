import { getSiteUrl } from '@/lib/site'

export interface SeoConfig {
  title: string
  description: string
  canonicalPath?: string
  ogType?: string
  ogImage?: string
  twitterCard?: 'summary' | 'summary_large_image'
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

function removeJsonLdScript(id: string) {
  document.getElementById(id)?.remove()
}

export function applySeo(config: SeoConfig, canonicalUrl: string, ogImageUrl: string) {
  document.title = config.title

  upsertMeta('name', 'description', config.description)
  upsertMeta('name', 'robots', config.noindex ? 'noindex, nofollow' : 'index, follow')

  upsertLink('canonical', canonicalUrl)

  upsertMeta('property', 'og:title', config.title)
  upsertMeta('property', 'og:description', config.description)
  upsertMeta('property', 'og:type', config.ogType ?? 'website')
  upsertMeta('property', 'og:url', canonicalUrl)
  upsertMeta('property', 'og:locale', 'pt_BR')
  upsertMeta('property', 'og:site_name', 'Fazendo Comuns')
  upsertMeta('property', 'og:image', ogImageUrl)

  upsertMeta('name', 'twitter:card', config.twitterCard ?? 'summary_large_image')
  upsertMeta('name', 'twitter:title', config.title)
  upsertMeta('name', 'twitter:description', config.description)
  upsertMeta('name', 'twitter:image', ogImageUrl)

  removeJsonLdScript('seo-json-ld')

  if (config.jsonLd) {
    const script = document.createElement('script')
    script.id = 'seo-json-ld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(
      Array.isArray(config.jsonLd)
        ? config.jsonLd
        : config.jsonLd,
    )
    document.head.appendChild(script)
  }
}

export function clearSeoJsonLd() {
  removeJsonLdScript('seo-json-ld')
}

export function buildBookJsonLd(input: {
  name: string
  alternateName?: string
  description: string
  url: string
  image: string
  authors: string[]
  editors?: string[]
  publisher: string
  datePublished?: string
  isbn?: string
  downloadUrl?: string
  inLanguage?: string
  schemaType?: 'Book' | 'PublicationIssue'
}) {
  const isBook = (input.schemaType ?? 'Book') === 'Book'

  return {
    '@context': 'https://schema.org',
    '@type': input.schemaType ?? 'Book',
    name: input.name,
    ...(input.alternateName ? { alternateName: input.alternateName } : {}),
    description: input.description,
    url: input.url,
    image: input.image,
    inLanguage: input.inLanguage ?? 'pt-BR',
    ...(isBook
      ? {
          bookFormat: 'https://schema.org/EBook',
          isAccessibleForFree: true,
        }
      : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.isbn ? { isbn: input.isbn } : {}),
    author: input.authors.map((name) => ({
      '@type': 'Person',
      name,
    })),
    ...(input.editors?.length
      ? {
          editor: input.editors.map((name) => ({
            '@type': 'Person',
            name,
          })),
        }
      : {}),
    publisher: {
      '@type': 'Organization',
      name: input.publisher,
      url: getSiteUrl(),
    },
    ...(input.downloadUrl
      ? {
          potentialAction: {
            '@type': 'ReadAction',
            target: input.downloadUrl,
          },
        }
      : {}),
  }
}
