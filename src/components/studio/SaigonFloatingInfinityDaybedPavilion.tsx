'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type TimeOfDay = 'dawn' | 'dusk' | 'moonlight'

interface TimeScenario {
  id: TimeOfDay
  title: string
  subtitle: string
  timeRange: string
  skyGradient: string
  glowColor: string
  temperature: string
  humidity: string
  windBreeze: string
  sensoryDescription: string
  recommendedTea: string
}

const TIME_SCENARIOS: Record<TimeOfDay, TimeScenario> = {
  dawn: {
    id: 'dawn',
    title: 'Nắng Sớm Ban Mai',
    subtitle: 'Khởi đầu ngày mới với làn gió sương sông Sài Gòn êm dịu',
    timeRange: '05:30 — 07:00',
    skyGradient: 'from-amber-200/20 via-sky-900/30 to-stone-950',
    glowColor: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
    temperature: '24.8°C',
    humidity: '72% RH',
    windBreeze: '2.4 m/s (Gió Nam sông Sài Gòn)',
    sensoryDescription:
      'Tia nắng sớm xuyên qua rèm cây ban công, phản chiếu lên mặt nước sông uốn lượn. Giường đung đưa nhịp điệu tự nhiên, không khí mát lành tinh khôi trước khi thành phố thức giấc.',
    recommendedTea: 'Trà Shan Tuyết cổ thụ ủ lạnh hoa bưởi thanh khiết.',
  },
  dusk: {
    id: 'dusk',
    title: 'Hoàng Hôn Rực Rỡ',
    subtitle: 'Khoảnh khắc ngắm vòm trời chuyển sắc tím hổ phách trên đỉnh Landmark',
    timeRange: '17:15 — 18:30',
    skyGradient: 'from-rose-500/25 via-amber-700/20 to-stone-950',
    glowColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    temperature: '29.2°C',
    humidity: '68% RH',
    windBreeze: '3.1 m/s (Gió đối lưu chiều muộn)',
    sensoryDescription:
      'Mặt trời đỏ rực lặn dần phía sau những cây cầu. Đèn LED đáy giường 2200K tự động kích hoạt tạo vầng hào quang ấm áp, mặt gỗ Teak Miến Điện tỏa ra mùi tinh dầu gỗ mộc dễ chịu.',
    recommendedTea: 'Vang đỏ Pinot Noir ủ sồi hoặc trà thảo mộc hoa cúc sấy thăng hoa.',
  },
  moonlight: {
    id: 'moonlight',
    title: 'Đêm Trăng Sông Sài Gòn',
    subtitle: 'Tĩnh lặng tuyệt đối giữa bầu trời ngàn sao và dòng sông lấp lánh',
    timeRange: '20:00 — 23:00',
    skyGradient: 'from-indigo-900/30 via-slate-900/40 to-stone-950',
    glowColor: 'bg-indigo-400/20 text-indigo-300 border-indigo-400/30',
    temperature: '26.5°C',
    humidity: '75% RH',
    windBreeze: '1.8 m/s (Gió sông đêm thanh bình)',
    sensoryDescription:
      'Toàn bộ ánh sáng thành phố xa xăm thu lại dưới chân. Giường treo tựa một ốc đảo bay giữa không trung, mang lại cảm giác không trọng lượng thư thái trọn vẹn.',
    recommendedTea: 'Trà Oolong mật hương ấm nóng giữ ấm cơ thể trong gió đêm.',
  },
}

interface LoadSafetyTest {
  level: 'light' | 'standard' | 'maximum'
  loadWeight: number // in kg
  label: string
  factorSafety: string
  deflection: string
  cableTension: string
  comfortScore: string
}

const LOAD_TESTS: Record<string, LoadSafetyTest> = {
  light: {
    level: 'light',
    loadWeight: 150,
    label: 'Một Người Thư Giãn (150 kg)',
    factorSafety: 'FS = 4.0 (Siêu bền)',
    deflection: '&lt; 1.2 mm',
    cableTension: '368 N / sợi cáp',
    comfortScore: '99/100 (Bồng bềnh tuyệt đối)',
  },
  standard: {
    level: 'standard',
    loadWeight: 300,
    label: 'Cặp Đôi Cùng Trẻ Nhỏ (300 kg)',
    factorSafety: 'FS = 2.0 (An toàn kép)',
    deflection: '&lt; 2.5 mm',
    cableTension: '735 N / sợi cáp',
    comfortScore: '97/100 (Êm ái ổn định)',
  },
  maximum: {
    level: 'maximum',
    loadWeight: 600,
    label: 'Tải Trọng Kiểm Định Tĩnh (600 kg)',
    factorSafety: 'FS = 1.0 (Ngưỡng chứng nhận)',
    deflection: '&lt; 4.8 mm',
    cableTension: '1,470 N / sợi cáp',
    comfortScore: '95/100 (Kết cấu vững chãi)',
  },
}

export function SaigonFloatingInfinityDaybedPavilion({ className }: { className?: string }) {
  const componentId = useId()
  const [activeTime, setActiveTime] = useState<TimeOfDay>('dusk')
  const [swayAmplitude, setSwayAmplitude] = useState<number>(3) // degrees sway
  const [isSwaying, setIsSwaying] = useState<boolean>(true)
  const [activeLoadLevel, setActiveLoadLevel] = useState<'light' | 'standard' | 'maximum'>('standard')
  const [rainSimulation, setRainSimulation] = useState<boolean>(false)

  const scenario = TIME_SCENARIOS[activeTime]
  const currentLoad = LOAD_TESTS[activeLoadLevel] ?? LOAD_TESTS.standard!

  const triggerGentleSway = () => {
    setIsSwaying(true)
    // Sound of gentle outdoor rope suspension
    try {
      if (typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(110, ctx.currentTime) // Low soothing tone
          osc.frequency.exponentialRampToValueAtTime(82, ctx.currentTime + 1.2)
          gain.gain.setValueAtTime(0.04, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 1.5)
        }
      }
    } catch {
      // Audio context safe fallback
    }
  }

  return (
    <section
      id={`floating-daybed-pavilion-${componentId}`}
      aria-label="Giường nghỉ treo lơ lửng ban công logia GuHomes"
      className={cn(
        'relative w-full overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200',
        className
      )}
    >
      {/* Background Time Sky Gradient Transition */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-b transition-all duration-1000 opacity-40',
          scenario.skyGradient
        )}
      />

      <div className="relative mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-6 border-b border-stone-800/80 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              02 / THIẾT KẾ ĐỘC BẢN BAN CÔNG LOGIA PENTHOUSE
            </div>
            <h2 className="mt-5 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl leading-tight">
              Giường Nghỉ Treo Lơ Lửng Infinity Daybed Ban Công Penthouse Sài Gòn
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-stone-400 lg:text-lg">
              Giữa tầng mây lộng gió nhìn xuống khúc quanh sông Sài Gòn, GuHomes kiến tạo chiếc Daybed treo 4 điểm bằng
              cáp thép không gỉ SS316 bọc da thuộc thảo mộc. Khung gỗ Teak Miến Điện 100% uốn lượn hữu cơ, đệm QuickDry
              Foam thoát nước mưa tức thì, cùng vầng sáng đáy 2200K mang đến cảm giác buông bỏ trọng lực hoàn toàn.
            </p>
          </div>

          {/* Quick Engineering Specifications Badge */}
          <div className="flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm lg:min-w-[300px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>TẢI TRỌNG AN TOÀN TĨNH</span>
              <span className="text-amber-400 font-bold">600 KG (TEST PASS)</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">CÁP TREO</span>
                <span className="font-mono text-xs font-medium text-stone-200">SS316 Ø12mm Bọc Da</span>
              </div>
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">GỖ KHUNG</span>
                <span className="font-mono text-xs font-medium text-amber-300">Teak Miến Điện 100%</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 italic">
              * Khay xoay 360° đồng thau &amp; vải Sunbrella Acrylic cản 99% tia cực tím.
            </div>
          </div>
        </div>

        {/* Section 1: Thời Khắc Trong Ngày & Vi Khí Hậu Ban Công (Dawn - Dusk - Moonlight) */}
        <div className="mb-16">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-serif text-2xl font-light text-stone-200">
              Ba Thời Khắc Vi Khí Hậu Tận Hưởng Trong Ngày
            </h3>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
              <span>CHỌN KHUNG GIỜ:</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {(Object.keys(TIME_SCENARIOS) as TimeOfDay[]).map((timeKey) => {
              const sc = TIME_SCENARIOS[timeKey]
              const isSelected = activeTime === timeKey
              return (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setActiveTime(timeKey)}
                  className={cn(
                    'flex flex-col justify-between rounded-2xl p-6 text-left transition-all duration-300 border min-h-[190px]',
                    isSelected
                      ? 'border-amber-500/80 bg-stone-900/90 shadow-2xl ring-1 ring-amber-500/40'
                      : 'border-stone-800/80 bg-stone-950/60 hover:border-stone-700 hover:bg-stone-900/50'
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono tracking-wider text-amber-400">{sc.timeRange}</span>
                      <span className={cn('text-[10px] font-mono px-2 py-0.5 rounded-full border', sc.glowColor)}>
                        {timeKey === 'dawn' ? 'BÌNH MINH' : timeKey === 'dusk' ? 'HOÀNG HÔN' : 'ĐÊM TRĂNG'}
                      </span>
                    </div>
                    <h4 className="mt-3 font-serif text-xl font-light text-stone-100">{sc.title}</h4>
                    <p className="mt-1 text-xs text-stone-400 font-light line-clamp-2">{sc.subtitle}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/60 flex items-center justify-between text-xs font-mono text-stone-300">
                    <span>
                      {sc.temperature} &middot; {sc.humidity}
                    </span>
                    <span className="text-amber-400/90">&rarr;</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Active Moment Ambient Experience Detail */}
          <div className="mt-6 rounded-2xl border border-stone-800/80 bg-gradient-to-r from-stone-900/90 via-stone-950 to-stone-900/90 p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
              <div className="space-y-3 lg:col-span-8">
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                  TRẢI NGHIỆM GIÁC QUAN TẠI {scenario.title.toUpperCase()}
                </span>
                <p className="text-sm font-light leading-relaxed text-stone-300 lg:text-base">
                  {scenario.sensoryDescription}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400">
                  <div className="rounded-lg bg-stone-900 px-3 py-1.5 border border-stone-800">
                    <strong className="text-stone-300">Vi khí hậu:</strong> {scenario.windBreeze}
                  </div>
                  <div className="rounded-lg bg-stone-900 px-3 py-1.5 border border-stone-800">
                    <strong className="text-amber-200">Gợi ý thức uống:</strong> {scenario.recommendedTea}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-xl border border-amber-600/30 bg-amber-950/20 p-5 text-center lg:col-span-4">
                <span className="text-xs font-mono text-amber-300">ĐÈN HẮT ĐÁY GIƯỜNG KHÔNG TRỌNG LỰC</span>
                <span className="font-mono text-xl font-bold text-amber-200 mt-2">2200K WARM AMBER</span>
                <span className="text-[11px] text-stone-400 mt-2 font-light">
                  Chỉ số hoàn màu CRI 98, chiếu hắt sàn ban công tạo hiệu ứng chiếc giường đang lơ lửng giữa mây.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Trình Mô Phỏng Dao Động Đu Đưa (Gentle Sway Physics) & Cấu Tạo Teak SS316 */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Interactive Sway Simulator & QuickDry Test (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 tracking-wider uppercase">
                    DAO ĐỘNG THƯ THÁI TỰ NHIÊN
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-light text-stone-100">
                    Mô Phỏng Biên Độ Đung Đưa (Gentle Sway Physics)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={triggerGentleSway}
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-mono text-amber-300 hover:bg-amber-500/20 transition-all min-h-[44px]"
                >
                  ĐẨY NHẸ GIƯỜNG &sim;
                </button>
              </div>

              {/* Visual Sway Graphic */}
              <div className="relative my-8 flex h-52 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950">
                {/* 4 Suspension Cables coming down */}
                <div className="absolute top-0 left-12 w-0.5 h-28 bg-gradient-to-b from-stone-400 via-amber-700/60 to-amber-600" />
                <div className="absolute top-0 right-12 w-0.5 h-28 bg-gradient-to-b from-stone-400 via-amber-700/60 to-amber-600" />
                <div className="absolute top-0 left-28 w-0.5 h-28 bg-gradient-to-b from-stone-500/80 to-amber-700/40" />
                <div className="absolute top-0 right-28 w-0.5 h-28 bg-gradient-to-b from-stone-500/80 to-amber-700/40" />

                {/* Daybed Body with Animated Tilt */}
                <div
                  style={{
                    transform: isSwaying ? `rotate(${swayAmplitude * 0.8}deg)` : 'rotate(0deg)',
                    transition: 'transform 1.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)',
                  }}
                  className="relative z-10 flex flex-col items-center"
                >
                  {/* Mattress + Wood Frame */}
                  <div className="h-10 w-72 sm:w-96 rounded-t-xl bg-gradient-to-r from-stone-200 via-stone-100 to-stone-300 shadow-xl border-t-2 border-stone-100 flex items-center justify-center">
                    <span className="text-[10px] font-mono text-stone-600 tracking-widest font-semibold uppercase">
                      Sunbrella QuickDry Cushion 2400 x 1400 mm
                    </span>
                  </div>
                  {/* Teak Wood Curved Base */}
                  <div className="h-4 w-80 sm:w-[410px] rounded-b-2xl bg-amber-900 border-t border-amber-800/80 shadow-2xl flex items-center justify-between px-4">
                    <span className="h-1 w-1 rounded-full bg-amber-400" />
                    <span className="text-[9px] font-mono text-amber-300">BURMESE TEAKWOOD</span>
                    <span className="h-1 w-1 rounded-full bg-amber-400" />
                  </div>

                  {/* Amber Under-bed Ambient Glow */}
                  <div className="mt-1 h-3 w-64 rounded-full bg-amber-400/40 blur-md" />
                </div>

                {/* Rain Particles overlay if toggled */}
                {rainSimulation && (
                  <div className="pointer-events-none absolute inset-0 bg-sky-950/20 flex items-center justify-center">
                    <div className="text-center font-mono text-xs text-sky-300 bg-stone-900/90 p-3 rounded-lg border border-sky-400/30">
                      Mưa rào nhiệt đới: Nước thoát 100% qua mút QuickDry Foam trong 45 giây.
                    </div>
                  </div>
                )}
              </div>

              {/* Sway Controls */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-stone-800 bg-stone-950/70 p-4">
                  <div className="flex justify-between text-xs font-mono text-stone-400 mb-2">
                    <span>Biên Độ Dao Động</span>
                    <span className="text-amber-300">&plusmn;{swayAmplitude}°</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={swayAmplitude}
                    onChange={(e) => setSwayAmplitude(Number(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer h-1.5 bg-stone-700 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-500 mt-1">
                    <span>1° (Ru ngủ êm)</span>
                    <span>3° (Chuẩn thư thái)</span>
                    <span>6° (Bay bổng tối đa)</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-950/70 p-4">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                    <span>THỬ NGHIỆM MƯA SÀI GÒN</span>
                    <span className="text-sky-300">{rainSimulation ? 'ĐANG MƯA' : 'KHÔ RÁO'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setRainSimulation(!rainSimulation)}
                    className={cn(
                      'mt-2 rounded-lg py-2 px-3 text-xs font-mono transition-all min-h-[44px]',
                      rainSimulation
                        ? 'bg-sky-500/20 text-sky-200 border border-sky-500/40'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    )}
                  >
                    {rainSimulation ? 'Dừng Giả Lập Mưa' : 'Kích Hoạt Mưa Thoát Nước Nhanh'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 600kg Load Safety Audit & Materials (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/80 p-8 lg:col-span-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                  KIỂM ĐỊNH KỸ THUẬT AN TOÀN
                </span>
                <span className="text-xs font-mono text-stone-500">TCVN 9386</span>
              </div>

              <h4 className="mt-4 font-serif text-xl font-light text-stone-100">
                Thử Nghiệm Tải Trọng Tĩnh &amp; Độ Biến Dạng Cáp SS316
              </h4>
              <p className="mt-2 text-xs font-light text-stone-400 leading-relaxed">
                4 điểm treo độc lập liên kết bulông hóa học Hilti neo sâu vào dầm bê tông cốt thép chịu lực của tòa nhà,
                đảm bảo không rung lắc ngay cả trong giông lốc cấp 8.
              </p>

              {/* Load Buttons */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {(Object.keys(LOAD_TESTS) as ('light' | 'standard' | 'maximum')[]).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setActiveLoadLevel(lvl)}
                    className={cn(
                      'rounded-lg p-2.5 text-center text-xs font-mono transition-all border min-h-[50px]',
                      activeLoadLevel === lvl
                        ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                        : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200'
                    )}
                  >
                    {lvl === 'light' ? '150 KG' : lvl === 'standard' ? '300 KG' : '600 KG'}
                  </button>
                ))}
              </div>

              {/* Load Details Card */}
              <div className="mt-5 rounded-xl border border-stone-800/80 bg-stone-950/80 p-4 space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Trạng Thái Tải:</span>
                  <span className="font-medium text-stone-200">{currentLoad.label}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Hệ Số An Toàn (Safety Factor):</span>
                  <span className="font-mono font-medium text-emerald-400">{currentLoad.factorSafety}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Độ Võng Tối Đa Khung:</span>
                  <span className="font-mono font-medium text-amber-300">{currentLoad.deflection}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Lực Căng Mỗi Cáp Treo:</span>
                  <span className="font-mono font-medium text-stone-200">{currentLoad.cableTension}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-400">Chỉ Số Thư Giãn Êm Ái:</span>
                  <span className="font-mono font-medium text-amber-200">{currentLoad.comfortScore}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-800 pt-5">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-3">
                <span>GỖ TEAK MIẾN ĐIỆN LOẠI 1</span>
                <span className="text-amber-300">TỰ TIẾT TINH DẦU CHỐNG MỐI</span>
              </div>
              <p className="text-xs text-stone-500 font-light leading-relaxed">
                Gỗ Teak tự nhiên sở hữu hàm lượng silica và dầu tự nhiên cực cao, trơ trước nắng gắt và mưa ẩm Sài Gòn,
                ngả màu xám bạc ánh kim vương giả sau 3 năm ngoài trời.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Bottom Navigation and Action */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 lg:p-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h4 className="font-serif text-xl font-light text-stone-100">
              Khảo sát kết cấu trần bê tông để treo Infinity Daybed tại căn hộ của bạn
            </h4>
            <p className="mt-1 text-xs text-stone-400 font-light">
              Kỹ sư kết cấu GuHomes sẽ tiến hành siêu âm dầm bê tông cốt thép và lập bản vẽ kết cấu chịu lực 3D miễn phí.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-5 py-2.5 text-xs font-medium text-stone-950 transition-colors hover:bg-stone-200 min-h-[44px]"
            >
              <span>Đăng ký khảo sát kết cấu treo</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-5 py-2.5 text-xs font-medium text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100 min-h-[44px]"
            >
              <span>Xem dự toán trọn gói Daybed</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
