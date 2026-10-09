'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface KynamTier {
  id: string
  name: string
  origin: string
  purity: string
  idealTemp: number
  olfactoryNotes: string
  woodVessel: string
}

const KYNAM_TIERS: readonly KynamTier[] = [
  {
    id: 'bach-ky-tuyet-dinh',
    name: 'Bạch Kỳ Nam Đỉnh Thượng Vạn Giã',
    origin: 'Đỉnh núi Vạn Giã mây ngàn, Khánh Hòa',
    purity: '99.9% Tinh dầu Kỳ Nam tự nhiên',
    idealTemp: 114,
    olfactoryNotes: 'Nốt sương mai tuyết lãnh, chuyển dần sang hương bơ sữa hoa sen ngát ngào, vương vấn phong vị vương giả suốt 72 giờ.',
    woodVessel: 'Án gỗ Mun sừng 170 năm tuổi mộng âm dương cẩn Ngọc Bích Phỉ Thúy Type A.',
  },
  {
    id: 'hac-ky-chua-hon-heo',
    name: 'Hắc Kỳ Nam Hắc Long Chúa Hòn Hèo',
    origin: 'Rừng cấm bán đảo Hòn Hèo, Khánh Hòa',
    purity: '99.4% Tinh dầu sáp đen chìm nước tuyệt đối',
    idealTemp: 140,
    olfactoryNotes: 'Hương trầm cổ xưa huyền bí thâm sâu, an định thần hồn, khơi gợi cảm hứng sáng tạo và bình an tuyệt đối.',
    woodVessel: 'Tráp gỗ Trắc đen bách niên lót lụa tơ tằm dệt thủ công.',
  },
  {
    id: 'hoang-ky-hoang-kim',
    name: 'Hoàng Kỳ Nam Hoàng Kim Vạn Ninh',
    origin: 'Rừng nguyên sinh Vạn Ninh, Khánh Hòa',
    purity: '98.0% Tinh dầu sắc vàng mật ong',
    idealTemp: 130,
    olfactoryNotes: 'Hương hoa rừng nhiệt đới hòa quyện quả chín ngọt ấm, mang đến sinh khí thịnh vượng và an khang.',
    woodVessel: 'Khay Cẩm lai bách niên khảm chỉ vàng 24K hoa sen tao nhã.',
  },
]

export function BespokeImperialKynamAndGoldFiligreePeacockLotusIncenseBurnerVault() {
  const [selectedKynamId, setSelectedKynamId] = useState<string>('bach-ky-tuyet-dinh')
  const [temperature, setTemperature] = useState<number>(114)
  const [isPlayingHarmonic, setIsPlayingHarmonic] = useState(false)
  const [audioNotice, setAudioNotice] = useState<string | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)

  const activeKynam = KYNAM_TIERS.find((k) => k.id === selectedKynamId) ?? KYNAM_TIERS[0]!

  const playHarmonicChime = () => {
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
      osc2.frequency.setValueAtTime(741, ctx.currentTime)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.09, ctx.currentTime + 0.6)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.2)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start()
      osc2.start()
      osc1.stop(ctx.currentTime + 4.3)
      osc2.stop(ctx.currentTime + 4.3)

      setIsPlayingHarmonic(true)
      setAudioNotice('Hòa âm 528Hz + 741Hz an định tinh thần · Tương thích vi khí hậu thưởng hương hoàng gia')

      setTimeout(() => {
        setIsPlayingHarmonic(false)
        setAudioNotice(null)
      }, 4300)
    } catch {
      setAudioNotice('Trình duyệt chưa hỗ trợ Web Audio')
      setTimeout(() => setAudioNotice(null), 3000)
    }
  }

  return (
    <section className="relative overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-amber-900/40 selection:text-amber-200">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-1/2 left-1/4 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            Nghệ Thuật Thưởng Hương Cung Đình
          </span>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
            Bảo Thất Kỳ Nam & Đỉnh Lư Vàng 24K Khổng Tước Đạp Sen
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-stone-400 sm:text-lg">
            Tuyệt phẩm đỉnh lư đồng đỏ nguyên khối bọc chỉ vàng 24K Filigree hình tượng Khổng Tước Khai Bình, ngự trên án
            Mun sừng bách niên khảm Ngọc Bích Phỉ Thúy Type A, điều nhiệt vi sai chuẩn xác cho từng cấp bậc Kỳ Nam.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent z-10" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <motion.div
                  animate={{
                    scale: [1, 1.02, 1],
                    boxShadow: [
                      '0 0 20px rgba(245,158,11,0.2)',
                      '0 0 45px rgba(245,158,11,0.4)',
                      '0 0 20px rgba(245,158,11,0.2)',
                    ],
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="relative flex h-60 w-60 flex-col items-center justify-center rounded-2xl border border-amber-500/50 bg-stone-950/90 p-6 text-center"
                >
                  <div className="h-10 w-10 rounded-full border border-amber-400/40 bg-amber-500/10 flex items-center justify-center text-amber-300 text-xs font-mono">
                    24K
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-wider text-amber-400 font-mono">Đỉnh Lư Filigree</p>
                  <p className="mt-1 text-sm font-medium text-stone-100">Khổng Tước Đạp Sen</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-stone-800/80 px-3 py-1 text-xs font-mono text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Nhiệt Độ: {temperature}°C</span>
                  </div>
                </motion.div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={playHarmonicChime}
                    disabled={isPlayingHarmonic}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium backdrop-blur transition',
                      isPlayingHarmonic
                        ? 'border-amber-400 bg-amber-950/60 text-amber-200'
                        : 'border-stone-700 bg-stone-950/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-300'
                    )}
                  >
                    <span>{isPlayingHarmonic ? 'Đang Ngân Vang Chuông Vàng' : 'Chuông Vàng 528Hz + 741Hz'}</span>
                  </button>
                </div>

                <span className="text-xs font-mono text-stone-400">
                  Độ tinh khiết: <strong className="text-amber-300 font-semibold">{activeKynam.purity}</strong>
                </span>
              </div>
            </div>

            <AnimatePresence>
              {audioNotice && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-3 rounded-lg border border-amber-500/30 bg-amber-950/30 px-4 py-2 text-center text-xs text-amber-300"
                >
                  {audioNotice}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur">
              <p className="text-xs font-mono tracking-wider text-amber-400 uppercase">Lựa Chọn Kỳ Nam Hoàng Gia</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {KYNAM_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      setSelectedKynamId(tier.id)
                      setTemperature(tier.idealTemp)
                    }}
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs transition',
                      selectedKynamId === tier.id
                        ? 'border-amber-500 bg-amber-500/20 text-amber-200'
                        : 'border-stone-800 bg-stone-950 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                    )}
                  >
                    {tier.name.split(' ')[0]} {tier.name.split(' ')[1]}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="border-l-2 border-amber-500/60 pl-4">
                  <p className="text-xs font-medium text-amber-400">Nguồn gốc danh mộc</p>
                  <p className="mt-1 text-sm text-stone-300">{activeKynam.origin}</p>
                </div>

                <div className="border-l-2 border-stone-700 pl-4">
                  <p className="text-xs font-medium text-stone-400">Tầng hương khứu giác</p>
                  <p className="mt-1 text-sm text-stone-300">{activeKynam.olfactoryNotes}</p>
                </div>

                <div className="border-l-2 border-stone-700 pl-4">
                  <p className="text-xs font-medium text-stone-400">Án ngự & Tráp bảo quản</p>
                  <p className="mt-1 text-sm text-stone-300">{activeKynam.woodVessel}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800">
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span>Điều chỉnh nhiệt vi sai không khói:</span>
                  <span className="font-mono text-amber-300">{temperature}°C (Khuyên dùng: {activeKynam.idealTemp}°C)</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={240}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                <p className="text-xs text-stone-400">Ruột Đỉnh Lư</p>
                <p className="mt-1 text-lg font-light text-amber-300">Đồng Đỏ 10mm</p>
                <p className="mt-0.5 text-xs text-stone-500">Giữ nhiệt đồng đều</p>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                <p className="text-xs text-stone-400">Chế Tác Vàng</p>
                <p className="mt-1 text-lg font-light text-emerald-400">24K Filigree</p>
                <p className="mt-0.5 text-xs text-stone-500">Nghệ nhân cố đô Huế</p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-4 text-xs text-stone-400">
              <strong className="text-amber-300">Đặc quyền Bảo Thất GuHomes:</strong> Mỗi thiết kế án thờ và lư hương được may đo riêng theo bản mệnh gia chủ, đảm bảo chuẩn mực phong thủy và thích ứng hoàn hảo độ ẩm nhiệt đới Sài Gòn.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
