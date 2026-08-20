/**
 * Post-seed sanity check. Fails loudly when the site would render empty or broken.
 *
 *   npx tsx scripts/verify.ts
 *
 * Exits non-zero on any FAIL so it can gate a deploy.
 */
import { existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { config } from 'dotenv'
import { sql, eq, isNull, and } from 'drizzle-orm'
import type { PgTable } from 'drizzle-orm/pg-core'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

const { db } = await import('../src/server/db/index')
const schema = await import('../src/server/db/schema')

let failures = 0
let warnings = 0

function check(label: string, ok: boolean, detail: string) {
  const tag = ok ? 'PASS' : 'FAIL'
  if (!ok) failures++
  console.log(`  [${tag}] ${label.padEnd(34)} ${detail}`)
}

function warn(label: string, ok: boolean, detail: string) {
  if (!ok) warnings++
  console.log(`  [${ok ? 'ok  ' : 'WARN'}] ${label.padEnd(34)} ${detail}`)
}

async function countRows(table: PgTable): Promise<number> {
  const rows = await db.select({ n: sql<number>`count(*)::int` }).from(table)
  return rows[0]?.n ?? 0
}

console.log('\nGUHOMES — verifying database + media\n')

/* ---------------------------------- data ---------------------------------- */

const users = await countRows(schema.users)
check('admin user', users > 0, `${users} user(s)`)

const categories = await countRows(schema.categories)
check('categories', categories >= 5, `${categories} rows`)

const projects = await countRows(schema.projects)
check('projects', projects > 0, `${projects} rows`)

const published = await db
  .select({ n: sql<number>`count(*)::int` })
  .from(schema.projects)
  .where(eq(schema.projects.status, 'published'))
check('published projects', (published[0]?.n ?? 0) > 0, `${published[0]?.n ?? 0} published`)

const featured = await db
  .select({ n: sql<number>`count(*)::int` })
  .from(schema.projects)
  .where(and(eq(schema.projects.featured, true), eq(schema.projects.status, 'published')))
check('featured projects', (featured[0]?.n ?? 0) >= 3, `${featured[0]?.n ?? 0} featured (homepage needs >= 3)`)

const noCover = await db
  .select({ n: sql<number>`count(*)::int` })
  .from(schema.projects)
  .where(isNull(schema.projects.coverMediaId))
check('every project has a cover', (noCover[0]?.n ?? 0) === 0, `${noCover[0]?.n ?? 0} without cover`)

const mediaRows = await countRows(schema.media)
check('media rows', mediaRows > 0, `${mediaRows} rows`)

const blocks = await countRows(schema.projectBlocks)
check('project blocks', blocks > 0, `${blocks} rows`)

const scenesCount = await countRows(schema.scenes)
warn('3D scenes', scenesCount > 0, `${scenesCount} scenes`)

const articles = await countRows(schema.articles)
warn('journal articles', articles > 0, `${articles} rows`)

const servicesCount = await countRows(schema.services)
check('services', servicesCount > 0, `${servicesCount} rows`)

const materialsCount = await countRows(schema.materials)
check('materials', materialsCount > 0, `${materialsCount} rows`)

const sections = await countRows(schema.homepageSections)
check('homepage sections', sections === 8, `${sections}/8 rows`)

const nav = await countRows(schema.navigation)
check('navigation items', nav > 0, `${nav} rows`)

const theme = await countRows(schema.themeSettings)
check('theme settings', theme > 0, `${theme} row(s)`)

/* ---------------------------------- media --------------------------------- */

const manifestPath = join(root, 'public/media/manifest.json')
if (!existsSync(manifestPath)) {
  check('media manifest', false, 'public/media/manifest.json missing — run npm run media:build')
} else {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8')) as {
    storageKey: string
    widths: number[]
    blurDataURL: string
  }[]
  check('media manifest', manifest.length > 0, `${manifest.length} images`)

  let missingFiles = 0
  let missingBlur = 0
  for (const entry of manifest) {
    if (!entry.blurDataURL?.startsWith('data:')) missingBlur++
    const widest = Math.max(...entry.widths)
    if (!existsSync(join(root, 'public/media', `${entry.storageKey}-${widest}.webp`))) missingFiles++
  }
  check('derivatives on disk', missingFiles === 0, `${missingFiles} missing`)
  check('blur placeholders', missingBlur === 0, `${missingBlur} missing`)

  const dbKeys = await db.select({ k: schema.media.storageKey }).from(schema.media)
  const dbSet = new Set(dbKeys.map((r) => r.k))
  const orphans = manifest.filter((m) => !dbSet.has(m.storageKey)).length
  warn('manifest rows seeded', orphans === 0, `${orphans} image(s) not in DB — re-run npm run db:seed`)
}

/* --------------------------------- summary -------------------------------- */

console.log(`\n${failures === 0 ? 'All checks passed' : `${failures} FAILURE(S)`}${warnings ? ` · ${warnings} warning(s)` : ''}\n`)
process.exit(failures === 0 ? 0 : 1)
