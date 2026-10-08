'use client'

import React, { useState, useRef } from 'react'

interface TeaBrewingPreset {
  id: string
  teaName: string
  waterTempCelsius: number
  steepingSeconds: number
  teaVessel: string
  aromaNotes: string
}

const TEA_PRESETS: TeaBrewingPreset[] = [
  {
    id: 'shan-tuyet-ancient',
    teaName: 'Trà Shan Tuyết Cổ Thụ Hà Giang',
    waterTempCelsius: 85,
    steepingSeconds: 35,
    teaVessel: 'Ấm Tử Sa Nghi Hưng nung củi',
    aromaNotes: 'Hương khói lam chiều quyện cùng vị ngọt hậu sâu lắng, búp trà phủ tuyết trắng tinh khôi.',
  },
  {
    id: 'oolong-high-mountain',
    teaName: 'Trà Ô Long Thuần Chủng Cầu Đất',
    waterTempCelsius: 92,
    steepingSeconds: 45,
    teaVessel: 'Ấm gốm Bát Tràng men tro trấu',
    aromaNotes: 'Hương hoa mộc tê thơm ngát, sắc nước vàng óng hổ phách, vị chát dịu thanh tao.',
  },
  {
    id: 'puerh-raw-aged',
    teaName: 'Trà Phổ Nhĩ Sống Lên Men Tự Nhiên',
    waterTempCelsius: 98,
    steepingSeconds: 25,
    teaVessel: 'Khay trà đá bazan xẻ thô',
    aromaNotes: 'Hương gỗ rừng già và nấm thảo mộc đượm đà, nuôi dưỡng năng lượng nội tâm bền bỉ.',
  },
]

