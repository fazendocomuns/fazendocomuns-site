import { describe, expect, it } from 'vitest'
import { supabaseImageLoader } from '@/lib/supabaseImageLoader'

const publicImage =
  'https://yvrgrtntodxcxicocggm.supabase.co/storage/v1/object/public/biblioteca-de-imagens/galeria/foto.jpg'

describe('supabaseImageLoader', () => {
  it('gera uma transformação responsiva no CDN do Supabase', () => {
    const result = new URL(
      supabaseImageLoader({ src: publicImage, width: 640, quality: 60 }),
    )

    expect(result.pathname).toBe(
      '/storage/v1/render/image/public/biblioteca-de-imagens/galeria/foto.jpg',
    )
    expect(result.searchParams.get('width')).toBe('640')
    expect(result.searchParams.get('quality')).toBe('60')
    expect(result.searchParams.get('resize')).toBe('contain')
  })

  it('usa qualidade econômica por padrão', () => {
    const result = new URL(supabaseImageLoader({ src: publicImage, width: 384 }))

    expect(result.searchParams.get('quality')).toBe('60')
  })

  it('não reescreve origens externas ou URLs inválidas', () => {
    const wix = 'https://static.wixstatic.com/media/example.jpg'

    expect(supabaseImageLoader({ src: wix, width: 640 })).toBe(wix)
    expect(supabaseImageLoader({ src: '/imagem-local.jpg', width: 640 })).toBe(
      '/imagem-local.jpg',
    )
  })
})
