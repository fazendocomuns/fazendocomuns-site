'use client'

import { useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { useRouter } from 'next/navigation'
import { Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AdminPageHeader } from '@/features/admin/components/AdminPageHeader'
import { AdminPagination } from '@/features/admin/components/AdminPagination'
import { DataTableShell } from '@/features/admin/components/DataTableShell'
import { DeleteConfirmDialog } from '@/features/admin/components/DeleteConfirmDialog'
import { EmptyState } from '@/features/admin/components/EmptyState'
import { ListToolbar } from '@/features/admin/components/ListToolbar'
import { LoadingTable } from '@/features/admin/components/LoadingTable'
import { RowActions } from '@/features/admin/components/RowActions'
import { SortableTableHead } from '@/features/admin/components/SortableTableHead'
import { formatDate } from '@/features/admin/lib/formatters'
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { useEventos, useEventoMutations } from '@/features/admin/api/content'
import { usePaginatedList } from '@/features/admin/hooks/usePaginatedList'

export function EventosListPage() {
  const router = useRouter()
  const { data: eventos = [], isLoading } = useEventos()
  const { remove, toggleStatus } = useEventoMutations()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')

  const {
    paginated,
    totalItems,
    totalPages,
    currentPage,
    filters,
    setSearch,
    setStatus,
    setPage,
    setPageSize,
    toggleSort,
  } = usePaginatedList({
    items: eventos,
    searchFields: ['name', 'location', 'shortDescription'],
    defaultSortField: 'date',
  })

  function confirmDelete() {
    if (deleteId) {
      remove.mutate(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Eventos"
        description="Gerencie os eventos exibidos no site."
        createHref="/admin/eventos/novo"
        createLabel="Novo evento"
      />

      <ListToolbar
        search={filters.search}
        onSearchChange={setSearch}
        status={filters.status}
        onStatusChange={setStatus}
        totalItems={totalItems}
        searchPlaceholder="Buscar por nome ou local..."
      />

      {isLoading ? (
        <LoadingTable columns={6} />
      ) : paginated.length === 0 ? (
        <EmptyState
          title="Nenhum evento encontrado"
          icon={<Calendar className="size-7 text-muted-foreground" />}
          actionLabel="Adicionar evento"
          onAction={() => router.push('/admin/eventos/novo')}
        />
      ) : (
        <DataTableShell totalItems={totalItems}>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <SortableTableHead
                  label="Nome"
                  field="name"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                />
                <SortableTableHead
                  label="Data"
                  field="date"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                  className="hidden sm:table-cell"
                />
                <SortableTableHead
                  label="Local"
                  field="location"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                  className="hidden md:table-cell"
                />
                <TableHead>Destaque</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <Link
                      to={`/admin/eventos/${item.id}/editar`}
                      className="font-ui text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="font-ui text-xs text-muted-foreground sm:hidden">
                      {formatDate(item.date)}
                    </p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-ui text-sm text-muted-foreground">
                    {formatDate(item.date)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-ui text-sm text-muted-foreground">
                    {item.location}
                  </TableCell>
                  <TableCell>
                    {item.featured ? (
                      <Badge
                        variant="outline"
                        className="border-amber-200 bg-amber-50 font-ui text-xs text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
                      >
                        Destaque
                      </Badge>
                    ) : (
                      <span className="font-ui text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <RowActions
                      editHref={`/admin/eventos/${item.id}/editar`}
                      onDelete={() => {
                        setDeleteId(item.id)
                        setDeleteName(item.name)
                      }}
                      onToggleStatus={() => toggleStatus.mutate({ id: item.id, status: item.status })}
                      isActive={item.status === 'active'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AdminPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            pageSize={filters.pageSize}
            onPageChange={setPage}
            onPageSizeChange={setPageSize}
          />
        </DataTableShell>
      )}

      <DeleteConfirmDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => !open && setDeleteId(null)}
        itemName={deleteName}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
