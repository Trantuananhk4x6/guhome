'use client'

import { useRef, type Ref } from 'react'

import { useRuleDraw } from '@/animations/interface'
import { cn } from '@/lib/utils'

export type RuleTone = 'line' | 'accent' | 'ink' | 'light'

export interface RuleProps {
  orientation?: 'horizontal' | 'vertical'
  tone?: RuleTone
  /**
   * Draw the line from one end as it enters view instead of having it simply be
   * there. Opt-in: on a page of forty hairlines, forty of them drawing is a
   * light show. Reach for it on the rule that opens a section, not on the ones
   * separating rows inside it.
   */
  draw?: false | 'left' | 'right' | 'center'
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
export function Rule({
  orientation = 'horizontal',
  tone = 'line',
  draw = false,
  className,
  ref,
}: RuleProps) {
  const localRef = useRef<HTMLDivElement>(null)
  // The hook no-ops on `enabled: false`, so the rule stays a plain div in the
  // common case and this costs nothing but a ref.
  useRuleDraw(localRef, { enabled: draw !== false, origin: draw === false ? 'left' : draw })

  return (
    <div
      ref={(node) => {
        localRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      role="separator"
      aria-orientation={orientation}
      className={cn(orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', TONES[tone], className)}
    />
  )
}
