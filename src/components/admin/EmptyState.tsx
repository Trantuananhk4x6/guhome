import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface EmptyStateProps {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}

/** Quiet placeholder for empty tables and lists. */
export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3 border border-dashed border-line px-6 py-14 text-center', className)}>
      <p className="u-label text-ink">{title}</p>
      {description ? (
        <p className="max-w-md font-body text-[0.8125rem] leading-6 text-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}
