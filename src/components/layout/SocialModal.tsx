'use client'

import { useState } from 'react'

import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { Label } from '@/components/ui/Label'
import { useToast } from '@/components/ui/Toast'
import { SOCIAL_CHANNELS, useSocialModalStore } from '@/lib/social'
import { cn } from '@/lib/utils'

import { SocialQrCode } from './SocialQrCode'

export function SocialModal() {
  const { isOpen, activeId, closeModal, setActiveId } = useSocialModalStore()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const activeChannel = SOCIAL_CHANNELS.find((c) => c.id === activeId) ?? SOCIAL_CHANNELS[0]!

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(activeChannel.href)
      setCopied(true)
      toast({
        title: 'Đã sao chép liên kết',
        description: `Đã lưu đường dẫn ${activeChannel.name} vào bộ nhớ tạm.`,
        tone: 'success',
      })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({
        title: 'Không thể sao chép',
        description: 'Vui lòng chọn và sao chép thủ công liên kết.',
        tone: 'error',
      })
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      size="lg"
      eyebrow="Mạng xã hội & Kênh kết nối"
      title="Kết nối cùng GuHomes"
      description="Thông tin các kênh truyền thông chính thức, nhật ký công trình thực tế và kênh hỗ trợ tư vấn trực tiếp từ studio."
    >
      <div className="mt-8 flex flex-col gap-8">
        {/* Channel Navigation Pills / Tabs */}
        <div className="flex flex-wrap gap-2.5 border-b border-line pb-4">
          {SOCIAL_CHANNELS.map((channel) => {
            const isSelected = channel.id === activeChannel.id
            return (
              <button
                key={channel.id}
                type="button"
                onClick={() => setActiveId(channel.id)}
                className={cn(
                  'group relative flex min-h-[44px] items-center gap-2.5 border px-4 py-2 font-body text-[0.875rem] transition-all duration-300',
                  isSelected
                    ? 'border-accent bg-espresso text-canvas font-medium shadow-sm ring-1 ring-accent/30'
                    : 'border-line/80 bg-surface/70 text-ink/75 hover:border-accent/40 hover:bg-canvas hover:text-ink',
                )}
              >
                <span className="font-medium">{channel.label}</span>
                <span
                  className={cn(
                    'text-[0.6875rem] font-mono tracking-wider uppercase',
                    isSelected ? 'text-accent-soft' : 'text-muted group-hover:text-ink',
                  )}
                >
                  · {channel.handle.split(' ')[0]}
                </span>
                {isSelected && (
                  <span className="absolute -bottom-[5px] left-1/2 h-1 w-4 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </button>
            )
          })}
        </div>

        {/* Channel Main Info Grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Detailed Info Column */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 text-[0.6875rem] font-medium tracking-wide text-accent uppercase">
                  <span className="h-1 w-1 rounded-full bg-accent animate-pulse" />
                  {activeChannel.badge}
                </span>
                <span className="font-mono text-[0.8125rem] text-muted">{activeChannel.handle}</span>
              </div>
              <h3 className="font-display text-[1.625rem] font-normal text-ink sm:text-[1.875rem]">
                {activeChannel.name}
              </h3>
              <p className="font-body text-[0.9375rem] font-medium leading-relaxed text-ink/90">
                {activeChannel.summary}
              </p>
            </div>

            <p className="font-body text-[0.9375rem] leading-[1.85] text-ink/75">
              {activeChannel.description}
            </p>

            {/* Highlights bullet list */}
            <div className="flex flex-col gap-3 border-t border-line/80 pt-5">
              <span className="u-label text-muted">Nội dung chia sẻ nổi bật:</span>
              <ul className="flex flex-col gap-2.5">
                {activeChannel.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-body text-[0.875rem] text-ink/80 transition-colors hover:text-ink">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent shadow-2xs">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-wrap items-center gap-4 pt-3">
              <a
                href={activeChannel.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 border border-ink bg-ink px-6 py-3 font-body text-[0.875rem] font-medium text-canvas transition-all duration-300 hover:border-accent hover:bg-accent hover:shadow-md active:scale-[0.98]"
              >
                <span>{activeChannel.actionLabel}</span>
                <ArrowUpRightIcon className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={handleCopyLink}
                className="min-h-[44px] border border-line hover:border-accent hover:bg-surface transition-all duration-300 active:scale-[0.98]"
              >
                {copied ? '✓ Đã sao chép liên kết!' : 'Sao chép liên kết'}
              </Button>
            </div>
          </div>

          {/* QR Code & Mobile Connection Column */}
          <div className="flex flex-col items-center justify-start gap-5 border-t border-line pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="relative flex w-full flex-col items-center overflow-hidden border border-line bg-gradient-to-b from-surface via-surface to-canvas p-4 sm:p-6 shadow-xs">
              {/* Corner Accents */}
              <div aria-hidden="true" className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-accent" />

              <Label rule tone="accent">
                Quét mã kết nối
              </Label>
              <div className="mt-4">
                <SocialQrCode
                  type={activeChannel.qrType}
                  href={activeChannel.href}
                  label={activeChannel.label}
                />
              </div>

              <div className="mt-5 w-full border-t border-line/60 pt-4 text-center">
                <p className="font-mono text-[0.75rem] uppercase tracking-wider text-muted">
                  Hotline KTS Trưởng:
                </p>
                <a
                  href="tel:0368757916"
                  className="mt-1 inline-flex min-h-[44px] items-center justify-center gap-1.5 font-display text-[1.25rem] font-normal text-ink transition-colors hover:text-accent"
                >
                  <span>0368 757 916</span>
                  <span className="text-xs text-accent">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Particulars Footer Strip */}
        <div className="flex flex-col gap-4 border-t border-line bg-surface/70 p-5 text-[0.8125rem] text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-ink flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Công ty TNHH Kiến Trúc & Xây Dựng GuHomes
            </span>
            <span>Trụ sở: 14 Đường 41, Phường An Khánh, TP. Hồ Chí Minh</span>
            <span>Xưởng mộc may đo: Thạnh Xuân, Quận 12 (1.200m²), TP. Hồ Chí Minh</span>
          </div>
          <div className="text-left md:text-right">
            <span className="italic font-display text-ink/75">&ldquo;Tận Tâm Trọn Vẹn&rdquo;</span>
            <p className="mt-0.5 text-accent font-medium">Kiến tạo không gian, nâng tầm phong cách sống.</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
