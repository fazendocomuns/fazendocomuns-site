import type { MetadataRoute } from 'next'
import { getPublicEditorialSlugs } from '@/lib/content/editoriais.server'
import { getPublicLivroSlugs } from '@/lib/content/livros.server'
import { getPublicNoticiaSlugs } from '@/lib/content/noticias.server'
import { getPublicGaleriaSlugs } from '@/lib/content/multimidia.server'
import { getSiteUrl } from '@/lib/site'

const STATIC_ROUTES = [
  '',
  '/noticias',
  '/editoriais',
  '/livros',
  '/contato',
  '/projeto',
  '/projeto/o-que-e',
  '/projeto/equipe',
  '/projeto/colaboradores',
  '/projeto/consultores',
  '/projeto/parceiros',
  '/projeto/producoes',
  '/projeto/producoes/artigos',
  '/projeto/producoes/livros',
  '/projeto/bibliografia',
  '/multimidia',
  '/multimidia/fotos',
  '/multimidia/videos',
  '/multimidia/podcast',
  '/eventos',
  '/eventos/as-criancas-falam',
  '/eventos/recrear-mundos-outros',
  '/mais/links-parceiros',
  '/criancas-falam',
  '/professores-falam',
  '/manifesto-das-professoras',
  '/a-sociedade-fala',
  '/historias-do-recreio',
  '/cartazes-com-historias-do-recreio',
  '/jornalzinho-da-escola-db',
  '/o-projeto-falatorio',
  '/video-vamos-falar-do-recreio',
  '/video-rap-historias-do-recreio',
  '/video-debate-o-recreio-em-cena-final',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl()
  const [noticiaSlugs, editorialSlugs, livroSlugs, galeriaSlugs] = await Promise.all([
    getPublicNoticiaSlugs(),
    getPublicEditorialSlugs(),
    getPublicLivroSlugs(),
    getPublicGaleriaSlugs(),
  ])

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.8,
    })),
    ...noticiaSlugs.map((slug) => ({
      url: `${baseUrl}/noticias/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...editorialSlugs.map((slug) => ({
      url: `${baseUrl}/editoriais/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...livroSlugs.map((slug) => ({
      url: `${baseUrl}/livros/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...galeriaSlugs.map((slug) => ({
      url: `${baseUrl}/multimidia/fotos/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]
}
