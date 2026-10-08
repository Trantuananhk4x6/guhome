'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type GuqinLighting = 'candle' | 'dusk' | 'dawn'

interface LightingStyle {
  id: GuqinLighting
  name: string
  colorTemp: string
  cri: string
  lux: string
  ambience: string
  gradient: string
}

const LIGHTING_STYLES: Record<GuqinLighting, LightingStyle> = {
  candle: {
    id: 'candle',
    name: 'Ánh Nến Mộc Thiền Định (2200K)',
    colorTemp: '2200K Vàng Đậm Ấm Áp',
    cri: 'CRI 99 / R9 > 96',
    lux: '45 Lux dịu mắt tuyệt đối',
    ambience: 'Chỉ một vầng sáng dịu nhẹ rọi điểm lên bàn đá bazan và phiến gỗ Ngô Đồng, bóng đêm bao bọc tâm trí.',
    gradient: 'from-amber-700/25 via-stone-900 to-black',
  },
  dusk: {
    id: 'dusk',
    name: 'Hoàng Hôn Rừng Trúc (2400K)',
    colorTemp: '2400K Hổ Phách Lắng Đọng',
    cri: 'CRI 98 / UGR < 8',
    lux: '90 Lux hắt vách củ nâu',
    ambience: 'Ánh ráng chiều lọt qua rèm trúc, làm bừng lên thớ gỗ Sa Mộc đáy đàn cùng lớp sơn ta đen tuyền.',
    gradient: 'from-orange-700/20 via-stone-900 to-black',
  },
  dawn: {
    id: 'dawn',
    name: 'Sương Sớm Suối Núi (3000K)',
    colorTemp: '3000K Thanh Khiết Tự Nhiên',
    cri: 'CRI 97 / Không nhấp nháy',
    lux: '150 Lux góc nghiêng 45°',
    ambience: 'Tái hiện luồng thanh khí sớm mai giữa khe suối, tiếng tơ tằm ngân dài trong không gian tĩnh mịch.',
    gradient: 'from-yellow-600/20 via-stone-900 to-black',
  },
}

interface GuqinString {
  number: number
  noteName: string
  freq: number
  character: string
}

const GUQIN_STRINGS: GuqinString[] = [
  { number: 1, noteName: 'C3 (Cung)', freq: 130.81, character: 'Trầm đục như tiếng sấm xa' },
  { number: 2, noteName: 'D3 (Thương)', freq: 146.83, character: 'Cứng cỏi thanh lương' },
  { number: 3, noteName: 'F3 (Giốc)', freq: 174.61, character: 'Êm ái như cây cỏ đâm chồi' },
  { number: 4, noteName: 'G3 (Chủy)', freq: 196.0, character: 'Rực rỡ phóng khoáng' },
  { number: 5, noteName: 'A3 (Vũ)', freq: 220.0, character: 'Mát mẻ thuần khiết như dòng suối' },
  { number: 6, noteName: 'C4 (Biến Cung)', freq: 261.63, character: 'Thanh thoát bay bổng' },
  { number: 7, noteName: 'D4 (Biến Chủy)', freq: 293.66, character: 'Vút lên tầng mây bạc' },
]

