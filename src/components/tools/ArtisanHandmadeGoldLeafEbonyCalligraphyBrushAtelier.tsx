'use client'

import React, { useState, useRef } from 'react'

interface BrushProfile {
  id: string
  name: string
  bristleMaterial: string
  shaftWood: string
  strokeCharacter: string
  calligraphyStyle: string
  goldInlayPattern: string
  sensoryDescription: string
}

const BRUSH_COLLECTION: BrushProfile[] = [
  {
    id: 'tuyet-chon-dai-tu',
    name: 'Đại Bút Lông Chồn Tuyết & Trúc Bạch',
    bristleMaterial: 'Lông chồn tuyết Sa Pa chọn lọc sợi tơ tơ mềm mại',
    shaftWood: 'Thân gỗ Mun sọc Nam Bộ tiện thủ công mộng chìm',
    strokeCharacter: 'Nét bút phóng khoáng, độ ngậm mực sâu và đàn hồi tuyệt hảo',
    calligraphyStyle: 'Đại Tự & Hoành Phi Câu Đối Cung Đình',
    goldInlayPattern: 'Dát 5 lớp vàng quỳ 24K Kiêu Kỵ hoa văn vân mây thời Lý',
    sensoryDescription: 'Cây bút lướt trên giấy Dó như mây trôi nước chảy, để lại những vệt mực đen tuyền đầy khí lực.',
  },
  {
    id: 'soc-do-trung-tu',
    name: 'Trung Bút Lông Sóc Đuôi Đỏ & Gỗ Trắc',
    bristleMaterial: 'Lông sóc đuôi đỏ Tây Nguyên độ cứng trung bình',
    shaftWood: 'Thân gỗ Trắc đỏ đen khảm bạc 999 hoa mai',
    strokeCharacter: 'Nét bút sắc sảo, cương nhu phối hợp, giữ phom đầu bút hoàn hảo',
    calligraphyStyle: 'Hành Thư & Thảo Thư Thanh Thoát',
    goldInlayPattern: 'Chỉ vàng 24K nẹp vòng đai thân bút mạ vàng cát',
    sensoryDescription: 'Từng chuyển động cổ tay uyển chuyển được truyền trọn vẹn xuống đầu ngọn bút sắc lẹm.',
  },
  {
    id: 'de-nui-tieu-tu',
    name: 'Tiểu Bút Lông Dê Núi & Ngà Xương Hóa Thạch',
    bristleMaterial: 'Lông dê núi Ninh Bình sấy thảo mộc thơm mát',
    shaftWood: 'Thân xương ngà voi hóa thạch ngàn năm chạm triện',
    strokeCharacter: 'Đầu nhọn mảnh như sợi tơ, kiểm soát nét vi mô tinh xảo',
    calligraphyStyle: 'Khải Thư Chân Phương & Thư Họa Chi Tiết',
    goldInlayPattern: 'Hoa văn sóng nước thủy ba nạm vàng quỳ 24K quanh cổ bút',
    sensoryDescription: 'Đầu bút nhẹ nhàng đặt xuống mặt giấy tạo nên những chữ tiểu tự chuẩn mực từng milimet.',
  },
]

export function ArtisanHandmadeGoldLeafEbonyCalligraphyBrushAtelier({ className = '' }: { className?: string }) {
  const [selectedBrushId, setSelectedBrushId] = useState<string>('tuyet-chon-dai-tu')
  const [zoomLevel, setZoomLevel] = useState<number>(2)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)

  const currentBrush = BRUSH_COLLECTION.find((b) => b.id === selectedBrushId) ?? BRUSH_COLLECTION[0]!

  const playBrushClickSound = () => {
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

      const now = audioCtxRef.current.currentTime

      // 1. Tactile click of Neodymium magnetic latch
      const osc = audioCtxRef.current.createOscillator()
      const oscGain = audioCtxRef.current.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1750, now)
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05)

      oscGain.gain.setValueAtTime(0.001, now)
      oscGain.gain.linearRampToValueAtTime(0.22, now + 0.005)
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055)

      osc.connect(oscGain)
      oscGain.connect(masterGainRef.current)

      osc.start(now)
      osc.stop(now + 0.06)

      // 2. Resonant solid ebony wood thump
      const woodOsc = audioCtxRef.current.createOscillator()
      const woodGain = audioCtxRef.current.createGain()

      woodOsc.type = 'sine'
      woodOsc.frequency.setValueAtTime(260, now + 0.01)
      woodOsc.frequency.exponentialRampToValueAtTime(85, now + 0.14)

      woodGain.gain.setValueAtTime(0.001, now + 0.01)
      woodGain.gain.linearRampToValueAtTime(0.16, now + 0.02)
      woodGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)

      woodOsc.connect(woodGain)
      woodGain.connect(masterGainRef.current)

      woodOsc.start(now + 0.01)
      woodOsc.stop(now + 0.16)

      setIsPlayingAudio(true)
      setTimeout(() => setIsPlayingAudio(false), 250)
    } catch {
      // AudioContext fallback
    }
  }

  return (
    <section className={`w-full py-16 sm:py-24 bg-[#0F1412] text-[#F3EFEA] border-t border-[#C5A880]/20 relative overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#C5A880]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1C2824] blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C5A880]/20 pb-8 mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
              <span>● Nghệ Thuật Văn Phòng Tứ Bảo</span>
              <span>· Tráp Bút Mun Sọc Dát Vàng Quỳ 24K</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Tráp Bút Thư Pháp Mun Sọc & Vàng Quỳ 24K
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Vật phẩm thư phòng thượng lưu dành cho gia chủ tao nhã: Tráp gỗ Mun sọc Nam Bộ nguyên khối dát vàng quỳ Kiêu Kỵ 5 lớp hoa văn mây cuộn thời Lý, nắp nam châm Neodymium 0.6 Tesla đóng khít êm ái, lót nhung tơ tằm Vạn Phúc đỏ cẩm tú nâng niu bộ bút lông thủ công.
            </p>
          </div>

          {/* Web Audio Magnet Click Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={playBrushClickSound}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                isPlayingAudio
                  ? 'bg-[#C5A880] text-[#0F1412] shadow-lg shadow-[#C5A880]/20 font-semibold'
                  : 'bg-[#1C2824] text-[#C5A880] border border-[#C5A880]/30 hover:border-[#C5A880]'
              }`}
              aria-label="Thử cơ chế khóa nam châm tráp bút"
            >
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-[#0F1412] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isPlayingAudio ? 'Đang Hít Khóa Nam Châm' : 'Thử Khóa Khí Nam Châm 0.6T'}</span>
              <span className="font-mono text-[10px]">Click</span>
            </button>
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill Selection (Left Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Chọn Cây Bút Trong Bộ Ngự Dụng:
            </span>

            <div className="flex flex-col gap-3">
              {BRUSH_COLLECTION.map((brush) => {
                const isActive = brush.id === selectedBrushId
                return (
                  <button
                    key={brush.id}
                    onClick={() => setSelectedBrushId(brush.id)}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C2824] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-[1.01]'
                        : 'bg-[#131A17] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isActive ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {brush.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {brush.sensoryDescription}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Macro Zoom Controller */}
            <div className="p-5 rounded-2xl bg-[#131A17] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Soi Chi Tiết Lông Bút & Vàng Quỳ:</span>
                <span className="text-[#C5A880] font-semibold">{zoomLevel}x Macro Zoom</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#1C2824] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                aria-label="Điều chỉnh độ phóng đại quan sát bút lông"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>1x Toàn cảnh tráp bút</span>
                <span>2x Sợi lông tơ tự nhiên</span>
                <span>4x Vảy dát vàng quỳ 24K</span>
              </div>
            </div>
          </div>

          {/* Detailed Spec Panel (Right Col 7) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Visual Glassmorphic Spec Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#131A17]/80 border border-[#C5A880]/30 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#C5A880]/20 mb-6">
                <div>
                  <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider block mb-1">
                    Hồ Sơ Giám Định Thư Khí & Mỹ Nghệ Hoàng Gia
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#F3EFEA]">
                    {currentBrush.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Vàng Quỳ 24K
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Khóa 0.6T
                  </span>
                </div>
              </div>

              {/* Material & Craft Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Chất Liệu Lông</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">Tự Nhiên 100%</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Lực Hút Khóa</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">0.6 Tesla</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Đệm Lót Hộp</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">Lụa Vạn Phúc</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Tuổi Gỗ Mun</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">&gt; 80 Năm</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4 text-xs sm:text-sm font-light text-[#D6D3D1] leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Đặc Tính Nét Bút:</span>
                  <span>{currentBrush.strokeCharacter}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Nghệ Thuật Vàng:</span>
                  <span>{currentBrush.goldInlayPattern}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Thân Quản Bút:</span>
                  <span>{currentBrush.shaftWood}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Phong Cách Thư Pháp:</span>
                  <span>{currentBrush.calligraphyStyle}</span>
                </div>
              </div>

              {/* Lead Architect Quote */}
              <div className="mt-6 pt-6 border-t border-[#C5A880]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C2824] border border-[#C5A880]/40 flex items-center justify-center shrink-0 font-display text-sm text-[#C5A880]">
                  Gu
                </div>
                <div>
                  <p className="text-xs sm:text-sm italic text-[#F3EFEA]/90 font-serif leading-relaxed">
                    &ldquo;{currentBrush.sensoryDescription}&rdquo;
                  </p>
                  <span className="text-[11px] font-mono text-[#A8A29E] mt-1 block">
                    KTS Trưởng GuHomes: 0368 757 916 · Email: guhomesvn@gmail.com · Xưởng may đo Thạnh Xuân 1.200m²
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
