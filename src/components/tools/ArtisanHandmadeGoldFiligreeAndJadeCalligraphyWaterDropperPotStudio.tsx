'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DropperFeature {
  id: string
  name: string
  spec: string
  description: string
}

const DROPPER_SPECS: readonly DropperFeature[] = [
  {
    id: 'gourd-body',
    name: 'Thân Hồ Lô Ngọc Bích Phỉ Thúy Type A',
    spec: 'Cao 118mm · Đường kính 72mm · Nước ngọc lý thủy',
    description: 'Tạo hình bầu hồ lô phong thủy tụ phúc khí, ruột khoét rỗng dung tích 120ml chứa nước giếng cổ tinh khiết pha sương mai nuôi mực.',
  },
  {
    id: 'gold-spout',
    name: 'Vòi Trích Thủy Vàng 24K Filigree',
    spec: 'Khẩu độ vi sai 0.8mm · Nhỏ giọt 0.05ml/lần',
    description: 'Đầu vòi uốn lượn hình cành mây cát tường từ sợi vàng 24K đan chỉ Filigree, điều tiết áp suất khí giúp nhỏ từng giọt nước chuẩn xác tuyệt đối.',
  },
  {
    id: 'ebony-stand',
    name: 'Đế Đỡ Gỗ Mun Sừng Mộng Cổ',
    spec: 'Đường kính 88mm · Mộng chốt âm dương',
    description: 'Đế gỗ Mun sừng nguyên khối đen bóng tuyền, ôm khít đáy bình hồ lô, giữ thăng bằng vững chãi trên mặt bàn trà thư phòng.',
  },
  {
    id: 'air-valve',
    name: 'Lỗ Khí Áp Suất Đỉnh Nắp Hồ Lô',
    spec: 'Đường kính 1.2mm · Điều khiển ngón tay',
    description: 'Chạm ngón tay bịt lỗ khí đỉnh nắp để ngắt dòng nước, buông ngón tay để nhả giọt nước vi sai nhẹ nhàng xuống lòng nghiên Đoan Khê.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperPotStudio() {
  const [dropsDispensed, setDropsDispensed] = useState<number>(5)
  const [isDispensing, setIsDispensing] = useState(false)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [activeFeature, setActiveFeature] = useState<string>('gourd-body')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const currentFeature =
    DROPPER_SPECS.find((f) => f.id === activeFeature) ?? DROPPER_SPECS[0]!

  const dispenseSingleDrop = () => {
    setDropsDispensed((prev) => prev + 1)
  }

  const toggleAutoDispense = () => {
    setIsDispensing(!isDispensing)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isDispensing) {
      interval = setInterval(() => {
        setDropsDispensed((prev) => prev + 1)
      }, 600)
    }
    return () => clearInterval(interval)
  }, [isDispensing])

  // Dual Tone Audio 528Hz & 1056Hz
  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5)
        setTimeout(() => {
          osc1Ref.current?.stop()
          osc2Ref.current?.stop()
          osc1Ref.current?.disconnect()
          osc2Ref.current?.disconnect()
          setIsPlayingAudio(false)
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
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 1)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc1Ref.current = osc1
        osc2Ref.current = osc2
        gainRef.current = gain
        setIsPlayingAudio(true)
      } catch (e) {
        console.warn('AudioContext not supported or blocked:', e)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <section className="relative w-full border-t border-line/60 bg-surface/40 py-16 sm:py-24 text-ink overflow-hidden">
      <div className="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-2 self-center px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Văn Phòng Tứ Bảo Cung Đình · Sprint 112</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink">
            Atelier Nghiên Trích Thủy Hồ Lô Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
          </h2>

          <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed">
            Tuyệt tác bình trích thủy "Phúc Lộc Vô Cương" chế tác từ ngọc bích Phỉ Thúy Type A Myanmar dáng bầu hồ lô, vòi vàng ròng 24K đan chỉ Filigree nhỏ giọt vi sai 0.05ml chuẩn xác lên mặt nghiên mài mực trong thư phòng thượng lưu GuHomes.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Water Dropper Visual & Dispenser (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-8 backdrop-blur-md shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 mb-4">
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-ink">
                    Mô Phỏng Trích Thủy Vi Sai
                  </h3>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Đã nhỏ: {dropsDispensed} giọt ({(dropsDispensed * 0.05).toFixed(2)} ml)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.4 : 1))}
                    className="px-3 py-1.5 rounded-lg border border-line bg-canvas font-mono text-xs text-ink hover:border-accent active:scale-95 transition-all cursor-pointer"
                  >
                    Zoom: {zoomLevel}x
                  </button>

                  <button
                    type="button"
                    onClick={dispenseSingleDrop}
                    className="px-3.5 py-1.5 rounded-lg border border-blue-500/60 bg-blue-50 text-blue-800 font-mono text-xs font-medium hover:bg-blue-100 active:scale-95 transition-all cursor-pointer"
                  >
                    + Nhỏ 1 Giọt
                  </button>

                  <button
                    type="button"
                    onClick={toggleAutoDispense}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium border transition-all active:scale-95 cursor-pointer',
                      isDispensing
                        ? 'border-emerald-600 bg-emerald-600 text-canvas shadow-xs'
                        : 'border-line bg-canvas hover:border-emerald-500 text-ink',
                    )}
                  >
                    {isDispensing ? 'Dừng Nhỏ' : 'Tự Động Nhỏ Giọt'}
                  </button>
                </div>
              </div>

              {/* Graphical Gourd Dropper Surface */}
              <div className="relative aspect-4/3 max-w-[460px] mx-auto my-6 flex items-center justify-center">
                {/* Aura Glow */}
                <div
                  className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/15 via-blue-400/10 to-transparent blur-xl pointer-events-none transition-all duration-500"
                  style={{ transform: `scale(${zoomLevel})` }}
                />

                {/* Main Gourd Water Vessel */}
                <div
                  className="relative w-56 h-72 flex flex-col items-center justify-center transition-transform duration-300"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Top Valve Finial */}
                  <div className="w-10 h-6 rounded-t-full bg-amber-400 border border-amber-500 flex items-center justify-center shadow-xs">
                    <span className="font-mono text-[8px] text-amber-950 font-bold">Lỗ Khí</span>
                  </div>

                  {/* Upper Gourd Sphere */}
                  <div className="relative w-28 h-24 rounded-full border-2 border-emerald-400/70 bg-gradient-to-b from-emerald-400/30 via-emerald-500/20 to-emerald-600/30 shadow-lg flex items-center justify-center backdrop-blur-xs">
                    <span className="font-serif text-[10px] text-emerald-900 dark:text-emerald-200 font-semibold">
                      Phỉ Thúy Type A
                    </span>
                  </div>

                  {/* Gold Filigree Belt Waist */}
                  <div className="w-20 h-4 bg-amber-500/80 border-y border-amber-400 flex items-center justify-center relative z-10 shadow-xs">
                    <span className="font-mono text-[8px] text-amber-950 font-bold">Đai Vàng 24K</span>
                  </div>

                  {/* Lower Gourd Sphere */}
                  <div className="relative w-40 h-32 rounded-full border-2 border-emerald-400/80 bg-gradient-to-b from-emerald-500/25 via-emerald-600/30 to-emerald-700/40 shadow-xl flex flex-col items-center justify-center -mt-2 backdrop-blur-xs">
                    <span className="font-display text-xs font-bold text-emerald-950 dark:text-emerald-100">
                      Bình Hồ Lô 120ml
                    </span>
                    <span className="font-mono text-[9px] text-blue-600 dark:text-blue-300 mt-1">
                      Nước Nuôi Mực Tinh Khiết
                    </span>

                    {/* Dropping Water Animation */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-blue-500 animate-bounce" />
                      <span className="font-mono text-[9px] text-blue-700 dark:text-blue-300 font-medium">
                        0.05ml / giọt
                      </span>
                    </div>
                  </div>

                  {/* Curved Gold Filigree Spout on the side */}
                  <div className="absolute right-2 top-24 w-12 h-14 border-r-2 border-b-2 border-amber-400 rounded-br-2xl pointer-events-none" />

                  {/* Mun Sừng Carved Stand Base */}
                  <div className="w-36 h-6 rounded-md bg-stone-900 border border-stone-800 -mt-1 flex items-center justify-center shadow-md">
                    <span className="font-mono text-[8px] text-amber-200/80">
                      Đế Gỗ Mun Sừng Mộng Cổ
                    </span>
                  </div>
                </div>
              </div>

              {/* Dispense Stats */}
              <div className="mt-4 pt-4 border-t border-line/60 flex items-center justify-between font-mono text-xs">
                <span className="text-muted">Lưu lượng nước trích vào nghiên:</span>
                <span className="text-blue-600 font-bold">{dropsDispensed} giọt chuẩn mực</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cultural Provenance & Audio Tuning (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Dropper Anatomical Features */}
            <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-7 backdrop-blur-md shadow-xs">
              <span className="font-mono text-[11px] text-emerald-700 uppercase tracking-wider block mb-1">
                Kỹ Nghệ Văn Phòng Tứ Bảo
              </span>
              <h3 className="font-display text-xl text-ink mb-3">
                Cấu Trúc Tác Phẩm Hồ Lô
              </h3>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {DROPPER_SPECS.map((feature) => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setActiveFeature(feature.id)}
                    className={cn(
                      'p-2.5 rounded-lg border text-left font-mono text-xs transition-all cursor-pointer active:scale-95',
                      activeFeature === feature.id
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/20 font-semibold'
                        : 'border-line bg-canvas text-muted hover:border-line hover:text-ink',
                    )}
                  >
                    <div className="line-clamp-1">{feature.name}</div>
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs font-bold text-emerald-900">
                    {currentFeature.name}
                  </span>
                  <span className="font-mono text-[10px] text-emerald-700">
                    {currentFeature.spec}
                  </span>
                </div>
                <p className="font-body text-xs text-ink/80 leading-relaxed">
                  {currentFeature.description}
                </p>
              </div>
            </div>

            {/* Solfeggio Dual Resonance 528Hz + 1056Hz */}
            <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-surface via-surface to-emerald-500/10 p-6 backdrop-blur-md shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-mono text-[10px] text-emerald-700 uppercase tracking-wider block">
                    Thanh Âm Thư Phòng Cung Đình
                  </span>
                  <h4 className="font-display text-lg text-ink">
                    Hòa Âm Bát Độ 528Hz & 1056Hz
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={toggleAudio}
                  className={cn(
                    'h-11 w-11 rounded-full flex items-center justify-center font-bold text-xs transition-all active:scale-90 cursor-pointer shadow-sm',
                    isPlayingAudio
                      ? 'bg-emerald-600 text-canvas animate-pulse'
                      : 'bg-canvas border border-line text-ink hover:border-emerald-600',
                  )}
                  aria-label={isPlayingAudio ? 'Tắt thanh âm' : 'Bật thanh âm'}
                >
                  {isPlayingAudio ? '❚❚' : '▶'}
                </button>
              </div>

              <p className="font-body text-xs text-ink/75 leading-relaxed">
                Tần số Solfeggio 528Hz kết hợp với họa âm quãng 8 (1056Hz) tái hiện tiếng chuông khánh đồng thau cổ trong không gian tĩnh mịch, hỗ trợ sự tập trung thư thái khi hạ bút đề thơ.
              </p>

              <div className="mt-4 pt-3 border-t border-line/50 flex items-center justify-between font-mono text-[11px] text-muted">
                <span>Trình tạo sóng: Dual Wave Web Audio API</span>
                <span className={isPlayingAudio ? 'text-emerald-700 font-medium' : ''}>
                  {isPlayingAudio ? 'Đang phát sóng bát độ' : 'Sẵn sàng'}
                </span>
              </div>
            </div>

            {/* GuHomes Signature Footnote */}
            <div className="rounded-xl border border-line/70 bg-canvas/40 p-4 text-center">
              <p className="font-body text-xs text-muted leading-relaxed">
                Thiết kế & chế tác độc quyền cho dự án biệt thự của GuHomes. Xưởng may đo Thạnh Xuân 1.200m², hotline KTS Trưởng: <strong className="text-ink font-mono">0368 757 916</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
