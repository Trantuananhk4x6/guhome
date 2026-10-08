'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type RiverTimeOfDay = 'dawn' | 'noon' | 'dusk' | 'night'

interface MekongSpecies {
  id: string
  name: string
  scientificName: string
  role: string
  biotopeNiche: string
}

const MEKONG_SPECIES: MekongSpecies[] = [
  {
    id: 'ca-ho',
    name: 'Cá Hô Nam Bộ (Vua Cá Sông Mê Kông)',
    scientificName: 'Catlocarpio siamensis',
    role: 'Biểu tượng phong thủy thịnh vượng và trường tồn',
    biotopeNiche: 'Tầng đáy sâu nơi hang hốc rễ lũa sao đen, tính tình điềm đạm, bơi lội khoan thai.',
  },
  {
    id: 'ca-com-song',
    name: 'Đàn Cá Cơm Sông Phù Sa',
    scientificName: 'Corica soborna',
    role: 'Đàn cá bơi lội tạo chuyển động lung linh khúc xạ ánh sáng',
    biotopeNiche: 'Tầng mặt và tầng giữa, bơi theo đàn lấp lánh vảy bạc trong dòng nước mát.',
  },
  {
    id: 'rong-duoi-chon',
    name: 'Rong Đuôi Chồn Cổ Điển',
    scientificName: 'Ceratophyllum demersum',
    role: 'Lọc kim loại nặng và tạo oxy hòa tan dồi dào',
    biotopeNiche: 'Bám tự nhiên vào thân lũa, đung đưa theo dòng đối lưu nhịp nhàng.',
  },
  {
    id: 'thuy-cuc',
    name: 'Thủy Cúc Bản Địa',
    scientificName: 'Hygrophila difformis',
    role: 'Thảm thực vật xanh mướt cho vi sinh vật trú ngụ',
    biotopeNiche: 'Gốc cắm sâu trong lớp cát phù sa cổ ngàn năm đã xử lý nhiệt tiệt trùng.',
  },
]

