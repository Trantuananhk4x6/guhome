import type { ReactNode, Ref } from 'react'

import { cn } from '@/lib/utils'

import { Label } from './Label'

/** `lg` is reserved for a page's opening and closing statements. See `globals.css`. */
export type SectionHeadingSize = 'lg' | 'display' | 'sm'

/**
 * Three openings, deliberately unlike each other. A page that uses one of these
 * twice in a row has repeated itself, and repeating the opening gesture is what
 * makes a site read as generated — the reader meets the same two-element move
 * (eyebrow, then a display heading owning a full-width band) at every scroll
 * stop and stops believing anyone composed it.
 *
 * `band` — the default. One 12-column row: the heading in a six-column rail with
 * the lead running beside it in 8–12 and the action on the same bottom baseline.
 * The heading never spans the band, so nothing opens a hole under it and the
 * band ends where the longest column ends.
 *
 * `rail` — the compact one. Everything on ONE line hanging off a top hairline:
 * eyebrow in 1–2, a small heading in 3–7, lead in 8–10, action in 11–12. Half
 * the height of a band and a different rule position, so a page can carry both
 * without them rhyming.
 *
 * `stack` — eyebrow, heading, lead, each on its own row. The title-card shape.
 * Correct for a centred statement or a narrow column, wrong for a 1472px measure,
 * which is why it is no longer the default.
 */
export type SectionHeadingLayout = 'stack' | 'band' | 'rail'

/**
 * Where the section's hairline sits. `band` closes itself with a bottom rule so
 * that any air left beside a missing lead is bounded — air at an enclosed edge
 * reads as rest, the same air unbounded in the middle of a row reads as a hole.
 * `rail` opens on a top rule. Two sections using the same layout AND the same
 * rule position is the duplication this prop exists to avoid.
 */
export type SectionHeadingRule = 'none' | 'top' | 'bottom'

export interface SectionHeadingProps {
  /** `.u-label` eyebrow, e.g. `SELECTED WORKS`. */
  eyebrow?: ReactNode
  /** Editorial index shown in the eyebrow — `1` renders as `01`. */
  index?: number | string
  title: ReactNode
  lead?: ReactNode
  /** Usually a `<Button variant="underline">` pinned to the baseline. */
  action?: ReactNode
  as?: 'h1' | 'h2' | 'h3'
  size?: SectionHeadingSize
  layout?: SectionHeadingLayout
  rule?: SectionHeadingRule
  align?: 'left' | 'center'
  tone?: 'ink' | 'light'
  id?: string
  className?: string
  ref?: Ref<HTMLDivElement>
}

const SIZES: Record<SectionHeadingSize, string> = {
  lg: 'u-display-lg',
  display: 'u-display',
  sm: 'u-display-sm',
}

/**
 * The measure is set by the size, not by the layout. A 70px heading held to 22ch
 * is a 240px-tall object that spans its band and pushes its own content below
 * the fold; at 14ch it sets on two or three lines and fills the six columns it
 * was given, which is the difference between a title card and a composition.
 */
const MEASURES: Record<SectionHeadingSize, string> = {
  lg: 'max-w-[13ch]',
  display: 'max-w-[14ch]',
  sm: 'max-w-[18ch]',
}

const RULES: Record<SectionHeadingRule, string> = {
  none: '',
  top: 'border-t border-line pt-6',
  bottom: 'border-b border-line pb-8',
}

const LIGHT_RULES: Record<SectionHeadingRule, string> = {
  none: '',
  top: 'border-t border-canvas/15 pt-6',
  bottom: 'border-b border-canvas/15 pb-8',
}

/** Eyebrow + display title + lead paragraph, in one of three compositions. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  action,
  as = 'h2',
  size = 'display',
  layout = 'band',
  rule = 'none',
  align = 'left',
  tone = 'ink',
  id,
  className,
  ref,
}: SectionHeadingProps) {
  const Tag = as
  // A band and a rail are asymmetric by definition — neither has a centred form.
  const centered = layout === 'stack' && align === 'center'
  const light = tone === 'light'
  const ruleClass = (light ? LIGHT_RULES : RULES)[rule]

  const eyebrowNode =
    eyebrow || index !== undefined ? (
      // The eyebrow's own 32px hairline survives wherever the eyebrow leads a
      // column, and is dropped in `rail`, where the section already opens on a
      // full-width rule and the label sits in columns of its own — two rules
      // within 8px of each other read as a rendering accident, not a system.
      <Label index={index} rule={!centered && layout !== 'rail'} tone={light ? 'light' : 'muted'}>
        {eyebrow}
      </Label>
    ) : null

  const titleNode = (
    <Tag id={id} className={cn(SIZES[size], light ? 'text-canvas' : 'text-ink', MEASURES[size])}>
      {title}
    </Tag>
  )

  if (layout === 'rail') {
    return (
      <div
        ref={ref}
        className={cn('grid grid-cols-12 items-start gap-x-8 gap-y-5', ruleClass, className)}
      >
        {/*
          The eyebrow is lifted out of the heading column and given two of its
          own. That is the whole difference between this and a band: the reader
          meets a label, a rule and a heading arranged ACROSS the page rather
          than stacked, and the section cannot be mistaken for the one above it.
        */}
        {eyebrowNode ? <div className="col-span-12 lg:col-span-2">{eyebrowNode}</div> : null}

        <div className="col-span-12 lg:col-span-5 lg:col-start-3">{titleNode}</div>

        {lead ? (
          <p
            className={cn(
              'u-body-lg col-span-12 max-w-[46ch] lg:col-span-3 lg:col-start-8',
              light && 'text-canvas/60',
            )}
          >
            {lead}
          </p>
        ) : null}

        {action ? (
          <div className="col-span-12 lg:col-span-2 lg:col-start-11 lg:justify-self-end">{action}</div>
        ) : null}
      </div>
    )
  }

  if (layout === 'band') {
    return (
      <div
        ref={ref}
        className={cn('grid grid-cols-12 items-end gap-x-8 gap-y-8', ruleClass, className)}
      >
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-6">
          {eyebrowNode}
          {titleNode}
        </div>

        {/*
          The lead's span depends on whether an action shares the row, and that
          dependency is the whole point. Cols 8–12 when it does not: the space
          runs to the page edge and is closed by the band's own rule, so it reads
          as an enclosed corner rather than an unfilled rectangle mid-row.

          Cols 8–10 when it does. 8–12 CONTAINS the action's 11–12, and two items
          placed on overlapping tracks are not overlaid — grid auto-placement
          moves the second one to a new row. So a band carrying both a lead and
          an action dropped the action onto a row of its own, where a lone
          underlined link sat marooned between two hairlines with a whole empty
          band beside it. The hole the `band` layout exists to prevent, produced
          by `band` itself, in the one combination that actually occurs.
        */}
        {lead ? (
          <p
            className={cn(
              'u-body-lg col-span-12 max-w-[46ch] lg:col-start-8',
              action ? 'lg:col-span-3' : 'lg:col-span-5',
              light && 'text-canvas/60',
            )}
          >
            {lead}
          </p>
        ) : null}

        {action ? (
          <div className="col-span-12 lg:col-span-2 lg:col-start-11 lg:justify-self-end">{action}</div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-6',
        centered && 'items-center text-center',
        ruleClass,
        className,
      )}
    >
      {eyebrowNode}

      <div
        className={cn(
          'flex flex-col gap-8',
          !centered && action && 'md:flex-row md:items-end md:justify-between md:gap-16',
        )}
      >
        <Tag
          id={id}
          className={cn(
            SIZES[size],
            light ? 'text-canvas' : 'text-ink',
            centered ? 'max-w-[18ch]' : 'max-w-[22ch]',
          )}
        >
          {title}
        </Tag>
        {action ? <div className={cn('shrink-0', !centered && 'md:pb-3')}>{action}</div> : null}
      </div>

      {lead ? (
        <p className={cn('u-body-lg max-w-[52ch]', light && 'text-canvas/60', centered && 'mx-auto')}>
          {lead}
        </p>
      ) : null}
    </div>
  )
}
