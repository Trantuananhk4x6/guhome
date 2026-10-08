'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type TextileId = 'belgian-linen' | 'thermal-ceramic' | 'kvadrat-wool' | 'baoloc-silk'

export type SunTimeHour = 10 | 14 | 17.5

interface SunTimeConfig {
  hour: SunTimeHour
  labelVi: string
  ambientTempC: number
  solarRadiationWm2: number
  sunColorHex: string
  narrativeVi: string
}

const SUN_TIMES: Record<string, SunTimeConfig> = {
  '10': {
    hour: 10,
    labelVi: '10:00 Sáng · Nắng Xiên Nhẹ',
    ambientTempC: 31,
    solarRadiationWm2: 520,
    sunColorHex: '#FEEBC8',
    narrativeVi: 'Góc nắng xiên chiếu vào khung cửa kính, ánh sáng ban mai dịu êm.',
  },
  '14': {
    hour: 14,
    labelVi: '14:00 Chiều · Nắng Gắt Nhiệt Đới 38°C',
    ambientTempC: 38,
    solarRadiationWm2: 980,
    sunColorHex: '#FBD38D',
    narrativeVi: 'Bức xạ mặt trời hướng Tây đạt đỉnh điểm, nhiệt lượng xuyên kính cực đại.',
  },
  '17.5': {
    hour: 17.5,
    labelVi: '17:30 Chiều · Hoàng Hôn Vàng Hổ Phách',
    ambientTempC: 33,
    solarRadiationWm2: 410,
    sunColorHex: '#F6AD55',
    narrativeVi: 'Ánh nắng hoàng hôn sông Sài Gòn đổ bóng dài, sắc vàng ấm áp bao phủ không gian.',
  },
}

interface TextileSpec {
  id: TextileId
  nameVi: string
  subtitleVi: string
  originVi: string
  compositionVi: string
  weightGsm: number
  lightTransmittancePercent: number
  shgcRating: number
  acousticNrc: number
  tactileHandFeelVi: string
  primaryApplicationVi: string
  tagVi: string
  descriptionVi: string
  icon: string
  patternHexBg: string
  patternHexAccent: string
}

const TEXTILES_DATA: Record<TextileId, TextileSpec> = {
  'belgian-linen': {
    id: 'belgian-linen',
    nameVi: 'Vải Lanh Thô Bỉ Dệt Tay Mộc',
    subtitleVi: 'Belgian Raw Loom Linen · 100% Sợi Lanh Hữu Cơ',
    originVi: 'Vùng Meulebeke, Vương quốc Bỉ (Tiêu chuẩn Masters of Linen)',
    compositionVi: '100% Sợi lanh tự nhiên thu hoạch thủ công, không tẩy trắng hóa chất',
    weightGsm: 380,
    lightTransmittancePercent: 38,
    shgcRating: 0.38,
    acousticNrc: 0.45,
    tactileHandFeelVi: 'Đanh mát, gợn sần thô mộc hạt lanh, rủ nếp tự nhiên sau mỗi lần giặt hơi nước',
    primaryApplicationVi: 'Lớp rèm chính phòng khách & phòng sinh hoạt chung đón gió sông',
    tagVi: 'Thở Cùng Gió Sông · Thấm Hút Ẩm Tự Nhiên',
    descriptionVi:
      'Vải lanh Bỉ là linh hồn của sự thanh lịch thầm lặng. Cấu trúc mao dẫn sợi lanh có thể ngậm ẩm đến 20% trọng lượng mà không hề cảm giác ướt tay, giúp điều hòa độ ẩm không khí phòng khách trong mùa mưa Sài Gòn.',
    icon: '🌾',
    patternHexBg: '#E9E3D5',
    patternHexAccent: '#C9BC9F',
  },
  'thermal-ceramic': {
    id: 'thermal-ceramic',
    nameVi: 'Lớp Lót Cản Nhiệt Bạc Gốm Nano Ceramic',
    subtitleVi: 'Blackout & Thermal Barrier · Cản 99.8% UV Hướng Tây',
    originVi: 'Công nghệ dệt đa lớp cách nhiệt sản xuất tại Đức',
    compositionVi: 'Màng gốm siêu mịn Nano-Ceramic tráng trên nền sợi dệt vi sợi Microfiber',
    weightGsm: 290,
    lightTransmittancePercent: 0.2,
    shgcRating: 0.12,
    acousticNrc: 0.55,
    tactileHandFeelVi: 'Mềm mượt không sột soạt, không mùi nhựa vinyl tổng hợp, an toàn tuyệt đối',
    primaryApplicationVi: 'Lớp rèm cản sáng âm trần cho phòng ngủ Master hướng chính Tây',
    tagVi: 'Lá Chắn Nắng Tây · Giảm 6°C Nhiệt Độ Phòng',
    descriptionVi:
      'Khác với các loại rèm tráng cao su rẻ tiền thường phát sinh mùi hôi nồng nặc dưới nắng nóng 38°C của Sài Gòn, lớp lót gốm nano của GuHomes phản xạ 99.8% tia cực tím và hạ nhiệt bức xạ bề mặt kính lên tới 6°C.',
    icon: '🛡️',
    patternHexBg: '#3E424B',
    patternHexAccent: '#68707D',
  },
  'kvadrat-wool': {
    id: 'kvadrat-wool',
    nameVi: 'Dạ Len Tự Nhiên Kvadrat Melange Đan Mạch',
    subtitleVi: 'Architectural Acoustic Wool · Hệ Số Tiêu Âm NRC 0.75',
    originVi: 'Hãng dệt Kvadrat danh tiếng, Ebeltoft, Đan Mạch',
    compositionVi: '90% Lông cừu nguyên chất New Zealand chải kỹ + 10% Sợi nylon gia cường',
    weightGsm: 520,
    lightTransmittancePercent: 5,
    shgcRating: 0.28,
    acousticNrc: 0.75,
    tactileHandFeelVi: 'Mềm xốp, ấm áp xúc giác, bề mặt phối sợi Melange hai tông màu tinh tế',
    primaryApplicationVi: 'Bọc vách tiêu âm đầu giường ngủ, rèm phòng nghe nhạc hi-end & rạp phim gia đình',
    tagVi: 'Tiêu Âm Đẳng Cấp · Triệt Tiêu Tiếng Vang',
    descriptionVi:
      'Dạ len lông cừu Kvadrat sở hữu hệ số tiêu âm NRC ấn tượng lên đến 0.75 ở dải tần số trung và cao. Giúp triệt tiêu hoàn toàn hiện tượng phản xạ âm thanh dội lại từ kính và tường bê tông, mang lại giấc ngủ tĩnh tại tuyệt đối.',
    icon: '🐑',
    patternHexBg: '#7A6B5D',
    patternHexAccent: '#9E8D7C',
  },
  'baoloc-silk': {
    id: 'baoloc-silk',
    nameVi: 'Lụa Tơ Tằm Bảo Lộc Dệt Mộc Truyền Thống',
    subtitleVi: 'Pure Mulberry Raw Silk · Hương Thơm Kén Tằm Tự Nhiên',
    originVi: 'Vùng cao nguyên Bảo Lộc, Lâm Đồng, Việt Nam',
    compositionVi: '100% Sợi tơ tằm dâu tằm tự nhiên ươm tơ kéo sợi thủ công',
    weightGsm: 180,
    lightTransmittancePercent: 45,
    shgcRating: 0.42,
    acousticNrc: 0.3,
    tactileHandFeelVi: 'Mềm mướt như làn mây, óng ánh khúc xạ ánh sáng huyền ảo theo từng góc nhìn',
    primaryApplicationVi: 'Chao đèn hắt vách nghệ thuật, rèm voan trang trí phòng trà thiền & gối tựa sofa',
    tagVi: 'Tinh Hoa Bản Địa · Khúc Xạ Ánh Sáng Huyền Ảo',
    descriptionVi:
      'Được dệt từ những sợi tơ tằm tự nhiên óng ả của vùng cao nguyên đất đỏ Bảo Lộc. Khi ánh nắng hoàng hôn hoặc ánh đèn Warm Dim 2200K xuyên qua, thớ lụa tán xạ ánh sáng vàng óng ả, đem lại chất thơ sâu lắng cho tư gia.',
    icon: '🦋',
    patternHexBg: '#F3E5D8',
    patternHexAccent: '#D4BBA5',
  },
}

export function TactileTextileDraperyLab({ className }: { className?: string } = {}) {
  const [selectedTextileId, setSelectedTextileId] = useState<TextileId>('belgian-linen')
  const [selectedHour, setSelectedHour] = useState<SunTimeHour>(14)
  const uniqueId = useId()

  const textile = TEXTILES_DATA[selectedTextileId] ?? TEXTILES_DATA['belgian-linen']
  const sunTime = SUN_TIMES[String(selectedHour)] ?? SUN_TIMES['14']!

  // Calculate simulated room temperature behind the fabric
  const simulatedRoomTempC =
    Math.round((sunTime.ambientTempC - (1 - textile.shgcRating) * (sunTime.solarRadiationWm2 / 180)) * 10) / 10

  // Calculate light transmitted through window + curtain
  const luxOutside = Math.round(sunTime.solarRadiationWm2 * 110)
  const luxInside = Math.round(luxOutside * (textile.lightTransmittancePercent / 100))

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Vật Liệu Vải Dệt Xúc Giác · GuHomes Drapery Lab
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Chống Nắng Tây Vi Khí Hậu
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Phòng Thí Nghiệm Rèm &amp; Vải Dệt Xúc Giác Nhiệt Đới
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              Rèm cửa trong không gian Quiet Luxury không chỉ để trang trí. Đó là bộ màng lọc vi khí hậu bảo vệ sự tĩnh
              lặng, chắn bức xạ nhiệt hướng Tây và nâng niu giác quan tiếp xúc của gia chủ.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Tiêu chuẩn kiểm định:</span>
            <span className="text-xs font-mono font-medium text-ink bg-canvas px-3 py-1.5 rounded-full border border-line">
              EN 14501 · ISO 354 Acoustic
            </span>
          </div>
        </div>

        {/* Sun Exposure Time Selector Bar */}
        <div className="mt-8 rounded-2xl border border-line bg-canvas p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line/60 pb-5">
            <div>
              <span className="text-xs font-mono text-muted uppercase tracking-wider">
                Giả Lập Nắng Hướng Tây Sài Gòn
              </span>
              <div className="text-sm font-serif text-ink mt-0.5 font-normal">
                {sunTime.labelVi} · Bức Xạ: {sunTime.solarRadiationWm2} W/m² · Nhiệt Độ Ngoài Trời: {sunTime.ambientTempC}°C
              </div>
            </div>

            <div className="flex items-center gap-2">
              {([10, 14, 17.5] as SunTimeHour[]).map((hr) => {
                const isSelected = selectedHour === hr
                return (
                  <button
                    key={hr}
                    type="button"
                    onClick={() => setSelectedHour(hr)}
                    className={cn(
                      'min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium transition-all',
                      isSelected
                        ? 'bg-accent text-canvas font-semibold shadow-sm'
                        : 'bg-surface hover:bg-surface-hover text-muted hover:text-ink border border-line'
                    )}
                  >
                    {hr === 10 ? '10:00 Sáng' : hr === 14 ? '14:00 Chiều Nắng Gắt' : '17:30 Hoàng Hôn'}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Interactive Textile Cards Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(Object.keys(TEXTILES_DATA) as TextileId[]).map((id) => {
              const item = TEXTILES_DATA[id]
              const isSelected = selectedTextileId === id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedTextileId(id)}
                  className={cn(
                    'group relative text-left rounded-xl p-5 border transition-all duration-300 min-h-[150px] flex flex-col justify-between',
                    isSelected
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/30 shadow-md'
                      : 'border-line bg-surface/60 hover:border-line-hover hover:bg-surface'
                  )}
                >
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
                      {item.weightGsm} gsm
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="font-serif text-sm font-medium text-ink leading-snug group-hover:text-accent">
                      {item.nameVi}
                    </div>
                    <div className="mt-1 text-xs text-muted line-clamp-1">{item.tagVi}</div>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeTextileIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Deep Sensory & Microclimate Comparison Stage */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Real-Time Optical & Thermal Visualizer */}
          <div className="lg:col-span-5 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            {/* Visual Sunbeam & Curtain Diffusion Animation */}
            <div className="relative h-64 w-full rounded-xl overflow-hidden border border-line flex items-center justify-center bg-stone-950">
              {/* Outer Sunlight Simulation */}
              <div
                className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 10% 20%, ${sunTime.sunColorHex} 0%, transparent 70%)`,
                  opacity: selectedHour === 14 ? 0.9 : selectedHour === 17.5 ? 0.6 : 0.4,
                }}
              />

              {/* Curtain Fabric Graphic Representation */}
              <div
                className="relative z-10 w-48 h-56 rounded-lg shadow-2xl transition-all duration-500 flex flex-col justify-between p-4 border border-white/20"
                style={{
                  backgroundColor: textile.patternHexBg,
                  color: textile.patternHexAccent,
                }}
              >
                <div className="text-[11px] font-mono font-semibold tracking-wider uppercase opacity-80">
                  {textile.id}
                </div>
                <div className="text-center font-serif text-xs font-normal text-stone-900 bg-white/70 px-2 py-1 rounded backdrop-blur-sm">
                  Cản sáng: {100 - textile.lightTransmittancePercent}%
                </div>
                <div className="text-[10px] font-mono text-stone-800 text-right">NRC {textile.acousticNrc}</div>
              </div>

              {/* Light Halo Effect passing through */}
              <div
                className="absolute right-0 top-0 bottom-0 w-2/3 pointer-events-none transition-all duration-700"
                style={{
                  background: `linear-gradient(to right, transparent, ${sunTime.sunColorHex})`,
                  opacity: (textile.lightTransmittancePercent / 100) * 0.45,
                }}
              />
            </div>

            {/* Environmental Readout Cards */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-line bg-surface p-4">
                <span className="text-[11px] font-mono text-muted uppercase">Nhiệt độ trong phòng</span>
                <div className="mt-1 text-2xl font-serif text-accent font-semibold">
                  {simulatedRoomTempC}°C
                </div>
                <span className="text-[10px] text-muted">
                  Hạ {Math.round((sunTime.ambientTempC - simulatedRoomTempC) * 10) / 10}°C so với ngoài trời
                </span>
              </div>

              <div className="rounded-xl border border-line bg-surface p-4">
                <span className="text-[11px] font-mono text-muted uppercase">Độ rọi ánh sáng xuyên</span>
                <div className="mt-1 text-2xl font-serif text-ink font-semibold">
                  {luxInside} <span className="text-xs font-normal text-muted">lux</span>
                </div>
                <span className="text-[10px] text-muted">Từ {luxOutside} lux ngoài trời</span>
              </div>
            </div>
          </div>

          {/* Right Column: Deep Tactile Notes & Specifications */}
          <div className="lg:col-span-7 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{textile.icon}</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal">{textile.nameVi}</h3>
              </div>
              <p className="mt-1 text-xs font-mono text-accent">{textile.subtitleVi}</p>

              <p className="mt-4 text-sm sm:text-base text-muted font-light leading-relaxed">
                {textile.descriptionVi}
              </p>

              {/* Tactile Hand-Feel Focus Box */}
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                  <span>🖐️</span>
                  <span>Cảm Giác Xúc Giác Chạm Tay (Tactile Note)</span>
                </div>
                <p className="mt-2 text-sm text-ink font-serif italic leading-relaxed">
                  &ldquo;{textile.tactileHandFeelVi}&rdquo;
                </p>
              </div>

              {/* 4 Technical Parameters */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="rounded-lg border border-line bg-surface/50 p-3.5">
                  <span className="text-[11px] font-mono uppercase text-muted">Nguồn gốc &amp; Chứng nhận</span>
                  <div className="mt-1 text-xs font-medium text-ink">{textile.originVi}</div>
                </div>

                <div className="rounded-lg border border-line bg-surface/50 p-3.5">
                  <span className="text-[11px] font-mono uppercase text-muted">Thành phần sợi tự nhiên</span>
                  <div className="mt-1 text-xs font-medium text-ink">{textile.compositionVi}</div>
                </div>

                <div className="rounded-lg border border-line bg-surface/50 p-3.5">
                  <span className="text-[11px] font-mono uppercase text-muted">Hệ số tiêu âm (NRC)</span>
                  <div className="mt-1 text-xs font-medium text-ink">
                    NRC {textile.acousticNrc} · Triệt tiêu tiếng vọng
                  </div>
                </div>

                <div className="rounded-lg border border-line bg-surface/50 p-3.5">
                  <span className="text-[11px] font-mono uppercase text-muted">Ứng dụng khuyên dùng</span>
                  <div className="mt-1 text-xs font-medium text-ink">{textile.primaryApplicationVi}</div>
                </div>
              </div>
            </div>

            {/* Bottom Consultation CTA */}
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-muted">
                Tại Studio GuHomes có sẵn 80+ mẫu vải dệt thật để bạn trực tiếp chạm và cảm nhận.
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/contact"
                  className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-canvas hover:bg-accent-hover transition-all"
                >
                  <span>Đặt Lịch Thử Vải Tại Studio</span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
