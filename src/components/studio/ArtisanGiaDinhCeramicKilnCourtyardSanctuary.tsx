'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type CeramicGlaze = 'da-luon' | 'tam-thai' | 'xanh-dong' | 'bach-tho'

interface GlazeSpec {
  id: CeramicGlaze
  name: string
  firingTemp: string
  ashType: string
  colorTheme: string
  story: string
  coolingDelta: string
  accentColor: string
}

const GLAZE_CATALOGUE: Record<CeramicGlaze, GlazeSpec> = {
  'da-luon': {
    id: 'da-luon',
    name: 'Men Da Lươn Cổ Bản Tro Trấu',
    firingTemp: '1.250°C Lửa Lò Củi Rơm',
    ashType: 'Tro trấu ngâm nước vôi trong nung khử oxi',
    colorTheme: 'Sắc vàng nâu hổ phách ánh bóng da lươn',
    story: 'Dòng men huyền thoại của các lò gốm Hưng Lợi dọc kênh Tàu Hủ. Bề mặt men rạn tự nhiên lấp lánh dưới làn nước mưa, không trơn trượt và ngậm ẩm cực tốt.',
    coolingDelta: '-4.2°C Hạ nhiệt tầng trệt',
    accentColor: 'from-amber-700/30 to-amber-900/10',
  },
  'tam-thai': {
    id: 'tam-thai',
    name: 'Men Rêu Tam Thái Chợ Lớn',
    firingTemp: '1.220°C Lò Bầu Nam Bộ',
    ashType: 'Men tro thảo mộc pha khoáng đồng tự nhiên',
    colorTheme: 'Xanh rêu cổ phong pha ánh ngọc lam trầm',
    story: 'Kế thừa từ gốm mỹ nghệ Cây Mai nức tiếng Sài Gòn xưa. Màu men xanh trầm hòa quyện với thảm rêu nhung địa phương, tạo nên góc sân thanh tịnh tuyệt mỹ.',
    coolingDelta: '-3.8°C Giảm bức xạ nhiệt',
    accentColor: 'from-emerald-800/30 to-teal-900/10',
  },
  'xanh-dong': {
    id: 'xanh-dong',
    name: 'Men Xanh Đồng Cây Mai Rực Rỡ',
    firingTemp: '1.260°C Lửa Ngọn Rừng Sác',
    ashType: 'Oxit đồng vảy nung trong khí quyển hoàn nguyên',
    colorTheme: 'Sắc xanh ngọc bích ánh lam ngọc sâu thẳm',
    story: 'Màu men từng ngự trên các phù điêu miếu cổ Gia Định. Mỗi lu gốm là một bức tranh ngẫu biến của lửa và gió, phản chiếu bầu trời xanh trong lòng nước.',
    coolingDelta: '-4.5°C Giữ ẩm tự nhiên',
    accentColor: 'from-cyan-800/30 to-blue-900/10',
  },
  'bach-tho': {
    id: 'bach-tho',
    name: 'Men Bạch Thổ Đất Sét Sông Đồng Nai',
    firingTemp: '1.200°C Lò Nằm Truyền Thống',
    ashType: 'Đất sét trắng cao lanh ngâm lọc phù sa',
    colorTheme: 'Trắng ngà mờ dịu mắt không phản quang chói',
    story: 'Chất đất sét ngàn năm bồi đắp lưu vực sông Đồng Nai, nung nhiệt vừa tạo độ xốp vi thể để gốm thở được. Hơi nước thấm qua thành lu lan tỏa hương đất nung mộc mạc.',
    coolingDelta: '-3.5°C Tươi mát vi khí hậu',
    accentColor: 'from-stone-600/30 to-stone-800/10',
  },
}

