import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectEditor } from '@/components/admin/project/ProjectEditor'
import { isUuid, type ProjectEditorSnapshot } from '@/components/admin/project/contracts'
import { AdminPageHeader } from '@/components/admin/site/PageHeader'
import { requireUser } from '@/server/auth'
import { getProjectByIdUnfiltered } from '@/server/queries/projects'
import { getScenesForProject } from '@/server/queries/scenes'

import {
  getAdminProjectRow,
  getEditorMediaIndex,
  listMaterialOptions,
  listProjectCategories,
  listSceneOptions,
  listSiblingProjects,
} from './queries'

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  if (!isUuid(id)) return { title: 'Dự án' }
  const project = await getProjectByIdUnfiltered(id)
  return { title: project?.title ?? 'Dự án' }
}

export default async function ProjectEditorPage({ params }: PageProps) {
  await requireUser()

  const { id } = await params
  if (!isUuid(id)) notFound()

  const project = await getProjectByIdUnfiltered(id)
  if (!project) notFound()

  const [row, categories, materials, siblings, scenes, sceneConfigs, mediaIndex] = await Promise.all([
    getAdminProjectRow(project.id),
    listProjectCategories(),
    listMaterialOptions(),
    listSiblingProjects(project.id),
    listSceneOptions(project.id),
    getScenesForProject(project.id),
    getEditorMediaIndex(project),
  ])

  const snapshot: ProjectEditorSnapshot = {
    id: project.id,
    slug: project.slug,
    title: project.title,
    subtitle: project.subtitle ?? '',
    summary: project.summary ?? '',
    description: project.description ?? '',
    categoryId: row?.categoryId ?? '',
    coverMediaId: project.cover?.id ?? null,
    status: project.status,
    featured: project.featured,
    order: row?.order ?? 0,
    location: project.location ?? '',
    area: project.area ?? '',
    year: project.year === null ? '' : String(project.year),
    client: project.client ?? '',
    duration: project.duration ?? '',
    style: project.style ?? '',
    services: project.services,
    seoTitle: project.seo?.title ?? '',
    seoDescription: project.seo?.description ?? '',
    updatedAt: (row?.updatedAt ?? new Date()).toISOString(),
    publishedAt: project.publishedAt ? project.publishedAt.toISOString() : null,
    viewCount: row?.viewCount ?? 0,
  }

  return (
    <div className="flex flex-col gap-10">
      <AdminPageHeader
        eyebrow="Projects"
        title={project.title}
        description="Sửa nội dung dự án và dựng trang của nó. Bố cục bên dưới chính là thứ tự khách nhìn thấy — kéo để đổi chỗ, tắt khối chưa dùng, và lưu khi đã ưng."
      />

      <ProjectEditor
        snapshot={snapshot}
        blocks={project.blocks}
        gallery={project.gallery}
        mediaIndex={mediaIndex}
        categories={categories}
        materials={materials}
        siblings={siblings}
        scenes={scenes}
        sceneConfigs={sceneConfigs}
      />
    </div>
  )
}
