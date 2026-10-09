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
    resinDensity: '99.85% chìm hoàn toàn trong nước',
    aromaProfile: 'Hương thanh khiết tuyệt đỉnh, ngọt sâu lắng đọng, hậu vị hoa lê tuyết & sương mai',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Hòn Hèo Hóa Thạch',
    origin: 'Bán đảo Hòn Hèo, Khánh Hòa',
    resinDensity: '99.85% đặc quánh như hắc ngọc',
    aromaProfile: 'Hương huyền bí, đầm ấm thâm sơn & nốt trầm cổ tích ngàn năm tĩnh mịch',
    burnTemp: 165,
  },
  {
    name: 'Hoàng Kỳ Vạn Ninh Kim Tủy',
    origin: 'Rừng nguyên sinh Vạn Ninh, Khánh Hòa',
    resinDensity: '99.75% ánh hoàng kim ngọc tủy',
    aromaProfile: 'Hương hoàng tộc quý phái, ngọt mật ong hoa rừng & cam thảo sơn lâm',
    burnTemp: 140,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV7() {
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
        // cleanup fail-safe
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

  return (
    <section className="relative overflow-hidden border-y border-stone-800 bg-[#090807] py-16 text-stone-200">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-80 w-80 rounded-full bg-amber-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-orange-600/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-amber-300">
            NGỰ PHẨM KHỨU GIÁC HOÀNG GIA · PHIÊN BẢN V7
          </span>
          <h2 className="mt-4 font-serif text-2xl font-light tracking-wide text-amber-100 sm:text-3xl lg:text-4xl">
            Bảo Thất Kỳ Nam &amp; Đỉnh Lư Kim Long Mã Đạp Sen Vàng 24K Filigree
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Kiệt tác án hương gỗ Gụ Mật Nam Bộ 335 năm tuổi nâng đỡ đỉnh lư đồng đỏ bọc vàng 24K Filigree hình tượng Kim Long Mã
            đạp sen bách diệp ngậm ngọc phỉ thúy. Ứng dụng công nghệ điều nhiệt vi mạch gốm nano 80°C - 240°C bảo tồn trọn vẹn
            từng phân tử hương Kỳ Nam Khánh Hòa nguyên bản. Thiết kế thi công độc bản bởi GuHomes tại xưởng Thạnh Xuân 1.200m².
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Incense Visual & Interactive Chamber (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <div>
                  <h3 className="text-base font-medium text-amber-200">
                    Khoang Xông Vi Điều Nhiệt Kỳ Nam
                  </h3>
                  <p className="text-xs text-stone-400">
                    Nhiệt độ hiện tại: <span className="font-semibold text-amber-400">{currentTemp}°C</span> · Án Gụ Mật 335 năm
                  </p>
                </div>

                <button
                  type="button"
                  onClick={toggleHarmonics}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    isAudioHarmonics
                      ? 'border border-amber-500/50 bg-amber-500/20 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'border border-stone-700 bg-stone-800/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-300'
                  }`}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <span className="relative flex h-2 w-2">
                    {isAudioHarmonics && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    )}
                    <span className={`inline-flex h-2 w-2 rounded-full ${isAudioHarmonics ? 'bg-amber-400' : 'bg-stone-500'}`} />
                  </span>
                  <span>{isAudioHarmonics ? '528Hz + 741Hz' : 'Kích Âm Hòa Điệu'}</span>
                </button>
              </div>

              {/* Graphical representation of the Burner */}
              <div className="relative mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-stone-800/80 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-6">
                {/* Smoke animation */}
                <div className="relative flex h-24 w-full items-center justify-center overflow-hidden">
                  <AnimatePresence>
                    {isIncenseActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{
                          opacity: [0.2, 0.7, 0.4, 0.8, 0],
                          y: -30,
                          scale: [0.8, 1.2, 1.5, 1.8],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                        className="flex flex-col items-center"
                      >
                        <div className="h-10 w-24 rounded-full bg-amber-400/20 blur-md" />
                        <span className="text-[10px] italic text-amber-300/80">Làn vi hương Kỳ Nam đang lan tỏa</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Burner Visual */}
                <div className="relative flex flex-col items-center">
                  {/* Top Dragon Horse Finial */}
                  <motion.div
                    animate={{ y: isIncenseActive ? [-1, 1, -1] : 0 }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/60 bg-gradient-to-b from-amber-400/30 to-amber-600/30 shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                  >
                    <svg className="h-9 w-9 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M12 2l3 5h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>
                  <span className="mt-1 text-[11px] font-serif text-amber-300">Kim Long Mã Đạp Sen Vàng 24K</span>

                  {/* Body Chamber */}
                  <div className="mt-2 flex h-24 w-44 flex-col items-center justify-center rounded-2xl border border-amber-600/40 bg-gradient-to-r from-stone-900 via-amber-950/40 to-stone-900 p-2 text-center shadow-inner">
                    <span className="text-xs text-amber-200">{selectedKynam.name}</span>
                    <span className="mt-1 text-[10px] text-stone-400">{selectedKynam.origin}</span>
                    <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>{selectedKynam.resinDensity}</span>
                    </div>
                  </div>

                  {/* Altar Pedestal */}
                  <div className="mt-2 h-4 w-56 rounded-md bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950 shadow-lg border border-amber-900/60" />
                  <span className="mt-1 text-[10px] text-stone-400">Bệ Án Gỗ Gụ Mật Nam Bộ 335 Năm Tuổi</span>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-stone-400">Tuyển Chọn Phẩm Cấp Kỳ Nam:</span>
                  <div className="flex gap-2">
                    {KY_NAM_VARIETIES.map((k) => (
                      <button
                        key={k.name}
                        type="button"
                        onClick={() => {
                          setSelectedKynam(k)
                          setCurrentTemp(k.burnTemp)
                        }}
                        className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                          selectedKynam.name === k.name
                            ? 'border border-amber-500/60 bg-amber-500/20 text-amber-200'
                            : 'border border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
                        }`}
                        style={{ minWidth: '44px', minHeight: '44px' }}
                      >
                        {k.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-stone-400">Nhiệt Độ:</span>
                  <input
                    type="range"
                    min="80"
                    max="240"
                    value={currentTemp}
                    onChange={(e) => setCurrentTemp(Number(e.target.value))}
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-stone-800 accent-amber-500"
                  />
                  <span className="w-12 text-right text-xs font-semibold text-amber-300">{currentTemp}°C</span>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsIncenseActive(!isIncenseActive)}
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-semibold tracking-wider uppercase transition-all ${
                      isIncenseActive
                        ? 'border border-amber-500 bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 shadow-lg'
                        : 'border border-amber-500/40 bg-stone-800 text-amber-200 hover:border-amber-500 hover:bg-stone-700'
                    }`}
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 3v3m0 12v3M4.22 4.22l2.12 2.12m11.32 11.32l2.12 2.12M3 12h3m12 0h3M4.22 19.78l2.12-2.12m11.32-11.32l2.12-2.12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{isIncenseActive ? 'Đang Xông Kỳ Nam Vi Nhiệt' : 'Bắt Đầu Xông Kỳ Nam'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Details (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-xl lg:col-span-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                Quy Chuẩn Chế Tác Án Hương &amp; Đỉnh Lư
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                Tuyệt tác thủ công từ các nghệ nhân bậc thầy GuHomes.
              </p>

              <dl className="mt-4 space-y-3">
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Gỗ Án Hương Ngự Phẩm</dt>
                  <dd className="text-sm font-medium text-amber-200">Gụ Mật Nam Bộ 335 năm (Sấy cân bằng ẩm 11%)</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Chất Liệu Đỉnh Lư Ngự Dụng</dt>
                  <dd className="text-sm font-medium text-amber-300">Đồng đỏ 94% bọc vàng 24K Filigree Thăng Long</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Dải Nhiệt Vi Mạch Gốm Nano</dt>
                  <dd className="text-sm font-medium text-rose-300">80°C - 240°C (Không tạo khói ngột, giữ tinh dầu)</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Đặc Quyền Tần Số Hòa Điệu</dt>
                  <dd className="text-sm font-medium text-cyan-300">528Hz (Cân bằng năng lượng) + 741Hz (Thanh lọc)</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Tầng Hương Hoàn Hảo</dt>
                  <dd className="text-sm font-medium text-emerald-300">{selectedKynam.aromaProfile}</dd>
                </div>
              </dl>
            </div>

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

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV7
