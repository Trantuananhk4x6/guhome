'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { gsap, registerGsap } from '@/animations/gsap'
import { useLenis } from '@/animations/scroll'
import { ArrowRightIcon, ArrowUpRightIcon, CloseIcon } from '@/components/ui/icons'
import { useMotionFlag } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { BrandConfig, NavItem } from '@/types/content'

import { groupNav, isLeadProjects } from './nav-fallback'

export interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
  nav: NavItem[]
  brand: BrandConfig
}

/**
 * The sheet slides over photographs, so it is limestone paper rather than the
 * usual black overlay, and the rows are weighted instead of stacked: the
 * wordmark carries `Trang chủ`, `Dự án` gets display size and a line of copy,
 * the reading pages sit on hairlines beneath it, and `Liên hệ` owns the
 * espresso block at the foot with the address and the two ways to reach a
 * human. GSAP rather than framer-motion, because this ships on the homepage
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

  const { home, lead, rest, contact } = groupNav(nav)
  const tel = `tel:${brand.phone.replace(/\s+/g, '')}`

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
      <div
        data-menu-panel
        className="flex h-full w-full flex-col overflow-y-auto overscroll-contain bg-canvas text-ink"
      >
        <div className="u-gutter flex h-20 shrink-0 items-center justify-between border-b border-line">
          <Link
            href={home?.href ?? '/'}
            onClick={onClose}
            aria-label={`${brand.companyName} — ${home?.label ?? 'Trang chủ'}`}
            className="group flex flex-col gap-1.5"
          >
            <span className="font-display text-sm uppercase leading-none tracking-[0.2em] transition-colors duration-500 group-hover:text-accent">
              {brand.companyName}
            </span>
            {home ? <span className="u-label text-[0.625rem] text-muted">{home.label}</span> : null}
          </Link>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="u-label flex items-center gap-3 text-muted transition-colors duration-300 hover:text-ink"
          >
            Đóng
            <CloseIcon className="text-lg" />
          </button>
        </div>

        <nav aria-label="Điều hướng chính" className="u-gutter flex flex-col">
          {lead ? (
            <span className="block overflow-hidden">
              <Link
                data-menu-item
                href={lead.href}
                onClick={onClose}
                className="group block pb-8 pt-8 text-ink transition-colors duration-500 hover:text-accent"
              >
                <span className="flex items-center gap-4">
                  <span className="font-display text-[2.625rem] leading-[1.06]">{lead.label}</span>
                  <ArrowUpRightIcon className="mt-1 text-xl text-accent transition-transform duration-500 ease-editorial group-hover:translate-x-1" />
                </span>
                {isLeadProjects(lead) ? (
                  <span className="mt-3 block max-w-[30ch] text-[0.875rem] leading-relaxed text-muted">
                    Căn hộ mới bàn giao, nhà phố một mặt tiền, quán ăn và spa — gần như tất cả ở Sài Gòn.
                  </span>
                ) : null}
              </Link>
            </span>
          ) : null}

          {rest.map((item) => (
            <span key={item.id} className="block overflow-hidden border-t border-line">
              <Link
                data-menu-item
                href={item.href}
                onClick={onClose}
                className="group flex items-center justify-between gap-4 py-4 text-ink transition-colors duration-500 hover:text-accent"
              >
                <span className="font-display text-[1.5rem] leading-none">{item.label}</span>
                <ArrowRightIcon className="text-base text-muted/45 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            </span>
          ))}
        </nav>

        <div data-menu-foot className="mt-auto bg-espresso text-canvas">
          <div className="u-gutter flex flex-col gap-6 pb-9 pt-8">
            {contact ? (
              <Link
                href={contact.href}
                onClick={onClose}
                className="group flex items-center justify-between gap-4 border-b border-canvas/20 pb-5 transition-colors duration-500 hover:border-accent-soft"
              >
                <span className="font-display text-[2rem] leading-none transition-colors duration-500 group-hover:text-accent-soft">
                  {contact.label}
                </span>
                <ArrowUpRightIcon className="text-xl text-canvas/45 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-accent-soft" />
              </Link>
            ) : null}

            <p className="max-w-[32ch] text-[0.875rem] leading-relaxed text-canvas/60">
              Đã có mặt bằng bàn giao thì gửi kèm luôn khi nhắn — đỡ được một vòng hỏi lại.
            </p>

            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${brand.email}`}
                className="text-[1.0625rem] text-canvas transition-colors duration-500 hover:text-accent-soft"
              >
                {brand.email}
              </a>
              <a
                href={tel}
                className="text-[1.0625rem] text-canvas transition-colors duration-500 hover:text-accent-soft"
              >
                {brand.phone}
              </a>
              <p className="text-[0.875rem] text-canvas/45">{brand.address}</p>
            </div>

            {/* Four labels are 309px of type in a 335px row at 390 wide, so a single
                line always drops one name onto a second row. Two columns on purpose. */}
            {brand.social.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-canvas/12 pt-6">
                {brand.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="u-label w-fit text-canvas/55 transition-colors duration-300 hover:text-accent-soft"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
