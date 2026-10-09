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
  timberAge: '425 năm (Gỗ Trầm Hương Đỏ Nam Bộ Thượng Hạng)',
  bonsaiAge: '440 năm (Bonsai Cây Đa Cổ Đại Thụ Trường Tồn)',
  temperatureReduction: '-10.8°C (Thủy nhiệt vi khí hậu ven kênh Nhiêu Lộc)',
  relativeHumidity: '45% - 49% RH (Điều ẩm tự nhiên qua hào hoa nước)',
  airflowVelocity: '4.8 m/s (Gió đối lưu ven sông Sài Gòn luân chuyển)',
  acousticFrequency: '528Hz & 432Hz (Thanh âm thiền trà kép Solfeggio)',
}

export function SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV6() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(345)
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
            setIsAudioPlaying(false)
          }, 650)
        } catch {
          setIsAudioPlaying(false)
        }
      } else {
        setIsAudioPlaying(false)
      }
    }
  }

  return (
    <section className="relative w-full py-16 px-4 md:px-8 bg-neutral-950 text-neutral-100 overflow-hidden border-t border-amber-950/40">
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-neutral-900 to-black" />

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-medium tracking-widest uppercase">
            <span>Kiệt Tác Vi Khí Hậu Sài Gòn · Thế Hệ V6</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-amber-100 tracking-wide">
            Thủy Đình Bản Lề Trầm Hương Đỏ 425 Năm & Hào Bonsai Cây Đa V6
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Tuyệt phẩm kiến trúc thủy đình từ gỗ Trầm Hương Đỏ Nam Bộ 425 năm quý hiếm kết hợp Hào Bonsai Cây Đa Cổ Đại Thụ 440 năm sừng sững bên kênh rạch sông Sài Gòn. Cánh bản lề thông minh đón gió 4.8 m/s, hạ nhiệt thụ động -10.8°C và cân bằng ẩm 45% - 49% RH.
          </p>
        </div>

        {/* Dynamic Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 bg-neutral-900/70 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-md shadow-2xl">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-800">
              <div>
                <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono">Mô Phỏng Vi Khí Hậu Kênh Sông</span>
                <h3 className="text-lg font-serif text-amber-200">Trạng Thái Bản Lề & Hào Hoa Động</h3>
              </div>
              <button
                onClick={() => setIsOpenHinged(!isOpenHinged)}
                className="px-4 py-2 min-h-[44px] min-w-[44px] rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 text-xs font-medium transition-colors flex items-center gap-2"
                aria-label="Đổi trạng thái cánh bản lề"
              >
                <span>{isOpenHinged ? 'Khép Cánh Bản Lề' : 'Mở Bung Đón Gió'}</span>
              </button>
            </div>

            {/* Graphic Representation */}
            <div className="relative h-64 sm:h-80 w-full rounded-xl bg-gradient-to-b from-neutral-950 to-neutral-900 border border-neutral-800/80 flex items-center justify-center overflow-hidden">
              {/* Canal Water Surface Effect */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-cyan-950/40 via-amber-950/20 to-transparent flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: activeMoatLevel === 'high' ? [1, 1.04, 1] : [1, 1.015, 1],
                    opacity: activeMoatLevel === 'high' ? [0.4, 0.7, 0.4] : [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"
                />
                <span className="absolute bottom-3 text-[11px] font-mono tracking-widest text-cyan-400/70">
                  HÀO HOA THỦY CANH · MỰC NƯỚC: {activeMoatLevel === 'high' ? '+250mm (Triều Cường Sài Gòn)' : activeMoatLevel === 'low' ? '-100mm (Thủy Triều Rút)' : 'CHUẨN VI ĐIỀU HOÀ'}
                </span>
              </div>

              {/* Pavilion Hinged Structure Animation */}
              <div className="relative z-10 flex items-center gap-6">
                {/* Left Hinged Wing */}
                <motion.div
                  animate={{ rotateY: isOpenHinged ? -42 : 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-14 sm:w-20 h-44 sm:h-52 bg-gradient-to-br from-amber-950 via-neutral-900 to-black border-2 border-amber-700/60 rounded-lg flex flex-col justify-between p-2 shadow-2xl origin-left"
                >
                  <div className="w-full h-1 bg-amber-500/50 rounded" />
                  <div className="text-[10px] text-amber-300 font-mono text-center rotate-90">Trầm Đỏ 425N</div>
                  <div className="w-full h-1 bg-amber-500/50 rounded" />
                </motion.div>

                {/* Central Shrine with Bonsai */}
                <div className="relative flex flex-col items-center">
                  <motion.div
                    animate={{ rotate: bonsaiRotation }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-amber-500/40 bg-neutral-950/80 flex items-center justify-center p-3 relative shadow-inner"
                  >
                    <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/30 animate-spin-slow" />
                    <svg className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-400/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0C9 13 6 10 6 7a6 6 0 0112 0c0 3-3 6-6 6zm-4-2c-2 0-4-1-4-3 0-2 2-3 4-3m8 6c2 0 4-1 4-3 0-2-2-3-4-3" />
                    </svg>
                    <span className="absolute -bottom-2 px-2 py-0.5 bg-neutral-900 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 rounded-full">
                      Cây Đa 440N
                    </span>
                  </motion.div>
                </div>

                {/* Right Hinged Wing */}
                <motion.div
                  animate={{ rotateY: isOpenHinged ? 42 : 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-14 sm:w-20 h-44 sm:h-52 bg-gradient-to-bl from-amber-950 via-neutral-900 to-black border-2 border-amber-700/60 rounded-lg flex flex-col justify-between p-2 shadow-2xl origin-right"
                >
                  <div className="w-full h-1 bg-amber-500/50 rounded" />
                  <div className="text-[10px] text-amber-300 font-mono text-center -rotate-90">Trầm Đỏ 425N</div>
                  <div className="w-full h-1 bg-amber-500/50 rounded" />
                </motion.div>
              </div>
            </div>

            {/* Controls Bar */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 font-mono">Xoay Hướng Bonsai ({bonsaiRotation}°)</label>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={bonsaiRotation}
                  onChange={(e) => setBonsaiRotation(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 font-mono">Điều Tuyết Thủy Hào</label>
                <div className="flex gap-2">
                  {(['low', 'balanced', 'high'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setActiveMoatLevel(lvl)}
                      className={`flex-1 py-1.5 min-h-[44px] min-w-[44px] rounded text-xs font-mono border transition-all ${
                        activeMoatLevel === lvl
                          ? 'border-cyan-500 bg-cyan-950/50 text-cyan-200'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {lvl === 'low' ? 'Thủy Triều Rút' : lvl === 'balanced' ? 'Cân Bằng' : 'Triều Dâng'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specifications & Acoustic Features */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 space-y-5">
              <h3 className="text-lg font-serif text-amber-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Thông Số Vi Khí Hậu & Vật Liệu Tuyệt Kỹ
              </h3>
              <dl className="divide-y divide-neutral-800 text-sm">
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Niên Đại Gỗ Trầm Đỏ</dt>
                  <dd className="font-mono text-amber-300 text-right">{SPEC.timberAge}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Cổ Mộc Bonsai</dt>
                  <dd className="font-mono text-emerald-300 text-right">{SPEC.bonsaiAge}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Hiệu Ứng Hạ Nhiệt</dt>
                  <dd className="font-mono text-cyan-300 text-right">{SPEC.temperatureReduction}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Độ Ẩm Tự Nhiên</dt>
                  <dd className="font-mono text-neutral-200 text-right">{SPEC.relativeHumidity}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Vận Tốc Gió Luân Chuyển</dt>
                  <dd className="font-mono text-amber-200 text-right">{SPEC.airflowVelocity}</dd>
                </div>
                <div className="py-2.5 flex justify-between gap-4">
                  <dt className="text-neutral-400">Tần Số Âm Học</dt>
                  <dd className="font-mono text-purple-300 text-right">{SPEC.acousticFrequency}</dd>
                </div>
              </dl>
            </div>

            {/* Audio Solfeggio Module */}
            <div className="bg-gradient-to-br from-amber-950/20 via-neutral-900/60 to-purple-950/20 border border-amber-600/30 rounded-2xl p-6 flex flex-col justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Web Audio Solfeggio Kép</span>
                <h4 className="text-base font-serif text-neutral-100">Cộng Hưởng Tần Số 528Hz & 432Hz Thiền Trà</h4>
                <p className="text-xs text-neutral-400">
                  Thanh âm sóng Sine kết hợp tần số chữa lành 528Hz và sóng mẹ Trái Đất 432Hz tạo trạng thái thư giãn sâu bên mặt nước tĩnh mịch.
                </p>
              </div>
              <button
                onClick={toggleAcoustic}
                className={`w-full py-3 min-h-[44px] min-w-[44px] rounded-xl font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 border ${
                  isAudioPlaying
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.35)]'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-amber-200 border-amber-600/40'
                }`}
                aria-label="Kích hoạt âm thanh Solfeggio kép"
              >
                <svg className={`w-4 h-4 ${isAudioPlaying ? 'animate-pulse' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
                <span>{isAudioPlaying ? 'Dừng Tần Số Solfeggio 528Hz & 432Hz' : 'Khởi Động Hòa Âm Thiền Trà'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV6
