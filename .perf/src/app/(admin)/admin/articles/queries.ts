/**
 * Admin-side journal reads. Server-only.
 *
 * `@/server/queries/articles` only ever returns *published* pieces, which is
 * correct for the public site and useless for a CMS — these reads see drafts,
 * scheduled pieces and the archive.
 */

import { and, asc, desc, eq, ilike, or, sql, type SQL } from 'drizzle-orm'

import { db } from '@/server/db'
import { articles, categories, projects, users } from '@/server/db/schema'
import { getMediaMap } from '@/server/queries/media'
import type { MediaRef, PublishStatus, RichTextDoc, SeoMeta } from '@/types/content'

export interface AdminArticleRow {
  id: string
  title: string
  slug: string
  status: PublishStatus
  excerpt: string | null
  tags: string[]
  readingMinutes: number | null
  scheduledAt: Date | null
  publishedAt: Date | null
  updatedAt: Date
  authorName: string | null
}

export interface AdminArticleDetail extends AdminArticleRow {
  coverMediaId: string | null
  categoryId: string | null
  content: RichTextDoc
  seo: SeoMeta | null
}

export interface AdminArticleQuery {
  status?: PublishStatus | 'all'
  search?: string
  limit?: number
}

function filters(query: AdminArticleQuery): SQL | undefined {
  const parts: SQL[] = []

  if (query.status && query.status !== 'all') parts.push(eq(articles.status, query.status))

  const term = query.search?.trim()
  if (term && term.length > 0) {
    const like = `%${term}%`
    const match = or(ilike(articles.title, like), ilike(articles.slug, like), ilike(articles.excerpt, like))
    if (match) parts.push(match)
  }

  if (parts.length === 0) return undefined
  return parts.length === 1 ? parts[0] : and(...parts)
}

export async function listAdminArticles(query: AdminArticleQuery = {}): Promise<AdminArticleRow[]> {
  try {
    const rows = await db
      .select({ article: articles, authorName: users.name })
      .from(articles)
      .leftJoin(users, eq(articles.authorId, users.id))
      .where(filters(query))
      .orderBy(desc(articles.updatedAt), asc(articles.title))
      .limit(query.limit ?? 200)

    return rows.map(({ article, authorName }) => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      status: article.status,
      excerpt: article.excerpt,
      tags: article.tags,
      readingMinutes: article.readingMinutes,
      scheduledAt: article.scheduledAt,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      authorName,
    }))
  } catch (error) {
    console.error('[admin/articles] listAdminArticles failed', error)
    return []
  }
}

export type AdminArticleCounts = Record<PublishStatus | 'all', number>

export async function countAdminArticles(): Promise<AdminArticleCounts> {
  const empty: AdminArticleCounts = { all: 0, draft: 0, published: 0, archived: 0 }
  try {
    const rows = await db
      .select({ status: articles.status, value: sql<number>`count(*)::int` })
      .from(articles)
      .groupBy(articles.status)

    const out: AdminArticleCounts = { ...empty }
    for (const row of rows) {
      out[row.status] = row.value
      out.all += row.value
    }
    return out
  } catch (error) {
    console.error('[admin/articles] countAdminArticles failed', error)
    return empty
  }
}

export async function getAdminArticle(id: string): Promise<AdminArticleDetail | null> {
  try {
    const rows = await db
      .select({ article: articles, authorName: users.name })
      .from(articles)
      .leftJoin(users, eq(articles.authorId, users.id))
      .where(eq(articles.id, id))
      .limit(1)

    const row = rows[0]
    if (!row) return null

    const { article, authorName } = row
    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      status: article.status,
      excerpt: article.excerpt,
      tags: article.tags,
      readingMinutes: article.readingMinutes,
      scheduledAt: article.scheduledAt,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      authorName,
      coverMediaId: article.coverMediaId,
      categoryId: article.categoryId,
      content: article.content,
      seo: article.seo ?? null,
    }
  } catch (error) {
    console.error('[admin/articles] getAdminArticle failed', error)
    return null
  }
}

/** Every media id the editor needs a thumbnail for: cover, OG image and body. */
function mediaIdsIn(article: AdminArticleDetail): string[] {
  const ids: string[] = []
  if (article.coverMediaId) ids.push(article.coverMediaId)
  if (article.seo?.ogImageId) ids.push(article.seo.ogImageId)

  for (const node of article.content.nodes) {
    if (node.type === 'image' || node.type === 'video') {
      if (node.mediaId.length > 0) ids.push(node.mediaId)
    } else if (node.type === 'gallery') {
      for (const mediaId of node.mediaIds) {
        if (mediaId.length > 0) ids.push(mediaId)
      }
    }
  }
  return ids
}

/** A plain lookup handed to the client editor so every picker shows a preview. */
export async function getArticleMediaIndex(article: AdminArticleDetail): Promise<Record<string, MediaRef>> {
  const ids = mediaIdsIn(article)
  if (ids.length === 0) return {}
  const map = await getMediaMap(ids)
  const out: Record<string, MediaRef> = {}
  for (const [id, ref] of map) out[id] = ref
  return out
}

export interface ArticleCategoryOption {
  id: string
  name: string
}

/** Journal taxonomy. Falls back to an empty list on an unseeded database. */
export async function listJournalCategories(): Promise<ArticleCategoryOption[]> {
  try {
    const rows = await db
      .select({ id: categories.id, name: categories.name })
      .from(categories)
      .where(eq(categories.kind, 'journal'))
      .orderBy(asc(categories.order), asc(categories.name))
    return rows
  } catch (error) {
    console.error('[admin/articles] listJournalCategories failed', error)
    return []
  }
}

export interface ArticleProjectOption {
  id: string
  title: string
  slug: string
}

/** Published projects, for the `projectRef` block. */
export async function listProjectOptions(): Promise<ArticleProjectOption[]> {
  try {
    const rows = await db
      .select({ id: projects.id, title: projects.title, slug: projects.slug })
      .from(projects)
      .where(eq(projects.status, 'published'))
      .orderBy(asc(projects.order), asc(projects.title))
      .limit(200)
    return rows
  } catch (error) {
    console.error('[admin/articles] listProjectOptions failed', error)
    return []
  }
}
