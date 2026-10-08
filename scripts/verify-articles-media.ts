import { config } from 'dotenv'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inArray } from 'drizzle-orm'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

async function check() {
  const { db } = await import('../src/server/db/index')
  const schema = await import('../src/server/db/schema')

  const articles = await db
    .select({
      id: schema.articles.id,
      slug: schema.articles.slug,
      title: schema.articles.title,
      coverMediaId: schema.articles.coverMediaId,
      status: schema.articles.status,
    })
    .from(schema.articles)

  console.log('Total articles in DB:', articles.length)

  const coverIds = articles.map((a) => a.coverMediaId).filter(Boolean) as string[]
  const mediaRows = await db
    .select({ id: schema.media.id, url: schema.media.url })
    .from(schema.media)
    .where(inArray(schema.media.id, coverIds))
  const mediaMap = new Map(mediaRows.map((m) => [m.id, m.url]))

  console.log('\n--- VERIFIED ARTICLES & COVER MEDIA ---')
  let validCount = 0
  for (const a of articles) {
    const hasMedia = a.coverMediaId ? mediaMap.has(a.coverMediaId) : false
    if (hasMedia) validCount++
    console.log(`[${a.status}] ${a.slug}`)
    console.log(
      `  Cover: ${a.coverMediaId} -> ${
        hasMedia && a.coverMediaId ? 'VALID: ' + mediaMap.get(a.coverMediaId) : 'MISSING'
      }`
    )
  }
  console.log(`\nValid Cover Media: ${validCount}/${articles.length}`)
  process.exit(0)
}

check().catch((err) => {
  console.error(err)
  process.exit(1)
})
