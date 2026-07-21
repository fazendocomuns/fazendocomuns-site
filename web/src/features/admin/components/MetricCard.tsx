'use client'

import type { LucideIcon } from 'lucide-react'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  className?: string
  accent?: 'amber' | 'red' | 'orange' | 'yellow' | 'neutral'
}

const accentStyles = {
  amber: {
    icon: 'bg-brand-amber/15 text-brand-amber-dark',
    ring: 'group-hover:ring-brand-amber/30',
  },
  red: {
    icon: 'bg-brand-red/10 text-brand-red',
    ring: 'group-hover:ring-brand-red/20',
  },
  orange: {
    icon: 'bg-brand-orange/15 text-brand-orange-dark',
    ring: 'group-hover:ring-brand-orange/25',
  },
  yellow: {
    icon: 'bg-brand-yellow/25 text-neutral-700 dark:text-brand-yellow',
    ring: 'group-hover:ring-brand-yellow/30',
  },
  neutral: {
    icon: 'bg-muted text-muted-foreground',
    ring: 'group-hover:ring-border',
  },
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  className,
  accent = 'neutral',
}: MetricCardProps) {
  const styles = accentStyles[accent]

  return (
    <Card
      className={cn(
        'group relative overflow-hidden border-border/50 bg-card shadow-none transition-all duration-300',
        'hover:border-border hover:shadow-soft',
        'ring-1 ring-transparent',
        styles.ring,
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-gradient-to-br from-brand-amber/5 to-brand-red/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-3">
            <p className="truncate font-ui text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="font-ui text-3xl font-semibold tracking-tight text-foreground tabular-nums">
              {value}
            </p>
            {trend && (
              <div className="flex items-center gap-1.5">
                {trendUp ? (
                  <TrendingUp className="size-3.5 text-emerald-600" aria-hidden="true" />
                ) : (
                  <TrendingDown className="size-3.5 text-brand-red" aria-hidden="true" />
                )}
                <span
                  className={cn(
                    'font-ui text-xs font-medium',
                    trendUp ? 'text-emerald-600' : 'text-brand-red',
                  )}
                >
                  {trend}
                </span>
              </div>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={cn(
              'flex size-11 shrink-0 items-center justify-center rounded-xl',
              styles.icon,
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  )
}
