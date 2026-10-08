'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CastanetTrack {
  id: string
  title: string
  region: string
  tempo: number
  compas: string
  description: string
  acousticNote: string
}

interface CastanetTechnique {
  id: string
  name: string
  spanishName: string
  vietnameseName: string
  frequency: string
  decay: number
  description: string
  castanetPart: string
}

interface AcousticAtmosphere {
  id: string
  name: string
  kelvin: number
  lux: number
  mood: string
  colorHex: string
}

const CASTANET_TRACKS: CastanetTrack[] = [
  {
    id: 'bulerias-jerez',
    title: 'Bulerías de Jerez Hoàng Hôn',
    region: 'Andalusia giao thoa vi khí hậu Sài Gòn',
    tempo: 120,
    compas: 'Nhịp 12 phách phóng khoáng',
    description: 'Tiết tấu bùng nổ đặc trưng xứ Jerez với kỹ thuật cuộn phách Carretilla liên hoàn trên nền vòm gỗ Cẩm Lai Bà Rịa.',
    acousticNote: 'Khử dội đa tần, giữ độ đanh thép 3.2kHz mà không gắt chói'
  },
  {
    id: 'fandango-huelva',
    title: 'Fandango de Huelva Trầm Mặc',
    region: 'Nam Tây Ban Nha đượm sắc hương mộc',
    tempo: 132,
    compas: 'Nhịp 3/4 rộn rã trữ tình',
    description: 'Cú gõ Golpe trầm dứt khoát của phách đực Macho hòa quyện nhịp gót giày Flamenco dậm trên sàn Teak tự nhiên.',
    acousticNote: 'Soundboard Hoàng Đàn tuyết tỏa hương và mở rộng âm trường stereo'
  },
  {
    id: 'cung-dinh-giao-thoa',
    title: 'Vũ Điệu Giao Thoa Cung Đình',
    region: 'Âm hưởng Việt Nam đương đại',
    tempo: 108,
    compas: 'Nhịp đôi giao thoa phách tiền',
    description: 'Sự kết hợp độc bản giữa phách gỗ Mun sừng Khánh Hòa và Castanets, tạo nên đối thoại văn hóa tinh tế chuẩn GuHomes.',
    acousticNote: 'RT60 tinh chuẩn 0.30s cho tiếng phách dòn tan và hậu âm sâu thẳm'
  }
]

const CASTANET_TECHNIQUES: CastanetTechnique[] = [
  {
    id: 'carretilla',
    name: 'Carretilla (Lăn Phách Cuộn)',
    spanishName: 'Carretilla Clásica',
    vietnameseName: 'Cuộn 4 ngón tay phải vào má phách cái Hembra',
    frequency: '3.400 Hz',
    decay: 0.09,
    description: '4 ngón tay phải lướt nhanh liên hoàn (út, áp út, giữa, trỏ) tạo chuỗi âm thanh giòn tan, nhịp nhàng tựa sóng nước.',
    castanetPart: 'Phách cái Hembra (Tay phải, âm bổng)'
  },
  {
    id: 'golpe',
    name: 'Golpe (Cú Gõ Đơn Dứt Khoát)',
    spanishName: 'Golpe Seco de Macho',
    vietnameseName: 'Cú gõ dứt khoát bằng ngón giữa tay trái',
    frequency: '1.850 Hz',
    decay: 0.16,
    description: 'Gõ mạnh vào tâm phách đực Macho tạo điểm nhấn giữ nhịp compás vững chãi và tròn đầy.',
    castanetPart: 'Phách đực Macho (Tay trái, âm trầm)'
  },
  {
    id: 'choque',
    name: 'Choque (Đập Má Phách Đôi)',
    spanishName: 'Choque Frontal',
    vietnameseName: 'Hai má phách chạm nhau tạo âm kim loại sắc sảo',
    frequency: '4.200 Hz',
    decay: 0.06,
    description: 'Hai cặp phách va chạm trực diện tạo âm thanh đanh thép, đẩy cao trào cảm xúc vũ đạo đỉnh cao.',
    castanetPart: 'Giao thoa hai cặp phách'
  },
  {
    id: 'zapateado',
    name: 'Zapateado (Dậm Gót Thính Phòng)',
    spanishName: 'Zapateado Flamenco Floor',
    vietnameseName: 'Xung âm gót giày dậm sàn gỗ Mun cách âm',
    frequency: '85 Hz',
    decay: 0.28,
    description: 'Cộng hưởng âm trầm của đế giày Flamenco trên hệ sàn treo lò xo cao su tự nhiên cách âm 55dB.',
    castanetPart: 'Sàn thính phòng tiêu âm đa tầng'
  }
]

const ACOUSTIC_ATMOSPHERES: AcousticAtmosphere[] = [
  {
    id: 'sunset-2200k',
    name: 'Hoàng Hôn Sông Sài Gòn (2200K)',
    kelvin: 2200,
    lux: 40,
    mood: 'Trầm mặc, huyền bí, ấm cúng',
    colorHex: '#e58e38'
  },
  {
    id: 'flamenco-candle-2700k',
    name: 'Ánh Nến Flamenco Sevilla (2700K)',
    kelvin: 2700,
    lux: 65,
    mood: 'Nồng nàn, tôn vinh thớ gỗ Cẩm Lai',
    colorHex: '#d4af37'
  },
  {
    id: 'concert-studio-3200k',
    name: 'Thính Phòng Hòa Tấu (3200K)',
    kelvin: 3200,
    lux: 110,
    mood: 'Sắc nét, tập trung, chuẩn phòng thu',
    colorHex: '#f0d999'
  }
]

export function SaigonAcousticCastanetsSanctuarySalon() {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [activeTechnique, setActiveTechnique] = useState<string>('carretilla')
  const [activeAtmosphereIndex, setActiveAtmosphereIndex] = useState<number>(1)
  const [rt60Value, setRt60Value] = useState<number>(0.30)
  const [soundboardThickness, setSoundboardThickness] = useState<number>(12)
  const [activeTab, setActiveTab] = useState<'percussion' | 'acoustics' | 'craftsmanship'>('percussion')

  const audioCtxRef = useRef<AudioContext | null>(null)
  const loopTimerRef = useRef<NodeJS.Timeout | null>(null)

  const selectedTrack = (CASTANET_TRACKS[selectedTrackIndex] ?? CASTANET_TRACKS[0]) as CastanetTrack
  const activeAtmosphere = (ACOUSTIC_ATMOSPHERES[activeAtmosphereIndex] ?? ACOUSTIC_ATMOSPHERES[0]) as AcousticAtmosphere

  useEffect(() => {
    return () => {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const getAudioContext = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  const triggerTechniqueSound = (techId: string) => {
    setActiveTechnique(techId)
    const ctx = getAudioContext()
    const now = ctx.currentTime

    const tech = (CASTANET_TECHNIQUES.find((t) => t.id === techId) ?? CASTANET_TECHNIQUES[0]) as CastanetTechnique

    if (tech.id === 'carretilla') {
      // Rapid rolling clacks (4 burst impulses)
      const burstOffsets = [0, 0.022, 0.044, 0.068]
      const pitches = [3200, 3400, 3600, 3800]

      burstOffsets.forEach((offset, idx) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const filter = ctx.createBiquadFilter()

        osc.type = 'triangle'
        const pitch = pitches[idx] ?? 3400
        osc.frequency.setValueAtTime(pitch, now + offset)
        osc.frequency.exponentialRampToValueAtTime(pitch * 0.4, now + offset + 0.02)

        filter.type = 'bandpass'
        filter.frequency.value = pitch
        filter.Q.value = 6.0

        gain.gain.setValueAtTime(0.35 + idx * 0.08, now + offset)
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.04)

        osc.connect(filter)
        filter.connect(gain)
        gain.connect(ctx.destination)

        osc.start(now + offset)
        osc.stop(now + offset + 0.045)
      })
    } else if (tech.id === 'golpe') {
      // Deep firm golpe on Macho castanet
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1950, now)
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.06)

      filter.type = 'bandpass'
      filter.frequency.value = 1850
      filter.Q.value = 4.5

      gain.gain.setValueAtTime(0.65, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + tech.decay)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + tech.decay)
    } else if (tech.id === 'choque') {
      // Crisp high clashing sound with short noise transient
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(4200, now)
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.03)

      gain.gain.setValueAtTime(0.5, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + tech.decay)

      const bufferSize = Math.floor(ctx.sampleRate * 0.03)
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.5
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer

      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'highpass'
      noiseFilter.frequency.value = 3500

      const noiseGain = ctx.createGain()
      noiseGain.gain.setValueAtTime(0.45, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

      whiteNoise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      whiteNoise.start(now)
      osc.stop(now + tech.decay)
      whiteNoise.stop(now + 0.03)
    } else {
      // Zapateado footwork low resonance
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(120, now)
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.12)

      gain.gain.setValueAtTime(0.75, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + tech.decay)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + tech.decay)
    }
  }

  const togglePlayback = () => {
    if (isPlaying) {
      if (loopTimerRef.current) clearInterval(loopTimerRef.current)
      setIsPlaying(false)
      return
    }

    setIsPlaying(true)
    const bpm = selectedTrack.tempo
    const stepIntervalMs = Math.round((60000 / bpm) / 2)
    let stepCount = 0

    loopTimerRef.current = setInterval(() => {
      const patternIndex = stepCount % 12
      if (patternIndex === 0 || patternIndex === 6) {
        triggerTechniqueSound('zapateado')
      } else if (patternIndex === 3 || patternIndex === 8 || patternIndex === 10) {
        triggerTechniqueSound('golpe')
      } else if (patternIndex === 1 || patternIndex === 4 || patternIndex === 7) {
        triggerTechniqueSound('carretilla')
      } else if (patternIndex === 11) {
        triggerTechniqueSound('choque')
      }
      stepCount++
    }, stepIntervalMs)
  }

  return (
    <section className="relative w-full bg-[#0e0b08] text-[#ede5d8] py-24 px-4 sm:px-6 lg:px-8 border-y border-[#2a2018] overflow-hidden">
      {/* Decorative Atmosphere Glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: activeAtmosphere.colorHex }}
      />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] rounded-full blur-[120px] bg-[#d4af37]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#251d16] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1610] border border-[#3e2c1c] text-[#d4af37] text-xs font-mono tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              Saigon Acoustic Castanets Sanctuary · GuHomes Studio
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#fbf6ee] tracking-tight">
              Thính Phòng Hòa Âm Phách Gỗ Castanets
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#a99988] max-w-2xl font-light leading-relaxed">
              Kiến trúc âm học vòm gỗ Cẩm Lai Bà Rịa nan Fibonacci tán âm góc 137.5°, soundboard Hoàng Đàn tuyết tỏa hương và sàn treo tiêu âm đa tầng triệt tiêu tạp âm nhiệt đới Sài Gòn.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="block text-[11px] font-mono text-[#8c7a68] uppercase tracking-wider">Chuẩn Âm Học Thính Phòng</span>
              <span className="text-xl md:text-2xl font-mono text-[#d4af37] font-semibold">RT60 = {rt60Value.toFixed(2)}s</span>
              <span className="block text-[11px] text-[#00b894]">Độ ẩm vi khí hậu 50.8% RH</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-[#251d16] pb-3 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('percussion')}
            className={cn(
              "px-5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all min-h-[44px] cursor-pointer whitespace-nowrap",
              activeTab === 'percussion'
                ? "bg-[#251a11] text-[#e5c158] border border-[#4d341c] shadow-inner"
                : "text-[#8c7a68] hover:text-[#fbf6ee] hover:bg-[#18120c]"
            )}
          >
            Nhịp Phách & Tương Tác Âm Sắc
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('acoustics')}
            className={cn(
              "px-5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all min-h-[44px] cursor-pointer whitespace-nowrap",
              activeTab === 'acoustics'
                ? "bg-[#251a11] text-[#e5c158] border border-[#4d341c] shadow-inner"
                : "text-[#8c7a68] hover:text-[#fbf6ee] hover:bg-[#18120c]"
            )}
          >
            Vật Lý Âm Học Vòm Gỗ Fibonacci
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('craftsmanship')}
            className={cn(
              "px-5 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all min-h-[44px] cursor-pointer whitespace-nowrap",
              activeTab === 'craftsmanship'
                ? "bg-[#251a11] text-[#e5c158] border border-[#4d341c] shadow-inner"
                : "text-[#8c7a68] hover:text-[#fbf6ee] hover:bg-[#18120c]"
            )}
          >
            Chế Tác Gỗ Quý & Vi Khí Hậu
          </button>
        </div>

        {/* Tab 1: Interactive Percussion Stage & Web Audio */}
        {activeTab === 'percussion' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Left 7 cols: Interactive Castanet Soundboard */}
            <div className="lg:col-span-7 bg-[#15100c] rounded-2xl p-6 md:p-8 border border-[#2b1f15] shadow-2xl relative">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#251a11]">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Tương Tác Phách Gỗ Castanets</span>
                  <h3 className="text-xl font-serif text-[#fbf6ee] mt-1">Cặp Phách Gỗ Mun Sừng & Cẩm Lai Bà Rịa</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-[#20150d] text-[#b5a392] border border-[#392415]">
                  Dây Buộc Lụa Tơ Tằm
                </span>
              </div>

              {/* Castanet Interactive Striking Pads */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {CASTANET_TECHNIQUES.map((tech) => (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => triggerTechniqueSound(tech.id)}
                    className={cn(
                      "p-5 rounded-xl border text-left transition-all min-h-[44px] cursor-pointer flex flex-col justify-between group",
                      activeTechnique === tech.id
                        ? "border-[#d4af37] bg-[#271b11] shadow-[0_0_24px_rgba(212,175,55,0.25)]"
                        : "border-[#2b1f15] bg-[#110d0a] hover:border-[#4d351e]"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-serif font-semibold text-[#fbf6ee] group-hover:text-[#e5c158] transition-colors">
                          {tech.name}
                        </span>
                        <span className="text-xs font-mono text-[#d4af37]">{tech.frequency}</span>
                      </div>
                      <span className="block text-[11px] text-[#c5a880] mb-2">{tech.vietnameseName}</span>
                      <p className="text-xs text-[#8c7a68] line-clamp-2">{tech.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#251a11] flex items-center justify-between text-[11px] text-[#716152]">
                      <span>{tech.castanetPart}</span>
                      <span className="text-[#d4af37] font-mono group-hover:translate-x-0.5 transition-transform">Gõ thử →</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Atmosphere / Lighting Controller */}
              <div className="pt-5 border-t border-[#251a11]">
                <span className="block text-xs uppercase tracking-wider text-[#b5a392] mb-3">
                  Không Gian Ánh Sáng Thính Phòng:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ACOUSTIC_ATMOSPHERES.map((atm, idx) => (
                    <button
                      key={atm.id}
                      type="button"
                      onClick={() => setActiveAtmosphereIndex(idx)}
                      className={cn(
                        "p-3 rounded-lg border text-left transition-all min-h-[44px] cursor-pointer",
                        activeAtmosphereIndex === idx
                          ? "border-[#d4af37] bg-[#22160d]"
                          : "border-[#251a11] bg-[#110d0a] hover:border-[#3d2716]"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: atm.colorHex }} />
                        <span className="text-xs font-medium text-[#fbf6ee]">{atm.name}</span>
                      </div>
                      <span className="text-[10px] text-[#8c7a68]">{atm.mood}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Track Repertoire & Playback */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-[#15100c] rounded-2xl p-6 border border-[#2b1f15] shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#251a11]">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">Trích Đoạn Hòa Âm Mộc</h4>
                  <span className="text-[11px] text-[#8c7a68]">Web Audio Engine</span>
                </div>

                <div className="flex flex-col gap-3 mb-5">
                  {CASTANET_TRACKS.map((track, idx) => (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => {
                        if (isPlaying && loopTimerRef.current) {
                          clearInterval(loopTimerRef.current)
                          setIsPlaying(false)
                        }
                        setSelectedTrackIndex(idx)
                      }}
                      className={cn(
                        "text-left p-4 rounded-xl border transition-all min-h-[44px] cursor-pointer",
                        selectedTrackIndex === idx
                          ? "border-[#d4af37] bg-[#24170d]"
                          : "border-[#251a11] bg-[#110d0a] hover:border-[#3d2716]"
                      )}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-serif font-medium text-[#fbf6ee]">{track.title}</span>
                        <span className="text-xs font-mono text-[#d4af37]">{track.tempo} BPM</span>
                      </div>
                      <span className="block text-[11px] text-[#c5a880] mb-1">{track.compas}</span>
                      <p className="text-xs text-[#8c7a68] mb-2">{track.description}</p>
                      <span className="text-[10px] text-[#00b894] block">Âm học: {track.acousticNote}</span>
                    </button>
                  ))}
                </div>

                {/* Master Play Button */}
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#c59b27] via-[#d4af37] to-[#e5c158] text-[#120d08] font-semibold text-sm tracking-wide uppercase shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                      <span>Tạm Dừng Hòa Âm</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span>Phát Khúc Hòa Tấu Thính Phòng</span>
                    </>
                  )}
                </button>
              </div>

              {/* Consultation Card */}
              <div className="p-6 rounded-2xl bg-[#17110c] border border-[#2d1f14]">
                <h4 className="text-sm font-serif font-medium text-[#fbf6ee] mb-2">Đăng Ký Trải Nghiệm Thính Phòng</h4>
                <p className="text-xs text-[#a99988] mb-4 leading-relaxed">
                  Trải nghiệm trực tiếp tại xưởng mộc nghệ nhân Thạnh Xuân 1.200m² hoặc đặt hàng thiết kế thính phòng tư gia độc bản (trần giới hạn 12 công trình/năm).
                </p>
                <div className="flex items-center justify-between text-xs font-mono text-[#d4af37]">
                  <span>Hotline: 0368 757 916</span>
                  <span>Email: guhomesvn@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Acoustics Physics & Fibonacci Diffuser */}
        {activeTab === 'acoustics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            <div className="lg:col-span-8 bg-[#15100c] rounded-2xl p-6 md:p-8 border border-[#2b1f15]">
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Vật Lý Kiến Trúc Âm Học</span>
              <h3 className="text-2xl font-serif text-[#fbf6ee] mt-1 mb-4">
                Hệ Vòm Nan Gỗ Cẩm Lai Tán Âm Fibonacci 137.5°
              </h3>
              <p className="text-sm text-[#a99988] leading-relaxed mb-6 font-light">
                Tiếng gõ phách Castanets chứa năng lượng tức thời rất lớn ở dải tần bổng 2.400Hz - 4.800Hz. Nếu thính phòng xây dựng bằng vách phẳng thông thường, hiện tượng dội âm flutter echo sẽ làm méo tiếng. GuHomes ứng dụng tỷ lệ vàng Fibonacci với nan gỗ cong góc 137.5°, phân tán năng lượng âm thanh đều khắp không gian 360 độ.
              </p>

              {/* Interactive Acoustic Slider */}
              <div className="space-y-6 pt-4 border-t border-[#251a11]">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="rt60-slider" className="text-xs uppercase tracking-wider text-[#b5a392]">
                      Thời Gian Dư Vang Chuẩn (RT60):
                    </label>
                    <span className="text-sm font-mono text-[#d4af37] font-semibold">{rt60Value.toFixed(2)} giây</span>
                  </div>
                  <input
                    id="rt60-slider"
                    type="range"
                    min="0.20"
                    max="0.50"
                    step="0.01"
                    value={rt60Value}
                    onChange={(e) => setRt60Value(parseFloat(e.target.value))}
                    className="w-full h-2 bg-[#2a1d13] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                  />
                  <div className="flex justify-between text-[11px] text-[#716152] mt-1">
                    <span>Khô đặc (0.20s · Thu âm mộc)</span>
                    <span className="text-[#d4af37]">Chuẩn thính phòng GuHomes (0.30s)</span>
                    <span>Vang dài (0.50s · Nhà hát thính phòng lớn)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="soundboard-thickness" className="text-xs uppercase tracking-wider text-[#b5a392]">
                      Độ Dày Soundboard Hoàng Đàn Tuyết Lạng Sơn:
                    </label>
                    <span className="text-sm font-mono text-[#d4af37] font-semibold">{soundboardThickness} mm</span>
                  </div>
                  <input
                    id="soundboard-thickness"
                    type="range"
                    min="8"
                    max="20"
                    step="1"
                    value={soundboardThickness}
                    onChange={(e) => setSoundboardThickness(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-[#2a1d13] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                  />
                  <div className="flex justify-between text-[11px] text-[#716152] mt-1">
                    <span>8mm (Nhạy cao tần)</span>
                    <span className="text-[#d4af37]">12mm (Cân bằng tối ưu độ ấm & giòn)</span>
                    <span>20mm (Âm trầm dày sâu)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-[#15100c] border border-[#2b1f15]">
                <h4 className="text-xs font-mono uppercase text-[#d4af37] mb-2 tracking-wider">Thông Số Kỹ Thuật Âm Học</h4>
                <dl className="space-y-3 text-xs">
                  <div className="flex justify-between pb-2 border-b border-[#251a11]">
                    <dt className="text-[#8c7a68]">Hệ số tiêu âm NRC:</dt>
                    <dd className="font-mono text-[#fbf6ee]">0.82</dd>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#251a11]">
                    <dt className="text-[#8c7a68]">Khả năng cách âm STC:</dt>
                    <dd className="font-mono text-[#fbf6ee]">58 dB</dd>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#251a11]">
                    <dt className="text-[#8c7a68]">Vật liệu soundboard:</dt>
                    <dd className="font-serif text-[#fbf6ee]">Hoàng Đàn tuyết sấy 5 năm</dd>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-[#251a11]">
                    <dt className="text-[#8c7a68]">Kết cấu vách nan:</dt>
                    <dd className="font-mono text-[#fbf6ee]">Gỗ Cẩm Lai Bà Rịa 137.5°</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#8c7a68]">Hệ sàn triệt tiêu rung:</dt>
                    <dd className="font-mono text-[#fbf6ee]">Lò xo cao su đúc nguyên khối</dd>
                  </div>
                </dl>
              </div>

              <div className="p-6 rounded-2xl bg-[#17110c] border border-[#2d1f14]">
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-1">Triết Lý Thiết Kế</span>
                <p className="text-xs text-[#a99988] leading-relaxed">
                  Mỗi thính phòng hòa âm của GuHomes được đo đạc bằng microphone B&K đa hướng chuẩn phòng lab trước khi bàn giao cho gia chủ, đảm bảo dải động âm thanh hoàn mỹ nhất.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Craftsmanship & Microclimate */}
        {activeTab === 'craftsmanship' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="p-6 rounded-2xl bg-[#15100c] border border-[#2b1f15]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block mb-2">01 · Gỗ Quý Bản Địa</span>
              <h4 className="text-lg font-serif text-[#fbf6ee] mb-2">Cẩm Lai Bà Rịa & Mun Sừng Khánh Hòa</h4>
              <p className="text-xs text-[#a99988] leading-relaxed">
                Được tuyển chọn từ các phiến gỗ lõi tích tuổi trên 60 năm, thớ mịn đặc khít có tỷ trọng cao hơn nước (1.15 g/cm³), chống cong vênh tuyệt đối trước độ ẩm cao miền nhiệt đới.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#15100c] border border-[#2b1f15]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block mb-2">02 · Vi Khí Hậu Tự Nhiên</span>
              <h4 className="text-lg font-serif text-[#fbf6ee] mb-2">Cân Bằng Ẩm 50% - 52% RH</h4>
              <p className="text-xs text-[#a99988] leading-relaxed">
                Hệ thống kiểm soát nhiệt ẩm thông minh duy trì buồng cộng hưởng luôn ổn định, giữ tinh dầu thơm Hoàng Đàn không bị bay hơi và bảo vệ dây buộc lụa tơ tằm nguyên bản.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#15100c] border border-[#2b1f15]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#d4af37] block mb-2">03 · Tinh Hoa Nghệ Nhân</span>
              <h4 className="text-lg font-serif text-[#fbf6ee] mb-2">Xưởng Thạnh Xuân 1.200m²</h4>
              <p className="text-xs text-[#a99988] leading-relaxed">
                Đội ngũ thợ mộc tay nghề trên 20 năm thực hiện kỹ thuật ghép mộng âm dương không đinh kim loại, tạo nên khối liền lạc dẫn truyền sóng âm không bị ngắt quãng.
              </p>
            </div>
          </div>
        )}

        {/* Footer Guarantee Strip */}
        <div className="p-6 rounded-2xl bg-[#140e0a] border border-[#2b1e14] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <span className="text-xs text-[#c5a880] font-medium">
              GuHomes cam kết trần 12 công trình tư gia cao cấp mỗi năm để đảm bảo độ hoàn thiện tỉ mỉ nhất
            </span>
          </div>
          <span className="text-xs font-mono text-[#8c7a68]">Hotline tư vấn âm học: 0368 757 916</span>
        </div>
      </div>
    </section>
  )
}
