'use client'

import { useEffect, useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { useRouter } from 'next/navigation'
import { AlertCircle, CheckCircle2, Loader2, Lock } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/features/admin/hooks/useAuth'
import { supabase } from '@/lib/supabase/client'
import { isSupabaseConfigured } from '@/lib/supabase/env'

export function ResetPasswordPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      router.replace('/admin/login')
    }
  }, [router])

  useEffect(() => {
    if (isAuthenticated && state !== 'success') {
      router.replace('/admin')
    }
  }, [isAuthenticated, router, state])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    if (password.length < 8) {
      setState('error')
      setErrorMessage('A senha deve ter pelo menos 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setState('error')
      setErrorMessage('As senhas não coincidem.')
      return
    }

    setState('loading')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setState('error')
      setErrorMessage('Não foi possível redefinir a senha. Solicite um novo link.')
      return
    }

    setState('success')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
        <div className="mb-8 flex justify-center">
          <Logo className="h-10" linkToHome={false} />
        </div>

        <h1 className="text-center font-ui text-2xl font-semibold">Nova senha</h1>
        <p className="mt-2 text-center font-ui text-sm text-muted-foreground">
          Defina uma nova senha para sua conta administrativa.
        </p>

        {state === 'success' ? (
          <div className="mt-8 space-y-4 text-center">
            <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
            <p className="font-ui text-sm text-muted-foreground">
              Senha atualizada com sucesso.
            </p>
            <Button asChild className="w-full">
              <Link to="/admin/login">Ir para o login</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {state === 'error' && errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-brand-red/30 bg-brand-red/5 p-4"
              >
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-brand-red" />
                <p className="font-ui text-sm text-brand-red-dark">{errorMessage}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Nova senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  minLength={8}
                  required
                  disabled={state === 'loading'}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  minLength={8}
                  required
                  disabled={state === 'loading'}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={state === 'loading'}>
              {state === 'loading' ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar nova senha'
              )}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
