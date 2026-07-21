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
import {
  useNewsCategories,
  useNoticia,
  useNoticias,
  useNoticiaMutations,
} from '@/features/admin/api/content'
import { noticiaSchema, type NoticiaFormValues } from '@/features/admin/schemas'
import { useAdminUiStore } from '@/features/admin/store/adminUiStore'

export function NoticiaFormPage() {
  const id = useRouteId()
  const router = useRouter()
  const isEditing = Boolean(id)
  const showToast = useAdminUiStore((s) => s.showToast)
  const categories = useNewsCategories()

  const { data: noticias = [] } = useNoticias()
  const { data: existing, isLoading: isLoadingItem } = useNoticia(id)
  const { create, update } = useNoticiaMutations()

  const emptyValues = useMemo<NoticiaFormValues>(
    () => ({
      title: '',
      summary: '',
      content: '',
      coverImage: '',
      author: '',
      date: new Date().toISOString().slice(0, 10),
      category: categories[0] ?? 'Institucional',
      tags: [],
      featured: false,
      heroImage: '',
      heroImageAlt: '',
      audioUrl: '',
      audioDuration: '',
      audioLabel: '',
      relatedLinkHref: '',
      relatedLinkLabel: '',
      displayOrder: noticias.length + 1,
      status: 'active',
    }),
    [categories, noticias.length],
  )

  const formValues = useMemo<NoticiaFormValues | undefined>(() => {
    if (!isEditing || !existing) return undefined
    return {
      title: existing.title,
      summary: existing.summary,
      content: existing.content,
      coverImage: existing.coverImage,
      author: existing.author,
      date: existing.date,
      category: existing.category,
      tags: existing.tags,
      featured: existing.featured,
      heroImage: existing.heroImage,
      heroImageAlt: existing.heroImageAlt,
      audioUrl: existing.audioUrl,
      audioDuration: existing.audioDuration,
      audioLabel: existing.audioLabel,
      relatedLinkHref: existing.relatedLinkHref,
      relatedLinkLabel: existing.relatedLinkLabel,
      displayOrder: existing.displayOrder,
      status: existing.status,
    }
  }, [existing, isEditing])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<NoticiaFormValues>({
    resolver: zodResolver(noticiaSchema),
    values: formValues ?? emptyValues,
  })

  const isSubmitting = create.isPending || update.isPending

  async function onSubmit(data: NoticiaFormValues) {
    try {
      if (isEditing && id) {
        await update.mutateAsync({ id, values: data })
        showToast('Notícia atualizada com sucesso!')
      } else {
        await create.mutateAsync(data)
        showToast('Notícia criada com sucesso!')
      }
      router.push('/admin/noticias')
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
    return <AdminPageHeader title="Notícia não encontrada" backHref="/admin/noticias" />
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 pb-8">
      <AdminPageHeader
        title={isEditing ? 'Editar notícia' : 'Nova notícia'}
        description="Preencha os dados da notícia para publicação no site."
        backHref="/admin/noticias"
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Conteúdo" description="Texto e imagem exibidos na página da notícia.">
          <FormField label="Título" required error={errors.title?.message}>
            <Input {...register('title')} aria-invalid={Boolean(errors.title)} />
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
            name="coverImage"
            control={control}
            render={({ field }) => (
              <ImagePicker
                value={field.value}
                onChange={field.onChange}
                label="Imagem de capa"
                error={errors.coverImage?.message}
              />
            )}
          />
        </FormSection>

        <FormSection title="Metadados" description="Informações de classificação e publicação.">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Autor(a)" required error={errors.author?.message}>
              <Input {...register('author')} aria-invalid={Boolean(errors.author)} />
            </FormField>
            <FormField label="Data" required error={errors.date?.message}>
              <Input type="date" {...register('date')} aria-invalid={Boolean(errors.date)} />
            </FormField>
          </div>

          <FormField label="Categoria" required error={errors.category?.message}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger aria-invalid={Boolean(errors.category)}>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField label="Tags" error={errors.tags?.message} hint="Separe por vírgula">
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Input
                  placeholder="recreio, podcast, evento"
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
        </FormSection>

        <FormSection
          title="Mídia e links"
          description="Campos opcionais da página pública da notícia."
        >
          <Controller
            name="heroImage"
            control={control}
            render={({ field }) => (
              <ImagePicker
                value={field.value}
                onChange={field.onChange}
                label="Imagem hero (detalhe)"
                error={errors.heroImage?.message}
              />
            )}
          />
          <FormField label="Alt da imagem hero" error={errors.heroImageAlt?.message}>
            <Input {...register('heroImageAlt')} />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Áudio (URL)" error={errors.audioUrl?.message} hint="Opcional">
              <Input placeholder="https://..." {...register('audioUrl')} />
            </FormField>
            <FormField label="Duração do áudio" error={errors.audioDuration?.message}>
              <Input placeholder="10:41" {...register('audioDuration')} />
            </FormField>
          </div>
          <FormField label="Rótulo do áudio" error={errors.audioLabel?.message}>
            <Input {...register('audioLabel')} />
          </FormField>

          <div className="grid gap-5 sm:grid-cols-2">
            <FormField label="Link relacionado (URL/rota)" error={errors.relatedLinkHref?.message}>
              <Input placeholder="/multimidia/podcast" {...register('relatedLinkHref')} />
            </FormField>
            <FormField label="Texto do link relacionado" error={errors.relatedLinkLabel?.message}>
              <Input placeholder="Ver página do podcast" {...register('relatedLinkLabel')} />
            </FormField>
          </div>
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
          onCancel={() => router.push('/admin/noticias')}
          isSubmitting={isSubmitting}
          isEditing={isEditing}
          createLabel="Criar notícia"
        />
      </form>
    </div>
  )
}
