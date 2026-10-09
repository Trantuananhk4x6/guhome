'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IncenseRitual {
  id: string;
  name: string;
  targetTemp: number;
  frequency: number;
  durationMin: number;
  kynamType: string;
  altarWood: string;
  scentProfile: string;
  therapeuticBenefit: string;
}

const RITUALS: IncenseRitual[] = [
  {
    id: 'thien-dinh-tinh-tam-v50',
    name: 'Thiền Định Tịnh Tâm - Bán Bách Thế Kim Quang',
    targetTemp: 115,
    frequency: 528,
    durationMin: 50,
    kynamType: 'Bạch Kỳ Nam Rừng Khánh Hòa Đỉnh Cấp (Độ tích dầu hóa thạch 98%)',
    altarWood: 'Án Trầm Hương Rừng Tự Nhiên 400 năm nguyên khối thấu quang',
    scentProfile: 'Thanh lương diệu vợi, hương hoa lê tuyết thoang thoảng cùng mật ong đại ngàn',
    therapeuticBenefit: 'Kích hoạt tần số an lạc, tái tạo năng lượng sinh học và giải tỏa hoàn toàn áp lực tâm trí'
  },
  {
    id: 'nghenh-don-quy-khach-v50',
    name: 'Nghênh Đón Quý Khách - Long Mã Khai Thái',
    targetTemp: 170,
    frequency: 639,
    durationMin: 60,
    kynamType: 'Thanh Kỳ Nam Rừng Tự Nhiên Vạn Ninh (Độ tích dầu 95%)',
    altarWood: 'Án Mun Hoa Khánh Hòa 390 năm vân hoa cuộn sóng',
    scentProfile: 'Nồng ấm hương thảo mộc cổ truyền, long diên hương và hoa nguyệt quế quý phái',
    therapeuticBenefit: 'Khởi sinh vượng khí giao hòa, kết nối chân tình và tôn vinh phong thái tôn nghiêm'
  },
  {
    id: 'chieu-tai-nghenh-phuc-v50',
    name: 'Chiêu Tài Nghênh Phúc - Ngũ Thập Thế Đại Cát',
    targetTemp: 220,
    frequency: 741,
    durationMin: 35,
    kynamType: 'Hắc Kỳ Nam Hòn Hèo Rừng Nguyên Sinh 480 năm',
    altarWood: 'Án Sưa Đỏ Bắc Bộ 420 năm vân mộng long vân huyền thoại',
    scentProfile: 'Hương trầm uy lực thâm sơn đại ngàn, lắng đọng trầm tích ngàn năm hóa ngọc',
    therapeuticBenefit: 'Tẩy uế thanh lọc phong thủy, kích hoạt vận khí hanh thông và gia hộ sự nghiệp trường tồn'
  }
];

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV50() {
  const [selectedRitual, setSelectedRitual] = useState<IncenseRitual>(RITUALS[0]!);
  const [currentTemp, setCurrentTemp] = useState<number>(RITUALS[0]!.targetTemp);
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(false);
  const [audioVolume, setAudioVolume] = useState<number>(0.2);
  const [activeSmokeStream, setActiveSmokeStream] = useState<boolean>(true);

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
    setIsPlayingSound(false);
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
      osc.frequency.setValueAtTime(selectedRitual.frequency, ctx.currentTime);
      osc.connect(gain);
      osc.start();

      oscRef.current = osc;
      setIsPlayingSound(true);
    } catch (_) {
      setIsPlayingSound(false);
    }
  };

  const toggleAudio = () => {
    if (isPlayingSound) {
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
    if (isPlayingSound && oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setValueAtTime(selectedRitual.frequency, audioCtxRef.current.currentTime);
    }
    setCurrentTemp(selectedRitual.targetTemp);
  }, [selectedRitual, isPlayingSound]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-12 bg-neutral-950 text-neutral-100 overflow-hidden border-t border-b border-amber-900/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-orange-600/15 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-12">
        {/* Header Block */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/40 bg-amber-950/40 text-amber-300 text-xs tracking-widest uppercase">
            <span>Ngự Khí Hương Đạo Hoàng Gia V50 - Mốc Vàng Bán Bách Thế</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>GuHomes Thạnh Xuân</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-serif font-light text-neutral-100 leading-snug tracking-wide">
            Đỉnh Lư Kim Long Mã Thập Nhị Ngũ Thập Thế V50 Trên Án Trầm Hương Rừng Khánh Hòa 400 Năm
          </h2>

          <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-sans font-light">
            Tuyệt phẩm hương đạo đỉnh cao kết hợp kỹ nghệ nẹp Vàng 24K Filigree tinh xảo cùng Phỉ Thúy Type A, 
            ứng dụng buồng đốt xông vi điều nhiệt không khói bảo toàn trọn vẹn tinh chất Kỳ Nam Rừng Khánh Hòa nguyên bản.
          </p>
        </div>

        {/* Ritual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RITUALS.map((ritual) => {
            const isSelected = ritual.id === selectedRitual.id;
            return (
              <button
                key={ritual.id}
                type="button"
                onClick={() => setSelectedRitual(ritual)}
                className={`text-left p-5 rounded-2xl transition-all duration-300 border min-h-[44px] ${
                  isSelected
                    ? 'bg-amber-950/50 border-amber-500/70 shadow-xl shadow-amber-950/40'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-amber-400 font-mono mb-2">
                  <span>Vi Nhiệt: {ritual.targetTemp}°C</span>
                  <span>Tần Số: {ritual.frequency}Hz</span>
                </div>
                <h3 className="text-base font-serif font-medium text-neutral-100 mb-2 leading-snug">
                  {ritual.name}
                </h3>
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {ritual.scentProfile}
                </p>
                <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                  <span className="text-amber-300">Thời gian: {ritual.durationMin} phút</span>
                  <span className="text-emerald-400 font-mono">Không khói độc</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Incense Burner Vault Chamber */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-neutral-900/70 rounded-3xl p-6 md:p-8 border border-neutral-800 backdrop-blur-md">
          {/* Visual Simulation Display */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col items-center justify-center p-6 text-center">
              {/* Sacred Scent Stream Simulation */}
              <AnimatePresence>
                {activeSmokeStream && (
                  <div className="absolute top-12 flex flex-col items-center pointer-events-none">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15, scale: 0.8 }}
                        animate={{
                          opacity: [0, 0.5, 0.25, 0],
                          y: [-10, -50, -90],
                          scale: [0.9, 1.35, 1.85],
                          x: [0, (i % 2 === 0 ? 14 : -14), (i % 2 === 0 ? -16 : 16)]
                        }}
                        transition={{
                          duration: 4.5,
                          repeat: Infinity,
                          delay: i * 1.5,
                          ease: 'easeInOut'
                        }}
                        className="w-16 h-16 rounded-full bg-gradient-to-t from-amber-400/25 to-transparent blur-md"
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {/* Incense Burner Body Iconography */}
              <div className="relative z-10 w-full max-w-sm mx-auto space-y-3">
                <div className="relative h-44 w-full flex flex-col items-center justify-center">
                  {/* Filigree Dragon Horse Finial */}
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-20 h-10 border border-amber-500/60 rounded-t-full bg-gradient-to-b from-amber-600/40 to-neutral-900 flex items-center justify-center text-[10px] text-amber-300 font-serif shadow-lg"
                  >
                    Long Mã Ngậm Sen
                  </motion.div>

                  {/* Vault Body with Jade Panels */}
                  <div className="w-48 h-20 bg-gradient-to-r from-amber-950/80 via-neutral-900 to-amber-950/80 border-2 border-amber-500/50 rounded-2xl flex flex-col items-center justify-center p-2 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-x-2 top-2 flex justify-between text-[9px] text-emerald-400 font-mono">
                      <span>Phỉ Thúy Type A</span>
                      <span>Vàng 24K</span>
                    </div>
                    <span className="text-xs font-serif text-neutral-200 mt-2">
                      Kim Long Mã Ngũ Thập Thế V50
                    </span>
                    <span className="text-[10px] text-amber-400/90 font-mono">
                      Nhiệt Thực Tế: {currentTemp}°C
                    </span>
                  </div>

                  {/* Agarwood Altar Base */}
                  <div className="w-64 h-8 bg-neutral-950 border-t-2 border-amber-700/60 rounded-b-lg flex items-center justify-center text-[10px] text-neutral-400 font-mono">
                    Án Trầm Hương Rừng Tự Nhiên 400 Năm Khánh Hòa
                  </div>
                </div>

                <div className="text-xs text-neutral-400 flex items-center justify-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    Chế độ xông: Không Khói Độc
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Sesquiterpenes: Tự Nhiên 100%
                  </span>
                </div>
              </div>

              {/* Smoke Stream Toggle */}
              <button
                type="button"
                onClick={() => setActiveSmokeStream(!activeSmokeStream)}
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg border border-neutral-700 bg-neutral-850/80 text-[11px] font-mono text-neutral-300 hover:text-neutral-100 min-h-[36px] flex items-center gap-2"
              >
                <span>Mô Phỏng Khí Trầm:</span>
                <span className={activeSmokeStream ? 'text-amber-400' : 'text-neutral-500'}>
                  {activeSmokeStream ? 'Đang Tỏa' : 'Đang Ngắt'}
                </span>
              </button>
            </div>

            {/* Interactive Thermal & Sound Controllers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Thermal Controller */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-medium text-neutral-300">Vi Điều Nhiệt Buồng Đốt</span>
                  <span className="font-mono text-amber-400">{currentTemp}°C</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={240}
                  step={5}
                  value={currentTemp}
                  onChange={(e) => setCurrentTemp(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                  <span>80°C (Ủ Hương)</span>
                  <span>170°C (Phát Tán)</span>
                  <span>240°C (Thuần Lực)</span>
                </div>
              </div>

              {/* Solfeggio Sound Therapy */}
              <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-neutral-300">
                    Sóng Âm Thiền Tịnh ({selectedRitual.frequency}Hz)
                  </span>
                  <button
                    type="button"
                    onClick={toggleAudio}
                    className={`px-3 py-1 text-xs rounded-full border transition-all min-h-[44px] flex items-center justify-center ${
                      isPlayingSound
                        ? 'bg-amber-950 border-amber-500 text-amber-300'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                    }`}
                  >
                    {isPlayingSound ? 'Tạm Dừng Sóng' : 'Kích Hoạt Sóng'}
                  </button>
                </div>
                {isPlayingSound && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
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
                      className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400/90">
                Đặc Khảo Ngự Khí Hương Đạo V50
              </span>
              <h4 className="text-xl font-serif text-neutral-100 font-normal">
                {selectedRitual.kynamType}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Được chế tác thủ công bởi các nghệ nhân kim hoàn đỉnh cao của GuHomes, kết tinh kỹ thuật chạm vàng Filigree hoàng cung và công nghệ vi nhiệt gốm sứ đa lớp.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center p-3 rounded-lg bg-neutral-950/40 border border-neutral-800/80 text-xs">
                <span className="text-neutral-400">Án Ngự Hương:</span>
                <span className="text-neutral-200 font-medium">{selectedRitual.altarWood}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-neutral-950/40 border border-neutral-800/80 text-xs">
                <span className="text-neutral-400">Tầng Hương Đặc Trưng:</span>
                <span className="text-amber-300 font-medium">{selectedRitual.scentProfile}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-neutral-950/40 border border-neutral-800/80 text-xs">
                <span className="text-neutral-400">Trị Liệu Thần Kinh:</span>
                <span className="text-emerald-400 font-medium">{selectedRitual.therapeuticBenefit}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-neutral-950/40 border border-neutral-800/80 text-xs">
                <span className="text-neutral-400">Vật Liệu Cốt Lõi:</span>
                <span className="text-neutral-200 font-mono">Vàng 24K Filigree &amp; Phỉ Thúy Type A</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-neutral-950/40 border border-neutral-800/80 text-xs">
                <span className="text-neutral-400">Dung Sai Vi Nhiệt:</span>
                <span className="text-amber-300 font-mono">&plusmn;0.5°C gốm chịu nhiệt PTC</span>
              </div>
            </div>

            {/* GuHomes Atelier Assurance */}
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-900/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                <svg className="w-4 h-4 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>Cam Kết Độc Bản - Xưởng Thạnh Xuân 1.200m²</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Được đánh số độc bản bằng laser trên phiến vàng 24K nguyên chất kèm giấy thẩm định ngọc học và nguồn gốc Kỳ Nam Rừng Khánh Hòa nguyên bản.
              </p>
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Tư Vấn Nghi Thức Hương:</span>
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

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV50;
