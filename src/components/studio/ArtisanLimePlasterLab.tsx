'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type PlasterId = 'tadelakt' | 'straw-ash' | 'marmorino' | 'raw-earth'

interface PlasterDetail {
  id: PlasterId
  numberVi: string
  nameVi: string
  subtitleVi: string
  compositionVi: string
  textureVi: string
  tagVi: string
  tactileNoteVi: string
  craftsmanshipVi: string
  descriptionVi: string
  phValue: number
  vaporPermeability: string
  vocLevel: string
  recommendedZoneVi: string
  bgPattern: string
  accentColor: string
}

const PLASTER_DATA: Record<PlasterId, PlasterDetail> = {
  tadelakt: {
    id: 'tadelakt',
    numberVi: '01',
    nameVi: 'Vôi Thô Tadelakt Ma-rốc Chống Thấm',
    subtitleVi: 'Moroccan Waterproof Tadelakt · Đánh Bóng Đá Mã Não Tự Nhiên',
    compositionVi: 'Vôi tôi 3 năm ủ nước ngầm + Bột đá cẩm thạch + Xà phòng dầu ô liu đen',
    textureVi: 'Láng mướt như lụa nhưng ẩn chứa độ gồ ghề vi mô của đá tự nhiên, hoàn toàn không mối nối gạch',
    tagVi: 'Kháng Nước Tuyệt Đối · Phòng Tắm Master',
    tactileNoteVi: 'Chạm tay vào bề mặt có cảm giác mát lạnh như ngọc thạch, các đường cong hữu cơ chuyển tiếp mềm mại không gờ cạnh nhọn.',
    craftsmanshipVi: 'Nghệ nhân dùng viên đá mã não sông tự nhiên xoa ép miết bóng từng milimet bề mặt cùng bọt xà phòng ô liu, tạo phản ứng hóa xà phòng canxi kỵ nước 100%.',
    descriptionVi:
      'Tadelakt là tuyệt kỹ vữa vôi nghìn năm từ vùng Marrakech. Tại GuHomes, chúng tôi áp dụng kỹ thuật này cho các mảng tường buồng tắm lộ thiên, bồn tắm uốn lượn và vách lavabo của các căn Penthouse. Tường kháng nước hoàn toàn mà vẫn giữ được hơi thở mộc mạc, không bao giờ xảy ra ố mốc ron gạch.',
    phValue: 12.8,
    vaporPermeability: 'Kháng nước bề mặt nhưng vi mao quản thoát ẩm ngược 1-chiều',
    vocLevel: '0.00 g/L (Thuần khoáng hữu cơ)',
    recommendedZoneVi: 'Phòng tắm Master, Vách buồng tắm đứng, Hồ sục Jacuzzi trong nhà, Đảo bếp nguyên khối',
    bgPattern: 'radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.08), transparent 70%), linear-gradient(135deg, #1c1a16 0%, #12110e 100%)',
    accentColor: '#d4af37',
  },
  'straw-ash': {
    id: 'straw-ash',
    numberVi: '02',
    nameVi: 'Vữa Vôi Bát Tràng Tro Rơm Nếp',
    subtitleVi: 'Straw & Ash Mineral Plaster · Hương Rơm Sau Cơn Mưa Hạ',
    compositionVi: 'Vôi vòm cổ truyền + Tro trấu hữu cơ + Sợi rơm nếp đồng bằng Bắc Bộ + Bột phù sa sông Hồng',
    textureVi: 'Bề mặt lì mờ thô ráp tinh tế, lấp lánh các sợi rơm nếp tự nhiên đan cài ngẫu hứng dưới ánh sáng',
    tagVi: 'Ấm Áp Thiền Định · Thư Viện & Phòng Trà',
    tactileNoteVi: 'Ráp nhẹ dịu êm của xơ rơm mục, mùi thơm mộc mạc của đất ẩm gợi nhớ không gian làng quê Việt Nam thanh bình.',
    craftsmanshipVi: 'Rơm nếp được ủ lên men tự nhiên với nước vôi trong 45 ngày trước khi phối trộn bằng cối giã thủ công, giúp sợi rơm dẻo dai liên kết vĩnh cửu trong cốt vữa.',
    descriptionVi:
      'Một chất liệu tường đậm tính bản địa Việt Nam. Ánh sáng vàng dịu xuyên qua những sợi rơm nếp ẩn hiện trong lớp vữa vôi xám tro tạo nên một trường năng lượng tĩnh lặng tuyệt đối cho phòng trà thiền và thư viện tư gia.',
    phValue: 12.5,
    vaporPermeability: 'Thoát ẩm cực cao (μ = 8) — Tự cân bằng vi khí hậu phòng kín',
    vocLevel: '0.00 g/L (100% tự nhiên không phụ gia hóa học)',
    recommendedZoneVi: 'Phòng thưởng trà, Thư viện cá nhân, Vách đầu giường Master, Không gian thiền định',
    bgPattern: 'radial-gradient(ellipse at 70% 30%, rgba(194,157,89,0.1), transparent 70%), linear-gradient(135deg, #191815 0%, #0f0e0c 100%)',
    accentColor: '#c29d59',
  },
  marmorino: {
    id: 'marmorino',
    numberVi: '03',
    nameVi: 'Vôi Bột Đá Cẩm Thạch Roman Marmorino',
    subtitleVi: 'Crushed Carrara Marble Plaster · Bề Mặt Satin Tán Quang Êm Dịu',
    compositionVi: 'Bột đá cẩm thạch trắng Carrara Ý siêu mịn + Vôi tôi ngậm nước Slaked Lime Calchera San Giorgio',
    textureVi: 'Bề mặt mướt satin mờ ảo, có chiều sâu quang học 3D nhiều tầng khi ánh sáng tự nhiên lướt qua',
    tagVi: 'Kinh Điển Cung Điện · Phòng Khách Đại Sảnh',
    tactileNoteVi: 'Mịn như một tấm đá cẩm thạch nguyên khối được đánh bóng bằng nỉ thủ công, không để lại bất kỳ gợn lăn sơn công nghiệp.',
    craftsmanshipVi: 'Thi công tối thiểu 3 lớp xoa bay bằng bay inox thép Thụy Sĩ siêu mỏng, lớp sau khóa lớp trước tạo độ đan xen ánh sáng sâu hun hút.',
    descriptionVi:
      'Marmorino kế thừa từ kỹ thuật kiến trúc thời La Mã cổ đại và thời Phục Hưng thành Venice. Bột đá cẩm thạch thật mang lại khả năng phản xạ ánh sáng tự nhiên tuyệt mỹ, khiến không gian phòng khách bừng sáng dịu êm mà không hề bị lóa mắt.',
    phValue: 13.0,
    vaporPermeability: 'Độ thoát hơi nước cao (μ = 12), tường thở liên tục 24/7',
    vocLevel: '0.00 g/L (Không chứa Formaldehyde hay dung môi)',
    recommendedZoneVi: 'Đại sảnh phòng khách Penthouse, Vách thông tầng Duplex, Hành lang nghệ thuật Gallery',
    bgPattern: 'radial-gradient(ellipse at 50% 20%, rgba(232,228,223,0.06), transparent 70%), linear-gradient(135deg, #181816 0%, #0d0d0c 100%)',
    accentColor: '#e8e4df',
  },
  'raw-earth': {
    id: 'raw-earth',
    numberVi: '04',
    nameVi: 'Vữa Đất Sét Bazan Tự Nhiên Thô Mộc',
    subtitleVi: 'Raw Earth Clay Render · Tự Cân Bằng Độ Ẩm & Cách Âm Phòng Ngủ',
    compositionVi: 'Đất sét bazan màu đỏ đất nung cao nguyên + Cát thạch anh sông + Sợi lanh gia cường tự nhiên',
    textureVi: 'Mộc mạc nguyên bản, màu đất ấm đầm mắt, hấp thụ âm thanh dội lại và triệt tiêu tiếng vang',
    tagVi: 'Hút Ẩm Tự Nhiên · Phòng Ngủ Master',
    tactileNoteVi: 'Đầm ấm và mộc mạc, tạo cảm giác được bao bọc an lành như trở về với lòng mẹ tự nhiên.',
    craftsmanshipVi: 'Đất sét được nhào nặn thủ công cùng nước giếng khoan không hóa chất clo, tạo hình gợn sóng bay hữu cơ không phẳng lì máy móc.',
    descriptionVi:
      'Đất sét có cấu trúc phiến vi mô đặc biệt có khả năng hút bớt hơi ẩm dư thừa khi độ ẩm Sài Gòn vượt 85% và nhả lại độ ẩm khi phòng bật máy lạnh khô ráo. Đây là tấm màng phổi sinh thái tự nhiên lý tưởng cho giấc ngủ sâu.',
    phValue: 11.5,
    vaporPermeability: 'Khả năng điều tiết độ ẩm nội thất đạt tiêu chuẩn DIN 18947 của Đức',
    vocLevel: '0.00 g/L (Hoàn toàn không nung, không phát thải CO2)',
    recommendedZoneVi: 'Phòng ngủ Master, Phòng em bé sơ sinh, Phòng nghe nhạc Hi-End, Phòng Yoga & Spa tại gia',
    bgPattern: 'radial-gradient(ellipse at 30% 80%, rgba(184,115,51,0.1), transparent 70%), linear-gradient(135deg, #1a1614 0%, #100d0b 100%)',
    accentColor: '#b87333',
  },
}

export function ArtisanLimePlasterLab({ className }: { className?: string } = {}) {
  const [selectedPlaster, setSelectedPlaster] = useState<PlasterId>('tadelakt')
  const [rakingAngle, setRakingAngle] = useState<15 | 45 | 75>(45)
  const [compareMode, setCompareMode] = useState<boolean>(false)
  const [sampleRequested, setSampleRequested] = useState<boolean>(false)

  const current = PLASTER_DATA[selectedPlaster]

  // Dynamic shadow and lighting calculation based on raking angle
  const shadowIntensity = rakingAngle === 15 ? '0 12px 28px rgba(0,0,0,0.85), inset 0 2px 8px rgba(255,255,255,0.12)' : rakingAngle === 45 ? '0 6px 16px rgba(0,0,0,0.6), inset 0 1px 4px rgba(255,255,255,0.08)' : '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.04)'

  const lightGradient = rakingAngle === 15
    ? 'linear-gradient(15deg, rgba(255,245,230,0.18) 0%, rgba(20,20,18,0.95) 70%)'
    : rakingAngle === 45
    ? 'linear-gradient(45deg, rgba(255,245,230,0.12) 0%, rgba(20,20,18,0.92) 80%)'
    : 'linear-gradient(75deg, rgba(255,245,230,0.06) 0%, rgba(20,20,18,0.95) 90%)'

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0c0a] py-24 text-[#e8e4df] border-t border-[#1c1c1a]', className)}>
      {/* Background radial atmosphere */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${current.accentColor}15, transparent 60%)`,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2b2b28] bg-[#141412] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#d4af37]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
            Vật Liệu Tường Xúc Giác · Wabi-Sabi Mineral Surface
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Phòng Thí Nghiệm Vữa Vôi Khoáng Tự Nhiên
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Trong kiến trúc Quiet Luxury, tường không dùng sơn hóa chất công nghiệp bóng lộn. Chúng tôi xoa bay thủ công các lớp vữa vôi khoáng tự nhiên ngậm nước, mang vi khí hậu mát lành và vẻ đẹp trầm tích thời gian vào tư gia.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="mb-10 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {(Object.keys(PLASTER_DATA) as PlasterId[]).map((key) => {
            const item = PLASTER_DATA[key]
            const isActive = selectedPlaster === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedPlaster(key)}
                className={cn(
                  'group relative flex flex-col p-4 text-left transition-all duration-300 rounded-lg border min-h-[96px]',
                  isActive
                    ? 'border-[#d4af37]/60 bg-[#171714] text-[#f4efe6] shadow-lg shadow-black/40'
                    : 'border-[#22221f] bg-[#11110f] text-[#8e8a83] hover:border-[#383832] hover:bg-[#141412]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#d4af37]">{item.numberVi}</span>
                  <span
                    className="h-2 w-2 rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: item.accentColor,
                      transform: isActive ? 'scale(1.2)' : 'scale(0.8)',
                      opacity: isActive ? 1 : 0.4,
                    }}
                  />
                </div>
                <h3 className="mt-2 text-sm sm:text-base font-medium line-clamp-1 group-hover:text-[#f4efe6]">
                  {item.nameVi.split(' ')[0]} {item.nameVi.split(' ')[1]} {item.nameVi.split(' ')[2] || ''}
                </h3>
                <span className="mt-1 text-xs text-[#706c66] line-clamp-1">{item.tagVi.split(' · ')[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch">
          {/* Left Column: Visual Plaster Texture & Raking Light Simulator (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#242421] bg-[#121210] p-6 sm:p-8">
            <div>
              {/* Texture Canvas Frame */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-lg border border-[#2e2e2a] shadow-2xl">
                {/* Texture Base Layer */}
                <div
                  className="absolute inset-0 transition-all duration-700"
                  style={{
                    background: current.bgPattern,
                  }}
                />

                {/* Simulated Raking Light Beam */}
                <div
                  className="pointer-events-none absolute inset-0 transition-all duration-500"
                  style={{
                    background: lightGradient,
                    boxShadow: shadowIntensity,
                  }}
                />

                {/* Hand-trowel Strokes & Micro-texture noise */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px), radial-gradient(circle at 20% 80%, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '24px 24px, 36px 36px',
                  }}
                />

                {/* Compare Mode Watermark / Overlay */}
                {compareMode && (
                  <div className="absolute inset-y-0 right-0 w-1/2 border-l border-red-500/40 bg-black/60 p-4 backdrop-blur-sm flex flex-col justify-center">
                    <span className="inline-block rounded bg-red-950/70 border border-red-500/40 px-2 py-0.5 font-mono text-[10px] text-red-400 mb-2">
                      SƠN CÔNG NGHIỆP LATEX/ACRYLIC
                    </span>
                    <p className="text-xs text-[#a8a29e] leading-snug">
                      Màng nhựa hóa dầu bịt kín lỗ thở tường, dễ phồng rộp mốc đen sau mùa nồm ẩm Sài Gòn. Phát thải VOC độc hại trong phòng ngủ.
                    </p>
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-[#0c0c0a]/80 px-2.5 py-1 font-mono text-xs text-[#d4af37] backdrop-blur-md border border-[#2b2b28]">
                    Góc Chiếu: {rakingAngle}° Xiên
                  </span>
                  <span className="rounded bg-[#0c0c0a]/80 px-2.5 py-1 text-xs text-[#e8e4df] backdrop-blur-md border border-[#2b2b28]">
                    {current.tagVi}
                  </span>
                </div>

                {/* Tactile prompt overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded bg-[#0c0c0a]/85 p-3 backdrop-blur-md border border-[#262623] flex items-center justify-between text-xs text-[#c4beb5]">
                  <span className="italic line-clamp-1 sm:line-clamp-none">
                    &ldquo;{current.tactileNoteVi}&rdquo;
                  </span>
                </div>
              </div>

              {/* Raking Light Controls Bar */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#1f1f1d] pt-6">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#8e8a83] mb-2">
                    Góc Ánh Sáng Xiên (Raking Light Slider)
                  </label>
                  <div className="inline-flex rounded-md border border-[#2e2e2a] bg-[#171714] p-1">
                    {[
                      { deg: 15, label: '15° Xiên Gắt (Nổi vân bay)' },
                      { deg: 45, label: '45° Ánh Sáng Tự Nhiên' },
                      { deg: 75, label: '75° Tán Quang Hoàng Hôn' },
                    ].map((item) => (
                      <button
                        key={item.deg}
                        type="button"
                        onClick={() => setRakingAngle(item.deg as 15 | 45 | 75)}
                        className={cn(
                          'rounded px-3 py-1.5 text-xs transition-colors',
                          rakingAngle === item.deg
                            ? 'bg-[#d4af37] text-black font-semibold'
                            : 'text-[#a8a29e] hover:text-[#f4efe6]'
                        )}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCompareMode(!compareMode)}
                    className={cn(
                      'rounded-md border px-3.5 py-2 text-xs font-medium transition-all duration-300',
                      compareMode
                        ? 'border-red-500/60 bg-red-950/40 text-red-300'
                        : 'border-[#2e2e2a] bg-[#171714] text-[#a8a29e] hover:text-[#f4efe6]'
                    )}
                  >
                    {compareMode ? 'Đang So Sánh Với Sơn Nhựa' : 'So Sánh Với Sơn Công Nghiệp'}
                  </button>
                </div>
              </div>
            </div>

            {/* Micro-climate Metrics Bar */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-[#22221f] bg-[#161614] p-3 text-center sm:p-4">
              <div>
                <span className="block font-mono text-xs text-[#706c66]">ĐỘ KIỀM TỰ NHIÊN</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#d4af37]">
                  pH {current.phValue.toFixed(1)}
                </span>
                <span className="mt-0.5 block text-[11px] text-[#22c55e]">Kháng mốc 100%</span>
              </div>
              <div className="border-x border-[#262623]">
                <span className="block font-mono text-xs text-[#706c66]">HỢP CHẤT BAY HƠI</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#22c55e]">
                  {current.vocLevel.split(' ')[0]}
                </span>
                <span className="mt-0.5 block text-[11px] text-[#a8a29e]">0% VOC Độc Hại</span>
              </div>
              <div>
                <span className="block font-mono text-xs text-[#706c66]">TUỔI THỌ VÔI HÓA</span>
                <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#f4efe6]">
                  Vĩnh Cửu
                </span>
                <span className="mt-0.5 block text-[11px] text-[#a8a29e]">Hóa đá canxit</span>
              </div>
            </div>
          </div>

          {/* Right Column: Material Dossier & Craftsmanship Deep Dive (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#242421] bg-[#121210] p-6 sm:p-8">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <span className="font-mono text-xs text-[#d4af37] uppercase tracking-wider">
                  Mã Hiệu: {current.numberVi} · Tường Khoáng Xoa Bay
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
                  {current.nameVi}
                </h3>
                <p className="mt-1 text-xs text-[#8e8a83]">{current.subtitleVi}</p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#c4beb5]">
                {current.descriptionVi}
              </p>

              {/* Technical Specifications */}
              <div className="space-y-3 border-y border-[#1f1f1d] py-4 text-xs">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-[#706c66]">Thành phần khoáng:</span>
                  <span className="text-[#e8e4df] font-medium sm:text-right max-w-xs">{current.compositionVi}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-[#706c66]">Cơ chế thoát ẩm:</span>
                  <span className="text-[#e8e4df] font-medium sm:text-right max-w-xs">{current.vaporPermeability}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-[#706c66]">Vùng không gian khuyên dùng:</span>
                  <span className="text-[#d4af37] font-medium sm:text-right max-w-xs">{current.recommendedZoneVi}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-[#706c66]">Kỹ thuật bàn tay nghệ nhân:</span>
                  <span className="text-[#e8e4df] sm:text-right max-w-xs">{current.craftsmanshipVi}</span>
                </div>
              </div>

              {/* Why Quiet Luxury Quote */}
              <div className="rounded-lg border border-[#2b2b27] bg-[#181815] p-4 text-xs text-[#a8a29e] leading-relaxed">
                <p className="font-serif italic text-[#d4af37] mb-1">
                  &ldquo;Tường vôi không che giấu mà tôn vinh vết bay của bàn tay con người. Nó già đi cùng ngôi nhà, đổi màu đậm nhạt theo mùa mưa nắng Sài Gòn mà không bao giờ cũ kỹ.&rdquo;
                </p>
                <span className="block text-[11px] text-[#706c66] mt-2">— Ghi chép vật liệu xưởng mộc GuHomes Thạnh Xuân</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-4 border-t border-[#1f1f1d] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setSampleRequested(true)}
                className="w-full sm:w-auto flex-1 rounded-lg bg-[#d4af37] px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-[#e6c158] active:scale-[0.98]"
              >
                Gửi Mẫu Vữa Vôi Đến Tư Gia
              </button>
              <a
                href="/studio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#33332f] bg-[#161614] px-4 py-3 text-xs font-medium text-[#e8e4df] transition-colors hover:border-[#4d4d46] hover:bg-[#1a1a17]"
              >
                Khám Phá Xưởng Vật Liệu
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-[#d4af37]" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal: Gửi mẫu vữa vôi */}
        <AnimatePresence>
          {sampleRequested && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full rounded-xl border border-[#2d2d2a] bg-[#141412] p-6 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#22221f]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37] text-xs">
                      ✓
                    </span>
                    <h4 className="font-serif text-lg text-[#f4efe6]">Hộp Mẫu Vữa Vôi Xúc Giác</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSampleRequested(false)}
                    className="text-[#706c66] hover:text-[#f4efe6] text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-xs text-[#a8a29e]">
                  <p>
                    GuHomes sẽ chuẩn bị hộp gỗ chứa 4 tấm mẫu vữa vôi xoa tay thực tế kích thước 20x20cm của mẫu <strong className="text-[#d4af37]">{current.nameVi}</strong> cùng 3 mẫu khoáng còn lại để gia chủ trực tiếp chạm tay và thử nghiệm ánh sáng tại căn hộ.
                  </p>
                  <div className="rounded border border-[#262623] bg-[#0c0c0a] p-3 text-[11px] space-y-1">
                    <p><strong className="text-[#e8e4df]">Quy chuẩn tiếp đón:</strong> Hộp mẫu gửi trực tiếp trong 24 giờ</p>
                    <p><strong className="text-[#e8e4df]">Hotline KTS Trưởng:</strong> 0368 757 916</p>
                    <p><strong className="text-[#e8e4df]">Email:</strong> guhomesvn@gmail.com</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSampleRequested(false)}
                    className="w-full rounded bg-[#d4af37] py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-[#e6c158]"
                  >
                    Đã Ghi Nhận Yêu Cầu (Đóng)
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
