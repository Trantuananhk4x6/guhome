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
    name: 'Bạch Kỳ Tây Giang Cổ Mộc',
    origin: 'Rừng nguyên sinh đỉnh Tây Giang, Quảng Nam',
    resinDensity: '99.98% chìm hoàn toàn trong nước nguồn tinh khiết',
    aromaProfile: 'Hương thanh khiết tột đỉnh, ngọt ngào hoa quỳnh đêm & mật ong rừng ngàn năm',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Sa Thầy Hóa Thạch',
    origin: 'Vườn quốc gia Chư Mom Ray, Sa Thầy, Kon Tum',
    resinDensity: '99.99% đặc quánh như hắc ngọc huyền bí sa thạch',
    aromaProfile: 'Hương đầm ấm thâm sơn cổ tích, nốt trầm tĩnh mịch uy nghiêm lưu giữ ngàn năm',
    burnTemp: 165,
  },
  {
    name: 'Thanh Kỳ Kon Plông Lam Tủy',
    origin: 'Rừng già nguyên sinh Măng Đen, Kon Plông',
    resinDensity: '99.95% thấu quang ánh lam ngọc kim tủy lung linh',
    aromaProfile: 'Hương vương giả quý phái, ngọt thanh sâm ngọc linh & hoa dại Trường Sơn phiêu bồng',
    burnTemp: 145,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV26() {
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
      } catch (err) {
        console.error('Audio Context Error:', err)
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
            gainRef.current?.disconnect()
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
            }
            setIsAudioHarmonics(false)
          }, 650)
        } catch {
          setIsAudioHarmonics(false)
        }
      } else {
        setIsAudioHarmonics(false)
      }
    }
  }

  const handleSelectVariety = (item: KynamSpec) => {
    setSelectedKynam(item)
    setCurrentTemp(item.burnTemp)
  }

  return (
    <section className="relative w-full py-20 px-4 md:px-8 bg-gradient-to-b from-[#0c0a06] via-[#16120b] to-[#0c0a06] text-amber-100/90 overflow-hidden border-t border-b border-amber-900/30">
      {/* Radiant atmospheric background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-yellow-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/40 text-xs font-mono tracking-widest text-amber-300 uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Bảo Thất Hương Đạo V26 - Đỉnh Lư Kim Long Mã Thập Nhị Lục Thế
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-amber-100 tracking-tight leading-snug">
            Bảo Thất Đỉnh Lư Kim Long Mã V26
          </h2>
          <p className="text-sm md:text-base text-amber-200/70 leading-relaxed font-light">
            Tuyệt tác đỉnh xông Kỳ Nam hoàng gia đan tay thủ công Vàng 24K Filigree sợi vi thêu 0.12mm hình tượng Kim Long Mã Đạp Sen Thập Nhị Lục Thế V26 ngậm hồng ngọc châu, tọa lạc trên Án Gỗ Trầm Hương Rừng Cổ Thụ 400 năm kết mộng âm dương không đinh sắt.
          </p>
        </div>

        {/* Workspace Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Furnace Simulation */}
          <div className="lg:col-span-7 bg-[#130f0a]/90 border border-amber-700/30 rounded-2xl p-6 md:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-amber-900/40 pb-4 mb-6">
              <span className="text-xs font-mono text-amber-400 tracking-wider">HỆ THỐNG VI ĐIỀU NHIỆT KỲ NAM KHÔNG KHÓI</span>
              <span className="text-xs font-mono text-amber-300/60 bg-amber-900/30 px-2.5 py-0.5 rounded border border-amber-800/40">
                GuHomes Filigree 24K V26
              </span>
            </div>

            {/* Incense Burner Core Display */}
            <div className="relative h-72 md:h-88 flex items-center justify-center bg-radial-gradient from-amber-900/20 to-transparent rounded-xl border border-amber-900/20 overflow-hidden">
              {/* Ethereal Smoke Simulation */}
              <AnimatePresence>
                {isIncenseActive && (
                  <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.8 }}
                      animate={{
                        opacity: [0, 0.45, 0.25, 0],
                        y: [-10, -70, -120],
                        scale: [0.9, 1.2, 1.5],
                        filter: ['blur(4px)', 'blur(10px)', 'blur(16px)'],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: 'easeOut' }}
                      className="w-24 h-48 bg-gradient-to-t from-amber-200/30 via-yellow-100/20 to-transparent rounded-full"
                    />
                  </div>
                )}
              </AnimatePresence>

              {/* Incense Burner Structure */}
              <motion.div
                animate={{
                  scale: isIncenseActive ? 1.02 : 1,
                  rotateZ: isIncenseActive ? [0, 0.5, -0.5, 0] : 0,
                }}
                transition={{ duration: 3, repeat: isIncenseActive ? Infinity : 0, ease: 'easeInOut' }}
                className="relative z-10 flex flex-col items-center"
              >
                {/* Long Mã Filigree Finial - Vàng 24K */}
                <div className="w-28 md:w-36 h-12 bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 rounded-t-full border border-amber-300/80 shadow-[0_0_20px_rgba(251,191,36,0.3)] flex flex-col items-center justify-center p-1">
                  <span className="text-[9px] font-mono text-stone-950 font-bold tracking-widest uppercase">
                    LONG MÃ V26 FILIGREE
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping mt-0.5" title="Hồng Ngọc Châu" />
                </div>

                {/* Lotus Petal Filigree Chamber - Vàng 24K Thấu Quang */}
                <div className="w-44 md:w-56 h-36 bg-gradient-to-b from-stone-950 via-amber-950/70 to-stone-900 border-2 border-amber-500/50 rounded-2xl p-3 flex flex-col items-center justify-between shadow-2xl relative">
                  <div className="w-full flex justify-between px-2 text-[8px] font-mono text-amber-400/80">
                    <span>ĐIỆN TRỞ BẠCH KIM</span>
                    <span>{currentTemp}°C</span>
                  </div>

                  {/* Micro Ceramic Chamber Center */}
                  <div className="w-20 h-20 rounded-full border border-amber-400/40 bg-radial-gradient from-amber-500/20 to-stone-950 flex flex-col items-center justify-center p-1">
                    <span className="text-[8px] font-mono text-amber-300 text-center leading-tight">
                      {selectedKynam.name.split(' ')[0]} {selectedKynam.name.split(' ')[1]}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-200 mt-1">
                      {isIncenseActive ? `${currentTemp}°C` : 'TĨNH NHIỆT'}
                    </span>
                  </div>

                  <div className="w-full text-center text-[8px] font-mono text-amber-400/60 uppercase tracking-widest">
                    VÀNG 24K FILIGREE 0.12MM
                  </div>
                </div>

                {/* Wood Base - Án Gỗ Trầm Hương Rừng 400 Năm */}
                <div className="w-56 md:w-68 h-7 bg-gradient-to-r from-stone-950 via-amber-950 to-stone-950 rounded-b-xl border-t border-b border-amber-600/40 flex items-center justify-around px-3 text-[9px] font-mono text-amber-300/80">
                  <span>TRẦM HƯƠNG 400N</span>
                  <span>MỘNG ÂM DƯƠNG</span>
                  <span>KHÔNG KHÓI</span>
                </div>
              </motion.div>
            </div>

            {/* Interactive Control Dashboard */}
            <div className="mt-6 pt-6 border-t border-amber-900/30 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-mono text-amber-200/80 mb-2">
                  <span>VI ĐIỀU NHIỆT KHOANG GỐM BẠCH KIM</span>
                  <span className="text-amber-400 font-bold">{currentTemp}°C</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={240}
                  step={1}
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-amber-950/60 rounded-lg cursor-pointer h-2 border border-amber-800/40"
                />
                <div className="flex justify-between text-[10px] font-mono text-amber-400/50 mt-1">
                  <span>80°C Ủ Hương</span>
                  <span>135°C Bạch Kỳ</span>
                  <span>240°C Cực Điểm</span>
                </div>
              </div>

              <div className="flex flex-col justify-end gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsIncenseActive(!isIncenseActive)}
                    className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border ${
                      isIncenseActive
                        ? 'bg-amber-600 text-stone-950 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                        : 'bg-amber-950/60 text-amber-300 border-amber-800/50 hover:bg-amber-900/50'
                    }`}
                  >
                    {isIncenseActive ? 'DỪNG XÔNG HƯƠNG' : 'KÍCH HOẠT NHIỆT XÔNG'}
                  </button>

                  <button
                    onClick={toggleSound}
                    className={`min-h-[44px] px-4 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-300 border flex items-center justify-center gap-1.5 ${
                      isAudioHarmonics
                        ? 'bg-amber-500/20 text-amber-300 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'bg-black/40 text-amber-400/70 border-amber-900/40 hover:bg-amber-950/40'
                    }`}
                    title="Kích hoạt tần số 528Hz & 741Hz hòa âm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{isAudioHarmonics ? '528+741Hz BẬT' : 'HÒA ÂM HƯƠNG'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tam Phẩm Kỳ Nam Selection & Technical Specs */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-serif text-amber-200 border-b border-amber-900/40 pb-2">
              Tam Phẩm Kỳ Nam Quý Hiếm
            </h3>

            {/* Variety Selector */}
            <div className="space-y-2">
              {KY_NAM_VARIETIES.map((kynam) => (
                <div
                  key={kynam.name}
                  onClick={() => handleSelectVariety(kynam)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                    selectedKynam.name === kynam.name
                      ? 'bg-amber-950/50 border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                      : 'bg-[#100d08]/60 border-amber-900/30 hover:border-amber-700/50 text-amber-200/60'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-serif text-sm font-semibold text-amber-100">
                      {kynam.name}
                    </span>
                    <span className="text-[11px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/40">
                      Chuẩn {kynam.burnTemp}°C
                    </span>
                  </div>
                  <div className="text-[11px] text-amber-300/70 line-clamp-1 mb-1 font-light">
                    Nguồn gốc: {kynam.origin}
                  </div>
                  <div className="text-[11px] text-amber-400/90 font-mono">
                    Độ tích dầu: {kynam.resinDensity}
                  </div>
                </div>
              ))}
            </div>

            {/* Detailed Selected Profile */}
            <div className="p-4 bg-amber-950/30 border border-amber-800/30 rounded-xl space-y-2 text-xs">
              <div className="font-mono text-amber-300 font-semibold uppercase">
                Hương Phẩm: {selectedKynam.name}
              </div>
              <p className="text-amber-200/80 leading-relaxed font-light">
                {selectedKynam.aromaProfile}
              </p>
              <div className="pt-2 border-t border-amber-900/40 flex justify-between text-[11px] font-mono text-amber-400/80">
                <span>Nhiệt độ xông tối ưu: {selectedKynam.burnTemp}°C</span>
                <span>Bảo tồn tinh dầu 100%</span>
              </div>
            </div>

            {/* GuHomes Atelier Crafting Standards */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 to-yellow-950/30 border border-amber-800/40 space-y-1.5 text-xs text-amber-200/70">
              <div className="font-mono text-amber-300 font-semibold uppercase text-[11px] tracking-wider">
                Cam Kết Thủ Công Tinh Xảo GuHomes
              </div>
              <p>
                - Xưởng may đo Thạnh Xuân 1.200m² chế tác thủ công độc bản từng chi tiết ngàm mộng.
              </p>
              <p>
                - Giới hạn trần 12 công trình/năm bảo chứng phẩm cấp Quiet Luxury tuyệt đối.
              </p>
              <p className="text-amber-400 font-mono text-[11px] pt-1">
                Hotline KTS Trưởng: 0368 757 916 - Email: guhomesvn@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV26
