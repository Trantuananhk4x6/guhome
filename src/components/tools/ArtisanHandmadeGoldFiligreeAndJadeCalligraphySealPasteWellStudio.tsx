'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SealPasteFeature {
  id: string
  name: string
  spec: string
  description: string
}

const SEAL_PASTE_SPECS: readonly SealPasteFeature[] = [
  {
    id: 'jade-well-core',
    name: 'Thân Hộp Tròn Ngọc Bích Phỉ Thúy Type A',
    spec: 'Đường kính 78mm · Sâu 32mm · Ngọc lý thủy Myanmar',
    description: 'Chế tác từ nguyên khối ngọc Phỉ Thúy Type A tự nhiên, lòng tráp mài bóng như gương giữ cho son chu sa không bám dính và giữ ẩm tuyệt hảo.',
  },
  {
    id: 'gold-filigree-rim',
    name: 'Nẹp Mây Vàng 24K Filigree & Nắp Ren Vi Sai',
    spec: 'Chỉ vàng 24K 0.18mm · Nắp đậy kín khí 99.9%',
    description: 'Khung viền vàng 24K đan họa tiết mây cát tường, nắp ngậm ren xoay vi sai ngăn không khí lọt vào, bảo toàn độ ẩm của bùn son qua hàng thế kỷ.',
  },
  {
    id: 'cinnabar-paste-compound',
    name: 'Bùn Son Chu Sa Hoàng Gia Tinh Luyện',
    spec: 'Khoáng thạch Thần Sa · Dầu thầu dầu & Tơ tằm cổ',
    description: 'Sắc son đỏ thắm rực rỡ, không nhòe khi gặp ẩm, bám mực chắc chắn trên giấy dó và giấy xuyến chỉ lưu giữ dấu triện vĩnh cửu.',
  },
  {
    id: 'ebony-saucer-base',
    name: 'Đế Đỡ Gỗ Mun Sừng Đánh Sáp Ong Tự Nhiên',
    spec: 'Đường kính 92mm · Mộng chốt âm dương',
    description: 'Đế gỗ Mun sừng Khánh Hòa màu đen tuyền huyền bí, ôm khít đáy hộp son ngọc, tạo điểm tựa đầm chắc khi ấn triện thư pháp.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphySealPasteWellStudio() {
  const [isLidOpened, setIsLidOpened] = useState(false)
  const [stampImpressions, setStampImpressions] = useState<number>(4)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [activeFeature, setActiveFeature] = useState<string>('jade-well-core')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const currentFeature =
    SEAL_PASTE_SPECS.find((f) => f.id === activeFeature) ?? SEAL_PASTE_SPECS[0]!

  const handleImpression = () => {
    setStampImpressions((prev) => prev + 1)
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
        setIsPlayingAudio(false)
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24">
      {/* Ambience Background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-red-950/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-emerald-950/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-red-300">
            <span>Atelier Thủ Công Độc Bản</span>
            <span>·</span>
            <span>GuHomes Thư Phòng & Ngọc Phẩm</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-amber-100 sm:text-4xl lg:text-5xl">
            Hộp Son Chu Sa Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree "Châu Sa Thụy Khí"
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:text-base">
            Bảo vật lưu dấu ấn tín: Nguyên khối ngọc Phỉ Thúy Type A mài bóng gương nẹp viền vàng 24K Filigree, chứa đựng bùn son chu sa hoàng gia đỏ thắm trường tồn cùng thời gian.
          </p>
        </div>

        {/* Master Showcase Layout */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Main Stage: 7 cols */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-sm lg:col-span-7">
            {/* Top Toolbar */}
            <div className="flex w-full items-center justify-between border-b border-stone-800/80 pb-4">
              <button
                type="button"
                onClick={toggleAudio}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300',
                  isPlayingAudio
                    ? 'border-red-500/60 bg-red-950/60 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                    : 'border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-600'
                )}
              >
                <span className={cn('h-2 w-2 rounded-full', isPlayingAudio ? 'bg-red-400 animate-pulse' : 'bg-stone-500')} />
                {isPlayingAudio ? 'Hòa Âm Bát Độ 528Hz & 1056Hz (Đang Phát)' : 'Thanh Âm Chu Sa Thiền Định'}
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
                  className="h-1.5 w-24 cursor-pointer accent-red-500 sm:w-32"
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
                {/* Jade Seal Paste Well Pot */}
                <div className="relative flex flex-col items-center">
                  {/* Removable Lid */}
                  <motion.div
                    animate={{
                      y: isLidOpened ? -42 : 0,
                      rotateX: isLidOpened ? -20 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                    className={cn(
                      'relative z-20 h-16 w-48 rounded-t-full border-2 transition-colors duration-300 flex flex-col items-center justify-center shadow-xl',
                      isLidOpened
                        ? 'border-amber-400 bg-emerald-800/90 shadow-emerald-500/20'
                        : 'border-amber-400/80 bg-gradient-to-b from-emerald-600 via-emerald-800 to-emerald-950'
                    )}
                  >
                    {/* Golden Chrysanthemum Knob */}
                    <div className="absolute -top-3 h-6 w-6 rounded-full border border-amber-300 bg-amber-400/40 flex items-center justify-center shadow-inner">
                      <span className="text-[10px] text-amber-200">✦</span>
                    </div>

                    <span className="font-serif text-xs text-amber-200 tracking-wider">
                      CHÂU SA THỤY KHÍ
                    </span>
                    <span className="text-[8px] font-mono text-amber-300/80">KÍN KHÍ VI SAI 99.9%</span>
                  </motion.div>

                  {/* Main Well Body & Cinnabar Paste */}
                  <div className="relative z-10 -mt-1 h-36 w-52 rounded-b-3xl border-2 border-amber-400/70 bg-gradient-to-b from-emerald-900 via-emerald-950 to-stone-950 p-3 shadow-2xl flex flex-col items-center justify-center">
                    {/* Cinnabar Paste Chamber */}
                    <div className="relative flex h-24 w-40 items-center justify-center rounded-full border-2 border-amber-400/50 bg-red-700 shadow-inner">
                      {/* Paste texture */}
                      <div className="flex h-20 w-36 items-center justify-center rounded-full border border-amber-300/40 bg-gradient-to-br from-red-600 via-red-700 to-red-900 shadow-inner">
                        <span className="font-serif text-sm font-bold text-amber-200/90 tracking-widest">
                          朱砂膏
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex w-full items-center justify-between px-2 text-[10px] text-stone-400">
                      <span>Đường kính 78mm</span>
                      <span className="text-red-400">Son Thần Sa Nguyên Chất</span>
                    </div>
                  </div>

                  {/* Ebony Saucer Stand */}
                  <div className="relative z-0 -mt-1 h-6 w-60 rounded-md border border-amber-600/60 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 shadow-lg flex items-center justify-center">
                    <span className="text-[9px] font-serif text-amber-300/80">Đế Mun Sừng Khánh Hòa Mộng Cổ</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Lid Toggle & Stamp Impression Action */}
            <div className="grid w-full grid-cols-2 gap-3 border-t border-stone-800/80 pt-4">
              <button
                type="button"
                onClick={() => setIsLidOpened(!isLidOpened)}
                className={cn(
                  'rounded-lg border px-4 py-2 text-xs font-medium transition-colors',
                  isLidOpened
                    ? 'border-emerald-500/70 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/60'
                    : 'border-amber-500/70 bg-amber-950/60 text-amber-200 hover:bg-amber-900/60'
                )}
              >
                {isLidOpened ? 'Đậy Kín Nắp Hộp Son' : 'Mở Nắp Hộp Son Chu Sa'}
              </button>

              <button
                type="button"
                onClick={handleImpression}
                className="rounded-lg border border-red-500/70 bg-red-950/60 px-4 py-2 text-xs font-medium text-red-200 hover:bg-red-900/60 transition-colors"
              >
                Chấm Ấn Triện Thử Nghiệm
              </button>
            </div>

            {/* Impressions Stamp Bar */}
            <div className="mt-4 flex w-full items-center justify-between rounded-xl border border-stone-800 bg-stone-950/60 p-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">Vết son triện:</span>
                <div className="flex items-center gap-1.5">
                  {[...Array(Math.min(stampImpressions, 8))].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      className="flex h-6 w-6 items-center justify-center rounded border border-red-500 bg-red-800/80 font-serif text-[10px] text-amber-200 shadow-sm"
                    >
                      福
                    </motion.div>
                  ))}
                </div>
              </div>
              <span className="font-mono text-xs text-stone-400">Đã đóng: {stampImpressions} lần</span>
            </div>
          </div>

          {/* Feature Details & Provenance: 5 cols */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Feature Tabs */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h3 className="font-serif text-lg font-normal text-amber-100">
                Chi Tiết Cấu Kiện & Kỹ Nghệ
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {SEAL_PASTE_SPECS.map((feature) => (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setActiveFeature(feature.id)}
                    className={cn(
                      'rounded-xl border p-2.5 text-left transition-all duration-200',
                      activeFeature === feature.id
                        ? 'border-red-500/60 bg-red-950/50 shadow-md'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-xs font-medium text-stone-200">{feature.name}</div>
                    <div className="mt-1 truncate font-mono text-[10px] text-red-400/90">{feature.spec}</div>
                  </button>
                ))}
              </div>

              {/* Active Detail Box */}
              <div className="mt-4 rounded-xl border border-red-900/50 bg-stone-950/70 p-4">
                <div className="text-xs font-semibold text-red-300 uppercase tracking-wider">
                  {currentFeature.name}
                </div>
                <div className="mt-1 font-mono text-xs text-amber-400">{currentFeature.spec}</div>
                <p className="mt-2 text-xs leading-relaxed text-stone-300">
                  {currentFeature.description}
                </p>
              </div>
            </div>

            {/* Provenance Card */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h4 className="font-serif text-base font-normal text-amber-200">
                Chứng Thư Chế Tác Thư Phòng GuHomes
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">❖</span>
                  <span><strong>Son Thần Sa thượng phẩm:</strong> Chiết xuất từ khoáng thạch thần sa nguyên chất, bền màu qua hàng thế kỷ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">❖</span>
                  <span><strong>Kỹ nghệ nẹp vàng 24K:</strong> Đan chỉ filigree mây cát tường, nắp ngậm ren vi sai bảo toàn độ ẩm tuyệt đối.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">❖</span>
                  <span><strong>Quy chuẩn may đo:</strong> Xưởng mộc Thạnh Xuân 1.200m², phục vụ giới hạn 12 gia chủ tinh hoa mỗi năm.</span>
                </li>
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-stone-800 pt-4">
                <div>
                  <div className="text-[11px] text-stone-400">Tư vấn không gian thư phòng:</div>
                  <div className="font-mono text-sm font-semibold text-amber-300">Hotline KTS Trưởng: 0368 757 916</div>
                </div>
                <a
                  href="/contact"
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-colors"
                >
                  Liên Hệ Đặt May Đo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
