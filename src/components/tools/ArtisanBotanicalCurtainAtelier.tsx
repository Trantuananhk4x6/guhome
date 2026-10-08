'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type FacadeOrientation = 'west' | 'south' | 'east' | 'north'

interface OrientationProfile {
  name: string
  sunlight: string
  heatReduction: string
  recommendedWeave: string
  description: string
}

const ORIENTATION_DATA: Record<FacadeOrientation, OrientationProfile> = {
  west: {
    name: 'Hướng Tây (Nắng Chiều Gắt)',
    sunlight: 'Bức xạ nhiệt mặt trời cực đại từ 13:00 - 17:30',
    heatReduction: '-4.5°C nhiệt độ phòng',
    recommendedWeave: 'Tơ tằm 3 lớp dệt thô bọc sợi gai đay tự nhiên nhuộm củ nâu',
    description: 'Chặn 95% tia bức xạ hồng ngoại nhưng giữ cấu trúc vi sợi hở cho gió đối lưu, không giữ nhiệt như vải tráng cao su.',
  },
  south: {
    name: 'Hướng Nam (Đón Gió Sông Mát)',
    sunlight: 'Ánh sáng khuếch tán ôn hòa, gió nhẹ quanh năm',
    heatReduction: '-2.0°C duy trì vi khí hậu dịu mát',
    recommendedWeave: 'Lụa tơ tằm Bảo Lộc dệt thưa gợn sóng (Sheer Silk)',
    description: 'Đón luồng gió sông lùa qua lớp rèm bồng bềnh, tạo hiệu ứng bóng đổ mờ ảo như bức tranh thủy mặc.',
  },
  east: {
    name: 'Hướng Đông (Nắng Sớm Tươi Mới)',
    sunlight: 'Nắng sớm 2700K - 4000K từ 06:00 - 10:30',
    heatReduction: '-3.0°C cản nhiệt buổi sáng',
    recommendedWeave: 'Tơ tằm thô mộc nhuộm lá chàm & hạt sen khô',
    description: 'Lọc ánh nắng bình minh chói chang thành vầng hào quang ấm áp, bảo vệ các món đồ gỗ mộc trong phòng ngủ.',
  },
  north: {
    name: 'Hướng Bắc (Ánh Sáng Tĩnh)',
    sunlight: 'Không bị nắng gắt chiếu trực diện',
    heatReduction: '-1.5°C giữ cân bằng nhiệt',
    recommendedWeave: 'Lụa satin tơ sen dệt thủ công',
    description: 'Mềm mại như làn sương mỏng, tôn vinh các chi tiết nội thất gỗ sồi và đá tự nhiên.',
  },
}

export function ArtisanBotanicalCurtainAtelier({ className }: { className?: string } = {}) {
  const [selectedOrientation, setSelectedOrientation] = useState<FacadeOrientation>('west')
  const [curtainHeight, setCurtainHeight] = useState<number>(4.2) // 2.8m to 6.5m
  const [tactileComparison, setTactileComparison] = useState<'silk' | 'polyester'>('silk')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [clientPhone, setClientPhone] = useState<string>('')
  const [clientName, setClientName] = useState<string>('')
  const [roomType, setRoomType] = useState<string>('Phòng khách thông tầng')

  const vipPasscode = 'GU-CURTAIN-2026-X'
  const activeProfile = ORIENTATION_DATA[selectedOrientation]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      aria-label="Xưởng May Đo Rèm Tơ Tằm Bảo Lộc Dệt Tay"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient weave texture lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 h-96 w-96 rounded-full bg-amber-700/10 blur-[130px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-emerald-950/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(180,120,60,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Lớp Vải Thở Che Chắn Khí Nóng Sài Gòn
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Xưởng May Đo Rèm Tơ Tằm Bảo Lộc Dệt Tay
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Dệt tay từ sợi tơ tằm Bảo Lộc và đay tự nhiên nhuộm thảo mộc củ nâu. Cản 95% bức xạ nhiệt mặt trời hướng Tây, 
            hạ nhiệt độ phòng -4.5°C tự nhiên, tích hợp động cơ Somfy Ultra-Quiet siêu êm &lt; 25 dBA chuyển động mượt mà.
          </p>
        </div>

        {/* Interactive Climate & Tactile Studio */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Orientation Calculator & Solar Shielding */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Mô Phỏng Cản Bức Xạ Nhiệt Theo Hướng Nắng
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {activeProfile.name}
                    </h3>
                  </div>

                  {/* Orientation Selectors */}
                  <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-xl p-1 text-xs">
                    {(['west', 'south', 'east', 'north'] as const).map((dir) => (
                      <button
                        key={dir}
                        type="button"
                        onClick={() => setSelectedOrientation(dir)}
                        className={cn(
                          'px-2.5 py-1.5 rounded-lg transition-colors font-medium',
                          selectedOrientation === dir
                            ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-500/20'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {dir === 'west' ? 'Tây' : dir === 'south' ? 'Nam' : dir === 'east' ? 'Đông' : 'Bắc'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile Display Box */}
                <div className="mt-6 rounded-xl border border-stone-800 bg-stone-900/50 p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-stone-400 font-mono">
                      {activeProfile.sunlight}
                    </span>
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/40">
                      Hiệu năng: {activeProfile.heatReduction}
                    </span>
                  </div>

                  <div className="mt-4">
                    <span className="text-xs text-amber-300 font-medium block">
                      Khuyến nghị thớ dệt: {activeProfile.recommendedWeave}
                    </span>
                    <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                      {activeProfile.description}
                    </p>
                  </div>
                </div>

                {/* Tactile Comparison: Natural Silk vs Chemical Polyester */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-stone-400 font-mono">Thử Nghiệm Xúc Giác & Độ Thở Của Sợi Vải:</span>
                    <div className="flex rounded-lg bg-stone-900 p-0.5 border border-stone-800">
                      <button
                        type="button"
                        onClick={() => setTactileComparison('silk')}
                        className={cn(
                          'px-3 py-1 rounded-md text-xs transition-colors',
                          tactileComparison === 'silk'
                            ? 'bg-amber-500/20 text-amber-300 font-medium'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        Tơ Tằm & Đay Tự Nhiên
                      </button>
                      <button
                        type="button"
                        onClick={() => setTactileComparison('polyester')}
                        className={cn(
                          'px-3 py-1 rounded-md text-xs transition-colors',
                          tactileComparison === 'polyester'
                            ? 'bg-stone-800 text-stone-200 font-medium'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        Polyester Công Nghiệp
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950 p-4">
                    {tactileComparison === 'silk' ? (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-stone-300">
                          <span>Khả năng điều hòa độ ẩm tự nhiên:</span>
                          <span className="text-emerald-400 font-mono">Hấp thụ & thoát ẩm 30% trọng lượng</span>
                        </div>
                        <div className="flex items-center justify-between text-stone-300">
                          <span>Hiện tượng tích tĩnh điện bám bụi:</span>
                          <span className="text-emerald-400 font-mono">0% (Hoàn toàn không dính bụi)</span>
                        </div>
                        <div className="flex items-center justify-between text-stone-300">
                          <span>Mùi hương & độ thân thiện:</span>
                          <span className="text-amber-300 font-mono">Hương cỏ cây tự nhiên phảng phất</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center justify-between text-stone-400">
                          <span>Khả năng điều hòa độ ẩm:</span>
                          <span className="text-red-400 font-mono">0% (Bí khí, tích nhiệt bức xạ)</span>
                        </div>
                        <div className="flex items-center justify-between text-stone-400">
                          <span>Hiện tượng tích tĩnh điện:</span>
                          <span className="text-red-400 font-mono">Cao (Bám bụi mịn, gây ngứa da)</span>
                        </div>
                        <div className="flex items-center justify-between text-stone-400">
                          <span>Mùi hương & VOC:</span>
                          <span className="text-stone-400 font-mono">Bay mùi nhựa khi phơi nắng gắt</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Custom Dimension & Consultation Form */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    May Đo Rèm Thông Tầng Cao Cấp
                  </span>
                  <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    Chiều Cao Đến 6.5m
                  </span>
                </div>

                {/* Slider for Height */}
                <div className="my-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-stone-400">Chiều cao thông tầng thiết kế:</span>
                    <span className="font-mono text-amber-300 font-semibold">{curtainHeight.toFixed(1)} mét</span>
                  </div>
                  <input
                    type="range"
                    min="2.8"
                    max="6.5"
                    step="0.1"
                    value={curtainHeight}
                    onChange={(e) => setCurtainHeight(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1 font-mono">
                    <span>2.8m (Tiêu chuẩn)</span>
                    <span>4.5m (Biệt thự)</span>
                    <span>6.5m (Penthouse)</span>
                  </div>
                </div>

                {/* Consultation Form */}
                {submitted ? (
                  <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-5 text-center my-4">
                    <div className="mx-auto h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-serif text-stone-100 block">Đã Lưu Hồ Sơ Vải Mẫu</span>
                    <p className="mt-1 text-xs text-stone-400">
                      Chuyên gia rèm GuHomes sẽ mang hộp mẫu vải tơ tằm dệt tay đến tư vấn thực tế cho gia chủ {clientName} qua số {clientPhone}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Họ Tên Gia Chủ *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Anh / Chị..."
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Số Điện Thoại Trực Tiếp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Không Gian Lắp Đặt
                      </label>
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="Phòng khách thông tầng">Phòng khách thông tầng (Đại sảnh)</option>
                        <option value="Phòng ngủ Master Suite">Phòng ngủ Master Suite ven sông</option>
                        <option value="Phòng đọc sách & Trà đạo">Phòng đọc sách & Trà đạo</option>
                        <option value="Toàn bộ dinh thự">Toàn bộ dinh thự & Penthouse</option>
                      </select>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full h-11 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs tracking-wide transition-all duration-200 shadow-lg shadow-amber-600/20 flex items-center justify-center gap-1.5"
                      >
                        <span>Đặt Mang Hộp Mẫu Vải Tơ Tằm Tới Nhà</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Mã Ưu Đãi May Đo:</span>
                <span className="font-mono text-amber-300 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {vipPasscode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Acoustic & Motor Mechanics Footnote */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-400">
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-amber-400 font-mono block mb-1">Động Cơ Somfy Ultra-Quiet</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Độ ồn khi rèm di chuyển &lt; 25 dBA, êm ái tựa như tiếng thì thầm, tích hợp cảm biến nắng tự động đóng rèm khi nhiệt độ ngoài trời vượt 34°C.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-amber-400 font-mono block mb-1">Nhuộm Màu Thảo Mộc Củ Nâu</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Phương pháp nhuộm thủ công gia truyền từ củ nâu vùng trung du, giữ độ bền màu sắc mộc mạc theo năm tháng mà không phai bạc trước tia cực tím.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-amber-400 font-mono block mb-1">Đồng Bộ Hệ Quản Gia Số</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Tích hợp liền mạch vào ứng dụng quản gia số Local Edge Server, điều khiển rèm từ xa bằng giọng nói hoặc theo lịch trình bình minh - hoàng hôn.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
