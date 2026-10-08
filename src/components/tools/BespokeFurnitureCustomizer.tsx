'use client'

import { useState, useId, useTransition } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'

export type FurnitureArchetypeId = 'dining-table' | 'lounge-chair' | 'coffee-table'

export type EdgeProfile = 'live-edge' | 'chamfer-45' | 'bullnose'

export type JoinerySystem = 'butterfly-inlay' | 'hand-cut-dovetail' | 'mortise-tenon'

export type FinishOil = 'osmo-matte' | 'osmo-raw' | 'organic-beeswax'

interface FurnitureArchetype {
  id: FurnitureArchetypeId
  nameVi: string
  subtitleVi: string
  tagVi: string
  basePriceVnd: number
  baseArtisanHours: number
  baseWeightKg: number
  dimensionsVi: string
  materialsVi: string
  descriptionVi: string
  icon: string
  sizeOptions: {
    label: string
    multiplier: number
    dimensionText: string
  }[]
}

const FURNITURE_ARCHETYPES: Record<FurnitureArchetypeId, FurnitureArchetype> = {
  'dining-table': {
    id: 'dining-table',
    nameVi: 'Bàn Ăn Nguyên Tấm Solid FAS Walnut',
    subtitleVi: 'Master Dining Table · Gỗ Óc Chó Dày 50mm',
    tagVi: 'Trái Tim Phòng Ăn · Mộng Bướm Gỗ Mun',
    basePriceVnd: 68000000,
    baseArtisanHours: 48,
    baseWeightKg: 105,
    dimensionsVi: '2.4m x 0.95m x 0.75m (Dày 50mm)',
    materialsVi: 'Gỗ Óc Chó Bắc Mỹ FAS tuyển chọn 100%, sấy chân không EMC 11%',
    descriptionVi:
      'Tạo tác từ hai phiến gỗ óc chó tự nhiên tuyển vân đối xứng (Bookmatched). Bề mặt được chà nhám tay 6 cấp độ từ P80 đến P800, lưu giữ trọn vẹn những đường vân cuộn sóng và mắt gỗ tự nhiên.',
    icon: '🪵',
    sizeOptions: [
      { label: 'Cỡ Vừa (2.2m · 6-8 người)', multiplier: 0.9, dimensionText: '2200 x 900 x 750 mm' },
      { label: 'Chuẩn VIP (2.6m · 8-10 người)', multiplier: 1.0, dimensionText: '2600 x 950 x 750 mm' },
      { label: 'Đại Dinh Thự (3.0m · 10-12 người)', multiplier: 1.25, dimensionText: '3000 x 1000 x 750 mm' },
    ],
  },
  'lounge-chair': {
    id: 'lounge-chair',
    nameVi: 'Ghế Thư Giãn Lounge Gỗ Teak & Da Tuscany',
    subtitleVi: 'Ergonomic Sanctuary Lounge · Góc Tựa 105°',
    tagVi: 'Công Thái Học · Khâu Tay Thủ Công',
    basePriceVnd: 38000000,
    baseArtisanHours: 36,
    baseWeightKg: 28,
    dimensionsVi: '0.85m x 0.90m x 0.78m (Kèm đôn gác chân)',
    materialsVi: 'Khung gỗ Teak tự nhiên + Đệm mút D40 bọc Da bò thuộc thảo mộc Tuscany Ý',
    descriptionVi:
      'Góc nghiêng 105° được KTS GuHomes nghiên cứu riêng theo nhân trắc học người Việt, nâng đỡ trọn vẹn đốt sống lưng và cổ. Da thuộc thảo mộc tự nhiên càng ngồi càng mềm mượt và bóng ấm.',
    icon: '🛋️',
    sizeOptions: [
      { label: 'Ghế Đơn Tiêu Chuẩn', multiplier: 0.85, dimensionText: '850 x 850 x 780 mm' },
      { label: 'Bộ Ghế Lounge + Đôn Gác Chân', multiplier: 1.0, dimensionText: '850 x 900 x 780 mm + Đôn' },
      { label: 'Phiên Bản Bành Rộng Grand', multiplier: 1.2, dimensionText: '950 x 950 x 820 mm + Đôn' },
    ],
  },
  'coffee-table': {
    id: 'coffee-table',
    nameVi: 'Bàn Trà Khối Đá Travertine Navona & Chân Sồi',
    subtitleVi: 'Monolith Travertine Table · Khối Đá Tự Nhiên Ý',
    tagVi: 'Điêu Khắc Tĩnh Lặng · Đá Khoáng Ý',
    basePriceVnd: 42000000,
    baseArtisanHours: 42,
    baseWeightKg: 85,
    dimensionsVi: '1.3m x 0.8m x 0.38m',
    materialsVi: 'Phiến đá Travertine Navona Ý dày 30mm + Khung chân gỗ sồi xẻ tư',
    descriptionVi:
      'Sự hòa quyện giữa chất mộc của sồi trắng và bề mặt rỗ khoáng trầm tích của đá Travertine vùng Tivoli nước Ý. Toàn bộ bề mặt đá được thẩm thấu lớp bảo vệ nano gốc nước cản ố trà và cà phê.',
    icon: '🏛️',
    sizeOptions: [
      { label: 'Bàn Trà Vuông Nhỏ (1.0m)', multiplier: 0.85, dimensionText: '1000 x 1000 x 380 mm' },
      { label: 'Bàn Trà Chữ Nhật Chuẩn (1.3m)', multiplier: 1.0, dimensionText: '1300 x 800 x 380 mm' },
      { label: 'Bộ Bàn Trà Đôi Lồng Cặp', multiplier: 1.3, dimensionText: 'Bàn lớn 1300 + Bàn tròn phụ 600' },
    ],
  },
}

