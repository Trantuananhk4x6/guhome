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
    id: 'thien-dinh-tinh-tam-v53',
    name: 'Thiền Định Tịnh Tâm - Càn Khôn Hóa Sinh V53',
    targetTemp: 118,
    frequency: 528,
    durationMin: 50,
    kynamType: 'Bạch Kỳ Nam Rừng Tự Nhiên Khánh Hòa (Độ dầu tích tụ hóa ngọc 97.5%)',
    altarWood: 'Án Mun Sừng Khánh Hòa 400 năm đen ánh huyền ngọc sâu lắng',
    scentProfile: 'Thanh lương dịu ngọt, thoảng hương sen sớm và mật ong hoa rừng nguyên sinh',
    therapeuticBenefit: 'Kích hoạt sóng não Theta, tái tạo sinh lực tinh thần và xua tan âu lo thế tục'
  },
  {
    id: 'nghenh-don-quy-khach-v53',
    name: 'Nghênh Đón Quý Khách - Long Mã Khai Thái V53',
    targetTemp: 172,
    frequency: 639,
    durationMin: 60,
    kynamType: 'Thanh Kỳ Nam Rừng Tự Nhiên Khánh Hòa (Độ tích dầu 94.5%)',
    altarWood: 'Án Mun Sừng Khánh Hòa 400 năm mộng âm dương cẩn ốc xà cừ',
    scentProfile: 'Nồng ấm hương trầm cổ mộc, hổ phách và hoa mộc tê quý phái',
    therapeuticBenefit: 'Kiến tạo trường năng lượng ấm áp, nâng tầm vị thế gia chủ và gắn kết tri âm'
  },
  {
    id: 'da-yen-thuong-tra-v53',
    name: 'Dạ Yến Thưởng Trà - Kim Long Đằng Vân V53',
    targetTemp: 138,
    frequency: 432,
    durationMin: 45,
    kynamType: 'Hoàng Kỳ Nam Rừng Tự Nhiên Khánh Hòa (Sắc hổ phách hoàng kim)',
    altarWood: 'Án Mun Sừng Khánh Hòa 400 năm chạm khắc phù điêu mây cuộn',
    scentProfile: 'Ngọt béo hương quế chi, hoa nhài đêm và vani gỗ tự nhiên',
    therapeuticBenefit: 'Khai mở ngũ giác, thư giãn cơ bắp sâu và nâng cao trải nghiệm thưởng trà thượng phẩm'
  },
  {
    id: 'tinh-hoa-khong-gian-v53',
    name: 'Tịnh Hóa Không Gian - Trừ Tà Định Khí V53',
    targetTemp: 218,
    frequency: 741,
    durationMin: 35,
    kynamType: 'Hắc Kỳ Nam Rừng Tự Nhiên Khánh Hòa (Độ dầu hóa thạch 98%)',
    altarWood: 'Án Mun Sừng Khánh Hòa 400 năm nẹp chỉ vàng ròng 24K Filigree',
    scentProfile: 'Mạnh mẽ, ấm nồng khói trầm cổ kính, tiêu trừ uế khí và chấn hưng trạch vận',
    therapeuticBenefit: 'Thanh lọc điện từ trường, kháng khuẩn không khí và mang lại trường sinh khí an lành'
  }
];

export function BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV53() {
  const [activeRitual, setActiveRitual] = useState<IncenseRitual>(RITUALS[0]!);
  const [currentTemp, setCurrentTemp] = useState<number>(RITUALS[0]!.targetTemp);
  const [isIncensing, setIsIncensing] = useState<boolean>(false);
  const [audioActive, setAudioActive] = useState<boolean>(false);
  const [mistDensity, setMistDensity] = useState<number>(85);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const stopHarmonicAudio = () => {
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
    setAudioActive(false);
  };

  const startHarmonicAudio = (freq: number) => {
    stopHarmonicAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      oscRef.current = osc;
      gainRef.current = gain;
      setAudioActive(true);
    } catch {
      setAudioActive(false);
    }
  };

  const toggleSoundscape = () => {
    if (audioActive) {
      stopHarmonicAudio();
    } else {
      startHarmonicAudio(activeRitual.frequency);
    }
  };

  useEffect(() => {
    return () => {
      stopHarmonicAudio();
    };
  }, []);

  useEffect(() => {
    if (audioActive && audioCtxRef.current && oscRef.current) {
      const now = audioCtxRef.current.currentTime;
      oscRef.current.frequency.cancelScheduledValues(now);
      oscRef.current.frequency.setValueAtTime(activeRitual.frequency, now);
    }
  }, [activeRitual]);

  const handleSelectRitual = (ritual: IncenseRitual) => {
    setActiveRitual(ritual);
    setCurrentTemp(ritual.targetTemp);
  };

  return (
    <section className="relative py-24 bg-neutral-950 text-neutral-100 overflow-hidden border-b border-amber-900/30">
      {/* Background glow & subtle patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(180,83,9,0.04),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-700/50 text-amber-300 text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Bảo Vật Hương Đạo Cung Đình V53
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-amber-50 font-normal tracking-tight">
            Đỉnh Lư Kim Long Mã V53 & Án Mun Sừng 400 Năm
          </h2>
          <p className="mt-4 text-neutral-400 text-base sm:text-lg font-light leading-relaxed">
            Tuyệt phẩm hương đạo đỉnh cao kết hợp kỹ nghệ kéo sợi Vàng 24K Filigree tinh mỹ cùng nghệ thuật vi điều nhiệt gốm PTC không tạo khói khét, bảo tồn trọn vẹn tinh dầu Kỳ Nam Tự Nhiên Khánh Hòa.
          </p>
        </div>

        {/* Master Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ritual Selector & Chamber Control */}
          <div className="lg:col-span-5 space-y-6">
            {/* Rituals Menu */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
              <h3 className="text-sm font-mono uppercase text-amber-400 tracking-wider mb-4">
                Nghi Thức Hương Đạo Hoàng Gia
              </h3>
              <div className="space-y-3">
                {RITUALS.map((ritual) => (
                  <button
                    key={ritual.id}
                    onClick={() => handleSelectRitual(ritual)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 min-h-[44px] flex flex-col justify-center ${
                      activeRitual.id === ritual.id
                        ? 'bg-amber-950/50 border border-amber-600/60 text-amber-200 shadow-[0_0_20px_rgba(217,119,6,0.15)]'
                        : 'bg-neutral-800/40 border border-neutral-800 text-neutral-300 hover:bg-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{ritual.name}</span>
                      <span className="text-xs font-mono text-amber-400">{ritual.targetTemp}°C</span>
                    </div>
                    <span className="text-xs text-neutral-400 mt-1 line-clamp-1">
                      {ritual.kynamType}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Micro-Thermal Controller */}
            <div className="p-6 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase text-amber-400 tracking-wider">
                  Vi Điều Nhiệt Gốm Không Khói PTC
                </h3>
                <span className="text-xs font-mono text-amber-300">{currentTemp}°C</span>
              </div>
              <input
                type="range"
                min="80"
                max="240"
                value={currentTemp}
                onChange={(e) => setCurrentTemp(Number(e.target.value))}
                className="w-full accent-amber-500 bg-neutral-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                <span>80°C Dưỡng Hương</span>
                <span>160°C Khai Hoa</span>
                <span>240°C Thấm Đượm</span>
              </div>

              {/* Solfeggio Audio Trigger */}
              <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-neutral-200">Âm Hưởng Tần Số Tĩnh Tâm</div>
                  <div className="text-[11px] text-neutral-400 font-mono">
                    {activeRitual.frequency}Hz · Sóng Não Thư Giãn Sâu
                  </div>
                </div>
                <button
                  onClick={toggleSoundscape}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center gap-2 ${
                    audioActive
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${audioActive ? 'bg-neutral-950 animate-ping' : 'bg-neutral-500'}`} />
                  {audioActive ? 'Tắt Hòa Âm' : 'Kích Hoạt'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Render & Incense Altar Detail */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-neutral-900/90 to-neutral-950 border border-neutral-800 relative overflow-hidden shadow-2xl">
              {/* Altar & Burner Display Canvas */}
              <div className="relative aspect-[16/10] rounded-2xl bg-neutral-950 border border-neutral-800/80 overflow-hidden flex items-center justify-center">
                {/* SVG Visual Model */}
                <svg className="w-full h-full p-8" viewBox="0 0 600 380" fill="none">
                  {/* Subtle Altar Surface of Mun Wood */}
                  <rect x="100" y="270" width="400" height="40" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" rx="4" />
                  <rect x="120" y="310" width="360" height="20" fill="#0c0a09" stroke="#292524" strokeWidth="1" />
                  {/* Altar Inlaid Mother of Pearl Veins */}
                  <path d="M120 285 Q300 290 480 285" stroke="#fef08a" strokeWidth="0.8" strokeDasharray="15 8" opacity="0.4" />

                  {/* Incense Burner Tripod Base */}
                  <ellipse cx="300" cy="265" rx="90" ry="18" fill="#451a03" stroke="#b45309" strokeWidth="2" />
                  <path d="M230 265 L215 285 L235 285 Z" fill="#78350f" stroke="#d97706" strokeWidth="1" />
                  <path d="M370 265 L385 285 L365 285 Z" fill="#78350f" stroke="#d97706" strokeWidth="1" />
                  <path d="M300 270 L300 290" stroke="#d97706" strokeWidth="4" strokeLinecap="round" />

                  {/* Burner Body: Pure Gold Filigree Lotus Base */}
                  <path d="M220 230 C220 265, 380 265, 380 230 C380 205, 360 190, 300 190 C240 190, 220 205, 220 230 Z" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
                  
                  {/* Gold Filigree Lace Mesh Pattern */}
                  <path d="M235 230 Q300 260 365 230" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  <path d="M245 220 Q300 250 355 220" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
                  <path d="M260 210 Q300 240 340 210" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />

                  {/* Dragon Horse Figurine (Long Mã) Finial */}
                  <g transform="translate(275, 120)">
                    {/* Dragon-Horse Body Silhouette */}
                    <path d="M25 65 Q35 45 25 30 Q15 20 30 10 Q45 15 40 30 Q55 35 45 65 Z" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
                    {/* Dragon Wings Filigree */}
                    <path d="M35 30 C50 15, 65 25, 55 45 C45 40, 40 35, 35 30 Z" fill="#d97706" stroke="#fef08a" strokeWidth="1.5" />
                    <path d="M15 30 C0 15, -15 25, -5 45 C5 40, 10 35, 15 30 Z" fill="#d97706" stroke="#fef08a" strokeWidth="1.5" />
                    {/* Flaming Pearl atop Head */}
                    <circle cx="30" cy="5" r="5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
                  </g>

                  {/* Ethereal Incense Smoke Trails */}
                  <path d="M300 120 C320 90, 280 60, 310 30 C330 10, 290 0, 305 -20" stroke="#fef3c7" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" from="60" to="0" dur="4s" repeatCount="indefinite" />
                  </path>
                  <path d="M290 120 C270 95, 310 70, 285 40 C270 20, 310 5, 295 -20" stroke="#fde68a" strokeWidth="1" strokeDasharray="5 7" opacity="0.4">
                    <animate attributeName="stroke-dashoffset" from="70" to="0" dur="3.5s" repeatCount="indefinite" />
                  </path>
                </svg>

                {/* Floating Metric Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900/80 border border-neutral-700 text-[11px] font-mono text-amber-400">
                    Nhiệt Lò: {currentTemp}°C
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900/80 border border-neutral-700 text-[11px] font-mono text-emerald-400">
                    Tần Số: {activeRitual.frequency}Hz
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 text-right">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900/80 border border-amber-900 text-[11px] font-mono text-amber-300">
                    Thời Lượng: {activeRitual.durationMin} phút
                  </span>
                </div>
              </div>

              {/* Ritual Narrative & Sensory Description */}
              <div className="mt-6">
                <h4 className="text-xl font-serif text-amber-100 font-normal">
                  {activeRitual.name}
                </h4>
                <p className="mt-2 text-sm text-neutral-300 leading-relaxed font-light">
                  {activeRitual.scentProfile}
                </p>
                <div className="mt-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-300">
                  <span className="font-semibold text-amber-400">Công hiệu dưỡng tâm: </span>
                  {activeRitual.therapeuticBenefit}
                </div>
              </div>

              {/* Material Assurance & Provenance */}
              <div className="mt-6 pt-6 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400">Nguồn Gốc Kỳ Nam:</div>
                  <div className="text-amber-300 font-medium mt-1">{activeRitual.kynamType}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/80">
                  <div className="text-neutral-400">Gỗ Án Thờ:</div>
                  <div className="text-stone-300 font-medium mt-1">{activeRitual.altarWood}</div>
                </div>
              </div>

              {/* Atelier Verification & Direct Hotline */}
              <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-900/40 space-y-2">
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
      </div>
    </section>
  );
}

export default BespokeImperialKynamAndGoldFiligreeDragonHorseLotusIncenseBurnerVaultV53;
