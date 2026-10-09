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
  timberAge: '390 năm (Gỗ Trầm Hương Đỏ Cổ Thụ)',
  bonsaiAge: '405 năm (Bonsai Cây Đa Cổ Đại Mộc)',
  temperatureReduction: '-10.1°C (Thủy nhiệt vi khí hậu ven kênh Nhiêu Lộc)',
  relativeHumidity: '49% - 53% RH (Điều ẩm tự nhiên qua hào nước hoa sen thơm)',
  airflowVelocity: '4.1 m/s (Gió đối lưu ven sông Sài Gòn luân chuyển)',
  acousticFrequency: '528Hz & 432Hz (Thanh âm thiền trà kép Solfeggio)',
}

export function SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV4() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(350)
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

  return (
    <section className="relative overflow-hidden rounded-3xl border border-stone-800/80 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-6 text-stone-200 shadow-2xl md:p-10 my-8">
      {/* Background atmosphere subtle glow */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-amber-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-rose-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Kiến Trúc Thủy Vi Khí Hậu V4 · GuHomes Độc Bản
            </div>
            <h2 className="mt-3 text-2xl font-serif font-light tracking-wide text-amber-100 md:text-3xl lg:text-4xl">
              Thủy Đình Gỗ Trầm Hương Đỏ 390 Năm & Hào Bonsai Cây Đa 405 Năm
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-stone-400 md:text-base">
              Hệ kết cấu mộng ngàm gỗ Trầm Hương Đỏ 390 năm tuổi thớ gỗ đọng tinh dầu thơm ngát tự nhiên, kết hợp hào nước luân chuyển sỏi suối thạch anh và bệ Đa Cổ Mộc Bonsai 405 năm dáng Tích Thủy Thụ Lộc. Giảm nhiệt thực tế -10.1°C đón ngọn gió sông Sài Gòn đối lưu 4.1 m/s.
            </p>
          </div>

          <button
            onClick={toggleAcoustic}
            className="flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-stone-900/90 px-4 py-2.5 text-xs font-medium text-amber-200 shadow-lg backdrop-blur transition-all duration-300 hover:border-amber-400 hover:bg-stone-800 focus:outline-none min-h-[44px] min-w-[44px]"
            title="Thanh âm tần số kép 528Hz & 432Hz thiền định"
          >
            <svg
              className={`h-4 w-4 ${isAudioPlaying ? 'text-amber-400 animate-spin' : 'text-stone-400'}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
            </svg>
            <span>{isAudioPlaying ? 'Dừng Tần Số Kép' : 'Khởi Động Âm Học (528Hz & 432Hz)'}</span>
          </button>
        </div>

        {/* Interactive Architecture Simulation Canvas */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visualizer Diagram */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-800/80 bg-stone-950/70 p-6 backdrop-blur lg:col-span-7">
            <div className="relative flex h-72 w-full max-w-md items-center justify-center md:h-80">
              {/* Outer Canal & Moat */}
              <div
                className={`absolute inset-0 rounded-full border border-sky-500/20 bg-gradient-to-r transition-all duration-700 ${
                  activeMoatLevel === 'high'
                    ? 'from-sky-950/70 via-teal-900/40 to-blue-950/70 shadow-[0_0_40px_rgba(14,165,233,0.25)]'
                    : activeMoatLevel === 'balanced'
                    ? 'from-sky-950/40 via-teal-900/20 to-blue-950/40'
                    : 'from-sky-950/20 via-teal-900/10 to-blue-950/20'
                }`}
              />

              {/* Water Wave Rings */}
              <motion.div
                className="absolute inset-4 rounded-full border border-sky-400/20"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-10 rounded-full border border-amber-400/20"
                animate={{ scale: [1.03, 1, 1.03], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Central Pavilion Structure - Red Agarwood Timber Frame */}
              <div className="relative z-10 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-amber-700/60 bg-stone-900/90 shadow-2xl backdrop-blur">
                {/* Hinged Panels Representation */}
                <div
                  className={`absolute inset-2 rounded-xl border border-dashed transition-all duration-700 ${
                    isOpenHinged ? 'border-amber-400/60 rotate-45 scale-95' : 'border-stone-600 rotate-0 scale-90'
                  }`}
                />

                {/* Central Bonsai Pedestal */}
                <motion.div
                  className="relative z-20 flex h-24 w-24 flex-col items-center justify-center rounded-full border border-amber-500/50 bg-gradient-to-b from-stone-950 to-stone-900 shadow-inner"
                  style={{ transform: `rotate(${bonsaiRotation}deg)` }}
                >
                  <svg className="h-10 w-10 text-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22v-8m0 0C8 14 5 11 5 7a7 7 0 0114 0c0 4-3 7-7 7z" fill="rgba(245, 158, 11, 0.2)" />
                    <circle cx="8" cy="8" r="1.5" fill="#f59e0b" />
                    <circle cx="16" cy="9" r="1.5" fill="#f59e0b" />
                    <circle cx="12" cy="4" r="1.5" fill="#fbbf24" />
                  </svg>
                  <span className="mt-1 text-[9px] font-medium tracking-tight text-amber-200">Đa Cổ Mộc 405N</span>
                </motion.div>

                {/* Microclimate Wind Flow Indicator */}
                <motion.div
                  className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2"
                  animate={{ x: [0, 10, 0], opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-[10px] font-mono text-cyan-300">Gió 4.1 m/s &rarr;</span>
                </motion.div>
              </div>
            </div>

            {/* Visualizer Status Bar */}
            <div className="mt-4 flex w-full flex-wrap items-center justify-between gap-2 border-t border-stone-800/60 pt-3 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                Cánh cửa bức bàn: {isOpenHinged ? 'Mở hoàn toàn (Đón gió đối lưu)' : 'Khép mộng (Tụ khí tinh tế)'}
              </span>
              <span className="font-mono text-cyan-300">Thủy tầng: {activeMoatLevel.toUpperCase()}</span>
            </div>
          </div>

          {/* Interactive Controls & Technical Specs */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800/80 bg-stone-950/50 p-6 backdrop-blur lg:col-span-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                Điều Khiển Vi Khí Hậu & Kiến Trúc
              </h3>

              {/* Control 1: Hinged Panels */}
              <div className="mt-5">
                <label className="text-xs font-medium text-stone-300">Hệ Cánh Cửa Bức Bàn Gỗ Trầm Hương Đỏ</label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setIsOpenHinged(true)}
                    className={`rounded-xl border py-2 text-xs font-medium transition-all min-h-[44px] ${
                      isOpenHinged
                        ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    Mở 360° (Đối lưu)
                  </button>
                  <button
                    onClick={() => setIsOpenHinged(false)}
                    className={`rounded-xl border py-2 text-xs font-medium transition-all min-h-[44px] ${
                      !isOpenHinged
                        ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    Khép Mộng Mòi
                  </button>
                </div>
              </div>

              {/* Control 2: Moat Level */}
              <div className="mt-5">
                <label className="text-xs font-medium text-stone-300">Lưu Lượng Thủy Hào Xuyên Tâm</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(['low', 'balanced', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setActiveMoatLevel(level)}
                      className={`rounded-xl border py-2 text-xs font-medium capitalize transition-all min-h-[44px] ${
                        activeMoatLevel === level
                          ? 'border-sky-500 bg-sky-950/40 text-sky-200'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      }`}
                    >
                      {level === 'low' ? 'Êm Đềm' : level === 'balanced' ? 'Cân Bằng' : 'Triều Dâng'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 3: Bonsai Rotation */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-300">Xoay Góc Thưởng Bonsai Cây Đa</span>
                  <span className="font-mono text-amber-300">{bonsaiRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={bonsaiRotation}
                  onChange={(e) => setBonsaiRotation(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-500"
                />
              </div>
            </div>

            {/* Microclimate Data Panel */}
            <div className="mt-6 border-t border-stone-800/80 pt-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                Chỉ Số Vi Khí Hậu Thực Nghiệm
              </h4>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-stone-800/60 bg-stone-900/50 p-2.5">
                  <dt className="text-stone-400">Gỗ Kết Cấu:</dt>
                  <dd className="mt-0.5 font-medium text-amber-200">{SPEC.timberAge}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/60 bg-stone-900/50 p-2.5">
                  <dt className="text-stone-400">Cổ Mộc Bonsai:</dt>
                  <dd className="mt-0.5 font-medium text-emerald-300">{SPEC.bonsaiAge}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/60 bg-stone-900/50 p-2.5">
                  <dt className="text-stone-400">Hạ Nhiệt:</dt>
                  <dd className="mt-0.5 font-medium text-cyan-300">{SPEC.temperatureReduction}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/60 bg-stone-900/50 p-2.5">
                  <dt className="text-stone-400">Độ Ẩm Tự Nhiên:</dt>
                  <dd className="mt-0.5 font-medium text-sky-300">{SPEC.relativeHumidity}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/60 bg-stone-900/50 p-2.5">
                  <dt className="text-stone-400">Vận Tốc Gió:</dt>
                  <dd className="mt-0.5 font-medium text-teal-300">{SPEC.airflowVelocity}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/60 bg-stone-900/50 p-2.5">
                  <dt className="text-stone-400">Tần Số Thiền:</dt>
                  <dd className="mt-0.5 font-medium text-amber-300">{SPEC.acousticFrequency}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* Brand Promise Footer */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-stone-800/60 bg-stone-950/60 px-6 py-4 text-xs text-stone-400">
          <div>
            <span className="font-semibold text-amber-300">Cam Kết Chế Tác GuHomes:</span> Xưởng may đo Thạnh Xuân 1.200m² - Trần 12 công trình/năm đảm bảo độ tỉ mỉ tuyệt đối.
          </div>
          <div className="flex items-center gap-4">
            <span>KTS Trưởng: <a href="tel:0368757916" className="text-amber-300 hover:underline">0368 757 916</a></span>
            <span>Email: <a href="mailto:guhomesvn@gmail.com" className="text-stone-300 hover:underline">guhomesvn@gmail.com</a></span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedAgarwoodFlowerMoatPavilionV4
