"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface KynamSpec {
  id: string;
  name: string;
  origin: string;
  purity: string;
  scentProfile: string;
  resonanceHz: number;
}

const KYNAM_VARIETIES: KynamSpec[] = [
  {
    id: "bach-ky",
    name: "Bạch Kỳ Vạn Giã",
    origin: "Đại Ngàn Rừng Sâu Vạn Giã, Khánh Hòa",
    purity: "99.8% Trữ Lượng Nhựa Trầm Tự Nhiên",
    scentProfile: "Hương sữa đường mật ngào ngạt, thấm sâu vào tâm can, ngát hương qua 3 tầng biến chuyển diệu kỳ",
    resonanceHz: 528,
  },
  {
    id: "hac-ky",
    name: "Hắc Kỳ Vạn Ninh",
    origin: "Rừng Già Vạn Ninh, Khánh Hòa",
    purity: "99.2% Hóa Nhựa Đen Bóng Như Hắc Thạch",
    scentProfile: "Hương thảo mộc trầm hùng, cay ấm dịu nhẹ, giữ hương sâu lắng bền bỉ 48 giờ",
    resonanceHz: 639,
  },
  {
    id: "hoang-ky",
    name: "Hoàng Kỳ Hòn Hèo",
    origin: "Bán Đảo Hòn Hèo, Vịnh Nha Phu",
    purity: "97.8% Sắc Vàng Ánh Kim Hổ Phách",
    scentProfile: "Hương hoa quả thanh nhã, hậu ngọt đậm đà, lưu dẫn sinh khí minh mẫn cho gia chủ",
    resonanceHz: 741,
  },
  {
    id: "thanh-ky",
    name: "Thanh Kỳ Đại Lãnh",
    origin: "Đèo Đại Lãnh Sơn Trạch, Khánh Hòa",
    purity: "96.5% Sắc Xanh Xám Ánh Tím Huyền Bí",
    scentProfile: "Hương the lạnh mát sảng khoái kết hợp mật ong rừng đại ngàn, thanh lọc thần thức an nhiên",
    resonanceHz: 852,
  },
  {
    id: "huynh-ky",
    name: "Huỳnh Kỳ Cam Ranh",
    origin: "Rừng Cát Cổ Thụ Bán Đảo Cam Ranh",
    purity: "95.8% Sắc Nâu Vàng Óng Ánh Men Trầm",
    scentProfile: "Hương mộc trầm hương dịu ngọt, an định thần trí, xoa dịu áp lực tinh thần hoàn hảo",
    resonanceHz: 963,
  },
];

export function BespokeImperialKynamAndGoldFiligreeCockLotusIncenseBurnerVault() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KYNAM_VARIETIES[0]!);
  const [targetTemp, setTargetTemp] = useState<number>(148);
  const [isHeating, setIsHeating] = useState<boolean>(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playIncenseBell = (freqHz: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Solfeggio Dual Bell Resonance
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(freqHz, ctx.currentTime);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(freqHz * 1.5, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.0);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 3.0);
      osc2.stop(ctx.currentTime + 3.0);

      setIsPlayingAudio(true);
      setTimeout(() => setIsPlayingAudio(false), 3000);
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
    <section className="relative w-full bg-[#0a0d0f] text-[#e8edf0] py-20 px-4 md:px-8 lg:px-16 overflow-hidden border-t border-b border-[#1f272c]">
      {/* Golden Glow Backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#d4af37]/20 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#2a453b]/30 blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#1f272c] pb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e5c158] animate-pulse" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#e5c158] font-medium">
                Tuyệt Tác Thưởng Trầm Hoàng Gia · GuHomes Vault
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-[#fbf8f2] tracking-tight">
              Bảo Thất Kỳ Nam & Đỉnh Lư Kim Kê Đạp Sen Filigree 24K
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <button
              onClick={() => playIncenseBell(selectedKynam.resonanceHz)}
              disabled={isPlayingAudio}
              className={`px-4 py-2 rounded-full border text-xs tracking-wider transition-all duration-300 flex items-center gap-2 ${
                isPlayingAudio
                  ? "border-[#e5c158] bg-[#e5c158]/20 text-[#fbf8f2]"
                  : "border-[#313f47] text-[#9bb0be] hover:border-[#e5c158] hover:text-[#fbf8f2]"
              }`}
            >
              <svg className="w-4 h-4 text-[#e5c158]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
              <span>{isPlayingAudio ? "Chuông Khánh Định Tâm..." : `Khánh Ngân (${selectedKynam.resonanceHz}Hz)`}</span>
            </button>
            <div className="text-xs text-[#9bb0be] border border-[#1f272c] px-3.5 py-1.5 rounded-full bg-[#111619]">
              Án Trắc Đen Bách Niên · Nẹp Vàng 24K
            </div>
          </div>
        </div>

        {/* Main Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 bg-[#11171a] border border-[#1f272c] rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs text-[#9bb0be]">
                <span className="w-2 h-2 rounded-full bg-[#e5c158]" />
                Mô Phỏng Buồng Gia Nhiệt Vi Phân Không Khói
              </div>
              <div className="text-xs font-mono text-[#e5c158]">
                {isHeating ? `Đang Duy Trì Nhiệt: ${targetTemp}°C` : "Đã Tắt Gia Nhiệt"}
              </div>
            </div>

            {/* SVG Visual Representation of Cock Lotus Incense Burner */}
            <div className="relative w-full aspect-[16/10] bg-[#070a0c] rounded-xl overflow-hidden border border-[#1a2226] flex items-center justify-center p-4">
              <svg className="w-full h-full max-w-[480px]" viewBox="0 0 480 320" fill="none">
                {/* Altar of Ancient Rosewood (Án Gỗ Trắc Đen) */}
                <rect x="80" y="270" width="320" height="25" rx="3" fill="#181310" stroke="#3d2d22" strokeWidth="2" />
                <rect x="100" y="295" width="25" height="20" fill="#100c0a" />
                <rect x="355" y="295" width="25" height="20" fill="#100c0a" />
                {/* Jade Filigree inlays on table */}
                <rect x="130" y="278" width="220" height="6" fill="#1f3a2f" stroke="#e5c158" strokeWidth="0.8" rx="2" />

                {/* Incense Burner Base - Jade Pad (Bệ Phỉ Thúy Type A) */}
                <ellipse cx="240" cy="265" rx="100" ry="18" fill="#1a3328" stroke="#3d6c57" strokeWidth="2" />
                <ellipse cx="240" cy="263" rx="85" ry="14" fill="#244738" stroke="#e5c158" strokeWidth="1" />

                {/* Gold Lotus Petals Tier 1 & 2 */}
                <path d="M 160 255 Q 185 220 240 235 Q 295 220 320 255 Z" fill="#b8860b" stroke="#ffd700" strokeWidth="1.5" />
                <path d="M 180 245 Q 210 215 240 225 Q 270 215 300 245 Z" fill="#d4af37" stroke="#fff8dc" strokeWidth="1" />

                {/* Central Incense Chamber (Buồng Gia Nhiệt) */}
                <rect x="210" y="170" width="60" height="60" rx="8" fill="#2b1c10" stroke="#e5c158" strokeWidth="2" />
                {/* Internal Heat Glow */}
                {isHeating && (
                  <circle
                    cx="240"
                    cy="200"
                    r={20 + (targetTemp - 80) / 10}
                    fill="#ff6b35"
                    opacity={0.35 + (targetTemp - 80) / 300}
                    className="transition-all duration-300"
                  />
                )}

                {/* Filigree Cock Figurine on Top of Lotus (Kim Kê Đạp Sen) */}
                <g transform="translate(240, 150)">
                  {/* Cock Tail Plumes - Gold Filigree */}
                  <path d="M -8 -15 Q -35 -40 -30 -65 Q -15 -45 -6 -25" fill="none" stroke="#ffd700" strokeWidth="2.5" />
                  <path d="M -10 -12 Q -45 -30 -42 -55 Q -22 -35 -8 -20" fill="none" stroke="#e5c158" strokeWidth="2" />
                  <path d="M -6 -10 Q -25 -50 -18 -75 Q -5 -50 -4 -25" fill="none" stroke="#fff8dc" strokeWidth="1.5" />

                  {/* Cock Body & Chest */}
                  <ellipse cx="0" cy="-15" rx="14" ry="18" fill="#d4af37" stroke="#ffd700" strokeWidth="1.5" />
                  <path d="M -8 -20 Q 0 -35 10 -25 Q 15 -10 5 -5 Z" fill="#b8860b" />

                  {/* Cock Crown & Beak (Mào Kim Kê & Mỏ ngậm như ý) */}
                  <circle cx="8" cy="-35" r="7" fill="#ffd700" stroke="#b8860b" strokeWidth="1" />
                  {/* Crown */}
                  <path d="M 6 -42 L 8 -49 L 11 -43 L 14 -48 L 15 -40" stroke="#ff4d4d" strokeWidth="2" fill="none" strokeLinecap="round" />
                  {/* Beak & Ruyi Scepter */}
                  <polygon points="15,-36 22,-34 15,-32" fill="#e5c158" />
                  <path d="M 20 -34 Q 30 -30 38 -36 Q 42 -40 40 -33" stroke="#ffd700" strokeWidth="2" fill="none" />

                  {/* Strong Cock Legs Standing on Lotus Center */}
                  <line x1="-5" y1="2" x2="-6" y2="18" stroke="#d4af37" strokeWidth="3" />
                  <line x1="5" y1="2" x2="6" y2="18" stroke="#d4af37" strokeWidth="3" />
                  <line x1="-10" y1="18" x2="2" y2="18" stroke="#ffd700" strokeWidth="2" />
                  <line x1="2" y1="18" x2="14" y2="18" stroke="#ffd700" strokeWidth="2" />
                </g>

                {/* Fragrant Aromatic Wisps (Khói Kỳ Nam thanh nhã) */}
                {isHeating && (
                  <g opacity="0.65">
                    <path
                      d="M 235 160 Q 220 120 245 90 T 235 40"
                      stroke="#f5e6b8"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="4 8"
                    >
                      <animate attributeName="stroke-dashoffset" from="24" to="0" dur="3s" repeatCount="indefinite" />
                    </path>
                    <path
                      d="M 245 160 Q 260 115 235 85 T 250 35"
                      stroke="#f5e6b8"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray="3 6"
                    >
                      <animate attributeName="stroke-dashoffset" from="18" to="0" dur="2.5s" repeatCount="indefinite" />
                    </path>
                  </g>
                )}
              </svg>

              {/* Dynamic Badge */}
              <div className="absolute bottom-3 left-3 bg-[#0a0d0f]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#1f272c] text-[11px] text-[#9bb0be] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#e5c158]" />
                Kỳ Nam: <strong className="text-[#fbf8f2]">{selectedKynam.name}</strong> · Nhiệt độ lý tưởng:{" "}
                <strong className="text-[#e5c158]">{targetTemp}°C</strong>
              </div>
            </div>

            {/* Precision Temperature Control Slider */}
            <div className="mt-6 bg-[#141b1f] p-4 rounded-xl border border-[#243037]">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#9bb0be]">Điều Khiển Nhiệt Độ Vi Phân Không Khói</span>
                  <button
                    onClick={() => setIsHeating(!isHeating)}
                    className={`text-[10px] px-2 py-0.5 rounded ${
                      isHeating ? "bg-[#e5c158]/20 text-[#e5c158] border border-[#e5c158]/40" : "bg-[#253037] text-[#8699a7]"
                    }`}
                  >
                    {isHeating ? "ĐANG ĐỐT" : "TẠM DỪNG"}
                  </button>
                </div>
                <span className="font-mono text-sm font-semibold text-[#e5c158]">{targetTemp}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                step="1"
                value={targetTemp}
                onChange={(e) => setTargetTemp(parseInt(e.target.value))}
                className="w-full accent-[#e5c158] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#637785] mt-1.5">
                <span>80°C (Dẫn hương hoa đầu)</span>
                <span>148°C (Tối ưu tiết nhựa mật Kỳ Nam)</span>
                <span>240°C (Nhiệt cực đại bảo lưu)</span>
              </div>
            </div>
          </div>

          {/* Scent Profiles & Selection (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="text-xs text-[#9bb0be] font-medium uppercase tracking-wider">
              Tuyển Chọn 5 Dòng Kỳ Nam Thượng Hạng
            </div>

            {/* Variety List */}
            <div className="space-y-2.5">
              {KYNAM_VARIETIES.map((kynam) => (
                <div
                  key={kynam.id}
                  onClick={() => setSelectedKynam(kynam)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedKynam.id === kynam.id
                      ? "bg-[#182126] border-[#e5c158] shadow-lg shadow-[#e5c158]/5"
                      : "bg-[#11171a] border-[#1f272c] hover:border-[#2f3d46] hover:bg-[#151c20]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-serif font-medium ${
                        selectedKynam.id === kynam.id ? "text-[#fbf8f2]" : "text-[#b2c3cf]"
                      }`}
                    >
                      {kynam.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#e5c158]">{kynam.resonanceHz}Hz</span>
                  </div>
                  <div className="text-[11px] text-[#6b808e] mb-1.5">{kynam.origin}</div>
                  <div className="text-xs text-[#8da3b3] line-clamp-2 leading-relaxed">{kynam.scentProfile}</div>
                </div>
              ))}
            </div>

            {/* Selected Spec Detail Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedKynam.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-[#11171a] border border-[#1f272c] rounded-2xl p-5"
              >
                <div className="text-[11px] text-[#e5c158] uppercase tracking-wider font-semibold mb-1">
                  Đặc Tính Khí Vị Hoàng Gia
                </div>
                <div className="text-sm font-medium text-[#fbf8f2] mb-1">{selectedKynam.purity}</div>
                <p className="text-xs text-[#8da3b3] leading-relaxed mb-4">{selectedKynam.scentProfile}</p>

                <div className="flex items-center justify-between border-t border-[#1f272c] pt-3 text-xs">
                  <span className="text-[#6b808e]">Tần số thanh lọc tâm trí:</span>
                  <span className="text-[#64c99b] font-mono font-medium">{selectedKynam.resonanceHz}Hz Solfeggio</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Atelier Assurance */}
            <div className="bg-[#0e1315] border border-[#1b2327] rounded-xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#e5c158]/10 border border-[#e5c158]/20 flex items-center justify-center shrink-0 text-[#e5c158] text-xs font-serif">
                Gu
              </div>
              <div className="text-xs text-[#7d92a0]">
                Chế tác thủ công giới hạn tại xưởng Thạnh Xuân 1.200m². Tư vấn trực tiếp bởi KTS Trưởng:{" "}
                <span className="text-[#e5c158] font-mono">0368 757 916</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BespokeImperialKynamAndGoldFiligreeCockLotusIncenseBurnerVault;
