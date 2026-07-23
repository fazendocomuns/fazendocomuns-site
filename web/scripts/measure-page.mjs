import { chromium, devices } from '@playwright/test'

const target = process.argv[2]
const path = process.argv[3] ?? '/eventos/as-criancas-falam/fotos'
const settleMs = Number(process.argv[4] ?? 15_000)

if (!target) {
  console.error('Usage: node scripts/measure-page.mjs <baseURL> [path] [settleMs]')
  process.exit(1)
}

const url = new URL(path, target).toString()
const device = devices['iPhone 12']

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  ...device,
  // Approximate Slow 3G-ish conditions without starving the 15s settle window entirely.
  offline: false,
})
const page = await context.newPage()
const cdp = await context.newCDPSession(page)
await cdp.send('Network.enable')
await cdp.send('Performance.enable')

let transferBytes = 0
let imageBytes = 0
let requestCount = 0
const imageUrls = []

cdp.on('Network.loadingFinished', (event) => {
  transferBytes += event.encodedDataLength ?? 0
})

page.on('response', async (response) => {
  requestCount += 1
  const responseUrl = response.url()
  const type = response.request().resourceType()
  if (type !== 'image' && !responseUrl.includes('/storage/v1/')) return

  const headers = response.headers()
  const length = Number(headers['content-length'] || 0)
  if (length > 0) imageBytes += length
  imageUrls.push({
    url: responseUrl.slice(0, 160),
    status: response.status(),
    length,
    type,
  })
})

const start = Date.now()
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60_000 })
await page.waitForTimeout(settleMs)

const metrics = await page.evaluate(() => {
  const nav = performance.getEntriesByType('navigation')[0]
  const imgs = Array.from(document.images)
  return {
    loadEventEnd: nav?.loadEventEnd ?? null,
    domContentLoaded: nav?.domContentLoadedEventEnd ?? null,
    transferSizeNav: nav?.transferSize ?? null,
    imgCount: imgs.length,
    imgComplete: imgs.filter((img) => img.complete).length,
    longTasks: performance.getEntriesByType('longtask').map((entry) => entry.duration),
  }
})

const longTaskTotal = (metrics.longTasks ?? []).reduce((sum, value) => sum + value, 0)

const result = {
  url,
  settleMs,
  elapsedMs: Date.now() - start,
  transferMiB: Number((transferBytes / (1024 * 1024)).toFixed(2)),
  imageHeaderMiB: Number((imageBytes / (1024 * 1024)).toFixed(2)),
  requestCount,
  imgCount: metrics.imgCount,
  imgComplete: metrics.imgComplete,
  loadEventEndMs: metrics.loadEventEnd,
  domContentLoadedMs: metrics.domContentLoaded,
  longTaskTotalMs: Number(longTaskTotal.toFixed(1)),
  longTaskCount: metrics.longTasks?.length ?? 0,
  sampleImageUrls: imageUrls.slice(0, 8),
  objectPublicCount: imageUrls.filter((item) =>
    item.url.includes('/storage/v1/object/public/'),
  ).length,
  renderPublicCount: imageUrls.filter((item) =>
    item.url.includes('/storage/v1/render/image/public/'),
  ).length,
}

console.log(JSON.stringify(result, null, 2))
await browser.close()
