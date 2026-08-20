import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
config({ path: join(root, '.env.local') })

const { db } = await import('../../src/server/db/index')
const { scenes } = await import('../../src/server/db/schema')

const rows = await db.select().from(scenes)
console.log(
  JSON.stringify(
    rows.map((r) => ({
      id: r.id,
      projectId: r.projectId,
      mode: r.mode,
      fov: r.fov,
      model: r.modelMediaId,
      waypoints: r.waypoints ?? [],
      settings: r.settings ?? {},
    })),
  ),
)
process.exit(0)
