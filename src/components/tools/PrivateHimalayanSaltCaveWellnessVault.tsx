'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type TherapySession = 'refresh-20' | 'recovery-45' | 'meditation-60'

interface TherapyProfile {
  id: TherapySession
  name: string
  duration: string
  saltAerosol: string
  bedTemp: string
  focus: string
  description: string
}

const THERAPY_PROFILES: Record<TherapySession, TherapyProfile> = {
  'refresh-20': {
    id: 'refresh-20',
    name: 'Liệu Trình Khởi Động Sảng Khoái',
    duration: '20 phút',
    saltAerosol: '3.5 mg/m³',
    bedTemp: '36°C (Ấm nhẹ)',
    focus: 'Làm sạch đường thở & xua tan uể oải',
    description: 'Hạt muối khô vi mô 1-5 micron thẩm thấu vào phế nang, làm sạch bụi mịn sau một ngày di chuyển ngoài phố.',
  },
  'recovery-45': {
    id: 'recovery-45',
    name: 'Liệu Trình Phục Hồi Chuyên Sâu',
    duration: '45 phút',
    saltAerosol: '5.0 mg/m³',
    bedTemp: '38.5°C (Nhiệt sinh học)',
    focus: 'Thư giãn cơ bắp & cân bằng ion âm',
    description: 'Nằm trên giường cát muối hồng sưởi ấm, giải phóng acid lactic cơ thể, tái tạo sinh lực sau giờ tập thể thao.',
  },
  'meditation-60': {
    id: 'meditation-60',
    name: 'Liệu Trình Thiền Định Muối Khoáng',
    duration: '60 phút',
    saltAerosol: '4.0 mg/m³',
    bedTemp: '37.5°C (Thân nhiệt tĩnh)',
    focus: 'Ngủ sâu & tĩnh dưỡng hệ thần kinh',
    description: 'Không gian tĩnh lặng tuyệt đối dưới ánh đèn sợi đốt 2200K xuyên thấu phiến đá muối hồng, dẫn dắt tâm trí vào trạng thái sóng não Theta.',
  },
}

