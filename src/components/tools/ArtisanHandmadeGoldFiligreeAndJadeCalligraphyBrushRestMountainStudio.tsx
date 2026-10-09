'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MountainRestFeature {
  id: string
  name: string
  spec: string
  description: string
}

const MOUNTAIN_REST_SPECS: readonly MountainRestFeature[] = [
  {
    id: 'jade-tam-son-core',
    name: 'Tam Sơn Ngọc Bích Phỉ Thúy Type A',
    spec: 'Dài 192mm · Cao 58mm · Ngọc lý thủy Myanmar',
    description: 'Chạm khắc thủ công nguyên khối ngọc Phỉ Thúy Type A tự nhiên hình thế 3 ngọn núi vững chãi như bàn thạch, ngọn chủ phong ở giữa nâng đỡ ngự bút uy nghi.',
  },
  {
    id: 'gold-cloud-filigree',
    name: 'Nẹp Mây Vàng 24K Filigree Chân Núi',
    spec: 'Chỉ vàng 24K 0.18mm · Nghệ nhân kim hoàn Huế',
    description: 'Đan chỉ vàng 24K Filigree tạo hình biển mây bồng bềnh ôm quanh chân tam sơn ngọc, tượng trưng mây lành cát tường tụ khí sinh tài.',
  },
  {
    id: 'mun-hoa-stand',
    name: 'Đế Đỡ Gỗ Mun Hoa Mộng Âm Dương Cổ',
    spec: 'Gỗ Mun hoa Khánh Hòa 145 năm · Đánh sáp ong',
    description: 'Đế gỗ Mun hoa nguyên khối vân da báo huyền ảo, nối ghép mộng mộc truyền thống không đinh kim loại, ôm trọn đáy thế núi ngọc vững như thái sơn.',
  },
  {
    id: 'brush-saddle-groove',
    name: 'Yên Ngựa Gác Bút Độ Dốc Thoát Mực 18°',
    spec: 'Rãnh đỡ vi sai đa điểm · Bảo vệ lông ngự bút',
    description: 'Rãnh cong uốn lượn giữa các đỉnh núi giữ ngọn bút lông thỏ hoàng gia luôn lơ lửng, thoát khí chống ẩm mốc thời tiết nồm ẩm TP.HCM.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestMountainStudio() {
  const [isBrushPlaced, setIsBrushPlaced] = useState(true)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [activeFeature, setActiveFeature] = useState<string>('jade-tam-son-core')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const currentFeature =
    MOUNTAIN_REST_SPECS.find((f) => f.id === activeFeature) ?? MOUNTAIN_REST_SPECS[0]!

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
      {/* Ambience Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-emerald-900/30 blur-3xl" />
        <div className="absolute -bottom-32 right-1/3 h-96 w-96 rounded-full bg-amber-900/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-emerald-300">
            <span>Atelier Thủ Công Độc Bản</span>
            <span>·</span>
            <span>GuHomes Thư Phòng & Ngọc Phẩm</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-amber-100 sm:text-4xl lg:text-5xl">
            Giá Kê Ngự Bút Hình Tam Sơn Ngọc Bích Phỉ Thúy Nẹp Vàng 24K Filigree "Tam Sơn Tụ Thụy"
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:text-base">
            Kiệt tác thế núi thư phòng: Khối ngọc Phỉ Thúy Type A chạm 3 ngọn núi vững chãi như bàn thạch, nẹp viền mây cát tường vàng 24K Filigree và bệ mun hoa bách niên tạo khí chất nho nhã uy nghiêm.
          </p>
        </div>

        {/* Master Showcase Grid */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Main Visual: 7 cols */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-sm lg:col-span-7">
            {/* Top Bar */}
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
                {isPlayingAudio ? 'Hòa Âm Bát Độ 528Hz & 1056Hz (Đang Phát)' : 'Thanh Âm Thiền Thư (Âm Bát Độ)'}
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
                {/* Imperial Calligraphy Brush */}
                <motion.div
                  animate={{
                    y: isBrushPlaced ? 0 : -45,
                    rotate: isBrushPlaced ? 0 : -5,
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative z-30 flex flex-col items-center"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Brush Shaft */}
                    <div className="h-4 w-72 rounded-full border border-amber-500/70 bg-gradient-to-r from-amber-950 via-stone-800 to-amber-950 shadow-md">
                      <div className="flex h-full items-center justify-center">
                        <span className="text-[8px] font-serif text-amber-200 tracking-widest">
                          NGỰ BÚT LÔNG THỎ HOÀNG GIA · GUHOMES
                        </span>
                      </div>
                    </div>
                    {/* Brush Tip */}
                    <div className="h-6 w-12 -ml-1 rounded-r-full bg-stone-900 border-l border-amber-600/50 shadow-inner flex items-center justify-center">
                      <div className="h-4 w-10 rounded-r-full bg-stone-800" />
                    </div>
                  </div>

                  <span className="mt-1 text-[9px] font-mono text-amber-300 bg-stone-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                    {isBrushPlaced ? 'Ngự Bút Đang Kê Trên Yên Tam Sơn' : 'Đang Nhấc Bút Khởi Thảo Thư Họa'}
                  </span>
                </motion.div>

                {/* Tam Son Jade Mountain Rest Body */}
                <div className="relative z-10 mt-2 flex flex-col items-center">
                  {/* Three Mountain Peaks */}
                  <div className="relative flex h-24 w-80 items-end justify-center gap-3 rounded-t-3xl border-2 border-amber-400/80 bg-gradient-to-b from-emerald-600 via-emerald-800 to-emerald-950 p-2 shadow-2xl">
                    {/* Left Peak */}
                    <div className="h-16 w-20 rounded-t-full border border-amber-300/60 bg-emerald-500/40 flex flex-col items-center justify-center">
                      <span className="text-[8px] font-serif text-amber-200">Tả Phong</span>
                      <span className="text-[7px] text-emerald-300 font-mono">PHÚC</span>
                    </div>

                    {/* Center Peak (Highest) */}
                    <div className="h-22 w-24 rounded-t-full border-2 border-amber-300 bg-emerald-400/40 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-[9px] font-serif font-bold text-amber-100">Chủ Phong</span>
                      <span className="text-[8px] text-amber-200 font-mono">LỘC</span>
                    </div>

                    {/* Right Peak */}
                    <div className="h-16 w-20 rounded-t-full border border-amber-300/60 bg-emerald-500/40 flex flex-col items-center justify-center">
                      <span className="text-[8px] font-serif text-amber-200">Hữu Phong</span>
                      <span className="text-[7px] text-emerald-300 font-mono">THỌ</span>
                    </div>

                    {/* Cloud Filigree Ribbon */}
                    <div className="absolute -bottom-1 inset-x-4 h-3 rounded-full border border-amber-400 bg-amber-400/20 flex items-center justify-center">
                      <span className="text-[8px] font-serif text-amber-200 tracking-wider">
                        ✦ VÀNG 24K FILIGREE BIỂN MÂY CÁT TƯỜNG ✦
                      </span>
                    </div>
                  </div>

                  {/* Mun Hoa Wood Stand */}
                  <div className="relative z-0 h-8 w-88 rounded-b-xl border-2 border-amber-600/70 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 shadow-xl flex items-center justify-between px-4">
                    <span className="text-[10px] font-serif text-amber-200/80">Mun Hoa Khánh Hòa 145N</span>
                    <span className="font-mono text-[9px] text-emerald-400">Mộng Âm Dương Cổ</span>
                    <span className="text-[10px] font-serif text-amber-200/80">Đánh Sáp Ong Tự Nhiên</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Brush Toggle Button */}
            <div className="flex w-full items-center justify-between border-t border-stone-800/80 pt-4">
              <div className="text-xs text-stone-400">
                Trạng thái: <span className="text-amber-300 font-medium">{isBrushPlaced ? 'Đang Kê Bút' : 'Đã Nhấc Bút'}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                className={cn(
                  'rounded-lg border px-4 py-2 text-xs font-medium transition-colors',
                  isBrushPlaced
                    ? 'border-emerald-500/70 bg-emerald-950/60 text-emerald-200 hover:bg-emerald-900/60'
                    : 'border-amber-500/70 bg-amber-950/60 text-amber-200 hover:bg-amber-900/60'
                )}
              >
                {isBrushPlaced ? 'Nhấc Ngự Bút Khỏi Tam Sơn' : 'Gác Ngự Bút Vào Tam Sơn'}
              </button>
            </div>
          </div>

          {/* Feature Selector & Dossier: 5 cols */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Feature Tabs */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h3 className="font-serif text-lg font-normal text-amber-100">
                Chi Tiết Cấu Kiện & Kỹ Nghệ
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {MOUNTAIN_REST_SPECS.map((feature) => (
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

              {/* Active Detail Box */}
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

            {/* Provenance Card */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h4 className="font-serif text-base font-normal text-amber-200">
                Chứng Thư Chế Tác Thư Phòng GuHomes
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">❖</span>
                  <span><strong>Ngọc Phỉ Thúy tự nhiên:</strong> 100% Ngọc Bích Type A chuẩn kiểm định quốc tế, thớ ngọc mướt lý thủy thấu quang.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">❖</span>
                  <span><strong>Kỹ nghệ mây vàng:</strong> Chỉ vàng 24K filigree 0.18mm đan thủ công vi mô hơn 150 giờ liên tục.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">❖</span>
                  <span><strong>Quy chuẩn may đo:</strong> Xưởng may đo Thạnh Xuân 1.200m², phục vụ tối đa 12 công trình biệt thự mỗi năm.</span>
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
