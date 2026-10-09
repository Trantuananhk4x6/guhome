'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BrushRestSpec {
  translucency: number
  magnification: number
  isBrushPlaced: boolean
  goldPurity: string
  jadeGrade: string
  woodBase: string
  lengthMm: number
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudLeafStudio() {
  const [translucency, setTranslucency] = useState<number>(98.4)
  const [magnification, setMagnification] = useState<number>(1.0)
  const [isBrushPlaced, setIsBrushPlaced] = useState<boolean>(true)
  const [soundFrequency, setSoundFrequency] = useState<528 | 1056>(528)
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false)
  const [activeView, setActiveView] = useState<'details' | 'materials' | 'craftsmanship'>('details')

  // Web Audio Context for Jade Resonance
  const audioCtxRef = useRef<AudioContext | null>(null)

  const playJadeChime = (freq: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = audioCtxRef.current || new AudioCtx()
      audioCtxRef.current = ctx

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 2.9)

      setAudioPlaying(true)
      setTimeout(() => setAudioPlaying(false), 2800)
    } catch (err) {
      console.error('Audio chime error:', err)
    }
  }

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#0c0d0f] py-28 text-[#ebe9e1]">
      {/* Background Jade Glow */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute left-1/3 top-1/4 h-96 w-96 rounded-full bg-[#3d7a5a] blur-[140px]" />
        <div className="absolute right-1/4 bottom-1/3 h-80 w-80 rounded-full bg-[#d4af37] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#44785b]/40 bg-[#141816] px-4 py-1.5 text-xs tracking-widest text-[#72ba91]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#72ba91]" />
            THƯ PHÒNG THƯỢNG HẠNG · BẢO VẬT KÊ NGỰ BÚT BÚP & LÁ SEN
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-light tracking-wide text-[#f5f3ec] md:text-5xl"
          >
            Kê Ngự Bút Búp & Lá Sen Phỉ Thúy Nẹp Vàng 24K Filigree
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#a3a096] md:text-base"
          >
            Tuyệt phẩm thư phòng điêu khắc thủ công nguyên khối từ Ngọc Bích Phỉ Thúy Type A Myanmar thấu quang 98.4%,
            tạo hình Búp Sen Cát Tường cuộn cùng Lá Sen xanh mướt, viền nẹp sợi vàng ròng 24K filigree 0.18mm, ngự trên bệ Gõ Đỏ Lào 250 năm tuổi.
          </motion.p>
        </div>

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Visual Showcase (7 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#232725] bg-[#131615] p-6 lg:col-span-7">
            {/* Status bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1f2421] pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8ca395]">
                <span className="h-2 w-2 rounded-full bg-[#72ba91]" />
                <span>TRẠNG THÁI: {isBrushPlaced ? 'GÁC NGỰ BÚT HOÀNG TRIỀU' : 'SẴN SÀNG KHỞI THƯ'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsBrushPlaced(!isBrushPlaced)}
                  className={`rounded border px-3 py-1 text-xs transition-colors ${
                    isBrushPlaced
                      ? 'border-[#72ba91] bg-[#72ba91]/10 text-[#72ba91]'
                      : 'border-[#333a36] bg-[#1a211e] text-[#a6b8ad]'
                  }`}
                >
                  {isBrushPlaced ? 'Nhấc Ngự Bút Ra' : 'Gác Ngự Bút Lên'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextFreq = soundFrequency === 528 ? 1056 : 528
                    setSoundFrequency(nextFreq)
                    playJadeChime(nextFreq)
                  }}
                  className="rounded border border-[#3e5e4d] bg-[#16221c] px-3 py-1 text-xs text-[#72ba91] transition-colors hover:border-[#72ba91]"
                >
                  {audioPlaying ? `Âm chuông ${soundFrequency}Hz...` : `Khánh Ngọc ${soundFrequency}Hz`}
                </button>
              </div>
            </div>

            {/* Interactive Object Stage */}
            <div className="relative my-6 flex min-h-[350px] flex-col items-center justify-center rounded-xl bg-gradient-to-b from-[#181e1a] to-[#0e1110] p-8">
              {/* Jade Translucent Light Projection */}
              <div
                className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#529e74]/20 blur-2xl transition-opacity duration-300"
                style={{ opacity: translucency / 100 }}
              />

              {/* The Art Piece Container */}
              <div
                className="relative z-10 flex flex-col items-center transition-transform duration-300"
                style={{ transform: `scale(${magnification})` }}
              >
                {/* Imperial Calligraphy Brush (Conditional Overlay) */}
                <AnimatePresence>
                  {isBrushPlaced && (
                    <motion.div
                      initial={{ opacity: 0, y: -25 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -25 }}
                      transition={{ duration: 0.35 }}
                      className="absolute -top-12 z-20 flex h-6 w-72 items-center justify-between rounded-full border border-[#8a724d] bg-gradient-to-r from-[#2c2014] via-[#5c462e] to-[#1a130b] px-4 shadow-2xl"
                    >
                      <span className="text-[10px] text-[#e0cfab]">🖌️ Bút Lông Lang Hào Thượng Uyển</span>
                      <span className="font-mono text-[9px] text-[#b3955b]">Cán Trúc Tương Phi</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Carved Jade Lotus Bud & Leaf Sculpture */}
                <div
                  className="relative flex h-24 w-80 items-center justify-around rounded-t-2xl border-2 border-[#5ba87e] bg-gradient-to-r from-[#2d5942] via-[#3d7a5a] to-[#2d5942] px-4 shadow-xl transition-all"
                  style={{
                    boxShadow: `0 0 35px rgba(91, 168, 126, ${translucency / 150})`,
                  }}
                >
                  {/* Left: Lotus Bud Peak */}
                  <div className="flex flex-col items-center">
                    <span className="text-xl">🪷</span>
                    <span className="text-[8px] font-mono text-[#bce3cf]">Nụ Sen Cát Tường</span>
                  </div>

                  {/* Center: Concave Brush Rest Groove */}
                  <div className="flex h-12 w-28 flex-col items-center justify-center rounded-lg border border-[#72ba91]/40 bg-[#1d3d2c]/60">
                    <span className="text-[9px] tracking-wider text-[#dcf5e7]">RÃNH ÂM DƯƠNG</span>
                    <span className="font-mono text-[8px] text-[#72ba91]">Độ dốc 15°</span>
                  </div>

                  {/* Right: Rolled Lotus Leaf Peak */}
                  <div className="flex flex-col items-center">
                    <span className="text-xl">🍃</span>
                    <span className="text-[8px] font-mono text-[#bce3cf]">Diệp Sen Cuộn Mây</span>
                  </div>

                  {/* Gold Filigree Wire Edge Accent */}
                  <div className="absolute inset-x-2 bottom-0 h-1 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e49c] to-[#d4af37]" />
                </div>

                {/* Precious Wood Pedestal (Gõ Đỏ Lào 250 Năm) */}
                <div className="flex h-10 w-96 items-center justify-between rounded-b-xl border-t-2 border-b-2 border-[#634823] bg-gradient-to-r from-[#382310] via-[#523518] to-[#382310] px-6 text-[10px] text-[#dfc79b] shadow-2xl">
                  <span>Bệ Gõ Đỏ Lào Bách Niên</span>
                  <span className="font-mono">230mm x 55mm</span>
                  <span>Mộng Cổ Truyền</span>
                </div>
              </div>
            </div>

            {/* Sliders for Translucency & Magnification */}
            <div className="grid grid-cols-1 gap-4 border-t border-[#1f2421] pt-4 sm:grid-cols-2">
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#9ea39f]">Độ Thấu Quang Phỉ Thúy (30% - 100%)</span>
                  <span className="font-mono text-[#72ba91]">{translucency.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  step="0.5"
                  value={translucency}
                  onChange={(e) => setTranslucency(Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#212623] accent-[#72ba91]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#9ea39f]">Kính Lúp Vi Mô (1.0x - 1.3x)</span>
                  <span className="font-mono text-[#d4af37]">{magnification.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="1.3"
                  step="0.05"
                  value={magnification}
                  onChange={(e) => setMagnification(Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#212623] accent-[#d4af37]"
                />
              </div>
            </div>
          </div>

          {/* Details & Specs (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#232725] bg-[#131615] p-6 lg:col-span-5">
            <div>
              <div className="flex border-b border-[#1f2421] pb-3 text-xs">
                {(['details', 'materials', 'craftsmanship'] as const).map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setActiveView(view)}
                    className={`flex-1 py-1 text-center tracking-wider transition-colors ${
                      activeView === view
                        ? 'border-b-2 border-[#72ba91] font-medium text-[#72ba91]'
                        : 'text-[#77807a] hover:text-[#c4ccc6]'
                    }`}
                  >
                    {view === 'details' && 'THÔNG SỐ'}
                    {view === 'materials' && 'VẬT LIỆU'}
                    {view === 'craftsmanship' && 'KỸ NGHỆ'}
                  </button>
                ))}
              </div>

              <div className="mt-6 min-h-[260px] text-xs">
                <AnimatePresence mode="wait">
                  {activeView === 'details' && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="space-y-3"
                    >
                      <div className="rounded-lg border border-[#202923] bg-[#161d19] p-3">
                        <span className="text-[10px] text-[#74877b]">Chiều dài tổng thể</span>
                        <div className="mt-1 font-mono text-base text-[#e8f5ee]">230 mm (Thước Lỗ Ban Cát Tường)</div>
                      </div>
                      <div className="rounded-lg border border-[#202923] bg-[#161d19] p-3">
                        <span className="text-[10px] text-[#74877b]">Phẩm cấp đá ngọc</span>
                        <div className="mt-1 font-mono text-base text-[#72ba91]">Ngọc Bích Phỉ Thúy Type A (Jadeite)</div>
                      </div>
                      <div className="rounded-lg border border-[#202923] bg-[#161d19] p-3">
                        <span className="text-[10px] text-[#74877b]">Nẹp viền kim hoàn</span>
                        <div className="mt-1 font-mono text-base text-[#d4af37]">Vàng ròng 24K Filigree sợi 0.18mm</div>
                      </div>
                    </motion.div>
                  )}

                  {activeView === 'materials' && (
                    <motion.div
                      key="materials"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="space-y-3 leading-relaxed text-[#9ca39d]"
                    >
                      <h4 className="font-serif text-sm text-[#f0f2ef]">Phỉ Thúy Type A Tự Nhiên Chưa Qua Xử Lý</h4>
                      <p>
                        Khai thác tại các mỏ ngọc cổ truyền vùng Kachin (Myanmar). Độ trong đạt chuẩn thấu quang cao, sắc xanh lý ngọc ngọc bích sâu thẳm mát rượi khi chạm vào ngón tay.
                      </p>
                      <h4 className="mt-3 font-serif text-sm text-[#d4af37]">Gỗ Gõ Đỏ Lào 250 Năm Tuổi</h4>
                      <p>
                        Gỗ được sấy kiln tự nhiên đạt ẩm độ EMC 8-10%, bề mặt đánh xi sáp ong rừng bảo vệ thớ gỗ trường tồn với độ ẩm 80% của khí hậu TP.HCM.
                      </p>
                    </motion.div>
                  )}

                  {activeView === 'craftsmanship' && (
                    <motion.div
                      key="craft"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="space-y-3 leading-relaxed text-[#9ca39d]"
                    >
                      <h4 className="font-serif text-sm text-[#f0f2ef]">Nghệ Thuật Kéo Sợi Vàng Filigree</h4>
                      <p>
                        Từng sợi chỉ vàng 24K được kéo mỏng 0.18mm, uốn lượn hình sóng nước và mây cuộn ôm sát đường viền ngọc bích, liên kết hoàn toàn bằng kỹ thuật hàn điểm vi mô không để lại vết nối.
                      </p>
                      <div className="rounded-lg border border-[#2e2b20] bg-[#1a1813] p-3 text-[11px] text-[#d4af37]">
                        Mỗi tác phẩm mất từ 180 đến 240 giờ chế tác thủ công bởi nghệ nhân kim hoàn bách niên.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-6 border-t border-[#1f2421] pt-4 text-[11px] text-[#6f7571]">
              Sáng tạo bởi GuHomes Atelier · Xưởng may đo Thạnh Xuân 1.200m² · Email: guhomesvn@gmail.com.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudLeafStudio
