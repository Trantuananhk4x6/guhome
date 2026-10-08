'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface LacquerStep {
  step: number
  name: string
  duration: string
  craftSecret: string
  materials: string
}

const LACQUER_STEPS: LacquerStep[] = [
  {
    step: 1,
    name: 'Bó Hom Vóc Gỗ &amp; Vải Màn',
    duration: '25 – 30 ngày',
    craftSecret: 'Phủ hỗn hợp đất phù sa, mùn cưa mịn và sơn sống lên tấm vóc gỗ dổi kẹp vải màn sợi gai, ngăn cong vênh nứt xé.',
    materials: 'Gỗ dổi cổ thụ • Sơn ta sống Phú Thọ • Vải màn gai',
  },
  {
    step: 2,
    name: 'Cẩn Vỏ Trứng Vịt Nung Giòn',
    duration: '15 – 20 ngày',
    craftSecret: 'Vỏ trứng vịt vỏ dày được nung than nhẹ để tạo độ giòn, bẻ vụn bằng đầu đũa tre rồi dán từng mảnh nhỏ tạo mạng rạn hoa sen.',
    materials: 'Vỏ trứng vịt cỏ • Keo sơn ta cô đặc • Bút trâm tre',
  },
  {
    step: 3,
    name: 'Dát Lá Vàng Quỳ 24K Kiêu Kỵ',
    duration: '10 – 12 ngày',
    craftSecret: 'Từng lá vàng quỳ mỏng tang 0.0001mm được nâng bằng bút lông chồn đặt lên lớp sơn thí dính vừa tới, phủ nhũ bạc lấp lánh.',
    materials: 'Vàng quỳ 24K làng Kiêu Kỵ • Bút lông chồn • Sơn thí',
  },
  {
    step: 4,
    name: 'Phủ 18 Lớp Sơn Son &amp; Then Mộc',
    duration: '60 – 90 ngày',
    craftSecret: 'Mỗi lớp sơn ta phải ủ trong buồng ẩm 80% RH tối thiểu 48 giờ để polymer hóa tự nhiên, lặp lại 18 lần cho độ sâu thăm thẳm.',
    materials: 'Sơn then đen tuyền • Sơn cánh gián hổ phách • Nhựa sơn ta',
  },
  {
    step: 5,
    name: 'Mài Nước Than Xoan Đào &amp; Đánh Lòng Bàn Tay',
    duration: '20 ngày',
    craftSecret: 'Mài phẳng dưới nước suối mát bằng than củi xoan đào, sau đó nghệ nhân dùng chính lòng bàn tay thoa bột than mịn đánh bóng gương.',
    materials: 'Than củi xoan đào • Nước khoáng tinh khiết • Bột than mài mịn',
  },
]

export function SaigonArtisanLacquerwareGallerySanctuary({ className }: { className?: string } = {}) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1)
  const [lightReflectionAngle, setLightReflectionAngle] = useState<number>(45)
  const [isMagnifierActive, setIsMagnifierActive] = useState<boolean>(true)

  const headingId = useId()
  const currentStep = LACQUER_STEPS[activeStepIndex] ?? LACQUER_STEPS[0]!

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Deep Lacquer Black & 24K Gold Leaf Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-amber-950/20 blur-[170px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-red-950/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.06),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Di Sản Sơn Mài Cổ Bản &amp; Nghệ Thuật Cẩn Vỏ Trứng
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Phòng Trưng Bày Sơn Mài Then Dát Vàng Quỳ 24K Kiêu Kỵ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Chiều sâu thăm thẳm của 18 lớp sơn son then từ nhựa cây sơn ta Phú Thọ, cẩn vỏ trứng vịt nung giòn tạo hình hoa sen và dát vàng quỳ 24K Kiêu Kỵ. 
            Không gian lưu giữ được kiểm soát vi khí hậu độ ẩm 65% RH chuyên biệt cho sự bền vững trăm năm của tác phẩm sơn mài Việt Nam.
          </p>
        </div>

        {/* Interactive Lacquerware Gallery Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Lacquer Masterpiece Visualizer & Micro-Crack Magnifier */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Công Đoạn Chế Tác Thứ {currentStep.step}/5
                    </span>
                    <h3
                      className="mt-1 font-serif text-xl sm:text-2xl text-stone-100"
                      dangerouslySetInnerHTML={{ __html: currentStep.name }}
                    />
                  </div>

                  {/* Microclimate Vault Status */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">65.0% RH</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">22.5°C</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">UGR &lt; 12</span>
                  </div>
                </div>

                {/* Lacquer Surface Simulation Canvas */}
                <div className="relative mt-6 h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-amber-900/40 bg-[#090706] p-6 flex flex-col justify-between shadow-[inset_0_0_90px_rgba(0,0,0,0.95)]">
                  {/* Dynamic 24K Gold Leaf Sheen according to Light Reflection Angle */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-all duration-300"
                    style={{
                      background: `linear-gradient(${lightReflectionAngle}deg, transparent 20%, rgba(245,158,11,0.25) 45%, rgba(254,240,138,0.45) 50%, rgba(217,119,6,0.2) 55%, transparent 80%)`,
                    }}
                  />

                  {/* Top info badge in visualizer */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      VÀNG QUỲ 24K KIÊU KỴ • NHỰA SƠN TA PHÚ THỌ
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-emerald-300">
                      THỜI GIAN CÔNG ĐOẠN: {currentStep.duration}
                    </span>
                  </div>

                  {/* SVG Lacquer Artwork: Stylized Indochine Lotus & Eggshell Mosaic */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    <svg className="h-44 w-60 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]" viewBox="0 0 240 180" fill="none">
                      {/* Deep black lacquer base plate */}
                      <rect x="10" y="10" width="220" height="160" rx="6" fill="#0c0a09" stroke="#78350f" strokeWidth="2" />

                      {/* Golden Water waves */}
                      <path
                        d="M20,140 Q60,130 100,140 T180,140 T220,135"
                        stroke="#b45309"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M30,150 Q80,145 120,150 T200,150"
                        stroke="#d97706"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        fill="none"
                      />

                      {/* Large Lotus Leaf with Gold Leaf Flakes */}
                      <ellipse cx="80" cy="110" rx="45" ry="22" fill="#1c1917" stroke="#92400e" strokeWidth="2" />
                      <path
                        d="M50,110 Q80,100 110,110 M80,90 L80,130"
                        stroke="#d97706"
                        strokeWidth="1.2"
                      />

                      {/* Lotus Flower composed of Eggshell Tesserae */}
                      <g transform="translate(130, 50)">
                        {/* Petals with Eggshell Cracked Texture */}
                        <path
                          d="M30,70 C10,40 20,10 30,0 C40,10 50,40 30,70 Z"
                          fill="#fefce8"
                          stroke="#78350f"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M15,65 C-5,45 0,20 15,10 C22,25 25,50 15,65 Z"
                          fill="#fef08a"
                          stroke="#78350f"
                          strokeWidth="1.2"
                        />
                        <path
                          d="M45,65 C65,45 60,20 45,10 C38,25 35,50 45,65 Z"
                          fill="#fef08a"
                          stroke="#78350f"
                          strokeWidth="1.2"
                        />
                        {/* Gold Stamen Center */}
                        <circle cx="30" cy="45" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1" />
                      </g>

                      {/* Delicate Dragonfly in Gold Leaf */}
                      <g transform="translate(55, 35)">
                        <line x1="0" y1="0" x2="20" y2="15" stroke="#f59e0b" strokeWidth="1.5" />
                        <ellipse cx="6" cy="4" rx="10" ry="2.5" fill="none" stroke="#fef08a" strokeWidth="1" transform="rotate(-20 6 4)" />
                        <ellipse cx="12" cy="8" rx="8" ry="2" fill="none" stroke="#fef08a" strokeWidth="1" transform="rotate(-15 12 8)" />
                      </g>
                    </svg>

                    {/* 10x Magnifier Overlay on Eggshell cracks */}
                    {isMagnifierActive && (
                      <div className="absolute right-6 top-8 h-28 w-28 rounded-full border-2 border-amber-400 bg-[#0c0a09]/90 shadow-[0_0_25px_rgba(245,158,11,0.5)] p-2 backdrop-blur-sm">
                        <div className="flex h-full w-full flex-col items-center justify-center text-center">
                          <span className="font-mono text-[9px] text-amber-300">SOI 10X VỎ TRỨNG</span>
                          {/* Cracked tesserae micro graphic */}
                          <svg className="h-12 w-12 my-1" viewBox="0 0 50 50">
                            <polygon points="10,5 25,8 20,25 8,20" fill="#fefce8" stroke="#451a03" strokeWidth="1" />
                            <polygon points="25,8 42,6 38,22 20,25" fill="#fef9c3" stroke="#451a03" strokeWidth="1" />
                            <polygon points="8,20 20,25 24,42 6,38" fill="#fef08a" stroke="#451a03" strokeWidth="1" />
                            <polygon points="20,25 38,22 44,38 24,42" fill="#fefce8" stroke="#451a03" strokeWidth="1" />
                          </svg>
                          <span className="text-[8px] text-stone-400">Rạn ngẫu nhiên</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom metrics on visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Bí Quyết Làng Nghề:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5">
                        {currentStep.craftSecret}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Vật Liệu Cổ Truyền:</div>
                      <div className="text-xs font-serif text-amber-300 font-medium">
                        {currentStep.materials}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Selector Pills */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {LACQUER_STEPS.map((stepItem, idx) => {
                    const isSelected = activeStepIndex === idx
                    return (
                      <button
                        key={stepItem.step}
                        type="button"
                        onClick={() => setActiveStepIndex(idx)}
                        className={cn(
                          'flex-1 min-w-[100px] rounded-lg border px-2.5 py-2 text-left transition-all',
                          isSelected
                            ? 'border-amber-400 bg-amber-950/60 text-amber-200 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-stone-200'
                        )}
                      >
                        <div className="font-mono text-[10px] text-amber-400">Bước {stepItem.step}</div>
                        <div
                          className="font-serif text-xs truncate mt-0.5"
                          dangerouslySetInnerHTML={{ __html: stepItem.name }}
                        />
                      </button>
                    )
                  })}
                </div>

                {/* Light Angle Slider & Magnifier Toggle */}
                <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-stone-400">Góc Hắt Sáng Vàng Quỳ:</span>
                    <input
                      type="range"
                      min="0"
                      max="180"
                      value={lightReflectionAngle}
                      onChange={(e) => setLightReflectionAngle(Number(e.target.value))}
                      aria-label="Góc phản xạ ánh sáng trên nền vàng quỳ"
                      className="w-28 accent-amber-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                    />
                    <span className="font-mono text-amber-300 w-8">{lightReflectionAngle}°</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsMagnifierActive(!isMagnifierActive)}
                    className={cn(
                      'rounded-lg border px-3 py-1 font-mono text-xs transition-all',
                      isMagnifierActive
                        ? 'border-amber-400 bg-amber-950 text-amber-200'
                        : 'border-stone-800 bg-stone-900 text-stone-400'
                    )}
                  >
                    {isMagnifierActive ? '🔍 Kính Lúp 10x: BẬT' : '🔍 Kính Lúp: TẮT'}
                  </button>
                </div>
              </div>

              {/* Hand Polishing Secret Note */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-xs text-stone-300 leading-relaxed">
                <span className="font-serif text-amber-300 font-medium">Kỹ Thuật Đánh Bóng Lòng Bàn Tay: </span>
                Không có bất kỳ chiếc máy móc nào thay thế được hơi ấm và lớp biểu bì mịn màng của bàn tay người nghệ nhân. Hàng vạn lần miết tay trên bề mặt kết hợp bột than mịn tạo nên độ bóng nước huyền hoặc, soi gương được mà không hề có vệt xoáy công nghiệp.
              </div>
            </div>

            {/* Right 5 cols: Preservation Specs & Commission Details */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Museum Preservation Cockpit */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                      Tủ Trưng Bày Vi Khí Hậu Sơn Mài
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">Bảo Tồn Bền Vững</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Độ Ẩm Tối Ưu</span>
                    <div className="mt-1 font-mono text-lg text-emerald-400 font-semibold">65.0% RH</div>
                    <span className="text-[9px] text-stone-500">Giữ độ dẻo sơn ta</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Nhiệt Độ Buồng</span>
                    <div className="mt-1 font-mono text-lg text-amber-300 font-semibold">22.5°C</div>
                    <span className="text-[9px] text-stone-500">Tránh sốc nhiệt độ</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Chỉ Số Chói Lóa</span>
                    <div className="mt-1 font-mono text-lg text-cyan-400 font-semibold">UGR &lt; 12</div>
                    <span className="text-[9px] text-stone-500">Chiếu sáng hắt 20°</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Số Lớp Sơn Ta</span>
                    <div className="mt-1 font-mono text-lg text-purple-300 font-semibold">18 Lớp</div>
                    <span className="text-[9px] text-stone-500">Độ sâu bóng nước</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-relaxed">
                  Nhựa cây sơn ta Phú Thọ có cơ chế khô đặc biệt: hút ẩm từ không khí để đóng rắn tự nhiên. Nhờ đó, tranh sơn mài của GuHomes càng để lâu năm càng trở nên trong trẻo và bóng mịn.
                </div>
              </div>

              {/* Bespoke Lacquerware Artwork Application */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
                  Ứng Dụng Trong Dinh Thự GuHomes
                </h4>
                <div className="space-y-2 text-xs text-stone-300">
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span><strong>Vách Bình Phong Tứ Bình:</strong> Ngăn ước lệ giữa phòng khách Master và phòng trà thiền.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span><strong>Mặt Bàn Console Tiền Sảnh:</strong> Cẩn trứng hoa sen đón khách, phủ then đen bóng gương.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span><strong>Tranh Treo Tường Khổ Lớn 3.6m:</strong> Điểm nhấn nghệ thuật với lá vàng quỳ 24K rực rỡ.</span>
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=artisan-lacquerware-gallery"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-800 to-amber-600 px-5 py-3 text-xs sm:text-sm font-medium text-amber-100 hover:from-amber-700 hover:to-amber-500 transition-all shadow-lg shadow-amber-950/50"
                >
                  <span>Đặt Hàng Tác Phẩm Sơn Mài Độc Bản</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-amber-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Giám tuyển trực tiếp cùng nghệ nhân ưu tú làng nghề.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