export function BespokeFurnitureCustomizer({ className }: { className?: string }) {
  const [selectedPieceId, setSelectedPieceId] = useState<FurnitureArchetypeId>('dining-table')
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(1)
  const [selectedEdge, setSelectedEdge] = useState<EdgeProfile>('live-edge')
  const [selectedJoinery, setSelectedJoinery] = useState<JoinerySystem>('butterfly-inlay')
  const [selectedFinish, setSelectedFinish] = useState<FinishOil>('osmo-matte')

  // Booking state
  const [clientName, setClientName] = useState<string>('')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [bespokeCode, setBespokeCode] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const piece = FURNITURE_ARCHETYPES[selectedPieceId] ?? FURNITURE_ARCHETYPES['dining-table']
  const size = piece.sizeOptions[selectedSizeIndex] ?? piece.sizeOptions[0]!

  // Dynamic calculations
  const finalPriceVnd = Math.round(piece.basePriceVnd * size.multiplier)
  const totalHours = Math.round(piece.baseArtisanHours * size.multiplier)
  const totalWeight = Math.round(piece.baseWeightKg * size.multiplier)

  const handleOrder = () => {
    if (!clientName.trim() || !clientPhone.trim()) {
      toast({
        title: 'Vui lòng nhập Họ tên và Số điện thoại',
        description: 'Để xưởng mộc Thạnh Xuân liên hệ xác nhận bản vẽ chế tác.',
        tone: 'error',
      })
      return
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const generatedCode = `GU-BESPOKE-2026-${randomNum}`
    setBespokeCode(generatedCode)
    setIsSubmitted(true)
    toast({
      title: `Đã xác lập mã chế tác ${generatedCode}!`,
      description: 'Nghệ nhân xưởng mộc GuHomes sẽ liên hệ gửi bản vẽ 3D chi tiết.',
      tone: 'success',
    })
  }

  const formatVnd = (num: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num)
  }

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Xưởng Chế Tác Đồ Rời Thửa Riêng · GuHomes Bespoke Atelier
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                100% Solid Timber &amp; Handcraft
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Tùy Biến Đồ Mộc May Đo Độc Bản
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Khác với đồ nội thất sản xuất hàng loạt từ gỗ dán công nghiệp, mỗi tác phẩm đồ rời tại GuHomes được người nghệ nhân Thạnh Xuân đục đẽo thủ công theo đúng nhân trắc học và sở thích xúc giác của riêng bạn.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Mộc nguyên khối bảo hành trọn đời</span>
          </div>
        </div>

        {/* 3 Iconic Pieces Selector */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {(Object.keys(FURNITURE_ARCHETYPES) as FurnitureArchetypeId[]).map((id) => {
            const p = FURNITURE_ARCHETYPES[id]
            const isSelected = selectedPieceId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setSelectedPieceId(id)
                  setSelectedSizeIndex(1)
                }}
                className={cn(
                  'p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-canvas shadow-md ring-1 ring-accent/40'
                    : 'border-line bg-surface hover:bg-canvas/60 hover:border-line-dark'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-accent">{p.tagVi}</span>
                    <span className="text-2xl">{p.icon}</span>
                  </div>
                  <h3 className="font-serif text-base font-medium text-ink mt-2">{p.nameVi}</h3>
                </div>
                <p className="text-xs text-muted mt-2 font-light line-clamp-2 leading-relaxed">{p.descriptionVi}</p>
                <div className="mt-4 pt-3 border-t border-line/60 flex justify-between items-center text-xs font-mono">
                  <span className="text-muted">Giá từ:</span>
                  <span className="text-ink font-semibold">{formatVnd(p.basePriceVnd * 0.9)}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Customizer Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Customization Controls */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Tùy Biến Chi Tiết Chế Tác Thủ Công</span>
                <span className="text-accent font-semibold">{piece.subtitleVi}</span>
              </div>

              <div className="mt-6 space-y-6">
                {/* 1. Size & Dimension */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-ink block mb-2 font-semibold">
                    1. Kích Thước May Đo:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {piece.sizeOptions.map((opt, idx) => (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setSelectedSizeIndex(idx)}
                        className={cn(
                          'p-3 rounded-xl border text-left transition-all',
                          selectedSizeIndex === idx
                            ? 'border-accent bg-surface ring-1 ring-accent/30 shadow-sm'
                            : 'border-line/60 bg-canvas hover:border-line-dark'
                        )}
                      >
                        <p className="text-xs font-mono font-medium text-ink">{opt.label}</p>
                        <p className="text-[10px] font-mono text-muted mt-1">{opt.dimensionText}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Edge Profile */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-ink block mb-2 font-semibold">
                    2. Cạnh Biên Hoàn Thiện (Edge Profile):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'live-edge', label: 'Cạnh Uốn Live Edge', sub: 'Mộc mạc theo thân cây tự nhiên' },
                      { id: 'chamfer-45', label: 'Vát Cạnh 45° Chamfer', sub: 'Thanh thoát, hiện đại tối giản' },
                      { id: 'bullnose', label: 'Bo Tròn Bullnose', sub: 'Mềm mại an toàn cho trẻ nhỏ' },
                    ].map((edge) => (
                      <button
                        key={edge.id}
                        type="button"
                        onClick={() => setSelectedEdge(edge.id as EdgeProfile)}
                        className={cn(
                          'p-3 rounded-xl border text-left transition-all',
                          selectedEdge === edge.id
                            ? 'border-accent bg-surface ring-1 ring-accent/30 shadow-sm'
                            : 'border-line/60 bg-canvas hover:border-line-dark'
                        )}
                      >
                        <p className="text-xs font-mono font-medium text-ink">{edge.label}</p>
                        <p className="text-[10px] font-mono text-muted mt-1">{edge.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Joinery System */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-ink block mb-2 font-semibold">
                    3. Kỹ Thuật Mộng Cơ Khí (Joinery Method):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'butterfly-inlay', label: 'Mộng Bướm Gỗ Mun (Inlay)', sub: 'Khóa nứt tự nhiên chịu lực 3.5kN' },
                      { id: 'hand-cut-dovetail', label: 'Mộng Đuôi Én Đục Tay', sub: 'Đặc trưng mộc truyền thống 4.8kN' },
                      { id: 'mortise-tenon', label: 'Mộng Âm Dương Khóa Chốt', sub: 'Khung mộng giấu kín chịu tải 8.2kN' },
                    ].map((j) => (
                      <button
                        key={j.id}
                        type="button"
                        onClick={() => setSelectedJoinery(j.id as JoinerySystem)}
                        className={cn(
                          'p-3 rounded-xl border text-left transition-all',
                          selectedJoinery === j.id
                            ? 'border-accent bg-surface ring-1 ring-accent/30 shadow-sm'
                            : 'border-line/60 bg-canvas hover:border-line-dark'
                        )}
                      >
                        <p className="text-xs font-mono font-medium text-ink">{j.label}</p>
                        <p className="text-[10px] font-mono text-muted mt-1">{j.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Finish Oil */}
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-ink block mb-2 font-semibold">
                    4. Dầu Bảo Vệ Bề Mặt (Surface Protection):
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'osmo-matte', label: 'Osmo Polyx-Oil Đức Mờ (3032)', sub: 'Kháng nước, giữ ấm vân tự nhiên' },
                      { id: 'osmo-raw', label: 'Osmo Natural Raw (3044)', sub: 'Cảm giác gỗ mộc như chưa hề sơn' },
                      { id: 'organic-beeswax', label: 'Sáp Ong Hữu Cơ Truyền Thống', sub: 'Thơm thảo mộc, tự dưỡng patina' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setSelectedFinish(f.id as FinishOil)}
                        className={cn(
                          'p-3 rounded-xl border text-left transition-all',
                          selectedFinish === f.id
                            ? 'border-accent bg-surface ring-1 ring-accent/30 shadow-sm'
                            : 'border-line/60 bg-canvas hover:border-line-dark'
                        )}
                      >
                        <p className="text-xs font-mono font-medium text-ink">{f.label}</p>
                        <p className="text-[10px] font-mono text-muted mt-1">{f.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Price, Artisan Specs & Order Form */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* Live Pricing & Artisan Metrics Card */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Bóc Tách Chi Phí Chế Tác
              </span>
              <div className="mt-3 flex items-baseline justify-between border-b border-line pb-4">
                <span className="text-3xl font-serif text-ink font-light">
                  {formatVnd(finalPriceVnd)}
                </span>
                <span className="text-xs font-mono text-muted">Đã bao gồm VAT &amp; Lắp đặt</span>
              </div>

              {/* Specs Summary Grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-2xl bg-surface border border-line">
                  <span className="text-muted block text-[10px]">Giờ công nghệ nhân:</span>
                  <span className="text-base font-serif text-accent mt-0.5 block">{totalHours} Giờ</span>
                  <span className="text-[9px] text-muted/70">Chà nhám P80–P800</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-line">
                  <span className="text-muted block text-[10px]">Khối lượng phôi đặc:</span>
                  <span className="text-base font-serif text-ink mt-0.5 block">~{totalWeight} kg</span>
                  <span className="text-[9px] text-muted/70">Gỗ mộc nguyên khối</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-line">
                  <span className="text-muted block text-[10px]">Kích thước:</span>
                  <span className="text-xs text-ink mt-1 block truncate">{size.dimensionText}</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface border border-line">
                  <span className="text-muted block text-[10px]">Tiêu chuẩn sấy:</span>
                  <span className="text-xs text-accent mt-1 block">EMC 10–12%</span>
                </div>
              </div>

              {/* Order / Consultation Box */}
              <div className="mt-6 pt-6 border-t border-line">
                {!isSubmitted ? (
                  <div className="space-y-4">
                    <p className="text-xs font-mono text-muted">
                      Đăng ký giữ phôi gỗ và nhận bản vẽ 3D chi tiết từ xưởng mộc Thạnh Xuân:
                    </p>

                    <div className="space-y-2">
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Họ và tên quý khách *"
                        className="w-full px-4 py-2.5 rounded-xl border border-line bg-surface text-xs font-mono text-ink focus:border-accent focus:outline-none"
                      />
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Số điện thoại / Zalo *"
                        className="w-full px-4 py-2.5 rounded-xl border border-line bg-surface text-xs font-mono text-ink focus:border-accent focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleOrder}
                      className="w-full py-3.5 px-6 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Đăng ký chế tác thửa riêng</span>
                      <ArrowUpRightIcon className="text-sm" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-surface border border-accent/40 text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-mono">
                      <CheckIcon className="text-xs" />
                      <span>Đã xác lập cấu hình</span>
                    </div>
                    <p className="text-xs font-mono text-muted mt-2">Mã cấu hình độc bản:</p>
                    <p className="text-lg font-mono text-accent font-semibold mt-0.5">{bespokeCode}</p>
                    <p className="text-[11px] text-muted font-light mt-2 leading-relaxed">
                      Nghệ nhân xưởng mộc GuHomes sẽ liên hệ gửi mẫu phôi gỗ thực tế tới bạn trong 24 giờ.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Woodshop Guarantee Note */}
            <div className="p-6 rounded-3xl bg-surface border border-line text-xs font-mono text-muted leading-relaxed">
              <span className="text-ink font-semibold block mb-1">Cam Kết Từ Nghệ Nhân GuHomes:</span>
              <p className="font-light">
                Mỗi sản phẩm đều được đóng triện số seri độc bản, cấp phiếu bảo hành mộng gỗ trọn đời và hỗ trợ dưỡng dầu Osmo định kỳ miễn phí tại tư gia của bạn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
