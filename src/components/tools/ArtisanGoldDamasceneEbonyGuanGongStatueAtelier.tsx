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
    id: 'damascene-robe',
    title: 'Họa Tiết Mây Rồng Vàng 24K Nghệ Thuật Damascene',
    zone: 'Tà áo chiến bào ngực',
    magnification: '40x Quang Học',
    description: 'Nghệ nhân dùng dao đục micro rạch các rãnh đuôi én 0.15mm trên thớ gỗ Mun sừng Khánh Hòa, nện từng sợi chỉ vàng ròng 9999 ngập sâu vào thân gỗ.',
    craftsmanshipDetail: 'Bền bỉ vĩnh cửu theo thời gian, không bao giờ bong tróc dù biên độ nhiệt độ ẩm Sài Gòn biến thiên liên tục.',
    coordinates: { x: 48, y: 38 },
  },
  {
    id: 'damascus-blade',
    title: 'Thanh Long Yển Nguyệt Đao Thép Damascus 128 Lớp',
    zone: 'Vũ khí hộ thân tay hữu',
    magnification: '60x Hiển Vi',
    description: 'Thép rèn thủ công xếp lớp đan xen giữa thép carbon cao và niken mềm, tôi dầu thảo mộc và khắc hoa văn nước chảy đặc trưng.',
    craftsmanshipDetail: 'Cán đao tiện đồng đỏ nguyên khối, khớp nối ren mộng kín khít không chút lung lay.',
    coordinates: { x: 74, y: 22 },
  },
  {
    id: 'ruby-eyes',
    title: 'Ánh Mắt Oai Nghiêm Khảm Ngọc Ruby Lục Yên',
    zone: 'Thần thái diện mạo',
    magnification: '80x Chi Tiết Cực Đại',
    description: 'Cặp mắt khảm ngọc ruby tự nhiên chưa qua xử lý nhiệt, phản chiếu ánh sáng hổ phách uy nghiêm khi có đèn rọi 2700K.',
    craftsmanshipDetail: 'Từng sợi râu rồng được đục tay thanh mảnh mềm mại từ chính thớ mun sừng đen nhánh bóng như sừng tê.',
    coordinates: { x: 50, y: 25 },
  },
  {
    id: 'bazan-pedestal',
    title: 'Bệ Đá Núi Lửa Bazan Đắk Nông Khắc Triện',
    zone: 'Chân đế vững chãi',
    magnification: '20x Bề Mặt',
    description: 'Khối bazan núi lửa hàng triệu năm đục đẽo thủ công, chạm khắc triện thư độc bản bảo chứng xuất xứ GuHomes.',
    craftsmanshipDetail: 'Mã số định danh độc bản: GU-DAMASCENE-GUAN-2026-X kèm chứng chỉ giám định vàng 24K PNJ.',
    coordinates: { x: 50, y: 85 },
  },
]

export function ArtisanGoldDamasceneEbonyGuanGongStatueAtelier({ className }: { className?: string }) {
  const [selectedPointId, setSelectedPointId] = useState<string>('damascene-robe')
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [isCopiedCode, setIsCopiedCode] = useState<boolean>(false)
  const { openQuoteModal } = useQuickQuote()

  const currentPoint = INSPECTION_POINTS.find((p) => p.id === selectedPointId) ?? INSPECTION_POINTS[0]!

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText('GU-DAMASCENE-GUAN-2026-X')
      setIsCopiedCode(true)
      setTimeout(() => setIsCopiedCode(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <section
      id="guan-gong-damascene-atelier"
      className={cn('u-gutter py-[clamp(4.5rem,10vh,8rem)] bg-canvas border-t border-line/60 relative isolate overflow-hidden', className)}
    >
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-line">
          <div className="flex flex-col gap-3 max-w-[75ch]">
            <Label rule tone="accent">
              Chế Tác Nghệ Thuật Điêu Khắc Kim Hoàn & Mộc Ngự Dụng
            </Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-normal text-ink leading-[1.2]">
              Tượng Quan Công Mun Sừng Nạm Vàng 24K Damascene Độc Bản.
            </h2>
            <p className="font-body text-[1rem] text-ink/75 leading-relaxed mt-1">
              Kiệt tác phong thủy trấn trạch được tạo tác từ phôi gỗ Mun sừng Khánh Hòa chìm nước trăm năm, nạm chỉ vàng 24K theo nghệ thuật Damascene Toledo cổ truyền tại xưởng Thạnh Xuân 1.200m² của GuHomes.
            </p>
          </div>

          {/* Identification Stamp */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyCode}
              className="flex flex-col items-center justify-center rounded-xl bg-surface border border-accent/40 p-3.5 min-w-[170px] shadow-xs hover:border-accent transition-colors cursor-pointer"
              title="Nhấp để sao chép mã định danh triện tác phẩm"
            >
              <span className="font-mono text-[10px] uppercase text-muted">Triện mã định danh</span>
              <span className="font-mono text-xs font-semibold text-accent mt-0.5">GU-DAMASCENE-GUAN-2026-X</span>
              <span className="text-[10px] text-accent-soft mt-1">{isCopiedCode ? 'Đã sao chép triện' : 'Chạm để sao chép'}</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left 7 Cols: Microscopic Inspection Canvas */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl group">
              <motion.div
                animate={{ rotateY: rotationAngle }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                className="relative h-full w-full"
              >
                <Image
                  src="/media/kham-go-soi/15-1600.webp"
                  alt="Tượng Quan Công Mun Sừng nạm chỉ vàng 24K Damascene GuHomes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-editorial"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />

                {/* Interactive Inspection Reticle Markers */}
                {INSPECTION_POINTS.map((pt) => {
                  const isSelected = pt.id === selectedPointId
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setSelectedPointId(pt.id)}
                      style={{ top: `${pt.coordinates.y}%`, left: `${pt.coordinates.x}%` }}
                      className={cn(
                        'absolute -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 group/marker',
                        isSelected
                          ? 'border-2 border-accent bg-accent/30 scale-125 shadow-[0_0_20px_rgba(197,168,128,0.8)]'
                          : 'border border-canvas/70 bg-espresso/60 hover:scale-110',
                      )}
                      title={pt.title}
                    >
                      <span className={cn('h-2.5 w-2.5 rounded-full', isSelected ? 'bg-accent animate-ping' : 'bg-canvas')} />
                    </button>
                  )
                })}
              </motion.div>

              {/* Angle & Magnification Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
                <div className="flex flex-col gap-0.5 text-canvas">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-accent-soft">
                    Điểm soi hiển vi đang kích hoạt:
                  </span>
                  <span className="font-display text-lg text-canvas">{currentPoint.title}</span>
                </div>
                <div className="rounded-lg bg-espresso/85 border border-accent/40 px-3 py-1.5 backdrop-blur-md">
                  <span className="font-mono text-xs text-accent font-semibold">{currentPoint.magnification}</span>
                </div>
              </div>
            </div>

            {/* 360 Viewing Slider & Inspection Points Dock */}
            <div className="p-5 rounded-xl border border-line bg-surface/70 flex flex-col gap-4 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-muted">
                  Xoay Góc Quan Sát Tượng 360 Độ:
                </span>
                <span className="font-mono text-xs text-accent">{rotationAngle}° Góc nhìn</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                value={rotationAngle}
                onChange={(e) => setRotationAngle(parseInt(e.target.value, 10))}
                className="w-full accent-accent h-1.5 bg-line rounded-lg cursor-pointer"
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-line/60">
                {INSPECTION_POINTS.map((pt) => {
                  const isSelected = pt.id === selectedPointId
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      onClick={() => setSelectedPointId(pt.id)}
                      className={cn(
                        'p-2.5 rounded-lg border text-left flex flex-col transition-all cursor-pointer min-h-[48px]',
                        isSelected
                          ? 'border-accent bg-canvas shadow-xs'
                          : 'border-line/70 bg-canvas/30 hover:border-accent/40 text-muted',
                      )}
                    >
                      <span className="font-body text-xs font-semibold text-ink truncate">{pt.zone}</span>
                      <span className="text-[10px] font-mono text-accent mt-0.5">{pt.magnification}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Deep Craftsmanship Dossier */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-accent">
                <span>● KIỆT TÁC ĐỘC BẢN PHÒNG KHÁCH & PHÒNG LÀM VIỆC</span>
                <span>·</span>
                <span>CAO 88CM</span>
              </div>
              <h4 className="font-display text-2xl text-ink">
                Hồ Sơ Kỹ Thuật Đúc Mộc & Nạm Kim
              </h4>
              <p className="font-body text-xs sm:text-sm text-ink/75 leading-relaxed">
                Mun sừng Khánh Hòa là loại gỗ quý nhóm 1 có thớ mịn đen tuyền như đá hóa thạch, không có tom gỗ và chìm dưới đáy nước. Việc nạm vàng Damascene lên mun sừng đòi hỏi mũi dao khắc bằng thép vonfram và hơn 180 giờ làm việc tỉ mỉ của nghệ nhân cả đời nghề.
              </p>
            </div>

            {/* Magnified Point Details Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPoint.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-2xl border border-accent/40 bg-espresso text-canvas flex flex-col gap-4 shadow-xl"
              >
                <div className="flex items-center justify-between border-b border-canvas/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-soft">{currentPoint.zone}</span>
                  </div>
                  <span className="font-mono text-xs text-accent font-semibold">{currentPoint.magnification}</span>
                </div>

                <h5 className="font-display text-xl text-canvas">
                  {currentPoint.title}
                </h5>

                <p className="font-body text-xs sm:text-sm text-canvas/80 leading-relaxed">
                  {currentPoint.description}
                </p>

                <div className="p-3.5 rounded-xl bg-canvas/10 border border-accent/30 text-xs text-accent-soft flex items-start gap-2.5">
                  <CheckIcon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <span>{currentPoint.craftsmanshipDetail}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Physical Attributes Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-lg border border-line bg-surface/60 flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Trọng lượng tượng</span>
                <span className="font-body text-xs font-semibold text-ink">46.8 kg (Gỗ đặc chìm nước)</span>
              </div>
              <div className="p-3.5 rounded-lg border border-line bg-surface/60 flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Vàng ròng 24K nạm</span>
                <span className="font-body text-xs font-semibold text-accent">1.25 Lượng vàng 9999</span>
              </div>
              <div className="p-3.5 rounded-lg border border-line bg-surface/60 flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Độ ẩm bảo quản</span>
                <span className="font-body text-xs font-semibold text-ink">50% - 55% RH vi khí hậu</span>
              </div>
              <div className="p-3.5 rounded-lg border border-line bg-surface/60 flex flex-col gap-1">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">Bảo hành mộng & vàng</span>
                <span className="font-body text-xs font-semibold text-accent">Vĩnh viễn trọn đời</span>
              </div>
            </div>

            {/* CTA Action Row */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => openQuoteModal('modern-luxury')}
                className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-full bg-espresso hover:bg-ink text-canvas font-medium text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-md cursor-pointer border border-accent/40"
              >
                <span>Đăng Ký Chiêm Ngưỡng Tác Phẩm</span>
                <ArrowUpRightIcon className="text-base text-accent" />
              </button>

              <Link
                href="/contact"
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full border border-line hover:border-accent hover:bg-canvas text-ink text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Hẹn Lịch Đến Xưởng Thạnh Xuân</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
