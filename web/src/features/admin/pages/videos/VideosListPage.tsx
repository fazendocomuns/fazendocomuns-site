'use client'

import { useState } from 'react'
import { AppLink as Link } from '@/components/shared/AppLink'
import { useRouter } from 'next/navigation'
import { Video } from 'lucide-react'
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
import { useVideos, useVideoMutations } from '@/features/admin/api/adminEntities'
import { usePaginatedList } from '@/features/admin/hooks/usePaginatedList'

export function VideosListPage() {
  const router = useRouter()
  const { data: videos = [], isLoading } = useVideos()
  const { remove, toggleStatus } = useVideoMutations()
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
    items: videos,
    searchFields: ['title', 'description'],
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
        title="Vídeos"
        description="Gerencie os vídeos exibidos no site."
        createHref="/admin/videos/novo"
        createLabel="Novo vídeo"
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
        <LoadingTable columns={4} />
      ) : paginated.length === 0 ? (
        <EmptyState
          title="Nenhum vídeo encontrado"
          icon={<Video className="size-7 text-muted-foreground" />}
          actionLabel="Adicionar vídeo"
          onAction={() => router.push('/admin/videos/novo')}
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
                      to={`/admin/videos/${item.id}/editar`}
                      className="font-ui text-sm font-medium transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell font-ui text-sm text-muted-foreground">
                    {item.displayOrder}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell>
                    <RowActions
                      editHref={`/admin/videos/${item.id}/editar`}
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
