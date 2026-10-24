'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { gsap, registerGsap, ScrollTrigger } from '@/animations/gsap'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/ui/icons'
import { useMotionFlag } from '@/lib/motion'
import { useSocialModalStore } from '@/lib/social'
import { cn, pad2 } from '@/lib/utils'
import type { BrandConfig, NavItem } from '@/types/content'

import { MobileMenu } from './MobileMenu'
import { HEADER_SUBMENUS, normalizeHeaderNav, type HeaderSubmenuConfig } from './nav-fallback'

export interface HeaderProps {
  nav: NavItem[]
  brand: BrandConfig
  logo?: string | null
}

/** `/projects/tinh-vien` marks `/projects` active; `/` only matches exactly. */
export function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Adaptive vector architectural mark + wordmark for GuHomes.
 * Solves the dark-navy PNG invisibility over dark hero imagery (`data-mode="dark"`)
 * while staying razor-sharp at every DPI.
 */
export function GuHomesBrandMark({
  companyName,
  className,
}: {
  companyName: string
  className?: string
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      {/* Architectural Pitched-Roof & Window Monogram */}
      <svg
        viewBox="0 0 44 36"
        fill="none"
        aria-hidden="true"
        className="h-7 w-auto shrink-0 md:h-8"
      >
        {/* Outer architectural gable in currentColor (ink on light, alabaster on dark) */}
        <path
          d="M3 23L21.5 5L40 23"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 23V31H21.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Inner bronze-gold parallel roofline */}
        <path
          d="M11 23L21.5 12.5L32 23"
          className="stroke-accent group-data-[mode=dark]/hdr:stroke-[#D9B061]"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Warm sunlit window four-pane grid */}
        <rect
          x="18.2"
          y="20.2"
          width="2.6"
          height="2.6"
          rx="0.4"
          className="fill-accent group-data-[mode=dark]/hdr:fill-[#D9B061]"
        />
        <rect
          x="22.2"
          y="20.2"
          width="2.6"
          height="2.6"
          rx="0.4"
          className="fill-accent group-data-[mode=dark]/hdr:fill-[#D9B061]"
        />
        <rect
          x="18.2"
          y="24.2"
          width="2.6"
          height="2.6"
          rx="0.4"
          className="fill-accent group-data-[mode=dark]/hdr:fill-[#D9B061]"
        />
        <rect
          x="22.2"
          y="24.2"
          width="2.6"
          height="2.6"
          rx="0.4"
          className="fill-accent group-data-[mode=dark]/hdr:fill-[#D9B061]"
        />
      </svg>

      <span className="flex flex-col leading-none">
        <span className="flex items-baseline tracking-[-0.02em]" aria-label={companyName}>
          <span className="font-display text-[1.35rem] font-semibold text-current transition-colors duration-300 md:text-[1.5rem]">
            Gu
          </span>
          <span className="font-display text-[1.35rem] font-medium text-accent transition-colors duration-300 group-data-[mode=dark]/hdr:text-[#D9B061] md:text-[1.5rem]">
            Homes
          </span>
        </span>
        <span className="mt-0.5 font-mono text-[0.52rem] font-medium uppercase tracking-[0.22em] text-muted transition-colors duration-300 group-data-[mode=dark]/hdr:text-canvas/65">
          Architecture · Interior
        </span>
      </span>
    </span>
  )
}

function resolveSubmenuConfig(item: NavItem): HeaderSubmenuConfig | null {
  const curated = HEADER_SUBMENUS[item.href]
  if (curated) return curated

  if (item.children && item.children.length > 0) {
    return {
      eyebrow: `${item.label} · Chuyên mục`,
      title: item.label,
      viewAllLabel: `Xem toàn bộ ${item.label.toLowerCase()}`,
      viewAllHref: item.href,
      columns: [
        {
          heading: 'Danh mục chi tiết',
          items: item.children.map((child, idx) => ({
            id: child.id,
            label: child.label,
            href: child.href,
            badge: pad2(idx + 1),
          })),
        },
      ],
    }
  }

  return null
}

function DesktopSubmenuPanel({
  config,
  open,
  alignRight,
  onNavigate,
}: {
  config: HeaderSubmenuConfig
  open: boolean
  alignRight: boolean
  onNavigate: () => void
}) {
  const isTwoCol = config.columns.length > 1

  return (
    <div
      role="region"
      aria-label={config.title}
      className={cn(
        'absolute top-full z-50 pt-3 transition-all duration-250 ease-out',
        isTwoCol
          ? 'left-1/2 w-[42rem] -translate-x-1/2 xl:w-[46rem]'
          : alignRight
            ? 'right-0 w-[24.5rem] xl:w-[26rem]'
            : 'left-0 w-[24.5rem] xl:w-[26rem]',
        open
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-1.5 opacity-0',
      )}
    >
      <div
        className={cn(
          'overflow-hidden rounded-2xl border p-5 transition-colors duration-300',
          'border-line/90 bg-canvas/98 text-ink shadow-[0_24px_60px_rgba(24,22,20,0.14)] backdrop-blur-2xl',
          'group-data-[mode=dark]/hdr:border-canvas/15 group-data-[mode=dark]/hdr:bg-espresso/96 group-data-[mode=dark]/hdr:text-canvas group-data-[mode=dark]/hdr:shadow-[0_28px_70px_rgba(0,0,0,0.55)]',
        )}
      >
        {/* Top Eyebrow & View All Header */}
        <div className="flex items-baseline justify-between gap-4 border-b border-line/70 pb-3.5 group-data-[mode=dark]/hdr:border-canvas/12">
          <div>
            <p className="font-mono text-[0.62rem] font-medium uppercase tracking-[0.18em] text-accent group-data-[mode=dark]/hdr:text-[#D9B061]">
              {config.eyebrow}
            </p>
            <p className="mt-1 font-display text-[1.05rem] font-medium leading-snug text-current">
              {config.title}
            </p>
          </div>
          <Link
            href={config.viewAllHref}
            onClick={onNavigate}
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-line/80 bg-surface/60 px-3 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.14em] text-current/85 transition-colors hover:border-accent hover:text-accent group-data-[mode=dark]/hdr:border-canvas/20 group-data-[mode=dark]/hdr:bg-canvas/[0.06] group-data-[mode=dark]/hdr:hover:border-[#D9B061] group-data-[mode=dark]/hdr:hover:text-[#D9B061]"
          >
            <span>{config.viewAllLabel}</span>
            <ArrowUpRightIcon className="text-[0.65rem]" />
          </Link>
        </div>

        {/* Columns Grid */}
        <div
          className={cn(
            'mt-4 grid gap-5',
            isTwoCol ? 'grid-cols-2 divide-x divide-line/60 group-data-[mode=dark]/hdr:divide-canvas/10' : 'grid-cols-1',
          )}
        >
          {config.columns.map((col, colIdx) => (
            <div key={col.heading} className={cn(colIdx > 0 ? 'pl-5' : '')}>
              <p className="mb-2.5 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-muted group-data-[mode=dark]/hdr:text-canvas/55">
                {col.heading}
              </p>
              <ul className="space-y-1">
                {col.items.map((sub) => (
                  <li key={sub.id}>
                    <Link
                      href={sub.href}
                      onClick={onNavigate}
                      className={cn(
                        'group/sub flex items-start justify-between gap-3 rounded-xl px-2.5 py-2 transition-all duration-200',
                        'hover:bg-surface/90 group-data-[mode=dark]/hdr:hover:bg-canvas/[0.08]',
                      )}
                    >
                      <div className="flex min-w-0 items-start gap-2.5">
                        {sub.badge ? (
                          <span className="mt-0.5 inline-flex shrink-0 items-center justify-center rounded border border-accent/30 bg-accent/10 px-1.5 py-0.5 font-mono text-[0.58rem] font-semibold uppercase tracking-wider text-accent group-data-[mode=dark]/hdr:border-[#D9B061]/35 group-data-[mode=dark]/hdr:bg-[#D9B061]/15 group-data-[mode=dark]/hdr:text-[#D9B061]">
                            {sub.badge}
                          </span>
                        ) : null}
                        <div className="min-w-0">
                          <p className="truncate text-[0.8rem] font-medium leading-snug text-current transition-colors group-hover/sub:text-accent group-data-[mode=dark]/hdr:group-hover/sub:text-[#D9B061]">
                            {sub.label}
                          </p>
                          {sub.meta ? (
                            <p className="mt-0.5 truncate text-[0.68rem] leading-relaxed text-muted group-data-[mode=dark]/hdr:text-canvas/60">
                              {sub.meta}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <ArrowRightIcon className="mt-1 shrink-0 text-xs text-muted/40 transition-all duration-200 group-hover/sub:translate-x-0.5 group-hover/sub:text-accent group-data-[mode=dark]/hdr:text-canvas/35 group-data-[mode=dark]/hdr:group-hover/sub:text-[#D9B061]" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Optional Footer Bar */}
        {config.footerNote && config.footerActionLabel && config.footerActionHref ? (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-line/60 bg-surface/65 px-3.5 py-2.5 text-xs group-data-[mode=dark]/hdr:border-canvas/10 group-data-[mode=dark]/hdr:bg-canvas/[0.05]">
            <span className="text-[0.72rem] text-muted group-data-[mode=dark]/hdr:text-canvas/70">
              {config.footerNote}
            </span>
            <Link
              href={config.footerActionHref}
              onClick={onNavigate}
              className="inline-flex shrink-0 items-center gap-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-accent transition-colors hover:text-ink group-data-[mode=dark]/hdr:text-[#D9B061] group-data-[mode=dark]/hdr:hover:text-canvas"
            >
              <span>{config.footerActionLabel}</span>
              <ArrowRightIcon className="text-xs" />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function DesktopNavLink({
  item,
  index,
  total,
  pathname,
  openId,
  onOpen,
  onScheduleClose,
  onImmediateClose,
}: {
  item: NavItem
  index: number
  total: number
  pathname: string
  openId: string | null
  onOpen: (id: string) => void
  onScheduleClose: () => void
  onImmediateClose: () => void
}) {
  const active = isActive(pathname, item.href)
  const submenu = resolveSubmenuConfig(item)
  const isOpen = openId === item.id && submenu !== null
  const alignRight = index >= total - 3

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (submenu) onOpen(item.id)
      }}
      onMouseLeave={() => {
        if (submenu) onScheduleClose()
      }}
    >
      <Link
        href={item.href}
        aria-current={active ? 'page' : undefined}
        aria-haspopup={submenu ? 'true' : undefined}
        aria-expanded={submenu ? isOpen : undefined}
        onClick={onImmediateClose}
        onFocus={() => {
          if (submenu) onOpen(item.id)
        }}
        className={cn(
          'group/nav relative inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.11em] whitespace-nowrap transition-all duration-300 xl:px-3.5 xl:text-[0.75rem]',
          active
            ? 'bg-ink text-canvas shadow-xs group-data-[mode=dark]/hdr:bg-canvas group-data-[mode=dark]/hdr:text-espresso'
            : isOpen
              ? 'bg-ink/[0.08] text-current group-data-[mode=dark]/hdr:bg-canvas/15 group-data-[mode=dark]/hdr:text-canvas'
              : 'text-current/80 hover:bg-ink/[0.06] hover:text-current group-data-[mode=dark]/hdr:text-canvas/85 group-data-[mode=dark]/hdr:hover:bg-canvas/10 group-data-[mode=dark]/hdr:hover:text-canvas',
        )}
      >
        {active ? (
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-accent group-data-[mode=dark]/hdr:bg-accent"
          />
        ) : null}
        <span>{item.label}</span>
        {submenu ? (
          <svg
            viewBox="0 0 10 6"
            fill="none"
            aria-hidden="true"
            className={cn(
              'h-2 w-2.5 shrink-0 opacity-65 transition-transform duration-300',
              isOpen && 'rotate-180 opacity-100 text-accent group-data-[mode=dark]/hdr:text-[#D9B061]',
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
        ) : null}
        {!active ? (
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-x-3.5 bottom-1 h-px origin-left bg-accent transition-transform duration-300 ease-out',
              isOpen
                ? 'scale-x-100'
                : 'scale-x-0 group-hover/nav:scale-x-100 group-focus-visible/nav:scale-x-100',
            )}
          />
        ) : null}
      </Link>

      {submenu ? (
        <DesktopSubmenuPanel
          config={submenu}
          open={isOpen}
          alignRight={alignRight}
          onNavigate={onImmediateClose}
        />
      ) : null}
    </div>
  )
}

export function Header({ nav, brand, logo = null }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null)
  const closeTimerRef = useRef<number | null>(null)
  const [menuRoute, setMenuRoute] = useState(pathname)
  const menuOpenRef = useRef(false)
  const { openQuoteModal } = useQuickQuote()

  const { primary, contact } = normalizeHeaderNav(nav)

  const handleOpenSubmenu = (id: string) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpenSubmenuId(id)
  }

  const handleScheduleCloseSubmenu = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
    }
    closeTimerRef.current = window.setTimeout(() => {
      setOpenSubmenuId(null)
      closeTimerRef.current = null
    }, 140)
  }

  const handleImmediateCloseSubmenu = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setOpenSubmenuId(null)
  }

  if (menuRoute !== pathname) {
    setMenuRoute(pathname)
    setMenuOpen(false)
    setOpenSubmenuId(null)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenSubmenuId(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  const canHide = useMotionFlag('enabled')

  useEffect(() => {
    menuOpenRef.current = menuOpen
    if (menuOpen && headerRef.current) gsap.set(headerRef.current, { yPercent: 0 })
  }, [menuOpen])

  useEffect(() => {
    registerGsap()
    const el = headerRef.current
    if (!el) return

    // Cached geometry threshold — measured ONLY on mount / resize, NEVER inside the scroll loop.
    let heroThreshold = -1
    let railLatched = false
    let lastMode: 'dark' | 'light' | '' = ''
    let lastSolid: 'true' | 'false' | '' = ''
    let lastScrim: 'on' | 'off' | '' = ''
    let hidden = false

    const applyAttributes = (scroll: number) => {
      const overHero = heroThreshold > 0 && scroll < heroThreshold
      const rail = railLatched ? scroll > 12 : scroll > 28
      railLatched = rail

      const nextMode = overHero ? 'dark' : 'light'
      const nextSolid = rail ? 'true' : 'false'
      const nextScrim = overHero && !rail ? 'on' : 'off'

      if (nextMode !== lastMode) {
        lastMode = nextMode
        el.dataset.mode = nextMode
      }
      if (nextSolid !== lastSolid) {
        lastSolid = nextSolid
        el.dataset.solid = nextSolid
      }
      if (nextScrim !== lastScrim) {
        lastScrim = nextScrim
        el.dataset.scrim = nextScrim
      }
    }

    const measureHero = () => {
      const hero = document.querySelector<HTMLElement>('[data-hero-tone="dark"]')
      if (hero) {
        const rect = hero.getBoundingClientRect()
        const docBottom = rect.bottom + window.scrollY
        const hdrHeight = el.offsetHeight || 80
        heroThreshold = docBottom - hdrHeight * 0.75
      } else {
        heroThreshold = -1
      }
      applyAttributes(window.scrollY)
    }

    measureHero()
    const settleRaf = window.requestAnimationFrame(measureHero)
    const settleTimer = window.setTimeout(measureHero, 250)

    let sizeWatcher: ResizeObserver | null = null
    const heroEl = document.querySelector<HTMLElement>('[data-hero-tone="dark"]')
    if (heroEl && typeof ResizeObserver !== 'undefined') {
      sizeWatcher = new ResizeObserver(measureHero)
      sizeWatcher.observe(heroEl)
    }

    window.addEventListener('resize', measureHero, { passive: true })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const scroll = self.scroll()
          applyAttributes(scroll)
          if (!canHide) return
          const shouldHide = self.direction === 1 && scroll > 320 && !menuOpenRef.current
          if (shouldHide === hidden) return
          hidden = shouldHide
          gsap.to(el, {
            yPercent: shouldHide ? -100 : 0,
            duration: shouldHide ? 0.38 : 0.45,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        },
      })
    })

    return () => {
      sizeWatcher?.disconnect()
      window.cancelAnimationFrame(settleRaf)
      window.clearTimeout(settleTimer)
      window.removeEventListener('resize', measureHero)
      ctx.revert()
      gsap.killTweensOf(el)
      gsap.set(el, { yPercent: 0 })
    }
  }, [pathname, canHide])

  const homeActive = isActive(pathname, '/')
  const contactActive = isActive(pathname, contact.href)

  return (
    <>
      <header
        ref={headerRef}
        data-solid="false"
        data-mode="light"
        data-scrim="off"
        className={cn(
          'group/hdr fixed inset-x-0 top-0 z-50 text-ink will-change-transform',
          'transition-[background-color,color,border-color,box-shadow] duration-500 ease-editorial',
          'data-[mode=dark]:text-canvas',
          'data-[solid=true]:backdrop-blur-xl',
          'data-[mode=light]:data-[solid=true]:bg-canvas/95 data-[mode=light]:data-[solid=true]:shadow-[0_4px_30px_rgba(24,22,20,0.05)]',
          'data-[mode=dark]:data-[solid=true]:bg-espresso/92 data-[mode=dark]:data-[solid=true]:shadow-[0_4px_30px_rgba(0,0,0,0.28)]',
        )}
      >
        {/* Top reading scrim when floating over a dark hero photograph */}
        <span
          aria-hidden="true"
          className="u-scrim-t pointer-events-none absolute inset-x-0 top-0 h-32 opacity-0 transition-opacity duration-500 ease-editorial group-data-[scrim=on]/hdr:opacity-100"
        />

        <div className="u-gutter relative mx-auto flex h-[4.5rem] w-full max-w-[115rem] items-center justify-between gap-4 md:h-20">
          {/* 1. LEFT: Brand Identity Lockup */}
          <Link
            href="/"
            aria-current={homeActive ? 'page' : undefined}
            aria-label={`${brand.companyName} — Trang chủ`}
            className="group/logo relative z-10 flex shrink-0 items-center gap-3 py-1 transition-opacity duration-300 hover:opacity-85"
          >
            <GuHomesBrandMark companyName={brand.companyName} />
          </Link>

          {/* 2. CENTER: Floating Architectural Navigation Pill (Desktop lg+) */}
          <nav
            aria-label="Điều hướng chính"
            className={cn(
              'relative z-10 hidden items-center gap-0.5 rounded-full border px-2 py-1.5 transition-all duration-500 lg:flex xl:gap-1 xl:px-2.5',
              'border-line/80 bg-surface/75 shadow-[0_2px_20px_rgba(24,22,20,0.04)] backdrop-blur-md',
              'group-data-[mode=dark]/hdr:border-canvas/15 group-data-[mode=dark]/hdr:bg-espresso/60 group-data-[mode=dark]/hdr:shadow-[0_4px_24px_rgba(0,0,0,0.25)]',
            )}
          >
            {primary.map((item, index) => (
              <DesktopNavLink
                key={item.id}
                item={item}
                index={index}
                total={primary.length}
                pathname={pathname}
                openId={openSubmenuId}
                onOpen={handleOpenSubmenu}
                onScheduleClose={handleScheduleCloseSubmenu}
                onImmediateClose={handleImmediateCloseSubmenu}
              />
            ))}
          </nav>

          {/* 3. RIGHT: Conversion & Social/QR Cluster */}
          <div className="relative z-10 flex shrink-0 items-center gap-2 sm:gap-2.5">
            {/* QR & Social Channels Button */}
            <button
              type="button"
              onClick={() => useSocialModalStore.getState().openModal()}
              className={cn(
                ' hidden items-center gap-1.5 rounded-full border px-3 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer md:inline-flex',
                'border-line bg-surface/60 text-ink/85 hover:border-accent hover:text-accent',
                'group-data-[mode=dark]/hdr:border-canvas/20 group-data-[mode=dark]/hdr:bg-canvas/[0.07] group-data-[mode=dark]/hdr:text-canvas/90 group-data-[mode=dark]/hdr:hover:border-[#D9B061] group-data-[mode=dark]/hdr:hover:text-[#D9B061]',
              )}
              title="Xem các kênh mạng xã hội chính thức & quét mã QR"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="h-3.5 w-3.5 text-accent group-data-[mode=dark]/hdr:text-[#D9B061]"
              >
                <rect x="2" y="2" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
                <rect x="9" y="2" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
                <rect x="2" y="9" width="5" height="5" rx="0.8" stroke="currentColor" strokeWidth="1.4" />
                <path d="M9.5 9.5H11.5V11.5H9.5V9.5ZM12 12H14V14H12V12ZM9.5 12.5H11V14H9.5V12.5ZM12.5 9.5H14V11H12.5V9.5Z" fill="currentColor" />
              </svg>
              <span className="hidden 2xl:inline">Kênh &amp; QR</span>
              <span className="2xl:hidden">QR</span>
            </button>

            {/* Quick Quote Trigger on Desktop */}
            <button
              type="button"
              onClick={() => openQuoteModal()}
              className={cn(
                'hidden items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.1em] transition-all duration-300 cursor-pointer xl:inline-flex',
                'border-accent/45 bg-accent/10 text-ink hover:bg-accent hover:text-canvas',
                'group-data-[mode=dark]/hdr:border-[#D9B061]/50 group-data-[mode=dark]/hdr:bg-[#D9B061]/15 group-data-[mode=dark]/hdr:text-canvas group-data-[mode=dark]/hdr:hover:bg-[#D9B061] group-data-[mode=dark]/hdr:hover:text-espresso',
              )}
            >
              <span>Báo giá 15p</span>
            </button>

            {/* Primary Contact CTA Pill */}
            <Link
              href={contact.href}
              aria-current={contactActive ? 'page' : undefined}
              className={cn(
                'hidden items-center gap-1.5 rounded-full px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.11em] transition-all duration-300 md:inline-flex',
                'bg-ink text-canvas hover:bg-accent',
                'group-data-[mode=dark]/hdr:bg-canvas group-data-[mode=dark]/hdr:text-espresso group-data-[mode=dark]/hdr:hover:bg-[#D9B061]',
              )}
            >
              <span>{contact.label}</span>
              <ArrowUpRightIcon className="text-xs" />
            </Link>

            {/* Mobile & Tablet Menu Trigger (< lg) */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="an-mobile-menu"
              className={cn(
                'inline-flex items-center gap-2.5 rounded-full border px-3.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.14em] transition-all duration-300 lg:hidden',
                'border-line bg-surface/80 text-ink backdrop-blur-md hover:border-accent',
                'group-data-[mode=dark]/hdr:border-canvas/25 group-data-[mode=dark]/hdr:bg-espresso/60 group-data-[mode=dark]/hdr:text-canvas',
              )}
            >
              <span aria-hidden="true" className="flex h-2.5 w-4 flex-col justify-between">
                <span className="h-[1.5px] w-full rounded-full bg-current" />
                <span className="h-[1.5px] w-3/4 rounded-full bg-accent group-data-[mode=dark]/hdr:bg-[#D9B061]" />
              </span>
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Bottom Hairline Divider */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line/80 opacity-0 transition-opacity duration-500 group-data-[mode=dark]/hdr:bg-canvas/15 group-data-[solid=true]/hdr:opacity-100"
        />
      </header>

      <MobileMenu
        id="an-mobile-menu"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        nav={nav}
        brand={brand}
        logo={logo}
      />
    </>
  )
}
