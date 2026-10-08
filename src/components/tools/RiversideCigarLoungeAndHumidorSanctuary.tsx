'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface HumidorCigarSelection {
  id: string
  nameVi: string
  originVi: string
  ringGaugeVi: string
  agingPeriodVi: string
  flavorProfileVi: string
  pairingVi: string
}

const HUMIDOR_CIGARS: HumidorCigarSelection[] = [
  {
    id: 'cohiba-behike-56',
    nameVi: 'Cohiba Behike BHK 56 Limited',
    originVi: 'Vùng Vuelta Abajo, Pinar del Río, Cuba',
    ringGaugeVi: 'Vòng đo 56 · Dài 166 mm',
    agingPeriodVi: 'Ủ 8 năm trong tủ Spanish Cedar tự nhiên',
    flavorProfileVi: 'Khởi đầu với nốt tiêu trắng và cỏ tươi, tầng giữa bung nở hương da thuộc quý tộc, kết thúc đầm ấm vị đất ẩm và hạt cà phê rang cháy.',
    pairingVi: 'Rượu Cognac Hennessy Paradis hoặc Macallan 25 năm',
  },
  {
    id: 'davidoff-royal-release',
    nameVi: 'Davidoff Royal Release Salomones',
    originVi: 'Cộng hòa Dominica · Chọn lọc bởi Master Blender',
    ringGaugeVi: 'Dáng ngư lôi Salomones vòng đo 57',
    agingPeriodVi: 'Ủ 10 năm lá thuốc tuyển chọn',
    flavorProfileVi: 'Cực kỳ tinh tế, khói mượt mà với hương hoa hồi, gỗ sồi cháy và cacao đen mịn.',
    pairingVi: 'Rượu vang đỏ Château Margaux hoặc trà Shan Tuyết cổ thụ',
  },
  {
    id: 'partagas-serie-d4',
    nameVi: 'Partagás Serie D No. 4 Robusto',
    originVi: 'La Habana, Cuba · Dòng Robusto kinh điển',
    ringGaugeVi: 'Vòng đo 50 · Dài 124 mm',
    agingPeriodVi: 'Ủ 5 năm độ ẩm chuẩn 68% RH',
    flavorProfileVi: 'Mạnh mẽ, nồng nàn với hương gỗ tuyết tùng và gia vị nướng, hậu vị đầm sâu.',
    pairingVi: 'Cà phê Espresso rang mộc hoặc rượu Rum ngoại hạng',
  },
]

export function RiversideCigarLoungeAndHumidorSanctuary({ className }: { className?: string } = {}) {
  const [activeCigarId, setActiveCigarId] = useState<string>('cohiba-behike-56')
  const [negativePressureActive, setNegativePressureActive] = useState<boolean>(true)
  const [humidorHumidity, setHumidorHumidity] = useState<number>(68)
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false)
  const [clientPhone, setClientPhone] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')

  const activeCigar = HUMIDOR_CIGARS.find((c) => c.id === activeCigarId) ?? HUMIDOR_CIGARS[0]!
  const vipPasscode = 'GU-CIGAR-2026-X'

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone) return
    setBookingConfirmed(true)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0807] py-24 text-[#e6ded8] border-t border-[#221612]', className)}>
      {/* Deep Tobacco & Dark Leather Amber Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(199,102,56,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#482518] bg-[#1a0e08] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d97746]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d97746] animate-ping" />
            Đặc Quyền Thưởng Thức Đỉnh Cao · Riverside Negative-Pressure Cigar Lounge
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf6f2]">
            Cigar Lounge Áp Suất Âm & Tủ Ủ Spanish Cedar
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b49e91]">
            Không gian thư giãn riêng tư bên bờ sông Sài Gòn mà không làm ảnh hưởng đến các thành viên trong gia đình: <span className="text-[#d97746] font-medium">Hệ thống áp suất âm -15 Pa quạt hút 2.200 m³/h</span> qua 3 tầng lọc Carbon tổ ong khử sạch 100% khói thuốc, kết hợp tủ bảo quản Humidor gỗ Spanish Cedar (Tuyết Tùng Tây Ban Nha) duy trì 68% RH và ghế bành da bò Ý khâu tay.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Humidor Collection & Cedar Curing */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#3b1d14] bg-[#140a06]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#29130c] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d97746]">
                    Bộ Sưu Tập Cigar Ủ Tủ Spanish Cedar
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf6f2]">
                    Dưỡng Hương Trong Thớ Gỗ Tuyết Tùng
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#240e07] px-3 py-1 text-xs font-mono text-[#f09f74]">
                  <span>Mã VIP: {vipPasscode}</span>
                </div>
              </div>

              {/* Cigar Buttons */}
              <div className="mt-6 flex flex-col gap-3">
                {HUMIDOR_CIGARS.map((cigar) => {
                  const isSelected = cigar.id === activeCigarId
                  return (
                    <button
                      key={cigar.id}
                      type="button"
                      onClick={() => setActiveCigarId(cigar.id)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#d97746] bg-[#241108] text-white shadow-[0_0_15px_rgba(217,119,70,0.18)]'
                          : 'border-[#26120a] bg-[#0f0603] text-[#9c8276] hover:border-[#3d1e12] hover:text-[#e6ded8]'
                      )}
                    >
                      <div>
                        <span className="block text-sm font-medium font-serif text-[#fbf6f2]">
                          {cigar.nameVi}
                        </span>
                        <span className="block text-xs text-[#9d7d70] italic mt-0.5">
                          {cigar.originVi} · {cigar.ringGaugeVi}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#d97746] hidden sm:inline">
                        Chi tiết →
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Cigar Card */}
              <div className="mt-6 rounded-xl border border-[#3b1d14] bg-[#190c06] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#d97746] uppercase">{activeCigar.ringGaugeVi}</span>
                  <span className="rounded-full bg-[#271007] px-2.5 py-0.5 text-[#f09f74]">
                    {activeCigar.agingPeriodVi}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#fbf6f2]">
                  {activeCigar.nameVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#baa194]">
                  {activeCigar.flavorProfileVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#29130c] text-xs">
                  <div className="rounded-lg bg-[#0e0503] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#735447]">Đồ Uống Ghép Đôi</span>
                    <span className="mt-1 block font-medium text-[#f0e4dc]">{activeCigar.pairingVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#0e0503] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#735447]">Gỗ Tủ Bảo Quản</span>
                    <span className="mt-1 block font-medium text-[#d97746]">100% Spanish Cedar không sơn bóng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: -15 Pa Negative Pressure & Humidor 68% RH Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#3b1d14] bg-[#140a06]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#29130c] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d97746]">
                  Hệ Thống Áp Suất Âm & Vi Khí Hậu
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf6f2]">
                  Khử Mùi Tuyệt Đối 100% Không Lọt Khói
                </h3>
              </div>

              {/* Negative Pressure Switch */}
              <div className="mt-5 rounded-xl border border-[#3b1d14] bg-[#190c06] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#d97746] uppercase block">
                      Quạt Hút Áp Suất Âm -15 Pa
                    </span>
                    <span className="text-xs text-[#a08477]">Lưu lượng 2.200 m³/h hút khói ngay tại ghế</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNegativePressureActive(!negativePressureActive)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                      negativePressureActive
                        ? 'bg-[#d97746] text-[#0a0807] font-bold shadow-[0_0_12px_rgba(217,119,70,0.3)]'
                        : 'border border-[#482518] bg-[#1a0e08] text-[#735447]'
                    )}
                  >
                    {negativePressureActive ? '⚡ HÚT: -15 Pa' : '⏸ QUẠT: TẮT'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#29130c] text-[11px] font-mono">
                  <div>
                    <span className="text-[#735447] block text-[10px]">RÒ RỈ MÙI RA NGOÀI:</span>
                    <span className="text-[#d97746]">
                      {negativePressureActive ? '0.0% (Khóa kín tuyệt đối)' : 'Nguy cơ bay sang phòng khác'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#735447] block text-[10px]">LỌC CARBON TỔ ONG:</span>
                    <span className="text-[#fbf6f2]">
                      {negativePressureActive ? '3 Tầng Lọc Hoạt Tính' : 'Không hoạt động'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Humidor Humidity Slider */}
              <div className="mt-4 rounded-xl border border-[#3b1d14] bg-[#190c06] p-4 space-y-3">
                <div className="flex justify-between items-center text-xs font-mono text-[#a88f83]">
                  <span>Độ Ẩm Tủ Ủ Spanish Cedar:</span>
                  <span className="font-bold text-[#d97746]">{humidorHumidity}% RH · 18.0°C</span>
                </div>
                <input
                  type="range"
                  min="62"
                  max="74"
                  step="1"
                  value={humidorHumidity}
                  onChange={(e) => setHumidorHumidity(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-[#271007] accent-[#d97746] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#6e4e42]">
                  <span>62% (Lá thuốc khô gãy)</span>
                  <span>68% (Chuẩn vàng Habanos)</span>
                  <span>74% (Nguy cơ nấm mốc)</span>
                </div>
              </div>

              {/* Consultation Booking Form */}
              <div className="mt-6 pt-4 border-t border-[#29130c]">
                {bookingConfirmed ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 text-center space-y-2">
                    <span className="inline-block text-2xl">🍂</span>
                    <h4 className="font-serif text-base text-emerald-300 font-medium">
                      Đã Ghi Nhận Yêu Cầu Thiết Kế Cigar Lounge!
                    </h4>
                    <p className="text-xs text-emerald-200/80">
                      KTS Trưởng chuyên trách mảng phòng kín & xử lý mùi sẽ liên hệ khảo sát đường gió và tư vấn giải pháp trong 2 giờ.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(false)}
                      className="mt-3 text-xs font-mono text-[#d97746] underline"
                    >
                      Đăng ký yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-3">
                    <span className="font-mono text-xs text-[#d97746] uppercase block">
                      Đăng Ký Tư Vấn May Đo Cigar Lounge Tư Gia:
                    </span>
                    <div>
                      <input
                        type="text"
                        placeholder="Họ và tên gia chủ"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full rounded-xl border border-[#3b1d14] bg-[#0c0503] px-3.5 py-2.5 text-xs text-[#fbf6f2] placeholder-[#6b4e41] focus:border-[#d97746] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Số điện thoại liên hệ *"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#3b1d14] bg-[#0c0503] px-3.5 py-2.5 text-xs text-[#fbf6f2] placeholder-[#6b4e41] focus:border-[#d97746] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#d97746] py-3 text-xs font-mono font-bold uppercase tracking-wider text-[#0a0807] hover:bg-[#ea8754] transition-all shadow-[0_4px_15px_rgba(217,119,70,0.3)]"
                    >
                      Nhận Đặc Quyền Tư Vấn ({vipPasscode})
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
