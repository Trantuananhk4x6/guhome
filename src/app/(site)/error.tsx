'use client'

import { useEffect } from 'react'

import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[site] render error', error)
  }, [error])

  return (
    <section className="u-gutter flex min-h-[72vh] items-center py-[calc(var(--spacing-section)*0.75)]">
      <div className="mx-auto w-full max-w-[100rem]">
        <Label rule index="—" tone="accent">
          Sự cố
        </Label>

        <h1 className="u-display mt-10 max-w-[14ch] text-ink">Trang này không tải xong được.</h1>

        <Rule className="mt-14 max-w-[28rem]" />

        <p className="u-body-lg mt-8 max-w-[46ch]">
          Lỗi nằm ở phía chúng tôi, không phải ở máy bạn, và bạn không mất gì cả. Bấm thử lại một
          lần trước đã.{' '}
          {error.digest
            ? 'Nếu vẫn vậy, gửi cho studio mã sự cố ở cuối trang — có mã đó chúng tôi lần ra đúng chỗ hỏng trong vài phút.'
            : 'Nếu vẫn vậy, nhắn cho studio biết bạn đang mở trang nào, chúng tôi sẽ dò lại.'}
        </p>

        <div className="mt-14 flex flex-wrap items-center gap-8">
          <Button type="button" onClick={reset} withArrow>
            Thử lại
          </Button>
          <Button href="/" variant="underline">
            Về trang chủ
          </Button>
          <Button href="/contact" variant="underline">
            Báo cho studio
          </Button>
        </div>

        {error.digest ? (
          <p className="u-label mt-16 text-muted/70">Mã sự cố · {error.digest}</p>
        ) : null}
      </div>
    </section>
  )
}
