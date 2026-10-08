'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type TidePhase = 'rising' | 'high-tide' | 'falling' | 'low-tide'
type LightingSpectrum = 'dawn' | 'noon-full' | 'dusk' | 'moonlight'

interface MangroveFlora {
  id: string
  name: string
  scientificName: string
  habitat: string
  adaptation: string
  rootArchitecture: string
}

const MANGROVE_FLORA: MangroveFlora[] = [
  {
    id: 'duoc-doi',
    name: 'Cây Đước Đôi Cần Giờ',
    scientificName: 'Rhizophora apiculata',
    habitat: 'Vùng bãi bồi ven cửa biển và giếng trời giáp sông',
    adaptation: 'Cơ chế lọc bài tiết muối qua lá già, rễ thở chống ngạt trong đất ngập nước triều.',
    rootArchitecture: 'Bộ rễ chống hình vòng cung vươn ra như chiếc nơm khổng lồ, tạo cảnh quan điêu khắc sống động.',
  },
  {
    id: 'cay-ban',
    name: 'Cây Bần Chua Tự Nhiên',
    scientificName: 'Sonneratia caseolaris',
    habitat: 'Ven sông nước lợ dòng chảy êm ả',
    adaptation: 'Hoa trắng nở về đêm hương thơm dịu nhẹ, quả chua giòn đặc sản miệt vườn phương Nam.',
    rootArchitecture: 'Rễ thở mọc ngược đâm thẳng lên khỏi mặt bùn như những chông nhọn tự nhiên.',
  },
  {
    id: 'dua-nuoc',
    name: 'Dừa Nước Miệt Vườn',
    scientificName: 'Nypa fruticans',
    habitat: 'Bờ rạch nước lợ phù sa',
    adaptation: 'Tàu lá xanh ngắt xòe rộng cản gió, tạo bóng râm mát lành và lọc sạch kim loại nặng trong nước.',
    rootArchitecture: 'Thân ngầm bò lan dưới lớp đất bùn khoáng, rễ chùm giữ bờ chống xói lở tuyệt đối.',
  },
]

export function SaigonMangroveBoutiqueEcologyLab({ className }: { className?: string } = {}) {
  const [tidePhase, setTidePhase] = useState<TidePhase>('high-tide')
  const [lighting, setLighting] = useState<LightingSpectrum>('noon-full')
  const [activeFloraId, setActiveFloraId] = useState<string>('duoc-doi')
  const [atriumHeight, setAtriumHeight] = useState<number>(7.5) // 4.5m to 12m
  const [waterSurfaceArea, setWaterSurfaceArea] = useState<string>('15 - 25 m²')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)

  const vipPasscode = 'GU-MANGROVE-2026-X'
  const activeFlora = MANGROVE_FLORA.find((f) => f.id === activeFloraId) ?? MANGROVE_FLORA[0]!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone.trim()) return
    setSubmitted(true)
  }

  return (
    <section
      aria-label="Tiểu Cảnh Sinh Thái Rừng Ngập Mặn Cần Giờ Trong Giếng Trời"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient natural green-teal lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 h-96 w-96 rounded-full bg-emerald-950/30 blur-[140px]" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-teal-950/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs tracking-widest text-emerald-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Sinh Thái Bản Địa Sài Gòn
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Tiểu Cảnh Rừng Ngập Mặn Cần Giờ &amp; Giếng Trời Tự Nhiên
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Hồn thiên nhiên nguyên sơ Cần Giờ ngưng đọng giữa giếng trời dinh thự. 
            Hệ sinh thái nước lợ nuôi dưỡng cây bần, đước đôi và dừa nước, hệ thống tuần hoàn mô phỏng chu kỳ nhật triều 
            sông Sài Gòn lên xuống 6 giờ/lần, màng sinh học cát thạch anh lọc nước trong vắt và dải đèn full-spectrum 4500K quang hợp 24/7.
          </p>
        </div>

        {/* Interactive Ecology Lab Console */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Tide Simulator & Ecosystem Water Matrix */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-medium">
                      Nhịp Triều Cường Sông Sài Gòn Bán Nhật Triều
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {tidePhase === 'rising' && 'Giai Đoạn: Triều Đang Lên (+1.2m)'}
                      {tidePhase === 'high-tide' && 'Giai Đoạn: Đỉnh Triều Cường (+1.65m Ngập Rễ Đước)'}
                      {tidePhase === 'falling' && 'Giai Đoạn: Triều Rút Nhanh (-0.8m)'}
                      {tidePhase === 'low-tide' && 'Giai Đoạn: Chân Triều Cạn (Lộ Rễ Thở & Cát Thạch Anh)'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">Độ mặn: 12 ppt</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">pH 7.4</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">DO: 6.5 mg/L</span>
                  </div>
                </div>

                {/* Tide & Mangrove Visual Tank */}
                <div className={cn(
                  'relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-xl border transition-all duration-700 p-5 flex flex-col justify-between',
                  lighting === 'dawn' && 'border-amber-900/60 bg-gradient-to-b from-amber-950/40 via-stone-900 to-black',
                  lighting === 'noon-full' && 'border-emerald-800/60 bg-gradient-to-b from-emerald-950/30 via-stone-900 to-black',
                  lighting === 'dusk' && 'border-rose-900/60 bg-gradient-to-b from-rose-950/30 via-stone-900 to-black',
                  lighting === 'moonlight' && 'border-indigo-900/60 bg-gradient-to-b from-indigo-950/40 via-stone-950 to-black'
                )}>
                  {/* Top info badge inside simulation */}
                  <div className="flex items-center justify-between z-10 text-xs">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-800 px-2.5 py-1 text-emerald-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Quang Phổ: {lighting === 'dawn' ? 'Bình Minh 3000K' : lighting === 'noon-full' ? 'Trưa Nắng Nhiệt Đới 4500K' : lighting === 'dusk' ? 'Hoàng Hôn 2700K' : 'Ánh Trăng Đêm 6500K'}
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Bơm Tuần Hoàn Đối Lưu Chu Kỳ 6h
                    </span>
                  </div>

                  {/* Stylized Mangrove Root & Water Level Dynamic Graphics */}
                  <div className="relative my-auto flex flex-col items-center justify-end z-10 h-36">
                    {/* Simulated Mangrove Trunk and Roots SVG */}
                    <svg viewBox="0 0 240 100" className="w-full max-w-sm h-32">
                      {/* Tree Canopy */}
                      <path d="M 80,25 C 80,10 160,10 160,25 C 180,25 180,45 150,45 C 130,45 110,45 90,45 C 60,45 60,25 80,25 Z" fill="#047857" opacity="0.85" />
                      {/* Trunk */}
                      <rect x="115" y="35" width="10" height="25" fill="#451a03" />
                      {/* Stilt Roots (Rễ Cọc & Rễ Chống) */}
                      <path d="M 115,55 Q 90,75 75,95" stroke="#78350f" strokeWidth="3" fill="none" />
                      <path d="M 125,55 Q 150,75 165,95" stroke="#78350f" strokeWidth="3" fill="none" />
                      <path d="M 118,58 Q 105,75 100,95" stroke="#78350f" strokeWidth="2.5" fill="none" />
                      <path d="M 122,58 Q 135,75 140,95" stroke="#78350f" strokeWidth="2.5" fill="none" />

                      {/* Water Level Rectangle according to Tide */}
                      <rect
                        x="10"
                        y={tidePhase === 'high-tide' ? 62 : tidePhase === 'rising' ? 74 : tidePhase === 'falling' ? 82 : 90}
                        width="220"
                        height={tidePhase === 'high-tide' ? 36 : tidePhase === 'rising' ? 24 : tidePhase === 'falling' ? 16 : 8}
                        fill="#06b6d4"
                        opacity="0.35"
                        className="transition-all duration-700"
                      />
                      {/* Water Surface Wave Line */}
                      <path
                        d={
                          tidePhase === 'high-tide'
                            ? "M 10,62 Q 65,59 120,62 T 230,62"
                            : tidePhase === 'rising'
                            ? "M 10,74 Q 65,71 120,74 T 230,74"
                            : tidePhase === 'falling'
                            ? "M 10,82 Q 65,79 120,82 T 230,82"
                            : "M 10,90 Q 65,88 120,90 T 230,90"
                        }
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        fill="none"
                        className="transition-all duration-700"
                      />
                    </svg>
                  </div>

                  {/* Bottom bar of simulation */}
                  <div className="flex items-center justify-between z-10 text-[11px] font-mono text-stone-400">
                    <span>Lớp bùn khoáng vi sinh &amp; cát thạch anh tự nhiên</span>
                    <span className="text-emerald-400">Nhiệt độ nước: 26.5°C</span>
                  </div>
                </div>

                {/* Tide Phase Selector Pills */}
                <div className="mt-5">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Điều Khiển Chu Trình Thủy Triều:
                  </span>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    <button
                      onClick={() => setTidePhase('rising')}
                      className={cn(
                        'rounded-xl border p-2 text-center text-xs transition-all',
                        tidePhase === 'rising'
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      Triều Lên (+1.2m)
                    </button>
                    <button
                      onClick={() => setTidePhase('high-tide')}
                      className={cn(
                        'rounded-xl border p-2 text-center text-xs transition-all',
                        tidePhase === 'high-tide'
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      Đỉnh Triều (+1.65m)
                    </button>
                    <button
                      onClick={() => setTidePhase('falling')}
                      className={cn(
                        'rounded-xl border p-2 text-center text-xs transition-all',
                        tidePhase === 'falling'
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      Triều Rút (-0.8m)
                    </button>
                    <button
                      onClick={() => setTidePhase('low-tide')}
                      className={cn(
                        'rounded-xl border p-2 text-center text-xs transition-all',
                        tidePhase === 'low-tide'
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-semibold'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      Chân Triều Cạn
                    </button>
                  </div>
                </div>

                {/* Lighting Spectrum Selector */}
                <div className="mt-4">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Chu Kỳ Ánh Sáng Full-Spectrum 4500K:
                  </span>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {(['dawn', 'noon-full', 'dusk', 'moonlight'] as LightingSpectrum[]).map((sp) => (
                      <button
                        key={sp}
                        onClick={() => setLighting(sp)}
                        className={cn(
                          'rounded-lg border py-1.5 text-center text-xs font-mono transition-all',
                          lighting === sp
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300 font-semibold'
                            : 'border-stone-800 bg-stone-900 text-stone-400 hover:border-stone-700'
                        )}
                      >
                        {sp === 'dawn' ? 'Bình Minh' : sp === 'noon-full' ? 'Nắng Trưa' : sp === 'dusk' ? 'Hoàng Hôn' : 'Ánh Trăng'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Flora Detail Box */}
              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <div className="rounded-xl border border-stone-800 bg-stone-900/50 p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-100">{activeFlora.name}</span>
                    <span className="font-mono text-emerald-400 italic">{activeFlora.scientificName}</span>
                  </div>
                  <div className="mt-1 text-xs text-stone-300 font-light leading-relaxed">
                    <span className="text-emerald-300">Đặc tính rễ: </span>
                    {activeFlora.rootArchitecture}
                  </div>
                  <div className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                    {activeFlora.adaptation}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Flora Selector & Atrium Planning Form */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-medium">
                  Hệ Thực Vật Rừng Ngập Mặn Bản Địa
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Chọn loài cây sinh thái chủ đạo cho giếng trời:
                </p>

                {/* 3 Flora Buttons */}
                <div className="mt-3 space-y-2">
                  {MANGROVE_FLORA.map((flora) => {
                    const isSelected = activeFloraId === flora.id
                    return (
                      <button
                        key={flora.id}
                        onClick={() => setActiveFloraId(flora.id)}
                        className={cn(
                          'w-full flex items-center justify-between rounded-xl border p-3 text-left transition-all',
                          isSelected
                            ? 'border-emerald-500/80 bg-emerald-500/10 text-stone-100 shadow-sm'
                            : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        <div>
                          <div className="text-xs font-semibold text-stone-200">{flora.name}</div>
                          <div className="text-[10px] text-stone-400 italic">{flora.scientificName}</div>
                        </div>
                        <span className="text-[10px] font-mono rounded bg-stone-900 px-2 py-0.5 text-emerald-300">
                          {flora.id === 'duoc-doi' ? 'Rễ Chống' : flora.id === 'cay-ban' ? 'Rễ Thở' : 'Thân Ngầm'}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Atrium Planning Form */}
                {submitted ? (
                  <div className="mt-5 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-center">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
                      ✓
                    </div>
                    <h4 className="mt-2 text-sm font-serif text-emerald-200">
                      Đã Ghi Nhận Hồ Sơ Sinh Thái Giếng Trời
                    </h4>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Chuyên gia sinh thái cảnh quan GuHomes sẽ khảo sát hướng gió sông và tính toán hệ lọc sinh học cho dinh thự:
                    </p>
                    <div className="mt-2.5 inline-block rounded bg-stone-900 border border-emerald-500/40 px-3 py-1 font-mono text-xs text-emerald-300 font-semibold tracking-wider">
                      MÃ THIẾT KẾ: {vipPasscode}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                    <div className="text-xs font-medium text-stone-300">
                      Đăng Ký Tư Vấn Giếng Trời Sinh Thái Ngập Mặn:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label htmlFor="mangrove-atrium-height" className="text-[10px] text-stone-400 uppercase font-mono block">
                          Chiều Cao Thông Tầng: <span className="text-emerald-400 font-bold">{atriumHeight}m</span>
                        </label>
                        <input
                          id="mangrove-atrium-height"
                          type="range"
                          min={4.5}
                          max={12}
                          step={0.5}
                          value={atriumHeight}
                          onChange={(e) => setAtriumHeight(Number(e.target.value))}
                          className="mt-2 h-1.5 w-full appearance-none rounded-lg bg-stone-800 accent-emerald-500 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-400 uppercase font-mono block">
                          Diện Tích Mặt Nước
                        </label>
                        <select
                          value={waterSurfaceArea}
                          onChange={(e) => setWaterSurfaceArea(e.target.value)}
                          className="mt-1 w-full rounded-lg border border-stone-800 bg-stone-950 px-2.5 py-1.5 text-xs text-stone-100 focus:border-emerald-500 focus:outline-none"
                        >
                          <option value="8 - 15 m²">8 - 15 m² (Cỡ vừa)</option>
                          <option value="15 - 25 m²">15 - 25 m² (Tiêu chuẩn)</option>
                          <option value="25 - 50 m²">25 - 50 m² (Đại sảnh)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-stone-400 uppercase font-mono block">
                        Số Điện Thoại Khảo Sát Hiện Trạng
                      </label>
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        required
                        className="mt-1 w-full rounded-lg border border-stone-800 bg-stone-950 px-2.5 py-1.5 text-xs text-stone-100 placeholder-stone-600 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-mono text-[10px] text-emerald-400/90">
                        Đặc Quyền: {vipPasscode}
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-xs font-medium text-stone-950 hover:bg-emerald-400 transition-colors shadow-sm"
                      >
                        <span>Nhận Bản Phác Thảo 3D</span>
                        <ArrowUpRightIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Biological Sand Filter Note */}
              <div className="mt-5 rounded-xl border border-stone-800 bg-stone-950/60 p-3.5 text-[11px] text-stone-400 font-light leading-relaxed">
                ✓ Màng lọc sinh học cát thạch anh và than hoạt tính vi xốp hấp thụ triệt để mùi bùn ngập mặn; nước luân chuyển trong vắt, mang lại luồng sinh khí mát lành tinh khiết cho ngôi nhà.
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Features */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-300">
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-emerald-400">01 / NHẬT TRIỀU TỰ NHIÊN</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Bơm Đối Lưu Chu Kỳ 6 Giờ</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Mực nước dâng hạ nhịp nhàng như nhịp thở của dòng sông Sài Gòn, kích thích bộ rễ đước hấp thu oxy và thải muối, bảo tồn hệ sinh vật đáy hoàn hảo.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-emerald-400">02 / ĐIỀU HÒA VI KHÍ HẬU</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Hạ Nhiệt Tự Nhiên 2 - 3.5°C</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Hơi nước đối lưu bốc lên từ lòng giếng trời cuốn theo luồng gió tươi mát len lỏi vào các phòng sinh hoạt, giảm 40% công suất điều hòa nhiệt độ mùa nắng nóng.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <div className="font-mono text-xs text-emerald-400">03 / LIỆU PHÁP THỊ GIÁC NGUYÊN BẢN</div>
            <h4 className="mt-2 font-serif text-base text-stone-100">Vẻ Đẹp Điêu Khắc Rễ Cây</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Bộ rễ đước uốn lượn kỳ vĩ như tác phẩm điêu khắc sống động, ngắm nhìn cá bống thò lò nhảy múa trên bãi cát mang lại cảm giác bình yên thư thái tuyệt vời.
            </p>
          </div>
        </div>

        {/* Studio visit link */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Xem hồ giếng trời sinh thái ngập mặn mẫu tại{' '}
            <span className="font-medium text-stone-200">GuHomes Biophilic Studio (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
            >
              <span>Đặt lịch tham quan hồ sinh thái</span>
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
