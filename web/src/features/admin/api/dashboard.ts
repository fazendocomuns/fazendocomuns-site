import { useQuery } from '@tanstack/react-query'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import {
  fetchDashboardCounts,
  fetchRecentContent,
} from '@/integrations/supabase/repositories/contentRepository'
import { fetchRecentActivities } from '@/integrations/supabase/repositories/atividadesRepository'
import { useAdminStore } from '@/features/admin/store/adminStore'

export const dashboardKeys = {
  counts: ['admin', 'dashboard', 'counts'] as const,
  recent: ['admin', 'dashboard', 'recent'] as const,
  activities: ['admin', 'dashboard', 'activities'] as const,
}

export function useDashboardCounts() {
  const store = useAdminStore()
  const enabled = isSupabaseConfigured()
  const query = useQuery({
    queryKey: dashboardKeys.counts,
    queryFn: fetchDashboardCounts,
    enabled,
    staleTime: 30_000,
  })

  if (!enabled) {
    return {
      counts: {
        pesquisadores: store.pesquisadores.length,
        assistentes: store.assistentes.length,
        consultores: store.consultores.length,
        colaboradores: store.colaboradores.length,
        noticias: store.noticias.length,
        editoriais: store.editoriais.length,
        eventos: store.eventos.length,
      },
      isLoading: false,
    }
  }

  return { counts: query.data, isLoading: query.isLoading }
}

export function useRecentContent() {
  const store = useAdminStore()
  const enabled = isSupabaseConfigured()
  const query = useQuery({
    queryKey: dashboardKeys.recent,
    queryFn: fetchRecentContent,
    enabled,
    staleTime: 30_000,
  })

  if (!enabled) {
    const items = [
      ...store.noticias.map((n) => ({
        id: n.id,
        title: n.title,
        type: 'Notícia' as const,
        date: n.updatedAt,
        href: `/admin/noticias/${n.id}/editar`,
      })),
      ...store.editoriais.map((e) => ({
        id: e.id,
        title: e.title,
        type: 'Editorial' as const,
        date: e.updatedAt,
        href: `/admin/editoriais/${e.id}/editar`,
      })),
      ...store.eventos.map((e) => ({
        id: e.id,
        title: e.name,
        type: 'Evento' as const,
        date: e.updatedAt,
        href: `/admin/eventos/${e.id}/editar`,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return { items, isLoading: false }
  }

  return { items: query.data ?? [], isLoading: query.isLoading }
}

export function useDashboardActivities() {
  const store = useAdminStore()
  const enabled = isSupabaseConfigured()
  const query = useQuery({
    queryKey: dashboardKeys.activities,
    queryFn: () => fetchRecentActivities(20),
    enabled,
    staleTime: 30_000,
  })

  if (!enabled) {
    return { activities: store.activities, isLoading: false }
  }

  return { activities: query.data ?? [], isLoading: query.isLoading }
}
