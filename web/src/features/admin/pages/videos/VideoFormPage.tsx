'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useRouteId } from '@/features/admin/hooks/useRouteId'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AdminFormActions } from '@/features/admin/components/AdminFormActions'
import { AdminPageHeader } from '@/features/admin/components/AdminPageHeader'
import { FormField, FormSection } from '@/features/admin/components/FormSection'
import { ImagePicker } from '@/features/admin/components/ImagePicker'
import { useVideo, useVideos, useVideoMutations } from '@/features/admin/api/adminEntities'
import { videoSchema, type VideoFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function VideoFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: videos = [] } = useVideos()
  const { data: existing, isLoading: isLoadingItem } = useVideo(id)
  const { create, update } = useVideoMutations()

  const emptyValues = useMemo<VideoFormValues>(
    () => ({
      title: '',
      description: '',
      videoUrl: '',
      thumbnail: '',
      thumbnailAlt: '',
      color: 'amber',
      displayOrder: videos.length + 1,
      status: 'active',
    }),
    [videos.length],
  )

  const formValues = useMemo<VideoFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      title: existing.title,
      description: existing.description,
      videoUrl: existing.videoUrl,
      thumbnail: existing.thumbnail,
      thumbnailAlt: existing.thumbnailAlt,
      color: existing.color,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<VideoFormValues>({
    resolver: zodResolver(videoSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: VideoFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Vídeo atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Vídeo criado com sucesso!')
      }
      router.push('/admin/videos')
    } catch {
      showToast('Não foi possível salvar. Tente novamente.', 'error')
    }
  }

  if (isEditing && isLoadingItem) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" aria-label="Carregando" />
      </div>
    )
  }

  if (isEditing && !existing) {
    return <AdminPageHeader title="Vídeo não encontrado" backHref="/admin/videos" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar vídeo' : 'Novo vídeo'}
        description="Preencha os dados do vídeo para exibição no site."
        backHref="/admin/videos"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Dados principais do vídeo.">
          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
          </FormField>

          <FormField label="Descrição" error={errors.description?.message}>
            <Textarea
              rows={3}
              {...register('description')}
              aria-invalid={Boolean(errors.description)}
            />
          </FormField>

          <FormField label="URL do vídeo" required error={errors.videoUrl?.message}>
            <Input
              placeholder="https://..."
              {...register('videoUrl')}
              aria-invalid={Boolean(errors.videoUrl)}
            />
          </FormField>

          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <ImagePicker
                value={field.value}
                onChange={field.onChange}
                label="Miniatura"
                error={errors.thumbnail?.message}
              />
            )}
          />

          <FormField label="Texto alternativo da miniatura" error={errors.thumbnailAlt?.message}>
            <Input {...register('thumbnailAlt')} aria-invalid={Boolean(errors.thumbnailAlt)} />
          </FormField>
        </FormSection>

        <FormSection title="Exibição">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Cor" error={errors.color?.message}>
              <Controller
                name="color"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amber">Âmbar</SelectItem>
                      <SelectItem value="red">Vermelho</SelectItem>
                      <SelectItem value="orange">Laranja</SelectItem>
                      <SelectItem value="yellow">Amarelo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </FormField>
            <FormField label="Ordem de exibição" error={errors.displayOrder?.message}>
              <Input type="number" min={1} {...register('displayOrder', { valueAsNumber: true })} />
            </FormField>
          </div>

          <FormField label="Status" error={errors.status?.message}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </FormSection>

        <AdminFormActions
          onCancel={() => router.push('/admin/videos')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar vídeo"
        />
      </form>
    </div>
  )
}
