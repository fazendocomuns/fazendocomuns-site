import { supabase } from '@/lib/supabase/client'

export async function fetchPaginaConteudo<T>(slug: string): Promise<T | null> {
  const { data, error } = await supabase
    .from('paginas_conteudo')
    .select('content')
    .eq('slug', slug)
    .eq('status', 'active')
    .maybeSingle()

  if (error) throw error
  return data ? (data.content as T) : null
}
