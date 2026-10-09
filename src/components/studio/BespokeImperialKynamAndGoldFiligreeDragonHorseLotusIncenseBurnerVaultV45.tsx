'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV45() {
  const [temperature, setTemperature] = useState(142) // 80°C to 240°C
  const [selectedKynam, setSelectedKynam] = useState<'bachKy' | 'hacKy' | 'huynhKy'>('bachKy')
  const [isAudioResonance, setIsAudioResonance] = useState(false)
  const [isIncenseActive, setIsIncenseActive] = useState(true)

  // Web Audio Context & Nodes refs for thorough cleanup
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc741Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (osc528Ref.current) {
        try {
          osc528Ref.current.stop()
          osc528Ref.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (osc741Ref.current) {
        try {
          osc741Ref.current.stop()
          osc741Ref.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  const toggleHarmonics = () => {
    if (!isAudioResonance) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime) // Solfeggio 528Hz

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(741, ctx.currentTime) // Solfeggio 741Hz (Trực giác & Thức tỉnh)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc741Ref.current = osc2
        gainRef.current = gain
        setIsAudioResonance(true)
      } catch {
        setIsAudioResonance(false)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc741Ref.current?.stop()
            osc741Ref.current?.disconnect()
            setIsAudioResonance(false)
          }, 650)
        } catch {
          setIsAudioResonance(false)
        }
      } else {
        setIsAudioResonance(false)
      }
    }
  }

  // Kynam Profiles
  const kynamProfiles = {
    bachKy: {
      name: 'Bạch Kỳ Nam Khánh Hòa 99.99% Chìm Nước',
      origin: 'Rừng Nguyên Sinh Suối Dầu, Khánh Hòa',
      sweetness: 'Ngọt Ngào Thanh Khiết, Đượm Vị Hoa Sen Hoàng Cung',
      idealTemp: 142,
      frequency: '528Hz + 741Hz',
      description: 'Chất ngọc Kỳ Nam bọc vàng 24K Filigree, tỏa ngát hương thơm thanh nhã bậc nhất chốn hoàng gia.',
    },
    hacKy: {
      name: 'Hắc Kỳ Nam Rừng Già 430 Năm',
      origin: 'Đại Ngàn Tây Trà, Quảng Ngãi',
      sweetness: 'Trầm Mặc Huyền Bí, Đượm Hương Gỗ Cổ Thụ',
      idealTemp: 160,
      frequency: '528Hz + 741Hz',
      description: 'Khối trầm đen bóng như huyền ngọc chìm đáy nước, phân tử hương xua tan âu lo căng thẳng.',
    },
    huynhKy: {
      name: 'Huỳnh Kỳ Nam Quý Tộc',
      origin: 'Rừng Già Phước Sơn, Quảng Nam',
      sweetness: 'Ấm Áp Thanh Lương, Hậu Vị Mật Rừng Tinh Khiết',
      idealTemp: 130,
      frequency: '528Hz + 741Hz',
      description: 'Sắc vàng mật ong hổ phách quý hiếm, khai mở vượng khí và may mắn trường tồn.',
    },
  }

  const currentProfile = kynamProfiles[selectedKynam]

  return (
    <section className="relative my-16 overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-[#0D0B08] p-6 text-[#EFEBE4] shadow-2xl backdrop-blur-md sm:p-10">
      <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#D4AF37]/8 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#B8860B]/10 blur-3xl" />

      {/* Header Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
        <div>
          <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
            Bảo Vật Phòng Khách Hoàng Gia V45
          </span>
          <h3 className="mt-2 text-xl font-semibold tracking-wide text-[#FAF7EE] sm:text-2xl">
            Bảo Thất Kỳ Nam & Đỉnh Lư Kim Long Mã Thập Nhị Tứ Thập Ngũ Thế V45
          </h3>
          <p className="mt-1 text-xs text-[#A89F91] sm:text-sm">
            Án hương cổ mộc Mun Sừng Khánh Hòa Cổ Thụ 400 năm tuổi, đỉnh đồng đỏ bọc vàng 24K Filigree tinh xảo và vi điều nhiệt bạch kim bảo tồn tinh chất Kỳ Nam.
          </p>
        </div>

        {/* Audio Toggle Button */}
        <button
          type="button"
          onClick={toggleHarmonics}
          className={`min-h-[44px] min-w-[44px] flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
            isAudioResonance
              ? 'border-[#D4AF37] bg-[#D4AF37]/25 text-[#FAF7EE] shadow-[0_0_15px_rgba(212,175,55,0.35)]'
              : 'border-[#332A1D] bg-[#16120D] text-[#A89F91] hover:border-[#D4AF37]/50 hover:text-[#EFEBE4]'
          }`}
          aria-label="Kích hoạt cộng hưởng âm thanh Solfeggio 528Hz và 741Hz"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <span>{isAudioResonance ? 'Hòa Âm 528Hz + 741Hz: Đang Mở' : 'Mở Hòa Âm Kỳ Nam (528Hz + 741Hz)'}</span>
        </button>
      </div>

      {/* Main Interactive Showcase Grid */}
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Visual Display (7 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#332A1D] bg-[#14100B] p-6 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between text-xs text-[#A89F91]">
              <span>HÌNH TƯỢNG ĐỈNH LƯ KIM LONG MÃ VÀNG 24K FILIGREE</span>
              <span className="font-mono text-[#D4AF37]">Án Mun Sừng Khánh Hòa 400 Năm</span>
            </div>

            {/* Incense Burner Artistic Visual Canvas */}
            <div className="relative my-6 flex h-64 items-center justify-center overflow-hidden rounded-xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#1C1710] to-[#0A0805]">
              {/* Incense Smoke Aura FX */}
              {isIncenseActive && (
                <div className="absolute inset-0 flex items-center justify-center opacity-40">
                  <div className="h-44 w-44 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/25 via-transparent to-transparent animate-pulse" />
                </div>
              )}

              {/* Incense Burner & Dragon Horse SVG Silhouette */}
              <svg className="h-44 w-44 text-[#D4AF37]" viewBox="0 0 200 200" fill="none">
                {/* Ancient Ebony Altar Base */}
                <rect x="30" y="165" width="140" height="15" rx="3" fill="#1C1917" stroke="#D4AF37" strokeWidth="1.2" />
                <rect x="45" y="180" width="110" height="8" rx="2" fill="#0C0A09" />

                {/* Lotus Petal Bronze Base */}
                <path d="M60 165 C60 145, 140 145, 140 165 Z" fill="#B8860B" stroke="#F5D061" strokeWidth="1.5" />
                <path d="M70 165 C70 150, 130 150, 130 165 Z" fill="#D4AF37" opacity="0.9" />

                {/* Incense Vault Body with Filigree Lotus Engraving */}
                <circle cx="100" cy="120" r="32" fill="#8B6508" stroke="#D4AF37" strokeWidth="2" />
                <circle cx="100" cy="120" r="24" stroke="#FFF8DC" strokeWidth="0.8" strokeDasharray="3 3" />

                {/* Dragon Horse Figurine Crown */}
                <path d="M92 88 Q100 68 108 88 Q115 80 100 65 Q85 80 92 88 Z" fill="#F5D061" stroke="#D4AF37" strokeWidth="1.5" />
                {/* Filigree Wings */}
                <path d="M80 115 Q65 95 85 92" stroke="#F5D061" strokeWidth="1.5" fill="none" />
                <path d="M120 115 Q135 95 115 92" stroke="#F5D061" strokeWidth="1.5" fill="none" />

                {/* Incense Smoke Stream Particles */}
                {isIncenseActive && (
                  <g className="opacity-80">
                    <path d="M100 65 Q95 45 105 30 T95 10" stroke="#FAF7EE" strokeWidth="1.5" strokeDasharray="2 3" fill="none" />
                    <circle cx="100" cy="40" r="2.5" fill="#FAF7EE" opacity="0.6" />
                    <circle cx="104" cy="22" r="2" fill="#FAF7EE" opacity="0.4" />
                  </g>
                )}
              </svg>

              {/* Realtime Thermostat Display */}
              <div className="absolute bottom-3 left-3 rounded-lg border border-[#332A1D] bg-[#0D0B08]/85 px-2.5 py-1 text-[11px] font-mono text-[#D4AF37]">
                Vi Điều Nhiệt: {temperature}°C | Dầu Kỳ Nam: Tỏa Hương Hoàn Hảo
              </div>
            </div>
          </div>

          {/* Telemetry Stats */}
          <div className="grid grid-cols-3 gap-3 border-t border-[#332A1D] pt-4 text-center">
            <div className="rounded-xl border border-[#332A1D] bg-[#1A140E] p-2.5">
              <span className="block text-[10px] text-[#A89F91]">NHIỆT ĐỘ TỐI ƯU</span>
              <span className="text-sm font-semibold text-[#F59E0B] sm:text-base">{temperature}°C</span>
            </div>
            <div className="rounded-xl border border-[#332A1D] bg-[#1A140E] p-2.5">
              <span className="block text-[10px] text-[#A89F91]">HÒA ÂM CỘNG HƯỞNG</span>
              <span className="text-sm font-semibold text-[#38BDF8] sm:text-base">{currentProfile.frequency}</span>
            </div>
            <div className="rounded-xl border border-[#332A1D] bg-[#1A140E] p-2.5">
              <span className="block text-[10px] text-[#A89F91]">ĐỘ TINH KHIẾT KỲ NAM</span>
              <span className="text-sm font-semibold text-[#10B981] sm:text-base">99.99%</span>
            </div>
          </div>
        </div>

        {/* Right Controls Panel (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#332A1D] bg-[#14100B] p-6 lg:col-span-5">
          <div className="space-y-6">
            {/* Kynam Selector */}
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-[#A89F91]">
                Chọn Phẩm Cấp Kỳ Nam Hoàng Gia
              </label>
              <div className="mt-2.5 space-y-2">
                {(['bachKy', 'hacKy', 'huynhKy'] as const).map((key) => {
                  const item = kynamProfiles[key]
                  const isSelected = selectedKynam === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setSelectedKynam(key)
                        setTemperature(item.idealTemp)
                      }}
                      className={`min-h-[44px] w-full text-left px-3.5 py-2.5 rounded-xl border transition-all text-xs ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#FAF7EE]'
                          : 'border-[#332A1D] bg-[#1A140E] text-[#A89F91] hover:border-[#D4AF37]/40 hover:text-[#EFEBE4]'
                      }`}
                    >
                      <div className="font-medium text-[#FAF7EE]">{item.name}</div>
                      <div className="text-[11px] text-[#D4AF37]">{item.origin}</div>
                      <div className="text-[10px] text-[#A89F91]">{item.sweetness}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Micro-Thermostat Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#A89F91]">
                <span>VI ĐIỀU NHIỆT ĐIỆN TRỞ BẠCH KIM</span>
                <span className="font-mono text-[#D4AF37]">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="mt-2.5 w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#6B7280]">
                <span>80°C (Dịu Êm)</span>
                <span>142°C (Bạch Kỳ Chuẩn)</span>
                <span>240°C (Phát Tỏa Cực Đại)</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 space-y-3 pt-4 border-t border-[#332A1D]">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsIncenseActive(!isIncenseActive)}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isIncenseActive
                    ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#FAF7EE]'
                    : 'border-[#332A1D] bg-[#16120D] text-[#A89F91] hover:border-[#D4AF37]/40'
                }`}
              >
                {isIncenseActive ? 'Xông Hương Điện Tử: BẬT' : 'Xông Hương Điện Tử: TẮT'}
              </button>
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#A89F91]">
              <span>Tư vấn KTS Trưởng:</span>
              <a href="tel:0368757916" className="text-[#D4AF37] hover:underline font-mono font-medium">
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV45
