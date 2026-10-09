'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PavilionSpec {
  timberAge: string
  bonsaiAge: string
  temperatureReduction: string
  relativeHumidity: string
  airflowVelocity: string
  acousticFrequency: string
}

const SPEC: PavilionSpec = {
  timberAge: '480 năm (Gỗ Long Não Bắc Bộ Cổ Thụ Tinh Dầu Kháng Khuẩn Thanh Khiết)',
  bonsaiAge: '490 năm (Bonsai Đa Búp Đỏ Cổ Thụ Dáng Phụ Tử Tương Thân Bách Niên)',
  temperatureReduction: '-11.8°C (Thủy nhiệt vi khí hậu ven rạch Sài Gòn luân chuyển)',
  relativeHumidity: '42% - 46% RH (Điều ẩm tự nhiên qua hào hoa súng tím đa sắc)',
  airflowVelocity: '5.8 m/s (Gió đối lưu ven sông Sài Gòn tuần hoàn)',
  acousticFrequency: '528Hz & 432Hz (Thanh âm thiền trà kép Solfeggio)',
}

export function SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV8() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(359)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [activeMoatLevel, setActiveMoatLevel] = useState<'low' | 'balanced' | 'high'>('balanced')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const oscHarmonicRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop()
          oscRef.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (oscHarmonicRef.current) {
        try {
          oscHarmonicRef.current.stop()
          oscHarmonicRef.current.disconnect()
        } catch {
          // ignore
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close()
        } catch {
          // ignore
        }
      }
    }
  }, [])

  const toggleAcoustic = () => {
    if (!isAudioPlaying) {
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
        osc2.frequency.setValueAtTime(432, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        oscRef.current = osc1
        oscHarmonicRef.current = osc2
        gainRef.current = gain
        setIsAudioPlaying(true)
      } catch (e) {
        console.error('Web Audio API not supported:', e)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        try {
          gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
          setTimeout(() => {
            if (oscRef.current) {
              oscRef.current.stop()
              oscRef.current.disconnect()
              oscRef.current = null
            }
            if (oscHarmonicRef.current) {
              oscHarmonicRef.current.stop()
              oscHarmonicRef.current.disconnect()
              oscHarmonicRef.current = null
            }
            if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close()
              audioCtxRef.current = null
            }
            setIsAudioPlaying(false)
          }, 600)
        } catch {
          setIsAudioPlaying(false)
        }
      } else {
        setIsAudioPlaying(false)
      }
    }
  }

  const rotateBonsai = (deg: number) => {
    setBonsaiRotation((prev) => (prev + deg) % 360)
  }

  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden rounded-3xl border border-amber-900/30 my-12 shadow-2xl backdrop-blur-md">
      {/* Background Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-600/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-stone-800 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 text-xs font-serif uppercase tracking-widest mb-3">
              <span>Kiến Trúc Thủy Viện Long Não V8</span>
              <span>·</span>
              <span>Độc Bản GuHomes</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-light text-stone-100 tracking-wide">
              Thủy Đình Long Não Bắc Bộ 480 Năm & Hào Bonsai Đa Búp Đỏ 490 Năm
            </h2>
            <p className="text-stone-400 text-sm md:text-base font-light mt-2 max-w-3xl leading-relaxed">
              Tuyệt tác kiến trúc thủy đình mở bản lề cổ pháp gỗ Long Não Bắc Bộ 480 năm tuổi, kết hợp hào nước tuần hoàn nuôi dưỡng Bonsai Đa Búp Đỏ 490 năm rễ ôm sa thạch, kiến tạo vi khí hậu mát lành -11.8°C ven rạch Sài Gòn.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleAcoustic}
              className={`min-h-[44px] min-w-[44px] px-4 py-2.5 rounded-xl border text-xs font-serif tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isAudioPlaying
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
                  : 'bg-stone-900 border-stone-700 text-stone-300 hover:border-amber-600/50'
              }`}
            >
              <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isAudioPlaying ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                )}
              </svg>
              <span>{isAudioPlaying ? 'Dừng Hòa Âm 528Hz - 432Hz' : 'Bật Chuông Thiền Solfeggio'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Main Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Spatial Pavilion Visual Simulation */}
          <div className="lg:col-span-8 bg-stone-900/60 rounded-2xl border border-stone-800 p-6 relative overflow-hidden backdrop-blur-sm min-h-[420px] flex flex-col justify-between">
            {/* Ambient Water Moat Shimmer */}
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 via-transparent to-transparent pointer-events-none" />

            {/* Simulated Water Mist */}
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-teal-900/20 to-transparent pointer-events-none opacity-40 animate-pulse" />

            <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/60 pb-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Mô Phỏng Thủy Nhiệt Khí Động Học Ven Rạch
              </span>
              <span>Góc Xoay Bonsai: {bonsaiRotation}°</span>
            </div>

            {/* Central Graphic Presentation */}
            <div className="relative py-12 flex flex-col items-center justify-center">
              {/* Moat Water Ripples */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border border-teal-500/20 flex items-center justify-center shadow-inner shadow-teal-950/50">
                <div className={`absolute inset-4 rounded-full border border-teal-400/10 transition-all duration-700 ${activeMoatLevel === 'high' ? 'scale-105 opacity-80' : 'opacity-40'}`} />
                <div className="absolute inset-10 rounded-full border border-amber-500/20" />

                {/* Rotating Bonsai Pod */}
                <motion.div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-amber-950/80 via-stone-900 to-stone-950 border-2 border-amber-600/40 p-4 flex flex-col items-center justify-center text-center shadow-2xl relative cursor-pointer"
                  animate={{ rotate: bonsaiRotation }}
                  transition={{ type: 'spring', damping: 20 }}
                  onClick={() => rotateBonsai(45)}
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-900/40 border border-emerald-500/30 flex items-center justify-center mb-2">
                    <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18l-4 4m4-4l4 4m-4 14l-4-4m4 4l4-4M3 12h18" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-serif text-amber-200 uppercase tracking-wider">Đa Búp Đỏ 490 Năm</span>
                  <span className="text-[9px] text-stone-400 mt-1">Dáng Phụ Tử Tương Thân</span>
                </motion.div>

                {/* Hinged Louver Doors Simulation */}
                <AnimatePresence>
                  {isOpenHinged ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-900/60 border border-amber-500/40 text-amber-200 text-[10px] px-3 py-1 rounded-full backdrop-blur-md"
                    >
                      Bản Lề Gỗ Long Não: Đang Mở Đón Gió Tây Nam
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-stone-800/80 border border-stone-600 text-stone-300 text-[10px] px-3 py-1 rounded-full backdrop-blur-md"
                    >
                      Bản Lề Gỗ Long Não: Đang Khép Chắn Bụi
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Interactive Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-800/60">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpenHinged(!isOpenHinged)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-serif border border-stone-700 transition-colors"
                >
                  {isOpenHinged ? 'Khép Cánh Cửa Chớp' : 'Mở Cánh Cửa Chớp 180°'}
                </button>
                <button
                  onClick={() => rotateBonsai(45)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-serif border border-stone-700 transition-colors"
                >
                  Xoay Bệ Bonsai (+45°)
                </button>
              </div>

              {/* Water Moat Flow Control */}
              <div className="flex items-center gap-1.5 bg-stone-950/60 p-1 rounded-xl border border-stone-800">
                <span className="text-[11px] text-stone-400 px-2 font-serif">Mực Nước Hào:</span>
                {(['low', 'balanced', 'high'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setActiveMoatLevel(level)}
                    className={`min-h-[44px] min-w-[44px] px-2.5 py-1 rounded-md text-xs font-serif transition-colors capitalize ${
                      activeMoatLevel === level
                        ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {level === 'low' ? 'Tĩnh Lặng' : level === 'balanced' ? 'Cân Bằng' : 'Triều Dâng'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Specifications Panel */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-stone-900/80 rounded-2xl border border-stone-800 p-6 space-y-4 backdrop-blur-sm">
              <h3 className="text-sm font-serif uppercase tracking-widest text-amber-400 border-b border-stone-800 pb-2">
                Thông Số Vi Khí Hậu & Vật Liệu Quý
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-500 block">Vật Liệu Khung Trụ:</span>
                  <span className="text-stone-200 font-serif">{SPEC.timberAge}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Cổ Thụ Bonsai Thủy Hào:</span>
                  <span className="text-stone-200 font-serif">{SPEC.bonsaiAge}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Biên Độ Hạ Nhiệt Thực Tế:</span>
                  <span className="text-emerald-400 font-serif">{SPEC.temperatureReduction}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Độ Ẩm Vi Khí Hậu Tối Ưu:</span>
                  <span className="text-stone-200 font-serif">{SPEC.relativeHumidity}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Vận Tốc Gió Tự Nhiên Đối Lưu:</span>
                  <span className="text-stone-200 font-serif">{SPEC.airflowVelocity}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Tần Số Hòa Âm Solfeggio:</span>
                  <span className="text-amber-300 font-serif">{SPEC.acousticFrequency}</span>
                </div>
              </div>
            </div>

            {/* Atelier Commitment Card */}
            <div className="bg-gradient-to-br from-amber-950/40 via-stone-900/60 to-stone-900/90 rounded-2xl border border-amber-900/40 p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-serif">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Cam Kết Chế Tác Độc Bản GuHomes</span>
              </div>
              <p className="text-stone-300 text-xs font-light leading-relaxed">
                Mỗi thủy đình được KTS Trưởng GuHomes trực tiếp đo đạc phong thủy và vi khí hậu khu đất, hoàn thiện mộng nêm không đinh sắt tại xưởng Thạnh Xuân 1.200m², giới hạn nghiêm ngặt 12 công trình độc bản mỗi năm.
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

export default SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV8;
