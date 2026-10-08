'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type ErhuMelodyKey = 'da-co-hoai-lang' | 'luu-thuy-hanh-van'
export type ErhuLighting = 'lantern-memory' | 'autumn-moon' | 'poetic-salon'

interface ErhuSong {
  id: ErhuMelodyKey
  title: string
  subtitle: string
  scale: string
  tempoBpm: number
  description: string
  notes: { freq: number; duration: number; bowType: 'push' | 'pull' }[]
}

const ERHU_MELODIES: Record<ErhuMelodyKey, ErhuSong> = {
  'da-co-hoai-lang': {
    id: 'da-co-hoai-lang',
    title: 'Dạ Cổ Hoài Lang (Cao Văn Lầu)',
    subtitle: 'Vọng Cổ Hoài Niệm · Dây Oán Nam Bộ',
    scale: 'Ngũ Cung Oán (Hò - Xự - Xang - Xê - Cống)',
    tempoBpm: 68,
    description: 'Tiếng đàn Nhị da diết u buồn tựa tiếng lòng trông ngóng trong đêm trăng, âm thanh kéo nhả mềm mại nhờ lông vĩ ngựa thảo nguyên lướt giữa hai dây đồng.',
    notes: [
      { freq: 293.66, duration: 0.6, bowType: 'pull' }, // D4 (Hò)
      { freq: 329.63, duration: 0.5, bowType: 'push' }, // E4 (Xự)
      { freq: 392.00, duration: 0.6, bowType: 'pull' }, // G4 (Xang)
      { freq: 440.00, duration: 0.8, bowType: 'push' }, // A4 (Xê)
      { freq: 523.25, duration: 0.9, bowType: 'pull' }, // C5 (Cống)
      { freq: 440.00, duration: 0.6, bowType: 'push' }, // A4
      { freq: 392.00, duration: 0.5, bowType: 'pull' }, // G4
      { freq: 329.63, duration: 0.6, bowType: 'push' }, // E4
      { freq: 293.66, duration: 1.2, bowType: 'pull' }, // D4
    ],
  },
  'luu-thuy-hanh-van': {
    id: 'luu-thuy-hanh-van',
    title: 'Lưu Thủy Hành Vân',
    subtitle: 'Nước Chảy Mây Trôi · Khúc Nhạc Cung Đình',
    scale: 'Ngũ Cung Bắc Nhã Nhạc (C - D - F - G - A)',
    tempoBpm: 88,
    description: 'Giai điệu thanh thoát, bay bổng tựa làn mây lướt qua đỉnh núi Ngự Bình, nhịp kéo vĩ liền mạch không ngắt quãng.',
    notes: [
      { freq: 440.00, duration: 0.35, bowType: 'push' }, // A4
      { freq: 523.25, duration: 0.35, bowType: 'pull' }, // C5
      { freq: 587.33, duration: 0.45, bowType: 'push' }, // D5
      { freq: 659.25, duration: 0.5, bowType: 'pull' },  // E5
      { freq: 587.33, duration: 0.35, bowType: 'push' }, // D5
      { freq: 523.25, duration: 0.4, bowType: 'pull' },  // C5
      { freq: 440.00, duration: 0.7, bowType: 'push' },  // A4
    ],
  },
}

interface LightingPreset {
  id: ErhuLighting
  title: string
  cctKelvin: number
  description: string
  ambientClass: string
}

const LIGHTING_PRESETS: Record<ErhuLighting, LightingPreset> = {
  'lantern-memory': {
    id: 'lantern-memory',
    title: 'Đèn Lồng Hoài Niệm',
    cctKelvin: 2200,
    description: 'Sắc vàng ấm sâu như ánh đèn dầu góc nhà xưa Nam Bộ, làm nổi bật chất gỗ Mun sọc Khánh Hòa đen bóng.',
    ambientClass: 'from-[#2e180c] via-[#170c06] to-[#0c0502]',
  },
  'autumn-moon': {
    id: 'autumn-moon',
    title: 'Trăng Thu Dạ Khúc',
    cctKelvin: 2400,
    description: 'Ánh trăng huyền ảo tôn vinh hoa văn vảy da trăn gấm tự nhiên và các điểm xà cừ ngũ sắc trên cần đàn.',
    ambientClass: 'from-[#241c14] via-[#120e0a] to-[#080604]',
  },
  'poetic-salon': {
    id: 'poetic-salon',
    title: 'Thơ Ca Thính Phòng',
    cctKelvin: 2700,
    description: 'Ánh sáng nghệ thuật chuẩn bảo tàng CRI 98 tập trung vào vùng cộng hưởng âm học của đàn.',
    ambientClass: 'from-[#1c1813] via-[#0f0c09] to-[#070504]',
  },
}

