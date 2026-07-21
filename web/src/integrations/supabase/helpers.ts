import { supabase } from '@/lib/supabase/client'
import { slugify } from '@/lib/slug'

type SlugTable =
  | 'pesquisadores'
  | 'assistentes'
  | 'consultores'
  | 'colaboradores'
  | 'noticias'
  | 'editoriais'
  | 'eventos'
  | 'videos'
  | 'livros'
  | 'galerias'
  | 'podcast_episodios'
  | 'paginas_conteudo'

export async function ensureUniqueSlug(table: SlugTable, name: string, excludeId?: string) {
  const base = slugify(name) || 'item'
  let candidate = base
  let suffix = 2

  while (true) {
    let query = supabase.from(table).select('id').eq('slug', candidate)
    if (excludeId) query = query.neq('id', excludeId)
    const { data, error } = await query.maybeSingle()
    if (error) throw error
    if (!data) return candidate
    candidate = `${base}-${suffix}`
    suffix += 1
  }
}

export function htmlToParagraphs(html: string): string[] {
  const matches = html.match(/<p[^>]*>([\s\S]*?)<\/p>/gi)
  if (matches?.length) {
    return matches
      .map((block) =>
        block
          .replace(/<\/?p[^>]*>/gi, '')
          .replace(/<[^>]+>/g, '')
          .trim(),
      )
      .filter(Boolean)
  }

  return html
    .replace(/<[^>]+>/g, '')
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
}

export async function getCategoriaIdByName(name: string): Promise<string | null> {
  const { data, error } = await supabase
    .from('categorias_noticia')
    .select('id')
    .eq('name', name)
    .maybeSingle()

  if (error) throw error
  return data?.id ?? null
}
