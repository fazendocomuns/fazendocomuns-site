import type { ImageLoaderProps } from 'next/image'

const SUPABASE_HOST = 'yvrgrtntodxcxicocggm.supabase.co'
const OBJECT_PATH = '/storage/v1/object/public/'
const RENDER_PATH = '/storage/v1/render/image/public/'

/**
 * Entrega imagens públicas do Storage já redimensionadas pelo CDN do Supabase.
 * O `next/image` continua gerando `srcset`; cada largura aponta diretamente para
 * a transformação correspondente, evitando baixar originais de vários megabytes.
 */
export function supabaseImageLoader({
  src,
  width,
  quality = 60,
}: ImageLoaderProps): string {
  try {
    const url = new URL(src)

    if (url.hostname !== SUPABASE_HOST || !url.pathname.startsWith(OBJECT_PATH)) {
      return src
    }

    url.pathname = url.pathname.replace(OBJECT_PATH, RENDER_PATH)
    url.searchParams.set('width', String(width))
    url.searchParams.set('quality', String(quality))
    // Default do CDN é `cover` (corta). Com next/image o enquadramento
    // fica no CSS (`object-fit`); a transformação deve só redimensionar.
    url.searchParams.set('resize', 'contain')

    return url.toString()
  } catch {
    return src
  }
}
