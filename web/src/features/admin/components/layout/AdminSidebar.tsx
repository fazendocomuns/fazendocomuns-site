'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, ExternalLink, LayoutDashboard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { adminNavItems } from '@/features/admin/config/navigation'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'
import { cn } from '@/lib/utils'

interface AdminSidebarProps {
  mobile?: boolean
  onNavigate?: () => void
}

function NavLink({
  item,
  isActive,
  isCollapsed,
  onNavigate,
}: {
  item: (typeof adminNavItems)[number]
  isActive: boolean
  isCollapsed: boolean
  onNavigate?: () => void
}) {
  const Icon = item.icon

  const link = (
    <Link
      to={item.href}
      onClick={onNavigate}
      className={cn(
        'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 font-ui text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-primary/10 text-primary shadow-sm'
          : 'text-muted-foreground hover:bg-muted/80 hover:text-foreground',
        isCollapsed && 'justify-center px-2.5',
        isActive && !isCollapsed && 'before:absolute before:left-0 before:top-1/2 before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-r-full before:bg-primary',
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icon
        className={cn(
          'size-[18px] shrink-0 transition-colors',
          isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground',
        )}
        aria-hidden="true"
      />
      <AnimatePresence>
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="truncate"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{link}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    )
  }

  return link
}

export function AdminSidebar({ mobile, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname()
  const collapsed = useAdminUiStore((s) => s.sidebarCollapsed)
  const toggleCollapsed = useAdminUiStore((s) => s.toggleSidebarCollapsed)
  const isCollapsed = collapsed && !mobile

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        layout
        className={cn(
          'flex h-full flex-col border-r border-border/50 bg-card/95 backdrop-blur-sm',
          mobile ? 'w-full' : 'hidden lg:flex',
          !mobile && (isCollapsed ? 'w-[72px]' : 'w-[260px]'),
        )}
        aria-label="Navegação administrativa"
      >
        <div
          className={cn(
            'flex h-16 shrink-0 items-center border-b border-border/50 px-3',
            isCollapsed ? 'justify-center' : 'justify-between px-4',
          )}
        >
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/admin"
                  className="flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-colors hover:bg-primary/15"
                  onClick={onNavigate}
                  aria-label="Dashboard"
                >
                  <LayoutDashboard className="size-5 text-primary" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          ) : (
            <Link to="/admin" className="flex items-center gap-2.5" onClick={onNavigate}>
              <Logo className="h-8" linkToHome={false} />
              <div className="flex flex-col">
                <span className="font-ui text-xs font-bold uppercase tracking-wider text-foreground">
                  Admin
                </span>
                <span className="font-ui text-[10px] text-muted-foreground">Fazendo Comuns</span>
              </div>
            </Link>
          )}

          {!mobile && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 shrink-0"
                  onClick={toggleCollapsed}
                  aria-label={isCollapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
                >
                  {isCollapsed ? (
                    <ChevronRight className="size-4" />
                  ) : (
                    <ChevronLeft className="size-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {isCollapsed ? 'Expandir' : 'Recolher'}
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" role="navigation">
          {!isCollapsed && (
            <p className="mb-2 px-3 font-ui text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Menu
            </p>
          )}
          {adminNavItems.map((item) => {
            const isActive = item.end
              ? pathname === item.href
              : pathname.startsWith(item.href) && item.href !== '/admin'

            return (
              <NavLink
                key={item.href}
                item={item}
                isActive={isActive}
                isCollapsed={isCollapsed}
                onNavigate={onNavigate}
              />
            )
          })}
        </nav>

        <div className="shrink-0 border-t border-border/50 p-3">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  onClick={onNavigate}
                  className="flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Ver site público"
                >
                  <ExternalLink className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Ver site</TooltipContent>
            </Tooltip>
          ) : (
            <Link
              to="/"
              onClick={onNavigate}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 font-ui text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ExternalLink className="size-4 shrink-0" />
              <span>Ver site público</span>
            </Link>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  )
}
