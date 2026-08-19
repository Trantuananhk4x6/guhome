import type { Ref } from 'react'

import { cn } from '@/lib/utils'

export type RuleTone = 'line' | 'accent' | 'ink' | 'light'

export interface RuleProps {
  orientation?: 'horizontal' | 'vertical'
  tone?: RuleTone
  className?: string
  ref?: Ref<HTMLDivElement>
}

const TONES: Record<RuleTone, string> = {
  line: 'bg-line',
  accent: 'bg-accent',
  ink: 'bg-ink',
  light: 'bg-canvas/20',
}

/** A 1px hairline. The only divider in the system. */
export function Rule({ orientation = 'horizontal', tone = 'line', className, ref }: RuleProps) {
  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', TONES[tone], className)}
    />
  )
}
