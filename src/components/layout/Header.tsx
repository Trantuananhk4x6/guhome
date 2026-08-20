'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { gsap, registerGsap, ScrollTrigger } from '@/animations/gsap'
import { useLetterLift, useMagnetic } from '@/animations/interface'
import { Button } from '@/components/ui/Button'
import { useMotionFlag } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { BrandConfig, NavItem } from '@/types/content'

import { MobileMenu } from './MobileMenu'
import { groupNav } from './nav-fallback'

export interface HeaderProps {
  nav: NavItem[]
  brand: BrandConfig
  /**
   * Resolved URL of the brand mark, or null to set the name in type.
   *
   * Passed separately rather than added to `BrandConfig`, which stores
   * `logoMediaId` and lives in the frozen `@/types/content`. The id is resolved
   * to a URL server-side, so the client component never has to fetch it.
   */
  logo?: string | null
}

/** `/projects/tinh-vien` marks `/projects` active; `/` only matches exactly. */
function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

/**
 * One rail item, and the only place the bar's hierarchy is written.
 *
 * `lead` is set in the display serif at 17px against 11px uppercase labels: the
 * size AND the family carry the difference, so the rail states which door
 * matters instead of offering four identical ones. Both variants set
 * `leading-none` on purpose — it collapses each link to a box that ends ~1.5px
 * under its own baseline, whatever the family, which is what lets one `-bottom-2`
 * put every hover rule in the bar on a single level.
 */
function NavLink({
  item,
  variant,
  pathname,
}: {
  item: NavItem
  variant: 'lead' | 'rest'
  pathname: string
}) {
  const active = isActive(pathname, item.href)
  const lead = variant === 'lead'

  return (
    <Link
      href={item.href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        // `leading-none` trails the font size in BOTH branches, never sits in
        // the shared base: tailwind-merge drops a `leading-*` written before a
        // `text-[...]`, and it did — the served lead link carried the body's 1.6
        // while the labels beside it carried 1, which is exactly the mismatch
        // that put their two hover rules at different depths.
        'group/nav relative inline-flex items-baseline text-current transition-opacity duration-500 ease-editorial',
        lead
          ? 'font-display text-[1.0625rem] leading-none tracking-[-0.01em] opacity-100'
          : 'u-label leading-none text-current',
        !lead &&
          (active
            ? 'opacity-100'
            : // 70%, not the 60% this bar used to run: ink at 60% over canvas
              // measures 4.34:1 and at 55% it is 3.73:1 — both under AA for
              // 11px type. At 70% it is 6.4:1 and the rail still reads as the
              // quiet register, because the hierarchy here is carried by size
              // and family (17px serif against 11px caps), not by fading text
              // until it is hard to read. Canvas ink on a photograph needs a
              // little more presence than the same label on flat limestone.
              'opacity-70 hover:opacity-100 group-data-[mode=dark]/hdr:opacity-85 group-data-[mode=dark]/hdr:hover:opacity-100'),
      )}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-2 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-editorial',
          active ? 'scale-x-100' : 'scale-x-0 group-hover/nav:scale-x-100 group-focus-visible/nav:scale-x-100',
        )}
      />
    </Link>
  )
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
 *
 * COMPOSITION. Six evenly-spaced links centred between a wordmark and a button
 * is the default arrangement of every generated agency site, and it says the six
 * destinations are equal when they are nothing like it. This bar is a masthead
 * instead, built on three ideas:
 *
 * ONE AXIS. Every mark in the bar hangs off a single baseline — the wordmark,
 * `Dự án`, the three labels, the mobile trigger. The outer row still centres
 * that group inside its own height, so the inner row is baseline-aligned and the
 * outer one is not; do not collapse the two, or the masthead sticks to the top
 * of the bar instead of sitting in it.
 *
 * ONE RULE LEVEL. The spine crossing the middle, every nav hover rule and the
 * `Liên hệ` underline all sit ~9px under that shared baseline, so the bar reads
 * as one ruled line with type strung along it rather than four unrelated
 * hairlines. The `translate-y` on the spine is what tunes it to the underline
 * button's own rule depth.
 *
 * FOUR REGISTERS, NOT SIX ROWS. `Trang chủ` rides the wordmark (the way back
 * belongs on the mark, which is the rule `groupNav` states and the mobile sheet
 * already follows); the wordmark is the largest thing in the bar because a
 * masthead's mark outranks its menu; `Dự án` leads the rail in display serif;
 * the reading destinations cluster tighter beside it at label size, so the
 * spacing itself says which of the four is not like the others; and `Liên hệ` is
 * lifted out of the list entirely, past an accent tick — the one place colour is
 * safe on a bar that has to invert over a photograph. Roles are matched by path,
 * so renaming or reordering rows in the admin editor keeps their weight and
 * every row the editor publishes still renders somewhere.
 */
