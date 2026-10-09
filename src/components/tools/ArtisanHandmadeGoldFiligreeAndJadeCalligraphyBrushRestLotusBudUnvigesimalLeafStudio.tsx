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
  translucency: '99.98% Thấu quang ngọc tủy thanh ngọc hoàng gia',
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 21 cánh',
  woodBase: 'Gỗ Trắc Dây Cổ Thụ 380 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const UNVIGESIMAL_LEAF_NAMES = [
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
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudUnvigesimalLeafStudio() {
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
      } catch (err) {
        console.error('Audio context error:', err)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5)
          setTimeout(() => {
            try {
              oscLowRef.current?.stop()
              oscLowRef.current?.disconnect()
              oscHighRef.current?.stop()
              oscHighRef.current?.disconnect()
              gainRef.current?.disconnect()
              oscLowRef.current = null
              oscHighRef.current = null
              gainRef.current = null
            } catch {
              // ignore
            }
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
    <section className="relative overflow-hidden rounded-3xl border border-emerald-900/60 bg-gradient-to-b from-stone-950 via-emerald-950/20 to-stone-950 p-6 text-stone-200 shadow-2xl md:p-10 my-8">
      {/* Jade Glow Ambient */}
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/40 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Bảo Vật Văn Phòng Tứ Bảo · GuHomes Master Atelier
            </div>
            <h2 className="mt-3 text-2xl font-serif font-light tracking-wide text-emerald-100 md:text-3xl lg:text-4xl">
              Kê Ngự Bút Búp Sen Nhị Thập Nhất Diệp Vàng 24K & Phỉ Thúy
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400 md:text-base">
              Vật phẩm kê bút lông ngự dụng cho thư phòng gia chủ tôn quý. Điêu khắc từ khối Ngọc Bích Phỉ Thúy Type A tự nhiên thấu quang 99.98%, kết hợp khung Vàng 24K Filigree 0.10mm đan thủ công hình tượng hoa sen 21 cánh Nhị Thập Nhất Diệp trên bệ Gỗ Trắc Dây Cổ Thụ 380 năm.
            </p>
          </div>

          <button
            onClick={toggleAcoustics}
            className="flex items-center gap-2.5 rounded-xl border border-emerald-500/40 bg-stone-900/90 px-4 py-2.5 text-xs font-medium text-emerald-200 shadow-lg backdrop-blur transition-all duration-300 hover:border-emerald-400 hover:bg-stone-800 focus:outline-none min-h-[44px] min-w-[44px]"
            title="Kích hoạt tần số 528Hz & 1056Hz thư phòng thanh tịnh"
          >
            <svg
              className={`h-4 w-4 ${isAudioActive ? 'text-emerald-400 animate-spin' : 'text-stone-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
            </svg>
            <span>{isAudioActive ? 'Dừng Tần Số Bát Độ' : 'Khởi Động Âm Thoát Tục (528Hz - 1056Hz)'}</span>
          </button>
        </div>

        {/* Visual & Interactive Canvas */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visual Stage */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-900/40 bg-stone-950/70 p-6 backdrop-blur lg:col-span-7">
            <div className="relative flex h-80 w-full max-w-md items-center justify-center overflow-hidden">
              {/* Wood Base Stand - Trắc Dây 380 Years */}
              <div className="absolute bottom-6 h-10 w-72 rounded-lg border border-amber-800/60 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 shadow-xl flex items-center justify-center">
                <span className="text-[10px] font-mono tracking-widest text-amber-400/80">Bệ Trắc Dây Cổ Thụ 380 Năm</span>
              </div>

              {/* Jade & Gold Filigree Lotus Bud Brush Rest */}
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex h-52 w-52 flex-col items-center justify-center"
              >
                {/* 21-Leaf Filigree Halo */}
                <div className="absolute inset-0 rounded-full border border-dashed border-amber-400/40 animate-[spin_80s_linear_infinite]" />

                {/* Jade Lotus Structure */}
                <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-950 via-emerald-800/80 to-teal-900/60 border-2 border-emerald-400/60 shadow-[0_0_35px_rgba(52,211,153,0.3)]">
                  {/* Central Lotus Bud Icon */}
                  <svg className="h-20 w-20 text-emerald-300 drop-shadow-[0_4px_16px_rgba(52,211,153,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M12 2C8 6 6 12 12 22C18 12 16 6 12 2Z" fill="rgba(52, 211, 153, 0.25)" />
                    <path d="M12 22C6 18 3 14 3 10C3 7 5 5 7 5C9 5 11 7 12 10" stroke="#f59e0b" strokeWidth="1.5" />
                    <path d="M12 22C18 18 21 14 21 10C21 7 19 5 17 5C15 5 13 7 12 10" stroke="#f59e0b" strokeWidth="1.5" />
                  </svg>

                  {/* Calligraphy Brush Representation */}
                  <AnimatePresence>
                    {isBrushPlaced && (
                      <motion.div
                        initial={{ opacity: 0, rotate: -25, y: -20 }}
                        animate={{ opacity: 1, rotate: -15, y: 0 }}
                        exit={{ opacity: 0, rotate: -35, y: -30 }}
                        className="absolute h-48 w-3 rounded-full bg-gradient-to-b from-amber-700 via-stone-800 to-stone-900 border border-amber-400/50 shadow-2xl flex flex-col justify-between items-center py-1"
                      >
                        <span className="h-4 w-1.5 rounded-t-full bg-stone-950" />
                        <span className="text-[7px] font-mono text-amber-300 rotate-90">NGỰ BÚT</span>
                        <span className="h-6 w-2 rounded-b-full bg-stone-900 border-t border-amber-400/30" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Stage Footer Bar */}
            <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 border-t border-emerald-900/40 pt-3 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className={`h-2 w-2 rounded-full ${isBrushPlaced ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                Ngự bút: {isBrushPlaced ? 'Đang an vị trên gối ngọc (Nghiêng 15°)' : 'Đang đề thơ khai bút'}
              </span>
              <span className="font-mono text-emerald-300">Cánh sen: {UNVIGESIMAL_LEAF_NAMES[activeLeafIndex]}</span>
            </div>
          </div>

          {/* Interactive Controls & 21-Leaf Selector */}
          <div className="flex flex-col justify-between rounded-2xl border border-emerald-900/40 bg-stone-950/50 p-6 backdrop-blur lg:col-span-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                21 Cánh Sen Nhị Thập Nhất Diệp & Kính Phóng Đại
              </h3>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                  className={`rounded-xl border py-2 text-xs font-medium transition-all min-h-[44px] ${
                    isBrushPlaced
                      ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                      : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                  }`}
                >
                  {isBrushPlaced ? 'Nhấc Ngự Bút (Khai Bút)' : 'Hạ Ngự Bút An Vị'}
                </button>

                <button
                  onClick={() => setZoomLevel(zoomLevel === 1.0 ? 1.25 : 1.0)}
                  className="rounded-xl border border-stone-800 bg-stone-900/60 py-2 text-xs font-medium text-stone-300 transition-all hover:border-stone-700 min-h-[44px]"
                >
                  {zoomLevel === 1.0 ? 'Kính Lúp 1.25x (Soi Vân)' : 'Thu Về Chuẩn 1.0x'}
                </button>
              </div>

              {/* Leaf Selector Slider */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-300">Khám Phá Chi Tiết 21 Cánh Sen</span>
                  <span className="font-mono text-emerald-300">{activeLeafIndex + 1}/21</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={activeLeafIndex}
                  onChange={(e) => setActiveLeafIndex(Number(e.target.value))}
                  className="mt-2 w-full accent-emerald-500"
                />
                <p className="mt-1 text-xs text-emerald-200 font-serif">
                  {UNVIGESIMAL_LEAF_NAMES[activeLeafIndex]}
                </p>
              </div>
            </div>

            {/* Spec Panel */}
            <div className="mt-6 border-t border-emerald-900/40 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Thông Số Chế Tác Độc Bản
              </h4>
              <dl className="mt-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">Chất ngọc:</span>
                  <span className="text-emerald-300">{SPEC.jadeGrade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Độ thấu quang:</span>
                  <span className="text-teal-200">{SPEC.translucency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Nẹp chỉ vàng:</span>
                  <span className="text-amber-300">{SPEC.goldFiligree}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Bệ mộc:</span>
                  <span className="text-stone-200">{SPEC.woodBase}</span>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-900/40 bg-stone-950/60 px-6 py-4 text-xs text-stone-400">
          <div>
            <span className="font-semibold text-emerald-300">Văn Phòng Tứ Bảo GuHomes:</span> Thiết kế may đo cá nhân hóa cho gia chủ yêu thích thư pháp và nghệ thuật trà đạo.
          </div>
          <div className="flex items-center gap-4">
            <span>KTS Trưởng: <a href="tel:0368757916" className="text-amber-300 hover:underline">0368 757 916</a></span>
            <span>Hotline: <a href="mailto:guhomesvn@gmail.com" className="text-stone-300 hover:underline">guhomesvn@gmail.com</a></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudUnvigesimalLeafStudio
