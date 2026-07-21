import {
  fetchPublicEditorialBySlug,
  fetchPublicEditoriais,
} from '@/integrations/supabase/repositories/contentPublicRepository'
import {
  editoriais as staticEditoriais,
  editoriaisHubIntro,
} from '@/features/editoriais/data/editoriaisContent'
import type { Editorial } from '@/features/editoriais/data/editoriaisContent'
import { isSupabaseReady } from '@/lib/supabase/client'

export { editoriaisHubIntro }

export async function getPublicEditoriais(): Promise<Editorial[]> {
  if (isSupabaseReady()) {
    try {
      return await fetchPublicEditoriais()
    } catch (error) {
      console.error('[editoriais] Falha ao buscar do Supabase, usando fallback estático.', error)
    }
  }

  return staticEditoriais
}

export async function getPublicEditorialBySlug(slug: string): Promise<Editorial | null> {
  if (isSupabaseReady()) {
    try {
      const remote = await fetchPublicEditorialBySlug(slug)
      if (remote) return remote
    } catch (error) {
      console.error(`[editoriais] Falha ao buscar "${slug}" do Supabase.`, error)
    }
  }

  return staticEditoriais.find((item) => item.slug === slug) ?? null
}

export async function getPublicEditorialSlugs(): Promise<string[]> {
  const items = await getPublicEditoriais()
  return items.map((item) => item.slug)
}
