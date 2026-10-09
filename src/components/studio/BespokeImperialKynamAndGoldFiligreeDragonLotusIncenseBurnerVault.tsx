"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KynamSpec {
  id: string;
  name: string;
  origin: string;
  oilDensity: number;
  aromaProfile: string;
  idealTemp: number;
}

const KY_NAM_COLLECTION: KynamSpec[] = [
  {
    id: "bach-ky",
    name: "Bạch Kỳ Nam Vạn Giã Hoàng Gia",
    origin: "Rừng nguyên sinh Vạn Giã, Khánh Hòa (Cây Dó Bầu 185 năm)",
    oilDensity: 99.8,
    aromaProfile: "Ngọt thanh sâu lắng, hương hoa lê tuyết thoang thoảng nốt mật ong rừng cổ đại",
    idealTemp: 145,
  },
  {
    id: "hac-ky",
    name: "Hắc Kỳ Nam Vạn Ninh Cổ Mộc",
    origin: "Đại ngàn Vạn Ninh, Khánh Hòa (Trầm tích hóa thạch 210 năm)",
    oilDensity: 99.2,
    aromaProfile: "Trầm ấm quyền quý, vị cay the chuyển ngọt hậu, giữ hương bất biến 72 giờ",
    idealTemp: 165,
  },
  {
    id: "hoang-ky",
    name: "Hoàng Kỳ Nam Hòn Hèo Ngự Phẩm",
    origin: "Vách đá ven biển Hòn Hèo, Khánh Hòa (160 năm)",
    oilDensity: 97.8,
    aromaProfile: "Sắc vàng hổ phách, nốt hổ phách ấm nồng hòa quyện vani tự nhiên và quế chi",
    idealTemp: 135,
  },
  {
    id: "thanh-ky",
    name: "Thanh Kỳ Nam Đại Lãnh Phong Vân",
    origin: "Đèo Cả - Đại Lãnh, Khánh Hòa (150 năm)",
    oilDensity: 96.5,
    aromaProfile: "Sắc xanh ngọc biếc, hương thơm thảo mộc the mát sảng khoái kích hoạt sáng tạo",
    idealTemp: 125,
  },
  {
    id: "huynh-ky",
    name: "Huỳnh Kỳ Nam Cam Ranh Cố Bản",
    origin: "Dải cát trầm tích Ba Ngòi, Cam Ranh (140 năm)",
    oilDensity: 95.8,
    aromaProfile: "Ngọt hậu đậm đà như mật quả chín, êm dịu dẫn dắt giấc ngủ an hòa",
    idealTemp: 155,
  },
];

export function BespokeImperialKynamAndGoldFiligreeDragonLotusIncenseBurnerVault() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KY_NAM_COLLECTION[0]!);
  const [temperature, setTemperature] = useState<number>(145);
  const [isIncensing, setIsIncensing] = useState<boolean>(true);
  const [isPlayingHarmonic, setIsPlayingHarmonic] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playHarmonicResonance = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Solfeggio Dual Resonance 528Hz + 741Hz (Clarity & Spiritual Elevation)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(528, ctx.currentTime);
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(741, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 3.0);
      osc2.stop(ctx.currentTime + 3.0);

      setIsPlayingHarmonic(true);
      setTimeout(() => setIsPlayingHarmonic(false), 3000);
    } catch {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#0a0a09] text-[#ece5d8] overflow-hidden border-t border-[#3a352a]/50">
      {/* Visual Ambiance Backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 right-1/3 w-[500px] h-[500px] bg-[#0077b6]/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title & Philosophy */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-medium tracking-widest uppercase mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            Bảo Thất Hoàng Gia · Xông Trầm Vi Sai
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-light text-[#f5efe6] tracking-tight mb-6"
          >
            Đỉnh Lư Vàng 24K Thần Long Đạp Sen & Ngũ Tuyệt Kỳ Nam
          </motion.h2>

          <p className="text-sm md:text-base text-[#a39a88] leading-relaxed font-light">
            Sự phối hòa đỉnh cao giữa nghệ thuật kim hoàn đan sợi vàng 24K Filigree hình Thần Long Long Đằng Thịnh Thế đạp sen trên án gỗ Cẩm Lai khảm Phỉ Thúy và bộ ngũ tuyệt Kỳ Nam Khánh Hòa trứ danh.
          </p>
        </div>

        {/* Workspace Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Visual Stage */}
          <div className="lg:col-span-8 bg-[#121210] p-6 md:p-10 rounded-2xl border border-[#2b271f] shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#24211a]">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">Bảo Vật Cung Đình</span>
                <span className="text-xs text-[#5c5445]">·</span>
                <span className="text-xs text-[#a39a88]">Nhiệt Độ Xông: {temperature}°C</span>
                <span className="text-xs text-[#5c5445]">·</span>
                <span className="text-xs text-[#d4af37]">Trạng Thái: {isIncensing ? "Đang Tỏa Hương" : "Tĩnh Lặng"}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={playHarmonicResonance}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-2 ${
                    isPlayingHarmonic
                      ? "bg-[#d4af37] text-[#0d0d0c] border-[#d4af37]"
                      : "bg-[#1a1814] text-[#d4af37] border-[#d4af37]/40 hover:bg-[#d4af37]/15"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" />
                  </svg>
                  <span>{isPlayingHarmonic ? "Hòa Âm 528Hz & 741Hz..." : "Chuông Khánh Vàng"}</span>
                </button>

                <button
                  onClick={() => setIsIncensing(!isIncensing)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#242019] text-[#ece5d8] border border-[#3d372c] hover:border-[#d4af37] transition-colors"
                >
                  {isIncensing ? "Ngắt Nhiệt" : "Kích Hoạt Xông"}
                </button>
              </div>
            </div>

            {/* Visualizer Frame */}
            <div className="relative h-88 md:h-96 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181613] via-[#0f0e0c] to-[#0a0a09] border border-[#26221b]">
              {/* Filigree Golden Incense Burner Mockup */}
              <div className="relative flex flex-col items-center justify-center">
                {/* Smoke Trail / Aroma Aura Animation */}
                <AnimatePresence>
                  {isIncensing && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{
                        opacity: [0.3, 0.7, 0.2],
                        y: [-10, -80, -120],
                        scale: [0.9, 1.3, 1.8],
                        filter: ["blur(4px)", "blur(8px)", "blur(12px)"],
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute -top-16 w-16 h-28 bg-gradient-to-t from-[#d4af37]/30 via-[#d4af37]/10 to-transparent rounded-full pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* 24K Gold Filigree Dragon Head / Finial */}
                <motion.div
                  animate={{ y: isIncensing ? [0, -2, 0] : 0 }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="relative z-20 flex flex-col items-center"
                >
                  {/* Dragon Figurine Silhouette */}
                  <div className="w-10 h-10 rounded-full border-2 border-[#d4af37] bg-gradient-to-br from-[#ffd700] via-[#d4af37] to-[#996515] shadow-[0_0_20px_#d4af37] flex items-center justify-center">
                    <span className="text-[8px] font-bold text-[#1a1408]">THẦN LONG</span>
                  </div>
                  <div className="w-1.5 h-3 bg-[#d4af37]" />
                </motion.div>

                {/* Main Lotus Burner Body with Filigree Patterns */}
                <div className="relative z-10 w-48 h-36 rounded-2xl border-2 border-[#d4af37] bg-[#1a1711] shadow-2xl p-3 flex flex-col items-center justify-between">
                  <div className="text-[10px] uppercase font-mono text-[#d4af37] tracking-wider">
                    ĐÀI SEN VÀNG 24K FILIGREE
                  </div>

                  {/* Red Copper Core & Heat Coil */}
                  <div className="relative w-28 h-16 rounded-lg bg-[#2e150d] border border-[#d4af37]/50 flex flex-col items-center justify-center overflow-hidden">
                    <div className="text-[9px] text-[#ff7b00] font-mono">LÕI ĐỒNG ĐỎ 10MM</div>
                    <div className="text-xs font-mono font-bold text-[#d4af37]">{temperature}°C</div>
                    {isIncensing && (
                      <motion.div
                        animate={{ opacity: [0.5, 0.9, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-[#ff3d00]/20 pointer-events-none"
                      />
                    )}
                  </div>

                  <div className="w-full flex justify-between text-[9px] text-[#a39a88]">
                    <span>Sợi Vàng 0.15mm</span>
                    <span>Ruột Đúc 10mm</span>
                  </div>
                </div>

                {/* Antique Cam Lai Base Inlaid With Type A Jade */}
                <div className="relative z-0 -mt-2 w-64 h-12 bg-gradient-to-r from-[#211b15] via-[#14100c] to-[#211b15] border-2 border-[#3d3324] rounded-lg shadow-xl flex items-center justify-around px-4">
                  <span className="text-[9px] text-[#a39a88] tracking-widest">Án Cẩm Lai Bách Niên</span>
                  <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#1b4332] border border-[#52b788] shadow-[0_0_8px_#52b788]" title="Phỉ Thúy Type A Myanmar" />
                  <span className="text-[9px] text-[#52b788] font-mono">CẨN PHỈ THÚY A</span>
                </div>
              </div>

              {/* Scent Density Metric */}
              <div className="absolute bottom-4 left-6 bg-[#14120e]/90 backdrop-blur px-3.5 py-2 rounded-xl border border-[#3d372c] text-left text-xs">
                <div className="text-[10px] text-[#706859] uppercase tracking-wider">Dòng Trầm Ngự</div>
                <div className="font-serif text-[#d4af37] font-semibold">{selectedKynam.name}</div>
                <div className="text-[10px] text-[#a39a88]">Mật độ tinh dầu: {selectedKynam.oilDensity}%</div>
              </div>

              {/* Thermal Status */}
              <div className="absolute top-4 right-6 bg-[#14120e]/90 backdrop-blur px-3.5 py-2 rounded-xl border border-[#3d372c] text-right text-xs">
                <div className="text-[10px] text-[#706859] uppercase tracking-wider">Chuẩn Nhiệt Vi Sai</div>
                <div className="font-mono text-[#f5efe6]">{temperature}°C (Tối ưu: {selectedKynam.idealTemp}°C)</div>
              </div>
            </div>

            {/* Precision Heat Control Slider */}
            <div className="mt-6">
              <div className="flex justify-between text-xs text-[#a39a88] mb-2">
                <span>Bộ Điều Nhiệt Vi Sai Không Khói Khét (80°C - 240°C)</span>
                <span className="text-[#d4af37] font-mono font-medium">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-[#d4af37] cursor-pointer bg-[#24211a] h-1.5 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-[#5c5445] mt-1">
                <span>80°C (Ủ hương tĩnh)</span>
                <span>145°C (Kỳ Nam thăng hoa)</span>
                <span>240°C (Cực hạn khuếch tán)</span>
              </div>
            </div>
          </div>

          {/* Kynam Selection Drawer */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#121210] p-6 rounded-2xl border border-[#2b271f]">
              <h3 className="text-lg font-serif text-[#f5efe6] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                Ngũ Tuyệt Trầm Kỳ Khánh Hòa
              </h3>

              <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                {KY_NAM_COLLECTION.map((kynam) => (
                  <div
                    key={kynam.id}
                    onClick={() => {
                      setSelectedKynam(kynam);
                      setTemperature(kynam.idealTemp);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer text-xs ${
                      selectedKynam.id === kynam.id
                        ? "bg-[#1e1a14] border-[#d4af37] text-[#f5efe6]"
                        : "bg-[#11100e] border-[#221f19] text-[#a39a88] hover:border-[#383328]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-[#d4af37]">{kynam.name}</span>
                      <span className="font-mono text-[10px] text-[#52b788]">{kynam.oilDensity}%</span>
                    </div>
                    <p className="text-[11px] text-[#706859] mb-1">{kynam.origin}</p>
                    <p className="text-[11px] leading-relaxed line-clamp-2">{kynam.aromaProfile}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Atelier Assurance */}
            <div className="bg-gradient-to-br from-[#1a1712] to-[#12100d] p-5 rounded-2xl border border-[#d4af37]/30 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#d4af37] font-serif font-medium uppercase tracking-wider">Đặc Quyền GuHomes</span>
                <span className="text-[10px] text-[#706859]">Giới hạn 12 công trình/năm</span>
              </div>
              <p className="text-[#a39a88] leading-relaxed mb-3">
                Mỗi bảo thất thiền định đều được kiến trúc sư GuHomes đo đạc phong thủy trường khí và lắp đặt hệ thống lọc không khí ion âm độc bản.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#26221b] text-[11px]">
                <span className="text-[#706859]">Hotline KTS Trưởng:</span>
                <a href="tel:0368757916" className="text-[#d4af37] font-medium hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="text-center text-xs text-[#5c5445]">
          Bộ sưu tập Thư Phòng & Bảo Thất Hoàng Gia độc bản · Xưởng chế tác Thạnh Xuân, Quận 12, TP.HCM
        </div>
      </div>
    </section>
  );
}

export default BespokeImperialKynamAndGoldFiligreeDragonLotusIncenseBurnerVault;
