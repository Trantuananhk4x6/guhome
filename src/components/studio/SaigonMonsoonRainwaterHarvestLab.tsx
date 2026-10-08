'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface FilterStage {
  id: string
  numberVi: string
  nameVi: string
  subtitleVi: string
  mechanismVi: string
  specVi: string
  purityEfficiencyVi: string
  icon: string
}

const FILTER_STAGES: FilterStage[] = [
  {
    id: 'coarse',
    numberVi: '01',
    nameVi: 'Màng Thu Gom Lưới Inox 304 & Bẫy Rác Thô',
    subtitleVi: 'Tách Lá Cây & Bụi Mái Dốc Đầu Mùa',
    mechanismVi:
      'Toàn bộ nước mưa từ mái dốc ngói và máng xối ẩn được dẫn qua phễu thu xoáy ly tâm Inox 304 có khe hở 0.8mm. Tự động xả bỏ 15 phút nước mưa đầu mùa (First Flush Diverter) chứa bụi khí quyển đô thị.',
    specVi: 'Lưới dệt Inox 304 khe 0.8mm + Van xả lắng sơ cấp tự động',
    purityEfficiencyVi: 'Loại bỏ 98% cặn thô > 1mm',
    icon: '🌧️',
  },
  {
    id: 'quartz-sand',
    numberVi: '02',
    nameVi: 'Bể Lắng Cát Thạch Anh & Than Hoạt Tính Gáo Dừa',
    subtitleVi: 'Khử Mùi Hữu Cơ & Hạt Mịn Lơ Lửng',
    mechanismVi:
      'Nước chảy thẩm thấu ngược qua lớp cát thạch anh Quảng Nam kích thước hạt 0.4–0.8mm và than hoạt tính Bến Tre nung 900°C. Giữ lại toàn bộ bụi mịn, khử sạch mùi vị chua nhẹ của mưa đầu mùa.',
    specVi: 'Tầng đệm cát thạch anh 350mm + Than gáo dừa hoạt tính 200mm',
    purityEfficiencyVi: 'Độ trong đạt Turbidity < 1.2 NTU',
    icon: '⏳',
  },
  {
    id: 'bio-gravel',
    numberVi: '03',
    nameVi: 'Bồn Suối Đá Cuội Vi Sinh Bản Địa',
    subtitleVi: 'Tái Cân Bằng Khoáng Chất & Vi Sinh Tự Nhiên',
    mechanismVi:
      'Nước luân chuyển qua lớp sỏi bazan núi đá Đồng Nai và đá bọt Pumice giàu vi sinh hiếu khí. Vi sinh phân giải hoàn toàn hợp chất nitơ hữu cơ, tạo dòng nước sống mềm mại giàu oxy hòa tan.',
    specVi: 'Sỏi cuội sông suối 3 tầng kích thước 10–40mm + Giá thể Bio-ball',
    purityEfficiencyVi: 'Hạ Nitrate & Amoni về ngưỡng an toàn sinh học tuyệt đối',
    icon: '🪨',
  },
  {
    id: 'uv-sterilizer',
    numberVi: '04',
    nameVi: 'Đèn Khử Khuẩn Quang Học UV-C Kép',
    subtitleVi: 'Diệt 99.9% Vi Khuẩn & Bào Tử Rêu Mốc',
    mechanismVi:
      'Trước khi bơm vào hệ thống phun sương làm mát mái bê tông penthouse hoặc cấp bù cho hồ cá Koi Thảo Điền, nước đi qua buồng chiếu tia cực tím bước sóng 254nm. Tiêu diệt triệt để nấm mốc mà không cần clo hay hóa chất.',
    specVi: 'Ống thạch anh đôi công suất 55W tia cực tím UV-C 254nm',
    purityEfficiencyVi: 'Tiêu diệt 99.99% khuẩn Coliform & E.coli',
    icon: '✨',
  },
]

