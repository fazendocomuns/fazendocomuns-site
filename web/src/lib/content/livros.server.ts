import {
  fetchPublicLivroBySlug,
  fetchPublicLivros,
} from '@/integrations/supabase/repositories/livrosPublicRepository'
import { livros as staticLivros } from '@/features/livros/data/livrosContent'
import { livrosHubIntro } from '@/features/livros/data/livrosHubContent'
import type { Livro } from '@/features/livros/types'
import { isSupabaseReady } from '@/lib/supabase/client'

export { livrosHubIntro }

export async function getPublicLivros(): Promise<Livro[]> {
  if (isSupabaseReady()) {
    try {
      return await fetchPublicLivros()
    } catch (error) {
      console.error('[livros] Falha ao buscar do Supabase, usando fallback estático.', error)
    }
  }

  return staticLivros
}

export async function getPublicLivroBySlug(slug: string): Promise<Livro | null> {
  if (isSupabaseReady()) {
    try {
      const remote = await fetchPublicLivroBySlug(slug)
      if (remote) return remote
    } catch (error) {
      console.error(`[livros] Falha ao buscar "${slug}" do Supabase.`, error)
    }
  }

  return staticLivros.find((item) => item.slug === slug) ?? null
}

export async function getPublicLivroSlugs(): Promise<string[]> {
  const items = await getPublicLivros()
  return items.map((item) => item.slug)
}
