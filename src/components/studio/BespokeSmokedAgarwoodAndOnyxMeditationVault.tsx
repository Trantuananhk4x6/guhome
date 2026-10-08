'use client'

import React, { useState, useRef } from 'react'

interface MeditationFrequencyMode {
  id: string
  name: string
  solfeggioHz: number
  targetBrainwave: string
  lightingCct: number
  description: string
  incenseFormula: string
}

const FREQUENCY_MODES: MeditationFrequencyMode[] = [
  {
    id: 'solfeggio-432',
    name: 'Tần Số Vũ Trụ 432 Hz',
    solfeggioHz: 432,
    targetBrainwave: 'Sóng Alpha (8 - 12 Hz) - Tĩnh tại & Tái tạo',
    lightingCct: 2400,
    description: 'Âm chuông xoay hợp âm 7 kim loại cộng hưởng với ánh sáng vàng ấm xuyên phiến đá Onyx 18mm, xua tan căng thẳng thần kinh sau ngày dài thương trường.',
    incenseFormula: 'Trầm hương kiến Quảng Nam ủ vụn quế Trà Bồng',
  },
  {
    id: 'solfeggio-528',
    name: 'Tần Số Chữa Lành 528 Hz',
    solfeggioHz: 528,
    targetBrainwave: 'Sóng Theta (4 - 8 Hz) - Thiền định sâu & Giác ngộ',
    lightingCct: 2200,
    description: 'Tần số kỳ diệu của sự biến đổi và sửa chữa sinh học, dẫn dắt hơi thở chậm dần về mức 6 nhịp/phút trong không gian kín tiêu âm tuyệt đối.',
    incenseFormula: 'Kỳ nam vụn Khánh Hòa phối nhang mây thảo dược',
  },
  {
    id: 'solfeggio-639',
    name: 'Tần Số Kết Nối 639 Hz',
    solfeggioHz: 639,
    targetBrainwave: 'Sóng Delta (0.5 - 4 Hz) - Giấc ngủ sâu nguyên bản',
    lightingCct: 2000,
    description: 'Kích hoạt sự hòa hợp nội tại, lan tỏa sự bình an đến từng tế bào, đưa gia chủ vào trạng thái thả lỏng buông thư hoàn toàn trước giờ nghỉ ngơi.',
    incenseFormula: 'Hoàng đàn Tuyết Lạng Sơn nướng gián tiếp trên than bạc',
  },
]

