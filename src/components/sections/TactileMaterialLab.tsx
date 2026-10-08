'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type LightingMode = 'day' | 'night'

interface MaterialItem {
  id: string
  name: string
  scientificName: string
  origin: string
  tag: string
  tactileFeel: string
  microClimateNote: string
  recommendedSpace: string
  lightResponseDay: string
  lightResponseNight: string
  swatchGradientDay: string
  swatchGradientNight: string
  accentColor: string
  specs: {
    label: string
    value: string
  }[]
}

const MATERIALS: readonly MaterialItem[] = [
  {
    id: 'fas-walnut',
    name: 'Gỗ Óc Chó Bắc Mỹ',
    scientificName: 'Juglans Nigra (FAS Grade)',
    origin: 'Rừng ôn đới Bắc Mỹ — Nhập khẩu xẻ sấy chuẩn',
    tag: 'Gỗ Tự Nhiên May Đo',
    tactileFeel: 'Mịn màng như nhung, vân gỗ cuộn sóng, bề mặt lau dầu hữu cơ ấm áp khi chạm tay',
    microClimateNote: 'Sấy lò EMC 10–12%, kết hợp khe co ngót shadow gap 4mm chống phồng rộp trong mùa mưa ẩm 80%',
    recommendedSpace: 'Bàn ăn nguyên tấm, vách ốp đầu giường Master, hệ tủ âm tường kịch trần',
    lightResponseDay: 'Hiện rõ sắc nâu hạt dẻ trầm ấm cùng những dải vân vàng hổ phách đan xen tự nhiên',
    lightResponseNight: 'Hấp thụ ánh sáng 2700K tạo nên chiều sâu thăm thẳm, lan tỏa cảm giác an yên che chở',
    swatchGradientDay: 'radial-gradient(circle at 35% 35%, #5a4231 0%, #3e2d21 65%, #2a1e16 100%)',
    swatchGradientNight: 'radial-gradient(circle at 35% 35%, #7a5438 0%, #4a3222 60%, #1f140e 100%)',
    accentColor: '#A07753',
    specs: [
      { label: 'Độ ẩm cốt gỗ', value: '10% – 12% (EMC tiêu chuẩn)' },
      { label: 'Lớp hoàn thiện', value: 'Dầu thực vật Osmo / Rubio Monocoat 0% VOC' },
      { label: 'Liên kết kết cấu', value: 'Mộng gỗ kép âm dương kết hợp then trượt tự do' },
      { label: 'Kháng ẩm nhiệt đới', value: 'Cấp 1 — Thích ứng hoàn hảo phòng điều hòa' },
    ],
  },
  {
    id: 'silver-travertine',
    name: 'Đá Travertine Bạc Xẻ Sọc',
    scientificName: 'Silver Vein-Cut Travertine',
    origin: 'Mỏ đá tự nhiên Tivoli — Lazio, Ý',
    tag: 'Đá Trầm Tích Nguyên Khối',
    tactileFeel: 'Bề mặt xẻ thô giữ nguyên lỗ rỗng tự nhiên, mát lạnh chân trần, thô mộc không trơn trượt',
    microClimateNote: 'Đá tự nhiên có các vi lỗ thoát nhiệt, giúp điều hòa nhiệt độ phòng khách luôn thấp hơn ngoài trời 2–3°C',
    recommendedSpace: 'Vách tivi thông tầng, đảo bếp nguyên khối, phòng tắm master phong cách spa',
    lightResponseDay: 'Sắc xám bạc ánh tro tương phản tinh tế với ánh nắng ban mai rọi qua khung cửa kính',
    lightResponseNight: 'Đèn hắt chân tường tôn vinh từng rãnh xẻ sọc chìm nổi, biến mảng tường thành bức phù điêu sống động',
    swatchGradientDay: 'radial-gradient(circle at 40% 30%, #d4cfc6 0%, #b2aba0 55%, #8a8277 100%)',
    swatchGradientNight: 'radial-gradient(circle at 40% 30%, #dfcbb5 0%, #b79f88 55%, #6e5a48 100%)',
    accentColor: '#B2ABA0',
    specs: [
      { label: 'Quy cách bề mặt', value: 'Xẻ sọc Vein-Cut để mộc (Unfilled & Honed)' },
      { label: 'Hấp thụ nước', value: '< 0.8% sau khi quét thẩm thấu sinh học' },
      { label: 'Cảm giác nhiệt', value: 'Tản nhiệt cực nhanh, làm dịu cái nóng mùa hè' },
      { label: 'Độ bền cơ học', value: 'Vĩnh cửu theo tuổi thọ công trình' },
    ],
  },
  {
    id: 'calce-limewash',
    name: 'Sơn Vôi Khoáng Truyền Thống',
    scientificName: 'Grassello di Calce (Lime Plaster)',
    origin: 'Vôi tôi ủ tự nhiên 3 năm — Công nghệ khoáng Ý',
    tag: 'Vữa Vôi Tự Thở',
    tactileFeel: 'Mờ mịn như bề mặt vỏ trứng gà, gợn nhẹ vân tay miết bay thủ công của thợ lành nghề',
    microClimateNote: 'Tính kiềm tự nhiên (pH 12–13) ngăn chặn 100% nấm mốc và vi khuẩn trong thời tiết nồm ẩm Sài Gòn',
    recommendedSpace: 'Toàn bộ diện tường phòng khách, phòng ngủ, trần vòm hành lang',
    lightResponseDay: 'Tán xạ ánh sáng đồng đều 360 độ, không bao giờ bị lóa mắt hay phản chiếu chói gắt',
    lightResponseNight: 'Bắt lấy ánh vàng 3000K tạo nên những vệt loang khói mờ ảo ấm cúng tựa sương sớm',
    swatchGradientDay: 'radial-gradient(circle at 30% 30%, #f1ece1 0%, #dfd8ca 60%, #c8c0b1 100%)',
    swatchGradientNight: 'radial-gradient(circle at 30% 30%, #faecd6 0%, #e5d1b7 60%, #bda489 100%)',
    accentColor: '#C7A57C',
    specs: [
      { label: 'Hàm lượng VOC', value: '0.00 g/L (Hoàn toàn tinh khiết hữu cơ)' },
      { label: 'Độ thoát ẩm (Perm)', value: '> 85 Perm — Bức tường biết thở tự nhiên' },
      { label: 'Hấp thụ CO2', value: 'Tự hấp thụ 1.2kg CO2/m² trong chu kỳ vôi hóa' },
      { label: 'Tuổi thọ thẩm mỹ', value: 'Càng để lâu bề mặt càng đanh chắc và đẹp' },
    ],
  },
  {
    id: 'belgian-linen',
    name: 'Vải Lanh Bỉ Dệt Thô',
    scientificName: '100% Pure Belgian Flax Linen',
    origin: 'Vùng Flanders, Vương quốc Bỉ',
    tag: 'Sợi Dệt Tự Nhiên',
    tactileFeel: 'Rủ mềm tự nhiên, hơi ráp nhẹ ban đầu nhưng mềm mượt dần sau từng lần giặt, thân thiện làn da',
    microClimateNote: 'Thấm hút mồ hôi gấp 3 lần cotton, giải phóng nhiệt độ bề mặt ghế sofa ngay lập tức khi ngồi',
    recommendedSpace: 'Rèm 2 lớp ban công hướng nắng, bọc nệm ghế bành thư giãn, chăn drap giường',
    lightResponseDay: 'Lọc ánh sáng gay gắt thành làn sương mờ dịu mắt, gió thổi qua bay nhẹ bồng bềnh',
    lightResponseNight: 'Tạo bóng đổ dệt thưa huyền ảo khi có nguồn sáng xiên từ đèn cây đọc sách góc phòng',
    swatchGradientDay: 'radial-gradient(circle at 45% 45%, #ded8ce 0%, #c4bcb0 65%, #a69c8f 100%)',
    swatchGradientNight: 'radial-gradient(circle at 45% 45%, #eedfcb 0%, #d1beaa 65%, #94806c 100%)',
    accentColor: '#A69C8F',
    specs: [
      { label: 'Thành phần', value: '100% sợi lanh tự nhiên thu hoạch thủ công' },
      { label: 'Độ bền sợi', value: 'Bền gấp 2 lần cotton và 3 lần sợi len' },
      { label: 'Tính kháng khuẩn', value: 'Tự nhiên chống ẩm mốc và bụi mịn' },
      { label: 'Độ rũ nếp', value: 'Tự tạo nếp nhăn hữu cơ thanh lịch (wabi-sabi)' },
    ],
  },
  {
    id: 'brushed-brass',
    name: 'Đồng Thau Đánh Mờ',
    scientificName: 'Hand-Brushed Architectural Brass',
    origin: 'Đúc nguyên khối & xử lý xước satin thủ công',
    tag: 'Kim Khí Nghệ Thuật',
    tactileFeel: 'Đầm nặng chắc tay, bề mặt xước sợi hairline không bóng loáng, ấm áp dần theo thân nhiệt',
    microClimateNote: 'Không bị oxy hóa gỉ xanh trong môi trường độ ẩm ven sông Sài Gòn nhờ lớp sáp ong bảo vệ',
    recommendedSpace: 'Tay nắm cửa độc bản, chân đế bàn trà, viền nẹp chuyển tiếp đá và gỗ sàn',
    lightResponseDay: 'Phản chiếu ánh kim dịu nhẹ, tạo điểm nhấn đường chỉ sang trọng mà khiêm nhường',
    lightResponseNight: 'Tỏa ánh hoàng kim ấm rực rỡ dưới ánh đèn rọi góc 15 độ, tạo điểm chốt thị giác',
    swatchGradientDay: 'radial-gradient(circle at 35% 30%, #e2c58a 0%, #ba9757 60%, #7d612e 100%)',
    swatchGradientNight: 'radial-gradient(circle at 35% 30%, #f7d88c 0%, #d4a34b 60%, #875c1c 100%)',
    accentColor: '#BA9757',
    specs: [
      { label: 'Chất liệu cốt', value: 'Hợp kim đồng thau C36000 nguyên khối' },
      { label: 'Xử lý bề mặt', value: 'Đánh xước satin satin thủ công bằng tay' },
      { label: 'Lớp bảo vệ', value: 'Sáp ong tự nhiên vi tinh thể — cho phép lên patin' },
      { label: 'Độ bền vân tay', value: 'Kháng bám dấu vân tay và chống trầy xước nhẹ' },
    ],
  },
  {
    id: 'fluted-glass',
    name: 'Kính Gợn Sóng Khung Kim Loại',
    scientificName: 'Fluted Reeded Moru Glass',
    origin: 'Kính tôi cường lực an toàn — Khung nhôm anode mỏng',
    tag: 'Kính Nghệ Thuật 3 Lớp',
    tactileFeel: 'Các rãnh sọc gợn sóng nổi đều 6mm, trơn láng êm dịu, không bám cặn nước',
    microClimateNote: 'Phân tách không gian mà không ngăn luồng gió đối lưu, giữ căn hộ luôn thông thoáng',
    recommendedSpace: 'Cửa trượt ngăn phòng làm việc, vách kính phòng tắm, cánh tủ rượu cao cấp',
    lightResponseDay: 'Bẻ gãy tia nắng thành hàng ngàn dải sáng song song lung linh huyền ảo',
    lightResponseNight: 'Biến những bóng đèn bên trong thành những dải sáng vàng nhạt mềm mại, mờ ảo kín đáo',
    swatchGradientDay: 'radial-gradient(circle at 40% 35%, #ebf1f3 0%, #c9d8de 65%, #9ab1bb 100%)',
    swatchGradientNight: 'radial-gradient(circle at 40% 35%, #fcecd7 0%, #e1cbb3 65%, #9e846b 100%)',
    accentColor: '#9AB1BB',
    specs: [
      { label: 'Quy chuẩn an toàn', value: 'Kính cường lực Temper 8mm – 10mm' },
      { label: 'Khung viền', value: 'Nhôm mạ Anode hóa siêu mỏng 15mm' },
      { label: 'Độ truyền sáng', value: '82% xuyên sáng tự nhiên nhưng mờ quang học' },
      { label: 'Hiệu quả riêng tư', value: 'Che khuất hình khối chi tiết sau 50cm' },
    ],
  },
]

