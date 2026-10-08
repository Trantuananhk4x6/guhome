'use client'

import React, { useState, useRef } from 'react'

interface KynamVaultItem {
  id: string
  name: string
  age: string
  origin: string
  aromaLayer: string
  temp: number
  description: string
  longevity: string
}

const KYnam_VAULT_CATALOG: KynamVaultItem[] = [
  {
    id: 'hoang-kynam-tien-phuoc',
    name: 'Hoàng Kỳ Nam Tiên Phước Cổ Bản',
    age: '90 năm tuổi',
    origin: 'Rừng sâu Tiên Phước, Quảng Nam',
    aromaLayer: 'Mật ong hoa rừng - Vỏ quế cay nhẹ - Trầm hương lắng đọng',
    temp: 115,
    description: 'Sắc vàng hổ phách óng ánh, chất dầu dẻo quánh như sáp ong rừng, tỏa hương quý phái hoàng triều.',
    longevity: '28 giờ',
  },
  {
    id: 'bach-kynam-van-gia',
    name: 'Bạch Kỳ Nam Vạn Giã Bách Niên',
    age: '82 năm tuổi',
    origin: 'Dãy núi Hòn Hèo, Vạn Giã, Khánh Hòa',
    aromaLayer: 'Sương sớm non cao - Sữa hạt hạnh nhân - Hương thảo mộc ấm',
    temp: 135,
    description: 'Bạch phiến tơ bạc thấu quang, hương thơm thanh khiết giúp tịnh tâm định trí sâu sắc.',
    longevity: '22 giờ',
  },
  {
    id: 'hac-kynam-kbang',
    name: 'Hắc Kỳ Nam K\'Bang Nguyên Khối',
    age: '96 năm tuổi',
    origin: 'Vườn quốc gia Kon Ka Kinh, K\'Bang, Gia Lai',
    aromaLayer: 'Gỗ cổ thụ bách niên - Nhựa thông ấm - Khói hổ phách ngọt ngào',
    temp: 200,
    description: 'Màu đen tuyền tuyết phủ, chìm hoàn toàn trong nước, vị cay đắng ngọt hậu tê rần nơi đầu lưỡi.',
    longevity: '40 giờ',
  },
]

