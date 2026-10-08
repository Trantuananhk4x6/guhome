'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type CaddyMotif = 'huong-tra' | 'tung-hac' | 'bach-hac'

interface CaddyMotifDetail {
  id: CaddyMotif
  title: string
  subtitle: string
  meaning: string
  goldFoilSpec: string
  motifArtDesc: string
  gradientBg: string
}

const CADDY_MOTIFS: Record<CaddyMotif, CaddyMotifDetail> = {
  'huong-tra': {
    id: 'huong-tra',
    title: 'Hương Trà Vạn Dặm',
    subtitle: 'Con Đường Trà Cổ & Đỉnh Núi Tây Côn Lĩnh',
    meaning: 'Tôn vinh hành trình ngàn năm của búp trà Shan Tuyết cổ thụ vượt dặm dài non sông đến chén trà tri kỷ.',
    goldFoilSpec: 'Vàng quỳ 24K Kiêu Kỵ dập mỏng 0.1 micron thếp thủ công',
    motifArtDesc: 'Đỉnh núi mây phủ bồng bềnh, cây trà cổ thụ ngàn năm vươn cành giữa trời sương, nét vẽ vàng kim thanh mảnh bay bổng.',
    gradientBg: 'from-amber-600/30 via-yellow-950/40 to-stone-950',
  },
  'tung-hac': {
    id: 'tung-hac',
    title: 'Tùng Hạc Nghênh Khách',
    subtitle: 'Nghênh Phong Cổ Tùng & Khách Quý Hội Ngộ',
    meaning: 'Tượng trưng cho sự tôn kính, lòng hiếu khách trang trọng của gia chủ danh gia vọng tộc đón tiếp bậc tao nhân.',
    goldFoilSpec: 'Vàng lá 24K mài chìm (maki-e) trong sơn then cánh gián',
    motifArtDesc: 'Đôi chim hạc nghiêng mình chào đón dưới bóng tùng xanh thẫm, các đường chỉ vàng óng ánh điểm xuyết vỏ trai nghiền.',
    gradientBg: 'from-emerald-700/30 via-stone-900 to-black',
  },
  'bach-hac': {
    id: 'bach-hac',
    title: 'Bạch Hạc Triều Dương',
    subtitle: 'Hạc Trắng Đón Ánh Thái Dương Rực Rỡ',
    meaning: 'Điềm lành, sự khai mở trí tuệ minh triết, khởi đầu ngày mới an lạc bên tách trà sớm mai.',
    goldFoilSpec: 'Vàng quỳ 24K phối bột bạc mịn tạo độ tương phản',
    motifArtDesc: 'Mặt trời đỏ chu sa rực rỡ ló dạng trên sóng mây, cánh hạc vươn cao hứng trọn tinh hoa trời đất.',
    gradientBg: 'from-rose-700/30 via-stone-900 to-black',
  },
}

