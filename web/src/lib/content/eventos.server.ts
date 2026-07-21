import { fetchPublicEventos } from '@/integrations/supabase/repositories/contentPublicRepository'
import {
  eventItems as staticEventItems,
  type HomeEventItem,
} from '@/features/home/data/homeContent'
import { eventosHubIntro } from '@/features/eventos/data/eventosContent'
import { isSupabaseReady } from '@/lib/supabase/client'

export { eventosHubIntro }

export async function getPublicEventos(): Promise<HomeEventItem[]> {
  if (isSupabaseReady()) {
    try {
      const eventos = await fetchPublicEventos()
      if (eventos.length) return eventos
    } catch (error) {
      console.error('[eventos] Falha ao buscar do Supabase, usando fallback estático.', error)
    }
  }

  return staticEventItems
}
