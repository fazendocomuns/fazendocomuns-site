'use client'

import { useMemo, useRef, useState } from 'react'
import {
  ChevronRight,
  Folder,
  FolderPlus,
  Home,
  ImageIcon,
  Loader2,
  Search,
  Upload,
} from 'lucide-react'
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { AdminPageHeader } from '@/features/admin/components/AdminPageHeader'
import { EmptyState } from '@/features/admin/components/EmptyState'
import {
  useMidiaFolders,
  useMidiaLibrary,
  useMidiaMutations,
} from '@/features/admin/api/midia'
import { formatRelativeDate } from '@/features/admin/lib/formatters'
import { normalizeFolder } from '@/integrations/supabase/repositories/midiaRepository'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'
import type { MediaItem } from '@/features/admin/types'
import { isSupabaseReady } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

type MediaTypeFilter = 'all' | MediaItem['type']

const ACCEPT =
  'image/jpeg,image/png,image/webp,image/gif,video/mp4,audio/mpeg,audio/mp3,audio/wav,application/pdf'

function joinFolder(parent: string, child: string): string {
  const next = normalizeFolder(child)
  if (!next) return parent
  return parent ? `${parent}/${next}` : next
}

function childFolders(allFolders: string[], current: string): string[] {
  const prefix = current ? `${current}/` : ''
  const names = new Set<string>()

  for (const folder of allFolders) {
    if (current) {
      if (!folder.startsWith(prefix)) continue
      const rest = folder.slice(prefix.length)
      const segment = rest.split('/')[0]
      if (segment) names.add(segment)
    } else {
      const segment = folder.split('/')[0]
      if (segment) names.add(segment)
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

export function MediaLibraryPage() {
  const { data: mediaLibrary = [], isLoading } = useMidiaLibrary()
  const { data: folders = [] } = useMidiaFolders()
  const { uploadMany, createFolder } = useMidiaMutations()
  const showToast = useAdminUiStore((s) => s.showToast)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [currentFolder, setCurrentFolder] = useState('')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<MediaTypeFilter>('all')
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const [folderDialogOpen, setFolderDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const breadcrumb = useMemo(
    () => (currentFolder ? currentFolder.split('/') : []),
    [currentFolder],
  )

  const subfolders = useMemo(
    () => childFolders(folders, currentFolder),
    [folders, currentFolder],
  )

  const filtered = useMemo(() => {
    let items = mediaLibrary.filter((item) => (item.folder ?? '') === currentFolder)

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
  }, [mediaLibrary, currentFolder, search, typeFilter])

  const busy = uploadMany.isPending || createFolder.isPending

  async function handleUploadFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList)
    if (files.length === 0) return

    try {
      const uploaded = await uploadMany.mutateAsync({ files, folder: currentFolder })
      const failed = files.length - uploaded.length
      if (failed > 0) {
        showToast(
          `${uploaded.length} enviado(s), ${failed} falhou/falharam.`,
          uploaded.length ? 'success' : 'error',
        )
      } else {
        showToast(
          files.length === 1
            ? 'Arquivo enviado com sucesso!'
            : `${files.length} arquivos enviados com sucesso!`,
        )
      }
    } catch {
      showToast('Falha no upload. Tente novamente.', 'error')
    }
  }

  async function handleCreateFolder() {
    const fullPath = joinFolder(currentFolder, newFolderName)
    if (!fullPath) {
      showToast('Informe um nome de pasta válido.', 'error')
      return
    }

    try {
      const created = await createFolder.mutateAsync(fullPath)
      setFolderDialogOpen(false)
      setNewFolderName('')
      setCurrentFolder(created)
      showToast('Pasta criada!')
    } catch {
      showToast('Não foi possível criar a pasta.', 'error')
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Biblioteca de mídia"
        description="Organize arquivos em pastas e envie vários de uma vez."
        actions={
          <>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPT}
              className="hidden"
              onChange={(event) => {
                if (event.target.files?.length) {
                  void handleUploadFiles(event.target.files)
                }
                event.target.value = ''
              }}
            />
            <Button
              type="button"
              variant="outline"
              disabled={!isSupabaseReady() || busy}
              onClick={() => setFolderDialogOpen(true)}
            >
              <FolderPlus className="size-4" />
              Nova pasta
            </Button>
            <Button
              disabled={!isSupabaseReady() || busy}
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadMany.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <Upload className="size-4" />
              )}
              Enviar arquivos
            </Button>
          </>
        }
      />

      <nav
        aria-label="Pasta atual"
        className="flex flex-wrap items-center gap-1 font-ui text-sm text-muted-foreground"
      >
        <button
          type="button"
          onClick={() => setCurrentFolder('')}
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground',
            !currentFolder && 'bg-muted font-medium text-foreground',
          )}
        >
          <Home className="size-3.5" />
          Raiz
        </button>
        {breadcrumb.map((segment, index) => {
          const path = breadcrumb.slice(0, index + 1).join('/')
          const isLast = index === breadcrumb.length - 1
          return (
            <span key={path} className="inline-flex items-center gap-1">
              <ChevronRight className="size-3.5 opacity-50" />
              <button
                type="button"
                onClick={() => setCurrentFolder(path)}
                className={cn(
                  'rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground',
                  isLast && 'bg-muted font-medium text-foreground',
                )}
              >
                {segment}
              </button>
            </span>
          )
        })}
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou descrição nesta pasta..."
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
            <SelectItem value="audio">Áudios</SelectItem>
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
      ) : subfolders.length === 0 && filtered.length === 0 ? (
        <EmptyState
          title={currentFolder ? 'Pasta vazia' : 'Nenhum arquivo encontrado'}
          description={
            currentFolder
              ? 'Envie arquivos para esta pasta ou crie uma subpasta.'
              : 'Envie arquivos ou crie uma pasta para organizar a biblioteca.'
          }
          icon={<ImageIcon className="size-7 text-muted-foreground" />}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {subfolders.map((name) => {
            const next = joinFolder(currentFolder, name)
            return (
              <button
                key={next}
                type="button"
                onClick={() => setCurrentFolder(next)}
                className="group overflow-hidden rounded-2xl border border-border/60 bg-card text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="flex aspect-square items-center justify-center bg-amber-50">
                  <Folder className="size-14 text-amber-700/80 transition-transform group-hover:scale-105" />
                </div>
                <div className="space-y-1 p-3">
                  <p className="truncate font-ui text-sm font-medium">{name}</p>
                  <p className="font-ui text-xs text-muted-foreground">Pasta</p>
                </div>
              </button>
            )
          })}

          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPreviewItem(item)}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card text-left transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="size-full object-cover transition-transform group-hover:scale-105"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-2">
                    <ImageIcon className="size-10 text-muted-foreground" />
                    <span className="font-ui text-xs uppercase tracking-wide text-muted-foreground">
                      {item.type}
                    </span>
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

      <Dialog open={folderDialogOpen} onOpenChange={setFolderDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nova pasta</DialogTitle>
            <DialogDescription>
              {currentFolder
                ? `Será criada dentro de “${currentFolder}”.`
                : 'Será criada na raiz da biblioteca.'}
            </DialogDescription>
          </DialogHeader>
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            placeholder="ex.: podcast ou galerias/evento"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                void handleCreateFolder()
              }
            }}
          />
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setFolderDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={!newFolderName.trim() || createFolder.isPending}
              onClick={() => void handleCreateFolder()}
            >
              {createFolder.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : null}
              Criar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(previewItem)} onOpenChange={(open) => !open && setPreviewItem(null)}>
        <DialogContent className="max-w-2xl">
          {previewItem && (
            <>
              <DialogHeader>
                <DialogTitle>{previewItem.name}</DialogTitle>
                <DialogDescription>
                  {previewItem.folder ? `${previewItem.folder} · ` : ''}
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
              ) : previewItem.type === 'audio' ? (
                <audio controls className="w-full" src={previewItem.url}>
                  <track kind="captions" />
                </audio>
              ) : (
                <div className="flex aspect-video items-center justify-center rounded-xl bg-muted">
                  <ImageIcon className="size-12 text-muted-foreground" />
                  <span className="sr-only">Pré-visualização indisponível</span>
                </div>
              )}
              <p className="break-all font-ui text-xs text-muted-foreground">{previewItem.url}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
