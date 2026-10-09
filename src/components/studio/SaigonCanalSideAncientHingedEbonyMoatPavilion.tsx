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
    name: 'Cánh Cối Hướng Đông (Nghinh Phong)',
    orientation: 'Gió Đông Nam từ sông Sài Gòn thổi vào',
    airflowGain: '+38% lưu lượng gió',
    coolingDelta: '-2.4°C hạ nhiệt',
    status: 'open',
    woodSpecies: 'Gỗ Mun sừng Khánh Hòa 140 năm tuổi',
    soundNote: 'Mộng gỗ cối cọ sát trầm ấm',
  },
  {
    id: 'door-south',
    name: 'Cánh Cối Hướng Nam (Hút Gió Hào Sen)',
    orientation: 'Đón hơi ẩm tinh khiết bốc từ hồ sen Bách Diệp',
    airflowGain: '+45% đối lưu ẩm',
    coolingDelta: '-2.9°C hạ nhiệt',
    status: 'open',
    woodSpecies: 'Gỗ Mun sừng Khánh Hòa 140 năm tuổi',
    soundNote: 'Thanh âm gió luồn khe mộng',
  },
  {
    id: 'door-west',
    name: 'Cánh Cối Hướng Tây (Chắn Nắng Chiều)',
    orientation: 'Nẹp lá sách xoay cản nắng xiên góc 45 độ',
    airflowGain: '+22% thông khí vi sai',
    coolingDelta: '-1.8°C cản bức xạ',
    status: 'half',
    woodSpecies: 'Gỗ Mun sừng lõi đen nguyên khối',
    soundNote: 'Chốt mộng mộc khép êm',
  },
  {
    id: 'door-north',
    name: 'Cánh Cối Hướng Bắc (Tụ Khí Thủy Đình)',
    orientation: 'Cửa hậu nhìn ra vườn tùng la hán và bờ rào đá cuội',
    airflowGain: '+30% dòng khí thoát',
    coolingDelta: '-2.0°C ổn định nhiệt',
    status: 'half',
    woodSpecies: 'Gỗ Mun sừng Khánh Hòa 140 năm tuổi',
    soundNote: 'Mộng khóa âm dương đóng nhẹ',
  },
]

export function SaigonCanalSideAncientHingedEbonyMoatPavilion() {
  const [doorWings, setDoorWings] = useState<readonly HingedDoorWing[]>(INITIAL_DOOR_WINGS)
  const [activeBonsaiAngle, setActiveBonsaiAngle] = useState(45)
  const [isRotatingBonsai, setIsRotatingBonsai] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [ambientTemp, setAmbientTemp] = useState(33.8)
  const [waterTemp, setWaterTemp] = useState(25.4)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  // Calculate net cooling
  const openCount = doorWings.filter((w) => w.status === 'open').length
  const halfCount = doorWings.filter((w) => w.status === 'half').length
  const coolingOffset = openCount * 1.35 + halfCount * 0.75 + 1.2
  const indoorTemp = Math.max(25.5, ambientTemp - coolingOffset)

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

  // Web Audio for 528Hz Solfeggio frequency
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
        osc.frequency.setValueAtTime(528, ctx.currentTime) // 528 Hz Love & Healing frequency

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()

        oscRef.current = osc
        gainRef.current = gain
        setIsPlayingAudio(true)
      } catch (err) {
        console.warn('AudioContext not supported or blocked:', err)
      }
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRotatingBonsai) {
      interval = setInterval(() => {
        setActiveBonsaiAngle((prev) => (prev + 1) % 360)
      }, 50)
    }
    return () => clearInterval(interval)
  }, [isRotatingBonsai])

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <section className="relative w-full border-t border-line/60 bg-canvas py-16 sm:py-24 text-ink overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#8C6541_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="mx-auto w-full max-w-[88rem] px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center justify-center gap-2 self-center px-3.5 py-1 rounded-full border border-accent/30 bg-accent/10 text-accent font-mono text-[11px] uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span>Tuyệt Phẩm Thủy Đình Cửa Cối Bách Niên · Sprint 111</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-ink">
            Thủy Đình Gỗ Mun Sừng Khánh Hòa 140 Năm Tuổi & Cửa Cối Hào Sen Bách Diệp
          </h2>

          <p className="font-body text-sm sm:text-base text-ink/75 leading-relaxed">
            Hiện thực hóa kỹ nghệ cửa cối mộng chốt gỗ Mun sừng Khánh Hòa (*Diospyros mun*) đen bóng tuyền, kết hợp hệ hào nước sen Bách Diệp tuần hoàn. Giảm nhiệt vi khí hậu tự nhiên lên đến -5.3°C giữa lòng Sài Gòn mà không phụ thuộc vào điều hòa nhân tạo.
          </p>
        </div>

        {/* Interactive Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Floorplan & Door Pivot Mechanics (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-8 backdrop-blur-md shadow-xs">
              <div className="flex items-center justify-between pb-6 border-b border-line/60 mb-6">
                <div>
                  <h3 className="font-display text-lg sm:text-xl text-ink">
                    Hệ Cửa Cối Xoay Bốn Hướng
                  </h3>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Click từng cánh để xoay mở: Đóng · Mở 45° · Mở 90°
                  </p>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs text-accent uppercase tracking-wider block">
                    Nhiệt độ thủy đình
                  </span>
                  <span className="font-display text-2xl font-semibold text-accent">
                    {indoorTemp.toFixed(1)}°C
                  </span>
                  <span className="font-mono text-[11px] text-muted block">
                    (Giảm -{coolingOffset.toFixed(1)}°C so với ngoài trời)
                  </span>
                </div>
              </div>

              {/* Graphical Door Plan Simulator */}
              <div className="relative aspect-square max-w-[420px] mx-auto my-4 rounded-xl border border-dashed border-accent/40 bg-canvas/60 p-8 flex items-center justify-center">
                {/* Canal Moat Outer Ring */}
                <div className="absolute inset-2 rounded-full border border-blue-400/20 bg-blue-50/10 pointer-events-none animate-pulse" />
                <span className="absolute top-3 font-mono text-[10px] text-blue-500 uppercase tracking-widest">
                  Hào sen bách diệp tuần hoàn ({waterTemp}°C)
                </span>

                {/* Central Tea Pavilion Base */}
                <div className="relative w-44 h-44 rounded-lg border-2 border-line bg-surface flex flex-col items-center justify-center p-3 text-center shadow-md">
                  <span className="font-display text-xs font-semibold text-ink">
                    Bàn Trà Mun Sừng
                  </span>
                  <span className="font-mono text-[10px] text-muted mt-1">
                    Gỗ Mun sừng 140 tuổi
                  </span>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-[10px] text-emerald-600 font-medium">
                      Vi khí hậu đối lưu
                    </span>
                  </div>
                </div>

                {/* Door 4 Wings positioned North, South, East, West */}
                {doorWings.map((door) => {
                  const isNorth = door.id === 'door-north'
                  const isSouth = door.id === 'door-south'
                  const isEast = door.id === 'door-east'
                  const isWest = door.id === 'door-west'

                  return (
                    <button
                      key={door.id}
                      type="button"
                      onClick={() => toggleDoorStatus(door.id)}
                      className={cn(
                        'absolute px-3 py-1.5 rounded-md font-mono text-[11px] font-medium border transition-all duration-300 shadow-sm cursor-pointer active:scale-95',
                        isNorth && 'top-6 left-1/2 -translate-x-1/2',
                        isSouth && 'bottom-6 left-1/2 -translate-x-1/2',
                        isEast && 'right-4 top-1/2 -translate-y-1/2',
                        isWest && 'left-4 top-1/2 -translate-y-1/2',
                        door.status === 'open'
                          ? 'border-emerald-500/80 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-500/20'
                          : door.status === 'half'
                            ? 'border-accent/80 bg-accent/15 text-accent-soft ring-1 ring-accent/30'
                            : 'border-line bg-surface/80 text-muted opacity-60',
                      )}
                    >
                      <span>
                        {door.id === 'door-east'
                          ? 'Đông'
                          : door.id === 'door-south'
                            ? 'Nam'
                            : door.id === 'door-west'
                              ? 'Tây'
                              : 'Bắc'}
                        : {door.status === 'open' ? 'Mở 90°' : door.status === 'half' ? 'Mở 45°' : 'Đóng'}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Door Wings Detailed Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {doorWings.map((door) => (
                  <div
                    key={door.id}
                    onClick={() => toggleDoorStatus(door.id)}
                    className={cn(
                      'p-3.5 rounded-xl border transition-all cursor-pointer select-none',
                      door.status === 'open'
                        ? 'border-emerald-500/40 bg-emerald-50/30'
                        : door.status === 'half'
                          ? 'border-accent/40 bg-accent/5'
                          : 'border-line/70 bg-surface/40 hover:border-line',
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-body text-xs font-semibold text-ink">
                        {door.name}
                      </span>
                      <span
                        className={cn(
                          'font-mono text-[10px] px-2 py-0.5 rounded-full',
                          door.status === 'open'
                            ? 'bg-emerald-100 text-emerald-800'
                            : door.status === 'half'
                              ? 'bg-accent/20 text-accent'
                              : 'bg-muted/15 text-muted',
                        )}
                      >
                        {door.status === 'open' ? 'Mở toang' : door.status === 'half' ? 'Mở nửa' : 'Đóng kín'}
                      </span>
                    </div>
                    <p className="font-body text-[11px] text-muted line-clamp-1">
                      {door.orientation}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-line/40 font-mono text-[10px]">
                      <span className="text-emerald-700">{door.airflowGain}</span>
                      <span className="text-accent font-medium">{door.coolingDelta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bonsai Rotating Pedestal 360 & Audio Frequency */}
            <div className="rounded-2xl border border-line bg-surface/70 p-6 backdrop-blur-md shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line/60 mb-5">
                <div>
                  <h4 className="font-display text-base sm:text-lg text-ink">
                    Bệ Xoay Cây Thế Duyên Tùng Nam Bộ 155 Năm Tuổi
                  </h4>
                  <p className="font-mono text-xs text-muted mt-0.5">
                    Xoay trục mộng cối cổ 360 độ đón nắng mai và lọc sương sông
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsRotatingBonsai(!isRotatingBonsai)}
                  className={cn(
                    'px-4 py-2 rounded-full font-mono text-xs font-medium border transition-all active:scale-95 cursor-pointer',
                    isRotatingBonsai
                      ? 'border-accent bg-accent text-canvas shadow-xs'
                      : 'border-line bg-canvas hover:border-accent/60 text-ink',
                  )}
                >
                  {isRotatingBonsai ? 'Dừng Xoay Trục' : 'Tự Động Xoay 360°'}
                </button>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={activeBonsaiAngle}
                  onChange={(e) => setActiveBonsaiAngle(Number(e.target.value))}
                  className="w-full accent-[#8C6541] cursor-pointer"
                />
                <span className="font-mono text-xs font-bold text-accent min-w-[3rem] text-right">
                  {activeBonsaiAngle}°
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Material Science & Acoustic Resonance (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Wood Specifications Card */}
            <div className="rounded-2xl border border-line bg-surface/70 p-6 sm:p-7 backdrop-blur-md shadow-xs">
              <span className="font-mono text-[11px] text-accent uppercase tracking-wider block mb-1">
                Đặc Tính Gỗ Cổ Thụ
              </span>
              <h3 className="font-display text-xl text-ink mb-3">
                Gỗ Mun Sừng Khánh Hòa (*Diospyros mun*)
              </h3>
              <p className="font-body text-xs leading-relaxed text-ink/80 mb-4">
                Loài gỗ quý hiếm thượng thặng với sắc đen bóng tuyền không tom gỗ, tỷ trọng đạt 1.25g/cm³ (chìm trong nước), độ cứng kim loại và khả năng kháng mối mọt nhiệt đới vĩnh cửu. Hệ cửa cối mộng cổ không dùng đinh kim loại, ngâm dầu trẩu truyền thống chống kẹt nở trong mùa mưa bão Sài Gòn.
              </p>

              <div className="space-y-2.5 border-t border-line/60 pt-4 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-line/30">
                  <span className="text-muted">Tuổi đời thân cây:</span>
                  <span className="font-semibold text-ink">140 năm tuổi</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/30">
                  <span className="text-muted">Tỷ trọng khô:</span>
                  <span className="font-semibold text-ink">1.25 g/cm³ (Chìm trong nước)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/30">
                  <span className="text-muted">Độ ẩm cân bằng (EMC):</span>
                  <span className="font-semibold text-ink">9.5% - 11.2%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-line/30">
                  <span className="text-muted">Khả năng hạ nhiệt vi khí hậu:</span>
                  <span className="font-semibold text-accent">-5.3°C cực đại</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-muted">Kỹ nghệ liên kết:</span>
                  <span className="font-semibold text-ink">Mộng cối cổ không đinh</span>
                </div>
              </div>
            </div>

            {/* Solfeggio 528Hz Audio Player */}
            <div className="rounded-2xl border border-accent/40 bg-gradient-to-br from-surface via-surface to-accent/10 p-6 backdrop-blur-md shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-mono text-[10px] text-accent uppercase tracking-wider block">
                    Thanh Âm Thiền Định
                  </span>
                  <h4 className="font-display text-lg text-ink">
                    Tần Số Solfeggio 528Hz
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={toggleAudio}
                  className={cn(
                    'h-11 w-11 rounded-full flex items-center justify-center font-bold text-xs transition-all active:scale-90 cursor-pointer shadow-sm',
                    isPlayingAudio
                      ? 'bg-accent text-canvas animate-pulse'
                      : 'bg-canvas border border-line text-ink hover:border-accent',
                  )}
                  aria-label={isPlayingAudio ? 'Tắt thanh âm 528Hz' : 'Bật thanh âm 528Hz'}
                >
                  {isPlayingAudio ? '❚❚' : '▶'}
                </button>
              </div>

              <p className="font-body text-xs text-ink/75 leading-relaxed">
                Dao động âm học 528Hz (Healing Frequency) được tạo trực tiếp bằng Web Audio API, cộng hưởng nhịp nhàng cùng tiếng róc rách của hào nước sen Bách Diệp đưa tâm trí gia chủ vào trạng thái tĩnh lặng sâu.
              </p>

              <div className="mt-4 pt-3 border-t border-line/50 flex items-center justify-between font-mono text-[11px] text-muted">
                <span>Bộ tạo sóng: Web Audio API Oscillator</span>
                <span className={isPlayingAudio ? 'text-accent font-medium' : ''}>
                  {isPlayingAudio ? 'Đang phát sóng 528Hz' : 'Sẵn sàng'}
                </span>
              </div>
            </div>

            {/* Brand Commitment Badge */}
            <div className="rounded-xl border border-line/70 bg-canvas/40 p-4 text-center">
              <p className="font-body text-xs text-muted leading-relaxed">
                Tác phẩm chế tác thủ công độc bản bởi đội ngũ nghệ nhân GuHomes. Xưởng may đo Thạnh Xuân 1.200m², giới hạn 12 công trình/năm. Hotline KTS Trưởng: <strong className="text-ink font-mono">0368 757 916</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
