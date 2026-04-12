import puppeteer from 'puppeteer'
import { preview } from 'vite'
import fs from 'fs'
import path from 'path'

const ROUTES = ['/', '/about', '/services', '/projects', '/blog', '/contact', '/quote']

function cleanHtml(html) {
  if (!html.includes('<meta charset="UTF-8">') && !html.includes('<meta charset="utf-8">')) {
    html = html.replace('<head>', '<head><meta charset="UTF-8">')
  }

  html = html
    .replace(/Â©/g, '©')
    .replace(/Â·/g, '·')
    .replace(/â€™/g, "'")
    .replace(/â€œ/g, '"')
    .replace(/â€/g, '"')
    .replace(/Ã©/g, 'é')
    .replace(/Ã /g, 'à')

  const titleMatches = [...html.matchAll(/<title>[^<]*<\/title>/g)]
  if (titleMatches.length > 1) {
    let count = 0
    html = html.replace(/<title>[^<]*<\/title>/g, (match) => {
      count++
      return count < titleMatches.length ? '' : match
    })
  }

  const descMatches = [...html.matchAll(/<meta name="description"[^>]*>/g)]
  if (descMatches.length > 1) {
    let count = 0
    html = html.replace(/<meta name="description"[^>]*>/g, (match) => {
      count++
      return count < descMatches.length ? '' : match
    })
  }

  const kwMatches = [...html.matchAll(/<meta name="keywords"[^>]*>/g)]
  if (kwMatches.length > 1) {
    let count = 0
    html = html.replace(/<meta name="keywords"[^>]*>/g, (match) => {
      count++
      return count < kwMatches.length ? '' : match
    })
  }

  const authorMatches = [...html.matchAll(/<meta name="author"[^>]*>/g)]
  if (authorMatches.length > 1) {
    let count = 0
    html = html.replace(/<meta name="author"[^>]*>/g, (match) => {
      count++
      return count < authorMatches.length ? '' : match
    })
  }

  const robotsMatches = [...html.matchAll(/<meta name="robots"[^>]*>/g)]
  if (robotsMatches.length > 1) {
    let count = 0
    html = html.replace(/<meta name="robots"[^>]*>/g, (match) => {
      count++
      return count < robotsMatches.length ? '' : match
    })
  }

  const canonMatches = [...html.matchAll(/<link rel="canonical"[^>]*>/g)]
  if (canonMatches.length > 1) {
    let count = 0
    html = html.replace(/<link rel="canonical"[^>]*>/g, (match) => {
      count++
      return count < canonMatches.length ? '' : match
    })
  }

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

  // ─── FIX: Support Netlify's Chrome/Puppeteer environment ───
  const isNetlify = process.env.NETLIFY === 'true'
  const browserOptions = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  }

  // On Netlify, install Chrome first if needed
  if (isNetlify) {
    const { execSync } = await import('child_process')
    try {
      execSync('npx puppeteer browsers install chrome', { stdio: 'inherit' })
      console.log('✅ Chrome installed for Netlify environment')
    } catch (e) {
      console.log('⚠️  Chrome install attempted:', e.message)
    }
  }

  const browser = await puppeteer.launch(browserOptions)

  for (const route of ROUTES) {
    const url = `http://localhost:5999${route}`
    console.log(`📄 Prerendering ${url}...`)

    const page = await browser.newPage()
    await page.setExtraHTTPHeaders({ 'Accept-Charset': 'utf-8' })
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })

    await page.waitForFunction(
      () => !document.querySelector('.fixed.inset-0.z-\\[9999\\]'),
      { timeout: 30000 }
    ).catch(() => console.log(`⚠️  Spinner timeout on ${route}, saving anyway...`))

    await new Promise(resolve => setTimeout(resolve, 3000))

    let html = await page.content()
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

  // ─── FIX: Copy sitemap with trailing slashes to dist ───────
  const sitemapSrc  = path.join(process.cwd(), 'public', 'sitemap.xml')
  const sitemapDest = path.join(process.cwd(), 'dist',   'sitemap.xml')
  if (fs.existsSync(sitemapSrc)) {
    fs.copyFileSync(sitemapSrc, sitemapDest)
    console.log('✅ sitemap.xml copied to dist/')
  } else {
    console.log('⚠️  public/sitemap.xml not found — skipping copy')
  }

  console.log('🎉 Prerendering complete!')
}

prerender().catch(err => {
  console.error('❌ Prerender failed:', err)
  process.exit(1)
})
