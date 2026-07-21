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
  pesquisadorSchema,
  type PesquisadorFormValues,
} from '@/features/admin/schemas'
import {
  usePesquisador,
  usePesquisadores,
  usePesquisadorMutations,
} from '@/features/admin/api/equipe'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function PesquisadorFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: pesquisadores = [] } = usePesquisadores()
  const { data: existing, isLoading: isLoadingItem } = usePesquisador(id)
  const { create, update } = usePesquisadorMutations()

  const emptyValues = useMemo<PesquisadorFormValues>(
    () => ({
      name: '',
      photo: '',
      role: '',
      miniBio: '',
      fullBio: '',
      email: '',
      linkedin: '',
      lattes: '',
      displayOrder: pesquisadores.length + 1,
      status: 'active',
    }),
    [pesquisadores.length],
  )

  const formValues = useMemo<PesquisadorFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      name: existing.name,
      photo: existing.photo,
      role: existing.role,
      miniBio: existing.miniBio,
      fullBio: existing.fullBio,
      email: existing.email,
      linkedin: existing.linkedin,
      lattes: existing.lattes,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PesquisadorFormValues>({
    resolver: zodResolver(pesquisadorSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: PesquisadorFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Pesquisador(a) atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Pesquisador(a) criado com sucesso!')
      }
      router.push('/admin/pesquisadores')
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
        title="Pesquisador(a) não encontrado"
        backHref="/admin/pesquisadores"
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar pesquisador(a)' : 'Novo pesquisador(a)'}
        description="Preencha os dados para exibição na página de equipe."
        backHref="/admin/pesquisadores"
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
          <FormField label="Lattes" error={errors.lattes?.message} hint="Opcional">
            <Input placeholder="http://lattes.cnpq.br/..." {...register('lattes')} />
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
          onCancel={() => router.push('/admin/pesquisadores')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar pesquisador(a)"
        />
      </form>
    </div>
  )
}
