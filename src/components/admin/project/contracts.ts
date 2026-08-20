/**
 * Shared vocabulary for the project editor at `/admin/projects/[id]`.
 *
 * No React, no `next/*`, no server imports — the page (server) and the editor
 * (client) both read from here, so it has to stay a plain data module.
 *
 * The block drafts below are the editable projection of `ProjectBlock` from
 * `@/types/content`: same union, same `data` shapes, plus a stable client key
 * and a nullable id (a block that has never been saved has no uuid yet).
 * Optional fields are normalised to `''` / `false` / a concrete default so every
 * inspector control stays *controlled* — the DB stores untyped jsonb and a
 * missing key would otherwise flip an input to uncontrolled mid-edit.
 */

import type {
  MediaRef,
  ProjectBlock,
  ProjectBlockType,
  PublishStatus,
  RevealVariant,
  SceneMode,
} from '@/types/content'

/* ------------------------------- option lists ------------------------------ */

export interface CategoryOption {
  id: string
  name: string
}

export interface MaterialOption {
  id: string
  name: string
  enabled: boolean
}

export interface SiblingProjectOption {
  id: string
  title: string
  status: PublishStatus
}

export interface SceneOption {
  id: string
  /** Display label — falls back to the project title, then to a placeholder. */
  label: string
  /** The name actually stored on the row; null when the scene was never named. */
  name: string | null
  mode: SceneMode
  projectId: string | null
  projectTitle: string | null
}

/* ------------------------------- project draft ------------------------------ */

/** Everything `/admin/projects/[id]` needs about the project itself. */
export interface ProjectEditorSnapshot {
  id: string
  slug: string
  title: string
  subtitle: string
  summary: string
  description: string
  categoryId: string
  coverMediaId: string | null
  status: PublishStatus
  featured: boolean
  order: number
  location: string
  area: string
  /** DB stores an integer; the form field — and the action — speak strings. */
  year: string
  client: string
  duration: string
  style: string
  services: string[]
  seoTitle: string
  seoDescription: string
  updatedAt: string
  publishedAt: string | null
  viewCount: number
}

/** The editable half of the snapshot — matches `ProjectFormInput` field for field. */
export interface ProjectDraft {
  title: string
  slug: string
  subtitle: string
  summary: string
  description: string
  categoryId: string
  coverMediaId: string | null
  status: PublishStatus
  featured: boolean
  order: number
  location: string
  area: string
  year: string
  client: string
  duration: string
  style: string
  services: string[]
  seoTitle: string
  seoDescription: string
}

export function toProjectDraft(snapshot: ProjectEditorSnapshot): ProjectDraft {
  return {
    title: snapshot.title,
    slug: snapshot.slug,
    subtitle: snapshot.subtitle,
    summary: snapshot.summary,
    description: snapshot.description,
    categoryId: snapshot.categoryId,
    coverMediaId: snapshot.coverMediaId,
    status: snapshot.status,
    featured: snapshot.featured,
    order: snapshot.order,
    location: snapshot.location,
    area: snapshot.area,
    year: snapshot.year,
    client: snapshot.client,
    duration: snapshot.duration,
    style: snapshot.style,
    services: snapshot.services,
    seoTitle: snapshot.seoTitle,
    seoDescription: snapshot.seoDescription,
  }
}

export const PROJECT_STATUS_OPTIONS: readonly { value: PublishStatus; label: string }[] = [
  { value: 'draft', label: 'Bản nháp' },
  { value: 'published', label: 'Đã xuất bản' },
  { value: 'archived', label: 'Lưu trữ' },
]

/* --------------------------------- options --------------------------------- */

export interface SelectChoice {
  value: string
  label: string
}

export const REVEAL_OPTIONS: readonly SelectChoice[] = [
  { value: 'revealClip', label: 'Mở khuôn hình (mặc định)' },
  { value: 'revealUp', label: 'Trôi lên' },
  { value: 'revealLeft', label: 'Trôi từ trái' },
  { value: 'revealRight', label: 'Trôi từ phải' },
  { value: 'revealScale', label: 'Phóng nhẹ' },
  { value: 'revealParallax', label: 'Thị sai' },
]

const REVEAL_VALUES: readonly RevealVariant[] = [
  'revealUp',
  'revealLeft',
  'revealRight',
  'revealScale',
  'revealClip',
  'revealParallax',
]

export const IMAGE_WIDTH_OPTIONS: readonly SelectChoice[] = [
  { value: 'narrow', label: 'Hẹp' },
  { value: 'wide', label: 'Rộng (mặc định)' },
  { value: 'full', label: 'Tràn viền' },
]

export const TEXT_WIDTH_OPTIONS: readonly SelectChoice[] = [
  { value: 'narrow', label: 'Hẹp (mặc định)' },
  { value: 'wide', label: 'Rộng' },
]

export const ALIGN_OPTIONS: readonly SelectChoice[] = [
  { value: 'left', label: 'Canh trái' },
  { value: 'center', label: 'Canh giữa' },
]

export const SCENE_HEIGHT_OPTIONS: readonly SelectChoice[] = [
  { value: 'tall', label: 'Cao (mặc định)' },
  { value: 'screen', label: 'Tràn màn hình' },
]

export const COLUMN_OPTIONS: readonly SelectChoice[] = [
  { value: '2', label: '2 cột' },
  { value: '3', label: '3 cột' },
  { value: '4', label: '4 cột' },
]

/* -------------------------------- block meta -------------------------------- */

export interface BlockMeta {
  type: ProjectBlockType
  /** Vietnamese name shown on the canvas row. */
  label: string
  /** Small English editorial label. */
  en: string
  /** One sentence describing what the block puts on the public page. */
  note: string
  /** Paints its own full-width band on the public page. */
  band: boolean
  /** Renders nothing on the public page until this is satisfied. */
  requires?: string
}

export const BLOCK_META: readonly BlockMeta[] = [
  {
    type: 'HERO',
    label: 'Mở đầu',
    en: 'Hero',
    note: 'Ảnh lớn mở trang, kèm nhãn nhỏ và tiêu đề. Bỏ trống ảnh thì lấy ảnh bìa dự án.',
    band: true,
  },
  {
    type: 'SCENE_3D',
    label: 'Không gian 3D',
    en: 'Scene',
    note: 'Khung dựng ba chiều. Bỏ trống thì dùng cảnh đang gắn với dự án.',
    band: true,
    requires: 'Cần một cảnh 3D — nếu dự án cũng chưa có cảnh, khối này không hiện.',
  },
  {
    type: 'IMAGE',
    label: 'Một ảnh',
    en: 'Image',
    note: 'Một tấm ảnh với chú thích, bề rộng và kiểu xuất hiện riêng.',
    band: false,
    requires: 'Chưa chọn ảnh — khối này sẽ không hiện.',
  },
  {
    type: 'GALLERY',
    label: 'Bộ ảnh lưới',
    en: 'Gallery',
    note: 'Lưới ảnh đều nhau, 2–4 cột.',
    band: false,
    requires: 'Chưa có ảnh nào — khối này sẽ không hiện.',
  },
  {
    type: 'MASONRY',
    label: 'Bộ ảnh so le',
    en: 'Masonry',
    note: 'Lưới so le theo chiều cao ảnh, hợp với ảnh dọc và ngang lẫn lộn.',
    band: false,
    requires: 'Chưa có ảnh nào — khối này sẽ không hiện.',
  },
  {
    type: 'VIDEO',
    label: 'Video',
    en: 'Video',
    note: 'Một video, có thể đặt ảnh chờ và cho lặp.',
    band: false,
    requires: 'Chưa chọn video — khối này sẽ không hiện.',
  },
  {
    type: 'TEXT',
    label: 'Đoạn chữ',
    en: 'Text',
    note: 'Tiêu đề phụ và các đoạn văn. Xuống dòng trống để ngắt đoạn.',
    band: false,
    requires: 'Chưa có nội dung — khối này sẽ không hiện.',
  },
  {
    type: 'QUOTE',
    label: 'Trích dẫn',
    en: 'Quote',
    note: 'Một câu nói lớn trên nền tối, kèm người nói.',
    band: true,
    requires: 'Chưa có câu trích — khối này sẽ không hiện.',
  },
  {
    type: 'MATERIALS',
    label: 'Vật liệu',
    en: 'Materials',
    note: 'Bảng vật liệu lấy từ thư viện vật liệu chung.',
    band: false,
    requires: 'Chưa chọn vật liệu — khối này sẽ không hiện.',
  },
  {
    type: 'BEFORE_AFTER',
    label: 'Trước & sau',
    en: 'Before / after',
    note: 'Thanh trượt so sánh hai tấm ảnh cùng khung hình.',
    band: false,
    requires: 'Cần đủ cả ảnh trước và ảnh sau.',
  },
  {
    type: 'PROJECT_INFO',
    label: 'Thông tin dự án',
    en: 'Project info',
    note: 'Bảng thông số: địa điểm, diện tích, năm, phong cách, hạng mục.',
    band: false,
  },
  {
    type: 'RELATED',
    label: 'Dự án liên quan',
    en: 'Related',
    note: 'Ba dự án gợi ý. Bỏ trống thì hệ thống tự chọn theo danh mục.',
    band: false,
  },
  {
    type: 'CTA',
    label: 'Kêu gọi liên hệ',
    en: 'Call to action',
    note: 'Dải cuối trang mời khách liên hệ studio.',
    band: true,
  },
]

