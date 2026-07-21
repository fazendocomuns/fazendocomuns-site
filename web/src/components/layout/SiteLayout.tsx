'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollToTop } from '@/components/shared/ScrollToTop'
import { cn } from '@/lib/utils'

interface SiteLayoutProps {
  children: React.ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {!isHome && <Header />}
      <main
        id="main-content"
        className={cn('flex-1 bg-background', !isHome && 'pt-16 md:pt-20')}
      >
        {children}
      </main>
      {!isHome && <Footer />}
    </div>
  )
}
