"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BrushRestProps {
  brushPlaced: boolean;
  zoomLevel: number;
  selectedAngle: "front" | "top" | "side";
  lightingIntensity: number;
}

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestRuyiStudio() {
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
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#0c0c0b] text-[#ece5d8] overflow-hidden border-t border-[#332e24]">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-[520px] h-[520px] bg-[#2d6a4f]/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[460px] h-[460px] bg-[#d4af37]/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2d6a4f]/20 border border-[#52b788]/40 text-[#52b788] text-xs font-medium tracking-widest uppercase mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#52b788]" />
            Thư Phòng Cung Đình · Kỹ Nghệ Ngự Bút
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-light text-[#f5efe6] tracking-tight mb-6"
          >
            Kê Ngự Bút Như Ý Cát Tường Phỉ Thúy Nẹp Vàng 24K
          </motion.h2>

          <p className="text-sm md:text-base text-[#a39a88] leading-relaxed font-light">
            Tuyệt phẩm khí cụ thư phòng tạc từ nguyên khối Ngọc Bích Phỉ Thúy Type A Myanmar thấu quang 95.2%, nẹp sợi vàng 24K Filigree hình Như Ý uyển chuyển ngự trên bệ gỗ Mun sừng Khánh Hòa 175 năm.
          </p>
        </div>

        {/* Interactive Studio Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Visualizer */}
          <div className="lg:col-span-8 bg-[#141310] p-6 md:p-10 rounded-2xl border border-[#2c2820] shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#24211a]">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">Tương Tác Thư Phòng</span>
                <span className="text-xs text-[#524b3d]">·</span>
                <span className="text-xs text-[#a39a88]">Thu phóng: {zoomLevel.toFixed(2)}x</span>
                <span className="text-xs text-[#524b3d]">·</span>
                <span className="text-xs text-[#52b788]">Góc nhìn: {selectedAngle.toUpperCase()}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={playJadeChime}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-2 ${
                    isPlayingChime
                      ? "bg-[#52b788] text-[#0d0d0c] border-[#52b788]"
                      : "bg-[#181d19] text-[#52b788] border-[#52b788]/40 hover:bg-[#52b788]/20"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                  </svg>
                  <span>{isPlayingChime ? "Âm Thanh Ngọc Khánh 528Hz..." : "Ngân Ngọc Khánh"}</span>
                </button>

                <button
                  onClick={() => setBrushPlaced(!brushPlaced)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1e1c17] text-[#ece5d8] border border-[#3b3427] hover:border-[#d4af37] transition-colors"
                >
                  {brushPlaced ? "Nhấc Ngự Bút" : "Gác Ngự Bút"}
                </button>
              </div>
            </div>

            {/* Display Viewport */}
            <div className="relative h-88 md:h-96 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#181713] via-[#100f0c] to-[#0a0a09] border border-[#26221a]">
              {/* Studio Desk Surface - Antique Ebony Texture */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0e0c0a] via-[#1a1713]/80 to-transparent flex items-center justify-center">
                <span className="text-[10px] text-[#5c5443] tracking-widest uppercase">Mặt Bàn Gỗ Mun Sừng Đánh Sáp Ong Tự Nhiên</span>
              </div>

              {/* Dynamic Zoomed Brush Rest Mockup */}
              <motion.div
                animate={{ scale: zoomLevel }}
                transition={{ type: "spring", stiffness: 100, damping: 18 }}
                className="relative z-10 flex flex-col items-center justify-center"
              >
                {/* Imperial Rabbit Hair Brush Model */}
                <AnimatePresence>
                  {brushPlaced && (
                    <motion.div
                      initial={{ opacity: 0, y: -45, rotate: -3 }}
                      animate={{ opacity: 1, y: 0, rotate: -2 }}
                      exit={{ opacity: 0, y: -45, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 120, damping: 15 }}
                      className="absolute -top-10 z-30 w-72 flex items-center justify-between pointer-events-none"
                    >
                      {/* Brush Handle */}
                      <div className="w-52 h-3.5 bg-gradient-to-r from-[#2c1d11] via-[#4a321e] to-[#2c1d11] rounded-l-full border border-[#d4af37]/60 shadow-lg flex items-center px-3">
                        <span className="text-[7px] text-[#d4af37] font-serif">NGỰ BÚT LÔNG THỎ HOÀNG GIA</span>
                      </div>
                      {/* Gold Ferrule & Bristle Tip */}
                      <div className="w-5 h-4 bg-[#d4af37] rounded-sm shadow-md" />
                      <div className="w-14 h-5 bg-gradient-to-r from-[#e5e5e5] via-[#8d8d8d] to-[#1a1a1a] rounded-r-full shadow-lg" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Type A Jadeite Ruyi Scepter Body */}
                <div
                  className="relative z-20 w-80 h-16 rounded-full border-2 border-[#52b788] shadow-2xl flex items-center justify-between px-6 transition-all"
                  style={{
                    background: `linear-gradient(135deg, rgba(45, 106, 79, ${lightingIntensity / 100}), rgba(82, 183, 136, ${lightingIntensity / 120}))`,
                    boxShadow: `0 0 25px rgba(82, 183, 136, ${lightingIntensity / 250})`,
                  }}
                >
                  {/* Left Ruyi Cloud Head */}
                  <div className="flex items-center gap-1">
                    <div className="w-9 h-9 rounded-full border border-[#ffd700] bg-[#1b4332] flex items-center justify-center shadow-inner">
                      <span className="text-[8px] text-[#ffd700] font-bold">NHƯ Ý</span>
                    </div>
                  </div>

                  {/* Dual Rest Grooves for Calligraphy Brushes */}
                  <div className="flex items-center gap-12">
                    <div className="w-9 h-3.5 bg-[#0b291d] rounded-b-lg border-b-2 border-x-2 border-[#ffd700]/70 flex items-center justify-center">
                      <span className="text-[7px] text-[#d4af37]">RÃNH 1</span>
                    </div>
                    <div className="w-9 h-3.5 bg-[#0b291d] rounded-b-lg border-b-2 border-x-2 border-[#ffd700]/70 flex items-center justify-center">
                      <span className="text-[7px] text-[#d4af37]">RÃNH 2</span>
                    </div>
                  </div>

                  {/* Right Scepter Tail with 24K Filigree Border */}
                  <div className="w-6 h-6 rounded-full border border-[#ffd700] bg-[#1b4332] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#ffd700]" />
                  </div>

                  {/* 24K Gold Filigree Inlay Details */}
                  <div className="absolute inset-x-8 top-1.5 h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-80" />
                  <div className="absolute inset-x-8 bottom-1.5 h-0.5 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-80" />
                </div>

                {/* Ancient Mun Sung Wood Base */}
                <div className="relative z-10 -mt-2 w-88 h-10 bg-gradient-to-r from-[#171410] via-[#0d0c0a] to-[#171410] border border-[#3b3425] rounded-lg shadow-xl flex items-center justify-between px-6">
                  <span className="text-[8px] text-[#a39a88] tracking-widest font-mono">BỆ MUN SỪNG KHÁNH HÒA 175 NĂM</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffd700]" />
                    <span className="text-[8px] text-[#d4af37]">KHỚP MỘNG ÂM DƯƠNG</span>
                  </div>
                </div>
              </motion.div>

              {/* Jade Light Transmittance Badge */}
              <div className="absolute top-4 left-6 bg-[#12110e]/90 backdrop-blur px-3 py-1.5 rounded-xl border border-[#2b271e] text-left text-xs">
                <div className="text-[9px] text-[#706859] uppercase tracking-wider">Độ Thấu Quang</div>
                <div className="font-mono text-[#52b788] font-bold">95.2% Type A Jadeite</div>
              </div>

              {/* Status Badge */}
              <div className="absolute bottom-4 right-6 bg-[#12110e]/90 backdrop-blur px-3.5 py-2 rounded-xl border border-[#2b271e] text-right text-xs">
                <div className="text-[9px] text-[#706859] uppercase tracking-wider">Trạng Thái Bút</div>
                <div className="font-serif text-[#d4af37] font-semibold">
                  {brushPlaced ? "Đã Gác Ngự Bút (Góc Nghiêng 15°)" : "Ngự Bút Đang Xuất Bút"}
                </div>
              </div>
            </div>

            {/* Microscopic Zoom & Lighting Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div>
                <div className="flex justify-between text-xs text-[#a39a88] mb-2">
                  <span>Thu Phóng Vi Mô Kỹ Nghệ Filigree</span>
                  <span className="text-[#d4af37] font-mono font-medium">{zoomLevel.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="1.35"
                  step="0.05"
                  value={zoomLevel}
                  onChange={(e) => setZoomLevel(Number(e.target.value))}
                  className="w-full accent-[#d4af37] cursor-pointer bg-[#242019] h-1.5 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-[#5c5443] mt-1">
                  <span>1.0x (Toàn Cảnh)</span>
                  <span>1.18x (Chi Tiết Mộng)</span>
                  <span>1.35x (Sợi Vàng 0.18mm)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#a39a88] mb-2">
                  <span>Cường Độ Ánh Sáng Thấu Quang</span>
                  <span className="text-[#52b788] font-mono font-medium">{lightingIntensity}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={lightingIntensity}
                  onChange={(e) => setLightingIntensity(Number(e.target.value))}
                  className="w-full accent-[#52b788] cursor-pointer bg-[#242019] h-1.5 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-[#5c5443] mt-1">
                  <span>30% (Trầm Tĩnh)</span>
                  <span>65% (Ánh Ban Mai)</span>
                  <span>100% (Thấu Quang Tối Đa)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Specs Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#141310] p-6 rounded-2xl border border-[#2c2820]">
              <h3 className="text-lg font-serif text-[#f5efe6] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#52b788]" />
                Kỹ Nghệ Thư Phòng Cố Bản
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-[#1a1814] border border-[#2b271d]">
                  <div className="font-medium text-[#52b788] mb-1">Ngọc Bích Phỉ Thúy Type A Myanmar</div>
                  <p className="text-[#a39a88] leading-relaxed">
                    Tuyển chọn phiến ngọc tự nhiên thấu quang 95.2%, mài vát tay theo dáng Như Ý Cát Tường thanh tú, vân lý tự nhiên không tì vết hóa chất.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#1a1814] border border-[#2b271d]">
                  <div className="font-medium text-[#d4af37] mb-1">Nẹp Vàng 24K Kéo Sợi Filigree 0.18mm</div>
                  <p className="text-[#a39a88] leading-relaxed">
                    Nghệ nhân kim hoàn kéo sợi vàng ta 24K độ mảnh 0.18mm, uốn tạo hình hoa văn như ý liên hoàn bao bọc viền ngọc tăng cường độ bền cơ học.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#1a1814] border border-[#2b271d]">
                  <div className="font-medium text-[#d4af37] mb-1">Đế Mun Sừng Khánh Hòa 175 Năm</div>
                  <p className="text-[#a39a88] leading-relaxed">
                    Thớ gỗ Mun sừng đanh chắc như đá, liên kết mộng âm dương kín khít, đánh bóng bề mặt bằng sáp ong ruồi nguyên chất chống nồm ẩm Nam Bộ.
                  </p>
                </div>
              </div>
            </div>

            {/* Atelier Gu Guarantee */}
            <div className="bg-gradient-to-br from-[#1a1813] to-[#12110c] p-5 rounded-2xl border border-[#d4af37]/30 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#d4af37] font-serif font-medium uppercase tracking-wider">Đặc Khảo GuHomes</span>
                <span className="text-[10px] text-[#706859]">Giới hạn 12 công trình/năm</span>
              </div>
              <p className="text-[#a39a88] leading-relaxed mb-3">
                Các bộ sưu tập khí cụ thư phòng và bảo thất thiền viện đều được giám tuyển trực tiếp bởi Kiến trúc sư Trưởng GuHomes.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#29251c] text-[11px]">
                <span className="text-[#706859]">Liên hệ cố vấn:</span>
                <a href="tel:0368757916" className="text-[#d4af37] font-medium hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-[#524b3d]">
          Thiết kế & chế tác thủ công độc bản bởi GuHomes · Xưởng Thạnh Xuân, Quận 12, TP.HCM
        </div>
      </div>
    </section>
  );
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestRuyiStudio;
