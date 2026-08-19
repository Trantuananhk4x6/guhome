/**
 * Seeds Neon from the authored content batches + the media manifest.
 *
 *   npx tsx scripts/seed.ts            full seed (idempotent, upserts by slug)
 *   npx tsx scripts/seed.ts --content  content only, skip media rows
 *
 * Safe to re-run: every write is an upsert keyed on a natural key
 * (users.email, categories.slug, projects.slug, media.storage_key, ...).
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { randomBytes, scryptSync } from 'node:crypto'

import { config } from 'dotenv'
import { eq, sql } from 'drizzle-orm'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

const { db } = await import('../src/server/db/index')
const schema = await import('../src/server/db/schema')
const { CATEGORY_SEEDS } = await import('../src/data/seed-types')
const themeModule = await import('../src/lib/theme').catch(() => null)

import type { ProjectSeed } from '../src/data/seed-types'
import type { DetailBatch, FolderDetail, ImageDetail } from '../src/data/detail-types'
import type { CameraWaypoint, SceneMode, ThemeSettings } from '../src/types/content'
import type { HomepageSectionRow, ProjectBlockTypeDb } from '../src/server/db/schema'

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

const contentOnly = process.argv.includes('--content')

/* --------------------------------- helpers -------------------------------- */

function log(step: string, detail = '') {
  console.log(`  ${step.padEnd(26)} ${detail}`)
}

function hashPassword(pw: string): string {
  const salt = randomBytes(16)
  const key = scryptSync(pw, salt, 64)
  return `scrypt$16384$${salt.toString('base64')}$${key.toString('base64')}`
}

function readJson<T>(path: string): T | null {
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, 'utf8')) as T
}

function loadBatches(): ProjectSeed[] {
  const dir = join(root, 'src/data/content')
  if (!existsSync(dir)) return []
  const files = readdirSync(dir).filter((f) => f.startsWith('batch-') && f.endsWith('.json'))
  const all: ProjectSeed[] = []
  for (const f of files) {
    const parsed = readJson<{ batch: string; projects: ProjectSeed[] }>(join(dir, f))
    if (!parsed) continue
    log('content batch', `${f} → ${parsed.projects.length} projects`)
    all.push(...parsed.projects)
  }

  // The slug is the natural key every upsert keys on, and sourceDir is what binds a
  // project to its photos. A collision between batches would silently overwrite a
  // whole project, so disambiguate loudly instead of losing content.
  const takenSlugs = new Set<string>()
  const takenDirs = new Map<string, string>()
  const result: ProjectSeed[] = []
  for (const project of all) {
    let slug = project.slug
    if (takenSlugs.has(slug)) {
      let n = 2
      while (takenSlugs.has(`${slug}-${n}`)) n++
      console.warn(`  ! duplicate slug "${slug}" (${project.title}) — seeding as "${slug}-${n}"`)
      slug = `${slug}-${n}`
    }
    const claimedBy = takenDirs.get(project.sourceDir)
    if (claimedBy) {
      console.warn(`  ! "${project.title}" claims a folder already used by "${claimedBy}" — ${project.sourceDir}`)
    }
    takenSlugs.add(slug)
    takenDirs.set(project.sourceDir, project.title)
    result.push(slug === project.slug ? project : { ...project, slug })
  }
  return result
}

/**
 * Per-image intelligence from src/data/content/detail/*.json — alt text, captions,
 * showcase ranking, materials and camera waypoints, keyed on the inventory folder.
 * Optional: the seed degrades to generic alt text when the fleet has not run.
 */
function loadDetails(): Map<string, FolderDetail> {
  const dir = join(root, 'src/data/content/detail')
  const byFolder = new Map<string, FolderDetail>()
  if (!existsSync(dir)) {
    log('image details', 'none — using generic alt text')
    return byFolder
  }
  let images = 0
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.json'))) {
    const parsed = readJson<DetailBatch>(join(dir, f))
    if (!parsed?.folders) continue
    for (const folder of parsed.folders) {
      byFolder.set(folder.sourceDir, folder)
      images += folder.images?.length ?? 0
    }
  }
  log('image details', `${byFolder.size} folders · ${images} described images`)
  return byFolder
}

function loadManifest(): Map<string, ManifestEntry[]> {
  const byFolder = new Map<string, ManifestEntry[]>()
  const entries = readJson<ManifestEntry[]>(join(root, 'public/media/manifest.json'))
  if (!entries) {
    log('media manifest', 'MISSING — run `npm run media:build` first (seeding text only)')
    return byFolder
  }
  for (const e of entries) {
    const list = byFolder.get(e.folder) ?? []
    list.push(e)
    byFolder.set(e.folder, list)
  }
  for (const list of byFolder.values()) list.sort((a, b) => a.index - b.index)
  log('media manifest', `${entries.length} derivatives across ${byFolder.size} folders`)
  return byFolder
}

/* ---------------------------------- steps --------------------------------- */

async function seedAdmin(): Promise<string> {
  const email = process.env.ADMIN_EMAIL ?? 'admin@anatelier.vn'
  const password = process.env.ADMIN_PASSWORD ?? 'AnAtelier@2026'
  const existing = await db.select().from(schema.users).where(eq(schema.users.email, email)).limit(1)
  const found = existing[0]
  if (found) {
    log('admin user', `${email} (exists)`)
    return found.id
  }
  const inserted = await db
    .insert(schema.users)
    .values({ email, name: 'AN ATELIER Studio', passwordHash: hashPassword(password), role: 'admin' })
    .returning({ id: schema.users.id })
  const row = inserted[0]
  if (!row) throw new Error('failed to create admin user')
  log('admin user', `${email} (created)`)
  return row.id
}

async function seedCategories(): Promise<Map<string, string>> {
  const map = new Map<string, string>()
  for (const c of CATEGORY_SEEDS) {
    const rows = await db
      .insert(schema.categories)
      .values({ slug: c.slug, name: c.name, nameEn: c.nameEn, order: c.order, kind: 'project' })
      .onConflictDoUpdate({
        target: schema.categories.slug,
        set: { name: c.name, nameEn: c.nameEn, order: c.order },
      })
      .returning({ id: schema.categories.id })
    const row = rows[0]
    if (row) map.set(c.slug, row.id)
  }
  const journal = await db
    .insert(schema.categories)
    .values({ slug: 'ghi-chep', name: 'Ghi chép', nameEn: 'Notes', order: 1, kind: 'journal' })
    .onConflictDoUpdate({ target: schema.categories.slug, set: { name: 'Ghi chép' } })
    .returning({ id: schema.categories.id })
  const journalRow = journal[0]
  if (journalRow) map.set('ghi-chep', journalRow.id)
  log('categories', `${map.size} rows`)
  return map
}

async function upsertMedia(entry: ManifestEntry, alt: string, caption: string | null): Promise<string> {
  const rows = await db
    .insert(schema.media)
    .values({
      kind: 'image',
      storageKey: entry.storageKey,
      url: `/media/${entry.storageKey}-${Math.max(...entry.widths)}.webp`,
      width: entry.width,
      height: entry.height,
      bytes: entry.bytes,
      mime: entry.mime ?? 'image/webp',
      blurDataUrl: entry.blurDataURL,
      alt,
      caption,
      folder: entry.folder,
      sourcePath: entry.sourcePath,
    })
    .onConflictDoUpdate({
      target: schema.media.storageKey,
      set: {
        width: entry.width,
        height: entry.height,
        bytes: entry.bytes,
        blurDataUrl: entry.blurDataURL,
        alt,
        caption,
        folder: entry.folder,
      },
    })
    .returning({ id: schema.media.id })
  const row = rows[0]
  if (!row) throw new Error(`failed to upsert media ${entry.storageKey}`)
  return row.id
}

function blocksFor(
  seed: ProjectSeed,
  mediaIds: string[],
  sceneId: string | null,
  materialIds: string[],
  detail: FolderDetail | undefined,
) {
  const [first, second, third, ...rest] = mediaIds
  const gallery = rest.slice(0, 6)
  const masonry = rest.slice(6)
  const blocks: { type: ProjectBlockTypeDb; data: Record<string, unknown> }[] = []

  blocks.push({ type: 'HERO', data: { mediaId: first ?? null, eyebrow: seed.subtitle, title: seed.title, fullBleed: true } })
  blocks.push({
    type: 'TEXT',
    data: { heading: seed.subtitle, body: seed.description[0] ?? seed.summary, width: 'narrow', align: 'left' },
  })
  if (second) blocks.push({ type: 'IMAGE', data: { mediaId: second, width: 'wide', reveal: 'revealClip' } })
  if (sceneId) blocks.push({ type: 'SCENE_3D', data: { sceneId, height: 'screen', label: 'Khám phá không gian' } })
  if (seed.description[1]) {
    blocks.push({ type: 'TEXT', data: { body: seed.description[1], width: 'narrow', align: 'left' } })
  }
  if (gallery.length) blocks.push({ type: 'GALLERY', data: { mediaIds: gallery, columns: 2 } })
  if (seed.description[2]) {
    blocks.push({ type: 'QUOTE', data: { quote: seed.description[2].split('. ')[0] + '.', attribution: 'AN ATELIER' } })
  }
  if (third) blocks.push({ type: 'IMAGE', data: { mediaId: third, width: 'full', reveal: 'revealParallax' } })
  if (seed.description[3]) {
    blocks.push({ type: 'TEXT', data: { body: seed.description[3], width: 'narrow', align: 'left' } })
  }
  if (masonry.length) blocks.push({ type: 'MASONRY', data: { mediaIds: masonry, columns: 3 } })
  if (detail && (detail.palette || detail.lighting)) {
    blocks.push({
      type: 'TEXT',
      data: {
        heading: 'Bảng vật liệu & ánh sáng',
        body: [detail.palette, detail.lighting].filter(Boolean).join(' '),
        width: 'narrow',
        align: 'left',
      },
    })
  }
  if (materialIds.length) blocks.push({ type: 'MATERIALS', data: { materialIds, heading: 'Vật liệu' } })
  blocks.push({ type: 'PROJECT_INFO', data: { showServices: true } })
  blocks.push({ type: 'RELATED', data: { projectIds: [], heading: 'Dự án liên quan' } })
  blocks.push({ type: 'CTA', data: { heading: 'Bắt đầu một không gian', buttonLabel: 'Liên hệ studio', href: '/contact' } })
  return blocks
}

function waypointsFor(mode: SceneMode, detail: FolderDetail | undefined): CameraWaypoint[] {
  if (mode === 'NONE' || mode === 'IMAGE') return []
  // Waypoints authored against the real cover photo beat the generic dolly.
  const authored = detail?.waypoints
  if (Array.isArray(authored) && authored.length >= 2) {
    return authored.map((w, i) => ({
      position: w.position,
      target: w.target,
      at: typeof w.at === 'number' ? w.at : i / Math.max(1, authored.length - 1),
      ease: w.ease ?? 'power2.inOut',
      label: w.label,
      fov: w.fov,
    }))
  }
  return [
    { position: [0, 1.9, 7.4] as const, target: [0, 1.4, 0] as const, at: 0, ease: 'power2.out', label: 'Ngưỡng cửa' },
    { position: [0.9, 2.05, 4.6] as const, target: [0, 1.35, -0.4] as const, at: 0.33, ease: 'power2.inOut', label: 'Tiền sảnh' },
    { position: [-0.8, 1.85, 2.6] as const, target: [0.9, 1.2, -1.3] as const, at: 0.66, ease: 'power3.inOut', label: 'Phòng khách' },
    { position: [0.1, 1.65, 0.9] as const, target: [0, 1.15, -2.1] as const, at: 1, ease: 'expo.out', label: 'Chi tiết vật liệu' },
  ]
}

