'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PipeShapeOption {
  id: string
  name: string
  englishName: string
  bowlHeight: string
  chamberDiameter: string
  stemType: string
  coolingTrait: string
  description: string
}

const PIPE_SHAPES: PipeShapeOption[] = [
  {
    id: 'billiard-classic',
    name: 'Dáng Trực Quản (Billiard Cổ Điển)',
    englishName: 'Billiard Straight Shank',
    bowlHeight: '48mm',
    chamberDiameter: '19.5mm',
    stemType: 'Cán thẳng Ebonite Đức lưu hóa cao cấp',
    coolingTrait: 'Luồng khói thẳng mượt mà, cân bằng vị mộc nguyên bản',
    description: 'Dáng tẩu kinh điển bậc nhất hoàng gia, thân tẩu thẳng đứng tạo tư thế thưởng tẩu đĩnh đạc, ung dung.'
  },
  {
    id: 'dublin-conic',
    name: 'Dáng Loa Thành (Dublin Phóng Khoáng)',
    englishName: 'Dublin Quarter-Bent',
    bowlHeight: '52mm',
    chamberDiameter: '21.0mm',
    stemType: 'Cán vát góc nghiêng 15 độ linh hoạt',
    coolingTrait: 'Bõ tẩu loe hình nón khuếch tán nhiệt nhanh, hương đượm tầng đáy',
    description: 'Thân bõ mở rộng hướng lên tựa miệng hoa loa kèn, tôn vinh thớ gỗ Mun sừng Khánh Hòa tuyền một màu huyền bí.'
  },
  {
    id: 'rhodesian-bent',
    name: 'Dáng Song Tuyến (Rhodesian Uy Quyền)',
    englishName: 'Rhodesian Half-Bent Diamond',
    bowlHeight: '44mm',
    chamberDiameter: '20.0mm',
    stemType: 'Cán bán cong vát kim cương ngậm êm ái',
    coolingTrait: 'Gờ vai đôi tản nhiệt kép, khói mát lạnh dịu êm vòm họng',
    description: 'Bõ tẩu phình tròn với hai đường gân song tuyến kiêu hãnh, hạ trọng tâm giúp tẩu nằm vững chãi trên tay.'
  }
]

interface DamascenePatternOption {
  id: string
  name: string
  goldGauge: string
  technique: string
  philosophy: string
}

const DAMASCENE_PATTERNS: DamascenePatternOption[] = [
  {
    id: 'thien-dia-ky-ha',
    name: 'Thiên Địa Kỷ Hà (Damascene Geometric Lattice)',
    goldGauge: 'Chỉ vàng 24K nguyên chất 0.20mm',
    technique: 'Nạm ngàm đuôi én thủ công trên thớ gỗ mun sừng hóa thạch',
    philosophy: 'Đường nét giao thoa vuông tròn biểu trưng cho trời đất an định, tư duy sắc bén.'
  },
  {
    id: 'long-van-vuong-khi',
    name: 'Long Vân Vương Khí (Imperial Cloud & Dragon)',
    goldGauge: 'Chỉ vàng 24K đập búa mỏng 0.18mm phối viền bạc 999',
    technique: 'Khảm chỉ vàng uốn lượn đa lớp tương phản sâu trên nền mun đen bóng',
    philosophy: 'Mây cuộn rồng ẩn, phong thái quyền uy ẩn dật của bậc trượng phu sành sỏi.'
  },
  {
    id: 'mai-khai-phu-quy',
    name: 'Mai Khai Ngũ Phúc (Five-Petal Plum Blossom)',
    goldGauge: 'Chỉ vàng 24K dát hoa văn tế vi 0.15mm',
    technique: 'Điểm xuyết hoa mai thếp vàng đan xen hoa văn triện cổ',
    philosophy: 'Ngũ phúc lâm môn: Khang, Ninh, Phúc, Lộc, Thọ - thăng hoa từng khoảnh khắc tĩnh tại.'
  }
]

export function ArtisanGoldDamasceneEbonyTobaccoPipeAtelier({ className = '' }: { className?: string }) {
  const [selectedShapeIndex, setSelectedShapeIndex] = useState(0)
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0)
  const [isMagnifierActive, setIsMagnifierActive] = useState(false)
  const [isHearthGlow, setIsHearthGlow] = useState(false)
  const [monogramText, setMonogramText] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
      }
    }
  }, [])

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Âm thanh đánh lửa mộc vintage & tiếng gió luồng khói êm dịu
  const playVintageDraftAudio = () => {
    const ctx = initAudio()
    if (!ctx) return
    const now = ctx.currentTime

    // 1. Tiếng xước quẹt diêm gỗ / đá lửa (Flint strike)
    const bufferSize = Math.floor(ctx.sampleRate * 0.08)
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02))
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(3200, now)
    filter.Q.setValueAtTime(3.5, now)

    const strikeGain = ctx.createGain()
    strikeGain.gain.setValueAtTime(0.08, now)
    strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

    noise.connect(filter)
    filter.connect(strikeGain)
    strikeGain.connect(ctx.destination)
    noise.start(now)

    // 2. Tiếng luồng khí êm dịu qua ống tẩu gỗ (Gentle draft)
    const osc = ctx.createOscillator()
    const draftGain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, now + 0.06)
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.5)

    draftGain.gain.setValueAtTime(0.001, now + 0.06)
    draftGain.gain.linearRampToValueAtTime(0.04, now + 0.15)
    draftGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55)

    osc.connect(draftGain)
    draftGain.connect(ctx.destination)
    osc.start(now + 0.06)
    osc.stop(now + 0.58)

    // 3. Tiếng gõ nhẹ vòng ring bạc ta (Silver ring resonance)
    const ringOsc = ctx.createOscillator()
    const ringGain = ctx.createGain()
    ringOsc.type = 'triangle'
    ringOsc.frequency.setValueAtTime(1860, now + 0.12)

    ringGain.gain.setValueAtTime(0.05, now + 0.12)
    ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)

    ringOsc.connect(ringGain)
    ringGain.connect(ctx.destination)
    ringOsc.start(now + 0.12)
    ringOsc.stop(now + 0.48)
  }

  const currentShape = (PIPE_SHAPES[selectedShapeIndex] ?? PIPE_SHAPES[0]) as PipeShapeOption
  const currentPattern = (DAMASCENE_PATTERNS[selectedPatternIndex] ?? DAMASCENE_PATTERNS[0]) as DamascenePatternOption

  const handleTestDraw = () => {
    setIsHearthGlow(true)
    playVintageDraftAudio()
    setTimeout(() => {
      setIsHearthGlow(false)
    }, 1800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName.trim() || !customerPhone.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      id="artisan-damascene-pipe-atelier"
      aria-label="Atelier Tẩu Thuốc Ngự Dụng Mun Sừng Nạm Chỉ Vàng 24K Damascene"
      className={cn('relative py-20 px-4 md:px-8 bg-[#0B0C0E] text-[#EAE6DF] overflow-hidden', className)}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-10 w-[550px] h-[550px] bg-[#D4AF37]/5 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-10 w-[600px] h-[600px] bg-[#C08081]/5 rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#181A1F] border border-[#D4AF37]/30 text-xs tracking-widest text-[#D4AF37] uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
            Bespoke Haute Horlogerie & Tobacco Craft - Atelier GuHomes 2026
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#F5F2EB] tracking-tight mb-4">
            Tẩu Thuốc Ngự Dụng Mun Sừng <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F3E7C4] via-[#D4AF37] to-[#AA820A]">
              Nạm Chỉ Vàng 24K Damascene
            </span>
          </h2>
          <p className="text-sm md:text-base text-[#9E9B95] leading-relaxed">
            Chế tác độc bản từ gỗ Mun sừng Khánh Hòa hóa thạch đen tuyền, nạm chỉ vàng ròng 24K dày 0.2mm theo kỹ thuật ngàm đuôi én Damascene hoàng gia. Lòng bõ ốp đá bọt núi lửa Bazan Đắk Nông kháng nhiệt 600°C, giữ trọn hương vị mộc thanh khiết nhất cõi đời.
          </p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-[#7A7771]">
            <span>Mã định danh: <strong className="text-[#D4AF37] font-mono">GU-DAMASCENE-PIPE-2026-X</strong></span>
            <span>-</span>
            <span>Chế tác tối đa: <strong className="text-[#EAE6DF]">06 chiếc/năm</strong></span>
          </div>
        </div>

        {/* Main Interactive Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Pipe Inspection & Interactive Magnifier */}
          <div className="lg:col-span-7 bg-[#121316] rounded-2xl border border-white/10 p-6 md:p-8 relative shadow-2xl overflow-hidden">
            {/* Control Bar: Shape & Damascene Quick Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/5">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#8A8780]">Dáng Tẩu Hiện Tại</span>
                <p className="text-base font-serif text-[#F5F2EB]">{currentShape.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMagnifierActive(!isMagnifierActive)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border',
                    isMagnifierActive
                      ? 'bg-[#D4AF37] text-[#0B0C0E] border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                      : 'bg-[#181A1F] text-[#C4C0B8] border-white/10 hover:border-[#D4AF37]/40'
                  )}
                  title="Kính soi sợi vàng 24K quang học 360 độ"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  {isMagnifierActive ? 'Tắt Kính Soi 360°' : 'Kính Soi Sợi Vàng 360°'}
                </button>

                <button
                  type="button"
                  onClick={handleTestDraw}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 bg-[#181A1F] text-[#D4AF37] border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10"
                  title="Thử luồng khói & ánh lửa bõ tẩu"
                >
                  <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.527.82-1.124 2.05-1.124 3.952 0 .97.16 1.83.435 2.556a3.52 3.52 0 01-1.002-.279c-.5-.246-.993-.6-1.417-1.077a1 1 0 00-1.448 1.378C7.57 10.3 8.356 11 9.4 11.45a5.52 5.52 0 002.6.45c2.32 0 4.2-1.88 4.2-4.2 0-2.48-1.78-4.22-3.805-5.147zM8.5 14a3.5 3.5 0 005.95 2.45 1 1 0 10-1.4-1.42 1.5 1.5 0 01-2.55-1.03c0-.3.08-.58.23-.82a1 1 0 00-1.72-1.02A3.5 3.5 0 008.5 14z" clipRule="evenodd" />
                  </svg>
                  Thử Lửa Lòng Bõ
                </button>
              </div>
            </div>

            {/* Visual Canvas of the Pipe */}
            <div className="relative my-8 h-64 md:h-72 rounded-xl bg-gradient-to-b from-[#0e0f12] to-[#16181d] border border-white/5 flex items-center justify-center overflow-hidden">
              {/* Volcanic Hearth Ember Glow effect */}
              {isHearthGlow && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-10 left-[28%] md:left-[32%] w-16 h-16 rounded-full bg-gradient-to-t from-red-600 via-amber-500 to-yellow-300 blur-md pointer-events-none z-20 mix-blend-screen animate-pulse"
                />
              )}

              {/* Smoke Whiff animation */}
              {isHearthGlow && (
                <motion.div
                  initial={{ y: 0, opacity: 0.8, scale: 0.5 }}
                  animate={{ y: -60, opacity: 0, scale: 1.8 }}
                  transition={{ duration: 1.6, ease: 'easeOut' }}
                  className="absolute top-4 left-[26%] md:left-[30%] w-12 h-12 rounded-full bg-white/20 blur-lg pointer-events-none z-30"
                />
              )}

              {/* Graphical Pipe SVG Representation */}
              <svg className="w-full h-full max-w-[480px] drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]" viewBox="0 0 500 240" fill="none">
                <defs>
                  <linearGradient id="ebonyWoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E2024" />
                    <stop offset="40%" stopColor="#111215" />
                    <stop offset="80%" stopColor="#0B0C0E" />
                    <stop offset="100%" stopColor="#1A1C20" />
                  </linearGradient>

                  <linearGradient id="goldInlayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#FFF2B2" />
                    <stop offset="100%" stopColor="#AA820A" />
                  </linearGradient>

                  <linearGradient id="silverRingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="35%" stopColor="#D1D5DB" />
                    <stop offset="70%" stopColor="#9CA3AF" />
                    <stop offset="100%" stopColor="#E5E7EB" />
                  </linearGradient>

                  <radialGradient id="basaltChamberGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#374151" />
                    <stop offset="70%" stopColor="#1F2937" />
                    <stop offset="100%" stopColor="#111827" />
                  </radialGradient>
                </defs>

                {/* 1. Stem (Ebonite Cán Tẩu) */}
                {selectedShapeIndex === 0 && (
                  /* Billiard: Straight Stem */
                  <path
                    d="M260 145 L430 142 Q445 142 455 140 L455 150 Q445 152 430 152 L260 155 Z"
                    fill="#08080A"
                    stroke="#222"
                    strokeWidth="1.5"
                  />
                )}
                {selectedShapeIndex === 1 && (
                  /* Dublin: 15-deg Stem */
                  <path
                    d="M260 152 L380 144 Q420 136 450 125 L453 133 Q420 144 380 152 L260 160 Z"
                    fill="#08080A"
                    stroke="#222"
                    strokeWidth="1.5"
                  />
                )}
                {selectedShapeIndex === 2 && (
                  /* Rhodesian: Half-Bent Diamond Stem */
                  <path
                    d="M255 156 L360 154 Q410 148 440 120 L446 126 Q415 156 360 162 L255 166 Z"
                    fill="#08080A"
                    stroke="#222"
                    strokeWidth="1.5"
                  />
                )}

                {/* 2. Silver 999 Hand-Cast Ring (Vòng Ring Bạc Ta Khắc Triện) */}
                <rect
                  x="248"
                  y="138"
                  width="14"
                  height="26"
                  rx="2"
                  fill="url(#silverRingGrad)"
                  stroke="#4B5563"
                  strokeWidth="1"
                />
                {/* Silver Ring Engraving Detail */}
                <line x1="255" y1="140" x2="255" y2="162" stroke="#6B7280" strokeWidth="1" strokeDasharray="2 2" />

                {/* 3. Ebony Bowl Body (Thân bõ tẩu gỗ Mun sừng Khánh Hòa) */}
                {selectedShapeIndex === 0 && (
                  /* Billiard Bowl Shape */
                  <path
                    d="M120 70 Q110 165 170 185 Q220 190 255 160 L255 140 Q215 148 185 140 Q175 70 175 70 Z"
                    fill="url(#ebonyWoodGrad)"
                    stroke="#333842"
                    strokeWidth="2"
                  />
                )}
                {selectedShapeIndex === 1 && (
                  /* Dublin Bowl Shape (Conic Flare) */
                  <path
                    d="M110 65 Q115 165 170 185 Q220 190 255 165 L255 145 Q215 150 185 140 Q185 65 185 65 Z"
                    fill="url(#ebonyWoodGrad)"
                    stroke="#333842"
                    strokeWidth="2"
                  />
                )}
                {selectedShapeIndex === 2 && (
                  /* Rhodesian Bowl Shape (Bulbous with double ridge) */
                  <path
                    d="M118 80 Q100 135 125 155 Q145 188 190 188 Q225 188 255 168 L255 148 Q205 152 178 138 Q172 80 172 80 Z"
                    fill="url(#ebonyWoodGrad)"
                    stroke="#333842"
                    strokeWidth="2"
                  />
                )}

                {/* Rhodesian Double Ridge highlight */}
                {selectedShapeIndex === 2 && (
                  <path
                    d="M108 135 Q140 148 178 138"
                    stroke="#555"
                    strokeWidth="1.5"
                    fill="none"
                  />
                )}

                {/* 4. Basalt Volcanic Hearth Rim (Miệng bõ đá bọt núi lửa Bazan Đắk Nông) */}
                <ellipse cx="147" cy="70" rx="28" ry="12" fill="url(#basaltChamberGrad)" stroke="#4B5563" strokeWidth="2" />
                <ellipse cx="147" cy="70" rx="19" ry="8" fill="#0F1012" stroke="#D4AF37" strokeWidth="0.8" />

                {/* 5. Gold Damascene Inlays (Chỉ vàng 24K nạm thủ công ngàm đuôi én) */}
                {selectedPatternIndex === 0 && (
                  /* Geometric Lattice Pattern */
                  <g stroke="url(#goldInlayGrad)" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M130 115 L145 100 L160 115 L145 130 Z" fill="none" />
                    <path d="M145 100 L145 130" />
                    <path d="M130 115 L160 115" />
                    <circle cx="145" cy="115" r="2" fill="#D4AF37" />
                    <path d="M185 142 L245 142" strokeWidth="1.2" strokeDasharray="4 3" />
                  </g>
                )}
                {selectedPatternIndex === 1 && (
                  /* Imperial Cloud & Dragon Motif */
                  <g stroke="url(#goldInlayGrad)" strokeWidth="1.5" strokeLinecap="round" fill="none">
                    <path d="M125 125 Q135 105 148 120 Q160 100 168 125 Q155 140 140 135 Z" />
                    <circle cx="150" cy="116" r="1.5" fill="#D4AF37" />
                    <path d="M132 128 Q140 132 152 128" />
                    <path d="M188 143 Q215 138 245 144" strokeWidth="1.2" />
                  </g>
                )}
                {selectedPatternIndex === 2 && (
                  /* Plum Blossom 5-Petal Motif */
                  <g stroke="url(#goldInlayGrad)" strokeWidth="1.4" strokeLinecap="round">
                    <circle cx="146" cy="118" r="3.5" fill="#D4AF37" />
                    <ellipse cx="146" cy="108" rx="2.5" ry="4" fill="none" />
                    <ellipse cx="156" cy="114" rx="4" ry="2.5" fill="none" />
                    <ellipse cx="153" cy="126" rx="3" ry="3.5" fill="none" />
                    <ellipse cx="139" cy="126" rx="3" ry="3.5" fill="none" />
                    <ellipse cx="136" cy="114" rx="4" ry="2.5" fill="none" />
                    <line x1="190" y1="144" x2="242" y2="144" strokeWidth="1" strokeDasharray="3 3" />
                  </g>
                )}

                {/* Monogram Seal on Silver Ring if entered */}
                {monogramText.trim() && (
                  <text
                    x="255"
                    y="153"
                    fill="#111827"
                    fontSize="7"
                    fontWeight="bold"
                    fontFamily="serif"
                    textAnchor="middle"
                  >
                    {monogramText.trim().slice(0, 3).toUpperCase()}
                  </text>
                )}
              </svg>

              {/* Optical Magnifier Overlay */}
              <AnimatePresence>
                {isMagnifierActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="absolute inset-4 rounded-xl bg-[#0F1014]/95 border border-[#D4AF37] p-4 flex flex-col justify-between backdrop-blur-md z-30"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#D4AF37]/30">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
                        <span className="text-xs font-serif uppercase tracking-widest text-[#D4AF37]">
                          Kính Soi Phóng Đại Quang Học 360° (Độ Phân Giải 0.01mm)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsMagnifierActive(false)}
                        className="text-xs text-[#9E9B95] hover:text-white px-2 py-1 rounded bg-white/5"
                      >
                        Đóng
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-auto py-2 text-xs">
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <div className="text-[#D4AF37] font-semibold mb-1">Rãnh Ngàm Đuôi Én</div>
                        <p className="text-[#A8A49C]">
                          Đục rãnh vát chữ V ngược (Dovetail groove) sâu 0.35mm. Chỉ vàng 24K được tán búa neo chặt vĩnh cửu vào sớ gỗ Mun sừng, không cần keo hóa chất.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <div className="text-[#D4AF37] font-semibold mb-1">Lòng Bõ Bazan 600°C</div>
                        <p className="text-[#A8A49C]">
                          Đá bọt núi lửa Bazan Đắk Nông xốp vi nang xơ hóa giúp hấp thụ toàn bộ tinh dầu đắng và hắc sắc tố, giữ khói luôn ngọt thanh và thân tẩu mát lạnh.
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-black/40 border border-white/10">
                        <div className="text-[#D4AF37] font-semibold mb-1">Ring Bạc Đúc Tay 999</div>
                        <p className="text-[#A8A49C]">
                          Vòng bạc ta nguyên chất gia nhiệt chuẩn, dung sai kết nối $\pm 0.02$mm bảo đảm cán ebonite rút ra lắp vào khít khao cả trong nồm ẩm Sài Gòn 85%.
                        </p>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#7A7771] text-right italic">
                      Giám định quang học: Tiêu chuẩn độ hoàn thiện xưởng mộc Thạnh Xuân 1.200m²
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Microclimate Resilience Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-serif text-[#D4AF37]">{currentShape.bowlHeight}</div>
                <div className="text-[11px] text-[#8A8780]">Chiều Cao Bõ</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-serif text-[#D4AF37]">{currentShape.chamberDiameter}</div>
                <div className="text-[11px] text-[#8A8780]">Đường Kính Lòng</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-serif text-[#D4AF37]">600°C</div>
                <div className="text-[11px] text-[#8A8780]">Kháng Nhiệt Bazan</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-lg font-serif text-[#D4AF37]">24K</div>
                <div className="text-[11px] text-[#8A8780]">Chỉ Vàng Damascene</div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-amber-500/[0.04] border border-[#D4AF37]/20 flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center shrink-0 text-xs font-serif mt-0.5">
                i
              </div>
              <p className="text-xs text-[#B5B0A4] leading-relaxed">
                <strong className="text-[#EAE6DF]">Thích ứng vi khí hậu Sài Gòn:</strong> Mun sừng Khánh Hòa có mật độ phân tử gỗ đặc sánh như đá, ngâm ủ trong hầm sấy đối lưu 180 ngày tại xưởng Thạnh Xuân 1.200m² đạt độ ẩm danh định 8-10%, kháng triệt để hiện tượng nứt chân chim hoặc co ngót khi độ ẩm Sài Gòn dao động 75-80%.
              </p>
            </div>
          </div>

          {/* Right Column: Customization Atelier Configurator & Consultation Booking */}
          <div className="lg:col-span-5 space-y-6">
            {/* Step 1: Shape Selection */}
            <div className="bg-[#121316] rounded-2xl border border-white/10 p-6">
              <label className="text-xs uppercase tracking-wider text-[#8A8780] block mb-3">
                1. Chọn Dáng Tẩu Độc Bản
              </label>
              <div className="space-y-2.5">
                {PIPE_SHAPES.map((shape, idx) => (
                  <button
                    key={shape.id}
                    type="button"
                    onClick={() => setSelectedShapeIndex(idx)}
                    className={cn(
                      'w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1',
                      selectedShapeIndex === idx
                        ? 'bg-[#1D1E24] border-[#D4AF37] shadow-md shadow-[#D4AF37]/10'
                        : 'bg-[#16171B] border-white/5 hover:border-white/20'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-[#F5F2EB]">{shape.name}</span>
                      <span className="text-[11px] font-mono text-[#D4AF37]">{shape.englishName}</span>
                    </div>
                    <p className="text-xs text-[#9E9B95] line-clamp-2 leading-relaxed">{shape.description}</p>
                    <div className="text-[11px] text-[#A68222] mt-1 italic">
                      Ưu điểm: {shape.coolingTrait}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Damascene Gold Inlay Motif */}
            <div className="bg-[#121316] rounded-2xl border border-white/10 p-6">
              <label className="text-xs uppercase tracking-wider text-[#8A8780] block mb-3">
                2. Hoa Văn Chỉ Vàng 24K Damascene
              </label>
              <div className="space-y-2.5">
                {DAMASCENE_PATTERNS.map((pattern, idx) => (
                  <button
                    key={pattern.id}
                    type="button"
                    onClick={() => setSelectedPatternIndex(idx)}
                    className={cn(
                      'w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1',
                      selectedPatternIndex === idx
                        ? 'bg-[#1D1E24] border-[#D4AF37] shadow-md shadow-[#D4AF37]/10'
                        : 'bg-[#16171B] border-white/5 hover:border-white/20'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-[#F5F2EB]">{pattern.name}</span>
                      <span className="text-[11px] font-mono text-[#E5C158]">{pattern.goldGauge}</span>
                    </div>
                    <p className="text-xs text-[#9E9B95] leading-relaxed">{pattern.philosophy}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Silver Monogram Engraving & Bespoke Booking */}
            <div className="bg-[#121316] rounded-2xl border border-white/10 p-6">
              <label className="text-xs uppercase tracking-wider text-[#8A8780] block mb-3">
                3. Triện Khắc Cá Nhân & Đặt Lịch Tiếp Đón Xưởng Mộc
              </label>

              {submitted ? (
                <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-lg">
                    ✓
                  </div>
                  <h4 className="font-serif text-base text-[#F5F2EB]">Tiếp Nhận Đơn Chế Tác Thành Công</h4>
                  <p className="text-xs text-[#B5B0A4] leading-relaxed">
                    Nghệ nhân GuHomes tại xưởng Thạnh Xuân 1.200m² sẽ liên hệ với Quý khách qua số <strong className="text-white">{customerPhone}</strong> trong vòng 60 phút để trình mẫu phôi gỗ Mun sừng Khánh Hòa và sơ đồ chỉ vàng 24K Damascene.
                  </p>
                  <div className="text-[11px] text-[#D4AF37] font-mono pt-2">
                    Mã hồ sơ: GU-DAMASCENE-PIPE-2026-{Math.floor(1000 + Math.random() * 9000)}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="monogram-input" className="block text-xs text-[#9E9B95] mb-1">
                      Ký Tự Triện Khắc Vòng Bạc 999 (Tối đa 3 chữ cái viết tắt / Gia huy):
                    </label>
                    <input
                      id="monogram-input"
                      type="text"
                      maxLength={3}
                      value={monogramText}
                      onChange={(e) => setMonogramText(e.target.value)}
                      placeholder="VD: GHM, TTA, VNL"
                      className="w-full bg-[#181A1F] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#F5F2EB] uppercase tracking-widest placeholder:text-white/20 focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="cust-name-input" className="block text-xs text-[#9E9B95] mb-1">
                        Họ Tên Gia Chủ *
                      </label>
                      <input
                        id="cust-name-input"
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className="w-full bg-[#181A1F] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#F5F2EB] placeholder:text-white/20 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="cust-phone-input" className="block text-xs text-[#9E9B95] mb-1">
                        Số Điện Thoại / Zalo *
                      </label>
                      <input
                        id="cust-phone-input"
                        type="tel"
                        required
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="0912 345 678"
                        className="w-full bg-[#181A1F] border border-white/10 rounded-lg px-3 py-2 text-sm text-[#F5F2EB] placeholder:text-white/20 focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#AA820A] text-[#0B0C0E] font-medium text-sm tracking-wide hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2"
                  >
                    <span>Đăng Ký Chế Tác Độc Bản Ngự Dụng</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-[#7A7771] pt-1">
                    <span>Hotline: <strong className="text-[#C4C0B8]">0368 757 916</strong></span>
                    <span>Xưởng Thạnh Xuân 1.200m²</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanGoldDamasceneEbonyTobaccoPipeAtelier
