'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScentNote {
  temp: number
  profile: string
  subnotes: string
  activeDuration: string
  solfeggioFreq: number
}

const SCENT_PROFILES: readonly ScentNote[] = [
  {
    temp: 95,
    profile: 'Thanh Ngọt Hoàng Lan & Nhựa Trầm Hoàng Kim',
    subnotes: 'Hương đầu thoảng hương hoa hoàng lan cung đình, mật ong hoa nhãn và cam thảo ngọt thanh',
    activeDuration: 'Ủ nhiệt vi sai 6-8 giờ liên tục',
    solfeggioFreq: 528,
  },
  {
    temp: 145,
    profile: 'Ấm Áp Nhựa Thông Đỏ & Hổ Phách Cổ Thụ',
    subnotes: 'Hương giữa ấm đượm hổ phách tự nhiên tích tụ ngàn năm, khơi gợi xúc cảm an yên tĩnh lặng',
    activeDuration: 'Ủ nhiệt vi sai 4-5 giờ liên tục',
    solfeggioFreq: 639,
  },
  {
    temp: 195,
    profile: 'Lắng Đọng Khói Thiền & Gỗ Lũa Bách Niên',
    subnotes: 'Hương cuối lắng đọng sâu lắng, định tâm an thần, thanh tẩy năng lượng tiêu cực',
    activeDuration: 'Ủ nhiệt vi sai 3-4 giờ liên tục',
    solfeggioFreq: 741,
  },
  {
    temp: 235,
    profile: 'Hoàng Kỳ Đỉnh Cao Cung Đình Hoàng Gia',
    subnotes: 'Dải nhiệt cực đại giải phóng trọn vẹn dược tính và năng lượng nguyên sơ của Hoàng Kỳ Khánh Hòa',
    activeDuration: 'Ủ nhiệt vi sai 2 giờ ngưng tụ',
    solfeggioFreq: 852,
  },
]

export function BespokeImperialKynamAndGoldFiligreeTurtleDragonIncenseBurnerVault() {
  const [selectedTemp, setSelectedTemp] = useState<number>(145)
  const [isPlayingResonance, setIsPlayingResonance] = useState(false)
  const [activeRotation, setActiveRotation] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const activeScent =
    SCENT_PROFILES.find((s) => s.temp === selectedTemp) ?? SCENT_PROFILES[1]!

  const toggleResonance = () => {
    if (isPlayingResonance) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5)
        setTimeout(() => {
          osc1Ref.current?.stop()
          osc2Ref.current?.stop()
          osc1Ref.current?.disconnect()
          osc2Ref.current?.disconnect()
          setIsPlayingResonance(false)
        }, 500)
      }
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(activeScent.solfeggioFreq, ctx.currentTime)

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc1Ref.current = osc1
        osc2Ref.current = osc2
        gainRef.current = gain
        setIsPlayingResonance(true)
      } catch (e) {
        console.warn('AudioContext unavailable or blocked:', e)
      }
    }
  }

  useEffect(() => {
    let animId: NodeJS.Timeout
    if (isRotating) {
      animId = setInterval(() => {
        setActiveRotation((prev) => (prev + 1) % 360)
      }, 40)
    }
    return () => clearInterval(animId)
  }, [isRotating])

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <section className="relative w-full border-t border-line/60 bg-surface/50 py-16 sm:py-24 text-ink overflow-hidden">
      <div className="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-2 self-center px-3.5 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-mono text-[11px] uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Kỳ Nghệ Kim Hoàn Cung Đình Triều Nguyễn · Sprint 113</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink">
            Bảo Thất Kỳ Nam & Đỉnh Lư Vàng 24K Filigree Long Quy Triều Thụy
          </h2>

          <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed">
            Đỉnh lư hình Long Quy (Đầu Rồng mình Rùa) trấn trạch cát tường được đan kết tinh xảo từ hàng vạn sợi vàng ròng 24K kéo tay siêu mảnh 0.12mm (Kỹ nghệ Filigree Thăng Long bách niên). Kết hợp ruột đồng đỏ dày 10mm xông hương Hoàng Kỳ Khánh Hòa tuyệt đỉnh không khói khét.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 360 Interactive Filigree Turtle Dragon Artifact Viewer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-canvas via-surface to-amber-500/5 p-6 sm:p-8 backdrop-blur-md shadow-sm relative overflow-hidden">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 h-3 w-3 border-t-2 border-l-2 border-amber-500/40" />
              <div className="absolute top-3 right-3 h-3 w-3 border-t-2 border-r-2 border-amber-500/40" />
              <div className="absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-amber-500/40" />
              <div className="absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-amber-500/40" />

              <div className="flex items-center justify-between pb-4 border-b border-line/60">
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-ink">
                    Mô Phỏng Đỉnh Lư Vàng 24K Filigree
                  </h3>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Tỷ lệ thu nhỏ 1:1 · Chiều cao 375mm · Khối lượng vàng 1.85kg
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.5 : 1))}
                    className="px-3 py-1.5 rounded-lg border border-line bg-canvas font-mono text-xs text-ink hover:border-amber-500/60 active:scale-95 transition-all"
                  >
                    Zoom: {zoomLevel}x
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRotating(!isRotating)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg border font-mono text-xs transition-all active:scale-95',
                      isRotating
                        ? 'border-amber-500 bg-amber-500 text-canvas font-medium shadow-xs'
                        : 'border-line bg-canvas hover:border-amber-500/60 text-ink',
                    )}
                  >
                    {isRotating ? 'Dừng Xoay' : 'Xoay 360°'}
                  </button>
                </div>
              </div>

              {/* Graphical Representation of Turtle Dragon Filigree Vessel */}
              <div className="relative aspect-4/3 max-w-[460px] mx-auto my-6 flex items-center justify-center">
                {/* Aura Glow */}
                <div
                  className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400/20 via-yellow-200/10 to-transparent blur-2xl pointer-events-none transition-all duration-700"
                  style={{ transform: `scale(${zoomLevel})` }}
                />

                {/* Vessel Body Container */}
                <div
                  className="relative w-64 h-64 flex flex-col items-center justify-center transition-transform duration-300"
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${activeRotation}deg)`,
                  }}
                >
                  {/* Top Dragon Head Finial */}
                  <div className="w-16 h-14 rounded-t-full border-2 border-amber-500 bg-amber-400/20 flex flex-col items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                    <span className="font-serif text-[10px] text-amber-700 dark:text-amber-200 font-bold">
                      Long Quy
                    </span>
                    <span className="text-[9px] text-amber-600 font-mono">Triều Thụy</span>
                  </div>

                  {/* Filigree Turtle Shell Dome Lid */}
                  <div className="w-40 h-16 rounded-t-2xl border-2 border-amber-500/80 bg-gradient-to-b from-amber-300/30 to-amber-500/20 flex items-center justify-center relative overflow-hidden backdrop-blur-xs">
                    <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:6px_6px] opacity-60" />
                    <span className="font-mono text-[9px] text-amber-800 dark:text-amber-100 uppercase tracking-widest relative z-10 font-medium">
                      Lưới Mai Rùa Filigree 0.12mm
                    </span>
                  </div>

                  {/* Main Burner Pot (Red Copper Core inside) */}
                  <div className="w-48 h-28 rounded-b-3xl border-2 border-amber-600 bg-gradient-to-b from-amber-600/30 via-red-900/20 to-amber-700/40 flex flex-col items-center justify-center relative p-3 shadow-xl">
                    <span className="font-display text-xs font-semibold text-amber-900 dark:text-amber-100">
                      Ruột Đồng Đỏ Đúc 10mm
                    </span>
                    <span className="font-mono text-[10px] text-amber-700 dark:text-amber-300 mt-1">
                      Hoàng Kỳ Khánh Hòa {selectedTemp}°C
                    </span>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                      <span className="font-mono text-[10px] text-amber-800 dark:text-amber-200 font-bold">
                        Đang Tỏa Hương
                      </span>
                    </div>
                  </div>

                  {/* Four Sturdy Turtle Legs */}
                  <div className="w-44 flex justify-between px-4 -mt-1">
                    <div className="w-5 h-8 bg-amber-600/80 rounded-b-md border border-amber-500" />
                    <div className="w-5 h-8 bg-amber-600/80 rounded-b-md border border-amber-500" />
                    <div className="w-5 h-8 bg-amber-600/80 rounded-b-md border border-amber-500" />
                    <div className="w-5 h-8 bg-amber-600/80 rounded-b-md border border-amber-500" />
                  </div>

                  {/* Trắc Đỏ Carved Stand Base */}
                  <div className="w-56 h-6 rounded-md bg-stone-900 border border-amber-900/60 mt-1 flex items-center justify-center">
                    <span className="font-mono text-[9px] text-amber-400/80">
                      Đế Án Kỷ Gỗ Trắc Đỏ Khảm Phỉ Thúy Type A
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider for Manual Rotation */}
              <div className="flex items-center gap-4 mt-6 pt-4 border-t border-line/60">
                <span className="font-mono text-xs text-muted shrink-0">Góc xoay:</span>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={activeRotation}
                  onChange={(e) => setActiveRotation(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="font-mono text-xs font-bold text-amber-600 min-w-[3rem] text-right">
                  {activeRotation}°
                </span>
              </div>
            </div>
          </div>

          {/* Right: Scent Profile & Temperature Micro-controller (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Temperature Preset Buttons */}
            <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-7 backdrop-blur-md shadow-xs">
              <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                Điều Nhiệt Vi Sai Không Khói Khét
              </span>
              <h3 className="font-display text-xl text-ink mb-4">
                Dải Nhiệt Kích Hương Hoàng Kỳ
              </h3>

              <div className="grid grid-cols-2 gap-2.5 mb-5">
                {SCENT_PROFILES.map((scent) => (
                  <button
                    key={scent.temp}
                    type="button"
                    onClick={() => setSelectedTemp(scent.temp)}
                    className={cn(
                      'p-3 rounded-xl border text-left font-mono transition-all cursor-pointer active:scale-95',
                      selectedTemp === scent.temp
                        ? 'border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-100 ring-2 ring-amber-500/30 font-semibold'
                        : 'border-line bg-canvas/60 text-muted hover:border-line hover:text-ink',
                    )}
                  >
                    <div className="text-base font-bold text-amber-600 dark:text-amber-400">
                      {scent.temp}°C
                    </div>
                    <div className="text-[11px] font-body text-ink mt-0.5 line-clamp-1">
                      {scent.profile.split('&')[0]}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Profile Details */}
              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-bold text-amber-900 dark:text-amber-200">
                    {activeScent.profile}
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                    {activeScent.temp}°C Vi Sai
                  </span>
                </div>
                <p className="font-body text-xs text-ink/80 leading-relaxed">
                  {activeScent.subnotes}
                </p>
                <div className="pt-2 border-t border-amber-500/20 flex justify-between font-mono text-[10px] text-muted">
                  <span>Thời lượng tối ưu:</span>
                  <span className="text-ink font-medium">{activeScent.activeDuration}</span>
                </div>
              </div>
            </div>

            {/* Solfeggio Dual Resonance 528Hz & 741Hz Audio Player */}
            <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-br from-surface via-surface to-amber-500/10 p-6 backdrop-blur-md shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-mono text-[10px] text-amber-600 uppercase tracking-wider block">
                    Song Âm Tẩy Uế & Tĩnh Tâm
                  </span>
                  <h4 className="font-display text-lg text-ink">
                    Hòa Âm Solfeggio 528Hz & {activeScent.solfeggioFreq}Hz
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={toggleResonance}
                  className={cn(
                    'h-11 w-11 rounded-full flex items-center justify-center font-bold text-xs transition-all active:scale-90 cursor-pointer shadow-sm',
                    isPlayingResonance
                      ? 'bg-amber-500 text-canvas animate-pulse'
                      : 'bg-canvas border border-line text-ink hover:border-amber-500',
                  )}
                  aria-label={isPlayingResonance ? 'Tắt sóng âm' : 'Bật sóng âm'}
                >
                  {isPlayingResonance ? '❚❚' : '▶'}
                </button>
              </div>

              <p className="font-body text-xs text-ink/75 leading-relaxed">
                Tần số 528Hz kết hợp cùng tần số tương ứng theo dải nhiệt ({activeScent.solfeggioFreq}Hz) giúp lan tỏa hương Hoàng Kỳ trọn vẹn khắp không gian phòng khách, đưa trường năng lượng về trạng thái cân bằng đỉnh cao.
              </p>

              <div className="mt-4 pt-3 border-t border-line/50 flex items-center justify-between font-mono text-[11px] text-muted">
                <span>Bộ phát kép: Dual Sine Wave Web Audio API</span>
                <span className={isPlayingResonance ? 'text-amber-600 font-medium' : ''}>
                  {isPlayingResonance ? 'Đang cộng hưởng kép' : 'Sẵn sàng'}
                </span>
              </div>
            </div>

            {/* Atelier Verification Note */}
            <div className="rounded-xl border border-line/70 bg-canvas/40 p-4 text-center">
              <p className="font-body text-xs text-muted leading-relaxed">
                Chế tác độc bản tại xưởng may đo nội thất GuHomes Thạnh Xuân 1.200m². Trần 12 công trình/năm nhằm bảo chứng tuyệt đối từng chi tiết. KTS Trưởng trực tiếp phụ trách: <strong className="text-ink font-mono">0368 757 916</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
