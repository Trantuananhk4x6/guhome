'use client'

import React, { useState, useRef } from 'react'

interface ArtisanalTeaProfile {
  id: string
  name: string
  harvestAltitude: string
  oxidationLevel: string
  storageHumidityPct: number
  tasteNotes: string
  goldLeafCraft: string
  preservationNote: string
}

const ARTISANAL_TEAS: ArtisanalTeaProfile[] = [
  {
    id: 'shan-tuyet-tay-con-linh',
    name: 'Trà Shan Tuyết Cổ Thụ Tây Côn Lĩnh',
    harvestAltitude: '2.400m so với mực nước biển',
    oxidationLevel: 'Lên men nhẹ 15% (Bạch Trà)',
    storageHumidityPct: 52,
    tasteNotes: 'Hương mật ong rừng ngào ngạt, vị chát dịu êm và hậu ngọt sâu lắng kéo dài tới mười hai tuần nước.',
    goldLeafCraft: 'Dát 5 lớp vàng quỳ 24K Kiêu Kỵ hoa văn sóng nước cổ điển, phủ sơn then bảo vệ vĩnh cửu.',
    preservationNote: 'Ruột lót gỗ Tuyết Tùng Tây Ban Nha tự hút ẩm dư thừa, giữ trọn lớp lông tuyết trắng trên từng búp chè.',
  },
  {
    id: 'moc-cau-tan-cuong-uop-sen',
    name: 'Trà Móc Câu Tân Cương Ướp Sen Bách Diệp',
    harvestAltitude: 'Vùng đồi chè Tân Cương & Đầm Sen Tây Hồ',
    oxidationLevel: 'Lục trà sao suốt truyền thống',
    storageHumidityPct: 55,
    tasteNotes: 'Hương cốm non thơm ngát quyện hòa tinh dầu sen tự nhiên, nước trà xanh sánh trong vắt như ngọc bích.',
    goldLeafCraft: 'Khảm hoa sen dát vàng 24K tinh xảo trên nền gỗ Mun sọc Nam Bộ vân mây hổ phách.',
    preservationNote: 'Khóa nam châm Neodymium 0.6 Tesla và gioăng silicon y tế ngăn chặn hoàn toàn sự bay mùi hương sen quý.',
  },
  {
    id: 'bach-tra-ta-xua',
    name: 'Bạch Trà Đỉnh Mây Tà Xùa Trăm Tuổi',
    harvestAltitude: '2.200m quanh năm mây mù che phủ',
    oxidationLevel: 'Không lên men (Héo tự nhiên & sấy mộc)',
    storageHumidityPct: 50,
    tasteNotes: 'Thanh mát như sương sớm đỉnh non cao, thoang thoảng mùi cỏ ngọt và lan rừng hoang dã.',
    goldLeafCraft: 'Họa tiết vân mây thời Lý dát vàng quỳ thủ công từng nét cọ dặm vàng truyền thống.',
    preservationNote: 'Không gian kín khí 99.8% giúp các enzyme tự nhiên tiếp tục chuyển hóa êm đềm theo thời gian.',
  },
]

