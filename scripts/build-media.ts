/**
 * AN ATELIER — media build.
 *
 *   npx tsx scripts/build-media.ts [--only=<substring>] [--limit=<n>] [--force]
 *                                  [--concurrency=<n>]
 *
 * Reads docs/inventory.json (105 leaf folders / 1486 photos under
 * MEDIA_SOURCE_ROOT) and emits web derivatives:
 *
 *   public/media/<slug>/<index>-<width>.webp     for every width <= source width
 *   public/media/manifest.json                   one entry per photo
 *   public/media/placeholder.svg                 fallback tile for missing media
 *
 * `<slug>` comes from src/data/content/*.json when a batch claims the folder
 * (`sourceDir` -> `slug`), otherwise it is derived from the folder path.
 * `<index>` is the photo's position in the inventory `files[]` array, so
 * `ProjectSeed.coverIndex` maps straight onto `storageKey = <slug>/<index>`.
 *
 * The run is resumable: a photo whose derivatives all exist and which is already
 * described by the previous manifest is skipped unless --force is passed.
 */
import { createHash } from 'node:crypto'
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { config as loadEnv } from 'dotenv'
import sharp from 'sharp'
import { MEDIA_WIDTHS } from '@/lib/media'
import { slugify } from '@/lib/utils'

/* --------------------------------- setup ---------------------------------- */

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..')

loadEnv({ path: path.join(REPO_ROOT, '.env.local'), quiet: true })

const SOURCE_ROOT = path.resolve(process.env.MEDIA_SOURCE_ROOT ?? 'D:/guhome')
const OUT_ROOT = path.resolve(REPO_ROOT, process.env.STORAGE_LOCAL_ROOT ?? './public/media')
const INVENTORY_PATH = path.join(REPO_ROOT, 'docs', 'inventory.json')
const CONTENT_DIR = path.resolve(REPO_ROOT, process.env.MEDIA_CONTENT_DIR ?? './src/data/content')
const MANIFEST_PATH = path.join(OUT_ROOT, 'manifest.json')
const PLACEHOLDER_PATH = path.join(OUT_ROOT, 'placeholder.svg')

const WEBP_QUALITY = 82
const WEBP_EFFORT = 4
const BLUR_WIDTH = 24
const PROGRESS_EVERY = 25

// libvips already threads internally; keep it modest so the promise pool,
// not the encoder, sets the level of parallelism.
sharp.concurrency(2)
sharp.cache({ files: 0 })

/* --------------------------------- types ---------------------------------- */

interface InventoryFolder {
  dir: string
  count: number
  mb: number
  files: string[]
}

interface ManifestEntry {
  /** `<slug>/<index>` — what `media.storage_key` and `media.url` are built from */
  storageKey: string
  /** inventory `dir`, verbatim */
  folder: string
  /** absolute path of the original photo */
  sourcePath: string
  /** position in the folder's inventory `files[]` */
  index: number
  /** intrinsic pixels of the source (EXIF orientation applied) */
  width: number
  height: number
  /** bytes of the largest derivative */
  bytes: number
  mime: string
  blurDataURL: string
  /** derivative widths that exist on disk, ascending */
  widths: number[]
  /** sha1 of the source file */
  checksum: string
  sourceBytes: number
  sourceMime: string
}

interface Options {
  only: string | null
  limit: number | null
  force: boolean
  concurrency: number
}

interface Task {
  folder: string
  slug: string
  index: number
  fileName: string
  sourcePath: string
}

interface Failure {
  sourcePath: string
  reason: string
}

/* ---------------------------------- cli ----------------------------------- */

function parseArgs(argv: readonly string[]): Options {
  const options: Options = { only: null, limit: null, force: false, concurrency: 6 }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    if (arg === undefined || !arg.startsWith('--')) continue

    if (arg === '--force') {
      options.force = true
      continue
    }
    if (arg === '--help' || arg === '-h') {
      printUsage()
      process.exit(0)
    }

    const eq = arg.indexOf('=')
    const name = eq === -1 ? arg : arg.slice(0, eq)
    const inline = eq === -1 ? null : arg.slice(eq + 1)
    const next = argv[i + 1]
    const value = inline ?? (next !== undefined && !next.startsWith('--') ? next : null)
    if (value === null) continue
    if (inline === null) i++

    switch (name) {
      case '--only':
        options.only = value
        break
      case '--limit': {
        const n = Number.parseInt(value, 10)
        if (Number.isFinite(n) && n > 0) options.limit = n
        break
      }
      case '--concurrency': {
        const n = Number.parseInt(value, 10)
        if (Number.isFinite(n) && n > 0) options.concurrency = Math.min(n, 32)
        break
      }
      default:
        break
    }
  }

  return options
}

function printUsage(): void {
  console.log(
    [
      'Usage: tsx scripts/build-media.ts [options]',
      '',
      '  --only=<substring>    only folders whose inventory dir contains this (case-insensitive)',
      '  --limit=<n>           at most n photos per folder',
      '  --concurrency=<n>     parallel photos (default 6)',
      '  --force               re-encode derivatives that already exist',
    ].join('\n'),
  )
}

/* -------------------------------- helpers --------------------------------- */

function toPosix(p: string): string {
  return p.replace(/\\/g, '/')
}

function normaliseDir(dir: string): string {
  return toPosix(dir).replace(/\/+$/, '').trim()
}

function nameKey(name: string): string {
  return name.normalize('NFC').toLowerCase()
}

async function pathExists(target: string): Promise<boolean> {
  try {
    await stat(target)
    return true
  } catch {
    return false
  }
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

/** Directory listings keyed by case-folded / NFC-normalised name. */
const dirCache = new Map<string, Map<string, string>>()

async function listDir(absDir: string): Promise<Map<string, string>> {
  const cached = dirCache.get(absDir)
  if (cached) return cached
  const map = new Map<string, string>()
  try {
    for (const name of await readdir(absDir)) map.set(nameKey(name), name)
  } catch {
    // missing directory — callers report it per file
  }
  dirCache.set(absDir, map)
  return map
}

/**
 * Resolve a relative path under `root`, tolerating case differences and
 * NFC/NFD mismatches in Vietnamese folder and file names.
 */
async function resolveUnderRoot(root: string, relative: string): Promise<string | null> {
  const segments = toPosix(relative)
    .split('/')
    .filter((s) => s.length > 0)
  let current = root
  for (const segment of segments) {
    const direct = path.join(current, segment)
    if (await pathExists(direct)) {
      current = direct
      continue
    }
    const listing = await listDir(current)
    const real = listing.get(nameKey(segment))
    if (real === undefined) return null
    current = path.join(current, real)
  }
  return current
}

async function pool<T>(items: readonly T[], limit: number, worker: (item: T) => Promise<void>): Promise<void> {
  let cursor = 0
  const size = Math.max(1, Math.min(limit, items.length))
  const runners = Array.from({ length: size }, async () => {
    for (;;) {
      const index = cursor++
      if (index >= items.length) return
      const item = items[index]
      if (item === undefined) return
      await worker(item)
    }
  })
  await Promise.all(runners)
}

/* ------------------------------- inventory -------------------------------- */

function isInventoryFolder(value: unknown): value is InventoryFolder {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Partial<InventoryFolder>
  return (
    typeof candidate.dir === 'string' &&
    Array.isArray(candidate.files) &&
    candidate.files.every((f) => typeof f === 'string')
  )
}

async function readInventory(): Promise<InventoryFolder[]> {
  const raw = await readFile(INVENTORY_PATH, 'utf8')
  const parsed: unknown = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error(`${INVENTORY_PATH} is not an array`)
  const folders = parsed.filter(isInventoryFolder)
  if (folders.length === 0) throw new Error(`${INVENTORY_PATH} contains no usable folders`)
  return folders.map((folder) => ({
    dir: folder.dir,
    count: typeof folder.count === 'number' ? folder.count : folder.files.length,
    mb: typeof folder.mb === 'number' ? folder.mb : 0,
    files: folder.files,
  }))
}

/* ------------------------------ slug mapping ------------------------------ */

interface SlugOverrides {
  exact: Map<string, string>
  loose: Map<string, string>
}

/**
 * Content batches own the public slug of a folder. They are written by another
 * agent and may not exist yet, so parsing stays deliberately forgiving.
 */
async function readSlugOverrides(): Promise<SlugOverrides> {
  const exact = new Map<string, string>()
  const loose = new Map<string, string>()

  let files: string[]
  try {
    files = (await readdir(CONTENT_DIR)).filter((f) => f.toLowerCase().endsWith('.json'))
  } catch {
    return { exact, loose }
  }

  for (const file of files.sort()) {
    const full = path.join(CONTENT_DIR, file)
    try {
      const parsed: unknown = JSON.parse(await readFile(full, 'utf8'))
      const list: unknown[] = Array.isArray(parsed)
        ? parsed
        : typeof parsed === 'object' && parsed !== null && Array.isArray((parsed as { projects?: unknown[] }).projects)
          ? ((parsed as { projects: unknown[] }).projects ?? [])
          : []

      for (const item of list) {
        if (typeof item !== 'object' || item === null) continue
        const record = item as { sourceDir?: unknown; slug?: unknown }
        if (typeof record.sourceDir !== 'string' || typeof record.slug !== 'string') continue
        const dir = normaliseDir(record.sourceDir)
        const slug = slugify(record.slug)
        if (dir.length === 0 || slug.length === 0) continue
        exact.set(dir, slug)
        loose.set(dir.toLowerCase(), slug)
      }
    } catch (error) {
      console.warn(`  ! ignoring ${file}: ${errorMessage(error)}`)
    }
  }

  return { exact, loose }
}

function leafSlug(dir: string): string {
  const segments = normaliseDir(dir).split('/')
  return slugify(segments[segments.length - 1] ?? '')
}

function fullSlug(dir: string): string {
  return slugify(normaliseDir(dir).split('/').join(' '))
}

function claim(base: string, taken: Set<string>, fallback: string): string {
  const seed = base.length > 0 ? base : fallback
  if (!taken.has(seed)) {
    taken.add(seed)
    return seed
  }
  for (let n = 2; n < 500; n++) {
    const candidate = `${seed}-${n}`
    if (!taken.has(candidate)) {
      taken.add(candidate)
      return candidate
    }
  }
  const unique = `${seed}-${Date.now().toString(36)}`
  taken.add(unique)
  return unique
}

/**
 * Deterministic folder -> slug map:
 *   1. a content batch that claims the folder wins,
 *   2. otherwise the leaf name if it is unique across the whole library
 *      (`ANH KHOA` -> `anh-khoa`),
 *   3. otherwise the full path (`.../PHÒNG KHÁCH` -> `can-so-10-...-phong-khach`),
 *   4. numeric suffixes break any remaining ties.
 */
function buildSlugMap(folders: readonly InventoryFolder[], overrides: SlugOverrides): Map<string, string> {
  const leafCounts = new Map<string, number>()
  for (const folder of folders) {
    const leaf = leafSlug(folder.dir)
    if (leaf.length === 0) continue
    leafCounts.set(leaf, (leafCounts.get(leaf) ?? 0) + 1)
  }

  const taken = new Set<string>()
  const slugs = new Map<string, string>()

  for (const folder of folders) {
    const key = normaliseDir(folder.dir)
    const override = overrides.exact.get(key) ?? overrides.loose.get(key.toLowerCase())
    if (override === undefined) continue
    slugs.set(folder.dir, claim(override, taken, fullSlug(folder.dir)))
  }

  folders.forEach((folder, i) => {
    if (slugs.has(folder.dir)) return
    const leaf = leafSlug(folder.dir)
    const preferred = leaf.length > 0 && leafCounts.get(leaf) === 1 ? leaf : fullSlug(folder.dir)
    slugs.set(folder.dir, claim(preferred, taken, `folder-${i + 1}`))
  })

  return slugs
}

/* -------------------------------- manifest -------------------------------- */

function isManifestEntry(value: unknown): value is ManifestEntry {
  if (typeof value !== 'object' || value === null) return false
  const entry = value as Partial<ManifestEntry>
  return (
    typeof entry.storageKey === 'string' &&
    typeof entry.width === 'number' &&
    typeof entry.height === 'number' &&
    typeof entry.blurDataURL === 'string' &&
    Array.isArray(entry.widths) &&
    entry.widths.every((w) => typeof w === 'number')
  )
}

async function readManifest(): Promise<Map<string, ManifestEntry>> {
  const map = new Map<string, ManifestEntry>()
  try {
    const parsed: unknown = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'))
    if (!Array.isArray(parsed)) return map
    for (const item of parsed) if (isManifestEntry(item)) map.set(item.storageKey, item)
  } catch {
    // no manifest yet
  }
  return map
}

function sortEntries(entries: ManifestEntry[]): ManifestEntry[] {
  return entries.sort((a, b) => {
    const slugA = a.storageKey.slice(0, a.storageKey.lastIndexOf('/'))
    const slugB = b.storageKey.slice(0, b.storageKey.lastIndexOf('/'))
    if (slugA !== slugB) return slugA < slugB ? -1 : 1
    return a.index - b.index
  })
}

const PLACEHOLDER_SVG = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1067" width="1600" height="1067" role="img" aria-label="AN ATELIER">',
  '<rect width="1600" height="1067" fill="#EAE5DA"/>',
  '<rect x="80" y="80" width="1440" height="907" fill="none" stroke="#D7D0C2" stroke-width="2"/>',
  '<line x1="80" y1="533.5" x2="1520" y2="533.5" stroke="#D7D0C2" stroke-width="1"/>',
  '</svg>',
  '',
].join('\n')

/* ------------------------------- processing ------------------------------- */

function derivativePath(slug: string, index: number, width: number): string {
  return path.join(OUT_ROOT, slug, `${index}-${width}.webp`)
}

function orientedSize(width: number, height: number, orientation: number | undefined): { w: number; h: number } {
  return orientation !== undefined && orientation >= 5 && orientation <= 8
    ? { w: height, h: width }
    : { w: width, h: height }
}

function targetWidths(sourceWidth: number): number[] {
  const fits = MEDIA_WIDTHS.filter((w) => w <= sourceWidth)
  if (fits.length > 0) return [...fits]
  const smallest = MEDIA_WIDTHS[0]
  return [smallest ?? 400]
}

async function buildOne(
  task: Task,
  options: Options,
  previous: ManifestEntry | undefined,
): Promise<{ entry: ManifestEntry; reused: boolean }> {
  const storageKey = `${task.slug}/${task.index}`

  // Resumable: everything the manifest promised is on disk.
  if (!options.force && previous !== undefined && previous.widths.length > 0 && previous.blurDataURL.length > 0) {
    const present = await Promise.all(
      previous.widths.map((w) => pathExists(derivativePath(task.slug, task.index, w))),
    )
    if (present.every(Boolean)) {
      return {
        reused: true,
        entry: {
          ...previous,
          storageKey,
          folder: task.folder,
          sourcePath: toPosix(task.sourcePath),
          index: task.index,
        },
      }
    }
  }

  const source = await readFile(task.sourcePath)
  const checksum = createHash('sha1').update(source).digest('hex')

  const pipeline = sharp(source, { failOn: 'none' }).rotate()
  const meta = await pipeline.metadata()
  if (!meta.width || !meta.height) throw new Error('could not read image dimensions')
  const { w: sourceWidth, h: sourceHeight } = orientedSize(meta.width, meta.height, meta.orientation)

  const widths = targetWidths(sourceWidth)
  await mkdir(path.join(OUT_ROOT, task.slug), { recursive: true })

  let largestBytes = 0
  for (const width of widths) {
    const target = derivativePath(task.slug, task.index, width)
    if (!options.force && (await pathExists(target))) {
      const existing = await stat(target)
      largestBytes = Math.max(largestBytes, existing.size)
      continue
    }
    const info = await pipeline
      .clone()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: WEBP_EFFORT })
      .toFile(target)
    largestBytes = Math.max(largestBytes, info.size)
  }

  const blur = await pipeline
    .clone()
    .resize({ width: BLUR_WIDTH })
    .blur(1)
    .webp({ quality: 45, effort: WEBP_EFFORT })
    .toBuffer()

  return {
    reused: false,
    entry: {
      storageKey,
      folder: task.folder,
      sourcePath: toPosix(task.sourcePath),
      index: task.index,
      width: sourceWidth,
      height: sourceHeight,
      bytes: largestBytes,
      mime: 'image/webp',
      blurDataURL: `data:image/webp;base64,${blur.toString('base64')}`,
      widths,
      checksum,
      sourceBytes: source.byteLength,
      sourceMime: meta.format ? `image/${meta.format}` : 'image/jpeg',
    },
  }
}

