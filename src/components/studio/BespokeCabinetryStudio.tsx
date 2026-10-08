'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type CabinetrySystemId = 'walk-in-wardrobe' | 'chef-island' | 'wine-cigar-vault'

interface CabinetryDetail {
  id: CabinetrySystemId
  code: string
  name: string
  nameEn: string
  subtitle: string
  idealSpace: string
  materials: {
    label: string
    spec: string
  }[]
  hardware: {
    brand: string
    item: string
    cycleLife: string
  }[]
  craftsmanshipInsight: string
  dimensions: string
  svgGraphic: 'wardrobe' | 'island' | 'vault'
}

const CABINETRY_SYSTEMS: CabinetryDetail[] = [
  {
    id: 'walk-in-wardrobe',
    code: 'CAB-01 / MASTER WARDROBE',
    name: 'Hệ Tủ Áo Master Walk-in Wardrobe Quiet Luxury',
    nameEn: 'Bespoke Master Walk-in Wardrobe',
    subtitle: 'Khung nhôm Anode Champagne xước mờ · Kính xám khói Ultra-Clear 8mm',
    idealSpace: 'Phòng ngủ Master Suite Penthouse & Biệt thự đơn lập',
    materials: [
      { label: 'Khung cánh & Tay nắm', spec: 'Nhôm định hình Anodized màu Champagne xước satin mờ' },
      { label: 'Cánh kính chịu lực', spec: 'Kính xám khói Ultra-Clear 8mm tôi nhiệt chống vỡ' },
      { label: 'Thùng tủ nội thất', spec: 'Gỗ Óc Chó FAS ghép vân thẳng, phủ dầu Osmo Đức 0% VOC' },
      { label: 'Ngăn kéo trang sức', spec: 'Bọc da bò thảo mộc thủ công chia ô Patek Philippe & Hermes' },
      { label: 'Ánh sáng cảm biến', spec: 'LED rãnh âm Warm Dim 2400K CRI 98 tiệm cận không chạm' },
    ],
    hardware: [
      { brand: 'Blum (Áo)', item: 'Ray trượt âm Tandembox Tip-on Blumotion', cycleLife: '100.000 lần đóng mở' },
      { brand: 'Hafele (Đức)', item: 'Hệ bản lề giấu cánh trục xoay chịu tải 35kg/cánh', cycleLife: 'Bảo hành 5 năm' },
      { brand: 'GuHomes Woodshop', item: 'Thùng tủ mộc mộng âm dương không đinh sắt', cycleLife: 'Vĩnh cửu' },
    ],
    craftsmanshipInsight:
      'Tủ áo Quiet Luxury không dùng đèn chiếu chói lòa mà sử dụng dải sáng Warm Dim 2400K ẩn sâu trong khe thanh treo. Khi bạn bước tới, ánh sáng tự động ửng lên nhẹ nhàng như bình minh, tôn vinh sắc thái trang phục và chất da bò tự nhiên.',
    dimensions: 'Cao 2.800 – 3.200 mm · Sâu 620 mm · May đo kịch trần',
    svgGraphic: 'wardrobe',
  },
  {
    id: 'chef-island',
    code: 'CAB-02 / CHEF ISLAND & BAR',
    name: 'Hệ Đảo Bếp Master Chef Kitchen & Quầy Bar Gia Đình',
    nameEn: 'Monolithic Travertine & Walnut Island',
    subtitle: 'Đá Travertine xẻ mộc thở tự nhiên · Cánh gỗ Óc Chó ghép vân Bookmatched',
    idealSpace: 'Không gian mở liên hoàn Bếp – Ăn – Khách view panorama sông',
    materials: [
      { label: 'Mặt bàn & Chân vách', spec: 'Đá Roman Travertine Ý nguyên khối xử lý nano thở tự nhiên' },
      { label: 'Mặt cánh tủ bếp', spec: 'Gỗ Óc Chó FAS ghép đối xứng Bookmatched vân cuộn liên tục' },
      { label: 'Khoang tủ đồ khô & gia vị', spec: 'Inox 304 xước mờ kháng ẩm muối vi khí hậu ven sông Sài Gòn' },
      { label: 'Chậu rửa tích hợp', spec: 'Đá đúc nguyên khối âm mặt bàn chống đọng nước góc cạnh' },
      { label: 'Hệ thống hút mùi', spec: 'Bếp từ tích hợp hút mùi âm mặt kính Bora CHLB Đức' },
    ],
    hardware: [
      { brand: 'Blum (Áo)', item: 'Tay nâng điện Servo-Drive mở bằng một cú chạm khuỷu tay', cycleLife: '200.000 lần đóng mở' },
      { brand: 'Kesseböhmer (Đức)', item: 'Giá xoay góc thông minh LeMans chịu tải 25kg/tầng', cycleLife: 'Chống rỉ sét' },
      { brand: 'GuHomes Woodshop', item: 'Bo cong góc công thái học R150mm chống va đập trẻ nhỏ', cycleLife: 'Bảo hành 5 năm' },
    ],
    craftsmanshipInsight:
      'Điểm khó nhất của đảo bếp gỗ óc chó là ghép vân Bookmatched liên tục qua 6 cánh tủ và 4 ngăn kéo: khi đóng lại, toàn bộ mặt đảo bếp hiện lên như một bức tranh thủy mặc của tự nhiên, không một vết đứt đoạn vân gỗ.',
    dimensions: 'Dài 3.600 – 4.200 mm · Rộng 1.100 mm · Cao 880 mm',
    svgGraphic: 'island',
  },
  {
    id: 'wine-cigar-vault',
    code: 'CAB-03 / CLIMATE WINE VAULT',
    name: 'Hệ Tủ Rượu Vang & Hộp Bảo Quản Cigar Vi Khí Hậu',
    nameEn: 'Climate-Controlled Wine & Cigar Vault',
    subtitle: 'Gỗ Tuyết Tùng Tây Ban Nha · Kính hộp 3 lớp Low-E bơm khí Argon chống đọng sương',
    idealSpace: 'Góc thưởng rượu phòng khách Penthouse & Hầm rượu gia đình',
    materials: [
      { label: 'Lót lòng thùng cigar', spec: 'Gỗ Tuyết Tùng Tây Ban Nha (Spanish Cedar) giữ ẩm tự nhiên' },
      { label: 'Khay xếp chai vang', spec: 'Gỗ Sồi xẻ rãnh nghiêng 15° giữ nút bần luôn ẩm ướt' },
      { label: 'Cửa kính tủ rượu', spec: 'Kính hộp 3 lớp Low-E 28mm bơm Argon chống đọng sương 100%' },
      { label: 'Hệ thống máy nén', spec: 'Máy nén biến tần Inverter siêu êm, độ ồn < 30dB không rung lắc' },
      { label: 'Vi khí hậu bảo quản', spec: 'Rượu: 16°C – 18°C · Cigar: 68% – 72% độ ẩm tự động bù nước' },
    ],
    hardware: [
      { brand: 'Embraco (Ý)', item: 'Cụm máy nén lạnh chống rung bảo toàn cấu trúc vang quý', cycleLife: 'Bảo hành 5 năm' },
      { brand: 'Carel (Ý)', item: 'Cảm biến vi khí hậu kỹ thuật số cảnh báo độ ẩm qua điện thoại', cycleLife: 'Sai số ± 1%' },
      { brand: 'GuHomes Woodshop', item: 'Cánh cửa mộc nguyên khối chốt nam châm kín khí đôi', cycleLife: 'Chống thất thoát nhiệt' },
    ],
    craftsmanshipInsight:
      'Gỗ Tuyết Tùng Tây Ban Nha có khả năng hấp thụ và nhả ẩm tự nhiên, đồng thời tỏa ra mùi hương dịu nhẹ xua đuổi mọt cigar. Đó là vật liệu thiêng liêng của giới thưởng lãm cigar thế giới mà GuHomes nhập khẩu nguyên kiện.',
    dimensions: 'Rộng 1.800 – 2.400 mm · Sâu 700 mm · Cao 2.600 mm',
    svgGraphic: 'vault',
  },
]

