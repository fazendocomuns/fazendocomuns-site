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
import { RichTextEditor } from '@/features/admin/components/RichTextEditor'
import {
  useEditorial,
  useEditoriais,
  useEditorialMutations,
} from '@/features/admin/api/content'
import {
  formatReferencesText,
  formatSignaturesText,
} from '@/features/admin/lib/editorialFields'
import { editorialSchema, type EditorialFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function EditorialFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: editoriais = [] } = useEditoriais()
  const { data: existing, isLoading: isLoadingItem } = useEditorial(id)
  const { create, update } = useEditorialMutations()

  const emptyValues = useMemo<EditorialFormValues>(
    () => ({
      title: '',
      subtitle: '',
      summary: '',
      content: '',
      image: '',
      author: '',
      date: new Date().toISOString().slice(0, 10),
      tags: [],
      closingText: '',
      signaturesText: '',
      referencesText: '',
      referencesTitle: 'Referências',
      displayOrder: editoriais.length + 1,
      status: 'active',
    }),
    [editoriais.length],
  )

  const formValues = useMemo<EditorialFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      title: existing.title,
      subtitle: existing.subtitle,
      summary: existing.summary,
      content: existing.content,
      image: existing.image,
      author: existing.author,
      date: existing.date,
      tags: existing.tags,
      closingText: existing.closingText,
      signaturesText: formatSignaturesText(existing.signatures),
      referencesText: formatReferencesText(existing.references),
      referencesTitle: existing.referencesTitle,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EditorialFormValues>({
    resolver: zodResolver(editorialSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: EditorialFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Editorial atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Editorial criado com sucesso!')
      }
      router.push('/admin/editoriais')
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
    return <AdminPageHeader title="Editorial não encontrado" backHref="/admin/editoriais" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar editorial' : 'Novo editorial'}
        description="Preencha os dados do editorial para publicação no site."
        backHref="/admin/editoriais"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Conteúdo" description="Texto e imagem exibidos na página do editorial.">
          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
          </FormField>

          <FormField label="Subtítulo" error={errors.subtitle?.message} hint="Opcional — usado no destaque da home">
            <Input {...register('subtitle')} />
          </FormField>

          <FormField label="Resumo" required error={errors.summary?.message}>
            <Textarea rows={3} {...register('summary')} aria-invalid={Boolean(errors.summary)} />
          </FormField>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                label="Conteúdo"
                error={errors.content?.message}
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

        <FormSection title="Assinatura e notas" description="Como aparece no final do editorial público.">
          <FormField
            label="Data/local de fechamento"
            error={errors.closingText?.message}
            hint='Ex.: "Rio de Janeiro, 17 de dezembro de 2024."'
          >
            <Input {...register('closingText')} />
          </FormField>

          <FormField
            label="Autores e afiliações"
            error={errors.signaturesText?.message}
            hint="Um autor por bloco. 1ª linha = nome; linhas seguintes = cargos. Separe autores com linha em branco."
          >
            <Textarea
              rows={8}
              placeholder={'Lara de Oliveira Moreira\nGraduanda de Psicologia...\n\nLucia Rabello de Castro\nProfessora Titular da UFRJ'}
              {...register('signaturesText')}
            />
          </FormField>

          <FormField
            label="Título da seção de referências"
            error={errors.referencesTitle?.message}
            hint="Deixe vazio para ocultar o título (como no editorial 03/2025)."
          >
            <Input placeholder="Referências" {...register('referencesTitle')} />
          </FormField>

          <FormField
            label="Notas e referências"
            error={errors.referencesText?.message}
            hint="Uma referência por linha."
          >
            <Textarea rows={8} {...register('referencesText')} />
          </FormField>
        </FormSection>

        <FormSection title="Metadados" description="Informações de classificação e publicação.">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Autor(a) principal" required error={errors.author?.message} hint="Usado na listagem do admin">
              <Input {...register('author')} aria-invalid={Boolean(errors.author)} />
            </FormField>
            <FormField label="Data" required error={errors.date?.message}>
              <Input type="date" {...register('date')} aria-invalid={Boolean(errors.date)} />
            </FormField>
          </div>

          <FormField label="Tags" error={errors.tags?.message} hint="Separe por vírgula">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="recreio, infância, política"
                  value={field.value.join(', ')}
                  onChange={(e) => {
                    const tags = e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean)
                    field.onChange(tags)
                  }}
                />
              )}
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
          onCancel={() => router.push('/admin/editoriais')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar editorial"
        />
      </form>
    </div>
  )
}
