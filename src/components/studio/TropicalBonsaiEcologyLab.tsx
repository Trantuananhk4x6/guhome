'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type FloraSpeciesId = 'barringtonia' | 'enkianthus' | 'bougainvillea' | 'herbal-garden'

interface FloraSpec {
  id: FloraSpeciesId
  nameVi: string
  scientificName: string
  subtitleVi: string
  sunToleranceVi: string
  heatReductionC: number
  airPurificationRating: string
  wateringFrequencyVi: string
  tagVi: string
  icon: string
  sensoryNarrativeVi: string
  descriptionVi: string
  idealLocationVi: string
}

const FLORA_DATA: Record<FloraSpeciesId, FloraSpec> = {
  barringtonia: {
    id: 'barringtonia',
    nameVi: 'Cây Bàng Vuông Biển Đảo Tự Nhiên',
    scientificName: 'Barringtonia asiatica',
    subtitleVi: 'Island Canopy Biophilic Shield · Cản 85% Nắng Tây',
    sunToleranceVi: 'Chịu nắng gắt 40°C & chịu gió bão ven sông Sài Gòn',
    heatReductionC: 4.5,
    airPurificationRating: 'Hấp thụ 78% bụi mịn PM2.5 nhờ phiến lá rộng phủ lớp sáp bóng',
    wateringFrequencyVi: 'Tưới đẫm 2 lần/tuần qua hệ thống tưới ngầm tự động',
    tagVi: 'Lá Chắn Nắng Tây · Hoa Thơm Về Đêm',
    icon: '🌳',
    sensoryNarrativeVi: 'Những chùm hoa bàng vuông bung nở sắc tím phấn vào ban đêm, tỏa hương thơm ngát tựa mùi mật hoa rừng lan tỏa khắp ban công phòng ngủ.',
    descriptionVi:
      'Được ươm dưỡng từ các đảo cát ven biển, cây bàng vuông có phiến lá dày xanh mướt mọng nước, tạo thành một tán cây xanh cản trực tiếp bức xạ nhiệt mặt trời hướng Tây, hạ nhiệt bề mặt vách kính phòng khách tới 4.5°C.',
    idealLocationVi: 'Ban công rộng hướng chính Tây căn hộ Penthouse hoặc sân thượng biệt thự',
  },
  enkianthus: {
    id: 'enkianthus',
    nameVi: 'Thạch Nam Bonsai Khối Lũa Thiền Định',
    scientificName: 'Enkianthus perulatus',
    subtitleVi: 'Zen Minimalist Living Bonsai · Thanh Lọc Formaldehyde',
    sunToleranceVi: 'Ánh sáng khuếch tán bán phần, ưa gió mát điều hòa',
    heatReductionC: 2.0,
    airPurificationRating: 'Hấp thụ độc tố bay hơi (VOCs & Formaldehyde từ sơn cũ)',
    wateringFrequencyVi: 'Duy trì ẩm nhẹ rễ, phun sương lá 3 ngày/lần',
    tagVi: 'Thiền Định Tĩnh Lặng · Đẹp Quanh Năm',
    icon: '🪴',
    sensoryNarrativeVi: 'Dáng cành khẳng khiu vươn nhẹ trên nền chậu gốm mộc men tro Bát Tràng, tạo nên bóng đổ thủy mặc tĩnh tại lên mảng tường vôi thô.',
    descriptionVi:
      'Thạch Nam là biểu tượng của tinh thần Wabi-Sabi. Các đốt cành thanh mảnh buông lá xanh non vào mùa hè và chuyển sắc cam ấm vào mùa thu. Cây sinh trưởng chậm, rễ nông, hoàn hảo khi đặt cạnh bàn trà hoặc góc đọc sách thư giãn.',
    idealLocationVi: 'Phòng trà, bàn làm việc KTS hoặc góc giếng trời trong nhà',
  },
  bougainvillea: {
    id: 'bougainvillea',
    nameVi: 'Hoa Giấy Gốc Cổ Thụ Lũa Khô',
    scientificName: 'Bougainvillea glabra',
    subtitleVi: 'Ancient Weathered Bonsai · Rực Rỡ Bất Chấp Nắng Gắt',
    sunToleranceVi: 'Chịu hạn tột bậc, càng nắng to hoa càng rực rỡ',
    heatReductionC: 3.8,
    airPurificationRating: 'Tán lá rậm rạp ngăn chặn khói bụi xe cộ từ đường phố',
    wateringFrequencyVi: 'Chỉ cần tưới 1 lần/tuần, không cần chăm bón cầu kỳ',
    tagVi: 'Kiên Cường Nhiệt Đới · Hoa Nở Quanh Năm',
    icon: '🌺',
    sensoryNarrativeVi: 'Gốc cây sần sùi mang vết tích của thời gian, nâng đỡ những chùm hoa giấy mỏng manh như cánh bướm rung rinh trước gió sông Sài Gòn.',
    descriptionVi:
      'Những gốc hoa giấy cổ thụ trên 20 năm được tuyển lựa từ các nhà vườn miền Tây, uốn nắn thành dáng bonsai trầm mặc. Cây không bao giờ bị héo rũ dưới cái nắng thiêu đốt của mùa khô miền Nam, tạo điểm nhấn nghệ thuật phóng khoáng.',
    idealLocationVi: 'Bồn hoa ban công phòng khách, bậu cửa sổ phòng ngủ master',
  },
  'herbal-garden': {
    id: 'herbal-garden',
    nameVi: 'Vườn Thảo Mộc Ban Công Hương Thảo & Bạc Hà',
    scientificName: 'Rosmarinus officinalis & Mentha',
    subtitleVi: 'Aromatic Micro-Garden · Đuổi Muỗi Tự Nhiên Mùa Mưa',
    sunToleranceVi: 'Nắng sáng 4-5 giờ, ưa đất thoát nước cực nhanh',
    heatReductionC: 2.5,
    airPurificationRating: 'Khử mùi ẩm mốc, giải phóng ion âm và tinh dầu kháng khuẩn',
    wateringFrequencyVi: 'Tưới phun sương mỗi sáng sớm đón bình minh',
    tagVi: 'Hương Thơm Thảo Dược · Thư Giãn Khứu Giác',
    icon: '🌿',
    sensoryNarrativeVi: 'Chạm nhẹ tay vào nhành hương thảo, tinh dầu thảo mộc sảng khoái đánh thức mọi giác quan, mang đến tách trà chiều tươi mát ngay tại nhà.',
    descriptionVi:
      'Không chỉ làm dịu không gian, vườn thảo mộc gồm hương thảo (rosemary), bạc hà chanh và xả chanh hoạt động như một hệ xua đuổi muỗi sinh học tự nhiên trong những tháng mưa ngâu của Sài Gòn mà không cần dùng hóa chất độc hại.',
    idealLocationVi: 'Bệ ban công bếp hoặc góc ban công phòng ăn ngoài trời',
  },
}

