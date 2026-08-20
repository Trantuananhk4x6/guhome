'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { gsap, registerGsap, ScrollTrigger } from '@/animations/gsap'
import { Button } from '@/components/ui/Button'
import { useMotionFlag } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { BrandConfig, NavItem } from '@/types/content'

import { MobileMenu } from './MobileMenu'

export interface HeaderProps {
  nav: NavItem[]
  brand: BrandConfig
}

/** `/projects/tinh-vien` marks `/projects` active; `/` only matches exactly. */
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * Transparent + inverted for as long as a dark hero is actually behind the bar,
 * then canvas + blur + hairline once that hero has scrolled past. Hides on
 * scroll-down, reveals on scroll-up. All of it is driven by one ScrollTrigger
 * writing DOM attributes — never React state per scroll tick.
 *
 * A page opts into the light-over-hero treatment by marking its hero with
 * `data-hero-tone="dark"`; a soft top scrim rides with that mode so the nav is
 * legible over any photograph, however bright the frame under it happens to be.
 */
export function Header({ nav, brand }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuRoute, setMenuRoute] = useState(pathname)
  const menuOpenRef = useRef(false)

  // A route change closes the menu. Adjusting state during render — React's
  // documented pattern for "derive from a prop that changed" — closes it in the
  // same commit as the new route instead of one cascading render later.
  if (menuRoute !== pathname) {
    setMenuRoute(pathname)
    setMenuOpen(false)
  }

  // Reactive, not a store snapshot: a snapshot read inside the effect below is
  // captured before `ScrollProvider` (an ancestor) publishes the OS
  // `prefers-reduced-motion` value, so reduced-motion visitors would keep the
  // hide-on-scroll header forever. Re-arming on change is safe — the cleanup
  // reverts the context and parks the header at `yPercent: 0`.
  const canHide = useMotionFlag('enabled')

  useEffect(() => {
    menuOpenRef.current = menuOpen
    if (menuOpen && headerRef.current) gsap.set(headerRef.current, { yPercent: 0 })
  }, [menuOpen])

  useEffect(() => {
    registerGsap()
    const el = headerRef.current
    if (!el) return

    // Resolved lazily and re-resolved when it detaches, never snapshotted: with
    // streaming SSR the layout hydrates before the routed page's HTML exists, so
    // a single query at mount finds nothing and the header would stay inked over
    // a dark hero — invisible on the most important frame of the site.
    let tone: HTMLElement | null = null
    const toneElement = (): HTMLElement | null => {
      if (tone !== null && tone.isConnected) return tone
      tone = document.querySelector<HTMLElement>('[data-hero-tone="dark"]')
      return tone
    }

    let hidden = false

    const paint = (scroll: number) => {
      const hero = toneElement()
      // Measured, not assumed: the header inverts only while the dark hero is
      // genuinely behind the bar, and inks itself the moment that hero's bottom
      // edge passes above it.
      const overHero = hero !== null && hero.getBoundingClientRect().bottom > el.offsetHeight * 0.75
      // Once the page has moved at all, the header needs a ground of its own —
      // otherwise it floats over whatever the hero's own display type has
      // scrolled up into it. The ground takes the tone of what is behind it:
      // espresso over the hero, canvas everywhere else.
      const rail = scroll > 24
      el.dataset.mode = overHero ? 'dark' : 'light'
      el.dataset.solid = rail ? 'true' : 'false'
      el.dataset.scrim = overHero && !rail ? 'on' : 'off'
    }

    paint(window.scrollY)

    let queued = false
    const repaint = () => {
      if (queued) return
      queued = true
      window.requestAnimationFrame(() => {
        queued = false
        paint(window.scrollY)
      })
    }

    // Watch for the hero landing after hydration, then stop — one rAF-throttled
    // repaint per mutation burst, and nothing at all once the tone is known.
    const watcher = new MutationObserver(() => {
      repaint()
      if (tone !== null) watcher.disconnect()
    })
    watcher.observe(document.body, { childList: true, subtree: true })
    // Generous, because a cold dev compile can stream the page in seconds after
    // the shell; the watcher is idle work until then and stops the moment the
    // hero appears.
    const stopWatching = window.setTimeout(() => watcher.disconnect(), 15000)
    window.addEventListener('resize', repaint)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const scroll = self.scroll()
          paint(scroll)
          if (!canHide) return
          const shouldHide = self.direction === 1 && scroll > 260 && !menuOpenRef.current
          if (shouldHide === hidden) return
          hidden = shouldHide
          gsap.to(el, {
            yPercent: shouldHide ? -100 : 0,
            duration: shouldHide ? 0.45 : 0.55,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        },
      })
    })

    return () => {
      watcher.disconnect()
      window.clearTimeout(stopWatching)
      window.removeEventListener('resize', repaint)
      ctx.revert()
      // The hide tween is created inside a ScrollTrigger callback, so the
      // context never owns it — reset it by hand or a route change can leave
      // the header parked off-screen.
      gsap.killTweensOf(el)
      gsap.set(el, { yPercent: 0 })
    }
  }, [pathname, canHide])

  return (
    <>
      <header
        ref={headerRef}
        data-solid="false"
        data-mode="light"
        data-scrim="off"
        className={cn(
          'group/hdr fixed inset-x-0 top-0 z-50 text-ink will-change-transform',
          'transition-colors duration-700 ease-editorial',
          'data-[mode=dark]:text-canvas',
          'data-[solid=true]:backdrop-blur-md',
          'data-[mode=light]:data-[solid=true]:bg-canvas/85',
          'data-[mode=dark]:data-[solid=true]:bg-espresso/80',
        )}
      >
        {/*
          The one gradient on the site, and it earns its place: over a full-bleed
          photograph nothing else guarantees the nav stays readable at every
          scroll position. Kept shallow and short so it reads as the top of a
          frame, never as a bar.
        */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-0 transition-opacity duration-700 ease-editorial group-data-[scrim=on]/hdr:opacity-100"
          style={{
            background:
              'linear-gradient(to bottom, color-mix(in srgb, var(--c-espresso) 44%, transparent) 0%, color-mix(in srgb, var(--c-espresso) 20%, transparent) 45%, transparent 100%)',
          }}
        />

        <div className="u-gutter relative flex h-20 items-center justify-between gap-8 md:h-24">
          <Link
            href="/"
            aria-label={`${brand.companyName} — trang chủ`}
            className="font-display text-base font-light uppercase leading-none tracking-[0.38em] transition-opacity duration-500 hover:opacity-60 md:text-lg"
          >
            {brand.companyName}
          </Link>

          <nav aria-label="Điều hướng chính" className="hidden items-center gap-10 md:flex">
            {nav.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'u-label relative inline-flex items-center text-current transition-opacity duration-500',
                    // Canvas ink on a photograph needs more presence than the
                    // same label sitting on a flat limestone page.
                    active
                      ? 'opacity-100'
                      : 'opacity-60 hover:opacity-100 group-data-[mode=dark]/hdr:opacity-80 group-data-[mode=dark]/hdr:hover:opacity-100',
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -bottom-2 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-editorial',
                      active ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-6">
            <Button
              href="/contact"
              variant="underline"
              size="sm"
              tone="ink"
              withArrow
              className="hidden text-current lg:inline-flex"
            >
              Đặt hẹn tư vấn
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="an-mobile-menu"
              className="u-label flex items-center gap-3 text-current md:hidden"
            >
              <span aria-hidden="true" className="flex h-3 w-6 flex-col justify-between">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
              Menu
            </button>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line opacity-0 transition-opacity duration-700 group-data-[mode=dark]/hdr:bg-canvas/15 group-data-[solid=true]/hdr:opacity-100"
        />
      </header>

      <MobileMenu id="an-mobile-menu" open={menuOpen} onClose={() => setMenuOpen(false)} nav={nav} brand={brand} />
    </>
  )
}
