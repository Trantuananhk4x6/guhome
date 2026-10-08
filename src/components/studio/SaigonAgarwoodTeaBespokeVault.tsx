'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface TeaWaterPreset {
  temp: number
  teaName: string
  origin: string
  tasteNotes: string
  aromaRelease: string
}

const TEA_PRESETS: TeaWaterPreset[] = [
  {
    temp: 80,
    teaName: 'Lục Trà Đinh Tân Cương',
    origin: 'Thái Nguyên, Việt Nam',
    tasteNotes: 'Chát dịu thanh tao, hậu ngọt sâu ngập tràn cuống họng.',
    aromaRelease: 'Hương cốm non tinh khiết, nước trà sánh trong màu cốm ngọc.',
  },
  {
    temp: 85,
    teaName: 'Bạch Trà Mầm Mộc Châu',
    origin: 'Sơn La, Việt Nam',
    tasteNotes: 'Ngọt thanh như mật ong rừng, hoàn toàn không đắng chát.',
    aromaRelease: 'Hương hoa rừng hoang dã, giữ trọn vẹn lớp lông tơ bạc quý giá.',
  },
  {
    temp: 90,
    teaName: 'Ô Long Tứ Quý Cao Sơn',
    origin: 'Cầu Đất, Đà Lạt',
    tasteNotes: 'Vị béo ngậy mượt mà, lưu hương hoa mộc miên dài lâu.',
    aromaRelease: 'Búp trà cuộn tròn mở bung chậm rãi, ngào ngạt hương hoa quả chín.',
  },
  {
    temp: 95,
    teaName: 'Shan Tuyết Cổ Thụ 300 Năm',
    origin: 'Tây Côn Lĩnh, Hà Giang',
    tasteNotes: 'Đậm đà khoáng chất đỉnh núi cao, nội lực trà mạnh mẽ đánh thức tâm trí.',
    aromaRelease: 'Hòa quyện khói mộc và sương mù đỉnh đèo 2.000m, cực kỳ hợp khí trầm.',
  },
  {
    temp: 100,
    teaName: 'Phổ Nhĩ Chín Rừng Già',
    origin: 'Vân Nam - Thượng Nguồn Sông Mê Kông',
    tasteNotes: 'Nồng ấm, hậu vị đầm sâu như gỗ mục nghìn năm sau mưa.',
    aromaRelease: 'Sắc nước đỏ nâu ruby sánh đậm, khử hàn tích ôn cho cơ thể vào đêm lạnh.',
  },
]

export function SaigonAgarwoodTeaBespokeVault({ className }: { className?: string } = {}) {
  const [selectedTemp, setSelectedTemp] = useState<number>(95)
  const [agarwoodWarmthActive, setAgarwoodWarmthActive] = useState<boolean>(true)

  const activePreset = TEA_PRESETS.find((p) => p.temp === selectedTemp) ?? TEA_PRESETS[3]!

  return (
    <section
      aria-label="Bàn Trà Nghệ Nhân Trầm Hương Khánh Hòa & Gỗ Mun Sừng"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background warm resin aroma glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/3 h-96 w-96 rounded-full bg-amber-700/10 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-stone-800/30 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(180,120,60,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Tuyệt Phẩm Thưởng Trà Di Sản
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bàn Trà Trầm Hương Tự Nhiên & Gỗ Mun Sừng
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Sự kết hợp giữa phiến lũa Trầm Hương Khánh Hòa ngậm dầu tự nhiên và gỗ Mun Sừng đen nhánh. 
            Mặt khay trà đá Nero Marquina hạ âm phẳng mịn, tích hợp bếp vi gốm điều chỉnh nhiệt độ chính xác theo từng danh trà cổ thụ.
          </p>
        </div>

        {/* Interactive Tea Table Console */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Tea Temperature Induction Controller */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Bếp Vi Gốm Âm Bàn Cảm Ứng Đa Điểm
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      Nhiệt Độ Nước Pha Trà: {selectedTemp}°C
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs font-mono text-amber-300">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                    Đá Nero Marquina Chống Sốc Nhiệt 400°C
                  </div>
                </div>

                {/* 5 Temperature Buttons */}
                <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3">
                  {TEA_PRESETS.map((p) => (
                    <button
                      key={p.temp}
                      type="button"
                      onClick={() => setSelectedTemp(p.temp)}
                      className={cn(
                        'p-2.5 sm:p-3 rounded-xl border text-center transition-all',
                        selectedTemp === p.temp
                          ? 'border-amber-500/60 bg-amber-950/50 text-amber-200 ring-1 ring-amber-500/40'
                          : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                      )}
                    >
                      <span className="block font-mono text-base sm:text-lg font-bold">
                        {p.temp}°C
                      </span>
                      <span className="block text-[10px] text-stone-400 truncate mt-0.5">
                        {p.teaName.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Tea Profile Visual Display */}
                <div className="mt-6 relative h-56 sm:h-64 rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-black overflow-hidden flex flex-col justify-between p-6">
                  {/* Subtle agarwood smoke vapor rising */}
                  {agarwoodWarmthActive && (
                    <div className="absolute inset-0 flex justify-center pointer-events-none opacity-30">
                      <span className="w-16 h-full bg-gradient-to-t from-transparent via-amber-200/20 to-transparent blur-xl animate-pulse" />
                      <span className="w-20 h-full bg-gradient-to-t from-transparent via-amber-100/15 to-transparent blur-2xl transform translate-x-6" />
                    </div>
                  )}

                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono text-amber-300 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-800">
                        {activePreset.teaName} · {activePreset.origin}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setAgarwoodWarmthActive(!agarwoodWarmthActive)}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-mono transition-all border',
                        agarwoodWarmthActive
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : 'bg-stone-900 text-stone-400 border-stone-700'
                      )}
                    >
                      {agarwoodWarmthActive ? 'Khí Trầm Khánh Hòa: Thoang Thoảng' : 'Tạm Tắt Sưởi Trầm'}
                    </button>
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs text-stone-400 font-mono block">Hương Vị Trà Đạo:</span>
                    <p className="font-serif text-stone-100 text-sm sm:text-base mt-1 leading-relaxed">
                      {activePreset.tasteNotes}
                    </p>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-stone-800/80 text-xs font-mono text-stone-400 flex items-center justify-between">
                    <span>Đặc trưng hương: {activePreset.aromaRelease}</span>
                    <span className="text-amber-300 font-medium">Bơm Nước Âm Bàn Tự Động</span>
                  </div>
                </div>

                {/* 3 Material Characteristics */}
                <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Trầm Hương Tự Nhiên</span>
                    <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-amber-300">
                      Rừng Khánh Hòa
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Tích tụ nhựa thơm &gt; 40 năm</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Gỗ Mun Sừng Quý</span>
                    <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-stone-200">
                      Đen Nhánh Như Ngọc
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Độ cứng nặng chìm nước</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Khay Thoát Nước</span>
                    <div className="mt-1 font-mono text-sm sm:text-base font-semibold text-emerald-400">
                      Nero Marquina
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Rãnh dốc 1.5° thoát tĩnh</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Craftsmanship Details & Tea Sommelier Specs */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Kỹ Nghệ Chế Tác Mộc Thủ Công
                  </span>
                  <span className="text-xs font-mono text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                    Bespoke GuHomes
                  </span>
                </div>

                <div className="my-5 space-y-3.5 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Cơ chế kích nhiệt Trầm Hương:</span>
                      <span className="text-amber-300 font-mono font-medium">Bản nhiệt vi mô 42°C</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Lõi sưởi ấm nhẹ giúp tinh dầu trầm trong thớ gỗ giải phóng mùi hương dịu dàng mà không làm cháy sém phôi trầm.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Mộng gỗ âm dương mộc mạc:</span>
                      <span className="text-emerald-400 font-mono font-medium">100% Không Dùng Đinh</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Khớp nối mộng đuôi én (Dovetail) truyền thống cho phép gỗ co ngót tự nhiên theo độ ẩm mùa mưa - mùa khô Sài Gòn.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Hệ thống cấp & thoát nước ngầm:</span>
                      <span className="text-cyan-300 font-mono font-medium">Ống mềm Inox 316</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Giấu kín bên trong chân bàn gỗ mun, kết nối trực tiếp với bình nước lọc ngầm hoặc hệ thống lọc nước trung tâm.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Kích thước chế tác:</span>
                <span className="font-mono text-stone-200">2.400mm x 950mm x 680mm</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950 p-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>Không gian trà đạo thiền định tiếp đón những người bạn tâm giao</span>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 font-medium text-amber-300 hover:text-amber-200 transition-colors"
          >
            Đăng ký chế tác bàn trà trầm hương độc bản theo thế gỗ
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