const META_BY_TYPE: Record<ProjectBlockType, BlockMeta> = BLOCK_META.reduce(
  (acc, meta) => {
    acc[meta.type] = meta
    return acc
  },
  {} as Record<ProjectBlockType, BlockMeta>,
)

export function blockMeta(type: ProjectBlockType): BlockMeta {
  return META_BY_TYPE[type]
}

export const BLOCK_TYPES: readonly ProjectBlockType[] = BLOCK_META.map((meta) => meta.type)

/* ------------------------------- block drafts ------------------------------- */

export type BlockDataOf<T extends ProjectBlockType> = Extract<ProjectBlock, { type: T }>['data']

export interface BlockDraftOf<T extends ProjectBlockType> {
  /** Stable React key. Never sent to the server. */
  key: string
  /** Persisted uuid, or null for a block that has never been saved. */
  id: string | null
  type: T
  enabled: boolean
  data: BlockDataOf<T>
}

export type BlockDraft = { [T in ProjectBlockType]: BlockDraftOf<T> }[ProjectBlockType]

const UUID_PATTERN = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

export function isUuid(value: string): boolean {
  return UUID_PATTERN.test(value)
}

let keyCounter = 0

/** Unique key for a block the editor just created. */
export function nextBlockKey(): string {
  keyCounter += 1
  return `blk-${keyCounter}-${Math.random().toString(36).slice(2, 8)}`
}

/* ------------------------------ value coercion ------------------------------ */

/**
 * `data` is jsonb: the types say one thing, the row may say another. These
 * readers take `unknown` so a typed value passes straight through while a
 * missing or malformed one lands on the default.
 */
function text(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

function bool(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback
}

function idOrNull(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null
}

function idList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  const out: string[] = []
  for (const entry of value) {
    if (typeof entry === 'string' && entry.trim().length > 0) out.push(entry)
  }
  return out
}

function columns(value: unknown, fallback: 2 | 3 | 4): 2 | 3 | 4 {
  return value === 2 || value === 3 || value === 4 ? value : fallback
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? (value as T) : fallback
}

/** Parses a `<select>` value back into the 2 | 3 | 4 literal the block wants. */
export function parseColumns(value: string, fallback: 2 | 3 | 4): 2 | 3 | 4 {
  const parsed = Number.parseInt(value, 10)
  return parsed === 2 || parsed === 3 || parsed === 4 ? parsed : fallback
}

export function parseReveal(value: string): RevealVariant {
  return oneOf<RevealVariant>(value, REVEAL_VALUES, 'revealClip')
}

/* ------------------------------ draft factories ----------------------------- */

/** A brand-new block of `type`, filled with the same defaults the renderer assumes. */
export function createBlock(type: ProjectBlockType): BlockDraft {
  const key = nextBlockKey()
  switch (type) {
    case 'HERO':
      return { key, id: null, type: 'HERO', enabled: true, data: { mediaId: null, eyebrow: '', title: '', fullBleed: true } }
    case 'SCENE_3D':
      return { key, id: null, type: 'SCENE_3D', enabled: true, data: { sceneId: null, height: 'tall', label: 'Explore space' } }
    case 'IMAGE':
      return { key, id: null, type: 'IMAGE', enabled: true, data: { mediaId: null, caption: '', width: 'wide', reveal: 'revealClip' } }
    case 'GALLERY':
      return { key, id: null, type: 'GALLERY', enabled: true, data: { mediaIds: [], columns: 2, caption: '' } }
    case 'MASONRY':
      return { key, id: null, type: 'MASONRY', enabled: true, data: { mediaIds: [], columns: 3 } }
    case 'VIDEO':
      return { key, id: null, type: 'VIDEO', enabled: true, data: { mediaId: null, poster: null, loop: true, caption: '' } }
    case 'TEXT':
      return { key, id: null, type: 'TEXT', enabled: true, data: { heading: '', body: '', align: 'left', width: 'narrow' } }
    case 'QUOTE':
      return { key, id: null, type: 'QUOTE', enabled: true, data: { quote: '', attribution: '' } }
    case 'MATERIALS':
      return { key, id: null, type: 'MATERIALS', enabled: true, data: { materialIds: [], heading: '' } }
    case 'BEFORE_AFTER':
      return { key, id: null, type: 'BEFORE_AFTER', enabled: true, data: { beforeMediaId: null, afterMediaId: null, label: '' } }
    case 'PROJECT_INFO':
      return { key, id: null, type: 'PROJECT_INFO', enabled: true, data: { showServices: true, note: '' } }
    case 'RELATED':
      return { key, id: null, type: 'RELATED', enabled: true, data: { projectIds: [], heading: '' } }
    case 'CTA':
      return { key, id: null, type: 'CTA', enabled: true, data: { heading: '', body: '', buttonLabel: '', href: '/contact' } }
  }
}

/** Loaded rows keep a deterministic key so SSR and hydration agree. */
export function toBlockDrafts(blocks: readonly ProjectBlock[]): BlockDraft[] {
  return [...blocks]
    .sort((a, b) => a.order - b.order)
    .map((block, index): BlockDraft => {
      const id = isUuid(block.id) ? block.id : null
      const key = id ? `blk-${id}` : `blk-row-${index}`
      const enabled = block.enabled !== false

      switch (block.type) {
        case 'HERO':
          return {
            key,
            id,
            type: 'HERO',
            enabled,
            data: {
              mediaId: idOrNull(block.data.mediaId),
              eyebrow: text(block.data.eyebrow),
              title: text(block.data.title),
              fullBleed: bool(block.data.fullBleed, true),
            },
          }
        case 'SCENE_3D':
          return {
            key,
            id,
            type: 'SCENE_3D',
            enabled,
            data: {
              sceneId: idOrNull(block.data.sceneId),
              height: oneOf(block.data.height, ['tall', 'screen'] as const, 'tall'),
              label: text(block.data.label, 'Explore space'),
            },
          }
        case 'IMAGE':
          return {
            key,
            id,
            type: 'IMAGE',
            enabled,
            data: {
              mediaId: idOrNull(block.data.mediaId),
              caption: text(block.data.caption),
              width: oneOf(block.data.width, ['full', 'wide', 'narrow'] as const, 'wide'),
              reveal: oneOf<RevealVariant>(block.data.reveal, REVEAL_VALUES, 'revealClip'),
            },
          }
        case 'GALLERY':
          return {
            key,
            id,
            type: 'GALLERY',
            enabled,
            data: {
              mediaIds: idList(block.data.mediaIds),
              columns: columns(block.data.columns, 2),
              caption: text(block.data.caption),
            },
          }
        case 'MASONRY':
          return {
            key,
            id,
            type: 'MASONRY',
            enabled,
            data: { mediaIds: idList(block.data.mediaIds), columns: columns(block.data.columns, 3) },
          }
        case 'VIDEO':
          return {
            key,
            id,
            type: 'VIDEO',
            enabled,
            data: {
              mediaId: idOrNull(block.data.mediaId),
              poster: idOrNull(block.data.poster),
              loop: bool(block.data.loop, true),
              caption: text(block.data.caption),
            },
          }
        case 'TEXT':
          return {
            key,
            id,
            type: 'TEXT',
            enabled,
            data: {
              heading: text(block.data.heading),
              body: text(block.data.body),
              align: oneOf(block.data.align, ['left', 'center'] as const, 'left'),
              width: oneOf(block.data.width, ['narrow', 'wide'] as const, 'narrow'),
            },
          }
        case 'QUOTE':
          return {
            key,
            id,
            type: 'QUOTE',
            enabled,
            data: { quote: text(block.data.quote), attribution: text(block.data.attribution) },
          }
        case 'MATERIALS':
          return {
            key,
            id,
            type: 'MATERIALS',
            enabled,
            data: { materialIds: idList(block.data.materialIds), heading: text(block.data.heading) },
          }
        case 'BEFORE_AFTER':
          return {
            key,
            id,
            type: 'BEFORE_AFTER',
            enabled,
            data: {
              beforeMediaId: idOrNull(block.data.beforeMediaId),
              afterMediaId: idOrNull(block.data.afterMediaId),
              label: text(block.data.label),
            },
          }
        case 'PROJECT_INFO':
          return {
            key,
            id,
            type: 'PROJECT_INFO',
            enabled,
            data: { showServices: bool(block.data.showServices, true), note: text(block.data.note) },
          }
        case 'RELATED':
          return {
            key,
            id,
            type: 'RELATED',
            enabled,
            data: { projectIds: idList(block.data.projectIds), heading: text(block.data.heading) },
          }
        case 'CTA':
          return {
            key,
            id,
            type: 'CTA',
            enabled,
            data: {
              heading: text(block.data.heading),
              body: text(block.data.body),
              buttonLabel: text(block.data.buttonLabel),
              href: text(block.data.href),
            },
          }
      }
    })
}

/**
 * Copy of a block, detached from its row so the save mints a fresh uuid.
 *
 * Spelt out case by case rather than through a `default:` branch: only a single
 * narrowed member spreads back into the union cleanly, and the id arrays have to
 * be copied or the twin would share them with the original.
 */
export function duplicateBlock(block: BlockDraft): BlockDraft {
  const key = nextBlockKey()
  switch (block.type) {
    case 'HERO':
      return { ...block, key, id: null, data: { ...block.data } }
    case 'SCENE_3D':
      return { ...block, key, id: null, data: { ...block.data } }
    case 'IMAGE':
      return { ...block, key, id: null, data: { ...block.data } }
    case 'GALLERY':
      return { ...block, key, id: null, data: { ...block.data, mediaIds: [...block.data.mediaIds] } }
    case 'MASONRY':
      return { ...block, key, id: null, data: { ...block.data, mediaIds: [...block.data.mediaIds] } }
    case 'VIDEO':
      return { ...block, key, id: null, data: { ...block.data } }
    case 'TEXT':
      return { ...block, key, id: null, data: { ...block.data } }
    case 'QUOTE':
      return { ...block, key, id: null, data: { ...block.data } }
    case 'MATERIALS':
      return { ...block, key, id: null, data: { ...block.data, materialIds: [...block.data.materialIds] } }
    case 'BEFORE_AFTER':
      return { ...block, key, id: null, data: { ...block.data } }
    case 'PROJECT_INFO':
      return { ...block, key, id: null, data: { ...block.data } }
    case 'RELATED':
      return { ...block, key, id: null, data: { ...block.data, projectIds: [...block.data.projectIds] } }
    case 'CTA':
      return { ...block, key, id: null, data: { ...block.data } }
  }
}

