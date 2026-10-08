'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface IncenseGrade {
  id: string
  name: string
  origin: string
  temperature: number
  description: string
  smokeDensity: string
  scentHue: string
  resinYield: string
}

const INCENSE_GRADES: IncenseGrade[] = [
  {
    id: 'tram-nu-hoa-co',
    name: 'Trầm Nụ Thảo Mộc Rừng Già',
    origin: 'Rừng nguyên sinh Tiên Phước, Quảng Nam',
    temperature: 140,
    description: 'Nốt trầm thanh thoát mở đầu sớm mai, khói mỏng như sương mờ bảng lảng mang vị ngọt mát của hoa rừng nhiệt đới.',
    smokeDensity: 'Sương khói mảnh nhẹ',
    scentHue: 'Thanh Ngọt • Hoa Cỏ Rừng',
    resinYield: 'Hàm lượng tinh dầu 22%',
  },
  {
    id: 'tram-mieng-kien',
    name: 'Trầm Miếng Tự Nhiên Rừng Kiến',
    origin: 'Vùng đồi Hương Khê, Hà Tĩnh',
    temperature: 170,
    description: 'Trầm kiến tự nhiên sinh ra từ vết thương thân cây dó bầu tích tụ hơn 30 năm, nốt hương mộc ấm đượm sâu lắng, an thần định khí.',
    smokeDensity: 'Làn khói mây cuộn tròn',
    scentHue: 'Mộc Trầm • Mật Ong Rừng',
    resinYield: 'Hàm lượng tinh dầu 45%',
  },
  {
    id: 'ky-nam-bach-tinh',
    name: 'Kỳ Nam Hảo Hạng Hoàng Triều',
    origin: 'Rừng sâu Khánh Hòa, Việt Nam',
    temperature: 210,
    description: 'Vật phẩm thượng hạng tích nhựa thơm đặc quánh, khi gia nhiệt ở 210°C tỏa ra mùi hương huyền bí thanh tao không lẫn tạp vị khói.',
    smokeDensity: 'Sợi khói vân mây thanh khiết',
    scentHue: 'Huyền Bí • Vị Ngọt Hậu Bất Tận',
    resinYield: 'Hàm lượng tinh dầu > 75%',
  },
]

export function ArtisanBronzeIncenseBurnerAtelier({ className }: { className?: string } = {}) {
  const [selectedGradeIndex, setSelectedGradeIndex] = useState<number>(1)
  const [tempOverride, setTempOverride] = useState<number>(170)
  const [isCeramicPlateActive, setIsCeramicPlateActive] = useState<boolean>(true)
  const [customEngraving, setCustomEngraving] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const headingId = useId()
  const currentGrade = INCENSE_GRADES[selectedGradeIndex] ?? INCENSE_GRADES[0]!

  const playChime = () => {
    if (typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(528, now)
      osc.frequency.exponentialRampToValueAtTime(1056, now + 0.5)

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.06, now + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.7)
    } catch {
      // AudioContext fallback
    }
  }

  const handleGradeChange = (index: number) => {
    setSelectedGradeIndex(index)
    const grade = INCENSE_GRADES[index]
    if (grade) {
      setTempOverride(grade.temperature)
    }
    playChime()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    playChime()
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Bronze Patina & Incense Smoke Ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 h-[550px] w-[550px] rounded-full bg-amber-950/25 blur-[180px]" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-stone-900/60 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.06),transparent_75%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Đạo Trầm Đại Việt • Đồng Mắt Cua Đúc Thủ Công
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bộ Lư Xông Trầm Đồng Mắt Cua Chạm Mây Cuộn
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Tuyệt phẩm lư đồng nguyên khối đúc mẫu sáp truyền thống, hoa văn mây cuộn Đại Việt thời Lê Trung Hưng chạm lộng thủ công. 
            Ứng dụng công nghệ gia nhiệt vi mạch gốm MCH không khói đen, giữ trọn vẹn 100% nốt hương thanh khiết của trầm hương và kỳ nam tự nhiên.
          </p>
        </div>

        {/* Interactive Incense Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left 7 cols: Bronze Incense Burner Visualizer & Smoke Flow Canvas */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Phẩm Cấp Trầm Hương Đang Xông
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {currentGrade.name}
                    </h3>
                  </div>

                  {/* Micro Heating Specs */}
                  <div className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-stone-950/90 px-3 py-1 text-xs text-stone-300 font-mono">
                    <span className="text-amber-400 font-bold">{tempOverride}°C</span>
                    <span>|</span>
                    <span className="text-emerald-400">Gốm MCH Không Khói Đen</span>
                  </div>
                </div>

                {/* Bronze Burner Graphic Canvas */}
                <div className="relative mt-6 h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-amber-900/40 bg-[#0d0907] p-6 flex flex-col justify-between shadow-[inset_0_0_80px_rgba(0,0,0,0.95)]">
                  {/* Subtle Warm Incense Glow */}
                  <div
                    className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 65%, rgba(245,158,11,${(tempOverride / 250) * 0.25}), transparent 65%)`,
                    }}
                  />

                  {/* Top info badge */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      {currentGrade.origin}
                    </span>
                    <span className="rounded-md border border-emerald-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-emerald-300">
                      {currentGrade.resinYield}
                    </span>
                  </div>

                  {/* SVG Bronze Burner with Chased Cloud Openings & Rising Smoke */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    {/* Simulated Smoke Wave */}
                    <div className="relative h-24 w-32 overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 via-stone-300/10 to-transparent blur-md animate-pulse" />
                      <svg className="h-20 w-24 text-amber-200/40 animate-pulse" viewBox="0 0 100 80" fill="none">
                        <path
                          d="M30 70 Q 20 40 40 30 T 50 10 Q 60 40 40 50 T 60 70"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="opacity-70"
                        />
                        <path
                          d="M50 70 Q 70 50 55 35 T 65 15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="opacity-50"
                        />
                      </svg>
                    </div>

                    {/* Bronze Incense Burner Illustration */}
                    <svg className="h-32 w-48 drop-shadow-[0_0_25px_rgba(217,119,6,0.35)]" viewBox="0 0 200 130" fill="none">
                      {/* Ceramic Base Plate */}
                      {isCeramicPlateActive && (
                        <ellipse cx="100" cy="115" rx="75" ry="10" fill="#292524" stroke="#78350f" strokeWidth="1.5" />
                      )}
                      
                      {/* Tripod Bronze Legs */}
                      <path d="M50 85 L40 110 L52 110 Z" fill="#92400e" stroke="#b45309" strokeWidth="1" />
                      <path d="M150 85 L160 110 L148 110 Z" fill="#92400e" stroke="#b45309" strokeWidth="1" />
                      <path d="M96 90 L100 112 L104 90 Z" fill="#78350f" />

                      {/* Burner Body */}
                      <ellipse cx="100" cy="75" rx="55" ry="25" fill="#451a03" stroke="#b45309" strokeWidth="2" />
                      <path d="M45 75 Q 100 95 155 75 L 145 55 Q 100 68 55 55 Z" fill="#78350f" stroke="#d97706" strokeWidth="1.5" />

                      {/* Burner Lid with Chased Cloud Piercings */}
                      <path d="M55 55 Q 100 20 145 55 Z" fill="#92400e" stroke="#f59e0b" strokeWidth="1.5" />
                      
                      {/* Cloud Cutouts on Lid */}
                      <circle cx="85" cy="42" r="3" fill="#0d0907" stroke="#fbbf24" strokeWidth="1" />
                      <circle cx="100" cy="35" r="3.5" fill="#0d0907" stroke="#fbbf24" strokeWidth="1" />
                      <circle cx="115" cy="42" r="3" fill="#0d0907" stroke="#fbbf24" strokeWidth="1" />
                      <path d="M80 48 Q 100 42 120 48" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />

                      {/* Lid Finial: Bronze Cloud Knob */}
                      <circle cx="100" cy="22" r="5" fill="#d97706" stroke="#fef08a" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Bottom metrics on visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Đặc Trưng Làn Khói:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5 leading-snug">
                        {currentGrade.description}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Sắc Thái Mùi Hương:</div>
                      <div className="text-xs font-serif text-amber-300 font-medium">
                        {currentGrade.scentHue}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grade Selector Pills */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {INCENSE_GRADES.map((grade, idx) => {
                    const isSelected = selectedGradeIndex === idx
                    return (
                      <button
                        key={grade.id}
                        type="button"
                        onClick={() => handleGradeChange(idx)}
                        className={cn(
                          'flex-1 min-w-[140px] rounded-lg border px-3 py-2 text-left transition-all duration-200',
                          isSelected
                            ? 'border-amber-400/80 bg-amber-950/40 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                            : 'border-stone-800 bg-stone-950/60 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                        )}
                      >
                        <div className="text-[10px] font-mono text-amber-400/80">{grade.temperature}°C</div>
                        <div className="font-serif text-xs font-medium text-stone-200 truncate mt-0.5">
                          {grade.name}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right 5 cols: Temp Slider, Ceramic Toggle & Custom Bespoke Engraving */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* Temperature Precision Control */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-sm text-stone-200 font-medium">
                    Nhiệt Độ Xông Trầm Vi Mạch MCH
                  </h4>
                  <span className="font-mono text-xs text-amber-400 font-bold">{tempOverride}°C</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="240"
                  step="5"
                  value={tempOverride}
                  onChange={(e) => setTempOverride(Number(e.target.value))}
                  className="mt-3 w-full accent-amber-500 cursor-pointer"
                />
                <div className="mt-2 flex justify-between text-[10px] font-mono text-stone-500">
                  <span>100°C (Sấy Ấm)</span>
                  <span>170°C (Trầm Miếng)</span>
                  <span>240°C (Kỳ Nam)</span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-300 font-serif">Đĩa Gốm Rạn Bát Tràng Men Tro:</span>
                  <button
                    type="button"
                    onClick={() => setIsCeramicPlateActive(!isCeramicPlateActive)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs font-mono transition-colors',
                      isCeramicPlateActive
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-stone-800 text-stone-400 border border-stone-700'
                    )}
                  >
                    {isCeramicPlateActive ? 'ĐANG LÓT ĐẾ' : 'ĐỒNG MỘC'}
                  </button>
                </div>
              </div>

              {/* Bespoke Engraving Order Form */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <h4 className="font-serif text-sm text-stone-200 font-medium">
                  Đăng Ký Đúc Lư Đồng Thửa Riêng
                </h4>
                <p className="mt-1 text-xs text-stone-400 font-light">
                  Nghệ nhân đúc đồng sẽ chạm triện tên gia tộc, câu đối hoặc hoa văn phong thủy riêng biệt lên thành lư đồng.
                </p>

                {isSubmitted ? (
                  <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-3.5 text-center text-xs text-emerald-200">
                    <span className="font-mono text-emerald-400 font-semibold block">ĐÃ TIẾP NHẬN HỒ SƠ ĐÚC ĐỒNG</span>
                    Nghệ nhân GuHomes sẽ gửi bản vẽ 3D hoa văn mây cuộn và mẫu sáp để gia chủ duyệt trước khi đúc rót đồng.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                    <div>
                      <label htmlFor="custom-engraving" className="block text-[11px] font-mono text-stone-400 uppercase">
                        Nội Dung Triện Khắc Trên Thành Lư:
                      </label>
                      <input
                        id="custom-engraving"
                        type="text"
                        required
                        value={customEngraving}
                        onChange={(e) => setCustomEngraving(e.target.value)}
                        placeholder="Ví dụ: An Gia Bảo Điện, Tâm Tịnh Trầm Hương..."
                        className="mt-1 w-full rounded-md border border-stone-700 bg-stone-900 px-3 py-1.5 text-xs text-stone-100 placeholder:text-stone-500 focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md border border-amber-500/60 bg-gradient-to-r from-amber-700/50 to-amber-600/50 py-2 text-xs font-serif text-amber-100 hover:from-amber-600/60 hover:to-amber-500/60 transition-all shadow-md"
                    >
                      Xác Nhận Đặt Đúc Lư Đồng Thủ Công
                    </button>
                  </form>
                )}
              </div>

              {/* Direct Concierge Link */}
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900/90 py-3 text-xs font-serif text-stone-200 hover:border-amber-400 hover:text-amber-200 transition-colors"
                >
                  <span>Tư Vấn Thiết Kế Không Gian Thiền Định &amp; Trà Đạo</span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
