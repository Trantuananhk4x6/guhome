'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Dialog } from '@/components/ui/Dialog'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { Label } from '@/components/ui/Label'
import { useToast } from '@/components/ui/Toast'
import {
  SOCIAL_CHANNELS,
  SOCIAL_CONTENT_ROADMAP,
  SOCIAL_SHOWCASE_PROJECTS,
  useSocialModalStore,
  type SocialProjectShowcaseItem,
} from '@/lib/social'
import { cn } from '@/lib/utils'

import { SocialQrCode } from './SocialQrCode'

type BriefFilter = 'all' | 'facebook' | 'tiktok'

export function SocialModal() {
  const { isOpen, activeId, activeTab, closeModal, setActiveId, setActiveTab } =
    useSocialModalStore()
  const { toast } = useToast()
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null)
  const [briefFilter, setBriefFilter] = useState<BriefFilter>('all')
  const projectsSectionRef = useRef<HTMLDivElement>(null)

  const activeChannel =
    SOCIAL_CHANNELS.find((c) => c.id === activeId) ?? SOCIAL_CHANNELS[0]!

  useEffect(() => {
    if (isOpen && activeTab === 'projects' && projectsSectionRef.current) {
      const timer = window.setTimeout(() => {
        projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return () => window.clearTimeout(timer)
    }
  }, [isOpen, activeTab])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(activeChannel.href)
      setCopiedLink(true)
      toast({
        title: 'Đã sao chép liên kết',
        description: `Đã lưu đường dẫn ${activeChannel.name} vào bộ nhớ tạm.`,
        tone: 'success',
      })
      setTimeout(() => setCopiedLink(false), 2000)
    } catch {
      toast({
        title: 'Không thể sao chép',
        description: 'Vui lòng chọn và sao chép thủ công liên kết.',
        tone: 'error',
      })
    }
  }

  const handleCopyProjectBrief = async (project: SocialProjectShowcaseItem) => {
    const text = [
      `[HỒ SƠ CONTENT DỰ ÁN GUHOMES — ${project.code}]`,
      `Dự án: ${project.title}`,
      `Khu vực: ${project.location} | Diện tích: ${project.area} | Phong cách: ${project.style}`,
      `Vật liệu chủ đạo: ${project.materials}`,
      `Chỉ số kỹ thuật: ${project.keyMetric}`,
      `Lịch phát sóng: ${project.scheduleSlot}`,
      `---`,
      `• BRIEF FACEBOOK: ${project.facebookBrief}`,
      `• BRIEF TIKTOK: ${project.tiktokBrief}`,
      `• Link hồ sơ dự án: https://guhomes.vn${project.slug}`,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopiedProjectId(project.id)
      toast({
        title: 'Đã sao chép Brief dự án',
        description: `Đã lưu kịch bản Facebook & TikTok của "${project.title}" vào bộ nhớ tạm.`,
        tone: 'success',
      })
      setTimeout(() => setCopiedProjectId(null), 2200)
    } catch {
      toast({
        title: 'Không thể sao chép Brief',
        description: 'Trình duyệt không cho phép truy cập bộ nhớ tạm.',
        tone: 'error',
      })
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      size="xl"
      eyebrow="Hệ sinh thái truyền thông & Nhật ký công trình"
      title="Kết nối cùng GuHomes"
      description="Thông tin 07 kênh truyền thông chính thức, mã QR kết nối trực tiếp KTS Trưởng và kế hoạch nội dung 06 dự án trọng điểm trên Facebook & TikTok."
    >
      <div className="mt-6 flex flex-col gap-8">
        {/* Top Mode Switcher + 7 Channel Selector Bar */}
        <div className="flex flex-col gap-4 border-b border-line pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="u-label text-muted">Chọn kênh truyền thông chính thức (07 kênh):</span>
            <div className="inline-flex items-center border border-line bg-surface p-1">
              <button
                type="button"
                onClick={() => setActiveTab('channel')}
                className={cn(
                  'px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-wider transition-all duration-200 cursor-pointer',
                  activeTab === 'channel'
                    ? 'bg-espresso text-canvas font-medium'
                    : 'text-muted hover:text-ink',
                )}
              >
                01 · Hồ sơ kênh & QR
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('projects')
                  projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className={cn(
                  'px-3 py-1.5 font-mono text-[0.75rem] uppercase tracking-wider transition-all duration-200 cursor-pointer',
                  activeTab === 'projects'
                    ? 'bg-accent text-canvas font-medium'
                    : 'text-muted hover:text-ink',
                )}
              >
                02 · Lịch Content & 06 Dự Án FB/TikTok
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {SOCIAL_CHANNELS.map((channel) => {
              const isSelected = channel.id === activeChannel.id
              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => {
                    setActiveId(channel.id)
                    if (channel.id === 'facebook') setBriefFilter('facebook')
                    else if (channel.id === 'tiktok') setBriefFilter('tiktok')
                    else setBriefFilter('all')
                  }}
                  className={cn(
                    'group relative flex min-h-[42px] items-center gap-2 border px-3.5 py-2 font-body text-[0.8125rem] transition-all duration-300 cursor-pointer',
                    isSelected
                      ? 'border-accent bg-espresso text-canvas font-medium shadow-xs ring-1 ring-accent/30'
                      : 'border-line/80 bg-surface/70 text-ink/80 hover:border-accent/40 hover:bg-canvas hover:text-ink',
                  )}
                >
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      isSelected ? 'bg-accent-soft animate-pulse' : 'bg-muted/50 group-hover:bg-accent',
                    )}
                  />
                  <span className="font-medium">{channel.label}</span>
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem] tracking-wider',
                      isSelected ? 'text-accent-soft' : 'text-muted group-hover:text-ink/70',
                    )}
                  >
                    · {channel.handle.split(' ')[0]}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* PART 1: Active Channel Main Info Grid */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Detailed Info Column */}
          <div className="flex flex-col gap-5 lg:col-span-8">
            <div className="flex flex-col gap-2.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-0.5 text-[0.6875rem] font-medium tracking-wide text-accent uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  {activeChannel.badge}
                </span>
                <span className="font-mono text-[0.8125rem] text-muted">{activeChannel.handle}</span>
              </div>
              <h3 className="font-display text-[1.5rem] font-normal text-ink sm:text-[1.875rem]">
                {activeChannel.name}
              </h3>
              <p className="font-body text-[0.9375rem] font-medium leading-relaxed text-ink/90">
                {activeChannel.summary}
              </p>
            </div>

            {/* Channel Schedule & SLA Metadata Strip */}
            <div className="grid gap-3 border border-line bg-surface/60 p-4 sm:grid-cols-3">
              <div>
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                  Lịch phát sóng / Hoạt động
                </span>
                <p className="mt-1 font-body text-[0.8125rem] font-medium text-ink">
                  {activeChannel.schedule}
                </p>
              </div>
              <div className="border-t border-line/60 pt-2 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                  Cam kết phản hồi
                </span>
                <p className="mt-1 font-body text-[0.8125rem] font-medium text-ink">
                  {activeChannel.responseTime}
                </p>
              </div>
              <div className="border-t border-line/60 pt-2 sm:border-t-0 sm:border-l sm:pl-3 sm:pt-0">
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                  Bảo chứng nội dung
                </span>
                <p className="mt-1 font-body text-[0.8125rem] font-medium text-accent">
                  {activeChannel.proofMetric}
                </p>
              </div>
            </div>

            <p className="font-body text-[0.9375rem] leading-[1.8] text-ink/75">
              {activeChannel.description}
            </p>

            {/* Highlights bullet list */}
            <div className="flex flex-col gap-3 border-t border-line/80 pt-4">
              <span className="u-label text-muted">Trọng tâm nội dung trên {activeChannel.label}:</span>
              <ul className="flex flex-col gap-2.5">
                {activeChannel.highlights.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 font-body text-[0.875rem] text-ink/85 transition-colors hover:text-ink"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <CheckIcon className="h-3 w-3" />
                    </span>
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-1 flex flex-wrap items-center gap-3 pt-2">
              <a
                href={activeChannel.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 border border-ink bg-ink px-5 py-2.5 font-body text-[0.875rem] font-medium text-canvas transition-all duration-300 hover:border-accent hover:bg-accent hover:shadow-md"
              >
                <span>{activeChannel.actionLabel}</span>
                <ArrowUpRightIcon className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <Button
                type="button"
                variant="ghost"
                size="md"
                onClick={handleCopyLink}
                className="min-h-[44px] border border-line hover:border-accent hover:bg-surface transition-all duration-300"
              >
                {copiedLink ? '✓ Đã sao chép liên kết!' : 'Sao chép liên kết'}
              </Button>
            </div>
          </div>

          {/* QR Code & Mobile Connection Column */}
          <div className="flex flex-col items-center justify-start gap-5 border-t border-line pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
            <div className="relative flex w-full flex-col items-center overflow-hidden border border-line bg-gradient-to-b from-surface via-surface to-canvas p-4 sm:p-6 shadow-xs">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-2 left-2 h-2.5 w-2.5 border-t-2 border-l-2 border-accent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-2 right-2 h-2.5 w-2.5 border-t-2 border-r-2 border-accent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 left-2 h-2.5 w-2.5 border-b-2 border-l-2 border-accent"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-2 right-2 h-2.5 w-2.5 border-b-2 border-r-2 border-accent"
              />

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
                  Hotline / Zalo KTS Trưởng:
                </p>
                <a
                  href="tel:0368757916"
                  className="mt-1 inline-flex min-h-[40px] items-center justify-center gap-1.5 font-display text-[1.25rem] font-normal text-ink transition-colors hover:text-accent"
                >
                  <span>0368 757 916</span>
                  <span className="text-xs text-accent">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* PART 2: Content Plan & 6 Showcase Projects for Facebook & TikTok */}
        <div
          ref={projectsSectionRef}
          id="social-modal-projects"
          className="flex flex-col gap-6 border-t-2 border-accent/40 pt-8"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Label rule tone="accent">
                Kế hoạch nội dung & Dự án trọng điểm (Content Brief & Lineup)
              </Label>
              <h3 className="mt-3 font-display text-[1.5rem] font-normal text-ink sm:text-[1.75rem]">
                Lịch chạy nội dung & 06 Dự án tiêu biểu trên Facebook / TikTok GuHomes
              </h3>
              <p className="mt-2 max-w-[68ch] font-body text-[0.875rem] leading-relaxed text-ink/75">
                Hồ sơ nghiên cứu vật liệu, thông số vi khí hậu và kịch bản truyền thông thực tế cho 06 công trình trọng điểm của GuHomes. Đội ngũ Content & khách hàng có thể xem trực tiếp hoặc sao chép Brief từng dự án.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setBriefFilter('all')}
                className={cn(
                  'border px-3 py-1.5 font-mono text-[0.75rem] transition-all cursor-pointer',
                  briefFilter === 'all'
                    ? 'border-espresso bg-espresso text-canvas font-medium'
                    : 'border-line bg-surface text-muted hover:text-ink',
                )}
              >
                Tất cả 06 dự án (FB + TikTok)
              </button>
              <button
                type="button"
                onClick={() => setBriefFilter('facebook')}
                className={cn(
                  'border px-3 py-1.5 font-mono text-[0.75rem] transition-all cursor-pointer',
                  briefFilter === 'facebook'
                    ? 'border-accent bg-accent text-canvas font-medium'
                    : 'border-line bg-surface text-muted hover:text-ink',
                )}
              >
                Góc khai thác Facebook
              </button>
              <button
                type="button"
                onClick={() => setBriefFilter('tiktok')}
                className={cn(
                  'border px-3 py-1.5 font-mono text-[0.75rem] transition-all cursor-pointer',
                  briefFilter === 'tiktok'
                    ? 'border-accent bg-accent text-canvas font-medium'
                    : 'border-line bg-surface text-muted hover:text-ink',
                )}
              >
                Góc khai thác TikTok 60s
              </button>
            </div>
          </div>

          {/* 3-Phase Content Roadmap Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            {SOCIAL_CONTENT_ROADMAP.map((item) => (
              <div
                key={item.phase}
                className="flex flex-col justify-between border border-line bg-surface/80 p-4"
              >
                <div>
                  <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-accent">
                    {item.phase}
                  </span>
                  <h4 className="mt-1.5 font-display text-[1.0625rem] text-ink">
                    {item.title}
                  </h4>
                  <p className="mt-1 font-mono text-[0.6875rem] text-muted">
                    {item.cadence}
                  </p>
                  <p className="mt-2.5 font-body text-[0.8125rem] leading-relaxed text-ink/80">
                    {item.deliverables}
                  </p>
                </div>
                <p className="mt-3 border-t border-line/60 pt-2 font-mono text-[0.6875rem] text-muted">
                  Phê duyệt: {item.approvalOwner}
                </p>
              </div>
            ))}
          </div>

          {/* 6 Showcase Projects Cards */}
          <div className="grid gap-5 md:grid-cols-2">
            {SOCIAL_SHOWCASE_PROJECTS.map((project) => {
              const isCopied = copiedProjectId === project.id
              return (
                <article
                  key={project.id}
                  className="flex flex-col justify-between border border-line bg-canvas p-5 transition-all duration-300 hover:border-accent"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                      <div className="flex items-center gap-2">
                        <span className="bg-espresso px-2 py-0.5 font-mono text-[0.6875rem] font-semibold text-canvas">
                          {project.code}
                        </span>
                        <span className="font-mono text-[0.75rem] text-accent font-medium">
                          {project.style}
                        </span>
                      </div>
                      <span className="font-mono text-[0.6875rem] text-muted">
                        {project.scheduleSlot}
                      </span>
                    </div>

                    <h4 className="mt-3.5 font-display text-[1.25rem] leading-snug text-ink">
                      {project.title}
                    </h4>
                    <p className="mt-1 font-body text-[0.8125rem] text-muted">
                      {project.location} · Diện tích: <strong className="font-medium text-ink">{project.area}</strong> · Bảo chứng: <strong className="font-medium text-accent">{project.keyMetric}</strong>
                    </p>

                    <div className="mt-3 border-l-2 border-accent/60 bg-surface/60 px-3 py-2">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                        Vật liệu & Thông số nghiên cứu (Research Specs):
                      </span>
                      <p className="mt-0.5 font-body text-[0.8125rem] text-ink/90">
                        {project.materials}
                      </p>
                    </div>

                    <div className="mt-3.5 flex flex-col gap-2.5">
                      {(briefFilter === 'all' || briefFilter === 'facebook') && (
                        <div className="border border-line/80 bg-surface/40 p-3">
                          <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-ink">
                            ● Kịch bản Facebook (Case Study & Album):
                          </span>
                          <p className="mt-1 font-body text-[0.8125rem] leading-relaxed text-ink/80">
                            {project.facebookBrief}
                          </p>
                        </div>
                      )}

                      {(briefFilter === 'all' || briefFilter === 'tiktok') && (
                        <div className="border border-line/80 bg-surface/40 p-3">
                          <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-accent">
                            ▶ Kịch bản TikTok / Reels (Hook 3s & 60s):
                          </span>
                          <p className="mt-1 font-body text-[0.8125rem] leading-relaxed text-ink/80">
                            {project.tiktokBrief}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3.5">
                    <button
                      type="button"
                      onClick={() => handleCopyProjectBrief(project)}
                      className="inline-flex items-center gap-1.5 border border-line bg-surface px-3 py-1.5 font-mono text-[0.75rem] text-ink transition-colors hover:border-accent hover:text-accent cursor-pointer"
                    >
                      <span>{isCopied ? '✓ Đã sao chép Brief dự án' : 'Sao chép Brief dự án'}</span>
                    </button>

                    <Link
                      href={project.slug}
                      onClick={closeModal}
                      className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-ink"
                    >
                      <span>Xem hồ sơ dự án</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Studio Particulars Footer Strip */}
        <div className="flex flex-col gap-4 border-t border-line bg-surface/70 p-5 text-[0.8125rem] text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-ink flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Công ty TNHH Kiến Trúc & Xây Dựng GuHomes
            </span>
            <span>Studio: 14 Đường 41, Phường An Khánh, TP. Hồ Chí Minh</span>
            <span>Xưởng mộc may đo trực tiếp: Thạnh Xuân, Quận 12 (1.200m²), TP. Hồ Chí Minh</span>
          </div>
          <div className="text-left md:text-right">
            <span className="italic font-display text-ink/80">&ldquo;Your Peace, Our Craft — Tận Tâm Trọn Vẹn&rdquo;</span>
            <p className="mt-0.5 text-accent font-medium">Kiến tạo không gian, nâng tầm phong cách sống.</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
