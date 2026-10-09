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
    angleDeg: 120,
    resonanceHz: 639,
    symbolicMeaning: 'Thập Bát La Hán Trấn Hộ - Gia cố tâm thức vững chãi khi hạ bút'
  },
  {
    leafIndex: 36,
    jadeTranslucency: '99.99% Thúy Ngọc Lam Điền',
    goldFiligreeGauge: '0.08mm Chạm Cổ Điển',
    angleDeg: 240,
    resonanceHz: 852,
    symbolicMeaning: 'Tam Thập Lục Thiên Cương - Hòa hợp tinh hoa đất trời trong từng nét mực'
  },
  {
    leafIndex: 56,
    jadeTranslucency: '100% Cực Phẩm Thấu Quang',
    goldFiligreeGauge: '0.06mm Đỉnh Cao Kim Hoàn',
    angleDeg: 360,
    resonanceHz: 1056,
    symbolicMeaning: 'Ngũ Thập Lục Quẻ Cát Thái Hòa - Đỉnh cao công thái học nâng đỡ ngự bút trường tồn'
  }
];

export function ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudSexaquinquagesimalLeafStudio() {
  const [activeLeaf, setActiveLeaf] = useState<LeafDetail>(LEAF_DATA[3]!);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.25);
  const [magnification, setMagnification] = useState<number>(1);
  const [brushPlaced, setBrushPlaced] = useState<boolean>(true);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stopAudio = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (_) {}
      oscRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (_) {}
      audioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const startAudio = () => {
    stopAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.value = audioVolume;
      gain.connect(ctx.destination);
      gainRef.current = gain;

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(activeLeaf.resonanceHz, ctx.currentTime);
      osc.connect(gain);
      osc.start();

      oscRef.current = osc;
      setIsPlayingAudio(true);
    } catch (_) {
      setIsPlayingAudio(false);
    }
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      gainRef.current.gain.setValueAtTime(audioVolume, audioCtxRef.current.currentTime);
    }
  }, [audioVolume]);

  useEffect(() => {
    if (isPlayingAudio && oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(activeLeaf.resonanceHz, audioCtxRef.current.currentTime);
    }
  }, [activeLeaf, isPlayingAudio]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden border-t border-b border-amber-900/30">
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 text-xs tracking-widest uppercase">
            <span>Ngự Dụng Thư Phòng Đỉnh Cao</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>GuHomes Bespoke</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-serif font-light text-stone-100 leading-snug tracking-wide">
            Kê Ngự Bút Sen Ngũ Thập Lục Diệp 56 Cánh Phỉ Thúy Type A Nẹp Vàng 24K Filigree Trên Bệ Sưa Đỏ 400 Năm
          </h2>

          <p className="text-sm md:text-base text-stone-400 leading-relaxed font-sans font-light">
            Vật phẩm ngự dụng tối thượng cho bàn làm việc chủ nhân tinh hoa. 56 cánh sen phỉ thúy thấu quang 99.99% 
            kết hợp nẹp vàng thủ công 24K đan chỉ Filigree, nâng đỡ cán bút lông thỏ rừng theo tỉ lệ công thái học vàng.
          </p>
        </div>

        {/* Leaf Milestones Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEAF_DATA.map((leaf) => {
            const isSelected = leaf.leafIndex === activeLeaf.leafIndex;
            return (
              <button
                key={leaf.leafIndex}
                type="button"
                onClick={() => {
                  setActiveLeaf(leaf);
                  setRotationAngle(leaf.angleDeg);
                }}
                className={`text-left p-4 rounded-2xl transition-all duration-300 border min-h-[44px] ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/70 shadow-lg shadow-emerald-950/50'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
                  <span>Cánh #{leaf.leafIndex}/56</span>
                  <span>{leaf.resonanceHz}Hz</span>
                </div>
                <h3 className="text-sm font-serif font-medium text-stone-200 mb-1 leading-snug">
                  {leaf.symbolicMeaning.split(' - ')[0]}
                </h3>
                <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed">
                  {leaf.symbolicMeaning.split(' - ')[1]}
                </p>
                <div className="mt-3 pt-2 border-t border-stone-800 flex justify-between text-[11px] text-stone-400 font-mono">
                  <span className="text-emerald-300">{leaf.jadeTranslucency.split(' ')[0]}</span>
                  <span className="text-amber-300/80">{leaf.goldFiligreeGauge.split(' ')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Studio Interactive Bench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-stone-900/80 rounded-3xl p-6 md:p-8 border border-stone-800 backdrop-blur-sm">
          {/* Interactive Inspection Canvas */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border border-stone-800 flex flex-col items-center justify-center p-6 text-center">
              {/* Backlight translucency radiance */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_65%)] pointer-events-none" />

              {/* Graphic Representation of Lotus Rest */}
              <div
                style={{
                  transform: `scale(${magnification}) rotate(${rotationAngle}deg)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center justify-center"
              >
                {/* Placed Calligraphy Brush Representation */}
                {brushPlaced && (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute -top-10 w-72 h-3 bg-gradient-to-r from-amber-700 via-stone-800 to-stone-900 rounded-full border border-amber-500/60 shadow-xl flex items-center justify-between px-4 z-20"
                  >
                    <span className="text-[7px] text-amber-300 font-mono">Ngự Bút Ngọc Trúc</span>
                    <span className="text-[7px] text-stone-400 font-mono">Lông Thỏ Rừng Cực Phẩm</span>
                  </motion.div>
                )}

                {/* 56-Petal Lotus Bud Crown */}
                <div className="w-48 h-32 relative flex items-center justify-center">
                  {/* Surrounding Petals Ring */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <div
                      key={i}
                      style={{
                        transform: `rotate(${deg}deg) translateY(-36px)`,
                        transformOrigin: 'center center'
                      }}
                      className="absolute w-8 h-16 rounded-full bg-gradient-to-t from-emerald-600/40 via-emerald-400/20 to-emerald-200/50 border border-amber-400/60 shadow-lg backdrop-blur-sm"
                    />
                  ))}

                  {/* Core Lotus Cradle Nest */}
                  <div className="relative z-10 w-24 h-24 rounded-full border-2 border-amber-400/80 bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-950 flex flex-col items-center justify-center p-2 shadow-2xl">
                    <span className="text-[9px] font-serif text-amber-200 text-center leading-tight">
                      56 Diệp Thái Hòa
                    </span>
                    <span className="text-[8px] text-emerald-400 font-mono mt-1">
                      Thấu Quang 99.99%
                    </span>
                  </div>
                </div>

                {/* Sua Do Base Pedestal */}
                <div className="w-56 h-10 mt-2 bg-gradient-to-r from-red-950 via-stone-900 to-red-950 border-t-2 border-b-2 border-amber-700/60 rounded-xl flex items-center justify-center text-[10px] text-amber-200/90 font-mono shadow-xl">
                  Bệ Gỗ Sưa Đỏ Bắc Bộ 400 Năm Nguyên Khối
                </div>
              </div>

              {/* Status and Controls Ribbon */}
              <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-xs text-stone-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Độ zoom: {magnification}x
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Góc xoay: {rotationAngle}°
                </span>
              </div>
            </div>

            {/* Interactive Angle & Sound Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Rotation & Brush Controls */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-stone-300">Xoay 360° Góc Ngắm Vi Mô</span>
                  <button
                    type="button"
                    onClick={() => setBrushPlaced(!brushPlaced)}
                    className="text-[11px] font-mono text-amber-400 hover:text-amber-300 min-h-[36px] flex items-center"
                  >
                    {brushPlaced ? '[Hạ Bút Xuống]' : '[Gác Ngự Bút]'}
                  </button>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={15}
                  value={rotationAngle}
                  onChange={(e) => setRotationAngle(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-stone-800 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <button type="button" onClick={() => setMagnification(1)} className="hover:text-stone-300">1x Chuẩn</button>
                  <button type="button" onClick={() => setMagnification(1.25)} className="hover:text-stone-300">1.25x Cận Cảnh</button>
                  <button type="button" onClick={() => setMagnification(1.5)} className="hover:text-stone-300">1.5x Vi Khảo</button>
                </div>
              </div>

              {/* Sound Therapy Frequency */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-stone-300">
                    Tần Số Âm ({activeLeaf.resonanceHz}Hz)
                  </span>
                  <button
                    type="button"
                    onClick={toggleAudio}
                    className={`px-3 py-1 text-xs rounded-full border transition-all min-h-[44px] flex items-center justify-center ${
                      isPlayingAudio
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-stone-800 border-stone-700 text-stone-400'
                    }`}
                  >
                    {isPlayingAudio ? 'Dừng Tần Số' : 'Khởi Phát Tần Số'}
                  </button>
                </div>
                {isPlayingAudio && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                      <span>Âm Lượng</span>
                      <span>{Math.round(audioVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min={0.05}
                      max={0.5}
                      step={0.01}
                      value={audioVolume}
                      onChange={(e) => setAudioVolume(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-stone-800 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Specification & Craftsmanship Analysis */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Đặc Tính Kỹ Nghệ Kim Hoàn
              </span>
              <h4 className="text-xl font-serif text-stone-100 font-normal">
                {activeLeaf.symbolicMeaning}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Được chế tác ròng rã suốt 1.320 giờ bởi nghệ nhân kim hoàn trưởng tại xưởng Thạnh Xuân 1.200m², 
                từng cánh sen phỉ thúy được đo quang phổ và mài vát chính xác theo biên dạng công thái học gác bút lông.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Độ Thấu Quang Cánh Sen:</span>
                <span className="text-emerald-300 font-mono font-medium">{activeLeaf.jadeTranslucency}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Chỉ Vàng 24K Filigree:</span>
                <span className="text-amber-300 font-mono font-medium">{activeLeaf.goldFiligreeGauge}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Chất Liệu Bệ Đỡ:</span>
                <span className="text-stone-200 font-medium">Sưa Đỏ Bắc Bộ 400 năm</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Độ Cân Bằng Tự Nhiên:</span>
                <span className="text-stone-200 font-mono">Trọng tâm đối xứng tuyệt đối</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-amber-400 font-medium">Duy nhất 01 bản cho mỗi công trình</span>
              </div>
            </div>

            {/* Atelier Verification & Direct Hotline */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Xưởng May Đo Nội Thất Thạnh Xuân 1.200m²</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Được cấp giấy chứng thư bảo chứng ngọc quý tự nhiên và vàng ròng 24K tiêu chuẩn quốc gia. 
                Đảm bảo không hao mòn theo thời gian.
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
    </section>
  );
}

export default ArtisanHandmadeGoldFiligreeAndJadeCalligraphyBrushRestLotusBudSexaquinquagesimalLeafStudio;
