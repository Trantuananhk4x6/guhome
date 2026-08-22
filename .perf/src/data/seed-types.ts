import type { SceneMode } from '@/types/content'

/** Fixed taxonomy — every content batch must use one of these slugs. */
export const CATEGORY_SEEDS = [
  { slug: 'can-ho', name: 'Căn hộ', nameEn: 'Apartments', order: 1 },
  { slug: 'nha-pho', name: 'Nhà phố', nameEn: 'Townhouses', order: 2 },
  { slug: 'biet-thu-resort', name: 'Biệt thự & Resort', nameEn: 'Villas & Resorts', order: 3 },
  { slug: 'thuong-mai', name: 'Thương mại', nameEn: 'Commercial', order: 4 },
  { slug: 'khong-gian', name: 'Không gian chuyên biệt', nameEn: 'Signature Spaces', order: 5 },
] as const

export type CategorySlug = (typeof CATEGORY_SEEDS)[number]['slug']

/**
 * One entry per leaf folder in docs/inventory.json that becomes a project.
 * `sourceDir` MUST match the inventory `dir` value byte-for-byte.
 */
export interface ProjectSeed {
  sourceDir: string
  slug: string
  title: string
  subtitle: string
  summary: string
  /** 3–5 paragraphs */
  description: string[]
  categorySlug: CategorySlug
  location: string
  area: string
  year: number
  client: string | null
  duration: string
  style: string
  services: string[]
  featured: boolean
  order: number
  /** index into the folder's sorted `files[]` used as the cover */
  coverIndex: number
  sceneMode: SceneMode
  seoDescription: string
}

export interface ContentBatch {
  batch: string
  projects: ProjectSeed[]
}
