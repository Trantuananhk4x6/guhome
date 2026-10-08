'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type HoneyGlazeFiring = 'amber-flow' | 'honeycomb-crack' | 'iron-speckle'

interface GlazeFeature {
  id: HoneyGlazeFiring
  title: string
  subtitle: string
  firingTempC: number
  ashSource: string
  tactileSensation: string
  description: string
}

const GLAZE_FEATURES: Record<HoneyGlazeFiring, GlazeFeature> = {
  'amber-flow': {
    id: 'amber-flow',
    title: 'Hổ Phách Hỏa Biến',
    subtitle: 'Wood-fired Amber Run · Dòng Chảy Men Củi',
    firingTempC: 1280,
    ashSource: 'Tro trấu nếp cái hoa vàng & Đất sét phù sa sông Hồng',
    tactileSensation: 'Mịn màng, ấm áp tựa ngọc thạch nung lửa',
    description: 'Ngọn lửa củi nghiến 1.280°C kéo dài 36 giờ tạo nên những vệt men chảy ngẫu nhiên màu mật ong sóng sánh, không chén nào trùng lặp.',
  },
  'honeycomb-crack': {
    id: 'honeycomb-crack',
    title: 'Rạn Tổ Ong Hoàng Cung',
    subtitle: 'Fine Honeycomb Crackle · Đường Rạn Men Tro',
    firingTempC: 1260,
    ashSource: 'Men tro vỏ đậu xanh & Khoáng thạch anh tự nhiên',
    tactileSensation: 'Vân rạn chìm dưới lớp thủy tinh trong veo',
    description: 'Các sợi rạn vi thể hình lục giác ẩn dưới lớp men bóng gương, khi dùng lâu năm nước trà thẩm thấu tạo thành đường kim ngân quý phái.',
  },
  'iron-speckle': {
    id: 'iron-speckle',
    title: 'Điểm Thiết Hoàng Liên',
    subtitle: 'Iron Crystalline Flecks · Chấm Khoáng Sắt Tự Nhiên',
    firingTempC: 1300,
    ashSource: 'Quặng sắt nâu thô mộc Bát Tràng trầm tích',
    tactileSensation: 'Gồ ghề nhẹ tênh, giữ trọn độ bám khi cầm chén',
    description: 'Tinh thể sắt tự nhiên kết tinh lấm tấm như giọt mật đọng trên thân gốm, tôn vinh sắc xanh vàng của trà Shan Tuyết cổ thụ.',
  },
}

export function ArtisanBatTrangHoneyGlazeTeaBowlVault({ className }: { className?: string }) {
  const formId = useId()
  const [selectedGlaze, setSelectedGlaze] = useState<HoneyGlazeFiring>('amber-flow')
  const [rotationAngle, setRotationAngle] = useState<number>(40)
  const [isMicroscopeActive, setIsMicroscopeActive] = useState<boolean>(false)
  const [bowlCount, setBowlCount] = useState<number>(6)

  // Bespoke Order Form State
  const [clanSealText, setClanSealText] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [boxWoodType, setBoxWoodType] = useState('huong-da')
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false)

  // Web Audio Context for High-fired Stoneware "Clink"
  const audioCtxRef = useRef<AudioContext | null>(null)

  function getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null
    if (!audioCtxRef.current) {
      const AudioClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (AudioClass) {
        audioCtxRef.current = new AudioClass()
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const playCeramicClink = () => {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Crisp high-temperature stoneware ring (bell-like frequency)
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(4600, now)
    osc.frequency.exponentialRampToValueAtTime(2400, now + 0.22)

    gain.gain.setValueAtTime(0.18, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.5)
  }

  const currentGlaze = GLAZE_FEATURES[selectedGlaze]

  return (
    <section className={cn('relative py-24 bg-[#0d0c08] text-[#f7f5ec] overflow-hidden border-t border-b border-[#2d2818]', className)}>
      {/* Background Honey Amber Glow Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#382b11] via-[#171206] to-[#0a0803]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1c180b] border border-[#3b3117] text-[#e0b04c] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#e0b04c] animate-pulse" />
            Gốm Cổ Bát Tràng Men Mật Ong Nung Củi 1.280°C
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcf7] tracking-tight leading-tight">
            Bộ Chén Trà Men Mật Ong Hỏa Biến <br className="hidden sm:inline" />
            <span className="italic font-light text-[#e0b04c]">Men Tro Trấu Sông Hồng & Dấu Triện Khắc Đáy</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#aba491] leading-relaxed">
            Tuyển tập 6 chén trà gốm nung củi truyền thống tại lò bầu Bát Tràng ở nhiệt độ 1.280°C. Men mật ong hoàng liên điều chế từ tro trấu nếp cái hoa vàng tạo nên các vệt hỏa biến hổ phách sâu thẳm. Miệng chén vê tay mỏng nhẹ đón dòng trà êm ái, thân chén dày giữ nhiệt chống bỏng tay. Mã chứng nhận độc bản <span className="font-mono text-[#e0b04c]">GU-TEABOWL-2026-X</span>.
          </p>
        </div>

        {/* Master Interactive Bowl Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 360° Bowl Viewer & 20x Ash Bubble Microscope (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#181409] to-[#0e0c05] border border-[#302713] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Virtual Stage Viewport */}
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-[#0a0803] border border-[#211a0c] flex flex-col justify-between p-6">
                {/* Honey Glaze Lustre Glow */}
                <div 
                  className="absolute inset-0 opacity-35 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, rgba(224, 176, 76, 0.25) 0%, transparent 68%)`,
                  }}
                />

                {/* Top Toolbar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tracking-widest text-[#9e9681] uppercase">Góc Xoay 3D</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1e190b] text-[#e0b04c] border border-[#3b3117]">
                      {rotationAngle}°
                    </span>
                  </div>

                  {/* 20x Microscope Mode Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsMicroscopeActive(!isMicroscopeActive)}
                    className={cn(
                      'min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 border',
                      isMicroscopeActive
                        ? 'bg-[#e0b04c]/20 border-[#e0b04c] text-[#fff]'
                        : 'bg-[#181308] border-[#2e230e] text-[#aba491] hover:border-[#e0b04c]'
                    )}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    {isMicroscopeActive ? 'Tắt Kính Phóng Đại' : 'Kính Phóng Đại 20x Soi Bọt Tro Trấu'}
                  </button>
                </div>

                {/* Center Bowl Illustration */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  {isMicroscopeActive ? (
                    /* 20x Microscope Zoom View */
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative w-56 h-56 rounded-full border-2 border-[#e0b04c] overflow-hidden bg-[#1a1408] shadow-[0_0_30px_rgba(224,176,76,0.3)] flex items-center justify-center p-4 text-center"
                    >
                      <div 
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage: `radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8) 1.5px, transparent 1.5px), radial-gradient(circle at 60% 70%, #d49a37 2.5px, transparent 2.5px), radial-gradient(circle at 20% 75%, #3d2c10 2px, transparent 2px)`,
                          backgroundSize: '16px 16px',
                        }}
                      />
                      <div className="relative z-10 text-xs text-[#fdfcf7] space-y-1">
                        <div className="font-mono text-[#e0b04c] font-bold text-sm tracking-wider">PHÓNG ĐẠI 20X</div>
                        <p className="text-[11px] text-[#ded7c0] leading-tight">
                          Bọt khí tro trấu tự nhiên & Men hỏa biến hổ phách nung củi 1.280°C.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    /* 3D Rotating Tea Bowl Silhouette */
                    <motion.div
                      style={{ rotate: rotationAngle }}
                      className="relative w-48 h-36 flex items-center justify-center cursor-grab active:cursor-grabbing"
                    >
                      {/* Tea Bowl Graphic SVG */}
                      <svg viewBox="0 0 180 140" className="w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]">
                        {/* Bowl Body */}
                        <path
                          d="M 25 35 C 30 95 65 125 90 125 C 115 125 150 95 155 35 C 130 42 50 42 25 35 Z"
                          fill="#b8782a"
                          stroke="#734714"
                          strokeWidth="2.5"
                        />
                        {/* Amber Drip Glaze Run (Men Chảy) */}
                        <path
                          d="M 40 40 Q 60 70 65 50 Q 80 85 90 60 Q 110 90 120 48 Q 140 75 145 38 Z"
                          fill="#e0b04c"
                          opacity="0.85"
                        />
                        {/* Rim Highlight */}
                        <ellipse cx="90" cy="38" rx="64" ry="10" fill="none" stroke="#f0cca0" strokeWidth="1.5" />
                        {/* Foot Ring (Chân Đế) */}
                        <rect x="75" y="125" width="30" height="6" rx="2" fill="#523410" stroke="#33200a" strokeWidth="1" />
                        {/* GuHomes Seal Stamp on Bottom Foot */}
                        <text x="90" y="121" textAnchor="middle" fill="#523410" fontSize="7" fontFamily="serif" fontWeight="bold">
                          GU
                        </text>
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Bottom Sound & Acoustic Test */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#211a0c] bg-[#0c0904]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <button
                    type="button"
                    onClick={playCeramicClink}
                    className="min-h-[44px] px-3.5 py-1.5 rounded-lg bg-[#1a1408] border border-[#332812] text-[#e0b04c] text-xs font-mono hover:bg-[#261f0d] transition-colors"
                  >
                    Nghe Tiếng Chuông Gốm Nung Củi
                  </button>

                  <div className="text-xs text-[#9e9681]">
                    Bộ {bowlCount} Chén Trà Kèm Hộp Gỗ Hương Đá
                  </div>
                </div>
              </div>

              {/* 360 Slider */}
              <div className="pt-4">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#9e9681]">Xoay 360° Quan Sát Vệt Hỏa Biến Men Chảy</span>
                  <span className="text-[#e0b04c] font-bold">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#1a1408] rounded-lg appearance-none cursor-pointer accent-[#e0b04c]"
                  aria-label="Xoay chén trà 360 độ"
                />
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-[#0f0c05] border border-[#211a0c]">
                  <span className="text-[10px] text-[#7d7560] block uppercase tracking-wider font-mono">Dòng Men</span>
                  <span className="text-sm font-semibold text-[#f7f5ec]">Men Mật Ong</span>
                  <span className="text-[10px] text-[#5c5543] block mt-0.5">Tro trấu nếp cái hoa vàng</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f0c05] border border-[#211a0c]">
                  <span className="text-[10px] text-[#7d7560] block uppercase tracking-wider font-mono">Nhiệt Độ Lò</span>
                  <span className="text-sm font-mono font-bold text-[#e0b04c]">{currentGlaze.firingTempC}°C</span>
                  <span className="text-[10px] text-[#5c5543] block mt-0.5">Lò bầu củi nghiến 36h</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f0c05] border border-[#211a0c]">
                  <span className="text-[10px] text-[#7d7560] block uppercase tracking-wider font-mono">Miệng Chén</span>
                  <span className="text-sm font-semibold text-[#f7f5ec]">Vê Tay Siêu Mỏng</span>
                  <span className="text-[10px] text-[#5c5543] block mt-0.5">Ôm trọn bờ môi khi nhấp</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0f0c05] border border-[#211a0c]">
                  <span className="text-[10px] text-[#7d7560] block uppercase tracking-wider font-mono">Ấn Triện Đáy</span>
                  <span className="text-xs font-mono font-bold text-[#e0b04c]">GU-TEABOWL</span>
                  <span className="text-[10px] text-[#5c5543] block mt-0.5">Dập chìm có chứng thư</span>
                </div>
              </div>
            </div>

            {/* Cultural & Ceramic Craft Rationale */}
            <div className="p-6 rounded-2xl bg-[#110e06] border border-[#261f0d] text-sm text-[#aba491] space-y-3">
              <h3 className="text-base font-serif text-[#fdfcf7] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#e0b04c] rounded-full" />
                Nghệ Thuật Hỏa Biến Men Tro Trấu Cổ Truyền Bát Tràng
              </h3>
              <p className="leading-relaxed">
                Men mật ong hoàng liên nung củi là đỉnh cao kỹ nghệ của gốm men Bát Tràng. Không dùng oxit kim loại công nghiệp, nghệ nhân tận dụng tro của vỏ trấu nếp kết hợp khoáng thạch anh tự nhiên. Khi gặp luồng lửa củi nung khử, tro tan chảy tạo nên lớp màng thủy tinh sâu thẳm, giữ nhiệt cho nước trà mà không hề làm cay xé vị ngọt hậu của trà cổ thụ.
              </p>
            </div>
          </div>

          {/* Right Column: Glaze Selector & Bespoke Order Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Glaze Selector */}
            <div className="rounded-2xl bg-[#181409] border border-[#302713] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#9e9681]">
                Hiệu Ứng Hỏa Biến Men Tro Trấu
              </h3>

              <div className="space-y-3">
                {(Object.keys(GLAZE_FEATURES) as HoneyGlazeFiring[]).map((gKey) => {
                  const item = GLAZE_FEATURES[gKey]
                  const isSelected = selectedGlaze === gKey
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedGlaze(gKey)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#241c0b] border-[#e0b04c] shadow-[0_0_15px_rgba(224,176,76,0.18)]'
                          : 'bg-[#100c05] border-[#211a0b] hover:border-[#382b12]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fdfcf7] font-semibold' : 'text-[#cfc8b5]')}>
                          {item.title}
                        </span>
                        <span className="text-xs font-mono text-[#e0b04c] font-bold">
                          {item.firingTempC}°C
                        </span>
                      </div>
                      <span className="text-xs text-[#8c826e] mt-1">{item.subtitle}</span>
                      <p className="text-xs text-[#aba491] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bespoke Seal & Box Order Form */}
            <div className="rounded-2xl bg-[#181409] border border-[#302713] p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-wider font-mono text-[#9e9681]">
                  Khắc Dấu Triện & Đóng Hộp Gỗ Quý
                </h3>
                <span className="text-xs font-mono text-[#e0b04c]">Bộ 6 Chén May Đo</span>
              </div>

              {isOrderSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#e0b04c]/20 border border-[#e0b04c] flex items-center justify-center text-[#e0b04c] text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg text-[#fdfcf7]">Hồ Sơ Đặt Chế Tác Đã Lưu</h4>
                  <p className="text-xs text-[#aba491] leading-relaxed">
                    Nghệ nhân gốm GuHomes sẽ chuẩn bị mộc khắc triện cho trà nhân {clientName || ''} và liên hệ qua số {clientPhone || ''} trước khi bắt đầu nung lò củi.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOrderSubmitted(false)}
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-[#211808] border border-[#3b2d12] text-[#e0b04c] text-xs font-mono uppercase"
                  >
                    Tạo Yêu Cầu Khác
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setIsOrderSubmitted(true)
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`${formId}-count`} className="block text-xs font-mono text-[#9e9681] mb-1">
                        Số Lượng Chén
                      </label>
                      <select
                        id={`${formId}-count`}
                        value={bowlCount}
                        onChange={(e) => setBowlCount(parseInt(e.target.value, 10))}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ec] text-xs font-mono focus:border-[#e0b04c] focus:outline-none"
                      >
                        <option value="2">Bộ 2 Chén (Song Ẩm Tri Âm)</option>
                        <option value="6">Bộ 6 Chén (Lục Hợp Khánh Thọ)</option>
                        <option value="8">Bộ 8 Chén (Bát Tiên Quần Tụ)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-box`} className="block text-xs font-mono text-[#9e9681] mb-1">
                        Hộp Đựng Gỗ Quý
                      </label>
                      <select
                        id={`${formId}-box`}
                        value={boxWoodType}
                        onChange={(e) => setBoxWoodType(e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ec] text-xs focus:border-[#e0b04c] focus:outline-none"
                      >
                        <option value="huong-da">Gỗ Hương Đá Khóa Đồng</option>
                        <option value="hoang-dan">Gỗ Hoàng Đàn Tuyết Cao Cấp</option>
                        <option value="go-mun">Gỗ Mun Sọc Bọc Lụa Tơ Tằm</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-seal`} className="block text-xs font-mono text-[#9e9681] mb-1">
                      Chữ Triện Riêng Dập Đáy Chén
                    </label>
                    <input
                      id={`${formId}-seal`}
                      type="text"
                      value={clanSealText}
                      onChange={(e) => setClanSealText(e.target.value)}
                      placeholder="Ví dụ: Trần Gia Trà Các, Tĩnh Tâm Đường..."
                      className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ec] text-xs focus:border-[#e0b04c] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-xs font-mono text-[#9e9681] mb-1">
                        Họ và Tên *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nguyễn Tuấn Anh"
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ec] text-xs focus:border-[#e0b04c] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-phone`} className="block text-xs font-mono text-[#9e9681] mb-1">
                        Số Điện Thoại *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="0912 xxx xxx"
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ec] text-xs font-mono focus:border-[#e0b04c] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#e0b04c] to-[#b88930] text-[#0f0b04] font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:brightness-110 shadow-lg mt-2"
                  >
                    Đặt Chế Tác Bộ Chén Trà Bát Tràng Độc Bản
                  </button>
                </form>
              )}
            </div>

            {/* Atelier Contact */}
            <div className="p-4 rounded-2xl bg-[#110e06] border border-[#261f0d] text-xs text-[#9e9681] flex items-center justify-between">
              <div>
                <span className="text-[#fdfcf7] font-serif block">GuHomes Ceramic Atelier</span>
                <span className="text-[11px] text-[#706856]">Lò Bầu Nung Củi Cổ Bát Tràng</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#e0b04c] font-mono hover:underline min-h-[44px] flex items-center"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
