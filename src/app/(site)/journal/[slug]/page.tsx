import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { ArrowLeftIcon, ArrowUpRightIcon } from '@/components/ui/icons'
import { buildArticleJsonLd, buildMetadata, jsonLdScript } from '@/lib/seo'
import { formatDate } from '@/lib/utils'
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from '@/server/queries/articles'

import { ImageFrame, Reveal, TextReveal } from '../_components/motion'
import { RichText } from './_components/RichText'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return buildMetadata({ title: 'Không tìm thấy bài viết', path: '/journal', noIndex: true })

  return buildMetadata({
    title: article.seo?.title ?? article.title,
    description: article.seo?.description ?? article.excerpt ?? undefined,
    path: `/journal/${article.slug}`,
    image: article.cover,
    type: 'article',
    noIndex: article.seo?.noIndex ?? false,
    publishedTime: article.publishedAt,
    authors: article.authorName ? [article.authorName] : undefined,
    tags: article.tags,
  })
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  const related = await getRelatedArticles(article.id, 3)
  const jsonLd = jsonLdScript(buildArticleJsonLd(article))

  const meta = [
    formatDate(article.publishedAt),
    article.readingMinutes ? `${article.readingMinutes} phút đọc` : '',
    article.authorName ?? '',
  ].filter((part) => part.length > 0)

  return (
    <article className="pb-[var(--spacing-section)]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      {/* --------------------------------- header -------------------------------- */}
      <header className="u-gutter pt-[calc(var(--spacing-section)*0.6)]">
        <div className="mx-auto w-full max-w-[100rem]">
          <Link
            href="/journal"
            className="u-label inline-flex items-center gap-3 text-muted transition-colors duration-500 ease-editorial hover:text-accent"
          >
            <ArrowLeftIcon className="text-base" />
            Bài viết
          </Link>

          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <Label rule tone="accent">
                {meta.join(' · ')}
              </Label>
              <TextReveal as="h1" className="u-display mt-10 max-w-[18ch] text-ink">
                {article.title}
              </TextReveal>
            </div>

            {article.tags.length > 0 ? (
              <Reveal delay={0.2} className="lg:col-span-3 lg:pt-4">
                <p className="u-label">Chủ đề</p>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {article.tags.map((tag) => (
                    <li key={tag} className="u-label text-ink">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </div>

          {article.excerpt ? (
            <Reveal delay={0.15} className="mt-14">
              <p className="u-body-lg max-w-[56ch] text-ink/75">{article.excerpt}</p>
            </Reveal>
          ) : null}
        </div>
      </header>

      {article.cover ? (
        <section className="u-gutter mt-16">
          <div className="mx-auto w-full max-w-[100rem]">
            <ImageFrame
              media={article.cover}
              alt={article.cover.alt ?? article.title}
              ratio="aspect-[16/9]"
              sizes="(min-width: 1024px) 92vw, 100vw"
              width={2400}
              priority
              caption={article.cover.caption ?? undefined}
            />
          </div>
        </section>
      ) : null}

      {/* ---------------------------------- body --------------------------------- */}
      <section className="u-gutter mt-[calc(var(--spacing-section)*0.7)]">
        <RichText doc={article.content} />
      </section>

      {/* --------------------------------- footer -------------------------------- */}
      <section className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto w-full max-w-[72rem]">
          <Rule />
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="u-label">
              {article.authorName ? `Viết bởi ${article.authorName}` : 'AN ATELIER'}
            </p>
            <Button href="/contact" variant="underline">
              Viết cho studio
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="u-gutter mt-[var(--spacing-section)]">
          <div className="mx-auto w-full max-w-[100rem]">
            <Reveal>
              <Label rule>Đọc tiếp</Label>
              <p className="u-body-lg mt-8 max-w-[40ch]">Cùng một mạch với bài bạn vừa đọc.</p>
            </Reveal>

            <Reveal stagger={0.07} className="mt-10">
              <ul className="grid gap-x-12 md:grid-cols-3">
                {related.map((item) => (
                  <li key={item.id} data-reveal-item className="border-t border-line pt-8">
                    <Link href={`/journal/${item.slug}`} className="group/next block">
                      <span className="u-label">{formatDate(item.publishedAt)}</span>
                      <h2 className="mt-5 font-display text-[1.5rem] font-normal leading-tight text-ink transition-colors duration-500 ease-editorial group-hover/next:text-accent">
                        {item.title}
                      </h2>
                      {item.excerpt ? (
                        <p className="mt-4 font-body text-[0.875rem] leading-[1.8] text-muted">
                          {item.excerpt}
                        </p>
                      ) : null}
                      <span className="u-label mt-6 inline-flex items-center gap-2 text-ink">
                        Đọc
                        <ArrowUpRightIcon className="text-base transition-transform duration-500 ease-editorial group-hover/next:translate-x-1 group-hover/next:-translate-y-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ) : null}
    </article>
  )
}
