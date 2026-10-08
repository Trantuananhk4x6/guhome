'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type BuildingZone = 'thu-thiem' | 'thao-dien' | 'phu-my-hung' | 'ba-son'

interface ZoneProfile {
  id: BuildingZone
  nameVi: string
  subVi: string
  avgOutdoorTemp: number
  avgHumidityRainy: number
  riverWindSpeed: string
  microclimateNote: string
}

const SAIGON_ZONES: Record<BuildingZone, ZoneProfile> = {
  'thu-thiem': {
    id: 'thu-thiem',
    nameVi: 'Bán Đảo Thủ Thiêm (The Metropole / The River)',
    subVi: 'Độ ẩm gió sông 82% · Nắng xế chiều phản xạ mặt nước',
    avgOutdoorTemp: 36,
    avgHumidityRainy: 84,
    riverWindSpeed: '2.8 – 3.8 m/s (Gió Nam sông Sài Gòn)',
    microclimateNote: 'Bức xạ nhiệt mặt sông làm tăng áp lực nhiệt buổi chiều; đêm về gió đối lưu mạnh cần điều tiết tránh đọng sương.',
  },
  'thao-dien': {
    id: 'thao-dien',
    nameVi: 'Bán Đảo Thảo Điền (Thảo Điền Green / Riverside)',
    subVi: 'Độ ẩm bão hòa 88% · Sông nước bao bọc 3 mặt',
    avgOutdoorTemp: 35,
    avgHumidityRainy: 88,
    riverWindSpeed: '2.5 – 3.5 m/s (Gió ẩm lưu vực sông)',
    microclimateNote: 'Độ ẩm nền rất cao quanh năm; chênh lệch nhiệt độ trong nhà và ngoài trời dễ làm miệng gió nhôm đọng sương rỏ trần.',
  },
  'phu-my-hung': {
    id: 'phu-my-hung',
    nameVi: 'Phú Mỹ Hưng (Château / Midtown Quận 7)',
    subVi: 'Gió vịnh Cần Giờ 80% · Lưu vực sông Rạch Đĩa',
    avgOutdoorTemp: 35.5,
    avgHumidityRainy: 85,
    riverWindSpeed: '3.0 – 4.0 m/s (Gió biển Cần Giờ)',
    microclimateNote: 'Gió thoáng nhưng độ ẩm buổi tối tăng nhanh sau 19:00, tiềm ẩn nguy cơ nấm mốc trần thạch cao phòng ngủ master.',
  },
  'ba-son': {
    id: 'ba-son',
    nameVi: 'Ba Son Quận 1 (Grand Marina Saigon)',
    subVi: 'Tầng cao gió xoáy · Kính Low-E bức xạ lớn',
    avgOutdoorTemp: 37,
    avgHumidityRainy: 80,
    riverWindSpeed: '2.2 – 3.2 m/s (Gió đối lưu trên cao)',
    microclimateNote: 'Độ cao trên 30 tầng khiến áp suất gió lớn, hệ thống cấp gió tươi cần tích hợp bộ điều tiết lưu lượng tĩnh.',
  },
}

// Magnus-Tetens approximation for Dew Point Temperature
function calculateDewPoint(tempC: number, rhPercent: number): number {
  const a = 17.27
  const b = 237.7
  const alpha = (a * tempC) / (b + tempC) + Math.log(rhPercent / 100)
  const dewPoint = (b * alpha) / (a - alpha)
  return Math.round(dewPoint * 10) / 10
}

