'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type LayerIndex = 1 | 2 | 3 | 4 | 5

interface SubfloorLayer {
  level: LayerIndex
  titleVi: string
  subtitleVi: string
  thicknessVi: string
  materialVi: string
  primaryFunctionVi: string
  engineeringMetricVi: string
  tagVi: string
  icon: string
  colorHex: string
  descriptionVi: string
}

const SUBFLOOR_LAYERS: Record<LayerIndex, SubfloorLayer> = {
  1: {
    level: 1,
    titleVi: 'Tầng 1: Lớp Sơn Lót Epoxy Thẩm Thấu Khóa Ẩm Nền Bê Tông',
    subtitleVi: 'Hydrostatic Concrete Moisture Barrier · Khóa Ẩm Ngược',
    thicknessVi: '0.3 - 0.5 mm',
    materialVi: 'Epoxy 2 thành phần gốc dung môi thẩm thấu sâu vào mao dẫn bê tông',
    primaryFunctionVi: 'Ngăn chặn 100% hơi nước và hơi ẩm kiềm tính từ sàn bê tông bốc lên',
    engineeringMetricVi: 'Chịu áp lực hơi nước > 15 lbs / 1000 sq ft / 24h',
    tagVi: 'Khóa Ẩm Tuyệt Đối · Nền Bê Tông Khô Ráo',
    icon: '💧',
    colorHex: '#4A5568',
    descriptionVi:
      'Tại TP.HCM, sàn bê tông cốt thép chung cư hoặc nền nhà phố luôn tích tụ hơi ẩm ngầm. Lớp sơn lót Epoxy thấm sâu 3-5mm vào vi lỗ rỗng của bê tông, tạo lớp màng tinh thể trơ khóa kín tuyệt đối mọi mao dẫn hơi nước, bảo vệ toàn bộ hệ sàn gỗ phía trên suốt nhiều thập kỷ.',
  },
  2: {
    level: 2,
    titleVi: 'Tầng 2: Màng Cao Su Butyl Giảm Chấn Âm Thanh Va Đập Delta Lw = 21dB',
    subtitleVi: 'Acoustic Decoupling & Impact Sound Insulation Mat',
    thicknessVi: '3.0 mm',
    materialVi: 'Cao su non Butyl tỉ trọng cao 850 kg/m³ phủ màng nhôm gia cường',
    primaryFunctionVi: 'Hấp thụ rung động tần số thấp, triệt tiêu tiếng bước chân dội xuống tầng dưới',
    engineeringMetricVi: 'Hệ số giảm âm va đập ΔLw = 21 dB (Chuẩn ISO 10140)',
    tagVi: 'Triệt Âm Va Đập · Bước Chân Êm Như Thảm Nhung',
    icon: '🔇',
    colorHex: '#2D3748',
    descriptionVi:
      'Âm thanh va đập từ giày cao gót hoặc trẻ nhỏ chạy nhảy là phiền toái lớn nhất trong các căn hộ cao cấp. Màng Butyl đóng vai trò một lớp đệm lò xo vi mô, ngắt cầu truyền âm giữa hệ kết cấu ván sàn và sàn bê tông nhà, duy trì sự tĩnh lặng tuyệt đối cho căn hộ bên dưới.',
  },
  3: {
    level: 3,
    titleVi: 'Tầng 3: Khung Xương Plywood Bạch Dương Nga Chịu Nước Sôi 72 Giờ',
    subtitleVi: 'WBP Phenolic Russian Birch Multi-Ply Structural Core',
    thicknessVi: '12.0 mm (9 lớp chéo sợi)',
    materialVi: 'Gỗ Bạch Dương Nga (Baltic Birch) ép keo chống nước Phenolic WBP chuẩn E0',
    primaryFunctionVi: 'Phân bổ đều tải trọng tập trung và triệt tiêu biến dạng vặn xoắn',
    engineeringMetricVi: 'Đạt chuẩn kiểm định ngâm nước sôi 72h không tách lớp',
    tagVi: 'Ổn Định Cấu Trúc · Không Cong Vênh Co Ngót',
    icon: '📐',
    colorHex: '#8C7853',
    descriptionVi:
      'Gỗ tự nhiên xẻ dày nếu dán trực tiếp lên bê tông sẽ bị giằng xé do độ co ngót khác nhau. Tầng Plywood Bạch Dương gồm 9 lớp thớ gỗ đan chéo vuông góc liên tục, hoạt động như một bộ khung chịu lực ổn định tuyệt đối, không co giật dù thời tiết Sài Gòn biến thiên từ mùa khô sang mùa mưa.',
  },
  4: {
    level: 4,
    titleVi: 'Tầng 4: Khe Thở Co Giãn Âm 15mm & Chân Nẹp Nhôm Âm Tường Flush',
    subtitleVi: 'Flush Shadowline Perimeter Expansion & Ventilation Reveal',
    thicknessVi: 'Khe co giãn 15.0 mm giấu âm',
    materialVi: 'Hợp kim nhôm Anodized chống oxy hóa gắn âm mặt dưới tấm thạch cao',
    primaryFunctionVi: 'Cho phép gỗ tự nhiên thở và tự do dãn nở theo mùa mà không cấn nứt',
    engineeringMetricVi: 'Biên độ dung sai co dãn tự do ±8mm toàn dải chu vi phòng',
    tagVi: 'Thẩm Mỹ Tối Giản · Không Dùng Phào Nẹp Lồi',
    icon: '📏',
    colorHex: '#A0AEC0',
    descriptionVi:
      'Các đơn vị thi công giá rẻ thường dùng len chân tường gỗ dán lồi ra ngoài tường gây bụi bẩn và che đậy thi công ẩu. GuHomes ứng dụng chi tiết chỉ âm chân tường (Shadow Gap 15mm) giấu khe co giãn sâu vào chân tường. Sàn gỗ lơ lửng tinh tế, vừa thở được tự nhiên vừa đạt đỉnh cao thẩm mỹ tối giản.',
  },
  5: {
    level: 5,
    titleVi: 'Tầng 5: Ván Sàn Gỗ Óc Chó / Teak Xẻ Tư Lau Dầu Osmo Đức',
    subtitleVi: 'Quarter-Sawn Solid Timber Top Layer · Natural Osmo Polyx-Oil',
    thicknessVi: '18.0 mm (Nguyên khối gỗ tuyển chọn FAS)',
    materialVi: 'Gỗ Óc chó Bắc Mỹ hoặc Gỗ Teak Myanmar xẻ tư (Quarter Sawn)',
    primaryFunctionVi: 'Mang lại xúc cảm ấm áp, tiếp xúc trực tiếp chân trần thượng lưu',
    engineeringMetricVi: 'Hoàn thiện 2 lớp dầu sáp cứng Osmo 3032 chuẩn an toàn thực phẩm',
    tagVi: 'Đỉnh Cao Xúc Giác · Lão Hóa Càng Đẹp',
    icon: '🪵',
    colorHex: '#5C4033',
    descriptionVi:
      'Bề mặt trên cùng là những thanh gỗ tự nhiên xẻ tư với thớ vân thẳng tắp giúp hạn chế tối đa độ co ngót theo phương ngang. Lớp phủ không phải sơn PU bóng bẩy bịt kín lỗ thở, mà là dầu thực vật sáp ong Osmo của Đức thẩm thấu sâu, để mỗi bước chân trần chạm vào là chạm vào sự sống của thớ gỗ.',
  },
}

export function SubfloorAcousticMoistureShield({ className }: { className?: string } = {}) {
  const [selectedLayer, setSelectedLayer] = useState<LayerIndex>(5)
  const [soundMode, setSoundMode] = useState<'traditional' | 'guhomes'>('guhomes')

  const currentLayer = SUBFLOOR_LAYERS[selectedLayer]

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-canvas border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Kỹ Nghệ Thi Công Âm Thổ · GuHomes Flooring Lab
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                5 Tầng Bảo Vệ Toàn Diện
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Công Nghệ Sàn Gỗ 5 Tầng Âm Thổ &amp; Khóa Ẩm Nồm
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              Độ ẩm ngầm từ bê tông và tiếng ồn va đập là hai thách thức lớn nhất của sàn gỗ nhiệt đới. Hệ sàn 5 tầng
              GuHomes kết hợp màng khóa ẩm Epoxy, cao su Butyl giảm chấn và gỗ tự nhiên xẻ tư.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Chứng nhận kiểm âm:</span>
            <span className="text-xs font-mono font-medium text-ink bg-surface px-3 py-1.5 rounded-full border border-line">
              ΔLw = 21dB · WBP Boil 72h
            </span>
          </div>
        </div>

        {/* Footstep Sound Comparison Banner */}
        <div className="mt-8 rounded-2xl border border-line bg-surface/50 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono text-muted uppercase tracking-wider">
              Thử Nghiệm Thực Tế Tiếng Ồn Va Đập Bước Chân (Impact Sound Test)
            </span>
            <div className="mt-1 font-serif text-lg text-ink font-normal">
              {soundMode === 'traditional'
                ? 'Sàn Dán Keo Trực Tiếp Truyền Thống: 68 dB (Tiếng cọt kẹt, dội âm xuống tầng dưới)'
                : 'Sàn 5 Tầng GuHomes Âm Thổ: 36 dB (Tĩnh lặng êm ái như bước trên thảm nhung)'}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundMode('traditional')}
              className={cn(
                'min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium transition-all',
                soundMode === 'traditional'
                  ? 'bg-stone-800 text-stone-100 font-semibold'
                  : 'bg-surface hover:bg-surface-hover text-muted hover:text-ink border border-line'
              )}
            >
              Sàn Dán Keo Thường (68 dB)
            </button>
            <button
              type="button"
              onClick={() => setSoundMode('guhomes')}
              className={cn(
                'min-h-[44px] px-4 py-2 rounded-xl text-xs font-medium transition-all',
                soundMode === 'guhomes'
                  ? 'bg-accent text-canvas font-semibold shadow-sm'
                  : 'bg-surface hover:bg-surface-hover text-muted hover:text-ink border border-line'
              )}
            >
              Sàn 5 Tầng GuHomes (36 dB)
            </button>
          </div>
        </div>

        {/* 5-Layer Cross-Section Exploder Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive 5-Layer Visual Stack */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            {([5, 4, 3, 2, 1] as LayerIndex[]).map((lvl) => {
              const layer = SUBFLOOR_LAYERS[lvl]
              const isSelected = selectedLayer === lvl

              return (
                <button
                  key={layer.level}
                  type="button"
                  onClick={() => setSelectedLayer(lvl)}
                  className={cn(
                    'group relative text-left rounded-xl p-4 sm:p-5 border transition-all duration-300 flex items-center justify-between',
                    isSelected
                      ? 'border-accent bg-accent/5 ring-1 ring-accent/30 shadow-md'
                      : 'border-line bg-canvas hover:border-line-hover hover:bg-surface/60'
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg',
                        isSelected ? 'bg-accent text-canvas' : 'bg-surface text-ink'
                      )}
                    >
                      {layer.icon}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-semibold uppercase text-accent">
                          Tầng {layer.level}
                        </span>
                        <span className="text-xs text-muted">· {layer.thicknessVi}</span>
                      </div>
                      <div className="font-serif text-sm sm:text-base font-medium text-ink group-hover:text-accent">
                        {layer.titleVi.replace(/Tầng \d: /, '')}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2 py-0.5 rounded-full border',
                        isSelected
                          ? 'border-accent/30 bg-accent/10 text-accent font-semibold'
                          : 'border-line text-muted'
                      )}
                    >
                      {layer.level === 5 ? 'Ván Gỗ Solid' : layer.level === 4 ? 'Chân Âm 15mm' : layer.level === 3 ? 'Plywood WBP' : layer.level === 2 ? 'Màng Butyl' : 'Epoxy Khóa Ẩm'}
                    </span>
                  </div>

                  {isSelected && (
                    <motion.div
                      layoutId="activeSubfloorLayerIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-accent"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Column: Layer Detailed Deep-Dive & Physics */}
          <div className="lg:col-span-6 rounded-2xl border border-line bg-surface/50 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-line pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentLayer.icon}</span>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                      Chi Tiết Cấu Tạo Tầng {currentLayer.level} / 5
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl text-ink font-normal">
                      {currentLayer.titleVi}
                    </h3>
                  </div>
                </div>

                <span className="text-xs font-mono bg-canvas px-3 py-1 rounded-full border border-line text-ink">
                  Độ dày: {currentLayer.thicknessVi}
                </span>
              </div>

              <p className="mt-4 text-sm sm:text-base text-muted font-light leading-relaxed">
                {currentLayer.descriptionVi}
              </p>

              {/* Engineering Specs Matrix */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="rounded-xl border border-line bg-canvas p-4">
                  <span className="text-[11px] font-mono uppercase text-muted">Vật liệu cấu thành</span>
                  <div className="mt-1 text-xs font-medium text-ink leading-snug">{currentLayer.materialVi}</div>
                </div>

                <div className="rounded-xl border border-line bg-canvas p-4">
                  <span className="text-[11px] font-mono uppercase text-muted">Chỉ số kỹ thuật đo kiểm</span>
                  <div className="mt-1 text-xs font-semibold text-accent leading-snug">
                    {currentLayer.engineeringMetricVi}
                  </div>
                </div>

                <div className="rounded-xl border border-line bg-canvas p-4 sm:col-span-2">
                  <span className="text-[11px] font-mono uppercase text-muted">Chức năng cơ học cốt lõi</span>
                  <div className="mt-1 text-xs font-normal text-muted leading-relaxed">
                    {currentLayer.primaryFunctionVi}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 10-Year Warranty Guarantee */}
            <div className="mt-8 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="text-accent font-bold">✓</span>
                <span>Bảo hành chống phồng rộp, kêu cọt kẹt: 10 Năm trọn vẹn</span>
              </div>

              <a
                href="/du-toan-chi-phi"
                className="min-h-[44px] inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-canvas hover:bg-accent-hover transition-all"
              >
                <span>Bóc Tách Chi Phí Sàn 5 Tầng</span>
                <ArrowUpRightIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
