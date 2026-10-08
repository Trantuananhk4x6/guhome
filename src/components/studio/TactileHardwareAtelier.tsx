'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type HardwareId = 'brass-handle' | 'ebony-pull' | 'magnetic-latch' | 'cremone-bolt'

interface HardwareDetail {
  id: HardwareId
  numberVi: string
  nameVi: string
  subtitleVi: string
  materialsVi: string
  weightVi: string
  noiseLevelDb: number
  tagVi: string
  icon: string
  tactileHandFeelVi: string
  craftsmanshipVi: string
  descriptionVi: string
  specs: {
    origin: string
    finish: string
    mechanism: string
    lifespan: string
  }
}

const HARDWARE_DATA: Record<HardwareId, HardwareDetail> = {
  'brass-handle': {
    id: 'brass-handle',
    numberVi: '01',
    nameVi: 'Tay Nắm Cửa Điêu Khắc Đồng Thau Mộc',
    subtitleVi: 'Solid Unlacquered Brass Handle · Nặng 1.8kg Đồng Đặc',
    materialsVi: 'Đồng thau mộc nguyên khối (Alloy C3604) xước xước satin thủ công',
    weightVi: '1.8 kg / cặp',
    noiseLevelDb: 22,
    tagVi: 'Khối Liền Đầm Tay · Patina Vương Giả',
    icon: '🚪',
    tactileHandFeelVi: 'Cầm đầm chắc mát lạnh ban đầu, sau đó ấm dần theo thân nhiệt người chạm, mép phay chỉ âm êm ru không cấn ngón tay.',
    craftsmanshipVi: 'Phay gọt từ một thỏi đồng thau đặc nguyên khối bằng máy CNC 5 trục, sau đó người thợ kim hoàn đánh xước hairline thủ công 4 lớp.',
    descriptionVi:
      'Không phủ bất kỳ lớp sơn bóng PU hay mạ hóa chất bảo vệ nào. Khối đồng thau mộc thở cùng khí hậu Sài Gòn, lớp dầu tự nhiên từ lòng bàn tay gia chủ qua năm tháng sẽ tôi luyện nên một lớp oxit patina màu mật ong trầm mặc, phản ánh dấu ấn thời gian độc bản của ngôi nhà.',
    specs: {
      origin: 'Xưởng chế tác phụ kiện kim hoàn GuHomes Thạnh Xuân',
      finish: 'Đồng mộc không sơn bóng (Unlacquered Raw Brass)',
      mechanism: 'Lõi ổ bi thép tôi cứng tự bôi trơn vĩnh cửu',
      lifespan: 'Bảo hành kết cấu cơ học trọn đời 30 năm',
    },
  },
  'ebony-pull': {
    id: 'ebony-pull',
    numberVi: '02',
    nameVi: 'Tay Nắm Âm Tủ Gỗ Mun Sừng & Nẹp Đồng Mộc',
    subtitleVi: 'Flush Ebony & Brass Recessed Pull · Giấu Vít 100%',
    materialsVi: 'Gỗ Mun sừng sấy khô tự nhiên + Nẹp đồng thau phay chìm chuẩn âm phẳng',
    weightVi: '320 g / chiếc',
    noiseLevelDb: 15,
    tagVi: 'Vuốt Phẳng Tinh Tế · Không Gờ Cạnh',
    icon: '🪵',
    tactileHandFeelVi: 'Vuốt tay nhẹ nhàng như lướt trên mặt đá bóng mờ, thớ gỗ mun đen tuyền mát mịn hòa cùng dải đồng vàng tinh xảo.',
    craftsmanshipVi: 'Soi rãnh âm mộng mang cá trên cánh tủ Plywood óc chó, liên kết bằng keo sinh học không để lộ bất kỳ dấu đinh vít sắt nào.',
    descriptionVi:
      'Dành riêng cho hệ tủ áo walk-in closet và tủ bếp cao cấp. Thiết kế âm hoàn toàn vào mặt cánh giúp người di chuyển trong không gian không bao giờ bị vướng mắc hay va quẹt góc cạnh, tôn vinh vẻ đẹp tối giản liền mạch của mảng tường mộc.',
    specs: {
      origin: 'Xưởng Mộc Thủ Công GuHomes Thạnh Xuân, Q.12',
      finish: 'Lau dầu Osmo Polyx-Oil Đức mờ 3032',
      mechanism: 'Gắn âm phẳng flush-mount dung sai 0.1mm',
      lifespan: 'Không bong tróc cong vênh suốt vòng đời đồ gỗ',
    },
  },
  'magnetic-latch': {
    id: 'magnetic-latch',
    numberVi: '03',
    nameVi: 'Khóa Cửa Từ Tính Triệt Tiêu Âm Thanh Silent Latch',
    subtitleVi: 'Silent Magnetic Architectural Lock · Âm Thanh Đóng < 18dB',
    materialsVi: 'Nam châm vĩnh cửu Neodymium N52 + Vỏ giảm chấn polymer tự bôi trơn',
    weightVi: '680 g / bộ',
    noiseLevelDb: 18,
    tagVi: 'Tĩnh Lặng Tuyệt Đối · Êm Hơn Tiếng Thì Thầm',
    icon: '🧲',
    tactileHandFeelVi: 'Cửa tự hít vào khuôn êm ái như không có tiếp xúc cơ học, tuyệt đối không có tiếng cạch kim loại chói tai làm giật mình.',
    craftsmanshipVi: 'Lưỡi gà khóa làm từ nam châm từ tính chỉ nhô ra khi cửa chạm đúng vị trí khung, triệt tiêu ma sát cọ quẹt vào nẹp cửa.',
    descriptionVi:
      'Trong tư gia Quiet Luxury, sự tĩnh lặng ban đêm là thước đo cao nhất của sự tinh tế. Khóa từ tính GuHomes phát ra âm thanh đóng cửa chỉ 18dB (nhỏ hơn tiếng thì thầm 25dB), giúp bạn về phòng ngủ khuya mà không làm thức giấc người bạn đời.',
    specs: {
      origin: 'Công nghệ cơ khí chính xác AGB sản xuất tại Ý',
      finish: 'Mặt nẹp phủ mạ PVD Titanium đen mờ hoặc đồng xước',
      mechanism: 'Cơ chế hút từ tính không dùng lò xo nén cơ học',
      lifespan: 'Thử nghiệm đóng mở 500.000 lần liên tục',
    },
  },
  'cremone-bolt': {
    id: 'cremone-bolt',
    numberVi: '04',
    nameVi: 'Then Cài Trục Xoay Cremone Khổ Lớn 2.8m',
    subtitleVi: 'Heavy Duty Architectural Cremone Bolt · Thanh Đồng Nguyên Cây',
    materialsVi: 'Hai thanh đồng thau đúc đặc dài 1.4m x 2 kết hợp hộp bánh răng hành tinh',
    weightVi: '4.2 kg / bộ',
    noiseLevelDb: 24,
    tagVi: 'Trầm Mặc Cổ Điển · Chốt Chặn Gió Bão',
    icon: '🏛️',
    tactileHandFeelVi: 'Xoay nắm quả trám tròn một góc 90 độ, bánh răng ăn khớp phát ra tiếng lách cách cơ khí chắc nịch đầy thỏa mãn.',
    craftsmanshipVi: 'Gia công bánh răng chuyển động ăn khớp chuẩn xác, chốt ngậm sâu 25mm vào dầm bê tông trên và sàn đá bên dưới.',
    descriptionVi:
      'Hệ then cài Cremone là biểu tượng của kiến trúc Đông Dương Indochine cao cấp. Dành cho các hệ cửa sổ và cửa đi ban công cao kịch trần 2.8m hướng bờ sông Sài Gòn, chịu được áp lực gió giật mùa mưa mà cánh cửa vẫn kín khít không rung lắc.',
    specs: {
      origin: 'Đúc thủ công nguyên chiếc tại xưởng đúc đồng truyền thống',
      finish: 'Đồng thau hun khói giả cổ (Antique Burnished Brass)',
      mechanism: 'Bánh răng kép chuyển đổi xoay thành tịnh tiến 2 chiều',
      lifespan: 'Kết cấu cơ khí vĩnh cửu theo tuổi thọ công trình',
    },
  },
}

export function TactileHardwareAtelier({ className }: { className?: string } = {}) {
  const [selectedId, setSelectedId] = useState<HardwareId>('brass-handle')
  const [soundTestMode, setSoundTestMode] = useState<'standard' | 'silent'>('silent')

  const currentItem = HARDWARE_DATA[selectedId] ?? HARDWARE_DATA['brass-handle']

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Điểm Chạm Xúc Giác · GuHomes Architectural Hardware
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Đồng Mộc Đúc May Đo
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Phòng Thí Nghiệm Kim Khí Đồng Mộc May Đo
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              Tay nắm cửa và then cài là nơi bàn tay chạm vào đầu tiên khi gia chủ bước vào nhà. Kim khí trong Quiet
              Luxury phải đầm chắc, để mộc tự tạo lớp patina trầm mặc và vận hành êm ru tuyệt đối.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Chuẩn độ ồn đóng cửa:</span>
            <span className="text-xs font-mono font-medium text-ink bg-canvas px-3 py-1.5 rounded-full border border-line">
              &lt; 18 dB · Silent Magnetic
            </span>
          </div>
        </div>

        {/* Acoustic Latch Sound Comparison Banner */}
        <div className="mt-8 rounded-2xl border border-line bg-canvas p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div>
            <span className="text-xs font-mono text-muted uppercase tracking-wider">
              Thử Nghiệm Âm Học Va Đập Khi Khép Cửa Ban Đêm
            </span>
            <div className="mt-1 font-serif text-lg text-ink font-normal">
              {soundTestMode === 'standard'
                ? 'Khóa Cơ Truyền Thống: 65 dB (Tiếng va đập kim loại cạch chói tai, dễ đánh thức trẻ nhỏ)'
                : 'Khóa Từ Tính Silent Magnetic GuHomes: 18 dB (Êm hơn tiếng thì thầm, tự hít êm ái)'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundTestMode('standard')}
              className={cn(
                'min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium transition-all',
                soundTestMode === 'standard'
                  ? 'bg-stone-800 text-stone-100 font-semibold'
                  : 'bg-surface hover:bg-surface-hover text-muted hover:text-ink border border-line'
              )}
            >
              Khóa Cơ Thông Thường (65 dB)
            </button>
            <button
              type="button"
              onClick={() => setSoundTestMode('silent')}
              className={cn(
                'min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium transition-all',
                soundTestMode === 'silent'
                  ? 'bg-accent text-canvas font-semibold shadow-sm'
                  : 'bg-surface hover:bg-surface-hover text-muted hover:text-ink border border-line'
              )}
            >
              Khóa Từ Tính GuHomes (18 dB)
            </button>
          </div>
        </div>

        {/* 4 Hardware Artifacts Selector Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(HARDWARE_DATA) as HardwareId[]).map((id) => {
            const item = HARDWARE_DATA[id]
            const isSelected = selectedId === id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(id)}
                className={cn(
                  'group relative text-left rounded-xl p-5 border transition-all duration-300 min-h-[170px] flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-accent/5 ring-1 ring-accent/30 shadow-md'
                    : 'border-line bg-canvas hover:border-line-hover hover:bg-surface/50'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{item.icon}</span>
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full border',
                        isSelected
                          ? 'border-accent/30 bg-accent/10 text-accent font-semibold'
                          : 'border-line text-muted'
                      )}
                    >
                      {item.weightVi}
                    </span>
                  </div>

                  <div className="mt-3 font-serif text-sm font-medium text-ink group-hover:text-accent leading-snug">
                    {item.nameVi}
                  </div>
                  <div className="mt-1 text-xs text-muted line-clamp-1">{item.tagVi}</div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeHardwareIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-accent"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Deep-Dive Tactile & Mechanical Display Stage */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Artifact & Tactile Note */}
          <div className="lg:col-span-6 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <span className="text-3xl">{currentItem.icon}</span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Tác Phẩm Kim Khí Số {currentItem.numberVi}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                    {currentItem.nameVi}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-muted font-light leading-relaxed">
                {currentItem.descriptionVi}
              </p>

              {/* Tactile Touch Sensation Card */}
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4 sm:p-5">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
                  <span>🖐️</span>
                  <span>Cảm Nhận Xúc Giác Khi Chạm Tay (Tactile Note)</span>
                </div>
                <p className="mt-2 text-sm text-ink font-serif italic leading-relaxed">
                  &ldquo;{currentItem.tactileHandFeelVi}&rdquo;
                </p>
              </div>

              {/* Craftsmanship Note */}
              <div className="mt-4 rounded-xl border border-line bg-surface/40 p-4 text-xs text-muted leading-relaxed">
                <span className="font-mono uppercase text-ink font-semibold text-[10px]">Quy Trình Chế Tác:</span>
                <p className="mt-1">{currentItem.craftsmanshipVi}</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex items-center justify-between text-xs text-muted">
              <span>Độ ồn cơ học: {currentItem.noiseLevelDb} dB</span>
              <span className="text-accent font-mono font-semibold">{currentItem.tagVi}</span>
            </div>
          </div>

          {/* Right Column: Engineering Specs & Hardware Customization */}
          <div className="lg:col-span-6 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="border-b border-line pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">Thông Số Kỹ Thuật Cơ Học</span>
                <h4 className="font-serif text-lg sm:text-xl text-ink font-normal mt-1">
                  Độ Bền Vượt Thời Gian
                </h4>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <span className="text-[10px] font-mono uppercase text-muted">Nguồn Gốc Chế Tác</span>
                  <div className="mt-1 text-xs font-medium text-ink leading-snug">{currentItem.specs.origin}</div>
                </div>

                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <span className="text-[10px] font-mono uppercase text-muted">Bề Mặt Hoàn Thiện</span>
                  <div className="mt-1 text-xs font-medium text-ink leading-snug">{currentItem.specs.finish}</div>
                </div>

                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <span className="text-[10px] font-mono uppercase text-muted">Cơ Chế Vận Hành</span>
                  <div className="mt-1 text-xs font-medium text-ink leading-snug">{currentItem.specs.mechanism}</div>
                </div>

                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <span className="text-[10px] font-mono uppercase text-muted">Tuổi Thọ &amp; Cam Kết</span>
                  <div className="mt-1 text-xs font-semibold text-accent leading-snug">{currentItem.specs.lifespan}</div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-line bg-surface/30 p-4 text-xs text-muted leading-relaxed">
                Tại Studio GuHomes có sẵn khay đựng phụ kiện kim khí đồng mộc để bạn trực tiếp cầm thử trọng lượng và
                thử cảm giác đóng mở cửa trước khi đặt làm.
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted">Gia công theo kích thước độ dày cánh cửa thực tế.</span>
              <a
                href="/contact"
                className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-canvas hover:bg-accent-hover transition-all"
              >
                <span>Thử Mẫu Kim Khí Tại Studio</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
