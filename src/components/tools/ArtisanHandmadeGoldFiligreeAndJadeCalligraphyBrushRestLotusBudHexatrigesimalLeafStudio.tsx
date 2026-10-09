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
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 36 cánh (Lục Lục Đại Thuận)',
  woodBase: 'Bệ Gỗ Sưa Đỏ Bắc Bộ Cổ Thụ 400 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const HEXATRIGESIMAL_LEAF_NAMES = [
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
  'Diệp Nhị Thập Thất (Vô Lượng Thọ Mạng Thường Lạc Ngã Tịnh)',
  'Diệp Nhị Thập Bát (Đại Đạo Viên Giác Vô Vi Bất Diệt)',
  'Diệp Nhị Thập Cửu (Diệu Giác Pháp Giới Vô Lượng Trang Nghiêm)',
  'Diệp Tam Thập (Viên Mãn Vô Cực Đại Định Kim Cương Bất Thoái)',
  'Diệp Tam Thập Nhất (Chân Như Viên Giác Tối Thượng Quang Minh)',
  'Diệp Tam Thập Nhị (Đại Viên Mãn Tối Thượng Chân Như Bất Thoái)',
  'Diệp Tam Thập Tam (Vô Lượng Thọ Viên Giác Vô Vi Bất Biến)',
  'Diệp Tam Thập Tứ (Đại Viên Mãn Kim Cương Vô Thượng Bồ Đề Thường Tịch)',
  'Diệp Tam Thập Ngũ (Thái Cực Viên Mãn Diệu Trí Vô Lượng Thọ)',
  'Diệp Tam Thập Lục (Lục Lục Đại Thuận Vô Thượng Viên Mãn)',
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudHexatrigesimalLeafStudio() {
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

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        oscLowRef.current = osc1
        oscHighRef.current = osc2
        gainRef.current = gain
        setIsAudioActive(true)
      } catch (err) {
        console.error('Audio initialization error:', err)
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
            audioCtxRef.current?.close()
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
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden rounded-3xl border border-amber-900/30 my-12 shadow-2xl backdrop-blur-md">
      {/* Background Soft Radiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-800 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-serif uppercase tracking-widest mb-3">
              <span>Ngự Bút Phòng Hoàng Triều · Độc Bản GuHomes</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-light text-stone-100 tracking-wide">
              Kê Ngự Bút Sen Tam Thập Lục Diệp (Lục Lục Đại Thuận) Phỉ Thúy & Vàng 24K Filigree
            </h2>
            <p className="text-stone-400 text-sm md:text-base font-light mt-2 max-w-3xl leading-relaxed">
              Tác phẩm gác bút ngự dụng tạc từ ngọc bích Phỉ Thúy Myanmar Type A thấu quang 99.99%, vi thêu 36 cánh sen biểu trưng Lục Lục Đại Thuận nẹp sợi vàng ròng 24K Filigree 0.10mm đan tay, tọa trên bệ đỡ gỗ Sưa Đỏ Bắc Bộ Cổ Thụ 400 năm đanh chắc đỏ thắm.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleAcousticHarmony}
              className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl border text-xs font-serif tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isAudioActive
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/10'
                  : 'bg-stone-900 border-stone-700 text-stone-300 hover:border-emerald-600/50'
              }`}
            >
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isAudioActive ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                )}
              </svg>
              <span>{isAudioActive ? 'Dừng Hòa Âm 528Hz & 1056Hz' : 'Khởi Động Hòa Âm Bát Độ'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Master Studio Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Presentation */}
          <div className="lg:col-span-8 bg-stone-900/60 rounded-2xl border border-stone-800 p-6 relative overflow-hidden backdrop-blur-sm min-h-[440px] flex flex-col justify-between">
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/60 pb-3">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Vị Trí Cánh Sen: {HEXATRIGESIMAL_LEAF_NAMES[activeLeafIndex]}
              </span>
              <span className="text-amber-400 font-serif">Độ Phóng Đại Chi Tiết: {zoomLevel.toFixed(1)}x</span>
            </div>

            {/* Central Graphic Simulation */}
            <div className="relative py-12 flex flex-col items-center justify-center">
              {/* Jade Halo Shimmer */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-emerald-500/20 flex items-center justify-center shadow-inner shadow-emerald-950/40">
                {/* 36-Leaf Golden Orbit */}
                <div className="absolute inset-4 rounded-full border border-amber-500/20 animate-spin" style={{ animationDuration: '72s' }} />

                {/* Jade Lotus Brush Rest Pod */}
                <motion.div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950/80 border-2 border-emerald-500/50 p-4 flex flex-col items-center justify-center text-center shadow-2xl relative cursor-pointer"
                  animate={{ scale: zoomLevel }}
                  transition={{ type: 'spring', damping: 15 }}
                  onClick={() => setActiveLeafIndex((prev) => (prev + 1) % HEXATRIGESIMAL_LEAF_NAMES.length)}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mb-2 shadow-inner">
                    <svg className="w-8 h-8 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-serif text-emerald-200 uppercase tracking-widest">Sen Tam Thập Lục Diệp</span>
                  <span className="text-[9px] text-amber-300 mt-1">Phỉ Thúy Type A · Vàng 24K</span>
                </motion.div>

                {/* Calligraphy Brush Simulation */}
                <AnimatePresence>
                  {isBrushPlaced && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, rotate: -25 }}
                      animate={{ opacity: 1, y: 0, rotate: -15 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute -top-4 -right-2 bg-gradient-to-r from-amber-800 to-amber-950 border border-amber-500/50 text-amber-200 text-[10px] px-3 py-1 rounded-full shadow-lg backdrop-blur-md"
                    >
                      Bút Lông Lang Hào Ngự Dụng: Tĩnh Tọa Thoát Mực 15°
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800/60">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-serif border border-stone-700 transition-colors"
                >
                  {isBrushPlaced ? 'Nhấc Bút Ngự Chấp Bút' : 'Hạ Bút Gác Búp Sen 15°'}
                </button>
                <button
                  onClick={() => setActiveLeafIndex((prev) => (prev + 1) % HEXATRIGESIMAL_LEAF_NAMES.length)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-serif border border-stone-700 transition-colors"
                >
                  Chuyển Cánh Sen Tiếp Theo
                </button>
              </div>

              {/* Zoom Slider */}
              <div className="flex items-center gap-3 bg-stone-950/60 px-3 py-1.5 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 font-serif">Kính Lúp:</span>
                <input
                  type="range"
                  min="1.0"
                  max="1.8"
                  step="0.1"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-24 md:w-32 accent-emerald-500 cursor-pointer"
                />
                <span className="text-xs font-serif text-emerald-300 w-10 text-right">{zoomLevel.toFixed(1)}x</span>
              </div>
            </div>
          </div>

          {/* Side Specs & Atelier Guarantee */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-stone-900/80 rounded-2xl border border-stone-800 p-6 space-y-4 backdrop-blur-sm">
              <h3 className="text-sm font-serif uppercase tracking-widest text-emerald-400 border-b border-stone-800 pb-2">
                Thông Số Kê Ngự Bút Hoàng Gia
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-500 block">Chất Liệu Ngọc Quý:</span>
                  <span className="text-stone-200 font-serif">{SPEC.jadeGrade}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Chỉ Số Thấu Quang:</span>
                  <span className="text-emerald-300 font-serif">{SPEC.translucency}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Kỹ Thuật Kim Hoàn:</span>
                  <span className="text-stone-200 font-serif">{SPEC.goldFiligree}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Bệ Tọa Cổ Mộc:</span>
                  <span className="text-stone-200 font-serif">{SPEC.woodBase}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Góc Nghiêng Phong Thủy:</span>
                  <span className="text-stone-200 font-serif">{SPEC.inclineAngle}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Tần Số Bát Độ Solfeggio:</span>
                  <span className="text-emerald-300 font-serif">{SPEC.acoustics}</span>
                </div>
              </div>
            </div>

            {/* GuHomes Handcraft Stamp */}
            <div className="bg-gradient-to-br from-emerald-950/40 via-stone-900/60 to-stone-900/90 rounded-2xl border border-emerald-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-serif">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Bảo Chứng Nghệ Nhân GuHomes</span>
              </div>
              <p className="text-stone-300 text-xs font-light leading-relaxed">
                Từng cánh sen ngọc Phỉ Thúy được mài mờ vi mô và đan nẹp vàng 24K filigree bởi nghệ nhân kim hoàn bậc thầy tại xưởng Thạnh Xuân 1.200m², phục vụ giới tinh hoa yêu nghệ thuật thư pháp tĩnh tại, giới hạn 12 tác phẩm mỗi năm.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-emerald-950/60">
                <span>Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="text-emerald-300 font-serif hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudHexatrigesimalLeafStudio;
