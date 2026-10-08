'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

interface KynamCarpSpec {
  id: string
  name: string
  origin: string
  oilRatio: string
  optimalTemp: number
  burnDuration: string
  scentProfile: string
  note: string
}

const KYNAM_CARP_LIST: readonly KynamCarpSpec[] = [
  {
    id: 'thanh-ky-nam-van-ninh-98',
    name: 'Thanh Kỳ Nam Vạn Ninh Thấu Quang',
    origin: 'Vực Sâu Núi Rừng Vạn Ninh (Khánh Hòa)',
    oilRatio: '98.2% Nhựa Dầu Ngọc Bích Thấu Quang',
    optimalTemp: 128,
    burnDuration: '115 Giờ Hương Khí Thanh Thoát',
    scentProfile: 'Hương thanh khiết của tùng bách ngàn năm kết hợp vị the mát tao nhã và nốt hậu ngọt sâu lắng như cam thảo rừng, hanh thông trí tuệ.',
    note: 'Chất gỗ ánh sắc xanh biếc huyền diệu, khi gia nhiệt ở 128°C tỏa làn khói thơm dịu ngọt uốn lượn như cá chép vượt sóng dữ hóa rồng vàng.',
  },
  {
    id: 'bach-ky-nam-hon-heo-99',
    name: 'Bạch Kỳ Nam Bán Đảo Hòn Hèo',
    origin: 'Vách Đá Hùng Vĩ Hòn Hèo (Khánh Hòa)',
    oilRatio: '99.4% Nhựa Dầu Bạch Ngọc Đông Kết',
    optimalTemp: 116,
    burnDuration: '140 Giờ Khói Trầm Cung Đình',
    scentProfile: 'Mùi hương ngọt lịm như sữa non tinh khiết hòa cùng sắc hương sen trắng nở sớm, mang lại vượng khí tài lộc và sự hanh thông công danh.',
    note: 'Khối bạch kỳ quý hiếm bậc nhất khai thác từ lõi đại thụ ngàn năm, giữ nguyên vẹn thớ gỗ tự nhiên mộc mạc không qua mài giũa.',
  },
  {
    id: 'hoang-ky-nam-dien-khanh-96',
    name: 'Hoàng Kỳ Nam Cổ Mộc Diên Khánh',
    origin: 'Vùng Núi Rừng Diên Khánh (Khánh Hòa)',
    oilRatio: '96.5% Nhựa Dầu Hoàng Kim Hổ Phách',
    optimalTemp: 122,
    burnDuration: '108 Giờ Hương Trầm An Lành',
    scentProfile: 'Sắc hương ấm áp dịu dàng của thảo quả rừng pha chút mật ong hoa cà phê, thanh tẩy toàn bộ trường khí ô trọc và tụ sinh khí.',
    note: 'Thớ gỗ màu vàng mật ong óng ả, khi tiếp xúc nhiệt tỏa tầng khói lượn sóng cuộn tròn êm ái xua tan mệt mỏi.',
  },
]

export function BespokeImperialKynamAndGoldFiligreeCarpIncenseBurnerVault() {
  const [activeKynam, setActiveKynam] = useState<KynamCarpSpec>(KYNAM_CARP_LIST[0]!)
  const [temperature, setTemperature] = useState(128)
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
    <section className="relative overflow-hidden bg-[#0a0d0c] py-20 text-[#f5efe6]">
      {/* Golden Glow Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(217,119,6,0.14),transparent)]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#10b981]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#242b26] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#fbbf24]/40 bg-[#fbbf24]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#fbbf24]">
                Bảo Vật Hoàng Cung & Trầm Thất Thượng Lưu
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#fffbf0] sm:text-4xl">
                Bảo Thất Kỳ Nam & Đỉnh Lư Cá Chép Hóa Rồng Vàng 24K Filigree
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#3b3a1c] bg-[#17190e] px-4 py-2 text-xs tracking-wider text-[#fde68a] transition-colors hover:border-[#fbbf24] hover:bg-[#212313]"
              aria-label={soundEnabled ? 'Tắt âm chuông vàng 528Hz + 741Hz' : 'Bật âm chuông vàng 528Hz + 741Hz'}
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#fbbf24]" />
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

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#9ca89f] sm:text-base">
            Tuyệt phẩm đỉnh xông trầm chế tác thủ công theo đồ án cung đình &quot;Ngư Dược Long Môn&quot;: Cá chép vượt vũ môn nhả ngọc minh châu,
            ruột đồng đỏ đúc nguyên khối dày 10mm tôi luyện truyền thống và bọc lưới vàng 24K filigree tinh xảo,
            tọa lạc trên án gỗ Mun sừng Khánh Hòa bách niên khảm Ngọc Bích Phỉ Thúy Type A của GuHomes.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Display & Smoke Chamber (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#242b26] bg-[#0f1412]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Top Specs Matrix */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#1c2420] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#151c19] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#738a7c]">Độ Dầu Kỳ Nam</div>
                <div className="mt-0.5 text-base font-semibold text-[#fbbf24] sm:text-lg">{activeKynam.oilRatio}</div>
              </div>
              <div className="rounded-lg bg-[#151c19] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#738a7c]">Nhiệt Độ Chuẩn</div>
                <div className="mt-0.5 text-base font-semibold text-[#fde68a] sm:text-lg">{activeKynam.optimalTemp}°C</div>
              </div>
              <div className="rounded-lg bg-[#151c19] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#738a7c]">Thời Gian Tỏa Hương</div>
                <div className="mt-0.5 text-base font-semibold text-[#fef3c7] sm:text-lg">{activeKynam.burnDuration}</div>
              </div>
            </div>

            {/* Visual Canvas: Gold Filigree Carp & Smoke Stream */}
            <div className="relative my-8 flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-[#1b2621] bg-gradient-to-b from-[#111915] to-[#080d0b] p-6 text-center">
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
                    className="pointer-events-none absolute top-12 z-20 h-28 w-20 rounded-full bg-gradient-to-t from-[#fbbf24]/30 via-[#34d399]/15 to-transparent blur-xl"
                  />
                )}
              </AnimatePresence>

              {/* Carp Filigree Artifact Graphic Representation */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Carp Head & Dragon Horns */}
                <motion.div
                  animate={{
                    y: isHeating ? [0, -3, 0] : 0,
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="rounded-full border border-[#fbbf24] bg-[#212613] px-3 py-1 text-[11px] font-medium text-[#fde68a] shadow-lg">
                    Cá Chép Nhả Ngọc Filigree Vàng 24K
                  </div>
                  <div className="my-1 h-8 w-0.5 bg-gradient-to-b from-[#fbbf24] to-[#059669]" />
                </motion.div>

                {/* Central Incense Chamber (Bronze Body with Gold Mesh) */}
                <div className="relative flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-[#fbbf24]/60 bg-gradient-to-b from-[#243324] to-[#121c15] shadow-[0_0_35px_rgba(251,191,36,0.18)]">
                  {/* Filigree Pattern Grid Overlay */}
                  <div className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-[#fbbf24]/40 opacity-70" />

                  <div className="text-center">
                    <div className="text-xs uppercase tracking-widest text-[#10b981]">Ruột Đồng Đỏ 10mm</div>
                    <div className="mt-1 font-mono text-lg font-bold text-[#fbbf24]">{temperature}°C</div>
                    <div className="text-[10px] text-[#fde68a]">
                      {isHeating ? 'Đang Xông Hương Tinh Dầu' : 'Chờ Khởi Động Gia Nhiệt'}
                    </div>
                  </div>
                </div>

                {/* Base Pedestal */}
                <div className="mt-2 flex flex-col items-center">
                  <div className="h-4 w-28 rounded-t-lg border-x border-t border-[#fbbf24]/60 bg-[#17241c] text-[9px] text-[#fbbf24] flex items-center justify-center">
                    Sóng Nước Đồng Đỏ
                  </div>
                  <div className="h-6 w-44 rounded-b-xl border border-[#2b3a32] bg-[#0c120e] text-[10px] text-[#fbbf24] flex items-center justify-center shadow-lg">
                    Đế Mun Sừng Khảm Ngọc Bích Phỉ Thúy
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 text-xs text-[#9ca89f]">
                Trạng thái nhiệt:{' '}
                <span className={isHeating ? 'text-[#fbbf24] font-medium' : 'text-[#738a7c]'}>
                  {isHeating
                    ? `Đang tỏa hương tinh chất ${activeKynam.name} ở ${temperature}°C`
                    : 'Hệ thống gia nhiệt cách ly vi sai sẵn sàng'}
                </span>
              </div>
            </div>

            {/* Temperature Slider & Fire Toggle */}
            <div className="space-y-4 border-t border-[#1c2420] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={toggleHeating}
                  className={`rounded-lg border px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                    isHeating
                      ? 'border-[#fbbf24] bg-[#fbbf24] text-[#0a0d0c] shadow-[0_0_20px_rgba(251,191,36,0.4)]'
                      : 'border-[#fbbf24]/60 bg-[#fbbf24]/15 text-[#fde68a] hover:bg-[#fbbf24]/25'
                  }`}
                >
                  {isHeating ? 'Tắt Xông Đốt Trầm' : 'Khai Hỏa Gia Nhiệt Vi Sai'}
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#9ca89f]">Điều Nhiệt (80°C - 240°C):</span>
                  <input
                    type="range"
                    min="80"
                    max="240"
                    value={temperature}
                    onChange={(e) => {
                      setTemperature(Number(e.target.value))
                    }}
                    className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-[#242b26] accent-[#fbbf24]"
                  />
                  <span className="w-12 text-right font-mono text-xs font-semibold text-[#fbbf24]">{temperature}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selection & Scent Notes Panel (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Kynam Selection List */}
            <div className="rounded-2xl border border-[#242b26] bg-[#0f1412]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#fde68a]">
                Bộ Sưu Tập Kỳ Nam Thượng Uyển Khánh Hòa
              </h3>
              <p className="mt-1 text-xs text-[#738a7c]">
                Kỳ nam tự nhiên tích tụ tinh túy đất trời hàng trăm năm, định chuẩn nhiệt độ tỏa hương tối ưu:
              </p>

              <div className="mt-4 space-y-3">
                {KYNAM_CARP_LIST.map((kynam) => {
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
                          ? 'border-[#fbbf24] bg-[#1a261c] text-[#fffbf0]'
                          : 'border-[#1c2420] bg-[#121915] text-[#9ca89f] hover:border-[#28382e]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#f5efe6]">{kynam.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#fbbf24]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#9ca89f]">{kynam.scentProfile}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#1a2e23] px-2 py-0.5 text-[#34d399]">{kynam.origin}</span>
                        <span className="rounded bg-[#1a2e23] px-2 py-0.5 text-[#fbbf24]">Nhiệt: {kynam.optimalTemp}°C</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scent Architecture & Craft Commitment */}
            <div className="rounded-2xl border border-[#242b26] bg-[#0f1412]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#fde68a]">
                Ghi Chú Xúc Giác & Triết Lý Không Gian
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#9ca89f]">
                {activeKynam.note}
              </p>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#384a3c] bg-[#142219] p-4 text-xs leading-relaxed text-[#a8baa9]">
                <strong className="text-[#fbbf24]">Cam kết độc bản GuHomes:</strong> Mỗi bộ đỉnh Cá Chép Hóa Rồng Cung Đình được
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
