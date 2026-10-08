'use client'

import { useState, useRef, useEffect } from 'react'

interface KynamSpec {
  name: string
  age: string
  origin: string
  aromaLayer: string
  burnTemp: number
  burnStage: string
  description: string
  lastingDuration: string
}

const KY_NAM_COLLECTION: KynamSpec[] = [
  {
    name: 'Bạch Kỳ Nam Trà My Rừng Sâu',
    age: '85 năm tuổi',
    origin: 'Vùng rừng già Trà My Quảng Nam, khai thác tự nhiên bền vững',
    aromaLayer: 'Hương thanh khiết sương mai thảo mộc, chuyển tầng sữa mật ngọt ngào sâu lắng',
    burnTemp: 105,
    burnStage: 'Ủ vi nhiệt sơ khai (95°C - 110°C)',
    description: 'Thớ gỗ màu trắng ngà xốp ngậm lượng tinh dầu kỳ nam đậm đặc, khi áp sát cảm nhận làn hơi the mát lan tỏa khắp khứu giác.',
    lastingDuration: 'Lưu hương 24 giờ liên tục'
  },
  {
    name: 'Thanh Kỳ Nam Đại Lộc Thượng Hạng',
    age: '78 năm tuổi',
    origin: 'Vùng đồi đá Đại Lộc Quảng Nam, phơi sấy cân bằng ẩm tự nhiên',
    aromaLayer: 'Ánh ngọc bích lấp lánh, hương thảo dược thanh thoát hòa quyện mật hoa rừng',
    burnTemp: 165,
    burnStage: 'Gia nhiệt trung tầng (150°C - 170°C)',
    description: 'Sợi vân gỗ ánh sắc lục huyền bí, khi gia nhiệt ở mức trung bình sẽ giải phóng các phân tử sesquiterpene quý hiếm làm dịu tâm trí.',
    lastingDuration: 'Lưu hương 18 giờ liên tục'
  },
  {
    name: 'Hắc Kỳ Nam Ba Tơ Nguyên Khối',
    age: '92 năm tuổi',
    origin: 'Vùng núi cao Ba Tơ Quảng Ngãi, phong hóa qua gần một thế kỷ',
    aromaLayer: 'Hương khói trầm ấm nồng nàn, vị cay ngọt bách thảo vương giả quý phái',
    burnTemp: 215,
    burnStage: 'Nhiệt độ đỉnh cao (200°C - 230°C)',
    description: 'Khối kỳ nam đen tuyền chìm hoàn toàn trong nước, thớ dầu nén chặt như đá quý, lan tỏa uy lực phong thủy và sự tôn nghiêm cung đình.',
    lastingDuration: 'Lưu hương 36 giờ liên tục'
  }
]

