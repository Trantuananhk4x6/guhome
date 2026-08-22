/**
 * /projects — the editorial index.
 *
 * Server component, no three.js on this route (ARCHITECTURE §8): the index is
 * the fastest page on the site and stays that way. Both filters are plain
 * queries — `?category=` and `?style=` — so every filtered view is shareable and
 * crawlable, and the two COMPOSE: `?category=can-ho&style=toi-gian` is one
 * address, reachable by two clicks, and either chip drops only its own
 * parameter. `projectsHref()` in `StyleFilter` is the one place that shape is
 * written, so the filters and the pager cannot disagree about it.
 *
 * THE TWO TAXONOMIES DO NOT COME FROM THE SAME PLACE, AND THAT IS DELIBERATE.
 * Categories are the fixed five of `CATEGORY_SEEDS` — a shape of building, which
 * the studio does not add to. Styles are read from the database on every
 * arrival, because the studio configures them in /admin and a style that exists
 * in the admin screen but not on this filter is exactly the failure this page
 * exists to avoid. A database with no styles in it renders no style band at all.
 *
 * COMPOSITION. The masthead is a band, not a stack. The heading, its lead
 * paragraph and the two filters occupy a four-column rail; the first project
 * fills the seven columns beside it and runs off the right edge of the screen.
 * That is what puts work inside the arrival screen — the previous stack pushed
 * the first photograph to y=813 on a 1000px viewport and left a 176px empty
 * band under the filter bar, which was the defect the audit reported.
 *
 * One query serves the whole page: the full published run is fetched once, the
 * per-category figures are counted from it, and the active filters are applied
 * in memory. `getPublishedIndex` is already ordered, so the filtered view keeps
 * the editor's ordering without a second round trip. The style membership map is
 * a single grouped read, and only when a filter is actually engaged — an
 * unfiltered arrival, which is most of them, still pays exactly what it did
 * before styles existed.
 *
 * THE FIGURES ARE WHAT A CLICK WOULD GIVE YOU. Each category figure counts the
 * run with the ACTIVE STYLE still applied, and each style figure counts it with
 * the active category still applied, because the two filters compose — a chip
 * printing a number you cannot reach is worse than a chip printing none.
 *
 * AND IT IS THE ONE PUBLIC ROUTE THAT CANNOT BE PRERENDERED. The filters and
 * `?page=` are read from `searchParams`, which is a dynamic API, so unlike `/`,
 * `/studio`, `/journal`, `/contact` and every project page — all of which are
 * built once and served from disk — this HTML is composed on every arrival. It
 * was measured at 1730 ms to DOMContentLoaded against 57 ms for `/studio`, and
 * all of the difference was the server: the browser had nothing to do but wait
 * for the document. `getPublishedIndex` is the answer to that — the same run,
 * cached across requests rather than merely across one — and the reason this
 * page calls it instead of `getPublishedProjects`, which the prerendered routes
 * use and which has no business carrying a cross-request cache for them.
 *
 * IT IS PAGED, AND THAT IS THE POINT. The index used to render all 105 projects
 * into one document: 34,244px on a 1600×1000 desktop, 35,604px at 390 wide —
 * about 34 and 42 screens (docs/ui-after/measurements.json). It is also the
 * destination of the site's primary call to action, so the one page the studio
 * most needs a visitor to read was the one page a visitor could not get through.
 *
 * Twenty-four to a page, as `?page=N` — the same plain-link contract as the
 * filters, so every page of the catalogue is linkable and crawlable and the back
 * button works. The masthead is unchanged on every page: the rail, then that
 * page's first project on the seven columns beside it, then the rest of the page
 * phrased by `ProjectIndex`. Nothing about it knows which page it is on, which
 * is why page four composes as carefully as page one.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { CategoryFilter } from '@/components/projects/CategoryFilter'
import type { CategoryOption } from '@/components/projects/CategoryFilter'
import { DISPLAY } from '@/components/projects/composition'
import { IndexPager, pageWindow } from '@/components/projects/IndexPager'
import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { ProjectLead } from '@/components/projects/ProjectLead'
import { StyleFilter, projectsHref } from '@/components/projects/StyleFilter'
import type { StyleOption } from '@/components/projects/StyleFilter'
import { Label } from '@/components/ui/Label'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons'
import { CATEGORY_SEEDS } from '@/data/seed-types'
import { buildMetadata } from '@/lib/seo'
import { cn, pad2 } from '@/lib/utils'
import { getPublishedIndex, getStylesForProjectList } from '@/server/queries/projects'
import { getPublishedStyles } from '@/server/queries/styles'
import type { ProjectSummary, StyleItem } from '@/types/content'

type SearchParams = Record<string, string | string[] | undefined>

interface PageProps {
  searchParams: Promise<SearchParams>
}

const CATEGORIES = CATEGORY_SEEDS.map((category) => ({ slug: category.slug, name: category.name }))

/**
 * Projects per page.
 *
 * Measured rather than picked: the whole run costs ~329px per project on the
 * 1600 desktop and ~342px on a 390 phone, so twenty-four is a page of roughly
 * nine desktop screens and eleven phone screens — a long editorial index, which
 * is what this is, rather than a document you scroll for two minutes. It also
 * divides the catalogue into five pages today and keeps the largest single
 * category (CĂN HỘ, 41) to two.
 */
const PER_PAGE = 24

function firstParam(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && value.length > 0 ? value : null
}

/** Only the fixed taxonomy is honoured — an unknown slug falls back to "all". */
function resolveCategory(params: SearchParams): string | null {
  const value = firstParam(params.category)
  if (value === null) return null
  return CATEGORIES.some((category) => category.slug === value) ? value : null
}

/** Same contract as the category, but against the styles the studio configured. */
function resolveStyle(params: SearchParams, styles: readonly StyleItem[]): string | null {
  const value = firstParam(params.style)
  if (value === null) return null
  return styles.some((style) => style.slug === value) ? value : null
}

/**
 * `?page=` as an integer ≥ 1. Anything else — a word, a negative, a decimal —
 * is page one rather than a 404: a mistyped parameter should still show the
 * index, and the page is clamped to the run's real length afterwards.
 */
function resolvePage(params: SearchParams): number {
  const raw = params.page
  const value = Array.isArray(raw) ? raw[0] : raw
  const parsed = Number.parseInt(typeof value === 'string' ? value : '', 10)
  return Number.isFinite(parsed) && parsed > 1 ? parsed : 1
}

function categoryName(slug: string | null): string | null {
  if (!slug) return null
  return CATEGORIES.find((category) => category.slug === slug)?.name ?? null
}

/** Figures for the category index, counted off a list we already hold. */
function withCategoryCounts(projects: readonly ProjectSummary[]): CategoryOption[] {
  const tally = new Map<string, number>()
  for (const project of projects) {
    if (!project.categorySlug) continue
    tally.set(project.categorySlug, (tally.get(project.categorySlug) ?? 0) + 1)
  }
  return CATEGORIES.map((category) => ({ ...category, count: tally.get(category.slug) ?? 0 }))
}

/** `?category=x&style=y&page=2`, with page one left off so the index keeps one URL. */
function canonicalPath(category: string | null, style: string | null, page: number): string {
  const query = [
    category ? `category=${category}` : null,
    style ? `style=${style}` : null,
    page > 1 ? `page=${page}` : null,
  ].filter((part): part is string => part !== null)
  return query.length > 0 ? `/projects?${query.join('&')}` : '/projects'
}

/* ----------------------------------- view ---------------------------------- */

interface IndexView {
  category: string | null
  style: string | null
  categoryName: string | null
  styleName: string | null
  /** The run after both filters. */
  projects: ProjectSummary[]
  /** Options for the two filter controls, already carrying composed figures. */
  categoryOptions: CategoryOption[]
  styleOptions: StyleOption[]
  /** Totals printed against each "Tất cả" row. */
  categoryTotal: number
  styleTotal: number
}

/**
 * The whole reading of one request, resolved once.
 *
 * `generateMetadata` and the render both need the same filtered run — the
 * canonical must never point at a page that does not exist — and every query
 * underneath is `cache()`d for the request, so asking twice costs one round trip.
 */
async function readView(params: SearchParams): Promise<IndexView> {
  const [all, styles] = await Promise.all([getPublishedIndex(), getPublishedStyles()])

  const category = resolveCategory(params)
  const style = resolveStyle(params, styles)

  // The membership map is only worth a read when a filter is engaged: with
  // neither, the counts `getPublishedStyles()` already computed in SQL are the
  // right figures and nothing needs filtering.
  const needsMembership = styles.length > 0 && (style !== null || category !== null)
  const membership: ReadonlyMap<string, StyleItem[]> = needsMembership
    ? await getStylesForProjectList(all)
    : new Map<string, StyleItem[]>()

  const wearsStyle = (project: ProjectSummary, slug: string): boolean =>
    (membership.get(project.id) ?? []).some((item) => item.slug === slug)

  // Each list is the run with the OTHER filter applied — that is what makes the
  // figures on each control the figures a click would actually produce.
  const byStyle = style ? all.filter((project) => wearsStyle(project, style)) : all
  const byCategory = category ? all.filter((project) => project.categorySlug === category) : all
  const projects = category
    ? byStyle.filter((project) => project.categorySlug === category)
    : byStyle

  const styleTally = new Map<string, number>()
  if (needsMembership) {
    for (const project of byCategory) {
      for (const item of membership.get(project.id) ?? []) {
        styleTally.set(item.slug, (styleTally.get(item.slug) ?? 0) + 1)
      }
    }
  }

  return {
    category,
    style,
    categoryName: categoryName(category),
    styleName: styles.find((item) => item.slug === style)?.name ?? null,
    projects,
    categoryOptions: withCategoryCounts(byStyle),
    styleOptions: styles.map((item) => ({
      slug: item.slug,
      name: item.name,
      count: needsMembership ? (styleTally.get(item.slug) ?? 0) : item.count,
    })),
    categoryTotal: byStyle.length,
    styleTotal: byCategory.length,
  }
}

