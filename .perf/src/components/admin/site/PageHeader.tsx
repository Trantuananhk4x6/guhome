import type { ReactNode } from 'react'

import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'

export interface AdminPageHeaderProps {
  /** Small English editorial label — `THEME`, `HOMEPAGE`, `JOURNAL`. */
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

/** The masthead every site-administration screen opens with. */
export function AdminPageHeader({ eyebrow, title, description, actions, className }: AdminPageHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-6 border-b border-line pb-8', className)}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-4">
          <Label rule>{eyebrow}</Label>
          <h1 className="u-display-sm text-ink">{title}</h1>
        </div>
        {actions ? <div className="flex flex-wrap items-center gap-4">{actions}</div> : null}
      </div>
      {description ? <p className="max-w-[70ch] text-[0.875rem] leading-relaxed text-muted">{description}</p> : null}
    </header>
  )
}
