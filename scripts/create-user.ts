/**
 * Creates (or updates) one admin/editor account.
 *
 *   npx tsx scripts/create-user.ts <login> <password> [admin|editor] [name]
 *
 * `<login>` is stored in `users.email` — the login form matches it
 * case-insensitively, so it does not have to be an address.
 * Idempotent: re-running with the same login resets that account's password,
 * role and active flag instead of inserting a duplicate.
 */
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { config } from 'dotenv'
import { sql } from 'drizzle-orm'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

const { db } = await import('../src/server/db/index')
const schema = await import('../src/server/db/schema')
const { hashPassword } = await import('../src/server/auth/password')

const [loginRaw, password, roleRaw = 'editor', nameRaw] = process.argv.slice(2)

if (!loginRaw || !password) {
  console.error('usage: npx tsx scripts/create-user.ts <login> <password> [admin|editor] [name]')
  process.exit(1)
}
if (password.length < 8) {
  console.error('Password must be at least 8 characters.')
  process.exit(1)
}
if (roleRaw !== 'admin' && roleRaw !== 'editor') {
  console.error(`Unknown role "${roleRaw}" — expected "admin" or "editor".`)
  process.exit(1)
}

const login = loginRaw.trim().toLowerCase()
const name = nameRaw ?? loginRaw.trim()
const passwordHash = await hashPassword(password)

const existing = await db
  .select({ id: schema.users.id })
  .from(schema.users)
  .where(sql`lower(${schema.users.email}) = ${login}`)
  .limit(1)

if (existing[0]) {
  await db
    .update(schema.users)
    .set({ passwordHash, role: roleRaw, active: true, updatedAt: new Date() })
    .where(sql`id = ${existing[0].id}`)
  console.log(`updated  ${login}  (role ${roleRaw})`)
} else {
  const [row] = await db
    .insert(schema.users)
    .values({ email: login, name, passwordHash, role: roleRaw })
    .returning({ id: schema.users.id })
  console.log(`created  ${login}  (role ${roleRaw}, id ${row?.id})`)
}
