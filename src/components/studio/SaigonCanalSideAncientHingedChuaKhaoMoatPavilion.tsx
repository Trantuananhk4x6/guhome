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

export function SaigonCanalSideAncientHingedChuaKhaoMoatPavilion() {
  const [state, setState] = useState<PavilionState>({
    hingeAngle: 155,
    rotationAngle: 110,
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
      title: "Gỗ Chùa Khảo Tây Bắc 235 Năm Tuổi",
      subtitle: "Chukrasia tabularis đại thụ Hoàng Liên Sơn: Sắc vàng óng tơ tằm, vân mây cuộn sóng",
      desc: "Được tuyển chọn từ lõi cây Chùa Khảo đại thụ sinh trưởng trên vách đá vôi Tây Bắc trên 235 năm. Tỷ trọng 1.22g/cm³ đanh chắc như ngọc thạch, thớ gỗ dẻo dai đan cài vân mây cuộn sóng, bền bỉ tuyệt đối trước khí hậu ẩm ướt nhiệt đới quanh năm của bờ kênh Sài Gòn mà không co ngót cong vênh.",
      stats: "Tỷ trọng 1.22g/cm³ - Kháng ẩm 100% tự nhiên",
    },
    hinges: {
      title: "Hệ Trục Mộng Khép Kín Gỗ Mun Hoa",
      subtitle: "Trục cối ngõng mộc bách niên: Chuyển động tĩnh lặng không ma sát kim loại",
      desc: "Toàn bộ hệ thống vách gấp và cánh cửa thủy đình vận hành trên trục cối ngõng gỗ Mun hoa tiện thủ công, bôi trơn định kỳ bằng sáp ong rừng ngâm dầu hoa hồi. Chuyển động nhẹ êm tựa lụa là, hoàn toàn không sử dụng bản lề kim loại, loại bỏ triệt để nguy cơ rỉ sét do hơi muối và triều cường kênh rạch.",
      stats: "Góc xoay mở 0° đến 180° - 100% kết cấu ngàm mộng mộc truyền thống",
    },
    moat: {
      title: "Hào Nước Lọc Ngọc Serpentine & Hoa Súng Tím",
      subtitle: "Hạ nhiệt đối lưu tự nhiên -7.2°C: Lớp đệm vi khí hậu sinh thái",
      desc: "Hào nước bao bọc bốn bề thủy đình luân chuyển qua tầng đệm đá ngọc bích Serpentine Yên Bái và thảm hoa súng tím thơm thuần khiết. Làn gió mát từ dòng kênh thổi qua mặt hào đối lưu tự nhiên, mang theo hơi sương mát dịu và hương hoa thoang thoảng vào tận gian nội thất.",
      stats: "Chênh lệch nhiệt độ -7.2°C so với môi trường ngoài - Vận hành tuần hoàn 24/7",
    },
    bonsai: {
      title: "Bệ Xoay Bonsai Nguyệt Quế Cổ Thụ 250 Năm",
      subtitle: "Bệ xoay Mun sọc ngõng bi gốm vi mô: Thưởng lãm 360 độ ngát hương dạ lan",
      desc: "Cây Nguyệt Quế cổ thụ 250 năm tuổi thế Bát Ngát Phong Sương nở hoa trắng ngần bốn mùa được an vị trên bệ gỗ Mun sọc nguyên khối. Hệ trục bi gốm vi mô cho phép gia chủ khẽ chạm tay xoay tròn 360 độ để chiêm ngưỡng tác phẩm từ mọi góc độ và đón gió tỏa hương ngát cả thủy đình.",
      stats: "Tuổi cây 250 năm thế Bát Ngát Phong Sương - Trục bi gốm vi mô xoay 360° êm ái",
    },
  };

  return (
    <section className="relative w-full bg-[#0c1012] text-[#e5eaed] py-20 px-4 md:px-8 lg:px-16 overflow-hidden border-t border-b border-[#21292e]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#2a3c47] blur-[130px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#7a6035] blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#21292e] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#c9a86a] animate-pulse" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#c9a86a] font-medium">
                Kiến Trúc Thủy Đình Bờ Kênh Sài Gòn · GuHomes Atelier
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-[#f4efe6] tracking-tight">
              Thủy Đình Gỗ Chùa Khảo 235 Năm & Hào Nước Serpentine
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <button
              onClick={playBreezeChime}
              disabled={isPlayingAudio}
              className={`px-4 py-2 rounded-full border text-xs tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isPlayingAudio
                  ? "border-[#c9a86a] bg-[#c9a86a]/20 text-[#f4efe6]"
                  : "border-[#36434d] text-[#95a5b2] hover:border-[#c9a86a] hover:text-[#f4efe6]"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
              <span>{isPlayingAudio ? "Chuông Gió Ngân Vang (528Hz)..." : "Lắng Nghe Âm Vang (528Hz)"}</span>
            </button>
            <div className="text-xs text-[#95a5b2] border border-[#21292e] px-3 py-1.5 rounded-full bg-[#13191d]">
              Hạ nhiệt vi khí hậu: <strong className="text-[#64c99b]">-7.2°C</strong>
            </div>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 bg-[#13191d] border border-[#21292e] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs text-[#95a5b2]">
                <span className="w-2 h-2 rounded-full bg-[#64c99b]" />
                Mô Phỏng Động Học & Vi Khí Hậu Kênh Nhiệt Đới
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setState((s) => ({ ...s, activeSeason: s.activeSeason === "dry" ? "rainy" : "dry" }))}
                  className="text-[11px] px-3 py-1 rounded bg-[#1c242b] border border-[#2e3b44] text-[#c9a86a] hover:bg-[#25323a] transition-all"
                >
                  Mùa: {state.activeSeason === "dry" ? "Mùa Khô Nắng Gắt (Tháng 3)" : "Mùa Mưa Triều Cường (Tháng 9)"}
                </button>
              </div>
            </div>

            {/* SVG Visual Representation */}
            <div className="relative w-full aspect-[16/10] bg-[#090d0f] rounded-xl overflow-hidden border border-[#1b2327] flex items-center justify-center p-4">
              {/* Moat Water Ripple Effect */}
              <div
                className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                  state.activeSeason === "rainy" ? "opacity-40" : "opacity-20"
                }`}
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, #2a5a54 1px, transparent 1px), radial-gradient(circle at 20% 80%, #3a7a6e 1.5px, transparent 1.5px)",
                  backgroundSize: "24px 24px, 36px 36px",
                }}
              />

              <svg className="w-full h-full max-w-[500px]" viewBox="0 0 500 320" fill="none">
                {/* Canal Water Moat base */}
                <ellipse cx="250" cy="270" rx="210" ry="42" fill="#14262b" stroke="#1d4047" strokeWidth="2" />
                <ellipse cx="250" cy="270" rx="170" ry="34" fill="#0d1b1f" stroke="#254d55" strokeWidth="1.5" />

                {/* Serpentine Rocks along Moat */}
                <g opacity="0.8">
                  <path d="M 60 260 Q 75 245 95 260 Q 115 275 80 278 Z" fill="#2d4a3e" stroke="#4a7362" strokeWidth="1" />
                  <path d="M 400 262 Q 425 248 440 265 Q 430 280 395 276 Z" fill="#2d4a3e" stroke="#4a7362" strokeWidth="1" />
                  <circle cx="105" cy="272" r="5" fill="#a44cd3" opacity="0.8" />
                  <circle cx="395" cy="270" r="6" fill="#ba68c8" opacity="0.85" />
                </g>

                {/* Foundation Stilts - Ancient Chua Khao Wood */}
                <line x1="160" y1="230" x2="160" y2="270" stroke="#8a673b" strokeWidth="10" strokeLinecap="round" />
                <line x1="250" y1="235" x2="250" y2="275" stroke="#71542f" strokeWidth="11" strokeLinecap="round" />
                <line x1="340" y1="230" x2="340" y2="270" stroke="#8a673b" strokeWidth="10" strokeLinecap="round" />

                {/* Main Pavilion Platform */}
                <polygon points="120,230 380,230 350,210 150,210" fill="#2e2118" stroke="#8a673b" strokeWidth="2" />

                {/* Ancient Chua Khao Wooden Columns */}
                <rect x="155" y="110" width="12" height="100" fill="#9e7745" rx="2" />
                <rect x="333" y="110" width="12" height="100" fill="#9e7745" rx="2" />
                <rect x="244" y="105" width="12" height="105" fill="#815e34" rx="2" />

                {/* Hinged Wooden Screen Doors (Dynamic rotation based on hingeAngle) */}
                <g style={{ transformOrigin: "167px 160px" }}>
                  <line
                    x1="167"
                    y1="115"
                    x2={167 + Math.cos((state.hingeAngle * Math.PI) / 180) * 65}
                    y2={115 + Math.sin((state.hingeAngle * Math.PI) / 180) * 15}
                    stroke="#c9a86a"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <line
                    x1="167"
                    y1="195"
                    x2={167 + Math.cos((state.hingeAngle * Math.PI) / 180) * 65}
                    y2={195 + Math.sin((state.hingeAngle * Math.PI) / 180) * 15}
                    stroke="#a68449"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>

                <g style={{ transformOrigin: "333px 160px" }}>
                  <line
                    x1="333"
                    y1="115"
                    x2={333 - Math.cos((state.hingeAngle * Math.PI) / 180) * 65}
                    y2={115 + Math.sin((state.hingeAngle * Math.PI) / 180) * 15}
                    stroke="#c9a86a"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <line
                    x1="333"
                    y1="195"
                    x2={333 - Math.cos((state.hingeAngle * Math.PI) / 180) * 65}
                    y2={195 + Math.sin((state.hingeAngle * Math.PI) / 180) * 15}
                    stroke="#a68449"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </g>

                {/* Roof System - Vietnamese Traditional Double Hip Curved Roof */}
                <path
                  d="M 100 110 Q 250 85 400 110 L 375 75 Q 250 55 125 75 Z"
                  fill="#543725"
                  stroke="#c9a86a"
                  strokeWidth="2"
                />
                <path
                  d="M 125 75 Q 250 45 375 75 L 340 40 Q 250 25 160 40 Z"
                  fill="#3d2719"
                  stroke="#8a673b"
                  strokeWidth="1.5"
                />

                {/* Bonsai Nguyet Que on Rotating Pedestal (Rotates by rotationAngle) */}
                <g transform={`translate(250, 195) rotate(${state.rotationAngle % 20 - 10})`}>
                  {/* Mun Striped Wood Pedestal */}
                  <ellipse cx="0" cy="10" rx="22" ry="6" fill="#1b1715" stroke="#524338" strokeWidth="1.5" />
                  <rect x="-18" y="3" width="36" height="7" fill="#120f0e" />

                  {/* Nguyet Que Pot */}
                  <polygon points="-16,3 16,3 12,-6 -12,-6" fill="#3a2f27" stroke="#685547" strokeWidth="1" />

                  {/* Trunk & Foliage */}
                  <path d="M 0 -6 Q 8 -22 -4 -38 Q -10 -46 0 -58" stroke="#5e4632" strokeWidth="4" fill="none" strokeLinecap="round" />
                  <circle cx="-6" cy="-40" r="14" fill="#2d4734" opacity="0.9" />
                  <circle cx="8" cy="-52" r="16" fill="#385841" opacity="0.95" />
                  <circle cx="-2" cy="-62" r="13" fill="#446a4f" opacity="0.9" />
                  {/* White Fragrant Flowers */}
                  <circle cx="-5" cy="-42" r="2" fill="#ffffff" />
                  <circle cx="6" cy="-50" r="2.2" fill="#ffffff" />
                  <circle cx="-1" cy="-60" r="2.5" fill="#ffffff" />
                </g>

                {/* Floating Cool Breeze Lines */}
                <path
                  d="M 90 240 Q 150 215 210 230 T 330 220"
                  stroke="#64c99b"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  opacity="0.6"
                >
                  <animate attributeName="stroke-dashoffset" from="30" to="0" dur="3s" repeatCount="indefinite" />
                </path>
                <path
                  d="M 120 220 Q 200 195 280 205 T 390 195"
                  stroke="#64c99b"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  opacity="0.4"
                >
                  <animate attributeName="stroke-dashoffset" from="24" to="0" dur="2.5s" repeatCount="indefinite" />
                </path>
              </svg>

              {/* Dynamic Badge Over Visual */}
              <div className="absolute bottom-3 left-3 bg-[#0c1012]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#21292e] text-[11px] text-[#95a5b2] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a86a]" />
                Góc mở cánh mộng: <strong className="text-[#f4efe6]">{state.hingeAngle}°</strong> · Bệ Bonsai:{" "}
                <strong className="text-[#f4efe6]">{state.rotationAngle}°</strong>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-[#182026] p-3.5 rounded-xl border border-[#26333c]">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#95a5b2]">Độ Mở Cửa Gấp Mộng Gỗ</span>
                  <span className="text-[#c9a86a] font-mono">{state.hingeAngle}° / 180°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="180"
                  value={state.hingeAngle}
                  onChange={(e) => setState((s) => ({ ...s, hingeAngle: parseInt(e.target.value) }))}
                  className="w-full accent-[#c9a86a] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#697a87] mt-1">
                  <span>Khép kín (0°)</span>
                  <span>Đón gió tối đa (180°)</span>
                </div>
              </div>

              <div className="bg-[#182026] p-3.5 rounded-xl border border-[#26333c]">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#95a5b2]">Góc Xoay Bệ Nguyệt Quế 250 Năm</span>
                  <span className="text-[#64c99b] font-mono">{state.rotationAngle}° / 360°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={state.rotationAngle}
                  onChange={(e) => setState((s) => ({ ...s, rotationAngle: parseInt(e.target.value) }))}
                  className="w-full accent-[#64c99b] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#697a87] mt-1">
                  <span>Hướng Đông</span>
                  <span>Xoay toàn cảnh 360°</span>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Specifications (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Detail Tabs */}
            <div className="grid grid-cols-2 gap-2 bg-[#13191d] p-1.5 rounded-xl border border-[#21292e]">
              {[
                { id: "frame", label: "Gỗ Chùa Khảo 235Y" },
                { id: "hinges", label: "Trục Cối Gỗ Mun" },
                { id: "moat", label: "Hào Nước Serpentine" },
                { id: "bonsai", label: "Nguyệt Quế Cổ Thụ" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setState((s) => ({ ...s, selectedDetail: tab.id }))}
                  className={`text-xs py-2 px-3 rounded-lg font-medium transition-all ${
                    state.selectedDetail === tab.id
                      ? "bg-[#1f2931] text-[#c9a86a] border border-[#3b4c59] shadow-sm"
                      : "text-[#95a5b2] hover:text-[#e5eaed] hover:bg-[#182026]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Detail Card Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={state.selectedDetail}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="bg-[#13191d] border border-[#21292e] rounded-2xl p-6 relative"
              >
                <div className="text-[11px] text-[#c9a86a] uppercase tracking-wider font-semibold mb-1">
                  Hồ Sơ Chế Tác Độc Bản
                </div>
                <h3 className="text-xl font-serif text-[#f4efe6] mb-1">
                  {detailsInfo[state.selectedDetail]?.title}
                </h3>
                <div className="text-xs text-[#95a5b2] italic mb-4">
                  {detailsInfo[state.selectedDetail]?.subtitle}
                </div>
                <p className="text-sm text-[#b4c1cb] leading-relaxed mb-6">
                  {detailsInfo[state.selectedDetail]?.desc}
                </p>

                <div className="border-t border-[#21292e] pt-4">
                  <div className="text-[11px] text-[#697a87] uppercase tracking-wider mb-1">Chỉ Số Thử Nghiệm</div>
                  <div className="text-xs font-medium text-[#64c99b]">
                    {detailsInfo[state.selectedDetail]?.stats}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* GuHomes Craftsmanship Guarantee */}
            <div className="bg-[#10161a] border border-[#1e272e] rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#c9a86a]/10 border border-[#c9a86a]/20 flex items-center justify-center shrink-0 text-[#c9a86a]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="text-xs">
                <div className="font-medium text-[#f4efe6] mb-1">Bảo Chứng Kỹ Thuật Vi Khí Hậu GuHomes</div>
                <p className="text-[#8899a6] leading-relaxed">
                  Thiết kế được kiểm nghiệm khí động học CFD và thử tải trực tiếp tại xưởng Thạnh Xuân 1.200m², cam kết hạ nhiệt độ thực tế -7.2°C và giới hạn 12 công trình biệt thự độc bản mỗi năm.
                </p>
                <div className="mt-2 text-[#c9a86a] font-mono text-[11px]">Hotline KTS Trưởng: 0368 757 916</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SaigonCanalSideAncientHingedChuaKhaoMoatPavilion;
