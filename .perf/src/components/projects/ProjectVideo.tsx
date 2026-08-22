'use client'

/**
 * A project film. Looping clips play silently once they enter the viewport and
 * pause the moment they leave, so a long page never keeps three decoders alive.
 *
 * When the reader has asked for reduced motion nothing autoplays: the poster
 * stays put and native controls appear so they can start it themselves.
 */

import { useEffect, useRef } from 'react'

import { useReveal } from '@/animations/reveal'
import { mediaUrl } from '@/lib/media'
import { useReducedMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import type { MediaRef } from '@/types/content'

export interface ProjectVideoProps {
  media: MediaRef | null
  /** Already-resolved poster URL. */
  poster?: string | null
  loop?: boolean
  caption?: string
  className?: string
}

export function ProjectVideo({ media, poster, loop = true, caption, className }: ProjectVideoProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()

  useReveal(frameRef, { variant: 'revealClip' })

  const autoplay = loop && !reduced

  useEffect(() => {
    const video = videoRef.current
    if (!video || !autoplay) return
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void video.play().catch(() => undefined)
          } else {
            video.pause()
          }
        }
      },
      { threshold: 0.25 },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [autoplay])

  if (!media) return null

  const label = media.alt ?? caption ?? 'Video dự án'

  return (
    <section className={cn('u-gutter mx-auto w-full max-w-[110rem]', className)}>
      <figure className="flex flex-col gap-3">
        <div
          ref={frameRef}
          data-reveal
          className="bg-espresso relative isolate aspect-video w-full overflow-hidden shadow-[0_24px_60px_-40px_rgba(28,27,24,0.55)]"
        >
          <video
            ref={videoRef}
            src={mediaUrl(media)}
            poster={poster ?? undefined}
            aria-label={label}
            playsInline
            muted={autoplay}
            loop={loop}
            preload="metadata"
            controls={!autoplay}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        {caption ? <figcaption className="u-label max-w-[52ch]">{caption}</figcaption> : null}
      </figure>
    </section>
  )
}
