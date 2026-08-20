import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Không tìm thấy trang',
  description: 'Không có trang nào ở địa chỉ này trên website của AN ATELIER.',
  path: '/',
  noIndex: true,
})

export default function NotFound() {
  return (
    <section className="u-gutter flex min-h-[72vh] items-center py-[calc(var(--spacing-section)*0.75)]">
      <div className="mx-auto w-full max-w-[100rem]">
        <Label rule index="404" tone="accent">
          Không tìm thấy
        </Label>

        <h1 className="u-display mt-10 max-w-[14ch] text-ink">Trang này không còn ở đây.</h1>

        <Rule className="mt-14 max-w-[28rem]" />

        <p className="u-body-lg mt-8 max-w-[46ch]">
          Có thể một trang đã đổi đường dẫn, hoặc bạn đang theo một liên kết cũ mà chúng tôi chưa
          kịp chuyển hướng. Danh sách công trình đầy đủ vẫn nằm ở trang dự án; còn nếu bạn nhớ tên
          căn nhà hay bài viết mình đang tìm, nhắn cho studio một dòng là nhanh nhất.
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-8">
          <Button href="/" withArrow>
            Về trang chủ
          </Button>
          <Button href="/projects" variant="underline">
            Xem dự án
          </Button>
          <Button href="/contact" variant="underline">
            Liên hệ studio
          </Button>
        </div>
      </div>
    </section>
  )
}
