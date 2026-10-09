'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PavilionPreset {
  id: string;
  title: string;
  woodAge: string;
  bonsaiAge: string;
  woodOrigin: string;
  bonsaiType: string;
  coolingCapacity: string;
  airflowVelocity: string;
  moatPerimeter: string;
  frequencies: [number, number];
  description: string;
  elevation: string;
}

const PRESETS: PavilionPreset[] = [
  {
    id: 'thuy-dinh-po-mu-tay-bac',
    title: 'Thủy Đình Pơ Mu Tây Bắc Cổ Thụ & Hào Bonsai Tùng La Hán 585 Năm',
    woodAge: '575 năm',
    bonsaiAge: '585 năm',
    woodOrigin: 'Pơ Mu Tây Bắc nguyên khối vân xoắn thơm ngát tinh dầu',
    bonsaiType: 'Tùng La Hán Cổ Thụ dáng Long Thăng nghinh phong',
    coolingCapacity: '-13.7°C',
    airflowVelocity: '7.7 m/s',
    moatPerimeter: '135 mét',
    frequencies: [528, 432],
    description: 'Thủy đình phong thủy ngự ven hào hoa kênh Sài Gòn, kết cấu bản lề cối âm dương gỗ Pơ Mu mở xoay 270°, luân lưu khí mát tự nhiên từ hào nước và tinh dầu thơm ngát xua tan oi bức.',
    elevation: '+4.7m trên triều cường Sài Gòn'
  },
  {
    id: 'hao-hoa-bonsai-tung-bach-nien',
    title: 'Hào Bonsai Tùng Bách Niên & Cầu Kiều Gỗ Lũa Bách Thảo',
    woodAge: '560 năm',
    bonsaiAge: '570 năm',
    woodOrigin: 'Gỗ Lũa Pơ Mu kết hợp Hoàng Đàn Tuyết Lạng Sơn',
    bonsaiType: 'Tùng Bách Cổ Niên ngũ phúc tọa thạch',
    coolingCapacity: '-13.1°C',
    airflowVelocity: '7.2 m/s',
    moatPerimeter: '122 mét',
    frequencies: [639, 432],
    description: 'Dải hào hoa lọc nước tuần hoàn sinh học đa tầng, thảm cỏ nhung Nhật Bản và rạn đá san hô hóa thạch giữ cho khuôn viên thủy đình tĩnh lặng thanh khiết tuyệt đối.',
    elevation: '+4.4m trên triều cường Sài Gòn'
  },
  {
    id: 'tra-that-nguong-thuy-dinh',
    title: 'Trà Thất Ngưỡng Thủy Tạ & Cánh Cửa Chớp Bản Lề Cối',
    woodAge: '590 năm',
    bonsaiAge: '600 năm',
    woodOrigin: 'Pơ Mu Tây Bắc hóa thạch thơm ngát tự nhiên',
    bonsaiType: 'Đại Tùng Thụ thế Phượng Hoàng ẩm thủy đại thụ',
    coolingCapacity: '-14.3°C',
    airflowVelocity: '8.1 m/s',
    moatPerimeter: '142 mét',
    frequencies: [528, 741],
    description: 'Không gian ngự trà tao nhã trên mặt nước biếc, hương thơm tinh dầu gỗ Pơ Mu tỏa ngát khi mở bung cánh cửa chớp bản lề cối xoay không tiếng động.',
    elevation: '+5.0m trên triều cường Sài Gòn'
  }
];

