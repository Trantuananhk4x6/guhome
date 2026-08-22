import type { Metadata } from 'next'

import {
  EMPTY_HOME_DATA,
  SECTION_COMPONENTS,
  sectionOptionalText,
  sectionStops,
  type HomeData,
} from '@/components/sections'
import { getPublishedArticles } from '@/server/queries/articles'
import { getMediaMap } from '@/server/queries/media'
import { getProjectBySlug, getPublishedProjects } from '@/server/queries/projects'
import { getSceneForProject } from '@/server/queries/scenes'
import { getHomepageSections, getMaterials, getServices } from '@/server/queries/site'
import type {
  ArticleSummary,
  HomepageSection,
  ImmersiveStop,
  MaterialItem,
  MediaRef,
  ProjectSummary,
  ServiceItem,
} from '@/types/content'

export const revalidate = 300

/**
 * Both of these were pass-1 strings that three copy passes were commissioned to
 * kill and never reached, because they live here rather than in the seeded data —
 * so the rejected slogan stayed on the browser tab and the rejected directory
 * line stayed under every search result for the front page.
 */
export const metadata: Metadata = {
  // `absolute` opts out of the root layout's `%s · GuHomes` template — otherwise the
  // home page prints the brand twice ("GuHomes — … · GuHomes").
  title: { absolute: 'GuHomes — Nội thất và kiến trúc cho khí hậu Sài Gòn' },
  description:
    'Studio nội thất và kiến trúc tại TP. Hồ Chí Minh. Chúng tôi thiết kế cho độ ẩm 75–80% quanh năm, cho nắng chiều đổ vào một mặt thoáng duy nhất, và cho con hẻm quyết định món đồ nào vào được tới cửa.',
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

/**
 * The homepage sections are read before the data, because the IMMERSIVE band's
 * `content` decides *which* project it stages and *which* photographs it stops
 * on — both were chosen by a heuristic here until now, which is why the admin's
 * project picker for that band had no effect on anything.
 */
async function loadHomeData(sections: readonly HomepageSection[]): Promise<HomeData> {
  const immersiveContent = sections.find((section) => section.key === 'IMMERSIVE_PROJECT')?.content ?? {}
  const authoredStops = sectionStops(immersiveContent, 'stops')
  const pinnedId = sectionOptionalText(immersiveContent, 'featuredProjectId')

  // Same story for the opening screen: it staged whichever project the heuristic
  // below happened to reach for, and no field anywhere could say otherwise.
  const heroContent = sections.find((section) => section.key === 'HERO')?.content ?? {}
  const heroMediaId = sectionOptionalText(heroContent, 'heroMediaId')

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
  const pool = featuredOnly.length > 0 ? featuredOnly : projects

  /*
   * SEVEN, NOT FIVE. The hero and the pinned band are both drawn from this
   * slice, and both are then *withheld* from the FEATURED band below — a
   * five-deep slice therefore leaves that band three projects for five slots.
   * Seven is five slots plus the two the page spends above them.
   */
  const showcase = pool.slice(0, 7)

  // An editor's choice outranks every heuristic below it — and it is picked
  // first so the hero can step aside instead of claiming the same project.
  const pinnedChoice = pinnedId ? (projects.find((project) => project.id === pinnedId) ?? null) : null

  // The hero and the pinned section each want a project with a real scene, and
  // they should not be the same project when the library allows a second one.
  const heroProject =
    showcase.find((project) => project.sceneMode !== 'NONE' && project.id !== pinnedChoice?.id) ??
    showcase.find((project) => project.id !== pinnedChoice?.id) ??
    showcase[0] ??
    null
  const immersiveProject =
    pinnedChoice ??
    showcase.find((project) => project.sceneMode !== 'NONE' && project.id !== heroProject?.id) ??
    showcase.find((project) => project.id !== heroProject?.id) ??
    heroProject

  const [heroScene, immersiveScene, immersiveDetail, stopMedia] = await Promise.all([
    heroProject ? safe(() => getSceneForProject(heroProject.id), null) : null,
    immersiveProject ? safe(() => getSceneForProject(immersiveProject.id), null) : null,
    immersiveProject ? safe(() => getProjectBySlug(immersiveProject.slug), null) : null,
    authoredStops.length > 0 || heroMediaId
      ? safe(
          () =>
            getMediaMap([
              ...authoredStops.map((stop) => stop.mediaId),
              ...(heroMediaId ? [heroMediaId] : []),
            ]),
          new Map<string, MediaRef>(),
        )
      : new Map<string, MediaRef>(),
  ])

  const gallery = immersiveDetail?.gallery ?? []

  // A stop whose photograph was deleted from the library keeps its place in the
  // sequence with `media: null` rather than silently renumbering the band.
  const immersiveStops: ImmersiveStop[] = authoredStops.map((stop) => ({
    id: stop.id,
    label: stop.label,
    caption: stop.caption,
    media: stopMedia.get(stop.mediaId) ?? null,
  }))

  /*
   * ONE PHOTOGRAPH, ONE PLACE ON THE PAGE.
   *
   * Every band below used to index independently — `showcase` for the featured
   * band, `rest[0..2]` for the studio, philosophy and closing frames — so
   * nothing stopped two of them landing on the same project. Two did: the hero
   * and FEATURED slot 01 were both `showcase[0]`, and FEATURED slot 02 and
   * IMMERSIVE still 01 were both the pinned project's cover. A visitor met the
   * same photograph twice inside the first two viewports of a portfolio holding
   * 1485 of them.
   *
   * So allocation is a single pass with a ledger. Every band asks `claim` for
   * projects nobody has spoken for yet, in preference order — the featured pool
   * first, then the rest of the library — and a project handed out once is never
   * handed out again on this page.
   */
  const spokenFor = new Set<string>()
  for (const project of [heroProject, immersiveProject]) {
    if (project) spokenFor.add(project.id)
  }

  /** Up to `count` projects nobody has claimed yet, taken from `sources` in order. */
  const claim = (count: number, ...sources: readonly (readonly ProjectSummary[])[]) => {
    const taken: ProjectSummary[] = []
    for (const source of sources) {
      for (const project of source) {
        if (taken.length >= count) return taken
        if (spokenFor.has(project.id)) continue
        spokenFor.add(project.id)
        taken.push(project)
      }
    }
    return taken
  }

  // FEATURED draws five distinct treatments; a library too small to fill them
  // without repeating the hero keeps the old behaviour rather than losing a band.
  const band = claim(5, showcase, pool, projects)
  const featured = band.length > 0 ? band : showcase

  // The studio band borrows a project photograph; carry its title through so the
  // caption names what is actually in the frame.
  const studioSource = claim(1, projects)[0] ?? null
  const studioImage = studioSource?.cover ?? gallery[1] ?? null

  return {
    hero: {
      project: heroProject,
      scene: heroScene,
      gallery: [],
      stops: [],
      authoredImage: heroMediaId ? (stopMedia.get(heroMediaId) ?? null) : null,
    },
    immersive: {
      project: immersiveProject,
      scene: immersiveScene,
      gallery,
      stops: immersiveStops,
      authoredImage: null,
    },
    featured,
    services,
    articles,
    materials,
    studioImage,
    studioImageCaption:
      studioSource && studioSource.cover
        ? [studioSource.title, studioSource.location].filter(Boolean).join(' — ')
        : null,
    // `claim` only runs when the material has no photograph of its own, so a
    // project is never spent on a band that was not going to show it.
    philosophyImage: materials[0]?.media ?? claim(1, projects)[0]?.cover ?? gallery[2] ?? null,
    closingImage: claim(1, projects)[0]?.cover ?? gallery[3] ?? null,
    projectCount: projects.length,
  }
}

export default async function HomePage() {
  const sections = await safe<HomepageSection[]>(() => getHomepageSections(), [])
  const data = await loadHomeData(sections)

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
