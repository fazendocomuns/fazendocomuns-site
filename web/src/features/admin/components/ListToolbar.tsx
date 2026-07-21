'use client'

import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { EntityStatus } from '@/features/admin/types'
import { cn } from '@/lib/utils'

interface ListToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  status: EntityStatus | 'all'
  onStatusChange: (status: EntityStatus | 'all') => void
  searchPlaceholder?: string
  totalItems?: number
  extraFilters?: React.ReactNode
  className?: string
}

export function ListToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  searchPlaceholder = 'Buscar...',
  totalItems,
  extraFilters,
  className,
}: ListToolbarProps) {
  const hasFilters = search.trim() !== '' || status !== 'all'

  function clearFilters() {
    onSearchChange('')
    onStatusChange('all')
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm sm:flex-row sm:items-center',
        className,
      )}
      role="search"
    >
      <div className="relative min-w-0 flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-10 pr-10"
          aria-label="Buscar registros"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Limpar busca"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <SlidersHorizontal className="hidden size-4 text-muted-foreground sm:block" aria-hidden="true" />
        <Select value={status} onValueChange={(v) => onStatusChange(v as EntityStatus | 'all')}>
          <SelectTrigger className="w-full sm:w-[160px]" aria-label="Filtrar por status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
        {extraFilters}
        {hasFilters && (
          <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
            Limpar filtros
          </Button>
        )}
      </div>

      {totalItems !== undefined && (
        <p className="font-ui text-xs text-muted-foreground sm:ml-auto sm:hidden">
          {totalItems} {totalItems === 1 ? 'resultado' : 'resultados'}
        </p>
      )}
    </div>
  )
}
