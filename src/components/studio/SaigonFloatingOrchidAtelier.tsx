'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface OrchidSpecies {
  id: string
  name: string
  scientificName: string
  driftwood: string
  humidity: string
  bloomingSeason: string
  fragranceProfile: string
}

const NATIVE_ORCHIDS: OrchidSpecies[] = [
  {
    id: 'phi-diep',
    name: 'Lan Giả Hạc (Phi Điệp Rừng)',
    scientificName: 'Dendrobium anosmum',
    driftwood: 'Gỗ Lũa Sao Đen Chìm Nước',
    humidity: '75% - 85% RH',
    bloomingSeason: 'Cuối Xuân - Đầu Hạ (Tháng 3 - 5)',
    fragranceProfile: 'Hương trầm ngọt ngào, phảng phất vào lúc chập tối khi gió sông lùa vào giếng trời.',
  },
  {
    id: 'hoang-thao-ken',
    name: 'Hoàng Thảo Kèn',
    scientificName: 'Dendrobium lilliense',
    driftwood: 'Lũa Gõ Đỏ Bào Mòn Tự Nhiên',
    humidity: '70% - 80% RH',
    bloomingSeason: 'Đầu Xuân (Tháng 1 - 3)',
    fragranceProfile: 'Sắc tím quý phái, hương thanh thoát êm dịu xua tan căng thẳng.',
  },
  {
    id: 'thuy-tien-trang',
    name: 'Thủy Tiên Trắng (Kiều Vuông)',
    scientificName: 'Dendrobium farmeri',
    driftwood: 'Thân Dương Xỉ Rừng Cổ Thụ',
    humidity: '80% - 88% RH',
    bloomingSeason: 'Giữa Mùa Mưa (Tháng 6 - 8)',
    fragranceProfile: 'Chùm hoa trắng tuyết mềm mại, hương hoa thanh khiết như trà sương sớm.',
  },
  {
    id: 'dai-chau',
    name: 'Ngọc Điểm Rừng (Đai Châu)',
    scientificName: 'Rhynchostylis gigantea',
    driftwood: 'Lũa Trắc Vàng Rừng Tây Nguyên',
    humidity: '75% - 85% RH',
    bloomingSeason: 'Dịp Tết Nguyên Đán (Tháng 1 - 2)',
    fragranceProfile: 'Hương thơm nồng nàn quyền quý, giữ lộc đón xuân cho toàn bộ gia quyến.',
  },
]

export function SaigonFloatingOrchidAtelier({ className }: { className?: string } = {}) {
  const [activeOrchidId, setActiveOrchidId] = useState<string>('phi-diep')
  const [mistCycle, setMistCycle] = useState<'dawn' | 'dusk' | 'pulsing'>('dawn')
  const [isMisting, setIsMisting] = useState<boolean>(true)
  const [humidityLevel] = useState<number>(82) // 82% RH microclimate

  const activeOrchid = NATIVE_ORCHIDS.find((o) => o.id === activeOrchidId) ?? NATIVE_ORCHIDS[0]!

  return (
    <section
      aria-label="Vườn Lan Rừng Treo Cáp Không Trọng Lực"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background tropical rainforest foliage lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/4 h-96 w-96 rounded-full bg-emerald-950/20 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-teal-950/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/50 px-3.5 py-1 text-xs tracking-widest text-emerald-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Sinh Thái Lơ Lửng Giữa Đô Thị
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Vườn Lan Rừng Treo Không Trọng Lực
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Các nhánh lan hoàng thảo rừng nguyên sinh ghép lũa cổ thụ, lơ lửng bằng dây cáp Inox SS316 1.2mm tàng hình. 
            Hệ phun sương siêu âm 5 micron tự động duy trì vi khí hậu ẩm 80-85% và đèn quang hợp full-spectrum CRI 98 giấu trần.
          </p>
        </div>

        {/* Interactive Floating Orchid Terrarium Canvas */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Floating Orchid Specimen & Mist Visual */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-medium">
                      Tiêu Bản Lan Rừng Bản Địa Việt Nam
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {activeOrchid.name}
                    </h3>
                  </div>

                  {/* Mist Cycle Tabs */}
                  <div className="flex items-center gap-1.5 bg-stone-900 border border-stone-800 rounded-xl p-1 text-xs">
                    {(['dawn', 'dusk', 'pulsing'] as const).map((cycle) => (
                      <button
                        key={cycle}
                        type="button"
                        onClick={() => setMistCycle(cycle)}
                        className={cn(
                          'px-2.5 py-1.5 rounded-lg transition-colors font-medium',
                          mistCycle === cycle
                            ? 'bg-emerald-600 text-stone-950 shadow-md shadow-emerald-500/20'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {cycle === 'dawn' ? 'Sương Sớm 06:00' : cycle === 'dusk' ? 'Sương Chiều 17:00' : 'Vi Phun Ngắt Quãng'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Floating Driftwood Visualizer */}
                <div className="mt-6 relative h-60 sm:h-72 rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-emerald-950/20 to-black overflow-hidden flex flex-col justify-between p-6">
                  {/* Subtle Hanging Cords Inox SS316 */}
                  <div className="absolute top-0 inset-x-0 flex justify-around pointer-events-none opacity-40">
                    <div className="w-px h-28 bg-stone-500" />
                    <div className="w-px h-24 bg-stone-400" />
                    <div className="w-px h-32 bg-stone-500" />
                  </div>

                  {/* Ultrasonic Mist Fog Particles */}
                  {isMisting && (
                    <div className="absolute inset-0 flex justify-around pointer-events-none opacity-40">
                      <span className="h-full w-24 bg-emerald-200/10 blur-2xl animate-pulse" />
                      <span className="h-full w-36 bg-teal-100/15 blur-3xl animate-pulse" />
                      <span className="h-full w-20 bg-emerald-200/10 blur-2xl animate-pulse" />
                    </div>
                  )}

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-xs font-mono text-emerald-300 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      Cáp Treo SS316 D1.2mm · Khẩu Độ Trôi Không Trọng Lực
                    </span>

                    <button
                      type="button"
                      onClick={() => setIsMisting(!isMisting)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-mono transition-all border',
                        isMisting
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-stone-900 text-stone-400 border-stone-700'
                      )}
                    >
                      {isMisting ? 'Phun Sương Siêu Âm: Đang Bật' : 'Phun Sương: Tạm Tắt'}
                    </button>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[11px] text-stone-400 font-mono italic block">
                      {activeOrchid.scientificName} · Giá thể: {activeOrchid.driftwood}
                    </span>
                    <p className="font-serif text-stone-100 text-sm sm:text-base mt-1 max-w-lg leading-relaxed">
                      {activeOrchid.fragranceProfile}
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono pt-3 border-t border-stone-800/80">
                    <span className="text-stone-400">
                      Độ ẩm cục bộ: <strong className="text-emerald-400">{humidityLevel}% RH</strong>
                    </span>
                    <span className="text-stone-400">
                      Mùa nở hoa: <strong className="text-amber-300">{activeOrchid.bloomingSeason}</strong>
                    </span>
                  </div>
                </div>

                {/* Orchid Variety Selector Carousel */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {NATIVE_ORCHIDS.map((orchid) => (
                    <button
                      key={orchid.id}
                      type="button"
                      onClick={() => setActiveOrchidId(orchid.id)}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all',
                        activeOrchidId === orchid.id
                          ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-200'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <span className="block text-xs font-medium text-stone-200 truncate">
                        {orchid.name.split(' (')[0]}
                      </span>
                      <span className="block text-[10px] font-mono text-emerald-400/80 mt-1">
                        {orchid.humidity}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Microclimate Engineering Specs */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Hệ Thống Kiểm Soát Vi Khí Hậu Tự Động
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    Mô Phỏng Rừng Ẩm
                  </span>
                </div>

                <div className="my-5 space-y-3.5 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Béc phun sương siêu âm Ruby:</span>
                      <span className="text-emerald-400 font-mono font-medium">Hạt sương 5 micron</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Sương bay lơ lửng làm mát không khí giếng trời mà không làm ướt đọng sàn gỗ hay đồ nội thất bên dưới.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Đèn LED sinh học Full-Spectrum:</span>
                      <span className="text-amber-300 font-mono font-medium">3500K · CRI 98</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Quang phổ PAR tối ưu kích thích rễ lan đâm chồi, lá xanh mướt quanh năm ngay cả trong giếng trời nhà phố hẹp.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Nước cấp lọc RO khử khoáng:</span>
                      <span className="text-cyan-300 font-mono font-medium">TDS &lt; 15 ppm</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Không để lại cặn vôi trắng bám trên thân lũa hay lá lan, giữ trọn vẻ đẹp hoang sơ nguyên bản.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Vị trí kiến trúc lý tưởng:</span>
                <span className="font-mono text-stone-200">Giếng Trời · Cầu Thang Xoắn · Logia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950 p-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Đưa một khoảng rừng nguyên sinh tĩnh lặng vào không gian sống của bạn</span>
          </div>
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
          >
            Tìm hiểu xưởng sinh thái và nghệ thuật sắp đặt lan rừng GuHomes
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
