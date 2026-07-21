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
  useLinkParceiro,
  useLinksParceiros,
  useLinkParceiroMutations,
} from '@/features/admin/api/adminEntities'
import { linkParceiroSchema, type LinkParceiroFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function LinkParceiroFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: links = [] } = useLinksParceiros()
  const { data: existing, isLoading: isLoadingItem } = useLinkParceiro(id)
  const { create, update } = useLinkParceiroMutations()

  const emptyValues = useMemo<LinkParceiroFormValues>(
    () => ({
      title: '',
      subtitle: '',
      highlight: '',
      description: '',
      linksJson: '[\n  { "label": "", "url": "" }\n]',
      displayOrder: links.length + 1,
      status: 'active',
    }),
    [links.length],
  )

  const formValues = useMemo<LinkParceiroFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      title: existing.title,
      subtitle: existing.subtitle,
      highlight: existing.highlight,
      description: existing.description,
      linksJson: JSON.stringify(existing.links, null, 2),
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LinkParceiroFormValues>({
    resolver: zodResolver(linkParceiroSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: LinkParceiroFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Bloco atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Bloco criado com sucesso!')
      }
      router.push('/admin/links-parceiros')
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
    return <AdminPageHeader title="Bloco não encontrado" backHref="/admin/links-parceiros" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar bloco de links' : 'Novo bloco de links'}
        description="Preencha os dados do bloco de links de parceiros."
        backHref="/admin/links-parceiros"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Dados principais do bloco.">
          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
          </FormField>

          <FormField label="Subtítulo" error={errors.subtitle?.message}>
            <Input {...register('subtitle')} aria-invalid={Boolean(errors.subtitle)} />
          </FormField>

          <FormField label="Destaque" error={errors.highlight?.message}>
            <Input {...register('highlight')} aria-invalid={Boolean(errors.highlight)} />
          </FormField>

          <FormField label="Descrição" error={errors.description?.message}>
            <Textarea
              rows={3}
              {...register('description')}
              aria-invalid={Boolean(errors.description)}
            />
          </FormField>

          <FormField label="Links (JSON)" required error={errors.linksJson?.message}>
            <Textarea
              rows={10}
              className="font-mono text-sm"
              placeholder='[{ "label": "Nome", "url": "https://..." }]'
              {...register('linksJson')}
              aria-invalid={Boolean(errors.linksJson)}
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
          onCancel={() => router.push('/admin/links-parceiros')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar bloco"
        />
      </form>
    </div>
  )
}
