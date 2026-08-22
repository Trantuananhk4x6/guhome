import { cn } from '@/lib/utils'

export type SpinnerSize = 'xs' | 'sm' | 'md'

export interface SpinnerProps {
  size?: SpinnerSize
  /** Announced to assistive tech. Omit for purely decorative spinners. */
  label?: string
  className?: string
}

const SIZES: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
}

/** A hairline ring that rotates. Inherits `currentColor`. */
export function Spinner({ size = 'sm', label, className }: SpinnerProps) {
  return (
    <span className={cn('inline-flex items-center', className)} role={label ? 'status' : undefined}>
      <span
        aria-hidden="true"
        className={cn(
          'inline-block animate-spin rounded-full border border-current/20 border-t-current',
          SIZES[size],
        )}
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </span>
  )
}
