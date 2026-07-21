'use client'

import { useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ChevronDown, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileNavDrawer } from '@/components/shared/MobileNavDrawer'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { mainNavigation } from '@/features/home/data/navigation'
import { cn } from '@/lib/utils'

export function HomeNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav aria-label="Navegação principal" className="relative w-full">
      {/* Desktop */}
      <div className="hidden flex-wrap items-center justify-center gap-2 lg:flex">
        <ul className="flex flex-wrap items-center justify-center gap-1">
        {mainNavigation.map((item) => (
          <li
            key={item.href}
            className="relative"
            onMouseEnter={() => item.children && setOpenDropdown(item.href)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <Link
              href={item.href}
              className="rounded-full px-4 py-2 font-ui text-sm font-medium tracking-wide text-foreground/75 transition-colors hover:bg-brand-amber/20 hover:text-foreground"
            >
              {item.label}
              {item.children && (
                <ChevronDown
                  className={cn(
                    'ml-1 inline size-3.5 transition-transform',
                    openDropdown === item.href && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              )}
            </Link>

            <AnimatePresence>
              {item.children && openDropdown === item.href && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 z-50 mt-1 min-w-[220px] -translate-x-1/2 rounded-2xl border border-border/60 bg-card p-2 shadow-medium"
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block rounded-xl px-3 py-2.5 font-ui text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        ))}
        </ul>
        <ThemeToggle className="shrink-0" />
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-center gap-2 lg:hidden">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 font-ui text-sm font-medium shadow-soft transition-colors hover:bg-muted"
          aria-expanded={mobileOpen}
          aria-controls="home-mobile-nav"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          Menu
        </button>
      </div>

      <MobileNavDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        id="home-mobile-nav"
        variant="inline"
        linkClassName="text-sm"
        childLinkClassName="text-xs"
      />
    </nav>
  )
}
