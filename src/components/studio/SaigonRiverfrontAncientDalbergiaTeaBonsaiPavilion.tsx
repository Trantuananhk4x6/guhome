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
    name: 'Bách Bách Niên Cổ Thụ',
    age: '110 năm tuổi',
    style: 'Trực huyền hoành sơn (Thân đứng ngả ngang đón gió sông)',
    origin: 'Rừng nguyên sinh Tây Nguyên, thuần dưỡng 32 năm tại vườn GuHomes',
    humidityReq: '72% - 78% RH',
    tempDrop: '-3.8°C',
    description: 'Tán lá vảy xếp tầng đón luồng khí đối lưu từ sông Sài Gòn, thân lũa tự nhiên phong hóa qua một thế kỷ mang dấu ấn trầm mặc vô vi.',
    notes: 'Bệ xoay 360 độ cơ khí chính xác, phun sương siêu âm nano làm mát vi khí hậu.'
  },
  {
    name: 'Mai Chiếu Thủy Lá Kim Độc Bản',
    age: '92 năm tuổi',
    style: 'Thác đổ ngọa tùng (Vươn mình soi bóng mặt nước)',
    origin: 'Vùng sông nước Bến Tre, nghệ nhân miệt vườn tạo tác qua 3 thế hệ',
    humidityReq: '75% - 82% RH',
    tempDrop: '-3.5°C',
    description: 'Thân cây u bướu phủ rêu phong tự nhiên, hoa trắng li ti buông rủ thơm dịu về đêm khi gió sông thổi vào lòng thủy đình.',
    notes: 'Rễ bám đá Bazan đen Đắk Nông, hệ lọc nước tuần hoàn vi sinh tự nhiên.'
  },
  {
    name: 'Cần Thăng Thần Sa Đại Thụ',
    age: '85 năm tuổi',
    style: 'Phu thê tương kính (Hai thân đồng căn vươn lên hòa hợp)',
    origin: 'Vùng đồi bazan Gia Lai, tạo hình dáng thế cổ truyền cung đình',
    humidityReq: '70% - 75% RH',
    tempDrop: '-3.6°C',
    description: 'Vỏ nứt nẻ vân rùa tượng trưng cho sự trường tồn kiên định, lá xanh thẫm quanh năm tràn đầy sinh khí nhiệt đới phương Nam.',
    notes: 'Hệ thống đèn LED quang hợp 4000K ấm áp kích thích chồi lộc non.'
  }
]

export function SaigonRiverfrontAncientDalbergiaTeaBonsaiPavilion() {
  const [selectedBonsaiIndex, setSelectedBonsaiIndex] = useState(0)
  const [rotationAngle, setRotationAngle] = useState(45)
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
        gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.6)
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop()
            oscillatorRef.current.disconnect()
            oscillatorRef.current = null
          }
          setIsSoundActive(false)
        }, 600)
      } else {
        setIsSoundActive(false)
      }
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioContextClass()
        audioContextRef.current = ctx

        // Soundscape 432Hz Solfeggio hòa âm sông nước
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(432, ctx.currentTime) // Tần số 432Hz chữa lành và tĩnh tại

        gain.gain.setValueAtTime(0.0001, ctx.currentTime)
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 1.2)

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
      {/* Nền họa tiết vi khí hậu sông nước Sài Gòn */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="river-wave-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 0 30 Q 15 15, 30 30 T 60 30" fill="none" stroke="currentColor" strokeWidth="1" />
              <path d="M 0 45 Q 15 30, 30 45 T 60 45" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#river-wave-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header định vị Quiet Luxury & Kiến trúc thích ứng */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium tracking-widest text-primary uppercase">
            <span>KIẾN TRÚC THỦY ĐÌNH VEN SÔNG SÀI GÒN</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>XƯỞNG THẠNH XUÂN 1.200M²</span>
          </div>

          <h2 className="mt-6 font-serif text-3xl font-normal tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Thủy Đình Trà Đạo & Bonsai Gỗ Cẩm Lai
          </h2>

          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">
            Một nốt lặng ven rạch uốn quanh biệt thự ven sông: kết cấu cột xà gỗ Cẩm Lai Nam Bộ 80 năm tuổi liên kết mộng nêm hoàn toàn không đinh kim loại, ôm trọn hồ nước sinh thái lọc đá núi lửa làm mát vi khí hậu 3.8°C tự nhiên.
          </p>
        </div>

        {/* Khung tương tác chính */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Cột trái: Mô phỏng không gian Thủy Đình & Bệ Xoay Bonsai 360 độ (7 cột) */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-secondary/50 p-6 sm:p-8 lg:col-span-7">
            {/* Thanh trạng thái vi khí hậu thực tế */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-ink/60">VI KHÍ HẬU SÔNG NƯỚC:</span>
                <span className="font-semibold text-ink">{currentBonsai.tempDrop}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">ĐỘ ẨM KHUYẾN NGHỊ:</span>
                <span className="font-semibold text-ink">{currentBonsai.humidityReq}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-ink/60">GÓC NGẮM:</span>
                <span className="font-semibold text-primary">{rotationAngle}°</span>
              </div>
            </div>

            {/* Khung mô phỏng đồ họa Thủy Đình & Bonsai */}
            <div className="relative my-8 flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xl bg-ink/5 p-6">
              {/* Lớp sương mù vi khí hậu khi kích hoạt */}
              {isMistingActive && (
                <div className="pointer-events-none absolute inset-0 bg-radial from-white/30 via-white/10 to-transparent blur-md animate-pulse" />
              )}

              {/* Mô phỏng bệ xoay Bonsai 360 độ */}
              <div 
                className="relative flex flex-col items-center justify-center transition-transform duration-500 ease-out"
                style={{ transform: `rotate(${rotationAngle}deg)` }}
              >
                {/* Đế bệ đá Travertine tròn */}
                <div className="relative flex h-48 w-48 sm:h-64 sm:w-64 items-center justify-center rounded-full border-4 border-primary/20 bg-stone-200/80 shadow-2xl">
                  {/* Vân bệ đá */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-stone-400/50" />
                  
                  {/* Mô hình chậu cây Bonsai & dáng cây */}
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="h-16 w-32 rounded-b-xl border-2 border-stone-600 bg-stone-800 shadow-inner flex items-center justify-center">
                      <span className="text-[10px] font-mono tracking-widest text-stone-300">GUHOMES · BAZAN</span>
                    </div>
                    {/* Tán cây Bonsai */}
                    <div className="relative -mt-10 flex flex-col items-center">
                      <div className="h-20 w-36 rounded-full bg-emerald-800/90 shadow-lg blur-[0.5px] flex items-center justify-center">
                        <span className="text-xs font-serif text-emerald-100">{currentBonsai.name}</span>
                      </div>
                      <div className="-mt-3 h-14 w-28 rounded-full bg-emerald-900/80 shadow-md" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay la bàn xoay định hướng */}
              <div className="pointer-events-none absolute bottom-4 left-4 rounded-lg bg-surface-primary/80 px-3 py-1.5 backdrop-blur-sm border border-line text-[11px] font-mono text-ink/70">
                XOAY BỆ 360° · KẾT CẤU CẨM LAI MỘNG NÊM
              </div>
            </div>

            {/* Bảng điều khiển góc xoay và các tiện ích */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-ink/70 mb-2">
                  <span>Điều chỉnh góc ngắm Bonsai (360°)</span>
                  <span className="font-mono text-primary">{rotationAngle}°</span>
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
                  {isSoundActive ? 'Soundscape 432Hz: Đang Phát' : 'Bật Âm Thanh Sông Nước 432Hz'}
                </button>
              </div>
            </div>
          </div>

          {/* Cột phải: Thông số tác phẩm & Triết lý kiến trúc (5 cột) */}
          <div className="space-y-6 lg:col-span-5">
            {/* Bộ chọn danh mục Bonsai cổ thụ */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-ink/60">
                Tuyển tập Bonsai Bách Niên
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
