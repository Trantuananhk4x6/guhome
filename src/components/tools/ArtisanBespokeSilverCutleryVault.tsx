'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type AngleView = 'front' | 'angled' | 'handle' | 'hallmark'

interface ViewAngleOption {
  id: AngleView
  label: string
  detail: string
  reflection: string
}

const VIEW_ANGLES: Record<AngleView, ViewAngleOption> = {
  front: {
    id: 'front',
    label: 'Chính Diện (Góc Nhìn 0°)',
    detail: 'Tỷ lệ cân đối công thái học chuẩn fine dining: lòng thìa sâu vừa vặn, răng nĩa thuôn thanh tú, lưỡi dao vát sắc bén.',
    reflection: 'from-slate-200/90 via-stone-300 to-slate-400',
  },
  angled: {
    id: 'angled',
    label: 'Góc Nghiêng 45° (Phản Quang Bạc)',
    detail: 'Độ phản chiếu quang học 98% qua lớp đánh bóng bột ngọc trai tự nhiên, không để lại vi vết xước cơ học.',
    reflection: 'from-white via-slate-200 to-stone-400',
  },
  handle: {
    id: 'handle',
    label: 'Chuôi Mun Sừng Khánh Hòa',
    detail: 'Thớ gỗ Mun sừng đen tuyền nguyên khối qua hàng trăm năm, bóng như gương tự nhiên, mộng đồng thau khép kín 0.02mm.',
    reflection: 'from-stone-800 via-stone-900 to-black',
  },
  hallmark: {
    id: 'hallmark',
    label: 'Triện Bạc 925 Định Công',
    detail: 'Dấu triện hoa sen và chữ số 925 dập chìm bằng búa tay nghệ nhân làng bạc cổ truyền Định Công 1.500 năm tuổi.',
    reflection: 'from-amber-200/70 via-slate-300 to-stone-400',
  },
}

type BanquetScale = '6pax' | '12pax' | '18pax'

interface BanquetPreset {
  id: BanquetScale
  name: string
  pieces: number
  silverWeightGrams: number
  artisanHours: number
  recommendedFor: string
}

const BANQUET_PRESETS: Record<BanquetScale, BanquetPreset> = {
  '6pax': {
    id: '6pax',
    name: 'Dạ Yến Thân Mật (6 Khách)',
    pieces: 24,
    silverWeightGrams: 1850,
    artisanHours: 160,
    recommendedFor: 'Phòng ăn gia đình & các buổi đón tiếp khách quý thân mật',
  },
  '12pax': {
    id: '12pax',
    name: 'Đại Tiệc Hoàng Gia (12 Khách)',
    pieces: 48,
    silverWeightGrams: 3700,
    artisanHours: 320,
    recommendedFor: 'Phòng dạ tiệc biệt thự & penthouse chuẩn Fine Dining quốc tế',
  },
  '18pax': {
    id: '18pax',
    name: 'Yến Tiệc Gia Tộc (18 Khách)',
    pieces: 72,
    silverWeightGrams: 5550,
    artisanHours: 480,
    recommendedFor: 'Dinh thự gia tộc, sự kiện vương giả truyền đời nhiều thế hệ',
  },
}

export function ArtisanBespokeSilverCutleryVault({ className }: { className?: string }) {
  const componentId = useId()

  const [activeAngle, setActiveAngle] = useState<AngleView>('front')
  const [banquetScale, setBanquetScale] = useState<BanquetScale>('12pax')
  const [monogram, setMonogram] = useState<string>('GU')
  const [isZoom20x, setIsZoom20x] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const currentView = VIEW_ANGLES[activeAngle]
  const currentBanquet = BANQUET_PRESETS[banquetScale]

  return (
    <section
      aria-labelledby={`heading-${componentId}`}
      className={cn('u-gutter py-16 md:py-24 transition-colors duration-700 bg-stone-950 text-stone-100', className)}
    >
      <div className="mx-auto max-w-[110rem] space-y-12">
        {/* Header Block */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-stone-800/80 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-slate-400/30 bg-slate-500/10 text-xs font-mono tracking-wider uppercase text-slate-300">
              <span className="w-2 h-2 rounded-full bg-slate-200 animate-pulse" />
              Haute Orfèvrerie • Định Công Silver 925 &amp; Mun Wood
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Bộ Dao Thìa Bạc 925 Gò Tay Thủ Công &amp; Chuôi Mun Sừng Khánh Hòa
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Bộ đồ ăn dạ yến 24 - 72 món gò từ bạc nguyên chất 925 chuẩn Định Công kết hợp chuôi cầm gỗ Mun sừng nguyên khối. Đánh bóng gương bằng bột ngọc trai tự nhiên, phát huy đặc tính kháng khuẩn ion bạc Ag+ bảo vệ sức khỏe và lưu giữ giá trị gia bảo trường tồn trong hộp gỗ Óc Chó lót da cừu nhung.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-slate-200 text-stone-950 hover:bg-white transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Bóc Tách Chi Phí Bộ Bạc
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Cutlery Viewer & Bespoke Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 360 Cutlery Interactive Stage */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 bg-stone-900/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Top Meta Bar inside Stage */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Góc Quan Sát</span>
                    <span className="text-xs font-mono font-medium text-slate-200">{currentView.label}</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Tinh Khiết</span>
                    <span className="text-xs font-mono text-emerald-400">Bạc 925 Định Công (92.5% Ag)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsZoom20x(!isZoom20x)}
                  className={cn(
                    'px-3 py-1.5 font-mono text-[11px] uppercase transition-all border min-h-[44px] flex items-center gap-1.5',
                    isZoom20x
                      ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                      : 'border-stone-700 text-stone-400 hover:text-stone-200'
                  )}
                >
                  <span>🔍</span>
                  {isZoom20x ? 'Kính 20x ON' : 'Soi Kính 20x'}
                </button>
              </div>

              {/* Center Cutlery Model Simulation */}
              <div className="relative my-auto flex flex-col items-center justify-center py-6">
                <div
                  className={cn(
                    'relative w-72 sm:w-96 h-40 border border-stone-800 rounded-none bg-stone-950/80 flex items-center justify-center p-4 transition-all duration-700 shadow-2xl',
                    isZoom20x ? 'scale-125 border-amber-500/50' : 'scale-100'
                  )}
                >
                  {/* Simulated Silver Knife, Fork, Spoon Layout */}
                  <div className="flex items-center justify-center gap-6 sm:gap-8">
                    {/* Spoon */}
                    <div className="flex flex-col items-center group">
                      <div
                        className={cn(
                          'w-6 h-12 rounded-full border border-slate-300 shadow-lg bg-gradient-to-tr transition-all duration-500',
                          currentView.reflection
                        )}
                      />
                      <div className="w-1.5 h-16 bg-gradient-to-b from-slate-300 via-stone-400 to-stone-900 border-x border-stone-700" />
                      <div className="w-2.5 h-10 bg-stone-900 border border-stone-700 rounded-b-sm flex items-center justify-center">
                        <span className="text-[7px] font-mono text-amber-400 font-bold">{monogram.slice(0, 2)}</span>
                      </div>
                    </div>

                    {/* Fork */}
                    <div className="flex flex-col items-center">
                      <div className="flex justify-between w-6 h-12 pt-1 border-t-2 border-slate-300">
                        <div className="w-0.5 h-8 bg-slate-200" />
                        <div className="w-0.5 h-8 bg-slate-200" />
                        <div className="w-0.5 h-8 bg-slate-200" />
                        <div className="w-0.5 h-8 bg-slate-200" />
                      </div>
                      <div className="w-1.5 h-16 bg-gradient-to-b from-slate-300 via-stone-400 to-stone-900 border-x border-stone-700" />
                      <div className="w-2.5 h-10 bg-stone-900 border border-stone-700 rounded-b-sm flex items-center justify-center">
                        <span className="text-[7px] font-mono text-amber-400 font-bold">{monogram.slice(0, 2)}</span>
                      </div>
                    </div>

                    {/* Knife */}
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'w-4 h-14 rounded-tr-xl border-l-2 border-slate-200 shadow-md bg-gradient-to-br transition-all duration-500',
                          currentView.reflection
                        )}
                      />
                      <div className="w-2 h-14 bg-gradient-to-b from-slate-300 via-stone-400 to-stone-900 border-x border-stone-700" />
                      <div className="w-3 h-12 bg-stone-900 border border-stone-700 rounded-b-sm flex items-center justify-center">
                        <span className="text-[7px] font-mono text-amber-400 font-bold">{monogram.slice(0, 2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 20x Magnifier Overlay with Hallmark Details */}
                  {isZoom20x && (
                    <div className="absolute inset-0 bg-stone-950/90 backdrop-blur-md p-4 flex flex-col justify-center items-center text-center animate-fadeIn border border-amber-500/40">
                      <div className="w-16 h-16 rounded-full border-2 border-amber-400/80 flex flex-col items-center justify-center bg-stone-900 shadow-inner">
                        <span className="text-[10px] font-serif text-amber-300 font-bold">925</span>
                        <span className="text-[8px] font-mono text-amber-400">ĐỊNH CÔNG</span>
                      </div>
                      <p className="text-xs text-stone-200 mt-2 font-medium">Vết Búa Gò Thủ Công Đồng Tâm</p>
                      <p className="text-[11px] text-stone-400 font-light mt-0.5">
                        Mật độ bạc được nén chặt bằng 18.000 nhát búa tay • Kháng khuẩn Ion Ag+ đạt 99.9%
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Info Bar inside Stage */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">Chi Tiết Quan Sát</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentView.label}</h3>
                  </div>
                  <span className="text-xs font-mono text-amber-400">Mã Chứng Thư: GU-SILVER-2026-X</span>
                </div>
                <p className="text-xs text-stone-400 font-light leading-relaxed">{currentView.detail}</p>
              </div>
            </div>

            {/* View Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(VIEW_ANGLES) as AngleView[]).map((angleKey) => {
                const opt = VIEW_ANGLES[angleKey]
                const isActive = angleKey === activeAngle
                return (
                  <button
                    key={angleKey}
                    type="button"
                    onClick={() => setActiveAngle(angleKey)}
                    className={cn(
                      'p-2.5 border text-center transition-all min-h-[44px]',
                      isActive
                        ? 'border-slate-300 bg-slate-500/15 text-stone-100'
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <span className="text-xs font-mono block">{opt.label.split('(')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Bespoke Customizer & Calculation Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                  1. Chọn Quy Mô Bàn Tiệc &amp; Số Món Bạc
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(Object.keys(BANQUET_PRESETS) as BanquetScale[]).map((key) => {
                    const preset = BANQUET_PRESETS[key]
                    const isSelected = key === banquetScale
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setBanquetScale(key)}
                        className={cn(
                          'p-3 border text-left transition-all min-h-[44px]',
                          isSelected
                            ? 'border-slate-300 bg-slate-500/15 text-stone-100'
                            : 'border-stone-800 hover:border-stone-700 bg-stone-950/40 text-stone-400'
                        )}
                      >
                        <div className="text-xs font-semibold text-stone-200">{preset.name.split('(')[0]}</div>
                        <div className="text-[10px] font-mono text-amber-400 mt-0.5">{preset.pieces} Món Bạc</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Monogram Engraving */}
              <div className="space-y-2 pt-4 border-t border-stone-800">
                <label htmlFor={`monogram-${componentId}`} className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                  2. Khắc Gia Huy / Chữ Cái Gia Tộc (Monogram)
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    id={`monogram-${componentId}`}
                    type="text"
                    maxLength={4}
                    value={monogram}
                    onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                    placeholder="VD: GU, NGUYEN"
                    aria-label="Nhập chữ cái gia tộc khắc lên chuôi mun sừng"
                    className="w-32 bg-stone-950 border border-stone-700 px-3 py-2 text-center text-sm font-mono tracking-widest text-amber-400 uppercase focus:border-amber-400 outline-none min-h-[44px]"
                  />
                  <span className="text-xs text-stone-400 font-light">
                    Khắc chìm laze sợi quang &amp; nạm chỉ bạc 999 vào chuôi Mun sừng
                  </span>
                </div>
              </div>

              {/* Summary Calculations */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  Thông Số Chế Tác Độc Bản
                </span>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 border border-stone-800 bg-stone-950/50">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">Trọng Lượng Bạc 925</span>
                    <span className="text-lg font-mono text-slate-200 font-medium">
                      {currentBanquet.silverWeightGrams.toLocaleString()} g
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Khoảng {(currentBanquet.silverWeightGrams / 37.5).toFixed(1)} lượng bạc</span>
                  </div>

                  <div className="p-3 border border-stone-800 bg-stone-950/50">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">Thời Gian Gò Búa</span>
                    <span className="text-lg font-mono text-slate-200 font-medium">
                      {currentBanquet.artisanHours} Giờ
                    </span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Nghệ nhân Định Công gò tay</span>
                  </div>
                </div>

                <div className="p-3 border border-stone-800 bg-stone-950/50 text-[11px] text-stone-400 font-light space-y-1">
                  <div>• Hộp bảo quản: Gỗ Óc Chó Bắc Mỹ lót da cừu nhung Ý khử lưu huỳnh.</div>
                  <div>• Kháng khuẩn tự nhiên: Triệt tiêu 99.9% vi khuẩn đường ruột (E. coli, Salmonella).</div>
                  <div>• Chứng thư kiểm định: Kèm mã QR tra cứu nguồn gốc bạc và nghệ nhân chế tác.</div>
                </div>
              </div>

              {/* Request Form Submission */}
              <div className="pt-4 border-t border-stone-800">
                {isSubmitted ? (
                  <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Đã ghi nhận yêu cầu chế tác bộ {currentBanquet.name} khắc gia huy &ldquo;{monogram}&rdquo;. Nghệ nhân GuHomes sẽ liên hệ gửi bản vẽ 3D trong 24 giờ.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(true)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px]"
                  >
                    Đăng Ký Đúc Mẫu Thử &amp; Khắc Dấu Gia Huy
                  </button>
                )}
              </div>
            </div>

            {/* Quick Contact Link */}
            <div className="p-5 border border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-slate-300 tracking-wider">
                  Trưng Bày Mẫu Thật Tại Studio
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Mời quý gia chủ ghé thăm xưởng Định Công và cầm thử cảm giác đầm tay của chuôi Mun sừng.
                </p>
              </div>
              <Link
                href="/contact"
                className="whitespace-nowrap px-4 py-2 border border-stone-700 text-stone-300 hover:border-slate-400 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Đặt Lịch Hẹn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
