'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

export function ArtisanQuartzHourglassVault({ className }: { className?: string } = {}) {
  const [sandProgress, setSandProgress] = useState<number>(35) // 35 minutes elapsed of 60m
  const [asmrActive, setAsmrActive] = useState<boolean>(false)
  const [woodFinish, setWoodFinish] = useState<'cam-lai' | 'go-mun'>('cam-lai')

  const playSandAsmrSound = () => {
    try {
      if (typeof window === 'undefined') return
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      // Generate pink noise / gentle whisper sound simulating falling silica quartz sand
      const bufferSize = ctx.sampleRate * 2.5
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)

      let b0 = 0, b1 = 0, b2 = 0
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        data[i] = (b0 + b1 + b2) * 0.04
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1200, ctx.currentTime)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.4)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start()
      noise.stop(ctx.currentTime + 2.5)

      setAsmrActive(true)
      setTimeout(() => setAsmrActive(false), 2500)
    } catch {
      setAsmrActive(true)
      setTimeout(() => setAsmrActive(false), 1500)
    }
  }

  const remainingMinutes = 60 - sandProgress

  return (
    <section className={cn('relative overflow-hidden bg-[#0c0908] py-24 text-[#e8ded6] border-t border-[#231711]', className)}>
      {/* Warm Red Quartz & Antique Brass Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(217,98,66,0.06),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Masthead */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#48281b] bg-[#1a0e0a] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#e06d44]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#c2542d] animate-ping" />
            Nghệ Thuật Thời Gian Chậm Lại · Artisan Quartz Hourglass
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#fbf6f2]">
            Đồng Hồ Cát Tinh Thể Thạch Anh Đỏ 60 Phút
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#b49e91]">
            Giữa nhịp sống hối hả của đô thị hiện đại, một giờ buông bỏ màn hình số là khoảng lặng quý giá nhất. Nghệ nhân Thạnh Xuân chế tác đồng hồ cát với <span className="text-[#e06d44] font-medium">Bình thủy tinh Borosilicate thổi tay chứa cát thạch anh đỏ 80 mesh</span>, nâng đỡ bằng khung gỗ Cẩm Lai nguyên khối và 3 trụ đồng thau đúc cát, dòng chảy chuẩn xác 60 phút hoàn hảo không vấp nghẽn.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 60-Minute Sand Flow Visual & Interactive Timer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#3b1f15] bg-[#140b07]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2b150d] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#e06d44]">
                    Dòng Chảy Tuyến Tính Không Vấp Nghẽn
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#fbf6f2]">
                    Cát Thạch Anh Đỏ 80 Mesh Sàng Lọc Khí
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-[#24110a] px-3.5 py-1 text-xs font-mono text-[#e06d44]">
                  <span>Độ chính xác: ± 15 giây / 60 phút</span>
                </div>
              </div>

              {/* Hourglass Visual Box */}
              <div className="mt-6 rounded-xl border border-[#3b1f15] bg-[#190c08] p-5 sm:p-6 space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#e06d44] uppercase">Tiến Độ Rơi 60 Phút Đọc Sách</span>
                  <span className="text-[#fbf6f2] font-bold">
                    Đã trôi qua: {sandProgress} phút · Còn lại: {remainingMinutes} phút
                  </span>
                </div>

                {/* Sand Stream Slider Simulator */}
                <input
                  type="range"
                  min="0"
                  max="60"
                  step="1"
                  value={sandProgress}
                  onChange={(e) => setSandProgress(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-[#27120a] accent-[#e06d44] cursor-pointer"
                />

                <div className="flex justify-between text-[10px] font-mono text-[#73584c]">
                  <span>0 Phút (Bắt đầu đọc sách)</span>
                  <span>30 Phút (Thư thái tâm trí)</span>
                  <span>60 Phút (Kết thúc phiên tĩnh tọa)</span>
                </div>

                {/* Visual Glass Bulb Ratio Representation */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#27120a] text-xs">
                  <div className="rounded-lg bg-[#110704] p-3 text-center">
                    <span className="block font-mono text-[10px] uppercase text-[#73584c]">Bầu Cát Phía Trên</span>
                    <span className="mt-1 block font-bold text-[#fbf6f2]">{Math.round(((60 - sandProgress) / 60) * 100)}% Lượng Cát</span>
                  </div>
                  <div className="rounded-lg bg-[#110704] p-3 text-center">
                    <span className="block font-mono text-[10px] uppercase text-[#73584c]">Bầu Cát Phía Dưới</span>
                    <span className="mt-1 block font-bold text-[#e06d44]">{Math.round((sandProgress / 60) * 100)}% Đã Lắng Đọng</span>
                  </div>
                </div>
              </div>

              {/* Timber & Brass Specifications */}
              <div className="pt-4 border-t border-[#2b150d] space-y-3">
                <span className="font-mono text-[11px] text-[#e06d44] uppercase block">
                  Vật Liệu Khung Đỡ Tiện Thủ Công:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setWoodFinish('cam-lai')}
                    className={cn(
                      'p-3 rounded-lg border text-left text-xs transition-all',
                      woodFinish === 'cam-lai'
                        ? 'border-[#e06d44] bg-[#241109] text-white'
                        : 'border-[#29130b] bg-[#110704] text-[#8e7467]'
                    )}
                  >
                    <span className="font-bold block text-sm">Gỗ Cẩm Lai Tây Nguyên</span>
                    <span className="text-[11px] block mt-0.5">Vân chỉ đen tương phản sang trọng với cát đỏ</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setWoodFinish('go-mun')}
                    className={cn(
                      'p-3 rounded-lg border text-left text-xs transition-all',
                      woodFinish === 'go-mun'
                        ? 'border-[#e06d44] bg-[#241109] text-white'
                        : 'border-[#29130b] bg-[#110704] text-[#8e7467]'
                    )}
                  >
                    <span className="font-bold block text-sm">Gỗ Mun Sừng Đen Tuyền</span>
                    <span className="text-[11px] block mt-0.5">Bề mặt đanh cứng bóng như đá cẩm thạch</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Healing ASMR Sand Sound & Technical Standards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#3b1f15] bg-[#140b07]/95 p-6 sm:p-8 backdrop-blur-md">
              <div className="border-b border-[#2b150d] pb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-[#e06d44]">
                  Âm Thanh Cát Rơi Chữa Lành ASMR
                </span>
                <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#fbf6f2]">
                  Khoảnh Khắc Tĩnh Tại Tuyệt Đối
                </h3>
              </div>

              {/* ASMR Sound Trigger */}
              <div className="mt-5 rounded-xl border border-[#3b1f15] bg-[#190c08] p-5 text-center space-y-4">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#e06d44] bg-[#241109] shadow-[0_0_20px_rgba(224,109,68,0.25)]">
                  <span className="text-3xl">⏳</span>
                </div>

                <div>
                  <h4 className="font-serif text-base text-[#fbf6f2]">
                    Tiếng Rơi Êm Dịu Của Cát Thạch Anh
                  </h4>
                  <p className="mt-1 text-xs text-[#a89083] leading-relaxed">
                    Âm thanh hạt cát thạch anh tròn mịn rơi tí tách kích hoạt sóng não Alpha, làm dịu căng thẳng và cải thiện sự tập trung khi đọc sách.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={playSandAsmrSound}
                  disabled={asmrActive}
                  className={cn(
                    'w-full rounded-xl py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md',
                    asmrActive
                      ? 'bg-[#e06d44] text-[#0c0908] shadow-[0_0_15px_rgba(224,109,68,0.4)] animate-pulse'
                      : 'bg-[#c2542d] text-white hover:bg-[#a84420]'
                  )}
                >
                  {asmrActive ? '✨ Đang Lắng Nghe Cát Rơi ASMR...' : '🎧 Nghe Thử Âm Thanh Cát Rơi'}
                </button>
              </div>

              {/* Technical Precision Norms */}
              <div className="mt-4 rounded-xl border border-[#2b150d] bg-[#110704] p-4 text-xs space-y-2">
                <span className="font-mono text-[10px] text-[#e06d44] uppercase block">
                  Tiêu Chuẩn Chế Tác GuHomes:
                </span>
                <div className="flex items-center gap-2 text-[#a89083]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e06d44]" />
                  <span>Kính Borosilicate 3.3 chống sốc nhiệt, không ngưng tụ hơi ẩm.</span>
                </div>
                <div className="flex items-center gap-2 text-[#a89083]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e06d44]" />
                  <span>Cát thạch anh nung sấy tiệt trùng 180°C trước khi hút chân không niêm phong.</span>
                </div>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#2b150d]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#e06d44] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#0c0908] hover:bg-[#eb8661] transition-all shadow-[0_4px_20px_rgba(224,109,68,0.25)]"
                >
                  <span>Đặt chế tác đồng hồ cát khắc tên tư gia</span>
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
