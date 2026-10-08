'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type Orientation = 'west' | 'south' | 'east'
export type Season = 'dry' | 'rainy'

interface OrientationData {
  id: Orientation
  title: string
  subtitle: string
  compassAngle: string
  climatePhenomenon: string
  guhomesSolutions: {
    title: string
    description: string
  }[]
  metrics: {
    dry: {
      outdoorTemp: number
      indoorTemp: number
      outdoorHumidity: number
      indoorHumidity: number
      airVelocity: string
      comfortLevel: string
      statusText: string
    }
    rainy: {
      outdoorTemp: number
      indoorTemp: number
      outdoorHumidity: number
      indoorHumidity: number
      airVelocity: string
      comfortLevel: string
      statusText: string
    }
  }
}

const ORIENTATIONS: Record<Orientation, OrientationData> = {
  west: {
    id: 'west',
    title: 'Hướng Tây & Tây Nam',
    subtitle: 'Nắng xế chiều gay gắt — Tích nhiệt bức xạ mặt dựng kính',
    compassAngle: '240°',
    climatePhenomenon:
      'Từ 13:00 đến 17:30, nắng chiều Sài Gòn nung đốt trực diện vào các mảng kính lớn. Nếu không xử lý đúng, nhiệt độ phòng có thể vọt lên 38°C, biến căn nhà thành chiếc lò hấp và máy lạnh phải chạy quá tải.',
    guhomesSolutions: [
      {
        title: 'Hệ lam gỗ xoay đối lưu cản nhiệt',
        description: 'Tán xạ 85% tia bức xạ trực tiếp trước khi chạm vào mặt kính, vẫn đón gió tự nhiên luồn qua các nan gỗ.',
      },
      {
        title: 'Kính Low-E cản tia hồng ngoại kép',
        description: 'Mặt kính phủ kim loại nano cách nhiệt tối đa, giữ căn phòng luôn sáng mà không bị bỏng rát.',
      },
      {
        title: 'Tường vữa vôi khoáng dày tản nhiệt',
        description: 'Vữa vôi Calce có hệ số truyền nhiệt thấp, giúp hấp thụ và giải phóng nhiệt chậm rãi, mát mẻ suốt đêm.',
      },
    ],
    metrics: {
      dry: {
        outdoorTemp: 37,
        indoorTemp: 26,
        outdoorHumidity: 48,
        indoorHumidity: 55,
        airVelocity: '0.4 m/s',
        comfortLevel: 'A+ (Dịu mát)',
        statusText: 'Hệ lam cản 90% nhiệt bức xạ, giảm 11°C so với bề mặt kính bên ngoài',
      },
      rainy: {
        outdoorTemp: 29,
        indoorTemp: 24,
        outdoorHumidity: 88,
        indoorHumidity: 62,
        airVelocity: '0.6 m/s',
        comfortLevel: 'A+ (Thoáng đãng)',
        statusText: 'Không khí đối lưu êm đềm, vữa vôi hút ẩm thừa giữ sàn nhà khô ráo',
      },
    },
  },
  south: {
    id: 'south',
    title: 'Hướng Nam & Đông Nam',
    subtitle: 'Đón gió sông Sài Gòn — Độ ẩm không khí cao vượt 80%',
    compassAngle: '150°',
    climatePhenomenon:
      'Hướng đón gió mát lành nhất thành phố, nhưng mùa mưa kéo dài mang theo hơi nước đậm đặc từ sông Sài Gòn và rừng ngập mặn Cần Giờ. Độ ẩm cao là kẻ thù số một gây mốc bề mặt gỗ và phồng rộp sàn ván.',
    guhomesSolutions: [
      {
        title: 'Thông gió đối lưu xuyên phòng (Cross-Ventilation)',
        description: 'Mở cửa hút gió từ logia và thoát gió qua khe trần, tạo dòng đối lưu liên tục ngăn chặn ứ đọng ẩm mốc.',
      },
      {
        title: 'Khe co ngót kỹ thuật Shadow Gap 4mm',
        description: 'Dành sẵn biên độ co giãn cho thớ gỗ óc chó tự nhiên nở ngang trong mùa mưa mà không kẹt cánh tủ.',
      },
      {
        title: 'Lau dầu thực vật Osmo thẩm thấu sâu',
        description: 'Dầu sáp vi tinh thể thấm sâu vào mao dẫn gỗ, cho phép gỗ thở tự nhiên nhưng ngăn nước thấm đọng.',
      },
    ],
    metrics: {
      dry: {
        outdoorTemp: 34,
        indoorTemp: 26,
        outdoorHumidity: 52,
        indoorHumidity: 56,
        airVelocity: '0.5 m/s',
        comfortLevel: 'A+ (Lộng gió)',
        statusText: 'Gió sông mát rượi đưa luồng sinh khí tự nhiên khắp các ngóc ngách',
      },
      rainy: {
        outdoorTemp: 28,
        indoorTemp: 24,
        outdoorHumidity: 90,
        indoorHumidity: 60,
        airVelocity: '0.7 m/s',
        comfortLevel: 'A+ (Khô thoáng)',
        statusText: 'Độ ẩm trong nhà duy trì ở mức 60% lý tưởng nhờ vật liệu đá và gỗ tự thở',
      },
    },
  },
  east: {
    id: 'east',
    title: 'Hướng Đông & Đông Bắc',
    subtitle: 'Nắng sớm trong trẻo — Cần tối ưu ánh sáng tự nhiên dịu mắt',
    compassAngle: '60°',
    climatePhenomenon:
      'Ánh nắng ban mai nhẹ nhàng chiếu xiên vào căn phòng từ 6:00 đến 10:30. Thách thức là điều tiết nguồn sáng không gây chói lóa lên màn hình làm việc, đồng thời dẫn ánh sáng sâu vào các khu vực hành lang bên trong.',
    guhomesSolutions: [
      {
        title: 'Rèm vải lanh Bỉ dệt thưa khuếch tán 3 lớp',
        description: 'Biến chùm tia nắng gắt ban sớm thành làn sương mờ dịu mắt, vỗ về nhịp thức giấc tự nhiên của gia chủ.',
      },
      {
        title: 'Vách kính gợn sóng Moru lấy sáng gián tiếp',
        description: 'Đưa ánh sáng ban ngày vào sâu trong phòng tắm và phòng làm việc mà vẫn bảo toàn sự riêng tư kín đáo.',
      },
      {
        title: 'Bề mặt đá travertine Navona bắt sáng',
        description: 'Các hạt tinh thể canxi phản chiếu ánh sáng lấp lánh như mặt nước sông, tạo sinh khí rạng rỡ cho tổ ấm.',
      },
    ],
    metrics: {
      dry: {
        outdoorTemp: 32,
        indoorTemp: 25,
        outdoorHumidity: 50,
        indoorHumidity: 54,
        airVelocity: '0.4 m/s',
        comfortLevel: 'A+ (Trong lành)',
        statusText: 'Ánh sáng ban mai chan hòa năng lượng tích cực cho ngày mới',
      },
      rainy: {
        outdoorTemp: 27,
        indoorTemp: 24,
        outdoorHumidity: 84,
        indoorHumidity: 59,
        airVelocity: '0.5 m/s',
        comfortLevel: 'A+ (Ấm cúng)',
        statusText: 'Nhiệt độ phòng cân bằng tuyệt hảo, không khí thanh sạch và an tĩnh',
      },
    },
  },
}

export function MicroclimateSimulator() {
  const [orientation, setOrientation] = useState<Orientation>('west')
  const [season, setSeason] = useState<Season>('dry')

  const currentData: OrientationData = ORIENTATIONS[orientation] ?? ORIENTATIONS.west
  const currentMetrics = currentData.metrics[season]

  return (
    <section
      id="mo-phong-vi-khi-hau"
      data-home-section="MICROCLIMATE_SIMULATOR"
      className="u-gutter relative isolate bg-espresso py-[clamp(4.5rem,10vh,8rem)] text-canvas overflow-hidden border-t border-canvas/15"
    >
      {/* Background Microclimate Atmosphere Glow */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-[140px] transition-all duration-1000',
          season === 'dry' ? 'bg-amber-600/15' : 'bg-sky-600/15',
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full blur-[140px] transition-all duration-1000',
          orientation === 'west' ? 'bg-orange-700/15' : 'bg-emerald-700/15',
        )}
      />

      <div className="mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-canvas/15 pb-8 mb-10">
          <div className="max-w-3xl">
            <Label rule tone="accent">
              Khoa Học Thích Ứng Vi Khí Hậu
            </Label>
            <h2 className="mt-4 font-display text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.25] text-canvas">
              Mô Phỏng Không Gian Sống Khí Hậu Sài Gòn.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-canvas/70 leading-relaxed max-w-2xl">
              Nắng chiều 38°C và mùa mưa ẩm 85% là bài toán thực tế của mọi ngôi nhà tại TP.HCM. Hãy chọn hướng nhà và thời điểm mùa trong năm để xem cách GuHomes biến nhược điểm thời tiết thành sự tĩnh lặng và thư thái.
            </p>
          </div>

          {/* Season Switcher Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-canvas/50">
              Thời điểm mùa:
            </span>
            <div
              role="radiogroup"
              aria-label="Chọn thời điểm mùa trong năm"
              className="inline-flex items-center rounded-full p-1 bg-black/40 border border-canvas/20 shadow-inner"
            >
              <button
                type="button"
                role="radio"
                aria-checked={season === 'dry'}
                onClick={() => setSeason('dry')}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 min-h-[44px]',
                  season === 'dry'
                    ? 'bg-accent text-espresso shadow-md font-semibold'
                    : 'text-canvas/60 hover:text-canvas',
                )}
              >
                <span>☀️ Mùa Khô (Nắng Gắt)</span>
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={season === 'rainy'}
                onClick={() => setSeason('rainy')}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 min-h-[44px]',
                  season === 'rainy'
                    ? 'bg-sky-600 text-canvas shadow-md font-semibold'
                    : 'text-canvas/60 hover:text-canvas',
                )}
              >
                <span>🌧️ Mùa Mưa (Độ Ẩm 85%)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orientation Selector Pills */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none sm:flex-wrap">
          {(['west', 'south', 'east'] as const).map((key) => {
            const item = ORIENTATIONS[key]
            const isSelected = orientation === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setOrientation(key)}
                className={cn(
                  'group flex items-center gap-3 rounded-full border px-5 py-3 text-xs font-medium transition-all duration-300 min-h-[48px] flex-shrink-0 select-none',
                  isSelected
                    ? 'border-accent bg-accent text-espresso font-semibold shadow-[0_0_20px_rgba(197,168,128,0.35)]'
                    : 'border-canvas/20 bg-canvas/5 text-canvas/75 hover:border-canvas/40 hover:bg-canvas/10',
                )}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/20 text-[10px] font-mono">
                  {item.compassAngle}
                </span>
                <span>{item.title}</span>
                {isSelected && <span className="text-[10px] font-mono">●</span>}
              </button>
            )
          })}
        </div>

        {/* Main Simulation Showcase Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-12 items-stretch">
          {/* Left Column: Real-Time Diagnostic Dashboard */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Sensor Metrics Box */}
            <div className="rounded-3xl border border-canvas/15 bg-canvas/5 p-7 sm:p-9 backdrop-blur-md flex flex-col justify-between gap-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-canvas/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-canvas/80">
                    Cảm biến vi khí hậu thực tế
                  </span>
                </div>
                <span className="text-xs font-mono text-accent-soft">
                  Chỉ số: {currentMetrics.comfortLevel}
                </span>
              </div>

              {/* Temperature Dual Readout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-canvas/10 bg-black/30 p-4 sm:p-5">
                  <div className="text-[11px] font-mono text-canvas/50 uppercase tracking-wider mb-1">
                    Nhiệt độ ngoài trời
                  </div>
                  <div className="flex items-baseline gap-1 font-display text-2xl sm:text-4xl text-amber-400 font-medium">
                    <span>{currentMetrics.outdoorTemp}</span>
                    <span className="text-sm font-sans font-normal text-canvas/60">°C</span>
                  </div>
                  <div className="text-[11px] text-canvas/40 mt-1">Bức xạ trực diện</div>
                </div>

                <div className="rounded-2xl border border-accent/40 bg-accent/15 p-4 sm:p-5 shadow-lg">
                  <div className="text-[11px] font-mono text-accent-soft uppercase tracking-wider mb-1">
                    Trong nhà GuHomes
                  </div>
                  <div className="flex items-baseline gap-1 font-display text-2xl sm:text-4xl text-canvas font-medium">
                    <span>{currentMetrics.indoorTemp}</span>
                    <span className="text-sm font-sans font-normal text-accent-soft">°C</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">
                    Làm mát tự nhiên -{currentMetrics.outdoorTemp - currentMetrics.indoorTemp}°C
                  </div>
                </div>
              </div>

              {/* Humidity Dual Readout */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-canvas/10 bg-black/30 p-4 sm:p-5">
                  <div className="text-[11px] font-mono text-canvas/50 uppercase tracking-wider mb-1">
                    Độ ẩm ngoài trời (RH)
                  </div>
                  <div className="flex items-baseline gap-1 font-display text-2xl sm:text-3xl text-sky-400 font-medium">
                    <span>{currentMetrics.outdoorHumidity}</span>
                    <span className="text-sm font-sans font-normal text-canvas/60">%</span>
                  </div>
                  <div className="text-[11px] text-canvas/40 mt-1">Ẩm ướt nhiệt đới</div>
                </div>

                <div className="rounded-2xl border border-accent/40 bg-accent/15 p-4 sm:p-5 shadow-lg">
                  <div className="text-[11px] font-mono text-accent-soft uppercase tracking-wider mb-1">
                    Độ ẩm trong nhà (RH)
                  </div>
                  <div className="flex items-baseline gap-1 font-display text-2xl sm:text-3xl text-canvas font-medium">
                    <span>{currentMetrics.indoorHumidity}</span>
                    <span className="text-sm font-sans font-normal text-accent-soft">%</span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-1">Cân bằng lý tưởng</div>
                </div>
              </div>

              {/* Air Velocity & Summary */}
              <div className="rounded-2xl border border-canvas/10 bg-black/20 p-4 text-xs space-y-2">
                <div className="flex items-center justify-between text-canvas/80">
                  <span>Tốc độ gió đối lưu tự nhiên:</span>
                  <strong className="text-accent-soft font-mono">{currentMetrics.airVelocity}</strong>
                </div>
                <div className="text-[11px] text-canvas/60 leading-relaxed pt-1 border-t border-canvas/10">
                  {currentMetrics.statusText}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Engineering Solutions */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            <div className="rounded-3xl border border-canvas/15 bg-canvas/5 p-7 sm:p-10 backdrop-blur-md flex flex-col gap-6">
              {/* Problem Analysis */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-canvas/20 bg-canvas/10 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-accent-soft mb-3">
                  ✦ Phân tích đặc trưng khí hậu
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-normal text-canvas">
                  {currentData.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-accent-soft/90 font-mono">
                  {currentData.subtitle}
                </p>
                <p className="mt-4 text-sm sm:text-base text-canvas/75 leading-relaxed border-t border-canvas/10 pt-4">
                  {currentData.climatePhenomenon}
                </p>
              </div>

              {/* 3 Engineered Solutions */}
              <div className="space-y-4 border-t border-canvas/10 pt-6">
                <div className="text-xs font-mono uppercase tracking-wider text-canvas/60 mb-2">
                  Giải pháp kiến trúc may đo của GuHomes:
                </div>

                {currentData.guhomesSolutions.map((sol, index) => (
                  <div
                    key={sol.title}
                    className="rounded-2xl border border-canvas/10 bg-black/20 p-4.5 sm:p-5 transition-all hover:border-accent/40 hover:bg-black/30"
                  >
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-espresso text-xs font-bold font-mono">
                        0{index + 1}
                      </span>
                      <h4 className="font-body text-sm sm:text-base font-medium text-canvas">
                        {sol.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-canvas/65 leading-relaxed pl-9">
                      {sol.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action CTA Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl border border-accent/30 bg-canvas/5">
              <div className="text-xs text-canvas/75">
                Căn hộ hoặc nhà phố của bạn quay về hướng nào?
              </div>
              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-accent hover:bg-accent-soft text-espresso font-medium text-xs transition-all hover:scale-105 active:scale-95 shadow-md min-h-[44px]"
              >
                <span>Nhận Khảo Sát Vi Khí Hậu Miễn Phí Tại Công Trình</span>
                <ArrowUpRightIcon className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
