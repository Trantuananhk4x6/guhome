'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type LightingScenario = 'candlelight' | 'soloist' | 'soiree'

interface LightingInfo {
  id: LightingScenario
  name: string
  colorTemp: string
  description: string
  cri: string
  bgGlow: string
}

const LIGHTING_SCENARIOS: Record<LightingScenario, LightingInfo> = {
  candlelight: {
    id: 'candlelight',
    name: 'Ánh Nến Hổ Phách (2000K)',
    colorTemp: '2000K',
    description: 'Ánh sáng ấm áp như ánh lửa bập bùng, tôn vinh chiều sâu trầm đục mộc mạc của dây đàn Cello ruột cừu.',
    cri: 'CRI 97',
    bgGlow: 'from-amber-700/25 via-stone-900 to-black',
  },
  soloist: {
    id: 'soloist',
    name: 'Rọi Điểm Nghệ Sĩ Soloist (2700K)',
    colorTemp: '2700K',
    description: 'Chùm sáng hẹp 15° tập trung rọi lên bệ đá bazan và cây đàn cello, toàn bộ khán phòng chìm vào tĩnh mịch tập trung tối đa.',
    cri: 'CRI 99 (R9 &gt; 95)',
    bgGlow: 'from-amber-500/20 via-stone-900 to-black',
  },
  soiree: {
    id: 'soiree',
    name: 'Dạ Tiệc Thính Phòng (3000K)',
    colorTemp: '3000K',
    description: 'Chiếu sáng gián tiếp hắt vòm gỗ Thích QRD khuếch tán đều, phù hợp cho nhóm tam tấu và khách quý thưởng trà thưởng nhạc.',
    cri: 'CRI 98',
    bgGlow: 'from-yellow-600/20 via-stone-900 to-black',
  },
}

interface CelloMasterpiece {
  id: string
  title: string
  composer: string
  key: string
  description: string
  notes: number[] // Frequencies in Hz
}

const CELLO_PIECES: CelloMasterpiece[] = [
  {
    id: 'bach-suite-1',
    title: 'Cello Suite No. 1 in G Major (Prelude)',
    composer: 'Johann Sebastian Bach',
    key: 'Sol Trưởng (G Major)',
    description: 'Chuỗi rải arpeggio huyền thoại khám phá trọn vẹn 4 dây C-G-D-A của đàn cello trong vòm tán âm QRD.',
    notes: [98.0, 146.83, 196.0, 246.94, 196.0, 146.83, 98.0],
  },
  {
    id: 'the-swan',
    title: 'The Swan (Le Cygne)',
    composer: 'Camille Saint-Saëns',
    key: 'Sol Trưởng (G Major)',
    description: 'Giai điệu da diết lướt êm như thiên nga trôi trên mặt hồ tĩnh lặng, kiểm chứng dải trung ấm và độ ngân tự nhiên.',
    notes: [196.0, 246.94, 293.66, 329.63, 293.66, 246.94, 196.0],
  },
]

export function SaigonAcousticCelloListeningVault({ className }: { className?: string } = {}) {
  const [activeLighting, setActiveLighting] = useState<LightingScenario>('soloist')
  const [activePieceId, setActivePieceId] = useState<string>('bach-suite-1')
  const [isPlayingCello, setIsPlayingCello] = useState<boolean>(false)

  const headingId = useId()
  const currentLighting = LIGHTING_SCENARIOS[activeLighting]
  const currentPiece = CELLO_PIECES.find((p) => p.id === activePieceId) ?? CELLO_PIECES[0]!

  const playCelloNotes = (piece: CelloMasterpiece) => {
    if (typeof window === 'undefined') return
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      setIsPlayingCello(true)

      piece.notes.forEach((freq, index) => {
        const startTime = audioCtx.currentTime + index * 0.75
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()

        // Cello timbre: sawtooth wave filtered through low-pass to mimic bowed string resonance
        osc.type = 'sawtooth'
        osc.frequency.setValueAtTime(freq, startTime)

        const filter = audioCtx.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(freq * 3.2, startTime)
        filter.Q.setValueAtTime(4.0, startTime)

        // Bowing envelope: soft swell attack, sustained body, smooth warm release
        gain.gain.setValueAtTime(0.0001, startTime)
        gain.gain.exponentialRampToValueAtTime(0.06, startTime + 0.15)
        gain.gain.setValueAtTime(0.05, startTime + 0.6)
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.95)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(audioCtx.destination)

        osc.start(startTime)
        osc.stop(startTime + 1.0)
      })

      setTimeout(() => {
        setIsPlayingCello(false)
      }, piece.notes.length * 750 + 500)
    } catch {
      setIsPlayingCello(false)
    }
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Warm Cello Wood & Amber Lighting Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden transition-all duration-700">
        <div
          className={cn(
            'absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full blur-[170px] bg-gradient-to-br transition-all duration-700',
            currentLighting.bgGlow
          )}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.06),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            m Học Đàn Dây Thính Phòng &amp; Gỗ Thích Cremona
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Phòng Thính m Cello Vòm Gỗ Thích &amp; Tán m Fibonacci QRD
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Thiết kế riêng cho những thanh âm trầm sâu da diết của đàn Cello. 
            Vòm tán âm Quadratic Residue Diffuser (QRD) ghép mộng từ gỗ Thích châu Âu và gỗ Vân Sam Cremona chuẩn chế tác nhạc cụ, 
            kết hợp bệ đá bazan nguyên khối chống rung chấn và rèm len cừu Đà Lạt 650g/m² định chuẩn thời gian vang RT60 chính xác 0.38s.
          </p>
        </div>

        {/* Interactive Cello Chamber Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Cello Visualizer & Classical Audio Player */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Kịch Bản Chiếu Sáng &amp; m Sắc Đang Bật
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentLighting.name}
                    </h3>
                  </div>

                  {/* Acoustic Metric Badges */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">RT60: 0.38s</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">{currentLighting.colorTemp}</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">Bazan Khử Rung</span>
                  </div>
                </div>

                {/* Cello Silhouette & QRD Diffuser Canopy Visualizer */}
                <div className="relative mt-6 h-72 sm:h-80 w-full overflow-hidden rounded-xl border border-amber-900/50 bg-[#120f0d] p-5 flex flex-col justify-between shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]">
                  {/* Fibonacci QRD Canopy Wood Slat Silhouette Background */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 flex items-start justify-center gap-1 opacity-25">
                    {[12, 28, 45, 18, 55, 30, 48, 22, 60, 35, 50, 16, 42, 26, 52].map((h, i) => (
                      <div
                        key={i}
                        className="w-3 bg-amber-600 rounded-b"
                        style={{ height: `${h}px` }}
                      />
                    ))}
                  </div>

                  {/* Top status info */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      GỖ THÍCH CHÂU ÂU &amp; VÂN SAM CREMONA
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-emerald-300">
                      ĐỘ HOÀN MÀU: {currentLighting.cri}
                    </span>
                  </div>

                  {/* Center Cello Graphic & Soundwaves */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    {/* SVG Cello Body Contour */}
                    <svg className="h-32 w-28 drop-shadow-[0_0_25px_rgba(217,119,6,0.35)]" viewBox="0 0 120 160" fill="none">
                      {/* Cello Body */}
                      <path
                        d="M60,15 C45,15 35,30 35,50 C35,65 45,75 40,85 C30,95 20,115 20,135 C20,155 35,160 60,160 C85,160 100,155 100,135 C100,115 90,95 80,85 C75,75 85,65 85,50 C85,30 75,15 60,15 Z"
                        fill="#291a10"
                        stroke="#d97706"
                        strokeWidth="2"
                      />
                      {/* F-holes */}
                      <path d="M42,70 C40,85 45,95 42,110" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                      <path d="M78,70 C80,85 75,95 78,110" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                      {/* Fingerboard & 4 Strings */}
                      <rect x="56" y="5" width="8" height="90" fill="#1c1917" stroke="#78350f" strokeWidth="1" />
                      <line x1="57" y1="5" x2="57" y2="135" stroke="#fef3c7" strokeWidth="0.8" />
                      <line x1="59" y1="5" x2="59" y2="135" stroke="#fef3c7" strokeWidth="1.0" />
                      <line x1="61" y1="5" x2="61" y2="135" stroke="#fef3c7" strokeWidth="1.2" />
                      <line x1="63" y1="5" x2="63" y2="135" stroke="#fef3c7" strokeWidth="1.5" />
                      {/* Endpin resting on Basalt Platform */}
                      <line x1="60" y1="160" x2="60" y2="175" stroke="#a8a29e" strokeWidth="2" />
                    </svg>

                    {/* Animated Warm Cello Waves when playing */}
                    {isPlayingCello && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="h-4 w-1.5 bg-amber-500 animate-pulse delay-75" />
                        <span className="h-6 w-1.5 bg-amber-400 animate-pulse delay-150" />
                        <span className="h-9 w-1.5 bg-emerald-400 animate-pulse delay-300" />
                        <span className="h-7 w-1.5 bg-amber-300 animate-pulse delay-200" />
                        <span className="h-5 w-1.5 bg-amber-500 animate-pulse delay-100" />
                      </div>
                    )}
                  </div>

                  {/* Bottom metrics on visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Hiệu Quả m Cảnh:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5">
                        {currentLighting.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Rèm Len Cừu Đà Lạt:</div>
                      <div className="text-xs font-serif text-amber-300 font-medium">
                        Dày 650g/m² Dệt Tay
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lighting Scenario Buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {(Object.keys(LIGHTING_SCENARIOS) as LightingScenario[]).map((scenarioKey) => {
                    const scenario = LIGHTING_SCENARIOS[scenarioKey]
                    const isSelected = activeLighting === scenarioKey
                    return (
                      <button
                        key={scenarioKey}
                        type="button"
                        onClick={() => setActiveLighting(scenarioKey)}
                        className={cn(
                          'flex-1 min-w-[120px] rounded-lg border px-3 py-2 text-left transition-all',
                          isSelected
                            ? 'border-amber-400 bg-amber-950/60 text-amber-200 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-stone-200'
                        )}
                      >
                        <div className="font-mono text-xs text-amber-400 font-semibold">{scenario.colorTemp}</div>
                        <div className="font-serif text-xs truncate mt-0.5">{scenario.name.split('(')[0]}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Classical Cello Pieces Audio Demos */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/70 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Trích Đoạn Cello Mẫu (Web Audio API)
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">Âm Trầm Mộc Bản Cremona</span>
                </div>

                <div className="mt-3 space-y-2">
                  {CELLO_PIECES.map((piece) => {
                    const isSelected = piece.id === activePieceId
                    return (
                      <div
                        key={piece.id}
                        className={cn(
                          'flex items-center justify-between rounded-lg border p-2.5 transition-all',
                          isSelected
                            ? 'border-amber-500/70 bg-stone-900/80'
                            : 'border-stone-800/60 bg-stone-900/30'
                        )}
                      >
                        <div className="cursor-pointer" onClick={() => setActivePieceId(piece.id)}>
                          <div className="font-serif text-xs font-medium text-stone-200">
                            {piece.title} — <span className="text-amber-300/90 font-light">{piece.composer}</span>
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono">
                            {piece.key} • {piece.description}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActivePieceId(piece.id)
                            playCelloNotes(piece)
                          }}
                          disabled={isPlayingCello}
                          className={cn(
                            'shrink-0 ml-3 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all font-mono',
                            isPlayingCello && isSelected
                              ? 'border-amber-400 bg-amber-950 text-amber-200 animate-pulse'
                              : 'border-stone-700 bg-stone-800 text-stone-200 hover:border-amber-400 hover:text-amber-300'
                          )}
                        >
                          {isPlayingCello && isSelected ? '▶ Đang Kéo Đàn' : '▶ Nghe Thử'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Cello Resonance Spectrum & Acoustic Architecture */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Resonance Frequency Chart */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                      Phổ Tần Số Cộng Hưởng Thùng Đàn Cello
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">65Hz – 1000Hz</span>
                </div>

                {/* Frequency Bars */}
                <div className="mt-4 space-y-2">
                  {[
                    { note: 'Dây Đô C2 (65.4 Hz)', desc: 'Âm trầm sâu nhất', pct: 85, highlight: true },
                    { note: 'Dây Sol G2 (98.0 Hz)', desc: 'Hòa âm thùng đàn', pct: 90, highlight: true },
                    { note: 'Dây Rê D3 (146.8 Hz)', desc: 'Trung âm ấm áp', pct: 78 },
                    { note: 'Dây La A3 (220.0 Hz)', desc: 'Dải cao sáng rõ', pct: 82 },
                    { note: 'Hòa m A4 (440.0 Hz)', desc: 'Độ vang thính phòng', pct: 72 },
                    { note: 'Hòa m A5 (880.0 Hz)', desc: 'Hài âm lấp lánh', pct: 60 },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-mono">
                      <span className="w-36 text-stone-300 truncate">{bar.note}</span>
                      <div className="flex-1 bg-stone-800/80 rounded-full h-2 overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            bar.highlight ? 'bg-amber-400' : 'bg-emerald-500'
                          )}
                          style={{ width: `${bar.pct}%` }}
                        />
                      </div>
                      <span className="w-16 text-right text-stone-400 text-[10px]">
                        {bar.pct}% SPL
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-relaxed">
                  Vòm gỗ Thích QRD tán đều sóng âm dải 65Hz - 1000Hz, giúp tiếng đàn cello không bị cộng hưởng dội âm (standing wave) tại các góc phòng.
                </div>
              </div>

              {/* 3 Acoustic Engineering Solutions */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
                  3 Giải Pháp m Học Chuyên Biệt GuHomes
                </h4>
                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-amber-300 font-medium block">
                      1. Vòm Tán m Fibonacci QRD:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Các rãnh gỗ Thích sâu từ 25mm đến 120mm tính toán theo thuật toán dư bậc hai, khuếch tán âm thanh đồng đều 180°.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-emerald-300 font-medium block">
                      2. Bệ Đá Bazan Khử Rung Chân Đàn (Endpin):
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Chân kim loại của cello cắm trực tiếp lên phiến đá bazan 150kg, hấp thụ xung động cơ học và tái tạo âm bass sạch tinh khiết.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-cyan-300 font-medium block">
                      3. Rèm Len Cừu Đà Lạt 650g/m²:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Sợi len tự nhiên giữ được độ ẩm vi mô, hấp thụ tần số chói gắt mà không làm mất đi độ ấm của tiếng gỗ.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=acoustic-cello-vault"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-800 to-amber-600 px-5 py-3 text-xs sm:text-sm font-medium text-amber-100 hover:from-amber-700 hover:to-amber-500 transition-all shadow-lg shadow-amber-950/50"
                >
                  <span>Đặt Lịch Tư Vấn m Học Phòng Cello</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-amber-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Thiết kế bespoke theo từng dáng đàn và phong cách biểu diễn.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
