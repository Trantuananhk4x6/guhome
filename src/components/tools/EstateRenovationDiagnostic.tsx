'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type RenovationCategory = 'hvac-ceiling' | 'flooring' | 'layout-pivot' | 'lighting-knx' | 'cabinetry-kitchen'

interface DiagnosticItem {
  id: RenovationCategory
  titleVi: string
  subtitleVi: string
  icon: string
  currentDefectVi: string
  quietLuxurySolutionVi: string
  costMinMillion: number
  costMaxMillion: number
  daysConcurrent: number
  impactScore: number
  specsVi: string
}

const DIAGNOSTIC_ITEMS: Record<RenovationCategory, DiagnosticItem> = {
  'hvac-ceiling': {
    id: 'hvac-ceiling',
    titleVi: 'Trần Thạch Cao & Điều Hòa VRV',
    subtitleVi: 'Miệng Gió Nhựa ABS Chống Đọng Nồm & Bảo Ôn Kép',
    icon: '❄️',
    currentDefectVi: 'Miệng gió nhôm đọng sương nhỏ giọt, trần thạch cao ố vàng ẩm mốc, máy lạnh ồn ào gió buốt.',
    quietLuxurySolutionVi:
      'Thay bằng miệng gió khe dài Linear Slot chất liệu nhựa kỹ thuật ABS đúc nguyên khối chống đọng sương, bọc bảo ôn ống gió 2 lớp Superlon dày 25mm và hạ trần giật cấp tiêu âm giấu khe sáng.',
    costMinMillion: 45,
    costMaxMillion: 70,
    daysConcurrent: 10,
    impactScore: 20,
    specsVi: 'Miệng gió ABS đúc · Bảo ôn kép 25mm · Tiêu âm trần Rockwool 50kg/m³',
  },
  'flooring': {
    id: 'flooring',
    titleVi: 'Nâng Cấp Sàn Gỗ 5 Tầng Âm Thổ',
    subtitleVi: 'Solid Walnut / Teak Xẻ Tư Lau Dầu Osmo Đức',
    icon: '🪵',
    currentDefectVi: 'Gạch bóng kiếng bàn giao sẵn lạnh ngắt, trơn trượt mùa mưa, phát ra tiếng lộp cộp khó chịu.',
    quietLuxurySolutionVi:
      'Lột bỏ gạch cũ, thi công hệ sàn 5 tầng bảo vệ âm thổ: Sơn lót Epoxy khóa ẩm, cao su non Butyl tiêu âm ΔLw=21dB, cốt Plywood Bạch Dương và ván gỗ óc chó xẻ tư lau dầu thực vật Osmo.',
    costMinMillion: 95,
    costMaxMillion: 165,
    daysConcurrent: 14,
    impactScore: 25,
    specsVi: 'Epoxy khóa ẩm · Cao su Butyl 3mm · Plywood Birch WBP · Solid Walnut 18mm',
  },
  'layout-pivot': {
    id: 'layout-pivot',
    titleVi: 'Tái Cấu Trúc Mặt Bằng Mở & Hệ Vách Xoay',
    subtitleVi: 'Open-Plan Layout & 360° Teak Acoustic Pivot Screens',
    icon: '🏛️',
    currentDefectVi: 'Nhiều vách ngăn gạch bí bách, phòng ngủ phụ tù túng chặn đứng luồng gió đối lưu sông.',
    quietLuxurySolutionVi:
      'Phá dỡ vách ngăn không chịu lực, tạo mặt bằng thông thủy phòng khách liền bếp; bố trí hệ vách lam gỗ Teak xoay pivot 360° đóng mở linh hoạt điều tiết thông gió và tầm nhìn.',
    costMinMillion: 65,
    costMaxMillion: 110,
    daysConcurrent: 16,
    impactScore: 20,
    specsVi: 'Cốt thép gia cường · Bản lề sàn FritsJurgens Hà Lan xoay 500kg · Lam Teak tự nhiên',
  },
  'lighting-knx': {
    id: 'lighting-knx',
    titleVi: 'Hệ Thống Chiếu Sáng Warm Dim & Công Tắc KNX',
    subtitleVi: 'CRI 98 Warm Dimming (1800K - 3000K) & Phím Đồng Mộc',
    icon: '💡',
    currentDefectVi: 'Đèn downlight chói lòa ánh sáng trắng 6500K như bệnh viện, bảng công tắc nhựa rẻ tiền.',
    quietLuxurySolutionVi:
      'Tái lập kịch bản ánh sáng theo nhịp sinh học, đèn Warm Dim chỉnh mượt từ 1800K đến 3000K, chỉ số hoàn màu CRI 98 và bảng điều khiển cơ phay đồng thau mộc kết nối chuẩn KNX châu Âu.',
    costMinMillion: 55,
    costMaxMillion: 90,
    daysConcurrent: 12,
    impactScore: 15,
    specsVi: 'LED Bridgelux CRI 98 · Triac / DALI Dimmable · Phím cơ đồng thau mộc xước tay',
  },
  'cabinetry-kitchen': {
    id: 'cabinetry-kitchen',
    titleVi: 'Tủ Bếp & Hệ Tủ Âm May Đo Thủ Công',
    subtitleVi: 'Plywood Chống Nước Phủ Gỗ Tự Nhiên & Ray Âm Blum',
    icon: '🍳',
    currentDefectVi: 'Tủ bếp gỗ dán MDF thấm nước trương nở, phụ kiện rỉ sét kẹt rít, mặt đá nhân tạo ố vàng.',
    quietLuxurySolutionVi:
      'Thửa mới toàn bộ hệ tủ bếp bằng cốt Plywood phủ veneer Walnut xẻ rãnh âm không tay nắm, phụ kiện Blum Movento giảm chấn và mặt bàn đảo ốp đá Travertine Navona chống thấm 3 lớp.',
    costMinMillion: 140,
    costMaxMillion: 240,
    daysConcurrent: 22,
    impactScore: 20,
    specsVi: 'Plywood E0 phủ Walnut · Ray trượt Blum Tip-on Blumotion · Mặt đá Travertine Ý',
  },
}

