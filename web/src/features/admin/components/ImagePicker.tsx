'use client'

import { useMemo, useRef, useState } from 'react'
import {
  ChevronRight,
  Folder,
  Home,
  ImageIcon,
  Loader2,
  Search,
  Upload,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { isSupabaseReady } from '@/lib/supabase/client'
import {
  useMidiaFolders,
  useMidiaLibrary,
  useMidiaMutations,
} from '@/features/admin/api/midia'
import { useAdminStore } from '@/features/admin/store/adminStore'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'
import { MediaThumbnail } from '@/features/admin/components/MediaThumbnail'
import {
  childFolderNames,
  looksGenericFileName,
  normalizeFolder,
} from '@/integrations/supabase/repositories/midiaRepository'
import { cn } from '@/lib/utils'
import type { MediaItem } from '@/features/admin/types'

interface ImagePickerProps {
  value: string
  onChange: (url: string) => void
  label?: string
  error?: string
  className?: string
}

function joinFolder(parent: string, child: string): string {
  const next = normalizeFolder(child)
  if (!next) return parent
  return parent ? `${parent}/${next}` : next
}

/**
 * Seletor de foto usado em:
 * /admin/pesquisadores, /admin/assistentes, /admin/consultores, /admin/colaboradores
 */
export function ImagePicker({
  value,
  onChange,
  label = 'Imagem',
  error,
  className,
}: ImagePickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [currentFolder, setCurrentFolder] = useState('')
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingName, setPendingName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const mockLibrary = useAdminStore((s) => s.mediaLibrary)
  const { data: remoteLibrary = [], isLoading } = useMidiaLibrary()
  const { data: folders = [] } = useMidiaFolders()
  const { upload } = useMidiaMutations()
  const showToast = useAdminUiStore((s) => s.showToast)

  const mediaLibrary = isSupabaseConfigured() ? remoteLibrary : mockLibrary

  const breadcrumb = useMemo(
    () => (currentFolder ? currentFolder.split('/') : []),
    [currentFolder],
  )

  const subfolders = useMemo(
    () => childFolderNames(folders, currentFolder),
    [folders, currentFolder],
  )

  const images = useMemo(() => {
    let list = mediaLibrary.filter((m) => m.type === 'image')
    const query = search.trim().toLowerCase()

    if (query) {
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.alt.toLowerCase().includes(query) ||
          (item.folder ?? '').toLowerCase().includes(query),
      )
    } else {
      list = list.filter((item) => (item.folder ?? '') === currentFolder)
    }

    return list
  }, [mediaLibrary, search, currentFolder])

  function choose(item: MediaItem) {
    onChange(item.url)
    setOpen(false)
  }

  function requestUpload(file: File) {
    setPendingFile(file)
    setPendingName(looksGenericFileName(file.name) ? '' : file.name)
  }

  async function confirmUpload() {
    if (!pendingFile) return
    if (!isSupabaseReady()) {
      showToast('Upload disponível apenas com Supabase ativo.', 'error')
      return
    }
    const displayName = pendingName.trim()
    if (!displayName) {
      showToast('Informe um nome para o arquivo.', 'error')
      return
    }

    try {
      const item = await upload.mutateAsync({
        file: pendingFile,
        folder: currentFolder,
        displayName,
      })
      onChange(item.url)
      setPendingFile(null)
      setPendingName('')
      setOpen(false)
      showToast('Imagem enviada com sucesso!')
    } catch {
      showToast('Falha no upload. Tente novamente.', 'error')
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label>{label}</Label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-start' }}>
        <div
          style={{
            position: 'relative',
            width: 160,
            height: 160,
            borderRadius: 12,
            border: '1px solid #e8e0d4',
            overflow: 'hidden',
            background: '#efe8de',
          }}
        >
          {value ? (
            <>
              <MediaThumbnail url={value} alt="" fill fit="cover" />
              <button
                type="button"
                onClick={() => onChange('')}
                aria-label="Remover imagem"
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  zIndex: 2,
                  width: 28,
                  height: 28,
                  border: 0,
                  borderRadius: 999,
                  background: 'rgba(26,22,18,0.8)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <X width={14} height={14} />
              </button>
            </>
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                color: '#7a6b58',
              }}
            >
              <ImageIcon width={28} height={28} opacity={0.5} />
              <span className="font-ui text-xs">Sem imagem</span>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Dialog
            open={open}
            onOpenChange={(next) => {
              setOpen(next)
              if (!next) {
                setSearch('')
                setCurrentFolder('')
              }
            }}
          >
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                Selecionar da biblioteca
              </Button>
            </DialogTrigger>

            <DialogContent
              className="sm:max-w-3xl"
              style={{ display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '90vh' }}
            >
              <DialogHeader>
                <DialogTitle>Selecionar imagem</DialogTitle>
                <DialogDescription>
                  Navegue pelas pastas ou busque pelo nome do arquivo.
                </DialogDescription>
              </DialogHeader>

              <div style={{ position: 'relative' }}>
                <Search
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 12,
                    top: '50%',
                    width: 16,
                    height: 16,
                    transform: 'translateY(-50%)',
                    color: '#7a6b58',
                    pointerEvents: 'none',
                  }}
                />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nome ou pasta…"
                  className="pl-9"
                />
              </div>

              {!search.trim() ? (
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
              ) : (
                <p className="font-ui text-xs text-muted-foreground">
                  Buscando em todas as pastas…
                </p>
              )}

              {isLoading ? (
                <div style={{ minHeight: 280, display: 'grid', placeItems: 'center' }}>
                  <Loader2
                    className="animate-spin text-primary"
                    style={{ width: 32, height: 32 }}
                    aria-label="Carregando"
                  />
                </div>
              ) : !search.trim() && subfolders.length === 0 && images.length === 0 ? (
                <p className="py-10 text-center font-ui text-sm text-muted-foreground">
                  Pasta vazia. Envie uma imagem ou escolha outra pasta.
                </p>
              ) : images.length === 0 && search.trim() ? (
                <p className="py-10 text-center font-ui text-sm text-muted-foreground">
                  Nenhuma imagem encontrada.
                </p>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
                    gap: 12,
                    overflowY: 'auto',
                    maxHeight: 'min(58vh, 460px)',
                    paddingBottom: 8,
                  }}
                >
                  {!search.trim() &&
                    subfolders.map((name) => {
                      const next = joinFolder(currentFolder, name)
                      return (
                        <div
                          key={next}
                          role="button"
                          tabIndex={0}
                          onClick={() => setCurrentFolder(next)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              setCurrentFolder(next)
                            }
                          }}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: 0,
                            padding: 0,
                            cursor: 'pointer',
                            background: '#fff',
                            border: '2px solid #e8e0d4',
                            borderRadius: 12,
                            overflow: 'hidden',
                            outline: 'none',
                          }}
                        >
                          <div
                            style={{
                              width: '100%',
                              aspectRatio: '1 / 1',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#fff8eb',
                            }}
                          >
                            <Folder className="size-12 text-amber-700/80" />
                          </div>
                          <div style={{ padding: '8px 10px 10px' }}>
                            <div
                              style={{
                                fontFamily: 'var(--font-ui), system-ui, sans-serif',
                                fontSize: 12,
                                fontWeight: 600,
                                color: '#1a1612',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                              title={name}
                            >
                              {name}
                            </div>
                            <div
                              style={{
                                marginTop: 2,
                                fontFamily: 'var(--font-ui), system-ui, sans-serif',
                                fontSize: 11,
                                color: '#7a6b58',
                              }}
                            >
                              Pasta
                            </div>
                          </div>
                        </div>
                      )
                    })}

                  {images.map((item) => {
                    const selected = value === item.url
                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => choose(item)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            choose(item)
                          }
                        }}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          margin: 0,
                          padding: 0,
                          cursor: 'pointer',
                          background: '#fff',
                          border: selected ? '2px solid #ef3220' : '2px solid #e8e0d4',
                          borderRadius: 12,
                          overflow: 'hidden',
                          boxShadow: selected ? '0 0 0 3px rgba(239,50,32,0.18)' : 'none',
                          outline: 'none',
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '1 / 1',
                            overflow: 'hidden',
                            background: '#efe8de',
                          }}
                        >
                          <MediaThumbnail
                            url={item.url}
                            alt={item.alt || item.name}
                            fill
                            fit="cover"
                          />
                        </div>
                        <div style={{ padding: '8px 10px 10px' }}>
                          <div
                            style={{
                              fontFamily: 'var(--font-ui), system-ui, sans-serif',
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#1a1612',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                            title={item.name}
                          >
                            {item.name}
                          </div>
                          {(search.trim() ? item.folder : null) ? (
                            <div
                              style={{
                                marginTop: 2,
                                fontFamily: 'var(--font-ui), system-ui, sans-serif',
                                fontSize: 11,
                                color: '#7a6b58',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                              title={item.folder}
                            >
                              {item.folder}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {isSupabaseReady() ? (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif,image/heic"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) requestUpload(file)
                  event.target.value = ''
                }}
              />
              <Button
                type="button"
                variant="secondary"
                size="sm"
                disabled={upload.isPending}
                onClick={() => fileInputRef.current?.click()}
              >
                {upload.isPending ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Upload className="size-4" aria-hidden="true" />
                )}
                Enviar imagem
              </Button>
            </>
          ) : (
            <p className="font-ui text-xs text-muted-foreground">
              Ative o Supabase para upload real ou selecione da biblioteca mock.
            </p>
          )}
        </div>
      </div>

      <Dialog
        open={Boolean(pendingFile)}
        onOpenChange={(next) => {
          if (!next) {
            setPendingFile(null)
            setPendingName('')
          }
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Nome do arquivo</DialogTitle>
            <DialogDescription>
              Escolha um nome fácil de buscar (ex.: nome da pessoa).
              {pendingFile && looksGenericFileName(pendingFile.name)
                ? ' O arquivo veio com um ID genérico.'
                : ''}
            </DialogDescription>
          </DialogHeader>
          <Input
            value={pendingName}
            onChange={(e) => setPendingName(e.target.value)}
            placeholder="ex.: Maria Silva.jpg"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                void confirmUpload()
              }
            }}
          />
          {pendingFile ? (
            <p className="truncate font-ui text-xs text-muted-foreground">
              Original: {pendingFile.name}
            </p>
          ) : null}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setPendingFile(null)
                setPendingName('')
              }}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              disabled={!pendingName.trim() || upload.isPending}
              onClick={() => void confirmUpload()}
            >
              {upload.isPending ? (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              ) : null}
              Enviar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {error ? (
        <p className="text-sm text-brand-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
