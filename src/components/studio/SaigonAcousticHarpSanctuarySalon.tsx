'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type HarpLighting = 'dawn' | 'gala' | 'moonlight'

interface LightingProfile {
  id: HarpLighting
  name: string
  colorTemp: string
  beamAngle: string
  ambience: string
  bgGradient: string
}

const HARP_LIGHTS: Record<HarpLighting, LightingProfile> = {
  dawn: {
    id: 'dawn',
    name: 'Bình Minh Mộc Mạc (2400K)',
    colorTemp: '2400K Ấm Áp',
    beamAngle: 'Rọi chùm mềm 35°',
    ambience: 'Ánh sáng sớm xuyên qua nan gỗ phong uốn lượn, tôn vinh thớ gỗ mộc mạc và sắc vàng quỳ 24K trên cột đàn.',
    bgGradient: 'from-amber-700/20 via-stone-900 to-black',
  },
  gala: {
    id: 'gala',
    name: 'Dạ Yến Hoàng Gia (3000K)',
    colorTemp: '3000K Quý Phái',
    beamAngle: 'Rọi điểm tập trung 15° UGR &lt; 10',
    ambience: 'Đàn hạc tỏa sáng lộng lẫy giữa khán phòng tối, phản chiếu ánh kim sa lấp lánh trong các dạ tiệc thượng lưu.',
    bgGradient: 'from-yellow-500/20 via-stone-900 to-black',
  },
  moonlight: {
    id: 'moonlight',
    name: 'Ánh Trăng Thiền Định (4000K)',
    colorTemp: '4000K Tĩnh Lặng',
    beamAngle: 'Hắt vách gián tiếp đường cong',
    ambience: 'Không gian tĩnh mịch tuyệt đối, mỗi nốt rải ngân vang tựa giọt nước rơi trên mặt hồ phẳng lặng.',
    bgGradient: 'from-cyan-900/20 via-stone-900 to-black',
  },
}

type PedalState = 'flat' | 'natural' | 'sharp'

interface HarpPedal {
  note: string
  state: PedalState
}

const INITIAL_PEDALS: HarpPedal[] = [
  { note: 'D', state: 'natural' },
  { note: 'C', state: 'natural' },
  { note: 'B', state: 'natural' },
  { note: 'E', state: 'natural' },
  { note: 'F', state: 'sharp' },
  { note: 'G', state: 'natural' },
  { note: 'A', state: 'natural' },
]

interface ArpeggioPiece {
  id: string
  title: string
  composer: string
  tonality: string
  frequencies: number[] // Hz chord
  description: string
}

const ARPEGGIO_PIECES: ArpeggioPiece[] = [
  {
    id: 'clair-de-lune',
    title: 'Clair de Lune (Khúc Nguyệt Quang)',
    composer: 'Claude Debussy',
    tonality: 'Rê Giáng Trưởng (D-flat Major)',
    frequencies: [277.18, 349.23, 415.3, 554.37, 698.46],
    description: 'Âm thanh rải huyền ảo gợi tả ánh trăng lung linh trên mặt nước sông Sài Gòn êm ả.',
  },
  {
    id: 'chaconne',
    title: 'Harp Chaconne in F Major',
    composer: 'George Frideric Handel',
    tonality: 'Fa Trưởng (F Major)',
    frequencies: [349.23, 440.0, 523.25, 698.46, 880.0],
    description: 'Âm hưởng vương giả Baroque, tôn vinh độ ngân vang 0.36s của hệ vách gỗ Phong uốn lượn.',
  },
  {
    id: 'zen-meditation',
    title: 'Dòng Sương Núi Thiền Ca (Zen Prelude)',
    composer: 'GuHomes Acoustic Atelier',
    tonality: 'Ngũ Cung Phương Đông (Pentatonic)',
    frequencies: [293.66, 329.63, 392.0, 440.0, 587.33],
    description: 'Thanh âm trong trẻo như tiếng suối ngọc, gột rửa mọi xao động tâm trí gia chủ.',
  },
]

export function SaigonAcousticHarpSanctuarySalon({ className }: { className?: string }) {
  const componentId = useId()
  const [activeLighting, setActiveLighting] = useState<HarpLighting>('gala')
  const [pedals, setPedals] = useState<HarpPedal[]>(INITIAL_PEDALS)
  const [activePieceId, setActivePieceId] = useState<string>('clair-de-lune')
  const [isPlayingArpeggio, setIsPlayingArpeggio] = useState<boolean>(false)

  const light = HARP_LIGHTS[activeLighting]
  const currentPiece = ARPEGGIO_PIECES.find((p) => p.id === activePieceId) ?? ARPEGGIO_PIECES[0]!

  const togglePedal = (index: number) => {
    setPedals((prev) => {
      const copy = [...prev]
      const current = copy[index]
      if (!current) return prev
      const states: PedalState[] = ['flat', 'natural', 'sharp']
      const nextStateIndex = (states.indexOf(current.state) + 1) % states.length
      copy[index] = { ...current, state: states[nextStateIndex] ?? 'natural' }
      return copy
    })
  }

  const playArpeggioChord = () => {
    setIsPlayingArpeggio(true)

    // Web Audio safely playing celestial harp pluck sequence
    try {
      if (typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          currentPiece.frequencies.forEach((freq, idx) => {
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'triangle'
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12)

            gain.gain.setValueAtTime(0, ctx.currentTime)
            gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.12)
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 1.8)

            osc.connect(gain)
            gain.connect(ctx.destination)

            osc.start(ctx.currentTime + idx * 0.12)
            osc.stop(ctx.currentTime + idx * 0.12 + 1.8)
          })
        }
      }
    } catch {
      // Audio autoplay policy fallback
    }

    setTimeout(() => {
      setIsPlayingArpeggio(false)
    }, 1500)
  }

  return (
    <section
      id={`harp-sanctuary-salon-${componentId}`}
      aria-label="Phòng thính âm đàn hạc vòm gỗ uốn GuHomes"
      className={cn(
        'relative w-full overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200',
        className
      )}
    >
      {/* Background Lighting Aura */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-b transition-all duration-1000 opacity-30',
          light.bgGradient
        )}
      />

      <div className="relative mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-6 border-b border-stone-800/80 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              02 / PHÒNG THÍNH ÂM ACOUSTIC SALON ĐỈNH CAO
            </div>
            <h2 className="mt-5 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl leading-tight">
              Phòng Thính Âm Đàn Hạc Vòm Gỗ Phong Uốn Lượn &amp; Thếp Vàng 24K
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-stone-400 lg:text-lg">
              Không gian âm nhạc vinh danh cây đàn hạc Concert Grand Harp Lyon &amp; Healy thếp vàng lá 24K thủ công.
              Vách tán âm Fibonacci uốn cong hữu cơ từ gỗ Phong lá đỏ và sồi trắng Bắc Mỹ, loại bỏ hoàn toàn đinh vít kim
              loại cộng hưởng. Thời gian vang RT60 chuẩn mực 0.36s nâng đỡ từng nốt rải Arpeggio lấp lánh như giọt sương mai.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm lg:min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>TIÊU CHUẨN ÂM HỌC THÍNH PHÒNG</span>
              <span className="text-amber-400 font-bold">RT60 = 0.36s</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">VÁCH TÁN ÂM</span>
                <span className="font-mono text-xs font-medium text-amber-300">Gỗ Phong Bắc Mỹ</span>
              </div>
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">CỘNG HƯỞNG KIM LOẠI</span>
                <span className="font-mono text-xs font-medium text-emerald-300">0% TRIỆT TIÊU</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 italic">
              * Khớp mộng gỗ thủ công không dùng đinh sắt chống phản xạ âm chói gắt.
            </div>
          </div>
        </div>

        {/* Section 1: Hợp Âm Đàn Hạc & 7 Bàn Đạp Chuyển Bán Âm (Pedal Box) */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Interactive Harp Visualizer & Arpeggio Player (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                    DƯ ÂM THIÊN THẦN (ARPEGGIO RESONANCE)
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-light text-stone-100">
                    Nghe Thử Chuỗi Rải Hợp Âm Đàn Hạc
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={playArpeggioChord}
                  disabled={isPlayingArpeggio}
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-mono text-amber-300 hover:bg-amber-500/20 transition-all min-h-[44px]"
                >
                  {isPlayingArpeggio ? 'ĐANG RẢI DÂY...' : 'GẢY HỢP ÂM &sim;'}
                </button>
              </div>

              {/* Arpeggio Pieces Selectors */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {ARPEGGIO_PIECES.map((piece) => {
                  const isSelected = piece.id === activePieceId
                  return (
                    <button
                      key={piece.id}
                      type="button"
                      onClick={() => setActivePieceId(piece.id)}
                      className={cn(
                        'flex flex-col justify-between rounded-xl p-4 text-left transition-all duration-300 border min-h-[120px]',
                        isSelected
                          ? 'border-amber-400 bg-amber-950/30 ring-1 ring-amber-400/40 shadow-lg'
                          : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                      )}
                    >
                      <div>
                        <h4 className="font-serif text-sm font-medium text-stone-200 line-clamp-1">
                          {piece.title}
                        </h4>
                        <span className="text-[11px] text-stone-400 mt-1 block">{piece.composer}</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-300 mt-3">{piece.tonality}</span>
                    </button>
                  )
                })}
              </div>

              {/* Graphic Concert Harp Silhouette with 47 Strings */}
              <div className="relative my-8 flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950">
                {/* Acoustic Wood Curvature in Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px] opacity-15" />

                {/* Concert Grand Harp Silhouette */}
                <div className="relative z-10 flex items-center justify-center">
                  {/* Gold Gilded Pillar */}
                  <div className="h-52 w-3 rounded-full bg-gradient-to-b from-amber-300 via-amber-500 to-yellow-600 shadow-xl border border-amber-200/50" />

                  {/* Soundboard Cone */}
                  <div className="ml-8 h-48 w-16 bg-gradient-to-t from-amber-900 to-stone-800 rounded-b-3xl border-t border-amber-600/50 shadow-2xl rotate-12 flex items-center justify-center">
                    <span className="text-[7px] font-mono text-amber-300 rotate-90">LYON &amp; HEALY 24K</span>
                  </div>

                  {/* Harp Strings Graphic array */}
                  <div className="absolute left-6 h-40 w-32 flex justify-between pointer-events-none opacity-60">
                    {[...Array(12)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'w-px h-full',
                          i % 4 === 0
                            ? 'bg-rose-400' // C string (Red)
                            : i % 4 === 2
                            ? 'bg-cyan-400' // F string (Blue/Black)
                            : 'bg-amber-100'
                        )}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-3 right-4 text-[11px] font-mono text-stone-400">
                  47 DÂY RUỘT CỪU TỰ NHIÊN &middot; 7 OCTAVE
                </div>
              </div>

              {/* 7 Pedals Controller (D, C, B, E, F, G, A) */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                    7 BÀN ĐẠP PEDAL CHUYỂN BÁN ÂM CƠ HỌC:
                  </span>
                  <span className="text-[11px] font-mono text-stone-500">NHẤN ĐỂ CHUYỂN ĐIỆU</span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {pedals.map((pedal, idx) => (
                    <button
                      key={pedal.note}
                      type="button"
                      onClick={() => togglePedal(idx)}
                      className="flex flex-col items-center justify-center rounded-lg border border-stone-800 bg-stone-900/90 py-2.5 transition-all hover:border-amber-500 min-h-[50px]"
                    >
                      <span className="font-serif font-bold text-sm text-stone-200">{pedal.note}</span>
                      <span
                        className={cn(
                          'text-[10px] font-mono mt-1',
                          pedal.state === 'sharp'
                            ? 'text-rose-400 font-bold'
                            : pedal.state === 'flat'
                            ? 'text-cyan-400 font-bold'
                            : 'text-stone-400'
                        )}
                      >
                        {pedal.state === 'sharp' ? '#' : pedal.state === 'flat' ? 'b' : '♮'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Lighting Scenarios & Acoustic Wall Engineering (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/80 p-8 lg:col-span-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                  KỊCH BẢN CHIẾU SÁNG &amp; VÁCH ÂM
                </span>
                <span className="text-xs font-mono text-stone-500">UGR &lt; 10</span>
              </div>

              <h4 className="mt-4 font-serif text-xl font-light text-stone-100">
                Ba Kịch Bản Ánh Sáng Rọi Đàn Hạc
              </h4>
              <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                Chiếu sáng rọi điểm chống lóa bảo vệ thị giác nghệ sĩ, tôn vinh ánh vàng lá rực rỡ và những đường vân
                uốn lượn của hệ vách gỗ thính phòng.
              </p>

              {/* Lighting Toggles */}
              <div className="mt-5 space-y-3">
                {(Object.keys(HARP_LIGHTS) as HarpLighting[]).map((lKey) => {
                  const hl = HARP_LIGHTS[lKey]
                  const isSelected = activeLighting === lKey
                  return (
                    <button
                      key={hl.id}
                      type="button"
                      onClick={() => setActiveLighting(lKey)}
                      className={cn(
                        'w-full flex flex-col rounded-xl p-3.5 text-left transition-all border text-xs min-h-[64px]',
                        isSelected
                          ? 'border-amber-400 bg-amber-950/30 ring-1 ring-amber-400/40 shadow-md'
                          : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <strong className="text-stone-200 font-serif text-sm">{hl.name}</strong>
                        <span className="font-mono text-amber-300 text-[11px]">{hl.colorTemp}</span>
                      </div>
                      <span className="text-[11px] text-stone-400 mt-1">{hl.ambience}</span>
                    </button>
                  )
                })}
              </div>

              {/* Acoustic Wall Curve Specifications */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/90 p-4 space-y-2 text-xs">
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                  KẾT CẤU VÁCH TÁN ÂM FIBONACCI
                </span>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Thời Gian Dư Ba RT60:</span>
                  <span className="font-mono text-amber-300 font-bold">0.36 Giây (Hoàn hảo cho đàn Hạc)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Vật Liệu Vách Tán:</span>
                  <span className="font-mono text-stone-200">Gỗ Phong lá đỏ &amp; Sồi trắng Bắc Mỹ</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-400">Sàn Nổi Cách Ly:</span>
                  <span className="font-mono text-stone-200">Đệm cao su Sylomer giảm chấn chân đàn</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-800 pt-4 text-xs font-mono text-stone-500 flex items-center justify-between">
              <span>ĐỘ BỀN VÁCH ÂM GỖ TRÊN 50 NĂM</span>
              <span className="text-amber-400 font-medium">BẢO HÀNH ÂM HỌC TRỌN ĐỜI</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 lg:p-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h4 className="font-serif text-xl font-light text-stone-100">
              Thiết kế phòng hòa nhạc thính phòng tư gia cùng KTS Trưởng GuHomes
            </h4>
            <p className="mt-1 text-xs text-stone-400 font-light">
              Mô phỏng đồ thị âm thanh 3D EASE và bóc tách dự toán xử lý tiêu tán âm chi tiết từng centimet vuông.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-5 py-2.5 text-xs font-medium text-stone-950 transition-colors hover:bg-stone-200 min-h-[44px]"
            >
              <span>Tư vấn phòng thính âm</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-5 py-2.5 text-xs font-medium text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100 min-h-[44px]"
            >
              <span>Xem dự toán phòng nhạc</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
