import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import {
  deleteMidia,
  fetchMidia,
  uploadMidiaAsset,
} from '@/integrations/supabase/repositories/midiaRepository'
import { useAdminStore } from '@/features/admin/store/adminStore'
import { useAuth } from '@/features/admin/hooks/useAuth'

export const midiaKeys = {
  all: ['admin', 'midia'] as const,
}

export function useMidiaLibrary() {
  const mock = useAdminStore((s) => s.mediaLibrary)
  const enabled = isSupabaseConfigured()
  const query = useQuery({
    queryKey: midiaKeys.all,
    queryFn: fetchMidia,
    enabled,
    staleTime: 30_000,
  })

  if (!enabled) {
    return { data: mock, isLoading: false, isError: false, refetch: async () => ({}) }
  }

  return query
}

export function useMidiaMutations() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const invalidate = () => queryClient.invalidateQueries({ queryKey: midiaKeys.all })

  return {
    upload: useMutation({
      mutationFn: (file: File) => uploadMidiaAsset(file, user?.id),
      onSuccess: invalidate,
    }),
    remove: useMutation({
      mutationFn: async (id: string) => {
        if (isSupabaseConfigured()) return deleteMidia(id)
      },
      onSuccess: invalidate,
    }),
  }
}