export function ArtisanRattanCoreLacquerTeaCaddyAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedMotif, setSelectedMotif] = useState<CaddyMotif>('huong-tra')
  const [zoomLevel, setZoomLevel] = useState<1 | 4 | 16>(16)
  const [isLidClosing, setIsLidClosing] = useState(false)
  const [isLidClosed, setIsLidClosed] = useState(true)
  const [calligraphyText, setCalligraphyText] = useState('')
  const [orderSent, setOrderSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Synthesize pneumatic air cushion hiss & soft click when dual-lid seals airtight
  function playPneumaticAirSound() {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // 1. Soft air escaping hiss (bandpass pink noise)
    const duration = 1.8
    const bufferSize = ctx.sampleRate * duration
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.8))
    }
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = buffer

    const filter = ctx.createBiquadFilter()
    filter.type = 'bandpass'
    filter.frequency.setValueAtTime(1800, now)
    filter.frequency.linearRampToValueAtTime(650, now + duration)
    filter.Q.setValueAtTime(4.0, now)

    const noiseGain = ctx.createGain()
    noiseGain.gain.setValueAtTime(0.01, now)
    noiseGain.gain.linearRampToValueAtTime(0.18, now + 0.3)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration)

    noiseSource.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(ctx.destination)

    noiseSource.start(now)

    // 2. Final airtight seating thud (subtle vacuum seal pop at 1.8s)
    setTimeout(() => {
      if (!ctx || ctx.state === 'closed') return
      const popNow = ctx.currentTime
      const popOsc = ctx.createOscillator()
      popOsc.type = 'sine'
      popOsc.frequency.setValueAtTime(120, popNow)
      popOsc.frequency.exponentialRampToValueAtTime(40, popNow + 0.05)

      const popGain = ctx.createGain()
      popGain.gain.setValueAtTime(0.2, popNow)
      popGain.gain.exponentialRampToValueAtTime(0.001, popNow + 0.06)

      popOsc.connect(popGain)
      popGain.connect(ctx.destination)

      popOsc.start(popNow)
      popOsc.stop(popNow + 0.07)
    }, 1750)
  }

  function handleTestAirtightLid() {
    if (isLidClosing) return
    setIsLidClosing(true)
    setIsLidClosed(false)
    playPneumaticAirSound()

    setTimeout(() => {
      setIsLidClosed(true)
      setIsLidClosing(false)
    }, 1900)
  }

  const curMotif = CADDY_MOTIFS[selectedMotif]

  return (
    <section
      aria-label="Xưởng Chế Tác Tráp Trà Sơn Mài Cốt Mây Đan Định Quán"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Subtle Amber Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(217,119,6,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-amber-300">
                Atelier Mây Đan & Sơn Mài · GU-CADDY-2026-X
              </span>
              <span className="text-xs font-mono text-stone-400">Nắp Kép Khít Khí · Cốt Mây Định Quán</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Tráp Trà Sơn Mài Cốt Mây Đan Định Quán
              <span className="block font-sans text-lg font-normal text-amber-300/80 sm:text-xl mt-1">
                Giao Thoa Mây Nước Mắt Cáo, 15 Lớp Sơn Ta Phú Thọ & Thếp Vàng Quỳ 24K
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Bảo tồn trọn vẹn linh khí của trà Shan Tuyết cổ thụ nghìn năm tuổi. Cốt mây nước Định Quán đan tay mắt cáo siêu khít bọc vải màn tơ tằm, phủ 15 lớp sơn ta mài nước và cơ cấu nắp kép tự hạ nén khí tuyệt đối chống ẩm nhiệt đới Sài Gòn.
          </p>
        </div>

        {/* Master Interactive Section */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">
          {/* Left Column: Visual Shimmer Inspection & Pneumatic Lid Test (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Visual Caddy Canvas with Rattan Weave Texture */}
            <div className="relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800/80 text-xs">
                <span className="font-mono text-amber-300 uppercase tracking-wider">
                  Họa Tiết Thếp Vàng: {curMotif.title}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-stone-400">Độ phóng đại:</span>
                  <div className="inline-flex rounded-lg border border-stone-700 bg-stone-950 p-0.5">
                    {([1, 4, 16] as const).map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => setZoomLevel(z)}
                        className={cn(
                          'px-2.5 py-1 text-[11px] rounded-md transition-all min-h-[36px] min-w-[36px] font-mono',
                          zoomLevel === z
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'text-stone-400 hover:text-stone-200'
                        )}
                      >
                        {z}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tea Caddy Cylinder Visual */}
              <div className="relative mt-4 h-72 sm:h-80 w-full rounded-xl overflow-hidden border border-stone-800 bg-[#160c07] flex items-center justify-center p-6 shadow-inner">
                {/* Rattan Core Octagonal Weave Pattern (Cốt mây nước Định Quán mắt cáo) */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-25 mix-blend-screen"
                  style={{
                    backgroundImage: `radial-gradient(circle, #e0a353 10%, transparent 11%), radial-gradient(circle at 50% 50%, #b87333 10%, transparent 11%)`,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* 15-Layer Lacquer Translucent Sheen */}
                <div
                  className={cn(
                    'relative z-10 w-full max-w-sm h-52 rounded-2xl border border-amber-600/50 p-5 transition-all duration-500 flex flex-col justify-between shadow-2xl',
                    `bg-gradient-to-br ${curMotif.gradientBg}`
                  )}
                  style={{
                    transform: `scale(${zoomLevel === 1 ? 0.95 : zoomLevel === 4 ? 1.05 : 1.15})`,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono tracking-widest text-amber-200/90 uppercase bg-black/40 px-2 py-0.5 rounded">
                      GU-CADDY-2026-X
                    </span>
                    <span className="text-[10px] font-serif text-amber-300/80 italic">
                      Sơn Ta 15 Lớp Mài Nước
                    </span>
                  </div>

                  <div className="text-center my-auto space-y-1">
                    <div className="font-serif text-lg sm:text-xl text-amber-100 tracking-wide drop-shadow-md">
                      {curMotif.title}
                    </div>
                    <p className="text-[11px] text-amber-200/90 font-light drop-shadow">
                      {curMotif.subtitle}
                    </p>
                    <p className="text-[10px] text-amber-300/80 italic mt-1">
                      {curMotif.motifArtDesc}
                    </p>
                  </div>

                  <div className="flex justify-between items-end text-[9px] text-amber-200/70 font-mono">
                    <span>Cốt mây Định Quán</span>
                    <span>Thếp Vàng Kiêu Kỵ 24K</span>
                  </div>
                </div>
              </div>

              {/* Rattan Core Detail Explanation */}
              <div className="mt-4 bg-stone-950/80 p-3 rounded-xl border border-stone-800 text-xs text-stone-300 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-stone-100">Kính hiển vi soi cốt mây 16x:</strong>
                  <span className="font-mono text-amber-400">Mắt cáo đan khít 2.5mm</span>
                </div>
                <p className="text-[11px] text-stone-400 font-light">
                  Sợi mây nước dẻo dai từ rừng Định Quán (Đồng Nai) được chuốt nan tròn đều 1.2mm, đan tay theo lối mắt cáo ba chiều, tạo bộ khung siêu nhẹ nhưng chịu lực xoắn vặn và triệt tiêu co ngót trước độ ẩm 80% Sài Gòn.
                </p>
              </div>
            </div>

            {/* Pneumatic Airtight Lid Simulator */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-800/80 pb-3">
                <div>
                  <h3 className="font-serif text-sm font-medium text-stone-200">
                    Thử Nghiệm Cơ Cấu Nắp Kép Đệm Khí Tự Trượt (Airtight Pneumatic Seal)
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Khoảng hở giữa nắp và miệng tráp chỉ 0.05mm. Khi buông tay, nắp tự trượt hạ từ từ nhờ đệm khí nén, ngăn 100% không khí ẩm xâm nhập.
                  </p>
                </div>
                <div className="shrink-0">
                  {isLidClosing ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/50 text-amber-300 text-xs font-mono font-medium">
                      <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" /> Đang Nén Khí Hạ Nắp...
                    </span>
                  ) : isLidClosed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/50 text-emerald-400 text-xs font-mono font-medium">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" /> Nắp Kép Kín Khí Tuyệt Đối
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-stone-400 text-xs font-mono">
                      Nắp Đang Mở
                    </span>
                  )}
                </div>
              </div>

              {/* Visual Lid Descent Animation Bar */}
              <div className="relative h-16 w-full rounded-xl bg-stone-950 border border-stone-800 overflow-hidden flex items-center justify-between px-6">
                <span className="text-xs text-stone-400 z-10 font-mono">Trạng thái áp suất buồng trà:</span>
                <span className="text-xs text-amber-300 z-10 font-mono font-semibold">
                  {isLidClosing ? 'Đang xả khí vi mô (-15 Pa)' : 'Chân không cục bộ (Độ ẩm < 10% RH)'}
                </span>

                {/* Animated progress bar when closing */}
                {isLidClosing && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.8, ease: 'easeOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-500/30 border-r-2 border-amber-400"
                  />
                )}
              </div>

              {/* Trigger Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTestAirtightLid}
                  disabled={isLidClosing}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold transition-all min-h-[44px] shadow flex items-center gap-2 disabled:opacity-50"
                >
                  <span>Thử Thao Tác Hạ Nắp Nén Khí Tự Động</span>
                </button>
                <span className="text-[11px] text-stone-400 italic">
                  Âm thanh tiếng xả khí êm dịu phát qua Web Audio API
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Customization Form & Craftsmanship Specifications (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Choose Gold Foil Motif */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3.5">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Tuyển Chọn Họa Tiết Thếp Vàng Quỳ 24K
              </span>

              <div className="grid grid-cols-1 gap-2.5">
                {(Object.keys(CADDY_MOTIFS) as CaddyMotif[]).map((motifKey) => {
                  const m = CADDY_MOTIFS[motifKey]
                  const isCur = selectedMotif === motifKey
                  return (
                    <button
                      key={motifKey}
                      type="button"
                      onClick={() => setSelectedMotif(motifKey)}
                      className={cn(
                        'w-full text-left p-3.5 rounded-xl border text-xs transition-all min-h-[44px] flex items-center justify-between',
                        isCur
                          ? 'border-amber-500/70 bg-stone-900 text-stone-100 shadow-md'
                          : 'border-stone-800/80 bg-stone-950/40 text-stone-400 hover:bg-stone-900/50'
                      )}
                    >
                      <div className="space-y-1">
                        <div className="font-serif font-medium text-stone-200">{m.title}</div>
                        <div className="text-[11px] text-amber-400/90">{m.subtitle}</div>
                        <p className="text-[10px] text-stone-400 font-light">{m.meaning}</p>
                      </div>
                      <span className="text-stone-500 text-sm ml-2">→</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Atelier Craftsmanship Specs */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-5 space-y-3">
              <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                Kỹ Nghệ Sơn Mài 45 Ngày & Thếp Vàng 24K
              </span>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>15 lớp sơn ta Phú Thọ ủ trong buồng ẩm 85% RH, mỗi lớp mài nước 3 ngày.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>Thếp vàng quỳ Kiêu Kỵ 24K thủ công bằng lông thỏ, vẽ chi tiết nét tơ siêu nhỏ.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-mono">•</span>
                  <span>Lòng tráp lót lá bạc nguyên chất 999 khử khuẩn và giữ ẩm tự nhiên cho búp trà.</span>
                </li>
              </ul>
            </div>

            {/* Custom Bespoke Calligraphy & Order Form */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-950/20 to-stone-900/60 p-5 space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-serif font-medium text-amber-200">
                  Đặt May Đo Khắc Chữ Thư Pháp & Gia Huy Chủ Nhân
                </h3>
                <p className="text-[11px] text-stone-400 font-light">
                  Nghệ nhân GuHomes vẽ tay chữ thư pháp (Chữ Hán / Quốc ngữ) thếp vàng quỳ đáy tráp hoặc khắc gia huy độc bản.
                </p>
              </div>

              {orderSent ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300">
                  ✓ GuHomes đã ghi nhận yêu cầu chế tác tráp trà sơn mài cốt mây. Nghệ nhân trưởng sẽ liên hệ gửi bản vẽ phác thảo thư pháp trong 4 giờ.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label htmlFor={`${formId}-client-name`} className="block text-[11px] text-stone-400 mb-1">
                        Họ tên gia chủ
                      </label>
                      <input
                        id={`${formId}-client-name`}
                        type="text"
                        required
                        placeholder="Phan Đăng Khoa"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-client-phone`} className="block text-[11px] text-stone-400 mb-1">
                        Số điện thoại
                      </label>
                      <input
                        id={`${formId}-client-phone`}
                        type="tel"
                        required
                        placeholder="0913 xxx xxx"
                        className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-calligraphy`} className="block text-[11px] text-stone-400 mb-1">
                      Nội dung chữ thư pháp dát vàng đáy tráp
                    </label>
                    <input
                      id={`${formId}-calligraphy`}
                      type="text"
                      value={calligraphyText}
                      onChange={(e) => setCalligraphyText(e.target.value)}
                      placeholder="Ví dụ: Thanh Tâm Trà Đạo · 2026"
                      className="w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-xs text-stone-200 placeholder-stone-600 focus:border-amber-400 focus:outline-none min-h-[44px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs py-3 transition-all min-h-[44px] shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Gửi Yêu Cầu Chế Tác Tráp Trà Sơn Mài</span>
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
