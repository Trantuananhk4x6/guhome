'use client'

import { useState, useRef, useEffect } from 'react'

interface InkStickSpec {
  name: string
  composition: string
  inkTone: string
  density: string
  aroma: string
  description: string
}

const INK_STICK_COLLECTION: InkStickSpec[] = [
  {
    name: 'Mực Tùng Yên Bách Niên',
    composition: 'Khói dầu tùng già ngàn năm kết hợp keo da trâu và ngọc trai nghiền mịn',
    inkTone: 'Đen sâu thẳm ánh sắc chàm huyền bí (Huyền Sắc)',
    density: 'Độ sánh mịn 98.5%, bám giấy dó cổ truyền hơn 300 năm',
    aroma: 'Thanh mát hương rừng thông cổ thụ trong sương sớm',
    description: 'Thỏi mực đúc thủ công theo phương pháp cổ truyền, mài trên nghiên đá mã não tạo ra dung dịch mực bóng mượt không lắng cặn.'
  },
  {
    name: 'Mực Bồ Hóng Thông Rừng Hoàng Liên Sơn',
    composition: 'Bồ hóng gỗ thông đỏ Hoàng Liên Sơn ngâm xạ hương và tinh dầu quế thanh hoa',
    inkTone: 'Đen tía đồng ấm áp, phản quang lấp lánh dưới ánh sáng tự nhiên',
    density: 'Độ sánh mượt 99.2%, nét bút sắc sảo không nhòe biên',
    aroma: 'Ấm nồng hương quế và thảo dược rừng cao nguyên',
    description: 'Thỏi mực hoàng triều chuyên dùng cho văn bản sắc phong và đối liên hoành phi, giữ màu nguyên bản qua hàng thế kỷ.'
  },
  {
    name: 'Mực Khói Trầm Hương Ngự Phẩm',
    composition: 'Bột trầm hương rừng già nghiền siêu mịn 10000 mesh pha cùng nước cất hoa lài',
    inkTone: 'Đen hổ phách ấm dịu, thớ mực bóng mịn như nhung tơ',
    density: 'Độ sánh 97.8%, tỏa hương ngào ngạt khi đưa ngòi bút lướt',
    aroma: 'Hương trầm hương kỳ nam ngát hương thanh tịnh cả gian phòng',
    description: 'Bảo phẩm mực nho dành cho bậc túc nho và thiền gia, mỗi nét bút hạ xuống vừa là thư pháp vừa là liệu pháp hương thơm.'
  }
]

export function ArtisanHandmadeGoldFiligreeAndOnyxCalligraphyInkstoneAtelier() {
  const [selectedInkIndex, setSelectedInkIndex] = useState(0)
  const [grindingSpeed, setGrindingSpeed] = useState<'slow' | 'medium' | 'zen'>('zen')
  const [macroZoom, setMacroZoom] = useState(1)
  const [isGrindingSoundActive, setIsGrindingSoundActive] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const currentInk = INK_STICK_COLLECTION[selectedInkIndex]!

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const toggleGrindingSound = () => {
    if (isGrindingSoundActive) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.4)
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop()
            oscillatorRef.current.disconnect()
            oscillatorRef.current = null
          }
          setIsGrindingSoundActive(false)
        }, 400)
      } else {
        setIsGrindingSoundActive(false)
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioContextRef.current = ctx

        // Âm thanh mài mực êm dịu trên đá mã não: tần số 180Hz ấm êm kết hợp modul vi lượng
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        const baseFreq = grindingSpeed === 'slow' ? 140 : grindingSpeed === 'medium' ? 180 : 120
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.025, ctx.currentTime + 0.8)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscillatorRef.current = osc
        gainNodeRef.current = gain
        setIsGrindingSoundActive(true)
      } catch {
        setIsGrindingSoundActive(false)
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-surface-primary py-24 sm:py-32">
      {/* Nền hoa văn lưới vàng 24K Filigree kim hoàn */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="filigree-gold-mesh" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 20 L 20 0 L 40 20 L 20 40 Z" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#filigree-gold-mesh)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header định vị Atelier */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            <span>ATELIER THƯ HỌA & MỸ NGHỆ ĐÁ MÃ NÃO</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>KIM HOÀN VÀNG 24K FILIGREE</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Nghiên Mực Đá Mã Não Đính Vàng Filigree
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Nghiên mài mực từ đá mã não tự nhiên thấu quang Đắk Nông mài mịn 4000 grit, viền bọc lưới vàng 24K filigree rồng phượng thời Lý và nắp gỗ Mun hoa khóa nam châm 0.6T bảo tồn mực ướt suốt 7 ngày.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Cột trái: Mô phỏng Nghiên Đá Mã Não & Mài Mực Tương Tác (7 cột) */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-secondary/50 p-6 sm:p-8 lg:col-span-7">
            {/* Thanh trạng thái atelier */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-ink/60">ĐÁ MÃ NÃO:</span>
                <span className="font-semibold text-ink">4000 Grit Tự Nhiên</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">NHỊP ĐIỆU MÀI:</span>
                <span className="font-semibold text-primary uppercase font-mono">{grindingSpeed}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">THẤU QUANG:</span>
                <span className="font-semibold text-emerald-600">89.4% Ánh Sáng</span>
              </div>
            </div>

            {/* Khung mô phỏng Nghiên Mực & Lớp Lưới Vàng */}
            <div className="relative my-8 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-ink/5 p-6">
              {/* Mô hình Nghiên Mực Mã Não */}
              <div 
                className="relative flex flex-col items-center justify-center transition-transform duration-500"
                style={{ transform: `scale(${macroZoom})` }}
              >
                {/* Viền lưới vàng Filigree thời Lý */}
                <div className="relative flex h-48 w-56 sm:h-56 sm:w-68 items-center justify-center rounded-2xl border-2 border-amber-400/80 bg-stone-900 shadow-2xl p-2">
                  {/* Vân lưới vàng 24K */}
                  <div className="absolute inset-1 rounded-xl border border-dashed border-amber-300/60" />

                  {/* Lòng nghiên đá mã não Onyx thấu quang */}
                  <div className="relative flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-tr from-amber-950 via-stone-800 to-amber-900 shadow-inner p-4">
                    {/* Bể chứa mực (Mực Trì) */}
                    <div className="relative h-20 w-32 rounded-full bg-stone-950 shadow-2xl border border-stone-700 flex items-center justify-center overflow-hidden">
                      {/* Vệt mực chuyển động khi mài */}
                      <div className={`h-16 w-28 rounded-full bg-black/90 shadow-inner ${isGrindingSoundActive ? 'animate-pulse' : ''}`} />
                      <span className="absolute text-[9px] font-mono tracking-widest text-amber-200/60">ONYX · 4000G</span>
                    </div>

                    {/* Mặt phẳng mài mực (Mực Đường) */}
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-3 w-16 rounded-full bg-stone-700/80" />
                      <span className="text-[10px] font-serif text-amber-100/80">{currentInk.name}</span>
                    </div>
                  </div>
                </div>

                {/* Nắp gỗ Mun hoa Nam Bộ khóa nam châm */}
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-surface-primary/80 px-3 py-1 border border-line text-[10px] font-mono text-ink/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  NẮP GỖ MUN HOA KHÓA NAM CHÂM 0.6T KÍN KHÍ
                </div>
              </div>

              {/* Tag góc dưới */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-surface-primary/80 px-3 py-1.5 backdrop-blur-sm border border-line text-[11px] font-mono text-ink/70">
                LƯỚI VÀNG 24K FILIGREE · ĐÁ MÃ NÃO NGUYÊN KHỐI
              </div>
            </div>

            {/* Bảng điều khiển nhịp điệu mài mực & Macro zoom */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-ink/70 mb-2">
                  <span>Nhịp điệu mài mực thiền tịnh</span>
                  <span className="font-mono text-primary font-semibold uppercase">{grindingSpeed}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['slow', 'medium', 'zen'] as const).map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => setGrindingSpeed(speed)}
                      className={`rounded-lg border py-2 text-xs font-mono uppercase transition-all ${
                        grindingSpeed === speed
                          ? 'border-primary bg-primary/10 text-primary font-semibold'
                          : 'border-line bg-surface-primary text-ink/70 hover:text-ink'
                      }`}
                    >
                      {speed === 'slow' ? 'Khoan Thai' : speed === 'medium' ? 'Hòa Nhịp' : 'Tĩnh Lặng'}
                    </button>
                  ))}
                </div>
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
                  onClick={toggleGrindingSound}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                    isGrindingSoundActive 
                      ? 'bg-stone-800 text-amber-200 shadow-sm' 
                      : 'border border-line bg-surface-primary text-ink hover:bg-surface-secondary'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isGrindingSoundActive ? 'bg-amber-400 animate-pulse' : 'bg-ink/30'}`} />
                  {isGrindingSoundActive ? 'Tiếng Mài Đá: Đang Phát' : 'Bật Tiếng Mài Nghiên Đá'}
                </button>
              </div>
            </div>
          </div>

          {/* Cột phải: Thông số 3 Thỏi Mực Cổ Truyền (5 cột) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Bộ chọn danh mục Thỏi Mực */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-ink/60">
                Thỏi Mực Ngự Dụng Thủ Công
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {INK_STICK_COLLECTION.map((ink, idx) => (
                  <button
                    key={ink.name}
                    type="button"
                    onClick={() => setSelectedInkIndex(idx)}
                    className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                      selectedInkIndex === idx
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-line bg-surface-primary hover:border-ink/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-ink">{ink.name}</span>
                      <span className="text-[10px] font-mono text-primary">Thủ Công</span>
                    </div>
                    <span className="mt-1 text-xs text-ink/60 line-clamp-1">{ink.inkTone}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết thông số thỏi mực đang chọn */}
            <div className="rounded-2xl border border-line bg-surface-primary p-6 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-ink">
                {currentInk.name}
              </h3>
              <p className="mt-1 text-xs font-mono text-primary">
                Sắc độ: {currentInk.inkTone}
              </p>

              <div className="mt-4 border-t border-line pt-4 space-y-3 text-xs leading-relaxed text-ink/80">
                <p>{currentInk.description}</p>
                <div className="rounded-lg bg-surface-secondary/70 p-3 text-[11px] text-ink/70">
                  <span className="font-semibold text-ink">Thành phần ngự phẩm:</span> {currentInk.composition}
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-[11px] text-primary">
                  <span className="font-semibold">Hương thơm & Độ sánh:</span> {currentInk.aroma} · {currentInk.density}
                </div>
              </div>

              {/* Cam kết tiêu chuẩn thương hiệu GuHomes */}
              <div className="mt-6 border-t border-line pt-4 flex items-center justify-between text-[11px] text-ink/60">
                <span>Hotline KTS Trưởng: 0368 757 916</span>
                <span>Xưởng Thạnh Xuân 1.200m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
