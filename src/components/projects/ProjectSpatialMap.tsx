'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface SpatialHub {
  id: string
  name: string
  areaName: string
  tag: string
  subTitle: string
  x: number // percentage 0-100 on map
  y: number
  keyProjects: string[]
  microclimate: {
    wind: string
    sun: string
    humidity: string
    solution: string
  }
  woodcraftRole?: string
  href: string
  badge: string
}

export const SAIGON_HUBS: SpatialHub[] = [
  {
    id: 'thu-thiem',
    name: 'Bán Đảo Thủ Thiêm',
    areaName: 'Thủ Thiêm, TP. Thủ Đức',
    tag: 'Bất Động Sản Ven Sông',
    subTitle: 'Penthouse & Duplex The Opera Metropole, The River, Empire City',
    x: 58,
    y: 56,
    keyProjects: [
      'Penthouse The Opera Residence (420m²)',
      'Duplex The River Thủ Thiêm (285m²)',
      'Căn hộ Cove Residences Empire City (170m²)',
    ],
    microclimate: {
      wind: 'Gió đối lưu từ sông Sài Gòn mang hơi nước mát',
      sun: 'Nắng chiều Tây gay gắt kèm bức xạ phản chiếu mặt nước sông',
      humidity: '78% – 82% trung bình năm',
      solution: 'Vách lam gỗ óc chó xoay góc tiêu tán nhiệt & kính Low-E giấu miệng gió',
    },
    href: '/khu-vuc/thu-thiem',
    badge: 'Tâm Điểm Thủ Thiêm',
  },
  {
    id: 'thao-dien',
    name: 'Bán Đảo Thảo Điền & An Phú',
    areaName: 'Thảo Điền, TP. Thủ Đức',
    tag: 'Biệt Thự Vườn Ven Sông',
    subTitle: 'Holm Villas, D’Edge Thảo Điền, Q2 Thảo Điền',
    x: 68,
    y: 38,
    keyProjects: [
      'Biệt thự ven sông Holm Residences (650m²)',
      'Penthouse D’Edge Thảo Điền hồ bơi đáy kính (380m²)',
      'Biệt thự vườn đường Nguyễn Văn Hưởng (450m²)',
    ],
    microclimate: {
      wind: 'Gió uốn khúc bao bọc 3 mặt sông, lưu thông mạnh',
      sun: 'Tán cây xanh cổ thụ lọc bớt 40% ánh sáng gắt',
      humidity: '82% – 88% (Độ ẩm cao nhất khu Đông)',
      solution: 'Gỗ Teak và Sồi sấy chân không, dầu Osmo kháng ẩm chống mốc 100%',
    },
    href: '/khu-vuc/thao-dien',
    badge: 'Ốc Đảo Thảo Điền',
  },
  {
    id: 'phu-my-hung',
    name: 'Đô Thị Phú Mỹ Hưng',
    areaName: 'Quận 7, Nam Sài Gòn',
    tag: 'Biệt Thự Phố Vườn & Căn Hộ Xanh',
    subTitle: 'Chateau Villas, Midtown The Peak, Nam Viên',
    x: 46,
    y: 82,
    keyProjects: [
      'Dinh thự Chateau Phú Mỹ Hưng (780m²)',
      'Penthouse The Peak Midtown (310m²)',
      'Biệt thự phố vườn Nam Viên (320m²)',
    ],
    microclimate: {
      wind: 'Đón trọn luồng gió biển Cần Giờ & sông Rạch Đĩa hướng Nam',
      sun: 'Ánh nắng chan hòa, ít bị nhà cao tầng che chắn',
      humidity: '75% – 80% ổn định quanh năm',
      solution: 'Mặt bằng mở đối lưu xuyên phòng, đá Travertine mát lạnh dẫn gió',
    },
    href: '/khu-vuc/phu-my-hung',
    badge: 'Đô Thị Phú Mỹ Hưng',
  },
  {
    id: 'ba-son',
    name: 'Trung Tâm Ba Son & Bến Nghé',
    areaName: 'Quận 1, TP.HCM',
    tag: 'Căn Hộ Hạng Sang Trung Tâm',
    subTitle: 'Grand Marina Saigon, Vinhomes Golden River',
    x: 48,
    y: 52,
    keyProjects: [
      'Dual-Key Grand Marina Marriott (220m²)',
      'Penthouse Aqua 1 Ba Son hướng trực diện sông (340m²)',
      'Căn hộ The Centennial Bason (155m²)',
    ],
    microclimate: {
      wind: 'Gió sông thổi mạnh qua thung lũng các khối tháp cao tầng',
      sun: 'Nắng sáng phản xạ từ mặt kính các tòa tháp trung tâm',
      humidity: '76% – 80%',
      solution: 'Vật liệu tiêu âm gỗ xẻ rãnh acoustic giảm 28dB tiếng ồn đô thị',
    },
    href: '/khu-vuc/ba-son',
    badge: 'Di Sản Ba Son Q.1',
  },
  {
    id: 'global-city',
    name: 'Khu Đông The Global City & Vinhomes',
    areaName: 'An Phú & Long Bình, TP. Thủ Đức',
    tag: 'Đại Đô Thị Tương Lai',
    subTitle: 'Shophouse Soho, Biệt Thự The Rivus Elie Saab, Grand Park',
    x: 82,
    y: 44,
    keyProjects: [
      'Dinh thự The Rivus ven sông Đồng Nai (1.000m²)',
      'Townhouse Soho The Global City (380m²)',
      'Villa The Manhattan Glory (450m²)',
    ],
    microclimate: {
      wind: 'Gió đồng trống từ lưu vực sông Đồng Nai thổi vào',
      sun: 'Bức xạ nhiệt mặt trời mạnh mẽ, không gian thoáng đãng',
      humidity: '74% – 79%',
      solution: 'Hệ lam gỗ cản nhiệt hướng Tây kết hợp vườn đệm nhiệt đới',
    },
    href: '/projects?category=biet-thu-resort',
    badge: 'Khu Đông Đô Thị Mới',
  },
  {
    id: 'thanh-xuan-woodshop',
    name: 'Xưởng Mộc May Đo Thạnh Xuân',
    areaName: 'Thạnh Xuân, Quận 12, TP.HCM',
    tag: 'Trái Tim Sản Xuất GuHomes',
    subTitle: 'Cơ sở sản xuất gỗ may đo 1.200m² hoạt động từ năm 2016',
    x: 22,
    y: 18,
    keyProjects: [
      'Lò sấy chân không vi khí hậu đạt chuẩn EMC 10–12%',
      '18 Nghệ nhân mộc truyền thống >15 năm tay nghề',
      'Khu vực Dry-fit thử nghiệm không gian toàn phần trước khi xuất xưởng',
    ],
    microclimate: {
      wind: 'Không gian thông thoáng bờ kênh rạch Quận 12',
      sun: 'Hệ mái cách nhiệt bảo vệ gỗ thô nguyên khối',
      humidity: 'Kiểm soát chủ động độ ẩm gỗ đầu vào',
      solution: 'Kho bảo quản gỗ óc chó FAS và sồi trắng kiểm định FSC',
    },
    woodcraftRole: '100% đồ mộc may đo cho các dự án Thủ Thiêm, Thảo Điền, Ba Son đều xuất phát từ đây.',
    href: '/studio',
    badge: 'Xưởng Mộc 1.200m²',
  },
]

