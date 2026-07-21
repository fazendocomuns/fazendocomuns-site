import { fetchPublicLinksParceiros } from '@/integrations/supabase/repositories/parceirosPublicRepository'
import { linksParceirosContent } from '@/features/mais/data/linksParceirosContent'
import { isSupabaseReady } from '@/lib/supabase/client'

export async function getPublicLinksParceiros() {
  if (isSupabaseReady()) {
    try {
      const links = await fetchPublicLinksParceiros()
      if (links.length) return links
    } catch (error) {
      console.error('[links-parceiros] Falha ao buscar do Supabase.', error)
    }
  }

  return linksParceirosContent.partners
}
