export {
  assertSupabaseEnv,
  isSupabaseConfigured,
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
  USE_SUPABASE,
} from '@/lib/supabase/env'
export { isSupabaseReady, supabase } from '@/lib/supabase/client'
export { uploadFile } from '@/lib/supabase/upload'
export type { UploadFileOptions, UploadFileResult } from '@/lib/supabase/upload'
