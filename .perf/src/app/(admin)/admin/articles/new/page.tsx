/**
 * `/admin/articles/new` — nothing but a title and a slug.
 *
 * A journal piece needs a row (and an id) before media can be attached, so the
 * form creates an empty draft and `NewArticleForm` redirects into
 * `/admin/articles/[id]`, where the real editing happens.
 */

import type { Metadata } from 'next'

import { NewArticleForm } from '@/components/admin/site/NewArticleForm'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { Button } from '@/components/ui/Button'
import { requireUser } from '@/server/auth'

export const metadata: Metadata = { title: 'Bài viết mới' }
export const dynamic = 'force-dynamic'

export default async function NewArticlePage() {
  await requireUser()

  return (
    <div className="flex flex-col gap-10 pb-24">
      <AdminPageHeader
        eyebrow="Journal"
        title="Bài viết mới"
        description="Đặt tiêu đề và đường dẫn. Bản nháp được tạo ngay, phần nội dung, ảnh bìa và SEO nằm ở bước sau."
        actions={
          <Button href="/admin/articles" variant="ghost" size="sm">
            Danh sách bài viết
          </Button>
        }
      />

      <NewArticleForm />
    </div>
  )
}