/* ---------------------------------- main ---------------------------------- */

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2))
  const started = Date.now()

  const inventory = await readInventory()
  const overrides = await readSlugOverrides()
  const slugs = buildSlugMap(inventory, overrides)
  const manifest = await readManifest()

  const needle = options.only ? options.only.toLowerCase() : null
  const selected = needle ? inventory.filter((f) => f.dir.toLowerCase().includes(needle)) : inventory

  console.log(`AN ATELIER — media build`)
  console.log(`  source     ${toPosix(SOURCE_ROOT)}`)
  console.log(`  output     ${toPosix(OUT_ROOT)}`)
  console.log(
    `  folders    ${selected.length}/${inventory.length}${needle ? ` (--only=${options.only})` : ''}` +
      `${options.limit ? `  limit ${options.limit}/folder` : ''}${options.force ? '  [force]' : ''}`,
  )
  if (overrides.exact.size > 0) console.log(`  slugs      ${overrides.exact.size} from src/data/content`)
  if (selected.length === 0) {
    console.log('  nothing matched — exiting')
    return
  }

  await mkdir(OUT_ROOT, { recursive: true })
  if (options.force || !(await pathExists(PLACEHOLDER_PATH))) {
    await writeFile(PLACEHOLDER_PATH, PLACEHOLDER_SVG, 'utf8')
  }

  // Build the task list, resolving Vietnamese folder / file names up front.
  const tasks: Task[] = []
  const failures: Failure[] = []

  for (const folder of selected) {
    const slug = slugs.get(folder.dir)
    if (slug === undefined) continue
    const absDir = await resolveUnderRoot(SOURCE_ROOT, folder.dir)
    if (absDir === null) {
      failures.push({ sourcePath: folder.dir, reason: 'folder not found under source root' })
      continue
    }
    const listing = await listDir(absDir)
    const files = options.limit === null ? folder.files : folder.files.slice(0, options.limit)

    // `slice(0, limit)` keeps the leading positions, so the array index is the
    // position in the full inventory listing — --limit runs stay compatible
    // with full runs, and with `ProjectSeed.coverIndex`.
    files.forEach((fileName, index) => {
      const real = listing.get(nameKey(fileName)) ?? fileName
      tasks.push({
        folder: folder.dir,
        slug,
        index,
        fileName: real,
        sourcePath: path.join(absDir, real),
      })
    })
  }

  console.log(`  photos     ${tasks.length}`)
  console.log('')

  let done = 0
  let built = 0
  let skipped = 0
  const fresh = new Map<string, ManifestEntry>()

  await pool(tasks, options.concurrency, async (task) => {
    const storageKey = `${task.slug}/${task.index}`
    try {
      const { entry, reused } = await buildOne(task, options, manifest.get(storageKey))
      fresh.set(storageKey, entry)
      if (reused) skipped++
      else built++
    } catch (error) {
      failures.push({ sourcePath: toPosix(task.sourcePath), reason: errorMessage(error) })
      console.warn(`  ! ${toPosix(task.sourcePath)} — ${errorMessage(error)}`)
    } finally {
      done++
      if (done % PROGRESS_EVERY === 0 || done === tasks.length) {
        const pct = tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 100
        console.log(`  [${String(done).padStart(4)}/${tasks.length}] ${String(pct).padStart(3)}%  ${storageKey}`)
      }
    }
  })

  for (const [key, entry] of fresh) manifest.set(key, entry)

  // A folder whose content batch changed its slug leaves entries behind under
  // the old slug — drop those (their files stay on disk, harmlessly orphaned).
  const slugByFolder = new Map<string, string>()
  for (const task of tasks) slugByFolder.set(task.folder, task.slug)
  let stale = 0
  for (const [key, entry] of manifest) {
    const expected = slugByFolder.get(entry.folder)
    if (expected === undefined) continue
    if (key.slice(0, key.lastIndexOf('/')) !== expected) {
      manifest.delete(key)
      stale++
    }
  }

  const entries = sortEntries([...manifest.values()])
  await writeFile(MANIFEST_PATH, `${JSON.stringify(entries, null, 2)}\n`, 'utf8')

  const derivatives = entries.reduce((sum, e) => sum + e.widths.length, 0)
  const elapsed = ((Date.now() - started) / 1000).toFixed(1)

  console.log('')
  console.log(
    `  built ${built} · reused ${skipped} · failed ${failures.length}` +
      `${stale > 0 ? ` · dropped ${stale} renamed` : ''} · ${elapsed}s`,
  )
  console.log(`  manifest ${toPosix(MANIFEST_PATH)} — ${entries.length} photos, ${derivatives} derivatives`)

  if (failures.length > 0) {
    console.log('')
    console.log(`  ${failures.length} problem file(s):`)
    for (const failure of failures.slice(0, 20)) console.log(`    - ${failure.sourcePath}: ${failure.reason}`)
    if (failures.length > 20) console.log(`    … ${failures.length - 20} more`)
  }

  if (built === 0 && skipped === 0 && failures.length > 0) process.exitCode = 1
}

main().catch((error: unknown) => {
  console.error(`media build failed: ${errorMessage(error)}`)
  process.exitCode = 1
})
