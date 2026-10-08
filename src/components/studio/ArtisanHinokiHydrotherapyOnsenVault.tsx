'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type OnsenTempPreset = '38.0' | '41.5' | '43.0'

interface TempModeInfo {
  temp: OnsenTempPreset
  name: string
  subtitle: string
  therapeuticEffect: string
  recommendedDuration: string
  circulationRate: string
  sensoryNote: string
}

const TEMP_MODES: Record<OnsenTempPreset, TempModeInfo> = {
  '38.0': {
    temp: '38.0',
    name: 'Thư Giãn Thần Kinh & Hồi Phục Cơ Bắp',
    subtitle: 'Nhiệt độ suối khoáng dịu nhẹ cho buổi tối',
    therapeuticEffect: 'Kích hoạt hệ thần kinh đối giao cảm, hạ huyết áp, làm dịu căng thẳng não bộ và chuẩn bị giấc ngủ sâu.',
    recommendedDuration: '25 – 35 phút ngâm mình',
    circulationRate: '18 m³/giờ đối lưu êm đềm',
    sensoryNote: 'Hương gỗ Hinoki nhẹ thoang thoảng quyện cùng hơi ấm mơn man làn da.',
  },
  '41.5': {
    temp: '41.5',
    name: 'Chuẩn Onsen Truyền Thống Kiso Nhật Bản',
    subtitle: 'Mức nhiệt vàng cân bằng âm dương và vi tuần hoàn',
    therapeuticEffect: 'Giãn nở mao mạch tối ưu, kích hoạt tuần hoàn máu đến tận đầu ngón tay chân, giải phóng hoàn toàn axit lactic trong cơ.',
    recommendedDuration: '15 – 20 phút mỗi cữ tắm',
    circulationRate: '24 m³/giờ qua lõi lọc Ozone/UV-C',
    sensoryNote: 'Tinh dầu Phytoncide bốc hơi mạnh mẽ, thanh lọc phổi và mở toang các giác quan.',
  },
  '43.0': {
    temp: '43.0',
    name: 'Xông Khoáng Giải Độc & Tái Sinh Sinh Lực',
    subtitle: 'Liệu pháp nhiệt sâu kích hoạt protein sốc nhiệt (HSP)',
    therapeuticEffect: 'Kích thích toát mồ hôi sâu đào thải kim loại nặng, tăng cường hệ miễn dịch và tái tạo màng tế bào biểu bì.',
    recommendedDuration: '8 – 12 phút ngâm ngắt quãng',
    circulationRate: '30 m³/giờ tuần hoàn nano vi bọt khí',
    sensoryNote: 'Hơi nước sương mù mờ ảo, cảm giác như đang ngâm mình giữa rừng cổ thụ Kiso tuyết trắng.',
  },
}

export function ArtisanHinokiHydrotherapyOnsenVault({ className }: { className?: string } = {}) {
  const [activeTemp, setActiveTemp] = useState<OnsenTempPreset>('41.5')
  const [isMicroBubbleActive, setIsMicroBubbleActive] = useState<boolean>(true)
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(true)

  const headingId = useId()
  const currentMode = TEMP_MODES[activeTemp]

  const toggleSound = () => {
    if (typeof window === 'undefined') return
    if (isSoundMuted) {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
        const osc = audioCtx.createOscillator()
        const gain = audioCtx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(136.1, audioCtx.currentTime) // Om tone / peaceful frequency
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3)
        osc.connect(gain)
        gain.connect(audioCtx.destination)
        osc.start()
        osc.stop(audioCtx.currentTime + 3)
      } catch {
        // Fallback gracefully if Web Audio is blocked by browser policy
      }
      setIsSoundMuted(false)
    } else {
      setIsSoundMuted(true)
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
      {/* Ambient Onsen Steam & Hinoki Wood Golden Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-amber-900/15 blur-[170px]" />
        <div className="absolute bottom-12 right-1/4 h-96 w-96 rounded-full bg-emerald-950/20 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,0.06),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs tracking-widest text-emerald-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Thủy Liệu Pháp Onsen Gỗ Hinoki Cổ Thụ
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bồn Sục Khoáng Nóng Hinoki Kiso 250 Năm &amp; Vi Bọt Khí Nano
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Chế tác thủ công từ những thân gỗ bách Hinoki vùng Kiso Nhật Bản tuổi thọ hơn 250 năm, ghép mộng chốt gỗ không đinh ốc. 
            Mỗi lần xả nước khoáng nóng 41.5°C là một lần kích hoạt tinh dầu phytoncide tự nhiên ngát hương rừng thiêng, 
            kết hợp hệ thống sục vi bọt nano micro-bubble siêu mịn massage sâu từng huyệt đạo trên nền đá bazan núi lửa chống trượt R13.
          </p>
        </div>

        {/* Interactive Onsen Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Hinoki Tub Visualizer & Micro-bubble Steam Canvas */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Trạng Thái Thủy Trị Liệu Khoáng Nóng
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentMode.temp}°C — {currentMode.name}
                    </h3>
                  </div>

                  {/* Water purity & quiet badges */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400">Ozone + UV-C</span>
                    <span>|</span>
                    <span className="font-mono text-amber-400">0% Clo</span>
                    <span>|</span>
                    <span className="font-mono text-cyan-400">&lt; 22 dBA</span>
                  </div>
                </div>

                {/* 3D Hinoki Tub & Water Simulation Visualizer */}
                <div
                  className={cn(
                    'relative mt-6 h-72 sm:h-80 w-full overflow-hidden rounded-xl border p-5 flex flex-col justify-between transition-all duration-700',
                    isMicroBubbleActive
                      ? 'border-amber-700/60 bg-gradient-to-b from-stone-900 via-amber-950/30 to-[#18130e] shadow-[inset_0_0_80px_rgba(245,158,11,0.2)]'
                      : 'border-stone-800 bg-stone-950 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]'
                  )}
                >
                  {/* Steam & Rising Microbubbles Visual Layer */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {/* Simulated Hinoki tub rim grain texture */}
                    <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 opacity-90 border-b border-amber-900/60" />
                    
                    {/* Milky Micro-bubble water surface */}
                    <div
                      className={cn(
                        'absolute inset-x-4 bottom-4 top-10 rounded-lg transition-all duration-1000',
                        isMicroBubbleActive
                          ? 'bg-gradient-to-t from-amber-100/20 via-emerald-100/10 to-white/25 backdrop-blur-sm'
                          : 'bg-gradient-to-t from-teal-950/40 to-stone-900/60'
                      )}
                    >
                      {/* Animated Nano Bubbles */}
                      {isMicroBubbleActive && (
                        <div className="absolute inset-0 flex items-center justify-around opacity-60">
                          <span className="h-2 w-2 rounded-full bg-white/70 animate-ping delay-100" />
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-100/80 animate-ping delay-300" />
                          <span className="h-2.5 w-2.5 rounded-full bg-white/60 animate-ping delay-500" />
                          <span className="h-1 w-1 rounded-full bg-emerald-100/70 animate-ping delay-200" />
                          <span className="h-2 w-2 rounded-full bg-white/80 animate-ping delay-700" />
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-100/60 animate-ping delay-150" />
                        </div>
                      )}

                      {/* Gentle Heat Waves */}
                      <div className="absolute top-2 inset-x-0 flex justify-center gap-6 opacity-40">
                        <div className="h-8 w-1 bg-gradient-to-t from-amber-200/40 to-transparent blur-[1px] transform -rotate-6 animate-pulse" />
                        <div className="h-12 w-1 bg-gradient-to-t from-amber-200/50 to-transparent blur-[1px] animate-pulse delay-200" />
                        <div className="h-10 w-1 bg-gradient-to-t from-amber-200/40 to-transparent blur-[1px] transform rotate-6 animate-pulse delay-500" />
                      </div>
                    </div>
                  </div>

                  {/* Top status info in visualizer */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      GỖ HINOKI KISO (250 NĂM TUỔI) • GHÉP MỘNG NGÀM
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-emerald-300">
                      VI BỌT KHÍ: {isMicroBubbleActive ? 'ĐANG KÍCH HOẠT (15-20 MICRON)' : 'CHẾ ĐỘ TĨNH'}
                    </span>
                  </div>

                  {/* Bottom metrics on tub */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Hiệu Quả Y Học:</div>
                      <div className="text-stone-200 font-serif text-xs max-w-sm mt-0.5">
                        {currentMode.therapeuticEffect}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-2xl font-bold text-amber-300">
                        {currentMode.temp}°C
                      </span>
                      <div className="text-[10px] text-stone-400 font-mono">
                        Biến thiên ±0.1°C Inverter
                      </div>
                    </div>
                  </div>
                </div>

                {/* Micro-bubble & Sensory Controls */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMicroBubbleActive(!isMicroBubbleActive)}
                      className={cn(
                        'rounded-lg border px-3 py-1.5 font-medium transition-all',
                        isMicroBubbleActive
                          ? 'border-emerald-400 bg-emerald-950/60 text-emerald-200'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400'
                      )}
                    >
                      {isMicroBubbleActive ? '✓ Bọt Khí Nano Sữa Trắng (Bật)' : '○ Kích Hoạt Vi Bọt Nano'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={toggleSound}
                      className={cn(
                        'rounded-lg border px-3 py-1.5 font-mono text-xs transition-all',
                        !isSoundMuted
                          ? 'border-amber-400 bg-amber-950/60 text-amber-200'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400'
                      )}
                    >
                      {!isSoundMuted ? '🔊 Âm Thanh Suối Thiền (136.1Hz)' : '🔇 Bật Âm Thiền Thủy Liệu'}
                    </button>
                  </div>

                  <div className="text-stone-400 text-xs">
                    Thời gian ngâm khuyến nghị: <span className="text-amber-300 font-mono">{currentMode.recommendedDuration}</span>
                  </div>
                </div>
              </div>

              {/* Sensory Note Banner */}
              <div className="mt-5 rounded-xl border border-amber-900/50 bg-amber-950/20 p-4 text-xs text-amber-200/90 leading-relaxed font-serif">
                <span className="font-semibold text-amber-300">Cảm Nhận Giác Quan: </span>
                {currentMode.sensoryNote} Sàn bước và thành bể ốp đá bazan núi lửa chẻ thô mài nhám R13 chống trượt an toàn tuyệt đối.
              </div>
            </div>

            {/* Right 5 cols: Temperature Selector & Phytoncide Air Quality Metrics */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Temperature Selector */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  Lựa Chọn Cấp Độ Nhiệt Thủy Liệu Pháp
                </h4>
                <div className="mt-3 space-y-3">
                  {(Object.keys(TEMP_MODES) as OnsenTempPreset[]).map((tempKey) => {
                    const mode = TEMP_MODES[tempKey]
                    const isSelected = activeTemp === tempKey
                    return (
                      <button
                        key={tempKey}
                        type="button"
                        onClick={() => setActiveTemp(tempKey)}
                        className={cn(
                          'w-full text-left rounded-xl border p-3.5 transition-all duration-300',
                          isSelected
                            ? 'border-amber-500 bg-gradient-to-r from-amber-950/70 via-stone-900 to-stone-900 text-stone-100 shadow-lg'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700 hover:text-stone-200'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-medium text-stone-200 text-sm">
                            {mode.name}
                          </span>
                          <span className="font-mono text-base font-bold text-amber-400 bg-amber-950/90 px-2.5 py-0.5 rounded border border-amber-500/40">
                            {mode.temp}°C
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-stone-400 font-light">
                          {mode.subtitle}
                        </p>
                        <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-stone-500">
                          <span>{mode.circulationRate}</span>
                          <span className="text-emerald-400">{mode.recommendedDuration}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Hinoki Wood & Air Quality Sensor Panel */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                      Chỉ Số Phytoncide &amp; Vi Sinh Khí Phòng
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">Đo Thời Gian Thực</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Tinh Dầu Phytoncide</span>
                    <div className="mt-1 font-mono text-lg text-emerald-400 font-semibold">14.8 ppm</div>
                    <span className="text-[9px] text-stone-500">Từ thớ gỗ Hinoki Kiso</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Kháng Khuẩn Tự Nhiên</span>
                    <div className="mt-1 font-mono text-lg text-amber-300 font-semibold">99.8%</div>
                    <span className="text-[9px] text-stone-500">Hợp chất Hinokitiol</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Độ Nhám Chống Trượt</span>
                    <div className="mt-1 font-mono text-lg text-cyan-400 font-semibold">R13</div>
                    <span className="text-[9px] text-stone-500">Đá núi lửa bazan đen</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Bơm Từ Trường Êm</span>
                    <div className="mt-1 font-mono text-lg text-purple-300 font-semibold">&lt; 22 dBA</div>
                    <span className="text-[9px] text-stone-500">Tuyệt đối tĩnh âm</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 text-[11px] text-stone-400 leading-relaxed">
                  Gỗ Hinoki được nhập khẩu nguyên khối từ vùng Kiso (tỉnh Nagano, Nhật Bản), sấy tự nhiên 18 tháng để đạt độ ẩm thớ 12% trước khi các nghệ nhân mộc ghép thành bồn Onsen.
                </div>
              </div>

              {/* Consultation CTA */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=artisan-hinoki-onsen-vault"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-800 to-amber-600 px-5 py-3 text-xs sm:text-sm font-medium text-amber-100 hover:from-amber-700 hover:to-amber-500 transition-all shadow-lg shadow-amber-950/50"
                >
                  <span>Đặt Lịch Tư Vấn Onsen Gỗ Hinoki</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-amber-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Tích hợp trọn gói hệ thống lọc sinh học &amp; gia nhiệt inverter.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
