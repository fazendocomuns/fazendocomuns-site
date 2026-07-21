import {
  fetchPublicGaleriaBySlug,
  fetchPublicGalerias,
  fetchPublicPodcast,
  fetchPublicVideoBySlug,
  fetchPublicVideos,
} from '@/integrations/supabase/repositories/multimidiaPublicRepository'
import { fotosContent } from '@/features/multimidia/data/fotosContent'
import { podcastContent } from '@/features/multimidia/data/podcastContent'
import { getVideoBySlug, videosContent } from '@/features/multimidia/data/videosContent'
import { isSupabaseReady } from '@/lib/supabase/client'

export async function getPublicGalerias() {
  if (isSupabaseReady()) {
    try {
      const galerias = await fetchPublicGalerias()
      if (galerias.length) return galerias
    } catch (error) {
      console.error('[galerias] Falha ao buscar do Supabase.', error)
    }
  }

  return fotosContent.galleries
}

export async function getPublicGaleriaBySlug(slug: string) {
  if (isSupabaseReady()) {
    try {
      const galeria = await fetchPublicGaleriaBySlug(slug)
      if (galeria) return galeria
    } catch (error) {
      console.error(`[galerias] Falha ao buscar "${slug}".`, error)
    }
  }

  return fotosContent.galleries.find((g) => g.id === slug) ?? null
}

export async function getPublicVideos() {
  if (isSupabaseReady()) {
    try {
      const videos = await fetchPublicVideos()
      if (videos.length) return videos
    } catch (error) {
      console.error('[videos] Falha ao buscar do Supabase.', error)
    }
  }

  return videosContent.items
}

export async function getPublicVideoBySlug(slug: string) {
  if (isSupabaseReady()) {
    try {
      const video = await fetchPublicVideoBySlug(slug)
      if (video) return video
    } catch (error) {
      console.error(`[videos] Falha ao buscar "${slug}".`, error)
    }
  }

  return getVideoBySlug(slug) ?? null
}

export async function getPublicPodcast() {
  if (isSupabaseReady()) {
    try {
      const podcast = await fetchPublicPodcast()
      if (podcast) return podcast
    } catch (error) {
      console.error('[podcast] Falha ao buscar do Supabase.', error)
    }
  }

  return podcastContent
}

export async function getPublicGaleriaSlugs() {
  const galerias = await getPublicGalerias()
  return galerias.map((g) => ('slug' in g && g.slug ? g.slug : g.id))
}

export async function getPublicVideoSlugs() {
  const videos = await getPublicVideos()
  return videos.map((v) => v.slug ?? v.id).filter(Boolean) as string[]
}
