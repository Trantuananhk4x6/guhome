'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import type { ProjectDetail } from '@/types/content'
import { ArrowUpRightIcon, CloseIcon } from '@/components/ui/icons'
import { getTactileSpecs } from './tactileSpecs'

export interface SpatialPanoramaViewerProps {
  project: ProjectDetail
  className?: string
}

interface PanoramaHotspot {
  id: string
  yaw: number // degrees 0-360
  pitch: number // degrees -45 to +45
  title: string
  subtitle: string
  description: string
  material: string
}

export function SpatialPanoramaViewer({ project, className }: SpatialPanoramaViewerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<PanoramaHotspot | null>(null)
  const [yaw, setYaw] = useState(0)
  const [pitch, setPitch] = useState(0)
  const [fov, setFov] = useState(75) // Field of view
  const [isAutoRotate, setIsAutoRotate] = useState(true)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDragging = useRef(false)
  const lastMousePos = useRef({ x: 0, y: 0 })
  const animFrameId = useRef<number | null>(null)
  const imageLoadedRef = useRef<HTMLImageElement | null>(null)

  const specs = getTactileSpecs(project)
  const coverUrl = project.cover?.url || project.gallery[0]?.url || '/media/chung-cu-1-2-ngu/0-1600.webp'

  const HOTSPOTS: PanoramaHotspot[] = [
    {
      id: 'island',
      yaw: 40,
      pitch: -8,
      title: 'Bàn Đảo Đá Travertine Nguyên Khối',
      subtitle: 'Khai thác từ mỏ đá Ý, xẻ sọc tự nhiên',
      description:
        'Bề mặt đá xẻ thô chưa trám lỗ, lưu giữ cảm giác mát lạnh chân thực khi chạm tay. Tích hợp bồn rửa âm và hệ ray trượt giảm chấn Blum Legrabox cao cấp.',
      material: 'Silver Vein-Cut Travertine',
    },
    {
      id: 'louvers',
      yaw: 130,
      pitch: 8,
      title: 'Hệ Lam Gỗ Óc Chó Xoay Cản Bức Xạ',
      subtitle: 'Xử lý vi khí hậu hướng nắng xế chiều Sài Gòn',
      description:
        'Các nan gỗ tự nhiên FAS dày 28mm xoay 45 độ theo phương vị mặt trời, giúp triệt tiêu 70% nhiệt lượng xuyên qua kính, tạo vệt bóng đổ nhịp nhàng trên sàn.',
      material: 'FAS North American Walnut · Osmo Oil',
    },
    {
      id: 'sofa',
      yaw: 225,
      pitch: -12,
      title: 'Sofa May Đo Vải Lanh Bỉ & Khung Gỗ Tự Nhiên',
      subtitle: 'Tỷ lệ công thái học cho gia chủ thượng lưu',
      description:
        'Vải lanh dệt thô thuần tự nhiên nhập khẩu từ Bỉ, thoáng khí vượt trội dưới độ ẩm 80%. Đệm mút lông vũ 3 lớp êm ái, bọc khung gỗ tần bì mộng âm dương.',
      material: 'Pure Belgian Linen & Feather Down',
    },
    {
      id: 'lighting',
      yaw: 315,
      pitch: 22,
      title: 'Hệ Chiếu Sáng Warm Dim 2700K · CRI 97',
      subtitle: 'Ánh sáng gián tiếp tôn vinh xúc giác vật liệu',
      description:
        'Tuyệt đối không dùng đèn rọi trực diện gây chói. Nguồn sáng giấu trong rãnh thạch cao 15mm tạo dải sáng hắt dịu nhẹ, tái hiện ánh hoàng hôn tĩnh tại bên sông.',
      material: 'Deep-Recessed Architectural Optics',
    },
  ]

  // Preload image for spherical rendering
  useEffect(() => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = coverUrl
    img.onload = () => {
      imageLoadedRef.current = img
    }
  }, [coverUrl])

  // Canvas Equirectangular to Perspective Renderer
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const img = imageLoadedRef.current

    ctx.fillStyle = '#0B0E0D'
    ctx.fillRect(0, 0, width, height)

    if (img && img.complete) {
      // Draw background panoramic image with yaw/pitch parallax wrapping
      const aspect = img.width / img.height
      const destW = width * (120 / fov) * 2.5
      const destH = destW / aspect

      const normYaw = (((yaw % 360) + 360) % 360) / 360
      const offsetX = -normYaw * destW
      const offsetY = (pitch / 90) * (height * 0.4) - (destH - height) / 2

      ctx.save()
      // Render seamless looping panoramas
      ctx.drawImage(img, offsetX, offsetY, destW, destH)
      if (offsetX + destW < width) {
        ctx.drawImage(img, offsetX + destW, offsetY, destW, destH)
      }
      if (offsetX > 0) {
        ctx.drawImage(img, offsetX - destW, offsetY, destW, destH)
      }

      // Atmospheric Vignette & Contrast grading
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        Math.min(width, height) * 0.3,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7,
      )
      gradient.addColorStop(0, 'rgba(0,0,0,0)')
      gradient.addColorStop(1, 'rgba(0,0,0,0.55)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      ctx.restore()
    } else {
      // Placeholder technical grid
      ctx.strokeStyle = 'rgba(79, 209, 197, 0.15)'
      ctx.lineWidth = 1
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
    }
  }, [yaw, pitch, fov])

  // Animation Loop with Auto-rotation
  useEffect(() => {
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const dt = (currentTime - lastTime) / 1000
      lastTime = currentTime

      if (isAutoRotate && !isDragging.current) {
        setYaw((prev) => (prev + dt * 6) % 360) // 0.5 rpm gentle pan
      }

      renderFrame()
      animFrameId.current = requestAnimationFrame(animate)
    }

    animFrameId.current = requestAnimationFrame(animate)
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current)
    }
  }, [isAutoRotate, renderFrame])

  // Mouse & Touch Controls
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true
    lastMousePos.current = { x: clientX, y: clientY }
    setIsAutoRotate(false)
  }

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return
    const dx = clientX - lastMousePos.current.x
    const dy = clientY - lastMousePos.current.y
    lastMousePos.current = { x: clientX, y: clientY }

    setYaw((y) => (y - dx * 0.3) % 360)
    setPitch((p) => Math.max(-40, Math.min(40, p + dy * 0.2)))
  }

  const handleEnd = () => {
    isDragging.current = false
  }

  // Calculate screen position for 3D hotspots based on current camera Yaw & Pitch
  const getHotspotScreenPos = (spot: PanoramaHotspot) => {
    const canvas = canvasRef.current
    if (!canvas) return null

    let diffYaw = spot.yaw - yaw
    while (diffYaw > 180) diffYaw -= 360
    while (diffYaw < -180) diffYaw += 360

    const diffPitch = spot.pitch - pitch
    const hFov = fov
    const vFov = (fov * canvas.height) / canvas.width

    if (Math.abs(diffYaw) > hFov / 1.5) return null // Out of view

    const x = canvas.width / 2 + (diffYaw / (hFov / 2)) * (canvas.width / 2)
    const y = canvas.height / 2 - (diffPitch / (vFov / 2)) * (canvas.height / 2)

    return { x, y }
  }

  return (
    <section className={cn('bg-[#0E1211] text-[#F3F1EC] py-[clamp(4.5rem,10vh,8rem)] relative overflow-hidden', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Trải Nghiệm Không Gian Đa Chiều</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white mt-3 tracking-tight">
              Virtual Tour 360° &amp; Điểm Chạm Xúc Giác
            </h2>
            <p className="text-white/70 text-base sm:text-lg max-w-[54ch] mt-3 font-light leading-relaxed">
              Xoay góc nhìn 360 độ để cảm nhận chiều sâu ánh sáng, tỷ lệ khoáng đạt và xúc giác vật liệu tự nhiên trong không gian may đo GuHomes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoRotate((r) => !r)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-mono tracking-wider border transition-colors',
                isAutoRotate
                  ? 'bg-accent/20 border-accent text-accent'
                  : 'bg-white/10 border-white/20 text-white/70 hover:text-white',
              )}
            >
              {isAutoRotate ? 'Đang tự động xoay' : 'Tạm dừng xoay'}
            </button>

            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-xs font-mono tracking-wider hover:bg-accent/90 transition-all duration-300 shadow-lg shadow-accent/20 group"
            >
              <span>Mở toàn màn hình</span>
              <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* 360 Canvas Container */}
        <div className="mt-8 relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl select-none group">
          <canvas
            ref={canvasRef}
            width={1280}
            height={640}
            className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => {
              if (e.touches[0]) handleStart(e.touches[0].clientX, e.touches[0].clientY)
            }}
            onTouchMove={(e) => {
              if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY)
            }}
            onTouchEnd={handleEnd}
          />

          {/* Interactive Projected Hotspots */}
          {HOTSPOTS.map((spot) => {
            const pos = getHotspotScreenPos(spot)
            if (!pos) return null

            const isCurrent = activeHotspot?.id === spot.id

            return (
              <div
                key={spot.id}
                style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
              >
                <button
                  onClick={() => setActiveHotspot(isCurrent ? null : spot)}
                  className={cn(
                    'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group',
                    isCurrent
                      ? 'bg-accent text-white ring-4 ring-accent/40 scale-125'
                      : 'bg-black/60 backdrop-blur-md text-white border border-white/40 hover:bg-accent hover:scale-110 shadow-xl',
                  )}
                  aria-label={spot.title}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                  <span className="sr-only">{spot.title}</span>
                </button>

                {/* Hotspot Floating Tooltip */}
                {isCurrent ? (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-72 sm:w-80 bg-[#121615]/95 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-left shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-[10px] font-mono text-accent uppercase tracking-wider">{spot.material}</span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-white/60 hover:text-white"
                        aria-label="Đóng"
                      >
                        <CloseIcon className="text-sm" />
                      </button>
                    </div>
                    <h4 className="font-serif text-lg text-white font-normal mt-2 leading-snug">{spot.title}</h4>
                    <p className="text-accent/90 text-xs font-mono mt-0.5">{spot.subtitle}</p>
                    <p className="text-white/70 text-xs mt-2 font-light leading-relaxed">{spot.description}</p>
                  </div>
                ) : null}
              </div>
            )
          })}

          {/* Compass & Technical HUD */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-4 text-xs font-mono text-white/60 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
            <span className="flex items-center gap-1.5 text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>GÓC QUAY: {Math.round(yaw)}°</span>
            </span>
            <span>·</span>
            <span>CAO ĐỘ: {Math.round(pitch)}°</span>
            <span>·</span>
            <span className="hidden sm:inline">KÉO CHUỘT ĐỂ XOAY 360°</span>
          </div>

          {/* Zoom In/Out Floating Controller */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/15 text-white font-mono text-xs">
            <button
              onClick={() => setFov((f) => Math.min(95, f + 5))}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              title="Mở rộng góc nhìn"
            >
              -
            </button>
            <span className="px-1 tabular-nums text-white/80">{fov}°</span>
            <button
              onClick={() => setFov((f) => Math.max(50, f - 5))}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              title="Phóng gần"
            >
              +
            </button>
          </div>
        </div>

        {/* Hotspots Grid Quick Selection */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {HOTSPOTS.map((spot) => {
            const isSelected = activeHotspot?.id === spot.id
            return (
              <button
                key={spot.id}
                onClick={() => {
                  setYaw(spot.yaw)
                  setPitch(spot.pitch)
                  setActiveHotspot(spot)
                  setIsAutoRotate(false)
                }}
                className={cn(
                  'p-4 rounded-xl text-left border transition-all duration-300',
                  isSelected
                    ? 'bg-accent/15 border-accent text-white shadow-lg'
                    : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08] hover:border-white/20',
                )}
              >
                <p className="text-[11px] font-mono text-accent uppercase tracking-wider">{spot.material}</p>
                <h5 className="font-serif text-base text-white font-normal mt-1 leading-snug">{spot.title}</h5>
                <p className="text-xs text-white/50 mt-1 line-clamp-2">{spot.description}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* FULLSCREEN PANORAMA MODAL */}
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-[#070908] flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-white/15 pb-4 z-20">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest">360° Spatial Immersion</p>
              <h3 className="font-serif text-xl sm:text-2xl text-white font-light">{project.title} — Không Gian Toàn Cảnh</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Đóng"
            >
              <CloseIcon className="text-xl" />
            </button>
          </div>

          <div className="flex-1 w-full relative my-4 rounded-xl overflow-hidden border border-white/20">
            <canvas
              ref={canvasRef}
              width={1920}
              height={960}
              className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
              onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
              onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-4 text-xs font-mono text-white/70 z-20">
            <span>CHẾ TÁC NỘI THẤT MAY ĐO: {specs.materials}</span>
            <span className="text-white/40">Kéo chuột để xoay 360° · Nhấn ESC để đóng</span>
          </div>
        </div>
      ) : null}
    </section>
  )
}
