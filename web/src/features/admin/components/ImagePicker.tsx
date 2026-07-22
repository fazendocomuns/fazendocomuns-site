'use client'

import { useMemo, useRef, useState } from 'react'
import { ImageIcon, Loader2, Search, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { isSupabaseConfigured } from '@/lib/supabase/env'
import { isSupabaseReady } from '@/lib/supabase/client'
import { useMidiaLibrary, useMidiaMutations } from '@/features/admin/api/midia'
import { useAdminStore } from '@/features/admin/store/adminStore'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'
import { MediaThumbnail } from '@/features/admin/components/MediaThumbnail'
import { cn } from '@/lib/utils'

interface ImagePickerProps {
  value: string
  onChange: (url: string) => void
  label?: string
  error?: string
  className?: string
}

export function ImagePicker({
  value,
  onChange,
  label = 'Imagem',
  error,
  className,
}: ImagePickerProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mockLibrary = useAdminStore((s) => s.mediaLibrary)
  const { data: remoteLibrary = [], isLoading } = useMidiaLibrary()
  const { upload } = useMidiaMutations()
  const showToast = useAdminUiStore((s) => s.showToast)

  const mediaLibrary = isSupabaseConfigured() ? remoteLibrary : mockLibrary
  const images = useMemo(() => {
    const list = mediaLibrary.filter((m) => m.type === 'image')
    const query = search.trim().toLowerCase()
    if (!query) return list
    return list.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.alt.toLowerCase().includes(query) ||
        (item.folder ?? '').toLowerCase().includes(query),
    )
  }, [mediaLibrary, search])

  async function handleUpload(file: File) {
    if (!isSupabaseReady()) {
      showToast('Upload disponível apenas com Supabase ativo.', 'error')
      return
    }

    try {
      const item = await upload.mutateAsync(file)
      onChange(item.url)
      setOpen(false)
      showToast('Imagem enviada com sucesso!')
    } catch {
      showToast('Falha no upload. Tente novamente.', 'error')
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      <Label>{label}</Label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div
          style={{
            position: 'relative',
            width: 160,
            height: 160,
            borderRadius: 12,
            border: '1px solid #e8e0d4',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {value ? (
            <>
              <MediaThumbnail url={value} alt="" size={160} />
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
                  border: 'none',
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
                width: 160,
                height: 160,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                background: '#efe8de',
                color: '#7a6b58',
              }}
            >
              <ImageIcon width={28} height={28} opacity={0.5} />
              <span className="font-ui text-xs">Sem imagem</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Dialog
            open={open}
            onOpenChange={(next) => {
              setOpen(next)
              if (!next) setSearch('')
            }}
          >
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                Selecionar da biblioteca
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-hidden sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>Selecionar imagem</DialogTitle>
              </DialogHeader>

              <div style={{ position: 'relative' }}>
                <Search
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

              {isLoading ? (
                <div style={{ minHeight: 320, display: 'grid', placeItems: 'center' }}>
                  <Loader2
                    className="animate-spin text-primary"
                    style={{ width: 32, height: 32 }}
                    aria-label="Carregando"
                  />
                </div>
              ) : images.length === 0 ? (
                <p className="py-12 text-center font-ui text-sm text-muted-foreground">
                  Nenhuma imagem encontrada na biblioteca.
                </p>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 168px)',
                    justifyContent: 'center',
                    gap: 16,
                    maxHeight: 'min(60vh, 480px)',
                    overflowY: 'auto',
                    padding: '4px 2px 12px',
                  }}
                >
                  {images.map((item) => {
                    const selected = value === item.url
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          onChange(item.url)
                          setOpen(false)
                        }}
                        style={{
                          width: 168,
                          padding: 0,
                          margin: 0,
                          border: selected ? '2px solid #ef3220' : '2px solid #e8e0d4',
                          borderRadius: 12,
                          background: '#fff',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          textAlign: 'left',
                          boxShadow: selected ? '0 0 0 3px rgba(239,50,32,0.18)' : 'none',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        <MediaThumbnail
                          url={item.url}
                          alt={item.alt || item.name}
                          size={164}
                        />
                        <div
                          style={{
                            borderTop: '1px solid #e8e0d4',
                            padding: '8px 10px',
                            background: '#fff',
                          }}
                        >
                          <div
                            className="font-ui"
                            style={{
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
                          {item.folder ? (
                            <div
                              className="font-ui"
                              style={{
                                marginTop: 2,
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
                      </button>
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
                  if (file) void handleUpload(file)
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

      {error ? (
        <p className="text-sm text-brand-red" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
