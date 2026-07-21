import type { LucideIcon } from 'lucide-react'
import {
  Calendar,
  GraduationCap,
  Newspaper,
  PenLine,
  UserCheck,
  Users,
  UsersRound,
} from 'lucide-react'

export interface DashboardMetricConfig {
  key: string
  title: string
  icon: LucideIcon
  accent: 'amber' | 'red' | 'orange' | 'yellow' | 'neutral'
  href: string
  trend: string
  trendUp: boolean
}

export const dashboardMetricConfigs: DashboardMetricConfig[] = [
  {
    key: 'pesquisadores',
    title: 'Pesquisadores(as)',
    icon: GraduationCap,
    accent: 'red',
    href: '/admin/pesquisadores',
    trend: '+1 este mês',
    trendUp: true,
  },
  {
    key: 'assistentes',
    title: 'Assistentes',
    icon: Users,
    accent: 'amber',
    href: '/admin/assistentes',
    trend: '+3 este mês',
    trendUp: true,
  },
  {
    key: 'consultores',
    title: 'Consultores',
    icon: UserCheck,
    accent: 'orange',
    href: '/admin/consultores',
    trend: 'Estável',
    trendUp: true,
  },
  {
    key: 'colaboradores',
    title: 'Colaboradores',
    icon: UsersRound,
    accent: 'yellow',
    href: '/admin/colaboradores',
    trend: '+1 este mês',
    trendUp: true,
  },
  {
    key: 'noticias',
    title: 'Notícias',
    icon: Newspaper,
    accent: 'red',
    href: '/admin/noticias',
    trend: '+2 esta semana',
    trendUp: true,
  },
  {
    key: 'editoriais',
    title: 'Editoriais',
    icon: PenLine,
    accent: 'amber',
    href: '/admin/editoriais',
    trend: 'Sem alterações',
    trendUp: true,
  },
  {
    key: 'eventos',
    title: 'Eventos',
    icon: Calendar,
    accent: 'orange',
    href: '/admin/eventos',
    trend: '+1 este mês',
    trendUp: true,
  },
]

export const quickActions = [
  {
    label: 'Novo Pesquisador',
    description: 'Cadastrar membro da equipe',
    href: '/admin/pesquisadores/novo',
    accent: 'red' as const,
  },
  {
    label: 'Nova Notícia',
    description: 'Publicar conteúdo editorial',
    href: '/admin/noticias/novo',
    accent: 'amber' as const,
  },
  {
    label: 'Novo Editorial',
    description: 'Escrever novo editorial',
    href: '/admin/editoriais/novo',
    accent: 'orange' as const,
  },
  {
    label: 'Novo Evento',
    description: 'Registrar evento do projeto',
    href: '/admin/eventos/novo',
    accent: 'yellow' as const,
  },
  {
    label: 'Novo Vídeo',
    description: 'Adicionar vídeo à multimídia',
    href: '/admin/videos/novo',
    accent: 'red' as const,
  },
  {
    label: 'Novo Livro',
    description: 'Cadastrar publicação',
    href: '/admin/livros/novo',
    accent: 'amber' as const,
  },
]
