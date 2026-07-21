import { describe, expect, it } from 'vitest'
import { mainNavigation } from '@/features/home/data/navigation'
import {
  bubbleItems,
  carouselSlides,
  featureCards,
  mainTitle,
} from '@/features/home/data/homeContent'
import { isSupabaseConfigured, USE_SUPABASE } from '@/lib/supabase/env'

describe('navigation', () => {
  it('tem página inicial e seções principais', () => {
    const labels = mainNavigation.map((item) => item.label)
    expect(labels).toContain('Página inicial')
    expect(labels).toContain('O projeto')
    expect(labels).toContain('Notícias')
    expect(labels).toContain('Editoriais')
  })

  it('não inclui hrefs vazios', () => {
    for (const item of mainNavigation) {
      expect(item.href).toMatch(/^\//)
      for (const child of item.children ?? []) {
        expect(child.href).toMatch(/^\//)
      }
    }
  })
})

describe('homeContent', () => {
  it('carousel e bubbles têm imagens', () => {
    expect(carouselSlides.length).toBeGreaterThanOrEqual(2)
    for (const slide of carouselSlides) {
      expect(slide.src).toBeTruthy()
      expect(slide.alt).toBeTruthy()
    }
    expect(bubbleItems.length).toBe(5)
    for (const bubble of bubbleItems) {
      expect(bubble.image).toBeTruthy()
      expect(bubble.href).toMatch(/^\//)
    }
  })

  it('feature cards cobrem os três eixos', () => {
    expect(featureCards.map((c) => c.id)).toEqual(['criancas', 'professoras', 'sociedade'])
    expect(mainTitle.line1).toContain('Fazendo Comuns')
  })
})

describe('supabase env (pré-integração)', () => {
  it('mantém Supabase desligado por padrão nos testes', () => {
    expect(USE_SUPABASE).toBe(false)
    expect(isSupabaseConfigured()).toBe(false)
  })
})
