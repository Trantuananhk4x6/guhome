/**
 * A gallery of project photographs.
 *
 * At `columns: 2` — what every seeded story asks for — this is not a grid of
 * equal plates any more. Six identical two-up rows taught the reader after the
 * first one that nothing else would happen, and it cost 2,757px to say so. The
 * plates now run through a six-step measure: a 7-column landscape against a
 * dropped 4-column portrait, a full-measure 21:9 band, a 5-column square-ish
 * plate against a 6-column landscape, and an 8-column band inset from both
 * sides. Six photographs, six proportions, one grid.
 *
 * At `columns: 3` and `4` the editor has explicitly asked for a contact sheet,
 * which is a legitimate thing to ask for, so that path keeps its uniform grid.
 *
 * Each plate drifts inside its own frame at a slightly different rate, capped at
 * ±10% of the frame by the overscan in `ProjectFigure` — never more.
 */

import { cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

import { ProjectFigure } from './ProjectFigure'

export type GalleryColumns = 2 | 3 | 4

export interface ProjectGalleryProps {
  items: readonly MediaRef[]
  columns?: GalleryColumns
  caption?: string
  /** 0-based position among the GALLERY blocks, so a second one starts elsewhere. */
  occurrence?: number
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

/** Alternating portrait / landscape plates, so the contact sheet never sits flat. */
const ASPECTS = ['3 / 4', '4 / 3', '1 / 1'] as const

/** Three drift rates, cycled — all well inside the ±10% ceiling. */
const STRENGTHS = [0.22, 0.36, 0.28] as const

/* ------------------------------- the measure ------------------------------- */

interface Plate {
  span: string
  /** Mobile aspect first, desktop second — the frame owns both. */
  aspect: string
  sizes: string
  width: number
  strength: number
}

const PLATES: readonly Plate[] = [
  {
    span: 'lg:col-span-7',
    aspect: 'aspect-[4/5] lg:aspect-[3/2]',
    sizes: '(min-width: 1024px) 55vw, 100vw',
    width: 1600,
    strength: 0.24,
  },
  {
    span: 'lg:col-span-4 lg:col-start-9 lg:mt-20',
    aspect: 'aspect-[4/5]',
    sizes: '(min-width: 1024px) 30vw, 100vw',
    width: 1200,
    strength: 0.36,
  },
  {
    span: 'lg:col-span-12',
    aspect: 'aspect-[3/2] lg:aspect-[21/9]',
    sizes: '(min-width: 1024px) 92vw, 100vw',
    width: 2400,
    strength: 0.2,
  },
  {
    span: 'lg:col-span-5',
    aspect: 'aspect-[4/5] lg:aspect-[5/4]',
    sizes: '(min-width: 1024px) 38vw, 100vw',
    width: 1200,
    strength: 0.3,
  },
  {
    span: 'lg:col-span-6 lg:col-start-7 lg:mt-16',
    aspect: 'aspect-[3/2]',
    sizes: '(min-width: 1024px) 46vw, 100vw',
    width: 1600,
    strength: 0.26,
  },
  {
    span: 'lg:col-span-8 lg:col-start-3',
    aspect: 'aspect-[3/2] lg:aspect-[21/9]',
    sizes: '(min-width: 1024px) 62vw, 100vw',
    width: 1600,
    strength: 0.34,
  },
]

export function ProjectGallery({ items, columns = 2, caption, occurrence = 0, className }: ProjectGalleryProps) {
  if (items.length === 0) return null

  if (columns === 2) {
    // A second gallery in the same story starts two steps into the measure, so
    // the two never open with the same pair of proportions.
    const offset = occurrence * 2

    return (
      <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
        <div className="grid grid-cols-12 gap-x-8 gap-y-12 md:gap-y-[clamp(3rem,7vh,5.5rem)]">
          {items.map((item, i) => {
            const plate = PLATES[(i + offset) % PLATES.length] ?? PLATES[0]
            if (!plate) return null
            return (
              <div key={item.id} className={cn('col-span-12', plate.span)}>
                <ProjectFigure
                  media={item}
                  sizes={plate.sizes}
                  width={plate.width}
                  reveal="revealClip"
                  parallax
                  parallaxStrength={plate.strength}
                  cursor="view"
                  caption={item.caption ?? undefined}
                  frameClassName={plate.aspect}
                />
              </div>
            )
          })}
        </div>

        {caption ? <p className="u-label text-muted mt-8 max-w-[52ch]">{caption}</p> : null}
      </section>
    )
  }

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <div className={cn('grid grid-cols-1 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16', GRIDS[columns])}>
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
            className={cn(i % 2 === 1 && 'lg:mt-16')}
          />
        ))}
      </div>

      {caption ? <p className="u-label text-muted mt-8 max-w-[52ch]">{caption}</p> : null}
    </section>
  )
}
