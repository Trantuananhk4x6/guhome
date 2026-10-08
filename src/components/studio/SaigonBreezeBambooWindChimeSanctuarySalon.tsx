'use client'

import React, { useState, useRef } from 'react'

interface WindChimeMode {
  id: string
  name: string
  windSpeedMs: number
  pentatonicNote: string
  frequencyHz: number
  description: string
  mindfulnessEffect: string
}

const CHIME_MODES: WindChimeMode[] = [
  {
    id: 'gentle-breeze-ho',
    name: 'Gió Thoảng Ban Mai (Cung Hò)',
    windSpeedMs: 1.5,
    pentatonicNote: 'Hò (293.66 Hz - Nốt D4)',
    frequencyHz: 293.66,
    description: 'Từng ống tre ngà chạm khẽ vào con lắc mun sọc, phát ra âm hưởng mộc mạc và trong trẻo như giọt sương mai đầu cành.',
    mindfulnessEffect: 'Khai mở tâm trí, đem lại sự an hòa tĩnh tại',
  },
  {
    id: 'river-wind-xang',
    name: 'Gió Sông Bến Nghé (Cung Xang)',
    windSpeedMs: 3.2,
    pentatonicNote: 'Xang (392.00 Hz - Nốt G4)',
    frequencyHz: 392.0,
    description: 'Hợp âm ngũ cung Nam Bộ ngân vang rộn rã khi luồng gió đối lưu sông lùa qua giếng trời thông tầng.',
    mindfulnessEffect: 'Điều hòa luồng sinh khí, xua tan căng thẳng',
  },
  {
    id: 'monsoon-gust-cong',
    name: 'Gió Chướng Mùa Khô (Cung Cống)',
    windSpeedMs: 4.8,
    pentatonicNote: 'Cống (523.25 Hz - Nốt C5)',
    frequencyHz: 523.25,
    description: 'Âm sắc thanh thoát vang xa, cấu trúc 12 ống tre ngà cộng hưởng tự nhiên tạo bản giao hưởng đón gió phương Nam.',
    mindfulnessEffect: 'Hồi phục sinh lực, cảm nhận sự kết nối thiên nhiên',
  },
]

export function SaigonBreezeBambooWindChimeSanctuarySalon() {
  const [selectedModeIdx, setSelectedModeIdx] = useState<number>(1)
  const [isChiming, setIsChiming] = useState<boolean>(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  const activeMode = CHIME_MODES[selectedModeIdx] ?? CHIME_MODES[0]!

  const playBambooChime = () => {
    if (typeof window === 'undefined') return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx()
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }

      setIsChiming(true)

      const osc = audioContextRef.current.createOscillator()
      const gain = audioContextRef.current.createGain()
      const filter = audioContextRef.current.createBiquadFilter()

      // Resonant bamboo tube acoustic simulation
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(activeMode.frequencyHz, audioContextRef.current.currentTime)
      filter.Q.setValueAtTime(8.0, audioContextRef.current.currentTime)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(activeMode.frequencyHz, audioContextRef.current.currentTime)

      gain.gain.setValueAtTime(0.001, audioContextRef.current.currentTime)
      gain.gain.linearRampToValueAtTime(0.15, audioContextRef.current.currentTime + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 2.5)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioContextRef.current.destination)

      osc.start()
      osc.stop(audioContextRef.current.currentTime + 2.6)

      setTimeout(() => {
        setIsChiming(false)
      }, 2600)
    } catch {
      setIsChiming(false)
    }
  }

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background radial gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(217,119,6,0.25),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Khí Động Học & Thính Giác Mộc Trầm
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Thính Phòng Chuông Gió Tre Ngà Nam Bộ
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Hệ 12 ống tre ngà Nam Bộ luộc nước vôi trong 72 giờ và hun khói rơm nếp chống mọt tuyệt đối. 
            Đón luồng gió đối lưu sông Sài Gòn, tấu lên khúc nhạc ngũ cung Hò - Xự - Xang - Xê - Cống thanh tịnh cho tổ ấm.
          </p>
        </div>

        {/* Chime Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {CHIME_MODES.map((mode, idx) => {
            const isSelected = idx === selectedModeIdx
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedModeIdx(idx)}
                className={`p-5 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-amber-600/80 shadow-lg shadow-amber-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-400 font-medium">THANG ÂM 0{idx + 1}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-300">
                      VẬN TỐC {mode.windSpeedMs} M/S
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-stone-100 mb-1">{mode.name}</h3>
                  <span className="text-xs font-mono text-stone-400 block mb-2">{mode.pentatonicNote}</span>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{mode.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] font-mono text-stone-400">
                  <span>Tác động: </span>
                  <span className="text-amber-200">{mode.mindfulnessEffect}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Interactive Visualizer Dashboard */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Bamboo Wind Chime Tubes */}
            <div className="lg:col-span-6 bg-stone-950 border border-stone-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span>DÀN TRE NGÀ 12 ỐNG THỦ CÔNG</span>
                <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ĐỘ ẨM KHÍ HẬU: 76% RH
                </span>
              </div>

              {/* Graphic Bamboo Tubes Hanging */}
              <div className="my-8 flex justify-center items-end gap-3 py-6 relative">
                {[120, 145, 170, 195, 220, 240].map((height, i) => (
                  <div
                    key={i}
                    className="w-3 rounded-full bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 shadow-md border border-amber-500/30 transition-transform duration-300"
                    style={{
                      height: `${height * 0.65}px`,
                      transform: isChiming ? `rotate(${((i % 3) - 1) * 3}deg)` : 'none',
                    }}
                  />
                ))}
              </div>

              {/* Web Audio Chime Trigger */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-800/80">
                <button
                  onClick={playBambooChime}
                  disabled={isChiming}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-medium text-xs font-mono transition-colors min-h-[44px]"
                >
                  <span className={`w-2 h-2 rounded-full ${isChiming ? 'bg-stone-950 animate-ping' : 'bg-stone-950'}`} />
                  <span>{isChiming ? 'ĐANG PHÁT ÂM NGŨ CUNG' : 'GÕ THỬ TIẾNG CHUÔNG TRE'}</span>
                </button>

                <div className="text-right font-mono text-xs text-amber-400">
                  {activeMode.pentatonicNote}
                </div>
              </div>
            </div>

            {/* Metrics & Acoustic Specs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-lg font-serif text-stone-100 mb-1">Cộng Hưởng Âm Học & Thông Gió</h4>
                <p className="text-xs text-stone-400">
                  Kiểm chứng tần số rung tự nhiên của tre ngà già trên 5 năm tuổi.
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block mb-1">TẦN SỐ CỘNG HƯỞNG CHUẨN</span>
                  <span className="text-2xl font-mono text-amber-300 font-light">
                    {Math.round(activeMode.frequencyHz)} <span className="text-sm">Hz</span>
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-1">Dải âm tai người nghe êm dịu nhất</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block mb-1">ĐỘ ỒN ÂM THANH MỘC</span>
                  <span className="text-2xl font-mono text-emerald-300 font-light">42 dBA</span>
                  <span className="text-[11px] text-stone-500 block mt-1">Chuẩn không gian thiền định</span>
                </div>
              </div>

              {/* Craftsmanship Specifications */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed font-sans">
                <strong className="text-amber-300 block mb-1 font-mono uppercase text-[11px] tracking-wider">
                  Quy Chuẩn Chế Tác Tre Nam Bộ:
                </strong>
                Tre ngà khai thác vào mùa khô để hạn chế hàm lượng tinh bột, luộc trong nước vôi trong 72 giờ và gác bếp rơm rạ 6 tháng. 
                Dây treo bằng sợi tơ tằm dệt tay chịu lực tốt, không mục đứt dưới độ ẩm 80% của Sài Gòn.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Contact Direct Line */}
        <div className="text-center text-xs font-mono text-stone-400">
          <span>TƯ VẤN THIẾT KẾ KHÔNG GIAN THÍNH PHÒNG TRE: </span>
          <a
            href="tel:0368757916"
            className="text-amber-400 hover:text-amber-300 underline underline-offset-4 ml-1 font-semibold"
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
