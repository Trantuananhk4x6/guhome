import type { Metadata } from 'next'

import { HomepageBuilder, type HomepageProjectOption } from '@/components/admin/site/HomepageBuilder'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { requireUser } from '@/server/auth'
import { getMediaMap } from '@/server/queries/media'
import { getPublishedProjects } from '@/server/queries/projects'
import { getHomepageSections } from '@/server/queries/site'
import type { MediaRef } from '@/types/content'

/**
 * Every asset id a section already points at — stop pictures and the hero's own
 * — so the form opens showing what is saved instead of "chưa tải được để xem
 * trước" beside a field that is, in fact, set.
 */
function referencedMediaIds(sections: readonly { content: Record<string, unknown> }[]): string[] {
  const ids: string[] = []

  for (const section of sections) {
    const hero = section.content['heroMediaId']
    if (typeof hero === 'string' && hero.trim().length > 0) ids.push(hero.trim())

    const stops = section.content['stops']
    if (!Array.isArray(stops)) continue
    for (const stop of stops) {
      if (!stop || typeof stop !== 'object' || Array.isArray(stop)) continue
      const mediaId = (stop as Record<string, unknown>)['mediaId']
      if (typeof mediaId === 'string' && mediaId.trim().length > 0) ids.push(mediaId.trim())
    }
  }

  return ids
}

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

  const mediaMap = await getMediaMap(referencedMediaIds(sections))
  const mediaIndex: Record<string, MediaRef> = Object.fromEntries(mediaMap)

  return (
    <div className="flex flex-col gap-10">
      <AdminPageHeader
        eyebrow="Homepage"
        title="Trang chủ"
        description="Tám khối dựng nên trang chủ. Kéo để đổi thứ tự, tắt khối không dùng, và sửa đúng những trường mà mỗi khối thật sự đọc."
      />

      <HomepageBuilder initial={sections} projects={options} mediaIndex={mediaIndex} />
    </div>
  )
}