async function seedProjects(
  seeds: ProjectSeed[],
  manifest: Map<string, ManifestEntry[]>,
  categoryIds: Map<string, string>,
  details: Map<string, FolderDetail>,
  materialIdBySlug: Map<string, string>,
) {
  let projectCount = 0
  let mediaCount = 0
  let describedCount = 0

  for (const seed of seeds) {
    const entries = manifest.get(seed.sourceDir) ?? []
    const detail = details.get(seed.sourceDir)
    const imageByIndex = new Map<number, ImageDetail>()
    for (const img of detail?.images ?? []) imageByIndex.set(img.index, img)

    /** media row id per source index, so cover/gallery ordering stay independent */
    const idByIndex = new Map<number, string>()

    if (!contentOnly) {
      for (const entry of entries) {
        const described = imageByIndex.get(entry.index)
        const alt = described?.alt?.trim() || `${seed.title} — ${seed.subtitle}`
        const caption = described?.caption?.trim() ? described.caption.trim() : null
        if (described?.alt?.trim()) describedCount++
        idByIndex.set(entry.index, await upsertMedia(entry, alt, caption))
        mediaCount++
      }
    }

    // Galleries lead with the strongest frames; ties keep the photographer's order.
    const ordered = [...idByIndex.keys()].sort((a, b) => {
      const qa = imageByIndex.get(a)?.quality ?? 3
      const qb = imageByIndex.get(b)?.quality ?? 3
      return qb - qa || a - b
    })
    const coverIndex = detail?.coverIndex ?? seed.coverIndex
    const mediaIds: string[] = []
    const coverIdDirect = idByIndex.get(coverIndex) ?? null
    if (coverIdDirect) mediaIds.push(coverIdDirect)
    for (const idx of ordered) {
      const id = idByIndex.get(idx)
      if (id && id !== coverIdDirect) mediaIds.push(id)
    }

    const coverId = coverIdDirect ?? mediaIds[0] ?? null
    const categoryId = categoryIds.get(seed.categorySlug) ?? null

    const projectRows = await db
      .insert(schema.projects)
      .values({
        slug: seed.slug,
        title: seed.title,
        subtitle: seed.subtitle,
        summary: seed.summary,
        description: seed.description.join('\n\n'),
        categoryId,
        coverMediaId: coverId,
        status: 'published',
        featured: seed.featured,
        order: seed.order,
        location: seed.location,
        area: seed.area,
        year: seed.year,
        client: seed.client,
        duration: seed.duration,
        style: seed.style,
        services: seed.services,
        seo: { title: `${seed.title} — AN ATELIER`, description: seed.seoDescription },
        publishedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: schema.projects.slug,
        set: {
          title: seed.title,
          subtitle: seed.subtitle,
          summary: seed.summary,
          description: seed.description.join('\n\n'),
          categoryId,
          coverMediaId: coverId,
          featured: seed.featured,
          order: seed.order,
          location: seed.location,
          area: seed.area,
          year: seed.year,
          client: seed.client,
          duration: seed.duration,
          style: seed.style,
          services: seed.services,
          status: 'published',
          updatedAt: new Date(),
        },
      })
      .returning({ id: schema.projects.id })

    const project = projectRows[0]
    if (!project) continue
    projectCount++

    if (mediaIds.length) {
      await db.delete(schema.projectMedia).where(eq(schema.projectMedia.projectId, project.id))
      await db.insert(schema.projectMedia).values(
        mediaIds.map((mediaId, i) => ({
          projectId: project.id,
          mediaId,
          role: (i === 0 ? 'cover' : 'gallery') as 'cover' | 'gallery',
          order: i,
        })),
      )
    }

    let sceneId: string | null = null
    if (seed.sceneMode !== 'NONE') {
      await db.delete(schema.scenes).where(eq(schema.scenes.projectId, project.id))
      const sceneRows = await db
        .insert(schema.scenes)
        .values({
          projectId: project.id,
          name: seed.title,
          mode: seed.sceneMode,
          sourceMediaId: coverId,
          waypoints: waypointsFor(seed.sceneMode, detail),
          settings: {
            displacementScale: 1.15,
            planeSegments: 256,
            parallaxStrength: 0.35,
            roomWidth: 6,
            roomHeight: 3.2,
            roomDepth: 8,
            bloom: 0.12,
            vignette: 0.35,
            toneMapping: 'ACESFilmic',
          },
          envPreset: 'apartment',
          fov: 42,
        })
        .returning({ id: schema.scenes.id })
      sceneId = sceneRows[0]?.id ?? null
    }

    await db.delete(schema.projectBlocks).where(eq(schema.projectBlocks.projectId, project.id))
    const projectMaterialIds = (detail?.materials ?? [])
          .map((slug) => materialIdBySlug.get(slug))
          .filter((id): id is string => typeof id === 'string')
        const blocks = blocksFor(seed, mediaIds, sceneId, projectMaterialIds, detail)
    if (blocks.length) {
      await db.insert(schema.projectBlocks).values(
        blocks.map((b, i) => ({ projectId: project.id, type: b.type, order: i, enabled: true, data: b.data })),
      )
    }

    if (projectCount % 10 === 0) log('projects', `${projectCount}/${seeds.length}`)
  }

  log('projects', `${projectCount} upserted`)
  log('media', `${mediaCount} rows linked · ${describedCount} with authored alt text`)
}

/**
 * Materials come first: project MATERIALS blocks reference them by id, and the
 * image-intelligence fleet tags every folder with the material slugs it can see.
 */
async function seedMaterials(): Promise<Map<string, string>> {
  const site = readJson<{ materials?: { slug: string; name: string; description: string }[] }>(
    join(root, 'src/data/content/site.json'),
  )
  const materials = site?.materials ?? [
    { slug: 'go', name: 'Gỗ', description: 'Óc chó, sồi tự nhiên — vân dọc, dầu lau mờ.' },
    { slug: 'da', name: 'Đá', description: 'Travertine và đá vôi, bề mặt honed.' },
    { slug: 'da-hoa-cuong', name: 'Marble', description: 'Calacatta, Panda White cho mặt bếp và bàn.' },
    { slug: 'kim-loai', name: 'Kim loại', description: 'Đồng thau xước, thép sơn tĩnh điện đen mờ.' },
    { slug: 'vai', name: 'Vải', description: 'Linen, bouclé, tông cát và khói.' },
    { slug: 'kinh', name: 'Kính', description: 'Kính siêu trong, kính reeded lấy sáng gián tiếp.' },
  ]
  const bySlug = new Map<string, string>()
  for (const [i, m] of materials.entries()) {
    const rows = await db
      .insert(schema.materials)
      .values({ ...m, order: i, enabled: true })
      .onConflictDoUpdate({
        target: schema.materials.slug,
        set: { name: m.name, description: m.description, order: i },
      })
      .returning({ id: schema.materials.id })
    const row = rows[0]
    if (row) bySlug.set(m.slug, row.id)
  }
  log('materials', `${bySlug.size} rows`)
  return bySlug
}

async function seedSiteConfig(adminId: string, categoryIds: Map<string, string>) {
  const site = readJson<{
    services?: { slug: string; indexLabel: string; title: string; summary: string; description: string }[]
    materials?: { slug: string; name: string; description: string }[]
    articles?: {
      slug: string
      title: string
      excerpt: string
      tags: string[]
      content: { nodes: { type: string; [k: string]: unknown }[] }
    }[]
  }>(join(root, 'src/data/content/site.json'))

  const services = site?.services ?? [
    { slug: 'thiet-ke-noi-that', indexLabel: '01', title: 'Thiết kế nội thất', summary: 'Từ bố cục đến từng chi tiết mộc.', description: '' },
    { slug: 'thiet-ke-kien-truc', indexLabel: '02', title: 'Thiết kế kiến trúc', summary: 'Hình khối, ánh sáng và tỷ lệ.', description: '' },
    { slug: 'thiet-ke-thi-cong', indexLabel: '03', title: 'Thiết kế & thi công', summary: 'Một đầu mối, một tiêu chuẩn.', description: '' },
    { slug: 'cai-tao', indexLabel: '04', title: 'Cải tạo', summary: 'Giữ ký ức, đổi cách sống.', description: '' },
    { slug: 'do-noi-that', indexLabel: '05', title: 'Đồ nội thất đặt riêng', summary: 'Chế tác theo từng không gian.', description: '' },
  ]

  for (const [i, s] of services.entries()) {
    await db
      .insert(schema.services)
      .values({ ...s, order: i, enabled: true })
      .onConflictDoUpdate({
        target: schema.services.slug,
        set: { title: s.title, summary: s.summary, description: s.description, indexLabel: s.indexLabel, order: i },
      })
  }
  log('services', `${services.length} rows`)

  // materials are seeded before projects (seedMaterials) so blocks can reference them

  const sections: { key: HomepageSectionRow['key']; content: Record<string, unknown> }[] = [
    { key: 'HERO', content: { eyebrow: 'AN ATELIER', title: 'Không gian\nmang tính cách.', body: 'Studio nội thất và kiến trúc tại TP. Hồ Chí Minh.', cta: { label: 'Xem dự án', href: '/projects' } } },
    { key: 'FEATURED_PROJECTS', content: { label: 'Selected Works', heading: 'Những công trình\nchúng tôi chăm chút.' } },
    { key: 'STUDIO', content: { label: 'Studio', heading: 'Chúng tôi thiết kế cho\nnhịp sống thật.', body: '' } },
    { key: 'SERVICES', content: { label: 'Services', heading: 'Dịch vụ' } },
    { key: 'IMMERSIVE_PROJECT', content: { label: 'Immersive', heading: 'Bước vào không gian' } },
    { key: 'PHILOSOPHY', content: { label: 'Philosophy', heading: 'Ít vật liệu hơn,\nnhiều ánh sáng hơn.' } },
    { key: 'JOURNAL', content: { label: 'Journal', heading: 'Ghi chép' } },
    { key: 'CTA', content: { heading: 'Kể cho chúng tôi\nvề ngôi nhà của bạn.', buttonLabel: 'Liên hệ', href: '/contact' } },
  ]
  for (const [i, s] of sections.entries()) {
    await db
      .insert(schema.homepageSections)
      .values({ key: s.key, order: i, enabled: true, content: s.content, settings: {} })
      .onConflictDoUpdate({ target: schema.homepageSections.key, set: { order: i, content: s.content } })
  }
  log('homepage sections', `${sections.length} rows`)

  const navCount = await db.select({ n: sql<number>`count(*)::int` }).from(schema.navigation)
  if ((navCount[0]?.n ?? 0) === 0) {
    await db.insert(schema.navigation).values([
      { location: 'header', label: 'Dự án', href: '/projects', order: 0 },
      { location: 'header', label: 'Studio', href: '/studio', order: 1 },
      { location: 'header', label: 'Dịch vụ', href: '/services', order: 2 },
      { location: 'header', label: 'Ghi chép', href: '/journal', order: 3 },
      { location: 'header', label: 'Liên hệ', href: '/contact', order: 4 },
      { location: 'footer', label: 'Dự án', href: '/projects', order: 0 },
      { location: 'footer', label: 'Studio', href: '/studio', order: 1 },
      { location: 'footer', label: 'Dịch vụ', href: '/services', order: 2 },
      { location: 'footer', label: 'Ghi chép', href: '/journal', order: 3 },
      { location: 'footer', label: 'Liên hệ', href: '/contact', order: 4 },
    ])
    log('navigation', '10 rows')
  } else {
    log('navigation', 'already configured')
  }

  const themeCount = await db.select({ n: sql<number>`count(*)::int` }).from(schema.themeSettings)
  if ((themeCount[0]?.n ?? 0) === 0 && themeModule) {
    const theme = (themeModule as { DEFAULT_THEME: ThemeSettings }).DEFAULT_THEME
    await db.insert(schema.themeSettings).values({
      colors: theme.colors,
      typography: theme.typography,
      motion: theme.motion,
      brand: theme.brand,
      updatedBy: adminId,
    })
    log('theme', 'default palette stored')
  } else {
    log('theme', themeModule ? 'already configured' : 'theme module missing — skipped')
  }

  const articles = site?.articles ?? []
  const journalCategory = categoryIds.get('ghi-chep') ?? null
  for (const [i, a] of articles.entries()) {
    await db
      .insert(schema.articles)
      .values({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        tags: a.tags,
        categoryId: journalCategory,
        content: a.content as never,
        status: 'published',
        authorId: adminId,
        readingMinutes: 4,
        publishedAt: new Date(Date.now() - i * 86_400_000 * 9),
        seo: { title: `${a.title} — AN ATELIER`, description: a.excerpt.slice(0, 155) },
      })
      .onConflictDoUpdate({
        target: schema.articles.slug,
        set: { title: a.title, excerpt: a.excerpt, content: a.content as never, tags: a.tags, status: 'published' },
      })
  }
  log('articles', `${articles.length} rows`)
}

/* ---------------------------------- main ---------------------------------- */

console.log('\nAN ATELIER — seeding Neon\n')
const adminId = await seedAdmin()
const categoryIds = await seedCategories()
const materialIdBySlug = await seedMaterials()
const seeds = loadBatches()
const details = loadDetails()
const manifest = loadManifest()

if (seeds.length === 0) {
  log('projects', 'no content batches found in src/data/content — skipped')
} else {
  await seedProjects(seeds, manifest, categoryIds, details, materialIdBySlug)
}

await seedSiteConfig(adminId, categoryIds)
console.log('\nDone.\n')
