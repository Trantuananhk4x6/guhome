'use client'

import { useState, useId } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type SpeedRPM = 33 | 45

interface VinylTrack {
  id: string
  title: string
  artist: string
  album: string
  year: string
  genre: string
  audioFrequency: number // Base tone in Hz for web audio
  description: string
}

const VINYL_TRACKS: VinylTrack[] = [
  {
    id: 'diem-xua',
    title: 'Diễm Xưa (Acoustic Vinyl Master)',
    artist: 'Khánh Ly & Guitar Mộc',
    album: 'Sơn Ca 7 — Bản Thu Băng Cối 1974',
    year: '1974',
    genre: 'Nhạc Trịnh Analog',
    audioFrequency: 220, // A3
    description: 'Tiếng mộc của thùng đàn guitar thùng gỗ hồng đào và chất giọng trầm khàn đặc trưng ngân vang mộc mạc.',
  },
  {
    id: 'autumn-leaves',
    title: 'Autumn Leaves (Direct-to-Disc 45 RPM)',
    artist: 'Cannonball Adderley & Miles Davis',
    album: 'Somethin\' Else (Blue Note 1595)',
    year: '1958',
    genre: 'Cool Jazz',
    audioFrequency: 293.66, // D4
    description: 'Âm sắc kèn trumpet bịt mút của Miles Davis trong vắt, dải động rộng mở không bị nén âm kỹ thuật số.',
  },
  {
    id: 'bach-cello-prelude',
    title: 'Cello Suite No. 1 in G Major',
    artist: 'Yo-Yo Ma',
    album: 'The Unaccompanied Cello Suites',
    year: '1983',
    genre: 'Classical Solo',
    audioFrequency: 196, // G3
    description: 'Âm trầm của dây đàn ruột cừu cộng hưởng với bệ đá bazan đen 45kg tạo độ sâu lắng tĩnh tại đến nghẹt thở.',
  },
]

