'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type ReefLightMode = 'tropical-noon' | 'sunset-reef' | 'deep-blue-actinic'

interface CoralSpecies {
  id: string
  name: string
  type: string
  fluorescence: string
  flowRequirement: string
  lightingDemand: string
}

const CORAL_SPECIES: CoralSpecies[] = [
  {
    id: 'torch-coral',
    name: 'San Hô Đuốc Indo Gold (Torch Coral)',
    type: 'LPS Coral',
    fluorescence: 'Đầu xúc tu vàng óng ánh huỳnh quang rực rỡ',
    flowRequirement: 'Dòng chảy lượn sóng nhịp nhàng',
    lightingDemand: 'PAR 150 - 200 µmol/m²/s',
  },
  {
    id: 'hammer-coral',
    name: 'San Hô Búa Xanh Biển (Hammer Coral)',
    type: 'LPS Coral',
    fluorescence: 'Đầu búa phát sáng xanh lục Emerald huyền ảo',
    flowRequirement: 'Dòng tuần hoàn êm dịu',
    lightingDemand: 'PAR 120 - 180 µmol/m²/s',
  },
  {
    id: 'acropora-tenuis',
    name: 'San Hô Nhánh Acropora Tenuis',
    type: 'SPS Coral',
    fluorescence: 'Đa sắc cầu vồng tím hồng dưới ánh sáng Actinic',
    flowRequirement: 'Dòng xoáy ngẫu nhiên mạnh mẽ',
    lightingDemand: 'PAR 250 - 350 µmol/m²/s',
  },
  {
    id: 'zoanthids-rainbow',
    name: 'San Hô Cúc Đa Sắc (Rainbow Zoas)',
    type: 'Soft Coral',
    fluorescence: 'Mâm hoa phát quang cam neon và vàng chanh rực sáng',
    flowRequirement: 'Dòng nhẹ đến trung bình',
    lightingDemand: 'PAR 80 - 150 µmol/m²/s',
  },
]

