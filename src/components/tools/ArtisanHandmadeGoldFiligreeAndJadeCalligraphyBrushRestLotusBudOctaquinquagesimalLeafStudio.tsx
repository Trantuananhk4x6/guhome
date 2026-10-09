'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LeafDetail {
  leafIndex: number;
  jadeTranslucency: string;
  goldFiligreeGauge: string;
  angleDeg: number;
  resonanceHz: number;
  symbolicMeaning: string;
}

const LEAF_DATA: LeafDetail[] = [
  {
    leafIndex: 1,
    jadeTranslucency: '99.99% Băng Chủng',
    goldFiligreeGauge: '0.12mm Sợi Vàng 24K',
    angleDeg: 0,
    resonanceHz: 528,
    symbolicMeaning: 'Khởi Tâm Bồ Đề - Cánh sen đầu tiên khai mở năng lượng sáng tạo'
  },
  {
    leafIndex: 18,
    jadeTranslucency: '99.98% Phỉ Thúy Lý Gia',
    goldFiligreeGauge: '0.10mm Kéo Sợi Vi Mô',
    angleDeg: 115,
    resonanceHz: 639,
    symbolicMeaning: 'Thập Bát La Hán Trấn Hộ - Gia cố tâm thức vững chãi khi hạ bút'
  },
  {
    leafIndex: 36,
    jadeTranslucency: '99.99% Thúy Ngọc Lam Điền',
    goldFiligreeGauge: '0.08mm Chạm Cổ Điển',
    angleDeg: 230,
    resonanceHz: 852,
    symbolicMeaning: 'Tam Thập Lục Thiên Cương - Hòa hợp tinh hoa đất trời trong từng nét mực'
  },
  {
    leafIndex: 58,
    jadeTranslucency: '100% Đế Vương Lục Băng Chủng',
    goldFiligreeGauge: '0.06mm Vi Kỹ Nghệ Filigree Cung Đình',
    angleDeg: 350,
    resonanceHz: 1056,
    symbolicMeaning: 'Ngũ Thập Bát Diệp Viên Mãn - Hoàn thiện 58 cánh sen tôn quý bảo hộ ngự bút'
  }
];

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudOctaquinquagesimalLeafStudio() {
  const [selectedLeaf, setSelectedLeaf] = useState<LeafDetail>(LEAF_DATA[0]!);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stopAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch {
        // ignore
      }
      oscRef.current = null;
    }
    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const playTone = (frequency: number) => {
    stopAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.03, ctx.currentTime + 1.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setIsPlayingAudio(true);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const toggleSound = () => {
    if (isPlayingAudio) {
      stopAudio();
    } else {
      playTone(selectedLeaf.resonanceHz);
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  useEffect(() => {
    if (isPlayingAudio && audioCtxRef.current && oscRef.current) {
      const now = audioCtxRef.current.currentTime;
      oscRef.current.frequency.cancelScheduledValues(now);
      oscRef.current.frequency.setValueAtTime(selectedLeaf.resonanceHz, now);
    }
  }, [selectedLeaf]);

  return (
    <section className="relative py-24 bg-stone-950 text-stone-100 overflow-hidden border-b border-amber-900/30">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.05),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,119,6,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Văn Phòng Tứ Bảo · Tuyệt Phẩm Kê Ngự Bút V58
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-100 font-normal tracking-tight">
            Kê Ngự Bút Sen Ngũ Thập Bát Diệp Phỉ Thúy Nẹp Vàng 24K
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg font-light leading-relaxed">
            Tuyệt tác thủ công đỉnh cao chế tác 58 cánh sen từ ngọc Phỉ Thúy Type A Myanmar nẹp viền chỉ vàng ròng 24K Filigree trên bệ gỗ Mun Hoa 400 năm tuổi, kiến tạo không gian thư họa an tĩnh và uy nghiêm.
          </p>
        </div>

        {/* Master Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Anatomy Selection */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md">
              <h3 className="text-sm font-mono uppercase text-emerald-400 tracking-wider mb-4">
                Khảo Sát Giải Phẫu 58 Cánh Sen
              </h3>
              <div className="space-y-3">
                {LEAF_DATA.map((leaf) => (
                  <button
                    key={leaf.leafIndex}
                    onClick={() => {
                      setSelectedLeaf(leaf);
                      setRotationAngle(leaf.angleDeg);
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 min-h-[44px] flex flex-col justify-center ${
                      selectedLeaf.leafIndex === leaf.leafIndex
                        ? 'bg-emerald-950/40 border border-emerald-600/50 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                        : 'bg-stone-800/40 border border-stone-800 text-stone-300 hover:bg-stone-800/80 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>Cánh Thứ {leaf.leafIndex} / 58 Diệp</span>
                      <span className="text-xs font-mono text-emerald-400">{leaf.resonanceHz}Hz</span>
                    </div>
                    <span className="text-xs text-stone-400 mt-1 line-clamp-1">
                      {leaf.symbolicMeaning}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Microscopic Zoom & Rotation Slider */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase text-emerald-400 tracking-wider">
                  Kính Phóng Đại Kỹ Thuật Số (1x - 3x)
                </h3>
                <span className="text-xs font-mono text-emerald-300">{zoomLevel.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoomLevel}
                onChange={(e) => setZoomLevel(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
              />

              <div className="pt-3 border-t border-stone-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-stone-300">Góc Xoay Thấu Kính</span>
                  <span className="text-xs font-mono text-amber-400">{rotationAngle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              {/* Sound Harmonizer */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-stone-200">Âm Ba Ngọc Bích Thanh Khiết</div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    {selectedLeaf.resonanceHz}Hz · Dao Động Tĩnh Lặng
                  </div>
                </div>
                <button
                  onClick={toggleSound}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center gap-2 ${
                    isPlayingAudio
                      ? 'bg-emerald-500 text-stone-950 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-stone-950 animate-ping' : 'bg-stone-500'}`} />
                  {isPlayingAudio ? 'Tắt Hòa Âm' : 'Lắng Nghe'}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Viewport Display */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-stone-800 relative overflow-hidden shadow-2xl">
              <div className="relative aspect-[16/10] rounded-2xl bg-stone-950 border border-stone-800/80 overflow-hidden flex items-center justify-center">
                <svg
                  className="w-full h-full p-8 transition-transform duration-500"
                  style={{
                    transform: `scale(${zoomLevel}) rotate(${rotationAngle}deg)`,
                    transformOrigin: 'center center'
                  }}
                  viewBox="0 0 600 380"
                  fill="none"
                >
                  {/* Mun Wood Altar Base */}
                  <rect x="140" y="270" width="320" height="30" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" rx="3" />
                  <line x1="160" y1="285" x2="440" y2="285" stroke="#78716c" strokeWidth="0.8" strokeDasharray="10 5" opacity="0.6" />

                  {/* Lotus Pedestal Base */}
                  <ellipse cx="300" cy="265" rx="100" ry="20" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />

                  {/* 58 Outer Lotus Leaves Filigree Array */}
                  <g transform="translate(300, 240)">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const angle = (i * 360) / 28;
                      const rad = (angle * Math.PI) / 180;
                      const x1 = Math.cos(rad) * 75;
                      const y1 = Math.sin(rad) * 22;
                      return (
                        <path
                          key={i}
                          d={`M0,0 Q${x1 * 0.7},${y1 - 15} ${x1},${y1}`}
                          stroke="#fbbf24"
                          strokeWidth="1.2"
                          opacity="0.75"
                          fill="none"
                        />
                      );
                    })}
                  </g>

                  {/* Inner Lotus Leaves Jade Petals Array */}
                  <g transform="translate(300, 225)">
                    {Array.from({ length: 30 }).map((_, i) => {
                      const angle = (i * 360) / 30;
                      const rad = (angle * Math.PI) / 180;
                      const x1 = Math.cos(rad) * 55;
                      const y1 = Math.sin(rad) * 16;
                      return (
                        <ellipse
                          key={i}
                          cx={x1}
                          cy={y1 - 8}
                          rx="14"
                          ry="7"
                          fill="#047857"
                          stroke="#34d399"
                          strokeWidth="1"
                          opacity="0.8"
                          transform={`rotate(${angle} ${x1} ${y1 - 8})`}
                        />
                      );
                    })}
                  </g>

                  {/* Central Lotus Bud Brush Rest Notch */}
                  <path
                    d="M260,195 C275,170 285,160 300,160 C315,160 325,170 340,195 C330,210 270,210 260,195 Z"
                    fill="#065f46"
                    stroke="#6ee7b7"
                    strokeWidth="1.5"
                  />
                  {/* Gold Filigree Cap on Lotus Bud Notch */}
                  <path
                    d="M275,178 Q300,165 325,178"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Calligraphy Brush Silhouette Resting atop Lotus Notch */}
                  <path
                    d="M170,140 L430,200 L425,206 L165,146 Z"
                    fill="#292524"
                    stroke="#d97706"
                    strokeWidth="1"
                    opacity="0.9"
                  />
                  {/* Brush Hair Tip */}
                  <path
                    d="M165,146 C150,142 140,135 130,132 C145,145 155,148 170,140 Z"
                    fill="#f5f5f4"
                    stroke="#d4d4d4"
                    strokeWidth="0.8"
                  />
                  {/* Brush Gold Ferrule */}
                  <rect x="180" y="141" width="12" height="6" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" transform="rotate(13 186 144)" />
                </svg>

                {/* Floating Metric Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/80 border border-emerald-800 text-[11px] font-mono text-emerald-300">
                    Cánh Đang Xem: #{selectedLeaf.leafIndex} / 58
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/80 border border-stone-700 text-[11px] font-mono text-amber-300">
                    Chỉ Vàng: {selectedLeaf.goldFiligreeGauge}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 text-right">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/80 border border-stone-700 text-[11px] font-mono text-stone-300">
                    Độ Trong: {selectedLeaf.jadeTranslucency}
                  </span>
                </div>
              </div>

              {/* Leaf Philosophy Narrative */}
              <div className="mt-6">
                <h4 className="text-xl font-serif text-stone-100 font-normal">
                  Cánh Sen Ngũ Thập Bát #{selectedLeaf.leafIndex} · Ý Nghĩa Biểu Tượng
                </h4>
                <p className="mt-2 text-sm text-stone-300 leading-relaxed font-light">
                  {selectedLeaf.symbolicMeaning}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mt-6 pt-6 border-t border-stone-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-xs text-stone-400">Chủng Ngọc</div>
                  <div className="text-sm font-mono text-emerald-400 font-semibold mt-0.5">Phỉ Thúy Type A</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-xs text-stone-400">Nẹp Viền</div>
                  <div className="text-sm font-mono text-amber-400 font-semibold mt-0.5">Vàng 24K Filigree</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-xs text-stone-400">Đế Đỡ</div>
                  <div className="text-sm font-mono text-stone-300 font-semibold mt-0.5">Mun Hoa 400 Năm</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/80">
                  <div className="text-xs text-stone-400">Hòa Âm Bát Độ</div>
                  <div className="text-sm font-mono text-indigo-400 font-semibold mt-0.5">{selectedLeaf.resonanceHz}Hz</div>
                </div>
              </div>

              {/* Atelier Verification & Direct Hotline */}
              <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-900/40 space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                  <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Xưởng May Đo Nội Thất Thạnh Xuân 1.200m² - GuHomes</span>
                </div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Được cấp giấy chứng thư bảo chứng ngọc quý tự nhiên và vàng ròng 24K tiêu chuẩn quốc gia. Đảm bảo không hao mòn theo thời gian.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Trực Tiếp KTS Trưởng:</span>
                  <a
                    href="tel:0368757916"
                    className="text-amber-400 hover:text-amber-300 font-mono font-medium min-h-[44px] inline-flex items-center"
                  >
                    0368 757 916
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudOctaquinquagesimalLeafStudio;
