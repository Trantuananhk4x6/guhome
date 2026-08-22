import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { FrameIcon } from './icons'
import { Label } from './Label'

export interface EmptyStateProps {
  eyebrow?: string
  title?: string
  description?: string
  /** Defaults to a hairline frame glyph. Pass `null` to omit. */
  icon?: ReactNode
  action?: ReactNode
  tone?: 'ink' | 'light'
  className?: string
}

/** Nothing to show — a quiet, centred notice inside a hairline box. */
export function EmptyState({
  eyebrow,
  title = 'Chưa có nội dung',
  description,
  icon,
  action,
  tone = 'ink',
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5 border border-dashed px-8 py-20 text-center',
        tone === 'light' ? 'border-canvas/20' : 'border-line',
        className,
      )}
    >
      {icon === undefined ? (
        <FrameIcon className={cn('text-3xl', tone === 'light' ? 'text-canvas/30' : 'text-line')} />
      ) : (
        icon
      )}
      {eyebrow ? <Label tone={tone === 'light' ? 'light' : 'muted'}>{eyebrow}</Label> : null}
      <p className={cn('u-display-sm', tone === 'light' ? 'text-canvas' : 'text-ink')}>{title}</p>
      {description ? (
        <p className={cn('max-w-[42ch] text-[0.9375rem] leading-relaxed', tone === 'light' ? 'text-canvas/55' : 'text-muted')}>
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}
