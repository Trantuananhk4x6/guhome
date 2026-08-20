/**
 * Capture the whole site to PNG, then exit.
 *
 * UI cannot be judged from markup — text wraps, boxes collide, a scrim is either
 * dark enough or it is not. But a resident headless browser costs ~1.4 GB across
 * twenty processes and made this machine unusable, so nothing here stays open:
 * one browser starts, shoots every route at every breakpoint, and closes. Peak is
 * a couple of hundred MB for under a minute.
 *
 * It drives the Chrome that is already installed rather than downloading
 * Playwright's own, so this adds a 2 MB library and no browser.
 *
 * Reduced motion is emulated for every shot. That is not a compromise — it puts
 * every reveal in its FINAL state, which is exactly what you want to judge
 * composition. Judging motion is a separate job and needs a video, not a frame.
 *
 *   npx tsx scripts/shots.ts                  # everything
 *   npx tsx scripts/shots.ts --only=m-home    # one set
 *   npx tsx scripts/shots.ts --out=docs/x     # elsewhere
 */

import { mkdirSync, writeFileSync, readdirSync, rmSync, existsSync } from 'node:fs'
import { join } from 'node:path'

import { chromium, type Browser, type Page } from 'playwright-core'

const BASE = process.env.SHOTS_BASE ?? 'http://localhost:3000'

/** Chrome as installed on this machine; Playwright's own download is not needed. */
const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]

interface Shot {
  /** File prefix, also the `--only` filter. */
  name: string
  path: string
  width: number
  height: number
  /** Scroll offsets to capture. 0 is always the arrival view. */
  at: number[]
}

const SHOTS: readonly Shot[] = [
  { name: 'd-home', path: '/', width: 1600, height: 1000, at: [0, 1000, 2200, 3600, 5200, 7000, 8800] },
  { name: 'd-projects', path: '/projects', width: 1600, height: 1000, at: [0, 1000, 2400] },
  { name: 'd-slug', path: '/projects/tam-rem-be-tong', width: 1600, height: 1000, at: [0, 1100, 2600] },
  { name: 'd-studio', path: '/studio', width: 1600, height: 1000, at: [0, 1100, 2400] },
  { name: 'd-services', path: '/services', width: 1600, height: 1000, at: [0, 1100] },
  { name: 'd-journal', path: '/journal', width: 1600, height: 1000, at: [0, 900] },
  { name: 'd-contact', path: '/contact', width: 1600, height: 1000, at: [0] },
  { name: 'm-home', path: '/', width: 390, height: 844, at: [0, 800, 1800, 3000] },
  { name: 'm-projects', path: '/projects', width: 390, height: 844, at: [0, 900] },
  { name: 'm-slug', path: '/projects/tam-rem-be-tong', width: 390, height: 844, at: [0, 1000] },
  { name: 'm-studio', path: '/studio', width: 390, height: 844, at: [0, 900] },
  { name: 't-home', path: '/', width: 1024, height: 900, at: [0, 900] },
  { name: 'w-home', path: '/', width: 2560, height: 1100, at: [0, 1300] },
]

interface SectionBox {
  key: string
  top: number
  height: number
}

interface Measurement {
  name: string
  url: string
  viewport: string
  pageHeight: number
  /** Elements whose box escapes the viewport horizontally — a layout defect. */
  overflowing: string[]
  sections: SectionBox[]
}

function chromePath(): string {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p))
  if (!found) {
    throw new Error(
      `No Chrome found. Set one of:\n  ${CHROME_CANDIDATES.join('\n  ')}\nor install Google Chrome.`,
    )
  }
  return found
}

async function measure(page: Page): Promise<Omit<Measurement, 'name' | 'url' | 'viewport'>> {
  return page.evaluate(() => {
    const secs = Array.from(
      document.querySelectorAll('[data-home-section], main > section, main > div > section, footer'),
    )
      .slice(0, 16)
      .map((el) => {
        const box = el.getBoundingClientRect()
        return {
          key:
            el.getAttribute('data-home-section') ??
            el.tagName.toLowerCase() + '.' + String(el.className).split(/\s+/).slice(0, 2).join('.'),
          top: Math.round(box.top + window.scrollY),
          height: Math.round(box.height),
        }
      })

    // Anything wider than the viewport is a horizontal-scroll bug, and the body
    // usually hides it with overflow-x, so it never announces itself.
    const vw = document.documentElement.clientWidth
    const overflowing = Array.from(document.querySelectorAll('main *'))
      .filter((el) => {
        const b = el.getBoundingClientRect()
        return b.width > 0 && (b.right > vw + 2 || b.left < -2)
      })
      .slice(0, 6)
      .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0, 3).join('.')}`)

    return { pageHeight: document.body.scrollHeight, overflowing, sections: secs }
  })
}

async function capture(browser: Browser, shot: Shot, dir: string): Promise<Measurement> {
  const ctx = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    locale: 'vi-VN',
  })
  const page = await ctx.newPage()
  try {
    await page.goto(`${BASE}${shot.path}`, { waitUntil: 'networkidle', timeout: 60_000 })
  } catch {
    // A slow first compile can blow the networkidle budget; the page is usually
    // still usable, so shoot it rather than losing the whole set.
    await page.waitForTimeout(2_000)
  }
  await page.waitForTimeout(1_400)

  const m = await measure(page)
  for (const y of shot.at) {
    await page.evaluate((yy: number) => window.scrollTo(0, yy), y)
    await page.waitForTimeout(420)
    await page.screenshot({ path: join(dir, `${shot.name}-${String(y).padStart(5, '0')}.png`) })
  }
  await ctx.close()
  return { name: shot.name, url: shot.path, viewport: `${shot.width}x${shot.height}`, ...m }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const only = args.find((a) => a.startsWith('--only='))?.slice('--only='.length)
  const out = args.find((a) => a.startsWith('--out='))?.slice('--out='.length) ?? 'docs/ui-audit'

  const list = only ? SHOTS.filter((s) => s.name.includes(only)) : SHOTS
  if (list.length === 0) {
    console.error(`No shot matches --only=${only}. Names: ${SHOTS.map((s) => s.name).join(', ')}`)
    process.exitCode = 1
    return
  }

  const dir = join(process.cwd(), out)
  if (!only && existsSync(dir)) {
    for (const f of readdirSync(dir)) {
      if (f.endsWith('.png')) rmSync(join(dir, f))
    }
  }
  mkdirSync(dir, { recursive: true })

  const browser = await chromium.launch({ executablePath: chromePath(), headless: true })
  const measurements: Measurement[] = []
  try {
    for (const shot of list) {
      const m = await capture(browser, shot, dir)
      measurements.push(m)
      const flag = m.overflowing.length > 0 ? `  OVERFLOW: ${m.overflowing.length}` : ''
      console.log(
        `  ${shot.name.padEnd(12)} ${m.viewport.padEnd(10)} ${String(m.pageHeight).padStart(6)}px  ` +
          `${shot.at.length} shots${flag}`,
      )
    }
  } finally {
    // The whole point: nothing stays resident.
    await browser.close()
  }

  writeFileSync(join(dir, 'measurements.json'), JSON.stringify(measurements, null, 1))
  const pngs = readdirSync(dir).filter((f) => f.endsWith('.png')).length
  console.log(`\n${pngs} screenshots + measurements.json in ${out}\n`)

  const bad = measurements.filter((m) => m.overflowing.length > 0)
  if (bad.length > 0) {
    console.log('Horizontal overflow (would scroll the page sideways):')
    for (const m of bad) console.log(`  ${m.name} — ${m.overflowing.join(', ')}`)
  }
}

await main()

export {}
