'use client'

import { useState, useRef, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface HistoricalMapItem {
  id: string
  title: string
  year: string
  cartographer: string
  medium: string
  provenance: string
  dimensions: string
  coordinates: string
  focalFeature: string
  depthNotes: string
  preservationStatus: string
}

const HISTORICAL_MAPS: HistoricalMapItem[] = [
  {
    id: 'dayot-1795',
    title: 'Hải Đồ Bờ Biển Đàng Trong & Vịnh Bến Nghé',
    year: '1795',
    cartographer: 'Jean-Marie Dayot (Chỉ huy Hải quân thời Chúa Nguyễn)',
    medium: 'Mực nho & mộc bản trên giấy sợi bông thủ công (Cotton Rag)',
    provenance: 'Kho lưu trữ Hàng hải Brest & Hoàng gia Gia Long',
    dimensions: '880 x 620 mm',
    coordinates: '10°46\'10"B • 106°43\'12"Đ',
    focalFeature: 'Luồng lạch hoa tiêu sông Lòng Tàu & Cửa Cần Giờ tiến vào thành Gia Định',
    depthNotes: 'Độ sâu đo bằng sải tay (fathoms): 6.5 - 11.2 sải nước triều cường',
    preservationStatus: 'Bảo quản Artglass UV99 • Khí trơ N2 18% O2 • 50% RH',
  },
  {
    id: 'medicis-1815',
    title: 'Bản Đồ Hoa Tiêu Sông Đồng Nai - Bến Nghé',
    year: '1815',
    cartographer: 'Pierre de Médicis & Đội Hoa tiêu Thủy cơ triều Nguyễn',
    medium: 'Bản vẽ tay chu sa đỏ, mực son tự nhiên và viền vàng lá',
    provenance: 'Bộ sưu tập tư nhân quý tộc Pháp tại Marseille',
    dimensions: '1040 x 740 mm',
    coordinates: '10°47\'30"B • 106°42\'20"Đ',
    focalFeature: 'Pháo đài Hổ Cứ, Xưởng Chu Sư (Ba Son cổ) và Thành Bát Quái',
    depthNotes: 'Các bãi ngầm phù sa ven doi đất Thủ Thiêm và rạch Bến Nghé',
    preservationStatus: 'Nhiệt độ ổn định 20.0°C • Sợi quang lạnh 0.00 Lux UV',
  },
  {
    id: 'depot-marine-1859',
    title: 'Hải Trình Gia Định Kinh & Côn Đảo',
    year: '1859',
    cartographer: 'Phòng Đo đạc Thủy văn Viễn Đông (Dépôt des cartes)',
    medium: 'Bản khắc kẽm mạ đồng, giấy ngâm phèn chống mối mọt',
    provenance: 'Hội Địa lý Paris chuyển giao tư gia',
    dimensions: '960 x 680 mm',
    coordinates: '10°20\'00"B • 107°04\'15"Đ',
    focalFeature: 'Hải trình từ ngọn hải đăng Vũng Tàu qua vịnh Gành Rái vào Bến Cảng',
    depthNotes: 'Đường bình độ sâu đáy bùn biển sâu và gió mùa Tây Nam',
    preservationStatus: 'Kiểm soát chấn động rung chấn &lt; 0.2 mm/s sàn nổi',
  },
  {
    id: 'cadastre-1881',
    title: 'Bản Đồ Thủy Đạo Nam Kỳ Lục Tỉnh & Sông Sài Gòn',
    year: '1881',
    cartographer: 'Sở Trắc địa Địa bạ Đông Dương (Service Géographique)',
    medium: 'Kỹ thuật in thạch bản màu (Lithography) đa lớp sắc sảo',
    provenance: 'Thư viện Tòa Đốc lý Sài Gòn cũ',
    dimensions: '1220 x 850 mm',
    coordinates: '10°45\'55"B • 106°41\'50"Đ',
    focalFeature: 'Mạng lưới kênh rạch liên tỉnh kết nối Chợ Lớn với vựa lúa Cửu Long',
    depthNotes: 'Luồng xà lan trọng tải lớn và âu thuyền rạch Tàu Hũ',
    preservationStatus: 'Kính ghép nhiều lớp chân không kẹp film PVB cản 99.9% tia UV',
  },
]

export function SaigonMaritimeAntiqueMapLibraryVault({ className }: { className?: string } = {}) {
  const [activeMapId, setActiveMapId] = useState<string>('dayot-1795')
  const [zoomLevel, setZoomLevel] = useState<number>(2)
  const [isFiberOpticCoolLight, setIsFiberOpticCoolLight] = useState<boolean>(true)
  const [vaultMode, setVaultMode] = useState<'display' | 'archival'>('display')
  const [magnifierPos, setMagnifierPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 })
  const [armillaryAngle, setArmillaryAngle] = useState<number>(107)

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const activeMap = HISTORICAL_MAPS.find((m) => m.id === activeMapId) ?? HISTORICAL_MAPS[0]!
  const headingId = useId()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapContainerRef.current) return
    const rect = mapContainerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
    setMagnifierPos({ x, y })
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background warm brass & nautical cartography ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 h-[450px] w-[450px] rounded-full bg-amber-900/15 blur-[160px]" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-yellow-900/10 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(217,119,6,0.05),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Di Sản Hàng Hải &amp; Kỹ Nghệ Lưu Trữ Bảo Tàng
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Thư Viện Hải Đồ Cổ Đàng Trong &amp; Địa Cầu Đồng Thau C36000
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Nơi lưu giữ những hải đồ hàng hải sông Sài Gòn thế kỷ 18–19 của các hoa tiêu phương Tây và triều Nguyễn. 
            Tủ kính chuyên dụng Artglass UV99 chống 99.9% tia cực tím, vi khí hậu chuẩn bảo tàng 50% RH ngăn giòn ố vàng giấy cổ, 
            kết hợp hệ chiếu sáng sợi quang Fiber Optic lạnh hoàn toàn không sinh nhiệt và quả địa cầu cơ khí C36000 xoay trục thiên văn.
          </p>
        </div>

        {/* Interactive Cartography & Vault Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Interactive Digital Magnifier on Nautical Chart */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Bản Đồ Hiện Vật Đang Soi
                    </span>
                    <h3 className="mt-1 font-serif text-lg sm:text-xl text-stone-100">
                      {activeMap.title} ({activeMap.year})
                    </h3>
                  </div>
                  
                  {/* Microclimate Quick Status Badges */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">50.0% RH</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">20.0°C</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">UV 0.00</span>
                  </div>
                </div>

                {/* Map Display & Interactive Magnifier Canvas */}
                <div
                  ref={mapContainerRef}
                  onMouseMove={handleMouseMove}
                  className={cn(
                    'relative mt-6 h-80 sm:h-96 w-full cursor-crosshair overflow-hidden rounded-xl border select-none transition-colors duration-500',
                    isFiberOpticCoolLight
                      ? 'border-amber-900/60 bg-[#16120e] shadow-[inset_0_0_60px_rgba(180,83,9,0.15)]'
                      : 'border-yellow-950 bg-[#121110] shadow-[inset_0_0_60px_rgba(0,0,0,0.8)]'
                  )}
                >
                  {/* SVG Ancient Map Background Graphics */}
                  <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 1000 600" fill="none">
                    {/* Rhumb lines / Loxodromes navigation web */}
                    <g stroke="rgba(217,119,6,0.22)" strokeWidth="0.8" strokeDasharray="3 3">
                      <line x1="500" y1="300" x2="100" y2="50" />
                      <line x1="500" y1="300" x2="900" y2="80" />
                      <line x1="500" y1="300" x2="950" y2="520" />
                      <line x1="500" y1="300" x2="80" y2="480" />
                      <line x1="500" y1="300" x2="500" y2="20" />
                      <line x1="500" y1="300" x2="500" y2="580" />
                      <line x1="500" y1="300" x2="20" y2="300" />
                      <line x1="500" y1="300" x2="980" y2="300" />
                    </g>

                    {/* Stylized Saigon River (Sông Lòng Tàu & Bến Nghé) course */}
                    <path
                      d="M150,550 C260,520 280,450 360,420 C440,390 410,320 480,290 C550,260 590,280 650,230 C710,180 750,140 820,110 C880,90 920,80 970,70"
                      stroke="rgba(202,138,4,0.4)"
                      strokeWidth="24"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M150,550 C260,520 280,450 360,420 C440,390 410,320 480,290 C550,260 590,280 650,230 C710,180 750,140 820,110 C880,90 920,80 970,70"
                      stroke="rgba(251,191,36,0.7)"
                      strokeWidth="3"
                      strokeDasharray="6 4"
                      fill="none"
                    />

                    {/* Tributaries (Rạch Bến Nghé, Thị Nghè, Đồng Nai) */}
                    <path
                      d="M480,290 C450,250 400,240 340,230"
                      stroke="rgba(202,138,4,0.35)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <path
                      d="M650,230 C640,170 600,140 560,110"
                      stroke="rgba(202,138,4,0.3)"
                      strokeWidth="6"
                      fill="none"
                    />

                    {/* 16-point Compass Rose (Hoa gió hoa tiêu hàng hải) */}
                    <g transform="translate(820, 440)">
                      <circle r="48" stroke="rgba(217,119,6,0.3)" strokeWidth="1" fill="rgba(26,18,11,0.6)" />
                      <circle r="36" stroke="rgba(217,119,6,0.4)" strokeWidth="0.8" fill="none" />
                      <polygon points="0,-48 10,-12 0,0 -10,-12" fill="#d97706" />
                      <polygon points="0,48 10,12 0,0 -10,12" fill="rgba(217,119,6,0.5)" />
                      <polygon points="48,0 12,10 0,0 12,-10" fill="rgba(217,119,6,0.7)" />
                      <polygon points="-48,0 -12,10 0,0 -12,-10" fill="rgba(217,119,6,0.5)" />
                      <text x="0" y="-54" textAnchor="middle" fill="#fde68a" fontSize="12" fontFamily="serif" fontWeight="bold">N</text>
                      <text x="56" y="4" textAnchor="middle" fill="#d97706" fontSize="11" fontFamily="serif">E</text>
                      <text x="0" y="64" textAnchor="middle" fill="#d97706" fontSize="11" fontFamily="serif">S</text>
                      <text x="-56" y="4" textAnchor="middle" fill="#d97706" fontSize="11" fontFamily="serif">W</text>
                    </g>

                    {/* Historic landmarks markers */}
                    <g transform="translate(470, 275)">
                      <rect x="-6" y="-6" width="12" height="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="14" y="4" fill="#fde68a" fontSize="11" fontFamily="serif">Thành Bát Quái (1790)</text>
                    </g>
                    <g transform="translate(640, 220)">
                      <circle r="4" fill="#d97706" />
                      <text x="10" y="4" fill="#fbbf24" fontSize="10" fontFamily="serif">Xưởng Chu Sư Thủy Cơ</text>
                    </g>
                    <g transform="translate(220, 480)">
                      <circle r="5" stroke="#f59e0b" strokeWidth="1" fill="none" />
                      <text x="10" y="4" fill="#fde68a" fontSize="10" fontFamily="serif">Cửa Vịnh Cần Giờ (Độ sâu 9.5 sải)</text>
                    </g>

                    {/* Royal Nguyen seal watermark outline */}
                    <g transform="translate(180, 160)" stroke="rgba(239,68,68,0.25)" fill="none" strokeWidth="1">
                      <rect x="-30" y="-30" width="60" height="60" />
                      <rect x="-24" y="-24" width="48" height="48" />
                      <text x="0" y="5" textAnchor="middle" fill="rgba(239,68,68,0.3)" fontSize="10" fontFamily="serif">
                        HOÀNG TRIỀU
                      </text>
                    </g>
                  </svg>

                  {/* Fiber Optic Cold-Light Cone */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: isFiberOpticCoolLight
                        ? `radial-gradient(circle 180px at ${magnifierPos.x}% ${magnifierPos.y}%, rgba(253,230,138,0.18), transparent 70%)`
                        : `radial-gradient(circle 140px at ${magnifierPos.x}% ${magnifierPos.y}%, rgba(245,158,11,0.12), transparent 60%)`,
                    }}
                  />

                  {/* Digital Magnifier Loupe Ring */}
                  <div
                    className="pointer-events-none absolute h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber-400/90 shadow-[0_0_25px_rgba(245,158,11,0.4),inset_0_0_20px_rgba(253,230,138,0.2)] backdrop-brightness-125 backdrop-contrast-125"
                    style={{
                      left: `${magnifierPos.x}%`,
                      top: `${magnifierPos.y}%`,
                    }}
                  >
                    {/* Reticle Crosshair in Loupe */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-[1px] bg-amber-400/30" />
                      <div className="absolute h-[1px] w-full bg-amber-400/30" />
                      <div className="h-6 w-6 rounded-full border border-amber-300/60" />
                    </div>
                    {/* Magnification Badge */}
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-amber-400/80 bg-stone-950 px-2 py-0.5 font-mono text-[10px] text-amber-300 shadow">
                      {zoomLevel}x ZOOM
                    </span>
                  </div>

                  {/* Coordinate Overlay Banner */}
                  <div className="absolute bottom-3 left-3 z-10 flex items-center gap-3 rounded-lg border border-amber-500/20 bg-stone-950/85 px-3 py-1.5 text-xs backdrop-blur-sm">
                    <span className="font-mono text-amber-400">
                      TỌA ĐỘ: {activeMap.coordinates}
                    </span>
                    <span className="hidden sm:inline text-stone-500">•</span>
                    <span className="hidden sm:inline text-stone-300 font-serif">
                      {activeMap.focalFeature}
                    </span>
                  </div>
                </div>

                {/* Magnifier & Cold-Light Controls */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-medium">Độ Phóng Đại Kính Lúp:</span>
                    {[2, 3, 4].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setZoomLevel(level)}
                        className={cn(
                          'rounded-md px-2.5 py-1 font-mono transition-all',
                          zoomLevel === level
                            ? 'border border-amber-400 bg-amber-950/70 text-amber-200'
                            : 'border border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {level}x
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-stone-400 font-medium">Hệ Chiếu Sáng:</span>
                    <button
                      type="button"
                      onClick={() => setIsFiberOpticCoolLight(!isFiberOpticCoolLight)}
                      className={cn(
                        'rounded-md border px-3 py-1 font-mono transition-all',
                        isFiberOpticCoolLight
                          ? 'border-amber-400/70 bg-amber-950/60 text-amber-300'
                          : 'border-stone-800 bg-stone-900/50 text-stone-400'
                      )}
                    >
                      {isFiberOpticCoolLight ? '● Sợi Quang Lạnh (2700K 0 UV)' : '○ Đèn Thường'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Curatorial Annotation Box */}
              <div className="mt-6 rounded-xl border border-stone-800/80 bg-stone-950/60 p-4 text-xs leading-relaxed text-stone-300">
                <div className="font-serif text-amber-300 font-medium mb-1">
                  Khảo Cổ &amp; Hoa Tiêu Học:
                </div>
                <p>
                  {activeMap.focalFeature}. {activeMap.depthNotes}. Chất liệu độc bản {activeMap.medium}, kích thước chuẩn bảo tàng {activeMap.dimensions}.
                </p>
              </div>
            </div>

            {/* Right 5 cols: Map Catalog & Microclimate Archive Cockpit */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Historical Map Catalog Selector */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Thư Mục Hải Đồ Hoàng Gia &amp; Viễn Đông (4 Bản)
                </h4>
                <div className="mt-3 space-y-2.5">
                  {HISTORICAL_MAPS.map((map) => {
                    const isSelected = map.id === activeMapId
                    return (
                      <button
                        key={map.id}
                        type="button"
                        onClick={() => setActiveMapId(map.id)}
                        className={cn(
                          'w-full text-left rounded-xl border p-3 transition-all duration-300',
                          isSelected
                            ? 'border-amber-500/80 bg-gradient-to-r from-amber-950/50 to-stone-900 text-stone-100 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-serif font-medium text-stone-200">
                            {map.title}
                          </span>
                          <span className="font-mono text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                            {map.year}
                          </span>
                        </div>
                        <div className="mt-1 text-[11px] text-stone-400 font-light truncate">
                          {map.cartographer}
                        </div>
                        <div className="mt-1 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                          <span>{map.dimensions}</span>
                          <span className="text-amber-300/80">{map.provenance}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Microclimate Vault Preservation Cockpit */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                      Tủ Kính Artglass UV99 Microclimate
                    </span>
                  </div>
                  <div className="flex rounded-md border border-stone-800 p-0.5 text-[10px] font-mono">
                    <button
                      type="button"
                      onClick={() => setVaultMode('display')}
                      className={cn(
                        'rounded px-2 py-0.5 transition-colors',
                        vaultMode === 'display' ? 'bg-amber-950 text-amber-300' : 'text-stone-400'
                      )}
                    >
                      Chiêm Ngưỡng
                    </button>
                    <button
                      type="button"
                      onClick={() => setVaultMode('archival')}
                      className={cn(
                        'rounded px-2 py-0.5 transition-colors',
                        vaultMode === 'archival' ? 'bg-amber-950 text-amber-300' : 'text-stone-400'
                      )}
                    >
                      Bảo Tồn N2
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Độ Ẩm Tương Đối</span>
                    <div className="mt-1 font-mono text-lg text-emerald-400 font-semibold">50.0% RH</div>
                    <span className="text-[9px] text-stone-500">Dung sai ±1.2% RH</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Nhiệt Độ Buồng</span>
                    <div className="mt-1 font-mono text-lg text-amber-300 font-semibold">20.0°C</div>
                    <span className="text-[9px] text-stone-500">Biến thiên dưới 0.3°C</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Bức Xạ Tử Ngoại</span>
                    <div className="mt-1 font-mono text-lg text-cyan-400 font-semibold">0.00 W/m²</div>
                    <span className="text-[9px] text-stone-500">Artglass cản 99.9% UV</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Nồng Độ Khí O2</span>
                    <div className="mt-1 font-mono text-lg text-purple-300 font-semibold">
                      {vaultMode === 'archival' ? '14.5%' : '18.2%'}
                    </div>
                    <span className="text-[9px] text-stone-500">Ngăn ố vàng axit giấy</span>
                  </div>
                </div>

                {/* Brass C36000 Armillary Sphere Axis Dial */}
                <div className="mt-4 pt-3 border-t border-stone-800/80">
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span className="font-serif">Địa Cầu Cơ Khí Đồng Thau C36000:</span>
                    <span className="font-mono text-amber-400">{armillaryAngle}° Đông Kinh Tuyến</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={armillaryAngle}
                    onChange={(e) => setArmillaryAngle(Number(e.target.value))}
                    aria-label="Góc quay kinh tuyến quả địa cầu đồng thau C36000"
                    className="mt-2 w-full accent-amber-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>0° Greenwich</span>
                    <span>106°42&apos; Sài Gòn (Kinh Tuyến Gốc)</span>
                    <span>360° Vòng Tròn</span>
                  </div>
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=maritime-antique-map-vault"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-900/80 to-amber-700/80 px-5 py-3 text-xs sm:text-sm font-medium text-amber-100 hover:from-amber-800 hover:to-amber-600 transition-all shadow-lg shadow-amber-950/50"
                >
                  <span>Đặt Lịch Tư Vấn Thư Viện Bản Đồ Cổ</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-amber-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Giám tuyển &amp; chế tác vi khí hậu riêng cho biệt thự, penthouse.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
