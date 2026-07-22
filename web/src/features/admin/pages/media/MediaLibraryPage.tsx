'use client'

import { useMemo, useRef, useState, type DragEvent } from 'react'
import {
  ChevronRight,
  Folder,
  FolderInput,
  FolderPlus,
  Home,
  ImageIcon,
  Loader2,
  Pencil,
  Search,
  Trash2,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  'image/*,video/*,audio/*,application/pdf,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif,.mp4,.webm,.mov,.mp3,.wav,.pdf'

const MEDIA_DRAG_TYPE = 'application/x-fazendo-media-id'

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
  const {
    uploadMany,
    createFolder,
    renameFolder,
    deleteFolder,
    moveFile,
    remove,
  } = useMidiaMutations()
  const showToast = useAdminUiStore((s) => s.showToast)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [currentFolder, setCurrentFolder] = useState('')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<MediaTypeFilter>('all')
  const [previewItem, setPreviewItem] = useState<MediaItem | null>(null)
  const [folderDialogOpen, setFolderDialogOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const [renameTarget, setRenameTarget] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const [moveItem, setMoveItem] = useState<MediaItem | null>(null)
  const [moveFolder, setMoveFolder] = useState('__root__')
  const [draggingUpload, setDraggingUpload] = useState(false)
  const [draggingMediaId, setDraggingMediaId] = useState<string | null>(null)
  const [dropTargetFolder, setDropTargetFolder] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<string | null>(null)

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

  const moveOptions = useMemo(() => {
    const options = [{ value: '__root__', label: 'Raiz (sem pasta)' }]
    for (const folder of folders) {
      options.push({ value: folder, label: folder })
    }
    return options
  }, [folders])

  const busy =
    uploadMany.isPending ||
    createFolder.isPending ||
    renameFolder.isPending ||
    deleteFolder.isPending ||
    moveFile.isPending ||
    remove.isPending

  async function handleUploadFiles(
    fileList: FileList | File[],
    targetFolder = currentFolder,
  ) {
    const files = Array.from(fileList).filter((file) => file.size > 0)
    if (files.length === 0) {
      showToast('Nenhum arquivo válido selecionado.', 'error')
      return
    }

    setUploadProgress(`Enviando 0/${files.length}…`)
    try {
      const { uploaded, errors } = await uploadMany.mutateAsync({
        files,
        folder: targetFolder,
        onProgress: (done, total, fileName) => {
          if (done >= total) {
            setUploadProgress(`Finalizando ${total} arquivo(s)…`)
            return
          }
          setUploadProgress(`Enviando ${done + 1}/${total}: ${fileName}`)
        },
      })
      setUploadProgress(null)

      if (errors.length > 0 && uploaded.length > 0) {
        showToast(
          `${uploaded.length} enviado(s). Falhas: ${errors.slice(0, 2).join(' · ')}`,
          'error',
        )
      } else if (errors.length > 0) {
        showToast(errors.slice(0, 3).join('\n'), 'error')
      } else {
        showToast(
          files.length === 1
            ? 'Arquivo enviado com sucesso!'
            : `${files.length} arquivos enviados com sucesso!`,
        )
      }
    } catch (err) {
      setUploadProgress(null)
      const message = err instanceof Error ? err.message : 'Falha no upload. Tente novamente.'
      showToast(message, 'error')
    }
  }

  async function handleDropMove(mediaId: string, folder: string) {
    const item = mediaLibrary.find((entry) => entry.id === mediaId)
    if (!item) return
    if ((item.folder ?? '') === folder) return

    try {
      await moveFile.mutateAsync({ id: mediaId, folder })
      setPreviewItem(null)
      showToast(folder ? `Arquivo movido para “${folder}”.` : 'Arquivo movido para a raiz.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível mover o arquivo.'
      showToast(message, 'error')
    }
  }

  function getDragMediaId(event: DragEvent): string | null {
    return (
      draggingMediaId ||
      event.dataTransfer.getData(MEDIA_DRAG_TYPE) ||
      event.dataTransfer.getData('text/plain') ||
      null
    )
  }

  function hasOsFiles(event: DragEvent): boolean {
    return !draggingMediaId && Array.from(event.dataTransfer.types).includes('Files')
  }

  function isInternalMediaDrag(_event?: DragEvent): boolean {
    return Boolean(draggingMediaId)
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
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível criar a pasta.'
      showToast(message, 'error')
    }
  }

  async function handleRenameFolder() {
    if (!renameTarget) return
    const nextName = renameValue.trim()
    if (!nextName) {
      showToast('Informe o novo nome da pasta.', 'error')
      return
    }

    try {
      const renamed = await renameFolder.mutateAsync({ from: renameTarget, to: nextName })
      if (currentFolder === renameTarget || currentFolder.startsWith(`${renameTarget}/`)) {
        setCurrentFolder(
          currentFolder === renameTarget
            ? renamed
            : `${renamed}${currentFolder.slice(renameTarget.length)}`,
        )
      }
      setRenameTarget(null)
      setRenameValue('')
      showToast('Pasta renomeada!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível renomear a pasta.'
      showToast(message, 'error')
    }
  }

  async function handleDeleteFolder() {
    if (!deleteTarget) return

    try {
      await deleteFolder.mutateAsync(deleteTarget)
      if (currentFolder === deleteTarget || currentFolder.startsWith(`${deleteTarget}/`)) {
        const parent = deleteTarget.includes('/')
          ? deleteTarget.split('/').slice(0, -1).join('/')
          : ''
        setCurrentFolder(parent)
      }
      setDeleteTarget(null)
      showToast('Pasta excluída!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível excluir a pasta.'
      showToast(message, 'error')
    }
  }

  async function handleMoveFile() {
    if (!moveItem) return
    const folder = moveFolder === '__root__' ? '' : moveFolder

    try {
      await moveFile.mutateAsync({ id: moveItem.id, folder })
      setMoveItem(null)
      setPreviewItem(null)
      showToast(folder ? `Arquivo movido para “${folder}”.` : 'Arquivo movido para a raiz.')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível mover o arquivo.'
      showToast(message, 'error')
    }
  }

  async function handleDeleteFile(item: MediaItem) {
    try {
      await remove.mutateAsync(item.id)
      setPreviewItem(null)
      showToast('Arquivo excluído!')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível excluir o arquivo.'
      showToast(message, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Biblioteca de mídia"
        description="Organize arquivos em pastas. Imagens/vídeos → fotos · áudio → podcast · PDF → livros."
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

      <button
        type="button"
        disabled={!isSupabaseReady() || busy}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={(e) => {
          e.preventDefault()
          if (isInternalMediaDrag(e)) return
          setDraggingUpload(true)
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (isInternalMediaDrag(e)) return
          setDraggingUpload(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setDraggingUpload(false)
        }}
        onDrop={(e) => {
          e.preventDefault()
          setDraggingUpload(false)
          if (isInternalMediaDrag(e)) return
          if (e.dataTransfer.files?.length) {
            void handleUploadFiles(e.dataTransfer.files)
          }
        }}
        className={cn(
          'flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-8 text-center transition-colors',
          draggingUpload
            ? 'border-brand-red bg-brand-red/5'
            : 'border-border/70 bg-muted/30 hover:border-border hover:bg-muted/50',
          (!isSupabaseReady() || busy) && 'pointer-events-none opacity-60',
        )}
      >
        <Upload className="size-6 text-muted-foreground" />
        <p className="font-ui text-sm font-medium">
          {uploadProgress ??
            (currentFolder
              ? `Solte vários arquivos aqui (pasta: ${currentFolder})`
              : 'Solte vários arquivos aqui ou clique para selecionar')}
        </p>
        <p className="font-ui text-xs text-muted-foreground">
          Selecione vários de uma vez (Ctrl/Cmd) · arraste um arquivo da grade para outra pasta
        </p>
      </button>

      <nav
        aria-label="Pasta atual"
        className="flex flex-wrap items-center gap-1 font-ui text-sm text-muted-foreground"
      >
        <button
          type="button"
          onClick={() => setCurrentFolder('')}
          onDragOver={(e) => {
            e.preventDefault()
            if (isInternalMediaDrag(e) || hasOsFiles(e)) {
              setDropTargetFolder('')
            }
          }}
          onDragLeave={() => setDropTargetFolder((prev) => (prev === '' ? null : prev))}
          onDrop={(e) => {
            e.preventDefault()
            setDropTargetFolder(null)
            const mediaId = getDragMediaId(e)
            if (mediaId) {
              void handleDropMove(mediaId, '')
              return
            }
            if (e.dataTransfer.files?.length) {
              void handleUploadFiles(e.dataTransfer.files, '')
            }
          }}
          className={cn(
            'inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground',
            !currentFolder && 'bg-muted font-medium text-foreground',
            dropTargetFolder === '' && 'ring-2 ring-brand-red bg-brand-red/10 text-foreground',
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
                onDragOver={(e) => {
                  e.preventDefault()
                  if (isInternalMediaDrag(e) || hasOsFiles(e)) {
                    setDropTargetFolder(path)
                  }
                }}
                onDragLeave={() =>
                  setDropTargetFolder((prev) => (prev === path ? null : prev))
                }
                onDrop={(e) => {
                  e.preventDefault()
                  setDropTargetFolder(null)
                  const mediaId = getDragMediaId(e)
                  if (mediaId) {
                    void handleDropMove(mediaId, path)
                    return
                  }
                  if (e.dataTransfer.files?.length) {
                    void handleUploadFiles(e.dataTransfer.files, path)
                  }
                }}
                className={cn(
                  'rounded-md px-2 py-1 transition-colors hover:bg-muted hover:text-foreground',
                  isLast && 'bg-muted font-medium text-foreground',
                  dropTargetFolder === path &&
                    'ring-2 ring-brand-red bg-brand-red/10 text-foreground',
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
            const isDropTarget = dropTargetFolder === next
            return (
              <div
                key={next}
                onDragOver={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (isInternalMediaDrag(e) || hasOsFiles(e)) {
                    setDropTargetFolder(next)
                  }
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setDropTargetFolder((prev) => (prev === next ? null : prev))
                  }
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setDropTargetFolder(null)
                  const mediaId = getDragMediaId(e)
                  if (mediaId) {
                    void handleDropMove(mediaId, next)
                    return
                  }
                  if (e.dataTransfer.files?.length) {
                    void handleUploadFiles(e.dataTransfer.files, next)
                  }
                }}
                className={cn(
                  'overflow-hidden rounded-2xl border bg-card shadow-sm transition-colors',
                  isDropTarget
                    ? 'border-brand-red ring-2 ring-brand-red/40'
                    : 'border-border/60',
                )}
              >
                <button
                  type="button"
                  onClick={() => setCurrentFolder(next)}
                  className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <div
                    className={cn(
                      'flex aspect-[4/3] items-center justify-center',
                      isDropTarget ? 'bg-brand-red/10' : 'bg-amber-50',
                    )}
                  >
                    <Folder
                      className={cn(
                        'size-14',
                        isDropTarget ? 'text-brand-red' : 'text-amber-700/80',
                      )}
                    />
                  </div>
                  <div className="space-y-1 border-b border-border/50 px-3 py-2.5">
                    <p className="truncate font-ui text-sm font-medium">{name}</p>
                    <p className="font-ui text-xs text-muted-foreground">
                      {isDropTarget ? 'Solte para mover/enviar' : 'Pasta'}
                    </p>
                  </div>
                </button>

                <div className="flex gap-2 p-2.5">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="h-9 flex-1 justify-center gap-1.5"
                    disabled={!isSupabaseReady() || busy}
                    onClick={() => {
                      setRenameTarget(next)
                      setRenameValue(name)
                    }}
                  >
                    <Pencil className="size-3.5" />
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-9 flex-1 justify-center gap-1.5 border-destructive/35 text-destructive hover:bg-destructive/10"
                    disabled={!isSupabaseReady() || busy}
                    onClick={() => setDeleteTarget(next)}
                  >
                    <Trash2 className="size-3.5" />
                    Excluir
                  </Button>
                </div>
              </div>
            )
          })}

          {filtered.map((item) => (
            <button
              key={item.id}
              type="button"
              draggable={isSupabaseReady() && !busy}
              onDragStart={(e) => {
                setDraggingMediaId(item.id)
                e.dataTransfer.setData(MEDIA_DRAG_TYPE, item.id)
                e.dataTransfer.setData('text/plain', item.id)
                e.dataTransfer.effectAllowed = 'move'
              }}
              onDragEnd={() => {
                setDraggingMediaId(null)
                setDropTargetFolder(null)
              }}
              onClick={() => setPreviewItem(item)}
              className="group cursor-grab overflow-hidden rounded-2xl border border-border/60 bg-card text-left transition-shadow hover:shadow-md active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-muted/50 p-2">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.alt}
                    draggable={false}
                    className="max-h-full max-w-full object-contain"
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

      <Dialog
        open={Boolean(renameTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setRenameTarget(null)
            setRenameValue('')
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar pasta</DialogTitle>
            <DialogDescription>
              Arquivos e subpastas serão movidos junto com o novo nome.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            placeholder="Novo nome"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                void handleRenameFolder()
              }
            }}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setRenameTarget(null)
                setRenameValue('')
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={!renameValue.trim() || renameFolder.isPending}
              onClick={() => void handleRenameFolder()}
            >
              {renameFolder.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : null}
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Excluir pasta</DialogTitle>
            <DialogDescription>
              Isso remove a pasta “{deleteTarget}”, todas as subpastas e os arquivos dentro dela.
              Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancelar
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-destructive/40 text-destructive hover:bg-destructive/10"
              disabled={deleteFolder.isPending}
              onClick={() => void handleDeleteFolder()}
            >
              {deleteFolder.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : null}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(moveItem)}
        onOpenChange={(open) => {
          if (!open) setMoveItem(null)
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mover arquivo</DialogTitle>
            <DialogDescription>
              Escolha a pasta de destino para “{moveItem?.name}”.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="move-folder">Pasta de destino</Label>
            <Select value={moveFolder} onValueChange={setMoveFolder}>
              <SelectTrigger id="move-folder">
                <SelectValue placeholder="Selecione a pasta" />
              </SelectTrigger>
              <SelectContent>
                {moveOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setMoveItem(null)}>
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={moveFile.isPending}
              onClick={() => void handleMoveFile()}
            >
              {moveFile.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <FolderInput className="size-4" />
              )}
              Mover
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
                  {previewItem.folder ? `${previewItem.folder} · ` : 'Raiz · '}
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
              <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setPreviewItem(null)}>
                  Fechar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!isSupabaseReady() || busy}
                  onClick={() => {
                    setMoveFolder(previewItem.folder ? previewItem.folder : '__root__')
                    setMoveItem(previewItem)
                  }}
                >
                  <FolderInput className="size-4" />
                  Mover para pasta
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-destructive/40 text-destructive hover:bg-destructive/10"
                  disabled={!isSupabaseReady() || remove.isPending}
                  onClick={() => void handleDeleteFile(previewItem)}
                >
                  {remove.isPending ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Trash2 className="size-4" />
                  )}
                  Excluir arquivo
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
