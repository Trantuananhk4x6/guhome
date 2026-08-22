import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export interface ToolbarProps {
  children: ReactNode
  className?: string
  /** Hairline under the toolbar. On by default. */
  divided?: boolean
}

/**
 * Filter / action strip that sits above a table. Server-safe: it renders no
 * handlers of its own, so a plain GET `<form>` inside it works without JS.
 */
export function Toolbar({ children, className, divided = true }: ToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-end justify-between gap-x-6 gap-y-3 pb-4',
        divided && 'border-b border-line',
        className,
      )}
    >
      {children}
    </div>
  )
}

export interface ToolbarGroupProps {
  children: ReactNode
  className?: string
}

export function ToolbarGroup({ children, className }: ToolbarGroupProps) {
  return <div className={cn('flex flex-wrap items-end gap-2', className)}>{children}</div>
}

export interface ToolbarCountProps {
  children: ReactNode
  className?: string
}

/** Result counter — `12 dự án`. */
export function ToolbarCount({ children, className }: ToolbarCountProps) {
  return <p className={cn('u-label text-muted', className)}>{children}</p>
}
