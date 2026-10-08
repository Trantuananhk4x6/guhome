'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { useSocialModalStore } from '@/lib/social'
import { CheckIcon, ArrowUpRightIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface GuaranteeItem {
  id: string
  code: string
  title: string
  tagline: string
  description: string
  legalCommitment: string
  icon: string
  metrics: string
}

const GUARANTEES: readonly GuaranteeItem[] = [
  {
    id: 'no-cost-overrun',
    code: '01',
    title: 'Không Phát Sinh Chi Phí 0%',
    tagline: 'Minh bạch từng milimet vật tư — Chốt giá trước khi khởi công.',
    description:
      'Hồ sơ bóc tách khối lượng dự toán (BOQ) của GuHomes chi tiết tới từng bản lề giảm chấn, từng mét ray trượt và từng mét vuông đá. Khi bản vẽ thi công đã được gia chủ duyệt, ngân sách là bất di bất dịch.',
    legalCommitment:
      'Cam kết trong hợp đồng: Mọi phát sinh xuất phát từ sai sót kỹ thuật hoặc tính toán của GuHomes, chúng tôi chịu trách nhiệm chi trả 100%.',
    icon: '🛡️',
    metrics: '0% Chi Phí Ẩn',
  },
  {
    id: 'no-delay',
    code: '02',
    title: 'Không Chậm Trễ Tiến Độ',
    tagline: 'Bàn giao chìa khóa đúng ngày hoàng đạo đã chọn.',
    description:
      'Thời gian là tài sản quý báu của gia chủ. Với quy trình điều phối xưởng mộc khép kín và lịch trình kiểm định 5 bước, chúng tôi quản trị tiến độ từng ngày bằng nhật ký công trường số hóa.',
    legalCommitment:
      'Điều khoản phạt chậm tiến độ rõ ràng bằng văn bản pháp lý: Bồi thường tài chính trực tiếp trên mỗi ngày bàn giao trễ hạn.',
    icon: '⏳',
    metrics: 'Đúng Hẹn 100%',
  },
  {
    id: 'no-subcontracting',
    code: '03',
    title: 'Không Bán Thầu — Không Trung Gian',
    tagline: 'Xưởng mộc 1.200m² trực thuộc — KTS Trưởng giám sát hiện trường.',
    description:
      'Tuyệt đối không chuyển nhượng thầu phụ kiếm chênh lệch. Toàn bộ hệ tủ, đảo bếp, vách ốp được sản xuất tại xưởng mộc GuHomes tại Thạnh Xuân, Quận 12 bởi đội ngũ thợ lành nghề gắn bó trên 8 năm.',
    legalCommitment:
      'Gia chủ luôn có quyền đến trực tiếp xưởng kiểm tra mộc thô, ký tên lên phôi gỗ trước khi tiến hành quy trình sơn phủ 5 lớp.',
    icon: '🪵',
    metrics: '1.200m² Xưởng Trực Thuộc',
  },
  {
    id: 'no-counterfeit',
    code: '04',
    title: 'Không Tráo Đổi Vật Liệu',
    tagline: 'Vật liệu chính hãng 100% có mã QR truy xuất nguồn gốc.',
    description:
      'Từ ván MDF lõi xanh chống ẩm An Cường chuẩn E1, đá cẩm thạch tự nhiên Ý đến phụ kiện kim khí Blum và Hafele chuẩn Đức. Mọi kiện hàng chuyển đến công trình đều nguyên đai nguyên kiện kèm phiếu kiểm định.',
    legalCommitment:
      'Bồi thường gấp 3 lần giá trị hợp đồng nếu phát hiện bất kỳ vật tư, phụ kiện tráo đổi sai lệch so với hồ sơ cam kết.',
    icon: '💎',
    metrics: 'Cam Kết Đền Gấp 3 Lần',
  },
]

const MARKETING_PERKS = [
  {
    badge: 'Đặc Quyền Vàng',
    title: 'Hoàn Tiền 100% Phí Thiết Kế',
    detail: 'Khấu trừ toàn bộ 100% chi phí thiết kế 3D & hồ sơ kỹ thuật 1:5 ngay khi gia chủ ký hợp đồng thi công trọn gói.',
  },
  {
    badge: 'An Tâm Dài Lâu',
    title: 'Bảo Hành 24 Tháng & Bảo Trì 6 Tháng/Lần',
    detail: 'Chế độ bảo hành kết cấu 24 tháng, hỗ trợ kiểm tra định kỳ 6 tháng/lần miễn phí trọn đời công trình bởi đội ngũ kỹ thuật GuHomes.',
  },
  {
    badge: 'Xúc Giác Thực Tế',
    title: 'Gửi Tặng Hộp Mẫu Vật Liệu Tận Nhà',
    detail: 'Trải nghiệm trực tiếp bề mặt gỗ óc chó sấy, đá travertine tự nhiên và kim khí đồng thau trước khi duyệt phương án.',
  },
]

export function GuHomesMarketingTrustPledge({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<string>(GUARANTEES[0]?.id ?? 'no-cost-overrun')
  const { openQuoteModal } = useQuickQuote()
  const { openModal: openSocialModal } = useSocialModalStore()

  const currentGuarantee = GUARANTEES.find((g) => g.id === activeTab) ?? GUARANTEES[0]!

  return (
    <section
      aria-label="Bảo chứng chất lượng và cam kết vàng GuHomes"
      className={cn('u-gutter relative overflow-hidden py-20 lg:py-28', className)}
    >
      {/* Background Ambience: Subtle Warm Architectural Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-radial from-accent/[0.04] via-transparent to-transparent opacity-80"
      />

      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-12 lg:flex-row lg:items-end">
          <div className="max-w-[48rem]">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Cam Kết Vàng Marketing & Đảm Bảo Quyền Lợi
              </span>
            </div>
            <h2 className="mt-4 font-display text-[2rem] font-normal leading-[1.2] text-ink sm:text-[2.625rem] lg:text-[3.125rem]">
              Bảo chứng <span className="italic text-accent">“4 Không”</span> xóa tan mọi âu lo khi làm nhà.
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink/75 sm:text-lg">
              Làm nhà là cột mốc lớn của một đời người. Thấu hiểu những trăn trở về chi phí phát sinh,
              tiến độ chậm trễ và nỗi sợ vật tư giả, GuHomes thiết lập bộ cam kết thép bằng văn bản pháp lý —
              để mỗi bước chân bạn về tổ ấm mới luôn tràn đầy niềm an tâm tuyệt đối.
            </p>
          </div>

          {/* Trust Seal Badge */}
          <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-accent/30 bg-surface/90 p-5 shadow-xl backdrop-blur-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15 text-2xl text-accent font-serif">
              🏛️
            </div>
            <div>
              <div className="font-display text-sm font-medium text-ink">Bảo Chứng Trách Nhiệm</div>
              <div className="font-mono text-xs text-accent">Hợp Đồng Pháp Lý Minh Bạch</div>
              <div className="mt-1 font-body text-[0.75rem] text-muted">105+ Công Trình Hoàn Thiện Thực Tế</div>
            </div>
          </div>
        </div>

        {/* 4 Guarantees Interactive Grid */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Tab Selector Buttons (Left Column) */}
          <div className="flex flex-col gap-3 lg:col-span-5">
            {GUARANTEES.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    'group relative flex w-full flex-col items-start rounded-xl border p-5 text-left transition-all duration-300',
                    isActive
                      ? 'border-accent bg-espresso text-canvas shadow-xl shadow-accent/10 translate-x-1.5'
                      : 'border-line bg-surface hover:border-accent/40 hover:bg-surface-alt hover:text-ink',
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={cn(
                        'font-mono text-xs font-semibold tracking-wider',
                        isActive ? 'text-accent-soft' : 'text-muted group-hover:text-accent',
                      )}
                    >
                      TIÊU CHUẨN {item.code}
                    </span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 font-mono text-[0.6875rem]',
                        isActive
                          ? 'border border-accent/40 bg-accent/20 text-accent-soft'
                          : 'bg-muted/10 text-muted',
                      )}
                    >
                      {item.metrics}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      'mt-2 font-display text-lg font-medium transition-colors',
                      isActive ? 'text-canvas' : 'text-ink group-hover:text-accent',
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-1 font-body text-xs line-clamp-1',
                      isActive ? 'text-canvas/75' : 'text-muted',
                    )}
                  >
                    {item.tagline}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Active Guarantee Details Card (Right Column) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-accent/40 bg-surface p-8 shadow-2xl backdrop-blur-xl lg:col-span-7 sm:p-10">
            {/* Watermark Code */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -bottom-8 select-none font-display text-[9rem] font-bold tracking-tighter text-ink/[0.03]"
            >
              {currentGuarantee.code}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentGuarantee.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="relative z-10 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center gap-3 border-b border-line pb-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-xl">
                      {currentGuarantee.icon}
                    </span>
                    <div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
                        Cam Kết Pháp Lý Chuẩn Mực
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl font-normal text-ink">
                        {currentGuarantee.title}
                      </h4>
                    </div>
                  </div>

                  <p className="mt-6 font-body text-base sm:text-[1.0625rem] leading-[1.8] text-ink/90">
                    {currentGuarantee.description}
                  </p>

                  <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-4 sm:p-5">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Điều khoản chế tài hợp đồng:
                    </div>
                    <p className="mt-2 font-body text-sm leading-relaxed text-ink/85 italic">
                      “{currentGuarantee.legalCommitment}”
                    </p>
                  </div>
                </div>

                {/* Call to Action Inside Card */}
                <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                  <button
                    type="button"
                    onClick={() => openQuoteModal()}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 font-display text-sm font-medium text-canvas shadow-lg transition-all duration-300 hover:bg-accent-hover hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>Dự toán 15 phút không phát sinh</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => openSocialModal()}
                    className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 font-body text-sm font-medium text-ink transition-all duration-300 hover:border-accent hover:bg-surface-alt hover:text-accent"
                  >
                    <span>Tư vấn trực tiếp cùng KTS Trưởng</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3 VIP Marketing Perks */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {MARKETING_PERKS.map((perk, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col justify-between rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:border-accent hover:shadow-lg hover:shadow-accent/5"
            >
              <div>
                <span className="inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-0.5 font-mono text-[0.6875rem] font-medium text-accent uppercase tracking-wider">
                  {perk.badge}
                </span>
                <h4 className="mt-3 font-display text-base sm:text-lg font-medium text-ink transition-colors group-hover:text-accent">
                  {perk.title}
                </h4>
                <p className="mt-2 font-body text-xs sm:text-sm leading-relaxed text-muted">
                  {perk.detail}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 font-mono text-[0.6875rem] text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span>Áp dụng toàn bộ công trình 2026</span>
                <CheckIcon className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