const DEFAULT_SYSTEM = CABINETRY_SYSTEMS[0] as CabinetryDetail

export function BespokeCabinetryStudio({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState<CabinetrySystemId>('walk-in-wardrobe')

  const current: CabinetryDetail = CABINETRY_SYSTEMS.find((s) => s.id === selectedId) ?? DEFAULT_SYSTEM

  return (
    <section className={cn('relative bg-canvas py-16 sm:py-24 border-y border-line overflow-hidden', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Bespoke Cabinetry &amp; Millwork</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ink mt-3 tracking-tight">
              Bộ Sưu Tập Tủ Mộc Thửa Riêng
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-[64ch] mt-3 font-light leading-relaxed">
              Mỗi mét tủ mộc tại GuHomes là sự kết hợp chuẩn xác giữa cơ khí phụ kiện đỉnh cao Châu Âu và bàn tay mộng mộc truyền thống của xưởng Thạnh Xuân 1.200m². Không sản xuất hàng loạt, chỉ thửa riêng cho từng nếp nhà.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted">TIÊU CHUẨN XƯỞNG THẠNH XUÂN:</span>
            <span className="text-xs font-mono font-semibold text-accent px-3 py-1 rounded-full bg-surface border border-line">
              100% Ray Blum &amp; Mộng Gỗ
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {CABINETRY_SYSTEMS.map((item, index) => {
            const isSelected = item.id === selectedId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  'p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden',
                  isSelected
                    ? 'border-accent bg-surface shadow-xl ring-1 ring-accent'
                    : 'border-line bg-surface/50 hover:bg-surface hover:border-line-strong'
                )}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
                  <span className={isSelected ? 'text-accent font-semibold' : ''}>{item.code}</span>
                  <span>0{index + 1} / 03</span>
                </div>
                <h3 className={cn('font-serif text-base sm:text-lg font-medium transition-colors', isSelected ? 'text-accent' : 'text-ink')}>
                  {item.name}
                </h3>
                <p className="text-xs text-muted font-light mt-1.5 line-clamp-1">{item.nameEn}</p>
              </button>
            )
          })}
        </div>

        {/* Detail Showcase */}
        <div className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Isometric Cabinetry Schematic Rendering (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl border border-line bg-[#1B1917] text-[#F3F1EC] p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Blueprint grid lines */}
                <div
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Header tag */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5 text-[10px] font-mono text-white/60">
                  <span>THỬA RIÊNG XƯỞNG THẠNH XUÂN</span>
                  <span className="text-accent">{current.code}</span>
                </div>

                {/* Vector Silhouette Illustration */}
                <div className="relative z-10 flex-1 flex items-center justify-center p-3">
                  {current.svgGraphic === 'wardrobe' && (
                    <svg viewBox="0 0 280 200" className="w-full h-full text-accent" fill="none" stroke="currentColor">
                      {/* Wardrobe Outer Frame */}
                      <rect x="30" y="20" width="220" height="160" stroke="#FFF" strokeWidth="2" rx="4" />
                      {/* 3 Glass Doors */}
                      <line x1="103" y1="20" x2="103" y2="180" stroke="#666" strokeWidth="1.5" />
                      <line x1="176" y1="20" x2="176" y2="180" stroke="#666" strokeWidth="1.5" />
                      {/* Hanging Rail with warm glow */}
                      <line x1="40" y1="55" x2="240" y2="55" stroke="#FFD2A0" strokeWidth="3" />
                      <line x1="40" y1="56" x2="240" y2="56" stroke="#FFAE66" strokeWidth="8" opacity="0.3" />
                      {/* Leather Drawer Stack */}
                      <rect x="40" y="125" width="55" height="15" fill="rgba(197,160,89,0.3)" stroke="#C5A059" strokeWidth="1" />
                      <rect x="40" y="143" width="55" height="15" fill="rgba(197,160,89,0.3)" stroke="#C5A059" strokeWidth="1" />
                      <rect x="40" y="161" width="55" height="15" fill="rgba(197,160,89,0.3)" stroke="#C5A059" strokeWidth="1" />
                      {/* Champagne Trim Stamp */}
                      <text x="110" y="105" fill="#FFD2A0" fontSize="8" fontFamily="monospace">KÍNH XÁM KHÓI 8MM</text>
                      <text x="110" y="120" fill="#AAA" fontSize="7" fontFamily="monospace">LED WARM DIM 2400K</text>
                    </svg>
                  )}

                  {current.svgGraphic === 'island' && (
                    <svg viewBox="0 0 280 200" className="w-full h-full text-accent" fill="none" stroke="currentColor">
                      {/* Travertine Stone Top with Radius */}
                      <rect x="25" y="40" width="230" height="24" rx="10" fill="rgba(215,190,150,0.35)" stroke="#E5C17B" strokeWidth="2" />
                      <text x="70" y="56" fill="#FFF" fontSize="9" fontFamily="monospace">ĐÁ TRAVERTINE Ý NGUYÊN KHỐI</text>
                      {/* Bookmatched Walnut Cabinet Base */}
                      <rect x="40" y="64" width="200" height="100" fill="rgba(180,120,70,0.3)" stroke="#8C6239" strokeWidth="1.5" />
                      {/* Vertical grain lines */}
                      <line x1="90" y1="64" x2="90" y2="164" stroke="#FFF" strokeWidth="1" strokeDasharray="3 2" />
                      <line x1="140" y1="64" x2="140" y2="164" stroke="#E5C17B" strokeWidth="1.5" />
                      <line x1="190" y1="64" x2="190" y2="164" stroke="#FFF" strokeWidth="1" strokeDasharray="3 2" />
                      <text x="65" y="115" fill="#E5C17B" fontSize="8" fontFamily="monospace">GỖ ÓC CHÓ BOOKMATCHED</text>
                      {/* Ergonomic Radius R150 indicator */}
                      <path d="M 235,50 Q 245,64 235,78" stroke="#5EEAD4" strokeWidth="2" />
                      <text x="195" y="150" fill="#5EEAD4" fontSize="7" fontFamily="monospace">BO CONG R150MM</text>
                    </svg>
                  )}

                  {current.svgGraphic === 'vault' && (
                    <svg viewBox="0 0 280 200" className="w-full h-full text-accent" fill="none" stroke="currentColor">
                      {/* Vault Enclosure */}
                      <rect x="40" y="20" width="200" height="160" stroke="#FFF" strokeWidth="2" rx="4" />
                      {/* Inverter Chiller Top Unit */}
                      <rect x="50" y="30" width="180" height="25" fill="#222" stroke="#555" strokeWidth="1" />
                      <text x="60" y="46" fill="#5EEAD4" fontSize="8" fontFamily="monospace">INVERTER 16°C · 70% HUMIDITY</text>
                      {/* Spanish Cedar Racks */}
                      <line x1="50" y1="80" x2="230" y2="80" stroke="#E5C17B" strokeWidth="2" />
                      <line x1="50" y1="110" x2="230" y2="110" stroke="#E5C17B" strokeWidth="2" />
                      <line x1="50" y1="140" x2="230" y2="140" stroke="#E5C17B" strokeWidth="2" />
                      {/* Wine bottles angled */}
                      <rect x="65" y="65" width="25" height="12" rx="3" fill="#600" stroke="#E5C17B" transform="rotate(-15 65 65)" />
                      <rect x="110" y="65" width="25" height="12" rx="3" fill="#600" stroke="#E5C17B" transform="rotate(-15 110 65)" />
                      <rect x="155" y="65" width="25" height="12" rx="3" fill="#600" stroke="#E5C17B" transform="rotate(-15 155 65)" />
                      <text x="60" y="165" fill="#FFD2A0" fontSize="8" fontFamily="monospace">GỖ TUYẾT TÙNG TÂY BAN NHA</text>
                    </svg>
                  )}
                </div>

                {/* Dimensions footer */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-white/50">
                  <span>KÍCH THƯỚC: {current.dimensions.split('·')[0]}</span>
                  <span>ĐỘ CHÍNH XÁC: ± 0.5mm</span>
                </div>
              </div>
            </div>

            {/* Right: Specifications & Craftsmanship (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  {current.idealSpace}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ink font-light mt-1">
                  {current.name}
                </h3>
                <p className="text-xs sm:text-sm text-accent font-medium mt-1">
                  {current.subtitle}
                </p>
              </div>

              {/* Material Spec Table */}
              <div className="rounded-2xl border border-line bg-canvas p-5">
                <span className="text-xs font-mono text-muted uppercase tracking-wider block mb-3">
                  Danh Mục Vật Liệu Xúc Giác:
                </span>
                <div className="space-y-2.5">
                  {current.materials.map((m, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-4 text-xs">
                      <span className="text-muted font-mono shrink-0 w-36 sm:w-44">{m.label}:</span>
                      <span className="text-ink font-medium text-right">{m.spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hardware Quality Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                {current.hardware.map((h, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-line bg-canvas">
                    <span className="text-accent block text-[10px] uppercase font-semibold">{h.brand}</span>
                    <span className="text-ink font-medium mt-1 block leading-snug">{h.item}</span>
                    <span className="text-emerald-700 block text-[10px] mt-1.5">✓ {h.cycleLife}</span>
                  </div>
                ))}
              </div>

              {/* Craftsman Insight */}
              <div className="border-l-2 border-accent pl-5 py-1">
                <p className="font-serif italic text-sm text-ink/80 leading-relaxed">
                  &ldquo;{current.craftsmanshipInsight}&rdquo;
                </p>
                <span className="text-xs font-mono text-muted mt-2 block">
                  — Bác Ba Thợ Cả · Phụ trách Mộc Thửa Riêng Xưởng Thạnh Xuân
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
