import { useCallback, useSyncExternalStore } from 'react'

const AUTH_KEY = 'fc-admin-mock-auth'

type AuthState = {
  email: string
  loggedInAt: string
}

let cachedRaw: string | null | undefined
let cachedSnapshot: AuthState | null = null

function getSnapshot(): AuthState | null {
  const raw = sessionStorage.getItem(AUTH_KEY)

  if (raw === cachedRaw) {
    return cachedSnapshot
  }

  cachedRaw = raw

  if (!raw) {
    cachedSnapshot = null
    return null
  }

  try {
    cachedSnapshot = JSON.parse(raw) as AuthState
  } catch {
    cachedSnapshot = null
  }

  return cachedSnapshot
}

function invalidateCache() {
  cachedRaw = undefined
}

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener('fc-admin-auth-change', callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener('fc-admin-auth-change', callback)
  }
}

function notify() {
  invalidateCache()
  window.dispatchEvent(new Event('fc-admin-auth-change'))
}

export function useMockAuth() {
  const auth = useSyncExternalStore(subscribe, getSnapshot, () => null)

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 900))
    if (email === 'erro@fazendocomuns.com.br') {
      throw new Error('E-mail ou senha incorretos. Tente novamente.')
    }
    const state: AuthState = { email, loggedInAt: new Date().toISOString() }
    sessionStorage.setItem(AUTH_KEY, JSON.stringify(state))
    notify()
    return state
  }, [])

  const logout = useCallback(() => {
    sessionStorage.removeItem(AUTH_KEY)
    notify()
  }, [])

  return {
    isAuthenticated: Boolean(auth),
    user: auth,
    login,
    logout,
  }
}
