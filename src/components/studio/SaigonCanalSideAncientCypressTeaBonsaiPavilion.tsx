'use client'

import React, { useState, useEffect, useRef } from 'react'

interface BonsaiMasterpiece {
  id: string
  name: string
  age: string
  style: string
  origin: string
  height: string
  microclimateNote: string
}

const BONSAI_COLLECTION: BonsaiMasterpiece[] = [
  {
    id: 'duyen-tung-90',
    name: 'Duyên Tùng Nam Bộ Bách Niên',
    age: '90 năm tuổi',
    style: 'Dáng Trực Huyền cổ phong',
    origin: 'Vùng đồi đá Thất Sơn, An Giang',
    height: '1.40m',
    microclimateNote: 'Rễ bám chặt phiến đá bazan, tán kim dày hấp thụ hơi sương thác nước hạ nhiệt.',
  },
  {
    id: 'can-thang-78',
    name: 'Cần Thăng Cổ Thụ Thác Đổ',
    age: '78 năm tuổi',
    style: 'Dáng Thác Đổ vươn dòng kênh',
    origin: 'Vùng phù sa rạch Bến Lức, Long An',
    height: '1.18m',
    microclimateNote: 'Thân xù xì bọc rêu xanh tự nhiên, sinh trưởng mạnh mẽ trong độ ẩm 75% - 80%.',
  },
]

export function SaigonCanalSideAncientCypressTeaBonsaiPavilion() {
  const [selectedBonsai, setSelectedBonsai] = useState<string>('duyen-tung-90')
  const [rotationAngle, setRotationAngle] = useState<number>(30)
  const [waterFlowRate, setWaterFlowRate] = useState<number>(3) // 1 to 5
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)
  const [ambientTemp, setAmbientTemp] = useState<number>(24.7)

  const audioCtxRef = useRef<AudioContext | null>(null)

  const activeBonsai = BONSAI_COLLECTION.find((b) => b.id === selectedBonsai) ?? BONSAI_COLLECTION[0]!

  useEffect(() => {
    // Dynamic cooling from waterfall and Cypress wood microclimate
    const baseTemp = 28.5
    const coolingDelta = (waterFlowRate * 0.76)
    setAmbientTemp(Number((baseTemp - coolingDelta).toFixed(1)))
  }, [waterFlowRate])

  const toggleSoundscape = () => {
    if (!isAudioActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioCtxRef.current = ctx

        // Soundscape 1: Pink noise water trickle through rocks
        const bufferSize = ctx.sampleRate * 2
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
        const output = noiseBuffer.getChannelData(0)
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1
          b0 = 0.99886 * b0 + white * 0.0555179
          b1 = 0.99332 * b1 + white * 0.0750759
          b2 = 0.96900 * b2 + white * 0.1538520
          b3 = 0.86650 * b3 + white * 0.3104856
          b4 = 0.55000 * b4 + white * 0.5329522
          b5 = -0.7616 * b5 - white * 0.0168980
          output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.038
          b6 = white * 0.115926
        }

        const whiteNoise = ctx.createBufferSource()
        whiteNoise.buffer = noiseBuffer
        whiteNoise.loop = true

        const filter = ctx.createBiquadFilter()
        filter.type = 'bandpass'
        filter.frequency.setValueAtTime(640, ctx.currentTime)
        filter.Q.setValueAtTime(1.7, ctx.currentTime)

        // Solfeggio 528Hz Harmonic Sine
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(528, ctx.currentTime)

        const oscGain = ctx.createGain()
        oscGain.gain.setValueAtTime(0.018, ctx.currentTime)

        const mainGain = ctx.createGain()
        mainGain.gain.setValueAtTime(0.2, ctx.currentTime)

        whiteNoise.connect(filter)
        filter.connect(mainGain)
        osc.connect(oscGain)
        oscGain.connect(mainGain)

        mainGain.connect(ctx.destination)

        whiteNoise.start()
        osc.start()
        setIsAudioActive(true)
      } catch {
        setIsAudioActive(true)
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close()
        audioCtxRef.current = null
      }
      setIsAudioActive(false)
    }
  }

  return (
    <section className="relative my-20 overflow-hidden rounded-3xl border border-stone-800/80 bg-gradient-to-b from-[#13110e] via-[#0d0c0a] to-[#0a0908] p-6 sm:p-10 lg:p-14 text-stone-300 shadow-2xl">
      {/* Decorative Aura */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-amber-900/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-emerald-900/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 border-b border-stone-800/60 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/40 bg-amber-950/30 px-3.5 py-1 text-xs font-medium tracking-widest text-amber-300/90 uppercase">
            <span>Kiến Trúc Thủy Đình Thích Ứng Vi Khí Hậu Sài Gòn</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>Nghiên Cứu Độc Quyền GuHomes</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 font-light tracking-wide leading-snug">
            Thủy Đình Trà Đạo Gỗ Hoàng Đàn Bách Niên & Thác Nước Đá Xanh Thanh Hóa
          </h3>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Kết cấu cột xà đẽo từ gỗ Hoàng Đàn tuyết trên 85 năm tuổi liên kết mộng nêm truyền thống không đinh kim loại,
            tỏa hương thơm thảo mộc quý phái tự nhiên. Thác nước tràn đa tầng đá xanh Thanh Hóa mài thô giúp hạ nhiệt
            vi khí hậu thực tế -3.8°C và phát tán ion âm thanh lọc không khí bên bờ kênh rạch nhiệt đới.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Simulator */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-stone-800 bg-[#0f0e0c] p-6 shadow-inner flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-transparent to-black/80 pointer-events-none" />

              {/* Status Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
                  </span>
                  <span className="text-xs tracking-wider uppercase text-stone-300 font-medium">Thác Tràn Đá Xanh & Tuần Hoàn Nước Sinh Học</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-amber-200/80 bg-amber-950/60 border border-amber-800/40 px-2.5 py-0.5 rounded-full">
                    Hoàng Đàn 85 năm tuổi
                  </span>
                  <span className="text-xs text-emerald-300/90 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                    Vi khí hậu: {ambientTemp}°C (-3.8°C)
                  </span>
                </div>
              </div>

              {/* Central Rotatable Base Graphic */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <div
                  className="relative transition-transform duration-700 ease-out cursor-grab active:cursor-grabbing"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                >
                  <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-dashed border-amber-700/40 p-3 flex items-center justify-center bg-stone-950/60 shadow-2xl backdrop-blur-sm">
                    <div className="w-full h-full rounded-full border border-stone-700/60 flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-stone-900 via-amber-950/30 to-stone-900">
                      <span className="text-xs text-amber-400/90 font-serif">Bệ Bonsai 360°</span>
                      <span className="mt-1 text-[11px] text-stone-300 font-light">{activeBonsai.name}</span>
                      <span className="text-[10px] text-stone-300 tracking-wider mt-0.5">{rotationAngle}° Đông Nam</span>
                    </div>
                  </div>
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] text-amber-500 font-mono">BẮC (RẠCH)</div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-amber-500 font-mono">NAM (VƯỜN)</div>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => setRotationAngle((prev) => (prev - 15 + 360) % 360)}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200 transition-colors"
                  >
                    Xoay Trái 15°
                  </button>
                  <span className="text-xs text-stone-300">Góc đón sáng: {rotationAngle}°</span>
                  <button
                    onClick={() => setRotationAngle((prev) => (prev + 15) % 360)}
                    className="rounded-lg border border-stone-700 bg-stone-900/80 px-2.5 py-1 text-xs text-stone-300 hover:border-amber-600 hover:text-amber-200 transition-colors"
                  >
                    Xoay Phải 15°
                  </button>
                </div>
              </div>

              {/* Bottom Quick Control Bar */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-stone-800/80 pt-3 text-xs text-stone-400">
                <div>
                  <span className="text-stone-300">Tuyết Hoàng Đàn:</span> Lớp tinh thể tuyết tự nhiên tỏa hương thơm thảo mộc
                </div>
                <button
                  onClick={toggleSoundscape}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-medium transition-all ${
                    isAudioActive
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                      : 'border border-stone-700 bg-stone-900 text-stone-300 hover:border-amber-500/50'
                  }`}
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                  <span>{isAudioActive ? 'Dừng Hòa Âm 528Hz' : 'Bật Thủy Âm Thác Tràn 528Hz'}</span>
                </button>
              </div>
            </div>

            {/* Bonsai Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BONSAI_COLLECTION.map((bonsai) => {
                const isSelected = bonsai.id === selectedBonsai
                return (
                  <div
                    key={bonsai.id}
                    onClick={() => setSelectedBonsai(bonsai.id)}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all duration-300 ${
                      isSelected
                        ? 'border-amber-600/80 bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950 shadow-lg shadow-amber-950/30'
                        : 'border-stone-800/80 bg-stone-900/40 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-stone-200">{bonsai.name}</span>
                      <span className="text-xs text-amber-400 font-mono">{bonsai.age}</span>
                    </div>
                    <div className="mt-2 text-xs text-stone-400 space-y-1">
                      <div><strong className="text-stone-300">Thế cây:</strong> {bonsai.style}</div>
                      <div><strong className="text-stone-300">Chiều cao:</strong> {bonsai.height} · {bonsai.origin}</div>
                      <div className="mt-2 text-[11px] text-stone-300 italic">{bonsai.microclimateNote}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Microclimate Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-stone-800/90 bg-[#11100e] p-6 space-y-5">
              <h4 className="font-serif text-lg text-amber-200/90 font-light border-b border-stone-800/80 pb-3 flex items-center justify-between">
                <span>Thông Số Điều Khiển Vi Khí Hậu</span>
                <span className="text-xs font-mono text-stone-300">Mã: CY-85WF</span>
              </h4>

              {/* Water Flow Rate Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-stone-300">Lưu lượng thác tràn tuần hoàn:</span>
                  <span className="font-mono text-amber-300">Cấp độ {waterFlowRate}/5 ({waterFlowRate * 380} L/giờ)</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={waterFlowRate}
                  onChange={(e) => setWaterFlowRate(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer bg-stone-800 rounded-lg h-1.5"
                />
                <div className="flex justify-between text-[10px] text-stone-300">
                  <span>Róc rách êm dịu</span>
                  <span>Chảy tràn giải nhiệt tối đa (-3.8°C)</span>
                </div>
              </div>

              {/* Material Excellence Attributes */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-medium tracking-wider text-amber-300/80 uppercase">Đặc Tính Kỹ Thuật Gỗ Hoàng Đàn & Đá Xanh</div>
                <ul className="space-y-2 text-xs text-stone-400 font-light">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Gỗ Hoàng Đàn tuyết (Cupressus torulosa):</strong> Tỷ trọng 0.95 g/cm³, chứa lượng tinh dầu đậm đặc vĩnh viễn không bao giờ mối mọt.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Đá xanh Thanh Hóa mài thô:</strong> Chịu nước tuần hoàn và nắng gắt, bề mặt bám rêu phong tự nhiên theo thời gian.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">·</span>
                    <span><strong className="text-stone-300">Mộng gỗ nêm không đinh sắt:</strong> Xử lý thủ công tại xưởng mộc Thạnh Xuân 1.200m², cho phép kết cấu thở tự nhiên.</span>
                  </li>
                </ul>
              </div>

              {/* Master Architect Direct Callout */}
              <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-4 text-xs text-amber-200/90 leading-relaxed">
                <span className="font-semibold text-amber-300">KTS Trưởng GuHomes:</span> Thủy đình không chỉ là nơi thưởng trà mà còn đóng vai trò trạm điều tiết nhiệt độ cho toàn bộ khối nhà chính. Hotline: <span className="font-mono text-amber-300 font-semibold">0368 757 916</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
