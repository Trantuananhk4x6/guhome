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
    scentProfile: "Hương sữa đường mật, thơm sâu ngọt ngào quyến rũ, ngát hương qua 3 tầng biến chuyển",
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
    scentProfile: "Hương hoa quả thanh nhã, hậu ngọt đậm đà, lưu dẫn sinh khí minh mẫn",
    resonanceHz: 741,
  },
  {
    id: "thanh-ky",
    name: "Thanh Kỳ Đại Lãnh",
    origin: "Đèo Đại Lãnh Sơn Trạch, Khánh Hòa",
    purity: "96.5% Sắc Xanh Xám Ánh Tím Huyền Bí",
    scentProfile: "Hương the lạnh mát sảng khoái kết hợp mật ong rừng đại ngàn, thanh lọc thần thức",
    resonanceHz: 852,
  },
  {
    id: "huynh-ky",
    name: "Huỳnh Kỳ Cam Ranh",
    origin: "Rừng Cát Cổ Thụ Bán Đảo Cam Ranh",
    purity: "95.8% Sắc Nâu Vàng Óng Ánh Men Trầm",
    scentProfile: "Hương mộc trầm hương dịu ngọt, an định thần trí, xoa dịu áp lực tinh thần",
    resonanceHz: 963,
  },
];

