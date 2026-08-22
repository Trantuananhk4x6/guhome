/**
 * Prove the 3D actually paints, and that scrolling still moves it.
 *
 * This existed as a hole for a long time. Every other check on this site reads
 * markup or measures bytes, and none of them can see a WebGL canvas — so the
 * scenes were shipped on the strength of the code being right, which is not the
 * same as the code working. Headless Chrome has no GPU, WebGL is absent, and
 * `capability.ts` correctly answers "no canvas" and renders the photograph
 * instead. The fallback is indistinguishable from success in a screenshot.
 *
 * Two things get it off the ground:
 *
 *   1. SwiftShader rasterises WebGL on the CPU. Far slower than any visitor's
 *      machine, and useless for judging frame rate — but pixel-correct, which is
 *      all this needs.
 *   2. `capability.ts` refuses a software renderer by name, so the page is given
 *      a real GPU string. That is not cheating around the check; the check is
 *      about the visitor's hardware, and here we are deliberately asking what
 *      the scene DRAWS, not whether it should.
 *
 * The assertion that matters is the second screenshot. Under `frameloop="demand"`
 * the hero only redraws when something asks it to, so if the scroll wake-up in
 * CameraPath ever regresses, the camera silently freezes and the page still
 * looks fine in a single frame. Comparing before and after a scroll is the only
 * thing that catches it.
 *
 *   npx tsx scripts/verify-3d.ts
 *   npx tsx scripts/verify-3d.ts --keep    # leave the PNGs in .tmp for a look
 *
 * Exits non-zero on failure, so it can gate a deploy.
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

import { chromium } from 'playwright-core'

const BASE = process.env.PERF_BASE ?? 'http://localhost:3100'
const OUT = '.tmp'

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
]

/** Routes that should mount a canvas, and what to call them in the report. */
const SCENES = [
  { route: '/', name: 'home hero' },
  { route: '/projects/hoi-tho-hinoki', name: 'project scene' },
] as const

/**
 * `WEBGL_debug_renderer_info` reports through `getParameter`, so one patch on
 * both context prototypes covers every consumer. Kept as source text: this is
 * handed to the page verbatim and must not pass through esbuild, which would
 * rewrite the named function into a `__name` helper the page does not have.
 */
const SPOOF_GPU = `(() => {
  const spoof = 'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)'
  const UNMASKED_RENDERER = 0x9246
  const UNMASKED_VENDOR = 0x9245
  for (const proto of [WebGLRenderingContext.prototype, WebGL2RenderingContext.prototype]) {
    const real = proto.getParameter
    proto.getParameter = function (parameter) {
      if (parameter === UNMASKED_RENDERER || parameter === UNMASKED_VENDOR) return spoof
      return real.call(this, parameter)
    }
  }
})()`

/** Long, because SwiftShader draws a bloomed interior in seconds, not frames. */
const SETTLE_MS = 4000

async function main(): Promise<void> {
  const keep = process.argv.includes('--keep')

  if (!(await fetch(BASE, { method: 'HEAD' }).catch(() => null))) {
    console.error(`Nothing is serving ${BASE}. Start one:\n  npm run build && npx next start -p 3100`)
    process.exitCode = 1
    return
  }

  const executablePath = CHROME_CANDIDATES.find((path) => existsSync(path))
  if (!executablePath) {
    console.error(['No installed Chrome found. Looked in:', ...CHROME_CANDIDATES].join('\n  '))
    process.exitCode = 1
    return
  }

  if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

  const browser = await chromium.launch({
    executablePath,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--disable-dev-shm-usage'],
  })

  let failures = 0
  try {
    for (const scene of SCENES) {
      const context = await browser.newContext({ viewport: { width: 720, height: 480 } })
      await context.addInitScript(SPOOF_GPU)
      const page = await context.newPage()

      process.stdout.write(`  ${scene.name.padEnd(16)} `)
      await page.goto(`${BASE}${scene.route}`, { waitUntil: 'networkidle', timeout: 90_000 })

      // The scene is deferred behind visitor intent, so give it a real signal
      // rather than waiting out the idle backstop.
      await page.mouse.move(360, 240)

      // …and a scene that is not the hero will not mount at all until it is near
      // the viewport, because the observer that gates it is what keeps the rest
      // of the site from paying for it. Walk down the page looking for it, which
      // is also what a reader does.
      //
      // The canvas has to be laid out AND on screen to be worth shooting: the
      // loader mounts one at zero height for a moment, and a scene already
      // walked past is still in the DOM while being legitimately parked.
      let mounted = false
      for (let i = 0; i < 24 && !mounted; i += 1) {
        mounted = await page
          .waitForFunction(
            () => {
              const c = document.querySelector('canvas')
              if (!c) return false
              const box = c.getBoundingClientRect()
              return box.height > 120 && box.bottom > 0 && box.top < window.innerHeight
            },
            undefined,
            { timeout: 2500 },
          )
          .then(() => true)
          .catch(() => false)
        if (!mounted) await page.mouse.wheel(0, 700)
      }

      if (!mounted) {
        console.log('FAIL — no canvas mounted')
        failures += 1
        await context.close()
        continue
      }

      const canvas = page.locator('canvas').first()
      await page.waitForTimeout(SETTLE_MS)
      const before = await canvas.screenshot()

      // Small steps on purpose. A long scroll would carry the canvas out of the
      // viewport, and an off-screen scene is legitimately parked at
      // `frameloop="never"` — which would read as the very failure being tested.
      for (let i = 0; i < 6; i += 1) {
        await page.mouse.wheel(0, 120)
        await page.waitForTimeout(90)
      }
      await page.waitForTimeout(SETTLE_MS)
      const after = await canvas.screenshot()

      const slug = scene.route === '/' ? 'home' : scene.route.split('/').pop()
      if (keep) {
        writeFileSync(`${OUT}/3d-${slug}-top.png`, before)
        writeFileSync(`${OUT}/3d-${slug}-scrolled.png`, after)
      }

      // A canvas that renders one frame and then stops looks identical here.
      // That is the regression this whole script exists to catch.
      if (before.equals(after)) {
        console.log('FAIL — canvas did not change after scrolling (demand loop is not waking)')
        failures += 1
      } else {
        console.log(`ok — painted, and moved with the scroll`)
      }
      await context.close()
    }
  } finally {
    await browser.close()
  }

  console.log('')
  if (failures) {
    console.log(`  ${failures} scene${failures > 1 ? 's' : ''} failed.`)
    process.exitCode = 1
  } else if (keep) {
    console.log(`  PNGs in ${OUT}/`)
  }
}

void main()
