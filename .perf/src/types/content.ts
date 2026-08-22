/**
 * Shared content contracts. Every agent imports from here — never redeclare these shapes.
 */

export type PublishStatus = 'draft' | 'published' | 'archived'
export type UserRole = 'admin' | 'editor'

export type SceneMode = 'NONE' | 'IMAGE' | 'DEPTH_2_5D' | 'PROCEDURAL_3D' | 'NATIVE_GLB'

export type MediaKind = 'image' | 'video' | 'glb' | 'hdri' | 'texture' | 'depth'

export interface MediaRef {
  id: string
  kind: MediaKind
  url: string
  width: number | null
  height: number | null
  alt: string | null
  caption: string | null
  blurDataURL: string | null
}

export interface SeoMeta {
  title?: string
  description?: string
  ogImageId?: string
  noIndex?: boolean
}

export interface ProjectSummary {
  id: string
  slug: string
  title: string
  subtitle: string | null
  summary: string | null
  location: string | null
  area: string | null
  year: number | null
  style: string | null
  featured: boolean
  categorySlug: string | null
  categoryName: string | null
  cover: MediaRef | null
  sceneMode: SceneMode
}

export interface ProjectDetail extends ProjectSummary {
  client: string | null
  duration: string | null
  services: string[]
  description: string | null
  status: PublishStatus
  publishedAt: Date | null
  gallery: MediaRef[]
  blocks: ProjectBlock[]
  scene: SceneConfig | null
  seo: SeoMeta | null
}

export interface ArticleSummary {
  id: string
  slug: string
  title: string
  excerpt: string | null
  cover: MediaRef | null
  publishedAt: Date | null
  tags: string[]
  readingMinutes: number | null
}

export interface ArticleDetail extends ArticleSummary {
  content: RichTextDoc
  status: PublishStatus
  authorName: string | null
  seo: SeoMeta | null
}

export interface ServiceItem {
  id: string
  slug: string
  indexLabel: string
  title: string
  summary: string | null
  description: string | null
  cover: MediaRef | null
  order: number
}

export interface MaterialItem {
  id: string
  slug: string
  name: string
  description: string | null
  media: MediaRef | null
  order: number
}

export interface NavItem {
  id: string
  label: string
  href: string
  order: number
  children?: NavItem[]
}

/* ---------------------------------- blocks --------------------------------- */

export type ProjectBlockType =
  | 'HERO'
  | 'SCENE_3D'
  | 'IMAGE'
  | 'GALLERY'
  | 'MASONRY'
  | 'VIDEO'
  | 'TEXT'
  | 'QUOTE'
  | 'MATERIALS'
  | 'BEFORE_AFTER'
  | 'PROJECT_INFO'
  | 'RELATED'
  | 'CTA'

export interface BlockBase<T extends ProjectBlockType, D> {
  id: string
  type: T
  order: number
  enabled: boolean
  data: D
}

export type RevealVariant =
  | 'revealUp'
  | 'revealLeft'
  | 'revealRight'
  | 'revealScale'
  | 'revealClip'
  | 'revealParallax'

export type ProjectBlock =
  | BlockBase<'HERO', { mediaId: string | null; eyebrow?: string; title?: string; fullBleed?: boolean }>
  | BlockBase<'SCENE_3D', { sceneId: string | null; height?: 'screen' | 'tall'; label?: string }>
  | BlockBase<
      'IMAGE',
      { mediaId: string | null; caption?: string; width?: 'full' | 'wide' | 'narrow'; reveal?: RevealVariant }
    >
  | BlockBase<'GALLERY', { mediaIds: string[]; columns?: 2 | 3 | 4; caption?: string }>
  | BlockBase<'MASONRY', { mediaIds: string[]; columns?: 2 | 3 | 4 }>
  | BlockBase<'VIDEO', { mediaId: string | null; poster?: string | null; loop?: boolean; caption?: string }>
  | BlockBase<'TEXT', { heading?: string; body: string; align?: 'left' | 'center'; width?: 'narrow' | 'wide' }>
  | BlockBase<'QUOTE', { quote: string; attribution?: string }>
  | BlockBase<'MATERIALS', { materialIds: string[]; heading?: string }>
  | BlockBase<'BEFORE_AFTER', { beforeMediaId: string | null; afterMediaId: string | null; label?: string }>
  | BlockBase<'PROJECT_INFO', { showServices?: boolean; note?: string }>
  | BlockBase<'RELATED', { projectIds: string[]; heading?: string }>
  | BlockBase<'CTA', { heading?: string; body?: string; buttonLabel?: string; href?: string }>

/* -------------------------------- rich text -------------------------------- */

