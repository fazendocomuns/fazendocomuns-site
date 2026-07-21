'use client'

import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { adminStaggerItem } from '@/features/admin/animations/adminMotion'

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  icon?: ReactNode
}

export function EmptyState({
  title = 'Nenhum item encontrado',
  description = 'Tente ajustar os filtros ou adicione um novo registro.',
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <motion.div
      variants={adminStaggerItem}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/20 px-6 py-16 text-center"
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-muted/80">
        {icon ?? <Inbox className="size-7 text-muted-foreground" aria-hidden="true" />}
      </div>
      <h3 className="font-ui text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </motion.div>
  )
}
