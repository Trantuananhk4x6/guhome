'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, VolumeIcon, VolumeOffIcon } from '@/components/ui/icons'

// Audio frequency: 528Hz Solfeggio frequency for Zen restoration
const SOLFEGGIO_528HZ = 528

interface LouverPosition {
  id: string
  angle: number
  label: string
  windSpeed: string
  coolingDelta: string
  description: string
}

const LOUVER_POSITIONS: readonly LouverPosition[] = [
  {
    id: 'flush-sealed',
    angle: 0,
    label: 'Khép Kín Ngàm Khí (0°)',
    windSpeed: '0.0 m/s',
    coolingDelta: '-0.5°C',
    description: 'Hệ cửa bản lề gỗ Mun sừng khép kín ngàm hèm kép, chắn mưa rào nhiệt đới và lưu giữ khí máy lạnh phòng trà.',
  },
  {
    id: 'morning-breeze',
    angle: 30,
    label: 'Nghinh Phong Ban Mai (30°)',
    windSpeed: '2.1 m/s',
    coolingDelta: '-2.2°C',
    description: 'Mở hé đón làn gió sớm trong lành từ rạch Thảo Điền, hơi nước hào sen Bách Diệp thẩm thấu tự nhiên.',
  },
  {
    id: 'noon-convective',
    angle: 60,
    label: 'Đối Lưu Nắng Trưa (60°)',
    windSpeed: '3.6 m/s',
    coolingDelta: '-3.5°C',
    description: 'Góc nghiêng vàng tán xạ tia bức xạ mặt trời, dẫn luồng gió mát đối lưu qua mặt nước thác đá Bazan.',
  },
  {
    id: 'afternoon-gale',
    angle: 90,
    label: 'Mở Rộng Đón Gió Sông (90°)',
    windSpeed: '4.8 m/s',
    coolingDelta: '-4.3°C',
    description: 'Mở bung toàn phần hướng sông Sài Gòn lúc hoàng hôn, đón trọn luồng gió mát tự nhiên êm ái.',
  },
]

interface BonsaiSpec {
  id: string
  name: string
  age: string
  height: string
  origin: string
  potMaterial: string
  weight: string
  teaPairing: string
}

const BONSAI_SPECS: readonly BonsaiSpec[] = [
  {
    id: 'mai-chieu-thuy-thuy-chieu',
    name: 'Mai Chiếu Thủy Cổ Thụ Dáng Thủy Triều',
    age: '95 Năm Tuổi',
    height: '118 cm',
    origin: 'Vườn Kiểng Cổ Sa Đéc (Đồng Tháp)',
    potMaterial: 'Chậu Gốm Cây Mai Lái Thiêu Men Tro Cổ 1958',
    weight: '168 kg',
    teaPairing: 'Trà Shan Tuyết Cổ Thụ Suối Giàng 500 Năm',
  },
  {
    id: 'tung-la-han-thac-do',
    name: 'Tùng La Hán Bách Niên Dáng Thác Đổ',
    age: '112 Năm Tuổi',
    height: '145 cm',
    origin: 'Cố Đô Huế (Dinh Thự Thượng Thư)',
    potMaterial: 'Chậu Sa Thạch Non Nước Chạm Nổi Tứ Linh',
    weight: '215 kg',
    teaPairing: 'Lão Trà Ô Long Đại Vũ Lĩnh 28 Năm',
  },
  {
    id: 'canh-thang-ngu-long',
    name: 'Cần Thăng Cổ Thụ Dáng Ngũ Long Quần Tụ',
    age: '86 Năm Tuổi',
    height: '98 cm',
    origin: 'Vùng Đất Phù Sa Cù Lao Bến Tre',
    potMaterial: 'Chậu Gốm Bát Tràng Men Rạn Giả Cổ Khắc Lũy Tre',
    weight: '142 kg',
    teaPairing: 'Trà Móc Câu Tân Cương Đinh Ngọc Hoàng Gia',
  },
]

export function SaigonCanalSideAncientHingedEbonyTeaBonsaiPavilion() {
  const [selectedLouver, setSelectedLouver] = useState<LouverPosition>(LOUVER_POSITIONS[1]!)
  const [selectedBonsai, setSelectedBonsai] = useState<BonsaiSpec>(BONSAI_SPECS[0]!)
  const [rotationAngle, setRotationAngle] = useState(45)
  const [isRotating, setIsRotating] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        void audioCtxRef.current.close()
      }
    }
  }, [])

  const playZenBell = (frequency: number) => {
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
      osc.frequency.setValueAtTime(frequency, now)

      // Bell harmonics
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.28, now + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8)

      osc.connect(gain)
      gain.connect(audioCtxRef.current.destination)

      osc.start(now)
      osc.stop(now + 3.85)
    } catch {
      // Ignore audio context autoplay limitations
    }
  }

  const handleRotate = (delta: number) => {
    setIsRotating(true)
    setRotationAngle((prev) => (prev + delta + 360) % 360)
    playZenBell(SOLFEGGIO_528HZ)
    setTimeout(() => setIsRotating(false), 300)
  }

  return (
    <section className="u-gutter my-[clamp(4.5rem,10vh,8rem)]">
      <div className="mx-auto w-full max-w-[110rem] rounded-2xl border border-line/80 bg-surface/90 p-6 sm:p-10 lg:p-14 shadow-[0_24px_64px_rgba(0,0,0,0.18)] backdrop-blur-md">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-line/60 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[48rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Công Trình Thủy Đình Bên Sông Sài Gòn · GuHomes Atelier 2026
            </div>
            <h2 className="u-display-sm mt-4 text-ink">
              Thủy Đình Gỗ Mun Sừng, Cửa Bản Lề Xoay & Hồ Sen Bách Diệp
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Tọa lạc tại mép nước rạch Thảo Điền, công trình ứng dụng gỗ Mun sừng Khánh Hòa 95 năm tuổi (Diospyros mun, tỷ trọng 1.15 g/cm³, chìm dưới nước) làm hệ cửa bản lề cối xoay đón gió đối lưu. Thác nước đá Bazan Đắk Nông tuần hoàn giúp hạ nhiệt 4.3°C, kết hợp bệ xoay Bonsai 360° nẹp đồng chải xước phục vụ gia chủ thưởng ngoạn phong vị sông nước Nam Bộ.
            </p>
          </div>

          {/* Sound Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const nextState = !soundEnabled
                setSoundEnabled(nextState)
                if (nextState) playZenBell(SOLFEGGIO_528HZ)
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-accent/40 bg-canvas/80 px-4 py-2 text-xs font-mono text-ink transition-all hover:border-accent hover:bg-accent/10 active:scale-95 cursor-pointer"
            >
              {soundEnabled ? (
                <>
                  <VolumeIcon className="h-4 w-4 text-accent" />
                  <span>Chuông Thiền 528Hz: Bật</span>
                </>
              ) : (
                <>
                  <VolumeOffIcon className="h-4 w-4 text-muted" />
                  <span>Chuông Thiền 528Hz: Tắt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="mt-10 grid gap-8 lg:grid-cols-12">
          {/* Left: Louver Control & Microclimate Simulator */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                01 / Vị Trí Cửa Bản Lề Mun Sừng
              </span>
              <span className="text-xs font-mono text-muted">Bản lề cối mộng chốt đồng</span>
            </div>

            <p className="text-xs text-ink/70">
              Chọn góc mở cửa bản lề để quan sát sự biến thiên của vận tốc gió sông Sài Gòn và mức hạ nhiệt vi khí hậu tự nhiên:
            </p>

            {/* Position Selector */}
            <div className="grid grid-cols-2 gap-3">
              {LOUVER_POSITIONS.map((pos) => {
                const isActive = pos.id === selectedLouver.id
                return (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => {
                      setSelectedLouver(pos)
                      playZenBell(SOLFEGGIO_528HZ)
                    }}
                    className={`min-h-[44px] flex flex-col p-3 rounded-lg border text-left transition-all cursor-pointer ${
                      isActive
                        ? 'border-accent bg-accent/15 shadow-[0_0_16px_rgba(197,168,128,0.25)]'
                        : 'border-line/60 bg-surface/50 hover:border-accent/40 hover:bg-surface'
                    }`}
                  >
                    <span className="text-xs font-display font-medium text-ink">
                      {pos.label}
                    </span>
                    <span className="mt-1 font-mono text-[11px] text-accent">
                      {pos.coolingDelta} · {pos.windSpeed}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Active Position Detail */}
            <div className="rounded-lg border border-accent/30 bg-surface/80 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-muted">Vận tốc gió đối lưu:</span>
                <span className="font-mono font-medium text-accent">{selectedLouver.windSpeed}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="font-mono text-muted">Hiệu quả hạ nhiệt thực tế:</span>
                <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  {selectedLouver.coolingDelta}
                </span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-ink/80 border-t border-line/40 pt-3">
                {selectedLouver.description}
              </p>
            </div>

            {/* Visual Door Angle Gauge */}
            <div className="relative h-28 rounded-lg border border-line/60 bg-espresso/5 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="h-20 w-20 rounded-full border border-dashed border-ink" />
              </div>
              <motion.div
                animate={{ rotate: selectedLouver.angle }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className="relative h-20 w-3 rounded-sm bg-gradient-to-b from-stone-800 via-stone-900 to-black shadow-lg"
              >
                <div className="absolute top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" />
                <div className="absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent" />
              </motion.div>
              <div className="absolute bottom-2 left-4 text-[10px] font-mono text-muted">
                Trục cối đồng thau mộng cối âm dương
              </div>
              <div className="absolute bottom-2 right-4 text-[10px] font-mono font-bold text-accent">
                {selectedLouver.angle}° Góc mở
              </div>
            </div>
          </div>

          {/* Right: Bonsai Showcase & 360 Rotation Base */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                02 / Bệ Xoay Bonsai 360° Bằng Đồng Thau & Thép Không Gỉ
              </span>
              <span className="text-xs font-mono text-muted">Tải trọng tĩnh 300kg</span>
            </div>

            {/* Bonsai Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted">Chọn thế cây thưởng ngoạn:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {BONSAI_SPECS.map((b) => {
                  const isCur = b.id === selectedBonsai.id
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => {
                        setSelectedBonsai(b)
                        playZenBell(SOLFEGGIO_528HZ)
                      }}
                      className={`min-h-[44px] flex flex-col justify-center px-3 py-2 rounded-lg border text-left transition-all cursor-pointer ${
                        isCur
                          ? 'border-accent bg-accent/15 font-medium'
                          : 'border-line/60 bg-surface/50 hover:border-accent/40'
                      }`}
                    >
                      <span className="text-[11px] font-display text-ink truncate">{b.name}</span>
                      <span className="text-[10px] font-mono text-accent">{b.age}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Rotation Control Console */}
            <div className="rounded-xl border border-line/60 bg-surface/70 p-5 flex flex-col items-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-dashed border-accent/40 bg-canvas shadow-inner">
                {/* Turntable Disc */}
                <motion.div
                  animate={{ rotate: rotationAngle }}
                  transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                  className="flex h-28 w-28 items-center justify-center rounded-full border border-accent/60 bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-950 text-canvas shadow-xl"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="font-mono text-xs font-bold text-accent-soft">{rotationAngle}°</span>
                    <span className="text-[9px] font-mono text-muted">Góc Xoay</span>
                  </div>
                </motion.div>

                {/* Compass markers */}
                <span className="absolute top-1 text-[9px] font-mono text-muted">Bắc</span>
                <span className="absolute bottom-1 text-[9px] font-mono text-muted">Nam</span>
                <span className="absolute left-1 text-[9px] font-mono text-muted">Tây</span>
                <span className="absolute right-1 text-[9px] font-mono text-muted">Đông</span>
              </div>

              {/* Angle Control Buttons */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRotate(-45)}
                  className="min-h-[44px] px-4 py-2 rounded-full border border-line bg-canvas hover:border-accent text-xs font-mono text-ink active:scale-95 transition-all cursor-pointer"
                >
                  Quay Trái 45°
                </button>
                <button
                  type="button"
                  onClick={() => handleRotate(45)}
                  className="min-h-[44px] px-4 py-2 rounded-full border border-line bg-canvas hover:border-accent text-xs font-mono text-ink active:scale-95 transition-all cursor-pointer"
                >
                  Quay Phải 45°
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRotationAngle(0)
                    playZenBell(SOLFEGGIO_528HZ)
                  }}
                  className="min-h-[44px] px-4 py-2 rounded-full border border-accent/40 bg-accent/10 hover:bg-accent hover:text-canvas text-xs font-mono text-accent active:scale-95 transition-all cursor-pointer"
                >
                  Về 0°
                </button>
              </div>
            </div>

            {/* Bonsai Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-line/40 bg-surface/50 p-2.5">
                <span className="text-muted block text-[10px] font-mono">Xuất xứ danh gia:</span>
                <span className="font-medium text-ink mt-0.5 block">{selectedBonsai.origin}</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-2.5">
                <span className="text-muted block text-[10px] font-mono">Chất liệu chậu:</span>
                <span className="font-medium text-ink mt-0.5 block truncate">{selectedBonsai.potMaterial}</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-2.5">
                <span className="text-muted block text-[10px] font-mono">Khối lượng chậu & cây:</span>
                <span className="font-medium text-accent mt-0.5 block">{selectedBonsai.weight}</span>
              </div>
              <div className="rounded-lg border border-line/40 bg-surface/50 p-2.5">
                <span className="text-muted block text-[10px] font-mono">Trà ngự dụng tương hợp:</span>
                <span className="font-medium text-ink mt-0.5 block truncate">{selectedBonsai.teaPairing}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-line/60 pt-6 text-xs text-muted">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-accent" />
            <span>Xưởng mộc may đo Thạnh Xuân, Quận 12 gia công mộng gỗ truyền thống không đinh kim loại.</span>
          </div>
          <div className="font-mono text-ink/75">
            Hotline KTS Trưởng: <span className="font-bold text-accent">0368 757 916</span> · GuHomes
          </div>
        </div>
      </div>
    </section>
  )
}