export function ArtisanGiaDinhCeramicKilnCourtyardSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedGlaze, setSelectedGlaze] = useState<CeramicGlaze>('da-luon')
  const [isPlayingWater, setIsPlayingWater] = useState(false)
  const [inquirySent, setInquirySent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const waterIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (waterIntervalRef.current) {
        clearInterval(waterIntervalRef.current)
      }
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

  // Simulate water droplet ringing into ceramic water jar (chum sành)
  function playWaterDroplet() {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime
    // Pitch resonates between 1200Hz - 2400Hz depending on jar water depth
    const pitch = 1400 + Math.random() * 800

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    // Chirp droplet frequency sweep upwards then subtle ring
    osc.frequency.setValueAtTime(pitch * 0.7, now)
    osc.frequency.exponentialRampToValueAtTime(pitch, now + 0.02)
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.95, now + 0.3)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.2, now + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)

    // Ceramic hollow reverberation filter
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(pitch, now)
    bandpass.Q.setValueAtTime(8, now)

    osc.connect(gain)
    gain.connect(bandpass)
    bandpass.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.5)
  }

  function toggleWaterAmbience() {
    if (isPlayingWater) {
      if (waterIntervalRef.current) {
        clearInterval(waterIntervalRef.current)
        waterIntervalRef.current = null
      }
      setIsPlayingWater(false)
    } else {
      setIsPlayingWater(true)
      playWaterDroplet()
      waterIntervalRef.current = setInterval(() => {
        playWaterDroplet()
      }, 1400 + Math.random() * 800)
    }
  }

  const currentGlaze = GLAZE_CATALOGUE[selectedGlaze]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Sân Trong Lò Gốm Gia Định & Lu Nước Mưa Tro Trấu GuHomes"
    >
      {/* Background Ambience Gradient */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-1000',
          currentGlaze.accentColor
        )}
      />
      <div className="pointer-events-none absolute -right-24 top-1/4 h-80 w-80 rounded-full bg-amber-600/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-1/4 h-80 w-80 rounded-full bg-emerald-700/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/60 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-600 shadow-sm shadow-amber-500">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-100 animate-pulse" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-400 uppercase">
              Saigon Bioclimatic Courtyard · Gốm Củi Hưng Lợi - Cây Mai
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>Men Nung 1.250°C</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Hạ Nhiệt Tự Nhiên -4.2°C</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Nền Gạch Tàu Ngậm Ẩm</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl md:text-5xl">
              Sân Trong Lò Gốm Gia Định
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Cụm Chum Lu Men Tro Trấu Nung Củi & Thảm Rêu Nhiệt Đới Hạ Nhiệt Biệt Thự
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Tái hiện ký ức sông nước Nam Bộ và các lò gốm trứ danh Cây Mai - Chợ Lớn ngay giữa lòng dinh thự hiện đại.
              Hệ thống mái đón gom nước mưa qua máng đồng patina đổ trực tiếp vào cụm chum lu da lươn men tro trấu.
              Lớp gạch tàu đất nung nung củi liên tục hút nước thừa, thẩm thấu hơi mát qua thảm rêu nhung địa phương,
              làm dịu cái nắng 38°C mùa khô Sài Gòn hoàn toàn thụ động mà không tốn một watt điện năng.
            </p>
          </div>

          {/* Water Sound Trigger */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-stone-800 bg-black/50 p-5 backdrop-blur-md lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Âm vang gốm & nước mưa
              </span>
              <h4 className="mt-1 font-serif text-sm text-stone-200">
                Tiếng Nước Nhỏ Giọt Vào Lu Sành
              </h4>
              <p className="mt-1 text-xs text-stone-400">
                Mô phỏng rung động âm thanh giọt nước mưa rớt trên mặt lu gốm men da lươn rỗng.
              </p>
            </div>
            <button
              onClick={toggleWaterAmbience}
              className={cn(
                'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all',
                isPlayingWater
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingWater ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-stone-950 animate-ping" />
                  Đang Phát Tiếng Nước Rơi... (Tắt)
                </>
              ) : (
                'Bật Âm Thanh Giọt Nước Vào Lu'
              )}
            </button>
          </div>
        </div>

        {/* Glaze Selector & Showcase */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/60 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Bảo tồn di sản nghề gốm thủ công
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Tuyển Tập Bốn Dòng Men Gốm Gia Định Cổ Bản
              </h3>
            </div>
            {/* Glaze tabs */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(GLAZE_CATALOGUE) as CeramicGlaze[]).map((key) => {
                const item = GLAZE_CATALOGUE[key]
                const isActive = selectedGlaze === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedGlaze(key)}
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

          {/* Glaze Details Card */}
          <div className="mt-6 grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="inline-block rounded-full bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-400 border border-amber-500/20">
                {currentGlaze.firingTemp}
              </div>
              <h4 className="mt-3 font-serif text-2xl text-stone-100">{currentGlaze.name}</h4>
              <p className="mt-1 font-mono text-xs text-stone-400">{currentGlaze.colorTheme}</p>
              <p className="mt-4 text-sm leading-relaxed text-stone-300">{currentGlaze.story}</p>
              <div className="mt-4 rounded-xl border border-stone-800 bg-black/40 p-3">
                <span className="font-mono text-[11px] text-stone-400 block">Thành phần nguyên liệu men:</span>
                <span className="text-xs text-amber-200/90 font-medium">{currentGlaze.ashType}</span>
              </div>
            </div>

            {/* Visual Microclimate Metrics */}
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-5">
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Nhiệt Độ Bề Mặt Gạch Tàu</span>
                <span className="mt-1 text-2xl font-light font-serif text-amber-300">31.5°C</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Giảm 9.5°C so với bê tông ngoài trời</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Hiệu Năng Hạ Nhiệt Vi Khí Hậu</span>
                <span className="mt-1 text-2xl font-light font-serif text-emerald-400">{currentGlaze.coolingDelta}</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Gió đối lưu tự nhiên</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Tỷ Lệ Bốc Hơi Tự Nhiên</span>
                <span className="mt-1 text-2xl font-light font-serif text-cyan-300">1.8 L/m²/ngày</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Cấp ẩm dịu nhẹ cho giếng trời</span>
              </div>
              <div className="rounded-xl border border-stone-800 bg-black/50 p-4">
                <span className="font-mono text-[11px] text-stone-400 block">Độ Ẩm Khu Vực Thảm Rêu</span>
                <span className="mt-1 text-2xl font-light font-serif text-emerald-300">72% RH</span>
                <span className="text-[10px] text-stone-400 block mt-0.5">Môi trường sống bền vững</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Bioclimatic Craft */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">I</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Gạch Tàu Đất Nung Nung Củi Thủ Công</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Gạch đất sét Vĩnh Long ép tay nung củi trấu 7 ngày đêm; cấu trúc mao dẫn tự nhiên ngậm nước mưa
              khi trời đổ mưa giông và từ từ nhả hơi ẩm khi nắng gắt, điều tiết nhiệt độ sân trong mềm mại.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">II</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Máng Xối Đồng Đỏ Patina Lên Màu Tự Nhiên</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Hệ thống thu gom nước mưa chế tác từ tấm đồng đỏ gò tay dày 2mm, qua từng mùa mưa nắng Sài Gòn
              tự lên lớp rỉ xanh patina bảo vệ kim loại vĩnh cửu, dẫn dòng nước reo róc rách vào lòng các chum sành.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">III</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Thảm Rêu Nhung & Cây Bản Địa Chịu Bóng</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Tầng phủ sinh học gồm rêu nhung địa phương, dương xỉ tổ chim và cây thủy sinh trong lu lọc nước
              tự nhiên, tạo nên hệ sinh thái tuần hoàn giữ sạch nguồn nước mưa và thanh lọc bụi mịn đô thị.
            </p>
          </div>
        </div>

        {/* Consultation Form for Courtyard Design */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-gradient-to-r from-amber-950/30 via-stone-900 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Kiến tạo không gian vi khí hậu bản địa
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Tư Vấn Thiết Kế Sân Trong Gốm Củi Gia Định Cho Biệt Thự
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                KTS GuHomes trực tiếp khảo sát hướng nắng, luồng gió giếng trời và thiết kế may đo cụm chum lu
                nung củi theo phong thủy và diện mạo kiến trúc của từng công trình.
              </p>
            </div>

            <div className="lg:col-span-5">
              {inquirySent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-emerald-200">
                    Đã tiếp nhận yêu cầu tư vấn sân trong
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    KTS Trưởng chuyên trách vi khí hậu GuHomes sẽ liên hệ gửi bản phác thảo ý tưởng.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setInquirySent(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-courtyard`} className="sr-only">
                    Số điện thoại hoặc Email gia chủ
                  </label>
                  <input
                    id={`${formId}-courtyard`}
                    type="text"
                    required
                    placeholder="Số điện thoại / Diện tích sân trong dự kiến..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Nhận Bản Phác Thảo Sân Trong</span>
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
