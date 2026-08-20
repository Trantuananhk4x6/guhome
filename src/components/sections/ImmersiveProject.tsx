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
import { sectionLines, sectionList, sectionText } from './content'
import type { HomeSectionProps } from './types'

const InteriorScene = dynamic(
  () => import('@/components/three/InteriorScene').then((mod) => mod.InteriorScene),
  { ssr: false },
)

const STAGE_FALLBACK: readonly string[] = ['Ngoại thất', 'Tiền sảnh', 'Phòng khách', 'Chi tiết vật liệu']

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

/**
 * Type over a photograph needs a floor under it. Two shallow gradients — one at
 * each end of the frame — hold the copy without flattening the picture the way
 * a full-panel scrim does.
 */
const TOP_SCRIM =
  'linear-gradient(to bottom, color-mix(in srgb, var(--c-espresso) 52%, transparent) 0%, transparent 100%)'
const BOTTOM_SCRIM =
  'linear-gradient(to top, color-mix(in srgb, var(--c-espresso) 62%, transparent) 0%, color-mix(in srgb, var(--c-espresso) 24%, transparent) 45%, transparent 100%)'

function ProjectFacts({ project, tone }: { project: ProjectSummary; tone: 'light' | 'ink' }) {
  const facts: { term: string; value: string }[] = []
  if (project.location) facts.push({ term: 'Địa điểm', value: project.location })
  const area = formatArea(project.area)
  if (area) facts.push({ term: 'Diện tích', value: area })
  if (project.year) facts.push({ term: 'Năm', value: String(project.year) })
  if (project.style) facts.push({ term: 'Phong cách', value: project.style })

  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.term} className="flex flex-col gap-1.5">
          <dt className={cn('u-label', tone === 'light' && 'text-canvas/45')}>{fact.term}</dt>
          <dd
            className={cn(
              'font-body text-[0.9375rem] leading-snug',
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

/** One still of the degraded sequence: image reveal, then its caption. */
function StackedStage({
  caption,
  media,
  index,
  alt,
}: {
  caption: string
  media: MediaRef | null
  index: number
  alt: string
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const captionRef = useRef<HTMLDivElement>(null)

  useImageReveal(frameRef, { variant: 'revealClip' })
  useReveal(captionRef, { variant: 'revealUp', delay: 0.1 })

  return (
    <figure className="flex flex-col gap-5">
      <div ref={frameRef} className="relative aspect-[16/10] w-full overflow-hidden bg-espresso">
        <SectionImage media={media} alt={alt} sizes="100vw" width={1600} />
      </div>
      <figcaption ref={captionRef} data-reveal className="u-gutter flex items-center gap-4">
        <span className="u-label text-accent-soft">{pad2(index + 1)}</span>
        <span className="u-label text-canvas/60">{caption}</span>
      </figcaption>
    </figure>
  )
}

/**
 * The pinned 300vh moment: a sticky 100vh scene whose camera is scrubbed from
 * 0 to 1 across the section, with stage captions crossfading and the project's
 * metadata resolving at the end. Small screens and reduced motion get a stacked
 * image sequence instead — no pinning, no WebGL.
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

  // The stacked sequence and the 300vh pinned panel are wildly different
  // heights, so the upgrade moves every trigger below this band. Without a
  // re-measure, the reveals further down the page fire at the wrong scroll
  // position — or, further down still, never fire at all.
  useEffect(() => {
    registerGsap()
    ScrollTrigger.refresh()
  }, [pinned])

  // 300vh outer, 100vh sticky inner: `top top` → `bottom bottom` is exactly the
  // 200vh the sticky panel spends pinned, so progress maps 0 → 1 across it.
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
  const stages = sectionList(content, 'stages', STAGE_FALLBACK)
  const stageCount = stages.length

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
    const stills = stages.map((_, index) => gallery[index] ?? cover)

    return (
      <section
        ref={sectionRef}
        data-home-section="IMMERSIVE_PROJECT"
        className="bg-espresso py-[var(--spacing-section)] text-canvas"
      >
        <div ref={headerRef} data-reveal className="u-gutter flex flex-col gap-7">
          <Label tone="light" rule>
            {eyebrow}
          </Label>
          <h2 className="u-display max-w-[14ch] text-canvas">
            {headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="u-body-lg max-w-[46ch] text-canvas/60">{body}</p>
        </div>

        <div className="mt-[clamp(3rem,8vh,6rem)] flex flex-col gap-[clamp(2.5rem,7vh,5rem)]">
          {stills.map((media, index) => (
            <StackedStage
              key={stages[index] ?? String(index)}
              caption={stages[index] ?? ''}
              media={media}
              index={index}
              alt={`${project.title} — ${stages[index] ?? 'không gian'}`}
            />
          ))}
        </div>

        <div className="u-gutter mt-[clamp(3rem,8vh,6rem)] flex flex-col gap-8 border-t border-canvas/15 pt-9">
          <h3 className="u-display-sm text-canvas">{project.title}</h3>
          <ProjectFacts project={project} tone="light" />
          <Button href={href} variant="underline" tone="light" withArrow>
            Xem toàn bộ dự án
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      data-home-section="IMMERSIVE_PROJECT"
      className="relative h-[300vh] bg-espresso text-canvas"
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
          <div className="absolute inset-x-0 top-0 h-[38%]" style={{ background: TOP_SCRIM }} />
          <div className="absolute inset-x-0 bottom-0 h-[52%]" style={{ background: BOTTOM_SCRIM }} />
        </div>

        <p className="sr-only">
          {`Chuỗi cảnh dựng 3D dự án ${project.title}: ${stages.join(', ')}.`}
        </p>

        <div className="relative z-10 u-gutter flex items-start justify-between gap-8 pt-[clamp(5rem,12vh,8rem)]">
          <div className="flex flex-col gap-6">
            <Label tone="light" rule>
              {eyebrow}
            </Label>
            <h2
              className={cn(
                'u-display-sm max-w-[14ch] text-canvas transition-opacity duration-[900ms] ease-editorial',
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
          <Label tone="light" className="shrink-0 text-canvas/45">
            {`${pad2(Math.min(stage + 1, stageCount))} / ${pad2(stageCount)}`}
          </Label>
        </div>

        <div className="relative z-10 u-gutter flex flex-col gap-8 pb-[clamp(2rem,6vh,4rem)]">
          <div className="relative h-[clamp(3rem,7vw,5.5rem)]">
            {stages.map((caption, index) => (
              <span
                key={caption}
                aria-hidden={index === stage ? undefined : 'true'}
                className={cn(
                  'u-display-sm absolute inset-x-0 bottom-0 block text-canvas transition-all duration-[900ms] ease-editorial',
                  index === stage ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0',
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
              <Link href={href} className="u-display-sm text-canvas outline-offset-4 hover:text-accent-soft">
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
