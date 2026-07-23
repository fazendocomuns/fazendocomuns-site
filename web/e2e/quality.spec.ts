import { expect, test, type Page } from '@playwright/test'

function collectRuntimeErrors(page: Page) {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  return errors
}

test.describe('qualidade pública', () => {
  test('sitemap, robots e todas as URLs indexáveis respondem sem erro', async ({
    request,
  }) => {
    test.setTimeout(120_000)

    const sitemapResponse = await request.get('/sitemap.xml')
    expect(sitemapResponse.ok()).toBeTruthy()
    expect(sitemapResponse.headers()['content-type']).toContain('application/xml')

    const sitemap = await sitemapResponse.text()
    expect(sitemap).toContain('/eventos/as-criancas-falam/fotos')

    const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
      ([, location]) => new URL(location).pathname,
    )
    const failures: string[] = []

    for (let index = 0; index < paths.length; index += 6) {
      const batch = paths.slice(index, index + 6)
      const responses = await Promise.all(
        batch.map(async (path) => ({ path, response: await request.get(path) })),
      )
      for (const { path, response } of responses) {
        if (!response.ok()) failures.push(`${path}: ${response.status()}`)
      }
    }

    expect(failures).toEqual([])

    const robotsResponse = await request.get('/robots.txt')
    expect(robotsResponse.ok()).toBeTruthy()
    const robots = await robotsResponse.text()
    expect(robots).toContain('Disallow: /admin')
    expect(robots).toContain('Sitemap:')
  })

  test('evento não carrega players externos antes da interação', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)
    await page.goto('/eventos/as-criancas-falam')

    await expect(page.locator('iframe')).toHaveCount(0)

    const playButton = page.getByRole('button', {
      name: /Reproduzir Vídeo — Mesa de Abertura/i,
    })
    await playButton.scrollIntoViewIfNeeded()
    await expect(playButton).toBeVisible()
    await playButton.click()

    const player = page.locator('iframe[title="Vídeo — Mesa de Abertura"]')
    await expect(player).toBeVisible()
    await expect(player).toHaveAttribute('src', /youtube-nocookie\.com/)
    expect(runtimeErrors).toEqual([])
  })

  test('preview do evento abre lightbox sem baixar originais', async ({ page }) => {
    const imageResponses: string[] = []
    page.on('response', (response) => {
      const url = response.url()
      if (
        url.includes('evento-as-criancas-falam-fotos') ||
        url.includes('/_next/image')
      ) {
        imageResponses.push(url)
      }
    })

    await page.goto('/eventos/as-criancas-falam')
    await page
      .getByRole('region', { name: 'Registro fotográfico' })
      .scrollIntoViewIfNeeded()

    await page.getByRole('button', { name: 'Abrir foto 1 do evento' }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()

    expect(
      imageResponses.some((url) => url.includes('/storage/v1/object/public/')),
    ).toBe(false)
    expect(
      imageResponses.some((url) =>
        url.includes('/storage/v1/render/image/public/'),
      ),
    ).toBe(true)
  })

  test('galeria usa imagens responsivas e lightbox acessível', async ({ page }) => {
    const runtimeErrors = collectRuntimeErrors(page)
    await page.goto('/eventos/as-criancas-falam/fotos')

    const firstPhotoButton = page.getByRole('button', {
      name: 'Abrir Fotos do evento — foto 1',
      exact: true,
    })
    await firstPhotoButton.scrollIntoViewIfNeeded()

    const thumbnail = firstPhotoButton.locator('img')
    await expect(thumbnail).toBeVisible()
    await expect
      .poll(() => thumbnail.evaluate((image: HTMLImageElement) => image.currentSrc))
      .toContain('/storage/v1/render/image/public/')

    await firstPhotoButton.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog).toHaveAccessibleName(/Fotos do evento — foto 1 de 40/i)
    await expect(dialog.getByText('1 / 40')).toBeVisible()

    await page.keyboard.press('ArrowRight')
    await expect(dialog.getByText('2 / 40')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .toBe('')
    expect(runtimeErrors).toEqual([])
  })

  test('menu móvel fecha com Escape e devolve o foco', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/eventos')
    await page.waitForLoadState('networkidle')

    const trigger = page.getByRole('button', { name: 'Abrir menu' })
    await expect(trigger).toBeVisible()
    await trigger.click()

    const drawer = page.getByRole('dialog', { name: 'Menu de navegação' })
    await expect(drawer).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('formulário de contato expõe validações acessíveis', async ({ page }) => {
    await page.goto('/contato')
    await page.waitForLoadState('networkidle')

    const form = page.locator('form[aria-labelledby="contact-form-title"]')
    await form.getByRole('button', { name: 'Enviar', exact: true }).click()

    await expect(form.getByRole('alert')).toHaveCount(4)
    await expect(form.getByText('Informe seu nome')).toBeVisible()
    await expect(form.getByText('Informe um e-mail válido')).toBeVisible()
  })
})
