import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'
import {
  isSupabaseConfigured,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  USE_SUPABASE,
} from '@/lib/supabase/env'

function createSupabaseClient() {
  if (!isSupabaseConfigured()) {
    return createClient<Database>(
      'https://placeholder.supabase.co',
      'placeholder-anon-key',
      { auth: { persistSession: false, autoRefreshToken: false } },
    )
  }

  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })
}

/** Cliente Supabase singleton — seguro importar em qualquer módulo. */
export const supabase = createSupabaseClient()

export function isSupabaseReady(): boolean {
  return USE_SUPABASE && isSupabaseConfigured()
}
