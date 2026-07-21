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
  assistenteSchema,
  type AssistenteFormValues,
} from '@/features/admin/schemas'
import {
  useAssistente,
  useAssistentes,
  useAssistenteMutations,
} from '@/features/admin/api/equipe'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function AssistenteFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: assistentes = [] } = useAssistentes()
  const { data: existing, isLoading: isLoadingItem } = useAssistente(id)
  const { create, update } = useAssistenteMutations()

  const emptyValues = useMemo<AssistenteFormValues>(
    () => ({
      name: '',
      photo: '',
      role: '',
      miniBio: '',
      fullBio: '',
      email: '',
      linkedin: '',
      displayOrder: assistentes.length + 1,
      status: 'active',
    }),
    [assistentes.length],
  )

  const formValues = useMemo<AssistenteFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      name: existing.name,
      photo: existing.photo,
      role: existing.role,
      miniBio: existing.miniBio,
      fullBio: existing.fullBio,
      email: existing.email,
      linkedin: existing.linkedin,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AssistenteFormValues>({
    resolver: zodResolver(assistenteSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: AssistenteFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Assistente atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Assistente criado com sucesso!')
      }
      router.push('/admin/assistentes')
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
      <AdminPageHeader title="Assistente não encontrado" backHref="/admin/assistentes" />
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar assistente' : 'Novo assistente'}
        description="Preencha os dados para exibição na página de equipe."
        backHref="/admin/assistentes"
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

          <FormField label="Cargo" required error={errors.role?.message}>
            <Input {...register('role')} aria-invalid={Boolean(errors.role)} />
          </FormField>

          <FormField label="Mini biografia" required error={errors.miniBio?.message}>
            <Textarea rows={3} {...register('miniBio')} aria-invalid={Boolean(errors.miniBio)} />
          </FormField>

          <FormField label="Biografia completa" required error={errors.fullBio?.message}>
            <Textarea rows={6} {...register('fullBio')} aria-invalid={Boolean(errors.fullBio)} />
          </FormField>
        </FormSection>

        <FormSection title="Contato e links">
          <FormField label="E-mail" required error={errors.email?.message}>
            <Input type="email" {...register('email')} aria-invalid={Boolean(errors.email)} />
          </FormField>
          <FormField label="LinkedIn" error={errors.linkedin?.message} hint="Opcional">
            <Input placeholder="https://linkedin.com/in/..." {...register('linkedin')} />
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
          onCancel={() => router.push('/admin/assistentes')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar assistente"
        />
      </form>
    </div>
  )
}
