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
 */

import type { Metadata } from 'next'

import { CategoryFilter } from '@/components/projects/CategoryFilter'
import type { CategoryOption } from '@/components/projects/CategoryFilter'
import { DISPLAY } from '@/components/projects/composition'
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

/** Only the fixed taxonomy is honoured — an unknown slug falls back to "all". */
function resolveCategory(params: SearchParams): string | null {
  const raw = params.category
  const value = Array.isArray(raw) ? raw[0] : raw
  if (typeof value !== 'string') return null
  return CATEGORIES.some((category) => category.slug === value) ? value : null
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

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const active = resolveCategory(await searchParams)
  const name = categoryName(active)

  return buildMetadata({
    title: name ? `${name} — Dự án` : 'Dự án',
    description: name
      ? `Tuyển tập ${name.toLowerCase()} do AN ATELIER thiết kế và giám sát thi công — vật liệu thật, ánh sáng thật, tỉ lệ được cân nhắc từng centimet.`
      : 'Tuyển tập các không gian nội thất do AN ATELIER thiết kế: căn hộ, nhà phố, biệt thự, thương mại và những không gian chuyên biệt.',
    path: active ? `/projects?category=${active}` : '/projects',
    type: 'website',
  })
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const active = resolveCategory(params)
  const all = await getPublishedProjects()
  const projects = active ? all.filter((project) => project.categorySlug === active) : all
  const name = categoryName(active)

  const lead = projects[0]
  const rest = projects.slice(1)

  return (
    <div className="bg-canvas pb-[var(--spacing-section)]">
      <div className="u-gutter mx-auto w-full max-w-[110rem] pt-[clamp(6.5rem,16vh,11rem)]">
        <div className="grid grid-cols-12 gap-x-8 gap-y-10 lg:gap-y-14">
          {/* The rail: the whole masthead, in four columns instead of a band. */}
          <div className="col-span-12 flex flex-col lg:col-span-4">
            <Label as="p" rule>
              Index
            </Label>

            <h1 className={cn(DISPLAY, 'text-ink mt-7 max-w-[12ch]')}>{name ?? 'Dự án'}</h1>

            <p className="u-body-lg mt-7 max-w-[42ch]">
              Mỗi công trình bắt đầu từ một câu hỏi về cách sống, rồi mới đến vật liệu và tỉ lệ. Dưới đây là
              những không gian AN ATELIER đã hoàn thiện — sắp xếp theo thứ tự chúng tôi muốn bạn đọc.
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

          {/* The lead plate: seven columns, running off the right edge. */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-6">
            {lead ? (
              <ProjectLead project={lead} index={1} />
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
          <ProjectIndex projects={rest} startIndex={2} />
        </div>
      ) : null}
    </div>
  )
}
