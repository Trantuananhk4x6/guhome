'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface HingedDoorWing {
  id: string
  name: string
  orientation: string
  airflowGain: string
  coolingDelta: string
  status: 'closed' | 'half' | 'open'
  woodSpecies: string
  soundNote: string
}

const INITIAL_DOOR_WINGS: readonly HingedDoorWing[] = [
  {
    id: 'door-east',
    name: 'Cánh Cối Hướng Đông (Nghinh Phong Kênh Đào)',
    orientation: 'Đón trọn luồng gió mát lành từ dòng kênh đào Sài Gòn mỗi sớm mai',
    airflowGain: '+48% lưu lượng gió',
    coolingDelta: '-3.0°C hạ nhiệt',
    status: 'open',
    woodSpecies: 'Gỗ Sen Mật Tây Bắc 170 năm tuổi',
    soundNote: 'Mộng gỗ cối cọ sát trầm ấm',
  },
  {
    id: 'door-south',
    name: 'Cánh Cối Hướng Nam (Hút Gió Hào Sen Bách Diệp)',
    orientation: 'Đón hơi ẩm tinh khiết thanh mát bốc từ mặt hào sen Bách Diệp ngát hương',
    airflowGain: '+58% đối lưu ẩm',
    coolingDelta: '-3.5°C hạ nhiệt',
    status: 'open',
    woodSpecies: 'Gỗ Sen Mật Tây Bắc 170 năm tuổi',
    soundNote: 'Thanh âm gió luồn khe mộng',
  },
  {
    id: 'door-west',
    name: 'Cánh Cối Hướng Tây (Chắn Nắng Chiều Khí Hậu Sài Gòn)',
    orientation: 'Hệ nan chớp gỗ xoay góc 45 độ triệt tiêu bức xạ nắng gay gắt',
    airflowGain: '+30% thông khí vi sai',
    coolingDelta: '-2.4°C cản bức xạ',
    status: 'half',
    woodSpecies: 'Gỗ Sen Mật thớ mịn đanh như sắt',
    soundNote: 'Chốt mộng mộc khép êm',
  },
  {
    id: 'door-north',
    name: 'Cánh Cối Hướng Bắc (Tụ Khí Thủy Đình & Vườn Đa Cổ)',
    orientation: 'Mở tầm nhìn ra thảm rêu nhung và Bonsai Đa Cổ Thụ 185 năm',
    airflowGain: '+42% dòng khí thoát',
    coolingDelta: '-2.6°C ổn định nhiệt',
    status: 'half',
    woodSpecies: 'Gỗ Sen Mật Tây Bắc 170 năm tuổi',
    soundNote: 'Mộng khóa âm dương đóng nhẹ',
  },
]

export function SaigonCanalSideAncientHingedSenMoatPavilion() {
  const [doorWings, setDoorWings] = useState<readonly HingedDoorWing[]>(INITIAL_DOOR_WINGS)
  const [activeBonsaiAngle, setActiveBonsaiAngle] = useState(115)
  const [isRotatingBonsai, setIsRotatingBonsai] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [ambientTemp, setAmbientTemp] = useState(35.2)
  const [waterTemp, setWaterTemp] = useState(24.2)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  // Net cooling calculation
  const openCount = doorWings.filter((w) => w.status === 'open').length
  const halfCount = doorWings.filter((w) => w.status === 'half').length
  const coolingOffset = openCount * 1.6 + halfCount * 0.95 + 1.6
  const indoorTemp = Math.max(24.0, ambientTemp - coolingOffset)

  const toggleDoorStatus = (id: string) => {
    setDoorWings((prev) =>
      prev.map((door) => {
        if (door.id !== id) return door
        const nextStatus =
          door.status === 'closed' ? 'half' : door.status === 'half' ? 'open' : 'closed'
        return { ...door, status: nextStatus }
      }),
    )
  }

  // Web Audio for 528Hz Solfeggio
  const toggleAudio = () => {
    if (isPlayingAudio) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.linearRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 0.5)
        setTimeout(() => {
          oscRef.current?.stop()
          oscRef.current?.disconnect()
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

        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(528, ctx.currentTime)

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.8)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscRef.current = osc
        gainRef.current = gain
        setIsPlayingAudio(true)
      } catch {
        setIsPlayingAudio(false)
      }
    }
  }

  // Bonsai Rotation loop
  useEffect(() => {
    let animId: number
    if (isRotatingBonsai) {
      const step = () => {
        setActiveBonsaiAngle((prev) => (prev + 0.4) % 360)
        animId = requestAnimationFrame(step)
      }
      animId = requestAnimationFrame(step)
    }
    return () => cancelAnimationFrame(animId)
  }, [isRotatingBonsai])

  return (
    <section className="relative overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24">
      {/* Atmosphere Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-emerald-900/30 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-amber-900/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-emerald-300">
            <span>Kiến Trúc Cảnh Quan Vi Khí Hậu Sài Gòn</span>
            <span>·</span>
            <span>Atelier Thủy Đình Độc Bản GuHomes</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-amber-100 sm:text-4xl lg:text-5xl">
            Thủy Đình Gỗ Sen Mật Tây Bắc 170 Năm Tuổi & Cửa Cối Hào Sen Bách Diệp
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:text-base">
            Kiệt tác ven kênh độc bản: Khung cột Gỗ Sen Mật Tây Bắc 170 năm tuổi tỷ trọng 1.12 g/cm³ đanh chắc như sắt, ngâm nước càng rắn rỏi, hệ 4 cánh cửa cối mộng nêm truyền thống và hào sen bách diệp hạ nhiệt tự nhiên -5.9°C thích ứng độ ẩm 80% TP.HCM.
          </p>
        </div>

        {/* Master Interactive Stage */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Main Visual: 7 cols */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-sm lg:col-span-7">
            {/* Top Toolbar */}
            <div className="flex w-full items-center justify-between border-b border-stone-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-emerald-300">
                  Ngoại thất: {ambientTemp.toFixed(1)}°C | Nước hào sen: {waterTemp.toFixed(1)}°C
                </span>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className={cn(
                  'flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300',
                  isPlayingAudio
                    ? 'border-emerald-500/80 bg-emerald-950/60 text-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-600',
                )}
              >
                <span>{isPlayingAudio ? 'Âm Thiền 528Hz Solfeggio' : 'Bật Chuông Thiền 528Hz'}</span>
              </button>
            </div>

            {/* Central Interactive Pavilion Architectural Layout */}
            <div className="relative mt-8 flex h-72 w-full items-center justify-center overflow-hidden rounded-xl border border-stone-800 bg-stone-950/90 sm:h-96">
              {/* Outer Canal & Moat Water Ripples */}
              <div className="absolute inset-4 rounded-full border border-dashed border-emerald-900/40 animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-12 rounded-full border border-stone-800/60" />

              {/* 4 Interactive Hinged Doors (North, East, South, West) */}
              <div className="relative flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-emerald-800/50 bg-stone-900/90 p-4 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] sm:h-64 sm:w-64">
                {/* 4 Door Wings clickable markers */}
                {doorWings.map((door) => {
                  const isEast = door.id === 'door-east'
                  const isWest = door.id === 'door-west'
                  const isNorth = door.id === 'door-north'
                  const isSouth = door.id === 'door-south'

                  return (
                    <button
                      key={door.id}
                      type="button"
                      onClick={() => toggleDoorStatus(door.id)}
                      className={cn(
                        'absolute z-20 flex cursor-pointer items-center justify-center rounded-md border text-[10px] font-mono transition-all duration-500 hover:scale-105 active:scale-95',
                        isNorth && 'top-1 left-1/2 -translate-x-1/2 h-6 px-3',
                        isSouth && 'bottom-1 left-1/2 -translate-x-1/2 h-6 px-3',
                        isWest && 'left-1 top-1/2 -translate-y-1/2 h-16 w-6 writing-mode-vertical',
                        isEast && 'right-1 top-1/2 -translate-y-1/2 h-16 w-6 writing-mode-vertical',
                        door.status === 'open'
                          ? 'border-emerald-500/80 bg-emerald-950/80 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                          : door.status === 'half'
                            ? 'border-amber-500/80 bg-amber-950/80 text-amber-200'
                            : 'border-stone-700 bg-stone-900 text-stone-400',
                      )}
                      title={`Nhấp để đổi trạng thái cửa cối (${door.status})`}
                    >
                      {door.status === 'open' ? 'Mở 90°' : door.status === 'half' ? 'Mở 45°' : 'Đóng Mộng'}
                    </button>
                  )
                })}

                {/* Central Bonsai Pedestal (360° Rotatable) */}
                <div
                  className="group relative flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-amber-600/70 bg-gradient-to-br from-stone-800 to-stone-900 p-2 text-center shadow-lg transition-transform duration-300 hover:border-amber-400 sm:h-36 sm:w-36"
                  style={{ transform: `rotate(${activeBonsaiAngle}deg)` }}
                  onClick={() => setIsRotatingBonsai(!isRotatingBonsai)}
                  title="Nhấp để bật/tắt xoay Bonsai Đa Cổ Thụ 185 năm"
                >
                  <span className="text-[10px] font-medium tracking-wider text-amber-300 sm:text-xs">
                    Đa Bách Niên
                  </span>
                  <span className="text-[9px] font-mono text-stone-400">185 Năm</span>
                  <span className="mt-1 text-[8px] uppercase tracking-widest text-emerald-400">
                    {Math.round(activeBonsaiAngle)}°
                  </span>
                </div>
              </div>
            </div>

            {/* Microclimate Calculation Summary */}
            <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-950/60 p-4">
              <div>
                <span className="block text-xs uppercase tracking-wider text-stone-400">
                  Nhiệt Độ Trong Thủy Đình
                </span>
                <span className="font-serif text-2xl font-normal text-emerald-300 sm:text-3xl">
                  {indoorTemp.toFixed(1)}°C
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs uppercase tracking-wider text-emerald-400">
                  Hiệu Ứng Hạ Nhiệt Tự Nhiên
                </span>
                <span className="font-mono text-lg font-medium text-emerald-200">
                  -{coolingOffset.toFixed(1)}°C Vi Khí Hậu
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel: Spec details and Controls (5 cols) */}
          <div className="space-y-6 lg:col-span-5">
            {/* 4 Door Wings Detail List */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm">
              <h3 className="border-b border-stone-800 pb-3 font-serif text-lg text-amber-200">
                Hệ Thống 4 Cánh Cửa Cối Gỗ Sen Mật
              </h3>

              <div className="mt-4 space-y-3">
                {doorWings.map((door) => (
                  <div
                    key={door.id}
                    onClick={() => toggleDoorStatus(door.id)}
                    className="group cursor-pointer rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 transition-all duration-300 hover:border-emerald-700/50 hover:bg-stone-950/70"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-stone-200 group-hover:text-emerald-300">
                        {door.name}
                      </span>
                      <span
                        className={cn(
                          'rounded px-2 py-0.5 text-[10px] font-mono',
                          door.status === 'open'
                            ? 'bg-emerald-950 text-emerald-300'
                            : door.status === 'half'
                              ? 'bg-amber-950 text-amber-300'
                              : 'bg-stone-800 text-stone-400',
                        )}
                      >
                        {door.status === 'open' ? 'Mở 90°' : door.status === 'half' ? 'Mở 45°' : 'Đóng'}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] leading-relaxed text-stone-400">
                      {door.orientation}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-emerald-400/90">
                      <span>{door.airflowGain}</span>
                      <span>{door.coolingDelta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonsai Pedestal & Craftsmanship Guarantee */}
            <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-br from-stone-900/90 to-amber-950/20 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-serif text-base text-amber-200">
                  Bệ Xoay Bonsai Đa Cổ Thụ 185 Năm
                </span>
                <button
                  type="button"
                  onClick={() => setIsRotatingBonsai(!isRotatingBonsai)}
                  className="rounded-full border border-amber-500/40 bg-amber-950/60 px-3 py-1 text-xs text-amber-300 hover:bg-amber-900/60"
                >
                  {isRotatingBonsai ? 'Dừng Xoay' : 'Tự Động Xoay 360°'}
                </button>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-stone-300">
                Thế cây Đa Cổ Trường Sinh biểu trưng cho sự bền vững trường tồn của gia tộc. Bệ xoay cơ khí chính xác chịu tải 350kg cho phép gia chủ thưởng lãm mọi góc độ tán lá cổ thụ dưới ánh hoàng hôn bến sông Sài Gòn.
              </p>

              <div className="mt-4 border-t border-stone-800 pt-3 text-[11px] text-stone-400">
                <span className="text-amber-400 font-medium">Bảo chứng xưởng may đo Thạnh Xuân:</span> Khung mộng mộc gia truyền 1.200m², cam kết trần 12 công trình/năm đảm bảo KTS Trưởng trực tiếp có mặt tại hiện trường mỗi tuần. Hotline KTS Trưởng: <span className="text-emerald-300 font-mono">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
