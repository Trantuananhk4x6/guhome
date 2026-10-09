'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudOctaquadragesimalLeafStudio() {
  const [selectedPetal, setSelectedPetal] = useState<number>(48) // 48 leaves/petals - Tứ Thời Bát Tiết Hoàn Hảo
  const [isAcousticHarmonics, setIsAcousticHarmonics] = useState(false)
  const [jadeTranslucency, setJadeTranslucency] = useState(99.99)
  const [brushPlaced, setBrushPlaced] = useState(true)

  // Web Audio Context & Nodes refs for thorough cleanup
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc1056Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (osc528Ref.current) {
        try {
          osc528Ref.current.stop()
          osc528Ref.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (osc1056Ref.current) {
        try {
          osc1056Ref.current.stop()
          osc1056Ref.current.disconnect()
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

  const toggleAcousticHarmonics = () => {
    if (!isAcousticHarmonics) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime) // Solfeggio 528Hz

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime) // Bát độ 1056Hz

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc1056Ref.current = osc2
        gainRef.current = gain
        setIsAcousticHarmonics(true)
      } catch {
        setIsAcousticHarmonics(false)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc1056Ref.current?.stop()
            osc1056Ref.current?.disconnect()
            setIsAcousticHarmonics(false)
          }, 650)
        } catch {
          setIsAcousticHarmonics(false)
        }
      } else {
        setIsAcousticHarmonics(false)
      }
    }
  }

  return (
    <section className="relative my-16 overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-[#0C0E0B] p-6 text-[#E8E6DF] shadow-2xl backdrop-blur-md sm:p-10">
      <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#10B981]/8 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      {/* Header Badge */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#D4AF37]/20 pb-6">
        <div>
          <span className="inline-block rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
            Tuyệt Tác Thư Phòng Bút Giá V48
          </span>
          <h3 className="mt-2 text-xl font-semibold tracking-wide text-[#F5F2EA] sm:text-2xl">
            Kê Ngự Bút Sen Tứ Thập Bát Diệp (48 Cánh - Tứ Thời Bát Tiết Hoàn Hảo) Phỉ Thúy Type A
          </h3>
          <p className="mt-1 text-xs text-[#A39B8B] sm:text-sm">
            Ngọc Phỉ Thúy Type A Myanmar thấu quang 99.99%, nẹp Vàng 24K Filigree 0.10mm thủ công trên bệ đỡ Gỗ Sưa Đỏ Bắc Bộ Cổ Thụ 400 năm.
          </p>
        </div>

        {/* Audio Toggle Button */}
        <button
          type="button"
          onClick={toggleAcousticHarmonics}
          className={`min-h-[44px] min-w-[44px] flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
            isAcousticHarmonics
              ? 'border-[#D4AF37] bg-[#D4AF37]/25 text-[#F5F2EA] shadow-[0_0_15px_rgba(212,175,55,0.35)]'
              : 'border-[#262C22] bg-[#141812] text-[#A39B8B] hover:border-[#D4AF37]/50 hover:text-[#E8E6DF]'
          }`}
          aria-label="Kích hoạt hòa âm bát độ thiền định 528Hz và 1056Hz"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
          <span>{isAcousticHarmonics ? 'Bát Độ 528Hz + 1056Hz: Đang Mở' : 'Mở Hòa Âm Thư Phòng (528Hz + 1056Hz)'}</span>
        </button>
      </div>

      {/* Main Interactive Grid */}
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Visualization Panel (7 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#262C22] bg-[#121611] p-6 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between text-xs text-[#A39B8B]">
              <span>MÔ HÌNH BÚP SEN TỨ THẬP BÁT DIỆP (48 CÁNH)</span>
              <span className="font-mono text-[#D4AF37]">Thấu Quang: {jadeTranslucency}%</span>
            </div>

            {/* Visual Display Canvas */}
            <div className="relative my-6 flex h-64 items-center justify-center overflow-hidden rounded-xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#182017] to-[#0A0D09]">
              {/* Jade Glowing Halo */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <div className="h-48 w-48 rounded-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#10B981]/30 via-[#D4AF37]/20 to-transparent blur-md" />
              </div>

              {/* Interactive SVG Brush Rest */}
              <svg className="h-44 w-44 text-[#D4AF37]" viewBox="0 0 200 200" fill="none">
                {/* Ancient Red Sandalwood Base */}
                <rect x="25" y="160" width="150" height="18" rx="4" fill="#6A1A18" stroke="#D4AF37" strokeWidth="1.2" />
                <rect x="40" y="178" width="120" height="8" rx="2" fill="#4A100E" />

                {/* 48-Petal Jade Lotus Bud Structure */}
                <g style={{ opacity: jadeTranslucency / 100 }}>
                  {/* Outer Petals */}
                  <path d="M50 160 C50 120, 75 110, 100 80 C125 110, 150 120, 150 160 Z" fill="#059669" stroke="#F5D061" strokeWidth="1.5" />
                  {/* Mid Petals Layer */}
                  <path d="M65 160 C65 125, 85 115, 100 95 C115 115, 135 125, 135 160 Z" fill="#10B981" stroke="#D4AF37" strokeWidth="1.2" />
                  {/* Inner Heart Petals */}
                  <path d="M80 160 C80 135, 92 125, 100 110 C108 125, 120 135, 120 160 Z" fill="#34D399" stroke="#FFF8DC" strokeWidth="1" />
                </g>

                {/* Gold Filigree Wire Veins */}
                <path d="M100 80 L100 160" stroke="#F5D061" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M75 120 Q100 135 125 120" stroke="#F5D061" strokeWidth="1.2" fill="none" />
                <path d="M60 140 Q100 150 140 140" stroke="#F5D061" strokeWidth="1.2" fill="none" />

                {/* Imperial Calligraphy Brush Rest Silhouette */}
                {brushPlaced && (
                  <g style={{ transform: 'rotate(-15deg)', transformOrigin: '100px 90px' }}>
                    {/* Brush Shaft */}
                    <rect x="30" y="86" width="140" height="8" rx="3" fill="#3E2723" stroke="#D4AF37" strokeWidth="1" />
                    {/* Brush Tip */}
                    <path d="M170 86 Q195 90 170 94 Z" fill="#ECEFF1" stroke="#B0BEC5" strokeWidth="0.8" />
                  </g>
                )}
              </svg>

              {/* Status Overlay */}
              <div className="absolute bottom-3 left-3 rounded-lg border border-[#262C22] bg-[#0C0E0B]/85 px-2.5 py-1 text-[11px] font-mono text-[#D4AF37]">
                Góc Nghiêng: 15° | Cánh Sen: 48 Cánh Tứ Thời Bát Tiết | Ngự Bút: {brushPlaced ? 'Đang Đặt' : 'Đang Nhấc'}
              </div>
            </div>
          </div>

          {/* Telemetry Stats */}
          <div className="grid grid-cols-3 gap-3 border-t border-[#262C22] pt-4 text-center">
            <div className="rounded-xl border border-[#262C22] bg-[#161D15] p-2.5">
              <span className="block text-[10px] text-[#A39B8B]">SỐ LƯỢNG CÁNH SEN</span>
              <span className="text-sm font-semibold text-[#D4AF37] sm:text-base">48 Diệp Hoàn Hảo</span>
            </div>
            <div className="rounded-xl border border-[#262C22] bg-[#161D15] p-2.5">
              <span className="block text-[10px] text-[#A39B8B]">CHỈ VÀNG FILIGREE</span>
              <span className="text-sm font-semibold text-[#F59E0B] sm:text-base">0.10mm Đan Tay</span>
            </div>
            <div className="rounded-xl border border-[#262C22] bg-[#161D15] p-2.5">
              <span className="block text-[10px] text-[#A39B8B]">GỖ BỆ ĐỠ</span>
              <span className="text-sm font-semibold text-[#38BDF8] sm:text-base">Sưa Đỏ 400 Năm</span>
            </div>
          </div>
        </div>

        {/* Right Controls Panel (5 cols) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#262C22] bg-[#121611] p-6 lg:col-span-5">
          <div className="space-y-6">
            {/* Petal Count Selector */}
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-[#A39B8B]">
                Số Cánh Sen Khắc Ngọc Phỉ Thúy
              </label>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {[44, 46, 48].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setSelectedPetal(count)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                      selectedPetal === count
                        ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#F5F2EA]'
                        : 'border-[#262C22] bg-[#161D15] text-[#A39B8B] hover:border-[#D4AF37]/40 hover:text-[#E8E6DF]'
                    }`}
                  >
                    {count} Cánh Sen
                  </button>
                ))}
              </div>
            </div>

            {/* Translucency Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#A39B8B]">
                <span>ĐỘ THẤU QUANG NGỌC PHỈ THÚY TYPE A</span>
                <span className="font-mono text-[#D4AF37]">{jadeTranslucency}%</span>
              </div>
              <input
                type="range"
                min="85"
                max="99.99"
                step="0.01"
                value={jadeTranslucency}
                onChange={(e) => setJadeTranslucency(Number(e.target.value))}
                className="mt-2.5 w-full accent-[#10B981] cursor-pointer"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#6B7280]">
                <span>85% (Mờ Đục)</span>
                <span>95% (Trong Mờ)</span>
                <span>99.99% (Thấu Quang Tuyệt Đối)</span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 space-y-3 pt-4 border-t border-[#262C22]">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setBrushPlaced(!brushPlaced)}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  brushPlaced
                    ? 'border-[#10B981] bg-[#10B981]/15 text-[#10B981]'
                    : 'border-[#262C22] bg-[#141812] text-[#A39B8B] hover:border-[#10B981]/40'
                }`}
              >
                {brushPlaced ? 'Ngự Bút: Đang Kê Trên Giá' : 'Ngự Bút: Đã Nhấc Khỏi Giá'}
              </button>
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#A39B8B]">
              <span>Tư vấn KTS Trưởng:</span>
              <a href="tel:0368757916" className="text-[#D4AF37] hover:underline font-mono font-medium">
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudOctaquadragesimalLeafStudio
