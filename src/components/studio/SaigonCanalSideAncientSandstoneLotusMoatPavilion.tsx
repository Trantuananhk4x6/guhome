'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Label } from '@/components/ui/Label'

interface BonsaiMasterpiece {
  id: string
  name: string
  scientificName: string
  ageYears: number
  origin: string
  potMaterial: string
  description: string
  microclimateBenefit: string
  temperatureDrop: string
}

const BONSAI_COLLECTION: readonly BonsaiMasterpiece[] = [
  {
    id: 'mai-chieu-thuy-105y',
    name: 'Mai Chiếu Thủy Cổ Thụ Bách Niên',
    scientificName: 'Wrightia religiosa',
    ageYears: 105,
    origin: 'Vùng đệm sông Vàm Cỏ Đông, Long An',
    potMaterial: 'Chậu đá Sa Thạch Quảng Nam đẽo tay nguyên khối',
    description: 'Dáng thế trực quân tử, thân u bướu sần sùi mang dấu ấn thời gian bách niên. Hoa trắng ngát tỏa hương thanh khiết mỗi sớm mai, thanh lọc uế khí.',
    microclimateBenefit: 'Tán lá tầng đối lưu thanh lọc bụi mịn ven rạch và phát tán phytoncide an thần',
    temperatureDrop: '-3.8°C',
  },
  {
    id: 'nguyet-quoi-90y',
    name: 'Nguyệt Quới Cổ Thụ Trực Huyền',
    scientificName: 'Murraya paniculata',
    ageYears: 90,
    origin: 'Miệt vườn cù lao An Bình, Vĩnh Long',
    potMaterial: 'Chậu gốm men tro Bát Tràng thếp nẹp chỉ đồng',
    description: 'Thân vặn xoắn gân guốc, vỏ nứt vân rùa cổ kính. Mùa trăng hoa nở trắng cành, tỏa hương thơm thảo mộc ấm áp xua đuổi côn trùng tự nhiên.',
    microclimateBenefit: 'Tinh dầu lá nguyệt quới xua tan ẩm thấp mùa mưa nhiệt đới Sài Gòn',
    temperatureDrop: '-3.6°C',
  },
  {
    id: 'tung-la-han-110y',
    name: 'Tùng La Hán Bách Niên Thác Đổ',
    scientificName: 'Podocarpus costalis',
    ageYears: 110,
    origin: 'Vùng bán sơn địa Kiên Lương, Kiên Giang',
    potMaterial: 'Khay đá Sa Thạch mài bóng mờ rãnh thoát ngầm',
    description: 'Dáng huyền thác đổ vươn mình soi bóng mặt nước hồ sen, kim tùng xanh biếc bốn mùa trường thọ.',
    microclimateBenefit: 'Ion âm từ kim tùng kết hợp bọt nước thác tràn sa thạch thanh lọc không khí',
    temperatureDrop: '-4.1°C',
  },
]

