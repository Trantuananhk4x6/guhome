/**
 * `/admin/projects/new` — create a project, then get out of the way.
 *
 * The page only loads the category list; the form calls `createProject` and
 * redirects to `/admin/projects/[id]`, where the real editor takes over.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { Panel, adminButtonClass } from '@/components/admin/AdminShell'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { requireUser } from '@/server/auth'

import { NewProjectForm, type NewProjectCategoryOption } from '../_components/NewProjectForm'
import { listProjectCategories } from '../queries'

export const metadata: Metadata = { title: 'Dự án mới' }
export const dynamic = 'force-dynamic'

export default async function NewProjectPage() {
  await requireUser()

  const categories = await listProjectCategories()

  const options: NewProjectCategoryOption[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }))

  return (
    <div className="flex flex-col gap-10 pb-16">
      <AdminPageHeader
        eyebrow="Projects"
        title="Dự án mới"
        description="Đặt tên và tạo hồ sơ trước. Ảnh bìa, tóm tắt, thông số công trình và bố cục khối được dựng ở bước sau, trong trình soạn thảo."
        actions={
          <Link href="/admin/projects" className={adminButtonClass('outline')}>
            Về danh sách
          </Link>
        }
      />

      <Panel title="Hồ sơ dự án" description="Bốn trường đầu tiên — mọi thứ còn lại sửa được sau.">
        <NewProjectForm categories={options} />
      </Panel>
    </div>
  )
}