export function SaigonAcousticErhuSanctuarySalon({ className }: { className?: string }) {
  const formId = useId()
  const [selectedSongKey, setSelectedSongKey] = useState<ErhuMelodyKey>('da-co-hoai-lang')
  const [lighting, setLighting] = useState<ErhuLighting>('autumn-moon')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [pythonSkinTensionPct, setPythonSkinTensionPct] = useState<number>(88)
  const [currentBowAction, setCurrentBowAction] = useState<'push' | 'pull' | 'rest'>('rest')

  // Web Audio Context & Node Refs
  const audioCtxRef = useRef<AudioContext | null>(null)
  const timeoutIdsRef = useRef<NodeJS.Timeout[]>([])

  function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioClass) {
        audioCtxRef.current = new AudioClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  useEffect(() => {
    return () => {
      timeoutIdsRef.current.forEach((t) => clearTimeout(t))
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  // Web Audio Erhu Synthesis: Bowed string with natural vibrato and python skin formant filter
  const playErhuNote = (freq: number, duration: number, bowType: 'push' | 'pull') => {
    const ctx = getAudioContext()
    if (!ctx) return

    setCurrentBowAction(bowType)
    const now = ctx.currentTime

    // Main Bowed String Sawtooth Oscillator (Harmonic richness of horsehair on metal string)
    const osc = ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(freq, now)

    // Gentle finger vibrato (5.5 Hz modulation)
    const vibrato = ctx.createOscillator()
    const vibratoGain = ctx.createGain()
    vibrato.frequency.setValueAtTime(5.5, now)
    vibratoGain.gain.setValueAtTime(freq * 0.015, now) // 1.5% pitch variation
    vibrato.connect(osc.frequency)
    vibrato.start(now)
    vibrato.stop(now + duration)

    // Formant Filter modeling Python Skin Tube Resonator
    // Peak resonance around 1,100Hz and damping above 3,500Hz to eliminate high harshness
    const skinFilter = ctx.createBiquadFilter()
    skinFilter.type = 'bandpass'
    const tensionFreq = 950 + (pythonSkinTensionPct / 100) * 450
    skinFilter.frequency.setValueAtTime(tensionFreq, now)
    skinFilter.Q.setValueAtTime(2.8, now)

    // High shelf filter dampening harsh frequencies > 3,000Hz (acoustically treated room)
    const highDampener = ctx.createBiquadFilter()
    highDampener.type = 'highshelf'
    highDampener.frequency.setValueAtTime(3200, now)
    highDampener.gain.setValueAtTime(-14, now)

    // Bow pressure envelope
    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0.001, now)
    gainNode.gain.linearRampToValueAtTime(0.24, now + 0.08) // Soft bow engagement
    gainNode.gain.setValueAtTime(0.22, now + duration * 0.8)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration)

    osc.connect(skinFilter)
    skinFilter.connect(highDampener)
    highDampener.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + duration + 0.05)
  }

  // Play Full Melody Routine
  const playSong = (key: ErhuMelodyKey) => {
    if (isPlaying) return
    setIsPlaying(true)
    timeoutIdsRef.current.forEach((t) => clearTimeout(t))
    timeoutIdsRef.current = []

    const song = ERHU_MELODIES[key]
    if (!song) return

    let cumulativeTime = 0
    song.notes.forEach((item, index) => {
      const tid = setTimeout(() => {
        playErhuNote(item.freq, item.duration, item.bowType)
        if (index === song.notes.length - 1) {
          setTimeout(() => {
            setIsPlaying(false)
            setCurrentBowAction('rest')
          }, item.duration * 1000)
        }
      }, cumulativeTime * 1000)
      timeoutIdsRef.current.push(tid)
      cumulativeTime += item.duration
    })
  }

  const currentLighting = LIGHTING_PRESETS[lighting]
  const currentSong = ERHU_MELODIES[selectedSongKey]

  return (
    <section className={cn('relative py-24 bg-[#0a0805] text-[#f7f5ed] overflow-hidden border-t border-b border-[#291f13]', className)}>
      {/* Background Lighting Ambience */}
      <div className={cn('absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] transition-all duration-1000', currentLighting.ambientClass)} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c140a] border border-[#382613] text-[#d99b66] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d99b66] animate-pulse" />
            Âm Học Nhạc Khí Dây Cung Da Trăn Gỗ Mun
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcf7] tracking-tight leading-tight">
            Thính Phòng Đàn Nhị Gỗ Mun Sọc <br className="hidden sm:inline" />
            <span className="italic font-light text-[#d99b66]">Bầu Đàn Da Trăn Gấm & Tiêu Âm Dải Cao RT60 0.34s</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#aba191] leading-relaxed">
            Thính phòng thiết kế chuyên sâu dành cho đàn Nhị và đàn Hồ chế tác từ gỗ Mun sọc Khánh Hòa quý hiếm kết hợp da trăn gấm tự nhiên. Hệ vách tiêu âm rãnh hẹp triệt tiêu hoàn toàn dải tần chói gắt 2.500Hz - 5.000Hz của dây đồng, làm nổi bật âm sắc trầm ấm, tha thiết tựa hơi thở con người. Tủ kính bảo quản 52% RH và 22.0°C.
          </p>
        </div>

        {/* Master Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Erhu Bowing Stage & Audio Performance (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#161008] to-[#0c0904] border border-[#2e2010] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Virtual Stage Viewport */}
              <div className="relative h-72 sm:h-88 rounded-xl overflow-hidden bg-[#070503] border border-[#21160a] flex flex-col justify-between p-6">
                {/* Python Skin Reticulated Texture Graphic Simulation */}
                <div 
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, #d99b66 1px, transparent 1px), repeating-linear-gradient(45deg, #1f1408 0px, #1f1408 2px, #0f0a04 2px, #0f0a04 12px)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Top Status Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d99b66]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#d6bda4]">
                      Gỗ Mun Sọc Khánh Hòa & Lông Đuôi Ngựa
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#8c7f6e] block">Thời Gian Vang</span>
                    <span className="text-sm font-mono text-[#d99b66] font-bold">RT60 = 0.34s</span>
                  </div>
                </div>

                {/* Center Erhu Graphic Silhouette with Dynamic Bowing Motion */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                  <div className="relative w-48 h-36 flex items-center justify-center">
                    {/* Erhu Vector Graphic */}
                    <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)]">
                      {/* Neck (Cần Đàn Gỗ Mun) */}
                      <rect x="78" y="10" width="5" height="130" rx="2" fill="#1c1308" stroke="#3d2a13" strokeWidth="1" />
                      {/* Tuning Pegs (Trục Đàn) */}
                      <path d="M 60 25 L 85 25" stroke="#d99b66" strokeWidth="3" strokeLinecap="round" />
                      <path d="M 60 40 L 85 40" stroke="#d99b66" strokeWidth="3" strokeLinecap="round" />
                      {/* Resonator Tube (Bầu Đàn Bọc Da Trăn) */}
                      <path d="M 65 110 L 95 110 L 100 145 L 60 145 Z" fill="#694622" stroke="#d99b66" strokeWidth="2" />
                      {/* Python Skin Scales on Soundboard */}
                      <ellipse cx="80" cy="115" rx="14" ry="4" fill="#8c5f32" />
                      {/* Two Strings (D4 & A4) */}
                      <line x1="79.5" y1="25" x2="79.5" y2="140" stroke="#e8eaed" strokeWidth="1.2" />
                      <line x1="81.5" y1="40" x2="81.5" y2="140" stroke="#e8eaed" strokeWidth="0.8" />
                      {/* Bamboo Bow with Horsehair (Vĩ Đàn) */}
                      <motion.line
                        animate={
                          currentBowAction === 'push'
                            ? { x1: 50, x2: 125, y1: 95, y2: 100 }
                            : currentBowAction === 'pull'
                            ? { x1: 35, x2: 110, y1: 100, y2: 95 }
                            : { x1: 40, x2: 115, y1: 98, y2: 98 }
                        }
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        stroke="#e5b47a"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Active Bow Direction Indicator */}
                    <AnimatePresence>
                      {currentBowAction !== 'rest' && (
                        <motion.span
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="absolute -bottom-2 text-[10px] font-mono text-[#d99b66] bg-[#1a1106] border border-[#382613] px-2 py-0.5 rounded shadow"
                        >
                          {currentBowAction === 'pull' ? '◄ Đẩy Vĩ Cung (Pull)' : 'Kéo Vĩ Cung (Push) ►'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Bottom Sound Controller Bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#21160a] bg-[#0c0803]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => playSong(selectedSongKey)}
                      disabled={isPlaying}
                      className={cn(
                        'min-h-[44px] px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border',
                        isPlaying
                          ? 'bg-[#d99b66]/20 border-[#d99b66] text-[#fdfcf7] shadow-[0_0_15px_rgba(217,155,102,0.3)]'
                          : 'bg-[#181106] border-[#382512] text-[#d99b66] hover:border-[#d99b66]'
                      )}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        {isPlaying ? (
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                      {isPlaying ? 'Đang Diễn Tấu Khúc Đàn' : `Nghe ${currentSong.title}`}
                    </button>
                  </div>

                  <span className="text-xs font-mono text-[#8c7f6e]">
                    Tủ Bảo Quản: 52% RH · 22.0°C
                  </span>
                </div>
              </div>

              {/* Technical Acoustic Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#24170a]">
                <div className="p-3 rounded-xl bg-[#0e0a05] border border-[#211508]">
                  <span className="text-[10px] text-[#7d715f] uppercase font-mono block">Chất Mộc Cần Đàn</span>
                  <span className="text-sm font-semibold text-[#f7f5ed]">Mun Sọc Khánh Hòa</span>
                  <span className="text-[10px] text-[#594f41] block mt-0.5">Khảm xà cừ ngũ sắc</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0e0a05] border border-[#211508]">
                  <span className="text-[10px] text-[#7d715f] uppercase font-mono block">Màng Da Bầu Đàn</span>
                  <span className="text-sm font-semibold text-[#d99b66]">Da Trăn Gấm Tự Nhiên</span>
                  <span className="text-[10px] text-[#594f41] block mt-0.5">Căng chỉnh thủ công</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0e0a05] border border-[#211508]">
                  <span className="text-[10px] text-[#7d715f] uppercase font-mono block">Lông Cung Vĩ</span>
                  <span className="text-sm font-mono font-bold text-[#f7f5ed]">Đuôi Ngựa Trắng</span>
                  <span className="text-[10px] text-[#594f41] block mt-0.5">Bôi nhựa thông tự nhiên</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0e0a05] border border-[#211508]">
                  <span className="text-[10px] text-[#7d715f] uppercase font-mono block">Tiêu Âm Dải Cao</span>
                  <span className="text-sm font-semibold text-[#d99b66]">2.500Hz - 5.000Hz</span>
                  <span className="text-[10px] text-[#594f41] block mt-0.5">Loại bỏ âm chói gắt</span>
                </div>
              </div>
            </div>

            {/* Acoustic Rationale */}
            <div className="p-6 rounded-2xl bg-[#100b05] border border-[#24170a] text-sm text-[#9e9483] space-y-3">
              <h3 className="text-base font-serif text-[#fdfcf7] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#d99b66] rounded-full" />
                Giải Pháp Âm Học Vòm Tiêu Âm Rãnh Hẹp Cho Đàn Nhị
              </h3>
              <p className="leading-relaxed">
                Đàn Nhị sở hữu âm lượng rất lớn nhờ màng da trăn cộng hưởng kín, nhưng dải tần từ 2.500Hz đến 5.000Hz rất dễ bị chói gắt và gây mệt mỏi thính giác nếu chơi trong phòng kín không xử lý âm học. GuHomes thiết kế hệ vách tán âm tiêu âm kết hợp nan gỗ xẻ rãnh hẹp (Helmholtz slot resonators) hút triệt để năng lượng chói gắt, lưu giữ nguyên vẹn âm hưởng ấm áp, ngân nga của từng đường kéo vĩ.
              </p>
            </div>
          </div>

          {/* Right Column: Melody Selector, Skin Tension Slider & Lighting (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Melody Selector */}
            <div className="rounded-2xl bg-[#161008] border border-[#2e2010] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#8c7f6e]">
                Tuyển Khúc Diễn Tấu Đàn Nhị
              </h3>

              <div className="space-y-3">
                {(Object.keys(ERHU_MELODIES) as ErhuMelodyKey[]).map((key) => {
                  const song = ERHU_MELODIES[key]
                  const isSelected = selectedSongKey === key
                  return (
                    <button
                      key={song.id}
                      type="button"
                      onClick={() => {
                        setSelectedSongKey(key)
                        playSong(key)
                      }}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#21160a] border-[#d99b66] shadow-[0_0_15px_rgba(217,155,102,0.18)]'
                          : 'bg-[#0f0a04] border-[#1f1408] hover:border-[#33210d]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fdfcf7] font-semibold' : 'text-[#cfc5b3]')}>
                          {song.title}
                        </span>
                        <span className="text-xs font-mono text-[#d99b66] font-bold">
                          {song.tempoBpm} BPM
                        </span>
                      </div>
                      <span className="text-xs text-[#8c7f6e] mt-1">{song.subtitle}</span>
                      <p className="text-xs text-[#a39885] mt-2 line-clamp-2 leading-relaxed">
                        {song.description}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Skin Tension Slider */}
              <div className="pt-3 border-t border-[#21160a]">
                <div className="flex justify-between text-xs font-mono mb-1.5">
                  <span className="text-[#8c7f6e]">Độ Căng Mặt Da Trăn Bầu Đàn</span>
                  <span className="text-[#d99b66] font-bold">{pythonSkinTensionPct}% Độ Căng</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  step="5"
                  value={pythonSkinTensionPct}
                  onChange={(e) => setPythonSkinTensionPct(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#1b1206] rounded-lg appearance-none cursor-pointer accent-[#d99b66]"
                  aria-label="Điều chỉnh độ căng da trăn"
                />
              </div>
            </div>

            {/* Lighting Scenarios */}
            <div className="rounded-2xl bg-[#161008] border border-[#2e2010] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#8c7f6e]">
                Kịch Bản Ánh Sáng Thính Phòng (CRI 98)
              </h3>

              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(LIGHTING_PRESETS) as ErhuLighting[]).map((lightKey) => {
                  const item = LIGHTING_PRESETS[lightKey]
                  const isSelected = lighting === lightKey
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLighting(lightKey)}
                      className={cn(
                        'min-h-[44px] p-2.5 rounded-xl border text-center transition-all duration-300 flex flex-col justify-center items-center',
                        isSelected
                          ? 'bg-[#24170a] border-[#d99b66] text-[#d99b66]'
                          : 'bg-[#0f0a04] border-[#1f1408] text-[#8c7f6e] hover:border-[#33210d]'
                      )}
                    >
                      <span className="text-xs font-medium block">{item.title}</span>
                      <span className="text-[10px] font-mono mt-0.5 opacity-80">{item.cctKelvin}K</span>
                    </button>
                  )
                })}
              </div>

              {/* Consultation Link */}
              <div className="pt-2">
                <a
                  href="/contact"
                  className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#d99b66] to-[#b37744] text-[#0d0904] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
                >
                  May Đo Không Gian Âm Nhạc Dân Gian
                </a>
              </div>
            </div>

            {/* Atelier Contact */}
            <div className="p-4 rounded-2xl bg-[#100b05] border border-[#24170a] text-xs text-[#8c7f6e] flex items-center justify-between">
              <div>
                <span className="text-[#fdfcf7] font-serif block">GuHomes Traditional Music Atelier</span>
                <span className="text-[11px] text-[#635848]">Xưởng Mộc Thạnh Xuân Q.12 · 1.200m²</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#d99b66] font-mono hover:underline min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
