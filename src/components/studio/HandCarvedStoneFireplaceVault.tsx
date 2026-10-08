'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface StoneMedium {
  id: string
  nameVi: string
  quarryOriginVi: string
  carvingHoursVi: string
  tactileSurfaceVi: string
  thermalFeelVi: string
  descriptionVi: string
  accentBorder: string
}

const STONE_MEDIUMS: StoneMedium[] = [
  {
    id: 'thanh-hoa-blue-limestone',
    nameVi: 'Đá Xanh Rêu Thanh Hóa Nguyên Khối (Monolithic Blue Limestone)',
    quarryOriginVi: 'Mỏ đá cổ Hà Trung, Thanh Hóa · Tuổi địa chất 250 triệu năm',
    carvingHoursVi: '120 Giờ đục đẽo băm nhám thủ công',
    tactileSurfaceVi: 'Bề mặt băm rỗ cổ phong mộc mạc, chạm tay mát lạnh như đá suối',
    thermalFeelVi: 'Hấp thụ độ ẩm, giữ bề mặt luôn ở nhiệt độ 24°C dịu mát',
    descriptionVi:
      'Nghệ nhân dùng ve sắt đục tay từng đường rãnh hình học tối giản trên khối đá nguyên tảng nặng 1.8 tấn. Sắc xanh rêu trầm mặc biến góc phòng khách thành một tác phẩm điêu khắc kiến trúc vĩnh cửu.',
    accentBorder: '#3d4d42',
  },
  {
    id: 'yen-bai-white-marble',
    nameVi: 'Cẩm Thạch Trắng Yên Bái Tinh Thể (Crystalline White Marble)',
    quarryOriginVi: 'Lục Yên, Yên Bái · Đá hoa cương thấu quang tự nhiên',
    carvingHoursVi: '95 Giờ mài bóng Satin mờ',
    tactileSurfaceVi: 'Mịn màng như ngọc thạch, ánh sáng LED 2200K xuyên nhẹ qua thớ đá',
    thermalFeelVi: 'Phản chiếu ánh sáng ấm cúng mà không tỏa nhiệt bức xạ',
    descriptionVi:
      'Đá cẩm thạch trắng với những đường vân mây xám khói tự nhiên. Khi lò sưởi hơi nước bật sáng, ánh lửa hổ phách chiếu hắt lên phiến đá cẩm thạch tạo nên vầng hào quang ấm áp lung linh trong sảnh Penthouse.',
    accentBorder: '#8c8c94',
  },
  {
    id: 'bat-trang-black-ceramic',
    nameVi: 'Gốm Nung Men Hỏa Biến Bát Tràng Đen Mun (Reactive Glaze Ceramic)',
    quarryOriginVi: 'Lò củi Bát Tràng nung 1.300°C khử oxy hoàn toàn',
    carvingHoursVi: '80 Giờ vuốt tay & tạo men rạn Wabi-Sabi',
    tactileSurfaceVi: 'Vân rạn nứt tự nhiên rỉ ánh vàng quỳ kim loại',
    thermalFeelVi: 'Không nứt vỡ trước độ ẩm hơi sương nước siêu âm',
    descriptionVi:
      'Sự hòa quyện giữa đất sét phù sa sông Hồng và tro trấu tự nhiên. Men hỏa biến đen tuyền tương phản ấn tượng với làn sương khói bay lượn mềm mại như dải lụa trên miệng lò sưởi.',
    accentBorder: '#4a3b2c',
  },
]

export function HandCarvedStoneFireplaceVault({ className }: { className?: string } = {}) {
  const [activeStoneId, setActiveStoneId] = useState<string>('thanh-hoa-blue-limestone')
  const [flameMode, setFlameMode] = useState<'amber-sunset' | 'quiet-ember' | 'moonlit-mist'>('amber-sunset')
  const [isAgarwoodActive, setIsAgarwoodActive] = useState<boolean>(true)
  const [isHandTouchingFlame, setIsHandTouchingFlame] = useState<boolean>(false)

  const currentStone =
    STONE_MEDIUMS.find((s) => s.id === activeStoneId) ?? STONE_MEDIUMS[0]!

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0a08] py-24 text-[#f0eae1] border-t border-[#231d16]', className)}>
      {/* Warm Fireplace Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(245,158,11,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#422e19] bg-[#1a1209] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#f59e0b]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b] animate-ping" />
            Lò Sưởi Hơi Nước Siêu Âm 3D · Hand-Carved Monolithic Stone Fireplace
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf7f0]">
            Lò Sưởi Hơi Nước Điêu Khắc Đá Khối &amp; Trầm Hương
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#bcaea0]">
            Sài Gòn nhiệt đới không cần sức nóng bức bối của củi than. GuHomes tái định nghĩa ngọn lửa ấm áp bằng công nghệ hơi nước siêu âm 3D kết hợp đèn LED hổ phách 2200K và đá nguyên khối đục tay: ngọn lửa mát lạnh 22°C chạm tay không bỏng, hòa quyện hương trầm Khánh Hòa thanh tẩy không gian.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: Hand-Carved Stone Mediums */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#2e2318] bg-[#140f0a]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#281e14] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#f59e0b]">
                    3 Chất Liệu Đá Khối Điêu Khắc Thủ Công
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf7f0]">
                    Khung Bao Lò Sưởi Đục Tay Trăm Giờ
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#1f160c] px-3 py-1 text-xs font-mono text-[#f59e0b]">
                  <span>Trọng lượng: 1.2 – 2.0 Tấn</span>
                </div>
              </div>

              {/* Stone Chips */}
              <div className="mt-6 flex flex-col gap-2.5">
                {STONE_MEDIUMS.map((stone) => {
                  const isSelected = stone.id === activeStoneId
                  return (
                    <button
                      key={stone.id}
                      type="button"
                      onClick={() => setActiveStoneId(stone.id)}
                      className={cn(
                        'flex items-center justify-between p-3.5 rounded-xl border text-left transition-all min-h-[56px]',
                        isSelected
                          ? 'border-[#f59e0b] bg-[#22170d] text-white shadow-[0_0_15px_rgba(245,158,11,0.18)]'
                          : 'border-[#261d14] bg-[#0f0b07] text-[#9c8f82] hover:border-[#3d2f20] hover:text-[#ede4d8]'
                      )}
                    >
                      <div>
                        <span className="block text-xs sm:text-sm font-medium">
                          {stone.nameVi.split(' (')[0]}
                        </span>
                        <span className="block text-[11px] text-[#7a6f62] line-clamp-1">
                          {stone.quarryOriginVi}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#f59e0b]/80 hidden sm:inline">
                        {stone.carvingHoursVi.split(' ')[0]} Giờ
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Stone Detail Card */}
              <div className="mt-6 rounded-xl border border-[#382819] bg-[#1a120b] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#f59e0b]">
                    {currentStone.quarryOriginVi}
                  </span>
                  <span className="rounded-full bg-[#291b0f] px-2.5 py-0.5 font-mono text-[10px] text-[#f59e0b]">
                    {currentStone.carvingHoursVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#fbf7f0]">
                  {currentStone.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#c7baa9]">
                  {currentStone.descriptionVi}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#291d13]">
                  <div className="rounded-lg bg-[#0e0a06] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6c5d]">Xúc Giác Bề Mặt</span>
                    <span className="mt-1 block text-xs font-medium text-[#ede4d8]">
                      {currentStone.tactileSurfaceVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#0e0a06] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#7a6c5d]">Nhiệt Độ Khối Đá</span>
                    <span className="mt-1 block text-xs font-medium text-[#f59e0b]">
                      {currentStone.thermalFeelVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ultrasonic Mist Flame Interactive Simulator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#2e2318] bg-[#140f0a]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#281e14] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#f59e0b]">
                    Mô Phỏng Ngọn Lửa Hơi Nước 3D
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf7f0]">
                    An Toàn Cho Trẻ Nhỏ &amp; Thú Cưng
                  </h3>
                </div>
              </div>

              {/* Flame Color Switcher */}
              <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-[#0a0705] p-1.5 border border-[#281e14]">
                {(
                  [
                    { id: 'amber-sunset', label: 'Hoàng Hôn (2200K)' },
                    { id: 'quiet-ember', label: 'Than Hồng (1800K)' },
                    { id: 'moonlit-mist', label: 'Ánh Trăng (4000K)' },
                  ] as const
                ).map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFlameMode(f.id)}
                    className={cn(
                      'py-2 px-1.5 rounded-lg text-[11px] font-mono transition-all text-center',
                      flameMode === f.id
                        ? 'bg-[#f59e0b] text-[#140e08] font-bold shadow-md'
                        : 'text-[#877868] hover:text-[#f59e0b]'
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Flame Canvas Interactive Demo */}
              <div className="mt-6 overflow-hidden rounded-xl border border-[#382819] relative aspect-[16/10] flex flex-col justify-end p-6 bg-gradient-to-t from-[#1b1209] to-[#0c0906]">
                {/* Simulated Mist Flame Visualization */}
                <div
                  className={cn(
                    'h-28 w-full rounded-t-full blur-sm opacity-80 transition-all duration-700 animate-pulse',
                    flameMode === 'amber-sunset'
                      ? 'bg-gradient-to-t from-amber-500 via-orange-400 to-transparent'
                      : flameMode === 'quiet-ember'
                      ? 'bg-gradient-to-t from-red-600 via-orange-600 to-transparent'
                      : 'bg-gradient-to-t from-cyan-400 via-blue-300 to-transparent'
                  )}
                />

                <div className="relative z-10 text-center mt-2 space-y-1">
                  <span className="font-mono text-xs text-[#fde68a]">
                    Nhiệt Độ Ngọn Lửa Hơi Nước: <strong className="text-white">22.5°C</strong> (Mát Lạnh)
                  </span>
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onMouseDown={() => setIsHandTouchingFlame(true)}
                      onMouseUp={() => setIsHandTouchingFlame(false)}
                      onTouchStart={() => setIsHandTouchingFlame(true)}
                      onTouchEnd={() => setIsHandTouchingFlame(false)}
                      className={cn(
                        'px-4 py-1.5 rounded-full text-xs font-mono transition-all',
                        isHandTouchingFlame
                          ? 'bg-emerald-500 text-white font-bold shadow-lg'
                          : 'border border-[#523d26] bg-[#1a1209] text-[#f59e0b] hover:bg-[#281b0e]'
                      )}
                    >
                      {isHandTouchingFlame ? '✋ Đang Chạm Vào Lửa: Mát Lạnh 100%!' : '🖐️ Nhấn Giữ Thử Chạm Vào Lửa'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Agarwood Diffuser Toggle */}
              <div className="mt-4 rounded-xl border border-[#2b2014] bg-[#120d08] p-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🪵</span>
                  <div>
                    <span className="font-mono text-xs text-[#f59e0b] block">Vi Hạt Trầm Hương Khánh Hòa</span>
                    <span className="text-[11px] text-[#8e8174]">Khuếch tán cùng làn sương mát lạnh</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAgarwoodActive(!isAgarwoodActive)}
                  className={cn(
                    'px-3 py-1 rounded-full text-[11px] font-mono transition-all',
                    isAgarwoodActive ? 'bg-[#f59e0b] text-[#140e08] font-bold' : 'border border-[#382b1c] text-[#7a6e61]'
                  )}
                >
                  {isAgarwoodActive ? 'Đang Tỏa Hương' : 'Tạm Dừng'}
                </button>
              </div>

              {/* Fire Safety Guarantee */}
              <div className="mt-4 rounded-xl bg-[#0d0905] p-3 text-[11px] text-[#9c8e80] space-y-1">
                <span className="block font-mono text-[10px] text-[#f59e0b] uppercase">Tuyệt Đối Không Khói Bụi:</span>
                <p>
                  Không tiêu hao oxy trong phòng, không sinh khí CO/CO2, không cần ống khói thoát khí. Hoàn toàn phù hợp cho căn hộ cao cấp và penthouse kín gió.
                </p>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#281e14]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#f59e0b] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#140e08] hover:bg-[#fbbf24] transition-all shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
                >
                  <span>Dự toán lò sưởi hơi nước đá khối may đo</span>
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
