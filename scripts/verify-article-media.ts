import { config } from 'dotenv'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inArray } from 'drizzle-orm'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

async function run() {
  const { db } = await import('../src/server/db/index')
  const schema = await import('../src/server/db/schema')

  const articles = await db.select({
    id: schema.articles.id,
    slug: schema.articles.slug,
    title: schema.articles.title,
    coverMediaId: schema.articles.coverMediaId,
  }).from(schema.articles)

  const mediaIds = articles.map((a) => a.coverMediaId).filter((id): id is string => Boolean(id))
  const foundMedia = await db
    .select({ id: schema.media.id, url: schema.media.url })
    .from(schema.media)
    .where(inArray(schema.media.id, mediaIds))

  const foundMap = new Map(foundMedia.map((m) => [m.id, m.url]))

  console.log(`=== BÁO CÁO KIỂM TRA BẢNG ARTICLES & MEDIA ===`)
  console.log(`Tổng số bài viết trong CSDL: ${articles.length}`)
  console.log(`Số coverMediaId hợp lệ tìm thấy trong bảng media: ${foundMedia.length}/${mediaIds.length}`)

  let allValid = true
  for (const art of articles) {
    const url = art.coverMediaId ? foundMap.get(art.coverMediaId) : null
    const isValid = Boolean(url)
    if (!isValid) allValid = false
    console.log(`- [${isValid ? 'OK' : 'MISSING'}] ${art.slug} -> Cover URL: ${url ?? 'KHÔNG TÌM THẤY'}`)
  }

  console.log(`\nKết luận: ${allValid ? 'TẤT CẢ ẢNH BÌA ĐỀU HỢP LỆ!' : 'CÓ ẢNH BÌA BỊ THIẾU'}`)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
