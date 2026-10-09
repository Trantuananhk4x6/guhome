'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface MoatMetrics {
  ambientTemp: number
  pavilionTemp: number
  coolingDelta: number
  humidity: number
  airflowSpeed: number
  lotusFragranceIndex: number
}

export function SaigonCanalSideAncientHingedGaoBonsaiMoatPavilion() {
  const [doorAngle, setDoorAngle] = useState<number>(70)
  const [bonsaiRotation, setBonsaiRotation] = useState<number>(90)
  const [audioActive, setAudioActive] = useState<boolean>(false)
  const [activeSeason, setActiveSeason] = useState<'dry' | 'monsoon'>('dry')
  const [activeTab, setActiveTab] = useState<'architecture' | 'microclimate' | 'bonsai' | 'audio'>('architecture')

  // Audio Context Ref
  const audioCtxRef = useRef<AudioContext | null>(null)
  const oscRef = useRef<OscillatorNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)

  // Metrics calculation
  const metrics: MoatMetrics = {
    ambientTemp: activeSeason === 'dry' ? 36.6 : 32.4,
    pavilionTemp: activeSeason === 'dry' ? 36.6 - 8.1 * (doorAngle / 90) : 32.4 - 6.9 * (doorAngle / 90),
    coolingDelta: Number((8.1 * (doorAngle / 90)).toFixed(1)),
    humidity: activeSeason === 'dry' ? 55 + Math.round(doorAngle * 0.15) : 77 + Math.round(doorAngle * 0.12),
    airflowSpeed: Number((0.52 + (doorAngle / 90) * 1.42).toFixed(2)),
    lotusFragranceIndex: Math.round(75 + (doorAngle / 90) * 25),
  }

  const toggleAudio = () => {
    if (!audioActive) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        const ctx = new AudioCtx()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'sine'
        osc.frequency.setValueAtTime(528, ctx.currentTime) // 528Hz Solfeggio frequency

        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2)

        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()

        audioCtxRef.current = ctx
        oscRef.current = osc
        gainRef.current = gain
        setAudioActive(true)
      } catch (err) {
        console.error('Web Audio API not supported or error:', err)
      }
    } else {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.6)
        setTimeout(() => {
          oscRef.current?.stop()
          audioCtxRef.current?.close()
          audioCtxRef.current = null
          oscRef.current = null
          gainRef.current = null
          setAudioActive(false)
        }, 700)
      } else {
        setAudioActive(false)
      }
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
    <section className="relative w-full overflow-hidden bg-[#0c0d0e] py-28 text-[#e6e4df]">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-[#4a3e2e] blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-96 w-96 rounded-full bg-[#2e4a3e] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* Header Badge & Title */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#17181a] px-4 py-1.5 text-xs tracking-wider text-[#d4af37]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
            KIẾN TRÚC VI KHÍ HẬU VEN SÔNG SÀI GÒN · KHUNG GỖ GẠO CỔ THỤ BÁCH NIÊN
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-light tracking-wide text-[#f5f3ef] md:text-5xl"
          >
            Thủy Đình Gỗ Gạo Hào Sen & Bệ Bonsai Sanh Nam Điền
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#a8a59d] md:text-base"
          >
            Không gian thưởng trà tĩnh tại ven rạch Sài Gòn. Chế tác từ khung gỗ Gạo cổ thụ 290 năm tuổi vân xoáy ấm áp,
            kết hợp hệ cánh cửa cối mộng nêm truyền thống, hào nước sen bách diệp hạ nhiệt thực tế -8.1°C cùng bệ xoay Bonsai Sanh Nam Điền Cổ Thụ 305 năm tuổi.
          </motion.p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Main Visualizer Stage (7 cols) */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#2a2b2e] bg-[#141517] p-6 lg:col-span-7">
            {/* Stage Status Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#252629] pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-3 w-3 items-center justify-center">
                  <span className="h-2 w-2 animate-ping rounded-full bg-[#d4af37]" />
                </span>
                <span className="font-mono text-xs text-[#a3a199]">
                  HÀO THỦY SINH THÁI: {activeSeason === 'dry' ? 'MÙA KHÔ SÀI GÒN' : 'MÙA MƯA TÂY NAM'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSeason(activeSeason === 'dry' ? 'monsoon' : 'dry')}
                  className="rounded border border-[#3a3b3e] bg-[#1d1f22] px-3 py-1 text-xs text-[#dcdad5] transition-colors hover:border-[#8a724d] hover:text-[#d4af37]"
                >
                  Đổi mùa: {activeSeason === 'dry' ? 'Khô (36.6°C)' : 'Mưa (32.4°C)'}
                </button>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`flex items-center gap-1.5 rounded border px-3 py-1 text-xs transition-colors ${
                    audioActive
                      ? 'border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]'
                      : 'border-[#3a3b3e] bg-[#1d1f22] text-[#a8a59d] hover:border-[#8a724d]'
                  }`}
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                  {audioActive ? '528Hz Đang ngân' : 'Thanh âm 528Hz'}
                </button>
              </div>
            </div>

            {/* Visual Canvas Representation */}
            <div className="relative flex min-h-[340px] items-center justify-center rounded-xl bg-gradient-to-b from-[#191816] to-[#0f1012] p-8">
              {/* Moat Water Ripples */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden rounded-xl">
                <div className="h-72 w-72 animate-pulse rounded-full border border-[#44624a]/20" />
                <div className="absolute h-96 w-96 rounded-full border border-[#324b37]/15" />
                <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs font-mono text-[#5b7f63]">
                  <span>~ Hào sen bách diệp & súng ngũ sắc lưu thông</span>
                </div>
              </div>

              {/* Pavilion Door Angle Graphic */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Bonsai Tree Simulator on Top Platform */}
                <div
                  className="relative mb-6 flex h-36 w-36 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#1a1b1e] shadow-2xl transition-transform duration-500 ease-out"
                  style={{ transform: `rotate(${bonsaiRotation}deg)` }}
                >
                  <div className="text-center">
                    <div className="text-2xl">🪴</div>
                    <div className="mt-1 font-mono text-[10px] text-[#d4af37]">Sanh Nam Điền</div>
                    <div className="text-[9px] text-[#8e8c84]">305 năm tuổi</div>
                  </div>
                  {/* North orientation tick */}
                  <div className="absolute top-1 h-2 w-1 rounded-full bg-[#d4af37]" />
                </div>

                {/* Hinged Doors Demonstration */}
                <div className="flex items-center gap-6">
                  {/* Left Door */}
                  <div
                    className="h-28 w-14 rounded-l-md border-l-2 border-t-2 border-b-2 border-[#8a724d] bg-gradient-to-r from-[#2c2217] to-[#473724] shadow-lg transition-transform duration-300"
                    style={{ transform: `perspective(400px) rotateY(${doorAngle}deg)` }}
                  >
                    <div className="flex h-full flex-col justify-between p-1.5 text-[8px] text-[#d6be96]">
                      <span>Cánh Tả</span>
                      <span className="font-mono">{doorAngle}°</span>
                    </div>
                  </div>

                  {/* Central Tea Altar Platform */}
                  <div className="flex h-24 w-32 flex-col items-center justify-center rounded-lg border border-[#4d3d2a] bg-[#1f1810] px-2 text-center shadow-inner">
                    <span className="text-[10px] tracking-widest text-[#d4af37]">NỘI ĐIỆN</span>
                    <span className="mt-1 font-mono text-lg font-light text-[#f0ede6]">
                      {metrics.pavilionTemp.toFixed(1)}°C
                    </span>
                    <span className="text-[9px] text-[#789d7d]">Giảm -{metrics.coolingDelta}°C</span>
                  </div>

                  {/* Right Door */}
                  <div
                    className="h-28 w-14 rounded-r-md border-r-2 border-t-2 border-b-2 border-[#8a724d] bg-gradient-to-l from-[#2c2217] to-[#473724] shadow-lg transition-transform duration-300"
                    style={{ transform: `perspective(400px) rotateY(-${doorAngle}deg)` }}
                  >
                    <div className="flex h-full flex-col justify-between p-1.5 text-right text-[8px] text-[#d6be96]">
                      <span>Cánh Hữu</span>
                      <span className="font-mono">{doorAngle}°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Sliders */}
            <div className="mt-6 grid grid-cols-1 gap-5 border-t border-[#252629] pt-6 sm:grid-cols-2">
              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#a8a59d]">Độ Mở Cửa Bức Bàn (0° - 90°)</span>
                  <span className="font-mono text-[#d4af37]">{doorAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={doorAngle}
                  onChange={(e) => setDoorAngle(Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#27282b] accent-[#d4af37]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#71706b]">
                  <span>Đóng kín (0°)</span>
                  <span>Mở tối đa (90°)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#a8a59d]">Xoay Bệ Bonsai Sanh (0° - 360°)</span>
                  <span className="font-mono text-[#7ca982]">{bonsaiRotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={bonsaiRotation}
                  onChange={(e) => setBonsaiRotation(Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#27282b] accent-[#7ca982]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#71706b]">
                  <span>Hướng Đông</span>
                  <span>Hướng Tây</span>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Data & Deep Architecture Details (5 cols) */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#2a2b2e] bg-[#141517] p-6 lg:col-span-5">
            {/* Tabs */}
            <div>
              <div className="flex border-b border-[#252629] pb-3">
                {(['architecture', 'microclimate', 'bonsai', 'audio'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1 text-center text-xs tracking-wider transition-colors ${
                      activeTab === tab
                        ? 'border-b-2 border-[#d4af37] font-medium text-[#d4af37]'
                        : 'text-[#87857e] hover:text-[#c4c2bc]'
                    }`}
                  >
                    {tab === 'architecture' && 'KẾT CẤU'}
                    {tab === 'microclimate' && 'VI KHÍ HẬU'}
                    {tab === 'bonsai' && 'BONSAI'}
                    {tab === 'audio' && 'ÂM HỌC'}
                  </button>
                ))}
              </div>

              {/* Tab Content Display */}
              <div className="mt-6 min-h-[260px]">
                <AnimatePresence mode="wait">
                  {activeTab === 'architecture' && (
                    <motion.div
                      key="arch"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-4 text-xs leading-relaxed text-[#bab7af]"
                    >
                      <h3 className="font-serif text-sm font-normal text-[#f0ede6]">
                        Khung Gỗ Gạo Cổ Thụ 290 Năm
                      </h3>
                      <p>
                        Gỗ Gạo rừng cổ thụ (Bombax ceiba) thớ gỗ mềm dẻo nhưng qua hàng trăm năm tôi luyện trở nên đanh chắc, vân mây ấm áp và có khả năng tiêu âm tự nhiên tuyệt hảo.
                      </p>
                      <div className="rounded-lg border border-[#3b3224] bg-[#1c1710] p-3 text-[11px] text-[#e0cfab]">
                        <div className="font-mono text-[#e5c17d]">KỸ THUẬT MỘNG NÊM CỐI CỔ TRUYỀN:</div>
                        <div className="mt-1 text-[#ba9f6e]">
                          Trục cối bằng đồng thau dày dặn bôi trơn bằng mỡ bò truyền thống, giúp cánh cửa xoay êm ái hoàn toàn không gây rung động nền đài.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'microclimate' && (
                    <motion.div
                      key="climate"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-3"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-[#252629] bg-[#191a1d] p-3">
                          <span className="text-[10px] text-[#8e8c85]">Nhiệt độ ngoài trời</span>
                          <div className="mt-1 font-mono text-lg text-[#d28b71]">{metrics.ambientTemp}°C</div>
                        </div>
                        <div className="rounded-lg border border-[#252629] bg-[#191a1d] p-3">
                          <span className="text-[10px] text-[#8e8c85]">Hạ nhiệt nội điện</span>
                          <div className="mt-1 font-mono text-lg text-[#7ca982]">-{metrics.coolingDelta}°C</div>
                        </div>
                        <div className="rounded-lg border border-[#252629] bg-[#191a1d] p-3">
                          <span className="text-[10px] text-[#8e8c85]">Độ ẩm tương đối</span>
                          <div className="mt-1 font-mono text-lg text-[#72a1cf]">{metrics.humidity}% RH</div>
                        </div>
                        <div className="rounded-lg border border-[#252629] bg-[#191a1d] p-3">
                          <span className="text-[10px] text-[#8e8c85]">Tốc độ đối lưu gió</span>
                          <div className="mt-1 font-mono text-lg text-[#d4af37]">{metrics.airflowSpeed} m/s</div>
                        </div>
                      </div>
                      <p className="text-[11px] leading-relaxed text-[#9e9c94]">
                        Hào sen bách diệp và hoa súng ngũ sắc rộng 1.95m bao quanh Thủy Đình tạo màng bốc hơi thu nhiệt liên tục, giữ độ ẩm cân bằng lý tưởng cho bề mặt gỗ Gạo không co ngót dưới nắng hè Sài Gòn.
                      </p>
                    </motion.div>
                  )}

                  {activeTab === 'bonsai' && (
                    <motion.div
                      key="bonsai"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-4 text-xs leading-relaxed text-[#bab7af]"
                    >
                      <h3 className="font-serif text-sm font-normal text-[#f0ede6]">
                        Cổ Thụ Bonsai Sanh Nam Điền 305 Năm
                      </h3>
                      <p>
                        Dáng Thác Đổ Kim Quy với rễ buông ôm đá như móng rồng cắm sâu vào lòng đất, từng tán lá xanh mướt mượt mà như mây bồng bềnh bên mặt nước hào sen.
                      </p>
                      <div className="space-y-1.5 rounded-lg border border-[#282f29] bg-[#131a14] p-3 font-mono text-[11px] text-[#86af8c]">
                        <div>• Thân cây: Lũa da cóc tự nhiên hóa thạch</div>
                        <div>• Bệ đỡ: Gỗ Mun Sừng bách niên chống mối mọt</div>
                        <div>• Tương tác: Bệ bi đĩa xoay 360 độ đón nắng ban mai</div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'audio' && (
                    <motion.div
                      key="audio"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-4 text-xs leading-relaxed text-[#bab7af]"
                    >
                      <h3 className="font-serif text-sm font-normal text-[#f0ede6]">
                        Tần Số Solfeggio 528Hz · Năng Lượng Chữa Lành
                      </h3>
                      <p>
                        528Hz được mệnh danh là tần số của sự chuyển hóa và an yên tâm hồn. Âm sắc được tổng hợp trực tiếp qua bộ tạo dao động thời gian thực của Web Audio API, giúp điều hòa sóng não khi thưởng trà bên hào nước.
                      </p>
                      <div className="rounded-lg border border-[#3b3528] bg-[#1a1712] p-3 text-[11px] text-[#e0bd73]">
                        Trạng thái hiện tại: {audioActive ? 'Đang phát sóng sine 528Hz êm dịu' : 'Tĩnh lặng hoàn toàn'}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom Atelier Commitment */}
            <div className="mt-6 border-t border-[#252629] pt-4 text-[11px] text-[#7a7873]">
              Thiết kế và thi công độc bản bởi GuHomes · Xưởng may đo Thạnh Xuân 1.200m² · Giới hạn 12 công trình/năm.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedGaoBonsaiMoatPavilion
