'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudSeptaseptuagesimalLeafStudio() {
  const [leafRotationAngle, setLeafRotationAngle] = useState<number>(77)
  const [jadeGlowIntensity, setJadeGlowIntensity] = useState<number>(93)
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
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz (Transformation & Heart Intuition)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      oscBaseRef.current = osc1

      // Octave Harmonic 1056Hz (Crown Transcendence & Clarity)
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
      label: 'Cánh Sen Phỉ Thúy',
      value: '77 Cánh Sen',
      subtext: 'Thất Tinh Bắc Đẩu',
      detail: 'Mỗi phiến cánh ngọc Phỉ Thúy Type A mài vát tay 0.2mm, xếp tầng tựa hoa sen hé nở đón ánh sao Bắc Đẩu.',
    },
    {
      label: 'Vàng Ròng 24K',
      value: 'Viền Nẹp Filigree',
      subtext: 'Độ tinh khiết 99.99%',
      detail: 'Đường chỉ vàng 0.08mm bo viền từng cánh ngọc, định hình kết cấu nâng đỡ 3 ngọn bút lông thư pháp thượng hạng.',
    },
    {
      label: 'Bệ Hoàng Đàn Tuyết',
      value: '400 Năm Lạng Sơn',
      subtext: 'Lên tuyết mịn như nhung',
      detail: 'Chất gỗ hoàng đàn tuyết cổ thụ thớ đanh mịn, tỏa hương thơm thanh tịnh tự nhiên làm dịu trường khí phòng trà và thư phòng.',
    },
    {
      label: 'Góc Nghiêng Kê Bút',
      value: `${leafRotationAngle}°`,
      subtext: 'Tỉ lệ vàng công thái học',
      detail: 'Độ dốc nâng niu đầu lông bút, bảo tồn mực xạ hương và duy trì phom dáng bút ngự qua nhiều thế hệ.',
    },
  ]

  const atelierAspects = [
    {
      aspect: 'Kỹ Nghệ Gắn Ngọc Phỉ Thúy Type A',
      headline: '77 Phiến Ngọc Cắt Mài Vát Đơn Độc Bản',
      body: 'Ngọc cẩm thạch Myanmar loại A hoàn toàn tự nhiên, độ trong bán minh thủy tinh quang, sắc lục bảo chuyển tiếp mượt mà từ cuống đến đầu cánh sen.',
    },
    {
      aspect: 'Nghệ Thuật Kéo Chỉ Vàng Filigree',
      headline: 'Rắp Mộng Kim Hoàn Không Mối Hàn Thô',
      body: 'Mỗi đường viền vàng được đính kết bằng ngàm ren vi mô của nghệ nhân kim hoàn di sản Thạnh Xuân, đảm bảo độ bóng vĩnh cửu.',
    },
    {
      aspect: 'Bệ Đỡ Hoàng Đàn Tuyết 400 Năm',
      headline: 'Chân Đế Điêu Khắc Mộng Kép Thất Tinh',
      body: 'Họa tiết Thất Tinh Bắc Đẩu chạm nổi tinh xảo trên khối hoàng đàn tuyết 400 năm tuổi, tượng trưng cho trí tuệ sáng tỏ và phúc lộc dồi dào.',
    },
  ]

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#090d0b] text-[#f4efe6] overflow-hidden border-t border-b border-[#1b261f]">
      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#2d6a4f] rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#b38a38] rounded-full blur-[150px]" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#122319] border border-[#2d6a4f] text-[#74c69d] text-xs font-mono uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#74c69d] animate-pulse" />
            Nghệ Thuật Thư Phòng Trà Đạo · Master Studio 77 Diệp
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-light text-[#f4efe6] tracking-tight leading-tight">
            Kê Ngự Bút Sen Thất Thập Thất Diệp &amp; Bệ Hoàng Đàn Tuyết 400 Năm
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#9fb1a4] font-light leading-relaxed">
            Tuyệt phẩm kê bút thư pháp 77 cánh sen Phỉ Thúy Type A nẹp vàng 24K Filigree. Biểu tượng Thất Tinh Bắc Đẩu trên bệ gỗ Hoàng Đàn Tuyết 400 năm cho thư phòng tư gia tĩnh tại.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-5 rounded-2xl bg-[#0f1712] border border-[#1b2b20] hover:border-[#2d6a4f] transition-colors"
            >
              <div className="text-xs text-[#8ca393] uppercase font-mono tracking-wider">{m.label}</div>
              <div className="mt-2 text-2xl sm:text-3xl font-serif text-[#d8b04a] font-normal">{m.value}</div>
              <div className="mt-1 text-xs text-[#74c69d] font-medium">{m.subtext}</div>
              <p className="mt-2 text-[11px] text-[#6b8272] font-light leading-normal">{m.detail}</p>
            </motion.div>
          ))}
        </div>

        {/* Interactive Master Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Main Visual & Interactive Canvas */}
          <div className="lg:col-span-7 bg-[#0d1410] rounded-2xl border border-[#1a2b20] p-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#16251b] mb-6">
              <div>
                <span className="text-xs font-mono text-[#74c69d] uppercase tracking-wider">Mô Phỏng Độ Mở Cánh Sen Phỉ Thúy</span>
                <h3 className="text-lg font-serif text-[#f2ece1] mt-0.5">77 Cánh Sen Thất Tinh Bắc Đẩu</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setJadeGlowIntensity(jadeGlowIntensity === 93 ? 50 : 93)}
                  className={`min-h-[44px] min-w-[44px] px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                    jadeGlowIntensity > 70
                      ? 'bg-[#183124] border-[#2d6a4f] text-[#74c69d]'
                      : 'bg-[#101913] border-[#203326] text-[#7a8f80]'
                  }`}
                >
                  {jadeGlowIntensity > 70 ? 'Phỉ Thúy: Phát Quang' : 'Phỉ Thúy: Tĩnh Giác'}
                </button>
                <button
                  type="button"
                  onClick={toggleHarmonics}
                  className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                    harmonicResonanceActive
                      ? 'bg-[#2b2513] border-[#d8b04a] text-[#fde047] shadow-[0_0_12px_rgba(216,176,74,0.25)]'
                      : 'bg-[#101913] border-[#203326] text-[#7a8f80]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${harmonicResonanceActive ? 'bg-[#d8b04a] animate-ping' : 'bg-[#555]'}`} />
                  {harmonicResonanceActive ? '528Hz + 1056Hz: Bật' : 'Sóng Não: Tắt'}
                </button>
              </div>
            </div>

            {/* SVG Visual Representation of the Brush Rest */}
            <div className="relative w-full aspect-[16/10] bg-[#070b08] rounded-xl overflow-hidden flex items-center justify-center border border-[#132017]">
              <svg viewBox="0 0 600 380" className="w-full h-full">
                <defs>
                  <radialGradient id="jadeHaloV77" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#74c69d" stopOpacity={jadeGlowIntensity / 100} />
                    <stop offset="60%" stopColor="#2d6a4f" stopOpacity={(jadeGlowIntensity / 100) * 0.4} />
                    <stop offset="100%" stopColor="#070b08" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="goldRimV77" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fff4b8" />
                    <stop offset="50%" stopColor="#d8b04a" />
                    <stop offset="100%" stopColor="#96721d" />
                  </linearGradient>
                  <linearGradient id="hoangDanWoodV77" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8c6239" />
                    <stop offset="50%" stopColor="#5e4022" />
                    <stop offset="100%" stopColor="#382512" />
                  </linearGradient>
                </defs>

                {/* Hoàng Đàn Tuyết Wooden Base */}
                <rect x="120" y="290" width="360" height="35" rx="6" fill="url(#hoangDanWoodV77)" stroke="#b8860b" strokeWidth="1.5" />
                <rect x="150" y="325" width="300" height="15" rx="3" fill="#382512" stroke="#6b4423" strokeWidth="1" />

                {/* Jade Halo Backdrop */}
                <ellipse cx="300" cy="210" rx="140" ry="90" fill="url(#jadeHaloV77)" />

                {/* 3 Lotus Petal Rests for 3 Calligraphy Brushes */}
                {/* Left Rest */}
                <g transform="translate(190, 210) rotate(-15)">
                  <path d="M 0 40 C -25 10, -20 -30, 0 -50 C 20 -30, 25 10, 0 40 Z" fill="#40916c" stroke="url(#goldRimV77)" strokeWidth="2" />
                  <path d="M 0 35 C -15 10, -10 -20, 0 -35 C 10 -20, 15 10, 0 35 Z" fill="#52b788" opacity="0.85" />
                </g>

                {/* Center Rest (Taller) */}
                <g transform="translate(300, 195)">
                  <path d="M 0 50 C -30 15, -25 -40, 0 -65 C 25 -40, 30 15, 0 50 Z" fill="#2d6a4f" stroke="url(#goldRimV77)" strokeWidth="2.5" />
                  <path d="M 0 45 C -20 15, -15 -30, 0 -50 C 15 -30, 20 15, 0 45 Z" fill="#74c69d" opacity="0.9" />
                </g>

                {/* Right Rest */}
                <g transform="translate(410, 210) rotate(15)">
                  <path d="M 0 40 C -25 10, -20 -30, 0 -50 C 20 -30, 25 10, 0 40 Z" fill="#40916c" stroke="url(#goldRimV77)" strokeWidth="2" />
                  <path d="M 0 35 C -15 10, -10 -20, 0 -35 C 10 -20, 15 10, 0 35 Z" fill="#52b788" opacity="0.85" />
                </g>

                {/* Representing the Calligraphy Brush Rested on top */}
                <g transform={`rotate(${(leafRotationAngle - 77) * 0.4}, 300, 150)`}>
                  {/* Brush Handle - Bamboo / Rosewood */}
                  <rect x="130" y="145" width="340" height="10" rx="3" fill="#3d2b1f" stroke="#d8b04a" strokeWidth="1" />
                  {/* Brush Tip - Fine Weasel Hair */}
                  <path d="M 470 145 C 500 148, 520 150, 530 150 C 520 150, 500 152, 470 155 Z" fill="#fdfbf7" stroke="#e0d8cc" strokeWidth="0.5" />
                </g>

                {/* 77 Petals Foliage Radiance Lines */}
                <circle cx="300" cy="270" r="85" fill="none" stroke="#d8b04a" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.6" />
                <circle cx="300" cy="270" r="110" fill="none" stroke="#74c69d" strokeWidth="0.5" strokeDasharray="2 5" opacity="0.4" />
              </svg>

              {/* Status Badge in corner */}
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-md bg-[#070b08]/85 border border-[#16251b] backdrop-blur-md text-[11px] text-[#bdd3c4] font-mono">
                Thất Thập Thất Diệp · Góc Kê Bút: <span className="text-[#d8b04a] font-bold">{leafRotationAngle}°</span> · Âm Hưởng: <span className="text-[#74c69d] font-bold">528Hz + 1056Hz</span>
              </div>
            </div>

            {/* Slider Control for Leaf Rotation Angle */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between items-center text-xs text-[#9fb1a4]">
                <span>Góc nghiêng cánh sen kê ngự bút:</span>
                <span className="font-mono text-[#d8b04a] font-semibold">{leafRotationAngle}° / 90°</span>
              </div>
              <input
                type="range"
                min="45"
                max="90"
                value={leafRotationAngle}
                onChange={(e) => setLeafRotationAngle(Number(e.target.value))}
                aria-label="Điều chỉnh góc nghiêng cánh sen kê bút"
                className="w-full h-2 bg-[#121c16] rounded-lg appearance-none cursor-pointer accent-[#74c69d]"
              />
              <div className="flex justify-between text-[11px] text-[#55695c] font-mono">
                <span>45° Bút Thảo Thư</span>
                <span>65° Bút Khải Thư</span>
                <span>77° Chuẩn Thất Tinh</span>
                <span>90° Dựng Đứng Tĩnh Tâm</span>
              </div>
            </div>
          </div>

          {/* Facets Exploration Column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="text-lg font-serif text-[#e8e2d5] mb-1">
              Ba Chi Tiết Độc Bản Kê Ngự Bút 77 Diệp
            </h3>

            {atelierAspects.map((aspect, aIdx) => (
              <div
                key={aIdx}
                onClick={() => setSelectedAtelierAspect(aIdx)}
                className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
                  selectedAtelierAspect === aIdx
                    ? 'bg-[#111f17] border-[#74c69d] shadow-[0_0_15px_rgba(116,198,157,0.15)]'
                    : 'bg-[#0d1410] border-[#18281d] hover:border-[#284432]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-[#74c69d] uppercase tracking-wider">{aspect.aspect}</span>
                  <span className="text-[11px] text-[#6b8272] font-mono">0{aIdx + 1}</span>
                </div>
                <h4 className="text-sm font-medium text-[#e2ded4] mb-1">{aspect.headline}</h4>
                <p className="text-xs text-[#8ca393] font-light leading-relaxed">{aspect.body}</p>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#0f1913] border border-[#203a27] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#74c69d]">Độc Bản Thư Phòng GuHomes</div>
                <div className="text-[11px] text-[#8fa796] mt-0.5">Xưởng Thạnh Xuân 1.200m² may đo độc bản · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#183122] hover:bg-[#234731] text-[#b7e4c7] text-xs font-medium border border-[#376b4a] transition-colors flex items-center justify-center shrink-0"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudSeptaseptuagesimalLeafStudio
