'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

interface ArrivalGate {
  id: string
  numberVi: string
  nameVi: string
  subtitleVi: string
  capacityVi: string
  engineeringVi: string
  experienceVi: string
  icon: string
}

const ARRIVAL_GATES: ArrivalGate[] = [
  {
    id: 'riverside-yacht',
    numberVi: '01',
    nameVi: 'Bến Du Thuyền Nổi Gỗ Teak Mặt Tiền Sông (Private Yacht Berth)',
    subtitleVi: 'Thích Ứng Biên Độ Triều Cường 3.5m Sông Sài Gòn',
    capacityVi: 'Du thuyền siêu sang 40 – 90 Feet (Sunseeker / Riva / Azimut)',
    engineeringVi:
      'Hệ cầu phao nổi tự nâng hạ trên cột trụ thép bọc composite C5-M kháng nước mặn. Mặt sàn lát gỗ Teak Myanmar 35mm chống trơn trượt R11, tích hợp cột cấp điện bến 380V và nước ngọt siêu lọc.',
    experienceVi:
      'Thượng khách bước từ du thuyền lên cầu tàu êm ái như trên mặt đất, đi qua lối dạo sỏi suối và hàng trúc nhiệt đới tiến thẳng vào phòng chờ VIP Lounge ven sông.',
    icon: '🛥️',
  },
  {
    id: 'rooftop-helipad',
    numberVi: '02',
    nameVi: 'Bãi Đáp Trực Thăng Penthouse & Dinh Thự (Sky Helipad Deck)',
    subtitleVi: 'Hạ Cánh Nhanh Chóng Từ Sân Bay Tân Sơn Nhất / Long Thành',
    capacityVi: 'Trực thăng cá nhân tải trọng cất hạ cánh 6.0 Tấn (Airbus H145 / Bell 429)',
    engineeringVi:
      'Kết cấu dầm thép cường độ cao liên kết gối giảm chấn Neoprene triệt tiêu 100% rung chấn vào sàn mái. Hệ thống đèn tín hiệu dẫn đường ban đêm NVG chuẩn ICAO Annex 14.',
    experienceVi:
      'Chỉ mất 7 phút di chuyển từ sân bay quốc tế hạ cánh trực tiếp trên nóc tư gia, thang máy riêng đón thẳng xuống sảnh đàm đạo không qua tiếp xúc công cộng.',
    icon: '🚁',
  },
  {
    id: 'grand-boulevard',
    numberVi: '03',
    nameVi: 'Sảnh Đón Ô Tô Cửa Trước Đại Lộ (Grand Boulevard Carriage Porch)',
    subtitleVi: 'Mái Che Vòm Kính Liền Khối & Đá Bazan Núi Băm Nhám',
    capacityVi: 'Đón tiếp cùng lúc 4 xe Rolls-Royce Phantom / Bentley Flying Spur',
    engineeringVi:
      'Mái đón vươn xa 8m không cột chống (Cantilevered Canopy) che mưa nắng nhiệt đới tuyệt đối. Bán kính quay xe nhân trắc học 14.5m mượt mà êm ái.',
    experienceVi:
      'Tài xế mở cửa xe trong sự che chắn mát rượi, thảm đá bazan tự nhiên nâng đỡ từng bước chân bước vào sảnh lễ tân với hương trà Shan Tuyết thoang thoảng.',
    icon: '🚘',
  },
]

export function PrivateYachtBerthAndHelipadConcierge({ className }: { className?: string } = {}) {
  const [activeGateId, setActiveGateId] = useState<string>('riverside-yacht')

  // Booking Form State
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [propertyLocation, setPropertyLocation] = useState('thao-dien')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingCode, setBookingCode] = useState('')

  const activeGate = ARRIVAL_GATES.find((g) => g.id === activeGateId) ?? ARRIVAL_GATES[0]!

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName || !clientPhone) return
    const randomHex = Math.floor(1000 + Math.random() * 9000)
    setBookingCode(`GU-YACHT-2026-${randomHex}`)
    setIsSubmitted(true)
  }

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0c10] py-24 text-[#e0e5ed] border-t border-[#181d26]', className)}>
      {/* Deep Marine Navy Radial Ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(37,99,235,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#23354d] bg-[#101926] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#60a5fa]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#60a5fa] animate-ping" />
            Đặc Quyền Giao Thông Thượng Lưu · Riverside Yacht Berth &amp; Sky Helipad
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f2f6fc]">
            Quy Hoạch Bến Du Thuyền Tư Gia &amp; Bãi Đáp Trực Thăng
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#94a1b5]">
            Mặt tiền sông Sài Gòn là tài sản độc bản không thể tái tạo. GuHomes cung cấp giải pháp trọn gói từ tư vấn luồng lạch, thiết kế bến du thuyền nổi tự thích ứng thủy triều 3.5m đến phòng chờ VIP Lounge riêng tư — kiến tạo nghi thức đón tiếp thượng khách tầm vóc quốc tế.
          </p>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 3 Arrival Gates & Engineering Anatomy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#202b3b] bg-[#101622]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1c2635] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa]">
                    Nghi Thức Đón Tiếp 3 Cửa (Triple Arrival Portals)
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f2f6fc]">
                    Đường Thủy · Đường Không · Đường Bộ
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#162130] px-3 py-1 text-xs font-mono text-[#93c5fd]">
                  <span>Biên độ triều: 3.5m</span>
                </div>
              </div>

              {/* Arrival Gate Tabs */}
              <div className="mt-6 flex flex-col gap-2.5">
                {ARRIVAL_GATES.map((gate) => {
                  const isSelected = gate.id === activeGateId
                  return (
                    <button
                      key={gate.id}
                      type="button"
                      onClick={() => setActiveGateId(gate.id)}
                      className={cn(
                        'flex items-center justify-between p-3.5 rounded-xl border text-left transition-all min-h-[56px]',
                        isSelected
                          ? 'border-[#60a5fa] bg-[#16273f] text-white shadow-[0_0_15px_rgba(96,165,250,0.18)]'
                          : 'border-[#1c2635] bg-[#0c121b] text-[#8695ab] hover:border-[#2a3c54] hover:text-[#d7e3f2]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{gate.icon}</span>
                        <div>
                          <span className="block text-xs sm:text-sm font-medium">
                            {gate.nameVi.split(' (')[0]}
                          </span>
                          <span className="block text-[11px] text-[#6d7e94] line-clamp-1">
                            {gate.subtitleVi}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#60a5fa]/80 hidden sm:inline">
                        Gate {gate.numberVi}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Gate Detailed Breakdown */}
              <div className="mt-6 rounded-xl border border-[#27384e] bg-[#131d2b] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa]">
                    CỬA {activeGate.numberVi} · {activeGate.capacityVi}
                  </span>
                  <span className="text-2xl">{activeGate.icon}</span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f2f6fc]">
                  {activeGate.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#b4c3d6]">
                  {activeGate.experienceVi}
                </p>

                <div className="mt-4 rounded-lg bg-[#0b1017] p-3 border border-[#1e2a3a]">
                  <span className="block font-mono text-[10px] uppercase text-[#61748d]">
                    Giải Pháp Cơ Khí Thủy Lực &amp; Kết Cấu
                  </span>
                  <p className="mt-1 text-xs text-[#d1deee] leading-relaxed">
                    {activeGate.engineeringVi}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Confidential Survey & Regulatory Filing Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#202b3b] bg-[#101622]/90 p-6 sm:p-8 backdrop-blur-md">
              <span className="font-mono text-xs uppercase tracking-wider text-[#60a5fa]">
                Tư Vấn Quy Hoạch &amp; Pháp Lý
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f2f6fc]">
                Khảo Sát Luồng Lạch Bến Thủy Tư Gia
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#94a1b5]">
                GuHomes hỗ trợ toàn diện từ đo đạc trắc địa dòng chảy sông Sài Gòn, khảo sát mớn nước cho du thuyền đến hoàn tất hồ sơ cấp phép bến thủy nội địa tại Sở GTVT TP.HCM.
              </p>

              {isSubmitted ? (
                <div className="mt-6 rounded-xl border border-emerald-800/60 bg-emerald-950/30 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-400 text-xl">
                    <CheckIcon />
                  </div>
                  <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block">
                    Đã Tiếp Nhận Hồ Sơ Khảo Sát Bến Thủy
                  </span>
                  <h4 className="font-serif text-lg text-emerald-100">
                    Mã Tiếp Đón VIP: <span className="font-mono text-[#60a5fa] font-bold">{bookingCode}</span>
                  </h4>
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    Lead Marine Architect của GuHomes sẽ liên hệ trực tiếp để tiến hành đo đạc độ sâu luồng tàu và thủy văn khu vực bờ sông của tư gia.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-[#60a5fa] uppercase mb-1">
                      Họ và Tên Chủ Sở Hữu Dinh Thự *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ví dụ: Anh Trần Tuấn"
                      className="w-full rounded-xl border border-[#27384e] bg-[#090d14] px-4 py-3 text-xs text-white placeholder-[#506279] focus:border-[#60a5fa] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#60a5fa] uppercase mb-1">
                      Số Điện Thoại Kênh Riêng Tư *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full rounded-xl border border-[#27384e] bg-[#090d14] px-4 py-3 text-xs text-white placeholder-[#506279] focus:border-[#60a5fa] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-[#60a5fa] uppercase mb-1">
                      Vị Trí Mặt Tiền Sông Sài Gòn
                    </label>
                    <select
                      value={propertyLocation}
                      onChange={(e) => setPropertyLocation(e.target.value)}
                      className="w-full rounded-xl border border-[#27384e] bg-[#090d14] px-4 py-3 text-xs text-white focus:border-[#60a5fa] focus:outline-none"
                    >
                      <option value="thao-dien">Bán Đảo Thảo Điền (Sông Sài Gòn Nhánh Chính)</option>
                      <option value="ba-son">Ba Son Quận 1 / Cảng Sài Gòn</option>
                      <option value="thanh-da">Bán Đảo Thanh Đa Bình Thạnh</option>
                      <option value="thu-thiem">Bờ Đông Thủ Thiêm Đối Diện Bến Bạch Đằng</option>
                      <option value="phu-my-hung">Khu Nam Sài Gòn / Rạch Đĩa Phú Mỹ Hưng</option>
                    </select>
                  </div>

                  <div className="rounded-xl bg-[#0b1017] p-3 text-[11px] text-[#788ca5] space-y-1">
                    <span className="block font-mono text-[10px] text-[#60a5fa] uppercase">Quy trình cấp phép:</span>
                    <p>
                      Đảm bảo 100% tuân thủ hành lang bảo vệ luồng hàng hải quốc tế và quy hoạch mép bờ sông TP.HCM.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#3b82f6] py-3.5 text-xs font-mono font-bold tracking-wider text-[#0a0c10] hover:bg-[#60a5fa] transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)]"
                  >
                    <span>Yêu cầu khảo sát luồng bến du thuyền</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </button>
                </form>
              )}

              {/* Direct Hotline */}
              <div className="mt-6 pt-5 border-t border-[#1c2635] flex items-center justify-between text-xs font-mono text-[#8a99ad]">
                <span>Tư vấn trực tiếp Lead Architect:</span>
                <a href="tel:0368757916" className="text-[#60a5fa] font-bold hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
