"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PavilionState {
  hingeAngle: number; // 0 to 180 degrees
  rotationAngle: number; // 0 to 360 degrees
  activeSeason: "dry" | "rainy";
  soundEnabled: boolean;
  selectedDetail: string;
}

export function SaigonCanalSideAncientHingedHoangDanMoatPavilion() {
  const [state, setState] = useState<PavilionState>({
    hingeAngle: 115,
    rotationAngle: 45,
    activeSeason: "dry",
    soundEnabled: false,
    selectedDetail: "frame",
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBreezeChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Solfeggio 528Hz resonance chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1056, ctx.currentTime + 1.2);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.5);
      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 2500);
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

  const calculateCoolingDelta = () => {
    const baseReduction = state.activeSeason === "dry" ? 6.4 : 5.1;
    const airflowBonus = (state.hingeAngle / 180) * 0.9;
    return (baseReduction + airflowBonus).toFixed(1);
  };

  return (
    <section className="relative w-full py-24 bg-[#0d0d0c] text-[#ece5d8] overflow-hidden border-t border-[#3a352a]/40">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-[#d4af37]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-[480px] h-[480px] bg-[#3a5a40]/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-medium tracking-widest uppercase mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            Kỹ Nghệ Thủy Đình Vi Khí Hậu Sài Gòn
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-light text-[#f5efe6] tracking-tight mb-6"
          >
            Thủy Đình Gỗ Hoàng Đàn Tuyết Lạng Sơn
          </motion.h2>

          <p className="text-sm md:text-base text-[#a39a88] leading-relaxed font-light">
            Tuyệt phẩm kiến trúc thủy tạ ven kênh rạch Sài Gòn, chế tác từ gỗ Hoàng Đàn Tuyết Lạng Sơn 195 năm tích tụ tinh dầu óng ánh kết hợp hệ cửa bức bàn bản lề cối gỗ Nghiến bách niên xoay góc vi sai.
          </p>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Visualizer & Stage */}
          <div className="lg:col-span-8 bg-[#151412] p-6 md:p-10 rounded-2xl border border-[#2e2a22] shadow-2xl relative">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#2e2a22]">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">Tương tác 3D Vi Khí Hậu</span>
                <span className="text-xs text-[#706859]">·</span>
                <span className="text-xs text-[#a39a88]">Góc mở cửa: {state.hingeAngle}°</span>
                <span className="text-xs text-[#706859]">·</span>
                <span className="text-xs text-[#a39a88]">Bệ xoay: {state.rotationAngle}°</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={playBreezeChime}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-2 ${
                    isPlayingAudio
                      ? "bg-[#d4af37] text-[#0d0d0c] border-[#d4af37]"
                      : "bg-[#1e1c18] text-[#d4af37] border-[#d4af37]/40 hover:bg-[#d4af37]/10"
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                  <span>{isPlayingAudio ? "Chuông Solfeggio 528Hz..." : "Ngân Chuông Gió"}</span>
                </button>
              </div>
            </div>

            {/* Spatial Graphic Display */}
            <div className="relative h-80 md:h-96 w-full flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-[#1a1815] to-[#0f0e0c] border border-[#2a261f]">
              {/* Canal Water Surface Simulation */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0e2229]/60 via-[#13323c]/30 to-transparent flex items-center justify-center">
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scaleY: [1, 1.08, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-full h-12 bg-gradient-to-r from-transparent via-[#48cae4]/10 to-transparent"
                />
                <span className="absolute bottom-3 text-[11px] text-[#48cae4]/70 tracking-widest uppercase">
                  Mặt Kênh Nhiêu Lộc - Thị Nghè Vi Hòa Khí
                </span>
              </div>

              {/* Pavilion Architectural Structure Representation */}
              <motion.div
                animate={{ rotate: state.rotationAngle }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                className="relative z-10 w-56 h-56 flex items-center justify-center"
              >
                {/* Ancient Sao Den Base Plate */}
                <div className="absolute w-48 h-48 rounded-full border-2 border-dashed border-[#d4af37]/40 bg-[#2b2216]/50 shadow-inner flex items-center justify-center">
                  <span className="text-[10px] text-[#d4af37]/60 tracking-wider">Bệ Sao Đen 210 Năm 360°</span>
                </div>

                {/* Hoang Dan Snow Timber Columns & Core Structure */}
                <div className="relative w-36 h-36 border-2 border-[#d4af37] bg-[#1a1712]/90 rounded-lg flex flex-col items-center justify-between p-3 shadow-2xl">
                  {/* Roof representation */}
                  <div className="w-full h-4 bg-gradient-to-r from-[#d4af37]/20 via-[#d4af37]/60 to-[#d4af37]/20 rounded flex items-center justify-center">
                    <span className="text-[8px] text-[#f5efe6] font-mono">MÁI 3 LỚP HẠ NHIỆT</span>
                  </div>

                  {/* Left Hinged Door Leaf */}
                  <motion.div
                    style={{ transformOrigin: "left center" }}
                    animate={{ rotateY: -state.hingeAngle }}
                    transition={{ type: "spring", stiffness: 70, damping: 12 }}
                    className="absolute left-1 top-8 bottom-8 w-14 bg-gradient-to-r from-[#593d25] to-[#3d2716] border border-[#d4af37]/60 rounded-l flex items-center justify-center shadow-lg"
                  >
                    <div className="text-[8px] text-[#d4af37] rotate-90 whitespace-nowrap">Bản Lề Cối Nghiến</div>
                  </motion.div>

                  {/* Right Hinged Door Leaf */}
                  <motion.div
                    style={{ transformOrigin: "right center" }}
                    animate={{ rotateY: state.hingeAngle }}
                    transition={{ type: "spring", stiffness: 70, damping: 12 }}
                    className="absolute right-1 top-8 bottom-8 w-14 bg-gradient-to-l from-[#593d25] to-[#3d2716] border border-[#d4af37]/60 rounded-r flex items-center justify-center shadow-lg"
                  >
                    <div className="text-[8px] text-[#d4af37] -rotate-90 whitespace-nowrap">Hoàng Đàn Tuyết</div>
                  </motion.div>

                  {/* Inner Hearth & Scent Point */}
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-4 h-4 rounded-full bg-[#d4af37] shadow-[0_0_15px_#d4af37]"
                    />
                  </div>

                  <span className="text-[9px] text-[#a39a88] font-mono">HOÀNG ĐÀN 195 NĂM</span>
                </div>
              </motion.div>

              {/* Climate Wind Stream Vectors */}
              <div className="absolute top-6 left-6 flex items-center gap-2 text-xs text-[#a39a88]">
                <span className="inline-block w-2 h-2 rounded-full bg-[#48cae4] animate-ping" />
                <span>Gió Nam Kênh: {state.activeSeason === "dry" ? "Mùa Khô (3.8 m/s)" : "Mùa Mưa (4.6 m/s)"}</span>
              </div>

              {/* Temperature Differential Badge */}
              <div className="absolute bottom-6 right-6 bg-[#111]/90 backdrop-blur px-4 py-2 rounded-xl border border-[#d4af37]/40 text-right">
                <div className="text-[10px] text-[#a39a88] uppercase tracking-wider">Hạ Nhiệt Tự Nhiên</div>
                <div className="text-xl font-serif text-[#d4af37] font-semibold">-{calculateCoolingDelta()}°C</div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <div>
                <div className="flex justify-between text-xs text-[#a39a88] mb-2">
                  <span>Góc Mở Bản Lề Cối Khớp Mộng</span>
                  <span className="text-[#d4af37] font-mono font-medium">{state.hingeAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={state.hingeAngle}
                  onChange={(e) => setState((prev) => ({ ...prev, hingeAngle: Number(e.target.value) }))}
                  className="w-full accent-[#d4af37] cursor-pointer bg-[#2a261f] h-1.5 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-[#706859] mt-1">
                  <span>0° (Đóng kín gió)</span>
                  <span>90° (Đón gió trung hòa)</span>
                  <span>180° (Mở thoáng tối đa)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs text-[#a39a88] mb-2">
                  <span>Góc Xoay Bệ Sao Đen Bách Niên</span>
                  <span className="text-[#d4af37] font-mono font-medium">{state.rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={state.rotationAngle}
                  onChange={(e) => setState((prev) => ({ ...prev, rotationAngle: Number(e.target.value) }))}
                  className="w-full accent-[#d4af37] cursor-pointer bg-[#2a261f] h-1.5 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-[#706859] mt-1">
                  <span>0° (Hướng Kênh Đông)</span>
                  <span>180° (Hướng Vườn Trúc)</span>
                  <span>360° (Trục Bắc)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specs & Material Story */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-[#151412] p-6 rounded-2xl border border-[#2e2a22]">
              <h3 className="text-lg font-serif text-[#f5efe6] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                Đặc Tính Kiến Trúc Độc Bản
              </h3>

              <div className="space-y-4 text-xs">
                <div
                  onClick={() => setState((prev) => ({ ...prev, selectedDetail: "frame" }))}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    state.selectedDetail === "frame"
                      ? "bg-[#1f1d18] border-[#d4af37] text-[#f5efe6]"
                      : "bg-[#11100e] border-[#26231c] text-[#a39a88] hover:border-[#3d372c]"
                  }`}
                >
                  <div className="font-medium text-[#d4af37] mb-1">Gỗ Hoàng Đàn Tuyết Lạng Sơn 195 Năm</div>
                  <p className="leading-relaxed">
                    Tích lũy hàm lượng tinh dầu đậm đặc, bề mặt kết tinh lớp tuyết óng ánh tỏa hương trầm thơm dịu, chống ẩm nhiệt đới và xua đuổi côn trùng tuyệt đối.
                  </p>
                </div>

                <div
                  onClick={() => setState((prev) => ({ ...prev, selectedDetail: "hinge" }))}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    state.selectedDetail === "hinge"
                      ? "bg-[#1f1d18] border-[#d4af37] text-[#f5efe6]"
                      : "bg-[#11100e] border-[#26231c] text-[#a39a88] hover:border-[#3d372c]"
                  }`}
                >
                  <div className="font-medium text-[#d4af37] mb-1">Bản Lề Cối Khớp Mộng Gỗ Nghiến Bách Niên</div>
                  <p className="leading-relaxed">
                    Cơ khí mộng chốt mộc truyền thống không dùng đinh kim loại, chịu tải trọng lớn, vận hành êm ái qua hàng thế kỷ chịu thời tiết khắc nghiệt.
                  </p>
                </div>

                <div
                  onClick={() => setState((prev) => ({ ...prev, selectedDetail: "climate" }))}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    state.selectedDetail === "climate"
                      ? "bg-[#1f1d18] border-[#d4af37] text-[#f5efe6]"
                      : "bg-[#11100e] border-[#26231c] text-[#a39a88] hover:border-[#3d372c]"
                  }`}
                >
                  <div className="font-medium text-[#d4af37] mb-1">Vi Khí Hậu Mặt Nước Sài Gòn</div>
                  <p className="leading-relaxed">
                    Hấp thụ gió mát từ mặt kênh Nhiêu Lộc, kết hợp hiệu ứng đối lưu Bernoulli xuyên qua mái ngói 3 tầng giúp không gian luôn mát mẻ tự nhiên.
                  </p>
                </div>
              </div>
            </div>

            {/* GuHomes Atelier Assurance Card */}
            <div className="bg-gradient-to-br from-[#1a1815] to-[#12110f] p-5 rounded-2xl border border-[#d4af37]/30 text-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#d4af37] font-serif font-medium uppercase tracking-wider">Bảo Chứng GuHomes</span>
                <span className="text-[10px] text-[#706859]">Giới hạn 12 công trình/năm</span>
              </div>
              <p className="text-[#a39a88] leading-relaxed mb-3">
                Mỗi công trình thủy tạ do Gu chế tác tại xưởng Thạnh Xuân 1.200m² đều được tuyển chọn cấu kiện gỗ tự nhiên chuẩn xuất xứ và cam kết bảo hành mộng khớp trọn đời.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#2a261f] text-[11px]">
                <span className="text-[#706859]">KTS Trưởng:</span>
                <a href="tel:0368757916" className="text-[#d4af37] font-medium hover:underline">
                  0368 757 916
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-[#706859]">
          Sáng tạo kiến trúc độc bản bởi GuHomes · Xưởng mộc đo ni đóng giày Thạnh Xuân, Quận 12, TP.HCM
        </div>
      </div>
    </section>
  );
}

export default SaigonCanalSideAncientHingedHoangDanMoatPavilion;
