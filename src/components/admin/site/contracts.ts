/**
 * Shared, dependency-free contracts for the site-administration area
 * (theme / homepage / navigation / settings / journal).
 *
 * This module is imported from BOTH server actions and client components, so it
 * must stay free of `next/*`, `@/server/*` and React imports — types, plain
 * constants and pure functions only.
 */

import type {
  HomepageSectionKey,
  PublishStatus,
  RichTextNode,
  ThemeColors,
} from '@/types/content'

/* --------------------------------- results --------------------------------- */

/** The single return shape of every mutation in this area. */
export interface ActionResult {
  ok: boolean
  error?: string
  /** Keyed by dotted field path, e.g. `brand.email` or `nodes.2.text`. */
  fieldErrors?: Record<string, string>
}

export interface ArticleActionResult extends ActionResult {
  id?: string
  slug?: string
}

/* ---------------------------------- theme ---------------------------------- */

export interface ThemeColorToken {
  key: keyof ThemeColors
  cssVar: string
  /** English editorial label — token names stay English by design. */
  label: string
  /** Vietnamese description of where the colour is used. */
  role: string
  /** Rendered on a dark swatch instead of a light one. */
  dark?: boolean
}

export const THEME_COLOR_TOKENS: readonly ThemeColorToken[] = [
  { key: 'canvas', cssVar: '--c-canvas', label: 'Canvas', role: 'Nền trang — sắc đá vôi.' },
  { key: 'surface', cssVar: '--c-surface', label: 'Surface', role: 'Thẻ, dải nền xen kẽ — sắc yến mạch.' },
  { key: 'surfaceAlt', cssVar: '--c-surface-alt', label: 'Surface Alt', role: 'Ô lõm, nền lót ảnh.' },
  { key: 'ink', cssVar: '--c-ink', label: 'Ink', role: 'Chữ chính.', dark: true },
  { key: 'muted', cssVar: '--c-muted', label: 'Muted', role: 'Chữ phụ, nhãn eyebrow.' },
  { key: 'line', cssVar: '--c-line', label: 'Line', role: 'Đường kẻ mảnh, viền.' },
  { key: 'espresso', cssVar: '--c-espresso', label: 'Espresso', role: 'Khối tối điện ảnh, chân trang.', dark: true },
  { key: 'accent', cssVar: '--c-accent', label: 'Accent', role: 'Đồng đất — kẻ, số thứ tự, trạng thái.' },
  { key: 'accentSoft', cssVar: '--c-accent-soft', label: 'Accent Soft', role: 'Sắc hover, accent trên nền tối.' },
]

/**
 * The type library, mirrored from `FONT_LIBRARY` in `@/lib/theme`.
 *
 * Every family here is bundled through `next/font` AND carries a Vietnamese
 * subset. Offering anything else would be a trap: a family the site does not
 * bundle silently degrades to a system face, and a family without the Vietnamese
 * range (Instrument Serif, DM Serif Display, Libre Baskerville, EB Garamond)
 * drops out mid-word and mangles the dấu. Both used to be on this list.
 */
export const DISPLAY_FONTS: readonly string[] = [
  'Playfair Display',
  'Lora',
  'Source Serif 4',
  'Cormorant Garamond',
]

export const BODY_FONTS: readonly string[] = ['Be Vietnam Pro', 'Inter', 'Manrope']

/** Short Vietnamese note shown under each family in the theme editor. */
export const FONT_NOTES: Readonly<Record<string, string>> = {
  'Playfair Display': 'Nét dày rõ, tương phản cao — đọc tốt ở khổ lớn.',
  Lora: 'Ấm và mềm hơn, thân chữ đều, hợp bài viết dài.',
  'Source Serif 4': 'Trung tính, hiện đại, ít trang trí.',
  'Cormorant Garamond': 'Rất thanh mảnh — đẹp ở khổ rất lớn, mờ ở khổ nhỏ.',
  'Be Vietnam Pro': 'Thiết kế riêng cho tiếng Việt, dấu rõ và cân.',
  Inter: 'Trung tính, quen thuộc, chữ số đều.',
  Manrope: 'Hình học, hơi tròn, nhẹ nhàng.',
}

export const REDUCED_MOTION_OPTIONS: readonly { value: 'auto' | 'force' | 'off'; label: string }[] = [
  { value: 'auto', label: 'Tự động — theo thiết lập hệ điều hành' },
  { value: 'force', label: 'Luôn giảm — tắt mọi chuyển động' },
  { value: 'off', label: 'Bỏ qua — luôn chạy chuyển động đầy đủ' },
]

/** The boolean switches of `MotionConfig`, in the order they appear in the panel. */
export const MOTION_TOGGLES: readonly {
  key: 'scrollSmoothing' | 'pageTransition' | 'textReveal' | 'imageReveal' | 'parallax' | 'threeDAnimation' | 'cameraAnimation'
  label: string
  note: string
}[] = [
  { key: 'scrollSmoothing', label: 'Cuộn mượt', note: 'Lenis điều khiển cuộn trang.' },
  { key: 'pageTransition', label: 'Chuyển trang', note: 'Màn phủ khi đổi route.' },
  { key: 'textReveal', label: 'Chữ hiện dần', note: 'Tách dòng và trượt lên khi vào khung nhìn.' },
  { key: 'imageReveal', label: 'Ảnh hiện dần', note: 'Mở khuôn ảnh theo màn cắt.' },
  { key: 'parallax', label: 'Parallax', note: 'Lệch tốc độ giữa ảnh và nền.' },
  { key: 'threeDAnimation', label: 'Hoạt cảnh 3D', note: 'Chuyển động trong cảnh WebGL.' },
  { key: 'cameraAnimation', label: 'Máy quay theo cuộn', note: 'Camera 3D bám tiến trình cuộn.' },
]

/* --------------------------------- homepage -------------------------------- */

export type HomepageFieldKey =
  | 'eyebrow'
  | 'heading'
  | 'body'
  | 'cta'
  | 'featuredProject'
  | 'itemCount'

export interface HomepageSectionMeta {
  key: HomepageSectionKey
  /** English editorial label shown as the eyebrow. */
  en: string
  label: string
  note: string
  fields: readonly HomepageFieldKey[]
  itemCountLabel?: string
  itemCountMin?: number
  itemCountMax?: number
}

export const HOMEPAGE_SECTION_META: readonly HomepageSectionMeta[] = [
  {
    key: 'HERO',
    en: 'Hero',
    label: 'Mở đầu',
    note: 'Màn hình đầu tiên — tên studio, câu định vị, nút dẫn vào dự án.',
    fields: ['eyebrow', 'heading', 'body', 'cta'],
  },
  {
    key: 'FEATURED_PROJECTS',
    en: 'Selected Works',
    label: 'Dự án tiêu biểu',
    note: 'Dải dự án nổi bật cuộn ngang.',
    fields: ['eyebrow', 'heading', 'body', 'cta', 'itemCount'],
    itemCountLabel: 'Số dự án hiển thị',
    itemCountMin: 3,
    itemCountMax: 9,
  },
  {
    key: 'STUDIO',
    en: 'Studio',
    label: 'Về studio',
    note: 'Đoạn giới thiệu ngắn kèm ảnh xưởng.',
    fields: ['eyebrow', 'heading', 'body', 'cta'],
  },
  {
    key: 'SERVICES',
    en: 'Services',
    label: 'Dịch vụ',
    note: 'Danh mục dịch vụ đánh số.',
    fields: ['eyebrow', 'heading', 'body', 'cta', 'itemCount'],
    itemCountLabel: 'Số dịch vụ hiển thị',
    itemCountMin: 3,
    itemCountMax: 8,
  },
  {
    key: 'IMMERSIVE_PROJECT',
    en: 'Immersive',
    label: 'Không gian 3D',
    note: 'Một dự án được dựng cảnh 3D toàn màn hình.',
    fields: ['eyebrow', 'heading', 'body', 'cta', 'featuredProject'],
  },
  {
    key: 'PHILOSOPHY',
    en: 'Philosophy',
    label: 'Triết lý',
    note: 'Câu tuyên ngôn cỡ lớn trên nền tối.',
    fields: ['eyebrow', 'heading', 'body'],
  },
  {
    key: 'JOURNAL',
    en: 'Journal',
    label: 'Ghi chép',
    note: 'Bài viết mới nhất từ nhật ký.',
    fields: ['eyebrow', 'heading', 'cta', 'itemCount'],
    itemCountLabel: 'Số bài hiển thị',
    itemCountMin: 2,
    itemCountMax: 6,
  },
  {
    key: 'CTA',
    en: 'Contact',
    label: 'Lời mời',
    note: 'Khối kết — mời khách kể về ngôi nhà của họ.',
    fields: ['eyebrow', 'heading', 'body', 'cta'],
  },
]

export const HOMEPAGE_SECTION_KEYS: readonly HomepageSectionKey[] = HOMEPAGE_SECTION_META.map((m) => m.key)

export function homepageSectionMeta(key: HomepageSectionKey): HomepageSectionMeta {
  const found = HOMEPAGE_SECTION_META.find((meta) => meta.key === key)
  if (found) return found
  return { key, en: key, label: key, note: '', fields: ['eyebrow', 'heading', 'body'] }
}

/** The editable shape behind a homepage section's opaque `content` JSON. */
export interface HomepageContentDraft {
  eyebrow: string
  heading: string
  body: string
  ctaLabel: string
  ctaHref: string
  featuredProjectId: string
  itemCount: number
}

export const EMPTY_HOMEPAGE_CONTENT: HomepageContentDraft = {
  eyebrow: '',
  heading: '',
  body: '',
  ctaLabel: '',
  ctaHref: '',
  featuredProjectId: '',
  itemCount: 0,
}

function readString(source: Record<string, unknown>, ...keys: readonly string[]): string {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'string' && value.trim().length > 0) return value
  }
  return ''
}

function readNested(source: Record<string, unknown>, parent: string, child: string): string {
  const nested = source[parent]
  if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
    const value = (nested as Record<string, unknown>)[child]
    if (typeof value === 'string') return value
  }
  return ''
}

function readNumber(source: Record<string, unknown>, ...keys: readonly string[]): number {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === 'number' && Number.isFinite(value)) return Math.round(value)
  }
  return 0
}

/**
 * Read a section's stored JSON into the editor draft, tolerating every key
 * spelling the section components have used (`label`/`eyebrow`,
 * `title`/`heading`, `cta.label`/`buttonLabel`, …).
 */
export function draftFromContent(content: Record<string, unknown>): HomepageContentDraft {
  return {
    eyebrow: readString(content, 'eyebrow', 'label'),
    heading: readString(content, 'heading', 'title'),
    body: readString(content, 'body', 'text', 'summary'),
    ctaLabel: readString(content, 'ctaLabel', 'buttonLabel') || readNested(content, 'cta', 'label'),
    ctaHref: readString(content, 'ctaHref', 'href') || readNested(content, 'cta', 'href'),
    featuredProjectId: readString(content, 'featuredProjectId', 'projectId'),
    itemCount: readNumber(content, 'itemCount', 'limit', 'count'),
  }
}

/**
 * Serialise the draft back to JSON, writing every alias so that a section
 * component reading `label` and one reading `eyebrow` both find the value.
 * Empty fields are omitted rather than stored as `""`.
 */
