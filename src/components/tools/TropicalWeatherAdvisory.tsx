'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type SeasonMode = 'rainy' | 'dry'
export type DistrictZone = 'thu-thiem' | 'thao-dien' | 'phu-my-hung' | 'central'

interface DistrictAdvisory {
  name: string
  zoneTag: string
  microclimateNote: string
  windSunBehavior: string
  topMaterial: string
}

const DISTRICT_ZONES: Record<DistrictZone, DistrictAdvisory> = {
  'thu-thiem': {
    name: 'Thủ Thiêm Ven Sông',
    zoneTag: 'Bán Đảo Khúc Sông Rộng',
    microclimateNote: 'Nắng chiều Tây gay gắt kèm hơi nước bốc lên từ khúc sông cong rộng 400m.',
    windSunBehavior: 'Gió Nam & Đông Nam mạnh, phản xạ ánh sáng mặt nước chói lóa vào các tầng cao.',
    topMaterial: 'Vôi khoáng Calce Ý + Lam trần gỗ óc chó FAS tiêu tán nhiệt.',
  },
  'thao-dien': {
    name: 'Thảo Điền Trũng Ẩm',
    zoneTag: 'Bán Đảo Vùng Trũng Triều Cường',
    microclimateNote: 'Độ ẩm không khí thường xuyên vượt 85%, dễ ngưng tụ sương ẩm dưới sàn tầng trệt.',
    windSunBehavior: 'Gió sông mát nhưng mang theo độ ẩm cao quanh năm, cây xanh rậm rạp chắn gió đối lưu nhẹ.',
    topMaterial: 'Gỗ Teak nguyên tấm + Cốt Plywood WBP chống ẩm 72h.',
  },
  'phu-my-hung': {
    name: 'Phú Mỹ Hưng Gió Biển Nam',
    zoneTag: 'Đô Thị Sinh Thái Phía Nam',
    microclimateNote: 'Đón trọn luồng gió biển Cần Giờ & sông Rạch Đĩa, không khí mát mẻ dễ chịu hơn nội thành 2°C.',
    windSunBehavior: 'Gió đối lưu thông suốt từ hướng Nam và Đông Nam, ít bị tháp cao tầng cản trở.',
    topMaterial: 'Đá Travertine xẻ thô dẫn gió + Sàn gỗ sồi xử lý xà phòng.',
  },
  'central': {
    name: 'Trung Tâm Q.1 / Ba Son',
    zoneTag: 'Đảo Nhiệt Đô Thị & Tiêu Âm',
    microclimateNote: 'Hiệu ứng đảo nhiệt đô thị (Urban Heat Island) khiến ban đêm nhiệt độ nhả chậm từ bê tông.',
    windSunBehavior: 'Gió lùa mạnh giữa các khe hẹp tòa tháp cao tầng, kèm tiếng ồn giao thông đô thị > 65dB.',
    topMaterial: 'Gỗ xẻ rãnh tiêu âm Acoustic NRC 0.75 + Kính hộp Low-E giấu viền.',
  },
}

export function TropicalWeatherAdvisory({ className }: { className?: string }) {
  const [season, setSeason] = useState<SeasonMode>('rainy')
  const [selectedZone, setSelectedZone] = useState<DistrictZone>('thu-thiem')

  const currentZoneData = DISTRICT_ZONES[selectedZone]

  return (
    <section className={cn('relative bg-[#0E1211] text-[#F3F1EC] py-16 sm:py-24 border-y border-white/10 overflow-hidden', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Cố Vấn Khí Hậu Sài Gòn</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-3 tracking-tight">
              Bộ Cố Vấn Vi Khí Hậu Nhiệt Đới
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[62ch] mt-3 font-light leading-relaxed">
              Thời tiết Sài Gòn không đo bằng 4 mùa mà bằng 2 thái cực: Mùa Mưa Triều Cường độ ẩm 90% và Mùa Khô Nắng Gắt 40°C. Một thiết kế nội thất tốt phải sống hòa thuận với cả hai.
            </p>
          </div>

          {/* Season Switcher Pills */}
          <div className="inline-flex p-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setSeason('rainy')}
              className={cn(
                'px-5 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2',
                season === 'rainy'
                  ? 'bg-accent text-white font-semibold shadow-lg shadow-accent/20'
                  : 'text-white/60 hover:text-white',
              )}
            >
              <span>🌧️ Mùa Mưa &amp; Triều Cường (T5–T11)</span>
            </button>
            <button
              type="button"
              onClick={() => setSeason('dry')}
              className={cn(
                'px-5 py-2 rounded-full text-xs font-mono transition-all flex items-center gap-2',
                season === 'dry'
                  ? 'bg-amber-600 text-white font-semibold shadow-lg shadow-amber-600/20'
                  : 'text-white/60 hover:text-white',
              )}
            >
              <span>☀️ Mùa Khô &amp; Bức Xạ Cao (T12–T4)</span>
            </button>
          </div>
        </div>

        {/* 2 Seasonal Dynamics Inspector */}
        <div className="mt-10 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Season Diagnostics */}
          <div className="col-span-12 lg:col-span-7 bg-[#090C0B] border border-white/15 rounded-3xl p-6 sm:p-9 shadow-2xl">
            <AnimatePresence mode="wait">
              {season === 'rainy' ? (
                <motion.div
                  key="rainy"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono text-accent uppercase tracking-wider block">
                        Đặc tính thời tiết hiện tại
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
                        Mùa Mưa &amp; Nồm Ẩm Triều Cường
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-white/50 block">Độ ẩm không khí</span>
                      <span className="font-serif text-2xl sm:text-3xl text-accent font-light">
                        80% – 92%
                      </span>
                    </div>
                  </div>

                  {/* Challenges and solutions */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <p className="text-xs font-mono text-red-400 uppercase tracking-wider font-semibold mb-1">
                        ⚠️ Thách thức vi khí hậu thực tế:
                      </p>
                      <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                        Hơi ẩm ngưng tụ trên bề mặt đá nhân tạo; phồng rộp cốt ván dăm thường do thấm hút hơi nước; ẩm mốc bám vào rèm vải polyester và nệm sofa đóng kín.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-accent/15 border border-accent/30">
                      <p className="text-xs font-mono text-accent uppercase tracking-wider font-semibold mb-2">
                        ✓ Khuyến nghị kỹ thuật GuHomes:
                      </p>
                      <ul className="space-y-2 text-xs text-white/90 font-light leading-relaxed">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="text-accent mt-0.5 shrink-0" />
                          <span>Sử dụng 100% cốt Plywood WBP chống ẩm ngâm nước 72h cho toàn bộ hệ tủ bếp &amp; lavabo.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="text-accent mt-0.5 shrink-0" />
                          <span>Gỗ tự nhiên Teak/Sồi lau dầu hữu cơ Osmo Đức để thớ gỗ tự thở, không bịt màng sơn PU dễ rộp mép.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="text-accent mt-0.5 shrink-0" />
                          <span>Rèm vải lanh Bỉ dệt thô thoáng khí, thoát ẩm tự nhiên gấp 3 lần cotton.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="text-accent mt-0.5 shrink-0" />
                          <span>Cài đặt chế độ điều hòa hút ẩm (Dry Mode) 26°C khi đi vắng dài ngày để bảo vệ bề mặt mộc.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="dry"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                        Đặc tính thời tiết hiện tại
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
                        Mùa Khô &amp; Nắng Gắt Bức Xạ Cao
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-white/50 block">Nhiệt độ ngoài trời</span>
                      <span className="font-serif text-2xl sm:text-3xl text-amber-400 font-light">
                        36°C – 41°C
                      </span>
                    </div>
                  </div>

                  {/* Challenges and solutions */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                      <p className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold mb-1">
                        ⚠️ Thách thức vi khí hậu thực tế:
                      </p>
                      <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                        Nhiệt độ mặt kính hướng Tây lên tới 46°C; co ngót sợi gỗ tự nhiên gây nứt chân chim bề mặt; bạc màu nhanh chóng đồ da và rèm cửa; chi phí tiền điện máy lạnh tăng vọt.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40">
                      <p className="text-xs font-mono text-amber-300 uppercase tracking-wider font-semibold mb-2">
                        ✓ Khuyến nghị kỹ thuật GuHomes:
                      </p>
                      <ul className="space-y-2 text-xs text-white/90 font-light leading-relaxed">
                        <li className="flex items-start gap-2">
                          <CheckIcon className="text-amber-400 mt-0.5 shrink-0" />
                          <span>Hệ lam trần gỗ óc chó xoay góc 45° cản nắng chiếu xiên nhưng giữ trọn view nhìn sông.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="text-amber-400 mt-0.5 shrink-0" />
                          <span>Sơn vôi khoáng Ý Calce có khả năng khúc xạ ánh sáng, giảm cảm giác bức bí ngột ngạt.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="text-amber-400 mt-0.5 shrink-0" />
                          <span>Đá Travertine tự nhiên xẻ thô tạo vùng tích lạnh ban đêm, giữ cho phòng khách mát hơn 3°C.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckIcon className="text-amber-400 mt-0.5 shrink-0" />
                          <span>Dưỡng ẩm thớ gỗ định kỳ 6 tháng/lần bằng sáp Osmo Carnauba chống rạn nứt thớ vân.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: 4 Microclimate District Zones */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#090C0B] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-3">
                Tra Cứu Vi Khí Hậu Theo Khu Vực:
              </span>

              {/* 4 Zone Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { id: 'thu-thiem', label: 'Thủ Thiêm Q.2' },
                  { id: 'thao-dien', label: 'Thảo Điền Q.2' },
                  { id: 'phu-my-hung', label: 'Phú Mỹ Hưng Q.7' },
                  { id: 'central', label: 'Trung Tâm Q.1' },
                ].map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setSelectedZone(z.id as DistrictZone)}
                    className={cn(
                      'p-2.5 rounded-xl border text-center text-xs font-mono transition-all',
                      selectedZone === z.id
                        ? 'bg-accent/20 border-accent text-white shadow-md font-semibold'
                        : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.07] hover:text-white',
                    )}
                  >
                    {z.label}
                  </button>
                ))}
              </div>

              {/* Zone Details */}
              <div className="space-y-3 border-t border-white/10 pt-4 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-accent uppercase block">Địa thế:</span>
                  <h4 className="font-serif text-lg text-white font-normal mt-0.5">
                    {currentZoneData.name} ({currentZoneData.zoneTag})
                  </h4>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono text-white/50 uppercase block">Đặc thù vi khí hậu:</span>
                  <p className="text-white/80 font-light mt-1 leading-relaxed">{currentZoneData.microclimateNote}</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] font-mono text-white/50 uppercase block">Hướng nắng &amp; gió:</span>
                  <p className="text-white/80 font-light mt-1 leading-relaxed">{currentZoneData.windSunBehavior}</p>
                </div>

                <div className="p-3 rounded-xl bg-accent/15 border border-accent/30">
                  <span className="text-[10px] font-mono text-accent uppercase block font-semibold">Vật liệu khuyên dùng:</span>
                  <p className="text-white/95 font-medium mt-1 leading-relaxed">{currentZoneData.topMaterial}</p>
                </div>
              </div>

              {/* Action Button */}
              <a
                href="https://zalo.me/0368757916"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-accent hover:bg-accent/90 text-white font-mono text-xs transition-all shadow-lg shadow-accent/20"
              >
                <span>Nhận Tư Vấn Vi Khí Hậu Căn Hộ Của Bạn</span>
                <ArrowUpRightIcon className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
