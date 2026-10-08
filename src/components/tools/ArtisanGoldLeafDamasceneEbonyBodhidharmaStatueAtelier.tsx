'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
function FlameIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}

function EyeIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function ZoomInIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  )
}

function SparklesIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
    </svg>
  )
}

function AwardIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  )
}

interface CraftFeature {
  id: string
  name: string
  subtitle: string
  material: string
  process: string
  microclimaticRole: string
  spec: string
}

const STATUE_FEATURES: CraftFeature[] = [
  {
    id: 'fossil-ebony',
    name: 'Gỗ Mun Hoa Hóa Thạch Trầm Tích Sông Đồng Nai',
    subtitle: 'Thế đứng Đạt Ma Quá Hải bay lộng gió đối lưu sông',
    material: 'Lõi mun hoa (Diospyros mun) trầm tích ngâm nước trăm năm',
    process: 'Đục chạm thủ công bằng tay 180 ngày bởi nghệ nhân lão thành xưởng Thạnh Xuân',
    microclimaticRole: 'Tỷ trọng siêu đặc 1.25g/cm³, chìm nước tự nhiên, không thể ẩm mốc hay mối mọt',
    spec: 'Chiều cao 88cm · Nặng 28.5kg nguyên khối',
  },
  {
    id: 'gold-damascene',
    name: 'Dát Vàng Ròng 24K & Nạm Chỉ Bạc 999 Damascene',
    subtitle: 'Kỹ thuật nạm mộng rãnh khảm kim hoàn hoàng gia',
    material: 'Lá vàng ròng 24K quỳ Ta 99.99% và sợi bạc tinh khiết 999',
    process: 'Đục rãnh vi mô 0.3mm theo đường nếp áo cà sa, tán búa tay cố định chỉ kim loại',
    microclimaticRole: 'Chống oxy hóa vĩnh cửu trước không khí mặn ẩm 80% đặc thù của Sài Gòn',
    spec: 'Khảm hơn 45 mét chỉ vàng và bạc thủ công',
  },
  {
    id: 'amber-eyes',
    name: 'Mắt Khảm Hổ Phách Baltic Tự Nhiên Phát Quang',
    subtitle: 'Thần thái giác ngộ tĩnh tại và uy nghiêm',
    material: 'Hổ phách mật lạp Baltic tự nhiên loại thượng hạng',
    process: 'Mài quang học giác cắt kim cương, cẩn chìm sâu vào hốc mắt tượng',
    microclimaticRole: 'Hấp thụ và phản xạ ánh sáng ấm 2700K CRI 98, tạo sinh khí ấm áp cho phòng trà thiền',
    spec: 'Độ bóng sâu quang học refractive index 1.54',
  },
  {
    id: 'agarwood-stream',
    name: 'Bệ Khói Trầm Hương Ngược Dòng Kháng Khuẩn',
    subtitle: 'Thác khói sương mờ chảy tràn quanh bệ đá mun',
    material: 'Đá cuội bazan núi lửa kết hợp khay xông trầm hương chìm nước',
    process: 'Gia công buồng áp suất khí động học vi mô dẫn dòng khói nặng hơn không khí chảy tràn',
    microclimaticRole: 'Khói trầm tự nhiên thanh lọc không khí, khử khuẩn và tỏa hương thư thái',
    spec: 'Hút ẩm thụ động và lưu hương 12 tiếng liên tục',
  },
]

export function ArtisanGoldLeafDamasceneEbonyBodhidharmaStatueAtelier({ className = '' }: { className?: string }) {
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('fossil-ebony')
  const [isZoomed, setIsZoomed] = useState<boolean>(false)
  const [isIncenseActive, setIsIncenseActive] = useState<boolean>(true)
  const [lightingAngle, setLightingAngle] = useState<number>(45) // spotlight angle

  const activeFeature: CraftFeature = STATUE_FEATURES.find((f) => f.id === selectedFeatureId) ?? STATUE_FEATURES[0]!

  return (
    <section className={`relative overflow-hidden rounded-2xl border border-stone-800 bg-stone-950 p-6 text-stone-200 md:p-10 ${className}`}>
      {/* Golden Aura Glow Effect */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-900/10 blur-3xl" />

      {/* Header Monogram & Title */}
      <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-amber-500 uppercase">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Nghệ Thuật Điêu Khắc Độc Bản · Atelier Xưởng Thạnh Xuân
          </div>
          <h3 className="mt-1 font-serif text-2xl text-stone-100 md:text-3xl">
            Tượng Bồ Đề Đạt Ma Gỗ Mun Hoa Khảm Vàng Ròng 24K Damascene
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-stone-400">
            Tác phẩm điêu khắc độc bản thế đứng Quá Hải tạc từ gốc gỗ mun hoa trầm tích sông Đồng Nai, nạm chỉ vàng 24K và bạc 999, tích hợp bệ thác khói trầm hương ngược dòng xua ẩm mốc nhiệt đới.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsIncenseActive(!isIncenseActive)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
              isIncenseActive
                ? 'border-amber-500/80 bg-amber-950/40 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'border-stone-800 bg-stone-900 text-stone-400 hover:border-stone-700'
            }`}
          >
            <FlameIcon className="h-4 w-4 text-amber-500" />
            {isIncenseActive ? 'Đang Xông Trầm Ngược Dòng' : 'Kích Hoạt Trầm Hương'}
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas & Details */}
      <div className="relative z-10 grid gap-8 lg:grid-cols-12">
        {/* Left: 360 Visual Inspection Showcase */}
        <div className="flex flex-col items-center justify-between rounded-xl border border-stone-800/80 bg-stone-900/40 p-6 lg:col-span-6">
          <div className="flex w-full items-center justify-between border-b border-stone-800 pb-3">
            <span className="flex items-center gap-1.5 text-xs font-mono text-stone-400 uppercase">
              <EyeIcon className="h-4 w-4 text-amber-500" />
              Soi Vi Chi Tiết Nghệ Thuật Kim Hoàn
            </span>
            <span className="rounded bg-stone-800 px-2 py-0.5 text-[11px] font-mono text-amber-400">
              Mã độc bản: GU-BODHIDHARMA-2026-VIII
            </span>
          </div>

          {/* Statue Artistic Display Box */}
          <div className="relative my-8 flex h-72 w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border border-amber-900/40 bg-radial from-stone-800 via-stone-900 to-stone-950 p-6 shadow-2xl">
            {/* Dynamic Spotlight Effect based on slider */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40 transition-transform duration-300"
              style={{
                background: `radial-gradient(circle at ${lightingAngle}% 30%, rgba(245, 158, 11, 0.4) 0%, transparent 60%)`,
              }}
            />

            {/* Simulated Incense Smoke Cascade Animation */}
            {isIncenseActive && (
              <div className="pointer-events-none absolute bottom-4 inset-x-8 flex flex-col items-center opacity-70">
                <motion.div
                  animate={{ y: [0, 8, 16], opacity: [0.6, 0.9, 0] }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                  className="h-10 w-32 rounded-full bg-linear-to-b from-stone-200/20 to-transparent blur-md"
                />
                <span className="text-[10px] font-mono text-amber-400/80">Làn sương khói trầm hương ngược dòng</span>
              </div>
            )}

            {/* Central Stylized Silhouette & Golden Damascene Ribbons */}
            <motion.div
              animate={{ scale: isZoomed ? 1.15 : 1.0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative flex flex-col items-center"
            >
              {/* Halos of enlightened wisdom */}
              <div className="h-20 w-20 rounded-full border border-amber-500/40 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.2)] flex items-center justify-center">
                {/* Amber Eyes Glimmer */}
                <div className="flex gap-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse" />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b] animate-pulse delay-75" />
                </div>
              </div>

              {/* Ebony Body with Flowing Gold Robes */}
              <div className="relative mt-2 h-36 w-24 rounded-t-3xl bg-linear-to-b from-stone-900 via-stone-950 to-stone-900 border-x-2 border-stone-800 shadow-2xl flex flex-col items-center justify-around py-3">
                {/* 24K Gold Damascene Veins */}
                <div className="w-16 h-0.5 rounded-full bg-linear-to-r from-transparent via-amber-400 to-transparent shadow-xs" />
                <div className="w-20 h-0.5 rounded-full bg-linear-to-r from-transparent via-amber-300 to-transparent shadow-xs rotate-6" />
                <div className="w-14 h-0.5 rounded-full bg-linear-to-r from-transparent via-amber-400 to-transparent shadow-xs -rotate-3" />
                <div className="w-18 h-0.5 rounded-full bg-linear-to-r from-transparent via-amber-300 to-transparent shadow-xs" />
              </div>

              {/* Basalt Pedestal with Laser Seal */}
              <div className="relative -mt-1 h-6 w-32 rounded-sm border border-stone-700 bg-stone-900 shadow-lg flex items-center justify-center">
                <span className="text-[9px] font-mono tracking-widest text-amber-500 uppercase">GUHOMES · TRẦM HƯƠNG</span>
              </div>
            </motion.div>

            {/* Zoom Action Floating Button */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-stone-700 bg-stone-900/80 text-stone-300 hover:border-amber-500 hover:text-amber-400 transition"
              title="Phóng đại xem chi tiết"
            >
              <ZoomInIcon className="h-4 w-4" />
            </button>
          </div>

          {/* Spotlight Angle Interactive Slider */}
          <div className="w-full">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Góc rọi 0° (Bên trái)</span>
              <span className="text-amber-400">Điều hướng đèn rọi CRI 98 ({lightingAngle}°)</span>
              <span>Góc rọi 90° (Bên phải)</span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={lightingAngle}
              onChange={(e) => setLightingAngle(parseInt(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-stone-800 accent-amber-500"
            />
          </div>
        </div>

        {/* Right: Craftsmanship Breakdown & Specifications */}
        <div className="flex flex-col justify-between lg:col-span-6">
          <div className="space-y-3">
            <span className="text-xs font-mono tracking-wider text-stone-400 uppercase">4 Điểm Tinh Hoa Điêu Khắc</span>

            <div className="space-y-2.5">
              {STATUE_FEATURES.map((feat) => {
                const isSelected = selectedFeatureId === feat.id
                return (
                  <button
                    key={feat.id}
                    onClick={() => setSelectedFeatureId(feat.id)}
                    className={`w-full text-left rounded-xl border p-3.5 transition-all ${
                      isSelected
                        ? 'border-amber-500/70 bg-amber-950/20 shadow-md'
                        : 'border-stone-800/80 bg-stone-900/30 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif text-sm font-semibold text-stone-200">{feat.name}</h4>
                      <span className={`text-[10px] font-mono rounded px-1.5 py-0.5 ${isSelected ? 'bg-amber-500/20 text-amber-300' : 'text-stone-500'}`}>
                        {feat.spec}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-amber-400/80">{feat.subtitle}</p>
                  </button>
                )
              })}
            </div>

            {/* Active Feature In-Depth Analysis */}
            <div className="rounded-xl border border-stone-800/80 bg-stone-900/60 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <SparklesIcon className="h-4 w-4" />
                Quy Trình & Tác Dụng Vi Khí Hậu
              </div>
              <div className="mt-2 space-y-1.5 text-xs text-stone-300">
                <p>
                  <strong className="text-stone-200">Kỹ nghệ:</strong> {activeFeature.process}
                </p>
                <p>
                  <strong className="text-stone-200">Vi khí hậu:</strong> {activeFeature.microclimaticRole}
                </p>
              </div>
            </div>
          </div>

          {/* Heritage Guarantee Footer */}
          <div className="mt-4 flex items-center gap-3 border-t border-stone-800 pt-3 text-[11px] text-stone-500">
            <AwardIcon className="h-4 w-4 text-amber-500 shrink-0" />
            <span>Kèm chứng thư nghệ nhân xưởng Thạnh Xuân và bảo hành bảo dưỡng định kỳ trọn đời cho gia chủ.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
