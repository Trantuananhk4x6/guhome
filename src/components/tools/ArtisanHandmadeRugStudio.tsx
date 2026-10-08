'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

interface RugPattern {
  id: string
  nameVi: string
  materialVi: string
  dyePlantVi: string
  densityKpsiVi: string
  craftTimeDaysVi: string
  descriptionVi: string
  paletteAccent: string
}

const RUG_PATTERNS: RugPattern[] = [
  {
    id: 'saigon-water-clouds',
    nameVi: 'Mây Nước Sài Gòn (Saigon River Wave)',
    materialVi: '70% Sợi Tơ Sen Đồng Tháp + 30% Len Lông Cừu Cao Cấp',
    dyePlantVi: 'Nhuộm Xanh Chàm Bản Địa (Indigo Tinctoria)',
    densityKpsiVi: '180 Nốt Thắt/Inch Vuông (Hand-Knotted 180 KPSI)',
    craftTimeDaysVi: '90 Ngày dệt tay liên tục',
    descriptionVi:
      'Lấy cảm hứng từ những khúc quanh mềm mại của dòng sông Sài Gòn dưới ánh sớm. Sợi tơ sen mềm mại óng ả bắt sáng tự nhiên, khi đi chân trần mang lại cảm giác mượt mà mát lành không tích điện.',
    paletteAccent: '#3b5a7a',
  },
  {
    id: 'wabi-terraces',
    nameVi: 'Ruộng Bậc Thang Wabi-Sabi (Quiet Terraces)',
    materialVi: '100% Len Lông Cừu Dệt Dày Tự Nhiên Đàn Hồi',
    dyePlantVi: 'Nhuộm Củ Nâu Đất Rừng Tây Bắc & Vỏ Hạt Dẻ',
    densityKpsiVi: '160 Nốt Thắt/Inch Vuông',
    craftTimeDaysVi: '75 Ngày dệt tay',
    descriptionVi:
      'Các đường kỷ hà phân tầng mô phỏng địa hình ruộng bậc thang với độ dày mỏng chênh lệch 3mm. Bước chân chìm vào lớp len đàn hồi ấm áp, triệt tiêu tiếng bước chân ban đêm.',
    paletteAccent: '#8a6240',
  },
  {
    id: 'alluvial-symphony',
    nameVi: 'Giao Hưởng Phù Sa (Mekong Alluvium)',
    materialVi: '50% Tơ Tằm Bảo Lộc + 50% Len Cừu Kéo Tay',
    dyePlantVi: 'Nhuộm Vỏ Lựu Cổ & Đất Sét Nung Bát Tràng',
    densityKpsiVi: '200 Nốt Thắt/Inch Vuông Siêu Mịn',
    craftTimeDaysVi: '110 Ngày dệt tay',
    descriptionVi:
      'Sắc đỏ gạch nung trầm ấm của đất phù sa kết hợp cùng ánh lấp lánh của tơ tằm thô. Phù hợp tuyệt đối khi đặt dưới bộ sofa gỗ óc chó sẫm màu và bàn trà mặt đá sa thạch.',
    paletteAccent: '#a04838',
  },
  {
    id: 'moonlit-river',
    nameVi: 'Ánh Trăng Sông Đáy (Silver Moonbeam)',
    materialVi: '80% Tơ Sen Tự Nhiên + 20% Tơ Chuối Xơ Mềm',
    dyePlantVi: 'Nhuộm Tro Trấu Nếp Cái Hoa Vàng & Bột Đá Vôi Tự Nhiên',
    densityKpsiVi: '190 Nốt Thắt/Inch Vuông',
    craftTimeDaysVi: '95 Ngày dệt tay',
    descriptionVi:
      'Tông xám bạc ngọc trai tinh khôi với hiệu ứng quang học đổi sắc theo góc nhìn. Ban ngày thanh khiết mát dịu, ban đêm dưới ánh đèn rọi 2700K tỏa ánh ấm cúng huyền bí.',
    paletteAccent: '#8e99a8',
  },
]

interface RugSizeOption {
  id: string
  labelVi: string
  dimensionVi: string
  areaM2: number
  recommendedRoomVi: string
}

const RUG_SIZES: RugSizeOption[] = [
  {
    id: 'grand-living',
    labelVi: 'Phòng Khách Lớn (Grand Living)',
    dimensionVi: '3.0m x 4.0m',
    areaM2: 12.0,
    recommendedRoomVi: 'Sofa góc L hoặc bộ sofa đôi Penthouse > 180m²',
  },
  {
    id: 'standard-living',
    labelVi: 'Phòng Khách Tiêu Chuẩn',
    dimensionVi: '2.4m x 3.0m',
    areaM2: 7.2,
    recommendedRoomVi: 'Căn hộ 3 phòng ngủ Thủ Thiêm & Biệt thự phố',
  },
  {
    id: 'master-bedroom',
    labelVi: 'Phòng Ngủ Master',
    dimensionVi: '2.0m x 2.8m',
    areaM2: 5.6,
    recommendedRoomVi: 'Trải dưới 2/3 chân giường King Size êm dịu gót chân',
  },
  {
    id: 'reading-sanctuary',
    labelVi: 'Góc Trà & Đọc Sách',
    dimensionVi: '1.6m x 2.4m',
    areaM2: 3.84,
    recommendedRoomVi: 'Dưới ghế Lounge Chair bọc da & bàn trà nhỏ',
  },
]

export function ArtisanHandmadeRugStudio({ className }: { className?: string } = {}) {
  const [activePatternId, setActivePatternId] = useState<string>('saigon-water-clouds')
  const [activeSizeId, setActiveSizeId] = useState<string>('grand-living')

  // Booking Form State
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingCode, setBookingCode] = useState('')

  const activePattern =
    RUG_PATTERNS.find((p) => p.id === activePatternId) ?? RUG_PATTERNS[0]!
  const activeSize =
    RUG_SIZES.find((s) => s.id === activeSizeId) ?? RUG_SIZES[0]!

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientPhone) return
    const randomHex = Math.floor(1000 + Math.random() * 9000)
    setBookingCode(`GU-RUG-2026-${randomHex}`)
    setIsSubmitted(true)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0d10] py-24 text-[#eae6e1] border-t border-[#1d1e22]', className)}>
      {/* Subtle Botanical Dye Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,90,122,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#30333d] bg-[#14161c] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#93b4d7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#93b4d7] animate-ping" />
            Nghệ Thuật Dệt Thủ Công Bản Địa · Hand-Knotted Lotus Silk Rug Atelier
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f7f5f2]">
            Xưởng Dệt Thảm Tơ Sen &amp; Len Lông Cừu Nhuộm Thảo Mộc
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#9e9a93]">
            Khước từ thảm sợi tổng hợp dệt máy tích điện và phai màu hóa chất, GuHomes đồng hành cùng nghệ nhân làng dệt cổ truyền: dệt tay từng nốt thắt từ sợi tơ sen Đồng Tháp và len lông cừu tự nhiên. Nhuộm thủ công từ củ nâu, lá chàm và vỏ lựu tạo nên lớp đệm êm ái thuần khiết cho gót chân trần.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Pattern Gallery & Knot Architecture */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#232630] bg-[#12141a]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#20232c] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#93b4d7]">
                    4 Bộ Sưu Tập Hoa Văn Quiet Luxury
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f7f5f2]">
                    Hòa Hợp Đường Vân Gỗ Óc Chó &amp; Đá Tự Nhiên
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#181c24] px-3 py-1 text-xs font-mono text-[#93b4d7]">
                  <span>Mật độ: 180 Nốt/Inch²</span>
                </div>
              </div>

              {/* Pattern Selector Grid */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {RUG_PATTERNS.map((pattern) => {
                  const isSelected = pattern.id === activePatternId
                  return (
                    <button
                      key={pattern.id}
                      type="button"
                      onClick={() => setActivePatternId(pattern.id)}
                      className={cn(
                        'flex flex-col items-start p-3.5 rounded-xl border text-left transition-all min-h-[78px]',
                        isSelected
                          ? 'border-[#93b4d7] bg-[#1a212d] text-white shadow-[0_0_15px_rgba(147,180,215,0.18)]'
                          : 'border-[#20232c] bg-[#0e1014] text-[#8e8a83] hover:border-[#333a47] hover:text-[#dcd8d1]'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: pattern.paletteAccent }}
                        />
                        <span className="text-xs font-semibold">{pattern.nameVi.split(' (')[0]}</span>
                      </div>
                      <span className="mt-1.5 text-[11px] text-[#7a766f] line-clamp-1">
                        {pattern.materialVi.split('+')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Pattern Detailed Card */}
              <div className="mt-6 rounded-xl border border-[#282d3b] bg-[#151922] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#93b4d7]">
                    CHI TIẾT TÁC PHẨM DỆT TAY
                  </span>
                  <span className="rounded-full bg-[#1c2230] px-2.5 py-0.5 font-mono text-[10px] text-[#93b4d7]">
                    {activePattern.craftTimeDaysVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f7f5f2]">
                  {activePattern.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#bcb7ae]">
                  {activePattern.descriptionVi}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#202430]">
                  <div className="rounded-lg bg-[#0e1015] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#697285]">Chất Liệu Sợi Tự Nhiên</span>
                    <span className="mt-1 block text-xs font-medium text-[#dcd8d1]">
                      {activePattern.materialVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#0e1015] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#697285]">Kỹ Thuật Nhuộm Thảo Mộc</span>
                    <span className="mt-1 block text-xs font-medium text-[#93b4d7]">
                      {activePattern.dyePlantVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sizing Proportions & VIP Bespoke Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#232630] bg-[#12141a]/90 p-6 sm:p-8 backdrop-blur-md">
              <span className="font-mono text-xs uppercase tracking-wider text-[#93b4d7]">
                Tỷ Lệ Kích Thước May Đo
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f7f5f2]">
                Định Cỡ Theo Nhân Trắc Không Gian
              </h3>

              {/* Sizing Radio Selection */}
              <div className="mt-5 space-y-2">
                {RUG_SIZES.map((size) => {
                  const isChosen = size.id === activeSizeId
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setActiveSizeId(size.id)}
                      className={cn(
                        'w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all text-xs',
                        isChosen
                          ? 'border-[#93b4d7] bg-[#1a212d] text-white'
                          : 'border-[#20232c] bg-[#0e1014] text-[#8e8a83] hover:text-[#dcd8d1]'
                      )}
                    >
                      <div>
                        <span className="font-medium block">{size.labelVi}</span>
                        <span className="text-[10px] text-[#717a8e]">{size.recommendedRoomVi}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#93b4d7]">{size.dimensionVi}</span>
                    </button>
                  )
                })}
              </div>

              {/* Total Knots Calculation */}
              <div className="mt-6 rounded-xl border border-[#252c3a] bg-[#151a24] p-4 flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono text-[10px] text-[#717a8e] uppercase block">Ước Tính Nốt Thắt Thủ Công</span>
                  <span className="font-medium text-[#dcd8d1]">{activeSize.dimensionVi} · {activeSize.areaM2} m²</span>
                </div>
                <span className="font-mono text-lg font-bold text-[#93b4d7]">
                  ~{Math.round(activeSize.areaM2 * 279000).toLocaleString('vi-VN')} Nốt
                </span>
              </div>

              {/* VIP Bespoke Consultation Form */}
              {isSubmitted ? (
                <div className="mt-6 rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-400 text-xl">
                    <CheckIcon />
                  </div>
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block">
                    Đã Ghi Nhận Yêu Cầu May Đo Thảm
                  </span>
                  <h4 className="font-serif text-lg text-emerald-100">
                    Mã Tiếp Đón VIP: <span className="font-mono text-[#93b4d7] font-bold">{bookingCode}</span>
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    Chuyên gia xúc giác vải sợi GuHomes sẽ mang hộp mẫu sợi tơ sen & len cừu nhuộm thảo mộc đến tận tư gia để gia chủ trải nghiệm trực tiếp độ đàn hồi dưới chân.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#93b4d7] uppercase mb-1">
                      Họ và Tên Gia Chủ *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ví dụ: Chị Mai Phương"
                      className="w-full rounded-xl border border-[#272d3a] bg-[#0c0e14] px-4 py-3 text-xs text-white placeholder-[#545d71] focus:border-[#93b4d7] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#93b4d7] uppercase mb-1">
                      Số Điện Thoại Nhận Hộp Mẫu Thử Xúc Giác *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full rounded-xl border border-[#272d3a] bg-[#0c0e14] px-4 py-3 text-xs text-white placeholder-[#545d71] focus:border-[#93b4d7] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#93b4d7] py-3.5 text-xs font-mono font-bold tracking-wider text-[#0e1218] hover:bg-[#b0cde9] transition-all shadow-[0_4px_20px_rgba(147,180,215,0.25)]"
                  >
                    <span>Yêu cầu mang hộp mẫu sợi tơ sen thử tại nhà</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </button>
                </form>
              )}

              {/* Direct Hotline */}
              <div className="mt-6 pt-5 border-t border-[#20232c] flex items-center justify-between text-xs font-mono text-[#8a867f]">
                <span>Tư vấn nghệ nhân dệt:</span>
                <a href="tel:0368757916" className="text-[#93b4d7] font-bold hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
