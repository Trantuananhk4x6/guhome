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
  timberAge: '350 năm (Gỗ Mun Sừng Nam Bộ)',
  bonsaiAge: '365 năm (Tùng La Hán Cổ Thụ)',
  temperatureReduction: '-9.3°C (Thủy nhiệt vi khí hậu)',
  relativeHumidity: '50% - 55% RH (Điều ẩm tự nhiên)',
  airflowVelocity: '3.3 m/s (Gió đối lưu ven sông Sài Gòn)',
  acousticFrequency: '528Hz Solfeggio (Thanh âm thiền trà)',
}

export function SaigonCanalSideAncientHingedEbonyFlowerMoatPavilionV3() {
  const [isOpenHinged, setIsOpenHinged] = useState(true)
  const [bonsaiRotation, setBonsaiRotation] = useState(180)
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
    <section className="relative overflow-hidden border-y border-stone-800 bg-[#0c0a09] py-16 text-stone-200">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-wider text-amber-300">
            KIỆT TÁC THỦY ĐÌNH KHẮC DẤU THỜI GIAN · PHIÊN BẢN V3
          </span>
          <h2 className="mt-4 font-serif text-2xl font-light tracking-wide text-amber-100 sm:text-3xl lg:text-4xl">
            Thủy Đình Gỗ Mun Sừng Nam Bộ 350 Năm &amp; Hào Nước Bonsai Tùng La Hán
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Kiến trúc thủy đình ven rạch kênh Sài Gòn với kết cấu gỗ Mun Sừng Nam Bộ 350 năm nguyên khối đanh chắc như thép,
            kết hợp hào nước vi khí hậu nuôi cá Koi Taisho Sanke và bệ xoay Bonsai Tùng La Hán 365 năm tuổi dáng Trực huyền phong.
            May đo độc bản tại xưởng Thạnh Xuân 1.200m² của GuHomes theo tôn chỉ giới hạn 12 công trình mỗi năm.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Showcase (7 cols) */}
          <div className="space-y-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <div>
                  <h3 className="text-base font-medium text-amber-200">
                    Mô Phỏng Trực Quan Thủy Đình Cổ Thụ
                  </h3>
                  <p className="text-xs text-stone-400">
                    Cơ chế cánh lùa ngàm mộng gỗ Mun Sừng và bệ ngự Bonsai Tùng La Hán 365 năm
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleAcoustic}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                    isAudioPlaying
                      ? 'border border-amber-500/50 bg-amber-500/20 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'border border-stone-700 bg-stone-800/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-300'
                  }`}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <span className="relative flex h-2 w-2">
                    {isAudioPlaying && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    )}
                    <span className={`inline-flex h-2 w-2 rounded-full ${isAudioPlaying ? 'bg-amber-400' : 'bg-stone-500'}`} />
                  </span>
                  <span>{isAudioPlaying ? '528Hz Đang Ngân' : 'Kích Hoạt Tần Số 528Hz'}</span>
                </button>
              </div>

              {/* Graphical representation of the Pavilion */}
              <div className="relative mt-6 flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-stone-800/80 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 p-6">
                {/* Roof eves */}
                <div className="relative w-full max-w-md">
                  <div className="h-4 w-full rounded-t-lg bg-gradient-to-r from-amber-950 via-amber-800 to-amber-950 shadow-lg" />
                  <div className="flex justify-between px-2 text-[10px] text-amber-500/70">
                    <span>Mái đua Đông 2.45m</span>
                    <span>Ngàm Mộng Mun Sừng 350 Năm</span>
                    <span>Mái đua Tây 2.45m</span>
                  </div>
                </div>

                {/* Hinged louvers section */}
                <div className="relative my-4 flex w-full max-w-sm justify-between gap-4">
                  {/* Left hinged louver */}
                  <motion.div
                    animate={{ rotateY: isOpenHinged ? 45 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex h-36 w-1/3 flex-col items-center justify-center rounded-lg border border-amber-900/60 bg-stone-950/90 p-2 text-center shadow-inner"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-amber-400">Lam Chớp Tả</span>
                    <span className="mt-1 text-xs text-stone-300">Gỗ Mun Sừng</span>
                    <span className="mt-2 text-[10px] text-emerald-400">Gió 3.3 m/s</span>
                  </motion.div>

                  {/* Central Bonsai Pedestal with 360 rotation */}
                  <div className="relative flex h-36 w-1/3 flex-col items-center justify-center rounded-lg border border-emerald-900/50 bg-stone-950 p-2 text-center">
                    <motion.div
                      animate={{ rotate: bonsaiRotation }}
                      transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    >
                      <svg className="h-8 w-8 text-emerald-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22v-8m0-4c2.5 0 4-2 4-5 0-1-1-2-2-2-1 0-2 1-2 2 0-1-1-2-2-2-1 0-2 1-2 2 0 3 1.5 5 4 5zm-5 5c0-2.5 2-4 5-4s5 1.5 5 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <span className="mt-1 text-[11px] font-serif text-emerald-300">Tùng La Hán</span>
                    <span className="text-[9px] text-stone-400">365 năm ({bonsaiRotation}°)</span>
                  </div>

                  {/* Right hinged louver */}
                  <motion.div
                    animate={{ rotateY: isOpenHinged ? -45 : 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex h-36 w-1/3 flex-col items-center justify-center rounded-lg border border-amber-900/60 bg-stone-950/90 p-2 text-center shadow-inner"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-amber-400">Lam Chớp Hữu</span>
                    <span className="mt-1 text-xs text-stone-300">Gỗ Mun Sừng</span>
                    <span className="mt-2 text-[10px] text-cyan-400">Hạ -9.3°C</span>
                  </motion.div>
                </div>

                {/* Moat base */}
                <div className="relative mt-2 w-full max-w-md overflow-hidden rounded-b-xl border border-sky-900/60 bg-gradient-to-r from-sky-950/60 via-cyan-950/80 to-sky-950/60 p-3 text-center">
                  <div className="flex items-center justify-between text-xs text-sky-300">
                    <span>Hào Nước Sỏi Đen Núi Lửa</span>
                    <span className="font-semibold text-emerald-300">Độ Trong Secchi 1.95m</span>
                    <span>Cá Koi Taisho Sanke</span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
                    <motion.div
                      animate={{
                        width: activeMoatLevel === 'low' ? '35%' : activeMoatLevel === 'balanced' ? '70%' : '100%',
                      }}
                      className="h-full bg-gradient-to-r from-sky-400 to-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => setIsOpenHinged(!isOpenHinged)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800/60 px-4 py-3 text-xs font-medium text-stone-200 transition-all hover:border-amber-500/40 hover:bg-stone-800 hover:text-amber-200"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <svg className="h-4 w-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{isOpenHinged ? 'Khép Lam Mun Sừng' : 'Mở Lam Đón Gió'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setBonsaiRotation((prev) => (prev + 45) % 360)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-800/60 px-4 py-3 text-xs font-medium text-stone-200 transition-all hover:border-emerald-500/40 hover:bg-stone-800 hover:text-emerald-200"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Xoay Bệ Bonsai (+45°)</span>
                </button>

                <div className="flex rounded-xl border border-stone-700 bg-stone-800/60 p-1">
                  {(['low', 'balanced', 'high'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setActiveMoatLevel(lvl)}
                      className={`flex-1 rounded-lg py-2 text-xs font-medium capitalize transition-all ${
                        activeMoatLevel === lvl
                          ? 'bg-amber-500/20 text-amber-200 shadow-sm'
                          : 'text-stone-400 hover:text-stone-200'
                      }`}
                      style={{ minWidth: '44px', minHeight: '44px' }}
                    >
                      {lvl === 'low' ? 'Mực Nông' : lvl === 'balanced' ? 'Cân Bằng' : 'Triều Cao'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Specs & Architecture Philosophy (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur-xl lg:col-span-5">
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

export default SaigonCanalSideAncientHingedEbonyFlowerMoatPavilionV3
