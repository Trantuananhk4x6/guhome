import { neon, neonConfig } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from './schema'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.')
}

/**
 * Point the driver at a local Postgres when `DATABASE_URL` names one.
 *
 * `neon()` speaks Neon's HTTP protocol and derives its endpoint from the host —
 * `https://<host>/sql` — so a plain `postgres://localhost` connection string
 * reaches nothing. A proxy in front of the local database gives it something
 * that answers, which is what lets migrations and seeds run against a throwaway
 * database instead of the one serving guhomes.vn.
 *
 * Hosted deployments never take this branch: their host is a Neon address.
 */
const LOCAL_DB_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]', 'db.localtest.me'])
const dbHost = new URL(connectionString).hostname

if (LOCAL_DB_HOSTS.has(dbHost)) {
  const proxyPort = process.env.NEON_HTTP_PROXY_PORT ?? '4444'
  neonConfig.fetchEndpoint = `http://${dbHost}:${proxyPort}/sql`
}

const sql = neon(connectionString)

export const db = drizzle(sql, { schema, casing: 'snake_case' })

export { schema }
export type Database = typeof db
