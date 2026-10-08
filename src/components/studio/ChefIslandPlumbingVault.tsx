'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type MepLayerId = 'integrated-sink' | 'brass-p-trap' | 'ip67-power' | 'downdraft-hood'

interface MepLayerSpec {
  id: MepLayerId
  layerNumber: string
  titleVi: string
  subtitleVi: string
  materialVi: string
  engineeringMetricVi: string
  primaryAdvantageVi: string
  tagVi: string
  icon: string
  descriptionVi: string
  technicalSpecs: {
    durability: string
    safetyNoise: string
    maintenance: string
  }
}

const MEP_LAYERS: Record<MepLayerId, MepLayerSpec> = {
  'integrated-sink': {
    id: 'integrated-sink',
    layerNumber: '01',
    titleVi: 'Chậu Rửa Âm Đá Nguyên Khối Vát Góc 15° Không Mối Nối',
    subtitleVi: 'Seamless Integrated Stone Sink · Triệt Tiêu Nấm Mốc',
    materialVi: 'Đá Travertine Navona hoặc Calacatta xẻ nguyên khối phay rãnh CNC 5 trục',
    engineeringMetricVi: 'Góc vát thoát nước 15 độ · Dung sai mối ghép < 0.2 mm',
    primaryAdvantageVi: 'Loại bỏ hoàn toàn đường viền keo silicon truyền thống - nơi tích tụ vi khuẩn và nấm mốc đen ẩm ướt',
    tagVi: 'Khối Liền Liền Mạch · Không Ố Mốc',
    icon: '🚰',
    descriptionVi:
      'Chậu rửa bát truyền thống dán silicon sau 6 tháng dưới khí hậu Sài Gòn đều bị mốc đen và ố vàng đường viền. GuHomes gia công khoét lòng chậu trực tiếp từ phiến đá đảo bếp hoặc ghép mòi 45 độ giấu đường liên kết bằng keo epoxy tinh thể đá siêu cứng, tạo nên bề mặt nguyên khối tinh xảo.',
    technicalSpecs: {
      durability: 'Chịu sốc nhiệt nước sôi 100°C và dung dịch tẩy rửa hữu cơ',
      safetyNoise: 'Đáy chậu dán tấm cao su tiêu âm triệt tiêu tiếng nước xả < 32dB',
      maintenance: 'Chỉ cần lau bằng khăn sợi mềm và dầu khoáng tự nhiên 6 tháng/lần',
    },
  },
  'brass-p-trap': {
    id: 'brass-p-trap',
    layerNumber: '02',
    titleVi: 'Cụm Xi-Phông Ngăn Mùi P-Trap Đồng Đúc Chịu Dầu Sôi 120°C',
    subtitleVi: 'Heavy Cast Brass Odor-Lock P-Trap · Lưu Lượng 45L/Phút',
    materialVi: 'Đồng thau đúc đặc nguyên khối C3604 chống ăn mòn hóa chất và axit thực phẩm',
    engineeringMetricVi: 'Chịu nhiệt độ dầu sôi 120°C · Lưu lượng thoát 45 lít/phút',
    primaryAdvantageVi: 'Ngăn chặn 100% mùi hôi cống rãnh xộc ngược và không bao giờ biến dạng giòn gãy như xi-phông nhựa',
    tagVi: 'Đồng Đúc Bền Bỉ · Thoát Nước Siêu Tốc',
    icon: '🔩',
    descriptionVi:
      'Hệ thống xi-phông nhựa mỏng manh là hiểm họa rò rỉ ngầm phá hủy cốt gỗ tủ bếp đắt tiền. Cụm P-Trap GuHomes được đúc từ đồng thau đặc dày 3.5mm, có van kiểm tra tháo nhanh bằng tay không cần kìm búa, đảm bảo lưu lượng xả xoáy cực đại không gây tắc nghẽn mỡ.',
    technicalSpecs: {
      durability: 'Tuổi thọ vượt 30 năm, bảo hành chống rò rỉ trọn đời tủ bếp',
      safetyNoise: 'Thiết kế góc lượn thủy lực giảm tiếng kêu ùng ục trong đường ống',
      maintenance: 'Cốc lắng đáy dễ dàng vặn mở vệ sinh cặn rác định kỳ trong 60 giây',
    },
  },
  'ip67-power': {
    id: 'ip67-power',
    layerNumber: '03',
    titleVi: 'Cột Ổ Cắm Điện Âm Bàn Tự Động Chuẩn Chống Nước IP67',
    subtitleVi: 'Motorized Flush Pop-Up Power Station · Cảm Biến Tràn Nước',
    materialVi: 'Vỏ nhôm Anodized xước mờ mạ niken + Cảm biến điện dung ngắt nguồn tự động',
    engineeringMetricVi: 'Chuẩn chống nước mặt bàn IP67 · Công suất chịu tải 3500W',
    primaryAdvantageVi: 'Tự động ngắt điện trong 0.02 giây khi phát hiện nước tràn và tự động thụt âm phẳng mặt đá khi không dùng',
    tagVi: 'An Toàn Tối Thượng · Ẩn Mình Tinh Tế',
    icon: '⚡',
    descriptionVi:
      'Đảo bếp là nơi chế biến kết hợp nước và thiết bị điện công suất lớn (nồi chiên không dầu, máy xay, máy pha cà phê). Cột điện âm bàn GuHomes ẩn mình phẳng tuyệt đối với mặt đá Travertine, chỉ nhô lên êm ái khi chạm nhẹ, trang bị sạc không dây 15W trên nắp và tự khóa an toàn.',
    technicalSpecs: {
      durability: 'Mô-tơ bước siêu êm thử nghiệm 50.000 chu kỳ nâng hạ liên tục',
      safetyNoise: 'Tích hợp rơ-le chống giật ELCB 30mA bảo vệ tuyệt đối cho trẻ nhỏ',
      maintenance: 'Bề mặt chống bám vân tay, gioăng cao su silicone kép ngăn nước rỉ xuống tủ',
    },
  },
  'downdraft-hood': {
    id: 'downdraft-hood',
    layerNumber: '04',
    titleVi: 'Hệ Thống Hút Mùi Mặt Bàn Downdraft 1100 m³/h Siêu Êm < 38dB',
    subtitleVi: 'Invisible Downdraft Extraction · Giấu Âm Tủ Plywood Chịu Ẩm',
    materialVi: 'Động cơ biến tần BLDC không chổi than + Bộ lọc than hoạt tính gốm tái sinh',
    engineeringMetricVi: 'Lực hút 1100 m³/h · Độ ồn ở chế độ tối ưu < 38 dB',
    primaryAdvantageVi: 'Hút khói dầu mỡ ngay tại đáy chảo trước khi kịp bốc lên làm bám mùi phòng khách không gian mở',
    tagVi: 'Tầm Nhìn Không Giới Hạn · Khử Mùi Triệt Để',
    icon: '💨',
    descriptionVi:
      'Trong các căn hộ Penthouse trần cao thông thoáng, máy hút mùi thả trần cồng kềnh sẽ phá vỡ toàn bộ tầm nhìn panorama. Hệ Downdraft giấu chìm hoàn toàn vào thân đảo bếp, gom luồng khí thải dẫn ngầm dưới sàn hoặc lọc tuần hoàn qua 4 lớp than gốm khử 98% mùi gia vị đậm chất Việt.',
    technicalSpecs: {
      durability: 'Động cơ BLDC Đức bảo hành 10 năm, tiết kiệm 70% điện năng',
      safetyNoise: 'Hộp tiêu âm buồng gió Plywood lót bông khoáng giảm ồn triệt để',
      maintenance: 'Lưới lọc mỡ inox tháo rửa bằng máy rửa bát tự động mỗi tuần',
    },
  },
}

export function ChefIslandPlumbingVault({ className }: { className?: string } = {}) {
  const [selectedLayerId, setSelectedLayerId] = useState<MepLayerId>('integrated-sink')
  const [flowActive, setFlowActive] = useState<boolean>(true)

  const currentLayer = MEP_LAYERS[selectedLayerId]

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-canvas border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Kỹ Nghệ Ẩn Mình Cơ Điện · GuHomes Culinary Engineering
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Chuẩn MEP Cao Cấp
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Kỹ Nghệ Đảo Bếp Khối Đá Chef Island Giấu Ống
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              Đảo bếp là sân khấu ẩm thực trung tâm của tư gia. Mọi đường cấp thoát nước nóng lạnh, cụm xi-phông chống
              mùi, nguồn điện cao áp và ống hút mùi được tính toán giấu âm hoàn hảo vào lòng khối đá tự nhiên.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Chứng nhận an toàn:</span>
            <span className="text-xs font-mono font-medium text-ink bg-surface px-3 py-1.5 rounded-full border border-line">
              IP67 · 1100 m³/h · Đồng C3604
            </span>
          </div>
        </div>

        {/* 4 Invisible MEP Layers Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(MEP_LAYERS) as MepLayerId[]).map((key) => {
            const layer = MEP_LAYERS[key]
            const isSelected = selectedLayerId === key

            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setSelectedLayerId(key)}
                className={cn(
                  'group relative text-left rounded-xl p-5 border transition-all duration-300 min-h-[170px] flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-accent/5 ring-1 ring-accent/30 shadow-md'
                    : 'border-line bg-surface/50 hover:border-line-hover hover:bg-surface'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{layer.icon}</span>
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full border',
                        isSelected
                          ? 'border-accent/30 bg-accent/10 text-accent font-semibold'
                          : 'border-line text-muted'
                      )}
                    >
                      TẦNG {layer.layerNumber}
                    </span>
                  </div>

                  <div className="mt-3 font-serif text-sm font-medium text-ink group-hover:text-accent leading-snug">
                    {layer.titleVi}
                  </div>
                  <div className="mt-1 text-xs text-muted line-clamp-1">{layer.tagVi}</div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeMepLayerIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Technical Detail & Cross-Section View */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Plumbing & Air Flow Simulation Canvas */}
          <div className="lg:col-span-6 rounded-2xl border border-line bg-surface/50 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">
                  Mặt Cắt Cơ Điện Kỹ Thuật Đảo Bếp
                </span>
                <button
                  type="button"
                  onClick={() => setFlowActive(!flowActive)}
                  className="text-xs font-mono text-accent hover:underline"
                >
                  {flowActive ? 'Tạm Dừng Mô Phỏng' : 'Chạy Mô Phỏng Dòng Chảy'}
                </button>
              </div>

              {/* Cross Section Graphic Representation */}
              <div className="mt-6 relative h-64 rounded-xl border border-line bg-stone-950 p-5 flex flex-col justify-between overflow-hidden text-stone-100">
                {/* Stone Countertop Layer */}
                <div className="h-6 rounded bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400 border border-stone-200/40 flex items-center justify-between px-3 text-[10px] font-mono text-stone-900 font-bold">
                  <span>MẶT BÀN ĐÁ TỰ NHIÊN NGUYÊN KHỐI (30mm)</span>
                  <span>VÁT MÒI 45°</span>
                </div>

                {/* Cabinetry Cavity with MEP Routing */}
                <div className="flex-1 my-3 rounded-lg border border-dashed border-stone-800 bg-stone-900/60 p-4 flex flex-col justify-between relative">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                    <span>Khoang Kỹ Thuật Plywood E0</span>
                    <span className="text-amber-400 font-semibold">{currentLayer.tagVi}</span>
                  </div>

                  {/* Flow Streamlines Graphic */}
                  <div className="relative h-20 w-full flex items-center justify-center">
                    <div className="w-full h-8 rounded-full border border-amber-500/40 bg-amber-500/10 flex items-center px-4 justify-between">
                      <span className="text-xs">💧 Nước xả êm: 45 L/phút</span>
                      <motion.div
                        animate={flowActive ? { x: [0, 40, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                        className="h-2 w-8 rounded-full bg-amber-400"
                      />
                      <span className="text-xs">💨 Hút Downdraft 1100 m³/h</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 border-t border-stone-800 pt-2">
                    <span>Cụm Xi-Phông P-Trap Đồng C3604</span>
                    <span>Dây Điện Chống Cháy CV 6.0</span>
                  </div>
                </div>

                {/* Subfloor Slab Connection */}
                <div className="h-5 rounded bg-stone-800 border border-stone-700 flex items-center justify-center text-[10px] font-mono text-stone-400">
                  SÀN BÊ TÔNG ÂM · ỐNG DẪN DƯỚI LỚP CÁCH ÂM BUTYL
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-line bg-canvas p-4 text-xs font-light text-muted leading-relaxed">
              Mọi điểm đấu nối cơ điện tại đảo bếp đều có van khóa khẩn cấp riêng biệt và cửa thăm kỹ thuật giấu kín
              bằng hệ ray trượt tự mở Push-to-Open.
            </div>
          </div>

          {/* Right Column: Deep Technical Specs & Advantages */}
          <div className="lg:col-span-6 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <span className="text-3xl">{currentLayer.icon}</span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Tầng Kỹ Thuật {currentLayer.layerNumber} / 04
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                    {currentLayer.titleVi}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-muted font-light leading-relaxed">
                {currentLayer.descriptionVi}
              </p>

              {/* Primary Advantage Callout */}
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                  <span>💎</span>
                  <span>Lợi Điểm Độc Quyền GuHomes</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-ink font-serif leading-relaxed">
                  {currentLayer.primaryAdvantageVi}
                </p>
              </div>

              {/* 3 Technical Parameters */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-line bg-surface/50 p-3">
                  <span className="text-[10px] font-mono uppercase text-muted">Độ Bền &amp; Chịu Lực</span>
                  <div className="mt-1 text-[11px] font-medium text-ink leading-snug">
                    {currentLayer.technicalSpecs.durability}
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-surface/50 p-3">
                  <span className="text-[10px] font-mono uppercase text-muted">An Toàn &amp; Tiêu Âm</span>
                  <div className="mt-1 text-[11px] font-medium text-ink leading-snug">
                    {currentLayer.technicalSpecs.safetyNoise}
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-surface/50 p-3">
                  <span className="text-[10px] font-mono uppercase text-muted">Bảo Dưỡng Nhanh</span>
                  <div className="mt-1 text-[11px] font-medium text-ink leading-snug">
                    {currentLayer.technicalSpecs.maintenance}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted">Cam kết kiểm tra áp lực nước 4 bar trước khi ốp đá.</span>
              <a
                href="/du-toan-chi-phi"
                className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-canvas hover:bg-accent-hover transition-all"
              >
                <span>Dự Toán Đảo Bếp Khối Đá</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