export function SaigonBespokeAudiophileTurntableVault({ className }: { className?: string }) {
  const componentId = useId()
  const [speed, setSpeed] = useState<SpeedRPM>(33)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [activeTrackId, setActiveTrackId] = useState<string>('diem-xua')
  const [strobeSynced, setStrobeSynced] = useState<boolean>(true)
  const [magLevExploded, setMagLevExploded] = useState<boolean>(false)

  const currentTrack = VINYL_TRACKS.find((t) => t.id === activeTrackId) ?? VINYL_TRACKS[0]!

  const togglePlayback = () => {
    const nextState = !isPlaying
    setIsPlaying(nextState)

    // Play subtle vinyl crackle + analog tone safely
    try {
      if (typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (AudioCtx) {
          const ctx = new AudioCtx()
          if (nextState) {
            // Analog pure tone
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.type = 'sine'
            osc.frequency.setValueAtTime(currentTrack.audioFrequency, ctx.currentTime)
            osc.frequency.exponentialRampToValueAtTime(currentTrack.audioFrequency * 1.5, ctx.currentTime + 1.2)
            osc.frequency.exponentialRampToValueAtTime(currentTrack.audioFrequency, ctx.currentTime + 2.5)

            gain.gain.setValueAtTime(0.04, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0)

            osc.connect(gain)
            gain.connect(ctx.destination)
            osc.start()
            osc.stop(ctx.currentTime + 3.0)
          }
        }
      }
    } catch {
      // Audio context autoplay fallback
    }
  }

  return (
    <section
      id={`audiophile-turntable-vault-${componentId}`}
      aria-label="Bàn mâm xoay đĩa than đệm từ trường đá bazan GuHomes"
      className={cn(
        'relative w-full overflow-hidden bg-stone-950 py-24 text-stone-100 selection:bg-amber-500/30 selection:text-amber-200',
        className
      )}
    >
      {/* Background Amber Gold Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-br from-amber-600/30 via-yellow-700/10 to-transparent blur-[140px]" />
        <div className="absolute -bottom-20 right-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-stone-800/40 via-amber-900/10 to-transparent blur-[130px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-6 border-b border-stone-800/80 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-mono tracking-widest text-amber-300">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              02 / THIẾT BỊ ÂM HỌC ANALOG AUDIOPHILE HI-END
            </div>
            <h2 className="mt-5 font-serif text-3xl font-light tracking-tight text-stone-100 sm:text-4xl lg:text-5xl leading-tight">
              Bàn Mâm Xoay Đĩa Than Đệm Từ Trường &amp; Bệ Đá Bazan Đắk Nông 45KG
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-stone-400 lg:text-lg">
              Đỉnh cao của trải nghiệm âm thanh mộc: mâm quay mạ vàng 24K nâng lơ lửng bằng lực đẩy nam châm vĩnh cửu
              Neodymium, triệt tiêu 100% ma sát cơ học và rung chấn vi mô. Toàn bộ hệ thống tọa lạc trên phiến đá bazan
              nguyên khối 45kg, kết hợp tay cần Tonearm carbon 12-inch và mạch tiền khuếch đại đèn điện tử 300B Class A.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-stone-800 bg-stone-900/80 p-5 backdrop-blur-sm lg:min-w-[280px]">
            <div className="flex items-center justify-between text-xs font-mono text-stone-400">
              <span>ĐỆM TỪ TRƯỜNG MAG-LEV</span>
              <span className="text-amber-400 font-bold">ZERO FRICTION</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">TRỌNG LƯỢNG BỆ ĐÁ</span>
                <span className="font-mono text-base font-medium text-amber-300">45.0 KG BAZAN</span>
              </div>
              <div className="rounded-lg bg-stone-950/70 p-2.5 border border-stone-800/60">
                <span className="block text-[11px] font-mono text-stone-500">ĐỘ SAI SỐ VÒNG</span>
                <span className="font-mono text-base font-medium text-emerald-300">&plusmn;0.02% WOW</span>
              </div>
            </div>
            <div className="text-[11px] text-stone-400 italic">
              * Khoảng cách nâng từ trường 2.5mm không tiếp xúc trục quay kim loại.
            </div>
          </div>
        </div>

        {/* Section 1: Mâm Quay Đĩa & Thử Nghiệm Tốc Độ Strobe */}
        <div className="mb-20 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Interactive Turntable Visualizer & Strobe (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/60 p-8 lg:col-span-7">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                    ĐIỀU TỐC TỰ ĐỘNG CHÍNH XÁC
                  </span>
                  <h3 className="mt-1 font-serif text-2xl font-light text-stone-100">
                    Mô Phỏng Mâm Xoay 33⅓ &amp; 45 Vòng/Phút (RPM)
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {([33, 45] as SpeedRPM[]).map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => setSpeed(sp)}
                      className={cn(
                        'px-3 py-1.5 text-xs font-mono rounded-lg border transition-all min-h-[44px]',
                        speed === sp
                          ? 'border-amber-400 bg-amber-400/20 text-amber-300 font-bold'
                          : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      {sp === 33 ? '33⅓ RPM' : '45 RPM'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Graphic Turntable with Rotating Vinyl & Carbon Tonearm */}
              <div className="relative my-8 flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950">
                {/* 45kg Basalt Stone Monolithic Base Texture */}
                <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

                {/* Rotating Vinyl Platter */}
                <div
                  style={{
                    animation: isPlaying
                      ? `spin ${speed === 33 ? '1.8s' : '1.33s'} linear infinite`
                      : 'none',
                  }}
                  className="relative z-10 flex h-48 w-48 sm:h-52 sm:w-52 items-center justify-center rounded-full border-4 border-amber-600/60 bg-gradient-to-tr from-stone-900 via-stone-800 to-stone-900 shadow-2xl"
                >
                  {/* Vinyl Grooves concentric rings */}
                  <div className="h-40 w-40 rounded-full border border-stone-700/60 opacity-60" />
                  <div className="absolute h-32 w-32 rounded-full border border-stone-700/60 opacity-60" />
                  <div className="absolute h-24 w-24 rounded-full border border-stone-700/60 opacity-60" />

                  {/* Gold Label Center with Spindle */}
                  <div className="absolute h-14 w-14 rounded-full border border-amber-500 bg-gradient-to-br from-amber-500 to-yellow-600 shadow-inner flex items-center justify-center">
                    <span className="text-[8px] font-mono text-stone-950 font-bold">GU-VINYL</span>
                  </div>
                  <div className="absolute h-2.5 w-2.5 rounded-full bg-stone-200 shadow-sm" />
                </div>

                {/* Carbon Fiber Tonearm reaching in */}
                <div className="absolute right-6 top-8 z-20 flex flex-col items-end pointer-events-none">
                  <div className="h-4 w-4 rounded-full border border-amber-400 bg-stone-800 shadow" />
                  <div
                    style={{
                      transform: isPlaying ? 'rotate(-24deg)' : 'rotate(0deg)',
                      transformOrigin: 'top right',
                      transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                    className="h-32 w-1 bg-gradient-to-b from-stone-400 via-stone-600 to-amber-500"
                  />
                  {/* Cartridge Swiss MC */}
                  <div
                    style={{
                      transform: isPlaying ? 'translate(-28px, 6px)' : 'none',
                      transition: 'transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
                    }}
                    className="h-3 w-5 bg-amber-400 rounded-sm shadow-md"
                  />
                </div>

                {/* Strobe Light Indicator */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg border border-stone-800 bg-stone-900/90 px-3 py-1.5 text-[11px] font-mono">
                  <span className={cn('h-2 w-2 rounded-full', isPlaying ? 'bg-amber-400 animate-ping' : 'bg-stone-600')} />
                  <span className="text-stone-300">ĐÈN STROBE 50Hz: {strobeSynced ? 'CHUẨN VÒNG' : 'LECH'}</span>
                </div>
              </div>

              {/* Playback Controls & Track Info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-stone-800 bg-stone-950/80 p-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block">
                    ĐANG PHÁT ANALOG
                  </span>
                  <h4 className="font-serif text-base text-stone-100">{currentTrack.title}</h4>
                  <p className="text-xs text-stone-400 font-light">
                    {currentTrack.artist} &middot; {currentTrack.album} ({currentTrack.year})
                  </p>
                </div>

                <button
                  type="button"
                  onClick={togglePlayback}
                  className={cn(
                    'flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition-all min-h-[44px]',
                    isPlaying
                      ? 'bg-amber-500 text-stone-950 font-bold hover:bg-amber-400 shadow-lg'
                      : 'bg-stone-800 text-stone-200 hover:bg-stone-700'
                  )}
                >
                  {isPlaying ? 'TẠM DỪNG ĐĨA' : 'HẠ TAY CẦN & PHÁT'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Mag-Lev Mechanism & Technical Schematics (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/80 p-8 lg:col-span-5 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                <span className="text-xs font-mono text-amber-300 uppercase tracking-widest">
                  CƠ CHẾ ĐỆM TỪ TRƯỜNG MAG-LEV
                </span>
                <span className="text-xs font-mono text-stone-500">NEODYMIUM N52</span>
              </div>

              <h4 className="mt-4 font-serif text-xl font-light text-stone-100">
                Sơ Đồ Cắt Lớp Chống Rung Triệt Để
              </h4>
              <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                Hai vành nam châm đối cực cực mạnh đẩy nhau tạo đệm khí 2.5mm, nâng toàn bộ mâm quay nặng 12kg mà không
                chạm vào ổ trục cơ học, loại bỏ tiếng rền hum và tạp âm ma sát.
              </p>

              {/* Exploded View Toggle */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setMagLevExploded(!magLevExploded)}
                  className="rounded-lg border border-stone-700 px-3 py-1.5 text-xs font-mono text-stone-300 hover:border-amber-500 hover:text-amber-300 transition-colors min-h-[44px]"
                >
                  {magLevExploded ? 'Thu Hồi Mặt Cắt Lớp' : 'Xem Cắt Lớp Đệm Từ Trường'}
                </button>
              </div>

              {/* Technical Specifications */}
              <div className="mt-5 rounded-xl border border-stone-800 bg-stone-950/90 p-4 space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Bệ Đá Bazan Đắk Nông:</span>
                  <span className="font-mono font-medium text-amber-200">45 KG (Khử rung chấn)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Khe Hở Nâng Từ Trường:</span>
                  <span className="font-mono font-medium text-emerald-400">2.5 mm đối cực N-N</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Tay Cần Tonearm:</span>
                  <span className="font-mono font-medium text-stone-200">12-inch Carbon dệt đa trục</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-400">Đầu Kim Cartridge:</span>
                  <span className="font-mono font-medium text-amber-300">MC Kim Cương Micro-Ridge</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-400">Preamp Phono Tích Hợp:</span>
                  <span className="font-mono font-medium text-stone-100">Đèn 300B Class A thuần khiết</span>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-stone-800 pt-4 text-xs font-mono text-stone-500 flex items-center justify-between">
              <span>ĐỘ BỀN NAM CHÂM TRÊN 100 NĂM</span>
              <span className="text-amber-400 font-medium">BẢO HÀNH CHÍNH HÃNG GUHOMES</span>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900/40 p-8 lg:p-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <h4 className="font-serif text-xl font-light text-stone-100">
              Trải nghiệm phòng nghe nhạc đĩa than cách âm RT60 0.35s tại Studio GuHomes Q.12
            </h4>
            <p className="mt-1 text-xs text-stone-400 font-light">
              Kỹ sư âm học GuHomes sẽ đo đạc trường âm thực tế và hiệu chuẩn bộ kim theo gu thưởng nhạc của gia chủ.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-stone-100 px-5 py-2.5 text-xs font-medium text-stone-950 transition-colors hover:bg-stone-200 min-h-[44px]"
            >
              <span>Đăng ký nghe thử đĩa than</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/du-toan-chi-phi"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-5 py-2.5 text-xs font-medium text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100 min-h-[44px]"
            >
              <span>Dự toán thiết kế phòng nghe</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
