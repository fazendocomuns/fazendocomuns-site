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
        <div className="relative flex size-36 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted/60 p-1.5">
          {value ? (
            <>
              <img src={value} alt="" className="max-h-full max-w-full object-contain" />
              <button
                type="button"
                onClick={() => onChange('')}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-neutral-900/70 text-white transition-colors hover:bg-neutral-900"
                aria-label="Remover imagem"
              >
                <X className="size-3.5" />
              </button>
            </>
          ) : (
            <div className="flex size-full flex-col items-center justify-center gap-1 text-muted-foreground">
              <ImageIcon className="size-8 opacity-50" />
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
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Selecionar imagem</DialogTitle>
              </DialogHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por nome ou pasta…"
                  className="pl-9"
                />
              </div>
              {isLoading ? (
                <div className="flex min-h-[240px] items-center justify-center">
                  <Loader2 className="size-8 animate-spin text-primary" aria-label="Carregando" />
                </div>
              ) : images.length === 0 ? (
                <p className="py-10 text-center font-ui text-sm text-muted-foreground">
                  Nenhuma imagem encontrada na biblioteca.
                </p>
              ) : (
                <div className="grid max-h-[min(70vh,520px)] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
                  {images.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onChange(item.url)
                        setOpen(false)
                      }}
                      className={cn(
                        'group overflow-hidden rounded-xl border-2 bg-card text-left transition-all hover:border-primary',
                        value === item.url
                          ? 'border-primary ring-2 ring-primary/20'
                          : 'border-border/50',
                      )}
                    >
                      <div className="flex aspect-[4/3] items-center justify-center bg-muted/50 p-2">
                        <img
                          src={item.url}
                          alt={item.alt}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="space-y-0.5 border-t border-border/40 px-2.5 py-2">
                        <p className="truncate font-ui text-xs font-medium text-foreground">
                          {item.name}
                        </p>
                        {item.folder ? (
                          <p className="truncate font-ui text-[11px] text-muted-foreground">
                            {item.folder}
                          </p>
                        ) : null}
                      </div>
                    </button>
                  ))}
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
      {error && (
        <p className="text-sm text-brand-red" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
