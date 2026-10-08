'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface SolarTerm {
  name: string
  solarLongitude: string
  season: string
  significance: string
}

const SOLAR_TERMS_HIGHLIGHT: SolarTerm[] = [
  {
    name: 'Lập Xuân (立春)',
    solarLongitude: '315°',
    season: 'Đầu Xuân (04/02)',
    significance: 'Khởi đầu chu kỳ vạn vật sinh sôi, nắng ấm phương Nam bắt đầu rực rỡ.',
  },
  {
    name: 'Thanh Minh (清明)',
    solarLongitude: '15°',
    season: 'Giữa Xuân (05/04)',
    significance: 'Khí trời trong sáng, gió nhẹ, thời khắc tưởng nhớ cội nguồn tổ tiên.',
  },
  {
    name: 'Hạ Chí (夏至)',
    solarLongitude: '90°',
    season: 'Đỉnh Hạ (21/06)',
    significance: 'Bóng nắng ngắn nhất trong năm, mặt trời chiếu vuông góc trên đỉnh đầu.',
  },
  {
    name: 'Thu Phân (秋分)',
    solarLongitude: '180°',
    season: 'Giữa Thu (23/09)',
    significance: 'Ngày đêm dài bằng nhau, luồng gió mát mùa thu bắt đầu thổi qua vườn cảnh.',
  },
  {
    name: 'Đông Chí (冬至)',
    solarLongitude: '270°',
    season: 'Đỉnh Đông (22/12)',
    significance: 'Bóng nắng dài nhất đổ về phương Bắc, tiết trời se lạnh tinh khôi sớm mai.',
  },
]

export function ArtisanMarbleSundialGardenVault({ className }: { className?: string } = {}) {
  const [hourOfDay, setHourOfDay] = useState<number>(14) // 06 to 18
  const [selectedTerm, setSelectedTerm] = useState<string>('Hạ Chí (夏至)')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [clientName, setClientName] = useState<string>('')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [marbleType, setMarbleType] = useState<string>('Cẩm thạch trắng Yên Bái vân mây')

  const vipPasscode = 'GU-SUNDIAL-2026-X'

  // Calculate shadow angle relative to hour: 06:00 = -75deg, 12:00 = 0deg, 18:00 = +75deg
  const shadowAngle = (hourOfDay - 12) * 12.5
  // Calculate shadow length: shortest at 12:00, longest at 06:00 and 18:00
  const shadowLength = Math.max(30, Math.abs(hourOfDay - 12) * 16 + 25)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientPhone.trim()) return
    setSubmitted(true)
  }

  const formatHour = (h: number) => {
    const hh = Math.floor(h)
    const mm = Math.round((h - hh) * 60)
    return `${hh < 10 ? '0' : ''}${hh}:${mm === 0 ? '00' : mm}`
  }

  return (
    <section
      aria-label="Đồng Hồ Mặt Trời Điêu Khắc Đá Cẩm Thạch Yên Bái"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background celestial sunlight aura */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 right-1/4 h-96 w-96 rounded-full bg-amber-600/10 blur-[130px]" />
        <div className="absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-stone-800/30 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(245,158,11,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Thiên Văn & Điêu Khắc Đá Phong Thủy
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Đồng Hồ Mặt Trời Cẩm Thạch Trắng Yên Bái
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Khối cẩm thạch trắng Yên Bái nguyên khối tiện gọt tinh xảo. Kim chỉ giờ đồng thau phay CNC 
            nghiêng đúng 10.7769° theo vĩ độ TP. Hồ Chí Minh, mặt đĩa đá khắc thủ công 24 tiết khí phương Đông 
            ghi dấu bóng nắng di chuyển êm đềm trong khuôn viên vườn dinh thự.
          </p>
        </div>

        {/* Interactive Solar Shadow & Gnomon Visualizer */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Interactive Sundial Dial Graphic */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Mô Phỏng Bóng Nắng Theo Giờ Trong Ngày
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      Thời Điểm: {formatHour(hourOfDay)} · Bóng Nghiêng {shadowAngle.toFixed(1)}°
                    </h3>
                  </div>

                  <div className="bg-stone-900 border border-stone-800 rounded-xl px-3 py-1.5 text-xs font-mono text-amber-300">
                    Vĩ Độ Sài Gòn: 10.7769° N
                  </div>
                </div>

                {/* Slider for Hours */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-stone-400">Điều chỉnh bóng nắng từ bình minh đến hoàng hôn:</span>
                    <span className="font-mono text-amber-300 font-semibold">{formatHour(hourOfDay)}</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.5"
                    value={hourOfDay}
                    onChange={(e) => setHourOfDay(parseFloat(e.target.value))}
                    className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 mt-1.5 font-mono">
                    <span>06:00 (Bình Minh)</span>
                    <span>09:00</span>
                    <span>12:00 (Chính Ngọ)</span>
                    <span>15:00</span>
                    <span>18:00 (Hoàng Hôn)</span>
                  </div>
                </div>

                {/* Circular Sundial Visual Plate */}
                <div className="mt-6 relative h-64 sm:h-72 rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-black overflow-hidden flex items-center justify-center p-6">
                  {/* Marble circular dial texture */}
                  <div className="relative h-52 w-52 sm:h-60 sm:w-60 rounded-full border border-stone-700 bg-stone-900 shadow-2xl flex items-center justify-center overflow-hidden">
                    {/* Concentric rings */}
                    <div className="absolute inset-4 rounded-full border border-stone-800" />
                    <div className="absolute inset-10 rounded-full border border-stone-800/60" />

                    {/* Hour ticks */}
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                      <div
                        key={deg}
                        className="absolute inset-0 flex justify-center items-start pt-1 pointer-events-none"
                        style={{ transform: `rotate(${deg}deg)` }}
                      >
                        <span className="w-0.5 h-2 bg-stone-600" />
                      </div>
                    ))}

                    {/* Central Gnomon (Brass Pin) */}
                    <div className="relative z-20 h-4 w-4 rounded-full bg-amber-400 border-2 border-stone-950 shadow-lg" />

                    {/* Dynamic Cast Shadow */}
                    <div
                      className="absolute z-10 origin-bottom bg-gradient-to-t from-stone-950 to-stone-900/60 transition-transform duration-300 pointer-events-none rounded-t-full shadow-lg"
                      style={{
                        bottom: '50%',
                        left: 'calc(50% - 2px)',
                        width: '4px',
                        height: `${shadowLength}%`,
                        transform: `rotate(${shadowAngle + 180}deg)`,
                      }}
                    />

                    {/* Cardinal directions */}
                    <span className="absolute top-2 text-[10px] font-mono text-amber-300 font-bold">N</span>
                    <span className="absolute bottom-2 text-[10px] font-mono text-stone-500">S</span>
                    <span className="absolute right-2 text-[10px] font-mono text-stone-500">E</span>
                    <span className="absolute left-2 text-[10px] font-mono text-stone-500">W</span>
                  </div>

                  <div className="absolute bottom-3 left-4 text-[11px] font-mono text-stone-400">
                    Góc nghiêng kim Gnomon: <strong className="text-amber-300">10°46&apos;37&quot;</strong>
                  </div>
                  <div className="absolute bottom-3 right-4 text-[11px] font-mono text-stone-400">
                    Khối lượng đá: <strong className="text-stone-200">650 kg</strong>
                  </div>
                </div>

                {/* 24 Solar Terms Preview Selector */}
                <div className="mt-6">
                  <span className="text-xs font-mono text-stone-400 block mb-2">
                    Tiết Khí Phương Đông Khắc Trên Mặt Đĩa Đá:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                    {SOLAR_TERMS_HIGHLIGHT.map((term) => (
                      <button
                        key={term.name}
                        type="button"
                        onClick={() => setSelectedTerm(term.name)}
                        className={cn(
                          'p-2.5 rounded-xl border text-left transition-all',
                          selectedTerm === term.name
                            ? 'border-amber-500/50 bg-amber-950/40 text-amber-200 font-medium'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:border-stone-700'
                        )}
                      >
                        <span className="block text-[11px] font-medium">{term.name.split(' (')[0]}</span>
                        <span className="block text-[10px] text-stone-500 mt-0.5">{term.season.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Custom Stonecraft Inquiry Form */}
            <div className="lg:col-span-5 rounded-xl border border-stone-800 bg-stone-950 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                  <span className="text-xs font-mono text-stone-300 uppercase tracking-wider">
                    Chế Tác Điêu Khắc Độc Bản
                  </span>
                  <span className="text-xs font-mono text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    Bespoke Garden
                  </span>
                </div>

                {submitted ? (
                  <div className="rounded-xl border border-emerald-900/60 bg-emerald-950/40 p-5 text-center my-6">
                    <div className="mx-auto h-9 w-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                      <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-serif text-stone-100 block">Đã Tiếp Nhận Yêu Cầu</span>
                    <p className="mt-1 text-xs text-stone-400">
                      Nghệ nhân điêu khắc đá GuHomes sẽ liên hệ gia chủ {clientName} qua số {clientPhone} để đo đạc hướng nắng sân vườn và khắc gia huy.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="my-5 space-y-3.5 text-left">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Họ Tên Gia Chủ *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Anh / Chị..."
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Số Điện Thoại Trực Tiếp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="09xx xxx xxx"
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-stone-400 mb-1">
                        Chủng Loại Đá Chế Tác
                      </label>
                      <select
                        value={marbleType}
                        onChange={(e) => setMarbleType(e.target.value)}
                        className="w-full h-10 rounded-xl bg-stone-900 border border-stone-800 px-3 text-xs text-stone-100 focus:outline-none focus:border-amber-500/50"
                      >
                        <option value="Cẩm thạch trắng Yên Bái vân mây">Cẩm thạch trắng Yên Bái vân mây</option>
                        <option value="Đá bazan đen Gia Lai mài honed">Đá bazan đen Gia Lai mài honed</option>
                        <option value="Đá sa thạch xám Quảng Nam">Đá sa thạch xám Quảng Nam điêu khắc</option>
                        <option value="Đá cẩm thạch Calacatta Ý">Đá cẩm thạch nhập khẩu Ý Calacatta</option>
                      </select>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="w-full h-11 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs tracking-wide transition-all duration-200 shadow-lg shadow-amber-600/20 flex items-center justify-center gap-1.5"
                      >
                        <span>Đặt Chế Tác Đồng Hồ Mặt Trời (Mã {vipPasscode})</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
                <span>Khắc cá nhân hóa:</span>
                <span className="font-mono text-stone-200">Gia huy & Tọa độ vườn gia tộc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stone Longevity & Celestial Harmony Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-400">
          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-amber-400 font-mono block mb-1">Chịu Nắng Mưa Vĩnh Cửu</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Đá cẩm thạch trắng Yên Bái với mật độ khoáng canxit đặc tính cao, chống rêu mốc và bền vững hàng trăm năm dưới nắng gió nhiệt đới.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-amber-400 font-mono block mb-1">Kim Gnomon Đồng Thau C36000</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Gia công cắt dây kim loại chính xác cao, tạo lớp patina rêu phong cổ kính sau nhiều năm dãi dầu sương gió cùng thiên nhiên.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-5">
            <span className="text-amber-400 font-mono block mb-1">Căn Chỉnh Hướng Bắc Thực</span>
            <p className="text-stone-300 leading-relaxed font-light">
              Kỹ sư trắc địa GuHomes sử dụng máy định vị GNSS vi sai căn chỉnh trục kim theo cực Bắc thiên văn, đảm bảo độ chính xác giờ sai số dưới 3 phút.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
