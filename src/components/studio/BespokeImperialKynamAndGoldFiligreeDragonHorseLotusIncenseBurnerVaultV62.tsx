'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KynamVaultMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV62() {
  const [temperature, setTemperature] = useState<number>(180)
  const [soundscapeActive, setSoundscapeActive] = useState<boolean>(false)
  const [selectedRitualStage, setSelectedRitualStage] = useState<number>(0)
  const [mistDiffusionActive, setMistDiffusionActive] = useState<boolean>(true)

  // Web Audio Context & Nodes
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopAudio = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop()
        osc1Ref.current.disconnect()
        osc1Ref.current = null
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop()
        osc2Ref.current.disconnect()
        osc2Ref.current = null
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect()
        gainNodeRef.current = null
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
        audioCtxRef.current = null
      }
    } catch {
      // Safe cleanup catch
    }
  }

  const startAudio = () => {
    stopAudio()
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz (Tần số chuyển hóa sinh học & tĩnh tại)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc1Ref.current = osc1

      // Hòa âm 741Hz (Tần số thanh lọc không gian tâm linh)
      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(741, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      osc2Ref.current = osc2
    } catch {
      // Audio autoplay restrictions catch
    }
  }

  const toggleSoundscape = () => {
    if (soundscapeActive) {
      stopAudio()
      setSoundscapeActive(false)
    } else {
      startAudio()
      setSoundscapeActive(true)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const metrics: KynamVaultMetric[] = [
    {
      label: 'Nhiệt Độ Vi Điều Khiển',
      value: `${temperature}°C`,
      subtext: 'Dải gia nhiệt 80°C - 240°C',
      detail: 'Kiểm soát nhiệt độ không khói bằng vi xử lý bán dẫn Thụy Sĩ, giải phóng trọn vẹn từng tầng hương ngọt sâu của Kỳ Nam.'
    },
    {
      label: 'Kỳ Nam Tự Nhiên',
      value: 'Thanh Kỳ Nam',
      subtext: 'Khánh Hòa rừng sâu tự nhiên',
      detail: 'Tỷ lệ tích lũy tinh dầu xanh biếc 95%, hương thơm ngọt mát thanh nhã, duy trì thanh khí thư phòng bất biến.'
    },
    {
      label: 'Vàng 24K Filigree',
      value: 'Thế Thứ 62',
      subtext: 'Long Mã hồi triều khai vận',
      detail: 'Chế tác thủ công bởi nghệ nhân kim hoàn hoàng gia, 62 cánh sen vàng uốn lượn ôm trọn linh vật Long Mã cõng đồ thư.'
    },
    {
      label: 'Án Thờ Trầm Hương',
      value: '400 Năm',
      subtext: 'Gỗ Trầm Hương Rừng nguyên khối',
      detail: 'Gỗ Trầm Hương Rừng Khánh Hòa nguyên khối ngát hương thanh khiết, tỷ trọng 0.88 g/cm³, kháng ẩm mốc tuyệt đối.'
    }
  ]

  const ritualStages = [
    {
      name: 'Khởi Hương: Khai Thông Thanh Khí (80°C - 120°C)',
      desc: 'Nhiệt lượng nhẹ nhàng kích hoạt tinh dầu Kỳ Nam bay hơi ở tầng thanh nhẹ nhất. Mùi hoa cỏ ban mai lan tỏa, thanh lọc năng lượng trong gian thất.',
      scentNote: 'Hương thanh tao, sương sớm rừng sâu, nhẹ nhàng đánh thức các giác quan'
    },
    {
      name: 'Định Tâm: Trầm Lắng Trí Huệ (130°C - 180°C)',
      desc: 'Nhiệt độ tối ưu làm bốc hơi tinh chất Kỳ Nam cô đặc. Hương mật ong ngào ngạt phối cùng vị quế hồi dịu êm, đem lại sự an tịnh và minh mẫn tuyệt đối.',
      scentNote: 'Hương mật ngọt sâu, vị thanh thoát quý tộc, tĩnh lặng tâm thức'
    },
    {
      name: 'Viên Mãn: Lưu Luyến Không Gian (190°C - 240°C)',
      desc: 'Các phân tử hương gỗ ấm áp lắng đọng sâu vào từng thớ gỗ và bề mặt nội thất tự nhiên, lưu giữ phong thủy thịnh vượng suốt 72 giờ.',
      scentNote: 'Hương gỗ quý lưu niên, bền bỉ và trang nghiêm nhiều ngày'
    }
  ]

  return (
    <section className="relative w-full overflow-hidden bg-[#0D0B08] py-20 md:py-32 text-[#EAE5D9]">
      {/* Background Ambience */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 35%, rgba(184, 134, 11, 0.22) 0%, rgba(13, 11, 8, 0.95) 75%)`
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#D4AF37] mb-3">
            Bảo Thất Hoàng Gia May Đo · Phiên Bản V62
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#F4F1EA] tracking-tight leading-tight">
            Bảo Thất Đỉnh Lư Kim Long Mã & Thanh Kỳ Nam Trên Án Trầm Hương 400 Năm V62
          </h2>
          <div className="w-16 h-px bg-[#D4AF37] mx-auto my-6 opacity-60" />
          <p className="text-base sm:text-lg text-[#C5BFA8] font-light leading-relaxed">
            Tuyệt tác phong thủy thư phòng dành cho giới tinh hoa. Đỉnh lư Vàng 24K Filigree Long Mã dâng sen thế thứ 62 đặt trên án gỗ Trầm Hương Rừng Khánh Hòa 400 năm tuổi nguyên khối, kết hợp vi điều nhiệt gia hương không khói chuẩn Thụy Sĩ.
          </p>
        </div>

        {/* Interactive Controls & Vault Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Visualizer Panel */}
          <div className="lg:col-span-8 bg-[#16120D] rounded-2xl p-6 sm:p-8 border border-[#3A2F1C] shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#2C2315]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37]">Điều Nhiệt Bán Dẫn Vi Khí Tán</span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F4F1EA]">Hương Đạo Không Khói Hoàng Gia</h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  aria-label="Kích hoạt chuông vàng Solfeggio 528Hz & 741Hz"
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs tracking-wider transition-all duration-300 flex items-center gap-2 border ${
                    soundscapeActive
                      ? 'bg-[#B8860B] text-white border-[#E5C158] shadow-lg shadow-[#B8860B]/30'
                      : 'bg-[#221A12] text-[#D4AF37] border-[#3E301F] hover:border-[#B8860B]'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${soundscapeActive ? 'bg-[#FFE57F] animate-pulse' : 'bg-[#735824]'}`} />
                  {soundscapeActive ? 'Chuông Vàng 528Hz + 741Hz (Đang Phát)' : 'Bật Chuông Tĩnh Tâm'}
                </button>
              </div>
            </div>

            {/* Central Graphic Display */}
            <div className="relative aspect-[16/10] my-8 rounded-xl bg-[#0E0C08] border border-[#2D2416] overflow-hidden flex items-center justify-center">
              {/* Gold Filigree Mandala Pattern */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 6" />
                  <circle cx="50%" cy="50%" r="28%" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
                  <circle cx="50%" cy="50%" r="16%" fill="none" stroke="#B8860B" strokeWidth="2" strokeDasharray="8 8" />
                </svg>
              </div>

              {/* Incense Burner Centerpiece */}
              <motion.div 
                className="relative z-10 w-48 h-48 sm:w-60 sm:h-60 rounded-full border border-[#D4AF37]/50 bg-[#1D1710]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 shadow-2xl"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              >
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1">Nhiệt Gia Hưởng</div>
                  <div className="text-3xl sm:text-4xl font-serif text-[#F4F1EA] font-semibold">{temperature}°C</div>
                  <div className="text-[11px] text-[#B8860B] mt-1 font-mono">Thanh Kỳ Nam Rừng Già</div>
                  <div className="text-[10px] text-[#D4AF37]/80 mt-2">Khuếch tán: Không khói</div>
                </div>
              </motion.div>

              {/* Pedestal Tag */}
              <div className="absolute top-6 left-8 bg-[#1D1710]/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#3A2F1C]">
                <div className="text-[10px] text-[#D4AF37] uppercase tracking-wider">Án Thờ Nguyên Khối</div>
                <div className="text-xs font-serif text-[#EAE5D9]">Trầm Hương Rừng 400 Năm</div>
              </div>

              {/* Filigree Stat Tag */}
              <div className="absolute bottom-6 right-8 text-right bg-[#1D1710]/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-[#3A2F1C]">
                <div className="text-[10px] text-[#D4AF37] uppercase tracking-wider">Thế Thứ 62</div>
                <div className="text-xs font-mono text-[#FFE57F]">62 Cánh Sen Vàng 24K</div>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#2C2315]">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="temp-slider-v62" className="text-xs text-[#C5BFA8] uppercase tracking-wider">
                    Điều Chỉnh Nhiệt Độ: <span className="text-[#F4F1EA] font-semibold">{temperature}°C</span>
                  </label>
                  <span className="text-xs text-[#D4AF37] font-mono">80°C - 240°C</span>
                </div>
                <input
                  id="temp-slider-v62"
                  type="range"
                  min="80"
                  max="240"
                  step="1"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full h-2 bg-[#2D2416] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setMistDiffusionActive(!mistDiffusionActive)}
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs tracking-wider transition-all duration-200 border ${
                    mistDiffusionActive
                      ? 'bg-[#2E2313] text-[#FFE57F] border-[#664E1C]'
                      : 'bg-[#1C1710] text-[#9A8768] border-[#362A19]'
                  }`}
                >
                  {mistDiffusionActive ? 'Tán Khí Tinh Dầu: Bật' : 'Tán Khí: Tạm Dừng'}
                </button>
                <button
                  type="button"
                  onClick={() => setTemperature(180)}
                  className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg text-xs tracking-wider bg-[#221A12] text-[#D4AF37] border border-[#3E301F] hover:border-[#D4AF37] transition-all"
                >
                  Nhiệt Tối Ưu 180°C
                </button>
              </div>
            </div>
          </div>

          {/* Ritual Stages Panel */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#D4AF37] block mb-2">Tam Đoạn Hương Đạo Hoàng Gia</span>
            {ritualStages.map((stage, idx) => (
              <div
                key={stage.name}
                onClick={() => setSelectedRitualStage(idx)}
                className={`cursor-pointer rounded-xl p-5 border transition-all duration-300 ${
                  selectedRitualStage === idx
                    ? 'bg-[#201911] border-[#D4AF37] shadow-lg'
                    : 'bg-[#15110B]/80 border-[#2A2012] hover:border-[#4A3920]'
                }`}
              >
                <h4 className={`text-base font-serif font-medium mb-1 ${selectedRitualStage === idx ? 'text-[#F4F1EA]' : 'text-[#C5BFA8]'}`}>
                  {stage.name}
                </h4>
                <p className="text-xs text-[#A89F8B] leading-relaxed mb-3">
                  {stage.desc}
                </p>
                <div className="text-[11px] font-mono text-[#D4AF37] bg-[#0E0C08] px-2.5 py-1 rounded inline-block">
                  {stage.scentNote}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div 
              key={metric.label}
              className="bg-[#16120D] rounded-xl p-6 border border-[#2D2416] relative group hover:border-[#D4AF37] transition-all duration-300"
            >
              <div className="text-xs uppercase tracking-wider text-[#D4AF37] mb-1">{metric.label}</div>
              <div className="text-3xl font-serif font-semibold text-[#F4F1EA] mb-1">{metric.value}</div>
              <div className="text-xs text-[#E5C158] font-medium mb-3">{metric.subtext}</div>
              <p className="text-xs text-[#9A8F7B] leading-relaxed border-t border-[#261E12] pt-3">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-xs text-[#8A7C64] max-w-2xl mx-auto font-light leading-relaxed">
          Tác phẩm được GuHomes nghiên cứu và hoàn thiện theo quy chuẩn lễ nhạc và phong thủy cung đình triều Nguyễn, chế tác may đo độc bản cho từng không gian gia đạo.
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV62
