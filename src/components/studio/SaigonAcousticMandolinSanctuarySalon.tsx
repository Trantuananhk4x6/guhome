'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MandolinStringPair {
  id: string
  pairName: string
  pitch: string
  freq: number
  material: string
  description: string
}

// 4 cặp dây kép (8 dây) đàn Mandolin chuẩn (G3 - D4 - A4 - E5)
const MANDOLIN_STRING_PAIRS: MandolinStringPair[] = [
  {
    id: 'pair_1',
    pairName: 'Cặp Dây 1 (E5 / Mi5 kép)',
    pitch: '659.25 Hz',
    freq: 659.25,
    material: 'Thép tôi mạ Niken Thụy Sĩ 0.25mm',
    description: 'Âm vực kim thanh tú, cao vút ngân vang tựa giọt sương mai trên đèo sương Tây Bắc'
  },
  {
    id: 'pair_2',
    pairName: 'Cặp Dây 2 (A4 / La4 kép)',
    pitch: '440.00 Hz',
    freq: 440.00,
    material: 'Thép tôi tôi luyện bọc lụa 0.38mm',
    description: 'Dây chuyển giai điệu mượt mà, định hình chất âm trữ tình sang trọng phong cách Napoli'
  },
  {
    id: 'pair_3',
    pairName: 'Cặp Dây 3 (D4 / Rê4 kép)',
    pitch: '293.66 Hz',
    freq: 293.66,
    material: 'Lõi thép lục giác quấn đồng Phosphor 0.61mm',
    description: 'Âm trung ấm áp, bồi âm đầy đặn tôn vinh thớ gỗ Thông Đỏ xẻ xốp 30 năm tuổi'
  },
  {
    id: 'pair_4',
    pairName: 'Cặp Dây 4 (G3 / Sol3 kép)',
    pitch: '196.00 Hz',
    freq: 196.00,
    material: 'Lõi thép quấn đồng Phosphor nặng 0.86mm',
    description: 'Dây trầm chủ lực ngân rung sâu thẳm, kích hoạt cộng hưởng vòm gỗ Bách Xanh Mộc Châu'
  }
]

const CLASSIC_MANDOLIN_PIECES = [
  {
    id: 'vivaldi_rv532',
    name: 'Mandolin Concerto in G major, RV 532 (A. Vivaldi)',
    mood: 'Tráng lệ, rạng rỡ, đối đáp phức điệu tinh tế giữa 2 bè mandolin',
    notes: [
      { freq: 392.00, duration: 0.25 }, // G4
      { freq: 440.00, duration: 0.25 }, // A4
      { freq: 493.88, duration: 0.25 }, // B4
      { freq: 523.25, duration: 0.35 }, // C5
      { freq: 587.33, duration: 0.25 }, // D5
      { freq: 659.25, duration: 0.35 }, // E5
      { freq: 587.33, duration: 0.25 }, // D5
      { freq: 493.88, duration: 0.50 }  // B4
    ]
  },
  {
    id: 'santa_lucia',
    name: 'Santa Lucia (Dân Ca Napoli Lãng Mạn)',
    mood: 'Bồng bềnh nhịp 3/8 tựa sóng nước Vịnh Naples và sông Sài Gòn',
    notes: [
      { freq: 523.25, duration: 0.35 }, // C5
      { freq: 523.25, duration: 0.20 }, // C5
      { freq: 493.88, duration: 0.35 }, // B4
      { freq: 440.00, duration: 0.20 }, // A4
      { freq: 493.88, duration: 0.40 }, // B4
      { freq: 587.33, duration: 0.30 }, // D5
      { freq: 392.00, duration: 0.55 }  // G4
    ]
  },
  {
    id: 'o_sole_mio',
    name: 'O Sole Mio (Mặt Trời Của Tôi)',
    mood: 'Da diết, chan hòa ánh nắng ấm phương Nam hòa quyện gió sông',
    notes: [
      { freq: 587.33, duration: 0.30 }, // D5
      { freq: 523.25, duration: 0.25 }, // C5
      { freq: 493.88, duration: 0.25 }, // B4
      { freq: 440.00, duration: 0.35 }, // A4
      { freq: 392.00, duration: 0.40 }, // G4
      { freq: 440.00, duration: 0.30 }, // A4
      { freq: 392.00, duration: 0.60 }  // G4
    ]
  }
]

const MANDOLIN_LIGHTING_SCENARIOS = [
  {
    id: 'sunset_saigon_2200k',
    name: 'Hoàng Hôn Sông Sài Gòn 2200K',
    lux: '35 Lux',
    ambience: 'Hổ phách êm đềm, phản chiếu những đường gân tinh dầu Bách Xanh Mộc Châu'
  },
  {
    id: 'moonlit_cypress_2700k',
    name: 'Trăng Thơ Bách Xanh 2700K',
    lux: '50 Lux',
    ambience: 'Ánh trăng bàng bạc chiếu rọi thớ Thông Đỏ Lang Biang và phím đồng thau dát mỏng'
  },
  {
    id: 'zen_sanctuary_1800k',
    name: 'Tĩnh Lặng Thiền Định 1800K',
    lux: '20 Lux',
    ambience: 'Ánh lửa trầm ấm áp ru êm đôi tai, tách biệt hoàn toàn tiếng còi xe đô thị'
  }
]

export function SaigonAcousticMandolinSanctuarySalon({ className = '' }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<'strings' | 'pieces' | 'microclimate'>('strings')
  const [activeStringId, setActiveStringId] = useState<string>('pair_1')
  const [activeLightingIndex, setActiveLightingIndex] = useState<number>(0)
  const [isPlayingPiece, setIsPlayingPiece] = useState<boolean>(false)
  const [currentPieceId, setCurrentPieceId] = useState<string | null>(null)
  const [isVibrating, setIsVibrating] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }

  // Phát âm thanh cặp dây kép đặc trưng của Mandolin (2 âm lệch tần số vi mô tạo hiệu ứng Chorus tự nhiên)
  const playMandolinPairTone = (freq: number, duration: number = 0.8) => {
    try {
      const ctx = getAudioContext()
      const now = ctx.currentTime

      // Dây thứ nhất
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'triangle'
      osc1.frequency.setValueAtTime(freq, now)

      // Dây thứ hai lệch +0.8Hz tạo hiệu ứng chorus/tremolo tự nhiên của Mandolin đôi
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(freq + 0.8, now)

      // Bộ lọc cộng hưởng gỗ Bách Xanh & Thông Đỏ
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(2600, now)
      filter.Q.setValueAtTime(2.4, now)

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0.32, now)
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

      gain1.gain.setValueAtTime(0.5, now)
      gain2.gain.setValueAtTime(0.5, now)

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

      setIsVibrating(true)
      setTimeout(() => setIsVibrating(false), 260)
    } catch {
      // Audio fallback im lặng
    }
  }

  const handlePlayString = (pair: MandolinStringPair) => {
    setActiveStringId(pair.id)
    playMandolinPairTone(pair.freq, 0.9)
  }

  const handlePlayPiece = async (piece: typeof CLASSIC_MANDOLIN_PIECES[0]) => {
    if (isPlayingPiece) return
    setIsPlayingPiece(true)
    setCurrentPieceId(piece.id)

    try {
      const ctx = getAudioContext()
      let offset = 0

      for (let i = 0; i < piece.notes.length; i++) {
        const note = (piece.notes[i] ?? piece.notes[0]) as (typeof piece.notes)[0]
        setTimeout(() => {
          playMandolinPairTone(note.freq, note.duration * 1.5)
        }, offset * 1000)
        offset += note.duration
      }

      setTimeout(() => {
        setIsPlayingPiece(false)
        setCurrentPieceId(null)
      }, (offset + 0.5) * 1000)
    } catch {
      setIsPlayingPiece(false)
      setCurrentPieceId(null)
    }
  }

  const currentLighting = (MANDOLIN_LIGHTING_SCENARIOS[activeLightingIndex] ?? MANDOLIN_LIGHTING_SCENARIOS[0]) as (typeof MANDOLIN_LIGHTING_SCENARIOS)[0]
  const currentPair = (MANDOLIN_STRING_PAIRS.find(p => p.id === activeStringId) ?? MANDOLIN_STRING_PAIRS[0]) as MandolinStringPair

  return (
    <section className={cn("relative w-full py-16 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden font-sans", className)}>
      {/* Background ánh sáng vi khí hậu */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-1000"
        style={{
          background: activeLightingIndex === 0 
            ? 'radial-gradient(circle at 50% 20%, rgba(217, 119, 6, 0.4), transparent 70%)'
            : activeLightingIndex === 1
            ? 'radial-gradient(circle at 50% 20%, rgba(251, 191, 36, 0.35), transparent 70%)'
            : 'radial-gradient(circle at 50% 20%, rgba(180, 83, 9, 0.3), transparent 70%)'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header danh mục Quiet Luxury */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-300 text-xs tracking-widest uppercase mb-4">
            <span>GuHomes Bespoke Sanctuary 2026</span>
            <span className="w-1 h-1 rounded-full bg-amber-400" />
            <span>Âm Học Thính Phòng Tinh Hoa</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-100 tracking-tight leading-snug">
            Thính Phòng Mandolin Vòm Bách Xanh
          </h2>
          <p className="mt-3 text-stone-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Hòa quyện tinh hoa mộc bản Napoli cùng hương thơm tinh dầu Bách Xanh Mộc Châu chống ẩm tự nhiên. Soundboard Thông Đỏ Lang Biang xẻ xốp 30 năm kiến tạo trường âm chuẩn mực RT60 = 0.32s tại Sài Gòn.
          </p>
        </div>

        {/* 3 Tab Điều Khiển */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-stone-900 border border-stone-800 rounded-xl">
            <button
              onClick={() => setActiveTab('strings')}
              className={cn(
                'px-5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300',
                activeTab === 'strings' ? 'bg-amber-700/80 text-amber-100 shadow-lg' : 'text-stone-400 hover:text-stone-200'
              )}
            >
              8 Dây Đôi Khảy Tremolo
            </button>
            <button
              onClick={() => setActiveTab('pieces')}
              className={cn(
                'px-5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300',
                activeTab === 'pieces' ? 'bg-amber-700/80 text-amber-100 shadow-lg' : 'text-stone-400 hover:text-stone-200'
              )}
            >
              Trích Đoạn Thính Phòng
            </button>
            <button
              onClick={() => setActiveTab('microclimate')}
              className={cn(
                'px-5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300',
                activeTab === 'microclimate' ? 'bg-amber-700/80 text-amber-100 shadow-lg' : 'text-stone-400 hover:text-stone-200'
              )}
            >
              Âm Học & Vi Khí Hậu Sài Gòn
            </button>
          </div>
        </div>

        {/* Khung Nội Dung Chính */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột trái: Mô phỏng hoặc Danh sách tương tác (7 cột) */}
          <div className="lg:col-span-7 bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 backdrop-blur-md">
            {activeTab === 'strings' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-lg text-amber-200">Bảng Khảy 4 Cặp Dây Mandolin Kép</h3>
                    <p className="text-xs text-stone-400">Chạm vào từng cặp dây để cảm nhận âm sắc bồi âm rung kép đặc thù</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-amber-900/40 border border-amber-600/40 text-amber-300 rounded-md">
                    Napoli Soundboard
                  </span>
                </div>

                {/* Khung trực quan 4 cặp dây đàn */}
                <div className="relative py-8 px-4 bg-stone-950/80 border border-stone-800 rounded-xl mb-6 flex flex-col gap-5 overflow-hidden">
                  {MANDOLIN_STRING_PAIRS.map((pair, idx) => {
                    const isSelected = pair.id === activeStringId
                    return (
                      <div
                        key={pair.id}
                        onClick={() => handlePlayString(pair)}
                        className={cn(
                          'relative group cursor-pointer p-4 rounded-xl transition-all duration-300 border',
                          isSelected
                            ? 'bg-amber-950/30 border-amber-500/50 shadow-md'
                            : 'bg-stone-900/40 border-stone-800/60 hover:border-stone-700 hover:bg-stone-900/80'
                        )}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-amber-900/60 border border-amber-500/40 flex items-center justify-center text-xs text-amber-300 font-mono">
                              {idx + 1}
                            </span>
                            <span className="font-serif text-stone-200 text-sm font-medium">{pair.pairName}</span>
                          </div>
                          <span className="font-mono text-xs text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/20">
                            {pair.pitch}
                          </span>
                        </div>

                        {/* Đồ họa đôi dây kim loại */}
                        <div className="relative w-full h-3 flex flex-col justify-center gap-1 my-2">
                          <div 
                            className={cn(
                              'w-full h-0.5 transition-all duration-150',
                              isSelected && isVibrating 
                                ? 'bg-amber-300 animate-pulse scale-y-125' 
                                : 'bg-gradient-to-r from-stone-600 via-amber-400/80 to-stone-600'
                            )}
                          />
                          <div 
                            className={cn(
                              'w-full h-0.5 transition-all duration-150',
                              isSelected && isVibrating 
                                ? 'bg-amber-300 animate-pulse scale-y-125' 
                                : 'bg-gradient-to-r from-stone-600 via-amber-400/80 to-stone-600'
                            )}
                          />
                        </div>

                        <div className="flex items-center justify-between text-xs text-stone-400 mt-2">
                          <span>{pair.material}</span>
                          <span className="text-amber-500/80 text-[11px] group-hover:text-amber-300 transition-colors">
                            Khảy Dây &rarr;
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Chi tiết cặp dây đang chọn */}
                <div className="p-4 bg-stone-950/60 border border-stone-800 rounded-xl">
                  <div className="text-xs uppercase tracking-wider text-amber-400 mb-1">Mô tả đặc tính âm sắc</div>
                  <p className="text-sm text-stone-300 leading-relaxed font-light">
                    {currentPair.description}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'pieces' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-lg text-amber-200">Trích Đoạn Thính Phòng Mandolin</h3>
                    <p className="text-xs text-stone-400">Trình diễn bồi âm Web Audio API trên tần số nguyên bản</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-amber-900/40 border border-amber-600/40 text-amber-300 rounded-md">
                    RT60 = 0.32s
                  </span>
                </div>

                <div className="space-y-4">
                  {CLASSIC_MANDOLIN_PIECES.map((piece) => {
                    const isCurrent = currentPieceId === piece.id
                    return (
                      <div
                        key={piece.id}
                        className={cn(
                          'p-4 rounded-xl border transition-all duration-300',
                          isCurrent
                            ? 'bg-amber-950/30 border-amber-500/60 shadow-lg'
                            : 'bg-stone-950/60 border-stone-800/80 hover:border-stone-700'
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                          <h4 className="font-serif text-stone-100 text-sm md:text-base">{piece.name}</h4>
                          <button
                            onClick={() => handlePlayPiece(piece)}
                            disabled={isPlayingPiece}
                            className={cn(
                              'px-4 py-1.5 rounded-lg text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 transition-all',
                              isCurrent && isPlayingPiece
                                ? 'bg-amber-600 text-white animate-pulse'
                                : 'bg-stone-800 hover:bg-amber-800/70 text-stone-200 hover:text-white border border-stone-700'
                            )}
                          >
                            {isCurrent && isPlayingPiece ? 'Đang Hòa Tấu...' : 'Lắng Nghe'}
                          </button>
                        </div>
                        <p className="text-xs text-stone-400 font-light leading-relaxed">{piece.mood}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 p-4 bg-stone-950/80 border border-stone-800/80 rounded-xl text-xs text-stone-400 leading-relaxed font-light">
                  <span className="text-amber-400 font-medium">Bí mật âm học:</span> Kỹ thuật khảy tremolo liên tục trên đôi dây Mandolin tạo nên nguồn năng lượng âm liên tục (continuous tone) kích thích các khoang rỗng tiêu âm tán âm Fermat trong thớ gỗ Bách Xanh, tạo ra cảm giác thính phòng rộng mở gấp đôi diện tích thực.
                </div>
              </div>
            )}

            {activeTab === 'microclimate' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg text-amber-200 mb-1">Kiến Trúc Âm Học & Vi Khí Hậu Sài Gòn</h3>
                  <p className="text-xs text-stone-400">Khắc chế nồm ẩm 80% RH và bức xạ nhiệt hướng Tây miền nhiệt đới</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl">
                    <div className="text-[11px] text-stone-400">Thời gian vang</div>
                    <div className="text-lg font-mono font-medium text-amber-300 mt-1">0.32 giây</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">Chuẩn RT60 nhạc cụ thính phòng</div>
                  </div>
                  <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl">
                    <div className="text-[11px] text-stone-400">Tủ vi khí hậu</div>
                    <div className="text-lg font-mono font-medium text-emerald-400 mt-1">50.0% RH</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">Khống chế sai lệch cao độ dây</div>
                  </div>
                  <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl">
                    <div className="text-[11px] text-stone-400">Gỗ Bách Xanh Mộc Châu</div>
                    <div className="text-lg font-mono font-medium text-amber-200 mt-1">98.5%</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">Kháng khuẩn & ẩm mốc tự nhiên</div>
                  </div>
                </div>

                <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-amber-400">Kết Cấu Vòm Tiêu Âm Fermat & Soundboard</h4>
                  <ul className="text-xs text-stone-300 space-y-2 leading-relaxed font-light">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span><strong>Soundboard Thông Đỏ Lang Biang:</strong> Gỗ già khai thác tự nhiên ngâm nước vôi trong 2 năm, loại bỏ nhựa dầu dư thừa, giúp mặt bảng âm xốp nhẹ truyền âm vận tốc 4.800 m/s.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span><strong>Lưng Quả Lê 24 Nan Bách Xanh:</strong> Ghép thủ công bằng keo da cá tự nhiên không dung môi hóa học, phát tán tinh dầu thơm thư giãn tâm trí người thưởng nhạc.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span><strong>Triệt Phản Xạ Âm Sông Sài Gòn:</strong> Hệ vách tiêu âm đa tầng hấp thụ hoàn toàn dải tần trầm 80Hz - 250Hz sinh ra từ gió sông luồn khe cửa.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Cột phải: Điều Khiển Ánh Sáng & Bảo Chứng Thương Hiệu GuHomes (5 cột) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Bộ điều chỉnh kịch bản ánh sáng */}
            <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="font-serif text-base text-amber-200 mb-1">3 Kịch Bản Ánh Sáng Thính Phòng</h3>
              <p className="text-xs text-stone-400 mb-4">Mô phỏng quang phổ tự nhiên cho buổi độc tấu riêng tư</p>

              <div className="space-y-3">
                {MANDOLIN_LIGHTING_SCENARIOS.map((sc, idx) => {
                  const isSelected = idx === activeLightingIndex
                  return (
                    <button
                      key={sc.id}
                      onClick={() => setActiveLightingIndex(idx)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border transition-all duration-300 flex items-center justify-between',
                        isSelected
                          ? 'bg-amber-950/40 border-amber-500/70 text-amber-100 shadow-md'
                          : 'bg-stone-950/50 border-stone-800/80 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                      )}
                    >
                      <div>
                        <div className="text-xs md:text-sm font-medium">{sc.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{sc.ambience}</div>
                      </div>
                      <span className="text-xs font-mono text-amber-400/90 ml-2 whitespace-nowrap bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                        {sc.lux}
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400">
                <span>Trạng thái quang thông:</span>
                <span className="text-amber-300 font-mono font-medium">{currentLighting.lux} • {currentLighting.name}</span>
              </div>
            </div>

            {/* Thẻ Bảo Chứng Quiet Luxury GuHomes */}
            <div className="bg-gradient-to-br from-stone-900/90 to-stone-950 border border-amber-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full border border-amber-500/30 bg-amber-950/40 flex items-center justify-center text-amber-300 font-serif font-bold text-lg">
                  G
                </div>
                <div>
                  <h4 className="font-serif text-stone-100 text-sm tracking-wide">GuHomes Bespoke Atelier</h4>
                  <div className="text-[11px] text-amber-400/80">Thợ Cả Mộc Bản & Kỹ Sư Âm Học Sài Gòn</div>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-light mb-4">
                Mỗi thính phòng hòa âm nhạc cụ dây do GuHomes thiết kế đều được tính toán mô phỏng âm học 3D ray-tracing, gia công tại xưởng Thạnh Xuân 1.200m² với tiêu chuẩn trần tối đa 12 công trình/năm nhằm bảo toàn phẩm cấp nghệ thuật.
              </p>

              <div className="space-y-2 pt-3 border-t border-stone-800 text-xs text-stone-400 font-mono">
                <div className="flex justify-between">
                  <span>Hotline KTS Trưởng:</span>
                  <a href="tel:0368757916" className="text-amber-300 hover:underline">0368 757 916</a>
                </div>
                <div className="flex justify-between">
                  <span>Email Giám Tuyển:</span>
                  <a href="mailto:guhomesvn@gmail.com" className="text-amber-300 hover:underline">guhomesvn@gmail.com</a>
                </div>
                <div className="flex justify-between">
                  <span>Chứng chỉ vi khí hậu:</span>
                  <span className="text-stone-300">GU-MANDOLIN-SANCTUARY-2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
