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
    name: 'Bạch Kỳ Vạn Giã Cổ Mộc',
    origin: 'Rừng nguyên sinh ngàn năm Vạn Giã, Khánh Hòa',
    resinDensity: '99.98% chìm nước, tinh thể đường kết tinh hổ phách',
    aromaProfile: 'Thơm ngát hoa sen trắng bách diệp, dịu ngọt mật ong rừng ngàn năm & hậu vị thanh thoát',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Trà Bồng Hóa Thạch',
    origin: 'Dãy đá trầm tích cổ Trà Bồng, Quảng Ngãi',
    resinDensity: '99.99% đặc quánh như hắc ngọc sa thạch, chìm sâu đáy nước',
    aromaProfile: 'Hương trầm tích đại ngàn uy nghiêm, tĩnh mịch tâm trí, lưu hương 72 giờ không tan',
    burnTemp: 165,
  },
  {
    name: 'Thanh Kỳ Đắk Glei Lam Tủy',
    origin: 'Rừng nguyên sinh thông đỏ Đắk Glei, Kon Tum',
    resinDensity: '99.95% thấu quang ánh lam ngọc kim tủy lung linh',
    aromaProfile: 'Hương vương giả quý phái, ngọt thanh hoa hoàng lan rừng & sâm quy Trường Sơn phiêu bồng',
    burnTemp: 145,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV35() {
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
      } catch (e) {
        console.error('AudioContext not supported:', e)
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
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
            }
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

  const handleSelectKynam = (item: KynamSpec) => {
    setSelectedKynam(item)
    setCurrentTemp(item.burnTemp)
  }

  return (
    <section className="relative w-full py-16 bg-stone-950 text-stone-100 overflow-hidden border-t border-b border-amber-900/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(160,110,40,0.08)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(90,40,20,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-amber-950/60 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800/40 text-amber-300 text-xs font-mono mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              Imperial Incense Burner Vault V35 · Sprint 180
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-amber-100 font-light tracking-wide">
              Đỉnh Lư Kim Long Mã Thập Nhị Thập Ngũ Thế V35 Trên Án Mun Hoa 400 Năm
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-2xl font-light">
              Tạo tác đỉnh lư Vàng 24K Filigree hình tượng Long Mã Đạp Sen ngậm ngọc lam ngọc châu, ngự trên án thư gỗ Mun Hoa Nam Bộ Cổ Thụ 400 năm cuộn vân cẩm thạch huyền bí, buồng vi điều nhiệt điện trở bạch kim 80°C - 240°C.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`min-h-[44px] px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                isAudioHarmonics
                  ? 'bg-amber-500/20 text-amber-200 border-amber-500/50 shadow-lg shadow-amber-950/50'
                  : 'bg-stone-900/80 text-stone-400 border-stone-800 hover:border-amber-700/50'
              }`}
            >
              <svg className={`w-4 h-4 ${isAudioHarmonics ? 'text-amber-400 animate-spin' : 'text-stone-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M10 15V9l5 3-5 3z" />
              </svg>
              <span>{isAudioHarmonics ? 'Hòa Âm 528Hz & 741Hz Đang Phát' : 'Khởi Động Hòa Âm Hương Đạo'}</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visualizer */}
          <div className="lg:col-span-8 bg-stone-900/60 rounded-3xl border border-stone-800/80 p-6 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800/60 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Án Thư Gỗ Mun Hoa Nam Bộ Cổ Thụ 400 Năm Tuổi
              </span>
              <span>Vi Điều Nhiệt: <strong className="text-amber-300 font-semibold">{currentTemp}°C</strong></span>
            </div>

            {/* Graphic Canvas */}
            <div className="relative w-full aspect-[16/10] bg-gradient-to-b from-stone-950 to-stone-900 rounded-2xl border border-stone-800/60 flex items-center justify-center p-6 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Incense Vapor Particles */}
                {isIncenseActive && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.path
                      d="M 400 240 C 370 190, 430 140, 390 90 C 360 50, 420 20, 400 0"
                      stroke="rgba(251,191,36,0.4)"
                      strokeWidth="3.5"
                      fill="none"
                      strokeLinecap="round"
                      animate={{
                        d: [
                          "M 400 240 C 370 190, 430 140, 390 90 C 360 50, 420 20, 400 0",
                          "M 400 240 C 430 190, 370 140, 410 90 C 440 50, 380 20, 400 0",
                          "M 400 240 C 370 190, 430 140, 390 90 C 360 50, 420 20, 400 0",
                        ],
                      }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.circle
                      cx="390"
                      cy="90"
                      r="16"
                      fill="rgba(245,158,11,0.15)"
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                  </motion.g>
                )}

                {/* Wooden Altar Base (Án Thư Gỗ Mun Hoa Nam Bộ) */}
                <rect x="220" y="370" width="360" height="48" rx="6" fill="#1c1917" stroke="#57534e" strokeWidth="2" />
                <rect x="250" y="418" width="40" height="50" fill="#0c0a09" stroke="#57534e" strokeWidth="1.5" />
                <rect x="510" y="418" width="40" height="50" fill="#0c0a09" stroke="#57534e" strokeWidth="1.5" />
                <text x="400" y="400" fill="#d6d3d1" fontSize="11" fontFamily="monospace" textAnchor="middle">
                  Án Thư Gỗ Mun Hoa Nam Bộ Cổ Thụ 400 Năm (Vân Cẩm Thạch)
                </text>

                {/* Lotus Pedestal (Tòa Sen Vàng Ròng 24K) */}
                <path d="M 330 370 C 350 330, 450 330, 470 370 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
                <ellipse cx="400" cy="355" rx="55" ry="12" fill="#78350f" stroke="#fbbf24" strokeWidth="1.5" />

                {/* Dragon Horse Body (Kim Long Mã Thập Nhị Thập Ngũ Thế V35) */}
                <path
                  d="M 360 350 C 340 300, 360 250, 400 240 C 440 250, 460 300, 440 350 Z"
                  fill="url(#goldGradient35)"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />

                {/* Dragon Head & Pearl */}
                <circle cx="400" cy="225" r="16" fill="#f59e0b" stroke="#fef3c7" strokeWidth="2" />
                <circle cx="400" cy="210" r="6" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />

                {/* Wings Filigree Motif */}
                <path d="M 350 280 C 310 260, 320 220, 370 250" stroke="#fef08a" strokeWidth="2" fill="none" strokeDasharray="2 3" />
                <path d="M 450 280 C 490 260, 480 220, 430 250" stroke="#fef08a" strokeWidth="2" fill="none" strokeDasharray="2 3" />

                {/* Heating Chamber Glow */}
                <circle cx="400" cy="290" r="18" fill={isIncenseActive ? "rgba(239,68,68,0.7)" : "rgba(245,158,11,0.2)"} />
                <circle cx="400" cy="290" r="8" fill={isIncenseActive ? "#fef08a" : "#78350f"} />

                <defs>
                  <linearGradient id="goldGradient35" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#d97706" />
                    <stop offset="100%" stopColor="#78350f" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Controller Ribbon */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsIncenseActive(!isIncenseActive)}
                  className={`min-h-[44px] px-5 py-2.5 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 border ${
                    isIncenseActive
                      ? 'bg-amber-600/30 text-amber-200 border-amber-500 shadow-lg shadow-amber-950/50'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-600/50'
                  }`}
                >
                  {isIncenseActive ? 'Đang Xông Trầm Vi Nhiệt' : 'Khai Hỏa Xông Trầm'}
                </button>
              </div>

              {/* Thermal Adjuster */}
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-stone-400">Điều Chỉnh Vi Nhiệt:</span>
                <input
                  type="range"
                  min="80"
                  max="240"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="w-32 accent-amber-500 cursor-pointer"
                />
                <span className="text-amber-300 w-12 text-right font-semibold">{currentTemp}°C</span>
              </div>
            </div>
          </div>

          {/* Dossier & Variety Selection */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-stone-900/70 rounded-3xl border border-stone-800/80 p-6 space-y-4">
              <h3 className="text-base font-serif text-amber-200 flex items-center gap-2 border-b border-stone-800/80 pb-3">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Tam Phẩm Kỳ Nam Quý Hiếm
              </h3>

              <div className="space-y-3">
                {KY_NAM_VARIETIES.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSelectKynam(item)}
                    className={`w-full text-left p-3 rounded-xl border transition-all min-h-[44px] ${
                      selectedKynam.name === item.name
                        ? 'bg-amber-950/40 border-amber-600/60 shadow-md'
                        : 'bg-stone-900/40 border-stone-800/60 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-serif text-amber-100">
                      <span>{item.name}</span>
                      <span className="text-[11px] font-mono text-amber-400">{item.burnTemp}°C</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 line-clamp-2 font-light">
                      {item.aromaProfile}
                    </p>
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-800/80 space-y-2 text-xs font-mono">
                <div>
                  <span className="text-stone-500 block">Xuất Xứ Địa Lý:</span>
                  <span className="text-stone-200">{selectedKynam.origin}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Tỷ Trọng Nhựa Trầm:</span>
                  <span className="text-stone-200 font-serif">{selectedKynam.resinDensity}</span>
                </div>
              </div>
            </div>

            {/* Atelier Craftsmanship Stamp */}
            <div className="bg-gradient-to-br from-amber-950/40 via-stone-900/60 to-stone-900/90 rounded-2xl border border-amber-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-serif">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Chế Tác Thủ Công Xưởng Thạnh Xuân</span>
              </div>
              <p className="text-stone-300 text-xs font-light leading-relaxed">
                Từng chi tiết vàng ròng 24K filigree được nghệ nhân kim hoàn kéo sợi 0.12mm uốn lượn hình Long Mã Đạp Sen, kết hợp gỗ Mun Hoa Nam Bộ 400 năm tuổi cuộn vân cẩm thạch sắc sảo, trần chỉ 12 tuyệt phẩm mỗi năm.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-amber-950/60">
                <span>Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="text-amber-300 font-serif hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV35;
