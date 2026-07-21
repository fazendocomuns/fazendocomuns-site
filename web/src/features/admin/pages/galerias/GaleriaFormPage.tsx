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
import { useGaleria, useGalerias, useGaleriaMutations } from '@/features/admin/api/adminEntities'
import { galeriaSchema, type GaleriaFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function GaleriaFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: galerias = [] } = useGalerias()
  const { data: existing, isLoading: isLoadingItem } = useGaleria(id)
  const { create, update } = useGaleriaMutations()

  const emptyValues = useMemo<GaleriaFormValues>(
    () => ({
      title: '',
      color: 'amber',
      cover: '',
      imageUrls: '',
      displayOrder: galerias.length + 1,
      status: 'active',
    }),
    [galerias.length],
  )

  const formValues = useMemo<GaleriaFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      title: existing.title,
      color: existing.color,
      cover: existing.cover,
      imageUrls: existing.imageUrls.join('\n'),
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GaleriaFormValues>({
    resolver: zodResolver(galeriaSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: GaleriaFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Galeria atualizada com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Galeria criada com sucesso!')
      }
      router.push('/admin/galerias')
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
    return <AdminPageHeader title="Galeria não encontrada" backHref="/admin/galerias" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar galeria' : 'Nova galeria'}
        description="Preencha os dados da galeria de fotos."
        backHref="/admin/galerias"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Dados principais da galeria.">
          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
          </FormField>

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

          <Controller
            name="cover"
            control={control}
            render={({ field }) => (
              <ImagePicker
                value={field.value}
                onChange={field.onChange}
                label="Capa"
                error={errors.cover?.message}
              />
            )}
          />

          <FormField label="URLs das fotos" required error={errors.imageUrls?.message}>
            <Textarea
              rows={8}
              placeholder="Uma URL por linha"
              {...register('imageUrls')}
              aria-invalid={Boolean(errors.imageUrls)}
            />
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
          onCancel={() => router.push('/admin/galerias')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar galeria"
        />
      </form>
    </div>
  )
}
