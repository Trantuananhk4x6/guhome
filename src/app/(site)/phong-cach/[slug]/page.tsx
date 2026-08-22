/**
 * /phong-cach/[slug] — one style, and the work that wears it.
 *
 * The page a style card promises: the cover, the name in both languages, what
 * the studio means by that word, and then the projects themselves. The listing
 * is filtered in SQL by `getPublishedProjects({ styleSlug })`, so the run is
 * exactly the published projects joined to this style — no client filtering, no
 * over-fetching the whole catalogue to throw most of it away.
 *
 * Statically generated from the enabled styles and revalidated hourly, like
 * `/projects/[slug]`. `dynamicParams` stays on so a style added between builds
 * answers on its first request instead of 404-ing; a slug that is not a style —
 * or one that has been disabled — is a real 404.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Reveal, TextReveal } from '@/components/animation'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { Button } from '@/components/ui/Button'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { Label } from '@/components/ui/Label'
import { buildBreadcrumbJsonLd, buildMetadata, jsonLdScript } from '@/lib/seo'
import { getPublishedProjects } from '@/server/queries/projects'
import { getPublishedStyles, getStyleBySlug } from '@/server/queries/styles'
import type { StyleItem } from '@/types/content'

interface PageProps {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const styles = await getPublishedStyles()
  return styles.map((style) => ({ slug: style.slug }))
}

/** The description as the editor typed it — blank lines separate paragraphs. */
function paragraphs(description: string | null): string[] {
  if (!description) return []
  return description
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}

function fallbackDescription(style: StyleItem): string {
  return `Những công trình GuHomes thiết kế theo phong cách ${style.name.toLowerCase()} — vật liệu, ánh sáng và tỉ lệ được chọn cho khí hậu và cách sống ở Sài Gòn.`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const style = await getStyleBySlug(slug)

  if (!style) {
    return buildMetadata({
      title: 'Không tìm thấy phong cách',
      path: `/phong-cach/${slug}`,
      noIndex: true,
    })
  }

  return buildMetadata({
    title: style.nameEn ? `${style.name} — ${style.nameEn}` : style.name,
    description: style.tagline ?? paragraphs(style.description)[0] ?? fallbackDescription(style),
    path: `/phong-cach/${style.slug}`,
    image: style.cover,
    type: 'website',
  })
}

export default async function StylePage({ params }: PageProps) {
  const { slug } = await params
  const style = await getStyleBySlug(slug)

  if (!style) notFound()

  const projects = await getPublishedProjects({ styleSlug: style.slug })
  const body = paragraphs(style.description)

  const graph = [
    buildBreadcrumbJsonLd([
      { name: 'Trang chủ', path: '/' },
      { name: 'Phong cách', path: '/phong-cach' },
      { name: style.name, path: `/phong-cach/${style.slug}` },
    ]),
  ]

  return (
    <div className="bg-canvas pb-[var(--spacing-section)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(graph) }} />

      {/* --------------------------------- hero --------------------------------- */}
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto w-full max-w-[100rem]">
          <Label as="p" rule>
            <Link href="/phong-cach" className="hover:text-ink transition-colors duration-500">
              Phong cách
            </Link>
          </Label>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-x-8">
            <div className="lg:col-span-5">
              <TextReveal as="h1" className="u-display text-ink max-w-[12ch]">
                {style.name}
              </TextReveal>
              {style.nameEn ? <p className="u-label mt-6">{style.nameEn}</p> : null}
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal delay={0.1}>
                {style.tagline ? <p className="u-body-lg max-w-[46ch]">{style.tagline}</p> : null}

                {body.length > 0 ? (
                  <div className="mt-8 space-y-5">
                    {body.map((part, i) => (
                      <p
                        key={i}
                        className="text-muted max-w-[54ch] font-body text-[0.9375rem] leading-[1.85]"
                      >
                        {part}
                      </p>
                    ))}
                  </div>
                ) : null}

                <p className="u-label text-muted/70 mt-8">
                  {projects.length > 0
                    ? `${projects.length} công trình đã hoàn thiện`
                    : 'Chưa có công trình được công bố'}
                </p>
              </Reveal>
            </div>
          </div>

          {style.cover ? (
            <ImageFrame
              media={style.cover}
              alt={style.cover.alt ?? style.name}
              ratio="21/9"
              sizes="(min-width: 1024px) 92vw, 100vw"
              priority
              reveal="revealClip"
              className="mt-14"
            />
          ) : null}
        </div>
      </section>

      {/* ------------------------------- the work -------------------------------- */}
      <section className="u-gutter mt-[calc(var(--spacing-section)*0.6)]">
        <div className="mx-auto w-full max-w-[100rem]">
          {projects.length > 0 ? (
            <>
              <Reveal>
                <div className="border-line flex flex-wrap items-baseline justify-between gap-6 border-t pt-6">
                  <Label as="p">Công trình theo lối này</Label>
                  {/* The same run, inside the index's own filters — where a
                      visitor can add a category on top of this style. */}
                  <Link
                    href={{ pathname: '/projects', query: { style: style.slug } }}
                    className="u-label text-ink hover:text-accent transition-colors duration-500"
                  >
                    Lọc trong danh sách dự án
                  </Link>
                </div>
              </Reveal>

              <ProjectGrid projects={projects} columns={3} showIndex className="mt-12" />
            </>
          ) : (
            <Reveal className="border-line border-t pt-16">
              <p className="u-display-sm text-ink max-w-[24ch]">
                Chưa có công trình nào được công bố theo lối này.
              </p>
              <p className="u-body-lg mt-8 max-w-[46ch]">
                Một vài dự án theo phong cách {style.name.toLowerCase()} đang trong giai đoạn hoàn
                thiện và chưa được phép đăng. Bạn có thể xem những lối khác, hoặc nhắn cho studio để
                chúng tôi gửi hồ sơ riêng.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <Button href="/phong-cach" withArrow>
                  Xem các phong cách khác
                </Button>
                <Button href="/contact" variant="underline">
                  Liên hệ studio
                </Button>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </div>
  )
}
