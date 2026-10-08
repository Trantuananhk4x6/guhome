'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type PianoLidMode = 'closed' | 'half' | 'full'

interface PianoLidInfo {
  id: PianoLidMode
  angle: string
  name: string
  soundProfile: string
  splLevel: string
  diffusionPattern: string
  recommendedGenre: string
}

const PIANO_LID_MODES: Record<PianoLidMode, PianoLidInfo> = {
  closed: {
    id: 'closed',
    angle: '15° Nắp Khép',
    name: 'Mellow Salon (Âm Sắc Trầm Ấm)',
    soundProfile: 'Âm thanh thu hẹp dịu êm, tập trung vào dải trung và trầm, hoàn hảo cho những buổi tối trò chuyện trà đàm thân mật.',
    splLevel: '68 – 74 dBA',
    diffusionPattern: 'Khuếch tán sàn nổi và vách gỗ vi đục lỗ',
    recommendedGenre: 'Nhạc tiền chiến, Jazz ballad, độc tấu thiền định',
  },
  half: {
    id: 'half',
    angle: '45° Bán Mở',
    name: 'Chamber Recital (Âm Học Thính Phòng)',
    soundProfile: 'Cân bằng hoàn hảo giữa độ vang sáng của dây đàn và sự cộng hưởng sâu lắng của thùng đàn gỗ Mun sọc.',
    splLevel: '76 – 84 dBA',
    diffusionPattern: 'Tán âm Fermat 3D phản xạ đa hướng',
    recommendedGenre: 'Chopin Nocturnes, Debussy, nhạc thính phòng tam tấu',
  },
  full: {
    id: 'full',
    angle: '70° Mở Toàn Phần',
    name: 'Concert Grand 100% (Đại Hòa Nhạc)',
    soundProfile: 'Toàn bộ sóng âm năng lượng cực đại phóng thích không gian, âm bass rung chuyển sàn nổi, âm treble lấp lánh như pha lê.',
    splLevel: '86 – 94 dBA',
    diffusionPattern: 'Hấp thụ chọn lọc rèm nhung lụa Ý 550g/m²',
    recommendedGenre: 'Rachmaninoff, Beethoven Sonatas, Opera tư gia',
  },
}

interface PieceDemo {
  id: string
  title: string
  composer: string
  tempo: string
  description: string
  notes: number[] // Frequencies in Hz
}

const CLASSICAL_PIECES: PieceDemo[] = [
  {
    id: 'clair-de-lune',
    title: 'Clair de Lune (Ánh Trăng)',
    composer: 'Claude Debussy',
    tempo: 'Andante très expressif',
    description: 'Những nốt nhạc rơi nhẹ như giọt sương đêm, kiểm chứng độ tĩnh lặng tuyệt đối nền phòng &lt; 20 dBA.',
    notes: [329.63, 440.0, 523.25, 659.25, 523.25, 440.0],
  },
  {
    id: 'nocturne-op9',
    title: 'Nocturne Op.9 No.2',
    composer: 'Frédéric Chopin',
    tempo: 'Andante con dolcezza',
    description: 'Giai điệu lãng mạn kiêu sa, phô diễn dải động rộng và độ nhạy cảm của phím đàn gỗ mun sọc.',
    notes: [392.0, 440.0, 493.88, 587.33, 493.88, 392.0],
  },
  {
    id: 'gymnopedie-1',
    title: 'Gymnopédie No.1',
    composer: 'Erik Satie',
    tempo: 'Lent et douloureux',
    description: 'Âm hưởng tối giản thanh khiết, thời gian vang RT60 0.42s giữ âm đuôi tròn trịa không nhòe tiếng.',
    notes: [293.66, 369.99, 440.0, 369.99, 293.66, 220.0],
  },
]

