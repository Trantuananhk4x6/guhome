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
    name: 'Bạch Kỳ Tiên Phước Cổ Mộc',
    origin: 'Đỉnh núi Tiên Phước, Quảng Nam',
    resinDensity: '99.98% chìm hoàn toàn trong nước',
    aromaProfile: 'Hương thanh khiết tuyệt đỉnh, ngọt sâu lắng đọng, hậu vị hoa linh lan & mật ngọt đại ngàn ngàn năm',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Đắk Hà Hóa Thạch',
    origin: 'Rừng nguyên sinh Đắk Hà, Kon Tum',
    resinDensity: '99.99% đặc quánh như hắc ngọc huyền bí',
    aromaProfile: 'Hương huyền diệu, đầm ấm thâm sơn & nốt trầm cổ tích ngàn năm tĩnh mịch uy nghiêm',
    burnTemp: 165,
  },
  {
    name: 'Thanh Kỳ Sa Thầy Lam Tủy',
    origin: 'Vườn quốc gia Chư Mom Ray, Sa Thầy',
    resinDensity: '99.95% thấu quang ánh lam ngọc kim tủy',
    aromaProfile: 'Hương vương giả quý phái, ngọt thanh cam thảo sơn lâm & nốt lan rừng thoang thoảng phiêu bồng',
    burnTemp: 145,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV22() {
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

        osc2.type = 'triangle'
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
      } catch (err) {
        console.error('Audio Context Error:', err)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc741Ref.current?.stop()
            osc741Ref.current?.disconnect()
            setIsAudioHarmonics(false)
          }, 550)
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
    <section className="relative w-full py-16 px-4 md:px-8 bg-neutral-950 text-neutral-100 overflow-hidden border-t border-amber-900/30">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-600/30 via-neutral-950 to-black" />

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-medium tracking-widest uppercase">
            <span>Hương Đạo Vương Giả · Tuyệt Tác V22</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-amber-100 tracking-wide">
            Bảo Thất Kỳ Nam & Đỉnh Lư Kim Long Mã Đạp Sen Thập Nhị Nhị Thế V22
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Án thư gỗ Mun Sừng Nam Bộ 400 năm nâng đỡ đỉnh lư vàng 24K Filigree đan sợi 0.10mm hình tượng Kim Long Mã Đạp Sen Thập Nhị Nhị Thế V22. Hệ vi điều nhiệt gốm 80°C - 240°C bảo tồn trọn vẹn tinh chất Tam Phẩm Kỳ Nam độc bản.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Chamber */}
          <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Bảo Thất Trầm Hương Cung Đình</span>
                <h3 className="text-lg font-serif text-amber-200">Đỉnh Lư Kim Long Mã V22 & Án Mun Sừng Nam Bộ 400N</h3>
              </div>
              <button
                onClick={() => setIsIncenseActive(!isIncenseActive)}
                className={`px-4 py-2 min-h-[44px] min-w-[44px] rounded-lg text-xs font-medium border transition-colors flex items-center gap-2 ${
                  isIncenseActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                    : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-700'
                }`}
                aria-label="Kích hoạt xông trầm vi nhiệt"
              >
                <span className={`w-2 h-2 rounded-full ${isIncenseActive ? 'bg-amber-400 animate-ping' : 'bg-neutral-500'}`} />
                <span>{isIncenseActive ? 'Đang Tỏa Vi Hương' : 'Khởi Động Xông Trầm'}</span>
              </button>
            </div>

            {/* Stage Presentation */}
            <div className="relative h-72 sm:h-84 w-full rounded-xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-amber-950/20 border border-neutral-800/80 flex flex-col items-center justify-center overflow-hidden">
              {/* Smoke Rising Simulation */}
              <AnimatePresence>
                {isIncenseActive && (
                  <div className="absolute inset-0 pointer-events-none flex justify-center items-start pt-8">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 140, scale: 0.8 }}
                        animate={{
                          opacity: [0, 0.45, 0],
                          y: -40,
                          scale: [0.8, 1.4, 2.2],
                          x: [(i - 1) * 12, (i - 1) * 35, (i - 1) * 18],
                        }}
                        transition={{
                          duration: 4.8 + i * 0.7,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 1.2,
                        }}
                        className="absolute w-20 h-20 rounded-full bg-gradient-to-t from-amber-200/20 via-neutral-100/10 to-transparent blur-md"
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Incense Burner Centerpiece Graphic */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Gold Filigree Dragon Horse Motif */}
                <motion.div
                  animate={{
                    boxShadow: isIncenseActive
                      ? '0 0 45px rgba(245, 158, 11, 0.45)'
                      : '0 0 15px rgba(0, 0, 0, 0.8)',
                  }}
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-amber-500/70 bg-gradient-to-tr from-neutral-950 via-amber-950/60 to-neutral-900 flex flex-col items-center justify-center p-3 relative"
                >
                  <div className="absolute inset-1 rounded-full border border-dashed border-amber-400/40 animate-spin-slow" />
                  <svg className="w-20 h-20 sm:w-24 sm:h-24 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  <span className="text-[10px] font-mono text-amber-300 font-semibold tracking-wider uppercase mt-1">
                    Kim Long Mã V22
                  </span>
                </motion.div>

                {/* Base Wooden Pedestal */}
                <div className="mt-4 px-6 py-1.5 rounded-full bg-neutral-900 border border-amber-800/60 text-xs font-mono text-amber-300 flex items-center gap-2 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>Án Gỗ Mun Sừng Nam Bộ 400 Năm</span>
                </div>
              </div>

              {/* Thermal Display */}
              <div className="absolute bottom-3 left-4 text-xs font-mono text-neutral-400">
                <span>Nhiệt Độ Buồng Gốm: </span>
                <span className="text-amber-400 font-bold">{currentTemp}°C</span>
              </div>
            </div>

            {/* Variety Selector */}
            <div className="mt-6 space-y-3 pt-4 border-t border-neutral-800">
              <span className="text-xs text-neutral-400 font-mono">Lựa Chọn Tam Phẩm Kỳ Nam Quý Hiếm:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {KY_NAM_VARIETIES.map((v) => (
                  <button
                    key={v.name}
                    onClick={() => handleSelectVariety(v)}
                    className={`p-3 min-h-[44px] min-w-[44px] rounded-xl border text-left transition-all ${
                      selectedKynam.name === v.name
                        ? 'border-amber-500 bg-amber-950/40 text-amber-200 shadow-md'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-serif font-medium">{v.name}</div>
                    <div className="text-[10px] font-mono text-neutral-400 mt-1">{v.burnTemp}°C · Vi Nhiệt</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Specs & Audio Solfeggio Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 space-y-5">
              <h3 className="text-lg font-serif text-amber-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Hồ Sơ Xúc Giác & Độc Bản Kỳ Nam
              </h3>
              <dl className="divide-y divide-neutral-800 text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Chủng Loại Kỳ Nam</dt>
                  <dd className="font-mono text-amber-300 text-right">{selectedKynam.name}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Nguồn Gốc Xuất Xứ</dt>
                  <dd className="font-mono text-neutral-200 text-right">{selectedKynam.origin}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Tỷ Trọng Dầu Kỳ</dt>
                  <dd className="font-mono text-emerald-300 text-right">{selectedKynam.resinDensity}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Nhiệt Độ Tỏa Hương</dt>
                  <dd className="font-mono text-amber-400 text-right">{selectedKynam.burnTemp}°C (Gốm Vi Xử Lý)</dd>
                </div>
                <div className="py-2.5 flex flex-col gap-1">
                  <dt className="text-neutral-400">Tầng Hương Xúc Cảm</dt>
                  <dd className="text-neutral-300 text-xs italic font-light leading-relaxed">{selectedKynam.aromaProfile}</dd>
                </div>
              </dl>
            </div>

            {/* Web Audio Harmonics 528Hz & 741Hz */}
            <div className="bg-gradient-to-br from-amber-950/20 via-neutral-900/60 to-amber-900/20 border border-amber-600/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Thanh Âm Solfeggio Hương Đạo</span>
                <h4 className="text-base font-serif text-neutral-100">Hòa Âm Tần Số Kép 528Hz & 741Hz</h4>
                <p className="text-xs text-neutral-400">
                  Tần số 528Hz (chuyển hóa & cân bằng tâm thức) kết hợp 741Hz (thức tỉnh trực giác & thanh lọc tâm hồn) kiến tạo miền tĩnh tại vô ưu.
                </p>
              </div>
              <button
                onClick={toggleSound}
                className={`w-full py-3 min-h-[44px] min-w-[44px] rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border ${
                  isAudioHarmonics
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-amber-200 border-amber-600/40'
                }`}
                aria-label="Kích hoạt thanh âm Solfeggio kép 528Hz và 741Hz"
              >
                <svg className={`w-4 h-4 ${isAudioHarmonics ? 'animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
                <span>{isAudioHarmonics ? 'Dừng Hòa Âm 528Hz & 741Hz' : 'Khởi Động Thanh Âm Hương Đạo'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV22
