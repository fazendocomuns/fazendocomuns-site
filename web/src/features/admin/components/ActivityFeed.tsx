'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import {
  Calendar,
  FileEdit,
  FilePlus,
  GraduationCap,
  Newspaper,
  PenLine,
  UserCheck,
  Users,
  UsersRound,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { adminStagger, adminStaggerItem } from '@/features/admin/animations/adminMotion'
import { formatRelativeDate } from '@/features/admin/lib/formatters'
import type { ActivityItem } from '@/features/admin/types'
import { cn } from '@/lib/utils'

const actionIcons: Record<string, typeof FilePlus> = {
  Criou: FilePlus,
  Editou: FileEdit,
  Excluiu: FileEdit,
  Desativou: FileEdit,
  Ativou: FileEdit,
  Reordenou: FileEdit,
}

const entityIcons: Record<string, typeof Newspaper> = {
  Notícia: Newspaper,
  Editorial: PenLine,
  Evento: Calendar,
  'Pesquisador(a)': GraduationCap,
  Assistente: Users,
  Consultor: UserCheck,
  Colaborador: UsersRound,
}

interface ActivityFeedProps {
  activities: ActivityItem[]
}

function ActivityList({ items, emptyMessage }: { items: ActivityItem[]; emptyMessage: string }) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center font-ui text-sm text-muted-foreground">{emptyMessage}</p>
    )
  }

  return (
    <motion.ul
      variants={adminStagger}
      initial="hidden"
      animate="visible"
      className="space-y-2"
      role="list"
    >
      {items.map((activity) => {
        const ActionIcon = actionIcons[activity.action] ?? FileEdit
        const EntityIcon = entityIcons[activity.entity] ?? FileEdit

        return (
          <motion.li key={activity.id} variants={adminStaggerItem} role="listitem">
            <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-muted/20 p-3 transition-colors hover:bg-muted/40">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card">
                <EntityIcon className="size-4 text-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-ui text-sm text-foreground">
                  <ActionIcon className="mr-1 inline size-3.5 text-muted-foreground" aria-hidden="true" />
                  <span className="font-medium">{activity.action}</span>{' '}
                  <span className="text-muted-foreground">{activity.entity}</span>
                </p>
                <p className="truncate text-sm text-muted-foreground">{activity.entityName}</p>
              </div>
              <time
                dateTime={activity.timestamp}
                className="shrink-0 font-ui text-xs text-muted-foreground"
              >
                {formatRelativeDate(activity.timestamp)}
              </time>
            </div>
          </motion.li>
        )
      })}
    </motion.ul>
  )
}

interface ContentItem {
  id: string
  title: string
  type: string
  date: string
  href: string
}

function ContentList({ items, emptyMessage }: { items: ContentItem[]; emptyMessage: string }) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center font-ui text-sm text-muted-foreground">{emptyMessage}</p>
    )
  }

  return (
    <ul className="space-y-2" role="list">
      {items.map((item) => {
        const Icon = entityIcons[item.type] ?? Newspaper
        return (
          <li key={`${item.type}-${item.id}`} role="listitem">
            <Link
              to={item.href}
              className={cn(
                'flex items-center gap-3 rounded-xl border border-border/40 p-3 transition-all',
                'hover:border-border hover:bg-muted/40',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-card">
                <Icon className="size-4 text-primary" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-ui text-sm font-medium text-foreground">
                  {item.title}
                </p>
                <p className="font-ui text-xs text-muted-foreground">{item.type}</p>
              </div>
              <time
                dateTime={item.date}
                className="shrink-0 font-ui text-xs text-muted-foreground"
              >
                {formatRelativeDate(item.date)}
              </time>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const created = activities.filter((a) => a.action === 'Criou').slice(0, 6)
  const edited = activities.filter((a) => a.action === 'Editou').slice(0, 6)
  const events = activities
    .filter((a) => a.entity === 'Evento')
    .slice(0, 6)

  return (
    <Card className="border-border/50 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="font-ui text-base font-semibold">Atividades recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <TabsList className="mb-4 h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
            <TabsTrigger value="all" className="text-xs sm:text-sm">
              Todas
            </TabsTrigger>
            <TabsTrigger value="created" className="text-xs sm:text-sm">
              Criações
            </TabsTrigger>
            <TabsTrigger value="edited" className="text-xs sm:text-sm">
              Edições
            </TabsTrigger>
            <TabsTrigger value="events" className="text-xs sm:text-sm">
              Eventos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <ActivityList items={activities.slice(0, 8)} emptyMessage="Nenhuma atividade registrada." />
          </TabsContent>
          <TabsContent value="created">
            <ActivityList items={created} emptyMessage="Nenhum conteúdo criado recentemente." />
          </TabsContent>
          <TabsContent value="edited">
            <ActivityList items={edited} emptyMessage="Nenhuma edição recente." />
          </TabsContent>
          <TabsContent value="events">
            <ActivityList items={events} emptyMessage="Nenhum evento registrado recentemente." />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export function RecentContentPanel({ items }: { items: ContentItem[] }) {
  const created = items
    .filter((i) => i.type !== 'Evento')
    .slice(0, 5)
  const events = items.filter((i) => i.type === 'Evento').slice(0, 5)

  return (
    <Card className="border-border/50 shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="font-ui text-base font-semibold">Últimos conteúdos</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="content">
          <TabsList className="mb-4 h-auto w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
            <TabsTrigger value="content" className="text-xs sm:text-sm">
              Conteúdos
            </TabsTrigger>
            <TabsTrigger value="events" className="text-xs sm:text-sm">
              Eventos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <ContentList items={created} emptyMessage="Nenhum conteúdo cadastrado." />
          </TabsContent>
          <TabsContent value="events">
            <ContentList items={events} emptyMessage="Nenhum evento cadastrado." />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
