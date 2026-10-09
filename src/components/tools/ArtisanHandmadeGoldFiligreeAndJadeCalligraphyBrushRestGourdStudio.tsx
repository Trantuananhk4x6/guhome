'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GourdRestFeature {
  id: string
  name: string
  spec: string
  description: string
}

const GOURD_REST_SPECS: readonly GourdRestFeature[] = [
  {
    id: 'jade-gourd-core',
    name: 'Hồ Lô Phúc Lộc Ngọc Bích Phỉ Thúy Type A',
    spec: 'Dài 188mm · Rộng 62mm · Ngọc lý thủy Myanmar',
    description: 'Chạm khắc thủ công nguyên khối ngọc Phỉ Thúy Type A tự nhiên hình dáng Hồ Lô tài lộc song song 2 rãnh ngự bút phong thủy, thấu quang 93.8%.',
  },
  {
    id: 'gold-vine-filigree',
    name: 'Nẹp Dây Leo Bầu Bí Vàng 24K Filigree',
    spec: 'Chỉ vàng 24K 0.18mm · Nghệ nhân kim hoàn Huế',
    description: 'Đan chỉ vàng 24K Filigree tạo hình dây leo bầu bí cát tường ôm quanh thân ngọc, biểu trưng cho phúc lộc vạn đại, sinh sôi nảy nở.',
  },
  {
    id: 'mun-sung-stand',
    name: 'Đế Đỡ Gỗ Mun Sừng Mộng Âm Dương Cổ',
    spec: 'Gỗ Mun sừng Khánh Hòa 150 năm · Đánh sáp ong',
    description: 'Đế gỗ Mun sừng nguyên khối đen tuyền bóng gương tự nhiên, gia công mộng mộc truyền thống không đinh kim loại, nâng đỡ thân ngọc đầm chắc tuyệt đối.',
  },
  {
    id: 'brush-saddle-groove',
    name: 'Rãnh Song Ngự Bút Độ Dốc Thoát Mực 15°',
    spec: 'Rãnh đôi vi sai đối xứng · Bảo vệ lông ngự bút',
    description: 'Hai rãnh cong uốn lượn giữ ngọn bút lông sói mùa đông luôn lơ lửng, tạo độ thông khí vi sai chống vón cục mực nho trong khí hậu ẩm Sài Gòn.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestGourdStudio() {
  const [selectedFeature, setSelectedFeature] = useState<GourdRestFeature>(GOURD_REST_SPECS[0]!)
  const [isBrushRested, setIsBrushRested] = useState(true)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.4)
        setTimeout(() => {
          osc1Ref.current?.stop()
          osc2Ref.current?.stop()
          osc1Ref.current?.disconnect()
          osc2Ref.current?.disconnect()
          setIsPlayingAudio(false)
        }, 400)
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

        // 528Hz Fundamental & 1056Hz Octave Harmonic
        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.6)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()
        osc1Ref.current = osc1
        osc2Ref.current = osc2
        gainRef.current = gain
        setIsPlayingAudio(true)
      } catch {
        setIsPlayingAudio(false)
      }
    }
  }

  const toggleBrush = () => {
    setIsBrushRested((prev) => !prev)
    // Small resonant bell click on brush interaction
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(isBrushRested ? 741 : 528, ctx.currentTime)
      g.gain.setValueAtTime(0.04, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3)
      osc.connect(g)
      g.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
    } catch {}
  }

  return (
    <section className="relative overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24">
      {/* Jadeite Glow Background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-emerald-700/30 blur-3xl" />
        <div className="absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-amber-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-emerald-300">
            <span>Văn Phòng Tứ Bảo Triều Đình</span>
            <span>·</span>
            <span>Kỹ Nghệ Kim Hoàn Filigree & Phỉ Thúy Type A</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-amber-100 sm:text-4xl lg:text-5xl">
            Atelier Kê Ngự Bút Hình Hồ Lô Phúc Lộc Ngọc Phỉ Thúy Nẹp Vàng 24K Filigree
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:text-base">
            Bảo vật ngự án thư phòng: Chạm khắc thủ công từ nguyên khối Ngọc Bích Phỉ Thúy Type A Myanmar hình Hồ Lô cát tường song rãnh ngự bút, nẹp viền vàng ròng 24K Filigree kéo sợi 0.18mm "Hồ Lô Tụ Phúc", đế gỗ Mun sừng Khánh Hòa 150 năm tuổi.
          </p>
        </div>

        {/* Master Interactive Stage */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Main Visual: 7 cols */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-sm lg:col-span-7">
            {/* Top Toolbar */}
            <div className="flex w-full items-center justify-between border-b border-stone-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-emerald-300">
                  Độ zoom: {zoomLevel.toFixed(1)}x | Trạng thái: {isBrushRested ? 'Ngự Bút Đang Gác' : 'Đã Nhấc Ngự Bút'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => (z >= 1.4 ? 1 : z + 0.2))}
                  className="rounded-full border border-stone-700 bg-stone-800/60 px-3 py-1 font-mono text-xs text-stone-300 hover:border-stone-600"
                >
                  Zoom {zoomLevel.toFixed(1)}x
                </button>

                <button
                  type="button"
                  onClick={toggleAudio}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300',
                    isPlayingAudio
                      ? 'border-emerald-500/80 bg-emerald-950/60 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-600',
                  )}
                >
                  <span>{isPlayingAudio ? 'Tiếng Chuông Ngọc 528Hz' : 'Nghe Tiếng Ngọc Bích'}</span>
                </button>
              </div>
            </div>

            {/* Central Interactive Gourd Rest Artwork Stage */}
            <div className="relative mt-8 flex h-72 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800 bg-stone-950/90 sm:h-96">
              {/* Dynamic Aura */}
              <div className="absolute inset-8 rounded-full border border-emerald-900/30 opacity-40 animate-pulse" />

              {/* Scalable Container */}
              <div
                className="relative flex flex-col items-center transition-transform duration-500"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Floating Imperial Calligraphy Brush */}
                <motion.div
                  animate={{
                    y: isBrushRested ? 0 : -45,
                    rotate: isBrushRested ? -3 : -10,
                    opacity: isBrushRested ? 1 : 0.8,
                  }}
                  transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                  onClick={toggleBrush}
                  className="group relative z-30 flex cursor-pointer items-center"
                  title="Nhấp để nhấc/gác ngự bút lông sói hoàng gia"
                >
                  {/* Brush Handle: Mun Wood + Gold Ring */}
                  <div className="flex h-3.5 w-60 items-center rounded-l-full border border-amber-600/70 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 shadow-lg sm:w-72">
                    <div className="ml-auto h-full w-4 rounded-r-sm border-l border-amber-400 bg-amber-500" />
                  </div>
                  {/* Brush Tip: Pure Winter Wolf Bristles */}
                  <div className="h-6 w-12 rounded-r-full bg-gradient-to-r from-stone-200 via-stone-300 to-stone-900 shadow-md blur-[0.3px]" />
                </motion.div>

                {/* Gourd Jade Rest Silhouette (Twin gourd lobes with 2 brush saddle grooves) */}
                <div
                  onClick={toggleBrush}
                  className="group relative z-20 -mt-2 flex h-20 w-64 cursor-pointer items-center justify-around rounded-t-3xl border-2 border-emerald-400/80 bg-gradient-to-r from-emerald-950 via-emerald-800 to-emerald-950 p-2 shadow-[0_0_30px_rgba(16,185,129,0.35)] sm:w-72"
                  title="Nhấp để tương tác ngự bút với đài ngọc Hồ Lô"
                >
                  {/* Left Gourd Curve (Phúc) */}
                  <div className="flex h-10 w-24 flex-col items-center justify-center rounded-2xl border border-amber-400/60 bg-emerald-900/60 shadow-inner">
                    <span className="text-[10px] font-mono text-emerald-200">Rãnh Phúc</span>
                    <span className="text-[8px] font-mono text-amber-300">Độ dốc 15°</span>
                  </div>

                  {/* Right Gourd Curve (Lộc) */}
                  <div className="flex h-10 w-24 flex-col items-center justify-center rounded-2xl border border-amber-400/60 bg-emerald-900/60 shadow-inner">
                    <span className="text-[10px] font-mono text-emerald-200">Rãnh Lộc</span>
                    <span className="text-[8px] font-mono text-amber-300">Độ dốc 15°</span>
                  </div>

                  {/* Gold Filigree Wire Lattice Overlay */}
                  <div className="pointer-events-none absolute inset-1 rounded-t-3xl border border-dashed border-amber-400/40" />
                </div>

                {/* Mun Wood Stand */}
                <div className="relative z-10 -mt-1 flex h-7 w-72 items-center justify-center rounded-md border border-stone-800 bg-stone-900 shadow-xl sm:w-80">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-stone-400">
                    Đế Gỗ Mun Sừng Khánh Hòa 150 Năm Mộng Mộc
                  </span>
                </div>
              </div>

              {/* Status Marker */}
              <div className="absolute bottom-3 left-4 text-[10px] font-mono text-emerald-400/80">
                Phỉ Thúy Type A: Khối Ngọc Liền Mạch Không Tỳ Vết
              </div>
            </div>

            {/* Interactive Brush Toggle Button */}
            <div className="mt-4 flex w-full justify-center">
              <button
                type="button"
                onClick={toggleBrush}
                className="rounded-full border border-emerald-500/60 bg-emerald-950/60 px-5 py-2 font-serif text-xs text-emerald-200 hover:bg-emerald-900/60 transition-all duration-300 shadow-lg"
              >
                {isBrushRested ? 'Nhấc Ngự Bút Ra Khỏi Đài Ngọc' : 'Gác Ngự Bút Lên Đài Hồ Lô'}
              </button>
            </div>
          </div>

          {/* Right Panel: Gourd Rest Spec details (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Feature List */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm">
              <h3 className="border-b border-stone-800 pb-3 font-serif text-lg text-amber-200">
                Kỹ Nghệ Chế Tác Kê Ngự Bút Hồ Lô
              </h3>

              <div className="mt-4 space-y-3">
                {GOURD_REST_SPECS.map((feature) => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setSelectedFeature(feature)}
                    className={cn(
                      'w-full text-left rounded-xl border p-3 transition-all duration-300',
                      selectedFeature.id === feature.id
                        ? 'border-emerald-500/80 bg-emerald-950/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                        : 'border-stone-800/80 bg-stone-950/40 hover:border-stone-700',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif text-stone-100 font-medium">
                        {feature.name}
                      </span>
                      <span className="rounded bg-emerald-950 px-2 py-0.5 font-mono text-[9px] text-emerald-300">
                        {feature.spec.split('·')[0]}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                      {feature.description}
                    </p>

                    <span className="mt-2 block font-mono text-[10px] text-stone-500">
                      Quy chuẩn: {feature.spec}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quiet Luxury & Atelier Brand Commitment */}
            <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-br from-stone-900/90 to-emerald-950/20 p-5 backdrop-blur-sm">
              <span className="font-serif text-base text-amber-200 block">
                Tích Khí Tụ Phúc · Đẳng Cấp Thư Phòng
              </span>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Hình tượng Hồ Lô mang lại bình an, tích tụ điềm lành và tài lộc trường tồn. Từng đường nẹp vàng 24K filigree được nghệ nhân may đo thủ công tạo nên một điểm nhấn tĩnh tại nhưng kiêu hãnh trên bàn làm việc của gia chủ.
              </p>

              <div className="mt-4 border-t border-stone-800 pt-3 text-[11px] text-stone-400">
                <span className="text-amber-400 font-medium">Xưởng may đo Thạnh Xuân 1.200m²:</span> Nơi hội tụ các nghệ nhân lành nghề, duy trì trần 12 công trình/năm để kiến tạo không gian sống đúng "Gu". Hotline KTS Trưởng: <span className="text-emerald-300 font-mono">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
