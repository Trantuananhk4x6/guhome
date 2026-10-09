'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface KynamSpec {
  id: string
  name: string
  origin: string
  resinDensity: string
  fragranceNotes: string
  idealTemp: number
}

const KYNAM_SPECS: KynamSpec[] = [
  {
    id: 'hac-ky',
    name: 'Hắc Kỳ Nam Vạn Ninh Bách Niên',
    origin: 'Rừng nguyên sinh Vạn Ninh, Khánh Hòa',
    resinDensity: '99.8% (Hóa thạch chìm nước 100%)',
    fragranceNotes: 'Tầng đầu cay nồng uy vũ, tầng giữa ngọt mật sáp ong hoa rừng, hậu vị thanh lương tĩnh tại vô biên.',
    idealTemp: 175,
  },
  {
    id: 'bach-ky',
    name: 'Bạch Kỳ Nam Hòn Hèo Hoàng Gia',
    origin: 'Vách đá Hòn Hèo, Khánh Hòa',
    resinDensity: '99.6% (Bạch ngọc thấu quang)',
    fragranceNotes: 'Hương sữa non tinh khiết, mát lạnh xông thẳng định thần, lưu hương 72 giờ trong không gian kín.',
    idealTemp: 145,
  },
  {
    id: 'thanh-ky',
    name: 'Thanh Kỳ Nam Ninh Hòa Thượng Phẩm',
    origin: 'Đỉnh núi Mẹ Ninh Hòa, Khánh Hòa',
    resinDensity: '98.7% (Ánh xanh lam ngọc bích)',
    fragranceNotes: 'Vị the mát như sương sớm thảo mộc, hương trầm lắng đọng xua tan uế khí sinh tài đắc lộc.',
    idealTemp: 190,
  },
]

export function BespokeImperialKynamAndGoldFiligreeTigerLotusIncenseBurnerVaultV2() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KYNAM_SPECS[0]!)
  const [temperature, setTemperature] = useState<number>(selectedKynam.idealTemp)
  const [isBurning, setIsBurning] = useState(false)
  const [isPlayingChime, setIsPlayingChime] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)

  // Web Audio 528Hz + 741Hz Imperial Gold Chime Harmonics
  const toggleImperialChime = () => {
    if (isPlayingChime) {
      try {
        osc1Ref.current?.stop()
        osc2Ref.current?.stop()
        osc1Ref.current?.disconnect()
        osc2Ref.current?.disconnect()
      } catch {
        // Safe ignore
      }
      setIsPlayingChime(false)
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        audioContextRef.current = ctx

        // Dual sacred frequencies: 528Hz (Transformation) + 741Hz (Awakening Intuition)
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain1 = ctx.createGain()
        const gain2 = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(741, ctx.currentTime)

        gain1.gain.setValueAtTime(0.001, ctx.currentTime)
        gain1.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.2)

        gain2.gain.setValueAtTime(0.001, ctx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.02, ctx.currentTime + 1.2)

        osc1.connect(gain1)
        gain1.connect(ctx.destination)

        osc2.connect(gain2)
        gain2.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc1Ref.current = osc1
        osc2Ref.current = osc2
        setIsPlayingChime(true)
      } catch {
        setIsPlayingChime(false)
      }
    }
  }

  useEffect(() => {
    return () => {
      try {
        osc1Ref.current?.stop()
        osc2Ref.current?.stop()
        osc1Ref.current?.disconnect()
        osc2Ref.current?.disconnect()
      } catch {
        // Cleanup
      }
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-espresso py-20 sm:py-28 text-canvas border-b border-line/40">
      {/* Background Gold Filigree Radiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-mono text-accent uppercase tracking-widest">
            <span>● Tuyệt Tác Bảo Thất Kỳ Nam V2</span>
            <span>·</span>
            <span>Kim Dần Đạp Sen Vàng 24K</span>
          </div>

          <h2 className="mt-4 font-display text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-canvas">
            Bảo Thất Kỳ Nam & Đỉnh Lư Kim Dần Đạp Sen Vàng 24K Filigree V2
          </h2>

          <p className="mt-4 font-body text-sm sm:text-base text-canvas/75 leading-relaxed">
            Chế tác độc bản kết hợp đỉnh xông trầm vàng 24K Filigree tạo hình Kim Dần (Hổ Vàng) đạp đóa sen ngọc bích, ruột đúc đồng đỏ nguyên khối 10mm giữ nhiệt tuyệt đối, ngự trên án Gỗ Trắc Dây Nam Bộ 290 năm tuổi khảm Xà Cừ Cửu Phụng Triều Dương, cùng bộ vi nhiệt 80°C - 240°C khơi dậy trọn vẹn tầng hương Ngũ Tuyệt Kỳ Nam Khánh Hòa.
          </p>
        </div>

        {/* Dynamic Imperial Metrics */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Vàng 24K Filigree</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">99.99%</div>
            <p className="mt-1 text-xs text-canvas/60">Sợi vàng kéo tay 0.18mm</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Án Trắc Dây Nam Bộ</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">290 Năm</div>
            <p className="mt-1 text-xs text-canvas/60">Khảm ốc xà cừ Cửu Phụng</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Hàm lượng tinh dầu</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">99.8%</div>
            <p className="mt-1 text-xs text-canvas/60">Trầm Kỳ Khánh Hòa chìm nước</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Âm hưởng hoàng gia</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">528+741Hz</div>
            <p className="mt-1 text-xs text-canvas/60">Chuông khánh vàng khai mở</p>
          </div>
        </div>

        {/* Interactive Vault Workspace */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Controls: Kynam Selectors + Thermostat */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <h3 className="font-display text-lg text-canvas/90 flex items-center justify-between">
              <span>Tuyển Tập Kỳ Nam Hoàng Triều</span>
              <span className="text-xs font-mono text-accent">Khánh Hòa Độc Bản</span>
            </h3>

            <div className="flex flex-col gap-3">
              {KYNAM_SPECS.map((kynam) => {
                const isSelected = kynam.id === selectedKynam.id
                return (
                  <button
                    key={kynam.id}
                    type="button"
                    onClick={() => {
                      setSelectedKynam(kynam)
                      setTemperature(kynam.idealTemp)
                    }}
                    className={cn(
                      'group flex min-h-[52px] flex-col rounded-xl border p-3.5 text-left transition-all duration-300',
                      isSelected
                        ? 'border-accent bg-accent/15 shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                        : 'border-line/60 bg-surface/5 hover:border-accent/40 hover:bg-surface/10',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn('text-sm font-medium', isSelected ? 'text-accent' : 'text-canvas/90')}>
                        {kynam.name}
                      </span>
                      <span className="font-mono text-xs text-muted">{kynam.resinDensity}</span>
                    </div>
                    <p className="mt-1 text-xs text-canvas/65 line-clamp-1">{kynam.fragranceNotes}</p>
                  </button>
                )
              })}
            </div>

            {/* Micro-Thermostat Controller */}
            <div className="rounded-2xl border border-line/60 bg-surface/5 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">Vi Nhiệt Gia Nhiệt Không Khói</span>
                <span className="font-mono text-sm text-accent">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="mt-3 w-full accent-accent cursor-pointer"
              />
              <div className="mt-2 flex justify-between text-[10px] font-mono text-canvas/50">
                <span>80°C (Ủ hương tĩnh)</span>
                <span>160°C (Tỏa hương tinh khiết)</span>
                <span>240°C (Cực đỉnh Kỳ Nam)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsBurning((prev) => !prev)}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer',
                  isBurning
                    ? 'border-accent bg-accent text-espresso shadow-[0_0_15px_rgba(197,168,128,0.4)]'
                    : 'border-accent/40 bg-surface/10 text-canvas/80 hover:border-accent hover:text-canvas',
                )}
              >
                <span>{isBurning ? '● Tắt Lò Vi Nhiệt' : '○ Khởi Động Xông Trầm Không Khói'}</span>
              </button>

              <button
                type="button"
                onClick={toggleImperialChime}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer',
                  isPlayingChime
                    ? 'border-accent bg-accent/20 text-accent-soft'
                    : 'border-line/60 bg-surface/10 text-canvas/80 hover:border-accent/40',
                )}
              >
                <span>{isPlayingChime ? '● Tắt Chuông Hoàng Gia' : '○ Hòa Chuông Vàng 528+741Hz'}</span>
              </button>
            </div>
          </div>

          {/* Vault Visualizer */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-3xl border border-accent/30 bg-radial from-surface/30 to-espresso/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden">
              <div className="relative z-10 flex items-center justify-between border-b border-canvas/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2 w-2 rounded-full', isBurning ? 'bg-accent animate-ping' : 'bg-canvas/30')} />
                  <span className="font-mono text-xs text-accent">Đỉnh Lư Kim Dần Đạp Sen Trực Quan</span>
                </div>
                <div className="font-mono text-xs text-canvas/60">Trạng thái: {isBurning ? 'Đang Khởi Nhiệt' : 'Nghỉ'}</div>
              </div>

              {/* Incense Burner Centerpiece Graphic */}
              <div className="relative my-auto flex flex-col items-center justify-center">
                {/* Smoke animation when burning */}
                <AnimatePresence>
                  {isBurning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: [0.2, 0.6, 0.2], y: -30, scale: 1.2 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-12 h-20 w-20 rounded-full bg-accent/30 blur-2xl pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Central Incense Vault Core */}
                <div className="relative flex h-36 w-36 sm:h-44 sm:w-44 items-center justify-center rounded-full border-2 border-accent/70 bg-gradient-to-br from-accent/20 via-surface/40 to-espresso/90 shadow-[0_0_40px_rgba(197,168,128,0.25)]">
                  <div className="text-center">
                    <div className="font-display text-sm sm:text-base text-accent">Kim Dần Đạp Sen</div>
                    <div className="font-mono text-[10px] text-canvas/60 mt-0.5">Vàng 24K Filigree</div>
                    <div className="mt-2 font-mono text-xs text-accent-soft">{temperature}°C</div>
                  </div>
                </div>

                {/* Pedestal representation: Án Trắc Dây */}
                <div className="mt-4 w-48 sm:w-64 h-3 rounded-full bg-accent/40 shadow-[0_0_15px_rgba(197,168,128,0.3)]" />
                <span className="mt-1 font-mono text-[10px] text-canvas/40">Án Trắc Dây Nam Bộ 290 Năm</span>
              </div>

              {/* Fragrance details footer */}
              <div className="relative z-10 rounded-xl border border-canvas/10 bg-canvas/5 p-3 text-xs text-canvas/70">
                <span className="font-medium text-accent">Hương học hoàng gia: </span>
                {selectedKynam.fragranceNotes}
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/40 pt-6 sm:flex-row text-xs text-canvas/50">
          <div>Chế tác đỉnh vàng Filigree và tuyển trạch Kỳ Nam nguyên chất tại GuHomes Atelier Thạnh Xuân</div>
          <div className="font-mono text-accent">Độc bản dành riêng cho 12 trạch chủ danh gia mỗi năm</div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeTigerLotusIncenseBurnerVaultV2
