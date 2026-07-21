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
import {
  colaboradorSchema,
  type ColaboradorFormValues,
} from '@/features/admin/schemas'
import {
  useColaborador,
  useColaboradores,
  useColaboradorMutations,
} from '@/features/admin/api/equipe'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function ColaboradorFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: colaboradores = [] } = useColaboradores()
  const { data: existing, isLoading: isLoadingItem } = useColaborador(id)
  const { create, update } = useColaboradorMutations()

  const emptyValues = useMemo<ColaboradorFormValues>(
    () => ({
      name: '',
      photo: '',
      institution: '',
      role: '',
      description: '',
      website: '',
      displayOrder: colaboradores.length + 1,
      status: 'active',
    }),
    [colaboradores.length],
  )

  const formValues = useMemo<ColaboradorFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      name: existing.name,
      photo: existing.photo,
      institution: existing.institution,
      role: existing.role,
      description: existing.description,
      website: existing.website,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ColaboradorFormValues>({
    resolver: zodResolver(colaboradorSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: ColaboradorFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Colaborador(a) atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Colaborador(a) criado com sucesso!')
      }
      router.push('/admin/colaboradores')
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
    return (
      <AdminPageHeader
        title="Colaborador(a) não encontrado"
        backHref="/admin/colaboradores"
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar colaborador(a)' : 'Novo colaborador(a)'}
        description="Preencha os dados para exibição na página de colaboradores."
        backHref="/admin/colaboradores"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Dados principais exibidos no site.">
          <FormField label="Nome" required error={errors.name?.message}>
            <Input {...register('name')} aria-invalid={Boolean(errors.name)} />
          </FormField>

          <Controller
            name="photo"
            control={control}
            render={({ field }) => (
              <ImagePicker
                value={field.value}
                onChange={field.onChange}
                label="Foto"
                error={errors.photo?.message}
              />
            )}
          />

          <FormField label="Instituição" required error={errors.institution?.message}>
            <Input {...register('institution')} aria-invalid={Boolean(errors.institution)} />
          </FormField>

          <FormField label="Cargo" required error={errors.role?.message}>
            <Input {...register('role')} aria-invalid={Boolean(errors.role)} />
          </FormField>

          <FormField label="Descrição" required error={errors.description?.message}>
            <Textarea rows={5} {...register('description')} aria-invalid={Boolean(errors.description)} />
          </FormField>

          <FormField label="Website" error={errors.website?.message} hint="Opcional">
            <Input placeholder="https://..." {...register('website')} />
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
          onCancel={() => router.push('/admin/colaboradores')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar colaborador(a)"
        />
      </form>
    </div>
  )
}