/**
 * The seed layout — the same story `defaultBlocks()` tells on the public side
 * when a project has no blocks at all. Reimplemented here because the renderer
 * is an async server component and must never be pulled into the client bundle.
 */
export function defaultBlockDrafts(input: {
  coverMediaId: string | null
  description: string
  galleryIds: readonly string[]
  sceneId: string | null
}): BlockDraft[] {
  const out: BlockDraft[] = []

  const hero = createBlock('HERO')
  if (hero.type === 'HERO') hero.data.mediaId = input.coverMediaId
  out.push(hero)

  if (input.description.trim().length > 0) {
    const block = createBlock('TEXT')
    if (block.type === 'TEXT') block.data.body = input.description
    out.push(block)
  }

  if (input.galleryIds.length > 0) {
    const block = createBlock('GALLERY')
    if (block.type === 'GALLERY') block.data.mediaIds = input.galleryIds.slice(0, 12)
    out.push(block)
  }

  if (input.sceneId) {
    const block = createBlock('SCENE_3D')
    if (block.type === 'SCENE_3D') block.data.sceneId = input.sceneId
    out.push(block)
  }

  out.push(createBlock('PROJECT_INFO'), createBlock('RELATED'), createBlock('CTA'))
  return out
}

/* --------------------------------- payload --------------------------------- */

export interface BlockSavePayload {
  id?: string
  type: ProjectBlockType
  enabled: boolean
  data: unknown
}

/** Shapes the draft list for `saveBlocks` — order comes from the array index. */
export function toBlockPayload(blocks: readonly BlockDraft[]): BlockSavePayload[] {
  return blocks.map((block) => ({
    ...(block.id ? { id: block.id } : {}),
    type: block.type,
    enabled: block.enabled,
    data: block.data,
  }))
}

/* --------------------------------- previews -------------------------------- */

export interface BlockPreviewContext {
  media: Readonly<Record<string, MediaRef>>
  materialNames: Readonly<Record<string, string>>
  projectTitles: Readonly<Record<string, string>>
  sceneNames: Readonly<Record<string, string>>
  /** Falls back used by HERO / SCENE_3D when the block leaves the slot empty. */
  projectCoverId: string | null
  projectSceneName: string | null
}

function mediaLabel(id: string | null, ctx: BlockPreviewContext): string {
  if (!id) return '—'
  const ref = ctx.media[id]
  if (!ref) return 'Tệp không còn tồn tại'
  return ref.alt ?? ref.caption ?? ref.url.split('/').pop() ?? 'Ảnh'
}

/** One calm line under the block name so the canvas reads as a page, not JSON. */
export function blockSummary(block: BlockDraft, ctx: BlockPreviewContext): string {
  switch (block.type) {
    case 'HERO': {
      const source = block.data.mediaId
        ? mediaLabel(block.data.mediaId, ctx)
        : ctx.projectCoverId
          ? 'Dùng ảnh bìa dự án'
          : 'Chưa có ảnh'
      const title = block.data.title?.trim()
      return title ? `${title} · ${source}` : source
    }
    case 'SCENE_3D': {
      const name = block.data.sceneId
        ? (ctx.sceneNames[block.data.sceneId] ?? 'Cảnh không còn tồn tại')
        : (ctx.projectSceneName ?? 'Chưa có cảnh nào')
      return `${name} · ${block.data.height === 'screen' ? 'tràn màn hình' : 'cao'}`
    }
    case 'IMAGE': {
      const caption = block.data.caption?.trim()
      return caption ? `${mediaLabel(block.data.mediaId, ctx)} · “${caption}”` : mediaLabel(block.data.mediaId, ctx)
    }
    case 'GALLERY':
      return `${block.data.mediaIds.length} ảnh · ${block.data.columns ?? 2} cột`
    case 'MASONRY':
      return `${block.data.mediaIds.length} ảnh · ${block.data.columns ?? 3} cột so le`
    case 'VIDEO':
      return `${mediaLabel(block.data.mediaId, ctx)}${block.data.loop ? ' · lặp' : ''}`
    case 'TEXT': {
      const body = block.data.body.trim().replace(/\s+/g, ' ')
      const heading = block.data.heading?.trim()
      if (heading && body) return `${heading} — ${body.slice(0, 90)}${body.length > 90 ? '…' : ''}`
      if (heading) return heading
      if (body) return `${body.slice(0, 110)}${body.length > 110 ? '…' : ''}`
      return 'Chưa có nội dung'
    }
    case 'QUOTE': {
      const quote = block.data.quote.trim()
      if (quote.length === 0) return 'Chưa có câu trích'
      const short = quote.length > 90 ? `${quote.slice(0, 90)}…` : quote
      const who = block.data.attribution?.trim()
      return who ? `“${short}” — ${who}` : `“${short}”`
    }
    case 'MATERIALS': {
      const names = block.data.materialIds
        .map((id) => ctx.materialNames[id])
        .filter((name): name is string => Boolean(name))
      return names.length > 0 ? names.slice(0, 4).join(' · ') : 'Chưa chọn vật liệu'
    }
    case 'BEFORE_AFTER': {
      if (!block.data.beforeMediaId || !block.data.afterMediaId) return 'Cần đủ hai ảnh'
      return block.data.label?.trim() || 'Trước và sau'
    }
    case 'PROJECT_INFO':
      return block.data.showServices === false ? 'Không kèm hạng mục dịch vụ' : 'Kèm hạng mục dịch vụ'
    case 'RELATED': {
      if (block.data.projectIds.length === 0) return 'Tự chọn theo danh mục'
      const names = block.data.projectIds
        .map((id) => ctx.projectTitles[id])
        .filter((name): name is string => Boolean(name))
      return names.length > 0 ? names.join(' · ') : `${block.data.projectIds.length} dự án`
    }
    case 'CTA': {
      const heading = block.data.heading?.trim()
      const label = block.data.buttonLabel?.trim()
      if (heading && label) return `${heading} · [${label}]`
      return heading || label || 'Dùng nội dung mặc định'
    }
  }
}

/** Media ids a canvas row should show as thumbnails, in reading order. */
export function blockThumbIds(block: BlockDraft, ctx: BlockPreviewContext): string[] {
  switch (block.type) {
    case 'HERO':
      return [block.data.mediaId ?? ctx.projectCoverId].filter((id): id is string => Boolean(id))
    case 'IMAGE':
      return block.data.mediaId ? [block.data.mediaId] : []
    case 'GALLERY':
    case 'MASONRY':
      return block.data.mediaIds.slice(0, 4)
    case 'VIDEO':
      return [block.data.poster, block.data.mediaId].filter((id): id is string => Boolean(id)).slice(0, 1)
    case 'BEFORE_AFTER':
      return [block.data.beforeMediaId, block.data.afterMediaId].filter((id): id is string => Boolean(id))
    default:
      return []
  }
}

/** True when the public page would render nothing for this block. */
export function blockIsBlank(block: BlockDraft, ctx: BlockPreviewContext): boolean {
  switch (block.type) {
    case 'HERO':
      return !block.data.mediaId && !ctx.projectCoverId
    case 'SCENE_3D':
      return !block.data.sceneId && !ctx.projectSceneName
    case 'IMAGE':
      return !block.data.mediaId
    case 'GALLERY':
    case 'MASONRY':
      return block.data.mediaIds.length === 0
    case 'VIDEO':
      return !block.data.mediaId
    case 'TEXT':
      return block.data.body.trim().length === 0 && (block.data.heading ?? '').trim().length === 0
    case 'QUOTE':
      return block.data.quote.trim().length === 0
    case 'MATERIALS':
      return block.data.materialIds.length === 0
    case 'BEFORE_AFTER':
      return !block.data.beforeMediaId || !block.data.afterMediaId
    default:
      return false
  }
}
