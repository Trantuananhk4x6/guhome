'use client'

import React, { useState, useRef } from 'react'

interface KynamMasterpiece {
  id: string
  name: string
  age: string
  region: string
  aromaLayer: string
  burnTemp: number
  notes: string
  persistence: string
}

const KYnam_ITEMS: KynamMasterpiece[] = [
  {
    id: 'bach-kynam-gia-lai',
    name: 'Bạch Kỳ Nam Phú Túc Rừng Già',
    age: '86 năm tuổi',
    region: 'Huyện Krông Pa, Gia Lai',
    aromaLayer: 'Sương hoa rừng - Nhũ mật ngọt - Sữa thảo mộc ấm',
    burnTemp: 110,
    notes: 'Ngũ biến hương huyền diệu, lượng dầu đọng dày ánh xám bạc, thanh tẩy không gian và tĩnh dưỡng thần khí.',
    persistence: '24 giờ',
  },
  {
    id: 'thanh-kynam-dai-loc',
    name: 'Thanh Kỳ Nam Đại Lộc Rừng Sâu',
    age: '78 năm tuổi',
    region: 'Vùng cao Đại Lộc, Quảng Nam',
    aromaLayer: 'Dưa non the mát - Mật ong rừng - Hương khói trầm sâu',
    burnTemp: 140,
    notes: 'Sắc xanh biếc ngọc thạch thấu quang dưới nắng, kích thích cảm hứng sáng tạo và thiền định.',
    persistence: '18 giờ',
  },
  {
    id: 'hac-kynam-ba-to',
    name: 'Hắc Kỳ Nam Ba Tơ Cổ Bản',
    age: '95 năm tuổi',
    region: 'Rừng già nguyên sinh Ba Tơ, Quảng Ngãi',
    aromaLayer: 'Quế bì cay ấm - Khói cổ thụ - Hổ phách lắng đọng',
    burnTemp: 195,
    notes: 'Đen nhánh như mun, tỷ trọng chìm hoàn toàn trong nước, vị cay ngọt tê đầu lưỡi đặc trưng ngự phẩm.',
    persistence: '36 giờ',
  },
]

export function BespokeImperialKynamAndSilverFiligreeIncenseVault() {
  const [selectedKynam, setSelectedKynam] = useState<string>('bach-kynam-gia-lai')
  const [currentTemp, setCurrentTemp] = useState<number>(110)
  const [isIncenseActive, setIsIncenseActive] = useState<boolean>(true)
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  const activeKynam = KYnam_ITEMS.find((k) => k.id === selectedKynam) ?? KYnam_ITEMS[0]!

  const playSilverBellAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      // 528Hz Solfeggio fundamental bell chime
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const osc3 = ctx.createOscillator()

      const gain = ctx.createGain()

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(1056, ctx.currentTime) // 1st octave harmonic

      osc3.type = 'triangle'
      osc3.frequency.setValueAtTime(1584, ctx.currentTime) // 3rd harmonic

      const oscGain1 = ctx.createGain()
      const oscGain2 = ctx.createGain()
      const oscGain3 = ctx.createGain()

      oscGain1.gain.setValueAtTime(0.3, ctx.currentTime)
      oscGain2.gain.setValueAtTime(0.12, ctx.currentTime)
      oscGain3.gain.setValueAtTime(0.04, ctx.currentTime)

      gain.gain.setValueAtTime(0.4, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 5.5)

      osc1.connect(oscGain1)
      osc2.connect(oscGain2)
      osc3.connect(oscGain3)

      oscGain1.connect(gain)
      oscGain2.connect(gain)
      oscGain3.connect(gain)

      gain.connect(ctx.destination)

      osc1.start()
      osc2.start()
      osc3.start()

      osc1.stop(ctx.currentTime + 5.5)
      osc2.stop(ctx.currentTime + 5.5)
      osc3.stop(ctx.currentTime + 5.5)

      setIsAudioActive(true)
      setTimeout(() => {
        setIsAudioActive(false)
      }, 5500)
    } catch {
      setIsAudioActive(false)
    }
  }

  return (
    <section className="relative my-20 overflow-hidden rounded-3xl border border-stone-800/80 bg-gradient-to-b from-[#12110f] via-[#0d0c0a] to-[#090807] p-6 sm:p-10 lg:p-14 text-stone-300 shadow-2xl">
      {/* Decorative Aura */}
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full bg-amber-800/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-stone-700/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 border-b border-stone-800/60 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/30 px-3.5 py-1 text-xs font-medium tracking-widest text-amber-300/90 uppercase">
            <span>Bảo Thất Khứu Giác Thượng Lưu</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Nghệ Thuật Ngự Hương Hoàng Triều</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 font-light tracking-wide leading-snug">
            Bảo Thất Kỳ Nam & Lư Xông Bạc Đậu 999 Thủ Công Nạm Hồng Ngọc
          </h3>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Án hương gỗ Cẩm Lai Nam Bộ nguyên khối nẹp đồng xước mờ kết hợp mặt đá Jasper Đắk Nông tự nhiên.
            Đỉnh lư xông chế tác từ bạc ta 999 bằng kỹ nghệ Bạc Đậu thủ công truyền thống, lót lõi đồng đỏ dày 7mm
            và nắp đỉnh nạm viên hồng ngọc tự nhiên thấu quang 90%.
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Scent Chamber & Ceramic Ash Plate */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-800 bg-[#0e0d0b] p-6 shadow-inner flex flex-col justify-between">
              {/* Smoke Wave Ambient Animation */}
              {isIncenseActive && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-48 h-72 bg-gradient-to-t from-amber-500/10 via-stone-400/5 to-transparent blur-2xl animate-pulse duration-1000" />
                </div>
              )}

              {/* Status Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                  <span className="text-xs tracking-wider uppercase text-stone-300 font-medium">Lư Bạc Đậu 999 & Lõi Đồng Đỏ Giữ Nhiệt</span>
                </div>

                <span className="text-xs text-amber-200/90 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                  Nhiệt độ xông: {currentTemp}°C
                </span>
              </div>

              {/* Central Censer Interactive Graphic */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <div className="relative flex items-center justify-center">
                  {/* Decorative Outer Filigree Ring */}
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-amber-500/30 p-2 flex items-center justify-center bg-stone-950/80 shadow-2xl backdrop-blur-md">
                    <div className="w-full h-full rounded-full border border-stone-700/60 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900">
                      <div className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-amber-400 shadow-md shadow-rose-600/50 mb-1" />
                      <span className="text-xs text-amber-300/90 font-serif">Hồng Ngọc Tự Nhiên</span>
                      <span className="mt-1 text-[11px] text-stone-300 font-light">{activeKynam.name}</span>
                      <span className="text-[10px] text-amber-500/90 font-mono mt-0.5">{currentTemp}°C · Lưu hương {activeKynam.persistence}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setCurrentTemp((prev) => Math.max(80, prev - 10))}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200 transition-colors"
                  >
                    Giảm -10°C
                  </button>
                  <span className="text-xs text-stone-300">Tầng hương: {activeKynam.aromaLayer.split(' - ')[0]}</span>
                  <button
                    onClick={() => setCurrentTemp((prev) => Math.min(220, prev + 10))}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200 transition-colors"
                  >
                    Tăng +10°C
                  </button>
                </div>
              </div>

              {/* Bottom Quick Control Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80 pt-3 text-xs text-stone-400">
                <div>
                  <span className="text-stone-300">Khay tro Chu Đậu:</span> Tro rơm nếp làng Chuông nén khuôn Phúc
                </div>
                <button
                  onClick={playSilverBellAudio}
                  disabled={isAudioActive}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium transition-all ${
                    isAudioActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'border border-stone-700 bg-stone-900 text-stone-300 hover:border-amber-500/50'
                  }`}
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                  </svg>
                  <span>{isAudioActive ? 'Chuông Bạc Đang Ngân...' : 'Ngân Chuông Bạc 528Hz'}</span>
                </button>
              </div>
            </div>

            {/* Kynam Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {KYnam_ITEMS.map((item) => {
                const isSelected = item.id === selectedKynam
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedKynam(item.id)
                      setCurrentTemp(item.burnTemp)
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
                    <div className="mt-1 text-[11px] text-amber-400/90 font-mono">{item.age} · {item.burnTemp}°C</div>
                    <div className="mt-2 text-[10px] text-stone-300 line-clamp-2">{item.notes}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Scent Dynamics & Atelier Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-stone-800/90 bg-[#11100e] p-6 space-y-5">
              <h4 className="font-serif text-lg text-amber-200/90 font-light border-b border-stone-800/80 pb-3 flex items-center justify-between">
                <span>Cấu Trúc Tầng Hương Vi Lượng</span>
                <span className="text-xs font-mono text-stone-300">Chuẩn: Imperial-528</span>
              </h4>

              {/* Temperature Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-300">Nhiệt độ ủ vi lượng:</span>
                  <span className="font-mono text-amber-300">{currentTemp}°C (Khoảng 80°C - 220°C)</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="220"
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer bg-stone-800 rounded-lg h-1.5"
                />
                <div className="flex justify-between text-[10px] text-stone-300">
                  <span>80°C (Sơ khai - Sương thảo)</span>
                  <span>140°C (Trung tầng)</span>
                  <span>220°C (Đỉnh cao trầm ấm)</span>
                </div>
              </div>

              {/* Active Aroma Profile Box */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 space-y-2 text-xs">
                <div className="font-medium text-amber-300">Tầng hương đang lan tỏa:</div>
                <div className="text-stone-300 font-serif leading-relaxed italic">{activeKynam.aromaLayer}</div>
                <div className="pt-2 text-[11px] text-stone-300 border-t border-stone-800 flex justify-between">
                  <span>Xuất xứ: {activeKynam.region}</span>
                  <span>Thời gian lưu hương: {activeKynam.persistence}</span>
                </div>
              </div>

              {/* Craftsmanship Excellence Attributes */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-medium tracking-wider text-amber-300/80 uppercase">Nghệ Thuật Bạc Đậu & Gỗ Cẩm Lai</div>
                <ul className="space-y-2 text-xs text-stone-400 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Bạc Đậu 999 thủ công:</strong> Kéo sợi bạc 0.12mm uốn hình hoa văn mây lửa hoàng gia, lót lòng đồng đỏ giữ nhiệt vĩnh cửu.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Án hương Cẩm Lai Nam Bộ:</strong> Tỷ trọng 1.02 g/cm³, vân hoa cuộn hổ phách, gia công thủ công tại xưởng Thạnh Xuân 1.200m².</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Đá Jasper Đắk Nông nguyên tấm:</strong> Chịu nhiệt độ cao không nứt vỡ, tỏa ion âm hỗ trợ điều hòa khí trường phòng khách.</span>
                  </li>
                </ul>
              </div>

              {/* Master Architect Direct Callout */}
              <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-300">KTS Trưởng GuHomes:</span> Mỗi không gian khứu giác thượng lưu đều được tích hợp hệ thống thông gió gián tiếp độc lập để bảo tồn trọn vẹn chất lượng ngự hương. Hotline: <span className="font-mono text-amber-300 font-semibold">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
