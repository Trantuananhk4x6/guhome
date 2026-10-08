'use client'

import React, { useState, useRef } from 'react'

interface PaperweightMasterpiece {
  id: string
  name: string
  length: string
  weight: string
  dragonStyle: string
  application: string
  liningNote: string
}

const PAPERWEIGHT_CATALOG: PaperweightMasterpiece[] = [
  {
    id: 'tran-giay-dai-tu-40',
    name: 'Cặp Trấn Giấy Song Long Đại Tự',
    length: '40cm x 3.8cm x 2.5cm',
    weight: '920g / cặp',
    dragonStyle: 'Song Long thời Lý uốn lượn hình sin nạm chỉ vàng 24K',
    application: 'Trấn giấy Dó khổ lớn, đại tự hoành phi, tranh thủy mặc nguyên khổ',
    liningNote: 'Lót lụa tơ tằm nhuộm chàm cổ truyền chống trầy xước mặt giấy.',
  },
  {
    id: 'tran-giay-trung-tu-28',
    name: 'Cặp Trấn Giấy Song Long Trung Tự',
    length: '28cm x 3.2cm x 2.2cm',
    weight: '580g / cặp',
    dragonStyle: 'Rồng chầu mặt nguyệt vàng 24K filigree sợi 0.12mm',
    application: 'Trấn giấy câu đối đối liên, thi từ thư phòng, văn bản ký kết',
    liningNote: 'Gỗ Trắc cẩm đầm chắc, phẳng tuyệt đối không làm nhăn mặt giấy.',
  },
  {
    id: 'tran-giay-tieu-tu-18',
    name: 'Cặp Trấn Giấy Song Long Tiểu Tự',
    length: '18cm x 2.8cm x 1.8cm',
    weight: '340g / cặp',
    dragonStyle: 'Vân mây hóa rồng thời Trần thếp vàng thủ công',
    application: 'Trấn tập chép kinh thi, tiểu khải tàng thư, sổ tay nhật ký KTS',
    liningNote: 'Hộp Tuyết Tùng Tây Ban Nha khóa từ tính 0.6T chống cong vênh vĩnh viễn.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndRosewoodPaperweightBarAtelier() {
  const [selectedBar, setSelectedBar] = useState<string>('tran-giay-dai-tu-40')
  const [zoomLevel, setZoomLevel] = useState<number>(1) // 1x to 4x
  const [isAudible, setIsAudible] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  const activeBar = PAPERWEIGHT_CATALOG.find((b) => b.id === selectedBar) ?? PAPERWEIGHT_CATALOG[0]!

  const playPaperweightAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      // 180Hz tactile solid wood settling on paper
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(180, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15)

      gain.gain.setValueAtTime(0.45, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.18)

      setIsAudible(true)
      setTimeout(() => setIsAudible(false), 400)
    } catch {
      setIsAudible(false)
    }
  }

  return (
    <section className="relative my-20 overflow-hidden rounded-3xl border border-stone-800/80 bg-gradient-to-b from-[#13110e] via-[#0d0c0a] to-[#090807] p-6 sm:p-10 lg:p-14 text-stone-300 shadow-2xl">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute -top-36 left-1/3 h-88 w-88 rounded-full bg-amber-800/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-36 right-1/4 h-88 w-88 rounded-full bg-yellow-900/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 border-b border-stone-800/60 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/30 px-3.5 py-1 text-xs font-medium tracking-widest text-amber-300/90 uppercase">
            <span>Mỹ Nghệ Văn Phòng Thượng Hạng</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Tác Phẩm Thư Họa Hoàng Triều</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 font-light tracking-wide leading-snug">
            Atelier Trấn Giấy Song Long Gỗ Trắc Cẩm Đính Vàng Filigree Hoàng Triều
          </h3>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Cặp thanh trấn giấy thư phòng đẽo từ lõi gỗ Trắc cẩm Nam Bộ nguyên khối tỷ trọng 1.08 g/cm³ đầm nặng phẳng gương.
            Mặt trên nạm đôi Rồng thời Lý đối xứng bằng vàng 24K filigree sợi chỉ 0.12mm uốn lượn uy nghi,
            giữ giấy Dó thẳng thớm tuyệt đối trong từng nét mực thư pháp.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Zoom & Settling Action */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-800 bg-[#0d0c0a] p-6 shadow-inner flex flex-col justify-between">
              {/* Status Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                  <span className="text-xs tracking-wider uppercase text-stone-300 font-medium">Gỗ Trắc Cẩm & Vàng 24K Filigree</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-200/90 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                    Kính lúp: {zoomLevel}x
                  </span>
                  <span className="text-xs text-stone-300 bg-stone-900 border border-stone-800 px-2.5 py-0.5 rounded-full">
                    Khối lượng: {activeBar.weight}
                  </span>
                </div>
              </div>

              {/* Central Paperweight Graphic */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <div
                  className="relative transition-transform duration-300 ease-out"
                  style={{ transform: `scale(${1 + (zoomLevel - 1) * 0.25})` }}
                >
                  <div className="w-56 h-28 sm:w-64 sm:h-32 rounded-xl border border-amber-600/40 p-2.5 flex flex-col items-center justify-between bg-gradient-to-r from-[#1d1813] via-[#14120e] to-[#1d1813] shadow-2xl backdrop-blur-md">
                    {/* Dragon Filigree Inlay Bar Top */}
                    <div className="w-full py-1 rounded border border-amber-500/50 bg-gradient-to-r from-amber-900/40 via-amber-700/20 to-amber-900/40 text-center">
                      <span className="text-[10px] text-amber-300 font-mono tracking-widest">SONG LONG VÀNG 24K FILIGREE</span>
                    </div>

                    <div className="text-center py-1">
                      <div className="text-xs font-serif text-amber-100">{activeBar.name}</div>
                      <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">{activeBar.length}</div>
                    </div>

                    {/* Bottom Felt Base */}
                    <div className="w-full py-1 rounded border border-stone-800 bg-stone-950 text-center">
                      <span className="text-[9px] text-stone-300 font-mono">Đế Lụa Tơ Tằm Nhuộm Chàm Chống Trầy</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(1, prev - 1))}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200 transition-colors"
                  >
                    Thu Nhỏ 1x
                  </button>
                  <span className="text-xs text-stone-300">Độ phóng đại: {zoomLevel}x</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(4, prev + 1))}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200 transition-colors"
                  >
                    Phóng Đại {zoomLevel < 4 ? zoomLevel + 1 : 4}x
                  </button>
                </div>
              </div>

              {/* Bottom Quick Control Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80 pt-3 text-xs text-stone-400">
                <div>
                  <span className="text-stone-300">Vật liệu:</span> Gỗ Trắc cẩm Nam Bộ & Sợi chỉ vàng 24K
                </div>
                <button
                  onClick={playPaperweightAudio}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-medium bg-amber-700/90 text-stone-100 hover:bg-amber-600 transition-all shadow-md shadow-amber-950/40"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                  <span>{isAudible ? 'Đang Chạm Giấy Dó...' : 'Hạ Thanh Trấn Lên Giấy (180Hz)'}</span>
                </button>
              </div>
            </div>

            {/* Catalog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {PAPERWEIGHT_CATALOG.map((item) => {
                const isSelected = item.id === selectedBar
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedBar(item.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all duration-300 ${
                      isSelected
                        ? 'border-amber-600/90 bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 shadow-lg shadow-amber-950/30'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-medium text-stone-200">{item.name}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-amber-400/90 font-mono">{item.length.split(' ')[0]} · {item.weight.split(' ')[0]}</div>
                    <div className="mt-2 text-[10px] text-stone-300 line-clamp-2">{item.application}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Specs & Purpose */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-stone-800/90 bg-[#11100e] p-6 space-y-5">
              <h4 className="font-serif text-lg text-amber-200/90 font-light border-b border-stone-800/80 pb-3 flex items-center justify-between">
                <span>Quy Cách Chế Tác Trấn Giấy</span>
                <span className="text-xs font-mono text-stone-300">Mã: BAR-RW24</span>
              </h4>

              {/* Selected Detail Box */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 space-y-2 text-xs">
                <div className="font-medium text-amber-300">{activeBar.name}</div>
                <div className="text-stone-300 font-serif leading-relaxed italic">{activeBar.dragonStyle}</div>
                <div className="text-stone-300 pt-1 leading-relaxed">{activeBar.application}</div>
                <div className="pt-2 text-[11px] text-stone-300 border-t border-stone-800">
                  <strong className="text-amber-400/90">Quy chuẩn lót:</strong> {activeBar.liningNote}
                </div>
              </div>

              {/* Material Craftsmanship Attributes */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-medium tracking-wider text-amber-300/80 uppercase">Đặc Tính Kỹ Nghệ Song Long</div>
                <ul className="space-y-2 text-xs text-stone-400 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Gỗ Trắc cẩm Nam Bộ:</strong> Tỷ trọng 1.08 g/cm³, đầm chắc, sấy đạt ẩm 11% tại xưởng Thạnh Xuân 1.200m² không cong vênh.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Vàng 24K Filigree rồng Lý:</strong> Kéo sợi chỉ 0.12mm uốn lượn hình sin uyển chuyển, nạm chìm vào rãnh mộng gỗ.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Hộp Tuyết Tùng Tây Ban Nha:</strong> Khóa từ tính Neodymium 0.6T lót lụa Vạn Phúc bảo quản cặp thanh trấn trọn đời.</span>
                  </li>
                </ul>
              </div>

              {/* Master Architect Direct Callout */}
              <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Chi Tiết May Đo Của GuHomes:</span> Từ những vật dụng nhỏ nhất trên bàn làm việc đến kết cấu vì kèo công trình, tất cả đều đồng nhất theo triết lý Quiet Luxury. Hotline: <span className="font-mono text-amber-300 font-semibold">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
