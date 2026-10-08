'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

export function CollectorAutomotiveCleanroomVault({ className }: { className?: string } = {}) {
  const [lightingMode, setLightingMode] = useState<'barrisol-5000k' | 'ambient-warm-2700k'>('barrisol-5000k')
  const [positivePressure, setPositivePressure] = useState<number>(20) // +20 Pa
  const [humidityRH, setHumidityRH] = useState<number>(50) // 50% RH
  const [airPurificationBoost, setAirPurificationBoost] = useState<boolean>(false)

  const togglePurificationBoost = () => {
    setAirPurificationBoost(true)
    setTimeout(() => {
      setAirPurificationBoost(false)
      setPositivePressure(22)
    }, 2000)
  }

  return (
    <section
      aria-label="Hầm Trưng Bày Siêu Xe & Xe Cổ Áp Suất Dương"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background illumination aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 right-1/3 h-96 w-96 rounded-full bg-blue-950/20 blur-[130px]" />
        <div className="absolute -bottom-20 left-1/4 h-96 w-96 rounded-full bg-stone-800/30 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(59,130,246,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/50 px-3.5 py-1 text-xs tracking-widest text-blue-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Bảo Tồn Di Sản Cơ Khí Dinh Thự
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Hầm Trưng Bày Siêu Xe Áp Suất Dương +20 Pa
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Môi trường phòng sạch chuẩn bảo tàng lưu trữ siêu xe và xe cổ biểu tượng. Áp suất dương +20 Pa triệt tiêu 100% bụi mịn PM2.5, 
            kiểm soát độ ẩm tuyệt đối 50% RH chống mốc da Alcantara và trần xuyên sáng Barrisol 5000K không bóng đổ.
          </p>
        </div>

        {/* Interactive Automotive Cleanroom Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Studio Lighting & Car Showcase Simulation */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-blue-400 font-mono font-medium">
                      Chiếu Sáng Studio Không Bóng Đổ
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      Màng Căng Xuyên Sáng Barrisol CRI 98+
                    </h3>
                  </div>

                  {/* Lighting Modes */}
                  <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded-xl p-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setLightingMode('barrisol-5000k')}
                      className={cn(
                        'px-3 py-1.5 rounded-lg transition-colors font-medium',
                        lightingMode === 'barrisol-5000k'
                          ? 'bg-blue-600 text-stone-950 shadow-md shadow-blue-500/20'
                          : 'text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Barrisol Studio 5000K
                    </button>
                    <button
                      type="button"
                      onClick={() => setLightingMode('ambient-warm-2700k')}
                      className={cn(
                        'px-3 py-1.5 rounded-lg transition-colors font-medium',
                        lightingMode === 'ambient-warm-2700k'
                          ? 'bg-amber-600 text-stone-950 shadow-md shadow-amber-500/20'
                          : 'text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Lounge Vàng Ấm 2700K
                    </button>
                  </div>
                </div>

                {/* Cleanroom Bay Simulation Visual */}
                <div
                  className={cn(
                    'mt-6 relative h-56 sm:h-64 rounded-xl border border-stone-800 overflow-hidden flex flex-col justify-between p-6 transition-all duration-700',
                    lightingMode === 'barrisol-5000k'
                      ? 'bg-gradient-to-b from-slate-900 via-stone-950 to-black'
                      : 'bg-gradient-to-b from-stone-900 via-amber-950/20 to-black'
                  )}
                >
                  {/* Overhead Studio Ceiling Softbox Glow */}
                  <div
                    className={cn(
                      'absolute top-0 inset-x-8 h-8 rounded-b-2xl blur-md transition-colors duration-700 opacity-90',
                      lightingMode === 'barrisol-5000k' ? 'bg-cyan-200/50' : 'bg-amber-300/40'
                    )}
                  />

                  {/* Cleanroom Streamline Air Flow (Downflow laminar lines) */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="h-full w-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(59,130,246,0.3)_50%,transparent_100%)] bg-[length:100%_40px] animate-pulse" />
                  </div>

                  {/* Car Silhouette reflection on floor */}
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-[11px] font-mono text-stone-400 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping" />
                      Phòng Sạch Cấp Độ ISO Class 7 · Lọc HEPA H14 99.995%
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-stone-950 px-2 py-0.5 rounded border border-stone-800">
                      Bụi PM2.5 = 0.0 µg/m³
                    </span>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-xs text-stone-400 font-mono block">
                        Độ Phản Chiếu Sơn Ceramic:
                      </span>
                      <span className="font-serif text-stone-100 text-lg sm:text-xl">
                        {lightingMode === 'barrisol-5000k'
                          ? 'Chi Tiết Đường Gân Thân Xe Tuyệt Đối · 0% Vùng Tối Bị Cháy'
                          : 'Hiệu Ứng Sắc Hổ Phách Sang Trọng Lúc Thưởng Rượu Cùng Khách Quý'}
                      </span>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-stone-500 block font-mono">Bề mặt sàn</span>
                      <span className="text-stone-300 font-mono">Epoxy Metallic Polyurethane</span>
                    </div>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Áp Suất Dương</span>
                    <div className="mt-1 font-mono text-lg font-semibold text-blue-400">
                      +{positivePressure} Pa
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Khí đẩy ra ngoài khi mở cửa</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Độ Ẩm Kiểm Soát</span>
                    <div className="mt-1 font-mono text-lg font-semibold text-emerald-400">
                      {humidityRH}% RH
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Chống khô nứt / ẩm mốc da</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Nhiệt Độ Hầm</span>
                    <div className="mt-1 font-mono text-lg font-semibold text-amber-300">
                      22.5°C
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Nhiệt tĩnh quanh năm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Atmospheric Guardian & Chemical Resistance Specs */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Hệ Thống Kiểm Soát Vi Khí Hậu Hầm
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    Trạng Thái Ổn Định
                  </span>
                </div>

                <div className="my-6 space-y-4">
                  <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300 font-medium">Bơm Tuần Hoàn Áp Suất Dương</span>
                      <span className="text-blue-400 font-mono font-medium">Biến tần EC Inverter</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Duy trì luồng gió thổi nhẹ từ trần xuống sàn. Mọi hạt bụi từ lốp xe được hút qua khe thoát âm chân tường.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300 font-medium">Máy Hút Ẩm Rotor Hút Bám Desiccant</span>
                      <span className="text-emerald-400 font-mono font-medium">Chính xác ±2% RH</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Đảm bảo hơi ẩm mùa mưa Sài Gòn (thường xuyên 85-90% RH) không làm oxy hóa các chi tiết kim loại gầm xe.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800/80 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300 font-medium">Sàn Polyurethane Chống Vết Lốp Nóng</span>
                      <span className="text-amber-300 font-mono font-medium">Chuẩn Hàng Không</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Kháng dầu phanh tổng hợp DOT 4, không để lại vết lưu hóa cao su đen khi đưa siêu xe vừa vận hành về vị trí đỗ.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={togglePurificationBoost}
                  disabled={airPurificationBoost}
                  className={cn(
                    'w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 border',
                    airPurificationBoost
                      ? 'bg-blue-600 text-stone-950 border-blue-500 animate-pulse'
                      : 'bg-stone-900 hover:bg-stone-800 text-stone-200 border-stone-700'
                  )}
                >
                  {airPurificationBoost ? 'Đang Tăng Áp & Xả Khí Sạch HEPA...' : 'Kích Hoạt Chu Trình Làm Sạch Tăng Cường'}
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Quy mô module trưng bày:</span>
                <span className="text-stone-200 font-mono">2 xe đến 8 xe độc bản</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Detail Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
            <h4 className="font-serif text-base text-stone-100">Bảo Vệ Da Ghế Tự Nhiên</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Nhiệt độ 22.5°C và độ ẩm 50% RH ngăn chặn triệt để tình trạng bong tróc, ẩm mốc trên bề mặt da Semi-Aniline của xe cổ nguyên bản.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
            <h4 className="font-serif text-base text-stone-100">Cổng Sạc DC Tích Hợp Trickle Charger</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Hệ thống cấp điện âm sàn sạc bảo dưỡng ắc-quy tự động (Battery Tender), luôn sẵn sàng lăn bánh mà không lo chai pin hay sụt nguồn.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
            <h4 className="font-serif text-base text-stone-100">Kính Quan Sát Cường Lực Từ Phòng Khách</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Kết nối tầm nhìn với phòng khách hoặc cigar lounge qua vách kính Low-E nhiều lớp cách âm tuyệt đối dưới 24 dBA.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950 p-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            <span>Tư vấn giải pháp hầm siêu xe áp suất dương cho biệt thự & penthouse</span>
          </div>
          <Link
            href="/du-toan-chi-phi"
            className="inline-flex items-center gap-1.5 font-medium text-blue-300 hover:text-blue-200 transition-colors"
          >
            Tính toán chi phí hầm trưng bày siêu xe trong dự toán
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