export function SaigonMonsoonRainwaterHarvestLab({ className }: { className?: string } = {}) {
  const [activeStageId, setActiveStageId] = useState<string>('coarse')
  const [isMistingActive, setIsMistingActive] = useState<boolean>(true)
  const [rainfallIntensity, setRainfallIntensity] = useState<'moderate' | 'heavy' | 'tropical-storm'>('heavy')

  const activeStage = FILTER_STAGES.find((s) => s.id === activeStageId) ?? FILTER_STAGES[0]!

  // Dynamic calculations based on rain & misting mode
  const rooftopTempTraditional = 54.5
  const rooftopTempGuHomes = isMistingActive ? 31.8 : 42.0
  const tempReduction = (rooftopTempTraditional - rooftopTempGuHomes).toFixed(1)
  const monthlyWaterSavedLiters = rainfallIntensity === 'tropical-storm' ? 38500 : rainfallIntensity === 'heavy' ? 24500 : 14200
  const hvacLoadReductionPct = isMistingActive ? 36 : 14

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0f0d] py-24 text-[#e6ece8] border-t border-[#16241c]', className)}>
      {/* Ambient water-ripple subtle backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(45,106,79,0.12),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1b3d2b] bg-[#0e1f16] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#52b788]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#52b788] animate-ping" />
            Vi Khí Hậu Sài Gòn · Monsoon Rainwater Ecological Lab
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f0f7f3]">
            Hệ Thu Gom Nước Mưa & Làm Mát Mái Thụ Động
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#9ab3a3]">
            Sài Gòn đón lượng mưa nhiệt đới khổng lồ hơn 2.400mm mỗi năm. Thay vì để nước mưa xối xả thoát vào cống đô thị, GuHomes thiết kế hệ thống tuần hoàn sinh học biến nước mưa thành khiên chắn nhiệt tự nhiên — hạ nhiệt tức thì từ 54.5°C xuống 31.8°C cho sàn mái penthouse.
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 4-Stage Biological Filtration */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#1b3827] bg-[#0c1712]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1b3827] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#52b788]">
                    Quy Trình 4 Tầng Lọc Vi Sinh Tự Nhiên
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f0f7f3]">
                    Từ Giọt Mưa Giông Đến Dòng Nước Mềm Tinh Khiết
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#13261c] px-3 py-1 text-xs font-mono text-[#74c69d]">
                  <span>Độ đục &lt; 0.5 NTU</span>
                </div>
              </div>

              {/* Stage Selection Tabs */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FILTER_STAGES.map((stage) => {
                  const isActive = stage.id === activeStageId
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => setActiveStageId(stage.id)}
                      className={cn(
                        'flex flex-col items-start p-3 rounded-xl border text-left transition-all min-h-[72px]',
                        isActive
                          ? 'border-[#52b788] bg-[#163323] text-[#ffffff] shadow-[0_0_15px_rgba(82,183,136,0.2)]'
                          : 'border-[#1b3827] bg-[#0d1a14] text-[#8ea396] hover:border-[#2d5a3f] hover:text-[#d3e2d9]'
                      )}
                    >
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#52b788]">
                        <span>{stage.icon}</span>
                        <span>{stage.numberVi}</span>
                      </div>
                      <span className="mt-1 text-xs font-medium line-clamp-1">
                        {stage.nameVi.split(' & ')[0]}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Stage Detailed Card */}
              <div className="mt-6 rounded-xl border border-[#1b3d2b] bg-[#0f2118] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-[#52b788] uppercase tracking-wider">
                      TẦNG {activeStage.numberVi} · {activeStage.subtitleVi}
                    </span>
                    <h4 className="mt-1 font-serif text-lg sm:text-xl text-[#f0f7f3]">
                      {activeStage.nameVi}
                    </h4>
                  </div>
                  <span className="text-2xl">{activeStage.icon}</span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-[#a8beaf]">
                  {activeStage.mechanismVi}
                </p>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#1b3d2b]">
                  <div className="rounded-lg bg-[#0a1711] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#608b73]">Quy Cách Kỹ Thuật</span>
                    <span className="mt-1 block text-xs font-medium text-[#d8eae0]">
                      {activeStage.specVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#0a1711] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#608b73]">Hiệu Suất Tinh Lọc</span>
                    <span className="mt-1 block text-xs font-medium text-[#74c69d]">
                      {activeStage.purityEfficiencyVi}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ecological Impact Indicators */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-[#1b3827] pt-5 text-center">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[#608b73]">NƯỚC MƯA THU GIỮ</span>
                  <span className="mt-1 font-mono text-lg font-bold text-[#52b788]">
                    {monthlyWaterSavedLiters.toLocaleString('vi-VN')} L
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#8ea396]">Mỗi tháng mùa mưa</span>
                </div>
                <div className="border-x border-[#1b3827]">
                  <span className="block font-mono text-[10px] uppercase text-[#608b73]">TIẾT KIỆM NƯỚC SẠCH</span>
                  <span className="mt-1 font-mono text-lg font-bold text-[#74c69d]">100%</span>
                  <span className="mt-0.5 block text-[10px] text-[#8ea396]">Tưới cây & hồ Koi</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-[#608b73]">GIẢM TẢI MÁY LẠNH</span>
                  <span className="mt-1 font-mono text-lg font-bold text-[#b7e4c7]">
                    -{hvacLoadReductionPct}%
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#8ea396]">Tiêu thụ điện tầng mái</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Thermal Roof Cooling Simulator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#1b3827] bg-[#0c1712]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#1b3827] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#52b788]">
                    Mô Phỏng Nhiệt Độ Sàn Mái
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f0f7f3]">
                    Penthouse & Biệt Thự Mùa Mưa
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMistingActive(!isMistingActive)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-xs font-mono transition-all',
                      isMistingActive
                        ? 'bg-[#52b788] text-[#0a1711] font-semibold shadow-[0_0_12px_rgba(82,183,136,0.3)]'
                        : 'border border-[#2d5a3f] bg-[#122319] text-[#8ea396]'
                    )}
                  >
                    {isMistingActive ? '💧 Phun Sương: BẬT' : '💨 Phun Sương: TẮT'}
                  </button>
                </div>
              </div>

              {/* Rain Intensity Selector */}
              <div className="mt-5">
                <span className="font-mono text-[11px] text-[#74c69d] uppercase">Cường Độ Mưa Sài Gòn:</span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(
                    [
                      { id: 'moderate', label: 'Mưa Rào (25mm/h)' },
                      { id: 'heavy', label: 'Mưa Giông (60mm/h)' },
                      { id: 'tropical-storm', label: 'Bão Nhiệt Đới (>100mm)' },
                    ] as const
                  ).map((rain) => (
                    <button
                      key={rain.id}
                      type="button"
                      onClick={() => setRainfallIntensity(rain.id)}
                      className={cn(
                        'py-2 px-2 rounded-lg text-[11px] font-mono border transition-all text-center',
                        rainfallIntensity === rain.id
                          ? 'border-[#52b788] bg-[#1a3828] text-white font-medium'
                          : 'border-[#1b3827] bg-[#0c1813] text-[#748c7e] hover:text-white'
                      )}
                    >
                      {rain.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Temperature Comparison Visualizer */}
              <div className="mt-6 space-y-4">
                {/* Traditional Concrete Roof */}
                <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-red-300 font-medium">Sàn Mái Bê Tông Truyền Thống (Hấp thụ bức xạ)</span>
                    <span className="font-mono font-bold text-red-400 text-base">{rooftopTempTraditional}°C</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-red-950 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full w-[90%]" />
                  </div>
                  <span className="mt-1 block text-[10px] text-red-400/80">
                    Bức xạ nhiệt xuyên qua trần thạch cao, máy lạnh hoạt động hết công suất vẫn nóng hầm.
                  </span>
                </div>

                {/* GuHomes Rainwater Microclimate Roof */}
                <div className="rounded-xl border border-[#2d6a4f] bg-[#142e20]/60 p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#95d5b2] font-medium">
                      Hệ Mái Phun Sương Nước Mưa GuHomes
                    </span>
                    <span className="font-mono font-bold text-[#52b788] text-xl">{rooftopTempGuHomes}°C</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-[#0a1711] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#2d6a4f] to-[#52b788] rounded-full transition-all duration-500"
                      style={{ width: `${(rooftopTempGuHomes / rooftopTempTraditional) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#74c69d]">
                    <span>Hạ nhiệt thực tế:</span>
                    <span className="font-bold text-[#d8f3dc]">-{tempReduction}°C (Hiệu ứng bay hơi nước)</span>
                  </div>
                </div>
              </div>

              {/* Water Destination Showcase */}
              <div className="mt-6 rounded-xl border border-[#1b3827] bg-[#0c1813] p-4 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#52b788] uppercase block">
                  Ứng Dụng Nước Mưa Tuần Hoàn Tại Biệt Thự:
                </span>
                <div className="flex items-center gap-2 text-[#a8beaf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#52b788]" />
                  <span>Cung cấp 100% nước bù bay hơi hồ cá Koi (Thảo Điền & Thủ Thiêm).</span>
                </div>
                <div className="flex items-center gap-2 text-[#a8beaf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#52b788]" />
                  <span>Hệ tưới nhỏ giọt tự động cho vườn cây bóng mát và tường cây đứng.</span>
                </div>
                <div className="flex items-center gap-2 text-[#a8beaf]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#52b788]" />
                  <span>Xả rửa sàn sân thượng và cấp nước làm mát dàn ngưng điều hòa VRV.</span>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#1b3827]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#52b788] py-3.5 text-center text-xs font-mono font-medium tracking-wider text-[#0a1711] hover:bg-[#74c69d] transition-all shadow-[0_4px_20px_rgba(82,183,136,0.2)]"
                >
                  <span>Khảo sát hệ thống thu nước mưa cho tư gia</span>
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
