'use client'

import { useState, useRef, useEffect, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export type BrassInlayMotif = 'trien-co' | 'song-nuoc' | 'bach-tho'

interface InlayMotifDetail {
  id: BrassInlayMotif
  title: string
  subtitle: string
  brassThicknessMm: number
  engravingTechnique: string
  meaning: string
  description: string
}

const INLAY_MOTIFS: Record<BrassInlayMotif, InlayMotifDetail> = {
  'trien-co': {
    id: 'trien-co',
    title: 'Hồi Văn Triện Cổ',
    subtitle: 'Geometric Meander · Khảm Đồng Phẳng CNC',
    brassThicknessMm: 3.5,
    engravingTechnique: 'Phay rãnh âm dương dung sai 0.02mm',
    meaning: 'Sự vẹn toàn, dòng chảy năng lượng liên tục không đứt đoạn và vượng khí phong thủy cho bàn trà',
    description: 'Họa tiết hồi văn kỷ hà cổ điển được phay mộng âm dương trên tấm đồng thau nguyên khối, ép nhiệt phẳng lì với mặt gỗ Hoàng Đàn tuyết.',
  },
  'song-nuoc': {
    id: 'song-nuoc',
    title: 'Hải Thủy Ba Đào',
    subtitle: 'Rhythmic Ocean Wave · Phong Thái Tĩnh Lặng',
    brassThicknessMm: 3.5,
    engravingTechnique: 'Chạm khắc chìm laser vi cơ khí',
    meaning: 'Nước chảy về chỗ trũng, tượng trưng cho tài lộc tụ hội và sự nhu thuận của bậc quân tử',
    description: 'Đường lượn sóng nước mềm mại đón nhận từng dòng nước trà tràn, dẫn lưu vào rãnh thoát nước ngầm vô hình.',
  },
  'bach-tho': {
    id: 'bach-tho',
    title: 'Bách Thọ Triện Thư',
    subtitle: 'Calligraphic Longevity · Cát Tường Như Ý',
    brassThicknessMm: 4.0,
    engravingTechnique: 'Đúc đồng cát mịn & Đánh bóng satin mờ',
    meaning: 'Trường thọ, an khang và phúc trạch lưu truyền nhiều đời cho dòng tộc',
    description: 'Chữ Thọ viết theo lối triện thư cung đình ở trung tâm khay trà, tạo điểm tựa phong thủy vững chãi cho bộ ấm chén Tử Sa.',
  },
}

export function ArtisanHoangDanBrassInlayTeaTrayVault({ className }: { className?: string }) {
  const formId = useId()
  const [selectedMotif, setSelectedMotif] = useState<BrassInlayMotif>('trien-co')
  const [rotationAngle, setRotationAngle] = useState<number>(35)
  const [isMicroscopeActive, setIsMicroscopeActive] = useState<boolean>(false)
  const [trayDimensions, setTrayDimensions] = useState('68x38')

  // Bespoke Order Form State
  const [ownerSeal, setOwnerSeal] = useState('')
  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [drainageType, setDrainageType] = useState('hidden-silicone')
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false)

  // Web Audio Context for Brass Clink & Wood Tap
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

  const playBrassAcoustic = () => {
    const ctx = getAudioContext()
    if (!ctx) return
    const now = ctx.currentTime

    // Solid brass resonance sound
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(3400, now)
    osc.frequency.exponentialRampToValueAtTime(1650, now + 0.25)

    gain.gain.setValueAtTime(0.16, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(now)
    osc.stop(now + 0.45)
  }

  const currentMotif = INLAY_MOTIFS[selectedMotif]

  return (
    <section className={cn('relative py-24 bg-[#0d0b07] text-[#f7f5ed] overflow-hidden border-t border-b border-[#2d2516]', className)}>
      {/* Background Subtle Cedar Snow Grain Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#382a13] via-[#171107] to-[#0a0703]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e170c] border border-[#3d2f17] text-[#d4af37] text-xs uppercase tracking-widest font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            Nghệ Thuật Khay Trà Hoàng Đàn Tuyết Lạng Sơn
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#fdfcf7] tracking-tight leading-tight">
            Khay Trà Hoàng Đàn Khảm Đồng Thau <br className="hidden sm:inline" />
            <span className="italic font-light text-[#d4af37]">Gỗ Nguyên Tấm Tuyết Óng Ánh & Thoát Nước Ngầm</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#aba494] leading-relaxed">
            Tuyệt phẩm chế tác từ gỗ Hoàng Đàn tuyết Lạng Sơn nguyên tấm giàu tinh dầu tự nhiên tự kết tinh lớp tuyết trắng lấp lánh như sương mai. Kết hợp cùng tấm đồng thau phay CNC phẳng tuyệt đối với dung sai 0.02mm, khay sở hữu hệ rãnh thu nước ngầm kết nối ống xả giấu kín. Mã chứng thực độc bản <span className="font-mono text-[#d4af37]">GU-TRAY-2026-X</span>.
          </p>
        </div>

        {/* Master Interactive Tray Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 360° Tray Viewer & 20x Snow Microscope (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#181309] to-[#0e0b05] border border-[#332612] p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Virtual Stage Viewport */}
              <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-[#0a0703] border border-[#231a0c] flex flex-col justify-between p-6">
                {/* Simulated Crystalline Snow Texture Ambient */}
                <div 
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 45% 35%, rgba(212, 175, 55, 0.22) 0%, transparent 65%)`,
                  }}
                />

                {/* Top Toolbar */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono tracking-widest text-[#9e9684] uppercase">Góc Xoay 3D</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1e170c] text-[#d4af37] border border-[#3d2f17]">
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
                        ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#fff]'
                        : 'bg-[#181209] border-[#2e210f] text-[#aba494] hover:border-[#d4af37]'
                    )}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                    {isMicroscopeActive ? 'Tắt Kính Phóng Đại' : 'Kính Phóng Đại 20x Soi Mộng Phẳng'}
                  </button>
                </div>

                {/* Center Tray Illustration */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto">
                  {isMicroscopeActive ? (
                    /* 20x Microscope Zoom View */
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative w-56 h-56 rounded-full border-2 border-[#d4af37] overflow-hidden bg-[#1c1409] shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center p-4 text-center"
                    >
                      <div 
                        className="absolute inset-0 opacity-60"
                        style={{
                          backgroundImage: `radial-gradient(circle at 30% 30%, #fff 1.5px, transparent 1.5px), radial-gradient(circle at 70% 60%, #d4af37 2px, transparent 2px)`,
                          backgroundSize: '14px 14px',
                        }}
                      />
                      <div className="relative z-10 text-xs text-[#fdfcf7] space-y-1">
                        <div className="font-mono text-[#d4af37] font-bold text-sm tracking-wider">PHÓNG ĐẠI 20X</div>
                        <p className="text-[11px] text-[#ded7c4] leading-tight">
                          Đường ghép mộng phẳng 0.02mm · Lớp tuyết tinh dầu Hoàng Đàn tự kết tinh trắng muốt.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    /* 3D Rotating Tea Tray Silhouette */
                    <motion.div
                      style={{ rotate: rotationAngle }}
                      className="relative w-56 h-36 flex items-center justify-center cursor-grab active:cursor-grabbing"
                    >
                      {/* Tea Tray Graphic SVG */}
                      <svg viewBox="0 0 240 150" className="w-full h-full drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]">
                        {/* Wooden Tray Outer Bevel Frame */}
                        <rect x="15" y="20" width="210" height="110" rx="10" fill="#4d3016" stroke="#2a1809" strokeWidth="3" />
                        <rect x="25" y="30" width="190" height="90" rx="6" fill="#69431e" />

                        {/* Inlaid Solid Brass Center Plate */}
                        <rect x="40" y="42" width="160" height="66" rx="4" fill="#d4af37" stroke="#997b1a" strokeWidth="2" />

                        {/* Motif Engraving Simulation */}
                        <rect x="48" y="49" width="144" height="52" fill="none" stroke="#7a6112" strokeWidth="1" strokeDasharray="4 2" />
                        <text x="120" y="78" textAnchor="middle" fill="#52400a" fontSize="11" fontFamily="serif" fontWeight="bold" letterSpacing="3">
                          黃檀雪
                        </text>
                        <text x="120" y="90" textAnchor="middle" fill="#52400a" fontSize="6" fontFamily="monospace">
                          GU-TRAY-2026-X
                        </text>

                        {/* Hidden Drainage Hole Indicator */}
                        <circle cx="188" cy="98" r="3.5" fill="#302509" />
                      </svg>
                    </motion.div>
                  )}
                </div>

                {/* Bottom Sound & Acoustic Test */}
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#231a0c] bg-[#0c0904]/80 backdrop-blur-md rounded-lg px-4 py-2.5">
                  <button
                    type="button"
                    onClick={playBrassAcoustic}
                    className="min-h-[44px] px-3.5 py-1.5 rounded-lg bg-[#1a1307] border border-[#332612] text-[#d4af37] text-xs font-mono hover:bg-[#261d0d] transition-colors"
                  >
                    Nghe Tiếng Gõ Đồng Thau & Gỗ
                  </button>

                  <div className="text-xs text-[#9e9684]">
                    Rãnh Thoát Nước Ngầm Kèm Ống Silicon Giấu Kín
                  </div>
                </div>
              </div>

              {/* 360 Slider */}
              <div className="pt-4">
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span className="text-[#9e9684]">Xoay 360° Chiêm Ngưỡng Vân Gỗ Hoàng Đàn</span>
                  <span className="text-[#d4af37] font-bold">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-[#1a1307] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
                  aria-label="Xoay khay trà 360 độ"
                />
              </div>

              {/* Technical Specifications Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-xl bg-[#100c06] border border-[#231a0c]">
                  <span className="text-[10px] text-[#7d7564] block uppercase tracking-wider font-mono">Chất Liệu Mộc</span>
                  <span className="text-sm font-semibold text-[#f7f5ed]">Hoàng Đàn Tuyết</span>
                  <span className="text-[10px] text-[#5c5547] block mt-0.5">Rừng Lạng Sơn nguyên tấm</span>
                </div>
                <div className="p-3 rounded-xl bg-[#100c06] border border-[#231a0c]">
                  <span className="text-[10px] text-[#7d7564] block uppercase tracking-wider font-mono">Tấm Khảm</span>
                  <span className="text-sm font-semibold text-[#d4af37]">Đồng Thau Phay</span>
                  <span className="text-[10px] text-[#5c5547] block mt-0.5">Dung sai 0.02mm</span>
                </div>
                <div className="p-3 rounded-xl bg-[#100c06] border border-[#231a0c]">
                  <span className="text-[10px] text-[#7d7564] block uppercase tracking-wider font-mono">Đặc Tính</span>
                  <span className="text-sm font-semibold text-[#f7f5ed]">Lên Tuyết Tự Nhiên</span>
                  <span className="text-[10px] text-[#5c5547] block mt-0.5">Hương thơm vĩnh cửu</span>
                </div>
                <div className="p-3 rounded-xl bg-[#100c06] border border-[#231a0c]">
                  <span className="text-[10px] text-[#7d7564] block uppercase tracking-wider font-mono">Hệ Thoát Nước</span>
                  <span className="text-sm font-semibold text-[#d4af37]">Rãnh Ngầm Vô Hình</span>
                  <span className="text-[10px] text-[#5c5547] block mt-0.5">Không đọng nước bề mặt</span>
                </div>
              </div>
            </div>

            {/* Cultural & Material Rationale */}
            <div className="p-6 rounded-2xl bg-[#120e06] border border-[#291e0d] text-sm text-[#aba494] space-y-3">
              <h3 className="text-base font-serif text-[#fdfcf7] flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#d4af37] rounded-full" />
                Hiện Tượng "Lên Tuyết" Độc Nhất Vô Nhị Của Gỗ Hoàng Đàn
              </h3>
              <p className="leading-relaxed">
                Gỗ Hoàng Đàn tuyết Lạng Sơn được mệnh danh là "đế vương chi mộc" nhờ hàm lượng tinh dầu thơm ngát đặc hữu. Khi được đặt trong không gian kín gió với độ ẩm ổn định, tinh dầu từ trong lõi gỗ sẽ từ từ phát tiết và kết tinh thành những sợi tuyết mảnh trắng muốt, óng ánh như kim cương dưới ánh sáng. Tấm đồng thau phay phẳng bảo vệ thớ gỗ khỏi nhiệt độ nước sôi, mang lại tuổi thọ truyền đời.
              </p>
            </div>
          </div>

          {/* Right Column: Inlay Motif & Bespoke Seal Order Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Motif Selector */}
            <div className="rounded-2xl bg-[#181309] border border-[#332612] p-6 shadow-xl space-y-4">
              <h3 className="text-xs uppercase tracking-wider font-mono text-[#9e9684]">
                Họa Tiết Khảm Đồng Thau CNC
              </h3>

              <div className="space-y-3">
                {(Object.keys(INLAY_MOTIFS) as BrassInlayMotif[]).map((mKey) => {
                  const item = INLAY_MOTIFS[mKey]
                  const isSelected = selectedMotif === mKey
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedMotif(mKey)}
                      className={cn(
                        'min-h-[48px] w-full p-4 rounded-xl text-left border transition-all duration-300 flex flex-col justify-between',
                        isSelected
                          ? 'bg-[#241a0b] border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.18)]'
                          : 'bg-[#100c06] border-[#22180a] hover:border-[#382a13]'
                      )}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={cn('font-serif text-base', isSelected ? 'text-[#fdfcf7] font-semibold' : 'text-[#cfc8b8]')}>
                          {item.title}
                        </span>
                        <span className="text-xs font-mono text-[#d4af37] font-bold">
                          Đồng {item.brassThicknessMm}mm
                        </span>
                      </div>
                      <span className="text-xs text-[#8c8370] mt-1">{item.subtitle}</span>
                      <p className="text-xs text-[#aba494] mt-2 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bespoke Seal & Dimensions Order Form */}
            <div className="rounded-2xl bg-[#181309] border border-[#332612] p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs uppercase tracking-wider font-mono text-[#9e9684]">
                  May Đo Kích Thước & Triện Khắc Đáy
                </h3>
                <span className="text-xs font-mono text-[#d4af37]">Nghệ Nhân GuHomes</span>
              </div>

              {isOrderSubmitted ? (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] text-xl">
                    ✓
                  </div>
                  <h4 className="font-serif text-lg text-[#fdfcf7]">Đã Tiếp Nhận Yêu Cầu May Đo</h4>
                  <p className="text-xs text-[#aba494] leading-relaxed">
                    Nghệ nhân mộc GuHomes sẽ lựa chọn phôi gỗ Hoàng Đàn tuyết nguyên tấm có vân đẹp nhất cho gia chủ {clientName || ''} và liên hệ qua số {clientPhone || ''} để gửi bản phác thảo triện.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOrderSubmitted(false)}
                    className="min-h-[44px] px-5 py-2 rounded-xl bg-[#211709] border border-[#3d2c13] text-[#d4af37] text-xs font-mono uppercase"
                  >
                    Tạo Yêu Cầu May Đo Mới
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
                      <label htmlFor={`${formId}-dims`} className="block text-xs font-mono text-[#9e9684] mb-1">
                        Kích Thước Khay (cm)
                      </label>
                      <select
                        id={`${formId}-dims`}
                        value={trayDimensions}
                        onChange={(e) => setTrayDimensions(e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ed] text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                      >
                        <option value="58x32">58 x 32 cm (Tiểu Trà Bàn)</option>
                        <option value="68x38">68 x 38 cm (Kích Thước Hoàng Kim)</option>
                        <option value="88x48">88 x 48 cm (Đại Trà Bàn Biệt Thự)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={`${formId}-drain`} className="block text-xs font-mono text-[#9e9684] mb-1">
                        Hệ Thống Xả Nước
                      </label>
                      <select
                        id={`${formId}-drain`}
                        value={drainageType}
                        onChange={(e) => setDrainageType(e.target.value)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ed] text-xs focus:border-[#d4af37] focus:outline-none"
                      >
                        <option value="hidden-silicone">Rãnh ngầm dẫn ống xả mềm</option>
                        <option value="internal-tray">Khay hứng inox ngầm tháo rời</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`${formId}-seal`} className="block text-xs font-mono text-[#9e9684] mb-1">
                      Chữ Triện Riêng Gia Tộc (Khắc Đáy Khay)
                    </label>
                    <input
                      id={`${formId}-seal`}
                      type="text"
                      value={ownerSeal}
                      onChange={(e) => setOwnerSeal(e.target.value)}
                      placeholder="Ví dụ: Hoàng Gia Trà Các, An Định Thư Phòng..."
                      className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ed] text-xs focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`${formId}-name`} className="block text-xs font-mono text-[#9e9684] mb-1">
                        Họ và Tên *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Nguyễn Tuấn Anh"
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ed] text-xs focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor={`${formId}-phone`} className="block text-xs font-mono text-[#9e9684] mb-1">
                        Số Điện Thoại *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="0912 xxx xxx"
                        className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-[#0b0804] border border-[#241a0b] text-[#f7f5ed] text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-3 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b39127] text-[#0f0b04] font-semibold text-xs uppercase tracking-wider transition-all duration-300 hover:brightness-110 shadow-lg mt-2"
                  >
                    Đăng Ký Chế Tác Khay Trà Hoàng Đàn
                  </button>
                </form>
              )}
            </div>

            {/* Atelier Contact */}
            <div className="p-4 rounded-2xl bg-[#120e06] border border-[#291e0d] text-xs text-[#9e9684] flex items-center justify-between">
              <div>
                <span className="text-[#fdfcf7] font-serif block">GuHomes Tea Tray Atelier</span>
                <span className="text-[11px] text-[#736a57]">Xưởng Mộc Thạnh Xuân Q.12 · 1.200m²</span>
              </div>
              <a
                href="tel:0368757916"
                className="text-[#d4af37] font-mono hover:underline min-h-[44px] flex items-center"
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
