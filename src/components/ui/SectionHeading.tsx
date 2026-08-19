import type { ReactNode, Ref } from 'react'

import { cn } from '@/lib/utils'

import { Label } from './Label'

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
  size?: 'display' | 'sm'
  align?: 'left' | 'center'
  tone?: 'ink' | 'light'
  id?: string
  className?: string
  ref?: Ref<HTMLDivElement>
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
  align = 'left',
  tone = 'ink',
  id,
  className,
  ref,
}: SectionHeadingProps) {
  const Tag = as
  const centered = align === 'center'

  return (
    <div ref={ref} className={cn('flex flex-col gap-6', centered && 'items-center text-center', className)}>
      {eyebrow || index !== undefined ? (
        <Label index={index} rule={!centered} tone={tone === 'light' ? 'light' : 'muted'}>
          {eyebrow}
        </Label>
      ) : null}

      <div
        className={cn(
          'flex flex-col gap-8',
          !centered && action && 'md:flex-row md:items-end md:justify-between md:gap-16',
        )}
      >
        <Tag
          id={id}
          className={cn(
            size === 'display' ? 'u-display' : 'u-display-sm',
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
