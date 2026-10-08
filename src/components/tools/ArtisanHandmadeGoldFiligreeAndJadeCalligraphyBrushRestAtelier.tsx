'use client'

import React, { useState, useRef } from 'react'

interface BrushRestMasterpiece {
  id: string
  name: string
  length: string
  capacity: string
  jadeType: string
  purpose: string
  resonanceNote: string
}

const BRUSH_REST_CATALOG: BrushRestMasterpiece[] = [
  {
    id: 'ngu-phong-dai-tu',
    name: 'Gác Bút Ngũ Phong Ngọc Bích Hoàng Gia',
    length: '22cm',
    capacity: 'Gác 5 ngọn bút đại tự đồng thời',
    jadeType: 'Ngọc bích Hetian xanh lục thấu quang 91.5%',
    purpose: 'Dành cho thư phòng đại tự, gác các ngòi bút lông sói và lông dê lớn không chạm bàn',
    resonanceNote: 'Cộng hưởng âm học thanh thuần, phát chuông ngọc 528Hz khi chạm nhẹ cán bút.',
  },
  {
    id: 'tam-phong-trung-tu',
    name: 'Gác Bút Tam Phong Ngọc Bích Thư Phòng',
    length: '15cm',
    capacity: 'Gác 3 ngọn bút trung tự đối liên',
    jadeType: 'Ngọc bích Tân Cương thấu quang 88.2%',
    purpose: 'Bàn trà đàm đạo kết hợp viết đối liên ngày Tết, kích thước thanh thoát trang nhã',
    resonanceNote: 'Âm thanh ngọc bích ngân thanh thoát, tạo sự tĩnh lặng tuyệt đối cho tâm trí.',
  },
  {
    id: 'nhat-phong-tieu-tu',
    name: 'Gác Bút Nhất Phong Ngọc Bích Tiểu Khải',
    length: '9cm',
    capacity: 'Gác 1 ngọn bút tiểu khải chép kinh thi',
    jadeType: 'Ngọc bích Hetian mỡ cừu quý hiếm',
    purpose: 'Góc đọc sách thư thái, chép kinh thi tĩnh tâm bên án hương trầm',
    resonanceNote: 'Ngọc đầm chắc, đế lót gỗ Mun sọc chống trượt trên bề mặt bàn đá mài mờ.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestAtelier() {
  const [selectedRest, setSelectedRest] = useState<string>('ngu-phong-dai-tu')
  const [zoomLevel, setZoomLevel] = useState<number>(1) // 1x to 4x
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  const activeRest = BRUSH_REST_CATALOG.find((r) => r.id === selectedRest) ?? BRUSH_REST_CATALOG[0]!

  const playJadeChimeAudio = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioCtxRef.current = ctx

      // 528Hz pure crystalline jade resonance
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(1584, ctx.currentTime) // High harmonic overtone

      const g1 = ctx.createGain()
      const g2 = ctx.createGain()

      g1.gain.setValueAtTime(0.35, ctx.currentTime)
      g2.gain.setValueAtTime(0.08, ctx.currentTime)

      gain.gain.setValueAtTime(0.4, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.8)

      osc1.connect(g1)
      osc2.connect(g2)
      g1.connect(gain)
      g2.connect(gain)

      gain.connect(ctx.destination)

      osc1.start()
      osc2.start()

      osc1.stop(ctx.currentTime + 4.8)
      osc2.stop(ctx.currentTime + 4.8)

      setIsAudioActive(true)
      setTimeout(() => setIsAudioActive(false), 4800)
    } catch {
      setIsAudioActive(false)
    }
  }

  return (
    <section className="relative my-20 overflow-hidden rounded-3xl border border-stone-800/80 bg-gradient-to-b from-[#13110e] via-[#0d0c0a] to-[#090807] p-6 sm:p-10 lg:p-14 text-stone-300 shadow-2xl">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -top-36 left-1/3 h-88 w-88 rounded-full bg-emerald-800/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-36 right-1/4 h-88 w-88 rounded-full bg-amber-900/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 border-b border-stone-800/60 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/30 px-3.5 py-1 text-xs font-medium tracking-widest text-amber-300/90 uppercase">
            <span>Mỹ Nghệ Văn Phòng Thượng Hạng</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Tác Phẩm Thư Họa Hoàng Triều</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 font-light tracking-wide leading-snug">
            Atelier Gác Bút Ngũ Phong Ngọc Bích Nạm Vàng Filigree Hoàng Triều
          </h3>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Phiến ngọc bích Hetian tự nhiên đẽo gọt dáng ngũ phong ngũ nhạc sừng sững, nạm mạng lưới vàng 24K filigree
            sợi chỉ 0.12mm uốn lượn rồng phượng thời Lý. Chân đế lót gỗ Mun sọc Nam Bộ chống trượt và tạo sự vững chãi
            trên án thư gỗ quý.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Zoom & Interactive Chime */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-800 bg-[#0d0c0a] p-6 shadow-inner flex flex-col justify-between">
              {/* Status Indicator */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs tracking-wider uppercase text-stone-300 font-medium">Ngọc Bích Hetian & Vàng 24K Filigree</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-amber-200/90 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                    Kính lúp: {zoomLevel}x
                  </span>
                  <span className="text-xs text-stone-300 bg-stone-900 border border-stone-800 px-2.5 py-0.5 rounded-full">
                    Chiều dài: {activeRest.length}
                  </span>
                </div>
              </div>

              {/* Central Jade Mountain Graphic */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <div
                  className="relative transition-transform duration-300 ease-out"
                  style={{ transform: `scale(${1 + (zoomLevel - 1) * 0.25})` }}
                >
                  <div className="w-56 h-32 sm:w-64 sm:h-36 rounded-2xl border border-emerald-500/40 p-3 flex flex-col items-center justify-between bg-gradient-to-b from-[#13231a] via-[#0f1913] to-[#0c100d] shadow-2xl backdrop-blur-md">
                    {/* Jade Mountain Silhouette Peaks */}
                    <div className="w-full flex items-end justify-center gap-1.5 h-16 pt-2">
                      <div className="w-6 h-8 bg-emerald-800/70 rounded-t-md border-t border-amber-400/50" />
                      <div className="w-7 h-12 bg-emerald-700/80 rounded-t-md border-t border-amber-400/70" />
                      <div className="w-9 h-16 bg-emerald-600/90 rounded-t-md border-t-2 border-amber-300 shadow-md shadow-emerald-500/30" />
                      <div className="w-7 h-12 bg-emerald-700/80 rounded-t-md border-t border-amber-400/70" />
                      <div className="w-6 h-8 bg-emerald-800/70 rounded-t-md border-t border-amber-400/50" />
                    </div>

                    <div className="text-center py-1">
                      <div className="text-xs font-serif text-emerald-100">{activeRest.name}</div>
                      <div className="text-[10px] text-amber-300/90 font-mono mt-0.5">{activeRest.capacity}</div>
                    </div>

                    {/* Mun Wood Base */}
                    <div className="w-full py-1 rounded-md border border-stone-800 bg-stone-950 text-center">
                      <span className="text-[9px] text-stone-300 font-mono">Đế Gỗ Mun Sọc Nam Bộ Nẹp Vàng 24K</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => setZoomLevel((prev) => Math.max(1, prev - 1))}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-emerald-600 hover:text-emerald-200 transition-colors"
                  >
                    Thu Nhỏ 1x
                  </button>
                  <span className="text-xs text-stone-300">Độ phóng đại: {zoomLevel}x</span>
                  <button
                    onClick={() => setZoomLevel((prev) => Math.min(4, prev + 1))}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-emerald-600 hover:text-emerald-200 transition-colors"
                  >
                    Phóng Đại {zoomLevel < 4 ? zoomLevel + 1 : 4}x
                  </button>
                </div>
              </div>

              {/* Bottom Quick Control Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80 pt-3 text-xs text-stone-400">
                <div>
                  <span className="text-stone-300">Thấu quang:</span> 91.5% dưới ánh quang phổ tự nhiên
                </div>
                <button
                  onClick={playJadeChimeAudio}
                  disabled={isAudioActive}
                  className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-medium transition-all ${
                    isAudioActive
                      ? 'bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20'
                      : 'border border-stone-700 bg-stone-900 text-stone-300 hover:border-emerald-500/50'
                  }`}
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                  <span>{isAudioActive ? 'Chuông Ngọc Đang Ngân...' : 'Ngân Chuông Ngọc Bích 528Hz'}</span>
                </button>
              </div>
            </div>

            {/* Catalog Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {BRUSH_REST_CATALOG.map((item) => {
                const isSelected = item.id === selectedRest
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedRest(item.id)}
                    className={`cursor-pointer rounded-xl border p-3.5 transition-all duration-300 ${
                      isSelected
                        ? 'border-emerald-600/90 bg-gradient-to-br from-emerald-950/40 via-stone-900 to-stone-950 shadow-lg shadow-emerald-950/30'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-xs font-medium text-stone-200">{item.name}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-emerald-400/90 font-mono">{item.length} · {item.capacity.split(' ')[1]} đỉnh</div>
                    <div className="mt-2 text-[10px] text-stone-300 line-clamp-2">{item.purpose}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Specs & Craftsmanship */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-stone-800/90 bg-[#11100e] p-6 space-y-5">
              <h4 className="font-serif text-lg text-emerald-200/90 font-light border-b border-stone-800/80 pb-3 flex items-center justify-between">
                <span>Quy Cách Chế Tác Ngọc Bích</span>
                <span className="text-xs font-mono text-stone-300">Mã: REST-JD528</span>
              </h4>

              {/* Selected Detail Box */}
              <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-4 space-y-2 text-xs">
                <div className="font-medium text-emerald-300">{activeRest.name}</div>
                <div className="text-stone-300 font-serif leading-relaxed italic">{activeRest.jadeType}</div>
                <div className="text-stone-300 pt-1 leading-relaxed">{activeRest.purpose}</div>
                <div className="pt-2 text-[11px] text-stone-300 border-t border-stone-800">
                  <strong className="text-amber-400/90">Âm học ngọc bích:</strong> {activeRest.resonanceNote}
                </div>
              </div>

              {/* Material Craftsmanship Attributes */}
              <div className="space-y-3 pt-1">
                <div className="text-xs font-medium tracking-wider text-emerald-300/80 uppercase">Đặc Tính Kỹ Nghệ Ngũ Phong</div>
                <ul className="space-y-2 text-xs text-stone-400 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Ngọc bích Hetian tự nhiên:</strong> Mài bóng 4000 grit bằng nước suối nguồn, chống bám mực tàu và dễ dàng lau sạch sau khi sử dụng.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Kim hoàn Filigree vàng 24K:</strong> Đính viền rồng cuộn bảo vệ cạnh ngọc, tạo vẻ quyền quý uy nghi cho án thư.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Chân đế Mun sọc Nam Bộ:</strong> Gia công tay tại xưởng Thạnh Xuân 1.200m², đầm nặng chống rung chấn mặt bàn.</span>
                  </li>
                </ul>
              </div>

              {/* Master Architect Direct Callout */}
              <div className="mt-4 rounded-xl border border-emerald-900/40 bg-emerald-950/20 p-4 text-xs text-emerald-200/90 leading-relaxed">
                <span className="font-semibold text-emerald-300">Không Gian Thư Họa Cùng GuHomes:</span> Mỗi chi tiết trên bàn trà hay bàn làm việc đều được KTS tính toán tỷ lệ vàng và ánh sáng gián tiếp 180 lux chuẩn mực. Hotline: <span className="font-mono text-emerald-300 font-semibold">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
