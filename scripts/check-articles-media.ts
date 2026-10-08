import { config } from 'dotenv'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { count } from 'drizzle-orm'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

async function run() {
  const { db } = await import('../src/server/db/index')
  const schema = await import('../src/server/db/schema')

  const res = await db.select({ value: count() }).from(schema.articles)
  const articleCount = res[0]?.value ?? 0
  console.log('Tổng số bài viết trong DB hiện tại:', articleCount)

  const sampleMedia = await db
    .select({
      id: schema.media.id,
      storageKey: schema.media.storageKey,
      alt: schema.media.alt,
    })
    .from(schema.media)
    .limit(15)

  console.log('Sample media:', JSON.stringify(sampleMedia, null, 2))
}

run().then(() => setTimeout(() => process.exit(0), 500)).catch(console.error)
