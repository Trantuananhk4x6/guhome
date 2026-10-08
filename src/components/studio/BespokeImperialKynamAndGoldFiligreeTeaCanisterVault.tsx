'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Label } from '@/components/ui/Label'

interface ImperialTeaCanisterItem {
  id: string
  name: string
  teaType: string
  treeAge: number
  altitude: string
  terroir: string
  scentNotes: string
  brewingNotes: string
  kynamPairing: string
}

const TEA_CANISTER_COLLECTION: readonly ImperialTeaCanisterItem[] = [
  {
    id: 'shan-tuyet-tay-con-linh-600y',
    name: 'Shan Tuyết Bách Niên Tây Côn Lĩnh',
    teaType: 'Trà Búp Trắng Cổ Thụ Đỉnh Núi',
    treeAge: 600,
    altitude: '2.419m so với mực nước biển',
    terroir: 'Đỉnh Tây Côn Lĩnh mây mù quanh năm, Hoàng Su Phì, Hà Giang',
    scentNotes: 'Hương hoa phong lan tuyết, vị ngọt đượm sâu hậu vị ngọt ngào bền lâu qua 15 tuần nước',
    brewingNotes: 'Nước suối nguồn 85°C, ấm đất Tử Sa nung củi, hãm 30 giây',
    kynamPairing: 'Bạch Kỳ Nam Tiên Phước ngậm hương sâu lắng',
  },
  {
    id: 'o-long-tu-quy-cau-dat-u-tram',
    name: 'Ô Long Tứ Quý Cầu Đất Ủ Trầm',
    teaType: 'Ô Long Bán Lên Men Cao Nguyên',
    treeAge: 45,
    altitude: '1.650m so với mực nước biển',
    terroir: 'Đồi chè Cầu Đất, Đà Lạt kết hợp trầm Khánh Hòa',
    scentNotes: 'Hương hoa mộc tê thơm ngát, vị chát thanh ngọt dịu hòa quyện khói trầm ấm nồng nàn',
    brewingNotes: 'Nước tinh khiết 90°C, chén khải sứ mỏng mạ vàng, hãm 40 giây',
    kynamPairing: 'Thanh Kỳ Nam Hòn Bà tươi mát thanh nhã',
  },
  {
    id: 'bup-mang-trang-ta-xua-400y',
    name: 'Trà Búp Măng Trắng Cổ Thụ Tà Xùa',
    teaType: 'Búp Măng Non Sấy Mộc Tự Nhiên',
    treeAge: 400,
    altitude: '2.100m so với mực nước biển',
    terroir: 'Biển mây Tà Xùa, Bắc Yên, Sơn La',
    scentNotes: 'Sắc nước vàng rơm sóng sánh, vị ngọt mát như nước khoáng đá tuyết tan, hậu ngọt dịu dàng',
    brewingNotes: 'Nước 80°C, bình thủy tinh trong suốt ngắm búp trà bung nở, hãm 25 giây',
    kynamPairing: 'Hắc Kỳ Nam Trà Bồng ấm áp định tâm',
  },
]

