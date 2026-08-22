import type { CameraWaypoint } from '@/types/content'

/**
 * Per-image intelligence authored by the image-intelligence fleet
 * (src/data/content/detail/detail-NN.json). Keyed on the inventory folder, so it
 * survives renames of project slugs and titles.
 */

export const ROOM_LABELS = [
  'phòng khách',
  'bếp',
  'phòng ăn',
  'phòng ngủ chính',
  'phòng ngủ',
  'phòng tắm',
  'phòng thờ',
  'phòng trà',
  'phòng làm việc',
  'phòng trẻ em',
  'lối vào',
  'ban công',
  'mặt tiền',
  'toàn cảnh',
  'chi tiết',
  'khác',
] as const

export type RoomLabel = (typeof ROOM_LABELS)[number]

export const MATERIAL_SLUGS = ['go', 'da', 'da-hoa-cuong', 'kim-loai', 'vai', 'kinh'] as const

export type MaterialSlug = (typeof MATERIAL_SLUGS)[number]

export interface ImageDetail {
  /** 0-based index into the folder's sorted files[] from docs/inventory.json */
  index: number
  alt: string
  caption: string
  room: RoomLabel | string
  /** 1..5 showcase quality — galleries are ordered by this */
  quality: number
}

export interface FolderDetail {
  sourceDir: string
  coverIndex: number
  materials: MaterialSlug[] | string[]
  rooms: string[]
  palette: string
  lighting: string
  waypoints: CameraWaypoint[]
  images: ImageDetail[]
}

export interface DetailBatch {
  agent: string
  folders: FolderDetail[]
}
