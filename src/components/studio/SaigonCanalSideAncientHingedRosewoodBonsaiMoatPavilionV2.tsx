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
  timberAge: '320 năm (Trắc Đỏ Nam Bộ)',
  bonsaiAge: '335 năm (Nguyệt Quế Rừng Cổ Thụ)',
  temperatureReduction: '-8.7°C (Thủy nhiệt tự nhiên)',
  relativeHumidity: '50% - 55% RH (Vi khí hậu cân bằng)',
  airflowVelocity: '2.7 m/s (Gió đối lưu ven sông Sài Gòn)',
  acousticFrequency: '528Hz Solfeggio (Âm học tĩnh tâm)',
}

export function SaigonCanalSideAncientHingedRosewoodBonsaiMoatPavilionV2() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(45)
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
          // ignore cleanup error
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close()
        } catch {
          // ignore cleanup error
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
        osc.frequency.setValueAtTime(528, ctx.currentTime) // 528Hz Solfeggio

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.2)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscRef.current = osc
        gainRef.current = gain
        setIsAudioPlaying(true)
      } catch (e) {
        console.error('Web Audio API not supported or blocked:', e)
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
    <section className="relative w-full max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8 py-12 rounded-3xl bg-[#13110E] border border-[#2E261D] text-[#E8DFD5] shadow-2xl overflow-hidden">
      {/* Background Water Wave Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_30%_20%,#C5A880_0%,transparent_60%)]" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#C5A880]/15 text-[#D4AF37] border border-[#C5A880]/30 mb-4">
          Cung Đình Ven Sông Sài Gòn · Thủy Đình Mộng Cối V2
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#F4EDE4] font-medium tracking-tight leading-snug">
          Thủy Đình Gỗ Trắc Đỏ Nam Bộ 320 Năm &amp; Bệ Bonsai Nguyệt Quế Rừng Cổ Thụ
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#B5A898] leading-relaxed">
          Thủy đình thích ứng vi khí hậu nhiệt đới độc bản GuHomes: cấu trúc mộng cối âm dương cổ truyền gập trượt 4 cánh,
          ôm trọn hào sen Bách Diệp hạ nhiệt -8.7°C, đối lưu gió sông 2.7 m/s và thanh âm thiền trà 528Hz tĩnh tại.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Visual Pavilion & Bonsai Simulation */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#1A1612] border border-[#3A3024]">
          <div className="relative w-full aspect-[4/3] max-w-md flex items-center justify-center rounded-xl bg-gradient-to-b from-[#221C16] to-[#0E0C09] border border-[#332A20] overflow-hidden p-6">
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
            <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 border-2 border-[#8B5A2B]/60 rounded-xl flex items-center justify-center bg-[#181410]/90 shadow-2xl p-4">
              {/* 4 Hinged Wings */}
              <motion.div
                animate={{
                  rotateY: isOpenHinged ? -42 : 0,
                  opacity: isOpenHinged ? 0.75 : 1,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-2 top-2 bottom-2 w-12 border-r-2 border-[#D4AF37]/50 bg-gradient-to-r from-[#5C2E0B]/70 to-[#8B3A0F]/50 flex items-center justify-center"
              >
                <span className="text-[10px] text-[#E8DFD5] rotate-90 tracking-widest font-mono">TÂY CÁNH</span>
              </motion.div>

              <motion.div
                animate={{
                  rotateY: isOpenHinged ? 42 : 0,
                  opacity: isOpenHinged ? 0.75 : 1,
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-2 top-2 bottom-2 w-12 border-l-2 border-[#D4AF37]/50 bg-gradient-to-l from-[#5C2E0B]/70 to-[#8B3A0F]/50 flex items-center justify-center"
              >
                <span className="text-[10px] text-[#E8DFD5] -rotate-90 tracking-widest font-mono">ĐÔNG CÁNH</span>
              </motion.div>

              {/* Center Royal Bonsai Display */}
              <motion.div
                animate={{ rotate: bonsaiRotation }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                className="relative z-20 flex flex-col items-center justify-center cursor-pointer group"
                onClick={rotateBonsaiClockwise}
                title="Nhấp để xoay bệ Bonsai Nguyệt Quế Rừng Cổ Thụ 45 độ"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#D4AF37] p-1 bg-gradient-to-tr from-[#2A2016] via-[#4A3B2A] to-[#1F1710] shadow-[0_0_25px_rgba(212,175,55,0.25)] flex items-center justify-center">
                  <svg className="w-14 h-14 text-[#C5A880] group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    {/* Ancient Bonsai Tree SVG */}
                    <path d="M12 21v-7m0-3V3m-4 5c0 3 4 3 4 6m0-3c0-3 4-3 4-6" strokeLinecap="round" />
                    <circle cx="8" cy="6" r="3" fill="#3D5A38" opacity="0.8" />
                    <circle cx="16" cy="6" r="3" fill="#3D5A38" opacity="0.8" />
                    <circle cx="12" cy="4" r="3.5" fill="#4B6E44" opacity="0.9" />
                    <ellipse cx="12" cy="20" rx="6" ry="1.5" fill="#8B5A2B" />
                  </svg>
                </div>
                <span className="mt-2 text-[11px] text-[#C5A880] font-serif tracking-wider">
                  Nguyệt Quế 335 Năm ({bonsaiRotation}°)
                </span>
              </motion.div>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center items-center">
            <button
              type="button"
              onClick={() => setIsOpenHinged(!isOpenHinged)}
              className="px-4 py-2 text-xs sm:text-sm rounded-lg border border-[#C5A880]/40 bg-[#251E17] hover:bg-[#342A20] text-[#F4EDE4] transition-colors"
            >
              {isOpenHinged ? 'Khép Cánh Cối Mộng (-4.2°C)' : 'Mở Thoáng Đón Gió (-8.7°C)'}
            </button>
            <button
              type="button"
              onClick={rotateBonsaiClockwise}
              className="px-4 py-2 text-xs sm:text-sm rounded-lg border border-[#D4AF37]/50 bg-[#2A2218] hover:bg-[#3B3022] text-[#D4AF37] transition-colors"
            >
              Xoay Bệ Bonsai (+45°)
            </button>
            <button
              type="button"
              onClick={toggleAcoustic}
              className={`px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors flex items-center gap-2 ${
                isAudioPlaying
                  ? 'border-[#50E3C2] bg-[#16382F] text-[#50E3C2]'
                  : 'border-[#5A4B38] bg-[#1E1812] text-[#B5A898] hover:text-[#E8DFD5]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAudioPlaying ? 'bg-[#50E3C2] animate-ping' : 'bg-[#5A4B38]'}`} />
              {isAudioPlaying ? 'Âm Thiền 528Hz Đang Ngân' : 'Khởi Tần Số 528Hz'}
            </button>
          </div>
        </div>

        {/* Right Column: Specification & Climate Metrics */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-[#181410] border border-[#2E251B] p-6 rounded-2xl">
            <h3 className="text-lg font-serif text-[#F4EDE4] font-medium border-b border-[#30261A] pb-3 mb-4 flex items-center justify-between">
              <span>Thông Số Cung Đình Thích Ứng</span>
              <span className="text-xs font-mono text-[#D4AF37]">GuHomes Bespoke</span>
            </h3>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-[#251D15]">
                <dt className="text-[#A49788]">Gỗ Trắc Đỏ Nam Bộ</dt>
                <dd className="font-mono text-[#E8DFD5] text-right font-medium">{SPEC.timberAge}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#251D15]">
                <dt className="text-[#A49788]">Bonsai Nguyệt Quế</dt>
                <dd className="font-mono text-[#E8DFD5] text-right font-medium">{SPEC.bonsaiAge}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#251D15]">
                <dt className="text-[#A49788]">Hạ Nhiệt Tự Nhiên</dt>
                <dd className="font-mono text-[#50E3C2] text-right font-medium">{SPEC.temperatureReduction}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#251D15]">
                <dt className="text-[#A49788]">Cân Bằng Độ Ẩm</dt>
                <dd className="font-mono text-[#E8DFD5] text-right font-medium">{SPEC.relativeHumidity}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#251D15]">
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
          <div className="bg-[#181410] border border-[#2E251B] p-5 rounded-2xl">
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
                      : 'border-[#332A1F] bg-[#221B14] text-[#A49788] hover:text-[#E8DFD5]'
                  }`}
                >
                  {level === 'low' ? 'Tĩnh Lặng (10cm)' : level === 'balanced' ? 'Lưu Phong (25cm)' : 'Triều Dâng (40cm)'}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#8C7E6E] leading-relaxed">
              * Hệ tuần hoàn hào nước ven sông kết hợp lớp màng sáp ong ruồi tự nhiên bảo vệ từng mộng gỗ Trắc Đỏ,
              triệt tiêu mối mọt và xua đuổi côn trùng không dùng hóa chất.
            </p>
          </div>
        </div>
      </div>

      {/* Brand & Atelier Guarantee Footer */}
      <div className="relative z-10 mt-10 pt-6 border-t border-[#2B2319] flex flex-col sm:flex-row justify-between items-center text-xs text-[#8E8070] gap-4">
        <div>
          <span>Độc bản chế tác bởi </span>
          <strong className="text-[#C5A880] font-medium">GuHomes</strong>
          <span> · Xưởng may đo Thạnh Xuân 1.200m² (Trần 12 công trình/năm)</span>
        </div>
        <div className="flex gap-4">
          <a href="tel:0368757916" className="text-[#D4AF37] hover:underline font-mono">
            KTS Trưởng: 0368 757 916
          </a>
          <span className="text-[#4E4234]">|</span>
          <a href="mailto:guhomesvn@gmail.com" className="text-[#C5A880] hover:underline">
            guhomesvn@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedRosewoodBonsaiMoatPavilionV2
