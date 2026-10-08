'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type CelestialTarget = 'moon' | 'saturn' | 'orion'

interface CelestialDetail {
  id: CelestialTarget
  name: string
  scientificName: string
  distance: string
  magnification: string
  description: string
  eyepieceView: {
    bgGlow: string
    mainVisual: string
    detailNotes: string
  }
}

const CELESTIAL_TARGETS: Record<CelestialTarget, CelestialDetail> = {
  moon: {
    id: 'moon',
    name: 'Mặt Trăng & Hố Va Chạm Tycho',
    scientificName: 'Tycho Crater (Luna Surface)',
    distance: '384.400 km',
    magnification: '180X Quang Học Takahashi',
    description: 'Chi tiết vành miệng hố va chạm đường kính 86km với các tia sáng văng xa hàng ngàn kilômét trên nền đá xám bazan cổ đại.',
    eyepieceView: {
      bgGlow: 'from-stone-200/20 via-stone-800 to-black',
      mainVisual: 'Trăng khuyết chi tiết vết nứt bề mặt cực kỳ sắc nét',
      detailNotes: 'Bộ lọc phân cực chống chói quang học truyền qua 99.5% ánh sáng tự nhiên.',
    },
  },
  saturn: {
    id: 'saturn',
    name: 'Sao Thổ & Vành Đai Cassini',
    scientificName: 'Saturn & Cassini Division',
    distance: '1.4 tỷ km',
    magnification: '250X Triplet Apochromat',
    description: 'Hàng triệu mảnh băng đá phản chiếu ánh mặt trời tạo nên vành đai mỏng lấp lánh nghiêng 27 độ tuyệt mỹ.',
    eyepieceView: {
      bgGlow: 'from-amber-300/20 via-stone-900 to-black',
      mainVisual: 'Quả cầu khí màu vàng nhạt bao quanh bởi 3 tầng vành đai băng',
      detailNotes: 'Ống kính TOA-150B triệt tiêu hoàn toàn quang sai sắc và biến dạng cầu viền.',
    },
  },
  orion: {
    id: 'orion',
    name: 'Tinh Vân Lớn Lạp Hộ (M42)',
    scientificName: 'Messier 42 (Great Orion Nebula)',
    distance: '1.344 năm ánh sáng',
    magnification: '90X Trường Rộng (Wide-Field)',
    description: 'Cái nôi sinh ra hàng trăm ngôi sao mới trong vũ trụ với màn sương mây khí hydro và oxy phát sáng rực rỡ.',
    eyepieceView: {
      bgGlow: 'from-purple-500/20 via-indigo-950 to-black',
      mainVisual: 'Đám mây khí phát xạ cánh bướm tím ngọc bích bồng bềnh',
      detailNotes: 'Kính thiên văn đặt trên bệ đá granite nguyên khối không rung lắc dù gió sông thổi mạnh.',
    },
  },
}

export function SaigonAstronomyObservatoryRetractableDomeVault({ className }: { className?: string }) {
  const componentId = useId()
  const [domeRotation, setDomeRotation] = useState<number>(106) // 106° East (Saigon longitude)
  const [isDomeOpen, setIsDomeOpen] = useState<boolean>(true)
  const [activeTarget, setActiveTarget] = useState<CelestialTarget>('saturn')
  const [trackingActive, setTrackingActive] = useState<boolean>(true)

  const currentTarget = CELESTIAL_TARGETS[activeTarget]

  const handleRotateDome = (angle: number) => {
    setDomeRotation((prev) => (prev + angle + 360) % 360)
  }

  return (
    <section
      id={`astronomy-observatory-vault-${componentId}`}
      aria-label="Đài quan sát thiên văn mái vòm trượt tư gia GuHomes"
      className={cn(
        'relative w-full overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-indigo-500/30 selection:text-indigo-200',
        className
      )}
    >
      {/* Background Starlight & Cosmic Aura */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-b from-indigo-600/30 via-sky-800/10 to-transparent blur-[140px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-6 border-b border-stone-800/80 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
              01 / ĐÀI THIÊN VĂN TƯ GIA PENTHOUSE &amp; DINH THỰ
            </div>
            <h2 className="mt-5 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl leading-tight">
              Đài Quan Sát Thiên Văn Mái Vòm Trượt Kính Cong 360° &amp; Trụ Granite Khử Chấn
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-stone-400 lg:text-lg">
              Trên tầng cao nhất của dinh thự nhìn ra bầu trời Sài Gòn, GuHomes chế tác đài thiên văn cá nhân với mái vòm
              kính cong Ø3.6m điều khiển cơ điện tử trượt mở siêu êm &lt; 15 dBA. Bệ kính đúc từ cột đá granite nguyên khối
              cắm thẳng vào dầm chịu lực, mang kính viễn vọng khúc xạ Takahashi TOA-150B định vị vi tính bám sát từng quỹ
              đạo hành tinh và tinh vân vũ trụ.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm lg:min-w-[290px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>TỌA ĐỘ THIÊN VĂN SÀI GÒN</span>
              <span className="text-indigo-400 font-bold">10.7769° N, 106.7009° E</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">MÁI VÒM KÍNH</span>
                <span className="font-mono text-base font-medium text-indigo-300">Ø3.6M 360°</span>
              </div>
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">ĐỘ ỒN ĐỘNG CƠ</span>
                <span className="font-mono text-base font-medium text-emerald-300">&lt; 15 dBA</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 italic">
              * Kính quang học sưởi nhiệt màng nano chống đọng sương mùa mưa Sài Gòn.
            </div>
          </div>
        </div>

        {/* Section 1: Điều Khiển Mái Vòm 360° & Mô Phỏng Thị Kính Takahashi */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Eyepiece Simulated Celestial View (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">
                    THỊ KÍNH KHÚC XẠ QUANG HỌC TAKAHASHI TOA-150B
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-light text-stone-100">
                    Góc Nhìn Thực Tế Thị Kính 2-inch
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono text-stone-300">
                    {trackingActive ? 'TỰ BÁM QUỸ ĐẠO' : 'CỐ ĐỊNH'}
                  </span>
                </div>
              </div>

              {/* Target Selector Buttons */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {(Object.keys(CELESTIAL_TARGETS) as CelestialTarget[]).map((tgtKey) => {
                  const tgt = CELESTIAL_TARGETS[tgtKey]
                  const isSelected = activeTarget === tgtKey
                  return (
                    <button
                      key={tgt.id}
                      type="button"
                      onClick={() => setActiveTarget(tgtKey)}
                      className={cn(
                        'flex flex-col items-center justify-center rounded-xl p-3.5 text-center transition-all duration-300 border min-h-[75px]',
                        isSelected
                          ? 'border-indigo-400 bg-indigo-500/20 text-indigo-200 shadow-lg ring-1 ring-indigo-400/40'
                          : 'border-stone-800 bg-stone-950/70 text-stone-400 hover:text-stone-200 hover:bg-stone-900'
                      )}
                    >
                      <span className="font-serif text-sm font-medium">{tgt.name.split('&')[0]}</span>
                      <span className="text-[10px] font-mono text-stone-400 mt-1">{tgt.magnification.split(' ')[0]}</span>
                    </button>
                  )
                })}
              </div>

              {/* Circular Telescope Eyepiece Visualizer */}
              <div className="relative my-8 flex h-72 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950">
                {/* Brass Eyepiece Circular Rim */}
                <div className="relative flex h-60 w-60 items-center justify-center rounded-full border-4 border-amber-600/60 bg-black shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] overflow-hidden">
                  {/* Subtle Crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="h-full w-px bg-stone-400" />
                    <div className="h-px w-full bg-stone-400" />
                  </div>

                  {/* Celestial Body Graphic */}
                  {activeTarget === 'moon' && (
                    <div className="relative h-44 w-44 rounded-full bg-gradient-to-br from-stone-200 via-stone-300 to-stone-600 shadow-2xl flex items-center justify-center overflow-hidden">
                      {/* Crater textures */}
                      <div className="absolute top-10 left-12 h-8 w-8 rounded-full border border-stone-500/60 bg-stone-400/50" />
                      <div className="absolute bottom-8 right-14 h-12 w-12 rounded-full border border-stone-500/60 bg-stone-400/40 shadow-inner" />
                      <div className="absolute bottom-16 left-8 h-6 w-6 rounded-full border border-stone-500/60 bg-stone-400/30" />
                    </div>
                  )}

                  {activeTarget === 'saturn' && (
                    <div className="relative flex items-center justify-center">
                      {/* Rings */}
                      <div className="absolute h-12 w-52 rounded-full border-4 border-amber-300/60 bg-amber-100/10 rotate-[-22deg] shadow-lg" />
                      {/* Planet body */}
                      <div className="relative z-10 h-28 w-28 rounded-full bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-600 shadow-xl" />
                    </div>
                  )}

                  {activeTarget === 'orion' && (
                    <div className="relative flex items-center justify-center">
                      <div className="h-44 w-44 rounded-full bg-gradient-to-tr from-purple-600/40 via-indigo-500/30 to-pink-500/20 blur-xl animate-pulse" />
                      <div className="absolute h-2 w-2 rounded-full bg-white shadow-lg animate-ping" />
                      <div className="absolute top-14 left-16 h-1.5 w-1.5 rounded-full bg-cyan-200" />
                      <div className="absolute bottom-16 right-20 h-1.5 w-1.5 rounded-full bg-amber-200" />
                    </div>
                  )}

                  {/* Shutter if dome is closed */}
                  {!isDomeOpen && (
                    <div className="absolute inset-0 z-30 bg-stone-900/95 flex flex-col items-center justify-center text-center p-4">
                      <span className="text-xs font-mono text-amber-400">MÁI VÒM ĐANG ĐÓNG</span>
                      <span className="text-[11px] text-stone-400 mt-1">Mở mái vòm để kính tiếp nhận ánh sáng vũ trụ</span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-3 left-4 text-[11px] font-mono text-stone-400">
                  MỤC TIÊU: <strong className="text-indigo-300">{currentTarget.name}</strong> &middot; KHOẢNG CÁCH:{' '}
                  {currentTarget.distance}
                </div>
              </div>

              {/* Target Description Card */}
              <div className="space-y-2 rounded-xl border border-stone-800/80 bg-stone-950/70 p-4 text-xs">
                <div className="flex justify-between items-center border-b border-stone-800/60 pb-2">
                  <span className="font-serif text-sm text-indigo-200">{currentTarget.scientificName}</span>
                  <span className="font-mono text-amber-300">{currentTarget.magnification}</span>
                </div>
                <p className="text-stone-300 font-light leading-relaxed">{currentTarget.description}</p>
                <div className="text-[11px] text-stone-400 italic pt-1">{currentTarget.eyepieceView.detailNotes}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Dome 360° Controls & Granite Pillar Isolator (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/80 p-8 lg:col-span-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
                  BỘ ĐIỀU KHIỂN CƠ ĐIỆN TỬ VÒM
                </span>
                <span className="text-xs font-mono text-stone-500">CANBUS PLC</span>
              </div>

              <h4 className="mt-4 font-serif text-xl font-light text-stone-100">
                Góc Xoay Mái Vòm &amp; Tọa Độ Đông Tây
              </h4>
              <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                Hệ thống bánh răng vành xuyến thép đúc tôi thấm cacbon di chuyển êm dịu, xoay vòm 360° đồng bộ cùng tọa
                độ di chuyển của kính viễn vọng.
              </p>

              {/* Dome Open/Close and Rotation Controls */}
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-stone-800 bg-stone-950/90 p-4">
                  <span className="text-xs font-mono text-stone-300">CỬA MÁI VÒM KÍNH:</span>
                  <button
                    type="button"
                    onClick={() => setIsDomeOpen(!isDomeOpen)}
                    className={cn(
                      'px-4 py-2 text-xs font-mono rounded-lg transition-all border min-h-[44px]',
                      isDomeOpen
                        ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'border-amber-500/50 bg-amber-500/20 text-amber-300 font-bold'
                    )}
                  >
                    {isDomeOpen ? 'ĐANG MỞ 100%' : 'ĐANG ĐÓNG KÍN'}
                  </button>
                </div>

                <div className="rounded-xl border border-stone-800 bg-stone-950/90 p-4 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-stone-400">GÓC PHƯƠNG VỊ XOAY VÒM:</span>
                    <span className="text-indigo-300 font-bold text-sm">{domeRotation}° (ĐÔNG BẮC)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleRotateDome(-15)}
                      className="rounded-lg border border-stone-800 bg-stone-900 py-2.5 text-xs font-mono text-stone-300 hover:border-indigo-500 hover:text-indigo-300 min-h-[44px]"
                    >
                      &larr; XOAY TRÁI 15°
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRotateDome(15)}
                      className="rounded-lg border border-stone-800 bg-stone-900 py-2.5 text-xs font-mono text-stone-300 hover:border-indigo-500 hover:text-indigo-300 min-h-[44px]"
                    >
                      XOAY PHẢI 15° &rarr;
                    </button>
                  </div>
                </div>

                {/* Tracking Toggle */}
                <div className="flex items-center justify-between rounded-xl border border-stone-800 bg-stone-950/90 p-4 text-xs font-mono">
                  <span className="text-stone-400">ĐỘNG CƠ BÁM THIÊN VĂN:</span>
                  <button
                    type="button"
                    onClick={() => setTrackingActive(!trackingActive)}
                    className="text-indigo-400 hover:underline min-h-[44px] flex items-center"
                  >
                    {trackingActive ? 'TẮT TỰ ĐỘNG BÁM' : 'BẬT TỰ ĐỘNG BÁM'}
                  </button>
                </div>
              </div>

              {/* Granite Column Foundation */}
              <div className="mt-5 rounded-xl border border-stone-800 bg-stone-950/90 p-4 space-y-2 text-xs">
                <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider block">
                  KẾT CẤU BỆ ĐÁ GRANITE KHỬ CHẤN
                </span>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Khối Lượng Trụ Đá:</span>
                  <span className="font-mono text-stone-200">1.8 Tấn Đá Granite Kim Sa</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-400">Cách Ly Rung Động:</span>
                  <span className="font-mono text-emerald-400">Sylomer Pad triệt rung 99.8%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-800 pt-4 text-xs font-mono text-stone-500 flex items-center justify-between">
              <span>BẢO HÀNH ĐỘNG CƠ CƠ ĐIỆN TỬ 10 NĂM</span>
              <span className="text-indigo-400 font-medium">BẢN QUYỀN GUHOMES</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 lg:p-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h4 className="font-serif text-xl font-light text-stone-100">
              Khảo sát hướng nhìn thiên văn và kết cấu tải trọng trên mái nhà của bạn
            </h4>
            <p className="mt-1 text-xs text-stone-400 font-light">
              KTS GuHomes cùng chuyên gia thiên văn học sẽ đo đạc độ ô nhiễm ánh sáng và lập mô phỏng 3D đài quan sát.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-5 py-2.5 text-xs font-medium text-stone-950 transition-colors hover:bg-stone-200 min-h-[44px]"
            >
              <span>Đăng ký khảo sát đài thiên văn</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-5 py-2.5 text-xs font-medium text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100 min-h-[44px]"
            >
              <span>Dự toán lắp đặt mái kính</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
