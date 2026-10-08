'use client'

import { useState, useRef, useEffect } from 'react'
import { cn, formatArea } from '@/lib/utils'
import type { ProjectDetail } from '@/types/content'
import { ArrowUpRightIcon, CloseIcon } from '@/components/ui/icons'
import { getTactileSpecs } from './tactileSpecs'

export interface ProjectBlueprintSectionProps {
  project: ProjectDetail
  className?: string
}

interface Hotspot {
  id: number
  x: number // percentage
  y: number // percentage
  title: string
  subtitle: string
  solution: string
}

export function ProjectBlueprintSection({ project, className }: ProjectBlueprintSectionProps) {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(1)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })

  const specs = getTactileSpecs(project)
  const areaDisplay = formatArea(project.area) || '145 m²'

  const HOTSPOTS: Hotspot[] = [
    {
      id: 1,
      x: 18,
      y: 35,
      title: 'Logia Xanh & Vùng Đệm Cản Nhiệt',
      subtitle: 'Hướng Tây xế chiều',
      solution:
        'Hệ lam gỗ sồi tự nhiên xoay 45° kết hợp rặng cây tán lá nhiệt đới, triệt tiêu 70% bức xạ mặt trời gay gắt, giúp hạ nhiệt độ bề mặt phòng khách 4–6°C.',
    },
    {
      id: 2,
      x: 52,
      y: 42,
      title: 'Đảo Bếp & Trục Gió Xuyên Phòng',
      subtitle: 'Đối lưu không khí tự nhiên',
      solution:
        'Bàn đảo đá Travertine nguyên khối đặt chính xác trên luồng gió hút từ ban công sang logia sau, giải phóng hơi nóng và mùi ẩm mùa mưa Sài Gòn trong 15 phút.',
    },
    {
      id: 3,
      x: 78,
      y: 32,
      title: 'Phòng Ngủ Master Yên Tĩnh',
      subtitle: 'Đệm cách âm & Vữa vôi Calce',
      solution:
        'Hệ tường đôi tiêu âm gián tiếp, hoàn thiện bằng vữa vôi khoáng Ý Calce có khả năng thở vi mao quản, duy trì độ ẩm lý tưởng 58% cho giấc ngủ sâu.',
    },
    {
      id: 4,
      x: 65,
      y: 72,
      title: 'Hệ Tủ May Đo Âm Tường',
      subtitle: 'Khe co ngót vi khí hậu 4mm',
      solution:
        'Toàn bộ vách và tủ kịch trần chế tác tại xưởng mộc GuHomes với khe kỹ thuật 4mm chống cong vênh giãn nở dưới độ ẩm 80% quanh năm.',
    },
  ]

  // Keyboard close for lightbox
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
      }
    }
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setZoomLevel(1)
      setPan({ x: 0, y: 0 })
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen])

  // Mouse pan handlers for Lightbox
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return
    isDragging.current = true
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    })
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  return (
    <section className={cn('bg-[#101413] text-[#F3F1EC] py-[clamp(4.5rem,10vh,8rem)] relative overflow-hidden', className)}>
      {/* Blueprint Grid Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #4FD1C5 1px, transparent 1px), linear-gradient(to bottom, #4FD1C5 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-6 items-end pb-10 border-b border-white/10">
          <div className="col-span-12 lg:col-span-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs uppercase tracking-widest font-mono">
              <span>Bản Vẽ Kỹ Thuật · Kiến Trúc Vi Khí Hậu</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-4 tracking-tight">
              Mặt Bằng Công Năng &amp; Giải Pháp Thông Gió Đối Lưu
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-[58ch] mt-4 font-light leading-relaxed">
              Mỗi mét vuông tại <span className="text-white font-medium">{project.title}</span> được định hình dựa trên hải trình của ánh sáng và dòng đối lưu gió tự nhiên của Sài Gòn.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-4">
            <div className="text-xs font-mono text-white/50 space-y-1">
              <p>QUY MÔ: <span className="text-white">{areaDisplay}</span></p>
              <p>VI KHÍ HẬU: <span className="text-accent">{specs.climateOrientation}</span></p>
              <p>CHUẨN THI CÔNG: <span className="text-white">Dung sai &le; 1.5mm</span></p>
            </div>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono tracking-wider border border-white/20 hover:border-accent transition-all duration-300 group"
            >
              <span>Phóng to bản vẽ kỹ thuật</span>
              <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Blueprint Interactive Canvas */}
        <div className="mt-10 grid grid-cols-12 gap-8 items-start">
          {/* SVG Floorplan View */}
          <div className="col-span-12 lg:col-span-8 bg-[#0B0E0D] border border-white/15 rounded-2xl p-6 sm:p-10 relative shadow-2xl group">
            {/* Technical Stamp / Scale */}
            <div className="flex items-center justify-between text-[11px] font-mono text-white/40 pb-4 border-b border-white/10">
              <div className="flex items-center gap-4">
                <span>DỰ ÁN: {project.title.toUpperCase()}</span>
                <span>·</span>
                <span>TỶ LỆ: 1:50</span>
              </div>
              <div className="flex items-center gap-2 text-accent">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>GIÓ SÔNG SÀI GÒN: 150° NAM</span>
              </div>
            </div>

            {/* The Blueprint SVG Container */}
            <div
              className="relative my-8 aspect-[16/10] w-full border border-dashed border-white/20 rounded-lg p-4 cursor-pointer overflow-hidden bg-[#070908]"
              onClick={() => setIsLightboxOpen(true)}
              title="Click để mở Lightbox chi tiết bản vẽ"
            >
              {/* Floorplan Vector Drawing */}
              <svg viewBox="0 0 800 500" className="w-full h-full text-white/80 select-none">
                <defs>
                  <linearGradient id="windGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.1" />
                  </linearGradient>
                  <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#ffffff" strokeWidth="0.8" opacity="0.15" />
                  </pattern>
                </defs>

                {/* Outer Wall Boundary */}
                <rect x="60" y="40" width="680" height="420" rx="8" fill="none" stroke="#F3F1EC" strokeWidth="3" opacity="0.85" />
                
                {/* Structural Concrete Columns */}
                <rect x="56" y="36" width="16" height="16" fill="#F3F1EC" opacity="0.9" />
                <rect x="392" y="36" width="16" height="16" fill="#F3F1EC" opacity="0.9" />
                <rect x="728" y="36" width="16" height="16" fill="#F3F1EC" opacity="0.9" />
                <rect x="56" y="436" width="16" height="16" fill="#F3F1EC" opacity="0.9" />
                <rect x="392" y="436" width="16" height="16" fill="#F3F1EC" opacity="0.9" />
                <rect x="728" y="436" width="16" height="16" fill="#F3F1EC" opacity="0.9" />

                {/* Internal Partitions */}
                {/* Master Bedroom Suite */}
                <rect x="520" y="40" width="220" height="230" fill="url(#hatch)" stroke="#F3F1EC" strokeWidth="2" strokeDasharray="4 2" opacity="0.5" />
                <text x="540" y="70" fill="#F3F1EC" fontSize="12" fontFamily="monospace" opacity="0.6">MASTER BEDROOM</text>
                
                {/* Spa Bathroom */}
                <rect x="520" y="270" width="220" height="190" fill="none" stroke="#F3F1EC" strokeWidth="1.5" opacity="0.4" />
                <text x="540" y="300" fill="#F3F1EC" fontSize="11" fontFamily="monospace" opacity="0.5">SPA BATH &amp; WALK-IN</text>

                {/* Kitchen & Dining */}
                <rect x="300" y="40" width="220" height="230" fill="none" stroke="#F3F1EC" strokeWidth="1.5" opacity="0.5" />
                <text x="320" y="70" fill="#F3F1EC" fontSize="12" fontFamily="monospace" opacity="0.6">DINING &amp; KITCHEN</text>
                {/* Travertine Island */}
                <rect x="360" y="120" width="100" height="50" rx="4" fill="#E28743" fillOpacity="0.25" stroke="#E28743" strokeWidth="2" />
                <text x="375" y="150" fill="#E28743" fontSize="10" fontFamily="monospace">ISLAND</text>

                {/* Living Area */}
                <rect x="60" y="160" width="240" height="300" fill="none" stroke="#F3F1EC" strokeWidth="1.5" opacity="0.5" />
                <text x="80" y="195" fill="#F3F1EC" fontSize="12" fontFamily="monospace" opacity="0.6">LIVING SANCTUARY</text>

                {/* Logia & Thermal Buffer */}
                <rect x="60" y="40" width="240" height="120" fill="#2DD4BF" fillOpacity="0.08" stroke="#2DD4BF" strokeWidth="2" />
                <text x="80" y="70" fill="#2DD4BF" fontSize="11" fontFamily="monospace">TROPICAL LOGIA</text>

                {/* Louver Blades */}
                <line x1="75" y1="90" x2="285" y2="90" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
                <line x1="75" y1="110" x2="285" y2="110" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />
                <line x1="75" y1="130" x2="285" y2="130" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.7" />

                {/* Convective Airflow Paths (Cyan Curves) */}
                <path d="M 180 430 Q 200 300 360 210 T 520 120 T 700 80" fill="none" stroke="url(#windGrad)" strokeWidth="3" strokeDasharray="8 6" />
                <path d="M 140 430 Q 170 320 380 260 T 600 320" fill="none" stroke="url(#windGrad)" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

                {/* Wind Vectors */}
                <polygon points="695,75 710,80 695,85" fill="#2DD4BF" />
                <polygon points="595,315 610,320 595,325" fill="#2DD4BF" opacity="0.7" />

                {/* Dimension Lines */}
                <line x1="60" y1="25" x2="740" y2="25" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />
                <line x1="60" y1="20" x2="60" y2="30" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
                <line x1="740" y1="20" x2="740" y2="30" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
                <text x="380" y="20" fill="#ffffff" fontSize="10" fontFamily="monospace" opacity="0.5" textAnchor="middle">14,800 mm</text>
              </svg>

              {/* Hotspot Interactive Markers */}
              {HOTSPOTS.map((spot) => {
                const isSelected = activeHotspot === spot.id
                return (
                  <button
                    key={spot.id}
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveHotspot(spot.id)
                    }}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={cn(
                      'absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-semibold transition-all duration-300 z-20 shadow-lg',
                      isSelected
                        ? 'bg-accent text-white scale-125 ring-4 ring-accent/30'
                        : 'bg-white/20 backdrop-blur-md text-white hover:bg-accent/80 hover:scale-110 border border-white/40',
                    )}
                    aria-label={`Hotspot ${spot.id}: ${spot.title}`}
                  >
                    <span>{spot.id}</span>
                  </button>
                )
              })}
            </div>

            {/* Bottom Toolbar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/60 pt-4 border-t border-white/10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-[#2DD4BF]" />
                  <span>Luồng đối lưu gió tươi</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E28743]/80" />
                  <span>Vật liệu đá Travertine &amp; Gỗ óc chó</span>
                </span>
              </div>
              <span className="text-white/40 italic">Click điểm số 1–4 để xem giải pháp chi tiết</span>
            </div>
          </div>

          {/* Hotspot Detail Callout Card */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
            <div className="bg-[#0B0E0D] border border-white/15 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider">
                <span>Điểm neo kiến trúc #{activeHotspot ?? 1}</span>
              </div>

              {HOTSPOTS.filter((s) => s.id === (activeHotspot ?? 1)).map((spot) => (
                <div key={spot.id} className="mt-4">
                  <h3 className="font-serif text-2xl text-white font-normal">{spot.title}</h3>
                  <p className="text-accent text-xs font-mono mt-1">{spot.subtitle}</p>

                  <div className="mt-5 p-4 rounded-xl bg-white/[0.03] border border-white/10 text-white/80 text-sm leading-relaxed font-light">
                    {spot.solution}
                  </div>
                </div>
              ))}

              <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-2">
                <p className="text-xs font-mono text-white/50">CHỌN PHÂN KHU ĐỂ PHÂN TÍCH:</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {HOTSPOTS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveHotspot(s.id)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-left text-xs font-mono transition-all',
                        activeHotspot === s.id
                          ? 'bg-accent/20 border border-accent text-accent font-medium'
                          : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10',
                      )}
                    >
                      #{s.id} {s.title.split('&')[0]?.trim()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inquire Card */}
            <div className="bg-gradient-to-br from-accent/20 to-white/[0.02] border border-accent/30 rounded-2xl p-6 text-white">
              <p className="text-xs font-mono uppercase tracking-widest text-accent">Khai Phóng Không Gian</p>
              <h4 className="font-serif text-xl font-light mt-1">Căn hộ của bạn cũng có vi khí hậu độc bản?</h4>
              <p className="text-xs text-white/70 mt-2 font-light leading-relaxed">
                Đội ngũ KTS GuHomes khảo sát hướng nắng, độ ồn và luồng gió thực địa tại công trình trước khi phác thảo phương án.
              </p>
              <a
                href="#contact-form"
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById('contact-form') || document.querySelector('form')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-4 inline-flex items-center gap-2 text-xs font-mono tracking-wider text-accent hover:text-white transition-colors"
              >
                <span>Đặt lịch khảo sát vi khí hậu cùng KTS Trưởng</span>
                <ArrowUpRightIcon className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {isLightboxOpen ? (
        <div className="fixed inset-0 z-50 bg-[#070908]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300">
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 z-20">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest">High-Resolution Blueprint Lightbox</p>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">{project.title} — Bản Vẽ Công Năng Chi Tiết</h3>
            </div>

            <div className="flex items-center gap-3">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-white/10 rounded-full p-1 border border-white/20 font-mono text-xs text-white">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Thu nhỏ"
                >
                  -
                </button>
                <span className="px-2 tabular-nums">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                  title="Phóng to"
                >
                  +
                </button>
                <button
                  onClick={() => {
                    setZoomLevel(1)
                    setPan({ x: 0, y: 0 })
                  }}
                  className="px-2.5 h-8 rounded-full hover:bg-white/20 flex items-center justify-center text-[11px] text-white/70 hover:text-white transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Đóng bản vẽ"
              >
                <CloseIcon className="text-xl" />
              </button>
            </div>
          </div>

          {/* Interactive Canvas Workspace */}
          <div
            className="flex-1 w-full relative overflow-hidden flex items-center justify-center my-4 cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <div
              className="transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
              }}
            >
              <div className="w-[85vw] max-w-[1200px] aspect-[16/10] bg-[#0A0D0C] border-2 border-white/30 rounded-xl p-8 relative shadow-2xl">
                {/* Embedded SVG in full detail */}
                <svg viewBox="0 0 800 500" className="w-full h-full text-white/90">
                  <defs>
                    <linearGradient id="windGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  {/* Blueprint Lines */}
                  <rect x="60" y="40" width="680" height="420" rx="8" fill="none" stroke="#F3F1EC" strokeWidth="3" />
                  
                  {/* Grid Lines */}
                  <line x1="60" y1="160" x2="740" y2="160" stroke="#F3F1EC" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <line x1="60" y1="270" x2="740" y2="270" stroke="#F3F1EC" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <line x1="300" y1="40" x2="300" y2="460" stroke="#F3F1EC" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <line x1="520" y1="40" x2="520" y2="460" stroke="#F3F1EC" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

                  {/* Rooms */}
                  <text x="80" y="70" fill="#2DD4BF" fontSize="14" fontFamily="monospace" fontWeight="bold">01. LOGIA NHIỆT ĐỚI &amp; CẢN BỨC XẠ HƯỚNG TÂY</text>
                  <text x="80" y="210" fill="#F3F1EC" fontSize="14" fontFamily="monospace" fontWeight="bold">02. PHÒNG KHÁCH QUIET LUXURY</text>
                  <text x="320" y="70" fill="#E28743" fontSize="14" fontFamily="monospace" fontWeight="bold">03. BẾP &amp; ĐẢO ĐÁ TRAVERTINE</text>
                  <text x="540" y="70" fill="#F3F1EC" fontSize="14" fontFamily="monospace" fontWeight="bold">04. MASTER SUITE (VỮA VÔI CALCE)</text>
                  <text x="540" y="310" fill="#F3F1EC" fontSize="13" fontFamily="monospace">05. PHÒNG TẮM &amp; WALK-IN CLOSET</text>

                  {/* Island & Louvers */}
                  <rect x="360" y="120" width="120" height="60" rx="4" fill="#E28743" fillOpacity="0.3" stroke="#E28743" strokeWidth="2" />
                  <text x="380" y="155" fill="#E28743" fontSize="12" fontFamily="monospace" fontWeight="bold">ĐẢO BẾP</text>

                  {/* Convective Flow */}
                  <path d="M 180 430 Q 220 280 390 200 T 560 110 T 700 80" fill="none" stroke="url(#windGrad2)" strokeWidth="4" strokeDasharray="10 8" />
                  <polygon points="695,75 715,80 695,85" fill="#2DD4BF" />
                </svg>
              </div>
            </div>
          </div>

          {/* Lightbox Footer Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4 text-xs font-mono text-white/70 z-20">
            <div className="flex items-center gap-6">
              <span>ĐƠN VỊ: GUHOMES ARCHITECTS &amp; ATELIER</span>
              <span>·</span>
              <span>VI KHÍ HẬU: {specs.climateOrientation}</span>
              <span>·</span>
              <span>VẬT LIỆU: {specs.materials}</span>
            </div>
            <span className="text-white/40">Kéo chuột để di chuyển khi phóng to · Nhấn ESC để thoát</span>
          </div>
        </div>
      ) : null}
    </section>
  )
}
