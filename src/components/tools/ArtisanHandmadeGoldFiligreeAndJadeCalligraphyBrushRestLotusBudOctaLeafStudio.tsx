'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestSpec {
  jadeGrade: string
  translucency: string
  goldFiligree: string
  woodBase: string
  inclineAngle: string
  acoustics: string
}

const SPEC: BrushRestSpec = {
  jadeGrade: 'Ngọc Bích Phỉ Thúy Type A Myanmar tự nhiên',
  translucency: '99.5% Thấu quang ngọc tủy thanh ngọc hoàng gia',
  goldFiligree: 'Vàng 24K Filigree 0.18mm đan tay hoa liên hoa',
  woodBase: 'Gỗ Trắc Đỏ Nam Bộ 315 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudOctaLeafStudio() {
  const [isBrushPlaced, setIsBrushPlaced] = useState<boolean>(true)
  const [zoomLevel, setZoomLevel] = useState<number>(1.0)
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)
  const [activeLeafIndex, setActiveLeafIndex] = useState<number>(0)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscLowRef = useRef<OscillatorNode | null>(null)
  const oscHighRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      try {
        oscLowRef.current?.stop()
        oscLowRef.current?.disconnect()
        oscHighRef.current?.stop()
        oscHighRef.current?.disconnect()
        gainRef.current?.disconnect()
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close()
        }
      } catch {
        // cleanup ignore
      }
    }
  }, [])

  const toggleOctaveAudio = () => {
    if (!isAudioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.0)

        // Fundamental 528Hz
        const osc1 = ctx.createOscillator()
        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        // Octave 1056Hz
        const osc2 = ctx.createOscillator()
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        oscLowRef.current = osc1
        oscHighRef.current = osc2
        gainRef.current = gain
        setIsAudioActive(true)
      } catch (err) {
        console.error('Audio Octave Error:', err)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5)
          setTimeout(() => {
            oscLowRef.current?.stop()
            oscLowRef.current?.disconnect()
            oscHighRef.current?.stop()
            oscHighRef.current?.disconnect()
            oscLowRef.current = null
            oscHighRef.current = null
            setIsAudioActive(false)
          }, 500)
        } catch {
          setIsAudioActive(false)
        }
      } else {
        setIsAudioActive(false)
      }
    }
  }

  const LEAF_TITLES = [
    'Diệp 1: Khởi Tâm Thanh Tịnh',
    'Diệp 2: Vọng Nguyệt Đàm Hoa',
    'Diệp 3: Tĩnh Tọa Quan Thân',
    'Diệp 4: Tứ Thời Hưng Thịnh',
    'Diệp 5: Ngũ Phúc Lâm Môn',
    'Diệp 6: Lục Hợp Khải Hoàn',
    'Diệp 7: Thất Tinh Tụ Khí',
    'Diệp 8: Bát Phương Hội Tụ',
  ]

  return (
    <section className="relative w-full max-w-7xl mx-auto my-16 px-4 sm:px-6 lg:px-8 py-12 rounded-3xl bg-[#0D120F] border border-[#1C2C21] text-[#E4EDE7] shadow-2xl overflow-hidden">
      {/* Jade Glow Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_30%_20%,#2ECC71_0%,transparent_60%)]" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-3xl mx-auto mb-12">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#2ECC71]/15 text-[#58D68D] border border-[#2ECC71]/30 mb-4">
          Thư Phòng Atelier · Bảo Vật Kê Ngự Bút
        </span>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#F2F9F5] font-medium tracking-tight leading-snug">
          Kê Ngự Bút Búp Sen Bát Diệp Sen Phỉ Thúy Type A Nẹp Vàng 24K Filigree
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#A8BEB1] leading-relaxed">
          Tác phẩm văn phòng tứ bảo thượng lưu: búp sen cát tường và tám lá sen xòe nở chạm khắc từ ngọc phỉ thúy Type A thấu quang 99.5%,
          nẹp viền vàng 24K Filigree sợi siêu mịn, nâng niu ngự bút trên bệ Gỗ Trắc Đỏ Nam Bộ 315 năm tuổi.
        </p>
      </div>

      {/* Main Showcase Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Interactive Atelier Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#121A15] border border-[#26372B]">
          <div className="relative w-full aspect-[4/3] max-w-md flex items-center justify-center rounded-xl bg-gradient-to-b from-[#15211B] via-[#0D1510] to-[#070C09] border border-[#263A2D] overflow-hidden p-6 shadow-inner">
            {/* Zoomable Container */}
            <motion.div
              animate={{ scale: zoomLevel }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative flex flex-col items-center justify-center"
            >
              {/* Jade & Filigree SVG Display */}
              <div className="relative w-64 h-56 flex items-center justify-center">
                <svg className="w-56 h-56" viewBox="0 0 120 120" fill="none">
                  {/* Trac Wood Base */}
                  <rect x="14" y="88" width="92" height="18" rx="4" fill="#3D1D10" stroke="#7A3920" strokeWidth="1.5" />
                  <line x1="18" y1="97" x2="102" y2="97" stroke="#5C2B18" strokeWidth="1" strokeDasharray="3,3" />

                  {/* 8 Jade Lotus Leaves Fan Out */}
                  <ellipse cx="60" cy="78" rx="49" ry="13" fill="#164336" opacity="0.4" />
                  {/* Leaves 1-8 */}
                  <path d="M60 84 C36 76 20 66 16 55 C30 55 44 66 60 84 Z" fill="#229954" opacity="0.85" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M60 84 C84 76 100 66 104 55 C90 55 76 66 60 84 Z" fill="#229954" opacity="0.85" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M60 84 C34 68 26 52 30 40 C43 48 51 64 60 84 Z" fill="#27AE60" opacity="0.9" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M60 84 C86 68 94 52 90 40 C77 48 69 64 60 84 Z" fill="#27AE60" opacity="0.9" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M60 84 C44 62 40 42 46 32 C53 44 56 62 60 84 Z" fill="#2ECC71" opacity="0.95" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M60 84 C76 62 80 42 74 32 C67 44 64 62 60 84 Z" fill="#2ECC71" opacity="0.95" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M60 84 C52 56 50 34 56 24 C62 34 60 56 60 84 Z" fill="#58D68D" opacity="0.95" stroke="#D4AF37" strokeWidth="1" />
                  <path d="M60 84 C68 56 70 34 64 24 C58 34 60 56 60 84 Z" fill="#82E0AA" opacity="0.95" stroke="#D4AF37" strokeWidth="1" />

                  {/* Center Jade Lotus Bud */}
                  <path
                    d="M60 30 C53 45 54 62 60 72 C66 62 67 45 60 30 Z"
                    fill="#A9DFBF"
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                  />
                  {/* Filigree Gold Veins */}
                  <line x1="60" y1="35" x2="60" y2="70" stroke="#FFF2B2" strokeWidth="1" />
                  <path d="M60 48 Q 54 44 52 40" stroke="#FFF2B2" strokeWidth="0.8" />
                  <path d="M60 48 Q 66 44 68 40" stroke="#FFF2B2" strokeWidth="0.8" />

                  {/* Resting Ridge: 15 degree slope groove */}
                  <rect x="42" y="68" width="36" height="4" rx="2" fill="#D4AF37" />
                </svg>

                {/* Calligraphy Brush Simulation */}
                <motion.div
                  animate={{
                    y: isBrushPlaced ? 0 : -35,
                    rotate: isBrushPlaced ? -15 : -5,
                    opacity: isBrushPlaced ? 1 : 0.85,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="absolute pointer-events-none"
                  style={{ top: '38%', left: '16%' }}
                >
                  <div className="w-56 h-3 rounded-full bg-gradient-to-r from-[#4A1705] via-[#75300B] to-[#211108] shadow-xl border border-[#D4AF37]/60 flex items-center justify-between px-2">
                    <span className="text-[7px] text-[#D4AF37] font-serif tracking-widest">GUHOMES IMPERIAL</span>
                    {/* Brush Hair Tip */}
                    <div className="w-8 h-4 rounded-r-full bg-[#EAE5D9] border-r border-[#FFF]" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Controls */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center items-center">
            <button
              type="button"
              onClick={() => setIsBrushPlaced(!isBrushPlaced)}
              className="px-4 py-2 text-xs sm:text-sm rounded-lg border border-[#2ECC71]/40 bg-[#15231A] hover:bg-[#1D3124] text-[#F2F9F5] transition-colors"
            >
              {isBrushPlaced ? 'Nhấc Ngự Bút (Hạ Bút Khai Hoa)' : 'Gác Ngự Bút Lên Búp Sen'}
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((prev) => (prev >= 1.4 ? 1.0 : Number((prev + 0.2).toFixed(1))))}
              className="px-4 py-2 text-xs sm:text-sm rounded-lg border border-[#D4AF37]/50 bg-[#231E14] hover:bg-[#302B19] text-[#E6C665] transition-colors"
            >
              Kính Lúp Vi Mô ({zoomLevel}x)
            </button>
            <button
              type="button"
              onClick={toggleOctaveAudio}
              className={`px-4 py-2 text-xs sm:text-sm rounded-lg border transition-colors flex items-center gap-2 ${
                isAudioActive
                  ? 'border-[#2ECC71] bg-[#143322] text-[#58D68D]'
                  : 'border-[#2B3F32] bg-[#141F18] text-[#A8BEB1] hover:text-[#FFF]'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAudioActive ? 'bg-[#58D68D] animate-ping' : 'bg-[#2B3F32]'}`} />
              {isAudioActive ? 'Bát Độ 528Hz & 1056Hz' : 'Khởi Hòa Âm Thiền'}
            </button>
          </div>
        </div>

        {/* Right Specification Details */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-[#121A15] border border-[#223126] p-6 rounded-2xl">
            <h3 className="text-lg font-serif text-[#F2F9F5] font-medium border-b border-[#26372B] pb-3 mb-4 flex items-center justify-between">
              <span>Quy Chuẩn Chế Tác Ngọc Bích</span>
              <span className="text-xs font-mono text-[#58D68D]">Type A Myanmar</span>
            </h3>

            <dl className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-[#1A261E]">
                <dt className="text-[#8FA899]">Cấp Độ Ngọc</dt>
                <dd className="font-mono text-[#F2F9F5] text-right font-medium">{SPEC.jadeGrade}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1A261E]">
                <dt className="text-[#8FA899]">Độ Thấu Quang</dt>
                <dd className="font-mono text-[#58D68D] text-right font-medium">{SPEC.translucency}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1A261E]">
                <dt className="text-[#8FA899]">Kim Hoàn Vàng 24K</dt>
                <dd className="font-mono text-[#E6C665] text-right font-medium">{SPEC.goldFiligree}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1A261E]">
                <dt className="text-[#8FA899]">Đế Mộng Cổ Truyền</dt>
                <dd className="font-mono text-[#F2F9F5] text-right font-medium">{SPEC.woodBase}</dd>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-[#1A261E]">
                <dt className="text-[#8FA899]">Độ Dốc Rãnh Kê</dt>
                <dd className="font-mono text-[#58D68D] text-right font-medium">{SPEC.inclineAngle}</dd>
              </div>
              <div className="flex justify-between items-center py-1">
                <dt className="text-[#8FA899]">Hòa Âm Bát Độ</dt>
                <dd className="font-mono text-[#E6C665] text-right font-medium">{SPEC.acoustics}</dd>
              </div>
            </dl>
          </div>

          {/* 8 Jade Lotus Leaves Exploration */}
          <div className="bg-[#121A15] border border-[#223126] p-5 rounded-2xl">
            <span className="block text-xs uppercase tracking-widest text-[#A8BEB1] mb-3 font-semibold">
              Ý Niệm Tám Tầng Lá Sen (Bát Diệp Triều Liên)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {LEAF_TITLES.map((title, idx) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => setActiveLeafIndex(idx)}
                  className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                    activeLeafIndex === idx
                      ? 'border-[#2ECC71] bg-[#162C20] text-[#F2F9F5] shadow-sm'
                      : 'border-[#1E2C22] bg-[#0F1611] text-[#8FA899] hover:text-[#E4EDE7]'
                  }`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Brand & Atelier Guarantee Footer */}
      <div className="relative z-10 mt-10 pt-6 border-t border-[#1E2C22] flex flex-col sm:flex-row justify-between items-center text-xs text-[#7F998A] gap-4">
        <div>
          <span>Độc bản chế tác bởi </span>
          <strong className="text-[#58D68D] font-medium">GuHomes</strong>
          <span> · Xưởng may đo Thạnh Xuân 1.200m² (Trần 12 công trình/năm)</span>
        </div>
        <div className="flex gap-4">
          <a href="tel:0368757916" className="text-[#E6C665] hover:underline font-mono">
            KTS Trưởng: 0368 757 916
          </a>
          <span className="text-[#35493C]">|</span>
          <a href="mailto:guhomesvn@gmail.com" className="text-[#58D68D] hover:underline">
            guhomesvn@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudOctaLeafStudio
