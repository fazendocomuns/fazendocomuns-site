'use client'

import type { ReactNode } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { ArrowLeft, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { fadeInUp } from '@/animations/motionVariants'

interface AdminPageHeaderProps {
  title: string
  description?: string
  backHref?: string
  createHref?: string
  createLabel?: string
  actions?: ReactNode
}

export function AdminPageHeader({
  title,
  description,
  backHref,
  createHref,
  createLabel = 'Adicionar',
  actions,
}: AdminPageHeaderProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="space-y-1">
        {backHref && (
          <Link
            to={backHref}
            className="mb-2 inline-flex items-center gap-1.5 font-ui text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar
          </Link>
        )}
        <h1 className="font-ui text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
            {description}
          </p>
        )}
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        {actions}
        {createHref && (
          <Button asChild>
            <Link to={createHref}>
              <Plus className="size-4" />
              {createLabel}
            </Link>
          </Button>
        )}
      </div>
    </motion.div>
  )
}
