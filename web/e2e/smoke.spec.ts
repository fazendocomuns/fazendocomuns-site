import { expect, test } from '@playwright/test'

test.describe('smoke público', () => {
  test('home carrega marca, título e seções', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Fazendo Comuns/i)
    await expect(page.getByRole('img', { name: 'Fazendo Comuns' }).first()).toBeVisible()
    await expect(page.getByText(/Vamos falar sobre o recreio/i).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Eventos' })).toBeVisible()
  })

  test('navegação abre notícias', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Notícias' }).first().click()
    await expect(page).toHaveURL(/\/noticias/)
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('editorial em destaque tem link', async ({ page }) => {
    await page.goto('/')
    const heading = page.getByRole('heading', { name: 'Editoriais', exact: true })
    await heading.scrollIntoViewIfNeeded()
    await heading.locator('..').getByRole('link', { name: 'Leia mais' }).click()
    await expect(page).toHaveURL(/\/editoriais\//)
  })
})
