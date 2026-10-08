'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type VaultMode = 'wine' | 'cigar' | 'dual'

interface VaultPreset {
  id: VaultMode
  nameVi: string
  subtitleVi: string
  targetTemp: string
  targetHumidity: string
  lightingK: string
  vibrationMax: string
  uvBlockPercent: string
  woodTypeVi: string
  descriptionVi: string
  idealForVi: string
}

const VAULT_PRESETS: Record<VaultMode, VaultPreset> = {
  wine: {
    id: 'wine',
    nameVi: 'Hầm Rượu Vang Grand Cru',
    subtitleVi: 'Grand Cru Wine Preservation · Giữ Ngủ Trầm Tích 14°C Tuyệt Đối',
    targetTemp: '14.0°C ± 0.5°C',
    targetHumidity: '68% ± 2% RH',
    lightingK: '2200K Hổ Phách Không Tia UV',
    vibrationMax: '< 0.008 mm/s (Triệt Rung Hoàn Toàn)',
    uvBlockPercent: '99.9% Kính Argon Low-E 3 Lớp',
    woodTypeVi: 'Gỗ Sồi Trắng Bắc Mỹ xẻ góc Quarter-Sawn không mùi, giữ nút bấc ẩm êm',
    descriptionVi:
      'Tại Sài Gòn với nhiệt độ ngoài trời thường xuyên chạm ngưỡng 38°C, nhiệt độ không đồng nhất sẽ đẩy nhanh quá trình oxy hóa phá hỏng cấu trúc tannin của những chai Bordeaux, Burgundy đắt giá. GuHomes chế tác hầm rượu vang với buồng vi khí hậu kín khít, hệ máy nén Inverter đặt tách rời ngoài ban công, triệt tiêu mọi rung động cơ học.',
    idealForVi: 'Bộ sưu tập Bordeaux Premier Grand Cru, Burgundy Grand Cru, Champagne Vintage',
  },
  cigar: {
    id: 'cigar',
    nameVi: 'Tủ Dưỡng Xì Gà Havana Sanctuary',
    subtitleVi: 'Havana Cigar Humidor · Gỗ Tuyết Tùng Tây Ban Nha Thơm Nồng',
    targetTemp: '18.5°C ± 0.5°C',
    targetHumidity: '70% ± 2% RH',
    lightingK: '2400K Ánh Nến Êm Dịu',
    vibrationMax: '0.00 mm/s (Cơ học tĩnh)',
    uvBlockPercent: '100% Cản Quang Hoàn Toàn',
    woodTypeVi: 'Gỗ Tuyết Tùng Tây Ban Nha (Spanish Cedar - Cedrela odorata) nhập khẩu',
    descriptionVi:
      'Gỗ Tuyết Tùng Tây Ban Nha là chất liệu duy nhất trên thế giới có khả năng tự cân bằng độ ẩm cigar, tiết ra tinh dầu thơm tự nhiên xua đuổi mọt thuốc lá (tobacco beetle) và hỗ trợ quá trình ủ ngấu lá thuốc Cuba qua nhiều năm tháng.',
    idealForVi: 'Cohiba Behike, Partagas Serie D, Montecristo No.2, Davidoff Royal Release',
  },
  dual: {
    id: 'dual',
    nameVi: 'Hầm Kép Đa Khí Hậu Penthouse (Dual-Zone)',
    subtitleVi: 'Dual-Zone Luxury Vault · Rượu Vang & Xì Gà Tách Biệt Khoang Kính',
    targetTemp: 'Zone A: 14°C (Rượu) | Zone B: 18°C (Cigar)',
    targetHumidity: 'Zone A: 68% RH | Zone B: 71% RH',
    lightingK: '2200K - 2700K Điều Khiển Độc Lập',
    vibrationMax: '< 0.010 mm/s Toàn Khu Vực',
    uvBlockPercent: '99.9% Kính Cách Âm Cách Nhiệt',
    woodTypeVi: 'Kết hợp Tuyết Tùng Tây Ban Nha & Gỗ Óc Chó Bắc Mỹ lau dầu hữu cơ Osmo',
    descriptionVi:
      'Tuyệt tác không gian dành riêng cho các căn Penthouse và Dinh thự. Hai khoang khí hậu được ngăn cách bằng vách kính chân không 3 lớp, cho phép gia chủ vừa lưu trữ hàng trăm chai rượu vang quý hiếm vừa dưỡng hàng trăm điếu xì gà trong cùng một tác phẩm kiến trúc.',
    idealForVi: 'Tư gia Penthouse, Dinh thự thượng lưu, Phòng tiếp khách VIP tại gia',
  },
}

