'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface DataTableShellProps {
  children: ReactNode
  totalItems: number
  className?: string
}

export function DataTableShell({ children, totalItems, className }: DataTableShellProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-border/50 bg-card shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border/40 px-4 py-3">
        <p className="font-ui text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{totalItems}</span>{' '}
          {totalItems === 1 ? 'registro' : 'registros'}
        </p>
      </div>
      {children}
    </div>
  )
}
