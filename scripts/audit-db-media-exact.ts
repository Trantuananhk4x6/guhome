import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { config } from 'dotenv'

config({ path: join(process.cwd(), '.env.local') })

async function run() {
  const { db } = await import('../src/server/db/index')
  const schema = await import('../src/server/db/schema')
  const publicDir = join(process.cwd(), 'public')

  const allMedia = await db.select().from(schema.media)
  console.log(`Kiểm tra ${allMedia.length} bản ghi media trong CSDL...`)

  let genuinelyMissing = 0
  for (const m of allMedia) {
    const cleanUrl = m.url.trim()
    let relPath = cleanUrl.startsWith('/') ? cleanUrl.slice(1) : cleanUrl
    if (!relPath.startsWith('media/')) {
      relPath = `media/${relPath}`
    }

    const fullOnDisk = join(publicDir, relPath)
    if (cleanUrl.includes('.')) {
      if (!existsSync(fullOnDisk)) {
        genuinelyMissing++
        console.log(`[GENUINELY MISSING FILE] ID: ${m.id} URL: ${m.url} -> ${fullOnDisk}`)
      }
    } else {
      // Derivative base: check if any file starts with this stem
      const lastSlash = fullOnDisk.lastIndexOf('\\')
      const dir = fullOnDisk.slice(0, lastSlash)
      const prefix = fullOnDisk.slice(lastSlash + 1)
      if (!existsSync(dir)) {
        genuinelyMissing++
        console.log(`[DIR MISSING] ID: ${m.id} URL: ${m.url} -> Dir ${dir} not found`)
      } else {
        const files = readdirSync(dir)
        const hasDerivative = files.some((f) => f.startsWith(`${prefix}-`) || f.startsWith(`${prefix}.`))
        if (!hasDerivative) {
          genuinelyMissing++
          console.log(`[NO DERIVATIVE FOUND] ID: ${m.id} URL: ${m.url}`)
        }
      }
    }
  }

  console.log(`\nTổng số media thực sự thiếu trên đĩa: ${genuinelyMissing}/${allMedia.length}`)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
