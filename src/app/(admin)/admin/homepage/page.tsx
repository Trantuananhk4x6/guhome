import type { Metadata } from 'next'

import { HomepageBuilder, type HomepageProjectOption } from '@/components/admin/site/HomepageBuilder'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { requireUser } from '@/server/auth'
import { getPublishedProjects } from '@/server/queries/projects'
import { getHomepageSections } from '@/server/queries/site'

export const metadata: Metadata = { title: 'Trang chủ' }
export const dynamic = 'force-dynamic'

export default async function HomepageAdminPage() {
  await requireUser()

  const [sections, projects] = await Promise.all([getHomepageSections(), getPublishedProjects()])

  const options: HomepageProjectOption[] = projects.map((project) => ({
    id: project.id,
    title: project.title,
    subtitle: project.subtitle,
  }))

  return (
    <div className="flex flex-col gap-10">
      <AdminPageHeader
        eyebrow="Homepage"
        title="Trang chủ"
        description="Tám khối dựng nên trang chủ. Kéo để đổi thứ tự, tắt khối không dùng, và sửa đúng những trường mà mỗi khối thật sự đọc."
      />

      <HomepageBuilder initial={sections} projects={options} />
    </div>
  )
}
