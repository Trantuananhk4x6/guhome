'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PavilionAngle {
  degree: number
  label: string
  windEfficiency: string
  shadingDesc: string
  woodAcoustic: string
}

const PAVILION_ANGLES: readonly PavilionAngle[] = [
  {
    degree: 0,
    label: 'Hướng Nam: Gió Sông Sài Gòn',
    windEfficiency: 'Lưu lượng gió mát 4.5 m/s · Giảm nhiệt -6.1°C',
    shadingDesc: 'Hệ mái cong gỗ Gội nếp 180 năm vươn dài 2.8m che chắn 100% nắng gắt ban trưa chiếu xiên vào sàn trà.',
    woodAcoustic: 'Gỗ Gội nếp Tây Bắc tiêu âm tự nhiên, hấp thụ tạp âm đô thị và khuếch đại tiếng nước hào sen.',
  },
  {
    degree: 90,
    label: 'Hướng Đông: Đón Nắng Sớm Tinh Khôi',
    windEfficiency: 'Gió sớm đối lưu nhẹ 2.6 m/s · Độ ẩm cân bằng 52% RH',
    shadingDesc: 'Cửa cối bản lề mộng gỗ mở 180 độ đón ánh bình minh dịu nhẹ, kích hoạt hương thơm nhựa gỗ Gội cổ thụ.',
    woodAcoustic: 'Âm thanh chim muông quanh vườn cây cổ thụ cộng hưởng trong lòng đình tạo cảm giác an nhiên.',
  },
  {
    degree: 180,
    label: 'Hướng Bắc: Ngăn Gió Chướng & Bụi',
    windEfficiency: 'Cản 92% gió lốc mùa khô · Duy trì vi khí hậu ổn định',
    shadingDesc: 'Cánh cửa cối khép nghiêng 45 độ hướng Bắc tạo buồng đệm áp suất âm, giữ ấm không gian vào đêm muộn.',
    woodAcoustic: 'Tiếng lá sen xào xạc ngoài hào nước vọng vào qua khe mộng nêm tạo nhịp điệu thiền trà êm dịu.',
  },
  {
    degree: 270,
    label: 'Hướng Tây: Cách Nhiệt Hoàng Hôn',
    windEfficiency: 'Hạ nhiệt bức xạ Tây -6.4°C · Lưu thông gió đối lưu',
    shadingDesc: 'Gỗ Gội nếp tỉ trọng cao kết hợp lớp đệm nước hào sen triệt tiêu hoàn toàn lượng nhiệt tích tụ buổi chiều.',
    woodAcoustic: 'Hệ mộng gỗ chốt nêm âm dương co giãn vi mô theo nhiệt độ mà không phát ra tiếng cọt kẹt kim loại.',
  },
]

export function SaigonCanalSideAncientHingedGoiMoatPavilion() {
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [audioFeedback, setAudioFeedback] = useState<string | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const activeAngle = PAVILION_ANGLES[currentAngleIndex] ?? PAVILION_ANGLES[0]!

  const playSolfeggioTone = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        audioCtxRef.current = new AudioContextClass()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') {
        void ctx.resume()
      }

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(528, ctx.currentTime)

      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.8)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 4.5)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 4.6)

      setIsPlayingAudio(true)
      setAudioFeedback('Tần số 528Hz Solfeggio đang ngân vang · Thanh lọc tâm trí & vi khí hậu thủy đình')

      setTimeout(() => {
        setIsPlayingAudio(false)
        setAudioFeedback(null)
      }, 4600)
    } catch {
      setAudioFeedback('Trình duyệt chưa hỗ trợ Web Audio')
      setTimeout(() => setAudioFeedback(null), 3000)
    }
  }

  const rotateNext = () => {
    setCurrentAngleIndex((prev) => (prev + 1) % PAVILION_ANGLES.length)
  }

  return (
    <section className="relative overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-amber-900/40 selection:text-amber-200">
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-widest text-amber-300 uppercase">
            Kiến Trúc Thủy Tạ Vi Khí Hậu Sài Gòn
          </span>
          <h2 className="mt-4 text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl">
            Thủy Đình Gỗ Gội Nếp 180 Năm & Cửa Cối Hào Sen Bách Diệp
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-stone-400 sm:text-lg">
            Sự kết hợp kỳ công giữa gỗ Gội nếp Tây Bắc bách niên, hệ cửa cối mộng nêm âm dương 4 cánh đóng mở tự do
            và hào nước sen Bách Diệp Sài Gòn giúp hạ nhiệt tự nhiên -6.1°C giữa trưa hè nhiệt đới.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent z-10" />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <motion.div
                  animate={{ rotate: activeAngle.degree }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex h-64 w-64 items-center justify-center rounded-full border border-amber-500/40 bg-stone-950/80 p-4 shadow-inner"
                >
                  <div className="absolute inset-2 rounded-full border border-dashed border-stone-700 opacity-60" />
                  <div className="text-center z-20">
                    <p className="text-xs uppercase tracking-wider text-amber-400 font-mono">Bệ Xoay Cổ Thụ</p>
                    <p className="mt-1 text-base font-medium text-stone-200">Du Vỏ Nứt 195 Năm</p>
                    <p className="mt-0.5 text-xs text-stone-400">{activeAngle.degree}° Góc Mở Cửa Cối</p>
                  </div>

                  <div className="absolute top-2 h-4 w-1 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                  <div className="absolute right-2 h-1 w-4 rounded-full bg-stone-600" />
                  <div className="absolute bottom-2 h-4 w-1 rounded-full bg-stone-600" />
                  <div className="absolute left-2 h-1 w-4 rounded-full bg-stone-600" />
                </motion.div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={rotateNext}
                    className="flex items-center gap-2 rounded-lg border border-amber-500/40 bg-stone-950/80 px-4 py-2 text-xs font-medium text-amber-300 backdrop-blur transition hover:border-amber-400 hover:bg-stone-900"
                  >
                    <span>Xoay Bệ Bonsai 360°</span>
                  </button>

                  <button
                    onClick={playSolfeggioTone}
                    disabled={isPlayingAudio}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium backdrop-blur transition',
                      isPlayingAudio
                        ? 'border-emerald-500/50 bg-emerald-950/50 text-emerald-300'
                        : 'border-stone-700 bg-stone-950/80 text-stone-300 hover:border-amber-500/40 hover:text-amber-300'
                    )}
                  >
                    <span>{isPlayingAudio ? 'Đang Ngân Vang 528Hz' : 'Âm Học Solfeggio 528Hz'}</span>
                  </button>
                </div>

                <span className="text-xs font-mono text-stone-400">
                  Nhiệt độ hạ: <strong className="text-emerald-400 font-semibold">-6.1°C</strong>
                </span>
              </div>
            </div>

            <AnimatePresence>
              {audioFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="mt-3 rounded-lg border border-emerald-500/30 bg-emerald-950/30 px-4 py-2 text-center text-xs text-emerald-300"
                >
                  {audioFeedback}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-6 backdrop-blur">
              <p className="text-xs font-mono tracking-wider text-amber-400 uppercase">Trạng Thái Vi Khí Hậu Tương Tác</p>
              <h3 className="mt-2 text-xl font-medium text-stone-100">{activeAngle.label}</h3>

              <div className="mt-6 space-y-4">
                <div className="border-l-2 border-amber-500/60 pl-4">
                  <p className="text-xs font-medium text-amber-400">Khí động học đối lưu</p>
                  <p className="mt-1 text-sm text-stone-300">{activeAngle.windEfficiency}</p>
                </div>

                <div className="border-l-2 border-stone-700 pl-4">
                  <p className="text-xs font-medium text-stone-400">Cơ chế che nắng & che bức xạ</p>
                  <p className="mt-1 text-sm text-stone-300">{activeAngle.shadingDesc}</p>
                </div>

                <div className="border-l-2 border-stone-700 pl-4">
                  <p className="text-xs font-medium text-stone-400">Âm học gỗ Gội nếp bách niên</p>
                  <p className="mt-1 text-sm text-stone-300">{activeAngle.woodAcoustic}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                <p className="text-xs text-stone-400">Gỗ Gội Nếp Cổ Thụ</p>
                <p className="mt-1 text-lg font-light text-amber-300">180 Năm Tuổi</p>
                <p className="mt-0.5 text-xs text-stone-500">Tây Bắc · Kháng ẩm 85% RH</p>
              </div>

              <div className="rounded-xl border border-stone-800 bg-stone-900/40 p-4">
                <p className="text-xs text-stone-400">Độ Ẩm Tự Nhiên</p>
                <p className="mt-1 text-lg font-light text-emerald-400">50% - 55% RH</p>
                <p className="mt-0.5 text-xs text-stone-500">Hào sen Bách Diệp</p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-900/30 bg-amber-950/10 p-4 text-xs text-stone-400">
              <strong className="text-amber-300">Quy chuẩn mộc thủ công GuHomes:</strong> Toàn bộ cấu kiện Thủy Đình được gia công tại xưởng may đo Thạnh Xuân 1.200m², lắp ráp hoàn toàn bằng mộng cối chốt nêm cổ truyền không dùng đinh kim loại.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
