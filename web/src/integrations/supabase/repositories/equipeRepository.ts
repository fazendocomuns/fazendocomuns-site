import { supabase } from '@/lib/supabase/client'
import { slugify } from '@/lib/slug'
import {
  assistenteFormToInsert,
  assistenteFormToUpdate,
  colaboradorFormToInsert,
  colaboradorFormToUpdate,
  consultorFormToInsert,
  consultorFormToUpdate,
  mapAssistente,
  mapColaborador,
  mapConsultor,
  mapPesquisador,
  pesquisadorFormToInsert,
  pesquisadorFormToUpdate,
} from '@/integrations/supabase/mappers/equipe'
import type {
  AssistenteFormValues,
  ColaboradorFormValues,
  ConsultorFormValues,
  PesquisadorFormValues,
} from '@/features/admin/schemas'
import type { EntityStatus } from '@/features/admin/types'

type EquipeTable = 'pesquisadores' | 'assistentes' | 'consultores' | 'colaboradores'

async function ensureUniqueSlug(table: EquipeTable, name: string, excludeId?: string) {
  const base = slugify(name) || 'membro'
  let candidate = base
  let suffix = 2

  while (true) {
    let query = supabase.from(table).select('id').eq('slug', candidate)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data, error } = await query.maybeSingle()
    if (error) throw error
    if (!data) return candidate

    candidate = `${base}-${suffix}`
    suffix += 1
  }
}

async function reorder(table: EquipeTable, ids: string[]) {
  const updates = ids.map((id, index) =>
    supabase.from(table).update({ display_order: index + 1 }).eq('id', id),
  )

  const results = await Promise.all(updates)
  const failed = results.find((result) => result.error)
  if (failed?.error) throw failed.error
}

async function toggleStatus(table: EquipeTable, id: string, status: EntityStatus) {
  const next: EntityStatus = status === 'active' ? 'inactive' : 'active'
  const { error } = await supabase.from(table).update({ status: next }).eq('id', id)
  if (error) throw error
}

async function remove(table: EquipeTable, id: string) {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
}

// Pesquisadores

export async function fetchPesquisadores() {
  const { data, error } = await supabase
    .from('pesquisadores')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapPesquisador)
}

export async function fetchPesquisadorById(id: string) {
  const { data, error } = await supabase.from('pesquisadores').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? mapPesquisador(data) : null
}

export async function createPesquisador(values: PesquisadorFormValues) {
  const slug = await ensureUniqueSlug('pesquisadores', values.name)
  const { data, error } = await supabase
    .from('pesquisadores')
    .insert(pesquisadorFormToInsert(values, slug))
    .select('*')
    .single()

  if (error) throw error
  return mapPesquisador(data)
}

export async function updatePesquisador(id: string, values: PesquisadorFormValues) {
  const { data, error } = await supabase
    .from('pesquisadores')
    .update(pesquisadorFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapPesquisador(data)
}

export const deletePesquisador = (id: string) => remove('pesquisadores', id)
export const reorderPesquisadores = (ids: string[]) => reorder('pesquisadores', ids)
export const togglePesquisadorStatus = (id: string, status: EntityStatus) =>
  toggleStatus('pesquisadores', id, status)

// Assistentes

export async function fetchAssistentes() {
  const { data, error } = await supabase
    .from('assistentes')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapAssistente)
}

export async function fetchAssistenteById(id: string) {
  const { data, error } = await supabase.from('assistentes').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? mapAssistente(data) : null
}

export async function createAssistente(values: AssistenteFormValues) {
  const slug = await ensureUniqueSlug('assistentes', values.name)
  const { data, error } = await supabase
    .from('assistentes')
    .insert(assistenteFormToInsert(values, slug))
    .select('*')
    .single()

  if (error) throw error
  return mapAssistente(data)
}

export async function updateAssistente(id: string, values: AssistenteFormValues) {
  const { data, error } = await supabase
    .from('assistentes')
    .update(assistenteFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapAssistente(data)
}

export const deleteAssistente = (id: string) => remove('assistentes', id)
export const reorderAssistentes = (ids: string[]) => reorder('assistentes', ids)
export const toggleAssistenteStatus = (id: string, status: EntityStatus) =>
  toggleStatus('assistentes', id, status)

// Consultores

export async function fetchConsultores() {
  const { data, error } = await supabase
    .from('consultores')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapConsultor)
}

export async function fetchConsultorById(id: string) {
  const { data, error } = await supabase.from('consultores').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? mapConsultor(data) : null
}

export async function createConsultor(values: ConsultorFormValues) {
  const slug = await ensureUniqueSlug('consultores', values.name)
  const { data, error } = await supabase
    .from('consultores')
    .insert(consultorFormToInsert(values, slug))
    .select('*')
    .single()

  if (error) throw error
  return mapConsultor(data)
}

export async function updateConsultor(id: string, values: ConsultorFormValues) {
  const { data, error } = await supabase
    .from('consultores')
    .update(consultorFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapConsultor(data)
}

export const deleteConsultor = (id: string) => remove('consultores', id)
export const reorderConsultores = (ids: string[]) => reorder('consultores', ids)
export const toggleConsultorStatus = (id: string, status: EntityStatus) =>
  toggleStatus('consultores', id, status)

// Colaboradores

export async function fetchColaboradores() {
  const { data, error } = await supabase
    .from('colaboradores')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapColaborador)
}

export async function fetchColaboradorById(id: string) {
  const { data, error } = await supabase.from('colaboradores').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? mapColaborador(data) : null
}

export async function createColaborador(values: ColaboradorFormValues) {
  const slug = await ensureUniqueSlug('colaboradores', values.name)
  const { data, error } = await supabase
    .from('colaboradores')
    .insert(colaboradorFormToInsert(values, slug))
    .select('*')
    .single()

  if (error) throw error
  return mapColaborador(data)
}

export async function updateColaborador(id: string, values: ColaboradorFormValues) {
  const { data, error } = await supabase
    .from('colaboradores')
    .update(colaboradorFormToUpdate(values))
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return mapColaborador(data)
}

export const deleteColaborador = (id: string) => remove('colaboradores', id)
export const reorderColaboradores = (ids: string[]) => reorder('colaboradores', ids)
export const toggleColaboradorStatus = (id: string, status: EntityStatus) =>
  toggleStatus('colaboradores', id, status)
