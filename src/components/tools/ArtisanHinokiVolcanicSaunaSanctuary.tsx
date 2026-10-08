'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface SaunaCyclePhase {
  id: string
  nameVi: string
  tempVi: string
  durationVi: string
  physiologicalEffectVi: string
  aromaBlendVi: string
}

const SAUNA_PHASES: SaunaCyclePhase[] = [
  {
    id: 'deep-heat',
    nameVi: 'Giai Đoạn 1: Bài Tiết Sâu & Thư Giãn Cơ (Deep Heat)',
    tempVi: '82°C – 88°C (Nhiệt Khô Hinoki)',
    durationVi: '15 Phút Xông Hơi',
    physiologicalEffectVi: 'Giãn nở mao mạch, kích thích tuần hoàn máu và tiết mồ hôi đào thải kim loại nặng. Tinh dầu Phytoncide từ gỗ Hinoki xoa dịu thụ thể thần kinh vỏ não.',
    aromaBlendVi: 'Nước thảo mộc vỏ bưởi Diễn tươi & tinh dầu thông rừng tự nhiên',
  },
  {
    id: 'cold-plunge',
    nameVi: 'Giai Đoạn 2: Tắm Lạnh Kích Hoạt Miễn Dịch (Cold Plunge)',
    tempVi: '14°C – 16°C (Bể Nước Khoáng)',
    durationVi: '3 – 5 Phút Ngâm Lạnh',
    physiologicalEffectVi: 'Co thắt mạch máu tức thì, kích hoạt phản xạ Hormesis sản sinh tế bào miễn dịch và protein sốc nhiệt HSP giúp tái sinh tế bào trẻ trung.',
    aromaBlendVi: 'Nước khoáng lạnh ngâm hoa cúc trắng Bát Tràng',
  },
  {
    id: 'rest-zen',
    nameVi: 'Giai Đoạn 3: Tĩnh Tâm & Cân Bằng Nhịp Tim (Zen Rest)',
    tempVi: '24°C Vi Khí Hậu Tự Nhiên',
    durationVi: '10 Phút Nghỉ Ngơi',
    physiologicalEffectVi: 'Nhịp tim hạ dần về trạng thái nghỉ dưỡng 62 nhịp/phút, sóng não Alpha xuất hiện mang lại cảm giác an yên tuyệt đối.',
    aromaBlendVi: 'Hương trầm hương Tiên Phước lan tỏa nhẹ trong sảnh thiền',
  },
]

export function ArtisanHinokiVolcanicSaunaSanctuary({ className }: { className?: string } = {}) {
  const [activePhaseId, setActivePhaseId] = useState<string>('deep-heat')
  const [steamInfusionActive, setSteamInfusionActive] = useState<boolean>(true)
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false)
  const [clientPhone, setClientPhone] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')

  const activePhase = SAUNA_PHASES.find((p) => p.id === activePhaseId) ?? SAUNA_PHASES[0]!
  const vipPasscode = 'GU-SAUNA-2026-X'

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone) return
    setBookingConfirmed(true)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0a08] py-24 text-[#e8dfd6] border-t border-[#241a12]', className)}>
      {/* Warm Hinoki Cypress & Volcanic Steam Amber Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(217,143,72,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#483120] bg-[#1a110a] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d98f48]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d98f48] animate-ping" />
            Tái Tạo Năng Lượng Rừng Sâu · Hinoki Volcanic Bio-Sauna
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf7f2]">
            Phòng Xông Hơi Gỗ Hinoki & Đá Núi Lửa Trị Liệu
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b5a190]">
            Ốc đảo phục hồi sức khỏe tư gia với <span className="text-[#d98f48] font-medium">Gỗ bách Hinoki Nagano nguyên cây không mắt sẹo</span> tiết hợp chất kháng khuẩn Phytoncide, lò xông đá núi lửa bazan đen Gia Lai tích nhiệt sâu và vách kính hộp cách nhiệt mở trọn tầm nhìn ra vườn thiền sân trong.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Bio-Sauna Circadian Recovery Cycle */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#3b2518] bg-[#140d08]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2b190f] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#d98f48]">
                    Chu Trình Phục Hồi Bio-Sauna 3 Bước
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf7f2]">
                    Liệu Pháp Nhiệt Nóng – Lạnh Hormesis
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#24130a] px-3 py-1 text-xs font-mono text-[#e8b17a]">
                  <span>Mã VIP: {vipPasscode}</span>
                </div>
              </div>

              {/* Phase Switchers */}
              <div className="mt-6 flex flex-col gap-3">
                {SAUNA_PHASES.map((phase) => {
                  const isSelected = phase.id === activePhaseId
                  return (
                    <button
                      key={phase.id}
                      type="button"
                      onClick={() => setActivePhaseId(phase.id)}
                      className={cn(
                        'flex items-center justify-between p-4 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#d98f48] bg-[#241309] text-white shadow-[0_0_15px_rgba(217,143,72,0.18)]'
                          : 'border-[#29170e] bg-[#110804] text-[#9c8474] hover:border-[#422415] hover:text-[#e8dfd6]'
                      )}
                    >
                      <div>
                        <span className="block text-sm font-medium font-serif text-[#fbf7f2]">
                          {phase.nameVi}
                        </span>
                        <span className="block text-xs text-[#a08573] italic mt-0.5">
                          {phase.tempVi} · {phase.durationVi}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-[#d98f48] hidden sm:inline">
                        Chi tiết →
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Phase Card */}
              <div className="mt-6 rounded-xl border border-[#3b2518] bg-[#190f09] p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#d98f48] uppercase">{activePhase.tempVi}</span>
                  <span className="rounded-full bg-[#27140b] px-2.5 py-0.5 text-[#e8b17a]">
                    {activePhase.durationVi}
                  </span>
                </div>

                <h4 className="font-serif text-lg sm:text-xl text-[#fbf7f2]">
                  {activePhase.nameVi}
                </h4>

                <p className="text-sm leading-relaxed text-[#baa494]">
                  {activePhase.physiologicalEffectVi}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#27140b] text-xs">
                  <div className="rounded-lg bg-[#110804] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6050]">Hương Thảo Mộc Tự Nhiên</span>
                    <span className="mt-1 block font-medium text-[#f0e5db]">{activePhase.aromaBlendVi}</span>
                  </div>
                  <div className="rounded-lg bg-[#110804] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6050]">Vật Liệu Vách & Ghế</span>
                    <span className="mt-1 block font-medium text-[#d98f48]">Gỗ Hinoki Nagano bào tay không sáp bóng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Volcanic Stone Stove & Wellness Consultation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#3b2518] bg-[#140d08]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#2b190f] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#d98f48]">
                  Lò Xông Hơi Đá Núi Lửa Bazan Đen
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf7f2]">
                  Tích Nhiệt Sâu & Tỏa Hơi Êm Dịu
                </h3>
              </div>

              {/* Steam Infusion Switch */}
              <div className="mt-5 rounded-xl border border-[#3b2518] bg-[#190f09] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#d98f48] uppercase block">
                      Tưới Nước Thảo Mộc Tự Động (Löyly Steam)
                    </span>
                    <span className="text-xs text-[#b8a090]">Tưới giọt thảo mộc lên 120kg đá núi lửa bazan</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSteamInfusionActive(!steamInfusionActive)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                      steamInfusionActive
                        ? 'bg-[#d98f48] text-[#0c0a08] font-bold shadow-[0_0_12px_rgba(217,143,72,0.3)]'
                        : 'border border-[#483120] bg-[#1a110a] text-[#7a6050]'
                    )}
                  >
                    {steamInfusionActive ? '💨 HƠI NƯỚC: BẬT' : '⏸ HƠI NƯỚC: TẮT'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#27140b] text-[11px] font-mono">
                  <div>
                    <span className="text-[#7a6050] block text-[10px]">ĐÁ NÚI LỬA GIA LAI:</span>
                    <span className="text-[#d98f48]">Chịu nhiệt 1.100°C không nứt</span>
                  </div>
                  <div>
                    <span className="text-[#7a6050] block text-[10px]">ĐỘ ẨM LÒ XÔNG:</span>
                    <span className="text-[#fbf7f2]">15% – 25% (Êm dịu đường thở)</span>
                  </div>
                </div>
              </div>

              {/* Fog-Free Glass Wall to Zen Courtyard */}
              <div className="mt-4 rounded-xl border border-[#2b190f] bg-[#110804] p-4 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#d98f48] uppercase block">
                  Vách Kính Hộp Sấy Viền Chống Đọng Sương:
                </span>
                <p className="text-[#9c8474] leading-relaxed">
                  Vách kính ngăn đôi không gian xông hơi và sân vườn thiền được trang bị dây nhiệt sưởi chìm mép kính, ngăn chặn 100% hơi nước ngưng tụ làm mờ tầm nhìn, giúp gia chủ thư thái ngắm nhìn cây khế cổ thụ và hồ cá Koi bên ngoài.
                </p>
              </div>

              {/* Consultation Booking Form */}
              <div className="mt-6 pt-4 border-t border-[#2b190f]">
                {bookingConfirmed ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 text-center space-y-2">
                    <span className="inline-block text-2xl">🌿</span>
                    <h4 className="font-serif text-base text-emerald-300 font-medium">
                      Đã Ghi Nhận Yêu Cầu Thiết Kế Phòng Wellness!
                    </h4>
                    <p className="text-xs text-emerald-200/80">
                      KTS Trưởng chuyên trách mảng vi khí hậu & spa tư gia sẽ liên hệ tư vấn vị trí và giải pháp kỹ thuật Hinoki trong 2 giờ.
                    </p>
                    <button
                      type="button"
                      onClick={() => setBookingConfirmed(false)}
                      className="mt-3 text-xs font-mono text-[#d98f48] underline"
                    >
                      Đăng ký yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-3">
                    <span className="font-mono text-xs text-[#d98f48] uppercase block">
                      Đăng Ký Tư Vấn May Đo Phòng Wellness Dinh Thự:
                    </span>
                    <div>
                      <input
                        type="text"
                        placeholder="Họ và tên gia chủ"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full rounded-xl border border-[#3b2518] bg-[#0c0704] px-3.5 py-2.5 text-xs text-[#fbf7f2] placeholder-[#6b5547] focus:border-[#d98f48] focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Số điện thoại liên hệ *"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full rounded-xl border border-[#3b2518] bg-[#0c0704] px-3.5 py-2.5 text-xs text-[#fbf7f2] placeholder-[#6b5547] focus:border-[#d98f48] focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-[#d98f48] py-3 text-xs font-mono font-bold uppercase tracking-wider text-[#0c0a08] hover:bg-[#eb9f58] transition-all shadow-[0_4px_15px_rgba(217,143,72,0.3)]"
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
