'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface PoolFeature {
  id: string
  numberVi: string
  nameVi: string
  technologyVi: string
  specVi: string
  benefitVi: string
  descriptionVi: string
  icon: string
}

const POOL_FEATURES: PoolFeature[] = [
  {
    id: 'acrylic-wall',
    numberVi: '01',
    nameVi: 'Vách Kính Acrylic Nguyên Khối 80mm',
    technologyVi: 'Polycast Monolithic Acrylic Laminated Structural Panel',
    specVi: 'Dày 80mm · Chịu áp lực nước 45 tấn · Độ truyền sáng 93%',
    benefitVi: 'Tầm nhìn không giới hạn ôm trọn đường chân trời sông Sài Gòn',
    descriptionVi:
      'Thay thế thành hồ bê tông nặng nề bằng vách acrylic quang học siêu trong nhập khẩu nguyên tấm. Không có bất kỳ đường nối hay ron silicon lộ diện, tạo cảm giác như đang bơi lơ lửng giữa lưng chừng trời mây và dòng sông uốn lượn.',
    icon: '💎',
  },
  {
    id: 'copper-silver-ion',
    numberVi: '02',
    nameVi: 'Điện Phân Khoáng Biển & Khử Khuẩn Ion Đồng - Bạc (Cu²⁺/Ag⁺)',
    technologyVi: '100% Chlorine-Free Mineral Ionization System',
    specVi: 'Nồng độ Clo dư: 0.0 ppm · Điện cực Titan phủ Ruthenium',
    benefitVi: 'Làn nước mềm mại như nước khoáng Onsen, không khô da cay mắt',
    descriptionVi:
      'Điện phân muối biển khoáng tự nhiên giải phóng ion Ag⁺ diệt khuẩn và ion Cu²⁺ ức chế rêu mốc. Làn nước thuần khiết đến mức an toàn tuyệt đối cho trẻ nhỏ mở mắt dưới nước và người lớn tuổi có làn da nhạy cảm.',
    icon: '✨',
  },
  {
    id: 'smart-heatpump',
    numberVi: '03',
    nameVi: 'Bơm Nhiệt Inverter Giữ Nước Ấm 29°C Quanh Năm',
    technologyVi: 'Full-Inverter Heat Pump with Titanium Heat Exchanger',
    specVi: 'COP 6.8 · Vận hành siêu tĩnh âm < 38 dBA · Dải nhiệt 28–32°C',
    benefitVi: 'Bơi lội thư giãn cả trong những đêm giông mưa rào Sài Gòn se lạnh',
    descriptionVi:
      'Thời tiết Sài Gòn mùa mưa hoặc nửa đêm có thể khiến nước hồ hạ nhiệt gây cảm lạnh. Hệ thống bơm nhiệt Inverter thu nhiệt từ không khí ẩm nhiệt đới để giữ ấm nước chính xác ở mức 29.5°C với mức tiêu thụ điện năng chỉ bằng 1/5 sợi đốt thông thường.',
    icon: '🌡️',
  },
  {
    id: 'acoustic-inverter-pump',
    numberVi: '04',
    nameVi: 'Cụm Lọc Thủy Lực Siêu Êm Giảm Chấn Đa Điểm',
    technologyVi: 'Variable Speed Drive Pump with Acoustic Enclosure',
    specVi: 'Độ rung chấn gầm sàn < 0.005 mm/s · Khử bọt khí Nano',
    benefitVi: 'Phòng ngủ master tầng dưới tĩnh lặng như tờ, không tiếng rù máy bơm',
    descriptionVi:
      'Hồ bơi penthouse đặt trên mái có nguy cơ truyền xung động vào kết cấu tòa nhà. GuHomes lắp đặt cụm bơm biến tần trên gối đệm cao su giảm chấn thủy lực chuyên dụng cho du thuyền, triệt tiêu 100% tiếng ồn cơ khí.',
    icon: '🔇',
  },
]

export function SaigonBespokeInfinityPoolLab({ className }: { className?: string } = {}) {
  const [activeFeatureId, setActiveFeatureId] = useState<string>('acrylic-wall')
  const [waterMode, setWaterMode] = useState<'ion-mineral' | 'traditional-chlorine'>('ion-mineral')

  const currentFeature =
    POOL_FEATURES.find((f) => f.id === activeFeatureId) ?? POOL_FEATURES[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#080d12] py-24 text-[#e2ecf5] border-t border-[#142330]', className)}>
      {/* Crystalline pool water caustic light reflection backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(30,144,255,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1d4468] bg-[#0c1f33] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#60a5fa]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] animate-ping" />
            Hồ Bơi Vô Cực Tư Gia · Bespoke Sky Infinity Pool &amp; Mineral Ion Lab
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f0f8ff]">
            Hồ Bơi Vô Cực Nước Khoáng &amp; Vách Kính Trong Suốt
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#94b2cb]">
            Một hồ bơi penthouse thượng đỉnh không mùi hóa chất nồng nặc hay làn da khô rát sau khi bơi. GuHomes mang công nghệ điện phân ion khoáng tự nhiên, kết hợp vách acrylic nguyên khối 80mm và bơm nhiệt Inverter để gia chủ tận hưởng làn nước ấm êm dịu giữa lưng chừng trời Sài Gòn.
          </p>
        </div>

        {/* 2-Column Core Architecture */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 4 Advanced Pool Engineering Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#1b344a] bg-[#0c1824]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1b344a] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa]">
                    4 Tiêu Chuẩn Kỹ Thuật Hồ Bơi Penthouse
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f0f8ff]">
                    Kỹ Nghệ Thủy Lực &amp; Vật Liệu Quang Học
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#12293f] px-3 py-1 text-xs font-mono text-[#93c5fd]">
                  <span>Vách kính Acrylic 80mm</span>
                </div>
              </div>

              {/* Feature Selection Chips */}
              <div className="mt-6 flex flex-col gap-2.5">
                {POOL_FEATURES.map((feature) => {
                  const isActive = feature.id === activeFeatureId
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => setActiveFeatureId(feature.id)}
                      className={cn(
                        'flex items-center justify-between p-3.5 rounded-xl border text-left transition-all min-h-[56px]',
                        isActive
                          ? 'border-[#60a5fa] bg-[#14324f] text-white shadow-[0_0_15px_rgba(96,165,250,0.18)]'
                          : 'border-[#1b344a] bg-[#09131d] text-[#86a2be] hover:border-[#2d5980] hover:text-[#d3e5f5]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#193b5d] font-mono text-xs font-bold text-[#93c5fd]">
                          {feature.numberVi}
                        </span>
                        <div>
                          <span className="block text-xs sm:text-sm font-medium">
                            {feature.nameVi.split(' (')[0]}
                          </span>
                          <span className="block text-[11px] text-[#6b89a6] line-clamp-1">
                            {feature.technologyVi}
                          </span>
                        </div>
                      </div>
                      <span className="text-xl hidden sm:inline">{feature.icon}</span>
                    </button>
                  )
                })}
              </div>

              {/* Active Feature Detail Card */}
              <div className="mt-6 rounded-xl border border-[#214362] bg-[#0f2437] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa]">
                    TIÊU CHUẨN {currentFeature.numberVi} · {currentFeature.technologyVi}
                  </span>
                  <span className="text-2xl">{currentFeature.icon}</span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f0f8ff]">
                  {currentFeature.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#bad1e5]">
                  {currentFeature.descriptionVi}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#1b344a]">
                  <div className="rounded-lg bg-[#08131d] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#5a80a4]">Thông Số Kỹ Thuật</span>
                    <span className="mt-1 block text-xs font-medium text-[#dcebf7]">
                      {currentFeature.specVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#08131d] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#5a80a4]">Giá Trị Nghỉ Dưỡng</span>
                    <span className="mt-1 block text-xs font-medium text-[#60a5fa]">
                      {currentFeature.benefitVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Mineral Ionization vs Chlorine Comparison */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#1b344a] bg-[#0c1824]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#1b344a] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa]">
                    Kiểm Nghiệm Độ Thuần Khiết Làn Nước
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f0f8ff]">
                    Điện Phân Ion vs Nước Clo Truyền Thống
                  </h3>
                </div>
              </div>

              {/* Water Mode Switcher */}
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-[#070e16] p-1.5 border border-[#1b344a]">
                <button
                  type="button"
                  onClick={() => setWaterMode('ion-mineral')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    waterMode === 'ion-mineral'
                      ? 'bg-[#3b82f6] text-white font-bold shadow-md'
                      : 'text-[#7292b0] hover:text-[#93c5fd]'
                  )}
                >
                  Nước Khoáng Ion (0.0 Clo)
                </button>
                <button
                  type="button"
                  onClick={() => setWaterMode('traditional-chlorine')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    waterMode === 'traditional-chlorine'
                      ? 'bg-amber-700 text-white font-bold shadow-md'
                      : 'text-[#7292b0] hover:text-white'
                  )}
                >
                  Clo Hóa Chất Thông Thường
                </button>
              </div>

              {/* Chemical Metrics Comparison Card */}
              <div className="mt-6 space-y-4">
                {waterMode === 'ion-mineral' ? (
                  <div className="rounded-xl border border-emerald-800/60 bg-emerald-950/25 p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-300 font-medium">Nồng Độ Hóa Chất Clo Tự Do (Free Chlorine)</span>
                      <span className="font-mono font-bold text-emerald-400 text-base">0.0 ppm</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-emerald-900/40 text-emerald-200">
                      <div>
                        <span className="text-emerald-400 block font-mono text-[10px]">ION ĐỒNG KHÁNG TẢO:</span>
                        <span>0.2 - 0.4 mg/L</span>
                      </div>
                      <div>
                        <span className="text-emerald-400 block font-mono text-[10px]">ION BẠC KHỬ KHUẨN:</span>
                        <span>0.05 - 0.1 mg/L</span>
                      </div>
                    </div>
                    <span className="block text-[10px] text-emerald-300/80 leading-relaxed">
                      ✓ Nước mềm mại, ngọt lành như suối tự nhiên. Mở mắt lặn sâu không cay mắt, bảo vệ tóc nhuộm và làn da nhạy cảm.
                    </span>
                  </div>
                ) : (
                  <div className="rounded-xl border border-amber-800/60 bg-amber-950/25 p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-amber-300 font-medium">Nồng Độ Clo Tự Do Bốc Hơi Trong Không Khí</span>
                      <span className="font-mono font-bold text-amber-400 text-base">2.5 - 3.5 ppm</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-amber-900/40 text-amber-200">
                      <div>
                        <span className="text-amber-400 block font-mono text-[10px]">MÙI HÓA CHẤT:</span>
                        <span>Nồng nặc khó thở</span>
                      </div>
                      <div>
                        <span className="text-amber-400 block font-mono text-[10px]">TÁC ĐỘNG DA & TÓC:</span>
                        <span>Khô rát, xơ rối</span>
                      </div>
                    </div>
                    <span className="block text-[10px] text-amber-300/80 leading-relaxed">
                      ⚠️ Khí Clo bốc hơi làm ăn mòn tay vịn kim loại và bản lề cửa nhôm kính ban công penthouse theo thời gian.
                    </span>
                  </div>
                )}

                {/* Heat Pump Thermostat Display */}
                <div className="rounded-xl border border-[#214362] bg-[#0d1d2e] p-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-[#60a5fa] uppercase block">
                      Bơm Nhiệt Thông Minh (Heat Pump Inverter)
                    </span>
                    <span className="text-xs text-[#bad1e5]">Cân bằng nhiệt 4 mùa Sài Gòn</span>
                  </div>
                  <span className="font-mono text-xl font-bold text-[#93c5fd]">29.5°C</span>
                </div>
              </div>

              {/* Bespoke Project Locations */}
              <div className="mt-6 space-y-2 text-xs">
                <span className="font-mono text-[10px] text-[#60a5fa] uppercase block">
                  Công Trình Đã Triển Khai Hồ Bơi Acrylic GuHomes:
                </span>
                <div className="rounded-lg bg-[#09131d] p-3 space-y-1.5 border border-[#1b344a]">
                  <div className="flex justify-between items-center text-[#dcebf7]">
                    <span className="font-medium">Sky Villa The Opera Metropole Thủ Thiêm</span>
                    <span className="font-mono text-[10px] text-[#60a5fa]">Acrylic 80mm</span>
                  </div>
                  <div className="flex justify-between items-center text-[#dcebf7]">
                    <span className="font-medium">Dinh Thự Đơn Lập Ven Sông Thảo Điền</span>
                    <span className="font-mono text-[10px] text-[#60a5fa]">Hồ Khoáng Onsen</span>
                  </div>
                  <div className="flex justify-between items-center text-[#dcebf7]">
                    <span className="font-medium">Penthouse Grand Marina Saigon Ba Son</span>
                    <span className="font-mono text-[10px] text-[#60a5fa]">Nước Ấm 29°C</span>
                  </div>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#1b344a]">
                <Link
                  href="/contact"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#3b82f6] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#080d12] hover:bg-[#60a5fa] transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)]"
                >
                  <span>Khảo sát kỹ thuật hồ bơi vô cực tư gia</span>
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
