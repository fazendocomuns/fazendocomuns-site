import { create } from 'zustand'
import {
  mockActivities,
  mockAssistentes,
  mockColaboradores,
  mockConsultores,
  mockEditoriais,
  mockEventos,
  mockMediaLibrary,
  mockNoticias,
  mockPesquisadores,
} from '@/features/admin/data/mockSeed'
import type {
  ActivityItem,
  Assistente,
  Colaborador,
  Consultor,
  Editorial,
  EntityStatus,
  Evento,
  MediaItem,
  Noticia,
  Pesquisador,
} from '@/features/admin/types'

interface AdminStore {
  pesquisadores: Pesquisador[]
  assistentes: Assistente[]
  consultores: Consultor[]
  colaboradores: Colaborador[]
  noticias: Noticia[]
  editoriais: Editorial[]
  eventos: Evento[]
  mediaLibrary: MediaItem[]
  activities: ActivityItem[]

  addActivity: (activity: Omit<ActivityItem, 'id' | 'timestamp'>) => void

  createPesquisador: (data: Omit<Pesquisador, 'id' | 'createdAt' | 'updatedAt'>) => void
  updatePesquisador: (id: string, data: Partial<Pesquisador>) => void
  deletePesquisador: (id: string) => void
  reorderPesquisadores: (ids: string[]) => void
  togglePesquisadorStatus: (id: string) => void

  createAssistente: (data: Omit<Assistente, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateAssistente: (id: string, data: Partial<Assistente>) => void
  deleteAssistente: (id: string) => void
  reorderAssistentes: (ids: string[]) => void
  toggleAssistenteStatus: (id: string) => void

  createConsultor: (data: Omit<Consultor, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateConsultor: (id: string, data: Partial<Consultor>) => void
  deleteConsultor: (id: string) => void
  reorderConsultores: (ids: string[]) => void
  toggleConsultorStatus: (id: string) => void

  createColaborador: (data: Omit<Colaborador, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateColaborador: (id: string, data: Partial<Colaborador>) => void
  deleteColaborador: (id: string) => void
  reorderColaboradores: (ids: string[]) => void
  toggleColaboradorStatus: (id: string) => void

  createNoticia: (data: Omit<Noticia, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNoticia: (id: string, data: Partial<Noticia>) => void
  deleteNoticia: (id: string) => void
  toggleNoticiaStatus: (id: string) => void

  createEditorial: (data: Omit<Editorial, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateEditorial: (id: string, data: Partial<Editorial>) => void
  deleteEditorial: (id: string) => void
  toggleEditorialStatus: (id: string) => void

  createEvento: (data: Omit<Evento, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateEvento: (id: string, data: Partial<Evento>) => void
  deleteEvento: (id: string) => void
  toggleEventoStatus: (id: string) => void
}

function generateId(prefix: string) {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`
}

function toggleStatus(status: EntityStatus): EntityStatus {
  return status === 'active' ? 'inactive' : 'active'
}

function reorderByIds<T extends { id: string; displayOrder: number }>(
  items: T[],
  ids: string[],
): T[] {
  const map = new Map(items.map((item) => [item.id, item]))
  return ids
    .map((id, index) => {
      const item = map.get(id)
      if (!item) return null
      return { ...item, displayOrder: index + 1, updatedAt: new Date().toISOString() }
    })
    .filter(Boolean) as T[]
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  pesquisadores: mockPesquisadores,
  assistentes: mockAssistentes,
  consultores: mockConsultores,
  colaboradores: mockColaboradores,
  noticias: mockNoticias,
  editoriais: mockEditoriais,
  eventos: mockEventos,
  mediaLibrary: mockMediaLibrary,
  activities: mockActivities,

  addActivity: (activity) =>
    set((s) => ({
      activities: [
        {
          ...activity,
          id: generateId('act'),
          timestamp: new Date().toISOString(),
        },
        ...s.activities.slice(0, 19),
      ],
    })),

  createPesquisador: (data) => {
    const item: Pesquisador = {
      ...data,
      id: generateId('pes'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ pesquisadores: [...s.pesquisadores, item] }))
    get().addActivity({ action: 'Criou', entity: 'Pesquisador(a)', entityName: data.name })
  },

  updatePesquisador: (id, data) => {
    set((s) => ({
      pesquisadores: s.pesquisadores.map((p) =>
        p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p,
      ),
    }))
    get().addActivity({ action: 'Editou', entity: 'Pesquisador(a)', entityName: data.name ?? id })
  },

  deletePesquisador: (id) => {
    const item = get().pesquisadores.find((p) => p.id === id)
    set((s) => ({ pesquisadores: s.pesquisadores.filter((p) => p.id !== id) }))
    if (item) {
      get().addActivity({ action: 'Excluiu', entity: 'Pesquisador(a)', entityName: item.name })
    }
  },

  reorderPesquisadores: (ids) =>
    set((s) => ({ pesquisadores: reorderByIds(s.pesquisadores, ids) })),

  togglePesquisadorStatus: (id) => {
    const item = get().pesquisadores.find((p) => p.id === id)
    if (!item) return
    set((s) => ({
      pesquisadores: s.pesquisadores.map((p) =>
        p.id === id
          ? { ...p, status: toggleStatus(p.status), updatedAt: new Date().toISOString() }
          : p,
      ),
    }))
    get().addActivity({
      action: item.status === 'active' ? 'Desativou' : 'Ativou',
      entity: 'Pesquisador(a)',
      entityName: item.name,
    })
  },

  createAssistente: (data) => {
    const item: Assistente = {
      ...data,
      id: generateId('ass'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ assistentes: [...s.assistentes, item] }))
    get().addActivity({ action: 'Criou', entity: 'Assistente', entityName: data.name })
  },

  updateAssistente: (id, data) => {
    set((s) => ({
      assistentes: s.assistentes.map((a) =>
        a.id === id ? { ...a, ...data, updatedAt: new Date().toISOString() } : a,
      ),
    }))
    get().addActivity({ action: 'Editou', entity: 'Assistente', entityName: data.name ?? id })
  },

  deleteAssistente: (id) => {
    const item = get().assistentes.find((a) => a.id === id)
    set((s) => ({ assistentes: s.assistentes.filter((a) => a.id !== id) }))
    if (item) {
      get().addActivity({ action: 'Excluiu', entity: 'Assistente', entityName: item.name })
    }
  },

  reorderAssistentes: (ids) =>
    set((s) => ({ assistentes: reorderByIds(s.assistentes, ids) })),

  toggleAssistenteStatus: (id) => {
    const item = get().assistentes.find((a) => a.id === id)
    if (!item) return
    set((s) => ({
      assistentes: s.assistentes.map((a) =>
        a.id === id
          ? { ...a, status: toggleStatus(a.status), updatedAt: new Date().toISOString() }
          : a,
      ),
    }))
    get().addActivity({
      action: item.status === 'active' ? 'Desativou' : 'Ativou',
      entity: 'Assistente',
      entityName: item.name,
    })
  },

  createConsultor: (data) => {
    const item: Consultor = {
      ...data,
      id: generateId('con'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ consultores: [...s.consultores, item] }))
    get().addActivity({ action: 'Criou', entity: 'Consultor', entityName: data.name })
  },

  updateConsultor: (id, data) => {
    set((s) => ({
      consultores: s.consultores.map((c) =>
        c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c,
      ),
    }))
    get().addActivity({ action: 'Editou', entity: 'Consultor', entityName: data.name ?? id })
  },

  deleteConsultor: (id) => {
    const item = get().consultores.find((c) => c.id === id)
    set((s) => ({ consultores: s.consultores.filter((c) => c.id !== id) }))
    if (item) {
      get().addActivity({ action: 'Excluiu', entity: 'Consultor', entityName: item.name })
    }
  },

  reorderConsultores: (ids) =>
    set((s) => ({ consultores: reorderByIds(s.consultores, ids) })),

  toggleConsultorStatus: (id) => {
    const item = get().consultores.find((c) => c.id === id)
    if (!item) return
    set((s) => ({
      consultores: s.consultores.map((c) =>
        c.id === id
          ? { ...c, status: toggleStatus(c.status), updatedAt: new Date().toISOString() }
          : c,
      ),
    }))
    get().addActivity({
      action: item.status === 'active' ? 'Desativou' : 'Ativou',
      entity: 'Consultor',
      entityName: item.name,
    })
  },

  createColaborador: (data) => {
    const item: Colaborador = {
      ...data,
      id: generateId('col'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ colaboradores: [...s.colaboradores, item] }))
    get().addActivity({ action: 'Criou', entity: 'Colaborador', entityName: data.name })
  },

  updateColaborador: (id, data) => {
    set((s) => ({
      colaboradores: s.colaboradores.map((c) =>
        c.id === id ? { ...c, ...data, updatedAt: new Date().toISOString() } : c,
      ),
    }))
    get().addActivity({ action: 'Editou', entity: 'Colaborador', entityName: data.name ?? id })
  },

  deleteColaborador: (id) => {
    const item = get().colaboradores.find((c) => c.id === id)
    set((s) => ({ colaboradores: s.colaboradores.filter((c) => c.id !== id) }))
    if (item) {
      get().addActivity({ action: 'Excluiu', entity: 'Colaborador', entityName: item.name })
    }
  },

  reorderColaboradores: (ids) =>
    set((s) => ({ colaboradores: reorderByIds(s.colaboradores, ids) })),

  toggleColaboradorStatus: (id) => {
    const item = get().colaboradores.find((c) => c.id === id)
    if (!item) return
    set((s) => ({
      colaboradores: s.colaboradores.map((c) =>
        c.id === id
          ? { ...c, status: toggleStatus(c.status), updatedAt: new Date().toISOString() }
          : c,
      ),
    }))
    get().addActivity({
      action: item.status === 'active' ? 'Desativou' : 'Ativou',
      entity: 'Colaborador',
      entityName: item.name,
    })
  },

  createNoticia: (data) => {
    const item: Noticia = {
      ...data,
      id: generateId('not'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ noticias: [...s.noticias, item] }))
    get().addActivity({ action: 'Criou', entity: 'Notícia', entityName: data.title })
  },

  updateNoticia: (id, data) => {
    set((s) => ({
      noticias: s.noticias.map((n) =>
        n.id === id ? { ...n, ...data, updatedAt: new Date().toISOString() } : n,
      ),
    }))
    get().addActivity({ action: 'Editou', entity: 'Notícia', entityName: data.title ?? id })
  },

  deleteNoticia: (id) => {
    const item = get().noticias.find((n) => n.id === id)
    set((s) => ({ noticias: s.noticias.filter((n) => n.id !== id) }))
    if (item) {
      get().addActivity({ action: 'Excluiu', entity: 'Notícia', entityName: item.title })
    }
  },

  toggleNoticiaStatus: (id) => {
    const item = get().noticias.find((n) => n.id === id)
    if (!item) return
    set((s) => ({
      noticias: s.noticias.map((n) =>
        n.id === id
          ? { ...n, status: toggleStatus(n.status), updatedAt: new Date().toISOString() }
          : n,
      ),
    }))
    get().addActivity({
      action: item.status === 'active' ? 'Desativou' : 'Ativou',
      entity: 'Notícia',
      entityName: item.title,
    })
  },

  createEditorial: (data) => {
    const item: Editorial = {
      ...data,
      id: generateId('edi'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ editoriais: [...s.editoriais, item] }))
    get().addActivity({ action: 'Criou', entity: 'Editorial', entityName: data.title })
  },

  updateEditorial: (id, data) => {
    set((s) => ({
      editoriais: s.editoriais.map((e) =>
        e.id === id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e,
      ),
    }))
    get().addActivity({ action: 'Editou', entity: 'Editorial', entityName: data.title ?? id })
  },

  deleteEditorial: (id) => {
    const item = get().editoriais.find((e) => e.id === id)
    set((s) => ({ editoriais: s.editoriais.filter((e) => e.id !== id) }))
    if (item) {
      get().addActivity({ action: 'Excluiu', entity: 'Editorial', entityName: item.title })
    }
  },

  toggleEditorialStatus: (id) => {
    const item = get().editoriais.find((e) => e.id === id)
    if (!item) return
    set((s) => ({
      editoriais: s.editoriais.map((e) =>
        e.id === id
          ? { ...e, status: toggleStatus(e.status), updatedAt: new Date().toISOString() }
          : e,
      ),
    }))
    get().addActivity({
      action: item.status === 'active' ? 'Desativou' : 'Ativou',
      entity: 'Editorial',
      entityName: item.title,
    })
  },

  createEvento: (data) => {
    const item: Evento = {
      ...data,
      id: generateId('evt'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    set((s) => ({ eventos: [...s.eventos, item] }))
    get().addActivity({ action: 'Criou', entity: 'Evento', entityName: data.name })
  },

  updateEvento: (id, data) => {
    set((s) => ({
      eventos: s.eventos.map((e) =>
        e.id === id ? { ...e, ...data, updatedAt: new Date().toISOString() } : e,
      ),
    }))
    get().addActivity({ action: 'Editou', entity: 'Evento', entityName: data.name ?? id })
  },

  deleteEvento: (id) => {
    const item = get().eventos.find((e) => e.id === id)
    set((s) => ({ eventos: s.eventos.filter((e) => e.id !== id) }))
    if (item) {
      get().addActivity({ action: 'Excluiu', entity: 'Evento', entityName: item.name })
    }
  },

  toggleEventoStatus: (id) => {
    const item = get().eventos.find((e) => e.id === id)
    if (!item) return
    set((s) => ({
      eventos: s.eventos.map((e) =>
        e.id === id
          ? { ...e, status: toggleStatus(e.status), updatedAt: new Date().toISOString() }
          : e,
      ),
    }))
    get().addActivity({
      action: item.status === 'active' ? 'Desativou' : 'Ativou',
      entity: 'Evento',
      entityName: item.name,
    })
  },
}))
