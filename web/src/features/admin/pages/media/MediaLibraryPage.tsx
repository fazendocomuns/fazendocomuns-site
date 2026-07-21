'use client'

import { useMemo, useRef, useState } from 'react'
import { ImageIcon, Loader2, Search, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AdminPageHeader } from '@/features/admin/components/AdminPageHeader'
import { EmptyState } from '@/features/admin/components/EmptyState'
import { useMidiaLibrary, useMidiaMutations } from '@/features/admin/api/midia'
import { formatRelativeDate } from '@/features/admin/lib/formatters'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'
import type { MediaItem } from '@/features/admin/types'
import { isSupabaseReady } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

type MediaTypeFilter = 'all' | MediaItem['type']

export function MediaLibraryPage() {
  const { data: mediaLibrary = [], isLoading } = useMidiaLibrary()
  const { upload } = useMidiaMutations()
  const showToast = useAdminUiStore((s) => s.showToast)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<MediaTypeFilter>('all')
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)

  const filtered = useMemo(() => {
    let items = [...mediaLibrary]

    if (typeFilter !== 'all') {
      items = items.filter((item) => item.type === typeFilter)
    }

    if (search.trim()) {
      const query = search.toLowerCase().trim()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.alt.toLowerCase().includes(query),
      )
    }

    return items.sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime(),
    )
  }, [mediaLibrary, search, typeFilter])

  async function handleUpload(file: File) {
    try {
      await upload.mutateAsync(file)
      showToast('Arquivo enviado com sucesso!')
    } catch {
      showToast('Falha no upload. Tente novamente.', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Biblioteca de mídia"
        description="Visualize e gerencie os arquivos de mídia do site."
        actions={
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,video/mp4,application/pdf"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) void handleUpload(file)
                event.target.value = ''
              }}
            />
            <Button
              disabled={!isSupabaseReady() || upload.isPending}
              onClick={() => fileInputRef.current?.click()}
            >
              {upload.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Upload className="size-4" />
              )}
              Enviar arquivo
            </Button>
          </>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou descrição..."
            className="pl-9"
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={(value) => setTypeFilter(value as MediaTypeFilter)}
        >
          <SelectTrigger className="w-full sm:w-44">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="image">Imagens</SelectItem>
            <SelectItem value="video">Vídeos</SelectItem>
            <SelectItem value="document">Documentos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="Nenhum arquivo encontrado"
          description="Envie um arquivo ou ajuste os filtros de busca."
          icon={<ImageIcon className="size-7 text-muted-foreground" />}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPreviewItem(item)}
              className={cn(
                'group overflow-hidden rounded-2xl border border-border/60 bg-card text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              )}
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <ImageIcon className="size-10 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate font-ui text-sm font-medium">{item.name}</p>
                <p className="font-ui text-xs text-muted-foreground">
                  {item.size} · {formatRelativeDate(item.uploadedAt)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Dialog open={Boolean(previewItem)} onOpenChange={(open) => !open && setPreviewItem(null)}>
        <DialogContent className="max-w-2xl">
          {previewItem && (
            <>
              <DialogHeader>
                <DialogTitle>{previewItem.name}</DialogTitle>
                <DialogDescription>
                  {previewItem.alt} · {previewItem.size} ·{' '}
                  {formatRelativeDate(previewItem.uploadedAt)}
                </DialogDescription>
              </DialogHeader>
              {previewItem.type === 'image' ? (
                <img
                  src={previewItem.url}
                  alt={previewItem.alt}
                  className="max-h-[60vh] w-full rounded-xl object-contain"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
                  <ImageIcon className="size-12 text-muted-foreground" />
                  <span className="sr-only">Pré-visualização indisponível</span>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
