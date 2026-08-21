'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { useCameraScroll } from '@/animations/camera'
import { registerGsap, ScrollTrigger } from '@/animations/gsap'
import { useImageReveal } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { useReducedMotion } from '@/lib/motion'
import { supportsWebGL } from '@/lib/three/capability'
import { clamp, cn, formatArea, pad2 } from '@/lib/utils'
import type { MediaRef, ProjectSummary } from '@/types/content'

import { SectionImage } from './SectionImage'
import { BAND_T, BLEED_X, DISPLAY, DISPLAY_SM, SCRIM_B, SCRIM_T, SECTION_Y } from './composition'
import { sectionLines, sectionList, sectionText } from './content'
import type { HomeSectionProps } from './types'

const InteriorScene = dynamic(
  () => import('@/components/three/InteriorScene').then((mod) => mod.InteriorScene),
  { ssr: false },
)

/** At most this many stops, however many photographs the project turns out to have. */
const MAX_STAGES = 4

/**
 * WHAT A STOP IS ALLOWED TO BE CALLED.
 *
 * This band used to caption its four stills `Ngoại thất / Tiền sảnh / Phòng
 * khách / Chi tiết vật liệu` from a constant, because the database row carries
 * no `stages` key and never has. The stills are just `gallery[0..3]` in seed
 * order, so nothing tied a caption to its subject — and on the project this
 * band actually resolves to, all thirteen photographs live in one folder called
 * PHÒNG KHÁCH. Still 01, whose own alt text reads "Tầng tiếp khách nhà phố",
 * was captioned NGOẠI THẤT over a photograph of a sofa.
 *
 * That is not a copy problem, it is a caption asserting a fact about a picture
 * that the picture contradicts, and the library cannot fix it: **no project in
 * the catalogue has photographs in more than one folder** (checked — 0 of 105),
 * so there is no per-frame signal anywhere in the data that could name a room.
 *
 * So the band stops naming rooms it cannot see. In order of preference:
 *
 *   1. `content.stages` — an editor who knows the photographs may name them,
 *      and that override is now the only way a room name reaches this band.
 *   2. `media.caption` — per-frame, per-photograph, and the channel the caption
 *      backfill writes to. Empty across the library today; correct tomorrow.
 *   3. the project's own place line — its subtitle before the location, which is
 *      true of every frame it holds because they are all frames of that place.
 *
 * A stop label is never invented from position.
 */
function placeLine(project: ProjectSummary): string {
  const subtitle = project.subtitle?.split('·')[0]?.trim()
  if (subtitle && subtitle.length > 0) return subtitle
  if (project.categoryName) return project.categoryName
  return project.title
}

/** Pinning is a desktop-only, WebGL-only affordance. */
const WIDE_QUERY = '(min-width: 1024px)'