export function SaigonCanalSideAncientSandstoneLotusMoatPavilion() {
  const [selectedBonsai, setSelectedBonsai] = useState<BonsaiMasterpiece>(BONSAI_COLLECTION[0]!)
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [isRotating, setIsRotating] = useState<boolean>(false)
  const [isAudioActive, setIsAudioActive] = useState<boolean>(false)
  const [waterFlowRate, setWaterFlowRate] = useState<number>(45) // L/min

  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  // Web Audio 528Hz Solfeggio frequency generator
  const startAudio = useCallback(() => {
    if (audioContextRef.current) return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      // 528Hz Solfeggio frequency for transformation & DNA harmony
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(528, ctx.currentTime)

      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 2.5)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      oscillatorRef.current = osc
      gainNodeRef.current = gain
      setIsAudioActive(true)
    } catch {
      // Audio autoplay policy fallback
    }
  }, [])

  const stopAudio = useCallback(() => {
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 1.2)
      setTimeout(() => {
        oscillatorRef.current?.stop()
        oscillatorRef.current?.disconnect()
        audioContextRef.current?.close()
        audioContextRef.current = null
        oscillatorRef.current = null
        gainNodeRef.current = null
        setIsAudioActive(false)
      }, 1300)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {})
      }
    }
  }, [])

  // 360 degree turntable rotation loop
  useEffect(() => {
    if (!isRotating) return
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 1) % 360)
    }, 45)
    return () => clearInterval(interval)
  }, [isRotating])

  return (
    <section className="u-gutter py-24 bg-surface-subtle border-t border-line/60">
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Label rule index="95.1" tone="accent">
              Kiến trúc Thủy Đình Sa Thạch & Vi Khí Hậu Sài Gòn
            </Label>
            <h2 className="u-display mt-4 max-w-[28ch] text-ink">
              Thủy đình Sa Thạch Cổ, hồ sen Bách Diệp & bệ xoay Bonsai 360°.
            </h2>
          </div>
          <p className="u-body max-w-[42ch] text-muted">
            Tọa độ tĩnh tại ven rạch Thảo Điền: Cấu trúc đá sa thạch Quảng Nam mộng âm dương, kết hợp hào nước sâu 1.6m lót đá bazan xám và hệ lọc sinh học hạ nhiệt vi khí hậu 3.8°C quanh năm.
          </p>
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas: Pavilion 3D Rotating Bonsai Dais & Water Moat */}
          <div className="lg:col-span-7 bg-surface p-8 sm:p-12 rounded-sm border border-line/80 relative overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
                <span className="text-xs font-mono tracking-wider uppercase text-ink font-medium">
                  Bệ Xoay Cơ Khí Chính Xác 360° · Trọng Tải 2.8 Tấn
                </span>
              </div>
              <span className="text-xs font-mono text-muted">
                Góc xoay: {rotationAngle}°
              </span>
            </div>

            {/* Simulated Pavilion & Bonsai Turntable Display */}
            <div className="relative aspect-[16/10] bg-surface-subtle rounded-sm border border-line/50 flex flex-col items-center justify-center p-6 overflow-hidden">
              {/* Water Moat Ripple Effect Background */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--color-accent)_0%,_transparent_75%)]" />

              {/* Water Moat Status Indicator */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-1 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <span className="text-[0.6875rem] font-mono uppercase tracking-wider text-muted">Hào Nước Sen Bách Diệp</span>
                <span className="text-xs font-mono text-accent font-semibold">Lưu lượng thác: {waterFlowRate} L/phút</span>
                <span className="text-[0.6875rem] font-mono text-ink">Hạ nhiệt thực tế: {selectedBonsai.temperatureDrop}</span>
              </div>

              {/* Turntable Base Platform */}
              <div
                className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-dashed border-accent/40 flex items-center justify-center transition-transform duration-100 ease-linear shadow-xl bg-surface"
                style={{ transform: `rotate(${rotationAngle}deg)` }}
              >
                <div className="w-48 h-48 sm:w-60 sm:h-60 rounded-full border-2 border-line bg-surface-subtle flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-xs font-mono uppercase text-accent font-semibold mb-1">
                    {selectedBonsai.ageYears} Năm Tuổi
                  </span>
                  <p className="text-sm font-display font-medium text-ink leading-tight">
                    {selectedBonsai.name}
                  </p>
                  <span className="text-[0.6875rem] font-mono italic text-muted mt-1">
                    {selectedBonsai.scientificName}
                  </span>
                </div>
              </div>

              {/* Interactive Controls Overlay */}
              <div className="absolute bottom-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md p-3 rounded border border-line/60">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsRotating(!isRotating)}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-accent text-surface rounded-sm hover:opacity-90 transition-opacity"
                  >
                    {isRotating ? 'Dừng Xoay Bệ' : 'Tự Động Xoay 360°'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRotationAngle((prev) => (prev + 45) % 360)}
                    className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider bg-surface-subtle text-ink border border-line rounded-sm hover:bg-surface transition-colors"
                  >
                    Xoay +45°
                  </button>
                </div>

                {/* Web Audio 528Hz Button */}
                <button
                  type="button"
                  onClick={isAudioActive ? stopAudio : startAudio}
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

            {/* Water flow slider */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-line/60">
              <span className="text-xs font-mono text-muted">Điều tiết lưu lượng tuần hoàn thác đá sa thạch:</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={waterFlowRate}
                  onChange={(e) => setWaterFlowRate(Number(e.target.value))}
                  className="w-36 accent-accent cursor-pointer"
                />
                <span className="text-xs font-mono text-ink font-semibold w-16 text-right">
                  {waterFlowRate} L/min
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bonsai Masterpiece Selector & Architectural Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Bonsai Selector Cards */}
            <div className="bg-surface p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="01" tone="accent" className="mb-4">
                Tuyển tập Bonsai Đại Bản Trưng Bày
              </Label>
              <div className="flex flex-col gap-3 mt-4">
                {BONSAI_COLLECTION.map((bonsai) => {
                  const isSelected = bonsai.id === selectedBonsai.id
                  return (
                    <button
                      key={bonsai.id}
                      type="button"
                      onClick={() => setSelectedBonsai(bonsai)}
                      className={`text-left p-4 rounded-sm border transition-all duration-300 ${
                        isSelected
                          ? 'border-accent bg-accent/5 shadow-sm'
                          : 'border-line/70 bg-surface-subtle hover:border-line hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-display font-medium text-ink">
                          {bonsai.name}
                        </span>
                        <span className="text-xs font-mono text-accent font-semibold">
                          {bonsai.ageYears} Năm
                        </span>
                      </div>
                      <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                        {bonsai.description}
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Selected Bonsai Specification Dossier */}
            <div className="bg-surface p-6 sm:p-8 rounded-sm border border-line/80 shadow-sm">
              <Label rule index="02" tone="accent" className="mb-4">
                Hồ Sơ Giám Định Lâm Sinh & Vi Khí Hậu
              </Label>
              <dl className="grid grid-cols-1 gap-4 text-xs font-mono mt-4">
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Nguồn gốc xuất xứ:</dt>
                  <dd className="text-ink font-medium text-right">{selectedBonsai.origin}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Chất liệu chậu:</dt>
                  <dd className="text-ink font-medium text-right">{selectedBonsai.potMaterial}</dd>
                </div>
                <div className="flex justify-between border-b border-line/60 pb-2">
                  <dt className="text-muted">Khả năng hạ nhiệt:</dt>
                  <dd className="text-accent font-semibold text-right">{selectedBonsai.temperatureDrop}</dd>
                </div>
                <div className="pt-1">
                  <dt className="text-muted mb-1">Công năng vi khí hậu:</dt>
                  <dd className="text-ink leading-relaxed font-body text-xs font-normal">
                    {selectedBonsai.microclimateBenefit}
                  </dd>
                </div>
              </dl>
            </div>

            {/* GuHomes Handcrafted Guarantee */}
            <div className="p-6 bg-surface-subtle border border-accent/30 rounded-sm">
              <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-1">
                Kỷ Luật Thi Công GuHomes
              </span>
              <p className="text-xs text-muted leading-relaxed font-body">
                100% Cấu trúc mộc Gõ Đỏ và đá Sa Thạch được gia công mộng âm dương tại xưởng Thạnh Xuân 1.200m², lắp dựng tỉ mỉ không sử dụng đinh sắt, trần 12 công trình mỗi năm do đích thân KTS Trưởng giám sát.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
