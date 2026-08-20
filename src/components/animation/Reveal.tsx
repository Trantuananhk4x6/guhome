'use client'

/**
 * Declarative wrapper around `useReveal` so pages stay markup.
 *
 * ```tsx
 * <Reveal variant="revealUp" delay={0.1}>…</Reveal>
 * <Reveal as="ul" stagger={0.06}>{items.map(i => <li data-reveal-item key={i}/>)}</Reveal>
 * ```
 * The `data-reveal` attribute it emits is what the globals.css anti-flash rule
 * hooks onto; the hook releases it once GSAP owns the element.
 */

import { useCallback, useRef } from 'react'
import type { CSSProperties, JSX, ReactNode } from 'react'
import type { RevealVariant } from '@/types/content'
import { useReveal } from '@/animations/reveal'

export type RevealTag =
  | 'div'
  | 'section'
  | 'article'
  | 'aside'
  | 'header'
  | 'footer'
  | 'figure'
  | 'figcaption'
  | 'ul'
  | 'ol'
  | 'li'
  | 'span'
  | 'p'

export interface RevealProps {
  children: ReactNode
  as?: RevealTag
  variant?: RevealVariant
  /** seconds */
  delay?: number
  /** seconds between `data-reveal-item` children */
  stagger?: number
  start?: string
  once?: boolean
  /** raw px travel, before the global intensity dial */
  distance?: number
  /** seconds */
  duration?: number
  className?: string
  style?: CSSProperties
  id?: string
}

export function Reveal(props: RevealProps): JSX.Element {
  const {
    children,
    as = 'div',
    className,
    style,
    id,
    variant,
    delay,
    stagger,
    start,
    once,
    distance,
    duration,
  } = props

  const ref = useRef<HTMLElement>(null)
  useReveal(ref, { variant, delay, stagger, start, once, distance, duration })

  // A callback ref rather than the ref object itself. `<Tag>` over a union of
  // intrinsic tags types `ref` as an *intersection* of element types, which no
  // single `RefObject` satisfies — a callback is contravariant and does. It also
  // keeps the ref out of the render return value, which is what the React
  // Compiler wants to see.
  const attach = useCallback((node: HTMLElement | null): void => {
    ref.current = node
  }, [])

  const Tag = as
  return (
    <Tag ref={attach} className={className} style={style} id={id} data-reveal="">
      {children}
    </Tag>
  )
}
