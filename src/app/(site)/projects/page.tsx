/**
 * /projects — the editorial index.
 *
 * Server component, no three.js on this route (ARCHITECTURE §8): the index is
 * the fastest page on the site and stays that way. The category filter is a
 * plain `?category=` query, so every filtered view is shareable and crawlable.
 *
 * COMPOSITION. The masthead is a band, not a stack. The heading, its lead
 * paragraph and the category index occupy a four-column rail; the first project
 * fills the seven columns beside it and runs off the right edge of the screen.
 * That is what puts work inside the arrival screen — the previous stack pushed
 * the first photograph to y=813 on a 1000px viewport and left a 176px empty
 * band under the filter bar, which was the defect the audit reported.
 *
 * One query serves the whole page: the full published run is fetched once, the
 * per-category figures are counted from it, and the active category is filtered
 * in memory. `getPublishedProjects` is `cache()`d and already ordered, so the
 * filtered view keeps the editor's ordering without a second round trip.
 *
 * IT IS PAGED, AND THAT IS THE POINT. The index used to render all 105 projects
 * into one document: 34,244px on a 1600×1000 desktop, 35,604px at 390 wide —
 * about 34 and 42 screens (docs/ui-after/measurements.json). It is also the
 * destination of the site's primary call to action, so the one page the studio
 * most needs a visitor to read was the one page a visitor could not get through.
 *
 * Twenty-four to a page, as `?page=N` — the same plain-link contract as the
 * category filter, so every page of the catalogue is linkable and crawlable and
 * the back button works. The masthead is unchanged on every page: the rail, then
 * that page's first project on the seven columns beside it, then the rest of the
 * page phrased by `ProjectIndex`. Nothing about it knows which page it is on,
 * which is why page four composes as carefully as page one.
 *
 * The figures in the filter still count the WHOLE run, not the page — 105 =
 * 41 + 20 + 3 + 19 + 22 — because they are what tell a visitor which category is
 * worth opening. Paging a category pages its own filtered run.
 */

import type { Metadata } from 'next'

import { CategoryFilter } from '@/components/projects/CategoryFilter'
import type { CategoryOption } from '@/components/projects/CategoryFilter'
import { DISPLAY } from '@/components/projects/composition'
import { IndexPager } from '@/components/projects/IndexPager'
import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { ProjectLead } from '@/components/projects/ProjectLead'
import { Label } from '@/components/ui/Label'
import { CATEGORY_SEEDS } from '@/data/seed-types'
import { buildMetadata } from '@/lib/seo'
import { cn, pad2 } from '@/lib/utils'
import { getPublishedProjects } from '@/server/queries/projects'
import type { ProjectSummary } from '@/types/content'

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

/** Only the fixed taxonomy is honoured — an unknown slug falls back to "all". */
function resolveCategory(params: SearchParams): string | null {
  const raw = params.category
  const value = Array.isArray(raw) ? raw[0] : raw
  if (typeof value !== 'string') return null
  return CATEGORIES.some((category) => category.slug === value) ? value : null
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

/** Figures for the filter index, counted off the one list we already hold. */
function withCounts(projects: readonly ProjectSummary[]): CategoryOption[] {
  const tally = new Map<string, number>()
  for (const project of projects) {
    if (!project.categorySlug) continue
    tally.set(project.categorySlug, (tally.get(project.categorySlug) ?? 0) + 1)
  }
  return CATEGORIES.map((category) => ({ ...category, count: tally.get(category.slug) ?? 0 }))
}

/** `?category=x&page=2`, with page one left off so the index keeps one URL. */
function canonicalPath(category: string | null, page: number): string {
  const query = [category ? `category=${category}` : null, page > 1 ? `page=${page}` : null].filter(
    (part): part is string => part !== null,
  )
  return query.length > 0 ? `/projects?${query.join('&')}` : '/projects'
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams
  const active = resolveCategory(params)
  const name = categoryName(active)

  // `getPublishedProjects` is `cache()`d for the request, so resolving the page
  // count here costs nothing the render was not already paying — and it means a
  // canonical never points at a page that does not exist.
  const all = await getPublishedProjects()
  const count = active ? all.filter((project) => project.categorySlug === active).length : all.length
  const pages = Math.max(1, Math.ceil(count / PER_PAGE))
  const page = Math.min(resolvePage(params), pages)

  const base = name ? `${name} — Dự án` : 'Dự án'

  return buildMetadata({
    title: page > 1 ? `${base} — Trang ${page}/${pages}` : base,
    description: name
      ? `Tuyển tập ${name.toLowerCase()} do GuHomes thiết kế và giám sát thi công — vật liệu thật, ánh sáng thật, tỉ lệ được cân nhắc từng centimet.`
      : 'Tuyển tập các không gian nội thất do GuHomes thiết kế: căn hộ, nhà phố, biệt thự, thương mại và những không gian chuyên biệt.',
    path: canonicalPath(active, page),
    type: 'website',
  })
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const active = resolveCategory(params)
  const all = await getPublishedProjects()
  const projects = active ? all.filter((project) => project.categorySlug === active) : all
  const name = categoryName(active)

  // Clamped, not 404'd: `?page=99` is a stale link or a crawler guess, and the
  // useful answer to both is the last page of the run.
  const pages = Math.max(1, Math.ceil(projects.length / PER_PAGE))
  const page = Math.min(resolvePage(params), pages)
  const offset = (page - 1) * PER_PAGE
  const pageItems = projects.slice(offset, offset + PER_PAGE)

  const lead = pageItems[0]
  const rest = pageItems.slice(1)

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

            <h1 className={cn(DISPLAY, 'text-ink mt-7 max-w-[12ch]')}>{name ?? 'Dự án'}</h1>

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
                categories={withCounts(all)}
                active={active}
                total={all.length}
                className="mt-3 lg:mt-2"
              />
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
                  Hạng mục này đang được cập nhật. Bạn có thể xem toàn bộ dự án hoặc liên hệ để chúng tôi gửi
                  hồ sơ năng lực đầy đủ.
                </p>
                <p className="u-label mt-6">{pad2(all.length)} dự án đã hoàn thiện</p>
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

      <IndexPager
        page={page}
        pages={pages}
        from={offset + 1}
        showing={pageItems.length}
        total={projects.length}
        category={active}
        className="mt-[clamp(3.5rem,9vh,7rem)]"
      />
    </div>
  )
}
