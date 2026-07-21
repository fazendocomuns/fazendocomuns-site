import { supabase } from '@/lib/supabase/client'
import {
  mapEditorialToPublic,
  mapEventoToPublic,
  mapNoticiaToPublic,
} from '@/integrations/supabase/mappers/contentPublic'

export async function fetchPublicNoticias() {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('status', 'active')
    .order('published_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapNoticiaToPublic)
}

export async function fetchPublicNoticiaBySlug(slug: string) {
  const { data, error } = await supabase
    .from('noticias')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle()

  if (error) throw error
  return data ? mapNoticiaToPublic(data) : null
}

export async function fetchPublicEditoriais() {
  const { data, error } = await supabase
    .from('editoriais')
    .select('*')
    .eq('status', 'active')
    .order('published_at', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapEditorialToPublic)
}

export async function fetchPublicEditorialBySlug(slug: string) {
  const { data, error } = await supabase
    .from('editoriais')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle()

  if (error) throw error
  return data ? mapEditorialToPublic(data) : null
}

export async function fetchPublicEventos() {
  const { data, error } = await supabase
    .from('eventos')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapEventoToPublic)
}

export async function submitContactMessage(input: {
  firstName: string
  lastName: string
  email: string
  message: string
}) {
  const { error } = await supabase.from('contato_mensagens').insert({
    first_name: input.firstName,
    last_name: input.lastName,
    email: input.email,
    message: input.message,
  })

  if (error) throw error
}