export function BespokeSmokedOakZenTeaHouseAndTatamiSanctuary() {
  const [selectedTeaIdx, setSelectedTeaIdx] = useState<number>(0)
  const [isWaterBoiling, setIsWaterBoiling] = useState<boolean>(false)
  const [ambientLux, setAmbientLux] = useState<number>(180)
  const audioContextRef = useRef<AudioContext | null>(null)

  const activeTea = TEA_PRESETS[selectedTeaIdx] ?? TEA_PRESETS[0]!

  const playBoilingWaterSound = () => {
    if (typeof window === 'undefined') return

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx()
      }

      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }

      setIsWaterBoiling(true)

      const osc = audioContextRef.current.createOscillator()
      const gain = audioContextRef.current.createGain()
      const filter = audioContextRef.current.createBiquadFilter()

      // Gentle bubbling water resonance
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(450, audioContextRef.current.currentTime)
      filter.Q.setValueAtTime(2.5, audioContextRef.current.currentTime)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(160, audioContextRef.current.currentTime)

      gain.gain.setValueAtTime(0.001, audioContextRef.current.currentTime)
      gain.gain.linearRampToValueAtTime(0.08, audioContextRef.current.currentTime + 0.1)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 2.8)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioContextRef.current.destination)

      osc.start()
      osc.stop(audioContextRef.current.currentTime + 2.9)

      setTimeout(() => {
        setIsWaterBoiling(false)
      }, 2900)
    } catch {
      setIsWaterBoiling(false)
    }
  }

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background warm tea steam aura */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_bottom_left,rgba(180,83,9,0.25),transparent_75%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Trà Đạo & Thiền Định Yên Ả
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Trà Thất Gỗ Sồi Hun Khói & Chiếu Cói Nga Sơn
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Sàn nâng 350mm lót chiếu cói dệt tay thủ công, bao bọc bởi hệ cửa lùa Shoji giấy Dó Phong Khê cản sáng chói. 
            Nơi hương trà Shan Tuyết cổ thụ giao hòa cùng sự ấm áp của thớ gỗ Sồi hun khói.
          </p>
        </div>

        {/* Tea Variety Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {TEA_PRESETS.map((tea, idx) => {
            const isSelected = idx === selectedTeaIdx
            return (
              <button
                key={tea.id}
                onClick={() => setSelectedTeaIdx(idx)}
                className={`p-5 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-amber-600/80 shadow-lg shadow-amber-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-400 font-medium">DANH TRÀ 0{idx + 1}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-300">
                      {tea.waterTempCelsius}°C
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-stone-100 mb-1">{tea.teaName}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{tea.aromaNotes}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] font-mono text-stone-400">
                  <span>Trà cụ: </span>
                  <span className="text-amber-200">{tea.teaVessel}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Interactive Tea Room Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between min-h-[360px] relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-3 border-b border-stone-800 mb-6">
                <span>CHIẾU CÓI NGA SƠN DỆT TAY & GỖ SỒI</span>
                <span className="text-amber-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  ĐỘ DÀY SÀN NÂNG: 350 MM
                </span>
              </div>

              {/* Graphic Representation of Tea Table */}
              <div className="p-8 rounded-xl bg-stone-950/80 border border-amber-900/40 text-center relative flex flex-col items-center justify-center min-h-[220px]">
                <div className="relative z-10 max-w-md">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
                    Nhiệt Độ Pha Trà Chuẩn Mực ({activeTea.waterTempCelsius}°C)
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-stone-100 mb-2 font-normal">
                    {activeTea.teaName}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {activeTea.aromaNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Boiling Water Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-800/80">
              <button
                onClick={playBoilingWaterSound}
                disabled={isWaterBoiling}
                className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-mono font-medium transition-colors min-h-[44px] flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${isWaterBoiling ? 'bg-stone-950 animate-ping' : 'bg-stone-950'}`} />
                <span>{isWaterBoiling ? 'ĐANG ĐUN NƯỚC REO ĐÁY ẤM' : 'ĐUN NƯỚC PHA TRÀ (WEB AUDIO)'}</span>
              </button>

              <span className="text-xs font-mono text-stone-400">
                Thời gian ủ trà: {activeTea.steepingSeconds} giây
              </span>
            </div>
          </div>

          {/* Shoji Light Dimmer & Specs */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Lux Dimmer */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="shoji-lux-dimmer" className="text-sm font-medium text-stone-200">ĐỘ SÁNG CỬA LÙA SHOJI GIẤY DÓ</label>
                <span className="text-xs font-mono text-amber-400 font-semibold">{ambientLux} Lux</span>
              </div>
              <input
                id="shoji-lux-dimmer"
                type="range"
                min="60"
                max="350"
                value={ambientLux}
                onChange={(e) => setAmbientLux(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400">
                <span>60 Lux (Trăng tà)</span>
                <span>180 Lux (Chuẩn thiền trà)</span>
                <span>350 Lux (Đọc sách)</span>
              </div>
            </div>

            {/* Specifications */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Quy Chuẩn Trà Thất GuHomes
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Chiếu cói Nga Sơn đan tay:</strong> Thoáng mát vào mùa hè, ấm áp vào mùa mưa, lưu giữ hương cói tự nhiên.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Giấy Dó Phong Khê 3 lớp:</strong> Lọc tia UV và tán xạ ánh sáng gắt Sài Gòn, chống ẩm mốc tự nhiên.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Dầu lau mộc Osmo Đức (0% VOC):</strong> Bảo toàn cảm giác chạm mộc tế bào gỗ Sồi, an toàn sức khỏe gia chủ.</span>
                </li>
              </ul>
            </div>

            {/* Direct Line */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-300 block">Tư vấn không gian trà thất may đo:</span>
                <span className="text-stone-400 text-[11px] font-mono">Bản vẽ bố trí phong thủy chuyên sâu</span>
              </div>
              <a
                href="tel:0368757916"
                className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-mono text-xs font-semibold transition-colors min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs font-mono text-stone-500">
          GUHOMES TEA SANCTUARY · XƯỞNG MỘC THẠNH XUÂN 1.200M2 · EMAIL: GUHOMESVN@GMAIL.COM
        </div>
      </div>
    </section>
  )
}
