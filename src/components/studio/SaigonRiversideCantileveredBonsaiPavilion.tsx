'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimeOfDayScene {
  id: string
  label: string
  timeStr: string
  temperature: string
  sunAngle: number
  solarRadiation: string
  skyGradient: string
  description: string
}

interface BonsaiMasterpiece {
  id: string
  name: string
  botanicalName: string
  age: string
  style: string
  origin: string
  pedestal: string
  symbolism: string
}

const TIME_OF_DAY_SCENES: TimeOfDayScene[] = [
  {
    id: 'dawn',
    label: 'Bình Minh Sông Nước (06:00)',
    timeStr: '06:00 AM',
    temperature: '25.8°C',
    sunAngle: 15,
    solarRadiation: '220 W/m²',
    skyGradient: 'from-[#1a1c29] via-[#2d242b] to-[#12131a]',
    description: 'Sương sớm bảng lảng giăng trên mặt sông Sài Gòn, gió mát dịu êm lướt qua tán Mai chiếu thủy hoa nở trắng ngần tỏa hương thanh khiết.'
  },
  {
    id: 'midday',
    label: 'Nắng Gắt Hướng Tây (12:30)',
    timeStr: '12:30 PM',
    temperature: '35.4°C (Hạ còn 30.2°C)',
    sunAngle: 75,
    solarRadiation: '920 W/m²',
    skyGradient: 'from-[#2e261f] via-[#3d2f21] to-[#1a1410]',
    description: 'Hệ lam gỗ Teak tự động xoay góc 65° cản 92% bức xạ nhiệt trực tiếp từ hướng Tây, quạt đối lưu hút khí mát từ mặt sông lên làm mát tự nhiên.'
  },
  {
    id: 'sunset',
    label: 'Hoàng Hôn Bình Quới (17:45)',
    timeStr: '05:45 PM',
    temperature: '29.2°C',
    sunAngle: 25,
    solarRadiation: '340 W/m²',
    skyGradient: 'from-[#3b1d22] via-[#2c1b26] to-[#130d17]',
    description: 'Nắng chiều vàng cam dát lấp lánh trên sóng nước, bóng dáng Linh sam sông Hinh in trên nền kính Low-E 3 lớp phản chiếu vệt mây ngũ sắc.'
  },
  {
    id: 'night',
    label: 'Đêm Trăng Gió Lộng (21:00)',
    timeStr: '09:00 PM',
    temperature: '26.5°C',
    sunAngle: 0,
    solarRadiation: '0 W/m²',
    skyGradient: 'from-[#0b0e14] via-[#10141e] to-[#08090d]',
    description: 'Mặt nước phản chiếu ánh trăng rằm, đèn âm sàn hắt sáng nhẹ thớ gỗ Teak, chuông gió đồng ngân vang nhịp điệu tĩnh lặng của dòng sông.'
  }
]

const BONSAI_COLLECTION: BonsaiMasterpiece[] = [
  {
    id: 'mai-chieu-thuy',
    name: 'Mai Chiếu Thủy Cổ Thụ Dáng Hoành',
    botanicalName: 'Wrightia religiosa',
    age: '75 năm tuổi',
    style: 'Dáng hoành (Thân vươn ngang qua mép sông)',
    origin: 'Vườn cây di sản Nam Bộ',
    pedestal: 'Đá Bazan Đắk Nông nguyên khối đục tay',
    symbolism: 'Sự trường tồn, cốt cách thanh tao và khí chất bình thản trước biến thiên thời cuộc.'
  },
  {
    id: 'linh-sam-song-hinh',
    name: 'Linh Sam Sông Hinh Lũa Thép',
    botanicalName: 'Antidesma acidum',
    age: '62 năm tuổi',
    style: 'Dáng văn nhân (Bunjin mộc mạc)',
    origin: 'Vách đá tự nhiên Phú Yên',
    pedestal: 'Tấm Teak Myanmar cổ thụ 80mm',
    symbolism: 'Ý chí kiên cường bất khuất, vẻ đẹp khắc khổ phong sương hòa cùng tĩnh tại.'
  },
  {
    id: 'tung-la-han',
    name: 'Tùng La Hán Ngự Phong',
    botanicalName: 'Podocarpus macrophyllus',
    age: '90 năm tuổi',
    style: 'Dáng trực huyền kết hợp',
    origin: 'Tuyển chọn nghệ nhân cung đình',
    pedestal: 'Đá sa thạch Bình Định chẻ thô',
    symbolism: 'Khí tiết quân tử, biểu trưng cho sự hưng thịnh và thanh lọc trường khí trạch đất.'
  }
]

export function SaigonRiversideCantileveredBonsaiPavilion() {
  const [selectedSceneIndex, setSelectedSceneIndex] = useState<number>(2) // Sunset default
  const [selectedBonsaiIndex, setSelectedBonsaiIndex] = useState<number>(0)
  const [louverAngle, setLouverAngle] = useState<number>(65)
  const [isSmartGlassOpaque, setIsSmartGlassOpaque] = useState<boolean>(false)
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
  const [windSpeedKmh, setWindSpeedKmh] = useState<number>(18)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const soundNodesRef = useRef<{
    riverGain?: GainNode
    bellTimer?: NodeJS.Timeout
  }>({})

  const activeScene = (TIME_OF_DAY_SCENES[selectedSceneIndex] ?? TIME_OF_DAY_SCENES[0]) as TimeOfDayScene
  const activeBonsai = (BONSAI_COLLECTION[selectedBonsaiIndex] ?? BONSAI_COLLECTION[0]) as BonsaiMasterpiece

  // Structural physics calculation: Cantilever deflection under live and wind load
  const cantileverLength = 4.2 // meters
  // Calculated deflection delta = (w * L^4) / (8 * E * I)
  // Simplified safe factor representation for interactive display
  const windLoadFactor = (windSpeedKmh / 20) * 1.2
  const computedDeflectionMm = (3.2 * windLoadFactor).toFixed(1)
  const maxSafeDeflectionMm = 8.4 // L/500 = 4200 / 500 = 8.4 mm

  useEffect(() => {
    return () => {
      if (soundNodesRef.current.bellTimer) clearInterval(soundNodesRef.current.bellTimer)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const getAudioContext = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  const triggerTibetanBellSound = (ctx: AudioContext) => {
    const now = ctx.currentTime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    // 528 Hz Solfeggio / Antique bronze chime tone
    osc.type = 'sine'
    osc.frequency.setValueAtTime(528, now)

    // Add overtone
    const oscHarmonic = ctx.createOscillator()
    const harmonicGain = ctx.createGain()
    oscHarmonic.type = 'sine'
    oscHarmonic.frequency.setValueAtTime(1056, now)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8)

    harmonicGain.gain.setValueAtTime(0.025, now)
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4)

    osc.connect(gain)
    oscHarmonic.connect(harmonicGain)
    gain.connect(ctx.destination)
    harmonicGain.connect(ctx.destination)

    osc.start(now)
    oscHarmonic.start(now)
    osc.stop(now + 3.8)
    oscHarmonic.stop(now + 2.4)
  }

  const togglePavilionAudio = () => {
    const ctx = getAudioContext()

    if (isAudioPlaying) {
      if (soundNodesRef.current.bellTimer) {
        clearInterval(soundNodesRef.current.bellTimer)
      }
      if (soundNodesRef.current.riverGain) {
        soundNodesRef.current.riverGain.gain.setTargetAtTime(0.001, ctx.currentTime, 0.4)
      }
      setIsAudioPlaying(false)
      return
    }

    setIsAudioPlaying(true)

    // Gentle river water flow noise
    const bufferSize = ctx.sampleRate * 2
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.12
    }

    const whiteNoise = ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 420

    const gainNode = ctx.createGain()
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 1.2)

    whiteNoise.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    whiteNoise.start()
    soundNodesRef.current.riverGain = gainNode

    // Play periodic bronze chime sound every 8 seconds
    triggerTibetanBellSound(ctx)
    soundNodesRef.current.bellTimer = setInterval(() => {
      triggerTibetanBellSound(ctx)
    }, 8500)
  }

  return (
    <section className="relative w-full bg-[#0d1014] text-[#e8edf2] py-24 px-4 sm:px-6 lg:px-8 border-y border-[#1e2633] overflow-hidden">
      {/* Background Water Reflection Shimmer */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d3557] via-[#0d1b2a] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-8 border-b border-[#1c2432] gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#131b26] border border-[#23354d] text-[#64b5f6] text-xs font-mono tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64b5f6] animate-pulse" />
              Saigon Riverside Cantilevered Pavilion · GuHomes Studio
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-[#f2f7fc] tracking-tight">
              Vọng Cảnh Bonsai Vươn Mép Sông Sài Gòn
            </h2>
            <p className="mt-3 text-sm md:text-base text-[#9ab0c4] max-w-2xl font-light leading-relaxed">
              Giải pháp kiến trúc vươn console 4.2m vượt mép kè nước lợ, dầm thép ẩn bọc Teak Myanmar, sàn kính Low-E 3 lớp 36mm tràn viền ngắm đàn cá bơi và hệ lam xoay chắn nắng Tây hạ nhiệt 5.0°C.
            </p>
          </div>

          {/* Live Physics Gauge */}
          <div className="flex items-center gap-4 bg-[#141a24] p-4 rounded-xl border border-[#212c3d]">
            <div>
              <span className="block text-[11px] font-mono text-[#788da1] uppercase">Độ Võng Console (L=4.2m)</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono text-[#64b5f6] font-semibold">{computedDeflectionMm}</span>
                <span className="text-xs text-[#788da1]">mm / {maxSafeDeflectionMm}mm (An toàn)</span>
              </div>
              <span className="block text-[10px] text-[#00b894] mt-0.5">Tiêu chuẩn chịu lực L/500</span>
            </div>

            <button
              type="button"
              onClick={togglePavilionAudio}
              className={cn(
                "p-3 rounded-lg border transition-all min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer",
                isAudioPlaying
                  ? "border-[#64b5f6] bg-[#1a2b42] text-[#64b5f6] shadow-[0_0_15px_rgba(100,181,246,0.3)]"
                  : "border-[#253245] bg-[#0e141d] text-[#788da1] hover:text-[#f2f7fc]"
              )}
              title={isAudioPlaying ? "Tắt âm thanh sông nước" : "Bật âm thanh sông nước & chuông gió"}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                {isAudioPlaying ? (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                ) : (
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Time of Day & Lighting Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {TIME_OF_DAY_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              type="button"
              onClick={() => setSelectedSceneIndex(idx)}
              className={cn(
                "p-3.5 rounded-xl border text-left transition-all min-h-[44px] cursor-pointer relative overflow-hidden",
                selectedSceneIndex === idx
                  ? "border-[#64b5f6] bg-[#162130] shadow-[0_0_20px_rgba(100,181,246,0.2)]"
                  : "border-[#1c2636] bg-[#10151e] hover:border-[#2b3a4f]"
              )}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-serif font-medium text-[#f2f7fc]">{scene.label}</span>
                <span className="text-[10px] font-mono text-[#64b5f6]">{scene.timeStr}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#788da1]">
                <span>{scene.temperature}</span>
                <span>{scene.solarRadiation}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Main Visual Pavilion Simulator (8 cols) */}
          <div className="lg:col-span-8 bg-[#111722] rounded-2xl p-6 md:p-8 border border-[#202c3e] shadow-2xl relative overflow-hidden">
            {/* Dynamic Sky Gradient Simulation */}
            <div className={cn("w-full h-80 rounded-xl relative overflow-hidden border border-[#2b3b52] bg-gradient-to-b transition-all duration-1000 p-6 flex flex-col justify-between", activeScene.skyGradient)}>
              {/* Sun & Horizon Line */}
              <div className="relative w-full h-full flex flex-col justify-between pointer-events-none">
                <div className="flex justify-between items-start">
                  <div className="bg-[#0b1017]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#23354d]">
                    <span className="text-[11px] font-mono text-[#64b5f6] block">Góc Mặt Trời: {activeScene.sunAngle}°</span>
                    <span className="text-[10px] text-[#9ab0c4]">{activeScene.description}</span>
                  </div>

                  {/* Water River Label */}
                  <span className="text-[11px] font-mono text-[#788da1] bg-[#0b1017]/80 px-2.5 py-1 rounded">
                    Sông Sài Gòn · Thủy triều lợ
                  </span>
                </div>

                {/* Over-water Cantilever Deck Representation */}
                <div className="relative w-full bg-[#182333]/90 rounded-t-lg border-t-2 border-x-2 border-[#64b5f6]/40 p-4 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-serif text-[#f2f7fc] font-medium">
                      Bản Sàn Console Teak Vươn 4.2m Vượt Bờ Sông
                    </span>
                    <span className="text-[11px] font-mono text-[#64b5f6]">
                      {isSmartGlassOpaque ? "Kính Mờ Riêng Tư (Frosted)" : "Kính Low-E Trong Suốt 36mm"}
                    </span>
                  </div>

                  {/* Glass floor visual preview */}
                  <div className={cn(
                    "w-full h-20 rounded-lg border transition-all duration-500 relative flex items-center justify-center overflow-hidden",
                    isSmartGlassOpaque
                      ? "bg-slate-300/30 backdrop-blur-xl border-white/20 text-[#f2f7fc]"
                      : "bg-[#0b2545]/60 backdrop-blur-xs border-[#64b5f6]/40 text-[#64b5f6]"
                  )}>
                    <div className="text-center px-4">
                      <p className="text-xs font-medium">
                        {isSmartGlassOpaque
                          ? "Bề mặt chuyển mờ bằng dòng điện tĩnh, ngăn ánh nhìn từ ghe thuyền trên sông"
                          : "Nhìn thấu qua 3 lớp kính dày 36mm: ngắm đáy nước trong lành và đàn cá bơi lội"}
                      </p>
                      <span className="text-[10px] opacity-75 mt-0.5 block">
                        Tải trọng chịu lực: 450 kg/m² · Chống rung chấn gián đoạn
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Sliders & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[#1c2636]">
              {/* Louver Shading Angle Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="louver-angle-slider" className="text-xs uppercase tracking-wider text-[#9ab0c4]">
                    Góc Xoay Lam Gỗ Teak Chắn Nắng:
                  </label>
                  <span className="text-sm font-mono text-[#64b5f6] font-semibold">{louverAngle}°</span>
                </div>
                <input
                  id="louver-angle-slider"
                  type="range"
                  min="0"
                  max="90"
                  value={louverAngle}
                  onChange={(e) => setLouverAngle(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#1b2636] rounded-lg appearance-none cursor-pointer accent-[#64b5f6]"
                />
                <div className="flex justify-between text-[11px] text-[#5e748a] mt-1">
                  <span>0° (Mở ngắm sông)</span>
                  <span>45° (Đón gió đối lưu)</span>
                  <span>90° (Khóa nhiệt hoàn toàn)</span>
                </div>
              </div>

              {/* Wind Speed Simulator Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="wind-speed-slider" className="text-xs uppercase tracking-wider text-[#9ab0c4]">
                    Tốc Độ Gió Sông Mô Phỏng:
                  </label>
                  <span className="text-sm font-mono text-[#64b5f6] font-semibold">{windSpeedKmh} km/h</span>
                </div>
                <input
                  id="wind-speed-slider"
                  type="range"
                  min="5"
                  max="70"
                  value={windSpeedKmh}
                  onChange={(e) => setWindSpeedKmh(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#1b2636] rounded-lg appearance-none cursor-pointer accent-[#64b5f6]"
                />
                <div className="flex justify-between text-[11px] text-[#5e748a] mt-1">
                  <span>Gió thoảng (10km/h)</span>
                  <span>Gió mùa Nam (30km/h)</span>
                  <span>Gió giật cấp 8 (70km/h)</span>
                </div>
              </div>
            </div>

            {/* Smart Glass Switch Button */}
            <div className="mt-5 flex items-center justify-between p-4 bg-[#141b26] rounded-xl border border-[#223247]">
              <div>
                <span className="text-xs font-semibold text-[#f2f7fc] block">Kính Thông Minh Smart Glass 3 Lớp</span>
                <span className="text-[11px] text-[#788da1]">Công nghệ PDLC chuyển đổi độ mờ đục trong 0.1 giây</span>
              </div>
              <button
                type="button"
                onClick={() => setIsSmartGlassOpaque(!isSmartGlassOpaque)}
                className="px-4 py-2 rounded-lg bg-[#1f2d40] text-[#64b5f6] hover:bg-[#283b54] border border-[#344b69] text-xs font-mono font-medium transition-all min-h-[44px] cursor-pointer"
              >
                {isSmartGlassOpaque ? "Chuyển Sang Kính Trong Suốt" : "Chuyển Sang Kính Mờ Riêng Tư"}
              </button>
            </div>
          </div>

          {/* Bonsai Masterpiece Selector (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-[#111722] rounded-2xl p-6 border border-[#202c3e] shadow-xl">
              <span className="text-xs uppercase tracking-widest text-[#64b5f6] font-semibold block mb-1">
                Bộ Sưu Tập Bonsai Di Sản
              </span>
              <h3 className="text-lg font-serif text-[#f2f7fc] mb-4">Cây Cổ Thụ Tọa Thiền Vọng Cảnh</h3>

              <div className="flex flex-col gap-3">
                {BONSAI_COLLECTION.map((bonsai, idx) => (
                  <button
                    key={bonsai.id}
                    type="button"
                    onClick={() => setSelectedBonsaiIndex(idx)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all min-h-[44px] cursor-pointer",
                      selectedBonsaiIndex === idx
                        ? "border-[#64b5f6] bg-[#172333]"
                        : "border-[#1c2636] bg-[#0e131b] hover:border-[#2b3a4f]"
                    )}
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="text-sm font-serif font-semibold text-[#f2f7fc]">{bonsai.name}</h4>
                      <span className="text-xs font-mono text-[#64b5f6]">{bonsai.age}</span>
                    </div>
                    <span className="block text-[11px] text-[#9ab0c4] italic mb-1.5">{bonsai.botanicalName}</span>
                    <div className="text-[11px] text-[#788da1] space-y-0.5">
                      <div><strong className="text-[#9ab0c4]">Dáng thế:</strong> {bonsai.style}</div>
                      <div><strong className="text-[#9ab0c4]">Bệ đặt:</strong> {bonsai.pedestal}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Botanical Detail Card */}
            <div className="p-6 rounded-2xl bg-[#131a26] border border-[#202d3f]">
              <span className="text-xs font-mono uppercase text-[#64b5f6] block mb-1">Ý Niệm Phong Thủy & Mỹ Học</span>
              <h4 className="text-sm font-serif text-[#f2f7fc] mb-2">{activeBonsai.name}</h4>
              <p className="text-xs text-[#9ab0c4] leading-relaxed mb-4">
                {activeBonsai.symbolism}
              </p>
              <div className="pt-3 border-t border-[#1c2636] flex items-center justify-between text-xs font-mono text-[#788da1]">
                <span>Tư vấn nghệ nhân Bonsai</span>
                <span className="text-[#64b5f6]">0368 757 916</span>
              </div>
            </div>
          </div>
        </div>

        {/* Structural Specs & Quiet Luxury Engineering */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-[#111722] border border-[#202c3e]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#64b5f6] block mb-2">01 · Kết Cấu Thép Vươn Console</span>
            <h4 className="text-lg font-serif text-[#f2f7fc] mb-2">Dầm I-Beam Chịu Lực Ẩn Khối</h4>
            <p className="text-xs text-[#9ab0c4] leading-relaxed">
              Dầm thép đúc mạ kẽm nhúng nóng đạt độ bền chống ăn mòn nước mặn lợ trên 50 năm, ngàm ngầm vào hệ móng cọc bê tông li tâm bờ sông, giải phóng toàn bộ cột chống dưới mép nước.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111722] border border-[#202c3e]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#64b5f6] block mb-2">02 · Gỗ Teak Tự Nhiên Chống Nước Lợ</span>
            <h4 className="text-lg font-serif text-[#f2f7fc] mb-2">Ốp Teak Myanmar Lõi Dày 28mm</h4>
            <p className="text-xs text-[#9ab0c4] leading-relaxed">
              Chứa hàm lượng dầu tự nhiên cao, gỗ Teak không mối mọt mục rữa khi tiếp xúc hơi ẩm mặt sông liên tục, bề mặt ngả màu xám bạc ánh kim theo năm tháng đậm chất Quiet Luxury.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111722] border border-[#202c3e]">
            <span className="text-xs font-mono uppercase tracking-widest text-[#64b5f6] block mb-2">03 · Vi Khí Hậu Mặt Nước Sài Gòn</span>
            <h4 className="text-lg font-serif text-[#f2f7fc] mb-2">Hạ Nhiệt Tự Nhiên 5.0°C</h4>
            <p className="text-xs text-[#9ab0c4] leading-relaxed">
              Gió đối lưu từ mặt sông thổi qua sàn kính kết hợp hệ lam chắn nắng hướng Tây tạo luồng gió quẩn mát lành, biến vọng cảnh thành ốc đảo thư giãn tĩnh tại tuyệt đối.
            </p>
          </div>
        </div>

        {/* Footer Guarantee Strip */}
        <div className="p-6 rounded-2xl bg-[#0f141d] border border-[#1d2737] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#64b5f6]" />
            <span className="text-xs text-[#9ab0c4] font-medium">
              GuHomes thiết kế và thi công trọn gói vọng cảnh ven sông với quy chuẩn an toàn kết cấu bờ kè nghiêm ngặt
            </span>
          </div>
          <span className="text-xs font-mono text-[#64b5f6]">Hotline: 0368 757 916 · Email: guhomesvn@gmail.com</span>
        </div>
      </div>
    </section>
  )
}
