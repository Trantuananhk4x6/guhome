'use client'

/**
 * Thin client wrappers so /studio can stay a server component and still use the
 * studio motion vocabulary. Contract: ARCHITECTURE §6.3.
 */

import { useRef, type ReactNode } from 'react'

import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import type { RevealVariant } from '@/types/content'

export interface RevealProps {
  variant?: RevealVariant
  delay?: number
  /** Seconds between `[data-reveal-item]` children. */
  stagger?: number
  className?: string
  children: ReactNode
}

export function Reveal({ variant = 'revealUp', delay = 0, stagger, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useReveal(ref, { variant, delay, stagger })

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  )
}

export interface TextRevealProps {
  as?: 'h1' | 'h2' | 'p' | 'div'
  by?: 'line' | 'word'
  delay?: number
  className?: string
  id?: string
  children: ReactNode
}

/** Splits its own text and reveals it line by line. */
export function TextReveal({
  as: Tag = 'h2',
  by = 'line',
  delay = 0,
  className,
  id,
  children,
}: TextRevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  useTextReveal(ref, { by, delay })

  const setRef = (node: HTMLElement | null): void => {
    ref.current = node
  }

  return (
    <Tag id={id} ref={setRef} data-reveal className={className}>
      {children}
    </Tag>
  )
}
