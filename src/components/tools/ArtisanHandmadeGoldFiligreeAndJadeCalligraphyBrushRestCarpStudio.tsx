'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CarpRestFeature {
  id: string
  name: string
  spec: string
  description: string
}

const CARP_REST_SPECS: readonly CarpRestFeature[] = [
  {
    id: 'jade-carp-body',
    name: 'Thân Cá Chép Ngọc Bích Phỉ Thúy Type A',
    spec: 'Dài 195mm · Rộng 66mm · Ngọc phỉ thúy Myanmar nguyên khối',
    description: 'Chạm khắc thủ công nguyên khối ngọc Phỉ Thúy Type A tự nhiên hình dáng Cá Chép vượt Vũ Môn, thấu quang 94.5%, rãnh ngự bút song hành mượt mà.',
  },
  {
    id: 'gold-scale-filigree',
    name: 'Nẹp Vảy Cá & Sóng Nước Vàng 24K Filigree',
    spec: 'Chỉ vàng 24K 0.18mm · Nghệ nhân kim hoàn Huế chế tác',
    description: 'Từng sợi vàng 24K mảnh mai được kéo nguội và đan vặn tạo hình vảy cá rồng óng ánh và những lượn sóng cuộn trào cát tường.',
  },
  {
    id: 'mun-hoa-base',
    name: 'Đế Đỡ Gỗ Mun Hoa Phú Quốc 160 Năm',
    spec: 'Gỗ Mun hoa đảo Phú Quốc · Mộng âm dương không đinh',
    description: 'Chân đế đục đẽo từ khối Mun hoa nguyên khối sọc đen vân hổ phách quý hiếm, ngâm tẩm sáp ong tự nhiên chống ẩm tuyệt đối.',
  },
]

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestCarpStudio() {
  const [isBrushRested, setIsBrushRested] = useState<boolean>(true)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false)
  const [soundNote, setSoundNote] = useState<string | null>(null)
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('jade-carp-body')
  const audioCtxRef = useRef<AudioContext | null>(null)

  const activeFeature = CARP_REST_SPECS.find((f) => f.id === selectedFeatureId) ?? CARP_REST_SPECS[0]!

  const playHarmonicOctave = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        void ctx.resume()
      }

      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(1056, ctx.currentTime)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.8)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start()
      osc2.start()
      osc1.stop(ctx.currentTime + 3.9)
      osc2.stop(ctx.currentTime + 3.9)

      setIsPlayingSound(true)
      setSoundNote('Âm thoa bát độ 528Hz & 1056Hz · Tĩnh lặng tâm thức thư phòng hoàng gia')

      setTimeout(() => {
        setIsPlayingSound(false)
        setSoundNote(null)
      }, 3900)
    } catch {
      setSoundNote('Trình duyệt chưa hỗ trợ Web Audio')
      setTimeout(() => setSoundNote(null), 3000)
    }
  }

  const toggleBrush = () => {
    setIsBrushRested((prev) => !prev)
  }

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.35 : 1))
  }

  return (
    <section className="relative overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-emerald-900/40 selection:text-emerald-200">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-emerald-600/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-emerald-300 uppercase">
            Tuyệt Phẩm Thư Phòng Quý Tộc
          </span>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
            Kê Ngự Bút Cá Chép Hóa Rồng Phỉ Thúy Nẹp Vàng 24K
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-stone-400 sm:text-lg">
            Khắc họa hình tượng Cá Chép Vượt Vũ Môn từ khối Ngọc Bích Phỉ Thúy Type A Myanmar thấu quang 94.5%,
            viền chỉ vàng 24K Filigree tinh xảo và đế gỗ Mun hoa Phú Quốc 160 năm đục mộng âm dương chuẩn mực.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent z-10" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex h-52 w-80 flex-col items-center justify-center rounded-2xl border border-emerald-500/40 bg-stone-950/90 p-6 text-center shadow-2xl"
                >
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
                    Cá Chép Vượt Vũ Môn
                  </div>
                  <p className="mt-1 text-base font-medium text-stone-100">Ngọc Bích Phỉ Thúy Type A</p>
                  <p className="mt-0.5 text-xs text-amber-300/80">Nẹp Viền Chỉ Vàng 24K Filigree Huế</p>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    <span className="rounded-full bg-stone-800/80 px-2.5 py-1 text-[11px] font-mono text-stone-300">
                      Độ Dốc Thoát Mực: 15°
                    </span>
                    <span className="rounded-full bg-stone-800/80 px-2.5 py-1 text-[11px] font-mono text-emerald-400">
                      Thấu Quang: 94.5%
                    </span>
                  </div>

                  <AnimatePresence>
                    {isBrushRested && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/40 px-3 py-1 text-xs text-amber-200"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                        <span>Ngự Bút Lông Thỏ Hoàng Triều Đang Gác</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleBrush}
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-stone-950/80 px-4 py-2 text-xs font-medium text-emerald-300 backdrop-blur transition hover:border-emerald-400 hover:bg-stone-900"
                  >
                    <span>{isBrushRested ? 'Nhấc Ngự Bút Lên' : 'Gác Ngự Bút Xuống'}</span>
                  </button>

                  <button
                    onClick={toggleZoom}
                    className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-950/80 px-3 py-2 text-xs font-medium text-stone-300 backdrop-blur transition hover:border-stone-500"
                  >
                    <span>{zoomLevel === 1 ? 'Kính Lúp 1.35x' : 'Góc Nhìn Chuẩn 1x'}</span>
                  </button>

                  <button
                    onClick={playHarmonicOctave}
                    disabled={isPlayingSound}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium backdrop-blur transition',
                      isPlayingSound
                        ? 'border-emerald-400 bg-emerald-950/60 text-emerald-200'
                        : 'border-stone-700 bg-stone-950/80 text-stone-300 hover:border-emerald-500/40 hover:text-emerald-300'
                    )}
                  >
                    <span>{isPlayingSound ? 'Đang Ngân Vang Bát Độ' : 'Hòa Âm Bát Độ 528Hz & 1056Hz'}</span>
                  </button>
                </div>

                <span className="text-xs font-mono text-stone-400">
                  Chiều dài: <strong className="text-emerald-300 font-semibold">195mm</strong>
                </span>
              </div>
            </div>

            <AnimatePresence>
              {soundNote && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-4 py-2 text-center text-xs text-emerald-300"
                >
                  {soundNote}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur">
              <p className="text-xs font-mono tracking-wider text-emerald-400 uppercase">Cấu Thành Thủ Công Tinh Xảo</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {CARP_REST_SPECS.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setSelectedFeatureId(feature.id)}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs transition',
                      selectedFeatureId === feature.id
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200'
                        : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                    )}
                  >
                    {feature.name.split(' ')[0]} {feature.name.split(' ')[1]} {feature.name.split(' ')[2]}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="border-l-2 border-emerald-500/60 pl-4">
                  <p className="text-xs font-medium text-emerald-400">{activeFeature.name}</p>
                  <p className="mt-1 text-sm font-mono text-stone-400">{activeFeature.spec}</p>
                </div>

                <div className="border-l-2 border-stone-700 pl-4">
                  <p className="text-xs font-medium text-stone-400">Chi tiết chế tác thủ công</p>
                  <p className="mt-1 text-sm text-stone-300">{activeFeature.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                <p className="text-xs text-stone-400">Thấu Quang Ngọc</p>
                <p className="mt-1 text-lg font-light text-emerald-300">94.5% Độ Trong</p>
                <p className="mt-0.5 text-xs text-stone-500">Phỉ Thúy Type A</p>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                <p className="text-xs text-stone-400">Đế Gỗ Mun Hoa</p>
                <p className="mt-1 text-lg font-light text-amber-400">160 Năm Tuổi</p>
                <p className="mt-0.5 text-xs text-stone-500">Phú Quốc · Chống ẩm</p>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-900/30 bg-emerald-950/10 p-4 text-xs text-stone-400">
              <strong className="text-emerald-300">Bảo chứng Thư Phòng GuHomes:</strong> Từng món khí cụ văn phòng tứ bảo đều được đích thân KTS Trưởng GuHomes tuyển chọn và hoàn thiện tại xưởng may đo Thạnh Xuân 1.200m², phục vụ các gia chủ chuộng phong cách sống tĩnh tại và thanh cao.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
