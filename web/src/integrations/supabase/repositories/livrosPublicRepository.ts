import { supabase } from '@/lib/supabase/client'
import { mapLivro } from '@/integrations/supabase/mappers/livrosPublic'

export async function fetchPublicLivros() {
  const { data, error } = await supabase
    .from('livros')
    .select('*')
    .eq('status', 'active')
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []).map(mapLivro)
}

export async function fetchPublicLivroBySlug(slug: string) {
  const { data, error } = await supabase
    .from('livros')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle()

  if (error) throw error
  return data ? mapLivro(data) : null
}