export function ProjectSpatialMap({ className }: { className?: string }) {
  const [selectedHub, setSelectedHub] = useState<SpatialHub>(SAIGON_HUBS[0]!)

  return (
    <section className={cn('relative bg-[#0A0D0C] text-[#F3F1EC] py-16 sm:py-24 overflow-hidden border-y border-white/10', className)}>
      {/* Background Architectural Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Bản Đồ Không Gian Kiến Trúc TP.HCM</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-3 tracking-tight">
              Tọa Độ Không Gian &amp; Vi Khí Hậu Sài Gòn
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[62ch] mt-3 font-light leading-relaxed">
              Từ xưởng mộc Thạnh Xuân 1.200m² ở thượng lưu đến các căn hộ Penthouse, Biệt thự ven sông tại Thủ Thiêm, Thảo Điền, Ba Son và Phú Mỹ Hưng. Mỗi tọa độ là một phương án xử lý nắng gió độc bản.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-white/50">CHỌN TỌA ĐỘ KHÁM PHÁ:</span>
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
          </div>
        </div>

        {/* Interactive Layout: Map on Left / Center, Detailed Hub Inspector on Right */}
        <div className="mt-10 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Vector SVG Saigon River Map */}
          <div className="col-span-12 lg:col-span-7 xl:col-span-8 bg-[#070908] rounded-3xl border border-white/15 p-4 sm:p-8 relative shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center select-none">
            {/* Compass Rose Top-Right */}
            <div className="absolute top-5 right-5 pointer-events-none flex flex-col items-center opacity-40 text-xs font-mono">
              <span className="text-accent font-bold">B (N)</span>
              <div className="w-px h-8 bg-accent/60 my-0.5" />
              <span>N (S)</span>
            </div>

            {/* Saigon River Winding Path Background SVG */}
            <svg
              viewBox="0 0 1000 650"
              className="absolute inset-0 w-full h-full pointer-events-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* City Boundaries / Secondary Grid */}
              <circle cx="500" cy="350" r="280" stroke="white" strokeOpacity="0.04" strokeDasharray="4 8" />
              <circle cx="500" cy="350" r="160" stroke="white" strokeOpacity="0.04" strokeDasharray="4 8" />

              {/* Sông Sài Gòn Flow Line with Gradient Glow */}
              <path
                d="M 180 50 C 240 140, 260 220, 380 260 C 480 290, 520 220, 650 210 C 760 200, 780 290, 700 370 C 620 440, 480 390, 450 480 C 420 560, 470 620, 500 650"
                stroke="#1B4942"
                strokeWidth="48"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.35"
              />
              <path
                d="M 180 50 C 240 140, 260 220, 380 260 C 480 290, 520 220, 650 210 C 760 200, 780 290, 700 370 C 620 440, 480 390, 450 480 C 420 560, 470 620, 500 650"
                stroke="#3E8D81"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.75"
              />
              <path
                d="M 180 50 C 240 140, 260 220, 380 260 C 480 290, 520 220, 650 210 C 760 200, 780 290, 700 370 C 620 440, 480 390, 450 480 C 420 560, 470 620, 500 650"
                stroke="#8CEAD8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 12"
                opacity="0.8"
              />

              {/* Sông Đồng Nai Eastern Branch */}
              <path
                d="M 750 120 C 820 200, 850 320, 890 420"
                stroke="#3E8D81"
                strokeWidth="10"
                strokeLinecap="round"
                opacity="0.4"
              />

              {/* River Name Typography */}
              <text x="590" y="270" fill="#8CEAD8" fillOpacity="0.4" fontSize="12" fontFamily="monospace" letterSpacing="0.2em">
                SÔNG SÀI GÒN
              </text>
            </svg>

            {/* Interactive Pins Overlay */}
            <div className="absolute inset-0 pointer-events-auto">
              {SAIGON_HUBS.map((hub) => {
                const isSelected = selectedHub.id === hub.id
                return (
                  <button
                    key={hub.id}
                    type="button"
                    onClick={() => setSelectedHub(hub)}
                    style={{ left: `${hub.x}%`, top: `${hub.y}%` }}
                    className={cn(
                      'absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none transition-all duration-300 z-20',
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110',
                    )}
                    aria-label={`Chọn tọa độ ${hub.name}`}
                  >
                    {/* Animated Pulse Waves */}
                    <span className="relative flex h-8 w-8 items-center justify-center">
                      <span
                        className={cn(
                          'absolute inline-flex h-full w-full rounded-full transition-opacity duration-300',
                          isSelected ? 'bg-accent opacity-75 animate-ping' : 'bg-white/20 group-hover:bg-accent/50',
                        )}
                      />
                      <span
                        className={cn(
                          'relative inline-flex h-4 w-4 rounded-full border-2 transition-all duration-300 shadow-lg',
                          isSelected
                            ? 'bg-accent border-white shadow-accent/50 ring-4 ring-accent/30'
                            : 'bg-[#131715] border-accent/70 group-hover:border-white group-hover:bg-accent',
                        )}
                      />
                    </span>

                    {/* Floating Label pill */}
                    <span
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all duration-300 border shadow-lg',
                        isSelected
                          ? 'bg-accent text-white border-white/40 font-semibold'
                          : 'bg-[#0E1210]/90 text-white/80 border-white/10 group-hover:text-white group-hover:border-white/30',
                      )}
                    >
                      {hub.name}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Bottom-left Watermark Indicator */}
            <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-[10px] font-mono text-white/60">
              TP. HỒ CHÍ MINH • TỌA ĐỘ MAY ĐO QUIET LUXURY
            </div>
          </div>

          {/* Right Column: Detailed Hub Diagnostic Card */}
          <div className="col-span-12 lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            <div className="bg-[#090C0B] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedHub.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between"
                >
                  <div>
                    {/* Badge and Region */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="text-xs font-mono text-accent uppercase tracking-wider">
                        {selectedHub.badge}
                      </span>
                      <span className="text-xs font-mono text-white/40">{selectedHub.areaName}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-4">
                      {selectedHub.name}
                    </h3>
                    <p className="text-accent text-xs font-mono mt-1">{selectedHub.subTitle}</p>

                    {/* Key projects */}
                    <div className="mt-5">
                      <p className="text-xs font-mono uppercase text-white/50 tracking-wider mb-2">
                        Công trình tiêu biểu GuHomes:
                      </p>
                      <ul className="space-y-1.5 text-xs text-white/80 font-light">
                        {selectedHub.keyProjects.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">•</span>
                            <span className="leading-snug">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Microclimate Matrix */}
                    <div className="mt-6 pt-5 border-t border-white/10 space-y-3 text-xs">
                      <p className="font-mono text-white/50 uppercase tracking-wider text-[11px]">
                        Đặc Thù Vi Khí Hậu &amp; Thách Thức:
                      </p>

                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col gap-1">
                        <span className="text-accent font-mono text-[10px] uppercase">Hướng Nắng &amp; Gió:</span>
                        <p className="text-white/80 font-light leading-relaxed">{selectedHub.microclimate.sun} — {selectedHub.microclimate.wind}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col gap-1">
                        <span className="text-accent font-mono text-[10px] uppercase">Độ Ẩm Tự Nhiên:</span>
                        <p className="text-white/80 font-light leading-relaxed">{selectedHub.microclimate.humidity}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-accent/15 border border-accent/30 flex flex-col gap-1">
                        <span className="text-accent font-mono text-[10px] uppercase">Giải Pháp Vật Liệu GuHomes:</span>
                        <p className="text-white font-light leading-relaxed">{selectedHub.microclimate.solution}</p>
                      </div>
                    </div>
                  </div>

                  {/* Call to action button */}
                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-3">
                    <Link
                      href={selectedHub.href}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-white font-mono text-xs transition-all shadow-lg shadow-accent/20"
                    >
                      <span>Khám phá chi tiết {selectedHub.name}</span>
                      <ArrowUpRightIcon className="text-sm" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Hub Switching Tabs for Mobile & Quick Access */}
            <div className="grid grid-cols-3 gap-2">
              {SAIGON_HUBS.map((hub) => (
                <button
                  key={hub.id}
                  onClick={() => setSelectedHub(hub)}
                  className={cn(
                    'p-2.5 rounded-xl border text-center transition-all text-xs font-mono truncate',
                    selectedHub.id === hub.id
                      ? 'bg-accent/20 border-accent text-white shadow-md'
                      : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.08] hover:text-white',
                  )}
                >
                  {hub.name.replace('Bán Đảo ', '').replace('Đô Thị ', '')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
