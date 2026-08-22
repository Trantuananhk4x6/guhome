/**
 * Weigh what a visitor actually downloads, then exit.
 *
 * Every claim about this site being "lighter" has to survive a number, and the
 * only number that means anything is transfer size over the wire on a cold
 * cache — not the bundle report, which counts uncompressed bytes for chunks the
 * page may never request, and not `du` on `.next`, which counts the server
 * build too.
 *
 * So this drives the installed Chrome through CDP, reads `encodedDataLength`
 * off every response, and totals it by kind. One browser starts, walks the
 * routes, and closes — the same bargain as `shots.ts`, because a resident
 * headless browser costs ~1.4 GB on this machine and makes it unusable.
 *
 * Two measurements per route, and the difference between them is the point:
 *
 *   arrival   what lands if the visitor reads what is on screen and leaves.
 *             This is the number that decides whether the site feels instant.
 *   engaged   arrival plus everything the page fetches once it is scrolled and
 *             the pointer has moved — deferred 3D, lazy images, late chunks.
 *             Work moved from arrival to engaged is not work deleted, and a
 *             table that only shows arrival can hide a regression here.
 *
 * Run it against a PRODUCTION build (`next build && next start`). Against
 * `next dev` the numbers are fiction: unminified, unsplit, HMR attached.
 *
 *   npx tsx scripts/perf.ts                       # every route
 *   npx tsx scripts/perf.ts --only=/              # one
 *   npx tsx scripts/perf.ts --json=perf.json      # for diffing two runs
 *   PERF_BASE=http://localhost:3100 npx tsx scripts/perf.ts
 */

import { existsSync, writeFileSync } from 'node:fs'

import { chromium, type Browser, type Page, type Response } from 'playwright-core'

const BASE = process.env.PERF_BASE ?? 'http://localhost:3100'

/** Chrome as installed on this machine; Playwright's own download is not needed. */
const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]

const ROUTES = [
  '/',
  '/projects',
  '/projects/hoi-tho-hinoki',
  '/studio',
  '/services',
  '/journal',
  '/contact',
] as const

/** How long to let the page keep fetching after it is scrolled and nudged. */
const ENGAGE_MS = 6000

type Kind = 'document' | 'script' | 'style' | 'image' | 'font' | 'media' | 'other'

interface Hit {
  url: string
  kind: Kind
  bytes: number
}

interface Phase {
  bytes: number
  count: number
  byKind: Record<Kind, number>
}

interface RouteResult {
  route: string
  arrival: Phase
  engaged: Phase
  /** The heaviest few things that arrive, so a regression has a suspect. */
  worst: Array<{ url: string; kb: number }>
  /**
   * Every arrival request, written to `--json` only. The console table is for
   * reading; this is for the question the table always provokes next — "what
   * exactly is in the 227 KB of `other`?" — which is unanswerable from totals.
   */
  hits: Array<{ url: string; kind: Kind; kb: number }>
}

const EMPTY_KINDS = (): Record<Kind, number> => ({
  document: 0,
  script: 0,
  style: 0,
  image: 0,
  font: 0,
  media: 0,
  other: 0,
})

/**
 * Chrome's resource type is the honest source for what a byte was FOR — the
 * extension lies constantly here, because `next/image` serves every photograph
 * from `/_next/image?url=…&w=…` with no extension at all, and the 3D models
 * arrive as `.bin` payloads inside a GLB fetch.
 */
function classify(response: Response): Kind {
  const type = response.request().resourceType()
  if (type === 'document') return 'document'
  if (type === 'script') return 'script'
  if (type === 'stylesheet') return 'style'
  if (type === 'image') return 'image'
  if (type === 'font') return 'font'
  if (type === 'media') return 'media'
  // Fetch/XHR covers both the RSC payloads and the GLB/DRACO downloads. Split
  // them, because "the 3D got heavier" and "the data layer got chattier" are
  // different problems with different fixes.
  const url = response.url()
  if (/\.(glb|gltf|bin|drc|ktx2|hdr|exr)(\?|$)/i.test(url)) return 'media'
  return 'other'
}

function tally(hits: Hit[]): Phase {
  const byKind = EMPTY_KINDS()
  let bytes = 0
  for (const hit of hits) {
    byKind[hit.kind] += hit.bytes
    bytes += hit.bytes
  }
  return { bytes, count: hits.length, byKind }
}