export function TropicalBonsaiEcologyLab({ className }: { className?: string } = {}) {
  const [selectedFloraId, setSelectedFloraId] = useState<FloraSpeciesId>('barringtonia')
  const [activeDrainageLayer, setActiveDrainageLayer] = useState<number>(2)

  const currentFlora = FLORA_DATA[selectedFloraId] ?? FLORA_DATA['barringtonia']

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-canvas border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Sinh Thái Nhiệt Đới · GuHomes Biophilic Atelier
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Lọc Bụi &amp; Chống Nắng Tây
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Bản Đồ Cảnh Quan Sinh Thái Nhiệt Đới Biophilic
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              Cây xanh trong kiến trúc GuHomes là những màng lọc sinh học sống động: cản trực tiếp bức xạ nhiệt nắng
              Tây, lọc sạch bụi mịn PM2.5 và xoa dịu tâm trí gia chủ bằng hương thơm bản địa.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Hạ nhiệt thực tế:</span>
            <span className="text-xs font-mono font-medium text-ink bg-surface px-3 py-1.5 rounded-full border border-line">
              -2.0°C đến -4.5°C Mặt Kính
            </span>
          </div>
        </div>

        {/* 4 Iconic Biophilic Flora Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(FLORA_DATA) as FloraSpeciesId[]).map((key) => {
            const item = FLORA_DATA[key]
            const isSelected = selectedFloraId === key

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedFloraId(key)}
                className={cn(
                  'group relative text-left rounded-xl p-5 border transition-all duration-300 min-h-[170px] flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-accent/5 ring-1 ring-accent/30 shadow-md'
                    : 'border-line bg-surface/50 hover:border-line-hover hover:bg-surface'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full border',
                        isSelected
                          ? 'border-accent/30 bg-accent/10 text-accent font-semibold'
                          : 'border-line text-muted'
                      )}
                    >
                      -{item.heatReductionC}°C
                    </span>
                  </div>

                  <div className="mt-3 font-serif text-sm font-medium text-ink group-hover:text-accent leading-snug">
                    {item.nameVi}
                  </div>
                  <div className="mt-1 text-xs text-muted line-clamp-1 italic">{item.scientificName}</div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeFloraIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Deep Flora Profile & 3-Layer Drainage System */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Plant Sensory Narrative & Ecology Specs */}
          <div className="lg:col-span-7 rounded-2xl border border-line bg-surface/50 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentFlora.icon}</span>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                      Đặc Tính Sinh Thái Nhiệt Đới
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                      {currentFlora.nameVi}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono bg-canvas px-3 py-1 rounded-full border border-line text-accent font-semibold">
                  Giảm {currentFlora.heatReductionC}°C
                </span>
              </div>

              <p className="mt-4 text-sm sm:text-base text-muted font-light leading-relaxed">
                {currentFlora.descriptionVi}
              </p>

              {/* Sensory Ambience Callout */}
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                  <span>🌸</span>
                  <span>Cảm Quan Khứu Giác &amp; Thị Giác (Biophilic Note)</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-ink font-serif italic leading-relaxed">
                  &ldquo;{currentFlora.sensoryNarrativeVi}&rdquo;
                </p>
              </div>

              {/* Ecological Parameters Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="rounded-xl border border-line bg-canvas p-3.5">
                  <span className="text-[10px] font-mono uppercase text-muted">Khả Năng Chịu Nắng</span>
                  <div className="mt-1 text-ink font-medium">{currentFlora.sunToleranceVi}</div>
                </div>

                <div className="rounded-xl border border-line bg-canvas p-3.5">
                  <span className="text-[10px] font-mono uppercase text-muted">Thanh Lọc Không Khí</span>
                  <div className="mt-1 text-ink font-medium">{currentFlora.airPurificationRating}</div>
                </div>

                <div className="rounded-xl border border-line bg-canvas p-3.5">
                  <span className="text-[10px] font-mono uppercase text-muted">Chế Độ Tưới Nước</span>
                  <div className="mt-1 text-ink font-medium">{currentFlora.wateringFrequencyVi}</div>
                </div>

                <div className="rounded-xl border border-line bg-canvas p-3.5">
                  <span className="text-[10px] font-mono uppercase text-muted">Vị Trí Khuyên Đặt</span>
                  <div className="mt-1 text-ink font-medium">{currentFlora.idealLocationVi}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line text-xs text-muted flex items-center justify-between">
              <span>Được phối kết dưỡng tại vườn ươm sinh thái GuHomes.</span>
              <a
                href="/khu-vuc"
                className="inline-flex items-center gap-1.5 text-accent font-mono font-semibold hover:underline"
              >
                <span>Xem Vi Khí Hậu Sài Gòn</span>
                <ArrowUpRightIcon className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column: 3-Layer Sub-Irrigation & Anti-Leak Drainage Vault */}
          <div className="lg:col-span-5 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="border-b border-line pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">Kỹ Nghệ Bồn Cây Ban Công</span>
                <h4 className="font-serif text-lg sm:text-xl text-ink font-normal mt-1">
                  Hệ Thoát Nước &amp; Tưới Ngầm 3 Tầng
                </h4>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-muted leading-relaxed">
                Nỗi ám ảnh lớn nhất của bồn cây ban công chung cư là rò rỉ nước ngấm xuống sàn hoặc đất trôi làm nghẹt ống
                thoát nước. GuHomes xử lý bằng cấu tạo 3 tầng kỹ thuật:
              </p>

              {/* 3 Technical Layers Accordion/Toggle */}
              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  onClick={() => setActiveDrainageLayer(1)}
                  className={cn(
                    'w-full text-left rounded-xl p-3.5 border transition-all',
                    activeDrainageLayer === 1
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                      : 'border-line bg-surface/40 hover:bg-surface'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-accent uppercase">
                      Tầng 1: Đất Khoáng Hữu Cơ &amp; Dây Tưới Nhỏ Giọt
                    </span>
                    <span className="text-xs">🌱</span>
                  </div>
                  <div className="mt-1 text-xs text-muted leading-relaxed">
                    Đất vi sinh phối trộn xơ dừa, đá Perlite xốp nhẹ. Ống tưới ngầm bù áp tự động tiết kiệm 60% nước,
                    không làm bắn bẩn vách tường.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveDrainageLayer(2)}
                  className={cn(
                    'w-full text-left rounded-xl p-3.5 border transition-all',
                    activeDrainageLayer === 2
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                      : 'border-line bg-surface/40 hover:bg-surface'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-accent uppercase">
                      Tầng 2: Vải Địa Kỹ Thuật Không Dệt Lọc Đất
                    </span>
                    <span className="text-xs">🛡️</span>
                  </div>
                  <div className="mt-1 text-xs text-muted leading-relaxed">
                    Màng lọc sợi tổng hợp giữ lại 100% hạt đất mùn, chỉ cho nước trong suốt thẩm thấu qua, bảo đảm phễu
                    thu sàn không bao giờ tắc bùn.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveDrainageLayer(3)}
                  className={cn(
                    'w-full text-left rounded-xl p-3.5 border transition-all',
                    activeDrainageLayer === 3
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                      : 'border-line bg-surface/40 hover:bg-surface'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-accent uppercase">
                      Tầng 3: Sỏi Nhẹ Keramzit &amp; Tấm Thoát Nước Cell
                    </span>
                    <span className="text-xs">🪨</span>
                  </div>
                  <div className="mt-1 text-xs text-muted leading-relaxed">
                    Khoang rỗng 30mm tạo đối lưu không khí nuôi dưỡng rễ thở tự nhiên, nước thừa tự chảy thẳng về lỗ
                    thoát mà không bị đọng nũng úng rễ.
                  </div>
                </button>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href="/contact"
                className="w-full min-h-[44px] rounded-xl bg-accent px-5 py-3 text-xs font-bold text-canvas hover:bg-accent-hover transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Tư Vấn Thiết Kế Ban Công Sinh Thái</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
