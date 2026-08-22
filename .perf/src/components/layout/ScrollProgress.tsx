'use client'

import { useEffect, useRef } from 'react'

import { gsap, registerGsap, ScrollTrigger } from '@/animations/gsap'

/** A 1px accent rule pinned to the top edge, scaled by document scroll. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    registerGsap()
    const bar = barRef.current
    if (!bar) return

    const setScale = gsap.quickSetter(bar, 'scaleX')

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => setScale(self.progress),
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px">
      <div ref={barRef} className="h-px w-full origin-left scale-x-0 bg-accent" />
    </div>
  )
}
