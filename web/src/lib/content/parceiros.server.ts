import { fetchPublicParceiros } from '@/integrations/supabase/repositories/parceirosPublicRepository'
import { parceirosContent } from '@/features/projeto/data/parceirosContent'
import { isSupabaseReady } from '@/lib/supabase/client'

export async function getPublicParceiros() {
  if (isSupabaseReady()) {
    try {
      const groups = await fetchPublicParceiros()
      if (groups.length) return groups
    } catch (error) {
      console.error('[parceiros] Falha ao buscar do Supabase.', error)
    }
  }

  return parceirosContent.groups
}
