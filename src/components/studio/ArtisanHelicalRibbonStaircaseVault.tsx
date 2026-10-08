'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type ViewAngle = 'atrium-ground' | 'mezzanine-aerial' | 'handrail-macro'

interface StaircaseSpec {
  metric: string
  value: string
  description: string
}

const STAIRCASE_SPECS: StaircaseSpec[] = [
  {
    metric: 'Tải Trọng Động Kiểm Định',
    value: '500 kg / bậc',
    description: 'Thử nghiệm rung chấn gia tốc < 0.05 mm, triệt tiêu hoàn toàn cảm giác bồng bềnh.',
  },
  {
    metric: 'Gỗ Sồi Trắng Bắc Mỹ FAS',
    value: 'Dày 50 mm',
    description: 'Mộng giấu ngầm liên kết khung thép uốn 3D, xử lý dầu sáp Osmo 0% VOC.',
  },
  {
    metric: 'Tay Vịn Liền Khối Vuốt Tay',
    value: '120 giờ chế tác',
    description: 'Nghệ nhân mài vuốt liên tục theo đường cong xoắn ốc không mối nối gián đoạn.',
  },
  {
    metric: 'Chiếu Sáng Bậc Thang Âm',
    value: 'Warm Dim 2200K',
    description: 'Đèn LED CRI 97 giấu dưới gờ bậc hắt sáng mềm mại không gây chói mắt ban đêm.',
  },
]

export function ArtisanHelicalRibbonStaircaseVault({ className }: { className?: string } = {}) {
  const [activeAngle, setActiveAngle] = useState<ViewAngle>('atrium-ground')
  const [vibrationTestActive, setVibrationTestActive] = useState<boolean>(false)
  const [woodFinish, setWoodFinish] = useState<'white-oak' | 'smoked-walnut'>('white-oak')

  const triggerVibrationTest = () => {
    setVibrationTestActive(true)
    setTimeout(() => setVibrationTestActive(false), 2400)
  }

  return (
    <section
      aria-label="Cầu Thang Xoắn Điêu Khắc Dải Lụa Ribbon Gỗ Sồi"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/3 h-96 w-96 rounded-full bg-amber-600/10 blur-[130px]" />
        <div className="absolute -bottom-20 right-1/4 h-96 w-96 rounded-full bg-stone-700/20 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,119,6,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Kiến Trúc Điêu Khắc Động Lực Học
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Cầu Thang Xoắn Điêu Khắc Dải Lụa Ribbon
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Không cột trụ trung tâm cản trở tầm nhìn. Xương thép xoắn 3D uốn nhiệt phức hợp, bọc gỗ sồi trắng Bắc Mỹ nguyên khối dày 50mm, 
            tay vịn vuốt tay 120 giờ liền mạch như dải lụa bay lượn giữa đại sảnh thông tầng dinh thự.
          </p>
        </div>

        {/* 3D Visualizer & Angle Inspector */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-stone-800">
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                Góc Nhìn Khảo Sát Không Gian 3 Chiều
              </span>
              <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                {activeAngle === 'atrium-ground' && 'Đại Sảnh Đón Khách Tầng Trệt · Góc Nhìn Ngước'}
                {activeAngle === 'mezzanine-aerial' && 'Góc Nhìn Từ Tầng Lửng · Chiêm Ngưỡng Đường Cong Xoắn Ốc'}
                {activeAngle === 'handrail-macro' && 'Chi Tiết Tay Vịn Gỗ Uốn Tay & Hắt Sáng Bậc Warm Dim'}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Wood Finishes */}
              <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setWoodFinish('white-oak')}
                  className={cn(
                    'rounded-lg px-3 py-1.5 transition-colors',
                    woodFinish === 'white-oak'
                      ? 'bg-amber-500/20 text-amber-300 font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  )}
                >
                  Sồi Trắng White Oak
                </button>
                <button
                  type="button"
                  onClick={() => setWoodFinish('smoked-walnut')}
                  className={cn(
                    'rounded-lg px-3 py-1.5 transition-colors',
                    woodFinish === 'smoked-walnut'
                      ? 'bg-amber-500/20 text-amber-300 font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  )}
                >
                  Óc Chó Hun Khói
                </button>
              </div>

              {/* Angle Tabs */}
              <div className="flex items-center rounded-xl bg-stone-900 border border-stone-800 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveAngle('atrium-ground')}
                  className={cn(
                    'rounded-lg px-3 py-1.5 transition-colors',
                    activeAngle === 'atrium-ground'
                      ? 'bg-stone-800 text-stone-100 font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  )}
                >
                  Đại Sảnh
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAngle('mezzanine-aerial')}
                  className={cn(
                    'rounded-lg px-3 py-1.5 transition-colors',
                    activeAngle === 'mezzanine-aerial'
                      ? 'bg-stone-800 text-stone-100 font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  )}
                >
                  Từ Tầng Lửng
                </button>
                <button
                  type="button"
                  onClick={() => setActiveAngle('handrail-macro')}
                  className={cn(
                    'rounded-lg px-3 py-1.5 transition-colors',
                    activeAngle === 'handrail-macro'
                      ? 'bg-stone-800 text-stone-100 font-medium'
                      : 'text-stone-400 hover:text-stone-200'
                  )}
                >
                  Tay Vịn Vuốt Tay
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Graphic Representation */}
          <div className="mt-8 relative h-64 sm:h-80 rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 overflow-hidden flex flex-col justify-between p-6">
            {/* Visual Helical Ribbon Curve representation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60 pointer-events-none">
              <svg className="w-full h-full max-w-lg" viewBox="0 0 400 300" fill="none">
                {/* Spiral Ribbon Paths */}
                <path
                  d="M100 260 C 140 240, 220 220, 260 170 C 300 120, 260 80, 200 60 C 140 40, 110 90, 150 140 C 190 190, 310 180, 330 110"
                  stroke={woodFinish === 'white-oak' ? '#f59e0b' : '#b45309'}
                  strokeWidth="18"
                  strokeLinecap="round"
                  className={cn(
                    'transition-all duration-700',
                    vibrationTestActive ? 'stroke-amber-300' : ''
                  )}
                />
                <path
                  d="M108 268 C 146 248, 224 228, 264 178 C 304 128, 264 88, 204 68 C 144 48, 114 98, 154 148 C 194 198, 314 188, 334 118"
                  stroke="#44403c"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                {/* Embedded LED warm glow */}
                <path
                  d="M100 260 C 140 240, 220 220, 260 170 C 300 120, 260 80, 200 60 C 140 40, 110 90, 150 140 C 190 190, 310 180, 330 110"
                  stroke="#fde68a"
                  strokeWidth="4"
                  strokeDasharray="8 12"
                  className="opacity-70 animate-pulse"
                />
              </svg>
            </div>

            <div className="relative z-10 flex items-start justify-between">
              <div className="bg-stone-900/80 border border-stone-800 rounded-lg px-3 py-1.5 text-xs font-mono text-amber-300">
                Góc xoắn tham số: R = 1.450 mm · Cao độ thông tầng H = 3.800 mm
              </div>

              <button
                type="button"
                onClick={triggerVibrationTest}
                disabled={vibrationTestActive}
                className={cn(
                  'rounded-xl px-4 py-2 text-xs font-mono tracking-wide transition-all duration-200 border',
                  vibrationTestActive
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                    : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700 hover:border-amber-500/40'
                )}
              >
                {vibrationTestActive ? 'Đang Đo Dao Động Bước Chân...' : 'Mô Phỏng Triệt Tiêu Rung Chấn'}
              </button>
            </div>

            <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="text-xs text-stone-400 font-mono block">
                  Vật Liệu Cốt Lõi:
                </span>
                <span className="font-serif text-stone-100 text-base sm:text-lg">
                  {woodFinish === 'white-oak'
                    ? 'Gỗ Sồi Trắng FAS Uốn Mộng + Thép Hình Q345B 14mm'
                    : 'Gỗ Óc Chó Hun Khói Tuyển Chọn + Khung Thép Xoắn Tĩnh Điện'}
                </span>
              </div>

              <div className="bg-stone-950/80 border border-stone-800 rounded-lg px-3 py-1.5 text-xs font-mono text-emerald-400">
                Độ võng gia tốc: 0.038 mm / 500 kg (Vượt tiêu chuẩn EN 1991-1-1)
              </div>
            </div>
          </div>

          {/* Technical Specs 4-col Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STAIRCASE_SPECS.map((spec) => (
              <div
                key={spec.metric}
                className="rounded-xl border border-stone-800 bg-stone-900/50 p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-stone-400 block uppercase">
                    {spec.metric}
                  </span>
                  <div className="mt-1 font-serif text-xl text-amber-300 font-medium">
                    {spec.value}
                  </div>
                  <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
                    {spec.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Craftsmanship Narrative & Structural Rigidity */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div className="rounded-2xl border border-stone-800 bg-stone-950/60 p-6 sm:p-8">
            <span className="text-xs font-mono text-amber-400/90 uppercase tracking-widest">
              Linh Khí Không Gian Đại Sảnh
            </span>
            <h3 className="mt-3 font-serif text-xl sm:text-2xl text-stone-100">
              Đường Cong Tự Nhiên Dẫn Dắt Luồng Khí
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-stone-400 leading-relaxed">
              Trong kiến trúc nhiệt đới Sài Gòn, cầu thang thẳng đứng dạng hộp thường cắt đứt luồng gió đối lưu tự nhiên. 
              Thiết kế xoắn Helical Ribbon tạo ra luồng khí cuộn nhẹ nhàng đưa gió mát từ tầng trệt lên các tầng trên, 
              đồng thời biến sảnh đón khách thành một bảo tàng điêu khắc nghệ thuật đương đại.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-950/60 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-amber-400/90 uppercase tracking-widest">
                Độ Bền Di Sản Gia Tộc
              </span>
              <h3 className="mt-3 font-serif text-xl sm:text-2xl text-stone-100">
                Bảo Chứng Kết Cấu 50 Năm
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-stone-400 leading-relaxed">
                Mỗi công trình cầu thang xoắn được GuHomes dựng mô hình 3D Finite Element Analysis (FEA), 
                gia công phôi thép tại xưởng cơ khí chính xác và lắp dựng thử nghiệm trước khi hoàn thiện thủ công tại công trình.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors"
              >
                Chiêm ngưỡng các dự án dinh thự sở hữu cầu thang xoắn Ribbon
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
