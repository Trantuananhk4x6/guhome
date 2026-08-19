/**
 * The project story renderer.
 *
 * Server component: it resolves every id a block references — media, materials,
 * related projects, scenes — in one batch, then walks the ordered list through an
 * exhaustive switch. The `never` assignment in the default branch is the point:
 * adding a member to `ProjectBlockType` breaks the build here until it is drawn.
 *
 * Disabled blocks, and blocks whose content has gone missing, render nothing.
 */

import type { ReactNode } from 'react'

import { mediaUrl } from '@/lib/media'
import { getMediaMap } from '@/server/queries/media'
import { getProjectsByIds, getRelatedProjects } from '@/server/queries/projects'
import { getSceneById } from '@/server/queries/scenes'
import { getMaterialsByIds } from '@/server/queries/site'
import type {
  MaterialItem,
  MediaRef,
  ProjectBlock,
  ProjectDetail,
  ProjectSummary,
  SceneConfig,
} from '@/types/content'

import { BeforeAfter } from './BeforeAfter'
import { Project3D } from './Project3D'
import { ProjectCta } from './ProjectCta'
import { ProjectGallery } from './ProjectGallery'
import { ProjectHero } from './ProjectHero'
import { ProjectImage } from './ProjectImage'
import { ProjectInfo } from './ProjectInfo'
import { ProjectMasonry } from './ProjectMasonry'
import { ProjectMaterials } from './ProjectMaterials'
import { ProjectQuote } from './ProjectQuote'
import { ProjectText } from './ProjectText'
import { ProjectVideo } from './ProjectVideo'
import { RelatedProjects } from './RelatedProjects'

/** Blocks that paint their own full-width band and supply their own rhythm. */
const BANDS = new Set<ProjectBlock['type']>(['HERO', 'SCENE_3D', 'QUOTE', 'CTA'])

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** jsonb is not validated at the boundary, so ids are filtered before they reach SQL. */
function isId(value: unknown): value is string {
  return typeof value === 'string' && UUID.test(value)
}

function idList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter(isId)
}

/* ------------------------------ default story ------------------------------ */

/**
 * The story a project tells when nobody has composed one in the admin yet:
 * hero, description, gallery, facts, neighbours, invitation.
 */
export function defaultBlocks(project: ProjectDetail): ProjectBlock[] {
  const out: ProjectBlock[] = [
    {
      id: 'default-hero',
      type: 'HERO',
      order: 0,
      enabled: true,
      data: { mediaId: project.cover?.id ?? null, fullBleed: true },
    },
  ]

  if (project.description && project.description.trim().length > 0) {
    out.push({
      id: 'default-text',
      type: 'TEXT',
      order: 1,
      enabled: true,
      data: { body: project.description, width: 'narrow', align: 'left' },
    })
  }

  if (project.gallery.length > 0) {
    out.push({
      id: 'default-gallery',
      type: 'GALLERY',
      order: 2,
      enabled: true,
      data: { mediaIds: project.gallery.map((item) => item.id), columns: 2 },
    })
  }

  if (project.scene && project.scene.mode !== 'NONE') {
    out.push({
      id: 'default-scene',
      type: 'SCENE_3D',
      order: 3,
      enabled: true,
      data: { sceneId: project.scene.id, height: 'tall', label: 'Explore space' },
    })
  }

  out.push(
    { id: 'default-info', type: 'PROJECT_INFO', order: 4, enabled: true, data: { showServices: true } },
    { id: 'default-related', type: 'RELATED', order: 5, enabled: true, data: { projectIds: [] } },
    { id: 'default-cta', type: 'CTA', order: 6, enabled: true, data: {} },
  )

  return out
}

/* ------------------------------- id gathering ------------------------------ */

interface Gathered {
  mediaIds: string[]
  materialIds: string[]
  projectIds: string[]
  sceneIds: string[]
}

