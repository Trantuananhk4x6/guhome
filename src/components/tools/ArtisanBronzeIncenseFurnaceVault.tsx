'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type FurnaceViewAngle = 'front-dragon' | 'profile-handles' | 'qilin-lid' | 'tripod-feet'

interface AngleOption {
  id: FurnaceViewAngle
  name: string
  craftsmanship: string
  inlayMaterials: string
  reflection: string
}

const VIEW_ANGLES: Record<FurnaceViewAngle, AngleOption> = {
  'front-dragon': {
    id: 'front-dragon',
    name: 'Chính Diện: Lưỡng Long Chầu Nguyệt',
    craftsmanship: 'Đục sâu 3.5mm vào thân đồng đỏ nguyên khối, khảm sợi bạc 925 và vàng lá 9999 tạo hình đôi rồng thời Lê uốn khúc thanh thoát.',
    inlayMaterials: 'Vàng 9999 • Bạc 925 • Đồng đỏ mắt cua',
    reflection: 'from-amber-500/80 via-yellow-200 to-amber-700',
  },
  'profile-handles': {
    id: 'profile-handles',
    name: 'Góc Nghiêng: Đôi Quai Mây Cuộn Rồng Bay',
    craftsmanship: 'Đúc liền khối không mối hàn, bề mặt gọt giũa tỉ mỉ từng vảy rồng và phiến mây lửa cuồn cuộn biểu trưng quyền lực gia chủ.',
    inlayMaterials: 'Đồng đỏ đặc tính dẻo dai nguyên khối',
    reflection: 'from-amber-600/70 via-stone-300 to-amber-900',
  },
  'qilin-lid': {
    id: 'qilin-lid',
    name: 'Nắp Đỉnh: Tượng Lân Vờn Ngọc Nhả Khói',
    craftsmanship: 'Lân đồng đúc rỗng thông khí, miệng hé mở để khói trầm hương Khánh Hòa thoát ra thành luồng mây mỏng lượn bốn phương.',
    inlayMaterials: 'Mắt lân nạm ngọc lưu ly xanh biếc',
    reflection: 'from-yellow-400/80 via-amber-300 to-amber-800',
  },
  'tripod-feet': {
    id: 'tripod-feet',
    name: 'Đáy Ba Chân Quỳ Mặt Hổ Phù',
    craftsmanship: 'Ba chân quỳ vững chãi tựa bàn thạch, chạm khắc mặt hổ phù uy nghiêm trừ tà khí, tích tụ vượng khí tài lộc cho dinh thự.',
    inlayMaterials: 'Chân đồng đỏ nguyên khối đúc mẫu sáp',
    reflection: 'from-amber-800 via-stone-800 to-black',
  },
}

type SmokeDensity = 'gentle' | 'rich' | 'imperial'

interface SmokeSetting {
  id: SmokeDensity
  label: string
  durationHours: number
  description: string
  smokeOpacity: string
}

const SMOKE_SETTINGS: Record<SmokeDensity, SmokeSetting> = {
  gentle: {
    id: 'gentle',
    label: 'Khói Dịu Thanh Thoát (4 Giờ)',
    durationHours: 4,
    description: 'Khói mỏng bảng lảng như sương sớm, thích hợp cho phòng thiền trà hoặc bàn làm việc tĩnh tâm.',
    smokeOpacity: 'opacity-40 scale-100',
  },
  rich: {
    id: 'rich',
    label: 'Hương Trầm Đậm Đà (6 Giờ)',
    durationHours: 6,
    description: 'Hương trầm kiến ngọt sâu tỏa khắp phòng khách biệt thự, thanh tẩy không gian và xua tan ẩm mốc mùa mưa.',
    smokeOpacity: 'opacity-70 scale-110',
  },
  imperial: {
    id: 'imperial',
    label: 'Dạ Yến Cung Đình (8 Giờ)',
    durationHours: 8,
    description: 'Khói trầm cuồn cuộn thoát qua miệng lân bốn hướng, tạo không khí vương giả trang trọng trong các dạ tiệc lớn.',
    smokeOpacity: 'opacity-95 scale-125',
  },
}

export function ArtisanBronzeIncenseFurnaceVault({ className }: { className?: string }) {
  const componentId = useId()

  const [activeView, setActiveView] = useState<FurnaceViewAngle>('front-dragon')
  const [smokeLevel, setSmokeLevel] = useState<SmokeDensity>('rich')
  const [isSmoking, setIsSmoking] = useState<boolean>(true)
  const [inscribedName, setInscribedName] = useState<string>('Gia Tộc Hưng Thịnh')
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  const currentAngleOpt = VIEW_ANGLES[activeView]
  const currentSmokeOpt = SMOKE_SETTINGS[smokeLevel]

  return (
    <section
      aria-labelledby={`heading-${componentId}`}
      className={cn('u-gutter py-16 md:py-24 transition-colors duration-700 bg-stone-950 text-stone-100', className)}
    >
      <div className="mx-auto max-w-[110rem] space-y-12">
        {/* Header Block */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-stone-800/80 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono tracking-wider uppercase text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Haute Fonderie d&apos;Art • Tam Khí Bronze &amp; Gold Inlay
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Bộ Đỉnh Đồng Tam Khí Khảm Vàng Bạc &amp; Hoa Văn Mây Lửa Đại Việt
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Tác phẩm đỉnh đồng ba chân đúc thủ công theo phương pháp đúc mẫu sáp truyền thống từ đồng đỏ mắt cua nguyên khối. Nghệ nhân khảm tam khí (Vàng 9999, Bạc 925, Đồng đỏ) chạm khắc rồng chầu mặt nguyệt và hoa văn mây lửa thời Hậu Lê. Nắp tượng lân vờn ngọc xông khói trầm Khánh Hòa tỏa khắp bốn phương, giữ than củi không tắt suốt 6 - 8 giờ.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Dự Toán Chế Tác Đỉnh Đồng
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Interactive 360 Visual Stage & Customization */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive 360 Furnace Stage */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 bg-stone-900/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Góc Quan Sát</span>
                    <span className="text-xs font-mono font-medium text-amber-400">{currentAngleOpt.name.split(':')[0]}</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Khảm Tam Khí</span>
                    <span className="text-xs font-mono text-stone-200">Vàng 9999 • Bạc 925</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSmoking(!isSmoking)}
                  className={cn(
                    'px-3 py-1.5 font-mono text-[11px] uppercase transition-all border min-h-[44px] flex items-center gap-1.5',
                    isSmoking
                      ? 'border-amber-400 text-amber-300 bg-amber-500/10'
                      : 'border-stone-700 text-stone-400 hover:text-stone-200'
                  )}
                >
                  <span>💨</span>
                  {isSmoking ? 'Khói Trầm ON' : 'Tắt Khói'}
                </button>
              </div>

              {/* Center Bronze Furnace Model Simulation */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                {/* Simulated Bronze Furnace Body */}
                <div className="relative w-48 sm:w-60 h-44 sm:h-52 flex flex-col items-center justify-between">
                  {/* Qilin Lid Top */}
                  <div className="relative w-16 h-10 rounded-t-full bg-gradient-to-t from-amber-700 to-amber-500 border border-amber-300 shadow-md flex items-center justify-center">
                    <span className="text-xs">🦁</span>
                    {/* Smoke Emitter through Qilin's Mouth */}
                    {isSmoking && (
                      <div className={cn('absolute -top-12 inset-x-0 flex justify-center pointer-events-none transition-all duration-700', currentSmokeOpt.smokeOpacity)}>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-t from-white/30 via-white/10 to-transparent blur-md animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Main Furnace Belly (Bụng Đỉnh) */}
                  <div className="relative w-full h-28 rounded-2xl bg-gradient-to-r from-amber-900 via-stone-800 to-amber-950 border-2 border-amber-500/60 shadow-2xl flex flex-col items-center justify-center px-4">
                    {/* Inlay pattern visual simulation */}
                    <div className="w-full flex justify-between items-center text-[10px] font-serif text-amber-200/90 border-y border-amber-500/30 py-1">
                      <span>🐉 HẬU LÊ</span>
                      <span className="font-mono text-[9px] text-amber-400">{inscribedName}</span>
                      <span>🐉 TAM KHÍ</span>
                    </div>

                    <div className="text-[9px] font-mono text-stone-400 mt-1">
                      Mã Bảo Vật: GU-FURNACE-2026-X
                    </div>
                  </div>

                  {/* Tripod Feet (3 Chân Quỳ) */}
                  <div className="w-full flex justify-between px-6 pt-1">
                    <div className="w-4 h-8 bg-amber-800 border-l border-amber-500 rounded-b-md shadow-lg" />
                    <div className="w-4 h-8 bg-amber-700 border-x border-amber-500 rounded-b-md shadow-lg" />
                    <div className="w-4 h-8 bg-amber-800 border-r border-amber-500 rounded-b-md shadow-lg" />
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar inside Stage */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">Chi Tiết Điêu Khắc</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentAngleOpt.name}</h3>
                  </div>
                  <span className="text-xs font-mono text-stone-300">{currentAngleOpt.inlayMaterials}</span>
                </div>
                <p className="text-xs text-stone-400 font-light leading-relaxed">{currentAngleOpt.craftsmanship}</p>
              </div>
            </div>

            {/* View Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(VIEW_ANGLES) as FurnaceViewAngle[]).map((angleKey) => {
                const opt = VIEW_ANGLES[angleKey]
                const isActive = angleKey === activeView
                return (
                  <button
                    key={angleKey}
                    type="button"
                    onClick={() => setActiveView(angleKey)}
                    className={cn(
                      'p-2.5 border text-center transition-all min-h-[44px]',
                      isActive
                        ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <span className="text-xs font-mono block truncate">{opt.name.split(':')[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Smoke Density, Custom Inscription & Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
              {/* Smoke Density Selector */}
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  1. Chế Độ Xông Trầm &amp; Thời Lượng Cháy
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(Object.keys(SMOKE_SETTINGS) as SmokeDensity[]).map((key) => {
                    const setting = SMOKE_SETTINGS[key]
                    const isSelected = key === smokeLevel
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSmokeLevel(key)}
                        className={cn(
                          'p-3 border text-left transition-all min-h-[44px]',
                          isSelected
                            ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                            : 'border-stone-800 hover:border-stone-700 bg-stone-950/40 text-stone-400'
                        )}
                      >
                        <div className="text-xs font-semibold text-stone-200">{setting.label.split('(')[0]}</div>
                        <div className="text-[10px] font-mono text-amber-400 mt-0.5">{setting.durationHours} Giờ Cháy</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Inscription (Khắc Minh Văn Gia Phả) */}
              <div className="space-y-2 pt-4 border-t border-stone-800">
                <label htmlFor={`inscribe-${componentId}`} className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                  2. Khắc Minh Văn Gia Phả / Tên Dòng Họ (Khảm Bạc 925)
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    id={`inscribe-${componentId}`}
                    type="text"
                    maxLength={24}
                    value={inscribedName}
                    onChange={(e) => setInscribedName(e.target.value)}
                    placeholder="VD: Gia Tộc Hưng Thịnh"
                    aria-label="Nhập dòng chữ minh văn khảm lên thân đỉnh đồng"
                    className="flex-1 bg-stone-950 border border-stone-700 px-3 py-2 text-sm font-serif tracking-wide text-amber-400 focus:border-amber-400 outline-none min-h-[44px]"
                  />
                </div>
                <span className="text-[11px] text-stone-400 font-light block">
                  Được khảm chìm bằng sợi bạc nguyên chất 925 dày 1.2mm bền vững trăm năm.
                </span>
              </div>

              {/* Master Caster Specs */}
              <div className="pt-4 border-t border-stone-800 space-y-2 text-xs text-stone-300">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  Quy Chuẩn Đúc Đồng Tam Khí GuHomes
                </span>
                <div className="p-3 border border-stone-800 bg-stone-950/50 space-y-1 text-[11px] text-stone-400">
                  <div>• Trọng lượng đồng đỏ: 28.5 kg đồng mắt cua nguyên chất.</div>
                  <div>• Khảm quý kim: 1.5 chỉ vàng 9999 &amp; 3.2 lượng bạc 925.</div>
                  <div>• Buồng đốt lót gốm sa mốt chịu nhiệt 1.400°C giữ nhiệt bền bỉ.</div>
                </div>
              </div>

              {/* Registration */}
              <div className="pt-4 border-t border-stone-800">
                {isRegistered ? (
                  <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Đã ghi nhận yêu cầu đúc đỉnh đồng tam khí khắc minh văn &ldquo;{inscribedName}&rdquo;. Nghệ nhân đúc đồng Ý Yên sẽ gửi bản rập chữ và hoa văn rồng 3D trong 24 giờ.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsRegistered(true)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px]"
                  >
                    Đăng Ký Đúc Đỉnh Đồng Khảm Tam Khí
                  </button>
                )}
              </div>
            </div>

            {/* Quick Contact Link */}
            <div className="p-5 border border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Trưng Bày Tại Không Gian Thờ Tự Dinh Thự
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  KTS phong thủy GuHomes tư vấn hướng tọa lạc và độ cao bệ đá chuẩn thước Lỗ Ban.
                </p>
              </div>
              <Link
                href="/contact"
                className="whitespace-nowrap px-4 py-2 border border-stone-700 text-stone-300 hover:border-amber-400 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Tư Vấn Phong Thủy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
