'use client'

import { useState, useRef, useEffect } from 'react'

interface RulerSpec {
  name: string
  length: string
  weight: string
  goldInlay: string
  purpose: string
  description: string
}

const RULER_COLLECTION: RulerSpec[] = [
  {
    name: 'Thước Đại Cẩn Hạc Bách Niên',
    length: '32 cm x 3.8 cm x 2.2 cm',
    weight: '480 gram (Chìm hoàn toàn trong nước)',
    goldInlay: 'Chỉ vàng ròng 24K hoa văn chim Hạc ngậm hoa sen thời Lý',
    purpose: 'Chuyên dụng cho hoành phi đại tự và giấy dó khổ lớn 120cm',
    description: 'Khối gỗ Trắc đỏ Nam Bộ nguyên khối tỷ trọng 1.05 g/cm³, cẩn chỉ vàng 24K thủ công tinh xảo, giữ mặt giấy phẳng phiu tuyệt đối khi vung bút đại tự.'
  },
  {
    name: 'Thước Trung Sóng Nước Thăng Long',
    length: '26 cm x 3.2 cm x 1.8 cm',
    weight: '340 gram (Đầm chắc êm ái)',
    goldInlay: 'Chỉ vàng 24K filigree hoa văn sóng nước thủy ba hoàng triều',
    purpose: 'Tối ưu cho đối liên câu đối và thư họa tranh thủy mặc',
    description: 'Đường nét cẩn vàng chìm khít vào tom gỗ mịn màng như tơ lụa, bề mặt lau dầu sáp ong tự nhiên tạo độ bóng gương không hóa chất PU.'
  },
  {
    name: 'Thước Tiểu Minh Tâm Kinh Văn',
    length: '20 cm x 2.6 cm x 1.5 cm',
    weight: '220 gram (Nhỏ gọn thanh thoát)',
    goldInlay: 'Chỉ vàng 24K mảnh mai như sợi tơ hoa văn mây lành cát tường',
    purpose: 'Dành riêng cho chép kinh thi tiểu khải và tản văn tao nhã',
    description: 'Cặp thước nhỏ gọn cầm vừa vặn trong lòng bàn tay, đặt trong tráp gỗ Mun hoa khóa nam châm 0.6T lót lụa tơ tằm dệt tay làng Vạn Phúc.'
  }
]

export function ArtisanHandmadeGoldFiligreeAndRosewoodCalligraphyRulerAtelier() {
  const [selectedRulerIndex, setSelectedRulerIndex] = useState(0)
  const [macroZoom, setMacroZoom] = useState(1)
  const [isTapSoundActive, setIsTapSoundActive] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  const currentRuler = RULER_COLLECTION[selectedRulerIndex]!

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const playRulerTapSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioContextRef.current = ctx

      setIsTapSoundActive(true)

      // Âm thanh thước gỗ Trắc đỏ gõ nhẹ trên phiến đá nghiên mực: 432Hz đầm ấm chắc nịch
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(432, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.16)

      setTimeout(() => {
        setIsTapSoundActive(false)
      }, 200)
    } catch {
      setIsTapSoundActive(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-surface-primary py-24 sm:py-32">
      {/* Nền hoa văn sóng nước và chim Hạc cẩn vàng */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ruler-wave-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 0 30 Q 15 15, 30 30 T 60 30" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <path d="M 0 45 Q 15 30, 30 45 T 60 45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ruler-wave-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header định vị Atelier */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            <span>ATELIER THƯỚC CHẶN GIẤY TRẮC ĐỎ CẨN VÀNG 24K</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>KIM HOÀN FILIGREE THỜI LÝ</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Thước Chặn Giấy Trắc Đỏ Cẩn Chỉ Vàng
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Gỗ Trắc đỏ Nam Bộ nguyên khối tỷ trọng 1.05 g/cm³ chìm hoàn toàn trong nước, cẩn sợi chỉ vàng ròng 24K hoa văn chim Hạc và sóng nước Thăng Long, bảo quản trong tráp Mun hoa lót lụa tơ tằm Vạn Phúc.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Cột trái: Mô phỏng Thước Chặn Giấy & Tráp Lụa (7 cột) */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-secondary/50 p-6 sm:p-8 lg:col-span-7">
            {/* Thanh trạng thái quy chuẩn thước */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-ink/60">GỖ TRẮC ĐỎ:</span>
                <span className="font-semibold text-ink">1.05 g/cm³ Chìm Nước</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">KÍCH THƯỚC:</span>
                <span className="font-semibold text-primary">{currentRuler.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">MACRO ZOOM:</span>
                <span className="font-semibold text-ink">{macroZoom}x</span>
              </div>
            </div>

            {/* Khung mô phỏng đồ họa Thước Chặn Giấy */}
            <div className="relative my-8 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-ink/5 p-6">
              {/* Mô hình Thước Gỗ Trắc Đỏ */}
              <div 
                className="relative flex flex-col items-center justify-center transition-transform duration-500"
                style={{ transform: `scale(${macroZoom})` }}
              >
                {/* Tráp gỗ Mun hoa lót lụa vàng */}
                <div className="relative flex h-48 w-64 sm:h-56 sm:w-80 flex-col items-center justify-center rounded-2xl border-2 border-amber-600/70 bg-stone-950 p-4 shadow-2xl">
                  {/* Lớp lót lụa tơ tằm Vạn Phúc vàng óng */}
                  <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl bg-amber-950/70 border border-amber-500/30 p-3">
                    {/* Cặp thước chặn giấy Trắc đỏ cẩn vàng đặt song song */}
                    <div className="flex flex-col gap-3 items-center">
                      <div className="relative h-6 w-48 sm:w-60 rounded-md bg-gradient-to-r from-red-950 via-amber-950 to-red-900 border border-amber-400 shadow-md flex items-center justify-center px-4">
                        <div className="h-0.5 w-full border-b border-dashed border-amber-300/80" />
                        <span className="absolute text-[8px] font-mono tracking-widest text-amber-200">24K FILIGREE</span>
                      </div>

                      <div className="relative h-6 w-48 sm:w-60 rounded-md bg-gradient-to-r from-red-950 via-amber-950 to-red-900 border border-amber-400 shadow-md flex items-center justify-center px-4">
                        <div className="h-0.5 w-full border-b border-dashed border-amber-300/80" />
                        <span className="absolute text-[8px] font-mono tracking-widest text-amber-200">TRẮC ĐỎ · 1.05G</span>
                      </div>
                    </div>

                    <span className="mt-3 text-[10px] font-serif text-amber-100">{currentRuler.name}</span>
                  </div>
                </div>

                {/* Đế nẹp đồng thau và khóa nam châm 0.6T */}
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-surface-primary/80 px-3 py-1 border border-line text-[10px] font-mono text-ink/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  TRÁP MUN HOA KHÓA NAM CHÂM 0.6T · LỤA VẠN PHÚC
                </div>
              </div>

              {/* Tag góc dưới */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-surface-primary/80 px-3 py-1.5 backdrop-blur-sm border border-line text-[11px] font-mono text-ink/70">
                GỖ TRẮC ĐỎ 85 NĂM · CẨN CHỈ VÀNG 24K FILIGREE
              </div>
            </div>

            {/* Bảng điều khiển thử tiếng gõ thước & Macro zoom */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={playRulerTapSound}
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-primary-dark active:scale-95 cursor-pointer"
                >
                  <span className="h-2 w-2 rounded-full bg-amber-300 animate-ping" />
                  Thử Âm Đầm Chắc Khi Chặn Giấy (432Hz)
                </button>

                <div className="inline-flex rounded-lg border border-line bg-surface-primary p-1">
                  {[1, 1.5, 2, 3].map((zoom) => (
                    <button
                      key={zoom}
                      type="button"
                      onClick={() => setMacroZoom(zoom)}
                      className={`rounded-md px-3 py-1 text-xs font-mono transition-all ${
                        macroZoom === zoom
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-ink/70 hover:text-ink'
                      }`}
                    >
                      {zoom}x
                    </button>
                  ))}
                </div>
              </div>

              {isTapSoundActive && (
                <div className="text-[11px] font-mono text-amber-700 animate-pulse">
                  Thước gỗ Trắc đỏ gõ nhẹ âm vang trầm ấm 432Hz chắc nịch...
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Thông số 3 Kích Cỡ Thước Thư Họa (5 cột) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Bộ chọn danh mục Thước */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-ink/60">
                Bộ Sưu Tập Thước Chặn Giấy Hoàng Gia
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {RULER_COLLECTION.map((ruler, idx) => (
                  <button
                    key={ruler.name}
                    type="button"
                    onClick={() => {
                      setSelectedRulerIndex(idx)
                      playRulerTapSound()
                    }}
                    className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                      selectedRulerIndex === idx
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-line bg-surface-primary hover:border-ink/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-ink">{ruler.name}</span>
                      <span className="text-[10px] font-mono text-primary">{ruler.weight}</span>
                    </div>
                    <span className="mt-1 text-xs text-ink/60 line-clamp-1">{ruler.purpose}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết thông số Thước đang chọn */}
            <div className="rounded-2xl border border-line bg-surface-primary p-6 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-ink">
                {currentRuler.name}
              </h3>
              <p className="mt-1 text-xs font-mono text-primary">
                Quy cách: {currentRuler.length} · Khối lượng: {currentRuler.weight}
              </p>

              <div className="mt-4 border-t border-line pt-4 space-y-3 text-xs leading-relaxed text-ink/80">
                <p>{currentRuler.description}</p>
                <div className="rounded-lg bg-surface-secondary/70 p-3 text-[11px] text-ink/70">
                  <span className="font-semibold text-ink">Nghệ thuật cẩn vàng:</span> {currentRuler.goldInlay}
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-[11px] text-primary">
                  <span className="font-semibold">Công năng chuyên dụng:</span> {currentRuler.purpose}
                </div>
              </div>

              {/* Cam kết tiêu chuẩn thương hiệu GuHomes */}
              <div className="mt-6 border-t border-line pt-4 flex items-center justify-between text-[11px] text-ink/60">
                <span>Hotline KTS Trưởng: 0368 757 916</span>
                <span>Chế tác độc bản 1/1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
