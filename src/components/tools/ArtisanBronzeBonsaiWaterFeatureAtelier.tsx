'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type BonsaiStyle = 'truc' | 'huyen' | 'hoanh'

interface BonsaiInfo {
  id: BonsaiStyle
  name: string
  sinoVietnamese: string
  meaning: string
  fengShuiPlacement: string
  bronzePatina: string
  dimensions: string
}

const BONSAI_STYLES: Record<BonsaiStyle, BonsaiInfo> = {
  truc: {
    id: 'truc',
    name: 'Thế Trực (Chokkan)',
    sinoVietnamese: 'Trực Tiết Can Trường',
    meaning: 'Thân cây thẳng tắp vươn thẳng lên trời, các tán phân bổ đều tứ diện. Biểu tượng của khí phách chính trực, gia phong vững vàng và sự nghiệp hưng thịnh dài lâu.',
    fengShuiPlacement: 'Trung cung sảnh chính biệt thự hoặc trục giếng trời đón khí quang minh',
    bronzePatina: 'Đồng đỏ phủ patina xanh ngọc (Verdigris Patina cổ điển)',
    dimensions: 'Cao 1.65m • Tán rộng 1.20m • Bệ đá bazan nặng 280kg',
  },
  huyen: {
    id: 'huyen',
    name: 'Thế Huyền (Kengai)',
    sinoVietnamese: 'Huyền Nhai Lạc Thủy',
    meaning: 'Thân cây uốn lượn rủ xuống dưới đáy chậu như thác nước đổ qua vách núi. Biểu trưng cho ý chí kiên định vượt qua mọi thử thách, tính nhẫn nại và sự linh hoạt vô biên.',
    fengShuiPlacement: 'Bên cạnh hồ cá Koi hoặc bậc tam cấp đá đen đón hướng gió mát',
    bronzePatina: 'Đồng thau hun khói đen mờ (Dark Smoked Bronze)',
    dimensions: 'Cao 1.45m • Vươn rủ 1.50m • Thác nước tuần hoàn 3 tầng',
  },
  hoanh: {
    id: 'hoanh',
    name: 'Thế Hoành (Shakan)',
    sinoVietnamese: 'Hoành Sơn Viễn Chiếu',
    meaning: 'Thân nghiêng duyên dáng vươn ra ngoài đón nắng và gió sông, ngọn uốn lượn ngẩng cao. Tượng trưng cho sự mở rộng tầm nhìn, kết nối quý nhân và tài lộc rộng mở.',
    fengShuiPlacement: 'Logia hướng sông Sài Gòn hoặc quầy bar phòng khách Master',
    bronzePatina: 'Đồng vàng ánh đỏ xước hairline thủ công (Brushed Antique Gold)',
    dimensions: 'Cao 1.35m • Tán ngang 1.80m • Bể nước đá bazan nguyên khối',
  },
}

type FlowRateLevel = 'gentle' | 'stream' | 'cascade'

interface FlowRateInfo {
  id: FlowRateLevel
  rate: string
  soundDba: string
  label: string
  frequency: number
}

const FLOW_RATES: Record<FlowRateLevel, FlowRateInfo> = {
  gentle: {
    id: 'gentle',
    rate: '2.5 L/phút',
    soundDba: '&lt; 14 dBA',
    label: 'Giọt Nước Thiền (Róc Rách Khẽ)',
    frequency: 240,
  },
  stream: {
    id: 'stream',
    rate: '5.0 L/phút',
    soundDba: '16 dBA',
    label: 'Suối Ngàn Rừng Tùng (Chuẩn Âm Cân Bằng)',
    frequency: 380,
  },
  cascade: {
    id: 'cascade',
    rate: '8.5 L/phút',
    soundDba: '19 dBA',
    label: 'Thác Nước Sinh Khí (Ion m Cực Đại)',
    frequency: 520,
  },
}

export function ArtisanBronzeBonsaiWaterFeatureAtelier({ className }: { className?: string } = {}) {
  const [selectedBonsai, setSelectedBonsai] = useState<BonsaiStyle>('truc')
  const [flowRate, setFlowRate] = useState<FlowRateLevel>('stream')
  const [mistDensity, setMistDensity] = useState<number>(75)
  const [isSoundPlaying, setIsSoundPlaying] = useState<boolean>(false)

  // Consultation form state
  const [houseDirection, setHouseDirection] = useState<string>('dong-nam')
  const [clientPhone, setClientPhone] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const headingId = useId()
  const activeBonsai = BONSAI_STYLES[selectedBonsai]
  const currentFlow = FLOW_RATES[flowRate]

  const toggleWaterSound = () => {
    if (typeof window === 'undefined') return
    if (isSoundPlaying) {
      setIsSoundPlaying(false)
      return
    }

    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      setIsSoundPlaying(true)

      // Synthesize soothing gentle stream trickles
      const bufferSize = audioCtx.sampleRate * 2
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.08
      }

      const noise = audioCtx.createBufferSource()
      noise.buffer = buffer
      noise.loop = true

      // Bandpass filter to make it sound like a peaceful water trickle
      const filter = audioCtx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(currentFlow.frequency, audioCtx.currentTime)
      filter.Q.setValueAtTime(3.0, audioCtx.currentTime)

      const gain = audioCtx.createGain()
      gain.gain.setValueAtTime(0.012, audioCtx.currentTime)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(audioCtx.destination)

      noise.start()

      // Stop automatically after 5 seconds to avoid endless background sound
      setTimeout(() => {
        try {
          noise.stop()
        } catch {
          // ignore
        }
        setIsSoundPlaying(false)
      }, 5000)
    } catch {
      setIsSoundPlaying(false)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-950 py-16 sm:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Water Mist & Bronze Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-[450px] w-[450px] rounded-full bg-emerald-950/20 blur-[160px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-950/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(16,185,129,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs tracking-widest text-emerald-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Thủy Mộc Tương Sinh &amp; Phong Thủy Dinh Thự
          </div>
          <h2 id={headingId} className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Tiểu Cảnh Tùng Bonsai Đúc Đồng &amp; Thác Nước Tĩnh m Róc Rách
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Sự giao hòa tuyệt mỹ giữa nghệ thuật đúc đồng thủ công truyền thống và dòng thác tuần hoàn nước mềm trên nền đá bazan nguyên khối. 
            Độ ồn tĩnh âm dưới 16 dBA kết hợp cụm phun sương siêu âm nano thanh lọc bụi mịn, tỏa ion âm tái tạo sinh khí tại sảnh đệm và giếng trời dinh thự với mã tư vấn độc quyền <span className="font-mono text-emerald-300">GU-BONSAI-2026-X</span>.
          </p>
        </div>

        {/* Interactive Bonsai Water Feature Cockpit */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 cols: Bonsai Silhouette Visualizer & Waterfall Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                      Thế Bonsai Phong Thủy Đang Chọn
                    </span>
                    <h3 className="mt-1 font-serif text-xl sm:text-2xl text-stone-100">
                      {activeBonsai.name} — <span className="text-amber-300/90 font-light">{activeBonsai.sinoVietnamese}</span>
                    </h3>
                  </div>

                  {/* Acoustic & Water Metrics */}
                  <div className="flex items-center gap-2 rounded-full border border-stone-700 bg-stone-950/90 px-3 py-1 text-xs text-stone-300">
                    <span className="font-mono text-emerald-400" dangerouslySetInnerHTML={{ __html: currentFlow.soundDba }} />
                    <span>|</span>
                    <span className="font-mono text-cyan-400">{currentFlow.rate}</span>
                    <span>|</span>
                    <span className="font-mono text-amber-300">{mistDensity}% Sương Nano</span>
                  </div>
                </div>

                {/* 3D Bonsai Silhouette & Water Stream Visualizer */}
                <div className="relative mt-6 h-80 sm:h-96 w-full overflow-hidden rounded-xl border border-emerald-900/50 bg-[#101413] p-5 flex flex-col justify-between shadow-[inset_0_0_80px_rgba(0,0,0,0.8)]">
                  {/* Subtle ultrasonic mist overlay */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-44 transition-opacity duration-700"
                    style={{
                      opacity: mistDensity / 100,
                      background: 'radial-gradient(ellipse 90% 70% at 50% 100%, rgba(255,255,255,0.18), rgba(16,185,129,0.08), transparent 80%)',
                    }}
                  />

                  {/* Top info badge */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <span className="rounded-md border border-amber-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-amber-300">
                      {activeBonsai.bronzePatina}
                    </span>
                    <span className="rounded-md border border-cyan-500/40 bg-stone-950/80 px-2.5 py-1 font-mono text-cyan-300">
                      NƯỚC MỀM TUẦN HOÀN LỌC CÁT THẠCH ANH
                    </span>
                  </div>

                  {/* Stylized SVG Bonsai Silhouette Center */}
                  <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                    <svg className="h-44 w-60 drop-shadow-[0_0_25px_rgba(16,185,129,0.25)]" viewBox="0 0 300 200" fill="none">
                      {/* Basalt Rock Basin at Base */}
                      <path
                        d="M50,170 C70,155 120,150 200,150 C260,150 280,165 270,185 C250,195 100,195 50,170 Z"
                        fill="#1c1917"
                        stroke="#44403c"
                        strokeWidth="2"
                      />
                      {/* Water cascade stream dropping from rock */}
                      <path
                        d="M170,140 C172,155 168,170 170,185"
                        stroke="#38bdf8"
                        strokeWidth={flowRate === 'gentle' ? '1.5' : flowRate === 'stream' ? '3' : '5'}
                        strokeDasharray="4 2"
                        className="animate-pulse"
                      />
                      <path
                        d="M185,145 C186,160 184,175 185,188"
                        stroke="#7dd3fc"
                        strokeWidth={flowRate === 'cascade' ? '2.5' : '1'}
                        strokeDasharray="3 3"
                        className="animate-pulse delay-100"
                      />

                      {/* Trunk based on Style */}
                      {selectedBonsai === 'truc' && (
                        <g>
                          {/* Straight upright powerful trunk */}
                          <path
                            d="M150,150 C148,110 152,70 150,20 C146,20 142,70 140,150 Z"
                            fill="#78350f"
                            stroke="#b45309"
                            strokeWidth="1.5"
                          />
                          {/* Horizontal tiered pine needle pads */}
                          <ellipse cx="150" cy="25" rx="35" ry="12" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="120" cy="65" rx="42" ry="14" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="185" cy="85" rx="46" ry="15" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="110" cy="115" rx="50" ry="16" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="195" cy="130" rx="55" ry="18" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                        </g>
                      )}

                      {selectedBonsai === 'huyen' && (
                        <g>
                          {/* Cascading cascading down-bending trunk */}
                          <path
                            d="M150,150 C155,100 135,70 120,60 C90,50 60,80 50,120 C40,155 35,180 30,195"
                            fill="none"
                            stroke="#78350f"
                            strokeWidth="10"
                            strokeLinecap="round"
                          />
                          <ellipse cx="120" cy="55" rx="36" ry="13" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="75" cy="85" rx="38" ry="14" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="45" cy="130" rx="40" ry="15" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="30" cy="180" rx="42" ry="16" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                        </g>
                      )}

                      {selectedBonsai === 'hoanh' && (
                        <g>
                          {/* Slanting sweeping trunk */}
                          <path
                            d="M140,150 C150,120 180,90 220,70 C245,60 265,55 280,45"
                            fill="none"
                            stroke="#78350f"
                            strokeWidth="9"
                            strokeLinecap="round"
                          />
                          <ellipse cx="150" cy="100" rx="38" ry="14" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="205" cy="75" rx="45" ry="16" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="260" cy="50" rx="42" ry="15" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                          <ellipse cx="115" cy="125" rx="35" ry="13" fill="#065f46" stroke="#059669" strokeWidth="1.5" />
                        </g>
                      )}
                    </svg>

                    {/* Ripples at base */}
                    <div className="mt-1 flex items-center justify-center gap-1.5 opacity-70">
                      <span className="h-1.5 w-16 rounded-full bg-cyan-400/40 animate-pulse" />
                      <span className="h-1 w-24 rounded-full bg-cyan-300/30 animate-pulse delay-100" />
                      <span className="h-1.5 w-12 rounded-full bg-cyan-400/40 animate-pulse delay-200" />
                    </div>
                  </div>

                  {/* Bottom metrics on visualizer */}
                  <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 text-xs">
                    <div className="rounded-lg border border-stone-800 bg-stone-950/85 p-2 backdrop-blur-sm max-w-sm">
                      <div className="text-[10px] text-stone-400 uppercase font-mono">Ý Nghĩa Phong Thủy:</div>
                      <div className="text-stone-200 font-serif text-xs mt-0.5">
                        {activeBonsai.meaning}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-stone-400 font-mono">Vị Trí Đắc Địa:</div>
                      <div className="text-xs font-serif text-emerald-300 font-medium max-w-[220px]">
                        {activeBonsai.fengShuiPlacement}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bonsai Style Selector Buttons */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  {(Object.keys(BONSAI_STYLES) as BonsaiStyle[]).map((styleKey) => {
                    const style = BONSAI_STYLES[styleKey]
                    const isSelected = selectedBonsai === styleKey
                    return (
                      <button
                        key={styleKey}
                        type="button"
                        onClick={() => setSelectedBonsai(styleKey)}
                        className={cn(
                          'flex-1 min-w-[120px] rounded-lg border px-3 py-2 text-left transition-all',
                          isSelected
                            ? 'border-emerald-500 bg-emerald-950/60 text-emerald-200 shadow-md'
                            : 'border-stone-800 bg-stone-900/40 text-stone-400 hover:text-stone-200'
                        )}
                      >
                        <div className="font-mono text-xs text-emerald-400 font-semibold">{style.name}</div>
                        <div className="font-serif text-xs truncate mt-0.5">{style.sinoVietnamese}</div>
                      </button>
                    )
                  })}
                </div>

                {/* Flow Rate & Audio Trigger Bar */}
                <div className="mt-4 pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-400">Lưu Lượng Thác Nước:</span>
                    {(Object.keys(FLOW_RATES) as FlowRateLevel[]).map((levelKey) => (
                      <button
                        key={levelKey}
                        type="button"
                        onClick={() => setFlowRate(levelKey)}
                        className={cn(
                          'rounded-md px-2.5 py-1 font-mono transition-all',
                          flowRate === levelKey
                            ? 'border border-cyan-400 bg-cyan-950 text-cyan-200'
                            : 'border border-stone-800 bg-stone-900/60 text-stone-400'
                        )}
                      >
                        {FLOW_RATES[levelKey].rate}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={toggleWaterSound}
                    className={cn(
                      'rounded-lg border px-3 py-1 font-mono text-xs transition-all',
                      isSoundPlaying
                        ? 'border-cyan-400 bg-cyan-950 text-cyan-200 animate-pulse'
                        : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-cyan-400'
                    )}
                  >
                    {isSoundPlaying ? '🔊 Đang Phát Tiếng Suối (5s)' : '🔇 Nghe m Thác Nước'}
                  </button>
                </div>
              </div>

              {/* Craft Stone & Bronze Note */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-stone-950/60 p-4 text-xs text-stone-400 leading-relaxed">
                <span className="font-serif text-emerald-300 font-medium">Kỹ Nghệ Điêu Khắc Đá Bazan Nguyên Khối: </span>
                Bể chứa nước được đục thủ công từ khối đá núi lửa bazan đen tuyển chọn từ vùng mỏ đá Gia Lai, giữ trọn vẹn lớp da đá phong sương tự nhiên, kết hợp cây Tùng La Hán đúc đồng đặc tinh xảo từng vân vỏ cây.
              </div>
            </div>

            {/* Right 5 cols: Ultrasonic Mist Controller, Feng Shui Specs & Consultation Form */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Ultrasonic Mist & Ionization Panel */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-5">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                      Cụm Phun Sương Siêu m &amp; Ion m
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">Khử Bụi PM2.5</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span>Mật Độ Sương Khói Nano:</span>
                    <span className="font-mono text-cyan-400 font-semibold">{mistDensity}% Mật Độ</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mistDensity}
                    onChange={(e) => setMistDensity(Number(e.target.value))}
                    aria-label="Điều chỉnh mật độ sương khói nano tiểu cảnh"
                    className="mt-2 w-full accent-cyan-500 h-1 bg-stone-800 rounded-lg cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-stone-500 font-mono">
                    <span>0% (Tĩnh Khô)</span>
                    <span>50% (Sương Mỏng Rừng Mai)</span>
                    <span>100% (Mờ Ảo Tiên Cảnh)</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-center">
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Độ Ồn Vận Hành</span>
                    <div className="mt-1 font-mono text-base text-emerald-400 font-semibold" dangerouslySetInnerHTML={{ __html: currentFlow.soundDba }} />
                    <span className="text-[9px] text-stone-500">Bơm tĩnh âm từ tính</span>
                  </div>
                  <div className="rounded-lg border border-stone-800/60 bg-stone-900/50 p-2.5">
                    <span className="text-[10px] uppercase font-mono text-stone-400">Mật Độ Ion m</span>
                    <div className="mt-1 font-mono text-base text-cyan-300 font-semibold">120.000 /cm³</div>
                    <span className="text-[9px] text-stone-500">Tương đương rừng già</span>
                  </div>
                </div>
              </div>

              {/* Consultation Form with VIP Code */}
              <div className="rounded-xl border border-emerald-900/60 bg-stone-950/90 p-5 shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                  <h4 className="font-serif text-sm text-stone-200 font-medium">
                    Tư Vấn May Đo Tiểu Cảnh Phong Thủy
                  </h4>
                  <span className="font-mono text-xs text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-500/40">
                    VIP: GU-BONSAI-2026-X
                  </span>
                </div>

                {isSubmitted ? (
                  <div className="mt-4 rounded-lg bg-emerald-950/40 border border-emerald-500/40 p-4 text-center">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-2">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                    <p className="font-serif text-emerald-200 text-sm">
                      Đã ghi nhận yêu cầu tư vấn phong thủy dinh thự.
                    </p>
                    <p className="mt-1 text-xs text-stone-400">
                      KTS GuHomes sẽ liên hệ gửi bản vẽ vị trí đặt thác nước và phối cảnh 3D trong 24 giờ làm việc.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1">
                        Hướng Nhà / Ban Công Dự Kiến Đặt:
                      </label>
                      <select
                        value={houseDirection}
                        onChange={(e) => setHouseDirection(e.target.value)}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 focus:border-emerald-500 focus:outline-none"
                      >
                        <option value="dong-nam">Hướng Đông Nam (Đón gió sông Sài Gòn &amp; Tài Khí)</option>
                        <option value="tay-bac">Hướng Tây Bắc (Trấn trạch bình an &amp; Quý Nhân Phù Trợ)</option>
                        <option value="chinh-nam">Hướng Chính Nam (Quang minh chính đại &amp; Danh Vọng)</option>
                        <option value="chinh-bac">Hướng Chính Bắc (Thủy khí quy tụ &amp; Sự Nghiệp Vững Bền)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-stone-400 block mb-1">
                        Số Điện Thoại / Zalo Gia Chủ:
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx xxx xxx"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full rounded-lg border border-stone-800 bg-stone-900 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-emerald-500 focus:outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500/40 bg-gradient-to-r from-emerald-800 to-emerald-600 px-4 py-2.5 text-xs font-medium text-emerald-100 hover:from-emerald-700 hover:to-emerald-500 transition-all shadow-md"
                    >
                      <span>Gửi Bản Yêu Cầu May Đo (Mã GU-BONSAI-2026-X)</span>
                      <ArrowUpRightIcon className="h-4 w-4" />
                    </button>
                  </form>
                )}

                <div className="mt-3 text-[10px] text-stone-500 text-center">
                  Quy cách {activeBonsai.dimensions}.
                </div>
              </div>

              {/* Consultation Link Button */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/contact?service=bronze-bonsai-water-feature"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-gradient-to-r from-amber-800 to-amber-600 px-5 py-3 text-xs sm:text-sm font-medium text-amber-100 hover:from-amber-700 hover:to-amber-500 transition-all shadow-lg shadow-amber-950/50"
                >
                  <span>Liên Hệ Xưởng Điêu Khắc GuHomes</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-amber-200" />
                </Link>
                <div className="text-[11px] text-stone-400 text-center sm:text-left">
                  Chế tác thủ công độc bản tại xưởng Thạnh Xuân, Q.12.
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
