'use client'

import Link from 'next/link'
import { useRef } from 'react'

import { useParallax } from '@/animations/image'
import { useReveal } from '@/animations/reveal'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ArrowRightIcon } from '@/components/ui/icons'
import { cn, formatArea } from '@/lib/utils'
import type { ProjectSummary } from '@/types/content'

import { SectionImage } from './SectionImage'
import { sectionLines, sectionText } from './content'
import type { HomeSectionProps } from './types'

function MetaRow({ term, value }: { term: string; value: string | null }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-1.5">
      <dt className="u-label">{term}</dt>
      <dd className="font-body text-[0.9375rem] leading-snug text-ink">{value}</dd>
    </div>
  )
}

function FeaturedRow({ project, index }: { project: ProjectSummary; index: number }) {
  const figureRef = useRef<HTMLElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  // Entrance clips the frame, drift moves the overscanned layer inside it —
  // two hooks, two different elements, so their transforms never collide.
  useReveal(figureRef, { variant: 'revealClip' })
  useParallax(figureRef, { strength: 0.45 })
  useReveal(metaRef, { variant: 'revealUp', stagger: 0.08 })

  const flip = index % 2 === 1

  return (
    <article>
      <Link
        href={`/projects/${project.slug}`}
        className="group block outline-offset-8"
        aria-label={`Xem dự án ${project.title}`}
      >
        <div className="grid grid-cols-12 items-end gap-x-8 gap-y-10">
          <div
            className={cn(
              'col-span-12 md:row-start-1 md:col-span-7',
              flip ? 'md:col-start-6' : 'md:col-start-1',
            )}
          >
            <figure
              ref={figureRef}
              data-reveal
              className="relative isolate aspect-[4/5] w-full overflow-hidden bg-surface-alt shadow-[0_50px_90px_-70px_rgba(28,27,24,0.7)] md:aspect-[3/2]"
            >
              <div data-reveal-media className="absolute inset-x-0 top-[-8%] bottom-[-8%]">
                <div className="absolute inset-0 transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05] group-focus-visible:scale-[1.05]">
                  <SectionImage
                    media={project.cover}
                    alt={project.title}
                    sizes="(min-width: 768px) 58vw, 100vw"
                    width={1600}
                  />
                </div>
              </div>
            </figure>
          </div>

          <div
            ref={metaRef}
            data-reveal
            className={cn(
              'col-span-12 md:row-start-1 md:col-span-4',
              flip ? 'md:col-start-1' : 'md:col-start-9',
            )}
          >
            <Label data-reveal-item index={index + 1}>
              {project.categoryName ?? 'Dự án'}
            </Label>

            <div data-reveal-item className="mt-7">
              <h3 className="u-display-sm text-ink">{project.title}</h3>
              {project.subtitle ? <p className="u-label mt-3">{project.subtitle}</p> : null}
              {project.summary ? (
                <p className="u-body-lg mt-6 line-clamp-4 max-w-[42ch]">{project.summary}</p>
              ) : null}
            </div>

            <div
              data-reveal-item
              className="mt-9 transition-transform duration-700 ease-editorial group-hover:-translate-y-2 group-focus-visible:-translate-y-2"
            >
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7">
                <MetaRow term="Địa điểm" value={project.location} />
                <MetaRow term="Diện tích" value={formatArea(project.area)} />
                <MetaRow term="Năm" value={project.year ? String(project.year) : null} />
                <MetaRow term="Phong cách" value={project.style} />
              </dl>

              <span className="u-label mt-8 inline-flex items-center gap-3 text-ink">
                Xem dự án
                <ArrowRightIcon className="text-base transition-transform duration-500 ease-editorial group-hover:translate-x-1.5 group-focus-visible:translate-x-1.5" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

/** Cinematic showcase — large image, alternating side, metadata column. */
export function FeaturedProjects({ section, data }: HomeSectionProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  useReveal(headingRef, { variant: 'revealUp' })

  const projects = data.featured
  if (projects.length === 0) return null

  const { content } = section
  const eyebrow = sectionText(content, 'label', 'Selected Works')
  const headingLines = sectionLines(content, 'heading', 'Những công trình\nchúng tôi chăm chút.')
  const lead = sectionText(content, 'body', '')

  return (
    <section
      data-home-section="FEATURED_PROJECTS"
      className="u-gutter bg-canvas py-[var(--spacing-section)]"
    >
      <div ref={headingRef} data-reveal>
        <SectionHeading
          eyebrow={eyebrow}
          title={headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          lead={lead.length > 0 ? lead : undefined}
          action={
            <Button href="/projects" variant="underline" withArrow>
              Tất cả dự án
            </Button>
          }
        />
      </div>

      <div className="mt-[clamp(4rem,10vh,8rem)] flex flex-col gap-[clamp(5rem,14vh,11rem)]">
        {projects.map((project, index) => (
          <FeaturedRow key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
