/**
 * Low-cost page inspection — no browser, no Chrome, ~40 MB and a second or two.
 *
 * A headless Chrome costs roughly 1.4 GB across twenty-odd processes and stays
 * resident. Most of what we actually check does not need a layout engine: the
 * copy that ships, whether a banned phrase survived, which images a page
 * references, how heavy the payload is, whether metadata is right. This fetches
 * the server-rendered HTML and answers those from the markup.
 *
 * Reach for a real browser ONLY for things that genuinely need layout or paint:
 * measured section heights, overlap, and screenshots.
 *
 *   npx tsx scripts/inspect.ts                     # every route
 *   npx tsx scripts/inspect.ts /projects /studio   # named routes
 *   npx tsx scripts/inspect.ts --grep="tinh tế"    # hunt a string everywhere
 *   npx tsx scripts/inspect.ts --json              # machine-readable
 */

const BASE = process.env.INSPECT_BASE ?? 'http://localhost:3000'

const DEFAULT_ROUTES = [
  '/',
  '/projects',
  '/studio',
  '/services',
  '/journal',
  '/contact',
] as const

/** Phrases the copy passes have banned. A hit is a defect, not a warning. */
const BANNED = [
  'đẳng cấp',
  'sang trọng bậc nhất',
  'tinh tế',
  'giải pháp toàn diện',
  'trải nghiệm hoàn hảo',
  'chạm đến cảm xúc',
  'nâng tầm không gian',
  'kiến tạo',
  'tối ưu hoá công năng',
  'Ít vật liệu hơn',
  'chăm chút',
  'nhịp sống thật',
  'Đã có lỗi xảy ra',
] as const

interface Finding {
  kind: 'banned' | 'typography' | 'meta' | 'image' | 'structure'
  detail: string
}

interface RouteReport {
  route: string
  status: number
  ms: number
  bytes: number
  title: string | null
  description: string | null
  h1: string[]
  images: number
  imagesWithoutAlt: number
  headings: number
  findings: Finding[]
}

function textOf(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function attr(tag: string, name: string): string | null {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, 'i'))
  return m?.[1] ?? null
}

function all(html: string, re: RegExp): string[] {
  return Array.from(html.matchAll(re), (m) => m[0])
}

/**
 * The typography defects the client called "lỗi khoảng trống". Checked against
 * rendered text, not source, so a defect that only appears after interpolation
 * is still caught.
 */
function typographyFindings(text: string): Finding[] {
  const out: Finding[] = []
  const push = (detail: string): void => {
    if (out.length < 8) out.push({ kind: 'typography', detail })
  }

  // A space before closing punctuation. Excludes "..." and decimals.
  for (const m of text.matchAll(/\S\s+([,;:.!?])(?=\s|$)/g)) {
    const at = m.index ?? 0
    push(`space before "${m[1]}" — …${text.slice(Math.max(0, at - 34), at + 4).trim()}…`)
  }
  for (const m of text.matchAll(/ /g)) {
    const at = m.index ?? 0
    push(`non-breaking space — …${text.slice(Math.max(0, at - 30), at + 20).trim()}…`)
  }
  // An unspaced em dash between letters reads as a hyphenation error.
  for (const m of text.matchAll(/\p{L}—\p{L}/gu)) {
    const at = m.index ?? 0
    push(`unspaced em dash — …${text.slice(Math.max(0, at - 26), at + 26).trim()}…`)
  }
  // Worth knowing, not automatically wrong: the short form is idiomatic in a
  // compact metadata label ("Quận 7, TP.HCM") where the full name would crowd
  // the column, while prose wants the full name. Reported so a human decides,
  // never as a defect.
  if (/TP\.HCM/.test(text) && /TP\. Hồ Chí Minh/.test(text)) {
    push('note: both "TP.HCM" and "TP. Hồ Chí Minh" appear — check they are label vs prose, not drift')
  }
  if (/tỉ lệ/.test(text) && /tỷ lệ/.test(text)) {
    push('both "tỉ lệ" and "tỷ lệ" on one page')
  }
  return out
}

async function inspect(route: string): Promise<RouteReport> {
  const started = Date.now()
  const res = await fetch(`${BASE}${route}`, { headers: { 'user-agent': 'an-atelier-inspect' } })
  const html = await res.text()
  const ms = Date.now() - started
  const text = textOf(html).replace(/\s+/g, ' ').trim()

  const imgTags = all(html, /<img\b[^>]*>/gi)
  const headTags = all(html, /<h[1-6]\b[^>]*>/gi)
  const h1 = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi), (m) =>
    textOf(m[1] ?? '').replace(/\s+/g, ' ').trim(),
  )

  const findings: Finding[] = []

  for (const phrase of BANNED) {
    if (text.toLowerCase().includes(phrase.toLowerCase())) {
      findings.push({ kind: 'banned', detail: `"${phrase}" is being served` })
    }
  }
  findings.push(...typographyFindings(text))

  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? null
  const descTag = all(html, /<meta\b[^>]*>/gi).find((t) => /name="description"/i.test(t))
  const description = descTag ? attr(descTag, 'content') : null

  if (!titleTag) findings.push({ kind: 'meta', detail: 'no <title>' })
  if (!description) findings.push({ kind: 'meta', detail: 'no meta description' })

  // `alt=""` is not a defect — it is the correct markup for an image whose
  // meaning is already carried by adjacent text, which is exactly the case for
  // the thumbnails in the dense project rows. A MISSING alt attribute is the
  // real failure, because a screen reader then falls back to reading the URL.
  const noAlt = imgTags.filter((t) => attr(t, 'alt') === null)
  const decorative = imgTags.filter((t) => attr(t, 'alt')?.trim() === '').length
  if (noAlt.length > 0) {
    findings.push({ kind: 'image', detail: `${noAlt.length} <img> with no alt attribute at all` })
  }
  if (decorative > 0 && decorative === imgTags.length) {
    findings.push({ kind: 'image', detail: `every image on the page is marked decorative (alt="")` })
  }
  if (imgTags.length === 0 && route !== '/contact') {
    findings.push({ kind: 'image', detail: 'no images rendered server-side' })
  }
  if (h1.length === 0) findings.push({ kind: 'structure', detail: 'no <h1>' })
  if (h1.length > 1) findings.push({ kind: 'structure', detail: `${h1.length} <h1> elements` })

  return {
    route,
    status: res.status,
    ms,
    bytes: Buffer.byteLength(html),
    title: titleTag,
    description,
    h1,
    images: imgTags.length,
    imagesWithoutAlt: noAlt.length,
    headings: headTags.length,
    findings,
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const json = args.includes('--json')
  const grepArg = args.find((a) => a.startsWith('--grep='))
  const routes = args.filter((a) => a.startsWith('/'))
  const list = routes.length > 0 ? routes : [...DEFAULT_ROUTES]

  const reports: RouteReport[] = []
  for (const route of list) {
    try {
      reports.push(await inspect(route))
    } catch (error) {
      console.error(`  ${route} — unreachable: ${(error as Error).message}`)
    }
  }

  if (grepArg) {
    const needle = grepArg.slice('--grep='.length).toLowerCase()
    console.log(`\nsearching for "${needle}"\n`)
    for (const route of list) {
      const res = await fetch(`${BASE}${route}`)
      const text = textOf(await res.text()).replace(/\s+/g, ' ')
      const at = text.toLowerCase().indexOf(needle)
      console.log(
        at === -1
          ? `  ${route.padEnd(14)} not found`
          : `  ${route.padEnd(14)} FOUND — …${text.slice(Math.max(0, at - 50), at + 60).trim()}…`,
      )
    }
    return
  }

  if (json) {
    console.log(JSON.stringify(reports, null, 1))
    return
  }

  let defects = 0
  console.log('\nGuHomes — page inspection (no browser)\n')
  console.log('  route         code    ms     KB  imgs  hN   issues')
  console.log('  ' + '-'.repeat(56))
  for (const r of reports) {
    defects += r.findings.length
    console.log(
      `  ${r.route.padEnd(13)} ${String(r.status).padStart(3)} ${String(r.ms).padStart(5)} ` +
        `${String(Math.round(r.bytes / 1024)).padStart(6)} ${String(r.images).padStart(5)} ` +
        `${String(r.headings).padStart(3)}   ${r.findings.length === 0 ? '·' : String(r.findings.length)}`,
    )
  }

  for (const r of reports) {
    if (r.findings.length === 0) continue
    console.log(`\n  ${r.route}`)
    for (const f of r.findings) console.log(`    [${f.kind}] ${f.detail}`)
  }

  console.log(
    defects === 0
      ? '\n  clean\n'
      : `\n  ${defects} issue(s)\n`,
  )
  if (defects > 0) process.exitCode = 1
}

await main()

export {}