export function BespokeImperialKynamAndGoldInlaidIncenseChestVault() {
  const [selectedKynam, setSelectedKynam] = useState<string>('hoang-kynam-tien-phuoc')
  const [temperature, setTemperature] = useState<number>(115)
  const [isLidOpen, setIsLidOpen] = useState<boolean>(false)
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  const activeKynam = KYnam_VAULT_CATALOG.find((k) => k.id === selectedKynam) ?? KYnam_VAULT_CATALOG[0]!

  const playChestClickAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      // 432Hz deep magnetic wood resonance
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(432, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(108, ctx.currentTime + 0.15)

      gain.gain.setValueAtTime(0.4, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.18)

      setIsAudioActive(true)
      setIsLidOpen(!isLidOpen)
      setTimeout(() => setIsAudioActive(false), 300)
    } catch {
      setIsLidOpen(!isLidOpen)
    }
  }

  return (
    <section className="relative my-20 overflow-hidden rounded-3xl border border-stone-800/80 bg-gradient-to-b from-[#12110f] via-[#0d0c0a] to-[#090807] p-6 sm:p-10 lg:p-14 text-stone-300 shadow-2xl">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-amber-800/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-stone-700/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 border-b border-stone-800/60 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/30 px-3.5 py-1 text-xs font-medium tracking-widest text-amber-300/90 uppercase">
            <span>Bảo Thất Ngự Hương Hoàng Gia</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Mỹ Nghệ Cẩn Chỉ Vàng 24K</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 font-light tracking-wide leading-snug">
            Tráp Ngự Hương Kỳ Nam Gỗ Trắc Cẩm Cẩn Chỉ Vàng 24K Hoàng Gia
          </h3>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Khối gỗ Trắc cẩm Nam Bộ đẽo gọt mộng én tinh vi, cẩn đường chỉ vàng 24K hoa văn chim Lạc Đại Việt dày 0.5mm.
            Lòng tráp lót Tuyết Tùng Tây Ban Nha kiểm soát độ ẩm 50% - 55% RH, khóa ngậm nam châm Neodymium 0.6T
            và gioăng kín khí bảo tồn vĩnh cửu tinh dầu ngự hương quý hiếm.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Scent Chamber & Chest Display */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-800 bg-[#0e0d0b] p-6 shadow-inner flex flex-col justify-between">
              {/* Status Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                  <span className="text-xs tracking-wider uppercase text-stone-300 font-medium">Tráp Khí Kín 99.8% & Tuyết Tùng Tây Ban Nha</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-200/90 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                    {isLidOpen ? 'Nắp Đang Mở (Tỏa Hương)' : 'Nắp Đóng Khít Từ Tính'}
                  </span>
                  <span className="text-xs text-stone-300 bg-stone-900 border border-stone-800 px-2.5 py-0.5 rounded-full">
                    Ủ nhiệt: {temperature}°C
                  </span>
                </div>
              </div>

              {/* Central Chest Graphic */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <div className="w-52 h-36 sm:w-60 sm:h-40 rounded-xl border border-amber-600/40 p-3 flex flex-col items-center justify-between bg-gradient-to-b from-[#1b1713] via-[#14120f] to-[#0f0e0c] shadow-2xl backdrop-blur-md">
                  {/* Gold Inlaid Lid Frame */}
                  <div className="w-full py-1.5 rounded-lg border border-amber-500/50 bg-gradient-to-r from-amber-950/60 via-amber-800/30 to-amber-950/60 text-center">
                    <span className="text-[10px] text-amber-300 font-mono tracking-widest">CHIM LẠC CẨN VÀNG 24K</span>
                  </div>

                  {/* Chest Body Center */}
                  <div className="text-center py-1">
                    <div className="text-xs font-serif text-amber-100">{activeKynam.name}</div>
                    <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">{activeKynam.age} · Lưu hương {activeKynam.longevity}</div>
                    <div className="text-[9px] text-stone-300 mt-0.5">{activeKynam.origin}</div>
                  </div>

                  {/* Neodymium Magnet Lock Base */}
                  <div className="w-full py-1 rounded-lg border border-stone-700 bg-stone-900/60 text-center">
                    <span className="text-[10px] text-stone-300 font-mono">Khóa Nam Châm 0.6T {isLidOpen ? '(Mở)' : '(Khóa)'}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setTemperature((prev) => Math.max(85, prev - 10))}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200 transition-colors"
                  >
                    Giảm -10°C
                  </button>
                  <span className="text-xs text-stone-300">Tầng hương: {activeKynam.aromaLayer.split(' - ')[0]}</span>
                  <button
                    onClick={() => setTemperature((prev) => Math.min(215, prev + 10))}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200 transition-colors"
                  >
                    Tăng +10°C
                  </button>
                </div>
              </div>

              {/* Bottom Quick Control Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80 pt-3 text-xs text-stone-400">
                <div>
                  <span className="text-stone-300">Gỗ Trắc cẩm:</span> Tỷ trọng 1.08 g/cm³, vân mây tự nhiên
                </div>
                <button
                  onClick={playChestClickAudio}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-medium bg-amber-600/90 text-stone-950 hover:bg-amber-500 transition-all shadow-md shadow-amber-950/40"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                  <span>{isLidOpen ? 'Đóng Nắp Từ Tính (432Hz)' : 'Mở Nắp Tráp (432Hz)'}</span>
                </button>
              </div>
            </div>

            {/* Catalog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {KYnam_VAULT_CATALOG.map((item) => {
                const isSelected = item.id === selectedKynam
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedKynam(item.id)
                      setTemperature(item.temp)
                    }}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all duration-300 ${
                      isSelected
                        ? 'border-amber-600/90 bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 shadow-lg shadow-amber-950/30'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-medium text-stone-200">{item.name}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-amber-400/90 font-mono">{item.age} · {item.temp}°C</div>
                    <div className="mt-2 text-[10px] text-stone-300 line-clamp-2">{item.description}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Scent Dynamics & Specs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-stone-800/90 bg-[#11100e] p-6 space-y-5">
              <h4 className="font-serif text-lg text-amber-200/90 font-light border-b border-stone-800/80 pb-3 flex items-center justify-between">
                <span>Cấu Trúc Tầng Hương Tráp Kín</span>
                <span className="text-xs font-mono text-stone-300">Chuẩn: Imperial-432</span>
              </h4>

              {/* Temperature Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-300">Nhiệt độ ủ hương vi lượng:</span>
                  <span className="font-mono text-amber-300">{temperature}°C (85°C - 215°C)</span>
                </div>
                <input
                  type="range"
                  min="85"
                  max="215"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer bg-stone-800 rounded-lg h-1.5"
                />
                <div className="flex justify-between text-[10px] text-stone-300">
                  <span>85°C (Hương sương)</span>
                  <span>145°C (Trung tầng mật hoa)</span>
                  <span>215°C (Khói ấm trầm tích)</span>
                </div>
              </div>

              {/* Profile Card */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 space-y-2 text-xs">
                <div className="font-medium text-amber-300">Tầng hương đang lan tỏa:</div>
                <div className="text-stone-300 font-serif leading-relaxed italic">{activeKynam.aromaLayer}</div>
                <div className="pt-2 text-[11px] text-stone-300 border-t border-stone-800 flex justify-between">
                  <span>Nguồn gốc: {activeKynam.origin}</span>
                  <span>Thời gian lưu hương: {activeKynam.longevity}</span>
                </div>
              </div>

              {/* Material Craftsmanship Attributes */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-medium tracking-wider text-amber-300/80 uppercase">Đặc Tính Chế Tác Tráp Ngự Hương</div>
                <ul className="space-y-2 text-xs text-stone-400 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Cẩn chỉ vàng 24K thủ công:</strong> Sợi vàng 0.5mm uốn theo nét vẽ chim Lạc, đục mộng nêm phẳng tuyệt đối vào gỗ Trắc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Gỗ Tuyết Tùng Tây Ban Nha:</strong> Khả năng cân bằng độ ẩm 50% - 55% RH tự nhiên, chống gắt mùi và bảo toàn giọt dầu Kỳ Nam.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Mộng ghép kín tại xưởng Thạnh Xuân 1.200m²:</strong> Gia công mộng chốt thủ công chính xác từng milimet bởi nghệ nhân GuHomes.</span>
                  </li>
                </ul>
              </div>

              {/* Master Architect Direct Callout */}
              <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Tư Vấn Ngự Hương Cùng KTS Trưởng:</span> Mỗi công trình Quiet Luxury của GuHomes đều có góc thưởng hương thiết kế chuyên biệt, bảo tồn phẩm hạnh tự nhiên của trầm hương. Hotline: <span className="font-mono text-amber-300 font-semibold">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
