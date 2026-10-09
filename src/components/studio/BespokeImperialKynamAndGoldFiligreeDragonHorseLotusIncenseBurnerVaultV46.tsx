'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV46() {
  const [temperature, setTemperature] = useState(144) // 80°C to 240°C
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
      name: 'Bạch Kỳ Nam Rừng Tự Nhiên Khánh Hòa (Đệ Nhất Danh Hương)',
      density: '99.98% tinh dầu tích tụ',
      aromaNotes: 'Ngọt dịu thanh tao, the mát tiền vận, trầm lắng hậu vị lưu hương 72 giờ.',
      optimalTemp: 142,
      origin: 'Rừng nguyên sinh Khánh Hòa 400 năm'
    },
    hacKy: {
      name: 'Hắc Kỳ Nam Vạn Ninh (Huyền Thoại Trầm Tích)',
      density: '99.95% tinh dầu hóa thạch',
      aromaNotes: 'Mạnh mẽ uy nghi, nốt khói thơm ấm áp, định thần sâu sắc.',
      optimalTemp: 165,
      origin: 'Thung lũng Vạn Ninh Khánh Hòa'
    },
    huynhKy: {
      name: 'Huỳnh Kỳ Nam Ninh Hòa (Hoàng Kim Tụ Khí)',
      density: '99.90% tinh dầu hoàng kim',
      aromaNotes: 'Ấm ngọt mật ong rừng, thảo mộc quý hiếm, dưỡng tâm vượng khí.',
      optimalTemp: 135,
      origin: 'Núi cao Ninh Hòa Khánh Hòa'
    }
  }

  const currentProfile = kynamProfiles[selectedKynam]

  return (
    <section className="relative my-12 overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#16120C] via-[#0E0C07] to-[#070604] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#D4AF37]/25 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-xs font-medium text-[#F5E8C7] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            <span>Đỉnh Lư Ngự Dụng Hoàng Gia · Thế Hệ V46</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FBF9F5] tracking-wide">
            Lư Kim Long Mã Thập Nhị Tứ Thập Lục Thế & Án Trầm Hương Rừng 400 Năm
          </h3>
          <p className="text-xs sm:text-sm text-[#A89E88] mt-1 max-w-2xl">
            Tạo tác khảm vàng 24K hoa văn Filigree Thăng Long đan tay tinh xảo, bệ án gỗ Trầm Hương Rừng Tự Nhiên Khánh Hòa 400 năm tuổi, công nghệ vi điều nhiệt bạch kim 80°C - 240°C bảo tồn trọn vẹn tinh dầu Kỳ Nam không khói.
          </p>
        </div>

        {/* Live Thermal Sensor Badge */}
        <div className="flex items-center space-x-3 bg-[#231B10]/80 px-4 py-3 rounded-2xl border border-[#D4AF37]/25">
          <div className="text-right">
            <div className="text-[10px] text-[#A89E88] uppercase tracking-wider font-mono">Nhiệt độ vi điều khiển</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#F59E0B]">{temperature}°C</div>
          </div>
          <div className="h-8 w-px bg-[#D4AF37]/25" />
          <div className="text-left">
            <div className="text-[10px] text-[#A89E88] uppercase tracking-wider font-mono">Độ tinh khiết Kỳ Nam</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#5EEAD4]">{currentProfile.density}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Visual Burner Simulation Canvas */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#1F170E]/60 to-[#0A0805]/90 border border-[#D4AF37]/20 overflow-hidden min-h-[360px]">
          {/* Incense Vapor Effect */}
          <AnimatePresence>
            {isIncenseActive && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: [0.2, 0.45, 0.25], y: [-5, -25, -45] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-12 pointer-events-none w-32 h-44 bg-gradient-to-t from-[#D4AF37]/15 via-[#F5E8C7]/10 to-transparent blur-xl z-0"
              />
            )}
          </AnimatePresence>

          {/* Incense Burner SVG Diagram */}
          <div className="relative z-10 w-full max-w-[380px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 360 360" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="goldFiligreeV46" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" />
                  <stop offset="40%" stopColor="#FFF2A3" />
                  <stop offset="70%" stopColor="#E5C158" />
                  <stop offset="100%" stopColor="#997715" />
                </linearGradient>
                <linearGradient id="altarAgarwoodGradV46" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E120A" />
                  <stop offset="50%" stopColor="#3C2618" />
                  <stop offset="100%" stopColor="#180E08" />
                </linearGradient>
                <radialGradient id="heatGlowV46" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Altar Pedestal (Trầm Hương Rừng Tự Nhiên 400 năm) */}
              <polygon points="60,295 300,295 315,335 45,335" fill="url(#altarAgarwoodGradV46)" stroke="#D4AF37" strokeWidth="1.2" />
              <line x1="75" y1="315" x2="285" y2="315" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="5 3" />

              {/* Thermal Core Chamber Glow */}
              <circle cx="180" cy="190" r="48" fill="url(#heatGlowV46)" opacity={Math.min(temperature / 200, 1)} />

              {/* Dragon-Horse Sculpted Burner Body */}
              <ellipse cx="180" cy="205" rx="72" ry="50" fill="#2E2113" stroke="url(#goldFiligreeV46)" strokeWidth="1.8" />
              
              {/* Tripod Imperial Feet */}
              <path d="M 125,235 Q 115,285 105,295" stroke="url(#goldFiligreeV46)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M 235,235 Q 245,285 255,295" stroke="url(#goldFiligreeV46)" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              <path d="M 180,240 Q 180,285 180,295" stroke="url(#goldFiligreeV46)" strokeWidth="4.5" fill="none" strokeLinecap="round" />

              {/* Filigree Lotus Petal Layers */}
              <path d="M 120,195 Q 180,230 240,195 Q 180,180 120,195 Z" fill="none" stroke="url(#goldFiligreeV46)" strokeWidth="1.2" />
              <path d="M 135,180 Q 180,210 225,180 Q 180,165 135,180 Z" fill="none" stroke="url(#goldFiligreeV46)" strokeWidth="1.2" />

              {/* Perforated Dome Cover with Dragon-Horse Crown */}
              <path d="M 120,175 Q 180,95 240,175 Z" fill="#24190E" stroke="url(#goldFiligreeV46)" strokeWidth="1.6" />
              
              {/* Filigree Cloud & Dragon Motifs */}
              <circle cx="180" cy="145" r="7" fill="url(#goldFiligreeV46)" />
              <circle cx="155" cy="155" r="5" fill="url(#goldFiligreeV46)" />
              <circle cx="205" cy="155" r="5" fill="url(#goldFiligreeV46)" />
              <path d="M 170,125 Q 180,110 190,125" stroke="url(#goldFiligreeV46)" strokeWidth="1.5" fill="none" />

              {/* Dragon-Horse Figurine Finial Top */}
              <path d="M 174,105 Q 180,75 186,105 Q 192,85 180,70 Q 168,85 174,105 Z" fill="url(#goldFiligreeV46)" stroke="#FFF2A3" strokeWidth="0.8" />
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between w-full text-xs text-[#A89E88] z-10 px-2">
            <span>Dải nhiệt: <strong className="text-[#F59E0B]">80°C - 240°C</strong></span>
            <span>Khí vị: <strong className="text-[#D4AF37]">{currentProfile.name.split(' ')[0]} {currentProfile.name.split(' ')[1]}</strong></span>
            <span>Xuất xứ: <strong className="text-[#FBF9F5]">{currentProfile.origin}</strong></span>
          </div>
        </div>

        {/* Control Interface */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#18130B]/90 rounded-2xl p-5 border border-[#D4AF37]/25 space-y-4">
            <h4 className="text-sm font-semibold text-[#F5E8C7] tracking-wide uppercase">
              Vi Điều Nhiệt & Tuyển Trọn Kỳ Nam
            </h4>

            {/* Kynam Selection Tabs */}
            <div>
              <label className="text-xs text-[#A89E88] block mb-2 font-medium">Chọn Phẩm Cấp Kỳ Nam:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedKynam('bachKy')
                    setTemperature(kynamProfiles.bachKy.optimalTemp)
                  }}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedKynam === 'bachKy'
                      ? 'bg-[#D4AF37] text-[#0A0805] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#221B11] text-[#E0D9C8] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Bạch Kỳ Nam
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedKynam('hacKy')
                    setTemperature(kynamProfiles.hacKy.optimalTemp)
                  }}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedKynam === 'hacKy'
                      ? 'bg-[#D4AF37] text-[#0A0805] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#221B11] text-[#E0D9C8] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Hắc Kỳ Nam
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedKynam('huynhKy')
                    setTemperature(kynamProfiles.huynhKy.optimalTemp)
                  }}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedKynam === 'huynhKy'
                      ? 'bg-[#D4AF37] text-[#0A0805] font-semibold shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#221B11] text-[#E0D9C8] border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
                  }`}
                >
                  Huỳnh Kỳ Nam
                </button>
              </div>
              <p className="text-[11px] text-[#A89E88] mt-2 italic leading-relaxed">
                {currentProfile.aromaNotes}
              </p>
            </div>

            {/* Temperature Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#E0D9C8] mb-1">
                <span>Nhiệt Độ Xông Tinh Dầu:</span>
                <span className="font-mono text-[#F59E0B] font-bold">{temperature}°C / 240°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-1.5 bg-[#2A2014] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                aria-label="Điều chỉnh nhiệt độ điện trở bạch kim"
              />
              <div className="flex justify-between text-[10px] text-[#786D5A] mt-1">
                <span>Nhiệt êm dịu (80°C)</span>
                <span>Tỏa hương cực đại (240°C)</span>
              </div>
            </div>

            {/* Interactive Audio Resonance & Incense Toggle */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={toggleHarmonics}
                className={`min-h-[44px] flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isAudioResonance
                    ? 'border-[#5EEAD4] bg-[#5EEAD4]/15 text-[#5EEAD4] shadow-md shadow-[#5EEAD4]/10'
                    : 'border-[#D4AF37]/40 bg-[#1A140C] text-[#E0D9C8] hover:border-[#D4AF37]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-ping" />
                <span>{isAudioResonance ? 'Hòa Âm 528Hz & 741Hz BẬT' : 'Kích Hoạt Chuông Vàng 528Hz & 741Hz'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsIncenseActive(!isIncenseActive)}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isIncenseActive
                    ? 'border-[#F59E0B] bg-[#F59E0B]/15 text-[#F59E0B]'
                    : 'border-[#2C2114] bg-[#1A140C] text-[#A89E88] hover:border-[#F59E0B]/40'
                }`}
              >
                {isIncenseActive ? 'Làn Khói Hương: BẬT' : 'Làn Khói Hương: TẮT'}
              </button>
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#A89E88]">
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

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV46
