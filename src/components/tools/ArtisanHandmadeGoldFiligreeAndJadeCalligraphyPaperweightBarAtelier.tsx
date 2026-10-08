'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Label } from '@/components/ui/Label'

interface JadePaperweightItem {
  id: string
  name: string
  lengthCm: number
  weightGrams: number
  jadeQuality: string
  goldFiligreePattern: string
  calligraphyApplication: string
  tactileFeel: string
}

const JADE_PAPERWEIGHT_COLLECTION: readonly JadePaperweightItem[] = [
  {
    id: 'thuoc-dai-tran-36cm',
    name: 'Thước Đại Trấn Ngọc Bích 36cm',
    lengthCm: 36,
    weightGrams: 980,
    jadeQuality: 'Ngọc bích Hetian xanh mỡ dê thấu quang 92%',
    goldFiligreePattern: 'Mạng lưới vàng 24K filigree Song Long Tranh Châu thời Lý',
    calligraphyApplication: 'Trấn giấy hoành phi đại tự, thư họa khổ lớn 120x240cm',
    tactileFeel: 'Mát lạnh sâu lắng, đầm tay vững chãi, mép vát mài vi kim cương êm ái',
  },
  {
    id: 'thuoc-trung-tran-26cm',
    name: 'Thước Trung Trấn Ngọc Bích 26cm',
    lengthCm: 26,
    weightGrams: 620,
    jadeQuality: 'Ngọc bích ngọc tủy thanh tân vân mây tự nhiên',
    goldFiligreePattern: 'Chỉ vàng 24K filigree hoa sen hoàng thành và mây lửa cuộn sóng',
    calligraphyApplication: 'Trấn giấy câu đối tết, liễn thư họa, tranh thủy mặc khổ trung',
    tactileFeel: 'Mịn màng như ngọc thạch ngâm suối, phản quang ánh sáng dịu mắt',
  },
  {
    id: 'thuoc-tieu-tran-16cm',
    name: 'Thước Tiểu Trấn Ngọc Bích 16cm',
    lengthCm: 16,
    weightGrams: 350,
    jadeQuality: 'Ngọc bích Phỉ Thúy Type A xanh biếc thuần khiết',
    goldFiligreePattern: 'Nẹp chỉ vàng 24K filigree hoa cúc cung đình vi mô 0.12mm',
    calligraphyApplication: 'Chép kinh Bát Nhã, kinh Kim Cương, tiểu khải thanh nhã',
    tactileFeel: 'Thanh thoát tinh tế, nâng niu từng trang giấy xuyến chỉ mỏng manh',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyPaperweightBarAtelier() {
  const [selectedRuler, setSelectedRuler] = useState<JadePaperweightItem>(JADE_PAPERWEIGHT_COLLECTION[0]!)
  const [placedCount, setPlacedCount] = useState<number>(6)
  const [isPlacing, setIsPlacing] = useState<boolean>(false)
  const [zoomRatio, setZoomRatio] = useState<number>(1)

  const audioContextRef = useRef<AudioContext | null>(null)

  // Web Audio jade solid tap sound 190Hz
  const playTapSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(190, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.14)

      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.2)
    } catch {
      // Audio fallback
    }
  }, [])

  const handlePlace = () => {
    setIsPlacing(true)
    playTapSound()
    setPlacedCount((prev) => prev + 1)
    setTimeout(() => {
      setIsPlacing(false)
    }, 350)
  }

  return (
    <section className="u-gutter py-24 bg-surface-subtle border-t border-line/60">
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Label rule index="97.3" tone="accent">
              Văn Phòng Tứ Bảo & Mỹ Nghệ Ngọc Bích Filigree Hoàng Gia
            </Label>
            <h2 className="u-display mt-4 max-w-[28ch] text-ink">
              Thước trấn giấy Ngọc Bích Hetian & nẹp vàng kéo sợi Filigree 24K.
            </h2>
          </div>
          <p className="u-body max-w-[42ch] text-muted">
            Tạo tác văn phòng hoàng cung: Khối ngọc bích Hetian tự nhiên thấu quang 92%, nẹp mạng lưới sợi vàng 24K filigree rồng Lý 0.15mm, chân đế đệm nỉ tuyết tùng êm ái bảo vệ bề mặt giấy xuyến chỉ cổ truyền.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Visualizer */}
          <div className="lg:col-span-7 bg-surface p-8 sm:p-12 rounded-sm border border-line/80 relative shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlacing ? 'bg-emerald-400 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-xs font-mono tracking-wider uppercase text-ink font-medium">
                  {isPlacing ? 'Đang Hạ Thước Trấn Lên Giấy Dó...' : 'Thước Trấn Sẵn Sàng · Mặt Ngọc Mát Lạnh'}
                </span>
              </div>
              <span className="text-xs font-mono text-muted">
                Lượt hạ thước: {placedCount} lần
              </span>
            </div>

            {/* Stage */}
            <div className="relative aspect-[16/10] bg-surface-subtle rounded-sm border border-line/50 flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#10b981_0%,_transparent_70%)]" />

              {/* Jade Ruler Visual */}
              <div
                className="relative z-10 w-72 sm:w-96 h-28 sm:h-36 rounded-sm border-2 border-emerald-500/70 bg-gradient-to-r from-emerald-100 via-teal-200 to-emerald-200 flex flex-col items-center justify-between p-4 shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomRatio})` }}
              >
                {/* Filigree Edge Band */}
                <div className="w-full py-1 px-3 rounded-sm border border-yellow-400 bg-gradient-to-r from-yellow-600 via-amber-300 to-yellow-600 flex items-center justify-between shadow-sm">
                  <span className="text-[0.625rem] font-mono uppercase text-amber-950 font-bold">
                    Vàng 24K Filigree 0.15mm
                  </span>
                  <span className="text-[0.625rem] font-serif text-amber-950 font-bold">
                    Rồng Phượng Thời Lý
                  </span>
                </div>

                {/* Jadeite body center */}
                <div className="my-auto flex flex-col items-center">
                  <span className="text-xs font-mono text-teal-950 font-bold tracking-wider uppercase">
                    Ngọc Bích Hetian Tự Nhiên
                  </span>
                  <span className="text-[0.6875rem] font-mono text-teal-900 mt-0.5">
                    Thấu quang 92% · Trọng lượng {selectedRuler.weightGrams}g
                  </span>
                </div>

                <div className="w-full flex items-center justify-between text-[0.6875rem] font-mono text-teal-900 pt-1 border-t border-emerald-400/40">
                  <span>Chiều dài: {selectedRuler.lengthCm}cm</span>
                  <span>Đệm nỉ Tuyết Tùng chống trầy</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <span className="text-[0.6875rem] font-mono uppercase text-muted">Thước Trấn Đang Chọn</span>
                <span className="text-xs font-mono text-accent font-semibold">{selectedRuler.name}</span>
                <span className="text-[0.6875rem] font-mono text-ink">Dài {selectedRuler.lengthCm}cm · {selectedRuler.weightGrams}g</span>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePlace}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-accent text-surface rounded-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                    Hạ Thước ("Cộp" 190Hz)
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
                  Âm thanh hạ thước: 190Hz thanh khiết
                </span>
              </div>
            </div>

            {/* Spec grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-line/60 text-xs font-mono">
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Ngọc Liệu:</span>
                <span className="text-ink font-medium">Ngọc bích Hetian tự nhiên</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Nẹp Vàng:</span>
                <span className="text-accent font-medium">Vàng 24K Filigree 0.15mm</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Đáy Đệm:</span>
                <span className="text-ink font-medium">Nỉ Tuyết Tùng bảo vệ giấy</span>
              </div>
            </div>
          </div>

          {/* Right: Ruler Collection & Calligraphy Dossier */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="01" tone="accent" className="mb-4">
                Bộ Sưu Tập Thước Trấn Giấy Hoàng Gia
              </Label>
              <div className="flex flex-col gap-3 mt-4">
                {JADE_PAPERWEIGHT_COLLECTION.map((ruler) => {
                  const isSelected = ruler.id === selectedRuler.id
                  return (
                    <button
                      key={ruler.id}
                      type="button"
                      onClick={() => {
                        playTapSound()
                        setSelectedRuler(ruler)
                      }}
                      className={`text-left p-4 rounded-sm border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent bg-accent/5 shadow-sm'
                          : 'border-line/70 bg-surface-subtle hover:border-line hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-display font-medium text-ink">
                          {ruler.name}
                        </span>
                        <span className="text-xs font-mono text-accent font-semibold">
                          {ruler.lengthCm} cm
                        </span>
                      </div>
                      <span className="text-[0.6875rem] font-mono text-muted block mb-1">
                        Trọng lượng: {ruler.weightGrams}g · {ruler.jadeQuality}
                      </span>
                      <p className="text-xs text-muted/80 line-clamp-1 leading-relaxed">
                        {ruler.goldFiligreePattern}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Profile */}
            <div className="bg-surface p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="02" tone="accent" className="mb-4">
                Hồ Sơ Giám Định Thư Họa Hoàng Gia
              </Label>
              <dl className="grid grid-cols-1 gap-3.5 text-xs font-mono mt-4">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Chất lượng ngọc:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedRuler.jadeQuality}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Chi tiết vàng filigree:</dt>
                  <dd className="text-accent font-semibold text-right max-w-[28ch]">{selectedRuler.goldFiligreePattern}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Ứng dụng thư họa:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedRuler.calligraphyApplication}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-muted mb-1">Cảm giác xúc giác:</dt>
                  <dd className="text-ink leading-relaxed font-body text-xs font-normal">
                    {selectedRuler.tactileFeel}
                  </dd>
                </div>
              </dl>
            </div>

            {/* GuHomes Guarantee */}
            <div className="p-6 bg-surface-subtle border border-accent/30 rounded-sm">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Kỷ Luật Mỹ Nghệ Cung Đình GuHomes
              </span>
              <p className="text-xs text-muted leading-relaxed font-body">
                Từng phiến ngọc bích Hetian được cắt mài thủ công với độ phẳng dung sai dưới 0.05mm, nẹp chỉ vàng 24K filigree rồng Lý gia công tỉ mỉ tại xưởng Định Công kết hợp cùng xưởng Thạnh Xuân 1.200m².
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
