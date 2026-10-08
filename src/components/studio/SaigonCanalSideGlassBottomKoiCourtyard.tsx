'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CrossSectionMode {
  id: string
  name: string
  perspective: string
  description: string
  lightingK: string
  visualAccent: string
}

const CROSS_SECTION_MODES: CrossSectionMode[] = [
  {
    id: 'courtyard_surface',
    name: 'Tầng Mặt Hồ Sân Trong',
    perspective: 'Góc nhìn ngoài trời ngắm đàn cá Koi Kohaku & Showa bơi lội bên thác nước bậc thang',
    description: 'Bờ hồ viền đá hoa cương Gia Lai mài nhám chống trơn trượt, rãnh đón gió sông Sài Gòn luân chuyển hơi ẩm tạo làn gió mát rượi 25.5°C.',
    lightingK: '4000K Ánh Dương Tự Nhiên',
    visualAccent: 'from-sky-950/60 to-emerald-950/40'
  },
  {
    id: 'wine_cellar_underground',
    name: 'Góc Nhìn Ngửa Hầm Rượu Ngầm',
    perspective: 'Chiêm ngưỡng đáy hồ cá xuyên thấu qua hệ kính cường lực 3 lớp 38mm Low-E',
    description: 'Những tia nắng tán xạ lung linh qua mặt nước lấp lánh phản chiếu lên những vách ủ rượu gỗ Sồi Pháp, mang lại trải nghiệm thị giác tĩnh tại tuyệt đỉnh.',
    lightingK: '2200K Hổ Phách Cổ Điển',
    visualAccent: 'from-amber-950/60 to-stone-950/80'
  }
]

const WATER_MICROCLIMATE_METRICS = [
  { label: 'Nhiệt độ nước', value: '24.5°C', status: 'Lý tưởng cho Koi Nhật Bản', icon: 'temp' },
  { label: 'Hạ nhiệt không gian', value: '-4.6°C', status: 'Đối lưu vi khí hậu sông', icon: 'cool' },
  { label: 'Oxy hòa tan (DO)', value: '8.5 mg/L', status: 'Bakki Shower than gáo dừa', icon: 'oxygen' },
  { label: 'Độ trong quang học', value: '99.8%', status: 'Drum Filter 50 micron', icon: 'clarity' },
  { label: 'Lưu lượng tuần hoàn', value: '120 m³/h', status: 'Bơm chìm từ tính êm dịu', icon: 'flow' },
  { label: 'Hấp thụ ẩm nồm', value: '92.4%', status: 'Hệ thống rãnh gió âm sàn', icon: 'humidity' }
]

