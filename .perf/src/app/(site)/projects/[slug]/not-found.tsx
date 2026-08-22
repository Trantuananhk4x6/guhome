/**
 * Shown when a project slug does not resolve — an unpublished draft, a renamed
 * project, or a link that outlived its page. Deliberately static: no database
 * read on a dead end.
 */

import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Không tìm thấy dự án',
  robots: { index: false, follow: true },
}

export default function ProjectNotFound() {
  return (
    <div className="bg-canvas flex min-h-[80svh] items-center">
      <div className="u-gutter mx-auto w-full max-w-[110rem] py-40">
        <p className="u-label flex items-center gap-3">
          <span aria-hidden="true" className="bg-accent h-px w-8" />
          404
        </p>

        <h1 className="u-display text-ink mt-8 max-w-[16ch]">Dự án này không còn ở đây</h1>

        <p className="u-body-lg mt-10 max-w-[46ch]">
          Có thể công trình đã được đổi tên, hoặc hồ sơ đang được chụp lại. Bạn có thể quay về danh mục để xem
          những không gian khác của studio.
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-10">
          <Button href="/projects" variant="ghost" size="lg" withArrow>
            Xem toàn bộ dự án
          </Button>
          <Button href="/contact" variant="underline">
            Liên hệ studio
          </Button>
        </div>
      </div>
    </div>
  )
}
