'use client'

/**
 * The opening frame of a project page: a full-screen cover photograph, or the
 * project's 3D scene in scroll mode when one has been reconstructed.
 *
 * The title block is deliberately late. It mounts only once the visual has
 * settled — image decoded, or `InteriorScene.onReady` — and then reveals line by
 * line, so the reader meets the space before they meet its name.
 */

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

import { PROJECT_VIEW_TRANSITION_NAME } from '@/animations/projects'
import { useScrollProgress } from '@/animations/scroll'
import { useTextReveal } from '@/animations/text'
import { useReveal } from '@/animations/reveal'
import { mediaUrl } from '@/lib/media'
import { cn, formatArea } from '@/lib/utils'
import type { MediaRef, ProjectDetail, SceneConfig } from '@/types/content'

import { DISPLAY_LG, SCRIM_B } from './composition'

/** Three/R3F never reaches the server bundle — nor the projects index route. */
const InteriorScene = dynamic(
  () => import('@/components/three/InteriorScene').then((m) => m.InteriorScene),
  { ssr: false },
)

/** Longest we ever wait for a visual before showing the title anyway. */
const SETTLE_TIMEOUT_MS = 1400

export interface ProjectHeroProps {
  project: ProjectDetail
  /** Overrides the project cover (a HERO block can name its own image). */
  media?: MediaRef | null
  /** Small English label above the title, e.g. `SELECTED WORK`. */
  eyebrow?: string
  /** Overrides `project.title`. */
  title?: string
  /** Renders the scene instead of the cover when the project has one. */
  scene?: SceneConfig | null
  fullBleed?: boolean
  className?: string
}

interface StatItem {
  label: string
  value: string
}

function stats(project: ProjectDetail): StatItem[] {
  const out: StatItem[] = []
  if (project.categoryName) out.push({ label: 'Hạng mục', value: project.categoryName })
  if (project.location) out.push({ label: 'Địa điểm', value: project.location })
  const area = formatArea(project.area)
  if (area) out.push({ label: 'Diện tích', value: area })
  if (project.year) out.push({ label: 'Năm', value: String(project.year) })
  return out
}

