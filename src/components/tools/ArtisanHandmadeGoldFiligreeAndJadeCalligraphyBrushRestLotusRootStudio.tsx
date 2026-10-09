"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusRootStudio() {
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
              <span>SPRINT 133</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#f0f6f1] tracking-tight leading-tight">
              Kê Ngự Bút Ngó Sen Cát Tường Phỉ Thúy Nẹp Vàng 24K Filigree
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#9cb2a0] font-light max-w-3xl leading-relaxed">
              Bảo vật thư phòng tạo hình ngó sen thất khiếu thông tuệ "Liên Ngẫu Thông Tâm" tạc từ ngọc bích Phỉ Thúy Type A Myanmar thấu quang 97.8%, nẹp đường tơ chỉ vàng 24K Filigree 0.18mm trên bệ gỗ Trắc đen Tây Nguyên 230 năm tuổi vân chỉ đan dệt kiêu hãnh.
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

        {/* Studio Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Visualizer Viewport (8 Cols) */}
          <div className="lg:col-span-8 bg-[#0e1612] border border-[#1b2b20] rounded-lg p-6 relative overflow-hidden shadow-2xl">
            {/* Viewport Control Bar */}
            <div className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-[#1b2b20]/60 gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#7b9c84] uppercase tracking-wider">Góc Quan Sát:</span>
                <div className="inline-flex rounded-sm bg-[#132018] p-1 border border-[#23382a]">
                  {(["front", "top", "side"] as const).map((angle) => (
                    <button
                      key={angle}
                      onClick={() => setSelectedAngle(angle)}
                      className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-sm transition-all ${
                        selectedAngle === angle
                          ? "bg-[#253d2e] text-[#b6dec0] shadow-sm"
                          : "text-[#7b9c84] hover:text-[#d3e5d7]"
                      }`}
                    >
                      {angle === "front" ? "Chính Diện" : angle === "top" ? "Nhìn Từ Trên" : "Góc Nghiêng 45°"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBrushPlaced(!brushPlaced)}
                  className={`px-3 py-1 text-xs font-mono tracking-wider border rounded-sm transition-all ${
                    brushPlaced
                      ? "bg-[#253e2d] border-[#446d50] text-[#c9e8d1]"
                      : "bg-[#142219] border-[#253c2e] text-[#86a68e] hover:text-[#c9e8d1]"
                  }`}
                >
                  {brushPlaced ? "Hạ Bút Lông Lên Kê" : "Cất Bút Thư Pháp"}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-[#7b9c84]">Phóng đại:</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                    className="w-6 h-6 rounded-sm bg-[#132018] border border-[#253c2e] text-xs flex items-center justify-center text-[#7b9c84] hover:text-[#d3e5d7]"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono text-[#a5c7ae] w-8 text-center">{zoomLevel.toFixed(1)}x</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.2))}
                    className="w-6 h-6 rounded-sm bg-[#132018] border border-[#253c2e] text-xs flex items-center justify-center text-[#7b9c84] hover:text-[#d3e5d7]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* SVG Interactive Canvas */}
            <div className="relative w-full aspect-[16/10] bg-[#070b09] rounded-md border border-[#142017] flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{
                  scale: zoomLevel,
                  rotateX: selectedAngle === "top" ? 35 : selectedAngle === "side" ? 15 : 0,
                  rotateY: selectedAngle === "side" ? -25 : 0,
                }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
                className="w-full h-full flex items-center justify-center relative"
              >
                <svg
                  viewBox="0 0 600 400"
                  className="w-full h-full max-w-[540px] drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
                  fill="none"
                >
                  {/* Trac Den Wood Base (Bệ Trắc đen Tây Nguyên 230 năm) */}
                  <path
                    d="M 100 310 L 140 270 L 460 270 L 500 310 L 480 335 L 120 335 Z"
                    fill="#151211"
                    stroke="#382c28"
                    strokeWidth="1.5"
                  />
                  {/* Rosewood Grain highlights */}
                  <path d="M 150 280 Q 250 274 350 282" stroke="#543c34" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />

                  {/* 24K Gold Filigree Inlay Border along the Wooden Base */}
                  <path
                    d="M 130 315 L 160 280 L 440 280 L 470 315"
                    stroke="#d4af37"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    fill="none"
                  />

                  {/* Type A Translucent Myanmar Jade Body - Lotus Root Shape (Kê Ngự Bút Hình Ngó Sen) */}
                  <g>
                    {/* Main Jade Mass with Opacity indicating 97.8% Translucency */}
                    <path
                      d="M 140 265 Q 180 155 220 225 Q 260 125 300 210 Q 340 115 380 220 Q 420 145 460 265 Z"
                      fill="#25593e"
                      fillOpacity={lightingIntensity / 100}
                      stroke="#428a63"
                      strokeWidth="2"
                    />

                    {/* Inner Jade Veins & Translucent Luminescence */}
                    <path
                      d="M 170 250 Q 210 175 230 225 Q 270 145 300 205 Q 330 135 370 215 Q 400 165 430 250"
                      stroke="#64b689"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      opacity="0.8"
                    />

                    {/* Sculpted Lotus Root Joint Ridges */}
                    {/* Left Root Crest */}
                    <path
                      d="M 190 205 Q 220 125 240 195"
                      stroke="#86d4a8"
                      strokeWidth="2"
                      fill="none"
                    />
                    {/* Center Tallest Root Crest */}
                    <path
                      d="M 270 165 Q 300 95 330 160"
                      stroke="#86d4a8"
                      strokeWidth="2.5"
                      fill="none"
                    />
                    {/* Right Root Crest */}
                    <path
                      d="M 350 175 Q 380 105 410 185"
                      stroke="#86d4a8"
                      strokeWidth="2"
                      fill="none"
                    />

                    {/* 24K Gold Filigree Fine Wire (0.18mm) Wrapping Lotus Root Joints */}
                    <path
                      d="M 140 265 Q 180 155 220 225 Q 260 125 300 210 Q 340 115 380 220 Q 420 145 460 265"
                      stroke="#ffdf6d"
                      strokeWidth="1.6"
                      strokeDasharray="4 2"
                      fill="none"
                    />

                    {/* 7 Perforations of Wisdom (Thất Khiếu Thông Tâm) Inlaid with Gold */}
                    <g transform="translate(300, 180)">
                      <circle cx="0" cy="0" r="3" fill="#132b1e" stroke="#ffd700" strokeWidth="1" />
                      <circle cx="-10" cy="-6" r="2.5" fill="#132b1e" stroke="#ffd700" strokeWidth="1" />
                      <circle cx="10" cy="-6" r="2.5" fill="#132b1e" stroke="#ffd700" strokeWidth="1" />
                      <circle cx="-12" cy="6" r="2.5" fill="#132b1e" stroke="#ffd700" strokeWidth="1" />
                      <circle cx="12" cy="6" r="2.5" fill="#132b1e" stroke="#ffd700" strokeWidth="1" />
                      <circle cx="0" cy="-12" r="2.2" fill="#132b1e" stroke="#ffd700" strokeWidth="1" />
                      <circle cx="0" cy="12" r="2.2" fill="#132b1e" stroke="#ffd700" strokeWidth="1" />
                    </g>
                  </g>

                  {/* Imperial Calligraphy Brush Placed on the Peaks */}
                  {brushPlaced && (
                    <g transform="translate(40, -10)">
                      {/* Brush Handle - Ancient Cẩm Lai Wood & Gold Ferrule */}
                      <path
                        d="M 60 145 L 480 215"
                        stroke="#4a2511"
                        strokeWidth="11"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 60 145 L 480 215"
                        stroke="#d4af37"
                        strokeWidth="1.5"
                        strokeDasharray="20 40"
                      />
                      {/* Gold Ferrule Joint */}
                      <line x1="440" y1="209" x2="455" y2="211" stroke="#ffd700" strokeWidth="13" />

                      {/* Pure White Weasel/Goat Hair Brush Tip */}
                      <path
                        d="M 455 211 Q 515 220 535 224 Q 495 235 455 215 Z"
                        fill="#faf4e8"
                        stroke="#d4af37"
                        strokeWidth="1"
                      />
                    </g>
                  )}

                  {/* Solfeggio Resonance Waves on Chime */}
                  {isPlayingChime && (
                    <g opacity="0.6">
                      <circle cx="300" cy="180" r="60" stroke="#86d4a8" strokeWidth="1.5" strokeDasharray="4 6">
                        <animate attributeName="r" from="40" to="120" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.8" to="0" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="300" cy="180" r="90" stroke="#ffd700" strokeWidth="1" strokeDasharray="3 5">
                        <animate attributeName="r" from="60" to="160" dur="2.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.7" to="0" dur="2.5s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  )}
                </svg>
              </motion.div>

              {/* Real-time Indicator Overlay */}
              <div className="absolute bottom-3 left-3 bg-[#0a100d]/90 backdrop-blur-md px-3 py-1.5 rounded border border-[#1b2b20] text-xs font-mono text-[#8caea0] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#64b689]" />
                Độ thấu quang Phỉ Thúy: <strong className="text-[#e2f0e6]">97.8%</strong> · Chỉ vàng 24K:{" "}
                <strong className="text-[#ffd700]">0.18mm</strong>
              </div>
            </div>

            {/* Light Intensity Slider */}
            <div className="mt-6 bg-[#111a14] p-4 rounded border border-[#1c2c21]">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-[#8caea0]">Cường Độ Nguồn Sáng Xuyên Thấu Quang Phỉ Thúy</span>
                <span className="text-xs font-mono font-semibold text-[#86d4a8]">{lightingIntensity}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={lightingIntensity}
                onChange={(e) => setLightingIntensity(parseInt(e.target.value))}
                className="w-full accent-[#64b689] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#547363] mt-1">
                <span>30% (Trầm tĩnh thư phòng)</span>
                <span>85% (Lý tưởng thưởng ngọc)</span>
                <span>100% (Thấu triệt vân lý Myanmar)</span>
              </div>
            </div>
          </div>

          {/* Specifications & Craftsmanship Dossier (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-[#0e1612] border border-[#1b2b20] rounded-lg p-5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#7b9c84] mb-2">
                HỒ SƠ GIÁM ĐỊNH THỦ CÔNG
              </div>
              <h3 className="text-xl font-serif text-[#eaf3ec] mb-3">
                Ngọc Phỉ Thúy Type A & Trắc Đen 230 Năm
              </h3>

              <div className="space-y-3 text-xs leading-relaxed text-[#9cb2a0]">
                <div className="pb-3 border-b border-[#1b2b20]">
                  <strong className="text-[#cde0d2] block mb-1">Thế Ngó Sen "Liên Ngẫu Thông Tâm":</strong>
                  Tạo hình 3 đốt ngó sen căng mọng tràn đầy sức sống, uốn lượn tinh xảo tạo điểm tựa vẹn toàn cho các cỡ cọ ngự bút lông sói và lang hào đại tự.
                </div>

                <div className="pb-3 border-b border-[#1b2b20]">
                  <strong className="text-[#cde0d2] block mb-1">Kỹ Nghệ Filigree Vàng 24K:</strong>
                  Sợi vàng ròng 24K siêu vi mảnh 0.18mm được nghệ nhân kim hoàn GuHomes xoắn kép, uốn lượn viền các đốt ngó sen và cẩn nẹp thất khiếu thông tâm, tạo độ tương phản kiêu sa trên nền ngọc bích.
                </div>

                <div>
                  <strong className="text-[#cde0d2] block mb-1">Bệ Trắc Đen Tây Nguyên 230 Năm:</strong>
                  Khối gỗ trắc đen bách niên đanh chắc vân chỉ huyền ảo, cách ẩm chống mối mọt tự nhiên, cân bằng âm dương và đem lại sự trang trọng tuyệt đối cho án thư.
                </div>
              </div>
            </div>

            {/* Solfeggio Sound Frequency Info */}
            <div className="bg-[#0e1612] border border-[#1b2b20] rounded-lg p-5">
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] mb-2">
                TẦN SỐ CỘNG HƯỞNG KHÁNH NGỌC
              </div>
              <div className="text-2xl font-serif text-[#e2f0e6] mb-1">528Hz & 1056Hz</div>
              <p className="text-xs text-[#8caea0] leading-relaxed">
                Tần số Solfeggio biến đổi kích hoạt sự tập trung sâu, khai mở trí tuệ minh mẫn khi khai bút, ký kết văn bản trọng đại hoặc thưởng trà đàm đạo.
              </p>
            </div>

            {/* GuHomes Atelier Stamp */}
            <div className="bg-[#121c16] border border-[#213527] rounded-lg p-4 flex items-center justify-between">
              <div className="text-xs">
                <div className="font-medium text-[#f0f6f1]">Xưởng Thủ Công GuHomes Thạnh Xuân</div>
                <div className="text-[#6d8a77] text-[11px]">Trần chế tác: 12 tác phẩm/năm</div>
              </div>
              <div className="text-right">
                <div className="text-[11px] font-mono text-[#d4af37]">0368 757 916</div>
                <div className="text-[10px] text-[#6d8a77]">KTS Trưởng cố vấn</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusRootStudio;
