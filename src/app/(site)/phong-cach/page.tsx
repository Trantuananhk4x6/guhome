/**
 * /phong-cach — the studio's styles, as a page you can actually enter.
 *
 * A style is the second taxonomy over the work, beside the category: a category
 * says what kind of building it is, a style says how it is spoken. Visitors ask
 * for the second one by name — "tôi thích Indochine", "làm kiểu tối giản được
 * không" — so it deserves an address rather than a menu label.
 *
 * EVERY STYLE HERE IS A LINK. That is the whole point of the route. The grid
 * reads off `getPublishedStyles()`, so what the studio configures in
 * /admin/styles is what a visitor sees, and each card leads to a real page of
 * real projects — never a button that goes nowhere.
 *
 * Revalidated hourly: a style added or renamed in the admin lands without a
 * deploy, and the read is cheap enough that an hour of staleness is the only
 * cost. A database with no styles in it renders the empty state below rather
 * than a broken grid — `getPublishedStyles()` answers `[]` on a failed read, so
 * this page is safe before the migration has even run.
 */

import type { Metadata } from 'next'
import Link from 'next/link'

import { Reveal, TextReveal } from '@/components/animation'
import { Button } from '@/components/ui/Button'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { Label } from '@/components/ui/Label'
import { buildMetadata } from '@/lib/seo'
import { pad2 } from '@/lib/utils'
import { getPublishedStyles } from '@/server/queries/styles'
import type { StyleItem } from '@/types/content'

export const revalidate = 3600

export const metadata: Metadata = buildMetadata({
  title: 'Phong cách',
  description:
    'Những cách nói của cùng một studio — Hiện đại, Tân cổ điển, Tối giản, Indochine, Bắc Âu, Nhật Bản và hơn thế. Mỗi phong cách dẫn tới những công trình GuHomes đã hoàn thiện theo lối đó.',
  path: '/phong-cach',
})

function countLabel(style: StyleItem): string {
  return style.count > 0 ? `${style.count} công trình` : 'Đang cập nhật'
}

/**
 * The heading counts the styles out loud, and how many there are is the admin's
 * to decide — so the number has to be read, not written into the sentence. Nine
 * is where this started; five would have made the page say something untrue.
 */
const VI_NUMERALS = [
  'không',
  'một',
  'hai',
  'ba',
  'bốn',
  'năm',
  'sáu',
  'bảy',
  'tám',
  'chín',
  'mười',
] as const

function viCount(total: number): string {
  return VI_NUMERALS[total] ?? String(total)
}

function StyleCard({ style, index }: { style: StyleItem; index: number }) {
  return (
    <li data-reveal-item>
      <Link href={`/phong-cach/${style.slug}`} className="group/style block">
        <ImageFrame
          media={style.cover}
          alt={style.cover?.alt ?? style.name}
          ratio="4/3"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          hoverZoom
        />

        <div className="border-line mt-6 flex items-baseline justify-between gap-6 border-t pt-5">
          <div>
            <h2 className="u-display-sm text-ink ease-editorial transition-colors duration-500 group-hover/style:text-accent">
              {style.name}
            </h2>
            {/* The English name is how half the briefs arrive — "Modern Luxury",
                "Japandi" — so it is set as a label under the Vietnamese one
                rather than dropped or promoted. */}
            {style.nameEn ? <p className="u-label mt-2">{style.nameEn}</p> : null}
          </div>
          <span className="u-label text-accent shrink-0 tabular-nums">{pad2(index)}</span>
        </div>

        {style.tagline ? (
          <p className="text-muted mt-4 max-w-[42ch] font-body text-[0.9375rem] leading-[1.8]">
            {style.tagline}
          </p>
        ) : null}

        <p className="u-label text-muted/70 mt-4">{countLabel(style)}</p>
      </Link>
    </li>
  )
}

export default async function StylesPage() {
  const styles = await getPublishedStyles()

  return (
    <div className="bg-canvas pb-[var(--spacing-section)]">
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto w-full max-w-[100rem]">
          <Label as="p" rule index="—">
            Phong cách
          </Label>

          <TextReveal as="h1" className="u-display text-ink mt-10 max-w-[15ch]">
            {styles.length > 0
              ? `Cùng một studio, ${viCount(styles.length)} cách nói.`
              : 'Cùng một studio, nhiều cách nói.'}
          </TextReveal>

          <Reveal delay={0.15} className="mt-12">
            <p className="u-body-lg max-w-[52ch]">
              Phong cách không phải bộ sưu tập đồ đạc, mà là cách một căn nhà chọn ánh sáng, tỉ lệ và
              vật liệu. Chọn một lối bên dưới để xem những công trình chúng tôi đã hoàn thiện theo lối
              đó — hoặc mang câu chuyện của bạn tới, rồi hai bên cùng tìm ra lối phù hợp.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="u-gutter mt-[calc(var(--spacing-section)*0.6)]">
        <div className="mx-auto w-full max-w-[100rem]">
          {styles.length > 0 ? (
            <Reveal as="ul" stagger={0.08} className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
              {styles.map((style, i) => (
                <StyleCard key={style.id} style={style} index={i + 1} />
              ))}
            </Reveal>
          ) : (
            /* Not an error state: a fresh database simply has no styles yet, and
               the honest answer is to send the visitor to the work itself. */
            <Reveal className="border-line border-t pt-16">
              <p className="u-display-sm text-ink max-w-[22ch]">
                Danh mục phong cách đang được sắp xếp lại.
              </p>
              <p className="u-body-lg mt-8 max-w-[46ch]">
                Chúng tôi đang chọn lại ảnh và viết lại phần mô tả cho từng lối. Trong lúc chờ, bạn có
                thể xem toàn bộ công trình đã hoàn thiện, hoặc nhắn cho studio một câu về không gian
                bạn đang hình dung.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-8">
                <Button href="/projects" withArrow>
                  Xem dự án
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
