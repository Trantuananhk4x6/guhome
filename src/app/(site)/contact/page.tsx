import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { mediaUrl } from '@/lib/media'
import { buildMetadata } from '@/lib/seo'
import { getPublishedProjects } from '@/server/queries/projects'
import { getThemeSettings } from '@/server/queries/site'
import type { ProjectSummary } from '@/types/content'

import { ContactForm } from './_components/ContactForm'
import { Reveal, TextReveal } from './_components/motion'

export const metadata: Metadata = buildMetadata({
  title: 'Liên hệ',
  description:
    'Thư nào gửi tới GuHomes cũng được đọc, dài hay ngắn. Có diện tích căn nhà và tháng bạn cần dọn vào thì hồi âm nói được điều gì đó cụ thể ngay từ lần đầu. Chúng tôi trả lời trong vòng 24 giờ làm việc.',
  path: '/contact',
})

interface DetailProps {
  label: string
  children: ReactNode
}

function Detail({ label, children }: DetailProps) {
  return (
    <div className="grid gap-3 border-t border-line py-6 sm:grid-cols-[8rem_1fr] sm:gap-8">
      <Label>{label}</Label>
      <div className="font-body text-[0.9375rem] leading-relaxed text-ink">{children}</div>
    </div>
  )
}

/**
 * THE ONE PHOTOGRAPH ON THIS PAGE.
 *
 * /contact was the only public route carrying no picture of the work at all —
 * 2,607px on desktop whose three `<img>` elements were the header logo, its
 * duplicate and the footer logo. On a site whose whole argument is 1,485 of the
 * studio's own photographs, the page where a visitor decides to write showed
 * none of them.
 *
 * No slug is named here. The band takes the first project the studio itself
 * ordered to the front of its featured list whose cover is a wide frame big
 * enough to fill a band — so it follows the admin's own ordering and needs no
 * editing when the catalogue changes. It is captioned with the project it
 * belongs to and links there, the way the STUDIO band captions its borrowed
 * photograph: this is a photograph *of a project*, and it must never be
 * mistaken for a photograph of the office.
 */
const BAND_MIN_WIDTH = 1600
const BAND_MIN_RATIO = 1.2

/**
 * The page's own question is "căn nhà của bạn đang ở tình trạng nào?", so the
 * frame that answers it should be somewhere a person lives. Seven of the eight
 * featured projects are; without this the band opened on a Japanese pedicure
 * spa directly under that sentence. Same taxonomy the form's own PROJECT_TYPES
 * select already uses, and an unknown slug simply falls through to the next
 * preference rather than emptying the band.
 */
const HOME_CATEGORIES: ReadonlySet<string> = new Set(['can-ho', 'nha-pho', 'biet-thu-resort'])

function fillsABand(project: ProjectSummary): boolean {
  const cover = project.cover
  if (!cover?.width || !cover.height) return false
  return cover.width >= BAND_MIN_WIDTH && cover.width / cover.height >= BAND_MIN_RATIO
}

function bandProject(projects: readonly ProjectSummary[]): ProjectSummary | null {
  const withCover = projects.filter((project) => project.cover !== null)
  const homes = withCover.filter(
    (project) => project.categorySlug !== null && HOME_CATEGORIES.has(project.categorySlug),
  )
  return homes.find(fillsABand) ?? homes[0] ?? withCover.find(fillsABand) ?? withCover[0] ?? null
}

export default async function ContactPage() {
  const [theme, featured] = await Promise.all([
    getThemeSettings(),
    // One unreachable table must not blank the page a client writes from.
    getPublishedProjects({ featured: true, limit: 8 }).catch((error: unknown) => {
      console.error('[contact] project query failed — the band will be omitted', error)
      return [] as ProjectSummary[]
    }),
  ])
  const { brand } = theme

  const showcase = bandProject(featured)
  const showcaseCover = showcase?.cover ?? null
  // A frame chosen from the photograph rather than assumed: the featured covers
  // run from 0.75 to 1.59, and a portrait dropped into a 3:2 band loses its top
  // and bottom.
  const showcasePortrait =
    showcaseCover?.width && showcaseCover.height
      ? showcaseCover.width / showcaseCover.height < 1
      : false
  const telHref = `tel:${brand.phone.replace(/[^\d+]/g, '')}`

  // The address is one editable string in the theme, but it reads as two lines:
  // the street, then the ward and city. Split on the first comma so the card
  // keeps that rhythm without the admin having to type markup.
  const commaAt = brand.address.indexOf(',')
  const addressStreet = commaAt > 0 ? brand.address.slice(0, commaAt).trim() : brand.address
  const addressArea = commaAt > 0 ? brand.address.slice(commaAt + 1).trim() : ''
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`

  return (
    <div className="pb-[var(--spacing-section)]">
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto w-full max-w-[100rem]">
          <Label rule index="—">
            Liên hệ
          </Label>

          <TextReveal as="h1" className="u-display mt-10 max-w-[15ch] text-ink">
            Căn nhà của bạn đang ở tình trạng nào?
          </TextReveal>

          <Reveal delay={0.15} className="mt-12 max-w-[54ch]">
            <p className="u-body-lg">
              Thư nào gửi tới cũng được đọc, dài hay ngắn. Nhưng nếu trong đó có diện tích căn nhà
              và tháng bạn cần dọn vào, hồi âm của chúng tôi sẽ nói được điều gì đó cụ thể ngay từ
              lần đầu. Thiếu hai con số ấy cũng không sao. Chỉ là khi đó chúng tôi hỏi nhiều hơn
              trả lời.
            </p>
          </Reveal>
        </div>
      </section>

      {showcase && showcaseCover ? (
        <section className="u-gutter mt-[calc(var(--spacing-section)*0.55)]">
          <div className="mx-auto grid w-full max-w-[100rem] items-end gap-10 lg:grid-cols-12 lg:gap-x-8">
            <Reveal variant="revealClip" className="lg:col-span-7 lg:col-start-1">
              <div
                className={
                  showcasePortrait
                    ? 'relative aspect-[4/5] w-full overflow-hidden bg-surface-alt'
                    : 'relative aspect-[4/3] w-full overflow-hidden bg-surface-alt sm:aspect-[3/2]'
                }
              >
                <Image
                  src={mediaUrl(showcaseCover, 1600)}
                  alt={showcaseCover.alt ?? showcase.title}
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                  {...(showcaseCover.blurDataURL
                    ? { placeholder: 'blur' as const, blurDataURL: showcaseCover.blurDataURL }
                    : {})}
                />
              </div>
            </Reveal>

            <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
              {/* Named, not implied. The caption says which project this is and
                  links to it, so the frame is never read as the studio's room. */}
              <Label rule>Công trình</Label>
              <p className="mt-7 font-display text-[1.5rem] leading-[1.38] font-normal text-ink sm:text-[1.75rem]">
                {showcase.title}
              </p>
              {showcase.subtitle ? (
                <p className="u-label mt-4 text-muted">{showcase.subtitle}</p>
              ) : null}
              {showcase.location ? (
                <p className="mt-5 font-body text-[0.9375rem] leading-relaxed text-muted">
                  {showcase.location}
                </p>
              ) : null}
              <Link
                href={`/projects/${showcase.slug}`}
                className="group u-label mt-7 inline-flex items-center gap-3 text-ink transition-colors duration-500 ease-editorial hover:text-accent"
              >
                Xem công trình này
                <ArrowUpRightIcon className="text-base transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="u-gutter mt-[calc(var(--spacing-section)*0.6)]">
        <div className="mx-auto grid w-full max-w-[100rem] gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <Reveal variant="revealUp">
              <Label rule>Studio</Label>

              {/*
                The address and the phone are the two things a visitor who has
                decided actually goes looking for, so they leave the label/value
                list and take a card of their own: an accent edge, the oat
                surface, and the street set in the display face. Square corners
                and a hairline keep it inside the design language.
              */}
              <address className="mt-8 border border-line border-t-2 border-t-accent bg-surface px-6 py-8 not-italic sm:px-8 sm:py-9">
                <Label>Địa chỉ studio</Label>
                <p className="mt-4 font-display text-[1.75rem] leading-[1.38] font-normal text-ink sm:text-[2.125rem]">
                  {addressStreet}
                  {addressArea ? (
                    <>
                      <br />
                      <span className="text-muted">{addressArea}</span>
                    </>
                  ) : null}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <a
                    href={telHref}
                    className="font-display text-[1.375rem] leading-none font-normal text-ink transition-colors duration-500 ease-editorial hover:text-accent sm:text-[1.625rem]"
                  >
                    {brand.phone}
                  </a>
                  <a
                    href={mapsHref}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="u-label text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-500 ease-editorial hover:decoration-accent"
                  >
                    Chỉ đường →
                  </a>
                </div>

                <p className="mt-6 font-body text-[0.9375rem] leading-relaxed text-muted">
                  Ghé thì báo trước một hôm. Cái bàn dài giữa studio gần như lúc nào cũng đang bày
                  mẫu của công trình đang chạy, nên phải dọn bớt mới có chỗ cho bạn ngồi.
                </p>
              </address>

              <div className="mt-8">
                <Detail label="Email">
                  <a
                    href={`mailto:${brand.email}`}
                    className="underline decoration-line underline-offset-4 transition-colors duration-500 ease-editorial hover:decoration-accent"
                  >
                    {brand.email}
                  </a>
                </Detail>

                {/* The number itself now lives in the card above; repeating it here
                    would give the same page two competing places to tap. */}
                <Detail label="Giờ làm việc">
                  <p>Thứ Hai – thứ Sáu, 9:00–18:00. Thứ Bảy theo hẹn.</p>
                  <p className="mt-2 text-muted">Ngoài giờ đó thì nhắn tin nhanh hơn gọi.</p>
                </Detail>

                <Detail label="Phản hồi">
                  <p>Trong vòng 24 giờ làm việc.</p>
                  <p className="mt-2 text-muted">
                    Buổi gặp đầu kéo dài chừng một tiếng và không tính phí. Gặp ngay tại công
                    trình thì hơn hẳn, vì có đứng trong phòng, thấy cái dầm chạy ngang trần và cửa
                    mở về hướng nào, chúng tôi mới nói được điều gì có ích.
                  </p>
                </Detail>

                {brand.social.length > 0 ? (
                  <Detail label="Theo dõi">
                    <ul className="flex flex-wrap gap-x-8 gap-y-3">
                      {brand.social.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="u-label text-ink transition-colors duration-500 ease-editorial hover:text-accent"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </Detail>
                ) : null}
              </div>
              <Rule />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <Label rule tone="accent">
                Viết cho studio
              </Label>
              <div className="mt-10">
                <ContactForm email={brand.email} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