const DEFAULT_MATERIAL = MATERIALS[0] as MaterialItem

export function TactileMaterialLab() {
  const [activeId, setActiveId] = useState<string>(DEFAULT_MATERIAL.id)
  const [lightingMode, setLightingMode] = useState<LightingMode>('night')

  const current: MaterialItem = MATERIALS.find((m) => m.id === activeId) ?? DEFAULT_MATERIAL

  return (
    <section
      id="phong-thi-nghiem-vat-lieu"
      data-home-section="MATERIAL_LAB"
      className={cn(
        'u-gutter relative isolate py-[clamp(4.5rem,10vh,8rem)] transition-colors duration-700 ease-editorial overflow-hidden',
        lightingMode === 'day' ? 'bg-[#ECE8DF] text-ink' : 'bg-[#141311] text-canvas',
      )}
    >
      {/* Background Ambience Ambient Glow */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-40 -right-40 h-[38rem] w-[38rem] rounded-full blur-[130px] transition-all duration-1000',
          lightingMode === 'day'
            ? 'bg-amber-200/25'
            : 'bg-accent/15',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -bottom-40 -left-40 h-[38rem] w-[38rem] rounded-full blur-[130px] transition-all duration-1000',
          lightingMode === 'day'
            ? 'bg-sky-200/20'
            : 'bg-amber-900/15',
        )}
      />

      <div className="mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Header with Lighting Mode Switcher */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b pb-8 transition-colors duration-500 border-line/40">
          <div className="max-w-2xl">
            <Label rule tone={lightingMode === 'day' ? 'ink' : 'accent'}>
              Phòng Thí Nghiệm Vật Liệu & Xúc Giác
            </Label>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.25]">
              Chạm vào chất liệu sống của tổ ấm.
            </h2>
            <p
              className={cn(
                'mt-3 text-sm sm:text-base leading-relaxed max-w-xl transition-colors duration-500',
                lightingMode === 'day' ? 'text-muted' : 'text-canvas/70',
              )}
            >
              Tại GuHomes, vật liệu không phải là lớp vỏ trang trí vô cảm. Chúng có nhịp thở, độ co giãn theo mùa mưa Sài Gòn và đối thoại cùng ánh sáng ban ngày lẫn ban đêm.
            </p>
          </div>

          {/* Interactive Lighting Mode Toggle Switch */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span
              className={cn(
                'text-xs font-mono uppercase tracking-wider',
                lightingMode === 'day' ? 'text-ink/60' : 'text-canvas/50',
              )}
            >
              Môi trường chiếu sáng:
            </span>
            <div
              role="radiogroup"
              aria-label="Chế độ chiếu sáng mẫu vật liệu"
              className={cn(
                'inline-flex items-center rounded-full p-1 border shadow-sm transition-all duration-500',
                lightingMode === 'day'
                  ? 'bg-surface border-line/60'
                  : 'bg-espresso border-canvas/20 shadow-[0_4px_20px_rgba(0,0,0,0.6)]',
              )}
            >
              <button
                type="button"
                role="radio"
                aria-checked={lightingMode === 'day'}
                onClick={() => setLightingMode('day')}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 min-h-[44px]',
                  lightingMode === 'day'
                    ? 'bg-canvas text-ink shadow-sm font-semibold'
                    : 'text-canvas/60 hover:text-canvas',
                )}
              >
                <span>☀️ Nắng Ban Ngày (5500K)</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={lightingMode === 'night'}
                onClick={() => setLightingMode('night')}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 min-h-[44px]',
                  lightingMode === 'night'
                    ? 'bg-accent text-espresso shadow-md font-semibold'
                    : 'text-ink/60 hover:text-ink',
                )}
              >
                <span>🌙 Đèn Rọi Ban Đêm (2700K)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Material Selection Nav Pills */}
        <div className="mt-8 flex gap-2.5 overflow-x-auto pb-3 scrollbar-none sm:flex-wrap">
          {MATERIALS.map((mat) => {
            const isSelected = mat.id === activeId
            return (
              <button
                key={mat.id}
                type="button"
                onClick={() => setActiveId(mat.id)}
                className={cn(
                  'group flex items-center gap-3 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-medium transition-all duration-300 min-h-[44px] flex-shrink-0',
                  isSelected
                    ? lightingMode === 'day'
                      ? 'border-ink bg-ink text-canvas shadow-md'
                      : 'border-accent bg-accent/25 text-canvas shadow-[0_0_16px_rgba(160,119,83,0.35)]'
                    : lightingMode === 'day'
                    ? 'border-line/80 bg-canvas/70 text-ink/75 hover:border-ink/40'
                    : 'border-canvas/15 bg-canvas/5 text-canvas/70 hover:border-canvas/30',
                )}
              >
                {/* Visual Swatch Mini Dot */}
                <span
                  aria-hidden="true"
                  className="h-3 w-3 rounded-full border border-canvas/30 shadow-inner"
                  style={{
                    background: lightingMode === 'day' ? mat.swatchGradientDay : mat.swatchGradientNight,
                  }}
                />
                <span>{mat.name}</span>
                {isSelected && <span className="text-[10px] opacity-75 font-mono">●</span>}
              </button>
            )
          })}
        </div>

        {/* Material Interactive Stage Area */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* Left Column: Big Tactile Specimen Swatch with Dynamic Lighting Simulation */}
          <div className="lg:col-span-6 flex flex-col">
            <div
              className={cn(
                'relative flex-1 min-h-[380px] sm:min-h-[460px] rounded-2xl border p-8 sm:p-10 overflow-hidden flex flex-col justify-between transition-all duration-700 shadow-2xl',
                lightingMode === 'day'
                  ? 'border-line/60 bg-surface shadow-black/5'
                  : 'border-canvas/15 bg-espresso shadow-black/80',
              )}
            >
              {/* Dynamic Physical Swatch Backdrop */}
              <div
                aria-hidden="true"
                className="absolute inset-0 transition-all duration-1000 ease-editorial"
                style={{
                  background:
                    lightingMode === 'day' ? current.swatchGradientDay : current.swatchGradientNight,
                  opacity: 0.92,
                }}
              />

              {/* Surface Micro-Texture & Optical Specular Highlights */}
              <div
                aria-hidden="true"
                className={cn(
                  'absolute inset-0 pointer-events-none transition-opacity duration-700 mix-blend-overlay',
                  lightingMode === 'day'
                    ? 'opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-black/40'
                    : 'opacity-50 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-200 via-transparent to-black/80',
                )}
              />

              {/* Top Bar inside Swatch Card */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-md px-3 py-1 text-[11px] font-mono uppercase tracking-widest text-white/90">
                    {current.tag}
                  </span>
                  <div className="mt-3 text-xs text-white/70 font-mono">
                    {current.scientificName}
                  </div>
                </div>

                {/* Lighting Status Badge */}
                <div className="rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-3.5 py-1.5 text-[11px] font-mono text-white/90 shadow-lg">
                  {lightingMode === 'day' ? '☀️ 5500K Daylight' : '🌙 2700K Warm Dim'}
                </div>
              </div>

              {/* Bottom Tactile Feedback inside Swatch */}
              <div className="relative z-10 mt-20 pt-6 border-t border-white/20 bg-black/25 backdrop-blur-md -mx-8 -mb-8 sm:-mx-10 sm:-mb-10 p-6 sm:p-8 rounded-b-2xl">
                <div className="text-[11px] uppercase tracking-wider font-mono text-amber-200/90 mb-1">
                  Phản ứng quang học theo thời điểm:
                </div>
                <p className="text-sm sm:text-base text-white font-body leading-relaxed">
                  {lightingMode === 'day' ? current.lightResponseDay : current.lightResponseNight}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Analysis & Microclimate Diagnostics */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div
              className={cn(
                'rounded-2xl border p-7 sm:p-9 transition-all duration-500 flex flex-col gap-6',
                lightingMode === 'day'
                  ? 'bg-surface/90 border-line/60'
                  : 'bg-espresso/90 border-canvas/15',
              )}
            >
              {/* Header Info */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent mb-2">
                  <span>Xuất xứ nguồn gốc:</span>
                  <span className="font-semibold text-inherit">{current.origin}</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-normal">
                  {current.name}
                </h3>
              </div>

              {/* Sensory Tactile Feel Description */}
              <div className="border-t border-line/40 pt-5">
                <div className="text-xs font-mono uppercase tracking-wider text-muted mb-2">
                  Cảm nhận xúc giác thực tế (Tactile Experience):
                </div>
                <p className="text-sm sm:text-base leading-relaxed">
                  {current.tactileFeel}
                </p>
              </div>

              {/* Saigon Tropical Microclimate Resilience */}
              <div
                className={cn(
                  'rounded-xl p-5 border transition-colors duration-500',
                  lightingMode === 'day'
                    ? 'bg-canvas border-line/70'
                    : 'bg-canvas/5 border-canvas/10',
                )}
              >
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent mb-1.5">
                  <span>⚡ Thích ứng vi khí hậu Sài Gòn (80% ẩm quanh năm):</span>
                </div>
                <p className="text-xs sm:text-sm leading-relaxed text-inherit opacity-90">
                  {current.microClimateNote}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 border-t border-line/40 pt-5">
                {current.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className={cn(
                      'rounded-lg p-3 border text-xs',
                      lightingMode === 'day'
                        ? 'bg-canvas/60 border-line/60'
                        : 'bg-canvas/5 border-canvas/10',
                    )}
                  >
                    <div className="text-[11px] font-mono text-muted mb-1">{spec.label}</div>
                    <div className="font-medium text-inherit">{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Recommended Space & Application */}
              <div className="border-t border-line/40 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-muted">Không gian tối ưu: </span>
                  <strong className="text-inherit">{current.recommendedSpace}</strong>
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl border border-line/40 bg-surface/40">
              <div className="text-xs text-muted">
                Bạn muốn trực tiếp sờ mẫu vật liệu tại studio GuHomes?
              </div>
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-accent hover:bg-accent-soft text-espresso font-medium text-xs transition-all hover:scale-105 active:scale-95 shadow-md min-h-[44px]"
              >
                <span>Hẹn Giờ Ghé Thăm Studio & Xưởng Mộc</span>
                <ArrowUpRightIcon className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
