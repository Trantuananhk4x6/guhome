'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface ChimeNote {
  id: string
  name: string
  note: string
  freq: number
  element: string
  description: string
  tubeLength: string
}

const CHIME_NOTES: ChimeNote[] = [
  {
    id: 'ho',
    name: 'Hò',
    note: 'C4 (261.6 Hz)',
    freq: 261.63,
    element: 'Thổ · An Định',
    description: 'Âm vực trầm ấm nhất, tạo điểm tựa tĩnh tại cho toàn bộ không gian hiên nhà.',
    tubeLength: '480 mm',
  },
  {
    id: 'xu',
    name: 'Xự',
    note: 'D4 (293.7 Hz)',
    freq: 293.66,
    element: 'Kim · Tinh Khiết',
    description: 'Âm sắc trong vắt, dẫn truyền luồng sinh khí nhẹ nhàng xua tan căng thẳng.',
    tubeLength: '450 mm',
  },
  {
    id: 'xang',
    name: 'Xang',
    note: 'F4 (349.2 Hz)',
    freq: 349.23,
    element: 'Thủy · Thanh Lương',
    description: 'Quãng mở phóng khoáng, gợi nhớ tiếng gió sông len qua rặng dừa nước Nam Bộ.',
    tubeLength: '405 mm',
  },
  {
    id: 'xe',
    name: 'Xê',
    note: 'G4 (392.0 Hz)',
    freq: 392.0,
    element: 'Hỏa · Sinh Khí',
    description: 'Cao trào du dương, đánh thức giác quan vào khoảnh khắc bình minh trên ban công.',
    tubeLength: '365 mm',
  },
  {
    id: 'cong',
    name: 'Cống',
    note: 'A4 (440.0 Hz)',
    freq: 440.0,
    element: 'Mộc · Tái Tạo',
    description: 'Nốt cao ngân vang thanh thoát, kết thúc chu kỳ ngũ âm như làn sương tan.',
    tubeLength: '325 mm',
  },
]

