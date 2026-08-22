/**
 * Contact-inbox reads and the read-only environment summary. Server-only.
 */

import { and, count, desc, eq, ilike, or, type SQL } from 'drizzle-orm'

import { serverEnv } from '@/lib/env'
import { db } from '@/server/db'
import { contactRequests } from '@/server/db/schema'
import type { ContactStatus } from '@/components/admin/site/contracts'

export interface ContactRow {
  id: string
  name: string
  email: string
  phone: string | null
  projectType: string | null
  budget: string | null
  message: string | null
  status: ContactStatus
  source: string | null
  createdAt: Date
}

export interface ContactQuery {
  status?: ContactStatus | 'all'
  search?: string
  limit?: number
}

function filters(query: ContactQuery): SQL | undefined {
  const parts: SQL[] = []

  if (query.status && query.status !== 'all') {
    parts.push(eq(contactRequests.status, query.status))
  }

  const term = query.search?.trim()
  if (term && term.length > 0) {
    const like = `%${term}%`
    const match = or(
      ilike(contactRequests.name, like),
      ilike(contactRequests.email, like),
      ilike(contactRequests.message, like),
      ilike(contactRequests.projectType, like),
    )
    if (match) parts.push(match)
  }

  if (parts.length === 0) return undefined
  return parts.length === 1 ? parts[0] : and(...parts)
}

export async function listContactRequests(query: ContactQuery = {}): Promise<ContactRow[]> {
  try {
    const rows = await db
      .select()
      .from(contactRequests)
      .where(filters(query))
      .orderBy(desc(contactRequests.createdAt))
      .limit(query.limit ?? 100)

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone,
      projectType: row.projectType,
      budget: row.budget,
      message: row.message,
      status: row.status,
      source: row.source,
      createdAt: row.createdAt,
    }))
  } catch (error) {
    console.error('[admin/settings] listContactRequests failed', error)
    return []
  }
}

export type ContactCounts = Record<ContactStatus | 'all', number>

export async function countContactRequests(): Promise<ContactCounts> {
  const empty: ContactCounts = { all: 0, new: 0, contacted: 0, archived: 0 }
  try {
    const rows = await db
      .select({ status: contactRequests.status, value: count() })
      .from(contactRequests)
      .groupBy(contactRequests.status)

    const out: ContactCounts = { ...empty }
    for (const row of rows) {
      out[row.status] = row.value
      out.all += row.value
    }
    return out
  } catch (error) {
    console.error('[admin/settings] countContactRequests failed', error)
    return empty
  }
}

/* ------------------------------- environment -------------------------------- */

export interface EnvironmentSummary {
  storageDriver: string
  storageTarget: string
  depthProvider: string
  depthModelConfigured: boolean
  databaseHost: string
  databaseName: string
  mediaSourceRoot: string
  nodeEnv: string
}

/**
 * A redacted view of the runtime configuration.
 * Only hostnames, driver names and booleans — never a credential, token or URL
 * containing one.
 */
export function environmentSummary(): EnvironmentSummary {
  let databaseHost = 'không xác định'
  let databaseName = '—'
  let storageDriver = 'local'
  let storageTarget = './public/media'
  let depthProvider = 'heuristic'
  let depthModelConfigured = false
  let mediaSourceRoot = '—'

  try {
    const env = serverEnv()
    storageDriver = env.STORAGE_DRIVER
    storageTarget = env.STORAGE_DRIVER === 's3' ? (env.S3_BUCKET || 'chưa đặt bucket') : env.STORAGE_LOCAL_ROOT
    depthProvider = env.DEPTH_PROVIDER
    depthModelConfigured = env.REPLICATE_API_TOKEN.length > 0
    mediaSourceRoot = env.MEDIA_SOURCE_ROOT

    const parsed = new URL(env.DATABASE_URL)
    databaseHost = parsed.hostname
    databaseName = parsed.pathname.replace(/^\//, '') || '—'
  } catch (error) {
    console.error('[admin/settings] environmentSummary failed', error)
  }

  return {
    storageDriver,
    storageTarget,
    depthProvider,
    depthModelConfigured,
    databaseHost,
    databaseName,
    mediaSourceRoot,
    nodeEnv: process.env.NODE_ENV ?? 'development',
  }
}
