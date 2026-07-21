import {
  fetchPublicEditoriais,
} from '@/integrations/supabase/repositories/contentPublicRepository'
import { editoriais as staticEditoriais } from '@/features/editoriais/data/editoriaisContent'
import {
  featuredEditorial as staticFeaturedEditorial,
  newsItems as staticNewsItems,
  type HomeFeaturedEditorial,
  type HomeNewsItem,
} from '@/features/home/data/homeContent'
import { getPublicEventos } from '@/lib/content/eventos.server'
import { getPublicNoticias } from '@/lib/content/noticias.server'
import { isSupabaseReady } from '@/lib/supabase/client'

export async function getHomeFeaturedEditorial(): Promise<HomeFeaturedEditorial> {
  const HOME_FEATURED_SLUG = 'editorial-03-2025'

  if (isSupabaseReady()) {
    try {
      const editoriais = await fetchPublicEditoriais()
      const featured =
        editoriais.find((item) => item.slug === HOME_FEATURED_SLUG) ?? editoriais[0]
      if (featured) {
        return {
          title: featured.subtitle ?? featured.title,
          excerpt: featured.content[0] ?? featured.excerpt,
          slug: featured.slug,
        }
      }
    } catch (error) {
      console.error('[home] Falha ao buscar editorial em destaque.', error)
    }
  }

  const featured =
    staticEditoriais.find((item) => item.slug === HOME_FEATURED_SLUG) ??
    staticEditoriais.at(-1)

  return featured
    ? {
        title: featured.subtitle ?? featured.title,
        // Home mostra o 1º parágrafo completo; a listagem usa `excerpt` curto.
        excerpt: featured.content[0] ?? featured.excerpt,
        slug: featured.slug,
      }
    : staticFeaturedEditorial
}

export async function getHomeNewsItems(): Promise<HomeNewsItem[]> {
  const noticias = await getPublicNoticias()

  if (noticias.length) {
    return noticias.slice(0, 3).map(({ id, title, excerpt, date, slug, heroImage, listImageAlt }) => ({
      id,
      title,
      excerpt,
      date,
      slug,
      image: heroImage,
      imageAlt: listImageAlt,
    }))
  }

  return staticNewsItems
}

export async function getHomeEvents() {
  return getPublicEventos()
}

export async function getHomePageData() {
  const [featuredEditorial, newsItems, events] = await Promise.all([
    getHomeFeaturedEditorial(),
    getHomeNewsItems(),
    getHomeEvents(),
  ])

  return { featuredEditorial, newsItems, events }
}
