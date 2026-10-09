'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SaigonCanalSideAncientHingedPoMuFlowerMoatPavilion() {
  const [hingeAngle, setHingeAngle] = useState<number>(45)
  const [isWaterFlowing, setIsWaterFlowing] = useState<boolean>(true)
  const [bonsaiRotation, setBonsaiRotation] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'architecture' | 'microclimate' | 'bonsai' | 'audio'>('architecture')
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false)

  const playSolfeggioTone = (freq = 528) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.8)
      setIsPlayingAudio(true)
      setTimeout(() => setIsPlayingAudio(false), 800)
    } catch {
      // Safe audio fallback
    }
  }

  // Calculate microclimate cooling effect
  const coolingDegree = (7.7 * (hingeAngle / 90) * (isWaterFlowing ? 1 : 0.4)).toFixed(1)
  const humidityRegulation = (55 + (hingeAngle / 90) * 8).toFixed(0)

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0d0c0a] text-[#ede8df] overflow-hidden border-t border-[#29231c]">
      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow and Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#2b241c] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1913] border border-[#3d3224] text-[#d4b996] text-xs uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4b996]" />
              Tuyệt Phẩm Thủy Đình Ven Kênh Sài Gòn
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f7f3eb] tracking-tight">
              Thủy Đình Gỗ Pơ-Mu Hào Thủy Sen Bách Niên
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#9c907e] max-w-2xl font-light leading-relaxed">
              Khung chịu lực gỗ Pơ-Mu Tây Bắc 265 năm tuổi vân sáng óng ánh hương thơm ấm áp, cánh trục cối cổ truyền kết hợp hào nước sen hạ nhiệt -7.7°C và bệ xoay Bonsai Mai Chiếu Thủy 285 năm.
            </p>
          </div>

          {/* Navigation tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'architecture', label: 'Cánh Trục Cối' },
              { id: 'microclimate', label: 'Vi Khí Hậu Hào Nước' },
              { id: 'bonsai', label: 'Bonsai Mai Chiếu Thủy' },
              { id: 'audio', label: 'Chuông Thiền 528Hz' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playSolfeggioTone(440)
                  setActiveTab(tab.id as typeof activeTab)
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 border ${
                  activeTab === tab.id
                    ? 'bg-[#c5a880] text-[#14120f] border-[#c5a880] shadow-md'
                    : 'bg-[#181410] text-[#a19483] border-[#2e261e] hover:border-[#4d3f31] hover:text-[#ebe4d8]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Main Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual simulation card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#3b3124] bg-gradient-to-br from-[#1c1813] via-[#14120e] to-[#0c0a08] shadow-2xl p-6 flex flex-col justify-between">
              {/* Top status bar */}
              <div className="flex items-center justify-between z-10">
                <span className="text-xs px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-[#443828] text-[#c5a880] font-mono">
                  Góc mở trục cối: {hingeAngle}°
                </span>
                <span className="text-xs px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-[#443828] text-[#9fc299] font-mono">
                  Hạ nhiệt: -{coolingDegree}°C
                </span>
              </div>

              {/* Graphic Representation */}
              <div className="relative flex-1 flex items-center justify-center my-6">
                {/* Moat Water ripple effect */}
                <div className={`absolute inset-x-8 bottom-0 h-16 rounded-xl bg-gradient-to-t from-[#1b2b2b]/50 to-transparent border-b border-[#2d4745] flex items-center justify-center ${isWaterFlowing ? 'animate-pulse' : ''}`}>
                  <span className="text-[11px] text-[#5e8c88] tracking-widest uppercase">
                    Hào Thủy Sen Bách Diệp {isWaterFlowing ? '· Nước Tuần Hoàn' : '· Tĩnh Thủy'}
                  </span>
                </div>

                {/* Hinged Doors Graphic */}
                <div className="relative w-64 h-48 flex items-center justify-center">
                  {/* Left door */}
                  <motion.div
                    animate={{ rotateY: -hingeAngle }}
                    style={{ transformOrigin: 'left center' }}
                    className="w-24 h-40 rounded-lg bg-gradient-to-r from-[#4d361f] to-[#332314] border-2 border-[#785433] shadow-2xl flex flex-col justify-around p-2"
                  >
                    <div className="w-full h-1 bg-[#8f643e]/40 rounded" />
                    <div className="w-full h-1 bg-[#8f643e]/40 rounded" />
                    <div className="w-full h-1 bg-[#8f643e]/40 rounded" />
                    <span className="text-[9px] text-[#b88e65] text-center font-mono">Pơ-Mu</span>
                  </motion.div>

                  {/* Central bonsai rotated */}
                  <motion.div
                    animate={{ rotate: bonsaiRotation }}
                    className="w-20 h-20 mx-2 rounded-full border border-[#806443] bg-[#211a13] flex items-center justify-center shadow-inner cursor-pointer"
                    onClick={() => {
                      playSolfeggioTone(639)
                      setBonsaiRotation((prev) => (prev + 45) % 360)
                    }}
                    title="Bấm để xoay bệ Bonsai Mai Chiếu Thủy 360°"
                  >
                    <span className="text-xl">🌸</span>
                  </motion.div>

                  {/* Right door */}
                  <motion.div
                    animate={{ rotateY: hingeAngle }}
                    style={{ transformOrigin: 'right center' }}
                    className="w-24 h-40 rounded-lg bg-gradient-to-l from-[#4d361f] to-[#332314] border-2 border-[#785433] shadow-2xl flex flex-col justify-around p-2"
                  >
                    <div className="w-full h-1 bg-[#8f643e]/40 rounded" />
                    <div className="w-full h-1 bg-[#8f643e]/40 rounded" />
                    <div className="w-full h-1 bg-[#8f643e]/40 rounded" />
                    <span className="text-[9px] text-[#b88e65] text-center font-mono">Trục Cối</span>
                  </motion.div>
                </div>
              </div>

              {/* Bottom Interactive Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 z-10">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#a19584]">
                    <span>Góc mở cánh cửa: {hingeAngle}°</span>
                    <span>0° - 90°</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={hingeAngle}
                    onChange={(e) => setHingeAngle(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#29221a] rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsWaterFlowing(!isWaterFlowing)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      isWaterFlowing
                        ? 'bg-[#1b2f2d] text-[#9bd4ce] border-[#365956]'
                        : 'bg-[#1e1a14] text-[#807464] border-[#382f23]'
                    }`}
                  >
                    {isWaterFlowing ? 'Tuần Hoàn Nước: BẬT' : 'Tuần Hoàn Nước: TẮT'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playSolfeggioTone(528)
                      setBonsaiRotation((prev) => (prev + 45) % 360)
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#241d16] hover:bg-[#332a20] border border-[#443727] text-[#d4b996] transition-colors"
                  >
                    Xoay Bonsai ({bonsaiRotation}°)
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e261c] text-center">
                <p className="text-[11px] text-[#807565] uppercase">Niên đại gỗ</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">Pơ-Mu 265 Năm</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e261c] text-center">
                <p className="text-[11px] text-[#807565] uppercase">Tinh dầu tự nhiên</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">Hương thơm nồng ấm</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e261c] text-center">
                <p className="text-[11px] text-[#807565] uppercase">Cân bằng ẩm</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">{humidityRegulation}% RH</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e261c] text-center">
                <p className="text-[11px] text-[#807565] uppercase">Bonsai Mai</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">285 Năm Thác Đổ</p>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'architecture' && (
                <motion.div
                  key="arch"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-serif text-[#f5f0e6]">
                    Kết Cấu Trục Cối Mộng Gỗ Cổ Truyền
                  </h3>
                  <p className="text-xs sm:text-sm text-[#beb3a2] font-light leading-relaxed">
                    Hệ cánh cửa bức bàn sử dụng gỗ Pơ-Mu Tây Bắc (Fokienia hodginsii) 265 năm tuổi thớ mịn màng, vân gỗ sáng màu cánh gián ánh vàng, tỏa hương thơm ấm áp xua tan cái ẩm ướt của mùa mưa TP.HCM. Khớp quay cối âm dương chế tác hoàn toàn từ gỗ và đồng đỏ nguyên khối, xoay mở êm ả không tiếng ồn.
                  </p>
                  <div className="p-4 rounded-xl bg-[#181410] border border-[#33291d] space-y-2 text-xs">
                    <p className="text-[#c5a880] font-medium font-serif">Đặc tính kỹ thuật gỗ Pơ-Mu:</p>
                    <ul className="space-y-1 text-[#a39785]">
                      <li>• Tinh dầu Pơ-Mu tự nhiên chống mối mọt và xua đuổi côn trùng hiệu quả.</li>
                      <li>• Trọng lượng nhẹ nhưng liên kết sợi cực kỳ đanh dẻo, không cong vênh.</li>
                      <li>• Thích ứng tuyệt đối với độ ẩm nhiệt đới TP.HCM 80% - 90% RH.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'microclimate' && (
                <motion.div
                  key="climate"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-serif text-[#f5f0e6]">
                    Hào Thủy Sen Bách Diệp & Giải Nhiệt Tự Nhiên
                  </h3>
                  <p className="text-xs sm:text-sm text-[#beb3a2] font-light leading-relaxed">
                    Hào nước bằng đá phiến xanh bao bọc chu vi Thủy Đình với mực nước sâu 45cm, trồng sen bách diệp và hoa súng trắng. Dòng nước được lọc ngầm tuần hoàn liên tục kết hợp hơi ẩm bốc lên đón ngọn gió sông Sài Gòn giúp làm mát không gian nội thất từ -5.5°C đến -7.7°C mà không cần điều hòa công nghiệp.
                  </p>
                  <div className="p-4 rounded-xl bg-[#151c1c] border border-[#2d4745] space-y-2 text-xs">
                    <p className="text-[#9fc299] font-medium font-serif">Chỉ số vi khí hậu đạt chuẩn:</p>
                    <ul className="space-y-1 text-[#8ab3af]">
                      <li>• Giảm nhiệt độ không gian: -{coolingDegree}°C tức thời.</li>
                      <li>• Độ ẩm vi mô duy trì lý tưởng: {humidityRegulation}% RH.</li>
                      <li>• Nước tuần hoàn qua bể lọc cát thạch anh và than hoạt tính.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'bonsai' && (
                <motion.div
                  key="bonsai-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-serif text-[#f5f0e6]">
                    Bonsai Mai Chiếu Thủy 285 Năm Dáng Thác Đổ
                  </h3>
                  <p className="text-xs sm:text-sm text-[#beb3a2] font-light leading-relaxed">
                    Tác phẩm Bonsai Mai Chiếu Thủy (Wrightia religiosa) 285 năm tuổi rễ cuộn nghinh phong, hoa nở từng chùm trắng thơm thanh tao soi bóng mặt nước. Đặt trên bệ xoay gỗ Cẩm Lai bách niên cho phép gia chủ thưởng lãm trọn vẹn 360 độ từ mọi vị trí trà tọa.
                  </p>
                  <div className="p-4 rounded-xl bg-[#1c1813] border border-[#3d3224] space-y-2 text-xs">
                    <p className="text-[#c5a880] font-medium font-serif">Quy cách bệ xoay thủ công:</p>
                    <ul className="space-y-1 text-[#a89c8a]">
                      <li>• Gỗ Cẩm Lai Nam Bộ 235 năm tuổi đánh bóng sáp ong hữu cơ.</li>
                      <li>• Trục xoay bi gốm Ceramic không rỉ sét trong môi trường ẩm ven sông.</li>
                      <li>• Điều chỉnh góc nhìn linh hoạt từ 0° đến 360° theo sở thích gia chủ.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'audio' && (
                <motion.div
                  key="audio-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-serif text-[#f5f0e6]">
                    Hòa Âm Thiền Trà Tần Số Solfeggio 528Hz
                  </h3>
                  <p className="text-xs sm:text-sm text-[#beb3a2] font-light leading-relaxed">
                    Âm thoa tần số Solfeggio 528Hz (tần số biến đổi và tái tạo năng lượng) được tích hợp trực tiếp qua bộ tổng hợp Web Audio API. Mỗi khi gia chủ mở cánh cửa bức bàn hoặc thưởng lãm tách trà sen, âm thanh thanh khiết vang vọng giúp xua tan âu lo và mang lại sự an yên sâu thẳm.
                  </p>
                  <div className="p-4 rounded-xl bg-[#211a14] border border-[#443525] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#c5a880] font-medium font-serif">Bộ phát thanh âm 528Hz</p>
                      <p className="text-[11px] text-[#948877]">Sóng âm hài hòa kích hoạt trạng thái Alpha</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => playSolfeggioTone(528)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        isPlayingAudio
                          ? 'bg-[#c5a880] text-[#14120f] shadow-lg scale-95'
                          : 'bg-[#2e241a] text-[#f0ece3] border border-[#54422e] hover:border-[#c5a880]'
                      }`}
                    >
                      {isPlayingAudio ? 'Đang Ngân Vang...' : 'Thỉnh Chuông 528Hz'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct hotline connection */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#1c1813] to-[#14110d] border border-[#3b3022] flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
              <div>
                <p className="text-xs text-[#c5a880] font-serif font-medium">May đo Thủy Đình & Đình Trà GuHomes</p>
                <p className="text-[11px] text-[#8a7f70]">Xưởng mộc Thạnh Xuân 1.200m² · Giới hạn 12 công trình/năm</p>
              </div>
              <a
                href="tel:0368757916"
                className="px-4 py-2 rounded-lg bg-[#c5a880] hover:bg-[#d6bc98] text-[#14120f] text-xs font-medium text-center transition-all shadow-sm"
              >
                Hotline KTS: 0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonCanalSideAncientHingedPoMuFlowerMoatPavilion
