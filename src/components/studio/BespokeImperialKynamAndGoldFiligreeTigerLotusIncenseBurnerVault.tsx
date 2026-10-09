'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KynamSpec {
  name: string
  origin: string
  oilDensity: string
  scentProfile: string
  optimalTemp: number
  rarityLevel: string
}

const KYNAM_COLLECTION: KynamSpec[] = [
  {
    name: 'Thanh Kỳ Nam Hòn Bà',
    origin: 'Đỉnh Hòn Bà 1.500m, Khánh Hòa',
    oilDensity: '97.0% thể tích tinh dầu hóa thạch',
    scentProfile: 'Hương thơm ngọt dịu, the mát như bạc hà rừng, lưu hương trên 14 giờ',
    optimalTemp: 160,
    rarityLevel: 'Phẩm cấp Hoàng Cung cực phẩm',
  },
  {
    name: 'Bạch Kỳ Nam Vạn Ninh',
    origin: 'Vạn Ninh, Khánh Hòa',
    oilDensity: '99.0% hóa thạch tơ trắng chìm nước',
    scentProfile: 'Hương hoa linh lan quyện mật ong rừng, thanh khiết không vướng khói',
    optimalTemp: 155,
    rarityLevel: 'Báu vật vô giá truyền đời',
  },
  {
    name: 'Hoàng Kỳ Nam Hòn Hèo',
    origin: 'Bán đảo Hòn Hèo, Khánh Hòa',
    oilDensity: '96.0% sắc vàng hổ phách đanh chắc',
    scentProfile: 'Ngọt ngào như kẹo sữa và hạnh nhân nướng, ấm áp an thần',
    optimalTemp: 170,
    rarityLevel: 'Đại nội thượng uyển',
  },
]

export function BespokeImperialKynamAndGoldFiligreeTigerLotusIncenseBurnerVault() {
  const [selectedKynam, setSelectedKynam] = useState<number>(0)
  const [currentTemp, setCurrentTemp] = useState<number>(160)
  const [isIncenseBurning, setIsIncenseBurning] = useState<boolean>(false)
  const [isChimePlaying, setIsChimePlaying] = useState<boolean>(false)

  const activeKynam = KYNAM_COLLECTION[selectedKynam] || KYNAM_COLLECTION[0]!

  const playChimeTone = (freq1 = 528, freq2 = 741) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()

      // Primary tone
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(freq1, ctx.currentTime)
      gain1.gain.setValueAtTime(0.06, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start()
      osc1.stop(ctx.currentTime + 1.2)

      // Harmonic secondary tone
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(freq2, ctx.currentTime)
      gain2.gain.setValueAtTime(0.04, ctx.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start()
      osc2.stop(ctx.currentTime + 1.4)

      setIsChimePlaying(true)
      setTimeout(() => setIsChimePlaying(false), 1200)
    } catch {
      // Safe audio fallback
    }
  }

  const handleStartIncense = () => {
    playChimeTone(528, 741)
    setIsIncenseBurning(true)
  }

  const handleStopIncense = () => {
    setIsIncenseBurning(false)
  }

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0b0a09] text-[#eae5dc] overflow-hidden border-t border-[#29221a]">
      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow and Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#29221a] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1712] border border-[#3d3021] text-[#c5a880] text-xs uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
              Bảo Thất Thưởng Trầm Hoàng Gia GuHomes
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f5f0e6] tracking-tight">
              Đỉnh Lư Vàng 24K Kim Hổ Đạp Sen & Bảo Thất Kỳ Nam
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#9e9280] max-w-2xl font-light leading-relaxed">
              Tạo hình Kim Hổ Hổ Khiếu Sơn Hà ngự trên đài hoa sen vàng 24K Filigree siêu vi 0.18mm, án gỗ Mun hoa Khánh Hòa 240 năm cẩn Phỉ Thúy Type A và bộ điều nhiệt vi phân 80°C - 240°C.
            </p>
          </div>

          {/* Kynam Selection Buttons */}
          <div className="flex flex-wrap gap-2">
            {KYNAM_COLLECTION.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  playChimeTone(440, 660)
                  setSelectedKynam(idx)
                  setCurrentTemp(item.optimalTemp)
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
                  selectedKynam === idx
                    ? 'bg-[#c5a880] text-[#14120f] border-[#c5a880] shadow-md'
                    : 'bg-[#181410] text-[#a19483] border-[#2e261e] hover:border-[#4d3f31] hover:text-[#ebe4d8]'
                }`}
              >
                {item.name.split(' ')[0]} {item.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Vault Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Incense Burner Visualizer */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#3b3021] bg-gradient-to-b from-[#1c1813] via-[#14110e] to-[#0c0907] shadow-2xl p-6 flex flex-col justify-between">
              {/* Status Header */}
              <div className="flex items-center justify-between z-10">
                <span className="text-xs px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-[#443725] text-[#c5a880] font-mono">
                  {activeKynam.rarityLevel}
                </span>
                <span className={`text-xs px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-[#443725] font-mono ${isIncenseBurning ? 'text-[#e69850] animate-pulse' : 'text-[#877969]'}`}>
                  {isIncenseBurning ? `Nhiệt độ tỏa hương: ${currentTemp}°C` : 'Chờ kích hoạt'}
                </span>
              </div>

              {/* Incense & Smoke Visual Animation */}
              <div className="relative flex-1 flex items-center justify-center my-4">
                {/* Smoke particles */}
                {isIncenseBurning && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      animate={{
                        y: [-10, -60, -100],
                        opacity: [0, 0.6, 0],
                        scale: [0.8, 1.4, 2],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                      className="w-12 h-12 rounded-full bg-gradient-to-t from-[#d99f6c]/30 to-transparent blur-md"
                    />
                  </div>
                )}

                {/* Central Incense Burner representation */}
                <div className="relative flex flex-col items-center">
                  {/* Tiger Lotus Incense Burner Art */}
                  <motion.div
                    animate={{ scale: isIncenseBurning ? [1, 1.02, 1] : 1 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-44 h-44 rounded-2xl bg-gradient-to-b from-[#3a2c1d] via-[#291f15] to-[#1c150e] border-2 border-[#806443] shadow-2xl flex flex-col items-center justify-center p-3 text-center"
                  >
                    <span className="text-3xl mb-1">🐯</span>
                    <span className="text-[10px] text-[#c5a880] font-serif uppercase tracking-widest">Kim Hổ Đạp Sen</span>
                    <span className="text-[9px] text-[#8c7b68] mt-1 font-light">Vàng 24K Filigree & Đồng Đỏ</span>
                  </motion.div>

                  {/* Altar Stand */}
                  <div className="w-56 h-4 bg-gradient-to-r from-[#211811] via-[#3d2c1f] to-[#211811] rounded-b-lg border-t border-[#664b32] mt-1 shadow-lg" />
                </div>
              </div>

              {/* Interactive Temperature Control */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 z-10 pt-2 border-t border-[#292117]">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#9c8f7d]">
                    <span>Nhiệt độ tỏa hương: {currentTemp}°C</span>
                    <span>80°C - 240°C</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="240"
                    value={currentTemp}
                    onChange={(e) => setCurrentTemp(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#261f18] rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={isIncenseBurning ? handleStopIncense : handleStartIncense}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      isIncenseBurning
                        ? 'bg-[#3b2316] text-[#f2a879] border-[#6b3d24] shadow-md'
                        : 'bg-[#c5a880] text-[#14120f] border-[#c5a880] hover:bg-[#d6bc98]'
                    }`}
                  >
                    {isIncenseBurning ? 'Dừng Tỏa Hương' : 'Khai Đốt Trầm Kỳ'}
                  </button>
                  <button
                    type="button"
                    onClick={() => playChimeTone(528, 741)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#211b15] hover:bg-[#2e261e] border border-[#3d3123] text-[#d4b996] transition-colors"
                  >
                    {isChimePlaying ? 'Âm Ngân...' : 'Thỉnh Chuông Kép'}
                  </button>
                </div>
              </div>
            </div>

            {/* Specifications Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e251b] text-center">
                <p className="text-[11px] text-[#807463] uppercase">Hàm lượng dầu</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">{activeKynam.oilDensity.split(' ')[0]}</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e251b] text-center">
                <p className="text-[11px] text-[#807463] uppercase">Gỗ án ngự</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">Mun Hoa 240 Năm</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e251b] text-center">
                <p className="text-[11px] text-[#807463] uppercase">Ngọc khảm</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">Phỉ Thúy Type A</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e251b] text-center">
                <p className="text-[11px] text-[#807463] uppercase">Tần số chuông</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">528Hz & 741Hz</p>
              </div>
            </div>
          </div>

          {/* Details & Curated Notes */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs text-[#c5a880] uppercase tracking-widest font-mono">
                Bảo Vật Trầm Kỳ Thượng Uyển
              </span>
              <h3 className="text-2xl font-serif text-[#f7f4ee] mt-1">
                {activeKynam.name}
              </h3>
              <p className="text-xs text-[#a69986] mt-1 italic">
                Xuất xứ: {activeKynam.origin}
              </p>
            </div>

            {/* Scent Profile */}
            <div className="p-4 rounded-xl bg-[#1a1612] border border-[#382d1f] space-y-2">
              <h4 className="text-xs font-serif text-[#c5a880] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                Tầng Hương & Cảm Thức Khứu Giác
              </h4>
              <p className="text-xs sm:text-sm text-[#c9bfae] font-light leading-relaxed">
                {activeKynam.scentProfile}
              </p>
            </div>

            {/* Incense Burner Craftsmanship */}
            <div className="space-y-2 text-xs">
              <h4 className="font-serif text-[#c5a880] uppercase tracking-wider">
                Kỹ Nghệ Kim Hoàn Cung Đình & Phong Thủy
              </h4>
              <ul className="space-y-1.5 text-[#a89d8c] font-light">
                <li className="flex items-start gap-2">
                  <span className="text-[#8a7a66]">•</span>
                  <span>Tạo hình Kim Hổ Đạp Sen biểu trưng cho quyền uy tối thượng, hộ trì gia chủ và hóa giải tà khí.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a7a66]">•</span>
                  <span>Đài sen vàng 24K đan sợi Filigree 0.18mm thông khí đa chiều giúp tinh dầu thăng hoa tinh khiết.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#8a7a66]">•</span>
                  <span>Án gỗ Mun hoa Khánh Hòa 240 năm tuổi nẹp đồng cổ và cẩn Phỉ Thúy xanh ngọc thấu quang 98.0%.</span>
                </li>
              </ul>
            </div>

            {/* Direct Consultation Link */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#1c1813] to-[#14110d] border border-[#3b3022] flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
              <div>
                <p className="text-xs text-[#c5a880] font-serif font-medium">Bảo thất may đo GuHomes</p>
                <p className="text-[11px] text-[#8a7f70]">Tư vấn thiết kế không gian thưởng trầm riêng biệt</p>
              </div>
              <a
                href="tel:0368757916"
                className="px-4 py-2 rounded-lg bg-[#c5a880] hover:bg-[#d6bc98] text-[#14120f] text-xs font-medium text-center transition-all shadow-sm"
              >
                KTS Trưởng: 0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeTigerLotusIncenseBurnerVault
