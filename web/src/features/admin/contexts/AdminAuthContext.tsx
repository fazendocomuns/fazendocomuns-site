'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/types/database'
import { mapAuthErrorMessage } from '@/features/admin/lib/authErrors'
import { useMockAuth } from '@/features/admin/hooks/useMockAuth'

type UserRole = Database['public']['Enums']['user_role']

export interface AdminAuthUser {
  id: string
  email: string
  fullName: string | null
  role: UserRole | 'mock'
  loggedInAt: string
}

interface AdminAuthContextValue {
  isLoading: boolean
  isAuthenticated: boolean
  user: AdminAuthUser | null
  usesSupabase: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  requestPasswordReset: (email: string) => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

const STAFF_ROLES: UserRole[] = ['admin', 'editor']

type ProfileRow = Database['public']['Tables']['profiles']['Row']

function mapProfileToUser(user: User, profile: Pick<ProfileRow, 'email' | 'full_name' | 'role'>): AdminAuthUser {
  return {
    id: user.id,
    email: profile.email || user.email || '',
    fullName: profile.full_name,
    role: profile.role,
    loggedInAt: new Date().toISOString(),
  }
}

async function fetchProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, role')
    .eq('id', userId)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

function SupabaseAdminAuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<AdminAuthUser | null>(null)

  const syncSession = useCallback(async (session: Session | null) => {
    if (!session?.user) {
      setUser(null)
      return
    }

    const profile = await fetchProfile(session.user.id)

    if (!profile) {
      await supabase.auth.signOut()
      setUser(null)
      throw new Error('Perfil de usuário não encontrado. Contate o administrador.')
    }

    if (!STAFF_ROLES.includes(profile.role)) {
      await supabase.auth.signOut()
      setUser(null)
      throw new Error('Sua conta não tem permissão para acessar o painel administrativo.')
    }

    setUser(mapProfileToUser(session.user, profile))
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return
      syncSession(session)
        .catch(() => setUser(null))
        .finally(() => {
          if (mounted) setIsLoading(false)
        })
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      syncSession(session).catch(() => setUser(null))
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [syncSession])

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      throw new Error(mapAuthErrorMessage(error))
    }

    await syncSession(data.session)
  }, [syncSession])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [])

  const requestPasswordReset = useCallback(async (email: string) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/admin/reset-password`,
    })

    if (error) {
      throw new Error(mapAuthErrorMessage(error))
    }
  }, [])

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isLoading,
      isAuthenticated: Boolean(user),
      user,
      usesSupabase: true,
      login,
      logout,
      requestPasswordReset,
    }),
    [isLoading, user, login, logout, requestPasswordReset],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

function MockAdminAuthProvider({ children }: { children: ReactNode }) {
  const mock = useMockAuth()

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isLoading: false,
      isAuthenticated: mock.isAuthenticated,
      user: mock.user
        ? {
            id: 'mock',
            email: mock.user.email,
            fullName: null,
            role: 'mock',
            loggedInAt: mock.user.loggedInAt,
          }
        : null,
      usesSupabase: false,
      login: async (email, password) => {
        await mock.login(email, password)
      },
      logout: async () => {
        mock.logout()
      },
      requestPasswordReset: async () => {
        throw new Error('Recuperação de senha disponível apenas com Supabase configurado.')
      },
    }),
    [mock],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

function UnavailableAdminAuthProvider({ children }: { children: ReactNode }) {
  const value = useMemo<AdminAuthContextValue>(
    () => ({
      isLoading: false,
      isAuthenticated: false,
      user: null,
      usesSupabase: false,
      login: async () => {
        throw new Error('Painel indisponível: autenticação não configurada.')
      },
      logout: async () => undefined,
      requestPasswordReset: async () => {
        throw new Error('Painel indisponível: autenticação não configurada.')
      },
    }),
    [],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  if (isSupabaseConfigured()) {
    return <SupabaseAdminAuthProvider>{children}</SupabaseAdminAuthProvider>
  }

  if (process.env.NODE_ENV === 'development') {
    return <MockAdminAuthProvider>{children}</MockAdminAuthProvider>
  }

  return <UnavailableAdminAuthProvider>{children}</UnavailableAdminAuthProvider>
}

export function useAuth() {
  const context = useContext(AdminAuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AdminAuthProvider')
  }

  return context
}

export function roleLabel(role: AdminAuthUser['role']): string {
  switch (role) {
    case 'admin':
      return 'Administrador'
    case 'editor':
      return 'Editor'
    case 'viewer':
      return 'Visualizador'
    default:
      return 'Demonstração'
  }
}
