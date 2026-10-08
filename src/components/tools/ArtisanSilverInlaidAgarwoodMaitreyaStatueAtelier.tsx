'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface InspectionPoint {
  id: string
  title: string
  zone: string
  magnification: string
  description: string
  craftsmanshipDetail: string
  coordinates: { x: number; y: number }
}

const INSPECTION_POINTS: readonly InspectionPoint[] = [
  {
    id: 'silver-inlay-robe',
    title: 'Họa Tiết Mộng Đuôi Én Nạm Chỉ Bạc 999',
    zone: 'Vạt áo hoan hỷ ngực & vai',
    magnification: '40x Quang Học',
    description: 'Nghệ nhân dùng dao vi phẫu rạch rãnh ngầm góc vát đuôi én 0.20mm trên sớ dầu trầm đen kịt, dùng búa đồng nện từng sợi chỉ bạc 999 ngập sâu vào thân gỗ.',
    craftsmanshipDetail: 'Bạc ròng khóa chặt vĩnh cửu theo mộng hình học, không sử dụng keo dán công nghiệp, chịu biến thiên nhiệt ẩm Sài Gòn mà không bong tróc.',
    coordinates: { x: 48, y: 42 },
  },
  {
    id: 'jade-eyes',
    title: 'Ánh Mắt Từ Bi Khảm Ngọc Cẩm Thạch Myanmar Type A',
    zone: 'Thần thái diện mạo Phật Di Lặc',
    magnification: '80x Hiển Vi Cực Đại',
    description: 'Cặp mắt khảm ngọc cẩm thạch Myanmar loại A hoàn toàn tự nhiên, mài tròn cabochon ngọc lý phát quang dịu nhẹ dưới ánh đèn gián tiếp 2700K.',
    craftsmanshipDetail: 'Nụ cười hoan hỷ đục tay mềm mại, giữ trọn vẹn đường vân dầu tự nhiên của khối trầm tích tụ hơn 80 năm.',
    coordinates: { x: 50, y: 24 },
  },
  {
    id: 'agarwood-oil-core',
    title: 'Sớ Dầu Trầm Hương Chìm Nước Khánh Hòa',
    zone: 'Thân phôi nguyên khối',
    magnification: '60x Cấu Trúc Vi Mô',
    description: 'Phôi Trầm chìm nước loại 1 rừng nguyên sinh Khánh Hòa, tỉ trọng > 1.0 nặng tay chìm hoàn toàn trong nước, mật độ tinh dầu sánh đặc màu hổ phách đậm.',
    craftsmanshipDetail: 'Hương thơm vi khí hậu ngọt ngào thanh khiết tỏa lan tự nhiên, có tác dụng an thần, thư thái và kháng khuẩn chống ẩm mốc phòng kín.',
    coordinates: { x: 54, y: 60 },
  },
  {
    id: 'ebony-pedestal',
    title: 'Bệ Gỗ Mun Sừng Khắc Triện GuHomes Độc Bản',
    zone: 'Chân đế vững chãi',
    magnification: '20x Bề Mặt',
    description: 'Khối Mun sừng Khánh Hòa đen nhánh tự nhiên không nhuộm, được tiện mộng chuẩn xác ôm khít đáy phôi trầm hương.',
    craftsmanshipDetail: 'Triện thư khắc laser vi điểm độc bản: GU-AGARWOOD-MAITREYA-2026-X kèm hồ sơ định danh xuất xứ phôi gỗ.',
    coordinates: { x: 50, y: 88 },
  },
]

export function ArtisanSilverInlaidAgarwoodMaitreyaStatueAtelier({ className }: { className?: string }) {
  const [selectedPointId, setSelectedPointId] = useState<string>('silver-inlay-robe')
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [isCopiedCode, setIsCopiedCode] = useState<boolean>(false)
  const { openQuoteModal } = useQuickQuote()

  const currentPoint = INSPECTION_POINTS.find((p) => p.id === selectedPointId) ?? INSPECTION_POINTS[0]!

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('GU-AGARWOOD-MAITREYA-2026-X')
      setIsCopiedCode(true)
      setTimeout(() => setIsCopiedCode(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-gradient-to-b from-stone-950 via-neutral-900 to-black p-6 sm:p-10 text-stone-100 shadow-2xl',
        className
      )}
      aria-label="Xưởng Chế Tác Tượng Di Lặc Trầm Hương Nạm Chỉ Bạc 999"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-stone-700/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-900/10 blur-3xl" />

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700 bg-stone-800/80 px-3 py-1 text-xs font-medium text-stone-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Nghệ Thuật Khảm Chỉ Bạc & Trầm Hương Khánh Hòa
            </span>
            <span className="text-xs text-stone-400">Xưởng Mộc Thạnh Xuân 1.200m²</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-white">
            Tượng Di Lặc <span className="font-serif italic text-amber-200">Trầm Hương Nạm Bạc 999</span>
          </h2>
          <p className="mt-2 max-w-2xl text-sm sm:text-base text-stone-300 leading-relaxed font-light">
            Kiệt tác độc bản ngự thế phòng khách Quiet Luxury: phôi Trầm hương chìm nước Khánh Hòa tỏa vi hương thanh khiết, chỉ bạc ròng 999 khảm mộng đuôi én thủ công và mắt ngọc cẩm thạch Myanmar Type A.
          </p>
        </div>

        {/* Origin Seal Box */}
        <div className="flex items-center gap-3 bg-stone-900/90 border border-stone-800 rounded-2xl px-4 py-3 backdrop-blur-md">
          <div className="text-right">
            <div className="text-xs text-stone-400 font-mono">MÃ ĐỊNH DANH ĐỘC BẢN</div>
            <div className="text-sm font-semibold font-mono text-stone-200">GU-AGARWOOD-MAITREYA-2026-X</div>
          </div>
          <button
            onClick={handleCopyCode}
            aria-label="Sao chép mã định danh độc bản"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            {isCopiedCode ? <CheckIcon className="h-4 w-4 text-emerald-400" /> : <span className="text-xs font-mono">CPY</span>}
          </button>
        </div>
      </div>

      {/* Main Showcase & Microscope Viewer */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left: 360 Interactive Inspection Stage (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <span className="text-xs uppercase tracking-wider text-stone-300 font-mono">
                  Kính Hiển Vi Quang Học Soi Chỉ Bạc 0.20mm
                </span>
              </div>
              <span className="text-xs text-amber-300/80 font-mono">{currentPoint.magnification}</span>
            </div>

            {/* Visual Viewport with Hotspots */}
            <div className="relative flex aspect-square max-h-[380px] w-full items-center justify-center overflow-hidden rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-950 via-neutral-950 to-black p-4 shadow-inner">
              {/* Radial Reticle Lines */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25">
                <div className="h-64 w-64 rounded-full border border-stone-600 border-dashed" />
                <div className="h-44 w-44 rounded-full border border-stone-600" />
                <div className="absolute h-full w-px bg-stone-700/50" />
                <div className="absolute w-full h-px bg-stone-700/50" />
              </div>

              {/* Rotatable Artifact Centerpiece */}
              <motion.div
                animate={{ rotate: rotationAngle }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                className="relative flex h-64 w-64 items-center justify-center rounded-2xl border border-stone-700/50 bg-stone-900/80 p-6 shadow-2xl"
              >
                {/* Decorative Agarwood & Silver Grain */}
                <div className="text-center">
                  <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full border-2 border-stone-500/30 bg-stone-950 shadow-inner">
                    <span className="text-2xl font-serif text-amber-200">弥勒</span>
                  </div>
                  <div className="text-sm font-medium text-stone-200">Trầm Hương Chìm Nước</div>
                  <div className="text-xs text-amber-300/80 font-mono mt-0.5">Khảm Chỉ Bạc 999</div>
                  <div className="mt-2 text-[10px] text-stone-400 font-mono">
                    Khánh Hòa · Tỉ Trọng &gt; 1.0 · Mộng Đuôi Én
                  </div>
                </div>
              </motion.div>

              {/* Hotspot Markers */}
              {INSPECTION_POINTS.map((point) => (
                <button
                  key={point.id}
                  onClick={() => setSelectedPointId(point.id)}
                  style={{ top: `${point.coordinates.y}%`, left: `${point.coordinates.x}%` }}
                  className={cn(
                    'absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 z-20',
                    selectedPointId === point.id
                      ? 'h-8 w-8 bg-amber-500 text-stone-950 ring-4 ring-amber-500/30 shadow-lg'
                      : 'h-6 w-6 bg-stone-800 text-stone-300 hover:bg-stone-700'
                  )}
                  aria-label={`Soi điểm ${point.title}`}
                >
                  <span className="text-[10px] font-bold font-mono">
                    {point.id === 'silver-inlay-robe'
                      ? '01'
                      : point.id === 'jade-eyes'
                      ? '02'
                      : point.id === 'agarwood-oil-core'
                      ? '03'
                      : '04'}
                  </span>
                </button>
              ))}
            </div>

            {/* 360 Rotation Control Slider */}
            <div className="mt-6 p-4 rounded-xl bg-stone-950/60 border border-stone-800">
              <div className="flex items-center justify-between text-xs text-stone-300 mb-2">
                <span className="font-mono">XOAY GÓC QUAN SÁT 360 ĐỘ:</span>
                <span className="text-amber-300 font-mono font-semibold">{rotationAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="5"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                <span>0° (Chính diện diện mạo)</span>
                <span>90° (Vạt áo khảm chỉ bạc)</span>
                <span>180° (Sớ dầu lưng phôi trầm)</span>
                <span>270° (Khối bệ Mun sừng)</span>
              </div>
            </div>
          </div>

          {/* Microscopic Inspection Details Box */}
          <div className="mt-6 pt-4 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">VỊ TRÍ ĐANG SOI HIỂN VI:</span>
              <span className="text-xs font-semibold text-amber-300">{currentPoint.zone}</span>
            </div>
            <p className="mt-2 text-xs text-stone-300 leading-relaxed">{currentPoint.description}</p>
            <div className="mt-2 text-[11px] text-stone-400 font-light italic">
              Kỹ nghệ: {currentPoint.craftsmanshipDetail}
            </div>
          </div>
        </div>

        {/* Right: Inspection Points & Craftsmanship Standards (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          {/* Inspection Select List */}
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-medium text-white">4 Chi Tiết Chế Tác Vi Điểm</h3>
              <span className="text-xs text-amber-300 font-mono">Độ phóng đại hiển vi</span>
            </div>

            <div className="space-y-3">
              {INSPECTION_POINTS.map((pt) => (
                <div
                  key={pt.id}
                  onClick={() => setSelectedPointId(pt.id)}
                  className={cn(
                    'p-3.5 rounded-xl border transition-all cursor-pointer',
                    selectedPointId === pt.id
                      ? 'border-amber-500/60 bg-amber-500/10 shadow-sm'
                      : 'border-stone-800/80 bg-stone-950/40 hover:border-stone-700'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-stone-100">{pt.title}</span>
                    <span className="text-xs font-mono text-amber-400">{pt.magnification}</span>
                  </div>
                  <div className="mt-1 text-xs text-stone-400 leading-normal">{pt.zone}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Microclimate Scent & Material Value Card */}
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <h3 className="text-xs uppercase tracking-wider text-amber-300 font-mono mb-3">
              Giá Trị Vi Khí Hậu & Phong Thủy An Yên
            </h3>
            <div className="space-y-3 text-xs text-stone-300 leading-relaxed font-light">
              <div className="border-b border-stone-800/60 pb-2.5">
                <span className="font-medium text-stone-100">Hương Trầm Vi Khí Hậu:</span> Tinh dầu trầm tự nhiên tỏa hương thanh dịu liên tục, ổn định nhịp thở, thư thái thần kinh trong không gian phòng điều hòa 75% RH.
              </div>
              <div className="border-b border-stone-800/60 pb-2.5">
                <span className="font-medium text-stone-100">Chỉ Bạc Ròng 999:</span> Bạc nguyên chất có tính kháng khuẩn tự nhiên, phản xạ năng lượng tiêu cực, tạo điểm nhấn kim loại quý tương phản trên nền gỗ trầm đen nhánh.
              </div>
              <div>
                <span className="font-medium text-stone-100">Bảo Chứng Triện Thư:</span> Tác phẩm độc bản kèm chứng chỉ phân tích tỉ trọng trầm chìm nước và kiểm định ngọc cẩm thạch thiên nhiên.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Call to Action */}
      <div className="relative z-10 mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-stone-400 text-center sm:text-left">
          Trần 12 công trình/năm · Chế tác thủ công riêng biệt theo diện mạo phòng khách gia chủ
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => openQuoteModal('Tượng Di Lặc Trầm Hương Nạm Chỉ Bạc 999')}
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-2.5 text-xs font-semibold tracking-wide transition-all shadow-md"
          >
            Đặt Hàng Tượng Trầm Nạm Bạc
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/80 hover:bg-stone-800 text-stone-200 px-4 py-2.5 text-xs font-medium transition-all"
          >
            Hotline: 0368 757 916
          </Link>
        </div>
      </div>
    </section>
  )
}
