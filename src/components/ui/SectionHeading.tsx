import type { ReactNode, Ref } from 'react'

import { cn } from '@/lib/utils'

import { Label } from './Label'

/** `lg` is reserved for a page's opening and closing statements. See `globals.css`. */
export type SectionHeadingSize = 'lg' | 'display' | 'sm'

/**
 * `stack` — eyebrow, title, lead, each on its own row.
 * `band` — one 12-column row: the title in a narrow left rail with the lead and
 * the action running beside it. A heading alone in a full-width band is a title
 * card; a heading with content beside it is a composition, and it costs the
 * page roughly 600px less per section.
 */
export type SectionHeadingLayout = 'stack' | 'band'

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

/** Eyebrow + display title + lead paragraph, the opener of every section. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  action,
  as = 'h2',
  size = 'display',
  layout = 'stack',
  align = 'left',
  tone = 'ink',
  id,
  className,
  ref,
}: SectionHeadingProps) {
  const Tag = as
  // A band is asymmetric by definition — there is no centred variant of it.
  const centered = layout === 'stack' && align === 'center'

  const eyebrowNode =
    eyebrow || index !== undefined ? (
      <Label index={index} rule={!centered} tone={tone === 'light' ? 'light' : 'muted'}>
        {eyebrow}
      </Label>
    ) : null

  if (layout === 'band') {
    return (
      <div ref={ref} className={cn('grid grid-cols-12 items-end gap-x-8 gap-y-8', className)}>
        <div className="col-span-12 flex flex-col gap-6 lg:col-span-5">
          {eyebrowNode}
          <Tag
            id={id}
            className={cn(SIZES[size], tone === 'light' ? 'text-canvas' : 'text-ink', 'max-w-[16ch]')}
          >
            {title}
          </Tag>
        </div>

        {lead ? (
          <p
            className={cn(
              'u-body-lg col-span-12 max-w-[46ch] lg:col-span-4 lg:col-start-7',
              tone === 'light' && 'text-canvas/60',
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
    <div ref={ref} className={cn('flex flex-col gap-6', centered && 'items-center text-center', className)}>
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
            tone === 'light' ? 'text-canvas' : 'text-ink',
            centered ? 'max-w-[18ch]' : 'max-w-[22ch]',
          )}
        >
          {title}
        </Tag>
        {action ? <div className={cn('shrink-0', !centered && 'md:pb-3')}>{action}</div> : null}
      </div>

      {lead ? (
        <p className={cn('u-body-lg max-w-[52ch]', tone === 'light' && 'text-canvas/60', centered && 'mx-auto')}>
          {lead}
        </p>
      ) : null}
    </div>
  )
}
