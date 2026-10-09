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
    name: 'Bạch Kỳ Ninh Hòa Cổ Mộc',
    origin: 'Đỉnh núi Ninh Hòa, Khánh Hòa',
    resinDensity: '99.98% chìm hoàn toàn trong nước',
    aromaProfile: 'Hương thanh khiết tuyệt đỉnh, ngọt sâu lắng đọng, hậu vị hoa lê tuyết & sương mai ngàn năm',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Hòn Hèo Hóa Thạch',
    origin: 'Bán đảo Hòn Hèo, Khánh Hòa',
    resinDensity: '99.99% đặc quánh như hắc ngọc huyền bí',
    aromaProfile: 'Hương huyền diệu, đầm ấm thâm sơn & nốt trầm cổ tích ngàn năm tĩnh mịch uy nghiêm',
    burnTemp: 165,
  },
  {
    name: 'Thanh Kỳ Vạn Ninh Kim Tủy',
    origin: 'Rừng nguyên sinh Vạn Ninh, Khánh Hòa',
    resinDensity: '99.95% thấu quang ánh lam ngọc kim tủy',
    aromaProfile: 'Hương vương giả quý phái, ngọt thanh cam thảo sơn lâm & nốt lan rừng thoang thoảng phiêu bồng',
    burnTemp: 145,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV15() {
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
        // cleanup safe
      }
    }
  }, [])

  const toggleHarmonics = () => {
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
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.5)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc741Ref.current = osc2
        gainRef.current = gain
        setIsAudioHarmonics(true)
      } catch (err) {
        console.error('Audio context error:', err)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            try {
              osc528Ref.current?.stop()
              osc528Ref.current?.disconnect()
              osc741Ref.current?.stop()
              osc741Ref.current?.disconnect()
              gainRef.current?.disconnect()
              osc528Ref.current = null
              osc741Ref.current = null
              gainRef.current = null
            } catch {
              // ignore
            }
            setIsAudioHarmonics(false)
          }, 600)
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
    <section className="relative overflow-hidden rounded-3xl border border-amber-900/60 bg-gradient-to-b from-stone-950 via-amber-950/20 to-stone-950 p-6 text-stone-200 shadow-2xl md:p-10 my-8">
      {/* Golden Aura Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/40 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Bảo Thất Hương Đạo V15 · GuHomes Chế Tác
            </div>
            <h2 className="mt-3 text-2xl font-serif font-light tracking-wide text-amber-100 md:text-3xl lg:text-4xl">
              Bảo Thất Kỳ Nam & Đỉnh Kim Long Mã Đạp Sen V15
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400 md:text-base">
              Tuyệt tác hương đạo ngự dụng thiết kế cho dinh thự thượng lưu. Tọa lạc trên án gỗ Trắc Đỏ Nam Bộ 375 năm vân chỉ cẩm thạch kiêu hãnh, kết hợp đỉnh đồng đan chỉ Vàng 24K Filigree hình tượng Long Mã Đạp Sen Thập Ngũ Thế vờn mây. Điều nhiệt chính xác không sinh khói độc hại.
            </p>
          </div>

          <button
            onClick={toggleHarmonics}
            className="flex items-center gap-2.5 rounded-xl border border-amber-500/40 bg-stone-900/90 px-4 py-2.5 text-xs font-medium text-amber-200 shadow-lg backdrop-blur transition-all duration-300 hover:border-amber-400 hover:bg-stone-800 focus:outline-none min-h-[44px] min-w-[44px]"
            title="Thanh lọc khí trường bằng tần số 528Hz & 741Hz"
          >
            <svg
              className={`h-4 w-4 ${isAudioHarmonics ? 'text-amber-400 animate-spin' : 'text-stone-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
            </svg>
            <span>{isAudioHarmonics ? 'Dừng Tần Số Thanh Khí' : 'Khởi Động Âm Hòa (528Hz - 741Hz)'}</span>
          </button>
        </div>

        {/* Interactive Main Stage */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Incense Simulation */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-amber-900/40 bg-stone-950/70 p-6 backdrop-blur lg:col-span-7">
            <div className="relative flex h-80 w-full max-w-md items-center justify-center">
              {/* Altar Pedestal - Imperial Rosewood Timber 375 Years */}
              <div className="absolute bottom-6 h-12 w-64 rounded-xl border-2 border-amber-700/60 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 shadow-2xl flex items-center justify-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300/80">Án Trắc Đỏ Nam Bộ 375 Năm</span>
              </div>

              {/* Incense Burner - Filigree Gold Dragon-Horse Lotus */}
              <div className="relative z-10 flex h-48 w-48 flex-col items-center justify-center rounded-full border-2 border-amber-400/60 bg-gradient-to-b from-stone-900 via-amber-950/60 to-stone-950 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                {/* Filigree Wire Ring Pattern */}
                <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/40 animate-[spin_60s_linear_infinite]" />
                
                {/* Dragon-Horse & Lotus Icon */}
                <motion.div
                  animate={{ y: isIncenseActive ? [-2, 2, -2] : 0 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <svg className="h-16 w-16 text-amber-300 drop-shadow-[0_4px_12px_rgba(245,158,11,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 2L15 8H9L12 2Z" fill="rgba(245, 158, 11, 0.3)" />
                    <path d="M5 12C5 8 9 5 12 5C15 5 19 8 19 12C19 16 15 20 12 21C9 20 5 16 5 12Z" />
                    <circle cx="12" cy="12" r="3" fill="#fbbf24" />
                    <path d="M7 19C9 21 15 21 17 19" strokeWidth="2" />
                  </svg>
                  <span className="mt-1 text-[10px] font-serif font-medium text-amber-200">Kim Long Mã Thập Ngũ Thế</span>
                </motion.div>

                {/* Microclimate Smoke Dispersion Simulation (Smokeless Vapor Aura) */}
                <AnimatePresence>
                  {isIncenseActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: [0, 0.7, 0], scale: [0.9, 1.4, 1.8], y: -80 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
                      className="pointer-events-none absolute -top-12 h-20 w-20 rounded-full bg-gradient-to-t from-amber-200/40 via-yellow-100/20 to-transparent blur-md"
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Status Bar */}
            <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 border-t border-amber-900/40 pt-3 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${isIncenseActive ? 'bg-amber-400 animate-ping' : 'bg-stone-600'}`} />
                Trạng thái: {isIncenseActive ? `Ủ Hương Tỏa Khí (${currentTemp}°C)` : 'Tĩnh Mịch (Sẵn sàng)'}
              </span>
              <span className="font-mono text-amber-300">Vật phẩm: {selectedKynam.name}</span>
            </div>
          </div>

          {/* Controls & Varieties */}
          <div className="flex flex-col justify-between rounded-2xl border border-amber-900/40 bg-stone-950/50 p-6 backdrop-blur lg:col-span-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                Lựa Chọn Phẩm Cấp Kỳ Nam & Điều Nhiệt
              </h3>

              {/* Variety Selection */}
              <div className="mt-4 space-y-2.5">
                {KY_NAM_VARIETIES.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSelectVariety(item)}
                    className={`w-full rounded-xl border p-3 text-left transition-all min-h-[44px] ${
                      selectedKynam.name === item.name
                        ? 'border-amber-500 bg-amber-950/40 text-amber-100 shadow-md'
                        : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium">{item.name}</span>
                      <span className="font-mono text-xs text-amber-400">{item.burnTemp}°C</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400 line-clamp-1">{item.aromaProfile}</p>
                  </button>
                ))}
              </div>

              {/* Temperature Slider */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-300">Nhiệt Độ Thủy Hỏa Vi Lượng (80°C - 240°C)</span>
                  <span className="font-mono text-amber-300">{currentTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="240"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-500"
                />
              </div>

              {/* Toggle Burner */}
              <div className="mt-5">
                <button
                  onClick={() => setIsIncenseActive(!isIncenseActive)}
                  className={`w-full rounded-xl border py-3 text-xs font-medium tracking-wide uppercase transition-all shadow-lg min-h-[44px] ${
                    isIncenseActive
                      ? 'border-amber-400 bg-gradient-to-r from-amber-600 to-yellow-600 text-stone-950 font-bold'
                      : 'border-amber-600/50 bg-amber-950/30 text-amber-300 hover:bg-amber-950/60'
                  }`}
                >
                  {isIncenseActive ? 'Dập Lửa Vi Lượng · Tĩnh Khí' : 'Khởi Động Tỏa Hương Kỳ Nam Vi Khí Hậu'}
                </button>
              </div>
            </div>

            {/* Spec Details */}
            <div className="mt-6 border-t border-amber-900/40 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Hồ Sơ Giám Định Kỳ Nam
              </h4>
              <dl className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Xuất xứ:</span>
                  <span className="text-stone-200">{selectedKynam.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Tỷ trọng dầu:</span>
                  <span className="text-amber-300">{selectedKynam.resinDensity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Khung bệ:</span>
                  <span className="text-yellow-200">Án Trắc Đỏ Nam Bộ 375 Năm</span>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-900/40 bg-stone-950/60 px-6 py-4 text-xs text-stone-400">
          <div>
            <span className="font-semibold text-amber-300">Không Gian Thưởng Trầm Thượng Đỉnh GuHomes:</span> Thiết kế độc bản cho Penthouse và Dinh thự biệt lập.
          </div>
          <div className="flex items-center gap-4">
            <span>KTS Trưởng: <a href="tel:0368757916" className="text-amber-300 hover:underline">0368 757 916</a></span>
            <span>Hotline tư vấn: <a href="mailto:guhomesvn@gmail.com" className="text-stone-300 hover:underline">guhomesvn@gmail.com</a></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV15
