'use client'

import { useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { useRouter } from 'next/navigation'
import { Handshake } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
import { useColaboradores, useColaboradorMutations } from '@/features/admin/api/equipe'
import { usePaginatedList } from '@/features/admin/hooks/usePaginatedList'

export function ColaboradoresListPage() {
  const router = useRouter()
  const { data: colaboradores = [], isLoading } = useColaboradores()
  const { remove, reorder, toggleStatus } = useColaboradorMutations()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteName, setDeleteName] = useState('')

  const {
    paginated,
    filtered,
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
    items: colaboradores,
    searchFields: ['name', 'role', 'institution'],
  })

  function handleMove(id: string, direction: 'up' | 'down') {
    const ids = filtered.map((c) => c.id)
    const index = ids.indexOf(id)
    if (index === -1) return
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= ids.length) return
    ;[ids[index], ids[swapIndex]] = [ids[swapIndex], ids[index]]
    reorder.mutate(ids)
  }

  function confirmDelete() {
    if (deleteId) {
      remove.mutate(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Colaboradores(as)"
        description="Gerencie os colaboradores exibidos no site."
        createHref="/admin/colaboradores/novo"
        createLabel="Novo colaborador(a)"
      />

      <ListToolbar
        search={filters.search}
        onSearchChange={setSearch}
        status={filters.status}
        onStatusChange={setStatus}
        totalItems={totalItems}
        searchPlaceholder="Buscar por nome, cargo ou instituição..."
      />

      {isLoading ? (
        <LoadingTable columns={6} />
      ) : paginated.length === 0 ? (
        <EmptyState
          title="Nenhum colaborador(a) encontrado"
          icon={<Handshake className="size-7 text-muted-foreground" />}
          actionLabel="Adicionar colaborador(a)"
          onAction={() => router.push('/admin/colaboradores/novo')}
        />
      ) : (
        <DataTableShell totalItems={totalItems}>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <SortableTableHead
                  label="Ordem"
                  field="displayOrder"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                  className="w-20"
                />
                <SortableTableHead
                  label="Nome"
                  field="name"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                />
                <SortableTableHead
                  label="Instituição"
                  field="institution"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                  className="hidden md:table-cell"
                />
                <SortableTableHead
                  label="Cargo"
                  field="role"
                  currentField={filters.sortField}
                  direction={filters.sortDirection}
                  onSort={toggleSort}
                  className="hidden lg:table-cell"
                />
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((item, idx) => (
                <TableRow key={item.id} className="group">
                  <TableCell className="font-ui text-sm tabular-nums text-muted-foreground">
                    {item.displayOrder}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 ring-2 ring-transparent transition-all group-hover:ring-brand-amber/30">
                        <AvatarImage src={item.photo} alt="" />
                        <AvatarFallback>
                          {item.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <Link
                          to={`/admin/colaboradores/${item.id}/editar`}
                          className="truncate font-ui text-sm font-medium transition-colors hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <p className="truncate font-ui text-xs text-muted-foreground md:hidden">
                          {item.institution}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden max-w-[200px] truncate md:table-cell font-ui text-sm text-muted-foreground">
                    {item.institution}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell font-ui text-sm text-muted-foreground">
                    {item.role}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <RowActions
                      editHref={`/admin/colaboradores/${item.id}/editar`}
                      onDelete={() => {
                        setDeleteId(item.id)
                        setDeleteName(item.name)
                      }}
                      onToggleStatus={() => toggleStatus.mutate({ id: item.id, status: item.status })}
                      isActive={item.status === 'active'}
                      onMoveUp={() => handleMove(item.id, 'up')}
                      onMoveDown={() => handleMove(item.id, 'down')}
                      canMoveUp={idx > 0}
                      canMoveDown={idx < paginated.length - 1}
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
