import { supabase } from '@/lib/supabase/client'
import { ensureUniqueSlug } from '@/integrations/supabase/helpers'
import {
  galeriaFormToInsert,
  galeriaFormToUpdate,
  linkParceiroFormToInsert,
  linkParceiroFormToUpdate,
  livroFormToInsert,
  livroFormToUpdate,
  mapGaleriaAdmin,
  mapLinkParceiroAdmin,
  mapLivroAdmin,
  mapPaginaAdmin,
  mapParceiroGrupoAdmin,
  mapPodcastAdmin,
  mapVideoAdmin,
  paginaFormToInsert,
  paginaFormToUpdate,
  parseGaleriaImageUrls,
  podcastFormToInsert,
  podcastFormToUpdate,
  videoFormToInsert,
  videoFormToUpdate,
} from '@/integrations/supabase/mappers/adminEntities'
import type {
  GaleriaFormValues,
  LinkParceiroFormValues,
  LivroFormValues,
  PaginaFormValues,
  PodcastEpisodioFormValues,
  VideoFormValues,
} from '@/features/admin/schemas'
import type { EntityStatus } from '@/features/admin/types'
import type { ParceiroGrupoFormValues } from '@/features/admin/schemas'

type StatusTable =
  | 'videos'
  | 'livros'
  | 'galerias'
  | 'podcast_episodios'
  | 'parceiro_grupos'
  | 'links_parceiros'
  | 'paginas_conteudo'

async function toggleStatus(table: StatusTable, id: string, status: EntityStatus) {
  const next: EntityStatus = status === 'active' ? 'inactive' : 'active'
  const { error } = await supabase.from(table).update({ status: next }).eq('id', id)
  if (error) throw error
}

// Videos

export async function fetchVideos() {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) throw error
  return (data ?? []).map(mapVideoAdmin)
}

export async function fetchVideoById(id: string) {
  const { data, error } = await supabase.from('videos').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? mapVideoAdmin(data) : null
}

export async function createVideo(values: VideoFormValues) {
  const slug = await ensureUniqueSlug('videos', values.title)
  const { data, error } = await supabase
    .from('videos')
    .insert(videoFormToInsert(values, slug))
    .select('*')
    .single()
  if (error) throw error
  return mapVideoAdmin(data)
}

export async function updateVideo(id: string, values: VideoFormValues) {
  const { data, error } = await supabase
    .from('videos')
    .update(videoFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return mapVideoAdmin(data)
}

export async function deleteVideo(id: string) {
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) throw error
}

export const toggleVideoStatus = (id: string, status: EntityStatus) =>
  toggleStatus('videos', id, status)

// Livros

export async function fetchLivros() {
  const { data, error } = await supabase
    .from('livros')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) throw error
  return (data ?? []).map(mapLivroAdmin)
}

export async function fetchLivroById(id: string) {
  const { data, error } = await supabase.from('livros').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? mapLivroAdmin(data) : null
}

export async function createLivro(values: LivroFormValues) {
  const slug = await ensureUniqueSlug('livros', values.title)
  const { data, error } = await supabase
    .from('livros')
    .insert(livroFormToInsert(values, slug))
    .select('*')
    .single()
  if (error) throw error
  return mapLivroAdmin(data)
}

export async function updateLivro(id: string, values: LivroFormValues) {
  const { data, error } = await supabase
    .from('livros')
    .update(livroFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return mapLivroAdmin(data)
}

export async function deleteLivro(id: string) {
  const { error } = await supabase.from('livros').delete().eq('id', id)
  if (error) throw error
}

export const toggleLivroStatus = (id: string, status: EntityStatus) =>
  toggleStatus('livros', id, status)

// Galerias

async function syncGaleriaFotos(galeriaId: string, imageUrls: string[]) {
  await supabase.from('galeria_fotos').delete().eq('galeria_id', galeriaId)
  if (!imageUrls.length) return
  const { error } = await supabase.from('galeria_fotos').insert(
    imageUrls.map((url, index) => ({
      galeria_id: galeriaId,
      image_url: url,
      display_order: index + 1,
    })),
  )
  if (error) throw error
}

export async function fetchGalerias() {
  const { data: galerias, error } = await supabase
    .from('galerias')
    .select('*')
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
    mapGaleriaAdmin(galeria, byGaleria.get(galeria.id) ?? [galeria.cover_url]),
  )
}

export async function fetchGaleriaById(id: string) {
  const { data: galeria, error } = await supabase
    .from('galerias')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  if (!galeria) return null

  const { data: fotos, error: fotosError } = await supabase
    .from('galeria_fotos')
    .select('image_url, display_order')
    .eq('galeria_id', id)
    .order('display_order', { ascending: true })
  if (fotosError) throw fotosError

  return mapGaleriaAdmin(galeria, (fotos ?? []).map((f) => f.image_url))
}

export async function createGaleria(values: GaleriaFormValues) {
  const slug = await ensureUniqueSlug('galerias', values.title)
  const { data, error } = await supabase
    .from('galerias')
    .insert(galeriaFormToInsert(values, slug))
    .select('*')
    .single()
  if (error) throw error
  const imageUrls = parseGaleriaImageUrls(values.imageUrls)
  await syncGaleriaFotos(data.id, imageUrls)
  return mapGaleriaAdmin(data, imageUrls)
}

export async function updateGaleria(id: string, values: GaleriaFormValues) {
  const { data, error } = await supabase
    .from('galerias')
    .update(galeriaFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  const imageUrls = parseGaleriaImageUrls(values.imageUrls)
  await syncGaleriaFotos(id, imageUrls)
  return mapGaleriaAdmin(data, imageUrls)
}

export async function deleteGaleria(id: string) {
  const { error } = await supabase.from('galerias').delete().eq('id', id)
  if (error) throw error
}

export const toggleGaleriaStatus = (id: string, status: EntityStatus) =>
  toggleStatus('galerias', id, status)

// Podcast

export async function fetchPodcastEpisodios() {
  const { data, error } = await supabase
    .from('podcast_episodios')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) throw error
  return (data ?? []).map(mapPodcastAdmin)
}

export async function fetchPodcastEpisodioById(id: string) {
  const { data, error } = await supabase
    .from('podcast_episodios')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data ? mapPodcastAdmin(data) : null
}

export async function createPodcastEpisodio(values: PodcastEpisodioFormValues) {
  const slug = await ensureUniqueSlug('podcast_episodios', values.title)
  const { data, error } = await supabase
    .from('podcast_episodios')
    .insert(podcastFormToInsert(values, slug))
    .select('*')
    .single()
  if (error) throw error
  return mapPodcastAdmin(data)
}

export async function updatePodcastEpisodio(id: string, values: PodcastEpisodioFormValues) {
  const { data, error } = await supabase
    .from('podcast_episodios')
    .update(podcastFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return mapPodcastAdmin(data)
}

export async function deletePodcastEpisodio(id: string) {
  const { error } = await supabase.from('podcast_episodios').delete().eq('id', id)
  if (error) throw error
}

export const togglePodcastStatus = (id: string, status: EntityStatus) =>
  toggleStatus('podcast_episodios', id, status)

// Parceiros

export async function fetchParceiroGrupos() {
  const { data: grupos, error } = await supabase
    .from('parceiro_grupos')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) throw error
  if (!grupos?.length) return []

  const ids = grupos.map((g) => g.id)
  const { data: logos, error: logosError } = await supabase
    .from('parceiro_logos')
    .select('*')
    .in('grupo_id', ids)
    .order('display_order', { ascending: true })
  if (logosError) throw logosError

  const byGrupo = new Map<string, typeof logos>()
  for (const logo of logos ?? []) {
    const list = byGrupo.get(logo.grupo_id) ?? []
    list.push(logo)
    byGrupo.set(logo.grupo_id, list)
  }

  return grupos.map((grupo) => mapParceiroGrupoAdmin(grupo, byGrupo.get(grupo.id) ?? []))
}

export async function fetchParceiroGrupoById(id: string) {
  const { data: grupo, error } = await supabase
    .from('parceiro_grupos')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  if (!grupo) return null

  const { data: logos, error: logosError } = await supabase
    .from('parceiro_logos')
    .select('*')
    .eq('grupo_id', id)
    .order('display_order', { ascending: true })
  if (logosError) throw logosError

  return mapParceiroGrupoAdmin(grupo, logos ?? [])
}

export async function createParceiroGrupo(values: ParceiroGrupoFormValues) {
  const { data: grupo, error } = await supabase
    .from('parceiro_grupos')
    .insert({
      title: values.title,
      display_order: values.displayOrder,
      status: values.status,
    })
    .select('*')
    .single()
  if (error) throw error

  if (values.logos.length) {
    const { error: logosError } = await supabase.from('parceiro_logos').insert(
      values.logos.map((logo, index) => ({
        grupo_id: grupo.id,
        logo_url: logo.logoUrl,
        alt: logo.alt,
        website: logo.website || '',
        display_order: index + 1,
      })),
    )
    if (logosError) throw logosError
  }

  return fetchParceiroGrupoById(grupo.id)
}

export async function updateParceiroGrupo(id: string, values: ParceiroGrupoFormValues) {
  const { error } = await supabase
    .from('parceiro_grupos')
    .update({
      title: values.title,
      display_order: values.displayOrder,
      status: values.status,
    })
    .eq('id', id)
  if (error) throw error

  await supabase.from('parceiro_logos').delete().eq('grupo_id', id)
  if (values.logos.length) {
    const { error: logosError } = await supabase.from('parceiro_logos').insert(
      values.logos.map((logo, index) => ({
        grupo_id: id,
        logo_url: logo.logoUrl,
        alt: logo.alt,
        website: logo.website || '',
        display_order: index + 1,
      })),
    )
    if (logosError) throw logosError
  }

  return fetchParceiroGrupoById(id)
}

export async function deleteParceiroGrupo(id: string) {
  const { error } = await supabase.from('parceiro_grupos').delete().eq('id', id)
  if (error) throw error
}

export const toggleParceiroGrupoStatus = (id: string, status: EntityStatus) =>
  toggleStatus('parceiro_grupos', id, status)

// Links parceiros

export async function fetchLinksParceiros() {
  const { data, error } = await supabase
    .from('links_parceiros')
    .select('*')
    .order('display_order', { ascending: true })
  if (error) throw error
  return (data ?? []).map(mapLinkParceiroAdmin)
}

export async function fetchLinkParceiroById(id: string) {
  const { data, error } = await supabase
    .from('links_parceiros')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data ? mapLinkParceiroAdmin(data) : null
}

export async function createLinkParceiro(values: LinkParceiroFormValues) {
  const { data, error } = await supabase
    .from('links_parceiros')
    .insert(linkParceiroFormToInsert(values))
    .select('*')
    .single()
  if (error) throw error
  return mapLinkParceiroAdmin(data)
}

export async function updateLinkParceiro(id: string, values: LinkParceiroFormValues) {
  const { data, error } = await supabase
    .from('links_parceiros')
    .update(linkParceiroFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return mapLinkParceiroAdmin(data)
}

export async function deleteLinkParceiro(id: string) {
  const { error } = await supabase.from('links_parceiros').delete().eq('id', id)
  if (error) throw error
}

export const toggleLinkParceiroStatus = (id: string, status: EntityStatus) =>
  toggleStatus('links_parceiros', id, status)

// Páginas

export async function fetchPaginas() {
  const { data, error } = await supabase
    .from('paginas_conteudo')
    .select('*')
    .order('title', { ascending: true })
  if (error) throw error
  return (data ?? []).map(mapPaginaAdmin)
}

export async function fetchPaginaById(id: string) {
  const { data, error } = await supabase
    .from('paginas_conteudo')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return data ? mapPaginaAdmin(data) : null
}

export async function createPagina(values: PaginaFormValues) {
  const { data, error } = await supabase
    .from('paginas_conteudo')
    .insert(paginaFormToInsert(values))
    .select('*')
    .single()
  if (error) throw error
  return mapPaginaAdmin(data)
}

export async function updatePagina(id: string, values: PaginaFormValues) {
  const { data, error } = await supabase
    .from('paginas_conteudo')
    .update(paginaFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()
  if (error) throw error
  return mapPaginaAdmin(data)
}

export async function deletePagina(id: string) {
  const { error } = await supabase.from('paginas_conteudo').delete().eq('id', id)
  if (error) throw error
}

export const togglePaginaStatus = (id: string, status: EntityStatus) =>
  toggleStatus('paginas_conteudo', id, status)