function HeroTitle({
  project,
  title,
  eyebrow,
  active,
}: {
  project: ProjectDetail
  title: string
  eyebrow: string
  active: boolean
}) {
  const liveRef = useRef<HTMLDivElement>(null)
  const idleRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDListElement>(null)

  useTextReveal(active ? liveRef : idleRef, { by: 'line', delay: 0.1 })
  useReveal(active ? metaRef : idleRef, { variant: 'revealUp', delay: 0.55, stagger: 0.07 })

  const items = stats(project)

  return (
    // Title left, record right, one baseline. The two used to be stacked full
    // width, which left the whole right half of a 1600px photograph carrying
    // nothing and pushed the facts 200px further down the frame than they
    // needed to be.
    <div className="grid grid-cols-12 items-end gap-x-8 gap-y-10">
      <div ref={liveRef} data-reveal className="col-span-12 flex flex-col gap-6 lg:col-span-7">
        <p className="u-label text-canvas/70">{eyebrow}</p>
        <h1 className={cn(DISPLAY_LG, 'text-canvas max-w-[13ch]')}>{title}</h1>
        {/* The seed writes the subtitle into the eyebrow as well, so on most
            projects these two lines are the same string. Printing it twice is
            not a composition, it is a duplicate. */}
        {project.subtitle && project.subtitle !== eyebrow ? (
          <p className="u-body-lg text-canvas/75 max-w-[44ch]">{project.subtitle}</p>
        ) : null}
      </div>

      {items.length > 0 ? (
        // A hairline record rather than a 2×2 block: a long address wraps to
        // three lines and drags the whole second row of a grid down with it.
        <dl ref={metaRef} data-reveal className="col-span-12 flex flex-col lg:col-span-4 lg:col-start-9">
          {items.map((item) => (
            <div
              key={item.label}
              data-reveal
              data-reveal-item
              className="border-canvas/20 flex items-baseline justify-between gap-6 border-t py-3.5 last:border-b"
            >
              <dt className="u-label text-canvas/75 shrink-0">{item.label}</dt>
              <dd className="text-canvas font-display text-right text-base leading-snug font-normal xl:text-lg">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  )
}

export function ProjectHero({
  project,
  media,
  eyebrow,
  title,
  scene,
  fullBleed = true,
  className,
}: ProjectHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(sectionRef)
  const [settled, setSettled] = useState(false)

  const cover = media ?? project.cover
  const useScene = scene !== null && scene !== undefined && scene.mode !== 'NONE'
  const heading = title ?? project.title
  const label = eyebrow ?? project.categoryName ?? 'Dự án'

  // Never let a slow decode or a WebGL fallback hold the title hostage.
  useEffect(() => {
    if (settled) return
    const timer = window.setTimeout(() => setSettled(true), SETTLE_TIMEOUT_MS)
    return () => window.clearTimeout(timer)
  }, [settled])

  return (
    <section
      ref={sectionRef}
      // The hero is espresso on both branches, so the header must invert over it.
      // `Header` looks for exactly `[data-hero-tone="dark"]` — any other value is inert.
      data-hero-tone="dark"
      className={cn(
        'bg-espresso relative isolate flex w-full flex-col justify-end overflow-hidden',
        fullBleed ? 'min-h-[88svh]' : 'min-h-[68svh]',
        className,
      )}
    >
      {/*
        The view-transition name lives on the wrapper, not on one branch: a project
        with a scene renders `InteriorScene` instead of `<Image>`, and stamping the
        image alone left the flagship 3D projects with a plain cross-fade. This
        element holds either branch, so the card always has something to morph into.

        `data-hero-media` is how the *outgoing* page finds it again. On a
        project → project click `ProjectCard.handleClick` stamps the same name on
        the card it is expanding, and two elements sharing one
        `view-transition-name` is an error the spec answers by skipping the
        morph — so the card clears this one first. Nothing restores it: this
        document is the one being navigated away from.
      */}
      <div
        aria-hidden="true"
        data-hero-media=""
        className="absolute inset-0"
        style={{ viewTransitionName: PROJECT_VIEW_TRANSITION_NAME } as CSSProperties}
      >
        {useScene && scene ? (
          <InteriorScene
            config={scene}
            progressRef={progress}
            mode="scroll"
            fallbackImage={cover}
            className="h-full w-full"
            onReady={() => setSettled(true)}
          />
        ) : cover ? (
          <Image
            src={mediaUrl(cover, 2400)}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
            onLoad={() => setSettled(true)}
            {...(cover.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: cover.blurDataURL } : {})}
          />
        ) : null}
        {/*
          Three-step framing rather than one flat 45% wash: a light hold over
          the whole frame keeps the header legible wherever it sits, and the
          bottom scrim carries the title block. The flat wash alone had to be
          heavy enough for type at the foot, which meant the middle of the
          photograph — the part anyone actually came to look at — was dimmed by
          the same amount.
        */}
        <span className="bg-espresso/34 absolute inset-0" />
        <span aria-hidden="true" style={SCRIM_B} className="absolute inset-x-0 bottom-0 h-[62%]" />
      </div>

      {useScene ? (
        <p className="sr-only">
          Mô hình không gian ba chiều của {project.title}. Nội dung tương đương được mô tả bằng văn bản trong
          phần thông tin dự án bên dưới.
        </p>
      ) : null}

      <div className="u-gutter relative z-10 mx-auto w-full max-w-[110rem] pt-40 pb-14 md:pb-20">
        <HeroTitle
          key={settled ? 'settled' : 'pending'}
          project={project}
          title={heading}
          eyebrow={label}
          active={settled}
        />
      </div>
    </section>
  )
}
