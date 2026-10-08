'use client'

import React, { useState, useEffect, useRef } from 'react'

interface RainIntensityPreset {
  id: string
  name: string
  rainfallMmPerHour: number
  acousticDba: number
  coolingDeltaC: number
  description: string
  basinAcousticMode: string
  frequencyHz: number
}

const RAIN_PRESETS: RainIntensityPreset[] = [
  {
    id: 'monsoon-drizzle',
    name: 'Mưa Phùn Đầu Mùa',
    rainfallMmPerHour: 3.5,
    acousticDba: 38,
    coolingDeltaC: -2.4,
    description: 'Từng giọt thanh mảnh rót qua xích đồng đỏ Kusari-doi 18 mắt, tiếp xúc hồ cuội bazan tạo thanh âm êm dịu như tiếng thở của vườn cây.',
    basinAcousticMode: 'Thanh âm vi mô (Micro-resonance)',
    frequencyHz: 320,
  },
  {
    id: 'tropical-shower',
    name: 'Mưa Rào Nhiệt Đới Sài Gòn',
    rainfallMmPerHour: 28.0,
    acousticDba: 46,
    coolingDeltaC: -4.2,
    description: 'Dòng nước tuần hoàn qua 9 thớt đá bazan nguyên khối xẻ rãnh tiêu âm, triệt tiêu xung áp lực nước, giữ độ ồn nội thất dưới 48 dBA chuẩn Quiet Luxury.',
    basinAcousticMode: 'Tiêu âm phân tầng 9 thớt đá bazan',
    frequencyHz: 210,
  },
  {
    id: 'equatorial-storm',
    name: 'Vũ Lượng Giông Lốc Tháng Mười',
    rainfallMmPerHour: 65.0,
    acousticDba: 52,
    coolingDeltaC: -5.8,
    description: 'Hệ phễu tràn đồng thau mộc và bể lắng ngầm 3.2m3 hấp thụ xung lực nước xối xả, hạ nhiệt độ vi khí hậu sân trong tức thì tới 5.8 độ C.',
    basinAcousticMode: 'Hấp thụ bọt khí & Lắng ngầm tự lưu',
    frequencyHz: 140,
  },
]

export function SaigonMonsoonRainChamberHydroAcousticPavilion() {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(1)
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)
  const [waterFlowRateLiters, setWaterFlowRateLiters] = useState<number>(12)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const activePreset = RAIN_PRESETS[selectedPresetIndex] ?? RAIN_PRESETS[0]!

  const startWaterSound = () => {
    if (typeof window === 'undefined') return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx()
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }

      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
          oscillatorRef.current.disconnect()
        } catch {
          // Ignore if already stopped
        }
      }

      const osc = audioContextRef.current.createOscillator()
      const gain = audioContextRef.current.createGain()
      const filter = audioContextRef.current.createBiquadFilter()

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(activePreset.frequencyHz * 2.5, audioContextRef.current.currentTime)
      filter.Q.setValueAtTime(2.0, audioContextRef.current.currentTime)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(activePreset.frequencyHz, audioContextRef.current.currentTime)

      gain.gain.setValueAtTime(0.001, audioContextRef.current.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.08, audioContextRef.current.currentTime + 0.3)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioContextRef.current.destination)

      osc.start()
      oscillatorRef.current = osc
      gainNodeRef.current = gain
      setIsPlayingAudio(true)
    } catch {
      // Audio fallback gracefully handled
    }
  }

  const stopWaterSound = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.3)
        setTimeout(() => {
          if (oscillatorRef.current) {
            try {
              oscillatorRef.current.stop()
              oscillatorRef.current.disconnect()
            } catch {
              // Ignore
            }
            oscillatorRef.current = null
          }
          setIsPlayingAudio(false)
        }, 300)
      } catch {
        setIsPlayingAudio(false)
      }
    } else {
      setIsPlayingAudio(false)
    }
  }

  useEffect(() => {
    if (isPlayingAudio) {
      startWaterSound()
    }
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop()
        } catch {
          // Cleanup
        }
      }
    }
  }, [selectedPresetIndex])

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(40,116,166,0.3),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Kiến Trúc Thủy Đạo & Tiêu Âm Mưa Nhiệt Đới
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Thủy Đình Tiêu Âm Đón Mưa Sài Gòn
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Nơi chuyển hóa lượng mưa xối xả 65mm/h của mùa mưa phương Nam thành bản giao hưởng nước êm ái 48 dBA.
            Kết hợp chuỗi phễu đồng đỏ mộc Kusari-doi, 9 tầng thớt đá bazan tiêu âm và đệm sỏi cuội đen hấp thụ bọt khí.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {RAIN_PRESETS.map((preset, idx) => {
            const isSelected = idx === selectedPresetIndex
            return (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetIndex(idx)}
                className={`p-5 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-cyan-700/80 shadow-lg shadow-cyan-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-400 font-medium">PRESET 0{idx + 1}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                      {preset.rainfallMmPerHour} mm/h
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-stone-100 mb-2">{preset.name}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-3">{preset.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Âm lượng phòng:</span>
                  <span className={`font-semibold ${isSelected ? 'text-cyan-300' : 'text-stone-300'}`}>
                    {preset.acousticDba} dBA
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Interactive Simulation Dashboard */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Basin Representation */}
            <div className="lg:col-span-6 bg-stone-950 border border-stone-800/90 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span>MÔ THỰC ĐỊA: BỂ BAZAN 9 TẦNG</span>
                <span className="text-cyan-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  ĐỘ ẨM KHÍ QUYỂN: 82%
                </span>
              </div>

              {/* Graphic Water Cascade Representation */}
              <div className="my-6 relative flex flex-col items-center justify-center py-6">
                <div className="w-32 h-2 rounded bg-amber-700/80 mb-2 shadow-sm" />
                <div className="flex flex-col items-center gap-1.5">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-3 rounded-full bg-cyan-400/70 animate-pulse"
                      style={{
                        animationDuration: `${0.8 - selectedPresetIndex * 0.2}s`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>

                {/* 3 Stepped Basalt Slabs */}
                <div className="w-48 h-3 bg-stone-700 rounded-sm mt-3 relative flex justify-center">
                  <div className="w-36 h-2 bg-stone-800 rounded-sm mt-3 flex justify-center">
                    <div className="w-24 h-2 bg-stone-900 rounded-sm mt-2" />
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <span className="text-xs font-mono text-cyan-300 uppercase tracking-widest block mb-1">
                    Cơ Chế Tiêu Âm Độc Quyền
                  </span>
                  <span className="text-sm text-stone-300 font-light">{activePreset.basinAcousticMode}</span>
                </div>
              </div>

              {/* Audio Playback Trigger */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-800/80">
                <div className="flex items-center gap-2">
                  <button
                    onClick={isPlayingAudio ? stopWaterSound : startWaterSound}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-medium text-xs font-mono transition-colors min-h-[44px]"
                  >
                    {isPlayingAudio ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                        DỪNG THỦY ÂM
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        LẮNG NGHE THỦY ÂM 432Hz
                      </>
                    )}
                  </button>
                  <span className="text-xs text-stone-500 font-mono hidden sm:inline">Web Audio API 0-byte</span>
                </div>

                <div className="text-right font-mono text-xs text-cyan-400">
                  {isPlayingAudio ? 'ĐANG PHÁT THANH ÂM' : 'SẴN SÀNG KHỞI TẠO'}
                </div>
              </div>
            </div>

            {/* Metrics & Custom Flow Rate Slider */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-lg font-serif text-stone-100 mb-1">Thông Số Thủy Động Học & Vi Khí Hậu</h4>
                <p className="text-xs text-stone-400">
                  Đo lường thời gian thực dựa trên vũ lượng mưa tại bán đảo Thủ Thiêm và Thảo Điền.
                </p>
              </div>

              {/* Metric Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block mb-1">MỨC GIẢM NHIỆT KHÔNG GIAN</span>
                  <span className="text-2xl font-mono text-cyan-300 font-light">{activePreset.coolingDeltaC} °C</span>
                  <span className="text-[11px] text-stone-500 block mt-1">Làm mát tự nhiên sân trong</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block mb-1">TIÊU ÂM BỨC XẠ TIẾNG MƯA</span>
                  <span className="text-2xl font-mono text-emerald-300 font-light">
                    {activePreset.acousticDba} <span className="text-sm">dBA</span>
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-1">Đạt ngưỡng phòng ngủ cao cấp</span>
                </div>
              </div>

              {/* Custom Flow Slider */}
              <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label htmlFor="flow-rate-slider" className="text-stone-300 font-medium">LƯU LƯỢNG NƯỚC TUẦN HOÀN BỂ</label>
                  <span className="text-cyan-400 font-semibold">{waterFlowRateLiters} Lít/phút</span>
                </div>
                <input
                  id="flow-rate-slider"
                  type="range"
                  min="4"
                  max="35"
                  step="1"
                  value={waterFlowRateLiters}
                  onChange={(e) => setWaterFlowRateLiters(parseInt(e.target.value, 10))}
                  className="w-full accent-cyan-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>4L (Dòng róc rách)</span>
                  <span>18L (Cân bằng vi khí hậu)</span>
                  <span>35L (Thác nước tuần hoàn)</span>
                </div>
              </div>

              {/* Architectural Detail Callout */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed font-sans">
                <strong className="text-amber-300 block mb-1 font-mono uppercase text-[11px] tracking-wider">
                  Quy Chuẩn Chế Tác GuHomes:
                </strong>
                Hệ xích đồng đúc nguyên khối được gia công mộc tại Xưởng Thạnh Xuân 1.200m2. 
                Bề mặt đá bazan núi lửa Đắk Nông giữ thô tự nhiên, không phủ keo bóng, thở tự do cùng độ ẩm 75% đến 80% đặc trưng của Sài Gòn.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Contact Direct Line */}
        <div className="text-center text-xs font-mono text-stone-400">
          <span>TƯ VẤN THIẾT KẾ THỦY ĐẠO MAY ĐO: </span>
          <a
            href="tel:0368757916"
            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 ml-1 font-semibold"
          >
            0368 757 916
          </a>
          <span className="mx-2 text-stone-600">·</span>
          <span>KTS TRƯỞNG GUHOMES (TRẦN 12 CÔNG TRÌNH/NĂM)</span>
        </div>
      </div>
    </section>
  )
}
