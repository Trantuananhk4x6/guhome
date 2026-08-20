import type { Metadata } from 'next'

import { EMPTY_HOME_DATA, SECTION_COMPONENTS, type HomeData } from '@/components/sections'
import { getPublishedArticles } from '@/server/queries/articles'
import { getProjectBySlug, getPublishedProjects } from '@/server/queries/projects'
import { getSceneForProject } from '@/server/queries/scenes'
import { getHomepageSections, getMaterials, getServices } from '@/server/queries/site'
import type {
  ArticleSummary,
  HomepageSection,
  MaterialItem,
  ProjectSummary,
  ServiceItem,
} from '@/types/content'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'AN ATELIER — Không gian mang tính cách.',
  description:
    'Studio nội thất và kiến trúc tại TP. Hồ Chí Minh. Chúng tôi dựng không gian bằng vật liệu thật, ánh sáng tự nhiên và tỉ lệ vừa vặn với người sống trong đó.',
}

/** Never let one unreachable table blank the homepage. */
async function safe<T>(run: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await run()
  } catch (error) {
    console.error('[home] query failed — falling back', error)
    return fallback
  }
}

async function loadHomeData(): Promise<HomeData> {
  const [projects, services, articles, materials] = await Promise.all([
    safe<ProjectSummary[]>(() => getPublishedProjects(), []),
    safe<ServiceItem[]>(() => getServices(), []),
    safe<ArticleSummary[]>(() => getPublishedArticles({ limit: 3 }), []),
    safe<MaterialItem[]>(() => getMaterials(), []),
  ])

  if (projects.length === 0) {
    return {
      ...EMPTY_HOME_DATA,
      services,
      articles,
      materials,
      philosophyImage: materials[0]?.media ?? null,
      closingImage: materials[1]?.media ?? null,
    }
  }

  const featuredOnly = projects.filter((project) => project.featured)
  const showcase = (featuredOnly.length > 0 ? featuredOnly : projects).slice(0, 5)

  // The hero and the pinned section each want a project with a real scene, and
  // they should not be the same project when the library allows a second one.
  const heroProject = showcase.find((project) => project.sceneMode !== 'NONE') ?? showcase[0] ?? null
  const immersiveProject =
    showcase.find((project) => project.sceneMode !== 'NONE' && project.id !== heroProject?.id) ??
    showcase.find((project) => project.id !== heroProject?.id) ??
    heroProject

  const [heroScene, immersiveScene, immersiveDetail] = await Promise.all([
    heroProject ? safe(() => getSceneForProject(heroProject.id), null) : null,
    immersiveProject ? safe(() => getSceneForProject(immersiveProject.id), null) : null,
    immersiveProject ? safe(() => getProjectBySlug(immersiveProject.slug), null) : null,
  ])

  const rest = projects.filter(
    (project) => project.id !== heroProject?.id && project.id !== immersiveProject?.id,
  )
  const gallery = immersiveDetail?.gallery ?? []

  // The studio band borrows a project photograph; carry its title through so the
  // caption names what is actually in the frame.
  const studioSource = rest[0] ?? null
  const studioImage = studioSource?.cover ?? gallery[1] ?? null

  return {
    hero: { project: heroProject, scene: heroScene, gallery: [] },
    immersive: { project: immersiveProject, scene: immersiveScene, gallery },
    featured: showcase,
    services,
    articles,
    materials,
    studioImage,
    studioImageCaption:
      studioSource && studioSource.cover
        ? [studioSource.title, studioSource.location].filter(Boolean).join(' — ')
        : null,
    philosophyImage: materials[0]?.media ?? rest[1]?.cover ?? gallery[2] ?? null,
    closingImage: rest[2]?.cover ?? rest[1]?.cover ?? gallery[3] ?? null,
    projectCount: projects.length,
  }
}

export default async function HomePage() {
  const [sections, data] = await Promise.all([
    safe<HomepageSection[]>(() => getHomepageSections(), []),
    loadHomeData(),
  ])

  const ordered = sections.filter((section) => section.enabled).sort((a, b) => a.order - b.order)

  return (
    <>
      {ordered.map((section) => {
        const Section = SECTION_COMPONENTS[section.key]
        return <Section key={section.id} section={section} data={data} />
      })}
    </>
  )
}
