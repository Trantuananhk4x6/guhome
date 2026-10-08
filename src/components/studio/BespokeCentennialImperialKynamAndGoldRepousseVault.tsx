'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio Golden Lotus Bell tone & 741Hz Awakening harmonic
const GOLD_BELL_528HZ = 528
const HARMONIC_741HZ = 741

interface KynamCentennialSpec {
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

const CENTENNIAL_KYNAM_LIST: readonly KynamCentennialSpec[] = [
  {
    id: 'bach-ky-dam-mon-120',
    name: 'Bạch Kỳ Nam Đầm Môn Cổ Thụ (120 Năm)',
    age: '120 Năm Tuổi',
    origin: 'Bán Đảo Đầm Môn (Vịnh Vân Phong, Khánh Hòa)',
    oilRatio: '95.8% Tinh Dầu Kỳ Hóa Ngọc',
    optimalTemp: 126,
    burnDuration: '96 Giờ Khói Trầm Tinh Khiết',
    scentProfile: 'Hương thơm cao quý tột bậc: hương sen ngậm sương mai quyện vị mật ong rừng sâu lắng, hậu vị ngọt thanh vĩnh cửu.',
    note: 'Chất gỗ ngả màu ngọc thạch trắng ngà nguyên khối, tích tụ linh khí đất trời qua hơn một thế kỷ, không lẫn tạp chất mộc.',
  },
  {
    id: 'thanh-ky-hon-heo-100',
    name: 'Thanh Kỳ Nam Hòn Hèo Tuyệt Đỉnh (100 Năm)',
    age: '100 Năm Tuổi',
    origin: 'Dãy Núi Hòn Hèo (Ninh Hòa, Khánh Hòa)',
    oilRatio: '89.4% Nhựa Dầu Xanh Biếc',
    optimalTemp: 138,
    burnDuration: '72 Giờ Lan Tỏa Khắp Thư Phòng',
    scentProfile: 'Hương thanh mát của tùng bách ngàn năm xen lẫn hoa phong lan rừng, tạo không gian thiền định trầm ấm và trí tuệ.',
    note: 'Thớ gỗ ánh sắc xanh biếc huyền ảo, mật độ tinh dầu đồng nhất, chìm 100% trong nước khoáng tự nhiên.',
  },
  {
    id: 'hoang-ky-an-khe-110',
    name: 'Hoàng Kỳ Nam An Khê Vương Giả (110 Năm)',
    age: '110 Năm Tuổi',
    origin: 'Cao Nguyên An Khê (Gia Lai)',
    oilRatio: '91.2% Nhựa Vàng Óng Ánh Hổ Phách',
    optimalTemp: 146,
    burnDuration: '84 Giờ Trầm Tích Hoàng Cung',
    scentProfile: 'Đượm vị ngọt bùi của hổ phách và quế chi cổ, lan tỏa ấm áp như ánh hoàng hôn trên đỉnh non cao.',
    note: 'Sắc vàng hổ phách quý hiếm thời phong kiến, đầm tay và phát tán năng lượng ấm áp ngay ở nhiệt độ phòng.',
  },
]

export function BespokeCentennialImperialKynamAndGoldRepousseVault() {
  const [activeKynam, setActiveKynam] = useState<KynamCentennialSpec>(CENTENNIAL_KYNAM_LIST[0]!)
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

      gain1.gain.setValueAtTime(0.0001, now)
      gain1.gain.linearRampToValueAtTime(0.24, now + 0.04)
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 3.6)

      osc1.connect(gain1)
      gain1.connect(audioCtxRef.current.destination)
      osc1.start(now)
      osc1.stop(now + 3.65)

      // Golden Harmonic Osc
      const osc2 = audioCtxRef.current.createOscillator()
      const gain2 = audioCtxRef.current.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(f2, now)

      gain2.gain.setValueAtTime(0.0001, now)
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.05)
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 2.5)

      osc2.connect(gain2)
      gain2.connect(audioCtxRef.current.destination)
      osc2.start(now)
      osc2.stop(now + 2.55)
    } catch {
      // Audio fallback
    }
  }

  const handleStartHeating = () => {
    setIsHeating(true)
    playGoldChime(GOLD_BELL_528HZ, HARMONIC_741HZ)
    setTimeout(() => setIsHeating(false), 2400)
  }

  return (
    <section className="u-gutter my-[clamp(4.5rem,10vh,8rem)]">
      <div className="mx-auto w-full max-w-[110rem] rounded-2xl border border-line/80 bg-surface/90 p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-line/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[50rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Bảo Thất Cung Đình Kỷ Niệm Thế Kỷ · GuHomes Atelier 2026
            </div>
            <h2 className="u-display-sm mt-4 text-ink">
              Bảo Thất Kỳ Nam & Đỉnh Lư Vàng 24K Gõ Thúc Cửu Long Tranh Châu
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Đỉnh lư chế tác từ lá vàng 24K dày 1.8mm gõ thúc thủ công Repoussé hình Cửu Long Tranh Châu triều Nguyễn, lồng lõi đồng đỏ đúc liền khối dày 10mm chịu nhiệt độ cao không biến dạng. Đặt trang trọng trên án gỗ Trắc đỏ Nam Bộ khảm ngọc Phỉ Thúy Type A, tích hợp vi mạch cảm ứng điều nhiệt chính xác 80°C đến 240°C bảo toàn trọn vẹn tinh dầu kỳ nam quý hiếm.
            </p>
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const nextState = !soundEnabled
                setSoundEnabled(nextState)
                if (nextState) playGoldChime(GOLD_BELL_528HZ, HARMONIC_741HZ)
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-accent/40 bg-canvas/80 px-4 py-2 text-xs font-mono text-ink transition-all hover:border-accent hover:bg-accent/10 active:scale-95 cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-accent" />
                  <span>Chuông Vàng 528Hz & 741Hz: Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-muted" />
                  <span>Chuông Vàng: Tắt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left: Kynam Variety Selector */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                01 / Tuyển Chọn Danh Phẩm Kỳ Nam Thế Kỷ
              </span>
              <span className="text-xs font-mono text-muted">Giám định 100% tự nhiên</span>
            </div>

            <div className="grid gap-3">
              {CENTENNIAL_KYNAM_LIST.map((item) => {
                const isSelected = item.id === activeKynam.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveKynam(item)
                      setTemperature(item.optimalTemp)
                      playGoldChime(GOLD_BELL_528HZ, HARMONIC_741HZ)
                    }}
                    className={`min-h-[44px] flex flex-col p-4 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-accent bg-accent/20 shadow-[0_0_20px_rgba(197,168,128,0.25)]'
                        : 'border-line/60 bg-surface/40 hover:border-accent/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-medium text-ink">
                        {item.name}
                      </span>
                      <span className="font-mono text-xs text-accent">
                        {item.oilRatio}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
                      {item.scentProfile}
                    </p>
                    <div className="mt-2 flex items-center gap-4 text-[11px] font-mono text-muted">
                      <span>Nhiệt độ tối ưu: {item.optimalTemp}°C</span>
                      <span>·</span>
                      <span>Thời lượng: {item.burnDuration}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Note Box */}
            <div className="rounded-lg border border-accent/30 bg-surface/70 p-4 text-xs leading-relaxed text-ink/80">
              <span className="font-mono text-[10px] text-accent block uppercase mb-1">
                Đặc Tính Trầm Tích Vật Lý:
              </span>
              {activeKynam.note}
            </div>
          </div>

          {/* Right: Thermal Precision Controller & 3D Incense Chamber */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                02 / Điều Nhiệt Vi Mạch & Thử Khói Trầm Hương
              </span>
              <span className="text-xs font-mono text-muted">Độ chính xác ±0.5°C</span>
            </div>

            {/* Temperature Slider */}
            <div className="flex flex-col gap-3 rounded-xl border border-line/50 bg-surface/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-ink">Nhiệt Độ Xông Hương:</span>
                <span className="font-mono text-base font-semibold text-accent">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                step="1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent"
              />
              <div className="flex justify-between font-mono text-[10px] text-muted">
                <span>80°C (Ủ Ấm)</span>
                <span>126°C (Bạch Kỳ)</span>
                <span>146°C (Hoàng Kỳ)</span>
                <span>240°C (Cực Hạn)</span>
              </div>
            </div>

            {/* Visual Incense Chamber */}
            <div className="relative h-44 rounded-xl border border-line/60 bg-gradient-to-b from-espresso/15 to-surface/80 flex flex-col items-center justify-center overflow-hidden">
              {/* Gold Filigree & Repousse Pattern Glow */}
              <motion.div
                className="relative h-24 w-28 rounded-t-3xl border-2 border-accent/60 bg-gradient-to-b from-accent/20 to-accent/5 flex items-center justify-center shadow-lg"
                animate={{
                  boxShadow: isHeating
                    ? '0 0 35px rgba(212,175,55,0.6)'
                    : '0 0 15px rgba(212,175,55,0.2)',
                }}
                transition={{ duration: 0.8 }}
              >
                <span className="font-mono text-[11px] text-accent/90 uppercase tracking-widest text-center px-1">
                  Đỉnh Lư 24K Cửu Long
                </span>

                {/* Animated Incense Smoke Stream */}
                <AnimatePresence>
                  {isHeating && (
                    <motion.div
                      key="smoke-stream"
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: [0, 0.8, 0], y: -45, scale: [0.8, 1.3, 1.8] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
                      className="absolute -top-6 h-12 w-6 rounded-full bg-gradient-to-t from-accent/40 via-white/40 to-transparent blur-sm pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Incense Burner Pedestal */}
              <div className="h-4 w-36 bg-amber-950/80 border border-amber-900/60 rounded-sm -mt-0.5 flex items-center justify-center">
                <span className="text-[9px] font-mono text-accent/70">Án Trắc Đỏ Khảm Ngọc Phỉ Thúy</span>
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-2 font-mono text-[10px] text-muted">
                {isHeating ? 'Đang lan tỏa làn khói thanh tịnh...' : 'Sẵn sàng kích hoạt xông hương vi mạch'}
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={handleStartHeating}
              disabled={isHeating}
              className="min-h-[44px] w-full rounded-xl bg-accent text-canvas font-medium text-xs sm:text-sm shadow-md hover:bg-accent/90 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{isHeating ? 'Đang Khởi Nhiệt Lan Tỏa Khói Trầm...' : 'Kích Hoạt Lò Xông Vàng 24K (Âm Vang 528Hz & 741Hz)'}</span>
            </button>

            {/* Metallurgy & Gemology Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Độ Dày Lá Vàng:</span>
                <span className="font-medium text-ink">1.8 mm Vàng 24K Gõ Thúc</span>
              </div>
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Lòng Lư Đồng Đỏ:</span>
                <span className="font-medium text-ink">10 mm Đồng Liền Khối</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 flex flex-col gap-3 rounded-xl border border-line/50 bg-canvas/40 p-4 sm:flex-row sm:items-center sm:justify-between text-xs text-ink/70">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-emerald-500" />
            <span>Kỳ nam 100% tự nhiên khai thác bền vững kèm chứng thư kiểm định đá quý hoàng gia.</span>
          </div>
          <div className="font-mono text-muted">
            Xưởng May Đo Nội Thất Thạnh Xuân (1.200m²): <span className="text-ink font-semibold">Trần 12 công trình/năm</span>
          </div>
        </div>
      </div>
    </section>
  )
}