export function BespokeImperialKynamAndSilverFiligreeScentChamber() {
  const [selectedKynamIndex, setSelectedKynamIndex] = useState(0)
  const [temperature, setTemperature] = useState(105)
  const [macroZoom, setMacroZoom] = useState(1)
  const [isChimeActive, setIsChimeActive] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  const currentKynam = KY_NAM_COLLECTION[selectedKynamIndex]!

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const playSingingBowl528Hz = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioContextRef.current = ctx

      setIsChimeActive(true)

      // Chuỗi hòa âm chuông xoay 528Hz (Solfeggio Transformation)
      const baseFreq = 528
      const harmonics = [1, 2.76, 5.4, 8.9]
      const gains = [0.04, 0.015, 0.008, 0.003]

      harmonics.forEach((harmonic, index) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(baseFreq * harmonic, ctx.currentTime)

        const maxGain = gains[index] || 0.01
        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(maxGain, ctx.currentTime + 0.1)
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 5.5)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 5.6)
      })

      setTimeout(() => {
        setIsChimeActive(false)
      }, 5500)
    } catch {
      setIsChimeActive(false)
    }
  }

  return (
    <section className="relative overflow-hidden bg-surface-primary py-24 sm:py-32">
      {/* Nền hoa văn mây lửa Bạc Đậu thời Lê */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cloud-filigree-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 10 40 Q 25 15, 45 40 T 75 40" fill="none" stroke="currentColor" strokeWidth="1" />
              <circle cx="45" cy="40" r="3" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cloud-filigree-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header định vị Scent Chamber */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            <span>BẢO THẤT TRẦM HƯƠNG KỲ NAM & BẠC ĐẬU</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>XƯỞNG MAY ĐO THẠNH XUÂN</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Bảo Thất Kỳ Nam & Đỉnh Bạc Đậu Hoàng Triều
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Án hương gỗ Mun hoa Nam Bộ nẹp đồng thau xước mờ, đỉnh đúc bạc ta 999 bọc lót đồng đỏ 92% giữ nhiệt và khay tro gốm men rạn Chu Đậu. Nơi nghệ thuật xông trầm đạt đến cảnh giới vô vi thanh tịnh.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Cột trái: Mô phỏng Đỉnh Bạc Đậu & Điều chỉnh Nhiệt độ (7 cột) */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-secondary/50 p-6 sm:p-8 lg:col-span-7">
            {/* Thanh thông số kiểm soát nhiệt vi lượng */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-ink/60">NHIỆT ĐỘ Ủ HƯƠNG:</span>
                <span className="font-semibold text-primary">{temperature}°C</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">TẦNG HƯƠNG:</span>
                <span className="font-semibold text-ink">{currentKynam.burnStage}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">ĐỘ PHÓNG ĐẠI:</span>
                <span className="font-semibold text-ink">{macroZoom}x</span>
              </div>
            </div>

            {/* Khung mô phỏng Đỉnh Trầm Bạc Đậu */}
            <div className="relative my-8 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-ink/5 p-6">
              {/* Làn khói hương Kỳ Nam mô phỏng */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div 
                  className="h-32 w-12 rounded-full bg-gradient-to-t from-white/20 via-white/10 to-transparent blur-md animate-pulse"
                  style={{ opacity: Math.min(1, temperature / 200) }}
                />
              </div>

              {/* Mô hình đỉnh bạc và chân án hương */}
              <div 
                className="relative flex flex-col items-center justify-center transition-transform duration-500"
                style={{ transform: `scale(${macroZoom})` }}
              >
                {/* Đỉnh Bạc Đậu 3 chân */}
                <div className="relative flex h-40 w-40 sm:h-52 sm:w-52 items-center justify-center rounded-full border-2 border-stone-300 bg-gradient-to-b from-stone-200 via-stone-300 to-stone-400 shadow-2xl">
                  {/* Họa tiết hoa văn mây lửa Bạc Đậu */}
                  <div className="absolute inset-3 rounded-full border border-dashed border-stone-400/70" />
                  
                  {/* Lòng đỉnh đồng đỏ lót gốm rạn */}
                  <div className="relative z-10 flex h-24 w-24 sm:h-32 sm:w-32 flex-col items-center justify-center rounded-full border-2 border-amber-800/80 bg-amber-950/90 shadow-inner">
                    <span className="text-[10px] font-mono tracking-widest text-amber-200/90">KỲ NAM</span>
                    <span className="mt-1 text-xs font-serif text-amber-100">{temperature}°C</span>
                    <span className="mt-0.5 text-[9px] font-mono text-amber-300/70">CHU ĐẬU</span>
                  </div>

                  {/* 3 chân vạc đỉnh */}
                  <div className="absolute -bottom-3 left-6 h-4 w-4 rounded-full bg-stone-500 shadow-md" />
                  <div className="absolute -bottom-3 right-6 h-4 w-4 rounded-full bg-stone-500 shadow-md" />
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-5 w-4 rounded-full bg-stone-600 shadow-lg" />
                </div>

                {/* Đế gỗ Mun hoa nẹp đồng thau */}
                <div className="mt-6 h-4 w-48 sm:w-64 rounded-full bg-stone-900 border-t border-amber-600/30 shadow-xl" />
              </div>

              {/* Tag góc dưới */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-surface-primary/80 px-3 py-1.5 backdrop-blur-sm border border-line text-[11px] font-mono text-ink/70">
                BẠC TA 999 · LÓT ĐỒNG ĐỎ 92% DÀY 6.5MM
              </div>
            </div>

            {/* Bảng điều khiển nhiệt độ & Macro zoom */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-ink/70 mb-2">
                  <span>Điều chỉnh nhiệt độ ủ hương vi lượng (90°C - 230°C)</span>
                  <span className="font-mono text-primary font-semibold">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="230"
                  step="5"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
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

                <button
                  type="button"
                  onClick={playSingingBowl528Hz}
                  disabled={isChimeActive}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                    isChimeActive 
                      ? 'bg-amber-600 text-white shadow-sm' 
                      : 'border border-line bg-surface-primary text-ink hover:bg-surface-secondary'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isChimeActive ? 'bg-amber-200 animate-ping' : 'bg-ink/30'}`} />
                  {isChimeActive ? 'Chuông 528Hz: Đang Ngân' : 'Thỉnh Chuông Tĩnh Tâm 528Hz'}
                </button>
              </div>
            </div>
          </div>

          {/* Cột phải: Thông số 3 Ngự Phẩm Kỳ Nam (5 cột) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Bộ chọn danh mục Kỳ Nam */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-ink/60">
                Bộ Sưu Tập Kỳ Nam Hoàng Gia
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {KY_NAM_COLLECTION.map((kynam, idx) => (
                  <button
                    key={kynam.name}
                    type="button"
                    onClick={() => {
                      setSelectedKynamIndex(idx)
                      setTemperature(kynam.burnTemp)
                    }}
                    className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                      selectedKynamIndex === idx
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-line bg-surface-primary hover:border-ink/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-ink">{kynam.name}</span>
                      <span className="text-[11px] font-mono text-primary">{kynam.age}</span>
                    </div>
                    <span className="mt-1 text-xs text-ink/60 line-clamp-1">{kynam.aromaLayer}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết thông số Kỳ Nam đang chọn */}
            <div className="rounded-2xl border border-line bg-surface-primary p-6 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-ink">
                {currentKynam.name}
              </h3>
              <p className="mt-1 text-xs font-mono text-primary">
                Đặc tính: {currentKynam.lastingDuration}
              </p>

              <div className="mt-4 border-t border-line pt-4 space-y-3 text-xs leading-relaxed text-ink/80">
                <p>{currentKynam.description}</p>
                <div className="rounded-lg bg-surface-secondary/70 p-3 text-[11px] text-ink/70">
                  <span className="font-semibold text-ink">Tầng hương xúc cảm:</span> {currentKynam.aromaLayer}
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-[11px] text-primary">
                  <span className="font-semibold">Xuất xứ tự nhiên:</span> {currentKynam.origin}
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
