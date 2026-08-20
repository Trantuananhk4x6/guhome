import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '../..')
config({ path: join(root, '.env.local') })

const { db } = await import('../../src/server/db/index')
const schema = await import('../../src/server/db/schema')

const theme = await db.select().from(schema.themeSettings)
console.log('THEME BRAND:', JSON.stringify(theme[0]?.brand, null, 2))
const sections = await db.select().from(schema.homepageSections)
for (const s of sections.sort((a, b) => a.order - b.order)) {
  console.log('---', s.order, s.key, s.enabled)
  console.log(JSON.stringify(s.content))
}
