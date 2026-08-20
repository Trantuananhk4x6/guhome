'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { gsap, registerGsap } from '@/animations/gsap'
import { useLenis } from '@/animations/scroll'
import { CloseIcon } from '@/components/ui/icons'
import { useMotionFlag } from '@/lib/motion'
import { cn, pad2 } from '@/lib/utils'
import type { BrandConfig, NavItem } from '@/types/content'

export interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
  nav: NavItem[]
  brand: BrandConfig
}

/**
 * Fullscreen espresso overlay with staggered items.
 * GSAP rather than framer-motion, because this ships on the homepage
 * (ARCHITECTURE §8) — and Lenis is stopped while it is open.
 */
export function MobileMenu({ id, open, onClose, nav, brand }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<ReturnType<typeof gsap.timeline> | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const openRef = useRef(open)
  const lenis = useLenis()

  // Reactive rather than a store snapshot: read once inside the effect below it
  // would be captured before `ScrollProvider` publishes the OS
  // `prefers-reduced-motion` value, and the timeline would keep animating.
  const canAnimate = useMotionFlag('enabled')

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    openRef.current = open
  }, [open])

  useEffect(() => {
    registerGsap()
    const root = rootRef.current
    if (!root) return

    const speed = canAnimate ? 1 : 0

    const ctx = gsap.context(() => {
      gsap.set(root, { autoAlpha: 0 })
      const timeline = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
      timeline
        .set(root, { autoAlpha: 1 })
        .fromTo(
          '[data-menu-panel]',
          { yPercent: -100 },
          { yPercent: 0, duration: 0.8 * speed, ease: 'expo.inOut' },
        )
        .fromTo(
          '[data-menu-item]',
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7 * speed, stagger: 0.055 * speed },
          `-=${0.35 * speed}`,
        )
        .fromTo('[data-menu-foot]', { opacity: 0 }, { opacity: 1, duration: 0.5 * speed }, `-=${0.25 * speed}`)
      // Rebuilt when the motion setting changes; the open/close effect below is
      // keyed on `open` alone, so re-sync the new timeline by hand.
      if (openRef.current) timeline.progress(1)
      timelineRef.current = timeline
    }, rootRef)

    return () => {
      timelineRef.current = null
      ctx.revert()
    }
  }, [canAnimate])

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return
    if (open) timeline.play()
    else timeline.reverse()
  }, [open])

  useEffect(() => {
    if (!open) return

    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    lenis?.stop()
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current()
    }
    document.addEventListener('keydown', onKeyDown)

    const frame = window.requestAnimationFrame(() => closeRef.current?.focus())

    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      lenis?.start()
      openerRef.current?.focus()
    }
  }, [open, lenis])

  return (
    <div
      ref={rootRef}
      id={id}
      aria-hidden={!open}
      inert={!open}
      className={cn(
        'invisible fixed inset-0 z-[95] opacity-0 md:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div data-menu-panel className="flex h-full w-full flex-col bg-espresso text-canvas">
        <div className="u-gutter flex h-20 shrink-0 items-center justify-between">
          <span className="font-display text-base font-light uppercase leading-none tracking-[0.38em]">
            {brand.companyName}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="u-label flex items-center gap-3 text-canvas/70 transition-colors duration-300 hover:text-canvas"
          >
            Đóng
            <CloseIcon className="text-lg" />
          </button>
        </div>

        <nav aria-label="Điều hướng chính" className="u-gutter flex flex-1 flex-col justify-center gap-1">
          {nav.map((item, index) => (
            <span key={item.id} className="block overflow-hidden py-1">
              <Link
                data-menu-item
                href={item.href}
                onClick={onClose}
                className="flex items-baseline gap-5 text-canvas transition-colors duration-500 hover:text-accent-soft"
              >
                <span className="u-label text-accent">{pad2(index + 1)}</span>
                <span className="u-display-sm">{item.label}</span>
              </Link>
            </span>
          ))}
        </nav>

        <div data-menu-foot className="u-gutter flex flex-col gap-5 pb-12 pt-10">
          <div className="h-px w-full bg-canvas/15" />
          <a
            href={`mailto:${brand.email}`}
            className="font-display text-2xl font-light text-canvas transition-colors duration-500 hover:text-accent-soft"
          >
            {brand.email}
          </a>
          <div className="u-label flex flex-col gap-1 text-canvas/50">
            <span>{brand.phone}</span>
            <span>{brand.address}</span>
          </div>
          {brand.social.length > 0 ? (
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              {brand.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="u-label text-canvas/60 transition-colors duration-300 hover:text-accent-soft"
                >
                  {social.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
