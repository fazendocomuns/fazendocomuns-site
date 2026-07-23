'use client'

import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { TableHead } from '@/components/ui/table'
import { cn } from '@/lib/utils'

interface SortableTableHeadProps {
  label: string
  field: string
  currentField: string
  direction: 'asc' | 'desc'
  onSort: (field: string) => void
  className?: string
}

export function SortableTableHead({
  label,
  field,
  currentField,
  direction,
  onSort,
  className,
}: SortableTableHeadProps) {
  const isActive = currentField === field

  return (
    <TableHead
      className={className}
      aria-sort={
        isActive ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'
      }
    >
      <button
        type="button"
        onClick={() => onSort(field)}
        className={cn(
          'inline-flex items-center gap-1.5 font-ui transition-colors hover:text-foreground',
          isActive ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {label}
        {isActive ? (
          direction === 'asc' ? (
            <ArrowUp className="size-3.5" aria-hidden="true" />
          ) : (
            <ArrowDown className="size-3.5" aria-hidden="true" />
          )
        ) : (
          <ArrowUpDown className="size-3.5 opacity-40" aria-hidden="true" />
        )}
      </button>
    </TableHead>
  )
}
