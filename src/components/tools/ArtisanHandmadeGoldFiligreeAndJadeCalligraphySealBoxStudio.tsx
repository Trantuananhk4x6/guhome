'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SealBoxFeature {
  id: string
  name: string
  spec: string
  description: string
}

const SEAL_BOX_SPECS: readonly SealBoxFeature[] = [
  {
    id: 'jade-hex-body',
    name: 'Thân Tráp Lục Lăng Ngọc Bích Phỉ Thúy Type A',
    spec: 'Cao 142mm · Rộng 126mm · Ngọc phỉ thúy lý thủy Myanmar',
    description: 'Chế tác từ nguyên khối ngọc Phỉ Thúy Type A tự nhiên, mài gọt 6 mặt lục lăng chuẩn xác, biểu trưng cho sự viên mãn và trường tồn của gia tộc.',
  },
  {
    id: 'gold-filigree-trim',
    name: 'Nẹp Mây Vàng 24K Filigree & Bản Lề Hoa Cúc',
    spec: 'Chỉ vàng 24K 0.22mm · Kỹ nghệ đan hoa cúc Vạn Thọ',
    description: 'Viền khung tráp nẹp vàng 24K đan chỉ filigree vi diệu, bản lề mở êm ái cùng khóa chốt ngậm tạo hình hoa cúc hoàng gia chạm khắc tinh xảo.',
  },
  {
    id: 'silk-lining-cushion',
    name: 'Lòng Tráp Lót Lụa Tơ Tằm Bảo Lộc Dệt Tay',
    spec: 'Lụa tơ tằm tự nhiên · Nhuộm chu sa đỏ thắm cao cấp',
    description: 'Đệm đỡ ngự ấn được may đo từ lụa tơ tằm Bảo Lộc 100% thủ công, giữ ấn triện ngọc hoặc thọ sơn không rung chấn, bảo toàn nguyên khí triện văn.',
  },
  {
    id: 'cinnabar-paste-well',
    name: 'Khay Son Chu Sa Hoàng Gia Nẹp Vàng 24K',
    spec: 'Đường kính 48mm · Nắp đậy kín khí vi sai',
    description: 'Khay đựng bùn son chu sa tinh luyện cùng dầu thầu dầu và sợi bông cổ, giúp sắc son tươi thắm rực rỡ, bền màu qua hàng thế kỷ.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealBoxStudio() {
  const [boxState, setBoxState] = useState<'closed' | 'opened' | 'lifted'>('closed')
  const [stampCount, setStampCount] = useState<number>(3)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [activeFeature, setActiveFeature] = useState<string>('jade-hex-body')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const currentFeature =
    SEAL_BOX_SPECS.find((f) => f.id === activeFeature) ?? SEAL_BOX_SPECS[0]!

  const handleStamp = () => {
    setStampCount((prev) => prev + 1)
  }

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
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.8)

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
        // Fallback for browsers with restricted autoplay
        setIsPlayingAudio(false)
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-emerald-900/30 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-amber-900/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-emerald-300">
            <span>Atelier Thủ Công Độc Bản</span>
            <span>·</span>
            <span>GuHomes Haute Horlogerie & Ngọc Phẩm</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-amber-100 sm:text-4xl lg:text-5xl">
            Tráp Ấn Triện Lục Giác Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:text-base">
            Kiệt tác ngự dụng thư phòng: Vỏ ngọc Phỉ Thúy Myanmar thượng hạng, nẹp hoa cúc Vạn Thọ sợi vàng 24K Filigree và đệm lụa tơ tằm Bảo Lộc gìn giữ ấn tín trường cửu gia đình.
          </p>
        </div>

        {/* Main Interactive Stage */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Visual Display: 7 cols */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-sm lg:col-span-7">
            {/* Audio Toggle & Zoom Bar */}
            <div className="flex w-full items-center justify-between border-b border-stone-800/80 pb-4">
              <button
                type="button"
                onClick={toggleAudio}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300',
                  isPlayingAudio
                    ? 'border-emerald-500/60 bg-emerald-950/60 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                    : 'border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-600'
                )}
              >
                <span className={cn('h-2 w-2 rounded-full', isPlayingAudio ? 'bg-emerald-400 animate-pulse' : 'bg-stone-500')} />
                {isPlayingAudio ? 'Hòa Âm Bát Độ 528Hz & 1056Hz (Đang Phát)' : 'Thư Thái Thư Phòng (Âm Bát Độ)'}
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Thu phóng:</span>
                <input
                  type="range"
                  min="1"
                  max="1.4"
                  step="0.05"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                  className="h-1.5 w-24 cursor-pointer accent-emerald-500 sm:w-32"
                />
                <span className="font-mono text-xs text-stone-300">{zoomLevel.toFixed(2)}x</span>
              </div>
            </div>

            {/* Central Graphic Simulation */}
            <div className="relative my-8 flex h-80 w-full items-center justify-center overflow-hidden sm:h-96">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="relative flex flex-col items-center justify-center"
              >
                {/* Jade Hexagonal Vessel Simulation */}
                <div className="relative flex flex-col items-center">
                  {/* Top Seal Handle (When Lifted) */}
                  <AnimatePresence>
                    {boxState === 'lifted' && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: -45 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.4 }}
                        className="absolute -top-16 z-30 flex flex-col items-center"
                      >
                        <div className="h-16 w-12 rounded-t-lg border border-amber-400/80 bg-gradient-to-b from-amber-300/40 via-emerald-600/70 to-emerald-800 p-1 shadow-lg shadow-amber-500/20">
                          <div className="h-full w-full rounded border border-amber-200/50 flex flex-col items-center justify-center">
                            <span className="text-[10px] font-serif text-amber-200">Gia Bảo</span>
                            <span className="text-[9px] font-serif text-amber-100">印</span>
                          </div>
                        </div>
                        <div className="h-2 w-14 rounded-b bg-red-700 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                        <span className="mt-1 text-[10px] font-mono text-amber-300/90 bg-stone-900/90 px-2 py-0.5 rounded border border-amber-500/30">
                          Ngự Ấn Thọ Sơn Chu Sa
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Lid (Top Cover) */}
                  <motion.div
                    animate={{
                      y: boxState === 'closed' ? 0 : -32,
                      rotateX: boxState === 'closed' ? 0 : -15,
                    }}
                    transition={{ duration: 0.5 }}
                    className={cn(
                      'relative z-20 h-14 w-44 rounded-t-2xl border-2 transition-colors duration-500',
                      boxState === 'closed'
                        ? 'border-amber-400/80 bg-gradient-to-b from-emerald-700 via-emerald-800 to-emerald-950 shadow-md'
                        : 'border-amber-400 bg-emerald-800/90 shadow-xl'
                    )}
                  >
                    {/* Filigree Chrysanthemum Finial */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center justify-center">
                      <div className="h-6 w-6 rounded-full border border-amber-300 bg-amber-400/30 flex items-center justify-center shadow-inner">
                        <span className="text-[10px] text-amber-200">✦</span>
                      </div>
                    </div>
                    {/* Golden filigree patterns on lid */}
                    <div className="flex h-full items-center justify-around px-3 text-[10px] text-amber-300/80">
                      <span>❖</span>
                      <span className="font-serif tracking-widest text-amber-200">VẠN THỌ VÔ CƯƠNG</span>
                      <span>❖</span>
                    </div>
                  </motion.div>

                  {/* Box Chamber (Main Body) */}
                  <div className="relative z-10 -mt-1 h-44 w-52 rounded-b-2xl border-2 border-amber-400/70 bg-gradient-to-b from-emerald-900 via-emerald-950 to-stone-950 p-3 shadow-2xl">
                    {/* Inner cushion & well when opened */}
                    <div className="flex h-full flex-col justify-between rounded-xl border border-emerald-500/40 bg-stone-900/80 p-2.5">
                      <div className="flex items-center justify-between border-b border-stone-800 pb-1 text-[11px] text-amber-200/90 font-serif">
                        <span>Lục Lăng Phỉ Thúy Type A</span>
                        <span className="font-mono text-[10px] text-emerald-400">142x126mm</span>
                      </div>

                      {/* Seal Cushion Area */}
                      <div className="flex items-center justify-around py-2">
                        {/* Seal Bed */}
                        <div className="flex flex-col items-center">
                          <div className={cn(
                            'h-20 w-16 rounded border flex flex-col items-center justify-center transition-all duration-300',
                            boxState === 'lifted'
                              ? 'border-dashed border-red-500/40 bg-red-950/20'
                              : 'border-red-600/70 bg-red-950/60 shadow-inner'
                          )}>
                            <div className="h-14 w-12 rounded border border-amber-500/30 bg-red-800/40 flex flex-col items-center justify-center text-center p-1">
                              <span className="text-[9px] text-red-200">Lụa Tơ Tằm</span>
                              <span className="text-[8px] text-amber-300 font-mono">Bảo Lộc</span>
                            </div>
                          </div>
                          <span className="mt-1 text-[9px] text-stone-400">Ổ Đặt Bảo Ấn</span>
                        </div>

                        {/* Cinnabar Paste Pot */}
                        <div className="flex flex-col items-center">
                          <div className="h-16 w-16 rounded-full border-2 border-amber-400 bg-red-700/80 shadow-inner flex items-center justify-center">
                            <div className="h-10 w-10 rounded-full border border-amber-300/60 bg-red-800 flex items-center justify-center">
                              <span className="text-[9px] font-serif text-amber-200">朱砂</span>
                            </div>
                          </div>
                          <span className="mt-1 text-[9px] text-stone-400">Son Chu Sa Hoàng Gia</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-stone-400">
                        <span>Khóa Chốt Ngậm 24K</span>
                        <span className="text-emerald-400">Kín Khí Vi Sai 99.8%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* State Controls */}
            <div className="grid w-full grid-cols-3 gap-2 border-t border-stone-800/80 pt-4">
              <button
                type="button"
                onClick={() => setBoxState('closed')}
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
                  boxState === 'closed'
                    ? 'border-emerald-500/80 bg-emerald-950/70 text-emerald-200'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                )}
              >
                1. Đóng Nắp Tráp
              </button>
              <button
                type="button"
                onClick={() => setBoxState('opened')}
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
                  boxState === 'opened'
                    ? 'border-emerald-500/80 bg-emerald-950/70 text-emerald-200'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                )}
              >
                2. Mở Nắp Tráp
              </button>
              <button
                type="button"
                onClick={() => setBoxState('lifted')}
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs font-medium transition-colors',
                  boxState === 'lifted'
                    ? 'border-amber-500/80 bg-amber-950/70 text-amber-200'
                    : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                )}
              >
                3. Nhấc Ngự Ấn
              </button>
            </div>

            {/* Test Stamp Interactive Action */}
            <div className="mt-4 flex w-full items-center justify-between rounded-xl border border-stone-800 bg-stone-950/60 p-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleStamp}
                  className="rounded-md border border-red-500/60 bg-red-950/50 px-3.5 py-1.5 text-xs font-medium text-red-200 hover:bg-red-900/60 transition-colors"
                >
                  Đóng Dấu Triện Thử Nghiệm
                </button>
                <div className="flex items-center gap-1.5">
                  {[...Array(Math.min(stampCount, 8))].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex h-6 w-6 items-center justify-center rounded border border-red-600 bg-red-900/60 font-serif text-[10px] text-red-200 shadow-sm"
                    >
                      印
                    </motion.div>
                  ))}
                </div>
              </div>
              <span className="font-mono text-xs text-stone-400">Đã đóng: {stampCount} ấn</span>
            </div>
          </div>

          {/* Specs & Artisan Dossier: 5 cols */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Feature Tabs */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h3 className="font-serif text-lg font-normal text-amber-100">
                Chi Tiết Cấu Kiện & Kỹ Nghệ
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {SEAL_BOX_SPECS.map((feature) => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setActiveFeature(feature.id)}
                    className={cn(
                      'rounded-xl border p-2.5 text-left transition-all duration-200',
                      activeFeature === feature.id
                        ? 'border-emerald-500/60 bg-emerald-950/50 shadow-md'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-xs font-medium text-stone-200">{feature.name}</div>
                    <div className="mt-1 truncate font-mono text-[10px] text-emerald-400/90">{feature.spec}</div>
                  </button>
                ))}
              </div>

              {/* Active Feature Detail Card */}
              <div className="mt-4 rounded-xl border border-emerald-900/50 bg-stone-950/70 p-4">
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  {currentFeature.name}
                </div>
                <div className="mt-1 font-mono text-xs text-amber-400">{currentFeature.spec}</div>
                <p className="mt-2 text-xs leading-relaxed text-stone-300">
                  {currentFeature.description}
                </p>
              </div>
            </div>

            {/* Atelier GuHomes Provenance */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h4 className="font-serif text-base font-normal text-amber-200">
                Chứng Thư Chế Tác Thư Phòng GuHomes
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">❖</span>
                  <span><strong>Chất liệu ngọc:</strong> 100% Ngọc Bích Phỉ Thúy Type A tự nhiên, khai thác từ mỏ cổ Kachin Myanmar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">❖</span>
                  <span><strong>Kỹ nghệ kim hoàn:</strong> Vàng 24K kéo chỉ Filigree 0.22mm, đan hoa cúc Vạn Thọ thủ công hơn 160 giờ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">❖</span>
                  <span><strong>May đo độc bản:</strong> Xưởng mộc & kim hoàn Thạnh Xuân 1.200m², phục vụ giới hạn 12 gia chủ tinh hoa mỗi năm.</span>
                </li>
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-stone-800 pt-4">
                <div>
                  <div className="text-[11px] text-stone-400">Tư vấn may đo thư phòng:</div>
                  <div className="font-mono text-sm font-semibold text-amber-300">Hotline KTS Trưởng: 0368 757 916</div>
                </div>
                <a
                  href="/contact"
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-colors"
                >
                  Liên Hệ Đặt Chế Tác
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
