import { describe, expect, it } from 'vitest'
import { assetSrc } from '@/lib/assetSrc'

describe('assetSrc', () => {
  it('retorna string pura sem alteração', () => {
    expect(assetSrc('/imgs/logo.png')).toBe('/imgs/logo.png')
    expect(assetSrc('https://example.com/a.jpg')).toBe('https://example.com/a.jpg')
  })

  it('extrai .src de StaticImageData', () => {
    expect(
      assetSrc({
        src: '/_next/static/media/logo.abc123.png',
        height: 48,
        width: 160,
      }),
    ).toBe('/_next/static/media/logo.abc123.png')
  })
})
