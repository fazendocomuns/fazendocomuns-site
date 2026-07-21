import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { useAdminActivityLogger } from '@/features/admin/api/activityLogger'
import {
  createGaleria,
  createLinkParceiro,
  createLivro,
  createPagina,
  createParceiroGrupo,
  createPodcastEpisodio,
  createVideo,
  deleteGaleria,
  deleteLinkParceiro,
  deleteLivro,
  deletePagina,
  deleteParceiroGrupo,
  deletePodcastEpisodio,
  deleteVideo,
  fetchGaleriaById,
  fetchGalerias,
  fetchLinkParceiroById,
  fetchLinksParceiros,
  fetchLivroById,
  fetchLivros,
  fetchPaginaById,
  fetchPaginas,
  fetchParceiroGrupoById,
  fetchParceiroGrupos,
  fetchPodcastEpisodioById,
  fetchPodcastEpisodios,
  fetchVideoById,
  fetchVideos,
  toggleGaleriaStatus,
  toggleLinkParceiroStatus,
  toggleLivroStatus,
  togglePaginaStatus,
  toggleParceiroGrupoStatus,
  togglePodcastStatus,
  toggleVideoStatus,
  updateGaleria,
  updateLinkParceiro,
  updateLivro,
  updatePagina,
  updateParceiroGrupo,
  updatePodcastEpisodio,
  updateVideo,
} from '@/integrations/supabase/repositories/adminEntitiesRepository'
import type {
  GaleriaFormValues,
  LinkParceiroFormValues,
  LivroFormValues,
  PaginaFormValues,
  ParceiroGrupoFormValues,
  PodcastEpisodioFormValues,
  VideoFormValues,
} from '@/features/admin/schemas'
import type { EntityStatus } from '@/features/admin/types'

export const videoKeys = {
  all: ['admin', 'videos'] as const,
  detail: (id: string) => ['admin', 'videos', id] as const,
}

export const livroKeys = {
  all: ['admin', 'livros'] as const,
  detail: (id: string) => ['admin', 'livros', id] as const,
}

export const galeriaKeys = {
  all: ['admin', 'galerias'] as const,
  detail: (id: string) => ['admin', 'galerias', id] as const,
}

export const podcastKeys = {
  all: ['admin', 'podcast'] as const,
  detail: (id: string) => ['admin', 'podcast', id] as const,
}

export const parceiroKeys = {
  grupos: ['admin', 'parceiros', 'grupos'] as const,
  grupo: (id: string) => ['admin', 'parceiros', 'grupos', id] as const,
  links: ['admin', 'parceiros', 'links'] as const,
  link: (id: string) => ['admin', 'parceiros', 'links', id] as const,
}

export const paginaKeys = {
  all: ['admin', 'paginas'] as const,
  detail: (id: string) => ['admin', 'paginas', id] as const,
}

function useEntityQuery<T>(key: readonly unknown[], fn: () => Promise<T[]>) {
  return useQuery({
    queryKey: key,
    queryFn: fn,
    enabled: isSupabaseConfigured(),
  })
}

function useEntityDetail<T>(key: readonly unknown[], fn: () => Promise<T | null>, id?: string) {
  return useQuery({
    queryKey: key,
    queryFn: fn,
    enabled: isSupabaseConfigured() && Boolean(id),
  })
}

function invalidatePublic(queryClient: ReturnType<typeof useQueryClient>, keys: string[]) {
  for (const key of keys) {
    queryClient.invalidateQueries({ queryKey: ['public', key] })
  }
}

// Videos

export function useVideos() {
  return useEntityQuery(videoKeys.all, fetchVideos)
}

export function useVideo(id?: string) {
  return useEntityDetail(videoKeys.detail(id ?? ''), () => fetchVideoById(id!), id)
}

export function useVideoMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: videoKeys.all })
    invalidatePublic(queryClient, ['videos'])
  }

  return {
    create: useMutation({
      mutationFn: createVideo,
      onSuccess: (data, values) => {
        invalidate()
        log('Criou', 'Vídeo', values.title, data.id)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, values }: { id: string; values: VideoFormValues }) => updateVideo(id, values),
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: videoKeys.detail(v.id) })
        log('Atualizou', 'Vídeo', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: deleteVideo,
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Vídeo', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: ({ id, status }: { id: string; status: EntityStatus }) => toggleVideoStatus(id, status),
      onSuccess: invalidate,
    }),
  }
}

// Livros

export function useLivros() {
  return useEntityQuery(livroKeys.all, fetchLivros)
}

export function useLivro(id?: string) {
  return useEntityDetail(livroKeys.detail(id ?? ''), () => fetchLivroById(id!), id)
}

export function useLivroMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: livroKeys.all })
    invalidatePublic(queryClient, ['livros'])
  }

  return {
    create: useMutation({
      mutationFn: createLivro,
      onSuccess: (data, values) => {
        invalidate()
        log('Criou', 'Livro', values.title, data.id)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, values }: { id: string; values: LivroFormValues }) => updateLivro(id, values),
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: livroKeys.detail(v.id) })
        log('Atualizou', 'Livro', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: deleteLivro,
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Livro', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: ({ id, status }: { id: string; status: EntityStatus }) => toggleLivroStatus(id, status),
      onSuccess: invalidate,
    }),
  }
}

