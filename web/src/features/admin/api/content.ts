import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import {
  createEditorial,
  createEvento,
  createNoticia,
  deleteEditorial,
  deleteEvento,
  deleteNoticia,
  fetchEditorialById,
  fetchEditoriais,
  fetchEventoById,
  fetchEventos,
  fetchNewsCategories,
  fetchNoticiaById,
  fetchNoticias,
  toggleEditorialStatus,
  toggleEventoStatus,
  toggleNoticiaStatus,
  updateEditorial,
  updateEvento,
  updateNoticia,
} from '@/integrations/supabase/repositories/contentRepository'
import type {
  EditorialFormValues,
  EventoFormValues,
  NoticiaFormValues,
} from '@/features/admin/schemas'
import type { Editorial, EntityStatus, Noticia } from '@/features/admin/types'
import { newsCategories } from '@/features/admin/data/mockSeed'
import { dashboardKeys } from '@/features/admin/api/dashboard'
import { useAdminActivityLogger } from '@/features/admin/api/activityLogger'
import { useAdminStore } from '@/features/admin/store/adminStore'
import {
  parseReferencesText,
  parseSignaturesText,
} from '@/features/admin/lib/editorialFields'

export const contentKeys = {
  noticias: ['admin', 'noticias'] as const,
  noticia: (id: string) => ['admin', 'noticias', id] as const,
  editoriais: ['admin', 'editoriais'] as const,
  editorial: (id: string) => ['admin', 'editoriais', id] as const,
  eventos: ['admin', 'eventos'] as const,
  evento: (id: string) => ['admin', 'eventos', id] as const,
  categories: ['admin', 'noticias', 'categories'] as const,
}

function mockList<T>(items: T[]) {
  return { data: items, isLoading: false, isError: false, error: null, refetch: async () => ({}) }
}

function noticiaFormToMock(values: NoticiaFormValues): Omit<Noticia, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    title: values.title,
    summary: values.summary,
    content: values.content,
    coverImage: values.coverImage,
    author: values.author,
    date: values.date,
    category: values.category,
    tags: values.tags,
    featured: values.featured,
    heroImage: values.heroImage,
    heroImageAlt: values.heroImageAlt,
    audioUrl: values.audioUrl,
    audioDuration: values.audioDuration,
    audioLabel: values.audioLabel,
    relatedLinkHref: values.relatedLinkHref,
    relatedLinkLabel: values.relatedLinkLabel,
    displayOrder: values.displayOrder,
    status: values.status,
  }
}

function editorialFormToMock(
  values: EditorialFormValues,
): Omit<Editorial, 'id' | 'createdAt' | 'updatedAt'> {
  const signatures = parseSignaturesText(values.signaturesText)
  return {
    title: values.title,
    subtitle: values.subtitle,
    summary: values.summary,
    content: values.content,
    image: values.image,
    author: values.author,
    date: values.date,
    tags: values.tags,
    closingText: values.closingText,
    signatures: signatures.length
      ? signatures
      : values.author.trim()
        ? [{ name: values.author.trim(), lines: [] }]
        : [],
    references: parseReferencesText(values.referencesText),
    referencesTitle: values.referencesTitle,
    displayOrder: values.displayOrder,
    status: values.status,
  }
}

export function useNewsCategories() {
  const query = useQuery({
    queryKey: contentKeys.categories,
    queryFn: fetchNewsCategories,
    enabled: isSupabaseConfigured(),
    staleTime: 300_000,
  })

  if (!isSupabaseConfigured()) return newsCategories
  return query.data?.length ? query.data : newsCategories
}

export function useNoticias() {
  const mock = useAdminStore((s) => s.noticias)
  const enabled = isSupabaseConfigured()
  const query = useQuery({ queryKey: contentKeys.noticias, queryFn: fetchNoticias, enabled })
  if (!enabled) return mockList(mock)
  return query
}

export function useNoticia(id: string | undefined) {
  const mock = useAdminStore((s) => s.noticias)
  const enabled = isSupabaseConfigured() && Boolean(id)
  const query = useQuery({
    queryKey: contentKeys.noticia(id ?? ''),
    queryFn: () => fetchNoticiaById(id!),
    enabled,
  })
  if (!isSupabaseConfigured()) {
    return { data: mock.find((item) => item.id === id), isLoading: false, isError: false }
  }
  return query
}

export function useNoticiaMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: contentKeys.noticias })
    queryClient.invalidateQueries({ queryKey: ['public', 'noticias'] })
    queryClient.invalidateQueries({ queryKey: dashboardKeys.counts })
    queryClient.invalidateQueries({ queryKey: dashboardKeys.recent })
  }

  return {
    create: useMutation({
      mutationFn: async (values: NoticiaFormValues) => {
        if (isSupabaseConfigured()) return createNoticia(values)
        useAdminStore.getState().createNoticia(noticiaFormToMock(values))
      },
      onSuccess: (_data, values) => {
        invalidate()
        log('Criou', 'Notícia', values.title, _data?.id)
      },
    }),
    update: useMutation({
      mutationFn: async ({ id, values }: { id: string; values: NoticiaFormValues }) => {
        if (isSupabaseConfigured()) return updateNoticia(id, values)
        useAdminStore.getState().updateNoticia(id, noticiaFormToMock(values))
      },
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: contentKeys.noticia(v.id) })
        log('Atualizou', 'Notícia', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: async (id: string) => {
        if (isSupabaseConfigured()) return deleteNoticia(id)
        useAdminStore.getState().deleteNoticia(id)
      },
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Notícia', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: async ({ id, status }: { id: string; status: EntityStatus }) => {
        if (isSupabaseConfigured()) return toggleNoticiaStatus(id, status)
        useAdminStore.getState().toggleNoticiaStatus(id)
      },
      onSuccess: invalidate,
    }),
  }
}

