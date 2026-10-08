'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface SeasonDawnOrientation {
  id: string
  seasonNameVi: string
  azimuthVi: string
  sunriseTimeVi: string
  windDirectionVi: string
  zenActivityVi: string
}

const DAWN_ORIENTATIONS: SeasonDawnOrientation[] = [
  {
    id: 'dry-season',
    seasonNameVi: 'Mùa Khô Sài Gòn (Tháng 12 – Tháng 4)',
    azimuthVi: 'Góc Phương Vị 112° Đông Nam (Nắng Ấm Dịu)',
    sunriseTimeVi: '05:45 – 06:15 Sáng',
    windDirectionVi: 'Gió mùa Đông Bắc lướt qua mặt nước sông Sài Gòn, độ ẩm 60% se lạnh sảng khoái',
    zenActivityVi: 'Thực hành Yoga Chào Mặt Trời (Surya Namaskar) và thiền thở Pranayama trên sàn gỗ Hinoki.',
  },
  {
    id: 'monsoon-season',
    seasonNameVi: 'Mùa Mưa Sài Gòn (Tháng 5 – Tháng 11)',
    azimuthVi: 'Góc Phương Vị 68° Đông Bắc (Rạng Đông Mát Mẻ)',
    sunriseTimeVi: '05:30 – 06:00 Sáng',
    windDirectionVi: 'Gió mùa Tây Nam dịu nhẹ, không khí tinh khiết sau cơn mưa đêm rửa sạch bụi mịn đô thị',
    zenActivityVi: 'Ngồi thiền tĩnh tọa Vipassana lắng nghe tiếng nước sông róc rách và chuông xoay Solfeggio.',
  },
]

export function RiversideDawnZenYogaPavilion({ className }: { className?: string } = {}) {
  const [activeSeasonId, setActiveSeasonId] = useState<string>('dry-season')
  const [bellPlaying, setBellPlaying] = useState<boolean>(false)
  const [louverAngle, setLouverAngle] = useState<number>(45)
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false)
  const [clientPhone, setClientPhone] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')

  const activeSeason = DAWN_ORIENTATIONS.find((s) => s.id === activeSeasonId) ?? DAWN_ORIENTATIONS[0]!
  const vipPasscode = 'GU-ZEN-2026-X'

  const playSingingBowl528Hz = () => {
    try {
      if (typeof window === 'undefined') return
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // 528 Hz Solfeggio Miracle Transformation Frequency
      osc.type = 'sine'
      osc.frequency.setValueAtTime(528, ctx.currentTime)

      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 3.6)

      setBellPlaying(true)
      setTimeout(() => setBellPlaying(false), 3500)
    } catch {
      // Graceful fallback for environments with blocked audio context
      setBellPlaying(true)
      setTimeout(() => setBellPlaying(false), 1500)
    }
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone) return
    setBookingConfirmed(true)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0d0a] py-24 text-[#e2e7e2] border-t border-[#1b261b]', className)}>
      {/* Morning Mist Celadon & Soft Amber Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(74,150,105,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2b442f] bg-[#122116] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#6ee7b7]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-ping" />
            Khoảng Lặng Tâm Hồn Lúc Rạng Đông · Riverside Dawn Zen Pavilion
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f3f7f3]">
            Phòng Thiền Yoga Đón Bình Minh Sông Sài Gòn
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#9cb19e]">
            Ban công penthouse hay khuôn viên villa ven sông hướng Đông Nam là nơi quy tụ nguồn sinh khí tinh khôi nhất của đất trời. GuHomes thiết kế sàn gỗ Hinoki thơm lành, <span className="text-[#6ee7b7] font-medium">hệ vách lam gỗ xoay 180° nắn luồng gió đối lưu tự nhiên</span> và chuông xoay Tây Tạng 7 kim loại ngân vang tần số 528Hz Solfeggio chữa lành tâm thức.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Dawn Sun Orientation & River Breeze Louvers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#233827] bg-[#101912]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1c2c20] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#6ee7b7]">
                    Định Vị Hướng Nắng & Gió Sông Sài Gòn
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f3f7f3]">
                    Góc Phương Vị Theo Mùa TP. Hồ Chí Minh
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#18291e] px-3 py-1 text-xs font-mono text-[#a7f3d0]">
                  <span>Mã VIP: {vipPasscode}</span>
                </div>
              </div>

              {/* Season Buttons */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DAWN_ORIENTATIONS.map((season) => {
                  const isSelected = season.id === activeSeasonId
                  return (
                    <button
                      key={season.id}
                      type="button"
                      onClick={() => setActiveSeasonId(season.id)}
                      className={cn(
                        'flex flex-col justify-between p-4 rounded-xl border text-left transition-all min-h-[96px]',
                        isSelected
                          ? 'border-[#34d399] bg-[#172c1e] text-white shadow-[0_0_15px_rgba(52,211,153,0.18)]'
                          : 'border-[#1e3022] bg-[#0c140e] text-[#8ea391] hover:border-[#2f4a35] hover:text-[#e2e7e2]'
                      )}
                    >
                      <span className="font-serif text-sm font-medium text-[#f3f7f3]">{season.seasonNameVi}</span>
                      <span className="text-[11px] text-[#6b856e] italic mt-1">{season.sunriseTimeVi}</span>
                      <span className="font-mono text-[10px] text-[#34d399] mt-2">{season.azimuthVi.split(' (')[0]}</span>
                    </button>
                  )
                })}
              </div>

              {/* Active Season Detail Card */}
              <div className="mt-6 rounded-xl border border-[#283e2d] bg-[#142217] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#6ee7b7] uppercase">{activeSeason.azimuthVi}</span>
                  <span className="rounded-full bg-[#1e3223] px-2.5 py-0.5 text-[#a7f3d0]">
                    {activeSeason.sunriseTimeVi}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#f3f7f3]">
                  {activeSeason.seasonNameVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#b5cab8]">
                  {activeSeason.windDirectionVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1e3223] text-xs">
                  <div className="rounded-lg bg-[#0c140e] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#6b856e]">Hoạt Động Khuyến Nghị</span>
                    <span className="mt-1 block font-medium text-[#e2ede3]">{activeSeason.zenActivityVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0c140e] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#6b856e]">Vật Liệu Thảm Sàn</span>
                    <span className="mt-1 block font-medium text-[#6ee7b7]">Gỗ bách Hinoki ấm áp & màng cói Tatami</span>
                  </div>
                </div>
              </div>

              {/* 180° Rotating Louvers Slider */}
              <div className="mt-5 rounded-xl border border-[#233827] bg-[#0f1a12] p-4">
                <div className="flex justify-between items-center text-xs font-mono text-[#9cb19e]">
                  <span>Góc Xoay Lam Gỗ Điều Tiết Gió Sông:</span>
                  <span className="font-bold text-[#34d399]">{louverAngle}° Góc Đón Gió</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="15"
                  value={louverAngle}
                  onChange={(e) => setLouverAngle(Number(e.target.value))}
                  className="mt-2 w-full h-2 rounded-lg bg-[#1e3223] accent-[#34d399] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#607763] mt-1">
                  <span>0° (Đóng kín cản mưa tạt)</span>
                  <span>45° (Lọc gió vi khí hậu)</span>
                  <span>180° (Mở toang ngắm sông)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 528Hz Solfeggio Tibetan Singing Bowl & Consultation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#233827] bg-[#101912]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#1c2c20] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#6ee7b7]">
                  Âm Học Trị Liệu Rung Động Tế Bào
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f3f7f3]">
                  Chuông Xoay Tây Tạng 528Hz
                </h3>
              </div>

              {/* Interactive Singing Bowl Sound Generator */}
              <div className="mt-5 rounded-xl border border-[#283e2d] bg-[#142217] p-5 text-center space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#34d399] bg-[#18291e] shadow-[0_0_20px_rgba(52,211,153,0.25)]">
                  <span className="text-3xl">🔔</span>
                </div>

                <div>
                  <h4 className="font-serif text-base text-[#f3f7f3]">
                    Tần Số Solfeggio 528Hz (Miracle Tone)
                  </h4>
                  <p className="mt-1 text-xs text-[#9cb19e] leading-relaxed">
                    Đúc thủ công từ hợp kim 7 kim loại thiêng (Vàng, Bạc, Đồng, Sắt, Thiếc, Chì, Thủy ngân). Âm vang cộng hưởng làm lắng dịu sóng não, đưa tâm trí về trạng thái thiền định sâu.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={playSingingBowl528Hz}
                  disabled={bellPlaying}
                  className={cn(
                    'w-full rounded-xl py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md',
                    bellPlaying
                      ? 'bg-[#34d399] text-[#0a0d0a] shadow-[0_0_15px_rgba(52,211,153,0.4)] animate-pulse'
                      : 'bg-[#059669] text-white hover:bg-[#047857]'
                  )}
                >
                  {bellPlaying ? '✨ Đang Ngân Vang 528Hz...' : '🎵 Gõ Chuông Xoay Thử Âm'}
                </button>
              </div>

              {/* Consultation Booking Form */}
              <div className="mt-6 pt-4 border-t border-[#1c2c20]">
                {bookingConfirmed ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 text-center space-y-2">
                    <span className="inline-block text-2xl">🌿</span>
                    <h4 className="font-serif text-base text-emerald-300 font-medium">
                      Đã Ghi Nhận Lịch Tư Vấn Không Gian Thiền!
                    </h4>
                    <p className="text-xs text-emerald-200/80">
                      KTS Trưởng chuyên trách vi khí hậu và phong thủy năng lượng sẽ liên hệ trao đổi chi tiết giải pháp hướng nắng sông trong 2 giờ.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(false)}
                      className="mt-3 text-xs font-mono text-[#6ee7b7] underline"
                    >
                      Đăng ký lịch khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-3">
                    <span className="font-mono text-xs text-[#6ee7b7] uppercase block">
                      Đăng Ký Khảo Sát Không Gian Thiền Tư Gia:
                    </span>
                    <div>
                      <input
                        type="text"
                        placeholder="Họ và tên gia chủ"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full rounded-xl border border-[#233827] bg-[#0c140e] px-3.5 py-2.5 text-xs text-[#f3f7f3] placeholder-[#556957] focus:border-[#34d399] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Số điện thoại liên hệ *"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#233827] bg-[#0c140e] px-3.5 py-2.5 text-xs text-[#f3f7f3] placeholder-[#556957] focus:border-[#34d399] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#059669] py-3 text-xs font-mono font-bold uppercase tracking-wider text-white hover:bg-[#047857] transition-all shadow-[0_4px_15px_rgba(5,150,105,0.3)]"
                    >
                      Nhận Tư Vấn May Đo ({vipPasscode})
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
