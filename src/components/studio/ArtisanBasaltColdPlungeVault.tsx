'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

export function ArtisanBasaltColdPlungeVault({ className }: { className?: string } = {}) {
  const [targetTemp, setTargetTemp] = useState<number>(3) // 3°C to 10°C
  const [timerRunning, setTimerRunning] = useState<boolean>(false)
  const [secondsLeft, setSecondsLeft] = useState<number>(180) // 3 minutes = 180s
  const [currentStage, setCurrentStage] = useState<'soak' | 'breath' | 'restore'>('soak')
  const [outdoorTemp] = useState<number>(36) // Saigon tropical peak midday

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timerRunning, secondsLeft])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  const resetTimer = () => {
    setTimerRunning(false)
    setSecondsLeft(180)
  }

  const elapsedSeconds = 180 - secondsLeft
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / 180) * 100))

  return (
    <section
      aria-label="Bồn Ngâm Lạnh Cold Plunge Đá Bazan Nguyên Khối"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background atmospheric gradient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-cyan-950/20 blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-stone-800/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(14,116,144,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/50 px-3.5 py-1 text-xs tracking-widest text-cyan-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Liệu Pháp Tương Phản & Thức Tỉnh Sinh Học
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bồn Ngâm Lạnh Cold Plunge Đá Bazan 3°C
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Khối đá bazan núi lửa 1.2 tấn khai thác từ mỏ đá Gia Lai, đục rỗng thủ công và mài honed êm mịn. 
            Hệ thống Chiller Inverter siêu êm 28 dBA giữ nước lạnh tinh khiết 3°C, kích hoạt tái tạo tế bào và cân bằng vi khí hậu nội thất.
          </p>
        </div>

        {/* Interactive Cold Plunge Control & Session Simulation */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Basalt Monolith Visualization & 3-Min Protocol */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-medium font-mono">
                      Liệu Trình Tái Tạo 3 Phút · Wim Hof Protocol
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      Thức Tỉnh Endorphin & Dopamine Tự Nhiên
                    </h3>
                  </div>

                  {/* Temperature Selector */}
                  <div className="flex items-center gap-2 bg-stone-950 border border-stone-800 rounded-xl p-1.5">
                    <span className="text-xs text-stone-400 px-2 font-mono">Nhiệt độ nước:</span>
                    {[3, 5, 8, 10].map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setTargetTemp(temp)}
                        className={cn(
                          'rounded-lg px-2.5 py-1 text-xs font-mono font-medium transition-colors',
                          targetTemp === temp
                            ? 'bg-cyan-600 text-stone-950 font-bold shadow-md shadow-cyan-500/20'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {temp}°C
                      </button>
                    ))}
                  </div>
                </div>

                {/* Basalt Tub Visual Graphic */}
                <div className="mt-6 relative h-48 sm:h-56 rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 to-stone-900 overflow-hidden flex flex-col justify-end p-6">
                  {/* Water level ripple */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyan-950/80 via-cyan-900/40 to-transparent border-t border-cyan-500/30">
                    <div className="absolute top-0 inset-x-0 h-1 bg-cyan-400/20 animate-pulse" />
                    {/* Steam / cold vapor effect */}
                    <div className="absolute top-2 inset-x-0 flex justify-around opacity-40">
                      <span className="h-6 w-16 bg-cyan-200/20 blur-sm rounded-full transform -translate-y-2 animate-bounce" />
                      <span className="h-8 w-20 bg-cyan-200/20 blur-sm rounded-full transform -translate-y-3" />
                      <span className="h-5 w-14 bg-cyan-200/20 blur-sm rounded-full transform -translate-y-1 animate-bounce" />
                    </div>
                  </div>

                  {/* Overlay stone stats */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-[11px] text-cyan-300 font-mono flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                        Đá Bazan Núi Lửa Gia Lai · Honed Silk Surface
                      </span>
                      <div className="mt-1 font-serif text-lg sm:text-xl text-stone-100">
                        Nhiệt độ hiện tại: <span className="text-cyan-400 font-mono font-semibold">{targetTemp}.0°C</span>
                      </div>
                    </div>

                    <div className="text-right text-xs">
                      <span className="text-stone-400 block font-mono">Độ ồn Chiller âm sàn</span>
                      <span className="text-emerald-400 font-mono font-semibold">28 dBA (Êm như tiếng lá rơi)</span>
                    </div>
                  </div>
                </div>

                {/* Protocol Stages */}
                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setCurrentStage('soak')}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all',
                      currentStage === 'soak'
                        ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-200'
                        : 'border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-700'
                    )}
                  >
                    <span className="block font-mono font-semibold text-[11px] text-cyan-400">0:00 - 0:45</span>
                    <span className="block font-medium text-stone-200 mt-1">Sốc Lạnh Đầu</span>
                    <span className="block text-[11px] text-stone-500 mt-0.5">Hít thở sâu 4-4, thư giãn cơ vai</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStage('breath')}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all',
                      currentStage === 'breath'
                        ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-200'
                        : 'border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-700'
                    )}
                  >
                    <span className="block font-mono font-semibold text-[11px] text-cyan-400">0:45 - 2:00</span>
                    <span className="block font-medium text-stone-200 mt-1">Đồng Hóa Thân Nhiệt</span>
                    <span className="block text-[11px] text-stone-500 mt-0.5">Dopamine tăng +250%, nhịp tim dịu</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentStage('restore')}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all',
                      currentStage === 'restore'
                        ? 'border-cyan-500/50 bg-cyan-950/30 text-cyan-200'
                        : 'border-stone-800 bg-stone-950/50 text-stone-400 hover:border-stone-700'
                    )}
                  >
                    <span className="block font-mono font-semibold text-[11px] text-cyan-400">2:00 - 3:00</span>
                    <span className="block font-medium text-stone-200 mt-1">Thức Tỉnh Tế Bào</span>
                    <span className="block text-[11px] text-stone-500 mt-0.5">Phục hồi cơ bắp, tinh thần minh mẫn</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Interactive Timer & Thermal Delta */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-400 uppercase">Bộ Đếm Liệu Trình</span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                    {progressPercent}% Hoàn tất
                  </span>
                </div>

                {/* Big Timer Display */}
                <div className="my-6 text-center">
                  <div className="font-mono text-5xl sm:text-6xl font-light tracking-tight text-cyan-300">
                    {formatTime(secondsLeft)}
                  </div>
                  <p className="mt-2 text-xs text-stone-400 font-light">
                    {timerRunning
                      ? 'Duy trì nhịp thở bụng sâu và tĩnh tâm'
                      : secondsLeft === 0
                      ? 'Chúc mừng! Liệu trình ngâm lạnh 3 phút hoàn tất.'
                      : 'Bắt đầu bấm giờ khi hạ mình vào dòng nước lạnh'}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTimerRunning(!timerRunning)}
                    className={cn(
                      'flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50',
                      timerRunning
                        ? 'bg-amber-600 hover:bg-amber-500 text-stone-950'
                        : 'bg-cyan-600 hover:bg-cyan-500 text-stone-950 hover:shadow-lg hover:shadow-cyan-500/20'
                    )}
                  >
                    {timerRunning ? 'Tạm Dừng Liệu Trình' : 'Bắt Đầu Ngâm Lạnh'}
                  </button>

                  <button
                    type="button"
                    onClick={resetTimer}
                    className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 text-xs sm:text-sm font-medium transition-colors"
                  >
                    Đặt lại
                  </button>
                </div>
              </div>

              {/* Thermal Delta Test against Saigon Climate */}
              <div className="mt-6 pt-4 border-t border-stone-800/80">
                <span className="text-[11px] font-mono text-stone-500 uppercase block mb-2">
                  Thử Nghiệm Cách Nhiệt Vi Khí Hậu Sài Gòn
                </span>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-800/60">
                  <span className="text-stone-400">Nhiệt độ ngoài trời trưa Sài Gòn</span>
                  <span className="text-amber-400 font-mono font-medium">{outdoorTemp}°C</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5 border-b border-stone-800/60">
                  <span className="text-stone-400">Nước ngâm lạnh bazan duy trì</span>
                  <span className="text-cyan-400 font-mono font-medium">{targetTemp}°C (Chênh lệch {outdoorTemp - targetTemp}°C)</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1.5">
                  <span className="text-stone-400">Lớp cách nhiệt bọt PIR</span>
                  <span className="text-emerald-400 font-mono font-medium">50mm mật độ cao</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Craft & Safety Features Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
            <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4 className="font-serif text-base text-stone-100">Đá Bazan Mài Honed Chống Trượt R12</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Lòng bồn được đục rỗng và xử lý mài honing 800-grit, tạo bề mặt nhung mịn êm ái khi tiếp xúc da thịt nhưng đạt tiêu chuẩn chống trượt R12 an toàn tuyệt đối.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <path d="m4.93 4.93 4.24 4.24M14.83 14.83l4.24 4.24M14.83 9.17l4.24-4.24M4.93 19.07l4.24-4.24" />
              </svg>
            </div>
            <h4 className="font-serif text-base text-stone-100">Lọc Tuần Hoàn Kép Ozone & UV-C</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              100% không dùng Clo gây khô ráp da hoặc bay mùi hóa chất. Công nghệ khử trùng Ozone vi bọt khí kết hợp đèn tia cực tím UV-C giữ nước trong vắt như suối nguồn.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-6">
            <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h4 className="font-serif text-base text-stone-100">Tích Hợp Suite Wellness Tại Gia</h4>
            <p className="mt-2 text-xs text-stone-400 leading-relaxed font-light">
              Kết hợp hoàn hảo bên cạnh phòng xông hơi Hinoki đá núi lửa hoặc phòng tắm master, tạo thành chu trình tương phản nóng - lạnh chuẩn resort 5 sao quốc tế.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950 p-6 text-xs text-stone-400">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Kích thước tiêu chuẩn dinh thự: 1.800mm x 850mm x 720mm · Nặng 1.200 kg</span>
          </div>
          <Link
            href="/du-toan-chi-phi"
            className="inline-flex items-center gap-1.5 font-medium text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            Tính toán dự toán bồn Cold Plunge đá bazan trong gói Wellness
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
