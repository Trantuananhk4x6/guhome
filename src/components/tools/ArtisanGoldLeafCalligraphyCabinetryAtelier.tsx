'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface CalligraphyArtwork {
  id: string
  title: string
  hanzi: string
  pinyin: string
  translation: string
  philosophy: string
  goldPurity: string
  woodOrigin: string
}

const CALLIGRAPHY_ARTWORKS: CalligraphyArtwork[] = [
  {
    id: 'gia-hoa',
    title: 'Gia Hòa Vạn Sự Hưng',
    hanzi: '家和萬事興',
    pinyin: 'Jiā Hé Wàn Shì Xīng',
    translation: 'Gia đạo thuận hòa, muôn sự hưng thịnh',
    philosophy: 'Lời răn dạy tổ tiên về sự bao dung và tình cảm gia đình là nền tảng trường tồn của mọi cơ nghiệp danh gia vọng tộc.',
    goldPurity: 'Vàng quỳ 24K Kiêu Kỵ 0.0001mm',
    woodOrigin: 'Gỗ Gụ lau Quảng Bình tuyển vân núi',
  },
  {
    id: 'tinh-tam',
    title: 'Tĩnh Tâm Dưỡng Khí',
    hanzi: '靜心養氣',
    pinyin: 'Jìng Xīn Yǎng Qì',
    translation: 'Giữ tâm phẳng lặng, nuôi dưỡng nguyên khí cao khiết',
    philosophy: 'Triết lý nội tâm tĩnh tại giữa đô thị phồn hoa, lấy sự điềm tĩnh làm bản lĩnh dẫn dắt mọi quyết định trọng đại.',
    goldPurity: 'Vàng quỳ 24K thếp tay 5 lớp bảo vệ',
    woodOrigin: 'Gỗ Gụ lau 80 năm tuổi sấy khô EMC 10%',
  },
  {
    id: 'tri-tuc',
    title: 'Tri Túc Thường Lạc',
    hanzi: '知足常樂',
    pinyin: 'Zhī Zú Cháng Lè',
    translation: 'Biết đủ là giàu có, an nhiên là niềm vui bất tận',
    philosophy: 'Đỉnh cao của triết lý sống Quiet Luxury: không phô trương thanh thế mà tìm về sự đủ đầy, thanh thoát trong tâm hồn.',
    goldPurity: 'Vàng quỳ 24K kết hợp bột vỏ điệp nhũ bạc',
    woodOrigin: 'Gỗ Gụ lau nguyên tấm không giác lõi',
  },
]

export function ArtisanGoldLeafCalligraphyCabinetryAtelier({ className }: { className?: string } = {}) {
  const [selectedArtIndex, setSelectedArtIndex] = useState<number>(0)
  const [lightSheenAngle, setLightSheenAngle] = useState<number>(45)
  const [isMagnifierActive, setIsMagnifierActive] = useState<boolean>(true)
  const [isSecretCompartmentUnlocked, setIsSecretCompartmentUnlocked] = useState<boolean>(false)
  const [customMotto, setCustomMotto] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const headingId = useId()
  const currentArtwork = CALLIGRAPHY_ARTWORKS[selectedArtIndex] ?? CALLIGRAPHY_ARTWORKS[0]!

  const playChime = () => {
    if (typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(880, now)
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.4)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.8)
    } catch {
      // AudioContext fallback
    }
  }

  const handleUnlockSecret = () => {
    playChime()
    setIsSecretCompartmentUnlocked(!isSecretCompartmentUnlocked)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    playChime()
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Deep Lacquer & Gold Dust Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-amber-950/20 blur-[180px]" />
        <div className="absolute bottom-10 right-1/3 h-80 w-80 rounded-full bg-yellow-950/15 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,119,6,0.05),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Nếp Nhà Trọng Đạo • Tủ Bích Họa Thếp Vàng Quỳ 24K
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Tủ May Đo Gỗ Gụ Lau Bích Họa Thư Pháp Gia Huấn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Tuyệt tác hệ tủ gỗ Gụ lau nguyên khối chạm khắc chìm thủ công và thếp vàng quỳ 24K làng Kiêu Kỵ truyền đời. 
            Mỗi bức đại tự là một gia huấn linh thiêng, tích hợp ngăn bí mật âm hồi mộng trượt ẩn không dùng then kim loại bảo lưu ấn tín và gia bảo dòng tộc.
          </p>
        </div>

        {/* Interactive Cabinetry Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Cabinet Door Visualizer with Gold Leaf Specular Reflection */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Bức Đại Tự Thư Pháp Khắc Chìm Thếp Vàng
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentArtwork.title} ({currentArtwork.hanzi})
                    </h3>
                  </div>

                  {/* Secret Compartment Status */}
                  <button
                    type="button"
                    onClick={handleUnlockSecret}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors duration-200 font-mono',
                      isSecretCompartmentUnlocked
                        ? 'border-amber-400 bg-amber-950/80 text-amber-300'
                        : 'border-stone-700 bg-stone-950/90 text-stone-400 hover:text-stone-200'
                    )}
                  >
                    <span className={cn('h-1.5 w-1.5 rounded-full', isSecretCompartmentUnlocked ? 'bg-amber-400 animate-ping' : 'bg-stone-500')} />
                    {isSecretCompartmentUnlocked ? 'Ngăn Bí Mật Mộng Ẩn: ĐANG MỞ' : 'Chốt Âm Hồi: KHÓA MỘNG'}
                  </button>
                </div>

                {/* Cabinet Door Canvas */}
                <div className="relative mt-6 h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-amber-900/50 bg-[#140e0b] p-6 flex flex-col justify-between shadow-[inset_0_0_80px_rgba(0,0,0,0.9)]">
                  {/* Dynamic 24K Gold Leaf Specular Reflection according to Light Slider */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-all duration-300"
                    style={{
                      background: `linear-gradient(${lightSheenAngle}deg, transparent 25%, rgba(245,158,11,0.2) 48%, rgba(254,240,138,0.4) 50%, rgba(217,119,6,0.15) 52%, transparent 75%)`,
                    }}
                  />

                  {/* Top info badge */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      {currentArtwork.woodOrigin}
                    </span>
                    <span className="rounded-md border border-yellow-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-yellow-300">
                      {currentArtwork.goldPurity}
                    </span>
                  </div>

                  {/* Calligraphy Rendering Center */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center">
                    <div className="font-serif text-5xl sm:text-6xl tracking-widest text-amber-200 drop-shadow-[0_0_25px_rgba(245,158,11,0.5)] select-none">
                      {currentArtwork.hanzi}
                    </div>
                    <div className="mt-3 font-serif text-lg text-amber-100 tracking-wide">
                      {currentArtwork.title}
                    </div>
                    <div className="mt-1 text-xs text-amber-300/80 font-mono italic">
                      {currentArtwork.pinyin} • {currentArtwork.translation}
                    </div>
                  </div>

                  {/* 15x Magnifier Lens for Gold Leaf & Wood Grain */}
                  {isMagnifierActive && (
                    <div className="absolute bottom-4 right-4 z-20 h-28 w-28 rounded-full border-2 border-amber-400/80 bg-stone-950/95 p-2 shadow-2xl flex flex-col items-center justify-center text-center">
                      <div className="text-[9px] uppercase font-mono text-amber-400">Kính Lúp 15x</div>
                      <div className="text-[10px] text-stone-300 font-serif leading-tight mt-0.5">
                        Thớ Gụ Lau Mịn
                      </div>
                      <div className="text-[8px] text-amber-300/70 font-mono mt-0.5">
                        Vàng Quỳ 24K
                      </div>
                    </div>
                  )}

                  {/* Secret Compartment Drawer Graphic when Unlocked */}
                  {isSecretCompartmentUnlocked && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-3/4 rounded-lg border border-amber-500 bg-stone-950/95 p-4 shadow-2xl text-center backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
                      <div className="text-xs uppercase tracking-wider font-mono text-amber-400">
                        Hộc Khóa Âm Mộng Trượt Mộc Thạnh Xuân
                      </div>
                      <div className="text-stone-200 text-xs mt-1 font-serif">
                        Ngăn kéo bí mật 350mm lót nhung đỏ bảo tồn khế ước &amp; gia bảo dòng họ.
                      </div>
                      <div className="mt-2 inline-block rounded bg-amber-950 px-2 py-0.5 text-[10px] font-mono text-amber-300">
                        MÃ BẢO MẬT: GU-CALLIG-2026-X
                      </div>
                    </div>
                  )}

                  {/* Bottom metrics on door visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Ý Nghĩa Gia Huấn:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5 leading-snug">
                        {currentArtwork.philosophy}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Tay Nắm Đồng Đúc:</div>
                      <div className="text-xs font-serif text-amber-300 font-medium">
                        Hoa Văn Mây Cuộn Cổ Điển
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artwork Selector Pills */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {CALLIGRAPHY_ARTWORKS.map((art, idx) => {
                    const isSelected = selectedArtIndex === idx
                    return (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => {
                          setSelectedArtIndex(idx)
                          playChime()
                        }}
                        className={cn(
                          'flex-1 min-w-[140px] rounded-lg border px-3 py-2 text-left transition-all duration-200',
                          isSelected
                            ? 'border-amber-400/80 bg-amber-950/40 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                        )}
                      >
                        <div className="text-[10px] font-mono text-amber-400/80">Tác phẩm {idx + 1}/3</div>
                        <div className="font-serif text-xs font-medium text-stone-200 truncate mt-0.5">
                          {art.title}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Lighting Sheen Control, Craft Specs & Custom Engraving Form */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Light Sheen & Magnifier Controls */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm text-stone-200 font-medium">
                    Góc Chiếu Sáng Phản Quang Vàng Quỳ
                  </h4>
                  <span className="font-mono text-xs text-amber-400">{lightSheenAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="5"
                  value={lightSheenAngle}
                  onChange={(e) => setLightSheenAngle(Number(e.target.value))}
                  className="mt-3 w-full accent-amber-500 cursor-pointer"
                />
                <div className="mt-2 flex justify-between text-[10px] font-mono text-stone-500">
                  <span>0° (Sáng Ngang)</span>
                  <span>90° (Rọi Thẳng Đứng)</span>
                  <span>180° (Ánh Chiều Tà)</span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-300 font-serif">Kính Phóng Đại 15x Thớ Gỗ:</span>
                  <button
                    type="button"
                    onClick={() => setIsMagnifierActive(!isMagnifierActive)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs font-mono transition-colors',
                      isMagnifierActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-stone-800 text-stone-400 border border-stone-700'
                    )}
                  >
                    {isMagnifierActive ? 'ĐANG BẬT' : 'ĐÃ TẮT'}
                  </button>
                </div>
              </div>

              {/* Bespoke Family Motto Engraving Form */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <h4 className="font-serif text-sm text-stone-200 font-medium">
                  Đăng Ký May Đo Khắc Gia Huấn Độc Bản
                </h4>
                <p className="mt-1 text-xs text-stone-400 font-light">
                  Nghệ nhân Thạnh Xuân tiếp nhận chữ thư pháp riêng hoặc câu đối gia tộc để khắc chìm và thếp vàng quỳ 24K thủ công.
                </p>

                {isSubmitted ? (
                  <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-3.5 text-center text-xs text-emerald-200">
                    <span className="font-mono text-emerald-400 font-semibold block">ĐÃ GHI NHẬN HỒ SƠ MAY ĐO</span>
                    KTS Trưởng GuHomes sẽ liên hệ để khảo sát nội dung gia huấn và bản vẽ mộng gỗ trong 24 giờ.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                    <div>
                      <label htmlFor="custom-motto" className="block text-[11px] font-mono text-stone-400 uppercase">
                        Gia Huấn / Câu Đối Của Gia Tộc:
                      </label>
                      <input
                        id="custom-motto"
                        type="text"
                        required
                        value={customMotto}
                        onChange={(e) => setCustomMotto(e.target.value)}
                        placeholder="Ví dụ: Đức Lưu Quang, Tâm An Vạn Sự Lành..."
                        className="mt-1 w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md border border-amber-500/60 bg-gradient-to-r from-amber-700/50 to-amber-600/50 py-2 text-xs font-serif text-amber-100 hover:from-amber-600/60 hover:to-amber-500/60 transition-all shadow-md"
                    >
                      Xác Nhận Đặt Lịch Khảo Sát Thư Pháp
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Concierge CTA */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900/90 py-3 text-xs font-serif text-stone-200 hover:border-amber-400 hover:text-amber-200 transition-colors"
                >
                  <span>Đặt Lịch Thăm Quan Xưởng May Đo Thạnh Xuân</span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