export function SaigonBreezeWindChimeArtisanAtelier({ className }: { className?: string } = {}) {
  const [activeNote, setActiveNote] = useState<string | null>(null)
  const [isPlayingCascade, setIsPlayingCascade] = useState<boolean>(false)
  const [activeSeason, setActiveSeason] = useState<'rainy' | 'dry'>('rainy')
  const [patinaMode, setPatinaMode] = useState<'aged-patina' | 'raw-bronze'>('aged-patina')

  // Synthesize rich bronze bell tone with physical harmonics
  const playBronzeBellTone = (freq: number, noteId: string) => {
    setActiveNote(noteId)
    setTimeout(() => setActiveNote((prev) => (prev === noteId ? null : prev)), 2200)

    try {
      if (typeof window === 'undefined') return
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      const now = ctx.currentTime

      // Fundamental and strike bell partials (inharmonic bell spectrum)
      const partials = [
        { mult: 1.0, gain: 0.22, decay: 2.8 },
        { mult: 2.02, gain: 0.12, decay: 2.2 },
        { mult: 3.01, gain: 0.08, decay: 1.6 },
        { mult: 4.25, gain: 0.04, decay: 1.1 },
        { mult: 5.43, gain: 0.02, decay: 0.7 },
      ]

      partials.forEach(({ mult, gain: pGain, decay }) => {
        const osc = ctx.createOscillator()
        const gainNode = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq * mult, now)

        gainNode.gain.setValueAtTime(0.001, now)
        gainNode.gain.exponentialRampToValueAtTime(pGain, now + 0.015)
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay)

        osc.connect(gainNode)
        gainNode.connect(ctx.destination)

        osc.start(now)
        osc.stop(now + decay)
      })
    } catch {
      // Audio fallback for non-audio environments
    }
  }

  // Play natural breeze cascade across all 5 bells
  const triggerBreezeCascade = () => {
    if (isPlayingCascade) return
    setIsPlayingCascade(true)

    const sequence = [
      { id: 'ho', delay: 0 },
      { id: 'xang', delay: 350 },
      { id: 'xu', delay: 720 },
      { id: 'xe', delay: 1100 },
      { id: 'cong', delay: 1550 },
    ]

    sequence.forEach(({ id, delay }) => {
      setTimeout(() => {
        const item = CHIME_NOTES.find((n) => n.id === id)
        if (item) {
          playBronzeBellTone(item.freq, item.id)
        }
      }, delay)
    })

    setTimeout(() => {
      setIsPlayingCascade(false)
    }, 2800)
  }

  return (
    <section
      aria-label="Xưởng Đúc Chuông Gió Hợp Kim Đồng Cổ Ngũ Cung"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-amber-700/10 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-stone-700/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(180,120,60,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Nghệ Thuật Âm Sắc Vi Khí Hậu Sài Gòn
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Xưởng Đúc Chuông Gió Đồng Cổ Ngũ Cung
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Hợp kim đồng thiếc C90500 đúc thủ công theo tỷ lệ chuông đồng cổ Huế. Thang âm ngũ cung 
            (Hò – Xự – Xang – Xê – Cống) cùng lá đón gió gỗ Gõ Đỏ Nam Bộ, thanh tẩy tạp âm đô thị và đón luồng dưỡng khí ven sông.
          </p>
        </div>

        {/* Interactive Bell Chimes Stage */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-stone-800/80">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400/90 font-medium">
                Tương tác âm thanh ngũ âm
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                5 Cung Bậc Thanh Âm Thiền Định
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-stone-400 max-w-xl">
                Chạm vào từng ống chuông đồng hoặc lắng nghe chuỗi hòa âm tự nhiên khi ngọn gió sông Sài Gòn ùa về hiên nhà.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={triggerBreezeCascade}
                disabled={isPlayingCascade}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-5 py-3 text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50',
                  isPlayingCascade
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                    : 'bg-amber-600 hover:bg-amber-500 text-stone-950 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95'
                )}
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
                {isPlayingCascade ? 'Gió Sông Đang Thổi...' : 'Hòa Âm Gió Sông Sài Gòn'}
              </button>

              <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setPatinaMode('aged-patina')}
                  className={cn(
                    'rounded-lg px-3 py-1.5 transition-colors',
                    patinaMode === 'aged-patina'
                      ? 'bg-stone-800 text-amber-300 font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  )}
                >
                  Patina Rêu Phong
                </button>
                <button
                  type="button"
                  onClick={() => setPatinaMode('raw-bronze')}
                  className={cn(
                    'rounded-lg px-3 py-1.5 transition-colors',
                    patinaMode === 'raw-bronze'
                      ? 'bg-stone-800 text-amber-300 font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  )}
                >
                  Đồng Mộc C90500
                </button>
              </div>
            </div>
          </div>

          {/* 5 Wind Chime Tubes Visualizer */}
          <div className="mt-10 grid grid-cols-5 gap-2 sm:gap-4 lg:gap-6 pt-4 pb-2">
            {CHIME_NOTES.map((chime, index) => {
              const isActive = activeNote === chime.id
              // Relative tube heights
              const heightClass = [
                'h-56 sm:h-72',
                'h-52 sm:h-64',
                'h-44 sm:h-56',
                'h-36 sm:h-48',
                'h-32 sm:h-40',
              ][index]

              return (
                <button
                  key={chime.id}
                  type="button"
                  onClick={() => playBronzeBellTone(chime.freq, chime.id)}
                  className="group flex flex-col items-center focus:outline-none transition-transform"
                >
                  {/* Top Cord Suspension */}
                  <div className="h-6 w-0.5 bg-stone-700 group-hover:bg-amber-400/80 transition-colors" />

                  {/* Bronze Tube */}
                  <div
                    className={cn(
                      'relative w-7 sm:w-12 lg:w-14 rounded-full transition-all duration-300 flex flex-col justify-end p-2 shadow-lg border',
                      heightClass,
                      patinaMode === 'aged-patina'
                        ? 'bg-gradient-to-b from-stone-800 via-emerald-950/60 to-stone-900 border-emerald-900/40 text-emerald-200'
                        : 'bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 border-amber-600/40 text-amber-200',
                      isActive
                        ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-stone-950 scale-105 shadow-amber-500/20'
                        : 'group-hover:scale-[1.02]'
                    )}
                  >
                    {/* Metal sheen overlay */}
                    <div className="absolute inset-y-0 left-1 w-1 bg-white/10 rounded-full blur-[1px]" />
                    {/* Resonant vibration wave */}
                    {isActive && (
                      <span className="absolute -inset-1 rounded-full border border-amber-400/50 animate-ping pointer-events-none" />
                    )}

                    <div className="relative text-center">
                      <span className="block text-[10px] sm:text-xs font-mono font-semibold">
                        {chime.tubeLength}
                      </span>
                    </div>
                  </div>

                  {/* Note info below tube */}
                  <div className="mt-4 text-center">
                    <span
                      className={cn(
                        'inline-block font-serif text-sm sm:text-base font-medium transition-colors',
                        isActive ? 'text-amber-300' : 'text-stone-300 group-hover:text-amber-400'
                      )}
                    >
                      {chime.name}
                    </span>
                    <span className="block text-[10px] sm:text-xs text-stone-500 font-mono">
                      {chime.note.split(' ')[0]}
                    </span>
                    <span className="hidden sm:inline-block mt-1 text-[10px] text-amber-500/80 bg-stone-900 px-2 py-0.5 rounded-full border border-stone-800">
                      {chime.element.split(' · ')[0]}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Note Deep Detail */}
          <div className="mt-8 rounded-xl bg-stone-900/60 border border-stone-800 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 font-serif text-lg">
                {activeNote ? CHIME_NOTES.find((n) => n.id === activeNote)?.name : 'V'}
              </div>
              <div>
                <div className="text-xs text-stone-400">
                  {activeNote
                    ? `Thang âm đang ngân: ${CHIME_NOTES.find((n) => n.id === activeNote)?.name} (${CHIME_NOTES.find((n) => n.id === activeNote)?.element})`
                    : 'Gõ chuông để cảm nhận độ ngân tự nhiên > 12 giây của đồng thiếc C90500'}
                </div>
                <div className="text-xs sm:text-sm text-stone-200 mt-0.5">
                  {activeNote
                    ? CHIME_NOTES.find((n) => n.id === activeNote)?.description
                    : 'Con lắc va chạm bằng gỗ Gõ Đỏ sấy chân không, triệt tiêu tạp âm kim loại chát gắt.'}
                </div>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2 text-xs text-stone-400 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Độ ngân: 14.8 giây · Chuẩn ASTM B117
            </div>
          </div>
        </div>

        {/* Technical Craftsmanship & Monsoon Wind Orientation */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Card 1: Hướng Gió Theo Mùa Sài Gòn */}
          <div className="rounded-2xl border border-stone-800 bg-stone-950/50 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                  Vi Khí Hậu Sài Gòn
                </span>
                <div className="flex rounded-lg bg-stone-900 p-0.5 border border-stone-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveSeason('rainy')}
                    className={cn(
                      'px-3 py-1 rounded-md transition-colors',
                      activeSeason === 'rainy'
                        ? 'bg-amber-500/20 text-amber-300 font-medium'
                        : 'text-stone-400 hover:text-stone-200'
                    )}
                  >
                    Mùa Mưa (T5 - T11)
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveSeason('dry')}
                    className={cn(
                      'px-3 py-1 rounded-md transition-colors',
                      activeSeason === 'dry'
                        ? 'bg-amber-500/20 text-amber-300 font-medium'
                        : 'text-stone-400 hover:text-stone-200'
                    )}
                  >
                    Mùa Khô (T12 - T4)
                  </button>
                </div>
              </div>

              <h3 className="mt-4 font-serif text-xl sm:text-2xl text-stone-100">
                {activeSeason === 'rainy'
                  ? 'Gió Tây Nam Mang Hơi Nước Sông Về Hiên'
                  : 'Gió Đông Bắc Tinh Khôi Buổi Sớm'}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-stone-400 leading-relaxed">
                {activeSeason === 'rainy'
                  ? 'Vào mùa mưa, luồng gió Tây Nam từ Vịnh Thái Lan thổi qua bề mặt kênh rạch Sài Gòn mang nhiệt độ dịu mát. Treo chuông tại ban công hướng Tây Nam hoặc logia phòng khách giúp lá đón gió gõ đỏ rung nhẹ, phát ra âm hưởng trầm ấm thanh lọc ẩm khí.'
                  : 'Vào mùa khô, gió chướng Đông Bắc tràn về mang không khí khô ráo, nắng giòn. Chuông gió treo hướng Đông Bắc đón ánh nắng sớm 2700K và ngọn gió nhẹ, đánh thức ngôi nhà bằng nốt Cống và nốt Xê thanh tao.'}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-stone-900/80 border border-stone-800 p-3">
                  <span className="text-stone-500 block">Vị Trí Đề Xuất</span>
                  <span className="text-stone-200 font-medium mt-1 block">
                    {activeSeason === 'rainy' ? 'Hiên Tây Nam / Vườn Cảnh' : 'Logia Hướng Đông / Cửa Sổ Phòng Đọc'}
                  </span>
                </div>
                <div className="rounded-xl bg-stone-900/80 border border-stone-800 p-3">
                  <span className="text-stone-500 block">Tần Suất Ngân</span>
                  <span className="text-amber-300 font-medium mt-1 block">
                    {activeSeason === 'rainy' ? '3 - 5 hồi / phút' : '2 - 3 hồi / phút'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
              <span>Khảo sát vi khí hậu tại biệt thự</span>
              <span className="text-amber-400 font-medium">Bespoke GuHomes 2026</span>
            </div>
          </div>

          {/* Card 2: Luyện Kim Đồng Thiếc C90500 & Chống Ăn Mòn */}
          <div className="rounded-2xl border border-stone-800 bg-stone-950/50 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                Luyện Kim & Hoàn Thiện
              </span>
              <h3 className="mt-4 font-serif text-xl sm:text-2xl text-stone-100">
                Hợp Kim Đồng Thiếc C90500 Đúc Khuôn Cát
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-stone-400 leading-relaxed">
                Từng ống chuông được nấu chảy ở 1.150°C trong lò than nghệ nhân xưởng Thạnh Xuân Q.12. 
                Tỷ lệ 88% Đồng nguyên chất, 10% Thiếc cao độ và 2% Kẽm giúp cấu trúc phân tử đạt độ cộng hưởng hoàn hảo, không nứt vỡ trước biên độ nhiệt đô thị.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-stone-800/60">
                  <span className="text-stone-400">Khả năng kháng muối gió sông</span>
                  <span className="text-emerald-400 font-mono">ASTM B117 &gt; 1.500h</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-stone-800/60">
                  <span className="text-stone-400">Lá đón gió & quả lắc</span>
                  <span className="text-stone-200 font-mono">Gỗ Gõ Đỏ Pachyloba tẩm sáp ong</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-stone-800/60">
                  <span className="text-stone-400">Dây treo chịu lực ngầm</span>
                  <span className="text-stone-200 font-mono">Sợi Kevlar bọc dù chống tia UV</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-stone-400">Bảo chứng âm sắc trọn đời</span>
                  <span className="text-amber-300 font-mono">GuHomes Heritage Warranty</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
              >
                Đặt chế tác chuông đồng ngũ âm theo thế đất
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