export function contentFromDraft(
  draft: HomepageContentDraft,
  fields: readonly HomepageFieldKey[],
): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  const has = (field: HomepageFieldKey): boolean => fields.includes(field)

  const eyebrow = draft.eyebrow.trim()
  if (has('eyebrow') && eyebrow.length > 0) {
    out['eyebrow'] = eyebrow
    out['label'] = eyebrow
  }

  const heading = draft.heading.trim()
  if (has('heading') && heading.length > 0) {
    out['heading'] = heading
    out['title'] = heading
  }

  const body = draft.body.trim()
  if (has('body') && body.length > 0) out['body'] = body

  if (has('cta')) {
    const label = draft.ctaLabel.trim()
    const href = draft.ctaHref.trim()
    if (label.length > 0) {
      out['ctaLabel'] = label
      out['buttonLabel'] = label
    }
    if (href.length > 0) {
      out['ctaHref'] = href
      out['href'] = href
    }
    if (label.length > 0 || href.length > 0) out['cta'] = { label, href }
  }

  if (has('featuredProject') && draft.featuredProjectId.length > 0) {
    out['featuredProjectId'] = draft.featuredProjectId
    out['projectId'] = draft.featuredProjectId
  }

  if (has('itemCount') && draft.itemCount > 0) {
    out['itemCount'] = draft.itemCount
    out['limit'] = draft.itemCount
  }

  return out
}

/** Every key `contentFromDraft` may emit — stripped before a merge. */
const MANAGED_CONTENT_KEYS: readonly string[] = [
  'eyebrow',
  'label',
  'heading',
  'title',
  'body',
  'text',
  'summary',
  'ctaLabel',
  'buttonLabel',
  'ctaHref',
  'href',
  'cta',
  'featuredProjectId',
  'projectId',
  'itemCount',
  'limit',
  'count',
]

/**
 * Serialise the draft while preserving any key the editor does not own — a
 * section component may read settings this form never shows.
 */
export function mergeHomepageContent(
  original: Record<string, unknown>,
  draft: HomepageContentDraft,
  fields: readonly HomepageFieldKey[],
): Record<string, unknown> {
  const kept: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(original)) {
    if (!MANAGED_CONTENT_KEYS.includes(key)) kept[key] = value
  }
  return { ...kept, ...contentFromDraft(draft, fields) }
}

/* -------------------------------- navigation -------------------------------- */

export type NavLocation = 'header' | 'footer'

export interface NavDraftItem {
  /** A database uuid, or a `new-…` placeholder for a row that does not exist yet. */
  id: string
  label: string
  href: string
  enabled: boolean
}

export const NAV_HREF_HINT = "Bắt đầu bằng '/' cho trang nội bộ, hoặc 'https://' cho liên kết ngoài."

/** Mirrors the server-side rule so the form can flag a bad href before saving. */
export function navHrefError(href: string): string | null {
  const value = href.trim()
  if (value.length === 0) return 'Chưa nhập đường dẫn.'
  if (value.startsWith('/')) return null
  if (value.startsWith('https://') && value.length > 'https://'.length) return null
  return NAV_HREF_HINT
}

export function isNewId(id: string): boolean {
  return id.startsWith('new-')
}

/* --------------------------------- articles -------------------------------- */

export const ARTICLE_STATUS_LABELS: Record<PublishStatus, string> = {
  draft: 'Bản nháp',
  published: 'Đã đăng',
  archived: 'Lưu trữ',
}

export type RichTextNodeType = RichTextNode['type']

export interface RichTextNodeMeta {
  type: RichTextNodeType
  label: string
  en: string
  note: string
}

export const RICH_TEXT_NODE_META: readonly RichTextNodeMeta[] = [
  { type: 'heading', label: 'Tiêu đề', en: 'Heading', note: 'Tiêu đề cấp 2–4.' },
  { type: 'paragraph', label: 'Đoạn văn', en: 'Paragraph', note: 'Một đoạn nội dung.' },
  { type: 'image', label: 'Ảnh', en: 'Image', note: 'Một ảnh kèm chú thích.' },
  { type: 'gallery', label: 'Bộ ảnh', en: 'Gallery', note: 'Nhiều ảnh xếp lưới.' },
  { type: 'video', label: 'Video', en: 'Video', note: 'Video từ thư viện.' },
  { type: 'quote', label: 'Trích dẫn', en: 'Quote', note: 'Câu trích cỡ lớn.' },
  { type: 'list', label: 'Danh sách', en: 'List', note: 'Danh sách có hoặc không đánh số.' },
  { type: 'projectRef', label: 'Dẫn dự án', en: 'Project', note: 'Chèn thẻ liên kết tới một dự án.' },
  { type: 'divider', label: 'Đường kẻ', en: 'Divider', note: 'Kẻ ngang phân đoạn.' },
]

export function richTextNodeMeta(type: RichTextNodeType): RichTextNodeMeta {
  const found = RICH_TEXT_NODE_META.find((meta) => meta.type === type)
  return found ?? { type, label: type, en: type, note: '' }
}

/** A fresh node of the requested type, with sane empty values. */
export function emptyRichTextNode(type: RichTextNodeType): RichTextNode {
  switch (type) {
    case 'heading':
      return { type: 'heading', level: 2, text: '' }
    case 'paragraph':
      return { type: 'paragraph', text: '' }
    case 'image':
      return { type: 'image', mediaId: '' }
    case 'gallery':
      return { type: 'gallery', mediaIds: [] }
    case 'video':
      return { type: 'video', mediaId: '' }
    case 'quote':
      return { type: 'quote', text: '' }
    case 'list':
      return { type: 'list', ordered: false, items: [''] }
    case 'projectRef':
      return { type: 'projectRef', projectId: '' }
    case 'divider':
      return { type: 'divider' }
  }
}

/**
 * `RichTextNode` carries no id, but a drag-and-drop list needs a stable key per
 * row — otherwise React re-mounts every editor on each reorder and the focused
 * input loses its cursor. The editor therefore works over keyed wrappers and
 * unwraps them on save.
 */
export interface KeyedNode {
  key: string
  node: RichTextNode
}

let nodeKeyCounter = 0

export function nextNodeKey(): string {
  nodeKeyCounter += 1
  return `n${nodeKeyCounter}`
}

export function keyNodes(nodes: readonly RichTextNode[]): KeyedNode[] {
  return nodes.map((node) => ({ key: nextNodeKey(), node }))
}

export function unkeyNodes(items: readonly KeyedNode[]): RichTextNode[] {
  return items.map((item) => item.node)
}

/** Plain text of a document — feeds the automatic reading-time estimate. */
export function richTextPlainText(nodes: readonly RichTextNode[]): string {
  const parts: string[] = []
  for (const node of nodes) {
    switch (node.type) {
      case 'heading':
      case 'paragraph':
        parts.push(node.text)
        break
      case 'quote':
        parts.push(node.text)
        if (node.attribution) parts.push(node.attribution)
        break
      case 'list':
        parts.push(node.items.join(' '))
        break
      case 'image':
        if (node.caption) parts.push(node.caption)
        break
      default:
        break
    }
  }
  return parts.join(' ')
}

/** Words per minute used for the automatic estimate — matches `readingMinutes`. */
export function estimateReadingMinutes(nodes: readonly RichTextNode[]): number {
  const text = richTextPlainText(nodes).trim()
  if (text.length === 0) return 1
  return Math.max(1, Math.round(text.split(/\s+/).length / 200))
}

/* --------------------------------- settings -------------------------------- */

export interface SeoDefaults {
  /** `%s` is replaced by the page title. */
  titleTemplate: string
  defaultTitle: string
  description: string
  ogImageId: string | null
}

export const DEFAULT_SEO: SeoDefaults = {
  titleTemplate: '%s — GUHOMES',
  defaultTitle: 'GUHOMES — Không gian mang tính cách.',
  description:
    'Studio nội thất và kiến trúc tại TP. Hồ Chí Minh. Chúng tôi thiết kế không gian sống bằng vật liệu thật, ánh sáng thật và tỷ lệ được cân nhắc.',
  ogImageId: null,
}

export type ContactStatus = 'new' | 'contacted' | 'archived'

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  new: 'Mới',
  contacted: 'Đã liên hệ',
  archived: 'Lưu trữ',
}

/** Allowed forward/backward moves in the inbox workflow. */
export const CONTACT_STATUS_FLOW: Record<ContactStatus, readonly ContactStatus[]> = {
  new: ['contacted', 'archived'],
  contacted: ['archived', 'new'],
  archived: ['new', 'contacted'],
}