export function SaigonMekongBiotopeAquariumVault({ className }: { className?: string } = {}) {
  const [timeOfDay, setTimeOfDay] = useState<RiverTimeOfDay>('dusk')
  const [activeSpeciesId, setActiveSpeciesId] = useState<string>('ca-ho')

  const activeSpecies = MEKONG_SPECIES.find((s) => s.id === activeSpeciesId) ?? MEKONG_SPECIES[0]!

  return (
    <section
      aria-label="Hồ Thủy Sinh Biotope Sông Mê Kông Nguyên Sinh"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background river sediment ambient lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-900/15 blur-[150px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-teal-950/20 blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(180,83,9,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Hệ Sinh Thái Biotope Sông Nước Nam Bộ
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Thủy Sinh Biotope Mê Kông &amp; Lũa Sao Đen Cổ Thụ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Một lát cắt lòng sông Mê Kông nguyên sơ dài 4 mét giữa không gian phòng khách master. 
            Kính Low-Iron 19mm mài bóng vô cực, rễ lũa sao đen trầm tích ngàn năm, cát phù sa cổ tự nhiên phân tầng sinh học, 
            kết hợp hệ thống dòng chảy chậm dưới 15 dBA tái hiện trọn vẹn nhịp sống thủy triều châu thổ phương Nam.
          </p>
        </div>

        {/* Interactive Aquarium Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: 4m Panorama Tank Simulation & Lighting Spectrum Controller */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Chu Kỳ Quang Phổ Dòng Sông Tự Nhiên
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {timeOfDay === 'dawn' && 'Bình Minh Sông Tiền (3200K • Dòng Nhẹ 0.10 m/s)'}
                      {timeOfDay === 'noon' && 'Nắng Trưa Mê Kông (5500K • Dòng Chảy 0.25 m/s)'}
                      {timeOfDay === 'dusk' && 'Hoàng Hôn Châu Đốc (2500K • Nước Tĩnh Hoàng Kim)'}
                      {timeOfDay === 'night' && 'Trăng Đêm Rạch Giá (450nm Actinic • Dòng Êm 0.05 m/s)'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-amber-400">pH 6.8</span>
                    <span>|</span>
                    <span className="font-mono text-emerald-400">TDS 110 ppm</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">DO 8.2 mg/L</span>
                  </div>
                </div>

                {/* 4-Meter Panorama Glass Tank Visualizer */}
                <div className={cn(
                  'relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-xl border transition-all duration-700 p-5 flex flex-col justify-between',
                  timeOfDay === 'dawn' && 'border-amber-800/60 bg-gradient-to-b from-amber-950/40 via-stone-900 to-black shadow-[inset_0_0_50px_rgba(217,119,6,0.15)]',
                  timeOfDay === 'noon' && 'border-cyan-800/60 bg-gradient-to-b from-teal-950/30 via-stone-900 to-black shadow-[inset_0_0_50px_rgba(6,182,212,0.15)]',
                  timeOfDay === 'dusk' && 'border-orange-800/60 bg-gradient-to-b from-orange-950/40 via-stone-900 to-black shadow-[inset_0_0_50px_rgba(234,88,12,0.15)]',
                  timeOfDay === 'night' && 'border-blue-900/60 bg-gradient-to-b from-blue-950/40 via-stone-950 to-black shadow-[inset_0_0_50px_rgba(37,99,235,0.15)]'
                )}>
                  {/* Top info badge inside simulation */}
                  <div className="flex items-center justify-between z-10 text-xs">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-800 px-2.5 py-1 text-amber-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Kính Low-Iron 19mm Dài 4.0m x Cao 1.2m
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Bơm Lọc Ngầm Chìm &lt; 15 dBA
                    </span>
                  </div>

                  {/* Stylized Riverbed Driftwood & Fish Graphic */}
                  <div className="relative my-auto flex flex-col items-center justify-end z-10 h-36">
                    <svg viewBox="0 0 320 110" className="w-full h-32">
                      {/* Sun / Moon light beams refracting down */}
                      <path d="M 60,0 L 90,80 L 120,0 Z" fill="#fff" opacity={timeOfDay === 'noon' ? '0.12' : '0.04'} />
                      <path d="M 170,0 L 210,80 L 240,0 Z" fill="#fff" opacity={timeOfDay === 'noon' ? '0.1' : '0.03'} />

                      {/* Giant Ancient Black Hopea Driftwood (Lũa Sao Đen) */}
                      <path
                        d="M 20,95 Q 60,70 110,65 Q 160,60 210,45 Q 260,30 290,15 L 295,20 Q 265,36 215,50 Q 165,66 115,72 Q 70,78 30,102 Z"
                        fill="#292524"
                        stroke="#44403c"
                        strokeWidth="1.5"
                      />
                      {/* Secondary roots branching down */}
                      <path d="M 120,70 Q 130,85 135,100" stroke="#292524" strokeWidth="3" fill="none" />
                      <path d="M 180,55 Q 190,75 195,100" stroke="#292524" strokeWidth="2.5" fill="none" />
                      <path d="M 230,45 Q 240,70 245,100" stroke="#292524" strokeWidth="2" fill="none" />

                      {/* River sediment sand bed */}
                      <rect x="0" y="98" width="320" height="12" fill="#78350f" opacity="0.6" />
                      <path d="M 0,98 Q 80,95 160,98 T 320,98" stroke="#a16207" strokeWidth="2" fill="none" />

                      {/* Swimming Fish (Catlocarpio siamensis) */}
                      <g className="transition-transform duration-1000">
                        <ellipse cx="150" cy="50" rx="20" ry="8" fill={timeOfDay === 'night' ? '#38bdf8' : '#d97706'} opacity="0.9" />
                        <polygon points="128,50 120,44 120,56" fill={timeOfDay === 'night' ? '#0284c7' : '#b45309'} />
                        {/* Fin */}
                        <path d="M 152,42 Q 158,36 164,42" stroke="#fff" strokeWidth="1" fill="none" />
                      </g>

                      {/* Tiny School of river fish */}
                      <circle cx="75" cy="40" r="2.5" fill="#fde047" opacity="0.8" />
                      <circle cx="82" cy="42" r="2" fill="#fde047" opacity="0.7" />
                      <circle cx="78" cy="45" r="2" fill="#fde047" opacity="0.8" />
                      <circle cx="88" cy="39" r="1.8" fill="#fde047" opacity="0.6" />
                    </svg>
                  </div>

                  {/* Bottom bar of simulation */}
                  <div className="flex items-center justify-between z-10 text-[11px] font-mono text-stone-400">
                    <span>Nhiệt độ nước tự nhiên: 27.5°C</span>
                    <span className="text-amber-400">Lát cắt phù sa cổ 3 lớp: Bùn khoáng - Sỏi bazan - Cát vàng</span>
                  </div>
                </div>

                {/* Lighting Spectrum Selector Pills */}
                <div className="mt-5">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Chọn Khoảnh Khắc Dòng Sông Nam Bộ:
                  </span>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setTimeOfDay('dawn')}
                      className={cn(
                        'rounded-xl border p-2 text-center text-xs transition-all',
                        timeOfDay === 'dawn'
                          ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-semibold shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      Bình Minh Sông Tiền
                    </button>
                    <button
                      onClick={() => setTimeOfDay('noon')}
                      className={cn(
                        'rounded-xl border p-2 text-center text-xs transition-all',
                        timeOfDay === 'noon'
                          ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 font-semibold shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      Nắng Trưa Mê Kông
                    </button>
                    <button
                      onClick={() => setTimeOfDay('dusk')}
                      className={cn(
                        'rounded-xl border p-2 text-center text-xs transition-all',
                        timeOfDay === 'dusk'
                          ? 'border-orange-500 bg-orange-500/20 text-orange-300 font-semibold shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      Hoàng Hôn Châu Đốc
                    </button>
                    <button
                      onClick={() => setTimeOfDay('night')}
                      className={cn(
                        'rounded-xl border p-2 text-center text-xs transition-all',
                        timeOfDay === 'night'
                          ? 'border-blue-500 bg-blue-500/20 text-blue-300 font-semibold shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      Trăng Đêm Rạch Giá
                    </button>
                  </div>
                </div>
              </div>

              {/* Species Detail Card */}
              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-100">{activeSpecies.name}</span>
                    <span className="font-mono text-amber-400 italic">{activeSpecies.scientificName}</span>
                  </div>
                  <div className="mt-1 text-xs text-stone-300 font-light leading-relaxed">
                    <span className="text-amber-300">Ý nghĩa phong thủy: </span>
                    {activeSpecies.role}
                  </div>
                  <div className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                    <span className="text-stone-300">Tập tính sinh thái: </span>
                    {activeSpecies.biotopeNiche}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Species Selector & Filtration Technology */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                  Hệ Sinh Vật Bản Địa Lưu Vực Sông
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Tuyển chọn các loài thủy sinh quý hiếm thích nghi cao:
                </p>

                {/* 4 Species Buttons */}
                <div className="mt-3 space-y-2">
                  {MEKONG_SPECIES.map((spec) => {
                    const isSelected = activeSpeciesId === spec.id
                    return (
                      <button
                        key={spec.id}
                        onClick={() => setActiveSpeciesId(spec.id)}
                        className={cn(
                          'w-full flex items-center justify-between rounded-xl border p-3 text-left transition-all',
                          isSelected
                            ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm'
                            : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        <div className="min-w-0 pr-2">
                          <div className="text-xs font-semibold text-stone-200 truncate">{spec.name}</div>
                          <div className="text-[10px] text-stone-400 italic truncate">{spec.scientificName}</div>
                        </div>
                        <span className="text-[10px] font-mono rounded bg-stone-900 px-2 py-0.5 text-amber-300 shrink-0">
                          {spec.id === 'ca-ho' ? 'Tầng Đáy' : spec.id === 'ca-com-song' ? 'Tầng Mặt' : 'Thực Vật'}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Filtration System Specs */}
                <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Hệ Thống Lọc Sinh Học Ngầm Dưới 15 dBA
                  </div>
                  <p className="mt-1.5 text-xs text-stone-300 font-light leading-relaxed">
                    Hệ bể lọc sump ngầm 1.200 lít giấu kín dưới chân kệ ốp đá cẩm thạch đen. 
                    Vi sinh vật phân giải chất hữu cơ tự nhiên 100%, bổ sung tannin từ gỗ sao đen tạo màu nước trà nhạt đặc trưng của dòng sông quê hương.
                  </p>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-light">
                    May đo bể biotope theo kích thước sảnh:
                  </span>
                  <Link
                    href="/du-toan-chi-phi"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                  >
                    <span>Dự toán lắp đặt</span>
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio visit link */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Chiêm ngưỡng trực tiếp bể Biotope Mê Kông 4 mét tại{' '}
            <span className="font-medium text-stone-200">GuHomes Experience Gallery (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Đặt lịch thưởng ngoạn bể thủy sinh</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <span className="text-stone-700">|</span>
            <a
              href="tel:0368757916"
              className="text-xs text-stone-300 hover:text-white font-mono transition-colors"
            >
              Hotline: 0368 757 916
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
