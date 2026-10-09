'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IncenseVaultMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV67() {
  const [temperature, setTemperature] = useState<number>(178)
  const [sacredAromaActive, setSacredAromaActive] = useState<boolean>(true)
  const [solfeggioActive, setSolfeggioActive] = useState<boolean>(false)
  const [selectedVaultTab, setSelectedVaultTab] = useState<number>(0)

  // Web Audio Context & Oscillators for Solfeggio 528Hz + 741Hz (Crown Chakra Purification)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc528Ref = useRef<OscillatorNode | null>(null)
  const osc741Ref = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopAudio = () => {
    try {
      if (osc528Ref.current) {
        osc528Ref.current.stop()
        osc528Ref.current.disconnect()
        osc528Ref.current = null
      }
      if (osc741Ref.current) {
        osc741Ref.current.stop()
        osc741Ref.current.disconnect()
        osc741Ref.current = null
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

  const startAudio = () => {
    stopAudio()
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz: DNA Repair & Spiritual Transformation
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc528Ref.current = osc1

      // Solfeggio 741Hz: Intuition Awakening & Energy Cleansing
      const osc2 = ctx.createOscillator()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(741, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      osc741Ref.current = osc2
    } catch {
      // Audio error catch
    }
  }

  const toggleSolfeggio = () => {
    if (solfeggioActive) {
      stopAudio()
      setSolfeggioActive(false)
    } else {
      startAudio()
      setSolfeggioActive(true)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const metrics: IncenseVaultMetric[] = [
    {
      label: 'Long Mã Hoa Sen Thế 67',
      value: 'V67',
      subtext: 'Thất Tinh Triều Đẩu Cát Tường',
      detail: 'Thế Long Mã phi vân thứ 67 kết hợp đóa sen bách diệp Vàng 24K Filigree quy tụ linh khí đất trời phù trợ gia chủ.'
    },
    {
      label: 'Án Thờ Gỗ Sưa Đỏ Bắc Bộ',
      value: '400 Năm',
      subtext: 'Gỗ Sưa Đỏ Bắc Bộ vân 4 mặt',
      detail: 'Chế tác từ thân gỗ Sưa Đỏ Bắc Bộ cổ thụ 400 năm tuổi đỏ cam lấp lánh, thớ gỗ dẻo dai phát hương trầm thoang thoảng tự nhiên.'
    },
    {
      label: 'Vi Nhiệt Gia Nhiệt Trầm',
      value: `${temperature}°C`,
      subtext: 'Dải điều nhiệt vi phân 80°C - 240°C',
      detail: 'Gia nhiệt chuẩn xác không tạo khói hắc, bảo toàn trọn vẹn dải hương thơm thanh khiết của Kỳ Nam tự nhiên.'
    },
    {
      label: 'Tần Số Năng Lượng Thiền Định',
      value: '528Hz + 741Hz',
      subtext: 'Thanh lọc trường năng lượng thanh tịnh',
      detail: 'Hệ thống âm thoa kép Solfeggio kích hoạt sự an tịnh nội tâm và khơi nguồn tuệ giác trong không gian sống cao cấp.'
    }
  ]

  const vaultTabs = [
    {
      title: 'Đỉnh Lư Kim Long Mã Filigree Thế 67',
      subtitle: 'Đỉnh Cao Kim Hoàn Cung Đình',
      description: 'Đỉnh lư đúc đồng mắt cua nguyên khối mạ vàng 24K Filigree sợi chỉ 0.11mm tạo hình Long Mã phi vân thế thứ 67 (Thất Tinh Triều Đẩu), dâng đóa sen bách diệp ngọc phỉ thúy tỏa phúc lộc trường an.'
    },
    {
      title: 'Án Thờ Gỗ Sưa Đỏ Bắc Bộ 400 Năm',
      subtitle: 'Báu Vật Mộc Hoàng Triều',
      description: 'Án thờ gỗ Sưa Đỏ Bắc Bộ đại thụ 400 năm tuổi sấy ổn định ẩm 11% tại xưởng Thạnh Xuân 1.200m², bề mặt mài bóng tự nhiên bằng da thuộc mộc không sử dụng hóa chất công nghiệp.'
    },
    {
      title: 'Vi Điều Nhiệt Không Khói 80°C - 240°C',
      subtitle: 'Công Nghệ Nhiệt Vi Điện Tử Thụy Sĩ',
      description: 'Lõi sứ gốm gia nhiệt vi phân kiểm soát bước nhiệt 1°C, giải phóng tuần tự ba tầng hương Kỳ Nam: tiền vị thanh mát thảo mộc, trung vị ngọt mật ong rừng và hậu vị trầm ấm trường tồn.'
    },
    {
      title: 'Kỳ Nam Tự Nhiên Khánh Hòa Tuyển Trọn',
      subtitle: 'Trầm Hương Thượng Phẩm Hoàng Gia',
      description: 'Mỗi mẩu Kỳ Nam được tuyển chọn nghiêm ngặt từ vùng rừng già Khánh Hòa, lượng dầu trầm chiếm trên 72% khối lượng mang đến hương thơm thanh tao bất biến theo thời gian.'
    }
  ]

  return (
    <section className="relative w-full py-20 px-4 md:px-8 lg:px-12 bg-black text-stone-100 overflow-hidden border-t border-amber-900/30">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-900 to-black pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/40 text-amber-300 text-xs font-serif uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Nghi Thức Khứu Giác Thượng Lưu V67
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-100 tracking-wide mb-4">
            Đỉnh Lư Kim Long Mã Hoa Sen V67 Trên Án Sưa Đỏ Bắc Bộ 400 Năm
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            Tuyệt tác phong thủy khứu giác may đo bởi GuHomes dành riêng cho gia chủ yêu thích chiều sâu văn hóa phương Đông. Đỉnh lư Kim Long Mã thế thứ 67 kết hợp cùng hương thơm Kỳ Nam tự nhiên và tần số Solfeggio 528Hz & 741Hz.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {metrics.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-stone-900/70 border border-amber-900/30 backdrop-blur-md flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-serif text-amber-400/80 uppercase tracking-wider block mb-1">
                  {item.label}
                </span>
                <span className="text-2xl sm:text-3xl font-serif text-amber-200 font-medium block mb-1">
                  {item.value}
                </span>
                <span className="text-xs text-stone-300 font-light block mb-2">
                  {item.subtext}
                </span>
              </div>
              <p className="text-xs text-stone-400 font-light leading-normal border-t border-stone-800 pt-2">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Main Interactive Showcase Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14 bg-stone-900/40 p-6 sm:p-8 rounded-3xl border border-amber-900/20 backdrop-blur-md">
          {/* Visual Interactive Graphic */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-stone-950/90 rounded-2xl border border-stone-800 relative min-h-[350px] overflow-hidden">
            {/* Sacred Aroma Mist Simulation */}
            {sacredAromaActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.2, 0.55, 0.2],
                  scale: [1, 1.05, 1],
                  y: [-5, -15, -5]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-t from-amber-600/10 via-amber-400/5 to-transparent pointer-events-none"
              />
            )}

            {/* Sacred Dragon Horse Lotus Burner Graphic */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 200 200">
                {/* Altar Base Stand (Sưa Đỏ Bắc Bộ) */}
                <rect
                  x="40"
                  y="160"
                  width="120"
                  height="16"
                  rx="3"
                  fill="#9a3412"
                  stroke="#c2410c"
                  strokeWidth="1.5"
                />
                <rect
                  x="50"
                  y="150"
                  width="100"
                  height="10"
                  rx="2"
                  fill="#c2410c"
                />

                {/* Burner Body Foundation (Bronze & 24K Gold) */}
                <ellipse
                  cx="100"
                  cy="125"
                  rx="45"
                  ry="25"
                  fill="#b45309"
                  stroke="#f59e0b"
                  strokeWidth="2"
                />

                {/* Filigree Texture Lines */}
                <path
                  d="M65 125 Q100 140 135 125"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="1.5"
                  strokeDasharray="3 2"
                />

                {/* Dragon Horse Figurine Body */}
                <path
                  d="M85 110 C80 95, 95 80, 100 70 C105 80, 120 95, 115 110 Z"
                  fill="#f59e0b"
                  stroke="#fef08a"
                  strokeWidth="1"
                />

                {/* Blooming Lotus Petals Head */}
                <circle cx="100" cy="65" r="10" fill="#fde047" />
                <path
                  d="M90 65 Q100 45 110 65"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2"
                />
                <path
                  d="M85 65 Q100 40 115 65"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="1.5"
                />

                {/* Fragrance Wave (Active only when heating) */}
                {sacredAromaActive && (
                  <motion.g
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.4, 0.9, 0.4], y: [-2, -8, -2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <path
                      d="M100 45 Q95 30 100 15 Q105 5 100 -5"
                      fill="none"
                      stroke="rgba(251, 191, 36, 0.7)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </motion.g>
                )}
              </svg>
            </div>

            {/* Indicator Badges */}
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-amber-300 border border-amber-800/40">
                Nhiệt Độ: {temperature}°C
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-yellow-300 border border-yellow-800/40">
                Tỏa Hương Kỳ Nam: {sacredAromaActive ? 'Đang Lan Tỏa' : 'Tạm Dừng'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-serif bg-stone-900 text-amber-200 border border-amber-800/40">
                Âm Thoa Solfeggio: {solfeggioActive ? '528Hz + 741Hz Active' : 'Yên Tĩnh'}
              </span>
            </div>
          </div>

          {/* Interactive Controls Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <label htmlFor="temperature-range-v67" className="text-xs font-serif text-amber-400 uppercase tracking-wider block mb-2">
                Điều Khiển Nhiệt Độ Vi Nhiệt (80°C - 240°C)
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="temperature-range-v67"
                  type="range"
                  min="80"
                  max="240"
                  step="2"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                />
                <span className="text-sm font-serif text-amber-200 min-w-[56px] text-right font-semibold">
                  {temperature}°C
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1 font-light">
                Mức 165°C - 185°C là dải nhiệt hoàng kim giúp Kỳ Nam tự nhiên giải phóng trọn vẹn tinh dầu ngọt dịu nhất.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => setSacredAromaActive(!sacredAromaActive)}
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl border border-amber-700/50 bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 text-xs font-serif tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${sacredAromaActive ? 'bg-amber-400 animate-ping' : 'bg-stone-600'}`} />
                {sacredAromaActive ? 'Tắt Gia Nhiệt' : 'Bật Gia Nhiệt Trầm'}
              </button>

              <button
                type="button"
                onClick={toggleSolfeggio}
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl border border-yellow-700/50 bg-yellow-950/40 hover:bg-yellow-900/50 text-yellow-200 text-xs font-serif tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${solfeggioActive ? 'bg-yellow-400 animate-ping' : 'bg-stone-600'}`} />
                {solfeggioActive ? 'Dừng Solfeggio 528Hz' : 'Bật Solfeggio 528Hz'}
              </button>
            </div>

            {/* Tab Selector */}
            <div>
              <span className="text-xs font-serif text-amber-400 uppercase tracking-wider block mb-2">
                Chi Tiết Cấu Kiện Bảo Thất V67
              </span>
              <div className="grid grid-cols-2 gap-2">
                {vaultTabs.map((tab, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedVaultTab(idx)}
                    className={`min-h-[44px] px-3 py-2 rounded-xl text-left border transition-all text-xs font-serif ${
                      selectedVaultTab === idx
                        ? 'border-amber-500 bg-amber-950/70 text-amber-200 shadow-md shadow-amber-950/50'
                        : 'border-stone-800 bg-stone-900/50 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                    }`}
                  >
                    <span className="font-semibold block truncate">{tab.subtitle}</span>
                    <span className="text-[10px] text-stone-300 truncate block">{tab.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Tab Dynamic Content */}
        <AnimatePresence mode="wait">
          {vaultTabs[selectedVaultTab] && (
            <motion.div
              key={selectedVaultTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900/90 via-stone-900/70 to-stone-950/90 border border-amber-800/30 backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg sm:text-xl font-serif text-amber-200">
                  {vaultTabs[selectedVaultTab].title}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-serif bg-amber-950/80 border border-amber-700/50 text-amber-300 self-start sm:self-auto">
                  {vaultTabs[selectedVaultTab].subtitle}
                </span>
              </div>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                {vaultTabs[selectedVaultTab].description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quiet Luxury GuHomes Signature */}
        <div className="mt-14 text-center border-t border-stone-800/60 pt-8">
          <p className="text-xs text-stone-300 font-light tracking-wider">
            Chế tác độc quyền bởi <span className="text-amber-300 font-normal">GuHomes</span> · Xưởng may đo Thạnh Xuân 1.200m² · Giới hạn 12 công trình may đo mỗi năm.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV67
