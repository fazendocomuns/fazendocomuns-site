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
import type { MediaItem } from '@/features/admin/types'
import pickerStyles from './ImagePicker.module.css'

interface ImagePickerProps {
  value: string
  onChange: (url: string) => void
  label?: string
  error?: string
  className?: string
}

function selectItem(item: MediaItem, onChange: (url: string) => void, close: () => void) {
  onChange(item.url)
  close()
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
        <div className={pickerStyles.preview}>
          {value ? (
            <>
              <MediaThumbnail url={value} alt="" size={160} />
              <button
                type="button"
                className={pickerStyles.removeBtn}
                onClick={() => onChange('')}
                aria-label="Remover imagem"
              >
                <X width={14} height={14} />
              </button>
            </>
          ) : (
            <div className={pickerStyles.emptyPreview}>
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

              <div className={pickerStyles.searchWrap}>
                <Search className={pickerStyles.searchIcon} aria-hidden />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nome ou pasta…"
                  className="pl-9"
                />
              </div>

              {isLoading ? (
                <div className={pickerStyles.loading}>
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
                <div className={pickerStyles.grid}>
                  {images.map((item) => {
                    const selected = value === item.url
                    return (
                      <div
                        key={item.id}
                        role="button"
                        tabIndex={0}
                        className={cn(pickerStyles.card, selected && pickerStyles.cardSelected)}
                        onClick={() => selectItem(item, onChange, () => setOpen(false))}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            selectItem(item, onChange, () => setOpen(false))
                          }
                        }}
                      >
                        {/* Imagem FORA de <button> — evita estilos de button cortarem a foto */}
                        <div className={pickerStyles.cardMedia}>
                          <MediaThumbnail
                            url={item.url}
                            alt={item.alt || item.name}
                            size={160}
                          />
                        </div>
                        <div className={pickerStyles.cardMeta}>
                          <div className={pickerStyles.cardName} title={item.name}>
                            {item.name}
                          </div>
                          {item.folder ? (
                            <div className={pickerStyles.cardFolder} title={item.folder}>
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
