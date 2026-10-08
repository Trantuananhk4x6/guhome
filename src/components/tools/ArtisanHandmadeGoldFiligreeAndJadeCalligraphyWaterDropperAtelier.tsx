'use client'

import { useState, useRef, useEffect } from 'react'

interface WaterSpec {
  name: string
  source: string
  phLevel: string
  aromaTone: string
  inkCompat: string
  description: string
}

const WATER_COLLECTION: WaterSpec[] = [
  {
    name: 'Nước Mưa Hoa Sen Bách Diệp Hồ Tây',
    source: 'Thu gom từ lá sen sớm mai hồ Tây Hà Nội, lọc qua cát thạch anh 3 cấp',
    phLevel: 'pH 6.8 - 7.0 (Trung tính tự nhiên)',
    aromaTone: 'Hương sen thanh khiết đọng mật hoa thoang thoảng dịu nhẹ',
    inkCompat: 'Thích hợp tuyệt đối cho thỏi mực tùng yên và mực khói trầm',
    description: 'Nguồn nước ngự dụng của tao nhân mặc khách xưa, giúp mực tàu tan đều mịn màng không đóng cặn, đường nét thư pháp uyển chuyển như mây bay.'
  },
  {
    name: 'Nước Suối Nguồn Fansipan Sương Mai',
    source: 'Đỉnh núi Fansipan độ cao 2.800m, nơi sương mây ngưng tụ trên vách đá granit',
    phLevel: 'pH 7.2 (Khoáng nhẹ tinh khiết)',
    aromaTone: 'Thanh khiết vô ngã, mát lạnh như khí trời non cao',
    inkCompat: 'Tối ưu cho mực bồ hóng thông rừng và đối liên đại tự',
    description: 'Nước nguồn giàu vi khoáng tự nhiên giúp hạt mực liên kết bền chặt với xơ sợi giấy dó cổ truyền, giữ độ sắc nét trường tồn qua nhiều thế kỷ.'
  },
  {
    name: 'Nước Cất Hoa Nhài Chum Sành Hạ Thổ',
    source: 'Chưng cất từ hoa nhài xứ Huế, ủ trong chum sành nung củi Bát Tràng 180 ngày',
    phLevel: 'pH 6.5 (Dịu nhẹ êm ái)',
    aromaTone: 'Hương nhài ngan ngát lan tỏa khắp gian phòng khi mài mực',
    inkCompat: 'Chuyên dụng cho tiểu khải kinh thi và văn bản lưu trữ hoàng triều',
    description: 'Mỗi giọt nước mang theo tinh hoa của hoa nhài và sự mộc mạc của đất nung, biến nghi thức mài mực thành một liệu trình thiền định thư thái.'
  }
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyWaterDropperAtelier() {
  const [selectedWaterIndex, setSelectedWaterIndex] = useState(0)
  const [macroZoom, setMacroZoom] = useState(1)
  const [dropletCount, setDropletCount] = useState(3)
  const [isDropping, setIsDropping] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  const currentWater = WATER_COLLECTION[selectedWaterIndex]!

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const playWaterDropSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioContextRef.current = ctx

      setIsDropping(true)

      // Âm thanh giọt nước rơi "tí tách" ngân vang Solfeggio 528Hz hòa quyện nốt cao 1056Hz
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(1056, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(528, ctx.currentTime + 0.15)

      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.4)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.42)

      setTimeout(() => {
        setIsDropping(false)
      }, 450)
    } catch {
      setIsDropping(false)
    }
  }

  const triggerDroplet = () => {
    playWaterDropSound()
    setDropletCount((prev) => prev + 1)
  }

  return (
    <section className="relative overflow-hidden bg-surface-primary py-24 sm:py-32">
      {/* Nền hoa văn hoa sen hoàng thành Huế */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lotus-filigree-mesh" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 25 10 C 15 25, 15 35, 25 45 C 35 35, 35 25, 25 10 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="25" cy="27" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lotus-filigree-mesh)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header định vị Thủy Điễm */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            <span>THỦY ĐIỄM NGỌC BÍCH FILIGREE HOÀNG GIA</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>KIM HOÀN VÀNG 24K THỦ CÔNG</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Thủy Điễm Ngọc Bích Đính Vàng Filigree
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Bình nhỏ giọt mài mực từ ngọc bích tự nhiên thấu quang 90% bọc lưới vàng 24K filigree hoa sen, van vi lượng 0.05ml điều tiết độ sánh hoàn hảo của mực tàu cổ truyền trên nghiên đá quý.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Cột trái: Mô phỏng Thủy Điễm Ngọc Bích & Van Vi Giọt (7 cột) */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-secondary/50 p-6 sm:p-8 lg:col-span-7">
            {/* Thanh thông số van vi lượng */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-ink/60">NGỌC BÍCH THẤU QUANG:</span>
                <span className="font-semibold text-ink">90.2% Ánh Sáng</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">THỂ TÍCH MỖI GIỌT:</span>
                <span className="font-semibold text-primary">0.05 ml Chuẩn Xác</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">TỔNG ĐÃ NHỎ:</span>
                <span className="font-semibold text-ink">{dropletCount} Giọt</span>
              </div>
            </div>

            {/* Khung mô phỏng đồ họa Thủy Điễm */}
            <div className="relative my-8 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-ink/5 p-6">
              {/* Mô hình Thủy Điễm Ngọc Bích */}
              <div 
                className="relative flex flex-col items-center justify-center transition-transform duration-500"
                style={{ transform: `scale(${macroZoom})` }}
              >
                {/* Bình ngọc bích dáng hồ lô / búp sen */}
                <div className="relative flex h-48 w-40 sm:h-56 sm:w-48 flex-col items-center justify-center rounded-3xl border-2 border-amber-400/90 bg-gradient-to-b from-emerald-700 via-emerald-800 to-emerald-950 shadow-2xl p-3">
                  {/* Lưới vàng 24K filigree bao bọc */}
                  <div className="absolute inset-2 rounded-2xl border border-dashed border-amber-300/70" />

                  {/* Vòi nhỏ giọt ngọc bích */}
                  <div className="absolute -top-3 h-5 w-3 rounded-t-full bg-emerald-600 border border-amber-400 shadow-sm" />

                  {/* Lòng bình chứa nước ngọc */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-mono tracking-widest text-emerald-200">HETIAN JADE</span>
                    <span className="mt-1 text-xs font-serif text-amber-100">{currentWater.phLevel}</span>
                    <span className="mt-1 text-[9px] font-mono text-emerald-300/80">VAN 0.05ML</span>
                  </div>

                  {/* Giọt nước rơi mô phỏng khi bấm */}
                  {isDropping && (
                    <div className="absolute -bottom-6 flex flex-col items-center animate-bounce">
                      <div className="h-4 w-3 rounded-full bg-cyan-200/90 shadow-md blur-[0.5px]" />
                    </div>
                  )}
                </div>

                {/* Đế gỗ Mun sọc Nam Bộ nẹp đồng */}
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-surface-primary/80 px-3 py-1 border border-line text-[10px] font-mono text-ink/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  ĐẾ MUN SỌC NẸP ĐỒNG THAU XƯỚC MỜ
                </div>
              </div>

              {/* Tag góc dưới */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-surface-primary/80 px-3 py-1.5 backdrop-blur-sm border border-line text-[11px] font-mono text-ink/70">
                NGỌC BÍCH TỰ NHIÊN · VÀNG 24K FILIGREE HUẾ
              </div>
            </div>

            {/* Bảng điều khiển nhỏ giọt vi lượng & Macro zoom */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={triggerDroplet}
                  className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl bg-primary px-5 py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-primary-dark active:scale-95 cursor-pointer"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan-300 animate-ping" />
                  Nhỏ 1 Giọt Nước Lên Nghiên (0.05ml)
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

              {isDropping && (
                <div className="text-[11px] font-mono text-cyan-700 animate-pulse">
                  Giọt nước suối nguồn rơi tí tách âm vang Solfeggio 528Hz trên nghiên đá...
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Thông số 3 Nguồn Nước Dưỡng Mực (5 cột) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Bộ chọn nguồn nước */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-ink/60">
                Bộ Sưu Tập Nước Dưỡng Mực Hoàng Gia
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {WATER_COLLECTION.map((water, idx) => (
                  <button
                    key={water.name}
                    type="button"
                    onClick={() => {
                      setSelectedWaterIndex(idx)
                      playWaterDropSound()
                    }}
                    className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                      selectedWaterIndex === idx
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-line bg-surface-primary hover:border-ink/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-ink">{water.name}</span>
                      <span className="text-[10px] font-mono text-primary">{water.phLevel}</span>
                    </div>
                    <span className="mt-1 text-xs text-ink/60 line-clamp-1">{water.aromaTone}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết thông số nước đang chọn */}
            <div className="rounded-2xl border border-line bg-surface-primary p-6 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-ink">
                {currentWater.name}
              </h3>
              <p className="mt-1 text-xs font-mono text-primary">
                Độ tinh khiết: {currentWater.phLevel} · {currentWater.aromaTone}
              </p>

              <div className="mt-4 border-t border-line pt-4 space-y-3 text-xs leading-relaxed text-ink/80">
                <p>{currentWater.description}</p>
                <div className="rounded-lg bg-surface-secondary/70 p-3 text-[11px] text-ink/70">
                  <span className="font-semibold text-ink">Nguồn gốc thu hái:</span> {currentWater.source}
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-[11px] text-primary">
                  <span className="font-semibold">Độ tương thích mực:</span> {currentWater.inkCompat}
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
