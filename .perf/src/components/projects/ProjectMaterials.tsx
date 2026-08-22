'use client'

/**
 * The material palette. Names on the left, one close-up on the right: pointing
 * at (or tabbing to) a name cross-fades its photograph in — opacity plus a
 * shallow clip-path wipe, deliberately subtle, so the list reads as a swatch
 * board rather than a slideshow.
 */

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { gsap, registerGsap } from '@/animations/gsap'
import { useReveal } from '@/animations/reveal'
import { mediaUrl } from '@/lib/media'
import { motionEnabled } from '@/lib/motion'
import { cn, pad2 } from '@/lib/utils'
import type { MaterialItem } from '@/types/content'

export interface ProjectMaterialsProps {
  materials: readonly MaterialItem[]
  heading?: string
  className?: string
}

const HIDDEN_CLIP = 'inset(0% 0% 12% 0%)'
const SHOWN_CLIP = 'inset(0% 0% 0% 0%)'

export function ProjectMaterials({ materials, heading, className }: ProjectMaterialsProps) {
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const layersRef = useRef<(HTMLDivElement | null)[]>([])

  useReveal(listRef, { variant: 'revealUp', stagger: 0.05 })

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    registerGsap()

    const layers = layersRef.current.filter((layer): layer is HTMLDivElement => layer !== null)
    const animate = motionEnabled('imageReveal')

    layersRef.current.forEach((layer, i) => {
      if (!layer) return
      const isActive = i === active
      const vars = {
        autoAlpha: isActive ? 1 : 0,
        clipPath: isActive ? SHOWN_CLIP : HIDDEN_CLIP,
      }
      if (animate) {
        gsap.to(layer, { ...vars, duration: 0.7, ease: 'power2.out', overwrite: 'auto' })
      } else {
        gsap.set(layer, vars)
      }
    })

    // Kill, never revert: reverting would restore the previous swatch's inline
    // styles and undo the cross-fade the next effect is about to run.
    return () => {
      if (layers.length > 0) gsap.killTweensOf(layers)
    }
  }, [active])

  if (materials.length === 0) return null

  const current = materials[active] ?? materials[0]

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <p className="u-label flex items-center gap-3">
            <span aria-hidden="true" className="bg-accent h-px w-8" />
            {heading ?? 'Vật liệu'}
          </p>

          <ul ref={listRef} data-reveal className="flex flex-col">
            {materials.map((material, i) => {
              const isActive = i === active
              return (
                <li key={material.id} data-reveal data-reveal-item className="border-line border-t last:border-b">
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className="group flex w-full items-baseline gap-6 py-5 text-left"
                  >
                    <span className={cn('u-label shrink-0 transition-colors duration-500', isActive ? 'text-accent' : 'text-muted')}>
                      {pad2(i + 1)}
                    </span>
                    <span
                      className={cn(
                        'font-display text-2xl leading-tight font-normal transition-colors duration-500 md:text-3xl',
                        isActive ? 'text-ink' : 'text-muted group-hover:text-ink',
                      )}
                    >
                      {material.name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          {current?.description ? (
            <p className="text-muted max-w-[46ch] text-sm leading-relaxed">{current.description}</p>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div
            ref={stageRef}
            className="bg-surface-alt relative isolate aspect-[4/3] w-full overflow-hidden shadow-[0_24px_60px_-40px_rgba(28,27,24,0.55)]"
          >
            {materials.map((material, i) => (
              <div
                key={material.id}
                ref={(node) => {
                  layersRef.current[i] = node
                }}
                aria-hidden={i !== active}
                className="absolute inset-0"
                style={
                  i === 0
                    ? { opacity: 1, clipPath: SHOWN_CLIP }
                    : { opacity: 0, visibility: 'hidden', clipPath: HIDDEN_CLIP }
                }
              >
                {material.media ? (
                  <Image
                    src={mediaUrl(material.media, 1600)}
                    alt={material.media.alt ?? `Cận cảnh vật liệu ${material.name}`}
                    fill
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                    {...(material.media.blurDataURL
                      ? { placeholder: 'blur' as const, blurDataURL: material.media.blurDataURL }
                      : {})}
                  />
                ) : (
                  <span className="bg-surface-alt absolute inset-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
