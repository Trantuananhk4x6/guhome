'use client'

import React, { useState, useRef } from 'react'

interface LotusTeaExperience {
  id: string
  title: string
  tideLevelMeters: number
  teaType: string
  brewingVessel: string
  waterSource: string
  aromaProfile: string
  mindfulnessQuote: string
}

const LOTUS_EXPERIENCES: LotusTeaExperience[] = [
  {
    id: 'dawn-lotus-dew',
    title: 'Trà Sen Bách Diệp Sương Mai',
    tideLevelMeters: 1.2,
    teaType: 'Trà Móc Câu Tân Cương ướp trong búp sen Quan Âm qua đêm',
    brewingVessel: 'Ấm đất nung Bát Tràng men da lươn cổ',
    waterSource: 'Nước sương đọng trên lá sen sớm mai đun sôi đầu tăm 85°C',
    aromaProfile: 'Hương cốm non thanh khiết quyện hòa vị ngọt bùi sâu lắng của hoa sen nhiệt đới.',
    mindfulnessQuote: 'Đón bình minh trên dòng sông tĩnh lặng, nghe tiếng giọt sương rơi nhẹ trên phiến lá mộc.',
  },
  {
    id: 'afternoon-river-breeze',
    title: 'Bạch Trà Sen Phổ Nhĩ Bách Niên',
    tideLevelMeters: 0.6,
    teaType: 'Bạch Trà Shan Tuyết Tây Côn Lĩnh ủ cánh sen sấy thăng hoa',
    brewingVessel: 'Tống ngọc sứ thấu quang men ngọc bích',
    waterSource: 'Nước mưa thượng tầng lắng lu sành 3 năm lọc than hoạt tính gáo dừa',
    aromaProfile: 'Vị mật ngọt dịu dàng, hương thảo mộc hoang dã bền bỉ qua mười hai tuần nước.',
    mindfulnessQuote: 'Gió chiều Nam Bộ mang hơi nước rạch tự nhiên, xua tan mọi oi bức và lo toan đô thị.',
  },
  {
    id: 'dusk-canal-tranquility',
    title: 'Hồng Trà Sen Trầm Hương Thảo Điền',
    tideLevelMeters: 1.6,
    teaType: 'Hồng trà cổ thụ hữu cơ dệt khói Trầm kiến tự nhiên',
    brewingVessel: 'Ấm Tử Sa Chu Nê nung củi nhiệt độ 1250°C',
    waterSource: 'Nước khoáng ngầm tầng sâu đá ong Thạch Thất đun than nhãn không khói',
    aromaProfile: 'Nốt hương mật mía đầm ấm hòa cùng khói trầm phảng phất, vỗ về giấc ngủ an lành.',
    mindfulnessQuote: 'Khi hoàng hôn nhuộm đỏ bến sông, từng nốt hương trầm đưa tâm thức về miền an trú nguyên bản.',
  },
]

export function SaigonCanalSideFloatingLotusTeaPavilion({ className = '' }: { className?: string }) {
  const [selectedExpId, setSelectedExpId] = useState<string>('dawn-lotus-dew')
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [paddlePace, setPaddlePace] = useState<number>(3)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null)

  const currentExp = LOTUS_EXPERIENCES.find((e) => e.id === selectedExpId) ?? LOTUS_EXPERIENCES[0]!

  const startWaterSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }

      if (!masterGainRef.current) {
        const master = audioCtxRef.current.createGain()
        master.gain.setValueAtTime(0.2, audioCtxRef.current.currentTime)
        master.connect(audioCtxRef.current.destination)
        masterGainRef.current = master
      }

      const playPaddleStroke = () => {
        if (!audioCtxRef.current || !masterGainRef.current) return
        const now = audioCtxRef.current.currentTime

        // Pink noise buffer for gentle river splash
        const bufferSize = audioCtxRef.current.sampleRate * 0.8
        const buffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate)
        const output = buffer.getChannelData(0)
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1
          b0 = 0.99886 * b0 + white * 0.0555179
          b1 = 0.99332 * b1 + white * 0.0750759
          b2 = 0.969 * b2 + white * 0.153852
          b3 = 0.8665 * b3 + white * 0.3104856
          b4 = 0.55 * b4 + white * 0.5329522
          output[i] = (b0 + b1 + b2 + b3 + b4) * 0.08
        }

        const noiseNode = audioCtxRef.current.createBufferSource()
        noiseNode.buffer = buffer

        const filter = audioCtxRef.current.createBiquadFilter()
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(650, now)
        filter.frequency.exponentialRampToValueAtTime(180, now + 0.7)

        const strokeGain = audioCtxRef.current.createGain()
        strokeGain.gain.setValueAtTime(0.001, now)
        strokeGain.gain.linearRampToValueAtTime(0.25, now + 0.12)
        strokeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.75)

        noiseNode.connect(filter)
        filter.connect(strokeGain)
        strokeGain.connect(masterGainRef.current)

        noiseNode.start(now)
        noiseNode.stop(now + 0.8)
      }

      playPaddleStroke()
      if (intervalIdRef.current) clearInterval(intervalIdRef.current)
      intervalIdRef.current = setInterval(playPaddleStroke, (6 - paddlePace) * 800)

      setIsPlayingAudio(true)
    } catch {
      // AudioContext not supported
    }
  }

  const stopWaterSound = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current)
      intervalIdRef.current = null
    }
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.3)
    }
    setIsPlayingAudio(false)
  }

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopWaterSound()
    } else {
      startWaterSound()
    }
  }

  return (
    <section className={`w-full py-16 sm:py-24 bg-[#0F1412] text-[#F3EFEA] border-t border-[#C5A880]/20 relative overflow-hidden ${className}`}>
      {/* Visual background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#C5A880]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#1C2824] blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C5A880]/20 pb-8 mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
              <span>● Nghệ Thuật Không Gian Thủy Sinh</span>
              <span>· Triều Cường Sài Gòn ±1.8m</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Thủy Đình Nổi Đầm Sen & Trà Thất Ven Rạch
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Giải pháp không gian sống thích ứng triều cường sông Sài Gòn độc bản từ GuHomes: sàn nổi phao composite bazan giấu chìm, khung gỗ Gõ Đỏ mộng chìm liên kết nan tre uốn vòm, sàn Teak chà nhám kháng nước lợ tuyệt đối.
            </p>
          </div>

          {/* Web Audio Water Feature Control */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAudio}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                isPlayingAudio
                  ? 'bg-[#C5A880] text-[#0F1412] shadow-lg shadow-[#C5A880]/20 font-semibold'
                  : 'bg-[#1C2824] text-[#C5A880] border border-[#C5A880]/30 hover:border-[#C5A880]'
              }`}
              aria-label={isPlayingAudio ? 'Dừng âm thanh chèo thuyền đầm sen' : 'Mở âm thanh chèo thuyền đầm sen'}
            >
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-[#0F1412] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isPlayingAudio ? 'Đang Phát Thủy Âm Đầm Sen' : 'Lắng Nghe Tiếng Mái Chèo'}</span>
              <span className="font-mono text-[10px]">{isPlayingAudio ? '432 Hz' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill Selection (Left Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Chọn Thời Khắc Thưởng Trà Sen Trên Sông:
            </span>

            <div className="flex flex-col gap-3">
              {LOTUS_EXPERIENCES.map((exp) => {
                const isActive = exp.id === selectedExpId
                return (
                  <button
                    key={exp.id}
                    onClick={() => setSelectedExpId(exp.id)}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C2824] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-[1.01]'
                        : 'bg-[#131A17] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isActive ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {exp.title}
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#0F1412] border border-[#C5A880]/20 text-[#A8A29E]">
                        Triều: +{exp.tideLevelMeters}m
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {exp.aromaProfile}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Paddle Pace Controller */}
            <div className="p-5 rounded-2xl bg-[#131A17] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Nhịp Mái Chèo Ven Rạch:</span>
                <span className="text-[#C5A880] font-semibold">{paddlePace}/5 nhịp</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={paddlePace}
                onChange={(e) => setPaddlePace(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1C2824] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                aria-label="Điều chỉnh nhịp mái chèo"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>Chậm rãi tĩnh tại</span>
                <span>Thư thái đón gió</span>
              </div>
            </div>
          </div>

          {/* Technical Details Display (Right Col 7) */}
          <div className="lg:col-span-7 bg-[#131A17] border border-[#C5A880]/30 rounded-3xl p-6 sm:p-8 relative">
            <div className="flex items-center justify-between border-b border-[#C5A880]/15 pb-4 mb-6">
              <span className="text-xs font-mono text-[#C5A880] uppercase tracking-widest">
                Đặc Tả Quy Chuẩn Kỹ Thuật GuHomes
              </span>
              <span className="text-xs text-[#A8A29E] font-mono">Mã CT: GH-FLT-2026</span>
            </div>

            <h3 className="text-2xl font-display text-[#F3EFEA] mb-4">
              {currentExp.title}
            </h3>

            <blockquote className="border-l-2 border-[#C5A880] pl-4 italic text-sm text-[#A8A29E] mb-8 font-light leading-relaxed">
              &ldquo;{currentExp.mindfulnessQuote}&rdquo;
            </blockquote>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#0F1412] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Trà Phẩm Tuyển Chọn
                </span>
                <p className="text-xs sm:text-sm text-[#F3EFEA] font-light">
                  {currentExp.teaType}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1412] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Khí Cụ Pha Trà
                </span>
                <p className="text-xs sm:text-sm text-[#F3EFEA] font-light">
                  {currentExp.brewingVessel}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1412] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Nguồn Nước Pha Trà
                </span>
                <p className="text-xs sm:text-sm text-[#F3EFEA] font-light">
                  {currentExp.waterSource}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F1412] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Biên Độ Triều Cường Chịu Tải
                </span>
                <p className="text-xs sm:text-sm text-[#C5A880] font-mono font-medium">
                  +{currentExp.tideLevelMeters}m (Hệ neo thủy lực ±1.8m)
                </p>
              </div>
            </div>

            {/* Studio Commitment Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#1C2824] border border-[#C5A880]/30 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center font-bold text-xs shrink-0">
                  12
                </span>
                <span className="text-[#A8A29E]">
                  Trần 12 công trình/năm: KTS Trưởng trực tiếp đo đạc thủy triều và định vị neo nổi.
                </span>
              </div>
              <a
                href="tel:0368757916"
                className="min-h-[44px] px-4 py-2 rounded-full bg-[#C5A880] text-[#0F1412] font-semibold hover:bg-[#D4B68D] transition-colors whitespace-nowrap flex items-center justify-center"
              >
                Hotline KTS: 0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
