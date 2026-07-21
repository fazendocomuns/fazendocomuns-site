'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { useRouter } from 'next/navigation'
import { Bell, LogOut, Menu, Moon, Sun } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from '@/contexts/ThemeContext'
import { AdminSidebar } from '@/features/admin/components/layout/AdminSidebar'
import { useAuth, roleLabel } from '@/features/admin/hooks/useAuth'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function AdminHeader() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const setMobileSidebarOpen = useAdminUiStore((s) => s.setMobileSidebarOpen)
  const mobileSidebarOpen = useAdminUiStore((s) => s.mobileSidebarOpen)

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'FC'

  function handleLogout() {
    void logout().then(() => router.replace('/admin/login'))
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/50 bg-card/90 px-4 backdrop-blur-md lg:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Abrir menu de navegação">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100vw-2rem,300px)] p-0">
            <SheetTitle className="sr-only">Menu administrativo</SheetTitle>
            <AdminSidebar mobile onNavigate={() => setMobileSidebarOpen(false)} />
          </SheetContent>
        </Sheet>
        <Link to="/admin" className="truncate font-ui text-sm font-semibold text-foreground">
          Fazendo Comuns
        </Link>
      </div>

      <div className="hidden flex-1 lg:block" />

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
        >
          {theme === 'light' ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </Button>

        <Button variant="ghost" size="icon" aria-label="Notificações (em breve)">
          <Bell className="size-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2">
              <Avatar className="size-8">
                <AvatarFallback className="bg-brand-amber/30 text-xs font-semibold text-brand-red-dark">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[120px] truncate font-ui text-sm md:inline">
                {user?.email?.split('@')[0] ?? 'Admin'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-ui">
              <span className="block truncate">{user?.email ?? 'Conta demo'}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {roleLabel(user?.role ?? 'mock')}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/">Ver site público</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive focus:text-destructive">
              <LogOut className="size-4" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
