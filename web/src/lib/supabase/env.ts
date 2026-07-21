const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? ''

export const USE_SUPABASE = process.env.NEXT_PUBLIC_USE_SUPABASE === 'true'

export const SUPABASE_URL = supabaseUrl
export const SUPABASE_ANON_KEY = supabaseAnonKey

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

export function assertSupabaseEnv(): void {
  if (!USE_SUPABASE) {
    if (process.env.NODE_ENV === 'development' && (!supabaseUrl || !supabaseAnonKey)) {
      console.info(
        '[fazendo-comuns] Supabase desabilitado (NEXT_PUBLIC_USE_SUPABASE=false). Site usa conteúdo estático.',
      )
    }
    return
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    const message =
      'Supabase habilitado mas NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY estão vazios.'

    if (process.env.NODE_ENV === 'production') {
      throw new Error(message)
    }

    console.warn(`[fazendo-comuns] ${message}`)
  }
}