function gather(blocks: readonly ProjectBlock[]): Gathered {
  const mediaIds: string[] = []
  const materialIds: string[] = []
  const projectIds: string[] = []
  const sceneIds: string[] = []

  for (const item of blocks) {
    switch (item.type) {
      case 'HERO':
      case 'IMAGE':
        if (isId(item.data.mediaId)) mediaIds.push(item.data.mediaId)
        break
      case 'GALLERY':
      case 'MASONRY':
        mediaIds.push(...idList(item.data.mediaIds))
        break
      case 'VIDEO':
        if (isId(item.data.mediaId)) mediaIds.push(item.data.mediaId)
        if (isId(item.data.poster)) mediaIds.push(item.data.poster)
        break
      case 'BEFORE_AFTER':
        if (isId(item.data.beforeMediaId)) mediaIds.push(item.data.beforeMediaId)
        if (isId(item.data.afterMediaId)) mediaIds.push(item.data.afterMediaId)
        break
      case 'MATERIALS':
        materialIds.push(...idList(item.data.materialIds))
        break
      case 'RELATED':
        projectIds.push(...idList(item.data.projectIds))
        break
      case 'SCENE_3D':
        if (isId(item.data.sceneId)) sceneIds.push(item.data.sceneId)
        break
      case 'TEXT':
      case 'QUOTE':
      case 'PROJECT_INFO':
      case 'CTA':
        break
      default: {
        const exhaustive: never = item
        void exhaustive
      }
    }
  }

  return { mediaIds, materialIds, projectIds, sceneIds }
}

/* --------------------------------- context --------------------------------- */

interface BlockContext {
  project: ProjectDetail
  media: Map<string, MediaRef>
  materials: Map<string, MaterialItem>
  related: ProjectSummary[]
  relatedByBlock: Map<string, ProjectSummary[]>
  scenes: Map<string, SceneConfig>
  /** True when a dedicated 3D section exists, so the hero stays photographic. */
  hasSceneBlock: boolean
}

function ref(ctx: BlockContext, id: unknown): MediaRef | null {
  return isId(id) ? (ctx.media.get(id) ?? null) : null
}

function refs(ctx: BlockContext, ids: unknown): MediaRef[] {
  return idList(ids)
    .map((id) => ctx.media.get(id))
    .filter((item): item is MediaRef => item !== undefined)
}

/** Poster may be a media id or an already-public URL. */
function posterUrl(ctx: BlockContext, poster: unknown): string | null {
  if (typeof poster !== 'string' || poster.length === 0) return null
  const media = ref(ctx, poster)
  if (media) return mediaUrl(media, 1600)
  return poster.startsWith('/') || poster.startsWith('http') ? poster : null
}

/* -------------------------------- rendering -------------------------------- */

