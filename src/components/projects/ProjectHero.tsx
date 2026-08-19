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
    <div className="flex flex-col gap-10">
      <div ref={liveRef} data-reveal className="flex flex-col gap-6">
        <p className="u-label text-canvas/70">{eyebrow}</p>
        <h1 className="u-display text-canvas max-w-[16ch]">{title}</h1>
        {project.subtitle ? (
          <p className="u-body-lg text-canvas/75 max-w-[46ch]">{project.subtitle}</p>
        ) : null}
      </div>

      {items.length > 0 ? (
        <dl
          ref={metaRef}
          data-reveal
          className="border-canvas/20 flex flex-wrap gap-x-12 gap-y-6 border-t pt-6"
        >
          {items.map((item) => (
            <div key={item.label} data-reveal data-reveal-item className="flex flex-col gap-2">
              <dt className="u-label text-canvas/50">{item.label}</dt>
              <dd className="text-canvas font-display text-xl font-light">{item.value}</dd>
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
      className={cn(
        'bg-espresso relative isolate flex w-full flex-col justify-end overflow-hidden',
        fullBleed ? 'min-h-[92svh]' : 'min-h-[70svh]',
        className,
      )}
    >
      <div aria-hidden="true" className="absolute inset-0">
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
            // Pairs with the name the card transition stamps on the thumbnail,
            // so the card morphs into this frame instead of cross-fading.
            style={{ viewTransitionName: PROJECT_VIEW_TRANSITION_NAME } as CSSProperties}
            onLoad={() => setSettled(true)}
            {...(cover.blurDataURL ? { placeholder: 'blur' as const, blurDataURL: cover.blurDataURL } : {})}
          />
        ) : null}
        {/* Flat scrim, not a gradient — the palette has no gradients in it. */}
        <span className="bg-espresso/45 absolute inset-0" />
      </div>

      {useScene ? (
        <p className="sr-only">
          Mô hình không gian ba chiều của {project.title}. Nội dung tương đương được mô tả bằng văn bản trong
          phần thông tin dự án bên dưới.
        </p>
      ) : null}

      <div className="u-gutter relative z-10 w-full pt-40 pb-16 md:pb-24">
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
