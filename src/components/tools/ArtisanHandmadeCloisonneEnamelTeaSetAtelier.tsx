'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type EnamelColorPalette = 'men-hoang-gia' | 'men-thanh-lam' | 'men-hong-hac'

interface EnamelTheme {
  id: EnamelColorPalette
  name: string
  subname: string
  firingTemp: string
  symbolism: string
  wireMaterial: string
  enamelMinerals: string
  bgColor: string
  accentColor: string
  motifName: string
}

const ENAMEL_THEMES: Record<EnamelColorPalette, EnamelTheme> = {
  'men-hoang-gia': {
    id: 'men-hoang-gia',
    name: 'Men Hoàng Gia · Ngũ Trảo Long',
    subname: 'Sắc Vàng Kim & Họa Tiết Rồng Mây Triều Nguyễn',
    firingTemp: '850°C Nung 4 Lần',
    symbolism: 'Quyền uy, trường thọ và sự phú quý vinh hoa của hoàng tộc xứ Huế.',
    wireMaterial: 'Chỉ đồng đỏ 0.3mm thếp vàng 24K',
    enamelMinerals: 'Bột thạch anh, ôxít sắt Fe2O3, tinh chất hoàng liên',
    bgColor: 'from-amber-600/30 via-yellow-950/40 to-stone-950',
    accentColor: 'text-amber-400 border-amber-500/40',
    motifName: 'Long Vân Khánh Hội (Rồng ẩn trong mây)',
  },
  'men-thanh-lam': {
    id: 'men-thanh-lam',
    name: 'Men Thanh Lam · Liên Hoa Tịnh',
    subname: 'Sắc Xanh Ngọc Bích & Hoa Sen Hồ Tịnh Tâm',
    firingTemp: '860°C Nung 4 Lần',
    symbolism: 'Sự thanh cao, tĩnh lặng và trí tuệ an nhiên giữa chốn hoàng thành cổ kính.',
    wireMaterial: 'Chỉ đồng đỏ nguyên chất uốn gập tay',
    enamelMinerals: 'Bột đá lưu ly xanh, ôxít đồng CuO, men ngọc lam',
    bgColor: 'from-cyan-600/30 via-teal-950/40 to-stone-950',
    accentColor: 'text-cyan-400 border-cyan-500/40',
    motifName: 'Bảo Tướng Liên Hoa (Hoa sen cách điệu cung đình)',
  },
  'men-hong-hac': {
    id: 'men-hong-hac',
    name: 'Men Hồng Hạc · Đan Phượng Vũ',
    subname: 'Sắc Đỏ Chu Sa & Đôi Chim Phượng Hoàng',
    firingTemp: '840°C Nung 4 Lần',
    symbolism: 'Điềm lành, sự hòa hợp âm dương và lòng hiếu hạnh truyền đời.',
    wireMaterial: 'Chỉ đồng uốn tinh xảo cẩn viền bạc',
    enamelMinerals: 'Khoáng chu sa tự nhiên, bột đá mã não đỏ, oxit mangan',
    bgColor: 'from-rose-600/30 via-red-950/40 to-stone-950',
    accentColor: 'text-rose-400 border-rose-500/40',
    motifName: 'Loan Phụng Hòa Minh (Phượng hoàng múa lượn)',
  },
}

export function ArtisanHandmadeCloisonneEnamelTeaSetAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPalette, setSelectedPalette] = useState<EnamelColorPalette>('men-hoang-gia')
  const [zoomLevel, setZoomLevel] = useState<1 | 4 | 16>(16)
  const [customSeal, setCustomSeal] = useState('')
  const [orderSent, setOrderSent] = useState(false)

  const activeTheme = ENAMEL_THEMES[selectedPalette]

  return (
    <section
      aria-label="Xưởng Bộ Ấm Chén Trà Pháp Lam Cung Đình Huế GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Palace Cloisonné Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(217,119,6,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-amber-300">
                Atelier Pháp Lam Huế · GU-CLOISONNE-2026-X
              </span>
              <span className="text-xs font-mono text-stone-400">Nung 850°C · Cốt Đồng Đỏ Chỉ 0.3mm</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Bộ Ấm Chén Trà Pháp Lam Cung Đình Huế
              <span className="block font-sans text-lg font-normal text-amber-300/80 sm:text-xl mt-1">
                Kỹ Nghệ Cloisonné Triều Nguyễn Thất Truyền & Kính Soi Chỉ Đồng 16x
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Được phục dựng kỳ công bởi các nghệ nhân kim hoàn và men gốm cố đô Huế. 
            Cốt đồng đỏ dát mỏng gò tay, uốn từng sợi chỉ đồng ngăn men màu và nung than củi 4 lần liên tiếp, 
            mài phẳng bóng gương bằng đá nhám và than củi xoan đào.
          </p>
        </div>

        {/* 3 Cloisonné Color Palette Switcher */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {(Object.keys(ENAMEL_THEMES) as EnamelColorPalette[]).map((paletteKey) => {
            const theme = ENAMEL_THEMES[paletteKey]
            const isSelected = selectedPalette === paletteKey
            return (
              <button
                key={paletteKey}
                onClick={() => setSelectedPalette(paletteKey)}
                className={cn(
                  'flex flex-col text-left p-5 rounded-2xl border transition-all duration-300 min-h-[44px]',
                  isSelected
                    ? 'border-amber-400 bg-stone-900 shadow-xl shadow-amber-950/40 ring-1 ring-amber-400/40'
                    : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-800/40'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-base font-medium text-stone-100">{theme.name.split('·')[0]}</span>
                  <span className="font-mono text-xs text-amber-400">{theme.firingTemp.split(' ')[0]}</span>
                </div>
                <span className="mt-1 text-xs font-serif text-amber-300/80">{theme.subname}</span>
                <p className="mt-3 text-xs leading-relaxed text-stone-400 font-light border-t border-stone-800/80 pt-2">
                  {theme.symbolism}
                </p>
              </button>
            )
          })}
        </div>

        {/* 16x Microscope Inspector for Copper Cloisonné Wire & Vitreous Enamel */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Microscope View (7 cols) */}
          <div className="rounded-3xl border border-stone-800 bg-stone-900/80 p-6 sm:p-8 backdrop-blur-xl lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                    Kính Hiển Vi Soi Chỉ Đồng 0.3mm & Lớp Men Thủy Tinh
                  </span>
                </div>

                <div className="flex items-center gap-1 rounded-xl border border-stone-800 bg-stone-950 p-1">
                  {([1, 4, 16] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setZoomLevel(lvl)}
                      className={cn(
                        'rounded-lg px-2.5 py-1 font-mono text-xs transition min-h-[32px]',
                        zoomLevel === lvl
                          ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40'
                          : 'text-stone-400 hover:text-stone-200'
                      )}
                    >
                      {lvl}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Optical Microscope Chamber Frame */}
              <div className="mt-6 relative h-64 sm:h-76 rounded-2xl border-2 border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 overflow-hidden flex items-center justify-center p-6">
                {/* Crosshairs Reticle */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div className="h-full w-px bg-amber-400/40" />
                  <div className="absolute w-full h-px bg-amber-400/40" />
                  <div className="absolute h-44 w-44 rounded-full border border-amber-400/30" />
                </div>

                {/* Cloisonné Wire & Enamel Cell Graphic Subject */}
                <motion.div
                  animate={{
                    scale: zoomLevel === 16 ? 1.8 : zoomLevel === 4 ? 1.25 : 1.0,
                  }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center text-center p-4"
                >
                  {/* Decorative Tea Kettle Body with Cloisonné Filigree */}
                  <div className="relative h-28 w-44 sm:h-36 sm:w-56 rounded-[3rem] border-2 border-amber-600/80 bg-stone-950 shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* Background Enamel Wash */}
                    <div className={cn('absolute inset-0 bg-gradient-to-tr opacity-80', activeTheme.bgColor)} />

                    {/* Pure Copper Wire 0.3mm Geometric Filigree */}
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <div className="h-8 w-24 rounded-full border-2 border-amber-300 shadow-md flex items-center justify-center">
                        <span className="font-serif text-[10px] text-amber-200 font-semibold">
                          {activeTheme.motifName.split('(')[0]}
                        </span>
                      </div>
                      <div className="h-0.5 w-32 bg-amber-400 shadow-sm" />
                    </div>
                  </div>

                  {/* Microscopic Metric Callouts */}
                  <div className="mt-4 flex items-center gap-3 font-mono text-[11px] text-amber-300">
                    <span className="rounded bg-stone-900 border border-stone-700 px-2 py-0.5">
                      Chỉ đồng đỏ: 0.30mm
                    </span>
                    <span className="rounded bg-stone-900 border border-stone-700 px-2 py-0.5">
                      Độ dày men: 0.85mm
                    </span>
                    <span className="rounded bg-stone-900 border border-stone-700 px-2 py-0.5 text-cyan-300">
                      Độ phóng đại: {zoomLevel}x
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Historical Motif Lore */}
            <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950/70 p-5">
              <h4 className="font-serif text-base text-stone-100">{activeTheme.name}</h4>
              <p className="mt-1 font-mono text-xs text-amber-300">{activeTheme.wireMaterial}</p>
              <div className="mt-3 text-xs font-mono text-stone-400 border-t border-stone-800 pt-3">
                <span className="text-stone-500">Thành phần khoáng men:</span>
                <p className="text-stone-200 font-sans mt-0.5">{activeTheme.enamelMinerals}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Set Pieces & Custom Imperial Seal (5 cols) */}
          <div className="rounded-3xl border border-stone-800 bg-stone-900/80 p-6 sm:p-8 backdrop-blur-xl lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                  Trọn Bộ Trà Pháp Lam 6 Món
                </span>
                <span className="font-mono text-xs text-stone-400">Niên Hiệu Khắc Đáy</span>
              </div>

              {/* Set Component Breakdown */}
              <div className="mt-5 space-y-2.5">
                {[
                  { name: 'Ấm Trà Quả Lê Pháp Lam', spec: 'Dung tích 350ml · Quai đồng thau bọc mây' },
                  { name: 'Chén Tống Chuyên Trà', spec: 'Dung tích 180ml · Lòng tráng men trắng tuyết' },
                  { name: 'Bộ 4 Chén Quân Nhỏ', spec: 'Dung tích 45ml · Men ngũ sắc cung đình' },
                  { name: 'Khay Trà Đồng Tròn', spec: 'Đường kính 32cm · Cốt đồng đỏ chạm mây rồng' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-stone-800 bg-stone-950/60 p-3"
                  >
                    <div>
                      <span className="font-serif text-xs text-stone-100 block">{item.name}</span>
                      <span className="text-[11px] font-mono text-stone-400">{item.spec}</span>
                    </div>
                    <span className="font-mono text-xs text-amber-400/80">#{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Imperial Seal Engraving */}
            <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950/80 p-5">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block">
                Khắc Triện Niên Hiệu Đáy Ấm &amp; Đáy Khay
              </span>
              <p className="mt-1 text-xs text-stone-300 font-light">
                Khắc tay niên hiệu gia tộc bằng chữ Hán triện hoặc Quốc ngữ thư pháp, mạ vàng 24K chìm dưới đáy ấm.
              </p>

              <div className="mt-3">
                <input
                  type="text"
                  value={customSeal}
                  onChange={(e) => setCustomSeal(e.target.value)}
                  placeholder="Khắc niên hiệu (VD: GuHomes Bính Ngọ Niên Chế)"
                  className="w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-3.5 py-2 text-xs text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3 Craft Virtues */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              01 · Nung 4 Lần Nhiệt Độ 850°C
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Men Thủy Tinh Vĩnh Cửu Không Bay Màu</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Mỗi lớp men được tra thủ công vào từng ô chỉ đồng và nung riêng biệt. 
              Nhiệt độ lò nung củi được thợ cả quan sát qua màu lửa, đảm bảo men nóng chảy đều mà không làm biến dạng cốt đồng đỏ.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              02 · Mài Than Củi Xoan Đào
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Bề Mặt Phẳng Lì Không Gợn Sóng</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Sau khi nung, mặt men gồ ghề được mài tỉ mỉ bằng đá nhám suối và than củi xoan đào mịn dưới vòi nước chảy liên tục, 
              làm lộ ra những đường chỉ đồng óng ả ngang bằng tuyệt đối với mặt men thủy tinh.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              03 · Hòa Khí Hậu Sài Gòn
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Không Bám Cáu Cặn Nước Trà</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Men thủy tinh Pháp Lam hoàn toàn không có lỗ xốp li ti như gốm sứ mộc, 
              giúp ấm không bị ố vàng bám váng chè ngay cả khi dùng trà Ô Long hay trà sen Tây Hồ lâu năm.
            </p>
          </div>
        </div>

        {/* Custom Order Box */}
        <div className="mt-14 rounded-3xl border border-amber-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                GuHomes Cloisonné Atelier
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Đặt May Đo Bộ Trà Pháp Lam Hoàng Gia
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Bộ tác phẩm bao gồm ấm trà quả lê, chén tống, 4 chén quân, khay tròn đồng đỏ và hộp gấm cung đình lót lụa tơ tằm thêu chỉ vàng. 
                Mỗi bộ đều mang mã số chế tác độc bản lưu trữ trong kho văn thư GuHomes.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Mã độc bản GU-CLOISONNE-2026-X</span>
                <span>✓ Khắc niên hiệu mạ vàng 24K</span>
                <span>✓ Bảo hành lớp men thủy tinh trọn đời</span>
              </div>
            </div>

            <div>
              {orderSent ? (
                <div className="rounded-2xl border border-amber-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu bộ trà Pháp Lam</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Nghệ nhân Pháp Lam cố đô Huế sẽ liên hệ để xác nhận chữ triện niên hiệu và xếp lịch bàn giao tác phẩm.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-4 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-md"
                >
                  <div>
                    <label htmlFor={`${formId}-owner`} className="block font-mono text-xs text-stone-300">
                      Họ tên gia chủ *
                    </label>
                    <input
                      id={`${formId}-owner`}
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-phone`} className="block font-mono text-xs text-stone-300">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      id={`${formId}-phone`}
                      required
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-sealtext`} className="block font-mono text-xs text-stone-300">
                      Chữ triện / Niên hiệu khắc đáy ấm trà
                    </label>
                    <input
                      id={`${formId}-sealtext`}
                      type="text"
                      value={customSeal}
                      onChange={(e) => setCustomSeal(e.target.value)}
                      placeholder="VD: Nguyễn Tộc Tự Gia Chi Bảo"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Đăng ký chế tác bộ trà Pháp Lam độc bản
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
