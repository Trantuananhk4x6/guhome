'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CloisonneCustomization {
  enamelPalette: 'ngoc-luc-bao' | 'do-chu-sa' | 'hoang-kim-thuy-tinh'
  lotusStyle: 'lien-hoa-tam-tang' | 'hoa-sen-may-cuon' | 'sen-chua-mot-cot'
  pedestalStyle: 'tam-lan-ma-vang' | 'toa-sen-dong-do' | 'ngu-phung-dat-ngoc'
  magnifierZoom: boolean
  smokeAnimation: boolean
  clanEraEngraving: string
}

const ENAMEL_PALETTES = [
  {
    id: 'ngoc-luc-bao',
    name: 'Xanh Ngọc Lục Bảo (Bích Thủy)',
    desc: 'Men thủy tinh xanh ngọc trong vắt tựa ngọc bích cung đình Huế, nung 4 nước lửa 850°C',
    colorHex: '#059669'
  },
  {
    id: 'do-chu-sa',
    name: 'Đỏ Chu Sa Cung Đình (Phượng Các)',
    desc: 'Men đỏ chu sa rực rỡ tượng trưng cho quyền uy và hưng vượng hoàng gia',
    colorHex: '#dc2626'
  },
  {
    id: 'hoang-kim-thuy-tinh',
    name: 'Vàng Hoàng Kim Men Thủy Tinh (Thái Hòa)',
    desc: 'Sắc men vàng hoàng đế cẩn chỉ đồng dát vàng quỳ Kiêu Kỵ 24K',
    colorHex: '#d97706'
  }
]

const LOTUS_STYLES = [
  { id: 'lien-hoa-tam-tang', name: 'Liên Hoa Tam Tầng', desc: 'Ba lớp cánh sen nở bung xếp so le thoát khói trầm tỏa tròn' },
  { id: 'hoa-sen-may-cuon', name: 'Hoa Sen Mây Cuộn Triều Nguyễn', desc: 'Dải mây lành cuộn quanh cuống sen gò nổi 3D' },
  { id: 'sen-chua-mot-cot', name: 'Búp Sen Cổ Thời Lý', desc: 'Dáng búp sen thanh tú vuốt nhọn kiêu hãnh hướng thượng' }
]

