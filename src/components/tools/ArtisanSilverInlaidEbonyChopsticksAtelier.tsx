'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ChopstickCustomization {
  woodType: 'mun-sung' | 'cam-lai-viet' | 'trac-den'
  inlayPattern: 'tam-khoi' | 'ngu-phuc' | 'hoa-mai-tuyet' | 'gia-huy-rieng'
  silverCollar: 'bac-ta-999-tron' | 'bac-ta-999-cham-long' | 'bac-ta-999-chu-tho'
  balancePointPercent: number // 40 - 45%
  engravedSeal: string
  boxFinish: 'hop-son-mai-then' | 'hop-go-mun-nguyen-khoi'
}

const WOOD_SPECS = {
  'mun-sung': {
    name: 'Gỗ Mun Sừng Khánh Hòa',
    density: '1.240 kg/m³ (Chìm sâu dưới nước)',
    color: 'Đen tuyền bóng như sừng tê giác, thớ đanh mịn tuyệt đối',
    aging: 'Càng dùng càng bóng ánh kim cương đen, trơ với dầu mỡ'
  },
  'cam-lai-viet': {
    name: 'Cẩm Lai Kon Tum Thớ Chỉ',
    density: '1.080 kg/m³',
    color: 'Nâu đỏ tía ánh tím, vân chỉ đen sắc nét',
    aging: 'Tỏa hương mộc thoang thoảng khi tiếp xúc đồ ăn nóng'
  },
  'trac-den': {
    name: 'Trắc Đen Cổ Thụ Gia Lai',
    density: '1.160 kg/m³',
    color: 'Đen mun ánh tím sẫm, độ cứng vượt bậc',
    aging: 'Bền bỉ truyền đời trăm năm không mục rỗng'
  }
}

const INLAY_PATTERNS = [
  { id: 'tam-khoi', name: 'Ốc Đỏ Tam Khôi', desc: 'Khảm ốc xà cừ đỏ Singapore 7 sắc cầu vồng, tích Tam Khôi đăng khoa' },
  { id: 'ngu-phuc', name: 'Ngũ Phúc Lâm Môn', desc: 'Năm cánh dơi ngậm đồng tiền cổ dát vỏ trai điệp biển Quy Nhơn' },
  { id: 'hoa-mai-tuyet', name: 'Nhất Chi Mai Sương', desc: 'Cành mai sương ngậm ngọc trai tự nhiên, thanh tao nhã nhặn' },
  { id: 'gia-huy-rieng', name: 'Chữ Ký & Gia Huy Riêng', desc: 'Dát chỉ bạc 999 thủ công theo thư pháp dòng tộc gia chủ' }
]

const SILVER_COLLARS = [
  { id: 'bac-ta-999-tron', name: 'Bạc Ta 999 Tròn Mịn', desc: 'Bo viền công thái học, khử khuẩn tự nhiên 99.9%' },
  { id: 'bac-ta-999-cham-long', name: 'Bạc Ta Chạm Lộng Vân Mây', desc: 'Nghệ nhân chạm lộng gấm hoa cung đình Huế' },
  { id: 'bac-ta-999-chu-tho', name: 'Bạc Ta Khắc Chữ Thọ Cổ', desc: 'Biểu tượng trường thọ và an khang gia đạo' }
]

export function ArtisanSilverInlaidEbonyChopsticksAtelier({ className = '' }: { className?: string }) {
  const [config, setConfig] = useState<ChopstickCustomization>({
    woodType: 'mun-sung',
    inlayPattern: 'tam-khoi',
    silverCollar: 'bac-ta-999-tron',
    balancePointPercent: 42,
    engravedSeal: 'TRẦN GIA',
    boxFinish: 'hop-son-mai-then'
  })

  const [quantity, setQuantity] = useState<number>(6) // 6 đôi hoặc 10 đôi
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [isOrdered, setIsOrdered] = useState(false)

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName || !consultPhone) return
    setIsOrdered(true)
  }

  const activeWood = WOOD_SPECS[config.woodType]

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Nghệ Thuật Ngự Dụng Cung Đình
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Mun Sừng Khánh Hòa &amp; Bạc Ta 999 | GU-EBONY-CHOPSTICKS-2026-X
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Bộ Đũa Ngự Dụng Mun Sừng Khảm Xà Cừ <span className="italic text-amber-200">Royal Ebony Atelier</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Chế tác giới hạn từ gỗ Mun sừng Khánh Hòa ngâm bùn sấy 5 năm, tỷ trọng 1.240 kg/m³ chìm sâu trong nước.
            Thân đũa vát bát giác công thái học cân bằng trọng tâm chuẩn 42%, đầu gắp bịt bạc ta 999 kháng khuẩn
            và chuôi khảm xà cừ ốc đỏ Singapore Tam Khôi dát chỉ bạc gia huy truyền đời.
          </p>
        </div>

        {/* Studio Body */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Mô phỏng Đôi Đũa & Công Thái Học */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Mô Phỏng Trọng Tâm Công Thái Học</h3>
                  <p className="text-xs text-stone-400">Trọng tâm 42% giúp đũa vung nhẹ không mỏi cổ tay trong bàn tiệc</p>
                </div>
                <div className="rounded-xl border border-amber-600/40 bg-amber-950/40 px-3 py-1.5 text-center">
                  <span className="font-mono text-sm font-semibold text-amber-300">{config.balancePointPercent}%</span>
                  <span className="block text-[10px] text-stone-400">Điểm Cân Bằng</span>
                </div>
              </div>

              {/* Khung tương tác trực quan chiếc đũa */}
              <div className="relative mt-8 rounded-xl border border-stone-800/80 bg-stone-950/90 p-8 sm:p-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900/50 via-stone-950/90 to-stone-950 pointer-events-none rounded-xl" />

                <div className="relative z-10 flex flex-col items-center gap-6">
                  {/* Cặp đũa song hành */}
                  <div className="flex w-full justify-center gap-6 py-8">
                    {[0, 1].map((idx) => (
                      <motion.div
                        key={idx}
                        className="relative flex h-80 w-5 flex-col items-center justify-between overflow-hidden rounded-t-sm rounded-b-md shadow-2xl"
                        style={{
                          background:
                            config.woodType === 'mun-sung'
                              ? 'linear-gradient(180deg, #1c1917 0%, #0c0a09 100%)'
                              : config.woodType === 'cam-lai-viet'
                              ? 'linear-gradient(180deg, #451a03 0%, #290d04 100%)'
                              : 'linear-gradient(180deg, #27272a 0%, #09090b 100%)'
                        }}
                      >
                        {/* Chuôi đũa bọc bạc và khảm xà cừ */}
                        <div className="relative flex w-full flex-col items-center border-b border-stone-700 bg-stone-300/90 py-2 shadow-inner">
                          <span className="text-[9px] font-bold text-stone-900 font-serif leading-none tracking-tighter">
                            {config.engravedSeal ? config.engravedSeal.slice(0, 4) : 'GU'}
                          </span>
                        </div>

                        {/* Điểm khảm ốc đỏ Tam Khôi */}
                        <div className="my-2 h-16 w-3 rounded-sm bg-gradient-to-b from-rose-500/70 via-amber-300/80 to-emerald-400/70 opacity-90 shadow-sm" />

                        {/* Điểm cân bằng Fulcrum Marker */}
                        <div
                          className="absolute w-full border-t-2 border-dashed border-amber-400/80"
                          style={{ top: `${config.balancePointPercent}%` }}
                        />

                        {/* Đầu gắp bịt bạc 999 */}
                        <div className="h-10 w-3 rounded-b-md border-t border-stone-400 bg-gradient-to-b from-stone-200 to-stone-100 shadow-md" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Thanh chỉnh điểm cân bằng */}
                  <div className="w-full space-y-2 rounded-xl border border-stone-800 bg-stone-900/60 p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-stone-300">Cân chỉnh trọng tâm bàn tay:</span>
                      <span className="font-mono text-amber-300">{config.balancePointPercent}% (Chuẩn Hoàng Gia)</span>
                    </div>
                    <input
                      type="range"
                      min="38"
                      max="46"
                      value={config.balancePointPercent}
                      onChange={(e) =>
                        setConfig((prev) => ({ ...prev, balancePointPercent: parseInt(e.target.value) }))
                      }
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-amber-500"
                    />
                    <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                      <span>38% (Cán đầm)</span>
                      <span>42% (Cân bằng lý tưởng)</span>
                      <span>46% (Mũi nhẹ thoát)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thông số gỗ đang chọn */}
              <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-200">{activeWood.name}</span>
                  <span className="font-mono text-xs text-stone-400">{activeWood.density}</span>
                </div>
                <p className="mt-2 text-xs text-stone-300 leading-relaxed">{activeWood.color}</p>
                <p className="mt-1 text-xs text-stone-400 leading-relaxed">{activeWood.aging}</p>
              </div>
            </div>

            {/* Quy chuẩn hoàn thiện */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6 sm:grid-cols-4">
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Chiều Dài Đũa</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">268 mm</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Đầu Bịt Bạc Ta</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">Bạc 999</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Vết Cắt Bát Giác</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">8 Cạnh 45°</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Kháng Khuẩn</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">99.9% Tự Nhiên</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Tùy biến & Đăng ký chế tác */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Tùy chọn chất liệu & khảm */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Tùy Biến Độc Bản Gia Chủ</h3>

              <div className="mt-5 space-y-4">
                {/* Chọn loại gỗ */}
                <div>
                  <label className="text-xs text-stone-400">Chất liệu thân đũa:</label>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {(['mun-sung', 'cam-lai-viet', 'trac-den'] as const).map((wt) => (
                      <button
                        key={wt}
                        type="button"
                        onClick={() => setConfig((prev) => ({ ...prev, woodType: wt }))}
                        className={cn(
                          'rounded-lg border p-2 text-center text-xs transition-colors min-h-[44px]',
                          config.woodType === wt
                            ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                            : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        {wt === 'mun-sung' ? 'Mun Sừng' : wt === 'cam-lai-viet' ? 'Cẩm Lai' : 'Trắc Đen'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chọn hoa văn khảm xà cừ */}
                <div>
                  <label className="text-xs text-stone-400">Họa tiết khảm xà cừ:</label>
                  <div className="mt-1.5 space-y-2">
                    {INLAY_PATTERNS.map((p) => (
                      <div
                        key={p.id}
                        onClick={() =>
                          setConfig((prev) => ({
                            ...prev,
                            inlayPattern: p.id as ChopstickCustomization['inlayPattern']
                          }))
                        }
                        className={cn(
                          'cursor-pointer rounded-xl border p-2.5 transition-colors min-h-[44px]',
                          config.inlayPattern === p.id
                            ? 'border-amber-500 bg-amber-950/30 text-amber-100'
                            : 'border-stone-800 bg-stone-950/50 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        <p className="text-xs font-medium">{p.name}</p>
                        <p className="text-[11px] text-stone-500">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Khắc triện gia huy */}
                <div>
                  <label className="text-xs text-stone-400">Chữ triện / Gia huy khắc chuôi đũa:</label>
                  <input
                    type="text"
                    maxLength={10}
                    value={config.engravedSeal}
                    onChange={(e) => setConfig((prev) => ({ ...prev, engravedSeal: e.target.value.toUpperCase() }))}
                    placeholder="VD: NGUYỄN GIA, VŨ ANH..."
                    className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 px-3.5 py-2 text-xs text-amber-300 font-serif uppercase tracking-widest placeholder-stone-600 focus:border-amber-500 focus:outline-none min-h-[44px]"
                  />
                </div>

                {/* Số lượng đôi */}
                <div>
                  <label className="text-xs text-stone-400">Quy cách bộ:</label>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {[6, 10].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuantity(q)}
                        className={cn(
                          'rounded-lg border p-2.5 text-center text-xs transition-colors min-h-[44px]',
                          quantity === q
                            ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                            : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        Bộ {q} đôi ({q === 6 ? 'Hộp Lục Lộc' : 'Hộp Thập Toàn'})
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form đặt chế tác set đũa */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Đặt Chế Tác Thủ Công Giới Hạn</h3>
              <p className="mt-1 text-xs text-stone-400">
                Mỗi bộ đũa kèm hộp sơn mài then và chứng thư xuất xưởng gỗ Mun sừng Khánh Hòa do nghệ nhân GuHomes ký thác.
              </p>

              {isOrdered ? (
                <div className="mt-5 rounded-xl border border-amber-800/60 bg-amber-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-amber-200">
                    Đã ghi nhận yêu cầu chế tác bộ {quantity} đôi đũa ngự dụng. Nghệ nhân GuHomes sẽ liên hệ xác nhận bản vẽ chữ triện.
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
                      placeholder="Số điện thoại nhận tư vấn"
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
                    <span>Yêu Cầu Chế Tác Bộ Đũa Ngự Dụng</span>
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
