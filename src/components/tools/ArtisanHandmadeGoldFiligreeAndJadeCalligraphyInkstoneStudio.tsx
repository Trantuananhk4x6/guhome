'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface InkstoneFeature {
  id: string
  name: string
  spec: string
  description: string
}

const INKSTONE_SPECS: readonly InkstoneFeature[] = [
  {
    id: 'stone-body',
    name: 'Đá Cổ Thạch Đoan Khê Nguyên Khối',
    spec: 'Dài 260mm · Rộng 168mm · Dày 45mm',
    description: 'Chất đá cổ thạch tự nhiên mịn màng như da hài nhi, độ cứng vi mô hoàn hảo giúp nhả mực óng ả mà không làm tổn hại lông cọ bút ngự chế.',
  },
  {
    id: 'gold-filigree',
    name: 'Viền Nẹp Mây Vàng 24K Filigree',
    spec: 'Sợi vàng 0.12mm · Khối lượng vàng 680g',
    description: 'Chế tác theo đồ án "Long Vân Triều Thụy" với họa tiết mây lành uốn lượn quanh viền nghiên, ôm chặt khối đá mà không dùng keo hóa chất.',
  },
  {
    id: 'jade-inlay',
    name: 'Khảm Ngọc Bích Phỉ Thúy Type A',
    spec: 'Ngọc phỉ thúy Myanmar nước ngọc lý thủy',
    description: 'Điểm xuyết trên các chốt mây vàng nâng đỡ nắp đậy, tạo điểm nhấn phong thủy thanh nhã cho không gian thư phòng của gia chủ thượng lưu.',
  },
  {
    id: 'ink-pool',
    name: 'Lòng Nghiên Thủy Đường Tụ Khí',
    spec: 'Độ sâu vi sai 12mm · Giữ ẩm 72 giờ',
    description: 'Thiết kế độ dốc vi sai hỗ trợ tụ mực trung tâm, giữ cho giọt mực thơm không bị bốc hơi khô đặc trong suốt 3 ngày dù mở nắp.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyInkstoneStudio() {
  const [grindingLevel, setGrindingLevel] = useState<number>(0)
  const [isGrinding, setIsGrinding] = useState(false)
  const [waterDrops, setWaterDrops] = useState<number>(3)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [activeFeature, setActiveFeature] = useState<string>('stone-body')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const currentFeature =
    INKSTONE_SPECS.find((f) => f.id === activeFeature) ?? INKSTONE_SPECS[0]!

  const addWaterDrop = () => {
    setWaterDrops((prev) => Math.min(10, prev + 1))
  }

  const toggleGrind = () => {
    setIsGrinding(!isGrinding)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isGrinding) {
      interval = setInterval(() => {
        setGrindingLevel((prev) => {
          if (prev >= 100) return 100
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isGrinding])

  // Dual Tone Audio 528Hz & 1056Hz (Zen Octave)
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
        osc2.frequency.setValueAtTime(1056, ctx.currentTime) // High Octave chime

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
            <span>Văn Phòng Tứ Bảo Cung Đình · Sprint 111</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink">
            Atelier Nghiên Mực Đoan Khê Nẹp Vàng 24K Filigree & Ngọc Bích Phỉ Thúy
          </h2>

          <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed">
            Tuyệt tác nghiên mực thủ công "Long Vân Triều Thụy" từ đá cổ thạch Đoan Khê trứ danh, viền nẹp vàng ròng 24K đan chỉ Filigree bọc Ngọc Bích Phỉ Thúy Type A Myanmar. Biểu tượng của sự tĩnh tại và học vấn uyên thâm trong thư phòng GuHomes.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inkstone Canvas & Grinding Simulator (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-8 backdrop-blur-md shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 mb-4">
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-ink">
                    Mô Phỏng Mài Mực Thỏi Ngự Chế
                  </h3>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Độ đậm đặc mực: {grindingLevel}% · {waterDrops} giọt nước thiền định
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
                    onClick={addWaterDrop}
                    className="px-3 py-1.5 rounded-lg border border-blue-400/40 bg-blue-50/40 text-blue-700 font-mono text-xs hover:bg-blue-100/50 active:scale-95 transition-all cursor-pointer"
                  >
                    + Nhỏ Giọt Nước
                  </button>

                  <button
                    type="button"
                    onClick={toggleGrind}
                    className={cn(
                      'px-3.5 py-1.5 rounded-lg font-mono text-xs font-medium border transition-all active:scale-95 cursor-pointer',
                      isGrinding
                        ? 'border-emerald-600 bg-emerald-600 text-canvas shadow-xs'
                        : 'border-line bg-canvas hover:border-emerald-500 text-ink',
                    )}
                  >
                    {isGrinding ? 'Dừng Mài' : 'Mài Mực'}
                  </button>
                </div>
              </div>

              {/* Graphical Inkstone Surface */}
              <div className="relative aspect-4/3 max-w-[460px] mx-auto my-6 flex items-center justify-center">
                {/* Aura Glow */}
                <div
                  className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/10 via-amber-400/10 to-transparent blur-xl pointer-events-none transition-all duration-500"
                  style={{ transform: `scale(${zoomLevel})` }}
                />

                {/* Main Inkstone Body */}
                <div
                  className="relative w-80 h-56 rounded-3xl border-4 border-amber-500/70 bg-gradient-to-b from-stone-900 via-stone-950 to-neutral-900 p-5 shadow-2xl transition-transform duration-300 flex flex-col justify-between"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  {/* Filigree Outer Rim Pattern */}
                  <div className="absolute inset-1 rounded-2xl border-2 border-dashed border-amber-400/40 pointer-events-none" />

                  {/* Top Jade Clouds Header */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-400/80 border border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                      <span className="font-mono text-[9px] text-amber-300/80 uppercase tracking-widest">
                        Ngọc Bích Type A
                      </span>
                    </div>

                    <span className="font-mono text-[9px] text-stone-400">
                      Nẹp Vàng 24K Filigree
                    </span>

                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-400/80 border border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                    </div>
                  </div>

                  {/* Center Ink Pool (Thủy Đường) */}
                  <div className="relative mx-auto w-56 h-32 rounded-2xl border border-stone-800 bg-neutral-950 flex flex-col items-center justify-center p-3 overflow-hidden shadow-inner">
                    {/* Liquid Ink Visual responding to grindingLevel and waterDrops */}
                    <div
                      className="absolute inset-2 rounded-xl transition-all duration-700 bg-gradient-to-br from-neutral-900 via-black to-stone-950 flex items-center justify-center"
                      style={{
                        opacity: 0.4 + grindingLevel * 0.006,
                        boxShadow: `inset 0 0 ${grindingLevel * 0.3}px rgba(0,0,0,0.9)`,
                      }}
                    >
                      {/* Ripples when grinding */}
                      {isGrinding && (
                        <div className="absolute w-20 h-20 rounded-full border border-stone-600 animate-ping opacity-40" />
                      )}

                      <div className="text-center z-10 select-none">
                        <span className="font-serif text-xs text-stone-300 block">
                          Nghiên Thủy Đoan Khê
                        </span>
                        <span className="font-mono text-[10px] text-amber-200/60 block mt-1">
                          Độ đậm: {grindingLevel}% · {waterDrops} Giọt Nước
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer Info */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-400 z-10 px-2">
                    <span>Độ Mịn: Thượng Hạng</span>
                    <span className="text-amber-300/70">Mẫu: Long Vân Triều Thụy</span>
                  </div>
                </div>
              </div>

              {/* Grinding Controls & Progress Bar */}
              <div className="mt-4 pt-4 border-t border-line/60">
                <div className="flex justify-between font-mono text-xs mb-2">
                  <span className="text-muted">Quá trình phân giải mực thỏi:</span>
                  <span className="text-emerald-700 font-bold">{grindingLevel}% hoàn tất</span>
                </div>
                <div className="w-full h-2 rounded-full bg-line overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-700 transition-all duration-300"
                    style={{ width: `${grindingLevel}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cultural Provenance & Audio Tuning (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Inkstone Anatomical Features */}
            <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-7 backdrop-blur-md shadow-xs">
              <span className="font-mono text-[11px] text-emerald-700 uppercase tracking-wider block mb-1">
                Kỹ Nghệ Văn Phòng Tứ Bảo
              </span>
              <h3 className="font-display text-xl text-ink mb-3">
                Cấu Trúc Tác Phẩm Long Vân
              </h3>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {INKSTONE_SPECS.map((feature) => (
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
