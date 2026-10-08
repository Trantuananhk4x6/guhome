'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type LightingScene = 'gala' | 'dinner' | 'candlelight'

export function ArtisanBaccaratCrystalChandelierAtelier({ className }: { className?: string } = {}) {
  const [scene, setScene] = useState<LightingScene>('dinner')
  const [chandelierElevation, setChandelierElevation] = useState<number>(7.2) // 1.5m (cleaning) to 7.2m (standard ceiling)
  const [isWinchMoving, setIsWinchMoving] = useState<boolean>(false)

  const handleToggleWinchPosition = () => {
    setIsWinchMoving(true)
    if (chandelierElevation > 3) {
      // Lower for maintenance
      setChandelierElevation(1.5)
    } else {
      // Raise to normal height
      setChandelierElevation(7.2)
    }
    setTimeout(() => {
      setIsWinchMoving(false)
    }, 1800)
  }

  // Calculate lumen and lux
  const brightnessPercent = scene === 'gala' ? 100 : scene === 'dinner' ? 40 : 15
  const currentKelvin = scene === 'gala' ? 2700 : scene === 'dinner' ? 2200 : 1800
  const calculatedLumens = Math.round((18000 * brightnessPercent) / 100)
  const calculatedLux = Math.round((350 * brightnessPercent) / 100)

  return (
    <section
      aria-label="Kiệt Tác Đèn Chùm Pha Lê Thông Tầng Tự Động"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient refraction lighting */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/3 h-96 w-96 rounded-full bg-amber-500/10 blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-yellow-600/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Kiệt Tác Điêu Khắc Ánh Sáng
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Đèn Chùm Pha Lê Thông Tầng &amp; Cơ Cấu Tời Điện Âm Trần
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Vũ điệu ánh sáng tinh khiết thả từ giếng trời 7.2 mét. 1.200 viên pha lê quang học cắt giác kim cương 
            khúc xạ cầu vồng bảy sắc, khung titan siêu nhẹ kháng rung lắc, hệ tời điện âm trần nâng hạ an toàn 
            và nguồn sáng Warm Dimming 1800K - 2700K êm ái bảo vệ thị giác gia chủ.
          </p>
        </div>

        {/* Interactive Chandelier Console */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Chandelier Elevation & Light Scene Simulation */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Cao Độ Treo: {chandelierElevation.toFixed(1)}m / 7.2m
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {scene === 'gala' && 'Kịch Bản: Dạ Tiệc Gala Hoàng Kim (2700K • 100%)'}
                      {scene === 'dinner' && 'Kịch Bản: Tiệc Tối Tĩnh Lặng (2200K • 40%)'}
                      {scene === 'candlelight' && 'Kịch Bản: Ánh Nến Lung Linh (1800K • 15%)'}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-900/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-amber-400">{calculatedLumens} lm</span>
                    <span>|</span>
                    <span className="font-mono text-emerald-400">{calculatedLux} Lux</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">CRI 98</span>
                  </div>
                </div>

                {/* 3D Chandelier Simulation Box */}
                <div className="relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-black p-5 flex flex-col justify-between">
                  {/* Top badges */}
                  <div className="flex items-center justify-between z-10 text-xs">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-800 px-2.5 py-1 text-amber-300 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                      1.200 Viên Pha Lê Cắt Giác Kim Cương Khúc Xạ 7 Màu
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Khung Hợp Kim Titan Siêu Bền Nhẹ
                    </span>
                  </div>

                  {/* Chandelier & Cable Elevation Graphic */}
                  <div className="relative my-auto flex flex-col items-center justify-start z-10 h-40">
                    {/* Ceiling Winch Mount */}
                    <div className="w-16 h-3 rounded-b-md bg-stone-700 border-x border-b border-stone-500 flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" title="Cảm biến tải an toàn" />
                    </div>

                    {/* Suspension Cable (Length depends on elevation) */}
                    <div
                      style={{
                        height: chandelierElevation > 3 ? '25px' : '65px',
                        transition: 'height 1.2s ease-in-out',
                      }}
                      className="w-[2px] bg-stone-400"
                    />

                    {/* Chandelier Body Graphic */}
                    <div
                      style={{
                        boxShadow: `0 0 ${brightnessPercent * 0.6}px rgba(245, 158, 11, ${brightnessPercent * 0.007})`,
                        transition: 'all 0.6s ease-out',
                      }}
                      className={cn(
                        'relative rounded-full border-2 flex flex-col items-center justify-center p-3 transition-all',
                        scene === 'gala' && 'border-amber-400 bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600',
                        scene === 'dinner' && 'border-amber-500/80 bg-gradient-to-b from-amber-300/80 via-amber-500/70 to-amber-700/80',
                        scene === 'candlelight' && 'border-amber-600/60 bg-gradient-to-b from-amber-400/50 via-amber-600/40 to-amber-800/50'
                      )}
                    >
                      {/* Crystal Drops Cascading */}
                      <div className="flex items-center gap-1.5">
                        <span className="h-4 w-1.5 rounded-full bg-white/90 shadow-sm" />
                        <span className="h-6 w-2 rounded-full bg-white shadow-md animate-pulse" />
                        <span className="h-8 w-2.5 rounded-full bg-white shadow-lg" />
                        <span className="h-6 w-2 rounded-full bg-white shadow-md animate-pulse" />
                        <span className="h-4 w-1.5 rounded-full bg-white/90 shadow-sm" />
                      </div>
                    </div>
                  </div>

                  {/* Feedback bar */}
                  <div className="flex items-center justify-between z-10 text-xs text-stone-400 font-mono">
                    <span>
                      {chandelierElevation > 3
                        ? 'Vị trí treo thông tầng: 7.2m (Tối ưu góc tỏa sáng)'
                        : 'Vị trí hạ bảo trì: 1.5m (Vệ sinh pha lê an toàn không cần giàn giáo)'}
                    </span>
                    {isWinchMoving && (
                      <span className="text-amber-400 font-medium animate-pulse">
                        ⚙ Tời điện đang vận hành êm ái...
                      </span>
                    )}
                  </div>
                </div>

                {/* Lighting Scene Selector Pills */}
                <div className="mt-5">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-mono">
                    Chọn Kịch Bản Chiếu Sáng Warm Dimming:
                  </span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setScene('gala')}
                      className={cn(
                        'rounded-xl border p-2.5 text-left transition-all',
                        scene === 'gala'
                          ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">Dạ Tiệc Gala (100%)</div>
                      <div className="mt-0.5 text-[10px] text-amber-400">2700K • Rực rỡ tráng lệ</div>
                    </button>
                    <button
                      onClick={() => setScene('dinner')}
                      className={cn(
                        'rounded-xl border p-2.5 text-left transition-all',
                        scene === 'dinner'
                          ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">Tiệc Tối Tĩnh Lặng (40%)</div>
                      <div className="mt-0.5 text-[10px] text-amber-400">2200K • Ấm cúng sum vầy</div>
                    </button>
                    <button
                      onClick={() => setScene('candlelight')}
                      className={cn(
                        'rounded-xl border p-2.5 text-left transition-all',
                        scene === 'candlelight'
                          ? 'border-amber-500/80 bg-amber-500/10 text-stone-100 shadow-sm'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <div className="text-xs font-medium text-stone-200">Ánh Nến Tự Nhiên (15%)</div>
                      <div className="mt-0.5 text-[10px] text-amber-400">1800K • Thư thái lãng mạn</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Electric Winch Control Button */}
              <div className="mt-6 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleToggleWinchPosition}
                  className="inline-flex items-center gap-2 rounded-lg border border-amber-500/40 bg-amber-500/20 px-4 py-2.5 text-xs font-medium text-amber-300 hover:bg-amber-500/30 transition-colors shadow-sm"
                >
                  <span>{chandelierElevation > 3 ? 'Kích Hoạt Hạ Đèn Xuống 1.5m Vệ Sinh' : 'Kích Hoạt Nâng Đèn Lên 7.2m Vị Trí Treo'}</span>
                  <span className="rounded bg-stone-950 px-1.5 py-0.5 font-mono text-[10px] text-amber-400">
                    Mabuchi Motor
                  </span>
                </button>

                <div className="text-xs font-mono text-stone-400">
                  Cảm biến chống đứt cáp kép chuẩn an toàn CE Thụy Sĩ
                </div>
              </div>
            </div>

            {/* Right 5 cols: Technical Specs & Optical Physics */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                  Hồ Sơ Kỹ Thuật Quang Học &amp; Kết Cấu
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Đỉnh cao chế tác pha lê thủ công châu Âu:
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      01 / Pha Lê Quang Học Hàm Lượng Chì 30% PbO
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Độ tán sắc ánh sáng cực đại; mỗi giọt pha lê được mài vát kim cương thủ công 58 mặt giác, 
                      biến chùm sáng LED thành hàng nghìn dải quang phổ bảy sắc cầu vồng rực rỡ.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      02 / Khung Titan Cấp Hàng Không Siêu Nhẹ
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Giảm 60% trọng lượng so với khung đồng cổ điển nhưng độ bền kéo gấp 3 lần, 
                      hoàn toàn không bị oxy hóa bởi vi khí hậu nồm ẩm mùa mưa Sài Gòn.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      03 / Tời Điện Âm Trần Bảo Dưỡng Một Chạm
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Động cơ tời cáp đôi tải trọng 500kg tích hợp phanh cơ điện khẩn cấp, 
                      giúp gia chủ hoặc quản gia dễ dàng hạ đèn xuống lau bụi định kỳ chỉ sau một nút bấm trên smartphone.
                    </p>
                  </div>
                </div>

                {/* Warm Dimming Info */}
                <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-3.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Chỉ Số Hoàn Màu Tuyệt Đối CRI 98 (R9 &gt; 95)
                  </div>
                  <p className="mt-1 text-[11px] text-stone-300 font-light leading-relaxed">
                    Tôn vinh trọn vẹn màu sắc chân thực của tranh nghệ thuật, phiến đá cẩm thạch và trang phục dạ hội của các vị khách quý.
                  </p>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-light">
                    Tính toán quang thông theo thể tích thông tầng:
                  </span>
                  <Link
                    href="/du-toan-chi-phi"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                  >
                    <span>Dự toán ánh sáng</span>
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
            Xem mẫu pha lê cắt giác và hệ tời nâng hạ thực tế tại{' '}
            <span className="font-medium text-stone-200">GuHomes Lighting Lab (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Đặt lịch tư vấn chiếu sáng</span>
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
