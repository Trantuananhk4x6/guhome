import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { buildMetadata } from '@/lib/seo'
import { pad2 } from '@/lib/utils'
import { getPublishedProjects } from '@/server/queries/projects'
import { getServices } from '@/server/queries/site'
import type { MediaRef, ServiceItem } from '@/types/content'

import { EXCLUSIONS, FALLBACK_SERVICES, deliverablesFor, paragraphsOf } from './_content'
import { ImageFrame, Reveal, TextReveal } from './_components/motion'

export const metadata: Metadata = buildMetadata({
  title: 'Dịch vụ',
  description:
    'Thiết kế nội thất, kiến trúc, cải tạo, thi công và đồ đặt riêng. Mỗi mục nói rõ bạn cầm về được những gì. Cuối trang là bảy việc AN ATELIER không nhận, và lý do của từng việc.',
  path: '/services',
})

function indexOf(service: ServiceItem, position: number): string {
  const label = service.indexLabel.trim()
  return label.length > 0 ? label : pad2(position + 1)
}

export default async function ServicesPage() {
  const fetched = await getServices()
  const services = fetched.length > 0 ? fetched : FALLBACK_SERVICES
  // Services seeded without a cover borrow imagery from the portfolio rather
  // than leaving an empty frame on the page.
  const projects = await getPublishedProjects({ limit: 8 })

  const coverFor = (service: ServiceItem, position: number): MediaRef | null =>
    service.cover ?? projects[position % Math.max(projects.length, 1)]?.cover ?? null

  return (
    <div className="pb-[var(--spacing-section)]">
      {/* --------------------------------- header -------------------------------- */}
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto w-full max-w-[110rem]">
          <Label rule index="—">
            Dịch vụ
          </Label>

          <TextReveal as="h1" className="u-display mt-10 max-w-[14ch] text-ink">
            Chúng tôi làm gì, và dừng lại ở đâu.
          </TextReveal>

          <div className="mt-16 grid gap-16 lg:grid-cols-12">
            <Reveal delay={0.15} className="lg:col-span-6">
              <p className="u-body-lg max-w-[52ch]">
                Bạn có thể đi cùng cả chặng, hoặc chỉ một đoạn. Mỗi mục dưới đây nói studio làm gì
                và bạn cầm về được những gì. Phần đáng đọc nhất nằm ở cuối trang, chỗ liệt kê bảy
                việc chúng tôi không nhận. Tháng thứ sáu của một dự án là lúc người ta ước gì đã đọc
                nó sớm hơn.
              </p>
            </Reveal>

            <Reveal delay={0.25} stagger={0.05} className="lg:col-span-5 lg:col-start-8">
              <nav aria-label="Danh mục dịch vụ">
                <ul>
                  {services.map((service, i) => (
                    <li key={service.id} data-reveal-item>
                      <a
                        href={`#${service.slug}`}
                        className="group/row flex items-baseline gap-6 border-t border-line py-4 transition-colors duration-500 ease-editorial hover:text-accent"
                      >
                        <span className="u-label text-accent">{indexOf(service, i)}</span>
                        <span className="font-display text-[1.25rem] font-normal text-ink transition-colors duration-500 ease-editorial group-hover/row:text-accent">
                          {service.title}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                <Rule />
              </nav>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------- services ------------------------------- */}
      {services.map((service, i) => {
        const deliverables = deliverablesFor(service)
        const paragraphs = paragraphsOf(service.description)
        const imageFirst = i % 2 === 0

        return (
          <section
            key={service.id}
            id={service.slug}
            className="u-gutter mt-[calc(var(--spacing-section)*0.85)] scroll-mt-32"
          >
            <div className="mx-auto w-full max-w-[110rem] border-t border-line pt-14">
              <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
                <div className={imageFirst ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-2 lg:col-start-8'}>
                  <div className="lg:sticky lg:top-32">
                    <ImageFrame
                      media={coverFor(service, i)}
                      alt={service.cover?.alt ?? `${service.title} — AN ATELIER`}
                      ratio="aspect-[4/5]"
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      width={1200}
                      priority={i === 0}
                    />
                  </div>
                </div>

                <div className={imageFirst ? 'lg:col-span-6 lg:col-start-7' : 'lg:col-span-6 lg:order-1'}>
                  <Reveal>
                    <Label index={indexOf(service, i)} rule tone="muted" />
                    <h2 className="u-display-sm mt-8 max-w-[18ch] text-ink">{service.title}</h2>
                    {service.summary ? (
                      <p className="u-body-lg mt-8 max-w-[48ch]">{service.summary}</p>
                    ) : null}
                  </Reveal>

                  {paragraphs.length > 0 ? (
                    <Reveal delay={0.08} stagger={0.08} className="mt-10">
                      <div className="flex flex-col gap-6">
                        {paragraphs.map((paragraph, index) => (
                          <p
                            key={index}
                            data-reveal-item
                            className="max-w-[58ch] font-body text-[1rem] leading-[1.85] text-ink/85"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </Reveal>
                  ) : null}

                  <Reveal delay={0.12} stagger={0.05} className="mt-14">
                    <p className="u-label">Bạn nhận được</p>
                    <ul className="mt-6">
                      {deliverables.map((item) => (
                        <li
                          key={item}
                          data-reveal-item
                          className="flex items-start gap-5 border-t border-line py-4"
                        >
                          <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-accent" />
                          <span className="font-body text-[0.9375rem] leading-relaxed text-ink">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Rule />
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ------------------------------- exclusions ------------------------------ */}
      <section className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto w-full max-w-[110rem] border-t border-line pt-14">
          <Reveal>
            <Label rule tone="accent">
              Ngoài phạm vi
            </Label>
            <h2 className="u-display-sm mt-8 max-w-[20ch] text-ink">
              Bảy việc studio không nhận.
            </h2>
            <p className="u-body-lg mt-8 max-w-[50ch]">
              Nói ra từ đầu thì mất một khách; giấu đi thì mất sáu tháng của cả hai bên.
            </p>
            <p className="mt-6 max-w-[50ch] font-body text-[0.9375rem] leading-[1.8] text-muted">
              Không dòng nào ở đây là giả định. Lần nào chúng tôi cũng nhận ra hơi muộn, và lần
              nào cũng có người phải trả giá cho cái muộn ấy.
            </p>
          </Reveal>

          <Reveal stagger={0.06} className="mt-14">
            <ul className="grid gap-x-16 md:grid-cols-2">
              {EXCLUSIONS.map((item) => (
                <li key={item} data-reveal-item className="border-t border-line py-8">
                  <p className="max-w-[46ch] font-body text-[0.9375rem] leading-[1.8] text-ink/85">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
            <Rule />
          </Reveal>
        </div>
      </section>

      {/* ----------------------------------- cta --------------------------------- */}
      <section className="mt-[var(--spacing-section)] bg-espresso py-[calc(var(--spacing-section)*0.8)] text-canvas">
        <div className="u-gutter">
          <div className="mx-auto w-full max-w-[110rem]">
            <Reveal>
              <Label rule tone="light">
                Bắt đầu
              </Label>
              <div className="mt-10 flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
                <h2 className="u-display max-w-[13ch] text-canvas">
                  Nói cho chúng tôi biết bạn đang mắc ở đâu.
                </h2>
                <div className="flex flex-wrap items-center gap-8">
                  <Button href="/contact" size="lg" tone="light" withArrow>
                    Liên hệ studio
                  </Button>
                  <Button href="/projects" variant="underline" tone="light">
                    Xem dự án đã hoàn thành
                  </Button>
                </div>
              </div>
              <p className="u-body-lg mt-12 max-w-[46ch] text-canvas/60">
                Buổi gặp đầu khoảng 60 phút và không tính phí. Nếu sau buổi đó chúng tôi thấy mình
                không phải người phù hợp, bạn sẽ nghe đúng câu ấy ngay hôm ấy, và vẫn cầm về được
                danh sách những việc cần quyết trước khi gọi cho studio tiếp theo.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