export function ArtisanHandmadeCloisonneIncenseBurnerVault({ className = '' }: { className?: string }) {
  const [config, setConfig] = useState<CloisonneCustomization>({
    enamelPalette: 'ngoc-luc-bao',
    lotusStyle: 'lien-hoa-tam-tang',
    pedestalStyle: 'tam-lan-ma-vang',
    magnifierZoom: false,
    smokeAnimation: true,
    clanEraEngraving: 'HOÀNG GIA ĐẠI VIỆT 2026'
  })

  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [consultName, setConsultName] = useState('')
  const [consultPhone, setConsultPhone] = useState('')
  const [isOrdered, setIsOrdered] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const bellTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      stopAudio()
      if (bellTimerRef.current) clearInterval(bellTimerRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
      }
    }
  }, [])

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  // Âm thanh chuông xoay thiền định tĩnh tâm khi đốt trầm hương Kỳ Nam
  const startAudio = () => {
    const ctx = initAudio()
    if (!ctx) return

    setIsAudioPlaying(true)

    const triggerMeditationBell = () => {
      if (!ctx || ctx.state === 'closed') return
      const now = ctx.currentTime

      // Chuông xoay Tây Tạng dải tần 432Hz (Healing frequency)
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const gain = ctx.createGain()

      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(432, now)

      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(432 * 2.76, now) // hài âm chuông đồng cổ

      gain.gain.setValueAtTime(0.001, now)
      gain.gain.linearRampToValueAtTime(0.18, now + 0.05)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5)

      osc1.connect(gain)
      osc2.connect(gain)
      gain.connect(ctx.destination)

      osc1.start(now)
      osc2.start(now)
      osc1.stop(now + 3.6)
      osc2.stop(now + 3.6)
    }

    triggerMeditationBell()
    bellTimerRef.current = setInterval(triggerMeditationBell, 4500)
  }

  const stopAudio = () => {
    if (bellTimerRef.current) {
      clearInterval(bellTimerRef.current)
      bellTimerRef.current = null
    }
    setIsAudioPlaying(false)
  }

  const toggleAudio = () => {
    if (isAudioPlaying) {
      stopAudio()
    } else {
      startAudio()
    }
  }

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultName || !consultPhone) return
    setIsOrdered(true)
  }

  const activePalette = ENAMEL_PALETTES.find(p => p.id === config.enamelPalette) ?? (ENAMEL_PALETTES[0] as (typeof ENAMEL_PALETTES)[0])

  return (
    <section className={cn('w-full overflow-hidden bg-stone-950 py-16 text-stone-100 sm:py-24', className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-600/40 bg-amber-950/40 px-3.5 py-1 text-xs font-medium tracking-wide text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Nghệ Thuật Pháp Lam Cung Đình Huế
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-700/60 bg-stone-900/60 px-3.5 py-1 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-2 w-2 rounded-full bg-stone-400" />
              Chỉ Đồng 0.25mm &amp; Men Thủy Tinh 850°C | GU-INCENSE-BURNER-2026-X
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-light tracking-tight text-white sm:text-4xl md:text-5xl font-serif">
            Lư Đốt Trầm Pháp Lam Liên Hoa <span className="italic text-amber-200">Cloisonne Incense Burner</span>
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-stone-400 sm:text-base">
            Phục dựng kỹ nghệ Pháp Lam cung đình Huế ngàn năm thất truyền. Cốt đồng đỏ dát mỏng gò tay, uốn từng sợi chỉ đồng
            0.25mm tạo họa tiết cánh sen liên hoa và mây cuộn triều Nguyễn, tra men thủy tinh đa sắc nung 4 lần ở 850°C
            mài bóng gương và chân đế tam lân mạ vàng quỳ Kiêu Kỵ 24K tỏa khói Kỳ Nam linh thiêng.
          </p>
        </div>

        {/* Khung chức năng 2 cột */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cột trái: Kính lúp soi 18x & Mô phỏng làn khói trầm Kỳ Nam */}
          <div className="flex flex-col justify-between rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md lg:col-span-7 sm:p-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <h3 className="text-lg font-medium text-white sm:text-xl font-serif">Kính Phóng Đại 18x Soi Chỉ Đồng 0.25mm</h3>
                  <p className="text-xs text-stone-400">Kiểm tra đường ranh chỉ đồng uốn tay ngăn cách từng ô men ngọc Pháp Lam</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setConfig(prev => ({ ...prev, magnifierZoom: !prev.magnifierZoom }))}
                    className={cn(
                      'rounded-xl border px-3 py-2 text-xs font-medium transition-all min-h-[44px]',
                      config.magnifierZoom
                        ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                        : 'border-stone-700 bg-stone-800 text-stone-300 hover:border-amber-600/50'
                    )}
                  >
                    {config.magnifierZoom ? 'Thu Về 1x' : 'Bật Kính 18x'}
                  </button>

                  <button
                    type="button"
                    onClick={toggleAudio}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all min-h-[44px]',
                      isAudioPlaying
                        ? 'border border-amber-500 bg-amber-500/20 text-amber-200 shadow-md shadow-amber-500/10'
                        : 'border border-stone-700 bg-stone-800 text-stone-300 hover:border-amber-600/50'
                    )}
                  >
                    {isAudioPlaying ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                        <span>Tắt Chuông Thiền</span>
                      </>
                    ) : (
                      <>
                        <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                        <span>Chuông 432Hz</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Mô phỏng chiếc Lư Pháp Lam & Làn khói trầm bay */}
              <div className="relative mt-8 flex flex-col items-center justify-center overflow-hidden rounded-xl border border-stone-800/80 bg-stone-950/90 py-16 px-6 text-center">
                {/* Làn khói trầm Kỳ Nam cuộn bay */}
                {config.smokeAnimation && (
                  <div className="absolute top-6 flex flex-col items-center pointer-events-none">
                    <motion.div
                      animate={{ y: [-10, -40, -70], opacity: [0.8, 0.4, 0], scale: [0.8, 1.3, 1.8] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}
                      className="h-10 w-10 rounded-full bg-stone-200/25 blur-md"
                    />
                    <motion.div
                      animate={{ y: [-5, -35, -65], opacity: [0.7, 0.3, 0], scale: [0.7, 1.2, 1.6] }}
                      transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: 'easeOut' }}
                      className="h-8 w-8 rounded-full bg-amber-100/20 blur-md"
                    />
                  </div>
                )}

                {/* Chiếc Lư hoa sen Pháp Lam */}
                <motion.div
                  animate={config.magnifierZoom ? { scale: 1.5 } : { scale: 1 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="relative flex flex-col items-center justify-center"
                >
                  {/* Nắp Lư hình búp sen */}
                  <div className="relative flex flex-col items-center">
                    <div className="h-8 w-12 rounded-t-full border border-amber-400 bg-amber-400 shadow-md flex items-center justify-center">
                      <span className="text-[8px] font-bold text-stone-900">VÀNG 24K</span>
                    </div>
                    {/* Khe thoát khói */}
                    <div className="flex gap-1.5 my-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-stone-900" />
                      <div className="h-1.5 w-1.5 rounded-full bg-stone-900" />
                      <div className="h-1.5 w-1.5 rounded-full bg-stone-900" />
                    </div>
                  </div>

                  {/* Bụng Lư cẩn men Pháp Lam */}
                  <div
                    className="relative flex h-36 w-44 sm:h-40 sm:w-52 flex-col items-center justify-center rounded-[40%_40%_45%_45%] border-2 border-amber-400 shadow-2xl transition-colors duration-500"
                    style={{ backgroundColor: activePalette.colorHex }}
                  >
                    {/* Chỉ đồng uốn hoa văn mây cuộn */}
                    <div className="absolute inset-2 rounded-inherit border border-amber-300/80 border-dashed" />
                    <div className="absolute inset-4 rounded-inherit border border-amber-200/60" />

                    <div className="relative z-10 text-center p-3">
                      <span className="text-[9px] font-mono tracking-widest text-amber-200 block uppercase font-bold">
                        {config.clanEraEngraving}
                      </span>
                      <p className="mt-1 text-xs font-serif font-bold text-white drop-shadow-md">
                        PHÁP LAM CUNG ĐÌNH
                      </p>
                      <span className="text-[8px] text-amber-100 font-mono block mt-1">Chỉ đồng 0.25mm · Men 850°C</span>
                    </div>
                  </div>

                  {/* Chân đế Tam Lân mạ vàng 24K */}
                  <div className="flex justify-between w-36 sm:w-44 mt-1">
                    {[0, 1, 2].map((idx) => (
                      <div
                        key={idx}
                        className="h-7 w-8 rounded-b-md border-t-2 border-amber-500 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 shadow-md flex items-center justify-center"
                      >
                        <span className="text-[7px] font-bold text-stone-900 font-serif">LÂN</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Nhãn soi kính hiển vi */}
                {config.magnifierZoom && (
                  <div className="mt-8 rounded-full border border-amber-600/40 bg-amber-950/60 px-4 py-1 text-xs text-amber-200 animate-pulse">
                    Đang soi kính lúp 18x: Độ khớp nối chỉ đồng 0.25mm và độ bóng gương men thủy tinh nung 4 nước lửa
                  </div>
                )}
              </div>

              {/* Thông tin màu men */}
              <div className="mt-8 rounded-xl border border-stone-800 bg-stone-950/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-200">{activePalette.name}</span>
                  <span className="font-mono text-xs text-stone-400">Nung 4 Nước Lửa 850°C</span>
                </div>
                <p className="mt-2 text-xs text-stone-300 leading-relaxed">{activePalette.desc}</p>
              </div>
            </div>

            {/* Quy chuẩn hoàn thiện lư */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-stone-800 pt-6 sm:grid-cols-4">
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Độ Mảnh Chỉ Đồng</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">0.25 mm</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Nhiệt Độ Lò Nung</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">850°C Lò Củi</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Chân Đế Tam Lân</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">Mạ Vàng 24K</p>
              </div>
              <div className="rounded-xl border border-stone-800/80 bg-stone-950/40 p-3 text-center">
                <span className="text-[10px] uppercase tracking-wider text-stone-400">Mài Bóng Gương</span>
                <p className="mt-1 font-mono text-base font-semibold text-amber-300">Đá Mài Than</p>
              </div>
            </div>
          </div>

          {/* Cột phải: Tùy biến & Đăng ký chế tác */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6 backdrop-blur-md sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Tùy Biến Lư Trầm Ngự Dụng</h3>

              <div className="mt-5 space-y-4">
                {/* Chọn màu men Pháp Lam */}
                <div>
                  <label className="text-xs text-stone-400">Sắc men thủy tinh hoàng gia:</label>
                  <div className="mt-1.5 grid grid-cols-1 gap-2">
                    {ENAMEL_PALETTES.map((pal) => (
                      <div
                        key={pal.id}
                        onClick={() =>
                          setConfig(prev => ({
                            ...prev,
                            enamelPalette: pal.id as CloisonneCustomization['enamelPalette']
                          }))
                        }
                        className={cn(
                          'cursor-pointer rounded-xl border p-2.5 transition-colors min-h-[44px]',
                          config.enamelPalette === pal.id
                            ? 'border-amber-500 bg-amber-950/30 text-amber-100'
                            : 'border-stone-800 bg-stone-950/50 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: pal.colorHex }} />
                          <p className="text-xs font-medium">{pal.name}</p>
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5">{pal.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chọn dáng hoa sen */}
                <div>
                  <label className="text-xs text-stone-400">Dáng nắp lư sen:</label>
                  <div className="mt-1.5 space-y-2">
                    {LOTUS_STYLES.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() =>
                          setConfig(prev => ({
                            ...prev,
                            lotusStyle: style.id as CloisonneCustomization['lotusStyle']
                          }))
                        }
                        className={cn(
                          'w-full text-left rounded-xl border p-2.5 transition-colors min-h-[44px]',
                          config.lotusStyle === style.id
                            ? 'border-amber-500 bg-amber-950/40 text-amber-200'
                            : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-300'
                        )}
                      >
                        <p className="text-xs font-medium">{style.name}</p>
                        <p className="text-[11px] text-stone-500">{style.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Khắc niên hiệu gia tộc */}
                <div>
                  <label className="text-xs text-stone-400">Niên hiệu / Gia huy đúc nổi đáy lư:</label>
                  <input
                    type="text"
                    maxLength={20}
                    value={config.clanEraEngraving}
                    onChange={(e) => setConfig(prev => ({ ...prev, clanEraEngraving: e.target.value.toUpperCase() }))}
                    placeholder="VD: TRẦN GIA GIA BẢO 2026..."
                    className="mt-1.5 w-full rounded-xl border border-stone-700 bg-stone-950 px-3.5 py-2 text-xs text-amber-300 font-serif uppercase tracking-widest placeholder-stone-600 focus:border-amber-500 focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            {/* Form đặt chế tác */}
            <div className="rounded-2xl border border-stone-800 bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-8">
              <h3 className="text-base font-medium text-white font-serif">Đặt Chế Tác Lư Pháp Lam Ngự Dụng</h3>
              <p className="mt-1 text-xs text-stone-400">
                Thời gian chế tác thủ công: 60 ngày. Kèm hộp gấm hoàng cung và chứng thư giám định đồng đỏ mạ vàng 24K.
              </p>

              {isOrdered ? (
                <div className="mt-5 rounded-xl border border-amber-800/60 bg-amber-950/40 p-4 text-center">
                  <p className="text-xs font-medium text-amber-200">
                    Đã ghi nhận yêu cầu chế tác lư Pháp Lam. Nghệ nhân kim hoàn GuHomes sẽ liên hệ gửi bản vẽ chỉ đồng trong 24 giờ.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="mt-4 space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Họ tên người nhận"
                      value={consultName}
                      onChange={(e) => setConsultName(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none min-h-[44px]"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Số điện thoại / Zalo"
                      value={consultPhone}
                      onChange={(e) => setConsultPhone(e.target.value)}
                      className="w-full rounded-xl border border-stone-700 bg-stone-900 px-3.5 py-2.5 text-xs text-white placeholder-stone-500 focus:border-amber-500 focus:outline-none min-h-[44px]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-semibold text-stone-950 transition-colors hover:bg-amber-400 min-h-[44px]"
                  >
                    <span>Yêu Cầu Chế Tác Lư Pháp Lam</span>
                  </button>
                  <p className="text-center text-[10px] text-stone-500">
                    Hotline: 0368 757 916 | Xưởng Thạnh Xuân 1.200m², Q.12
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
