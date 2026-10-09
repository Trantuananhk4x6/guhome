'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface JadeRestFeature {
  id: string
  name: string
  spec: string
  artisanDetail: string
}

const JADE_FEATURES: JadeRestFeature[] = [
  {
    id: 'bup-sen-tam-diep',
    name: 'Búp Sen Phỉ Thúy & Tam Diệp Tụ Khí',
    spec: 'Ngọc Bích Type A Myanmar thấu quang 99.0%',
    artisanDetail: 'Chạm khắc liền khối từ tảng ngọc phỉ thúy hoàng gia: Búp sen nở hé ngậm ngọc ở trung tâm, ba phiến lá sen (tam diệp) uốn lượn mềm mại đỡ ba vị trí kê bút.',
  },
  {
    id: 'nep-vang-24k',
    name: 'Nẹp Chỉ Vàng 24K Filigree 0.18mm',
    spec: 'Vàng 24K 99.99% se sợi thủ công',
    artisanDetail: 'Nghệ nhân kim hoàn cung đình se từng sợi chỉ vàng 0.18mm đan viền gân lá sen và đài sen liên hoa, triệt tiêu ma sát bảo vệ thân ngự bút.',
  },
  {
    id: 'be-go-do-lao',
    name: 'Bệ Gõ Đỏ Lào Cổ Thụ 290 Năm',
    spec: 'Vân hổ phách đanh chắc, mộng âm dương',
    artisanDetail: 'Đế đệm gỗ Gõ Đỏ Lào 290 năm tuổi ngâm bùn sấy tự nhiên, đánh sáp ong ruồi rừng gìn giữ sắc mộc nguyên bản, rãnh kê dốc thoát mực 15° hoàn hảo.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTripleLeafStudio() {
  const [selectedFeature, setSelectedFeature] = useState<JadeRestFeature>(JADE_FEATURES[0]!)
  const [isBrushPlaced, setIsBrushPlaced] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1.0)
  const [isPlayingHarmonics, setIsPlayingHarmonics] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)

  // Web Audio 528Hz & 1056Hz Octave Calligraphy Focus Chime
  const toggleCalligraphyHarmonics = () => {
    if (isPlayingHarmonics) {
      try {
        osc1Ref.current?.stop()
        osc2Ref.current?.stop()
        osc1Ref.current?.disconnect()
        osc2Ref.current?.disconnect()
      } catch {
        // Safe ignore
      }
      setIsPlayingHarmonics(false)
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        audioContextRef.current = ctx

        // Dual octaves: 528Hz (Fundamental) + 1056Hz (Harmonic Overstone)
        const osc1 = ctx.createOscillator()
        const osc2 = ctx.createOscillator()
        const gain1 = ctx.createGain()
        const gain2 = ctx.createGain()

        osc1.type = 'sine'
        osc1.frequency.setValueAtTime(528, ctx.currentTime)
        osc2.type = 'sine'
        osc2.frequency.setValueAtTime(1056, ctx.currentTime)

        gain1.gain.setValueAtTime(0.001, ctx.currentTime)
        gain1.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 1.2)

        gain2.gain.setValueAtTime(0.001, ctx.currentTime)
        gain2.gain.exponentialRampToValueAtTime(0.015, ctx.currentTime + 1.2)

        osc1.connect(gain1)
        gain1.connect(ctx.destination)

        osc2.connect(gain2)
        gain2.connect(ctx.destination)

        osc1.start()
        osc2.start()

        osc1Ref.current = osc1
        osc2Ref.current = osc2
        setIsPlayingHarmonics(true)
      } catch {
        setIsPlayingHarmonics(false)
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
      {/* Background Jade & Gold Radiance */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 h-96 w-96 rounded-full bg-accent/25 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-mono text-accent uppercase tracking-widest">
            <span>● Thư Phòng Atelier Thủ Công Mỹ Nghệ</span>
            <span>·</span>
            <span>Phỉ Thúy Type A & Vàng 24K</span>
          </div>

          <h2 className="mt-4 font-display text-2xl sm:text-4xl lg:text-5xl font-normal leading-tight text-canvas">
            Atelier Kê Ngự Bút Búp Sen Tam Diệp Phỉ Thúy Nẹp Vàng 24K
          </h2>

          <p className="mt-4 font-body text-sm sm:text-base text-canvas/75 leading-relaxed">
            Tuyệt phẩm thư phòng danh giá đúc kết tinh hoa cung đình: Búp sen ngậm ngọc kết hợp ba phiến lá sen (tam diệp) tạc từ nguyên khối Ngọc Bích Phỉ Thúy Type A Myanmar thấu quang 99.0%, viền nẹp vàng 24K Filigree sợi mảnh 0.18mm, ngự trên bệ Gõ Đỏ Lào 290 năm tuổi đục mộng âm dương.
          </p>
        </div>

        {/* Dynamic Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-6">
          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Độ thấu quang ngọc</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">99.0%</div>
            <p className="mt-1 text-xs text-canvas/60">Phỉ Thúy Type A Myanmar</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Bệ Gõ Đỏ Lào Cổ Thụ</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">290 Năm</div>
            <p className="mt-1 text-xs text-canvas/60">Đánh sáp ong rừng thủ công</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Độ dốc thoát mực</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">15°</div>
            <p className="mt-1 text-xs text-canvas/60">Bảo tồn đầu bút lông sói</p>
          </div>

          <div className="rounded-2xl border border-line/60 bg-surface/10 p-4 sm:p-5 backdrop-blur-md">
            <span className="font-mono text-xs text-muted uppercase tracking-wider">Tần số tĩnh tâm</span>
            <div className="mt-2 font-display text-2xl sm:text-3xl text-accent">528+1056Hz</div>
            <p className="mt-1 text-xs text-canvas/60">Bát độ định tâm thiền thư</p>
          </div>
        </div>

        {/* Interactive Studio Workspace */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
          {/* Controls column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <h3 className="font-display text-lg text-canvas/90 flex items-center justify-between">
              <span>Chi Tiết Chế Tác Cung Đình</span>
              <span className="text-xs font-mono text-accent">Tam Diệp Triều Liên</span>
            </h3>

            <div className="flex flex-col gap-3">
              {JADE_FEATURES.map((feature) => {
                const isSelected = feature.id === selectedFeature.id
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setSelectedFeature(feature)}
                    className={cn(
                      'group flex min-h-[52px] flex-col rounded-xl border p-3.5 text-left transition-all duration-300',
                      isSelected
                        ? 'border-accent bg-accent/15 shadow-[0_0_20px_rgba(197,168,128,0.2)]'
                        : 'border-line/60 bg-surface/5 hover:border-accent/40 hover:bg-surface/10',
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className={cn('text-sm font-medium', isSelected ? 'text-accent' : 'text-canvas/90')}>
                        {feature.name}
                      </span>
                      <span className="font-mono text-xs text-muted">{feature.spec}</span>
                    </div>
                    <p className="mt-1 text-xs text-canvas/65 line-clamp-1">{feature.artisanDetail}</p>
                  </button>
                )
              })}
            </div>

            {/* Interactive Zoom & Micro-Controls */}
            <div className="rounded-2xl border border-line/60 bg-surface/5 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted uppercase tracking-wider">Kính Hiển Vi Soi Vân Ngọc Phỉ Thúy</span>
                <span className="font-mono text-sm text-accent">{zoomLevel.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="1.4"
                step="0.05"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="mt-3 w-full accent-accent cursor-pointer"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsBrushPlaced((prev) => !prev)}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer',
                  isBrushPlaced
                    ? 'border-accent bg-accent text-espresso shadow-[0_0_15px_rgba(197,168,128,0.4)]'
                    : 'border-accent/40 bg-surface/10 text-canvas/80 hover:border-accent hover:text-canvas',
                )}
              >
                <span>{isBrushPlaced ? '● Nhấc Ngự Bút Hoàng Gia' : '○ Gác Ngự Bút Lên Tam Diệp'}</span>
              </button>

              <button
                type="button"
                onClick={toggleCalligraphyHarmonics}
                className={cn(
                  'inline-flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer',
                  isPlayingHarmonics
                    ? 'border-accent bg-accent/20 text-accent-soft'
                    : 'border-line/60 bg-surface/10 text-canvas/80 hover:border-accent/40',
                )}
              >
                <span>{isPlayingHarmonics ? '● Tắt Âm Thư Phòng' : '○ Hòa Âm Bát Độ 528+1056Hz'}</span>
              </button>
            </div>
          </div>

          {/* Visualizer Column */}
          <div className="lg:col-span-7">
            <div className="relative aspect-4/3 sm:aspect-16/10 w-full rounded-3xl border border-accent/30 bg-radial from-surface/30 to-espresso/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl flex flex-col justify-between overflow-hidden">
              <div className="relative z-10 flex items-center justify-between border-b border-canvas/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className={cn('h-2 w-2 rounded-full', isBrushPlaced ? 'bg-accent animate-ping' : 'bg-canvas/30')} />
                  <span className="font-mono text-xs text-accent">Kê Ngự Bút Búp Sen Tam Diệp Trực Quan</span>
                </div>
                <div className="font-mono text-xs text-canvas/60">Trạng thái: {isBrushPlaced ? 'Đã Gác Ngự Bút' : 'Sẵn Sàng'}</div>
              </div>

              {/* Graphic Jade Rest Core */}
              <div className="relative my-auto flex flex-col items-center justify-center">
                <motion.div
                  style={{ scale: zoomLevel }}
                  transition={{ duration: 0.2 }}
                  className="relative flex h-36 w-48 sm:h-44 sm:w-64 items-center justify-center rounded-3xl border-2 border-accent/70 bg-gradient-to-br from-accent/20 via-surface/40 to-espresso/90 shadow-[0_0_40px_rgba(197,168,128,0.25)]"
                >
                  <div className="text-center p-3">
                    <div className="font-display text-sm sm:text-base text-accent">Búp Sen Tam Diệp</div>
                    <div className="font-mono text-[10px] text-canvas/60 mt-0.5">Phỉ Thúy Type A Myanmar</div>
                    <div className="mt-1 font-mono text-[9px] text-accent/80">Thấu quang 99.0%</div>
                  </div>

                  {/* Render Brush when Placed */}
                  <AnimatePresence>
                    {isBrushPlaced && (
                      <motion.div
                        initial={{ opacity: 0, y: -20, rotate: -8 }}
                        animate={{ opacity: 1, y: 0, rotate: -5 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -top-3 w-56 sm:w-72 h-3 rounded-full bg-accent shadow-[0_0_20px_#c5a880] flex items-center justify-end pr-2"
                      >
                        <span className="font-mono text-[8px] text-espresso font-bold">Ngự Bút Hoàng Gia</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Pedestal: Bệ Gõ Đỏ Lào 290 Năm */}
                <div className="mt-4 w-56 sm:w-72 h-3.5 rounded-full bg-accent/40 shadow-[0_0_15px_rgba(197,168,128,0.3)]" />
                <span className="mt-1 font-mono text-[10px] text-canvas/40">Bệ Gõ Đỏ Lào Cổ Thụ 290 Năm</span>
              </div>

              {/* Feature artisan footer */}
              <div className="relative z-10 rounded-xl border border-canvas/10 bg-canvas/5 p-3 text-xs text-canvas/70">
                <span className="font-medium text-accent">Chi tiết nghệ nhân: </span>
                {selectedFeature.artisanDetail}
              </div>
            </div>
          </div>
        </div>

        {/* Commitment Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line/40 pt-6 sm:flex-row text-xs text-canvas/50">
          <div>Chế tác thủ công độc bản bởi nghệ nhân xưởng may đo Thạnh Xuân 1.200m² - GuHomes</div>
          <div className="font-mono text-accent">Trần giới hạn: 12 bộ ngự dụng thư phòng mỗi năm</div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudTripleLeafStudio
