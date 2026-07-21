import {
  fetchPublicColaboradores,
  fetchPublicConsultores,
  fetchPublicEquipeGroups,
} from '@/integrations/supabase/repositories/equipePublicRepository'
import { colaboradoresContent } from '@/features/projeto/data/colaboradoresContent'
import { consultoresContent } from '@/features/projeto/data/consultoresContent'
import { equipeContent } from '@/features/projeto/data/equipeContent'
import { isSupabaseReady } from '@/lib/supabase/client'

export async function getPublicEquipeGroups() {
  if (isSupabaseReady()) {
    try {
      const groups = await fetchPublicEquipeGroups()
      if (groups.length) return groups
    } catch (error) {
      console.error('[equipe] Falha ao buscar grupos do Supabase.', error)
    }
  }

  return equipeContent.groups
}

export async function getPublicConsultores() {
  if (isSupabaseReady()) {
    try {
      const consultants = await fetchPublicConsultores()
      if (consultants.length) return consultants
    } catch (error) {
      console.error('[consultores] Falha ao buscar do Supabase.', error)
    }
  }

  return consultoresContent.consultants
}

export async function getPublicColaboradores() {
  if (isSupabaseReady()) {
    try {
      const members = await fetchPublicColaboradores()
      if (members.length) return members
    } catch (error) {
      console.error('[colaboradores] Falha ao buscar do Supabase.', error)
    }
  }

  return colaboradoresContent.members
}
