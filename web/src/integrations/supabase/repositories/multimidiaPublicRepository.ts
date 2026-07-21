import { supabase } from '@/lib/supabase/client'
import {
  mapGaleria,
  mapPodcastContent,
  mapVideo,
} from '@/integrations/supabase/mappers/multimidiaPublic'

export async function fetchPublicGalerias() {
  const { data: galerias, error } = await supabase
    .from('galerias')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })

  if (error) throw error
  if (!galerias?.length) return []

  const ids = galerias.map((g) => g.id)
  const { data: fotos, error: fotosError } = await supabase
    .from('galeria_fotos')
    .select('galeria_id, image_url, display_order')
    .in('galeria_id', ids)
    .order('display_order', { ascending: true })

  if (fotosError) throw fotosError

  const byGaleria = new Map<string, string[]>()
  for (const foto of fotos ?? []) {
    const list = byGaleria.get(foto.galeria_id) ?? []
    list.push(foto.image_url)
    byGaleria.set(foto.galeria_id, list)
  }

  return galerias.map((galeria) =>
    mapGaleria(galeria, byGaleria.get(galeria.id) ?? [galeria.cover_url]),
  )
}

export async function fetchPublicGaleriaBySlug(slug: string) {
  const { data: galeria, error } = await supabase
    .from('galerias')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle()

  if (error) throw error
  if (!galeria) return null

  const { data: fotos, error: fotosError } = await supabase
    .from('galeria_fotos')
    .select('image_url, display_order')
    .eq('galeria_id', galeria.id)
    .order('display_order', { ascending: true })

  if (fotosError) throw fotosError
  return mapGaleria(galeria, (fotos ?? []).map((f) => f.image_url))
}

export async function fetchPublicVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapVideo)
}

export async function fetchPublicVideoBySlug(slug: string) {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle()

  if (error) throw error
  return data ? mapVideo(data) : null
}

export async function fetchPublicPodcast() {
  const { data, error } = await supabase
    .from('podcast_episodios')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })
    .limit(1)

  if (error) throw error
  return mapPodcastContent(data ?? [])
}
