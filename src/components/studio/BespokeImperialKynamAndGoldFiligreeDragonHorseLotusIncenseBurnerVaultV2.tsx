'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KynamSpec {
  id: string
  name: string
  origin: string
  resinDensity: string
  aromaProfile: string
  idealTemp: number
  description: string
}

const KYNAM_COLLECTION: KynamSpec[] = [
  {
    id: 'thanh-kynam',
    name: 'Thanh Kỳ Nam Hòn Bà',
    origin: 'Rừng nguyên sinh Hòn Bà, Khánh Hòa',
    resinDensity: '97.9% tinh dầu hóa thạch',
    aromaProfile: 'Hương the mát bạc hà rừng sâu, hậu vị ngọt thanh vương vấn',
    idealTemp: 135,
    description: 'Báu vật trầm hương quý hiếm ngưng tụ hàng trăm năm từ thân cây dó bầu cổ thụ vùng núi mù sương.',
  },
  {
    id: 'bach-kynam',
    name: 'Bạch Kỳ Nam Vạn Ninh',
    origin: 'Núi cao Vạn Ninh, Khánh Hòa',
    resinDensity: '99.6% sợi dầu tơ trắng hoàng gia',
    aromaProfile: 'Hương hoa linh lan huyền ảo, ngọt ngào thuần khiết, thanh lọc tâm trí',
    idealTemp: 160,
    description: 'Phẩm cấp Kỳ Nam tối thượng với những thớ gỗ phủ lớp tinh dầu tơ trắng bạc lấp lánh như sương tuyết cổ xưa.',
  },
  {
    id: 'hoang-kynam',
    name: 'Hoàng Kỳ Nam Hòn Hèo',
    origin: 'Bán đảo Hòn Hèo, Khánh Hòa',
    resinDensity: '97.2% mật hổ phách tự nhiên',
    aromaProfile: 'Hương mật ong rừng già ấm áp, nốt trầm thơm ngọt dịu dàng lan tỏa',
    idealTemp: 185,
    description: 'Sắc vàng hổ phách óng ánh, lượng tinh dầu đậm đặc chỉ cần đốt nóng nhẹ đã lan tỏa khắp không gian tĩnh thiền.',
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV2() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KYNAM_COLLECTION[0]!)
  const [temperature, setTemperature] = useState<number>(135)
  const [isIncenseBurning, setIsIncenseBurning] = useState<boolean>(true)
  const [bellActive, setBellActive] = useState<boolean>(false)
  const [viewAngle, setViewAngle] = useState<'front' | 'top' | 'pedestal'>('front')

  // Web Audio Context for Imperial Bells
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playImperialBell = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = audioCtxRef.current || new AudioCtx()
      audioCtxRef.current = ctx

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 2.6)

      setBellActive(true)
      setTimeout(() => setBellActive(false), 2500)
    } catch (err) {
      console.error('Audio play error:', err)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0c] py-28 text-[#ebe8e1]">
      {/* Background golden dust subtle aura */}
      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-[#d4af37] blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-[#8f6d2b] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#151619] px-4 py-1.5 text-xs tracking-widest text-[#d4af37]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            BẢO THẤT THƯỞNG TRẦM HOÀNG GIA · KỸ NGHỆ FILIGREE VÀNG 24K
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-light tracking-wide text-[#f7f5f0] md:text-5xl"
          >
            Đỉnh Lư Long Mã Đạp Sen & Kỳ Nam Thượng Uyển
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#a8a59e] md:text-base"
          >
            Sự hội tụ tinh hoa giữa đỉnh lư tạo hình Long Mã "Long Mã Hà Đồ" đạp sen vàng 24K filigree biểu trưng cho trí tuệ và hanh thông vạn sự,
            án ngự chế tác từ gỗ Trắc Đen Nam Bộ bách niên 275 năm cẩn Phỉ Thúy Type A, và hệ thống điều nhiệt vi phân 80°C - 240°C gìn giữ vẹn nguyên tinh dầu Kỳ Nam quý hiếm.
          </motion.p>
        </div>

        {/* Master Showcase Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive Vault Visualizer (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#262522] bg-[#121214] p-6 lg:col-span-7">
            {/* Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#21201d] pb-4">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
                <span className="font-mono text-xs tracking-wider text-[#bfbaa9]">
                  TRẠNG THÁI: {isIncenseBurning ? 'HƯƠNG TRẦM LAN TỎA' : 'TĨNH THIỀN'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsIncenseBurning(!isIncenseBurning)}
                  className={`rounded border px-3 py-1 text-xs transition-colors ${
                    isIncenseBurning
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                      : 'border-[#33322d] bg-[#1a1917] text-[#9c998f]'
                  }`}
                >
                  {isIncenseBurning ? 'Tắt Lò Xông' : 'Kích Hoạt Hương Trầm'}
                </button>
                <button
                  type="button"
                  onClick={() => playImperialBell(528)}
                  disabled={bellActive}
                  className="rounded border border-[#4a3f29] bg-[#1e1c17] px-3 py-1 text-xs text-[#d4af37] transition-colors hover:border-[#d4af37]"
                >
                  {bellActive ? 'Chuông ngân 528Hz...' : 'Thỉnh Chuông Khánh'}
                </button>
              </div>
            </div>

            {/* Central Incense Chamber Art Display */}
            <div className="relative my-6 flex min-h-[360px] flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#181715] to-[#0c0c0d] p-8">
              {/* Animated Smoke Plumes */}
              {isIncenseBurning && (
                <div className="pointer-events-none absolute top-12 flex flex-col items-center">
                  <motion.div
                    animate={{ y: [-10, -50], opacity: [0.6, 0], scale: [0.8, 1.6] }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'easeOut' }}
                    className="h-10 w-10 rounded-full bg-gradient-to-t from-[#e0cfab]/30 to-transparent blur-md"
                  />
                  <motion.div
                    animate={{ y: [-5, -60], opacity: [0.4, 0], scale: [0.6, 1.8] }}
                    transition={{ repeat: Infinity, duration: 4.1, delay: 0.8, ease: 'easeOut' }}
                    className="h-8 w-8 rounded-full bg-gradient-to-t from-[#c5a059]/25 to-transparent blur-lg"
                  />
                </div>
              )}

              {/* Incense Burner 3D Silhouette */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Filigree Dragon Horse Lid */}
                <div className="relative flex h-24 w-28 items-center justify-center rounded-t-full border-t-2 border-l-2 border-r-2 border-[#d4af37] bg-gradient-to-b from-[#473919] to-[#2b220d] shadow-lg">
                  <div className="text-center">
                    <span className="text-2xl">🐉🐎</span>
                    <div className="text-[9px] tracking-wider text-[#f5de8e]">LONG MÃ ĐẠP SEN</div>
                  </div>
                  {/* Filigree perforations */}
                  <div className="absolute bottom-1 flex gap-1">
                    <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
                    <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
                    <span className="h-1 w-1 rounded-full bg-[#d4af37]" />
                  </div>
                </div>

                {/* Central Chamber Body */}
                <div className="relative flex h-24 w-36 items-center justify-center border-l-2 border-r-2 border-[#8f6d2b] bg-gradient-to-r from-[#211a0c] via-[#3d3115] to-[#211a0c] shadow-2xl">
                  <div className="text-center">
                    <div className="font-mono text-xs text-[#d4af37]">{temperature}°C</div>
                    <div className="text-[10px] text-[#ad9661]">{selectedKynam.name}</div>
                  </div>
                </div>

                {/* Golden Lotus Pedestal */}
                <div className="flex h-12 w-48 items-center justify-around rounded-b-xl border-b-2 border-l-2 border-r-2 border-[#d4af37] bg-gradient-to-t from-[#362a0e] to-[#241c09] px-2 text-[10px] text-[#e0cfab]">
                  <span>🪷 Cánh Sen Vàng</span>
                  <span>Án Trắc Đen 275N</span>
                  <span>🪷 Cánh Sen Vàng</span>
                </div>
              </div>

              {/* Angle Switcher */}
              <div className="mt-8 flex gap-3 text-xs">
                {(['front', 'top', 'pedestal'] as const).map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setViewAngle(angle)}
                    className={`rounded border px-3 py-1 capitalize transition-colors ${
                      viewAngle === angle
                        ? 'border-[#d4af37] text-[#d4af37]'
                        : 'border-[#33312a] text-[#8c887d] hover:text-[#dcd8cd]'
                    }`}
                  >
                    Góc: {angle === 'front' ? 'Chính diện' : angle === 'top' ? 'Mặt nắp nạp' : 'Bệ tam túc'}
                  </button>
                ))}
              </div>
            </div>

            {/* Precision Temperature Heating Slider */}
            <div className="border-t border-[#21201d] pt-4">
              <div className="flex justify-between text-xs">
                <span className="text-[#a8a59e]">Bộ Điều Nhiệt Vi Sai Trầm Kỳ (80°C - 240°C)</span>
                <span className="font-mono text-[#d4af37]">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#272521] accent-[#d4af37]"
              />
              <div className="mt-1 flex justify-between text-[10px] text-[#78756d]">
                <span>Nhiệt khởi hương (80°C)</span>
                <span>Nhiệt lý tưởng ({selectedKynam.idealTemp}°C)</span>
                <span>Cực đại (240°C)</span>
              </div>
            </div>
          </div>

          {/* Kynam Spec & Craftsmanship Details (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#262522] bg-[#121214] p-6 lg:col-span-5">
            <div>
              <h3 className="border-b border-[#21201d] pb-3 text-xs font-medium tracking-wider text-[#d4af37]">
                BỘ SƯU TẬP TRẦM KỲ NAM THƯỢNG HẠNG
              </h3>

              {/* Kynam Selection Radios */}
              <div className="mt-4 space-y-3">
                {KYNAM_COLLECTION.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedKynam(item)
                      setTemperature(item.idealTemp)
                    }}
                    className={`cursor-pointer rounded-xl border p-3 transition-all ${
                      selectedKynam.id === item.id
                        ? 'border-[#d4af37] bg-[#1f1c16]'
                        : 'border-[#242320] bg-[#161517] hover:border-[#423d2f]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm text-[#f5f3ec]">{item.name}</span>
                      <span className="font-mono text-xs text-[#d4af37]">{item.idealTemp}°C</span>
                    </div>
                    <div className="mt-1 text-[11px] text-[#8c887e]">{item.origin}</div>
                  </div>
                ))}
              </div>

              {/* Selected Spec Deep Info */}
              <div className="mt-6 rounded-xl border border-[#2b2822] bg-[#171618] p-4 text-xs">
                <div className="font-serif text-sm text-[#e8c872]">{selectedKynam.name}</div>
                <div className="mt-2 space-y-1.5 text-[11px] text-[#b3afa6]">
                  <div>• Hàm lượng tinh dầu: {selectedKynam.resinDensity}</div>
                  <div>• Hương thơm đặc trưng: {selectedKynam.aromaProfile}</div>
                  <div>• Tác dụng: Thư thái tinh thần, định tâm, nâng cao năng lượng không gian</div>
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-[#8f8c83]">{selectedKynam.description}</p>
              </div>
            </div>

            {/* Craftsmanship Note */}
            <div className="mt-6 border-t border-[#21201d] pt-4 text-[11px] text-[#73716a]">
              Án gỗ Trắc đen cẩn Phỉ Thúy Type A · Chế tác thủ công độc bản bởi nghệ nhân GuHomes · Hotline: 0368 757 916.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV2