export function PrivateSaltwaterNanoReefSanctuary({ className }: { className?: string } = {}) {
  const [lightMode, setLightMode] = useState<ReefLightMode>('deep-blue-actinic')
  const [activeCoralId, setActiveCoralId] = useState<string>('torch-coral')
  const [skimmerActive, setSkimmerActive] = useState<boolean>(true)

  const activeCoral = CORAL_SPECIES.find((c) => c.id === activeCoralId) ?? CORAL_SPECIES[0]!

  return (
    <section
      aria-label="Bể San Hô Đại Dương Nano Reef Sống"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background deep ocean glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-blue-950/30 blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-indigo-950/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/50 px-3.5 py-1 text-xs tracking-widest text-blue-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Hệ Sinh Thái Biển Khép Kín Dinh Thự
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bể San Hô Đại Dương Nano Reef Nước Mặn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Một kỳ quan đại dương thu nhỏ giữa đại sảnh hoặc phòng khách master. Kính quang học Low-Iron 19mm mài bóng cạnh vô hình, 
            dải quang phổ biển Actinic 400-470nm đánh thức vẻ đẹp huỳnh quang của các rạn san hô sống tự nhiên và máy tách bọt Protein Skimmer dưới 20 dBA.
          </p>
        </div>

        {/* Interactive Ocean Reef Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Reef Aquarium Tank Simulation */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-blue-400 font-mono font-medium">
                      Phổ Ánh Sáng Rạn San Hô Thời Gian Thực
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {lightMode === 'tropical-noon' && 'Nắng Trưa Nhiệt Đới 10.000K · Rực Rỡ Đầy Năng Lượng'}
                      {lightMode === 'sunset-reef' && 'Hoàng Hôn Đại Dương Warm Amber · Lắng Đọng Dịu Êm'}
                      {lightMode === 'deep-blue-actinic' && 'Huỳnh Quang Biển Đêm Deep Blue Actinic 450nm'}
                    </h3>
                  </div>

                  {/* Light Modes */}
                  <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded-xl p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setLightMode('tropical-noon')}
                      className={cn(
                        'px-2.5 py-1.5 rounded-lg transition-colors font-medium',
                        lightMode === 'tropical-noon'
                          ? 'bg-blue-600 text-stone-950 shadow-md shadow-blue-500/20'
                          : 'text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Nắng Trưa 10k
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightMode('sunset-reef')}
                      className={cn(
                        'px-2.5 py-1.5 rounded-lg transition-colors font-medium',
                        lightMode === 'sunset-reef'
                          ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-500/20'
                          : 'text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Hoàng Hôn
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightMode('deep-blue-actinic')}
                      className={cn(
                        'px-2.5 py-1.5 rounded-lg transition-colors font-medium',
                        lightMode === 'deep-blue-actinic'
                          ? 'bg-indigo-600 text-stone-950 shadow-md shadow-indigo-500/20'
                          : 'text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Huỳnh Quang Đêm
                    </button>
                  </div>
                </div>

                {/* Aquarium Viewport Graphic */}
                <div
                  className={cn(
                    'mt-6 relative h-60 sm:h-72 rounded-xl border border-stone-800 overflow-hidden flex flex-col justify-between p-6 transition-all duration-700',
                    lightMode === 'tropical-noon'
                      ? 'bg-gradient-to-b from-cyan-900/60 via-blue-950 to-stone-950'
                      : lightMode === 'sunset-reef'
                      ? 'bg-gradient-to-b from-amber-950/40 via-blue-950 to-stone-950'
                      : 'bg-gradient-to-b from-indigo-950 via-blue-950/80 to-black'
                  )}
                >
                  {/* Fluorescent Coral Bioluminescence effects */}
                  <div className="absolute inset-0 flex items-center justify-around pointer-events-none opacity-60">
                    <span
                      className={cn(
                        'h-32 w-24 rounded-t-full blur-sm transition-all duration-500 animate-pulse',
                        lightMode === 'deep-blue-actinic'
                          ? 'bg-emerald-400/40 shadow-lg shadow-emerald-400/30'
                          : 'bg-emerald-600/20'
                      )}
                    />
                    <span
                      className={cn(
                        'h-40 w-32 rounded-t-full blur-md transition-all duration-500 animate-bounce',
                        lightMode === 'deep-blue-actinic'
                          ? 'bg-purple-500/40 shadow-lg shadow-purple-500/30'
                          : 'bg-purple-700/20'
                      )}
                    />
                    <span
                      className={cn(
                        'h-28 w-20 rounded-t-full blur-sm transition-all duration-500 animate-pulse',
                        lightMode === 'deep-blue-actinic'
                          ? 'bg-amber-400/40 shadow-lg shadow-amber-400/30'
                          : 'bg-amber-600/20'
                      )}
                    />
                  </div>

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-xs font-mono text-cyan-300 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                      Kính Low-Iron 19mm Không Keo Viền · Thấu Quang 99.2%
                    </span>

                    <button
                      type="button"
                      onClick={() => setSkimmerActive(!skimmerActive)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-mono transition-all border',
                        skimmerActive
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-stone-900 text-stone-400 border-stone-700'
                      )}
                    >
                      {skimmerActive ? 'Skimmer DC Tách Bọt: Đang Lọc' : 'Skimmer: Tạm Dừng'}
                    </button>
                  </div>

                  <div className="relative z-10">
                    <span className="text-[11px] text-stone-400 font-mono block">
                      Sinh Vật Rạn Biển Đang Thẩm Định: {activeCoral.name} ({activeCoral.type})
                    </span>
                    <p className="font-serif text-stone-100 text-sm sm:text-base mt-1 max-w-lg leading-relaxed">
                      {activeCoral.fluorescence}
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono pt-3 border-t border-stone-800/80">
                    <span className="text-stone-400">
                      Yêu cầu dòng: <strong className="text-cyan-300">{activeCoral.flowRequirement}</strong>
                    </span>
                    <span className="text-stone-400">
                      Cường độ sáng: <strong className="text-indigo-300">{activeCoral.lightingDemand}</strong>
                    </span>
                  </div>
                </div>

                {/* Coral Variety Selector */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {CORAL_SPECIES.map((coral) => (
                    <button
                      key={coral.id}
                      type="button"
                      onClick={() => setActiveCoralId(coral.id)}
                      className={cn(
                        'p-3 rounded-xl border text-left transition-all',
                        activeCoralId === coral.id
                          ? 'border-blue-500/60 bg-blue-950/40 text-blue-200'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <span className="block text-xs font-medium text-stone-200 truncate">
                        {coral.name.split(' (')[0]}
                      </span>
                      <span className="block text-[10px] font-mono text-cyan-400/80 mt-1">
                        {coral.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Water Chemistry Dashboard & Silence Specs */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Chỉ Số Môi Trường Biển Tự Nhiên
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    San Hô Phát Triển Bền Vững
                  </span>
                </div>

                <div className="my-5 grid grid-cols-2 gap-3.5 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-3.5">
                    <span className="text-stone-400 font-mono block">Độ Mặn Tự Nhiên</span>
                    <div className="mt-1 font-mono text-base font-semibold text-cyan-400">
                      1.025 SG
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">35 ppt chuẩn rạn San hô</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-3.5">
                    <span className="text-stone-400 font-mono block">Canxi Xây Xương</span>
                    <div className="mt-1 font-mono text-base font-semibold text-emerald-400">
                      420 ppm
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Bơm vi lượng Dosing tự động</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-3.5">
                    <span className="text-stone-400 font-mono block">Magie Cân Bằng</span>
                    <div className="mt-1 font-mono text-base font-semibold text-indigo-300">
                      1.350 ppm
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Hấp thụ khoáng chất tối ưu</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-3.5">
                    <span className="text-stone-400 font-mono block">Nhiệt Độ Nước</span>
                    <div className="mt-1 font-mono text-base font-semibold text-amber-300">
                      25.0°C
                    </div>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Chiller Inverter êm dưới 20 dBA</span>
                  </div>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Độ ồn hệ thống máy lọc ngầm:</span>
                    <span className="text-emerald-400 font-mono font-medium">&lt; 19 dBA (Êm đềm)</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Khử mùi tanh hơi muối:</span>
                    <span className="text-cyan-300 font-mono font-medium">Buồng Than Hoạt Tính 100%</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Chu kỳ bổ sung nước ngọt RO:</span>
                    <span className="text-amber-300 font-mono font-medium">Cảm biến mực nước quang học ATO</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Dịch vụ trọn gói:</span>
                <span className="font-mono text-stone-200">GuHomes Marine Biologist Chăm Sóc Định Kỳ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950 p-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span>Mang vẻ đẹp kỳ ảo của rạn san hô rực rỡ vào cuộc sống thượng lưu</span>
          </div>
          <Link
            href="/du-toan-chi-phi"
            className="inline-flex items-center gap-1.5 font-medium text-blue-300 hover:text-blue-200 transition-colors"
          >
            Dự toán bể san hô nano reef nước mặn cho dinh thự
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
