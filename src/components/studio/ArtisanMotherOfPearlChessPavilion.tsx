'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

type ChessGameMode = 'chess' | 'xiangqi'
type LightAngle = '0' | '45' | '90'

interface ChessOpening {
  name: string
  moves: string
  significance: string
  tactics: string
}

const CHESS_OPENINGS: Record<ChessGameMode, ChessOpening[]> = {
  chess: [
    {
      name: 'Khai Cuộc Tây Ban Nha (Ruy Lopez)',
      moves: '1. e4 e5  2. Nf3 Nc6  3. Bb5 a6',
      significance: 'Khai cuộc quý tộc lâu đời bậc nhất lịch sử cờ vua phương Tây',
      tactics: 'Kiểm soát trung tâm vững chắc, chuẩn bị nhập thành cánh vua và tạo áp lực liên tục lên ô c6.',
    },
    {
      name: 'Phòng Thủ Sicilian (Sicilian Defense)',
      moves: '1. e4 c5  2. Nf3 d6  3. d4 cxd4',
      significance: 'Chiến thuật phản công bất đối xứng sắc bén của các Đại kiện tướng',
      tactics: 'Tấn công mạn sườn, tranh chấp cột mở c và tạo thế cờ đôi công nảy lửa.',
    },
    {
      name: 'Gambit Hậu (Queen\'s Gambit Declined)',
      moves: '1. d4 d5  2. c4 e6  3. Nc3 Nf6',
      significance: 'Thế cờ trí tuệ cổ điển biểu tượng cho sự kiên nhẫn và bền bỉ',
      tactics: 'Chiếm lĩnh không gian trung tâm bài bản, dồn ép đối thủ từng bước bằng ưu thế vị trí.',
    },
  ],
  xiangqi: [
    {
      name: 'Pháo Đầu Tiến Mã (Trung Pháo Quá Hà Xa)',
      moves: '1. Pháo 2 bình 5  Mã 8 tiến 7  2. Xe 1 tiến 1',
      significance: 'Khai cuộc uy lực nhất trong kỳ nghệ phương Đông cổ truyền',
      tactics: 'Công thủ toàn diện, tạo gọng kìm trung lộ vững chắc và mở đường xe cơ động cao.',
    },
    {
      name: 'Khởi Mã Cuộc (Đơn Đề Mã Hậu Pháo)',
      moves: '1. Mã 2 tiến 3  Tốt 7 tiến 1  2. Tượng 3 tiến 5',
      significance: 'Thế cờ tĩnh tại ẩn nhẫn như núi cao rừng thẳm',
      tactics: 'Cố thủ kiên cố, đợi đối phương sơ hở để tung đòn phản kích dứt điểm bất ngờ.',
    },
    {
      name: 'Phi Tượng Cuộc (Tượng 3 Tiến 5)',
      moves: '1. Tượng 3 tiến 5  Pháo 8 bình 5  2. Mã 2 tiến 3',
      significance: 'Nghệ thuật dưỡng khí, kiểm soát thế trận an nhiên tự tại',
      tactics: 'Liên kết chặt chẽ hai cánh, bảo vệ tướng an toàn trước mọi đợt sóng gió công kích.',
    },
  ],
}

export function ArtisanMotherOfPearlChessPavilion({ className }: { className?: string } = {}) {
  const [gameMode, setGameMode] = useState<ChessGameMode>('chess')
  const [activeOpeningIdx, setActiveOpeningIdx] = useState<number>(0)
  const [lightAngle, setLightAngle] = useState<LightAngle>('45')
  const [rotationAngle, setRotationAngle] = useState<number>(45)
  const [pieceTapped, setPieceTapped] = useState<boolean>(false)

  const activeOpening = CHESS_OPENINGS[gameMode][activeOpeningIdx] ?? CHESS_OPENINGS[gameMode][0]!

  const handleTapPiece = () => {
    setPieceTapped(true)
    setTimeout(() => {
      setPieceTapped(false)
    }, 2000)
  }

  return (
    <section
      aria-label="Bàn Cờ Nghệ Nhân Gỗ Mun Sừng Khảm Ốc Xà Cừ Đỏ"
      className={cn('relative w-full overflow-hidden border-y border-stone-200/80 bg-stone-900 py-16 sm:py-24 text-stone-100', className)}
    >
      {/* Background ambient iridescent glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-emerald-950/20 blur-[140px]" />
        <div className="absolute bottom-10 right-1/3 h-96 w-96 rounded-full bg-purple-950/25 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,119,6,0.05),transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-950/40 px-3.5 py-1 text-xs tracking-widest text-amber-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            Tuyệt Tác Kỳ Đạo Hoàng Gia
          </div>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl text-stone-100 tracking-tight leading-snug">
            Bàn Cờ Mun Sừng Khảm Ốc Xà Cừ Đỏ Singapore
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Nơi hội tụ trí tuệ và sự tĩnh tại của bậc quân tử. Khối gỗ Mun sừng nghìn năm đen nhánh như huyền thạch, 
            cẩn ốc xà cừ đỏ Singapore ngũ sắc phát quang dưới ánh đèn rọi 15° CRI 98, kết hợp quân cờ đúc đồng thau và đá mã não gõ vang trầm đục.
          </p>
        </div>

        {/* Interactive Chess Showcase Console */}
        <div className="mt-12 rounded-2xl border border-stone-800 bg-stone-950/80 p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: 360-degree piece viewer & iridescent refraction visualizer */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setGameMode('chess')
                        setActiveOpeningIdx(0)
                      }}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                        gameMode === 'chess'
                          ? 'bg-amber-500 text-stone-950 font-semibold'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Bàn Cờ Vua Quốc Tế
                    </button>
                    <button
                      onClick={() => {
                        setGameMode('xiangqi')
                        setActiveOpeningIdx(0)
                      }}
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                        gameMode === 'xiangqi'
                          ? 'bg-amber-500 text-stone-950 font-semibold'
                          : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      Bàn Cờ Tướng Cổ Truyền
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
                    <span>Đá Mã Não &amp; Đồng Đúc</span>
                    <span>|</span>
                    <span className="text-amber-400">CRI 98</span>
                  </div>
                </div>

                {/* 360 Degree Piece & Chessboard Refraction Simulation */}
                <div className="relative mt-6 h-64 sm:h-72 w-full overflow-hidden rounded-xl border border-stone-800 bg-gradient-to-b from-stone-950 via-stone-900 to-black p-5 flex flex-col justify-between">
                  {/* Top badges */}
                  <div className="flex items-center justify-between z-10 text-xs">
                    <div className="inline-flex items-center gap-2 rounded-md bg-stone-900/90 border border-stone-800 px-2.5 py-1 text-amber-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                      Góc Rọi Đèn: {lightAngle}° ({lightAngle === '0' ? 'Ánh Xanh Lục Biển' : lightAngle === '45' ? 'Ánh Tím Ruby Ngũ Sắc' : 'Ánh Vàng Hoàng Gia'})
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Góc xoay quan sát: {rotationAngle}°
                    </span>
                  </div>

                  {/* Stylized Chessboard Grid & Piece Visualizer */}
                  <div className="relative my-auto flex items-center justify-center z-10">
                    <div
                      style={{
                        transform: `rotate(${rotationAngle - 45}deg) scale(0.95)`,
                        transition: 'transform 0.4s ease-out',
                      }}
                      className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-lg border-4 border-amber-900/80 bg-stone-950 shadow-2xl p-2 grid grid-cols-4 grid-rows-4 gap-1"
                    >
                      {/* 16 Cells representing checkerboard inlaid with mother-of-pearl */}
                      {Array.from({ length: 16 }).map((_, i) => {
                        const isEven = (Math.floor(i / 4) + (i % 4)) % 2 === 0
                        return (
                          <div
                            key={i}
                            className={cn(
                              'rounded-sm flex items-center justify-center transition-all duration-500 relative overflow-hidden',
                              isEven
                                ? 'bg-stone-900 border border-stone-800'
                                : lightAngle === '0'
                                ? 'bg-gradient-to-br from-emerald-950 via-stone-800 to-teal-900 border border-emerald-600/40 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]'
                                : lightAngle === '45'
                                ? 'bg-gradient-to-br from-rose-950 via-stone-800 to-purple-900 border border-purple-500/40 shadow-[inset_0_0_10px_rgba(168,85,247,0.25)]'
                                : 'bg-gradient-to-br from-amber-950 via-stone-800 to-yellow-900 border border-amber-500/40 shadow-[inset_0_0_10px_rgba(245,158,11,0.25)]'
                            )}
                          >
                            {/* Stylized Center Chess King/General Piece */}
                            {i === 5 && (
                              <div
                                onClick={handleTapPiece}
                                className={cn(
                                  'h-8 w-8 rounded-full border-2 cursor-pointer transition-transform duration-300 flex items-center justify-center shadow-lg',
                                  pieceTapped ? 'scale-125 rotate-12' : 'hover:scale-110',
                                  'border-amber-400 bg-gradient-to-b from-amber-300 via-amber-600 to-amber-900 text-stone-950 font-serif font-bold text-xs'
                                )}
                                title="Nhấp để nghe tiếng gõ cờ vang trầm đục"
                              >
                                {gameMode === 'chess' ? '♔' : '帥'}
                              </div>
                            )}
                            {i === 10 && (
                              <div
                                onClick={handleTapPiece}
                                className={cn(
                                  'h-8 w-8 rounded-full border-2 cursor-pointer transition-transform duration-300 flex items-center justify-center shadow-lg',
                                  pieceTapped ? 'scale-125 -rotate-12' : 'hover:scale-110',
                                  'border-stone-400 bg-gradient-to-b from-stone-200 via-stone-400 to-stone-800 text-stone-950 font-serif font-bold text-xs'
                                )}
                              >
                                {gameMode === 'chess' ? '♚' : '將'}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Feedback on sound tap */}
                  <div className="flex items-center justify-between z-10 text-xs text-stone-400 font-mono">
                    <span>Mộng âm dương giấu kín ngăn kéo trượt mượt mà</span>
                    {pieceTapped && (
                      <span className="text-amber-400 font-medium animate-pulse">
                        ♫ Âm vang gõ bàn cờ: Trầm đục, vang ấm, tôn nghiêm
                      </span>
                    )}
                  </div>
                </div>

                {/* Light Angle & 360 Rotation Controls */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-stone-400 font-mono block">
                      Góc Rọi Đèn CRI 98 (Xem Phản Quang Xà Cừ):
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      {(['0', '45', '90'] as LightAngle[]).map((angle) => (
                        <button
                          key={angle}
                          onClick={() => setLightAngle(angle)}
                          className={cn(
                            'flex-1 rounded-lg border py-1.5 text-xs font-mono transition-all',
                            lightAngle === angle
                              ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-semibold'
                              : 'border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-200'
                          )}
                        >
                          {angle}°
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rotation-angle-range" className="text-xs uppercase tracking-wider text-stone-400 font-mono block">
                      Xoay Góc Quan Sát 360°: <span className="text-amber-400 font-bold">{rotationAngle}°</span>
                    </label>
                    <input
                      id="rotation-angle-range"
                      type="range"
                      min={0}
                      max={360}
                      step={5}
                      value={rotationAngle}
                      onChange={(e) => setRotationAngle(Number(e.target.value))}
                      className="mt-2.5 h-1.5 w-full appearance-none rounded-lg bg-stone-800 accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Classic Openings Explorer */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium block">
                  Khai Cuộc Kinh Điển Bậc Thầy:
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {CHESS_OPENINGS[gameMode].map((op, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveOpeningIdx(idx)}
                      className={cn(
                        'rounded-lg border px-3 py-1.5 text-xs transition-all',
                        activeOpeningIdx === idx
                          ? 'border-amber-500 bg-amber-500/10 text-stone-100 font-medium'
                          : 'border-stone-800 bg-stone-900/60 text-stone-400 hover:text-stone-200'
                      )}
                    >
                      {op.name.split('(')[0]}
                    </button>
                  ))}
                </div>

                <div className="mt-3 rounded-xl border border-stone-800 bg-stone-900/50 p-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-200">{activeOpening.name}</span>
                    <span className="font-mono text-amber-400">{activeOpening.moves}</span>
                  </div>
                  <p className="mt-1.5 text-xs text-stone-300 font-light leading-relaxed">
                    {activeOpening.significance}. {activeOpening.tactics}
                  </p>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Materials, Craftsmanship & Inscription Feature */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 sm:p-6 backdrop-blur">
              <div>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-mono font-medium">
                  Hồ Sơ Vật Liệu &amp; Điêu Khắc
                </span>
                <p className="mt-1 text-xs text-stone-400">
                  Ba nguyên liệu quý hiếm kiến tạo nên bộ bàn cờ di sản:
                </p>

                <div className="mt-4 space-y-3">
                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      01 / Gỗ Mun Sừng Đen Cổ Thụ
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Thớ gỗ mịn như sừng tê giác, chìm nghỉm trong nước và không bao giờ cong vênh co ngót trước độ ẩm mùa mưa nhiệt đới.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      02 / Ốc Xà Cừ Đỏ Singapore (Ốc Cửu Khổng)
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Vỏ ốc biển sâu tuyển chọn phiến dày, cắt gọt laser và tỉa tay mộng chìm; ánh phản quang 7 màu sắc nét không phai theo năm tháng.
                    </p>
                  </div>

                  <div className="rounded-xl border border-stone-800 bg-stone-950/60 p-3.5">
                    <div className="text-xs font-semibold text-stone-200">
                      03 / Quân Cờ Đồng Đúc &amp; Đá Mã Não
                    </div>
                    <p className="mt-1 text-xs text-stone-400 font-light leading-relaxed">
                      Đế lót nhung tơ tằm tránh xước mặt bàn; trọng lượng mỗi quân cờ đầm tay (55g - 80g), tạo cảm giác đĩnh đạc trong từng nước cờ.
                    </p>
                  </div>
                </div>

                {/* Concealed drawer mechanism */}
                <div className="mt-4 rounded-xl border border-amber-900/40 bg-amber-950/20 p-3.5">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    Hệ Ngăn Kéo Giấu Mộng Âm Dương
                  </div>
                  <p className="mt-1 text-[11px] text-stone-300 font-light leading-relaxed">
                    Hai ngăn kéo ẩn hai bên thân bàn dùng ray gỗ bôi sáp ong tự nhiên, kéo mở êm ái tuyệt đối không dùng ốc vít kim loại.
                  </p>
                </div>
              </div>

              {/* Consultation Link */}
              <div className="mt-6 pt-5 border-t border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-light">
                    Đặt chế tác theo phong thủy gia môn:
                  </span>
                  <Link
                    href="/du-toan-chi-phi"
                    className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
                  >
                    <span>Dự toán chế tác</span>
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Craftsmanship Note */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 px-6 py-4">
          <div className="text-xs text-stone-400">
            Chiêm ngưỡng trực tiếp bàn cờ khảm ốc mẫu tại{' '}
            <span className="font-medium text-stone-200">Không Gian Nghệ Thuật GuHomes (Thạnh Xuân, Q.12, TP.HCM)</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              <span>Đặt lịch thưởng cờ &amp; đàm đạo</span>
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </Link>
            <span className="text-stone-700">|</span>
            <a
              href="tel:0368757916"
              className="text-xs text-stone-300 hover:text-white font-mono transition-colors"
            >
              Hotline: 0368 757 916
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
