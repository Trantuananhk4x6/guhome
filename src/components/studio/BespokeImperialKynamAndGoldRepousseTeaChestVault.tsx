'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Label } from '@/components/ui/Label'

interface ImperialTeaMasterpiece {
  id: string
  name: string
  teaType: string
  vintageYear: number
  altitude: string
  terroir: string
  tastingNotes: string
  scentProfile: string
  brewingGuideline: string
  kynamPairing: string
}

const IMPERIAL_TEA_COLLECTION: readonly ImperialTeaMasterpiece[] = [
  {
    id: 'shan-tuyet-suoi-giang-500y',
    name: 'Shan Tuyết Cổ Thụ Bách Niên Suối Giàng',
    teaType: 'Trà Búp Trắng Thượng Hạng',
    vintageYear: 2018,
    altitude: '2.200m so với mực nước biển',
    terroir: 'Rừng chè cổ thụ sương mù Mù Cang Chải, Yên Bái',
    tastingNotes: 'Vị ngọt sâu hậu vị êm mượt, búp phủ tuyết trắng óng ánh, nước trà vàng óng như mật ong rừng',
    scentProfile: 'Hương hoa phong lan rừng thoang thoảng hòa quyện khói củi mộc',
    brewingGuideline: 'Nước sôi 85°C, ấm đất Tử Sa nung củi, hãm 35 giây mỗi tuần trà',
    kynamPairing: 'Bạch Kỳ Nam Tiên Phước ngậm hương trầm lắng',
  },
  {
    id: 'long-tinh-ngu-uyen-say-tram',
    name: 'Long Tỉnh Ngự Uyển Hấp Sấy Trầm Hương',
    teaType: 'Lục Trà Hoàng Gia Hun Khói',
    vintageYear: 2021,
    altitude: '1.450m so với mực nước biển',
    terroir: 'Vườn trà sương sớm Tây Hồ, Chiết Giang xông trầm Khánh Hòa',
    tastingNotes: 'Chát dịu thanh tân nơi đầu lưỡi, bừng nở vị bùi hạt dẻ nướng và cam thảo ngọt lịm',
    scentProfile: 'Hương cốm non đầu mùa hòa quyện nốt trầm thanh khiết sang trọng',
    brewingGuideline: 'Nước tinh khiết 80°C, chén khải sứ mỏng, hãm 25 giây',
    kynamPairing: 'Thanh Kỳ Nam Đại Lộc tươi mát huyền diệu',
  },
  {
    id: 'thiet-quan-am-ngam-kynam',
    name: 'Thiết Quan Âm Cổ Truyền Ngâm Kỳ Nam',
    teaType: 'Ô Long Nướng Than Củi Bán Lên Men',
    vintageYear: 2015,
    altitude: '1.800m so với mực nước biển',
    terroir: 'Vùng cao nguyên An Khê kết hợp Kỳ Nam Hòn Bà',
    tastingNotes: 'Nước trà đỏ ruby thấu quang, vị đầm dày đậm đà khoáng chất của đá núi ngàn năm',
    scentProfile: 'Hương quả chín ngào ngạt, khói gỗ sồi cổ và tinh dầu ngự hương vương vấn cổ họng',
    brewingGuideline: 'Nước sôi 95°C, ấm chu sa Chu Đậu hạ thổ, hãm 45 giây',
    kynamPairing: 'Hắc Kỳ Nam Ba Tơ đượm nồng vị khói ấm áp',
  },
]

