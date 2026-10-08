'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CalligraphyBrush {
  id: string
  name: string
  shortName: string
  series: string
  purpose: string
  bristleType: string
  handleMaterial: string
  strokeWidthMm: string
  inkRetention: string
  elasticityScore: number // 1 - 10
  silverInlayPattern: string
  lore: string
}

const BRUSH_COLLECTION: CalligraphyBrush[] = [
  {
    id: 'tieu-khai',
    name: 'Bút Tiểu Khải · Kim Chỉ Mai',
    shortName: 'Bút Tiểu Khải',
    series: 'Kim Chỉ Mai',
    purpose: 'Chép kinh Phật, thư tín tri kỷ & tiểu khải 1-2cm',
    bristleType: 'Lông đuôi chồn tuyết Siberi (Lang Hào) tinh tuyển',
    handleMaterial: 'Sơn mài then 18 lớp, cẩn chỉ bạc 9999 mỏng 0.08mm',
    strokeWidthMm: '0.3mm - 1.5mm',
    inkRetention: '25 chữ tiểu khải mỗi lần nhúng mực mài',
    elasticityScore: 9.8,
    silverInlayPattern: 'Họa tiết Nhất Chi Mai thếp bạc viền xà cừ đỏ',
    lore: 'Ngòi bút tụ nhọn như mũi kim, bật nảy tức thì khi chuyển hướng nét phẩy, giữ nét thanh mảnh sắc như dao cạo.',
  },
  {
    id: 'trung-khai',
    name: 'Bút Trung Khải · Vân Thủy Long',
    shortName: 'Bút Trung Khải',
    series: 'Vân Thủy Long',
    purpose: 'Thư pháp hoành phi, thi phẩm đối liên & trung khải 3-6cm',
    bristleType: 'Phối kiêm hào: 70% Lông chồn núi + 30% Lông dê trắng thượng hạng',
    handleMaterial: 'Sơn mài then đen sâu thẳm, cẩn chỉ bạc 999 vân sóng nước',
    strokeWidthMm: '1.2mm - 5.0mm',
    inkRetention: '12 chữ trung khải no mực',
    elasticityScore: 8.9,
    silverInlayPattern: 'Vân mây Đại Việt thế kỷ 18 uốn lượn thân bút',
    lore: 'Cân bằng hoàn hảo giữa tính cương mãnh của lông chồn và độ nhu hòa ngậm mực của lông dê núi, tạo nét chữ tròn đầy nội lực.',
  },
  {
    id: 'dai-tu',
    name: 'Bút Đại Tự · Bạch Hạc Vũ',
    shortName: 'Bút Đại Tự',
    series: 'Bạch Hạc Vũ',
    purpose: 'Đại tự thư pháp 10-25cm, liễn mừng thọ & hoành phi phòng trà',
    bristleType: '100% Lông dê núi cao nguyên sấy nhiệt chải sáp ong',
    handleMaterial: 'Cán sơn mài then bóng gương, chuôi ốp sừng trâu vân hổ phách',
    strokeWidthMm: '4.0mm - 18.0mm',
    inkRetention: 'Ngậm 45ml mực mài thủ công mỗi lần đẫm ngòi',
    elasticityScore: 7.5,
    silverInlayPattern: 'Cánh hạc vút bay khảm bạc lấp lánh dọc sống bút',
    lore: 'Bụng bút nở to, chất lông mềm mại lưu giữ giọt mực mài óng ả, khi hạ bút phóng khoáng như rồng bay phượng múa.',
  },
  {
    id: 'lan-truc',
    name: 'Bút Lan Trúc · Tiêu Tương',
    shortName: 'Bút Lan Trúc',
    series: 'Tiêu Tương',
    purpose: 'Thủy mặc vẽ cành trúc, hoa lan, lá cỏ & nét vuốt tùng bách',
    bristleType: 'Lông sói xám Trường Bạch (Sói lang hào đanh thép)',
    handleMaterial: 'Thân sơn mài phối cẩm thạch khảm chỉ bạc',
    strokeWidthMm: '0.8mm - 8.0mm',
    inkRetention: '18 nét vuốt dài không đứt quãng',
    elasticityScore: 9.5,
    silverInlayPattern: 'Đốt trúc thanh cao khảm chỉ bạc đôi tao nhã',
    lore: 'Ngòi bút có độ bật đàn hồi tuyệt đối, chuyên dùng để kéo những nét vuốt lá trúc dứt khoát như đường kiếm phiêu dật.',
  },
  {
    id: 'ba-but',
    name: 'Đại Bá Bút · Trấn Sơn Hà',
    shortName: 'Đại Bá Bút',
    series: 'Trấn Sơn Hà',
    purpose: 'Đại tác phẩm triển lãm, tường thư họa biệt thự & biểu diễn thư pháp',
    bristleType: 'Lông ngựa bạch thảo nguyên kết hợp lông bờm hươu',
    handleMaterial: 'Gỗ Cẩm lai Bà Rịa nguyên khối dài 38cm, đai đồng thau chạm rồng',
    strokeWidthMm: '15.0mm - 65.0mm',
    inkRetention: 'Ngậm tới 120ml mực mài, nét chảy cuồn cuộn',
    elasticityScore: 8.2,
    silverInlayPattern: 'Biển sóng Nam Hải cẩn ốc xà cừ ngũ sắc Quảng Nam',
    lore: 'Cây bút nặng tay đĩnh đạc, mang phong thái của bậc danh gia tạo tác những đại tự trấn trạch uy nghi trong sảnh đường.',
  },
]

export function ArtisanHandmadeLacquerAndSilverInlayBrushSetAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedBrushId, setSelectedBrushId] = useState<string>(BRUSH_COLLECTION[0]!.id)
  const [zoomLevel, setZoomLevel] = useState<1 | 5 | 18>(18)
  const [inkColor, setInkColor] = useState<'nhien-the-den' | 'chu-sa-do' | 'thep-vang-24k'>('nhien-the-den')
  const [brushingTestActive, setBrushingTestActive] = useState(false)
  const [customSealName, setCustomSealName] = useState('')
  const [orderSent, setOrderSent] = useState(false)

  const activeBrush: CalligraphyBrush = BRUSH_COLLECTION.find((b) => b.id === selectedBrushId) ?? BRUSH_COLLECTION[0]!

  return (
    <section
      aria-label="Xưởng Chế Tác Bộ Bút Lông Sơn Mài Cẩn Bạc & Ống Cẩm Lai GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Subtle Ink Wash Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(217,119,6,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-amber-300">
                Atelier Thư Họa · GU-BRUSH-2026-X
              </span>
              <span className="text-xs font-mono text-stone-400">Sơn Mài Then · Chỉ Bạc 999 · Gỗ Cẩm Lai</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Bộ Bút Lông Sơn Mài Cẩn Bạc
              <span className="block font-sans text-lg font-normal text-amber-200/80 sm:text-xl mt-1">
                Kính Soi 18x Sợi Bạc 0.08mm & Ống Cắm Bút Gỗ Cẩm Lai Bà Rịa
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Được chế tác thủ công qua 24 công đoạn tôi luyện: thân bút phủ 18 lớp sơn then mài bóng gương cẩn chỉ bạc 999 siêu mảnh, 
            đầu lông chồn tuyết Siberia đanh thép &amp; dê núi nhu hòa, cắm trang trọng trong ống gỗ Cẩm lai nguyên khối bọc đai đồng thau.
          </p>
        </div>

        {/* 5-Brush Selector Carousel */}
        <div className="mt-8 grid gap-3 sm:grid-cols-5">
          {BRUSH_COLLECTION.map((brush, index) => {
            const isSelected = selectedBrushId === brush.id
            return (
              <button
                key={brush.id}
                onClick={() => {
                  setSelectedBrushId(brush.id)
                  setBrushingTestActive(true)
                  setTimeout(() => setBrushingTestActive(false), 600)
                }}
                className={cn(
                  'flex flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-300 min-h-[44px]',
                  isSelected
                    ? 'border-amber-400 bg-stone-900 shadow-xl shadow-amber-950/30 ring-1 ring-amber-400/40'
                    : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-800/40'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-amber-400/90 font-medium">#{index + 1}</span>
                    <span className="font-mono text-[10px] text-stone-400">{brush.strokeWidthMm}</span>
                  </div>
                  <h3 className="mt-2 font-serif text-sm font-medium text-stone-100">{brush.shortName}</h3>
                  <span className="text-[11px] font-mono text-amber-200/70 block mt-0.5">
                    {brush.series}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>Đàn hồi</span>
                    <strong className="text-amber-300">{brush.elasticityScore}/10</strong>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Interactive Microscope Inspector (18x) & Brush Physics */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* 18x Microscope View (7 cols) */}
          <div className="rounded-3xl border border-stone-800 bg-stone-900/80 p-6 sm:p-8 backdrop-blur-xl lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                    Kính Hiển Vi Soi Chi Tiết Cẩn Bạc & Lông Bút
                  </span>
                </div>

                {/* Zoom Level Switcher */}
                <div className="flex items-center gap-1 rounded-xl border border-stone-800 bg-stone-950 p-1">
                  {([1, 5, 18] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setZoomLevel(lvl)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 font-mono text-xs transition min-h-[32px]',
                        zoomLevel === lvl
                          ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                          : 'text-stone-400 hover:text-stone-200'
                      )}
                    >
                      {lvl}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Optical Microscope Frame Simulation */}
              <div className="mt-6 relative h-64 sm:h-72 rounded-2xl border-2 border-stone-800 bg-gradient-to-b from-stone-950 via-neutral-900 to-stone-950 overflow-hidden flex items-center justify-center">
                {/* Reticle / Crosshair */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div className="h-full w-px bg-cyan-400/40" />
                  <div className="absolute w-full h-px bg-cyan-400/40" />
                  <div className="absolute h-40 w-40 rounded-full border border-cyan-400/30" />
                </div>

                {/* Microscope Subject Animation */}
                <motion.div
                  animate={{
                    scale: zoomLevel === 18 ? 1.8 : zoomLevel === 5 ? 1.25 : 1.0,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center p-6 text-center"
                >
                  {/* Lacquer Tube with Embedded Silver Inlay */}
                  <div className="relative h-14 w-64 sm:w-80 rounded-full bg-black border border-stone-700 shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* Deep Mirror Lacquer Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

                    {/* Pure Silver 999 Inlay Wire Graphic */}
                    <motion.div
                      animate={{
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="flex items-center gap-3 px-4"
                    >
                      <span className="h-0.5 w-12 rounded-full bg-gradient-to-r from-slate-300 via-white to-slate-400 shadow-sm shadow-white/80" />
                      <span className="font-serif text-[11px] text-slate-200 tracking-widest uppercase">
                        {activeBrush.silverInlayPattern}
                      </span>
                      <span className="h-0.5 w-12 rounded-full bg-gradient-to-r from-slate-400 via-white to-slate-300 shadow-sm shadow-white/80" />
                    </motion.div>
                  </div>

                  {/* Microscopic Silver Spec Callout */}
                  <div className="mt-4 flex items-center gap-3 font-mono text-[11px] text-amber-300">
                    <span className="rounded bg-stone-900/90 border border-stone-700 px-2 py-0.5">
                      Chỉ bạc: 0.08mm
                    </span>
                    <span className="rounded bg-stone-900/90 border border-stone-700 px-2 py-0.5">
                      Độ bóng sơn mài: 98 GU
                    </span>
                    <span className="rounded bg-stone-900/90 border border-stone-700 px-2 py-0.5 text-cyan-300">
                      Độ phóng đại: {zoomLevel}x
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Brush Physical Qualities & Lore */}
            <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950/70 p-5">
              <h4 className="font-serif text-base text-stone-100">{activeBrush.name}</h4>
              <p className="mt-1 font-mono text-xs text-amber-300/80">{activeBrush.purpose}</p>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 text-xs font-mono text-stone-300 border-t border-stone-800/80 pt-3">
                <div>
                  <span className="text-stone-500">Chất liệu lông:</span>
                  <p className="text-stone-200 font-sans mt-0.5">{activeBrush.bristleType}</p>
                </div>
                <div>
                  <span className="text-stone-500">Thân bút & Cán:</span>
                  <p className="text-stone-200 font-sans mt-0.5">{activeBrush.handleMaterial}</p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-stone-500">Độ ngậm mực & Nét viết:</span>
                  <p className="text-amber-200 font-sans mt-0.5">{activeBrush.inkRetention}</p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-stone-400 font-light border-t border-stone-800/60 pt-3">
                {activeBrush.lore}
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Ink Stroke Test & Custom Engraving (5 cols) */}
          <div className="rounded-3xl border border-stone-800 bg-stone-900/80 p-6 sm:p-8 backdrop-blur-xl lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                  Thử Nét Mực & Độ Đàn Hồi
                </span>
                <span className="font-mono text-xs text-stone-400">Thủy Mặc May Đo</span>
              </div>

              {/* Ink Color Selector */}
              <div className="mt-4 flex gap-2">
                {[
                  { id: 'nhien-the-den', label: 'Mực Muội Đèn', hex: 'bg-stone-900 border-stone-600' },
                  { id: 'chu-sa-do', label: 'Mực Chu Sa', hex: 'bg-red-950 border-red-600 text-red-300' },
                  { id: 'thep-vang-24k', label: 'Mực Vàng 24K', hex: 'bg-amber-950 border-amber-500 text-amber-300' },
                ].map((ink) => (
                  <button
                    key={ink.id}
                    onClick={() => setInkColor(ink.id as typeof inkColor)}
                    className={cn(
                      'flex-1 rounded-xl border p-2 text-center font-serif text-xs transition min-h-[44px]',
                      inkColor === ink.id
                        ? `${ink.hex} ring-1 ring-amber-400 font-semibold shadow`
                        : 'border-stone-800 bg-stone-950/40 text-stone-400 hover:border-stone-700'
                    )}
                  >
                    {ink.label}
                  </button>
                ))}
              </div>

              {/* Simulated Rice Paper Calligraphy Test Area */}
              <div className="mt-6 rounded-2xl border border-stone-800 bg-[#f7f5ed] p-6 text-stone-900 min-h-[190px] flex flex-col justify-between relative shadow-inner">
                <div className="flex items-center justify-between font-mono text-[10px] text-stone-500">
                  <span>Giấy Xuyến Chỉ Thượng Hải (70g)</span>
                  <span>Độ loang: Cực Thấp (Bán Thục)</span>
                </div>

                {/* Drawn Stroke Preview with Animation */}
                <div className="my-auto py-2">
                  <motion.svg
                    key={`${activeBrush.id}-${inkColor}`}
                    viewBox="0 0 300 80"
                    className="w-full h-20"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: 'easeInOut' }}
                  >
                    <path
                      d="M 20,45 C 70,15 120,65 180,30 C 220,10 260,50 280,35"
                      fill="none"
                      stroke={
                        inkColor === 'nhien-the-den'
                          ? '#1c1917'
                          : inkColor === 'chu-sa-do'
                          ? '#991b1b'
                          : '#b45309'
                      }
                      strokeWidth={
                        activeBrush.id === 'tieu-khai'
                          ? 2.5
                          : activeBrush.id === 'trung-khai'
                          ? 5
                          : activeBrush.id === 'dai-tu'
                          ? 10
                          : activeBrush.id === 'lan-truc'
                          ? 4.5
                          : 16
                      }
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </div>

                <div className="flex items-center justify-between border-t border-stone-300 pt-2 font-mono text-[11px] text-stone-700">
                  <span>Độ đàn hồi ngòi: {activeBrush.elasticityScore}/10</span>
                  <span className="font-serif italic font-semibold">Tự tại bút ý</span>
                </div>
              </div>
            </div>

            {/* Custom Engraving for Cam Lai Penholder */}
            <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950/80 p-5">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block">
                Ống Cắm Bút Gỗ Cẩm Lai Bà Rịa
              </span>
              <p className="mt-1 text-xs text-stone-300 font-light">
                Tiện từ khối gỗ Cẩm lai tự nhiên, vân hoa cuộn lửa, bọc đai đồng thau vàng óng. Khắc triện tên gia chủ bằng mũi kim cương.
              </p>

              <div className="mt-3">
                <input
                  type="text"
                  value={customSealName}
                  onChange={(e) => setCustomSealName(e.target.value)}
                  placeholder="Khắc tên triện (VD: An Gia Thư Quán)"
                  className="w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Craft Values */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              01 · Lông Chồn Tuyết Siberia
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Bật Nảy Nhu Cương Hoàn Hảo</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Mỗi chùm lông được thợ cả chải lọc từng sợi dưới ánh đèn dầu, chỉ giữ lại những sợi lông thẳng tắp, 
              có ngọn hình mũi mác tự nhiên để ngậm no mực mà nét phóng ra vẫn mảnh như tơ.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              02 · Sơn Mài Then Cẩn Chỉ Bạc
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Bóng Gương Đen Sâu Thẳm</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Nhựa cây sơn ta Phú Thọ ủ kén, quét 18 lớp và ủ ẩm trong buồng kín 30 ngày. 
              Sợi bạc nguyên chất 999 uốn lượn thủ công và mài phẳng bóng loáng không một vết gợn dưới kính hiển vi.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              03 · Gỗ Cẩm Lai Bà Rịa
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Vân Hoa Đậm Đặc Chống Ẩm Mốc</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Gỗ Cẩm lai sấy chậm đạt độ ẩm 10%, tinh dầu tự nhiên xua đuổi côn trùng và bảo vệ đầu lông bút không bị gãy giòn trong mùa mưa Sài Gòn ẩm ướt 85%.
            </p>
          </div>
        </div>

        {/* Custom Order Box */}
        <div className="mt-14 rounded-3xl border border-amber-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                GuHomes Calligraphy Atelier
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Đặt Hàng Bộ Bút Thư Họa Hoàng Gia
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Bộ sưu tập bao gồm trọn bộ 5 cây bút sơn mài then cẩn bạc, ống cắm bút gỗ Cẩm lai khắc tên gia chủ, 
                hộp gấm lụa Bảo Lộc may đo riêng và thỏi mực mài thủ công ngâm dầu tùng bách 50 năm.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Mã độc bản GU-BRUSH-2026-X</span>
                <span>✓ Khắc ấn triện theo yêu cầu</span>
                <span>✓ Giao tác phẩm tận gia tại TP.HCM</span>
              </div>
            </div>

            <div>
              {orderSent ? (
                <div className="rounded-2xl border border-amber-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu bộ bút thư họa</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Nghệ nhân thư họa GuHomes sẽ liên hệ để xác nhận chữ triện khắc trên ống cẩm lai và chuẩn bị đóng gói hộp gấm lụa cao cấp.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-4 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-md"
                >
                  <div>
                    <label htmlFor={`${formId}-fullname`} className="block font-mono text-xs text-stone-300">
                      Họ tên người sở hữu *
                    </label>
                    <input
                      id={`${formId}-fullname`}
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-mobile`} className="block font-mono text-xs text-stone-300">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      id={`${formId}-mobile`}
                      required
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-sealtext`} className="block font-mono text-xs text-stone-300">
                      Chữ triện khắc lên ống Cẩm lai & Thân bút
                    </label>
                    <input
                      id={`${formId}-sealtext`}
                      type="text"
                      value={customSealName}
                      onChange={(e) => setCustomSealName(e.target.value)}
                      placeholder="VD: Tuệ Tâm Thư Quán hoặc Tên gia chủ"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Đăng ký chế tác bộ bút lông độc bản
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
