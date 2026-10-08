'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type RattanPatternType = 'mat-cao' | 'luc-giac' | 'chu-thap'

interface RattanCraftDetail {
  id: RattanPatternType
  title: string
  subtitle: string
  densityPoresPerCm2: number
  weaveMeaning: string
  silverMotif: string
  description: string
}

const RATTAN_PATTERNS: Record<RattanPatternType, RattanCraftDetail> = {
  'mat-cao': {
    id: 'mat-cao',
    title: 'Mắt Cáo Cung Đình',
    subtitle: 'Octagonal Caning · Bao La Cổ Bản',
    densityPoresPerCm2: 24,
    weaveMeaning: 'Hòa khí âm dương, sự thông suốt luân chuyển khí vận và thanh lọc tà khí cho gia môn',
    silverMotif: 'Bạc 999 Chạm Lộng Long Vân Triều Nguyệt trên vành miệng',
    description: 'Từng sợi mây nước bóc vỏ thủ công, chuốt mỏng 0.8mm đan cài 8 hướng tạo hình mắt cáo kinh điển của làng nghề đan lát Bao La bên bờ sông Bồ xứ Huế.',
  },
  'luc-giac': {
    id: 'luc-giac',
    title: 'Lục Giác Kim Quy',
    subtitle: 'Hexagonal Tortoise Shell · Trường Thọ Bền Bỉ',
    densityPoresPerCm2: 32,
    weaveMeaning: 'Đại diện cho sự vững chãi, trường thọ bất biến và gia phong thịnh vượng bền vững',
    silverMotif: 'Bạc 999 Chạm Nổi Hoa Văn Sóng Nước & Cánh Sen Cung Đình',
    description: 'Kết cấu đan nan 6 cạnh lồng ghép sợi tre già ngâm bùn chống mối mọt tự nhiên, ôm khít thân gốm sành nung củi tạo lớp đệm cách nhiệt tuyệt hảo.',
  },
  'chu-thap': {
    id: 'chu-thap',
    title: 'Chữ Thập Vạn Tự',
    subtitle: 'Cruciform Wan · Phúc Lộc Vô Biên',
    densityPoresPerCm2: 28,
    weaveMeaning: 'Biểu trưng cho điềm lành vô tận, may mắn sinh sôi và gắn kết keo sơn giữa các thế hệ',
    silverMotif: 'Bạc 999 Khảm Tứ Linh Long Lân Quy Phụng tinh xảo',
    description: 'Nút thắt chữ thập dày dặn đan xen chỉ bạc ánh kim, tôn vinh kỹ nghệ mộc mây tre Việt Nam đạt đẳng cấp nghệ thuật cung đình.',
  },
}

export function ArtisanRattanSilverWineSetVault({ className }: { className?: string }) {
  const formId = useId()
  const [selectedPattern, setSelectedPattern] = useState<RattanPatternType>('mat-cao')
  const [rotationAngle, setRotationAngle] = useState<number>(30)
  const [isMicroscopeActive, setIsMicroscopeActive] = useState<boolean>(false)
  const [pipeCount, setPipeCount] = useState<number>(4)

  // Custom Bespoke Engraving Order Form
  const [clanSealName, setClanSealName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [ownerPhone, setOwnerPhone] = useState('')
  const [woodTrayType, setWoodTrayType] = useState('gu-lau')
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false)

  // Web Audio Context for Silver Clink & Ceramic Tap
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

  const playSilverAcoustic = () => {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Pure 999 silver bell chime
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(4200, now)
    osc.frequency.exponentialRampToValueAtTime(2100, now + 0.3)

    gain.gain.setValueAtTime(0.18, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.6)
  }

  const currentPattern = RATTAN_PATTERNS[selectedPattern]

  return (
    <section className={cn('relative py-24 bg-[#0d0d0a] text-[#f7f6f0] overflow-hidden border-t border-b border-[#29271e]', className)}>
      {/* Background Subtle Rattan Weave Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a2618] via-[#14120a] to-[#0a0905]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e1c12] border border-[#3b3624] text-[#d6b76c] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d6b76c] animate-pulse" />
            Nghệ Thuật Mây Tre Bao La & Khảm Bạc Cung Đình
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcf7] tracking-tight leading-tight">
            Bộ Bình Rượu Cần Mây Tre Khảm Bạc <br className="hidden sm:inline" />
            <span className="italic font-light text-[#d6b76c]">Gốm Sành Nung Củi & Cần Trúc Uốn Nhiệt</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#aba798] leading-relaxed">
            Chế tác độc bản từ cốt gốm sành nung củi truyền thống, được bao bọc bởi lớp mây tre đan mắt cáo của các nghệ nhân làng Bao La (Huế). Viền cổ bình bọc bạc 999 chạm lộng tinh xảo, đi kèm cần trúc siêu mảnh uốn cong bằng nhiệt và khay trà gỗ Gụ lau ghép mộng âm dương không đinh sắt. Chứng thư độc bản <span className="font-mono text-[#d6b76c]">GU-RATTAN-2026-X</span>.
          </p>
        </div>

        {/* Master Interactive Vault Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 360° Jar Viewer & 20x Weave Microscope (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#18160e] to-[#0f0e08] border border-[#2e2a1b] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Virtual Stage Viewport */}
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-[#090805] border border-[#232014] flex flex-col justify-between p-6">
                {/* Simulated Ambient Stage Lighting */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 40%, rgba(214, 183, 108, 0.2) 0%, transparent 70%)`,
                  }}
                />

                {/* Top Toolbar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tracking-widest text-[#9e9988] uppercase">Góc Xoay 3D</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1e1c12] text-[#d6b76c] border border-[#3b3624]">
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
                        ? 'bg-[#d6b76c]/20 border-[#d6b76c] text-[#fff]'
                        : 'bg-[#1a180f] border-[#2e2918] text-[#aba798] hover:border-[#d6b76c]'
                    )}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    {isMicroscopeActive ? 'Tắt Kính Phóng Đại' : 'Kính Phóng Đại 20x Soi Mắt Mây'}
                  </button>
                </div>

                {/* Center Wine Jar Illustration */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  {isMicroscopeActive ? (
                    /* 20x Microscope Zoom View */
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative w-56 h-56 rounded-full border-2 border-[#d6b76c] overflow-hidden bg-[#1b1910] shadow-[0_0_30px_rgba(214,183,108,0.3)] flex items-center justify-center p-4 text-center"
                    >
                      <div 
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage: `radial-gradient(circle at 50% 50%, #d6b76c 2px, transparent 2px), repeating-linear-gradient(45deg, #3d351c 0px, #3d351c 1px, transparent 1px, transparent 12px)`,
                          backgroundSize: '16px 16px',
                        }}
                      />
                      <div className="relative z-10 text-xs text-[#fdfcf7] space-y-1">
                        <div className="font-mono text-[#d6b76c] font-bold text-sm tracking-wider">PHÓNG ĐẠI 20X</div>
                        <p className="text-[11px] text-[#ded9c8] leading-tight">
                          Đan Mắt Cáo 8 Hướng · Sợi mây nước 0.8mm chuốt bóng tự nhiên không hóa chất.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    /* 3D Rotating Wine Jar Silhouette */
                    <motion.div
                      style={{ rotate: rotationAngle }}
                      className="relative w-44 h-48 flex items-center justify-center cursor-grab active:cursor-grabbing"
                    >
                      {/* Wine Jar Graphic SVG */}
                      <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]">
                        {/* Bamboo Drinking Pipes in Jar */}
                        <path d="M 80 40 Q 60 10 30 15" fill="none" stroke="#d6b76c" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 95 40 Q 95 5 80 0" fill="none" stroke="#d6b76c" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 110 40 Q 120 5 140 5" fill="none" stroke="#d6b76c" strokeWidth="3" strokeLinecap="round" />
                        <path d="M 125 40 Q 145 15 170 20" fill="none" stroke="#d6b76c" strokeWidth="3" strokeLinecap="round" />

                        {/* 999 Silver Chased Rim */}
                        <ellipse cx="100" cy="45" rx="36" ry="10" fill="#e8eaed" stroke="#b0b4b8" strokeWidth="2.5" />
                        <text x="100" y="47" textAnchor="middle" fill="#5f6368" fontSize="5" fontFamily="monospace" fontWeight="bold">
                          SILVER 999 · GUHOMES
                        </text>

                        {/* Ceramic Jar Neck */}
                        <path d="M 68 45 L 72 75 L 128 75 L 132 45 Z" fill="#4d3221" stroke="#2e1d13" strokeWidth="1.5" />

                        {/* Ceramic Body Wrapped in Rattan Weave */}
                        <path
                          d="M 72 75 C 40 100 35 185 70 215 C 85 225 115 225 130 215 C 165 185 160 100 128 75 Z"
                          fill="#8c6a38"
                          stroke="#4f3817"
                          strokeWidth="2"
                        />

                        {/* Decorative Silver Medallion in Center */}
                        <circle cx="100" cy="140" r="18" fill="#d1d5db" stroke="#9ca3af" strokeWidth="1.5" />
                        <text x="100" y="143" textAnchor="middle" fill="#374151" fontSize="7" fontFamily="serif" fontWeight="bold">
                          BAO LA
                        </text>
                        <text x="100" y="151" textAnchor="middle" fill="#4b5563" fontSize="5" fontFamily="monospace">
                          2026-X
                        </text>
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Bottom Sound & Acoustic Test */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#232014] bg-[#0c0b07]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <button
                    type="button"
                    onClick={playSilverAcoustic}
                    className="min-h-[44px] px-3.5 py-1.5 rounded-lg bg-[#1c1a11] border border-[#332f1f] text-[#d6b76c] text-xs font-mono hover:bg-[#292518] transition-colors"
                  >
                    Nghe Âm Chạm Bạc 999
                  </button>

                  <div className="text-xs text-[#9e9988]">
                    {pipeCount} Cần Trúc Siêu Mảnh Uốn Cong Bằng Nhiệt
                  </div>
                </div>
              </div>

              {/* 360 Slider */}
              <div className="pt-4">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#9e9988]">Xoay 360° Kiểm Tra Từng Mối Đan Mây</span>
                  <span className="text-[#d6b76c] font-bold">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#1c1a11] rounded-lg appearance-none cursor-pointer accent-[#d6b76c]"
                  aria-label="Xoay bình rượu cần mây tre 360 độ"
                />
              </div>

              {/* Craft Specs Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-[#111009] border border-[#232014]">
                  <span className="text-[10px] text-[#857f6e] block uppercase tracking-wider font-mono">Cốt Bình</span>
                  <span className="text-sm font-semibold text-[#fdfcf7]">Gốm Sành Củi</span>
                  <span className="text-[10px] text-[#635f52] block mt-0.5">Khử độc tố Aldehyde</span>
                </div>
                <div className="p-3 rounded-xl bg-[#111009] border border-[#232014]">
                  <span className="text-[10px] text-[#857f6e] block uppercase tracking-wider font-mono">Bọc Cổ Bình</span>
                  <span className="text-sm font-semibold text-[#d6b76c]">Bạc Ta 999</span>
                  <span className="text-[10px] text-[#635f52] block mt-0.5">Chạm lộng rồng mây</span>
                </div>
                <div className="p-3 rounded-xl bg-[#111009] border border-[#232014]">
                  <span className="text-[10px] text-[#857f6e] block uppercase tracking-wider font-mono">Khay Gỗ Đi Kèm</span>
                  <span className="text-sm font-semibold text-[#fdfcf7]">Gỗ Gụ Lau</span>
                  <span className="text-[10px] text-[#635f52] block mt-0.5">Ghép mộng không đinh</span>
                </div>
                <div className="p-3 rounded-xl bg-[#111009] border border-[#232014]">
                  <span className="text-[10px] text-[#857f6e] block uppercase tracking-wider font-mono">Số Cần Uống</span>
                  <span className="text-sm font-mono font-bold text-[#d6b76c]">{pipeCount} Cần Trúc</span>
                  <span className="text-[10px] text-[#635f52] block mt-0.5">Lọc qua xơ tự nhiên</span>
                </div>
              </div>
            </div>

            {/* Cultural Heritage Rationale */}
            <div className="p-6 rounded-2xl bg-[#13120b] border border-[#282517] text-sm text-[#aba798] space-y-3">
              <h3 className="text-base font-serif text-[#fdfcf7] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#d6b76c] rounded-full" />
                Sự Kết Hợp Giữa Rượu Cần Đại Ngàn & Mỹ Thuật Đan Lát Cung Đình
              </h3>
              <p className="leading-relaxed">
                Rượu cần Tây Nguyên tượng trưng cho sự gắn kết thiêng liêng giữa con người và thần linh. Khi được GuHomes phối hợp với các nghệ nhân đan lát mây tre Bao La (nghề truyền thống hơn 600 năm) và nghệ nhân chạm bạc Đồng Xâm, vật phẩm được nâng tầm thành tác phẩm mỹ nghệ sưu tầm, hòa quyện trọn vẹn trong các không gian trà thất, hầm rượu và phòng khách biệt thự Quiet Luxury.
              </p>
            </div>
          </div>

          {/* Right Column: Weave Pattern Selector & Custom Clan Seal Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Pattern Selector */}
            <div className="rounded-2xl bg-[#18160e] border border-[#2e2a1b] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#9e9988]">
                Kiểu Đan Mây Tre Nghệ Nhân Làng Bao La
              </h3>

              <div className="space-y-3">
                {(Object.keys(RATTAN_PATTERNS) as RattanPatternType[]).map((patKey) => {
                  const pat = RATTAN_PATTERNS[patKey]
                  const isSelected = selectedPattern === patKey
                  return (
                    <button
                      key={pat.id}
                      type="button"
                      onClick={() => setSelectedPattern(patKey)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#232014] border-[#d6b76c] shadow-[0_0_15px_rgba(214,183,108,0.18)]'
                          : 'bg-[#111009] border-[#221f13] hover:border-[#383320]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fdfcf7] font-semibold' : 'text-[#d6d2c4]')}>
                          {pat.title}
                        </span>
                        <span className="text-xs font-mono text-[#d6b76c] font-bold">
                          {pat.densityPoresPerCm2} Mắt/cm²
                        </span>
                      </div>
                      <span className="text-xs text-[#8c8672] mt-1">{pat.subtitle}</span>
                      <p className="text-xs text-[#aba798] mt-2 line-clamp-2 leading-relaxed">
                        {pat.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Custom Bespoke Clan Seal Order Form */}
            <div className="rounded-2xl bg-[#18160e] border border-[#2e2a1b] p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-wider font-mono text-[#9e9988]">
                  Khắc Tên Chủ Nhân & Triện Gia Tộc
                </h3>
                <span className="text-xs font-mono text-[#d6b76c]">Khảm Bản Bạc 999</span>
              </div>

              {isOrderSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#d6b76c]/20 border border-[#d6b76c] flex items-center justify-center text-[#d6b76c] text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg text-[#fdfcf7]">Hồ Sơ May Đo Đã Được Lưu</h4>
                  <p className="text-xs text-[#aba798] leading-relaxed">
                    Nghệ nhân chạm bạc GuHomes sẽ phác thảo bản rập hoa văn triện cho gia chủ {ownerName || ''} và liên hệ qua số {ownerPhone || ''} trước khi bắt đầu gò chạm bạc.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOrderSubmitted(false)}
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-[#201d12] border border-[#3b3522] text-[#d6b76c] text-xs font-mono uppercase"
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
                      <label htmlFor={`${formId}-pipes`} className="block text-xs font-mono text-[#9e9988] mb-1">
                        Số Lượng Cần Trúc
                      </label>
                      <select
                        id={`${formId}-pipes`}
                        value={pipeCount}
                        onChange={(e) => setPipeCount(parseInt(e.target.value, 10))}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c0b07] border border-[#242114] text-[#f7f6f0] text-xs font-mono focus:border-[#d6b76c] focus:outline-none"
                      >
                        <option value="2">2 Cần (Đối Ẩm Tri Kỷ)</option>
                        <option value="4">4 Cần (Tứ Quý Sum Vầy)</option>
                        <option value="6">6 Cần (Lục Hợp Quần Tụ)</option>
                        <option value="8">8 Cần (Bát Tiên Khánh Thọ)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-tray`} className="block text-xs font-mono text-[#9e9988] mb-1">
                        Chất Liệu Khay Đỡ
                      </label>
                      <select
                        id={`${formId}-tray`}
                        value={woodTrayType}
                        onChange={(e) => setWoodTrayType(e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c0b07] border border-[#242114] text-[#f7f6f0] text-xs focus:border-[#d6b76c] focus:outline-none"
                      >
                        <option value="gu-lau">Gỗ Gụ Lau Cổ Thụ</option>
                        <option value="cam-lai">Gỗ Cẩm Lai Tây Nguyên</option>
                        <option value="mun-hoa">Gỗ Mun Hoa Sọc Đen</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-clan`} className="block text-xs font-mono text-[#9e9988] mb-1">
                      Chữ Triện Gia Tộc Khắc Miếng Bạc
                    </label>
                    <input
                      id={`${formId}-clan`}
                      type="text"
                      value={clanSealName}
                      onChange={(e) => setClanSealName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Gia Chi Bảo, Vạn Lộc Đường..."
                      className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c0b07] border border-[#242114] text-[#f7f6f0] text-xs focus:border-[#d6b76c] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`${formId}-owner`} className="block text-xs font-mono text-[#9e9988] mb-1">
                        Họ và Tên *
                      </label>
                      <input
                        id={`${formId}-owner`}
                        type="text"
                        required
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Nguyễn Tuấn Anh"
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c0b07] border border-[#242114] text-[#f7f6f0] text-xs focus:border-[#d6b76c] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-tel`} className="block text-xs font-mono text-[#9e9988] mb-1">
                        Số Điện Thoại *
                      </label>
                      <input
                        id={`${formId}-tel`}
                        type="tel"
                        required
                        value={ownerPhone}
                        onChange={(e) => setOwnerPhone(e.target.value)}
                        placeholder="0912 xxx xxx"
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0c0b07] border border-[#242114] text-[#f7f6f0] text-xs font-mono focus:border-[#d6b76c] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#d6b76c] to-[#b3954f] text-[#0f0e08] font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:brightness-110 shadow-lg mt-2"
                  >
                    Đăng Ký Chế Tác Độc Bản Có Giấy Chứng Nhận
                  </button>
                </form>
              )}
            </div>

            {/* Atelier Contact */}
            <div className="p-4 rounded-2xl bg-[#14120a] border border-[#292617] text-xs text-[#9e9988] flex items-center justify-between">
              <div>
                <span className="text-[#fdfcf7] font-serif block">GuHomes Traditional Atelier</span>
                <span className="text-[11px] text-[#787363]">Xưởng Mộc Thạnh Xuân Q.12</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#d6b76c] font-mono hover:underline min-h-[44px] flex items-center"
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
