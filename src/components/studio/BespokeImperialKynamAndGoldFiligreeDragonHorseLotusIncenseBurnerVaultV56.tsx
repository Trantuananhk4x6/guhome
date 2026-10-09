'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface KynamVaultMetric {
  label: string
  value: string
  subtext: string
  detail: string
}

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV56() {
  const [temperature, setTemperature] = useState<number>(165)
  const [soundscapeActive, setSoundscapeActive] = useState<boolean>(false)
  const [selectedRitualStage, setSelectedRitualStage] = useState<number>(0)
  const [mistDiffusionActive, setMistDiffusionActive] = useState<boolean>(true)

  // Web Audio Context & Nodes
  const audioCtxRef = useRef<AudioContext | null>(null)
  const osc1Ref = useRef<OscillatorNode | null>(null)
  const osc2Ref = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)

  const stopAudio = () => {
    try {
      if (osc1Ref.current) {
        osc1Ref.current.stop()
        osc1Ref.current.disconnect()
        osc1Ref.current = null
      }
      if (osc2Ref.current) {
        osc2Ref.current.stop()
        osc2Ref.current.disconnect()
        osc2Ref.current = null
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect()
        gainNodeRef.current = null
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close()
        audioCtxRef.current = null
      }
    } catch {
      // Safe cleanup catch
    }
  }

  const startAudio = () => {
    stopAudio()
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      audioCtxRef.current = ctx

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.001, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)
      gain.connect(ctx.destination)
      gainNodeRef.current = gain

      // Solfeggio 528Hz (Tần số chuyển hóa sinh học & tĩnh tại)
      const osc1 = ctx.createOscillator()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(528, ctx.currentTime)
      osc1.connect(gain)
      osc1.start()
      osc1Ref.current = osc1

      // Hòa âm 741Hz (Tần số thanh lọc không gian tâm linh)
      const osc2 = ctx.createOscillator()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(741, ctx.currentTime)
      osc2.connect(gain)
      osc2.start()
      osc2Ref.current = osc2
    } catch {
      // Audio autoplay restrictions catch
    }
  }

  const toggleSoundscape = () => {
    if (soundscapeActive) {
      stopAudio()
      setSoundscapeActive(false)
    } else {
      startAudio()
      setSoundscapeActive(true)
    }
  }

  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [])

  const metrics: KynamVaultMetric[] = [
    {
      label: 'Vi Điều Nhiệt Không Khói',
      value: `${temperature}°C`,
      subtext: 'Bảo lưu trọn vẹn tinh dầu Kỳ Nam',
      detail: 'Mức nhiệt vi chỉnh chính xác từng độ C, giúp các tầng hương nhựa thơm Kỳ Nam thăng hoa mà không sinh khói hay muội than.',
    },
    {
      label: 'Vàng 24K Filigree Thủ Công',
      value: '99.99%',
      subtext: 'Chạm khắc Kim Long Mã phi vân',
      detail: 'Từng sợi chỉ vàng nguyên chất được kéo mảnh 0.12mm, uốn kết hình tượng Long Mã phi vân chở hoa sen bách diệp che chở gia môn.',
    },
    {
      label: 'Án Thờ Gỗ Trắc Đỏ Nam Bộ',
      value: '400 Năm',
      subtext: 'Tom gỗ mịn màng & sắc đỏ thắm',
      detail: 'Gỗ Trắc Đỏ Nam Bộ tự nhiên 400 năm tuổi, đanh chắc như ngọc, vân lửa uyển chuyển, kháng ẩm mốc và thích ứng hoàn hảo khí hậu Sài Gòn.',
    },
    {
      label: 'Hòa Âm Solfeggio Kép',
      value: '528 & 741 Hz',
      subtext: 'Thanh lọc trường năng lượng an gia',
      detail: 'Tần số hòa âm nguyên bản kích hoạt trạng thái thiền định sâu, làm dịu tâm trí và cộng hưởng năng lượng bình an cho gia chủ.',
    },
  ]

  const ritualStages = [
    {
      stage: 'Khởi Khí · 80°C - 120°C',
      title: 'Đánh Thức Tầng Hương Thảo Mộc Tiền Vị',
      desc: 'Nhiệt độ dịu nhẹ làm ấm dần phiến Trầm Kỳ Nam Khánh Hòa, giải phóng nốt hương ngọt thanh ban sơ như mật ong rừng và cỏ hoa sương sớm.',
      fragranceNote: 'Ngọt thanh sương sớm · Tĩnh dưỡng tâm trí',
    },
    {
      stage: 'Chính Khí · 140°C - 180°C',
      title: 'Hương Gỗ Trầm Ấm Thăng Hoa Trung Vị',
      desc: 'Nhiệt độ tối ưu để tinh chất nhựa Kỳ Nam sôi nhẹ không tàn, lan tỏa hương thơm quyền quý, bao phủ toàn bộ thư phòng và bảo thất thiêng liêng.',
      fragranceNote: 'Đậm đà uyển chuyển · Tụ khí an gia',
    },
    {
      stage: 'Viên Mãn · 200°C - 240°C',
      title: 'Dư Ba Trầm Tích Hậu Vị Bất Biến',
      desc: 'Giai đoạn lưu hương sâu lắng với nốt hương da thuộc và hổ phách cổ đại, lưu giữ trường khí thanh tịnh suốt 24 giờ sau khi thưởng trầm.',
      fragranceNote: 'Hổ phách vương giả · Trường thọ vĩnh cửu',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#0a0a0c] py-28 text-[#f7f3ec]">
      {/* Background Incense Glow & Aura */}
      <div className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute top-1/3 left-1/3 h-96 w-96 rounded-full bg-[#8c5028] blur-[150px]" />
        <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#a3703c] blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e5a93c]/30 bg-[#151417] px-4 py-1.5 text-xs font-medium tracking-widest text-[#e5a93c] uppercase">
            Bảo Thất Cung Đình · Thế Hệ V56
          </span>
          <h2 className="mt-6 font-serif text-3xl font-light tracking-wide text-[#f7f3ec] sm:text-5xl lg:text-6xl">
            Bảo Thất Đỉnh Lư Kim Long Mã V56
            <span className="block font-serif italic text-[#d4af37]">
              Trầm Kỳ Nam Trên Án Trắc Đỏ Nam Bộ 400 Năm
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-[#b5aba0] sm:text-lg">
            Đỉnh cao nghệ thuật chế tác tâm linh và vi điều nhiệt không khói từ GuHomes.
            Sự hội tụ tinh hoa giữa Ngọc Trầm Kỳ Nam Khánh Hòa, sợi Vàng 24K Filigree kéo tay và bệ đỡ gỗ Trắc Đỏ
            Nam Bộ 400 năm tuổi, thanh lọc trường khí vi khí hậu gia cư tối thượng.
          </p>
        </div>

        {/* Interactive Chamber Simulation */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visual Chamber */}
          <div className="relative rounded-2xl border border-[#2e2b26] bg-[#121316] p-8 lg:col-span-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#2e2b26] pb-6">
              <div>
                <p className="text-xs tracking-wider text-[#8f8577] uppercase">Vi Điều Nhiệt Không Khói</p>
                <p className="text-2xl font-light text-[#f7f3ec]">{temperature}°C · Kiểm Soát Cảm Biến Kép</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleSoundscape}
                  aria-label={soundscapeActive ? 'Tắt hòa âm Solfeggio 528Hz & 741Hz' : 'Bật hòa âm Solfeggio 528Hz & 741Hz'}
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    soundscapeActive
                      ? 'border-[#e5a93c] bg-[#e5a93c]/20 text-[#e5a93c]'
                      : 'border-[#38342e] bg-[#18191c] text-[#b5aba0] hover:border-[#8f8577]'
                  }`}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                    />
                  </svg>
                  <span>{soundscapeActive ? 'Hòa Âm 528Hz + 741Hz: Đang Phát' : 'Hòa Âm Tĩnh Lặng'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMistDiffusionActive(!mistDiffusionActive)}
                  aria-label="Chuyển trạng thái khuếch tán tinh dầu"
                  className={`inline-flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                    mistDiffusionActive
                      ? 'border-[#c28e46] bg-[#c28e46]/20 text-[#e5a93c]'
                      : 'border-[#38342e] bg-[#18191c] text-[#b5aba0] hover:border-[#8f8577]'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${mistDiffusionActive ? 'bg-[#e5a93c] animate-ping' : 'bg-gray-500'}`} />
                  <span>{mistDiffusionActive ? 'Kỳ Nam: Thăng Hoa' : 'Tĩnh Thất'}</span>
                </button>
              </div>
            </div>

            {/* Chamber Central Altar Simulation */}
            <div className="relative my-8 flex h-72 items-center justify-center rounded-xl bg-gradient-to-b from-[#0a0a0c] to-[#18181d] p-6 shadow-2xl">
              {/* Incense Scent Waves Animation */}
              {mistDiffusionActive && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
                  <motion.div
                    animate={{ y: [20, -50, -100], opacity: [0, 0.4, 0], scale: [0.8, 1.2, 1.6] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeOut' }}
                    className="absolute h-40 w-40 rounded-full bg-gradient-to-t from-transparent via-[#d4af37]/20 to-transparent blur-xl"
                  />
                  <motion.div
                    animate={{ y: [10, -60, -110], opacity: [0, 0.35, 0], scale: [0.9, 1.3, 1.7] }}
                    transition={{ repeat: Infinity, duration: 5.2, delay: 1.2, ease: 'easeOut' }}
                    className="absolute h-48 w-48 rounded-full bg-gradient-to-t from-transparent via-[#8c5028]/25 to-transparent blur-2xl"
                  />
                </div>
              )}

              {/* Central Burner Vault on Trac Do Altar */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Incense Burner Urn */}
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-[#d4af37] bg-gradient-to-br from-[#2a1e17] to-[#141210] shadow-[0_0_35px_rgba(212,175,55,0.25)]">
                  {/* Gold Filigree filigree rings */}
                  <div className="absolute inset-2 rounded-full border border-dashed border-[#e5a93c]/60 animate-spin-slow" />
                  <span className="font-serif text-xs tracking-wider text-[#d4af37] text-center px-2">
                    Long Mã V56
                  </span>
                </div>

                {/* Ancient Trac Do Timber Altar Plinth */}
                <div className="mt-2 h-6 w-56 rounded border border-[#5c241b] bg-[#3a130f] shadow-lg flex items-center justify-center">
                  <span className="text-[10px] tracking-widest text-[#d89f7f] uppercase">
                    Án Trắc Đỏ Nam Bộ 400 Năm
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-[#a89b8d]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                  <span>Nhiệt độ buồng đốt: {temperature}°C · Hương thơm tinh khiết không khói</span>
                </div>
              </div>
            </div>

            {/* Slider to adjust Temperature */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-[#b5aba0]">
                <span>Khởi Khí 80°C</span>
                <span>Thư Thái 120°C</span>
                <span>Tối Ưu 165°C</span>
                <span>Viên Mãn 240°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                step="5"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                aria-label="Điều chỉnh nhiệt độ vi điều nhiệt đốt trầm Kỳ Nam"
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-[#2e2b26] accent-[#d4af37]"
              />
            </div>
          </div>

          {/* Ritual Stages Showcase */}
          <div className="flex flex-col justify-between space-y-4 lg:col-span-4">
            {ritualStages.map((stage, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedRitualStage(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  selectedRitualStage === idx
                    ? 'border-[#d4af37] bg-[#18191c] shadow-lg shadow-[#d4af37]/5'
                    : 'border-[#2e2b26] bg-[#121316] hover:border-[#47433c]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-medium text-[#d4af37]">{stage.stage}</span>
                  <span className="text-xs text-[#8f8577]">Thế V56</span>
                </div>
                <h3 className="mt-2 font-serif text-lg font-normal text-[#f7f3ec]">{stage.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#b5aba0]">{stage.desc}</p>
                <div className="mt-4 border-t border-[#2e2b26] pt-3 text-[11px] text-[#e5a93c]">
                  {stage.fragranceNote}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-[#2e2b26] bg-[#121316] p-6 transition-colors hover:border-[#d4af37]"
            >
              <p className="text-xs tracking-wider text-[#8f8577] uppercase">{metric.label}</p>
              <p className="mt-3 font-serif text-4xl font-light text-[#f7f3ec] group-hover:text-[#d4af37]">
                {metric.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#d4af37]">{metric.subtext}</p>
              <p className="mt-3 text-xs leading-relaxed text-[#a89b8d]">{metric.detail}</p>
            </div>
          ))}
        </div>

        {/* Lead Architect & Heritage Assurance */}
        <div className="mt-16 rounded-2xl border border-[#3d3830] bg-gradient-to-r from-[#17151a] via-[#211a16] to-[#17151a] p-8 text-center sm:p-12">
          <p className="text-xs tracking-widest text-[#d4af37] uppercase">Độc Bản Phong Thủy Cung Đình GuHomes</p>
          <h3 className="mt-4 font-serif text-2xl font-light text-[#f7f3ec] sm:text-3xl">
            Tụ Khí An Gia · Khắc Họa Bản Sắc Thượng Lưu Trọng Hậu
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#b5aba0]">
            Mỗi đỉnh lư trầm và án thờ Trắc Đỏ Nam Bộ được nghệ nhân bậc thầy hoàn thiện thủ công
            hơn 700 giờ tại xưởng Thạnh Xuân 1.200m², ứng dụng cảm biến nhiệt bán dẫn nhập khẩu từ Thụy Sĩ,
            bảo đảm an toàn tuyệt đối và tôn nghiêm bất biến cho không gian tâm linh.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#d4af37]">
            <span>Hotline KTS Trưởng: 0368 757 916</span>
            <span>·</span>
            <span>Email: guhomesvn@gmail.com</span>
            <span>·</span>
            <span>Trần 12 công trình/năm</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV56