async function measure(page: Page, route: string): Promise<RouteResult> {
  const hits: Hit[] = []


  const onResponse = (response: Response): void => {

    void response
      .request()
      .sizes()
      .then((sizes) => {
        // `encodedDataLength` is what crossed the wire: compressed body plus
        // headers. `body.length` after decompression would roughly double every
        // text asset and make the table meaningless.
        const bytes = sizes.responseBodySize + sizes.responseHeadersSize
        hits.push({ url: response.url(), kind: classify(response), bytes })
      })
      .catch(() => {
        // A response that never completes (aborted preload, navigation race)
        // has no size to report. Dropping it is right: nothing crossed the wire.
      })
  }

  page.on('response', onResponse)

  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60_000 })
  const arrival = tally([...hits])
  const arrivalCount = hits.length

  // Now behave like a reader: move the pointer (some work is gated on intent),
  // then scroll the whole page so every lazy boundary is crossed.
  await page.mouse.move(400, 400)
  await page.mouse.move(700, 520)
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.9
    const end = document.body.scrollHeight
    for (let y = 0; y < end; y += step) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(ENGAGE_MS)


  page.off('response', onResponse)
  const engaged = tally(hits)

  const worst = hits
    .slice(0, arrivalCount)
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 4)
    .map((hit) => ({
      url: hit.url.replace(BASE, '').replace(/\?url=([^&]+).*/, (_m, u) => `?${decodeURIComponent(u)}`),
      kb: Math.round(hit.bytes / 1024),
    }))

  const shorten = (url: string): string =>
    url.replace(BASE, '').replace(/\?url=([^&]+).*/, (_m, u) => `?${decodeURIComponent(u)}`)

  return {
    route,
    arrival,
    engaged,
    worst,
    hits: hits.slice(0, arrivalCount).map((hit) => ({
      url: shorten(hit.url),
      kind: hit.kind,
      kb: Math.round((hit.bytes / 1024) * 10) / 10,
    })),
  }
}

/*
 * These two run INSIDE the page, and they are strings on purpose.
 *
 * tsx compiles this file with esbuild's `keepNames`, which rewrites every named
 * function — including a `const tick = () => {}` — into a call to a `__name`
 * helper. That helper is defined in this module's scope, not the page's, so a
 * function literal passed to `page.evaluate` dies on arrival with
 * `ReferenceError: __name is not defined`. Source text is handed to the page
 * verbatim and never touches the compiler. `shots.ts` learned this the same way.
 */
const INSTALL_PROBE = `(() => {
  const state = { frames: [], longTasks: [], cls: 0, last: performance.now() }
  window.__perf = state
  requestAnimationFrame(function loop(now) {
    state.frames.push(now - state.last)
    state.last = now
    requestAnimationFrame(loop)
  })
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) state.longTasks.push(entry.duration)
  }).observe({ entryTypes: ['longtask'] })
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) state.cls += entry.value
    }
  }).observe({ type: 'layout-shift', buffered: true })
})()`

const READ_PROBE = `(() => {
  const state = window.__perf
  // Drop the first few: the observer's own first frames are noise.
  const frames = state.frames.slice(3).sort((a, b) => a - b)
  const at = (q) => Math.round((frames[Math.min(frames.length - 1, Math.floor(frames.length * q))] || 0) * 10) / 10
  return {
    frames: frames.length,
    p50: at(0.5),
    p95: at(0.95),
    dropped: frames.filter((f) => f > 33.4).length,
    longTasks: state.longTasks.length,
    blockingMs: Math.round(state.longTasks.reduce((sum, d) => sum + Math.max(0, d - 50), 0)),
    cls: Math.round(state.cls * 1000) / 1000,
  }
})()`

interface Jank {
  route: string
  /** Frames the compositor actually produced during the scroll. */
  frames: number
  /** Median and worst-decile frame interval. 16.7ms is one frame at 60Hz. */
  p50: number
  p95: number
  /** Frames that took longer than two frame budgets — the ones you SEE. */
  dropped: number
  /** Main-thread tasks over 50ms, and their total blocking cost. */
  longTasks: number
  blockingMs: number
  /** Layout shift accumulated after arrival, which reads as the page "jumping". */
  cls: number
}

/**
 * Scroll the page the way a reader does and watch the main thread.
 *
 * Bytes are only half of "heavy". A site can arrive in 500 KB and still feel
 * like mud if every scroll frame runs a GSAP timeline, a ScrollTrigger refresh
 * and a Lenis interpolation — so this measures the thing the complaint is
 * actually about: whether frames land on time while the page moves.
 *
 * Wheel events, not `scrollTo`. Lenis intercepts the wheel and drives scroll
 * itself; jumping the scroll position bypasses exactly the code under test.
 */
async function measureJank(page: Page, route: string): Promise<Jank> {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle', timeout: 60_000 })
  // Let arrival animations finish, so we measure steady-state scrolling rather
  // than the intro — the intro is once, the scroll is the whole visit.
  await page.waitForTimeout(1500)

  await page.evaluate(INSTALL_PROBE)

  // Roughly one flick per 100ms for four seconds — brisk, but a real reading pace.
  for (let i = 0; i < 40; i += 1) {
    await page.mouse.wheel(0, 260)
    await page.waitForTimeout(100)
  }

  const raw = (await page.evaluate(READ_PROBE)) as Omit<Jank, 'route'>
  return { route, ...raw }
}

function kb(bytes: number): string {
  return `${(bytes / 1024).toFixed(0)} KB`
}

