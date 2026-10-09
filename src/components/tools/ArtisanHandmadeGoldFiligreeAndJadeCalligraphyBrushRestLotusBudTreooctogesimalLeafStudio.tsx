'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTreooctogesimalLeafStudio() {
  const [leafRotationAngle, setLeafRotationAngle] = useState<number>(83)
  const [jadeGlowIntensity, setJadeGlowIntensity] = useState<number>(98)
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
        oscBaseRef.current = null
      }
      if (oscHarmonicRef.current) {
        oscHarmonicRef.current.stop()
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
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz (Root Clarity)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      oscBaseRef.current = osc1

      // Higher Harmonic 1056Hz (Crown Transcendence)
      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
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
      label: '83 Cánh Sen Phỉ Thúy',
      value: 'Ngọc Type A',
      subtext: 'Bát Thập Tam Diệp Tam Tài Đồng Hưng',
      detail: '83 phiến ngọc phỉ thúy tự nhiên tuyển lọc khắt khe, mài vát từng cánh mỏng đạt độ thấu quang ngọc tủy 98%, biểu tượng cho Thiên Địa Nhân tam tài đồng hưng.',
    },
    {
      label: 'Gỗ Cẩm Lai Đồng Nai',
      value: '400 Năm',
      subtext: 'Lõi tím đen sọc đỏ tía đanh thép',
      detail: 'Lõi bệ gác bút chế tác từ Cẩm Lai rừng già Đồng Nai 4 thế kỷ, tom gỗ mịn như lụa, chống rung lắc vi mô tuyệt đối khi gác bút lông ngự bút.',
    },
    {
      label: 'Viền Vàng 24K Filigree',
      value: 'Chỉ 0.12mm',
      subtext: 'Đậu kim hoàn hoàng gia Việt Nam',
      detail: 'Chỉ vàng nguyên chất 99.99% được nghệ nhân Thạnh Xuân kéo sợi siêu vi và kết mộng vi mô ôm trọn từng viền cánh sen ngọc.',
    },
    {
      label: 'Cộng Hưởng Tần Số Cao',
      value: '528Hz & 1056Hz',
      subtext: 'Âm thoa thanh tẩy tâm thức thư phòng',
      detail: 'Tần số Solfeggio kép tạo dao động thanh tĩnh cho không gian thiền định, khai mở tuệ giác và định tâm tuyệt đối khi khai bút.',
    },
  ]

  const aspects = [
    {
      title: 'Tam Tài Đồng Hưng 83 Cánh',
      code: '83-PETAL ARCHETYPE',
      desc: 'Búp sen ngọc nở 83 tầng cánh đối xứng linh thiêng theo nhịp tam tài đồng hưng, hội tụ tinh hoa trời đất và tài trí con người.',
    },
    {
      title: 'Bệ Cẩm Lai Đồng Nai 400 Năm',
      code: 'DONG NAI ROSEWOOD PEDESTAL',
      desc: 'Khối gỗ cẩm lai 4 thế kỷ tím thẫm sọc đỏ tía đanh quánh, nâng đỡ trọng tâm chuẩn xác cho các tác phẩm ngự bút lông quý.',
    },
    {
      title: 'Nghệ Thuật Đậu Kim 24K',
      code: 'ROYAL FILIGREE JADE',
      desc: 'Sợi vàng 24K đan cài dạng lưới vi mô giữ ngọc không dùng keo hóa chất độc hại, ứng dụng kỹ nghệ hoàng kim truyền thống lưu danh thế kỷ.',
    },
  ]

  return (
    <section className="relative my-14 overflow-hidden rounded-3xl border border-[#2b3528] bg-[#0c130e] p-6 text-[#dce7db] shadow-2xl md:p-10">
      {/* Background ambient radiance */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1b4332]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#52b788]/15 blur-3xl" />

      {/* Header section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#1b2a1e] pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#2d6a4f] bg-[#112419] px-3.5 py-1 text-xs font-medium text-[#74c69d]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#95d5b2] animate-pulse" />
            Tuyệt Tác Thư Viện · Kê Ngự Bút Sen 83 Cánh Bát Thập Tam Diệp
          </div>
          <h2 className="mt-3 text-2xl font-serif tracking-tight text-[#f0f7f2] sm:text-3xl">
            Kê Ngự Bút Sen 83 Cánh Phỉ Thúy Type A & Bệ Gỗ Cẩm Lai Đồng Nai
          </h2>
          <p className="mt-2 text-sm text-[#b2c9b6] max-w-2xl font-light">
            Tuyệt đỉnh chế tác bảo vật thư phòng Quiet Luxury: 83 cánh sen ngọc phỉ thúy nẹp sợi vàng 24K Filigree đậu kim trên bệ gỗ Cẩm Lai Đồng Nai 400 năm tuổi của GuHomes.
          </p>
        </div>

        {/* Audio switch button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleHarmonics}
            aria-label="Kích hoạt vi âm tần số Solfeggio 528Hz & 1056Hz"
            className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-2 ${
              harmonicResonanceActive
                ? 'border-[#52b788] bg-[#1b3d2b] text-[#d8f3dc] shadow-lg shadow-[#2d6a4f]/40'
                : 'border-[#2d4734] bg-[#131d16] text-[#8ea894] hover:text-[#dce7db]'
            }`}
          >
            <svg className="w-4 h-4 text-[#74c69d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span>{harmonicResonanceActive ? 'Vi Âm Bát Thập Tam Diệp (528Hz + 1056Hz)' : 'Bật Vi Âm Khai Tuệ 528Hz'}</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metrics */}
      <div className="relative z-10 grid grid-cols-2 gap-4 my-8 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#1b2b1e] bg-[#111c14]/80 p-4 backdrop-blur transition-colors hover:border-[#2d4c33]"
          >
            <div className="text-xs font-medium text-[#74c69d]">{m.label}</div>
            <div className="mt-1 text-xl font-serif font-bold text-[#e9f5ec]">{m.value}</div>
            <div className="text-xs text-[#8ca391] mt-0.5">{m.subtext}</div>
            <p className="mt-2 text-[11px] leading-relaxed text-[#6c8572]">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* Interactive Control Panel & Visual Stage */}
      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        {/* Visual Stage */}
        <div className="relative lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl border border-[#1e3324] bg-gradient-to-b from-[#111f16] via-[#0d1711] to-[#070d0a]">
          {/* Subtle jade aura resonance simulation */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <motion.div
              animate={{
                opacity: jadeGlowIntensity ? jadeGlowIntensity / 140 : 0.4,
                scale: [0.96, 1.04, 0.96],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-t from-[#2d6a4f]/25 via-[#52b788]/15 to-transparent blur-2xl pointer-events-none"
            />

            {/* SVG Illustration of Lotus Jade Brush Rest with 83 Leaves Style */}
            <svg
              className="w-56 h-56 md:w-72 md:h-72 text-[#74c69d]"
              viewBox="0 0 200 200"
              fill="none"
              stroke="currentColor"
            >
              {/* Dong Nai Rosewood Pedestal */}
              <rect x="30" y="165" width="140" height="20" rx="4" fill="#1b151a" stroke="#382833" strokeWidth="2" />
              <path d="M40 165 C60 170, 80 162, 100 168 C120 174, 140 163, 160 165" stroke="#dfb858" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
              <rect x="45" y="155" width="110" height="10" rx="3" fill="#241b21" stroke="#4c3343" strokeWidth="1.5" />

              {/* 83 Lotus Petals & Gold Filigree Structure (Schematic) */}
              {/* Outer Jade Petals Layer */}
              <path d="M50 145 C55 120, 75 110, 85 130" stroke="#74c69d" strokeWidth="2" fill="#1b3d2b" fillOpacity="0.6" />
              <path d="M150 145 C145 120, 125 110, 115 130" stroke="#74c69d" strokeWidth="2" fill="#1b3d2b" fillOpacity="0.6" />
              
              {/* Middle Jade Petals Layer */}
              <path d="M65 135 C70 100, 90 95, 95 125" stroke="#95d5b2" strokeWidth="2" fill="#2d6a4f" fillOpacity="0.5" />
              <path d="M135 135 C130 100, 110 95, 105 125" stroke="#95d5b2" strokeWidth="2" fill="#2d6a4f" fillOpacity="0.5" />

              {/* Inner Petals with Gold Filigree borders */}
              <path d="M80 125 C85 85, 98 80, 100 115" stroke="#dfb858" strokeWidth="1.5" fill="#40916c" fillOpacity="0.4" />
              <path d="M120 125 C115 85, 102 80, 100 115" stroke="#dfb858" strokeWidth="1.5" fill="#40916c" fillOpacity="0.4" />

              {/* Central Lotus Pod Rest for Calligraphy Brush */}
              <ellipse cx="100" cy="115" rx="18" ry="9" fill="#1b3d2b" stroke="#dfb858" strokeWidth="1.8" />
              <circle cx="94" cy="115" r="2" fill="#d8f3dc" />
              <circle cx="100" cy="115" r="2" fill="#d8f3dc" />
              <circle cx="106" cy="115" r="2" fill="#d8f3dc" />

              {/* Stylized Jade Brush Silhouette Resting Across */}
              <motion.g
                animate={{ rotate: (leafRotationAngle - 83) * 0.15 }}
                style={{ originX: '100px', originY: '115px' }}
              >
                <path d="M35 100 L165 130" stroke="#fbf5eb" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
                <path d="M35 100 L165 130" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="4 3" />
                {/* Brush Tip */}
                <path d="M165 130 Q178 133 175 138 Q168 136 160 131 Z" fill="#2b2d42" stroke="#4a4e69" strokeWidth="1" />
              </motion.g>
            </svg>
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs uppercase tracking-widest text-[#7da185]">Độ Thấu Quang & Cân Bằng Trọng Tâm</span>
            <div className="text-sm font-medium text-[#d8f3dc] mt-1">
              Phỉ Thúy Type A {jadeGlowIntensity}% Thấu Quang · Góc Đỡ Ngự Bút {leafRotationAngle}°
            </div>
          </div>
        </div>

        {/* Interactive Controls & Atelier Aspects */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Tabs header */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-[#111d15] border border-[#223929]">
            {aspects.map((aspect, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAtelierAspect(idx)}
                aria-label={aspect.title}
                className={`min-h-[44px] flex-1 py-2 px-2 rounded-xl text-xs font-medium transition-all ${
                  selectedAtelierAspect === idx
                    ? 'bg-[#1e3b28] text-[#d8f3dc] shadow-md border border-[#3b734e]'
                    : 'text-[#829e88] hover:text-[#c4ded0]'
                }`}
              >
                {aspect.title}
              </button>
            ))}
          </div>

          {/* Aspect description panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAtelierAspect}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl border border-[#223929] bg-[#111e15]"
            >
              <div className="text-[10px] font-mono tracking-wider text-[#74c69d] uppercase">
                {aspects[selectedAtelierAspect]?.code}
              </div>
              <h3 className="text-base font-serif font-bold text-[#e6f4ea] mt-1">
                {aspects[selectedAtelierAspect]?.title}
              </h3>
              <p className="text-xs leading-relaxed text-[#9fba9e] mt-2 font-light">
                {aspects[selectedAtelierAspect]?.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Interactive sliders */}
          <div className="p-5 rounded-2xl border border-[#223929] bg-[#111e15] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#cce2d2]">Góc Đỡ Bút Lông Sen 83 Cánh</span>
              <span className="text-sm font-mono font-bold text-[#74c69d]">{leafRotationAngle}°</span>
            </div>

            <input
              type="range"
              min={60}
              max={100}
              step={1}
              value={leafRotationAngle}
              onChange={(e) => setLeafRotationAngle(Number(e.target.value))}
              aria-label="Thanh trượt điều chỉnh góc nâng cánh sen ngọc"
              className="w-full accent-[#52b788] bg-[#1b3022] h-2 rounded-lg cursor-pointer"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-medium text-[#cce2d2]">Cường Độ Thấu Quang Ngọc Bích</span>
              <span className="text-sm font-mono font-bold text-[#95d5b2]">{jadeGlowIntensity}%</span>
            </div>

            <input
              type="range"
              min={50}
              max={100}
              step={1}
              value={jadeGlowIntensity}
              onChange={(e) => setJadeGlowIntensity(Number(e.target.value))}
              aria-label="Thanh trượt điều chỉnh độ thấu quang của ngọc phỉ thúy"
              className="w-full accent-[#74c69d] bg-[#1b3022] h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* GuHomes Thạnh Xuân Workshop guarantee */}
          <div className="p-4 rounded-2xl border border-[#1e3624] bg-[#0c1610] flex items-center gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[#2d6a4f] bg-[#14281c] flex items-center justify-center text-[#74c69d]">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-[11px] leading-snug text-[#7f9e85]">
              Chế tác thủ công độc bản tại xưởng may đo Thạnh Xuân 1.200m², giới hạn trần 12 kiệt tác mỗi năm, giữ trọn hồn phách kiến trúc nội thất Việt.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTreooctogesimalLeafStudio
