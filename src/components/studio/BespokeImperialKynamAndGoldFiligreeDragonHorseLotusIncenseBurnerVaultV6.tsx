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
    name: 'Bạch Kỳ Ninh Hòa',
    origin: 'Đỉnh núi Ninh Hòa, Khánh Hòa',
    resinDensity: '99.8% chìm hoàn toàn trong nước',
    aromaProfile: 'Hương thanh khiết tuyệt đỉnh, ngọt sâu lắng đọng, hậu vị hoa lê tuyết & sương mai',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Hòn Hèo',
    origin: 'Bán đảo Hòn Hèo, Khánh Hòa',
    resinDensity: '99.8% đặc quánh như hắc ngọc',
    aromaProfile: 'Hương huyền bí, đầm ấm thâm sơn & nốt trầm cổ tích ngàn năm tĩnh mịch',
    burnTemp: 165,
  },
  {
    name: 'Hoàng Kỳ Vạn Ninh',
    origin: 'Rừng nguyên sinh Vạn Ninh, Khánh Hòa',
    resinDensity: '99.7% ánh hoàng kim ngọc tủy',
    aromaProfile: 'Hương hoàng tộc quý phái, ngọt mật ong hoa rừng & cam thảo sơn lâm',
    burnTemp: 140,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV6() {
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
        // ignore cleanup error
      }
    }
  }, [])

  const toggleHarmonics = () => {
    if (!isAudioHarmonics) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const gainNode = ctx.createGain()
        gainNode.gain.setValueAtTime(0.0001, ctx.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)

        const osc1 = ctx.createOscillator()
        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        const osc2 = ctx.createOscillator()
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(741, ctx.currentTime)

        osc1.connect(gainNode)
        osc2.connect(gainNode)
        gainNode.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc528Ref.current = osc1
        osc741Ref.current = osc2
        gainRef.current = gainNode
        setIsAudioHarmonics(true)
      } catch (e) {
        console.error('Audio Harmonics error:', e)
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
            osc528Ref.current = null
            osc741Ref.current = null
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

  const handleSelectKynam = (kynam: KynamSpec) => {
    setSelectedKynam(kynam)
    setCurrentTemp(kynam.burnTemp)
  }

  return (
    <section className="relative my-16 overflow-hidden rounded-3xl border border-amber-500/25 bg-gradient-to-b from-stone-950 via-stone-900 to-black p-6 sm:p-10 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-amber-700/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-amber-500/15 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Ngự Phẩm Hoàng Gia V6 · Tuyệt Tác Bảo Thất GuHomes
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-stone-100 tracking-tight">
              Bảo Thất Kỳ Nam &amp; Đỉnh Lư Kim Long Mã Đạp Sen Vàng 24K Filigree
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
              Biểu tượng &quot;Long Mã Đăng Phong - Vạn Thọ Vô Cương&quot; đúc đồng đỏ nguyên khối 10mm mạ vàng 24K, 
              kết hợp kỹ nghệ kim hoàn Filigree sợi vàng 0.18mm ngự trên án Gỗ Cẩm Lai Nam Bộ 330 năm tuổi đục chạm rồng thời Lý.
            </p>
          </div>

          {/* Web Audio 528Hz + 741Hz toggle button */}
          <button
            onClick={toggleHarmonics}
            className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
              isAudioHarmonics
                ? 'border-amber-400 bg-amber-500/20 text-amber-200 shadow-lg shadow-amber-500/20'
                : 'border-stone-700 bg-stone-800/80 text-stone-300 hover:border-amber-500/50 hover:text-amber-300'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isAudioHarmonics ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              )}
            </svg>
            <span>{isAudioHarmonics ? 'Hòa Âm 528Hz + 741Hz Đang Ngân' : 'Kích Hoạt Hòa Âm An Gia 528Hz + 741Hz'}</span>
          </button>
        </div>

        {/* Centerpiece Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Visual Display */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-xl relative overflow-hidden">
            {/* SVG Illustration of Golden Filigree Dragon Horse Incense Burner V6 */}
            <div className="relative aspect-[16/11] w-full flex items-center justify-center rounded-xl bg-stone-900/60 border border-stone-800/80 p-4">
              <svg viewBox="0 0 500 360" className="w-full h-full" fill="none">
                {/* Cam Lai Altar Base */}
                <rect x="70" y="270" width="360" height="30" rx="4" fill="#3b1d11" stroke="#854d0e" strokeWidth="1.5" />
                <rect x="90" y="300" width="40" height="45" rx="3" fill="#2d150b" stroke="#713f12" strokeWidth="1" />
                <rect x="370" y="300" width="40" height="45" rx="3" fill="#2d150b" stroke="#713f12" strokeWidth="1" />
                {/* Inlay accents */}
                <circle cx="110" cy="285" r="3.5" fill="#fde047" opacity="0.8" />
                <circle cx="150" cy="285" r="3" fill="#bae6fd" opacity="0.8" />
                <circle cx="350" cy="285" r="3" fill="#bae6fd" opacity="0.8" />
                <circle cx="390" cy="285" r="3.5" fill="#fde047" opacity="0.8" />

                {/* Lotus Pedestal Base */}
                <ellipse cx="250" cy="265" rx="100" ry="18" fill="#713f12" stroke="#ca8a04" strokeWidth="1.5" />
                <path d="M 170 265 Q 250 280 330 265" stroke="#facc15" strokeWidth="1" />

                {/* Lotus Petals 24K Gold Filigree */}
                <path d="M 180 260 C 190 230, 220 220, 250 220 C 280 220, 310 230, 320 260 Z" fill="#854d0e" stroke="#eab308" strokeWidth="2" />
                <path d="M 210 255 C 220 235, 235 230, 250 230 C 265 230, 280 235, 290 255 Z" fill="#a16207" stroke="#fde047" strokeWidth="1.5" />

                {/* Dragon Horse (Long Mã) Motif */}
                <path d="M 220 220 Q 195 160 230 135 Q 250 115 270 135 Q 305 160 280 220 Z" fill="#ca8a04" stroke="#facc15" strokeWidth="2.5" />
                {/* Flame mane & dragon scales */}
                <path d="M 210 180 Q 180 160 195 200 Z" fill="#eab308" stroke="#fef08a" strokeWidth="1.2" />
                <path d="M 290 180 Q 320 160 305 200 Z" fill="#eab308" stroke="#fef08a" strokeWidth="1.2" />
                {/* Long Ma head with horns & hooves */}
                <path d="M 235 130 Q 215 110 205 115" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 265 130 Q 285 110 295 115" stroke="#fef08a" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="240" cy="128" r="2.5" fill="#ef4444" />
                <circle cx="260" cy="128" r="2.5" fill="#ef4444" />

                {/* Top Chamber for Kynam */}
                <ellipse cx="250" cy="115" rx="35" ry="12" fill="#713f12" stroke="#facc15" strokeWidth="2" />
                <path d="M 225 115 L 235 85 L 265 85 L 275 115 Z" fill="#854d0e" stroke="#eab308" strokeWidth="1.5" />
                <circle cx="250" cy="80" r="7" fill="#eab308" stroke="#fef08a" strokeWidth="1.5" />

                {/* Animated Incense Smoke */}
                <AnimatePresence>
                  {isIncenseActive && (
                    <motion.g
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.path
                        d="M 250 73 Q 240 45 255 30 T 245 10"
                        stroke="#fef3c7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                        animate={{
                          d: [
                            'M 250 73 Q 240 45 255 30 T 245 10',
                            'M 250 73 Q 260 45 245 30 T 255 10',
                            'M 250 73 Q 240 45 255 30 T 245 10',
                          ],
                        }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.circle
                        cx="250"
                        cy="25"
                        r="18"
                        fill="url(#smokeGlow151)"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>

                <defs>
                  <radialGradient id="smokeGlow151" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Micro Controls for Smoke & Temperature */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsIncenseActive(!isIncenseActive)}
                  className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    isIncenseActive
                      ? 'border-amber-400 bg-amber-500/20 text-amber-200'
                      : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-amber-500/40'
                  }`}
                >
                  {isIncenseActive ? 'Dừng Tỏa Hương' : 'Khởi Phát Tỏa Hương Kỳ Nam'}
                </button>
              </div>

              {/* Temperature slider */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Nhiệt Độ Ủ:</span>
                <input
                  type="range"
                  min="80"
                  max="240"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="w-24 accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-amber-300 min-w-[42px]">{currentTemp}°C</span>
              </div>
            </div>
          </div>

          {/* Kynam Selection & Technical Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/50 p-6 backdrop-blur-xl">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                Tuyển Phẩm Kỳ Nam &amp; Thông Số Cung Đình
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                Bảo vật truyền đời, kiểm định nghiêm ngặt từ xưởng GuHomes Thạnh Xuân.
              </p>

              {/* Kynam list selection */}
              <div className="mt-4 space-y-2.5">
                {KY_NAM_VARIETIES.map((kynam) => (
                  <button
                    key={kynam.name}
                    onClick={() => handleSelectKynam(kynam)}
                    className={`w-full text-left rounded-xl border p-3 transition-all ${
                      selectedKynam.name === kynam.name
                        ? 'border-amber-500/60 bg-amber-500/10 shadow-md'
                        : 'border-stone-800/80 bg-stone-950/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-200">{kynam.name}</span>
                      <span className="text-xs font-mono text-amber-400/80">{kynam.burnTemp}°C</span>
                    </div>
                    <p className="mt-1 text-xs text-stone-400">{kynam.origin}</p>
                    <div className="mt-2 text-[11px] text-stone-300 italic">{kynam.aromaProfile}</div>
                  </button>
                ))}
              </div>

              {/* Current Material Spec Box */}
              <div className="mt-4 rounded-xl border border-stone-800 bg-stone-950/70 p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Chất Liệu Đỉnh Lư:</span>
                  <span className="font-medium text-amber-300">Đồng Đỏ 10mm · Vàng 24K Filigree</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Án Thờ Ngự Dụng:</span>
                  <span className="font-medium text-amber-300">Gỗ Cẩm Lai 330 Năm Tuổi</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Độ Thuần Khiết Dầu:</span>
                  <span className="font-medium text-emerald-300">{selectedKynam.resinDensity}</span>
                </div>
              </div>
            </div>

            {/* Brand Signature */}
            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
              <span className="text-[11px] font-serif text-amber-400">
                GuHomes Atelier · Xưởng Mộc May Đo Thạnh Xuân 1.200m²
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV6
