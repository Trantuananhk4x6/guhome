/**
 * /projects — the editorial index.
 *
 * Server component, no three.js on this route (ARCHITECTURE §8): the index is the
 * fastest page on the site and stays that way. The category filter is a plain
 * `?category=` query, so every filtered view is shareable and crawlable.
 */

import type { Metadata } from 'next'

import { CategoryFilter } from '@/components/projects/CategoryFilter'
import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { CATEGORY_SEEDS } from '@/data/seed-types'
import { buildMetadata } from '@/lib/seo'
import { pad2 } from '@/lib/utils'
import { getPublishedProjects } from '@/server/queries/projects'

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
  const projects = await getPublishedProjects(active ? { categorySlug: active } : {})
  const name = categoryName(active)

  return (
    <div className="bg-canvas pb-[var(--spacing-section)]">
      <header className="u-gutter mx-auto w-full max-w-[110rem] pt-40 pb-16 md:pt-56 md:pb-24">
        <p className="u-label flex items-center gap-3">
          <span aria-hidden="true" className="bg-accent h-px w-8" />
          Index
        </p>

        <h1 className="u-display text-ink mt-8 max-w-[14ch]">{name ?? 'Dự án'}</h1>

        <p className="u-body-lg mt-10 max-w-[52ch]">
          Mỗi công trình bắt đầu từ một câu hỏi về cách sống, rồi mới đến vật liệu và tỉ lệ. Dưới đây là những
          không gian AN ATELIER đã hoàn thiện — sắp xếp theo thứ tự chúng tôi muốn bạn đọc.
        </p>
      </header>

      <div className="u-gutter mx-auto w-full max-w-[110rem]">
        <div className="border-line flex flex-wrap items-end justify-between gap-8 border-b pb-6">
          <CategoryFilter categories={CATEGORIES} active={active} />
          <p className="u-label text-muted">
            {projects.length > 0 ? `${pad2(projects.length)} dự án` : 'Chưa có dự án'}
          </p>
        </div>
      </div>

      <div className="u-gutter mx-auto mt-24 w-full max-w-[110rem] md:mt-32">
        {projects.length > 0 ? (
          <ProjectIndex projects={projects} />
        ) : (
          <p className="u-body-lg max-w-[46ch]">
            Hạng mục này đang được cập nhật. Bạn có thể xem toàn bộ dự án hoặc liên hệ để chúng tôi gửi hồ sơ
            năng lực đầy đủ.
          </p>
        )}
      </div>
    </div>
  )
}
