'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

interface KynamLionSpec {
  id: string
  name: string
  origin: string
  oilRatio: string
  optimalTemp: number
  burnDuration: string
  scentProfile: string
  note: string
}

const KYNAM_LION_LIST: readonly KynamLionSpec[] = [
  {
    id: 'hac-ky-nam-ninh-hoa-97',
    name: 'Hắc Kỳ Nam Hắc Long Ninh Hòa Khánh Hòa',
    origin: 'Rừng Già Núi Chúa Ninh Hòa (Khánh Hòa)',
    oilRatio: '97.4% Nhựa Dầu Đen Huyền Chìm Nước',
    optimalTemp: 130,
    burnDuration: '110 Giờ Hương Khí Uy Nghiêm',
    scentProfile: 'Hương thơm nồng nàn quyền quý của gỗ cổ thụ ngàn năm kết hợp vị ngọt sâu lắng của xạ hương và thảo mộc cung đình, tụ tài hội lộc.',
    note: 'Thớ gỗ đen ánh kim huyền bí, khi gia nhiệt ở 130°C tỏa khói thơm kết tụ thành hình mây lành lượn quanh đỉnh sư tử vờn cầu.',
  },
  {
    id: 'bach-ky-nam-dai-thu-99',
    name: 'Bạch Kỳ Nam Cổ Mộc Vạn Giã',
    origin: 'Vách Đá Hùng Vĩ Vạn Giã (Khánh Hòa)',
    oilRatio: '99.1% Nhựa Dầu Đông Kết Tự Nhiên',
    optimalTemp: 120,
    burnDuration: '135 Giờ Hương Khí Thanh Thoát',
    scentProfile: 'Mùi hương ngọt dịu như hổ phách hòa quyện hương hoa lan rừng nở muộn, xua tan tạp khí và khai thông trực giác nhạy bén.',
    note: 'Chất gỗ bạch ngọc độc bản khai thác từ hốc đại thụ bách niên, giữ trọn thớ gỗ nguyên sơ của mẹ thiên nhiên.',
  },
  {
    id: 'hoang-ky-nam-cam-lam-95',
    name: 'Hoàng Kỳ Nam Rừng Nguyên Sinh Cam Lâm',
    origin: 'Vùng Rừng Núi Cam Lâm (Khánh Hòa)',
    oilRatio: '95.6% Nhựa Dầu Sắc Vàng Mật Ong',
    optimalTemp: 124,
    burnDuration: '105 Giờ Hương Trầm Thư Thái',
    scentProfile: 'Sắc hương the ngọt thanh lịch của cam bergamot dại kết hợp gỗ đàn hương ấm áp, mang lại sự bình an tuyệt đối.',
    note: 'Thớ gỗ ánh sắc hổ phách vàng óng khi chiếu qua ánh nắng tự nhiên, khi xông đốt tạo tầng khói lượn sóng cuộn tròn êm ái.',
  },
]

export function BespokeImperialKynamAndGoldFiligreeLionIncenseBurnerVault() {
  const [activeKynam, setActiveKynam] = useState<KynamLionSpec>(KYNAM_LION_LIST[0]!)
  const [temperature, setTemperature] = useState(130)
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
    <section className="relative overflow-hidden bg-[#0c0b09] py-20 text-[#f5efe6]">
      {/* Golden Glow Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(217,119,6,0.14),transparent)]" />
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[#d97706]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 border-b border-[#292318] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block rounded-full border border-[#d97706]/40 bg-[#d97706]/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#fbbf24]">
                Bảo Vật Hoàng Cung & Trầm Thất Thượng Lưu
              </span>
              <h2 className="mt-3 font-serif text-3xl font-light tracking-wide text-[#fffbf0] sm:text-4xl">
                Bảo Thất Kỳ Nam & Đỉnh Lư Sư Tử Vờn Cầu Vàng 24K Filigree
              </h2>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="flex items-center gap-2 rounded-full border border-[#3b301c] bg-[#17140e] px-4 py-2 text-xs tracking-wider text-[#fde68a] transition-colors hover:border-[#d97706] hover:bg-[#211c13]"
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

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#a89c87] sm:text-base">
            Tuyệt phẩm đỉnh xông trầm chế tác thủ công theo đồ án cung đình &quot;Thái Bình Thịnh Vượng&quot;: Song sư hí châu vờn cầu như ý,
            ruột đồng đỏ đúc nguyên khối dày 10mm tôi luyện truyền thống và bọc lưới vàng 24K filigree tinh xảo,
            tọa lạc trên án gỗ Trắc đỏ bách niên khảm Ngọc Bích Phỉ Thúy Type A của GuHomes.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Display & Smoke Chamber (7 Cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#292318] bg-[#12100b]/90 p-6 backdrop-blur-md lg:col-span-7">
            {/* Top Specs Matrix */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#211b12] pb-4 text-center sm:gap-4">
              <div className="rounded-lg bg-[#1a160f] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#8c7e67]">Độ Dầu Kỳ Nam</div>
                <div className="mt-0.5 text-base font-semibold text-[#fbbf24] sm:text-lg">{activeKynam.oilRatio}</div>
              </div>
              <div className="rounded-lg bg-[#1a160f] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#8c7e67]">Nhiệt Độ Chuẩn</div>
                <div className="mt-0.5 text-base font-semibold text-[#fde68a] sm:text-lg">{activeKynam.optimalTemp}°C</div>
              </div>
              <div className="rounded-lg bg-[#1a160f] p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-[#8c7e67]">Thời Gian Tỏa Hương</div>
                <div className="mt-0.5 text-base font-semibold text-[#fef3c7] sm:text-lg">{activeKynam.burnDuration}</div>
              </div>
            </div>

            {/* Visual Canvas: Gold Filigree Lion & Smoke Stream */}
            <div className="relative my-8 flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-[#241d13] bg-gradient-to-b from-[#14110a] to-[#0a0906] p-6 text-center">
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
                    className="pointer-events-none absolute top-12 z-20 h-28 w-20 rounded-full bg-gradient-to-t from-[#f59e0b]/30 via-[#fbbf24]/15 to-transparent blur-xl"
                  />
                )}
              </AnimatePresence>

              {/* Lion Filigree Artifact Graphic Representation */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Lion Head & Pearl Sphere */}
                <motion.div
                  animate={{
                    y: isHeating ? [0, -3, 0] : 0,
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="flex flex-col items-center"
                >
                  <div className="rounded-full border border-[#f59e0b] bg-[#261c0d] px-3 py-1 text-[11px] font-medium text-[#fde68a] shadow-lg">
                    Sư Tử Vờn Cầu Filigree Vàng 24K
                  </div>
                  <div className="my-1 h-8 w-0.5 bg-gradient-to-b from-[#f59e0b] to-[#b45309]" />
                </motion.div>

                {/* Central Incense Chamber (Bronze Body with Gold Mesh) */}
                <div className="relative flex h-36 w-36 items-center justify-center rounded-2xl border-2 border-[#f59e0b]/60 bg-gradient-to-b from-[#33210f] to-[#170e06] shadow-[0_0_35px_rgba(245,158,11,0.18)]">
                  {/* Filigree Pattern Grid Overlay */}
                  <div className="pointer-events-none absolute inset-2 rounded-xl border border-dashed border-[#f59e0b]/40 opacity-70" />

                  <div className="text-center">
                    <div className="text-xs uppercase tracking-widest text-[#d97706]">Ruột Đồng Đỏ 10mm</div>
                    <div className="mt-1 font-mono text-lg font-bold text-[#fbbf24]">{temperature}°C</div>
                    <div className="text-[10px] text-[#fde68a]">
                      {isHeating ? 'Đang Xông Hương Tinh Dầu' : 'Chờ Khởi Động Gia Nhiệt'}
                    </div>
                  </div>
                </div>

                {/* Pedestal Base */}
                <div className="mt-2 flex flex-col items-center">
                  <div className="h-4 w-28 rounded-t-lg border-x border-t border-[#f59e0b]/60 bg-[#29170a] text-[9px] text-[#fbbf24] flex items-center justify-center">
                    Tam Túc Đồng Đỏ
                  </div>
                  <div className="h-6 w-44 rounded-b-xl border border-[#4a2e18] bg-[#1a0f07] text-[10px] text-[#fbbf24] flex items-center justify-center shadow-lg">
                    Đế Trắc Đỏ Khảm Ngọc Bích Phỉ Thúy
                  </div>
                </div>
              </div>

              {/* Status Note */}
              <div className="mt-6 text-xs text-[#a89c87]">
                Trạng thái nhiệt:{' '}
                <span className={isHeating ? 'text-[#fbbf24] font-medium' : 'text-[#786b54]'}>
                  {isHeating
                    ? `Đang tỏa hương tinh chất ${activeKynam.name} ở ${temperature}°C`
                    : 'Hệ thống gia nhiệt cách ly vi sai sẵn sàng'}
                </span>
              </div>
            </div>

            {/* Temperature Slider & Fire Toggle */}
            <div className="space-y-4 border-t border-[#211b12] pt-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={toggleHeating}
                  className={`rounded-lg border px-5 py-2.5 text-xs font-semibold tracking-wider transition-all ${
                    isHeating
                      ? 'border-[#f59e0b] bg-[#f59e0b] text-[#0c0b09] shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                      : 'border-[#f59e0b]/60 bg-[#f59e0b]/15 text-[#fde68a] hover:bg-[#f59e0b]/25'
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
                    className="h-1.5 w-32 cursor-pointer appearance-none rounded-lg bg-[#292318] accent-[#f59e0b]"
                  />
                  <span className="w-12 text-right font-mono text-xs font-semibold text-[#fbbf24]">{temperature}°C</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selection & Scent Notes Panel (5 Cols) */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            {/* Kynam Selection List */}
            <div className="rounded-2xl border border-[#292318] bg-[#12100b]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#fde68a]">
                Bộ Sưu Tập Kỳ Nam Thượng Uyển Khánh Hòa
              </h3>
              <p className="mt-1 text-xs text-[#8c7e67]">
                Kỳ nam tự nhiên tích tụ tinh túy đất trời hàng trăm năm, định chuẩn nhiệt độ tỏa hương tối ưu:
              </p>

              <div className="mt-4 space-y-3">
                {KYNAM_LION_LIST.map((kynam) => {
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
                          ? 'border-[#f59e0b] bg-[#21160a] text-[#fffbf0]'
                          : 'border-[#211b12] bg-[#141009] text-[#a89c87] hover:border-[#2e2417]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-serif text-sm font-medium text-[#f5efe6]">{kynam.name}</div>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#fbbf24]" />}
                      </div>
                      <div className="mt-2 text-xs leading-relaxed text-[#a89c87]">{kynam.scentProfile}</div>
                      <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-[#29170a] px-2 py-0.5 text-[#fde68a]">{kynam.origin}</span>
                        <span className="rounded bg-[#29170a] px-2 py-0.5 text-[#fbbf24]">Nhiệt: {kynam.optimalTemp}°C</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Scent Architecture & Craft Commitment */}
            <div className="rounded-2xl border border-[#292318] bg-[#12100b]/90 p-6 backdrop-blur-md">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#fde68a]">
                Ghi Chú Xúc Giác & Triết Lý Không Gian
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#a89c87]">
                {activeKynam.note}
              </p>

              {/* GuHomes Craft Note */}
              <div className="mt-6 rounded-xl border border-[#382711] bg-[#1a1106] p-4 text-xs leading-relaxed text-[#c2b295]">
                <strong className="text-[#fbbf24]">Cam kết độc bản GuHomes:</strong> Mỗi bộ đỉnh Sư Tử Vờn Cầu Cung Đình được
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
