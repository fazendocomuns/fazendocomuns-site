import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  Calendar,
  FolderOpen,
  GraduationCap,
  Images,
  LayoutDashboard,
  Link2,
  Mic,
  Newspaper,
  PenLine,
  UserCheck,
  Users,
  UsersRound,
  Video,
} from 'lucide-react'

export interface AdminNavItem {
  label: string
  href: string
  icon: LucideIcon
  end?: boolean
}

export const adminNavItems: AdminNavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: 'Pesquisadores(as)',
    href: '/admin/pesquisadores',
    icon: GraduationCap,
  },
  {
    label: 'Assistentes',
    href: '/admin/assistentes',
    icon: Users,
  },
  {
    label: 'Consultores',
    href: '/admin/consultores',
    icon: UserCheck,
  },
  {
    label: 'Colaboradores',
    href: '/admin/colaboradores',
    icon: UsersRound,
  },
  {
    label: 'Notícias',
    href: '/admin/noticias',
    icon: Newspaper,
  },
  {
    label: 'Editoriais',
    href: '/admin/editoriais',
    icon: PenLine,
  },
  {
    label: 'Eventos',
    href: '/admin/eventos',
    icon: Calendar,
  },
  {
    label: 'Vídeos',
    href: '/admin/videos',
    icon: Video,
  },
  {
    label: 'Galerias de Fotos',
    href: '/admin/galerias',
    icon: Images,
  },
  {
    label: 'Podcast',
    href: '/admin/podcast',
    icon: Mic,
  },
  {
    label: 'Livros',
    href: '/admin/livros',
    icon: BookOpen,
  },
  {
    label: 'Parceiros',
    href: '/admin/parceiros',
    icon: Users,
  },
  {
    label: 'Links Parceiros',
    href: '/admin/links-parceiros',
    icon: Link2,
  },
  {
    label: 'Biblioteca de Mídia',
    href: '/admin/midia',
    icon: FolderOpen,
  },
]
