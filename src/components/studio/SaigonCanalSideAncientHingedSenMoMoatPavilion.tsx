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

export function SaigonCanalSideAncientHingedSenMoMoatPavilion() {
  const [state, setState] = useState<PavilionState>({
    hingeAngle: 150,
    rotationAngle: 100,
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
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const detailsInfo: Record<string, { title: string; subtitle: string; desc: string; stats: string }> = {
    frame: {
      title: "Gỗ Sến Mủ Rừng Già Nam Bộ 230 Năm Tuổi",
      subtitle: "Madhuca pasquieri: Sắc nâu đỏ ánh tía, tỷ trọng 1.28g/cm³ đanh chắc như kim loại",
      desc: "Khai thác từ thân cây Sến Mủ đại thụ vùng rừng ngập mặn cổ Nam Bộ trên 230 năm tuổi. Tỷ trọng cực đại 1.28g/cm³ chìm sâu đáy nước, thớ gỗ xoắn đan cài chịu mặn mòi phù sa và độ ẩm nhiệt đới quanh năm 80% tại Sài Gòn mà không hề mủn mục hay biến dạng.",
      stats: "Tỷ trọng 1.28g/cm³ - Kháng mặn kháng ẩm 100%",
    },
    hinges: {
      title: "Hệ Trục Cối Mộng Gỗ Khép Kín",
      subtitle: "Ngõng cối gỗ Trắc đen tiện thủ công: Chuyển động tĩnh lặng không tiếng cọ xát",
      desc: "Toàn bộ hệ thống cửa gấp và cánh lùa thủy đình vận hành trên trục cối gỗ Lim xanh và ngõng cối tiện thủ công, bôi trơn định kỳ bằng sáp ong rừng và dầu tràm nguyên chất. Chuyển động nhẹ êm như tơ lụa, chống rỉ sét và kẹt nở hoàn hảo qua mùa mưa triều cường Nam Bộ.",
      stats: "Góc mở linh hoạt 0° đến 180° - 100% kết cấu mộc truyền thừa",
    },
    moat: {
      title: "Hào Nước Sen Bách Diệp Tuần Hoàn",
      subtitle: "Hạ nhiệt đối lưu tự nhiên -7.1°C: Lớp đệm vi khí hậu sinh thái",
      desc: "Mặt nước hào sen bao quanh bốn phía thủy đình được luân chuyển liên tục qua tầng lọc đá bazan núi lửa và rễ sen Bách Diệp Tây Hồ thuần dưỡng. Làn gió Nam từ rạch sông thổi qua mặt nước bốc hơi tự nhiên, mang theo hơi ẩm mát lành và hương sen thoang thoảng vào lòng đình.",
      stats: "Chênh lệch nhiệt độ -7.1°C so với phố thị - Đối lưu gió 24/7",
    },
    bonsai: {
      title: "Bệ Xoay Bonsai Thông Đen Cổ Thụ 245 Năm",
      subtitle: "Bệ xoay Mun Sừng ngõng đồng thau mộc: Nghệ thuật thưởng lãm 360 độ",
      desc: "Cây Thông Đen thế huyền vũ uy nghiêm được đặt trên bệ xoay tiện từ gỗ Mun Sừng nguyên khối, tích hợp cơ cấu trục xoay bi gốm vi mô. Gia chủ nhẹ nhàng xoay chuyển góc ngắm theo hướng nắng sớm hoặc chiều tà để đón nhận trọn vẹn vượng khí tự nhiên.",
      stats: "Tuổi cây 245 năm tuổi thế Huyền Vũ - Trục bi gốm xoay 360° êm ái",
    },
  };

  return (
    <section className="relative w-full bg-[#0c1012] text-[#e5eaed] py-20 px-4 md:px-8 lg:px-16 overflow-hidden border-t border-b border-[#21292e]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#2a3c47] blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#7a6035] blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#21292e]/80 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151d21] border border-[#26353d] text-xs font-mono tracking-wider text-[#91b3c4] mb-4">
              <span>TUYỆT PHẨM KIẾN TRÚC VI KHÍ HẬU GUHOMES</span>
              <span>·</span>
              <span>SPRINT 129</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#f2f6f7] tracking-tight leading-tight">
              Thủy Đình Cửa Cối Gỗ Sến Mủ 230 Năm Tuổi & Hào Sen Bách Diệp
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#9cb0bc] font-light max-w-3xl leading-relaxed">
              Kiến trúc thủy đình ven sông Sài Gòn ứng dụng gỗ Sến Mủ đại thụ tỷ trọng 1.28g/cm³ chìm hoàn toàn trong nước, kết hợp hệ cửa cối mộng cổ và hào sen sinh thái tuần hoàn hạ nhiệt tự nhiên -7.1°C.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={playBreezeChime}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
                isPlayingAudio
                  ? "bg-[#91b3c4] text-[#0c1012] shadow-[0_0_20px_rgba(145,179,196,0.4)]"
                  : "bg-[#162126] text-[#cbdde6] border border-[#273842] hover:border-[#3e5663]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span>{isPlayingAudio ? "Đang Ngân Vang 528Hz" : "Chuông Gió Sến Mủ 528Hz"}</span>
            </button>
          </div>
        </div>

        {/* Main Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Spatial Visualizer (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#10161a] rounded-sm border border-[#21292e] p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
            {/* Water Ripple Layer */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3a4f5c_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Microclimate Stats Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-[#0b0f12]/80 border border-[#21292e] text-[11px] font-mono text-[#91b3c4]">
                Nhiệt độ hạ: -7.1°C
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0b0f12]/80 border border-[#21292e] text-[11px] font-mono text-[#cb9b51]">
                Tỷ trọng gỗ: 1.28g/cm³ (Chìm Nước)
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0b0f12]/80 border border-[#21292e] text-[11px] font-mono text-[#7db598]">
                Sến Mủ Nam Bộ 230 Năm
              </span>
            </div>

            {/* Central Graphic Simulation */}
            <div className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center my-6">
              {/* Moat Water Ripples */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full border border-[#374e5c]/50 bg-[#141e24]/40"
              />
              <motion.div
                animate={{ scale: [1.12, 1.25, 1.12], opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute inset-0 rounded-full border border-[#48677a]/30"
              />

              {/* Pavilion Octagonal Platform */}
              <div
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl bg-gradient-to-br from-[#1b262c] via-[#141c21] to-[#0d1317] border-2 border-[#486373] shadow-2xl flex items-center justify-center transform transition-transform duration-700"
                style={{ transform: `rotate(${state.rotationAngle}deg)` }}
              >
                {/* Traditional Hinge Wings */}
                <div
                  className="absolute top-2 w-32 h-1.5 bg-[#cb9b51] rounded transition-all duration-500 shadow-[0_0_10px_rgba(203,155,81,0.5)]"
                  style={{ transform: `scaleX(${state.hingeAngle / 180})` }}
                />
                <div
                  className="absolute bottom-2 w-32 h-1.5 bg-[#cb9b51] rounded transition-all duration-500 shadow-[0_0_10px_rgba(203,155,81,0.5)]"
                  style={{ transform: `scaleX(${state.hingeAngle / 180})` }}
                />
                <div
                  className="absolute left-2 h-32 w-1.5 bg-[#cb9b51] rounded transition-all duration-500 shadow-[0_0_10px_rgba(203,155,81,0.5)]"
                  style={{ transform: `scaleY(${state.hingeAngle / 180})` }}
                />
                <div
                  className="absolute right-2 h-32 w-1.5 bg-[#cb9b51] rounded transition-all duration-500 shadow-[0_0_10px_rgba(203,155,81,0.5)]"
                  style={{ transform: `scaleY(${state.hingeAngle / 180})` }}
                />

                {/* Center Bonsai Pedestal */}
                <div className="w-20 h-20 rounded-full bg-[#202d33] border border-[#6b8999] flex flex-col items-center justify-center text-center p-1 shadow-inner">
                  <span className="text-[10px] font-serif text-[#d7e4eb] leading-tight">Thông Đen</span>
                  <span className="text-[9px] font-mono text-[#cb9b51]">245 Năm</span>
                </div>
              </div>

              {/* Water Moat Label */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#152026] px-2 py-0.5 rounded-full border border-[#2b3e4a] text-[10px] font-mono text-[#91b3c4]">
                <span>Hào Sen Bách Diệp</span>
              </div>
            </div>

            {/* Interactive Sliders */}
            <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#21292e]/60">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5 text-[#9cb0bc]">
                  <span>Độ Mở Cửa Cối Mộng Gỗ</span>
                  <span className="text-[#cb9b51]">{state.hingeAngle}° / 180°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={state.hingeAngle}
                  onChange={(e) => setState((prev) => ({ ...prev, hingeAngle: Number(e.target.value) }))}
                  className="w-full h-1.5 bg-[#172227] rounded-lg appearance-none cursor-pointer accent-[#cb9b51]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1.5 text-[#9cb0bc]">
                  <span>Góc Xoay Bệ Thông Đen 360°</span>
                  <span className="text-[#91b3c4]">{state.rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={state.rotationAngle}
                  onChange={(e) => setState((prev) => ({ ...prev, rotationAngle: Number(e.target.value) }))}
                  className="w-full h-1.5 bg-[#172227] rounded-lg appearance-none cursor-pointer accent-[#91b3c4]"
                />
              </div>
            </div>
          </div>

          {/* Details & Architecture Specs (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Nav Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-[#10161a] rounded-sm border border-[#21292e]">
              {(["frame", "hinges", "moat", "bonsai"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setState((prev) => ({ ...prev, selectedDetail: key }))}
                  className={`py-2 px-1 text-center rounded-xs text-[11px] font-mono tracking-wider transition-all duration-200 capitalize ${
                    state.selectedDetail === key
                      ? "bg-[#1f2d34] text-[#edf3f5] font-semibold shadow-sm"
                      : "text-[#7f949f] hover:text-[#e5eaed] hover:bg-[#162126]"
                  }`}
                >
                  {key === "frame" ? "Sến Mủ" : key === "hinges" ? "Cửa Cối" : key === "moat" ? "Hào Sen" : "Thông Đen"}
                </button>
              ))}
            </div>

            {/* Selected Spec Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={state.selectedDetail}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-[#10161a] rounded-sm border border-[#21292e] p-6 flex flex-col justify-between min-h-[340px]"
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded bg-[#172329] border border-[#2b3e47] text-[10px] font-mono text-[#cb9b51] mb-2 uppercase">
                    Chi Tiết Kết Cấu Độc Bản
                  </div>
                  <h3 className="text-xl font-serif text-[#f2f6f7] leading-snug">
                    {detailsInfo[state.selectedDetail]?.title}
                  </h3>
                  <h4 className="text-xs font-mono text-[#91b3c4] mt-1 mb-4">
                    {detailsInfo[state.selectedDetail]?.subtitle}
                  </h4>
                  <p className="text-sm text-[#b2c4ce] font-light leading-relaxed">
                    {detailsInfo[state.selectedDetail]?.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#21292e] flex items-center justify-between text-xs font-mono text-[#7f949f]">
                  <span>{detailsInfo[state.selectedDetail]?.stats}</span>
                  <span className="text-[#cb9b51]">Chuẩn GuHomes</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Brand Commitment Banner */}
            <div className="bg-[#0e1317] rounded-sm border border-[#21292e]/80 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-serif text-[#d7e4eb]">Xưởng May Đo Mộc Thạnh Xuân 1.200m²</p>
                <p className="text-[11px] font-mono text-[#728794]">Kỷ luật trần 12 công trình độc bản mỗi năm</p>
              </div>
              <a
                href="tel:0368757916"
                className="px-3.5 py-2 rounded-xs bg-[#1f2d34] hover:bg-[#2b3c45] text-[#e5eaed] border border-[#344b56] text-xs font-mono transition-colors"
              >
                0368 757 916
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SaigonCanalSideAncientHingedSenMoMoatPavilion;
