import { useMemo, useState } from 'react'
import type { EntityStatus, ListFilters } from '@/features/admin/types'
import { DEFAULT_LIST_FILTERS } from '@/features/admin/types'

interface ListEntity {
  status: EntityStatus
  displayOrder: number
}

interface UsePaginatedListOptions<T extends ListEntity> {
  items: T[]
  searchFields: (keyof T & string)[]
  initialFilters?: Partial<ListFilters>
  defaultSortField?: keyof T & string
}

function compareValues(a: unknown, b: unknown, direction: 'asc' | 'desc'): number {
  const factor = direction === 'asc' ? 1 : -1

  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1

  if (typeof a === 'number' && typeof b === 'number') {
    return (a - b) * factor
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, 'pt-BR', { sensitivity: 'base' }) * factor
  }

  if (typeof a === 'boolean' && typeof b === 'boolean') {
    return (Number(a) - Number(b)) * factor
  }

  return String(a).localeCompare(String(b), 'pt-BR') * factor
}

export function usePaginatedList<T extends ListEntity>({
  items,
  searchFields,
  initialFilters,
  defaultSortField = 'displayOrder' as keyof T & string,
}: UsePaginatedListOptions<T>) {
  const [filters, setFilters] = useState<ListFilters>({
    ...DEFAULT_LIST_FILTERS,
    sortField: defaultSortField,
    ...initialFilters,
  })

  const filtered = useMemo(() => {
    let result = [...items]

    if (filters.status !== 'all') {
      result = result.filter((item) => item.status === filters.status)
    }

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase().trim()
      result = result.filter((item) =>
        searchFields.some((field) => {
          const value = item[field]
          if (typeof value === 'string') {
            return value.toLowerCase().includes(query)
          }
          if (Array.isArray(value)) {
            return value.some(
              (v) => typeof v === 'string' && v.toLowerCase().includes(query),
            )
          }
          return false
        }),
      )
    }

    const sortField = filters.sortField as keyof T
    return result.sort((a, b) =>
      compareValues(a[sortField], b[sortField], filters.sortDirection),
    )
  }, [items, filters, searchFields])

  const totalPages = Math.max(1, Math.ceil(filtered.length / filters.pageSize))
  const currentPage = Math.min(filters.page, totalPages)

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * filters.pageSize
    return filtered.slice(start, start + filters.pageSize)
  }, [filtered, currentPage, filters.pageSize])

  function setSearch(search: string) {
    setFilters((f) => ({ ...f, search, page: 1 }))
  }

  function setStatus(status: EntityStatus | 'all') {
    setFilters((f) => ({ ...f, status, page: 1 }))
  }

  function setPage(page: number) {
    setFilters((f) => ({ ...f, page }))
  }

  function setPageSize(pageSize: number) {
    setFilters((f) => ({ ...f, pageSize, page: 1 }))
  }

  function toggleSort(field: string) {
    setFilters((f) => ({
      ...f,
      sortField: field,
      sortDirection:
        f.sortField === field && f.sortDirection === 'asc' ? 'desc' : 'asc',
      page: 1,
    }))
  }

  return {
    filters,
    filtered,
    paginated,
    totalItems: filtered.length,
    totalPages,
    currentPage,
    setSearch,
    setStatus,
    setPage,
    setPageSize,
    toggleSort,
  }
}
