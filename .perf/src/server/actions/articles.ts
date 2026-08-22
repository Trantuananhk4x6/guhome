'use server'

/**
 * Journal CMS mutations. Every write snapshots the article into `revisions`
 * before/alongside the change, leaves an `audit_logs` row, and revalidates the
 * public journal routes (including the previous slug when it changed).
 */

import { and, eq, ne } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { slugify } from '@/lib/utils'
import { requireUser } from '@/server/auth'
import { db } from '@/server/db'
import { articles, auditLogs, revisions, type ArticleRow } from '@/server/db/schema'
import { estimateReadingMinutes } from '@/components/admin/site/contracts'
import type { ArticleActionResult } from '@/components/admin/site/contracts'
import type { PublishStatus, RichTextDoc, RichTextNode, SeoMeta } from '@/types/content'

/* -------------------------------- validation ------------------------------- */

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const nodeSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('heading'),
    level: z.union([z.literal(2), z.literal(3), z.literal(4)]),
    text: z.string().max(240),
  }),
  z.object({ type: z.literal('paragraph'), text: z.string().max(6000) }),
  z.object({ type: z.literal('image'), mediaId: z.string(), caption: z.string().max(300).optional() }),
  z.object({ type: z.literal('gallery'), mediaIds: z.array(z.string()).max(24) }),
  z.object({ type: z.literal('video'), mediaId: z.string() }),
  z.object({
    type: z.literal('quote'),
    text: z.string().max(1200),
    attribution: z.string().max(160).optional(),
  }),
  z.object({ type: z.literal('list'), ordered: z.boolean(), items: z.array(z.string().max(600)).max(60) }),
  z.object({ type: z.literal('projectRef'), projectId: z.string() }),
  z.object({ type: z.literal('divider') }),
])

const docSchema = z.object({ nodes: z.array(nodeSchema).max(200, 'Bài viết quá dài.') })

const seoSchema = z.object({
  title: z.string().trim().max(120).optional(),
  description: z.string().trim().max(320).optional(),
  ogImageId: z.string().optional(),
  noIndex: z.boolean().optional(),
})

const statusSchema = z.enum(['draft', 'published', 'archived'])

const nullableId = z
  .string()
  .trim()
  .nullable()
  .transform((value) => (value === null || value.length === 0 ? null : value))

const isoDate = z
  .string()
  .trim()
  .nullable()
  .refine((value) => value === null || value.length === 0 || !Number.isNaN(Date.parse(value)), 'Thời điểm không hợp lệ.')
  .transform((value) => (value === null || value.length === 0 ? null : new Date(value)))

const articleSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().trim().min(1, 'Chưa nhập tiêu đề.').max(160),
  slug: z.string().trim().max(80),
  excerpt: z.string().trim().max(400),
  coverMediaId: nullableId,
  categoryId: nullableId,
  tags: z.array(z.string().trim().min(1).max(40)).max(12, 'Tối đa 12 thẻ.'),
  readingMinutesOverride: z.number().int().min(1).max(120).nullable(),
  status: statusSchema,
  scheduledAt: isoDate,
  publishedAt: isoDate,
  seo: seoSchema,
  content: docSchema,
})

const statusChangeSchema = z.object({
  id: z.string().min(1),
  status: statusSchema,
  /** Only meaningful with `status: 'published'` — publishes at a future moment. */
  scheduledAt: isoDate,
})

const idSchema = z.object({ id: z.string().min(1) })

function fieldErrorsFrom(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const path = issue.path.map((part) => String(part)).join('.')
    if (!(path in out)) out[path] = issue.message
  }
  return out
}

/* --------------------------------- helpers --------------------------------- */

function cleanSeo(seo: z.infer<typeof seoSchema>): SeoMeta | null {
  const out: SeoMeta = {}
  if (seo.title && seo.title.length > 0) out.title = seo.title
  if (seo.description && seo.description.length > 0) out.description = seo.description
  if (seo.ogImageId && seo.ogImageId.length > 0) out.ogImageId = seo.ogImageId
  if (seo.noIndex) out.noIndex = true
  return Object.keys(out).length > 0 ? out : null
}

function toDoc(input: z.infer<typeof docSchema>): RichTextDoc {
  const nodes: RichTextNode[] = input.nodes
  return { nodes }
}

/** Blocking problems that only matter once the piece goes public. */
function publishBlockers(title: string, doc: RichTextDoc): Record<string, string> {
  const errors: Record<string, string> = {}
  if (doc.nodes.length === 0) errors['content'] = 'Bài viết chưa có nội dung.'

  doc.nodes.forEach((node, index) => {
    if ((node.type === 'image' || node.type === 'video') && node.mediaId.trim().length === 0) {
      errors[`content.nodes.${index}`] = 'Khối này chưa chọn tệp.'
    }
    if (node.type === 'gallery' && node.mediaIds.length === 0) {
      errors[`content.nodes.${index}`] = 'Bộ ảnh chưa có ảnh nào.'
    }
    if (node.type === 'projectRef' && node.projectId.trim().length === 0) {
      errors[`content.nodes.${index}`] = 'Chưa chọn dự án.'
    }
  })

  if (title.trim().length === 0) errors['title'] = 'Chưa nhập tiêu đề.'
  return errors
}

async function slugTaken(slug: string, exceptId?: string): Promise<boolean> {
  const where = exceptId ? and(eq(articles.slug, slug), ne(articles.id, exceptId)) : eq(articles.slug, slug)
  const rows = await db.select({ id: articles.id }).from(articles).where(where).limit(1)
  return rows.length > 0
}

async function writeRevision(
  userId: string,
  row: Pick<ArticleRow, 'id' | 'slug' | 'title' | 'status' | 'content' | 'excerpt' | 'tags'>,
  note: string,
): Promise<void> {
  try {
    await db.insert(revisions).values({
      entityType: 'article',
      entityId: row.id,
      note,
      createdBy: userId,
      data: {
        slug: row.slug,
        title: row.title,
        status: row.status,
        excerpt: row.excerpt,
        tags: row.tags,
        content: row.content,
      },
    })
  } catch (error) {
    console.error('[actions/articles] revision write failed', error)
  }
}

async function audit(
  userId: string,
  action: string,
  entityId: string,
  meta: Record<string, unknown>,
): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId,
      action,
      entityType: 'article',
      entityId,
      meta,
    })
  } catch (error) {
    console.error('[actions/articles] audit write failed', error)
  }
}

function revalidateArticle(slug: string, previousSlug?: string | null): void {
  revalidatePath('/journal')
  revalidatePath(`/journal/${slug}`)
  if (previousSlug && previousSlug !== slug) revalidatePath(`/journal/${previousSlug}`)
  // The homepage carries a JOURNAL rail.
  revalidatePath('/')
  revalidatePath('/sitemap.xml')
}

/* --------------------------------- actions --------------------------------- */

/** Create an empty draft so the editor has a stable id to save against. */
export async function createArticle(input: unknown): Promise<ArticleActionResult> {
  const session = await requireUser()

  const parsed = z
    .object({ title: z.string().trim().min(1, 'Chưa nhập tiêu đề.').max(160), slug: z.string().trim().max(80) })
    .safeParse(input)

  if (!parsed.success) {
    return { ok: false, error: 'Chưa nhập tiêu đề.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }

  const title = parsed.data.title
  const slug = (parsed.data.slug.length > 0 ? slugify(parsed.data.slug) : slugify(title)) || 'bai-viet'

  if (!SLUG.test(slug)) {
    return { ok: false, error: 'Slug không hợp lệ.', fieldErrors: { slug: 'Slug không hợp lệ.' } }
  }

  try {
    if (await slugTaken(slug)) {
      return { ok: false, error: 'Slug đã tồn tại.', fieldErrors: { slug: 'Slug này đã được dùng.' } }
    }

    const inserted = await db
      .insert(articles)
      .values({
        title,
        slug,
        content: { nodes: [] },
        status: 'draft',
        authorId: session.userId,
        readingMinutes: 1,
      })
      .returning({ id: articles.id, slug: articles.slug })

    const row = inserted[0]
    if (!row) return { ok: false, error: 'Không tạo được bài viết.' }

    await writeRevision(
      session.userId,
      { id: row.id, slug: row.slug, title, status: 'draft', content: { nodes: [] }, excerpt: null, tags: [] },
      'Khởi tạo bản nháp',
    )
    await audit(session.userId, 'article.create', row.id, { title, slug: row.slug })
    revalidatePath('/admin/articles')

    return { ok: true, id: row.id, slug: row.slug }
  } catch (error) {
    console.error('[actions/articles] createArticle failed', error)
    return { ok: false, error: 'Không tạo được bài viết. Vui lòng thử lại.' }
  }
}

/** Persist the whole article document. Requires an existing `id`. */
export async function saveArticle(input: unknown): Promise<ArticleActionResult> {
  const session = await requireUser()

  const parsed = articleSchema.safeParse(input)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Một vài trường chưa hợp lệ.',
      fieldErrors: fieldErrorsFrom(parsed.error),
    }
  }

  const data = parsed.data
  const id = data.id
  if (!id) return { ok: false, error: 'Thiếu mã bài viết.' }

  const slug = (data.slug.length > 0 ? slugify(data.slug) : slugify(data.title)) || ''
  if (!SLUG.test(slug)) {
    return { ok: false, error: 'Slug không hợp lệ.', fieldErrors: { slug: 'Slug chỉ gồm chữ thường, số và dấu gạch ngang.' } }
  }

  const doc = toDoc(data.content)

  if (data.status === 'published') {
    const blockers = publishBlockers(data.title, doc)
    if (Object.keys(blockers).length > 0) {
      return { ok: false, error: 'Chưa thể đăng — còn khối chưa hoàn thiện.', fieldErrors: blockers }
    }
  }

  try {
    const current = await db.select().from(articles).where(eq(articles.id, id)).limit(1)
    const previous = current[0]
    if (!previous) return { ok: false, error: 'Bài viết không tồn tại.' }

    if (await slugTaken(slug, id)) {
      return { ok: false, error: 'Slug đã tồn tại.', fieldErrors: { slug: 'Slug này đã được dùng.' } }
    }

    const minutes = data.readingMinutesOverride ?? estimateReadingMinutes(doc.nodes)

    // Publishing without an explicit timestamp stamps "now"; scheduling keeps
    // the future timestamp so the public query hides it until then.
    let publishedAt = data.publishedAt
    if (data.status === 'published' && publishedAt === null) {
      publishedAt = data.scheduledAt ?? previous.publishedAt ?? new Date()
    }

    await db
      .update(articles)
      .set({
        title: data.title,
        slug,
        excerpt: data.excerpt.length > 0 ? data.excerpt : null,
        coverMediaId: data.coverMediaId,
        categoryId: data.categoryId,
        tags: data.tags,
        readingMinutes: minutes,
        status: data.status,
        scheduledAt: data.scheduledAt,
        publishedAt,
        seo: cleanSeo(data.seo),
        content: doc,
        updatedAt: new Date(),
      })
      .where(eq(articles.id, id))

    await writeRevision(
      session.userId,
      {
        id,
        slug,
        title: data.title,
        status: data.status,
        content: doc,
        excerpt: data.excerpt.length > 0 ? data.excerpt : null,
        tags: data.tags,
      },
      'Lưu nội dung',
    )
    await audit(session.userId, 'article.save', id, {
      slug,
      status: data.status,
      nodes: doc.nodes.length,
      readingMinutes: minutes,
    })

    revalidateArticle(slug, previous.slug)
    revalidatePath('/admin/articles')

    return { ok: true, id, slug }
  } catch (error) {
    console.error('[actions/articles] saveArticle failed', error)
    return { ok: false, error: 'Không lưu được bài viết. Vui lòng thử lại.' }
  }
}

/**
 * Draft / Publish / Schedule / Archive without touching the body.
 * `status: 'published'` + a future `scheduledAt` is a scheduled publish.
 */
export async function setArticleStatus(input: unknown): Promise<ArticleActionResult> {
  const session = await requireUser()

  const parsed = statusChangeSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: 'Yêu cầu không hợp lệ.', fieldErrors: fieldErrorsFrom(parsed.error) }
  }

  const { id, status, scheduledAt } = parsed.data

  try {
    const rows = await db.select().from(articles).where(eq(articles.id, id)).limit(1)
    const row = rows[0]
    if (!row) return { ok: false, error: 'Bài viết không tồn tại.' }

    if (status === 'published') {
      const blockers = publishBlockers(row.title, row.content)
      if (Object.keys(blockers).length > 0) {
        return { ok: false, error: 'Chưa thể đăng — còn khối chưa hoàn thiện.', fieldErrors: blockers }
      }
    }

    const nextStatus: PublishStatus = status
    const now = new Date()
    const publishedAt =
      nextStatus === 'published' ? (scheduledAt ?? row.publishedAt ?? now) : row.publishedAt

    await db
      .update(articles)
      .set({
        status: nextStatus,
        scheduledAt: nextStatus === 'published' ? scheduledAt : row.scheduledAt,
        publishedAt,
        updatedAt: now,
      })
      .where(eq(articles.id, id))

    await writeRevision(
      session.userId,
      { id, slug: row.slug, title: row.title, status: nextStatus, content: row.content, excerpt: row.excerpt, tags: row.tags },
      scheduledAt && nextStatus === 'published' ? 'Hẹn giờ đăng' : `Đổi trạng thái: ${nextStatus}`,
    )
    await audit(session.userId, `article.${nextStatus}`, id, {
      slug: row.slug,
      scheduledAt: scheduledAt?.toISOString() ?? null,
    })

    revalidateArticle(row.slug)
    revalidatePath('/admin/articles')

    return { ok: true, id, slug: row.slug }
  } catch (error) {
    console.error('[actions/articles] setArticleStatus failed', error)
    return { ok: false, error: 'Không đổi được trạng thái. Vui lòng thử lại.' }
  }
}

export async function deleteArticle(input: unknown): Promise<ArticleActionResult> {
  const session = await requireUser()

  const parsed = idSchema.safeParse(input)
  if (!parsed.success) return { ok: false, error: 'Yêu cầu không hợp lệ.' }

  try {
    const rows = await db.select().from(articles).where(eq(articles.id, parsed.data.id)).limit(1)
    const row = rows[0]
    if (!row) return { ok: false, error: 'Bài viết không tồn tại.' }

    await writeRevision(
      session.userId,
      { id: row.id, slug: row.slug, title: row.title, status: row.status, content: row.content, excerpt: row.excerpt, tags: row.tags },
      'Trước khi xoá',
    )

    await db.delete(articles).where(eq(articles.id, row.id))
    await audit(session.userId, 'article.delete', row.id, { slug: row.slug, title: row.title })

    revalidateArticle(row.slug)
    revalidatePath('/admin/articles')

    return { ok: true, id: row.id, slug: row.slug }
  } catch (error) {
    console.error('[actions/articles] deleteArticle failed', error)
    return { ok: false, error: 'Không xoá được bài viết. Vui lòng thử lại.' }
  }
}
