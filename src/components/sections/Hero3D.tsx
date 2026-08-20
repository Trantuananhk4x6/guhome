'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'

import { useCameraScroll } from '@/animations/camera'
import { useReveal } from '@/animations/reveal'
import { useTextReveal } from '@/animations/text'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { formatArea } from '@/lib/utils'

import { SectionImage } from './SectionImage'
import { sectionCta, sectionLines, sectionText } from './content'
import type { HomeSectionProps } from './types'

/** three/R3F never touches the server bundle. */
const InteriorScene = dynamic(
  () => import('@/components/three/InteriorScene').then((mod) => mod.InteriorScene),
  { ssr: false },
)

const KEYFRAMES = `
@keyframes an-ken-burns {
  0%   { transform: scale(1.06) translate3d(0, 0, 0); }
  100% { transform: scale(1.2) translate3d(-2.5%, -2%, 0); }
}
@keyframes an-scroll-cue {
  0%   { transform: translateY(-110%); }
  55%  { transform: translateY(160%); }
  100% { transform: translateY(160%); }
}
`

/** Shallow gradients at the two ends of the frame — see the note at the overlay. */
const TOP_SCRIM =
  'linear-gradient(to bottom, color-mix(in srgb, var(--c-espresso) 50%, transparent) 0%, transparent 100%)'
const BOTTOM_SCRIM =
  'linear-gradient(to top, color-mix(in srgb, var(--c-espresso) 60%, transparent) 0%, color-mix(in srgb, var(--c-espresso) 22%, transparent) 45%, transparent 100%)'

/**
 * 100vh opening. The featured project's scene fills the frame and its camera is
 * driven by scroll; without a scene — or without WebGL — the cover photo takes
 * over with a slow ken-burns so the hero is never empty.
 */
export function Hero3D({ section, data }: HomeSectionProps) {
  const { content } = section
  const { project, scene } = data.hero

  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const footRef = useRef<HTMLDivElement>(null)
  const progress = useRef(0)

  // The hero is exactly one viewport tall, so the camera is driven by the first
  // screenful of scrolling — `bottom bottom` would be a zero-length range here.
  useCameraScroll({
    sectionRef,
    progress,
    sensitivity: scene && scene.scrollSensitivity > 0 ? scene.scrollSensitivity : 1,
    end: 'bottom top',
  })
  useTextReveal(headingRef, { by: 'line', delay: 0.15 })
  // The hero foot is always in the first viewport, and on a tall window it can
  // sit *below* the default `top 82%` trigger line — which leaves the opening
  // paragraph and the only call to action invisible until a scroll that may
  // never come. `top bottom` is true for anything on screen at load, so this
  // reveals on arrival and still animates.
  useReveal(footRef, { variant: 'revealUp', delay: 0.55, start: 'top bottom' })

  const eyebrow = sectionText(content, 'eyebrow', 'AN ATELIER')
  const titleLines = sectionLines(content, 'title', 'Không gian\nmang tính cách.')
  const body = sectionText(content, 'body', 'Studio nội thất và kiến trúc tại TP. Hồ Chí Minh.')
  const cta = sectionCta(content, { label: 'Xem dự án', href: '/projects' })
  const scrollLabel = sectionText(content, 'scrollLabel', 'Cuộn')

  const cover = project?.cover ?? scene?.sourceImage ?? null
  const meta = [project?.location, formatArea(project?.area ?? null), project?.year?.toString()]
    .filter((value): value is string => Boolean(value))
    .join(' · ')

  // `data-hero-tone="dark"` is the Header's contract for inverting to canvas
  // type while it floats over the hero.
  return (
    <section
      ref={sectionRef}
      data-home-section="HERO"
      data-hero-tone="dark"
      className="relative isolate flex h-[100svh] min-h-[34rem] w-full flex-col overflow-hidden bg-espresso text-canvas"
    >
      <style>{KEYFRAMES}</style>

      <div className="absolute inset-0" aria-hidden="true">
        {scene !== null && scene.mode !== 'NONE' ? (
          <InteriorScene
            config={scene}
            progressRef={progress}
            mode="scroll"
            fallbackImage={cover}
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ animation: 'an-ken-burns 28s var(--ease-editorial) infinite alternate' }}
            >
              <SectionImage media={cover} alt={project?.title} sizes="100vw" width={2400} priority />
            </div>
          </div>
        )}
        {/*
          Framing, in three flat steps rather than one heavy wash: a light hold
          over the whole frame, then a shallow gradient at each end where the
          type sits. The middle of the photograph — the part worth looking at —
          keeps most of its brightness.
        */}
        <div className="absolute inset-0 bg-espresso/34" />
        <div className="absolute inset-x-0 top-0 h-[34%]" style={{ background: TOP_SCRIM }} />
        <div className="absolute inset-x-0 bottom-0 h-[46%]" style={{ background: BOTTOM_SCRIM }} />
      </div>

      <p className="sr-only">
        {project
          ? `Dựng cảnh nội thất dự án ${project.title}${project.location ? `, ${project.location}` : ''}.`
          : 'Hình ảnh không gian nội thất do AN ATELIER thực hiện.'}
      </p>

      <div className="relative z-10 flex h-full flex-col justify-between u-gutter pt-[clamp(6.5rem,16vh,11rem)] pb-[clamp(1.75rem,5vh,3.5rem)]">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Label tone="light" rule>
            {eyebrow}
          </Label>
          {project ? (
            // On a phone the full credit wraps to two lines and crowds the top
            // of the frame, so the small screen gets the project's name alone.
            <Label tone="light" className="text-canvas/55">
              <span className="sm:hidden">{project.title}</span>
              <span className="hidden sm:inline">{meta ? `${project.title} — ${meta}` : project.title}</span>
            </Label>
          ) : null}
        </div>

        <h1 ref={headingRef} data-reveal className="u-display max-w-[15ch] text-balance text-canvas">
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <div
          ref={footRef}
          data-reveal
          className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16"
        >
          <div className="flex max-w-[42ch] flex-col items-start gap-7">
            <p className="u-body-lg text-canvas/70">{body}</p>
            <Button href={cta.href} variant="underline" tone="light" withArrow>
              {cta.label}
            </Button>
          </div>

          <div className="flex items-center gap-4" aria-hidden="true">
            <span className="u-label text-canvas/40">{scrollLabel}</span>
            <span className="relative block h-16 w-px overflow-hidden bg-canvas/20">
              <span
                className="absolute inset-x-0 top-0 block h-6 bg-accent-soft"
                style={{ animation: 'an-scroll-cue 2.8s var(--ease-curtain) infinite' }}
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