export function Header({ nav, brand, logo = null }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const markRef = useRef<HTMLSpanElement>(null)
  useLetterLift(markRef)
  const ctaRef = useRef<HTMLSpanElement>(null)
  useMagnetic(ctaRef)
  const [menuRoute, setMenuRoute] = useState(pathname)
  const menuOpenRef = useRef(false)

  const { home, lead, rest, contact } = groupNav(nav)

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

  const homeHref = home?.href ?? '/'
  const homeActive = isActive(pathname, homeHref)

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
          className="u-scrim-t pointer-events-none absolute inset-x-0 top-0 h-40 opacity-0 transition-opacity duration-700 ease-editorial group-data-[scrim=on]/hdr:opacity-100"
        />

        {/*
          The outer row owns the bar's height and centres what is inside it; the
          inner row owns the axis. Splitting them is not cosmetic — a
          baseline-aligned flex container has no cross-axis centre to align to,
          so putting `items-baseline` on a row with an explicit height parks the
          whole masthead against the top edge of the bar.

          The bar condenses once it has a ground of its own. 96 → 76px is the
          same move a printed masthead makes when it becomes a running head: the
          full mark on the page you arrive at, a tighter one on every page you
          scroll through.
        */}
        <div
          className={cn(
            'u-gutter relative flex h-20 items-center transition-[height] duration-700 ease-editorial md:h-24',
            'md:group-data-[solid=true]/hdr:h-[4.75rem]',
          )}
        >
          <div className="flex w-full items-baseline gap-x-5 md:gap-x-6 lg:gap-x-8">
            {/*
              The mark carries the way home. `Trang chủ` is a row the admin owns
              and it keeps its label in the accessible name and in the mobile
              sheet — it simply does not need a sixth identical tab pointing at
              the page the wordmark already points at.

              22px against the rail's 17px serif and 11px caps: the mark is the
              largest thing in the bar, which it was not before. Tracking comes
              DOWN as the size goes up (0.2em → 0.16em) because letterspacing is
              an optical correction, not a style — the wider the letters, the
              less air they need between them.
            */}
            <Link
              href={homeHref}
              aria-current={homeActive ? 'page' : undefined}
              aria-label={`${brand.companyName} — ${home?.label ?? 'Trang chủ'}`}
              className="shrink-0 font-display text-[1.1875rem] font-normal uppercase leading-none tracking-[0.16em] transition-opacity duration-500 hover:opacity-60 md:text-[1.25rem] lg:text-[1.375rem]"
            >
              {/*
                The drawn mark when the brand has one, the wordmark set in type
                when it does not — `logoMediaId` was settable in the admin and
                rendered nowhere, so a logo uploaded there simply never appeared.
                The image is the house mark only, not the full lockup: the
                lockup stacks mark over wordmark and would be ~90px tall in a
                64px masthead.

                Height in `em` rather than px so it tracks the responsive type
                scale beside it, and `priority` because this is above the fold on
                every route.
              */}
              {logo ? (
                <Image
                  src={logo}
                  alt={brand.companyName}
                  width={512}
                  height={512}
                  priority
                  className="h-[2.9em] w-auto md:h-[3.1em]"
                />
              ) : (
                /*
                  The one place on the site worth splitting into glyphs.
                  Splitting is a real cost — a span per letter, and the DOM has
                  to be put back on unmount — so it is spent on the mark rather
                  than on any sentence. `useLetterLift` restores the text and
                  keeps an aria-label, so assistive tech still hears one word.
                */
                <span ref={markRef}>{brand.companyName}</span>
              )}
            </Link>

            {/*
              The spine. It fills the void six centred links used to float in and
              ties the mark to the rail on one line — set ~9px under the shared
              baseline so it lands at the same depth as every hover rule and the
              `Liên hệ` underline, rather than crossing the type at its optical
              middle the way a divider would.

              `flex-1` with no minimum on purpose: this is the only elastic item
              in a row of `shrink-0` blocks, so at the tightest breakpoint it
              yields to the type instead of pushing the conversion off the edge.
              A rule that shortens is right; a rail that overflows is not.
            */}
            <span
              aria-hidden="true"
              className="hidden h-px min-w-0 flex-1 translate-y-[9px] self-baseline bg-current opacity-20 md:block"
            />

            <nav
              aria-label="Điều hướng chính"
              className="hidden shrink-0 items-baseline gap-x-8 md:flex lg:gap-x-12"
            >
              {/*
                `groupNav` pulls Trang chủ onto the wordmark, on the reasoning
                that a logo already IS the way home. The client asked for it back
                in the list — a visitor who does not know that convention has no
                visible way home — so it renders here as a `rest` weight: present,
                but not competing with Dự án for the eye.
              */}
              {home ? <NavLink item={home} variant="rest" pathname={pathname} /> : null}
              {lead ? <NavLink item={lead} variant="lead" pathname={pathname} /> : null}
              {/*
                The three reading destinations cluster at half the gap that
                separates them from `Dự án`, so the rail is read as one lead and
                a group rather than as four equal tabs. Rendered only when the
                editor has published something for it — an empty span would leave
                the lead sitting against a 48px gap and nothing after it.
              */}
              {rest.length > 0 ? (
                <span className="flex items-baseline gap-x-5 lg:gap-x-7">
                  {rest.map((item) => (
                    <NavLink key={item.id} item={item} variant="rest" pathname={pathname} />
                  ))}
                </span>
              ) : null}
            </nav>

            {contact ? (
              /*
                The conversion, lifted out of the list and marked by the one
                piece of colour in the bar: a 1px accent stroke, which carries no
                contrast requirement of its own and so survives the inversion
                over a photograph where accent-coloured 11px type would fall
                under the floor. It is the wrapper's own left border rather than
                a tick element, for two reasons — it then runs exactly from the
                cap height down to the button's underline, and the wrapper's
                first flex item stays the button, so this block's baseline is the
                word `Liên hệ` and it lands on the masthead's axis. A separate
                empty span would have become the first item, and a box with no
                text baselines at its bottom edge: the whole block would have
                hung below the line it is supposed to sit on.
              */
              <div className="hidden shrink-0 items-baseline border-l border-accent pl-5 md:flex lg:pl-7">
                {/*
                  The magnetic pull goes on a wrapper, not on `Button`: Button is
                  a server-safe component used on nearly every page, and giving it
                  a hook would pull the whole UI kit into the client bundle to
                  animate one control. Transforming the wrapper moves the button
                  just the same. This is also the ONLY magnetic element on the
                  site — on every button it would be a tic; on one, it reads as
                  that button being the important one.
                */}
                <span ref={ctaRef} className="inline-block will-change-transform">
                <Button
                  href={contact.href}
                  variant="underline"
                  size="sm"
                  tone="ink"
                  withArrow
                  aria-current={isActive(pathname, contact.href) ? 'page' : undefined}
                  className="text-current"
                >
                  {contact.label}
                </Button>
                </span>
              </div>
            ) : null}

            {/*
              Centred rather than baseline-aligned: the trigger's first line box
              contains an icon, not text, so its synthesized baseline would drag
              the whole mobile row off the mark's.
            */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="an-mobile-menu"
              className="u-label ml-auto flex items-center gap-3 self-center text-current md:hidden"
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
