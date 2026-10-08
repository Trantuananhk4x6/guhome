'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CasketCustomization {
  lacquerFinish: 'men-son' | 'men-then' | 'canh-gian-dat-vang'
  silverPattern: 'tu-linh-may-nuoc' | 'long-phung-sum-vay' | 'hoa-sen-dai-viet'
  limePotStyle: 'men-ran-bat-trang' | 'gom-hoa-lam-chu-dau' | 'gom-ngoc-hoang-thanh'
  microscopeZoom: boolean
  giftBoxEngraving: string
}

const LACQUER_STYLES = [
  {
    id: 'men-son',
    name: 'Men Son Cổ Điển (Chu Sa)',
    desc: 'Sắc đỏ son chu sa truyền thống triều Nguyễn, ủ 12 lớp then mài nước phẳng gương',
    accent: '#991b1b'
  },
  {
    id: 'men-then',
    name: 'Men Then Trầm Tĩnh',
    desc: 'Sắc đen sâu thẳm từ nhựa thông bồ hóng, tương phản nổi bật chi tiết chạm lộng bạc 999',
    accent: '#1c1917'
  },
  {
    id: 'canh-gian-dat-vang',
    name: 'Men Cánh Gián Dát Vàng Quỳ',
    desc: 'Hổ phách đậm phủ lá vàng quỳ Kiêu Kỵ 24K dát chìm, ấm áp vương giả',
    accent: '#b45309'
  }
]

const SILVER_PATTERNS = [
  {
    id: 'tu-linh-may-nuoc',
    name: 'Tứ Linh Mây Nước',
    desc: 'Long - Lân - Quy - Phụng vờn mây nước trên tấm bạc 999 dày 1.5mm gò tay'
  },
  {
    id: 'long-phung-sum-vay',
    name: 'Long Phụng Hòa Minh',
    desc: 'Biểu tượng hôn phối viên mãn và hưng thịnh gia đạo truyền đời'
  },
  {
    id: 'hoa-sen-dai-viet',
    name: 'Hoa Sen Đại Việt',
    desc: 'Họa tiết hoa sen cánh kép thời Lý - Trần uốn lượn thanh tao thoát tục'
  }
]

export function ArtisanSilverChasedArecaNutCasketAtelier({ className = '' }: { className?: string }) {
  const [config, setConfig] = useState<CasketCustomization>({
    lacquerFinish: 'men-son',
    silverPattern: 'tu-linh-may-nuoc',
    limePotStyle: 'men-ran-bat-trang',
    microscopeZoom: false,
    giftBoxEngraving: 'PHÚC LỘC VIÊN MÃN'
  })

  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [isOrdered, setIsOrdered] = useState(false)

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName || !consultPhone) return
    setIsOrdered(true)
  }

  const activeStyle = LACQUER_STYLES.find(s => s.id === config.lacquerFinish) ?? (LACQUER_STYLES[0] as (typeof LACQUER_STYLES)[0])

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Nghi Lễ Tinh Hoa Đại Việt
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Bạc Ta 999 Gò Chạm Lộng &amp; Sơn Mài Then | GU-BETEL-CASKET-2026-X
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Bộ Tráp Trầu Cau Hoàng Gia <span className="italic text-amber-200">Royal Betel Casket</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Di sản nghi lễ Việt Nam được tôn vinh qua đôi bàn tay nghệ nhân kim hoàn bạc Định Công và sơn mài Hạ Thái.
            Tráp bạc ta 999 gò chạm lộng hoa văn Tứ Linh mây nước, bình vôi men rạn Bát Tràng bịt bạc, dao bổ cau thép nhíp
            rèn nguội chuôi sừng trâu nạm chỉ vàng đặt trên khay sơn mài son cẩn xà cừ đỏ Đại Việt.
          </p>
        </div>

        {/* Khung chức năng tương tác 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Kính hiển vi 20x soi nét chạm lộng & khay sơn mài */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Kính Phóng Đại 20x Soi Nét Chạm Lộng</h3>
                  <p className="text-xs text-stone-400">Kiểm tra từng thớ kim loại bạc 999 được gò chạm thủ công bằng búa con và ve đục</p>
                </div>
                <button
                  type="button"
                  onClick={() => setConfig(prev => ({ ...prev, microscopeZoom: !prev.microscopeZoom }))}
                  className={cn(
                    'rounded-xl border px-3.5 py-2 text-xs font-medium transition-all min-h-[44px]',
                    config.microscopeZoom
                      ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                      : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-amber-600/50'
                  )}
                >
                  {config.microscopeZoom ? 'Thu Về 1x Thường' : 'Bật Kính Soi 20x'}
                </button>
              </div>

              {/* Khung mô phỏng tráp bạc và khay sơn mài */}
              <div className="relative mt-8 overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950/90 p-8 sm:p-12 text-center">
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none transition-colors duration-500 rounded-xl"
                  style={{ backgroundColor: activeStyle.accent }}
                />

                <div className="relative z-10 flex flex-col items-center">
                  {/* Tráp Bạc gò nổi */}
                  <motion.div
                    animate={config.microscopeZoom ? { scale: 1.45 } : { scale: 1 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="relative flex h-52 w-52 sm:h-64 sm:w-64 flex-col items-center justify-center rounded-full border-4 border-stone-400/90 bg-gradient-to-tr from-stone-300 via-stone-100 to-stone-400 shadow-2xl"
                  >
                    {/* Vòng hoa văn chạm lộng */}
                    <div className="absolute inset-3 rounded-full border border-stone-500/70 border-dashed" />
                    <div className="absolute inset-7 rounded-full border-2 border-stone-600/80" />

                    {/* Họa tiết tâm */}
                    <div className="flex flex-col items-center justify-center p-4">
                      <span className="text-[10px] uppercase tracking-widest text-stone-700 font-serif font-semibold">
                        BẠC TA 999
                      </span>
                      <p className="mt-1 text-xs font-serif font-bold text-stone-900">
                        {config.silverPattern === 'tu-linh-may-nuoc'
                          ? 'TỨ LINH ĐẠI VIỆT'
                          : config.silverPattern === 'long-phung-sum-vay'
                          ? 'LONG PHỤNG SUM VẦY'
                          : 'SEN ĐÁ THỜI LÝ'}
                      </p>
                      <span className="mt-2 text-[9px] font-mono text-stone-600">Gò tay 140 giờ</span>
                    </div>

                    {/* Bình vôi mini biểu tượng bên cạnh */}
                    <div className="absolute -bottom-2 -right-2 h-14 w-14 rounded-full border border-stone-700 bg-stone-800 p-2 shadow-lg">
                      <div className="h-full w-full rounded-full border border-amber-600/40 bg-stone-900 flex items-center justify-center">
                        <span className="text-[9px] text-amber-300 font-serif">Bình Vôi</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Nhãn kính hiển vi khi đang zoom */}
                  {config.microscopeZoom && (
                    <div className="mt-6 rounded-full border border-amber-600/40 bg-amber-950/60 px-4 py-1 text-xs text-amber-200 animate-pulse">
                      Đang soi độ tinh xảo nét ve chạm lộng sâu 0.8mm trên lá bạc nguyên chất
                    </div>
                  )}
                </div>
              </div>

              {/* Thông số phong cách khay sơn mài */}
              <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-200">{activeStyle.name}</span>
                  <span className="font-mono text-xs text-stone-400">12 Nước Then Mài</span>
                </div>
                <p className="mt-2 text-xs text-stone-300 leading-relaxed">{activeStyle.desc}</p>
              </div>
            </div>

            {/* Bộ tiêu chuẩn kiểm định */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6 sm:grid-cols-4">
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ Tinh Khiết Bạc</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">99.9% Bạc Ta</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Trọng Lượng Bạc</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">12.5 Cây Bạc</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Gốm Bình Vôi</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">Men Rạn Cổ</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Chuôi Dao Bổ Cau</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">Sừng Trâu Nạm</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Tùy biến bộ tráp & Form đặt chế tác gia bảo */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Tùy Biến Tráp Trầu Gia Bảo</h3>

              <div className="mt-5 space-y-4">
                {/* Chọn nước men sơn mài */}
                <div>
                  <label className="text-xs text-stone-400">Màu men khay sơn mài:</label>
                  <div className="mt-1.5 grid grid-cols-1 gap-2">
                    {LACQUER_STYLES.map((style) => (
                      <div
                        key={style.id}
                        onClick={() =>
                          setConfig(prev => ({
                            ...prev,
                            lacquerFinish: style.id as CasketCustomization['lacquerFinish']
                          }))
                        }
                        className={cn(
                          'cursor-pointer rounded-xl border p-2.5 transition-colors min-h-[44px]',
                          config.lacquerFinish === style.id
                            ? 'border-amber-500 bg-amber-950/30 text-amber-100'
                            : 'border-stone-800 bg-stone-950/50 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        <p className="text-xs font-medium">{style.name}</p>
                        <p className="text-[11px] text-stone-500">{style.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chọn hoa văn gò chạm bạc */}
                <div>
                  <label className="text-xs text-stone-400">Hoa văn gò chạm lộng nắp tráp:</label>
                  <div className="mt-1.5 space-y-2">
                    {SILVER_PATTERNS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() =>
                          setConfig(prev => ({
                            ...prev,
                            silverPattern: p.id as CasketCustomization['silverPattern']
                          }))
                        }
                        className={cn(
                          'w-full text-left rounded-xl border p-2.5 transition-colors min-h-[44px]',
                          config.silverPattern === p.id
                            ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                            : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        <p className="text-xs font-medium">{p.name}</p>
                        <p className="text-[11px] text-stone-500">{p.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Khắc văn khắc hộp quà tặng */}
                <div>
                  <label className="text-xs text-stone-400">Văn khắc nắp hộp gỗ quà tặng gia bảo:</label>
                  <input
                    type="text"
                    maxLength={20}
                    value={config.giftBoxEngraving}
                    onChange={(e) => setConfig(prev => ({ ...prev, giftBoxEngraving: e.target.value.toUpperCase() }))}
                    placeholder="VD: PHÚC LỘC VIÊN MÃN, TRẦN GIA GIA BẢO..."
                    className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 px-3.5 py-2 text-xs text-amber-300 font-serif uppercase tracking-widest placeholder-stone-600 focus:border-amber-500 focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Form đặt chế tác */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Đặt Chế Tác Bộ Tráp Trầu Gia Bảo</h3>
              <p className="mt-1 text-xs text-stone-400">
                Thời gian chế tác thủ công: 45 ngày. Kèm chứng thư giám định tuổi bạc và hộp gỗ hương nhung đỏ.
              </p>

              {isOrdered ? (
                <div className="mt-5 rounded-xl border border-amber-800/60 bg-amber-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-amber-200">
                    Đã tiếp nhận yêu cầu chế tác bộ tráp trầu hoàng gia. Nghệ nhân kim hoàn GuHomes sẽ liên hệ duyệt bản vẽ hoa văn chạm lộng.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="mt-4 space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên người đặt"
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
                    <span>Yêu Cầu Chế Tác Tráp Trầu Hoàng Gia</span>
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