// Galerias

export function useGalerias() {
  return useEntityQuery(galeriaKeys.all, fetchGalerias)
}

export function useGaleria(id?: string) {
  return useEntityDetail(galeriaKeys.detail(id ?? ''), () => fetchGaleriaById(id!), id)
}

export function useGaleriaMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: galeriaKeys.all })
    invalidatePublic(queryClient, ['galerias'])
  }

  return {
    create: useMutation({
      mutationFn: createGaleria,
      onSuccess: (data, values) => {
        invalidate()
        log('Criou', 'Galeria', values.title, data.id)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, values }: { id: string; values: GaleriaFormValues }) => updateGaleria(id, values),
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: galeriaKeys.detail(v.id) })
        log('Atualizou', 'Galeria', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: deleteGaleria,
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Galeria', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: ({ id, status }: { id: string; status: EntityStatus }) => toggleGaleriaStatus(id, status),
      onSuccess: invalidate,
    }),
  }
}

// Podcast

export function usePodcastEpisodios() {
  return useEntityQuery(podcastKeys.all, fetchPodcastEpisodios)
}

export function usePodcastEpisodio(id?: string) {
  return useEntityDetail(podcastKeys.detail(id ?? ''), () => fetchPodcastEpisodioById(id!), id)
}

export function usePodcastMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: podcastKeys.all })
    invalidatePublic(queryClient, ['podcast'])
  }

  return {
    create: useMutation({
      mutationFn: createPodcastEpisodio,
      onSuccess: (data, values) => {
        invalidate()
        log('Criou', 'Podcast', values.title, data.id)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, values }: { id: string; values: PodcastEpisodioFormValues }) =>
        updatePodcastEpisodio(id, values),
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: podcastKeys.detail(v.id) })
        log('Atualizou', 'Podcast', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: deletePodcastEpisodio,
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Podcast', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: ({ id, status }: { id: string; status: EntityStatus }) => togglePodcastStatus(id, status),
      onSuccess: invalidate,
    }),
  }
}

// Parceiros

export function useParceiroGrupos() {
  return useEntityQuery(parceiroKeys.grupos, fetchParceiroGrupos)
}

export function useParceiroGrupo(id?: string) {
  return useEntityDetail(parceiroKeys.grupo(id ?? ''), () => fetchParceiroGrupoById(id!), id)
}

export function useParceiroGrupoMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: parceiroKeys.grupos })
    invalidatePublic(queryClient, ['parceiros'])
  }

  return {
    create: useMutation({
      mutationFn: createParceiroGrupo,
      onSuccess: (data, values) => {
        invalidate()
        if (data) log('Criou', 'Parceiro', values.title, data.id)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, values }: { id: string; values: ParceiroGrupoFormValues }) =>
        updateParceiroGrupo(id, values),
      onSuccess: (data, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: parceiroKeys.grupo(v.id) })
        if (data) log('Atualizou', 'Parceiro', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: deleteParceiroGrupo,
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Parceiro', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: ({ id, status }: { id: string; status: EntityStatus }) =>
        toggleParceiroGrupoStatus(id, status),
      onSuccess: invalidate,
    }),
  }
}

export function useLinksParceiros() {
  return useEntityQuery(parceiroKeys.links, fetchLinksParceiros)
}

export function useLinkParceiro(id?: string) {
  return useEntityDetail(parceiroKeys.link(id ?? ''), () => fetchLinkParceiroById(id!), id)
}

export function useLinkParceiroMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: parceiroKeys.links })
    invalidatePublic(queryClient, ['links-parceiros'])
  }

  return {
    create: useMutation({
      mutationFn: createLinkParceiro,
      onSuccess: (data, values) => {
        invalidate()
        log('Criou', 'Link parceiro', values.title, data.id)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, values }: { id: string; values: LinkParceiroFormValues }) =>
        updateLinkParceiro(id, values),
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: parceiroKeys.link(v.id) })
        log('Atualizou', 'Link parceiro', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: deleteLinkParceiro,
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Link parceiro', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: ({ id, status }: { id: string; status: EntityStatus }) =>
        toggleLinkParceiroStatus(id, status),
      onSuccess: invalidate,
    }),
  }
}

// Páginas

export function usePaginas() {
  return useEntityQuery(paginaKeys.all, fetchPaginas)
}

export function usePagina(id?: string) {
  return useEntityDetail(paginaKeys.detail(id ?? ''), () => fetchPaginaById(id!), id)
}

export function usePaginaMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: paginaKeys.all })
    queryClient.invalidateQueries({ queryKey: ['public', 'pagina'] })
  }

  return {
    create: useMutation({
      mutationFn: createPagina,
      onSuccess: (data, values) => {
        invalidate()
        log('Criou', 'Página', values.title, data.id)
      },
    }),
    update: useMutation({
      mutationFn: ({ id, values }: { id: string; values: PaginaFormValues }) => updatePagina(id, values),
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: paginaKeys.detail(v.id) })
        queryClient.invalidateQueries({ queryKey: ['public', 'pagina', v.values.slug] })
        log('Atualizou', 'Página', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: deletePagina,
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Página', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: ({ id, status }: { id: string; status: EntityStatus }) => togglePaginaStatus(id, status),
      onSuccess: invalidate,
    }),
  }
}
