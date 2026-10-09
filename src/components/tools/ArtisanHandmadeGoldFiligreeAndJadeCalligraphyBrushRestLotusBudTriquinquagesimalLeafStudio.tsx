'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTriquinquagesimalLeafStudio() {
  const [selectedPetal, setSelectedPetal] = useState<number>(53) // 53 leaves/petals - Ngũ Thập Tam Diệp (Tam Tài Tương Hợp)
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
    <section className="relative my-12 overflow-hidden rounded-3xl border border-[#D4AF37]/35 bg-gradient-to-b from-[#0F1712] via-[#09120D] to-[#040A07] p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
      {/* Decorative Gold Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#D4AF37]/25 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 text-xs font-medium text-[#A7F3D0] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>Chế Tác Ngự Bút Phòng · Bút Giá Ngũ Thập Tam Diệp</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#F8FAF9] tracking-wide">
            Kê Ngự Bút Sen Ngũ Thập Tam Diệp Phỉ Thúy & Bệ Hoàng Đàn Tuyết 400 Năm
          </h3>
          <p className="text-xs sm:text-sm text-[#A0AFA6] mt-1 max-w-2xl">
            Tạo tác búp sen 53 cánh (Ngũ Thập Tam Diệp - Tam Tài Tương Hợp, Ngũ Phúc Lâm Môn) từ Phỉ Thúy Type A Myanmar tự nhiên thấu quang 99.99%, nẹp Vàng 24K Filigree sợi 0.10mm trên bệ gỗ Hoàng Đàn Tuyết Lạng Sơn Cổ Thụ 400 năm.
          </p>
        </div>

        {/* Jade Translucency & Petals Badge */}
        <div className="flex items-center space-x-3 bg-[#132319]/80 px-4 py-3 rounded-2xl border border-[#10B981]/25">
          <div className="text-right">
            <div className="text-[10px] text-[#A0AFA6] uppercase tracking-wider font-mono">Độ Thấu Quang Ngọc</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#34D399]">{jadeTranslucency}%</div>
          </div>
          <div className="h-8 w-px bg-[#10B981]/25" />
          <div className="text-left">
            <div className="text-[10px] text-[#A0AFA6] uppercase tracking-wider font-mono">Số Cánh Sen Khắc Thủ Công</div>
            <div className="text-base sm:text-lg font-mono font-bold text-[#FCD34D]">{selectedPetal} Cánh</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-center">
        {/* Visual Presentation / Interactive Stage */}
        <div className="lg:col-span-7 relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#15251B]/60 to-[#050E09]/90 border border-[#10B981]/20 overflow-hidden min-h-[360px]">
          {/* Subtle Jade Glow Aura */}
          <div className="absolute inset-0 pointer-events-none bg-radial from-[#10B981]/15 via-transparent to-transparent z-0" />

          {/* Jade Brush Rest SVG */}
          <div className="relative z-10 w-full max-w-[400px] aspect-[4/3] flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-2xl">
              <defs>
                <linearGradient id="jadeGrad53" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#059669" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#064E3B" stopOpacity="0.98" />
                </linearGradient>
                <linearGradient id="goldWire53" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="50%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#D97706" />
                </linearGradient>
                <linearGradient id="hoangDanBase53" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2E2012" />
                  <stop offset="50%" stopColor="#4A341E" />
                  <stop offset="100%" stopColor="#1E140B" />
                </linearGradient>
              </defs>

              {/* Pedestal Base: Gỗ Hoàng Đàn Tuyết Lạng Sơn Cổ Thụ 400 năm */}
              <polygon points="50,240 350,240 370,270 30,270" fill="url(#hoangDanBase53)" stroke="url(#goldWire53)" strokeWidth="1.2" />
              <line x1="60" y1="255" x2="340" y2="255" stroke="url(#goldWire53)" strokeWidth="0.8" strokeDasharray="4 2" />

              {/* Center Rest Saddle (15° Incline Slope) */}
              <path d="M 120,240 Q 200,215 280,240" fill="none" stroke="url(#goldWire53)" strokeWidth="2.5" />

              {/* Outer Petals Array (53 petals concept) */}
              <g stroke="url(#goldWire53)" strokeWidth="0.9">
                {/* Lower leaf layer */}
                <path d="M 80,240 C 60,195 100,165 130,210 Z" fill="url(#jadeGrad53)" />
                <path d="M 270,210 C 300,165 340,195 320,240 Z" fill="url(#jadeGrad53)" />
                
                {/* Intermediate petal clusters */}
                <path d="M 110,225 C 95,160 145,130 165,190 Z" fill="url(#jadeGrad53)" />
                <path d="M 235,190 C 255,130 305,160 290,225 Z" fill="url(#jadeGrad53)" />

                {/* Central High Lotus Bud Cluster */}
                <path d="M 140,210 C 130,130 180,90 200,165 Z" fill="url(#jadeGrad53)" />
                <path d="M 200,165 C 220,90 270,130 260,210 Z" fill="url(#jadeGrad53)" />

                {/* Summit Triple Crown (53rd Petal: Tam Tài Tụ Đỉnh) */}
                <path d="M 170,170 C 180,100 196,75 196,75 C 196,75 210,100 220,170 Z" fill="url(#jadeGrad53)" stroke="url(#goldWire53)" strokeWidth="1.5" />
                <circle cx="190" cy="72" r="3" fill="url(#goldWire53)" />
                <circle cx="202" cy="72" r="3" fill="url(#goldWire53)" />
                <circle cx="196" cy="65" r="3.5" fill="url(#goldWire53)" />
              </g>

              {/* Gold Filigree Vein Detail Lines */}
              <path d="M 200,85 Q 200,130 200,170" stroke="url(#goldWire53)" strokeWidth="0.8" fill="none" />
              <path d="M 190,110 Q 180,130 170,150" stroke="url(#goldWire53)" strokeWidth="0.6" fill="none" />
              <path d="M 210,110 Q 220,130 230,150" stroke="url(#goldWire53)" strokeWidth="0.6" fill="none" />

              {/* Imperial Calligraphy Brush Resting */}
              <AnimatePresence>
                {brushPlaced && (
                  <motion.g
                    initial={{ opacity: 0, y: -20, rotate: -3 }}
                    animate={{ opacity: 1, y: 0, rotate: -7 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    style={{ transformOrigin: '200px 180px' }}
                  >
                    <line x1="40" y1="165" x2="350" y2="200" stroke="#1A130E" strokeWidth="8" strokeLinecap="round" />
                    <line x1="40" y1="165" x2="350" y2="200" stroke="url(#goldWire53)" strokeWidth="1" strokeDasharray="15 30" />
                    <rect x="52" y="160" width="16" height="12" rx="2" fill="url(#goldWire53)" transform="rotate(-6 60 166)" />
                    <path d="M 52,164 Q 20,165 12,172 Q 25,178 54,175 Z" fill="#3D291A" stroke="#1F140D" strokeWidth="0.5" />
                  </motion.g>
                )}
              </AnimatePresence>
            </svg>
          </div>

          <div className="mt-4 flex items-center justify-between w-full text-xs text-[#A0AFA6] z-10 px-2">
            <span>Thế cánh sen: <strong className="text-[#FCD34D]">Ngũ Thập Tam Diệp (53)</strong></span>
            <span>Góc thoát mực ngự bút: <strong className="text-[#34D399]">15° chuẩn xác</strong></span>
            <span>Bệ án: <strong className="text-[#F8FAF9]">Hoàng Đàn Tuyết 400 năm</strong></span>
          </div>
        </div>

        {/* Control Interface */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111C14]/90 rounded-2xl p-5 border border-[#10B981]/25 space-y-4">
            <h4 className="text-sm font-semibold text-[#A7F3D0] tracking-wide uppercase">
              Tương Tác Thư Phòng & Chiêm Ngưỡng Bảo Vật
            </h4>

            {/* Petal Count Selector */}
            <div>
              <label className="text-xs text-[#A0AFA6] block mb-2 font-medium">Bảo Tác Sen Phỉ Thúy:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPetal(51)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedPetal === 51
                      ? 'bg-[#10B981] text-[#04120A] font-semibold shadow-lg shadow-[#10B981]/20'
                      : 'bg-[#17261B] text-[#D1FAE5] border border-[#10B981]/20 hover:border-[#10B981]/50'
                  }`}
                >
                  51 Cánh (V51)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPetal(52)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedPetal === 52
                      ? 'bg-[#10B981] text-[#04120A] font-semibold shadow-lg shadow-[#10B981]/20'
                      : 'bg-[#17261B] text-[#D1FAE5] border border-[#10B981]/20 hover:border-[#10B981]/50'
                  }`}
                >
                  52 Cánh (V52)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPetal(53)}
                  className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedPetal === 53
                      ? 'bg-[#10B981] text-[#04120A] font-semibold shadow-lg shadow-[#10B981]/20'
                      : 'bg-[#17261B] text-[#D1FAE5] border border-[#10B981]/20 hover:border-[#10B981]/50'
                  }`}
                >
                  53 Cánh (V53)
                </button>
              </div>
              <p className="text-[11px] text-[#A0AFA6] mt-2 italic leading-relaxed">
                Ngũ Thập Tam Diệp tượng trưng cho Tam Tài (Thiên - Địa - Nhân) Tương Hợp, Ngũ Phúc Lâm Môn, đắc tài đắc lộc, vĩnh bảo khang ninh.
              </p>
            </div>

            {/* Jade Translucency Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#D1FAE5] mb-1">
                <span>Độ Thấu Quang Phỉ Thúy Type A:</span>
                <span className="font-mono text-[#34D399] font-bold">{jadeTranslucency}%</span>
              </div>
              <input
                type="range"
                min="95"
                max="99.99"
                step="0.01"
                value={jadeTranslucency}
                onChange={(e) => setJadeTranslucency(Number(e.target.value))}
                className="w-full h-1.5 bg-[#1F3325] rounded-lg appearance-none cursor-pointer accent-[#10B981]"
                aria-label="Điều chỉnh độ thấu quang ngọc phỉ thúy"
              />
              <div className="flex justify-between text-[10px] text-[#6E8878] mt-1">
                <span>Ngọc bán trong (95%)</span>
                <span>Thấu quang tuyệt đối (99.99%)</span>
              </div>
            </div>

            {/* Interactive Brush Toggle & Acoustic Harmonics */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setBrushPlaced(!brushPlaced)}
                className={`min-h-[44px] flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  brushPlaced
                    ? 'border-[#FCD34D] bg-[#FCD34D]/15 text-[#FCD34D]'
                    : 'border-[#10B981]/40 bg-[#16251A] text-[#D1FAE5] hover:border-[#FCD34D]'
                }`}
              >
                <span>{brushPlaced ? 'Nhấc Ngự Bút (Chấp Bút)' : 'Gác Ngự Bút Lên Giá Sen'}</span>
              </button>

              <button
                type="button"
                onClick={toggleAcousticHarmonics}
                className={`min-h-[44px] px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${
                  isAcousticHarmonics
                    ? 'border-[#34D399] bg-[#34D399]/15 text-[#34D399] shadow-md shadow-[#34D399]/10'
                    : 'border-[#1F3325] bg-[#16251A] text-[#A0AFA6] hover:border-[#34D399]/40'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current inline-block mr-1.5 animate-ping" />
                {isAcousticHarmonics ? 'Hòa Âm 528Hz & 1056Hz BẬT' : 'Hòa Âm Bát Độ: TẮT'}
              </button>
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-2 border-t border-[#10B981]/20 flex items-center justify-between text-xs text-[#A0AFA6]">
              <span>Tư vấn KTS Trưởng:</span>
              <a href="tel:0368757916" className="text-[#34D399] hover:underline font-mono font-medium">
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTriquinquagesimalLeafStudio
