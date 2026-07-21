'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useRouteId } from '@/features/admin/hooks/useRouteId'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
  useParceiroGrupo,
  useParceiroGrupos,
  useParceiroGrupoMutations,
} from '@/features/admin/api/adminEntities'
import { parceiroGrupoSchema, type ParceiroGrupoFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function ParceiroFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: grupos = [] } = useParceiroGrupos()
  const { data: existing, isLoading: isLoadingItem } = useParceiroGrupo(id)
  const { create, update } = useParceiroGrupoMutations()

  const emptyValues = useMemo<ParceiroGrupoFormValues>(
    () => ({
      title: '',
      logos: [{ logoUrl: '', alt: '', website: '' }],
      displayOrder: grupos.length + 1,
      status: 'active',
    }),
    [grupos.length],
  )

  const formValues = useMemo<ParceiroGrupoFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      title: existing.title,
      logos: existing.logos.map((logo) => ({
        logoUrl: logo.logoUrl,
        alt: logo.alt,
        website: logo.website,
      })),
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ParceiroGrupoFormValues>({
    resolver: zodResolver(parceiroGrupoSchema),
    values: formValues ?? emptyValues,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'logos',
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: ParceiroGrupoFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Grupo atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Grupo criado com sucesso!')
      }
      router.push('/admin/parceiros')
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
    return <AdminPageHeader title="Grupo não encontrado" backHref="/admin/parceiros" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar grupo de parceiros' : 'Novo grupo de parceiros'}
        description="Preencha os dados do grupo e seus logos."
        backHref="/admin/parceiros"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Dados principais do grupo.">
          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
          </FormField>
        </FormSection>

        <FormSection title="Logos" description="Adicione os logos dos parceiros deste grupo.">
          {errors.logos?.message && (
            <p className="font-ui text-sm text-destructive">{errors.logos.message}</p>
          )}

          <div className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-4 rounded-xl border border-border/60 bg-muted/20 p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="font-ui text-sm font-medium">Logo {index + 1}</span>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="size-4" aria-hidden="true" />
                      Remover
                    </Button>
                  )}
                </div>

                <Controller
                  name={`logos.${index}.logoUrl`}
                  control={control}
                  render={({ field: logoField }) => (
                    <ImagePicker
                      value={logoField.value}
                      onChange={logoField.onChange}
                      label="Logo"
                      error={errors.logos?.[index]?.logoUrl?.message}
                    />
                  )}
                />

                <FormField
                  label="Texto alternativo"
                  required
                  error={errors.logos?.[index]?.alt?.message}
                >
                  <Input
                    {...register(`logos.${index}.alt`)}
                    aria-invalid={Boolean(errors.logos?.[index]?.alt)}
                  />
                </FormField>

                <FormField label="Website" error={errors.logos?.[index]?.website?.message}>
                  <Input
                    placeholder="https://..."
                    {...register(`logos.${index}.website`)}
                    aria-invalid={Boolean(errors.logos?.[index]?.website)}
                  />
                </FormField>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ logoUrl: '', alt: '', website: '' })}
          >
            <Plus className="size-4" aria-hidden="true" />
            Adicionar logo
          </Button>
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
          onCancel={() => router.push('/admin/parceiros')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar grupo"
        />
      </form>
    </div>
  )
}
