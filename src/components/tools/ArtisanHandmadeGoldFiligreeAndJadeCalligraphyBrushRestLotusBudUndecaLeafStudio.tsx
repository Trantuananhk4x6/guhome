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
  translucency: '99.8% Thấu quang ngọc tủy thanh ngọc hoàng gia',
  goldFiligree: 'Vàng 24K Filigree 0.18mm đan tay hoa liên hoa',
  woodBase: 'Gỗ Mun Sừng Nam Bộ 330 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudUndecaLeafStudio() {
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

  const LEAF_LABELS = [
    'Diệp 1: Nhất Dương Sinh Khí',
    'Diệp 2: Nhị Nghi Cát Tường',
    'Diệp 3: Tam Tài Đồng Khởi',
    'Diệp 4: Tứ Thời Bình An',
    'Diệp 5: Ngũ Phúc Lâm Môn',
    'Diệp 6: Lục Hợp Thuận Hòa',
    'Diệp 7: Thất Tinh Tụ Khí',
    'Diệp 8: Bát Tiên Khánh Thọ',
    'Diệp 9: Cửu Cát Trường Tồn',
    'Diệp 10: Thập Toàn Thập Mỹ',
    'Diệp 11: Nhất Tâm Bất Loạn',
  ]

  return (
    <section className="relative my-16 overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-stone-950 via-stone-900 to-black p-6 sm:p-10 shadow-2xl">
      {/* Decorative emerald & golden glow */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-emerald-500/20 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Thư Phòng Bảo Vật · Thập Nhất Diệp Sen Phỉ Thúy GuHomes
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-stone-100 tracking-tight">
              Atelier Kê Ngự Bút Búp Sen Thập Nhất Diệp Sen Phỉ Thúy Type A Nẹp Vàng 24K
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
              Tạo tác kê ngự bút thư phòng tạc từ phiến Ngọc Bích Phỉ Thúy Type A tự nhiên thấu quang 99.8%, 
              kết hợp Thập Nhất Diệp Sen nẹp chỉ vàng 24K Filigree rãnh nghiêng 15° ngự trên bệ Gỗ Mun Sừng Nam Bộ 330 năm tuổi mộng cối âm dương.
            </p>
          </div>

          {/* Web Audio Octave Button */}
          <button
            onClick={toggleOctaveAudio}
            className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
              isAudioActive
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-lg shadow-emerald-500/20'
                : 'border-stone-700 bg-stone-800/80 text-stone-300 hover:border-emerald-500/50 hover:text-emerald-300'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isAudioActive ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              )}
            </svg>
            <span>{isAudioActive ? 'Bát Độ 528Hz & 1056Hz Đang Ngân' : 'Khởi Phát Bát Độ 528Hz & 1056Hz'}</span>
          </button>
        </div>

        {/* Studio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Visual Display */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-xl relative overflow-hidden">
            {/* SVG Illustration of Lotus Bud & Undeca Leaf Jade Brush Rest */}
            <div className="relative aspect-[16/11] w-full flex items-center justify-center rounded-xl bg-stone-900/60 border border-stone-800/80 p-4 overflow-hidden">
              <motion.div
                className="w-full h-full flex items-center justify-center"
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <svg viewBox="0 0 520 360" className="w-full h-full" fill="none">
                  {/* Mun Sung Wood Base (Bệ Mun Sừng Nam Bộ) */}
                  <rect x="60" y="270" width="400" height="32" rx="5" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
                  <rect x="80" y="302" width="45" height="25" rx="3" fill="#0c0a09" stroke="#292524" strokeWidth="1" />
                  <rect x="395" y="302" width="45" height="25" rx="3" fill="#0c0a09" stroke="#292524" strokeWidth="1" />
                  <line x1="60" y1="286" x2="460" y2="286" stroke="#78716c" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* Translucent Jade Pedestal (Thanh Ngọc Thấu Quang) */}
                  <ellipse cx="260" cy="265" rx="150" ry="18" fill="#064e3b" stroke="#34d399" strokeWidth="1.8" />
                  <ellipse cx="260" cy="265" rx="142" ry="13" fill="#047857" opacity="0.6" />

                  {/* 11 Jade Lotus Leaves (Thập Nhất Diệp Sen) with 24K Gold Filigree Trim */}
                  {/* Outer back leaves */}
                  <path d="M 110 260 C 95 210, 130 185, 165 220 Z" fill="#065f46" stroke="#fbbf24" strokeWidth="1.4" opacity={activeLeafIndex === 0 ? 1 : 0.8} />
                  <path d="M 410 260 C 425 210, 390 185, 355 220 Z" fill="#065f46" stroke="#fbbf24" strokeWidth="1.4" opacity={activeLeafIndex === 1 ? 1 : 0.8} />

                  {/* Mid leaves */}
                  <path d="M 140 255 C 120 195, 160 165, 200 210 Z" fill="#047857" stroke="#fbbf24" strokeWidth="1.4" opacity={activeLeafIndex === 2 ? 1 : 0.85} />
                  <path d="M 380 255 C 400 195, 360 165, 320 210 Z" fill="#047857" stroke="#fbbf24" strokeWidth="1.4" opacity={activeLeafIndex === 3 ? 1 : 0.85} />

                  {/* Inner leaves */}
                  <path d="M 170 250 C 150 180, 190 145, 220 195 Z" fill="#059669" stroke="#fde047" strokeWidth="1.5" opacity={activeLeafIndex === 4 ? 1 : 0.9} />
                  <path d="M 350 250 C 370 180, 330 145, 300 195 Z" fill="#059669" stroke="#fde047" strokeWidth="1.5" opacity={activeLeafIndex === 5 ? 1 : 0.9} />

                  {/* Front flanking leaves */}
                  <path d="M 198 255 C 185 200, 215 170, 240 215 Z" fill="#10b981" stroke="#fde047" strokeWidth="1.6" opacity={activeLeafIndex === 6 ? 1 : 0.95} />
                  <path d="M 322 255 C 335 200, 305 170, 280 215 Z" fill="#10b981" stroke="#fde047" strokeWidth="1.6" opacity={activeLeafIndex === 7 ? 1 : 0.95} />

                  {/* Center Pair Flanking Leaves (Diệp 9 & 10) */}
                  <path d="M 220 258 C 210 215, 238 175, 252 258 Z" fill="#34d399" stroke="#fef08a" strokeWidth="1.8" opacity={activeLeafIndex === 8 ? 1 : 0.98} />
                  <path d="M 300 258 C 310 215, 282 175, 268 258 Z" fill="#34d399" stroke="#fef08a" strokeWidth="1.8" opacity={activeLeafIndex === 9 ? 1 : 0.98} />

                  {/* Crown 11th Leaf Center Base Throne (Diệp thứ 11) */}
                  <path d="M 245 260 C 238 230, 260 200, 275 260 Z" fill="#6ee7b7" stroke="#fef08a" strokeWidth="1.8" opacity={activeLeafIndex === 10 ? 1 : 1} />

                  {/* Central Lotus Bud Rest (Búp Sen Cát Tường Kê Ngự Bút) */}
                  <path d="M 240 210 C 235 150, 260 120, 260 120 C 260 120, 285 150, 280 210 Z" fill="#059669" stroke="#fef08a" strokeWidth="2" />
                  <path d="M 252 205 C 248 165, 260 135, 260 135 C 260 135, 272 165, 268 205 Z" fill="#34d399" stroke="#fbbf24" strokeWidth="1.2" />

                  {/* Incline rest notch 15 degrees */}
                  <path d="M 245 155 L 275 163" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Imperial Calligraphy Brush (Ngự Bút Lông Thỏ Hoàng Gia) */}
                  <AnimatePresence>
                    {isBrushPlaced && (
                      <motion.g
                        initial={{ opacity: 0, y: -25, rotate: -8 }}
                        animate={{ opacity: 1, y: 0, rotate: -15 }}
                        exit={{ opacity: 0, y: -30, rotate: -5 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                        style={{ transformOrigin: '260px 158px' }}
                      >
                        {/* Brush Shaft (Cán bút mun sọc nẹp vàng) */}
                        <line x1="80" y1="205" x2="420" y2="114" stroke="#1c1917" strokeWidth="7" strokeLinecap="round" />
                        <line x1="80" y1="205" x2="420" y2="114" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="6 6" />
                        <rect x="360" y="125" width="22" height="10" rx="2" fill="#ca8a04" transform="rotate(-15 360 125)" />
                        {/* Brush Tip (Ngòi lông thỏ) */}
                        <path d="M 85 204 Q 60 215 50 220 Q 65 210 82 203 Z" fill="#e7e5e4" stroke="#d6d3d1" strokeWidth="1" />
                        <circle cx="50" cy="220" r="2.5" fill="#09090b" />
                      </motion.g>
                    )}
                  </AnimatePresence>
                </svg>
              </motion.div>
            </div>

            {/* Micro Controls for Placement & Zoom */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                  className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    isBrushPlaced
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200'
                      : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-emerald-500/40'
                  }`}
                >
                  {isBrushPlaced ? 'Nhấc Ngự Bút Thư Phòng' : 'Gác Ngự Bút Lên Búp Sen'}
                </button>
              </div>

              {/* Zoom control */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Kính Lúp Vi Mô:</span>
                <input
                  type="range"
                  min="1.0"
                  max="1.4"
                  step="0.05"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-24 accent-emerald-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-emerald-300 min-w-[36px]">{zoomLevel.toFixed(2)}x</span>
              </div>
            </div>
          </div>

          {/* Undeca Leaf Explorer & Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/50 p-6 backdrop-blur-xl">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Thập Nhất Diệp Sen &amp; Thông Số Thư Phòng
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                Chiêm ngưỡng cấu trúc mười một cánh sen ngọc thấu quang đỉnh cao.
              </p>

              {/* Leaf Selector Grid */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 gap-2">
                {LEAF_LABELS.map((label, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveLeafIndex(idx)}
                    className={`rounded-lg border p-2 text-left text-xs transition-all ${
                      activeLeafIndex === idx
                        ? 'border-emerald-500/70 bg-emerald-500/15 text-emerald-200 font-medium'
                        : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <div className="text-[10px] text-emerald-400/80">Diệp {idx + 1}</div>
                    <div className="truncate text-[11px]">{label.split(': ')[1]}</div>
                  </button>
                ))}
              </div>

              {/* Material Spec Details */}
              <dl className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between rounded-lg border border-stone-800 bg-stone-950/60 p-2.5">
                  <dt className="text-stone-400">Đẳng Cấp Ngọc Thạch:</dt>
                  <dd className="font-medium text-emerald-300">{SPEC.jadeGrade}</dd>
                </div>
                <div className="flex justify-between rounded-lg border border-stone-800 bg-stone-950/60 p-2.5">
                  <dt className="text-stone-400">Độ Thấu Quang Tự Nhiên:</dt>
                  <dd className="font-medium text-emerald-300">{SPEC.translucency}</dd>
                </div>
                <div className="flex justify-between rounded-lg border border-stone-800 bg-stone-950/60 p-2.5">
                  <dt className="text-stone-400">Kỹ Nghệ Nẹp Kim Hoàn:</dt>
                  <dd className="font-medium text-amber-300">{SPEC.goldFiligree}</dd>
                </div>
                <div className="flex justify-between rounded-lg border border-stone-800 bg-stone-950/60 p-2.5">
                  <dt className="text-stone-400">Bệ Đỡ Gỗ Hoàng Gia:</dt>
                  <dd className="font-medium text-amber-300">{SPEC.woodBase}</dd>
                </div>
                <div className="flex justify-between rounded-lg border border-stone-800 bg-stone-950/60 p-2.5">
                  <dt className="text-stone-400">Góc Thoát Mực Hoàn Hảo:</dt>
                  <dd className="font-medium text-cyan-300">{SPEC.inclineAngle}</dd>
                </div>
                <div className="flex justify-between rounded-lg border border-stone-800 bg-stone-950/60 p-2.5">
                  <dt className="text-stone-400">Âm Học Bát Độ Thiền:</dt>
                  <dd className="font-medium text-rose-300">{SPEC.acoustics}</dd>
                </div>
              </dl>
            </div>

            {/* Brand Signature */}
            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
              <span className="text-[11px] font-serif text-emerald-400">
                GuHomes Atelier · Xưởng Mộc May Đo Thạnh Xuân 1.200m²
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudUndecaLeafStudio
