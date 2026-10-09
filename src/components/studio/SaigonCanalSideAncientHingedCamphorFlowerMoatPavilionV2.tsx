'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HingeWing {
  id: string
  name: string
  direction: string
  angle: number
  description: string
  windBreezeFlow: string
}

const HINGE_WINGS: HingeWing[] = [
  {
    id: 'dong-nam',
    name: 'Cánh Cối Đông Nam (Nghinh Giang Phong)',
    direction: 'Đông Nam',
    angle: 85,
    description: 'Đón trọn luồng gió mát đối lưu từ khúc quanh sông Sài Gòn, thổi qua mặt nước hào sen Bách Diệp.',
    windBreezeFlow: '2.4 m/s (Gió nam dịu mát)',
  },
  {
    id: 'nam',
    name: 'Cánh Cối Chính Nam (Hạ Nhật Phong)',
    direction: 'Chính Nam',
    angle: 90,
    description: 'Mở rộng khẩu độ đối lưu xuyên phòng, xua tan hoàn toàn cảm giác bức bí nhiệt đới lúc chính ngọ.',
    windBreezeFlow: '2.2 m/s (Đối lưu mát lành)',
  },
  {
    id: 'tay-nam',
    name: 'Cánh Cối Tây Nam (Chắn Nắng Chiều)',
    direction: 'Tây Nam',
    angle: 45,
    description: 'Chếch góc 45 độ nghiêng tán lam che chắn nắng xiên khoai gay gắt buổi chiều muộn.',
    windBreezeFlow: '1.8 m/s (Gió râm mát)',
  },
  {
    id: 'dong-bac',
    name: 'Cánh Cối Đông Bắc (Tụ Khí Tàng Phong)',
    direction: 'Đông Bắc',
    angle: 60,
    description: 'Tạo luồng gió xoáy vi khí hậu tuần hoàn quanh bệ Bonsai Duyên Tùng bách niên.',
    windBreezeFlow: '1.9 m/s (Tuần hoàn vi khí hậu)',
  },
]

export function SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV2() {
  const [selectedWing, setSelectedWing] = useState<HingeWing>(HINGE_WINGS[0]!)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [bonsaiRotation, setBonsaiRotation] = useState(0)
  const [isRotatingBonsai, setIsRotatingBonsai] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // Bonsai continuous rotation
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRotatingBonsai) {
      interval = setInterval(() => {
        setBonsaiRotation((prev) => (prev + 1) % 360)
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isRotatingBonsai])

  // Web Audio 528Hz Solfeggio sound generator
  const toggleSoundscape = () => {
    if (isPlayingAudio) {
      try {
        oscillatorRef.current?.stop()
        oscillatorRef.current?.disconnect()
      } catch {
        // Safe ignore
      }
      setIsPlayingAudio(false)
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        audioContextRef.current = ctx

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(528, ctx.currentTime) // 528Hz Love & Miracles Frequency

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.5)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscillatorRef.current = osc
        gainNodeRef.current = gain
        setIsPlayingAudio(true)
      } catch {
        setIsPlayingAudio(false)
      }
    }
  }

  useEffect(() => {
    return () => {
      try {
        oscillatorRef.current?.stop()
        oscillatorRef.current?.disconnect()
      } catch {
        // Cleanup
      }
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-espresso py-20 sm:py-28 text-canvas border-b border-line/40">
      {/* Background Architectural Water & Mist Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.15),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-mono text-accent uppercase tracking-widest">
            <span>● Kiến Trúc Thủy Đình Cổ Điển V2</span>
            <span>·</span>
            <span>Gỗ Long Não Cổ Thụ 305 Năm</span>
          </div>

          <h2 className="mt-4 font-display text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-canvas">
            Thủy Đình Gỗ Long Não Tây Bắc Cửa Cối Hào Sen V2
          </h2>

          <p className="mt-4 font-body text-sm sm:text-base text-canvas/75 leading-relaxed">
            Thiết kế độc bản cho biệt thự sinh thái ven sông Sài Gòn: kết cấu mộng cối cổ ngậm chốt nêm âm dương thủ công từ gỗ Long Não Cổ Thụ 305 năm thơm mát tự nhiên, kết hợp hào sen Bách Diệp ôm trọn bốn mặt, tạo biên độ giảm nhiệt tự nhiên tới -8.4°C và độ ẩm hoàn hảo 50% - 55% RH.
          </p>
        </div>

        {/* Dynamic Architectural Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Hạ nhiệt tự nhiên</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">-8.4°C</div>
            <p className="mt-1 text-xs text-canvas/60">Đối lưu hơi nước từ hào sen</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Niên đại gỗ Long Não</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">305 Năm</div>
            <p className="mt-1 text-xs text-canvas/60">Tây Bắc thượng hạng tự tỏa hương</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Vận tốc gió đối lưu</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">2.4 m/s</div>
            <p className="mt-1 text-xs text-canvas/60">Khẩu độ mở cánh cối 90 độ</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Âm học thiền trà</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">528 Hz</div>
            <p className="mt-1 text-xs text-canvas/60">Solfeggio tần số thanh lọc</p>
          </div>
        </div>

        {/* Interactive Pavilion Workspace: Left Wing Controls, Right Interactive Visualizer */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Controls column */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h3 className="font-display text-lg text-canvas/90 flex items-center justify-between">
              <span>Hệ Thống 4 Cánh Cối Cổ Phong</span>
              <span className="text-xs font-mono text-accent">Mộng Nêm Âm Dương</span>
            </h3>

            <div className="flex flex-col gap-2.5">
              {HINGE_WINGS.map((wing) => {
                const isSelected = wing.id === selectedWing.id
                return (
                  <button
                    key={wing.id}
                    type="button"
                    onClick={() => setSelectedWing(wing)}
                    className={cn(
                      'group flex min-h-[52px] flex-col rounded-xl border p-3.5 text-left transition-all duration-300',
                      isSelected
                        ? 'border-accent bg-accent/15 shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                        : 'border-line/60 bg-surface/5 hover:border-accent/40 hover:bg-surface/10',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn('text-sm font-medium', isSelected ? 'text-accent' : 'text-canvas/90')}>
                        {wing.name}
                      </span>
                      <span className="font-mono text-xs text-muted">Khẩu độ: {wing.angle}°</span>
                    </div>
                    <p className="mt-1 text-xs text-canvas/65 line-clamp-1">{wing.description}</p>
                  </button>
                )
              })}
            </div>

            {/* Interactive Audio & Bonsai Triggers */}
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={toggleSoundscape}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer',
                  isPlayingAudio
                    ? 'border-accent bg-accent text-espresso shadow-[0_0_15px_rgba(197,168,128,0.4)]'
                    : 'border-accent/40 bg-surface/10 text-canvas/80 hover:border-accent hover:text-canvas',
                )}
              >
                <span>{isPlayingAudio ? '● Tắt Chuông Gió 528Hz' : '○ Kích Hoạt Âm Học Thiền Định 528Hz'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRotatingBonsai((prev) => !prev)}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer',
                  isRotatingBonsai
                    ? 'border-accent bg-accent/20 text-accent-soft'
                    : 'border-line/60 bg-surface/10 text-canvas/80 hover:border-accent/40',
                )}
              >
                <span>{isRotatingBonsai ? '● Dừng Xoay Bonsai' : '○ Xoay Bonsai Tùng 360°'}</span>
              </button>
            </div>
          </div>

          {/* Visualization Column: Visual Hinge Angles + Bonsai Center */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-3xl border border-accent/30 bg-radial from-surface/30 to-espresso/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden">
              {/* Canal Mist Floating Accent */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,168,128,0.1),transparent_75%)] pointer-events-none" />

              {/* Top status bar inside visualizer */}
              <div className="relative z-10 flex items-center justify-between border-b border-canvas/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
                  <span className="font-mono text-xs text-accent">Thủy Đình Khí Tuyến Trực Quan</span>
                </div>
                <div className="font-mono text-xs text-canvas/60">Gió đối lưu: {selectedWing.windBreezeFlow}</div>
              </div>

              {/* Graphic Representation: 4 Wing Hinges and Central Bonsai Turntable */}
              <div className="relative my-auto flex items-center justify-center">
                {/* Canal Water Ring */}
                <div className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full border border-accent/20 border-dashed animate-[spin_60s_linear_infinite]" />
                <div className="absolute h-44 w-44 sm:h-56 sm:w-56 rounded-full border border-canvas/10 bg-accent/5 backdrop-blur-xs" />

                {/* Central Bonsai Pedestal with Duyên Tùng Cổ Thụ 320 Năm */}
                <motion.div
                  style={{ transform: `rotate(${bonsaiRotation}deg)` }}
                  className="relative z-10 flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full border-2 border-accent/60 bg-espresso/90 shadow-[0_0_30px_rgba(197,168,128,0.3)]"
                >
                  <div className="text-center">
                    <div className="font-display text-xs sm:text-sm text-accent-soft">Duyên Tùng</div>
                    <div className="font-mono text-[10px] text-canvas/50">320 Năm</div>
                    <div className="mt-1 font-mono text-[9px] text-accent/80">{bonsaiRotation}°</div>
                  </div>
                </motion.div>

                {/* Dynamic Hinge Wing visualization */}
                <motion.div
                  key={selectedWing.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute -top-4 sm:-top-6 flex flex-col items-center"
                >
                  <div className="h-10 w-1 bg-accent shadow-[0_0_12px_#c5a880]" />
                  <span className="mt-1 rounded-sm bg-accent/20 px-2 py-0.5 font-mono text-[10px] text-accent">
                    Cánh Cối {selectedWing.direction} ({selectedWing.angle}°)
                  </span>
                </motion.div>
              </div>

              {/* Bottom Info Footer inside visualizer */}
              <div className="relative z-10 rounded-xl border border-canvas/10 bg-canvas/5 p-3 text-xs text-canvas/70">
                <span className="font-medium text-accent">Nguyên lý vi khí hậu: </span>
                {selectedWing.description}
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/40 pt-6 sm:flex-row text-xs text-canvas/50">
          <div>Thiết kế & chế tác mộng cối độc quyền tại Xưởng may đo Thạnh Xuân 1.200m² - GuHomes</div>
          <div className="font-mono text-accent">Trần giới hạn: 12 công trình di sản mỗi năm</div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedCamphorFlowerMoatPavilionV2
