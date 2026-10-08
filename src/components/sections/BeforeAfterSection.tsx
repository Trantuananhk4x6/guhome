'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface BeforeAfterSectionProps {
  beforeImageUrl?: string
  afterImageUrl?: string
}

export function BeforeAfterSection({
  beforeImageUrl,
  afterImageUrl,
}: BeforeAfterSectionProps) {
  // Slider position (0 - 100%)
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setSliderPos(percent)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    handleMove(e.clientX)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPos((prev) => Math.max(0, prev - 5))
    } else if (e.key === 'ArrowRight') {
      setSliderPos((prev) => Math.min(100, prev + 5))
    }
  }

  // High quality representative imagery of concrete raw shell vs finished warm interior
  const beforeImg =
    beforeImageUrl ||
    'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=2000&q=80'
  const afterImg =
    afterImageUrl ||
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80'

  return (
    <section
      id="bien-chuyen-khong-gian"
      data-home-section="BEFORE_AFTER"
      className="u-gutter relative isolate bg-espresso py-[clamp(4.5rem,10vh,8rem)] text-canvas overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/3 h-full w-[1px] bg-canvas/30" />
        <div className="absolute top-0 right-1/3 h-full w-[1px] bg-canvas/30" />
      </div>

      <div className="mx-auto w-full max-w-[110rem] relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col gap-4 max-w-3xl">
          <Label rule tone="accent">
            Hiện Trạng & Biến Chuyển Không Gian
          </Label>
          <h2 className="font-display text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.25] text-canvas">
            Từ bê tông thô ráp đến chốn an trú tĩnh lặng.
          </h2>
          <p className="text-sm sm:text-base text-canvas/70 leading-relaxed max-w-2xl">
            Một công trình Quiet Luxury không chỉ nhìn thấy ở lớp bề mặt. Đó là cuộc đại phẫu từ cốt kết cấu: giấu kín hệ thống cơ điện lạnh, gia cố cách âm đa lớp và đưa vật liệu tự nhiên vào làm mềm các khối hộp bê tông đặc cứng.
          </p>
        </div>

        {/* Project Case Meta Badge */}
        <div className="mt-8 inline-flex flex-wrap items-center gap-3 sm:gap-6 rounded-2xl border border-canvas/15 bg-canvas/5 px-5 py-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-accent-soft uppercase tracking-wider">Công trình thực tế:</span>
            <span className="text-canvas font-medium">The Metropole Thủ Thiêm — Penthouse Duplex 380m²</span>
          </div>
          <div className="hidden sm:block text-canvas/30">|</div>
          <div className="text-canvas/60">
            Thời gian hoàn thiện: <strong className="text-canvas">120 ngày</strong>
          </div>
          <div className="hidden sm:block text-canvas/30">|</div>
          <div className="text-canvas/60">
            Độ chính xác: <strong className="text-accent-soft">Sai số &lt; 2mm</strong>
          </div>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="mt-10 relative">
          <div
            ref={containerRef}
            tabIndex={0}
            role="slider"
            aria-label="So sánh hình ảnh trước và sau khi hoàn thiện nội thất"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onKeyDown={handleKeyDown}
            className="relative aspect-[16/10] sm:aspect-[21/10] w-full overflow-hidden rounded-2xl border border-accent/30 shadow-[0_30px_90px_rgba(0,0,0,0.85)] cursor-ew-resize select-none touch-none focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {/* AFTER IMAGE (Full Layer underneath) */}
            <div className="absolute inset-0">
              <Image
                src={afterImg}
                alt="Không gian sau khi hoàn thiện hoàn hảo bởi GuHomes"
                fill
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="object-cover"
                priority
              />
              {/* After Label Badge */}
              <div className="absolute top-5 right-5 z-10 rounded-full border border-accent/40 bg-espresso/80 backdrop-blur-md px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-accent-soft shadow-lg">
                ✦ Sau: Hoàn Thiện Chuẩn Gu (100%)
              </div>
            </div>

            {/* BEFORE IMAGE (Clipped Layer on Top using clipPath) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 calc(100% - ${sliderPos}%) 0 0)` }}
            >
              <Image
                src={beforeImg}
                alt="Hiện trạng bàn giao thô bê tông"
                fill
                sizes="(min-width: 1024px) 90vw, 100vw"
                className="object-cover filter grayscale contrast-110"
              />
              {/* Before Label Badge */}
              <div className="absolute top-5 left-5 z-10 rounded-full border border-canvas/20 bg-black/75 backdrop-blur-md px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-canvas/80 shadow-lg">
                ● Trước: Bàn Giao Thô Bê Tông
              </div>
            </div>

            {/* Draggable Divider Handle Line */}
            <div
              className="absolute top-0 bottom-0 z-20 w-[2px] bg-accent shadow-[0_0_15px_rgba(197,168,128,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Central Tactile Drag Button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-espresso text-accent shadow-2xl transition-transform hover:scale-110 active:scale-95">
                <span className="text-sm font-mono tracking-tighter">◄ ►</span>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-mono text-canvas/50">
            <span>◄ Kéo sang trái để xem không gian hoàn thiện</span>
            <span>Kéo sang phải để xem hiện trạng thô ►</span>
          </div>
        </div>

        {/* 3 Core Architectural Callouts */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Callout 1 */}
          <div className="rounded-2xl border border-canvas/15 bg-canvas/5 p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent-soft font-mono text-sm mb-4">
              01
            </div>
            <h3 className="font-display text-lg text-canvas font-medium mb-2">
              Cách Âm Tường Đôi & Sàn Giảm Chấn
            </h3>
            <p className="text-xs sm:text-sm text-canvas/70 leading-relaxed">
              Triệt tiêu 38dB tạp âm giao thông và rung chấn máy nén điều hòa bằng hệ vách thạch cao 2 lớp kẹp bông khoáng cách âm Rockwool 80kg/m³, kết hợp lớp màng cao su non giảm âm dưới sàn đá.
            </p>
          </div>

          {/* Callout 2 */}
          <div className="rounded-2xl border border-canvas/15 bg-canvas/5 p-6 backdrop-blur-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent-soft font-mono text-sm mb-4">
              02
            </div>
            <h3 className="font-display text-lg text-canvas font-medium mb-2">
              Giấu Miệng Gió Điều Hòa Tuyệt Đối
            </h3>
            <p className="text-xs sm:text-sm text-canvas/70 leading-relaxed">
              Thay thế miệng gió nhôm công nghiệp thô cứng bằng hệ khe gió dài (linear slot diffuser) âm trần không viền, phủ sơn vôi khoáng tiệp màu với diện trần, cho luồng gió mát êm không thổi thốc vào đầu.
            </p>
          </div>

          {/* Callout 3 */}
          <div className="rounded-2xl border border-canvas/15 bg-canvas/5 p-6 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20 text-accent-soft font-mono text-sm mb-4">
              03
            </div>
            <h3 className="font-display text-lg text-canvas font-medium mb-2">
              Thích Ứng Vi Khí Hậu Độ Ẩm 80%
            </h3>
            <p className="text-xs sm:text-sm text-canvas/70 leading-relaxed">
              Mặt dựng kính hướng Tây Nam được đệm bằng hệ rèm vải lanh 2 lớp cản 92% tia hồng ngoại. Gỗ óc chó và đá travertine tự nhiên giữ cho mặt sàn luôn khô ráo, ấm áp vào mùa mưa và mát lịm vào mùa nắng.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
