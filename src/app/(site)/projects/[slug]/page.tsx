/**
 * /projects/[slug] — one project, told through its blocks.
 *
 * Statically generated from `getAllProjectSlugs()` and revalidated hourly, so a
 * published edit lands without a deploy. Everything visual is delegated to
 * `ProjectBlocks`; this file only resolves the project, its metadata and its
 * structured data.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectAnalytics } from '@/components/projects/ProjectAnalytics'
import { ProjectBlocks } from '@/components/projects/ProjectBlocks'
import { buildBreadcrumbJsonLd, buildMetadata, buildProjectJsonLd, jsonLdScript } from '@/lib/seo'
import { getMediaById } from '@/server/queries/media'
import { getAllProjectSlugs, getProjectBySlug } from '@/server/queries/projects'
import type { MediaRef, ProjectDetail } from '@/types/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

/** The share card, preferring the SEO override over the project cover. */
async function shareImage(project: ProjectDetail): Promise<MediaRef | null> {
  const overrideId = project.seo?.ogImageId
  if (overrideId) {
    const override = await getMediaById(overrideId)
    if (override) return override
  }
  return project.cover
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) {
    return buildMetadata({ title: 'Không tìm thấy dự án', path: `/projects/${slug}`, noIndex: true })
  }

  const seo = project.seo
  const image = await shareImage(project)

  return buildMetadata({
    title: seo?.title ?? project.title,
    description:
      seo?.description ??
      project.summary ??
      project.subtitle ??
      `${project.title} — dự án nội thất do GuHomes thiết kế và giám sát thi công.`,
    path: `/projects/${project.slug}`,
    image,
    type: 'article',
    noIndex: seo?.noIndex ?? false,
    publishedTime: project.publishedAt,
    tags: [project.categoryName, project.style, ...project.services].filter(
      (tag): tag is string => typeof tag === 'string' && tag.length > 0,
    ),
  })
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const graph = [
    buildProjectJsonLd(project),
    buildBreadcrumbJsonLd([
      { name: 'Trang chủ', path: '/' },
      { name: 'Dự án', path: '/projects' },
      { name: project.title, path: `/projects/${project.slug}` },
    ]),
  ]

  return (
    <div className="bg-canvas">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />
      <ProjectAnalytics projectId={project.id} slug={project.slug} />
      <ProjectBlocks project={project} />
    </div>
  )
}
