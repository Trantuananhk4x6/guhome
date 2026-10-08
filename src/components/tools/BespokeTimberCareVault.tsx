'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface SpaStep {
  stepNumber: string
  titleVi: string
  subtitleVi: string
  toolVi: string
  outcomeVi: string
  tagVi: string
  icon: string
  descriptionVi: string
}

const SPA_STEPS: SpaStep[] = [
  {
    stepNumber: '01',
    titleVi: 'Đo Kiểm Độ Ẩm Cân Bằng Gỗ (EMC) 6 Điểm',
    subtitleVi: 'Electronic Moisture Audit · Máy Đo Delmhorst USA',
    toolVi: 'Máy đo điện trở Delmhorst J-2000 độ sâu 20mm',
    outcomeVi: 'Xác định chính xác độ ẩm cân bằng thớ gỗ dao động từ 10% – 12% EMC',
    tagVi: 'Chẩn Đoán Sớm · Ngừa Cong Vênh',
    icon: '📊',
    descriptionVi:
      'Nghệ nhân dùng đầu kim vi mô đo độ ẩm tại 6 vị trí trọng yếu: gầm bàn ăn, mép chân tủ áo, vách ốp đầu giường, sàn gỗ phòng khách. Nếu phát hiện điểm ẩm tăng cao bất thường do hơi máy lạnh ngưng tụ, KTS sẽ cân chỉnh luồng gió điều hòa ngay.',
  },
  {
    stepNumber: '02',
    titleVi: 'Cân Chỉnh Bản Lề Âm Blum & Ray Trượt Dung Sai 0.1mm',
    subtitleVi: 'Kinematic Re-Alignment · Dung Sai Vi Mô 0.1mm',
    toolVi: 'Thước điện tử Mitutoyo & bộ vặn tinh chỉnh cơ khí Blum',
    outcomeVi: 'Đưa toàn bộ khe hở cánh tủ về chuẩn 2.5mm đều tăm tắp, đóng mở êm ru',
    tagVi: 'Chuyển Động Êm Ái · Chuẩn Xác',
    icon: '🔧',
    descriptionVi:
      'Sau 6 tháng sử dụng liên tục, độ dãn nở theo mùa của gỗ có thể làm cánh tủ xê dịch vi mô. Nghệ nhân cân chỉnh 3 chiều (cao độ, chiều sâu, độ nghiêng) của bản lề Blum Clip Top Blumotion, triệt tiêu hoàn toàn tiếng cọ xát và bảo đảm đóng mở nhẹ như tơ.',
  },
  {
    stepNumber: '03',
    titleVi: 'Đánh Bóng Mờ Thủ Công Bằng Dầu Osmo Polyx-Oil Đức',
    subtitleVi: 'Hand-Rubbed Wood Oiling · Xóa Mờ Vết Trầy Xước Nhẹ',
    toolVi: 'Dầu sáp cứng Osmo 3032 nguồn gốc sáp ong tự nhiên & nỉ len cừu',
    outcomeVi: 'Làm mờ 99% các vết xước dăm do móng tay, hồi sinh màu gỗ óc chó sâu lắng',
    tagVi: 'Nuôi Dưỡng Thớ Gỗ · Mộc Mờ Tự Nhiên',
    icon: '✨',
    descriptionVi:
      'Khác với sơn bóng PU dễ bị ố trắng khi trầy xước, gỗ tự nhiên lau dầu Osmo có thể tự hồi phục bề mặt. Nghệ nhân dùng nỉ len cừu xoa đều dầu sáp thực vật theo chiều thớ vân, nuôi dưỡng tế bào gỗ không bị khô nứt và tỏa ánh sáng satin sang trọng.',
  },
  {
    stepNumber: '04',
    titleVi: 'Xông Tinh Dầu Trầm Hương Khử Khuẩn Hệ Tủ Áo',
    subtitleVi: 'Sacred Agarwood Purification · Chống Nấm Mốc Mùa Mưa',
    toolVi: 'Lư xông trầm gốm tro mờ Bát Tràng & dăm trầm tự nhiên Khánh Hòa',
    outcomeVi: 'Khử sạch mùi ẩm mốc, lưu giữ hương thơm thanh khiết trên từng thớ vải nhung',
    tagVi: 'Thanh Tịnh Không Gian · Xua Đuổi Mối Mọt',
    icon: '🪔',
    descriptionVi:
      'Bước hoàn tất là nghi thức xông hương thanh tẩy. Khói trầm hương tự nhiên len lỏi vào từng hộc kéo và góc tủ quần áo walk-in closet, diệt trừ mầm mống nấm mốc trong mùa mưa ngâu và để lại hương thơm thanh tao sang trọng lưu truyền nhiều tháng.',
  },
]

export function BespokeTimberCareVault({ className }: { className?: string } = {}) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0)
  const [lookupQuery, setLookupQuery] = useState<string>('')
  const [isSearched, setIsSearched] = useState<boolean>(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false)
  const [clientName, setClientName] = useState<string>('')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [preferredDate, setPreferredDate] = useState<string>('')
  const [isBooked, setIsBooked] = useState<boolean>(false)

  const activeStep = SPA_STEPS[activeStepIndex] ?? SPA_STEPS[0]!

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault()
    if (lookupQuery.trim().length > 0) {
      setIsSearched(true)
    }
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsBooked(true)
  }

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Đặc Quyền Hậu Mãi · GuHomes White-Glove VIP Care
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Miễn Phí 6 Tháng / Lần
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Cổng Đặt Lịch Nghệ Nhân Dưỡng Gỗ Tận Gia VIP Care
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              Đồ nội thất gỗ tự nhiên may đo cần được nâng niu như tác phẩm nghệ thuật. GuHomes cử các nghệ nhân lành
              nghề từ Xưởng Thạnh Xuân đến tận nhà kiểm tra độ ẩm, cân chỉnh khe tủ và lau dầu Osmo định kỳ cho gia chủ.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Cam kết phục vụ:</span>
            <span className="text-xs font-mono font-medium text-ink bg-canvas px-3 py-1.5 rounded-full border border-line">
              5 Năm Đầu Miễn Phí · Xưởng Thạnh Xuân
            </span>
          </div>
        </div>

        {/* Digital Warranty & Care Verification Lookup Bar */}
        <div className="mt-8 rounded-2xl border border-line bg-canvas p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-line/60 pb-5">
            <div>
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Tra Cứu Hồ Sơ Bảo Trì &amp; Nhật Ký Dưỡng Gỗ
              </span>
              <div className="text-sm font-serif text-ink mt-0.5">
                Nhập mã định danh VIP Card hoặc số điện thoại ký hợp đồng để kiểm tra lịch bảo dưỡng
              </div>
            </div>

            <form onSubmit={handleLookup} className="flex items-center gap-2">
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Ví dụ: GU-VIP-2026 hoặc 090xxx"
                className="rounded-xl border border-line bg-surface px-4 py-2 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none min-w-[220px]"
              />
              <button
                type="submit"
                className="min-h-[44px] px-5 py-2 rounded-xl bg-accent text-canvas text-xs font-semibold hover:bg-accent-hover transition-all"
              >
                Tra Cứu
              </button>
            </form>
          </div>

          {/* Searched Status Feedback */}
          {isSearched && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl border border-accent/20 bg-accent/5 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-mono text-accent font-bold">✓ ĐÃ XÁC THỰC HỢP ĐỒNG:</span>
                <span className="text-ink ml-2 font-medium">Biệt thự Penthouse · Mã bảo lãnh {lookupQuery.toUpperCase()}</span>
                <div className="text-muted text-[11px] mt-0.5">
                  Đợt bảo dưỡng kế tiếp: Tháng 11/2026 · Tình trạng mộc: 11.2% EMC ổn định hoàn hảo
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="min-h-[40px] px-4 py-1.5 rounded-lg bg-accent text-canvas font-bold text-xs hover:bg-accent-hover transition-all shrink-0"
              >
                Đặt Nghệ Nhân Đến Nhà Ngay
              </button>
            </motion.div>
          )}
        </div>

        {/* 4-Step "Home Wood Spa" Protocol Visual Steps */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPA_STEPS.map((step, idx) => {
            const isSelected = activeStepIndex === idx

            return (
              <button
                key={step.stepNumber}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={cn(
                  'group relative text-left rounded-xl p-5 border transition-all duration-300 min-h-[170px] flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-canvas ring-1 ring-accent/30 shadow-md'
                    : 'border-line bg-canvas/60 hover:border-line-hover hover:bg-canvas'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{step.icon}</span>
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full font-bold',
                        isSelected ? 'bg-accent text-canvas' : 'bg-surface text-muted'
                      )}
                    >
                      BƯỚC {step.stepNumber}
                    </span>
                  </div>

                  <div className="mt-3 font-serif text-sm font-medium text-ink group-hover:text-accent leading-snug">
                    {step.titleVi}
                  </div>
                  <div className="mt-1 text-xs text-muted line-clamp-1">{step.tagVi}</div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeSpaStepIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Step Deep-Dive & Booking Action Stage */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Detailed Step Description */}
          <div className="lg:col-span-8 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <span className="text-3xl">{activeStep.icon}</span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Quy Trình Chuẩn Bước {activeStep.stepNumber} / 04
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                    {activeStep.titleVi}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-muted font-light leading-relaxed">
                {activeStep.descriptionVi}
              </p>

              {/* Tools & Outcome Readout Cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <span className="text-[10px] font-mono uppercase text-muted">Thiết Bị &amp; Vật Liệu Sử Dụng</span>
                  <div className="mt-1 text-ink font-medium leading-relaxed">{activeStep.toolVi}</div>
                </div>

                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <span className="text-[10px] font-mono uppercase text-muted">Kết Quả Đạt Được</span>
                  <div className="mt-1 text-accent font-medium leading-relaxed">{activeStep.outcomeVi}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs text-muted">
              <span>Được thực hiện bởi thợ cả mộc có trên 15 năm kinh nghiệm Xưởng Thạnh Xuân.</span>
              <a href="tel:0368757916" className="text-accent font-mono font-semibold hover:underline">
                Hotline VIP: 0368 757 916
              </a>
            </div>
          </div>

          {/* Right Column: Direct Booking Dispatch */}
          <div className="lg:col-span-4 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="border-b border-line pb-4 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">Đặt Lịch Nghệ Nhân</span>
                <span className="text-xs font-mono bg-accent/10 text-accent px-2.5 py-0.5 rounded-full font-bold">
                  Tận Gia
                </span>
              </div>

              <div className="mt-5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Thời lượng dịch vụ:</span>
                  <span className="font-mono text-ink font-bold">120 Phút / Lần</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Chi phí gia chủ trả:</span>
                  <span className="font-mono text-accent font-bold">0 VNĐ (5 Năm Đầu)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Địa bàn phục vụ:</span>
                  <span className="text-ink">Toàn bộ TP. Hồ Chí Minh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Vật tư dầu Osmo:</span>
                  <span className="text-ink">Nhập khẩu 100% Đức</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-line bg-surface/50 p-4 text-xs text-muted leading-relaxed">
                Gia chủ chỉ cần chọn ngày giờ thuận tiện, đội ngũ thợ lành nghề mang đầy đủ máy đo điện tử và dầu sáp
                đến phục vụ tận tâm.
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full min-h-[44px] rounded-xl bg-accent px-5 py-3 text-xs font-bold text-canvas shadow-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-2"
              >
                <span>Hẹn Nghệ Nhân Đến Nhà Ngay</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </button>

              <div className="mt-3 text-center text-[11px] text-muted">
                Phản hồi xác nhận lịch hẹn trong vòng 2 giờ.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingModalOpen(false)}
              className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-lg rounded-2xl border border-line bg-canvas p-6 sm:p-8 text-ink shadow-2xl z-10"
            >
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:text-ink"
              >
                ✕
              </button>

              {!isBooked ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-accent font-semibold">
                    <span>🪵</span>
                    <span>Đặc Quyền Dưỡng Gỗ Tận Gia · GuHomes VIP Care</span>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-light text-ink">
                    Đặt Lịch Nghệ Nhân Xưởng Thạnh Xuân
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    Nghệ nhân GuHomes sẽ mang thiết bị đo độ ẩm Delmhorst, dầu Osmo Đức và tinh dầu trầm hương đến bảo
                    dưỡng toàn diện tư gia của quý khách.
                  </p>

                  <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1">
                        Họ và Tên Gia Chủ
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1">
                        Số Điện Thoại Liên Hệ
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx xxx xxx"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1">
                        Ngày Giờ Thuận Tiện Nhất
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Thứ Bảy tuần này, 9:00 sáng"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full min-h-[44px] rounded-xl bg-accent px-5 py-3 text-xs font-bold text-canvas hover:bg-accent-hover transition-all"
                      >
                        Xác Nhận Đặt Lịch Bảo Dưỡng Miễn Phí
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-3xl text-accent">
                    ✓
                  </div>
                  <h4 className="mt-4 font-serif text-2xl font-light text-ink">Lịch Hẹn Đã Được Ghi Nhận</h4>
                  <p className="mt-2 text-xs sm:text-sm text-muted max-w-sm mx-auto">
                    KTS Trưởng xưởng Thạnh Xuân sẽ gọi điện đến số <span className="font-mono font-bold text-ink">{clientPhone}</span> trong vòng 2 giờ để xác nhận giờ nghệ nhân đến phục vụ tại tư gia của quý khách <span className="font-medium text-ink">{clientName}</span>.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsBooked(false)
                        setIsBookingModalOpen(false)
                      }}
                      className="min-h-[44px] rounded-xl bg-accent px-6 py-2.5 text-xs font-bold text-canvas hover:bg-accent-hover transition-all"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
