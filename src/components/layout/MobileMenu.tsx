'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { gsap, registerGsap } from '@/animations/gsap'
import { useLenis } from '@/animations/scroll'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { ArrowRightIcon, ArrowUpRightIcon, CloseIcon } from '@/components/ui/icons'
import { useMotionFlag } from '@/lib/motion'
import { useSocialModalStore } from '@/lib/social'
import { cn, pad2 } from '@/lib/utils'
import type { BrandConfig, NavItem } from '@/types/content'

import { GuHomesBrandMark, isActive } from './Header'
import { HEADER_SUBMENUS, normalizeHeaderNav } from './nav-fallback'

export interface MobileMenuProps {
  id: string
  open: boolean
  onClose: () => void
  nav: NavItem[]
  brand: BrandConfig
  logo?: string | null
}

const ROUTE_SUBTITLES: Record<string, string> = {
  '/': 'Không gian kiến trúc & nội thất khí hậu nhiệt đới',
  '/projects': 'Căn hộ, nhà phố, biệt thự & không gian thương mại tại Sài Gòn',
  '/phong-cach': 'Modern Luxury, Indochine, Wabi-Sabi, Tối giản & Đương đại',
  '/du-toan-chi-phi': 'Công cụ bóc tách chi phí thi công thực tế theo từng phòng',
  '/khu-vuc': 'Giải pháp vi khí hậu Thủ Thiêm, Thảo Điền, Phú Mỹ Hưng, Ba Son',
  '/studio': 'Triết lý thiết kế, xưởng mộc 1.200m² Thạnh Xuân & quy trình 4 bước',
  '/services': 'Thiết kế kiến trúc, thi công trọn gói & nội thất may đo',
  '/journal': 'Ghi chép thực tế từ công trường, vật liệu và đời sống',
}

