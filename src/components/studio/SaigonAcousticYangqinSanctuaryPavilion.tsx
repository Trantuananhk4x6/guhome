'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type YangqinPlayStyle = 'single-placid' | 'tremolo-roll' | 'pentatonic-flow'
export type YangqinLighting = 'candlelight' | 'gallery-warm' | 'zen-studio'

interface YangqinPiece {
  id: string
  title: string
  subtitle: string
  tempoBpm: number
  notes: { freq: number; duration: number }[]
  description: string
}

const YANGQIN_PIECES: Record<string, YangqinPiece> = {
  'suoi-hoa': {
    id: 'suoi-hoa',
    title: 'Suối Hoa Róc Rách',
    subtitle: 'Nốt Ngân Tinh Khiết · Ngũ Cung Bắc',
    tempoBpm: 108,
    description: 'Âm thanh gõ dồn dập nhẹ tựa giọt sương rơi trên phiến lá Sa Mộc, rung ngân lan tỏa qua 36 cung tơ đồng thau.',
    notes: [
      { freq: 523.25, duration: 0.18 }, // C5
      { freq: 587.33, duration: 0.18 }, // D5
      { freq: 659.25, duration: 0.22 }, // E5
      { freq: 783.99, duration: 0.22 }, // G5
      { freq: 880.00, duration: 0.35 }, // A5
      { freq: 783.99, duration: 0.2 },
      { freq: 659.25, duration: 0.2 },
      { freq: 523.25, duration: 0.4 },
    ],
  },
  'ly-ngua-o': {
    id: 'ly-ngua-o',
    title: 'Lý Ngựa Ô Nam Bộ',
    subtitle: 'Âm Hưởng Rộn Ràng · Nhịp Điệu Đồng Bằng',
    tempoBpm: 128,
    description: 'Kỹ thuật vê dùi tre liên hoàn bọc nỉ tạo nên tiết tấu dồn dập, khỏe khoắn nhưng vẫn giữ được sự tinh tế sang trọng.',
    notes: [
      { freq: 392.00, duration: 0.15 }, // G4
      { freq: 440.00, duration: 0.15 }, // A4
      { freq: 523.25, duration: 0.15 }, // C5
      { freq: 587.33, duration: 0.22 }, // D5
      { freq: 659.25, duration: 0.15 }, // E5
      { freq: 587.33, duration: 0.15 }, // D5
      { freq: 523.25, duration: 0.3 },  // C5
    ],
  },
}

interface LightingPreset {
  id: YangqinLighting
  title: string
  cctKelvin: number
  description: string
  ambientClass: string
}

const LIGHTING_PRESETS: Record<YangqinLighting, LightingPreset> = {
  candlelight: {
    id: 'candlelight',
    title: 'Ánh Nến Mờ Ảo',
    cctKelvin: 2400,
    description: 'Ánh sáng vàng hổ phách dịu êm làm nổi bật thớ gỗ Hương Đá đỏ sẫm và dây kim loại sáng lấp lánh.',
    ambientClass: 'from-[#2e1d13] via-[#140c07] to-[#0a0604]',
  },
  'gallery-warm': {
    id: 'gallery-warm',
    title: 'Phòng Trưng Bày Nghệ Thuật',
    cctKelvin: 2700,
    description: 'Chùm sáng rọi điểm góc 24 độ CRI 98 tập trung vào mặt đàn Sa Mộc 5 năm tuổi, triệt tiêu mọi phản chiếu chói lóa.',
    ambientClass: 'from-[#28231a] via-[#14110c] to-[#0a0806]',
  },
  'zen-studio': {
    id: 'zen-studio',
    title: 'Tĩnh Lặng Thiền Thất',
    cctKelvin: 3000,
    description: 'Nhiệt độ màu trung tính ấm, mang lại bầu không khí tập trung cao độ cho nghệ sĩ diễn tấu thính phòng.',
    ambientClass: 'from-[#1f2622] via-[#0f1411] to-[#080a09]',
  },
}

