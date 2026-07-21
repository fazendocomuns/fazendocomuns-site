import { supabase } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export async function logActivity(input: {
  action: string
  entityType: string
  entityId?: string
  entityName: string
  userId?: string
}) {
  if (!isSupabaseConfigured()) return

  await supabase.from('atividades_log').insert({
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId ?? null,
    entity_name: input.entityName,
    user_id: input.userId ?? null,
  })
}
