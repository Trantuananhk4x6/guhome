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
  translucency: '99.99% Thấu quang ngọc tủy thanh ngọc hoàng gia',
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 24 cánh',
  woodBase: 'Gỗ Mun Hoa Cổ Thụ 395 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const TETRAVIGESIMAL_LEAF_NAMES = [
  'Diệp Nhất (Sơ Khai)',
  'Diệp Nhị (Cam Lộ)',
  'Diệp Tam (Thanh Lương)',
  'Diệp Tứ (Minh Triết)',
  'Diệp Ngũ (Tĩnh Lự)',
  'Diệp Lục (Vi Diệu)',
  'Diệp Thất (Viên Dung)',
  'Diệp Bát (Bảo Quang)',
  'Diệp Cửu (Diệu Hạnh)',
  'Diệp Thập (Vô Lượng)',
  'Diệp Thập Nhất (Như Ý)',
  'Diệp Thập Nhị (Viên Mãn)',
  'Diệp Thập Tam (Vô Thượng)',
  'Diệp Thập Tứ (Đại Giác)',
  'Diệp Thập Ngũ (Chân Như)',
  'Diệp Thập Lục (Bản Thể)',
  'Diệp Thập Thất (Tối Thượng Diệu Giác)',
  'Diệp Thập Bát (Viên Giác Vô Ngại)',
  'Diệp Thập Cửu (Vạn Pháp Quy Nhất)',
  'Diệp Nhị Thập (Đại Viên Cảnh Trí)',
  'Diệp Nhị Thập Nhất (Vô Lượng Thọ Quang)',
  'Diệp Nhị Thập Nhị (Diệu Trí Pháp Thân)',
  'Diệp Nhị Thập Tam (Tịch Diệt Tĩnh Thất)',
  'Diệp Nhị Thập Tứ (Viên Mãn Vô Thượng Bồ Đề)',
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTetravigesimalLeafStudio() {
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
        // ignore on cleanup
      }
    }
  }, [])

  const toggleAcousticHarmony = () => {
    if (!isAudioActive) {
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
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2)

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
        console.error('Audio initialization failed:', err)
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
            setIsAudioActive(false)
          }, 550)
        } catch {
          setIsAudioActive(false)
        }
      } else {
        setIsAudioActive(false)
      }
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 text-stone-200 shadow-2xl backdrop-blur-md md:p-10 my-10">
      {/* Background Subtle Gradient */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-emerald-950/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-yellow-950/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-stone-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-emerald-800/50 bg-emerald-950/60 px-3 py-0.5 text-xs font-medium text-emerald-300">
                GuHomes Calligraphy Atelier
              </span>
              <span className="inline-flex items-center rounded-full border border-yellow-800/40 bg-yellow-950/50 px-2.5 py-0.5 text-xs font-semibold text-yellow-400">
                Sen Nhị Thập Tứ Diệp 24 Cánh
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-light tracking-wide text-stone-100 sm:text-3xl">
              Kê Ngự Bút Búp Sen 24 Cánh Phỉ Thúy Type A & Nẹp Vàng 24K Filigree
            </h3>
            <p className="mt-1 text-sm text-stone-400">
              Kiệt tác ngự thư phòng trên Bệ Gỗ Mun Hoa 395 năm - Góc nghiêng 15° thoát giọt mực tuyệt đối
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleAcousticHarmony}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                isAudioActive
                  ? 'border-emerald-500/80 bg-emerald-950/50 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                  : 'border-stone-700/60 bg-stone-900/60 text-stone-300 hover:border-emerald-600/50 hover:bg-stone-800/60'
              }`}
              style={{ minHeight: '44px', minWidth: '44px' }}
              title="Kích hoạt âm thanh Solfeggio 528Hz & 1056Hz"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" />
              </svg>
              <span>{isAudioActive ? 'Bát Độ Thiền (528Hz & 1056Hz)' : 'Kích Hoạt Âm Định'}</span>
            </button>
          </div>
        </div>

        {/* Visualizer Stage */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visual Display */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur lg:col-span-7">
            <div className="relative flex h-80 w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-4">
              {/* Translucent Jade Ambient Backlight */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.15, 0.35, 0.15],
                  }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                  className="h-44 w-44 rounded-full bg-emerald-500/20 blur-2xl"
                />
              </div>

              {/* The Lotus Brush Rest Architecture */}
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* 24 Lotus Leaves Jade Bloom Structure */}
                <div className="relative flex h-36 w-48 items-center justify-center">
                  {/* Stylized Lotus Leaves Array */}
                  <svg className="h-32 w-44 filter drop-shadow-[0_0_12px_rgba(52,211,153,0.3)]" viewBox="0 0 120 80">
                    <defs>
                      <linearGradient id="jadeGrad164" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#059669" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#064e3b" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="goldWire164" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fef08a" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#b45309" />
                      </linearGradient>
                    </defs>

                    {/* Central Lotus Ridge - Rest Saddle */}
                    <path
                      d="M 20 50 Q 40 30 60 45 Q 80 30 100 50 Q 80 62 60 52 Q 40 62 20 50 Z"
                      fill="url(#jadeGrad164)"
                      stroke="url(#goldWire164)"
                      strokeWidth="1.5"
                    />

                    {/* 24 Filigree Veins / Leaves Outline representation */}
                    <path d="M 60 45 L 60 18" stroke="url(#goldWire164)" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M 50 42 L 40 22" stroke="url(#goldWire164)" strokeWidth="1" strokeLinecap="round" />
                    <path d="M 70 42 L 80 22" stroke="url(#goldWire164)" strokeWidth="1" strokeLinecap="round" />
                    <path d="M 42 46 L 28 32" stroke="url(#goldWire164)" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M 78 46 L 92 32" stroke="url(#goldWire164)" strokeWidth="0.8" strokeLinecap="round" />

                    <path d="M 32 48 L 18 42" stroke="url(#goldWire164)" strokeWidth="0.8" strokeLinecap="round" />
                    <path d="M 88 48 L 102 42" stroke="url(#goldWire164)" strokeWidth="0.8" strokeLinecap="round" />

                    {/* Active Highlight Node */}
                    <circle cx="60" cy="45" r="4" fill="#fef08a" className="animate-pulse" />
                  </svg>

                  {/* Imperial Calligraphy Brush Resting on the Saddle */}
                  <AnimatePresence>
                    {isBrushPlaced && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, rotate: 12 }}
                        animate={{ opacity: 1, y: 0, rotate: 15 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -top-4 left-4 h-5 w-48 origin-bottom-left"
                      >
                        {/* Brush Shaft & Nib */}
                        <div className="relative h-2 w-48 rounded-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-800 shadow-md">
                          {/* Nib Fur */}
                          <div className="absolute -left-4 -top-0.5 h-3 w-5 rounded-l-full bg-gradient-to-l from-stone-300 via-stone-500 to-black" />
                          <div className="absolute right-2 top-0.5 text-[7px] text-amber-300/80 font-mono tracking-tighter">
                            Ngự Bút Cổ
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Ancient Mun Wood Base with Mortise-Tenon Joinery */}
                <div className="mt-1 flex h-8 w-60 items-center justify-center rounded-lg border-t-2 border-stone-700 bg-gradient-to-r from-stone-900 via-zinc-900 to-stone-900 shadow-2xl">
                  <span className="text-[10px] tracking-widest uppercase text-stone-400">
                    Bệ Gỗ Mun Hoa Cổ Thụ 395 Năm
                  </span>
                </div>
              </motion.div>

              {/* Status footer bar */}
              <div className="mt-4 flex w-full justify-between px-4 text-[11px] text-stone-400">
                <span>Trạng Thái Bút: <strong className={isBrushPlaced ? 'text-emerald-300' : 'text-stone-300'}>{isBrushPlaced ? 'Đang Ngự Kê (Nghiêng 15°)' : 'Đang Chấp Bút'}</strong></span>
                <span>Cánh Sen Chọn: <strong className="text-yellow-400">{TETRAVIGESIMAL_LEAF_NAMES[activeLeafIndex]}</strong></span>
              </div>
            </div>
          </div>

          {/* Controls & Knowledge Panel */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="space-y-4">
              {/* Brush placement toggle */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Thao Tác Ngự Bút Phòng
                </label>
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => setIsBrushPlaced(true)}
                    className={`flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all ${
                      isBrushPlaced
                        ? 'border-emerald-500/80 bg-emerald-950/40 text-emerald-200'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:bg-stone-800/50'
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    Kê Ngự Bút (Nghiêng 15°)
                  </button>
                  <button
                    onClick={() => setIsBrushPlaced(false)}
                    className={`flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all ${
                      !isBrushPlaced
                        ? 'border-yellow-500/80 bg-yellow-950/40 text-yellow-200'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:bg-stone-800/50'
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    Chấp Bút Thư Pháp
                  </button>
                </div>
              </div>

              {/* Leaf Selector */}
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-semibold uppercase tracking-wider">Khảo Sát 24 Cánh Sen Filigree</span>
                  <span className="font-mono text-emerald-400">{activeLeafIndex + 1}/24</span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1.5 max-h-36 overflow-y-auto pr-1">
                  {TETRAVIGESIMAL_LEAF_NAMES.map((name, idx) => (
                    <button
                      key={name}
                      onClick={() => setActiveLeafIndex(idx)}
                      className={`truncate rounded-lg border px-1.5 py-1 text-[10px] transition-all ${
                        activeLeafIndex === idx
                          ? 'border-yellow-500 bg-yellow-950/60 text-yellow-200'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:bg-stone-800/50'
                      }`}
                      style={{ minHeight: '44px' }}
                      title={name}
                    >
                      {name.split(' ')[0]} {name.split(' ')[1]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Magnification Slider */}
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-semibold uppercase tracking-wider">Độ Phóng Đại Vi Thể Vàng Filigree</span>
                  <span className="font-mono text-emerald-300 font-semibold">{zoomLevel.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.9"
                  max="1.5"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mt-5 border-t border-stone-800/80 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Thông Số Chế Tác Độc Bản
              </h4>
              <dl className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <dt className="text-stone-400">Chất liệu ngọc:</dt>
                  <dd className="font-medium text-emerald-300">{SPEC.jadeGrade}</dd>
                </div>
                <div>
                  <dt className="text-stone-400">Độ thấu quang:</dt>
                  <dd className="font-medium text-emerald-300">{SPEC.translucency}</dd>
                </div>
                <div>
                  <dt className="text-stone-400">Vàng Filigree:</dt>
                  <dd className="font-medium text-yellow-300">{SPEC.goldFiligree}</dd>
                </div>
                <div>
                  <dt className="text-stone-400">Bệ mộng âm dương:</dt>
                  <dd className="font-medium text-stone-300">{SPEC.woodBase}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* GuHomes Craftsmanship Guarantee */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-800/60 bg-stone-950/60 px-6 py-4 text-xs text-stone-400">
          <div>
            <span className="font-semibold text-emerald-300">Cam Kết Chế Tác GuHomes:</span> Xưởng may đo Thạnh Xuân 1.200m² - Trần 12 công trình/năm gìn giữ chuẩn mực ngự nghệ thủ công.
          </div>
          <div className="flex items-center gap-4">
            <span>KTS Trưởng: <a href="tel:0368757916" className="text-amber-300 hover:underline">0368 757 916</a></span>
            <span>Email: <a href="mailto:guhomesvn@gmail.com" className="text-stone-300 hover:underline">guhomesvn@gmail.com</a></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTetravigesimalLeafStudio
