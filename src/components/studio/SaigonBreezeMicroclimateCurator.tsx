'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type RiverZoneId = 'thu-thiem' | 'thao-dien' | 'ba-son' | 'phu-my-hung'

interface RiverZoneSpec {
  id: RiverZoneId
  nameVi: string
  subtitleVi: string
  riverWindVectorVi: string
  co2LevelPpm: number
  energySavingsPercent: number
  breezeVelocityMs: string
  dominantSeasonVi: string
  tagVi: string
  descriptionVi: string
  aerodynamicSolutionVi: string
}

const RIVER_ZONES: Record<RiverZoneId, RiverZoneSpec> = {
  'thu-thiem': {
    id: 'thu-thiem',
    nameVi: 'Bán Đảo Thủ Thiêm (The Opera, Empire City)',
    subtitleVi: 'Khúc Quanh Sông Sài Gòn · Gió Đông Nam Từ Rừng Sác Cần Giờ',
    riverWindVectorVi: 'Gió biển Đông Nam thổi qua dải rừng phòng hộ Cần Giờ, uốn quanh bán đảo',
    co2LevelPpm: 420,
    energySavingsPercent: 48,
    breezeVelocityMs: '0.45 m/s (Gió thoảng dịu êm)',
    dominantSeasonVi: 'Quanh năm, mạnh nhất từ Tháng 3 đến Tháng 9',
    tagVi: 'Sông Ôm 3 Mặt · Đỉnh Cao Vi Khí Hậu',
    descriptionVi:
      'Với vị trí bán đảo được bao bọc 3 mặt bởi sông Sài Gòn, các căn Penthouse tại The Opera và Empire City sở hữu nguồn khí tươi vô tận. GuHomes bố trí trục cửa lật khí động học đối diện hướng sông, tạo áp suất âm tự nhiên hút khí mát liên tục qua các phòng khách và phòng ngủ.',
    aerodynamicSolutionVi: 'Hệ lam gỗ Teak hướng nghiêng 35° đón gió ven sông, ngăn bụi mịn bằng màng lọc thực vật ban công.',
  },
  'thao-dien': {
    id: 'thao-dien',
    nameVi: 'Thảo Điền Riverside & An Phú (TP. Thủ Đức)',
    subtitleVi: 'Hành Lang Gió Sông Bờ Bắc · Không Khí Mát Rượi Quanh Năm',
    riverWindVectorVi: 'Gió Nam - Tây Nam luân chuyển dọc bờ sông rợp bóng dừa nước',
    co2LevelPpm: 435,
    energySavingsPercent: 45,
    breezeVelocityMs: '0.38 m/s (Thoang thoảng tự nhiên)',
    dominantSeasonVi: 'Gió mùa Tây Nam từ Tháng 5 đến Tháng 11',
    tagVi: 'Hành Lang Gió Sông · Biệt Thự Vườn',
    descriptionVi:
      'Khu vực biệt thự Thảo Điền có mật độ cây xanh cao nhất TP.HCM. Bằng cách thiết kế các khoảng giếng trời mở và hành lang thông gió xuyên phòng (Cross-Ventilation), không gian luôn duy trì nhiệt độ dễ chịu 27°C mà không cần phụ thuộc vào máy điều hòa.',
    aerodynamicSolutionVi: 'Cửa trượt kính không ray âm sàn mở rộng 100% khẩu độ nối liền phòng khách với sân vườn bờ sông.',
  },
  'ba-son': {
    id: 'ba-son',
    nameVi: 'Ba Son Golden River & Bến Nghé (Quận 1)',
    subtitleVi: 'Giảm Đảo Nhiệt Đô Thị · Gió Đối Lưu Giữa Trung Tâm',
    riverWindVectorVi: 'Gió sông thổi từ cảng Ba Son cũ, đối lưu với công viên Thảo Cầm Viên',
    co2LevelPpm: 448,
    energySavingsPercent: 42,
    breezeVelocityMs: '0.40 m/s (Lưu thông êm ru)',
    dominantSeasonVi: 'Đối lưu nhiệt ngày đêm liên tục',
    tagVi: 'Triệt Đảo Nhiệt · Trái Tim Quận 1',
    descriptionVi:
      'Giữa trung tâm Quận 1 oi bức, các căn hộ Ba Son ven sông đón luồng gió đối lưu tự nhiên đẩy lùi hiệu ứng đảo nhiệt đô thị (Urban Heat Island). Không khí phòng khách luôn tươi mới, đẩy sạch khí tù đọng của các khối bê tông lân cận.',
    aerodynamicSolutionVi: 'Hệ thống cửa lật cơ học giấu mép trần hút gió tầng thấp và xả nhiệt tầng cao.',
  },
  'phu-my-hung': {
    id: 'phu-my-hung',
    nameVi: 'Phú Mỹ Hưng & Nam Sài Gòn (Quận 7, Nhà Bè)',
    subtitleVi: 'Gió Sông Nhà Bè & Rạch Đĩa · Độ Ẩm Cân Bằng Sinh Thái 65%',
    riverWindVectorVi: 'Gió Nam từ hệ thống kênh rạch sông Nhà Bè thổi ngược lên',
    co2LevelPpm: 425,
    energySavingsPercent: 46,
    breezeVelocityMs: '0.42 m/s (Mát dịu)',
    dominantSeasonVi: 'Tháng 11 đến Tháng 4 năm sau',
    tagVi: 'Hệ Kênh Rạch · Nam Sài Gòn',
    descriptionVi:
      'Đặc trưng nhiều sông ngòi của Nam Sài Gòn mang lại dải ẩm cân bằng tự nhiên. Các biệt thự và căn hộ Phú Mỹ Hưng được tính toán hướng đón gió thông tầng, giúp đồ gỗ nội thất luôn được thở trong bầu không khí trong lành.',
    aerodynamicSolutionVi: 'Khoảng đệm hành lang gỗ tự nhiên che chắn hướng nắng Tây, đón trọn gió Nam mát lành.',
  },
}

export function SaigonBreezeMicroclimateCurator({ className }: { className?: string } = {}) {
  const [selectedZone, setSelectedZone] = useState<RiverZoneId>('thu-thiem')
  const [simulationActive, setSimulationActive] = useState(true)
  const [cfdModalOpen, setCfdModalOpen] = useState(false)

  const current = RIVER_ZONES[selectedZone]

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0c0a] py-24 text-[#e8e4df] border-t border-[#1d1d1a]', className)}>
      {/* Background ambient river glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#1e3442] bg-[#0d1820] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-sky-400">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            Vi Khí Hậu Gió Sông Tự Nhiên · Saigon River Breeze
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f4efe6]">
            Điều Phối Vi Khí Hậu Gió Sông Sài Gòn
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#a8a29e]">
            Đón gió sông thay cho máy lạnh là triết lý sống đỉnh cao của Quiet Luxury nhiệt đới. GuHomes tính toán khí động học dòng khí ven sông qua 4 tâm điểm bất động sản thượng lưu, mang không khí rừng sinh thái vào từng căn phòng.
          </p>
        </div>

        {/* River Zone Selector Tabs */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(Object.keys(RIVER_ZONES) as RiverZoneId[]).map((zoneKey) => {
            const item = RIVER_ZONES[zoneKey]
            const isActive = selectedZone === zoneKey
            return (
              <button
                key={zoneKey}
                type="button"
                onClick={() => setSelectedZone(zoneKey)}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all duration-300 min-h-[96px]',
                  isActive
                    ? 'border-sky-500/60 bg-[#101b22] text-[#f4efe6] shadow-xl shadow-sky-950/40'
                    : 'border-[#22282d] bg-[#111417] text-[#7d8890] hover:border-[#333d45] hover:bg-[#14191d]'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-sky-400">🌊</span>
                  <span className="font-mono text-[10px] text-emerald-400">-{item.energySavingsPercent}% Điện</span>
                </div>
                <h3 className="mt-2 text-xs sm:text-sm font-medium line-clamp-1 group-hover:text-[#f4efe6]">
                  {item.nameVi.split(' (')[0]}
                </h3>
                <span className="mt-0.5 block text-[11px] text-[#606d75] line-clamp-1">{item.tagVi}</span>
              </button>
            )
          })}
        </div>

        {/* Main Aerodynamic Dashboard */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch mb-16">
          {/* Left Column: Visual Airflow Vector & Air Quality Cockpit (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#202b33] bg-[#0e1418] p-6 sm:p-8 shadow-2xl">
            <div>
              {/* Graphic River Wind Stage */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#2a3843] bg-gradient-to-br from-[#121c22] via-[#0c1317] to-[#070b0e] p-6 shadow-2xl">
                {/* Wind currents animation overlay */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, #38bdf8 0px, transparent 1px, transparent 30px)',
                  }}
                />

                {/* River Current Glow Ribbon */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-sky-500/20 to-transparent" />

                {/* Top Status */}
                <div className="absolute top-4 left-4 flex flex-col gap-1">
                  <span className="rounded bg-black/70 border border-[#283844] px-2.5 py-1 font-mono text-xs text-sky-400 backdrop-blur-md">
                    VECTOR GIÓ SÔNG: {current.breezeVelocityMs}
                  </span>
                  <span className="font-mono text-[11px] text-[#8ca3af]">
                    Mùa chủ đạo: {current.dominantSeasonVi}
                  </span>
                </div>

                {/* Central Airflow Graphic */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center">
                  <span className="font-mono text-4xl sm:text-5xl text-sky-300 drop-shadow mb-2">≈ ≈ ≈</span>
                  <h4 className="font-serif text-lg sm:text-xl text-[#f4efe6] font-light max-w-md drop-shadow">
                    {current.nameVi}
                  </h4>
                  <p className="mt-1 text-xs text-[#a0b5c1] font-mono drop-shadow max-w-sm">
                    {current.riverWindVectorVi}
                  </p>
                </div>

                {/* Bottom Air Quality Ribbon */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-black/80 p-3 backdrop-blur-md border border-[#22313b] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[#f4efe6]">Nồng Độ CO2 Trong Phòng:</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">{current.co2LevelPpm} PPM (Chuẩn Rừng)</span>
                </div>
              </div>

              {/* Environmental Metrics Comparison */}
              <div className="mt-6 grid grid-cols-3 gap-3 rounded-lg border border-[#1f2c35] bg-[#10171d] p-3 text-center sm:p-4">
                <div>
                  <span className="block font-mono text-[10px] text-[#6b7b85] uppercase">CO2 PHÒNG KÍN</span>
                  <span className="mt-1 font-mono text-base sm:text-lg font-bold text-red-400">
                    1200 PPM
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#909da3]">Gây uể oải đau đầu</span>
                </div>
                <div className="border-x border-[#1f2c35]">
                  <span className="block font-mono text-[10px] text-[#6b7b85] uppercase">GUHOMES ĐÓN GIÓ</span>
                  <span className="mt-1 font-mono text-base sm:text-lg font-bold text-emerald-400">
                    {current.co2LevelPpm} PPM
                  </span>
                  <span className="mt-0.5 block text-[10px] text-emerald-400">Chuẩn rừng sinh thái</span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] text-[#6b7b85] uppercase">TIẾT KIỆM ĐIỆN</span>
                  <span className="mt-1 font-mono text-base sm:text-lg font-bold text-[#d4af37]">
                    -{current.energySavingsPercent}%
                  </span>
                  <span className="mt-0.5 block text-[10px] text-[#909da3]">Mùa khô Sài Gòn</span>
                </div>
              </div>
            </div>

            {/* Aerodynamic cross-ventilation quote */}
            <div className="mt-6 rounded-lg border border-[#21303a] bg-[#111920] p-4 text-xs text-[#9bb0ba] leading-relaxed">
              <p className="font-serif italic text-sky-400 mb-1">
                &ldquo;Không khí trong lành là món quà xa xỉ nhất của đô thị hiện đại. Khi gió sông được dẫn dắt có chủ ý qua từng khe cửa, ngôi nhà trở thành một máy lọc sinh học khổng lồ cho gia đình.&rdquo;
              </p>
              <span className="block text-[11px] text-[#677782] mt-2">— Chuyên gia vi khí hậu GuHomes</span>
            </div>
          </div>

          {/* Right Column: Narrative & Technical Solution (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#202b33] bg-[#0e1418] p-6 sm:p-8 shadow-2xl">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-sky-400">
                  Phân Tích Khí Động Học · Wind Flow Analysis
                </span>
                <h3 className="mt-1 font-serif text-2xl text-[#f4efe6] font-light">
                  {current.nameVi}
                </h3>
                <p className="mt-1 text-xs text-[#7d8b94]">{current.subtitleVi}</p>
              </div>

              <p className="text-sm leading-relaxed text-[#c4d2d8]">
                {current.descriptionVi}
              </p>

              {/* Aerodynamic Technical Box */}
              <div className="rounded-xl border border-[#253540] bg-[#121b22] p-4 text-xs space-y-2">
                <div className="flex items-center gap-2 text-sky-400">
                  <span>💨</span>
                  <strong className="font-mono uppercase text-[11px]">Giải Pháp Kiến Trúc GuHomes:</strong>
                </div>
                <p className="text-[#a8bcc8] leading-relaxed">{current.aerodynamicSolutionVi}</p>
                <div className="border-t border-[#1c272f] pt-2 text-[#70828d]">
                  <strong className="text-[#e8e4df]">Vận tốc gió đạt chuẩn:</strong> {current.breezeVelocityMs}
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-4 border-t border-[#1c272f] flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => setCfdModalOpen(true)}
                className="w-full sm:w-auto flex-1 rounded-lg bg-sky-500 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-sky-400 active:scale-[0.98]"
              >
                Mô Phỏng CFD Luồng Gió Tư Gia
              </button>
              <a
                href="/khu-vuc"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#2d3a43] bg-[#141b20] px-4 py-3 text-xs font-medium text-[#e8e4df] transition-colors hover:border-[#3e4f5a] hover:bg-[#182228]"
              >
                Khám Phá Khu Vực
                <ArrowUpRightIcon className="h-3.5 w-3.5 text-sky-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Modal: Mô phỏng CFD luồng gió */}
        <AnimatePresence>
          {cfdModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full rounded-2xl border border-[#2a3843] bg-[#11181d] p-6 sm:p-8 shadow-2xl text-[#e8e4df]"
              >
                <div className="flex items-center justify-between pb-4 border-b border-[#202b33]">
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/20 text-sky-400 text-xs">
                      ✓
                    </span>
                    <h4 className="font-serif text-lg text-[#f4efe6]">Mô Phỏng Khí Động Học CFD</h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCfdModalOpen(false)}
                    className="text-[#6b7b85] hover:text-[#f4efe6] text-xl"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-xs text-[#a8bcc8]">
                  <p>
                    Kỹ sư vi khí hậu GuHomes sẽ dựng mô hình số CFD (Computational Fluid Dynamics) mô phỏng chính xác:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[#c4d2d8]">
                    <li>Góc nghiêng đón gió sông của các mặt dựng kính</li>
                    <li>Vị trí đặt cửa lật thông gió tránh vùng khí quẩn (Air Stagnation)</li>
                    <li>Hiệu quả làm mát giảm tải máy lạnh cho căn nhà</li>
                  </ul>
                  <div className="rounded border border-[#23323c] bg-[#0c1216] p-3 text-[11px] space-y-1 mt-3">
                    <p><strong className="text-[#e8e4df]">Khu vực ưu tiên:</strong> Thủ Thiêm, Thảo Điền, Ba Son, Phú Mỹ Hưng</p>
                    <p><strong className="text-[#e8e4df]">Hotline KTS Trưởng:</strong> 0368 757 916</p>
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setCfdModalOpen(false)}
                    className="w-full rounded bg-sky-500 py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-sky-400"
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
