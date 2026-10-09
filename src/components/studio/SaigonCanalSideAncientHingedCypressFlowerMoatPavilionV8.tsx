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
  timberAge: '485 năm (Gỗ Hoàng Đàn Tuyết Lạng Sơn Cổ Thụ Tinh Dầu Tuyết Óng Ánh)',
  bonsaiAge: '495 năm (Bonsai Tùng Cổ Thụ Dáng Trượng Phu Khí Tiết Bách Niên)',
  temperatureReduction: '-11.9°C (Thủy nhiệt vi khí hậu ven rạch Sài Gòn luân chuyển)',
  relativeHumidity: '43% - 47% RH (Điều ẩm tự nhiên qua hào hoa súng hoàng yến)',
  airflowVelocity: '5.9 m/s (Gió đối lưu ven sông Sài Gòn tuần hoàn)',
  acousticFrequency: '528Hz & 432Hz (Thanh âm thiền trà kép Solfeggio)',
}

export function SaigonCanalSideAncientHingedCypressFlowerMoatPavilionV8() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(359)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [activeMoatLevel, setActiveMoatLevel] = useState<'low' | 'balanced' | 'high'>('balanced')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const oscHarmonicRef = useRef<OscillatorNode | null>(null)
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
      if (oscHarmonicRef.current) {
        try {
          oscHarmonicRef.current.stop()
          oscHarmonicRef.current.disconnect()
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

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(432, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        oscRef.current = osc1
        oscHarmonicRef.current = osc2
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
            }
            if (oscHarmonicRef.current) {
              oscHarmonicRef.current.stop()
              oscHarmonicRef.current.disconnect()
            }
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
            }
            setIsAudioPlaying(false)
          }, 650)
        } catch {
          setIsAudioPlaying(false)
        }
      } else {
        setIsAudioPlaying(false)
      }
    }
  }

  return (
    <section className="relative w-full py-16 bg-stone-950 text-stone-100 overflow-hidden border-t border-b border-amber-900/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(180,120,60,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(60,110,80,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-amber-950/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Bespoke Pavilion Architecture V8 · Sprint 178
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-amber-100 font-light tracking-wide">
              Thủy Đình Hoàng Đàn Tuyết 485 Năm & Hào Bonsai Tùng Cổ Thụ 495 Năm
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-2xl font-light">
              Mô phỏng kiến trúc mở bản lề đối lưu gió ven sông Sài Gòn, hạ nhiệt tự nhiên -11.9°C kết hợp hào nước thanh lọc hoa súng hoàng yến và tần số kép Solfeggio 528Hz & 432Hz.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={toggleAcoustic}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                isAudioPlaying
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-lg shadow-amber-950/50'
                  : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:border-amber-700/50'
              }`}
            >
              <svg className={`w-4 h-4 ${isAudioPlaying ? 'text-amber-400 animate-spin' : 'text-stone-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M10 15V9l5 3-5 3z" />
              </svg>
              <span>{isAudioPlaying ? 'Tần Số 528Hz & 432Hz Đang Phát' : 'Kích Hoạt Tần Số Thiền'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Canvas & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Display */}
          <div className="lg:col-span-8 bg-stone-900/60 rounded-3xl border border-stone-800/80 p-6 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800/60 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Không Gian Ven Sông Đối Lưu Vi Khí Hậu Sài Gòn
              </span>
              <span>Nhiệt độ hạ: <strong className="text-amber-300 font-semibold">{SPEC.temperatureReduction}</strong></span>
            </div>

            {/* Interactive SVG Diagram */}
            <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-stone-950 to-stone-900 rounded-2xl border border-stone-800/60 flex items-center justify-center p-6 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* River Breeze Vectors */}
                <motion.g
                  animate={{
                    x: [0, 25, 0],
                    opacity: [0.35, 0.75, 0.35],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <path d="M 50 120 Q 200 80 400 130 T 750 110" stroke="rgba(147,197,253,0.3)" strokeWidth="2" strokeDasharray="6 6" />
                  <path d="M 30 160 Q 180 120 420 170 T 770 150" stroke="rgba(147,197,253,0.35)" strokeWidth="2.5" strokeDasharray="8 6" />
                  <path d="M 60 200 Q 220 160 410 210 T 740 190" stroke="rgba(147,197,253,0.25)" strokeWidth="1.5" strokeDasharray="5 5" />
                </motion.g>

                {/* Outer Moat (Hào Nước Tuần Hoàn Hoàng Yến) */}
                <ellipse cx="400" cy="400" rx="350" ry="85" fill="rgba(18,45,35,0.7)" stroke="rgba(52,211,153,0.3)" strokeWidth="2" />
                <ellipse cx="400" cy="400" rx="330" ry="75" fill="none" stroke="rgba(245,158,11,0.25)" strokeWidth="1" strokeDasharray="4 4" />

                {/* Floating Water Lily Details (Hoa Súng Vàng Hoàng Yến) */}
                <circle cx="200" cy="410" r="12" fill="rgba(245,158,11,0.6)" />
                <circle cx="220" cy="425" r="9" fill="rgba(251,191,36,0.7)" />
                <circle cx="580" cy="415" r="14" fill="rgba(245,158,11,0.65)" />
                <circle cx="610" cy="400" r="10" fill="rgba(251,191,36,0.75)" />
                <circle cx="390" cy="450" r="13" fill="rgba(245,158,11,0.6)" />

                {/* Pavilion Base (Bệ Gỗ Hoàng Đàn Tuyết 485 Năm) */}
                <rect x="240" y="270" width="320" height="40" rx="6" fill="#451a03" stroke="#92400e" strokeWidth="2" />
                <text x="400" y="295" fill="#fef3c7" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  Bệ Gỗ Hoàng Đàn Tuyết Cổ Thụ 485 Năm (Mộng Nêm Thủ Công)
                </text>

                {/* Columns */}
                <rect x="270" y="160" width="16" height="110" fill="#78350f" stroke="#b45309" strokeWidth="1" />
                <rect x="514" y="160" width="16" height="110" fill="#78350f" stroke="#b45309" strokeWidth="1" />

                {/* Hinged Canopy (Mái Bản Lề Mở Đối Lưu) */}
                <motion.path
                  d={isOpenHinged ? "M 200 160 L 400 70 L 600 160 Z" : "M 240 170 L 400 120 L 560 170 Z"}
                  fill="rgba(120,53,15,0.85)"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  animate={{ d: isOpenHinged ? "M 200 160 L 400 70 L 600 160 Z" : "M 240 170 L 400 120 L 560 170 Z" }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                />

                {/* Bonsai Tùng Cổ Thụ 495 Năm */}
                <g transform={`translate(400, 240) rotate(${(bonsaiRotation % 360) - 180}) scale(0.7)`}>
                  {/* Pot */}
                  <polygon points="-40,30 40,30 28,45 -28,45" fill="#1c1917" stroke="#78350f" strokeWidth="2" />
                  {/* Trunk */}
                  <path d="M 0 30 Q -15 0 5 -30 Q 15 -60 -5 -80" stroke="#78350f" strokeWidth="10" fill="none" strokeLinecap="round" />
                  <path d="M 0 30 Q -15 0 5 -30 Q 15 -60 -5 -80" stroke="#b45309" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="2 3" />
                  {/* Canopy Foliage */}
                  <circle cx="-15" cy="-80" r="28" fill="rgba(6,78,59,0.9)" stroke="#10b981" strokeWidth="1.5" />
                  <circle cx="20" cy="-60" r="24" fill="rgba(6,78,59,0.85)" stroke="#10b981" strokeWidth="1.5" />
                  <circle cx="0" cy="-105" r="22" fill="rgba(4,120,87,0.95)" stroke="#34d399" strokeWidth="1.5" />
                </g>

                {/* Solfeggio Wave Particles */}
                {isAudioPlaying && (
                  <motion.circle
                    cx="400"
                    cy="210"
                    r="85"
                    stroke="rgba(245,158,11,0.5)"
                    strokeWidth="1.5"
                    fill="none"
                    animate={{
                      scale: [1, 2.4],
                      opacity: [0.8, 0],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: 'easeOut',
                    }}
                  />
                )}
              </svg>
            </div>

            {/* Interaction Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOpenHinged(!isOpenHinged)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 border border-amber-800/60 text-amber-200 text-xs font-mono transition-colors"
                >
                  {isOpenHinged ? 'Gập Mái Bản Lề (Che Mưa Sài Gòn)' : 'Mở Mái Bản Lề (Đón Gió Ven Sông)'}
                </button>
                <button
                  onClick={() => setBonsaiRotation((prev) => prev + 45)}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 text-xs font-mono transition-colors"
                >
                  Xoay Bonsai Tùng ({bonsaiRotation % 360}°)
                </button>
              </div>

              {/* Water Moat Selector */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-stone-400">Mực Hào Hoa Súng:</span>
                {(['low', 'balanced', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveMoatLevel(level)}
                    className={`min-h-[44px] px-3 py-1.5 rounded-lg border text-xs transition-all ${
                      activeMoatLevel === level
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-600'
                        : 'bg-stone-900 text-stone-400 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    {level === 'low' ? 'Êm Ái' : level === 'balanced' ? 'Chuẩn Vi Khí Hậu' : 'Triều Cường'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Specification Dossier */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-stone-900/70 rounded-3xl border border-stone-800/80 p-6 space-y-4">
              <h3 className="text-base font-serif text-amber-200 flex items-center gap-2 border-b border-stone-800/80 pb-3">
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Thông Số Kiến Trúc Thủy Đình V8
              </h3>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-stone-500 block">Cốt Gỗ Kết Cấu:</span>
                  <span className="text-stone-200">{SPEC.timberAge}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Bonsai Hào Nước:</span>
                  <span className="text-stone-200">{SPEC.bonsaiAge}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Độ Giảm Nhiệt Thực Tế:</span>
                  <span className="text-emerald-400 font-semibold">{SPEC.temperatureReduction}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Độ Ẩm Tự Nhiên (RH):</span>
                  <span className="text-stone-200">{SPEC.relativeHumidity}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Tốc Độ Gió Đối Lưu:</span>
                  <span className="text-stone-200">{SPEC.airflowVelocity}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Hòa Âm Solfeggio:</span>
                  <span className="text-amber-300 font-semibold">{SPEC.acousticFrequency}</span>
                </div>
              </div>
            </div>

            {/* Atelier Commitment Card */}
            <div className="bg-gradient-to-br from-amber-950/40 via-stone-900/60 to-stone-900/90 rounded-2xl border border-amber-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-serif">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Cam Kết Chế Tác Độc Bản GuHomes</span>
              </div>
              <p className="text-stone-300 text-xs font-light leading-relaxed">
                Mỗi thủy đình được KTS Trưởng GuHomes trực tiếp đo đạc phong thủy và vi khí hậu khu đất, hoàn thiện mộng nêm không đinh sắt tại xưởng Thạnh Xuân 1.200m², giới hạn nghiêm ngặt 12 công trình độc bản mỗi năm.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-amber-950/60">
                <span>Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="text-amber-300 font-serif hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedCypressFlowerMoatPavilionV8;
