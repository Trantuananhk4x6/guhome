'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio Golden Bell tone & 741Hz Harmonic
const GOLD_BELL_528HZ = 528
const HARMONIC_741HZ = 741

interface KynamQilinSpec {
  id: string
  name: string
  age: string
  origin: string
  oilRatio: string
  optimalTemp: number
  burnDuration: string
  scentProfile: string
  note: string
}

const KYNAM_QILIN_LIST: readonly KynamQilinSpec[] = [
  {
    id: 'hac-ky-khanh-le-118',
    name: 'Hắc Kỳ Nam Rừng Cấm Khánh Lê',
    age: '118 Năm Tuổi',
    origin: 'Vùng Rừng Cấm Khánh Lê (Khánh Hòa)',
    oilRatio: '96.2% Nhựa Dầu Hắc Sắc Hóa Thạch',
    optimalTemp: 124,
    burnDuration: '98 Giờ Lan Tỏa Linh Khí Cung Đình',
    scentProfile: 'Hương thơm uy nghiêm tột bậc: trầm mặc cổ thụ quyện xạ hương rừng sâu và thảo dược cung đình, hậu vị ngọt đậm ấm áp thiên thu.',
    note: 'Thớ gỗ đen óng ánh tinh dầu huyền bí, cấu trúc đặc khít chìm sâu trong nước khoáng, phát tỏa năng lượng trường cửu bảo hộ gia tộc.',
  },
  {
    id: 'bach-ky-dam-mon-115',
    name: 'Bạch Kỳ Nam Đầm Môn Cung Đình',
    age: '115 Năm Tuổi',
    origin: 'Bán Đảo Đầm Môn (Vịnh Vân Phong, Khánh Hòa)',
    oilRatio: '94.8% Nhựa Ngọc Trắng Ngà Hóa Thạch',
    optimalTemp: 128,
    burnDuration: '92 Giờ Khói Trầm Thanh Khiết',
    scentProfile: 'Hương sen ngậm sương mai buổi sớm hòa quyện giọt mật ong đại ngàn thanh khiết, tầng hương thăng hoa thanh tịnh tâm thức.',
    note: 'Khối kỳ sắc ngọc ngà độc bản thời triều Nguyễn, khai thác từ hốc đại thụ bách niên, thớ gỗ tự tẩm đẫm dịch nhựa thuần khiết.',
  },
  {
    id: 'thanh-ky-van-gia-108',
    name: 'Thanh Kỳ Nam Vạn Giã Khảm Vàng',
    age: '108 Năm Tuổi',
    origin: 'Vùng Núi Rừng Sâu Vạn Giã (Khánh Hòa)',
    oilRatio: '91.5% Nhựa Dầu Xanh Biếc Hóa Ngọc',
    optimalTemp: 136,
    burnDuration: '85 Giờ Thưởng Lãm Thư Phòng',
    scentProfile: 'Sắc hương thanh mát của tùng bách ngàn năm kết hợp hương phong lan rừng nở muộn, khai phóng tuệ giác và định tâm an nhiên.',
    note: 'Ánh sắc xanh ngọc bích lấp lánh khi chiếu ánh sáng tự nhiên, hàm lượng tinh dầu dồi dào tạo độ bóng mượt tự nhiên không qua mài giũa.',
  },
]

export function BespokeImperialKynamAndGoldFiligreeQilinIncenseBurnerVault() {
  const [activeKynam, setActiveKynam] = useState<KynamQilinSpec>(KYNAM_QILIN_LIST[0]!)
  const [temperature, setTemperature] = useState(124)
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

      gain1.gain.setValueAtTime(0.0001, now)
      gain1.gain.linearRampToValueAtTime(0.24, now + 0.04)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.6)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)
      osc1.start(now)
      osc1.stop(now + 3.65)

      // Upper Harmonic Osc
      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.0001, now)
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.06)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.8)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)
      osc2.start(now)
      osc2.stop(now + 2.85)
    } catch {
      // Audio playback silently ignored if blocked by autoplay policy
    }
  }

  const handleSelectKynam = (item: KynamQilinSpec) => {
    setActiveKynam(item)
    setTemperature(item.optimalTemp)
    playGoldChime(GOLD_BELL_528HZ, HARMONIC_741HZ)
  }

  const handleToggleHeat = () => {
    const nextState = !isHeating
    setIsHeating(nextState)
    if (nextState) {
      playGoldChime(HARMONIC_741HZ, GOLD_BELL_528HZ * 1.5)
    }
  }

  return (
    <section className="relative overflow-hidden bg-[#0d0907] py-20 text-[#eae4dd] border-t border-[#33221a]">
      {/* Background Decorative Radial Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.08),transparent_65%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(180,83,9,0.06),transparent_70%)]" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#d4a853]">
            Bảo Vật Phong Thủy & Không Gian Thưởng Trầm Hoàng Gia GuHomes
          </div>
          <h2 className="mt-4 font-serif text-3xl font-light tracking-wide text-[#f7f3ee] sm:text-4xl lg:text-5xl">
            Bảo Thất Kỳ Nam & Đỉnh Lư Vàng 24K Filigree Kỳ Lân Hý Châu
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#b8a898] sm:text-base">
            Kiệt tác đỉnh xông trầm chế tác thủ công bằng kỹ nghệ vàng ròng 24K Filigree họa tiết Kỳ Lân Hý Châu thời Lý - Trần,
            kết hợp ruột đồng đỏ đúc nguyên khối dày 10mm và bệ đỡ gỗ Trắc đỏ khảm Ngọc Bích Phỉ Thúy Type A, điều nhiệt điện tử 80°C - 240°C
            bảo toàn trọn vẹn từng phân tử hương quý giá.
          </p>

          {/* Sound Toggle */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                const nextState = !soundEnabled
                setSoundEnabled(nextState)
                if (nextState) playGoldChime(GOLD_BELL_528HZ, HARMONIC_741HZ)
              }}
              className="inline-flex items-center gap-2 rounded-full border border-[#5a4332] bg-[#1a120c] px-4 py-2 text-xs text-[#d4a853] transition-colors hover:border-[#d4a853]"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-[#d4a853]" />
                  <span>Âm Ba Chuông Vàng 528Hz & 741Hz Đang Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-[#8a7663]" />
                  <span>Bật Âm Ba Chuông Vàng Hoàng Cung (528Hz - 741Hz)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Layout: 2 Columns */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Qilin Incense Burner Visualization & Heat Controller */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-[#443022] bg-[#150e09]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              {/* Header Box */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2d1f16] pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#d4a853]">Chế Tác Thủ Công Giới Hạn</span>
                  <h3 className="font-serif text-xl font-medium text-[#f5efe6] sm:text-2xl">
                    Đỉnh Lư Vàng 24K Filigree Kỳ Lân Hý Châu
                  </h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-[#634832] bg-[#22160e] px-3 py-1.5 text-xs text-[#d4a853]">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#d4a853] animate-pulse" />
                  <span>Ruột Đồng Đỏ Đúc 10mm</span>
                </div>
              </div>

              {/* Graphic Visual Representation of the Qilin Burner */}
              <div className="relative my-8 flex h-72 flex-col items-center justify-center rounded-xl border border-[#3b281b] bg-gradient-to-b from-[#1b120a] to-[#0c0805] p-6 text-center">
                {/* Smoke Simulation Waves */}
                {isHeating && (
                  <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center">
                    <motion.div
                      animate={{
                        y: [-10, -60, -110],
                        opacity: [0, 0.7, 0],
                        scale: [0.8, 1.4, 2.2],
                        filter: ['blur(2px)', 'blur(6px)', 'blur(12px)'],
                      }}
                      transition={{
                        duration: 4.2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="h-16 w-32 rounded-full bg-gradient-to-t from-[#e8d5b5]/30 to-transparent"
                    />
                  </div>
                )}

                {/* Qilin Filigree Artwork Icon */}
                <div className="relative z-10 flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#d4a853]/60 bg-gradient-to-br from-[#d4a853]/20 via-[#443022]/40 to-[#1a120c] shadow-[0_0_40px_rgba(212,168,83,0.18)]">
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-3xl font-bold tracking-widest text-[#f5d796]">24K</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#d4a853]">Kỳ Lân Hý Châu</span>
                  </div>
                  {isHeating && (
                    <motion.div
                      animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute inset-0 rounded-full border-2 border-[#f5d796]"
                    />
                  )}
                </div>

                {/* Status Indicator */}
                <div className="relative z-10 mt-5">
                  <div className="text-xs uppercase tracking-widest text-[#a8927d]">Trạng Thái Gia Nhiệt Vi Mạch</div>
                  <div className="mt-1 font-serif text-2xl font-light text-[#f7f3ee]">
                    {temperature}°C
                    <span className="ml-2 text-sm text-[#d4a853]">
                      {isHeating ? '(Đang Tỏa Hương Khói Mỏng)' : '(Nhiệt Độ Ổn Định Sẵn Sàng)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Temperature Slider & Heat Control Button */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#b8a898]">
                  <span>Điều Chỉnh Dải Nhiệt Độ (80°C - 240°C):</span>
                  <span className="font-mono text-[#d4a853]">{temperature}°C</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={240}
                  value={temperature}
                  onChange={(e) => {
                    const newTemp = Number(e.target.value)
                    setTemperature(newTemp)
                    if (Math.abs(newTemp - activeKynam.optimalTemp) <= 2) {
                      playGoldChime(GOLD_BELL_528HZ, HARMONIC_741HZ)
                    }
                  }}
                  className="w-full cursor-pointer accent-[#d4a853] h-1.5 rounded-lg bg-[#2d1f16]"
                />
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      setTemperature(activeKynam.optimalTemp)
                      playGoldChime(GOLD_BELL_528HZ, HARMONIC_741HZ)
                    }}
                    className="rounded-lg border border-[#523d2e] bg-[#1a120c] px-3 py-1.5 text-xs text-[#d4a853] transition-colors hover:border-[#d4a853]"
                  >
                    Chuẩn Hóa Nhiệt Độ Khuyên Dùng ({activeKynam.optimalTemp}°C)
                  </button>
                  <button
                    onClick={handleToggleHeat}
                    className={`rounded-lg px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                      isHeating
                        ? 'bg-[#d4a853] text-[#1a120c] shadow-[0_0_20px_rgba(212,168,83,0.4)]'
                        : 'border border-[#d4a853] text-[#d4a853] hover:bg-[#d4a853]/10'
                    }`}
                  >
                    {isHeating ? 'Đang Xông Trầm (Tạm Dừng)' : 'Kích Hoạt Xông Trầm Vi Nhiệt'}
                  </button>
                </div>
              </div>

              {/* Technical Specifications of the Qilin Burner */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 border-t border-[#2d1f16] pt-6 text-center">
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Họa Tiết</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">Kỳ Lân Hý Châu</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Chất Liệu Filigree</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#d4a853]">Vàng 24K 99.99%</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Lõi Dẫn Nhiệt</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#e8ded3]">Đồng Đỏ 10mm</div>
                </div>
                <div className="rounded-lg bg-[#1a120c] p-2.5">
                  <div className="text-[10px] text-[#8a7663] uppercase">Bệ Đỡ Hoàng Triều</div>
                  <div className="mt-1 font-serif text-xs font-medium text-[#d4a853]">Trắc Đỏ & Phỉ Thúy</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Kynam Specimens Selector & Scent Profile */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-2xl border border-[#443022] bg-[#150e09]/90 p-6 shadow-2xl backdrop-blur-md sm:p-8">
              <h3 className="font-serif text-lg font-medium text-[#f5efe6] uppercase tracking-wider">
                Bộ Ba Kỳ Nam Quý Hiếm Tuyển Lựa
              </h3>
              <p className="mt-1 text-xs text-[#a8927d]">
                Chọn dòng Kỳ Nam tích tụ linh khí để kiểm định ngưỡng nhiệt phát hương tối ưu.
              </p>

              <div className="mt-5 space-y-3">
                {KYNAM_QILIN_LIST.map((item) => {
                  const isSelected = item.id === activeKynam.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectKynam(item)}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border-[#d4a853] bg-[#291b11] shadow-[0_0_15px_rgba(212,168,83,0.15)]'
                          : 'border-[#332216] bg-[#1a120c] hover:border-[#523d2e]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-sm font-medium text-[#f5efe6]">{item.name}</span>
                        {isSelected && <CheckIcon className="h-4 w-4 text-[#d4a853]" />}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-[#b8a898]">
                        <span className="rounded bg-[#0d0907] px-2 py-0.5 text-[#d4a853]">{item.age}</span>
                        <span className="rounded bg-[#0d0907] px-2 py-0.5">{item.origin}</span>
                      </div>
                      <div className="mt-2 text-xs text-[#8a7663]">
                        Hàm lượng dầu: <strong className="text-[#e0d6cb]">{item.oilRatio}</strong> · Nhiệt độ lý tưởng:{' '}
                        <strong className="text-[#d4a853]">{item.optimalTemp}°C</strong>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Detailed Card of Active Kynam */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeKynam.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 rounded-xl border border-[#3b281b] bg-[#110b07] p-5 space-y-3"
                >
                  <div className="text-xs uppercase tracking-wider text-[#d4a853]">Hồ Sơ Cảm Quan & Linh Khí</div>
                  <div className="font-serif text-base font-medium text-[#f5efe6]">{activeKynam.name}</div>
                  <p className="text-xs leading-relaxed text-[#c4b5a5] italic">
                    &ldquo;{activeKynam.scentProfile}&rdquo;
                  </p>
                  <div className="border-t border-[#241710] pt-3 text-xs text-[#9c8978]">
                    <span className="font-semibold text-[#b8a898]">Thời gian tỏa hương: </span>
                    {activeKynam.burnDuration}
                  </div>
                  <div className="text-xs text-[#9c8978]">
                    <span className="font-semibold text-[#b8a898]">Đặc tính cấu trúc: </span>
                    {activeKynam.note}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* GuHomes Guarantee */}
              <div className="mt-6 rounded-xl border border-[#523d2e]/40 bg-[#1e140d]/60 p-4 text-xs leading-relaxed text-[#b8a898]">
                <strong className="text-[#d4a853]">Cam kết độc bản GuHomes:</strong> Mỗi bộ đỉnh Kỳ Lân Hý Châu được đúc
                và hoàn thiện thủ công bởi nghệ nhân kim hoàn kim khí hoàng cung, lưu dấu ấn triện riêng của gia chủ và
                bảo chứng trọn đời tại xưởng may đo Thạnh Xuân 1.200m².
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
