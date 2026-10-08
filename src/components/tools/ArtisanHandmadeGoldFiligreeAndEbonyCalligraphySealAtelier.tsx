'use client'

import React, { useState, useRef } from 'react'

interface CalligraphySeal {
  id: string
  name: string
  dimension: string
  weight: string
  scriptStyle: string
  purpose: string
  inkPadNote: string
}

const SEAL_CATALOG: CalligraphySeal[] = [
  {
    id: 'dai-tu-minh-trien',
    name: 'Ấn Đại Tự Minh Triện Hoàng Gia',
    dimension: '45mm x 45mm x 90mm',
    weight: '280g',
    scriptStyle: 'Triện thư thời Lý - Khắc chìm Bạch Văn',
    purpose: 'Đóng góc đại tự hoành phi, khánh thành công trình, bảo chứng bản vẽ kiến trúc độc bản',
    inkPadNote: 'Son chu sa khoáng thạch thần sa nguyên chất, đỏ thắm trầm ấm không phai suốt 300 năm.',
  },
  {
    id: 'lac-khoan-nha-trien',
    name: 'Ấn Lạc Khoản Nhã Triện Thư Phòng',
    dimension: '30mm x 30mm x 80mm',
    weight: '165g',
    scriptStyle: 'Tiểu triện thanh thoát - Khắc nổi Chu Văn',
    purpose: 'Đóng lạc khoản tranh thủy mặc, câu đối gỗ quý, thủ bút KTS trưởng bàn giao nhà',
    inkPadNote: 'Mực son dầu thầu dầu cổ truyền mài mịn, bám dính sâu vào từng thớ giấy Dó Phong Khê.',
  },
  {
    id: 'tieu-tieu-nhan-trien',
    name: 'Ấn Tiểu Tiêu Nhàn Triện Tàng Thư',
    dimension: '20mm x 20mm x 70mm',
    weight: '85g',
    scriptStyle: 'Cổ văn thắt nút mộc mạc',
    purpose: 'Đóng ấn giám thư tịch cổ, văn bản gia phả, nhật ký thi công công trình độc bản',
    inkPadNote: 'Chất son ngâm sáp ong rừng hoa tràm, chống nước và ẩm mốc nhiệt đới tuyệt hảo.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndEbonyCalligraphySealAtelier() {
  const [selectedSeal, setSelectedSeal] = useState<string>('dai-tu-minh-trien')
  const [zoomLevel, setZoomLevel] = useState<number>(1) // 1x to 4x
  const [isSealed, setIsSealed] = useState<boolean>(false)
  const [stampCount, setStampCount] = useState<number>(12)

  const audioCtxRef = useRef<AudioContext | null>(null)

  const activeSeal = SEAL_CATALOG.find((s) => s.id === selectedSeal) ?? SEAL_CATALOG[0]!

  const playStampAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      // Deep tactile 160Hz stamp impact sound on thick Do paper
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(160, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12)

      gain.gain.setValueAtTime(0.5, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.14)

      setIsSealed(true)
      setStampCount((prev) => prev + 1)
      setTimeout(() => setIsSealed(false), 600)
    } catch {
      setIsSealed(true)
      setTimeout(() => setIsSealed(false), 600)
    }
  }

  return (
    <section className="relative my-20 overflow-hidden rounded-3xl border border-stone-800/80 bg-gradient-to-b from-[#13110e] via-[#0d0c0a] to-[#090807] p-6 sm:p-10 lg:p-14 text-stone-300 shadow-2xl">
      {/* Decorative Atmospheric Glow */}
      <div className="pointer-events-none absolute -top-36 left-1/3 h-88 w-88 rounded-full bg-amber-800/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-36 right-1/4 h-88 w-88 rounded-full bg-red-900/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 border-b border-stone-800/60 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/30 px-3.5 py-1 text-xs font-medium tracking-widest text-amber-300/90 uppercase">
            <span>Mỹ Nghệ Văn Phòng Thượng Hạng</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Tác Phẩm Thư Họa Hoàng Triều</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 font-light tracking-wide leading-snug">
            Atelier Ấn Triện Thư Họa Gỗ Mun Hoa Nạm Vàng Filigree Hoàng Triều
          </h3>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Khối ngọc gỗ Mun hoa Nam Bộ vân hổ phách nguyên khối tỷ trọng 1.15 g/cm³ chìm hoàn toàn trong nước.
            Đỉnh ấn triện nạm vàng 24K filigree thủ công hình Rồng cuộn thời Lý uyển chuyển, đáy triện khắc chìm
            triện thư phong thủy sâu 2.5mm bảo tồn ấn tích trường tồn trăm năm.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Macro Inspection & Interactive Stamping */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-800 bg-[#0d0c0a] p-6 shadow-inner flex flex-col justify-between">
              {/* Seal Stamp Feedback Aura */}
              {isSealed && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-56 h-56 bg-red-600/20 rounded-full blur-2xl animate-ping duration-300" />
                </div>
              )}

              {/* Status Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                  </span>
                  <span className="text-xs tracking-wider uppercase text-stone-300 font-medium">Son Chu Sa Khoáng Thạch Thần Sa</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-200/90 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                    Kính lúp Macro: {zoomLevel}x
                  </span>
                  <span className="text-xs text-stone-300 bg-stone-900 border border-stone-800 px-2.5 py-0.5 rounded-full">
                    Đã đóng dấu: {stampCount} lần
                  </span>
                </div>
              </div>

              {/* Central Seal Interactive Graphic with Macro Zoom */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <div
                  className="relative transition-transform duration-300 ease-out"
                  style={{ transform: `scale(${1 + (zoomLevel - 1) * 0.25})` }}
                >
                  {/* Decorative Seal Silhouette */}
                  <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-xl border border-amber-500/40 p-2.5 flex flex-col items-center justify-between bg-gradient-to-b from-stone-950 via-[#181612] to-stone-950 shadow-2xl backdrop-blur-md">
                    {/* Filigree Dragon Top Crown */}
                    <div className="w-full h-12 rounded-lg border border-amber-600/50 bg-gradient-to-r from-amber-900/40 via-amber-700/20 to-amber-900/40 flex items-center justify-center">
                      <span className="text-[10px] text-amber-300 tracking-widest font-mono">VÀNG 24K FILIGREE</span>
                    </div>

                    {/* Ebony Body */}
                    <div className="text-center py-2">
                      <div className="text-xs font-serif text-stone-200">{activeSeal.name}</div>
                      <div className="text-[10px] text-amber-400/90 font-mono mt-0.5">{activeSeal.dimension}</div>
                      <div className="text-[9px] text-stone-300 mt-1">Trọng lượng: {activeSeal.weight}</div>
                    </div>

                    {/* Bottom Carved Seal Base */}
                    <div className={`w-full py-1.5 rounded-lg border border-red-700/70 bg-red-950/40 text-center transition-colors ${isSealed ? 'bg-red-700 text-stone-950' : 'text-red-400'}`}>
                      <span className="text-[10px] font-serif font-bold tracking-wider">TÂM AN VẠN SỰ</span>
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
                  <span className="text-stone-300">Chất liệu:</span> Mun hoa Nam Bộ vân hổ phách & Vàng 24K
                </div>
                <button
                  onClick={playStampAudio}
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-medium bg-red-800/90 text-stone-100 hover:bg-red-700 transition-all shadow-md shadow-red-950/40"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                  <span>Đóng Dấu Triện Lên Giấy Dó (160Hz)</span>
                </button>
              </div>
            </div>

            {/* Seal Catalog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SEAL_CATALOG.map((seal) => {
                const isSelected = seal.id === selectedSeal
                return (
                  <div
                    key={seal.id}
                    onClick={() => setSelectedSeal(seal.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all duration-300 ${
                      isSelected
                        ? 'border-amber-600/90 bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 shadow-lg shadow-amber-950/30'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-medium text-stone-200">{seal.name}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-amber-400/90 font-mono">{seal.dimension}</div>
                    <div className="mt-2 text-[10px] text-stone-300 line-clamp-2">{seal.purpose}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Seal Metallurgy & Calligraphic Purpose */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-stone-800/90 bg-[#11100e] p-6 space-y-5">
              <h4 className="font-serif text-lg text-amber-200/90 font-light border-b border-stone-800/80 pb-3 flex items-center justify-between">
                <span>Quy Cách Chế Tác Triện Thư</span>
                <span className="text-xs font-mono text-stone-300">Mã: SEAL-EB24</span>
              </h4>

              {/* Selected Seal Detail Box */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 space-y-2 text-xs">
                <div className="font-medium text-amber-300">{activeSeal.name}</div>
                <div className="text-stone-300 font-serif leading-relaxed italic">{activeSeal.scriptStyle}</div>
                <div className="text-stone-300 pt-1 leading-relaxed">{activeSeal.purpose}</div>
                <div className="pt-2 text-[11px] text-stone-300 border-t border-stone-800">
                  <strong className="text-amber-400/90">Hộp son chu sa:</strong> {activeSeal.inkPadNote}
                </div>
              </div>

              {/* Material Craftsmanship Attributes */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-medium tracking-wider text-amber-300/80 uppercase">Đặc Tính Kỹ Nghệ Ngự Triện</div>
                <ul className="space-y-2 text-xs text-stone-400 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Gỗ Mun hoa Nam Bộ (Diospyros celebica):</strong> Tỷ trọng 1.15 g/cm³, độ cứng vân đá mài bóng tự nhiên không dùng hóa chất PU độc hại.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Vàng 24K Filigree:</strong> Kéo sợi chỉ vàng ròng 0.12mm uốn lượn hình Rồng thời Lý, thếp cố định bằng mộng đồng thau siêu nhỏ giấu kín.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Hộp Tuyết Tùng Tây Ban Nha:</strong> Khóa từ tính 0.6T lót gấm Vạn Phúc duy trì ẩm 50% - 55% RH bảo quản son chu sa không khô cứng.</span>
                  </li>
                </ul>
              </div>

              {/* Master Architect Direct Callout */}
              <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-300">Chữ Ký Nghệ Thuật Của GuHomes:</span> Mỗi hồ sơ thiết kế và bàn giao chìa khóa công trình đều được KTS Trưởng đóng dấu triện đỏ độc bản chứng nhận chất lượng thi công. Hotline: <span className="font-mono text-amber-300 font-semibold">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
