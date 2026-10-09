'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KynamSpec {
  name: string
  origin: string
  resinDensity: string
  aromaProfile: string
  burnTemp: number
}

const KY_NAM_VARIETIES: KynamSpec[] = [
  {
    name: 'Bạch Kỳ Vạn Ninh',
    origin: 'Rừng nguyên sinh Vạn Ninh, Khánh Hòa',
    resinDensity: '99.8% chìm hoàn toàn trong nước',
    aromaProfile: 'Hương thanh khiết, ngọt sâu, hậu vị hoa lê tuyết & mật ong rừng',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Hòn Hèo',
    origin: 'Bán đảo Hòn Hèo, Khánh Hòa',
    resinDensity: '99.8% đặc quánh như hắc ngọc',
    aromaProfile: 'Hương huyền bí, đầm ấm, thảo mộc cổ sơn & nốt gỗ ngàn năm',
    burnTemp: 165,
  },
  {
    name: 'Thanh Kỳ Vĩnh Sơn',
    origin: 'Đỉnh núi Vĩnh Sơn, Khánh Hòa',
    resinDensity: '98.9% ánh xanh cẩm thạch',
    aromaProfile: 'Hương mát lạnh tinh khôi, thảo mộc cam thảo & sương mai sơn cước',
    burnTemp: 145,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV3() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KY_NAM_VARIETIES[0]!)
  const [currentTemp, setCurrentTemp] = useState<number>(135)
  const [isIncenseActive, setIsIncenseActive] = useState<boolean>(false)
  const [isAudioHarmonics, setIsAudioHarmonics] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc741Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      try {
        osc528Ref.current?.stop()
        osc528Ref.current?.disconnect()
        osc741Ref.current?.stop()
        osc741Ref.current?.disconnect()
        gainRef.current?.disconnect()
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close()
        }
      } catch {
        // ignore cleanup error
      }
    }
  }, [])

  const toggleHarmonics = () => {
    if (!isAudioHarmonics) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const gainNode = ctx.createGain()
        gainNode.gain.setValueAtTime(0.0001, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)

        const osc1 = ctx.createOscillator()
        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime) // 528Hz

        const osc2 = ctx.createOscillator()
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(741, ctx.currentTime) // 741Hz Awakening Intuition

        osc1.connect(gainNode)
        osc2.connect(gainNode)
        gainNode.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc741Ref.current = osc2
        gainRef.current = gainNode
        setIsAudioHarmonics(true)
      } catch (e) {
        console.error('Audio Harmonics error:', e)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc741Ref.current?.stop()
            osc741Ref.current?.disconnect()
            osc528Ref.current = null
            osc741Ref.current = null
            setIsAudioHarmonics(false)
          }, 500)
        } catch {
          setIsAudioHarmonics(false)
        }
      } else {
        setIsAudioHarmonics(false)
      }
    }
  }

  const handleSelectVariety = (v: KynamSpec) => {
    setSelectedKynam(v)
    setCurrentTemp(v.burnTemp)
  }

  return (
    <section className="relative w-full max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8 py-12 rounded-3xl bg-[#110F0C] border border-[#2B2217] text-[#EDE4DA] shadow-2xl overflow-hidden">
      {/* Golden Aura Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_70%_30%,#D4AF37_0%,transparent_65%)]" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#D4AF37]/15 text-[#E6C665] border border-[#D4AF37]/30 mb-4">
          Bảo Thất Hoàng Gia · Tuyệt Phẩm Trầm Hương V3
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#FBF6EE] font-medium tracking-tight leading-snug">
          Bảo Thất Kỳ Nam &amp; Đỉnh Lư Kim Long Mã Đạp Sen Vàng 24K Filigree V3
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#B5A593] leading-relaxed">
          Tạo phẩm phong thủy trấn trạch thượng đẳng: biểu tượng &ldquo;Long Mã Phù Đồ - Quốc Thái Dân An&rdquo; kết tinh từ
          ruột đồng đỏ đúc 10mm nẹp sợi vàng 24K đan tay tỉ mỉ, đặt trên án Gỗ Gõ Đỏ Lào 305 năm tuổi và hệ kiểm soát nhiệt vi sai không khói.
        </p>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Burner Showcase */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#181410] border border-[#362A1D]">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#241C14] via-[#17120D] to-[#0D0A08] border border-[#3D3020] shadow-[0_0_35px_rgba(212,175,55,0.15)]">
            {/* Ambient Heat Wave / Smoke Animation */}
            {isIncenseActive && (
              <motion.div
                animate={{
                  y: [-10, -50, -90],
                  opacity: [0, 0.7, 0],
                  scale: [0.8, 1.2, 1.6],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeOut' }}
                className="absolute top-8 w-16 h-28 rounded-full bg-gradient-to-t from-[#D4AF37]/30 to-transparent blur-md pointer-events-none"
              />
            )}

            {/* Dragon-Horse & Lotus 24K Filigree Incense Burner SVG */}
            <div className="relative z-10 flex flex-col items-center">
              <svg className="w-40 h-40 text-[#D4AF37]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                {/* Lotus Petal Base */}
                <path
                  d="M20 78 C 30 90, 70 90, 80 78 C 70 70, 30 70, 20 78 Z"
                  fill="#8B2500"
                  stroke="#D4AF37"
                  strokeWidth="2"
                />
                <path
                  d="M15 75 C 25 65, 40 70, 50 78 C 60 70, 75 65, 85 75"
                  stroke="#D4AF37"
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* Burner Body: Pure Red Bronze Core */}
                <ellipse cx="50" cy="55" rx="28" ry="18" fill="#4A180E" stroke="#E6C665" strokeWidth="2.5" />
                <path d="M26 55 Q 50 68 74 55" stroke="#D4AF37" strokeWidth="1.2" strokeDasharray="2,2" />

                {/* Dragon-Horse Figurine on Top */}
                <path
                  d="M42 38 Q 45 22 55 20 Q 60 22 58 28 Q 66 26 70 32 Q 62 36 54 36 Z"
                  fill="#D4AF37"
                  stroke="#FFF2B2"
                  strokeWidth="1.5"
                />
                <circle cx="56" cy="24" r="1.5" fill="#110F0C" />
                {/* Filigree Mane */}
                <path d="M48 24 Q 44 18 42 22" stroke="#FFF2B2" strokeWidth="1" />
                <path d="M50 28 Q 44 24 45 30" stroke="#FFF2B2" strokeWidth="1" />

                {/* Sacred Smoke Vents */}
                <circle cx="38" cy="50" r="2.5" fill="#110F0C" stroke="#D4AF37" strokeWidth="1" />
                <circle cx="50" cy="47" r="3" fill="#110F0C" stroke="#D4AF37" strokeWidth="1" />
                <circle cx="62" cy="50" r="2.5" fill="#110F0C" stroke="#D4AF37" strokeWidth="1" />
              </svg>

              <div className="mt-3 text-center">
                <span className="text-xs font-serif tracking-widest text-[#E6C665] font-semibold block">
                  ĐỈNH LƯ KIM LONG MÃ · VÀNG 24K FILIGREE
                </span>
                <span className="text-[11px] text-[#A69785] font-mono">
                  Ruột đồng đỏ 10mm · Án Gõ Đỏ Lào 305 năm
                </span>
              </div>
            </div>
          </div>

          {/* Active Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={() => setIsIncenseActive(!isIncenseActive)}
              className={`px-4 py-2 text-xs sm:text-sm rounded-lg font-medium border transition-colors ${
                isIncenseActive
                  ? 'border-[#FF9F43] bg-[#3B200E] text-[#FF9F43]'
                  : 'border-[#5C452E] bg-[#221B14] text-[#D8C7B4] hover:text-[#FFF]'
              }`}
            >
              {isIncenseActive ? 'Đang Xông Trầm Vi Sai' : 'Khai Hỏa Xông Trầm'}
            </button>
            <button
              type="button"
              onClick={toggleHarmonics}
              className={`px-4 py-2 text-xs sm:text-sm rounded-lg font-medium border transition-colors flex items-center gap-2 ${
                isAudioHarmonics
                  ? 'border-[#D4AF37] bg-[#3A2E14] text-[#E6C665]'
                  : 'border-[#5C452E] bg-[#221B14] text-[#D8C7B4] hover:text-[#FFF]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAudioHarmonics ? 'bg-[#E6C665] animate-ping' : 'bg-[#5C452E]'}`} />
              {isAudioHarmonics ? 'Hòa Âm 528Hz + 741Hz' : 'Khởi Hòa Âm Chuông'}
            </button>
          </div>
        </div>

        {/* Right Variety Selector & Thermal Control */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="bg-[#181410] border border-[#2E251B] p-6 rounded-2xl">
            <span className="block text-xs uppercase tracking-widest text-[#C5A880] mb-3 font-semibold">
              Tuyển Lựa Ngũ Tuyệt Kỳ Nam Khánh Hòa
            </span>
            <div className="space-y-3">
              {KY_NAM_VARIETIES.map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleSelectVariety(item)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedKynam.name === item.name
                      ? 'border-[#D4AF37] bg-[#292015] shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                      : 'border-[#2E2419] bg-[#1E1710] hover:border-[#4A3B29]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-serif font-medium text-[#F4EDE4]">{item.name}</h4>
                    <span className="text-xs font-mono text-[#D4AF37]">{item.burnTemp}°C</span>
                  </div>
                  <p className="text-xs text-[#A89886] mb-1">{item.aromaProfile}</p>
                  <div className="flex justify-between text-[11px] text-[#827464] font-mono">
                    <span>{item.origin}</span>
                    <span className="text-[#50E3C2]">{item.resinDensity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Micro-Thermal Temperature Slider */}
          <div className="bg-[#181410] border border-[#2E251B] p-5 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider text-[#A89886] font-semibold">
                Kiểm Soát Nhiệt Vi Sai Không Khói Độc
              </span>
              <span className="font-mono text-sm text-[#D4AF37] font-semibold">{currentTemp}°C</span>
            </div>
            <input
              type="range"
              min="80"
              max="240"
              value={currentTemp}
              onChange={(e) => setCurrentTemp(Number(e.target.value))}
              className="w-full h-1.5 bg-[#2B2217] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex justify-between text-[10px] text-[#786A5A] mt-2 font-mono">
              <span>80°C (Ngậm Hương)</span>
              <span>150°C (Thăng Hoa)</span>
              <span>240°C (Khuyếch Tán Đỉnh)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer GuHomes Standard */}
      <div className="relative z-10 mt-10 pt-6 border-t border-[#2B2217] flex flex-col sm:flex-row justify-between items-center text-xs text-[#8A7C6D] gap-4">
        <div>
          <span>Độc bản chế tác bởi </span>
          <strong className="text-[#D4AF37] font-medium">GuHomes</strong>
          <span> · Xưởng may đo Thạnh Xuân 1.200m² (Trần 12 công trình/năm)</span>
        </div>
        <div className="flex gap-4">
          <a href="tel:0368757916" className="text-[#E6C665] hover:underline font-mono">
            KTS Trưởng: 0368 757 916
          </a>
          <span className="text-[#4A3D2F]">|</span>
          <a href="mailto:guhomesvn@gmail.com" className="text-[#C5A880] hover:underline">
            guhomesvn@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV3
