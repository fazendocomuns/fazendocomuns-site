'use client'

import { useRef, useState } from 'react'
import { ImageIcon, Loader2, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mockLibrary = useAdminStore((s) => s.mediaLibrary)
  const { data: remoteLibrary = [], isLoading } = useMidiaLibrary()
  const { upload } = useMidiaMutations()
  const showToast = useAdminUiStore((s) => s.showToast)

  const mediaLibrary = isSupabaseConfigured() ? remoteLibrary : mockLibrary
  const images = mediaLibrary.filter((m) => m.type === 'image')

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
        <div className="relative size-32 shrink-0 overflow-hidden rounded-xl border border-border/60 bg-muted">
          {value ? (
            <>
              <img src={value} alt="" className="size-full object-cover" />
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                Selecionar da biblioteca
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Selecionar imagem</DialogTitle>
              </DialogHeader>
              {isLoading ? (
                <div className="flex min-h-[200px] items-center justify-center">
                  <Loader2 className="size-8 animate-spin text-primary" aria-label="Carregando" />
                </div>
              ) : (
                <div className="grid max-h-[400px] grid-cols-2 gap-3 overflow-y-auto sm:grid-cols-3">
                  {images.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onChange(item.url)
                        setOpen(false)
                      }}
                      className={cn(
                        'group overflow-hidden rounded-xl border-2 transition-all hover:border-primary',
                        value === item.url ? 'border-primary ring-2 ring-primary/20' : 'border-transparent',
                      )}
                    >
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                      />
                      <p className="truncate px-2 py-1.5 text-left font-ui text-xs text-muted-foreground">
                        {item.name}
                      </p>
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
                accept="image/jpeg,image/png,image/webp"
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
