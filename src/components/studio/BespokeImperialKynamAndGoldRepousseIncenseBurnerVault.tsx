'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio Golden Bell tone
const GOLD_BELL_528HZ = 528

interface KynamVariety {
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

const KYNAM_VARIETIES: readonly KynamVariety[] = [
  {
    id: 'hac-ky-tra-bong',
    name: 'Hắc Kỳ Nam Trà Bồng Bách Niên',
    age: '102 Năm Tuổi',
    origin: 'Rừng Già Trà Bồng (Quảng Ngãi)',
    oilRatio: '86.4% Tinh Dầu Kỳ Đọng',
    optimalTemp: 135,
    burnDuration: '48 Giờ Tỏa Hương Tĩnh Lặng',
    scentProfile: 'Hương thơm ngọt sâu lắng, hậu vị quả dại chín mọng xen lẫn hổ phách trầm ấm.',
    note: 'Thớ gỗ đen óng như sáp ong rừng, khi gia nhiệt tỏa làn khói chỉ mỏng như sợi tơ lụa.',
  },
  {
    id: 'hoang-ky-suoi-cat',
    name: 'Hoàng Kỳ Nam Suối Cát Khánh Hòa',
    age: '88 Năm Tuổi',
    origin: 'Dãy Núi Hòn Bà - Suối Cát (Khánh Hòa)',
    oilRatio: '81.2% Nhựa Vàng Mật Ong',
    optimalTemp: 148,
    burnDuration: '36 Giờ Ngát Hương Tinh Khiết',
    scentProfile: 'Ngọt bùi hoa lan rừng, thanh tao như sương mai ngưng đọng trên ngọn cổ thụ.',
    note: 'Sắc vàng óng ánh màu hổ phách quý tộc, đặc hữu vùng duyên hải Nam Trung Bộ.',
  },
  {
    id: 'bach-ky-van-gia',
    name: 'Bạch Kỳ Nam Vạn Giã Hoàng Gia',
    age: '96 Năm Tuổi',
    origin: 'Rừng Cấm Vạn Ninh (Khánh Hòa)',
    oilRatio: '92.8% Kỳ Nam Thượng Hạng',
    optimalTemp: 128,
    burnDuration: '72 Giờ Trầm Tích Không Khói',
    scentProfile: 'Hương thơm biến chuyển tam tầng: mát lạnh đầu mũi, ngọt đằm vị mật sen, hậu vị ngát gỗ thông cổ.',
    note: 'Cực phẩm ngự dụng thời phong kiến, chất lượng tinh dầu cao nhất trong các loại Kỳ Nam.',
  },
]

export function BespokeImperialKynamAndGoldRepousseIncenseBurnerVault() {
  const [activeKynam, setActiveKynam] = useState<KynamVariety>(KYNAM_VARIETIES[0]!)
  const [temperature, setTemperature] = useState(135)
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

  const playGoldBell = (freq: number) => {
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
      const osc = audioCtxRef.current.createOscillator()
      const gain = audioCtxRef.current.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      // Gold resonance envelope
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.24, now + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.6)

      osc.connect(gain)
      gain.connect(audioCtxRef.current.destination)

      osc.start(now)
      osc.stop(now + 3.65)
    } catch {
      // Audio fallback
    }
  }

  const handleSelectKynam = (item: KynamVariety) => {
    setActiveKynam(item)
    setTemperature(item.optimalTemp)
    setIsHeating(true)
    playGoldBell(GOLD_BELL_528HZ)
    setTimeout(() => setIsHeating(false), 400)
  }

  return (
    <section className="u-gutter my-[clamp(4.5rem,10vh,8rem)]">
      <div className="mx-auto w-full max-w-[110rem] rounded-2xl border border-line/80 bg-surface/90 p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {/* Top Header */}
        <div className="flex flex-col gap-4 border-b border-line/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[50rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Bảo Thất Ngự Hương Hoàng Gia · GuHomes Bespoke 2026
            </div>
            <h2 className="u-display-sm mt-4 text-ink">
              Bảo Thất Ngự Hương Kỳ Nam & Đỉnh Lư Vàng 24K Chạm Nổi Repoussé
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Tác phẩm ngự hương được hoàn thiện trên án gỗ Mun hoa ngâm nước cổ thụ kết hợp nẹp đồng thau chải xước và mặt đá Thạch Anh Tím Gia Lai thấu quang. Đỉnh lư chế tác từ vàng 24K nguyên chất dày 1.5mm chạm nổi phù điêu Phượng Vũ Cung Đình theo kỹ thuật gõ thúc Repoussé Đồng Xâm, lòng lót đồng đỏ 8mm cách nhiệt giúp vi lượng Kỳ Nam tỏa hương thuần khiết không sinh khói khét.
            </p>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const nextState = !soundEnabled
                setSoundEnabled(nextState)
                if (nextState) playGoldBell(GOLD_BELL_528HZ)
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-accent/40 bg-canvas/80 px-4 py-2 text-xs font-mono text-ink transition-all hover:border-accent hover:bg-accent/10 active:scale-95 cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-accent" />
                  <span>Chuông Vàng 528Hz: Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-muted" />
                  <span>Chuông Vàng 528Hz: Tắt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Workspace */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left: Kynam Varieties Selection */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                01 / Tuyển Chọn Phẩm Cấp Kỳ Nam Ngự Dụng
              </span>
              <span className="text-xs font-mono text-muted">Lưu trữ hộp gỗ Mun lót lụa</span>
            </div>

            <div className="flex flex-col gap-3">
              {KYNAM_VARIETIES.map((kynam) => {
                const isSelected = kynam.id === activeKynam.id
                return (
                  <button
                    key={kynam.id}
                    type="button"
                    onClick={() => handleSelectKynam(kynam)}
                    className={`min-h-[44px] flex flex-col p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-accent bg-accent/15 shadow-[0_0_20px_rgba(197,168,128,0.25)]'
                        : 'border-line/60 bg-surface/50 hover:border-accent/40 hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-semibold text-ink">
                        {kynam.name}
                      </span>
                      <span className="font-mono text-xs text-accent">
                        {kynam.age}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted font-mono">
                      <span>Xuất xứ: {kynam.origin}</span>
                      <span>·</span>
                      <span className="text-accent">{kynam.oilRatio}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-ink/75">
                      {kynam.scentProfile}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Selected Spec Card */}
            <div className="rounded-xl border border-accent/40 bg-surface/80 p-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-accent block">
                Đặc Tính Thể Chất:
              </span>
              <p className="mt-2 text-xs leading-relaxed text-ink/85 italic">
                &ldquo;{activeKynam.note}&rdquo;
              </p>
              <div className="mt-3 flex items-center justify-between text-xs border-t border-line/40 pt-2 font-mono">
                <span className="text-muted">Thời lượng tỏa hương:</span>
                <span className="font-semibold text-accent">{activeKynam.burnDuration}</span>
              </div>
            </div>
          </div>

          {/* Right: Gold Repousse Incense Burner & Thermal Control */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                02 / Đỉnh Lư Vàng 24K Repoussé & Kiểm Soát Nhiệt Độ
              </span>
              <span className="text-xs font-mono text-muted">Đồng đỏ 8mm lót đáy</span>
            </div>

            {/* Thermal Visualizer */}
            <div className="relative rounded-xl border border-line/60 bg-espresso/10 p-6 flex flex-col items-center overflow-hidden">
              {/* Gold Incense Burner Silhouette Graphic */}
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-2 border-accent/60 bg-gradient-to-br from-amber-600/20 via-yellow-700/30 to-amber-950/40 shadow-inner">
                {/* Simulated Heat Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-4 rounded-full bg-gradient-to-tr from-amber-400/25 via-yellow-300/30 to-transparent blur-md"
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="font-mono text-2xl font-bold text-accent-soft">
                    {temperature}°C
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-canvas/70">
                    Gia Nhiệt Vi Mạch
                  </span>
                  <span className="mt-1 text-[11px] font-body text-accent">
                    {temperature === activeKynam.optimalTemp
                      ? 'Nhiệt độ tối ưu'
                      : temperature > activeKynam.optimalTemp
                        ? 'Nhiệt độ cao'
                        : 'Nhiệt độ êm'}
                  </span>
                </div>
              </div>

              {/* Slider for Temperature Control */}
              <div className="w-full mt-6 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted">Dải nhiệt: 80°C</span>
                  <span className="text-accent font-semibold">Hiện tại: {temperature}°C</span>
                  <span className="text-muted">225°C</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="225"
                  value={temperature}
                  onChange={(e) => {
                    setTemperature(Number(e.target.value))
                    playGoldBell(GOLD_BELL_528HZ)
                  }}
                  className="w-full h-2 rounded-lg bg-line/80 accent-accent cursor-pointer"
                />
              </div>

              {/* Quick Preset Buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setTemperature(activeKynam.optimalTemp)
                    playGoldBell(GOLD_BELL_528HZ)
                  }}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-full border border-accent bg-accent/20 hover:bg-accent hover:text-canvas text-xs font-mono text-accent transition-all cursor-pointer"
                >
                  Nhiệt Chuẩn ({activeKynam.optimalTemp}°C)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTemperature(110)
                    playGoldBell(GOLD_BELL_528HZ)
                  }}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-full border border-line bg-canvas hover:border-accent text-xs font-mono text-ink transition-all cursor-pointer"
                >
                  Ủ Êm Dịu (110°C)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTemperature(165)
                    playGoldBell(GOLD_BELL_528HZ)
                  }}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-full border border-line bg-canvas hover:border-accent text-xs font-mono text-ink transition-all cursor-pointer"
                >
                  Đậm Đà (165°C)
                </button>
              </div>
            </div>

            {/* Repousse Gold Art Details */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Chất liệu đỉnh lư:</span>
                <span className="font-semibold text-ink mt-0.5 block">Vàng 24K Dày 1.5mm</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Kỹ thuật kim hoàn:</span>
                <span className="font-semibold text-ink mt-0.5 block">Chạm Thúc Repoussé</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Đế lót lòng lư:</span>
                <span className="font-semibold text-accent mt-0.5 block">Đồng Đỏ Mộc 8mm</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-3">
                <span className="text-muted block text-[10px] font-mono">Khung án bảo thất:</span>
                <span className="font-semibold text-ink mt-0.5 block truncate">Mun Hoa & Thạch Anh Tím</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line/60 pt-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            <span>Chế tác độc bản tại xưởng Thạnh Xuân, Quận 12 (1.200m²) theo đơn đặt hàng may đo riêng.</span>
          </div>
          <div className="font-mono text-ink/75">
            Tư vấn phòng thờ & xông trầm: <span className="font-bold text-accent">0368 757 916</span> · GuHomes
          </div>
        </div>
      </div>
    </section>
  )
}
