'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface TeakConfiguration {
  id: string
  numberVi: string
  nameVi: string
  locationVi: string
  woodGradeVi: string
  antiSlipRatingVi: string
  drainageCapacityVi: string
  descriptionVi: string
  engineeringSpecVi: string
  tactileFeelVi: string
}

const TEAK_CONFIGURATIONS: TeakConfiguration[] = [
  {
    id: 'infinity-pool',
    numberVi: '01',
    nameVi: 'Sàn Teak Quanh Hồ Bơi Vô Cực (Infinity Pool Deck)',
    locationVi: 'Sky Villa Penthouse The Metropole & Biệt Thự Thảo Điền',
    woodGradeVi: 'Gỗ Teak Tự Nhiên FEQ (First European Quality) Chứa Dầu Khoáng Kháng Muối Biển',
    antiSlipRatingVi: 'Chuẩn R11 Chống Trượt Bề Mặt Ướt Nước',
    drainageCapacityVi: '120 mm/giờ qua khe thoát ngầm vi mô 4mm',
    descriptionVi:
      'Gỗ Teak già trên 45 năm sở hữu lượng tinh dầu tự nhiên đậm đặc, không thấm nước và kháng clo hồ bơi tuyệt đối. Mặt gỗ được phay vi rãnh siêu nhỏ chống trượt khi bước chân ướt, không cong vênh dưới ánh nắng rực rỡ.',
    engineeringSpecVi: 'Khung đà nhôm hàng không 6063-T6 chống ăn mòn + Chốt cài kẹp âm Inox 316 giấu 100% đinh ốc',
    tactileFeelVi: 'Ấm áp, êm ái không hề bị trơn trượt, chân trần chạm vào cảm giác đầm chắc như sàn du thuyền xa xỉ.',
  },
  {
    id: 'sky-zen-tea',
    numberVi: '02',
    nameVi: 'Vườn Thiền Trà & Chòi Nghỉ Trên Cao (Sky Zen Pavilion)',
    locationVi: 'Sân Thượng Biệt Thự Phú Mỹ Hưng & Nhà Phố Vườn Ba Son',
    woodGradeVi: 'Teak Bản Rộng 120mm Xếp Nan Ngẫu Hợp Wabi-Sabi Tinh Hoa',
    antiSlipRatingVi: 'Mài Mịn Nhẵn Mịn Chân Trần Bước Qua',
    drainageCapacityVi: '95 mm/giờ tự thẩm thấu vào bồn thoát ngầm',
    descriptionVi:
      'Tạo lập một ốc đảo tĩnh lặng giữa tầng không Sài Gòn. Các thanh Teak xếp vát cạnh tinh vi kết hợp cùng sỏi cuội đen tuyền và cây bonsai nhiệt đới, tạo không gian trà đạo ngoài trời che mát bởi giàn lam gỗ xoay.',
    engineeringSpecVi: 'Mô-đun lắp ghép tháo lắp linh hoạt, bảo vệ lớp chống thấm sàn mái bê tông tuyệt đối',
    tactileFeelVi: 'Gỗ mịn mát mượt mà, bước chân trần nghe tiếng thở nhẹ của vật liệu mộc dưới tán hoàng hôn.',
  },
  {
    id: 'sunset-riverside',
    numberVi: '03',
    nameVi: 'Ban Công Liền Mạch Ngắm Hoàng Hôn Sông (Sunset Riverside Deck)',
    locationVi: 'Căn Hộ Duplex Bán Đảo Thủ Thiêm Hướng Trực Diện Sông Sài Gòn',
    woodGradeVi: 'Gỗ Teak Phẳng Cùng Cote Sàn Phòng Khách (Flush-Floor Transition)',
    antiSlipRatingVi: 'Chuẩn R10 An Toàn Trẻ Nhỏ & Người Lớn Tuổi',
    drainageCapacityVi: '110 mm/giờ máng thoát âm sàn giấu kín',
    descriptionVi:
      'Xóa nhòa hoàn toàn ranh giới giữa bên trong và bên ngoài. Cốt sàn gỗ Teak ban công được thi công phẳng lì ngang bằng 100% với cốt sàn gỗ óc chó phòng khách, tạo cảm giác không gian sinh hoạt mở rộng vô tận ra mặt sông.',
    engineeringSpecVi: 'Hệ ray cửa kính âm sàn kẹp nẹp Teak thẩm mỹ, không giật cấp vấp ngã',
    tactileFeelVi: 'Chuyển tiếp nhịp nhàng từ sự ấm cúng trong nhà ra sự khoáng đạt mát rượi của gió sông lộng.',
  },
]

export function SaigonBespokeTeakDeckingPavilion({ className }: { className?: string } = {}) {
  const [activeConfigId, setActiveConfigId] = useState<string>('infinity-pool')
  const [ambientSunlight, setAmbientSunlight] = useState<'noon' | 'sunset'>('noon')

  const currentConfig =
    TEAK_CONFIGURATIONS.find((c) => c.id === activeConfigId) ?? TEAK_CONFIGURATIONS[0]!

  // Thermal comparison metrics
  const tileTemp = ambientSunlight === 'noon' ? 58.5 : 44.2
  const teakTemp = ambientSunlight === 'noon' ? 33.8 : 29.5
  const tempDiff = (tileTemp - teakTemp).toFixed(1)

  return (
    <section className={cn('relative overflow-hidden bg-[#0d0d0b] py-24 text-[#e8e5df] border-t border-[#22211b]', className)}>
      {/* Warm timber sunlight glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(196,134,68,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3d2f1f] bg-[#1a150e] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d49755]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d49755] animate-ping" />
            Kiến Trúc Ngoại Thất Chân Trần · Bespoke Teak Outdoor Decking
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f7f4ee]">
            Sàn Gỗ Teak Sân Thượng &amp; Ốc Đảo Ngoài Trời
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#aba293]">
            Ánh nắng nhiệt đới nung nóng sàn gạch men lên gần 60°C khiến ban công và sân thượng penthouse trở thành vùng đất chết vào ban ngày. GuHomes ứng dụng gỗ Teak tự nhiên dồi dào tinh dầu trên khung đà nhôm hàng không — tản nhiệt tức thì, đi chân trần êm ái và bền vững hàng chục năm dưới nắng mưa Sài Gòn.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 3 Architectural Configurations */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#2d2920] bg-[#14130f]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#282319] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d49755]">
                    3 Cấu Hình Teak Decking May Đo
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f7f4ee]">
                    Giải Pháp Thích Ứng Nắng Gắt &amp; Mưa Rào
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#1e1911] px-3 py-1 text-xs font-mono text-[#d49755]">
                  <span>Tuổi thọ: 50+ Năm</span>
                </div>
              </div>

              {/* Selector Tabs */}
              <div className="mt-6 flex flex-col gap-2.5">
                {TEAK_CONFIGURATIONS.map((config) => {
                  const isActive = config.id === activeConfigId
                  return (
                    <button
                      key={config.id}
                      type="button"
                      onClick={() => setActiveConfigId(config.id)}
                      className={cn(
                        'flex items-center justify-between p-3.5 rounded-xl border text-left transition-all min-h-[56px]',
                        isActive
                          ? 'border-[#d49755] bg-[#241c12] text-white shadow-[0_0_15px_rgba(212,151,85,0.15)]'
                          : 'border-[#262118] bg-[#100f0c] text-[#9c9384] hover:border-[#3d3224] hover:text-[#e4dccf]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#332616] font-mono text-xs font-bold text-[#d49755]">
                          {config.numberVi}
                        </span>
                        <div>
                          <span className="block text-xs sm:text-sm font-medium">
                            {config.nameVi.split(' (')[0]}
                          </span>
                          <span className="block text-[11px] text-[#827666] line-clamp-1">
                            {config.locationVi}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#d49755]/80 hidden sm:inline">
                        {config.antiSlipRatingVi.split(' ')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Config Deep Inspection */}
              <div className="mt-6 rounded-xl border border-[#332a1e] bg-[#1a1610] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d49755]">
                    CẤU HÌNH {currentConfig.numberVi} · {currentConfig.locationVi}
                  </span>
                  <span className="rounded-full bg-[#271f14] px-2.5 py-0.5 font-mono text-[10px] text-[#d49755]">
                    {currentConfig.antiSlipRatingVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f7f4ee]">
                  {currentConfig.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#c4b9a8]">
                  {currentConfig.descriptionVi}
                </p>

                {/* Tactile Experience Highlight */}
                <div className="mt-4 rounded-lg bg-[#0e0d0a] p-3 border border-[#262016]">
                  <span className="block font-mono text-[10px] uppercase text-[#7a6f5e]">
                    Cảm Giác Tiếp Xúc Bàn Chân (Tactile Experience)
                  </span>
                  <p className="mt-1 text-xs text-[#dcd2c2] italic">
                    "{currentConfig.tactileFeelVi}"
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#262016]">
                  <div className="rounded-lg bg-[#110f0b] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6f5e]">Quy Chuẩn Liên Kết</span>
                    <span className="mt-1 block text-xs font-medium text-[#e4dccf]">
                      {currentConfig.engineeringSpecVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#110f0b] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6f5e]">Tốc Độ Thoát Nước</span>
                    <span className="mt-1 block text-xs font-medium text-[#d49755]">
                      {currentConfig.drainageCapacityVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Barefoot Thermal Comparison & Storm Drainage */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#2d2920] bg-[#14130f]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#282319] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d49755]">
                    Thử Nghiệm Nhiệt Bề Mặt Chân Trần
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f7f4ee]">
                    Nắng Gắt Trưa Hè Sài Gòn
                  </h3>
                </div>
              </div>

              {/* Time of Day Switcher */}
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-[#0c0b09] p-1.5 border border-[#262017]">
                <button
                  type="button"
                  onClick={() => setAmbientSunlight('noon')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    ambientSunlight === 'noon'
                      ? 'bg-[#d49755] text-[#14110a] font-bold shadow-md'
                      : 'text-[#877a68] hover:text-[#d49755]'
                  )}
                >
                  ☀️ Giữa Trưa Nắng Gắt (12:30 PM)
                </button>
                <button
                  type="button"
                  onClick={() => setAmbientSunlight('sunset')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    ambientSunlight === 'sunset'
                      ? 'bg-[#b86b36] text-white font-bold shadow-md'
                      : 'text-[#877a68] hover:text-white'
                  )}
                >
                  🌅 Chiều Hoàng Hôn (17:30 PM)
                </button>
              </div>

              {/* Temperature Bar Comparison */}
              <div className="mt-6 space-y-4">
                {/* Traditional Outdoor Tile */}
                <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-red-300 font-medium">Sàn Gạch Men / Đá Ngoại Thất Thông Thường</span>
                    <span className="font-mono font-bold text-red-400 text-base">{tileTemp}°C</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-red-950 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-red-600 rounded-full w-[95%]" />
                  </div>
                  <span className="mt-1 block text-[10px] text-red-400/80">
                    Bỏng rát bàn chân, giữ nhiệt tới tận nửa đêm khiến không khí ban công hầm hập.
                  </span>
                </div>

                {/* GuHomes Teak Decking */}
                <div className="rounded-xl border border-[#3d2f1f] bg-[#221a11]/60 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#d49755] font-medium">
                      Sàn Gỗ Teak GuHomes Khung Đà Thoát Nhiệt
                    </span>
                    <span className="font-mono font-bold text-[#e6b47c] text-xl">{teakTemp}°C</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-[#0d0c09] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#8b5a2b] to-[#d49755] rounded-full transition-all duration-500"
                      style={{ width: `${(teakTemp / tileTemp) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#d49755]">
                    <span>Mát hơn chân trần:</span>
                    <span className="font-bold text-[#f7e6d2]">-{tempDiff}°C (Thông gió đối lưu gầm sàn)</span>
                  </div>
                </div>
              </div>

              {/* Storm Drainage Highlight */}
              <div className="mt-6 rounded-xl border border-[#2d2920] bg-[#110f0b] p-4 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#d49755] uppercase block">
                  Đặc Quyền Kỹ Thuật Độc Quyền GuHomes:
                </span>
                <div className="flex items-center gap-2 text-[#b0a595]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d49755]" />
                  <span>Chốt cài Inox 316 kẹp âm giấu kín 100% vít, không dính chân khi đi lại.</span>
                </div>
                <div className="flex items-center gap-2 text-[#b0a595]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d49755]" />
                  <span>Hệ khung đà nhôm hàng không nâng cao 50mm tạo rãnh gió tự nhiên làm mát sàn.</span>
                </div>
                <div className="flex items-center gap-2 text-[#b0a595]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d49755]" />
                  <span>Bảo hành co ngót & mục nát 10 năm với quy trình bôi dầu khoáng định kỳ.</span>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#282319]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#d49755] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#14110a] hover:bg-[#e4ad6f] transition-all shadow-[0_4px_20px_rgba(212,151,85,0.2)]"
                >
                  <span>Khảo sát sàn Teak ban công & sân thượng tư gia</span>
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
