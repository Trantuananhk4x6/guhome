import fs from 'node:fs'
import path from 'node:path'

import type { MediaRef, ProjectBlock, ProjectDetail, ProjectSummary, SceneMode } from '@/types/content'

export interface ProjectListOptions {
  limit?: number
  categorySlug?: string
  styleSlug?: string
  featured?: boolean
}

interface ManifestEntry {
  storageKey: string
  folder: string
  sourcePath: string
  index: number
  width: number
  height: number
  bytes: number
  mime?: string
  blurDataURL: string
  widths: number[]
}

interface RawProject {
  sourceDir: string
  slug: string
  title: string
  subtitle: string | null
  summary: string | null
  description: string[]
  categorySlug: string
  location: string | null
  area: string | null
  year: number | null
  client: string | null
  duration: string | null
  style: string | null
  services: string[]
  featured: boolean
  order: number
  coverIndex: number
  sceneMode: SceneMode
  seoDescription: string | null
}

const CATEGORY_NAMES: Record<string, string> = {
  'can-ho': 'Căn hộ',
  'nha-pho': 'Nhà phố',
  'biet-thu-resort': 'Biệt thự & Resort',
  'thuong-mai': 'Thương mại',
  'chuyen-biet': 'Chuyên biệt',
}

let cachedProjects: ProjectSummary[] | null = null
let cachedManifestByFolder: Map<string, ManifestEntry[]> | null = null
let cachedRawProjects: Map<string, RawProject> | null = null

function getManifestByFolder(): Map<string, ManifestEntry[]> {
  if (cachedManifestByFolder) return cachedManifestByFolder

  const manifestMap = new Map<string, ManifestEntry[]>()
  try {
    const manifestPath = path.resolve(process.cwd(), 'public/media/manifest.json')
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Record<string, ManifestEntry>
      for (const entry of Object.values(manifest)) {
        if (entry.folder) {
          const list = manifestMap.get(entry.folder) ?? []
          list.push(entry)
          manifestMap.set(entry.folder, list)
        }
      }
      for (const list of manifestMap.values()) {
        list.sort((a, b) => a.index - b.index)
      }
    }
  } catch (err) {
    console.error('[static-fallback] Failed to load manifest.json', err)
  }

  cachedManifestByFolder = manifestMap
  return manifestMap
}

function entryToMediaRef(entry: ManifestEntry, alt: string): MediaRef {
  return {
    id: entry.storageKey,
    url: entry.storageKey,
    kind: 'image',
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blurDataURL,
    alt,
    caption: null,
  }
}

function loadAllRawProjects(): RawProject[] {
  if (cachedRawProjects) return Array.from(cachedRawProjects.values())

  const rawMap = new Map<string, RawProject>()
  const contentDir = path.resolve(process.cwd(), 'src/data/content')

  const files = ['batch-1-apartments.json', 'batch-2-houses.json', 'batch-3-commercial.json']
  for (const file of files) {
    const filePath = path.join(contentDir, file)
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8')) as { projects: RawProject[] }
        for (const p of data.projects) {
          rawMap.set(p.slug, p)
        }
      } catch (err) {
        console.error(`[static-fallback] Failed to parse ${file}`, err)
      }
    }
  }

  cachedRawProjects = rawMap
  return Array.from(rawMap.values())
}

export function getStaticPublishedProjects(options: ProjectListOptions = {}): ProjectSummary[] {
  if (!cachedProjects) {
    const rawList = loadAllRawProjects()
    const manifestMap = getManifestByFolder()

    cachedProjects = rawList.map((p) => {
      const folderEntries = manifestMap.get(p.sourceDir) ?? []
      const coverEntry = folderEntries[p.coverIndex] ?? folderEntries[0] ?? null
      const cover = coverEntry ? entryToMediaRef(coverEntry, p.title) : null

      return {
        id: p.slug,
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        summary: p.summary,
        location: p.location,
        area: p.area,
        year: p.year,
        style: p.style,
        featured: p.featured,
        categorySlug: p.categorySlug,
        categoryName: CATEGORY_NAMES[p.categorySlug] ?? p.categorySlug,
        cover,
        sceneMode: p.sceneMode ?? 'NONE',
      }
    })
  }

  let result = cachedProjects

  if (options.categorySlug && options.categorySlug.length > 0) {
    result = result.filter((p) => p.categorySlug === options.categorySlug)
  }

  if (options.featured !== undefined) {
    result = result.filter((p) => p.featured === options.featured)
  }

  if (options.styleSlug && options.styleSlug.length > 0) {
    const searchStyle = options.styleSlug.toLowerCase()
    result = result.filter((p) => (p.style ? p.style.toLowerCase().includes(searchStyle) : false))
  }

  if (options.limit && options.limit > 0) {
    result = result.slice(0, options.limit)
  }

  return result
}

export function getStaticProjectDetail(slug: string): ProjectDetail | null {
  loadAllRawProjects()
  const raw = cachedRawProjects?.get(slug)
  if (!raw) return null

  const manifestMap = getManifestByFolder()
  const folderEntries = manifestMap.get(raw.sourceDir) ?? []
  const coverEntry = folderEntries[raw.coverIndex] ?? folderEntries[0] ?? null
  const cover = coverEntry ? entryToMediaRef(coverEntry, raw.title) : null

  const galleryMedia: MediaRef[] = folderEntries.map((e) => entryToMediaRef(e, raw.title))

  const blocks: ProjectBlock[] = []
  if (galleryMedia.length > 0) {
    blocks.push({
      id: `${slug}-gallery`,
      type: 'GALLERY',
      order: 1,
      enabled: true,
      data: {
        mediaIds: galleryMedia.map((m) => m.id),
      },
    })
  }

  return {
    id: raw.slug,
    slug: raw.slug,
    title: raw.title,
    subtitle: raw.subtitle,
    summary: raw.summary,
    description: Array.isArray(raw.description) ? raw.description.join('\n\n') : raw.description,
    categorySlug: raw.categorySlug,
    categoryName: CATEGORY_NAMES[raw.categorySlug] ?? raw.categorySlug,
    location: raw.location,
    area: raw.area,
    year: raw.year,
    client: raw.client,
    duration: raw.duration,
    style: raw.style,
    services: raw.services ?? [],
    featured: raw.featured ?? false,
    status: 'published',
    publishedAt: new Date(),
    cover,
    gallery: galleryMedia,
    blocks,
    scene: null,
    seo: {
      title: raw.title,
      description: raw.seoDescription ?? raw.summary ?? undefined,
    },
    sceneMode: raw.sceneMode ?? 'NONE',
  }
}