export function SaigonAcousticYangqinSanctuaryPavilion({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPieceId, setSelectedPieceId] = useState<string>('suoi-hoa')
  const [playStyle, setPlayStyle] = useState<YangqinPlayStyle>('tremolo-roll')
  const [lighting, setLighting] = useState<YangqinLighting>('gallery-warm')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [activeStringIndex, setActiveStringIndex] = useState<number | null>(null)

  // Web Audio Refs
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

  // Web Audio struck dulcimer string synthesis
  const strikeStringNote = (freq: number, duration: number, index: number) => {
    const ctx = getAudioContext()
    if (!ctx) return

    setActiveStringIndex(index)
    setTimeout(() => {
      setActiveStringIndex((prev) => (prev === index ? null : prev))
    }, duration * 1000)

    const now = ctx.currentTime

    // Hammer attack transient
    const attackOsc = ctx.createOscillator()
    const attackGain = ctx.createGain()
    attackOsc.type = 'triangle'
    attackOsc.frequency.setValueAtTime(freq * 3, now)
    attackGain.gain.setValueAtTime(0.12, now)
    attackGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03)

    attackOsc.connect(attackGain)
    attackGain.connect(ctx.destination)
    attackOsc.start(now)
    attackOsc.stop(now + 0.035)

    // Struck metallic string resonance (sine + mild harmonic decay)
    const osc = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const noteGain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now)

    osc2.type = 'sine'
    osc2.frequency.setValueAtTime(freq * 2.01, now) // Slight detuned octave for metallic wire shimmer

    const osc2Gain = ctx.createGain()
    osc2Gain.gain.setValueAtTime(0.25, now)
    osc2.connect(osc2Gain)

    noteGain.gain.setValueAtTime(0.01, now)
    noteGain.gain.linearRampToValueAtTime(0.24, now + 0.015)
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + Math.max(duration * 2.2, 0.45))

    osc.connect(noteGain)
    osc2Gain.connect(noteGain)
    noteGain.connect(ctx.destination)

    osc.start(now)
    osc2.start(now)
    osc.stop(now + Math.max(duration * 2.3, 0.5))
    osc2.stop(now + Math.max(duration * 2.3, 0.5))
  }

  // Play Piece Sequence
  const playPerformance = (pieceKey: string) => {
    if (isPlaying) return
    setIsPlaying(true)
    timeoutIdsRef.current.forEach((t) => clearTimeout(t))
    timeoutIdsRef.current = []

    const piece = YANGQIN_PIECES[pieceKey]
    if (!piece) return

    let cumulativeTime = 0
    piece.notes.forEach((noteItem, idx) => {
      const tid = setTimeout(() => {
        strikeStringNote(noteItem.freq, noteItem.duration, idx % 6)
        if (idx === piece.notes.length - 1) {
          setIsPlaying(false)
        }
      }, cumulativeTime * 1000)
      timeoutIdsRef.current.push(tid)
      cumulativeTime += noteItem.duration * (playStyle === 'single-placid' ? 1.4 : playStyle === 'tremolo-roll' ? 0.85 : 1.1)
    })
  }

  const currentLighting = LIGHTING_PRESETS[lighting]
  const currentPiece = YANGQIN_PIECES[selectedPieceId] || YANGQIN_PIECES['suoi-hoa']

  return (
    <section className={cn('relative py-24 bg-[#0c0a07] text-[#f7f5ed] overflow-hidden border-t border-b border-[#2d251a]', className)}>
      {/* Dynamic Lighting Ambience Background */}
      <div className={cn('absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] transition-all duration-1000', currentLighting.ambientClass)} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c160e] border border-[#3b2f1f] text-[#dfb87c] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#dfb87c] animate-pulse" />
            Âm Học Thính Phòng Đàn Dây Gõ Cổ Truyền
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcf7] tracking-tight leading-tight">
            Thính Phòng Đàn Tam Thập Lục Gỗ Hương <br className="hidden sm:inline" />
            <span className="italic font-light text-[#dfb87c]">36 Cung Tơ Đồng Thau & Vách Parabol RT60 0.35s</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#aba494] leading-relaxed">
            Tôn vinh cây đàn Tam Thập Lục 36 dây tơ kim loại truyền thống với mặt đàn gỗ Sa Mộc ủ khô 5 năm phối cùng khung gỗ Hương Đá Đắk Lắk nguyên khối. Hệ vách tán âm parabol đa tầng triệt tiêu hoàn toàn sóng đứng, tạo độ vang trong trẻo tựa chuỗi ngọc rơi cho từng nhịp gõ dùi tre. Tủ bảo quản chuẩn vi khí hậu 50.0% RH và 22.0°C.
          </p>
        </div>

        {/* Master Interactive Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 36-String Visual Stage & Audio Performer (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#18130c] to-[#0e0b07] border border-[#302517] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Virtual Stage Viewport */}
              <div className="relative h-72 sm:h-88 rounded-xl overflow-hidden bg-[#0a0704] border border-[#231b11] flex flex-col justify-between p-6">
                {/* Parabolic Soundwave Waves Simulation */}
                <div 
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 100%, #dfb87c 0%, transparent 70%)`,
                  }}
                />

                {/* Top Status Bar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#dfb87c]" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#d4c3a5]">
                      Mặt Đàn Gỗ Sa Mộc 5 Năm Tuổi
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#8a7f6c] block">Thời Gian Vang</span>
                    <span className="text-sm font-mono text-[#dfb87c] font-bold">RT60 = 0.35s</span>
                  </div>
                </div>

                {/* Center 36 Strings Visual Representation */}
                <div className="relative z-10 my-auto py-2">
                  <div className="flex flex-col gap-2 max-w-md mx-auto">
                    {[0, 1, 2, 3, 4, 5].map((strIdx) => {
                      const isStruck = activeStringIndex === strIdx
                      return (
                        <div key={strIdx} className="relative flex items-center gap-3">
                          <span className="text-[10px] font-mono text-[#8a7f6c] w-12 text-right">
                            Hàng {strIdx + 1}
                          </span>
                          <div className="flex-1 h-2 relative flex items-center">
                            {/* Wooden Bridge (Ngựa Đàn) */}
                            <div className="absolute left-1/4 w-1.5 h-4 bg-[#693f1d] rounded-sm shadow-md z-10" />
                            <div className="absolute right-1/4 w-1.5 h-4 bg-[#693f1d] rounded-sm shadow-md z-10" />
                            {/* Metal Wire */}
                            <div
                              className={cn(
                                'w-full h-[1.5px] transition-all duration-150',
                                isStruck
                                  ? 'bg-[#ffe4a0] shadow-[0_0_8px_#ffe4a0] scale-y-150'
                                  : 'bg-[#8c744f]/60'
                              )}
                            />
                          </div>
                          {isStruck && (
                            <span className="text-[10px] font-mono text-[#dfb87c] animate-pulse">
                              ♫ Vang
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Bottom Sound Controller Bar */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#231b11] bg-[#0d0905]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => playPerformance(selectedPieceId)}
                      disabled={isPlaying}
                      className={cn(
                        'min-h-[44px] px-4 py-2 rounded-lg font-medium text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-2 border',
                        isPlaying
                          ? 'bg-[#dfb87c]/20 border-[#dfb87c] text-[#fdfcf7] shadow-[0_0_15px_rgba(223,184,124,0.3)]'
                          : 'bg-[#1a140c] border-[#382b1a] text-[#dfb87c] hover:border-[#dfb87c] hover:bg-[#261d11]'
                      )}
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        {isPlaying ? (
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        ) : (
                          <path d="M8 5v14l11-7z" />
                        )}
                      </svg>
                      {isPlaying ? 'Đang Diễn Tấu Khúc Nhạc' : `Nghe ${currentPiece?.title || 'Suối Hoa'}`}
                    </button>
                  </div>

                  <span className="text-xs font-mono text-[#8a7f6c]">
                    Tủ Vi Khí Hậu: 50.0% RH · 22.0°C
                  </span>
                </div>
              </div>

              {/* Technical Acoustic Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#261d12]">
                <div className="p-3 rounded-xl bg-[#0f0c07] border border-[#231b11]">
                  <span className="text-[10px] text-[#786e5c] uppercase font-mono block">Khung Hộp Đàn</span>
                  <span className="text-sm font-semibold text-[#f7f5ed]">Hương Đá Đắk Lắk</span>
                  <span className="text-[10px] text-[#595143] block mt-0.5">Vân gỗ đậm, cộng hưởng đằm</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f0c07] border border-[#231b11]">
                  <span className="text-[10px] text-[#786e5c] uppercase font-mono block">Mặt Bảng Âm</span>
                  <span className="text-sm font-semibold text-[#dfb87c]">Sa Mộc 5 Năm</span>
                  <span className="text-[10px] text-[#595143] block mt-0.5">Xẻ dọc thớ triệt tiêu nứt</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f0c07] border border-[#231b11]">
                  <span className="text-[10px] text-[#786e5c] uppercase font-mono block">Số Cung Dây</span>
                  <span className="text-sm font-mono font-bold text-[#f7f5ed]">36 Dây Kim Loại</span>
                  <span className="text-[10px] text-[#595143] block mt-0.5">Âm vực rộng 3 quãng tám</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f0c07] border border-[#231b11]">
                  <span className="text-[10px] text-[#786e5c] uppercase font-mono block">Vòm Tán Âm</span>
                  <span className="text-sm font-semibold text-[#dfb87c]">Parabol Đa Tầng</span>
                  <span className="text-[10px] text-[#595143] block mt-0.5">Không dội âm hỗn loạn</span>
                </div>
              </div>
            </div>

            {/* Acoustic Rationale */}
            <div className="p-6 rounded-2xl bg-[#110d08] border border-[#261d12] text-sm text-[#9e9686] space-y-3">
              <h3 className="text-base font-serif text-[#fdfcf7] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#dfb87c] rounded-full" />
                Nghệ Thuật Xử Lý Tiếng Dùi Tre Bọc Da Mềm
              </h3>
              <p className="leading-relaxed">
                Đàn Tam Thập Lục phát âm khi hai que dùi tre mảnh gõ trực tiếp lên các sợi dây tơ kim loại kéo căng qua các cầu ngựa đàn. Khác với phím đàn piano bọc nỉ dày, dùi Tam Thập Lục tạo xung kích âm sắc nhọn ở dải tần 2.000Hz - 6.000Hz. Nhờ hệ vòm parabol gỗ Hương Đá được GuHomes tính toán mô phỏng ray-tracing âm học, các xung động âm sắc được phân tán đa hướng êm ái, mang lại trải nghiệm nghe êm dịu, không gắt tai.
              </p>
            </div>
          </div>

          {/* Right Column: Piece Selector, Play Style & Lighting (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Music Pieces Selector */}
            <div className="rounded-2xl bg-[#18130c] border border-[#302517] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#8a7f6c]">
                Tuyển Tập Khúc Nhạc Đàn Tam Thập Lục
              </h3>

              <div className="space-y-3">
                {Object.keys(YANGQIN_PIECES).map((pieceKey) => {
                  const item = YANGQIN_PIECES[pieceKey]
                  if (!item) return null
                  const isSelected = selectedPieceId === pieceKey
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedPieceId(pieceKey)
                        playPerformance(pieceKey)
                      }}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#231b11] border-[#dfb87c] shadow-[0_0_15px_rgba(223,184,124,0.18)]'
                          : 'bg-[#100c07] border-[#22180d] hover:border-[#332616]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fdfcf7] font-semibold' : 'text-[#cfc8b8]')}>
                          {item.title}
                        </span>
                        <span className="text-xs font-mono text-[#dfb87c] font-bold">
                          {item.tempoBpm} BPM
                        </span>
                      </div>
                      <span className="text-xs text-[#8a7f6c] mt-1">{item.subtitle}</span>
                      <p className="text-xs text-[#a39a89] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  )
                })}
              </div>

              {/* Play Style Mode Selector */}
              <div className="pt-3 border-t border-[#231b11]">
                <span className="text-xs font-mono text-[#8a7f6c] block mb-2">Phong Cách Gõ Que Dùi</span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPlayStyle('single-placid')}
                    className={cn(
                      'min-h-[44px] px-2 py-1.5 rounded-lg text-xs font-mono border transition-colors',
                      playStyle === 'single-placid' ? 'bg-[#261d11] border-[#dfb87c] text-[#dfb87c]' : 'bg-[#100c07] border-[#22180d] text-[#8a7f6c]'
                    )}
                  >
                    Đơn Nốt Tĩnh
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlayStyle('tremolo-roll')}
                    className={cn(
                      'min-h-[44px] px-2 py-1.5 rounded-lg text-xs font-mono border transition-colors',
                      playStyle === 'tremolo-roll' ? 'bg-[#261d11] border-[#dfb87c] text-[#dfb87c]' : 'bg-[#100c07] border-[#22180d] text-[#8a7f6c]'
                    )}
                  >
                    Vê Que Đảo Tay
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlayStyle('pentatonic-flow')}
                    className={cn(
                      'min-h-[44px] px-2 py-1.5 rounded-lg text-xs font-mono border transition-colors',
                      playStyle === 'pentatonic-flow' ? 'bg-[#261d11] border-[#dfb87c] text-[#dfb87c]' : 'bg-[#100c07] border-[#22180d] text-[#8a7f6c]'
                    )}
                  >
                    Ngũ Cung Róc Rách
                  </button>
                </div>
              </div>
            </div>

            {/* Lighting Scenarios */}
            <div className="rounded-2xl bg-[#18130c] border border-[#302517] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#8a7f6c]">
                Kịch Bản Ánh Sáng Thính Phòng (CRI 98)
              </h3>

              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(LIGHTING_PRESETS) as YangqinLighting[]).map((lightKey) => {
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
                          ? 'bg-[#261d11] border-[#dfb87c] text-[#dfb87c]'
                          : 'bg-[#100c07] border-[#22180d] text-[#8a7f6c] hover:border-[#382b1a]'
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
                  className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#dfb87c] to-[#b89155] text-[#0d0a06] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
                >
                  May Đo Phòng Hòa Âm Nhạc Cụ Dân Tộc
                </a>
              </div>
            </div>

            {/* Atelier Contact */}
            <div className="p-4 rounded-2xl bg-[#110d08] border border-[#261d12] text-xs text-[#8a7f6c] flex items-center justify-between">
              <div>
                <span className="text-[#fdfcf7] font-serif block">GuHomes Acoustic Sanctuary</span>
                <span className="text-[11px] text-[#635a4a]">Xưởng Mộc May Đo Thạnh Xuân Q.12</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#dfb87c] font-mono hover:underline min-h-[44px] flex items-center"
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
