'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type RainCascadeMode = 'mist' | 'summer' | 'meditation'

interface CascadeModeInfo {
  id: RainCascadeMode
  name: string
  subname: string
  flowRate: string
  soundDba: string
  tempReduction: string
  humidity: string
  description: string
  filterFrequency: number
}

const CASCADE_MODES: Record<RainCascadeMode, CascadeModeInfo> = {
  mist: {
    id: 'mist',
    name: 'Mưa Phùn Mùa Xuân (Sương Nhẹ)',
    subname: 'Giọt nước trôi chậm từng mắt xích',
    flowRate: '2.0 L/phút',
    soundDba: '18 dBA (Tĩnh âm)',
    tempReduction: '-2.5°C',
    humidity: '58% RH',
    description: 'Nước mưa thẩm thấu nhẹ nhàng qua 7 chuỗi xích hoa chuông Kusari-Toi, tạo lớp vi khí hậu mát mẻ lan tỏa khắp các tầng hành lang.',
    filterFrequency: 300,
  },
  summer: {
    id: 'summer',
    name: 'Mưa Rào Mùa Hạ Dịu Dàng',
    subname: 'Tuần hoàn làm mát trục thông tầng',
    flowRate: '6.5 L/phút',
    soundDba: '22 dBA (Thư thái)',
    tempReduction: '-4.2°C',
    humidity: '63% RH',
    description: 'Dòng nước tuần hoàn liên tục hạ nhiệt lõi nhà nhanh chóng trong những ngày nắng gắt Sài Gòn, lọc sạch hoàn toàn bụi mịn lơ lửng.',
    filterFrequency: 450,
  },
  meditation: {
    id: 'meditation',
    name: 'Thác Đổ Thiền Định (Thanh Tẩy)',
    subname: 'Âm thanh tự nhiên dẫn dắt tâm trí',
    flowRate: '12.0 L/phút',
    soundDba: '25 dBA (Tiếng suối ngàn)',
    tempReduction: '-5.0°C',
    humidity: '66% RH',
    description: 'Dòng chảy mạnh mẽ gột rửa mọi căng thẳng của gia chủ khi trở về dinh thự, nước tiếp xúc sỏi bazan sông Đồng Nai tỏa ion âm dồi dào.',
    filterFrequency: 600,
  },
}

export function SaigonRainwaterCascadeAtriumSanctuary({ className }: { className?: string } = {}) {
  const [activeMode, setActiveMode] = useState<RainCascadeMode>('summer')
  const [isWaterSoundActive, setIsWaterSoundActive] = useState<boolean>(false)

  const headingId = useId()
  const currentMode = CASCADE_MODES[activeMode]

  const toggleRainSound = () => {
    if (typeof window === 'undefined') return
    if (isWaterSoundActive) {
      setIsWaterSoundActive(false)
      return
    }

    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      setIsWaterSoundActive(true)

      const bufferSize = audioCtx.sampleRate * 2.5
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.06
      }

      const noise = audioCtx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      const filter = audioCtx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(currentMode.filterFrequency, audioCtx.currentTime)
      filter.Q.setValueAtTime(2.5, audioCtx.currentTime)

      const gain = audioCtx.createGain()
      gain.gain.setValueAtTime(0.012, audioCtx.currentTime)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(audioCtx.destination)

      noise.start()

      // Automatically stop after 5 seconds
      setTimeout(() => {
        try {
          noise.stop()
        } catch {
          // ignore
        }
        setIsWaterSoundActive(false)
      }, 5000)
    } catch {
      setIsWaterSoundActive(false)
    }
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Water Droplet & Copper Tone Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[500px] w-[500px] rounded-full bg-cyan-950/20 blur-[170px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-950/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(6,182,212,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1 text-xs tracking-widest text-cyan-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Vi Khí Hậu Tự Nhiên &amp; Xích Nước Kusari-Toi
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Màn Mưa Xích Đồng Kusari-Toi &amp; Giếng Trời Hạ Nhiệt 12 Mét
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Hệ thống 7 chuỗi xích đồng Kusari-Toi chế tác thủ công thả dọc thông tầng 4 tầng biệt thự từ mái kính xuống hồ sỏi sông Đồng Nai. 
            Nước mưa tự nhiên được thu gom tuần hoàn qua 3 cấp lọc thạch anh, than gáo dừa và đèn UV-C, 
            hạ nhiệt độ tâm nhà tức thì từ 3 đến 5°C với âm thanh giọt nước tĩnh tại chỉ 22 dBA.
          </p>
        </div>

        {/* Interactive Rain Cascade Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Kusari-Toi Chain Visualizer & Water Flow Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-mono font-medium">
                      Chế Độ Màn Mưa Tuần Hoàn
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentMode.name}
                    </h3>
                  </div>

                  {/* Microclimate Stats Badge */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">Giảm {currentMode.tempReduction}</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">{currentMode.humidity}</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">{currentMode.soundDba}</span>
                  </div>
                </div>

                {/* 12m Atrium Kusari-Toi Chains Visualizer Canvas */}
                <div className="relative mt-6 h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-cyan-900/40 bg-[#081014] p-5 flex flex-col justify-between shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]">
                  {/* Top glass skylight rim representation */}
                  <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-b from-cyan-950/80 to-transparent border-b border-cyan-800/40" />

                  {/* 7 Kusari-Toi Chains Graphic with Water Drops */}
                  <div className="relative z-10 flex h-full items-center justify-around px-8 my-auto">
                    {[0, 1, 2, 3, 4, 5, 6].map((chainIdx) => (
                      <div key={chainIdx} className="flex flex-col items-center h-full justify-between py-2">
                        {/* 6 Bell Cups per Chain */}
                        {[0, 1, 2, 3, 4, 5].map((cupIdx) => (
                          <div key={cupIdx} className="flex flex-col items-center">
                            {/* Copper Cup */}
                            <svg className="h-5 w-6 drop-shadow-[0_0_6px_rgba(217,119,6,0.4)]" viewBox="0 0 24 16">
                              <path
                                d="M2,2 C4,14 20,14 22,2 Z"
                                fill="#78350f"
                                stroke="#b45309"
                                strokeWidth="1.5"
                              />
                            </svg>
                            {/* Water stream connecting to next cup */}
                            <div
                              className={cn(
                                'w-0.5 bg-gradient-to-b from-cyan-300 via-sky-400 to-transparent transition-all',
                                activeMode === 'mist' && 'h-2 opacity-50',
                                activeMode === 'summer' && 'h-3 opacity-80',
                                activeMode === 'meditation' && 'h-4 w-1 opacity-95'
                              )}
                            />
                            {/* Animated Water Droplets */}
                            <span
                              className="h-1 w-1 rounded-full bg-cyan-200 animate-ping opacity-75"
                              style={{ animationDelay: `${(chainIdx * 150 + cupIdx * 200) % 1000}ms` }}
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Basalt River Pebble Pool at base */}
                  <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-stone-900 to-transparent flex items-center justify-around px-4">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-2 w-4 rounded-full bg-stone-700/80 border border-stone-600/50"
                      />
                    ))}
                  </div>

                  {/* Top status info */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      7 DÂY XÍCH ĐỒNG NGUYÊN CHẤT KUSARI-TOI (12M)
                    </span>
                    <span className="rounded-md border border-cyan-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-cyan-300">
                      LỌC 3 CẤP: THẠCH ANH + THAN HOẠT TÍNH + UV-C
                    </span>
                  </div>

                  {/* Bottom metrics on visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Hiệu Quả Vi Khí Hậu:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5">
                        {currentMode.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Lưu Lượng Nước Mềm:</div>
                      <div className="text-xs font-serif text-cyan-300 font-medium">
                        {currentMode.flowRate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cascade Mode Selector Buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {(Object.keys(CASCADE_MODES) as RainCascadeMode[]).map((modeKey) => {
                    const mode = CASCADE_MODES[modeKey]
                    const isSelected = activeMode === modeKey
                    return (
                      <button
                        key={modeKey}
                        type="button"
                        onClick={() => setActiveMode(modeKey)}
                        className={cn(
                          'flex-1 min-w-[120px] rounded-lg border px-3 py-2 text-left transition-all',
                          isSelected
                            ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-stone-200'
                        )}
                      >
                        <div className="font-mono text-xs text-cyan-400 font-semibold">{mode.name.split('(')[0]}</div>
                        <div className="font-serif text-xs truncate mt-0.5">{mode.subname}</div>
                      </button>
                    )
                  })}
                </div>

                {/* Water Sound Trigger */}
                <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="text-stone-400">
                    Độ ồn âm học tự nhiên: <span className="text-emerald-300 font-mono">{currentMode.soundDba}</span>
                  </div>

                  <button
                    type="button"
                    onClick={toggleRainSound}
                    className={cn(
                      'rounded-lg border px-3.5 py-1.5 font-mono text-xs transition-all',
                      isWaterSoundActive
                        ? 'border-cyan-400 bg-cyan-950 text-cyan-200 animate-pulse'
                        : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-cyan-400'
                    )}
                  >
                    {isWaterSoundActive ? '💧 Đang Lắng Nghe Tiếng Mưa Róc Rách...' : '💧 Nghe Thử m Thanh Giọt Nước (5s)'}
                  </button>
                </div>
              </div>

              {/* Natural Cooling Physics Note */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-xs text-stone-300 leading-relaxed">
                <span className="font-serif text-cyan-300 font-medium">Nguyên Lý Bay Hơi Hạ Nhiệt Lõi Dinh Thự: </span>
                Khi nước mưa chảy tràn qua 7 chuỗi xích đồng Kusari-Toi trải dài 12 mét, diện tích tiếp xúc giữa nước và không khí tăng lên gấp 80 lần. Quá trình bay hơi thu nhiệt tự nhiên làm giảm nhiệt độ không khí từ 34°C xuống 30°C mà không tốn một watt điện năng làm lạnh cưỡng bức.
              </div>
            </div>

            {/* Right 5 cols: Rainwater Harvesting Filtration & Technical Norms */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Rainwater 3-Stage Filtration Anatomy */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
                  Hệ Lọc Tuần Hoàn Nước Mưa Khép Kín
                </h4>
                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-amber-300 font-medium block">
                      1. Bể Tách Rác &amp; Lọc Cát Thạch Anh:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Giữ lại toàn bộ lá cây và cặn thô từ mái kính, lọc trong nước tự nhiên.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-emerald-300 font-medium block">
                      2. Cột Lọc Than Gáo Dừa Hoạt Tính Bến Tre:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Khử mùi hôi và hấp phụ các hợp chất hữu cơ hòa tan trong nước mưa đô thị.
                    </p>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/40 p-2.5">
                    <span className="font-serif text-cyan-300 font-medium block">
                      3. Đèn Diệt Khuẩn Tia Cực Tím UV-C:
                    </span>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Tiêu diệt 99.9% vi khuẩn và rêu mốc, đảm bảo dòng nước tinh khiết không mùi clo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Engineering Norms Box */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                      Chỉ Số Kỹ Thuật Giếng Trời Kusari-Toi
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">Tiêu Chuẩn Nhật Bản</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Chiều Cao Thả Xích</span>
                    <div className="mt-1 font-mono text-lg text-cyan-300 font-semibold">12.0 m</div>
                    <span className="text-[9px] text-stone-500">4 Tầng thông suốt</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Vật Liệu Chuỗi Xích</span>
                    <div className="mt-1 font-mono text-lg text-amber-300 font-semibold">Đồng Đỏ 99%</div>
                    <span className="text-[9px] text-stone-500">Lên nước patina tự nhiên</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Dung Tích Bể Ngầm</span>
                    <div className="mt-1 font-mono text-lg text-emerald-400 font-semibold">4.500 L</div>
                    <span className="text-[9px] text-stone-500">Thu gom tái sử dụng</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Bơm Biến Tần Êm</span>
                    <div className="mt-1 font-mono text-lg text-purple-300 font-semibold">&lt; 20 dBA</div>
                    <span className="text-[9px] text-stone-500">Cách âm khoang ngầm</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-relaxed">
                  Đồng thau Kusari-Toi sau vài mùa mưa Sài Gòn sẽ hình thành lớp patina xanh ngọc (verdigris) quý phái, tăng cường độ bền chống ăn mòn lên đến 50 năm.
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=rainwater-cascade-kusaritoi"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-900/80 to-cyan-700/80 px-5 py-3 text-xs sm:text-sm font-medium text-cyan-100 hover:from-cyan-800 hover:to-cyan-600 transition-all shadow-lg shadow-cyan-950/50"
                >
                  <span>Tư Vấn Giếng Trời Màn Mưa Kusari-Toi</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-cyan-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Bản vẽ đường ống thu nước ngầm và mô phỏng động lực học dòng chảy CFD.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
