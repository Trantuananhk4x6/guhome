'use client'

import Link from 'next/link'
import { useState } from 'react'

import { ArrowUpRightIcon } from '@/components/ui/icons'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useToast } from '@/components/ui/Toast'
import {
  SOCIAL_CHANNELS,
  SOCIAL_CONTENT_ROADMAP,
  SOCIAL_SHOWCASE_PROJECTS,
  useSocialModalStore,
  type SocialProjectShowcaseItem,
} from '@/lib/social'
import { cn } from '@/lib/utils'

export function StudioSocialShowcaseSection() {
  const { openModal } = useSocialModalStore()
  const { toast } = useToast()
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'facebook' | 'tiktok'>('all')

  const handleCopyBrief = async (project: SocialProjectShowcaseItem) => {
    const text = [
      `[HỒ SƠ CONTENT DỰ ÁN GUHOMES — ${project.code}]`,
      `Dự án: ${project.title}`,
      `Khu vực: ${project.location} | Diện tích: ${project.area} | Phong cách: ${project.style}`,
      `Vật liệu chủ đạo: ${project.materials}`,
      `Bảo chứng kỹ thuật: ${project.keyMetric}`,
      `Lịch phát sóng: ${project.scheduleSlot}`,
      `• BRIEF FACEBOOK: ${project.facebookBrief}`,
      `• BRIEF TIKTOK: ${project.tiktokBrief}`,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(project.id)
      toast({
        title: 'Đã sao chép Brief dự án',
        description: `Đã lưu nội dung kịch bản Facebook & TikTok của "${project.title}".`,
        tone: 'success',
      })
      setTimeout(() => setCopiedId(null), 2200)
    } catch {
      toast({
        title: 'Không thể sao chép',
        description: 'Vui lòng thử lại hoặc sao chép thủ công.',
        tone: 'error',
      })
    }
  }

  return (
    <section id="kenh-truyen-thong" className="u-gutter mt-[var(--spacing-section)] scroll-mt-28">
      <div className="mx-auto w-full max-w-[110rem]">
        <SectionHeading
          eyebrow="Hệ sinh thái truyền thông & Nhật ký công trình"
          index={4}
          title="07 Kênh kết nối chính thức & Lịch trình 06 dự án trọng điểm trên Facebook / TikTok."
          lead="Tại GuHomes, truyền thông không phải là những lời quảng cáo bóng bẩy, mà là cuốn nhật ký minh bạch ghi lại quá trình biến bản vẽ kỹ thuật 1:5 và phôi gỗ tại xưởng Thạnh Xuân (Quận 12) thành không gian sống thực tế."
        />

        {/* 7 Official Channels Interactive Grid */}
        <div className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
            <span className="u-label text-accent">
              01 · Danh bạ 07 Kênh Truyền Thông Chính Thức (Bấm vào từng kênh để mở Hồ sơ & Mã QR)
            </span>
            <button
              type="button"
              onClick={() => openModal('facebook', 'channel')}
              className="font-mono text-[0.75rem] font-medium text-ink underline decoration-accent/50 underline-offset-4 transition-colors hover:text-accent cursor-pointer"
            >
              Mở bảng tổng hợp 07 kênh & Mã QR ↗
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SOCIAL_CHANNELS.map((channel, idx) => (
              <div
                key={channel.id}
                className={cn(
                  'group flex flex-col justify-between border border-line bg-surface p-6 transition-all duration-300 hover:border-accent hover:bg-canvas hover:shadow-xs',
                  idx === 0 && 'sm:col-span-2',
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 border-b border-line/70 pb-3">
                    <span className="inline-flex items-center gap-2 font-display text-[1.25rem] text-ink group-hover:text-accent">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      {channel.label}
                    </span>
                    <span className="border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider text-accent">
                      {channel.badge}
                    </span>
                  </div>

                  <p className="mt-3 font-mono text-[0.75rem] text-muted">
                    {channel.handle} · <span className="text-ink/85">{channel.schedule}</span>
                  </p>

                  <p className="mt-2.5 font-body text-[0.875rem] leading-relaxed text-ink/80">
                    {channel.summary}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-3.5">
                  <button
                    type="button"
                    onClick={() => openModal(channel.id, 'channel')}
                    className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] font-medium text-accent transition-colors hover:text-ink cursor-pointer"
                  >
                    <span>[Xem Hồ sơ & Mã QR]</span>
                  </button>

                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 font-mono text-[0.75rem] text-muted transition-colors hover:text-ink"
                  >
                    <span>Mở kênh</span>
                    <ArrowUpRightIcon className="text-xs" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3-Phase Content Roadmap */}
        <div className="mt-16 border border-line bg-espresso p-7 text-canvas sm:p-10">
          <div className="flex flex-col gap-3 border-b border-canvas/15 pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="u-label text-accent-soft">
                02 · Kế hoạch phát sóng nội dung (Content Roadmap — Facebook & TikTok)
              </span>
              <h3 className="mt-2 font-display text-[1.5rem] font-normal text-canvas sm:text-[1.875rem]">
                Lịch trình xuất bản & Quy chuẩn kiểm duyệt chuyên môn từ KTS Trưởng
              </h3>
            </div>
            <button
              type="button"
              onClick={() => openModal('facebook', 'projects')}
              className="inline-flex items-center gap-2 self-start border border-accent-soft/50 bg-accent/20 px-4 py-2 font-mono text-[0.75rem] uppercase tracking-wider text-accent-soft transition-colors hover:bg-accent hover:text-canvas cursor-pointer"
            >
              <span>Mở chế độ toàn màn hình trong hộp thoại</span>
              <span>↗</span>
            </button>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {SOCIAL_CONTENT_ROADMAP.map((phase) => (
              <div
                key={phase.phase}
                className="flex flex-col justify-between border border-canvas/15 bg-canvas/5 p-5"
              >
                <div>
                  <span className="font-mono text-[0.75rem] font-semibold uppercase tracking-wider text-accent-soft">
                    {phase.phase}
                  </span>
                  <h4 className="mt-2 font-display text-[1.25rem] text-canvas">
                    {phase.title}
                  </h4>
                  <p className="mt-1.5 font-mono text-[0.75rem] text-canvas/60">
                    {phase.cadence}
                  </p>
                  <p className="mt-3 font-body text-[0.875rem] leading-relaxed text-canvas/80">
                    {phase.deliverables}
                  </p>
                </div>
                <p className="mt-4 border-t border-canvas/10 pt-3 font-mono text-[0.6875rem] text-accent-soft/90">
                  ✓ {phase.approvalOwner}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Flagship Showcase Projects with FB & TikTok Briefs */}
        <div className="mt-16">
          <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="u-label text-accent">
                03 · Danh mục 06 Dự Án Trọng Điểm Lên Sóng Facebook & TikTok (Research & Content Brief)
              </span>
              <h3 className="mt-2 font-display text-[1.625rem] font-normal text-ink sm:text-[2rem]">
                Hồ sơ nghiên cứu vật liệu & kịch bản truyền thông 06 công trình thực tế
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={cn(
                  'border px-3.5 py-1.5 font-mono text-[0.75rem] transition-colors cursor-pointer',
                  activeFilter === 'all'
                    ? 'border-espresso bg-espresso text-canvas font-medium'
                    : 'border-line bg-surface text-muted hover:text-ink',
                )}
              >
                Tất cả (FB + TikTok)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('facebook')}
                className={cn(
                  'border px-3.5 py-1.5 font-mono text-[0.75rem] transition-colors cursor-pointer',
                  activeFilter === 'facebook'
                    ? 'border-accent bg-accent text-canvas font-medium'
                    : 'border-line bg-surface text-muted hover:text-ink',
                )}
              >
                Brief Facebook
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('tiktok')}
                className={cn(
                  'border px-3.5 py-1.5 font-mono text-[0.75rem] transition-colors cursor-pointer',
                  activeFilter === 'tiktok'
                    ? 'border-accent bg-accent text-canvas font-medium'
                    : 'border-line bg-surface text-muted hover:text-ink',
                )}
              >
                Brief TikTok 60s
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {SOCIAL_SHOWCASE_PROJECTS.map((project) => {
              const isCopied = copiedId === project.id
              return (
                <article
                  key={project.id}
                  className="flex flex-col justify-between border border-line bg-surface p-6 sm:p-8 transition-all duration-300 hover:border-accent"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="bg-espresso px-2.5 py-0.5 font-mono text-[0.75rem] font-semibold text-canvas">
                          {project.code}
                        </span>
                        <span className="font-mono text-[0.75rem] font-medium text-accent">
                          {project.style}
                        </span>
                      </div>
                      <span className="font-mono text-[0.75rem] text-muted">
                        {project.scheduleSlot}
                      </span>
                    </div>

                    <h4 className="mt-4 font-display text-[1.375rem] font-normal text-ink">
                      {project.title}
                    </h4>
                    <p className="mt-1 font-body text-[0.875rem] text-muted">
                      {project.location} · Quy mô: <strong className="font-medium text-ink">{project.area}</strong> · Chỉ số: <strong className="font-medium text-accent">{project.keyMetric}</strong>
                    </p>

                    <div className="mt-4 border-l-2 border-accent bg-canvas p-3.5">
                      <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                        Vật liệu & Cấu tạo nghiên cứu (Research Specs):
                      </span>
                      <p className="mt-1 font-body text-[0.875rem] text-ink/90">
                        {project.materials}
                      </p>
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                      {(activeFilter === 'all' || activeFilter === 'facebook') && (
                        <div className="border border-line bg-canvas/80 p-3.5">
                          <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-ink">
                            ● Góc khai thác Facebook (Case Study & Album):
                          </span>
                          <p className="mt-1 font-body text-[0.8125rem] leading-relaxed text-ink/80">
                            {project.facebookBrief}
                          </p>
                        </div>
                      )}

                      {(activeFilter === 'all' || activeFilter === 'tiktok') && (
                        <div className="border border-line bg-canvas/80 p-3.5">
                          <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-accent">
                            ▶ Góc khai thác TikTok / Reels (Hook 3s & Kịch bản 60s):
                          </span>
                          <p className="mt-1 font-body text-[0.8125rem] leading-relaxed text-ink/80">
                            {project.tiktokBrief}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <button
                      type="button"
                      onClick={() => handleCopyBrief(project)}
                      className="inline-flex items-center gap-1.5 border border-line bg-canvas px-3.5 py-2 font-mono text-[0.75rem] text-ink transition-colors hover:border-accent hover:text-accent cursor-pointer"
                    >
                      <span>{isCopied ? '✓ Đã sao chép Brief dự án' : 'Sao chép Brief dự án'}</span>
                    </button>

                    <Link
                      href={project.slug}
                      className="inline-flex items-center gap-1.5 font-mono text-[0.75rem] font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-ink"
                    >
                      <span>Xem hồ sơ chi tiết dự án</span>
                      <ArrowUpRightIcon className="text-xs" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
