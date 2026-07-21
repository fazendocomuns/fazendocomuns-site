import {
  fetchPublicNoticiaBySlug,
  fetchPublicNoticias,
} from '@/integrations/supabase/repositories/contentPublicRepository'
import {
  noticias as staticNoticias,
  noticiasHubIntro,
} from '@/features/noticias/data/noticiasContent'
import type { Noticia } from '@/features/noticias/data/noticiasContent'
import { isSupabaseReady } from '@/lib/supabase/client'

export { noticiasHubIntro }

export async function getPublicNoticias(): Promise<Noticia[]> {
  if (isSupabaseReady()) {
    try {
      return await fetchPublicNoticias()
    } catch (error) {
      console.error('[noticias] Falha ao buscar do Supabase, usando fallback estático.', error)
    }
  }

  return staticNoticias
}

export async function getPublicNoticiaBySlug(slug: string): Promise<Noticia | null> {
  if (isSupabaseReady()) {
    try {
      const remote = await fetchPublicNoticiaBySlug(slug)
      if (remote) return remote
    } catch (error) {
      console.error(`[noticias] Falha ao buscar "${slug}" do Supabase.`, error)
    }
  }

  return staticNoticias.find((item) => item.slug === slug) ?? null
}

export async function getPublicNoticiaSlugs(): Promise<string[]> {
  const items = await getPublicNoticias()
  return items.map((item) => item.slug)
}
