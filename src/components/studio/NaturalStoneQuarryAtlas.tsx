'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type StoneId = 'travertine-navona' | 'calacatta-viola' | 'black-basalt' | 'bush-hammered-white'

export type MatchMode = 'bookmatch' | 'quadmatch'

interface StoneQuarrySpec {
  id: StoneId
  nameVi: string
  quarryOriginVi: string
  geologicalAge: string
  mineralStructure: string
  porosityRate: string
  recommendedFinish: string
  tagVi: string
  descriptionVi: string
  veinStyleVi: string
  colorHexBase: string
  colorHexVein: string
  icon: string
}

const STONES_DATA: Record<StoneId, StoneQuarrySpec> = {
  'travertine-navona': {
    id: 'travertine-navona',
    nameVi: 'Đá Travertine Navona Trầm Tích Ý',
    quarryOriginVi: 'Mỏ đá ngầm Tivoli, vùng Lazio, Rome, Ý',
    geologicalAge: 'Khoáng trầm tích suối nước nóng ~250.000 năm',
    mineralStructure: 'Calcite tinh thể giàu lỗ rỗng tự nhiên',
    porosityRate: 'Độ rỗng mao dẫn 4.8% (Thấm thở tự nhiên)',
    recommendedFinish: 'Mài mờ thủ công (Honed & Unfilled) hoặc lấp mờ vi lỗ',
    tagVi: 'Trầm Tích Cổ Điển · Chống Nồm Ẩm Sài Gòn',
    descriptionVi:
      'Đá Travertine Navona là loại đá xây dựng đấu trường La Mã Colosseum tồn tại hơn hai nghìn năm. Các lỗ rỗng khoáng vật tự nhiên giúp đá cách nhiệt, mùa hè mát lạnh và mùa mưa không bị đọng nồm.',
    veinStyleVi: 'Vân ngang dải lụa mềm mại màu be ngà xen kẽ vệt kem ấm',
    colorHexBase: '#E6D9C8',
    colorHexVein: '#BFAF96',
    icon: '🏛️',
  },
  'calacatta-viola': {
    id: 'calacatta-viola',
    nameVi: 'Đá Cẩm Thạch Calacatta Viola Ý',
    quarryOriginVi: 'Mỏ Apuan Alps, Carrara, Tuscany, Ý',
    geologicalAge: 'Đá biến chất áp suất cao ~190 triệu năm',
    mineralStructure: '98% Canxi cacbonat kết tinh hạt mịn',
    porosityRate: 'Độ rỗng siêu thấp < 0.2% (Đanh chắc như ngọc)',
    recommendedFinish: 'Mài bóng mờ Satin lụa (Honed Velvet)',
    tagVi: 'Nữ Hoàng Cẩm Thạch · Vân Tím Rượu Vang',
    descriptionVi:
      'Mỗi khối đá Calacatta Viola là một bức tranh điêu khắc độc bản của thiên nhiên. Vân breccia sắc tím rượu vang đậm đà uốn lượn trên nền đá trắng sứ, mang lại vẻ quyền quý tột bậc cho đảo bếp.',
    veinStyleVi: 'Vân breccia gãy khúc màu tím Bordeaux quyến rũ trên nền trắng',
    colorHexBase: '#EDE8E4',
    colorHexVein: '#4A1D2B',
    icon: '🍇',
  },
  'black-basalt': {
    id: 'black-basalt',
    nameVi: 'Đá Bazan Đen Cắt Thô Bình Định',
    quarryOriginVi: 'Cao nguyên đá núi lửa An Khê, Bình Định, Việt Nam',
    geologicalAge: 'Dung nham bazan phun trào kỷ Kainozoi ~30 triệu năm',
    mineralStructure: 'Khoáng Plagioclase & Pyroxene siêu cứng',
    porosityRate: 'Độ hút nước < 0.5% (Chịu va đập cực đại)',
    recommendedFinish: 'Cắt thô xẻ rãnh (Rough Sawn) hoặc khò lửa băm mặt',
    tagVi: 'Sức Mạnh Núi Lửa · Bền Bỉ Thiên Niên Kỷ',
    descriptionVi:
      'Đá bazan Bình Định sở hữu màu xám than chì sâu thẳm và khả năng chịu lực va đập tuyệt đối. GuHomes sử dụng đá bazan cắt thô làm chậu lavabo điêu khắc và sàn khu vực ẩm ướt chống trơn trượt.',
    veinStyleVi: 'Bề mặt hạt khoáng mịn lấm tấm ánh kim tự nhiên',
    colorHexBase: '#2C2B2A',
    colorHexVein: '#1A1918',
    icon: '🌋',
  },
  'bush-hammered-white': {
    id: 'bush-hammered-white',
    nameVi: 'Đá Vôi Trắng Búa Tay Thanh Hóa',
    quarryOriginVi: 'Mỏ đá tự nhiên Hà Trung, Thanh Hóa, Việt Nam',
    geologicalAge: 'Đá trầm tích biển kỷ Than Đá ~300 triệu năm',
    mineralStructure: 'Canxit kết tinh dạng khối đặc',
    porosityRate: 'Độ hút nước 1.2% (Thoát ẩm nhanh)',
    recommendedFinish: 'Đục búa tay tạo sần gai góc (Hand Bush-Hammered)',
    tagVi: 'Xúc Cảm Thủ Công · Đục Búa Tay Gai Góc',
    descriptionVi:
      'Mỗi mét vuông đá được người thợ đá dùng búa đục gõ hàng ngàn nhát thủ công, tạo nên bề mặt sần thô gai góc như lớp vỏ thông già. Khi có đèn rọi nghiêng góc 15°, đá tạo bóng đổ điêu khắc tuyệt mỹ.',
    veinStyleVi: 'Bề mặt gồ ghề khúc xạ ánh sáng đa chiều',
    colorHexBase: '#D8D4CC',
    colorHexVein: '#8A867E',
    icon: '🔨',
  },
}

export function NaturalStoneQuarryAtlas({ className }: { className?: string }) {
  const [selectedStoneId, setSelectedStoneId] = useState<StoneId>('calacatta-viola')
  const [matchMode, setMatchMode] = useState<MatchMode>('bookmatch')
  const [rotationAngle, setRotationAngle] = useState<number>(0)

  const stone = STONES_DATA[selectedStoneId] ?? STONES_DATA['calacatta-viola']
  const uniqueId = useId()

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-canvas border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Địa Chất &amp; Đá Khoáng Tự Nhiên · GuHomes Quarry Atlas
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Bookmatch &amp; Quadmatch
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Bản Đồ Mỏ Đá Tự Nhiên &amp; Ghép Vân Đối Xứng
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Khác với đá nhân tạo nhân bản dập khuôn nhanh ố vàng, mỗi phiến đá khoáng tự nhiên nguyên khối được GuHomes nhập khẩu từ các mỏ đá cổ xưa, xẻ slab đối xứng tạo thành những bức tranh thủy mặc kỳ vĩ trên vách nhà bạn.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Mô phỏng ghép vân đối xứng trục thời gian thực</span>
          </div>
        </div>

        {/* 4 Stones Selector */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(STONES_DATA) as StoneId[]).map((id) => {
            const st = STONES_DATA[id]
            const isSelected = selectedStoneId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedStoneId(id)}
                className={cn(
                  'p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-surface shadow-md ring-1 ring-accent/40'
                    : 'border-line bg-canvas hover:border-line-dark'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent">
                      {st.tagVi.split('·')[0]}
                    </span>
                    <span className="text-xl">{st.icon}</span>
                  </div>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-ink mt-1.5">
                    {st.nameVi}
                  </h3>
                </div>
                <p className="text-[11px] text-muted font-mono mt-3 truncate">{st.quarryOriginVi.split(',')[0]}</p>
              </button>
            )
          })}
        </div>

        {/* Main Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Bookmatch Canvas */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-surface border border-line">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line/60 gap-3 text-xs font-mono">
                <span className="text-muted">Trình Mô Phỏng Khớp Vân Bookmatch Đối Xứng</span>
                <div className="inline-flex p-1 rounded-xl bg-canvas border border-line">
                  <button
                    type="button"
                    onClick={() => setMatchMode('bookmatch')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-mono transition-all',
                      matchMode === 'bookmatch'
                        ? 'bg-accent text-canvas font-semibold shadow-sm'
                        : 'text-muted hover:text-ink'
                    )}
                  >
                    2 Tấm (Bookmatch)
                  </button>
                  <button
                    type="button"
                    onClick={() => setMatchMode('quadmatch')}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-mono transition-all',
                      matchMode === 'quadmatch'
                        ? 'bg-accent text-canvas font-semibold shadow-sm'
                        : 'text-muted hover:text-ink'
                    )}
                  >
                    4 Tấm (Quadmatch)
                  </button>
                </div>
              </div>

              {/* Dynamic Symmetrical Canvas */}
              <div
                className="mt-6 relative h-72 sm:h-80 w-full rounded-2xl border border-line overflow-hidden p-2 flex items-center justify-center shadow-inner"
                style={{ backgroundColor: '#181513' }}
              >
                {/* 2-Slab or 4-Slab Grid */}
                <div
                  className={cn(
                    'w-full h-full grid gap-1 transition-all duration-500',
                    matchMode === 'bookmatch' ? 'grid-cols-2' : 'grid-cols-2 grid-rows-2'
                  )}
                >
                  {/* Panel 1 */}
                  <div
                    className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-4 text-center"
                    style={{ backgroundColor: stone.colorHexBase }}
                  >
                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                      <path
                        d="M 10 20 Q 80 80, 190 40 T 120 180"
                        fill="none"
                        stroke={stone.colorHexVein}
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 50 10 Q 120 120, 180 190"
                        fill="none"
                        stroke={stone.colorHexVein}
                        strokeWidth="8"
                      />
                    </svg>
                    <span className="absolute bottom-2 left-2 text-[9px] font-mono text-ink/60 bg-white/40 px-1.5 py-0.5 rounded">
                      Slab A
                    </span>
                  </div>

                  {/* Panel 2 (Horizontally Mirrored) */}
                  <div
                    className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-4 text-center transform scale-x-[-1]"
                    style={{ backgroundColor: stone.colorHexBase }}
                  >
                    <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                      <path
                        d="M 10 20 Q 80 80, 190 40 T 120 180"
                        fill="none"
                        stroke={stone.colorHexVein}
                        strokeWidth="16"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 50 10 Q 120 120, 180 190"
                        fill="none"
                        stroke={stone.colorHexVein}
                        strokeWidth="8"
                      />
                    </svg>
                    <span className="absolute bottom-2 left-2 text-[9px] font-mono text-ink/60 bg-white/40 px-1.5 py-0.5 rounded transform scale-x-[-1]">
                      Slab B (Mirrored)
                    </span>
                  </div>

                  {/* Panels 3 & 4 (If Quadmatch) */}
                  {matchMode === 'quadmatch' && (
                    <>
                      <div
                        className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-4 text-center transform scale-y-[-1]"
                        style={{ backgroundColor: stone.colorHexBase }}
                      >
                        <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                          <path
                            d="M 10 20 Q 80 80, 190 40 T 120 180"
                            fill="none"
                            stroke={stone.colorHexVein}
                            strokeWidth="16"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 50 10 Q 120 120, 180 190"
                            fill="none"
                            stroke={stone.colorHexVein}
                            strokeWidth="8"
                          />
                        </svg>
                        <span className="absolute bottom-2 left-2 text-[9px] font-mono text-ink/60 bg-white/40 px-1.5 py-0.5 rounded transform scale-y-[-1]">
                          Slab C
                        </span>
                      </div>

                      <div
                        className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 flex items-center justify-center p-4 text-center transform scale-[-1]"
                        style={{ backgroundColor: stone.colorHexBase }}
                      >
                        <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                          <path
                            d="M 10 20 Q 80 80, 190 40 T 120 180"
                            fill="none"
                            stroke={stone.colorHexVein}
                            strokeWidth="16"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 50 10 Q 120 120, 180 190"
                            fill="none"
                            stroke={stone.colorHexVein}
                            strokeWidth="8"
                          />
                        </svg>
                        <span className="absolute bottom-2 left-2 text-[9px] font-mono text-ink/60 bg-white/40 px-1.5 py-0.5 rounded transform scale-[-1]">
                          Slab D
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Composition Detail Note */}
              <div className="mt-6 p-4 rounded-2xl bg-canvas border border-line text-xs font-mono flex items-start gap-3">
                <span className="text-accent text-base mt-0.5">◈</span>
                <div>
                  <span className="text-ink font-semibold">Đặc trưng vân đối xứng: </span>
                  <span className="text-muted font-light">{stone.veinStyleVi}.</span>
                  <p className="text-[11px] text-muted/80 mt-1">
                    GuHomes đánh số thứ tự từng tấm slab tại mỏ đá ngay sau khi xẻ block, đảm bảo đường vân liền mạch 100% khi thi công thực tế tại căn hộ.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Geology Dossier & Nano Protection Standard */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* Geology Dossier */}
            <div className="p-8 rounded-3xl bg-surface border border-line">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Hồ Sơ Mỏ Khai Thác Địa Chất
              </span>
              <h3 className="font-serif text-2xl text-ink font-light mt-2">
                {stone.nameVi}
              </h3>
              <p className="text-xs font-mono text-accent mt-1">{stone.quarryOriginVi}</p>

              <p className="text-sm font-light text-ink mt-4 leading-relaxed">
                {stone.descriptionVi}
              </p>

              <div className="mt-6 pt-6 border-t border-line space-y-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-muted">Niên đại địa chất:</span>
                  <span className="text-ink">{stone.geologicalAge}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Cấu trúc khoáng:</span>
                  <span className="text-ink truncate max-w-[24ch]">{stone.mineralStructure}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Độ rỗng mao dẫn:</span>
                  <span className="text-accent font-semibold">{stone.porosityRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Hoàn thiện bề mặt:</span>
                  <span className="text-ink">{stone.recommendedFinish}</span>
                </div>
              </div>
            </div>

            {/* 3-Layer Nano Breathable Protection Standard */}
            <div className="p-6 rounded-3xl bg-canvas border border-line text-xs font-mono">
              <span className="text-accent uppercase tracking-wider block mb-2 font-semibold">
                Chuẩn Xử Lý Chống Ố Nano Thẩm Thấu GuHomes
              </span>
              <p className="text-muted font-light leading-relaxed">
                Khác với việc phủ keo bóng làm bí đá và nhanh ố vàng, GuHomes sử dụng dung dịch nano thẩm thấu gốc nước Fila (Ý). Các hạt nano len lỏi vào mao dẫn tự nhiên, ngăn 100% vết ố rượu vang, cà phê và nước tương, nhưng vẫn cho phép phiến đá "thở" tự nhiên cùng độ ẩm không khí.
              </p>
            </div>

            {/* Consultation Callout */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-espresso to-[#2B231D] text-canvas relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Kho Mẫu Đá Tự Nhiên
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-canvas mt-2">
                Trực tiếp chạm tay vào phiến đá nguyên khối
              </h4>
              <p className="text-xs text-canvas/80 mt-3 font-light leading-relaxed">
                Tại Studio GuHomes, chúng tôi lưu giữ các phiến đá slab lớn nhập khẩu trực tiếp từ Carrara và Tivoli để bạn chiêm ngưỡng vân thật và kiểm tra độ chống thấm trước khi chốt bản vẽ.
              </p>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
                >
                  <span>Xem mẫu đá tự nhiên tại Studio</span>
                  <ArrowUpRightIcon className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
