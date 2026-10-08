'use client'

import React, { useState, useEffect, useRef } from 'react'

interface HerbVarietyProfile {
  id: string
  name: string
  scientificName: string
  scentProfile: string
  pm25FiltrationEfficiency: number
  wateringCycleHours: number
  ecLevel: number
  phLevel: number
  frequencyHz: number
}

const HERB_VARIETIES: HerbVarietyProfile[] = [
  {
    id: 'southern-mint',
    name: 'Bạc Hà Rừng Nam Bộ',
    scientificName: 'Mentha arvensis',
    scentProfile: 'Hương the mát thanh lọc đường thở, xua tan nồm ẩm và tạo sảng khoái tinh thần buổi sáng.',
    pm25FiltrationEfficiency: 82,
    wateringCycleHours: 4,
    ecLevel: 1.6,
    phLevel: 6.2,
    frequencyHz: 360,
  },
  {
    id: 'holy-basil',
    name: 'Hương Nhu Tía Sài Gòn',
    scientificName: 'Ocimum gratissimum',
    scentProfile: 'Hương trầm đượm nồng tinh dầu Eugenol, kháng khuẩn không khí và xua đuổi côn trùng mùa mưa.',
    pm25FiltrationEfficiency: 88,
    wateringCycleHours: 6,
    ecLevel: 1.8,
    phLevel: 6.0,
    frequencyHz: 280,
  },
  {
    id: 'tropical-thyme',
    name: 'Xạ Hương Nhiệt Đới Thảo Điền',
    scientificName: 'Thymus vulgaris L.',
    scentProfile: 'Hương cỏ cây êm dịu, giúp giảm căng thẳng sau ngày làm việc bận rộn tại trung tâm thành phố.',
    pm25FiltrationEfficiency: 79,
    wateringCycleHours: 8,
    ecLevel: 1.4,
    phLevel: 6.5,
    frequencyHz: 420,
  },
]

export function SaigonRiversideHydroponicAromaticHerbSanctuary() {
  const [selectedHerbIdx, setSelectedHerbIdx] = useState<number>(0)
  const [waterFlowRate, setWaterFlowRate] = useState<number>(8)
  const [isPlayingWaterFlow, setIsPlayingWaterFlow] = useState<boolean>(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  const activeHerb = HERB_VARIETIES[selectedHerbIdx] ?? HERB_VARIETIES[0]!

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

      if (oscRef.current) {
        try {
          oscRef.current.stop()
          oscRef.current.disconnect()
        } catch {
          // Ignore
        }
      }

      const osc = audioContextRef.current.createOscillator()
      const gain = audioContextRef.current.createGain()
      const filter = audioContextRef.current.createBiquadFilter()

      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(activeHerb.frequencyHz, audioContextRef.current.currentTime)
      filter.Q.setValueAtTime(4.0, audioContextRef.current.currentTime)

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(activeHerb.frequencyHz * 1.2, audioContextRef.current.currentTime)

      gain.gain.setValueAtTime(0.001, audioContextRef.current.currentTime)
      gain.gain.linearRampToValueAtTime(0.06, audioContextRef.current.currentTime + 0.2)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioContextRef.current.destination)

      osc.start()
      oscRef.current = osc
      gainRef.current = gain
      setIsPlayingWaterFlow(true)
    } catch {
      // Audio fallback gracefully handled
    }
  }

  const stopWaterSound = () => {
    if (gainRef.current && audioContextRef.current) {
      try {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.2)
        setTimeout(() => {
          if (oscRef.current) {
            try {
              oscRef.current.stop()
              oscRef.current.disconnect()
            } catch {
              // Ignore
            }
            oscRef.current = null
          }
          setIsPlayingWaterFlow(false)
        }, 200)
      } catch {
        setIsPlayingWaterFlow(false)
      }
    } else {
      setIsPlayingWaterFlow(false)
    }
  }

  useEffect(() => {
    if (isPlayingWaterFlow) {
      startWaterSound()
    }
    return () => {
      if (oscRef.current) {
        try {
          oscRef.current.stop()
        } catch {
          // Cleanup
        }
      }
    }
  }, [selectedHerbIdx])

  return (
    <section className="relative w-full py-20 bg-stone-950 text-stone-100 overflow-hidden border-t border-stone-800/80">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.25),transparent_70%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-mono tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Sinh Thái Thủy Canh & Vi Khí Hậu Logia
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-100 leading-tight">
            Thảo Viên Thủy Canh Ống Đồng Đỏ Hướng Sông
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base leading-relaxed">
            Khu vườn dược liệu tuần hoàn bằng ống đồng đỏ mộc và khay đất nung Bát Tràng xốp thở nano. 
            Lọc sạch tới 88% bụi mịn PM2.5 từ gió sông Sài Gòn, ướp hương thơm sảng khoái cho từng góc sống thượng lưu.
          </p>
        </div>

        {/* Herb Varieties Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {HERB_VARIETIES.map((herb, idx) => {
            const isSelected = idx === selectedHerbIdx
            return (
              <button
                key={herb.id}
                onClick={() => setSelectedHerbIdx(idx)}
                className={`p-5 rounded-xl text-left transition-all duration-300 border min-h-[44px] flex flex-col justify-between ${
                  isSelected
                    ? 'bg-stone-900 border-emerald-700/80 shadow-lg shadow-emerald-950/40 translate-y-[-2px]'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-emerald-400 font-medium">GIỐNG DƯỢC LIỆU 0{idx + 1}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-emerald-300">
                      LỌC BỤI {herb.pm25FiltrationEfficiency}%
                    </span>
                  </div>
                  <h3 className="text-base font-medium text-stone-100 mb-0.5">{herb.name}</h3>
                  <span className="text-[11px] font-mono italic text-stone-500 block mb-2">{herb.scientificName}</span>
                  <p className="text-xs text-stone-400 leading-relaxed line-clamp-2">{herb.scentProfile}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400">Chu kỳ tưới tuần hoàn:</span>
                  <span className={`font-semibold ${isSelected ? 'text-emerald-300' : 'text-stone-300'}`}>
                    Mỗi {herb.wateringCycleHours} Giờ
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Interactive Hydroponic Dashboard */}
        <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Copper Hydroponic Grid */}
            <div className="lg:col-span-6 bg-stone-950 border border-stone-800 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[340px]">
              <div className="flex items-center justify-between text-xs font-mono text-stone-400">
                <span>HỆ GIÀN ĐỒNG ĐỎ MỘC TUẦN HOÀN</span>
                <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  ĐỘ ẨM LÔ GIA: 78% RH
                </span>
              </div>

              {/* Graphic Copper Pipes & Water Droplets */}
              <div className="my-8 flex flex-col items-center justify-center py-6 relative">
                {/* 3 Horizontal Copper Pipes */}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-56 h-3 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 rounded-full my-3 shadow-md relative flex justify-around items-center">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="w-2 h-2 rounded-full bg-emerald-400/80 shadow-sm" />
                    ))}
                  </div>
                ))}

                <div className="mt-4 text-center">
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                    Hệ Thống Thủy Canh Hồi Lưu
                  </span>
                  <span className="text-sm text-stone-200 font-light">{activeHerb.scentProfile}</span>
                </div>
              </div>

              {/* Water Droplet Sound Trigger */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-800/80">
                <button
                  onClick={isPlayingWaterFlow ? stopWaterSound : startWaterSound}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-medium text-xs font-mono transition-colors min-h-[44px]"
                >
                  {isPlayingWaterFlow ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-stone-950 animate-ping" />
                      DỪNG THỦY ÂM HỒI LƯU
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      LẮNG NGHE THỦY ÂM GIÀN ĐỒNG
                    </>
                  )}
                </button>

                <div className="text-right font-mono text-xs text-emerald-400">
                  {isPlayingWaterFlow ? 'ĐANG TUẦN HOÀN' : 'TỰ ĐỘNG THEO GIỜ'}
                </div>
              </div>
            </div>

            {/* Metrics & Custom Flow Slider */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h4 className="text-lg font-serif text-stone-100 mb-1">Chỉ Số Dưỡng Chất & Lọc Khí</h4>
                <p className="text-xs text-stone-400">
                  Kiểm soát nồng độ vi lượng thời gian thực cho từng khay gốm nano.
                </p>
              </div>

              {/* Metric Indicators */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block mb-1">ĐỘ DẪN ĐIỆN EC DƯỠNG CHẤT</span>
                  <span className="text-2xl font-mono text-emerald-300 font-light">
                    {activeHerb.ecLevel} <span className="text-sm">mS/cm</span>
                  </span>
                  <span className="text-[11px] text-stone-500 block mt-1">Độ phì nhiêu tối ưu rễ cây</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800">
                  <span className="text-xs font-mono text-stone-400 block mb-1">ĐỘ PH NƯỚC NGUYÊN BẢN</span>
                  <span className="text-2xl font-mono text-cyan-300 font-light">{activeHerb.phLevel} pH</span>
                  <span className="text-[11px] text-stone-500 block mt-1">Chuẩn nước kiềm vi khoáng</span>
                </div>
              </div>

              {/* Custom Flow Slider */}
              <div className="p-5 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <label htmlFor="flow-rate-herbs" className="text-stone-300 font-medium">LƯU LƯỢNG NƯỚC BƠM HỒI LƯU</label>
                  <span className="text-emerald-400 font-semibold">{waterFlowRate} Lít/giờ</span>
                </div>
                <input
                  id="flow-rate-herbs"
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={waterFlowRate}
                  onChange={(e) => setWaterFlowRate(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500 h-2 bg-stone-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-500">
                  <span>2L (Nhỏ giọt rễ)</span>
                  <span>10L (Tiêu chuẩn Sài Gòn)</span>
                  <span>20L (Rửa trôi bụi mịn)</span>
                </div>
              </div>

              {/* Craftsmanship Note */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-xs text-emerald-200/90 leading-relaxed font-sans">
                <strong className="text-emerald-300 block mb-1 font-mono uppercase text-[11px] tracking-wider">
                  Quy Chuẩn Vật Liệu Sạch GuHomes:
                </strong>
                Hệ ống đồng nguyên chất 99.9% tự sản sinh ion kháng khuẩn tự nhiên, triệt tiêu rêu mốc trong nước. 
                Gốm nung Bát Tràng giữ rễ luôn thoáng khí dưới nắng nóng 36 độ C của Sài Gòn.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Contact Direct Line */}
        <div className="text-center text-xs font-mono text-stone-400">
          <span>TƯ VẤN THIẾT KẾ THẢO VIÊN LOGIA BESPOKE: </span>
          <a
            href="tel:0368757916"
            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 ml-1 font-semibold"
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
