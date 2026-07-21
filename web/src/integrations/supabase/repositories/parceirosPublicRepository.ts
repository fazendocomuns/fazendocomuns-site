import { supabase } from '@/lib/supabase/client'
import { mapLinkParceiro, mapParceiroGrupo } from '@/integrations/supabase/mappers/parceirosPublic'

export async function fetchPublicParceiros() {
  const { data: grupos, error } = await supabase
    .from('parceiro_grupos')
    .select('*')
    .eq('status', 'active')
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

  return grupos.map((grupo) => mapParceiroGrupo(grupo, byGrupo.get(grupo.id) ?? []))
}

export async function fetchPublicLinksParceiros() {
  const { data, error } = await supabase
    .from('links_parceiros')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapLinkParceiro)
}
