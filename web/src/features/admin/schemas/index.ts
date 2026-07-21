import { z } from 'zod'

export const entityStatusSchema = z.enum(['active', 'inactive'])

export const pesquisadorSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  photo: z.string().min(1, 'Selecione uma foto'),
  role: z.string().min(2, 'Informe o cargo'),
  miniBio: z.string().min(10, 'Mini biografia muito curta'),
  fullBio: z.string().min(20, 'Biografia completa muito curta'),
  email: z.string().email('E-mail inválido'),
  linkedin: z.string().url('URL inválida').or(z.literal('')),
  lattes: z.string().url('URL inválida').or(z.literal('')),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const assistenteSchema = pesquisadorSchema.omit({ lattes: true })

export const consultorSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  photo: z.string().min(1, 'Selecione uma foto'),
  role: z.string().min(2, 'Informe o cargo'),
  institution: z.string().min(2, 'Informe a instituição'),
  bio: z.string().min(20, 'Biografia muito curta'),
  email: z.string().email('E-mail inválido'),
  linkedin: z.string().url('URL inválida').or(z.literal('')),
  lattes: z.string().url('URL inválida').or(z.literal('')),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const colaboradorSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  photo: z.string().min(1, 'Selecione uma foto'),
  institution: z.string().min(2, 'Informe a instituição'),
  role: z.string().min(2, 'Informe o cargo'),
  description: z.string().min(10, 'Descrição muito curta'),
  website: z.string().url('URL inválida').or(z.literal('')),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const noticiaSchema = z.object({
  title: z.string().min(5, 'Título muito curto'),
  summary: z.string().min(10, 'Resumo muito curto'),
  content: z.string().min(20, 'Conteúdo muito curto'),
  coverImage: z.string().min(1, 'Selecione uma imagem de capa'),
  author: z.string().min(2, 'Informe o autor'),
  date: z.string().min(1, 'Informe a data'),
  category: z.string().min(1, 'Selecione uma categoria'),
  tags: z.array(z.string()),
  featured: z.boolean(),
  heroImage: z.string(),
  heroImageAlt: z.string(),
  audioUrl: z.string().url('URL inválida').or(z.literal('')),
  audioDuration: z.string(),
  audioLabel: z.string(),
  relatedLinkHref: z.string(),
  relatedLinkLabel: z.string(),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const editorialSchema = z.object({
  title: z.string().min(5, 'Título muito curto'),
  subtitle: z.string(),
  summary: z.string().min(10, 'Resumo muito curto'),
  content: z.string().min(20, 'Conteúdo muito curto'),
  image: z.string().min(1, 'Selecione uma imagem'),
  author: z.string().min(2, 'Informe o autor'),
  date: z.string().min(1, 'Informe a data'),
  tags: z.array(z.string()),
  closingText: z.string(),
  signaturesText: z.string(),
  referencesText: z.string(),
  referencesTitle: z.string(),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const eventoSchema = z.object({
  name: z.string().min(3, 'Nome muito curto'),
  shortDescription: z.string().min(10, 'Descrição curta muito curta'),
  fullDescription: z.string().min(20, 'Descrição completa muito curta'),
  image: z.string().min(1, 'Selecione uma imagem'),
  date: z.string().min(1, 'Informe a data'),
  time: z.string().min(1, 'Informe a hora'),
  location: z.string().min(2, 'Informe o local'),
  link: z.string().min(1, 'Informe o link'),
  featured: z.boolean(),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

const galeriaColorSchema = z.enum(['amber', 'red', 'orange', 'yellow'])

export const videoSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  description: z.string(),
  videoUrl: z.string().min(1, 'Informe a URL do vídeo'),
  thumbnail: z.string().min(1, 'Selecione uma miniatura'),
  thumbnailAlt: z.string(),
  color: galeriaColorSchema,
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const livroSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  subtitle: z.string(),
  cover: z.string().min(1, 'Selecione a capa'),
  coverAlt: z.string(),
  authors: z.string().min(1, 'Informe ao menos um autor'),
  organizers: z.string(),
  summary: z.string().min(10, 'Resumo muito curto'),
  readUrl: z.string().min(1, 'Informe a URL de leitura'),
  downloadUrl: z.string().min(1, 'Informe a URL de download'),
  downloadLabel: z.string(),
  datePublished: z.string(),
  publisher: z.string().min(1, 'Informe a editora'),
  categoryLabel: z.string(),
  seoTitle: z.string().min(1, 'Informe o título SEO'),
  seoDescription: z.string().min(10, 'Descrição SEO muito curta'),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const galeriaSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  color: galeriaColorSchema,
  cover: z.string().min(1, 'Selecione a capa'),
  imageUrls: z.string().min(1, 'Adicione ao menos uma foto'),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const podcastEpisodioSchema = z.object({
  title: z.string().min(5, 'Título muito curto'),
  description: z.string(),
  audioUrl: z.string().min(1, 'Informe a URL do áudio'),
  duration: z.string(),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const parceiroGrupoSchema = z.object({
  title: z.string().min(3, 'Título muito curto'),
  logos: z
    .array(
      z.object({
        logoUrl: z.string().min(1, 'URL do logo obrigatória'),
        alt: z.string().min(1, 'Texto alternativo obrigatório'),
        website: z.string(),
      }),
    )
    .min(1, 'Adicione ao menos um logo'),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const linkParceiroSchema = z.object({
  title: z.string().min(2, 'Título muito curto'),
  subtitle: z.string(),
  highlight: z.string(),
  description: z.string(),
  linksJson: z.string().min(2, 'Informe os links em JSON'),
  displayOrder: z.number().int().min(1),
  status: entityStatusSchema,
})

export const paginaSchema = z.object({
  slug: z.string().min(2, 'Slug muito curto'),
  title: z.string().min(2, 'Título muito curto'),
  pageType: z.string().min(1, 'Informe o tipo'),
  contentJson: z.string().min(2, 'Conteúdo JSON obrigatório'),
  status: entityStatusSchema,
})

export type PesquisadorFormValues = z.infer<typeof pesquisadorSchema>
export type AssistenteFormValues = z.infer<typeof assistenteSchema>
export type ConsultorFormValues = z.infer<typeof consultorSchema>
export type ColaboradorFormValues = z.infer<typeof colaboradorSchema>
export type NoticiaFormValues = z.infer<typeof noticiaSchema>
export type EditorialFormValues = z.infer<typeof editorialSchema>
export type EventoFormValues = z.infer<typeof eventoSchema>
export type VideoFormValues = z.infer<typeof videoSchema>
export type LivroFormValues = z.infer<typeof livroSchema>
export type GaleriaFormValues = z.infer<typeof galeriaSchema>
export type PodcastEpisodioFormValues = z.infer<typeof podcastEpisodioSchema>
export type ParceiroGrupoFormValues = z.infer<typeof parceiroGrupoSchema>
export type LinkParceiroFormValues = z.infer<typeof linkParceiroSchema>
export type PaginaFormValues = z.infer<typeof paginaSchema>
