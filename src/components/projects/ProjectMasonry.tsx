/**
 * Masonry plates in their natural proportions — CSS columns, so the flow stays
 * in reading order for assistive technology. Each plate keeps the intrinsic
 * aspect ratio of its source photograph; only the ones that never reported a
 * size fall back to a portrait frame.
 */

import { cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

import { ProjectFigure } from './ProjectFigure'

export type MasonryColumns = 2 | 3 | 4

export interface ProjectMasonryProps {
  items: readonly MediaRef[]
  columns?: MasonryColumns
  className?: string
}

const COLUMNS: Record<MasonryColumns, string> = {
  2: 'sm:columns-2',
  3: 'sm:columns-2 lg:columns-3',
  4: 'columns-2 lg:columns-4',
}

const SIZES: Record<MasonryColumns, string> = {
  2: '(min-width: 640px) 45vw, 100vw',
  3: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  4: '(min-width: 1024px) 23vw, 45vw',
}

const REQUEST_WIDTH: Record<MasonryColumns, number> = {
  2: 1600,
  3: 1200,
  4: 800,
}

function intrinsicAspect(media: MediaRef): string {
  const { width, height } = media
  if (!width || !height || width <= 0 || height <= 0) return '3 / 4'
  return `${width} / ${height}`
}

export function ProjectMasonry({ items, columns = 3, className }: ProjectMasonryProps) {
  if (items.length === 0) return null

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <div className={cn('columns-1 gap-6 md:gap-10', COLUMNS[columns])}>
        {items.map((item) => (
          <div key={item.id} className="mb-6 break-inside-avoid md:mb-10">
            <ProjectFigure
              media={item}
              aspect={intrinsicAspect(item)}
              sizes={SIZES[columns]}
              width={REQUEST_WIDTH[columns]}
              reveal="revealScale"
              caption={item.caption ?? undefined}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
