'use client'

import React, { useState, useRef } from 'react'

interface SnuffBottleEssence {
  id: string
  name: string
  composition: string
  herbalPotency: string
  aromaNote: string
  jadeColorTone: string
  filigreePattern: string
  spoonMaterial: string
  therapeuticEffect: string
}

const ESSENCE_COLLECTION: SnuffBottleEssence[] = [
  {
    id: 'hoang-gia-xa-huong',
    name: 'Xạ Hương Hoàng Gia & Hổ Phách Biển Đông',
    composition: 'Xạ hương tự nhiên ủ hổ phách hóa thạch và tinh dầu hoa lan rừng',
    herbalPotency: 'Khai khiếu thông kinh lạc, đánh thức ngũ quan và gia tăng sinh khí',
    aromaNote: 'Ấm nồng, quyến rũ, vương giả với chiều sâu xúc giác lưu hương trường cửu.',
    jadeColorTone: 'Ngọc bích Hòa Điền thấu quang lục thẫm (Deep Spinach Jade)',
    filigreePattern: 'Lưới mây rồng thời Lý chỉ vàng 24K đan kép đường kính 0.12mm',
    spoonMaterial: 'Muỗng ngà voi hóa thạch ngàn năm chạm khắc vân triện',
    therapeuticEffect: 'Giải tỏa căng thẳng trí não tức thì sau các phiên đàm phán quan trọng.',
  },
  {
    id: 'ky-nam-vi-phan',
    name: 'Bột Kỳ Nam Tự Nhiên Nghiền Mịn 0.05mm',
    composition: 'Kỳ nam bạch phiến nguyên chất tán vi hạt bằng cối ngọc lạnh',
    herbalPotency: 'Dưỡng tâm an thần, tán phong nhiệt, điều hòa nhịp thở vi khí hậu nội tại',
    aromaNote: 'Ngọt bùi sâu lắng, hơi cay nhẹ ở cánh mũi và để lại dư vị ngọt lịm cuống họng.',
    jadeColorTone: 'Bạch ngọc mỡ cừu (Mutton Fat Jade) thấu quang 92%',
    filigreePattern: 'Mạng hoa sen bách diệp đan xen chỉ vàng 24K dát hạt châu li ti',
    spoonMaterial: 'Muỗng đồi mồi sừng trâu nước ĐBSCL dát chỉ vàng 24K',
    therapeuticEffect: 'Tạo lập tâm thái thiền định tĩnh tại trước khi bước vào phòng đọc sách cá nhân.',
  },
  {
    id: 'bang-phien-long-nao',
    name: 'Bột Băng Phiến Cổ Thụ & Hoa Nhài Sấy Lạnh',
    composition: 'Tinh thể băng phiến long não trăm tuổi kết hợp phấn hoa nhài tuyết',
    herbalPotency: 'Thông khiếu tỉnh thần, hạ nhiệt tức thì, xua tan cảm giác mệt mỏi oi ả',
    aromaNote: 'The mát tột đỉnh, thanh khiết sảng khoái tựa làn gió sớm trên đỉnh núi cao.',
    jadeColorTone: 'Ngọc bích táo non (Apple Green Jade) vân mây trắng',
    filigreePattern: 'Hoa văn sóng nước thủy ba thời Lê Sơ nạm hạt ruby mi-cro',
    spoonMaterial: 'Muỗng bạc 999 thúc tay hoa mai cổ điển',
    therapeuticEffect: 'Tái tạo năng lượng và sự sắc bén của tư duy trong vài giây ngắn ngủi.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeSnuffBottleAtelier({ className = '' }: { className?: string }) {
  const [selectedEssenceId, setSelectedEssenceId] = useState<string>('ky-nam-vi-phan')
  const [zoomLevel, setZoomLevel] = useState<number>(2)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)

  const currentEssence = ESSENCE_COLLECTION.find((e) => e.id === selectedEssenceId) ?? ESSENCE_COLLECTION[0]!

  const playSnuffBottleClickSound = () => {
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

      // 1. High frequency tactile "click" of Neodymium magnet latch (0.6 Tesla)
      const osc = audioCtxRef.current.createOscillator()
      const oscGain = audioCtxRef.current.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1850, now)
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.045)

      oscGain.gain.setValueAtTime(0.001, now)
      oscGain.gain.linearRampToValueAtTime(0.22, now + 0.005)
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05)

      osc.connect(oscGain)
      oscGain.connect(masterGainRef.current)

      osc.start(now)
      osc.stop(now + 0.055)

      // 2. Soft resonant jade acoustic thump
      const jadeOsc = audioCtxRef.current.createOscillator()
      const jadeGain = audioCtxRef.current.createGain()

      jadeOsc.type = 'sine'
      jadeOsc.frequency.setValueAtTime(320, now + 0.01)
      jadeOsc.frequency.exponentialRampToValueAtTime(95, now + 0.12)

      jadeGain.gain.setValueAtTime(0.001, now + 0.01)
      jadeGain.gain.linearRampToValueAtTime(0.15, now + 0.02)
      jadeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)

      jadeOsc.connect(jadeGain)
      jadeGain.connect(masterGainRef.current)

      jadeOsc.start(now + 0.01)
      jadeOsc.stop(now + 0.16)

      setIsPlayingAudio(true)
      setTimeout(() => setIsPlayingAudio(false), 250)
    } catch {
      // AudioContext fallback
    }
  }

  return (
    <section className={`w-full py-16 sm:py-24 bg-[#0F1412] text-[#F3EFEA] border-t border-[#C5A880]/20 relative overflow-hidden ${className}`}>
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-radial from-[#C5A880]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1C2824] blur-3xl pointer-events-none opacity-40" />

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C5A880]/20 pb-8 mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
              <span>● Nghệ Thuật Kim Hoàn & Dược Hương Quý</span>
              <span>· Ngọc Bích Hòa Điền & Vàng 24K Filigree</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Tráp Hũ Hít Ngọc Bích & Lưới Vàng Filigree
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Vật phẩm ngự dụng cá nhân dành cho giới tinh hoa: Tráp gỗ Trắc đỏ đen nguyên khối lót nhung tơ tằm Vạn Phúc, hũ hít ngọc bích tự nhiên bọc mạng vàng 24K filigree 0.12mm kéo tay thủ công, khóa nam châm kín khí bảo tồn dược hương trọn vẹn.
            </p>
          </div>

          {/* Web Audio Magnet Click Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={playSnuffBottleClickSound}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                isPlayingAudio
                  ? 'bg-[#C5A880] text-[#0F1412] shadow-lg shadow-[#C5A880]/20 font-semibold'
                  : 'bg-[#1C2824] text-[#C5A880] border border-[#C5A880]/30 hover:border-[#C5A880]'
              }`}
              aria-label="Thử cơ chế khóa nam châm nắp hũ hít"
            >
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-[#0F1412] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isPlayingAudio ? 'Đang Hít Khóa Khí Kín' : 'Thử Khóa Khí Nam Châm 0.6T'}</span>
              <span className="font-mono text-[10px]">Click</span>
            </button>
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill Selection (Left Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Chọn Ngự Phẩm Dược Hương Trong Hũ Hít:
            </span>

            <div className="flex flex-col gap-3">
              {ESSENCE_COLLECTION.map((essence) => {
                const isActive = essence.id === selectedEssenceId
                return (
                  <button
                    key={essence.id}
                    onClick={() => setSelectedEssenceId(essence.id)}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C2824] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-[1.01]'
                        : 'bg-[#131A17] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isActive ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {essence.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {essence.aromaNote}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Macro Zoom Controller for Filigree */}
            <div className="p-5 rounded-2xl bg-[#131A17] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Soi Chi Tiết Lưới Vàng Filigree:</span>
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
                aria-label="Điều chỉnh độ phóng đại quan sát lưới vàng"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>1x Toàn cảnh</span>
                <span>2x Sợi chỉ vàng 0.12mm</span>
                <span>4x Vết hàn vảy rồng</span>
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
                    Hồ Sơ Giám Định Kim Hoàn & Dược Tinh Thể
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#F3EFEA]">
                    {currentEssence.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Vàng 24K 99.99%
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Kín Khí 99.8%
                  </span>
                </div>
              </div>

              {/* Material & Craft Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Sợi Vàng Chỉ</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">0.12 mm</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Thấu Quang Ngọc</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">88 - 92%</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Lực Hút Khóa</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">0.6 Tesla</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Cỡ Hạt Bột</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">0.05 mm</span>
                </div>
              </div>

              {/* Jewelry & Herbal Details */}
              <div className="space-y-4 text-xs sm:text-sm font-light text-[#D6D3D1] leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Ngọc Bích Tự Nhiên:</span>
                  <span>{currentEssence.jadeColorTone}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Mạng Lưới Vàng:</span>
                  <span>{currentEssence.filigreePattern}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Muỗng Xúc Dược Liệu:</span>
                  <span>{currentEssence.spoonMaterial}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Dược Tính Dưỡng Sinh:</span>
                  <span>{currentEssence.herbalPotency} ({currentEssence.therapeuticEffect})</span>
                </div>
              </div>

              {/* Lead Architect Quote */}
              <div className="mt-6 pt-6 border-t border-[#C5A880]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C2824] border border-[#C5A880]/40 flex items-center justify-center shrink-0 font-display text-sm text-[#C5A880]">
                  Gu
                </div>
                <div>
                  <p className="text-xs sm:text-sm italic text-[#F3EFEA]/90 font-serif leading-relaxed">
                    &ldquo;{currentEssence.aromaNote}&rdquo;
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
