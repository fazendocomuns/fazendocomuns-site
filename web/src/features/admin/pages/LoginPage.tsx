'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { adminPageTransition } from '@/features/admin/animations/adminMotion'
import { useAuth } from '@/features/admin/hooks/useAuth'
import bannerImg from '@/assets/imgs/bannerr01.jpg'
import { cn } from '@/lib/utils'

type LoginState = 'idle' | 'loading' | 'error' | 'success' | 'reset-sent'

export function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated, isLoading, requestPasswordReset, usesSupabase } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [state, setState] = useState<LoginState>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/admin')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(
    () => () => {
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current)
    },
    [],
  )

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-8 animate-spin text-primary" aria-label="Carregando sessão" />
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    setErrorMessage('')

    try {
      await login(email, password)
      setState('success')
      redirectTimerRef.current = setTimeout(() => router.replace('/admin'), 500)
    } catch (err) {
      setState('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Não foi possível entrar. Tente novamente.',
      )
    }
  }

  async function handleForgotPassword() {
    if (!email.trim()) {
      setState('error')
      setErrorMessage('Informe seu e-mail para receber o link de recuperação.')
      return
    }

    setState('loading')
    setErrorMessage('')

    try {
      await requestPasswordReset(email.trim())
      setState('reset-sent')
    } catch (err) {
      setState('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Não foi possível enviar o e-mail de recuperação.',
      )
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative hidden w-1/2 overflow-hidden lg:flex lg:flex-col lg:justify-between"
        aria-hidden="true"
      >
        <Image
          src={bannerImg}
          alt=""
          fill
          sizes="50vw"
          quality={60}
          preload
          placeholder="blur"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/85 via-neutral-900/70 to-brand-red/40" />
        <div className="relative z-10 p-10 xl:p-14">
          <Logo className="h-12 brightness-0 invert" linkToHome={false} />
          <div className="mt-16 max-w-md">
            <p className="font-ui text-sm font-medium uppercase tracking-widest text-brand-amber">
              CMS Fazendo Comuns
            </p>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-white xl:text-4xl">
              Gestão de conteúdo do projeto de pesquisa
            </h1>
            <p className="mt-4 font-body text-base leading-relaxed text-white/80">
              Plataforma administrativa para gerenciar equipe, notícias, editoriais e eventos
              do Fazendo Comuns — UFRJ.
            </p>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/10 p-10 xl:p-14">
          <blockquote className="font-comic text-lg text-white/90">
            &ldquo;O recreio é direito. A escola é nossa. Vamos construir juntos.&rdquo;
          </blockquote>
          <p className="mt-2 font-ui text-sm text-white/60">Projeto Fazendo Comuns</p>
        </div>
      </motion.aside>

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:px-8">
        <motion.div
          variants={adminPageTransition}
          initial="initial"
          animate="animate"
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center lg:hidden">
            <Logo className="mx-auto h-10" linkToHome={false} />
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
            <div className="mb-8 hidden justify-center lg:flex">
              <Logo className="h-10" linkToHome={false} />
            </div>

            <div className="mb-8 text-center">
              <h1 className="font-ui text-2xl font-semibold tracking-tight text-foreground">
                Entrar no painel
              </h1>
              <p className="mt-2 font-ui text-sm text-muted-foreground">
                {usesSupabase
                  ? 'Acesso administrativo com Supabase Auth'
                  : 'Modo demonstração — Supabase não configurado'}
              </p>
            </div>

            {state === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950"
              >
                <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
                <p className="font-ui text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Login realizado com sucesso! Redirecionando...
                </p>
              </motion.div>
            )}

            {state === 'reset-sent' && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950"
              >
                <CheckCircle2 className="size-5 shrink-0 text-emerald-600" />
                <p className="font-ui text-sm font-medium text-emerald-700 dark:text-emerald-300">
                  Enviamos um link de recuperação para <strong>{email}</strong>.
                </p>
              </motion.div>
            )}

            {state === 'error' && errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-xl border border-brand-red/30 bg-brand-red/5 p-4"
              >
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-brand-red" />
                <p className="font-ui text-sm text-brand-red-dark dark:text-brand-red-light">
                  {errorMessage}
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder="seu@email.com"
                    required
                    disabled={state === 'loading' || state === 'success'}
                    aria-invalid={state === 'error'}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    placeholder="••••••••"
                    required
                    disabled={state === 'loading' || state === 'success'}
                    aria-invalid={state === 'error'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {usesSupabase && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-ui text-sm text-primary transition-colors hover:text-brand-red-dark"
                    disabled={state === 'loading' || state === 'success'}
                  >
                    Esqueci minha senha
                  </button>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className={cn('w-full', state === 'loading' && 'pointer-events-none')}
                disabled={state === 'loading' || state === 'success'}
              >
                {state === 'loading' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            {!usesSupabase && (
              <p className="mt-6 text-center font-ui text-xs text-muted-foreground">
                Demo: use qualquer senha. Para simular erro:{' '}
                <code className="rounded bg-muted px-1 py-0.5">erro@fazendocomuns.com.br</code>
              </p>
            )}
          </div>

          <p className="mt-6 text-center">
            <Link
              to="/"
              className="font-ui text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Voltar ao site público
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
