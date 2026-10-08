'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type AtriumId = 'thao-dien-courtyard' | 'ba-son-penthouse' | 'townhouse-chimney'

interface AtriumCase {
  id: AtriumId
  numberVi: string
  nameVi: string
  subtitleVi: string
  floraWaterVi: string
  airflowMechanismVi: string
  tempOutdoorC: number
  tempIndoorC: number
  deltaTempC: number
  humidityBalanceVi: string
  tagVi: string
  descriptionVi: string
  technicalSpecs: {
    chimneyHeight: string
    solarLouvers: string
    waterFeature: string
    coolingEnergySaved: string
  }
}

const ATRIUM_CASES: Record<AtriumId, AtriumCase> = {
  'thao-dien-courtyard': {
    id: 'thao-dien-courtyard',
    numberVi: '01',
    nameVi: 'Giếng Trời Lõi Xanh Biệt Thự Thảo Điền',
    subtitleVi: 'Cây Lộc Vừng Cổ Thụ & Hồ Cá Koi Vi Sinh Đá Bazan',
    floraWaterVi: 'Cây Lộc Vừng tán rộng 4.5m + Hồ cá Koi 18m³ lót đá Bazan đen chẻ thô',
    airflowMechanismVi: 'Hút khí mát bốc hơi từ mặt nước hồ cá Koi tầng trệt, luân chuyển qua lõi thông tầng và thoát khí nóng qua mái kính lùa cảm biến',
    tempOutdoorC: 36.5,
    tempIndoorC: 27.0,
    deltaTempC: 9.5,
    humidityBalanceVi: 'Cân bằng tự nhiên 62% RH không cần máy tạo ẩm',
    tagVi: 'Lõi Sinh Thái · Biệt Thự Sân Vườn',
    descriptionVi:
      'Tại biệt thự ven sông Thảo Điền, giếng trời trung tâm được thiết kế như một ốc đảo sinh thái. Mặt nước hồ cá Koi và tán lá Lộc Vừng đóng vai trò như cỗ máy điều hòa tự nhiên, làm giảm đến 9.5°C nhiệt độ không khí trước khi gió thổi vào phòng khách và phòng ăn.',
    technicalSpecs: {
      chimneyHeight: '12.5 mét (3 tầng thông suốt)',
      solarLouvers: 'Lam gỗ Teak tự nhiên xoay 45° cản nắng đỉnh đầu',
      waterFeature: 'Thác tràn tuần hoàn lọc sinh học vi sinh',
      coolingEnergySaved: 'Giảm 42% điện năng tiêu thụ điều hòa',
    },
  },
  'ba-son-penthouse': {
    id: 'ba-son-penthouse',
    numberVi: '02',
    nameVi: 'Thông Tầng Penthouse Ba Son View Sông',
    subtitleVi: 'Thác Nước Tuần Hoàn Tiêu Âm & Vách Đá Rêu Tự Cân Bằng',
    floraWaterVi: 'Vách rêu bảo tồn Scandinavia + Thác nước đá phiến đen Slate xẻ rãnh',
    airflowMechanismVi: 'Đón gió hướng Đông Nam từ sông Sài Gòn, cuốn theo vi hạt nước từ thác đá làm dịu không khí trước khi phân bổ vào các phòng ngủ',
    tempOutdoorC: 35.8,
    tempIndoorC: 26.8,
    deltaTempC: 9.0,
    humidityBalanceVi: 'Duy trì 60% RH trong phòng điều hòa kín',
    tagVi: 'Vi Khí Hậu Sông · Penthouse Hạng Sang',
    descriptionVi:
      'Căn Penthouse áp mái thường chịu bức xạ nhiệt mặt trời gay gắt. Khoảng thông tầng 2 tầng cao 7m với thác nước tuần hoàn chảy róc rách vừa triệt tiêu tiếng ồn đô thị bên dưới, vừa tạo áp suất âm hút khí tươi từ bờ sông tràn ngập tư gia.',
    technicalSpecs: {
      chimneyHeight: '7.2 mét thông tầng Duplex',
      solarLouvers: 'Kính Low-E Solar Control cản 88% tia hồng ngoại',
      waterFeature: 'Thác nước tuần hoàn lọc ozone không mùi clo',
      coolingEnergySaved: 'Giảm 38% phụ thuộc máy lạnh ban ngày',
    },
  },
  'townhouse-chimney': {
    id: 'townhouse-chimney',
    numberVi: '03',
    nameVi: 'Atrium Hiệu Ứng Ống Khói Nhà Phố',
    subtitleVi: 'Lam Gỗ Teak Xoay Tự Động & Cửa Chớp Đỉnh Mái Thông Minh',
    floraWaterVi: 'Vườn cây rủ Cúc Tần Ấn Độ & Bồn dương xỉ cổ đại lọc bụi mịn PM2.5',
    airflowMechanismVi: 'Ứng dụng nguyên lý đối lưu nhiệt Bernoulli: khí nóng nhẹ hơn bốc lên đỉnh ống khói thoát ra ngoài, kéo luồng khí mát từ sân trước vào nhà',
    tempOutdoorC: 37.0,
    tempIndoorC: 28.2,
    deltaTempC: 8.8,
    humidityBalanceVi: 'Thoát ẩm nhanh vào mùa mưa, không ẩm mốc tường',
    tagVi: 'Ống Khói Nhiệt · Nhà Phố Hướng Tây',
    descriptionVi:
      'Nhà phố hướng Tây hẹp ngang thường chịu cảnh hầm bí như lò nung. GuHomes kiến tạo giếng trời sau nhà với hệ lam gỗ Teak tự động xoay theo cảm biến quang học, tạo luồng gió đối lưu xuyên phòng liên tục suốt ngày đêm.',
    technicalSpecs: {
      chimneyHeight: '15.0 mét (Nhà phố 4 tầng)',
      solarLouvers: 'Lam gỗ Teak xoay góc tự động theo cảm biến nắng',
      waterFeature: 'Mương tiểu cảnh nước ngầm tuần hoàn chống muỗi',
      coolingEnergySaved: 'Giảm 35% chi phí điện làm mát',
    },
  },
}

export function SaigonCourtyardAtriumLab({ className }: { className?: string } = {}) {
  const [selectedAtrium, setSelectedAtrium] = useState<AtriumId>('thao-dien-courtyard')
  const [simulationActive, setSimulationActive] = useState<boolean>(true)

  const current = ATRIUM_CASES[selectedAtrium]

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0c0a] py-24 text-[#e8e4df] border-t border-[#1c1c1a]', className)}>
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(56,189,248,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#23353e] bg-[#101b22] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Khí Động Học Nhiệt Đới · Solar Chimney Courtyard
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Giếng Trời Khí Động Học: Trục Thở Sinh Thái Tư Gia
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Không gian Quiet Luxury không bị giam cầm trong những chiếc hộp bê tông bật máy lạnh 24/7. Chúng tôi ứng dụng hiệu ứng ống khói năng lượng mặt trời kết hợp mặt nước và cây xanh, đưa gió sông mát lành chảy qua từng tầng nhà.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {(Object.keys(ATRIUM_CASES) as AtriumId[]).map((key) => {
            const item = ATRIUM_CASES[key]
            const isActive = selectedAtrium === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedAtrium(key)}
                className={cn(
                  'rounded-xl border p-4 sm:p-5 text-left transition-all duration-300 min-h-[96px]',
                  isActive
                    ? 'border-cyan-500/60 bg-[#121a1f] text-[#f4efe6] shadow-xl shadow-cyan-950/30'
                    : 'border-[#222628] bg-[#111314] text-[#828a8d] hover:border-[#343e42] hover:bg-[#15191c]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400">{item.numberVi}</span>
                  <span className="rounded bg-[#17242c] border border-cyan-500/30 px-2 py-0.5 font-mono text-[10px] text-cyan-300">
                    -{item.deltaTempC}°C Làm Mát
                  </span>
                </div>
                <h3 className="mt-2 text-sm sm:text-base font-medium line-clamp-1 group-hover:text-[#f4efe6]">
                  {item.nameVi}
                </h3>
                <span className="mt-0.5 block text-xs text-[#6e777a] line-clamp-1">{item.tagVi}</span>
              </button>
            )
          })}
        </div>

        {/* Aerodynamic Simulation Cockpit */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch mb-16">
          {/* Left Column: Visual Airflow & Thermal Gradient (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#222a2e] bg-[#0f1417] p-6 sm:p-8 shadow-2xl">
            <div>
              {/* Graphic Frame */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#2a363d] bg-gradient-to-b from-[#161d22] via-[#0f161a] to-[#0a0f12] p-6 shadow-2xl">
                {/* Hot air rising top zone */}
                <div className="absolute top-0 inset-x-0 h-1/4 bg-gradient-to-b from-amber-500/10 to-transparent flex items-start justify-between p-4">
                  <span className="rounded bg-amber-950/70 border border-amber-500/40 px-2.5 py-1 font-mono text-[11px] text-amber-300">
                    Đỉnh Mái: Thoát Khí Nóng {current.tempOutdoorC}°C
                  </span>
                  <span className="font-mono text-xs text-amber-400 animate-bounce">↑ ↑ ↑</span>
                </div>

                {/* Central Cool Well Zone */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative flex flex-col items-center">
                    {/* Simulated vertical airflow currents */}
                    <div className="h-40 w-16 bg-gradient-to-t from-cyan-500/20 via-sky-400/15 to-transparent rounded-full blur-md animate-pulse" />
                    <span className="mt-2 rounded bg-black/70 border border-cyan-500/40 px-3 py-1 font-mono text-xs text-cyan-300 backdrop-blur-md">
                      Ống Khí Động Học ({current.technicalSpecs.chimneyHeight})
                    </span>
                  </div>
                </div>

                {/* Cool Bottom Reservoir */}
                <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-cyan-950/40 to-transparent flex items-end justify-between p-4">
                  <div>
                    <span className="rounded bg-cyan-950/80 border border-cyan-500/50 px-2.5 py-1 font-mono text-xs text-cyan-300">
                      Đáy Giếng Trời Mát Lạnh: {current.tempIndoorC}°C
                    </span>
                    <p className="mt-1 text-[11px] text-[#8ca3af]">{current.floraWaterVi}</p>
                  </div>
                  <div className="font-mono text-xl font-bold text-cyan-300">
                    -{current.deltaTempC}°C
                  </div>
                </div>
              </div>

              {/* Thermal Delta Metric Bar */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-[#222e35] bg-[#12191e] p-3 text-center sm:p-4">
                <div>
                  <span className="block font-mono text-[10px] text-[#70808a] uppercase">NHIỆT NGOÀI TRỜI</span>
                  <span className="mt-1 font-mono text-base sm:text-lg font-bold text-amber-400">
                    {current.tempOutdoorC}°C
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#909da3]">Nắng Tây gay gắt</span>
                </div>
                <div className="border-x border-[#222e35]">
                  <span className="block font-mono text-[10px] text-[#70808a] uppercase">NHIỆT TRONG NHÀ</span>
                  <span className="mt-1 font-mono text-base sm:text-lg font-bold text-cyan-400">
                    {current.tempIndoorC}°C
                  </span>
                  <span className="mt-0.5 block text-[10px] text-emerald-400">Mát dịu tự nhiên</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-[#70808a] uppercase">TIẾT KIỆM ĐIỆN NĂNG</span>
                  <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#d4af37]">
                    {current.technicalSpecs.coolingEnergySaved.split(' ')[1]}
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#909da3]">Giảm tải điều hòa</span>
                </div>
              </div>
            </div>

            {/* Aerodynamic Principle Note */}
            <div className="mt-6 rounded-lg border border-[#24333b] bg-[#121a1f] p-4 text-xs text-[#9bb0ba] leading-relaxed">
              <strong className="text-cyan-400 block mb-1">Cơ chế đối lưu nhiệt Bernoulli:</strong>
              {current.airflowMechanismVi}
            </div>
          </div>

          {/* Right Column: Case Details & Engineering Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#222a2e] bg-[#0f1417] p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  Hồ Sơ Kỹ Thuật · Atrium Engineering
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl text-[#f4efe6] font-light">
                  {current.nameVi}
                </h3>
                <p className="mt-1 text-xs text-[#8ca3af]">{current.subtitleVi}</p>
              </div>

              <p className="text-sm leading-relaxed text-[#c4d2d8]">
                {current.descriptionVi}
              </p>

              {/* 4 Technical Specs */}
              <div className="space-y-3 border-y border-[#20292f] py-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#758690]">Chiều cao ống khói:</span>
                  <span className="text-[#f4efe6] font-mono font-medium">{current.technicalSpecs.chimneyHeight}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#758690]">Lam cản nắng:</span>
                  <span className="text-[#f4efe6] text-right max-w-xs">{current.technicalSpecs.solarLouvers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#758690]">Mặt nước vi sinh:</span>
                  <span className="text-cyan-400 font-medium text-right max-w-xs">{current.technicalSpecs.waterFeature}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#758690]">Hiệu quả vi khí hậu:</span>
                  <span className="text-[#d4af37] font-medium text-right max-w-xs">{current.humidityBalanceVi}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#20292f] flex flex-col sm:flex-row items-center gap-3">
              <a
                href="/du-toan-chi-phi"
                className="w-full sm:w-auto flex-1 rounded-lg bg-cyan-500 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-cyan-400 active:scale-[0.98]"
              >
                Tính Toán Bóc Tách Giếng Trời
              </a>
              <a
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#2d3a42] bg-[#141b20] px-4 py-3 text-xs font-medium text-[#e8e4df] transition-colors hover:border-[#3e4f5a] hover:bg-[#182228]"
              >
                Xem Dự Án Thực Tế
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
