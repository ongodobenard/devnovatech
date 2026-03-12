import puppeteer from 'puppeteer'
import { preview } from 'vite'
import fs from 'fs'
import path from 'path'

const ROUTES = ['/', '/about', '/services', '/projects', '/contact', '/quote']

function cleanHtml(html) {
  // Fix encoding — ensure UTF-8 charset is declared first in head
  if (!html.includes('<meta charset="UTF-8">') && !html.includes('<meta charset="utf-8">')) {
    html = html.replace('<head>', '<head><meta charset="UTF-8">')
  }

  // Fix broken UTF-8 characters caused by Puppeteer encoding issues
  html = html
    .replace(/Â©/g, '©')
    .replace(/Â·/g, '·')
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/Ã©/g, 'é')
    .replace(/Ã /g, 'à')

  // Remove duplicate <title> tags — keep the LAST one (injected by Helmet)
  const titleMatches = [...html.matchAll(/<title>[^<]*<\/title>/g)]
  if (titleMatches.length > 1) {
    let count = 0
    html = html.replace(/<title>[^<]*<\/title>/g, (match) => {
      count++
      return count < titleMatches.length ? '' : match
    })
  }

  // Remove duplicate <meta name="description"> — keep the LAST one
  const descMatches = [...html.matchAll(/<meta name="description"[^>]*>/g)]
  if (descMatches.length > 1) {
    let count = 0
    html = html.replace(/<meta name="description"[^>]*>/g, (match) => {
      count++
      return count < descMatches.length ? '' : match
    })
  }

  // Remove duplicate <meta name="keywords"> — keep the LAST one
  const kwMatches = [...html.matchAll(/<meta name="keywords"[^>]*>/g)]
  if (kwMatches.length > 1) {
    let count = 0
    html = html.replace(/<meta name="keywords"[^>]*>/g, (match) => {
      count++
      return count < kwMatches.length ? '' : match
    })
  }

  // Remove duplicate <meta name="author"> — keep the LAST one
  const authorMatches = [...html.matchAll(/<meta name="author"[^>]*>/g)]
  if (authorMatches.length > 1) {
    let count = 0
    html = html.replace(/<meta name="author"[^>]*>/g, (match) => {
      count++
      return count < authorMatches.length ? '' : match
    })
  }

  // Remove duplicate <meta name="robots"> — keep the LAST one
  const robotsMatches = [...html.matchAll(/<meta name="robots"[^>]*>/g)]
  if (robotsMatches.length > 1) {
    let count = 0
    html = html.replace(/<meta name="robots"[^>]*>/g, (match) => {
      count++
      return count < robotsMatches.length ? '' : match
    })
  }

  // Remove duplicate canonical links — keep the LAST one
  const canonMatches = [...html.matchAll(/<link rel="canonical"[^>]*>/g)]
  if (canonMatches.length > 1) {
    let count = 0
    html = html.replace(/<link rel="canonical"[^>]*>/g, (match) => {
      count++
      return count < canonMatches.length ? '' : match
    })
  }

  // Remove duplicate OG / Twitter meta tags — keep the FIRST one seen
  const seen = new Set()
  html = html.replace(/<meta (property|name)="(og:[^"]+|twitter:[^"]+)"[^>]*>/g, (match, attr, key) => {
    if (seen.has(key)) return ''
    seen.add(key)
    return match
  })

  return html
}

async function prerender() {
  const server = await preview({
    preview: { port: 5999, open: false },
  })

  console.log('✅ Vite preview server started on port 5999')

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  for (const route of ROUTES) {
    const url = `http://localhost:5999${route}`
    console.log(`📄 Prerendering ${url}...`)

    const page = await browser.newPage()

    // Force UTF-8 encoding
    await page.setExtraHTTPHeaders({ 'Accept-Charset': 'utf-8' })

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })

    // Wait for the loading spinner to disappear
    await page.waitForFunction(
      () => !document.querySelector('.fixed.inset-0.z-\\[9999\\]'),
      { timeout: 30000 }
    ).catch(() => console.log(`⚠️  Spinner timeout on ${route}, saving anyway...`))

    // Extra wait to ensure React has fully rendered
    await new Promise(resolve => setTimeout(resolve, 3000))

    let html = await page.content()

    // Clean up all issues — encoding, duplicates, charset
    html = cleanHtml(html)

    const routePath = route === '/' ? '/index.html' : `${route}/index.html`
    const filePath = path.join(process.cwd(), 'dist', routePath)

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, html, 'utf8')

    console.log(`✅ Saved → dist${routePath}`)
    await page.close()
  }

  await browser.close()
  server.httpServer.close()
  console.log('🎉 Prerendering complete!')
}

prerender().catch(err => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})