export function SaigonAcousticPianoGrandSalon({ className }: { className?: string } = {}) {
  const [activeLid, setActiveLid] = useState<PianoLidMode>('half')
  const [activePieceId, setActivePieceId] = useState<string>('clair-de-lune')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const headingId = useId()
  const currentLid = PIANO_LID_MODES[activeLid]
  const currentPiece = CLASSICAL_PIECES.find((p) => p.id === activePieceId) ?? CLASSICAL_PIECES[0]!

  const playDemoNotes = (piece: PieceDemo) => {
    if (typeof window === 'undefined') return
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      setIsPlaying(true)

      piece.notes.forEach((freq, index) => {
        const startTime = audioCtx.currentTime + index * 0.6
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()

        // Piano timbre synthesis: fundamental sine + 2nd harmonic
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, startTime)

        // Piano envelope: sharp percussive attack, natural exponential decay
        const lidFactor = activeLid === 'closed' ? 0.04 : activeLid === 'half' ? 0.08 : 0.12
        gain.gain.setValueAtTime(0.0001, startTime)
        gain.gain.exponentialRampToValueAtTime(lidFactor, startTime + 0.02)
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 1.2)

        osc.connect(gain)
        gain.connect(audioCtx.destination)

        osc.start(startTime)
        osc.stop(startTime + 1.25)
      })

      setTimeout(() => {
        setIsPlaying(false)
      }, piece.notes.length * 600 + 400)
    } catch {
      setIsPlaying(false)
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
      {/* Background Concert Hall Dark Velvet & Mun Wood Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-[450px] w-[450px] rounded-full bg-amber-950/20 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-stone-900/30 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Âm Học Thính Phòng Tư Gia &amp; Steinway Vỏ Mun Sọc
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Phòng Đại Dương Cầm Gỗ Mun &amp; Vách Tán Âm Fermat 3D
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Không gian hòa nhạc tư gia kiến tạo theo tiêu chuẩn thính phòng quốc tế với thời gian vang RT60 chuẩn xác 0.42s. 
            Cây đại dương cầm Steinway &amp; Sons Spirio | r Model D bespoke vỏ gỗ Mun sọc Khánh Hòa khảm xà cừ, 
            tọa lạc giữa vách tiêu âm tán âm Fermat 3D gỗ gõ đỏ và hệ sàn nổi cách chấn triệt tiêu hoàn toàn rung chấn.
          </p>
        </div>

        {/* Interactive Piano Salon Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Grand Piano Visualizer & Web Audio Demo Player */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Trạng Thái Nắp Đàn &amp; Môi Trường Âm Học
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentLid.name}
                    </h3>
                  </div>

                  {/* Acoustic Metric Badges */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">RT60: 0.42s</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">{currentLid.splLevel}</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">Gỗ Mun Sọc</span>
                  </div>
                </div>

                {/* Grand Piano 3D Contour & Acoustic Soundwave Visualizer */}
                <div className="relative mt-6 h-72 sm:h-80 w-full overflow-hidden rounded-xl border border-amber-900/50 bg-[#120f0d] p-5 flex flex-col justify-between shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
                  {/* Subtle Mun Wood Stripe Grain Background */}
                  <div className="pointer-events-none absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,#000_0px,#000_6px,#d97706_7px,#000_12px)]" />

                  {/* Top status info */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      STEINWAY &amp; SONS SPIRIO | R MODEL D • GỖ MUN SỌC
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-emerald-300">
                      NẮP ĐÀN: {currentLid.angle}
                    </span>
                  </div>

                  {/* Piano Silhouette & Soundwaves Center */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    {/* SVG Grand Piano Stylized Contour */}
                    <svg className="h-28 w-44 drop-shadow-[0_0_20px_rgba(217,119,6,0.35)]" viewBox="0 0 200 120" fill="none">
                      {/* Piano rim */}
                      <path
                        d="M20,90 C20,40 50,20 100,20 C140,20 180,45 180,85 C180,95 170,100 150,100 L20,100 Z"
                        fill="#1c1917"
                        stroke="#d97706"
                        strokeWidth="2"
                      />
                      {/* Piano Lid representation at angle */}
                      <line
                        x1="20"
                        y1="90"
                        x2={activeLid === 'closed' ? '175' : activeLid === 'half' ? '155' : '135'}
                        y2={activeLid === 'closed' ? '88' : activeLid === 'half' ? '50' : '15'}
                        stroke="#f59e0b"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      {/* Lid Prop Stick */}
                      {activeLid !== 'closed' && (
                        <line
                          x1="120"
                          y1="75"
                          x2={activeLid === 'half' ? '135' : '125'}
                          y2={activeLid === 'half' ? '55' : '20'}
                          stroke="#78350f"
                          strokeWidth="2"
                        />
                      )}
                      {/* Piano Keyboard strip */}
                      <rect x="25" y="93" width="70" height="6" fill="#fef3c7" stroke="#78350f" strokeWidth="1" />
                    </svg>

                    {/* Animated Soundwave Ripples when playing */}
                    {isPlaying && (
                      <div className="mt-2 flex items-center gap-1">
                        <span className="h-3 w-1 bg-amber-400 animate-pulse delay-75" />
                        <span className="h-5 w-1 bg-amber-300 animate-pulse delay-150" />
                        <span className="h-7 w-1 bg-emerald-400 animate-pulse delay-300" />
                        <span className="h-4 w-1 bg-cyan-400 animate-pulse delay-200" />
                        <span className="h-6 w-1 bg-amber-400 animate-pulse delay-100" />
                        <span className="h-2 w-1 bg-amber-500 animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Bottom metrics on visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Đặc Tính m Học:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5">
                        {currentLid.soundProfile}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Thể Loại Đề Xuất:</div>
                      <div className="text-xs font-serif text-amber-300 font-medium">
                        {currentLid.recommendedGenre}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Piano Lid Selector Buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {(Object.keys(PIANO_LID_MODES) as PianoLidMode[]).map((lidKey) => {
                    const mode = PIANO_LID_MODES[lidKey]
                    const isSelected = activeLid === lidKey
                    return (
                      <button
                        key={lidKey}
                        type="button"
                        onClick={() => setActiveLid(lidKey)}
                        className={cn(
                          'flex-1 min-w-[120px] rounded-lg border px-3 py-2 text-left transition-all',
                          isSelected
                            ? 'border-amber-400 bg-amber-950/60 text-amber-200 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-stone-200'
                        )}
                      >
                        <div className="font-mono text-xs text-amber-400 font-semibold">{mode.angle}</div>
                        <div className="font-serif text-xs truncate mt-0.5">{mode.name.split('(')[0]}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Classical Piece Demos Player */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/70 p-4">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                    Trích Đoạn Thính Phòng Mẫu (Web Audio API)
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">Âm Sắc Steinway Model D</span>
                </div>

                <div className="mt-3 space-y-2">
                  {CLASSICAL_PIECES.map((piece) => {
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
                            {piece.tempo} • {piece.description}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setActivePieceId(piece.id)
                            playDemoNotes(piece)
                          }}
                          disabled={isPlaying}
                          className={cn(
                            'shrink-0 ml-3 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all font-mono',
                            isPlaying && isSelected
                              ? 'border-amber-400 bg-amber-950 text-amber-200 animate-pulse'
                              : 'border-stone-700 bg-stone-800 text-stone-200 hover:border-amber-400 hover:text-amber-300'
                          )}
                        >
                          {isPlaying && isSelected ? '▶ Đang Tấu' : '▶ Nghe Thử'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 cols: RT60 Acoustic Analysis & Architectural Specs */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* RT60 Reverberation Chart */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                      Biểu Đồ Thời Gian Vang RT60 Thính Phòng
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">Tiêu Chuẩn ISO 3382</span>
                </div>

                {/* RT60 Bar Graph */}
                <div className="mt-4 space-y-2">
                  {[
                    { freq: '125 Hz', time: '0.45s', pct: 45 },
                    { freq: '250 Hz', time: '0.43s', pct: 43 },
                    { freq: '500 Hz', time: '0.42s (Vàng)', pct: 42, highlight: true },
                    { freq: '1 kHz', time: '0.41s', pct: 41 },
                    { freq: '2 kHz', time: '0.42s', pct: 42 },
                    { freq: '4 kHz', time: '0.40s', pct: 40 },
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs font-mono">
                      <span className="w-16 text-stone-400">{bar.freq}</span>
                      <div className="flex-1 bg-stone-800/80 rounded-full h-2 overflow-hidden">
                        <div
                          className={cn(
                            'h-full rounded-full transition-all duration-500',
                            bar.highlight ? 'bg-amber-400' : 'bg-emerald-500'
                          )}
                          style={{ width: `${bar.pct * 2}%` }}
                        />
                      </div>
                      <span className={cn('w-24 text-right', bar.highlight ? 'text-amber-300 font-bold' : 'text-stone-300')}>
                        {bar.time}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-relaxed">
                  Đường cong RT60 phẳng tắp trong dải 125Hz – 4kHz đảm bảo piano không bị rền ở dải trầm và không bị khô khốc ở dải cao.
                </div>
              </div>

              {/* Architectural Acoustic Layers */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
                  3 Lớp Kiến Trúc m Học Độc Bản GuHomes
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-3">
                    <span className="font-serif text-amber-300 font-medium block">
                      1. Vách Tán m Fermat 3D Gỗ Gõ Đỏ:
                    </span>
                    <p className="text-stone-400 mt-1 leading-relaxed">
                      Thiết kế thuật toán tán âm vi đục lỗ 0.5mm triệt tiêu tiếng vang chói gắt (flutter echo), giữ âm thanh trong vắt.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-3">
                    <span className="font-serif text-emerald-300 font-medium block">
                      2. Hệ Sàn Nổi Cách Chấn Sylomer (Áo):
                    </span>
                    <p className="text-stone-400 mt-1 leading-relaxed">
                      Lớp đệm đàn hồi giảm chấn tách biệt kết cấu bê tông sàn, triệt tiêu tiếng gõ cơ học truyền xuống tầng dưới.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-3">
                    <span className="font-serif text-cyan-300 font-medium block">
                      3. Rèm Nhung m Học Ý 550g/m² Somfy:
                    </span>
                    <p className="text-stone-400 mt-1 leading-relaxed">
                      Rèm lụa nhung nặng tự động kéo mở vi chỉnh thời gian vang RT60 từ 0.38s đến 0.45s tùy theo số lượng khán giả.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=acoustic-piano-grand-salon"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-800 to-amber-600 px-5 py-3 text-xs sm:text-sm font-medium text-amber-100 hover:from-amber-700 hover:to-amber-500 transition-all shadow-lg shadow-amber-950/50"
                >
                  <span>Đặt Lịch Tư Vấn m Học Đại Dương Cầm</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-amber-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Đo đạc hiện trạng âm học thực tế bằng thiết bị NTi Audio Thụy Sĩ.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
