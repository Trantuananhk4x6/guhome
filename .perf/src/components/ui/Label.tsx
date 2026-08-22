import type { HTMLAttributes, Ref } from 'react'

import { cn, pad2 } from '@/lib/utils'

export type LabelTone = 'muted' | 'ink' | 'accent' | 'light'

export interface LabelProps extends Omit<HTMLAttributes<HTMLElement>, 'ref'> {
  as?: 'span' | 'p' | 'div'
  /** Editorial index rendered in accent before the text — `1` becomes `01`. */
  index?: number | string
  /** Hairline that runs in front of the text. */
  rule?: boolean
  tone?: LabelTone
  ref?: Ref<HTMLSpanElement>
}

const TONES: Record<LabelTone, string> = {
  muted: 'text-muted',
  ink: 'text-ink',
  accent: 'text-accent',
  light: 'text-canvas/60',
}

const RULE_TONES: Record<LabelTone, string> = {
  muted: 'bg-line',
  ink: 'bg-ink/30',
  accent: 'bg-accent',
  light: 'bg-canvas/30',
}

/**
 * The `.u-label` eyebrow — 11px, uppercase, 0.18em tracking.
 * `SELECTED WORKS`, `INDEX 01`, `STUDIO`.
 */
export function Label({ as = 'span', index, rule = false, tone = 'muted', className, children, ...rest }: LabelProps) {
  // All three tags share the same attribute surface; the cast keeps the ref
  // type concrete instead of collapsing the JSX union.
  const Tag = as as 'span'
  return (
    <Tag className={cn('u-label inline-flex items-center gap-3', TONES[tone], className)} {...rest}>
      {rule ? <span aria-hidden="true" className={cn('h-px w-8 shrink-0', RULE_TONES[tone])} /> : null}
      {index !== undefined ? (
        <span className={cn(tone === 'accent' ? 'text-accent-soft' : 'text-accent')}>
          {typeof index === 'number' ? pad2(index) : index}
        </span>
      ) : null}
      {children}
    </Tag>
  )
}
