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
 * Transparent over a dark hero, then canvas + blur + hairline once the page
 * scrolls. Hides on scroll-down, reveals on scroll-up. All of it is driven by
 * one ScrollTrigger writing DOM attributes — never React state per scroll tick.
 *
 * A page can opt into the light-over-hero treatment by marking its hero with
 * `data-hero-tone="dark"`.
 */
export function Header({ nav, brand }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuOpenRef = useRef(false)

  // Reactive, not a store snapshot: a snapshot read inside the effect below is
  // captured before `ScrollProvider` (an ancestor) publishes the OS
  // `prefers-reduced-motion` value, so reduced-motion visitors would keep the
  // hide-on-scroll header forever. Re-arming on change is safe — the cleanup
  // reverts the context and parks the header at `yPercent: 0`.
  const canHide = useMotionFlag('enabled')

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    menuOpenRef.current = menuOpen
    if (menuOpen && headerRef.current) gsap.set(headerRef.current, { yPercent: 0 })
  }, [menuOpen])

  useEffect(() => {
    registerGsap()
    const el = headerRef.current
    if (!el) return

    const heroDark = document.querySelector('[data-hero-tone="dark"]') !== null
    let hidden = false

    const paint = (scroll: number) => {
      const solid = scroll > 24
      el.dataset.solid = solid ? 'true' : 'false'
      el.dataset.mode = !solid && heroDark ? 'dark' : 'light'
    }

    paint(window.scrollY)

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
        className={cn(
          'group/hdr fixed inset-x-0 top-0 z-50 text-ink will-change-transform',
          'transition-colors duration-700 ease-editorial',
          'data-[mode=dark]:text-canvas',
          'data-[solid=true]:bg-canvas/85 data-[solid=true]:backdrop-blur-md',
        )}
      >
        <div className="u-gutter flex h-20 items-center justify-between gap-8 md:h-24">
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
                    active ? 'opacity-100' : 'opacity-60 hover:opacity-100',
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line opacity-0 transition-opacity duration-700 group-data-[solid=true]/hdr:opacity-100"
        />
      </header>

      <MobileMenu id="an-mobile-menu" open={menuOpen} onClose={() => setMenuOpen(false)} nav={nav} brand={brand} />
    </>
  )
}