function subscribeWide(onChange: () => void): () => void {
  const query = window.matchMedia(WIDE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

/** `supportsWebGL()` memoises its probe, so reading this per render stays cheap. */
function readWide(): boolean {
  return window.matchMedia(WIDE_QUERY).matches && supportsWebGL()
}

function ProjectFacts({ project, tone }: { project: ProjectSummary; tone: 'light' | 'ink' }) {
  const facts: { term: string; value: string }[] = []
  if (project.location) facts.push({ term: 'Địa điểm', value: project.location })
  const area = formatArea(project.area)
  if (area) facts.push({ term: 'Diện tích', value: area })
  if (project.year) facts.push({ term: 'Năm', value: String(project.year) })
  if (project.style) facts.push({ term: 'Phong cách', value: project.style })

  return (
    // One shared two-row grid from `sm` up, not four independent flex columns:
    // `PHONG CÁCH` wraps to two lines at 1024 while ĐỊA ĐIỂM, DIỆN TÍCH and NĂM
    // do not, and four separate columns let its value drop a line below the
    // other three. `sm:contents` dissolves each pair into the dl so every term
    // shares row one and every value shares row two — see `MetaCell` in
    // FeaturedProjects, which carries the same row at the same breakpoints.
    <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-flow-col sm:grid-cols-4 sm:grid-rows-[auto_auto] sm:gap-y-1.5">
      {facts.map((fact) => (
        <div key={fact.term} className="flex flex-col gap-1.5 sm:contents">
          <dt className={cn('u-label sm:self-end', tone === 'light' && 'text-canvas/55')}>
            {fact.term}
          </dt>
          <dd
            className={cn(
              'font-body text-[0.9375rem] leading-snug sm:self-start',
              tone === 'light' ? 'text-canvas' : 'text-ink',
            )}
          >
            {fact.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

interface StillProps {
  caption: string
  media: MediaRef | null
  index: number
  alt: string
}

/** Every still shares these two hooks: clip the frame, drift the layer inside. */
function useStill() {
  const frameRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLElement>(null)
  useImageReveal(frameRef, { variant: 'revealClip' })
  useReveal(captionRef, { variant: 'revealUp', delay: 0.1 })
  return { frameRef, captionRef }
}

/** Stage 01 — the full width of the screen, caption on the picture. */
function BleedStill({ caption, media, index, alt }: StillProps) {
  const { frameRef, captionRef } = useStill()

  return (
    <figure className={cn('relative isolate', BLEED_X)}>
      {/* 21/7, not 21/8: the pinned path lost 40vh, and the fallback has to
          track it or the client-side upgrade jumps the page under the reader. */}
      <div
        ref={frameRef}
        className="relative isolate aspect-[4/5] w-full overflow-hidden bg-espresso sm:aspect-[3/2] lg:aspect-[21/7]"
      >
        <SectionImage media={media} alt={alt} sizes="100vw" width={2400} />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[46%]" style={SCRIM_B} />
      </div>
      <figcaption
        ref={captionRef}
        data-reveal
        className="u-gutter absolute inset-x-0 bottom-0 flex items-center gap-4 pb-6 lg:p-[var(--spacing-gutter)]"
      >
        <span className="u-label text-accent-soft">{pad2(index + 1)}</span>
        <span className="u-label text-canvas/75">{caption}</span>
      </figcaption>
    </figure>
  )
}

/** Stages 02 and 03 — a pair that never shares a top or a bottom edge. */
function PairStill({ caption, media, index, alt, variant }: StillProps & { variant: 'wide' | 'tall' }) {
  const { frameRef, captionRef } = useStill()
  const wide = variant === 'wide'

  return (
    <figure className={cn('col-span-12', wide ? 'lg:col-span-7' : 'lg:col-span-4 lg:col-start-9 lg:mt-10')}>
      <div
        ref={frameRef}
        className={cn(
          'relative w-full overflow-hidden bg-espresso',
          wide ? 'aspect-[3/2]' : 'aspect-[4/5]',
        )}
      >
        <SectionImage
          media={media}
          alt={alt}
          sizes={wide ? '(min-width: 1024px) 53vw, 100vw' : '(min-width: 1024px) 30vw, 100vw'}
          width={1600}
        />
      </div>
      <figcaption ref={captionRef} data-reveal className="mt-5 flex items-center gap-4">
        <span className="u-label text-accent-soft">{pad2(index + 1)}</span>
        <span className="u-label text-canvas/70">{caption}</span>
      </figcaption>
    </figure>
  )
}

/** Stage 04 and after — inset, with the caption standing beside it, not under it. */
function InsetStill({ caption, media, index, alt }: StillProps) {
  const { frameRef, captionRef } = useStill()

  return (
    <figure className="grid grid-cols-12 items-start gap-x-8 gap-y-5">
      <figcaption
        ref={captionRef}
        data-reveal
        className="col-span-12 flex items-center gap-4 lg:order-1 lg:col-span-2 lg:flex-col lg:items-start lg:gap-3"
      >
        <span className="u-label text-accent-soft">{pad2(index + 1)}</span>
        <span className="u-label text-canvas/70">{caption}</span>
      </figcaption>
      <div
        ref={frameRef}
        className="relative col-span-12 aspect-[16/9] w-full overflow-hidden bg-espresso lg:order-2 lg:col-span-9 lg:col-start-4 lg:aspect-[21/9]"
      >
        <SectionImage media={media} alt={alt} sizes="(min-width: 1024px) 68vw, 100vw" width={1600} />
      </div>
    </figure>
  )
}

/**
 * Depth: the site's one camera-driven moment, at viewport four rather than
 * viewport nine. The pinned path is a sticky 100svh scene scrubbed 0 → 1 with
 * the stage captions crossfading and the project's facts resolving at the end;
 * reduced motion, a narrow screen or no WebGL gets a stacked sequence of
 * differently shaped stills instead — no pinning, no WebGL, and no four
 * identical full-bleed frames.
 */
export function ImmersiveProject({ section, data }: HomeSectionProps) {
  const { project, scene, gallery } = data.immersive

  const sectionRef = useRef<HTMLElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)

  const [stage, setStage] = useState(0)
  const [resolved, setResolved] = useState(false)
  const [inView, setInView] = useState(false)

  const reduced = useReducedMotion()
  const hasScene = scene !== null && scene.mode !== 'NONE'

  // Upgrade to the pinned scene only after mount: the server snapshot is always
  // `false`, so SSR renders the stacked sequence and a small screen — or a
  // machine without WebGL — never sees a swap. Subscribing to the media query
  // instead of writing state from an effect keeps the render pure.
  const wide = useSyncExternalStore(subscribeWide, readWide, () => false)
  const pinned = hasScene && !reduced && wide

  // The two paths land deliberately close (2.2 viewports pinned, ~2.4 stacked)
  // and never identical to the pixel, so the upgrade still moves every trigger
  // below this band and the page has to be re-measured.
  useEffect(() => {
    registerGsap()
    ScrollTrigger.refresh()
  }, [pinned])

  // 220vh outer, 100vh sticky inner: `top top` → `bottom bottom` is exactly the
  // 120vh the sticky panel spends pinned, so progress maps 0 → 1 across it.
  useCameraScroll({
    sectionRef,
    progress,
    sensitivity: scene && scene.scrollSensitivity > 0 ? scene.scrollSensitivity : 1,
  })
  useReveal(headerRef, { variant: 'revealUp' })

  useEffect(() => {
    const el = sectionRef.current
    if (!el || !pinned) return
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0]
      setInView(entry ? entry.isIntersecting : false)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [pinned])

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Immersive')
  const headingLines = sectionLines(content, 'heading', 'Bước vào không gian')
  const body = sectionText(
    content,
    'body',
    'Cuộn để đi xuyên qua căn nhà — từ mặt tiền, qua tiền sảnh, tới chỗ ngồi quen thuộc và những chi tiết vật liệu ở cự ly gần.',
  )
  /*
   * The stops follow the photographs, not a constant. A project with two frames
   * gets two stops — the old code mapped a fixed four names over
   * `gallery[i] ?? cover` and printed the *same* photograph four times under
   * four different room names when the gallery was short.
   */
  const authored = sectionList(content, 'stages', [])
  const frames = gallery.length > 0 ? gallery.slice(0, MAX_STAGES) : []
  const stageCount = Math.max(1, Math.min(MAX_STAGES, frames.length > 0 ? frames.length : 1))
  const place = project ? placeLine(project) : ''
  const stages: string[] = Array.from(
    { length: stageCount },
    (_, index) => authored[index] ?? frames[index]?.caption ?? place,
  )
  // Four identical labels are not four stops: when nothing distinguishes them,
  // the pinned path holds one line instead of cross-fading a word into itself.
  const namedStops = new Set(stages).size > 1

  // Scroll progress is read in rAF and written straight to the DOM — no state per frame.
  useEffect(() => {
    if (!pinned || !inView) return
    let frame = 0
    let lastStage = -1
    let lastResolved = false

    const tick = (): void => {
      const value = clamp(progress.current, 0, 1)
      const bar = barRef.current
      if (bar) bar.style.transform = `scaleX(${value})`

      const next = Math.min(stageCount - 1, Math.floor(value * stageCount))
      if (next !== lastStage) {
        lastStage = next
        setStage(next)
      }

      const isResolved = value > 0.84
      if (isResolved !== lastResolved) {
        lastResolved = isResolved
        setResolved(isResolved)
      }

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frame)
  }, [pinned, inView, stageCount])

  if (!project) return null

  const cover = project.cover ?? scene?.sourceImage ?? null
  const href = `/projects/${project.slug}`

  if (!pinned || scene === null) {
    const stills = stages.map((_, index) => frames[index] ?? cover)
    // The photograph's own alt text first: it is written per project and it is
    // true. The old line pasted the invented stage name into the accessible
    // name too, so a screen reader heard NGOẠI THẤT for the same sofa.
    const altOf = (index: number): string =>
      stills[index]?.alt ?? `${project.title} — ${stages[index] ?? place}`
    // Unnamed stops say the true line once and then let the ordinal carry the
    // sequence. Printing "Tầng tiếp khách nhà phố" under all four frames is
    // accurate and still reads as a component repeating itself.
    const captionOf = (index: number): string =>
      namedStops || index === 0 ? (stages[index] ?? '') : ''

    return (
      <section
        ref={sectionRef}
        data-home-section="IMMERSIVE_PROJECT"
        className={cn('overflow-hidden bg-espresso text-canvas', SECTION_Y)}
      >
        {/* The heading sits BESIDE the body and the project's facts, not above
            them — this is the fallback path, and it must not open the way six
            other sections open. The eyebrow is lifted out of the heading column
            onto a full-width rail, the way the pinned path opens on a rail with
            a stage counter: an eyebrow stacked on a display heading is the one
            gesture FEATURED is allowed to keep, and only once. */}
        <div ref={headerRef} data-reveal className="u-gutter">
          <div className="flex items-baseline justify-between gap-6 border-t border-canvas/15 pt-4">
            <Label tone="light">{eyebrow}</Label>
            <Label tone="light" className="shrink-0 text-canvas/55">
              {project.title}
            </Label>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-x-8 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <h2 className={cn(DISPLAY, 'max-w-[12ch] text-canvas')}>
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="u-body-lg max-w-[46ch] text-canvas/65">{body}</p>
            <div className="mt-10 border-t border-canvas/15 pt-8">
              <ProjectFacts project={project} tone="light" />
            </div>
            <div className="mt-8">
              <Button href={href} variant="underline" tone="light" withArrow>
                Xem toàn bộ dự án
              </Button>
            </div>
          </div>
          </div>
        </div>

        {stills[0] !== undefined ? (
          <div className={cn('u-gutter', BAND_T)}>
            <BleedStill caption={captionOf(0)} media={stills[0]} index={0} alt={altOf(0)} />
          </div>
        ) : null}

        {/* Keyed by position, not by caption: when the stops share one true
            label — which is the normal case until the photographs carry their
            own captions — four `key={caption}` siblings are four duplicate keys. */}
        {stills.length > 1 ? (
          <div className={cn('u-gutter grid grid-cols-12 items-start gap-x-8 gap-y-12', BAND_T)}>
            {stills.slice(1, 3).map((media, offset) => (
              <PairStill
                key={media?.id ?? `pair-${offset}`}
                caption={captionOf(offset + 1)}
                media={media}
                index={offset + 1}
                alt={altOf(offset + 1)}
                variant={offset === 0 ? 'wide' : 'tall'}
              />
            ))}
          </div>
        ) : null}

        {stills.slice(3).map((media, offset) => (
          <div key={media?.id ?? `inset-${offset}`} className={cn('u-gutter', BAND_T)}>
            <InsetStill
              caption={captionOf(offset + 3)}
              media={media}
              index={offset + 3}
              alt={altOf(offset + 3)}
            />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      data-home-section="IMMERSIVE_PROJECT"
      // 220vh, not 260: four stages across 120vh of pinned scroll is 30vh each.
      // At 40vh the reader pushed 400px to advance one caption, which reads as an
      // unresponsive page rather than a slow camera — and it made this section
      // and FEATURED the same length, which is the plateau the score breaks.
      className="relative h-[220vh] bg-espresso text-canvas"
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col justify-between overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <InteriorScene
            config={scene}
            progressRef={progress}
            mode="scroll"
            fallbackImage={cover}
            className="absolute inset-0 h-full w-full"
          />
          <div className="absolute inset-0 bg-espresso/28" />
          <div className="absolute inset-x-0 top-0 h-[38%]" style={SCRIM_T} />
          <div className="absolute inset-x-0 bottom-0 h-[52%]" style={SCRIM_B} />
        </div>

        <p className="sr-only">
          {namedStops
            ? `Chuỗi cảnh dựng 3D dự án ${project.title}: ${stages.join(', ')}.`
            : `Chuỗi ${stageCount} cảnh dựng 3D dự án ${project.title} — ${place}.`}
        </p>

        <div className="relative z-10 u-gutter flex items-start justify-between gap-8 pt-[clamp(5rem,12vh,8rem)]">
          <div className="flex flex-col gap-6">
            <Label tone="light" rule>
              {eyebrow}
            </Label>
            <h2
              className={cn(
                DISPLAY_SM,
                'max-w-[14ch] text-canvas transition-opacity duration-[900ms] ease-editorial',
                stage === 0 ? 'opacity-100' : 'opacity-0',
              )}
            >
              {headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <Label tone="light" className="shrink-0 text-canvas/55">
            {`${pad2(Math.min(stage + 1, stageCount))} / ${pad2(stageCount)}`}
          </Label>
        </div>

        <div className="relative z-10 u-gutter flex flex-col gap-8 pb-[clamp(2rem,6vh,4rem)]">
          {/* One standing line when the stops share a label — a word crossfading
              into an identical copy of itself reads as a stuck animation, and
              four `key={caption}` siblings would collide besides. */}
          <div className="relative h-[clamp(3rem,7vw,5.5rem)]">
            {(namedStops ? stages : stages.slice(0, 1)).map((caption, index) => (
              <span
                key={`${index}-${caption}`}
                aria-hidden={!namedStops || index === stage ? undefined : 'true'}
                className={cn(
                  DISPLAY_SM,
                  'absolute inset-x-0 bottom-0 block text-canvas transition-all duration-[900ms] ease-editorial',
                  !namedStops || index === stage
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-3 opacity-0',
                )}
              >
                {caption}
              </span>
            ))}
          </div>

          <span aria-hidden="true" className="block h-px w-full bg-canvas/20">
            <span
              ref={barRef}
              className="block h-px w-full origin-left bg-accent-soft"
              style={{ transform: 'scaleX(0)' }}
            />
          </span>

          <div
            // Invisible until the camera lands, so it must not be tabbable either.
            inert={!resolved}
            className={cn(
              'flex flex-col gap-8 transition-all duration-[1100ms] ease-editorial md:flex-row md:items-end md:justify-between',
              resolved ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
            )}
          >
            <div className="flex flex-col gap-6">
              <Link href={href} className={cn(DISPLAY_SM, 'text-canvas outline-offset-4 hover:text-accent-soft')}>
                {project.title}
              </Link>
              <ProjectFacts project={project} tone="light" />
            </div>
            <Button href={href} variant="ghost" tone="light" withArrow className="shrink-0">
              Xem dự án
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