export function BespokeImperialKynamAndGoldFiligreeTeaCanisterVault() {
  const [selectedTea, setSelectedTea] = useState<ImperialTeaCanisterItem>(TEA_CANISTER_COLLECTION[0]!)
  const [isLocked, setIsLocked] = useState<boolean>(true)
  const [zoomRatio, setZoomRatio] = useState<number>(1)
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
    setIsLocked(!isLocked)
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
            <Label rule index="97.2" tone="accent">
              Bảo Thất Danh Trà & Nghệ Thuật Vàng Filigree Hoàng Triều
            </Label>
            <h2 className="u-display mt-4 max-w-[28ch] text-ink">
              Hũ ngự trà gỗ Sưa đỏ & nắp bọc vàng kéo sợi Filigree 24K.
            </h2>
          </div>
          <p className="u-body max-w-[42ch] text-muted">
            Tạo tác bảo quản danh trà: Khối gỗ Sưa đỏ Bắc Bộ vân mây nguyên khối, nắp bọc mạng vàng 24K kéo sợi filigree rồng Lý 0.15mm, lót gỗ Tuyết Tùng và khóa Neodymium 0.6T bảo tồn tuyệt đối vi hương danh trà.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Canister Visualizer */}
          <div className="lg:col-span-7 bg-surface-subtle p-8 sm:p-12 rounded-sm border border-line/80 relative shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${isLocked ? 'bg-accent' : 'bg-emerald-500'} animate-pulse`} />
                <span className="text-xs font-mono tracking-wider uppercase text-ink font-medium">
                  {isLocked ? 'Khóa Khí Kín Neodymium Đóng Khít' : 'Nắp Hũ Mở · Thoang Thoảng Mùi Tuyết Tùng'}
                </span>
              </div>
              <span className="text-xs font-mono text-muted">
                Độ ẩm buồng ủ: 52% RH · Chuẩn Ngự Dụng
              </span>
            </div>

            {/* Stage */}
            <div className="relative aspect-[16/10] bg-surface rounded-sm border border-line/50 flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#d4af37_0%,_transparent_70%)]" />

              {/* Canister Box Visual */}
              <div
                className="relative z-10 w-56 h-72 sm:w-64 sm:h-80 rounded-2xl border-2 border-amber-900/80 bg-gradient-to-b from-amber-950 via-stone-900 to-amber-950 flex flex-col items-center justify-between p-6 text-center shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomRatio})` }}
              >
                {/* Filigree Lid */}
                <div className="w-full py-2 px-3 rounded-xl border border-yellow-400 bg-gradient-to-r from-yellow-600 via-amber-300 to-yellow-600 shadow-md">
                  <span className="text-[0.625rem] font-mono uppercase text-amber-950 font-bold block">
                    Vàng 24K Filigree 0.15mm
                  </span>
                  <span className="text-xs font-serif text-amber-950 font-bold">
                    Long Vân Thời Lý
                  </span>
                  <span className="text-[0.5625rem] font-mono text-amber-900">
                    Khóa Neodymium 0.6T kín 99.9%
                  </span>
                </div>

                {/* Body Details */}
                <div className="my-auto flex flex-col items-center">
                  <span className="text-xs font-mono text-amber-200 tracking-wider uppercase font-semibold">
                    Gỗ Sưa Đỏ Bắc Bộ Vân Mây
                  </span>
                  <span className="text-[0.6875rem] font-mono text-amber-400/90 mt-1">
                    Độ ẩm 10.5% · Tỷ trọng 1.08 g/cm³
                  </span>
                </div>

                {/* Bottom foot */}
                <div className="w-3/4 py-1 bg-amber-900/60 rounded-full border border-amber-700/50">
                  <span className="text-[0.5625rem] font-mono text-amber-300/80">Lót Tuyết Tùng Tây Ban Nha</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <span className="text-[0.6875rem] font-mono uppercase text-muted">Danh Trà Đang Lưu Giữ</span>
                <span className="text-xs font-mono text-accent font-semibold">{selectedTea.name}</span>
                <span className="text-[0.6875rem] font-mono text-ink">Cổ thụ: {selectedTea.treeAge} năm · Cao độ: {selectedTea.altitude}</span>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleLock}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-accent text-surface rounded-sm hover:opacity-90 transition-opacity"
                  >
                    {isLocked ? 'Mở Khóa Khí Kín Neodymium' : 'Đóng Chặt Khóa Nam Châm 0.6T'}
                  </button>

                  <div className="flex items-center gap-1 border border-line rounded-sm p-0.5 bg-surface-subtle">
                    <button
                      type="button"
                      onClick={() => setZoomRatio(1)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomRatio === 1 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      1x
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomRatio(1.2)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomRatio === 1.2 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      2x
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomRatio(1.35)}
                      className={`px-2 py-1 text-[0.6875rem] font-mono rounded ${zoomRatio === 1.35 ? 'bg-accent text-surface' : 'text-muted hover:text-ink'}`}
                    >
                      4x Filigree
                    </button>
                  </div>
                </div>

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

            {/* Technical highlight */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-line/60 text-xs font-mono">
              <div className="p-3 bg-surface rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Chất Liệu Hũ:</span>
                <span className="text-ink font-medium">Sưa đỏ Bắc Bộ vân mây</span>
              </div>
              <div className="p-3 bg-surface rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Nắp Bọc:</span>
                <span className="text-accent font-medium">Vàng 24K Filigree 0.15mm</span>
              </div>
              <div className="p-3 bg-surface rounded border border-line/60">
                <span className="text-muted block text-[0.6875rem]">Độ Kín Khí:</span>
                <span className="text-ink font-medium">Nam châm 0.6T kín 99.9%</span>
              </div>
            </div>
          </div>

          {/* Right: Tea Collection & Pairing Profile */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-subtle p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="01" tone="accent" className="mb-4">
                Bộ Sưu Tập Danh Trà Cổ Thụ Ngự Dụng
              </Label>
              <div className="flex flex-col gap-3 mt-4">
                {TEA_CANISTER_COLLECTION.map((tea) => {
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
                          {tea.treeAge} Năm
                        </span>
                      </div>
                      <span className="text-[0.6875rem] font-mono text-muted block mb-1">
                        {tea.teaType} · {tea.terroir}
                      </span>
                      <p className="text-xs text-muted/80 line-clamp-1 leading-relaxed">
                        {tea.scentNotes}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Profile */}
            <div className="bg-surface-subtle p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="02" tone="accent" className="mb-4">
                Hồ Sơ Cảm Quan & Kỳ Nam Tương Hợp
              </Label>
              <dl className="grid grid-cols-1 gap-3.5 text-xs font-mono mt-4">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Tầng hương:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedTea.scentNotes}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Quy chuẩn pha trà:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedTea.brewingNotes}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Kỳ Nam tương hợp:</dt>
                  <dd className="text-accent font-semibold text-right max-w-[28ch]">{selectedTea.kynamPairing}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-muted mb-1">Cao độ thổ nhưỡng:</dt>
                  <dd className="text-ink leading-relaxed font-body text-xs font-normal">
                    {selectedTea.altitude} · {selectedTea.terroir}
                  </dd>
                </div>
              </dl>
            </div>

            {/* GuHomes Guarantee */}
            <div className="p-6 bg-surface border border-accent/30 rounded-sm">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Kỷ Luật May Đo Tại Xưởng Thạnh Xuân
              </span>
              <p className="text-xs text-muted leading-relaxed font-body">
                Mỗi chiếc hũ ngự trà gỗ Sưa đỏ đều được tiện từ lõi cây bách niên, ngâm sấy chân không 120 ngày để triệt tiêu biến dạng, kết hợp cùng nghệ nhân chạm vàng Định Công tạo tác thủ công dành riêng cho tổ ấm của quý gia chủ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
