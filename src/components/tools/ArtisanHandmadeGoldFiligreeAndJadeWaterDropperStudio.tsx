'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Label } from '@/components/ui/Label'

interface WaterSourceMasterpiece {
  id: string
  name: string
  sourceLocation: string
  mineralProfile: string
  phLevel: string
  calligraphyApplication: string
  inkInteraction: string
}

const SACRED_WATER_SOURCES: readonly WaterSourceMasterpiece[] = [
  {
    id: 'tay-ho-sen-bach-diep',
    name: 'Nước Mưa Đọng Cánh Sen Bách Diệp Tây Hồ',
    sourceLocation: 'Hồ sen Quảng An, Tây Hồ, Hà Nội',
    mineralProfile: 'Khoáng chất siêu vi tự nhiên, ion âm cao, độ tinh khiết 99.9%',
    phLevel: 'pH 6.8 - 7.0 (Trung tính thanh tao)',
    calligraphyApplication: 'Mài mực thỏi vi trân cho tác phẩm đại tự hoành phi trang trọng',
    inkInteraction: 'Mực tan đều, sắc đen ánh tím (Tử Quang), khô nhanh không lem mặt giấy dó',
  },
  {
    id: 'mau-son-suong-som',
    name: 'Nước Sương Sớm Đỉnh Núi Mẫu Sơn',
    sourceLocation: 'Đỉnh núi Mẫu Sơn, Lạng Sơn (1.541m)',
    mineralProfile: 'Giàu vi khoáng thạch anh tự nhiên, nhiệt độ ngưng tụ 8°C',
    phLevel: 'pH 7.2 (Kiềm nhẹ khoáng đạt)',
    calligraphyApplication: 'Chép kinh thư pháp tiểu khải, kinh Bát Nhã trên giấy xuyến chỉ',
    inkInteraction: 'Nét mực bóng bẩy đanh sắc, giữ nguyên độ tươi mới qua hàng trăm năm',
  },
  {
    id: 'champa-gieng-co-hoi-an',
    name: 'Nước Giếng Cổ Champa Bá Lễ Ngàn Năm',
    sourceLocation: 'Giếng cổ Champa Bá Lễ, Phố cổ Hội An, Quảng Nam',
    mineralProfile: 'Nước ngầm tầng đá ong cổ truyền, hàm lượng nhôm và sắt tự nhiên vi lượng',
    phLevel: 'pH 6.6 (Dịu mát mát lành)',
    calligraphyApplication: 'Vẽ tranh thủy mặc, thư họa câu đối ngày tết trên giấy hồng điều',
    inkInteraction: 'Tạo hiệu ứng loang mây khói huyền ảo đặc trưng của tranh thủy mặc truyền thống',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeWaterDropperStudio() {
  const [selectedWater, setSelectedWater] = useState<WaterSourceMasterpiece>(SACRED_WATER_SOURCES[0]!)
  const [dropletCount, setDropletCount] = useState<number>(12)
  const [isDispensing, setIsDispensing] = useState<boolean>(false)
  const [zoomRatio, setZoomRatio] = useState<number>(1)
  const [isSoundActive, setIsSoundActive] = useState<boolean>(false)

  const audioContextRef = useRef<AudioContext | null>(null)

  // Web Audio droplet chime sound (528Hz + 1056Hz overtone)
  const playDropSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()

      // Primary tone 528Hz
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15)
      gain1.gain.setValueAtTime(0.08, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start()
      osc1.stop(ctx.currentTime + 0.32)

      // Harmonic overtone 1056Hz
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(1056, ctx.currentTime)
      gain2.gain.setValueAtTime(0.04, ctx.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start()
      osc2.stop(ctx.currentTime + 0.24)
    } catch {
      // Audio fallback
    }
  }, [])

  const dispenseDroplet = () => {
    setIsDispensing(true)
    playDropSound()
    setDropletCount((prev) => prev + 1)
    setTimeout(() => {
      setIsDispensing(false)
    }, 400)
  }

  return (
    <section className="u-gutter py-24 bg-surface-subtle border-t border-line/60">
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Label rule index="95.3" tone="accent">
              Văn Phòng Tứ Bảo & Mỹ Nghệ Ngọc Phỉ Thúy Filigree
            </Label>
            <h2 className="u-display mt-4 max-w-[28ch] text-ink">
              Thủy điễm Ngọc Bích Phỉ Thúy & vàng kéo sợi Filigree hoàng triều.
            </h2>
          </div>
          <p className="u-body max-w-[42ch] text-muted">
            Tạo tác văn phòng hoàng cung: Khối ngọc Phỉ Thúy Type A thấu quang 93%, cổ bọc vàng 24K filigree rồng thời Lý sợi 0.15mm, van cơ khí vi ngắt chân không điều tiết từng giọt 0.05ml mực tàu cổ truyền.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Dropper Visual and Dispensing Simulator */}
          <div className="lg:col-span-7 bg-surface p-8 sm:p-12 rounded-sm border border-line/80 relative shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${isDispensing ? 'bg-cyan-400 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-xs font-mono tracking-wider uppercase text-ink font-medium">
                  {isDispensing ? 'Đang Nhỏ Giọt Nước Vi Lượng 0.05ml...' : 'Van Chân Không Kín Khí · Sẵn Sàng Nhỏ Giọt'}
                </span>
              </div>
              <span className="text-xs font-mono text-muted">
                Tổng đã nhỏ: {dropletCount} giọt
              </span>
            </div>

            {/* Stage */}
            <div className="relative aspect-[16/10] bg-surface-subtle rounded-sm border border-line/50 flex flex-col items-center justify-center p-8 overflow-hidden">
              {/* Jadeite Glow Background */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#2dd4bf_0%,_transparent_70%)]" />

              {/* Jadeite Dropper Visual Representation */}
              <div
                className="relative z-10 w-48 h-64 sm:w-56 sm:h-72 rounded-t-full rounded-b-2xl border-2 border-emerald-400/60 bg-gradient-to-b from-emerald-100/90 via-teal-300/80 to-emerald-700/90 backdrop-blur-md flex flex-col items-center justify-between p-6 text-center shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomRatio})` }}
              >
                {/* Filigree Dragon Collar */}
                <div className="w-full py-1.5 px-3 rounded-full border border-yellow-400 bg-gradient-to-r from-yellow-600 via-amber-300 to-yellow-600 shadow-md">
                  <span className="text-[0.625rem] font-mono uppercase text-amber-950 font-bold block">
                    Vàng 24K Filigree 0.15mm
                  </span>
                  <span className="text-[0.5625rem] font-serif text-amber-950 font-semibold">
                    Long Vân Thời Lý
                  </span>
                </div>

                {/* Dropper Center Core */}
                <div className="my-auto flex flex-col items-center">
                  <span className="text-xs font-mono text-teal-950 font-bold tracking-wider uppercase">
                    Ngọc Phỉ Thúy Type A
                  </span>
                  <span className="text-[0.6875rem] font-mono text-teal-900 mt-1">
                    Độ thấu quang: 93% · Nước {selectedWater.phLevel}
                  </span>
                </div>

                {/* Micro vacuum dispensing tip */}
                <div className="w-4 h-6 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-b-sm border-t border-yellow-200 flex items-center justify-center">
                  <span className={`w-1.5 h-1.5 rounded-full ${isDispensing ? 'bg-cyan-300 shadow-[0_0_8px_#22d3ee]' : 'bg-amber-100'}`} />
                </div>
              </div>

              {/* Source Tag Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <span className="text-[0.6875rem] font-mono uppercase text-muted">Nguồn Nước Mài Mực</span>
                <span className="text-xs font-mono text-accent font-semibold">{selectedWater.name}</span>
                <span className="text-[0.6875rem] font-mono text-ink">{selectedWater.phLevel}</span>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={dispenseDroplet}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-accent text-surface rounded-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                    Nhỏ 1 Giọt (0.05ml)
                  </button>

                  <div className="flex items-center gap-1 border border-line rounded-sm p-0.5 bg-surface-subtle">
                    <button
                      type="button"
                      onClick={() => setZoomRatio(1)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomRatio === 1 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      1x
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomRatio(1.2)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomRatio === 1.2 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      2x
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomRatio(1.35)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomRatio === 1.35 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      4x Filigree
                    </button>
                  </div>
                </div>

                <span className="text-xs font-mono text-muted">
                  Âm thanh giọt nước: Solfeggio 528Hz + 1056Hz
                </span>
              </div>
            </div>

            {/* Spec grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-line/60 text-xs font-mono">
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Ngọc Liệu:</span>
                <span className="text-ink font-medium">Phỉ Thúy Type A Myanmar</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Cổ Bọc Vàng:</span>
                <span className="text-accent font-medium">Vàng 24K Filigree 0.15mm</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Chân Đế:</span>
                <span className="text-ink font-medium">Mun sừng Khánh Hòa 1.18 g/cm³</span>
              </div>
            </div>
          </div>

          {/* Right: Sacred Water Sources & Calligraphy Guide */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Water selection cards */}
            <div className="bg-surface p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="01" tone="accent" className="mb-4">
                Tam Đại Nguồn Nước Ngự Dụng Mài Mực
              </Label>
              <div className="flex flex-col gap-3 mt-4">
                {SACRED_WATER_SOURCES.map((water) => {
                  const isSelected = water.id === selectedWater.id
                  return (
                    <button
                      key={water.id}
                      type="button"
                      onClick={() => {
                        playDropSound()
                        setSelectedWater(water)
                      }}
                      className={`text-left p-4 rounded-sm border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent bg-accent/5 shadow-sm'
                          : 'border-line/70 bg-surface-subtle hover:border-line hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-display font-medium text-ink">
                          {water.name}
                        </span>
                        <span className="text-xs font-mono text-accent font-semibold">
                          {water.phLevel.split(' ')[0]}
                        </span>
                      </div>
                      <span className="text-[0.6875rem] font-mono text-muted block mb-1">
                        {water.sourceLocation}
                      </span>
                      <p className="text-xs text-muted/80 line-clamp-1 leading-relaxed">
                        {water.inkInteraction}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Water interaction details */}
            <div className="bg-surface p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="02" tone="accent" className="mb-4">
                Tương Tác Hóa Lý Với Mực Tàu Cổ Truyền
              </Label>
              <dl className="grid grid-cols-1 gap-3.5 text-xs font-mono mt-4">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Đặc tính khoáng:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedWater.mineralProfile}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Độ pH tự nhiên:</dt>
                  <dd className="text-accent font-semibold text-right max-w-[28ch]">{selectedWater.phLevel}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Ứng dụng thư họa:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedWater.calligraphyApplication}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-muted mb-1">Hiệu ứng bề mặt giấy:</dt>
                  <dd className="text-ink leading-relaxed font-body text-xs font-normal">
                    {selectedWater.inkInteraction}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Workshop Atelier Guarantee */}
            <div className="p-6 bg-surface-subtle border border-accent/30 rounded-sm">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Kỹ Nghệ Kim Hoàn Cung Đình Tại GuHomes
              </span>
              <p className="text-xs text-muted leading-relaxed font-body">
                Từng mối hàn vàng sợi filigree 0.15mm được thực hiện thủ công dưới kính hiển vi quang học 40x bởi nghệ nhân kim hoàn làng Định Công, gắn kết cùng chân đế Mun sừng gia công mộng gỗ tại xưởng Thạnh Xuân 1.200m².
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
