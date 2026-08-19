import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { AlertIcon } from './icons'
import { Label } from './Label'

export interface ErrorStateProps {
  title?: string
  description?: string
  /** Technical detail — rendered small and muted, safe to omit in production. */
  detail?: string
  /** Usually a `<Button onClick={reset}>`; pass from a client boundary. */
  action?: ReactNode
  tone?: 'ink' | 'light'
  className?: string
}

/** Failure surface for `error.tsx` boundaries and failed data fetches. */
export function ErrorState({
  title = 'Không tải được nội dung',
  description = 'Đã có lỗi xảy ra khi tải phần này. Vui lòng thử lại trong giây lát.',
  detail,
  action,
  tone = 'ink',
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-start gap-5 border-l px-8 py-14',
        tone === 'light' ? 'border-accent-soft' : 'border-accent',
        className,
      )}
    >
      <Label rule tone="accent" className="items-center">
        <AlertIcon className="text-sm" />
        Lỗi
      </Label>
      <p className={cn('u-display-sm', tone === 'light' ? 'text-canvas' : 'text-ink')}>{title}</p>
      <p className={cn('max-w-[52ch] text-[0.9375rem] leading-relaxed', tone === 'light' ? 'text-canvas/55' : 'text-muted')}>
        {description}
      </p>
      {detail ? (
        <p className="max-w-full overflow-x-auto font-mono text-[0.6875rem] leading-relaxed text-muted/70">{detail}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  )
}
