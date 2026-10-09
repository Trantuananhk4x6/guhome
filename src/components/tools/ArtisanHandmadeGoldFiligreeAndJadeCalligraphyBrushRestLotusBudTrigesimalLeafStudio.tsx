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
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 30 cánh',
  woodBase: 'Gỗ Mun Sừng Nam Bộ Cổ Thụ 400 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const TRIGESIMAL_LEAF_NAMES = [
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
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTrigesimalLeafStudio() {
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
        gain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 1.5)

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
      try {
        if (gainRef.current && audioCtxRef.current) {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8)
          setTimeout(() => {
            oscLowRef.current?.stop()
            oscLowRef.current?.disconnect()
            oscHighRef.current?.stop()
            oscHighRef.current?.disconnect()
            gainRef.current?.disconnect()
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
            }
            setIsAudioActive(false)
          }, 850)
        } else {
          setIsAudioActive(false)
        }
      } catch {
        setIsAudioActive(false)
      }
    }
  }

  return (
    <section className="relative w-full py-20 px-4 md:px-8 bg-gradient-to-b from-[#080d0a] via-[#0f1712] to-[#080d0a] text-emerald-100/90 overflow-hidden border-t border-b border-emerald-900/30">
      {/* Background ethereal jade lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-emerald-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-teal-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Title & Metadata */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-xs font-mono tracking-widest text-emerald-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Kiệt Tác Thư Phòng - Kê Ngự Bút Sen Tam Thập Diệp V30
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-emerald-100 tracking-tight leading-snug">
            Kê Ngự Bút Sen Tam Thập Diệp
          </h2>
          <p className="text-sm md:text-base text-emerald-200/70 leading-relaxed font-light">
            Tuyệt phẩm điêu khắc từ ngọc Phỉ Thúy Type A tự nhiên nguyên khối, bao bọc bởi 30 cánh sen Vàng 24K Filigree vi sợi đan tay tinh xảo, ngự trên bệ Gỗ Mun Sừng Nam Bộ Cổ Thụ 400 năm kết mộng cối âm dương tĩnh tại vĩnh cửu.
          </p>
        </div>

        {/* Studio Interactive Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visualizer */}
          <div className="lg:col-span-7 bg-[#0b130f]/90 border border-emerald-700/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-4 mb-6">
              <span className="text-xs font-mono text-emerald-400 tracking-wider">PHÒNG THƯ PHÁP HOÀNG GIA GUHOMES</span>
              <span className="text-xs font-mono text-emerald-300/70 bg-emerald-950/50 px-2.5 py-0.5 rounded border border-emerald-800/40">
                Thấu Quang 99.99% - 30 Cánh Sen
              </span>
            </div>

            {/* Lotus Brush Rest Visual */}
            <div className="relative h-72 md:h-88 flex items-center justify-center bg-radial-gradient from-emerald-900/20 to-transparent rounded-xl border border-emerald-900/30 overflow-hidden">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative flex flex-col items-center cursor-pointer select-none"
                onClick={() => setIsBrushPlaced(!isBrushPlaced)}
              >
                {/* Ethereal Aura */}
                <div className="absolute -inset-8 bg-emerald-500/10 blur-2xl rounded-full animate-pulse" />

                {/* Calligraphy Brush overlay */}
                <AnimatePresence>
                  {isBrushPlaced && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, rotate: -8 }}
                      animate={{ opacity: 1, y: 0, rotate: -12 }}
                      exit={{ opacity: 0, y: -25, rotate: -15 }}
                      transition={{ duration: 0.4 }}
                      className="absolute -top-12 z-30 pointer-events-none flex flex-col items-center"
                    >
                      {/* Brush Handle */}
                      <div className="w-2.5 h-36 bg-gradient-to-b from-amber-900 via-amber-950 to-stone-900 rounded-t-full shadow-lg border border-amber-700/50" />
                      {/* Brush Ferrule */}
                      <div className="w-3.5 h-6 bg-gradient-to-r from-yellow-600 via-amber-300 to-yellow-600 rounded-sm" />
                      {/* Wolf Hair Bristles */}
                      <div className="w-3 h-10 bg-gradient-to-b from-stone-900 to-stone-950 rounded-b-full shadow-md" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Jade Lotus Bud Center */}
                <div className="relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-emerald-400/40 via-teal-600/30 to-emerald-950/80 border-2 border-emerald-300/60 shadow-[0_0_50px_rgba(16,185,129,0.3)] flex items-center justify-center">
                  <div className="w-24 h-24 md:w-30 md:h-30 rounded-full border border-yellow-400/50 bg-emerald-800/20 flex flex-col items-center justify-center text-center p-2">
                    <span className="text-[10px] font-mono text-yellow-300 uppercase tracking-widest">PHỈ THÚY A</span>
                    <span className="text-xs font-serif text-emerald-100 font-bold mt-1">30 CÁNH SEN</span>
                    <span className="text-[9px] text-emerald-300/70 font-mono mt-0.5">
                      {TRIGESIMAL_LEAF_NAMES[activeLeafIndex]}
                    </span>
                  </div>
                </div>

                {/* Wood Base: Gỗ Mun Sừng Nam Bộ 400 Năm */}
                <div className="relative z-10 -mt-2 w-48 md:w-56 h-6 bg-gradient-to-r from-[#111111] via-[#222222] to-[#111111] rounded-t border-t border-stone-600/40 shadow-xl" />
                <div className="relative z-10 w-56 md:w-64 h-5 bg-[#0a0a0a] rounded-b border border-stone-800 flex items-center justify-around px-4">
                  <span className="text-[8px] font-mono text-stone-400">MUN SỪNG NAM BỘ 400N</span>
                  <span className="text-[8px] font-mono text-emerald-400/70">MỘNG CỐI ÂM DƯƠNG</span>
                </div>
              </motion.div>

              {/* Status Hint */}
              <div className="absolute bottom-3 left-4 text-[11px] font-mono text-emerald-400/60 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Nhấp vào để {isBrushPlaced ? 'nhấc Ngự Bút lên' : 'đặt Ngự Bút xuống'}</span>
              </div>
            </div>

            {/* Controls Dashboard */}
            <div className="mt-6 pt-6 border-t border-emerald-900/30 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-emerald-200/80 mb-2">
                  <span>ĐỘ PHÓNG ĐẠI TỈ LỆ VÀNG</span>
                  <span className="text-emerald-400 font-bold">{zoomLevel.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min={0.8}
                  max={1.6}
                  step={0.1}
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-emerald-950/60 rounded-lg cursor-pointer h-2 border border-emerald-800/40"
                />
                <div className="flex justify-between text-[10px] font-mono text-emerald-400/50 mt-1">
                  <span>0.8x Toàn Cảnh</span>
                  <span>1.0x Chuẩn Mực</span>
                  <span>1.6x Chi Tiết Sợi Chỉ Vàng</span>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                    className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border ${
                      isBrushPlaced
                        ? 'bg-emerald-700/80 text-emerald-50 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                        : 'bg-emerald-950/60 text-emerald-300 border-emerald-800/50 hover:bg-emerald-900/50'
                    }`}
                  >
                    {isBrushPlaced ? 'NHẤC NGỰ BÚT LÊN' : 'GÁC NGỰ BÚT XUỐNG'}
                  </button>

                  <button
                    onClick={toggleAcousticHarmony}
                    className={`min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border flex items-center justify-center gap-1.5 ${
                      isAudioActive
                        ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'bg-black/40 text-emerald-400/70 border-emerald-900/40 hover:bg-emerald-950/40'
                    }`}
                    title="Kích hoạt hòa âm tần số 528Hz & 1056Hz thiền định"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{isAudioActive ? '528Hz + 1056Hz BẬT' : 'HÒA ÂM BÁT ĐỘ'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Leaf Selector & Technical Specs */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-serif text-emerald-200 border-b border-emerald-900/40 pb-2">
              Khảo Sát 30 Cánh Sen Filigree
            </h3>

            {/* 30 Leaf Navigation Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {TRIGESIMAL_LEAF_NAMES.map((leaf, idx) => (
                <button
                  key={leaf}
                  onClick={() => setActiveLeafIndex(idx)}
                  className={`min-h-[44px] p-1 rounded border text-[10px] font-mono transition-all duration-200 ${
                    activeLeafIndex === idx
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold'
                      : 'bg-[#0e1712]/50 border-emerald-900/30 text-emerald-400/60 hover:text-emerald-300'
                  }`}
                >
                  Cánh {idx + 1}
                </button>
              ))}
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs space-y-1">
              <div className="text-emerald-300 font-mono font-semibold">
                Đang Xem: {TRIGESIMAL_LEAF_NAMES[activeLeafIndex]}
              </div>
              <p className="text-emerald-200/70 text-[11px] leading-relaxed">
                Từng sợi chỉ vàng 24K độ mảnh 0.10mm được nghệ nhân kim hoàn GuHomes vuốt thẳng, uốn cánh sen đa tầng, tôi luyện qua nhiệt độ chuẩn xác để giữ trọn sắc óng ánh vĩnh cửu.
              </p>
            </div>

            {/* Material Specifications Table */}
            <div className="space-y-2 bg-[#0d1611]/60 border border-emerald-900/40 rounded-xl p-4 text-xs">
              <div className="font-mono text-emerald-300 font-semibold uppercase text-[11px] tracking-wider mb-2 border-b border-emerald-900/40 pb-1">
                Thông Số Kỹ Thuật Độc Bản
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-emerald-400/70">Ngọc Liệu:</span>
                <span className="text-emerald-200 font-mono">{SPEC.jadeGrade}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-emerald-400/70">Thấu Quang:</span>
                <span className="text-emerald-200 font-mono">{SPEC.translucency}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-emerald-400/70">Chỉ Vàng Filigree:</span>
                <span className="text-emerald-200 font-mono">{SPEC.goldFiligree}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-emerald-400/70">Đế Gỗ Quý:</span>
                <span className="text-emerald-200 font-mono">{SPEC.woodBase}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-950">
                <span className="text-emerald-400/70">Góc Thoát Mực:</span>
                <span className="text-emerald-200 font-mono">{SPEC.inclineAngle}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-emerald-400/70">Tần Số Thiền Định:</span>
                <span className="text-emerald-200 font-mono">{SPEC.acoustics}</span>
              </div>
            </div>

            {/* Atelier Contact & Limit Note */}
            <div className="text-[11px] text-emerald-400/60 leading-relaxed font-mono">
              Xưởng may đo Thạnh Xuân 1.200m² - Giới hạn 12 công trình độc bản/năm.
              <br />
              KTS Trưởng: 0368 757 916 - Email: guhomesvn@gmail.com
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTrigesimalLeafStudio
