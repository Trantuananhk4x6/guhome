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
    name: 'Cánh Cối Hướng Đông (Nghinh Phong Triều Dâng)',
    orientation: 'Đón trọn dòng đối lưu mát rượi từ triền sông Sài Gòn lúc bình minh',
    airflowGain: '+45% lưu lượng gió',
    coolingDelta: '-2.8°C hạ nhiệt',
    status: 'open',
    woodSpecies: 'Gỗ Pơ Mu Sơn La 160 năm tuổi',
    soundNote: 'Mộng gỗ cối cọ sát trầm ấm',
  },
  {
    id: 'door-south',
    name: 'Cánh Cối Hướng Nam (Hút Gió Hào Sen Bách Diệp)',
    orientation: 'Đón hơi ẩm thơm ngát dịu êm bốc từ hồ sen Bách Diệp đang nở rộ',
    airflowGain: '+54% đối lưu ẩm',
    coolingDelta: '-3.3°C hạ nhiệt',
    status: 'open',
    woodSpecies: 'Gỗ Pơ Mu Sơn La 160 năm tuổi',
    soundNote: 'Thanh âm gió luồn khe mộng',
  },
  {
    id: 'door-west',
    name: 'Cánh Cối Hướng Tây (Chắn Nắng Chiều Khí Hậu Sài Gòn)',
    orientation: 'Hệ nan chớp gỗ Pơ Mu xoay góc 45 độ cản triệt để bức xạ nhiệt',
    airflowGain: '+27% thông khí vi sai',
    coolingDelta: '-2.2°C cản bức xạ',
    status: 'half',
    woodSpecies: 'Gỗ Pơ Mu Sơn La vàng óng ngát hương',
    soundNote: 'Chốt mộng mộc khép êm',
  },
  {
    id: 'door-north',
    name: 'Cánh Cối Hướng Bắc (Tụ Khí Thủy Đình & Vườn Tùng)',
    orientation: 'Mở tầm nhìn ra thảm rêu nhung và Bonsai Tùng La Hán 175 năm',
    airflowGain: '+38% dòng khí thoát',
    coolingDelta: '-2.4°C ổn định nhiệt',
    status: 'half',
    woodSpecies: 'Gỗ Pơ Mu Sơn La 160 năm tuổi',
    soundNote: 'Mộng khóa âm dương đóng nhẹ',
  },
]

export function SaigonCanalSideAncientHingedPoMuMoatPavilion() {
  const [doorWings, setDoorWings] = useState<readonly HingedDoorWing[]>(INITIAL_DOOR_WINGS)
  const [activeBonsaiAngle, setActiveBonsaiAngle] = useState(90)
  const [isRotatingBonsai, setIsRotatingBonsai] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [ambientTemp, setAmbientTemp] = useState(34.5)
  const [waterTemp, setWaterTemp] = useState(24.8)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  // Net cooling calculation
  const openCount = doorWings.filter((w) => w.status === 'open').length
  const halfCount = doorWings.filter((w) => w.status === 'half').length
  const coolingOffset = openCount * 1.5 + halfCount * 0.9 + 1.5
  const indoorTemp = Math.max(24.5, ambientTemp - coolingOffset)

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
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-amber-800/30 blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 h-96 w-96 rounded-full bg-emerald-900/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs font-medium uppercase tracking-wider text-amber-300">
            <span>Kiến Trúc Cảnh Quan Vi Khí Hậu Sài Gòn</span>
            <span>·</span>
            <span>Atelier Thủy Đình Độc Bản GuHomes</span>
          </div>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-amber-100 sm:text-4xl lg:text-5xl">
            Thủy Đình Gỗ Pơ Mu Sơn La 160 Năm Tuổi & Cửa Cối Hào Sen Bách Diệp
          </h2>
          <p className="mt-3 text-sm text-stone-300 sm:text-base">
            Kiến trúc ven kênh độc bản: Khung cột Gỗ Pơ Mu rừng già 160 năm tuổi tỏa hương thơm quý phái xua muỗi tự nhiên, hệ 4 cánh cửa cối mộng nêm truyền thống và hào sen bách diệp hạ nhiệt tự nhiên -5.7°C thích ứng hoàn hảo độ ẩm 80% TP.HCM.
          </p>
        </div>

        {/* Master Interactive Stage */}
        <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Main Visual: 7 cols */}
          <div className="relative flex flex-col items-center justify-center rounded-2xl border border-stone-800 bg-stone-900/80 p-6 shadow-2xl backdrop-blur-sm lg:col-span-7">
            {/* Top Toolbar */}
            <div className="flex w-full items-center justify-between border-b border-stone-800/80 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs text-amber-300">
                  Ngoại thất: {ambientTemp.toFixed(1)}°C | Nước hào sen: {waterTemp.toFixed(1)}°C
                </span>
              </div>

              <button
                type="button"
                onClick={toggleAudio}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300',
                  isPlayingAudio
                    ? 'border-amber-500/60 bg-amber-950/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'border-stone-700 bg-stone-800/60 text-stone-300 hover:border-stone-600'
                )}
              >
                <span className={cn('h-2 w-2 rounded-full', isPlayingAudio ? 'bg-amber-400 animate-pulse' : 'bg-stone-500')} />
                {isPlayingAudio ? 'Âm Tần 528Hz Solfeggio (Đang Phát)' : 'Thanh Âm Thiền Trà 528Hz'}
              </button>
            </div>

            {/* Central Graphic Simulation */}
            <div className="relative my-8 flex h-80 w-full items-center justify-center overflow-hidden sm:h-96">
              {/* Outer Moat Lotus Pond Visual */}
              <div className="absolute inset-4 rounded-full border-4 border-amber-900/40 bg-gradient-to-br from-emerald-950/50 via-teal-950/40 to-stone-950/80 shadow-inner">
                {/* Floating Lotus Leaves & Blossoms */}
                <div className="absolute top-4 left-10 flex items-center gap-1 opacity-80">
                  <span className="text-emerald-400 text-lg">🪷</span>
                  <span className="text-[10px] font-serif text-emerald-300/80">Sen Bách Diệp</span>
                </div>
                <div className="absolute bottom-6 right-12 flex items-center gap-1 opacity-80">
                  <span className="text-emerald-400 text-lg">🪷</span>
                  <span className="text-[10px] font-serif text-emerald-300/80">Hào Nước Làm Mát -5.7°C</span>
                </div>
              </div>

              {/* Pavilion Octagonal Deck Structure */}
              <div className="relative z-10 flex h-60 w-60 items-center justify-center rounded-2xl border-2 border-amber-500/70 bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 p-4 shadow-2xl">
                {/* 4 Door Wings Display */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] font-mono text-stone-400">BẮC (Tùng La Hán)</span>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                  <span className="text-[10px] font-mono text-stone-400">NAM (Hào Sen)</span>
                </div>
                <div className="absolute top-1/2 -left-4 -translate-y-1/2">
                  <span className="text-[10px] font-mono text-stone-400 rotate-90">TÂY</span>
                </div>
                <div className="absolute top-1/2 -right-4 -translate-y-1/2">
                  <span className="text-[10px] font-mono text-stone-400 -rotate-90">ĐÔNG</span>
                </div>

                {/* Center Bonsai Pedestal & Plant */}
                <div className="flex flex-col items-center justify-center">
                  <motion.div
                    style={{ transform: `rotate(${activeBonsaiAngle}deg)` }}
                    className="relative flex h-28 w-28 items-center justify-center rounded-full border border-amber-500/40 bg-stone-900/90 shadow-lg"
                  >
                    {/* Bonsai Tree Canopy Graphic */}
                    <div className="relative flex flex-col items-center">
                      <div className="h-10 w-16 rounded-full bg-emerald-800/90 blur-[1px] shadow-sm flex items-center justify-center">
                        <span className="text-[9px] font-serif text-amber-200">La Hán 175N</span>
                      </div>
                      <div className="h-7 w-2.5 rounded-b bg-amber-950 shadow-md" />
                      <div className="h-2 w-12 rounded bg-stone-800 border border-amber-600/40" />
                    </div>
                  </motion.div>

                  <div className="mt-2 text-center">
                    <div className="font-serif text-xs text-amber-200">Tùng La Hán 175 Năm Tuổi</div>
                    <div className="font-mono text-[10px] text-stone-400">Dáng Trực Quân Tử 360°</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cooling Result Meter */}
            <div className="flex w-full items-center justify-between rounded-xl border border-amber-500/30 bg-amber-950/30 p-3.5">
              <div>
                <div className="text-xs text-stone-400">Nhiệt độ nội thất Thủy Đình:</div>
                <div className="font-serif text-xl font-medium text-amber-200">
                  {indoorTemp.toFixed(1)}°C{' '}
                  <span className="font-mono text-xs text-emerald-400">
                    (-{(ambientTemp - indoorTemp).toFixed(1)}°C đối lưu vi khí hậu)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRotatingBonsai(!isRotatingBonsai)}
                className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-colors"
              >
                {isRotatingBonsai ? 'Dừng Xoay Bonsai' : 'Xoay Bonsai 360°'}
              </button>
            </div>
          </div>

          {/* Door Controls & Artisan Dossier: 5 cols */}
          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* 4 Door Wings Quick Toggle */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h3 className="font-serif text-lg font-normal text-amber-100">
                Điều Khiển Hệ Cửa Cối Gỗ Pơ Mu 4 Hướng
              </h3>
              <p className="mt-1 text-xs text-stone-400">
                Nhấn vào từng cánh cửa cối để thay đổi trạng thái đóng - mở hé 45° - mở rộng 90°.
              </p>

              <div className="mt-4 space-y-2.5">
                {doorWings.map((door) => (
                  <div
                    key={door.id}
                    onClick={() => toggleDoorStatus(door.id)}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-stone-800/80 bg-stone-900/50 p-3 transition-colors hover:border-stone-700"
                  >
                    <div>
                      <div className="text-xs font-medium text-stone-200">{door.name}</div>
                      <div className="mt-0.5 text-[11px] text-stone-400">{door.orientation}</div>
                      <div className="mt-1 flex items-center gap-2 font-mono text-[10px] text-amber-300">
                        <span>{door.airflowGain}</span>
                        <span>·</span>
                        <span className="text-emerald-400">{door.coolingDelta}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize',
                          door.status === 'open'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                            : door.status === 'half'
                              ? 'bg-amber-950 text-amber-300 border border-amber-500/30'
                              : 'bg-stone-800 text-stone-400 border border-stone-700'
                        )}
                      >
                        {door.status === 'open' ? 'Mở Hết 90°' : door.status === 'half' ? 'Mở Hé 45°' : 'Đóng Kín'}
                      </span>
                      <span className="text-[9px] text-stone-500">{door.soundNote}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Provenance & GuHomes Standard */}
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-5 backdrop-blur-sm">
              <h4 className="font-serif text-base font-normal text-amber-200">
                Chứng Thư Chế Tác Thủy Đình GuHomes
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-stone-300">
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">❖</span>
                  <span><strong>Chất lượng danh mộc:</strong> 100% Gỗ Pơ Mu Sơn La 160 năm tuổi, giàu tinh dầu tự nhiên, tẩm sấy vi khí hậu độ ẩm dưới 12%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400">❖</span>
                  <span><strong>Kỹ nghệ mộng cổ:</strong> Toàn bộ cấu kiện liên kết bằng mộng cối chốt nêm âm dương truyền thống, không dùng đinh kim loại gỉ sét.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400">❖</span>
                  <span><strong>Quy chuẩn may đo:</strong> Xưởng may đo Thạnh Xuân 1.200m², phục vụ giới hạn 12 gia chủ tinh hoa mỗi năm.</span>
                </li>
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-stone-800 pt-4">
                <div>
                  <div className="text-[11px] text-stone-400">Tư vấn cảnh quan vi khí hậu:</div>
                  <div className="font-mono text-sm font-semibold text-amber-300">Hotline KTS Trưởng: 0368 757 916</div>
                </div>
                <a
                  href="/contact"
                  className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/20 transition-colors"
                >
                  Đặt Lịch Khảo Sát
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
