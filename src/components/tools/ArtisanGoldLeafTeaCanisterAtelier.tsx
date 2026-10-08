'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface TeaRetentionYear {
  year: number
  essentialOilRetention: string
  moistureContent: string
  flavorIntegrity: string
  noteDescription: string
}

const AGING_METRICS: TeaRetentionYear[] = [
  {
    year: 1,
    essentialOilRetention: '99.8%',
    moistureContent: '4.2% (Hoàn hảo)',
    flavorIntegrity: '100/100',
    noteDescription: 'Giữ nguyên hương cốm non và mật ong rừng nguyên bản của búp trà Shan Tuyết Tà Xùa.',
  },
  {
    year: 3,
    essentialOilRetention: '98.5%',
    moistureContent: '4.5% (Tối ưu)',
    flavorIntegrity: '98/100',
    noteDescription: 'Quá trình lên men nội sinh chậm rãi, vị chát dịu đi, hậu ngọt sâu và đượm hương quả chín mọng.',
  },
  {
    year: 5,
    essentialOilRetention: '96.2%',
    moistureContent: '4.8% (Cực phẩm)',
    flavorIntegrity: '97/100',
    noteDescription: 'Hương trầm và gỗ tuyết tùng ngấm sâu vào búp trà cổ thụ, nước trà chuyển màu hổ phách sóng sánh.',
  },
]

interface MotifDetail {
  id: string
  name: string
  theme: string
  meaning: string
  carvingHours: string
}

const CARVING_MOTIFS: MotifDetail[] = [
  {
    id: 'tu-quy-xuan-ha-thu-dong',
    name: 'Tứ Quý Trúc Mai Tùng Cúc',
    theme: 'Bốn mùa thuận hòa vạn sự hanh thông',
    meaning: 'Nét chạm lộng uyển chuyển dát vàng quỳ 24K tôn vinh phong thái cốt cách người quân tử.',
    carvingHours: '48 giờ chạm nổi thủ công',
  },
  {
    id: 'song-nuoc-song-sai-gon',
    name: 'Sóng Nước Phù Sa Sông Sài Gòn',
    theme: 'Thủy khí tài lộc tuần hoàn bất tận',
    meaning: 'Những đường vân sóng nước nhấp nhô mềm mại gợi nhớ khởi nguyên thịnh vượng của vùng đất Nam Bộ.',
    carvingHours: '56 giờ gò nổi đồng thau',
  },
  {
    id: 'lien-hoa-an-nhien',
    name: 'Bạch Liên Hoa An Nhiên Thiền Định',
    theme: 'Tâm tĩnh như nước hương đượm dài lâu',
    meaning: 'Bông sen nở giữa hồ ngọc, đem lại bình an thanh lọc tâm hồn trong mỗi tuần trà tri âm.',
    carvingHours: '42 giờ chạm khắc tinh vi',
  },
]

export function ArtisanGoldLeafTeaCanisterAtelier({ className }: { className?: string }) {
  const componentId = useId()
  const [activeYearIndex, setActiveYearIndex] = useState<number>(0)
  const [selectedMotifId, setSelectedMotifId] = useState<string>('tu-quy-xuan-ha-thu-dong')
  const [pistonPosition, setPistonPosition] = useState<'open' | 'sliding' | 'sealed'>('sealed')
  const [ownerName, setOwnerName] = useState<string>('')
  const [vipCode, setVipCode] = useState<string | null>(null)
  const [isSealing, setIsSealing] = useState<boolean>(false)

  const currentMetric = AGING_METRICS[activeYearIndex] ?? AGING_METRICS[0]!
  const currentMotif = CARVING_MOTIFS.find((m) => m.id === selectedMotifId) ?? CARVING_MOTIFS[0]!

  const testPistonSlide = () => {
    setPistonPosition('open')
    setTimeout(() => {
      setPistonPosition('sliding')
      // Gentle air compression sound
      try {
        if (typeof window !== 'undefined') {
          const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
          if (AudioCtx) {
            const ctx = new AudioCtx()
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'sine'
            osc.frequency.setValueAtTime(150, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 1.2)
            gain.gain.setValueAtTime(0.04, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 1.2)
          }
        }
      } catch {
        // Safe fallback
      }
    }, 400)

    setTimeout(() => {
      setPistonPosition('sealed')
    }, 1600)
  }

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSealing(true)

    // Audio chime feedback
    try {
      if (typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
          osc.frequency.exponentialRampToValueAtTime(1046.5, ctx.currentTime + 0.4) // C6
          gain.gain.setValueAtTime(0.07, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start()
          osc.stop(ctx.currentTime + 0.6)
        }
      }
    } catch {
      // Audio fallback
    }

    setTimeout(() => {
      setIsSealing(false)
      const randomSuffix = Math.floor(1000 + Math.random() * 9000)
      setVipCode(`GU-TEACAN-2026-${randomSuffix}`)
    }, 600)
  }

  return (
    <section
      id={`gold-leaf-tea-canister-atelier-${componentId}`}
      aria-label="Bộ hũ trà đồng thau thếp vàng quỳ kín khí GuHomes"
      className={cn(
        'relative w-full overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200',
        className
      )}
    >
      {/* Background Gold Leaf Radiance */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-600/30 via-yellow-700/10 to-transparent blur-[140px]" />
        <div className="absolute -bottom-20 left-10 h-[450px] w-[450px] rounded-full bg-gradient-to-tl from-stone-800/40 via-amber-900/15 to-transparent blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-6 border-b border-stone-800/80 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              03 / TRÀ KHÍ THỦ CÔNG ĐỘC BẢN THẾP VÀNG
            </div>
            <h2 className="mt-5 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl leading-tight">
              Bộ Hũ Trà Đồng Thau Gò Tay Thếp Vàng Quỳ 24K &amp; Nắp Piston Khí Nén
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-stone-400 lg:text-lg">
              Chế tác thủ công từ đồng đỏ nguyên chất và đồng thau, nắp hai tầng tiện CNC dung sai chỉ 0.02mm tạo hiệu
              ứng trượt êm tự hít chặt kín khí 100%. Lớp ngoài thếp vàng quỳ 24K Kiêu Kỵ truyền thống, ruột lót gỗ Tuyết
              Tùng tự nhiên hút ẩm dư thừa, gìn giữ trọn vẹn tinh dầu quý của trà Shan Tuyết cổ thụ qua nhiều năm tháng.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm lg:min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>ĐỘ CHÍNH XÁC NẮP PISTON</span>
              <span className="text-amber-400 font-bold">DUNG SAI 0.02MM</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">VÀNG NGOẠI DIỆN</span>
                <span className="font-mono text-xs font-medium text-amber-300">Vàng Quỳ 24K Kiêu Kỵ</span>
              </div>
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">LÓT BÊN TRONG</span>
                <span className="font-mono text-xs font-medium text-stone-200">Gỗ Tuyết Tùng Tự Nhiên</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 italic">
              * Khí nén tự động đẩy bọt khí ra ngoài, khóa ẩm chống mốc nhiệt đới.
            </div>
          </div>
        </div>

        {/* Section 1: Thử Nghiệm Piston Trượt Tự Hít Chặt & Lão Hóa Trà 5 Năm */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Interactive Piston Simulator & Tea Aging (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                    CƠ CHẾ KÍN KHÍ TỰ ĐỘNG CHỐNG ẨM
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-light text-stone-100">
                    Mô Phỏng Nắp Piston Trượt Êm Tự Động Hít Chặt
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={testPistonSlide}
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-mono text-amber-300 hover:bg-amber-500/20 transition-all min-h-[44px]"
                >
                  THỬ TRƯỢT NẮP HŨ &sim;
                </button>
              </div>

              {/* Graphic Tea Canister with Moving Lid */}
              <div className="relative my-8 flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950">
                {/* Canister Body */}
                <div className="relative z-10 flex flex-col items-center">
                  {/* Moving Lid with Golden Foil */}
                  <div
                    style={{
                      transform:
                        pistonPosition === 'open'
                          ? 'translateY(-48px)'
                          : pistonPosition === 'sliding'
                          ? 'translateY(-16px)'
                          : 'translateY(0)',
                      transition:
                        pistonPosition === 'sliding'
                          ? 'transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)'
                          : 'transform 0.4s ease-out',
                    }}
                    className="h-12 w-32 rounded-t-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-300 via-amber-500 to-yellow-600 shadow-2xl flex flex-col items-center justify-center"
                  >
                    <span className="text-[8px] font-mono text-stone-950 font-bold uppercase tracking-wider">
                      VÀNG QUỲ 24K
                    </span>
                    <div className="h-1 w-12 rounded-full bg-amber-200/80 mt-0.5" />
                  </div>

                  {/* Canister Base Cylinder */}
                  <div className="h-32 w-36 rounded-b-2xl border-2 border-amber-500/80 bg-gradient-to-b from-amber-600 via-amber-800 to-stone-900 shadow-2xl flex flex-col items-center justify-between p-3">
                    <span className="text-[8px] font-mono text-amber-200">ĐỒNG ĐỎ NGUYÊN CHẤT</span>
                    <div className="h-10 w-24 rounded-lg border border-amber-400/40 bg-amber-950/40 flex items-center justify-center">
                      <span className="text-[7px] font-mono text-amber-300 text-center">
                        LÓT GỖ TUYẾT TÙNG
                        <br />
                        CHỐNG ẨM SÀI GÒN
                      </span>
                    </div>
                    <span className="text-[8px] font-mono text-stone-400">DUNG TÍCH: 250G TRÀ</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 text-[11px] font-mono text-stone-400">
                  TRẠNG THÁI NẮP:{' '}
                  <strong className="text-amber-300">
                    {pistonPosition === 'open'
                      ? 'ĐANG NHẤC MỞ'
                      : pistonPosition === 'sliding'
                      ? 'ĐANG TRƯỢT TỰ NÉN KHÍ...'
                      : 'ĐÃ KHÓA KÍN HOÀN TOÀN'}
                  </strong>
                </div>
              </div>

              {/* Aging Retention Timeline Buttons */}
              <div className="rounded-xl border border-stone-800 bg-stone-950/80 p-4">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block mb-3">
                  HIỆU QUẢ GÌN GIỮ HƯƠNG TRÀ SHAN TUYẾT THEO NĂM THÁNG:
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {AGING_METRICS.map((metric, idx) => (
                    <button
                      key={metric.year}
                      type="button"
                      onClick={() => setActiveYearIndex(idx)}
                      className={cn(
                        'flex flex-col items-center justify-center rounded-xl p-3 text-center transition-all border min-h-[64px]',
                        activeYearIndex === idx
                          ? 'border-amber-400 bg-amber-950/30 text-amber-200 ring-1 ring-amber-400/40'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      <span className="font-serif text-sm font-bold">{metric.year} NĂM LƯU HƯƠNG</span>
                      <span className="text-[11px] font-mono text-amber-300 mt-1">{metric.essentialOilRetention}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/70 text-xs text-stone-300 font-light leading-relaxed">
                  <strong className="text-amber-200">Đặc tính nước trà:</strong> {currentMetric.noteDescription}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Carving Motifs & Custom Seal Form (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/80 p-8 lg:col-span-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                  ĐỘC BẢN THẾP VÀNG KHẮC TÊN
                </span>
                <span className="text-xs font-mono text-stone-500">MÃ SỐ VIP</span>
              </div>

              {/* Carving Motif Selectors */}
              <div className="mt-5 space-y-3">
                <span className="text-xs font-mono text-stone-400 block">CHỌN HỌA TIẾT CHẠM NỔI:</span>
                {CARVING_MOTIFS.map((motif) => {
                  const isSelected = motif.id === selectedMotifId
                  return (
                    <button
                      key={motif.id}
                      type="button"
                      onClick={() => {
                        setSelectedMotifId(motif.id)
                        setVipCode(null)
                      }}
                      className={cn(
                        'w-full flex flex-col rounded-xl p-3.5 text-left transition-all border text-xs',
                        isSelected
                          ? 'border-amber-400 bg-amber-950/30 ring-1 ring-amber-400/40 shadow-md'
                          : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <strong className="text-stone-200 font-serif text-sm">{motif.name}</strong>
                        <span className="text-[10px] font-mono text-amber-300">{motif.carvingHours}</span>
                      </div>
                      <span className="text-[11px] text-amber-200/90 mt-1">{motif.theme}</span>
                      <p className="text-[11px] text-stone-400 font-light mt-1 leading-relaxed">{motif.meaning}</p>
                    </button>
                  )
                })}
              </div>

              {/* Form Custom Owner Seal */}
              <form onSubmit={handleCreateOrder} className="mt-6 space-y-4 pt-4 border-t border-stone-800">
                <div>
                  <label htmlFor={`owner-canister-${componentId}`} className="block text-xs font-mono text-stone-400 mb-1.5">
                    HỌ TÊN GIA CHỦ DẬP TRIỆN ĐỒNG DÁT VÀNG:
                  </label>
                  <input
                    id={`owner-canister-${componentId}`}
                    type="text"
                    value={ownerName}
                    onChange={(e) => {
                      setOwnerName(e.target.value)
                      setVipCode(null)
                    }}
                    placeholder="VD: Trịnh Phủ Gia Bảo — Hương Trà Di Tích"
                    className="w-full rounded-xl border border-stone-700 bg-stone-950/90 px-4 py-2.5 text-xs text-stone-100 placeholder:text-stone-600 focus:border-amber-500 focus:outline-none min-h-[44px]"
                  />
                </div>

                {vipCode ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-center">
                    <span className="text-[11px] font-mono text-emerald-400 block">PHIẾU CHẾ TÁC HŨ TRÀ VIP</span>
                    <span className="font-mono text-lg font-bold tracking-widest text-emerald-300 mt-1 block">
                      {vipCode}
                    </span>
                    <span className="text-[11px] text-stone-300 mt-1 block">
                      Gia chủ: <strong>{ownerName.trim() || 'Quý Khách Hàng VIP'}</strong> &middot; {currentMotif.name}
                    </span>
                    <span className="text-[10px] text-stone-500 mt-1 block">
                      Nghệ nhân Kiêu Kỵ sẽ tiến hành dát 18 lá vàng quỳ 24K thủ công lên thân hũ trà.
                    </span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSealing}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 px-6 py-3.5 text-xs font-medium text-stone-950 transition-all duration-300 hover:from-amber-500 hover:to-yellow-400 active:scale-[0.98] shadow-lg shadow-amber-900/20 disabled:opacity-50 min-h-[44px]"
                  >
                    {isSealing ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-stone-950 border-t-transparent" />
                        <span>Đang Khởi Tạo Bản Vẽ Triện Đồng...</span>
                      </>
                    ) : (
                      <>
                        <span>Khởi Tạo Hũ Trà Thửa Riêng</span>
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </form>
            </div>

            <div className="mt-6 border-t border-stone-800 pt-4 text-xs font-mono text-stone-500 flex items-center justify-between">
              <span>ĐI KÈM HỘP GỖ GỤ KHẢM ỐC XÀ CỪ</span>
              <span className="text-amber-400/90 font-medium">BẢO HÀNH KHÍ NÉN TRỌN ĐỜI</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 lg:p-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h4 className="font-serif text-xl font-light text-stone-100">
              Thưởng trà Shan Tuyết cổ thụ cùng KTS GuHomes tại Xưởng Thạnh Xuân Q.12
            </h4>
            <p className="mt-1 text-xs text-stone-400 font-light">
              Mỗi bộ hũ trà đi kèm 200g búp trà Shan Tuyết Tà Xùa thượng hạng thu hoạch trên cây trà cổ thụ 300 năm tuổi.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-5 py-2.5 text-xs font-medium text-stone-950 transition-colors hover:bg-stone-200 min-h-[44px]"
            >
              <span>Thỉnh bộ hũ trà độc bản</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-5 py-2.5 text-xs font-medium text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100 min-h-[44px]"
            >
              <span>Báo giá quà tặng đối tác</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