export function SaigonAcousticGuqinSanctuaryPavilion({ className }: { className?: string }) {
  const componentId = useId()

  const [activeLighting, setActiveLighting] = useState<GuqinLighting>('candle')
  const [activeStringIndex, setActiveStringIndex] = useState<number | null>(null)
  const [isPlayingMelody, setIsPlayingMelody] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'acoustics' | 'materials' | 'vault'>('acoustics')

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const melodyTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentLighting = LIGHTING_STYLES[activeLighting]

  const stopAudio = () => {
    if (melodyTimerRef.current) {
      clearInterval(melodyTimerRef.current)
      melodyTimerRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close()
      } catch {
        // Ignore
      }
      audioCtxRef.current = null
    }
    setIsPlayingMelody(false)
    setActiveStringIndex(null)
  }

  // Realistic deep silk-string Guqin pluck tone synthesis (sub-bass fundamental + wood body thump + soft finger sliding)
  const pluckGuqinString = (freq: number, index?: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = audioCtxRef.current || new AudioCtx()
      audioCtxRef.current = ctx

      if (typeof index === 'number') {
        setActiveStringIndex(index)
        setTimeout(() => setActiveStringIndex(null), 400)
      }

      // Guqin tone: Sine with low-frequency harmonics and slow wooden decay
      const osc = ctx.createOscillator()
      const oscHarmonic = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      // Octave harmonic overtone for natural silk string warmth
      oscHarmonic.type = 'sine'
      oscHarmonic.frequency.setValueAtTime(freq * 2, ctx.currentTime)

      // Lowpass filter modeling heavy lacquered Paulownia & Cunninghamia wood body
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(freq * 3.2, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(freq * 1.2, ctx.currentTime + 1.8)

      // Pluck envelope: Soft fleshy finger strike, long 3.5s sustain
      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.3)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2)

      osc.connect(filter)
      oscHarmonic.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      oscHarmonic.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 3.3)
      oscHarmonic.stop(ctx.currentTime + 3.3)
    } catch {
      // Audio fallback
    }
  }

  // Play 'Lưu Thủy' (Flowing Water) sequence
  const playFlowingWaterMelody = () => {
    if (isPlayingMelody) {
      stopAudio()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx
      setIsPlayingMelody(true)

      const sequence = [0, 2, 4, 3, 1, 3, 5, 6, 4, 2, 0] // string indices
      let step = 0

      const playNext = () => {
        if (!audioCtxRef.current) return
        const strIdx = sequence[step % sequence.length] ?? 0
        const str = GUQIN_STRINGS[strIdx]
        if (str) {
          pluckGuqinString(str.freq, strIdx)
        }
        step++
      }

      playNext()
      melodyTimerRef.current = setInterval(playNext, 650)
    } catch {
      setIsPlayingMelody(false)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  return (
    <section
      aria-labelledby={`heading-${componentId}`}
      className={cn('u-gutter py-16 md:py-24 transition-colors duration-700 bg-stone-950 text-stone-100', className)}
    >
      <div className="mx-auto max-w-[110rem] space-y-12">
        {/* Header Block */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-stone-800/80 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono tracking-wider uppercase text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Guqin Silence Sanctuary • NC-15 Acoustic Chamber
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Phòng Tĩnh Tâm Cổ Cầm Gỗ Ngô Đồng &amp; Chuẩn Cách Âm NC-15 (&lt; 18 dBA)
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Thánh đường tĩnh tại tuyệt đối dành riêng cho nghệ thuật Cổ Cầm 7 dây. Vòm trần bọc vải thô nhuộm củ nâu hấp thụ triệt để phản xạ âm, đạt tiêu chuẩn độ ồn nền NC-15 (&lt; 18 dBA) tĩnh mịch tựa đáy vực sâu. Bàn đàn phiến đá bazan nguyên khối triệt tiêu cộng hưởng ký sinh và tủ kính kiểm soát ẩm 55% RH nuôi dưỡng thân gỗ Ngô Đồng cổ thụ.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=guqin-sanctuary"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Thiết Kế Phòng Tĩnh Tâm
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Interactive 7-String Guqin & Acoustic Meter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Guqin Instrument & String Plucker */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={cn(
                'relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 overflow-hidden bg-gradient-to-b transition-all duration-1000 flex flex-col justify-between p-6 sm:p-8',
                currentLighting.gradient
              )}
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Ồn Nền Phòng</span>
                    <span className="text-xl font-mono font-medium text-emerald-400">&lt; 16.5 dBA (NC-15)</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Mặt Đàn</span>
                    <span className="text-xs font-mono text-stone-200">Gỗ Ngô Đồng Cổ Phủ Sơn Ta</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-emerald-400">Đá Bazan Khử Rung</span>
                </div>
              </div>

              {/* Center Guqin 7-String Visual */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                {/* Monolithic Basalt Table & Guqin Body */}
                <div className="relative w-full max-w-lg h-44 rounded-md border-t-2 border-amber-900/60 bg-gradient-to-b from-stone-900 via-stone-950 to-black p-4 shadow-2xl flex flex-col justify-around">
                  {/* Mother-of-pearl Hui markers (13 Huy Cổ Cầm) */}
                  <div className="flex justify-between px-6 pointer-events-none opacity-60">
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-100/70" />
                    ))}
                  </div>

                  {/* 7 Interactive Silk Strings */}
                  {GUQIN_STRINGS.map((str, idx) => {
                    const isPlucked = activeStringIndex === idx
                    return (
                      <div
                        key={str.number}
                        onClick={() => pluckGuqinString(str.freq, idx)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            pluckGuqinString(str.freq, idx)
                          }
                        }}
                        className="relative flex items-center justify-between group cursor-pointer py-0.5"
                      >
                        <span className="text-[9px] font-mono text-amber-400/80 w-16">
                          Dây {str.number}
                        </span>

                        {/* Silk Wire */}
                        <div className="relative flex-1 mx-3 h-0.5 bg-stone-600 group-hover:bg-amber-300 transition-colors">
                          {isPlucked && (
                            <div className="absolute inset-0 bg-amber-400 animate-ping" />
                          )}
                        </div>

                        <span className="text-[9px] font-mono text-stone-400 w-24 text-right">
                          {str.noteName}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Info Bar inside Stage */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">Khúc Điệu Cổ</span>
                    <h3 className="text-sm font-medium text-stone-100">Lưu Thủy (Dòng Nước Chảy Róc Rách)</h3>
                    <p className="text-xs text-stone-400">Gảy ngón tơ tằm nguyên bản • Âm hưởng trầm sâu thấu đáy</p>
                  </div>

                  <button
                    type="button"
                    onClick={playFlowingWaterMelody}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all min-h-[44px]',
                      isPlayingMelody
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                        : 'border border-amber-500/50 text-amber-300 hover:bg-amber-500/10'
                    )}
                  >
                    {isPlayingMelody ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        Tạm Dừng Khúc Đàn
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Gảy Khúc &ldquo;Lưu Thủy&rdquo;
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* String Guide Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GUQIN_STRINGS.slice(0, 4).map((str, idx) => (
                <button
                  key={str.number}
                  type="button"
                  onClick={() => pluckGuqinString(str.freq, idx)}
                  className="p-2.5 border border-stone-800 bg-stone-900/40 hover:border-stone-700 text-left transition-all min-h-[44px]"
                >
                  <div className="text-[10px] font-mono text-amber-400">Dây #{str.number}</div>
                  <div className="text-xs font-medium text-stone-200 mt-0.5">{str.noteName.split('(')[1]?.replace(')', '')}</div>
                  <div className="text-[9px] text-stone-500 mt-0.5 truncate">{str.character}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: NC-15 Acoustics, Lighting & Wood Spec */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex border-b border-stone-800">
              <button
                type="button"
                onClick={() => setActiveTab('acoustics')}
                className={cn(
                  'px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all min-h-[44px]',
                  activeTab === 'acoustics'
                    ? 'border-amber-400 text-amber-400 bg-stone-900/40'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                )}
              >
                Cách Âm NC-15
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('materials')}
                className={cn(
                  'px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all min-h-[44px]',
                  activeTab === 'materials'
                    ? 'border-amber-400 text-amber-400 bg-stone-900/40'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                )}
              >
                Gỗ Ngô Đồng Cổ
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vault')}
                className={cn(
                  'px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all min-h-[44px]',
                  activeTab === 'vault'
                    ? 'border-amber-400 text-amber-400 bg-stone-900/40'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                )}
              >
                Tủ Dưỡng 55% RH
              </button>
            </div>

            {/* Tab 1: NC-15 & Lighting */}
            {activeTab === 'acoustics' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                    Kịch Bản Ánh Sáng Tĩnh Tâm UGR &lt; 8
                  </span>
                  <div className="space-y-2">
                    {Object.values(LIGHTING_STYLES).map((style) => {
                      const isSelected = style.id === activeLighting
                      return (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setActiveLighting(style.id)}
                          className={cn(
                            'w-full text-left p-3 border transition-all min-h-[44px]',
                            isSelected
                              ? 'border-amber-400 bg-amber-500/10'
                              : 'border-stone-800 hover:border-stone-700 bg-stone-950/40'
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-stone-100">{style.name}</span>
                            <span className="text-[10px] font-mono text-amber-400">{style.lux}</span>
                          </div>
                          <p className="text-[11px] text-stone-400 font-light mt-1">{style.ambience}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="p-4 border border-stone-800 bg-stone-950/50 space-y-2">
                  <span className="text-[11px] font-mono text-stone-300 block uppercase">
                    Quy Chuẩn Độ Ồn Nền NC-15 (&lt; 18 dBA)
                  </span>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    Hệ vách 3 lớp tường đôi cách chấn Sylomer kết hợp lớp vải thô nhuộm củ nâu dập sóng tự nhiên, cách ly hoàn toàn mọi tiếng còi xe và chấn động tàu xe đô thị TP.HCM.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Paulownia Wood Craft */}
            {activeTab === 'materials' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-4 text-xs font-light text-stone-300">
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-amber-400 font-mono block uppercase">1. Mặt Đàn Gỗ Ngô Đồng (Firmiana Simplex)</span>
                  <p className="mt-1 text-stone-400">
                    Khai thác từ thân ngô đồng cổ thụ phơi bóng râm trên 30 năm để thoát hết nhựa cây. Độ xốp hoàn hảo cho dải tần âm thanh Cổ Cầm trầm hùng.
                  </p>
                </div>
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-amber-400 font-mono block uppercase">2. Đáy Đàn Gỗ Sa Mộc (Cunninghamia Lanceolata)</span>
                  <p className="mt-1 text-stone-400">
                    Gỗ đanh đặc, cộng hưởng đối trọng tạo nên khoang âm thanh sâu thẳm, giữ âm rung kéo dài tới 4 giây sau mỗi cú chạm ngón.
                  </p>
                </div>
                <div>
                  <span className="text-amber-400 font-mono block uppercase">3. Bàn Đàn Đá Bazan Đắk Nông Nguyên Khối</span>
                  <p className="mt-1 text-stone-400">
                    Khối đá nặng 450kg mài phẳng bằng tay, đệm nỉ nhung cách âm ở 4 góc chân, triệt tiêu mọi rung động cơ học từ sàn nhà.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Climate Vault 55% RH */}
            {activeTab === 'vault' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-200">
                    Tủ Dưỡng Đàn Cổ Cầm Sơn Ta Cổ Truyền
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Ẩm Dưỡng Sơn</span>
                    <span className="text-2xl font-mono text-amber-400">55.0%</span>
                    <span className="block text-[10px] text-emerald-400 mt-1">Tránh giòn nứt lớp sơn ta</span>
                  </div>
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Nhiệt Độ Thùng Kính</span>
                    <span className="text-2xl font-mono text-amber-400">21.5°C</span>
                    <span className="block text-[10px] text-emerald-400 mt-1">Cân bằng độ co giãn dây tơ</span>
                  </div>
                </div>

                <div className="p-3 border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200/90 leading-relaxed font-light">
                  Lớp sơn ta trộn bột gạc nai (Lộc giác sương) truyền thống cần độ ẩm trên 50% để giữ độ dẻo dai. Tủ kính Low-Iron UV400 bảo vệ trọn đời.
                </div>
              </div>
            )}

            {/* Consultation CTA */}
            <div className="p-5 border border-amber-500/30 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Dự Toán Phòng Tĩnh Tâm Cổ Cầm
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Đo kiểm âm học NC-15 hiện trường &amp; thi công bàn đá bazan nguyên khối.
                </p>
              </div>
              <Link
                href="/du-toan-chi-phi"
                className="whitespace-nowrap px-4 py-2 border border-amber-500/60 text-amber-300 hover:bg-amber-500/20 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Báo Giá Hoàn Thiện
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
