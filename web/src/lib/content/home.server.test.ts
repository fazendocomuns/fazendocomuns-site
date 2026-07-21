import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/supabase/client', () => ({
  isSupabaseReady: () => false,
  supabase: {},
}))

vi.mock('@/integrations/supabase/repositories/contentPublicRepository', () => ({
  fetchPublicEditoriais: vi.fn(),
}))

describe('getHomePageData (fallback estático)', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('retorna editorial, notícias e eventos sem Supabase', async () => {
    const { getHomePageData } = await import('@/lib/content/home.server')
    const data = await getHomePageData()

    expect(data.featuredEditorial.title).toBeTruthy()
    expect(data.featuredEditorial.slug).toMatch(/editorial/)
    expect(data.newsItems.length).toBeGreaterThan(0)
    expect(data.newsItems[0]).toMatchObject({
      id: expect.any(String),
      slug: expect.any(String),
      title: expect.any(String),
      image: expect.any(String),
    })
    expect(data.events.length).toBeGreaterThan(0)
    expect(data.events[0]).toMatchObject({
      id: expect.any(String),
      href: expect.stringMatching(/^\//),
      image: expect.any(String),
    })
  })
})
