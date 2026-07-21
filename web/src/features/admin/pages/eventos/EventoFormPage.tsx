'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useRouteId } from '@/features/admin/hooks/useRouteId'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import { RichTextEditor } from '@/features/admin/components/RichTextEditor'
import { useEvento, useEventos, useEventoMutations } from '@/features/admin/api/content'
import { eventoSchema, type EventoFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function EventoFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: eventos = [] } = useEventos()
  const { data: existing, isLoading: isLoadingItem } = useEvento(id)
  const { create, update } = useEventoMutations()

  const emptyValues = useMemo<EventoFormValues>(
    () => ({
      name: '',
      shortDescription: '',
      fullDescription: '',
      image: '',
      date: new Date().toISOString().slice(0, 10),
      time: '10:00',
      location: '',
      link: '',
      featured: false,
      displayOrder: eventos.length + 1,
      status: 'active',
    }),
    [eventos.length],
  )

  const formValues = useMemo<EventoFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      name: existing.name,
      shortDescription: existing.shortDescription,
      fullDescription: existing.fullDescription,
      image: existing.image,
      date: existing.date,
      time: existing.time,
      location: existing.location,
      link: existing.link,
      featured: existing.featured,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventoFormValues>({
    resolver: zodResolver(eventoSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: EventoFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Evento atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Evento criado com sucesso!')
      }
      router.push('/admin/eventos')
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
    return <AdminPageHeader title="Evento não encontrado" backHref="/admin/eventos" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar evento' : 'Novo evento'}
        description="Preencha os dados do evento para exibição no site."
        backHref="/admin/eventos"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Dados principais exibidos no site.">
          <FormField label="Nome" required error={errors.name?.message}>
            <Input {...register('name')} aria-invalid={Boolean(errors.name)} />
          </FormField>

          <FormField label="Descrição curta" required error={errors.shortDescription?.message}>
            <Textarea
              rows={3}
              {...register('shortDescription')}
              aria-invalid={Boolean(errors.shortDescription)}
            />
          </FormField>

          <Controller
            name="fullDescription"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                label="Descrição completa"
                error={errors.fullDescription?.message}
              />
            )}
          />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <ImagePicker
                value={field.value}
                onChange={field.onChange}
                label="Imagem"
                error={errors.image?.message}
              />
            )}
          />
        </FormSection>

        <FormSection title="Data e local" description="Quando e onde o evento acontece.">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Data" required error={errors.date?.message}>
              <Input type="date" {...register('date')} aria-invalid={Boolean(errors.date)} />
            </FormField>
            <FormField label="Hora" required error={errors.time?.message}>
              <Input type="time" {...register('time')} aria-invalid={Boolean(errors.time)} />
            </FormField>
          </div>

          <FormField label="Local" required error={errors.location?.message}>
            <Input {...register('location')} aria-invalid={Boolean(errors.location)} />
          </FormField>

          <FormField label="Link" required error={errors.link?.message}>
            <Input placeholder="/eventos/..." {...register('link')} aria-invalid={Boolean(errors.link)} />
          </FormField>
        </FormSection>

        <FormSection title="Exibição">
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2">
                <Checkbox
                  id="featured"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked === true)}
                />
                <Label htmlFor="featured" className="cursor-pointer font-ui text-sm">
                  Exibir em destaque
                </Label>
              </div>
            )}
          />

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
          onCancel={() => router.push('/admin/eventos')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar evento"
        />
      </form>
    </div>
  )
}
