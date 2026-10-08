'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type HornPattern = 'amber-honey' | 'jet-black' | 'marble-mottled'

interface HornProfile {
  id: HornPattern
  name: string
  hornAge: string
  translucency: string
  motherOfPearlInlay: string
  boxFinish: string
  description: string
  tactileFeel: string
  accentColor: string
}

const HORN_PROFILES: Record<HornPattern, HornProfile> = {
  'amber-honey': {
    id: 'amber-honey',
    name: 'Sừng Nước Mật Ong Hổ Phách Xuyên Sáng',
    hornAge: 'Sừng ngọn trâu nước đực trên 18 năm tuổi',
    translucency: 'Độ truyền sáng 75% vàng ấm như hổ phách Baltic',
    motherOfPearlInlay: 'Khảm ốc xà cừ đỏ Singapore họa tiết hoa sen thanh khiết',
    boxFinish: 'Hộp sơn mài then đen bóng gương lót lụa tơ tằm Vạn Phúc',
    description: 'Chất sừng quý hiếm chỉ có ở phần ngọn sừng trâu nước già. Khi soi dưới ánh đèn hoặc ánh mặt trời, từng thớ sừng tự nhiên ánh lên sắc vàng mật ong rực rỡ không tì vết.',
    tactileFeel: 'Mịn màng ấm áp như da thịt người, hoàn toàn không bị lạnh tay như nhựa hay kim loại.',
    accentColor: 'from-amber-600/30 to-yellow-950/10',
  },
  'jet-black': {
    id: 'jet-black',
    name: 'Sừng Đen Tuyền Mun Quyền Uy',
    hornAge: 'Sừng gốc trâu nước dầm bùn đầm lầy 15 năm',
    translucency: 'Đen nhánh tuyền đặc, bóng gương tự nhiên',
    motherOfPearlInlay: 'Khảm xà cừ ngũ sắc họa tiết rồng lượn mây ngũ sắc',
    boxFinish: 'Hộp gỗ Mun hoa chạm nổi then cài đồng thau cổ',
    description: 'Mang sắc đen bóng của gỗ mun và đá cẩm thạch đen. Độ cứng cao, từng răng lược được vuốt đầu tròn hạt gạo lướt êm ái trên da đầu mà không gây xước biểu bì.',
    tactileFeel: 'Đầm chắc vững chãi, răng lược cứng cáp gỡ rối tóc xoăn bồng bềnh tuyệt hảo.',
    accentColor: 'from-stone-800/40 to-black',
  },
  'marble-mottled': {
    id: 'marble-mottled',
    name: 'Sừng Vân Cẩm Thạch Ngũ Sắc Độc Bản',
    hornAge: 'Sừng đực sống tự nhiên vùng núi đá Hà Giang',
    translucency: 'Giao thoa giữa mảng sáng hổ phách và vệt đen huyền bí',
    motherOfPearlInlay: 'Khảm cánh bướm hoa mai bằng vỏ ốc cửu khổng',
    boxFinish: 'Hộp gỗ Hương đỏ bọc vải nhung the thêu chỉ vàng',
    description: 'Mỗi chiếc lược là một bức tranh thủy mặc ngẫu biến độc nhất vô nhị. Không bao giờ tìm thấy hai chiếc lược có đường vân sừng giống hệt nhau trên đời.',
    tactileFeel: 'Cảm giác xúc giác biến chuyển kỳ diệu theo từng đường cong sinh học của thân lược.',
    accentColor: 'from-amber-700/25 to-stone-900/10',
  },
}

export function ArtisanHandmadeHornAndTortoiseshellCombAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPattern, setSelectedPattern] = useState<HornPattern>('amber-honey')
  const [backlightOn, setBacklightOn] = useState<boolean>(true)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [customOrderSent, setCustomOrderSent] = useState(false)

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

  // Synthesize delicate horn tines flick sound and lacquer box snap
  function playCombFlick() {
    const ctx = getAudioContext()
    if (!ctx) return

    setIsPlayingAudio(true)
    setTimeout(() => setIsPlayingAudio(false), 500)

    const now = ctx.currentTime

    // 1. Tine pluck tone (pure organic keratin resonance at 1100Hz - 1600Hz)
    const tinePitches = [1150, 1300, 1450, 1600]
    tinePitches.forEach((pitch, idx) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(pitch, now + idx * 0.05)

      gain.gain.setValueAtTime(0.0001, now + idx * 0.05)
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.05 + 0.004)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.05 + 0.14)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now + idx * 0.05)
      osc.stop(now + idx * 0.05 + 0.16)
    })

    // 2. Soft wood lacquer box close thud at the end
    const thudOsc = ctx.createOscillator()
    const thudGain = ctx.createGain()
    thudOsc.type = 'sine'
    thudOsc.frequency.setValueAtTime(95, now + 0.28)
    thudOsc.frequency.exponentialRampToValueAtTime(45, now + 0.38)

    thudGain.gain.setValueAtTime(0.0001, now + 0.28)
    thudGain.gain.linearRampToValueAtTime(0.3, now + 0.285)
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45)

    thudOsc.connect(thudGain)
    thudGain.connect(ctx.destination)
    thudOsc.start(now + 0.28)
    thudOsc.stop(now + 0.48)
  }

  const activePattern = HORN_PROFILES[selectedPattern]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Xưởng Lược Sừng Thụy Ứng Khảm Xà Cừ GuHomes"
    >
      {/* Background Ambience */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-all duration-1000',
          activePattern.accentColor
        )}
      />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-stone-700/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-400 shadow-sm shadow-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-300 uppercase">
              Thụy Ứng Heritage Comb Atelier · GU-HORN-2026-X
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>Sừng Trâu Nước &gt; 15 Năm</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>0 Volt Tĩnh Điện</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Khảm Xà Cừ Ốc Đỏ Singapore</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl md:text-5xl">
              Xưởng Lược Sừng Thụy Ứng
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Nghệ Thuật Sừng Mộc Trăm Năm, Không Tích Tĩnh Điện & Khảm Xà Cừ Cung Đình
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Vật phẩm chăm sóc mái tóc và dưỡng sinh hoàng gia lưu truyền từ làng nghề Thụy Ứng Thường Tín có lịch sử
              hơn 400 năm. Sừng trâu nước tự nhiên chứa các protein Keratin tương đồng cấu trúc tóc người, trải qua
              30 công đoạn luộc dầu mè, ép phẳng, xẻ răng thủ công và chuốt bóng bằng lá chuối khô.
              Khác với lược nhựa công nghiệp tích điện hàng ngàn volt gây chẻ ngọn gãy rụng, lược sừng triệt tiêu hoàn toàn
              tĩnh điện (0 Volt), vuốt êm ái kích thích tuần hoàn máu não và mang lại giấc ngủ an lành.
            </p>
          </div>

          {/* Sound Trigger */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-stone-800 bg-neutral-900/60 p-5 backdrop-blur-md lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Thử nghiệm cơ tính chất sừng
              </span>
              <h4 className="mt-1 font-serif text-sm text-stone-200">
                Gảy Răng Lược & Nắp Hộp Sơn Mài
              </h4>
              <p className="mt-1 text-xs text-stone-400">
                Lắng nghe âm thanh giòn tan khi ngón tay lướt qua hàng răng sừng và tiếng êm ái khi đóng nắp hộp.
              </p>
            </div>
            <button
              onClick={playCombFlick}
              className={cn(
                'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all',
                isPlayingAudio
                  ? 'bg-amber-400 text-stone-950 scale-95 shadow-lg shadow-amber-400/30'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingAudio ? 'Âm Vang Chất Sừng Đanh Mộc...' : 'Gảy Thử Hàng Răng Lược Sừng'}
            </button>
          </div>
        </div>

        {/* Pattern Showcase & Backlight Viewer */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/70 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Chiêm ngưỡng cấu trúc chất sừng
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Ba Dòng Vân Sừng Tự Nhiên Độc Bản
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(HORN_PROFILES) as HornPattern[]).map((key) => {
                const item = HORN_PROFILES[key]
                const isActive = selectedPattern === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPattern(key)}
                    className={cn(
                      'min-h-[44px] rounded-lg px-3.5 py-2 text-xs font-medium transition-all',
                      isActive
                        ? 'bg-amber-600 text-stone-950 font-bold shadow-xs'
                        : 'bg-stone-800/70 text-stone-300 hover:text-stone-100 hover:bg-stone-800'
                    )}
                  >
                    {item.name.split(' ')[1]} {item.name.split(' ')[2]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Visual Comb Model with Backlight Toggle */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-black/60 p-8 text-center overflow-hidden">
                {/* Visual Horn Comb representation */}
                <div className="relative flex h-52 w-full max-w-sm items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    {/* Mother-of-Pearl Inlay along spine */}
                    <div
                      className={cn(
                        'relative h-14 w-60 rounded-t-3xl border border-amber-900/40 shadow-2xl flex items-center justify-between px-6 transition-all duration-700',
                        backlightOn
                          ? 'bg-gradient-to-r from-amber-500 via-amber-300 to-yellow-600 shadow-amber-500/20'
                          : 'bg-gradient-to-r from-stone-900 via-stone-800 to-zinc-950'
                      )}
                    >
                      {/* MOP flower dots */}
                      <span className="h-3 w-3 rounded-full bg-rose-200 border border-white/80 shadow-xs" />
                      <span className="font-serif text-[10px] tracking-widest uppercase font-semibold text-stone-950">
                        GUHOMES · THỤY ỨNG
                      </span>
                      <span className="h-3 w-3 rounded-full bg-rose-200 border border-white/80 shadow-xs" />
                    </div>

                    {/* Comb Teeth Rows (24 tines) */}
                    <div className="flex justify-between w-56 pt-1">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            'h-24 w-1 rounded-b-full transition-all duration-500',
                            backlightOn
                              ? 'bg-gradient-to-b from-amber-400 to-amber-200 shadow-xs shadow-amber-300/40'
                              : 'bg-gradient-to-b from-stone-800 to-stone-900'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Backlight switch */}
                <div className="mt-4 flex items-center gap-3">
                  <button
                    onClick={() => setBacklightOn(!backlightOn)}
                    className={cn(
                      'min-h-[36px] rounded-lg px-4 text-xs font-mono transition-colors border',
                      backlightOn
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                        : 'bg-stone-800 text-stone-300 border-stone-700 hover:text-white'
                    )}
                  >
                    {backlightOn ? 'Tắt Đèn Rọi Xuyên Thấu' : 'Bật Đèn Soi Thớ Sừng Hổ Phách'}
                  </button>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {backlightOn ? 'Hiệu ứng xuyên tâm 75%' : 'Chế độ ánh sáng thường'}
                  </span>
                </div>
              </div>
            </div>

            {/* Pattern Specs */}
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Đặc tính vật liệu quý hiếm
              </span>
              <h4 className="mt-2 font-serif text-2xl text-stone-100">{activePattern.name}</h4>
              <p className="mt-3 text-xs leading-relaxed text-stone-300">{activePattern.description}</p>

              <div className="mt-5 space-y-2.5 rounded-xl border border-stone-800 bg-black/40 p-4">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Tuổi trâu nước:</span>
                  <span className="font-mono font-medium text-amber-300">{activePattern.hornAge}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Độ truyền quang:</span>
                  <span className="font-mono font-medium text-stone-200">{activePattern.translucency}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Kỹ nghệ khảm sống lược:</span>
                  <span className="text-stone-300 text-right max-w-[200px]">{activePattern.motherOfPearlInlay}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Hộp đựng kèm theo:</span>
                  <span className="text-amber-200 text-right max-w-[200px]">{activePattern.boxFinish}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Static Electricity Science Comparison (0V vs 15,000V) */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/60 p-6 md:p-8">
          <div className="border-b border-stone-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
              Vật lý học mái tóc khỏe mạnh
            </span>
            <h3 className="font-serif text-xl text-stone-100">
              Kiểm Nghiệm Tĩnh Điện: Lược Sừng Tự Nhiên vs Lược Nhựa Công Nghiệp
            </h3>
            <p className="mt-1 text-xs text-stone-400">
              Tại sao giới quý tộc phương Đông chỉ dùng lược sừng để bảo vệ nang tóc và da đầu.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Horn Comb Box */}
            <div className="rounded-xl border border-amber-600/40 bg-amber-950/20 p-5">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base text-amber-200">Lược Sừng Thụy Ứng Tự Nhiên</h4>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono text-xs text-emerald-400 border border-emerald-500/30">
                  Chuẩn Y Học Cổ Truyền
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-light text-emerald-400">0</span>
                <span className="font-mono text-sm text-stone-300">Volt Tĩnh Điện</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone-300">
                Protein Keratin trong sừng cân bằng điện tích sinh học ngay khi chạm vào sợi tóc.
                Không làm xòe biểu bì tóc, giữ nguyên độ bóng mượt tự nhiên và không hút bụi mịn trong không khí.
              </p>
            </div>

            {/* Plastic Comb Box */}
            <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-5">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-base text-stone-400">Lược Nhựa Dẻo / Carbon Công Nghiệp</h4>
                <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 font-mono text-xs text-rose-400 border border-rose-500/30">
                  Có Hại Cho Mái Tóc
                </span>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-serif text-4xl font-light text-rose-400">15.000+</span>
                <span className="font-mono text-sm text-stone-400">Volt Tích Điện Ma Sát</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-stone-400">
                Ma sát với tóc khô sinh ra dòng điện tích hàng chục kilovolt, làm sợi tóc bay dựng đứng,
                lột rách lớp màng lipid bảo vệ thân tóc, dẫn đến khô xơ, chẻ ngọn và rụng tóc sớm.
              </p>
            </div>
          </div>
        </div>

        {/* Custom Inscription Order Form */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-gradient-to-r from-amber-950/40 via-stone-900 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Món quà tinh tế trao gửi yêu thương
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Đặt May Đo Lược Sừng Khắc Tên Gia Chủ & Hộp Sơn Mài Then
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Nghệ nhân GuHomes nhận khắc chữ thư pháp hoặc chữ ký số lên sống lược, hoàn thiện trong hộp sơn mài
                lót lụa tơ tằm Vạn Phúc kèm chứng thư xuất xưởng làng nghề Thụy Ứng.
              </p>
            </div>

            <div className="lg:col-span-5">
              {customOrderSent ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-900/30 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-amber-200">
                    Đã ghi nhận yêu cầu may đo lược sừng
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    Nghệ nhân Thụy Ứng GuHomes sẽ liên hệ để tư vấn chọn phôi sừng và chữ khắc.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setCustomOrderSent(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-horn-phone`} className="sr-only">
                    Số điện thoại và tên chủ nhân
                  </label>
                  <input
                    id={`${formId}-horn-phone`}
                    type="text"
                    required
                    placeholder="Họ tên & Số điện thoại chủ nhân..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký May Đo Lược Sừng</span>
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
