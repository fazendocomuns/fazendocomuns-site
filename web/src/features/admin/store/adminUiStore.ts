import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ToastState {
  message: string
  type: 'success' | 'error'
}

interface AdminUiState {
  sidebarCollapsed: boolean
  mobileSidebarOpen: boolean
  toast: ToastState | null
  setSidebarCollapsed: (collapsed: boolean) => void
  toggleSidebarCollapsed: () => void
  setMobileSidebarOpen: (open: boolean) => void
  toggleMobileSidebar: () => void
  showToast: (message: string, type?: 'success' | 'error') => void
  hideToast: () => void
}

export const useAdminUiStore = create<AdminUiState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      toast: null,
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
      toggleSidebarCollapsed: () =>
        set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
      toggleMobileSidebar: () =>
        set((s) => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
      showToast: (message, type = 'success') => {
        set({ toast: { message, type } })
      },
      hideToast: () => set({ toast: null }),
    }),
    {
      name: 'fc-admin-ui',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
)