export function BespokeImperialKynamAndGoldFiligreeSnakeLotusIncenseBurnerVault() {
  const [selectedKynam, setSelectedKynam] = useState<KynamSpec>(KYNAM_VARIETIES[0]!);
  const [targetTemp, setTargetTemp] = useState<number>(145);
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
    <section className="relative w-full bg-[#0d1012] text-[#e8ebed] py-20 px-4 md:px-8 lg:px-16 overflow-hidden border-t border-b border-[#232b30]">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-[#8f6d2e] blur-[130px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-[#355648] blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#232b30]/80 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172026] border border-[#2d3d47] text-xs font-mono tracking-wider text-[#cb9b51] mb-4">
              <span>BẢO THẤT THƯ PHÒNG THƯỢNG PHẨM</span>
              <span>·</span>
              <span>SPRINT 126</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#f4f7f8] tracking-tight leading-tight">
              Bảo Thất Kỳ Nam & Đỉnh Lư Vàng 24K Filigree Xà Thần Đạp Sen
            </h2>
            <p className="mt-3 text-base md:text-lg text-[#9da9b0] font-light max-w-3xl leading-relaxed">
              Tuyệt phẩm đỉnh xông trầm cung đình chạm trổ Kim Xà dâng ngọc liên hoa bằng sợi vàng 24K Filigree 0.18mm ngự trên án gỗ Trắc đen bách niên khảm Phỉ Thúy Type A, điều nhiệt vi sai 80°C - 240°C bảo toàn trọn vẹn tinh dầu Kỳ Nam thượng hạng.
            </p>
          </div>

          <button
            onClick={() => playIncenseBell(selectedKynam.resonanceHz)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-mono tracking-wider uppercase transition-all duration-300 ${
              isPlayingAudio
                ? "bg-[#cb9b51] text-[#0d1012] shadow-[0_0_20px_rgba(203,155,81,0.4)]"
                : "bg-[#182329] text-[#cb9b51] border border-[#3b4c56] hover:border-[#cb9b51]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <span>{isPlayingAudio ? "Chuông Đang Ngân Vang" : `Chuông Vàng Solfeggio ${selectedKynam.resonanceHz}Hz`}</span>
          </button>
        </div>

        {/* Central Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Incense Burner & Chamber Visualizer (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-[#12181c] rounded-sm border border-[#232b30] p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px]">
            {/* Ambient Smoked Aura */}
            <motion.div
              animate={{ opacity: isHeating ? [0.2, 0.45, 0.2] : 0.05, scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-72 h-72 rounded-full bg-[radial-gradient(ellipse_at_center,#cb9b51_0%,transparent_70%)] blur-[40px] pointer-events-none"
            />

            {/* Spec Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="px-2.5 py-1 rounded bg-[#0a0e10]/80 border border-[#232b30] text-[11px] font-mono text-[#cb9b51]">
                Nhiệt độ đĩa nhiệt: {targetTemp}°C
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0a0e10]/80 border border-[#232b30] text-[11px] font-mono text-[#76a892]">
                Khói khét: 0.0% (Vi Nhiệt Tĩnh)
              </span>
              <span className="px-2.5 py-1 rounded bg-[#0a0e10]/80 border border-[#232b30] text-[11px] font-mono text-[#cbd9e0]">
                Ruột đồng đỏ đúc: 10mm
              </span>
            </div>

            {/* Central Incense Vault Representation */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-center justify-center my-6">
              {/* Outer Golden Aura Ring */}
              <div className="absolute inset-0 rounded-full border border-[#cb9b51]/30 animate-pulse" />

              {/* Incense Burner Silhouette Representation */}
              <div className="relative w-44 h-44 rounded-2xl bg-gradient-to-t from-[#1a140b] via-[#2d2212] to-[#47361a] border-2 border-[#cb9b51] shadow-[0_0_35px_rgba(203,155,81,0.25)] flex flex-col items-center justify-center p-4 text-center">
                {/* Filigree Motif Icon */}
                <div className="w-12 h-12 rounded-full bg-[#120d06] border border-[#cb9b51]/60 flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-[#cb9b51]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-xs font-serif text-[#f2e6cf] font-medium leading-tight">Đỉnh Lư Kim Xà</span>
                <span className="text-[10px] font-mono text-[#cb9b51] mt-0.5">Sợi Vàng 24K Filigree</span>
                <span className="text-[9px] font-mono text-[#a3b0b8] mt-1">Đế Trắc Đen 180 Năm Cẩn Ngọc</span>
              </div>
            </div>

            {/* Microclimate Temperature Control */}
            <div className="w-full mt-4 pt-4 border-t border-[#232b30]/80">
              <div className="flex justify-between items-center text-xs font-mono mb-2 text-[#9da9b0]">
                <span>Kiểm Soát Vi Nhiệt Độ Xông Trầm Không Khói (80°C - 240°C)</span>
                <span className="text-[#cb9b51] font-bold">{targetTemp}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={targetTemp}
                onChange={(e) => setTargetTemp(Number(e.target.value))}
                className="w-full h-1.5 bg-[#172228] rounded-lg appearance-none cursor-pointer accent-[#cb9b51]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#6c7d87] mt-1.5">
                <span>80°C: Thoát Tinh Dầu Đầu</span>
                <span>145°C: Ngọt Sâu Chuẩn Mực</span>
                <span>240°C: Tầng Khí Cuối</span>
              </div>
            </div>
          </div>

          {/* Kynam Selection & Technical Appraisal (Right 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="p-4 bg-[#12181c] rounded-sm border border-[#232b30]">
              <span className="text-[11px] font-mono text-[#cb9b51] uppercase tracking-wider block mb-3">
                Ngũ Tuyệt Trầm Kỳ Khánh Hòa Tinh Tuyển
              </span>
              <div className="flex flex-col gap-2">
                {KYNAM_VARIETIES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedKynam(item);
                      playIncenseBell(item.resonanceHz);
                    }}
                    className={`p-3 rounded-xs text-left transition-all duration-200 border flex flex-col gap-1 ${
                      selectedKynam.id === item.id
                        ? "bg-[#1c272e] border-[#cb9b51] text-[#f4f7f8] shadow-sm"
                        : "bg-[#0e1317] border-[#232b30] text-[#8e9fa8] hover:text-[#d3dde3] hover:border-[#384a54]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-medium text-[#f2e6cf]">{item.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131b20] border border-[#2a3840] text-[#cb9b51]">
                        {item.resonanceHz}Hz
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#8a9ca7]">{item.origin}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Kynam Appraisal Box */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedKynam.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-5 bg-[#12181c] rounded-sm border border-[#232b30] flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#76a892] uppercase">Chứng Thư Thẩm Định Trầm Hương</span>
                  <span className="text-[10px] font-mono text-[#cb9b51]">{selectedKynam.purity}</span>
                </div>
                <p className="text-xs text-[#b8c6cc] font-light leading-relaxed">
                  {selectedKynam.scentProfile}
                </p>
                <div className="pt-3 border-t border-[#232b30] flex items-center justify-between text-[11px] font-mono text-[#7d909a]">
                  <span>Vàng 24K Filigree Thủ Công 0.18mm</span>
                  <span className="text-[#cb9b51]">Độc Bản Cung Đình</span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Brand Assurance Box */}
            <div className="bg-[#0f1418] rounded-sm border border-[#232b30] p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-serif text-[#dbe5eb]">Bảo Thất Thư Phòng GuHomes</p>
                <p className="text-[11px] font-mono text-[#6c7f8a]">Xưởng Thạnh Xuân Quận 12 - May đo độc bản</p>
              </div>
              <a
                href="mailto:guhomesvn@gmail.com"
                className="px-3.5 py-2 rounded-xs bg-[#1a252c] hover:bg-[#25353f] text-[#cbd9e0] border border-[#344550] text-xs font-mono transition-colors"
              >
                guhomesvn@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BespokeImperialKynamAndGoldFiligreeSnakeLotusIncenseBurnerVault;
