'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type WaterFlowMode = 'thin-film' | 'brook-ripple' | 'zen-crest'

interface FlowSetting {
  id: WaterFlowMode
  name: string
  thickness: string
  soundLevel: string
  coolingEffect: string
  character: string
  accentGradient: string
}

const FLOW_SETTINGS: Record<WaterFlowMode, FlowSetting> = {
  'thin-film': {
    id: 'thin-film',
    name: 'Màng Nước Tĩnh Gương Soi (0.5mm)',
    thickness: '0.5mm Màng mỏng vi mô không bắn giọt',
    soundLevel: '14 dBA Êm như hơi thở',
    coolingEffect: '-2.5°C Bốc hơi đối lưu nhẹ',
    character: 'Mặt nước phẳng lặng như gương soi bầu trời giếng trời, tạo ảo giác khối đá hoa cương vàng nguyên khối như đang tan chảy mềm mại.',
    accentGradient: 'from-amber-600/20 to-yellow-950/10',
  },
  'brook-ripple': {
    id: 'brook-ripple',
    name: 'Róc Rách Suối Ngàn Ba Tầng Gờ Đá',
    thickness: '1.2mm Dòng chảy uốn lượn qua gờ CNC',
    soundLevel: '18 dBA Tiếng suối reo thanh khiết',
    coolingEffect: '-3.2°C Hạ nhiệt tối ưu',
    character: 'Nước róc rách qua các rãnh soi vi mô được cắt bằng tia nước Waterjet, tái hiện tiếng suối reo giữa núi rừng nhiệt đới.',
    accentGradient: 'from-amber-700/25 to-stone-900/10',
  },
  'zen-crest': {
    id: 'zen-crest',
    name: 'Tràn Đỉnh Thiền Tịnh Bọt Khí Nano',
    thickness: '0.8mm Bọt khí sủi từ tâm đá',
    soundLevel: '16 dBA Âm thanh trầm ấm',
    coolingEffect: '-2.8°C Cấp ẩm dịu nhẹ',
    character: 'Luồng bọt khí nano siêu mịn sủi nhẹ từ họng đồng tâm khối đá, tràn đều ra 4 hướng tạo nên năng lượng phong thủy tuần hoàn vượng khí.',
    accentGradient: 'from-yellow-600/20 to-amber-950/10',
  },
}

export function ArtisanSaigonMonolithicGraniteWaterFeatureSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [flowMode, setFlowMode] = useState<WaterFlowMode>('thin-film')
  const [pumpSpeed, setPumpSpeed] = useState<number>(45) // 20% - 100%
  const [isPlayingWaterSound, setIsPlayingWaterSound] = useState(false)
  const [consultSent, setConsultSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const waterLoopRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (waterLoopRef.current) clearInterval(waterLoopRef.current)
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

  // Synthesize smooth stone water flow sound (filtered pink noise / multi-oscillator wash)
  function playWaterFeatureGurgle() {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // Water ripple over granite
    const waterOsc = ctx.createOscillator()
    const waterGain = ctx.createGain()
    waterOsc.type = 'triangle'
    const baseFreq = flowMode === 'brook-ripple' ? 420 : flowMode === 'zen-crest' ? 320 : 220
    waterOsc.frequency.setValueAtTime(baseFreq + Math.random() * 60, now)
    waterOsc.frequency.linearRampToValueAtTime(baseFreq - 30, now + 0.3)

    waterGain.gain.setValueAtTime(0.0001, now)
    waterGain.gain.linearRampToValueAtTime(0.12, now + 0.05)
    waterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(baseFreq + 100, now)
    bandpass.Q.setValueAtTime(3.5, now)

    waterOsc.connect(waterGain)
    waterGain.connect(bandpass)
    bandpass.connect(ctx.destination)

    waterOsc.start(now)
    waterOsc.stop(now + 0.4)
  }

  function toggleWaterAmbience() {
    if (isPlayingWaterSound) {
      if (waterLoopRef.current) {
        clearInterval(waterLoopRef.current)
        waterLoopRef.current = null
      }
      setIsPlayingWaterSound(false)
    } else {
      setIsPlayingWaterSound(true)
      playWaterFeatureGurgle()
      waterLoopRef.current = setInterval(() => {
        playWaterFeatureGurgle()
      }, 250 + Math.random() * 200)
    }
  }

  const currentFlow = FLOW_SETTINGS[flowMode]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Đài Nước Đá Hoa Cương Nguyên Khối Bình Định GuHomes"
    >
      {/* Background Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-1000',
          currentFlow.accentGradient
        )}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-yellow-600/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/70 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-500 shadow-sm shadow-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
              Saigon Monolithic Water Feature · Đá Hoa Cương Vàng Phù Cát 850kg
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>Màng Nước Mỏng 0.8mm</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Âm Thanh &lt; 18 dBA</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Hạ Nhiệt -3.0°C Tự Nhiên</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl md:text-5xl">
              Đài Nước Hoa Cương Nguyên Khối
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Đá Vàng Phù Cát Bình Định 850kg, Màng Nước Tràn Không Bắn & Bơm Biến Tần Siêu Êm
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Điểm nhấn tĩnh tâm vĩ đại đặt tại sảnh thông tầng hoặc giếng trời biệt thự.
              Từ một khối đá hoa cương vàng nguyên khối nặng 850kg khai thác tại mỏ Phù Cát - Bình Định, các nghệ nhân
              ứng dụng công nghệ cắt tia nước Waterjet gia công rãnh tràn vi mô chuẩn xác đến từng phần mười milimet.
              Màng nước tràn mỏng đều 0.8mm ôm trọn bề mặt đá mà tuyệt đối không văng bắn một giọt nước ra sàn gỗ xung quanh,
              mang lại âm thanh róc rách trong trẻo 18 dBA thanh lọc mọi tạp âm của phố thị Sài Gòn.
            </p>
          </div>

          {/* Sound Control */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-stone-800 bg-black/50 p-5 backdrop-blur-md lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Thính giác học nước tràn đá mộc
              </span>
              <h4 className="mt-1 font-serif text-sm text-stone-200">
                Tiếng Nước Tràn Khối Đá Hoa Cương
              </h4>
              <p className="mt-1 text-xs text-stone-400">
                Cảm nhận sự tĩnh tại qua tiếng nước vi mô róc rách thanh lọc tâm trí.
              </p>
            </div>
            <button
              onClick={toggleWaterAmbience}
              className={cn(
                'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all',
                isPlayingWaterSound
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingWaterSound ? 'Đang Róc Rách Dòng Chảy... (Dừng)' : 'Bật Âm Thanh Nước Tràn Đá'}
            </button>
          </div>
        </div>

        {/* 3 Flow Modes Selector */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/60 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Chế độ dòng chảy vi mô
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Ba Kịch Bản Nước Tràn Tùy Biến
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(FLOW_SETTINGS) as WaterFlowMode[]).map((key) => {
                const item = FLOW_SETTINGS[key]
                const isActive = flowMode === key
                return (
                  <button
                    key={key}
                    onClick={() => setFlowMode(key)}
                    className={cn(
                      'min-h-[44px] rounded-lg px-3.5 py-2 text-xs font-medium transition-all',
                      isActive
                        ? 'bg-amber-600 text-stone-950 font-semibold shadow-xs'
                        : 'bg-stone-800/60 text-stone-300 hover:text-stone-100 hover:bg-stone-800'
                    )}
                  >
                    {item.name.split(' ')[0]} {item.name.split(' ')[1]} {item.name.split(' ')[2]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mode Details Card */}
          <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <span className="font-mono text-xs text-amber-400 block">{currentFlow.thickness}</span>
              <h4 className="mt-2 font-serif text-2xl text-stone-100">{currentFlow.name}</h4>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">{currentFlow.character}</p>

              {/* Pump Inverter Speed Slider */}
              <div className="mt-6 rounded-xl border border-stone-800 bg-black/40 p-4">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-300">Công suất bơm biến tần DC Inverter:</span>
                  <span className="text-amber-400 font-semibold">{pumpSpeed}% Lưu lượng</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={pumpSpeed}
                  onChange={(e) => setPumpSpeed(Number(e.target.value))}
                  className="mt-2 w-full accent-amber-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
                  <span>20% (Êm 12 dBA)</span>
                  <span>45% (Chuẩn mực 16 dBA)</span>
                  <span>100% (Mạnh mẽ 22 dBA)</span>
                </div>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-5">
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Độ Ồn Nền Bơm & Nước</span>
                <span className="mt-1 text-2xl font-light font-serif text-amber-300">{currentFlow.soundLevel}</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Không nghe thấy tiếng mô tơ</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Hiệu Năng Hạ Nhiệt Không Gian</span>
                <span className="mt-1 text-2xl font-light font-serif text-emerald-400">{currentFlow.coolingEffect}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Làm mát tự nhiên khu vực sảnh</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Trọng Lượng Khối Đá Mộc</span>
                <span className="mt-1 text-2xl font-light font-serif text-stone-200">850 Kilogram</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Đá vàng Bình Định nguyên khối</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Hệ Lọc Ngầm Tuần Hoàn</span>
                <span className="mt-1 text-2xl font-light font-serif text-cyan-300">5 Cấp Lọc Khoáng</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Thạch anh & than hoạt tính</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Engineering Pillars */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">I</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Rãnh Tràn Nước Vi Mô Cắt Waterjet</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Công nghệ cắt tia nước áp lực 4.000 bar tạo rãnh thoát nước nghiêng 3° quanh mép đá hoa cương,
              giữ sức căng bề mặt chất lỏng tuyệt đối, nước bám sát thân đá trôi xuống rãnh sỏi không văng ra ngoài.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">II</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Bơm Biến Tần Không Chổi Than DC</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Động cơ nam châm vĩnh cửu điều khiển bằng vi xử lý sóng sin 3 pha, độ rung chấn gần như bằng không
              và độ ồn cơ khí dưới 12 dBA, đặt gọn trong hộc ngầm cách âm đa tầng.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">III</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Bể Lọc Thạch Anh & Khử Khuẩn UV</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Nước tuần hoàn khép kín qua bể ngầm chứa sỏi thạch anh tự nhiên và đèn cực tím UV diệt khuẩn,
              giữ nước trong vắt không sinh rêu tảo và không để lại cặn vôi bám trắng bề mặt đá hoa cương.
            </p>
          </div>
        </div>

        {/* Custom Order Form */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-gradient-to-r from-amber-950/30 via-stone-900 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Vật phẩm phong thủy vượng khí
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Tư Vấn Kiến Tạo Đài Nước Đá Hoa Cương Cho Biệt Thự
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                KTS GuHomes khảo sát kết cấu sàn chịu lực, hướng nước phong thủy và cung cấp trọn gói từ khâu
                chọn phôi đá tại mỏ Bình Định đến vận chuyển lắp đặt bằng cẩu chuyên dụng.
              </p>
            </div>

            <div className="lg:col-span-5">
              {consultSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-emerald-200">
                    Đã nhận yêu cầu tư vấn đài nước nguyên khối
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    KTS Trưởng chuyên trách đá mộc GuHomes sẽ liên hệ gửi bản vẽ 3D chi tiết.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setConsultSent(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-water-phone`} className="sr-only">
                    Số điện thoại và vị trí đặt đài nước
                  </label>
                  <input
                    id={`${formId}-water-phone`}
                    type="text"
                    required
                    placeholder="Số điện thoại / Vị trí đặt (Sảnh / Giếng trời)..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký Tư Vấn Đài Nước</span>
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
