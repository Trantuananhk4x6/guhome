/**
 * Journal queries. Server-only module — never import from a client component.
 *
 * Contract: docs/ARCHITECTURE.md §6.5.
 */

import { and, asc, desc, eq, ne, sql, type SQL } from 'drizzle-orm'
import { cache } from 'react'

import { db } from '@/server/db'
import { articles, users, type ArticleRow } from '@/server/db/schema'
import type { ArticleDetail, ArticleSummary } from '@/types/content'

import { getMediaMap } from './media'

export interface ArticleListOptions {
  limit?: number
  offset?: number
  tag?: string
}

/** Published, and not scheduled for the future. See projects.ts for the NULL rule. */
function publishedFilter(): SQL {
  return sql`${articles.status} = 'published' and (${articles.publishedAt} is null or ${articles.publishedAt} <= now())`
}

function publishedOrder(): SQL {
  return desc(sql`coalesce(${articles.publishedAt}, ${articles.createdAt})`)
}

function toSummary(row: ArticleRow, cover: ArticleSummary['cover']): ArticleSummary {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    cover,
    publishedAt: row.publishedAt,
    tags: row.tags,
    readingMinutes: row.readingMinutes,
  }
}

async function toSummaries(rows: readonly ArticleRow[]): Promise<ArticleSummary[]> {
  if (rows.length === 0) return []
  const mediaMap = await getMediaMap(rows.map((row) => row.coverMediaId))
  return rows.map((row) => toSummary(row, row.coverMediaId ? (mediaMap.get(row.coverMediaId) ?? null) : null))
}

const loadPublishedArticles = cache(
  async (limit: number, offset: number, tag: string): Promise<ArticleSummary[]> => {
    const filters: SQL[] = [publishedFilter()]
    if (tag.length > 0) filters.push(sql`${tag} = any(${articles.tags})`)

    const query = db
      .select()
      .from(articles)
      .where(and(...filters))
      .orderBy(publishedOrder(), asc(articles.title))
      .offset(offset)

    const rows = limit > 0 ? await query.limit(limit) : await query
    return toSummaries(rows)
  },
)

export function getPublishedArticles(options: ArticleListOptions = {}): Promise<ArticleSummary[]> {
  return loadPublishedArticles(options.limit ?? 0, options.offset ?? 0, options.tag ?? '')
}

export const getArticleBySlug = cache(async (slug: string): Promise<ArticleDetail | null> => {
  const rows = await db
    .select({ article: articles, authorName: users.name })
    .from(articles)
    .leftJoin(users, eq(articles.authorId, users.id))
    .where(and(eq(articles.slug, slug), publishedFilter()))
    .limit(1)

  const row = rows[0]
  if (!row) return null

  const article = row.article
  const mediaMap = await getMediaMap([article.coverMediaId])
  const cover = article.coverMediaId ? (mediaMap.get(article.coverMediaId) ?? null) : null

  return {
    ...toSummary(article, cover),
    content: article.content,
    status: article.status,
    authorName: row.authorName,
    seo: article.seo ?? null,
  }
})

export const getAllArticleSlugs = cache(async (): Promise<string[]> => {
  const rows = await db
    .select({ slug: articles.slug })
    .from(articles)
    .where(publishedFilter())
    .orderBy(publishedOrder())
  return rows.map((row) => row.slug)
})

/** Other published articles, newest first — the "đọc thêm" rail. */
export const getRelatedArticles = cache(
  async (articleId: string, limit = 3): Promise<ArticleSummary[]> => {
    if (limit <= 0) return []
    const rows = await db
      .select()
      .from(articles)
      .where(and(publishedFilter(), ne(articles.id, articleId)))
      .orderBy(publishedOrder())
      .limit(limit)
    return toSummaries(rows)
  },
)

/** Distinct tags across published articles, for the journal filter bar. */
export const getArticleTags = cache(async (): Promise<string[]> => {
  const rows = await db.select({ tags: articles.tags }).from(articles).where(publishedFilter())
  const set = new Set<string>()
  for (const row of rows) {
    for (const tag of row.tags) {
      const trimmed = tag.trim()
      if (trimmed.length > 0) set.add(trimmed)
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b, 'vi'))
})