export function MobileMenu({ id, open, onClose, nav, brand }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<ReturnType<typeof gsap.timeline> | null>(null)
  const openerRef = useRef<HTMLElement | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const onCloseRef = useRef(onClose)
  const openRef = useRef(open)
  const pathname = usePathname()
  const lenis = useLenis()
  const { openQuoteModal } = useQuickQuote()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const { primary, contact } = normalizeHeaderNav(nav)
  const tel = `tel:${brand.phone.replace(/\s+/g, '')}`
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
          { yPercent: 0, duration: 0.65 * speed, ease: 'expo.inOut' },
        )
        .fromTo(
          '[data-menu-item]',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 * speed, stagger: 0.04 * speed },
          `-=${0.3 * speed}`,
        )
        .fromTo(
          '[data-menu-foot]',
          { opacity: 0 },
          { opacity: 1, duration: 0.45 * speed },
          `-=${0.25 * speed}`,
        )
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
        'invisible fixed inset-0 z-[95] opacity-0 lg:hidden',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
    >
      <div
        data-menu-panel
        data-lenis-prevent
        className="flex h-full w-full flex-col overflow-y-auto overscroll-contain bg-canvas text-ink"
      >
        {/* Top Masthead Bar */}
        <div className="u-gutter flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line md:h-20">
          <Link
            href="/"
            onClick={onClose}
            aria-label={`${brand.companyName} — Trang chủ`}
            className="flex items-center"
          >
            <GuHomesBrandMark companyName={brand.companyName} />
          </Link>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            <span>Đóng</span>
            <CloseIcon className="text-base" />
          </button>
        </div>

        {/* Navigation List */}
        <nav aria-label="Điều hướng chính" className="u-gutter flex flex-col py-4">
          {primary.map((item, idx) => {
            const active = isActive(pathname, item.href)
            const subtitle = ROUTE_SUBTITLES[item.href]
            const submenu = HEADER_SUBMENUS[item.href]
            const isExpanded = expandedId === item.id

            return (
              <div key={item.id} className="border-b border-line/70 last:border-b-0">
                <div data-menu-item className="flex items-center justify-between gap-3 py-4">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'group flex min-w-0 flex-1 items-baseline gap-4 transition-colors duration-300',
                      active ? 'text-accent' : 'text-ink hover:text-accent',
                    )}
                  >
                    <span className="font-mono text-xs text-accent/80 tabular-nums">
                      {pad2(idx + 1)}
                    </span>
                    <div className="min-w-0">
                      <span className="font-display text-[1.45rem] leading-tight sm:text-[1.65rem]">
                        {item.label}
                      </span>
                      {subtitle ? (
                        <span className="mt-1 block text-xs leading-relaxed text-muted">
                          {subtitle}
                        </span>
                      ) : null}
                    </div>
                  </Link>

                  {submenu ? (
                    <button
                      type="button"
                      onClick={() => setExpandedId((prev) => (prev === item.id ? null : item.id))}
                      aria-expanded={isExpanded}
                      className={cn(
                        'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.65rem] font-medium uppercase tracking-wider transition-all duration-200',
                        isExpanded
                          ? 'border-accent bg-accent text-canvas'
                          : 'border-line bg-surface text-ink/80 hover:border-accent hover:text-accent',
                      )}
                    >
                      <span>{isExpanded ? 'Thu gọn' : 'Mục con'}</span>
                      <svg
                        viewBox="0 0 10 6"
                        fill="none"
                        aria-hidden="true"
                        className={cn(
                          'h-2 w-2.5 transition-transform duration-300',
                          isExpanded && 'rotate-180',
                        )}
                      >
                        <path
                          d="M1 1L5 5L9 1"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-label={item.label}
                      className="p-2 text-muted/60 hover:text-accent"
                    >
                      <ArrowRightIcon className="shrink-0 text-base" />
                    </Link>
                  )}
                </div>

                {submenu && isExpanded ? (
                  <div className="mb-4 ml-7 rounded-2xl border border-line/80 bg-surface/65 p-4">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {submenu.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="mb-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent">
                            {col.heading}
                          </p>
                          <ul className="space-y-1.5">
                            {col.items.map((sub) => (
                              <li key={sub.id}>
                                <Link
                                  href={sub.href}
                                  onClick={onClose}
                                  className="group/sub flex items-start justify-between gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-canvas"
                                >
                                  <div className="min-w-0">
                                    <p className="text-xs font-medium text-ink group-hover/sub:text-accent">
                                      {sub.label}
                                    </p>
                                    {sub.meta ? (
                                      <p className="mt-0.5 text-[0.68rem] text-muted">
                                        {sub.meta}
                                      </p>
                                    ) : null}
                                  </div>
                                  <ArrowRightIcon className="mt-1 shrink-0 text-xs text-muted/40 group-hover/sub:text-accent" />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            )
          })}
        </nav>

        {/* Bottom Espresso Conversion Block */}
        <div data-menu-foot className="mt-auto bg-espresso text-canvas">
          <div className="u-gutter flex flex-col gap-6 pb-9 pt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-canvas/15 pb-5">
              <Link
                href={contact.href}
                onClick={onClose}
                className="group flex items-center gap-3 transition-colors duration-300 hover:text-[#D9B061]"
              >
                <span className="font-display text-[1.75rem] leading-none">
                  {contact.label} tư vấn
                </span>
                <ArrowUpRightIcon className="text-lg text-[#D9B061] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => {
                  onClose()
                  openQuoteModal()
                }}
                className="rounded-full border border-[#D9B061]/50 bg-[#D9B061]/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#D9B061] transition-colors hover:bg-[#D9B061] hover:text-espresso"
              >
                Báo giá nhanh 15p
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <a
                  href={tel}
                  className="font-display text-lg text-canvas transition-colors hover:text-[#D9B061]"
                >
                  {brand.phone}
                </a>
                <a
                  href={`mailto:${brand.email}`}
                  className="text-sm text-canvas/75 transition-colors hover:text-[#D9B061]"
                >
                  {brand.email}
                </a>
                <p className="mt-1 text-xs leading-relaxed text-canvas/50">{brand.address}</p>
              </div>

              {brand.social.length > 0 ? (
                <div className="flex flex-col justify-between gap-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {brand.social.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        onClick={(e) => {
                          if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey && e.button === 0) {
                            e.preventDefault()
                            onClose()
                            useSocialModalStore.getState().openModal(social.label)
                          }
                        }}
                        className="u-label text-xs text-canvas/65 transition-colors hover:text-[#D9B061]"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      useSocialModalStore.getState().openModal()
                    }}
                    className="u-label w-fit text-left text-xs text-[#D9B061] transition-colors hover:text-canvas"
                  >
                    Mở mã QR &amp; Kênh kết nối →
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