/* ----------------------------------- pager --------------------------------- */

/**
 * The pager for a style-filtered view.
 *
 * `IndexPager` belongs to another area and its hrefs carry `?category=` only, so
 * paging a `?style=` view through it would silently drop the style on page two.
 * Rather than reach into a file this page does not own, the filtered view gets a
 * compact pager built from the same `pageWindow()` and the same URL contract as
 * the filters. Unfiltered and category-only views still render the full
 * `IndexPager`, unchanged.
 */
function FilteredPager({
  page,
  pages,
  from,
  showing,
  total,
  category,
  style,
  className,
}: {
  page: number
  pages: number
  from: number
  showing: number
  total: number
  category: string | null
  style: string | null
  className?: string
}) {
  if (pages <= 1) return null

  const slots = pageWindow(page, pages)

  return (
    <nav
      aria-label="Phân trang dự án"
      className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}
    >
      <div className="border-line flex flex-col gap-6 border-t pt-7 md:flex-row md:items-baseline md:justify-between md:gap-10">
        <p className="u-label">
          Trang {pad2(page)} / {pad2(pages)}
          <span className="text-muted/60"> · </span>
          {pad2(from)}–{pad2(from + showing - 1)} trong {total} dự án
        </p>

        <div className="flex items-baseline justify-between gap-6 md:justify-end md:gap-10">
          {page > 1 ? (
            <Link
              href={projectsHref({ category, style, page: page - 1 })}
              rel="prev"
              className="u-label text-ink hover:text-accent flex items-center gap-2 transition-colors duration-500"
            >
              <ArrowLeftIcon className="text-base" />
              Trước
            </Link>
          ) : (
            <span aria-hidden="true" className="u-label text-muted/30 flex items-center gap-2">
              <ArrowLeftIcon className="text-base" />
              Trước
            </span>
          )}

          <ol className="xs:flex hidden items-baseline gap-4">
            {slots.map((slot, i) =>
              slot === 'gap' ? (
                <li key={`gap-${i}`} aria-hidden="true" className="u-label text-muted/40">
                  …
                </li>
              ) : (
                <li key={slot}>
                  <Link
                    href={projectsHref({ category, style, page: slot })}
                    aria-current={slot === page ? 'page' : undefined}
                    aria-label={`Trang ${slot}`}
                    className={cn(
                      'u-label relative block tabular-nums transition-colors duration-500',
                      slot === page ? 'text-accent' : 'text-muted hover:text-ink',
                    )}
                  >
                    {pad2(slot)}
                  </Link>
                </li>
              ),
            )}
          </ol>

          {page < pages ? (
            <Link
              href={projectsHref({ category, style, page: page + 1 })}
              rel="next"
              className="u-label text-ink hover:text-accent flex items-center gap-2 transition-colors duration-500"
            >
              Sau
              <ArrowRightIcon className="text-base" />
            </Link>
          ) : (
            <span aria-hidden="true" className="u-label text-muted/30 flex items-center gap-2">
              Sau
              <ArrowRightIcon className="text-base" />
            </span>
          )}
        </div>
      </div>
    </nav>
  )
}

/* ---------------------------------- route ---------------------------------- */

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const view = await readView(params)

  const pages = Math.max(1, Math.ceil(view.projects.length / PER_PAGE))
  const page = Math.min(resolvePage(params), pages)

  const named = [view.categoryName, view.styleName].filter(
    (part): part is string => part !== null,
  )
  const base = named.length > 0 ? `${named.join(' · ')} — Dự án` : 'Dự án'

  const description =
    named.length > 0
      ? `Tuyển tập ${named.join(' · ').toLowerCase()} do GuHomes thiết kế và giám sát thi công — vật liệu thật, ánh sáng thật, tỉ lệ được cân nhắc từng centimet.`
      : 'Tuyển tập các không gian nội thất do GuHomes thiết kế: căn hộ, nhà phố, biệt thự, thương mại và những không gian chuyên biệt.'

  return buildMetadata({
    title: page > 1 ? `${base} — Trang ${page}/${pages}` : base,
    description,
    path: canonicalPath(view.category, view.style, page),
    type: 'website',
  })
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const view = await readView(params)

  // Clamped, not 404'd: `?page=99` is a stale link or a crawler guess, and the
  // useful answer to both is the last page of the run.
  const pages = Math.max(1, Math.ceil(view.projects.length / PER_PAGE))
  const page = Math.min(resolvePage(params), pages)
  const offset = (page - 1) * PER_PAGE
  const pageItems = view.projects.slice(offset, offset + PER_PAGE)

  const lead = pageItems[0]
  const rest = pageItems.slice(1)
  const heading = view.categoryName ?? view.styleName ?? 'Dự án'

  return (
    <div className="bg-canvas pb-[var(--spacing-section)]">
      <div className="u-gutter mx-auto w-full max-w-[110rem] pt-[clamp(6.5rem,16vh,11rem)]">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-14">
          {/* The rail: the whole masthead, in four columns instead of a band. */}
          <div className="col-span-12 flex flex-col lg:col-span-4">
            {/* Every page of the index opens on the same masthead, so the eyebrow
                is the one place that says which one you are on. Without it page
                three is indistinguishable from page one until you reach the
                pager, seven screens down. */}
            <Label as="p" rule>
              {pages > 1 ? `Index · Trang ${pad2(page)}/${pad2(pages)}` : 'Index'}
            </Label>

            <h1 className={cn(DISPLAY, 'text-ink mt-7 max-w-[12ch]')}>{heading}</h1>

            <p className="u-body-lg mt-7 max-w-[42ch]">
              Mỗi công trình bắt đầu từ một câu hỏi về cách sống, rồi mới đến vật liệu và tỉ lệ. Dưới đây là
              những không gian GuHomes đã hoàn thiện — sắp xếp theo thứ tự chúng tôi muốn bạn đọc.
            </p>

            <div className="mt-9 lg:mt-auto lg:pt-14">
              <p className="u-label text-muted/70 hidden items-center justify-between lg:flex">
                <span>Hạng mục</span>
                <span>Công trình</span>
              </p>
              <CategoryFilter
                categories={view.categoryOptions}
                active={view.category}
                total={view.categoryTotal}
                style={view.style}
                className="mt-3 lg:mt-2"
              />

              {view.styleOptions.length > 0 ? (
                <div className="mt-8 lg:mt-10">
                  <p className="u-label text-muted/70 flex items-center justify-between">
                    <span>Phong cách</span>
                    <Link
                      href="/phong-cach"
                      className="hover:text-ink transition-colors duration-500"
                    >
                      Tìm hiểu
                    </Link>
                  </p>
                  <StyleFilter
                    styles={view.styleOptions}
                    active={view.style}
                    category={view.category}
                    total={view.styleTotal}
                    className="mt-3.5"
                  />
                </div>
              ) : null}
            </div>
          </div>

          {/* The lead plate: seven columns, running off the right edge. Page
              four opens on its own first project, numbered where it really
              stands in the run, so no page of the index opens on a smaller
              gesture than page one. */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {lead ? (
              <ProjectLead project={lead} index={offset + 1} />
            ) : (
              <div className="border-line flex h-full flex-col justify-center border-t pt-10">
                <p className="u-body-lg max-w-[46ch]">
                  {view.style !== null
                    ? 'Chưa có công trình nào trong bộ lọc này. Bạn có thể bỏ bớt một bộ lọc, hoặc liên hệ để chúng tôi gửi hồ sơ năng lực đầy đủ.'
                    : 'Hạng mục này đang được cập nhật. Bạn có thể xem toàn bộ dự án hoặc liên hệ để chúng tôi gửi hồ sơ năng lực đầy đủ.'}
                </p>
                <p className="u-label mt-6">
                  <Link href="/projects" className="hover:text-accent transition-colors duration-500">
                    Xem toàn bộ dự án
                  </Link>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {rest.length > 0 ? (
        <div className="mt-[clamp(3.5rem,9vh,7rem)]">
          <ProjectIndex projects={rest} startIndex={offset + 2} />
        </div>
      ) : null}

      {view.style !== null ? (
        <FilteredPager
          page={page}
          pages={pages}
          from={offset + 1}
          showing={pageItems.length}
          total={view.projects.length}
          category={view.category}
          style={view.style}
          className="mt-[clamp(3.5rem,9vh,7rem)]"
        />
      ) : (
        <IndexPager
          page={page}
          pages={pages}
          from={offset + 1}
          showing={pageItems.length}
          total={view.projects.length}
          category={view.category}
          className="mt-[clamp(3.5rem,9vh,7rem)]"
        />
      )}
    </div>
  )
}
