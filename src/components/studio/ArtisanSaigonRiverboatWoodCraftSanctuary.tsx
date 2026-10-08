'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type BoatTimber = 'sao-cat' | 'dau-rai' | 'chai-da'

interface TimberProfile {
  id: BoatTimber
  name: string
  originEra: string
  grainTone: string
  hardnessBrinell: string
  carbonAge: string
  resinTreatment: string
  description: string
  accentColor: string
}

const TIMBER_PROFILES: Record<BoatTimber, TimberProfile> = {
  'sao-cat': {
    id: 'sao-cat',
    name: 'Gỗ Sao Cát Ghe Bầu Thương Cảng 1875',
    originEra: 'Thuyền buôn lúa gạo Bến Nghé - Rạch Bến Nghé',
    grainTone: 'Vàng nâu sẫm trầm mặc với vân sóng nước',
    hardnessBrinell: '4.6 HB (Chịu lực tì nén cực cao)',
    carbonAge: '148 năm tuổi ngậm muối mặn',
    resinTreatment: '3 lớp dầu rái nguyên chất giữ nguyên vết hà biển rỗ mộc',
    description: 'Phiến gỗ Sao Cát chịu mặn hàng trăm năm dọc sông Tiền và sông Sài Gòn. Từng hốc rỗ tự nhiên do hà biển tạo tác được các nghệ nhân GuHomes chải sợi đồng và giữ nguyên mộc tích, tạo nên nét đẹp thời gian không thể sao chép.',
    accentColor: 'from-amber-800/30 to-amber-950/10',
  },
  'dau-rai': {
    id: 'dau-rai',
    name: 'Gỗ Dầu Rái Mạn Thuyền Cổ 1890',
    originEra: 'Ghe chài chở gốm sứ Cây Mai xuôi dòng Gia Định',
    grainTone: 'Đỏ cánh gián óng ánh thớ gỗ dầu tự nhiên',
    hardnessBrinell: '4.4 HB (Dẻo dai chống nứt toác)',
    carbonAge: '135 năm phong hóa sông nước',
    resinTreatment: 'Ủ tinh dầu rái rừng Đông Nam Bộ thơm dịu',
    description: 'Chất gỗ Dầu Rái đượm dầu tự nhiên, tự sinh ra lớp màng bảo vệ chống mối mọt vĩnh viễn trong khí hậu nóng ẩm Sài Gòn. Khi chạm tay vào mặt bàn trà, gia chủ cảm nhận được làn hương rừng nhiệt đới thoang thoảng ấm áp.',
    accentColor: 'from-orange-800/30 to-rose-950/10',
  },
  'chai-da': {
    id: 'chai-da',
    name: 'Gỗ Chai Đá Khung Sườn Ghe Đục 1910',
    originEra: 'Khung sống ghe bầu vận tải duyên hải Nam Trung Bộ',
    grainTone: 'Nâu đen trầm mặc như đá núi bazan',
    hardnessBrinell: '4.9 HB (Độ cứng tựa kim loại)',
    carbonAge: '115 năm dầm mình dưới ngấn nước',
    resinTreatment: 'Giữ nguyên đinh tán đồng đỏ đập tay tán mờ',
    description: 'Phần khung xương chịu lực vĩ đại của con thuyền, nơi hội tụ những cây đinh tán bằng đồng đỏ rèn thủ công. Dưới bàn tay nghệ nhân GuHomes, phiến gỗ trở thành một tác phẩm điêu khắc nội thất sống mãi cùng dinh thự.',
    accentColor: 'from-stone-700/30 to-stone-900/10',
  },
}

export function ArtisanSaigonRiverboatWoodCraftSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedTimber, setSelectedTimber] = useState<BoatTimber>('sao-cat')
  const [tableLength, setTableLength] = useState<number>(4.2) // 3.2m - 5.5m
  const [isPlayingWaterWaves, setIsPlayingWaterWaves] = useState(false)
  const [inquirySuccess, setInquirySuccess] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const waveIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }

  // Synthesize soft river waves lapping against antique boat timber & gentle wooden oar click
  function playRiverLap() {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // 1. Water wash low-mid swell (pink-filtered noise / multi-sine blend)
    const waveOsc = ctx.createOscillator()
    const waveGain = ctx.createGain()
    waveOsc.type = 'triangle'
    waveOsc.frequency.setValueAtTime(80, now)
    waveOsc.frequency.linearRampToValueAtTime(140, now + 0.8)
    waveOsc.frequency.exponentialRampToValueAtTime(60, now + 1.8)

    waveGain.gain.setValueAtTime(0.0001, now)
    waveGain.gain.linearRampToValueAtTime(0.15, now + 0.6)
    waveGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0)

    waveOsc.connect(waveGain)
    waveGain.connect(ctx.destination)
    waveOsc.start(now)
    waveOsc.stop(now + 2.2)

    // 2. Subtle wooden hull creak
    const woodOsc = ctx.createOscillator()
    const woodGain = ctx.createGain()
    woodOsc.type = 'sawtooth'
    woodOsc.frequency.setValueAtTime(180, now + 0.4)
    woodOsc.frequency.linearRampToValueAtTime(160, now + 0.9)

    woodGain.gain.setValueAtTime(0.0001, now + 0.4)
    woodGain.gain.linearRampToValueAtTime(0.03, now + 0.5)
    woodGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1)

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(220, now)
    bandpass.Q.setValueAtTime(5, now)

    woodOsc.connect(woodGain)
    woodGain.connect(bandpass)
    bandpass.connect(ctx.destination)

    woodOsc.start(now + 0.4)
    woodOsc.stop(now + 1.2)
  }

  function toggleRiverSound() {
    if (isPlayingWaterWaves) {
      if (waveIntervalRef.current) {
        clearInterval(waveIntervalRef.current)
        waveIntervalRef.current = null
      }
      setIsPlayingWaterWaves(false)
    } else {
      setIsPlayingWaterWaves(true)
      playRiverLap()
      waveIntervalRef.current = setInterval(() => {
        playRiverLap()
      }, 2400 + Math.random() * 800)
    }
  }

  const currentTimber = TIMBER_PROFILES[selectedTimber]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Không Gian Nghệ Thuật Gỗ Thuyền Cổ Sông Sài Gòn GuHomes"
    >
      {/* Background Ambience Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-1000',
          currentTimber.accentColor
        )}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-stone-700/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/70 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 shadow-sm shadow-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
              Saigon Heritage Riverboat · Gỗ Sao & Dầu Rái Trăm Năm
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>Tuổi Carbon: &gt; 120 Năm</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Độ Cứng: 4.6 HB</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Đinh Tán Đồng Đỏ Mộc</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl md:text-5xl">
              Không Gian Nghệ Thuật Gỗ Thuyền Cổ Sài Gòn
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Bảo Tồn Vết Hằn Sóng Nước Ghe Bầu Bến Nghé & Dầu Rái Kháng Ẩm Nhiệt Đới
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Ký ức thương cảng Bến Nghé - Sài Gòn thế kỷ 19 được hồi sinh trong hình hài những phiến bàn trà mộc 4.2m
              nguyên khối. Từng thân gỗ Sao Cát, gỗ Dầu Rái tháo dỡ từ những con thuyền buôn cổ được nghệ nhân xưởng
              Thạnh Xuân xử lý khử muối mặn, giữ nguyên vết hà biển ăn rỗ tự nhiên và hàng đinh tán đồng đỏ đập tay.
              Bề mặt được quét 3 lớp dầu rái nguyên chất, tạo chiều sâu xúc giác mộc mạc và chống mối mọt trọn đời.
            </p>
          </div>

          {/* Sound Trigger */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-stone-800 bg-black/50 p-5 backdrop-blur-md lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Âm vang dòng sông ký ức
              </span>
              <h4 className="mt-1 font-serif text-sm text-stone-200">
                Sóng Vỗ Mạn Thuyền Gỗ Cổ
              </h4>
              <p className="mt-1 text-xs text-stone-400">
                Lắng nghe tiếng nước sông Sài Gòn vỗ nhè nhẹ vào mạn thuyền gỗ cổ và tiếng cọt kẹt của thớ gỗ trăm tuổi.
              </p>
            </div>
            <button
              onClick={toggleRiverSound}
              className={cn(
                'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all',
                isPlayingWaterWaves
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingWaterWaves ? 'Đang Ngân Vang Tiếng Sóng... (Dừng)' : 'Nghe Tiếng Sóng Vỗ Mạn Thuyền'}
            </button>
          </div>
        </div>

        {/* Timber Selector & Surface Details */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/60 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Tuyển chọn chất gỗ thuyền cổ
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Ba Dòng Gỗ Thuyền Sông Nước Nam Bộ
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(TIMBER_PROFILES) as BoatTimber[]).map((key) => {
                const item = TIMBER_PROFILES[key]
                const isActive = selectedTimber === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedTimber(key)}
                    className={cn(
                      'min-h-[44px] rounded-lg px-3.5 py-2 text-xs font-medium transition-all',
                      isActive
                        ? 'bg-amber-600 text-stone-950 font-semibold shadow-xs'
                        : 'bg-stone-800/60 text-stone-300 hover:text-stone-100 hover:bg-stone-800'
                    )}
                  >
                    {item.name.split(' ')[1]} {item.name.split(' ')[2]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Selected Timber Details */}
          <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <span className="font-mono text-xs text-amber-400 block">{currentTimber.originEra}</span>
              <h4 className="mt-2 font-serif text-2xl text-stone-100">{currentTimber.name}</h4>
              <p className="mt-1 font-mono text-xs text-stone-400">{currentTimber.grainTone}</p>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">{currentTimber.description}</p>
              <div className="mt-4 rounded-xl border border-stone-800 bg-black/40 p-3">
                <span className="font-mono text-[11px] text-stone-400 block">Quy trình dưỡng gỗ vi khí hậu:</span>
                <span className="text-xs text-amber-200/90 font-medium">{currentTimber.resinTreatment}</span>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-5">
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Niên Đại Carbon Cổ Thụ</span>
                <span className="mt-1 text-2xl font-light font-serif text-amber-300">{currentTimber.carbonAge}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Không thể tái sinh</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Độ Cứng Thớ Gỗ Brinell</span>
                <span className="mt-1 text-2xl font-light font-serif text-emerald-400">{currentTimber.hardnessBrinell}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Không trầy xước bề mặt</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Hệ Số Co Ngót Vi Khí Hậu</span>
                <span className="mt-1 text-2xl font-light font-serif text-cyan-300">&lt; 0.15%</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Tuyệt đối ổn định qua mùa mưa</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Kháng Ẩm & Mối Mọt Tự Nhiên</span>
                <span className="mt-1 text-2xl font-light font-serif text-stone-200">100% Tự Nhiên</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Không dùng hóa chất công nghiệp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Length Customizer */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/60 p-6 md:p-8">
          <div className="border-b border-stone-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              May đo quy cách bàn trà nguyên tấm
            </span>
            <h3 className="font-serif text-xl text-stone-100">
              Chiều Dài Bàn Trà Gỗ Thuyền Cổ: {tableLength.toFixed(1)} Mét
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Tùy chỉnh chiều dài phiến gỗ phù hợp với không gian phòng khách hoặc phòng trà biệt thự ven sông.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <input
              type="range"
              min="3.0"
              max="5.5"
              step="0.1"
              value={tableLength}
              onChange={(e) => setTableLength(Number(e.target.value))}
              className="accent-amber-500 cursor-pointer w-full"
            />
            <div className="flex justify-between text-xs font-mono text-stone-400">
              <span>3.0m (Phòng trà 8 khách)</span>
              <span>4.2m (Đại sảnh biệt thự 12 khách)</span>
              <span>5.5m (Dinh thự ven sông 16 khách)</span>
            </div>
          </div>
        </div>

        {/* 3 Craft Principles */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">I</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Bảo Tồn Vết Hà Biển & Muối Mặn</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Khác với gỗ công nghiệp phẳng lì vô hồn, từng hốc rỗ tự nhiên do hà biển ăn sâu vào thớ gỗ được
              làm sạch bằng chổi đồng thủ công, lưu giữ dấu ấn sóng gió trăm năm như một tác phẩm điêu khắc trừu tượng.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">II</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Đinh Tán Đồng Đỏ Đập Tay Rèn Mộc</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Những chiếc đinh đồng đỏ rèn búa tay từng liên kết các ván thuyền được giữ nguyên vị trí,
              tán mờ và bảo dưỡng chống oxy hóa, trở thành điểm nhấn kim loại ấm áp trên nền gỗ thẫm màu.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">III</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Dầu Rái Tự Nhiên Thẩm Thấu Sâu</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Nhựa dầu rái chiết xuất tự nhiên từ cây rừng nhiệt đới thẩm thấu sâu vào từng mạch gỗ,
              khóa ẩm và tôn vinh sắc nâu hổ phách trầm ấm mà không để lại lớp màng bóng nhựa nhân tạo.
            </p>
          </div>
        </div>

        {/* Custom Order Form */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-gradient-to-r from-amber-950/30 via-stone-900 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Sở hữu tác phẩm lịch sử độc bản
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Đặt Tuyển Chọn Phiến Gỗ Thuyền Cổ Cho Biệt Thự Của Bạn
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Mỗi phiến gỗ xuất xưởng đều có hồ sơ truy xuất nguồn gốc con thuyền và chứng nhận tuổi thọ carbon.
                KTS GuHomes trực tiếp thiết kế chân đế kim loại theo phong cách riêng của từng gia chủ.
              </p>
            </div>

            <div className="lg:col-span-5">
              {inquirySuccess ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-emerald-200">
                    Đã ghi nhận yêu cầu đặt phiến gỗ thuyền cổ
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    KTS Trưởng GuHomes sẽ liên hệ gửi danh mục hình ảnh các phiến gỗ hiện có tại xưởng.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setInquirySuccess(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-boat-phone`} className="sr-only">
                    Số điện thoại và chiều dài mong muốn
                  </label>
                  <input
                    id={`${formId}-boat-phone`}
                    type="text"
                    required
                    placeholder="Số điện thoại / Chiều dài bàn trà mong muốn..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Xem Danh Mục Phiến Gỗ Thuyền Cổ</span>
                    <ArrowUpRightIcon className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
