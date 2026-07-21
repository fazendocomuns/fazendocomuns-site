import { supabase } from '@/lib/supabase/client'
import {
  ensureUniqueSlug,
  getCategoriaIdByName,
} from '@/integrations/supabase/helpers'
import {
  editorialFormToInsert,
  editorialFormToUpdate,
  eventoFormToInsert,
  eventoFormToUpdate,
  mapEditorial,
  mapEvento,
  mapNoticia,
  noticiaFormToInsert,
  noticiaFormToUpdate,
} from '@/integrations/supabase/mappers/content'
import type {
  EditorialFormValues,
  EventoFormValues,
  NoticiaFormValues,
} from '@/features/admin/schemas'
import type { EntityStatus } from '@/features/admin/types'

async function toggleStatus(
  table: 'noticias' | 'editoriais' | 'eventos',
  id: string,
  status: EntityStatus,
) {
  const next: EntityStatus = status === 'active' ? 'inactive' : 'active'
  const { error } = await supabase.from(table).update({ status: next }).eq('id', id)
  if (error) throw error
}

async function remove(table: 'noticias' | 'editoriais' | 'eventos', id: string) {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
}

// Notícias

export async function fetchNoticias() {
  const { data, error } = await supabase
    .from('noticias')
    .select('*, categorias_noticia(name)')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapNoticia)
}

export async function fetchNoticiaById(id: string) {
  const { data, error } = await supabase
    .from('noticias')
    .select('*, categorias_noticia(name)')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data ? mapNoticia(data) : null
}

export async function createNoticia(values: NoticiaFormValues) {
  const slug = await ensureUniqueSlug('noticias', values.title)
  const categoriaId = await getCategoriaIdByName(values.category)
  const { data, error } = await supabase
    .from('noticias')
    .insert(noticiaFormToInsert(values, slug, categoriaId))
    .select('*, categorias_noticia(name)')
    .single()

  if (error) throw error
  return mapNoticia(data)
}

export async function updateNoticia(id: string, values: NoticiaFormValues) {
  const categoriaId = await getCategoriaIdByName(values.category)
  const { data, error } = await supabase
    .from('noticias')
    .update(noticiaFormToUpdate(values, categoriaId))
    .eq('id', id)
    .select('*, categorias_noticia(name)')
    .single()

  if (error) throw error
  return mapNoticia(data)
}

export const deleteNoticia = (id: string) => remove('noticias', id)
export const toggleNoticiaStatus = (id: string, status: EntityStatus) =>
  toggleStatus('noticias', id, status)

export async function fetchNewsCategories() {
  const { data, error } = await supabase
    .from('categorias_noticia')
    .select('name')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map((row) => row.name)
}

// Editoriais

export async function fetchEditoriais() {
  const { data, error } = await supabase
    .from('editoriais')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapEditorial)
}

export async function fetchEditorialById(id: string) {
  const { data, error } = await supabase.from('editoriais').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? mapEditorial(data) : null
}

export async function createEditorial(values: EditorialFormValues) {
  const slug = await ensureUniqueSlug('editoriais', values.title)
  const { data, error } = await supabase
    .from('editoriais')
    .insert(editorialFormToInsert(values, slug))
    .select('*')
    .single()

  if (error) throw error
  return mapEditorial(data)
}

export async function updateEditorial(id: string, values: EditorialFormValues) {
  const { data, error } = await supabase
    .from('editoriais')
    .update(editorialFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapEditorial(data)
}

export const deleteEditorial = (id: string) => remove('editoriais', id)
export const toggleEditorialStatus = (id: string, status: EntityStatus) =>
  toggleStatus('editoriais', id, status)

// Eventos

export async function fetchEventos() {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapEvento)
}

export async function fetchEventoById(id: string) {
  const { data, error } = await supabase.from('eventos').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? mapEvento(data) : null
}

export async function createEvento(values: EventoFormValues) {
  const slug = await ensureUniqueSlug('eventos', values.name)
  const { data, error } = await supabase
    .from('eventos')
    .insert(eventoFormToInsert(values, slug))
    .select('*')
    .single()

  if (error) throw error
  return mapEvento(data)
}

export async function updateEvento(id: string, values: EventoFormValues) {
  const { data, error } = await supabase
    .from('eventos')
    .update(eventoFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapEvento(data)
}

export const deleteEvento = (id: string) => remove('eventos', id)
export const toggleEventoStatus = (id: string, status: EntityStatus) =>
  toggleStatus('eventos', id, status)

// Dashboard

export async function fetchDashboardCounts() {
  const tables = [
    'pesquisadores',
    'assistentes',
    'consultores',
    'colaboradores',
    'noticias',
    'editoriais',
    'eventos',
    'videos',
    'livros',
    'galerias',
    'podcast_episodios',
    'parceiro_grupos',
    'links_parceiros',
    'paginas_conteudo',
  ] as const

  const results = await Promise.all(
    tables.map(async (table) => {
      const { count, error } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true })
      if (error) throw error
      return [table, count ?? 0] as const
    }),
  )

  return Object.fromEntries(results) as Record<(typeof tables)[number], number>
}

export async function fetchRecentContent() {
  const [noticias, editoriais, eventos] = await Promise.all([
    supabase
      .from('noticias')
      .select('id, title, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('editoriais')
      .select('id, title, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5),
    supabase
      .from('eventos')
      .select('id, name, updated_at')
      .order('updated_at', { ascending: false })
      .limit(5),
  ])

  if (noticias.error) throw noticias.error
  if (editoriais.error) throw editoriais.error
  if (eventos.error) throw eventos.error

  return [
    ...(noticias.data ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      type: 'Notícia' as const,
      date: item.updated_at,
      href: `/admin/noticias/${item.id}/editar`,
    })),
    ...(editoriais.data ?? []).map((item) => ({
      id: item.id,
      title: item.title,
      type: 'Editorial' as const,
      date: item.updated_at,
      href: `/admin/editoriais/${item.id}/editar`,
    })),
    ...(eventos.data ?? []).map((item) => ({
      id: item.id,
      title: item.name,
      type: 'Evento' as const,
      date: item.updated_at,
      href: `/admin/eventos/${item.id}/editar`,
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}
