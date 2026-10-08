'use client'

import { useState, useRef, useEffect } from 'react'

interface BonsaiSpec {
  name: string
  age: string
  style: string
  origin: string
  humidityReq: string
  tempDrop: string
  description: string
  notes: string
}

const BONSAI_COLLECTION: BonsaiSpec[] = [
  {
    name: 'Trà Phúc Kiến Bách Niên',
    age: '75 năm tuổi',
    style: 'Trực quân tử nghênh phong (Dáng đứng hiên ngang đón gió sông)',
    origin: 'Vùng đồi đá miền Trung, thuần dưỡng 28 năm tại vườn kiểng GuHomes',
    humidityReq: '72% - 78% RH',
    tempDrop: '-3.6°C',
    description: 'Thân cây lũa trắng phong hóa tự nhiên, tán lá xanh bóng ngậm sương đêm, mỗi độ chuyển mùa lại đơm hoa trắng tinh khôi.',
    notes: 'Bệ xoay 360 độ cơ khí chính xác, hệ phun sương nano siêu âm làm mát vi khí hậu.'
  },
  {
    name: 'Mai Vàng An Nhơn Cổ Thụ',
    age: '80 năm tuổi',
    style: 'Hoành thụ ngọa tùng (Vươn ngang soi bóng mặt nước thủy đình)',
    origin: 'Làng mai truyền thống An Nhơn Bình Định, nghệ nhân tạo tác qua 3 đời',
    humidityReq: '70% - 76% RH',
    tempDrop: '-3.4°C',
    description: 'Thân vảy rồng xù xì vững chãi, cành nhánh uốn lượn mềm mại như rồng bay phượng múa, bừng nở sắc hoàng kim rực rỡ đón xuân.',
    notes: 'Hệ rễ bám phiến đá Granite Bình Định đa tầng, tuần hoàn nước lọc sinh học.'
  },
  {
    name: 'Tùng La Hán Trúc Vô Vi',
    age: '95 năm tuổi',
    style: 'Tam đa trường thọ (Ba tán tầng bậc vững bền như núi thái sơn)',
    origin: 'Rừng núi đá vôi miền cao, hấp thụ linh khí đất trời gần một thế kỷ',
    humidityReq: '74% - 80% RH',
    tempDrop: '-3.8°C',
    description: 'Lá kim xanh biếc bốn mùa tượng trưng cho cốt cách thanh cao của bậc quân tử, dáng thế trầm mặc an định không gian trà đạo.',
    notes: 'Cảm biến độ ẩm thông minh tự động kích hoạt phun sương khi ẩm độ dưới 70% RH.'
  }
]

export function SaigonCanalSideAncientSandalwoodTeaPavilion() {
  const [selectedBonsaiIndex, setSelectedBonsaiIndex] = useState(0)
  const [rotationAngle, setRotationAngle] = useState(40)
  const [isMistingActive, setIsMistingActive] = useState(true)
  const [isSoundActive, setIsSoundActive] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const currentBonsai = BONSAI_COLLECTION[selectedBonsaiIndex]!

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  const toggleSoundscape = () => {
    if (isSoundActive) {
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.5)
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop()
            oscillatorRef.current.disconnect()
            oscillatorRef.current = null
          }
          setIsSoundActive(false)
        }, 500)
      } else {
        setIsSoundActive(false)
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioContextRef.current = ctx

        // Soundscape Solfeggio 528Hz hòa quyện tiếng gió rạch và thác tràn đá
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(528, ctx.currentTime) // Tần số 528Hz chuyển hóa tích cực

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.032, ctx.currentTime + 1.0)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start()
        oscillatorRef.current = osc
        gainNodeRef.current = gain
        setIsSoundActive(true)
      } catch {
        setIsSoundActive(false)
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-surface-primary py-24 sm:py-32">
      {/* Nền hoa văn sóng nước thủy đình */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sandalwood-wave-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 0 20 Q 15 5, 30 20 T 60 20" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 0 40 Q 15 25, 30 40 T 60 40" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sandalwood-wave-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header định vị Thủy Đình */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            <span>KIẾN TRÚC THỦY ĐÌNH GỖ ĐÀN HƯƠNG</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>XƯỞNG THẠNH XUÂN 1.200M²</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Thủy Đình Trà Đạo Gỗ Đàn Hương Cổ Thụ
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Khung vì kèo cột gỗ Đàn Hương 80 năm tuổi liên kết mộng nêm truyền thống không đinh sắt, tỏa hương thanh tịnh tự nhiên kết hợp thác tràn đá Granite Bình Định hạ nhiệt vi khí hậu 3.6°C đón gió rạch mát lành.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Cột trái: Mô phỏng Bệ Xoay Bonsai 360 độ & Thác Tràn (7 cột) */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-secondary/50 p-6 sm:p-8 lg:col-span-7">
            {/* Thanh thông số vi khí hậu thực tế */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-ink/60">HẠ NHIỆT THÁC NƯỚC:</span>
                <span className="font-semibold text-ink">{currentBonsai.tempDrop}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">ĐỘ ẨM KHÍ TRỜI:</span>
                <span className="font-semibold text-ink">{currentBonsai.humidityReq}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">GÓC XOAY:</span>
                <span className="font-semibold text-primary">{rotationAngle}°</span>
              </div>
            </div>

            {/* Khung mô phỏng đồ họa Thủy Đình */}
            <div className="relative my-8 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-ink/5 p-6">
              {/* Lớp sương mù vi khí hậu */}
              {isMistingActive && (
                <div className="pointer-events-none absolute inset-0 bg-radial from-white/30 via-white/10 to-transparent blur-md animate-pulse" />
              )}

              {/* Bệ xoay Bonsai 360 độ */}
              <div 
                className="relative flex flex-col items-center justify-center transition-transform duration-500 ease-out"
                style={{ transform: `rotate(${rotationAngle}deg)` }}
              >
                {/* Đế đá Granite Bình Định tròn */}
                <div className="relative flex h-48 w-48 sm:h-64 sm:w-64 items-center justify-center rounded-full border-4 border-primary/25 bg-stone-300/80 shadow-2xl">
                  {/* Vân nẹp đồng thau bo viền */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-stone-500/50" />
                  
                  {/* Chậu gốm & Bonsai */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-16 w-32 rounded-b-xl border-2 border-stone-700 bg-stone-900 shadow-inner flex items-center justify-center">
                      <span className="text-[10px] font-mono tracking-widest text-amber-200/80">GU · GRANITE</span>
                    </div>
                    {/* Dáng cây Bonsai */}
                    <div className="relative -mt-10 flex flex-col items-center">
                      <div className="h-20 w-36 rounded-full bg-emerald-800/90 shadow-lg blur-[0.5px] flex items-center justify-center">
                        <span className="text-xs font-serif text-emerald-100">{currentBonsai.name}</span>
                      </div>
                      <div className="-mt-3 h-14 w-28 rounded-full bg-emerald-950/80 shadow-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay góc dưới */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-surface-primary/80 px-3 py-1.5 backdrop-blur-sm border border-line text-[11px] font-mono text-ink/70">
                GỖ ĐÀN HƯƠNG 80 NĂM · BỆ XOAY 360° MỘNG NÊM
              </div>
            </div>

            {/* Bảng điều khiển góc xoay và các tiện ích */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-ink/70 mb-2">
                  <span>Điều chỉnh góc xoay ngắm Bonsai (360°)</span>
                  <span className="font-mono text-primary font-semibold">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="5"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsMistingActive(!isMistingActive)}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                    isMistingActive 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'border border-line bg-surface-primary text-ink hover:bg-surface-secondary'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isMistingActive ? 'bg-white animate-ping' : 'bg-ink/30'}`} />
                  {isMistingActive ? 'Hệ Phun Sương Nano: Đang Bật' : 'Bật Phun Sương Vi Khí Hậu'}
                </button>

                <button
                  type="button"
                  onClick={toggleSoundscape}
                  className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all ${
                    isSoundActive 
                      ? 'bg-emerald-700 text-white shadow-sm' 
                      : 'border border-line bg-surface-primary text-ink hover:bg-surface-secondary'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${isSoundActive ? 'bg-emerald-300 animate-pulse' : 'bg-ink/30'}`} />
                  {isSoundActive ? 'Soundscape 528Hz: Đang Phát' : 'Bật Âm Thanh Thủy Đình 528Hz'}
                </button>
              </div>
            </div>
          </div>

          {/* Cột phải: Thông số Bonsai Bách Niên (5 cột) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Bộ chọn danh mục Bonsai */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-ink/60">
                Tuyển tập Bonsai Cổ Thụ
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:grid-cols-1">
                {BONSAI_COLLECTION.map((bonsai, idx) => (
                  <button
                    key={bonsai.name}
                    type="button"
                    onClick={() => setSelectedBonsaiIndex(idx)}
                    className={`flex flex-col rounded-xl border p-3.5 text-left transition-all ${
                      selectedBonsaiIndex === idx
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-line bg-surface-primary hover:border-ink/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-ink">{bonsai.name}</span>
                      <span className="text-[11px] font-mono text-primary">{bonsai.age}</span>
                    </div>
                    <span className="mt-1 text-xs text-ink/60 line-clamp-1">{bonsai.style}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chi tiết thông số cây đang chọn */}
            <div className="rounded-2xl border border-line bg-surface-primary p-6 shadow-sm">
              <h3 className="font-serif text-lg font-medium text-ink">
                {currentBonsai.name} · {currentBonsai.age}
              </h3>
              <p className="mt-1 text-xs font-mono text-primary">
                Dáng thế: {currentBonsai.style}
              </p>

              <div className="mt-4 border-t border-line pt-4 space-y-3 text-xs leading-relaxed text-ink/80">
                <p>{currentBonsai.description}</p>
                <div className="rounded-lg bg-surface-secondary/70 p-3 text-[11px] text-ink/70">
                  <span className="font-semibold text-ink">Xuất xứ & Thuần dưỡng:</span> {currentBonsai.origin}
                </div>
                <div className="rounded-lg bg-primary/5 p-3 text-[11px] text-primary">
                  <span className="font-semibold">Giải pháp kỹ thuật:</span> {currentBonsai.notes}
                </div>
              </div>

              {/* Cam kết tiêu chuẩn thương hiệu GuHomes */}
              <div className="mt-6 border-t border-line pt-4 flex items-center justify-between text-[11px] text-ink/60">
                <span>Hotline KTS Trưởng: 0368 757 916</span>
                <span>Trần 12 công trình/năm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
