'use client'

/**
 * Masked line (or word) reveal for headings and lead paragraphs.
 *
 * ```tsx
 * <TextReveal as="h1" className="u-display">Không gian mang tính cách.</TextReveal>
 * ```
 * Keep the content plain text or inline elements — SplitText re-writes the
 * innerHTML, so block children inside will be flattened.
 */

import { createElement, useRef } from 'react'
import type { CSSProperties, JSX, ReactNode } from 'react'
import { useTextReveal } from '@/animations/text'

export type TextRevealTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div' | 'blockquote' | 'figcaption'

export interface TextRevealProps {
  children: ReactNode
  as?: TextRevealTag
  by?: 'line' | 'word'
  /** seconds */
  delay?: number
  /** seconds between pieces */
  stagger?: number
  start?: string
  once?: boolean
  /** seconds */
  duration?: number
  className?: string
  style?: CSSProperties
  id?: string
}

export function TextReveal(props: TextRevealProps): JSX.Element {
  const { children, as = 'p', className, style, id, by, delay, stagger, start, once, duration } = props

  const ref = useRef<HTMLElement>(null)
  useTextReveal(ref, { by, delay, stagger, start, once, duration })

  return createElement(as, { ref, className, style, id, 'data-reveal': '' }, children)
}
