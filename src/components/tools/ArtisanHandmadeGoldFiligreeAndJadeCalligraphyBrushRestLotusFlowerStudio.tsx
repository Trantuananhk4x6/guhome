'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusFlowerStudio() {
  const [isBrushPlaced, setIsBrushPlaced] = useState<boolean>(true)
  const [zoomLevel, setZoomLevel] = useState<number>(1)
  const [translucency, setTranslucency] = useState<number>(98)
  const [activeTab, setActiveTab] = useState<'craft' | 'jade' | 'wood' | 'chime'>('craft')
  const [isChimeActive, setIsChimeActive] = useState<boolean>(false)

  const playJadeHarmonicTone = (freq1 = 528, freq2 = 1056) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()

      // Fundamental tone
      const osc1 = ctx.createOscillator()
      const gain1 = ctx.createGain()
      osc1.type = 'sine'
      osc1.frequency.setValueAtTime(freq1, ctx.currentTime)
      gain1.gain.setValueAtTime(0.05, ctx.currentTime)
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0)
      osc1.connect(gain1)
      gain1.connect(ctx.destination)
      osc1.start()
      osc1.stop(ctx.currentTime + 1.0)

      // Octave harmonic
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.type = 'sine'
      osc2.frequency.setValueAtTime(freq2, ctx.currentTime)
      gain2.gain.setValueAtTime(0.03, ctx.currentTime)
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2)
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.start()
      osc2.stop(ctx.currentTime + 1.2)

      setIsChimeActive(true)
      setTimeout(() => setIsChimeActive(false), 1000)
    } catch {
      // Audio safe fallback
    }
  }

  const handleToggleBrush = () => {
    playJadeHarmonicTone(isBrushPlaced ? 440 : 528, isBrushPlaced ? 880 : 1056)
    setIsBrushPlaced(!isBrushPlaced)
  }

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a09] text-[#e8e3da] overflow-hidden border-t border-[#26211a]">
      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow and Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#26211a] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1813] border border-[#3b2f21] text-[#c5a880] text-xs uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
              Atelier Thư Phòng Hoàng Gia GuHomes
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f5f0e6] tracking-tight">
              Kê Ngự Bút Hình Đài Sen Nở Rộ Phỉ Thúy Nẹp Vàng 24K Filigree
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#9c907e] max-w-2xl font-light leading-relaxed">
              Tác phẩm "Bảo Liên Khai Hoa" dài 228mm chạm tạc từ nguyên khối Ngọc Bích Phỉ Thúy Type A Myanmar thấu quang 98.0%, nẹp chỉ vàng 24K Filigree 0.18mm và bệ Mun hoa Khánh Hòa 235 năm.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'craft', label: 'Kim Hoàn Filigree' },
              { id: 'jade', label: 'Phỉ Thúy Type A' },
              { id: 'wood', label: 'Bệ Mun Hoa 235 Năm' },
              { id: 'chime', label: 'Hòa Âm Bát Độ' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playJadeHarmonicTone(440, 880)
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

        {/* Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Showcase Card */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#3b3021] bg-gradient-to-br from-[#1a1712] via-[#12100d] to-[#0a0807] shadow-2xl p-6 flex flex-col justify-between">
              {/* Header Status */}
              <div className="flex items-center justify-between z-10">
                <span className="text-xs px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-[#423524] text-[#c5a880] font-mono">
                  Độ thấu quang: {translucency}%
                </span>
                <span className="text-xs px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-[#423524] text-[#9fc299] font-mono">
                  Trạng thái: {isBrushPlaced ? 'Đang Gác Ngự Bút' : 'Nhấc Bút Thư Họa'}
                </span>
              </div>

              {/* Visual Model Interaction */}
              <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
                <motion.div
                  animate={{ scale: zoomLevel }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="relative flex flex-col items-center cursor-pointer"
                  onClick={handleToggleBrush}
                  title="Bấm để Gác / Nhấc Ngự Bút"
                >
                  {/* Floating Brush Animation */}
                  <motion.div
                    animate={{
                      y: isBrushPlaced ? 0 : -32,
                      rotate: isBrushPlaced ? 0 : -6,
                    }}
                    transition={{ duration: 0.4 }}
                    className="relative z-20 flex flex-col items-center"
                  >
                    <div className="w-2.5 h-36 bg-gradient-to-b from-[#211b15] via-[#4d3725] to-[#c5a880] rounded-full shadow-xl border border-[#7a5e3f] flex items-center justify-center">
                      <span className="text-[7px] text-[#f2ede4] -rotate-90 font-mono tracking-wider">NGỰ BÚT</span>
                    </div>
                    {/* Brush Hair Tip */}
                    <div className="w-2 h-6 bg-gradient-to-b from-[#1c1815] to-[#0a0908] rounded-b-full shadow-inner" />
                  </motion.div>

                  {/* Lotus Flower Brush Rest Body */}
                  <div
                    style={{ opacity: translucency / 100 }}
                    className="relative z-10 -mt-2 w-52 h-20 rounded-2xl bg-gradient-to-r from-[#2a4d45] via-[#46786c] to-[#2a4d45] border-2 border-[#c5a880] shadow-2xl flex items-center justify-around px-4"
                  >
                    {/* 9 Petals Filigree simulation */}
                    <div className="w-6 h-8 rounded-full border border-[#f0d6a8] bg-[#3a665b]/40 rotate-[-20deg]" />
                    <div className="w-6 h-10 rounded-full border border-[#f0d6a8] bg-[#3a665b]/40 rotate-[-10deg]" />
                    <div className="w-7 h-12 rounded-full border-2 border-[#f0d6a8] bg-[#4f8a7c]/60 flex items-center justify-center shadow-lg">
                      <span className="text-[8px] text-[#f5ebd3]">98%</span>
                    </div>
                    <div className="w-6 h-10 rounded-full border border-[#f0d6a8] bg-[#3a665b]/40 rotate-[10deg]" />
                    <div className="w-6 h-8 rounded-full border border-[#f0d6a8] bg-[#3a665b]/40 rotate-[20deg]" />
                  </div>

                  {/* Ebony Wood Stand */}
                  <div className="w-60 h-4 bg-gradient-to-r from-[#171410] via-[#2d251d] to-[#171410] rounded-b-xl border-t border-[#544330] shadow-xl mt-0.5" />
                </motion.div>
              </div>

              {/* Controls Toolbar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 z-10 pt-2 border-t border-[#261f18]">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-[#9c8e7c]">
                    <span>Độ thấu quang ngọc: {translucency}%</span>
                    <span>30% - 100%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={translucency}
                    onChange={(e) => setTranslucency(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#261f18] rounded-lg appearance-none cursor-pointer accent-[#c5a880]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((prev) => (prev === 1 ? 1.3 : 1))}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1e1913] hover:bg-[#2b231a] border border-[#382d20] text-[#c5a880] transition-colors"
                  >
                    Kính Lúp: {zoomLevel}x
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleBrush}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#c5a880] hover:bg-[#d6bc98] text-[#14120f] transition-all shadow-sm"
                  >
                    {isBrushPlaced ? 'Nhấc Bút' : 'Gác Bút'}
                  </button>
                  <button
                    type="button"
                    onClick={() => playJadeHarmonicTone(528, 1056)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#211a14] hover:bg-[#2e241c] border border-[#3d3021] text-[#d4b996] transition-colors"
                  >
                    {isChimeActive ? 'Âm Bát Độ...' : 'Thỉnh Âm 528Hz'}
                  </button>
                </div>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e251b] text-center">
                <p className="text-[11px] text-[#807463] uppercase">Chiều dài ngọc</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">228 mm nguyên khối</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e251b] text-center">
                <p className="text-[11px] text-[#807463] uppercase">Sợi vàng Filigree</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">0.18 mm đan tay</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e251b] text-center">
                <p className="text-[11px] text-[#807463] uppercase">Bệ gỗ đỡ</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">Mun Hoa 235 Năm</p>
              </div>
              <div className="p-3 rounded-xl bg-[#171410] border border-[#2e251b] text-center">
                <p className="text-[11px] text-[#807463] uppercase">Dốc thoát mực</p>
                <p className="text-xs font-serif text-[#f2eee6] mt-1 font-medium">Góc nghiêng 15°</p>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'craft' && (
                <motion.div
                  key="craft"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-serif text-[#f5f0e6]">
                    Nghệ Thuật Kim Hoàn Filigree 9 Cánh Sen
                  </h3>
                  <p className="text-xs sm:text-sm text-[#beb3a2] font-light leading-relaxed">
                    Mỗi cánh hoa sen được viền bằng sợi vàng ròng 24K mảnh mai 0.18mm đan xoắn theo cấu trúc màng lưới tổ ong vi mô. Kỹ thuật đậu bạc truyền thống kết hợp vàng hoàng gia giúp giữ cố định phiến ngọc mà không cần bất kỳ keo dán công nghiệp nào, bảo tồn trọn vẹn tinh hoa ngọc thạch thiên nhiên.
                  </p>
                  <div className="p-4 rounded-xl bg-[#181410] border border-[#33291d] space-y-2 text-xs">
                    <p className="text-[#c5a880] font-medium font-serif">Kỹ nghệ chế tác vi mô:</p>
                    <ul className="space-y-1 text-[#a39785]">
                      <li>• 9 cánh hoa sen tượng trưng cho sự trường cửu và thanh cao tuyệt đối.</li>
                      <li>• Rãnh ngự bút âm dương kép với độ dốc thoát mực 15° bảo vệ đầu lông bút.</li>
                      <li>• Thời gian hoàn thiện thủ công: 240 giờ làm việc liên tục của nghệ nhân kim hoàn.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'jade' && (
                <motion.div
                  key="jade-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-serif text-[#f5f0e6]">
                    Ngọc Bích Phỉ Thúy Type A Myanmar
                  </h3>
                  <p className="text-xs sm:text-sm text-[#beb3a2] font-light leading-relaxed">
                    Tuyển chọn từ khối Phỉ Thúy thượng hạng mỏ ngọc cổ Phakant (Myanmar), không qua bất kỳ xử lý nhiệt hay tẩm hóa chất. Chất ngọc băng chủng trong suốt đạt độ thấu quang 98.0%, màu lục bảo biếc như nước hồ thu mang lại cảm giác mát lạnh tức thì khi chạm tay.
                  </p>
                  <div className="p-4 rounded-xl bg-[#141d1a] border border-[#284239] space-y-2 text-xs">
                    <p className="text-[#9fc299] font-medium font-serif">Chứng thư giám định bảo vật:</p>
                    <ul className="space-y-1 text-[#83ada3]">
                      <li>• Phân hạng: Natural Jadeite Type A 100% tự nhiên.</li>
                      <li>• Độ cứng Mohs: 6.5 - 7.0 chống trầy xước vĩnh cửu.</li>
                      <li>• Năng lượng từ trường ngọc thạch giúp an định tâm trí khi chấp bút thư họa.</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'wood' && (
                <motion.div
                  key="wood-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-serif text-[#f5f0e6]">
                    Bệ Gỗ Mun Hoa Khánh Hòa 235 Năm Tuổi
                  </h3>
                  <p className="text-xs sm:text-sm text-[#beb3a2] font-light leading-relaxed">
                    Bệ đỡ được tiện mộng âm dương từ lõi gỗ Mun Hoa cổ thụ Khánh Hòa 235 năm tuổi. Vân gỗ sọc đen ánh cẩm thạch huyền bí, tỷ trọng đanh chắc 1.28g/cm³ chìm hoàn toàn trong nước, được đánh bóng tỉ mỉ bằng sáp ong rừng nguyên chất thích ứng hoàn hảo độ ẩm nhiệt đới TP.HCM 80% - 90% RH.
                  </p>
                  <div className="p-4 rounded-xl bg-[#1c1813] border border-[#3b2f21] space-y-2 text-xs">
                    <p className="text-[#c5a880] font-medium font-serif">Kỹ thuật mộc cung đình:</p>
                    <ul className="space-y-1 text-[#a69988]">
                      <li>• Đục ngàm ôm trọn đáy ngọc thạch chống va đập tuyệt đối.</li>
                      <li>• Không cong vênh hay biến dạng trước thời tiết thay đổi mùa Sài Gòn.</li>
                      <li>• Xử lý hoàn thiện tại xưởng may đo Thạnh Xuân 1.200m².</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {activeTab === 'chime' && (
                <motion.div
                  key="chime-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-serif text-[#f5f0e6]">
                    Hòa Âm Bát Độ Solfeggio 528Hz & 1056Hz
                  </h3>
                  <p className="text-xs sm:text-sm text-[#beb3a2] font-light leading-relaxed">
                    Sự cộng hưởng giữa âm thanh nguyên bản của ngọc bích Phỉ Thúy gõ nhịp và dải tần số Solfeggio 528Hz (tần số tái tạo tế bào) cùng quãng tám 1056Hz tạo nên không gian thanh tịnh tuyệt đối, kích hoạt dòng cảm hứng sáng tạo vô tận cho gia chủ trong thư phòng.
                  </p>
                  <div className="p-4 rounded-xl bg-[#211a14] border border-[#443525] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#c5a880] font-medium font-serif">Bộ phát hòa âm bát độ</p>
                      <p className="text-[11px] text-[#948877]">Sóng âm hài hòa kích hoạt trạng thái tập trung sâu</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => playJadeHarmonicTone(528, 1056)}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        isChimeActive
                          ? 'bg-[#c5a880] text-[#14120f] shadow-lg scale-95'
                          : 'bg-[#2e241a] text-[#f0ece3] border border-[#54422e] hover:border-[#c5a880]'
                      }`}
                    >
                      {isChimeActive ? 'Đang Ngân Vang...' : 'Thỉnh Chuông 528Hz'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Direct atelier hotline */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#1c1813] to-[#14110d] border border-[#3b3022] flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4">
              <div>
                <p className="text-xs text-[#c5a880] font-serif font-medium">Atelier thư phòng GuHomes</p>
                <p className="text-[11px] text-[#8a7f70]">Thiết kế thư phòng & nội thất may đo báu vật</p>
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

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusFlowerStudio
