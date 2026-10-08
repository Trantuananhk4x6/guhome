'use client'

import { useState, useId, useRef, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type CasketShape = 'octagonal' | 'rectangular' | 'circular'

interface CasketDesign {
  id: CasketShape
  name: string
  motif: string
  filigreeWireGauge: string
  goldGilding: string
  gemstoneClasp: string
  craftingDays: number
  description: string
  tactileDetail: string
}

const CASKET_DESIGNS: Record<CasketShape, CasketDesign> = {
  octagonal: {
    id: 'octagonal',
    name: 'Tráp Bát Giác Cúc Dây Kim Tiền',
    motif: 'Hoa cúc dây 8 cánh tượng trưng cho bát quái hanh thông',
    filigreeWireGauge: 'Sợi bạc ta se đôi đường kính 0.12mm',
    goldGilding: 'Thếp vàng quỳ 24K làng Kiêu Kỵ 5 lớp',
    gemstoneClasp: 'Then cài đồng đúc ngọc phỉ thúy Myanmar A',
    craftingDays: 45,
    description: 'Tác phẩm đậu bạc đỉnh cao phỏng theo tráp ngự dụng triều Nguyễn. Hàng vạn nút xoắn hoa cúc được đan bện thủ công từ các sợi bạc siêu mảnh rồi hàn vảy lửa đèn khò tinh tế.',
    tactileDetail: 'Độ nhám nhẹ của sợi bạc se quấn, lớp nhung the đỏ thẫm êm ái nâng niu nữ trang gia bảo.',
  },
  rectangular: {
    id: 'rectangular',
    name: 'Tráp Chữ Nhật Phụng Múa Mẫu Đơn',
    motif: 'Cặp loan phụng chầu đóa hoa mẫu đơn vương giả',
    filigreeWireGauge: 'Sợi bạc ta cán dẹt 0.14mm viền khung xương',
    goldGilding: 'Mạ vàng hoàng kim 24K dày 5 micron',
    gemstoneClasp: 'Khóa then đồng chạm phượng ngậm ngọc bích',
    craftingDays: 52,
    description: 'Dành riêng cho các bộ trang sức ngọc trai và kim cương quý giá. Nắp tráp uốn lượn hình cánh cung, từng chùm lông đuôi phượng hoàng được tỉa tách sợi bạc lấp lánh dưới ánh nến.',
    tactileDetail: 'Trọng lượng đầm tay của khung bạc đúc 650g, tiếng then cài ngọc đóng khít êm ái tuyệt đối.',
  },
  circular: {
    id: 'circular',
    name: 'Hộp Tròn Kim Quy Tụ Phúc',
    motif: 'Rùa vàng cõng hoa sen và mây ngũ sắc trường thọ',
    filigreeWireGauge: 'Sợi bạc ta se xoắn kép 0.10mm cực mịn',
    goldGilding: 'Thếp vàng lá cổ truyền sắc vàng chanh hoàng cung',
    gemstoneClasp: 'Khuy nam châm vĩnh cửu bọc bạc chạm khắc',
    craftingDays: 38,
    description: 'Hộp tròn đường kính 180mm nhỏ gọn dành cho bàn phấn master suite. Mặt đáy tráp chạm khắc gia huy hoặc niên hiệu độc bản theo yêu cầu của gia chủ.',
    tactileDetail: 'Mặt nắp tròn mềm mại không một góc nhọn, lớp then cài trượt nhẹ như lụa.',
  },
}

export function ArtisanGoldFiligreeJewelryAndCasketAtelier({ className }: { className?: string }) {
  const formId = useId()
  const [selectedShape, setSelectedShape] = useState<CasketShape>('octagonal')
  const [microscopeZoom, setMicroscopeZoom] = useState<number>(1) // 1x, 5x, 10x, 20x
  const [isPlayingClasp, setIsPlayingClasp] = useState(false)
  const [orderSubmitted, setOrderSubmitted] = useState(false)

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

  // Synthesize delicate silver/gold bell chime and solid jade clasp click
  function playClaspSound() {
    const ctx = getAudioContext()
    if (!ctx) return

    setIsPlayingClasp(true)
    setTimeout(() => setIsPlayingClasp(false), 500)

    const now = ctx.currentTime

    // 1. Jade clasp snap click (tight click at 1800Hz)
    const snapOsc = ctx.createOscillator()
    const snapGain = ctx.createGain()
    snapOsc.type = 'triangle'
    snapOsc.frequency.setValueAtTime(1800, now)
    snapOsc.frequency.exponentialRampToValueAtTime(300, now + 0.04)

    snapGain.gain.setValueAtTime(0.0001, now)
    snapGain.gain.linearRampToValueAtTime(0.25, now + 0.003)
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06)

    snapOsc.connect(snapGain)
    snapGain.connect(ctx.destination)
    snapOsc.start(now)
    snapOsc.stop(now + 0.08)

    // 2. High harmonic gold-plated silver filigree chime (4200Hz)
    const chimeOsc = ctx.createOscillator()
    const chimeGain = ctx.createGain()
    chimeOsc.type = 'sine'
    chimeOsc.frequency.setValueAtTime(4200, now + 0.02)

    chimeGain.gain.setValueAtTime(0.0001, now + 0.02)
    chimeGain.gain.linearRampToValueAtTime(0.09, now + 0.025)
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)

    chimeOsc.connect(chimeGain)
    chimeGain.connect(ctx.destination)
    chimeOsc.start(now + 0.02)
    chimeOsc.stop(now + 0.55)
  }

  const activeDesign = CASKET_DESIGNS[selectedShape]

  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-stone-800 bg-neutral-950 text-stone-200 transition-all duration-700',
        className
      )}
      aria-label="Xưởng Tráp Đậu Bạc Thếp Vàng Định Công GuHomes"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-900/20 via-neutral-950 to-stone-900/40 opacity-70" />
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-yellow-500/10 blur-3xl" />

      <div className="relative z-10 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
        {/* Header Tag */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800/80 pb-6">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-amber-400 shadow-sm shadow-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-stone-950 animate-ping" />
            </span>
            <span className="font-mono text-xs tracking-widest text-amber-300 uppercase">
              Bespoke Silver Filigree Atelier · GU-FILIGREE-2026-X
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-stone-400">
            <span>Sợi Bạc 0.12mm Se Đôi</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Thếp Vàng Quỳ 24K Kiêu Kỵ</span>
            <span className="h-3 w-px bg-stone-700" />
            <span>Then Cài Cẩm Thạch Tự Nhiên</span>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl md:text-5xl">
              Xưởng Tráp Đậu Bạc Thếp Vàng Định Công
            </h2>
            <p className="mt-2 text-lg font-light text-amber-300/80">
              Kỹ Nghệ Đậu Bạc Thăng Long Ngàn Năm, Sợi Bạc Siêu Mảnh & Then Cài Cẩm Thạch
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-relaxed text-stone-300 sm:text-base">
              Nghệ thuật kim hoàn cung đình Thăng Long xưa được tái hiện trọn vẹn trong chiếc tráp đựng trang sức gia bảo.
              Từng sợi bạc ta nguyên chất 999 được rút mảnh như sợi tóc 0.12mm, se đôi và uốn tay thành hàng ngàn
              mắt lưới hoa cúc dây mây cuộn rồi hàn vảy lửa đèn khò.
              Toàn bộ tráp được thếp 5 lớp vàng quỳ 24K Kiêu Kỵ, lòng tráp bọc nhung the lụa dệt tay và khóa then đồng
              hình phượng cài ngọc cẩm thạch tự nhiên.
            </p>
          </div>

          {/* Sound Trigger */}
          <div className="flex flex-col items-start justify-between rounded-2xl border border-stone-800 bg-neutral-900/60 p-5 backdrop-blur-md lg:col-span-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Thử nghiệm then cài cơ khí
              </span>
              <h4 className="mt-1 font-serif text-sm text-stone-200">
                Tiếng Khóa Then Đồng Cài Ngọc
              </h4>
              <p className="mt-1 text-xs text-stone-400">
                Lắng nghe tiếng đanh khẽ khi then cài đồng ngậm ngọc cẩm thạch đóng khít vào ngàm bạc.
              </p>
            </div>
            <button
              onClick={playClaspSound}
              className={cn(
                'mt-4 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl text-xs font-semibold transition-all',
                isPlayingClasp
                  ? 'bg-amber-400 text-stone-950 scale-95 shadow-lg shadow-amber-400/30'
                  : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
              )}
            >
              {isPlayingClasp ? 'Then Cài Đã Khóa Êm Ái...' : 'Đóng Thử Then Cài Khóa Tráp'}
            </button>
          </div>
        </div>

        {/* 20x Microscope Zoom & Design Switcher */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-neutral-900/70 p-6 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Soi từng mối hàn vảy lửa
              </span>
              <h3 className="font-serif text-lg text-stone-100">
                Ba Kiểu Dáng Tráp Đậu Bạc Cung Đình
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(CASKET_DESIGNS) as CasketShape[]).map((key) => {
                const item = CASKET_DESIGNS[key]
                const isActive = selectedShape === key
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedShape(key)}
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

          {/* Interactive Visual & Magnifier Controls */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-black/60 p-8 text-center overflow-hidden">
                {/* Visual Representation of Filigree Casket */}
                <div
                  className="relative flex h-52 w-full max-w-sm items-center justify-center transition-transform duration-500"
                  style={{ transform: `scale(${1 + (microscopeZoom - 1) * 0.06})` }}
                >
                  <div className="relative flex flex-col items-center justify-center">
                    {/* Jade Clasp on Top */}
                    <div className="absolute -top-6 h-8 w-12 rounded-full border-2 border-amber-400/80 bg-emerald-700 shadow-md flex items-center justify-center z-20">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                    </div>

                    {/* Casket Lid & Box */}
                    <div className="relative h-36 w-52 rounded-2xl border-2 border-amber-400 bg-gradient-to-tr from-amber-600 via-amber-300 to-yellow-500 shadow-2xl flex flex-col items-center justify-between p-3 overflow-hidden">
                      {/* Filigree Wire Texture Pattern Overlay */}
                      <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900 via-yellow-700 to-stone-950 pointer-events-none" />
                      <div className="z-10 flex justify-between w-full">
                        <span className="font-mono text-[8px] text-stone-950 font-bold uppercase tracking-widest">
                          ĐỊNH CÔNG · BẠC 999
                        </span>
                        <span className="font-mono text-[8px] text-stone-950 font-bold">
                          {microscopeZoom}X ZOOM
                        </span>
                      </div>
                      <div className="z-10 text-center">
                        <span className="font-serif text-sm font-semibold text-stone-950 tracking-wider">
                          {activeDesign.name}
                        </span>
                        <p className="font-mono text-[9px] text-stone-900 mt-0.5">
                          {activeDesign.filigreeWireGauge}
                        </p>
                      </div>
                      <div className="z-10 border-t border-amber-900/40 w-full pt-1 flex justify-between">
                        <span className="font-mono text-[7px] text-stone-900 uppercase">THẾP VÀNG 24K</span>
                        <span className="font-mono text-[7px] text-stone-900 uppercase">NGỌC CẨM THẠCH</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Microscope Zoom Buttons */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="font-mono text-[11px] text-stone-400 mr-2">Kính soi sợi bạc:</span>
                  {[1, 5, 10, 20].map((zoom) => (
                    <button
                      key={zoom}
                      onClick={() => setMicroscopeZoom(zoom)}
                      className={cn(
                        'min-h-[36px] rounded-md px-3 text-xs font-mono transition-colors',
                        microscopeZoom === zoom
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-stone-800 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      {zoom}X
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Design Specs */}
            <div className="lg:col-span-5">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Thông số chế tác độc bản
              </span>
              <h4 className="mt-2 font-serif text-2xl text-stone-100">{activeDesign.name}</h4>
              <p className="mt-3 text-xs leading-relaxed text-stone-300">{activeDesign.description}</p>

              <div className="mt-5 space-y-2.5 rounded-xl border border-stone-800 bg-black/40 p-4">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Quy cách sợi bạc ta:</span>
                  <span className="font-mono font-medium text-amber-300">{activeDesign.filigreeWireGauge}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Thời gian se sợi & hàn:</span>
                  <span className="font-mono font-medium text-stone-200">{activeDesign.craftingDays} Ngày Công Mỹ Nghệ</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Lớp phủ bề mặt:</span>
                  <span className="text-stone-300 text-right max-w-[200px]">{activeDesign.goldGilding}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-stone-400">Then cài & ngọc quý:</span>
                  <span className="text-amber-200 text-right max-w-[200px]">{activeDesign.gemstoneClasp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Craft Traditions */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">I</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Kéo Rút Sợi Bạc 0.12mm Mảnh Như Tóc</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Thỏi bạc ta 999 được nghệ nhân kéo qua 32 lỗ bàn kéo thép tôi cứng, mỗi lần kéo đường kính giảm
              từng phần mười milimet, đạt đến độ dẻo dai tuyệt đối không đứt gãy.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">II</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Hàn Vảy Bạc Lửa Đèn Khò Tinh Vi</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Nghệ nhân dùng bột vảy bạc trộn nước hàn quét lên các mối nối, thổi ngọn lửa đèn khò nung chảy vảy hàn
              mà không làm biến dạng các sợi bạc mảnh, đòi hỏi kinh nghiệm trên 30 năm trong nghề.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-neutral-900/60 p-6">
            <span className="font-serif text-2xl text-amber-500">III</span>
            <h4 className="mt-2 font-serif text-base text-stone-100">Thếp Vàng Quỳ 24K Làng Kiêu Kỵ</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">
              Từng lá vàng quỳ đập mỏng tang được nhấc bằng chổi lông thỏ và áp lên lớp keo sơn ta then,
              tạo độ bám vĩnh cửu và sắc vàng óng ả sâu thẳm đậm chất hoàng tộc phương Đông.
            </p>
          </div>
        </div>

        {/* Custom Engraving Order Form */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-gradient-to-r from-amber-950/40 via-stone-900 to-black p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400">
                Chế tác gia bảo truyền đời
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100">
                Đặt May Đo Tráp Đậu Bạc Khắc Tên Bằng Vàng Lá 24K
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Mỗi tráp đậu bạc hoàn thiện đều được lót nhung the màu huyết dụ, mặt trong nắp tráp dập nổi tên chủ nhân
                bằng vàng lá 24K kèm giấy kiểm định tuổi bạc và ngọc phỉ thúy từ viện giám định đá quý quốc gia.
              </p>
            </div>

            <div className="lg:col-span-5">
              {orderSubmitted ? (
                <div className="rounded-xl border border-amber-500/40 bg-amber-900/30 p-4 text-center">
                  <p className="font-serif text-sm font-medium text-amber-200">
                    Đã ghi nhận yêu cầu may đo tráp đậu bạc
                  </p>
                  <p className="mt-1 text-xs text-stone-300">
                    Nghệ nhân trưởng Định Công GuHomes sẽ liên hệ để trao đổi chi tiết về hoa văn và chữ khắc.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSubmitted(true)
                  }}
                  className="flex flex-col gap-3"
                >
                  <label htmlFor={`${formId}-filigree-phone`} className="sr-only">
                    Số điện thoại và tên chủ nhân
                  </label>
                  <input
                    id={`${formId}-filigree-phone`}
                    type="text"
                    required
                    placeholder="Họ tên & Số điện thoại chủ nhân..."
                    className="min-h-[44px] w-full rounded-xl border border-stone-700 bg-black/60 px-4 py-2.5 text-xs text-stone-200 placeholder:text-stone-500 focus:border-amber-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-500"
                  >
                    <span>Đăng Ký May Đo Tráp Đậu Bạc</span>
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
