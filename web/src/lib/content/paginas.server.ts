import { fetchPaginaConteudo } from '@/integrations/supabase/repositories/paginasPublicRepository'
import { isSupabaseReady } from '@/lib/supabase/client'

export async function getPaginaConteudo<T>(slug: string, fallback: T): Promise<T> {
  if (isSupabaseReady()) {
    try {
      const remote = await fetchPaginaConteudo<T>(slug)
      if (remote) return remote
    } catch (error) {
      console.error(`[paginas] Falha ao buscar "${slug}" do Supabase.`, error)
    }
  }

  return fallback
}
