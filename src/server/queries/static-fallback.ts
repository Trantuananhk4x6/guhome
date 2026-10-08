import fs from 'node:fs'
import path from 'node:path'

import type {
  ArticleDetail,
  ArticleSummary,
  MaterialItem,
  MediaRef,
  ProjectBlock,
  ProjectDetail,
  ProjectSummary,
  RichTextDoc,
  SceneMode,
  ServiceItem,
} from '@/types/content'

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
  const url = entry.storageKey.startsWith('/media/') ? entry.storageKey : `/media/${entry.storageKey}`
  return {
    id: entry.storageKey,
    url,
    kind: 'image',
    width: entry.width,
    height: entry.height,
    blurDataURL: entry.blurDataURL,
    alt,
    caption: null,
  }
}

let cachedManifestEntries: Map<string, ManifestEntry> | null = null

function getManifestEntries(): Map<string, ManifestEntry> {
  if (cachedManifestEntries) return cachedManifestEntries
  const map = new Map<string, ManifestEntry>()
  try {
    const manifestPath = path.resolve(process.cwd(), 'public/media/manifest.json')
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as Record<string, ManifestEntry>
      for (const [key, entry] of Object.entries(manifest)) {
        map.set(key, entry)
        if (entry.storageKey) {
          map.set(entry.storageKey, entry)
          map.set(`/media/${entry.storageKey}`, entry)
        }
      }
    }
  } catch (err) {
    console.error('[static-fallback] Failed to load manifest entries', err)
  }
  cachedManifestEntries = map
  return map
}

export function getStaticMediaById(id: string): MediaRef | null {
  const map = getManifestEntries()
  const entry = map.get(id)
  if (!entry) return null
  return entryToMediaRef(entry, 'GuHomes Architecture')
}

export function getStaticMediaMap(ids: readonly string[]): Map<string, MediaRef> {
  const res = new Map<string, MediaRef>()
  for (const id of ids) {
    const ref = getStaticMediaById(id)
    if (ref) res.set(id, ref)
  }
  return res
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

interface RawSiteData {
  services?: Array<{
    slug: string
    indexLabel: string
    title: string
    summary: string | null
    description: string | null
  }>
  materials?: Array<{
    slug: string
    name: string
    description: string | null
  }>
  articles?: Array<{
    slug: string
    title: string
    excerpt: string | null
    tags: string[]
    content: RichTextDoc
  }>
}

let cachedSiteData: RawSiteData | null = null

function loadSiteData(): RawSiteData {
  if (cachedSiteData) return cachedSiteData
  try {
    const siteJsonPath = path.resolve(process.cwd(), 'src/data/content/site.json')
    if (fs.existsSync(siteJsonPath)) {
      cachedSiteData = JSON.parse(fs.readFileSync(siteJsonPath, 'utf8')) as RawSiteData
      return cachedSiteData
    }
  } catch (err) {
    console.error('[static-fallback] Failed to parse site.json', err)
  }
  return {}
}

const SERVICE_COVERS = [
  'ben-kia-song/0', // 01 Thiết kế nội thất (The Opera Metropole)
  'anh-khoa/0', // 02 Thiết kế kiến trúc (Wabi Sabi Duplex)
  'bong-go-sam/0', // 03 Thiết kế & thi công (The Global City)
  'chi-quynh-anh/0', // 04 Cải tạo (Luxury Apartment)
  'bep-ben-khom-truc/0', // 05 Đồ nội thất may đo (Kitchen & Bespoke Joinery)
]

export function getStaticServices(): ServiceItem[] {
  const site = loadSiteData()
  const list = site.services ?? []
  return list.map((s, idx) => {
    const coverKey = SERVICE_COVERS[idx % SERVICE_COVERS.length]
    const cover = coverKey ? getStaticMediaById(coverKey) : null
    return {
      id: s.slug,
      slug: s.slug,
      indexLabel: s.indexLabel || `0${idx + 1}`,
      title: s.title,
      summary: s.summary,
      description: s.description,
      cover,
      order: idx,
    }
  })
}

export function getStaticServiceBySlug(slug: string): ServiceItem | null {
  const all = getStaticServices()
  return all.find((item) => item.slug === slug) ?? null
}

const MATERIAL_COVERS = [
  'nha-pho-4-oc-cho-phong-khach/7', // Gỗ
  'anh-kim-van-da/0', // Đá
  'ben-kia-song/2', // Marble
  'anh-khoa/2', // Kim loại
  'chi-quynh-anh/2', // Vải
  'ben-kia-song/4', // Kính
]

export function getStaticMaterials(): MaterialItem[] {
  const site = loadSiteData()
  const list = site.materials ?? []
  return list.map((m, idx) => {
    const coverKey = MATERIAL_COVERS[idx % MATERIAL_COVERS.length]
    const media = coverKey ? getStaticMediaById(coverKey) : null
    return {
      id: m.slug,
      slug: m.slug,
      name: m.name,
      description: m.description,
      media,
      order: idx,
    }
  })
}

export function getStaticArticles(options?: { limit?: number; tag?: string }): ArticleSummary[] {
  const site = loadSiteData()
  let list = site.articles ?? []
  if (options?.tag) {
    list = list.filter((a) => a.tags?.includes(options.tag!))
  }
  if (options?.limit && options.limit > 0) {
    list = list.slice(0, options.limit)
  }
  return list.map((a, idx) => {
    const coverKey = MATERIAL_COVERS[idx % MATERIAL_COVERS.length]
    const cover = coverKey ? getStaticMediaById(coverKey) : null
    return {
      id: a.slug,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      cover,
      publishedAt: new Date(),
      tags: a.tags ?? [],
      readingMinutes: 5 + idx,
    }
  })
}

export function getStaticArticleDetail(slug: string): ArticleDetail | null {
  const site = loadSiteData()
  const article = (site.articles ?? []).find((a) => a.slug === slug)
  if (!article) return null
  const coverKey = MATERIAL_COVERS[0]
  const cover = coverKey ? getStaticMediaById(coverKey) : null
  return {
    id: article.slug,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    cover,
    publishedAt: new Date(),
    tags: article.tags ?? [],
    readingMinutes: 6,
    content: article.content,
    status: 'published',
    authorName: 'GuHomes Editorial',
    seo: {
      title: article.title,
      description: article.excerpt ?? undefined,
    },
  }
}

