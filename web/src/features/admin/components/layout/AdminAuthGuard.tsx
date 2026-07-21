'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { AdminToast } from '@/features/admin/components/AdminToast'
import { AdminHeader } from '@/features/admin/components/layout/AdminHeader'
import { AdminSidebar } from '@/features/admin/components/layout/AdminSidebar'
import { adminPageTransition } from '@/features/admin/animations/adminMotion'
import { useAuth } from '@/features/admin/hooks/useAuth'

interface AdminAuthGuardProps {
  children: React.ReactNode
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/admin/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <Loader2 className="size-8 animate-spin text-primary" aria-label="Verificando autenticação" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-neutral-50/80 dark:bg-neutral-950">
      <AdminSidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <AdminHeader />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            variants={adminPageTransition}
            initial="initial"
            animate="animate"
            exit="exit"
            id="admin-main"
            className="flex-1 overflow-x-hidden p-4 sm:p-6 lg:p-8 xl:mx-auto xl:w-full xl:max-w-[1680px]"
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </div>
      <AdminToast />
    </div>
  )
}
