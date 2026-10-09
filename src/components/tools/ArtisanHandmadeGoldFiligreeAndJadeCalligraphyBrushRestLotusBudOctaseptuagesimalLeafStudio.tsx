'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudOctaseptuagesimalLeafStudio() {
  const [leafRotationAngle, setLeafRotationAngle] = useState<number>(78)
  const [jadeGlowIntensity, setJadeGlowIntensity] = useState<number>(94)
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
      label: '78 Cánh Sen Phỉ Thúy',
      value: 'Bát Tiên Quá Hải',
      subtext: 'Ngọc Type A thượng phẩm',
      detail: 'Mỗi cánh sen được điêu khắc vi hình từ khối ngọc Jadeite tự nhiên không qua xử lý hóa chất, bóng mượt tựa nước hồ thu.',
    },
    {
      label: 'Gỗ Mun Sừng Khánh Hòa',
      value: '400 Năm',
      subtext: 'Đen tuyền nguyên khối như gương',
      detail: 'Phôi Mun Sừng lõi đặc 400 năm, qua 18 bước mài bóng bằng bột đá quý và sáp ong tự nhiên, đạt độ cứng tương đương ngọc cẩm thạch.',
    },
    {
      label: 'Nẹp Vàng 24K Đậu Chỉ',
      value: '0.12 mm',
      subtext: 'Kỹ thuật kim hoàn cung đình Huế',
      detail: 'Đường viền cánh hoa ôm trọn ngọc lý bằng chỉ vàng ròng 99.99%, tạo điểm tựa êm ái bảo vệ ngòi ngự bút lông sói và quản trúc.',
    },
    {
      label: 'Quang Thông Thấu Ngọc',
      value: `${jadeGlowIntensity}%`,
      subtext: 'Hiệu ứng huỳnh quang ngọc tự nhiên',
      detail: 'Khi ánh sáng tự nhiên rọi qua khe cửa gỗ, thân ngọc phát tán hào quang xanh biếc dịu mắt, xua tan căng thẳng thị giác.',
    },
  ]

  const atelierAspects = [
    {
      title: 'Thất Thập Bát Diệp - Bát Tiên Quá Hải',
      tag: 'KỸ NGHỆ VI ĐIÊU',
      desc: '78 cánh sen uốn lượn đa tầng mô phỏng dáng sen nghìn cánh nở rộ giữa bùn lầy tinh khiết, tượng trưng cho trí tuệ minh triết và thành tựu viên mãn.',
    },
    {
      title: 'Bệ Mun Sừng Khánh Hòa Kháng Nứt',
      tag: 'GỖ QUÝ 400 NĂM',
      desc: 'Lõi mun sừng hóa thạch không mối mọt, khả năng hấp thụ mực nghiên thừa cực êm và tạo thế đứng vững chãi tựa thái sơn trên bàn làm việc.',
    },
    {
      title: 'Vi Âm Thanh Tịnh 528Hz & 1056Hz',
      tag: 'CỘNG HƯỞNG TÂM TRÍ',
      desc: 'Tần số Solfeggio kép tạo sóng não Alpha dịu nhẹ, kích thích tư duy sáng tạo chiến lược và định tâm khi hạ bút ký kết văn kiện quan trọng.',
    },
  ]

  return (
    <section className="relative my-14 overflow-hidden rounded-3xl border border-[#27382d] bg-[#0c1611] p-6 text-[#d8e8dd] shadow-2xl md:p-10">
      {/* Background ambient gradient */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#1b4332]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#2d6a4f]/20 blur-3xl" />

      {/* Header section */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#1b2b21] pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3b634c] bg-[#14261b] px-3.5 py-1 text-xs font-medium text-[#7ad4a2]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#52b788] animate-pulse" />
            Vật Phẩm Văn Phòng Độc Bản · Kê Ngự Bút Sen 78 Diệp
          </div>
          <h2 className="mt-3 text-2xl font-serif tracking-tight text-[#f0f8f3] sm:text-3xl">
            Kê Ngự Bút Sen Thất Thập Bát Diệp Phỉ Thúy & Bệ Mun Sừng 400 Năm
          </h2>
          <p className="mt-2 text-sm text-[#92a89a] max-w-2xl font-light">
            Chế tác độc bản tại xưởng Thạnh Xuân 1.200m²: 78 cánh ngọc Phỉ Thúy Type A bọc chỉ Vàng 24K ngự trên Mun Sừng Khánh Hòa, tích hợp vi âm minh triết 528Hz & 1056Hz.
          </p>
        </div>

        {/* Audio control button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleHarmonics}
            aria-label="Kích hoạt âm thanh vi tần số cộng hưởng trí tuệ 528Hz & 1056Hz"
            className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl font-medium text-xs border transition-all flex items-center gap-2 ${
              harmonicResonanceActive
                ? 'border-[#52b788] bg-[#1a3828] text-[#bbf7d0] shadow-lg shadow-[#1b4332]/50'
                : 'border-[#2d4738] bg-[#132219] text-[#86a090] hover:text-[#d8e8dd]'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>{harmonicResonanceActive ? 'Vi Âm Sáng Suốt: 528Hz & 1056Hz' : 'Bật Vi Âm Thư Thái 528Hz'}</span>
          </button>
        </div>
      </div>

      {/* 4 Core Metrics */}
      <div className="relative z-10 grid grid-cols-2 gap-4 my-8 lg:grid-cols-4">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-[#203628] bg-[#101e16]/80 p-4 backdrop-blur transition-colors hover:border-[#375a43]"
          >
            <div className="text-xs font-medium text-[#7ad4a2]">{m.label}</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight text-[#f0f8f3]">{m.value}</div>
            <div className="text-[11px] text-[#86a090] mt-0.5">{m.subtext}</div>
            <div className="mt-2 text-xs text-[#a9c2b3] font-light leading-relaxed border-t border-[#1b2b20] pt-2">{m.detail}</div>
          </div>
        ))}
      </div>

      {/* Interactive Controls & Spatial Simulation Canvas */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d1712] p-6 rounded-2xl border border-[#1f3326]">
        {/* Left: Interactive Graphic Canvas */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-[#08100c] rounded-xl border border-[#182a1f] relative min-h-[300px] overflow-hidden">
          {/* Subtle Jade Aura Halo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
            <motion.div
              className="absolute w-64 h-64 rounded-full border border-[#52b788]/40"
              style={{ filter: `blur(${100 - jadeGlowIntensity}px)` }}
              animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Calligraphy Brush Rest SVG Iconography */}
          <div className="relative z-10 flex flex-col items-center">
            <svg className="w-64 h-64" viewBox="0 0 200 200" fill="none">
              {/* Mun Ebony Base Stand */}
              <rect x="35" y="152" width="130" height="22" rx="4" fill="#0f1411" stroke="#334d3b" strokeWidth="2" />
              <path d="M45 174 L38 186 L56 186 Z" fill="#060907" />
              <path d="M155 174 L162 186 L144 186 Z" fill="#060907" />
              <rect x="50" y="142" width="100" height="10" rx="2" fill="#1b2820" stroke="#486d54" strokeWidth="1.5" />

              {/* 3 Jade Lotus Crescent Ridges (Cradling the Calligraphy Brushes) */}
              {/* Left Crescent */}
              <path d="M60 142 C55 105, 75 105, 80 142 Z" fill="#1d4d35" stroke="#7ad4a2" strokeWidth="2" />
              {/* Center Main Lotus Flower Bud with 78 Leaves */}
              <g transform={`rotate(${leafRotationAngle - 78} 100 120)`}>
                <path d="M85 142 C70 95, 130 95, 115 142 Z" fill="#246343" stroke="#a7f3d0" strokeWidth="2.5" />
                <path d="M92 142 Q100 100 108 142" stroke="#e6c66e" strokeWidth="1.5" strokeDasharray="3 2" />
                {/* Gold Filigree Veins */}
                <line x1="100" y1="142" x2="100" y2="105" stroke="#f3d078" strokeWidth="2" />
                <circle cx="100" cy="102" r="4" fill="#ffd166" />
              </g>
              {/* Right Crescent */}
              <path d="M120 142 C125 105, 145 105, 140 142 Z" fill="#1d4d35" stroke="#7ad4a2" strokeWidth="2" />

              {/* Suspended Calligraphy Brush Simulation */}
              <line x1="30" y1="98" x2="170" y2="98" stroke="#8b5e3c" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1" opacity="0.6" />
              <path d="M170 98 L185 98 L182 101 L170 98 Z" fill="#2d2d2d" opacity="0.6" />

              {/* Center Glow Text */}
              <text x="100" y="166" textAnchor="middle" fill="#7ad4a2" fontSize="7" fontWeight="bold">
                MUN SỪNG KHÁNH HÒA 400N
              </text>
            </svg>

            <div className="mt-4 text-center">
              <span className="text-xs uppercase tracking-wider text-[#7ad4a2] font-semibold">
                Góc Mở Cánh Sen: {leafRotationAngle}° · Độ Quang Thấu: {jadeGlowIntensity}%
              </span>
              <p className="text-[11px] text-[#86a090] mt-0.5">
                Bảo vệ ngòi bút ngự tỷ mỷ, nâng đỡ cảm xúc sáng tác an nhiên
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Controls & Tabs */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#a9c2b3] font-medium">Góc Nghiêng Cánh Hoa Sen Phỉ Thúy:</span>
              <span className="text-[#52b788] font-bold">{leafRotationAngle}° / 120°</span>
            </div>
            <input
              type="range"
              min="60"
              max="120"
              step="1"
              value={leafRotationAngle}
              onChange={(e) => setLeafRotationAngle(Number(e.target.value))}
              className="w-full accent-[#52b788] cursor-pointer bg-[#172b1f] h-2 rounded-lg"
              aria-label="Điều chỉnh góc nghiêng cánh hoa sen phỉ thúy"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#a9c2b3] font-medium">Quang Thông Thấu Ngọc Lý:</span>
              <span className="text-[#7ad4a2] font-bold">{jadeGlowIntensity}%</span>
            </div>
            <input
              type="range"
              min="80"
              max="100"
              step="1"
              value={jadeGlowIntensity}
              onChange={(e) => setJadeGlowIntensity(Number(e.target.value))}
              className="w-full accent-[#7ad4a2] cursor-pointer bg-[#172b1f] h-2 rounded-lg"
              aria-label="Điều chỉnh độ quang thông thấu ngọc lý Phỉ Thúy"
            />
          </div>

          {/* Atelier Aspects */}
          <div className="space-y-2">
            <span className="text-xs text-[#a9c2b3] font-medium">Chi Tiết Kỹ Nghệ Độc Quyền GuHomes:</span>
            {atelierAspects.map((aspect, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedAtelierAspect(idx)}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  selectedAtelierAspect === idx
                    ? 'border-[#52b788] bg-[#162a1e]'
                    : 'border-[#1e3426] bg-[#0e1913] hover:border-[#31533e]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#f0f8f3]">{aspect.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e3828] text-[#7ad4a2] font-mono">
                    {aspect.tag}
                  </span>
                </div>
                <p className="text-xs text-[#86a090] font-light leading-relaxed">{aspect.desc}</p>
              </div>
            ))}

            {/* Quick GuHomes Promise Callout */}
            <div className="mt-2 p-4 rounded-xl bg-[#111e17] border border-[#203a2a] flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-[#52b788]">Cam Kết Vận Hành GuHomes</div>
                <div className="text-[11px] text-[#86a090] mt-0.5">Xưởng Thạnh Xuân 1.200m² may đo độc bản · Giới hạn 12 công trình/năm</div>
              </div>
              <a
                href="tel:0368757916"
                aria-label="Gọi KTS Trưởng GuHomes"
                className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#1c3827] hover:bg-[#2b543c] text-[#bbf7d0] text-xs font-medium border border-[#3b7352] transition-colors flex items-center justify-center shrink-0"
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

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudOctaseptuagesimalLeafStudio
