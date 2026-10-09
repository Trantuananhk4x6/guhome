'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ScentNote {
  temp: number
  profile: string
  subnotes: string
  activeDuration: string
  solfeggioFreq: number
}

const SCENT_PROFILES: readonly ScentNote[] = [
  {
    temp: 90,
    profile: 'Thanh Khiết Sen Bách Diệp & Nhựa Trầm Non Sớm Mai',
    subnotes: 'Hương đầu ngọt ngào quý phái tựa đài sen thơm ngát chốn hoàng thành, pha lẫn mật ong rừng và phấn hoa sương tuyết',
    activeDuration: 'Ủ nhiệt vi sai 6-8 giờ liên tục',
    solfeggioFreq: 528,
  },
  {
    temp: 155,
    profile: 'Nồng Đượm Hổ Phách & Bạch Kỳ Hòn Khói',
    subnotes: 'Hương giữa ấm áp bừng sáng năng lượng Thổ trung ương vững chãi, quy tụ điềm lành cát tường, bảo hộ gia tộc',
    activeDuration: 'Ủ nhiệt vi sai 4-5 giờ liên tục',
    solfeggioFreq: 639,
  },
  {
    temp: 215,
    profile: 'Trầm Tích Ngàn Năm & Cốt Dầu Kỳ Nam Thấu Ngọc',
    subnotes: 'Hương cuối sâu thẳm lưu giữ nốt khói bách niên tĩnh tại, ngưng đọng trên trần gỗ và vách lụa tơ tằm',
    activeDuration: 'Ủ nhiệt vi sai 2-3 giờ bốc đỉnh',
    solfeggioFreq: 741,
  },
]

interface KynamSpec {
  id: string
  name: string
  oilRatio: string
  origin: string
  description: string
}

const KYNAM_SPECS: readonly KynamSpec[] = [
  {
    id: 'bach-ky-hon-khoi',
    name: 'Bạch Kỳ Hòn Khói (Khánh Hòa)',
    oilRatio: '99.8% hàm lượng tinh dầu',
    origin: 'Dãy núi Hòn Khói bán đảo ven biển',
    description: 'Chất ngọc hóa thạch thấu quang xanh biếc, ngũ biến hương thanh thuần lưu luyến suốt 36 giờ.',
  },
  {
    id: 'thanh-ky-van-ninh',
    name: 'Thanh Kỳ Vạn Ninh (Khánh Hòa)',
    oilRatio: '99.4% hàm lượng tinh dầu',
    origin: 'Vùng rừng sâu Vạn Ninh trên 125 năm tuổi',
    description: 'Vân thớ ánh xanh lam ngọc, vị cay the chuyển ngọt lịm như sữa bò non ngâm mật ong rừng sâu.',
  },
  {
    id: 'hoang-ky-ninh-hoa',
    name: 'Hoàng Kỳ Ninh Hòa (Khánh Hòa)',
    oilRatio: '97.7% hàm lượng tinh dầu',
    origin: 'Núi đá vôi Hòn Hèo - Ninh Hòa',
    description: 'Vàng ròng hổ phách đượm dầu, tỏa năng lượng ấm áp vượng tài cho không gian thờ tự và thiền thất.',
  },
]

export function BespokeImperialKynamAndGoldFiligreeKirinLotusIncenseBurnerVault() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KYNAM_SPECS[0]!)
  const [currentTemp, setCurrentTemp] = useState<number>(155)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [isLidLifted, setIsLidLifted] = useState<boolean>(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const activeScent =
    SCENT_PROFILES.find((s) => Math.abs(s.temp - currentTemp) < 35) || SCENT_PROFILES[1]!

  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5)
        setTimeout(() => {
          osc1Ref.current?.stop()
          osc2Ref.current?.stop()
          osc1Ref.current?.disconnect()
          osc2Ref.current?.disconnect()
          setIsPlayingAudio(false)
        }, 500)
      }
    } else {
      try {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)

        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(741, ctx.currentTime)

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.8)

        osc1.connect(gain)
        osc2.connect(gain)
        gain.connect(ctx.destination)

        osc1.start()
        osc2.start()
        osc1Ref.current = osc1
        osc2Ref.current = osc2
        gainRef.current = gain
        setIsPlayingAudio(true)
      } catch {
        setIsPlayingAudio(false)
      }
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24">
      {/* Golden Aura Background Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-amber-700/30 blur-3xl" />
        <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-yellow-600/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-amber-300">
            <span>Thánh Thú Cung Đình Triều Nguyễn</span>
            <span>·</span>
            <span>Trung Ương Mậu Kỷ Hành Thổ</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-amber-100 sm:text-4xl lg:text-5xl">
            Bảo Thất Kỳ Nam & Đỉnh Lư Vàng 24K Filigree Kỳ Lân Đạp Sen
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:text-base">
            Kiệt tác ngự đỉnh cung đình: Đỉnh Lư Vàng 24K Filigree Kỳ Lân Đạp Sen đan sợi vàng 0.18mm, ruột đúc đồng đỏ 10mm giữ nhiệt êm ái, án Mun hoa bách niên khảm Phỉ Thúy Type A, điều nhiệt vi sai 80°C - 240°C không khói độc.
          </p>
        </div>

        {/* Master Interactive Stage */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Main Incense Vault Visual: 7 cols */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-sm lg:col-span-7">
            {/* Top Toolbar */}
            <div className="flex w-full items-center justify-between border-b border-stone-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs text-amber-300">
                  Nhiệt độ vi sai: {currentTemp}°C | Tần số Solfeggio: {activeScent.solfeggioFreq}Hz
                </span>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300',
                  isPlayingAudio
                    ? 'border-amber-500/80 bg-amber-950/60 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-600',
                )}
              >
                <span>{isPlayingAudio ? 'Chuông Vàng 528Hz + 741Hz' : 'Nghe Chuông Vàng 24K'}</span>
              </button>
            </div>

            {/* Central Kirin Lotus Incense Burner Illustration & Interactive Lid */}
            <div className="relative mt-8 flex h-72 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800 bg-stone-950/90 sm:h-96">
              {/* Dynamic Scent Vapor Smoke Particles */}
              <div className="pointer-events-none absolute top-12 flex h-24 w-32 flex-col items-center justify-center opacity-60">
                <motion.div
                  animate={{ y: [-10, -50], opacity: [0.8, 0], scale: [1, 1.8] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: 'easeOut' }}
                  className="h-12 w-12 rounded-full bg-gradient-to-t from-amber-200/40 to-transparent blur-md"
                />
              </div>

              {/* Kirin Lotus Finial Lid (Clickable to lift) */}
              <motion.div
                animate={{ y: isLidLifted ? -35 : 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                onClick={() => setIsLidLifted(!isLidLifted)}
                className="group relative z-20 flex cursor-pointer flex-col items-center"
                title="Nhấp để nhấc/đậy nắp đỉnh vàng Kỳ Lân Đạp Sen"
              >
                {/* Kirin Finial */}
                <div className="h-4 w-4 rounded-full border border-amber-300 bg-gradient-to-tr from-amber-400 to-yellow-100 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
                {/* Filigree Lotus Petal Dome Lid */}
                <div className="relative -mt-1 h-12 w-32 rounded-t-full border border-amber-400/80 bg-gradient-to-b from-amber-500/90 to-amber-700/80 shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-amber-100 opacity-90">
                    Kỳ Lân Đạp Sen
                  </span>
                </div>
              </motion.div>

              {/* Burner Body: Copper Core & Gold Filigree Lattice */}
              <div className="relative z-10 flex h-32 w-48 flex-col items-center justify-center rounded-2xl border-2 border-amber-500/90 bg-gradient-to-b from-stone-900 via-amber-950/80 to-stone-900 p-3 shadow-[0_10px_35px_rgba(0,0,0,0.9)] sm:w-56">
                <div className="text-center">
                  <span className="font-serif text-xs text-amber-200 block">
                    Ruột Đồng Đỏ Nguyên Khối 10mm
                  </span>
                  <span className="mt-1 font-mono text-[10px] text-amber-400/80 block">
                    Đan Sợi Vàng 24K Filigree 0.18mm
                  </span>
                  <span className="mt-2 inline-block rounded-full bg-amber-950/90 border border-amber-600/40 px-2 py-0.5 text-[9px] font-mono text-amber-300">
                    {selectedKynam.name}
                  </span>
                </div>
              </div>

              {/* Tripod Legs & Mun Wood Stand */}
              <div className="relative z-10 -mt-2 flex w-40 justify-between px-4">
                <div className="h-6 w-3 rounded-b-md bg-amber-600" />
                <div className="h-6 w-3 rounded-b-md bg-amber-600" />
                <div className="h-6 w-3 rounded-b-md bg-amber-600" />
              </div>

              {/* Mun Wood Stand Inlaid with Jadeite Type A */}
              <div className="relative z-10 mt-1 flex h-6 w-56 items-center justify-center rounded-md border border-stone-800 bg-stone-900 shadow-md">
                <span className="text-[9px] font-mono text-emerald-400">
                  Án Mun Hoa · Khảm Phỉ Thúy Type A
                </span>
              </div>
            </div>

            {/* Temperature Slider & Scent Layer Details */}
            <div className="mt-6 w-full rounded-xl border border-stone-800 bg-stone-950/60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-stone-400">
                  Điều Nhiệt Vi Sai 3 Tầng Hương
                </span>
                <span className="font-mono text-sm font-semibold text-amber-400">
                  {currentTemp}°C
                </span>
              </div>

              <input
                type="range"
                min={80}
                max={240}
                step={5}
                value={currentTemp}
                onChange={(e) => setCurrentTemp(Number(e.target.value))}
                className="mt-3 w-full cursor-pointer accent-amber-500"
              />

              <div className="mt-3 rounded-lg border border-amber-900/30 bg-amber-950/20 p-2.5">
                <span className="text-xs font-serif text-amber-300 block">
                  {activeScent.profile}
                </span>
                <p className="mt-1 text-[11px] text-stone-300 leading-relaxed">
                  {activeScent.subnotes}
                </p>
                <span className="mt-1.5 block font-mono text-[10px] text-amber-500">
                  {activeScent.activeDuration}
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Kynam Selection & Imperial Pedigree (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Kynam Selection List */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm">
              <h3 className="border-b border-stone-800 pb-3 font-serif text-lg text-amber-200">
                Ngũ Tuyệt Trầm Kỳ Khánh Hòa Ngự Dụng
              </h3>

              <div className="mt-4 space-y-3">
                {KYNAM_SPECS.map((kynam) => (
                  <button
                    key={kynam.id}
                    type="button"
                    onClick={() => setSelectedKynam(kynam)}
                    className={cn(
                      'w-full text-left rounded-xl border p-3 transition-all duration-300',
                      selectedKynam.id === kynam.id
                        ? 'border-amber-500/80 bg-amber-950/40 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                        : 'border-stone-800/80 bg-stone-950/40 hover:border-stone-700',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-serif text-stone-100 font-medium">
                        {kynam.name}
                      </span>
                      <span className="rounded bg-amber-950 px-2 py-0.5 font-mono text-[10px] text-amber-300">
                        {kynam.oilRatio}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-stone-400 leading-relaxed">
                      {kynam.description}
                    </p>

                    <span className="mt-2 block font-mono text-[10px] text-stone-500">
                      Nguồn gốc: {kynam.origin}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feng Shui Protection & Master Brand Guarantee */}
            <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-br from-stone-900/90 to-amber-950/20 p-5 backdrop-blur-sm">
              <span className="font-serif text-base text-amber-200 block">
                Kỳ Lân Trấn Trạch · Tụ Vượng Phú Quý
              </span>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Kỳ Lân là linh thú nhân từ mang điềm lành thái bình thịnh vượng, kết hợp đóa sen bách diệp biểu trưng cho sự thanh tịnh vô nhiễm. Đặt đỉnh xông tại trung tâm phòng thờ hoặc đại sảnh gia trang giúp quy tụ dương khí và trường thọ.
              </p>

              <div className="mt-4 border-t border-stone-800 pt-3 text-[11px] text-stone-400">
                <span className="text-amber-400 font-medium">Xưởng may đo GuHomes Thạnh Xuân 1.200m²:</span> Sản xuất thủ công giới hạn trần 12 công trình/năm, kiểm định chất lượng nghiêm ngặt bởi KTS Trưởng. Hotline KTS Trưởng: <span className="text-amber-300 font-mono">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