export function SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV13() {
  const [selectedPreset, setSelectedPreset] = useState<PavilionPreset>(PRESETS[0]!);
  const [isHingedOpen, setIsHingedOpen] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(270);
  const [activeAudio, setActiveAudio] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.25);
  const [viewAngle, setViewAngle] = useState<'panoramic' | 'moat' | 'canopy' | 'tea'>('panoramic');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stopAudio = () => {
    if (osc1Ref.current) {
      try {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
      } catch (_) {}
      osc1Ref.current = null;
    }
    if (osc2Ref.current) {
      try {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
      } catch (_) {}
      osc2Ref.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (_) {}
      audioCtxRef.current = null;
    }
    setActiveAudio(false);
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

      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(selectedPreset.frequencies[0], ctx.currentTime);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(selectedPreset.frequencies[1], ctx.currentTime);

      osc1.connect(gain);
      osc2.connect(gain);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      setActiveAudio(true);
    } catch (_) {
      setActiveAudio(false);
    }
  };

  const toggleAudio = () => {
    if (activeAudio) {
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
    if (activeAudio && audioCtxRef.current) {
      if (osc1Ref.current) {
        osc1Ref.current.frequency.setValueAtTime(selectedPreset.frequencies[0], audioCtxRef.current.currentTime);
      }
      if (osc2Ref.current) {
        osc2Ref.current.frequency.setValueAtTime(selectedPreset.frequencies[1], audioCtxRef.current.currentTime);
      }
    }
  }, [selectedPreset, activeAudio]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-12 bg-stone-950 text-stone-100 overflow-hidden border-t border-b border-amber-900/30">
      {/* Background radial gradients simulating river twilight */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-600/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-emerald-600/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-950/40 text-amber-300 text-xs tracking-widest uppercase">
            <span>Đặc Khảo Kiến Trúc Thủy Tạ Ven Sông V13</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Độc Bản GuHomes</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-serif font-light text-stone-100 leading-snug tracking-wide">
            Thủy Đình Pơ Mu Tây Bắc Cổ Thụ 575 Năm &amp; Hào Bonsai Tùng La Hán 585 Năm
          </h2>

          <p className="text-sm md:text-base text-stone-400 leading-relaxed font-sans font-light">
            Tuyệt tác không gian thưởng ngoạn ven kênh Sài Gòn do KTS Trưởng GuHomes kiến tạo. 
            Sự phối hòa kỳ diệu giữa gỗ Pơ Mu Tây Bắc nguyên khối vân xoắn thơm ngát, hệ cửa bản lề cối âm dương mở xoay 270° 
            và hào hoa sinh thái vi khí hậu mát mẻ quanh năm.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPreset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSelectedPreset(preset)}
                className={`text-left p-5 rounded-2xl transition-all duration-300 border min-h-[44px] ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-950/50'
                    : 'bg-stone-900/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-amber-400/80 font-mono mb-2">
                  <span>Tuổi Gỗ: {preset.woodAge}</span>
                  <span>Bonsai: {preset.bonsaiAge}</span>
                </div>
                <h3 className="text-base font-serif font-medium text-stone-200 mb-2 leading-snug">
                  {preset.title}
                </h3>
                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
                <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
                  <span className="text-emerald-400 font-medium">Hạ {preset.coolingCapacity}</span>
                  <span className="text-stone-300">Gió {preset.airflowVelocity}</span>
                  <span className="text-amber-300/80">Hào {preset.moatPerimeter}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Pavilion Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-stone-900/80 rounded-3xl p-6 md:p-8 border border-stone-800 backdrop-blur-sm">
          {/* Left Column: Interactive Visual Canvas */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 border border-stone-800 flex flex-col items-center justify-center p-6 text-center">
              {/* Moat Water Ripple Effect */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.12),transparent_70%)] pointer-events-none" />

              {/* Dynamic Pavilion Elevation Graphic */}
              <div className="relative z-10 w-full max-w-md mx-auto space-y-4">
                <div className="relative h-44 w-full flex items-center justify-center">
                  {/* Roof Eaves */}
                  <motion.div
                    animate={{
                      rotate: isHingedOpen ? 0 : 2,
                      scale: isHingedOpen ? 1 : 0.98
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute top-2 w-72 h-14 border-t-4 border-amber-600/80 rounded-t-[50px] bg-stone-900/90 shadow-2xl flex items-center justify-center"
                  >
                    <span className="text-[11px] font-mono tracking-widest text-amber-300/90 uppercase">
                      Mái Đao Gỗ Pơ Mu Tây Bắc 575 Năm
                    </span>
                  </motion.div>

                  {/* Hinged Doors (Bản lề cối âm dương) */}
                  <div className="absolute top-16 w-64 h-24 flex justify-between items-center px-4">
                    {/* Left Door Leaf */}
                    <motion.div
                      animate={{
                        rotateY: isHingedOpen ? -rotationAngle / 2 : 0,
                        transformOrigin: 'left center'
                      }}
                      transition={{ duration: 0.8 }}
                      className="w-24 h-24 bg-gradient-to-r from-amber-900/60 to-stone-800 border border-amber-600/40 rounded-sm flex flex-col justify-center items-center p-2 text-[10px] text-amber-200"
                    >
                      <span>Cánh Tả</span>
                      <span className="text-[8px] text-stone-400">Bản Lề Cối Âm</span>
                    </motion.div>

                    {/* Central Interior: Tea Space & Bonsai */}
                    <div className="flex flex-col items-center justify-center text-center px-1">
                      <div className="w-8 h-8 rounded-full border border-emerald-500/50 flex items-center justify-center text-[9px] text-emerald-300 bg-emerald-950/40 mb-1">
                        Tùng La Hán
                      </div>
                      <span className="text-[9px] text-stone-300 font-mono">Trà Ngọa</span>
                    </div>

                    {/* Right Door Leaf */}
                    <motion.div
                      animate={{
                        rotateY: isHingedOpen ? rotationAngle / 2 : 0,
                        transformOrigin: 'right center'
                      }}
                      transition={{ duration: 0.8 }}
                      className="w-24 h-24 bg-gradient-to-l from-amber-900/60 to-stone-800 border border-amber-600/40 rounded-sm flex flex-col justify-center items-center p-2 text-[10px] text-amber-200"
                    >
                      <span>Cánh Hữu</span>
                      <span className="text-[8px] text-stone-400">Bản Lề Cối Dương</span>
                    </motion.div>
                  </div>

                  {/* Moat Water Base */}
                  <div className="absolute bottom-0 w-80 h-6 border-b-2 border-emerald-500/50 rounded-b-xl bg-emerald-950/30 flex items-center justify-center text-[10px] text-emerald-300 font-mono">
                    Hào Nước Sinh Thái Thảo Điền - Đón Gió Kênh Sài Gòn
                  </div>
                </div>

                <div className="text-xs text-stone-400 flex items-center justify-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Độ mở cánh: {isHingedOpen ? `${rotationAngle}°` : 'Đóng khép kín'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Cao trình: {selectedPreset.elevation}
                  </span>
                </div>
              </div>

              {/* View Angle Badges */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                {(['panoramic', 'moat', 'canopy', 'tea'] as const).map((angle) => (
                  <button
                    key={angle}
                    type="button"
                    onClick={() => setViewAngle(angle)}
                    className={`px-2.5 py-1 text-[10px] rounded-lg border font-mono transition-colors min-h-[32px] ${
                      viewAngle === angle
                        ? 'bg-amber-600/30 border-amber-500 text-amber-200'
                        : 'bg-stone-800/60 border-stone-700 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {angle === 'panoramic' && 'Toàn Cảnh'}
                    {angle === 'moat' && 'Hào Tùng'}
                    {angle === 'canopy' && 'Mái Đao'}
                    {angle === 'tea' && 'Trà Thất'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="hinge-toggle-v13-pomu" className="text-xs font-medium text-stone-300">
                    Bản Lề Cối Âm Dương (270°)
                  </label>
                  <button
                    id="hinge-toggle-v13-pomu"
                    type="button"
                    onClick={() => setIsHingedOpen(!isHingedOpen)}
                    className={`px-3 py-1 text-xs rounded-full border transition-all min-h-[44px] flex items-center justify-center ${
                      isHingedOpen
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : 'bg-stone-800 border-stone-700 text-stone-400'
                    }`}
                  >
                    {isHingedOpen ? 'Đang Mở Xoay' : 'Khép Kín'}
                  </button>
                </div>
                {isHingedOpen && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-stone-400 font-mono">
                      <span>Góc Xoay</span>
                      <span>{rotationAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min={45}
                      max={270}
                      step={15}
                      value={rotationAngle}
                      onChange={(e) => setRotationAngle(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>

              {/* Sound Therapy Solfeggio */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-stone-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-stone-300">
                    Âm Hưởng Tĩnh Lặng ({selectedPreset.frequencies[0]}Hz &amp; {selectedPreset.frequencies[1]}Hz)
                  </span>
                  <button
                    type="button"
                    onClick={toggleAudio}
                    className={`px-3 py-1 text-xs rounded-full border transition-all min-h-[44px] flex items-center justify-center ${
                      activeAudio
                        ? 'bg-amber-950 border-amber-500 text-amber-300'
                        : 'bg-stone-800 border-stone-700 text-stone-400'
                    }`}
                  >
                    {activeAudio ? 'Dừng Tần Số' : 'Phát Tần Số'}
                  </button>
                </div>
                {activeAudio && (
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
                      className="w-full accent-amber-500 bg-stone-800 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Parameters & Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400/90">
                Thông Số Kỹ Thuật Thủy Đình
              </span>
              <h4 className="text-xl font-serif text-stone-100 font-normal">
                {selectedPreset.woodOrigin}
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Thiết kế đặc quyền bởi GuHomes dành riêng cho các khu dinh thự ven sông Sài Gòn, 
                đảm bảo tuổi thọ kiến trúc trường tồn cùng thiên nhiên nhiệt đới khắc nghiệt.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Niên Đại Gỗ Pơ Mu:</span>
                <span className="text-stone-200 font-mono font-medium">{selectedPreset.woodAge}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Thế Bonsai Trấn Cảnh:</span>
                <span className="text-stone-200 font-medium">{selectedPreset.bonsaiType}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Hiệu Ứng Hạ Nhiệt Vi Khí Hậu:</span>
                <span className="text-emerald-400 font-mono font-medium">{selectedPreset.coolingCapacity}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Tốc Độ Đón Gió Sông Tự Nhiên:</span>
                <span className="text-stone-200 font-mono font-medium">{selectedPreset.airflowVelocity}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Chu Vi Hào Nước Phong Thủy:</span>
                <span className="text-amber-300 font-mono font-medium">{selectedPreset.moatPerimeter}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-stone-950/40 border border-stone-800/80 text-xs">
                <span className="text-stone-400">Cao Trình Nền Đình Viện:</span>
                <span className="text-stone-200 font-mono font-medium">{selectedPreset.elevation}</span>
              </div>
            </div>

            {/* Atelier Verification & Direct Hotline */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Xưởng Chế Tác Thạnh Xuân 1.200m² - GuHomes</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Mỗi công trình Thủy Đình được tính toán riêng theo hướng gió mùa Nam - Đông Nam và biên độ triều cường sông Sài Gòn. Giới hạn 12 tuyệt phẩm mỗi năm.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-stone-400">Hotline KTS Trưởng:</span>
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

export default SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV13;
