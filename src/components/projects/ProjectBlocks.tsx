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
import { cn } from '@/lib/utils'
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

/**
 * Blocks that paint their own ground and their own vertical padding. Nothing is
 * added above or below them — a band that also received a wrapper gap would
 * read as a second, wider band.
 */
const SELF_PADDED = new Set<ProjectBlock['type']>(['SCENE_3D', 'QUOTE', 'PROJECT_INFO', 'CTA'])

/* --------------------------------- rhythm ---------------------------------- */

/**
 * The gap between two blocks, decided by the pair rather than by a constant.
 *
 * Every non-band block used to carry the same `py-[calc(var(--spacing-section)/2)]`,
 * so a photograph answering a paragraph sat exactly as far from it as one
 * chapter sat from the next: 140px, eleven times down a page, which is the
 * mechanical part of what reads as generated. Four steps, chosen by what the
 * two neighbours actually are:
 *
 *   none     the block below pads itself, or the one above already did
 *   tight    the two belong together — a picture answering the paragraph
 *            that just described it, or a second paragraph continuing a thought
 *   band     the ordinary beat between two parts of one chapter
 *   section  the page changing register: out of the hero, into the facts
 */
const GAP = {
  none: '',
  tight: 'mt-[clamp(2rem,5vh,3.5rem)]',
  band: 'mt-[clamp(3rem,7vh,5.5rem)]',
  section: 'mt-[clamp(4.5rem,11vh,9rem)]',
} as const

function isFullImage(block: ProjectBlock | undefined): boolean {
  return block?.type === 'IMAGE' && (block.data.width ?? 'wide') === 'full'
}

function gapBefore(block: ProjectBlock, prev: ProjectBlock | undefined): string {
  if (!prev) return GAP.none
  // A band supplies both of its own edges.
  if (SELF_PADDED.has(prev.type) || SELF_PADDED.has(block.type)) return GAP.none
  // The hero ends flush on its photograph; the story has to start somewhere.
  if (prev.type === 'HERO') return GAP.section
  // A full-bleed photograph and the prose either side of it are one thought.
  if (isFullImage(block) && prev.type === 'TEXT') return GAP.tight
  if (isFullImage(prev) && block.type === 'TEXT') return GAP.tight
  if (block.type === 'TEXT' && prev.type === 'TEXT') return GAP.tight
  if (block.type === 'IMAGE' && prev.type === 'TEXT') return GAP.tight
  // Two of the same kind in a row need the break the eye expects.
  if (block.type === prev.type) return GAP.band
  if (block.type === 'RELATED') return GAP.section
  return GAP.band
}

/**
 * How many projects a `RELATED` block asks for when it has no explicit picks.
 *
 * Six, not three, because `RelatedProjects` renders a *pinned rail*: it only
 * travels as far as its track overflows the viewport. Six 34rem cards make a
 * ~3608px track — ~1690px of travel at 1920px — where three made 1856px, which
 * is narrower than the screen the rail was pinned on. `RelatedProjects` still
 * measures before it pins, so a smaller catalogue degrades to the static grid.
 */
const RELATED_COUNT = 6

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** jsonb is not validated at the boundary, so ids are filtered before they reach SQL. */
function isId(value: unknown): value is string {
  return typeof value === 'string' && UUID.test(value)
}

function idList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter(isId)
}

/* --------------------------- before / after pairing ------------------------ */

/**
 * `BEFORE_AFTER` needs two *specific* photographs, and nothing in `ProjectDetail`
 * marks a photograph as "the before". The only channel that survives from the
 * media table to `MediaRef` is free text — `caption` and `alt` — so the pair is
 * declared there, with an explicit leading tag:
 *
 * ```
 * caption: "Trước — phòng khách nhìn từ sảnh"
 * caption: "Sau — phòng khách nhìn từ sảnh"
 * ```
 *
 * Accepted tags, accent- and case-insensitive, either bracketed (`[Trước] …`)
 * or followed by `:` `—` `–` `-` `|`:
 * `trước` / `trước cải tạo` / `hiện trạng` / `before`, and
 * `sau` / `sau cải tạo` / `sau khi hoàn thiện` / `after`.
 *
 * Untagged media is never guessed at. A wrongly paired slider is worse than no
 * slider, and gallery order alone carries no such meaning.
 */
const BEFORE_TAGS = new Set(['truoc', 'truoc cai tao', 'truoc khi cai tao', 'hien trang', 'before'])
const AFTER_TAGS = new Set(['sau', 'sau cai tao', 'sau khi cai tao', 'sau khi hoan thien', 'after'])

function deaccent(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/đ/g, 'd')
    .toLowerCase()
}

/** The bracketed or delimited prefix of a caption, normalised. `null` when absent. */
function leadingTag(text: string): string | null {
  const plain = deaccent(text).trim()
  const bracketed = /^[[(]([^\])]{1,32})[\])]/.exec(plain)
  if (bracketed?.[1]) return bracketed[1].trim().replace(/\s+/g, ' ')
  const delimited = /^([^:–—|-]{1,32})[:–—|-]/.exec(plain)
  if (delimited?.[1]) return delimited[1].trim().replace(/\s+/g, ' ')
  return null
}

type PairRole = 'before' | 'after'

function pairRole(media: MediaRef): PairRole | null {
  for (const text of [media.caption, media.alt]) {
    if (!text) continue
    const tag = leadingTag(text)
    if (tag === null) continue
    if (BEFORE_TAGS.has(tag)) return 'before'
    if (AFTER_TAGS.has(tag)) return 'after'
  }
  return null
}

/** Drops the tag, leaving the human half of the caption. */
function withoutTag(text: string | null): string | null {
  if (!text) return null
  const rest = text
    .replace(/^\s*(?:[[(][^\])]{1,32}[\])]|[^:–—|-]{1,32}[:–—|-])\s*/, '')
    .trim()
  return rest.length > 0 ? rest : null
}

interface BeforeAfterPair {
  before: MediaRef
  after: MediaRef
}

/** Each tagged `before` is closed by the next tagged `after`, in gallery order. */
function beforeAfterPairs(gallery: readonly MediaRef[]): BeforeAfterPair[] {
  const out: BeforeAfterPair[] = []
  let pending: MediaRef | null = null

  for (const media of gallery) {
    const role = pairRole(media)
    if (role === 'before') {
      pending = media
      continue
    }
    if (role === 'after' && pending) {
      out.push({ before: pending, after: media })
      pending = null
    }
  }

  return out
}

function pairLabel(pair: BeforeAfterPair): string {
  return (
    withoutTag(pair.after.caption) ??
    withoutTag(pair.before.caption) ??
    'Hiện trạng và không gian sau khi hoàn thiện.'
  )
}

/* ------------------------------ default story ------------------------------ */

/**
 * The story a project tells when nobody has composed one in the admin yet:
 * hero, description, gallery, any before/after pair the media declares, facts,
 * neighbours, invitation.
 */
