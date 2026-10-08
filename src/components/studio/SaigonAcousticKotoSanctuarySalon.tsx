'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type ScaleMode = 'bac' | 'nam' | 'oan'

interface DanTranhScale {
  id: ScaleMode
  name: string
  emotion: string
  notes: { name: string; solfege: string; freq: number }[]
  story: string
}

const SCALES: Record<ScaleMode, DanTranhScale> = {
  bac: {
    id: 'bac',
    name: 'Điệu Bắc (Trang Nhã & Vui Tươi)',
    emotion: 'Thanh thoát, đĩnh đạc, gợi nhớ không khí hội xuân đất kinh kỳ Thăng Long.',
    notes: [
      { name: 'Hò', solfege: 'D4', freq: 293.66 },
      { name: 'Xự', solfege: 'E4', freq: 329.63 },
      { name: 'Xang', solfege: 'G4', freq: 392.0 },
      { name: 'Xê', solfege: 'A4', freq: 440.0 },
      { name: 'Cống', solfege: 'B4', freq: 493.88 },
      { name: 'Líu', solfege: 'D5', freq: 587.33 },
    ],
    story: 'Các con nhạn xếp theo cung bậc chuẩn, âm thanh trong vắt ngân vang qua vòm gỗ Hông xốp nhẹ.',
  },
  nam: {
    id: 'nam',
    name: 'Điệu Nam (Dịu Dàng & Trầm Lắng)',
    emotion: 'U hoài man mác, êm ả như dòng nước phù sa sông Cửu Long trôi về biển lớn.',
    notes: [
      { name: 'Hò', solfege: 'D4', freq: 293.66 },
      { name: 'Xự (hơi non)', solfege: 'F4', freq: 349.23 },
      { name: 'Xang', solfege: 'G4', freq: 392.0 },
      { name: 'Xê', solfege: 'A4', freq: 440.0 },
      { name: 'Phan', solfege: 'Bb4', freq: 466.16 },
      { name: 'Líu', solfege: 'D5', freq: 587.33 },
    ],
    story: 'Kỹ thuật nhấn nhá rung ngón tay trái trên dây tơ tạo nên độ nẩy mềm mại lay động tâm can.',
  },
  oan: {
    id: 'oan',
    name: 'Điệu Oán (Da Diết & Sâu Thẳm)',
    emotion: 'Khắc khoải, tự sự, đong đầy tâm tư của những đêm trăng vắng bên bờ kênh Sài Gòn.',
    notes: [
      { name: 'Hò', solfege: 'D4', freq: 293.66 },
      { name: 'Xự oán', solfege: 'F#4-', freq: 360.0 },
      { name: 'Xang', solfege: 'G4', freq: 392.0 },
      { name: 'Xê', solfege: 'A4', freq: 440.0 },
      { name: 'Cống oán', solfege: 'B4-', freq: 480.0 },
      { name: 'Líu', solfege: 'D5', freq: 587.33 },
    ],
    story: 'Nhạn đàn dịch chuyển tinh vi tạo các nốt vi cung nửa cung đặc trưng nghệ thuật Đờn ca tài tử.',
  },
}

type LightingId = 'moon' | 'bamboo' | 'palace'

interface LightingOption {
  id: LightingId
  name: string
  colorTemp: string
  cri: string
  description: string
  gradient: string
}

const LIGHTING_OPTIONS: Record<LightingId, LightingOption> = {
  moon: {
    id: 'moon',
    name: 'Trăng Vàng Cố Tri (2400K)',
    colorTemp: '2400K Vàng Dịu Lắng Đọng',
    cri: 'CRI 98 / UGR < 10',
    description: 'Ánh sáng hắt dịu trên mặt đàn cẩn xà cừ ngũ sắc, phản chiếu ánh kim xà cừ óng ánh.',
    gradient: 'from-amber-600/25 via-stone-900 to-black',
  },
  bamboo: {
    id: 'bamboo',
    name: 'Bình Minh Trúc Viện (3000K)',
    colorTemp: '3000K Ban Mai Trong Suốt',
    cri: 'CRI 99 / R9 > 95',
    description: 'Chiếu rọi tôn vinh các thớ gỗ Hông thẳng tắp trên vòm tán âm cong Fermat.',
    gradient: 'from-yellow-600/20 via-stone-900 to-black',
  },
  palace: {
    id: 'palace',
    name: 'Dạ Yến Cung Đình (2700K)',
    colorTemp: '2700K Hoàng Gia Vương Giả',
    cri: 'CRI 98 / Không nhấp nháy',
    description: 'Không gian ấm cúng sang trọng, lý tưởng cho những buổi tiếp đón tri âm tri kỷ.',
    gradient: 'from-orange-700/20 via-stone-900 to-black',
  },
}

export function SaigonAcousticKotoSanctuarySalon({ className }: { className?: string }) {
  const componentId = useId()

  const [activeScale, setActiveScale] = useState<ScaleMode>('bac')
  const [activeLighting, setActiveLighting] = useState<LightingId>('moon')
  const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null)
  const [isPlayingArpeggio, setIsPlayingArpeggio] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'acoustics' | 'climate' | 'specs'>('acoustics')

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const arpeggioTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentScale = SCALES[activeScale]
  const currentLighting = LIGHTING_OPTIONS[activeLighting]

  const stopAudio = () => {
    if (arpeggioTimerRef.current) {
      clearInterval(arpeggioTimerRef.current)
      arpeggioTimerRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close()
      } catch {
        // Ignore
      }
      audioCtxRef.current = null
    }
    setIsPlayingArpeggio(false)
    setActiveNoteIndex(null)
  }

  // Synthesize realistic zither / đàn tranh plucked string note
  const pluckString = (freq: number, index?: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = audioCtxRef.current || new AudioCtx()
      audioCtxRef.current = ctx

      if (typeof index === 'number') {
        setActiveNoteIndex(index)
        setTimeout(() => setActiveNoteIndex(null), 300)
      }

      // Bright plucked transient
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      // Sawtooth/triangle blend for metallic silk/steel wire
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      // Slight string bending vibrato
      const vibrato = ctx.createOscillator()
      const vibratoGain = ctx.createGain()
      vibrato.frequency.setValueAtTime(6.0, ctx.currentTime)
      vibratoGain.gain.setValueAtTime(freq * 0.008, ctx.currentTime)
      vibrato.connect(osc.frequency)
      vibrato.start()

      // High damping lowpass filter mimicking Paulownia soundboard resonance
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(freq * 4.5, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 1.2)

      // Sharp pluck attack & natural exponential decay
      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.008) // sharp nail pluck
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.15)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8) // sustain 1.8s

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 1.9)
    } catch {
      // Audio fallback
    }
  }

  // Play full pentatonic arpeggio cascade
  const toggleArpeggio = () => {
    if (isPlayingArpeggio) {
      stopAudio()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx
      setIsPlayingArpeggio(true)

      let idx = 0
      const notes = currentScale.notes

      pluckString(notes[0]?.freq ?? 293.66, 0)
      idx = 1

      arpeggioTimerRef.current = setInterval(() => {
        if (!audioCtxRef.current) return
        const currentNote = notes[idx % notes.length]
        if (currentNote) {
          pluckString(currentNote.freq, idx % notes.length)
        }
        idx++
      }, 420)
    } catch {
      setIsPlayingArpeggio(false)
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
              Zither Acoustic Salon • Paulownia Fermat Resonance
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Phòng Hòa Âm Đàn Tranh Gỗ Hông &amp; Vòm Tán Âm Fermat Triệt Sóng Đứng
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Không gian đại sảnh thính âm dành riêng cho nghệ thuật đàn tranh và ngũ cung truyền thống. Vòm ốp gỗ Hông (Paulownia Wood) siêu nhẹ với cấu trúc tế bào xốp khuếch đại dải tần tơ đồng trong trẻo; vách tán âm đường cong Fermat triệt tiêu hoàn toàn sóng đứng, kết hợp sàn Mun sừng ghép mộng và tủ kính bảo quản 50% RH.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=acoustic-koto-salon"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Tư Vấn Thính Phòng Đàn Tranh
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Interactive Zither Strings & Acoustics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 16-String Zither Soundboard */}
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
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Thời gian vang RT60</span>
                    <span className="text-xl font-mono font-medium text-amber-400">0.35s</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Thang Âm Hoạt Động</span>
                    <span className="text-xs font-mono text-stone-200">{currentScale.name.split('(')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-emerald-400">Vòm Fermat Không Sóng Đứng</span>
                </div>
              </div>

              {/* Center Zither Strings Simulation */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                {/* Zither Curved Body Visual */}
                <div className="relative w-full max-w-lg h-40 border-y-2 border-amber-600/60 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 p-4 rounded-xl shadow-2xl flex flex-col justify-around overflow-hidden">
                  {/* Mother-of-pearl inlay visual hint */}
                  <div className="absolute top-1 left-4 text-[9px] font-serif text-amber-200/40 tracking-widest">
                    ❖ CẨN XÀ CỪ NGŨ SẮC THĂNG LONG ❖
                  </div>

                  {/* 6 Interactive Pluckable Strings with movable bridges (Nhạn đàn) */}
                  {currentScale.notes.map((note, i) => {
                    const isPlucked = activeNoteIndex === i
                    return (
                      <div
                        key={note.name}
                        onClick={() => pluckString(note.freq, i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            pluckString(note.freq, i)
                          }
                        }}
                        className="relative flex items-center justify-between group cursor-pointer py-1"
                      >
                        <span className="text-[10px] font-mono text-amber-400/80 w-12">{note.name}</span>
                        {/* Steel/Silk String */}
                        <div className="relative flex-1 mx-3 h-px bg-stone-500 group-hover:bg-amber-300 transition-colors">
                          {/* Movable Bridge (Nhạn) */}
                          <div
                            style={{
                              left: `${25 + i * 11}%`,
                            }}
                            className="absolute -top-1.5 w-3 h-3 bg-amber-600 border border-amber-400 rounded-sm shadow-md"
                          />
                          {/* Vibrating highlight line */}
                          {isPlucked && (
                            <div className="absolute inset-0 bg-amber-300 animate-ping" />
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 w-12 text-right">{note.solfege}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Bottom Bar: Arpeggio Controls */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">Cảm Xúc Giai Điệu</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentScale.name}</h3>
                    <p className="text-xs text-stone-400">{currentScale.emotion}</p>
                  </div>

                  <button
                    type="button"
                    onClick={toggleArpeggio}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all min-h-[44px]',
                      isPlayingArpeggio
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                        : 'border border-amber-500/50 text-amber-300 hover:bg-amber-500/10'
                    )}
                  >
                    {isPlayingArpeggio ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        Tạm Dừng Chuỗi Âm
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Gảy Chuỗi Âm Ngũ Cung
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-stone-400 italic font-light border-t border-stone-800/60 pt-2">
                  &ldquo;{currentScale.story}&rdquo;
                </p>
              </div>
            </div>

            {/* Scale Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.values(SCALES).map((scale) => {
                const isActive = scale.id === activeScale
                return (
                  <button
                    key={scale.id}
                    type="button"
                    onClick={() => {
                      if (isPlayingArpeggio) stopAudio()
                      setActiveScale(scale.id)
                    }}
                    className={cn(
                      'text-left p-3.5 border transition-all min-h-[44px]',
                      isActive
                        ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[11px] font-mono text-amber-400 uppercase">{scale.name.split('(')[0]}</div>
                    <div className="text-xs font-medium text-stone-200 truncate mt-0.5">{scale.emotion.split(',')[0]}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Acoustics, Lighting & Specimen Vault */}
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
                Vòm Fermat &amp; Sáng
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('climate')}
                className={cn(
                  'px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all min-h-[44px]',
                  activeTab === 'climate'
                    ? 'border-amber-400 text-amber-400 bg-stone-900/40'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                )}
              >
                Tủ Đàn 50% RH
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={cn(
                  'px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all min-h-[44px]',
                  activeTab === 'specs'
                    ? 'border-amber-400 text-amber-400 bg-stone-900/40'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                )}
              >
                Gỗ Hông Paulownia
              </button>
            </div>

            {/* Tab 1: Fermat Acoustics & Lighting */}
            {activeTab === 'acoustics' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                    Kịch Bản Ánh Sáng Thưởng Âm Đàn Tranh
                  </span>
                  <div className="space-y-2">
                    {Object.values(LIGHTING_OPTIONS).map((opt) => {
                      const isSelected = opt.id === activeLighting
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setActiveLighting(opt.id)}
                          className={cn(
                            'w-full text-left p-3 border transition-all min-h-[44px]',
                            isSelected
                              ? 'border-amber-400 bg-amber-500/10'
                              : 'border-stone-800 hover:border-stone-700 bg-stone-950/40'
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-stone-100">{opt.name}</span>
                            <span className="text-[10px] font-mono text-amber-400">{opt.colorTemp.split(' ')[0]}</span>
                          </div>
                          <p className="text-[11px] text-stone-400 font-light mt-1">{opt.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="p-4 border border-stone-800 bg-stone-950/50 space-y-2">
                  <span className="text-[11px] font-mono text-stone-300 block uppercase">
                    Nguyên Lý Đường Cong Tán Âm Fermat
                  </span>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    Hệ nan vòm tuân theo đường xoắn ốc Fermat $r^2 = a^2 \theta$, phân tán đồng đều các dải sóng âm phản hồi trong phạm vi 360 độ, triệt tiêu hoàn toàn điểm mù âm học (acoustic nulls) và sóng đứng khó chịu.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Specimen Vault 50% RH */}
            {activeTab === 'climate' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-200">
                    Hệ Vi Khí Hậu Bảo Vệ Đàn Tranh Cổ Cẩn Xà Cừ
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Ẩm Tương Đối (RH)</span>
                    <span className="text-2xl font-mono text-amber-400">50.0%</span>
                    <span className="block text-[10px] text-emerald-400 mt-1">Tránh bong tróc xà cừ cổ</span>
                  </div>
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Nhiệt Độ Thùng Kính</span>
                    <span className="text-2xl font-mono text-amber-400">22.0°C</span>
                    <span className="block text-[10px] text-emerald-400 mt-1">Giữ ổn định độ căng dây</span>
                  </div>
                </div>

                <div className="p-3 border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200/90 leading-relaxed font-light">
                  Lớp keo dán vỏ ốc xà cừ ngũ sắc chế tạo từ nhựa cây bời lời và sơn ta tự nhiên cực kỳ kỵ sự dao động độ ẩm. Hệ thống tuần hoàn khí tinh khiết lọc bụi PM0.3 giữ nguyên vẻ lấp lánh truyền đời.
                </div>
              </div>
            )}

            {/* Tab 3: Paulownia Wood Specs */}
            {activeTab === 'specs' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-4 text-xs font-light text-stone-300">
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-amber-400 font-mono block uppercase">1. Gỗ Hông (Paulownia Wood / Ngô Đồng)</span>
                  <p className="mt-1 text-stone-400">
                    Tỷ trọng chỉ 0.28 g/cm³, rỗng xốp tự nhiên giúp âm thanh khuếch đại mượt mà không bị méo tiếng. Đây là loại gỗ duy nhất được các bậc thầy làm đàn cổ truyền Việt Nam và Nhật Bản lựa chọn làm mặt đàn tranh hàng ngàn năm qua.
                  </p>
                </div>
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-amber-400 font-mono block uppercase">2. Sàn Gỗ Mun Sừng Khánh Hòa Ghép Mộng</span>
                  <p className="mt-1 text-stone-400">
                    Gỗ Mun sừng đanh chắc, tỷ trọng lớn trên 1.1 g/cm³, đóng vai trò bệ phản xạ âm thanh dải trầm, giữ cho tiếng đàn có độ sâu thăm thẳm và dứt khoát.
                  </p>
                </div>
                <div>
                  <span className="text-amber-400 font-mono block uppercase">3. Nhạn Đàn Gỗ Trắc Khảm Xương Trâu</span>
                  <p className="mt-1 text-stone-400">
                    Mỗi con nhạn được tiện thủ công từ gỗ Trắc đỏ đen, đỉnh khảm xương trâu già để truyền dẫn trọn vẹn từng rung động từ dây đàn xuống mặt gỗ Hông.
                  </p>
                </div>
              </div>
            )}

            {/* Consultation CTA Card */}
            <div className="p-5 border border-amber-500/30 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Dự Toán Đại Sảnh Âm Nhạc
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Khảo sát âm học &amp; may đo hệ vòm gỗ Hông theo kích thước thực tế căn biệt thự.
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