export function ArtisanHandmadeGoldLeafEbonyTeaBoxAtelier({ className = '' }: { className?: string }) {
  const [selectedTeaId, setSelectedTeaId] = useState<string>('shan-tuyet-tay-con-linh')
  const [zoomLevel, setZoomLevel] = useState<number>(2)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)

  const currentTea = ARTISANAL_TEAS.find((t) => t.id === selectedTeaId) ?? ARTISANAL_TEAS[0]!

  const playTeaBoxClickSound = () => {
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

      // 1. Tactile click of Neodymium magnetic seal
      const osc = audioCtxRef.current.createOscillator()
      const oscGain = audioCtxRef.current.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1650, now)
      osc.frequency.exponentialRampToValueAtTime(280, now + 0.05)

      oscGain.gain.setValueAtTime(0.001, now)
      oscGain.gain.linearRampToValueAtTime(0.22, now + 0.006)
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055)

      osc.connect(oscGain)
      oscGain.connect(masterGainRef.current)

      osc.start(now)
      osc.stop(now + 0.06)

      // 2. Deep solid ebony wood resonance
      const woodOsc = audioCtxRef.current.createOscillator()
      const woodGain = audioCtxRef.current.createGain()

      woodOsc.type = 'sine'
      woodOsc.frequency.setValueAtTime(240, now + 0.01)
      woodOsc.frequency.exponentialRampToValueAtTime(80, now + 0.14)

      woodGain.gain.setValueAtTime(0.001, now + 0.01)
      woodGain.gain.linearRampToValueAtTime(0.18, now + 0.02)
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
              <span>● Nghệ Thuật Dưỡng Trà Đỉnh Cao</span>
              <span>· Hộp Gỗ Mun Sọc Dát Vàng Quỳ 24K</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Hộp Trà Mun Sọc Dát Vàng Quỳ & Khóa Khí Kín
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Vật phẩm bảo quản ngự trà thượng hạng: Khối gỗ Mun sọc Nam Bộ nguyên khối dát vàng quỳ 24K Kiêu Kỵ, lót gỗ Tuyết Tùng Tây Ban Nha hút ẩm tự nhiên, kết hợp gioăng silicon y tế và nam châm Neodymium bảo tồn hương trà nguyên bản 100%.
            </p>
          </div>

          {/* Web Audio Magnet Click Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={playTeaBoxClickSound}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                isPlayingAudio
                  ? 'bg-[#C5A880] text-[#0F1412] shadow-lg shadow-[#C5A880]/20 font-semibold'
                  : 'bg-[#1C2824] text-[#C5A880] border border-[#C5A880]/30 hover:border-[#C5A880]'
              }`}
              aria-label="Thử cơ chế khóa nam châm hộp trà"
            >
              <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-[#0F1412] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isPlayingAudio ? 'Đang Khóa Khí Kín Khít' : 'Thử Khóa Nam Châm Neodymium'}</span>
              <span className="font-mono text-[10px]">Click</span>
            </button>
          </div>
        </div>

        {/* Interactive Experience Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Pill Selection (Left Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Chọn Danh Trà Cất Giữ Trong Hộp:
            </span>

            <div className="flex flex-col gap-3">
              {ARTISANAL_TEAS.map((tea) => {
                const isActive = tea.id === selectedTeaId
                return (
                  <button
                    key={tea.id}
                    onClick={() => setSelectedTeaId(tea.id)}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1C2824] border-[#C5A880] shadow-md shadow-[#C5A880]/10 scale-[1.01]'
                        : 'bg-[#131A17] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isActive ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {tea.name}
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] line-clamp-2 leading-relaxed font-light">
                      {tea.tasteNotes}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Macro Zoom Controller */}
            <div className="p-5 rounded-2xl bg-[#131A17] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Soi Chi Tiết Vàng Quỳ & Vân Gỗ Mun:</span>
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
                aria-label="Điều chỉnh độ phóng đại quan sát hộp trà"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>1x Toàn cảnh hộp trà</span>
                <span>2x Vân gỗ mun sọc</span>
                <span>4x Lớp dát vàng quỳ 24K</span>
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
                    Hồ Sơ Giám Định Chế Tác & Bảo Tồn Dược Trà
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-normal text-[#F3EFEA]">
                    {currentTea.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Vàng Quỳ 24K 5 Lớp
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#1C2824] border border-[#C5A880]/30 text-xs font-mono text-[#C5A880]">
                    Kín Khí 99.8%
                  </span>
                </div>
              </div>

              {/* Material & Tea Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Độ Ẩm Lưu Trữ</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">{currentTea.storageHumidityPct}% RH</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Lực Nam Châm</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">0.6 Tesla</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Độ Dày Vách</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">14 mm</span>
                </div>
                <div className="p-4 rounded-xl bg-[#0F1412]/60 border border-[#C5A880]/15">
                  <span className="text-[10px] font-mono text-[#A8A29E] uppercase block mb-1">Lớp Lót Gỗ</span>
                  <span className="text-lg font-mono font-medium text-[#C5A880]">Tuyết Tùng</span>
                </div>
              </div>

              {/* Specifications */}
              <div className="space-y-4 text-xs sm:text-sm font-light text-[#D6D3D1] leading-relaxed">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Hương Vị Trà:</span>
                  <span>{currentTea.tasteNotes}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Nghệ Thuật Vàng:</span>
                  <span>{currentTea.goldLeafCraft}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Bảo Tồn Khí Kín:</span>
                  <span>{currentTea.preservationNote}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 p-3 rounded-xl bg-[#1C2824]/40 border border-[#C5A880]/10">
                  <span className="font-mono text-[#C5A880] text-xs uppercase min-w-[140px] shrink-0">Xuất Xứ & Độ Cao:</span>
                  <span>{currentTea.harvestAltitude}</span>
                </div>
              </div>

              {/* Lead Architect Quote */}
              <div className="mt-6 pt-6 border-t border-[#C5A880]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1C2824] border border-[#C5A880]/40 flex items-center justify-center shrink-0 font-display text-sm text-[#C5A880]">
                  Gu
                </div>
                <div>
                  <p className="text-xs sm:text-sm italic text-[#F3EFEA]/90 font-serif leading-relaxed">
                    &ldquo;{currentTea.tasteNotes}&rdquo;
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
