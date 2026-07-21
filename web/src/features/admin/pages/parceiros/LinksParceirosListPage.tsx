'use client'

import { useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { useRouter } from 'next/navigation'
import { Link2 } from 'lucide-react'
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
import { StatusBadge } from '@/features/admin/components/StatusBadge'
import { useLinksParceiros, useLinkParceiroMutations } from '@/features/admin/api/adminEntities'
import { usePaginatedList } from '@/features/admin/hooks/usePaginatedList'

export function LinksParceirosListPage() {
  const router = useRouter()
  const { data: links = [], isLoading } = useLinksParceiros()
  const { remove, toggleStatus } = useLinkParceiroMutations()
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
    items: links,
    searchFields: ['title', 'subtitle', 'highlight'],
    defaultSortField: 'displayOrder',
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
        title="Links de parceiros"
        description="Gerencie os blocos de links de parceiros."
        createHref="/admin/links-parceiros/novo"
        createLabel="Novo bloco"
      />

      <ListToolbar
        search={filters.search}
        onSearchChange={setSearch}
        status={filters.status}
        onStatusChange={setStatus}
        totalItems={totalItems}
        searchPlaceholder="Buscar por título..."
      />

      {isLoading ? (
        <LoadingTable columns={5} />
      ) : paginated.length === 0 ? (
        <EmptyState
          title="Nenhum bloco encontrado"
          icon={<Link2 className="size-7 text-muted-foreground" />}
          actionLabel="Adicionar bloco"
          onAction={() => router.push('/admin/links-parceiros/novo')}
        />
      ) : (
        <DataTableShell totalItems={totalItems}>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <SortableTableHead
                  label="Título"
                  field="title"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                />
                <SortableTableHead
                  label="Subtítulo"
                  field="subtitle"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                  className="hidden md:table-cell"
                />
                <SortableTableHead
                  label="Ordem"
                  field="displayOrder"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                  className="hidden sm:table-cell"
                />
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((item) => (
                <TableRow key={item.id} className="group">
                  <TableCell>
                    <Link
                      to={`/admin/links-parceiros/${item.id}/editar`}
                      className="font-ui text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-ui text-sm text-muted-foreground">
                    {item.subtitle || '—'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-ui text-sm text-muted-foreground">
                    {item.displayOrder}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <RowActions
                      editHref={`/admin/links-parceiros/${item.id}/editar`}
                      onDelete={() => {
                        setDeleteId(item.id)
                        setDeleteName(item.title)
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
