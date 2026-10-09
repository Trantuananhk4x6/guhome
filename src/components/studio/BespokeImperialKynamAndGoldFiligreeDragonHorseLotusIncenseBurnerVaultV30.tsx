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
    name: 'Bạch Kỳ Vạn Giã Cổ Mộc',
    origin: 'Rừng nguyên sinh Đầm Môn, Vạn Giã, Khánh Hòa',
    resinDensity: '99.98% chìm hoàn toàn trong nước nguồn tinh khiết',
    aromaProfile: 'Hương thanh khiết tột đỉnh, thơm ngát hoa sen trắng bách diệp & mật ong rừng ngàn năm',
    burnTemp: 135,
  },
  {
    name: 'Hắc Kỳ Trà Bồng Hóa Thạch',
    origin: 'Vùng cao nguyên đá bazan cổ Trà Bồng, Quảng Ngãi',
    resinDensity: '99.99% đặc quánh như hắc ngọc huyền bí sa thạch',
    aromaProfile: 'Hương đầm ấm thâm sơn cổ tích, nốt trầm tĩnh mịch uy nghiêm lưu giữ 72 giờ',
    burnTemp: 165,
  },
  {
    name: 'Thanh Kỳ Đắk Glei Lam Tủy',
    origin: 'Rừng nguyên sinh thông đỏ Đắk Glei, Kon Tum',
    resinDensity: '99.95% thấu quang ánh lam ngọc kim tủy lung linh',
    aromaProfile: 'Hương vương giả quý phái, ngọt thanh hoa hoàng lan rừng & sâm quy Trường Sơn phiêu bồng',
    burnTemp: 145,
  },
]

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV30() {
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
            audioCtxRef.current?.close()
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

  const handleSelectKynam = (item: KynamSpec) => {
    setSelectedKynam(item)
    setCurrentTemp(item.burnTemp)
  }

  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden rounded-3xl border border-amber-900/30 my-12 shadow-2xl backdrop-blur-md">
      {/* Background Radiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-amber-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-red-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-800 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 text-xs font-serif uppercase tracking-widest mb-3">
              <span>Bảo Thất Ngự Hương Hoàng Gia V30 (Mốc Son Đại Viên Mãn)</span>
              <span>·</span>
              <span>Độc Bản GuHomes</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-light text-stone-100 tracking-wide">
              Đỉnh Lư Kim Long Mã Thập Nhị Thập Thế V30 & Án Trầm Hương Rừng Cổ Thụ 400 Năm
            </h2>
            <p className="text-stone-400 text-sm md:text-base font-light mt-2 max-w-3xl leading-relaxed">
              Kiệt tác đỉnh cao đúc vàng ròng 24K filigree tạo hình Long Mã Đạp Sen Thập Nhị Thập Thế V30 ghi dấu mốc son viên mãn, ngự trên án thư gỗ Trầm Hương Rừng Khánh Hòa cổ thụ 400 năm, tích hợp buồng vi điều nhiệt điện trở bạch kim 80°C - 240°C.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl border text-xs font-serif tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isAudioHarmonics
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
                  : 'bg-stone-900 border-stone-700 text-stone-300 hover:border-amber-600/50'
              }`}
            >
              <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isAudioHarmonics ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                )}
              </svg>
              <span>{isAudioHarmonics ? 'Dừng Hòa Âm 528Hz & 741Hz' : 'Khởi Động Hòa Âm Tĩnh Tâm'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Chamber Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Visual Display */}
          <div className="lg:col-span-8 bg-stone-900/60 rounded-2xl border border-stone-800 p-6 relative overflow-hidden backdrop-blur-sm min-h-[440px] flex flex-col justify-between">
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/60 pb-3">
              <span className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isIncenseActive ? 'bg-amber-400 animate-ping' : 'bg-stone-600'}`} />
                Trạng Thái Lò Xông: {isIncenseActive ? `Đang Tỏa Hương (${currentTemp}°C)` : 'Chế Độ Nghỉ Cân Bằng'}
              </span>
              <span className="text-amber-400 font-serif">Án Thư Gỗ Trầm Hương Rừng Cổ Thụ 400 Năm</span>
            </div>

            {/* Central Incense Vault Representation */}
            <div className="relative py-12 flex flex-col items-center justify-center">
              {/* Thermal Halo */}
              <div
                className={`relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-amber-600/30 flex items-center justify-center transition-all duration-700 ${
                  isIncenseActive ? 'shadow-2xl shadow-amber-600/30 border-amber-500/60' : 'shadow-inner shadow-stone-950'
                }`}
              >
                {/* Simulated Rising Fragrant Smoke */}
                <AnimatePresence>
                  {isIncenseActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 0.6, y: -40 }}
                      exit={{ opacity: 0 }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                      className="absolute -top-12 flex flex-col items-center pointer-events-none"
                    >
                      <div className="w-1.5 h-16 bg-gradient-to-t from-amber-400 via-amber-200/50 to-transparent blur-sm rounded-full" />
                      <span className="text-[10px] font-serif text-amber-300/80 tracking-widest mt-1">Làn Khói Ngự Hương</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Golden Dragon-Horse Lotus Incense Burner V30 Pod */}
                <motion.div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-amber-900/60 via-stone-900 to-amber-950 border-2 border-amber-500/60 p-5 flex flex-col items-center justify-center text-center shadow-2xl relative"
                  animate={{ scale: isIncenseActive ? [1, 1.02, 1] : 1 }}
                  transition={{ repeat: Infinity, duration: 4 }}
                >
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center mb-2 shadow-inner">
                    <svg className="w-8 h-8 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-serif text-amber-200 uppercase tracking-widest">Long Mã Sen V30</span>
                  <span className="text-[9px] text-amber-400/80 mt-1">{selectedKynam.name}</span>
                </motion.div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800/60">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsIncenseActive(!isIncenseActive)}
                  className={`min-h-[44px] min-w-[44px] px-5 py-2 rounded-lg text-xs font-serif transition-colors border ${
                    isIncenseActive
                      ? 'bg-amber-600 text-stone-950 font-medium border-amber-500 shadow-md shadow-amber-600/30'
                      : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700'
                  }`}
                >
                  {isIncenseActive ? 'Tắt Nhiệt Lư Xông' : 'Khai Hỏa Lư Xông Vi Nhiệt'}
                </button>
              </div>

              {/* Temperature Adjuster */}
              <div className="flex items-center gap-3 bg-stone-950/60 px-3 py-1.5 rounded-xl border border-stone-800">
                <span className="text-xs text-stone-400 font-serif">Vi Điều Nhiệt:</span>
                <input
                  type="range"
                  min="80"
                  max="240"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="w-24 md:w-32 accent-amber-500 cursor-pointer"
                />
                <span className="text-xs font-serif text-amber-300 w-12 text-right">{currentTemp}°C</span>
              </div>
            </div>
          </div>

          {/* Side Varieties & Atelier Specs */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-stone-900/80 rounded-2xl border border-stone-800 p-6 space-y-4 backdrop-blur-sm">
              <h3 className="text-sm font-serif uppercase tracking-widest text-amber-400 border-b border-stone-800 pb-2">
                Tuyển Tập Kỳ Nam Ngự Dụng
              </h3>

              <div className="space-y-3">
                {KY_NAM_VARIETIES.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleSelectKynam(item)}
                    className={`min-h-[44px] w-full text-left p-3 rounded-xl border transition-all duration-300 ${
                      selectedKynam.name === item.name
                        ? 'bg-amber-950/40 border-amber-500/50 shadow-md'
                        : 'bg-stone-950/40 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif text-amber-200">{item.name}</span>
                      <span className="text-[10px] text-amber-400/80 font-mono">{item.burnTemp}°C</span>
                    </div>
                    <p className="text-[11px] text-stone-400 font-light mt-1 line-clamp-1">{item.aromaProfile}</p>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-800 space-y-2 text-xs">
                <div>
                  <span className="text-stone-500 block">Xuất Xứ Ngự Phẩm:</span>
                  <span className="text-stone-200 font-serif">{selectedKynam.origin}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Tỷ Trọng Nhựa Trầm:</span>
                  <span className="text-stone-200 font-serif">{selectedKynam.resinDensity}</span>
                </div>
              </div>
            </div>

            {/* Atelier Craftsmanship Stamp */}
            <div className="bg-gradient-to-br from-amber-950/40 via-stone-900/60 to-stone-900/90 rounded-2xl border border-amber-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-serif">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Chế Tác Thủ Công Xưởng Thạnh Xuân</span>
              </div>
              <p className="text-stone-300 text-xs font-light leading-relaxed">
                Từng chi tiết vàng ròng 24K filigree được nghệ nhân kim hoàn kéo sợi 0.12mm uốn lượn hình Long Mã Đạp Sen, kết hợp gỗ Trầm Hương Rừng 400 năm tuổi không cong vênh, trần chỉ 12 tuyệt phẩm mỗi năm.
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400 border-t border-amber-950/60">
                <span>Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="text-amber-300 font-serif hover:underline">
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

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV30;
