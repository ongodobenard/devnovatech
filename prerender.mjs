import puppeteer from 'puppeteer'
import { preview } from 'vite'
import fs from 'fs'
import path from 'path'

const ROUTES = ['/', '/about', '/services', '/projects', '/contact', '/quote']

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

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })

    // Wait for the loading spinner to disappear
    await page.waitForFunction(
      () => !document.querySelector('.fixed.inset-0.z-\\[9999\\]'),
      { timeout: 30000 }
    ).catch(() => console.log(`⚠️  Spinner timeout on ${route}, saving anyway...`))

    // Extra wait to ensure React has fully rendered
    await new Promise(resolve => setTimeout(resolve, 3000))

    const html = await page.content()

    const routePath = route === '/' ? '/index.html' : `${route}/index.html`
    const filePath = path.join(process.cwd(), 'dist', routePath)

    fs.mkdirSync(path.dirname(filePath), { recursive: true })
    fs.writeFileSync(filePath, html)

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
