'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Label } from '@/components/ui/Label'

interface KynamMasterpiece {
  id: string
  name: string
  kynamType: string
  ageYears: number
  origin: string
  scentNotes: string
  combustionTemperature: string
  spiritualSignificance: string
  oilDensity: string
}

const IMPERIAL_KYNAM_COLLECTION: readonly KynamMasterpiece[] = [
  {
    id: 'bach-kynam-tien-phuoc-92y',
    name: 'Bạch Kỳ Nam Bách Niên Tiên Phước',
    kynamType: 'Bạch Kỳ Chìm Nước Cổ Thụ',
    ageYears: 92,
    origin: 'Rừng sâu Tiên Phước, Quảng Nam',
    scentNotes: 'Biến chuyển ngũ sắc: Ngọt mật ong, thanh mát bạc hà, đượm nồng khói củi mục và hương hoa rừng',
    combustionTemperature: '125°C - 165°C (Nhiệt độ xông vi lượng lý tưởng)',
    spiritualSignificance: 'Tẩy uế khí, hội tụ vượng khí, dẫn dắt tâm trí vào cõi tĩnh tại sâu thẳm',
    oilDensity: '98.5% Tinh dầu trầm đen đặc, chìm sâu đáy nước',
  },
  {
    id: 'thanh-kynam-hon-ba-84y',
    name: 'Thanh Kỳ Nam Hòn Bà Khánh Hòa',
    kynamType: 'Thanh Kỳ Ánh Xanh Ngọc Bích',
    ageYears: 84,
    origin: 'Dãy núi Hòn Bà, Cam Lâm, Khánh Hòa',
    scentNotes: 'Hương thanh tân kỳ ảo, thơm mát mùi dưa hấu chín xen lẫn thảo mộc quý và nốt đắng hậu ngọt sâu',
    combustionTemperature: '135°C - 175°C',
    spiritualSignificance: 'Khai mở trực giác, dưỡng tâm an thần, mang lại giấc ngủ sâu an lành',
    oilDensity: '94.2% Tinh dầu đặc quánh ánh sắc xanh biếc',
  },
  {
    id: 'hac-kynam-tra-bong-98y',
    name: 'Hắc Kỳ Nam Rừng Già Trà Bồng',
    kynamType: 'Hắc Kỳ Hắc Long Thượng Hạng',
    ageYears: 98,
    origin: 'Vùng đệm Trường Sơn, Trà Bồng, Quảng Ngãi',
    scentNotes: 'Vị cay nồng ấm áp, khói thơm sánh mịn như nhung lụa vương vấn không gian suốt 48 giờ',
    combustionTemperature: '145°C - 195°C',
    spiritualSignificance: 'Trấn trạch hưng gia, xua tan hàn khí mùa mưa Sài Gòn, định tâm an định',
    oilDensity: '96.8% Tinh dầu đen tuyền hóa thạch',
  },
]

export function BespokeImperialKynamAndSilverRepousseIncenseVault() {
  const [selectedKynam, setSelectedKynam] = useState<KynamMasterpiece>(IMPERIAL_KYNAM_COLLECTION[0]!)
  const [burnTemp, setBurnTemp] = useState<number>(145)
  const [isIncenseActive, setIsIncenseActive] = useState<boolean>(false)
  const [zoomRatio, setZoomRatio] = useState<number>(1)
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  // Web Audio 528Hz Solfeggio bell sound
  const playBellSound = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()

      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      gain1.gain.setValueAtTime(0.08, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start()
      osc1.stop(ctx.currentTime + 3.6)

      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'triangle'
      osc2.frequency.setValueAtTime(1056, ctx.currentTime)
      gain2.gain.setValueAtTime(0.03, ctx.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start()
      osc2.stop(ctx.currentTime + 2.3)
    } catch {
      // Audio fallback
    }
  }, [])

  const toggleIncense = () => {
    playBellSound()
    setIsIncenseActive(!isIncenseActive)
  }

  // Web Audio ambient hum 528Hz
  const startAudioAmbient = useCallback(() => {
    if (audioContextRef.current) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(528, ctx.currentTime)

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
            <Label rule index="96.2" tone="accent">
              Bảo Thất Ngự Hương & Nghệ Thuật Chạm Bạc Repoussé Hoàng Gia
            </Label>
            <h2 className="u-display mt-4 max-w-[28ch] text-ink">
              Lư ngự hương Bạc Chạm 999 Repoussé & bảo thất Kỳ Nam độc bản.
            </h2>
          </div>
          <p className="u-body max-w-[42ch] text-muted">
            Tạo tác án hương cung đình: Khung gỗ Cẩm Lai nẹp đồng xước lót đá Jasper Đắk Nông, lư bạc 999 chạm nổi phù điêu Song Long Chầu Nguyệt thời Lý dày 1.5mm, lòng lót đồng đỏ giữ nhiệt 7mm xông êm ái.
          </p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Visualizer */}
          <div className="lg:col-span-7 bg-surface-subtle p-8 sm:p-12 rounded-sm border border-line/80 relative shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${isIncenseActive ? 'bg-amber-500 animate-pulse' : 'bg-muted'}`} />
                <span className="text-xs font-mono tracking-wider uppercase text-ink font-medium">
                  {isIncenseActive ? 'Lư Bạc Đang Tỏa Vi Hương Kỳ Nam...' : 'Lư Bạc Ở Trạng Thái Nghỉ'}
                </span>
              </div>
              <span className="text-xs font-mono text-muted">
                Nhiệt độ lò vi lượng: {burnTemp}°C
              </span>
            </div>

            {/* Stage */}
            <div className="relative aspect-[16/10] bg-surface rounded-sm border border-line/50 flex flex-col items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#94a3b8_0%,_transparent_70%)]" />

              {/* Incense Burner Visual */}
              <div
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-slate-300/80 bg-gradient-to-tr from-slate-200 via-stone-100 to-slate-300 flex flex-col items-center justify-center p-6 text-center shadow-2xl transition-transform duration-300"
                style={{ transform: `scale(${zoomRatio})` }}
              >
                {/* Silver Repousse Dragon Medallion */}
                <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-2 border-slate-400 bg-gradient-to-br from-slate-300 via-stone-200 to-slate-400 flex flex-col items-center justify-center p-4 shadow-inner">
                  <span className="text-[0.625rem] font-mono uppercase tracking-widest text-slate-800 font-bold">
                    Bạc 999 Repoussé 1.5mm
                  </span>
                  <span className="text-xs font-serif font-bold text-slate-900 mt-0.5">
                    Song Long Chầu Nguyệt
                  </span>
                  <span className="text-[0.5625rem] font-mono text-slate-700 mt-1">
                    Lòng đồng đỏ 7mm cách nhiệt
                  </span>
                </div>

                {isIncenseActive && (
                  <div className="absolute -top-4 w-12 h-12 bg-amber-400/20 rounded-full blur-xl animate-pulse pointer-events-none" />
                )}
              </div>

              {/* Source Tag Badge */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <span className="text-[0.6875rem] font-mono uppercase text-muted">Ngự Phẩm Kỳ Nam Đang Xông</span>
                <span className="text-xs font-mono text-accent font-semibold">{selectedKynam.name}</span>
                <span className="text-[0.6875rem] font-mono text-ink">{selectedKynam.origin}</span>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleIncense}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-accent text-surface rounded-sm hover:opacity-90 transition-opacity"
                  >
                    {isIncenseActive ? 'Dừng Tỏa Vi Hương' : 'Kích Hoạt Xông Trầm Vi Lượng'}
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
                      4x Chạm Nổi
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
                  {isAudioActive ? 'Tắt Hòa Âm 528Hz' : 'Mở Hòa Âm Solfeggio 528Hz'}
                </button>
              </div>
            </div>

            {/* Temp slider */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-line/60">
              <span className="text-xs font-mono text-muted">Điều chỉnh nhiệt độ lò xông vi lượng:</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="85"
                  max="215"
                  value={burnTemp}
                  onChange={(e) => setBurnTemp(Number(e.target.value))}
                  className="w-36 accent-accent cursor-pointer"
                />
                <span className="text-xs font-mono text-ink font-semibold w-16 text-right">
                  {burnTemp}°C
                </span>
              </div>
            </div>
          </div>

          {/* Right: Kynam Masterpieces & Aromatherapeutic Profile */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-subtle p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="01" tone="accent" className="mb-4">
                Tam Đại Ngự Phẩm Kỳ Nam Quý Hiếm
              </Label>
              <div className="flex flex-col gap-3 mt-4">
                {IMPERIAL_KYNAM_COLLECTION.map((kynam) => {
                  const isSelected = kynam.id === selectedKynam.id
                  return (
                    <button
                      key={kynam.id}
                      type="button"
                      onClick={() => {
                        playBellSound()
                        setSelectedKynam(kynam)
                      }}
                      className={`text-left p-4 rounded-sm border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent bg-surface shadow-sm'
                          : 'border-line/70 bg-surface/50 hover:border-line hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-display font-medium text-ink">
                          {kynam.name}
                        </span>
                        <span className="text-xs font-mono text-accent font-semibold">
                          {kynam.ageYears} Năm
                        </span>
                      </div>
                      <span className="text-[0.6875rem] font-mono text-muted block mb-1">
                        {kynam.kynamType} · {kynam.origin}
                      </span>
                      <p className="text-xs text-muted/80 line-clamp-1 leading-relaxed">
                        {kynam.scentNotes}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Profile */}
            <div className="bg-surface-subtle p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="02" tone="accent" className="mb-4">
                Hồ Sơ Giám Định Dược Liệu & Vi Khí Hậu
              </Label>
              <dl className="grid grid-cols-1 gap-3.5 text-xs font-mono mt-4">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Tỷ trọng tinh dầu:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedKynam.oilDensity}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Nhiệt xông đề xuất:</dt>
                  <dd className="text-ink font-medium text-right max-w-[28ch]">{selectedKynam.combustionTemperature}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Công năng định tâm:</dt>
                  <dd className="text-accent font-semibold text-right max-w-[28ch]">{selectedKynam.spiritualSignificance}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-muted mb-1">Tầng hương vi biến:</dt>
                  <dd className="text-ink leading-relaxed font-body text-xs font-normal">
                    {selectedKynam.scentNotes}
                  </dd>
                </div>
              </dl>
            </div>

            {/* GuHomes Guarantee */}
            <div className="p-6 bg-surface border border-accent/30 rounded-sm">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Kỹ Nghệ Bạc Chạm Đồng Xâm & Xưởng Mộc GuHomes
              </span>
              <p className="text-xs text-muted leading-relaxed font-body">
                Lư ngự hương bạc 999 được chạm thúc nổi tay hàng trăm giờ bởi nghệ nhân kim hoàn làng nghề Đồng Xâm, đặt trên án hương gỗ Cẩm Lai sấy chuẩn 10.5% ẩm độ tại xưởng Thạnh Xuân 1.200m², mang lại trường khí an bình cho gia chủ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
