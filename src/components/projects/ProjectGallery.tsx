/**
 * A gallery of project photographs. Each plate drifts inside its own frame at a
 * slightly different rate, which is what stops a multi-column grid from reading
 * like a contact sheet. The drift is capped at ±10% of the frame by the
 * overscan in `ProjectFigure` — never more.
 */

import { cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

import { ProjectFigure } from './ProjectFigure'

export type GalleryColumns = 2 | 3 | 4

export interface ProjectGalleryProps {
  items: readonly MediaRef[]
  columns?: GalleryColumns
  caption?: string
  className?: string
}

const GRIDS: Record<GalleryColumns, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
}

const SIZES: Record<GalleryColumns, string> = {
  2: '(min-width: 640px) 45vw, 100vw',
  3: '(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw',
  4: '(min-width: 1024px) 23vw, 45vw',
}

const REQUEST_WIDTH: Record<GalleryColumns, number> = {
  2: 1600,
  3: 1200,
  4: 800,
}

/** Alternating portrait / landscape plates, so the grid never sits flat. */
const ASPECTS = ['3 / 4', '4 / 3', '1 / 1'] as const

/** Three drift rates, cycled — all well inside the ±10% ceiling. */
const STRENGTHS = [0.22, 0.36, 0.28] as const

export function ProjectGallery({ items, columns = 2, caption, className }: ProjectGalleryProps) {
  if (items.length === 0) return null

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <div className={cn('grid grid-cols-1 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-20', GRIDS[columns])}>
        {items.map((item, i) => (
          <ProjectFigure
            key={item.id}
            media={item}
            aspect={ASPECTS[i % ASPECTS.length] ?? '4 / 3'}
            sizes={SIZES[columns]}
            width={REQUEST_WIDTH[columns]}
            reveal="revealClip"
            parallax
            parallaxStrength={STRENGTHS[i % STRENGTHS.length] ?? 0.28}
            cursor="view"
            caption={item.caption ?? undefined}
            className={cn(columns > 2 && i % 2 === 1 && 'lg:mt-16')}
          />
        ))}
      </div>

      {caption ? <p className="u-label text-muted mt-8 max-w-[52ch]">{caption}</p> : null}
    </section>
  )
}
