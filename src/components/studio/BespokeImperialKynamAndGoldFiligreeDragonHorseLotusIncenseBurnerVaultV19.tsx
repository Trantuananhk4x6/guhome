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

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV19() {
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
        console.error('AudioContext initiation error:', err)
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

  const handleSelectKynam = (kynam: KynamSpec) => {
    setSelectedKynam(kynam)
    setCurrentTemp(kynam.burnTemp)
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 text-stone-200 shadow-2xl backdrop-blur-md md:p-10 my-10">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-amber-950/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-rose-950/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-stone-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-amber-800/50 bg-amber-950/60 px-3 py-0.5 text-xs font-medium text-amber-300">
                GuHomes Royal Atelier Series
              </span>
              <span className="inline-flex items-center rounded-full border border-rose-800/40 bg-rose-950/50 px-2.5 py-0.5 text-xs font-semibold text-rose-400">
                Bảo Thất Kim Long Mã V19
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-light tracking-wide text-stone-100 sm:text-3xl">
              Đỉnh Lư Kim Long Mã Đạp Sen Vàng 24K Filigree V19 & Bảo Thất Kỳ Nam
            </h3>
            <p className="mt-1 text-sm text-stone-400">
              Kiệt tác án thư Gỗ Trắc Đỏ Nam Bộ 395 năm - Bộ vi điều nhiệt gốm điện trở 80°C - 240°C bảo toàn trọn vẹn tinh dầu Kỳ Nam
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                isAudioHarmonics
                  ? 'border-rose-500/80 bg-rose-950/50 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.25)]'
                  : 'border-stone-700/60 bg-stone-900/60 text-stone-300 hover:border-rose-600/50 hover:bg-stone-800/60'
              }`}
              style={{ minHeight: '44px', minWidth: '44px' }}
              title="Kích hoạt âm thanh Solfeggio 528Hz & 741Hz"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span>{isAudioHarmonics ? 'Hòa Âm Bát Độ (528Hz + 741Hz)' : 'Kích Hoạt Thanh Âm'}</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Showcase */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur lg:col-span-7">
            <div className="relative flex h-80 w-full max-w-md flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-4">
              {/* Incense Smoke Aura Animation */}
              <AnimatePresence>
                {isIncenseActive && (
                  <div className="absolute top-8 flex flex-col items-center pointer-events-none">
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{
                        opacity: [0.2, 0.7, 0.4, 0.8, 0],
                        y: [-10, -50, -90, -130],
                        scale: [0.9, 1.3, 1.8, 2.2],
                        x: [0, 8, -6, 12, -4],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4.5,
                        ease: 'easeInOut',
                      }}
                      className="h-14 w-14 rounded-full bg-gradient-to-t from-amber-200/40 via-yellow-100/20 to-transparent blur-md"
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{
                        opacity: [0, 0.5, 0.2, 0],
                        y: [-20, -70, -120],
                        x: [-4, 6, -8],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3.8,
                        delay: 1.2,
                        ease: 'easeInOut',
                      }}
                      className="h-10 w-10 rounded-full bg-amber-400/20 blur-sm"
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Dragon Horse Incense Burner Centerpiece */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Gold Filigree Dragon Horse Cap */}
                <motion.div
                  animate={{
                    y: isIncenseActive ? [-1, 1, -1] : 0,
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="relative flex flex-col items-center"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-yellow-500/60 bg-gradient-to-br from-amber-400/20 via-yellow-500/10 to-amber-900/30 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
                    {/* SVG Filigree Dragon Horse Icon */}
                    <svg className="h-12 w-12 text-yellow-400" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M24 4c2 4 5 6 9 6-2 3-1 7 2 9-4 2-5 6-4 10-3-1-6 0-8 3-2-3-5-4-8-3 1-4 0-8-4-10 3-2 4-6 2-9 4 0 7-2 9-6z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.2}
                        d="M24 16v16m-6-10l12 4m-12 0l12-4"
                      />
                      <circle cx="24" cy="24" r="3" fill="#fbbf24" fillOpacity={0.6} />
                    </svg>
                  </div>
                  <span className="mt-1 rounded border border-yellow-600/40 bg-yellow-950/70 px-2 py-0.5 text-[9px] font-mono text-yellow-300">
                    Kim Long Mã 24K Filigree V19
                  </span>
                </motion.div>

                {/* Lotus Burner Chamber */}
                <div className="mt-2 flex h-14 w-32 items-center justify-center rounded-2xl border border-rose-600/60 bg-gradient-to-b from-rose-950/40 via-stone-900 to-black px-3 shadow-inner">
                  <div className="text-center">
                    <div className="text-[10px] text-rose-300/90 font-medium">Bảo Thất Hương Phòng</div>
                    <div className="font-mono text-xs text-yellow-400">
                      {isIncenseActive ? `${currentTemp}°C - Đang Xông` : 'Chế Độ Nghỉ'}
                    </div>
                  </div>
                </div>

                {/* Red Rosewood Altar Base */}
                <div className="mt-2 h-7 w-56 rounded-md border-t-2 border-rose-900 bg-gradient-to-r from-rose-950 via-stone-900 to-rose-950 shadow-xl flex items-center justify-center">
                  <span className="text-[9px] tracking-widest uppercase text-rose-300">
                    Án Thư Trắc Đỏ Nam Bộ 395 Năm
                  </span>
                </div>
              </div>

              {/* Status indicator bar */}
              <div className="mt-4 flex w-full justify-between px-4 text-[11px] text-stone-400">
                <span>Trạng Thái Lò: <strong className={isIncenseActive ? 'text-amber-300' : 'text-stone-300'}>{isIncenseActive ? 'Nhiệt Ổn Định' : 'Chờ Lệnh'}</strong></span>
                <span>Tỉ Lệ Chìm: <strong className="text-yellow-400">{selectedKynam.resinDensity.split(' ')[0]}</strong></span>
              </div>
            </div>
          </div>

          {/* Controls & Configuration */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="space-y-4">
              {/* Variety Selection */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Lựa Chọn Kỳ Nam Thượng Hạng
                </label>
                <div className="mt-2 space-y-2">
                  {KY_NAM_VARIETIES.map((k) => (
                    <button
                      key={k.name}
                      onClick={() => handleSelectKynam(k)}
                      className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                        selectedKynam.name === k.name
                          ? 'border-rose-500/80 bg-rose-950/40 text-rose-200'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:bg-stone-800/50'
                      }`}
                      style={{ minHeight: '44px' }}
                    >
                      <div className="flex items-center justify-between text-xs font-medium">
                        <span>{k.name}</span>
                        <span className="font-mono text-yellow-400">{k.burnTemp}°C</span>
                      </div>
                      <div className="mt-0.5 text-[10px] text-stone-400">{k.origin}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature Adjuster */}
              <div>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-semibold uppercase tracking-wider">Nhiệt Độ Vi Điều Khiển</span>
                  <span className="font-mono text-rose-300 font-semibold">{currentTemp}°C (Khoảng 80°C - 240°C)</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="240"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="mt-2 w-full accent-rose-500"
                />
              </div>

              {/* Incense Power Toggle */}
              <div>
                <button
                  onClick={() => setIsIncenseActive(!isIncenseActive)}
                  className={`w-full rounded-xl border py-3 text-xs font-semibold tracking-wider uppercase transition-all ${
                    isIncenseActive
                      ? 'border-red-500/60 bg-red-950/40 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                      : 'border-rose-500/60 bg-rose-900/40 text-rose-200 hover:bg-rose-800/40'
                  }`}
                  style={{ minHeight: '44px' }}
                >
                  {isIncenseActive ? 'Dừng Xông Bảo Thất' : 'Khởi Động Lò Xông Kỳ Nam V19'}
                </button>
              </div>
            </div>

            {/* Selected Profile Details */}
            <div className="mt-5 border-t border-stone-800/80 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Đặc Tính Trầm Tích & Hương Vị
              </h4>
              <p className="mt-1 text-xs italic text-rose-200/90">
                &quot;{selectedKynam.aromaProfile}&quot;
              </p>
              <div className="mt-2 text-[11px] text-stone-400">
                <span>Mật độ nhựa: </span>
                <span className="text-stone-300 font-medium">{selectedKynam.resinDensity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* GuHomes Craftsmanship Guarantee */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-800/60 bg-stone-950/60 px-6 py-4 text-xs text-stone-400">
          <div>
            <span className="font-semibold text-rose-300">Cam Kết Chế Tác GuHomes:</span> Xưởng may đo Thạnh Xuân 1.200m² - Giới hạn 12 tuyệt phẩm án thư xông trầm mỗi năm.
          </div>
          <div className="flex items-center gap-4">
            <span>KTS Trưởng: <a href="tel:0368757916" className="text-amber-300 hover:underline">0368 757 916</a></span>
            <span>Email: <a href="mailto:guhomesvn@gmail.com" className="text-stone-300 hover:underline">guhomesvn@gmail.com</a></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV19
