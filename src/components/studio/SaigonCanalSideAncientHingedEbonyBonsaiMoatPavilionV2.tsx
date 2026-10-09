'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PavilionSpec {
  timberAge: string
  bonsaiAge: string
  temperatureReduction: string
  relativeHumidity: string
  airflowVelocity: string
  acousticFrequency: string
}

const SPEC: PavilionSpec = {
  timberAge: '325 năm (Mun Sừng Nam Bộ)',
  bonsaiAge: '340 năm (Tùng La Hán Cổ Thụ)',
  temperatureReduction: '-8.8°C (Thủy nhiệt vi khí hậu)',
  relativeHumidity: '50% - 55% RH (Điều ẩm tự nhiên)',
  airflowVelocity: '2.8 m/s (Gió đối lưu ven sông Sài Gòn)',
  acousticFrequency: '528Hz Solfeggio (Thanh âm thiền trà)',
}

export function SaigonCanalSideAncientHingedEbonyBonsaiMoatPavilionV2() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(90)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [activeMoatLevel, setActiveMoatLevel] = useState<'low' | 'balanced' | 'high'>('balanced')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop()
          oscRef.current.disconnect()
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

  const toggleAcoustic = () => {
    if (!isAudioPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(528, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.2)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscRef.current = osc
        gainRef.current = gain
        setIsAudioPlaying(true)
      } catch (e) {
        console.error('Web Audio API not supported:', e)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            if (oscRef.current) {
              oscRef.current.stop()
              oscRef.current.disconnect()
              oscRef.current = null
            }
            setIsAudioPlaying(false)
          }, 600)
        } catch {
          setIsAudioPlaying(false)
        }
      } else {
        setIsAudioPlaying(false)
      }
    }
  }

  const rotateBonsaiClockwise = () => {
    setBonsaiRotation((prev) => (prev + 45) % 360)
  }

  return (
    <section className="relative w-full max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8 py-12 rounded-3xl bg-[#0F0E0C] border border-[#262018] text-[#E8DFD5] shadow-2xl overflow-hidden">
      {/* Background Water Wave Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_35%_25%,#C5A880_0%,transparent_60%)]" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#C5A880]/15 text-[#D4AF37] border border-[#C5A880]/30 mb-4">
          Cung Đình Ven Sông Sài Gòn · Thủy Đình Mộng Cối V2
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#F4EDE4] font-medium tracking-tight leading-snug">
          Thủy Đình Gỗ Mun Sừng Nam Bộ 325 Năm &amp; Bệ Bonsai Tùng La Hán Cổ Thụ
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#B5A898] leading-relaxed">
          Kiệt tác kiến trúc thủy đình thích ứng vi khí hậu nhiệt đới GuHomes: cấu trúc mộng cối âm dương cổ truyền gập trượt 4 cánh,
          hào sen Bách Diệp ôm quanh giúp hạ nhiệt tự nhiên -8.8°C, đón gió đối lưu 2.8 m/s và thanh âm thiền trà 528Hz Solfeggio an nhiên.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual Pavilion & Bonsai Simulation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#161310] border border-[#30261A]">
          <div className="relative w-full aspect-[4/3] max-w-md flex items-center justify-center rounded-xl bg-gradient-to-b from-[#1E1812] to-[#0A0907] border border-[#2B2116] overflow-hidden p-6">
            {/* Moat Water Ripple Effect */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.35, 0.55, 0.35],
              }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute inset-4 rounded-full border ${
                activeMoatLevel === 'high'
                  ? 'border-[#4A90E2]/40 bg-[#4A90E2]/10'
                  : activeMoatLevel === 'balanced'
                  ? 'border-[#50E3C2]/30 bg-[#50E3C2]/5'
                  : 'border-[#C5A880]/30 bg-[#C5A880]/5'
              }`}
            />

            {/* Ancient Hinged Frame Simulation */}
            <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 border-2 border-[#1A1A1A]/80 rounded-xl flex items-center justify-center bg-[#11100E]/95 shadow-2xl p-4">
              {/* 4 Hinged Wings: Mun Sừng Nam Bộ */}
              <motion.div
                animate={{
                  rotateY: isOpenHinged ? -42 : 0,
                  opacity: isOpenHinged ? 0.75 : 1,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-2 top-2 bottom-2 w-12 border-r-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#181818] to-[#2C2C2C] flex items-center justify-center shadow-inner"
              >
                <span className="text-[10px] text-[#E8DFD5] rotate-90 tracking-widest font-mono">TÂY CÁNH</span>
              </motion.div>

              <motion.div
                animate={{
                  rotateY: isOpenHinged ? 42 : 0,
                  opacity: isOpenHinged ? 0.75 : 1,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-2 top-2 bottom-2 w-12 border-l-2 border-[#D4AF37]/50 bg-gradient-to-l from-[#181818] to-[#2C2C2C] flex items-center justify-center shadow-inner"
              >
                <span className="text-[10px] text-[#E8DFD5] -rotate-90 tracking-widest font-mono">ĐÔNG CÁNH</span>
              </motion.div>

              {/* Center Royal Bonsai Display: Tùng La Hán Cổ Thụ */}
              <motion.div
                animate={{ rotate: bonsaiRotation }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
                onClick={rotateBonsaiClockwise}
                title="Nhấp để xoay bệ Bonsai Tùng La Hán 45 độ"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#D4AF37] p-1 bg-gradient-to-tr from-[#1A1814] via-[#352B1E] to-[#14120F] shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center justify-center">
                  <svg className="w-14 h-14 text-[#C5A880] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Ancient Pine Bonsai Tree SVG */}
                    <path d="M12 21v-8m0-2V3m-5 6c0 3 5 2 5 5m0-3c0-3 5-2 5 5" strokeLinecap="round" />
                    <circle cx="7" cy="7" r="3.2" fill="#2E4A28" opacity="0.85" />
                    <circle cx="17" cy="7" r="3.2" fill="#2E4A28" opacity="0.85" />
                    <circle cx="12" cy="4" r="3.8" fill="#3D5A38" opacity="0.95" />
                    <ellipse cx="12" cy="20" rx="6" ry="1.5" fill="#1C1814" />
                  </svg>
                </div>
                <span className="mt-2 text-[11px] text-[#C5A880] font-serif tracking-wider">
                  Tùng La Hán 340 Năm ({bonsaiRotation}°)
                </span>
              </motion.div>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center items-center">
            <button
              type="button"
              onClick={() => setIsOpenHinged(!isOpenHinged)}
              className="px-4 py-2 text-xs sm:text-sm rounded-lg border border-[#C5A880]/40 bg-[#201A14] hover:bg-[#2C241B] text-[#F4EDE4] transition-colors"
            >
              {isOpenHinged ? 'Khép Cánh Cối Mộng (-4.3°C)' : 'Mở Thoáng Đón Gió (-8.8°C)'}
            </button>
            <button
              type="button"
              onClick={rotateBonsaiClockwise}
              className="px-4 py-2 text-xs sm:text-sm rounded-lg border border-[#D4AF37]/50 bg-[#261E14] hover:bg-[#352B1D] text-[#D4AF37] transition-colors"
            >
              Xoay Bệ Bonsai (+45°)
            </button>
            <button
              type="button"
              onClick={toggleAcoustic}
              className={`px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors flex items-center gap-2 ${
                isAudioPlaying
                  ? 'border-[#50E3C2] bg-[#16382F] text-[#50E3C2]'
                  : 'border-[#4D3E2E] bg-[#19140F] text-[#B5A898] hover:text-[#E8DFD5]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAudioPlaying ? 'bg-[#50E3C2] animate-ping' : 'bg-[#4D3E2E]'}`} />
              {isAudioPlaying ? 'Âm Thiền 528Hz Đang Ngân' : 'Khởi Tần Số 528Hz'}
            </button>
          </div>
        </div>

        {/* Right Column: Specification & Climate Metrics */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-[#14110E] border border-[#261F16] p-6 rounded-2xl">
            <h3 className="text-lg font-serif text-[#F4EDE4] font-medium border-b border-[#2A2117] pb-3 mb-4 flex items-center justify-between">
              <span>Thông Số Cung Đình Thích Ứng</span>
              <span className="text-xs font-mono text-[#D4AF37]">GuHomes Bespoke</span>
            </h3>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-[#201811]">
                <dt className="text-[#A49788]">Gỗ Mun Sừng Nam Bộ</dt>
                <dd className="font-mono text-[#E8DFD5] text-right font-medium">{SPEC.timberAge}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#201811]">
                <dt className="text-[#A49788]">Bonsai Tùng La Hán</dt>
                <dd className="font-mono text-[#E8DFD5] text-right font-medium">{SPEC.bonsaiAge}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#201811]">
                <dt className="text-[#A49788]">Hạ Nhiệt Tự Nhiên</dt>
                <dd className="font-mono text-[#50E3C2] text-right font-medium">{SPEC.temperatureReduction}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#201811]">
                <dt className="text-[#A49788]">Cân Bằng Độ Ẩm</dt>
                <dd className="font-mono text-[#E8DFD5] text-right font-medium">{SPEC.relativeHumidity}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#201811]">
                <dt className="text-[#A49788]">Gió Sông Sài Gòn</dt>
                <dd className="font-mono text-[#50E3C2] text-right font-medium">{SPEC.airflowVelocity}</dd>
              </div>
              <div className="flex justify-between items-center py-1">
                <dt className="text-[#A49788]">Âm Học Solfeggio</dt>
                <dd className="font-mono text-[#D4AF37] text-right font-medium">{SPEC.acousticFrequency}</dd>
              </div>
            </dl>
          </div>

          {/* Moat Water Regulation Selector */}
          <div className="bg-[#14110E] border border-[#261F16] p-5 rounded-2xl">
            <span className="block text-xs uppercase tracking-widest text-[#B5A898] mb-3 font-semibold">
              Điều Tiết Mặt Nước Hào Sen Bách Diệp
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(['low', 'balanced', 'high'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setActiveMoatLevel(level)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-colors capitalize ${
                    activeMoatLevel === level
                      ? 'border-[#50E3C2] bg-[#173028] text-[#50E3C2]'
                      : 'border-[#2C2319] bg-[#1C1610] text-[#A49788] hover:text-[#E8DFD5]'
                  }`}
                >
                  {level === 'low' ? 'Tĩnh Lặng (10cm)' : level === 'balanced' ? 'Lưu Phong (25cm)' : 'Triều Dâng (40cm)'}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#8C7E6E] leading-relaxed">
              * Hệ tuần hoàn hào nước ven sông kết hợp màng sáp ong ruồi tự nhiên bảo vệ từng mộng gỗ Mun Sừng,
              triệt tiêu mối mọt vĩnh cửu và xua đuổi côn trùng không dùng hóa chất.
            </p>
          </div>
        </div>
      </div>

      {/* Brand & Atelier Guarantee Footer */}
      <div className="relative z-10 mt-10 pt-6 border-t border-[#241D14] flex flex-col sm:flex-row justify-between items-center text-xs text-[#8E8070] gap-4">
        <div>
          <span>Độc bản chế tác bởi </span>
          <strong className="text-[#C5A880] font-medium">GuHomes</strong>
          <span> · Xưởng may đo Thạnh Xuân 1.200m² (Trần 12 công trình/năm)</span>
        </div>
        <div className="flex gap-4">
          <a href="tel:0368757916" className="text-[#D4AF37] hover:underline font-mono">
            KTS Trưởng: 0368 757 916
          </a>
          <span className="text-[#44382B]">|</span>
          <a href="mailto:guhomesvn@gmail.com" className="text-[#C5A880] hover:underline">
            guhomesvn@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedEbonyBonsaiMoatPavilionV2
