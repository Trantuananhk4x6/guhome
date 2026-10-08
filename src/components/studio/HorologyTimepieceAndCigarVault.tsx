'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type TpdPreset = 650 | 800 | 950 | 1200

interface TimepieceSlot {
  id: number
  brand: string
  model: string
  movement: string
  recommendedTpd: TpdPreset
  direction: 'Hai Chiều' | 'Thuận Chiều' | 'Ngược Chiều'
}

const TIMEPIECE_SLOTS: TimepieceSlot[] = [
  { id: 1, brand: 'Patek Philippe', model: 'Grand Complications 5270P', movement: 'Calibre CH 29-535 PS Q', recommendedTpd: 800, direction: 'Hai Chiều' },
  { id: 2, brand: 'Audemars Piguet', model: 'Royal Oak Tourbillon Extra-Thin', movement: 'Calibre 2924 Manually Wound', recommendedTpd: 650, direction: 'Thuận Chiều' },
  { id: 3, brand: 'Vacheron Constantin', model: 'Overseas Perpetual Calendar Ultra-Thin', movement: 'Calibre 1120 QP/1', recommendedTpd: 950, direction: 'Hai Chiều' },
  { id: 4, brand: 'A. Lange & Söhne', model: 'Lange 1 Tourbillon Perpetual Calendar', movement: 'Calibre L082.1', recommendedTpd: 800, direction: 'Thuận Chiều' },
  { id: 5, brand: 'Rolex', model: 'Cosmograph Daytona Platinum', movement: 'Calibre 4131 Superlative Chronometer', recommendedTpd: 650, direction: 'Hai Chiều' },
  { id: 6, brand: 'F.P. Journe', model: 'Tourbillon Souverain Vertical', movement: 'Calibre 1519 18K Rose Gold', recommendedTpd: 1200, direction: 'Ngược Chiều' },
]

export function HorologyTimepieceAndCigarVault({ className }: { className?: string } = {}) {
  const [selectedTpd, setSelectedTpd] = useState<TpdPreset>(800)
  const [activeSlotId, setActiveSlotId] = useState<number>(1)
  const [isWindingActive, setIsWindingActive] = useState<boolean>(true)
  const [fingerprintUnlocked, setFingerprintUnlocked] = useState<boolean>(false)

  const activeSlot = TIMEPIECE_SLOTS.find((s) => s.id === activeSlotId) ?? TIMEPIECE_SLOTS[0]!

  const handleSimulateFingerprint = () => {
    setFingerprintUnlocked(true)
    setTimeout(() => {
      setFingerprintUnlocked(false)
    }, 4000)
  }

  return (
    <section
      aria-label="Tủ Xoay Bảo Tồn Đồng Hồ Tourbillon & Xì Gà Vi Khí Hậu"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background warm cedar & amber glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-700/10 blur-[140px]" />
        <div className="absolute bottom-10 right-1/3 h-96 w-96 rounded-full bg-orange-950/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Hầm Bảo Tồn Cơ Khí &amp; Xì Gà Thượng Đẳng
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Tủ Xoay Bảo Tồn Tourbillon &amp; Cigar Spanish Cedar
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Vi khí hậu hoàn hảo cho những cỗ máy đo đếm thời gian tinh xảo bậc nhất. 
            Lót gỗ Spanish Cedar tự nhiên kiểm soát độ ẩm 68% RH và 20°C, 6 ổ xoay động cơ Mabuchi Nhật Bản siêu tĩnh dưới 10 dBA, 
            kính Low-E cản 100% tia cực tím và khóa sinh trắc học quang học đa lớp.
          </p>
        </div>

        {/* Interactive Vault Console */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: 6-Winder Interactive Matrix & Winding Simulation */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Ổ Xoay #{activeSlot.id} • {activeSlot.brand}
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {activeSlot.model}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-amber-400">68% RH</span>
                    <span>|</span>
                    <span className="font-mono text-emerald-400">20.0°C</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">&lt; 10 dBA</span>
                  </div>
                </div>

                {/* 6 Winders Grid Cockpit */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TIMEPIECE_SLOTS.map((slot) => {
                    const isSelected = activeSlotId === slot.id
                    return (
                      <button
                        key={slot.id}
                        onClick={() => {
                          setActiveSlotId(slot.id)
                          setSelectedTpd(slot.recommendedTpd)
                        }}
                        className={cn(
                          'rounded-xl border p-3.5 text-left transition-all relative overflow-hidden flex flex-col justify-between h-36',
                          isSelected
                            ? 'border-amber-500/80 bg-stone-950 shadow-md shadow-amber-900/20'
                            : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        {/* Winder Rotor Circle Animation */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono rounded bg-stone-900 border border-stone-800 px-1.5 py-0.5 text-amber-300">
                            #{slot.id}
                          </span>
                          <div className={cn(
                            'h-7 w-7 rounded-full border-2 border-dashed flex items-center justify-center transition-all',
                            isWindingActive
                              ? 'border-amber-400 animate-[spin_6s_linear_infinite]'
                              : 'border-stone-700'
                          )}>
                            <div className="h-2 w-2 rounded-full bg-amber-400" />
                          </div>
                        </div>

                        <div>
                          <div className="text-xs font-semibold text-stone-200 truncate">
                            {slot.brand}
                          </div>
                          <div className="text-[10px] text-stone-400 truncate">
                            {slot.model}
                          </div>
                          <div className="mt-1 font-mono text-[9px] text-amber-400/90">
                            {slot.recommendedTpd} TPD • {slot.direction}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* TPD Selector Buttons */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-wider text-stone-400 font-mono">
                      Cài Đặt Số Vòng Xoay Hằng Ngày (Turns Per Day - TPD):
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsWindingActive(!isWindingActive)}
                      className="text-[11px] font-mono text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {isWindingActive ? 'Tạm Dừng Ổ Xoay' : 'Kích Hoạt Ổ Xoay'}
                    </button>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {([650, 800, 950, 1200] as TpdPreset[]).map((tpd) => (
                      <button
                        key={tpd}
                        onClick={() => setSelectedTpd(tpd)}
                        className={cn(
                          'rounded-lg border py-2 text-center text-xs font-mono transition-all',
                          selectedTpd === tpd
                            ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold shadow-sm'
                            : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        {tpd} TPD
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slot Detail Box */}
                <div className="mt-5 rounded-xl border border-stone-800 bg-stone-900/50 p-4">
                  <div className="text-xs text-stone-300 leading-relaxed">
                    <span className="font-semibold text-stone-100">Cơ chế bộ máy: </span>
                    {activeSlot.movement}
                  </div>
                  <div className="mt-1.5 text-xs text-stone-400 font-light leading-relaxed">
                    Chu kỳ xoay gián đoạn mô phỏng chính xác cử động cổ tay tự nhiên của chủ nhân, 
                    chống mỏi lò xo cót và ngăn ngừa hiện tượng dầu bôi trơn vi cơ khí bị lắng đọng đông kết.
                  </div>
                </div>
              </div>

              {/* Fingerprint Sensor Trigger */}
              <div className="mt-6 pt-5 border-t border-stone-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleSimulateFingerprint}
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/20 px-4 py-2.5 text-xs font-medium text-amber-300 hover:bg-amber-500/30 transition-colors shadow-sm"
                >
                  <span>Chạm Cảm Biến Khóa Vân Tay Quang Học</span>
                  <span className="rounded bg-stone-950 px-1.5 py-0.5 font-mono text-[10px] text-amber-400">
                    0.2s Biometric
                  </span>
                </button>

                {fingerprintUnlocked && (
                  <span className="text-xs font-mono text-emerald-400 font-medium animate-pulse">
                    ✓ Xác thực thành công: Cửa kính Low-E mở êm ái dưới 8 dBA
                  </span>
                )}
              </div>
            </div>

            {/* Right 5 cols: Spanish Cedar Humidor & Climate Sensor */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/60 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                  Ngăn Xì Gà Spanish Cedar Cổ Thụ
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Hệ tủ giữ ẩm tích hợp bảo tồn lá xì gà Cohiba &amp; Davidoff:
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-200">
                      <span>Độ Ẩm Lý Tưởng Xì Gà</span>
                      <span className="font-mono text-amber-400">68.2% RH</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Cảm biến điện dung Sensirion Thụy Sĩ kết hợp khay nước cất bù ẩm siêu âm vi hạt, 
                      giữ cho lá cuốn luôn dẻo dai, không rách vỡ và phát triển hương thơm béo ngậy.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-200">
                      <span>Nhiệt Độ Hầm Rượu &amp; Cigar</span>
                      <span className="font-mono text-emerald-400">20.0°C Cố Định</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Hệ làm lạnh bán dẫn Peltier không dùng block nén, triệt tiêu hoàn toàn rung chấn vi mô bảo vệ chân kính tourbillon và bánh đà cân bằng.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-200">
                      <span>Kính Low-E Lọc Quang Phổ UV</span>
                      <span className="font-mono text-cyan-400">100% Cản UV</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Ngăn chặn hoàn toàn tia tử ngoại làm phai màu men nung Grand Feu và nứt nẻ mặt số tráng men ngọc bích quý hiếm.
                    </p>
                  </div>
                </div>

                {/* Spanish Cedar Aroma Benefit */}
                <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-3.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Hương Tinh Dầu Tuyết Tùng Tây Ban Nha
                  </div>
                  <p className="mt-1 text-[11px] text-stone-300 font-light leading-relaxed">
                    Kháng mọt xì gà Lasioderma tự nhiên, điều hòa ẩm hai chiều và ướp hương gỗ thơm quý tộc cho toàn bộ không gian phòng làm việc.
                  </p>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-light">
                    May đo tủ âm tường theo bộ sưu tập:
                  </span>
                  <Link
                    href="/du-toan-chi-phi"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                  >
                    <span>Dự toán tủ bảo tồn</span>
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio visit link */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Xem mẫu tủ xoay Tourbillon &amp; Spanish Cedar hoàn thiện tại{' '}
            <span className="font-medium text-stone-200">GuHomes Bespoke Atelier (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Đặt lịch tư vấn kích thước tủ</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <span className="text-stone-700">|</span>
            <a
              href="tel:0368757916"
              className="text-xs text-stone-300 hover:text-white font-mono transition-colors"
            >
              Hotline: 0368 757 916
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