function renderBlock(item: ProjectBlock, ctx: BlockContext): ReactNode {
  const { project } = ctx

  switch (item.type) {
    case 'HERO': {
      const media = ref(ctx, item.data.mediaId) ?? project.cover
      return (
        <ProjectHero
          project={project}
          media={media}
          eyebrow={item.data.eyebrow}
          title={item.data.title}
          scene={ctx.hasSceneBlock ? null : project.scene}
          fullBleed={item.data.fullBleed ?? true}
        />
      )
    }

    case 'SCENE_3D': {
      const scene = (isId(item.data.sceneId) ? ctx.scenes.get(item.data.sceneId) : null) ?? project.scene
      if (!scene) return null
      return (
        <Project3D
          scene={scene}
          fallbackImage={project.cover}
          label={item.data.label ?? 'Explore space'}
          height={item.data.height ?? 'tall'}
          description={`Mô hình ba chiều của ${project.title}${
            project.location ? `, ${project.location}` : ''
          }. Toàn bộ thông tin về vật liệu, diện tích và bố cục được mô tả bằng văn bản trên trang này.`}
        />
      )
    }

    case 'IMAGE': {
      const media = ref(ctx, item.data.mediaId)
      if (!media) return null
      return (
        <ProjectImage
          media={media}
          caption={item.data.caption}
          width={item.data.width ?? 'wide'}
          reveal={item.data.reveal ?? 'revealClip'}
        />
      )
    }

    case 'GALLERY': {
      const items = refs(ctx, item.data.mediaIds)
      if (items.length === 0) return null
      return <ProjectGallery items={items} columns={item.data.columns ?? 2} caption={item.data.caption} />
    }

    case 'MASONRY': {
      const items = refs(ctx, item.data.mediaIds)
      if (items.length === 0) return null
      return <ProjectMasonry items={items} columns={item.data.columns ?? 3} />
    }

    case 'VIDEO': {
      const media = ref(ctx, item.data.mediaId)
      if (!media) return null
      return (
        <ProjectVideo
          media={media}
          poster={posterUrl(ctx, item.data.poster)}
          loop={item.data.loop ?? true}
          caption={item.data.caption}
        />
      )
    }

    case 'TEXT': {
      const body = typeof item.data.body === 'string' ? item.data.body : ''
      if (body.trim().length === 0 && !item.data.heading) return null
      return (
        <ProjectText
          heading={item.data.heading}
          body={body}
          align={item.data.align ?? 'left'}
          width={item.data.width ?? 'narrow'}
        />
      )
    }

    case 'QUOTE': {
      const quote = typeof item.data.quote === 'string' ? item.data.quote.trim() : ''
      if (quote.length === 0) return null
      return <ProjectQuote quote={quote} attribution={item.data.attribution} />
    }

    case 'MATERIALS': {
      const items = idList(item.data.materialIds)
        .map((id) => ctx.materials.get(id))
        .filter((material): material is MaterialItem => material !== undefined)
      if (items.length === 0) return null
      return <ProjectMaterials materials={items} heading={item.data.heading} />
    }

    case 'BEFORE_AFTER': {
      const before = ref(ctx, item.data.beforeMediaId)
      const after = ref(ctx, item.data.afterMediaId)
      if (!before || !after) return null
      return <BeforeAfter before={before} after={after} label={item.data.label} />
    }

    case 'PROJECT_INFO':
      return (
        <ProjectInfo project={project} showServices={item.data.showServices ?? true} note={item.data.note} />
      )

    case 'RELATED': {
      const items = ctx.relatedByBlock.get(item.id) ?? ctx.related
      if (items.length === 0) return null
      return <RelatedProjects projects={items} heading={item.data.heading} />
    }

    case 'CTA':
      return (
        <ProjectCta
          heading={item.data.heading}
          body={item.data.body}
          buttonLabel={item.data.buttonLabel}
          href={item.data.href}
        />
      )

    default: {
      // Exhaustiveness proof: a new ProjectBlockType lands here as a type error.
      const exhaustive: never = item
      void exhaustive
      return null
    }
  }
}

export interface ProjectBlocksProps {
  project: ProjectDetail
  /** Defaults to the project's own blocks, falling back to the default story. */
  blocks?: readonly ProjectBlock[]
  className?: string
}

export async function ProjectBlocks({ project, blocks, className }: ProjectBlocksProps) {
  const source = blocks ?? project.blocks
  const ordered = source.filter((item) => item.enabled).sort((a, b) => a.order - b.order)
  const list = ordered.length > 0 ? ordered : defaultBlocks(project)

  const { mediaIds, materialIds, projectIds, sceneIds } = gather(list)
  const needsRelated = list.some((item) => item.type === 'RELATED')

  const [media, materialItems, blockProjects, related, sceneList] = await Promise.all([
    getMediaMap(mediaIds),
    getMaterialsByIds(materialIds),
    getProjectsByIds(projectIds),
    needsRelated ? getRelatedProjects(project.id, 3) : Promise.resolve<ProjectSummary[]>([]),
    Promise.all(sceneIds.map((id) => getSceneById(id))),
  ])

  const projectById = new Map(blockProjects.map((item) => [item.id, item]))
  const relatedByBlock = new Map<string, ProjectSummary[]>()
  for (const item of list) {
    if (item.type !== 'RELATED') continue
    const picked = idList(item.data.projectIds)
      .map((id) => projectById.get(id))
      .filter((summary): summary is ProjectSummary => summary !== undefined)
    relatedByBlock.set(item.id, picked.length > 0 ? picked : related)
  }

  const ctx: BlockContext = {
    project,
    media,
    materials: new Map(materialItems.map((item) => [item.id, item])),
    related,
    relatedByBlock,
    scenes: new Map(
      sceneList.filter((scene): scene is SceneConfig => scene !== null).map((scene) => [scene.id, scene]),
    ),
    hasSceneBlock: list.some((item) => item.type === 'SCENE_3D'),
  }

  return (
    <div className={className}>
      {list.map((item) => {
        const node = renderBlock(item, ctx)
        if (node === null) return null
        return (
          <div key={item.id} className={BANDS.has(item.type) ? undefined : 'py-[calc(var(--spacing-section)/2)]'}>
            {node}
          </div>
        )
      })}
    </div>
  )
}
