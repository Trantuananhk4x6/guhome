import { config } from 'dotenv'
import { join } from 'node:path'

config({ path: join(process.cwd(), '.env.local') })

async function check() {
  const { db } = await import('../src/server/db/index')
  const schema = await import('../src/server/db/schema')
  const { eq } = await import('drizzle-orm')

  const arts = await db.select({
    id: schema.articles.id,
    slug: schema.articles.slug,
    title: schema.articles.title,
    coverMediaId: schema.articles.coverMediaId
  }).from(schema.articles)

  console.log(`=== BÁO CÁO KIỂM TRA BÀI VIẾT & MEDIA LIÊN KẾT ===`)
  console.log(`Tổng số bài viết trong Neon Database: ${arts.length}\n`)

  let validCovers = 0
  for (const a of arts) {
    if (a.coverMediaId) {
      const m = await db.select({ id: schema.media.id, url: schema.media.url }).from(schema.media).where(eq(schema.media.id, a.coverMediaId))
      const isValid = m.length > 0
      if (isValid) validCovers++
      console.log(`• [${isValid ? '✓' : '✗'}] ${a.slug}`)
      console.log(`    Tiêu đề: ${a.title.slice(0, 60)}...`)
      console.log(`    Cover Media ID: ${a.coverMediaId} -> ${isValid ? m[0]!.url : 'KHÔNG TÌM THẤY TRONG BẢNG MEDIA!'}`)
    } else {
      console.log(`• [!] ${a.slug} -> Chưa có coverMediaId`)
    }
  }

  console.log(`\nKết quả: ${validCovers}/${arts.length} bài viết có coverMediaId hợp lệ.`)
  process.exit(0)
}

check().catch((err) => {
  console.error('Lỗi kiểm tra:', err)
  process.exit(1)
})
