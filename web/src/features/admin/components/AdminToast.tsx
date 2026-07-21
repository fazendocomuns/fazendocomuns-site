'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, X } from 'lucide-react'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'
import { cn } from '@/lib/utils'

export function AdminToast() {
  const toast = useAdminUiStore((s) => s.toast)
  const hideToast = useAdminUiStore((s) => s.hideToast)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      useAdminUiStore.getState().hideToast()
    }, 4000)
    return () => clearTimeout(timer)
  }, [toast])

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6"
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.message}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            role={toast.type === 'error' ? 'alert' : 'status'}
            className={cn(
              'pointer-events-auto flex max-w-sm items-start gap-3 rounded-xl border p-4 shadow-strong',
              toast.type === 'success'
                ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950'
                : 'border-brand-red/30 bg-brand-red/5',
            )}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="size-5 shrink-0 text-emerald-600" aria-hidden="true" />
            ) : (
              <AlertCircle className="size-5 shrink-0 text-brand-red" aria-hidden="true" />
            )}
            <p
              className={cn(
                'flex-1 font-ui text-sm font-medium',
                toast.type === 'success'
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-brand-red-dark',
              )}
            >
              {toast.message}
            </p>
            <button
              type="button"
              onClick={hideToast}
              className="shrink-0 text-muted-foreground hover:text-foreground"
              aria-label="Fechar notificação"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
