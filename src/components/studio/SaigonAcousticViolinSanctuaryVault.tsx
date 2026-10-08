'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type LightingMode = 'soloist' | 'chamber' | 'sunset'

interface LightingPreset {
  id: LightingMode
  name: string
  colorTemp: string
  cri: string
  lux: string
  description: string
  gradient: string
}

const LIGHTING_PRESETS: Record<LightingMode, LightingPreset> = {
  soloist: {
    id: 'soloist',
    name: 'Độc Tấu Thượng Thừa (2400K Soloist Spotlight)',
    colorTemp: '2400K Vàng Ấm Hổ Phách',
    cri: 'CRI 99 / R9 > 95',
    lux: '350 Lux chùm hẹp 15° UGR < 10',
    description: 'Chùm sáng ấm áp hội tụ vào vị trí vĩ cầm thủ, làm rực lên sắc vecni đỏ mận hổ phách của cây đàn cổ.',
    gradient: 'from-amber-600/25 via-stone-900 to-black',
  },
  chamber: {
    id: 'chamber',
    name: 'Thính Phòng Hòa Tấu (3000K Chamber Ambience)',
    colorTemp: '3000K Vàng Dịu Thanh Thoát',
    cri: 'CRI 98 / Không nhấp nháy',
    lux: '180 Lux hắt vách gián tiếp',
    description: 'Ánh sáng hắt mềm mại lên các nan vòm gỗ Vân Sam Val di Fiemme, tạo không gian trang trọng và ấm cúng.',
    gradient: 'from-yellow-600/20 via-stone-900 to-black',
  },
  sunset: {
    id: 'sunset',
    name: 'Hoàng Hôn Sài Gòn Lãng Mạn (2200K Sunset Reverie)',
    colorTemp: '2200K Ánh Nến Chạng Vạng',
    cri: 'CRI 97 / Tối ưu nghỉ ngơi',
    lux: '80 Lux dịu mắt thư giãn',
    description: 'Tái hiện sắc ráng chiều êm ả, dẫn dắt tâm trí thả lỏng trong từng âm vang sâu lắng của những bản Dạ khúc.',
    gradient: 'from-orange-700/20 via-stone-900 to-black',
  },
}

interface ViolinPiece {
  id: string
  title: string
  composer: string
  tempo: string
  notePattern: number[] // frequencies
  story: string
}

const VIOLIN_PIECES: ViolinPiece[] = [
  {
    id: 'mendelssohn',
    title: 'Violin Concerto in E Minor, Op. 64 (Allegro)',
    composer: 'Felix Mendelssohn',
    tempo: '112 BPM • Da diết & Bay bổng',
    notePattern: [329.63, 392.0, 493.88, 587.33, 659.25, 587.33, 493.88, 392.0], // E4, G4, B4, D5, E5...
    story: 'Khúc mở đầu huyền thoại đẩy dải âm tần cao lên đỉnh điểm, thử thách độ phân tán âm học của vòm trần gỗ Val di Fiemme.',
  },
  {
    id: 'bach-chaconne',
    title: 'Chaconne in D Minor (Partita No. 2, BWV 1004)',
    composer: 'Johann Sebastian Bach',
    tempo: '64 BPM • Uy nghiêm & Triết lý',
    notePattern: [293.66, 369.99, 440.0, 587.33, 523.25, 440.0, 369.99, 293.66], // D4, F#4, A4, D5...
    story: 'Tượng đài âm nhạc cổ điển phô diễn dải âm bội phức hợp, cộng hưởng hoàn hảo qua lớp sàn đá Carrara cách chấn Sylomer.',
  },
  {
    id: 'paganini',
    title: '24 Caprices for Solo Violin, Op. 1 (No. 24 in A Minor)',
    composer: 'Niccolò Paganini',
    tempo: '128 BPM • Tinh tế & Bùng nổ',
    notePattern: [440.0, 523.25, 659.25, 880.0, 783.99, 659.25, 523.25, 440.0], // A4, C5, E5, A5...
    story: 'Kỹ thuật staccato và pizzicato tả thực đòi hỏi thời gian vang RT60 chính xác 0.38s để từng nốt không dính vào nhau.',
  },
]

export function SaigonAcousticViolinSanctuaryVault({ className }: { className?: string }) {
  const componentId = useId()

  // State: Velvet drapery acoustic slider (0% = curtains closed / maximum absorption, 100% = curtains open / reflective)
  const [draperyPosition, setDraperyPosition] = useState<number>(55)
  const [activeLighting, setActiveLighting] = useState<LightingMode>('soloist')
  const [activePieceId, setActivePieceId] = useState<string>('mendelssohn')
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'acoustics' | 'climate' | 'specs'>('acoustics')

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Calculate RT60 based on drapery position: 0% = 0.32s, 100% = 0.45s
  const currentRt60 = (0.32 + (draperyPosition / 100) * 0.13).toFixed(2)
  const currentPreset = LIGHTING_PRESETS[activeLighting]
  const currentPiece = VIOLIN_PIECES.find((p) => p.id === activePieceId) ?? VIOLIN_PIECES[0]!

  const stopAudio = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close()
      } catch {
        // Ignore
      }
      audioCtxRef.current = null
    }
    setIsPlayingAudio(false)
  }

  const playViolinTone = (freq: number, duration: number) => {
    if (!audioCtxRef.current) return
    const ctx = audioCtxRef.current

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    // Violin tone synthesis: Sawtooth wave shaped with resonant bandpass filter
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    // Vibrato LFO
    const lfo = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.setValueAtTime(5.8, ctx.currentTime) // 5.8 Hz natural violin vibrato
    lfoGain.gain.setValueAtTime(freq * 0.015, ctx.currentTime) // slight frequency pitch variance
    lfo.connect(osc.frequency)
    lfo.start()

    // Formant filter modeling violin spruce body resonance
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(freq * 1.5, ctx.currentTime)
    filter.Q.setValueAtTime(3.2, ctx.currentTime)

    // Envelope
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.08) // smooth bow strike
    gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + duration * 0.7)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration) // bow release

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + duration)
  }

  const togglePlayAudio = () => {
    if (isPlayingAudio) {
      stopAudio()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx
      setIsPlayingAudio(true)

      let noteIdx = 0
      const notes = currentPiece.notePattern
      const noteDuration = 0.42

      // Play first note immediately
      playViolinTone(notes[0] ?? 440, noteDuration)
      noteIdx = 1

      intervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return
        const nextFreq = notes[noteIdx % notes.length] ?? 440
        playViolinTone(nextFreq, noteDuration)
        noteIdx++
      }, 480)
    } catch {
      setIsPlayingAudio(false)
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
              Bespoke Acoustic Architecture • Val di Fiemme Resonance
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Phòng Thính Âm Vĩ Cầm Stradivarius &amp; Vòm Gỗ Vân Sam Val di Fiemme
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Mô phỏng cấu trúc âm học trứ danh của hộp đàn Antonio Stradivarius 1715. Hệ vòm cộng hưởng gỗ Vân Sam (Resonance Spruce) nguyên khối tuyển lựa từ thung lũng Val di Fiemme (Ý), kết hợp sàn đá Carrara cách chấn đệm Sylomer 25mm và hệ rèm nhung lụa Ý kéo điện hiệu chỉnh thời gian vang RT60 tức thời.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=acoustic-violin-vault"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Đặt Lịch Thẩm Âm Cùng KTS
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Stage with Dynamic Lighting & Resonance Simulation */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={cn(
                'relative aspect-[16/10] sm:aspect-[16/9] rounded-none border border-stone-800 overflow-hidden bg-gradient-to-b transition-all duration-1000 flex flex-col justify-between p-6 sm:p-8',
                currentPreset.gradient
              )}
            >
              {/* Top Bar inside Stage: Acoustic Metrics & Live Status */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4 backdrop-blur-md bg-stone-950/40 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Thời gian vang RT60</span>
                    <span className="text-xl font-mono font-medium text-amber-400">{currentRt60}s</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Vị trí Rèm Âm Học</span>
                    <span className="text-xs font-mono text-stone-200">
                      {draperyPosition}% ({draperyPosition < 40 ? 'Hấp thụ cao' : draperyPosition > 70 ? 'Phản xạ tối đa' : 'Cân bằng thính phòng'})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-emerald-400">Sylomer -42dB Isolation</span>
                </div>
              </div>

              {/* Center Visualization: Stradivarius Vault & Soundwaves */}
              <div className="relative my-auto flex flex-col items-center justify-center text-center py-6">
                {/* Resonance Arch Visual */}
                <div className="relative w-64 h-36 sm:w-80 sm:h-44 border-t-4 border-l border-r border-amber-500/50 rounded-t-[100px] flex items-center justify-center bg-stone-950/50 backdrop-blur-sm p-4 shadow-2xl">
                  {/* Acoustic Wave Animation */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={cn(
                        'w-48 h-28 rounded-t-[80px] border border-amber-400/20 transition-all duration-700',
                        isPlayingAudio ? 'scale-110 opacity-70 animate-pulse' : 'scale-100 opacity-20'
                      )}
                    />
                    <div
                      className={cn(
                        'absolute w-36 h-20 rounded-t-[60px] border border-amber-400/30 transition-all duration-500',
                        isPlayingAudio ? 'scale-125 opacity-60' : 'scale-95 opacity-10'
                      )}
                    />
                  </div>

                  <div className="relative z-10 space-y-1">
                    <div className="text-2xl sm:text-3xl font-serif text-amber-200 tracking-wide">
                      🎻 Cremona 1715
                    </div>
                    <div className="text-[11px] font-mono text-stone-400">
                      Val di Fiemme Picea Abies • Carrara Marble Sylomer
                    </div>
                  </div>
                </div>

                {/* Live sound spectrum bars when playing */}
                <div className="flex items-end justify-center gap-1.5 h-8 mt-4">
                  {[28, 45, 65, 85, 95, 75, 55, 40, 60, 80, 50, 30].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        height: isPlayingAudio ? `${Math.max(15, (h * draperyPosition) / 100)}%` : '15%',
                      }}
                      className={cn(
                        'w-1.5 rounded-full transition-all duration-300',
                        isPlayingAudio ? 'bg-amber-400' : 'bg-stone-800'
                      )}
                    />
                  ))}
                </div>
              </div>

              {/* Bottom Bar inside Stage: Audio Player Bar */}
              <div className="border-t border-stone-800/80 pt-4 backdrop-blur-md bg-stone-950/60 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">Tác phẩm đang mô phỏng</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentPiece.title}</h3>
                    <p className="text-xs text-stone-400">{currentPiece.composer} • {currentPiece.tempo}</p>
                  </div>

                  <button
                    type="button"
                    onClick={togglePlayAudio}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all min-h-[44px]',
                      isPlayingAudio
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                        : 'border border-amber-500/50 text-amber-300 hover:bg-amber-500/10'
                    )}
                  >
                    {isPlayingAudio ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        Tạm Dừng Thử Âm
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        Phát Thử Thanh Âm Vĩ Cầm
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-stone-400 italic font-light border-t border-stone-800/60 pt-2">
                  &ldquo;{currentPiece.story}&rdquo;
                </p>
              </div>
            </div>

            {/* Repertoire Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VIOLIN_PIECES.map((piece) => {
                const isActive = piece.id === activePieceId
                return (
                  <button
                    key={piece.id}
                    type="button"
                    onClick={() => {
                      if (isPlayingAudio) stopAudio()
                      setActivePieceId(piece.id)
                    }}
                    className={cn(
                      'text-left p-3.5 border transition-all min-h-[44px]',
                      isActive
                        ? 'border-amber-500 bg-amber-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[11px] font-mono text-amber-400 uppercase">{piece.composer}</div>
                    <div className="text-xs font-medium text-stone-200 truncate mt-0.5">{piece.title}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Acoustic Controls, Lighting Presets & Climate Display */}
          <div className="lg:col-span-5 space-y-6">
            {/* Interactive Control Tabs */}
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
                Hiệu Chỉnh Rèm RT60
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
                Tủ Bảo Quản 50% RH
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
                Quy Chuẩn Vật Liệu
              </button>
            </div>

            {/* Tab 1: Acoustics & Lighting */}
            {activeTab === 'acoustics' && (
              <div className="space-y-6 bg-stone-900/40 border border-stone-800 p-6">
                {/* Drapery Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-stone-300">Rèm Nhung Lụa Ý Kéo Điện (Somfy Ultra-Quiet)</span>
                    <span className="text-amber-400 font-bold">{draperyPosition}% Mở</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={draperyPosition}
                    onChange={(e) => setDraperyPosition(Number(e.target.value))}
                    aria-label="Điều chỉnh độ mở rèm nhung lụa Ý để thay đổi thời gian vang RT60"
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-stone-800 rounded-none min-h-[44px]"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-500">
                    <span>0% (Đóng kín: RT60 = 0.32s - Thính phòng cô đọng)</span>
                    <span>100% (Thu gọn: RT60 = 0.45s - Soloist vang sáng)</span>
                  </div>
                </div>

                {/* Lighting Presets */}
                <div className="space-y-3 pt-4 border-t border-stone-800">
                  <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                    Kịch Bản Chiếu Sáng CRI 99 UGR &lt; 10
                  </span>
                  <div className="space-y-2">
                    {Object.values(LIGHTING_PRESETS).map((preset) => {
                      const isSelected = preset.id === activeLighting
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => setActiveLighting(preset.id)}
                          className={cn(
                            'w-full text-left p-3 border transition-all min-h-[44px]',
                            isSelected
                              ? 'border-amber-500 bg-amber-500/10'
                              : 'border-stone-800 hover:border-stone-700 bg-stone-950/40'
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-stone-100">{preset.name}</span>
                            <span className="text-[10px] font-mono text-amber-400">{preset.lux}</span>
                          </div>
                          <p className="text-[11px] text-stone-400 font-light mt-1">{preset.description}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Climate Vault */}
            {activeTab === 'climate' && (
              <div className="space-y-6 bg-stone-900/40 border border-stone-800 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-200">
                    Hệ Thống Vi Khí Hậu Bảo Tồn Nhạc Cụ Cổ (Microclimate Safe)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Ẩm Tương Đối (RH)</span>
                    <span className="text-2xl font-mono text-amber-400">50.0%</span>
                    <span className="block text-[10px] text-emerald-400 mt-1">±1.5% Cân bằng gỗ keo &amp; vecni</span>
                  </div>
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Nhiệt Độ Thùng Kính</span>
                    <span className="text-2xl font-mono text-amber-400">21.0°C</span>
                    <span className="block text-[10px] text-emerald-400 mt-1">Biên độ ổn định 24/7</span>
                  </div>
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Kính Bảo Vệ</span>
                    <span className="text-xs font-medium text-stone-200 mt-1 block">Low-Iron UV400</span>
                    <span className="block text-[10px] text-stone-400 mt-0.5">Triệt tiêu 99.8% tia cực tím</span>
                  </div>
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Áp Suất Phòng</span>
                    <span className="text-xs font-medium text-stone-200 mt-1 block">+12 Pa (Dương)</span>
                    <span className="block text-[10px] text-stone-400 mt-0.5">Ngăn hoàn toàn bụi mịn PM2.5</span>
                  </div>
                </div>

                <div className="p-3 border border-amber-500/20 bg-amber-500/5 text-xs text-amber-200/90 leading-relaxed font-light">
                  <strong>Khuyến cáo KTS GuHomes:</strong> Vĩ cầm cổ sản xuất từ thế kỷ 18 cực kỳ nhạy cảm với mùa mưa ẩm nhiệt đới Sài Gòn. Cảm biến quang học kép liên tục kích hoạt bộ hút ẩm rotor tổ ong gốm silicat giúp thân gỗ không bao giờ trương nở hay nứt vỡ.
                </div>
              </div>
            )}

            {/* Tab 3: Material Specs */}
            {activeTab === 'specs' && (
              <div className="space-y-4 bg-stone-900/40 border border-stone-800 p-6 text-xs font-light text-stone-300">
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-amber-400 font-mono block uppercase">1. Vòm Gỗ Vân Sam Val di Fiemme (Resonance Spruce)</span>
                  <p className="mt-1 text-stone-400">
                    Thu hoạch từ những cây vân sam hàng trăm năm tuổi tại dãy Dolomite Ý — cùng khu rừng Antonio Stradivarius chọn gỗ vào năm 1715. Vòng năm cực mảnh và đồng đều, mang lại tốc độ truyền âm thanh lên đến 5.400 m/s.
                  </p>
                </div>
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-amber-400 font-mono block uppercase">2. Bệ Sàn Đá Carrara Cách Chấn Đệm Sylomer 25mm</span>
                  <p className="mt-1 text-stone-400">
                    Khối sàn đá tự nhiên Carrara nặng 3.2 tấn đặt nổi trên hệ đệm giảm chấn Sylomer (Áo), triệt tiêu hoàn toàn rung chấn mặt đất từ giao thông đô thị TP.HCM (&lt; 15Hz).
                  </p>
                </div>
                <div>
                  <span className="text-amber-400 font-mono block uppercase">3. Hệ Rèm Nhung Dệt Thủ Công Venezia</span>
                  <p className="mt-1 text-stone-400">
                    Lớp nhung dệt từ tơ tằm và sợi len hữu cơ định lượng 650g/m², xếp nếp tỷ lệ vàng 1:2.5 giúp hấp thụ triệt để âm dội dải trung cao mà không làm mất đi độ ấm của tiếng đàn.
                  </p>
                </div>
              </div>
            )}

            {/* Consultation CTA Card */}
            <div className="p-5 border border-amber-500/30 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Tư Vấn Thiết Kế Âm Học Độc Bản
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  GuHomes đo đạc âm học hiện trường bằng micro B&amp;K chuẩn ISO 3382 trước khi gia công mộc.
                </p>
              </div>
              <Link
                href="/du-toan-chi-phi"
                className="whitespace-nowrap px-4 py-2 border border-amber-500/60 text-amber-300 hover:bg-amber-500/20 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Dự Toán Phòng Nghe
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
