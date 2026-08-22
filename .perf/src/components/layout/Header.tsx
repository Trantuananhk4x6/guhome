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
 * `lead` used to be set in the display SERIF, mixed case, at 17px, against 11px
 * uppercase sans labels. The reasoning was that family plus size states which
 * door matters. In the rendered bar it does not read as hierarchy at all — one
 * serif word among five sans labels reads as a font that failed to load. A
 * hierarchy has to be legible AS a hierarchy, and a reader cannot tell "this is
 * the important one" from "this one is broken" when the only signal is that it
 * looks unlike its neighbours.
 *
 * So the rail is now one typographic system — same family, same case, same
 * tracking — and the lead is marked the way a printed index marks its first
 * entry: a little more size, full weight, and an accent rule that is always
 * drawn rather than waiting for a hover. Difference in degree, not in kind.
 *
 * Both variants keep `leading-none`, which collapses each link to a box ending
 * ~1.5px under its own baseline, so one `-bottom-2` puts every rule in the bar
 * on a single level.
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
        'group/nav u-label relative inline-flex items-baseline text-current transition-opacity duration-500 ease-editorial',
        lead
          ? 'text-[0.8125rem] leading-none font-semibold tracking-[0.14em] opacity-100'
          : 'leading-none text-current',
        !lead &&
          (active
            ? 'opacity-100'
            : // 78%, not the 60% this bar used to run: ink at 60% over canvas
              // measures 4.34:1 and at 55% it is 3.73:1, both under AA for 11px
              // type. The rail sits over PHOTOGRAPHY, not flat limestone, so it
              // needs more presence than a page label — and now that the lead is
              // marked by weight and an always-drawn rule rather than by a
              // different typeface, the quiet register no longer has to be quiet
              // enough to get out of its way.
              'opacity-78 hover:opacity-100 group-data-[mode=dark]/hdr:opacity-90 group-data-[mode=dark]/hdr:hover:opacity-100'),
      )}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={cn(
          'absolute -bottom-2 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-editorial',
          // The lead carries its rule permanently — that, plus half a step of
          // size and weight, is the whole hierarchy now. Everything else draws
          // one on hover, or when it is the page you are on.
          active || lead
            ? 'scale-x-100'
            : 'scale-x-0 group-hover/nav:scale-x-100 group-focus-visible/nav:scale-x-100',
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
  /** Latched ground state, so the threshold can have two edges. */
  const railRef = useRef(false)
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
      // Hysteresis, not a single threshold: a reader resting at exactly 24px —
      // or nudging a trackpad — would otherwise flip the ground on and off,
      // and each flip is a 700ms colour transition. Ground appears at 28px and
      // does not leave until 12px, so the two edges can never chatter.
      const rail = railRef.current ? scroll > 12 : scroll > 28
      railRef.current = rail
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

    /**
     * Watch for the hero landing after hydration.
     *
     * `tone !== null` is NOT the finish line, and stopping there was a real
     * defect: an element can be in the DOM a frame before it has layout, and a
     * hero with height 0 makes `overHero` false — so the bar inked itself dark
     * over a dark photograph and, with the watcher already disconnected, never
     * reconsidered. Measured on arrival: the first paint reported light, over a
     * hero that is dark.
     *
     * So the handover happens only once the hero is BOTH present and measured,
     * and a ResizeObserver takes over from there — the hero is `100svh`, and on
     * a phone that value changes when the address bar collapses.
     */
    let sizeWatcher: ResizeObserver | null = null
    const watcher = new MutationObserver(() => {
      repaint()
      const hero = toneElement()
      if (hero === null || hero.getBoundingClientRect().height <= 0) return
      watcher.disconnect()
      sizeWatcher = new ResizeObserver(repaint)
      sizeWatcher.observe(hero)
    })
    watcher.observe(document.body, { childList: true, subtree: true })
    // Generous, because a cold dev compile can stream the page in seconds after
    // the shell; the watcher is idle work until then and stops the moment the
    // hero appears.
    const stopWatching = window.setTimeout(() => watcher.disconnect(), 15000)
    // The server-rendered hero is usually already there; one extra pass after
    // layout settles catches it without waiting for a mutation that never comes.
    const settle = window.requestAnimationFrame(repaint)
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
      sizeWatcher?.disconnect()
      window.cancelAnimationFrame(settle)
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
          // 85% and 80% were chosen to keep a little of the photograph alive
          // behind the bar. Over a project index of full-bleed imagery that is
          // not restraint, it is an unresolved bar: the pictures read straight
          // through the nav and the labels sit on whatever happens to be under
          // them. A bar that has committed to being a bar is calmer than one
          // that is half there. The blur stays, so it still feels like glass
          // rather than a slab, and the hairline below gives it a real edge.
          'data-[solid=true]:backdrop-blur-xl',
          'data-[mode=light]:data-[solid=true]:bg-canvas/96',
          'data-[mode=dark]:data-[solid=true]:bg-espresso/94',
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
        {/*
          ONE height, in every state.

          The bar used to condense 96 → 76px on scroll, animated over 700ms. The
          intent was the move a printed masthead makes when it becomes a running
          head. What it actually does on screen: because the row is
          `items-baseline`, changing its height re-solves the baseline and EVERY
          element in the bar slides — measured, the nav moved 13px vertically
          each time the reader crossed 24px of scroll. Scroll down and back up
          near that threshold and the whole masthead swims. That is the layout
          breaking up as you scroll, and no amount of easing fixes it, because
          the movement is the feature.

          So the bar is now a constant. What changes on scroll is what SHOULD
          change: it gains a ground and a hairline. Nothing moves.
        */}
        <div className="u-gutter relative flex h-20 items-center md:h-[5.25rem]">
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

                2.5em, NOT 4.4em, and the number is measured rather than
                preferred. The row is baseline-aligned and an <img> baselines on
                its own bottom edge, so the mark's height sets the level of every
                rule in the bar: the nav underlines, the spine and the `Liên hệ`
                stroke all land ~9px under it. At 4.4em the mark was 97px inside
                a 76px scrolled bar — measured on /services at 1600 scrolled to
                1100 — so it was clipped 16px at the top, and it dragged the
                shared baseline to y=82 with the underlines at y=90, fourteen
                pixels BELOW the bar's own ground. That is why body copy reads
                straight through the nav glyphs on that frame: the labels are
                not behind a weak backdrop, they are outside the bar entirely.

                The ceiling is arithmetic. Centred in the 76px scrolled bar the
                baseline sits at (76 + h)/2 and the rules 8px under it, so the
                whole masthead is inside its ground only while h ≤ ~58px. 2.5em
                resolves to 47.5 / 50 / 55px across the three steps — still by
                far the largest mark in a bar of 11px labels, and now a mark the
                bar can actually contain.
              */}
              {logo ? (
                <Image
                  src={logo}
                  alt={brand.companyName}
                  width={960}
                  height={174}
                  priority
                  // The horizontal lockup — mark AND wordmark — composed from the
                  // supplied art rather than the art itself, which stacks them
                  // and would set the name at 12px in an 84px bar. Height in em
                  // so it tracks the responsive step beside it; `self-center`
                  // because an image in a baseline row sits on its BOTTOM edge,
                  // which would hang a 5.5:1 lockup below the nav's baseline.
                  className="h-[1.7em] w-auto self-center md:h-[1.8em]"
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

            {/*
              THE RAIL YIELDS BEFORE THE CONVERSION DOES. The row used to be a
              `flex-1` spine between two `shrink-0` blocks, which means the line
              has exactly one elastic pixel budget — the spine — and when that
              is spent the line overflows and `overflow-x: hidden` on <body>
              clips whatever is furthest right. Furthest right is `Liên hệ`.

              Measured at the tightest width the rail exists at: 768px, gutter
              4vw = 30.7px, so the row is 707px and the four blocks and their
              gaps came to 670px. Thirty-seven pixels of slack — three or four
              characters — on labels the admin can rename at will. `Bài viết` →
              `Nhật ký công trình` and the studio loses its conversion on every
              tablet.

              So the nav is now the elastic block instead: `min-w-0` lets it
              shrink past its content, `flex-wrap` means shrinking wraps the
              rail onto a second line rather than clipping it, and the spine
              still collapses first (basis 0 absorbs no shrink). Nothing is ever
              cut off, and the block that survives untouched is the one the site
              exists to deliver visitors to. The tightened md gaps below widen
              the slack that reaches that fallback from 37px to ~91px.
            */}
            <nav
              aria-label="Điều hướng chính"
              className="hidden min-w-0 flex-wrap items-baseline justify-end gap-x-6 gap-y-2 md:flex lg:gap-x-12"
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
                <span className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-2 lg:gap-x-7">
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-line opacity-0 transition-opacity duration-700 group-data-[mode=dark]/hdr:bg-canvas/25 group-data-[solid=true]/hdr:opacity-100"
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
