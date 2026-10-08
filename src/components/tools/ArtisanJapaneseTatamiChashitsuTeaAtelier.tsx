'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type TatamiLayout = '4.5' | '6' | '8'

interface LayoutInfo {
  id: TatamiLayout
  name: string
  japaneseTerm: string
  matsCount: number
  areaM2: string
  capacity: string
  teaPhilosophy: string
  matArrangement: string
}

const TATAMI_LAYOUTS: Record<TatamiLayout, LayoutInfo> = {
  '4.5': {
    id: '4.5',
    name: '4.5 Chiếu (Koma Tối Giản)',
    japaneseTerm: 'Koma (Chuẩn Thiền Sư Sen no Rikyu)',
    matsCount: 4.5,
    areaM2: '7.8 m²',
    capacity: '2 – 3 Thuyền trà tri kỷ',
    teaPhilosophy: 'Bố cục kinh điển của nghệ thuật Wabi-cha thế kỷ 16: Một chiếu trung tâm hình vuông và 4 chiếu bao quanh, thu hẹp khoảng cách tâm linh giữa chủ và khách.',
    matArrangement: '4 chiếu chữ nhật (90x180cm) xếp xoay quanh 1 nửa chiếu vuông (90x90cm) đặt lò than chìm Ro.',
  },
  '6': {
    id: '6',
    name: '6 Chiếu (Hiroma Thân Mật)',
    japaneseTerm: 'Hiroma Cân Bằng Âm Dương',
    matsCount: 6,
    areaM2: '10.5 m²',
    capacity: '4 – 5 Người đàm đạo',
    teaPhilosophy: 'Không gian mở rộng vừa đủ cho các buổi trà đàm tri thức, tiếp đón bằng hữu quý tộc trong sự tôn trọng mực thước.',
    matArrangement: '6 chiếu chữ nhật đan mộng chữ phẩm, tạo khoảng thở hài hòa với góc hoa Tokonoma và tranh thủy mặc.',
  },
  '8': {
    id: '8',
    name: '8 Chiếu (Đại Trà Thất Dinh Thự)',
    japaneseTerm: 'Ohiroma Trang Nghiêm',
    matsCount: 8,
    areaM2: '14.2 m²',
    capacity: '6 – 8 Thành viên gia tộc',
    teaPhilosophy: 'Quy chuẩn phòng trà lớn cho dinh thự, nơi diễn ra các nghi thức trà đạo trọng đại, hòa hợp tinh hoa Nhật Bản và hồn cói Đồng Tháp.',
    matArrangement: '8 chiếu đối xứng hoàn hảo, kết hợp hiên Engawa nhìn ra thác nước bonsai và vườn sỏi cào tĩnh tâm.',
  },
}

export function ArtisanJapaneseTatamiChashitsuTeaAtelier({ className }: { className?: string } = {}) {
  const [selectedLayout, setSelectedLayout] = useState<TatamiLayout>('4.5')
  const [isMatsukazePlaying, setIsMatsukazePlaying] = useState<boolean>(false)

  // Consultation form state
  const [roomLocation, setRoomLocation] = useState<string>('penthouse-atrium')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const headingId = useId()
  const currentLayout = TATAMI_LAYOUTS[selectedLayout]

  const toggleMatsukazeSound = () => {
    if (typeof window === 'undefined') return
    if (isMatsukazePlaying) {
      setIsMatsukazePlaying(false)
      return
    }

    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      setIsMatsukazePlaying(true)

      // Matsukaze (wind in the pines) steam kettle sound: gentle soft pink noise + high-frequency resonance
      const bufferSize = audioCtx.sampleRate * 2.5
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05
      }

      const noise = audioCtx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      // Filter mimicking the warm gentle boiling steam of an iron Tetsubin kettle
      const filter = audioCtx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(650, audioCtx.currentTime)

      const gain = audioCtx.createGain()
      gain.gain.setValueAtTime(0.015, audioCtx.currentTime)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(audioCtx.destination)

      noise.start()

      // Auto stop after 6 seconds
      setTimeout(() => {
        try {
          noise.stop()
        } catch {
          // ignore
        }
        setIsMatsukazePlaying(false)
      }, 6000)
    } catch {
      setIsMatsukazePlaying(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Natural Reed Grass & Hinoki Golden Warm Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-amber-950/20 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-emerald-950/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Hòa Kính Thanh Tịch &amp; Chiếu Cói Định Yên
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Trà Thất Chashitsu Chiếu Cói Tự Nhiên &amp; Sàn Gỗ Hinoki
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Sự dung hợp hài hòa giữa triết lý thiền trà Nhật Bản và tinh hoa làng nghề chiếu cói Định Yên (Đồng Tháp). 
            Hệ chiếu Tatami dệt từ sợi cói tự nhiên sấy thảo mộc thơm mát, sàn gỗ Hinoki giật cấp 350mm phân định ranh giới tĩnh lặng, 
            lò than gang Tetsubin âm sàn và vách trượt Shoji bọc giấy Washi mờ với mã độc quyền <span className="font-mono text-amber-300">GU-TATAMI-2026-X</span>.
          </p>
        </div>

        {/* Interactive Tea Atelier Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Tatami Floorplan Visualizer & Matsukaze Audio */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Bố Cục Mặt Bằng Chiếu Tatami
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentLayout.name}
                    </h3>
                  </div>

                  {/* Room Specs Badges */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">{currentLayout.areaM2}</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">{currentLayout.capacity}</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">Gỗ Hinoki 350mm</span>
                  </div>
                </div>

                {/* Tatami Floor Grid Visualizer Canvas */}
                <div className="relative mt-6 h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-amber-900/50 bg-[#16120e] p-6 flex flex-col justify-between shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]">
                  {/* Subtle Tatami Weave Texture */}
                  <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Top info badge in visualizer */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      CÓI ĐỊNH YÊN (ĐỒNG THÁP) • VIỀN VẢI MỘC
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-emerald-300">
                      LÒ GANG TETSUBIN: ÂM SÀN
                    </span>
                  </div>

                  {/* SVG Tatami Arrangement Diagrams */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    {selectedLayout === '4.5' && (
                      <svg className="h-48 w-48 sm:h-52 sm:w-52 drop-shadow-[0_0_20px_rgba(217,119,6,0.3)]" viewBox="0 0 200 200">
                        {/* Outer Hinoki Wood Border */}
                        <rect x="5" y="5" width="190" height="190" rx="4" fill="#291a10" stroke="#78350f" strokeWidth="3" />
                        
                        {/* 4 Outer Mats (90x180 scaled to 50x100) */}
                        {/* Top mat */}
                        <rect x="15" y="15" width="115" height="55" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <line x1="15" y1="15" x2="130" y2="15" stroke="#1c1917" strokeWidth="4" />
                        <line x1="15" y1="70" x2="130" y2="70" stroke="#1c1917" strokeWidth="4" />

                        {/* Right mat */}
                        <rect x="130" y="15" width="55" height="115" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <line x1="130" y1="15" x2="130" y2="130" stroke="#1c1917" strokeWidth="4" />
                        <line x1="185" y1="15" x2="185" y2="130" stroke="#1c1917" strokeWidth="4" />

                        {/* Bottom mat */}
                        <rect x="70" y="130" width="115" height="55" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <line x1="70" y1="130" x2="185" y2="130" stroke="#1c1917" strokeWidth="4" />
                        <line x1="70" y1="185" x2="185" y2="185" stroke="#1c1917" strokeWidth="4" />

                        {/* Left mat */}
                        <rect x="15" y="70" width="55" height="115" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <line x1="15" y1="70" x2="15" y2="185" stroke="#1c1917" strokeWidth="4" />
                        <line x1="70" y1="70" x2="70" y2="185" stroke="#1c1917" strokeWidth="4" />

                        {/* Center Half-Mat (45x45 scale) */}
                        <rect x="70" y="70" width="60" height="60" fill="#4d3826" stroke="#000" strokeWidth="2" />
                        
                        {/* Sunken Hearth (Ro) with Iron Kettle */}
                        <rect x="85" y="85" width="30" height="30" fill="#18130e" stroke="#92400e" strokeWidth="1.5" />
                        <circle cx="100" cy="100" r="10" fill="#292524" stroke="#78350f" strokeWidth="1.5" />
                        <text x="100" y="103" textAnchor="middle" fill="#fde68a" fontSize="8" fontFamily="serif">Lò Ro</text>
                      </svg>
                    )}

                    {selectedLayout === '6' && (
                      <svg className="h-48 w-56 sm:h-52 sm:w-64 drop-shadow-[0_0_20px_rgba(217,119,6,0.3)]" viewBox="0 0 240 180">
                        {/* Outer Hinoki Border */}
                        <rect x="5" y="5" width="230" height="170" rx="4" fill="#291a10" stroke="#78350f" strokeWidth="3" />
                        
                        {/* 6 Mats Pattern */}
                        <rect x="15" y="15" width="105" height="50" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <rect x="120" y="15" width="105" height="50" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        
                        <rect x="15" y="65" width="50" height="100" fill="#4d3826" stroke="#000" strokeWidth="2" />
                        <rect x="65" y="65" width="110" height="50" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <rect x="175" y="65" width="50" height="100" fill="#4d3826" stroke="#000" strokeWidth="2" />
                        
                        <rect x="65" y="115" width="110" height="50" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        
                        {/* Iron Kettle Indicator */}
                        <circle cx="120" cy="90" r="10" fill="#1c1917" stroke="#92400e" strokeWidth="1.5" />
                        <text x="120" y="93" textAnchor="middle" fill="#fde68a" fontSize="7" fontFamily="serif">Ấm Trà</text>
                      </svg>
                    )}

                    {selectedLayout === '8' && (
                      <svg className="h-48 w-56 sm:h-52 sm:w-64 drop-shadow-[0_0_20px_rgba(217,119,6,0.3)]" viewBox="0 0 240 200">
                        {/* Outer Hinoki Border */}
                        <rect x="5" y="5" width="230" height="190" rx="4" fill="#291a10" stroke="#78350f" strokeWidth="3" />
                        
                        {/* 8 Mats Swastika/Pinwheel Arrangement */}
                        <rect x="15" y="15" width="105" height="42" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <rect x="120" y="15" width="105" height="42" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        
                        <rect x="15" y="57" width="45" height="86" fill="#4d3826" stroke="#000" strokeWidth="2" />
                        <rect x="60" y="57" width="120" height="43" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <rect x="60" y="100" width="120" height="43" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <rect x="180" y="57" width="45" height="86" fill="#4d3826" stroke="#000" strokeWidth="2" />
                        
                        <rect x="15" y="143" width="105" height="42" fill="#3f2e1e" stroke="#000" strokeWidth="2" />
                        <rect x="120" y="143" width="105" height="42" fill="#3f2e1e" stroke="#000" strokeWidth="2" />

                        {/* Hearth in middle */}
                        <circle cx="120" cy="100" r="10" fill="#1c1917" stroke="#d97706" strokeWidth="1.5" />
                        <text x="120" y="103" textAnchor="middle" fill="#fde68a" fontSize="7" fontFamily="serif">Lò Ro</text>
                      </svg>
                    )}
                  </div>

                  {/* Bottom metrics on visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Triết Lý Thiền Trà:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5">
                        {currentLayout.teaPhilosophy}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Quy Cách Chiếu:</div>
                      <div className="text-xs font-serif text-amber-300 font-medium">
                        900 x 1800 x 55 mm
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layout Selector Buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {(Object.keys(TATAMI_LAYOUTS) as TatamiLayout[]).map((layoutKey) => {
                    const layout = TATAMI_LAYOUTS[layoutKey]
                    const isSelected = selectedLayout === layoutKey
                    return (
                      <button
                        key={layoutKey}
                        type="button"
                        onClick={() => setSelectedLayout(layoutKey)}
                        className={cn(
                          'flex-1 min-w-[120px] rounded-lg border px-3 py-2 text-left transition-all',
                          isSelected
                            ? 'border-amber-400 bg-amber-950/60 text-amber-200 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-stone-200'
                        )}
                      >
                        <div className="font-mono text-xs text-amber-400 font-semibold">{layout.name.split('(')[0]}</div>
                        <div className="font-serif text-xs truncate mt-0.5">{layout.japaneseTerm.split('(')[0]}</div>
                      </button>
                    )
                  })}
                </div>

                {/* Matsukaze Steam Audio Trigger */}
                <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-stone-400">
                    Bố trí: <span className="text-stone-200">{currentLayout.matArrangement}</span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleMatsukazeSound}
                    className={cn(
                      'rounded-lg border px-3.5 py-1.5 font-mono text-xs transition-all',
                      isMatsukazePlaying
                        ? 'border-amber-400 bg-amber-950 text-amber-200 animate-pulse'
                        : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-amber-400'
                    )}
                  >
                    {isMatsukazePlaying ? '🍵 Đang Nghe Tiếng Reo Matsukaze...' : '🍵 Nghe Tiếng Nước Reo Ấm Gang (6s)'}
                  </button>
                </div>
              </div>

              {/* Natural Reed Grass Craft Note */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-xs text-stone-300 leading-relaxed">
                <span className="font-serif text-amber-300 font-medium">Hồn Cói Định Yên Sấy Thảo Mộc: </span>
                Sợi cói được tuyển lựa thủ công từ vùng đất bãi phù sa ngập mặn Đồng Tháp, sau đó sấy khô tự nhiên cùng lá dứa và quế chi để tạo mùi thơm dịu nhẹ, xua đuổi côn trùng tự nhiên và đem lại cảm giác êm ái mát lành cho đôi bàn chân trần.
              </div>
            </div>

            {/* Right 5 cols: Architectural Specifications & Consultation Form */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Chashitsu Architectural Elements */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-3">
                  4 Yếu Tố Cấu Trúc Trà Thất GuHomes
                </h4>
                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-amber-300 font-medium block">
                      1. Bậc Cửa Nijiriguchi &amp; Sàn Hinoki Giật Cấp 350mm:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Lối vào buộc khách phải cúi mình buông bỏ danh lợi quyền lực bên ngoài trước khi bước vào cõi trà tịnh độ.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-emerald-300 font-medium block">
                      2. Cửa Trượt Shoji Bọc Giấy Washi Xơ Dâu:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Lọc sáng mềm mại như bóng trăng mờ, cản nhiệt độ ẩm bên ngoài và giữ trọn tĩnh âm bên trong.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-cyan-300 font-medium block">
                      3. Góc Trang Nghiêm Tokonoma:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Nơi treo tranh thư pháp chữ Tâm và bình hoa cắm kiểu Chabana (hoa của trà) đón gió giao mùa.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-purple-300 font-medium block">
                      4. Lò Đun Gang Tetsubin m Sàn:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Sử dụng than củi không khói nung từ gáo dừa Bến Tre, duy trì nước sôi liu riu ở mức 85°C – 90°C.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consultation Form with VIP Code */}
              <div className="rounded-xl border border-amber-900/60 bg-stone-950/90 p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h4 className="font-serif text-sm text-stone-200 font-medium">
                    Tư Vấn Thiết Kế Trà Thất Dinh Thự
                  </h4>
                  <span className="font-mono text-xs text-amber-400 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-500/40">
                    VIP: GU-TATAMI-2026-X
                  </span>
                </div>

                {isSubmitted ? (
                  <div className="mt-4 rounded-lg bg-amber-950/40 border border-amber-500/40 p-4 text-center">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-amber-400 mb-2">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                    <p className="font-serif text-amber-200 text-sm">
                      Yêu cầu khảo sát không gian trà thất đã được tiếp nhận.
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      KTS GuHomes chuyên trách phòng thiền trà sẽ gửi phương án mặt bằng và mẫu cói Định Yên trong vòng 24 giờ.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1">
                        Vị Trí Dự Kiến Bố Trí Trà Thất:
                      </label>
                      <select
                        value={roomLocation}
                        onChange={(e) => setRoomLocation(e.target.value)}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 focus:border-amber-500 focus:outline-none"
                      >
                        <option value="penthouse-atrium">Khoảng Đệm Giếng Trời Penthouse (8 – 15m²)</option>
                        <option value="master-terrace">Sân Vườn Sỏi Cào Logia Master Suite</option>
                        <option value="rooftop-pavilion">Chòi Thiền Trà Sân Thượng Biệt Thự Sông</option>
                        <option value="library-annex">Không Gian Kế Bên Thư Viện Sách</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1">
                        Số Điện Thoại / Zalo Gia Chủ:
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx xxx xxx"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-500 focus:outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-amber-500/40 bg-gradient-to-r from-amber-800 to-amber-600 px-4 py-2.5 text-xs font-medium text-amber-100 hover:from-amber-700 hover:to-amber-500 transition-all shadow-md"
                    >
                      <span>Gửi Yêu Cầu May Đo (Mã GU-TATAMI-2026-X)</span>
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </button>
                  </form>
                )}

                <div className="mt-3 text-[10px] text-stone-500 text-center">
                  Gói dịch vụ gồm chiếu Tatami may đo, khung sàn Hinoki và lò than âm sàn.
                </div>
              </div>

              {/* Consultation Link Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=japanese-tatami-chashitsu"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-900/80 to-amber-700/80 px-5 py-3 text-xs sm:text-sm font-medium text-amber-100 hover:from-amber-800 hover:to-amber-600 transition-all shadow-lg shadow-amber-950/50"
                >
                  <span>Đặt Lịch Tư Vấn Trà Thất Dinh Thự</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-amber-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Trải nghiệm chiếu mẫu tại Studio GuHomes Thạnh Xuân, Q.12.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
