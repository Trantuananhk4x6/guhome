import Link from 'next/link'

import { ArrowUpRightIcon } from '@/components/ui/icons'
import { Label } from '@/components/ui/Label'
import type { BrandConfig, NavItem } from '@/types/content'

export interface FooterProps {
  nav: NavItem[]
  brand: BrandConfig
}

/** Espresso close of every public page: CTA, wordmark, contact, index. */
export function Footer({ nav, brand }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso text-canvas">
      <div className="u-gutter pb-14 pt-section">
        <section className="flex flex-col gap-10 border-b border-canvas/12 pb-16">
          <Label rule tone="light">
            Bắt đầu
          </Label>
          <h2 className="u-display max-w-[15ch] text-canvas">Kể cho chúng tôi về không gian của bạn.</h2>
          <a
            href={`mailto:${brand.email}`}
            className="group flex max-w-3xl items-center justify-between gap-8 border-b border-canvas/25 pb-5 pt-4 transition-colors duration-500 hover:border-accent-soft"
          >
            <span className="font-display text-2xl font-light text-canvas transition-colors duration-500 group-hover:text-accent-soft md:text-4xl">
              {brand.email}
            </span>
            <ArrowUpRightIcon className="text-2xl text-canvas/50 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-accent-soft md:text-3xl" />
          </a>
        </section>

        <section className="grid gap-14 py-16 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-6 md:col-span-5">
            <p className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light uppercase leading-[0.95] tracking-[0.16em] text-canvas">
              {brand.companyName}
            </p>
            <p className="max-w-[34ch] text-[0.9375rem] leading-relaxed text-canvas/55">{brand.tagline}</p>
          </div>

          <nav aria-label="Điều hướng chân trang" className="flex flex-col gap-4 md:col-span-3">
            <Label tone="light">Khám phá</Label>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-canvas/70 transition-colors duration-500 hover:text-accent-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 md:col-span-2">
            <Label tone="light">Kết nối</Label>
            <ul className="flex flex-col gap-3">
              {brand.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[0.9375rem] text-canvas/70 transition-colors duration-500 hover:text-accent-soft"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <address className="flex flex-col gap-4 not-italic md:col-span-2">
            <Label tone="light">Studio</Label>
            <p className="text-[0.9375rem] leading-relaxed text-canvas/70">{brand.address}</p>
            <a
              href={`tel:${brand.phone.replace(/\s+/g, '')}`}
              className="text-[0.9375rem] text-canvas/70 transition-colors duration-500 hover:text-accent-soft"
            >
              {brand.phone}
            </a>
          </address>
        </section>

        <div className="flex flex-col gap-3 border-t border-canvas/12 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="u-label text-canvas/40">
            © {year} {brand.companyName}. Bảo lưu mọi quyền.
          </p>
          <p className="u-label text-canvas/40">Interior architecture · Ho Chi Minh City</p>
        </div>
      </div>
    </footer>
  )
}
