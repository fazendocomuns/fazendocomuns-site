'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { motion } from 'framer-motion'
import { LayoutDashboard, Sparkles } from 'lucide-react'
import { adminStagger, adminStaggerItem } from '@/features/admin/animations/adminMotion'
import { ActivityFeed, RecentContentPanel } from '@/features/admin/components/ActivityFeed'
import { AdminPageHeader } from '@/features/admin/components/AdminPageHeader'
import { MetricCard } from '@/features/admin/components/MetricCard'
import { QuickActionCard } from '@/features/admin/components/QuickActionCard'
import { dashboardMetricConfigs, quickActions } from '@/features/admin/data/dashboardMetrics'
import { useDashboardCounts, useRecentContent, useDashboardActivities } from '@/features/admin/api/dashboard'
import { useAuth } from '@/features/admin/hooks/useAuth'

export function DashboardPage() {
  const { counts, isLoading: countsLoading } = useDashboardCounts()
  const { items: recentContent, isLoading: recentLoading } = useRecentContent()
  const { activities, isLoading: activitiesLoading } = useDashboardActivities()
  const { user } = useAuth()

  const greeting = user?.email
    ? `Bem-vindo(a), ${user.email.split('@')[0]}`
    : 'Bem-vindo(a) ao painel'

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={greeting}
        description="Visão geral do CMS Fazendo Comuns. Gerencie conteúdos, equipe e eventos em um só lugar."
        actions={
          <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 font-ui text-sm text-muted-foreground">
            <LayoutDashboard className="size-4 text-primary" aria-hidden="true" />
            Dashboard
          </div>
        }
      />

      <section aria-labelledby="metrics-heading">
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="size-4 text-brand-amber" aria-hidden="true" />
          <h2 id="metrics-heading" className="font-ui text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Métricas
          </h2>
        </div>
        <motion.div
          variants={adminStagger}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7"
        >
          {dashboardMetricConfigs.map((metric) => (
            <motion.div key={metric.key} variants={adminStaggerItem}>
              <Link
                to={metric.href}
                className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <MetricCard
                  title={metric.title}
                  value={
                    countsLoading
                      ? 0
                      : ((counts as Record<string, number> | undefined)?.[metric.key] ?? 0)
                  }
                  icon={metric.icon}
                  accent={metric.accent}
                  trend={metric.trend}
                  trendUp={metric.trendUp}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section aria-labelledby="quick-actions-heading">
        <h2 id="quick-actions-heading" className="mb-4 font-ui text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Ações rápidas
        </h2>
        <motion.div
          variants={adminStagger}
          initial="hidden"
          animate="visible"
          className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {quickActions.map((action) => (
            <motion.div key={action.href} variants={adminStaggerItem}>
              <QuickActionCard {...action} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentContentPanel items={recentLoading ? [] : recentContent} />
        <ActivityFeed activities={activitiesLoading ? [] : activities} />
      </div>
    </div>
  )
}
