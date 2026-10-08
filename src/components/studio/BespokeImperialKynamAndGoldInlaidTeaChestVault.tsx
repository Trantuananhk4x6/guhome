'use client'

import { useState, useRef, useEffect } from 'react'

interface TeaSpec {
  name: string
  harvestAltitude: string
  processingCraft: string
  tasteNotes: string
  storageTemp: string
  humidityOptimal: string
  description: string
}

const IMPERIAL_TEA_COLLECTION: TeaSpec[] = [
  {
    name: 'Trà Cổ Thụ Tà Xùa Bách Niên',
    harvestAltitude: '2.400m (Đỉnh mây Sơn La)',
    processingCraft: 'Sao chảo gang thủ công nung củi nhãn, ủ men tự nhiên 24 tháng',
    tasteNotes: 'Tiền vị chát thanh thoát êm ái, hậu vị ngọt đậm đà kéo dài trong vòm họng',
    storageTemp: '20°C - 22°C',
    humidityOptimal: '50% - 54% RH',
    description: 'Búp trà phủ lớp tuyết trắng dày dặn của vùng núi cao quanh năm sương phủ, được bảo quản trong tráp gỗ Trắc đen giữ nguyên vẹn nội chất diệp lục.'
  },
  {
    name: 'Trà Ô Long Tứ Quý Cầu Đất Hun Trầm',
    harvestAltitude: '1.650m (Cao nguyên Cầu Đất Đà Lạt)',
    processingCraft: 'Lên men bán phần 65%, ủ khói trầm hương kỳ nam tự nhiên 12 giờ',
    tasteNotes: 'Hương hoa mộc lan thanh quý hòa quyện nốt hương khói trầm ấm vương giả',
    storageTemp: '18°C - 21°C',
    humidityOptimal: '52% - 55% RH',
    description: 'Tuyệt tác trà đạo kết hợp giữa nghệ thuật làm trà Đài Loan và trầm hương rừng già Việt Nam, tạo nên chiều sâu vị giác khó quên.'
  },
  {
    name: 'Trà Búp Măng Tây Côn Lĩnh Hoàng Triều',
    harvestAltitude: '2.200m (Dãy núi Tây Côn Lĩnh Hà Giang)',
    processingCraft: 'Hái thủ công 1 tôm 1 lá lúc bình minh, sấy lạnh thăng hoa giữ nguyên hương hoa',
    tasteNotes: 'Hương thơm cốm non quyến rũ, vị ngọt ngào như nước suối đầu nguồn tinh khiết',
    storageTemp: '19°C - 22°C',
    humidityOptimal: '48% - 52% RH',
    description: 'Dòng ngự trà thượng phẩm được vua chúa xưa gìn giữ trong tráp khảm vàng, mỗi lần mở nắp tráp là hương thơm ngào ngạt lan tỏa khắp thư phòng.'
  }
]

export function BespokeImperialKynamAndGoldInlaidTeaChestVault() {
  const [selectedTeaIndex, setSelectedTeaIndex] = useState(0)
  const [macroZoom, setMacroZoom] = useState(1)
  const [isLidClosed, setIsLidClosed] = useState(true)
  const [isSoundActive, setIsSoundActive] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  const currentTea = IMPERIAL_TEA_COLLECTION[selectedTeaIndex]!

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const playMagnetClickSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioContextClass()
      audioContextRef.current = ctx

      setIsSoundActive(true)

      // Âm thanh nam châm Neodymium đất hiếm hít khít (click 432Hz đầm chắc)
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(432, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.08)

      gain.gain.setValueAtTime(0.0001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.14)

      setTimeout(() => {
        setIsSoundActive(false)
      }, 200)
    } catch {
      setIsSoundActive(false)
    }
  }

  const toggleLid = () => {
    playMagnetClickSound()
    setIsLidClosed(!isLidClosed)
  }

  return (
    <section className="relative overflow-hidden bg-surface-primary py-24 sm:py-32">
      {/* Nền hoa văn chim Lạc cẩn chỉ vàng 24K */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="crane-filigree-pattern" width="70" height="70" patternUnits="userSpaceOnUse">
              <path d="M 10 35 Q 35 10, 60 35 T 60 60" fill="none" stroke="currentColor" strokeWidth="0.8" />
              <circle cx="35" cy="35" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crane-filigree-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header định vị Tráp Ngự Trà */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            <span>TRÁP NGỰ TRÀ GỖ TRẮC ĐEN KHẢM VÀNG 24K</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>KÍN KHÍ 99.8% NEODYMIUM</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Tráp Ngự Trà Khảm Chỉ Vàng & Khóa Khí Kín
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Gỗ Trắc đen Nam Bộ nguyên khối cẩn chỉ vàng 24K hoa văn chim Lạc, lòng lót gỗ Tuyết Tùng duy trì độ ẩm 50% - 55% RH, khóa ngậm nam châm Neodymium đất hiếm 0.6T bảo tồn trọn vẹn hương trà quý.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Cột trái: Mô phỏng Tráp Trà & Khóa Nam Châm (7 cột) */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-secondary/50 p-6 sm:p-8 lg:col-span-7">
            {/* Thanh thông số vi khí hậu tráp */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="font-mono text-ink/60">ĐỘ ẨM TUYẾT TÙNG:</span>
                <span className="font-semibold text-primary">{currentTea.humidityOptimal}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">TRẠNG THÁI NẮP:</span>
                <span className="font-semibold text-ink">{isLidClosed ? 'KÍN KHÍ 99.8%' : 'ĐANG MỞ THƯỞNG TRÀ'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">MACRO ZOOM:</span>
                <span className="font-semibold text-ink">{macroZoom}x</span>
              </div>
            </div>

            {/* Khung mô phỏng đồ họa Tráp Gỗ Trắc Đen */}
            <div className="relative my-8 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-ink/5 p-6">
              {/* Mô hình Tráp Gỗ Trắc Đen */}
              <div 
                className="relative flex flex-col items-center justify-center transition-transform duration-500"
                style={{ transform: `scale(${macroZoom})` }}
              >
                {/* Khối tráp chữ nhật gỗ Trắc đen bóng bẩy */}
                <div className="relative flex h-44 w-60 sm:h-52 sm:w-72 flex-col items-center justify-center rounded-2xl border-2 border-amber-500/70 bg-stone-950 shadow-2xl p-3">
                  {/* Đường chỉ cẩn vàng 24K bao quanh */}
                  <div className="absolute inset-2 rounded-xl border border-dashed border-amber-400/60" />

                  {/* Lòng tráp lót Tuyết Tùng Tây Ban Nha */}
                  <div className="relative flex h-full w-full flex-col items-center justify-center rounded-lg bg-amber-900/40 p-3 shadow-inner border border-amber-800/40">
                    <span className="text-[10px] font-mono tracking-widest text-amber-300/80">TUYẾT TÙNG · 52% RH</span>
                    <span className="mt-1 text-xs font-serif text-amber-100 text-center line-clamp-1">{currentTea.name}</span>
                    <span className="mt-1 text-[9px] font-mono text-amber-200/60">{currentTea.harvestAltitude}</span>
                  </div>

                  {/* Nắp tráp với nam châm hít */}
                  <div 
                    className={`absolute -top-3 left-4 right-4 h-5 rounded-t-xl bg-stone-900 border-t border-amber-400/80 shadow-md transition-transform duration-300 ${
                      isLidClosed ? 'translate-y-0' : '-translate-y-6 rotate-3'
                    }`}
                  >
                    <div className="flex items-center justify-center h-full">
                      <span className="h-1 w-10 rounded-full bg-amber-400/80" />
                    </div>
                  </div>
                </div>

                {/* Chân đế nẹp đồng thau xước mờ */}
                <div className="mt-3 flex items-center gap-3 text-[10px] font-mono text-ink/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  KHÓA NAM CHÂM NEODYMIUM 0.6T & GIOĂNG SILICON
                </div>
              </div>

              {/* Tag góc dưới */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-surface-primary/80 px-3 py-1.5 backdrop-blur-sm border border-line text-[11px] font-mono text-ink/70">
                GỖ TRẮC ĐEN · CẨN CHỈ VÀNG RÒNG 24K
              </div>
            </div>

            {/* Bảng điều khiển đóng/mở nắp tráp & Macro zoom */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={toggleLid}
                  className={`inline-flex min-h-[44px] items-center gap-2.5 rounded-xl px-4 py-2.5 text-xs font-medium transition-all ${
                    isLidClosed 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'border border-primary bg-primary/10 text-primary'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isLidClosed ? 'bg-white' : 'bg-primary animate-ping'}`} />
                  {isLidClosed ? 'Nắp Tráp: Đang Khóa Kín Khí' : 'Mở Nắp Tráp Thưởng Trà'}
                </button>

                <div className="inline-flex rounded-lg border border-line bg-surface-primary p-1">
                  {[1, 1.5, 2, 3].map((zoom) => (
                    <button
                      key={zoom}
                      type="button"
                      onClick={() => setMacroZoom(zoom)}
                      className={`rounded-md px-3 py-1 text-xs font-mono transition-all ${
                        macroZoom === zoom
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-ink/70 hover:text-ink'
                      }`}
                    >
                      {zoom}x
                    </button>
                  ))}
                </div>
              </div>

              {isSoundActive && (
                <div className="text-[11px] font-mono text-emerald-600 animate-pulse">
                  Nam châm Neodymium đất hiếm hít khít âm vang 432Hz đầm chắc...
                </div>
              )}
            </div>
          </div>

          {/* Cột phải: Thông số 3 Danh Trà Ngự Dụng (5 cột) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Bộ chọn danh mục Trà */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-ink/60">
                Bộ Sưu Tập Ngự Trà Hoàng Gia
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {IMPERIAL_TEA_COLLECTION.map((tea, idx) => (
                  <button
                    key={tea.name}
                    type="button"
                    onClick={() => {
                      setSelectedTeaIndex(idx)
                      playMagnetClickSound()
                    }}
                    className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                      selectedTeaIndex === idx
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-line bg-surface-primary hover:border-ink/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-ink">{tea.name}</span>
                      <span className="text-[10px] font-mono text-primary">{tea.harvestAltitude}</span>
                    </div>
                    <span className="mt-1 text-xs text-ink/60 line-clamp-1">{tea.tasteNotes}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết thông số Trà đang chọn */}
            <div className="rounded-2xl border border-line bg-surface-primary p-6 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-ink">
                {currentTea.name}
              </h3>
              <p className="mt-1 text-xs font-mono text-primary">
                Độ cao thu hái: {currentTea.harvestAltitude} · Ẩm độ tối ưu: {currentTea.humidityOptimal}
              </p>

              <div className="mt-4 border-t border-line pt-4 space-y-3 text-xs leading-relaxed text-ink/80">
                <p>{currentTea.description}</p>
                <div className="rounded-lg bg-surface-secondary/70 p-3 text-[11px] text-ink/70">
                  <span className="font-semibold text-ink">Phương thức sao tẩm:</span> {currentTea.processingCraft}
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-[11px] text-primary">
                  <span className="font-semibold">Nốt hương vị giác:</span> {currentTea.tasteNotes}
                </div>
              </div>

              {/* Cam kết tiêu chuẩn thương hiệu GuHomes */}
              <div className="mt-6 border-t border-line pt-4 flex items-center justify-between text-[11px] text-ink/60">
                <span>Hotline KTS Trưởng: 0368 757 916</span>
                <span>Chế tác độc bản 1/1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
