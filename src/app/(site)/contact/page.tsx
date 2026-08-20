import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { buildMetadata } from '@/lib/seo'
import { getThemeSettings } from '@/server/queries/site'

import { ContactForm } from './_components/ContactForm'
import { Reveal, TextReveal } from './_components/motion'

export const metadata: Metadata = buildMetadata({
  title: 'Liên hệ',
  description:
    'Diện tích, tình trạng bàn giao, thời điểm bạn muốn dọn vào — ba dòng đó đủ để AN ATELIER trả lời cụ thể. Chúng tôi hồi âm trong vòng 24 giờ làm việc.',
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

export default async function ContactPage() {
  const theme = await getThemeSettings()
  const { brand } = theme
  const telHref = `tel:${brand.phone.replace(/[^\d+]/g, '')}`

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
              Ba thứ giúp chúng tôi trả lời cụ thể ngay từ thư đầu: diện tích, tình trạng bàn giao,
              và thời điểm bạn muốn dọn vào. Thiếu cả ba cũng không sao — chỉ là khi đó thư trả lời
              của chúng tôi sẽ toàn câu hỏi ngược lại.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="u-gutter mt-[calc(var(--spacing-section)*0.6)]">
        <div className="mx-auto grid w-full max-w-[100rem] gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <Reveal variant="revealUp">
              <Label rule>Studio</Label>
              <div className="mt-8">
                <Detail label="Địa chỉ">
                  <p>{brand.address}</p>
                  <p className="mt-2 text-muted">
                    Ghé theo hẹn. Bàn làm việc thường đang bày kín mẫu vật liệu của dự án đang chạy,
                    nên chúng tôi cần biết trước một buổi.
                  </p>
                </Detail>

                <Detail label="Email">
                  <a
                    href={`mailto:${brand.email}`}
                    className="underline decoration-line underline-offset-4 transition-colors duration-500 ease-editorial hover:decoration-accent"
                  >
                    {brand.email}
                  </a>
                </Detail>

                <Detail label="Điện thoại">
                  <a
                    href={telHref}
                    className="underline decoration-line underline-offset-4 transition-colors duration-500 ease-editorial hover:decoration-accent"
                  >
                    {brand.phone}
                  </a>
                  <p className="mt-2 text-muted">
                    Thứ Hai – Thứ Sáu, 9:00 – 18:00. Thứ Bảy theo hẹn. Ngoài giờ đó thì nhắn tin
                    nhanh hơn gọi.
                  </p>
                </Detail>

                <Detail label="Phản hồi">
                  <p>Trong vòng 24 giờ làm việc.</p>
                  <p className="mt-2 text-muted">
                    Buổi gặp đầu khoảng 60 phút, không tính phí, và tốt nhất là ngay tại công trình
                    — chúng tôi cần nhìn thấy trần, dầm và hướng cửa trước khi nói được điều gì có
                    ích.
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
