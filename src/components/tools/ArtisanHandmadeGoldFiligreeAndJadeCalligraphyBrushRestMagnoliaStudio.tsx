"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestMagnoliaStudio() {
  const [brushPlaced, setBrushPlaced] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [selectedAngle, setSelectedAngle] = useState<"front" | "top" | "side">("front");
  const [lightingIntensity, setLightingIntensity] = useState<number>(85);
  const [isPlayingChime, setIsPlayingChime] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playJadeChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Solfeggio Dual Octave Resonance 528Hz + 1056Hz
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(528, ctx.currentTime);
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1056, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 2.8);
      osc2.stop(ctx.currentTime + 2.8);

      setIsPlayingChime(true);
      setTimeout(() => setIsPlayingChime(false), 2800);
    } catch {
      // AudioContext fallback
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <section className="relative w-full bg-[#0b100e] text-[#e6ece7] py-20 px-4 md:px-8 lg:px-16 overflow-hidden border-t border-b border-[#1f2d25]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-[#356149] blur-[130px]" />
        <div className="absolute bottom-1/3 -left-20 w-80 h-80 rounded-full bg-[#7d6832] blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#1f2d25]/80 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#132219] border border-[#253c2e] text-xs font-mono tracking-wider text-[#90b899] mb-4">
              <span>ATELIER THƯ PHÒNG CUNG ĐÌNH</span>
              <span>·</span>
              <span>SPRINT 129</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#f0f6f1] tracking-tight leading-tight">
              Kê Ngự Bút Mộc Lan Cát Tường Phỉ Thúy Nẹp Vàng 24K Filigree
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#9cb2a0] font-light max-w-3xl leading-relaxed">
              Bảo vật thư phòng tạo hình hoa Mộc Lan thanh khiết "Mộc Lan Thanh Nhã" tạc từ ngọc bích Phỉ Thúy Type A Myanmar thấu quang 96.8%, nẹp hoa văn cánh mộc lan bằng sợi vàng 24K Filigree 0.18mm trên bệ gỗ Mun sừng Tây Nguyên 210 năm tuổi.
            </p>
          </div>

          <button
            onClick={playJadeChime}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
              isPlayingChime
                ? "bg-[#90b899] text-[#0b100e] shadow-[0_0_20px_rgba(144,184,153,0.4)]"
                : "bg-[#132018] text-[#c7dace] border border-[#273f30] hover:border-[#90b899]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <span>{isPlayingChime ? "Âm Thể Ngọc Ngân Vang" : "Ngọc Khánh Bát Độ 528Hz & 1056Hz"}</span>
          </button>
        </div>

        {/* Studio Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Workspace (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#0e1612] rounded-sm border border-[#1f2d25] p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
            {/* Translucent Glow */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(85, 155, 110, ${lightingIntensity * 0.0028}) 0%, transparent 75%)`,
              }}
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-[#09100c]/80 border border-[#1f2d25] text-[11px] font-mono text-[#90b899]">
                Phỉ Thúy Type A Myanmar (Thấu quang 96.8%)
              </span>
              <span className="px-2.5 py-1 rounded bg-[#09100c]/80 border border-[#1f2d25] text-[11px] font-mono text-[#cb9b51]">
                Nẹp Vàng 24K Filigree: 0.18mm
              </span>
              <span className="px-2.5 py-1 rounded bg-[#09100c]/80 border border-[#1f2d25] text-[11px] font-mono text-[#c7dace]">
                Bệ Mun Sừng: 210 Năm
              </span>
            </div>

            {/* Central Rest Representation */}
            <div className="relative w-full max-w-md h-72 flex items-center justify-center my-4">
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative flex flex-col items-center"
              >
                {/* Brush Silhouette */}
                <AnimatePresence>
                  {brushPlaced && (
                    <motion.div
                      initial={{ y: -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -35, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute -top-12 z-20 flex flex-col items-center pointer-events-none"
                    >
                      <div className="w-72 h-3.5 bg-gradient-to-r from-[#1b1207] via-[#432e16] to-[#1b1207] rounded-full border border-[#cb9b51]/60 shadow-lg relative flex items-center justify-between px-2">
                        <span className="w-8 h-1 bg-[#cb9b51] rounded-full opacity-70" />
                        <span className="text-[8px] font-mono text-[#cb9b51]">Ngự Bút Hoàng Triều</span>
                        <span className="w-8 h-1 bg-[#cb9b51] rounded-full opacity-70" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Magnolia Rest Body */}
                <div className="relative w-80 h-28 bg-gradient-to-b from-[#355943] via-[#213a2b] to-[#101e16] rounded-t-3xl rounded-b-lg border-2 border-[#5c9172] shadow-[0_10px_30px_rgba(25,38,30,0.7)] flex flex-col items-center justify-between p-3 overflow-hidden">
                  {/* Filigree Wire Accents */}
                  <div className="absolute inset-x-4 top-2 h-1 bg-gradient-to-r from-transparent via-[#cb9b51] to-transparent opacity-80" />
                  <div className="absolute inset-x-6 top-5 flex justify-center gap-4">
                    <span className="w-12 h-0.5 bg-[#cb9b51]/80 rounded" />
                    <span className="text-[9px] font-mono text-[#cb9b51]">Mộc Lan Cát Tường</span>
                    <span className="w-12 h-0.5 bg-[#cb9b51]/80 rounded" />
                  </div>

                  {/* Dual Rest Grooves */}
                  <div className="flex items-center justify-around w-full mt-4 px-6">
                    <div className="w-14 h-4 bg-[#0c1811] rounded-b-xl border border-[#cb9b51]/50 shadow-inner flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#90b899]">Rãnh Âm</span>
                    </div>
                    <div className="w-14 h-4 bg-[#0c1811] rounded-b-xl border border-[#cb9b51]/50 shadow-inner flex items-center justify-center">
                      <span className="text-[8px] font-mono text-[#90b899]">Rãnh Dương</span>
                    </div>
                  </div>

                  {/* Base Stand Mun Sừng */}
                  <div className="w-full h-7 bg-gradient-to-r from-[#110e0b] via-[#221a13] to-[#110e0b] rounded-sm border-t border-[#cb9b51]/40 flex items-center justify-between px-4">
                    <span className="text-[9px] font-serif text-[#d0be9f]">Gỗ Mun Sừng 210 Năm</span>
                    <span className="text-[8px] font-mono text-[#cb9b51]">Mộng Chốt Âm Dương</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Interactive Controls */}
            <div className="w-full mt-4 pt-4 border-t border-[#1f2d25]/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-mono text-[#96ac9b] block mb-1">
                  Độ Rọi Đèn Thấu Quang: {lightingIntensity}%
                </label>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={lightingIntensity}
                  onChange={(e) => setLightingIntensity(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#121c16] rounded appearance-none cursor-pointer accent-[#90b899]"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-[#96ac9b] block mb-1">
                  Mức Thu Phóng Vi Mô: {zoomLevel.toFixed(2)}x
                </label>
                <input
                  type="range"
                  min="1"
                  max="1.35"
                  step="0.05"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#121c16] rounded appearance-none cursor-pointer accent-[#cb9b51]"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => setBrushPlaced(!brushPlaced)}
                  className={`w-full py-2 px-3 rounded-xs text-xs font-mono tracking-wider transition-all duration-200 border ${
                    brushPlaced
                      ? "bg-[#1a2b20] text-[#e6ece7] border-[#375240]"
                      : "bg-[#121d16] text-[#cb9b51] border-[#cb9b51]/60 hover:bg-[#1a2b20]"
                  }`}
                >
                  {brushPlaced ? "Nhấc Ngự Bút Khỏi Giá" : "Gác Ngự Bút Lên Giá"}
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specs & Craftsmanship (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-5 bg-[#0e1612] rounded-sm border border-[#1f2d25] flex flex-col gap-3">
              <span className="text-[11px] font-mono text-[#cb9b51] uppercase tracking-wider">
                Hồ Sơ Kỹ Nghệ Văn Phòng Tứ Bảo
              </span>
              <h3 className="text-xl font-serif text-[#f0f6f1]">
                Điêu Khắc Ngọc Bích & Kéo Sợi Vàng 24K
              </h3>
              <p className="text-xs text-[#a6b8ab] font-light leading-relaxed">
                Từng cánh hoa mộc lan được điêu khắc nổi 3D đa tầng trên khối Ngọc Bích Phỉ Thúy thấu quang 96.8%. Viền cánh bọc chỉ vàng 24K kéo tay đường kính 0.18mm nung dập vi sợi, chống trầy xước quản bút hoàng triều khi đặt gác.
              </p>
              <div className="pt-3 border-t border-[#1f2d25] grid grid-cols-2 gap-2 text-xs font-mono text-[#809485]">
                <div>
                  <span className="text-[#586d5f] block text-[10px]">Độ Dài Giá Kê:</span>
                  <span className="text-[#f0f6f1]">215 mm Chuẩn Lỗ Ban</span>
                </div>
                <div>
                  <span className="text-[#586d5f] block text-[10px]">Góc Thoát Mực:</span>
                  <span className="text-[#cb9b51]">15° Chống Đọng Mực</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#0e1612] rounded-sm border border-[#1f2d25] flex flex-col gap-2">
              <span className="text-[10px] font-mono text-[#90b899] uppercase">
                Bảo Chứng Xưởng Gỗ Thạnh Xuân 1.200m²
              </span>
              <p className="text-xs text-[#a6b8ab] font-light leading-relaxed">
                Bệ đỡ gỗ Mun sừng Tây Nguyên 210 năm tuổi được bào phẳng, ghép mộng chốt ngầm không keo dán công nghiệp, xử lý ngâm sáp ong tự nhiên chống ẩm mốc dưới khí hậu nhiệt đới gió mùa Sài Gòn.
              </p>
            </div>

            {/* Contact Studio Box */}
            <div className="bg-[#0b100d] rounded-sm border border-[#1f2d25] p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-serif text-[#d5e0d7]">Thư Phòng Atelier GuHomes</p>
                <p className="text-[11px] font-mono text-[#64796a]">Tư vấn KTS Trưởng: 0368 757 916</p>
              </div>
              <a
                href="/contact"
                className="px-3.5 py-2 rounded-xs bg-[#17261d] hover:bg-[#223629] text-[#e6ece7] border border-[#304737] text-xs font-mono transition-colors"
              >
                Đặt Lịch Thưởng Lãm
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestMagnoliaStudio;
