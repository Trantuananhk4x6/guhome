'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudDuoseptuagesimalLeafStudio() {
  const [leafRotationAngle, setLeafRotationAngle] = useState<number>(72)
  const [jadeGlowIntensity, setJadeGlowIntensity] = useState<number>(88)
  const [harmonicResonanceActive, setHarmonicResonanceActive] = useState<boolean>(false)
  const [selectedAtelierAspect, setSelectedAtelierAspect] = useState<number>(0)

  // Web Audio Context & Oscillators for Solfeggio 528Hz & 1056Hz (Crown Wisdom & Clarity)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscBaseRef = useRef<OscillatorNode | null>(null)
  const oscHarmonicRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopHarmonics = () => {
    try {
      if (oscBaseRef.current) {
        oscBaseRef.current.stop()
        oscBaseRef.current.disconnect()
        oscBaseRef.current = null
      }
      if (oscHarmonicRef.current) {
        oscHarmonicRef.current.stop()
        oscHarmonicRef.current.disconnect()
        oscHarmonicRef.current = null
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect()
        gainNodeRef.current = null
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
        audioCtxRef.current = null
      }
    } catch {
      // Safe cleanup catch
    }
  }

  const startHarmonics = () => {
    stopHarmonics()
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.038, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz: Transformation & Pure Vision
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      oscBaseRef.current = osc1

      // Octave 1056Hz: Deep Focus & High Awareness
      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(1056, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      oscHarmonicRef.current = osc2
    } catch {
      // Audio error catch
    }
  }

  const toggleHarmonics = () => {
    if (harmonicResonanceActive) {
      stopHarmonics()
      setHarmonicResonanceActive(false)
    } else {
      startHarmonics()
      setHarmonicResonanceActive(true)
    }
  }

  useEffect(() => {
    return () => {
      stopHarmonics()
    }
  }, [])

  const metrics: BrushRestMetric[] = [
    {
      label: 'Số Cánh Sen Phỉ Thúy',
      value: '72 Diệp',
      subtext: 'Thất Thập Nhị Huyền Biến',
      detail: '72 cánh sen ngọc Phỉ Thúy Type A chạm khắc lớp lang đa tầng, biểu tượng cho sự ứng biến linh hoạt và thịnh vượng bền vững.'
    },
    {
      label: 'Bệ Mun Sừng Khánh Hòa',
      value: '400 Năm',
      subtext: 'Mun Sừng Khánh Hòa đen tuyền',
      detail: 'Bệ đỡ từ phôi gỗ Mun Sừng 400 năm tuổi đen nhánh tuyền như ngọc mun bóng mờ tự nhiên, triệt tiêu rung chấn vi thể khi đặt ngự bút.'
    },
    {
      label: 'Nẹp Vàng 24K Filigree',
      value: '0.11 mm',
      subtext: 'Kim hoàn kéo sợi thủ công Thăng Long',
      detail: 'Từng viền cánh sen được bọc nẹp chỉ Vàng 24K Filigree 0.11mm uốn lượn hình vân mây rồng thời Lý, chống sứt mẻ ngọc khi gác bút.'
    },
    {
      label: 'Tần Số Thư Phòng Trí Tuệ',
      value: '528Hz & 1056Hz',
      subtext: 'Hòa âm Solfeggio kích hoạt tư duy',
      detail: 'Tần số thanh khiết xoa dịu áp lực thần kinh, giúp gia chủ tìm thấy sự tĩnh tại và minh triết trên từng nét bút thư pháp.'
    }
  ]

  const atelierAspects = [
    {
      title: '72 Cánh Sen Ngọc Phỉ Thúy Type A',
      subtitle: 'Bảo Ngọc Thư Phòng',
      detail: 'Được chế tác từ phôi Ngọc Phỉ Thúy Miến Điện Type A tự nhiên không xử lý nhiệt hay hóa chất, độ thấu quang 90% lung linh dưới ánh sáng tự nhiên, tôn vinh nét tao nhã của văn phòng tứ bảo.'
    },
    {
      title: 'Bệ Gỗ Mun Sừng Khánh Hòa 400 Năm',
      subtitle: 'Báu Vật Mộc Thần Bí Phương Nam',
      detail: 'Gỗ Mun Sừng Khánh Hòa (*Diospyros mun*) 400 năm tuổi đầm đặc tỷ trọng 1.25 g/cm³, chất gỗ đen nhánh như gương cổ, kháng ẩm và không mối mọt suốt hàng thế kỷ.'
    },
    {
      title: 'Viền Vàng 24K Filigree Tinh Xảo',
      subtitle: 'Kỹ Nghệ Kim Hoàn Thất Truyền',
      detail: 'Nghệ nhân kim hoàn Thăng Long kéo rút vàng ròng 24K thành sợi chỉ mảnh 0.11mm, uốn lượn và hàn gắn thủ công theo kỹ thuật Filigree cổ truyền tạo nên đường viền sen kiêu sa bền vững.'
    },
    {
      title: 'Điểm Tựa Ngự Bút Chuẩn Xác',
      subtitle: 'Công Thái Học Văn Nhân',
      detail: 'Độ cong rãnh gác bút được tính toán theo tỷ lệ vàng Fibonacci, giữ ngòi bút lông luôn nâng cao 15 độ so với mặt bàn, bảo vệ đầu lông không bị gãy gập và giữ mực khô tự nhiên.'
    }
  ]

  return (
    <section className="relative w-full py-20 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden border-t border-amber-900/30">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-950 to-black pointer-events-none" />
      <div className="absolute -top-32 right-0 w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-0 w-96 h-96 bg-amber-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-700/40 text-emerald-300 text-xs font-serif uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Văn Phòng Tứ Bảo Thượng Lưu
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-100 tracking-wide mb-4">
            Kê Ngự Bút Sen Thất Thập Nhị Diệp 72 Cánh Trên Bệ Mun Sừng Khánh Hòa 400 Năm
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Tạo tác văn phòng tứ bảo độc bản dành cho không gian thư phòng thượng lưu. 72 cánh sen Ngọc Phỉ Thúy Type A nẹp vàng 24K Filigree đặt trang trọng trên bệ gỗ Mun Sừng Khánh Hòa 400 năm tuổi đen nhánh tuyền như ngọc thạch.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-stone-900/60 border border-emerald-900/20 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-serif text-emerald-400/80 uppercase tracking-wider block mb-1">
                  {item.label}
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-emerald-200 font-medium block mb-1">
                  {item.value}
                </span>
                <span className="text-xs text-stone-300 font-light block mb-2">
                  {item.subtext}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light leading-normal border-t border-stone-800 pt-2">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Showcase Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 bg-stone-900/40 p-6 sm:p-8 rounded-3xl border border-emerald-900/20 backdrop-blur-md">
          {/* Visual Presentation Frame */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-stone-950/80 rounded-2xl border border-stone-800 relative min-h-[340px] overflow-hidden">
            {/* Jade Aura Halo */}
            <motion.div
              initial={{ opacity: 0.2 }}
              animate={{
                opacity: [0.15, (jadeGlowIntensity / 100) * 0.45, 0.15],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-emerald-600/10 to-transparent pointer-events-none"
            />

            {/* Lotus Brush Rest SVG Visual */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Wooden Pedestal Base (Mun Sừng Khánh Hòa 400 Năm) */}
                <rect
                  x="30"
                  y="155"
                  width="140"
                  height="22"
                  rx="4"
                  fill="#1c1917"
                  stroke="#44403c"
                  strokeWidth="1.5"
                />
                <rect
                  x="45"
                  y="145"
                  width="110"
                  height="12"
                  rx="3"
                  fill="#292524"
                  stroke="#57534e"
                  strokeWidth="1"
                />

                {/* 72 Jade Lotus Petals Array */}
                <g transform={`rotate(${leafRotationAngle - 72}, 100, 115)`}>
                  {/* Outer Petals Layer */}
                  <ellipse cx="65" cy="120" rx="14" ry="24" fill="#047857" stroke="#fbbf24" strokeWidth="1.2" transform="rotate(-32 65 120)" />
                  <ellipse cx="135" cy="120" rx="14" ry="24" fill="#047857" stroke="#fbbf24" strokeWidth="1.2" transform="rotate(32 135 120)" />

                  {/* Mid Petals Layer */}
                  <ellipse cx="80" cy="110" rx="12" ry="26" fill="#059669" stroke="#fcd34d" strokeWidth="1.2" transform="rotate(-16 80 110)" />
                  <ellipse cx="120" cy="110" rx="12" ry="26" fill="#059669" stroke="#fcd34d" strokeWidth="1.2" transform="rotate(16 120 110)" />

                  {/* Center Lotus Bud Core (72nd apex petal) */}
                  <ellipse cx="100" cy="100" rx="13" ry="28" fill="#10b981" stroke="#fef08a" strokeWidth="1.5" />

                  {/* Gold Filigree Veins */}
                  <path d="M100 128 L100 75" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 1" />
                  <path d="M80 134 Q90 115 100 100 Q110 115 120 134" fill="none" stroke="#fbbf24" strokeWidth="1" />
                </g>

                {/* Rested Calligraphy Brush Outline (Visual Context) */}
                <line
                  x1="25"
                  y1="90"
                  x2="175"
                  y2="75"
                  stroke="rgba(214, 211, 209, 0.45)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <polygon points="175,75 190,73 175,80" fill="#44403c" />
              </svg>
            </div>

            {/* Status Badges */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-emerald-300 border border-emerald-800/40">
                Góc Nghiêng Cánh Sen: {leafRotationAngle}°
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-emerald-400 border border-emerald-800/40">
                Thấu Quang Phỉ Thúy: {jadeGlowIntensity}%
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-amber-300 border border-amber-800/40">
                Hòa Âm Trí Tuệ: {harmonicResonanceActive ? '528Hz & 1056Hz Active' : 'Yên Tĩnh'}
              </span>
            </div>
          </div>

          {/* Interactive Controls Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <label htmlFor="angle-range-72" className="text-xs font-serif text-emerald-400 uppercase tracking-wider block mb-2">
                Tinh Chỉnh Góc Thư Phòng (45° đến 95°)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="angle-range-72"
                  type="range"
                  min="45"
                  max="95"
                  step="1"
                  value={leafRotationAngle}
                  onChange={(e) => setLeafRotationAngle(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-serif text-emerald-200 min-w-[48px] text-right font-semibold">
                  {leafRotationAngle}°
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="glow-range-72" className="text-xs font-serif text-emerald-400 uppercase tracking-wider block mb-2">
                Độ Thấu Quang Ngọc Phỉ Thúy (60% - 100%)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="glow-range-72"
                  type="range"
                  min="60"
                  max="100"
                  step="2"
                  value={jadeGlowIntensity}
                  onChange={(e) => setJadeGlowIntensity(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-serif text-emerald-200 min-w-[48px] text-right font-semibold">
                  {jadeGlowIntensity}%
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={toggleHarmonics}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-emerald-700/50 bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-200 text-xs font-serif tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${harmonicResonanceActive ? 'bg-emerald-400 animate-ping' : 'bg-stone-600'}`} />
                {harmonicResonanceActive ? 'Dừng Tần Số Trí Tuệ 528Hz' : 'Bật Tần Số Trí Tuệ 528Hz'}
              </button>
            </div>

            {/* Aspect Selector */}
            <div>
              <span className="text-xs font-serif text-emerald-400 uppercase tracking-wider block mb-2">
                Chi Tiết Cấu Kiện Kê Ngự Bút 72 Diệp
              </span>
              <div className="grid grid-cols-2 gap-2">
                {atelierAspects.map((aspect, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedAtelierAspect(idx)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left border transition-all text-xs font-serif ${
                      selectedAtelierAspect === idx
                        ? 'border-emerald-500 bg-emerald-950/70 text-emerald-200 shadow-md shadow-emerald-950/50'
                        : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                    }`}
                  >
                    <span className="font-semibold block truncate">{aspect.subtitle}</span>
                    <span className="text-[10px] text-stone-300 truncate block">{aspect.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Aspect Card */}
        <AnimatePresence mode="wait">
          {atelierAspects[selectedAtelierAspect] && (
            <motion.div
              key={selectedAtelierAspect}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-950/90 border border-emerald-800/30 backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg sm:text-xl font-serif text-emerald-200">
                  {atelierAspects[selectedAtelierAspect].title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-serif bg-emerald-950/80 border border-emerald-700/50 text-emerald-300 self-start sm:self-auto">
                  {atelierAspects[selectedAtelierAspect].subtitle}
                </span>
              </div>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                {atelierAspects[selectedAtelierAspect].detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GuHomes Footer Note */}
        <div className="mt-14 text-center border-t border-stone-800/60 pt-8">
          <p className="text-xs text-stone-300 font-light tracking-wider">
            Nghệ thuật chế tác thủ công bởi <span className="text-emerald-300 font-normal">GuHomes</span> · Xưởng may đo Thạnh Xuân 1.200m² · Giới hạn 12 công trình may đo mỗi năm.
          </p>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudDuoseptuagesimalLeafStudio
