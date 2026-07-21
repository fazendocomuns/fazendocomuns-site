'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { Menu, X, Mail } from 'lucide-react'
import { Logo } from '@/components/shared/Logo'
import { MobileNavDrawer } from '@/components/shared/MobileNavDrawer'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { Button } from '@/components/ui/button'
import { useCloseOnRouteChange } from '@/hooks/useMobileMenu'
import { useUIStore } from '@/store/uiStore'
import { mainNavigation } from '@/features/home/data/navigation'

export function Header() {
  const isOpen = useUIStore((s) => s.isMobileMenuOpen)
  const setOpen = useUIStore((s) => s.setMobileMenuOpen)

  useCloseOnRouteChange(() => setOpen(false))

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border/40 bg-background/95 backdrop-blur-md">
      <a href="#main-content" className="skip-link">
        Ir para o conteúdo principal
      </a>

      <div className="relative z-[120] container-app flex h-16 items-center justify-between md:h-20">
        <Logo size="sm" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {mainNavigation.map((item) => (
            <div key={item.href} className="group relative">
              <Link
                to={item.href}
                className="rounded-full px-3 py-2 font-ui text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground"
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute top-full left-0 z-50 min-w-[220px] translate-y-2 rounded-2xl border border-border bg-card p-2 opacity-0 shadow-medium transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      className="block rounded-xl px-3 py-2 font-ui text-sm text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />

          <Button variant="default" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/contato">
              <Mail className="size-4" aria-hidden="true" />
              Contato
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <MobileNavDrawer
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        id="mobile-menu"
        variant="header"
      />
    </header>
  )
}
