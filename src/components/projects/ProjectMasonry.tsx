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

/**
 * One column more than asked for on a very wide screen.
 *
 * A masonry block is the tail of a story — everything the edited gallery above
 * it did not take — and on a seeded project that is twenty-one photographs. At
 * three columns on a 1600px screen each of those is a 464px plate, which is not
 * a contact sheet, it is twenty-one more hero images and 3,700px of them. The
 * extra column at `2xl` is what makes the block read as the index it is, and it
 * is also what visibly distinguishes it from the gallery that precedes it.
 */
const COLUMNS: Record<MasonryColumns, string> = {
  2: 'columns-1 sm:columns-2 2xl:columns-3',
  // Two columns on a phone as well: twenty-one full-width plates is 7,480px of
  // one texture — nearly nine mobile screens — and a contact sheet is a contact
  // sheet at every width.
  3: 'columns-2 lg:columns-3 2xl:columns-4',
  4: 'columns-2 lg:columns-4',
}

const SIZES: Record<MasonryColumns, string> = {
  2: '(min-width: 1536px) 30vw, (min-width: 640px) 45vw, 100vw',
  3: '(min-width: 1536px) 23vw, (min-width: 1024px) 30vw, 45vw',
  4: '(min-width: 1024px) 23vw, 45vw',
}

const REQUEST_WIDTH: Record<MasonryColumns, number> = {
  2: 1200,
  3: 800,
  4: 800,
}

/**
 * Intrinsic proportions, clamped.
 *
 * A photograph reported at 2:3 sets a 700px plate in a 464px column, and three
 * of those in a row is most of a viewport of one uninterrupted texture — which
 * is how this block reached 3,719px on a seeded project. The clamp keeps every
 * plate recognisably its own shape while holding the tallest to 1.5× its width
 * and the widest to 1.5× its height, so the column still varies but the band
 * stays a band.
 */
const MIN_RATIO = 1 / 1.5
const MAX_RATIO = 1.5

function intrinsicAspect(media: MediaRef): string {
  const { width, height } = media
  if (!width || !height || width <= 0 || height <= 0) return '3 / 4'
  const ratio = Math.min(MAX_RATIO, Math.max(MIN_RATIO, width / height))
  return `${ratio.toFixed(4)} / 1`
}

export function ProjectMasonry({ items, columns = 3, className }: ProjectMasonryProps) {
  if (items.length === 0) return null

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <div className={cn('gap-4 md:gap-8', COLUMNS[columns])}>
        {items.map((item) => (
          <div key={item.id} className="mb-4 break-inside-avoid md:mb-8">
            <ProjectFigure
              media={item}
              aspect={intrinsicAspect(item)}
              sizes={SIZES[columns]}
              width={REQUEST_WIDTH[columns]}
              reveal="revealScale"
              cursor="view"
              caption={item.caption ?? undefined}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