interface TechnicalLayer {
  number: string
  titleVi: string
  subtitleVi: string
  detailVi: string
}

const TECHNICAL_LAYERS: TechnicalLayer[] = [
  {
    number: '01',
    titleVi: 'Kính Hộp 3 Lớp Low-E Bơm Khí Trơ Argon',
    subtitleVi: 'Chống Đọng Sương (Thermal Break) & Cản 99.9% Tia Cực Tím',
    detailVi:
      'Được cấu tạo từ 3 lớp kính cường lực tôi nhiệt siêu trong, khoảng rỗng giữa bơm khí Argon giúp triệt tiêu hiện tượng đọng sương bề mặt (chênh lệch 24°C giữa trong và ngoài hầm) ngay cả vào những ngày Sài Gòn mưa dầm độ ẩm không khí 90%.',
  },
  {
    number: '02',
    titleVi: 'Hệ Làm Lạnh Biến Tần Inverter Tách Rời (Split System)',
    subtitleVi: 'Triệt Tiêu Hoàn Toàn Vi Rung Động Cơ Học (< 0.008 mm/s)',
    detailVi:
      'Cụm máy nén nóng được đặt ngoài ban công kỹ thuật cách xa hầm từ 15-25m. Kết nối thông qua đường ống đồng bọc mút cao su lưu hóa Superlon, loại bỏ 100% tiếng ồn và vi rung chấn tác động lên chai rượu vang.',
  },
  {
    number: '03',
    titleVi: 'Giá Kệ Gỗ Tuyết Tùng Tây Ban Nha & Gỗ Óc Chó Tự Nhiên',
    subtitleVi: 'Cắt Mộng Mộc Tinh Xảo Không Dùng Đinh Kim Loại',
    detailVi:
      'Từng nan gỗ được xưởng mộc GuHomes Thạnh Xuân gia công tỉ mỉ với độ nghiêng tiêu chuẩn 15° để nút bần luôn ngập trong rượu, tránh khô nứt và oxy lọt vào bình.',
  },
  {
    number: '04',
    titleVi: 'Hệ Cảm Biến Vi Khí Hậu IoT & Báo Động 2 Cấp Độ',
    subtitleVi: 'Giám Sát 24/7 Qua Ứng Dụng Điện Thoại Gia Chủ',
    detailVi:
      'Tích hợp 6 cảm biến Thụy Sĩ Sensirion độ chính xác cao. Nếu nhiệt độ lệch quá ±1°C hoặc độ ẩm lệch quá ±4% trong 15 phút, hệ thống tự động cảnh báo âm thanh và gửi thông báo khẩn cấp đến gia chủ và kỹ thuật viên GuHomes.',
  },
]

export function SommelierWineCigarVault({ className }: { className?: string } = {}) {
  const [activeMode, setActiveMode] = useState<VaultMode>('wine')
  const [selectedCapacity, setSelectedCapacity] = useState<'compact' | 'medium' | 'grand'>('medium')
  const [bookingModalOpen, setBookingModalOpen] = useState(false)

  const current = VAULT_PRESETS[activeMode]

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0a08] py-24 text-[#e8e4df] border-t border-[#1a1a17]', className)}>
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#b87333]/10 via-transparent to-transparent opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d2720] bg-[#15120e] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Vi Khí Hậu Chuyên Biệt · Wine & Cigar Sanctuary
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Hầm Rượu Vang & Tủ Cigar Vi Khí Hậu Chuẩn Xác
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Khí hậu Sài Gòn nắng gắt 38°C và độ ẩm 85% là khắc tinh của rượu vang Grand Cru và xì gà Cuba. GuHomes kiến tạo giải pháp hầm rượu vi khí hậu độc bản: không đọng sương, không rung chấn, bảo tồn trọn vẹn hương vị truyền đời.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="mb-10 flex flex-wrap gap-3">
          {(Object.keys(VAULT_PRESETS) as VaultMode[]).map((modeKey) => {
            const preset = VAULT_PRESETS[modeKey]
            const isActive = activeMode === modeKey
            return (
              <button
                key={modeKey}
                type="button"
                onClick={() => setActiveMode(modeKey)}
                className={cn(
                  'relative rounded-lg border px-5 py-3 text-left transition-all duration-300 min-h-[68px]',
                  isActive
                    ? 'border-[#d4af37] bg-[#191510] text-[#f4efe6] shadow-lg shadow-black/50'
                    : 'border-[#262420] bg-[#11100e] text-[#8e8a83] hover:border-[#3d3830] hover:bg-[#151410]'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#d4af37]">
                    {modeKey === 'wine' ? '🍷' : modeKey === 'cigar' ? '🍂' : '✨'}
                  </span>
                  <span className="text-sm sm:text-base font-medium">{preset.nameVi}</span>
                </div>
                <div className="mt-1 font-mono text-xs text-[#b89552]">{preset.targetTemp}</div>
              </button>
            )
          })}
        </div>

        {/* Main Interactive Cockpit */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch">
          {/* Left Column: Live Monitoring Gauges & Real-time Metrics (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#292520] bg-[#12100d] p-6 sm:p-8">
            <div>
              {/* Cockpit Frame */}
              <div className="relative overflow-hidden rounded-lg border border-[#332c24] bg-gradient-to-br from-[#1c1712] to-[#0e0c0a] p-6 shadow-2xl">
                {/* Status indicator bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2b241c] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                      HỆ THỐNG VI KHÍ HẬU: HOẠT ĐỘNG HOÀN HẢO (LIVE)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#8e8578]">Chuẩn Sensirion Thụy Sĩ</span>
                </div>

                {/* Big Live Gauges */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {/* Gauge 1: Nhiệt độ */}
                  <div className="rounded-lg border border-[#2b251e] bg-[#16120e] p-3 text-center">
                    <span className="font-mono text-[10px] uppercase text-[#7a7164]">Nhiệt Độ Vàng</span>
                    <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-[#f4efe6]">
                      {current.targetTemp.split(' ')[0]}
                    </div>
                    <span className="mt-0.5 block text-[10px] text-[#d4af37]">Sai số ±0.5°C</span>
                  </div>

                  {/* Gauge 2: Độ ẩm */}
                  <div className="rounded-lg border border-[#2b251e] bg-[#16120e] p-3 text-center">
                    <span className="font-mono text-[10px] uppercase text-[#7a7164]">Độ Ẩm Tương Đối</span>
                    <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-sky-400">
                      {current.targetHumidity.split(' ')[0]}
                    </div>
                    <span className="mt-0.5 block text-[10px] text-sky-300/80">Không đọng sương</span>
                  </div>

                  {/* Gauge 3: Rung động */}
                  <div className="rounded-lg border border-[#2b251e] bg-[#16120e] p-3 text-center">
                    <span className="font-mono text-[10px] uppercase text-[#7a7164]">Địa Chấn Vi Rung</span>
                    <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-emerald-400">
                      &lt;0.008
                    </div>
                    <span className="mt-0.5 block text-[10px] text-emerald-400/80">mm/s (Zero-Vibe)</span>
                  </div>

                  {/* Gauge 4: Cản UV */}
                  <div className="rounded-lg border border-[#2b251e] bg-[#16120e] p-3 text-center">
                    <span className="font-mono text-[10px] uppercase text-[#7a7164]">Cản Tia Cực Tím</span>
                    <div className="mt-1 font-mono text-xl sm:text-2xl font-bold text-[#d4af37]">
                      99.9%
                    </div>
                    <span className="mt-0.5 block text-[10px] text-[#a8a29e]">Argon Shielded</span>
                  </div>
                </div>

                {/* Visual Glass Thermal Barrier Representation */}
                <div className="mt-6 rounded-lg border border-[#302820] bg-[#14100c] p-4 text-xs text-[#a8a29e] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#f4efe6]">Vật Liệu Khung & Kính:</span>
                    <span className="text-[#d4af37] font-mono">{current.uvBlockPercent}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#f4efe6]">Vật Liệu Khay Kệ:</span>
                    <span className="text-[#e8e4df] text-right max-w-xs">{current.woodTypeVi}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#f4efe6]">Hệ Thống Chiếu Sáng:</span>
                    <span className="text-[#d4af37] font-mono">{current.lightingK}</span>
                  </div>
                </div>
              </div>

              {/* Capacity Selector Bar */}
              <div className="mt-6">
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8e8578] mb-2">
                  Quy Mô & Dung Tích Hầm Tùy Biến
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'compact', label: '120 – 180 Chai', sub: 'Tủ Âm Vách Phòng Ăn' },
                    { id: 'medium', label: '350 – 500 Chai', sub: 'Hầm Kính Trung Tâm' },
                    { id: 'grand', label: '800+ Chai', sub: 'Walk-In Lounge Riêng' },
                  ].map((cap) => (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => setSelectedCapacity(cap.id as any)}
                      className={cn(
                        'rounded-lg border p-2.5 text-center transition-all',
                        selectedCapacity === cap.id
                          ? 'border-[#d4af37] bg-[#1a1610] text-[#f4efe6]'
                          : 'border-[#262420] bg-[#11100e] text-[#7a7164] hover:border-[#38332a]'
                      )}
                    >
                      <div className="font-mono text-xs font-bold text-[#d4af37]">{cap.label}</div>
                      <div className="text-[11px] text-[#8e8578] mt-0.5">{cap.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote on wine rest */}
            <div className="mt-6 rounded-lg border border-[#2d261e] bg-[#16120e] p-4 text-xs text-[#a8a29e] leading-relaxed">
              <p className="font-serif italic text-[#d4af37] mb-1">
                &ldquo;Rượu vang là một sinh thể sống tiếp tục thở và biến chuyển trong chai. Một cú sốc nhiệt hay một cơn vi chấn từ máy lạnh thông thường cũng đủ phá vỡ cấu trúc tannin hoàn mỹ qua 30 năm ủ.&rdquo;
              </p>
              <span className="block text-[11px] text-[#706c66] mt-2">— Chuyên gia hầm rượu GuHomes Sommelier Atelier</span>
            </div>
          </div>

          {/* Right Column: 4 Technical Layers & Specification (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#292520] bg-[#12100d] p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs text-[#d4af37] uppercase tracking-wider">
                  Tiêu Chuẩn Kỹ Thuật · Master Engineering
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
                  {current.nameVi}
                </h3>
                <p className="mt-1 text-xs text-[#8e8578]">{current.subtitleVi}</p>
              </div>

              {/* 4 Technical Layers Accordion */}
              <div className="space-y-3">
                {TECHNICAL_LAYERS.map((layer) => (
                  <div
                    key={layer.number}
                    className="rounded-lg border border-[#2b251e] bg-[#16130f] p-3.5 transition-colors hover:border-[#3d3429]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#d4af37] font-bold">{layer.number}.</span>
                      <h4 className="text-xs sm:text-sm font-semibold text-[#f4efe6]">{layer.titleVi}</h4>
                    </div>
                    <p className="mt-1 text-[11px] font-mono text-[#b89552]">{layer.subtitleVi}</p>
                    <p className="mt-1.5 text-xs text-[#a8a29e] leading-relaxed">{layer.detailVi}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#26221c] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="w-full sm:w-auto flex-1 rounded-lg bg-[#d4af37] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#e6c158] active:scale-[0.98]"
              >
                Khảo Sát Vi Khí Hậu Hầm Rượu
              </button>
              <a
                href="/du-toan-chi-phi"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#332c24] bg-[#171410] px-4 py-3 text-xs font-medium text-[#e8e4df] transition-colors hover:border-[#4d4236] hover:bg-[#1c1813]"
              >
                Dự Toán Bóc Tách
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-[#d4af37]" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal: Khảo Sát Vi Khí Hậu Hầm Rượu */}
        <AnimatePresence>
          {bookingModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full rounded-xl border border-[#332a20] bg-[#15120e] p-6 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#262018]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs">
                      ✓
                    </span>
                    <h4 className="font-serif text-lg text-[#f4efe6]">Khảo Sát Vi Khí Hậu Hầm Rượu</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="text-[#7a7164] hover:text-[#f4efe6] text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-xs text-[#a8a29e]">
                  <p>
                    Kỹ sư trưởng hệ MEP và KTS trưởng GuHomes sẽ đến trực tiếp công trình để đo đạc:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[#c4beb5]">
                    <li>Điểm sương (Dew Point) và hướng đón nắng Tây của căn hộ/dinh thự</li>
                    <li>Vị trí đặt cục nóng Inverter giải nhiệt tách rời ngoài ban công</li>
                    <li>Nguồn điện dự phòng chuyển mạch tự động ATS bảo vệ bộ sưu tập khi cúp điện</li>
                  </ul>
                  <div className="rounded border border-[#2b241c] bg-[#0d0b09] p-3 text-[11px] space-y-1 mt-3">
                    <p><strong className="text-[#e8e4df]">Phí khảo sát:</strong> Miễn phí trong quy trình thiết kế GuHomes</p>
                    <p><strong className="text-[#e8e4df]">Hotline KTS Trưởng:</strong> 0368 757 916</p>
                    <p><strong className="text-[#e8e4df]">Xưởng chế tác gỗ:</strong> Thạnh Xuân, Q.12, TP.HCM</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingModalOpen(false)}
                    className="w-full rounded bg-[#d4af37] py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Xác Nhận Đặt Hẹn Khảo Sát
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
