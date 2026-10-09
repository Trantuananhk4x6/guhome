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
  translucency: '99.90% Thấu quang ngọc tủy thanh ngọc hoàng gia',
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 14 cánh',
  woodBase: 'Gỗ Gụ Mật Nam Bộ 345 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const TETRADECA_LEAF_NAMES = [
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
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTetradecaLeafStudio() {
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
        // cleanup ignore
      }
    }
  }, [])

  const toggleOctaveAudio = () => {
    if (!isAudioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 1.0)

        // Fundamental 528Hz
        const osc1 = ctx.createOscillator()
        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        // Octave 1056Hz
        const osc2 = ctx.createOscillator()
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        oscLowRef.current = osc1
        oscHighRef.current = osc2
        gainRef.current = gain
        setIsAudioActive(true)
      } catch (e) {
        console.error('Audio Octave error:', e)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            oscLowRef.current?.stop()
            oscLowRef.current?.disconnect()
            oscHighRef.current?.stop()
            oscHighRef.current?.disconnect()
            setIsAudioActive(false)
          }, 600)
        } catch {
          setIsAudioActive(false)
        }
      } else {
        setIsAudioActive(false)
      }
    }
  }

  return (
    <section className="relative overflow-hidden border-y border-stone-800 bg-[#080808] py-16 text-stone-200">
      <div className="pointer-events-none absolute -top-36 right-1/3 h-96 w-96 rounded-full bg-emerald-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-36 left-1/4 h-96 w-96 rounded-full bg-amber-600/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-emerald-300">
            NGỰ DỤNG THƯ PHÒNG · BÁCH DIỆP LIÊN HOA
          </span>
          <h2 className="mt-4 font-serif text-2xl font-light tracking-wide text-stone-100 sm:text-3xl lg:text-4xl">
            Atelier Kê Ngự Bút Búp Sen Thập Tứ Diệp Phỉ Thúy &amp; Vàng 24K Filigree
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Kê ngự bút hình búp sen 14 cánh tạc từ ngọc Phỉ Thúy Type A tự nhiên thấu quang 99.90%, nẹp viền chỉ vàng ròng 24K
            Filigree 0.10mm, ngự trên bệ gỗ Gụ Mật Nam Bộ 345 năm tuổi sấy chân không. Góc nghiêng chuẩn mực 15° giúp thoát
            giọt mực ngự bút hoàn hảo. Độc quyền may đo bởi GuHomes theo trần 12 công trình mỗi năm.
          </p>
        </div>

        {/* Content Body */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Interactive Workspace (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <div>
                  <h3 className="text-base font-medium text-emerald-200">
                    Phối Cảnh Kê Bút Búp Sen Thập Tứ Diệp
                  </h3>
                  <p className="text-xs text-stone-400">
                    Cánh sen đang chọn: <span className="font-semibold text-emerald-400">{TETRADECA_LEAF_NAMES[activeLeafIndex]}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={toggleOctaveAudio}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    isAudioActive
                      ? 'border border-emerald-500/50 bg-emerald-500/20 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'border border-stone-700 bg-stone-800/80 text-stone-300 hover:border-emerald-500/40 hover:text-emerald-300'
                  }`}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <span className="relative flex h-2 w-2">
                    {isAudioActive && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    )}
                    <span className={`inline-flex h-2 w-2 rounded-full ${isAudioActive ? 'bg-emerald-400' : 'bg-stone-500'}`} />
                  </span>
                  <span>{isAudioActive ? '528Hz & 1056Hz' : 'Ngân Hòa Âm'}</span>
                </button>
              </div>

              {/* Graphical Canvas */}
              <div className="relative mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-stone-800/80 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-6">
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="relative flex flex-col items-center"
                >
                  {/* Brush overlay */}
                  <AnimatePresence>
                    {isBrushPlaced && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, rotate: -15 }}
                        animate={{ opacity: 1, y: 0, rotate: -15 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="relative z-20 -mb-6 flex items-center justify-center"
                      >
                        <div className="h-2 w-48 rounded-full bg-gradient-to-r from-stone-800 via-amber-900 to-amber-950 shadow-xl border border-amber-600/40" />
                        <div className="h-4 w-4 -ml-1 rounded-r-full bg-stone-950 border border-stone-700" />
                        <span className="absolute -top-5 text-[9px] font-serif text-amber-200">
                          Ngự Bút Gụ Mật Lông Sói
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Lotus Bud with 14 petals */}
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-amber-400/40 bg-gradient-to-b from-emerald-500/20 via-emerald-600/30 to-emerald-950/60 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    {/* Inner gold filigree pattern */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/60" />
                    
                    <svg className="h-20 w-20 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M12 2C9 6 6 10 6 15c0 4 3 7 6 7s6-3 6-7c0-5-3-9-6-13z" fill="currentColor" fillOpacity="0.3" />
                      <path d="M12 2c-2 5-5 8-5 13 0 3 2 5 5 5s5-2 5-5c0-5-3-8-5-13z" />
                      <path d="M12 6c-1 3-3 5-3 8 0 2 1 3 3 3s3-1 3-3c0-3-2-5-3-8z" />
                    </svg>

                    <div className="absolute -bottom-2 rounded-full bg-amber-500/30 px-2 py-0.5 text-[9px] font-medium text-amber-200 border border-amber-400/40">
                      Vàng 24K Filigree 0.10mm
                    </div>
                  </div>

                  {/* Wood Base */}
                  <div className="mt-3 flex h-6 w-52 items-center justify-center rounded-lg border border-amber-900/60 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 shadow-md">
                    <span className="text-[10px] text-amber-300">
                      Bệ Gỗ Gụ Mật Nam Bộ 345 Năm Tuổi
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                    className="flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800/60 px-4 py-3 text-xs font-medium text-stone-200 transition-all hover:border-emerald-500/40 hover:bg-stone-800 hover:text-emerald-200"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                  >
                    <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{isBrushPlaced ? 'Nhấc Ngự Bút Lên' : 'Hạ Ngự Bút Vào Búp Sen'}</span>
                  </button>

                  <div className="flex items-center justify-between rounded-xl border border-stone-700 bg-stone-800/60 px-3">
                    <span className="text-xs text-stone-400">Độ Phóng Đại Vi Mô:</span>
                    <div className="flex gap-1">
                      {[1.0, 1.25, 1.5, 1.75].map((z) => (
                        <button
                          key={z}
                          type="button"
                          onClick={() => setZoomLevel(z)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                            zoomLevel === z
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                          style={{ minWidth: '44px', minHeight: '44px' }}
                        >
                          {z}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Petal Selector */}
                <div>
                  <span className="text-xs text-stone-400">Khám Phá Chi Tiết 14 Cánh Sen (Thập Tứ Diệp):</span>
                  <div className="mt-2 grid grid-cols-3 gap-1.5 sm:grid-cols-4 lg:grid-cols-7">
                    {TETRADECA_LEAF_NAMES.map((name, idx) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => setActiveLeafIndex(idx)}
                        className={`truncate rounded-lg p-2 text-[11px] transition-all ${
                          activeLeafIndex === idx
                            ? 'border border-emerald-500/60 bg-emerald-500/20 text-emerald-200 font-medium'
                            : 'border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                        }`}
                        style={{ minWidth: '44px', minHeight: '44px' }}
                      >
                        {name.split(' ')[0]} {name.split(' ')[1]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-xl lg:col-span-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Quy Chuẩn Chế Tác Thư Phòng Hoàng Gia
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                Chuẩn mực thủ công độc bản bởi nghệ nhân GuHomes.
              </p>

              <dl className="mt-4 space-y-3">
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Phẩm Cấp Ngọc Bích</dt>
                  <dd className="text-sm font-medium text-emerald-200">{SPEC.jadeGrade}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Chỉ Số Thấu Quang Ngọc Tủy</dt>
                  <dd className="text-sm font-medium text-emerald-300">{SPEC.translucency}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Kim Hoàn Filigree Thăng Long</dt>
                  <dd className="text-sm font-medium text-amber-300">{SPEC.goldFiligree}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Gỗ Bệ Đỡ Cổ Mộc</dt>
                  <dd className="text-sm font-medium text-amber-200">{SPEC.woodBase}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Góc Nghiêng Khí Động Học</dt>
                  <dd className="text-sm font-medium text-cyan-300">{SPEC.inclineAngle}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Tần Số Hòa Âm Bát Độ</dt>
                  <dd className="text-sm font-medium text-rose-300">{SPEC.acoustics}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-center">
              <span className="text-[11px] font-serif text-emerald-400">
                GuHomes Atelier · Xưởng Mộc May Đo Thạnh Xuân 1.200m²
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTetradecaLeafStudio
