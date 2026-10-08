'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SnuffBottleCustomization {
  bottleShape: 'ho-lo' | 'tron-bat-quai' | 'vuong-tu-quy'
  spoonMaterial: 'bac-ta-999' | 'sung-tuyet' | 'nga-hoa-thach'
  jadeCapColor: 'ngoc-cam-thach' | 'ngoc-bich-hoa-dien' | 'ma-nao-do'
  backlightEnabled: boolean
  customMonogram: string
}

const BOTTLE_SHAPES = [
  {
    id: 'ho-lo',
    name: 'Bình Bầu Hồ Lô (Phúc Thọ)',
    desc: 'Dáng hồ lô phong thủy thu nạp cát khí, bụng phình thắt eo mềm mại'
  },
  {
    id: 'tron-bat-quai',
    name: 'Bình Dẹt Tròn Bát Quái (Thái Cực)',
    desc: 'Dáng tròn dẹt bỏ túi công thái học, hai mặt chạm khắc thủy mặc Bến Nghé'
  },
  {
    id: 'vuong-tu-quy',
    name: 'Bình Vuông Đứng Tứ Quý (Cương Trực)',
    desc: 'Dáng lăng trụ vuông 4 cạnh vát góc, tượng trưng cho bốn mùa thịnh vượng'
  }
]

const SPOON_MATERIALS = [
  { id: 'bac-ta-999', name: 'Muỗng Bạc Ta 999', desc: 'Đúc gõ thủ công, mũi muỗng nhỏ giọt thanh lịch' },
  { id: 'sung-tuyet', name: 'Muỗng Sừng Tuyết Trắng', desc: 'Mảnh mai trong suốt không làm biến tính cao thảo dược' },
  { id: 'nga-hoa-thach', name: 'Muỗng Ngà Hóa Thạch', desc: 'Ngà cổ ngâm bùn nghìn năm, độ bền vĩnh cửu' }
]

export function ArtisanHandmadeHornSnuffBottleVault({ className = '' }: { className?: string }) {
  const [config, setConfig] = useState<SnuffBottleCustomization>({
    bottleShape: 'ho-lo',
    spoonMaterial: 'bac-ta-999',
    jadeCapColor: 'ngoc-cam-thach',
    backlightEnabled: true,
    customMonogram: 'GU-2026'
  })

  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [isOrdered, setIsOrdered] = useState(false)

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName || !consultPhone) return
    setIsOrdered(true)
  }

  const activeShape = BOTTLE_SHAPES.find(s => s.id === config.bottleShape) ?? (BOTTLE_SHAPES[0] as (typeof BOTTLE_SHAPES)[0])

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Ngự Y Dược Khí &amp; Sừng Hổ Phách
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Sừng Trâu Nước Xuyên Quang &amp; Bạc 999 | GU-SNUFF-2026-X
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Bình Thuốc Hít Sừng Hổ Phách <span className="italic text-amber-200">Amber Horn Snuff Bottle</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Kiệt tác dưỡng sinh ngự dụng chế tác từ chóp sừng trâu nước hoa văn hổ phách xuyên quang. Qua 35 công đoạn
            tiện nạo thủ công đến độ mỏng 1.2mm, nắp cẩn ngọc cẩm thạch bọc viền vàng quỳ Kiêu Kỵ, muỗng múc bạc ta 999
            và thân bình chạm khắc thủy mặc phong cảnh Bến Nghé xưa lưu giữ hương thơm trầm dược truyền đời.
          </p>
        </div>

        {/* Khung chức năng 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Kính hiển vi 20x & Hiệu ứng xuyên quang đèn rọi */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Hiệu Ứng Xuyên Quang Vân Sừng Hổ Phách</h3>
                  <p className="text-xs text-stone-400">Bật đèn rọi đế để chiêm ngưỡng thớ vân keratin tự nhiên phát sáng hổ phách</p>
                </div>

                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, backlightEnabled: !prev.backlightEnabled }))}
                  className={cn(
                    'rounded-xl border px-3.5 py-2 text-xs font-medium transition-all min-h-[44px]',
                    config.backlightEnabled
                      ? 'border-amber-500 bg-amber-500/20 text-amber-200 shadow-lg shadow-amber-500/10'
                      : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-amber-600/50'
                  )}
                >
                  {config.backlightEnabled ? 'Tắt Đèn Rọi Xuyên Quang' : 'Bật Đèn Rọi Hổ Phách'}
                </button>
              </div>

              {/* Mô phỏng chiếc bình sừng */}
              <div className="relative mt-8 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950/90 py-16 px-6 text-center">
                {/* Ánh sáng đèn rọi xuyên quang từ phía sau */}
                <div
                  className={cn(
                    'absolute h-72 w-72 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none',
                    config.backlightEnabled
                      ? 'bg-amber-500/35 opacity-100'
                      : 'bg-stone-800/10 opacity-20'
                  )}
                />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Nắp cẩn ngọc cẩm thạch */}
                  <div className="relative flex flex-col items-center">
                    <div className="h-6 w-10 rounded-t-full border border-amber-400/80 bg-gradient-to-r from-emerald-500 via-emerald-300 to-emerald-600 shadow-md" />
                    <div className="h-2 w-14 border-t border-b border-amber-400 bg-amber-300 shadow-sm" />
                  </div>

                  {/* Thân bình sừng theo dáng chọn */}
                  <motion.div
                    animate={config.backlightEnabled ? { scale: [1, 1.02, 1] } : {}}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className={cn(
                      'relative flex flex-col items-center justify-center border transition-all duration-500 shadow-2xl',
                      config.bottleShape === 'ho-lo' && 'h-52 w-36 rounded-[50%_50%_45%_45%_/_60%_60%_40%_40%]',
                      config.bottleShape === 'tron-bat-quai' && 'h-48 w-48 rounded-full',
                      config.bottleShape === 'vuong-tu-quy' && 'h-52 w-36 rounded-2xl',
                      config.backlightEnabled
                        ? 'border-amber-400/80 bg-gradient-to-b from-amber-600/90 via-amber-500/80 to-amber-900/95 shadow-amber-500/40 text-stone-950'
                        : 'border-stone-700 bg-gradient-to-b from-stone-800 via-stone-900 to-stone-950 text-stone-400'
                    )}
                  >
                    {/* Họa tiết chạm lộng thủy mặc */}
                    <div className="p-4 text-center">
                      <span className="text-[10px] font-mono tracking-widest block uppercase opacity-80">
                        {config.customMonogram}
                      </span>
                      <p className="mt-1 text-xs font-serif font-bold">
                        Bến Nghé Thu Đảo
                      </p>
                      <span className="text-[9px] font-mono opacity-70 block mt-2">Độ mỏng 1.2mm</span>
                    </div>

                    {/* Vệt vân sừng hổ phách tự nhiên */}
                    <div className="absolute inset-2 border border-amber-300/30 rounded-inherit pointer-events-none opacity-60" />
                  </motion.div>

                  {/* Muỗng bạc 999 gắn nắp */}
                  <span className="mt-4 text-[11px] text-stone-400">
                    Kèm muỗng: <strong className="text-amber-300">{SPOON_MATERIALS.find(m => m.id === config.spoonMaterial)?.name}</strong>
                  </span>
                </div>
              </div>

              {/* Thông số kiểu dáng */}
              <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-200">{activeShape.name}</span>
                  <span className="font-mono text-xs text-stone-400">35 Công Đoạn Tiện Tay</span>
                </div>
                <p className="mt-2 text-xs text-stone-300 leading-relaxed">{activeShape.desc}</p>
              </div>
            </div>

            {/* Quy chuẩn hoàn thiện bình */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6 sm:grid-cols-4">
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ Mỏng Thành Bình</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">1.2 mm</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Xuyên Quang</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">92% Ánh Sáng</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Nắp Cẩm Thạch</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">Ngọc Tự Nhiên</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Khử Trùng Muỗng</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">Bạc 999 99.9%</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Tùy biến & Đăng ký chế tác */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Tùy Biến Bình Sừng Độc Bản</h3>

              <div className="mt-5 space-y-4">
                {/* Chọn dáng bình */}
                <div>
                  <label className="text-xs text-stone-400">Kiểu dáng bình sừng:</label>
                  <div className="mt-1.5 space-y-2">
                    {BOTTLE_SHAPES.map((shape) => (
                      <div
                        key={shape.id}
                        onClick={() =>
                          setConfig(prev => ({
                            ...prev,
                            bottleShape: shape.id as SnuffBottleCustomization['bottleShape']
                          }))
                        }
                        className={cn(
                          'cursor-pointer rounded-xl border p-2.5 transition-colors min-h-[44px]',
                          config.bottleShape === shape.id
                            ? 'border-amber-500 bg-amber-950/30 text-amber-100'
                            : 'border-stone-800 bg-stone-950/50 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        <p className="text-xs font-medium">{shape.name}</p>
                        <p className="text-[11px] text-stone-500">{shape.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chọn chất liệu muỗng */}
                <div>
                  <label className="text-xs text-stone-400">Chất liệu muỗng xúc thảo dược:</label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {SPOON_MATERIALS.map((spoon) => (
                      <button
                        key={spoon.id}
                        type="button"
                        onClick={() =>
                          setConfig(prev => ({
                            ...prev,
                            spoonMaterial: spoon.id as SnuffBottleCustomization['spoonMaterial']
                          }))
                        }
                        className={cn(
                          'rounded-lg border p-2 text-center text-xs transition-colors min-h-[44px]',
                          config.spoonMaterial === spoon.id
                            ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                            : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        {spoon.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Khắc triện gia huy */}
                <div>
                  <label className="text-xs text-stone-400">Chữ triện / Gia huy khắc đáy bình:</label>
                  <input
                    type="text"
                    maxLength={12}
                    value={config.customMonogram}
                    onChange={(e) => setConfig(prev => ({ ...prev, customMonogram: e.target.value.toUpperCase() }))}
                    placeholder="VD: TRẦN GIA, GU-2026..."
                    className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 px-3.5 py-2 text-xs text-amber-300 font-serif uppercase tracking-widest placeholder-stone-600 focus:border-amber-500 focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Form đặt chế tác */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Đặt Chế Tác Bình Thuốc Hít Ngự Dụng</h3>
              <p className="mt-1 text-xs text-stone-400">
                Chế tác thủ công giới hạn 6 bình/năm. Đính kèm hộp gấm hoàng gia và chứng nhận sừng trâu nước tự nhiên.
              </p>

              {isOrdered ? (
                <div className="mt-5 rounded-xl border border-amber-800/60 bg-amber-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-amber-200">
                    Đã ghi nhận yêu cầu chế tác bình sừng hổ phách. Nghệ nhân GuHomes sẽ liên hệ gửi bản vẽ vân sừng thực tế.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="mt-4 space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên người nhận"
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại / Zalo"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none min-h-[44px]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-400 min-h-[44px]"
                  >
                    <span>Yêu Cầu Chế Tác Bình Sừng Hổ Phách</span>
                  </button>
                  <p className="text-center text-[10px] text-stone-500">
                    Hotline: 0368 757 916 | Xưởng Thạnh Xuân 1.200m², Q.12
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