export function EstateRenovationDiagnostic({ className }: { className?: string } = {}) {
  const [selectedItems, setSelectedItems] = useState<RenovationCategory[]>([
    'hvac-ceiling',
    'flooring',
    'cabinetry-kitchen',
  ])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [estateName, setEstateName] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const toggleItem = (id: RenovationCategory) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    )
  }

  // Calculate total costs
  const totalCostMin = selectedItems.reduce((acc, id) => acc + (DIAGNOSTIC_ITEMS[id]?.costMinMillion ?? 0), 0)
  const totalCostMax = selectedItems.reduce((acc, id) => acc + (DIAGNOSTIC_ITEMS[id]?.costMaxMillion ?? 0), 0)
  const totalScore = selectedItems.reduce((acc, id) => acc + (DIAGNOSTIC_ITEMS[id]?.impactScore ?? 0), 0)

  // Max concurrent days among selected
  const maxDays = Math.max(...selectedItems.map((id) => DIAGNOSTIC_ITEMS[id]?.daysConcurrent ?? 0), 35)

  const diagnosticCode = `GU-RENO-2026-X${selectedItems.length * 19}`

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Tái Sinh Không Gian Thượng Lưu · GuHomes Diagnostic
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Căn Hộ &amp; Biệt Thự TP.HCM
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Bộ Chẩn Đoán &amp; Bóc Tách Cải Tạo Quiet Luxury
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              Dành riêng cho gia chủ mua lại căn hộ cao cấp hoặc nhà phố cũ (Vinhomes Golden River, Thảo Điền, Phú Mỹ
              Hưng) muốn lột bỏ nội thất công nghiệp lỗi thời để kiến tạo tổ ấm tĩnh tại đúng Gu.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Phương pháp khảo sát:</span>
            <span className="text-xs font-mono font-medium text-ink bg-canvas px-3 py-1.5 rounded-full border border-line">
              Quét 3D Lidar Leica · Đo Nồm Ẩm
            </span>
          </div>
        </div>

        {/* Diagnostic Items Checklist Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-5">
          {(Object.keys(DIAGNOSTIC_ITEMS) as RenovationCategory[]).map((key) => {
            const item = DIAGNOSTIC_ITEMS[key]
            const isSelected = selectedItems.includes(key)

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItem(key)}
                className={cn(
                  'group relative text-left rounded-xl p-5 border transition-all duration-300 min-h-[220px] flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-accent/5 ring-1 ring-accent/30 shadow-md'
                    : 'border-line bg-canvas hover:border-line-hover hover:bg-surface/50 opacity-80'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-md border text-xs',
                        isSelected ? 'bg-accent text-canvas border-accent' : 'border-line text-muted'
                      )}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </div>

                  <div className="mt-4 font-serif text-base font-medium text-ink group-hover:text-accent">
                    {item.titleVi}
                  </div>
                  <div className="mt-1 text-xs text-muted line-clamp-1">{item.subtitleVi}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-line/60">
                  <div className="text-[11px] font-mono text-accent font-semibold">
                    {item.costMinMillion} – {item.costMaxMillion} Triệu
                  </div>
                  <div className="text-[10px] text-muted mt-0.5">Tiến độ: ~{item.daysConcurrent} ngày</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Summary Dashboard & Detailed Solutions */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Solution Comparison for Selected Items */}
          <div className="lg:col-span-8 rounded-2xl border border-line bg-canvas p-6 sm:p-8">
            <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal border-b border-line pb-4">
              Phương Án Khắc Phục Hiện Trạng ({selectedItems.length} Hạng Mục Đã Chọn)
            </h3>

            <div className="mt-6 space-y-6">
              {selectedItems.map((id) => {
                const item = DIAGNOSTIC_ITEMS[id]
                return (
                  <div key={item.id} className="rounded-xl border border-line bg-surface/40 p-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{item.icon}</span>
                        <h4 className="font-serif text-base text-ink font-medium">{item.titleVi}</h4>
                      </div>
                      <span className="text-xs font-mono text-accent font-semibold">
                        {item.costMinMillion} – {item.costMaxMillion} Triệu VNĐ
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                      <div className="rounded-lg bg-stone-900/5 dark:bg-stone-900/40 p-3 border border-red-500/20 text-stone-600 dark:text-stone-300">
                        <span className="font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider text-[10px]">
                          ✕ Bất cập bàn giao cũ:
                        </span>
                        <p className="mt-1">{item.currentDefectVi}</p>
                      </div>

                      <div className="rounded-lg bg-accent/5 p-3 border border-accent/20 text-stone-700 dark:text-stone-200">
                        <span className="font-semibold text-accent uppercase tracking-wider text-[10px]">
                          ✓ Giải pháp Quiet Luxury GuHomes:
                        </span>
                        <p className="mt-1">{item.quietLuxurySolutionVi}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Estimated Investment & Concierge Action */}
          <div className="lg:col-span-4 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">Bóc Tách Tổng Hợp</span>
                <span className="text-xs font-mono bg-accent/10 text-accent px-2.5 py-1 rounded-full font-semibold">
                  Mã: {diagnosticCode}
                </span>
              </div>

              <div className="mt-6">
                <span className="text-xs text-muted uppercase font-mono">Dự toán cải tạo trọn gói</span>
                <div className="mt-1 text-3xl font-serif text-accent font-bold">
                  {totalCostMin} – {totalCostMax}{' '}
                  <span className="text-base font-normal text-muted">Triệu VNĐ</span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  Bao gồm: Tháo dỡ mặt bằng cũ, xử lý chống thấm, thi công hoàn thiện và bảo dưỡng 12 tháng.
                </p>
              </div>

              <div className="mt-6 space-y-3 border-y border-line py-5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Thời gian thi công:</span>
                  <span className="font-mono text-ink font-semibold">{maxDays} – {maxDays + 15} Ngày</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Chỉ số chuyển đổi Quiet Luxury:</span>
                  <span className="font-mono text-accent font-bold">{totalScore}% / 100%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted">Cam kết giám sát:</span>
                  <span className="text-ink font-medium">KTS Trưởng có mặt 3 lần/tuần</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full min-h-[44px] rounded-xl bg-accent px-5 py-3 text-xs font-bold text-canvas shadow-lg hover:bg-accent-hover transition-all flex items-center justify-center gap-2"
              >
                <span>Đặt Lịch Khảo Sát Hiện Trạng 1-1</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </button>

              <div className="mt-3 text-center text-[11px] text-muted">
                Miễn phí đo đạc bằng máy quét laser 3D Leica tại TP.HCM.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
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
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-muted hover:text-ink"
              >
                ✕
              </button>

              {!isSubmitted ? (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono uppercase text-accent font-semibold">
                    <span>📐</span>
                    <span>Khảo Sát Thực Địa Bằng Máy Laser 3D Leica</span>
                  </div>

                  <h3 className="mt-2 font-serif text-2xl font-light text-ink">
                    Hẹn KTS Trưởng Khảo Sát Tận Nhà
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                    KTS Trưởng GuHomes sẽ trực tiếp đến căn hộ/nhà phố của bạn cùng thiết bị đo đạc vi khí hậu để bóc
                    tách chi tiết theo mã chẩn đoán <span className="font-mono text-accent">{diagnosticCode}</span>.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1">
                        Tên Căn Hộ / Dự Án Hoặc Địa Chỉ
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ví dụ: Vinhomes Golden River, Thảo Điền Villa, Masteri..."
                        value={estateName}
                        onChange={(e) => setEstateName(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-muted mb-1">
                        Số Điện Thoại Nhận Lịch Hẹn
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx xxx xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-xs text-ink placeholder:text-muted focus:border-accent focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full min-h-[44px] rounded-xl bg-accent px-5 py-3 text-xs font-bold text-canvas hover:bg-accent-hover transition-all"
                      >
                        Xác Nhận Đặt Lịch Khảo Sát Miễn Phí
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-3xl text-accent">
                    ✓
                  </div>
                  <h4 className="mt-4 font-serif text-2xl font-light text-ink">Đã Tiếp Nhận Yêu Cầu</h4>
                  <p className="mt-2 text-xs sm:text-sm text-muted max-w-sm mx-auto">
                    KTS Trưởng GuHomes sẽ liên hệ lại với bạn qua số điện thoại <span className="font-mono font-bold text-ink">{phone}</span> trong vòng 2 giờ làm việc để xác nhận giờ khảo sát tại <span className="font-medium text-ink">{estateName}</span>.
                  </p>
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false)
                        setIsModalOpen(false)
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