export function useEditoriais() {
  const mock = useAdminStore((s) => s.editoriais)
  const enabled = isSupabaseConfigured()
  const query = useQuery({ queryKey: contentKeys.editoriais, queryFn: fetchEditoriais, enabled })
  if (!enabled) return mockList(mock)
  return query
}

export function useEditorial(id: string | undefined) {
  const mock = useAdminStore((s) => s.editoriais)
  const enabled = isSupabaseConfigured() && Boolean(id)
  const query = useQuery({
    queryKey: contentKeys.editorial(id ?? ''),
    queryFn: () => fetchEditorialById(id!),
    enabled,
  })
  if (!isSupabaseConfigured()) {
    return { data: mock.find((item) => item.id === id), isLoading: false, isError: false }
  }
  return query
}

export function useEditorialMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: contentKeys.editoriais })
    queryClient.invalidateQueries({ queryKey: ['public', 'editoriais'] })
    queryClient.invalidateQueries({ queryKey: dashboardKeys.counts })
    queryClient.invalidateQueries({ queryKey: dashboardKeys.recent })
  }

  return {
    create: useMutation({
      mutationFn: async (values: EditorialFormValues) => {
        if (isSupabaseConfigured()) return createEditorial(values)
        useAdminStore.getState().createEditorial(editorialFormToMock(values))
      },
      onSuccess: (_data, values) => {
        invalidate()
        log('Criou', 'Editorial', values.title, _data?.id)
      },
    }),
    update: useMutation({
      mutationFn: async ({ id, values }: { id: string; values: EditorialFormValues }) => {
        if (isSupabaseConfigured()) return updateEditorial(id, values)
        useAdminStore.getState().updateEditorial(id, editorialFormToMock(values))
      },
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: contentKeys.editorial(v.id) })
        log('Atualizou', 'Editorial', v.values.title, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: async (id: string) => {
        if (isSupabaseConfigured()) return deleteEditorial(id)
        useAdminStore.getState().deleteEditorial(id)
      },
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Editorial', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: async ({ id, status }: { id: string; status: EntityStatus }) => {
        if (isSupabaseConfigured()) return toggleEditorialStatus(id, status)
        useAdminStore.getState().toggleEditorialStatus(id)
      },
      onSuccess: invalidate,
    }),
  }
}

export function useEventos() {
  const mock = useAdminStore((s) => s.eventos)
  const enabled = isSupabaseConfigured()
  const query = useQuery({ queryKey: contentKeys.eventos, queryFn: fetchEventos, enabled })
  if (!enabled) return mockList(mock)
  return query
}

export function useEvento(id: string | undefined) {
  const mock = useAdminStore((s) => s.eventos)
  const enabled = isSupabaseConfigured() && Boolean(id)
  const query = useQuery({
    queryKey: contentKeys.evento(id ?? ''),
    queryFn: () => fetchEventoById(id!),
    enabled,
  })
  if (!isSupabaseConfigured()) {
    return { data: mock.find((item) => item.id === id), isLoading: false, isError: false }
  }
  return query
}

export function useEventoMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: contentKeys.eventos })
    queryClient.invalidateQueries({ queryKey: ['public', 'eventos'] })
    queryClient.invalidateQueries({ queryKey: dashboardKeys.counts })
    queryClient.invalidateQueries({ queryKey: dashboardKeys.recent })
  }

  return {
    create: useMutation({
      mutationFn: async (values: EventoFormValues) => {
        if (isSupabaseConfigured()) return createEvento(values)
        useAdminStore.getState().createEvento(values)
      },
      onSuccess: (_data, values) => {
        invalidate()
        log('Criou', 'Evento', values.name, _data?.id)
      },
    }),
    update: useMutation({
      mutationFn: async ({ id, values }: { id: string; values: EventoFormValues }) => {
        if (isSupabaseConfigured()) return updateEvento(id, values)
        useAdminStore.getState().updateEvento(id, values)
      },
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: contentKeys.evento(v.id) })
        log('Atualizou', 'Evento', v.values.name, v.id)
      },
    }),
    remove: useMutation({
      mutationFn: async (id: string) => {
        if (isSupabaseConfigured()) return deleteEvento(id)
        useAdminStore.getState().deleteEvento(id)
      },
      onSuccess: (_d, id) => {
        invalidate()
        log('Removeu', 'Evento', id, id)
      },
    }),
    toggleStatus: useMutation({
      mutationFn: async ({ id, status }: { id: string; status: EntityStatus }) => {
        if (isSupabaseConfigured()) return toggleEventoStatus(id, status)
        useAdminStore.getState().toggleEventoStatus(id)
      },
      onSuccess: invalidate,
    }),
  }
}
