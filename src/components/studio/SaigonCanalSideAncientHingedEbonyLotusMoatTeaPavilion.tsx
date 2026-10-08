'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
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
    coolingDelta: '-0.7°C',
    description: 'Hệ cửa bản lề cối gỗ Mun sừng Khánh Hòa khép kín ngàm hèm kép mạ đồng thau, chắn mưa giông nhiệt đới và cô đọng làn hương sen bách diệp thanh tao.',
  },
  {
    id: 'morning-breeze',
    angle: 30,
    label: 'Bình Minh Sen Nở (30°)',
    windSpeed: '2.4 m/s',
    coolingDelta: '-2.5°C',
    description: 'Mở hé 30 độ đón luồng gió sớm từ nhánh sông Sài Gòn, hơi sương ẩm hào sen bách diệp lan tỏa êm dịu khắp trà thất.',
  },
  {
    id: 'noon-convective',
    angle: 60,
    label: 'Đối Lưu Thác Đá (60°)',
    windSpeed: '3.8 m/s',
    coolingDelta: '-3.8°C',
    description: 'Góc nghiêng cản bức xạ nắng trưa nhiệt đới, hút luồng gió sông luân chuyển qua màn nước thác Sa Thạch Cổ giải nhiệt hiệu quả.',
  },
  {
    id: 'afternoon-gale',
    angle: 90,
    label: 'Đại Khai Nghinh Phong (90°)',
    windSpeed: '5.1 m/s',
    coolingDelta: '-4.6°C',
    description: 'Mở bung 90 độ hướng mặt sông Thảo Điền lúc hoàng hôn và trăng lên, hòa nhịp cùng đài thưởng nguyệt ngắm hoa sen bách diệp.',
  },
]

interface EbonyBonsai {
  id: string
  name: string
  age: string
  height: string
  origin: string
  potMaterial: string
  weight: string
  teaPairing: string
}

const EBONY_BONSAIS: readonly EbonyBonsai[] = [
  {
    id: 'tung-la-han-130',
    name: 'Tùng La Hán Dáng Huyền Vũ Bách Niên',
    age: '130 Năm Tuổi',
    height: '165 cm',
    origin: 'Rừng Khộp Cổ Miền Trung Việt Nam',
    potMaterial: 'Chậu Gốm Biên Hòa Men Xanh Đồng Cổ',
    weight: '305 kg',
    teaPairing: 'Trà Lão Shan Tuyết Đỉnh Tây Côn Lĩnh 700 Năm',
  },
  {
    id: 'mai-chieu-thuy-118',
    name: 'Mai Chiếu Thủy Kim Cổ Đại Thụ',
    age: '118 Năm Tuổi',
    height: '142 cm',
    origin: 'Vườn Kiểng Cổ Gò Công (Tiền Giang)',
    potMaterial: 'Chậu Sa Thạch Non Nước Chạm Khắc Tứ Linh',
    weight: '255 kg',
    teaPairing: 'Trà Shan Tuyết Cổ Thụ Tà Xùa 600 Năm',
  },
  {
    id: 'sam-nui-98',
    name: 'Sam Núi Cổ Thụ Dáng Bạt Phong Nghinh Nguyệt',
    age: '98 Năm Tuổi',
    height: '125 cm',
    origin: 'Vùng Đảo Núi Đá Ninh Thuận',
    potMaterial: 'Chậu Gốm Bát Tràng Men Tro Cổ Khảm Lam',
    weight: '190 kg',
    teaPairing: 'Trà Sen Tây Hồ Ướp Hoa Bách Diệp Thủy Tạ',
  },
]

export function SaigonCanalSideAncientHingedEbonyLotusMoatTeaPavilion() {
  const [selectedLouver, setSelectedLouver] = useState<LouverPosition>(LOUVER_POSITIONS[1]!)
  const [selectedBonsai, setSelectedBonsai] = useState<EbonyBonsai>(EBONY_BONSAIS[0]!)
  const [rotationAngle, setRotationAngle] = useState(60)
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

      // Bell envelope
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.linearRampToValueAtTime(0.28, now + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8)

      osc.connect(gain)
      gain.connect(audioCtxRef.current.destination)

      osc.start(now)
      osc.stop(now + 3.85)
    } catch {
      // Audio fallback
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
          <div className="max-w-[50rem]">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/40 bg-accent/10 px-4 py-1 text-xs font-mono uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Công Trình Thủy Đình Bên Sông Sài Gòn · GuHomes Atelier 2026
            </div>
            <h2 className="u-display-sm mt-4 text-ink">
              Thủy Đình Gỗ Mun Sừng, Cửa Bản Lề Cối & Hào Nước Sen Bách Diệp
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base leading-relaxed text-ink/75">
              Thiết kế dành riêng cho khuôn viên ven sông Thảo Điền, công trình sử dụng gỗ Mun sừng Khánh Hòa đại thụ trên 95 năm tuổi sấy chân không ngậm dầu, liên kết mộng cối xoay đồng thau chịu lực đón gió đối lưu. Hào nước sen bách diệp kết hợp thác nước đá Sa Thạch Cổ Non Nước tuần hoàn khép kín giúp hạ nhiệt 4.6°C, cùng bệ xoay Bonsai 360 độ nẹp đồng chải xước phục vụ gia chủ tĩnh tọa thưởng trà.
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
                01 / Góc Mở Cánh Cửa Gỗ Mun Sừng Đại Thụ
              </span>
              <span className="text-xs font-mono text-muted">Bản lề cối đồng mộng kép</span>
            </div>

            <p className="text-xs text-ink/70">
              Chọn góc mở cửa cối để mô phỏng luồng đối lưu gió sông Sài Gòn qua hồ sen bách diệp và hiệu quả hạ nhiệt vi khí hậu:
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
                <span className="font-mono text-muted">Vận tốc gió sông luân chuyển:</span>
                <span className="font-mono font-medium text-accent">{selectedLouver.windSpeed}</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="font-mono text-muted">Hiệu quả hạ nhiệt vi khí hậu:</span>
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
              <div className="absolute inset-0 flex items-center justify-around opacity-20 pointer-events-none">
                <div className="h-full w-px border-r border-dashed border-accent" />
                <div className="h-full w-px border-r border-dashed border-accent" />
                <div className="h-full w-px border-r border-dashed border-accent" />
              </div>
              <motion.div
                className="h-2 w-36 rounded-full bg-gradient-to-r from-accent to-accent/30 origin-left"
                animate={{ rotate: selectedLouver.angle }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              />
              <div className="absolute bottom-2 right-3 font-mono text-[10px] text-muted">
                Góc mở: {selectedLouver.angle}° / 90°
              </div>
            </div>

            {/* Architectural Material Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-md border border-line/40 bg-surface/40 p-3">
                <span className="text-[11px] font-mono text-muted block">Gỗ Cấu Kiện:</span>
                <span className="font-medium text-ink">Mun Sừng Khánh Hòa 95 Năm</span>
              </div>
              <div className="rounded-md border border-line/40 bg-surface/40 p-3">
                <span className="text-[11px] font-mono text-muted block">Hệ Bản Lề:</span>
                <span className="font-medium text-ink">Mộng Cối Đồng Thau Đúc</span>
              </div>
            </div>
          </div>

          {/* Right: Bonsai Rotating Turntable & Moon Viewing Platform */}
          <div className="flex flex-col gap-6 lg:col-span-6 rounded-xl border border-line/60 bg-canvas/60 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-line/40 pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-accent">
                02 / Đài Thưởng Nguyệt & Bệ Bonsai Xoay 360°
              </span>
              <span className="text-xs font-mono text-muted">Trục bi xoay êm ái</span>
            </div>

            {/* Bonsai Selector */}
            <div className="flex flex-col gap-2">
              <span className="text-xs text-ink/70">Chọn danh mộc cổ thụ trưng bày trên đài sen:</span>
              <div className="grid grid-cols-3 gap-2">
                {EBONY_BONSAIS.map((bonsai) => {
                  const isSelected = bonsai.id === selectedBonsai.id
                  return (
                    <button
                      key={bonsai.id}
                      type="button"
                      onClick={() => {
                        setSelectedBonsai(bonsai)
                        playZenBell(SOLFEGGIO_528HZ)
                      }}
                      className={`min-h-[44px] p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-accent bg-accent/20 text-ink shadow-[0_0_12px_rgba(197,168,128,0.3)]'
                          : 'border-line/60 bg-surface/40 text-ink/70 hover:border-accent/40'
                      }`}
                    >
                      <span className="block font-display text-xs font-medium line-clamp-1">
                        {bonsai.name}
                      </span>
                      <span className="block font-mono text-[10px] text-accent mt-0.5">
                        {bonsai.age}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 360 Degree Turntable Visualizer */}
            <div className="relative flex flex-col items-center justify-center rounded-xl border border-line/60 bg-gradient-to-b from-surface/80 to-surface/40 p-6">
              <motion.div
                className="relative h-44 w-44 rounded-full border-2 border-accent/40 bg-surface flex items-center justify-center shadow-lg"
                animate={{ rotate: rotationAngle }}
                transition={{ type: 'spring', stiffness: 90, damping: 15 }}
              >
                {/* Turntable Brass Notches */}
                <div className="absolute inset-1 rounded-full border border-dashed border-accent/30" />
                <div className="absolute top-2 h-2 w-2 rounded-full bg-accent" />
                <div className="absolute bottom-2 h-2 w-2 rounded-full bg-accent/50" />
                <div className="absolute left-2 h-2 w-2 rounded-full bg-accent/50" />
                <div className="absolute right-2 h-2 w-2 rounded-full bg-accent/50" />

                {/* Bonsai Silhouette & Pot Representation */}
                <div className="flex flex-col items-center">
                  <div className="h-16 w-20 rounded-t-full bg-emerald-800/40 border border-emerald-500/40 flex items-center justify-center">
                    <span className="text-[11px] font-mono text-emerald-200">Bonsai</span>
                  </div>
                  <div className="h-5 w-16 bg-accent/30 border-x border-b border-accent rounded-b-md flex items-center justify-center">
                    <span className="text-[9px] font-mono text-accent">Chậu Gốm</span>
                  </div>
                </div>
              </motion.div>

              {/* Turntable Angle Readout */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleRotate(-45)}
                  disabled={isRotating}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-full border border-line/70 bg-canvas/80 text-xs font-mono hover:border-accent active:scale-95 transition-all cursor-pointer"
                >
                  Xoay -45°
                </button>
                <span className="font-mono text-xs font-semibold text-accent min-w-[70px] text-center">
                  {rotationAngle}°
                </span>
                <button
                  type="button"
                  onClick={() => handleRotate(45)}
                  disabled={isRotating}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-full border border-line/70 bg-canvas/80 text-xs font-mono hover:border-accent active:scale-95 transition-all cursor-pointer"
                >
                  Xoay +45°
                </button>
              </div>
            </div>

            {/* Selected Bonsai Spec Sheet */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Chiều Cao & Trọng Lượng:</span>
                <span className="font-medium text-ink">{selectedBonsai.height} · {selectedBonsai.weight}</span>
              </div>
              <div className="rounded border border-line/40 bg-surface/50 p-2.5">
                <span className="text-[10px] font-mono text-muted block">Xuất Xứ Danh Tộc:</span>
                <span className="font-medium text-ink">{selectedBonsai.origin}</span>
              </div>
              <div className="rounded border border-line/40 bg-surface/50 p-2.5 col-span-2">
                <span className="text-[10px] font-mono text-muted block">Loại Trà Thưởng Thức Tương Ứng:</span>
                <span className="font-medium text-accent">{selectedBonsai.teaPairing}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 flex flex-col gap-3 rounded-xl border border-line/50 bg-canvas/40 p-4 sm:flex-row sm:items-center sm:justify-between text-xs text-ink/70">
          <div className="flex items-center gap-2">
            <CheckIcon className="h-4 w-4 text-emerald-500" />
            <span>Gỗ Mun sừng Khánh Hòa trên 95 năm tuổi, sấy chân không đạt chuẩn ẩm độ 9-11%.</span>
          </div>
          <div className="font-mono text-muted">
            KTS Trưởng GuHomes Trực Tiếp Giám Sát: <span className="text-ink font-semibold">0368 757 916</span>
          </div>
        </div>
      </div>
    </section>
  )
}
