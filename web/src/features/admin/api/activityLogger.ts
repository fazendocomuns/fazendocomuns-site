import { useQueryClient } from '@tanstack/react-query'
import { logActivity } from '@/integrations/supabase/logActivity'
import { dashboardKeys } from '@/features/admin/api/dashboard'
import { useAuth } from '@/features/admin/hooks/useAuth'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export function useAdminActivityLogger() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const log = (
    action: string,
    entityType: string,
    entityName: string,
    entityId?: string,
  ) => {
    if (!isSupabaseConfigured()) return
    void logActivity({
      action,
      entityType,
      entityName,
      entityId,
      userId: user?.id,
    }).then(() => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.activities })
    })
  }

  return { log }
}
