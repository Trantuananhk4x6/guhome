'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestSpec {
  jadeGrade: string
  translucency: string
  goldFiligree: string
  woodBase: string
  inclineAngle: string
  acoustics: string
}

const SPEC: BrushRestSpec = {
  jadeGrade: 'Ngọc Bích Phỉ Thúy Type A Myanmar tự nhiên',
  translucency: '99.94% Thấu quang ngọc tủy thanh ngọc hoàng gia',
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 17 cánh',
  woodBase: 'Gỗ Trắc Dây Nam Bộ 360 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const HEPTADECA_LEAF_NAMES = [
  'Diệp Nhất (Sơ Khai)',
  'Diệp Nhị (Cam Lộ)',
  'Diệp Tam (Thanh Lương)',
  'Diệp Tứ (Minh Triết)',
  'Diệp Ngũ (Tĩnh Lự)',
  'Diệp Lục (Vi Diệu)',
  'Diệp Thất (Viên Dung)',
  'Diệp Bát (Bảo Quang)',
  'Diệp Cửu (Diệu Hạnh)',
  'Diệp Thập (Vô Lượng)',
  'Diệp Thập Nhất (Như Ý)',
  'Diệp Thập Nhị (Viên Mãn)',
  'Diệp Thập Tam (Vô Thượng)',
  'Diệp Thập Tứ (Đại Giác)',
  'Diệp Thập Ngũ (Chân Như)',
  'Diệp Thập Lục (Bản Thể)',
  'Diệp Thập Thất (Tối Thượng Diệu Giác)',
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudHeptadecaLeafStudio() {
  const [isBrushPlaced, setIsBrushPlaced] = useState<boolean>(true)
  const [zoomLevel, setZoomLevel] = useState<number>(1.0)
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)
  const [activeLeafIndex, setActiveLeafIndex] = useState<number>(0)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscLowRef = useRef<OscillatorNode | null>(null)
  const oscHighRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      try {
        oscLowRef.current?.stop()
        oscLowRef.current?.disconnect()
        oscHighRef.current?.stop()
        oscHighRef.current?.disconnect()
        gainRef.current?.disconnect()
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close()
        }
      } catch {
        // cleanup safe
      }
    }
  }, [])

  const toggleAcoustics = () => {
    if (!isAudioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const low = ctx.createOscillator()
        const high = ctx.createOscillator()
        const gain = ctx.createGain()

        low.type = 'sine'
        low.frequency.setValueAtTime(528, ctx.currentTime)

        high.type = 'sine'
        high.frequency.setValueAtTime(1056, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2)

        low.connect(gain)
        high.connect(gain)
        gain.connect(ctx.destination)

        low.start()
        high.start()

        oscLowRef.current = low
        oscHighRef.current = high
        gainRef.current = gain
        setIsAudioActive(true)
      } catch (e) {
        console.error('Audio context error:', e)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5)
          setTimeout(() => {
            oscLowRef.current?.stop()
            oscLowRef.current?.disconnect()
            oscHighRef.current?.stop()
            oscHighRef.current?.disconnect()
            oscLowRef.current = null
            oscHighRef.current = null
            setIsAudioActive(false)
          }, 500)
        } catch {
          setIsAudioActive(false)
        }
      } else {
        setIsAudioActive(false)
      }
    }
  }

  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-900/40 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-6 text-stone-200 shadow-2xl md:p-10 my-8">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Bảo Vật Văn Phòng Tứ Bảo · Độc Bản GuHomes
            </div>
            <h2 className="mt-3 text-2xl font-serif font-light tracking-wide text-emerald-100 md:text-3xl lg:text-4xl">
              Kê Ngự Bút Sen Thập Thất Diệp Phỉ Thúy Type A Nẹp Vàng 24K Filigree
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400 md:text-base">
              Búp sen 17 cánh ngọc phỉ thúy thiên nhiên thấu quang 99.94%, từng diệp hoa viền chỉ vàng 24K Filigree 0.10mm đan tay tinh xảo. Tọa lạc trên bệ Gỗ Trắc Dây Nam Bộ 360 năm mộng cối âm dương, nghiêng chuẩn 15° thoát giọt mực thư pháp hoàng gia.
            </p>
          </div>

          <button
            onClick={toggleAcoustics}
            className="flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-stone-900/90 px-4 py-2.5 text-xs font-medium text-emerald-200 shadow-lg backdrop-blur transition-all duration-300 hover:border-emerald-400 hover:bg-stone-800 min-h-[44px] min-w-[44px]"
            title="Thanh âm bát độ thiền định 528Hz và 1056Hz"
          >
            <svg
              className={`h-4 w-4 ${isAudioActive ? 'text-emerald-400 animate-spin' : 'text-stone-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            <span>{isAudioActive ? 'Dừng Hòa Âm Bát Độ' : 'Khởi Động Âm Học (528Hz & 1056Hz)'}</span>
          </button>
        </div>

        {/* Visualizer and Atelier Workbench */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visualizer: Jade Lotus Bud & Brush Stand */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-800/80 bg-stone-950/70 p-6 backdrop-blur lg:col-span-7">
            <div className="relative flex h-80 w-full max-w-md items-center justify-center overflow-hidden">
              <motion.div
                className="relative flex flex-col items-center"
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              >
                {/* Imperial Calligraphy Brush */}
                <AnimatePresence>
                  {isBrushPlaced && (
                    <motion.div
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      className="absolute -top-10 z-30 flex items-center justify-center"
                    >
                      <div className="relative h-2 w-48 rotate-[-15deg] rounded-full bg-gradient-to-r from-amber-700 via-stone-800 to-amber-900 shadow-xl border border-amber-500/40">
                        <div className="absolute -left-2 -top-1 h-4 w-3 rounded-l-md bg-amber-400 shadow-sm" />
                        <div className="absolute -left-6 -top-1 h-4 w-4 rounded-l-full bg-stone-900 border border-stone-700" />
                        <span className="absolute right-4 top-[-10px] text-[7px] text-amber-300/80 font-mono tracking-wider">NGỰ BÚT GUHOMES V12</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Jade Lotus Bud with 17 Filigree Petals */}
                <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-800/40 via-teal-900/50 to-emerald-950/80 shadow-[0_0_35px_rgba(16,185,129,0.35)] backdrop-blur">
                  <div className="absolute inset-1 rounded-full border border-emerald-400/40 bg-emerald-400/10 blur-[1px]" />

                  <div className="relative flex flex-col items-center justify-center">
                    <svg className="h-20 w-20 text-emerald-300 drop-shadow-[0_2px_12px_rgba(52,211,153,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 2C8 6 6 11 6 15a6 6 0 0012 0c0-4-2-9-6-13z" fill="rgba(16, 185, 129, 0.35)" />
                      <path d="M12 2c-2 5-3 9-3 13 0 3 1.5 5 3 6 1.5-1 3-3 3-6 0-4-1-8-3-13z" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="0.8" />
                      <circle cx="12" cy="15" r="1.5" fill="#fef08a" />
                    </svg>
                    <span className="mt-1 text-[9px] font-mono tracking-wider text-amber-300">
                      {HEPTADECA_LEAF_NAMES[activeLeafIndex]}
                    </span>
                  </div>
                </div>

                {/* Pedestal: Án Gỗ Trắc Dây Nam Bộ 360 Năm */}
                <div className="relative -mt-2 flex h-8 w-52 items-center justify-center rounded-lg border border-amber-900/60 bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950 shadow-2xl">
                  <div className="h-0.5 w-44 rounded-full bg-amber-600/50" />
                  <span className="absolute text-[8px] tracking-wider text-amber-400/80">
                    BỆ TRẮC DÂY 360 NĂM · MỘNG CỐI ÂM DƯƠNG
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Visualizer Status Bar */}
            <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 border-t border-stone-800/60 pt-3 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${isBrushPlaced ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                Ngự bút: {isBrushPlaced ? 'Kê an vị trên đài sen' : 'Đang xuất giá ngự bút viết thư họa'}
              </span>
              <span className="font-mono text-emerald-300">Thấu quang ngọc: 99.94%</span>
            </div>
          </div>

          {/* Workbench Controls & Technical Specs */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800/80 bg-stone-950/50 p-6 backdrop-blur lg:col-span-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Thao Tác Bảo Vật & Giám Tuyển Cánh Sen
              </h3>

              {/* Control 1: Place / Lift Calligraphy Brush */}
              <div className="mt-4">
                <label className="text-xs font-medium text-stone-300">Tương Tác Ngự Bút Hoàng Gia</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsBrushPlaced(true)}
                    className={`rounded-xl border py-2 text-xs font-medium transition-all min-h-[44px] ${
                      isBrushPlaced
                        ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    An Vị Ngự Bút
                  </button>
                  <button
                    onClick={() => setIsBrushPlaced(false)}
                    className={`rounded-xl border py-2 text-xs font-medium transition-all min-h-[44px] ${
                      !isBrushPlaced
                        ? 'border-amber-400 bg-amber-500/20 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    Nhấc Bút Thư Họa
                  </button>
                </div>
              </div>

              {/* Control 2: Zoom Magnification */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-medium text-stone-300">Độ Phóng Đại Quan Sát Nẹp Vàng Filigree</label>
                  <span className="font-mono text-emerald-400">{zoomLevel.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="1.8"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-emerald-400 min-h-[24px]"
                />
              </div>

              {/* Control 3: Heptadeca Leaf Selector */}
              <div className="mt-5">
                <label className="text-xs font-medium text-stone-300">Chọn Cánh Sen Thập Thất Diệp Để Soi Chi Tiết</label>
                <div className="mt-2 max-h-36 overflow-y-auto space-y-1 pr-1">
                  {HEPTADECA_LEAF_NAMES.map((leaf, index) => (
                    <button
                      key={leaf}
                      onClick={() => setActiveLeafIndex(index)}
                      className={`flex w-full items-center justify-between rounded-lg border px-3 py-1.5 text-xs transition-all min-h-[36px] ${
                        activeLeafIndex === index
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-200 font-medium'
                          : 'border-stone-800/80 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      <span>{leaf}</span>
                      <span className="text-[10px] font-mono text-amber-400">Vàng 24K</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="mt-6 border-t border-stone-800/80 pt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Thông Số Chế Tác Kim Hoàn & Ngọc Học
              </h4>
              <dl className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Phẩm Cấp Ngọc</dt>
                  <dd className="text-xs font-medium text-emerald-300">{SPEC.jadeGrade}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Độ Thấu Quang</dt>
                  <dd className="text-xs font-medium text-emerald-300">{SPEC.translucency}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Kỹ Nghệ Nẹp Kim Hoàn</dt>
                  <dd className="text-xs font-medium text-amber-300">{SPEC.goldFiligree}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Bệ Gỗ Cổ Thụ</dt>
                  <dd className="text-xs font-medium text-amber-300">{SPEC.woodBase}</dd>
                </div>
              </dl>
            </div>

            {/* Footer Heritage Stamp */}
            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
              <span className="text-[11px] font-serif text-emerald-400">
                GuHomes Atelier · Xưởng Mộc May Đo Thạnh Xuân 1.200m² · Hotline KTS Trưởng: 0368 757 916
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudHeptadecaLeafStudio
