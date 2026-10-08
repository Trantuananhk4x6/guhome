'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BalalaikaString {
  id: string
  noteName: string
  pitch: string
  freq: number
  material: string
  description: string
}

// 3 dây đàn Balalaika Prima truyền thống (E4 - E4 - A4)
const BALALAIKA_STRINGS: BalalaikaString[] = [
  {
    id: 'string_1',
    noteName: 'Dây 1 (A4 / La4)',
    pitch: '440.00 Hz',
    freq: 440.00,
    material: 'Thép tôi Thụy Sĩ 0.28mm',
    description: 'Dây đơn kim loại tạo độ đanh réo rắt, điểm nhấn giai điệu chủ âm rực rỡ'
  },
  {
    id: 'string_2',
    noteName: 'Dây 2 (E4 / Mi4)',
    pitch: '329.63 Hz',
    freq: 329.63,
    material: 'Sợi nylon tinh khiết bọc lụa 0.85mm',
    description: 'Dây âm nền êm dịu, cho âm sắc ấm áp và chiều sâu mộc mạc'
  },
  {
    id: 'string_3',
    noteName: 'Dây 3 (E4 / Mi4)',
    pitch: '329.63 Hz',
    freq: 329.63,
    material: 'Sợi nylon tinh khiết bọc lụa 0.85mm',
    description: 'Dây đồng âm kép (Unison) tạo hiệu ứng cộng hưởng ngân rung đặc thù của Balalaika'
  }
]

const CLASSIC_PIECES = [
  {
    id: 'kalinka',
    name: 'Khúc Hát Kalinka (Hoa Kim Ngân)',
    mood: 'Rộn rã, biến tốc nhanh dần từ tĩnh tại sang cao trào',
    notes: [
      { freq: 329.63, duration: 0.3 }, // E4
      { freq: 440.00, duration: 0.3 }, // A4
      { freq: 493.88, duration: 0.3 }, // B4
      { freq: 523.25, duration: 0.4 }, // C5
      { freq: 493.88, duration: 0.3 }, // B4
      { freq: 440.00, duration: 0.5 }, // A4
      { freq: 329.63, duration: 0.4 }, // E4
      { freq: 440.00, duration: 0.6 }  // A4
    ]
  },
  {
    id: 'korobeiniki',
    name: 'Korobeiniki (Người Bán Hàng Rong)',
    mood: 'Giai điệu dân gian hào sảng và trữ tình lắng đọng',
    notes: [
      { freq: 329.63, duration: 0.4 }, // E4
      { freq: 246.94, duration: 0.2 }, // B3
      { freq: 261.63, duration: 0.2 }, // C4
      { freq: 293.66, duration: 0.4 }, // D4
      { freq: 261.63, duration: 0.2 }, // C4
      { freq: 246.94, duration: 0.2 }, // B3
      { freq: 220.00, duration: 0.5 }  // A3
    ]
  },
  {
    id: 'moonlight',
    name: 'Ánh Trăng Sáng (Svetit Mesyats)',
    mood: 'Thanh tao, êm đềm tựa đêm trăng rọi rừng bạch dương',
    notes: [
      { freq: 440.00, duration: 0.3 }, // A4
      { freq: 440.00, duration: 0.3 }, // A4
      { freq: 493.88, duration: 0.3 }, // B4
      { freq: 523.25, duration: 0.5 }, // C5
      { freq: 440.00, duration: 0.3 }, // A4
      { freq: 392.00, duration: 0.4 }, // G4
      { freq: 329.63, duration: 0.6 }  // E4
    ]
  }
]

const LIGHTING_SCENARIOS = [
  {
    id: 'candle_birch_2400k',
    name: 'Ánh Nến Cung Đình & Bạch Dương 2400K',
    lux: '30 Lux',
    ambience: 'Ánh sáng nến vàng ấm lung linh phản chiếu 7 múi gỗ Phong uốn cong'
  },
  {
    id: 'taiga_sunset_2900k',
    name: 'Hoàng Hôn Rừng Taiga 2900K',
    lux: '55 Lux',
    ambience: 'Sắc vàng hổ phách nâng niu thớ gỗ Vân Sam Val di Fiemme tự nhiên'
  },
  {
    id: 'aurora_snow_3400k',
    name: 'Tuyết Trắng Bình Minh 3400K',
    lux: '80 Lux',
    ambience: 'Độ sáng tinh khiết soi rõ độ bóng tráng gương của lớp véc-ni cánh kiến thủ công'
  }
]

export function SaigonAcousticBalalaikaSanctuarySalon({ className = '' }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [activePieceIndex, setActivePieceIndex] = useState(0)
  const [activeStringIndex, setActiveStringIndex] = useState<number | null>(null)
  const [selectedLighting, setSelectedLighting] = useState(1) // Hoàng hôn Taiga
  const [isTremoloActive, setIsTremoloActive] = useState(false)
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

  // Gảy dây đàn Balalaika mô phỏng âm mộc gỗ Vân Sam & kỹ thuật tremolo ngón cái
  const playBalalaikaPluck = (freq: number, withTremolo = false) => {
    const ctx = initAudio()
    if (!ctx) return

    const now = ctx.currentTime
    const duration = withTremolo ? 0.9 : 0.65

    // Oscillator 1: Sóng tam giác âm mộc gỗ
    const osc1 = ctx.createOscillator()
    const gain1 = ctx.createGain()
    osc1.type = 'triangle'
    osc1.frequency.setValueAtTime(freq, now)

    // Oscillator 2: Hài âm sắc nét dây kim loại / nylon
    const osc2 = ctx.createOscillator()
    const gain2 = ctx.createGain()
    osc2.type = 'sawtooth'
    osc2.frequency.setValueAtTime(freq * 2, now)

    // Bộ lọc âm thông thấp mô phỏng thùng đàn tam giác
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2400, now)
    filter.frequency.exponentialRampToValueAtTime(600, now + duration)

    // Master Gain với Envelope gảy dây
    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(0.001, now)
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.012)

    if (withTremolo) {
      // Tremolo: dao động âm lượng 9Hz
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(9, now)
      lfoGain.gain.setValueAtTime(0.18, now)
      lfo.connect(lfoGain.gain)
      lfo.start(now)
      lfo.stop(now + duration)
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration)
    } else {
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration)
    }

    gain1.gain.setValueAtTime(0.7, now)
    gain2.gain.setValueAtTime(0.2, now)

    osc1.connect(gain1)
    osc2.connect(gain2)
    gain1.connect(filter)
    gain2.connect(filter)
    filter.connect(masterGain)
    masterGain.connect(ctx.destination)

    osc1.start(now)
    osc2.start(now)
    osc1.stop(now + duration)
    osc2.stop(now + duration)
  }

  // Phát trích đoạn nhạc cổ điển Balalaika
  const handlePlayPiece = (pieceIdx: number) => {
    const piece = CLASSIC_PIECES[pieceIdx] ?? CLASSIC_PIECES[0]
    if (!piece) return

    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []

    setIsPlaying(true)
    setActivePieceIndex(pieceIdx)

    let accumulatedTime = 0
    piece.notes.forEach((item, index) => {
      const t = setTimeout(() => {
        playBalalaikaPluck(item.freq, isTremoloActive)
        if (index === piece.notes.length - 1) {
          const endTimer = setTimeout(() => {
            setIsPlaying(false)
          }, item.duration * 1000 + 400)
          timeoutsRef.current.push(endTimer)
        }
      }, accumulatedTime * 1000)

      timeoutsRef.current.push(t)
      accumulatedTime += item.duration
    })
  }

  const stopMusic = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t))
    timeoutsRef.current = []
    setIsPlaying(false)
  }

  const handleManualPluck = (strIdx: number) => {
    setActiveStringIndex(strIdx)
    const strObj = BALALAIKA_STRINGS[strIdx] ?? BALALAIKA_STRINGS[0]
    if (strObj) {
      playBalalaikaPluck(strObj.freq, isTremoloActive)
    }
    setTimeout(() => {
      setActiveStringIndex(null)
    }, 450)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName.trim() || !consultPhone.trim()) return
    setSubmitted(true)
  }

  const currentLighting = (LIGHTING_SCENARIOS[selectedLighting] ?? LIGHTING_SCENARIOS[0]) as (typeof LIGHTING_SCENARIOS)[number]
  const currentPiece = (CLASSIC_PIECES[activePieceIndex] ?? CLASSIC_PIECES[0]) as (typeof CLASSIC_PIECES)[number]

  return (
    <section className={cn('relative py-24 bg-[#0c0d10] text-[#f4efe6] overflow-hidden', className)}>
      {/* Background radial gradient mô phỏng ánh ấm vòm tán âm parabol */}
      <div 
        className="absolute inset-0 pointer-events-none transition-colors duration-1000 opacity-25"
        style={{
          background: selectedLighting === 0 
            ? 'radial-gradient(circle at 50% 30%, rgba(217, 119, 6, 0.4) 0%, transparent 70%)'
            : selectedLighting === 1
            ? 'radial-gradient(circle at 50% 30%, rgba(180, 83, 9, 0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 30%, rgba(147, 197, 253, 0.25) 0%, transparent 70%)'
        }}
      />

      <div className="relative mx-auto max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-[#b45309]/40 bg-[#1c1917]/60 text-xs font-mono tracking-wider uppercase text-[#f59e0b] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
            Không Gian Thính Âm Tinh Hoa - GuHomes Studio
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light tracking-tight text-[#fef3c7] leading-tight mb-6">
            Phòng Thính Âm Dây Khảy Balalaika Vòm Vân Sam Val di Fiemme
          </h2>
          <p className="text-base md:text-lg text-[#d1d5db] font-light leading-relaxed">
            Thiết kế đại thính phòng hòa âm dành riêng cho đàn tam giác Balalaika Prima và Domra cần dài.
            Mặt soundboard xẻ nan từ gỗ Vân Sam Val di Fiemme trứ danh kết hợp 7 múi lưng uốn nhiệt gỗ Phong Nga,
            hệ nan vòm parabol Fermat triệt tiêu hoàn toàn sóng đứng, kiểm soát thời gian vang chuẩn mực RT60 = 0.32s.
          </p>
        </div>

        {/* Grid 2 cột: Bảng tương tác nhạc & Kiến trúc âm học */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          {/* Cột trái: Bộ mô phỏng đàn Balalaika 3 dây & Tác phẩm dân ca */}
          <div className="lg:col-span-7 bg-[#15171c]/90 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <h3 className="text-xl font-serif text-[#fef3c7]">Trải Nghiệm Dây Khảy Tam Giác</h3>
                <p className="text-xs font-mono text-[#9ca3af] mt-1">Chuỗi dao động bồi âm Web Audio API độ trễ thấp</p>
              </div>

              {/* Nút bật tắt Tremolo */}
              <button
                type="button"
                onClick={() => setIsTremoloActive(!isTremoloActive)}
                className={cn(
                  'px-4 py-2 rounded-lg text-xs font-mono tracking-wide transition-all border min-h-[44px]',
                  isTremoloActive 
                    ? 'bg-[#b45309] text-white border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'bg-white/5 text-[#d1d5db] border-white/10 hover:border-white/30'
                )}
              >
                Tremolo Ngón Cái: {isTremoloActive ? 'BẬT (9Hz)' : 'TẮT'}
              </button>
            </div>

            {/* Bộ 3 dây đàn Balalaika tương tác trực quan */}
            <div className="space-y-4 mb-8">
              <div className="text-xs font-mono text-[#f59e0b] uppercase tracking-widest mb-2">
                Chạm hoặc click vuốt từng dây để cảm nhận âm sắc:
              </div>
              {BALALAIKA_STRINGS.map((str, idx) => {
                const isActive = activeStringIndex === idx
                return (
                  <button
                    key={str.id}
                    type="button"
                    onClick={() => handleManualPluck(idx)}
                    className={cn(
                      'w-full text-left p-4 rounded-xl border transition-all duration-200 relative overflow-hidden group min-h-[56px]',
                      isActive 
                        ? 'border-[#f59e0b] bg-[#f59e0b]/15 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                        : 'border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/[0.08]'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-mono text-xs text-[#fef3c7]">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="text-sm font-medium text-[#fef3c7]">{str.noteName}</div>
                          <div className="text-xs text-[#9ca3af]">{str.material}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs text-[#f59e0b]">{str.pitch}</div>
                        <div className="text-[11px] text-[#9ca3af]">Chạm để gảy</div>
                      </div>
                    </div>
                    {/* Dây đàn hiển thị dạng thanh kim loại với animation rung */}
                    <motion.div
                      className="mt-3 h-[2px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent w-full"
                      animate={isActive ? { scaleY: [1, 5, 0.5, 3, 1], opacity: [0.4, 1, 0.4] } : { scaleY: 1, opacity: 0.3 }}
                      transition={{ duration: 0.4 }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Trình nghe trích đoạn dân ca */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs font-mono text-[#d1d5db] uppercase tracking-wider mb-4">
                Trích Đoạn Dân Ca Kinh Điển:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {CLASSIC_PIECES.map((piece, pIdx) => {
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
                          ? 'border-[#f59e0b] bg-[#b45309]/30 text-white shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                          : 'border-white/10 bg-white/5 text-[#d1d5db] hover:border-white/30'
                      )}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-xs font-medium text-[#fef3c7]">{piece.name}</span>
                        {isCurrent ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] animate-ping" />
                        ) : (
                          <span className="text-[10px] font-mono text-[#9ca3af]">Phát</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#9ca3af] line-clamp-2">{piece.mood}</div>
                    </button>
                  )
                })}
              </div>

              {isPlaying && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <div className="flex items-center gap-2 text-[#fef3c7]">
                    <span className="animate-spin text-sm">✦</span>
                    <span>Đang biểu diễn: {currentPiece?.name}</span>
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

          {/* Cột phải: Kịch bản ánh sáng & Thông số âm học vi khí hậu */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Bộ điều khiển 3 kịch bản ánh sáng */}
            <div className="bg-[#15171c]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef3c7] mb-1">Kịch Bản Ánh Sáng Thính Phòng</h4>
              <p className="text-xs text-[#9ca3af] mb-4">Mô phỏng sắc nhiệt độ màu K nâng đỡ cảm xúc thưởng nhạc</p>

              <div className="space-y-3">
                {LIGHTING_SCENARIOS.map((light, lIdx) => (
                  <button
                    key={light.id}
                    type="button"
                    onClick={() => setSelectedLighting(lIdx)}
                    className={cn(
                      'w-full text-left p-3.5 rounded-xl border transition-all min-h-[44px]',
                      selectedLighting === lIdx
                        ? 'border-[#f59e0b] bg-[#f59e0b]/15 text-white'
                        : 'border-white/10 bg-white/5 text-[#9ca3af] hover:border-white/20'
                    )}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-medium text-[#fef3c7]">{light.name}</span>
                      <span className="font-mono text-[#f59e0b]">{light.lux}</span>
                    </div>
                    <div className="text-[11px] text-[#9ca3af]">{light.ambience}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Thông số âm học & Vi khí hậu GuHomes */}
            <div className="bg-[#15171c]/90 border border-white/10 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef3c7] mb-4">Quy Chuẩn Âm Học Vòm Parabol</h4>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Thời Gian Vang</div>
                  <div className="text-lg font-serif text-[#f59e0b] mt-1">RT60 = 0.32s</div>
                  <div className="text-[10px] text-[#6b7280] mt-1">Triệt tiêu hoàn toàn dội âm</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Độ Ẩm Tủ Đàn</div>
                  <div className="text-lg font-serif text-[#f59e0b] mt-1">50% ± 2% RH</div>
                  <div className="text-[10px] text-[#6b7280] mt-1">Bảo vệ keo bong bóng cá tầm</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Vật Liệu Vòm</div>
                  <div className="text-sm font-serif text-[#fef3c7] mt-1">Vân Sam Fiemme</div>
                  <div className="text-[10px] text-[#6b7280] mt-1">Tán âm Parabol Fermat</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[#9ca3af]">Thân Đàn 7 Múi</div>
                  <div className="text-sm font-serif text-[#fef3c7] mt-1">Phong Nga Cổ Thụ</div>
                  <div className="text-[10px] text-[#6b7280] mt-1">Uốn nhiệt thủ công</div>
                </div>
              </div>
            </div>

            {/* Form đăng ký may đo thính phòng */}
            <div className="bg-gradient-to-br from-[#1c1917] to-[#15171c] border border-[#b45309]/30 rounded-2xl p-6">
              <h4 className="text-base font-serif text-[#fef3c7] mb-2">Tư Vấn Kiến Trúc Thính Phòng Balalaika</h4>
              <p className="text-xs text-[#9ca3af] mb-4">
                Giới hạn 12 công trình bespoke mỗi năm. Trao đổi trực tiếp cùng KTS Trưởng GuHomes.
              </p>

              {submitted ? (
                <div className="p-4 rounded-xl bg-[#b45309]/20 border border-[#f59e0b]/40 text-center">
                  <p className="text-xs font-medium text-[#fef3c7]">Cảm ơn quý gia chủ!</p>
                  <p className="text-[11px] text-[#d1d5db] mt-1">
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef3c7] placeholder-white/40 focus:outline-none focus:border-[#f59e0b] min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại liên hệ..."
                      value={consultPhone}
                      onChange={e => setConsultPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-[#fef3c7] placeholder-white/40 focus:outline-none focus:border-[#f59e0b] min-h-[44px]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-lg bg-[#b45309] hover:bg-[#d97706] text-white font-medium text-xs tracking-wide transition-all shadow-md min-h-[44px]"
                  >
                    Đăng Ký Tư Vấn Khảo Sát Âm Học
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Chân trang tiểu dự án */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-white/10 text-xs text-[#9ca3af] font-mono">
          <div>Xưởng mộc chế tác 1.200m² tại Thạnh Xuân, Q.12, TP. Hồ Chí Minh</div>
          <div className="mt-2 sm:mt-0">Email: guhomesvn@gmail.com - Hotline: 0368 757 916</div>
        </div>
      </div>
    </section>
  )
}
