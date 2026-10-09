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
  goldFiligree: 'Vàng 24K Filigree 0.10mm đan tay hoa sen 31 cánh',
  woodBase: 'Bệ Ngọc Bích Hòa Điền Cổ Thạch 400 năm (Mộng cối âm dương)',
  inclineAngle: '15° Thoát giọt mực ngự bút hoàn hảo',
  acoustics: '528Hz & 1056Hz (Hòa âm Bát Độ Thiền Định)',
}

const UNTRIGESIMAL_LEAF_NAMES = [
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
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudUntrigesimalLeafStudio() {
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
      } catch (err) {
        console.error('Audio initialization error:', err)
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
            gainRef.current?.disconnect()
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
            }
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
    <section className="relative w-full py-20 px-4 md:px-8 bg-gradient-to-b from-[#060e0a] via-[#0b1712] to-[#060e0a] text-teal-100/90 overflow-hidden border-t border-b border-teal-900/30">
      {/* Luminous jade aura backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[350px] bg-teal-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-emerald-600/5 blur-[130px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-950/40 text-xs font-mono tracking-widest text-teal-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Kiệt Tác Ngự Bút Phòng - Sen Tam Thập Nhất Diệp 31 Cánh
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-teal-50 tracking-tight leading-snug">
            Kê Ngự Bút Sen Tam Thập Nhất Diệp
          </h2>
          <p className="text-sm md:text-base text-teal-200/70 leading-relaxed font-light">
            Bảo vật thư phòng hoàng gia chế tác từ Ngọc Bích Phỉ Thúy Type A tự nhiên thấu quang 99.99%, liên kết cùng khung Vàng 24K Filigree đan tay thủ công 31 cánh hoa sen Tam Thập Nhất Diệp trên bệ Ngọc Bích Hòa Điền Cổ Thạch 400 năm tuổi.
          </p>
        </div>

        {/* Studio Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Display */}
          <div className="lg:col-span-7 bg-[#09140f]/90 border border-teal-700/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-teal-900/40 pb-4 mb-6">
              <span className="text-xs font-mono text-teal-400 tracking-wider">THẤU QUANG PHỈ THÚY TYPE A &amp; VÀNG 24K</span>
              <span className="text-xs font-mono text-teal-300/60 bg-teal-900/30 px-2.5 py-0.5 rounded border border-teal-800/40">
                GuHomes 31-Leaf Filigree
              </span>
            </div>

            {/* Interactive Brush Rest Simulation Canvas */}
            <div className="relative h-72 md:h-88 flex items-center justify-center bg-radial-gradient from-teal-900/30 to-transparent rounded-xl border border-teal-900/20 overflow-hidden">
              {/* Jade Glow Aura Effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.45, 0.2],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-48 h-48 bg-teal-400/15 rounded-full blur-2xl"
                />
              </div>

              {/* 3D Brush Rest Structure */}
              <motion.div
                animate={{
                  scale: zoomLevel,
                }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Imperial Calligraphy Brush Rest Model */}
                <div className="relative flex flex-col items-center">
                  {/* Calligraphy Brush */}
                  <motion.div
                    animate={{
                      y: isBrushPlaced ? 0 : -35,
                      rotate: isBrushPlaced ? 15 : 0,
                    }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute -top-12 z-20 w-52 md:w-64 h-3 bg-gradient-to-r from-amber-900 via-amber-700 to-stone-900 rounded-full shadow-lg border border-amber-500/40 flex items-center px-2 cursor-pointer"
                    onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                    title="Nhấn để nhấc / gác ngự bút lông"
                  >
                    {/* Brush Hair Tip */}
                    <div className="w-8 h-4 bg-stone-950 rounded-l-full border-l border-teal-400/40" />
                    <div className="flex-1 text-[7px] font-mono text-amber-200/80 text-right pr-2">
                      NGỰ BÚT LÔNG SÓC
                    </div>
                  </motion.div>

                  {/* 31 Lotus Petal Rest Crown */}
                  <div className="w-56 md:w-68 h-28 bg-gradient-to-b from-teal-400/30 via-emerald-600/20 to-teal-950/60 rounded-t-3xl border-2 border-yellow-500/60 shadow-[0_0_25px_rgba(20,184,166,0.3)] backdrop-blur-md p-2 flex flex-col items-center justify-between">
                    <div className="text-[9px] font-mono text-yellow-300 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      31 CÁNH SEN FILIGREE VÀNG 24K
                    </div>

                    {/* Petals Display Matrix */}
                    <div className="grid grid-cols-8 gap-1 w-full px-2">
                      {[...Array(31)].map((_, i) => (
                        <div
                          key={i}
                          onClick={() => setActiveLeafIndex(i)}
                          className={`h-4 rounded cursor-pointer transition-all border ${
                            activeLeafIndex === i
                              ? 'bg-yellow-400 border-white shadow-[0_0_8px_rgba(250,204,21,0.8)] scale-110'
                              : 'bg-teal-800/40 border-yellow-500/30 hover:bg-teal-700/60'
                          }`}
                          title={UNTRIGESIMAL_LEAF_NAMES[i]}
                        />
                      ))}
                    </div>

                    <div className="text-[8px] font-mono text-teal-300/80">
                      GÓC NGHIÊNG THOÁT MỰC 15° CHUẨN XÁC
                    </div>
                  </div>

                  {/* Base Stand - Ngọc Bích Hòa Điền Cổ Thạch 400 Năm */}
                  <div className="w-64 md:w-76 h-8 bg-gradient-to-r from-teal-950 via-emerald-950 to-teal-950 rounded-b-xl border-t border-b border-teal-600/40 flex items-center justify-around px-3 text-[9px] font-mono text-teal-300/90 shadow-xl">
                    <span>HÒA ĐIỀN 400N</span>
                    <span>THẤU QUANG 99.99%</span>
                    <span>MỘNG ÂM DƯƠNG</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Dashboard */}
            <div className="mt-6 pt-6 border-t border-teal-900/30 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-teal-200/80 mb-2">
                  <span>KÍNH HIỂN VI SOI VÂN NGỌC &amp; VÀNG</span>
                  <span className="text-teal-400 font-bold">{zoomLevel.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={1.5}
                  step={0.05}
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full accent-teal-500 bg-teal-950/60 rounded-lg cursor-pointer h-2 border border-teal-800/40"
                />
                <div className="flex justify-between text-[10px] font-mono text-teal-400/50 mt-1">
                  <span>1.0x Thường</span>
                  <span>1.25x Cận Cảnh</span>
                  <span>1.5x Tinh Vân</span>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                    className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border ${
                      isBrushPlaced
                        ? 'bg-teal-600 text-stone-950 border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.4)]'
                        : 'bg-teal-950/60 text-teal-300 border-teal-800/50 hover:bg-teal-900/50'
                    }`}
                  >
                    {isBrushPlaced ? 'NHẤC NGỰ BÚT LÊN' : 'GÁC NGỰ BÚT 15°'}
                  </button>

                  <button
                    onClick={toggleAcousticHarmony}
                    className={`min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border flex items-center justify-center gap-1.5 ${
                      isAudioActive
                        ? 'bg-teal-500/20 text-teal-300 border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]'
                        : 'bg-black/40 text-teal-400/70 border-teal-900/40 hover:bg-teal-950/40'
                    }`}
                    title="Kích hoạt âm thoa Solfeggio 528Hz & 1056Hz"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    <span>{isAudioActive ? '528+1056Hz BẬT' : 'ÂM THOA'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications & GuHomes Norms */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-serif text-teal-200 border-b border-teal-900/40 pb-2">
              Thông Số Giác Khí Kê Ngự Bút
            </h3>

            <div className="space-y-2 bg-[#0a1510]/60 border border-teal-900/40 rounded-xl p-4 text-xs">
              <div className="flex justify-between py-1.5 border-b border-teal-950">
                <span className="text-teal-400/70 font-mono">Chất Ngọc:</span>
                <span className="text-teal-100 font-semibold">{SPEC.jadeGrade}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-teal-950">
                <span className="text-teal-400/70 font-mono">Độ Thấu Quang:</span>
                <span className="text-teal-300 font-bold font-mono">{SPEC.translucency}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-teal-950">
                <span className="text-teal-400/70 font-mono">Kim Hoàn:</span>
                <span className="text-teal-100">{SPEC.goldFiligree}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-teal-950">
                <span className="text-teal-400/70 font-mono">Bệ Đỡ Cổ Thạch:</span>
                <span className="text-teal-100 font-semibold">{SPEC.woodBase}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-teal-950">
                <span className="text-teal-400/70 font-mono">Góc Thoát Mực:</span>
                <span className="text-teal-300 font-bold font-mono">{SPEC.inclineAngle}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-teal-400/70 font-mono">Hòa Âm Bát Độ:</span>
                <span className="text-teal-100 font-mono">{SPEC.acoustics}</span>
              </div>
            </div>

            {/* Currently Active Leaf Profile */}
            <div className="p-4 bg-teal-950/30 border border-teal-800/30 rounded-xl space-y-2 text-xs">
              <div className="font-mono text-teal-300 font-semibold uppercase">
                Cánh Sen Thứ {activeLeafIndex + 1}: {UNTRIGESIMAL_LEAF_NAMES[activeLeafIndex]}
              </div>
              <p className="text-teal-200/80 leading-relaxed font-light">
                Từng cánh sen trong tổng số 31 cánh Tam Thập Nhất Diệp được các nghệ nhân kim hoàn GuHomes dùng nhíp gắp sợi vàng ròng 24K vi sợi 0.10mm uốn cong ôm trọn phiến ngọc phỉ thúy mỏng 0.8mm thấu quang rực rỡ, tượng trưng cho sự thanh cao thoát tục và minh triết vô biên.
              </p>
            </div>

            {/* GuHomes Atelier Crafting Standards */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/40 to-emerald-950/30 border border-teal-800/40 space-y-1.5 text-xs text-teal-200/70">
              <div className="font-mono text-teal-300 font-semibold uppercase text-[11px] tracking-wider">
                Đặc Quyền May Đo GuHomes
              </div>
              <p>
                - Xưởng may đo Thạnh Xuân 1.200m² liên kết nghệ nhân kim hoàn đỉnh cao.
              </p>
              <p>
                - Giới hạn trần 12 công trình/năm gìn giữ trọn vẹn giá trị tinh hoa.
              </p>
              <p className="text-teal-400 font-mono text-[11px] pt-1">
                Hotline KTS Trưởng: 0368 757 916 - Email: guhomesvn@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudUntrigesimalLeafStudio
