'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KynamSpec {
  name: string
  origin: string
  resinDensity: string
  aromaProfile: string
  burnTemp: number
}

const KY_NAM_VARIETIES: KynamSpec[] = [
  {
    name: 'Bạch Kỳ Vạn Giã Cổ Mộc 530 Năm',
    origin: 'Rừng nguyên sinh ngàn năm Vạn Giã, Khánh Hòa',
    resinDensity: '99.98% chìm nước, tinh thể đường kết tinh hổ phách tự nhiên',
    aromaProfile: 'Thơm ngát hoa sen trắng bách diệp, mật ong rừng ngàn năm & hậu vị thanh thoát trường cửu',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Trà Bồng Hóa Thạch 630 Năm',
    origin: 'Dãy đá trầm tích cổ Trà Bồng, Quảng Ngãi',
    resinDensity: '99.99% đặc quánh như hắc ngọc sa thạch, chìm sâu đáy nước',
    aromaProfile: 'Hương trầm tích đại ngàn uy nghiêm, tĩnh mịch tâm trí, lưu hương 72 giờ không tan',
    burnTemp: 165,
  },
  {
    name: 'Huỳnh Kỳ Tiên Phước Hoàng Kim 480 Năm',
    origin: 'Thung lũng đá trầm tích Tiên Phước, Quảng Nam',
    resinDensity: '99.96% ánh vàng kim tủy lung linh, sáp dẻo tự nhiên',
    aromaProfile: 'Hương vương giả quý phái, vị cay ngọt hoa quế rừng & thảo quả Trường Sơn phiêu bồng',
    burnTemp: 148,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV39() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KY_NAM_VARIETIES[0]!)
  const [currentTemp, setCurrentTemp] = useState<number>(135)
  const [isIncenseActive, setIsIncenseActive] = useState<boolean>(false)
  const [isAudioHarmonics, setIsAudioHarmonics] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc741Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      try {
        osc528Ref.current?.stop()
        osc528Ref.current?.disconnect()
        osc741Ref.current?.stop()
        osc741Ref.current?.disconnect()
        gainRef.current?.disconnect()
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close()
        }
      } catch {
        // ignore on unmount
      }
    }
  }, [])

  const toggleSound = () => {
    if (!isAudioHarmonics) {
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
        osc2.frequency.setValueAtTime(741, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc741Ref.current = osc2
        gainRef.current = gain
        setIsAudioHarmonics(true)
      } catch {
        setIsAudioHarmonics(false)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc741Ref.current?.stop()
            osc741Ref.current?.disconnect()
            setIsAudioHarmonics(false)
          }, 650)
        } catch {
          setIsAudioHarmonics(false)
        }
      } else {
        setIsAudioHarmonics(false)
      }
    }
  }

  const handleSelectVariety = (item: KynamSpec) => {
    setSelectedKynam(item)
    setCurrentTemp(item.burnTemp)
  }

  return (
    <section className="relative w-full bg-[#070705] text-[#E5E1D5] py-20 px-4 sm:px-6 lg:px-12 border-b border-[#D4AF37]/25 overflow-hidden">
      {/* Subtle background ambient flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-r from-[#D4AF37]/10 via-[#F59E0B]/5 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Title Badge & Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 text-xs uppercase tracking-widest text-[#E5C158] border border-[#D4AF37]/35 rounded-full mb-3 bg-[#17150C]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span>Phòng Thờ Triều Đình & Trà Thất Vương Giả V39 · GuHomes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#F3EFE6] tracking-wide mb-3">
            Đỉnh Lư Kim Long Mã Thập Nhị Thập Cửu Thế V39
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-[#AEA796] leading-relaxed">
            Nghệ thuật kim hoàn Filigree Vàng 24K đậu chỉ 0.08mm nẹp Phỉ Thúy Type A trên Án Thờ Sưa Đỏ Bắc Bộ 400 năm. Tích hợp vi điều nhiệt xông Kỳ Nam trầm tích không khói độc bản từ GuHomes.
          </p>
        </div>

        {/* Core Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          {/* Left Column: Visual Interactive Burner */}
          <div className="lg:col-span-7 bg-[#0E0E0A] border border-[#D4AF37]/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D4AF37]/20">
              <span className="text-xs uppercase tracking-wider text-[#A59D8C] font-mono">Bảo Vật Hoàng Gia · Long Mã Phi Vân V39</span>
              <span className="text-xs px-2.5 py-0.5 rounded bg-[#2A2312] text-[#E5C158] border border-[#D4AF37]/30">Vàng 24K Filigree & Ngọc Phỉ Thúy</span>
            </div>

            {/* Visual Incense Burner Centerpiece */}
            <div className="relative h-72 sm:h-88 flex items-center justify-center bg-gradient-to-b from-[#14130E] to-[#080806] rounded-xl border border-[#D4AF37]/15 overflow-hidden">
              {/* Smoke Animation when active */}
              <AnimatePresence>
                {isIncenseActive && (
                  <div className="absolute top-8 inset-x-0 flex justify-center pointer-events-none z-20">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{
                        opacity: [0.2, 0.7, 0.4, 0.8, 0],
                        y: [-10, -50, -90, -130],
                        scale: [1, 1.4, 2, 2.8],
                        x: [0, 8, -6, 12, -4],
                      }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeOut' }}
                      className="w-16 h-16 rounded-full bg-gradient-to-t from-[#E5C158]/25 via-white/10 to-transparent blur-md"
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Incense Burner Illustration */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Burner Lid: Dragon-Horse Figurine */}
                <motion.div
                  animate={{ y: isIncenseActive ? [-1, 1, -1] : 0 }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="flex flex-col items-center"
                >
                  <svg width="64" height="42" viewBox="0 0 64 42" fill="none" className="text-[#D4AF37] drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]">
                    <path d="M32 4 C36 10 44 14 50 14 C48 18 42 20 38 22 C34 24 30 24 26 22 C22 20 16 18 14 14 C20 14 28 10 32 4 Z" fill="url(#goldGradient39)" stroke="#FFF8DC" strokeWidth="1" />
                    <circle cx="32" cy="14" r="3.5" fill="#34D399" stroke="#E5C158" strokeWidth="1" />
                    <defs>
                      <linearGradient id="goldGradient39" x1="14" y1="4" x2="50" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFE082" />
                        <stop offset="0.5" stopColor="#D4AF37" />
                        <stop offset="1" stopColor="#B45309" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="text-[10px] text-[#E5C158] font-mono tracking-widest -mt-1">KIM LONG MÃ</span>
                </motion.div>

                {/* Burner Body: Lotus Petal Filigree */}
                <div className="w-40 sm:w-48 h-28 sm:h-32 border-2 border-[#D4AF37] rounded-3xl relative flex items-center justify-center bg-gradient-to-b from-[#2B2313] to-[#14110A] shadow-[0_0_25px_rgba(212,175,55,0.15)] overflow-hidden">
                  {/* Filigree Patterns */}
                  <div className="absolute inset-2 border border-[#D4AF37]/40 rounded-2xl flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-dashed border-[#D4AF37]/60 flex items-center justify-center">
                      <div className="text-center">
                        <span className="block text-[10px] text-[#A69D8C]">Nhiệt Độ</span>
                        <span className="text-sm font-mono font-bold text-[#E5C158]">{currentTemp}°C</span>
                      </div>
                    </div>
                  </div>

                  {/* Heating Element Glow */}
                  {isIncenseActive && (
                    <motion.div
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-radial from-[#F59E0B]/20 via-transparent to-transparent pointer-events-none"
                    />
                  )}
                </div>

                {/* Pedestal: 400-Year-Old Red Rosewood / Dalbergia Tonkinensis (Sưa Đỏ) */}
                <div className="w-48 sm:w-56 h-8 sm:h-10 mt-1 bg-gradient-to-r from-[#4A1510] via-[#6B1F17] to-[#4A1510] border-t-2 border-[#D4AF37] rounded-md shadow-md flex items-center justify-center">
                  <span className="text-[10px] tracking-wider text-[#FCD34D] uppercase font-mono">Bệ Gỗ Sưa Đỏ Bắc Bộ 400 Năm</span>
                </div>
              </div>
            </div>

            {/* Interactive Control Toggles */}
            <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsIncenseActive(!isIncenseActive)}
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    isIncenseActive
                      ? 'bg-[#D4AF37] text-[#0A0A06] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                      : 'bg-[#18160F] text-[#E0D9C8] border-[#D4AF37]/35 hover:bg-[#252217]'
                  }`}
                >
                  {isIncenseActive ? 'Dừng Tỏa Hương Kỳ Nam' : 'Kích Hoạt Tỏa Hương Vi Nhiệt'}
                </button>

                <button
                  type="button"
                  onClick={toggleSound}
                  className={`min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs font-medium rounded-lg border transition-all flex items-center space-x-1.5 ${
                    isAudioHarmonics
                      ? 'bg-[#1F2C23] text-[#34D399] border-[#34D399]/60 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                      : 'bg-[#18160F] text-[#A39C8B] border-[#D4AF37]/30 hover:bg-[#221F15]'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span>{isAudioHarmonics ? 'Hòa Âm 528Hz+741Hz (Đang bật)' : 'Bật 528Hz+741Hz'}</span>
                </button>
              </div>

              {/* Temperature Adjust Slider */}
              <div className="flex items-center space-x-2 bg-[#14120A] px-3 py-1.5 rounded-lg border border-[#D4AF37]/20">
                <span className="text-[11px] text-[#8C8472]">Điều nhiệt:</span>
                <input
                  type="range"
                  min="80"
                  max="240"
                  step="5"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-[#D4AF37] cursor-pointer"
                  aria-label="Điều chỉnh nhiệt độ xông"
                />
                <span className="text-xs font-mono text-[#E5C158] min-w-[42px]">{currentTemp}°C</span>
              </div>
            </div>
          </div>

          {/* Right Column: Imperial Kynam Spec Sheet */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0E0E0A] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-lg">
              <h3 className="text-sm font-serif text-[#D4AF37] uppercase tracking-wider mb-3 pb-2 border-b border-[#D4AF37]/20 flex items-center justify-between">
                <span>Trầm Kỳ Hoàng Triều · Danh Mục V39</span>
                <span className="text-[11px] text-[#8C8472] font-mono">Độ Chìm 99.9%</span>
              </h3>

              {/* Varieties Selectors */}
              <div className="space-y-2 mb-4">
                {KY_NAM_VARIETIES.map((k) => (
                  <button
                    key={k.name}
                    type="button"
                    onClick={() => handleSelectVariety(k)}
                    className={`w-full text-left min-h-[44px] p-2.5 rounded-xl border transition-all text-xs ${
                      selectedKynam.name === k.name
                        ? 'bg-[#221B0F] border-[#D4AF37] text-[#FFF8DC] shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                        : 'bg-[#12110C] border-white/5 text-[#9E9684] hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#E5C158]">{k.name}</span>
                      <span className="font-mono text-[10px] text-[#8E8674]">{k.burnTemp}°C</span>
                    </div>
                    <div className="text-[11px] text-[#8E8674] truncate">{k.origin}</div>
                  </button>
                ))}
              </div>

              {/* Details of Selected Variety */}
              <div className="p-3.5 rounded-xl bg-[#14130D] border border-[#D4AF37]/20 space-y-2 text-xs">
                <div>
                  <span className="text-[#8E8674] block mb-0.5">Mật độ tinh dầu & chỉ số chìm:</span>
                  <span className="text-[#34D399] font-medium">{selectedKynam.resinDensity}</span>
                </div>
                <div>
                  <span className="text-[#8E8674] block mb-0.5">Tầng hương xúc cảm:</span>
                  <span className="text-[#E0D9C8] italic leading-relaxed">{selectedKynam.aromaProfile}</span>
                </div>
              </div>
            </div>

            {/* Custom Altar Integration Guarantee */}
            <div className="p-4 rounded-xl bg-[#0B0A06] border border-white/10 text-xs text-[#8E8674] leading-relaxed">
              <strong className="text-[#D4AF37] font-serif block mb-1">Cam Kết Quy Chuẩn GuHomes:</strong>
              Mỗi chiếc Đỉnh Lư Kim Long Mã V39 đều được KTS Trưởng cùng nghệ nhân kim hoàn Thạnh Xuân trực tiếp thiết kế ăn khớp cung phong thủy bàn thờ của từng gia chủ, bảo hành vàng 24K và gỗ Sưa Đỏ Bắc Bộ trọn đời.
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#0F0E09] border border-[#D4AF37]/25 text-xs text-[#9E9785] gap-3">
          <div>
            <span className="text-[#D4AF37] font-semibold">Thỉnh Đỉnh Lư & Thiết Kế Án Thờ:</span> Trực tiếp trao đổi với KTS Trưởng GuHomes qua hotline <a href="tel:0368757916" className="text-[#E5C158] underline font-mono hover:text-[#FFF8DC]">0368 757 916</a> hoặc email <a href="mailto:guhomesvn@gmail.com" className="text-[#E5C158] underline hover:text-[#FFF8DC]">guhomesvn@gmail.com</a>.
          </div>
          <span className="text-[#8E8674] whitespace-nowrap">Chế tác thủ công xưởng Thạnh Xuân 1.200m²</span>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV39