export function SaigonCanalSideGlassBottomKoiCourtyard({ className = '' }: { className?: string }) {
  const [activeModeIndex, setActiveModeIndex] = useState<number>(0)
  const [isWaterAudioActive, setIsWaterAudioActive] = useState<boolean>(false)
  const [fishCount] = useState<number>(12)
  const [waterFlowSpeed, setWaterFlowSpeed] = useState<number>(65)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const whiteNoiseNodeRef = useRef<AudioNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  useEffect(() => {
    return () => {
      stopWaterSound()
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const getAudioContext = (): AudioContext => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return audioCtxRef.current
  }

  // Tổng hợp âm thanh tiếng suối chảy róc rách và nước vỗ mạn kính (Filtered Pink/Brown Noise)
  const startWaterSound = () => {
    try {
      const ctx = getAudioContext()
      const now = ctx.currentTime

      const bufferSize = ctx.sampleRate * 2
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0

      // Pink noise algorithm
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05
        b6 = white * 0.115926
      }

      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      // Lọc dải âm nước chảy qua bậc đá thác nước (350Hz - 1200Hz)
      const bandpass = ctx.createBiquadFilter()
      bandpass.type = 'bandpass'
      bandpass.frequency.setValueAtTime(650, now)
      bandpass.Q.setValueAtTime(1.5, now)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, now)
      gain.gain.exponentialRampToValueAtTime(0.18, now + 1.2)

      whiteNoise.connect(bandpass)
      bandpass.connect(gain)
      gain.connect(ctx.destination)

      whiteNoise.start(now)
      whiteNoiseNodeRef.current = whiteNoise
      gainNodeRef.current = gain
      setIsWaterAudioActive(true)
    } catch {
      setIsWaterAudioActive(false)
    }
  }

  const stopWaterSound = () => {
    try {
      if (gainNodeRef.current && audioCtxRef.current) {
        const now = audioCtxRef.current.currentTime
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)
        setTimeout(() => {
          if (whiteNoiseNodeRef.current) {
            (whiteNoiseNodeRef.current as AudioBufferSourceNode).stop()
            whiteNoiseNodeRef.current.disconnect()
            whiteNoiseNodeRef.current = null
          }
          setIsWaterAudioActive(false)
        }, 550)
      } else {
        setIsWaterAudioActive(false)
      }
    } catch {
      setIsWaterAudioActive(false)
    }
  }

  const toggleWaterAudio = () => {
    if (isWaterAudioActive) {
      stopWaterSound()
    } else {
      startWaterSound()
    }
  }

  // Âm thanh cá Koi quẫy nước nhẹ (Water Splash)
  const triggerKoiPlopSound = () => {
    try {
      const ctx = getAudioContext()
      const now = ctx.currentTime
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.28)

      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + 0.3)
    } catch {
      // Audio fallback
    }
  }

  const currentMode = (CROSS_SECTION_MODES[activeModeIndex] ?? CROSS_SECTION_MODES[0]) as CrossSectionMode

  return (
    <section className={cn("relative w-full py-16 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden font-sans", className)}>
      {/* Background ánh sáng gợn sóng nước vi khí hậu */}
      <div 
        className={cn(
          'absolute inset-0 opacity-25 pointer-events-none transition-all duration-1000 bg-gradient-to-b',
          currentMode.visualAccent
        )}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header danh mục Quiet Luxury */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 text-xs tracking-widest uppercase mb-4">
            <span>GuHomes Bespoke Courtyard 2026</span>
            <span className="w-1 h-1 rounded-full bg-emerald-400" />
            <span>Thủy Cảnh Vi Khí Hậu Sài Gòn</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-light text-stone-100 tracking-tight leading-snug">
            Sân Trong Hồ Cá Koi Đáy Kính Xuyên Tầng
          </h2>
          <p className="mt-3 text-stone-400 max-w-2xl mx-auto text-sm md:text-base font-light leading-relaxed">
            Kiến trúc thủy cảnh xuyên tầng độc bản với đáy kính 3 lớp 38mm Low-E soi rọi hầm rượu ngầm. Thác nước bậc thang đá hoa cương Gia Lai tuần hoàn 120m³/h hạ nhiệt vi khí hậu 4.6°C đón gió sông Nam Bộ.
          </p>
        </div>

        {/* Khung chuyển đổi góc nhìn mặt cắt */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-stone-900 border border-stone-800 rounded-xl">
            {CROSS_SECTION_MODES.map((mode, idx) => {
              const isSelected = idx === activeModeIndex
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveModeIndex(idx)}
                  className={cn(
                    'px-5 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300',
                    isSelected 
                      ? 'bg-emerald-700/80 text-emerald-100 shadow-lg' 
                      : 'text-stone-400 hover:text-stone-200'
                  )}
                >
                  {mode.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Khung hiển thị mô phỏng trực quan */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
          {/* Cột trái: Mô phỏng thủy cảnh & Tương tác âm thanh (7 cột) */}
          <div className="lg:col-span-7 bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg text-emerald-200">{currentMode.name}</h3>
                <p className="text-xs text-stone-400">{currentMode.perspective}</p>
              </div>

              {/* Nút bật tắt âm thanh suối thác */}
              <button
                onClick={toggleWaterAudio}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 border transition-all',
                  isWaterAudioActive
                    ? 'bg-emerald-600/90 text-white border-emerald-400 shadow-md animate-pulse'
                    : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                )}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{isWaterAudioActive ? 'Dòng Chảy 30dB (Đang Phát)' : 'Bật Tiếng Nước'}</span>
              </button>
            </div>

            {/* Khung trực quan mô phỏng nước và đàn cá Koi */}
            <div className="relative h-64 sm:h-72 w-full rounded-xl border border-stone-800 bg-stone-950 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
              {/* Hiệu ứng gợn sóng nước chuyển động */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/20 via-sky-600/10 to-transparent animate-pulse"
                style={{ animationDuration: '4s' }}
              />

              {/* Thông tin hiển thị nổi */}
              <div className="relative z-10 flex justify-between items-start text-xs font-mono">
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                  Kính Cường Lực 3 Lớp 38mm
                </span>
                <span className="px-2 py-0.5 rounded bg-stone-900/80 border border-stone-700 text-stone-300">
                  {currentMode.lightingK}
                </span>
              </div>

              {/* Đàn cá Koi bơi lội tương tác */}
              <div className="relative z-10 flex items-center justify-center gap-6 my-auto">
                <div 
                  onClick={triggerKoiPlopSound}
                  className="cursor-pointer group flex flex-col items-center"
                >
                  <div className="w-16 h-8 rounded-full bg-gradient-to-r from-red-600 via-white to-red-600 border border-white/30 shadow-lg transform transition-transform group-hover:scale-110 flex items-center justify-center">
                    <span className="text-[10px] text-stone-900 font-bold tracking-tighter">Kohaku</span>
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1.5 group-hover:text-amber-300 transition-colors">
                    Chạm: Quẫy Nước
                  </span>
                </div>

                <div 
                  onClick={triggerKoiPlopSound}
                  className="cursor-pointer group flex flex-col items-center"
                >
                  <div className="w-16 h-8 rounded-full bg-gradient-to-r from-amber-600 via-stone-900 to-amber-500 border border-amber-500/40 shadow-lg transform transition-transform group-hover:scale-110 flex items-center justify-center">
                    <span className="text-[10px] text-amber-200 font-bold tracking-tighter">Showa</span>
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1.5 group-hover:text-amber-300 transition-colors">
                    Chạm: Đớp Mồi
                  </span>
                </div>

                <div 
                  onClick={triggerKoiPlopSound}
                  className="cursor-pointer group flex flex-col items-center"
                >
                  <div className="w-16 h-8 rounded-full bg-gradient-to-r from-stone-100 via-amber-200 to-yellow-400 border border-yellow-300/40 shadow-lg transform transition-transform group-hover:scale-110 flex items-center justify-center">
                    <span className="text-[10px] text-stone-900 font-bold tracking-tighter">Yamabuki</span>
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1.5 group-hover:text-amber-300 transition-colors">
                    Chạm: Lặn Sâu
                  </span>
                </div>
              </div>

              {/* Chi tiết vật liệu đáy hồ */}
              <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-800/80 pt-2">
                <span>Tuần hoàn sinh học: {waterFlowSpeed}% lưu lượng</span>
                <span>Đàn Koi ngự tuyển: {fishCount} cá thể</span>
              </div>
            </div>

            {/* Thanh điều chỉnh lưu lượng nước thác đổ */}
            <div className="mt-4 p-3 bg-stone-950/60 border border-stone-800 rounded-xl flex items-center gap-4">
              <span className="text-xs text-stone-400 whitespace-nowrap">Lưu lượng thác:</span>
              <input
                type="range"
                min="30"
                max="100"
                value={waterFlowSpeed}
                onChange={(e) => setWaterFlowSpeed(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <span className="text-xs font-mono text-emerald-400 font-medium whitespace-nowrap">
                {Math.round((waterFlowSpeed / 100) * 120)} m³/h
              </span>
            </div>

            <p className="mt-3 text-xs text-stone-300 font-light leading-relaxed">
              {currentMode.description}
            </p>
          </div>

          {/* Cột phải: Bộ Chỉ Số Vi Khí Hậu & Kỹ Thuật (5 cột) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-stone-900/60 border border-stone-800/80 rounded-2xl p-6 backdrop-blur-md">
              <h3 className="font-serif text-base text-emerald-200 mb-1">Bộ Chỉ Số Vi Khí Hậu & Thủy Sinh</h3>
              <p className="text-xs text-stone-400 mb-4">Cân bằng sinh thái tự nhiên giảm 4.6°C nhiệt độ đô thị</p>

              <div className="grid grid-cols-2 gap-2.5">
                {WATER_MICROCLIMATE_METRICS.map((metric, idx) => (
                  <div key={idx} className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl">
                    <div className="text-[11px] text-stone-400">{metric.label}</div>
                    <div className="text-base font-mono font-medium text-emerald-300 mt-0.5">{metric.value}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{metric.status}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Khung chứng nhận Quiet Luxury */}
            <div className="bg-gradient-to-br from-stone-900/90 to-stone-950 border border-emerald-500/20 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full border border-emerald-500/30 bg-emerald-950/40 flex items-center justify-center text-emerald-300 font-serif font-bold">
                  G
                </div>
                <div>
                  <h4 className="font-serif text-stone-100 text-sm">GuHomes Courtyard Studio</h4>
                  <div className="text-[11px] text-emerald-400/80">Kỹ Thuật Kính Xuyên Tầng & Thủy Sinh Nam Bộ</div>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed font-light mb-3">
                Tất cả tấm kính đáy hồ đều sử dụng kính dán nhiều lớp Saint-Gobain tôi nhiệt chịu tải 1.800 kg/m², thi công khép kín bởi kỹ sư GuHomes với trần tối đa 12 công trình/năm.
              </p>

              <div className="pt-2 border-t border-stone-800 text-xs text-stone-400 font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span>Hotline Trưởng Nhóm:</span>
                  <a href="tel:0368757916" className="text-emerald-300 hover:underline">0368 757 916</a>
                </div>
                <div className="flex justify-between">
                  <span>Email Kỹ Thuật:</span>
                  <a href="mailto:guhomesvn@gmail.com" className="text-emerald-300 hover:underline">guhomesvn@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
