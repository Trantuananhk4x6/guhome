'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface LookbookItem {
  id: string
  title: string
  subtitle: string
  location: string
  area: string
  climateChallenge: string
  solution: string
  tempReduction: string
  humidityControl: string
  image: string
  imageAlt: string
  palette: { name: string; hex: string; desc: string }[]
  specs: { label: string; value: string }[]
  quoteStyle: string
}

const LOOKBOOKS: LookbookItem[] = [
  {
    id: 'metropole',
    title: 'Penthouse The Opera Metropole',
    subtitle: 'Đối thoại cùng mặt trời lặn bên sông Sài Gòn',
    location: 'Bán đảo Thủ Thiêm, TP. Thủ Đức',
    area: '345 m² · Duplex 2 tầng thông tầng 7.2m',
    climateChallenge: 'Độ ẩm 78% quanh năm, bức xạ nhiệt mặt trời lặn hướng Tây nung nóng vách kính tới 48°C lúc 15:30.',
    solution: 'Hệ lam xoay gỗ Teak rừng sấy chân không kết hợp mành tre hun khói và khe lấy gió vi khí hậu sông, hạ nhiệt tự nhiên.',
    tempReduction: '-6.5°C',
    humidityControl: '55% RH',
    image: '/media/ben-kia-song/12-1600.webp',
    imageAlt: 'Penthouse The Opera Metropole Thủ Thiêm thiết kế nội thất vi khí hậu GuHomes',
    palette: [
      { name: 'Gỗ Teak Miệt Vườn', hex: '#8B5A2B', desc: 'Chống ẩm 78%, tinh dầu kháng mốc tự nhiên' },
      { name: 'Đá Travertine Ý', hex: '#D2B48C', desc: 'Bề mặt thở nano, tản nhiệt đối lưu' },
      { name: 'Vữa Vôi Hàu Tự Nhiên', hex: '#EAE6DF', desc: 'Hút ẩm mùa mưa, nhả ẩm mùa khô' },
    ],
    specs: [
      { label: 'Hướng công trình', value: 'Tây Nam (View trực diện sông)' },
      { label: 'Thời gian thi công', value: '95 ngày may đo trọn gói' },
      { label: 'Vật liệu chủ đạo', value: 'Teak FAS, Travertine, Khung nhôm Anode' },
      { label: 'Âm học thính phòng', value: 'Vòm parabol RT60 = 0.32s' },
    ],
    quoteStyle: 'modern-luxury',
  },
  {
    id: 'global-city',
    title: 'Dinh Thự The Global City',
    subtitle: 'Vật liệu nguyên bản và dòng chảy năng lượng thanh khiết',
    location: 'Đỗ Xuân Hợp, Phường An Phú, TP. Thủ Đức',
    area: '520 m² · Dinh thự 4 tầng mặt tiền kênh đào',
    climateChallenge: 'Gió nóng khô rát đường nhựa đô thị, ô nhiễm bụi mịn PM2.5 và tiếng ồn giao thông giờ cao điểm.',
    solution: 'Sân trong vách thác nước đá ngọc Onyx vàng mật ong xuyên sáng LED kết hợp bể ngâm bazan lục lăng ion âm.',
    tempReduction: '-4.8°C',
    humidityControl: '52% RH',
    image: '/media/nha-pho-hien-dai-nha-pho-1-mat-tien/1-1200.webp',
    imageAlt: 'Dinh thự The Global City nội thất mộc đá ngọc GuHomes',
    palette: [
      { name: 'Đá Ngọc Onyx Vàng', hex: '#C5A880', desc: 'Xuyên sáng LED 2700K, phát quang tinh thể' },
      { name: 'Bazan Đắk Nông', hex: '#3E3D39', desc: 'Khoét rỗng nguyên khối, ion âm thanh lọc' },
      { name: 'Gỗ Sao Cát Ghe Bầu', hex: '#654321', desc: 'Gỗ sông trăm tuổi, kháng nứt tuyệt đối' },
    ],
    specs: [
      { label: 'Hướng công trình', value: 'Đông Nam (Đón gió kênh đào)' },
      { label: 'Thời gian thi công', value: '120 ngày may đo độc bản' },
      { label: 'Vật liệu chủ đạo', value: 'Onyx Iran, Bazan Gia Lai, Gỗ Sao Cát' },
      { label: 'Tĩnh âm vi mô', value: '< 18 dBA thác nước êm đềm' },
    ],
    quoteStyle: 'wabi-sabi',
  },
  {
    id: 'ecopark',
    title: 'Biệt Thự Đảo Ecopark SwanBay',
    subtitle: 'Ốc đảo sinh thái biệt lập bốn bề sóng nước',
    location: 'Đảo Đại Phước, Giáp ranh Quận 2 & Đồng Nai',
    area: '680 m² · Biệt thự sân vườn 3 mặt sông',
    climateChallenge: 'Hơi ẩm sương sớm bốc từ mặt nước sông Đồng Nai, gió bão nhiệt đới mùa mưa và nắng gắt phản xạ mặt nước.',
    solution: 'Hệ mái ngói âm dương Chợ Lớn 4 tầng men xanh lý, vòm gỗ Dổi sấy chân không và trục thông gió đối lưu tự nhiên 24/7.',
    tempReduction: '-5.2°C',
    humidityControl: '50% RH',
    image: '/media/chung-cu-1-2-ngu/0-1600.webp',
    imageAlt: 'Biệt thự đảo Ecopark SwanBay kiến trúc vi khí hậu GuHomes',
    palette: [
      { name: 'Ngói Âm Dương Chợ Lớn', hex: '#4A6B56', desc: 'Men xanh lý Cây Mai, cách nhiệt 4 tầng' },
      { name: 'Gỗ Dổi Sấy Chân Không', hex: '#A07855', desc: 'Kháng cong vênh, hương thơm tự nhiên' },
      { name: 'Đá Ong Xám Bến Nghé', hex: '#696969', desc: 'Hút nước ngầm, làm mát sàn hiên' },
    ],
    specs: [
      { label: 'Hướng công trình', value: 'Nam - Đông Nam (3 mặt thoáng)' },
      { label: 'Thời gian thi công', value: '110 ngày may đo thủ công' },
      { label: 'Vật liệu chủ đạo', value: 'Gỗ Dổi, Ngói men Chợ Lớn, Đá ong xám' },
      { label: 'Thính âm salon', value: 'Phòng hòa tấu Harpsichord RT60 0.34s' },
    ],
    quoteStyle: 'minimalist',
  },
]

export function BespokeSpatialLookbookShowcase({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState('metropole')
  const { openQuoteModal } = useQuickQuote()

  const currentLookbook = LOOKBOOKS.find((l) => l.id === selectedId) ?? LOOKBOOKS[0]!

  return (
    <section
      id="lookbook-khong-gian"
      className={cn('u-gutter py-[clamp(4.5rem,10vh,8rem)] bg-surface/50 border-t border-line/60', className)}
    >
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-line">
          <div className="flex flex-col gap-3 max-w-[70ch]">
            <Label rule tone="accent">
              Tuyển Tập Lookbook Không Gian 2026
            </Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-normal text-ink leading-[1.2]">
              Khám phá giải pháp không gian thực tế tại các tâm điểm bất động sản Sài Gòn.
            </h2>
            <p className="font-body text-[1rem] text-ink/75 leading-relaxed mt-1">
              Mỗi công trình là một bài toán vi khí hậu đặc thù, được xưởng mộc Thạnh Xuân 1.200m² của GuHomes may đo riêng biệt từng chi tiết mộng gỗ, lớp sơn mài và phiến đá tự nhiên.
            </p>
          </div>

          {/* Lookbook Navigation Tabs */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {LOOKBOOKS.map((lb) => {
              const isActive = lb.id === selectedId
              return (
                <button
                  key={lb.id}
                  type="button"
                  onClick={() => setSelectedId(lb.id)}
                  className={cn(
                    'group relative flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2.5 font-body text-xs sm:text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer',
                    isActive
                      ? 'border-accent bg-espresso text-canvas shadow-md'
                      : 'border-line bg-surface hover:border-accent/50 hover:bg-canvas text-ink/80',
                  )}
                >
                  <span className={cn('h-2 w-2 rounded-full', isActive ? 'bg-accent animate-pulse' : 'bg-line')} />
                  <span>{lb.title.split(' ')[0]} {lb.title.split(' ')[1]}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Lookbook Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLookbook.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start"
          >
            {/* Left 7 Cols: Image & Spatial Blueprint Visual */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-surface shadow-2xl group">
                <Image
                  src={currentLookbook.image}
                  alt={currentLookbook.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent opacity-80" />

                {/* Overlaid Badges */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div className="flex flex-col gap-1 text-canvas">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-soft">
                      {currentLookbook.location}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-canvas">
                      {currentLookbook.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-espresso/85 border border-accent/40 px-3.5 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-[11px] uppercase text-accent-soft">Hạ nhiệt</span>
                      <span className="font-display text-lg font-medium text-canvas">{currentLookbook.tempReduction}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-espresso/85 border border-accent/40 px-3.5 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-[11px] uppercase text-accent-soft">Cân bằng ẩm</span>
                      <span className="font-display text-lg font-medium text-canvas">{currentLookbook.humidityControl}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Material Swatches Palette Bar */}
              <div className="p-5 rounded-xl border border-line bg-surface/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted shrink-0">
                  Bảng Vật Liệu Bản Địa:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto flex-1 sm:justify-end">
                  {currentLookbook.palette.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-canvas border border-line/60">
                      <span
                        className="h-6 w-6 rounded-full border border-black/10 shrink-0 shadow-xs"
                        style={{ backgroundColor: p.hex }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-medium text-ink truncate">{p.name}</span>
                        <span className="text-[10px] text-muted truncate">{p.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Technical Breakdown & Action */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Header Info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 font-mono text-xs text-accent">
                  <span>● LOOKBOOK {currentLookbook.id.toUpperCase()}</span>
                  <span>·</span>
                  <span>{currentLookbook.area}</span>
                </div>
                <h4 className="font-display text-2xl text-ink">
                  {currentLookbook.subtitle}
                </h4>
              </div>

              {/* Climate Challenge & Tailored Solution Card */}
              <div className="flex flex-col gap-4 rounded-xl border border-line bg-canvas p-6 shadow-sm">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-red-700/80 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                    Thách thức vi khí hậu thực tế:
                  </span>
                  <p className="font-body text-sm text-ink/80 leading-relaxed">
                    {currentLookbook.climateChallenge}
                  </p>
                </div>

                <div className="h-[1px] w-full bg-line" />

                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs uppercase tracking-wider text-accent flex items-center gap-1.5">
                    <CheckIcon className="h-3.5 w-3.5 text-accent" />
                    Giải pháp may đo GuHomes:
                  </span>
                  <p className="font-body text-sm text-ink/90 font-medium leading-relaxed">
                    {currentLookbook.solution}
                  </p>
                </div>
              </div>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3">
                {currentLookbook.specs.map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-lg border border-line/70 bg-surface/60 flex flex-col gap-1">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{s.label}</span>
                    <span className="font-body text-xs font-medium text-ink">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => openQuoteModal(currentLookbook.quoteStyle)}
                  className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-full bg-espresso hover:bg-ink text-canvas font-medium text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-md cursor-pointer border border-accent/40"
                >
                  <span>Nhận Báo Giá Không Gian Này</span>
                  <ArrowUpRightIcon className="text-base text-accent" />
                </button>

                <Link
                  href="/du-toan-chi-phi"
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full border border-line hover:border-accent hover:bg-canvas text-ink text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Bóc tách m² từng phòng</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