function report(results: RouteResult[]): void {
  const pad = (text: string, width: number): string => text.padEnd(width)
  const routeWidth = Math.max(...results.map((r) => r.route.length), 6)

  console.log('')
  console.log(`  ${pad('route', routeWidth)}  ${pad('arrival', 12)}${pad('req', 6)}${pad('engaged', 12)}req`)
  console.log(`  ${'-'.repeat(routeWidth + 36)}`)
  for (const result of results) {
    console.log(
      `  ${pad(result.route, routeWidth)}  ${pad(kb(result.arrival.bytes), 12)}` +
        `${pad(String(result.arrival.count), 6)}` +
        `${pad(kb(result.engaged.bytes), 12)}${result.engaged.count}`,
    )
  }

  console.log('')
  console.log('  on arrival, by kind')
  console.log(`  ${'-'.repeat(routeWidth + 36)}`)
  for (const result of results) {
    const parts = (Object.entries(result.arrival.byKind) as Array<[Kind, number]>)
      .filter(([, bytes]) => bytes > 1024)
      .sort((a, b) => b[1] - a[1])
      .map(([kind, bytes]) => `${kind} ${kb(bytes)}`)
    console.log(`  ${pad(result.route, routeWidth)}  ${parts.join('  ')}`)
  }

  console.log('')
  console.log('  heaviest single downloads on arrival')
  console.log(`  ${'-'.repeat(routeWidth + 36)}`)
  for (const result of results) {
    for (const item of result.worst) {
      console.log(`  ${pad(result.route, routeWidth)}  ${pad(`${item.kb} KB`, 10)}${item.url}`)
    }
  }
  console.log('')
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  const only = argv.find((a) => a.startsWith('--only='))?.slice(7)
  const runtime = argv.includes('--runtime')
  const json = argv.find((a) => a.startsWith('--json='))?.slice(7)
  const routes = only ? ROUTES.filter((r) => r === only) : ROUTES

  if (routes.length === 0) {
    console.error(`No route matches --only=${only}. Known routes:\n  ${ROUTES.join('\n  ')}`)
    process.exitCode = 1
    return
  }

  const probe = await fetch(BASE, { method: 'HEAD' }).catch(() => null)
  if (!probe) {
    console.error(
      [
        `Nothing is serving ${BASE}.`,
        'This measures a production build, so start one first:',
        '  npm run build && npx next start -p 3100',
      ].join('\n'),
    )
    process.exitCode = 1
    return
  }

  // `require` does not exist under tsx's ESM loader, and a bare try/catch around
  // it swallows the ReferenceError into "no Chrome found" — which then falls
  // through to Playwright's own browser, which was never downloaded.
  const executablePath = CHROME_CANDIDATES.find((path) => existsSync(path))
  if (!executablePath) {
    console.error(['No installed Chrome found. Looked in:', ...CHROME_CANDIDATES].join('\n  '))
    process.exitCode = 1
    return
  }

  let browser: Browser | undefined
  try {
    browser = await chromium.launch({ executablePath, args: ['--disable-dev-shm-usage'] })
    if (runtime) {
      const janks: Jank[] = []
      for (const route of routes) {
        const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
        const page = await context.newPage()
        process.stdout.write(`  scrolling ${route} … `)
        const jank = await measureJank(page, route)
        process.stdout.write(`p95 ${jank.p95}ms, ${jank.dropped} dropped
`)
        janks.push(jank)
        await context.close()
      }
      const routeWidth = Math.max(...janks.map((j) => j.route.length), 6)
      const pad = (t: string, w: number): string => t.padEnd(w)
      console.log('')
      console.log(
        `  ${pad('route', routeWidth)}  ${pad('p50', 8)}${pad('p95', 9)}${pad('dropped', 10)}${pad('longtasks', 12)}${pad('blocking', 11)}CLS`,
      )
      console.log(`  ${'-'.repeat(routeWidth + 52)}`)
      for (const j of janks) {
        console.log(
          `  ${pad(j.route, routeWidth)}  ${pad(`${j.p50}ms`, 8)}${pad(`${j.p95}ms`, 9)}` +
            `${pad(`${j.dropped}/${j.frames}`, 10)}${pad(String(j.longTasks), 12)}` +
            `${pad(`${j.blockingMs}ms`, 11)}${j.cls}`,
        )
      }
      console.log('')
      console.log('  p50/p95 are frame intervals while scrolling. 16.7ms is one frame at 60Hz;')
      console.log('  anything over 33ms is a frame the reader sees drop. blocking is time spent')
      console.log('  in main-thread tasks past the 50ms an input can wait without feeling stuck.')
      console.log('')
      if (json) {
        writeFileSync(json, JSON.stringify(janks, null, 2))
        console.log(`  written to ${json}
`)
      }
      return
    }

    const results: RouteResult[] = []
    for (const route of routes) {
      // A fresh context per route, so route B never benefits from route A's
      // cache. Sharing one would make every route after the first look free.
      const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
      const page = await context.newPage()
      process.stdout.write(`  measuring ${route} … `)
      const result = await measure(page, route)
      process.stdout.write(`${kb(result.arrival.bytes)} → ${kb(result.engaged.bytes)}\n`)
      results.push(result)
      await context.close()
    }
    report(results)
    if (json) {
      writeFileSync(json, JSON.stringify(results, null, 2))
      console.log(`  written to ${json}\n`)
    }
  } finally {
    await browser?.close()
  }
}

void main()