export function BespokeSmokedAgarwoodAndOnyxMeditationVault({ className = '' }: { className?: string }) {
  const [selectedModeId, setSelectedModeId] = useState<string>('solfeggio-432')
  const [isSingingBowlPlaying, setIsSingingBowlPlaying] = useState<boolean>(false)
  const [stoneHeatCelsius, setStoneHeatCelsius] = useState<number>(38)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const subOscRef = useRef<OscillatorNode | null>(null)

  const currentMode = FREQUENCY_MODES.find((m) => m.id === selectedModeId) ?? FREQUENCY_MODES[0]!

  const startSingingBowl = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx()
      }

      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }

      if (oscRef.current) {
        try { oscRef.current.stop() } catch {}
      }
      if (subOscRef.current) {
        try { subOscRef.current.stop() } catch {}
      }

      const master = audioCtxRef.current.createGain()
      master.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime)
      master.gain.linearRampToValueAtTime(0.18, audioCtxRef.current.currentTime + 1.2)
      master.connect(audioCtxRef.current.destination)
      masterGainRef.current = master

      // Fundamental bell tone
      const osc = audioCtxRef.current.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime)

      // Slight vibrato for warm acoustic singing bowl
      const lfo = audioCtxRef.current.createOscillator()
      const lfoGain = audioCtxRef.current.createGain()
      lfo.frequency.setValueAtTime(4.5, audioCtxRef.current.currentTime)
      lfoGain.gain.setValueAtTime(1.8, audioCtxRef.current.currentTime)
      lfo.connect(lfoGain)
      lfoGain.connect(osc.frequency)
      lfo.start()

      // Sub-harmonic for deep temple resonance
      const subOsc = audioCtxRef.current.createOscillator()
      subOsc.type = 'triangle'
      subOsc.frequency.setValueAtTime(freq / 2, audioCtxRef.current.currentTime)

      const subGain = audioCtxRef.current.createGain()
      subGain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime)

      osc.connect(master)
      subOsc.connect(subGain)
      subGain.connect(master)

      osc.start()
      subOsc.start()

      oscRef.current = osc
      subOscRef.current = subOsc
      setIsSingingBowlPlaying(true)
    } catch {
      // AudioContext unavailable
    }
  }

  const stopSingingBowl = () => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.5)
      setTimeout(() => {
        try { oscRef.current?.stop() } catch {}
        try { subOscRef.current?.stop() } catch {}
        oscRef.current = null
        subOscRef.current = null
        setIsSingingBowlPlaying(false)
      }, 1600)
    } else {
      setIsSingingBowlPlaying(false)
    }
  }

  const toggleBowl = () => {
    if (isSingingBowlPlaying) {
      stopSingingBowl()
    } else {
      startSingingBowl(currentMode.solfeggioHz)
    }
  }

  const handleSelectMode = (mode: MeditationFrequencyMode) => {
    setSelectedModeId(mode.id)
    if (isSingingBowlPlaying) {
      startSingingBowl(mode.solfeggioHz)
    }
  }

  return (
    <section className={`w-full py-16 sm:py-24 bg-[#0A0D0C] text-[#F3EFEA] border-t border-[#C5A880]/20 relative overflow-hidden ${className}`}>
      {/* Background Amber Glow representing Backlit Onyx */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#C5A880]/20 pb-8 mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/10 border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
              <span>● Không Gian An Trú Thượng Tầng</span>
              <span>· Tần Số Solfeggio 432Hz</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-light text-[#F3EFEA] tracking-tight">
              Mật Thất Thiền Định Mun Sọc & Đá Onyx Mật Ong
            </h2>
            <p className="text-sm sm:text-base text-[#A8A29E] mt-2 max-w-2xl font-light leading-relaxed">
              Tọa lạc tại tầng cao nhất của căn hộ Penthouse, không gian thiền định được GuHomes chế tác với vách đá Onyx mật ong xuyên sáng 18mm, sàn sưởi ấm ion âm và khe khói Trầm Hương đồng thau giấu âm tường.
            </p>
          </div>

          {/* Web Audio Singing Bowl Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleBowl}
              className={`min-h-[44px] px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                isSingingBowlPlaying
                  ? 'bg-[#C5A880] text-[#0A0D0C] shadow-lg shadow-[#C5A880]/30 font-semibold'
                  : 'bg-[#141A18] text-[#C5A880] border border-[#C5A880]/30 hover:border-[#C5A880]'
              }`}
              aria-label={isSingingBowlPlaying ? 'Dừng chuông xoay Solfeggio' : 'Rung chuông xoay Solfeggio'}
            >
              <span className={`w-2 h-2 rounded-full ${isSingingBowlPlaying ? 'bg-[#0A0D0C] animate-ping' : 'bg-[#C5A880]'}`} />
              <span>{isSingingBowlPlaying ? 'Đang Ngân Chuông Xoay 7 Kim Loại' : 'Rung Chuông Thiền Tự Nhiên'}</span>
              <span className="font-mono text-[10px]">{currentMode.solfeggioHz} Hz</span>
            </button>
          </div>
        </div>

        {/* Core Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Selection Columns (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs font-mono text-[#A8A29E] uppercase tracking-wider">
              Chọn Tần Số Cộng Hưởng Não Bộ:
            </span>

            <div className="flex flex-col gap-3">
              {FREQUENCY_MODES.map((mode) => {
                const isSelected = mode.id === selectedModeId
                return (
                  <button
                    key={mode.id}
                    onClick={() => handleSelectMode(mode)}
                    className={`min-h-[44px] w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'bg-[#18211E] border-[#C5A880] shadow-md shadow-[#C5A880]/15 scale-[1.01]'
                        : 'bg-[#111715] border-[#C5A880]/15 hover:border-[#C5A880]/40 text-[#A8A29E]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-base font-display font-medium ${isSelected ? 'text-[#C5A880]' : 'text-[#F3EFEA]'}`}>
                        {mode.name}
                      </span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#0A0D0C] border border-[#C5A880]/30 text-[#C5A880]">
                        {mode.solfeggioHz} Hz
                      </span>
                    </div>
                    <p className="text-xs text-[#A8A29E] leading-relaxed font-light mb-1.5">
                      {mode.targetBrainwave}
                    </p>
                    <span className="text-[11px] text-[#C5A880]/70 font-mono block">
                      Ánh sáng Onyx: {mode.lightingCct}K
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Heated Stone Floor Slider */}
            <div className="p-5 rounded-2xl bg-[#111715] border border-[#C5A880]/20 mt-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#A8A29E] mb-2">
                <span>Nhiệt Độ Sàn Đá Onyx Ngầm:</span>
                <span className="text-[#C5A880] font-semibold">{stoneHeatCelsius}°C</span>
              </div>
              <input
                type="range"
                min="32"
                max="44"
                step="1"
                value={stoneHeatCelsius}
                onChange={(e) => setStoneHeatCelsius(parseInt(e.target.value, 10))}
                className="w-full h-1 bg-[#18211E] rounded-lg appearance-none cursor-pointer accent-[#C5A880]"
                aria-label="Điều chỉnh nhiệt độ sàn đá sưởi ngầm"
              />
              <div className="flex justify-between text-[10px] text-[#A8A29E]/60 mt-1 font-mono">
                <span>Ấm nhẹ lòng bàn chân (32°C)</span>
                <span>Thải độc cơ thể (44°C)</span>
              </div>
            </div>
          </div>

          {/* Right Detailed Engineering Panel (7 cols) */}
          <div className="lg:col-span-7 bg-[#111715] border border-[#C5A880]/30 rounded-3xl p-6 sm:p-8 relative">
            <div className="flex items-center justify-between border-b border-[#C5A880]/15 pb-4 mb-6">
              <span className="text-xs font-mono text-[#C5A880] uppercase tracking-widest">
                Thông Số Âm Học & Vật Liệu May Đo
              </span>
              <span className="text-xs text-[#A8A29E] font-mono">Tiêu chuẩn: Quiet Luxury ISO-3382</span>
            </div>

            <h3 className="text-2xl font-display text-[#F3EFEA] mb-3">
              {currentMode.name}
            </h3>

            <p className="text-sm text-[#A8A29E] font-light leading-relaxed mb-6">
              {currentMode.description}
            </p>

            {/* Spec Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#0A0D0C] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Đá Xuyên Sáng Tự Nhiên
                </span>
                <p className="text-xs sm:text-sm text-[#F3EFEA] font-light">
                  Onyx vàng mật ong Iran dày 18mm, đèn LED tấm phẳng CRI 98 điều chỉnh vô cấp
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0D0C] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Gỗ Mun Sọc May Đo
                </span>
                <p className="text-xs sm:text-sm text-[#F3EFEA] font-light">
                  Gỗ Mun sọc Nam Bộ tẩm sấy 10% sáp ong tự nhiên, nan vách tiêu âm rãnh 3mm
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0D0C] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Hương Trầm Thanh Lọc
                </span>
                <p className="text-xs sm:text-sm text-[#F3EFEA] font-light">
                  {currentMode.incenseFormula}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0D0C] border border-[#C5A880]/15">
                <span className="text-[11px] font-mono text-[#A8A29E] uppercase tracking-wider block mb-1">
                  Mức Tiêu Âm Nền Phòng
                </span>
                <p className="text-xs sm:text-sm text-[#C5A880] font-mono font-medium">
                  RT60 = 0.22 giây (Độ ồn nền &lt; 22 dBA)
                </p>
              </div>
            </div>

            {/* Atelier Verification Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#18211E] border border-[#C5A880]/30 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center font-bold text-xs shrink-0">
                  Gu
                </span>
                <span className="text-[#A8A29E]">
                  Xưởng may đo Thạnh Xuân 1.200m²: gia công ghép mộng mộc và cân chỉnh âm học độc bản.
                </span>
              </div>
              <a
                href="https://zalo.me/0368757916"
                target="_blank"
                rel="noreferrer noopener"
                className="min-h-[44px] px-4 py-2 rounded-full bg-[#C5A880] text-[#0A0D0C] font-semibold hover:bg-[#D4B68D] transition-colors whitespace-nowrap flex items-center justify-center"
              >
                Nhắn Zalo KTS Trưởng
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
