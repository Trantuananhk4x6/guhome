import Link from 'next/link'

import { ArrowUpRightIcon } from '@/components/ui/icons'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import type { BrandConfig, NavItem } from '@/types/content'

import { groupNav } from './nav-fallback'

export interface FooterProps {
  nav: NavItem[]
  brand: BrandConfig
}

/**
 * The espresso close of every public page, written as studio particulars rather
 * than a second copy of the nav: what to send before writing, the two ways to
 * reach a human, the address, and only then the links — weighted, so `Dự án`
 * and `Liên hệ` do not sit at the same size as `Bài viết`. The wordmark is the
 * way home, which keeps `Trang chủ` out of the list where it would flatten it.
 */
export function Footer({ nav, brand }: FooterProps) {
  const year = new Date().getFullYear()
  const { home, lead, rest, contact } = groupNav(nav)
  const tel = `tel:${brand.phone.replace(/\s+/g, '')}`
  const pages = [lead, ...rest, contact].filter((item): item is NavItem => item !== null)

  // The accent hairline below is not decoration — it is the only thing that
  // separates this band from the page on a night palette. Two near-blacks cannot
  // be told apart by luminance (canvas and espresso measure 1.08:1), so without
  // an edge the footer reads as the page simply continuing. On the daylight
  // palette the same rule reads as the deliberate join it always was.
  return (
    <footer className="border-t border-accent/45 bg-espresso text-canvas">
      <div className="u-gutter pb-12 pt-section">
        <section className="grid gap-10 border-b border-canvas/12 pb-16 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-6 md:col-span-7">
            <Label rule tone="light">
              Trước khi nhắn
            </Label>
            <h2 className="max-w-[26ch] font-display text-[clamp(1.75rem,3.1vw,2.75rem)] leading-[1.14] text-canvas">
              {/* The compound must not break: "hướng" alone at a line end reads as a different word. */}
              {'Bắt đầu bằng ba thứ: hướng nắng, mặt bằng bàn giao và ngày bạn cần dọn vào.'}
            </h2>
            <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-canvas/55">
              Chưa có bản vẽ cũng được. Ảnh chụp bằng điện thoại kèm số đo dài rộng là đủ để chúng tôi trả lời cụ thể.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-6 md:col-span-5">
            <a
              href={`mailto:${brand.email}`}
              className="group flex items-end justify-between gap-6 border-b border-canvas/25 pb-4 transition-colors duration-500 hover:border-accent-soft"
            >
              <span className="flex flex-col gap-2">
                <span className="u-label text-canvas/40">Email</span>
                <span className="font-display text-2xl leading-none text-canvas transition-colors duration-500 group-hover:text-accent-soft">
                  {brand.email}
                </span>
              </span>
              <ArrowUpRightIcon className="text-xl text-canvas/45 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-accent-soft" />
            </a>
            <a
              href={tel}
              className="group flex items-end justify-between gap-6 border-b border-canvas/25 pb-4 transition-colors duration-500 hover:border-accent-soft"
            >
              <span className="flex flex-col gap-2">
                <span className="u-label text-canvas/40">Gọi</span>
                <span className="font-display text-2xl leading-none text-canvas transition-colors duration-500 group-hover:text-accent-soft">
                  {brand.phone}
                </span>
              </span>
              <ArrowUpRightIcon className="text-xl text-canvas/45 transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-accent-soft" />
            </a>
          </div>
        </section>

        <section className="grid gap-12 py-16 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-6 md:col-span-5">
            <Link
              href={home?.href ?? '/'}
              aria-label={`${brand.companyName} — ${home?.label ?? 'Trang chủ'}`}
              className="group flex flex-col gap-3 self-start"
            >
              <span className="font-display text-[clamp(1.875rem,4vw,2.75rem)] uppercase leading-none tracking-[0.05em] text-canvas transition-colors duration-500 group-hover:text-accent-soft">
                {brand.companyName}
              </span>
              {home ? <span className="u-label text-canvas/40">{home.label}</span> : null}
            </Link>
            <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-canvas/55">
              Mỗi công trình chúng tôi khoá bảng vật liệu ở khoảng bốn thứ, rồi làm thật kỹ từng thứ một.
            </p>
            <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-canvas/55">
              Còn lại là chuyện độ ẩm 75–80% quanh năm và bề rộng con hẻm trước nhà — nó quyết định cái tủ nào khiêng
              vào được.
            </p>
          </div>

          <nav aria-label="Điều hướng chân trang" className="flex flex-col gap-5 md:col-span-3">
            <Label tone="light">Trang</Label>
            <ul className="flex flex-col gap-3">
              {pages.map((item) => {
                const isLead = lead !== null && item.id === lead.id
                const isContact = contact !== null && item.id === contact.id
                return (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group inline-flex items-center gap-2 transition-colors duration-500 hover:text-accent-soft',
                        isLead
                          ? 'font-display text-[1.375rem] leading-none text-canvas'
                          : isContact
                            ? 'text-[0.9375rem] font-medium text-canvas'
                            : 'text-[0.9375rem] text-canvas/60',
                      )}
                    >
                      {item.label}
                      {isContact ? (
                        <ArrowUpRightIcon className="text-sm text-accent-soft transition-transform duration-500 ease-editorial group-hover:translate-x-0.5" />
                      ) : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <address className="flex flex-col gap-5 not-italic md:col-span-2">
            <Label tone="light">Địa chỉ</Label>
            <p className="text-[0.9375rem] leading-relaxed text-canvas/70">{brand.address}</p>
            <p className="max-w-[24ch] text-[0.875rem] leading-relaxed text-canvas/45">
              Ghé studio thì hẹn trước một buổi.
            </p>
          </address>

          <div className="flex flex-col gap-5 md:col-span-2">
            <Label tone="light">Theo dõi</Label>
            <ul className="flex flex-col gap-3">
              {brand.social.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[0.9375rem] text-canvas/60 transition-colors duration-500 hover:text-accent-soft"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="flex flex-col gap-3 border-t border-canvas/12 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="u-label text-canvas/40">
            © {year} {brand.companyName}
          </p>
          {/* A whole sentence in uppercase Vietnamese is unreadable at 11px — the marks
              collide with the cap line. Sentence case, one step down in size instead. */}
          <p className="text-[0.8125rem] leading-relaxed text-canvas/40">
            Bản quyền hình ảnh công trình thuộc về studio và chủ nhà.
          </p>
        </div>
      </div>
    </footer>
  )
}
