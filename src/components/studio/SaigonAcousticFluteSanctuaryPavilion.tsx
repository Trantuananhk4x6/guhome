'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type FluteLighting = 'moonlight' | 'tea-zen' | 'yentu-dawn'

interface LightingMode {
  id: FluteLighting
  name: string
  colorTemp: string
  cri: string
  ambience: string
  gradient: string
}

const LIGHTING_MODES: Record<FluteLighting, LightingMode> = {
  moonlight: {
    id: 'moonlight',
    name: 'Trăng Non Rừng Trúc (2400K)',
    colorTemp: '2400K Vàng Hổ Phách Mờ',
    cri: 'CRI 98 / UGR < 10',
    ambience: 'Ánh trăng thanh tĩnh lọt qua kẽ nan tre hun khói, hòa cùng tiếng tiêu trầm ấm lan tỏa trong đêm.',
    gradient: 'from-amber-600/25 via-stone-900 to-black',
  },
  'tea-zen': {
    id: 'tea-zen',
    name: 'Thiền Trà Tĩnh Mịch (2200K)',
    colorTemp: '2200K Ánh Nến Thiền Định',
    cri: 'CRI 99 / R9 > 95',
    ambience: 'Vầng sáng ấm áp hội tụ quanh bàn trà bệt và bệ đá ong xám, dẫn dắt tâm trí buông bỏ mọi tạp niệm.',
    gradient: 'from-orange-700/20 via-stone-900 to-black',
  },
  'yentu-dawn': {
    id: 'yentu-dawn',
    name: 'Sương Sớm Yên Tử (3000K)',
    colorTemp: '3000K Sáng Trong Ban Mai',
    cri: 'CRI 97 / Không nhấp nháy',
    ambience: 'Tái hiện luồng sáng sớm tinh khôi trên đỉnh núi Yên Tử rọi vào các tiêu bản sáo trúc cổ truyền.',
    gradient: 'from-yellow-600/20 via-stone-900 to-black',
  },
}

interface FluteMelody {
  id: string
  title: string
  region: string
  scale: string
  notes: number[] // Frequencies in Hz (Pentatonic)
  description: string
}

const FLUTE_MELODIES: FluteMelody[] = [
  {
    id: 'trang-thu',
    title: 'Khúc Trăng Thu Rừng Trúc',
    region: 'Đồng Bằng Bắc Bộ',
    scale: 'Ngũ Cung Điệu Cung (Do - Re - Mi - Sol - La)',
    notes: [523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 523.25], // C5, D5, E5, G5, A5...
    description: 'Thanh âm sáo trúc trong trẻo như ngọn gió thu lướt qua rặng tre xanh, ngân vang thanh khiết nhờ vách tán âm parabol.',
  },
  {
    id: 'tinh-que',
    title: 'Dạ Khúc Bến Nước Tiêu Tương',
    region: 'Sông Nước Cửu Long',
    scale: 'Ngũ Cung Điệu Nam (Hò - Xự - Xang - Xê - Cống)',
    notes: [440.0, 493.88, 554.37, 659.25, 739.99, 659.25, 493.88, 440.0], // A4, B4, C#5, E5, F#5...
    description: 'Âm sắc tiêu bát khổng trầm lắng, sâu hút qua hệ đá ong xám Đồng Nai tiêu triệt hoàn toàn tạp âm vang dội.',
  },
  {
    id: 'zen-yentu',
    title: 'Thiền Ca Yên Tử Tĩnh Lặng',
    region: 'Trúc Lâm Đại Huệ',
    scale: 'Ngũ Cung Thiền Định Không Thời Gian',
    notes: [392.0, 440.0, 523.25, 587.33, 659.25, 523.25, 440.0, 392.0], // G4, A4, C5, D5, E5...
    description: 'Từng nốt ngân dài tĩnh tại hòa cùng hơi thở nhẹ, đưa người nghe vào trạng thái thư thái an nhiên tột bậc.',
  },
]

export function SaigonAcousticFluteSanctuaryPavilion({ className }: { className?: string }) {
  const componentId = useId()

  const [activeLighting, setActiveLighting] = useState<FluteLighting>('moonlight')
  const [activeMelodyId, setActiveMelodyId] = useState<string>('trang-thu')
  const [isPlayingFlute, setIsPlayingFlute] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<'acoustics' | 'vault' | 'materials'>('acoustics')

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const melodyIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentLighting = LIGHTING_MODES[activeLighting]
  const currentMelody = FLUTE_MELODIES.find((m) => m.id === activeMelodyId) ?? FLUTE_MELODIES[0]!

  const stopAudio = () => {
    if (melodyIntervalRef.current) {
      clearInterval(melodyIntervalRef.current)
      melodyIntervalRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close()
      } catch {
        // Ignore
      }
      audioCtxRef.current = null
    }
    setIsPlayingFlute(false)
  }

  // Synthesize realistic bamboo flute breath and note
  const playFluteNote = (freq: number, duration: number) => {
    if (!audioCtxRef.current) return
    const ctx = audioCtxRef.current

    // Flute fundamental tone: Triangle/Sine blend with breath noise
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    // Breath vibrato (natural 5.2 Hz gentle diaphragm flutter)
    const vibrato = ctx.createOscillator()
    const vibratoGain = ctx.createGain()
    vibrato.frequency.setValueAtTime(5.2, ctx.currentTime)
    vibratoGain.gain.setValueAtTime(freq * 0.012, ctx.currentTime)
    vibrato.connect(osc.frequency)
    vibrato.start()

    // Resonant bandpass filter modeling cylindrical bamboo bore
    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(freq * 1.05, ctx.currentTime)
    filter.Q.setValueAtTime(4.5, ctx.currentTime)

    // Gentle breath noise generator
    const bufferSize = ctx.sampleRate * duration
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.04
    }
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBuffer

    const noiseFilter = ctx.createBiquadFilter()
    noiseFilter.type = 'highpass'
    noiseFilter.frequency.setValueAtTime(1800, ctx.currentTime)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.01, ctx.currentTime)

    noiseSource.connect(noiseFilter)
    noiseFilter.connect(noiseGain)
    noiseGain.connect(gain)

    // Flute attack envelope: gentle breath ramp
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.12) // soft breath attack
    gain.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + duration * 0.7)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    noiseSource.start()
    osc.stop(ctx.currentTime + duration)
    noiseSource.stop(ctx.currentTime + duration)
  }

  const toggleFluteAudio = () => {
    if (isPlayingFlute) {
      stopAudio()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx
      setIsPlayingFlute(true)

      let noteIdx = 0
      const notes = currentMelody.notes
      const duration = 0.55

      // Play first note
      playFluteNote(notes[0] ?? 523, duration)
      noteIdx = 1

      melodyIntervalRef.current = setInterval(() => {
        if (!audioCtxRef.current) return
        const f = notes[noteIdx % notes.length] ?? 523
        playFluteNote(f, duration)
        noteIdx++
      }, 620)
    } catch {
      setIsPlayingFlute(false)
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
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono tracking-wider uppercase text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Indigenous Acoustic Architecture • Bamboo &amp; Basalt
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Phòng Hòa Âm Tiêu Sáo Trúc Bản Địa &amp; Vách Đá Ong Xám Đồng Nai
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Kiến tạo không gian thưởng thức tiêu sáo trúc và nhạc cụ hơi truyền thống đỉnh cao. Sự kết hợp giữa hệ nan tre hun khói vi sinh chống mọt tự nhiên, phiến đá ong xám Đồng Nai hấp thụ dải tần cao chói gắt, gương âm học parabol tập trung thanh khí và tủ kính bảo quản nhạc cụ trúc 55% RH.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=acoustic-flute-sanctuary"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-emerald-500 text-stone-950 hover:bg-emerald-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Tư Vấn Phòng Hòa Âm Mộc
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Flute Chamber & Audio Synthesis */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={cn(
                'relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 overflow-hidden bg-gradient-to-b transition-all duration-1000 flex flex-col justify-between p-6 sm:p-8',
                currentLighting.gradient
              )}
            >
              {/* Top Bar: Acoustic Specs & Status */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Thời gian vang RT60</span>
                    <span className="text-xl font-mono font-medium text-emerald-400">0.34s</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Hệ Tán Âm</span>
                    <span className="text-xs font-mono text-stone-200">Gương Parabol Nan Tre</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-emerald-400">Đá Ong Tiêu Âm Dải Cao</span>
                </div>
              </div>

              {/* Center Simulation: Bamboo Slats & Resonant Sound Chamber */}
              <div className="relative my-auto flex flex-col items-center justify-center text-center py-4">
                <div className="relative w-64 h-36 sm:w-80 sm:h-44 border border-emerald-500/30 rounded-none bg-stone-950/70 backdrop-blur-md flex flex-col items-center justify-center p-4 shadow-2xl">
                  {/* Decorative Smoked Bamboo Slats */}
                  <div className="absolute inset-0 flex justify-around px-4 pointer-events-none opacity-20">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="w-1.5 h-full bg-amber-700/60 rounded-full" />
                    ))}
                  </div>

                  <div className="relative z-10 space-y-1">
                    <div className="text-3xl font-serif text-emerald-300">🎋 Tiêu Sáo Trúc Trầm Hương</div>
                    <div className="text-[11px] font-mono text-stone-400">
                      Bambusa Oldhamii • Đồng Nai Basalt • Parabolic RT60 0.34s
                    </div>
                  </div>

                  {/* Soundwave frequency harmonic bars */}
                  <div className="flex items-end justify-center gap-1.5 h-8 mt-4 z-10">
                    {[20, 40, 75, 90, 60, 85, 45, 30, 65, 80].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          height: isPlayingFlute ? `${h}%` : '15%',
                        }}
                        className={cn(
                          'w-1.5 rounded-full transition-all duration-300',
                          isPlayingFlute ? 'bg-emerald-400' : 'bg-stone-800'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Bar: Audio Player */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400">Giai Điệu Mô Phỏng</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentMelody.title}</h3>
                    <p className="text-xs text-stone-400">{currentMelody.region} • {currentMelody.scale}</p>
                  </div>

                  <button
                    type="button"
                    onClick={toggleFluteAudio}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all min-h-[44px]',
                      isPlayingFlute
                        ? 'bg-emerald-500 text-stone-950 hover:bg-emerald-400'
                        : 'border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10'
                    )}
                  >
                    {isPlayingFlute ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        Dừng Tiếng Tiêu Sáo
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Lắng Nghe Thanh Khí Sáo Trúc
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-stone-400 italic font-light border-t border-stone-800/60 pt-2">
                  &ldquo;{currentMelody.description}&rdquo;
                </p>
              </div>
            </div>

            {/* Melody Selection Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FLUTE_MELODIES.map((melody) => {
                const isActive = melody.id === activeMelodyId
                return (
                  <button
                    key={melody.id}
                    type="button"
                    onClick={() => {
                      if (isPlayingFlute) stopAudio()
                      setActiveMelodyId(melody.id)
                    }}
                    className={cn(
                      'text-left p-3.5 border transition-all min-h-[44px]',
                      isActive
                        ? 'border-emerald-500 bg-emerald-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[11px] font-mono text-emerald-400 uppercase">{melody.region}</div>
                    <div className="text-xs font-medium text-stone-200 truncate mt-0.5">{melody.title}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Interactive Tabs & Lighting */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex border-b border-stone-800">
              <button
                type="button"
                onClick={() => setActiveTab('acoustics')}
                className={cn(
                  'px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all min-h-[44px]',
                  activeTab === 'acoustics'
                    ? 'border-emerald-400 text-emerald-400 bg-stone-900/40'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                )}
              >
                Âm Học Parabol &amp; Sáng
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('vault')}
                className={cn(
                  'px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all min-h-[44px]',
                  activeTab === 'vault'
                    ? 'border-emerald-400 text-emerald-400 bg-stone-900/40'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                )}
              >
                Tủ Trúc 55% RH
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('materials')}
                className={cn(
                  'px-4 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all min-h-[44px]',
                  activeTab === 'materials'
                    ? 'border-emerald-400 text-emerald-400 bg-stone-900/40'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                )}
              >
                Vật Liệu Mộc Bản Địa
              </button>
            </div>

            {/* Tab 1: Acoustics & Lighting */}
            {activeTab === 'acoustics' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block">
                    Kịch Bản Ánh Sáng Thiền Tịnh Rọi Điểm Sáo Trúc
                  </span>
                  <div className="space-y-2">
                    {Object.values(LIGHTING_MODES).map((mode) => {
                      const isSelected = mode.id === activeLighting
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => setActiveLighting(mode.id)}
                          className={cn(
                            'w-full text-left p-3 border transition-all min-h-[44px]',
                            isSelected
                              ? 'border-emerald-500 bg-emerald-500/10'
                              : 'border-stone-800 hover:border-stone-700 bg-stone-950/40'
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-stone-100">{mode.name}</span>
                            <span className="text-[10px] font-mono text-emerald-400">{mode.cri}</span>
                          </div>
                          <p className="text-[11px] text-stone-400 font-light mt-1">{mode.ambience}</p>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="p-4 border border-stone-800 bg-stone-950/50 space-y-2">
                  <span className="text-[11px] font-mono text-stone-300 block uppercase">
                    Nguyên Lý Tiêu Âm Đá Ong Xám &amp; Tre Hun Khói
                  </span>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    Đá ong xám Đồng Nai sở hữu cấu trúc rỗng tổ ong xốp tự nhiên, hấp thụ hoàn hảo các dải tần số từ 2.000 Hz đến 6.000 Hz — giải quyết triệt để hiện tượng chói gắt của tiếng sáo trúc trong phòng khép kín.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Climate Vault for Bamboo Flutes */}
            {activeTab === 'vault' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-200">
                    Tủ Bảo Tồn Nhạc Khí Hơi Truyền Thống
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Ẩm Tương Đối (RH)</span>
                    <span className="text-2xl font-mono text-emerald-400">55.0%</span>
                    <span className="block text-[10px] text-emerald-400 mt-1">Tránh nứt thân trúc mùa khô</span>
                  </div>
                  <div className="p-4 border border-stone-800 bg-stone-950/60">
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Nhiệt Độ Ổn Định</span>
                    <span className="text-2xl font-mono text-emerald-400">22.5°C</span>
                    <span className="block text-[10px] text-emerald-400 mt-1">Cân bằng ứng suất nhiệt</span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-400">
                  <div className="p-3 border border-stone-800 bg-stone-950/40">
                    <span className="text-emerald-300 font-medium block">1. Tiêu Bát Khổng Gốc Trúc Lão 60 Năm</span>
                    <span className="text-[11px] block mt-0.5 text-stone-400">Ống trúc dày 4.5mm, thông lòng nòng côn tinh xảo.</span>
                  </div>
                  <div className="p-3 border border-stone-800 bg-stone-950/40">
                    <span className="text-emerald-300 font-medium block">2. Sáo Trúc Hun Khói Lam Thượng Hạng</span>
                    <span className="text-[11px] block mt-0.5 text-stone-400">Hun khói bã mía 6 tháng, màu cánh gián tự nhiên bóng láng.</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Materials */}
            {activeTab === 'materials' && (
              <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-4 text-xs font-light text-stone-300">
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-emerald-400 font-mono block uppercase">1. Nan Tre Hun Khói Bã Mía Xử Lý Vi Sinh</span>
                  <p className="mt-1 text-stone-400">
                    Thu hoạch tre già trên 5 năm tuổi tại vùng đồi Thanh Hóa. Phương pháp hun khói truyền thống kết hợp xử lý vi sinh loại bỏ tinh bột, chống mọt vĩnh cửu mà không dùng hóa chất độc hại.
                  </p>
                </div>
                <div className="border-b border-stone-800 pb-3">
                  <span className="text-emerald-400 font-mono block uppercase">2. Phiến Đá Ong Xám Đồng Nai Cắt Thủ Công</span>
                  <p className="mt-1 text-stone-400">
                    Khai thác từ tầng bazan cổ Đồng Nai, cắt mỏng 25mm để lộ hàng ngàn lỗ mao dẫn thở tự nhiên, đóng vai trò như các bẫy âm dải trung cao.
                  </p>
                </div>
                <div>
                  <span className="text-emerald-400 font-mono block uppercase">3. Gương Âm Học Parabol Gỗ Gõ Đỏ</span>
                  <p className="mt-1 text-stone-400">
                    Mặt cong parabol tính toán chuẩn tỷ lệ vàng, gom luồng âm thanh vi diệu về đúng vị trí người thưởng trà ở trung tâm phòng.
                  </p>
                </div>
              </div>
            )}

            {/* Link CTA */}
            <div className="p-5 border border-emerald-500/30 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-emerald-400 tracking-wider">
                  Dự Toán Phòng Hòa Âm Bản Địa
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Bóc tách chi tiết hệ nan tre hun khói &amp; đá ong tiêu âm chuẩn phòng nghe.
                </p>
              </div>
              <Link
                href="/du-toan-chi-phi"
                className="whitespace-nowrap px-4 py-2 border border-emerald-500/60 text-emerald-300 hover:bg-emerald-500/20 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Bóc Tách Khối Lượng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
