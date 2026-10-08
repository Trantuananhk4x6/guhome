'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type FlameLevel = 'ember' | 'warmth' | 'feast'

interface FlameSetting {
  id: FlameLevel
  name: string
  intensity: string
  fuelRate: string
  heatRadius: string
  ambiance: string
}

const FLAME_SETTINGS: Record<FlameLevel, FlameSetting> = {
  ember: {
    id: 'ember',
    name: 'Ánh Than Hồng Ember',
    intensity: '20% công suất',
    fuelRate: '0.35 L / giờ',
    heatRadius: 'Bán kính ấm 1.5 mét',
    ambiance: 'Ánh lửa liu riu lãng mạn cho buổi chuyện trò riêng tư ngắm du thuyền lướt qua trên sông.',
  },
  warmth: {
    id: 'warmth',
    name: 'Sưởi Ấm Gió Đêm Warmth',
    intensity: '50% công suất',
    fuelRate: '0.75 L / giờ',
    heatRadius: 'Bán kính ấm 3.0 mét',
    ambiance: 'Xua tan hơi ẩm lạnh từ gió sông sau cơn mưa rào đêm nhiệt đới, giữ ấm cho cả gia đình.',
  },
  feast: {
    id: 'feast',
    name: 'Bùng Sáng Lễ Hội Feast Glow',
    intensity: '100% công suất',
    fuelRate: '1.40 L / giờ',
    heatRadius: 'Bán kính ấm 4.5 mét',
    ambiance: 'Ngọn lửa rực rỡ cao 40cm, tạo tâm điểm hào sảng cho tiệc cocktail và BBQ ngoài trời.',
  },
}

export function SaigonRiversideOutdoorFirePitVault({ className }: { className?: string } = {}) {
  const [flameLevel, setFlameLevel] = useState<FlameLevel>('warmth')
  const [isPlayingCrackling, setIsPlayingCrackling] = useState<boolean>(false)
  const [windSensorActive, setWindSensorActive] = useState<boolean>(true)
  const [windSpeed] = useState<number>(14) // 14 km/h river breeze

  const currentSetting = FLAME_SETTINGS[flameLevel]

  // Synthesize gentle fire crackle sound using Web Audio API
  const toggleFireCrackleSound = () => {
    if (isPlayingCrackling) {
      setIsPlayingCrackling(false)
      return
    }

    try {
      if (typeof window === 'undefined') return
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      const bufferSize = ctx.sampleRate * 2.5
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)

      // Random gentle pops and crackles
      for (let i = 0; i < bufferSize; i++) {
        if (Math.random() < 0.003) {
          data[i] = (Math.random() * 2 - 1) * 0.35
        } else {
          data[i] = (Math.random() * 2 - 1) * 0.015
        }
      }

      const source = ctx.createBufferSource()
      source.buffer = buffer
      source.loop = true

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)
      filter.Q.setValueAtTime(2.0, ctx.currentTime)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.08, ctx.currentTime)

      source.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      source.start()
      setIsPlayingCrackling(true)

      // Auto-stop after 8 seconds in demo
      setTimeout(() => {
        try {
          source.stop()
        } catch {}
        setIsPlayingCrackling(false)
      }, 8000)
    } catch {
      setIsPlayingCrackling(true)
      setTimeout(() => setIsPlayingCrackling(false), 3000)
    }
  }

  return (
    <section
      aria-label="Bồn Lửa Sunken Lounge Đá Nguyên Khối Ven Sông"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background warm ember illumination */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-orange-950/20 blur-[130px]" />
        <div className="absolute bottom-10 right-1/4 h-96 w-96 rounded-full bg-stone-800/25 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,88,12,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-950/50 px-3.5 py-1 text-xs tracking-widest text-orange-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 animate-pulse" />
            Nghệ Thuật Lửa & Nước Ven Sông Sài Gòn
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bồn Lửa Sunken Lounge Đá Thanh Hóa 1.8 Tấn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Khu lounge hạ âm bên mép nước sông Sài Gòn. Bồn lửa tiện từ khối đá tự nhiên Thanh Hóa nguyên khối, 
            đầu đốt bioethanol sinh học không khói, ghế tròn gỗ Teak Miến Điện lau dầu hữu cơ kết hợp đệm bọc Sunbrella trượt nước.
          </p>
        </div>

        {/* Interactive Fire Pit Simulator */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Fire Simulation Pit Graphic */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-orange-400 font-mono font-medium">
                      Điều Khiển Ngọn Lửa Sinh Học Bioethanol
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentSetting.name}
                    </h3>
                  </div>

                  {/* Flame Level Selectors */}
                  <div className="flex items-center gap-1.5 bg-stone-950 border border-stone-800 rounded-xl p-1 text-xs">
                    {(['ember', 'warmth', 'feast'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setFlameLevel(lvl)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg transition-colors font-medium',
                          flameLevel === lvl
                            ? 'bg-orange-600 text-stone-950 shadow-md shadow-orange-500/20'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {lvl === 'ember' ? 'Ember (20%)' : lvl === 'warmth' ? 'Warmth (50%)' : 'Feast (100%)'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fire Pit Bowl Visual */}
                <div className="mt-6 relative h-56 sm:h-64 rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-black overflow-hidden flex flex-col justify-between p-6">
                  {/* Central flame dancing glow */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {/* Outer glow ring */}
                    <div
                      className={cn(
                        'rounded-full blur-2xl transition-all duration-700',
                        flameLevel === 'ember'
                          ? 'h-32 w-32 bg-orange-600/20'
                          : flameLevel === 'warmth'
                          ? 'h-48 w-48 bg-orange-500/30'
                          : 'h-64 w-64 bg-amber-500/40'
                      )}
                    />

                    {/* Animated Flame Tongues */}
                    <div
                      className={cn(
                        'relative flex items-end justify-center gap-1 transition-all duration-500',
                        flameLevel === 'ember' ? 'h-16' : flameLevel === 'warmth' ? 'h-28' : 'h-40'
                      )}
                    >
                      <span className="w-4 h-full bg-gradient-to-t from-orange-600 via-amber-400 to-transparent rounded-full animate-bounce" />
                      <span className="w-5 h-[120%] bg-gradient-to-t from-orange-700 via-amber-300 to-white/80 rounded-full animate-pulse" />
                      <span className="w-4 h-full bg-gradient-to-t from-orange-600 via-amber-400 to-transparent rounded-full animate-bounce" />
                    </div>
                  </div>

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-xs font-mono text-stone-400 bg-stone-900/80 px-2.5 py-1 rounded border border-stone-800 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-orange-500 animate-ping" />
                      Khối Đá Thanh Hóa D1.400mm · Dày Vách 120mm
                    </span>

                    <button
                      type="button"
                      onClick={toggleFireCrackleSound}
                      className={cn(
                        'px-3 py-1 rounded-lg text-xs font-mono transition-all border flex items-center gap-1.5',
                        isPlayingCrackling
                          ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                          : 'bg-stone-900 hover:bg-stone-800 text-stone-300 border-stone-700'
                      )}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                      </svg>
                      {isPlayingCrackling ? 'Tiếng Lửa Tí Tách & Gió Sông...' : 'Nghe Tiếng Lửa Tí Tách'}
                    </button>
                  </div>

                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-xs text-stone-400 font-mono block">Hiệu Ứng Không Gian:</span>
                      <p className="font-serif text-stone-100 text-sm sm:text-base max-w-md">
                        {currentSetting.ambiance}
                      </p>
                    </div>

                    <div className="bg-stone-950/80 border border-stone-800 rounded-lg px-3 py-1.5 text-xs font-mono text-orange-300">
                      Nhiên liệu: {currentSetting.fuelRate}
                    </div>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="mt-6 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Bán Kính Sưởi Ấm</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-orange-400">
                      {currentSetting.heatRadius.split(' ')[3]} mét
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Vùng ấm dễ chịu</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Không Khói & Mùi</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-emerald-400">
                      100% Sạch
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Không ám khói tóc & áo</span>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <span className="text-stone-400 font-mono block">Vật Liệu Băng Ghế</span>
                    <div className="mt-1 font-mono text-base sm:text-lg font-semibold text-amber-300">
                      Gỗ Teak Miến Điện
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">Dầu tự nhiên chịu nước</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Safety Sensors & River Wind Resistance */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Cảm Biến Gió Sông Tự Động
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    Bảo Vệ Hoạt Động
                  </span>
                </div>

                <div className="my-5 space-y-3.5 text-xs">
                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Tốc độ gió sông hiện tại:</span>
                      <span className="text-orange-400 font-mono font-medium">{windSpeed} km/h (Ổn định)</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Thiết kế vành đá lõm 15cm tạo vùng tĩnh khí khí động học, giúp ngọn lửa cháy thẳng không bị tạt ngang.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Cơ chế ngắt tự động Tilt & Wind:</span>
                      <span className="text-emerald-400 font-mono font-medium">Van Solenoid &lt; 0.2s</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Khi gió giật mạnh vượt 45 km/h hoặc có giọt mưa rào lớn, cảm biến lập tức đóng van cấp nhiên liệu an toàn.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                    <div className="flex items-center justify-between text-stone-300">
                      <span>Vải bọc đệm Sunbrella Bỉ:</span>
                      <span className="text-amber-300 font-mono font-medium">Trượt nước 100%</span>
                    </div>
                    <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                      Chống mốc, bền màu dưới tia UV nhiệt đới, đệm mút Quick-Dry thoát nước mưa sau 15 phút.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setWindSensorActive(!windSensorActive)}
                  className="w-full py-2.5 rounded-xl border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-mono transition-colors"
                >
                  {windSensorActive ? 'Cảm Biến Gió Sông: Đang Bật (Auto)' : 'Cảm Biến Gió Sông: Đã Tắt'}
                </button>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Thi công hoàn thiện:</span>
                <span className="font-mono text-stone-200">Đá Thanh Hóa + Gỗ Teak Tự Nhiên</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950 p-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-orange-400" />
            <span>Biến góc vườn hoặc mép sông biệt thự thành điểm ngắm hoàng hôn đắt giá</span>
          </div>
          <Link
            href="/du-toan-chi-phi"
            className="inline-flex items-center gap-1.5 font-medium text-orange-300 hover:text-orange-200 transition-colors"
          >
            Tính toán dự toán sunken lounge bồn lửa ngoài trời
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
