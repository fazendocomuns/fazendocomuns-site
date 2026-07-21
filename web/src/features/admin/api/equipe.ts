import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import {
  createAssistente,
  createColaborador,
  createConsultor,
  createPesquisador,
  deleteAssistente,
  deleteColaborador,
  deleteConsultor,
  deletePesquisador,
  fetchAssistenteById,
  fetchAssistentes,
  fetchColaboradorById,
  fetchColaboradores,
  fetchConsultorById,
  fetchConsultores,
  fetchPesquisadorById,
  fetchPesquisadores,
  reorderAssistentes,
  reorderColaboradores,
  reorderConsultores,
  reorderPesquisadores,
  toggleAssistenteStatus,
  toggleColaboradorStatus,
  toggleConsultorStatus,
  togglePesquisadorStatus,
  updateAssistente,
  updateColaborador,
  updateConsultor,
  updatePesquisador,
} from '@/integrations/supabase/repositories/equipeRepository'
import type {
  AssistenteFormValues,
  ColaboradorFormValues,
  ConsultorFormValues,
  PesquisadorFormValues,
} from '@/features/admin/schemas'
import type { EntityStatus } from '@/features/admin/types'
import { useAdminActivityLogger } from '@/features/admin/api/activityLogger'
import { dashboardKeys } from '@/features/admin/api/dashboard'
import { useAdminStore } from '@/features/admin/store/adminStore'

export const equipeKeys = {
  pesquisadores: ['admin', 'pesquisadores'] as const,
  pesquisador: (id: string) => ['admin', 'pesquisadores', id] as const,
  assistentes: ['admin', 'assistentes'] as const,
  assistente: (id: string) => ['admin', 'assistentes', id] as const,
  consultores: ['admin', 'consultores'] as const,
  consultor: (id: string) => ['admin', 'consultores', id] as const,
  colaboradores: ['admin', 'colaboradores'] as const,
  colaborador: (id: string) => ['admin', 'colaboradores', id] as const,
}

function useMockFallback<T>(mockItems: T[], enabled: boolean) {
  return {
    data: mockItems,
    isLoading: false,
    isError: false,
    error: null,
    enabled,
  }
}

// Pesquisadores

export function usePesquisadores() {
  const mock = useAdminStore((s) => s.pesquisadores)
  const enabled = isSupabaseConfigured()
  const query = useQuery({
    queryKey: equipeKeys.pesquisadores,
    queryFn: fetchPesquisadores,
    enabled,
  })

  if (!enabled) {
    return { ...useMockFallback(mock, false), refetch: async () => ({}) }
  }

  return query
}

export function usePesquisador(id: string | undefined) {
  const mock = useAdminStore((s) => s.pesquisadores)
  const enabled = isSupabaseConfigured() && Boolean(id)
  const query = useQuery({
    queryKey: equipeKeys.pesquisador(id ?? ''),
    queryFn: () => fetchPesquisadorById(id!),
    enabled,
  })

  if (!isSupabaseConfigured()) {
    return {
      data: mock.find((item) => item.id === id),
      isLoading: false,
      isError: false,
    }
  }

  return query
}

export function usePesquisadorMutations() {
  const queryClient = useQueryClient()
  const { log } = useAdminActivityLogger()

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: equipeKeys.pesquisadores })
    queryClient.invalidateQueries({ queryKey: ['public', 'equipe'] })
    queryClient.invalidateQueries({ queryKey: dashboardKeys.counts })
  }

  const create = useMutation({
    mutationFn: async (values: PesquisadorFormValues) => {
      if (isSupabaseConfigured()) {
        return createPesquisador(values)
      }
      useAdminStore.getState().createPesquisador(values)
    },
    onSuccess: (data, values) => {
      invalidate()
      log('Criou', 'Pesquisador', values.name, data?.id)
    },
  })

  const update = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: PesquisadorFormValues }) => {
      if (isSupabaseConfigured()) {
        return updatePesquisador(id, values)
      }
      useAdminStore.getState().updatePesquisador(id, values)
    },
    onSuccess: (_data, variables) => {
      invalidate()
      queryClient.invalidateQueries({ queryKey: equipeKeys.pesquisador(variables.id) })
      log('Atualizou', 'Pesquisador', variables.values.name, variables.id)
    },
  })

  const remove = useMutation({
    mutationFn: async (id: string) => {
      if (isSupabaseConfigured()) {
        return deletePesquisador(id)
      }
      useAdminStore.getState().deletePesquisador(id)
    },
    onSuccess: invalidate,
  })

  const reorder = useMutation({
    mutationFn: async (ids: string[]) => {
      if (isSupabaseConfigured()) {
        return reorderPesquisadores(ids)
      }
      useAdminStore.getState().reorderPesquisadores(ids)
    },
    onSuccess: invalidate,
  })

  const toggleStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: EntityStatus }) => {
      if (isSupabaseConfigured()) {
        return togglePesquisadorStatus(id, status)
      }
      useAdminStore.getState().togglePesquisadorStatus(id)
    },
    onSuccess: invalidate,
  })

  return { create, update, remove, reorder, toggleStatus }
}

// Assistentes

export function useAssistentes() {
  const mock = useAdminStore((s) => s.assistentes)
  const enabled = isSupabaseConfigured()
  const query = useQuery({
    queryKey: equipeKeys.assistentes,
    queryFn: fetchAssistentes,
    enabled,
  })

  if (!enabled) return { ...useMockFallback(mock, false), refetch: async () => ({}) }
  return query
}

export function useAssistente(id: string | undefined) {
  const mock = useAdminStore((s) => s.assistentes)
  const enabled = isSupabaseConfigured() && Boolean(id)
  const query = useQuery({
    queryKey: equipeKeys.assistente(id ?? ''),
    queryFn: () => fetchAssistenteById(id!),
    enabled,
  })

  if (!isSupabaseConfigured()) {
    return { data: mock.find((item) => item.id === id), isLoading: false, isError: false }
  }

  return query
}

export function useAssistenteMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: equipeKeys.assistentes })
    queryClient.invalidateQueries({ queryKey: ['public', 'equipe'] })
  }

  return {
    create: useMutation({
      mutationFn: async (values: AssistenteFormValues) => {
        if (isSupabaseConfigured()) return createAssistente(values)
        useAdminStore.getState().createAssistente(values)
      },
      onSuccess: invalidate,
    }),
    update: useMutation({
      mutationFn: async ({ id, values }: { id: string; values: AssistenteFormValues }) => {
        if (isSupabaseConfigured()) return updateAssistente(id, values)
        useAdminStore.getState().updateAssistente(id, values)
      },
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: equipeKeys.assistente(v.id) })
      },
    }),
    remove: useMutation({
      mutationFn: async (id: string) => {
        if (isSupabaseConfigured()) return deleteAssistente(id)
        useAdminStore.getState().deleteAssistente(id)
      },
      onSuccess: invalidate,
    }),
    reorder: useMutation({
      mutationFn: async (ids: string[]) => {
        if (isSupabaseConfigured()) return reorderAssistentes(ids)
        useAdminStore.getState().reorderAssistentes(ids)
      },
      onSuccess: invalidate,
    }),
    toggleStatus: useMutation({
      mutationFn: async ({ id, status }: { id: string; status: EntityStatus }) => {
        if (isSupabaseConfigured()) return toggleAssistenteStatus(id, status)
        useAdminStore.getState().toggleAssistenteStatus(id)
      },
      onSuccess: invalidate,
    }),
  }
}

// Consultores

export function useConsultores() {
  const mock = useAdminStore((s) => s.consultores)
  const enabled = isSupabaseConfigured()
  const query = useQuery({
    queryKey: equipeKeys.consultores,
    queryFn: fetchConsultores,
    enabled,
  })

  if (!enabled) return { ...useMockFallback(mock, false), refetch: async () => ({}) }
  return query
}

export function useConsultor(id: string | undefined) {
  const mock = useAdminStore((s) => s.consultores)
  const enabled = isSupabaseConfigured() && Boolean(id)
  const query = useQuery({
    queryKey: equipeKeys.consultor(id ?? ''),
    queryFn: () => fetchConsultorById(id!),
    enabled,
  })

  if (!isSupabaseConfigured()) {
    return { data: mock.find((item) => item.id === id), isLoading: false, isError: false }
  }

  return query
}

export function useConsultorMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: equipeKeys.consultores })
    queryClient.invalidateQueries({ queryKey: ['public', 'consultores'] })
  }

  return {
    create: useMutation({
      mutationFn: async (values: ConsultorFormValues) => {
        if (isSupabaseConfigured()) return createConsultor(values)
        useAdminStore.getState().createConsultor(values)
      },
      onSuccess: invalidate,
    }),
    update: useMutation({
      mutationFn: async ({ id, values }: { id: string; values: ConsultorFormValues }) => {
        if (isSupabaseConfigured()) return updateConsultor(id, values)
        useAdminStore.getState().updateConsultor(id, values)
      },
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: equipeKeys.consultor(v.id) })
      },
    }),
    remove: useMutation({
      mutationFn: async (id: string) => {
        if (isSupabaseConfigured()) return deleteConsultor(id)
        useAdminStore.getState().deleteConsultor(id)
      },
      onSuccess: invalidate,
    }),
    reorder: useMutation({
      mutationFn: async (ids: string[]) => {
        if (isSupabaseConfigured()) return reorderConsultores(ids)
        useAdminStore.getState().reorderConsultores(ids)
      },
      onSuccess: invalidate,
    }),
    toggleStatus: useMutation({
      mutationFn: async ({ id, status }: { id: string; status: EntityStatus }) => {
        if (isSupabaseConfigured()) return toggleConsultorStatus(id, status)
        useAdminStore.getState().toggleConsultorStatus(id)
      },
      onSuccess: invalidate,
    }),
  }
}

// Colaboradores

export function useColaboradores() {
  const mock = useAdminStore((s) => s.colaboradores)
  const enabled = isSupabaseConfigured()
  const query = useQuery({
    queryKey: equipeKeys.colaboradores,
    queryFn: fetchColaboradores,
    enabled,
  })

  if (!enabled) return { ...useMockFallback(mock, false), refetch: async () => ({}) }
  return query
}

export function useColaborador(id: string | undefined) {
  const mock = useAdminStore((s) => s.colaboradores)
  const enabled = isSupabaseConfigured() && Boolean(id)
  const query = useQuery({
    queryKey: equipeKeys.colaborador(id ?? ''),
    queryFn: () => fetchColaboradorById(id!),
    enabled,
  })

  if (!isSupabaseConfigured()) {
    return { data: mock.find((item) => item.id === id), isLoading: false, isError: false }
  }

  return query
}

export function useColaboradorMutations() {
  const queryClient = useQueryClient()
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: equipeKeys.colaboradores })
    queryClient.invalidateQueries({ queryKey: ['public', 'colaboradores'] })
  }

  return {
    create: useMutation({
      mutationFn: async (values: ColaboradorFormValues) => {
        if (isSupabaseConfigured()) return createColaborador(values)
        useAdminStore.getState().createColaborador(values)
      },
      onSuccess: invalidate,
    }),
    update: useMutation({
      mutationFn: async ({ id, values }: { id: string; values: ColaboradorFormValues }) => {
        if (isSupabaseConfigured()) return updateColaborador(id, values)
        useAdminStore.getState().updateColaborador(id, values)
      },
      onSuccess: (_d, v) => {
        invalidate()
        queryClient.invalidateQueries({ queryKey: equipeKeys.colaborador(v.id) })
      },
    }),
    remove: useMutation({
      mutationFn: async (id: string) => {
        if (isSupabaseConfigured()) return deleteColaborador(id)
        useAdminStore.getState().deleteColaborador(id)
      },
      onSuccess: invalidate,
    }),
    reorder: useMutation({
      mutationFn: async (ids: string[]) => {
        if (isSupabaseConfigured()) return reorderColaboradores(ids)
        useAdminStore.getState().reorderColaboradores(ids)
      },
      onSuccess: invalidate,
    }),
    toggleStatus: useMutation({
      mutationFn: async ({ id, status }: { id: string; status: EntityStatus }) => {
        if (isSupabaseConfigured()) return toggleColaboradorStatus(id, status)
        useAdminStore.getState().toggleColaboradorStatus(id)
      },
      onSuccess: invalidate,
    }),
  }
}
