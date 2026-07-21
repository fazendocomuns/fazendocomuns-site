import { supabase } from '@/lib/supabase/client'
import type { ActivityItem } from '@/features/admin/types'

export async function fetchRecentActivities(limit = 20): Promise<ActivityItem[]> {
  const { data, error } = await supabase
    .from('atividades_log')
    .select('id, action, entity_type, entity_name, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  return (data ?? []).map((row) => ({
    id: row.id,
    action: row.action,
    entity: row.entity_type,
    entityName: row.entity_name,
    timestamp: row.created_at,
  }))
}
