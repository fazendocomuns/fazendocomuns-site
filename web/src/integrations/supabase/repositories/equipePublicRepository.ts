import { supabase } from '@/lib/supabase/client'
import {
  mapAssistenteRowToTeamMember,
  mapColaboradorRowToTeamMember,
  mapConsultorRowToConsultant,
  mapPesquisadorRowToTeamMember,
} from '@/integrations/supabase/mappers/equipePublic'
import type { TeamGroup } from '@/features/projeto/data/equipeContent'
import type { Consultant } from '@/features/projeto/data/consultoresContent'
import type { TeamMember } from '@/features/projeto/data/equipeContent'

const COORDENACAO_TITLE = 'Coordenação-Geral'
const ASSISTENTES_TITLE = 'Pesquisadores (as) Assistentes'

export async function fetchPublicEquipeGroups(): Promise<TeamGroup[]> {
  const [pesquisadoresResult, assistentesResult] = await Promise.all([
    supabase
      .from('pesquisadores')
      .select('*')
      .eq('status', 'active')
      .order('display_order', { ascending: true }),
    supabase
      .from('assistentes')
      .select('*')
      .eq('status', 'active')
      .order('display_order', { ascending: true }),
  ])

  if (pesquisadoresResult.error) throw pesquisadoresResult.error
  if (assistentesResult.error) throw assistentesResult.error

  return [
    {
      id: 'coordenacao',
      title: COORDENACAO_TITLE,
      members: (pesquisadoresResult.data ?? []).map(mapPesquisadorRowToTeamMember),
    },
    {
      id: 'assistentes',
      title: ASSISTENTES_TITLE,
      members: (assistentesResult.data ?? []).map(mapAssistenteRowToTeamMember),
    },
  ]
}

export async function fetchPublicConsultores(): Promise<Consultant[]> {
  const { data, error } = await supabase
    .from('consultores')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapConsultorRowToConsultant)
}

export async function fetchPublicColaboradores(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from('colaboradores')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapColaboradorRowToTeamMember)
}
