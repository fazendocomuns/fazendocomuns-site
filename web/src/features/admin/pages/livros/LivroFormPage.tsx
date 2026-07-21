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
import { useLivro, useLivros, useLivroMutations } from '@/features/admin/api/adminEntities'
import { livroSchema, type LivroFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function LivroFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)

  const { data: livros = [] } = useLivros()
  const { data: existing, isLoading: isLoadingItem } = useLivro(id)
  const { create, update } = useLivroMutations()

  const emptyValues = useMemo<LivroFormValues>(
    () => ({
      title: '',
      subtitle: '',
      cover: '',
      coverAlt: '',
      authors: '',
      organizers: '',
      summary: '',
      readUrl: '',
      downloadUrl: '',
      downloadLabel: '',
      datePublished: '',
      publisher: '',
      categoryLabel: '',
      seoTitle: '',
      seoDescription: '',
      displayOrder: livros.length + 1,
      status: 'active',
    }),
    [livros.length],
  )

  const formValues = useMemo<LivroFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      title: existing.title,
      subtitle: existing.subtitle,
      cover: existing.cover,
      coverAlt: existing.coverAlt,
      authors: existing.authors.join(', '),
      organizers: existing.organizers.join(', '),
      summary: existing.summary.join('\n\n'),
      readUrl: existing.readUrl,
      downloadUrl: existing.downloadUrl,
      downloadLabel: existing.downloadLabel,
      datePublished: existing.datePublished,
      publisher: existing.publisher,
      categoryLabel: existing.categoryLabel,
      seoTitle: existing.seoTitle,
      seoDescription: existing.seoDescription,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LivroFormValues>({
    resolver: zodResolver(livroSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: LivroFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Livro atualizado com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Livro criado com sucesso!')
      }
      router.push('/admin/livros')
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
    return <AdminPageHeader title="Livro não encontrado" backHref="/admin/livros" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar livro' : 'Novo livro'}
        description="Preencha os dados do livro para exibição no site."
        backHref="/admin/livros"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Informações básicas" description="Dados principais do livro.">
          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
          </FormField>

          <FormField label="Subtítulo" error={errors.subtitle?.message}>
            <Input {...register('subtitle')} aria-invalid={Boolean(errors.subtitle)} />
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

          <FormField label="Texto alternativo da capa" error={errors.coverAlt?.message}>
            <Input {...register('coverAlt')} aria-invalid={Boolean(errors.coverAlt)} />
          </FormField>

          <FormField label="Autores" required error={errors.authors?.message}>
            <Input
              placeholder="Nome 1, Nome 2"
              {...register('authors')}
              aria-invalid={Boolean(errors.authors)}
            />
          </FormField>

          <FormField label="Organizadores" error={errors.organizers?.message}>
            <Input
              placeholder="Nome 1, Nome 2"
              {...register('organizers')}
              aria-invalid={Boolean(errors.organizers)}
            />
          </FormField>

          <FormField label="Resumo" required error={errors.summary?.message}>
            <Textarea
              rows={6}
              placeholder="Separe parágrafos com uma linha em branco"
              {...register('summary')}
              aria-invalid={Boolean(errors.summary)}
            />
          </FormField>
        </FormSection>

        <FormSection title="Links e publicação" description="URLs e dados editoriais.">
          <FormField label="URL de leitura" required error={errors.readUrl?.message}>
            <Input {...register('readUrl')} aria-invalid={Boolean(errors.readUrl)} />
          </FormField>

          <FormField label="URL de download" required error={errors.downloadUrl?.message}>
            <Input {...register('downloadUrl')} aria-invalid={Boolean(errors.downloadUrl)} />
          </FormField>

          <FormField label="Rótulo do download" error={errors.downloadLabel?.message}>
            <Input {...register('downloadLabel')} aria-invalid={Boolean(errors.downloadLabel)} />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Data de publicação" error={errors.datePublished?.message}>
              <Input type="date" {...register('datePublished')} aria-invalid={Boolean(errors.datePublished)} />
            </FormField>
            <FormField label="Editora" required error={errors.publisher?.message}>
              <Input {...register('publisher')} aria-invalid={Boolean(errors.publisher)} />
            </FormField>
          </div>

          <FormField label="Categoria" error={errors.categoryLabel?.message}>
            <Input {...register('categoryLabel')} aria-invalid={Boolean(errors.categoryLabel)} />
          </FormField>
        </FormSection>

        <FormSection title="SEO" description="Metadados para mecanismos de busca.">
          <FormField label="Título SEO" required error={errors.seoTitle?.message}>
            <Input {...register('seoTitle')} aria-invalid={Boolean(errors.seoTitle)} />
          </FormField>

          <FormField label="Descrição SEO" required error={errors.seoDescription?.message}>
            <Textarea
              rows={3}
              {...register('seoDescription')}
              aria-invalid={Boolean(errors.seoDescription)}
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
          onCancel={() => router.push('/admin/livros')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar livro"
        />
      </form>
    </div>
  )
}
