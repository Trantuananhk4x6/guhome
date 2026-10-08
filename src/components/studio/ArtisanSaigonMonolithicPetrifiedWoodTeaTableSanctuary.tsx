'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PetrifiedWoodSpecimen {
  id: string
  name: string
  ageMillionYears: number
  mineralType: string
  quarryLocation: string
  weightKg: number
  mohsHardness: number
  crossSectionHue: string
  grainDescription: string
}

const SPECIMENS: PetrifiedWoodSpecimen[] = [
  {
    id: 'specimen-daklak-agate',
    name: 'Gỗ Hóa Ngọc Chalcedony Đỏ Huyết · Đắk Lắk',
    ageMillionYears: 18.5,
    mineralType: 'Opal & Chalcedony vi tinh thể',
    quarryLocation: 'Vùng trũng Ea Kar, Đắk Lắk (Miocene Cổ)',
    weightKg: 380,
    mohsHardness: 7.0,
    crossSectionHue: 'from-amber-600/30 via-red-900/40 to-stone-950',
    grainDescription: 'Vân vòng sinh trưởng gỗ cây tùng bách tiền sử lưu giữ nguyên vẹn, các ion sắt Fe3+ ngấm sâu biến đổi lõi gỗ thành đá mắt hổ lấp lánh ánh kim.',
  },
  {
    id: 'specimen-gialai-jasper',
    name: 'Gỗ Hóa Ngọc Jasper Xanh Thạch Anh · Chư Sê',
    ageMillionYears: 22.0,
    mineralType: 'Jasper & Thạch Anh Lục Bảo',
    quarryLocation: 'Thềm núi lửa Chư Sê, Gia Lai',
    weightKg: 420,
    mohsHardness: 7.2,
    crossSectionHue: 'from-emerald-700/30 via-teal-900/40 to-stone-950',
    grainDescription: 'Màu xanh lục cẩm thạch huyền bí do oxit niken và đồng thấm nhuần qua triệu năm dung nham bao bọc, bóng gương mịn như làn da ngọc nữ.',
  },
  {
    id: 'specimen-lamdong-amber',
    name: 'Gỗ Hóa Hổ Phách Vàng Mật · Di Linh',
    ageMillionYears: 15.0,
    mineralType: 'Canxit Hóa Ngọc & Silic Trầm Tích',
    quarryLocation: 'Cao nguyên Di Linh, Lâm Đồng',
    weightKg: 350,
    mohsHardness: 6.8,
    crossSectionHue: 'from-yellow-600/30 via-amber-900/40 to-stone-950',
    grainDescription: 'Thấu quang ánh sáng rực rỡ khi chiếu đèn rọi, ánh lên sắc vàng mật ong ấm cúng, bề mặt phủ lớp sáp ong rừng bảo dưỡng tự nhiên.',
  },
]

export function ArtisanSaigonMonolithicPetrifiedWoodTeaTableSanctuary({ className }: { className?: string }) {
  const formId = useId()
  const [selectedSpecimenId, setSelectedSpecimenId] = useState<string>(SPECIMENS[0]!.id)
  const [backlightActive, setBacklightActive] = useState(true)
  const [waterDripActive, setWaterDripActive] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)
  const [orderSent, setOrderSent] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const dripIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (dripIntervalRef.current) clearInterval(dripIntervalRef.current)
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

  // Realistic water droplet synth falling onto solid fossilized stone
  function playWaterDropSound() {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Short pitch sweep sine for droplet plop (1.2kHz down to 800Hz)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(1400 + Math.random() * 200, now)
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08)

    gain.gain.setValueAtTime(0.18, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.15)
  }

  function toggleWaterDrip() {
    if (waterDripActive) {
      if (dripIntervalRef.current) clearInterval(dripIntervalRef.current)
      setWaterDripActive(false)
    } else {
      setWaterDripActive(true)
      playWaterDropSound()
      dripIntervalRef.current = setInterval(() => {
        playWaterDropSound()
      }, 1800)
    }
  }

  const activeSpecimen: PetrifiedWoodSpecimen = SPECIMENS.find((s) => s.id === selectedSpecimenId) ?? SPECIMENS[0]!

  return (
    <section
      aria-label="Bàn Trà Đá Gỗ Hóa Thạch Đắk Lắk GuHomes"
      className={cn(
        'relative overflow-hidden border-y border-stone-800 bg-stone-950 py-16 lg:py-24 text-stone-100',
        className
      )}
    >
      {/* Background Mineral Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(217,119,6,0.1),transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-4 border-b border-stone-800 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-amber-600/40 bg-amber-950/40 px-3 py-0.5 text-xs font-mono uppercase tracking-widest text-amber-300">
                Artisan Monolith · Gỗ Hóa Ngọc 18 Triệu Năm
              </span>
              <span className="text-xs font-mono text-stone-400">Trọng lượng: 380kg · Độ cứng: 7.0 Mohs</span>
            </div>
            <h2 className="mt-3 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
              Bàn Trà Gỗ Hóa Thạch Đắk Lắk
              <span className="block font-sans text-lg font-normal text-amber-300/80 sm:text-xl mt-1">
                Kỳ Quan Tro Bụi Núi Lửa Triệu Năm &amp; Thấu Quang Ngọc Bích
              </span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-stone-300 font-light">
            Phiến thân cây cổ đại hóa ngọc chalcedony nguyên khối nặng 380kg được khai quật tại lòng thung lũng đá núi lửa Đắk Lắk. 
            Mặt bàn mài bóng thủ công giữ trọn vòng sinh trưởng thực vật, tích hợp khay trà âm thoát nước ngầm cùng vòi róc rách thiền định.
          </p>
        </div>

        {/* Geological Metric Indicators */}
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider">Niên đại địa chất</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">{activeSpecimen.ageMillionYears} Triệu Năm</div>
            <p className="mt-1 text-xs text-stone-400">Kỷ Miocene Cổ · Vùi lấp tro núi lửa</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider">Độ cứng khoáng vật</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">{activeSpecimen.mohsHardness} Mohs</div>
            <p className="mt-1 text-xs text-stone-400">Rắn ngang thạch anh, chống trầy tuyệt đối</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider">Tỷ trọng thể tích</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">2.68 g/cm³</div>
            <p className="mt-1 text-xs text-stone-400">Đặc quánh nguyên phiến, không rỗng nứt</p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/60 p-4 backdrop-blur-sm">
            <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider">Bảo dưỡng tự nhiên</span>
            <div className="mt-1 font-serif text-2xl text-stone-100">Sáp Ong Rừng</div>
            <p className="mt-1 text-xs text-stone-400">Nuôi dưỡng thớ ngọc ấm bóng qua năm tháng</p>
          </div>
        </div>

        {/* 3-Specimen Selector */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {SPECIMENS.map((specimen) => {
            const isSelected = selectedSpecimenId === specimen.id
            return (
              <button
                key={specimen.id}
                onClick={() => setSelectedSpecimenId(specimen.id)}
                className={cn(
                  'flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 min-h-[44px]',
                  isSelected
                    ? 'border-amber-400 bg-stone-900 shadow-xl shadow-amber-950/40 ring-1 ring-amber-400/40'
                    : 'border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-800/40'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-medium text-stone-100">{specimen.name.split('·')[0]}</span>
                  <span className="font-mono text-xs text-amber-400">{specimen.ageMillionYears}M năm</span>
                </div>
                <span className="mt-1 text-xs font-mono text-stone-400">{specimen.quarryLocation}</span>
                <span className="mt-2 text-[11px] font-mono text-amber-300/80">{specimen.mineralType}</span>
              </button>
            )
          })}
        </div>

        {/* 360° Translucency & Cross-Section Viewer */}
        <div className="mt-10 rounded-3xl border border-stone-800 bg-stone-950/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800/60">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Thử nghiệm: Chiếu sáng xuyên tâm 3000K &amp; Tiếng nước ngấm khe đá
              </span>
              <p className="text-xs text-stone-400 mt-0.5">
                Đặc tính ngọc bích thấu quang: Khi bật đèn rọi âm bàn, ánh sáng xuyên qua lớp đá 50mm làm bừng sáng vân gỗ triệu năm.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setBacklightActive(!backlightActive)}
                className={cn(
                  'rounded-xl border px-3 py-2 font-mono text-xs transition min-h-[44px]',
                  backlightActive
                    ? 'border-amber-400 bg-amber-950/50 text-amber-300 font-semibold'
                    : 'border-stone-700 bg-stone-900 text-stone-400 hover:text-stone-200'
                )}
              >
                {backlightActive ? '☀ Tắt đèn rọi thấu quang' : '🔆 Bật đèn rọi thấu quang 3000K'}
              </button>

              <button
                onClick={toggleWaterDrip}
                className={cn(
                  'rounded-xl border px-3 py-2 font-mono text-xs transition min-h-[44px]',
                  waterDripActive
                    ? 'border-cyan-400 bg-cyan-950/50 text-cyan-300 font-semibold'
                    : 'border-stone-700 bg-stone-900 text-stone-400 hover:text-stone-200'
                )}
              >
                {waterDripActive ? '💧 Dừng nước nhỏ giọt' : '💧 Nước ngấm khe đá (Audio)'}
              </button>
            </div>
          </div>

          {/* Visual Monolith Cross Section Display */}
          <div className="mt-8 relative h-72 sm:h-96 rounded-2xl border-2 border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 overflow-hidden flex items-center justify-center">
            {/* Ambient Backlight Radiance */}
            <AnimatePresence>
              {backlightActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className={cn(
                    'absolute inset-0 bg-gradient-to-tr blur-3xl pointer-events-none',
                    activeSpecimen.crossSectionHue
                  )}
                />
              )}
            </AnimatePresence>

            {/* Rotatable Monolith Slab Cutaway Graphic */}
            <motion.div
              animate={{ rotate: rotationAngle }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative flex flex-col items-center justify-center p-6 text-center"
            >
              {/* Elliptical Slab Outline with Tree Growth Rings */}
              <div
                className={cn(
                  'relative h-44 w-72 sm:h-56 sm:w-96 rounded-[5rem] border-4 transition-all duration-700 shadow-2xl flex flex-col items-center justify-center overflow-hidden',
                  backlightActive
                    ? 'border-amber-400/80 bg-stone-900/90 shadow-amber-500/20'
                    : 'border-stone-700 bg-stone-900/60'
                )}
              >
                {/* Concentric Annual Rings (Silicified Growth Rings) */}
                <div className="absolute inset-4 rounded-[4rem] border border-amber-500/20" />
                <div className="absolute inset-8 rounded-[3.5rem] border border-amber-500/30" />
                <div className="absolute inset-12 rounded-[3rem] border border-amber-500/40" />
                <div className="absolute inset-16 rounded-[2.5rem] border border-amber-500/50" />

                {/* Flush Tea Drain Center Tray Graphic */}
                <div className="relative z-10 h-10 w-28 rounded-lg border border-stone-600 bg-stone-950/80 flex items-center justify-center">
                  <span className="font-mono text-[9px] text-amber-300/80">Khay rãnh thoát nước ngầm</span>
                </div>

                {waterDripActive && (
                  <motion.div
                    animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    className="absolute h-8 w-8 rounded-full border border-cyan-400/60 pointer-events-none"
                  />
                )}
              </div>

              {/* Angle Control Indicators */}
              <div className="mt-4 flex items-center gap-2">
                <button
                  onClick={() => setRotationAngle((prev) => prev - 45)}
                  className="rounded border border-stone-700 bg-stone-800 px-2 py-1 font-mono text-xs text-stone-300 hover:text-white"
                >
                  ↺ Xoay trái 45°
                </button>
                <span className="font-mono text-xs text-amber-400 px-2">Góc xoay: {rotationAngle}°</span>
                <button
                  onClick={() => setRotationAngle((prev) => prev + 45)}
                  className="rounded border border-stone-700 bg-stone-800 px-2 py-1 font-mono text-xs text-stone-300 hover:text-white"
                >
                  Xoay phải 45° ↻
                </button>
              </div>
            </motion.div>
          </div>

          {/* Geological Lore & Structure Details */}
          <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900/80 p-5 sm:p-6 backdrop-blur-sm">
            <h3 className="font-serif text-xl text-stone-100">{activeSpecimen.name}</h3>
            <p className="mt-1 font-mono text-xs text-amber-400">{activeSpecimen.quarryLocation}</p>
            <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light border-t border-stone-800/80 pt-3">
              {activeSpecimen.grainDescription}
            </p>
          </div>
        </div>

        {/* 3 Architectural Tea Virtues */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              01 · Khay Thoát Nước Ngầm Âm Đá
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Không Vết Ghép, Không Rò Rỉ</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Được soi rãnh trực tiếp bằng mũi cắt kim cương công nghệ CNC 5 trục, nước trà thừa tự chảy êm ái qua đường ống đồng ẩn dưới chân đế, 
              giữ mặt bàn luôn khô ráo và tĩnh lặng tuyệt đối.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              02 · Kháng Nhiệt Ấm Trà Nóng
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Chịu Nhiệt 1.200°C Không Nứt Vỡ</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Do từng được tôi luyện trong lòng dung nham núi lửa cổ, đá gỗ hóa thạch hoàn toàn không bị ố vàng hay rạn nứt 
              khi đặt trực tiếp ấm nước sôi hoặc tẩu trầm hương đang cháy lên bề mặt.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              03 · Chân Bàn Thép Rèn Đen Mờ
            </span>
            <h4 className="mt-2 font-serif text-lg text-stone-100">Nâng Đỡ Khối Nặng 380kg Vững Chãi</h4>
            <p className="mt-3 text-xs leading-relaxed text-stone-300 font-light">
              Hệ khung chân sắt tấm dày 20mm được thợ rèn thủ công tôi dầu chống rỉ, thiết kế giấu chân tạo cảm giác phiến đá hóa thạch đang lơ lửng giữa không trung.
            </p>
          </div>
        </div>

        {/* Custom Order Box */}
        <div className="mt-14 rounded-3xl border border-amber-900/40 bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/30 p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-300">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                GuHomes Monolithic Tea Atelier
              </span>
              <h3 className="mt-2 font-serif text-2xl font-light text-stone-100 sm:text-3xl">
                Tuyển Chọn Phiến Đá Gỗ Hóa Thạch Độc Bản
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stone-300 font-light">
                Mỗi phiến gỗ hóa ngọc là một báu vật độc nhất vô nhị của thiên nhiên không thể sao chép. 
                Gia chủ được trực tiếp xem các mẫu đá nguyên khối tại xưởng Tây Nguyên và đặt may đo kích thước rãnh khay trà theo gu thưởng thức riêng.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-stone-400">
                <span>✓ Giấy chứng thực kiểm định địa chất</span>
                <span>✓ Vận chuyển cẩu tự hành tận nhà</span>
                <span>✓ Bảo dưỡng sáp ong rừng miễn phí</span>
              </div>
            </div>

            <div>
              {orderSent ? (
                <div className="rounded-2xl border border-amber-500/50 bg-stone-900/90 p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20 text-amber-300">
                    ✓
                  </div>
                  <h4 className="mt-3 font-serif text-lg text-stone-100">Đã tiếp nhận yêu cầu bàn trà gỗ hóa thạch</h4>
                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    Chuyên gia địa chất khoáng sản GuHomes sẽ liên hệ để gửi album hình ảnh các phiến đá thấu quang sẵn có trong kho.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setOrderSent(true)
                  }}
                  className="space-y-4 rounded-2xl border border-stone-800 bg-stone-950/70 p-6 backdrop-blur-md"
                >
                  <div>
                    <label htmlFor={`${formId}-owner`} className="block font-mono text-xs text-stone-300">
                      Họ tên gia chủ *
                    </label>
                    <input
                      id={`${formId}-owner`}
                      required
                      type="text"
                      placeholder="Nguyễn Văn A"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-phone`} className="block font-mono text-xs text-stone-300">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      id={`${formId}-phone`}
                      required
                      type="tel"
                      placeholder="09xx xxx xxx"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label htmlFor={`${formId}-dims`} className="block font-mono text-xs text-stone-300">
                      Kích thước dự kiến & Vị trí bài trí (Phòng trà / Sân vườn)
                    </label>
                    <input
                      id={`${formId}-dims`}
                      type="text"
                      placeholder="VD: Chiều dài 2.4m · Phòng trà biệt thự Thảo Điền"
                      className="mt-1.5 w-full min-h-[44px] rounded-xl border border-stone-800 bg-stone-900 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-stone-950 transition-all hover:brightness-110 active:scale-[0.99]"
                  >
                    Yêu cầu tuyển chọn phiến đá gỗ hóa thạch
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
