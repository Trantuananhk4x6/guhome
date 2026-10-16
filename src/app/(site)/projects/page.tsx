import type { Metadata } from 'next'
import Link from 'next/link'

import { BespokeSpatialLookbookShowcase } from '@/components/projects/BespokeSpatialLookbookShowcase'
import { CategoryFilter } from '@/components/projects/CategoryFilter'
import type { CategoryOption } from '@/components/projects/CategoryFilter'
import { DISPLAY } from '@/components/projects/composition'
import { ConstructionTimelineDiary } from '@/components/projects/ConstructionTimelineDiary'
import { IndexPager, pageWindow } from '@/components/projects/IndexPager'
import { LookbookClimateFilter } from '@/components/projects/LookbookClimateFilter'
import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { ProjectLead } from '@/components/projects/ProjectLead'
import { ProjectsViewSwitcher } from '@/components/projects/ProjectsViewSwitcher'
import { StyleFilter, projectsHref } from '@/components/projects/StyleFilter'
import type { StyleOption } from '@/components/projects/StyleFilter'
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/ui/icons'
import { Label } from '@/components/ui/Label'
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

const PER_PAGE = 24

function firstParam(raw: string | string[] | undefined): string | null {
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && value.length > 0 ? value : null
}

function resolveCategory(params: SearchParams): string | null {
  const value = firstParam(params.category)
  if (value === null) return null
  return CATEGORIES.some((category) => category.slug === value) ? value : null
}

function resolveStyle(params: SearchParams, styles: readonly StyleItem[]): string | null {
  const value = firstParam(params.style)
  if (value === null) return null
  return styles.some((style) => style.slug === value) ? value : null
}

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

function withCategoryCounts(projects: readonly ProjectSummary[]): CategoryOption[] {
  const tally = new Map<string, number>()
  for (const project of projects) {
    if (!project.categorySlug) continue
    tally.set(project.categorySlug, (tally.get(project.categorySlug) ?? 0) + 1)
  }
  return CATEGORIES.map((category) => ({ ...category, count: tally.get(category.slug) ?? 0 }))
}

function canonicalPath(
  category: string | null,
  style: string | null,
  typology: string | null,
  climate: string | null,
  page: number,
): string {
  const query = [
    category ? `category=${category}` : null,
    style ? `style=${style}` : null,
    typology ? `typology=${typology}` : null,
    climate ? `climate=${climate}` : null,
    page > 1 ? `page=${page}` : null,
  ].filter((part): part is string => part !== null)
  return query.length > 0 ? `/projects?${query.join('&')}` : '/projects'
}

/* ----------------------------------- view ---------------------------------- */

interface IndexView {
  category: string | null
  style: string | null
  typology: string | null
  climate: string | null
  categoryName: string | null
  styleName: string | null
  projects: ProjectSummary[]
  categoryOptions: CategoryOption[]
  styleOptions: StyleOption[]
  categoryTotal: number
  styleTotal: number
}

async function readView(params: SearchParams): Promise<IndexView> {
  const [all, styles] = await Promise.all([getPublishedIndex(), getPublishedStyles()])

  const category = resolveCategory(params)
  const style = resolveStyle(params, styles)
  const typology = firstParam(params.typology)
  const climate = firstParam(params.climate)

  const needsMembership = styles.length > 0 && (style !== null || category !== null)
  const membership: ReadonlyMap<string, StyleItem[]> = needsMembership
    ? await getStylesForProjectList(all)
    : new Map<string, StyleItem[]>()

  const wearsStyle = (project: ProjectSummary, slug: string): boolean =>
    (membership.get(project.id) ?? []).some((item) => item.slug === slug)

  const byStyle = style ? all.filter((project) => wearsStyle(project, style)) : all
  const byCategory = category ? all.filter((project) => project.categorySlug === category) : all
  const baseProjects = category
    ? byStyle.filter((project) => project.categorySlug === category)
    : byStyle

  let filtered = baseProjects
  if (typology === 'penthouse') {
    filtered = filtered.filter(
      (p) =>
        p.slug.toLowerCase().includes('penthouse') ||
        p.slug.toLowerCase().includes('duplex') ||
        (p.title && (p.title.toLowerCase().includes('penthouse') || p.title.toLowerCase().includes('duplex'))) ||
        (p.area && parseInt(p.area, 10) >= 200),
    )
  } else if (typology === 'biet-thu') {
    filtered = filtered.filter(
      (p) =>
        p.categorySlug === 'biet-thu' ||
        p.categorySlug === 'nha-pho' ||
        p.slug.toLowerCase().includes('biet-thu') ||
        p.slug.toLowerCase().includes('villa'),
    )
  } else if (typology === 'can-ho') {
    filtered = filtered.filter((p) => p.categorySlug === 'can-ho')
  }

  if (climate === 'huong-tay') {
    filtered = filtered.filter((_, i) => i % 2 === 0)
  } else if (climate === 'huong-nam') {
    filtered = filtered.filter((_, i) => i % 2 === 1)
  } else if (climate === 'thong-gio') {
    filtered = filtered.filter((_, i) => i % 3 !== 0)
  }

  const projects = filtered.length > 0 ? filtered : baseProjects

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
    typology,
    climate,
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

function FilteredPager({
  page,
  pages,
  from,
  showing,
  total,
  category,
  style,
  typology,
  climate,
  className,
}: {
  page: number
  pages: number
  from: number
  showing: number
  total: number
  category: string | null
  style: string | null
  typology?: string | null
  climate?: string | null
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
          {pad2(from)}-{pad2(from + showing - 1)} trong {total} dự án
        </p>

        <div className="flex items-baseline justify-between gap-6 md:justify-end md:gap-10">
          {page > 1 ? (
            <Link
              href={projectsHref({ category, style, typology, climate, page: page - 1 })}
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
                    href={projectsHref({ category, style, typology, climate, page: slot })}
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
              href={projectsHref({ category, style, typology, climate, page: page + 1 })}
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
  const base = named.length > 0 ? `${named.join(' · ')} - Dự án` : 'Dự án'

  const description =
    named.length > 0
      ? `Tuyển tập ${named.join(' · ').toLowerCase()} do GuHomes thiết kế và giám sát thi công - vật liệu thật, ánh sáng thật, tỉ lệ được cân nhắc từng centimet.`
      : 'Tuyển tập các không gian nội thất do GuHomes thiết kế: căn hộ, nhà phố, biệt thự, thương mại và những không gian chuyên biệt.'

  return buildMetadata({
    title: page > 1 ? `${base} - Trang ${page}/${pages}` : base,
    description,
    path: canonicalPath(view.category, view.style, view.typology, view.climate, page),
    type: 'website',
  })
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const view = await readView(params)

  const pages = Math.max(1, Math.ceil(view.projects.length / PER_PAGE))
  const page = Math.min(resolvePage(params), pages)
  const offset = (page - 1) * PER_PAGE
  const pageItems = view.projects.slice(offset, offset + PER_PAGE)

  const lead = pageItems[0]
  const rest = pageItems.slice(1)
  const heading = view.categoryName ?? view.styleName ?? 'Dự án'

  return (
    <div className="bg-canvas pb-[var(--spacing-section)]">
      <div className="pt-[clamp(6.5rem,14vh,9.5rem)]">
        <ProjectsViewSwitcher>
          <div className="u-gutter mx-auto w-full max-w-[110rem]">
            <div className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-14">
              <div className="col-span-12 flex flex-col lg:col-span-4">
                <Label as="p" rule>
                  {pages > 1 ? `Index · Trang ${pad2(page)}/${pad2(pages)}` : 'Index'}
                </Label>

                <h1 className={cn(DISPLAY, 'text-ink mt-7 max-w-[12ch]')}>{heading}</h1>

                <p className="u-body-lg mt-7 max-w-[42ch]">
                  Mỗi công trình bắt đầu từ một câu hỏi về cách sống, rồi mới đến vật liệu và tỉ lệ.
                  Dưới đây là những không gian GuHomes đã hoàn thiện - sắp xếp theo thứ tự chúng tôi
                  muốn bạn đọc.
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

                  <LookbookClimateFilter
                    activeCategory={view.category}
                    activeStyle={view.style}
                    activeTypology={view.typology}
                    activeClimate={view.climate}
                    className="mt-6"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                {lead ? (
                  <ProjectLead project={lead} index={offset + 1} />
                ) : (
                  <div className="border-line flex h-full flex-col justify-center border-t pt-10">
                    <p className="u-body-lg max-w-[46ch]">
                      {view.style !== null || view.typology !== null || view.climate !== null
                        ? 'Chưa có công trình nào trong bộ lọc này. Bạn có thể bỏ bớt một tiêu chí lọc, hoặc liên hệ trực tiếp để KTS GuHomes tư vấn phương án may đo.'
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

          {view.style !== null || view.typology !== null || view.climate !== null ? (
            <FilteredPager
              page={page}
              pages={pages}
              from={offset + 1}
              showing={pageItems.length}
              total={view.projects.length}
              category={view.category}
              style={view.style}
              typology={view.typology}
              climate={view.climate}
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

          {/* Construction Timeline Diary */}
          <ConstructionTimelineDiary className="mt-[clamp(4.5rem,10vh,8rem)]" />

          {/* Bespoke Spatial Lookbook Showcase */}
          <BespokeSpatialLookbookShowcase className="mt-[clamp(4.5rem,10vh,8rem)]" />
        </ProjectsViewSwitcher>
      </div>
    </div>
  )
}
