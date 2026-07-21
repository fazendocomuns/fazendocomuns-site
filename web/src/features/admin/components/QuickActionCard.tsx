'use client'

import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowRight, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface QuickActionCardProps {
  label: string
  description: string
  href: string
  accent?: 'amber' | 'red' | 'orange' | 'yellow'
}

const accentMap = {
  amber: 'from-brand-amber/20 to-brand-amber/5 border-brand-amber/25 hover:border-brand-amber/50',
  red: 'from-brand-red/15 to-brand-red/5 border-brand-red/20 hover:border-brand-red/40',
  orange: 'from-brand-orange/20 to-brand-orange/5 border-brand-orange/25 hover:border-brand-orange/45',
  yellow: 'from-brand-yellow/25 to-brand-yellow/5 border-brand-yellow/30 hover:border-brand-yellow/50',
}

export function QuickActionCard({
  label,
  description,
  href,
  accent = 'amber',
}: QuickActionCardProps) {
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Link
        to={href}
        className={cn(
          'group flex items-center gap-4 rounded-2xl border bg-gradient-to-br p-4 transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          accentMap[accent],
        )}
      >
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card/80 shadow-soft">
          <Plus className="size-5 text-foreground" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-ui text-sm font-semibold text-foreground">{label}</p>
          <p className="truncate font-ui text-xs text-muted-foreground">{description}</p>
        </div>
        <ArrowRight
          className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  )
}
