'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type DetailId = 'west-curtain-slot' | 'shadow-gap-floor' | 'cove-light-acoustic' | 'stone-dry-hang'

interface ConstructionLayer {
  layerNumber: number
  material: string
  thicknessOrDimension: string
  functionalRole: string
}

interface DetailDrawing {
  id: DetailId
  code: string
  title: string
  subtitle: string
  locationType: string
  tolerance: string
  engineeringInsight: string
  layers: ConstructionLayer[]
  svgType: 'curtain-slot' | 'shadow-gap' | 'cove-light' | 'stone-hang'
}

const DETAIL_DRAWINGS: DetailDrawing[] = [
  {
    id: 'west-curtain-slot',
    code: 'DET-01 / W-FACADE',
    title: 'Vách Kính Hướng Tây, Hộp Rèm Âm Trần & Miệng Gió Linear Slot Diffuser',
    subtitle: 'Giải pháp tổng hòa giữa cách nhiệt, lưu thông khí và thẩm mỹ giấu viền',
    locationType: 'Mặt đứng kính phòng khách Penthouse & Duplex hướng Tây',
    tolerance: 'Dung sai lắp ghép khe nhôm ≤ 1.0 mm',
    engineeringInsight:
      'Khe gió hẹp giấu viền được tính toán để thổi một luồng khí mát mỏng dọc mặt kính, triệt tiêu tức thì hiện tượng đọng sương do chênh lệch nhiệt độ giữa điều hòa 24°C bên trong và nắng nung 45°C bên ngoài.',
    svgType: 'curtain-slot',
    layers: [
      {
        layerNumber: 1,
        material: 'Kính Low-E cản nhiệt 2 lớp (6mm + 12A Argon + 6mm)',
        thicknessOrDimension: '24 mm',
        functionalRole: 'Ngăn chặn 95% tia hồng ngoại và tử ngoại bức xạ vào phòng.',
      },
      {
        layerNumber: 2,
        material: 'Cửa gió khe hẹp Linear Slot Diffuser không viền',
        thicknessOrDimension: 'Rộng khe 25 mm',
        functionalRole: 'Cấp gió màng mỏng dọc kính, triệt tiêu đọng sương ngưng tụ.',
      },
      {
        layerNumber: 3,
        material: 'Hộp rèm âm trần 2 lớp (Vải lanh Bỉ thô mộc + Voan khuếch tán)',
        thicknessOrDimension: 'Sâu 180 mm × Cao 200 mm',
        functionalRole: 'Giấu kín mô tơ Somfy và thanh ray, ánh sáng dịu êm.',
      },
      {
        layerNumber: 4,
        material: 'Trần thạch cao chống ẩm dán lưới sợi thủy tinh 160g/m²',
        thicknessOrDimension: '2 lớp × 9.5 mm',
        functionalRole: 'Chống võng mép hộp rèm trong môi trường ẩm cao Sài Gòn.',
      },
    ],
  },
  {
    id: 'shadow-gap-floor',
    code: 'DET-02 / FLOOR-BASE',
    title: 'Khe Ron Âm Sàn Shadow Gap 12mm Triệt Tiêu Len Chân Tường',
    subtitle: 'Giải phóng chân tường — Cho phép thớ gỗ tự nhiên thở theo mùa',
    locationType: 'Chân tường phòng khách, hành lang và phòng ngủ Master',
    tolerance: 'Độ thẳng rãnh khe âm ± 0.5 mm trên 10m',
    engineeringInsight:
      'Len chân tường bằng gỗ nổi truyền thống thường bị ẩm mốc đáy và cấn đồ nội thất. Nẹp Z-profile âm tường tạo rãnh sâu 12mm vừa tạo cảm giác vách tường bay lơ lửng, vừa để sàn gỗ óc chó co giãn tự do khi triều cường lên.',
    svgType: 'shadow-gap',
    layers: [
      {
        layerNumber: 1,
        material: 'Tường gạch xây trát vữa xi măng mác 75 dán lưới chống nứt',
        thicknessOrDimension: 'Dày 100 – 200 mm',
        functionalRole: 'Kết cấu chịu lực vách chính của căn nhà.',
      },
      {
        layerNumber: 2,
        material: 'Nẹp nhôm định hình Z-Bar mạ Anodized chống ăn mòn',
        thicknessOrDimension: 'Cao 15 mm × Sâu 12 mm',
        functionalRole: 'Định hình đường chỉ âm sắc nét, che phủ lớp cắt ván sàn.',
      },
      {
        layerNumber: 3,
        material: 'Sàn gỗ Óc Chó FAS lau dầu Osmo 3 lớp hữu cơ',
        thicknessOrDimension: 'Dày 18 mm',
        functionalRole: 'Bề mặt tiếp xúc bàn chân ấm áp, êm ái tự nhiên.',
      },
      {
        layerNumber: 4,
        material: 'Xốp cao su non lưu hóa lót sàn chống ẩm',
        thicknessOrDimension: 'Dày 3 mm',
        functionalRole: 'Tiêu âm bước chân và ngăn hơi ẩm từ sàn bê tông bốc lên.',
      },
    ],
  },
  {
    id: 'cove-light-acoustic',
    code: 'DET-03 / CEIL-ACOUSTIC',
    title: 'Trần Thạch Cao Tiêu Âm Knauf 2 Lớp & Khe Hắt Sáng Cove Light Warm Dim',
    subtitle: 'Triệt tiêu tiếng dội ồn đô thị — Ánh sáng hắt gián tiếp không chói mắt',
    locationType: 'Khu vực trần phòng khách, phòng ăn & phòng giải trí nghe nhạc',
    tolerance: 'Góc nghiêng hắt sáng 35° chuẩn xác',
    engineeringInsight:
      'Ánh sáng gián tiếp hắt trần nếu làm góc sai sẽ lộ rõ các hạt chip LED hoặc bóng đen đứt đoạn. GuHomes dùng máng nhôm tản nhiệt góc 35° và mặt tán quang mờ, ánh sáng trải đều mịn như sương mai.',
    svgType: 'cove-light',
    layers: [
      {
        layerNumber: 1,
        material: 'Khung xương trần chìm Vĩnh Tường Pro gia cố ty ren kép',
        thicknessOrDimension: 'Cự ly 400 × 800 mm',
        functionalRole: 'Hệ giàn chịu tải tĩnh và chống rung lắc tòa tháp.',
      },
      {
        layerNumber: 2,
        material: '2 lớp tấm thạch cao tiêu âm Knauf đục lỗ so le',
        thicknessOrDimension: 'Dày 2 × 12.5 mm',
        functionalRole: 'Hấp thụ âm vang vọng, đưa độ ồn phòng khách về dưới 32dB.',
      },
      {
        layerNumber: 3,
        material: 'Máng nhôm góc 35° gắn LED dây COB Warm Dim CRI 98',
        thicknessOrDimension: 'Công suất 14.4W/m',
        functionalRole: 'Dải nhiệt độ màu tự biến thiên từ 1800K đến 2700K khi dimmer.',
      },
      {
        layerNumber: 4,
        material: 'Sơn vôi khoáng tự nhiên Calce Ý hoàn thiện bay thủ công',
        thicknessOrDimension: '3 lớp mỏng',
        functionalRole: 'Khuếch tán ánh sáng mềm mại, hút ẩm và lọc không khí.',
      },
    ],
  },
  {
    id: 'stone-dry-hang',
    code: 'DET-04 / STONE-FACADE',
    title: 'Khung Treo Inox 304 Bát Móc Ốp Đá Travertine Tiêu Nhiệt',
    subtitle: 'Hệ ốp khô cơ học vĩnh cửu — Khe rãnh đối lưu tản nhiệt bức xạ',
    locationType: 'Vách trang trí sau lưng tivi, thông tầng sảnh đón biệt thự',
    tolerance: 'Mặt phẳng phiến đá dung sai ≤ 0.8 mm',
    engineeringInsight:
      'Ống ướt dán keo thông thường dễ bị bong rớt sau vài năm do nhiệt độ cao co giãn. Hệ bát móc Inox 304 neo bulong trực tiếp vào bê tông tạo khe thông gió 30mm tản nhiệt liên tục, giữ phiến đá luôn mát rượi.',
    svgType: 'stone-hang',
    layers: [
      {
        layerNumber: 1,
        material: 'Bê tông cốt thép / Tường gạch gia cố thép neo',
        thicknessOrDimension: 'Chịu lực tĩnh tải',
        functionalRole: 'Nền móng neo giữ vững chắc toàn bộ hệ thống.',
      },
      {
        layerNumber: 2,
        material: 'Khung thép hộp mạ kẽm nhúng nóng + Bát móc Inox 304',
        thicknessOrDimension: 'Khung 40 × 40 × 1.8 mm',
        functionalRole: 'Liên kết ngàm giữ âm phiến đá, chịu lực động đất rung lắc.',
      },
      {
        layerNumber: 3,
        material: 'Khoang rỗng đối lưu khí tản nhiệt bức xạ',
        thicknessOrDimension: 'Khoảng hở 30 mm',
        functionalRole: 'Không khí đối lưu tự nhiên giải nhiệt cho bức tường hướng Tây.',
      },
      {
        layerNumber: 4,
        material: 'Phiến đá Travertine tự nhiên xẻ thô giữ nguyên lỗ khí',
        thicknessOrDimension: 'Dày 20 mm',
        functionalRole: 'Hút ẩm, tiêu âm và tôn vinh vẻ đẹp trầm tích địa chất cổ.',
      },
    ],
  },
]

const DEFAULT_DETAIL = DETAIL_DRAWINGS[0] as DetailDrawing

export function ArchitecturalDetailViewer({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState<DetailId>('west-curtain-slot')

  const current: DetailDrawing = DETAIL_DRAWINGS.find((d) => d.id === selectedId) ?? DEFAULT_DETAIL

  return (
    <section className={cn('relative bg-canvas py-16 sm:py-24 border-y border-line overflow-hidden', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-line">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Architectural Detailing Vault</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-ink mt-3 tracking-tight">
              Thư Viện Bản Vẽ Mặt Cắt Cấu Tạo Kiến Trúc
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-[64ch] mt-3 font-light leading-relaxed">
              Sự tinh tế của một không gian Quiet Luxury không nằm ở bề mặt bóng bẩy, mà được quyết định bởi những chi tiết giấu kín trong mặt cắt cấu tạo: từ khe giãn nở 12mm đến khung bát móc inox tản nhiệt.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-muted">TIÊU CHUẨN THI CÔNG GUHOMES:</span>
            <span className="text-xs font-mono font-semibold text-accent px-3 py-1 rounded-full bg-surface border border-line">
              Dung Sai ≤ 1.0mm
            </span>
          </div>
        </div>

        {/* 4 Detail Drawing Selector Tabs */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {DETAIL_DRAWINGS.map((item, index) => {
            const isSelected = item.id === selectedId
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={cn(
                  'p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300',
                  isSelected
                    ? 'border-accent bg-surface shadow-lg ring-1 ring-accent'
                    : 'border-line bg-surface/40 hover:bg-surface hover:border-line-strong'
                )}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
                  <span className={isSelected ? 'text-accent font-semibold' : ''}>{item.code}</span>
                  <span>0{index + 1}/04</span>
                </div>
                <h3 className={cn('font-serif text-sm sm:text-base font-medium line-clamp-2 transition-colors', isSelected ? 'text-accent' : 'text-ink')}>
                  {item.title}
                </h3>
              </button>
            )
          })}
        </div>

        {/* Main Blueprint & Spec Detail Box */}
        <div className="mt-8 rounded-3xl border border-line bg-surface p-6 sm:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: SVG Blueprint Vector Cross-Section (6 cols) */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl border border-line bg-[#161A19] text-[#F3F1EC] p-6 flex flex-col justify-between overflow-hidden shadow-inner">
                {/* Architectural Blueprint Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to right, #4A7A70 1px, transparent 1px), linear-gradient(to bottom, #4A7A70 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Blueprint Stamp Header */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5 text-[10px] font-mono text-white/60">
                  <span>BẢN VẼ CHI TIẾT MẶT CẮT KỸ THUẬT</span>
                  <span className="text-accent">{current.code}</span>
                </div>

                {/* Vector Cross-Section Graphics */}
                <div className="relative z-10 flex-1 flex items-center justify-center p-4">
                  {current.svgType === 'curtain-slot' && (
                    <svg viewBox="0 0 300 200" className="w-full h-full text-accent" fill="none" stroke="currentColor">
                      {/* Concrete Wall Ceiling */}
                      <rect x="20" y="20" width="260" height="25" fill="rgba(255,255,255,0.08)" stroke="#888" strokeWidth="1.5" />
                      <text x="30" y="37" fill="#AAA" fontSize="9" fontFamily="monospace">DẦM SÀN BÊ TÔNG CỐT THÉP</text>
                      {/* Curtain Pocket Pocket */}
                      <rect x="90" y="45" width="80" height="70" stroke="#FFF" strokeWidth="1.5" strokeDasharray="3 3" />
                      <text x="95" y="70" fill="#E5C17B" fontSize="8" fontFamily="monospace">HỘP RÈM ÂM</text>
                      {/* Double Glass Wall */}
                      <line x1="40" y1="45" x2="40" y2="180" stroke="#5EEAD4" strokeWidth="3" />
                      <line x1="50" y1="45" x2="50" y2="180" stroke="#5EEAD4" strokeWidth="3" />
                      <text x="15" y="120" fill="#5EEAD4" fontSize="8" fontFamily="monospace" transform="rotate(-90 20 120)">KÍNH LOW-E 24MM</text>
                      {/* Linear Slot Diffuser */}
                      <rect x="55" y="45" width="25" height="15" fill="#333" stroke="#FFF" strokeWidth="1" />
                      <path d="M 67,60 L 67,110" stroke="#E5C17B" strokeWidth="1.5" strokeDasharray="2 2" />
                      <text x="58" y="90" fill="#E5C17B" fontSize="7" fontFamily="monospace">GIÓ MÁT</text>
                      {/* Gypsum False Ceiling */}
                      <rect x="170" y="45" width="110" height="12" fill="rgba(229,193,123,0.2)" stroke="#E5C17B" strokeWidth="1" />
                      <text x="180" y="54" fill="#FFF" fontSize="8" fontFamily="monospace">TRẦN KNAUF 2 LỚP</text>
                    </svg>
                  )}

                  {current.svgType === 'shadow-gap' && (
                    <svg viewBox="0 0 300 200" className="w-full h-full text-accent" fill="none" stroke="currentColor">
                      {/* Concrete floor */}
                      <rect x="20" y="150" width="260" height="30" fill="rgba(255,255,255,0.08)" stroke="#888" strokeWidth="1.5" />
                      <text x="30" y="170" fill="#AAA" fontSize="9" fontFamily="monospace">SÀN BÊ TÔNG HIỆN HỮU</text>
                      {/* Rubber foam layer */}
                      <rect x="20" y="142" width="260" height="8" fill="#444" stroke="#666" strokeWidth="1" />
                      {/* Walnut wood flooring */}
                      <rect x="20" y="120" width="180" height="22" fill="rgba(180,120,70,0.4)" stroke="#C5A059" strokeWidth="1.5" />
                      <text x="40" y="135" fill="#FFF" fontSize="9" fontFamily="monospace">SÀN GỖ ÓC CHÓ FAS</text>
                      {/* Brick Wall */}
                      <rect x="212" y="20" width="68" height="110" fill="rgba(255,255,255,0.05)" stroke="#AAA" strokeWidth="1.5" />
                      <text x="218" y="60" fill="#AAA" fontSize="8" fontFamily="monospace">VÁCH TƯỜNG</text>
                      {/* Z-bar Profile shadow gap */}
                      <path d="M 212,115 L 200,115 L 200,142 L 212,142" stroke="#5EEAD4" strokeWidth="2.5" />
                      <text x="175" y="110" fill="#5EEAD4" fontSize="8" fontFamily="monospace">SHADOW GAP 12MM</text>
                    </svg>
                  )}

                  {current.svgType === 'cove-light' && (
                    <svg viewBox="0 0 300 200" className="w-full h-full text-accent" fill="none" stroke="currentColor">
                      {/* Slab */}
                      <rect x="20" y="20" width="260" height="20" fill="rgba(255,255,255,0.08)" stroke="#888" strokeWidth="1" />
                      {/* Main Gypsum Ceiling */}
                      <rect x="20" y="70" width="160" height="15" fill="rgba(255,255,255,0.15)" stroke="#FFF" strokeWidth="1.5" />
                      {/* Cove Edge Profile */}
                      <path d="M 180,70 L 220,70 L 220,95 L 240,95" stroke="#E5C17B" strokeWidth="2" />
                      {/* 35 deg angle light beam */}
                      <line x1="210" y1="65" x2="270" y2="30" stroke="#FFD2A0" strokeWidth="2" strokeDasharray="3 2" />
                      <circle cx="210" cy="65" r="4" fill="#FFD2A0" />
                      <text x="130" y="60" fill="#FFD2A0" fontSize="8" fontFamily="monospace">LED WARM DIM 35°</text>
                      <text x="30" y="81" fill="#FFF" fontSize="8" fontFamily="monospace">TRẦN TIÊU ÂM KNAUF</text>
                    </svg>
                  )}

                  {current.svgType === 'stone-hang' && (
                    <svg viewBox="0 0 300 200" className="w-full h-full text-accent" fill="none" stroke="currentColor">
                      {/* Structural Wall */}
                      <rect x="20" y="20" width="50" height="160" fill="rgba(255,255,255,0.08)" stroke="#888" strokeWidth="1.5" />
                      <text x="25" y="100" fill="#AAA" fontSize="8" fontFamily="monospace" transform="rotate(-90 30 100)">VÁCH BÊ TÔNG</text>
                      {/* 30mm Air cavity */}
                      <rect x="70" y="20" width="40" height="160" stroke="#5EEAD4" strokeWidth="1" strokeDasharray="4 3" />
                      <text x="75" y="100" fill="#5EEAD4" fontSize="7" fontFamily="monospace" transform="rotate(-90 80 100)">ĐỐI LƯU TẢN NHIỆT 30MM</text>
                      {/* Stainless Steel 304 Bracket */}
                      <rect x="60" y="70" width="60" height="10" fill="#999" stroke="#FFF" strokeWidth="1" />
                      <circle cx="65" cy="75" r="2" fill="#000" />
                      {/* Travertine Stone Slab */}
                      <rect x="110" y="30" width="30" height="140" fill="rgba(215,190,150,0.3)" stroke="#E5C17B" strokeWidth="2" />
                      <text x="150" y="90" fill="#E5C17B" fontSize="9" fontFamily="monospace">ĐÁ TRAVERTINE 20MM</text>
                    </svg>
                  )}
                </div>

                {/* Blueprint Stamp Footer */}
                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-2 text-[10px] font-mono text-white/50">
                  <span>TIÊU CHUẨN: {current.tolerance}</span>
                  <span>GUHOMES ARCHITECTURAL SPEC 2026</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Layers & Engineering Insight (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono text-accent uppercase tracking-widest">
                  {current.locationType}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ink font-light mt-1">
                  {current.title}
                </h3>
                <p className="text-xs sm:text-sm text-accent font-medium mt-1">
                  {current.subtitle}
                </p>
              </div>

              {/* 4 Construction Layers Breakdown */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-muted uppercase tracking-wider block">
                  Cấu tạo chi tiết từng lớp vật liệu:
                </span>
                {current.layers.map((layer) => (
                  <div key={layer.layerNumber} className="p-3.5 rounded-xl border border-line bg-canvas flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center shrink-0 mt-0.5 font-semibold">
                      {layer.layerNumber}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-medium text-ink">{layer.material}</span>
                        <span className="text-[10px] font-mono text-accent shrink-0">{layer.thicknessOrDimension}</span>
                      </div>
                      <p className="text-[11px] text-muted font-light mt-0.5 leading-relaxed">
                        {layer.functionalRole}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Engineering Insight Quote */}
              <div className="rounded-2xl border border-line bg-canvas p-5">
                <span className="text-[10px] font-mono text-muted uppercase tracking-wider block mb-1">
                  KTS Trưởng Phân Tích Kỹ Thuật:
                </span>
                <p className="text-xs font-light text-ink/90 leading-relaxed italic">
                  &ldquo;{current.engineeringInsight}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
