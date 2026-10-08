'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type FixtureId = 'linear-pendant' | 'travertine-floor' | 'ceramic-sconce'

export type BeamAngle = 15 | 36 | 60

export type WarmDimKelvin = 1800 | 2200 | 2700 | 3000

interface FixtureDetail {
  id: FixtureId
  nameVi: string
  subtitleVi: string
  materialsVi: string
  tagVi: string
  lumensMax: number
  powerWatt: number
  criRating: string
  craftsmanshipHours: number
  descriptionVi: string
  icon: string
  cctMap: Record<WarmDimKelvin, { label: string; hex: string; moodVi: string; luxAt1m: number }>
}

const FIXTURES_DATA: Record<FixtureId, FixtureDetail> = {
  'linear-pendant': {
    id: 'linear-pendant',
    nameVi: 'Đèn Thả Đồng Thau & Thủy Tinh Sọc Thổi Miệng',
    subtitleVi: 'Linear Dining Pendant · Chiều Dài 1.6m May Đo',
    materialsVi: 'Đồng thau mộc nguyên khối phay xước + Thủy tinh Borosilicate thổi miệng rãnh sọc',
    tagVi: 'Trái Tim Bàn Ăn · Chiếu Sáng Vàng Hổ Phách',
    lumensMax: 2400,
    powerWatt: 32,
    criRating: 'CRI 98 (R9 > 94)',
    craftsmanshipHours: 28,
    descriptionVi:
      'Được phay gọt từ một khối đồng thau mộc đặc dài 1600mm. Ống thủy tinh thổi miệng thủ công tạo ra các gợn sóng tán xạ ánh sáng mềm mại, tuyệt đối không chói mắt người ngồi quanh bàn tiệc.',
    icon: '💡',
    cctMap: {
      1800: { label: '1800K (Nến Ấm Hoàng Hôn)', hex: '#FF9E4A', moodVi: 'Không gian lãng mạn như ánh nến dạ tiệc rượu vang', luxAt1m: 180 },
      2200: { label: '2200K (Dạ Tiệc Êm Đềm)', hex: '#FFAE66', moodVi: 'Ánh vàng ấm áp tôn vinh màu rượu vang và món ăn', luxAt1m: 260 },
      2700: { label: '2700K (Ấm Cúng Thư Giãn)', hex: '#FFC588', moodVi: 'Chuẩn ánh sáng sinh hoạt gia đình buổi tối', luxAt1m: 380 },
      3000: { label: '3000K (Trang Nhã Tinh Tế)', hex: '#FFD9AA', moodVi: 'Độ sáng rõ nét cho bữa sáng hoặc làm việc nhẹ', luxAt1m: 520 },
    },
  },
  'travertine-floor': {
    id: 'travertine-floor',
    nameVi: 'Đèn Cây Điêu Khắc Đá Travertine & Vải Lanh Thô',
    subtitleVi: 'Sculptural Floor Lamp · Khối Đá Nặng 35kg',
    materialsVi: 'Chân đế đá Travertine Navona Ý nguyên khối + Thân đồng mộc + Chao vải lanh Bỉ dệt tay',
    tagVi: 'Tác Phẩm Điêu Khắc · Góc Đọc Sách Thư Giãn',
    lumensMax: 1600,
    powerWatt: 22,
    criRating: 'CRI 98 (R9 > 92)',
    craftsmanshipHours: 34,
    descriptionVi:
      'Chân đế là một khối đá Travertine Navona tiện tròn thủ công, lưu giữ trọn vẹn những lỗ rỗng khoáng vật trầm tích. Chao đèn bằng vải lanh thô dệt tay khuếch tán ánh sáng êm dịu góc sofa.',
    icon: '🏮',
    cctMap: {
      1800: { label: '1800K (Nến Ấm Hoàng Hôn)', hex: '#FF9E4A', moodVi: 'Khoảnh khắc thiền định, nghe nhạc không lời buổi khuya', luxAt1m: 120 },
      2200: { label: '2200K (Dạ Tiệc Êm Đềm)', hex: '#FFAE66', moodVi: 'Tạo điểm nhấn điêu khắc góc phòng khách', luxAt1m: 190 },
      2700: { label: '2700K (Ấm Cúng Thư Giãn)', hex: '#FFC588', moodVi: 'Ánh sáng đọc sách êm mắt không gây lóa trang giấy', luxAt1m: 280 },
      3000: { label: '3000K (Trang Nhã Tinh Tế)', hex: '#FFD9AA', moodVi: 'Bù sáng tự nhiên cho góc lounge lúc trời mưa âm u', luxAt1m: 390 },
    },
  },
  'ceramic-sconce': {
    id: 'ceramic-sconce',
    nameVi: 'Đèn Tường Hắt Hào Quang Gốm Men Tro Mờ Bát Tràng',
    subtitleVi: 'Halos Ceramic Sconce · Men Hỏa Biến Mộc',
    materialsVi: 'Đĩa gốm thủ công men tro củi nung nhiệt độ cao 1300°C + Lõi đồng thau giấu đèn',
    tagVi: 'Hào Quang Huyền Ảo · Tôn Vinh Tường Calce Ý',
    lumensMax: 1100,
    powerWatt: 16,
    criRating: 'CRI 98 (R9 > 96)',
    craftsmanshipHours: 24,
    descriptionVi:
      'Mỗi chiếc đĩa gốm được vuốt tay độc bản bởi nghệ nhân gốm truyền thống. Ánh sáng hắt gián tiếp vào lòng đĩa gốm tạo thành một quầng hào quang mềm mại (Light Halo) như vầng trăng rằm trên nền tường vôi khoáng.',
    icon: '🌕',
    cctMap: {
      1800: { label: '1800K (Nến Ấm Hoàng Hôn)', hex: '#FF9E4A', moodVi: 'Vầng trăng khuyết huyền ảo, dẫn lối hành lang ban đêm', luxAt1m: 90 },
      2200: { label: '2200K (Dạ Tiệc Êm Đềm)', hex: '#FFAE66', moodVi: 'Hắt hào quang tôn vinh bề mặt gồ ghề của vách tường vôi', luxAt1m: 140 },
      2700: { label: '2700K (Ấm Cúng Thư Giãn)', hex: '#FFC588', moodVi: 'Chiếu sáng êm ái cho phòng ngủ master và lối vào sảnh', luxAt1m: 210 },
      3000: { label: '3000K (Trang Nhã Tinh Tế)', hex: '#FFD9AA', moodVi: 'Độ tương phản cao làm nổi bật từng vân men rạn gốm', luxAt1m: 290 },
    },
  },
}

export function LightingAtelierCustomizer({ className }: { className?: string }) {
  const [selectedFixtureId, setSelectedFixtureId] = useState<FixtureId>('linear-pendant')
  const [selectedCct, setSelectedCct] = useState<WarmDimKelvin>(2200)
  const [selectedBeam, setSelectedBeam] = useState<BeamAngle>(36)
  const [dimmerPercent, setDimmerPercent] = useState<number>(75)

  const fixture = FIXTURES_DATA[selectedFixtureId] ?? FIXTURES_DATA['linear-pendant']
  const cctInfo = fixture.cctMap[selectedCct] ?? fixture.cctMap[2200]
  const uniqueId = useId()

  // Calculated current lux and power based on dimmer slider
  const currentLux = Math.round(cctInfo.luxAt1m * (dimmerPercent / 100))
  const currentWatts = Math.round(fixture.powerWatt * (dimmerPercent / 100) * 10) / 10

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Xưởng Đèn May Đo Thủ Công · GuHomes Lighting Atelier
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Warm Dim CRI 98 (R9 &gt; 92)
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Nghệ Thuật Ánh Sáng Xúc Giác May Đo
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Ánh sáng Quiet Luxury không đến từ đèn trần công nghiệp chói gắt, mà từ các tác phẩm đèn thửa riêng (Bespoke Luminaires) kết hợp đồng thau mộc, đá travertine và gốm men tro Bát Tràng.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Mô phỏng quang thông Warm Dim thời gian thực</span>
          </div>
        </div>

        {/* 3 Fixtures Selector */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
          {(Object.keys(FIXTURES_DATA) as FixtureId[]).map((id) => {
            const f = FIXTURES_DATA[id]
            const isSelected = selectedFixtureId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedFixtureId(id)}
                className={cn(
                  'p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-canvas shadow-md ring-1 ring-accent/40'
                    : 'border-line bg-surface hover:bg-canvas/60 hover:border-line-dark'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-accent">{f.tagVi}</span>
                    <span className="text-2xl">{f.icon}</span>
                  </div>
                  <h3 className="font-serif text-base font-medium text-ink mt-2">{f.nameVi}</h3>
                </div>
                <p className="text-xs text-muted mt-2 font-light line-clamp-2 leading-relaxed">{f.descriptionVi}</p>
                <div className="mt-4 pt-3 border-t border-line/60 flex justify-between items-center text-xs font-mono text-muted">
                  <span>{f.criRating}</span>
                  <span className="text-accent font-semibold">{f.craftsmanshipHours}h Chế tác</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Light Simulation Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Halo Chamber & CCT Controls */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            {/* Live Halo Chamber */}
            <div className="p-8 rounded-3xl bg-canvas border border-line relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Quang Học Thực Tế &amp; Vầng Sáng Hào Quang (Light Halo)</span>
                <span className="text-accent font-semibold">{cctInfo.label}</span>
              </div>

              {/* Dynamic Chamber Display */}
              <div
                className="mt-6 relative h-64 sm:h-72 w-full rounded-2xl border border-line p-6 flex flex-col justify-between overflow-hidden shadow-inner"
                style={{
                  backgroundColor: '#120F0D',
                }}
              >
                {/* Simulated Radial Beam & Halo Glow */}
                <motion.div
                  key={`${selectedFixtureId}-${selectedCct}-${selectedBeam}`}
                  initial={{ opacity: 0.3, scale: 0.9 }}
                  animate={{
                    opacity: (dimmerPercent / 100) * 0.95,
                    scale: 1,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 35%, ${cctInfo.hex} 0%, rgba(255,180,100,0.2) ${
                      selectedBeam === 15 ? '30%' : selectedBeam === 36 ? '55%' : '80%'
                    }, transparent 90%)`,
                  }}
                />

                {/* Top Status Tags */}
                <div className="relative z-10 flex flex-wrap gap-2 text-[11px] font-mono text-white/90">
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                    Nhiệt độ màu: {selectedCct}K
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                    Góc chiếu: {selectedBeam}°
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                    Độ sáng: {dimmerPercent}%
                  </span>
                </div>

                {/* Fixture Silhouette Badge */}
                <div className="relative z-10 max-w-sm mx-auto text-center p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent-soft">
                    {fixture.subtitleVi}
                  </span>
                  <h4 className="font-serif text-lg font-normal mt-1 text-white">
                    {cctInfo.moodVi}
                  </h4>
                </div>

                {/* Bottom Metrics Bar */}
                <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-white/60 pt-2 border-t border-white/10">
                  <span>Độ rọi tại 1m: {currentLux} Lux</span>
                  <span>Công suất tiêu thụ: {currentWatts}W</span>
                </div>
              </div>

              {/* CCT Temperature Selector */}
              <div className="mt-8 pt-6 border-t border-line/60">
                <label className="text-xs font-mono uppercase tracking-wider text-muted block mb-3 font-semibold">
                  1. Chọn Nhiệt Độ Màu Warm Dim (Kelvin):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {([1800, 2200, 2700, 3000] as WarmDimKelvin[]).map((k) => {
                    const isSelected = selectedCct === k
                    const info = fixture.cctMap[k]
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setSelectedCct(k)}
                        className={cn(
                          'p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1',
                          isSelected
                            ? 'border-accent bg-surface ring-1 ring-accent/40 shadow-sm'
                            : 'border-line/60 bg-canvas hover:border-line-dark'
                        )}
                      >
                        <span className="text-xs font-mono font-semibold text-ink">{k}K</span>
                        <div
                          className="w-4 h-4 rounded-full border border-line"
                          style={{ backgroundColor: info.hex }}
                        />
                        <span className="text-[10px] font-mono text-muted mt-0.5">{info.label.split(' ')[1]}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Beam Angle & Dimmer Sliders */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-muted block mb-2 font-semibold">
                    2. Góc Chiếu Sáng (Beam Angle):
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {([15, 36, 60] as BeamAngle[]).map((deg) => (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => setSelectedBeam(deg)}
                        className={cn(
                          'py-2 px-3 rounded-xl text-xs font-mono border transition-all text-center',
                          selectedBeam === deg
                            ? 'bg-accent text-canvas border-accent font-semibold shadow-sm'
                            : 'bg-surface border-line text-muted hover:text-ink'
                        )}
                      >
                        {deg}° {deg === 15 ? '(Tụ điểm)' : deg === 36 ? '(Bàn trà)' : '(Tỏa rộng)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-muted font-semibold">3. Chiết Áp Dimmer (0–100%):</span>
                    <span className="text-accent text-sm font-semibold">{dimmerPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={dimmerPercent}
                    onChange={(e) => setDimmerPercent(parseInt(e.target.value))}
                    className="w-full accent-accent cursor-pointer mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Handcraft Materials & Customization Dossier */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Hồ Sơ Chế Tác Thủ Công
              </span>
              <h3 className="font-serif text-2xl text-ink font-light mt-2">
                {fixture.nameVi}
              </h3>

              <div className="mt-6 space-y-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <span className="text-muted block text-[10px]">Vật Liệu Cấu Thành:</span>
                  <p className="text-ink font-medium mt-1 leading-relaxed">{fixture.materialsVi}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-surface border border-line">
                    <span className="text-muted block text-[10px]">Chỉ Số Hoàn Màu:</span>
                    <span className="text-base font-serif text-accent mt-0.5 block">{fixture.criRating}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-surface border border-line">
                    <span className="text-muted block text-[10px]">Giờ Thợ Kim Hoàn:</span>
                    <span className="text-base font-serif text-ink mt-0.5 block">{fixture.craftsmanshipHours} Giờ</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <span className="text-muted block text-[10px]">Tiêu Chuẩn Lắp Đặt:</span>
                  <p className="text-ink font-light mt-1 leading-relaxed">
                    Tương thích hoàn hảo với hệ thống Smart Home chuẩn DALI-2 và KNX Châu Âu. Điều chỉnh mượt mà không nhấp nháy (Flicker-Free 0%).
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Callout */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-espresso to-[#2B231D] text-canvas relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                May Đo Ánh Sáng Tại Gia
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-canvas mt-2">
                Đo đạc độ rọi thực tế tại công trình
              </h4>
              <p className="text-xs text-canvas/80 mt-3 font-light leading-relaxed">
                Chuyên gia ánh sáng của GuHomes sẽ mang máy đo quang thông Konica Minolta đến tận căn hộ để đo đạc và tư vấn vị trí đặt đèn may đo chính xác nhất.
              </p>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
                >
                  <span>Đặt lịch tư vấn ánh sáng may đo</span>
                  <ArrowUpRightIcon className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
