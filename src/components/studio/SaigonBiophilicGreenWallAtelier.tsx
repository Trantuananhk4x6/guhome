'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface PlantSpecies {
  id: string
  nameVi: string
  botanicalNameVi: string
  airPurificationRoleVi: string
  transpirationRateVi: string
  lightRequirementVi: string
  descriptionVi: string
  icon: string
}

const GREEN_WALL_PLANTS: PlantSpecies[] = [
  {
    id: 'spathiphyllum',
    nameVi: 'Lan Ý Rừng Bản Địa (Peace Lily)',
    botanicalNameVi: 'Spathiphyllum cannifolium',
    airPurificationRoleVi: 'Hấp thụ 94% benzen, formaldehyde và trichloroethylene từ sơn tường',
    transpirationRateVi: 'Tỏa ẩm vi mô 150ml/m²/ngày',
    lightRequirementVi: 'Ánh sáng tán xạ 800–1.200 Lux (Đèn quang hợp chuyên dụng)',
    descriptionVi:
      'Cánh hoa trắng muốt nở rộ giữa tán lá xanh thẫm mang năng lượng bình an. Khả năng lọc các hợp chất hữu cơ dễ bay hơi VOCs thuộc hàng mạnh nhất trong thế giới thực vật nhiệt đới.',
    icon: '🌿',
  },
  {
    id: 'asplenium-nidus',
    nameVi: 'Ráng Ổ Phụng Rừng Mưa (Bird’s Nest Fern)',
    botanicalNameVi: 'Asplenium nidus',
    airPurificationRoleVi: 'Bẫy hạt bụi mịn PM2.5 trên bề mặt phiến lá lượn sóng',
    transpirationRateVi: 'Tỏa ẩm vi mô 180ml/m²/ngày',
    lightRequirementVi: 'Bóng râm tự nhiên 500–900 Lux',
    descriptionVi:
      'Tán lá vươn cong mềm mại như tổ chim phượng hoàng. Các nếp gấp phiến lá hoạt động như bẫy tĩnh điện tự nhiên, giữ lại bụi mịn lơ lửng trong không khí rồi phân giải nhờ hệ vi sinh rễ.',
    icon: '🪴',
  },
  {
    id: 'philodendron-xanadu',
    nameVi: 'Trầu Bà Thanh Xuân (Philodendron Xanadu)',
    botanicalNameVi: 'Thaumatophyllum xanadu',
    airPurificationRoleVi: 'Hấp thụ khí CO2 ban đêm và giải phóng lượng ion âm (Anion) dồi dào',
    transpirationRateVi: 'Tỏa ẩm vi mô 210ml/m²/ngày',
    lightRequirementVi: 'Ánh sáng trung bình 1.000–1.500 Lux',
    descriptionVi:
      'Lá xẻ răng cưa sâu tạo chiều sâu xúc giác tầng tầng lớp lớp. Sinh trưởng mạnh mẽ trên nỉ thủy canh mà không cần bất kỳ một hạt đất nào, tuyệt đối không sinh ẩm mốc hay côn trùng.',
    icon: '🍃',
  },
  {
    id: 'monstera-deliciosa',
    nameVi: 'Trầu Bà Nam Mỹ Lá Rách (Monstera Deliciosa)',
    botanicalNameVi: 'Monstera deliciosa Liebm.',
    airPurificationRoleVi: 'Làm mát bề mặt tường 4.2°C thông qua bay hơi nước bề mặt lá',
    transpirationRateVi: 'Tỏa ẩm vi mô 260ml/m²/ngày',
    lightRequirementVi: 'Ánh sáng giếng trời 1.200–2.000 Lux',
    descriptionVi:
      'Chiếc lá xẻ khổ lớn tạo bóng râm điêu khắc. Hoạt động như một tấm pin năng lượng sinh học tự nhiên, hấp thụ bức xạ nhiệt xuyên qua giếng trời và làm mềm không gian thông tầng phòng khách.',
    icon: '🌱',
  },
]

export function SaigonBiophilicGreenWallAtelier({ className }: { className?: string } = {}) {
  const [activePlantId, setActivePlantId] = useState<string>('spathiphyllum')
  const [isIrrigationActive, setIsIrrigationActive] = useState<boolean>(true)
  const [environmentMode, setEnvironmentMode] = useState<'with-wall' | 'outdoor-street'>('with-wall')

  const currentPlant =
    GREEN_WALL_PLANTS.find((p) => p.id === activePlantId) ?? GREEN_WALL_PLANTS[0]!

  const aqiValue = environmentMode === 'with-wall' ? 18 : 165
  const humidityValue = environmentMode === 'with-wall' ? 62 : 45
  const vocReductionPct = 89

  return (
    <section className={cn('relative overflow-hidden bg-[#090e0b] py-24 text-[#e4ede7] border-t border-[#152319]', className)}>
      {/* Botanical Emerald Green Ambient Backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1b3d2b] bg-[#0c1f15] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#34d399]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#34d399] animate-ping" />
            Lá Phổi Xanh Đại Sảnh · Biophilic Vertical Green Wall Atelier
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f0fdf4]">
            Vườn Tường Đứng Thủy Canh &amp; Lọc Bụi Mịn PM2.5
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#93b39f]">
            Khói bụi đô thị và không khí ngột ngạt của phòng kín điều hòa được hóa giải hoàn toàn bằng mảng tường xanh thẳng đứng cao 6m. Hệ thống tưới nhỏ giọt ngầm tuần hoàn vi sinh không dùng đất, kết hợp các loài thực vật nhiệt đới bản địa hạ nhiệt tường 4.2°C và duy trì độ ẩm tự nhiên 62% RH.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 4 Native Botanical Species & Hydroponic System */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#1b3827] bg-[#0c1711]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1b3827] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#34d399]">
                    Hệ Thực Vật Nhiệt Đới Lọc Khí Bản Địa
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f0fdf4]">
                    Thủy Canh Giá Thể Vải Nỉ Không Cần Đất
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#12281c] px-3 py-1 text-xs font-mono text-[#6ee7b7]">
                  <span>100% Không Côn Trùng &amp; Muỗi</span>
                </div>
              </div>

              {/* Plant Species Selector */}
              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {GREEN_WALL_PLANTS.map((plant) => {
                  const isSelected = plant.id === activePlantId
                  return (
                    <button
                      key={plant.id}
                      type="button"
                      onClick={() => setActivePlantId(plant.id)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border text-left transition-all min-h-[64px]',
                        isSelected
                          ? 'border-[#34d399] bg-[#142d1f] text-white shadow-[0_0_15px_rgba(52,211,153,0.18)]'
                          : 'border-[#1b3827] bg-[#0a140f] text-[#8aa393] hover:border-[#2d593f] hover:text-[#dcfce7]'
                      )}
                    >
                      <span className="text-2xl">{plant.icon}</span>
                      <div>
                        <span className="block text-xs sm:text-sm font-medium line-clamp-1">
                          {plant.nameVi.split(' (')[0]}
                        </span>
                        <span className="block text-[11px] text-[#608b72] italic line-clamp-1">
                          {plant.botanicalNameVi}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Active Plant Detailed Inspection */}
              <div className="mt-6 rounded-xl border border-[#1e452f] bg-[#0e2116] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#34d399]">
                    {currentPlant.botanicalNameVi}
                  </span>
                  <span className="rounded-full bg-[#163323] px-2.5 py-0.5 font-mono text-[10px] text-[#6ee7b7]">
                    {currentPlant.transpirationRateVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f0fdf4]">
                  {currentPlant.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#a8cdb6]">
                  {currentPlant.descriptionVi}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1b3827]">
                  <div className="rounded-lg bg-[#08120d] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#5a876c]">Cơ Chế Lọc Khí Sinh Học</span>
                    <span className="mt-1 block text-xs font-medium text-[#dcfce7]">
                      {currentPlant.airPurificationRoleVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#08120d] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#5a876c]">Tiêu Chuẩn Chiếu Sáng</span>
                    <span className="mt-1 block text-xs font-medium text-[#34d399]">
                      {currentPlant.lightRequirementVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Air Quality AQI Simulator & Sub-irrigation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#1b3827] bg-[#0c1711]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#1b3827] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#34d399]">
                    Mô Phỏng Chất Lượng Không Khí AQI
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f0fdf4]">
                    Nội Thất GuHomes vs Không Khí Mặt Đường
                  </h3>
                </div>
              </div>

              {/* Environment Switcher */}
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-[#08120d] p-1.5 border border-[#1b3827]">
                <button
                  type="button"
                  onClick={() => setEnvironmentMode('with-wall')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    environmentMode === 'with-wall'
                      ? 'bg-[#10b981] text-[#06170e] font-bold shadow-md'
                      : 'text-[#6e947d] hover:text-[#a7f3d0]'
                  )}
                >
                  Có Tường Xanh GuHomes
                </button>
                <button
                  type="button"
                  onClick={() => setEnvironmentMode('outdoor-street')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    environmentMode === 'outdoor-street'
                      ? 'bg-red-800 text-white font-bold shadow-md'
                      : 'text-[#6e947d] hover:text-white'
                  )}
                >
                  Không Khí Mặt Phố Sài Gòn
                </button>
              </div>

              {/* Live Metric Cards */}
              <div className="mt-6 space-y-4">
                {/* AQI Meter */}
                <div
                  className={cn(
                    'rounded-xl border p-4 transition-all',
                    environmentMode === 'with-wall'
                      ? 'border-emerald-800/60 bg-emerald-950/30'
                      : 'border-red-900/60 bg-red-950/30'
                  )}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-[#e4ede7]">
                      {environmentMode === 'with-wall'
                        ? 'Chỉ Số Bụi Mịn & Ô Nhiễm AQI (Tốt/Trong Lành)'
                        : 'Chỉ Số Bụi Mịn AQI Ngoài Đường (Kém/Báo Động)'}
                    </span>
                    <span
                      className={cn(
                        'font-mono text-2xl font-bold',
                        environmentMode === 'with-wall' ? 'text-emerald-400' : 'text-red-500'
                      )}
                    >
                      {aqiValue}
                    </span>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-[#08120d] overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        environmentMode === 'with-wall'
                          ? 'w-[12%] bg-gradient-to-r from-teal-400 to-emerald-500'
                          : 'w-[85%] bg-gradient-to-r from-orange-500 to-red-600'
                      )}
                    />
                  </div>
                  <span className="mt-2 block text-[10px] text-[#93b39f]">
                    {environmentMode === 'with-wall'
                      ? '✓ Không khí sạch như trong rừng nguyên sinh, triệt tiêu 89% khí độc sơn mới và bụi mịn PM2.5.'
                      : '⚠️ Bụi mịn và khói xe từ đại lộ xâm nhập, gây khô họng và ngột ngạt cho trẻ nhỏ.'}
                  </span>
                </div>

                {/* Ecological Humidity & Temperature Balance */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-xl border border-[#1b3827] bg-[#0c1811] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#608b72]">ĐỘ ẨM SINH THÁI</span>
                    <span className="mt-1 font-mono text-xl font-bold text-[#34d399]">{humidityValue}% RH</span>
                    <span className="mt-0.5 block text-[10px] text-[#8aa393]">Cân bằng tự nhiên</span>
                  </div>
                  <div className="rounded-xl border border-[#1b3827] bg-[#0c1811] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#608b72]">HẠ NHIỆT MẶT TƯỜNG</span>
                    <span className="mt-1 font-mono text-xl font-bold text-[#6ee7b7]">-4.2°C</span>
                    <span className="mt-0.5 block text-[10px] text-[#8aa393]">Giảm bức xạ nhiệt</span>
                  </div>
                </div>
              </div>

              {/* Sub-irrigation Automation Controller */}
              <div className="mt-4 rounded-xl border border-[#1b3827] bg-[#0a150f] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">💧</span>
                  <div>
                    <span className="font-mono text-xs text-[#34d399] block">Hệ Thống Tưới Nhỏ Giọt Ngầm</span>
                    <span className="text-[11px] text-[#719580]">Tuần hoàn tự động theo độ ẩm cảm biến</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsIrrigationActive(!isIrrigationActive)}
                  className={cn(
                    'px-3 py-1 rounded-full text-[11px] font-mono transition-all',
                    isIrrigationActive ? 'bg-[#34d399] text-[#08120d] font-bold' : 'border border-[#234533] text-[#719580]'
                  )}
                >
                  {isIrrigationActive ? 'Tự Động 24/7' : 'Tạm Dừng'}
                </button>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#1b3827]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#10b981] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#06170e] hover:bg-[#34d399] transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)]"
                >
                  <span>Khảo sát lắp đặt vườn tường đứng đại sảnh</span>
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
