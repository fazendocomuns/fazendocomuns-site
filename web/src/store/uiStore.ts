import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ThemeMode = 'light' | 'dark'

interface UIState {
  isMobileMenuOpen: boolean
  theme: ThemeMode
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'

  try {
    const stored = localStorage.getItem('fazendo-comuns-ui')
    if (stored) {
      const parsed = JSON.parse(stored) as { state?: { theme?: ThemeMode } }
      if (parsed.state?.theme === 'dark' || parsed.state?.theme === 'light') {
        return parsed.state.theme
      }
    }
  } catch {
    // preferência inválida — usa claro
  }

  return 'light'
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isMobileMenuOpen: false,
      theme: getInitialTheme(),
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
      toggleMobileMenu: () => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () =>
        set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'fazendo-comuns-ui',
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)
