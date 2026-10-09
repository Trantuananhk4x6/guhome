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
    profile: 'Thanh Ngọt Sen Hồ & Nhựa Trầm Non Sơ Sinh',
    subnotes: 'Hương đầu ngọt ngào thanh tịnh tựa sương sớm hồ sen, hòa quyện cam thảo và hoa nhài hoàng triều',
    activeDuration: 'Ủ nhiệt vi sai 6-8 giờ liên tục',
    solfeggioFreq: 528,
  },
  {
    temp: 145,
    profile: 'Ấm Sâu Nhựa Hắc Kỳ Vạn Ninh & Hổ Phách Cổ',
    subnotes: 'Hương giữa đậm đà nhựa sáp đen bóng huyền bí của Hắc Kỳ Khánh Hòa, tĩnh tại tinh thần',
    activeDuration: 'Ủ nhiệt vi sai 4-5 giờ liên tục',
    solfeggioFreq: 639,
  },
  {
    temp: 195,
    profile: 'Huyền Vũ Định Vị & Khói Thiền Bách Niên',
    subnotes: 'Hương cuối thâm sâu lắng đọng năng lượng Thủy phương Bắc, định tâm an thần và tụ vượng khí',
    activeDuration: 'Ủ nhiệt vi sai 3-4 giờ liên tục',
    solfeggioFreq: 741,
  },
  {
    temp: 235,
    profile: 'Hắc Kỳ Tuyệt Đỉnh Hoàng Gia Cung Đình',
    subnotes: 'Nhiệt độ cực đại kích phát tinh hoa dược lý và linh khí ngàn năm của Hắc Kỳ Vạn Ninh 99.2%',
    activeDuration: 'Ủ nhiệt vi sai 2 giờ ngưng tụ',
    solfeggioFreq: 852,
  },
]

export function BespokeImperialKynamAndGoldFiligreeXuanWuIncenseBurnerVault() {
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
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.8)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc1Ref.current = osc1
        osc2Ref.current = osc2
        gainRef.current = gain
        setIsPlayingResonance(true)
      } catch {
        setIsPlayingResonance(false)
      }
    }
  }

  useEffect(() => {
    let animId: number
    if (isRotating) {
      const step = () => {
        setActiveRotation((prev) => (prev + 0.3) % 360)
        animId = requestAnimationFrame(step)
      }
      animId = requestAnimationFrame(step)
    }
    return () => cancelAnimationFrame(animId)
  }, [isRotating])

  return (
    <section className="relative overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24">
      {/* Decorative Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-cyan-900/30 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-amber-900/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-amber-300">
            <span>Bảo Thất Cung Đình Hoàng Gia</span>
            <span>·</span>
            <span>GuHomes Haute Horlogerie & Kỳ Nam</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-amber-100 sm:text-4xl lg:text-5xl">
            Bảo Thất Kỳ Nam & Đỉnh Lư Vàng 24K Filigree Huyền Vũ Trấn Trạch "Bắc Phương Nhâm Quý"
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:text-base">
            Kiệt tác kim hoàn trấn trạch: Đỉnh Lư tạo hình Huyền Vũ Rùa Thần & Rắn Thiêng đan từ hàng vạn sợi vàng 24K Filigree, ruột đồng đỏ đúc nguyên khối dày 10mm, ngự trên án gỗ Mun sừng Khánh Hòa khảm Ngọc Bích Phỉ Thúy Type A tụ tài trường cửu.
          </p>
        </div>

        {/* Master Showcase Layout */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Main Visual: 7 cols */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-sm lg:col-span-7">
            {/* Top Toolbar */}
            <div className="flex w-full items-center justify-between border-b border-stone-800/80 pb-4">
              <button
                type="button"
                onClick={toggleResonance}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300',
                  isPlayingResonance
                    ? 'border-amber-500/60 bg-amber-950/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-600'
                )}
              >
                <span className={cn('h-2 w-2 rounded-full', isPlayingResonance ? 'bg-amber-400 animate-pulse' : 'bg-stone-500')} />
                {isPlayingResonance ? 'Chuông Vàng Solfeggio 528Hz (Đang Ngân)' : 'Hòa Âm Thiền Trầm (Chuông Vàng)'}
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
                  className="h-1.5 w-24 cursor-pointer accent-amber-500 sm:w-32"
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
                {/* 360 Rotation Container */}
                <div
                  style={{ transform: `rotateY(${activeRotation}deg)` }}
                  className="relative flex flex-col items-center transition-transform"
                >
                  {/* Smoke Wisps (Pure Heat Aroma) */}
                  <div className="pointer-events-none absolute -top-12 flex flex-col items-center">
                    <motion.div
                      animate={{ y: [-5, -25], opacity: [0.7, 0] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeOut' }}
                      className="h-10 w-1 rounded-full bg-gradient-to-t from-cyan-300/40 via-stone-400/20 to-transparent blur-[1px]"
                    />
                  </div>

                  {/* Incense Burner Lid: XuanWu Filigree Finial */}
                  <div className="relative z-20 flex h-24 w-32 flex-col items-center justify-center rounded-t-full border-2 border-amber-400/80 bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-2 shadow-xl shadow-amber-500/20">
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-serif text-stone-900">🐢🐍</span>
                      <span className="text-[10px] font-bold tracking-wider text-stone-950 font-serif">HUYỀN VŨ</span>
                      <span className="text-[8px] font-mono text-stone-900">VÀNG 24K FILIGREE</span>
                    </div>
                  </div>

                  {/* Burner Body: Thick Copper Core wrapped in Gold Filigree */}
                  <div className="relative z-10 -mt-2 flex h-36 w-48 flex-col items-center justify-between rounded-2xl border-4 border-amber-500/90 bg-gradient-to-b from-stone-950 via-slate-950 to-stone-950 p-3 shadow-2xl">
                    <div className="flex w-full items-center justify-between px-2 text-[10px] text-cyan-300/90 font-serif">
                      <span>BẮC PHƯƠNG</span>
                      <span className="font-mono text-xs text-amber-400 font-bold">{selectedTemp}°C</span>
                      <span>NHÂM QUÝ</span>
                    </div>

                    {/* Inner Copper Chamber Heat Core */}
                    <div className="flex h-14 w-36 items-center justify-center rounded-xl border border-cyan-400/40 bg-stone-950/80 p-2 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-amber-200 font-serif">Ruột Đồng Đỏ 10mm</span>
                        <span className="text-[9px] text-cyan-300 font-mono">Hắc Kỳ Vạn Ninh 99.2%</span>
                      </div>
                    </div>

                    <div className="flex w-full items-center justify-between px-2 text-[9px] text-stone-400">
                      <span>Ủ Nhiệt Vi Sai</span>
                      <span className="text-cyan-300">Không Khói Độc</span>
                    </div>
                  </div>

                  {/* Pedestal: Ancient Ebony Wood with Jade Inlay */}
                  <div className="relative z-0 -mt-1 h-8 w-56 rounded-md border-2 border-amber-600/70 bg-gradient-to-r from-stone-900 via-cyan-950/40 to-stone-900 shadow-lg flex items-center justify-center">
                    <span className="text-[10px] font-serif text-amber-300/80">Án Mun Sừng Khảm Phỉ Thúy Type A</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 360 Rotation Control */}
            <div className="flex w-full items-center justify-between border-t border-stone-800/80 pt-4">
              <div className="text-xs text-stone-400">
                Góc xoay: <span className="font-mono text-amber-300">{activeRotation.toFixed(0)}°</span>
              </div>
              <button
                type="button"
                onClick={() => setIsRotating(!isRotating)}
                className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-colors"
              >
                {isRotating ? 'Dừng Xoay Đỉnh Lư' : 'Xoay Đỉnh Lư 360°'}
              </button>
            </div>
          </div>

          {/* Scent Selector & Dossier: 5 cols */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* Heat & Scent Profile Matrix */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h3 className="font-serif text-lg font-normal text-amber-100">
                Điều Nhiệt Vi Sai Hắc Kỳ Vạn Ninh
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                Lựa chọn mức nhiệt chuẩn xác để giải phóng từng tầng hương thơm quý hiếm:
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {SCENT_PROFILES.map((scent) => (
                  <button
                    key={scent.temp}
                    type="button"
                    onClick={() => setSelectedTemp(scent.temp)}
                    className={cn(
                      'rounded-xl border p-3 text-left transition-all duration-200',
                      selectedTemp === scent.temp
                        ? 'border-amber-500/80 bg-amber-950/50 shadow-md'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="font-mono text-xs font-bold text-amber-300">{scent.temp}°C</div>
                    <div className="mt-1 line-clamp-1 text-xs font-medium text-stone-200">{scent.profile}</div>
                    <div className="mt-1 text-[10px] text-stone-500 font-mono">{scent.activeDuration}</div>
                  </button>
                ))}
              </div>

              {/* Active Profile Details */}
              <div className="mt-4 rounded-xl border border-cyan-900/40 bg-stone-950/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider">
                    {activeScent.profile}
                  </span>
                  <span className="font-mono text-xs text-emerald-400">{activeScent.solfeggioFreq}Hz</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-stone-300">
                  {activeScent.subnotes}
                </p>
              </div>
            </div>

            {/* Provenance & GuHomes Standard */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h4 className="font-serif text-base font-normal text-amber-200">
                Chứng Thư Bảo Thất Cung Đình GuHomes
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">❖</span>
                  <span><strong>Kim hoàn hoàng gia:</strong> Hơn 300 giờ kéo sợi và đan chỉ vàng 24K Filigree hình Huyền Vũ trấn trạch.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400">❖</span>
                  <span><strong>Hắc Kỳ Vạn Ninh:</strong> Đạt độ thuần khiết tinh dầu 99.2%, thu hoạch tự nhiên từ mỏ trầm cổ Khánh Hòa.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">❖</span>
                  <span><strong>May đo độc bản:</strong> Xưởng may đo Thạnh Xuân 1.200m², phục vụ giới hạn 12 gia chủ tinh hoa mỗi năm.</span>
                </li>
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-stone-800 pt-4">
                <div>
                  <div className="text-[11px] text-stone-400">Tư vấn may đo bảo thất:</div>
                  <div className="font-mono text-sm font-semibold text-amber-300">Hotline KTS Trưởng: 0368 757 916</div>
                </div>
                <a
                  href="/contact"
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-colors"
                >
                  Liên Hệ KTS Trưởng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
