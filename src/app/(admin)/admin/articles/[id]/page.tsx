/**
 * `/admin/articles/[id]` — the journal editor.
 *
 * The page resolves everything the editor needs to render a preview of what it
 * is editing (media thumbnails, taxonomy, linkable projects) and hands over
 * plain serialisable props; the four workflow moves — nháp / đăng / hẹn giờ /
 * lưu trữ — all run through `saveArticle` inside `ArticleEditor`.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { cache } from 'react'

import { ArticleEditor, type ArticleEditorArticle } from '@/components/admin/site/ArticleEditor'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { Button } from '@/components/ui/Button'
import { requireUser } from '@/server/auth'

import {
  getAdminArticle,
  getArticleMediaIndex,
  listJournalCategories,
  listProjectOptions,
  type AdminArticleDetail,
} from '../queries'

export const dynamic = 'force-dynamic'

interface ArticlePageProps {
  params: Promise<{ id: string }>
}

/** Shared between `generateMetadata` and the render so the row is read once. */
const loadArticle = cache(async (id: string): Promise<AdminArticleDetail | null> => getAdminArticle(id))

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params
  const article = await loadArticle(id)
  return { title: article ? article.title : 'Bài viết' }
}

function toEditorArticle(article: AdminArticleDetail): ArticleEditorArticle {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    status: article.status,
    tags: article.tags,
    readingMinutes: article.readingMinutes,
    coverMediaId: article.coverMediaId,
    categoryId: article.categoryId,
    scheduledAt: article.scheduledAt?.toISOString() ?? null,
    publishedAt: article.publishedAt?.toISOString() ?? null,
    updatedAt: article.updatedAt.toISOString(),
    authorName: article.authorName,
    content: article.content,
    seo: article.seo,
  }
}

export default async function AdminArticlePage({ params }: ArticlePageProps) {
  await requireUser()

  const { id } = await params
  const article = await loadArticle(id)
  if (!article) notFound()

  const [mediaIndex, categories, projects] = await Promise.all([
    getArticleMediaIndex(article),
    listJournalCategories(),
    listProjectOptions(),
  ])

  return (
    <div className="flex flex-col gap-10">
      <AdminPageHeader
        eyebrow="Journal"
        title={article.title}
        description={`/journal/${article.slug}`}
        actions={
          <>
            <Button href="/admin/articles" variant="ghost" size="sm">
              Danh sách bài viết
            </Button>
            <Button href={`/journal/${article.slug}`} external variant="ghost" size="sm" withArrow>
              Xem trên site
            </Button>
          </>
        }
      />

      <ArticleEditor
        article={toEditorArticle(article)}
        mediaIndex={mediaIndex}
        projects={projects}
        categories={categories}
      />
    </div>
  )
}
