/**
 * View models shared by the media library and the 3D asset manager.
 *
 * Pure data + label maps — no runtime dependency on the database or on React,
 * so both server pages and client components can import from here.
 */
import type {
  MediaKind,
  MediaRef,
  PublishStatus,
  ReconResult,
  ReconStatus,
  SceneConfig,
  SceneMode,
} from '@/types/content'

/** A media row as the admin sees it: the public ref plus bookkeeping. */
export interface MediaItem extends MediaRef {
  storageKey: string
  folder: string | null
  mime: string | null
  bytes: number | null
  createdAt: Date
}

export interface ProjectOption {
  id: string
  title: string
  slug: string
  status: PublishStatus
}

/** One row of the scene list, with everything the editor needs pre-resolved. */
export interface SceneListItem {
  config: SceneConfig
  name: string | null
  projectTitle: string | null
  projectSlug: string | null
  updatedAt: Date
}

export interface ReconJobItem {
  id: string
  projectId: string | null
  projectTitle: string | null
  sceneId: string | null
  source: MediaRef | null
  mode: Exclude<SceneMode, 'NONE' | 'IMAGE'>
  status: ReconStatus
  progress: number
  provider: string
  error: string | null
  result: ReconResult | null
  resultDepth: MediaRef | null
  resultModel: MediaRef | null
  createdAt: Date
  startedAt: Date | null
  finishedAt: Date | null
}

/* --------------------------------- labels --------------------------------- */

export const MEDIA_KIND_LABELS: Record<MediaKind, string> = {
  image: 'Ảnh',
  video: 'Video',
  glb: 'Mô hình',
  hdri: 'HDRI',
  texture: 'Vân liệu',
  depth: 'Độ sâu',
}

export const MEDIA_KINDS: readonly MediaKind[] = ['image', 'video', 'glb', 'hdri', 'texture', 'depth']

export const SCENE_MODE_LABELS: Record<SceneMode, string> = {
  NONE: 'Không dùng 3D',
  IMAGE: 'Ảnh tĩnh',
  DEPTH_2_5D: 'Chiều sâu 2.5D',
  PROCEDURAL_3D: 'Dựng phòng 3D',
  NATIVE_GLB: 'Mô hình GLB',
}

export const SCENE_MODES: readonly SceneMode[] = [
  'NONE',
  'IMAGE',
  'DEPTH_2_5D',
  'PROCEDURAL_3D',
  'NATIVE_GLB',
]

/** Modes a reconstruction job can produce. */
export const RECON_MODES: readonly Exclude<SceneMode, 'NONE' | 'IMAGE'>[] = [
  'DEPTH_2_5D',
  'PROCEDURAL_3D',
  'NATIVE_GLB',
]

export const RECON_STATUS_LABELS: Record<ReconStatus, string> = {
  queued: 'Chờ xử lý',
  running: 'Đang chạy',
  review: 'Chờ duyệt',
  approved: 'Đã duyệt',
  failed: 'Lỗi',
}

/** drei `<Environment preset>` values. */
export const ENV_PRESETS: readonly string[] = [
  'apartment',
  'city',
  'dawn',
  'forest',
  'lobby',
  'night',
  'park',
  'studio',
  'sunset',
  'warehouse',
]

export const TONE_MAPPINGS: readonly ('ACESFilmic' | 'AgX' | 'Neutral' | 'None')[] = [
  'ACESFilmic',
  'AgX',
  'Neutral',
  'None',
]

/* -------------------------------- upload -------------------------------- */

/** Byte ceilings enforced by `POST /api/upload`, mirrored here for the client. */
export const UPLOAD_LIMITS: Record<'image' | 'video' | 'model' | 'hdri', number> = {
  image: 12 * 1024 * 1024,
  video: 200 * 1024 * 1024,
  model: 80 * 1024 * 1024,
  hdri: 60 * 1024 * 1024,
}

/** Shape returned by `POST /api/upload`. */
export interface UploadResponse {
  ok: boolean
  error?: string
  media?: MediaItem
}