export function PrivateHimalayanSaltCaveWellnessVault({ className }: { className?: string } = {}) {
  const [activeSession, setActiveSession] = useState<TherapySession>('recovery-45')
  const [haloGeneratorActive, setHaloGeneratorActive] = useState<boolean>(true)
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [clientName, setClientName] = useState<string>('')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [estateScope, setEstateScope] = useState<string>('Biệt thự đơn lập ven sông')

  const vipPasscode = 'GU-SALT-2026-X'
  const currentProfile = THERAPY_PROFILES[activeSession]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      aria-label="Phòng Trị Liệu Muối Khoáng Hồng Himalaya Ion Âm"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background Himalayan salt warm glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 right-1/4 h-96 w-96 rounded-full bg-rose-950/20 blur-[130px]" />
        <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-amber-950/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_30%,rgba(244,63,94,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/50 px-3.5 py-1 text-xs tracking-widest text-rose-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
            Trị Liệu Khí Dung Halotherapy Dinh Thự
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Phòng Trị Liệu Muối Khoáng Hồng Himalaya Ion Âm
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Vách phòng xây từ 3.5 tấn gạch đá muối hồng Himalaya rọi đèn sợi đốt 2200K, giải phóng 2.500 ions/cm³ thanh lọc đường hô hấp. 
            Kết hợp giường sưởi cát muối ấm 38°C và máy tạo khí dung muối khô y khoa hạt mịn 1-5 micron.
          </p>
        </div>

        {/* Interactive Therapy Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Session Selection & Salt Visual Ambient */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-rose-400 font-mono font-medium">
                      Lựa Chọn Liệu Trình Halotherapy Tại Gia
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentProfile.name} ({currentProfile.duration})
                    </h3>
                  </div>

                  {/* 3 Session Pills */}
                  <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded-xl p-1 text-xs">
                    {(['refresh-20', 'recovery-45', 'meditation-60'] as const).map((key) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveSession(key)}
                        className={cn(
                          'px-2.5 py-1.5 rounded-lg transition-colors font-medium',
                          activeSession === key
                            ? 'bg-rose-600 text-stone-950 shadow-md shadow-rose-500/20'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {key === 'refresh-20' ? '20 Phút' : key === 'recovery-45' ? '45 Phút' : '60 Phút'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Salt Cave Ambiance Box */}
                <div className="mt-6 relative h-56 sm:h-64 rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-rose-950/20 to-black overflow-hidden flex flex-col justify-between p-6">
                  {/* Glowing salt brick wall texture simulation */}
                  <div className="absolute inset-0 opacity-30 pointer-events-none">
                    <div className="h-full w-full bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]" />
                  </div>

                  {/* Halotherapy micro-mist vapor particles */}
                  <div className="absolute inset-0 flex justify-around pointer-events-none opacity-20">
                    <span className="h-full w-12 bg-white/10 blur-xl animate-pulse" />
                    <span className="h-full w-16 bg-rose-200/10 blur-2xl animate-pulse" />
                    <span className="h-full w-10 bg-white/10 blur-xl animate-pulse" />
                  </div>

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-xs font-mono text-rose-300 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-rose-400 animate-ping" />
                      3.5 Tấn Đá Muối Tự Nhiên · Đèn Sợi Đốt 2200K
                    </span>

                    <button
                      type="button"
                      onClick={() => setHaloGeneratorActive(!haloGeneratorActive)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-mono transition-all border',
                        haloGeneratorActive
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                          : 'bg-stone-900 text-stone-400 border-stone-700'
                      )}
                    >
                      {haloGeneratorActive ? 'Khí Dung Muối Khô: Đang Bơm' : 'Khí Dung: Tạm Dừng'}
                    </button>
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs text-stone-400 font-mono block">Mục Tiêu Trị Liệu:</span>
                    <p className="font-serif text-stone-100 text-sm sm:text-base mt-0.5">
                      {currentProfile.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono pt-3 border-t border-stone-800/80">
                    <span className="text-stone-400">
                      Nồng độ khí dung: <strong className="text-rose-300">{currentProfile.saltAerosol}</strong>
                    </span>
                    <span className="text-stone-400">
                      Nhiệt độ cát sưởi: <strong className="text-amber-300">{currentProfile.bedTemp}</strong>
                    </span>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Mật Độ Ion Âm</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-rose-400">
                      2.500 ions/cm³
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Tương đương rừng thông Đà Lạt</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Kích Thước Hạt Muối</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-emerald-400">
                      1 — 5 micron
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Thấm sâu vào phế nang</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Độ Ẩm Kiểm Soát</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-cyan-300">
                      42% RH
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Khô ráo, không làm chảy muối</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Custom Consultation Form */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Tư Vấn Thiết Kế Suite Muối Khoáng
                  </span>
                  <span className="text-xs font-mono text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                    Bespoke Wellness
                  </span>
                </div>

                {submitted ? (
                  <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-5 text-center my-6">
                    <div className="mx-auto h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-serif text-stone-100 block">Đã Ghi Nhận Hồ Sơ</span>
                    <p className="mt-1 text-xs text-stone-400">
                      KTS Trưởng GuHomes sẽ liên hệ gia chủ {clientName} qua số {clientPhone} để lên phương án kết cấu và cấp khí dung muối khoáng.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="my-5 space-y-3.5 text-left">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Họ Tên Gia Chủ *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ông / Bà..."
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-rose-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Số Điện Thoại Trực Tiếp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-rose-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Quy Mô Dự Kiến
                      </label>
                      <select
                        value={estateScope}
                        onChange={(e) => setEstateScope(e.target.value)}
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 focus:outline-none focus:border-rose-500/50"
                      >
                        <option value="Biệt thự đơn lập ven sông">Biệt thự đơn lập ven sông (Phòng 15 - 25m²)</option>
                        <option value="Penthouse trung tâm">Penthouse trung tâm (Phòng 10 - 15m²)</option>
                        <option value="Tích hợp bên cạnh Sauna Hinoki">Tích hợp bên cạnh Sauna Hinoki & Cold Plunge</option>
                      </select>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full h-11 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-medium text-xs tracking-wide transition-all duration-200 shadow-lg shadow-rose-900/30 flex items-center justify-center gap-1.5"
                      >
                        <span>Nhận Bản Vẽ Phác Thảo Phòng Muối Khoáng</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Mã An Toàn Y Khoa:</span>
                <span className="font-mono text-rose-300 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {vipPasscode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clinical Health Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-400">
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-rose-400 font-mono block mb-1">Thanh Lọc Độc Tố Phổi</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Khí dung muối NaCl tự nhiên tiêu diệt vi khuẩn, hòa tan dịch nhầy và hỗ trợ điều trị viêm xoang, dị ứng thời tiết do vi khí hậu ẩm Sài Gòn.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-rose-400 font-mono block mb-1">Cải Thiện Giấc Ngủ Sâu</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Mật độ ion âm dồi dào trung hòa các ion dương phát ra từ thiết bị điện tử, giúp giảm nồng độ cortisol (hoóc-môn stress) và ngủ sâu hơn.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-rose-400 font-mono block mb-1">Vật Liệu Kháng Ẩm Tuyệt Đối</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Toàn bộ hệ thống vách và sàn được trang bị màng ngăn ẩm chuyên dụng, máy hút ẩm Rotor đảm bảo đá muối không bao giờ bị chảy nước.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
