import type { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { ArrowUpRightIcon } from '@/components/ui/icons'
import { buildMetadata } from '@/lib/seo'
import { formatDate, pad2 } from '@/lib/utils'
import { getPublishedArticles } from '@/server/queries/articles'
import type { ArticleSummary } from '@/types/content'

import { ImageFrame, Reveal, TextReveal } from './_components/motion'

export const metadata: Metadata = buildMetadata({
  title: 'Bài viết',
  description:
    'Bài viết của AN ATELIER về vật liệu, ánh sáng và những quyết định nhỏ trên công trường — phần lớn là thứ học được sau khi đã làm sai một lần.',
  path: '/journal',
})

function readingLabel(article: ArticleSummary): string | null {
  return article.readingMinutes ? `${article.readingMinutes} phút đọc` : null
}

function metaParts(article: ArticleSummary): string[] {
  const parts: string[] = []
  const date = formatDate(article.publishedAt)
  if (date) parts.push(date)
  const reading = readingLabel(article)
  if (reading) parts.push(reading)
  return parts
}

export default async function JournalPage() {
  const articles = await getPublishedArticles()
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <div className="pb-[var(--spacing-section)]">
      {/* --------------------------------- header -------------------------------- */}
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto w-full max-w-[100rem]">
          <Label rule index="—">
            Bài viết
          </Label>

          <TextReveal as="h1" className="u-display mt-10 max-w-[13ch] text-ink">
            Viết giữa hai lần ra công trường.
          </TextReveal>

          <Reveal delay={0.15} className="mt-12">
            <p className="u-body-lg max-w-[52ch]">
              Phần lớn là những thứ học được sau khi đã làm sai một lần: một loại sơn không chịu nổi
              độ ẩm, một đảo bếp tính hụt bốn phân, một ô cửa mở đúng vào hướng nắng chiều. Chúng
              tôi chỉ viết khi có gì đó thật sự đáng ghi lại, nên trang này không dài thêm mỗi tuần.
            </p>
          </Reveal>
        </div>
      </section>

      {featured ? (
        <section className="u-gutter mt-[calc(var(--spacing-section)*0.6)]">
          <div className="mx-auto w-full max-w-[100rem]">
            <Link href={`/journal/${featured.slug}`} className="group/feature block">
              <ImageFrame
                media={featured.cover}
                alt={featured.cover?.alt ?? featured.title}
                ratio="aspect-[16/9]"
                sizes="(min-width: 1024px) 92vw, 100vw"
                width={2400}
                priority
                imageClassName="transition-transform duration-[1.2s] ease-editorial group-hover/feature:scale-[1.02]"
              />

              <div className="mt-10 grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <Label>{metaParts(featured).join(' · ')}</Label>
                  <h2 className="u-display-sm mt-6 max-w-[22ch] text-ink transition-colors duration-500 ease-editorial group-hover/feature:text-accent">
                    {featured.title}
                  </h2>
                </div>
                <div className="lg:col-span-4">
                  {featured.excerpt ? (
                    <p className="max-w-[46ch] font-body text-[0.9375rem] leading-[1.85] text-muted">
                      {featured.excerpt}
                    </p>
                  ) : null}
                  <span className="u-label mt-8 inline-flex items-center gap-3 text-ink">
                    Đọc bài viết
                    <ArrowUpRightIcon className="text-base transition-transform duration-500 ease-editorial group-hover/feature:translate-x-1 group-hover/feature:-translate-y-1" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="u-gutter mt-[var(--spacing-section)]">
          <div className="mx-auto w-full max-w-[100rem]">
            <Reveal>
              <Label rule>Tất cả bài viết</Label>
            </Reveal>

            <Reveal stagger={0.06} className="mt-10">
              <ul>
                {rest.map((article, i) => (
                  <li key={article.id} data-reveal-item>
                    <Link
                      href={`/journal/${article.slug}`}
                      className="group/row grid gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-10"
                    >
                      <div className="flex items-baseline gap-6 lg:col-span-2">
                        <span className="u-label text-accent">{pad2(i + 2)}</span>
                        <span className="u-label">{formatDate(article.publishedAt)}</span>
                      </div>

                      <div className="lg:col-span-6">
                        <h3 className="font-display text-[1.75rem] font-normal leading-tight text-ink transition-colors duration-500 ease-editorial group-hover/row:text-accent">
                          {article.title}
                        </h3>
                        {article.excerpt ? (
                          <p className="mt-4 max-w-[54ch] font-body text-[0.9375rem] leading-[1.8] text-muted">
                            {article.excerpt}
                          </p>
                        ) : null}
                      </div>

                      <div className="lg:col-span-3 lg:col-start-10">
                        {article.tags.length > 0 ? (
                          <ul className="flex flex-wrap gap-x-4 gap-y-2">
                            {article.tags.map((tag) => (
                              <li key={tag} className="u-label">
                                {tag}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        {readingLabel(article) ? (
                          <p className="u-label mt-4 text-muted">{readingLabel(article)}</p>
                        ) : null}
                      </div>

                      <div className="hidden lg:col-span-1 lg:flex lg:justify-end">
                        <ArrowUpRightIcon className="text-xl text-muted transition-all duration-500 ease-editorial group-hover/row:translate-x-1 group-hover/row:-translate-y-1 group-hover/row:text-accent" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <Rule />
            </Reveal>
          </div>
        </section>
      ) : null}

      {articles.length === 0 ? (
        <section className="u-gutter mt-[calc(var(--spacing-section)*0.6)]">
          <div className="mx-auto w-full max-w-[100rem] border-t border-line pt-16">
            <Reveal>
              <p className="u-display-sm max-w-[20ch] text-ink">
                Bài đầu tiên vẫn còn nằm trong cuốn sổ ở công trường.
              </p>
              <p className="u-body-lg mt-8 max-w-[44ch]">
                Khi nào chép lại xong thì nó sẽ có mặt ở đây. Trong lúc chờ, những công trình đã
                hoàn thành nói được nhiều hơn.
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
          </div>
        </section>
      ) : null}
    </div>
  )
}
