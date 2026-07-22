import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import {
  createMidiaFolder,
  deleteMidia,
  deleteMidiaFolder,
  fetchMidia,
  foldersFromMidiaItems,
  listStorageFolderMarkers,
  moveMidiaAsset,
  renameMidiaAsset,
  renameMidiaFolder,
  uploadMidiaAsset,
  uploadMidiaAssets,
} from '@/integrations/supabase/repositories/midiaRepository'
import { useAdminStore } from '@/features/admin/store/adminStore'
import { useAuth } from '@/features/admin/hooks/useAuth'
import { useMemo } from 'react'

export const midiaKeys = {
  all: ['admin', 'midia'] as const,
  folders: ['admin', 'midia', 'folders'] as const,
}

export type MidiaUploadInput =
  | File
  | { file: File; folder?: string; displayName?: string }

function resolveUpload(input: MidiaUploadInput): {
  file: File
  folder: string
  displayName?: string
} {
  if (input instanceof File) return { file: input, folder: '' }
  return {
    file: input.file,
    folder: input.folder ?? '',
    displayName: input.displayName,
  }
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
  const { data: mediaLibrary = [] } = useMidiaLibrary()

  const foldersFromMedia = useMemo(
    () => foldersFromMidiaItems(mediaLibrary),
    [mediaLibrary],
  )

  const query = useQuery({
    queryKey: midiaKeys.folders,
    queryFn: listStorageFolderMarkers,
    enabled,
    staleTime: 60_000,
    initialData: enabled ? undefined : [],
  })

  const data = useMemo(() => {
    const merged = new Set([...foldersFromMedia, ...(query.data ?? [])])
    return [...merged].sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [foldersFromMedia, query.data])

  return {
    ...query,
    data,
    // Pastas com arquivos aparecem na hora (via midia); storage só completa pastas vazias
    isLoading: enabled && foldersFromMedia.length === 0 && query.isLoading,
  }
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
        const { file, folder, displayName } = resolveUpload(input)
        return uploadMidiaAsset(file, user?.id, folder, displayName)
      },
      onSuccess: invalidate,
    }),
    uploadMany: useMutation({
      mutationFn: (input: {
        files: File[]
        folder?: string
        displayNames?: Array<string | undefined>
        onProgress?: (done: number, total: number, fileName: string) => void
      }) =>
        uploadMidiaAssets(
          input.files,
          user?.id,
          input.folder ?? '',
          input.onProgress,
          input.displayNames,
        ),
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
    renameFile: useMutation({
      mutationFn: (input: { id: string; name: string }) => renameMidiaAsset(input.id, input.name),
      onSuccess: invalidate,
    }),
    deleteFolder: useMutation({
      mutationFn: (folderPath: string) => deleteMidiaFolder(folderPath),
      onSuccess: invalidate,
    }),
    moveFile: useMutation({
      mutationFn: (input: { id: string; folder: string }) =>
        moveMidiaAsset(input.id, input.folder),
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