export function BespokeImperialKynamAndGoldRepousseTeaChestVault() {
  const [selectedTea, setSelectedTea] = useState<ImperialTeaMasterpiece>(IMPERIAL_TEA_COLLECTION[0]!)
  const [isVaultLocked, setIsVaultLocked] = useState<boolean>(true)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  // 432Hz deep resonant click sound
  const playClickSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(432, ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(108, ctx.currentTime + 0.18)

      gain.gain.setValueAtTime(0.12, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.24)
    } catch {
      // Audio fallback
    }
  }, [])

  const toggleLock = () => {
    playClickSound()
    setIsVaultLocked(!isVaultLocked)
  }

  // Web Audio ambient hum 432Hz
  const startAudioAmbient = useCallback(() => {
    if (audioContextRef.current) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(432, ctx.currentTime)

      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 3)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      oscRef.current = osc
      gainRef.current = gain
      setIsAudioActive(true)
    } catch {
      // Audio policy
    }
  }, [])

  const stopAudioAmbient = useCallback(() => {
    if (gainRef.current && audioContextRef.current) {
      gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 1)
      setTimeout(() => {
        oscRef.current?.stop()
        oscRef.current?.disconnect()
        audioContextRef.current?.close()
        audioContextRef.current = null
        oscRef.current = null
        gainRef.current = null
        setIsAudioActive(false)
      }, 1100)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  return (
    <section className="u-gutter py-24 bg-surface border-t border-line/60">
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Label rule index="95.2" tone="accent">
              Bảo Thất Thưởng Trà Ngự Phẩm & Mỹ Nghệ Cung Đình
            </Label>
            <h2 className="u-display mt-4 max-w-[28ch] text-ink">
              Tráp ngự trà gỗ Sưa đỏ Bắc Bộ & vàng chạm nổi Repoussé 24K.
            </h2>
          </div>
          <p className="u-body max-w-[42ch] text-muted">
            Tạo tác độc bản: Gỗ Sưa đỏ vân mây tỷ trọng 1.08 g/cm³, nắp chạm nổi phù điêu Phượng Hoàng triều Lê bằng vàng 24K dày 1.2mm, khóa khí kín Neodymium 0.6T bảo tồn tuyệt đối vi hương danh trà.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Tea Chest Visualizer */}
          <div className="lg:col-span-7 bg-surface-subtle p-8 sm:p-12 rounded-sm border border-line/80 relative shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${isVaultLocked ? 'bg-accent' : 'bg-emerald-500'} animate-pulse`} />
                <span className="text-xs font-mono tracking-wider uppercase text-ink font-medium">
                  {isVaultLocked ? 'Khóa Khí Kín Neodymium Đóng Chặt' : 'Nắp Tráp Mở · Khí Tuyết Tùng Thơm Ngát'}
                </span>
              </div>
              <span className="text-xs font-mono text-muted">
                Độ ẩm buồng ủ: 52% RH · Chuẩn Bảo Quản
              </span>
            </div>

            {/* Chest Visual Stage */}
            <div className="relative aspect-[16/10] bg-surface rounded-sm border border-line/50 flex flex-col items-center justify-center p-8 overflow-hidden">
              {/* Gold Repoussé Sheen Background */}
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_70%)]" />

              {/* Chest Simulation Box */}
              <div
                className="relative z-10 w-72 h-48 sm:w-96 sm:h-60 rounded border-2 border-accent/60 bg-gradient-to-br from-amber-950/80 via-stone-900 to-amber-950 flex flex-col items-center justify-center p-6 text-center shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* Gold Repoussé Phoenix Medallion */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-yellow-500/80 bg-gradient-to-tr from-yellow-700 via-amber-400 to-yellow-200 flex flex-col items-center justify-center p-2 shadow-inner mb-3">
                  <span className="text-[0.625rem] font-mono uppercase tracking-widest text-amber-950 font-bold">
                    Vàng 24K Repoussé
                  </span>
                  <span className="text-xs font-serif font-bold text-amber-950">
                    Phượng Hoàng Lê
                  </span>
                  <span className="text-[0.5625rem] font-mono text-amber-900">
                    Độ dày 1.2mm
                  </span>
                </div>

                <p className="text-xs font-mono text-amber-200 tracking-wider uppercase">
                  Gỗ Sưa Đỏ Bắc Bộ Vân Mây
                </p>
                <span className="text-[0.6875rem] font-mono text-amber-400/80 mt-1">
                  Độ ẩm cân bằng: 10.5% · Tỷ trọng 1.08 g/cm³
                </span>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <span className="text-[0.6875rem] font-mono uppercase text-muted">Danh Trà Đang Ủ</span>
                <span className="text-xs font-mono text-accent font-semibold">{selectedTea.name}</span>
                <span className="text-[0.6875rem] font-mono text-ink">Niên vụ: {selectedTea.vintageYear} · Cao độ: {selectedTea.altitude}</span>
              </div>

              {/* Floating Controls */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleLock}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-accent text-surface rounded-sm hover:opacity-90 transition-opacity"
                  >
                    {isVaultLocked ? 'Mở Khóa Khí Kín Neodymium' : 'Đóng Chặt Khóa Nam Châm 0.6T'}
                  </button>

                  <div className="flex items-center gap-1 border border-line rounded-sm p-0.5 bg-surface-subtle">
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomLevel === 1 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      1x
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1.2)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomLevel === 1.2 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      2x
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomLevel(1.35)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomLevel === 1.35 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      4x Macro
                    </button>
                  </div>
                </div>

                {/* 432Hz Sound button */}
                <button
                  type="button"
                  onClick={isAudioActive ? stopAudioAmbient : startAudioAmbient}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 rounded-sm border transition-colors ${
                    isAudioActive
                      ? 'bg-accent/15 border-accent text-accent'
                      : 'bg-surface-subtle border-line text-muted hover:text-ink'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isAudioActive ? 'bg-accent animate-ping' : 'bg-muted'}`} />
                  {isAudioActive ? 'Tắt Hòa Âm 432Hz' : 'Mở Hòa Âm Trầm 432Hz'}
                </button>
              </div>
            </div>

            {/* Technical highlight bar */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-line/60 text-xs font-mono">
              <div className="p-3 bg-surface rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Chất Liệu Tráp:</span>
                <span className="text-ink font-medium">Sưa đỏ Bắc Bộ vân mây</span>
              </div>
              <div className="p-3 bg-surface rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Phù Điêu Nắp:</span>
                <span className="text-accent font-medium">Vàng 24K Repoussé 1.2mm</span>
              </div>
              <div className="p-3 bg-surface rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Hệ Khóa:</span>
                <span className="text-ink font-medium">Neodymium 0.6T kín 99.9%</span>
              </div>
            </div>
          </div>

          {/* Right: Tea Selection & Pairing Profile */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Selection list */}
            <div className="bg-surface-subtle p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="01" tone="accent" className="mb-4">
                Bộ Sưu Tập Danh Trà Ngự Dụng 2026
              </Label>
              <div className="flex flex-col gap-3 mt-4">
                {IMPERIAL_TEA_COLLECTION.map((tea) => {
                  const isSelected = tea.id === selectedTea.id
                  return (
                    <button
                      key={tea.id}
                      type="button"
                      onClick={() => {
                        playClickSound()
                        setSelectedTea(tea)
                      }}
                      className={`text-left p-4 rounded-sm border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent bg-surface shadow-sm'
                          : 'border-line/70 bg-surface/50 hover:border-line hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-display font-medium text-ink">
                          {tea.name}
                        </span>
                        <span className="text-xs font-mono text-accent font-semibold">
                          {tea.vintageYear}
                        </span>
                      </div>
                      <span className="text-[0.6875rem] font-mono text-muted block mb-1">
                        {tea.teaType} · {tea.terroir}
                      </span>
                      <p className="text-xs text-muted/80 line-clamp-1 leading-relaxed">
                        {tea.tastingNotes}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selected Tea Tasting Profile */}
            <div className="bg-surface-subtle p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="02" tone="accent" className="mb-4">
                Hồ Sơ Cảm Quan & Kết Hợp Ngự Phẩm Kỳ Nam
              </Label>
              <dl className="grid grid-cols-1 gap-3.5 text-xs font-mono mt-4">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Tầng hương:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedTea.scentProfile}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Quy chuẩn pha trà:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedTea.brewingGuideline}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Kỳ Nam tương hợp:</dt>
                  <dd className="text-accent font-semibold text-right max-w-[28ch]">{selectedTea.kynamPairing}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-muted mb-1">Dấu ấn vị giác:</dt>
                  <dd className="text-ink leading-relaxed font-body text-xs font-normal">
                    {selectedTea.tastingNotes}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Atelier Craftsmanship Note */}
            <div className="p-6 bg-surface border border-accent/30 rounded-sm">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                May Đo Mộc Độc Bản Tại Xưởng Thạnh Xuân
              </span>
              <p className="text-xs text-muted leading-relaxed font-body">
                Mỗi chiếc tráp ngự trà gỗ Sưa đỏ đều được tiện từ lõi cây bách niên, ngâm sấy chân không 120 ngày để triệt tiêu biến dạng, kết hợp cùng nghệ nhân chạm vàng Kiêu Kỵ và Đồng Xâm tạo tác thủ công dành riêng cho tổ ấm của quý gia chủ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
