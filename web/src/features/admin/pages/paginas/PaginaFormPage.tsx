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
import { usePagina, usePaginaMutations } from '@/features/admin/api/adminEntities'
import { paginaSchema, type PaginaFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function PaginaFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: existing, isLoading: isLoadingItem } = usePagina(id)
  const { create, update } = usePaginaMutations()

  const emptyValues = useMemo<PaginaFormValues>(
    () => ({
      slug: '',
      title: '',
      pageType: '',
      contentJson: '{}',
      status: 'active',
    }),
    [],
  )

  const formValues = useMemo<PaginaFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      slug: existing.slug,
      title: existing.title,
      pageType: existing.pageType,
      contentJson: existing.contentJson,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PaginaFormValues>({
    resolver: zodResolver(paginaSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: PaginaFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Página atualizada com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Página criada com sucesso!')
      }
      router.push('/admin/paginas')
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
    return <AdminPageHeader title="Página não encontrada" backHref="/admin/paginas" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar página' : 'Nova página'}
        description="Preencha os dados da página de conteúdo."
        backHref="/admin/paginas"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Identificação da página.">
          <FormField label="Slug" required error={errors.slug?.message}>
            <Input
              {...register('slug')}
              readOnly={isEditing}
              aria-invalid={Boolean(errors.slug)}
              className={isEditing ? 'cursor-not-allowed bg-muted' : undefined}
            />
          </FormField>

          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
          </FormField>

          <FormField label="Tipo da página" required error={errors.pageType?.message}>
            <Input {...register('pageType')} aria-invalid={Boolean(errors.pageType)} />
          </FormField>
        </FormSection>

        <FormSection title="Conteúdo" description="JSON com o conteúdo da página.">
          <FormField label="Conteúdo (JSON)" required error={errors.contentJson?.message}>
            <Textarea
              rows={16}
              className="font-mono text-sm"
              {...register('contentJson')}
              aria-invalid={Boolean(errors.contentJson)}
            />
          </FormField>
        </FormSection>

        <FormSection title="Exibição">
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
          onCancel={() => router.push('/admin/paginas')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar página"
        />
      </form>
    </div>
  )
}
