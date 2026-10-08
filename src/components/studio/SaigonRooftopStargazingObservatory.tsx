'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface ConstellationTarget {
  id: string
  nameVi: string
  scientificName: string
  visibleSeasonVi: string
  magnitudeVi: string
  distanceLightYearsVi: string
  descriptionVi: string
  skyCoordinatesVi: string
}

const CONSTELLATIONS: ConstellationTarget[] = [
  {
    id: 'orion-nebula',
    nameVi: 'Tinh Vân Lạp Hộ (Orion Nebula M42)',
    scientificName: 'Messier 42 · NGC 1976',
    visibleSeasonVi: 'Tháng 11 – Tháng 3 (Mùa khô Sài Gòn trời quang mây tạnh)',
    magnitudeVi: 'Cấp sao biểu kiến +4.0 (Rực rỡ qua kính thiên văn)',
    distanceLightYearsVi: '1.344 Năm ánh sáng',
    descriptionVi:
      'Nơi ươm mầm các vì sao mới trong dải Ngân Hà. Qua bộ lọc quang học triệt quang ô nhiễm đô thị của GuHomes, đám mây khí phát quang màu ngọc bích và tím hoa cà hiện lên sắc nét đến kinh ngạc.',
    skyCoordinatesVi: 'Xích kinh: 05h 35m · Xích vĩ: -05° 23′',
  },
  {
    id: 'andromeda-galaxy',
    nameVi: 'Thiên Hà Tiên Nữ (Andromeda Galaxy M31)',
    scientificName: 'Messier 31 · NGC 224',
    visibleSeasonVi: 'Tháng 9 – Tháng 1 (Thu đông trời trong)',
    magnitudeVi: 'Cấp sao biểu kiến +3.44',
    distanceLightYearsVi: '2.537 Triệu năm ánh sáng',
    descriptionVi:
      'Thiên hà xoắn ốc khổng lồ láng giềng chứa hơn một nghìn tỷ ngôi sao. Chiêm ngưỡng ánh sáng cổ xưa bắt đầu hành trình từ kỷ băng hà xuyên qua mái kính thiên văn penthouse.',
    skyCoordinatesVi: 'Xích kinh: 00h 42m · Xích vĩ: +41° 16′',
  },
  {
    id: 'pleiades-cluster',
    nameVi: 'Cụm Sao Tua Rua (The Pleiades M45)',
    scientificName: 'Messier 45 · Bảy Chị Em',
    visibleSeasonVi: 'Tháng 10 – Tháng 4',
    magnitudeVi: 'Cấp sao biểu kiến +1.6 (Cụm sao mở lộng lẫy nhất)',
    distanceLightYearsVi: '444 Năm ánh sáng',
    descriptionVi:
      'Những viên kim cương xanh biếc lơ lửng giữa màn đêm. Cụm sao mở phản chiếu ánh sáng xanh coban qua các đám bụi tinh vân phản xạ mờ ảo.',
    skyCoordinatesVi: 'Xích kinh: 03h 47m · Xích vĩ: +24° 07′',
  },
]

export function SaigonRooftopStargazingObservatory({ className }: { className?: string } = {}) {
  const [activeConstellationId, setActiveConstellationId] = useState<string>('orion-nebula')
  const [isRoofOpen, setIsRoofOpen] = useState<boolean>(false)
  const [lightFilterActive, setLightFilterActive] = useState<boolean>(true)
  const [telescopeAngle, setTelescopeAngle] = useState<number>(45)

  const currentConstellation =
    CONSTELLATIONS.find((c) => c.id === activeConstellationId) ?? CONSTELLATIONS[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#07090e] py-24 text-[#e0e6f2] border-t border-[#141b29]', className)}>
      {/* Deep Cosmos Starlight Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.08),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1e3452] bg-[#0c192b] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#38bdf8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] animate-ping" />
            Đài Thiên Văn Tư Gia Trên Mái · Sky Stargazing Observatory
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f0f6ff]">
            Đài Quan Sát Thiên Văn Mái Kính Cơ Điện Trượt Mở
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#8da2c0]">
            Tách biệt hoàn toàn khỏi ánh sáng đèn đường đô thị, sân thượng penthouse và dinh thự ven sông là nơi lý tưởng để thưởng ngoạn bầu trời đêm. GuHomes thiết kế mái vòm kính Low-E 3 lớp trượt mở êm dịu dưới 22 dBA, bệ đỡ đá bazan triệt tiêu rung chấn và kính viễn vọng Schmidt-Cassegrain dẫn lối vào vũ trụ vô tận.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Celestial Objects & Coordinates */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#1b2b42] bg-[#0c1422]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#18273d] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                    Tọa Độ Bầu Trời TP. Hồ Chí Minh
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f0f6ff]">
                    10.7769° N, 106.7009° E · Mùa Trời Trong Sài Gòn
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#132238] px-3 py-1 text-xs font-mono text-[#7dd3fc]">
                  <span>Độ ồn trượt: &lt; 22 dBA</span>
                </div>
              </div>

              {/* Constellation Selector */}
              <div className="mt-6 flex flex-col gap-2.5">
                {CONSTELLATIONS.map((constellation) => {
                  const isSelected = constellation.id === activeConstellationId
                  return (
                    <button
                      key={constellation.id}
                      type="button"
                      onClick={() => setActiveConstellationId(constellation.id)}
                      className={cn(
                        'flex items-center justify-between p-3.5 rounded-xl border text-left transition-all min-h-[56px]',
                        isSelected
                          ? 'border-[#38bdf8] bg-[#142642] text-white shadow-[0_0_15px_rgba(56,189,248,0.18)]'
                          : 'border-[#18273d] bg-[#09101c] text-[#869ab5] hover:border-[#274063] hover:text-[#dbeafe]'
                      )}
                    >
                      <div>
                        <span className="block text-xs sm:text-sm font-medium">
                          {constellation.nameVi}
                        </span>
                        <span className="block text-[11px] text-[#607796] italic line-clamp-1">
                          {constellation.scientificName} · {constellation.distanceLightYearsVi}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#38bdf8]/80 hidden sm:inline">
                        {constellation.magnitudeVi.split(' (')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Celestial Deep Inspection */}
              <div className="mt-6 rounded-xl border border-[#223959] bg-[#101c30] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                    {currentConstellation.scientificName}
                  </span>
                  <span className="rounded-full bg-[#182c47] px-2.5 py-0.5 font-mono text-[10px] text-[#7dd3fc]">
                    {currentConstellation.magnitudeVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f0f6ff]">
                  {currentConstellation.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#b3c7e0]">
                  {currentConstellation.descriptionVi}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1a2c46]">
                  <div className="rounded-lg bg-[#0a111e] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#5b7396]">Thời Điểm Quan Sát Lý Tưởng</span>
                    <span className="mt-1 block text-xs font-medium text-[#e0eaf6]">
                      {currentConstellation.visibleSeasonVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#0a111e] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#5b7396]">Tọa Độ Thiên Cầu</span>
                    <span className="mt-1 block text-xs font-medium text-[#38bdf8]">
                      {currentConstellation.skyCoordinatesVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sliding Glass Roof Controller & Light Pollution Filter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#1b2b42] bg-[#0c1422]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#18273d] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#38bdf8]">
                    Điều Khiển Mái Vòm Thiên Văn
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f0f6ff]">
                    Kính Low-E 3 Lớp Chống Đọng Sương
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRoofOpen(!isRoofOpen)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all shadow-md',
                    isRoofOpen
                      ? 'bg-[#38bdf8] text-[#07090e] font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                      : 'border border-[#28466e] bg-[#13233a] text-[#7dd3fc] hover:bg-[#1a3254]'
                  )}
                >
                  {isRoofOpen ? '🔭 Mái Kính: ĐÃ MỞ' : '🔒 Mái Kính: ĐÓNG KÍN'}
                </button>
              </div>

              {/* Telescope Angle Slider */}
              <div className="mt-5">
                <div className="flex justify-between items-center text-xs font-mono text-[#8da2c0]">
                  <span>Góc Nghiêng Kính Viễn Vọng (Elevation Angle):</span>
                  <span className="font-bold text-[#38bdf8]">{telescopeAngle}° Độ Cao</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="90"
                  step="5"
                  value={telescopeAngle}
                  onChange={(e) => setTelescopeAngle(Number(e.target.value))}
                  className="mt-2 w-full h-2 rounded-lg bg-[#18273d] accent-[#38bdf8] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#5b7396] mt-1">
                  <span>15° (Đường Chân Trời Sông)</span>
                  <span>90° (Thiên Đỉnh Đỉnh Đầu)</span>
                </div>
              </div>

              {/* Light Pollution Filter Filter Switch */}
              <div className="mt-6 rounded-xl border border-[#223959] bg-[#101d32] p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-mono text-[10px] text-[#38bdf8] uppercase block">
                      Bộ Lọc Khử Ô Nhiễm Ánh Sáng Đô Thị (Bortle Scale)
                    </span>
                    <span className="text-xs text-[#b8cae0]">Khử ánh sáng vàng natri đèn đường phố</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightFilterActive(!lightFilterActive)}
                    className={cn(
                      'px-3 py-1 rounded-full text-[11px] font-mono transition-all',
                      lightFilterActive
                        ? 'bg-[#38bdf8] text-[#07090e] font-bold'
                        : 'border border-[#28466e] text-[#6d84a3]'
                    )}
                  >
                    {lightFilterActive ? 'Bộ Lọc BẬT' : 'Bộ Lọc TẮT'}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1a2d48] text-[11px] font-mono">
                  <div>
                    <span className="text-[#5b7396] block text-[10px]">CẤP ĐỘ BẦU TRỜI:</span>
                    <span className="text-[#7dd3fc]">
                      {lightFilterActive ? 'Bortle Class 2 (Ngoại Ô Tối)' : 'Bortle Class 5 (Đô Thị Sài Gòn)'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#5b7396] block text-[10px]">ĐỘ TƯƠNG PHẢN TINH VÂN:</span>
                    <span className="text-[#38bdf8]">
                      {lightFilterActive ? '+320% Chi Tiết' : 'Bị Mờ Bởi Ánh Sáng Đô Thị'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vibration Dampening Feature */}
              <div className="mt-4 rounded-xl border border-[#1b2b42] bg-[#09101c] p-3 text-xs space-y-1.5">
                <span className="font-mono text-[10px] text-[#38bdf8] uppercase block">
                  Đặc Quyền Kỹ Thuật Độc Bản GuHomes:
                </span>
                <div className="flex items-center gap-2 text-[#9bb1ce]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                  <span>Bệ chân kính thiên văn đúc đá bazan 800kg triệt tiêu rung chấn kết cấu mái.</span>
                </div>
                <div className="flex items-center gap-2 text-[#9bb1ce]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8]" />
                  <span>Dây điện trở nhiệt sấy kính viền mép tự động ngăn sương mù ngưng tụ.</span>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#18273d]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#38bdf8] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#07090e] hover:bg-[#7dd3fc] transition-all shadow-[0_4px_20px_rgba(56,189,248,0.25)]"
                >
                  <span>Khảo sát vị trí đài thiên văn mái penthouse</span>
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
