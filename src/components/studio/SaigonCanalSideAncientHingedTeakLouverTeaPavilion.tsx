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
    name: 'Cần Thăng Ngọa Long Cổ Thụ',
    age: '80 năm tuổi',
    style: 'Ngọa long nghênh thủy (Thân uốn lượn như rồng đón sóng)',
    origin: 'Vùng đồi bazan Gia Lai, tạo tác và thuần dưỡng 30 năm tại GuHomes',
    humidityReq: '70% - 75% RH',
    tempDrop: '-3.9°C',
    description: 'Thân vảy nứt nẻ phong sương cổ kính, tán lá xanh thẫm đọng sương rạch sớm mai, tràn đầy sinh khí miền nhiệt đới phương Nam.',
    notes: 'Bệ xoay 360 độ cơ khí chính xác, hệ phun sương nano siêu âm làm mát tự nhiên.'
  },
  {
    name: 'Mai Chiếu Thủy Thác Đổ Bách Niên',
    age: '95 năm tuổi',
    style: 'Huyền nhai giáng vân (Cành buông rủ thanh thoát như thác nước)',
    origin: 'Miệt vườn sông nước Bến Tre, truyền đời qua 3 thế hệ nghệ nhân',
    humidityReq: '75% - 82% RH',
    tempDrop: '-3.7°C',
    description: 'Thân cây bọc rêu xanh tự nhiên, hoa trắng li ti tỏa hương ngát dịu về đêm khi gió từ rạch thổi vào lòng thủy đình.',
    notes: 'Rễ bám phiến đá Bazan Đắk Nông nguyên khối, hệ lọc nước sinh học tuần hoàn.'
  },
  {
    name: 'Linh Sam Sông Hinh Lũa Thép',
    age: '88 năm tuổi',
    style: 'Trực huyền phong ba (Thân đứng hiên ngang vượt qua bão táp)',
    origin: 'Rừng đá Sông Hinh Phú Yên, lũa tự nhiên cứng cáp như kim loại',
    humidityReq: '68% - 74% RH',
    tempDrop: '-3.8°C',
    description: 'Thớ lũa xoắn ốc bóng mượt tương phản với tán lá xanh biếc, biểu tượng cho cốt cách kiên định và tâm thế tĩnh tại của gia chủ.',
    notes: 'Cảm biến độ ẩm tự động kích hoạt phun sương khi ẩm độ dưới 68% RH.'
  }
]

export function SaigonCanalSideAncientHingedTeakLouverTeaPavilion() {
  const [selectedBonsaiIndex, setSelectedBonsaiIndex] = useState(0)
  const [louverAngle, setLouverAngle] = useState(45)
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

        // Soundscape 432Hz Solfeggio hòa âm tiếng gió rạch qua lam gỗ Teak
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(432, ctx.currentTime)

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.0)

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
      {/* Nền hoa văn nan lam gỗ Teak đối lưu khí trời */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="teak-louver-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <line x1="0" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="0" y1="25" x2="40" y2="25" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#teak-louver-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header định vị Thủy Đình */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            <span>THỦY ĐÌNH LAM GỖ TEAK XOAY 180°</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>XƯỞNG THẠNH XUÂN 1.200M²</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Thủy Đình Lam Gỗ Teak Xoay & Bonsai Bách Niên
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Hệ lam louver gỗ Teak 80 năm sấy chân không xoay 180° đón gió rạch tự nhiên, kết hợp rèm trúc hun khói cản nắng và hồ nước sinh thái hạ nhiệt vi khí hậu 3.9°C mượt mà không cần máy lạnh.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Cột trái: Mô phỏng Lam Gỗ Teak Xoay & Bệ Bonsai 360 độ (7 cột) */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-secondary/50 p-6 sm:p-8 lg:col-span-7">
            {/* Thanh thông số vi khí hậu thực tế */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-ink/60">HẠ NHIỆT VI KHÍ HẬU:</span>
                <span className="font-semibold text-ink">{currentBonsai.tempDrop}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">GÓC LAM GỖ TEAK:</span>
                <span className="font-semibold text-primary">{louverAngle}°</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">ẨM ĐỘ KHÍ TRỜI:</span>
                <span className="font-semibold text-ink">{currentBonsai.humidityReq}</span>
              </div>
            </div>

            {/* Khung mô phỏng đồ họa Lam Teak & Bonsai */}
            <div className="relative my-8 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-ink/5 p-6">
              {/* Lớp sương mù vi khí hậu */}
              {isMistingActive && (
                <div className="pointer-events-none absolute inset-0 bg-radial from-white/30 via-white/10 to-transparent blur-md animate-pulse" />
              )}

              {/* Mô phỏng khung lam gỗ Teak xoay */}
              <div className="relative flex flex-col items-center justify-center">
                {/* Hệ lam Teak xoay quanh bệ */}
                <div 
                  className="relative flex h-52 w-52 sm:h-64 sm:w-64 items-center justify-center rounded-full border-4 border-amber-800/40 bg-stone-300/80 shadow-2xl transition-transform duration-500"
                  style={{ transform: `rotate(${louverAngle}deg)` }}
                >
                  {/* Các nan lam Teak đối lưu */}
                  <div className="absolute inset-3 rounded-full border border-dashed border-amber-900/40" />
                  <div className="absolute top-2 bottom-2 w-1 bg-amber-900/60 rounded-full" />
                  <div className="absolute left-2 right-2 h-1 bg-amber-900/60 rounded-full" />

                  {/* Bệ Bonsai trung tâm */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-14 w-28 rounded-b-xl border-2 border-stone-700 bg-stone-900 shadow-inner flex items-center justify-center">
                      <span className="text-[9px] font-mono tracking-widest text-amber-200">TEAK · LOUVER</span>
                    </div>
                    {/* Tán Bonsai */}
                    <div className="relative -mt-8 flex flex-col items-center">
                      <div className="h-16 w-32 rounded-full bg-emerald-800/90 shadow-lg blur-[0.5px] flex items-center justify-center">
                        <span className="text-[11px] font-serif text-emerald-100">{currentBonsai.name}</span>
                      </div>
                      <div className="-mt-2 h-12 w-24 rounded-full bg-emerald-950/80 shadow-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay góc dưới */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-surface-primary/80 px-3 py-1.5 backdrop-blur-sm border border-line text-[11px] font-mono text-ink/70">
                GỖ TEAK SẤY CHÂN KHÔNG · LAM XOAY 180° MỘNG NÊM
              </div>
            </div>

            {/* Bảng điều khiển góc lam Teak & tiện ích */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-ink/70 mb-2">
                  <span>Điều chỉnh góc mở lam gỗ Teak (0° - 180°)</span>
                  <span className="font-mono text-primary font-semibold">{louverAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  step="5"
                  value={louverAngle}
                  onChange={(e) => setLouverAngle(Number(e.target.value))}
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
                  {isMistingActive ? 'Phun Sương Nano: Đang Bật' : 'Bật Phun Sương Vi Khí Hậu'}
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
                  {isSoundActive ? 'Soundscape 432Hz: Đang Phát' : 'Bật Âm Thanh Gió Lam 432Hz'}
                </button>
              </div>
            </div>
          </div>

          {/* Cột phải: Thông số Bonsai Bách Niên (5 cột) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Bộ chọn danh mục Bonsai */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-ink/60">
                Bộ Sưu Tập Bonsai Bách Niên
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
