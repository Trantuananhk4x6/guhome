'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PercussionTechnique {
  id: string
  name: string
  frenchName: string
  description: string
  soundFeature: string
}

const TECHNIQUES: PercussionTechnique[] = [
  {
    id: 'palm_strike',
    name: 'Gõ Lòng Bàn Tay (Open Palm Strike)',
    frenchName: 'Coup de Paume',
    description: 'Lực gõ dứt khoát vào tâm mặt da dê núi sấy mộc, kích hoạt tiếng trầm ấm hòa cùng 16 cặp chuông lá đồng thau',
    soundFeature: 'Trầm 120Hz dội âm kết hợp leng keng đồng thau 3.800Hz'
  },
  {
    id: 'thumb_roll',
    name: 'Miết Ngón Tay Rung Chuông (Thumb Roll)',
    frenchName: 'Roulement de Pouce',
    description: 'Miết ngón tay có thoa sáp ong lên mép da dê, tạo chuỗi rung chấn siêu tốc liên hoàn của chuông lá',
    soundFeature: 'Chuỗi rung bồi âm liên tục 22Hz mô phỏng cánh ong bay'
  },
  {
    id: 'continuous_shake',
    name: 'Lắc Lục Lạc Rung Dồn Dập (Continuous Shake)',
    frenchName: 'Secouement Continu',
    description: 'Cổ tay lắc nhịp điệu dập dồn, 16 cặp lá đồng va đập tạo luồng âm thanh hào sảng vang vọng vòm Pơ-Mu',
    soundFeature: 'Tiết tấu réo rắt dồn dập, cộng hưởng âm học Fibonacci'
  }
]

const PERCUSSION_PIECES = [
  {
    id: 'tarantella',
    name: 'Tarantella Napoletana (Vũ Khúc Napoli)',
    origin: 'Ý - Nhịp điệu 6/8 giải độc tâm hồn',
    pattern: [
      { type: 'strike', duration: 0.25 },
      { type: 'shake', duration: 0.25 },
      { type: 'shake', duration: 0.25 },
      { type: 'strike', duration: 0.25 },
      { type: 'roll', duration: 0.4 }
    ]
  },
  {
    id: 'flamenco',
    name: 'Flamenco Alegrias (Vũ Điệu Cadiz)',
    origin: 'Tây Ban Nha - Nhịp 12 phách đam mê',
    pattern: [
      { type: 'strike', duration: 0.2 },
      { type: 'strike', duration: 0.2 },
      { type: 'roll', duration: 0.35 },
      { type: 'strike', duration: 0.2 },
      { type: 'shake', duration: 0.3 }
    ]
  },
  {
    id: 'den_hung',
    name: 'Khúc Rước Hội Đền Hùng',
    origin: 'Việt Nam - Nhịp trống da trầm hùng dân tộc',
    pattern: [
      { type: 'strike', duration: 0.4 },
      { type: 'strike', duration: 0.4 },
      { type: 'shake', duration: 0.3 },
      { type: 'strike', duration: 0.5 }
    ]
  }
]

const LIGHTING_SCENARIOS = [
  {
    id: 'festival_2200k',
    name: 'Ánh Lửa Lễ Hội 2200K',
    lux: '35 Lux',
    ambience: 'Sắc vàng cam nồng ấm tôn vinh vành gỗ Cẩm Lai uốn cong và chuông đồng thau'
  },
  {
    id: 'riverside_sunset_2800k',
    name: 'Hoàng Hôn Sông Nắng Vàng 2800K',
    lux: '50 Lux',
    ambience: 'Ánh sáng êm dịu dẫn dắt luồng gió sông Sài Gòn lướt qua nan vòm Pơ-Mu'
  },
  {
    id: 'po_mu_candle_1900k',
    name: 'Ánh Nến Pơ-Mu Trầm Ấm 1900K',
    lux: '25 Lux',
    ambience: 'Không gian tĩnh mịch ngát hương tinh dầu Bách Tây Bắc xua tan nồm ẩm'
  }
]

export function SaigonAcousticTambourineSanctuarySalon({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activePieceIndex, setActivePieceIndex] = useState(0)
  const [activeTechniqueIndex, setActiveTechniqueIndex] = useState<number | null>(null)
  const [selectedLighting, setSelectedLighting] = useState(0)
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(t => clearTimeout(t))
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
      }
    }
  }, [])

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Âm thanh Tambourine: Tiếng trống da + tiếng leng keng chuông đồng thau
  const playTambourineSound = (type: 'strike' | 'roll' | 'shake') => {
    const ctx = initAudio()
    if (!ctx) return

    const now = ctx.currentTime

    // 1. Tiếng trống da dê (Low drum thump)
    if (type === 'strike') {
      const drumOsc = ctx.createOscillator()
      const drumGain = ctx.createGain()
      drumOsc.type = 'sine'
      drumOsc.frequency.setValueAtTime(140, now)
      drumOsc.frequency.exponentialRampToValueAtTime(55, now + 0.12)

      drumGain.gain.setValueAtTime(0.35, now)
      drumGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

      drumOsc.connect(drumGain)
      drumGain.connect(ctx.destination)
      drumOsc.start(now)
      drumOsc.stop(now + 0.16)
    }

    // 2. Tiếng chuông lá đồng thau (Jingle rattle)
    const duration = type === 'roll' ? 0.35 : type === 'shake' ? 0.25 : 0.18
    const jingleOsc1 = ctx.createOscillator()
    const jingleOsc2 = ctx.createOscillator()
    const jingleGain = ctx.createGain()

    jingleOsc1.type = 'triangle'
    jingleOsc1.frequency.setValueAtTime(3600, now)
    jingleOsc1.frequency.exponentialRampToValueAtTime(2800, now + duration)

    jingleOsc2.type = 'sawtooth'
    jingleOsc2.frequency.setValueAtTime(5200, now)
    jingleOsc2.frequency.exponentialRampToValueAtTime(3900, now + duration)

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(4200, now)
    bandpass.Q.setValueAtTime(3.5, now)

    jingleGain.gain.setValueAtTime(0.001, now)
    jingleGain.gain.linearRampToValueAtTime(type === 'roll' ? 0.22 : 0.28, now + 0.01)
    jingleGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    jingleOsc1.connect(bandpass)
    jingleOsc2.connect(bandpass)
    bandpass.connect(jingleGain)
    jingleGain.connect(ctx.destination)

    jingleOsc1.start(now)
    jingleOsc2.start(now)
    jingleOsc1.stop(now + duration)
    jingleOsc2.stop(now + duration)
  }

  // Phát trích đoạn tiết tấu nhịp gõ
  const handlePlayPiece = (pieceIdx: number) => {
    const piece = (PERCUSSION_PIECES[pieceIdx] ?? PERCUSSION_PIECES[0]) as (typeof PERCUSSION_PIECES)[number]

    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []

    setIsPlaying(true)
    setActivePieceIndex(pieceIdx)

    let accumulatedTime = 0
    piece.pattern.forEach((step, index) => {
      const t = setTimeout(() => {
        playTambourineSound(step.type as 'strike' | 'roll' | 'shake')
        if (index === piece.pattern.length - 1) {
          const endTimer = setTimeout(() => {
            setIsPlaying(false)
          }, step.duration * 1000 + 300)
          timeoutsRef.current.push(endTimer)
        }
      }, accumulatedTime * 1000)

      timeoutsRef.current.push(t)
      accumulatedTime += step.duration
    })
  }

  const stopMusic = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []
    setIsPlaying(false)
  }

  const handleManualStrike = (techIdx: number) => {
    setActiveTechniqueIndex(techIdx)
    const soundType = techIdx === 0 ? 'strike' : techIdx === 1 ? 'roll' : 'shake'
    playTambourineSound(soundType)
    setTimeout(() => {
      setActiveTechniqueIndex(null)
    }, 350)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName.trim() || !consultPhone.trim()) return
    setSubmitted(true)
  }

  const currentLighting = (LIGHTING_SCENARIOS[selectedLighting] ?? LIGHTING_SCENARIOS[0]) as (typeof LIGHTING_SCENARIOS)[number]
  const currentPiece = (PERCUSSION_PIECES[activePieceIndex] ?? PERCUSSION_PIECES[0]) as (typeof PERCUSSION_PIECES)[number]

  return (
    <section className={cn('relative py-24 bg-[#0e0e12] text-[#f8fafc] overflow-hidden', className)}>
      {/* Background radial gradient sắc ấm gỗ Pơ-Mu */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-1000 opacity-25"
        style={{
          background: selectedLighting === 0 
            ? 'radial-gradient(circle at 50% 30%, rgba(245, 158, 11, 0.4) 0%, transparent 70%)'
            : selectedLighting === 1
            ? 'radial-gradient(circle at 50% 30%, rgba(217, 119, 6, 0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 30%, rgba(180, 83, 9, 0.45) 0%, transparent 70%)'
        }}
      />

      <div className="relative mx-auto max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 text-xs font-mono tracking-wider uppercase text-amber-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            Âm Sắc Nhịp Gõ Cung Đình & Tinh Dầu Pơ-Mu Tự Nhiên
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-[#fef3c7] leading-tight mb-6">
            Thính Phòng Tambourine Vòm Pơ-Mu Lai Châu Âm Học Fibonacci
          </h2>
          <p className="text-base md:text-lg text-[#94a3b8] font-light leading-relaxed">
            Thiết kế thính phòng hòa âm gõ dành riêng cho Tambourine cổ điển và Lục Lạc 16 cặp chuông lá đồng thau.
            Khung vành gỗ Cẩm Lai uốn hơi nước, mặt da dê núi sấy tự nhiên căng đinh tán đồng; hệ nan vòm xoắn ốc
            Fibonacci ốp gỗ Pơ-Mu Lai Châu ngát hương tinh dầu xua đuổi ẩm mốc, khống chế RT60 = 0.31s chuẩn mực.
          </p>
        </div>

        {/* Grid 2 cột: Bảng gõ tương tác & Quy chuẩn âm học vòm Pơ-Mu */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Cột trái: Bộ 3 kỹ thuật gõ tương tác & Trích đoạn nhịp điệu */}
          <div className="lg:col-span-7 bg-[#14151d]/90 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <h3 className="text-xl font-serif text-[#fef3c7]">Trải Nghiệm 3 Kỹ Thuật Gõ Tambourine</h3>
                <p className="text-xs font-mono text-[#94a3b8] mt-1">Chuỗi dao động da dê & chuông lá Web Audio API</p>
              </div>

              <div className="px-3.5 py-1.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-xs font-mono text-amber-300">
                16 Cặp Chuông Đồng Thau
              </div>
            </div>

            {/* 3 Nút gõ kỹ thuật trực quan */}
            <div className="space-y-4 mb-8">
              <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2">
                Chạm để thực hiện từng động tác gõ:
              </div>
              {TECHNIQUES.map((tech, idx) => {
                const isActive = activeTechniqueIndex === idx
                return (
                  <button
                    key={tech.id}
                    type="button"
                    onClick={() => handleManualStrike(idx)}
                    className={cn(
                      'w-full text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden group min-h-[64px]',
                      isActive 
                        ? 'border-amber-400 bg-amber-500/15 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs text-[#fef3c7]">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-[#fef3c7]">{tech.name}</div>
                          <div className="text-xs text-[#94a3b8]">{tech.frenchName}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[11px] text-amber-400">{tech.soundFeature}</div>
                        <div className="text-[10px] text-[#64748b]">Chạm để gõ</div>
                      </div>
                    </div>
                    {/* Đường rung sóng âm gõ trống */}
                    <motion.div
                      className="mt-3 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent w-full"
                      animate={isActive ? { scaleY: [1, 5, 1, 3, 1], opacity: [0.4, 1, 0.4] } : { scaleY: 1, opacity: 0.3 }}
                      transition={{ duration: 0.3 }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Trình nghe trích đoạn nhịp gõ vũ khúc */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs font-mono text-[#cbd5e1] uppercase tracking-wider mb-4">
                Trích Đoạn Tiết Tấu Gõ Cổ Điển:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {PERCUSSION_PIECES.map((piece, pIdx) => {
                  const isCurrent = activePieceIndex === pIdx && isPlaying
                  return (
                    <button
                      key={piece.id}
                      type="button"
                      onClick={() => {
                        if (isCurrent) {
                          stopMusic()
                        } else {
                          handlePlayPiece(pIdx)
                        }
                      }}
                      className={cn(
                        'p-3.5 rounded-xl border text-left transition-all min-h-[48px]',
                        isCurrent
                          ? 'border-amber-400 bg-amber-900/40 text-white shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'border-white/10 bg-white/5 text-[#cbd5e1] hover:border-white/30'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-xs font-medium text-[#fef3c7]">{piece.name}</span>
                        {isCurrent ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                        ) : (
                          <span className="text-[10px] font-mono text-[#94a3b8]">Phát</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#94a3b8] line-clamp-2">{piece.origin}</div>
                    </button>
                  )
                })}
              </div>

              {isPlaying && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-[#fef3c7]">
                    <span className="animate-spin text-sm">✦</span>
                    <span>Đang hòa tấu nhịp: {currentPiece.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={stopMusic}
                    className="px-3 py-1 rounded bg-red-950/60 border border-red-500/40 text-red-200 hover:bg-red-900/80 min-h-[36px]"
                  >
                    Dừng lại
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Kịch bản ánh sáng & Âm học vòm Pơ-Mu */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bộ điều khiển 3 kịch bản ánh sáng */}
            <div className="bg-[#14151d]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef3c7] mb-1">Kịch Bản Ánh Sáng Thính Phòng</h4>
              <p className="text-xs text-[#94a3b8] mb-4">Sắc nhiệt độ màu nâng niu độ bóng vành Cẩm Lai</p>

              <div className="space-y-3">
                {LIGHTING_SCENARIOS.map((light, lIdx) => (
                  <button
                    key={light.id}
                    type="button"
                    onClick={() => setSelectedLighting(lIdx)}
                    className={cn(
                      'w-full text-left p-3.5 rounded-xl border transition-all min-h-[44px]',
                      selectedLighting === lIdx
                        ? 'border-amber-400 bg-amber-500/15 text-white'
                        : 'border-white/10 bg-white/5 text-[#94a3b8] hover:border-white/20'
                    )}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-[#fef3c7]">{light.name}</span>
                      <span className="font-mono text-amber-400">{light.lux}</span>
                    </div>
                    <div className="text-[11px] text-[#94a3b8]">{light.ambience}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quy chuẩn âm học vòm Pơ-Mu */}
            <div className="bg-[#14151d]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef3c7] mb-4">Quy Chuẩn Âm Học Vòm Xoắn Ốc</h4>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Thời Gian Vang</div>
                  <div className="text-lg font-serif text-amber-400 mt-1">RT60 = 0.31s</div>
                  <div className="text-[10px] text-[#64748b] mt-1">Khử dội âm nhịp gõ 200-5000Hz</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Độ Ẩm Tủ Trống</div>
                  <div className="text-lg font-serif text-amber-400 mt-1">50% ± 2% RH</div>
                  <div className="text-[10px] text-[#64748b] mt-1">Giữ độ căng da dê tự nhiên</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Vật Liệu Vòm</div>
                  <div className="text-sm font-serif text-[#fef3c7] mt-1">Gỗ Pơ-Mu Lai Châu</div>
                  <div className="text-[10px] text-[#64748b] mt-1">Tinh dầu xua muỗi khử ẩm</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#94a3b8]">Vành Trống 24 Nan</div>
                  <div className="text-sm font-serif text-[#fef3c7] mt-1">Cẩm Lai Uốn Hơi</div>
                  <div className="text-[10px] text-[#64748b] mt-1">Chịu lực gõ đanh thép</div>
                </div>
              </div>
            </div>

            {/* Form đăng ký may đo thính phòng */}
            <div className="bg-gradient-to-br from-[#1c1917] to-[#14151d] border border-amber-500/30 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef3c7] mb-2">Tư Vấn Thính Phòng Tambourine</h4>
              <p className="text-xs text-[#94a3b8] mb-4">
                Giới hạn 12 công trình bespoke mỗi năm. Trao đổi âm học trực tiếp cùng KTS Trưởng GuHomes.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-400/50 text-center">
                  <p className="text-xs font-medium text-[#fef3c7]">Cảm ơn quý gia chủ!</p>
                  <p className="text-[11px] text-[#cbd5e1] mt-1">
                    KTS GuHomes sẽ liên hệ trong 24 giờ làm việc. Hotline: 0368 757 916.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên gia chủ..."
                      value={consultName}
                      onChange={e => setConsultName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef3c7] placeholder-white/40 focus:outline-none focus:border-amber-400 min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại liên hệ..."
                      value={consultPhone}
                      onChange={e => setConsultPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef3c7] placeholder-white/40 focus:outline-none focus:border-amber-400 min-h-[44px]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-medium text-xs tracking-wide transition-all shadow-md min-h-[44px]"
                  >
                    Đăng Ký Khảo Sát Âm Học Nhịp Gõ
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Chân trang tiểu dự án */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-[#94a3b8] font-mono">
          <div>Xưởng mộc chế tác 1.200m² tại Thạnh Xuân, Q.12, TP. Hồ Chí Minh</div>
          <div className="mt-2 sm:mt-0">Email: guhomesvn@gmail.com - Hotline: 0368 757 916</div>
        </div>
      </div>
    </section>
  )
}
