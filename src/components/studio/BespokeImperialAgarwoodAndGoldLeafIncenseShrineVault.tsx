'use client'

import React, { useState, useRef } from 'react'

interface IncenseAromaMode {
  id: string
  title: string
  tempCelsius: number
  agarwoodOrigin: string
  scentDescription: string
  mindfulnessState: string
}

const AROMA_MODES: IncenseAromaMode[] = [
  {
    id: 'subtle-daybreak',
    title: 'Thanh Nhã Ban Mai',
    tempCelsius: 140,
    agarwoodOrigin: 'Trầm hương rừng tự nhiên Khánh Hòa',
    scentDescription: 'Hương thanh khiết, ngào ngạt hương hoa cỏ sớm và vị ngọt dịu của nhựa trầm bách niên.',
    mindfulnessState: 'Tỉnh thức, hanh thông tâm trí bắt đầu ngày mới',
  },
  {
    id: 'deep-amber-twilight',
    title: 'Đượm Ngọt Hoàng Hôn',
    tempCelsius: 180,
    agarwoodOrigin: 'Trầm mắt kiến Quảng Nam',
    scentDescription: 'Hương thơm nồng ấm, lan tỏa vị gỗ mật ong và hổ phách sâu lắng khắp phòng thờ gia tộc.',
    mindfulnessState: 'Tĩnh tại, chiêm nghiệm và hòa nhập cùng không gian',
  },
  {
    id: 'zen-midnight-sanctuary',
    title: 'Huyền Bí Thiền Định Đêm',
    tempCelsius: 220,
    agarwoodOrigin: 'Kỳ nam thượng phẩm tuyển trạch',
    scentDescription: 'Tầng hương sâu thẳm, kích hoạt cảm giác bình an vô lượng, xua tan ẩm khí và bụi trần đô thị.',
    mindfulnessState: 'Thư thái tuyệt đối, hồi phục năng lượng tinh thần',
  },
]

export function BespokeImperialAgarwoodAndGoldLeafIncenseShrineVault() {
  const [selectedAromaIdx, setSelectedAromaIdx] = useState<number>(1)
  const [isChiming, setIsChiming] = useState<boolean>(false)
  const [heatingTemp, setHeatingTemp] = useState<number>(180)
  const audioContextRef = useRef<AudioContext | null>(null)

  const activeAroma = AROMA_MODES[selectedAromaIdx] ?? AROMA_MODES[0]!

  const playSingingBellChime = () => {
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

      // Sacred 528Hz tone (Frequency of transformation & deep peace)
      const osc = audioContextRef.current.createOscillator()
      const gain = audioContextRef.current.createGain()
      const filter = audioContextRef.current.createBiquadFilter()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(528, audioContextRef.current.currentTime)

      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1200, audioContextRef.current.currentTime)
      filter.Q.setValueAtTime(3.0, audioContextRef.current.currentTime)

      gain.gain.setValueAtTime(0.001, audioContextRef.current.currentTime)
      gain.gain.linearRampToValueAtTime(0.18, audioContextRef.current.currentTime + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 3.2)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioContextRef.current.destination)

      osc.start()
      osc.stop(audioContextRef.current.currentTime + 3.3)

      setTimeout(() => {
        setIsChiming(false)
      }, 3300)
    } catch {
      setIsChiming(false)
    }
  }

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background warm spiritual aura */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.25),transparent_75%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-300 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            Không Gian Tâm Linh Gia Tộc
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Án Gian Thờ Trầm Hương Dát Vàng Quỳ 24K
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Chế tác từ gỗ Gõ Đỏ Nam Bộ bách niên, ghép mộng thủ công 100% không đinh sắt. 
            Điểm xuyết vàng quỳ 24K Kiêu Kỵ truyền thống và khay xông trầm hương Khánh Hòa cách nhiệt an toàn tuyệt đối.
          </p>
        </div>

        {/* Aroma Presets Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {AROMA_MODES.map((mode, idx) => {
            const isSelected = idx === selectedAromaIdx
            return (
              <button
                key={mode.id}
                onClick={() => {
                  setSelectedAromaIdx(idx)
                  setHeatingTemp(mode.tempCelsius)
                }}
                className={`p-5 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-amber-600/90 shadow-lg shadow-amber-950/50 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-400 font-medium">CHẾ ĐỘ 0{idx + 1}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-800 text-amber-300">
                      {mode.tempCelsius}°C
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-stone-100 mb-1">{mode.title}</h3>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{mode.scentDescription}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 text-[11px] font-mono text-stone-400">
                  <span>Trạng thái: </span>
                  <span className="text-amber-200">{mode.mindfulnessState}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Shrine Visualizer and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Visual Shrine Card */}
          <div className="lg:col-span-7 bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between min-h-[380px] relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-stone-400 pb-3 border-b border-stone-800 mb-6">
                <span>QUY CHUẨN GỖ GÕ ĐỎ NAM BỘ BÁCH NIÊN</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  MỘNG MÒI TRUYỀN THỐNG
                </span>
              </div>

              {/* Graphic Incense Shrine Box */}
              <div className="p-8 rounded-xl bg-stone-950/80 border border-amber-900/40 text-center relative flex flex-col items-center justify-center min-h-[220px]">
                {/* Gold Glow */}
                <div className="w-40 h-40 rounded-full absolute bg-amber-600/10 blur-2xl pointer-events-none" />

                <div className="relative z-10 max-w-md">
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
                    Nguồn Gốc Trầm Hương
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-stone-100 mb-3 font-normal">
                    {activeAroma.agarwoodOrigin}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {activeAroma.scentDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Sacred Bell Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-800/80">
              <button
                onClick={playSingingBellChime}
                disabled={isChiming}
                className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-mono font-medium transition-colors min-h-[44px] flex items-center gap-2"
              >
                <span className={`w-2 h-2 rounded-full ${isChiming ? 'bg-stone-950 animate-ping' : 'bg-stone-950'}`} />
                <span>{isChiming ? 'ĐANG NGÂN VANG CHUÔNG 528Hz' : 'THỈNH TIẾNG CHUÔNG GIA TRÌ 528Hz'}</span>
              </button>

              <span className="text-xs font-mono text-stone-400">
                Tần số cộng hưởng an lạc tâm thức
              </span>
            </div>
          </div>

          {/* Incense Heating Temperature & Safety Details */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Heat Control Slider */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between">
                <label htmlFor="temp-control-slider" className="text-sm font-medium text-stone-200">NHIỆT ĐỘ KHAY XÔNG KHÔNG KHÓI</label>
                <span className="text-xs font-mono text-amber-400 font-semibold">{heatingTemp}°C</span>
              </div>
              <input
                id="temp-control-slider"
                type="range"
                min="100"
                max="250"
                step="5"
                value={heatingTemp}
                onChange={(e) => setHeatingTemp(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-stone-400">
                <span>100°C (Thoang thoảng)</span>
                <span>180°C (Chuẩn mực)</span>
                <span>250°C (Đậm đà)</span>
              </div>
            </div>

            {/* Spiritual & Engineering Norms */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-3">
              <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest">
                Quy Chuẩn Chế Tác Phòng Thờ
              </h4>
              <ul className="text-xs text-stone-300 space-y-2.5 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>100% Gỗ Gõ Đỏ sấy mộc:</strong> Không mối mọt, vân gỗ cuộn xoáy tự nhiên tượng trưng cho vượng khí gia môn.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Dát vàng quỳ 24K:</strong> 9 lớp sơn ta phủ dầu trẩu truyền thống, màu sắc trường tồn cùng thời gian.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">·</span>
                  <span><strong>Khay đồng đúc cách nhiệt 3mm:</strong> Triệt tiêu nguy cơ truyền nhiệt xuống mặt bàn thờ gỗ.</span>
                </li>
              </ul>
            </div>

            {/* Private Consultation Callout */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs flex items-center justify-between">
              <div>
                <span className="text-stone-300 block">Tư vấn không gian thờ phụng gia tộc:</span>
                <span className="text-stone-400 text-[11px] font-mono">Bảo mật & May đo thước Lỗ Ban</span>
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
          GUHOMES SACRED SANCTUARY · XƯỞNG MỘC THẠNH XUÂN 1.200M2 · EMAIL: GUHOMESVN@GMAIL.COM
        </div>
      </div>
    </section>
  )
}