export function defaultBlocks(project: ProjectDetail): ProjectBlock[] {
  const out: ProjectBlock[] = []
  let order = 0

  out.push({
    id: 'default-hero',
    type: 'HERO',
    order: order++,
    enabled: true,
    data: { mediaId: project.cover?.id ?? null, fullBleed: true },
  })

  if (project.description && project.description.trim().length > 0) {
    out.push({
      id: 'default-text',
      type: 'TEXT',
      order: order++,
      enabled: true,
      data: { body: project.description, width: 'narrow', align: 'left' },
    })
  }

  // The two halves of a comparison belong to the slider, not to the contact sheet.
  const pairs = beforeAfterPairs(project.gallery)
  const paired = new Set<string>()
  for (const pair of pairs) {
    paired.add(pair.before.id)
    paired.add(pair.after.id)
  }

  const gallery = project.gallery.filter((item) => !paired.has(item.id))
  if (gallery.length > 0) {
    out.push({
      id: 'default-gallery',
      type: 'GALLERY',
      order: order++,
      enabled: true,
      data: { mediaIds: gallery.map((item) => item.id), columns: 2 },
    })
  }

  pairs.forEach((pair, i) => {
    out.push({
      id: `default-before-after-${i}`,
      type: 'BEFORE_AFTER',
      order: order++,
      enabled: true,
      data: { beforeMediaId: pair.before.id, afterMediaId: pair.after.id, label: pairLabel(pair) },
    })
  })

  if (project.scene && project.scene.mode !== 'NONE') {
    out.push({
      id: 'default-scene',
      type: 'SCENE_3D',
      order: order++,
      enabled: true,
      data: { sceneId: project.scene.id, height: 'tall', label: 'Explore space' },
    })
  }

  out.push(
    { id: 'default-info', type: 'PROJECT_INFO', order: order++, enabled: true, data: { showServices: true } },
    { id: 'default-related', type: 'RELATED', order: order++, enabled: true, data: { projectIds: [] } },
    { id: 'default-cta', type: 'CTA', order: order++, enabled: true, data: {} },
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

/**
 * Where a block sits among its own kind, and what it is standing next to.
 *
 * The block *sequence* belongs to the database and cannot be rewritten here —
 * but how a block composes may depend on what came before it, and that is the
 * whole answer to "an IMAGE after an IMAGE should not look identical to the
 * first". `occurrence` is 0-based within the type, so a component can alternate
 * without ever being told which project it is drawing.
 */
interface BlockPosition {
  occurrence: number
  prev: ProjectBlock | undefined
  next: ProjectBlock | undefined
}

function renderBlock(item: ProjectBlock, ctx: BlockContext, at: BlockPosition): ReactNode {
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
          occurrence={at.occurrence}
        />
      )
    }

    case 'GALLERY': {
      const items = refs(ctx, item.data.mediaIds)
      if (items.length === 0) return null
      return (
        <ProjectGallery
          items={items}
          columns={item.data.columns ?? 2}
          caption={item.data.caption}
          occurrence={at.occurrence}
        />
      )
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
          occurrence={at.occurrence}
          // The block that answers the hero is the story's opening statement,
          // and it is the only one that knows it — a component cannot see what
          // it follows. Everything else about the block is identical.
          lede={at.prev?.type === 'HERO'}
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
    needsRelated ? getRelatedProjects(project.id, RELATED_COUNT) : Promise.resolve<ProjectSummary[]>([]),
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

  // Rendered blocks are resolved first so the rhythm is computed against what
  // actually appears: a HERO whose media went missing, or a GALLERY whose ids no
  // longer resolve, must not leave its gap behind as an empty band.
  const seen = new Map<ProjectBlock['type'], number>()
  const drawn: { item: ProjectBlock; node: ReactNode }[] = []

  for (let i = 0; i < list.length; i += 1) {
    const item = list[i]
    if (!item) continue
    const occurrence = seen.get(item.type) ?? 0
    const node = renderBlock(item, ctx, { occurrence, prev: list[i - 1], next: list[i + 1] })
    if (node === null) continue
    seen.set(item.type, occurrence + 1)
    drawn.push({ item, node })
  }

  return (
    <div className={className}>
      {drawn.map(({ item, node }, i) => (
        <div
          key={item.id}
          data-block={item.type}
          className={cn(
            gapBefore(item, drawn[i - 1]?.item),
            // Everything that is not its own band ends at the last block's
            // baseline; the page's closing padding belongs to the CTA.
            i === drawn.length - 1 && !SELF_PADDED.has(item.type) && 'mb-[clamp(4.5rem,11vh,9rem)]',
          )}
        >
          {node}
        </div>
      ))}
    </div>
  )
}