export function TropicalHvacAirflowSimulator({ className }: { className?: string }) {
  const [selectedZoneId, setSelectedZoneId] = useState<BuildingZone>('thu-thiem')
  const [roomTemp, setRoomTemp] = useState<number>(24) // °C
  const [roomHumidity, setRoomHumidity] = useState<number>(82) // %
  const [isGuhomesStandard, setIsGuhomesStandard] = useState<boolean>(true)

  const zone = SAIGON_ZONES[selectedZoneId] ?? SAIGON_ZONES['thu-thiem']
  const dewPoint = calculateDewPoint(roomTemp, roomHumidity)

  // Surface temperature of the diffuser based on supply air (~15°C)
  // Conventional aluminum diffuser has surface temp ~16°C (very cold due to high conductivity k=205)
  // GuHomes ABS trimless diffuser has surface temp ~22.5°C (insulated polymer k=0.17)
  const diffuserSurfaceTemp = isGuhomesStandard ? roomTemp - 1.5 : 16.0
  const isCondensing = diffuserSurfaceTemp <= dewPoint
  const tempMargin = Math.round((diffuserSurfaceTemp - dewPoint) * 10) / 10

  const uniqueId = useId()

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-canvas border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Kỹ Thuật Cơ Điện &amp; Vi Khí Hậu Sài Gòn · GuHomes MEP Engineering
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Dew Point Condensation Safety
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Mô Phỏng Điểm Sương &amp; Điều Hòa VRV Chống Đọng Nước
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Tại Sài Gòn với độ ẩm 80–90%, điều hòa âm trần nối ống gió (VRV) nếu thi công ẩu sẽ bị ngưng tụ hơi nước (đọng sương), nhỏ giọt phá hỏng trần thạch cao và làm ẩm mốc hệ tủ mộc tiền tỷ. Xem sự khác biệt giữa thi công thông thường và chuẩn mực GuHomes.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Công thức Magnus-Tetens chuẩn xác</span>
          </div>
        </div>

        {/* Zone Selector */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(SAIGON_ZONES) as BuildingZone[]).map((zId) => {
            const z = SAIGON_ZONES[zId]
            const isSelected = selectedZoneId === zId
            return (
              <button
                key={zId}
                type="button"
                onClick={() => {
                  setSelectedZoneId(zId)
                  setRoomHumidity(z.avgHumidityRainy)
                }}
                className={cn(
                  'p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-surface shadow-md ring-1 ring-accent/40'
                    : 'border-line bg-canvas hover:border-line-dark'
                )}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent">
                    Độ ẩm: {z.avgHumidityRainy}%
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-ink mt-1">
                    {z.nameVi}
                  </h3>
                </div>
                <p className="text-[11px] text-muted font-mono mt-2 truncate">{z.riverWindSpeed}</p>
              </button>
            )
          })}
        </div>

        {/* Main Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Calculator & Live Simulator */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            {/* System Switcher */}
            <div className="p-6 rounded-3xl bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-muted">Phương Pháp Thi Công Cơ Điện</p>
                <h4 className="font-serif text-xl text-ink font-light mt-1">
                  {isGuhomesStandard ? 'Chuẩn Độc Quyền GuHomes: Miệng gió ABS + Bảo ôn Aeroflex đôi' : 'Hệ Thông Thường Ngoài Thị Trường: Miệng gió nhôm + PE đơn 10mm'}
                </h4>
              </div>

              <div className="inline-flex p-1.5 rounded-2xl bg-canvas border border-line shrink-0">
                <button
                  type="button"
                  onClick={() => setIsGuhomesStandard(false)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-mono transition-all',
                    !isGuhomesStandard
                      ? 'bg-rose-600/10 text-rose-600 border border-rose-500/30 font-semibold shadow-sm'
                      : 'text-muted hover:text-ink'
                  )}
                >
                  Hệ Thông Thường
                </button>
                <button
                  type="button"
                  onClick={() => setIsGuhomesStandard(true)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs font-mono transition-all',
                    isGuhomesStandard
                      ? 'bg-accent text-canvas font-semibold shadow-sm'
                      : 'text-muted hover:text-ink'
                  )}
                >
                  GuHomes Anti-Dew
                </button>
              </div>
            </div>

            {/* Live Sliders Card */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Biến Số Vi Khí Hậu Thực Tế Căn Hộ</span>
                <span className="text-accent">Điều chỉnh để kiểm nghiệm rủi ro</span>
              </div>

              <div className="mt-6 space-y-6">
                {/* Room Temperature Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-ink font-semibold">1. Nhiệt độ phòng cài đặt (Set Temp):</span>
                    <span className="text-accent text-sm font-semibold">{roomTemp}°C</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="28"
                    step="0.5"
                    value={roomTemp}
                    onChange={(e) => setRoomTemp(parseFloat(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted/60 mt-1">
                    <span>20°C (Lạnh sâu)</span>
                    <span>24°C (Chuẩn Quiet Luxury)</span>
                    <span>28°C (Tiết kiệm)</span>
                  </div>
                </div>

                {/* Relative Humidity Slider */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-ink font-semibold">2. Độ ẩm tương đối không khí Sài Gòn (RH):</span>
                    <span className="text-accent text-sm font-semibold">{roomHumidity}%</span>
                  </div>
                  <input
                    type="range"
                    min="55"
                    max="95"
                    step="1"
                    value={roomHumidity}
                    onChange={(e) => setRoomHumidity(parseInt(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted/60 mt-1">
                    <span>55% (Mùa khô)</span>
                    <span>75% (Trung bình)</span>
                    <span>95% (Mưa bão ngập triều)</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Calculation Results Banner */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-line/60">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Nhiệt độ Điểm Sương</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {dewPoint}°C
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Dew Point (Tdew)</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Nhiệt độ bề mặt miệng gió</p>
                  <p className={cn('text-2xl font-serif mt-1 font-light', isCondensing ? 'text-rose-600' : 'text-accent')}>
                    {diffuserSurfaceTemp.toFixed(1)}°C
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Surface Temp</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Biên độ an toàn nhiệt</p>
                  <p className={cn('text-2xl font-serif mt-1 font-light', tempMargin >= 0 ? 'text-accent' : 'text-rose-600')}>
                    {tempMargin >= 0 ? `+${tempMargin}°C` : `${tempMargin}°C`}
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">
                    {tempMargin >= 0 ? 'Vùng an toàn khô ráo' : 'Vùng ngưng tụ nước'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Nguy cơ đọng sương rỏ trần</p>
                  <p className={cn('text-lg font-serif mt-1 font-medium', isCondensing ? 'text-rose-600' : 'text-accent')}>
                    {isCondensing ? 'CỰC KỲ CAO (ĐỌNG NƯỚC)' : '0% (TUYỆT ĐỐI KHÔ)'}
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Condensation Risk</p>
                </div>
              </div>
            </div>

            {/* Visualizer Diffuser Section Cross-Cut */}
            <div className="p-8 rounded-3xl bg-canvas border border-line relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Mô Phỏng Trực Quan Mặt Cắt Miệng Gió Khe Hẹp (Slot Diffuser)</span>
                <span className={isCondensing ? 'text-rose-600 font-semibold' : 'text-accent font-semibold'}>
                  {isCondensing ? '⚠ Đang nhỏ giọt đọng sương' : '✓ Khô ráo hoàn hảo'}
                </span>
              </div>

              {/* Graphic Visual Representation */}
              <div className="mt-6 relative h-48 sm:h-56 w-full rounded-2xl bg-surface/80 border border-line p-6 flex flex-col justify-between overflow-hidden">
                {/* Ceiling Line */}
                <div className="border-b-2 border-line-dark w-full pb-2 flex justify-between items-center text-[10px] font-mono text-muted">
                  <span>Trần Thạch Cao Knauf Chống Ẩm</span>
                  <span>Khe gió giấu viền Trimless</span>
                </div>

                {/* Air flow arrows */}
                <div className="relative flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-canvas border border-line text-ink">
                      <span>Luồng khí lạnh 15°C</span>
                      <span className="text-accent">➔</span>
                      <span>{isGuhomesStandard ? 'Miệng gió nhựa ABS chống dẫn nhiệt' : 'Miệng gió nhôm truyền lạnh nhanh'}</span>
                    </div>

                    {/* Droplets simulation if condensing */}
                    {isCondensing ? (
                      <div className="mt-4 flex justify-center gap-4 text-rose-500 animate-bounce">
                        <span>💧</span>
                        <span>💧</span>
                        <span>💧</span>
                        <span>💧</span>
                      </div>
                    ) : (
                      <div className="mt-4 flex items-center justify-center gap-2 text-xs font-mono text-accent">
                        <CheckIcon className="text-sm" />
                        <span>Màng vật liệu ABS cách nhiệt giữ miệng gió luôn ấm &gt; Điểm sương {dewPoint}°C</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Floor / Millwork Line */}
                <div className="border-t border-dashed border-line w-full pt-2 flex justify-between items-center text-[10px] font-mono text-muted">
                  <span>Hệ Tủ Mộc Gỗ Tự Nhiên GuHomes Phía Dưới</span>
                  <span className={isCondensing ? 'text-rose-600 font-semibold' : 'text-accent'}>
                    {isCondensing ? 'Nguy cơ nước nhỏ làm ố gỗ & rộp sơn!' : 'Bảo vệ mộc hoàn hảo 100%'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: GuHomes 4 Engineering Standards */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* Engineering Standard Checklist */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Chuẩn Kỹ Thuật Độc Quyền GuHomes
              </span>
              <h3 className="font-serif text-2xl text-ink font-light mt-2">
                4 Tầng Bảo Vệ Chống Đọng Sương VRV
              </h3>

              <div className="mt-6 space-y-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <span>01</span>
                    <span>Miệng gió Linear Slot bằng nhựa ABS nguyên sinh</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    Hệ số dẫn nhiệt chỉ 0.17 W/(m·K) (thấp hơn 1.200 lần so với nhôm 205 W/(m·K)). Bề mặt miệng gió không bị hạ nhiệt độ quá sâu, triệt tiêu hoàn toàn điểm ngưng tụ.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <span>02</span>
                    <span>Bảo ôn Aeroflex đôi 19mm bọc kín phụ kiện</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    Cao su lưu hóa bọt kín EPDM xuất xứ Thái Lan, hệ số kháng ẩm vượt trội. Mọi mối nối co lơ, hộp box đều được dán keo Aeroseal chuyên dụng ngăn triệt để cầu nhiệt.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <span>03</span>
                    <span>Cảm biến ẩm hồi và van tiết lưu điện tử thông minh</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    Khi độ ẩm phòng vượt ngưỡng 85% vào mùa mưa giông, hệ thống tự động bù nhiệt +1°C trong 20 phút đầu nhằm rút ẩm nhanh (Dehumidify Mode) mà không gây đọng sương miệng gió.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <span>04</span>
                    <span>Gió đối lưu tự nhiên sông Sài Gòn tiết kiệm 35% điện</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    Tận dụng các luồng gió mát sông Sài Gòn (vận tốc {zone.riverWindSpeed}) qua hệ cửa chớp lam gỗ xoay, cho phép tắt điều hòa từ 21:00 đến 03:00 sáng.
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Callout */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-espresso to-[#2B231D] text-canvas relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Tư Vấn Cơ Điện Trọn Gói
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-canvas mt-2">
                Bảo vệ hệ trần &amp; đồ mộc căn hộ ngay từ bản vẽ MEP
              </h4>
              <p className="text-xs text-canvas/80 mt-3 font-light leading-relaxed">
                Đừng để lỗi cơ điện đọng nước làm hỏng hệ nội thất cao cấp của bạn. Kỹ sư trưởng MEP GuHomes sẵn sàng kiểm tra bản vẽ thiết kế điều hòa hiện tại của bạn hoàn toàn miễn phí.
              </p>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
                >
                  <span>Gửi bản vẽ kiểm tra cơ điện MEP</span>
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
