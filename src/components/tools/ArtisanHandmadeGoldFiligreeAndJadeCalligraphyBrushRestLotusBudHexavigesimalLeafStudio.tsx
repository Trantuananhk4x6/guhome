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
  translucency: '99.99% Thấu quang ngọc tủy thanh ngọc hoàng gia',
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 26 cánh',
  woodBase: 'Gỗ Hoàng Đàn Tuyết Lạng Sơn 400 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const HEXAVIGESIMAL_LEAF_NAMES = [
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
  'Diệp Thập Bát (Viên Giác Vô Ngại)',
  'Diệp Thập Cửu (Vạn Pháp Quy Nhất)',
  'Diệp Nhị Thập (Đại Viên Cảnh Trí)',
  'Diệp Nhị Thập Nhất (Vô Lượng Thọ Quang)',
  'Diệp Nhị Thập Nhị (Diệu Trí Pháp Thân)',
  'Diệp Nhị Thập Tam (Tịch Diệt Tĩnh Thất)',
  'Diệp Nhị Thập Tứ (Viên Mãn Vô Thượng Bồ Đề)',
  'Diệp Nhị Thập Ngũ (Chân Quang Bất Hoại)',
  'Diệp Nhị Thập Lục (Đại Bát Niết Bàn Vô Lượng Thọ)',
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudHexavigesimalLeafStudio() {
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
        // ignore on cleanup
      }
    }
  }, [])

  const toggleAcousticHarmony = () => {
    if (!isAudioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        // Perfect octave 1056Hz
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.0)

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
        console.error('Audio issue:', e)
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
            setIsAudioActive(false)
          }, 550)
        } catch {
          setIsAudioActive(false)
        }
      } else {
        setIsAudioActive(false)
      }
    }
  }

  return (
    <section className="relative w-full py-16 px-4 md:px-8 bg-neutral-950 text-neutral-100 overflow-hidden border-t border-emerald-950/40">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-600/30 via-neutral-950 to-black" />

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Title */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-medium tracking-widest uppercase">
            <span>Ngự Bút Di Sản · Nhị Thập Lục Diệp 26 Cánh</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-emerald-100 tracking-wide">
            Kê Ngự Bút Búp Sen Nhị Thập Lục Diệp Phỉ Thúy & Vàng 24K Filigree
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Tuyệt tác thư phòng hoàng gia kết hợp Ngọc Bích Phỉ Thúy Type A Myanmar thấu quang 99.99% và 26 cánh sen nẹp Vàng 24K Filigree tinh xảo. Bệ đỡ gỗ Hoàng Đàn Tuyết Lạng Sơn 400 năm ghép mộng âm dương không đinh sắt, độ dốc 15° thoát mực hoàn hảo.
          </p>
        </div>

        {/* Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Bảo Vật Văn Phòng Tứ Bảo</span>
                <h3 className="text-lg font-serif text-emerald-200">Góc Kê Thoát Mực 15° & Ngọc Thấu Quang</h3>
              </div>
              <button
                onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                className="px-4 py-2 min-h-[44px] min-w-[44px] rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 text-xs font-medium transition-colors flex items-center gap-2"
                aria-label="Đặt hoặc nhấc ngự bút thư pháp"
              >
                <span>{isBrushPlaced ? 'Nhấc Ngự Bút Chấp Bút' : 'Hạ Ngự Bút Lên Giá'}</span>
              </button>
            </div>

            {/* Graphic Stage */}
            <div className="relative h-72 sm:h-84 w-full rounded-xl bg-gradient-to-b from-neutral-950 via-neutral-900 to-emerald-950/20 border border-neutral-800/80 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ duration: 0.4 }}
                className="relative flex flex-col items-center"
              >
                {/* 26-Leaf Lotus Bud Graphic Representation */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-emerald-500/50 bg-gradient-to-tr from-emerald-950/80 via-emerald-900/30 to-amber-950/40 flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                  <div className="absolute inset-2 rounded-full border border-dashed border-amber-400/40 animate-spin-slow" />
                  
                  <svg className="w-24 h-24 sm:w-28 sm:h-28 text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8 6 4 10 4 14a8 8 0 0016 0c0-4-4-8-8-12z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-2 3-4 5-4 8a4 4 0 008 0c0-3-2-5-4-8z" />
                    <circle cx="12" cy="14" r="1.5" fill="currentColor" />
                  </svg>

                  {/* Active Leaf Badge */}
                  <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-neutral-900 border border-amber-400/50 text-[10px] font-mono text-amber-300 shadow">
                    {HEXAVIGESIMAL_LEAF_NAMES[activeLeafIndex] ?? 'Diệp Nhất (Sơ Khai)'}
                  </div>
                </div>

                {/* Calligraphy Brush Mock */}
                <AnimatePresence>
                  {isBrushPlaced && (
                    <motion.div
                      initial={{ opacity: 0, y: -25, rotate: 12 }}
                      animate={{ opacity: 1, y: 0, rotate: 15 }}
                      exit={{ opacity: 0, y: -35, rotate: 18 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="absolute -top-4 w-60 sm:w-72 h-3.5 bg-gradient-to-r from-amber-900 via-neutral-900 to-neutral-200 rounded-full border border-amber-500/60 shadow-2xl flex items-center justify-between px-1"
                    >
                      <span className="w-3 h-3 rounded-full bg-amber-400 shadow-sm" />
                      <span className="text-[8px] font-mono text-amber-200 uppercase tracking-wider">Ngự Bút Lông Sói · Sưa Đỏ 420N</span>
                      <span className="w-4 h-2 bg-neutral-100 rounded-r-full" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Base Pedestal */}
                <div className="mt-4 px-6 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-mono text-neutral-300 flex items-center gap-2 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Bệ Gỗ Hoàng Đàn Tuyết Lạng Sơn 400 Năm</span>
                </div>
              </motion.div>

              {/* Angle Badge */}
              <div className="absolute bottom-3 left-4 text-xs font-mono text-neutral-400">
                <span>Góc Kê Thoát Mực: </span>
                <span className="text-emerald-400 font-bold">15° Nghiêng Hoàn Hảo</span>
              </div>
            </div>

            {/* Slider & Leaf Quick Select */}
            <div className="mt-6 space-y-4 pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400 font-mono">Độ Phóng Đại Kính Soi Ngọc ({zoomLevel.toFixed(1)}x)</span>
                <div className="flex gap-2">
                  {[1.0, 1.4, 1.8, 2.2].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setZoomLevel(lvl)}
                      className={`px-2 py-1 min-h-[44px] min-w-[44px] rounded text-xs font-mono border transition-all ${
                        zoomLevel === lvl
                          ? 'border-emerald-500 bg-emerald-950/50 text-emerald-200'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {lvl.toFixed(1)}x
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-neutral-400 font-mono">
                  <span>Khảo Sát Nhị Thập Lục Diệp (26 Cánh Sen)</span>
                  <span className="text-amber-300">Cánh {activeLeafIndex + 1}/26</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="25"
                  value={activeLeafIndex}
                  onChange={(e) => setActiveLeafIndex(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* Specifications & Acoustic Module */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 space-y-5">
              <h3 className="text-lg font-serif text-emerald-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Quy Chuẩn Mỹ Thuật Thư Phòng Hoàng Gia
              </h3>
              <dl className="divide-y divide-neutral-800 text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Phẩm Cấp Ngọc Bích</dt>
                  <dd className="font-mono text-emerald-300 text-right">{SPEC.jadeGrade}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Độ Thấu Quang</dt>
                  <dd className="font-mono text-neutral-200 text-right">{SPEC.translucency}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Kỹ Nghệ Kim Hoàn</dt>
                  <dd className="font-mono text-amber-300 text-right">{SPEC.goldFiligree}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Bệ Đỡ Gỗ Quý</dt>
                  <dd className="font-mono text-neutral-200 text-right">{SPEC.woodBase}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Độ Dốc Kê Ngự Bút</dt>
                  <dd className="font-mono text-emerald-300 text-right">{SPEC.inclineAngle}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Hòa Âm Bát Độ</dt>
                  <dd className="font-mono text-purple-300 text-right">{SPEC.acoustics}</dd>
                </div>
              </dl>
            </div>

            {/* Solfeggio Octave Module */}
            <div className="bg-gradient-to-br from-emerald-950/20 via-neutral-900/60 to-purple-950/20 border border-emerald-600/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Web Audio Bát Độ Thiền Định</span>
                <h4 className="text-base font-serif text-neutral-100">Cộng Hưởng Bát Độ 528Hz & 1056Hz</h4>
                <p className="text-xs text-neutral-400">
                  Tần số vàng 528Hz và quãng tám 1056Hz tinh lọc dòng suy tưởng, giúp tâm trí định tĩnh khi chấp bút ngự phê và thưởng lãm nghệ thuật.
                </p>
              </div>
              <button
                onClick={toggleAcousticHarmony}
                className={`w-full py-3 min-h-[44px] min-w-[44px] rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border ${
                  isAudioActive
                    ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.35)]'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-emerald-200 border-emerald-600/40'
                }`}
                aria-label="Kích hoạt hòa âm bát độ thiền định 528Hz và 1056Hz"
              >
                <svg className={`w-4 h-4 ${isAudioActive ? 'animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
                <span>{isAudioActive ? 'Dừng Hòa Âm Bát Độ' : 'Khởi Động Hòa Âm Bát Độ 528Hz & 1056Hz'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudHexavigesimalLeafStudio
