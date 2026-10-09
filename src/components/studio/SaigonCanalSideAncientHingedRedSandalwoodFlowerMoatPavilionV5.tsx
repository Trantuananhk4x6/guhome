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
  timberAge: '405 năm (Gỗ Sưa Đỏ Bắc Bộ Cổ Thụ)',
  bonsaiAge: '420 năm (Bonsai Nguyệt Quế Cổ Đại Thụ)',
  temperatureReduction: '-10.4°C (Thủy nhiệt vi khí hậu ven kênh Nhiêu Lộc)',
  relativeHumidity: '48% - 52% RH (Điều ẩm tự nhiên qua hào hoa nước)',
  airflowVelocity: '4.4 m/s (Gió đối lưu ven sông Sài Gòn luân chuyển)',
  acousticFrequency: '528Hz & 432Hz (Thanh âm thiền trà kép Solfeggio)',
}

export function SaigonCanalSideAncientHingedRedSandalwoodFlowerMoatPavilionV5() {
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
            }
            if (oscHarmonicRef.current) {
              oscHarmonicRef.current.stop()
              oscHarmonicRef.current.disconnect()
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
    <section className="relative overflow-hidden rounded-3xl border border-stone-800 bg-stone-950 p-6 text-stone-200 shadow-2xl backdrop-blur-md md:p-10 my-10">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-red-950/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-amber-950/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-stone-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full border border-red-800/50 bg-red-950/70 px-3 py-0.5 text-xs font-medium text-red-300">
                GuHomes Architecture Series
              </span>
              <span className="inline-flex items-center rounded-full border border-amber-900/40 bg-amber-950/50 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
                Thủy Đình Sưa Đỏ V5
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-light tracking-wide text-stone-100 sm:text-3xl">
              Thủy Đình Gỗ Sưa Đỏ Bắc Bộ 405 Năm & Hào Bonsai Nguyệt Quế 420 Năm
            </h3>
            <p className="mt-1 text-sm text-stone-400">
              Kiến trúc giải nhiệt vi khí hậu ven kênh Nhiêu Lộc - Hệ cánh lật bản lề đối lưu gió tự nhiên
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleAcoustic}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
                isAudioPlaying
                  ? 'border-red-500/60 bg-red-950/40 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                  : 'border-stone-700/60 bg-stone-900/60 text-stone-300 hover:border-red-600/50 hover:bg-stone-800/60'
              }`}
              style={{ minHeight: '44px', minWidth: '44px' }}
              title="Kích hoạt âm thoa Solfeggio 528Hz & 432Hz"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
              <span>{isAudioPlaying ? 'Âm Thoa Đang Ngân (528Hz & 432Hz)' : 'Kích Hoạt Âm Thoa'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Main Visualizer */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Model Canvas */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800/80 bg-stone-900/40 p-6 backdrop-blur lg:col-span-7">
            <div className="relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 to-stone-900">
              {/* Canal Water Moat Simulation */}
              <div
                className={`absolute bottom-0 left-0 right-0 transition-all duration-700 ${
                  activeMoatLevel === 'high'
                    ? 'h-24 bg-gradient-to-t from-cyan-900/60 via-teal-900/40 to-transparent'
                    : activeMoatLevel === 'balanced'
                    ? 'h-16 bg-gradient-to-t from-cyan-950/60 via-teal-950/30 to-transparent'
                    : 'h-10 bg-gradient-to-t from-cyan-950/40 via-teal-950/20 to-transparent'
                }`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ x: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                    className="h-1 w-full bg-cyan-400/20 blur-sm"
                  />
                </div>
              </div>

              {/* Pavilion Wood Roof & Hinged Architecture */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
                {/* Traditional Red Sandalwood Roof Truss */}
                <div className="relative mb-2 h-14 w-60">
                  <div className="absolute inset-0 rounded-t-full border-t-2 border-red-700 bg-gradient-to-b from-red-950 via-stone-900 to-stone-950 shadow-md" />
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full border border-red-600/50 bg-stone-900 px-3 py-0.5 text-[10px] text-red-300">
                    Ngói Mũi Hài & Mộng Sưa Đỏ
                  </div>
                </div>

                {/* Hinged Panels Assembly */}
                <div className="relative flex w-52 items-center justify-between">
                  {/* Left Hinged Panel */}
                  <motion.div
                    animate={{ rotateY: isOpenHinged ? -65 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="h-28 w-14 origin-left rounded border border-red-900/80 bg-gradient-to-br from-red-950 via-stone-900 to-black p-1 shadow-lg"
                  >
                    <div className="flex h-full flex-col justify-between border border-red-900/60 p-1">
                      <div className="h-0.5 w-full bg-red-700/40" />
                      <div className="text-center text-[8px] text-red-400">Mộng Sưa</div>
                      <div className="h-0.5 w-full bg-red-700/40" />
                    </div>
                  </motion.div>

                  {/* Central Bonsai Platform */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{ rotate: bonsaiRotation }}
                      transition={{ type: 'spring', stiffness: 50, damping: 15 }}
                      className="relative flex h-24 w-24 items-center justify-center rounded-full border border-amber-800/40 bg-amber-950/20"
                    >
                      {/* SVG Bonsai Nguyệt Quế Stylized */}
                      <svg className="h-16 w-16 text-amber-300 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M30 60 C30 50 32 40 32 32 C32 24 35 18 38 14 C36 18 35 24 35 30 C33 26 31 22 28 20 C30 25 31 31 30 36 C28 32 25 28 22 26 C24 32 26 38 28 44 C26 46 22 48 18 49 C24 51 28 52 30 60 Z" fill="#451a03" />
                        {/* Foliage Clouds & White Blossom Accents */}
                        <circle cx="38" cy="14" r="8" fill="#15803d" opacity="0.85" />
                        <circle cx="28" cy="20" r="7" fill="#16a34a" opacity="0.85" />
                        <circle cx="22" cy="26" r="6" fill="#22c55e" opacity="0.8" />
                        <circle cx="44" cy="22" r="7" fill="#15803d" opacity="0.85" />
                        <circle cx="34" cy="28" r="7" fill="#16a34a" opacity="0.85" />
                        {/* Blossom dots */}
                        <circle cx="36" cy="13" r="1.5" fill="#fef08a" />
                        <circle cx="26" cy="19" r="1.5" fill="#fef08a" />
                        <circle cx="42" cy="21" r="1.5" fill="#fef08a" />
                      </svg>
                    </motion.div>
                    <span className="mt-1 text-[10px] text-amber-300/90">Nguyệt Quế 420 Năm</span>
                  </div>

                  {/* Right Hinged Panel */}
                  <motion.div
                    animate={{ rotateY: isOpenHinged ? 65 : 0 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                    className="h-28 w-14 origin-right rounded border border-red-900/80 bg-gradient-to-bl from-red-950 via-stone-900 to-black p-1 shadow-lg"
                  >
                    <div className="flex h-full flex-col justify-between border border-red-900/60 p-1">
                      <div className="h-0.5 w-full bg-red-700/40" />
                      <div className="text-center text-[8px] text-red-400">Sưa Đỏ</div>
                      <div className="h-0.5 w-full bg-red-700/40" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Dynamic Status Text */}
            <div className="mt-4 flex items-center justify-between w-full max-w-md text-xs text-stone-400">
              <span>Trạng Thái Cánh Lật: <strong className="text-stone-200">{isOpenHinged ? 'Mở Đón Gió (4.4 m/s)' : 'Khép Kín Che Mưa'}</strong></span>
              <span>Hào Nước: <strong className="text-cyan-300">{activeMoatLevel === 'high' ? 'Cao Trào (+35cm)' : activeMoatLevel === 'balanced' ? 'Cân Bằng Chuẩn' : 'Triều Rút'}</strong></span>
            </div>
          </div>

          {/* Interactive Controls & Technical Insights */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Điều Khiển Bản Lề Gỗ Sưa Đỏ
                </label>
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => setIsOpenHinged(true)}
                    className={`flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all ${
                      isOpenHinged
                        ? 'border-red-500/80 bg-red-950/40 text-red-200'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:bg-stone-800/50'
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    Mở Đối Lưu Ven Kênh
                  </button>
                  <button
                    onClick={() => setIsOpenHinged(false)}
                    className={`flex-1 rounded-xl border py-2.5 text-xs font-medium transition-all ${
                      !isOpenHinged
                        ? 'border-amber-600/80 bg-amber-950/60 text-amber-200'
                        : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:bg-stone-800/50'
                    }`}
                    style={{ minHeight: '44px' }}
                  >
                    Khép Tĩnh Tâm
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Mực Nước Hào Hoa Điều Ẩm
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(['low', 'balanced', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setActiveMoatLevel(level)}
                      className={`rounded-xl border py-2 text-xs font-medium capitalize transition-all ${
                        activeMoatLevel === level
                          ? 'border-cyan-500/80 bg-cyan-950/40 text-cyan-200'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:bg-stone-800/50'
                      }`}
                      style={{ minHeight: '44px' }}
                    >
                      {level === 'low' ? 'Mức Thấp' : level === 'balanced' ? 'Cân Bằng' : 'Mức Cao'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="font-semibold uppercase tracking-wider">Xoay Góc Bonsai Nguyệt Quế</span>
                  <span className="font-mono text-amber-400">{bonsaiRotation}°</span>
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
                  <dd className="mt-0.5 font-medium text-red-300">{SPEC.timberAge}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/60 bg-stone-900/50 p-2.5">
                  <dt className="text-stone-400">Cổ Mộc Bonsai:</dt>
                  <dd className="mt-0.5 font-medium text-amber-300">{SPEC.bonsaiAge}</dd>
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
            <span className="font-semibold text-red-300">Cam Kết Chế Tác GuHomes:</span> Xưởng may đo Thạnh Xuân 1.200m² - Trần 12 công trình/năm đảm bảo độ tỉ mỉ tuyệt đối.
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

export default SaigonCanalSideAncientHingedRedSandalwoodFlowerMoatPavilionV5
