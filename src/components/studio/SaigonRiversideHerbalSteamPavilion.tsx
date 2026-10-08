'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type SeasonTherapy = 'dry-cooling' | 'monsoon-warmth' | 'recovery'

interface TherapyOption {
  id: SeasonTherapy
  title: string
  season: string
  steamTemp: number // Celsius
  benchTemp: number // Celsius
  herbs: string
  benefits: string
  steamColor: string
}

const THERAPY_OPTIONS: Record<SeasonTherapy, TherapyOption> = {
  'dry-cooling': {
    id: 'dry-cooling',
    title: 'Hạ Nhiệt Mùa Nắng (Summer Detox)',
    season: 'Tháng 12 - Tháng 4 (Mùa Khô Sài Gòn)',
    steamTemp: 42,
    benchTemp: 37,
    herbs: 'Lá Bưởi Năm Roi, Bạc Hà Rừng, Vỏ Chanh, Hoa Cúc',
    benefits: 'Thanh nhiệt giải độc, thông thoáng lỗ chân lông, làm dịu căng thẳng nhiệt đới sau một ngày nắng gắt 38°C.',
    steamColor: 'from-emerald-600/30 via-stone-900 to-black',
  },
  'monsoon-warmth': {
    id: 'monsoon-warmth',
    season: 'Tháng 5 - Tháng 11 (Mùa Mưa Nhiệt Đới)',
    title: 'Ấm Phổi Mùa Mưa (Monsoon Lung Warming)',
    steamTemp: 46,
    benchTemp: 39,
    herbs: 'Ngải Cứu Tía, Gừng Gió Núi, Lá Lốt, Quế Khâu',
    benefits: 'Trục hàn khí, làm ấm phổi và đường hô hấp, phòng ngừa cảm mạo trong những chiều mưa dầm dề Sài Gòn.',
    steamColor: 'from-amber-600/30 via-stone-900 to-black',
  },
  recovery: {
    id: 'recovery',
    season: 'Quanh Năm (Sau Tập Luyện & Thể Thao)',
    title: 'Phục Hồi Thể Lực (Athletic Deep Recovery)',
    steamTemp: 48,
    benchTemp: 40,
    herbs: 'Sả Chanh Đắk Lắk, Khuynh Diệp, Hương Nhu, Bạch Đàn',
    benefits: 'Giãn cơ sâu, kích thích lưu thông tuần hoàn máu, giải phóng axit lactic và tái tạo năng lượng thể chất tức thì.',
    steamColor: 'from-purple-600/30 via-stone-900 to-black',
  },
}

export function SaigonRiversideHerbalSteamPavilion({ className }: { className?: string }) {
  const componentId = useId()

  const [activeTherapy, setActiveTherapy] = useState<SeasonTherapy>('monsoon-warmth')
  const [isSteamActive, setIsSteamActive] = useState<boolean>(true)
  const [isPlayingBoilingAudio, setIsPlayingBoilingAudio] = useState<boolean>(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null)

  const currentTherapy = THERAPY_OPTIONS[activeTherapy]

  const stopAudio = () => {
    if (bubbleTimerRef.current) {
      clearInterval(bubbleTimerRef.current)
      bubbleTimerRef.current = null
    }
    if (audioCtxRef.current) {
      try {
        void audioCtxRef.current.close()
      } catch {
        // Ignore
      }
      audioCtxRef.current = null
    }
    setIsPlayingBoilingAudio(false)
  }

  // Realistic herbal steam generator audio: Boiling water bubbles + gentle steam hissing
  const toggleBoilingAudio = () => {
    if (isPlayingBoilingAudio) {
      stopAudio()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx
      setIsPlayingBoilingAudio(true)

      // Continuous gentle steam hiss
      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.05
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      const hissFilter = ctx.createBiquadFilter()
      hissFilter.type = 'bandpass'
      hissFilter.frequency.setValueAtTime(3200, ctx.currentTime)
      hissFilter.Q.setValueAtTime(2.5, ctx.currentTime)

      const hissGain = ctx.createGain()
      hissGain.gain.setValueAtTime(0.001, ctx.currentTime)
      hissGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)

      whiteNoise.connect(hissFilter)
      hissFilter.connect(hissGain)
      hissGain.connect(ctx.destination)
      whiteNoise.start()

      // Bubbling water sound effects
      bubbleTimerRef.current = setInterval(() => {
        if (!audioCtxRef.current) return
        const c = audioCtxRef.current
        const osc = c.createOscillator()
        const g = c.createGain()

        osc.type = 'sine'
        const baseFreq = 300 + Math.random() * 250
        osc.frequency.setValueAtTime(baseFreq, c.currentTime)
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, c.currentTime + 0.04)

        g.gain.setValueAtTime(0.001, c.currentTime)
        g.gain.exponentialRampToValueAtTime(0.03, c.currentTime + 0.01)
        g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + 0.05)

        osc.connect(g)
        g.connect(c.destination)
        osc.start(c.currentTime)
        osc.stop(c.currentTime + 0.06)
      }, 220)
    } catch {
      setIsPlayingBoilingAudio(false)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  return (
    <section
      aria-labelledby={`heading-${componentId}`}
      className={cn('u-gutter py-16 md:py-24 transition-colors duration-700 bg-stone-950 text-stone-100', className)}
    >
      <div className="mx-auto max-w-[110rem] space-y-12">
        {/* Header Block */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-stone-800/80 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono tracking-wider uppercase text-purple-300">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              Hydrothermal Wellness Sanctuary • Calacatta Viola &amp; Nano Mist
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Phòng Xông Hơi Thảo Dược Đá Calacatta Viola &amp; Sương Mù Nano 3 Micron
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Không gian thanh lọc thân tâm thượng đỉnh. Vách ốp đá cẩm thạch Calacatta Viola Ý nguyên khối vân rượu vang tím sẫm không ron nối; nồi xông đồng đỏ nung nhiệt bằng điện trở gốm MCH bốc hơi sương mù nano 3 micron ở 46°C &amp; 100% RH với thảo mộc tươi rừng già, ghế đá sưởi ấm 38°C và thác nước khoáng lạnh 18°C.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=herbal-steam-pavilion"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-purple-500 text-stone-950 hover:bg-purple-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Thiết Kế Spa Gia Đình
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Steam Visual Stage & Hydrothermal Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Steam Chamber & Audio */}
          <div className="lg:col-span-7 space-y-6">
            <div
              className={cn(
                'relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 overflow-hidden bg-gradient-to-b transition-all duration-1000 flex flex-col justify-between p-6 sm:p-8',
                currentTherapy.steamColor
              )}
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Nhiệt Độ Hơi Nước</span>
                    <span className="text-xl font-mono font-medium text-purple-300">{currentTherapy.steamTemp}°C</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Độ Ẩm Tương Đối</span>
                    <span className="text-xs font-mono text-emerald-400">100% RH Nano 3µm</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Ghế Đá Sưởi</span>
                    <span className="text-xs font-mono text-amber-400">{currentTherapy.benchTemp}°C</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-block w-2.5 h-2.5 rounded-full',
                      isSteamActive ? 'bg-cyan-400 animate-ping' : 'bg-stone-600'
                    )}
                  />
                  <span className="text-[11px] font-mono text-cyan-300">
                    {isSteamActive ? 'Nồi Đồng MCH ON' : 'Steam OFF'}
                  </span>
                </div>
              </div>

              {/* Center Simulation: Calacatta Viola Marble & Floating Steam */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                {/* Marble Wall Simulation */}
                <div className="relative w-full max-w-lg h-44 rounded-md border border-purple-500/30 bg-gradient-to-br from-stone-950 via-purple-950/40 to-stone-950 p-4 shadow-2xl flex flex-col justify-between overflow-hidden">
                  {/* Calacatta Viola Veins Simulation */}
                  <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path
                        d="M 20 0 Q 120 80 200 40 T 380 180"
                        fill="none"
                        stroke="#7e22ce"
                        strokeWidth="12"
                        strokeOpacity="0.4"
                      />
                      <path
                        d="M 80 200 Q 180 120 280 160 T 360 20"
                        fill="none"
                        stroke="#581c87"
                        strokeWidth="8"
                        strokeOpacity="0.5"
                      />
                    </svg>
                  </div>

                  {/* Dense Nano Steam Fog Overlay when Active */}
                  {isSteamActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-white/10 to-transparent pointer-events-none animate-pulse" />
                  )}

                  {/* Copper Pot Visual */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <div className="p-3 bg-stone-950/70 border border-amber-600/50 rounded-none backdrop-blur-sm">
                      <span className="text-[10px] font-mono text-amber-400 block">NỒI ĐỒNG ĐỎ NGUYÊN KHỐI</span>
                      <span className="text-xs text-stone-200 font-medium">Bốc Hơi Thảo Mộc 46°C</span>
                    </div>

                    <div className="p-3 bg-stone-950/70 border border-purple-500/50 rounded-none backdrop-blur-sm text-right">
                      <span className="text-[10px] font-mono text-purple-300 block">GHẾ CALACATTA VIOLA</span>
                      <span className="text-xs text-stone-200 font-medium">Sưởi Ấm 38°C Giãn Cơ</span>
                    </div>
                  </div>

                  {/* Cold Plunge Shower Waterfall Badge */}
                  <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-stone-400 pt-2 border-t border-stone-800">
                    <span>Thác Nước Khoáng Lạnh 18°C Liền Kề</span>
                    <span className="text-cyan-300">Áp Suất Bơm 4.5 Bar</span>
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar inside Stage */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-purple-300">{currentTherapy.season}</span>
                    <h3 className="text-sm font-medium text-stone-100">{currentTherapy.title}</h3>
                    <p className="text-xs text-stone-400">Thảo mộc: {currentTherapy.herbs}</p>
                  </div>

                  <button
                    type="button"
                    onClick={toggleBoilingAudio}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-none font-mono text-xs uppercase tracking-wider transition-all min-h-[44px]',
                      isPlayingBoilingAudio
                        ? 'bg-purple-500 text-stone-950 hover:bg-purple-400'
                        : 'border border-purple-500/50 text-purple-300 hover:bg-purple-500/10'
                    )}
                  >
                    {isPlayingBoilingAudio ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        Tắt Âm Nước Sôi
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        Nghe Nồi Thảo Mộc Sôi
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-stone-300 font-light italic border-t border-stone-800/60 pt-2">
                  &ldquo;{currentTherapy.benefits}&rdquo;
                </p>
              </div>
            </div>

            {/* 3 Season Therapy Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.values(THERAPY_OPTIONS).map((opt) => {
                const isActive = opt.id === activeTherapy
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setActiveTherapy(opt.id)}
                    className={cn(
                      'p-3.5 border text-left transition-all min-h-[44px]',
                      isActive
                        ? 'border-purple-400 bg-purple-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[10px] font-mono text-purple-400 uppercase">{opt.season.split('(')[0]}</div>
                    <div className="text-xs font-medium text-stone-200 truncate mt-0.5">{opt.title.split('(')[0]}</div>
                    <div className="text-[10px] text-stone-500 mt-1">Nhiệt độ: {opt.steamTemp}°C</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Technical Specs & Custom Spa Consultation */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300 block">
                  Đặc Quyền Kiến Trúc Thủy Liệu GuHomes
                </span>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  Thiết kế phòng xông hơi ướt thích ứng hoàn hảo với vi khí hậu ẩm nhiệt đới TP.HCM: hệ thống xử lý chống thấm ngược 4 lớp màng Polyurethane đàn hồi cao, đường ống đồng cách nhiệt và hệ thoát nước sàn rãnh khe vô cực chống mùi hôi 100%.
                </p>
              </div>

              {/* Technical Norms Grid */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  Quy Chuẩn Kỹ Thuật Công Nghệ
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 border border-stone-800 bg-stone-950/50">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">Đá Calacatta Viola</span>
                    <span className="text-sm font-mono text-purple-300 font-medium">Dày 20mm Cắt CNC</span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Xử lý chống trượt Nano R11</span>
                  </div>

                  <div className="p-3 border border-stone-800 bg-stone-950/50">
                    <span className="text-[10px] font-mono text-stone-400 uppercase block">Điện Trở Gốm MCH</span>
                    <span className="text-sm font-mono text-purple-300 font-medium">Bốc Hơi Trong 90s</span>
                    <span className="text-[10px] text-stone-500 block mt-0.5">Tuổi thọ trên 15.000 giờ</span>
                  </div>
                </div>
              </div>

              {/* Consultation Form */}
              <div className="pt-4 border-t border-stone-800">
                {isFormSubmitted ? (
                  <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Đã ghi nhận yêu cầu tư vấn phòng xông hơi thảo dược {currentTherapy.title.split('(')[0]}. KTS Thủy Liệu GuHomes sẽ liên hệ gửi bản vẽ công năng 3D.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsFormSubmitted(true)}
                    className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px]"
                  >
                    Đăng Ký Khảo Sát &amp; Lên Mặt Bằng Spa Gia Đình
                  </button>
                )}
              </div>
            </div>

            {/* Quick Link */}
            <div className="p-5 border border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-purple-300 tracking-wider">
                  Dự Toán Thi Công Phòng Xông Hơi
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Bóc tách hệ máy xông hơi ướt, đá Viola &amp; vách kính cường lực 12mm chịu nhiệt.
                </p>
              </div>
              <Link
                href="/du-toan-chi-phi"
                className="whitespace-nowrap px-4 py-2 border border-stone-700 text-stone-300 hover:border-purple-400 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Dự Toán Chi Phí
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
