/**
 * Rich-text renderer for journal articles.
 *
 * Server component: it resolves every `mediaId` / `projectId` referenced by the
 * document in two batched queries, then walks the nodes. Measure is held at
 * ~68ch for running text while images, galleries and project references are
 * allowed to breathe out to the full column.
 */

import { ProjectCard } from '@/components/projects/ProjectCard'
import { Rule } from '@/components/ui/Rule'
import { mediaUrl } from '@/lib/media'
import { getMediaMap } from '@/server/queries/media'
import { getProjectsByIds } from '@/server/queries/projects'
import type { MediaRef, ProjectSummary, RichTextDoc, RichTextNode } from '@/types/content'

import { ImageFrame } from '../../_components/motion'

const MEASURE = 'mx-auto w-full max-w-[68ch]'

function collectIds(nodes: readonly RichTextNode[]): { mediaIds: string[]; projectIds: string[] } {
  const mediaIds: string[] = []
  const projectIds: string[] = []

  for (const node of nodes) {
    switch (node.type) {
      case 'image':
      case 'video':
        mediaIds.push(node.mediaId)
        break
      case 'gallery':
        mediaIds.push(...node.mediaIds)
        break
      case 'projectRef':
        projectIds.push(node.projectId)
        break
      default:
        break
    }
  }

  return { mediaIds, projectIds }
}

interface NodeProps {
  node: RichTextNode
  media: Map<string, MediaRef>
  projects: Map<string, ProjectSummary>
}

function Node({ node, media, projects }: NodeProps) {
  switch (node.type) {
    case 'heading': {
      if (node.level === 2) {
        return (
          <h2 className={`${MEASURE} u-display-sm mt-20 mb-8 text-ink`}>{node.text}</h2>
        )
      }
      if (node.level === 3) {
        return (
          <h3 className={`${MEASURE} mt-16 mb-6 font-display text-[1.625rem] font-normal leading-tight text-ink`}>
            {node.text}
          </h3>
        )
      }
      return (
        <h4 className={`${MEASURE} u-label mt-14 mb-5 text-ink`}>{node.text}</h4>
      )
    }

    case 'paragraph':
      return (
        <p className={`${MEASURE} mb-7 font-body text-[1.0625rem] leading-[1.9] text-ink/85`}>
          {node.text}
        </p>
      )

    case 'image': {
      const ref = media.get(node.mediaId) ?? null
      return (
        <ImageFrame
          media={ref}
          alt={ref?.alt ?? node.caption ?? ''}
          ratio="aspect-[3/2]"
          sizes="(min-width: 1024px) 72rem, 100vw"
          width={1600}
          caption={node.caption ?? ref?.caption ?? undefined}
          className="my-16"
        />
      )
    }

    case 'gallery': {
      const refs = node.mediaIds
        .map((id) => media.get(id))
        .filter((ref): ref is MediaRef => ref !== undefined)
      if (refs.length === 0) return null

      return (
        <div className="my-16 grid gap-4 sm:grid-cols-2">
          {refs.map((ref) => (
            <ImageFrame
              key={ref.id}
              media={ref}
              alt={ref.alt ?? ''}
              ratio="aspect-[4/5]"
              sizes="(min-width: 640px) 36rem, 100vw"
              width={1200}
              caption={ref.caption ?? undefined}
            />
          ))}
        </div>
      )
    }

    case 'video': {
      const ref = media.get(node.mediaId)
      if (!ref) return null
      return (
        <figure className="my-16">
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full bg-espresso"
            src={mediaUrl(ref)}
            aria-label={ref.alt ?? ref.caption ?? 'Video của AN ATELIER'}
          />
          {ref.caption ? <figcaption className="u-label mt-4">{ref.caption}</figcaption> : null}
        </figure>
      )
    }

    case 'quote':
      return (
        <figure className={`${MEASURE} my-16 border-l border-accent pl-8`}>
          <blockquote className="font-display text-[1.75rem] font-normal leading-[1.35] text-ink">
            {node.text}
          </blockquote>
          {node.attribution ? (
            <figcaption className="u-label mt-6">{node.attribution}</figcaption>
          ) : null}
        </figure>
      )

    case 'list': {
      const items = node.items.filter((item) => item.trim().length > 0)
      if (items.length === 0) return null

      if (node.ordered) {
        return (
          <ol className={`${MEASURE} my-10`}>
            {items.map((item, i) => (
              <li key={i} className="flex gap-6 border-t border-line py-4">
                <span className="u-label shrink-0 text-accent">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-body text-[1rem] leading-[1.8] text-ink/85">{item}</span>
              </li>
            ))}
          </ol>
        )
      }

      return (
        <ul className={`${MEASURE} my-10`}>
          {items.map((item, i) => (
            <li key={i} className="flex gap-5 border-t border-line py-4">
              <span aria-hidden="true" className="mt-[0.75em] h-px w-5 shrink-0 bg-accent" />
              <span className="font-body text-[1rem] leading-[1.8] text-ink/85">{item}</span>
            </li>
          ))}
        </ul>
      )
    }

    case 'projectRef': {
      const project = projects.get(node.projectId)
      if (!project) return null
      return (
        <div className="my-16">
          <p className="u-label mb-6">Dự án được nhắc tới</p>
          <ProjectCard project={project} variant="grid" sizes="(min-width: 1024px) 72rem, 100vw" width={1600} />
        </div>
      )
    }

    case 'divider':
      return <Rule className={`${MEASURE} my-16`} />

    default:
      return null
  }
}

export async function RichText({ doc }: { doc: RichTextDoc }) {
  const nodes = doc.nodes ?? []
  if (nodes.length === 0) return null

  const { mediaIds, projectIds } = collectIds(nodes)
  const [media, projectList] = await Promise.all([
    getMediaMap(mediaIds),
    getProjectsByIds(projectIds),
  ])
  const projects = new Map(projectList.map((project) => [project.id, project]))

  return (
    <div className="mx-auto w-full max-w-[72rem]">
      {nodes.map((node, i) => (
        <Node key={i} node={node} media={media} projects={projects} />
      ))}
    </div>
  )
}