export type RichTextNode =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'image'; mediaId: string; caption?: string }
  | { type: 'gallery'; mediaIds: string[] }
  | { type: 'video'; mediaId: string }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'projectRef'; projectId: string }
  | { type: 'divider' }

export interface RichTextDoc {
  nodes: RichTextNode[]
}

/* ------------------------------ homepage config ---------------------------- */

export type HomepageSectionKey =
  | 'HERO'
  | 'FEATURED_PROJECTS'
  | 'STUDIO'
  | 'SERVICES'
  | 'IMMERSIVE_PROJECT'
  | 'PHILOSOPHY'
  | 'JOURNAL'
  | 'CTA'

export interface HomepageSection {
  id: string
  key: HomepageSectionKey
  enabled: boolean
  order: number
  content: Record<string, unknown>
  settings: Record<string, unknown>
}

/* --------------------------------- scene ---------------------------------- */

export type Vec3 = readonly [number, number, number]

export interface CameraWaypoint {
  position: Vec3
  target: Vec3
  /** normalised scroll progress at which this waypoint is reached (0..1) */
  at?: number
  fov?: number
  ease?: string
  label?: string
}

export interface SceneSettings {
  /** DEPTH_2_5D */
  displacementScale?: number
  planeSegments?: number
  parallaxStrength?: number
  /** PROCEDURAL_3D */
  roomWidth?: number
  roomHeight?: number
  roomDepth?: number
  wallTextureIds?: string[]
  /** NATIVE_GLB */
  modelScale?: number
  modelPosition?: Vec3
  modelRotation?: Vec3
  /** shared */
  bloom?: number
  vignette?: number
  toneMapping?: 'ACESFilmic' | 'AgX' | 'Neutral' | 'None'
  background?: string
}

export interface SceneConfig {
  id: string
  projectId: string | null
  mode: SceneMode
  model: MediaRef | null
  /** source photo for IMAGE / DEPTH_2_5D / PROCEDURAL_3D modes */
  sourceImage: MediaRef | null
  depthMap: MediaRef | null
  envPreset: string
  envIntensity: number
  exposure: number
  fov: number
  shadows: boolean
  autoExplore: boolean
  animationSpeed: number
  scrollSensitivity: number
  waypoints: CameraWaypoint[]
  settings: SceneSettings
}

/* --------------------------------- theme ---------------------------------- */

export interface ThemeColors {
  canvas: string
  surface: string
  surfaceAlt: string
  ink: string
  muted: string
  line: string
  espresso: string
  accent: string
  accentSoft: string
}

export interface ThemeTypography {
  displayFont: string
  bodyFont: string
  displayScale: number
  bodyScale: number
  tracking: number
}

export interface MotionConfig {
  enabled: boolean
  reducedMotion: 'auto' | 'force' | 'off'
  scrollSmoothing: boolean
  pageTransition: boolean
  textReveal: boolean
  imageReveal: boolean
  parallax: boolean
  threeDAnimation: boolean
  cameraAnimation: boolean
  /** 0..1 global intensity multiplier */
  intensity: number
  /** seconds */
  transitionSpeed: number
}

export interface BrandConfig {
  companyName: string
  shortName: string
  tagline: string
  logoMediaId: string | null
  faviconMediaId: string | null
  email: string
  phone: string
  address: string
  social: { label: string; href: string }[]
}

export interface ThemeSettings {
  colors: ThemeColors
  typography: ThemeTypography
  motion: MotionConfig
  brand: BrandConfig
}

/* ----------------------------- reconstruction ------------------------------ */

export type ReconStatus = 'queued' | 'running' | 'review' | 'approved' | 'failed'

export interface ReconResult {
  depthMediaId?: string
  modelMediaId?: string
  textureMediaIds?: string[]
  suggestedWaypoints?: CameraWaypoint[]
  suggestedSettings?: SceneSettings
  metrics?: { durationMs: number; provider: string; confidence?: number }
}

export interface ReconJob {
  id: string
  projectId: string | null
  sourceMediaId: string
  mode: Exclude<SceneMode, 'NONE' | 'IMAGE'>
  status: ReconStatus
  progress: number
  error: string | null
  result: ReconResult | null
  createdAt: Date
  finishedAt: Date | null
}

/* -------------------------------- analytics -------------------------------- */

export type AnalyticsEventType =
  | 'PROJECT_VIEW'
  | 'THREE_OPEN'
  | 'THREE_INTERACT'
  | 'THREE_AUTO_EXPLORE'
  | 'ARTICLE_VIEW'
  | 'CONTACT_CTA'
  | 'CONTACT_SUBMIT'
