import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import {
  createMidiaFolder,
  deleteMidia,
  deleteMidiaFolder,
  fetchMidia,
  listMidiaFolders,
  renameMidiaFolder,
  uploadMidiaAsset,
  uploadMidiaAssets,
} from '@/integrations/supabase/repositories/midiaRepository'
import { useAdminStore } from '@/features/admin/store/adminStore'
import { useAuth } from '@/features/admin/hooks/useAuth'

export const midiaKeys = {
  all: ['admin', 'midia'] as const,
  folders: ['admin', 'midia', 'folders'] as const,
}

export type MidiaUploadInput = File | { file: File; folder?: string }

function resolveUpload(input: MidiaUploadInput): { file: File; folder: string } {
  if (input instanceof File) return { file: input, folder: '' }
  return { file: input.file, folder: input.folder ?? '' }
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

export function useMidiaFolders() {
  const enabled = isSupabaseConfigured()
  return useQuery({
    queryKey: midiaKeys.folders,
    queryFn: listMidiaFolders,
    enabled,
    staleTime: 30_000,
    initialData: enabled ? undefined : [],
  })
}

export function useMidiaMutations() {
  const queryClient = useQueryClient()
  const { user } = useAuth()

  const invalidate = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: midiaKeys.all }),
      queryClient.invalidateQueries({ queryKey: midiaKeys.folders }),
    ])
  }

  return {
    upload: useMutation({
      mutationFn: (input: MidiaUploadInput) => {
        const { file, folder } = resolveUpload(input)
        return uploadMidiaAsset(file, user?.id, folder)
      },
      onSuccess: invalidate,
    }),
    uploadMany: useMutation({
      mutationFn: (input: { files: File[]; folder?: string }) =>
        uploadMidiaAssets(input.files, user?.id, input.folder ?? ''),
      onSuccess: invalidate,
    }),
    createFolder: useMutation({
      mutationFn: (folderPath: string) => createMidiaFolder(folderPath),
      onSuccess: invalidate,
    }),
    renameFolder: useMutation({
      mutationFn: (input: { from: string; to: string }) => renameMidiaFolder(input.from, input.to),
      onSuccess: invalidate,
    }),
    deleteFolder: useMutation({
      mutationFn: (folderPath: string) => deleteMidiaFolder(folderPath),
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
