/**
 * SEO helpers — metadata builder + JSON-LD graph fragments.
 * ARCHITECTURE §5 (SEO/analytics area), §7 (routes).
 *
 * Every public route builds its `metadata` through `buildMetadata()` so the
 * canonical URL, the OpenGraph card and the Twitter card can never drift apart.
 * The JSON-LD builders return plain, serialisable objects; the consumer renders
 * them itself, e.g.
 *
 *   const ld = buildProjectJsonLd(project)
 *   <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(ld) }} />
 *
 * No `schema-dts` dependency: the shapes below are hand-typed and structural.
 */

import type { Metadata } from 'next'

import { siteUrl } from '@/lib/env'
import { mediaUrl } from '@/lib/media'
import type {
  ArticleDetail,
  ArticleSummary,
  MediaRef,
  ProjectDetail,
  ProjectSummary,
  ThemeSettings,
} from '@/types/content'

/* ---------------------------------- brand ---------------------------------- */

export const SITE_NAME = 'GuHomes'
export const SITE_TAGLINE = 'Nội thất và kiến trúc cho khí hậu Sài Gòn'
export const SITE_LOCALE = 'vi_VN'

/**
 * This string is the Organization slogan in the JSON-LD on every page, so every
 * number in it has to be true of the seeded data.
 *
 * It used to end 'từ gian bếp 12 m² đến biệt thự 640 m²'. Both ends were false:
 * the 12 m² rows are an entrance hall and a boy's bedroom, and the 640 m² row is
 * a resort arrival lobby in Đà Nẵng, not a villa. 'Công trình' was also wrong for
 * the count, which includes an unbuilt competition scheme and two competing
 * schemes for one apartment. 'Dự án' is true and costs nothing.
 */
export const SITE_DESCRIPTION =
  'GuHomes thiết kế và thi công nội thất, kiến trúc tại TP. Hồ Chí Minh. Hơn một trăm dự án từ 2021 đến nay: căn hộ, nhà phố, và những không gian thương mại phải mở cửa đón khách vào một ngày đã hẹn trước.'

/** Default OpenGraph card, rendered by `src/app/opengraph-image.tsx`. */
const OG_IMAGE_PATH = '/opengraph-image'
export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

/* -------------------------------- json-ld ---------------------------------- */

export type JsonLdValue = string | number | boolean | null | readonly JsonLdValue[] | JsonLdObject

export interface JsonLdObject {
  readonly '@context'?: string
  readonly '@type': string | readonly string[]
  readonly [key: string]: JsonLdValue | readonly string[] | undefined
}

const SCHEMA_CONTEXT = 'https://schema.org'

/**
 * Serialised JSON-LD safe to place inside a `<script>` element: `<` is escaped so
 * a stray `</script>` inside a title or excerpt cannot close the tag early.
 */
export function jsonLdScript(data: JsonLdObject | readonly JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

/** Drops empty strings, nulls and empty arrays so the emitted graph stays clean. */
function compact(entries: Record<string, JsonLdValue | readonly string[] | undefined>): JsonLdObject {
  const out: Record<string, JsonLdValue | readonly string[] | undefined> = {}
  for (const [key, value] of Object.entries(entries)) {
    if (value === undefined || value === null) continue
    if (typeof value === 'string' && value.trim().length === 0) continue
    if (Array.isArray(value) && value.length === 0) continue
    out[key] = value
  }
  return out as JsonLdObject
}

/* ---------------------------------- urls ----------------------------------- */

const BASE = siteUrl.replace(/\/+$/, '')

/** Absolute URL for an internal path. Absolute inputs are returned untouched. */
export function absoluteUrl(path = '/'): string {
  const raw = path.trim()
  if (raw.length === 0) return BASE || '/'
  if (/^https?:\/\//i.test(raw)) return raw
  const clean = raw.startsWith('/') ? raw : `/${raw}`
  const normalised = clean.length > 1 ? clean.replace(/\/+$/, '') : clean
  return `${BASE}${normalised}`
}

type ImageInput = MediaRef | string | null | undefined

function resolveImage(image: ImageInput): { url: string; alt: string } {
  if (typeof image === 'string' && image.trim().length > 0) {
    return { url: absoluteUrl(image), alt: SITE_NAME }
  }
  if (image && typeof image === 'object') {
    return { url: absoluteUrl(mediaUrl(image, 1600)), alt: image.alt ?? SITE_NAME }
  }
  return { url: absoluteUrl(OG_IMAGE_PATH), alt: `${SITE_NAME} — ${SITE_TAGLINE}` }
}

function toIso(value: Date | string | null | undefined): string | undefined {
  if (!value) return undefined
  const date = typeof value === 'string' ? new Date(value) : value
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

/** `Tiêu đề — GuHomes`, without doubling the brand when it is already there. */
function composeTitle(title: string | undefined): string {
  const raw = title?.trim() ?? ''
  if (raw.length === 0) return `${SITE_NAME} — ${SITE_TAGLINE}`
  if (raw.toUpperCase().includes(SITE_NAME)) return raw
  return `${raw} — ${SITE_NAME}`
}

/* ------------------------------- buildMetadata ------------------------------ */

export interface BuildMetadataInput {
  title?: string
  description?: string
  /** Route path, e.g. `/projects/tinh-vien`. Defaults to the home page. */
  path?: string
  /** A media ref, an internal path or an absolute URL. Falls back to the default OG card. */
  image?: ImageInput
  type?: 'website' | 'article' | 'profile'
  noIndex?: boolean
  /** Articles only — surfaces as `article:published_time`. */
  publishedTime?: Date | string | null
  modifiedTime?: Date | string | null
  authors?: string[]
  tags?: string[]
}

export function buildMetadata(input: BuildMetadataInput = {}): Metadata {
  const { title, description, path = '/', image, type = 'website', noIndex = false } = input

  const url = absoluteUrl(path)
  const resolvedTitle = composeTitle(title)
  const resolvedDescription = description?.trim() || SITE_DESCRIPTION
  const card = resolveImage(image)
  const published = toIso(input.publishedTime)
  const modified = toIso(input.modifiedTime) ?? published

  const ogBase = {
    siteName: SITE_NAME,
    locale: SITE_LOCALE,
    title: resolvedTitle,
    description: resolvedDescription,
    url,
    images: [{ url: card.url, width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, alt: card.alt }],
  }

  // Next's OpenGraph type is a union discriminated by `type`, so each variant is
  // built with a literal rather than a computed value.
  const openGraph: NonNullable<Metadata['openGraph']> =
    type === 'article'
      ? {
          ...ogBase,
          type: 'article',
          publishedTime: published,
          modifiedTime: modified,
          authors: input.authors ?? [SITE_NAME],
          tags: input.tags,
        }
      : type === 'profile'
        ? { ...ogBase, type: 'profile' }
        : { ...ogBase, type: 'website' }

  const metadata: Metadata = {
    metadataBase: new URL(BASE || 'http://localhost:3000'),
    title: resolvedTitle,
    description: resolvedDescription,
    applicationName: SITE_NAME,
    authors:
      input.authors && input.authors.length > 0
        ? input.authors.map((name) => ({ name }))
        : [{ name: SITE_NAME, url: absoluteUrl('/studio') }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    formatDetection: { telephone: false, address: false, email: false },
    alternates: { canonical: url },
    keywords: input.tags && input.tags.length > 0 ? input.tags : undefined,
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [card.url],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
  }

  return metadata
}

/* --------------------------------- graphs ---------------------------------- */

function isProjectDetail(project: ProjectSummary | ProjectDetail): project is ProjectDetail {
  return 'gallery' in project
}

function isArticleDetail(article: ArticleSummary | ArticleDetail): article is ArticleDetail {
  return 'content' in article
}

/** Minimal publisher node reused by the article and project graphs. */
function publisherNode(): JsonLdObject {
  return compact({
    '@type': 'Organization',
    '@id': `${absoluteUrl('/')}#organization`,
    name: SITE_NAME,
    url: absoluteUrl('/'),
  })
}

/**
 * A finished interior-architecture project — `CreativeWork` with the studio as
 * creator, plus location, floor area and completion year when they are known.
 */
export function buildProjectJsonLd(project: ProjectSummary | ProjectDetail): JsonLdObject {
  const url = absoluteUrl(`/projects/${project.slug}`)
  const detail = isProjectDetail(project) ? project : null
  const images = [project.cover, ...(detail?.gallery ?? [])]
    .filter((m): m is MediaRef => Boolean(m))
    .slice(0, 6)
    .map((m) => absoluteUrl(mediaUrl(m, 1600)))

  return compact({
    '@context': SCHEMA_CONTEXT,
    '@type': 'CreativeWork',
    '@id': `${url}#project`,
    url,
    name: project.title,
    alternateName: project.subtitle,
    headline: project.subtitle ?? project.title,
    description: detail?.description ?? project.summary,
    abstract: project.summary,
    image: images,
    genre: project.style,
    inLanguage: 'vi-VN',
    dateCreated: project.year ? String(project.year) : undefined,
    datePublished: toIso(detail?.publishedAt ?? null),
    creator: publisherNode(),
    provider: publisherNode(),
    keywords: [project.categoryName, project.style, ...(detail?.services ?? [])].filter(
      (value): value is string => typeof value === 'string' && value.length > 0,
    ),
    locationCreated: project.location
      ? compact({ '@type': 'Place', name: project.location })
      : undefined,
    about: project.categoryName
      ? compact({ '@type': 'Thing', name: project.categoryName })
      : undefined,
    size: project.area,
    isPartOf: compact({
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/projects')}#collection`,
      name: 'Dự án',
      url: absoluteUrl('/projects'),
    }),
  })
}

/** A journal entry — `Article`, with reading time as an ISO 8601 duration. */
export function buildArticleJsonLd(article: ArticleSummary | ArticleDetail): JsonLdObject {
  const url = absoluteUrl(`/journal/${article.slug}`)
  const detail = isArticleDetail(article) ? article : null
  const authorName = detail?.authorName ?? SITE_NAME
  const published = toIso(article.publishedAt)

  return compact({
    '@context': SCHEMA_CONTEXT,
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    mainEntityOfPage: compact({ '@type': 'WebPage', '@id': url }),
    headline: article.title,
    name: article.title,
    description: article.excerpt,
    inLanguage: 'vi-VN',
    image: article.cover ? [absoluteUrl(mediaUrl(article.cover, 1600))] : undefined,
    datePublished: published,
    dateModified: published,
    keywords: article.tags,
    articleSection: 'Ghi chép',
    timeRequired: article.readingMinutes ? `PT${Math.max(1, article.readingMinutes)}M` : undefined,
    author: compact({
      '@type': authorName === SITE_NAME ? 'Organization' : 'Person',
      name: authorName,
      url: absoluteUrl('/studio'),
    }),
    publisher: publisherNode(),
    isPartOf: compact({
      '@type': 'Blog',
      '@id': `${absoluteUrl('/journal')}#blog`,
      name: 'Ghi chép — GuHomes',
      url: absoluteUrl('/journal'),
    }),
  })
}

/** Splits `"Quận 7, TP. Hồ Chí Minh"` into locality / region for `PostalAddress`. */
function postalAddress(address: string): JsonLdObject | undefined {
  const parts = address
    .split(',')
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
  if (parts.length === 0) return undefined
  const locality = parts.length > 1 ? parts[parts.length - 1] : parts[0]
  const street = parts.length > 1 ? parts.slice(0, -1).join(', ') : undefined

  return compact({
    '@type': 'PostalAddress',
    streetAddress: street,
    addressLocality: locality,
    addressCountry: 'VN',
  })
}

/** The studio itself — emitted once, in the root layout. */
export function buildOrganizationJsonLd(theme: ThemeSettings): JsonLdObject {
  const brand = theme.brand
  const home = absoluteUrl('/')
  const socials = brand.social.map((s) => s.href).filter((href) => href.trim().length > 0)

  return compact({
    '@context': SCHEMA_CONTEXT,
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${home}#organization`,
    name: brand.companyName || SITE_NAME,
    alternateName: brand.shortName,
    slogan: brand.tagline || SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    url: home,
    logo: absoluteUrl(OG_IMAGE_PATH),
    image: absoluteUrl(OG_IMAGE_PATH),
    email: brand.email,
    telephone: brand.phone,
    address: postalAddress(brand.address),
    areaServed: compact({ '@type': 'Country', name: 'Việt Nam' }),
    knowsLanguage: ['vi-VN', 'en'],
    sameAs: socials,
    knowsAbout: [
      'Thiết kế nội thất',
      'Thiết kế kiến trúc',
      'Cải tạo không gian sống',
      'Đồ nội thất đặt riêng',
    ],
  })
}

export interface BreadcrumbItem {
  name: string
  /** Route path, e.g. `/projects`. */
  path: string
}

/** `BreadcrumbList`; the home crumb is prepended automatically when missing. */
export function buildBreadcrumbJsonLd(trail: readonly BreadcrumbItem[]): JsonLdObject {
  const first = trail[0]
  const items: BreadcrumbItem[] =
    first && first.path === '/' ? [...trail] : [{ name: 'Trang chủ', path: '/' }, ...trail]

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) =>
      compact({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      }),
    ),
  }
}

/** `WebSite` node with the site-wide search action — pairs with the org node. */
export function buildWebsiteJsonLd(): JsonLdObject {
  const home = absoluteUrl('/')
  return compact({
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    '@id': `${home}#website`,
    name: SITE_NAME,
    alternateName: 'Guhomes Studio',
    description: SITE_DESCRIPTION,
    url: home,
    inLanguage: 'vi-VN',
    publisher: publisherNode(),
  })
}
