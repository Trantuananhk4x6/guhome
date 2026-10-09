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
    resinDensity: '99.95% chìm hoàn toàn trong nước',
    aromaProfile: 'Hương thanh khiết tuyệt đỉnh, ngọt sâu lắng đọng, hậu vị hoa lê tuyết & sương mai ngàn năm',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Hòn Hèo Hóa Thạch',
    origin: 'Bán đảo Hòn Hèo, Khánh Hòa',
    resinDensity: '99.95% đặc quánh như hắc ngọc huyền bí',
    aromaProfile: 'Hương huyền diệu, đầm ấm thâm sơn & nốt trầm cổ tích ngàn năm tĩnh mịch uy nghiêm',
    burnTemp: 165,
  },
  {
    name: 'Hoàng Kỳ Vạn Ninh Kim Tủy',
    origin: 'Rừng nguyên sinh Vạn Ninh, Khánh Hòa',
    resinDensity: '99.90% ánh hoàng kim ngọc tủy vương giả',
    aromaProfile: 'Hương vương triều tôn quý, ngọt mật ong hoa rừng nguyên sinh & cam thảo sơn lâm thanh cao',
    burnTemp: 140,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV11() {
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
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5)
          setTimeout(() => {
            osc528Ref.current?.stop()
            osc528Ref.current?.disconnect()
            osc741Ref.current?.stop()
            osc741Ref.current?.disconnect()
            osc528Ref.current = null
            osc741Ref.current = null
            setIsAudioHarmonics(false)
          }, 500)
        } catch {
          setIsAudioHarmonics(false)
        }
      } else {
        setIsAudioHarmonics(false)
      }
    }
  }

  const handleSelectKynam = (variety: KynamSpec) => {
    setSelectedKynam(variety)
    setCurrentTemp(variety.burnTemp)
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-rose-900/40 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-6 text-stone-200 shadow-2xl md:p-10 my-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-rose-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-amber-600/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-rose-300">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
              Khí Vị Học Hoàng Gia V11 · Đỉnh Phẩm GuHomes
            </div>
            <h2 className="mt-3 text-2xl font-serif font-light tracking-wide text-amber-100 md:text-3xl lg:text-4xl">
              Bảo Thất Kỳ Nam & Đỉnh Lư Kim Long Mã Đạp Sen Vàng 24K Filigree V11
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400 md:text-base">
              Nghệ thuật xông đốt Kỳ Nam vi phân điện nhiệt không khói 80°C - 240°C trên án ngự Gỗ Trắc Đỏ 355 năm mộng cối âm dương. Đỉnh Lư Kim Long Mã Đạp Sen vàng ròng 24K Filigree đan tay thủ công tinh xảo, hòa cùng nhịp hòa âm 528Hz & 741Hz khai mở minh mẫn tinh thần.
            </p>
          </div>

          <button
            onClick={toggleHarmonics}
            className="flex items-center gap-2.5 rounded-xl border border-rose-500/40 bg-stone-900/90 px-4 py-2.5 text-xs font-medium text-rose-200 shadow-lg backdrop-blur transition-all duration-300 hover:border-rose-400 hover:bg-stone-800 min-h-[44px] min-w-[44px]"
            title="Khai mở hòa âm 528Hz và 741Hz"
          >
            <svg
              className={`h-4 w-4 ${isAudioHarmonics ? 'text-rose-400 animate-pulse' : 'text-stone-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" fill="currentColor" />
              <circle cx="18" cy="16" r="3" fill="currentColor" />
            </svg>
            <span>{isAudioHarmonics ? 'Dừng Hòa Âm Kép' : 'Khởi Động Hòa Âm (528Hz + 741Hz)'}</span>
          </button>
        </div>

        {/* Studio Simulation Workspace */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visualizer: Incense Burner & Aroma Rising Chamber */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-800/80 bg-stone-950/70 p-6 backdrop-blur lg:col-span-7">
            <div className="relative flex h-80 w-full max-w-md flex-col items-center justify-center">
              {/* Aroma Ribbon Particles (Smoke-free heat wave) */}
              <AnimatePresence>
                {isIncenseActive && (
                  <div className="pointer-events-none absolute top-4 flex h-36 w-28 items-center justify-center overflow-visible">
                    <motion.div
                      className="absolute h-28 w-1 rounded-full bg-gradient-to-t from-rose-400/80 via-amber-200/40 to-transparent blur-sm"
                      animate={{ y: [-10, -50], opacity: [0, 0.8, 0], scaleX: [1, 2.5, 1] }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute h-32 w-1.5 rounded-full bg-gradient-to-t from-yellow-400/70 via-rose-300/30 to-transparent blur-sm"
                      animate={{ y: [-5, -60], opacity: [0, 0.9, 0], scaleX: [1.2, 3, 0.8] }}
                      transition={{ duration: 3.4, repeat: Infinity, delay: 0.6, ease: 'easeOut' }}
                    />
                    <motion.div
                      className="absolute h-24 w-1 rounded-full bg-gradient-to-t from-amber-300/60 via-stone-100/20 to-transparent blur-xs"
                      animate={{ y: [-15, -45], opacity: [0, 0.7, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: 1.2, ease: 'easeOut' }}
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Gold Filigree Dragon-Horse Lotus Incense Burner */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Burner Lid: Dragon-Horse Figurine in 24K Gold Wire */}
                <div className="relative flex h-20 w-24 items-center justify-center rounded-t-full border-t-2 border-amber-400/80 bg-gradient-to-b from-amber-500/30 via-yellow-600/20 to-transparent shadow-[0_0_25px_rgba(245,158,11,0.3)] backdrop-blur">
                  <svg className="h-10 w-10 text-amber-300 drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 3c-1.5 2-3 3-4 5 1 2 2 4 4 4s3-2 4-4c-1-2-2.5-3-4-5z" fill="rgba(245, 158, 11, 0.4)" />
                    <path d="M8 8c-2 2-3 5-2 8 2 1 5 1 8 0 1-3 0-6-2-8" />
                    <circle cx="12" cy="14" r="1.5" fill="#fef08a" />
                  </svg>
                  <span className="absolute bottom-1 text-[8px] font-mono tracking-widest text-amber-300/80">KIM LONG MÃ V11</span>
                </div>

                {/* Lotus Petal Body (Vàng 24K Filigree) */}
                <div className="relative flex h-28 w-36 items-center justify-center rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-stone-900/90 to-amber-950/70 shadow-2xl">
                  {/* Filigree Wiremesh Pattern */}
                  <div className="absolute inset-2 rounded-xl border border-dashed border-amber-400/40 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:8px_8px]" />

                  {/* Micro-heating Chamber */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="text-[10px] font-medium text-amber-200">{selectedKynam.name}</span>
                    <span className="mt-1 font-mono text-base font-semibold text-amber-400">
                      {isIncenseActive ? `${currentTemp}°C` : 'Nhiệt Thất Chờ'}
                    </span>
                    <span className="text-[9px] text-stone-400">
                      {isIncenseActive ? 'Đang thăng hoa vi khí' : 'Sẵn sàng kích nhiệt'}
                    </span>
                  </div>
                </div>

                {/* Pedestal: Án Gỗ Trắc Đỏ 355 Năm */}
                <div className="relative mt-1 flex h-9 w-48 items-center justify-center rounded-lg border border-rose-900/60 bg-gradient-to-r from-stone-950 via-rose-950 to-stone-950 shadow-xl">
                  <div className="h-1 w-36 rounded-full bg-rose-600/40" />
                  <span className="absolute text-[8px] tracking-wider text-rose-300/80">
                    ÁN TRẮC ĐỎ 355 NĂM · MỘNG CỐI ÂM DƯƠNG
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive State Bar */}
            <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 border-t border-stone-800/60 pt-3 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${isIncenseActive ? 'bg-rose-400 animate-ping' : 'bg-stone-600'}`} />
                Trạng thái gia nhiệt: {isIncenseActive ? 'Kích hoạt tỏa hương vi phân' : 'Bảo quản kín buồng chân không'}
              </span>
              <span className="font-mono text-rose-300">Xuất xứ: {selectedKynam.origin}</span>
            </div>
          </div>

          {/* Configuration & Chamber Controls */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800/80 bg-stone-950/50 p-6 backdrop-blur lg:col-span-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-rose-400">
                Điều Khiển Tọa Thất Kỳ Nam
              </h3>

              {/* Selection of 3 Master Kynam */}
              <div className="mt-4 space-y-2.5">
                <label className="text-xs font-medium text-stone-300">Tuyển Chọn Cực Phẩm Kỳ Nam Tự Nhiên</label>
                {KY_NAM_VARIETIES.map((variety) => (
                  <button
                    key={variety.name}
                    onClick={() => handleSelectKynam(variety)}
                    className={`flex w-full flex-col rounded-xl border p-3 text-left transition-all min-h-[44px] ${
                      selectedKynam.name === variety.name
                        ? 'border-rose-400 bg-rose-500/15 shadow-[0_0_12px_rgba(244,63,94,0.2)]'
                        : 'border-stone-800/90 bg-stone-900/60 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-rose-200">{variety.name}</span>
                      <span className="font-mono text-xs text-rose-400">{variety.burnTemp}°C</span>
                    </div>
                    <span className="mt-1 text-[11px] leading-tight text-stone-400">{variety.aromaProfile}</span>
                    <span className="mt-1 font-mono text-[10px] text-rose-300/80">Tỷ trọng: {variety.resinDensity}</span>
                  </button>
                ))}
              </div>

              {/* Temperature Adjuster */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-medium text-stone-300">Nhiệt Độ Vi Phân Không Khói</label>
                  <span className="font-mono text-rose-400">{currentTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="240"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-rose-400 min-h-[24px]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>80°C (Dưỡng khí)</span>
                  <span>140°C (Tỏa hương ngọc)</span>
                  <span>240°C (Cực điểm)</span>
                </div>
              </div>

              {/* Trigger Heating Switch */}
              <div className="mt-5">
                <button
                  onClick={() => setIsIncenseActive(!isIncenseActive)}
                  className={`w-full rounded-xl border py-3 text-xs font-semibold tracking-wide transition-all min-h-[44px] ${
                    isIncenseActive
                      ? 'border-rose-400 bg-gradient-to-r from-rose-600/40 via-amber-500/40 to-rose-600/40 text-amber-100 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                      : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-rose-500/50'
                  }`}
                >
                  {isIncenseActive ? 'Đang Duy Trì Tỏa Hương (Nhấp Để Dừng)' : 'Kích Hoạt Xông Hương Không Khói'}
                </button>
              </div>
            </div>

            {/* Heritage Vault Specifications */}
            <div className="mt-6 border-t border-stone-800/80 pt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Thông Số Chế Tác Kim Hoàn & Mộc Cổ
              </h4>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Chất Liệu Đỉnh Lư</dt>
                  <dd className="text-xs font-medium text-amber-300">Vàng Ròng 24K Filigree</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Bệ Ngự Trị</dt>
                  <dd className="text-xs font-medium text-rose-300">Gỗ Trắc Đỏ 355 Năm</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Công Nghệ Tỏa Hương</dt>
                  <dd className="text-xs font-medium text-amber-300">Điện Nhiệt Vi Phân 0 Khói</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Hòa Âm Bát Nhã</dt>
                  <dd className="text-xs font-medium text-amber-300">528Hz & 741Hz Kép</dd>
                </div>
              </dl>
            </div>

            {/* Signature Footer */}
            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
              <span className="text-[11px] font-serif text-amber-400">
                GuHomes Độc Bản · Giới Hạn 12 Không Gian Di Sản / Năm
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV11
