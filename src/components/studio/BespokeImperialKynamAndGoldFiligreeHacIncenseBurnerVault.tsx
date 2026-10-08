'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

interface KynamHacSpec {
  id: string
  name: string
  origin: string
  oilRatio: string
  optimalTemp: number
  burnDuration: string
  scentProfile: string
  note: string
}

const KYNAM_HAC_LIST: readonly KynamHacSpec[] = [
  {
    id: 'hoang-ky-nam-hon-ba-96',
    name: 'Hoàng Kỳ Nam Rừng Cổ Hòn Bà Khánh Hòa',
    origin: 'Vùng Núi Cao Hòn Bà (Khánh Hòa)',
    oilRatio: '96.2% Nhựa Dầu Hổ Phách Hoàng Kim',
    optimalTemp: 126,
    burnDuration: '100 Giờ Hương Trầm Cung Đình',
    scentProfile: 'Hương mật ong rừng ngàn năm kết hợp vị ngọt của hoa sứ cổ thụ và nốt trầm ấm thảo mộc phương Nam, định tâm an thần sâu sắc.',
    note: 'Chất gỗ ánh vàng mật ong tự nhiên, khi gia nhiệt ở 126°C tỏa khói lam nhạt huyền ảo quấn quanh đôi cánh hạc vàng filigree.',
  },
  {
    id: 'bach-ky-nam-van-ninh-98',
    name: 'Bạch Kỳ Nam Cung Đình Vạn Ninh',
    origin: 'Vực Núi Sâu Vạn Ninh (Khánh Hòa)',
    oilRatio: '98.5% Nhựa Dầu Bạch Ngọc Đông Kết',
    optimalTemp: 118,
    burnDuration: '120 Giờ Hương Khí Thanh Khiết',
    scentProfile: 'Mùi hương ngọt lịm như sữa non hòa quyện hoa quỳnh trắng nở đêm trăng rằm, thanh tẩy không gian và tụ tài vượng khí.',
    note: 'Khối bạch kỳ quý hiếm bậc nhất khai thác từ lõi đại thụ ngàn năm, giữ nguyên thớ gỗ tự nhiên mộc mạc không qua mài dũa.',
  },
  {
    id: 'thanh-ky-nam-ninh-hoa-94',
    name: 'Thanh Kỳ Nam Rừng Nguyên Sinh Ninh Hòa',
    origin: 'Vùng Rừng Núi Ninh Hòa (Khánh Hòa)',
    oilRatio: '94.0% Nhựa Dầu Xanh Biếc Thấu Quang',
    optimalTemp: 132,
    burnDuration: '95 Giờ Khói Trầm Thanh Tao',
    scentProfile: 'Sắc hương the mát của bạc hà rừng kết hợp vị ngọt dịu tao nhã của hoa mai vàng, xua tan uế khí và nâng cao tầng sóng năng lượng.',
    note: 'Thớ gỗ ánh sắc xanh biếc huyền ảo dưới ánh sáng tự nhiên, khi xông đốt tạo tầng khói lượn sóng cuồn cuộn nhẹ nhàng.',
  },
]

export function BespokeImperialKynamAndGoldFiligreeHacIncenseBurnerVault() {
  const [activeKynam, setActiveKynam] = useState<KynamHacSpec>(KYNAM_HAC_LIST[0]!)
  const [temperature, setTemperature] = useState(126)
  const [isHeating, setIsHeating] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close()
      }
    }
  }, [])

  const playGoldChime = (f1: number, f2: number) => {
    if (!soundEnabled) return
    try {
      if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioCtx()
      }
      if (audioCtxRef.current.state === 'suspended') {
        void audioCtxRef.current.resume()
      }

      const now = audioCtxRef.current.currentTime

      // Fundamental Bell Osc
      const osc1 = audioCtxRef.current.createOscillator()
      const gain1 = audioCtxRef.current.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(f1, now)

      gain1.gain.setValueAtTime(0.001, now)
      gain1.gain.exponentialRampToValueAtTime(0.16, now + 0.05)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)

      osc1.start(now)
      osc1.stop(now + 2.8)

      // Harmonic Overtone Osc
      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.001, now)
      gain2.gain.exponentialRampToValueAtTime(0.08, now + 0.04)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.2)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)

      osc2.start(now)
      osc2.stop(now + 2.2)
    } catch {
      // AudioContext fallback
    }
  }

  const toggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    if (nextState) {
      setTimeout(() => {
        playGoldChime(528, 741)
      }, 50)
    }
  }

  const toggleHeating = () => {
    const nextState = !isHeating
    setIsHeating(nextState)
    if (nextState) {
      playGoldChime(528, 741)
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#0d0c0a] py-20 text-[#f5efe6]">
      {/* Golden Glow Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(212,168,83,0.14),transparent)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#d4a853]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#2b261d] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#d4a853]/40 bg-[#d4a853]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#d4a853]">
                Bảo Vật Hoàng Cung & Trầm Thất Thượng Lưu
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#fffbf0] sm:text-4xl">
                Bảo Thất Kỳ Nam & Đỉnh Lư Tiên Hạc Filigree Vàng 24K
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#3d3423] bg-[#1a1711] px-4 py-2 text-xs tracking-wider text-[#e6ca85] transition-colors hover:border-[#d4a853] hover:bg-[#262117]"
              aria-label={soundEnabled ? 'Tắt âm chuông vàng 528Hz + 741Hz' : 'Bật âm chuông vàng 528Hz + 741Hz'}
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#d4a853]" />
                  <span>Chuông Vàng 528Hz Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#786b54]" />
                  <span>Bật Chuông Hoàng Kim</span>
                </>
              )}
            </button>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#a89c87] sm:text-base">
            Tuyệt phẩm đỉnh xông trầm tạo tác thủ công theo đồ án cung đình &quot;Hạc Thọ Thiên Niên&quot;: Tiên hạc ngậm cành sen ngọc
            đứng trên lưng rùa vàng, đúc kết từ đồng đỏ dày 10mm tôi luyện truyền thống và bọc lưới vàng 24K filigree tinh xảo,
            tọa lạc trên án gỗ Mun hoa bách niên khảm Ngọc Bích Phỉ Thúy Type A của GuHomes.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Display & Smoke Chamber (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2b261d] bg-[#14120d]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Top Specs Matrix */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#241f17] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#1c1811] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#8c7e67]">Độ Dầu Kỳ Nam</div>
                <div className="mt-0.5 text-base font-semibold text-[#d4a853] sm:text-lg">{activeKynam.oilRatio}</div>
              </div>
              <div className="rounded-lg bg-[#1c1811] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#8c7e67]">Nhiệt Độ Chuẩn</div>
                <div className="mt-0.5 text-base font-semibold text-[#e6ca85] sm:text-lg">{activeKynam.optimalTemp}°C</div>
              </div>
              <div className="rounded-lg bg-[#1c1811] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#8c7e67]">Thời Gian Tỏa Hương</div>
                <div className="mt-0.5 text-base font-semibold text-[#f5dfaa] sm:text-lg">{activeKynam.burnDuration}</div>
              </div>
            </div>

            {/* Visual Canvas: Gold Filigree Hac & Smoke Stream */}
            <div className="relative my-8 flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-[#262118] bg-gradient-to-b from-[#17140e] to-[#0d0b07] p-6 text-center">
              {/* Dynamic Incense Smoke Animation */}
              <AnimatePresence>
                {isHeating && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.8 }}
                    animate={{
                      opacity: [0.3, 0.7, 0.4],
                      y: [-10, -50, -90],
                      scale: [1, 1.2, 1.5],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      repeat: Infinity,
                      duration: 3.5,
                      ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute top-12 z-20 h-28 w-20 rounded-full bg-gradient-to-t from-[#d4a853]/30 via-[#e6ca85]/15 to-transparent blur-xl"
                  />
                )}
              </AnimatePresence>

              {/* Hac Filigree Artifact Graphic Representation */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Crane Head & Lotus Branch */}
                <motion.div
                  animate={{
                    y: isHeating ? [0, -3, 0] : 0,
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="rounded-full border border-[#d4a853] bg-[#2a2213] px-3 py-1 text-[11px] font-medium text-[#f5dfaa] shadow-lg">
                    Tiên Hạc Ngậm Sen Filigree Vàng 24K
                  </div>
                  <div className="my-1 h-8 w-0.5 bg-gradient-to-b from-[#d4a853] to-[#8c6b2d]" />
                </motion.div>

                {/* Central Incense Chamber (Bronze Body with Gold Mesh) */}
                <div className="relative flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-[#d4a853]/60 bg-gradient-to-b from-[#3a2e19] to-[#1c160a] shadow-[0_0_35px_rgba(212,168,83,0.18)]">
                  {/* Filigree Pattern Grid Overlay */}
                  <div className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-[#d4a853]/40 opacity-70" />

                  <div className="text-center">
                    <div className="text-xs uppercase tracking-widest text-[#a89260]">Ruột Đồng Đỏ 10mm</div>
                    <div className="mt-1 font-mono text-lg font-bold text-[#d4a853]">{temperature}°C</div>
                    <div className="text-[10px] text-[#e6ca85]">
                      {isHeating ? 'Đang Xông Hương Tinh Dầu' : 'Chờ Khởi Động Gia Nhiệt'}
                    </div>
                  </div>
                </div>

                {/* Golden Turtle Base & Rosewood Stand */}
                <div className="mt-2 flex flex-col items-center">
                  <div className="h-4 w-28 rounded-t-lg border-x border-t border-[#d4a853]/60 bg-[#2b2212] text-[9px] text-[#d4a853] flex items-center justify-center">
                    Kim Quy Đồng Đỏ
                  </div>
                  <div className="h-6 w-44 rounded-b-xl border border-[#4a2e18] bg-[#1a0f07] text-[10px] text-[#d4a853] flex items-center justify-center shadow-lg">
                    Đế Mun Hoa Khảm Ngọc Bích Phỉ Thúy
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 text-xs text-[#a89c87]">
                Trạng thái nhiệt:{' '}
                <span className={isHeating ? 'text-[#d4a853] font-medium' : 'text-[#786b54]'}>
                  {isHeating
                    ? `Đang tỏa hương tinh chất ${activeKynam.name} ở ${temperature}°C`
                    : 'Hệ thống gia nhiệt cách ly vi sai sẵn sàng'}
                </span>
              </div>
            </div>

            {/* Temperature Slider & Fire Toggle */}
            <div className="space-y-4 border-t border-[#241f17] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={toggleHeating}
                  className={`rounded-lg border px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                    isHeating
                      ? 'border-[#d4a853] bg-[#d4a853] text-[#0d0c0a] shadow-[0_0_20px_rgba(212,168,83,0.4)]'
                      : 'border-[#d4a853]/60 bg-[#d4a853]/15 text-[#f5dfaa] hover:bg-[#d4a853]/25'
                  }`}
                >
                  {isHeating ? 'Tắt Xông Đốt Trầm' : 'Khai Hỏa Gia Nhiệt Vi Sai'}
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#a89c87]">Điều Nhiệt (80°C - 240°C):</span>
                  <input
                    type="range"
                    min="80"
                    max="240"
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(Number(e.target.value))
                    }}
                    className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-[#2b261d] accent-[#d4a853]"
                  />
                  <span className="w-12 text-right font-mono text-xs font-semibold text-[#d4a853]">{temperature}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selection & Scent Notes Panel (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Kynam Selection List */}
            <div className="rounded-2xl border border-[#2b261d] bg-[#14120d]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5dfaa]">
                Bộ Sưu Tập Kỳ Nam Thượng Uyển Khánh Hòa
              </h3>
              <p className="mt-1 text-xs text-[#8c7e67]">
                Kỳ nam tự nhiên tích tụ tinh túy trời đất hàng trăm năm, định chuẩn nhiệt độ tỏa hương tối ưu:
              </p>

              <div className="mt-4 space-y-3">
                {KYNAM_HAC_LIST.map((kynam) => {
                  const isSelected = activeKynam.id === kynam.id
                  return (
                    <button
                      key={kynam.id}
                      onClick={() => {
                        setActiveKynam(kynam)
                        setTemperature(kynam.optimalTemp)
                        playGoldChime(528, 741)
                      }}
                      className={`w-full text-left rounded-xl p-4 transition-all border ${
                        isSelected
                          ? 'border-[#d4a853] bg-[#241d11] text-[#fffbf0]'
                          : 'border-[#241f17] bg-[#16130e] text-[#a89c87] hover:border-[#332b1f]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#f5efe6]">{kynam.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#d4a853]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#a89c87]">{kynam.scentProfile}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#2a2213] px-2 py-0.5 text-[#e6ca85]">{kynam.origin}</span>
                        <span className="rounded bg-[#2a2213] px-2 py-0.5 text-[#d4a853]">Nhiệt: {kynam.optimalTemp}°C</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scent Architecture & Craft Commitment */}
            <div className="rounded-2xl border border-[#2b261d] bg-[#14120d]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#f5dfaa]">
                Ghi Chú Xúc Giác & Triết Lý Không Gian
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#a89c87]">
                {activeKynam.note}
              </p>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#3d321d] bg-[#1f190e] p-4 text-xs leading-relaxed text-[#c2b295]">
                <strong className="text-[#d4a853]">Cam kết độc bản GuHomes:</strong> Mỗi bộ đỉnh Tiên Hạc Cung Đình được
                chế tác thủ công bởi các nghệ nhân kim hoàn hàng đầu, đi kèm giấy giám định tuổi vàng và độ tinh khiết đồng đỏ,
                thiết kế đo ni đóng giày cho không gian thư phòng và phòng thiền của gia chủ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
