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
import {
  usePodcastEpisodio,
  usePodcastEpisodios,
  usePodcastMutations,
} from '@/features/admin/api/adminEntities'
import { podcastEpisodioSchema, type PodcastEpisodioFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function PodcastFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: episodios = [] } = usePodcastEpisodios()
  const { data: existing, isLoading: isLoadingItem } = usePodcastEpisodio(id)
  const { create, update } = usePodcastMutations()

  const emptyValues = useMemo<PodcastEpisodioFormValues>(
    () => ({
      title: '',
      description: '',
      audioUrl: '',
      duration: '',
      displayOrder: episodios.length + 1,
      status: 'active',
    }),
    [episodios.length],
  )

  const formValues = useMemo<PodcastEpisodioFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      title: existing.title,
      description: existing.description,
      audioUrl: existing.audioUrl,
      duration: existing.duration,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PodcastEpisodioFormValues>({
    resolver: zodResolver(podcastEpisodioSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: PodcastEpisodioFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Episódio atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Episódio criado com sucesso!')
      }
      router.push('/admin/podcast')
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
    return <AdminPageHeader title="Episódio não encontrado" backHref="/admin/podcast" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar episódio' : 'Novo episódio'}
        description="Preencha os dados do episódio do podcast."
        backHref="/admin/podcast"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Dados principais do episódio.">
          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
          </FormField>

          <FormField label="Descrição" error={errors.description?.message}>
            <Textarea
              rows={4}
              {...register('description')}
              aria-invalid={Boolean(errors.description)}
            />
          </FormField>

          <FormField label="URL do áudio" required error={errors.audioUrl?.message}>
            <Input
              placeholder="https://..."
              {...register('audioUrl')}
              aria-invalid={Boolean(errors.audioUrl)}
            />
          </FormField>

          <FormField label="Duração" error={errors.duration?.message}>
            <Input placeholder="Ex: 45:30" {...register('duration')} aria-invalid={Boolean(errors.duration)} />
          </FormField>
        </FormSection>

        <FormSection title="Exibição">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Ordem de exibição" error={errors.displayOrder?.message}>
              <Input type="number" min={1} {...register('displayOrder', { valueAsNumber: true })} />
            </FormField>
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
          </div>
        </FormSection>

        <AdminFormActions
          onCancel={() => router.push('/admin/podcast')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar episódio"
        />
      </form>
    </div>
  )
}
