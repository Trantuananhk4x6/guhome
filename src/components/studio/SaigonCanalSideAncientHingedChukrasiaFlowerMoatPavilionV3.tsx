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
  timberAge: '340 năm (Gỗ Lát Hoa Bắc Bộ)',
  bonsaiAge: '355 năm (Nguyệt Quế Cổ Thụ)',
  temperatureReduction: '-9.1°C (Thủy nhiệt vi khí hậu)',
  relativeHumidity: '50% - 55% RH (Điều ẩm tự nhiên)',
  airflowVelocity: '3.1 m/s (Gió đối lưu ven sông Sài Gòn)',
  acousticFrequency: '528Hz Solfeggio (Thanh âm thiền trà)',
}

export function SaigonCanalSideAncientHingedChukrasiaFlowerMoatPavilionV3() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(135)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [activeMoatLevel, setActiveMoatLevel] = useState<'low' | 'balanced' | 'high'>('balanced')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
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

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(528, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.2)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscRef.current = osc
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
    <section className="relative my-16 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-stone-950 via-stone-900 to-black p-6 sm:p-10 shadow-2xl">
      {/* Decorative radial glow */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-amber-500/15 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              Kiến Trúc Bản Địa Vi Khí Hậu V3 · Xưởng GuHomes Thạnh Xuân
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-serif font-light text-stone-100 tracking-tight">
              Thủy Đình Gỗ Lát Hoa Bắc Bộ 340 Năm Tuổi &amp; Bệ Bonsai Nguyệt Quế Cổ Thụ
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
              Kỹ nghệ mộng cối âm dương bằng gỗ Lát Hoa già tuổi vân mây xoáy rực rỡ, thích ứng vi khí hậu nhiệt đới Sài Gòn,
              kết hợp hệ lam cánh cối nắn luồng gió mát ven sông và hào sen Bách Diệp giải nhiệt tự nhiên.
            </p>
          </div>

          {/* Web Audio button */}
          <button
            onClick={toggleAcoustic}
            className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-xs font-medium transition-all ${
              isAudioPlaying
                ? 'border-amber-400 bg-amber-500/20 text-amber-200 shadow-lg shadow-amber-500/20'
                : 'border-stone-700 bg-stone-800/80 text-stone-300 hover:border-amber-500/50 hover:text-amber-300'
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isAudioPlaying ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              )}
            </svg>
            <span>{isAudioPlaying ? 'Dừng Tần Số 528Hz' : 'Ngân Vang 528Hz Solfeggio'}</span>
          </button>
        </div>

        {/* Interactive Controls & Canvas Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Visual Display */}
          <div className="lg:col-span-8 flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-xl relative overflow-hidden">
            {/* Architectural diagram SVG */}
            <div className="relative aspect-[16/10] w-full flex items-center justify-center rounded-xl bg-stone-900/60 border border-stone-800/80 p-4">
              <svg viewBox="0 0 600 360" className="w-full h-full text-amber-500/80" fill="none">
                {/* Water moat background */}
                <rect x="20" y="240" width="560" height="100" rx="8" fill="url(#waterGrad150)" opacity="0.35" />
                
                {/* Lotus Pond waves */}
                <motion.path
                  d="M 30 270 Q 80 260 130 270 T 230 270 T 330 270 T 430 270 T 530 270"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  animate={{ x: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M 30 300 Q 80 290 130 300 T 230 300 T 330 300 T 430 300 T 530 300"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  animate={{ x: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Timber Pavilion Structure */}
                {/* Foundation base */}
                <rect x="120" y="220" width="360" height="24" rx="3" fill="#78350f" stroke="#b45309" strokeWidth="1.5" />
                <line x1="120" y1="232" x2="480" y2="232" stroke="#d97706" strokeWidth="0.5" strokeDasharray="3 3" />

                {/* Columns */}
                <rect x="150" y="90" width="16" height="130" rx="2" fill="#92400e" stroke="#d97706" strokeWidth="1" />
                <rect x="250" y="90" width="16" height="130" rx="2" fill="#92400e" stroke="#d97706" strokeWidth="1" />
                <rect x="334" y="90" width="16" height="130" rx="2" fill="#92400e" stroke="#d97706" strokeWidth="1" />
                <rect x="434" y="90" width="16" height="130" rx="2" fill="#92400e" stroke="#d97706" strokeWidth="1" />

                {/* Hinged Doors / Wooden Louvers with rotation state */}
                <motion.g
                  animate={{
                    transformOrigin: '150px 150px',
                    scaleX: isOpenHinged ? 0.35 : 1,
                    opacity: isOpenHinged ? 0.6 : 0.95,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <rect x="166" y="96" width="80" height="120" fill="#451a03" stroke="#b45309" strokeWidth="1.2" rx="1" />
                  <line x1="166" y1="120" x2="246" y2="120" stroke="#d97706" strokeWidth="0.8" />
                  <line x1="166" y1="150" x2="246" y2="150" stroke="#d97706" strokeWidth="0.8" />
                  <line x1="166" y1="180" x2="246" y2="180" stroke="#d97706" strokeWidth="0.8" />
                </motion.g>

                <motion.g
                  animate={{
                    transformOrigin: '434px 150px',
                    scaleX: isOpenHinged ? 0.35 : 1,
                    opacity: isOpenHinged ? 0.6 : 0.95,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <rect x="354" y="96" width="76" height="120" fill="#451a03" stroke="#b45309" strokeWidth="1.2" rx="1" />
                  <line x1="354" y1="120" x2="430" y2="120" stroke="#d97706" strokeWidth="0.8" />
                  <line x1="354" y1="150" x2="430" y2="150" stroke="#d97706" strokeWidth="0.8" />
                  <line x1="354" y1="180" x2="430" y2="180" stroke="#d97706" strokeWidth="0.8" />
                </motion.g>

                {/* Roof curved rafters */}
                <path d="M 80 90 Q 300 30 520 90 L 490 74 Q 300 20 110 74 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="1.5" />
                <path d="M 90 90 L 510 90 L 490 80 L 110 80 Z" fill="#78350f" />

                {/* Central Bonsai Pedestal with 360 rotation */}
                <g transform="translate(300, 195)">
                  {/* Stone Pedestal */}
                  <rect x="-35" y="0" width="70" height="25" rx="3" fill="#292524" stroke="#78716c" strokeWidth="1" />
                  {/* Rotating Bonsai */}
                  <motion.g
                    style={{ transformOrigin: '0px 0px' }}
                    animate={{ rotate: bonsaiRotation - 135 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                  >
                    {/* Bonsai Pot */}
                    <path d="M -25 0 L 25 0 L 20 -12 L -20 -12 Z" fill="#57534e" stroke="#a8a29e" strokeWidth="1" />
                    {/* Trunk */}
                    <path d="M -4 -12 Q -10 -35 6 -48 Q 14 -60 4 -75" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
                    {/* Foliage Clouds with white blossom stars */}
                    <circle cx="4" cy="-75" r="14" fill="#047857" opacity="0.9" />
                    <circle cx="-8" cy="-60" r="12" fill="#065f46" opacity="0.85" />
                    <circle cx="18" cy="-55" r="13" fill="#059669" opacity="0.9" />
                    <circle cx="6" cy="-84" r="11" fill="#10b981" opacity="0.8" />
                    <circle cx="4" cy="-75" r="2.5" fill="#fef08a" />
                    <circle cx="-8" cy="-60" r="2" fill="#fef08a" />
                    <circle cx="18" cy="-55" r="2" fill="#fef08a" />
                  </motion.g>
                </g>

                {/* Airflow dynamic vectors */}
                {isOpenHinged && (
                  <>
                    <motion.path
                      d="M 40 160 C 120 140, 200 170, 290 150 C 380 130, 460 160, 560 140"
                      stroke="#67e8f9"
                      strokeWidth="1.5"
                      strokeDasharray="8 6"
                      animate={{ strokeDashoffset: [-50, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.path
                      d="M 40 180 C 140 165, 220 190, 310 170 C 400 150, 480 180, 560 165"
                      stroke="#a5f3fc"
                      strokeWidth="1"
                      strokeDasharray="6 4"
                      animate={{ strokeDashoffset: [-40, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                  </>
                )}

                <defs>
                  <linearGradient id="waterGrad150" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0284c7" />
                    <stop offset="100%" stopColor="#082f49" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Micro Controls row */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsOpenHinged(!isOpenHinged)}
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-colors"
                >
                  {isOpenHinged ? 'Đóng Cánh Cối Lam Gỗ' : 'Mở Cánh Cối Nắn Gió'}
                </button>

                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <span>Hào Nước:</span>
                  {(['low', 'balanced', 'high'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setActiveMoatLevel(level)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all ${
                        activeMoatLevel === level
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                          : 'text-stone-500 hover:text-stone-300'
                      }`}
                    >
                      {level === 'low' ? 'Tĩnh Lặng' : level === 'balanced' ? 'Vi Khí Hậu' : 'Triều Dâng'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bonsai rotation slider */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Bệ Xoay 360°:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={bonsaiRotation}
                  onChange={(e) => setBonsaiRotation(Number(e.target.value))}
                  className="w-24 accent-amber-500 h-1.5 bg-stone-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-amber-300 min-w-[32px]">{bonsaiRotation}°</span>
              </div>
            </div>
          </div>

          {/* Technical Specs & Material Philosophy */}
          <div className="lg:col-span-4 flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/50 p-6 backdrop-blur-xl">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400">
                Thông Số Vi Khí Hậu &amp; Mộng Mộc
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                Hệ quy chuẩn khắt khe cho không gian ven rạch Sài Gòn.
              </p>

              <dl className="mt-4 space-y-3">
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Tuổi Gỗ Thủy Đình</dt>
                  <dd className="text-sm font-medium text-amber-200">{SPEC.timberAge}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Cổ Thụ Bonsai Ngự Bệ</dt>
                  <dd className="text-sm font-medium text-emerald-300">{SPEC.bonsaiAge}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Năng Lực Giải Nhiệt Tự Nhiên</dt>
                  <dd className="text-sm font-medium text-sky-300">{SPEC.temperatureReduction}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Độ Ẩm Vi Khí Hậu Cân Bằng</dt>
                  <dd className="text-sm font-medium text-amber-300">{SPEC.relativeHumidity}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Tốc Độ Gió Đối Lưu Thực Đo</dt>
                  <dd className="text-sm font-medium text-cyan-300">{SPEC.airflowVelocity}</dd>
                </div>
                <div className="rounded-xl border border-stone-800/80 bg-stone-950/60 p-3">
                  <dt className="text-xs text-stone-400">Tần Số Âm Học Không Gian</dt>
                  <dd className="text-sm font-medium text-rose-300">{SPEC.acousticFrequency}</dd>
                </div>
              </dl>
            </div>

            {/* Heritage stamp */}
            <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
              <span className="text-[11px] font-serif text-amber-400">
                GuHomes Atelier · Xưởng Mộc May Đo Thạnh Xuân 1.200m²
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedChukrasiaFlowerMoatPavilionV3
