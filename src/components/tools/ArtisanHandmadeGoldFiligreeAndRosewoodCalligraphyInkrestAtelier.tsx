'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Label } from '@/components/ui/Label'

interface InkrestMasterpiece {
  id: string
  name: string
  lengthCm: number
  suitableInkstick: string
  goldFiligreeDetail: string
  calligraphyUsage: string
  woodGrainFeature: string
}

const INKREST_COLLECTION: readonly InkrestMasterpiece[] = [
  {
    id: 'ke-dai-tran-24cm',
    name: 'Kê Mực Đại Trân 24cm',
    lengthCm: 24,
    suitableInkstick: 'Thỏi mực Vi Trân Ngự Chế 500g (Hoành phi đại tự)',
    goldFiligreeDetail: 'Nẹp chỉ vàng 24K filigree họa tiết Song Long thời Lý uốn lượn 0.15mm',
    calligraphyUsage: 'Thư pháp đại tự, viết hoành phi, liễn đối đình chùa và tư gia',
    woodGrainFeature: 'Gỗ Trắc đỏ Nam Bộ sớ vân mây cuộn sóng, tỷ trọng 1.08 g/cm³ đầm chắc',
  },
  {
    id: 'ke-trung-tran-18cm',
    name: 'Kê Mực Trung Trân 18cm',
    lengthCm: 18,
    suitableInkstick: 'Thỏi mực Tùng Yên Cổ Truyền 250g (Câu đối, tranh thủy mặc)',
    goldFiligreeDetail: 'Chỉ vàng 24K filigree hoa sen hoàng thành và mây lửa cung đình',
    calligraphyUsage: 'Thư họa đối liên, tranh thủy mặc bốn mùa Xuân Hạ Thu Đông',
    woodGrainFeature: 'Thớ gỗ ánh sắc đỏ cam ấm áp, mài bóng mờ bằng sáp ong tự nhiên',
  },
  {
    id: 'ke-tieu-tran-12cm',
    name: 'Kê Mực Tiểu Trân 12cm',
    lengthCm: 12,
    suitableInkstick: 'Thỏi mực Dầu Trẩu Chu Đậu 100g (Tiểu khải chép kinh)',
    goldFiligreeDetail: 'Viền vàng 24K filigree vân thủy ba vi mô siêu mảnh 0.12mm',
    calligraphyUsage: 'Chép kinh Bát Nhã, kinh Kim Cương chữ tiểu khải thanh tao',
    woodGrainFeature: 'Vân chỉ đen tuyền xen kẽ đỏ thẫm, mịn màng không xơ xước',
  },
]

export function ArtisanHandmadeGoldFiligreeAndRosewoodCalligraphyInkrestAtelier() {
  const [selectedInkrest, setSelectedInkrest] = useState<InkrestMasterpiece>(INKREST_COLLECTION[0]!)
  const [placedCount, setPlacedCount] = useState<number>(8)
  const [isPlacing, setIsPlacing] = useState<boolean>(false)
  const [zoomRatio, setZoomRatio] = useState<number>(1)

  const audioContextRef = useRef<AudioContext | null>(null)

  // Web Audio solid wood tap sound 175Hz
  const playTapSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(175, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.12)

      gain.gain.setValueAtTime(0.14, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.18)
    } catch {
      // Audio fallback
    }
  }, [])

  const handlePlaceInkstick = () => {
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
            <Label rule index="96.3" tone="accent">
              Văn Phòng Tứ Bảo & Mỹ Nghệ Gỗ Trắc Vàng Filigree
            </Label>
            <h2 className="u-display mt-4 max-w-[28ch] text-ink">
              Kê mực thỏi gỗ Trắc đỏ & nẹp vàng kéo sợi Filigree hoàng triều.
            </h2>
          </div>
          <p className="u-body max-w-[42ch] text-muted">
            Tạo tác văn phòng hoàng cung: Khối gỗ Trắc đỏ Nam Bộ nguyên khối tỷ trọng 1.08 g/cm³, nẹp mạng lưới sợi vàng 24K filigree rồng Lý 0.15mm, vạch rãnh thoát ngưng tụ và khay sấy mộc thỏi mực quý.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Canvas */}
          <div className="lg:col-span-7 bg-surface p-8 sm:p-12 rounded-sm border border-line/80 relative shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${isPlacing ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
                <span className="text-xs font-mono tracking-wider uppercase text-ink font-medium">
                  {isPlacing ? 'Đang Hạ Thỏi Mực Lên Gỗ Trắc...' : 'Kê Mực Sẵn Sàng · Thớ Gỗ Khô Cân Bằng 10.5%'}
                </span>
              </div>
              <span className="text-xs font-mono text-muted">
                Lượt hạ mực: {placedCount} lần
              </span>
            </div>

            {/* Visual stage */}
            <div className="relative aspect-[16/10] bg-surface-subtle rounded-sm border border-line/50 flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#b45309_0%,_transparent_70%)]" />

              {/* Inkrest Visual Representation */}
              <div
                className="relative z-10 w-72 sm:w-96 h-28 sm:h-36 rounded-sm border-2 border-amber-900/60 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 flex flex-col items-center justify-between p-4 shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomRatio})` }}
              >
                {/* Filigree Inlay Edge Band */}
                <div className="w-full py-1 px-3 rounded-sm border border-yellow-500/80 bg-gradient-to-r from-yellow-700 via-amber-300 to-yellow-700 flex items-center justify-between shadow-sm">
                  <span className="text-[0.625rem] font-mono uppercase text-amber-950 font-bold">
                    Vàng 24K Filigree 0.15mm
                  </span>
                  <span className="text-[0.625rem] font-serif text-amber-950 font-bold">
                    Rồng Lý Uốn Lượn
                  </span>
                </div>

                {/* Grooves for inkstick ventilation */}
                <div className="flex items-center justify-center gap-2 my-auto w-full">
                  <span className="w-1/4 h-1 bg-amber-900/40 rounded-full" />
                  <span className="w-1/4 h-1 bg-amber-900/40 rounded-full" />
                  <span className="w-1/4 h-1 bg-amber-900/40 rounded-full" />
                </div>

                <div className="w-full flex items-center justify-between text-[0.6875rem] font-mono text-amber-300/80 pt-1 border-t border-amber-900/40">
                  <span>Gỗ Trắc Đỏ Nam Bộ · {selectedInkrest.lengthCm}cm</span>
                  <span>Tỷ trọng 1.08 g/cm³</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <span className="text-[0.6875rem] font-mono uppercase text-muted">Kê Mực Đang Chọn</span>
                <span className="text-xs font-mono text-accent font-semibold">{selectedInkrest.name}</span>
                <span className="text-[0.6875rem] font-mono text-ink">Chiều dài: {selectedInkrest.lengthCm}cm · Gỗ Trắc đỏ</span>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePlaceInkstick}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-accent text-surface rounded-sm hover:opacity-90 transition-opacity flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-200 animate-pulse" />
                    Hạ Thỏi Mực ("Cộp" 175Hz)
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
                  Âm gõ đầm chắc: 175Hz mộc chất
                </span>
              </div>
            </div>

            {/* Spec grid */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-line/60 text-xs font-mono">
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Chất Liệu:</span>
                <span className="text-ink font-medium">Gỗ Trắc đỏ Nam Bộ</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Chỉ Nẹp:</span>
                <span className="text-accent font-medium">Vàng 24K Filigree 0.15mm</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Độ Ẩm Gỗ:</span>
                <span className="text-ink font-medium">EMC 10.5% không cong vênh</span>
              </div>
            </div>
          </div>

          {/* Right: Inkrest Masterpiece Selection */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="01" tone="accent" className="mb-4">
                Bộ Sưu Tập Kê Mực Thư Họa Hoàng Gia
              </Label>
              <div className="flex flex-col gap-3 mt-4">
                {INKREST_COLLECTION.map((inkrest) => {
                  const isSelected = inkrest.id === selectedInkrest.id
                  return (
                    <button
                      key={inkrest.id}
                      type="button"
                      onClick={() => {
                        playTapSound()
                        setSelectedInkrest(inkrest)
                      }}
                      className={`text-left p-4 rounded-sm border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent bg-accent/5 shadow-sm'
                          : 'border-line/70 bg-surface-subtle hover:border-line hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-display font-medium text-ink">
                          {inkrest.name}
                        </span>
                        <span className="text-xs font-mono text-accent font-semibold">
                          {inkrest.lengthCm} cm
                        </span>
                      </div>
                      <span className="text-[0.6875rem] font-mono text-muted block mb-1">
                        Thỏi mực: {inkrest.suitableInkstick}
                      </span>
                      <p className="text-xs text-muted/80 line-clamp-1 leading-relaxed">
                        {inkrest.goldFiligreeDetail}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Profile */}
            <div className="bg-surface p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="02" tone="accent" className="mb-4">
                Quy Chuẩn Chế Tác & Thư Họa Ngự Dụng
              </Label>
              <dl className="grid grid-cols-1 gap-3.5 text-xs font-mono mt-4">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Đặc trưng sớ gỗ:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedInkrest.woodGrainFeature}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Chi tiết vàng filigree:</dt>
                  <dd className="text-accent font-semibold text-right max-w-[28ch]">{selectedInkrest.goldFiligreeDetail}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Thỏi mực tương hợp:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedInkrest.suitableInkstick}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-muted mb-1">Công năng thư họa:</dt>
                  <dd className="text-ink leading-relaxed font-body text-xs font-normal">
                    {selectedInkrest.calligraphyUsage}
                  </dd>
                </div>
              </dl>
            </div>

            {/* GuHomes Guarantee */}
            <div className="p-6 bg-surface-subtle border border-accent/30 rounded-sm">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Kỷ Luật May Đo Tại Xưởng Thạnh Xuân
              </span>
              <p className="text-xs text-muted leading-relaxed font-body">
                Từng thanh kê mực gỗ Trắc đỏ Nam Bộ được chọn lọc sớ vân đồng nhất, sấy chân không 90 ngày đạt độ ẩm cân bằng 10.5%, kết hợp nẹp sợi vàng 24K filigree gia công thủ công tại xưởng Thạnh Xuân 1.200m².
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
