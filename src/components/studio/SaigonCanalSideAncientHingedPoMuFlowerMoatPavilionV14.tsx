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
    id: 'thuy-dinh-po-mu-co-thu-v14',
    title: 'Thủy Đình Pơ Mu Tây Bắc & Hào Bonsai Tùng La Hán 600 Năm V14',
    woodAge: '590 năm',
    bonsaiAge: '600 năm',
    woodOrigin: 'Pơ Mu Tây Bắc Cổ Thụ nguyên khối vân xoắn thơm lừng kháng ẩm mốc',
    bonsaiType: 'Tùng La Hán Cổ Thụ dáng Phụ Tử Tương Tùy phong sương nghìn thu',
    coolingCapacity: '-14.1°C',
    airflowVelocity: '8.1 m/s',
    moatPerimeter: '142 mét',
    frequencies: [528, 432],
    description: 'Thủy đình phong thủy ngự ven hào hoa kênh Sài Gòn, kết cấu bản lề cối âm dương gỗ Pơ Mu mở xoay 270°, luân lưu khí mát tự nhiên từ hào nước và tinh dầu thơm dịu xua tan oi bức nhiệt đới.',
    elevation: '+5.1m trên triều cường Sài Gòn'
  },
  {
    id: 'hao-hoa-bonsai-tung-la-han-bach-nien-v14',
    title: 'Hào Bonsai Tùng La Hán Bách Niên & Cầu Kiều Lũa Pơ Mu V14',
    woodAge: '575 năm',
    bonsaiAge: '585 năm',
    woodOrigin: 'Pơ Mu Mù Cang Chải lõi già trầm tích vân cẩm thạch',
    bonsaiType: 'Tùng La Hán Cổ Thụ thế Thác Đổ quy tụ tài lộc bên dòng kênh',
    coolingCapacity: '-13.2°C',
    airflowVelocity: '7.6 m/s',
    moatPerimeter: '132 mét',
    frequencies: [528, 639],
    description: 'Hệ hào hoa nước động tuần hoàn bao quanh thư phòng, kết hợp các khóm sen ngọc và bách thảo nhiệt đới lọc sạch bụi mịn và hạ nhiệt vi khí hậu tự nhiên.',
    elevation: '+4.5m trên triều cường Sài Gòn'
  },
  {
    id: 'tra-dinh-phong-thuy-kim-quy-v14',
    title: 'Trà Đình Pơ Mu Lũa & Đảo Kim Quy Điểm Nhãn V14',
    woodAge: '600 năm',
    bonsaiAge: '610 năm',
    woodOrigin: 'Pơ Mu Tây Bắc Cổ Thụ nguyên thân uốn khúc tự nhiên',
    bonsaiType: 'Tùng La Hán Cổ Thụ thế Huyền Vũ Phục Khí tụ tài vượng khí',
    coolingCapacity: '-14.6°C',
    airflowVelocity: '8.5 m/s',
    moatPerimeter: '152 mét',
    frequencies: [432, 528],
    description: 'Không gian thưởng trà tôn nghiêm giữa lòng đảo ngọc ven kênh, bản lề cối gỗ đóng mở theo góc xiên của nắng xế chiều, giữ nhiệt độ bên trong luôn ôn hòa 24-26°C.',
    elevation: '+5.4m trên triều cường Sài Gòn'
  }
];

export function SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV14() {
  const [activePreset, setActivePreset] = useState<PavilionPreset>(PRESETS[0]!);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [hingeAngle, setHingeAngle] = useState(135);
  const [airflowLevel, setAirflowLevel] = useState(81);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const stopAudio = () => {
    if (osc1Ref.current) {
      try {
        osc1Ref.current.stop();
        osc1Ref.current.disconnect();
      } catch {
        // ignore
      }
      osc1Ref.current = null;
    }
    if (osc2Ref.current) {
      try {
        osc2Ref.current.stop();
        osc2Ref.current.disconnect();
      } catch {
        // ignore
      }
      osc2Ref.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlayingAudio(false);
  };

  const playAudio = () => {
    stopAudio();
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(activePreset.frequencies[0], ctx.currentTime);
      osc2.frequency.setValueAtTime(activePreset.frequencies[1], ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 1.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      gainNodeRef.current = gain;

      setIsPlayingAudio(true);
    } catch {
      setIsPlayingAudio(false);
    }
  };

  const toggleAudio = () => {
    if (isPlayingAudio) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  useEffect(() => {
    if (isPlayingAudio && audioCtxRef.current && osc1Ref.current && osc2Ref.current) {
      const now = audioCtxRef.current.currentTime;
      osc1Ref.current.frequency.cancelScheduledValues(now);
      osc2Ref.current.frequency.cancelScheduledValues(now);
      osc1Ref.current.frequency.setValueAtTime(activePreset.frequencies[0], now);
      osc2Ref.current.frequency.setValueAtTime(activePreset.frequencies[1], now);
    }
  }, [activePreset]);

  return (
    <section className="relative py-24 bg-stone-950 text-stone-100 overflow-hidden border-b border-amber-900/20">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(68,64,60,0.15),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Tuyệt Phẩm Thủy Đình & Hào Bonsai Vi Khí Hậu V14
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-100 font-normal tracking-tight">
            Thủy Đình Pơ Mu Tây Bắc 590 Năm & Hào Bonsai Tùng La Hán 600 Năm
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg font-light leading-relaxed">
            Kiến trúc thủy đình cửa cối mở xoay 270° ngự ven kênh Sài Gòn, kết hợp hào nước thanh lọc bách thảo và cây thế Tùng La Hán Cổ Thụ 600 năm tuổi giúp hạ nhiệt tự nhiên tới -14.1°C.
          </p>
        </div>

        {/* Interactive Master Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls & Configuration */}
          <div className="lg:col-span-5 space-y-6">
            {/* Preset Selector */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800/80 backdrop-blur-md">
              <h3 className="text-sm font-mono uppercase text-amber-400 tracking-wider mb-4">
                Cấu Hình Không Gian Thủy Đình
              </h3>
              <div className="space-y-3">
                {PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => setActivePreset(preset)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 min-h-[44px] flex flex-col justify-center ${
                      activePreset.id === preset.id
                        ? 'bg-amber-950/40 border border-amber-600/50 text-amber-200 shadow-[0_0_20px_rgba(217,119,6,0.15)]'
                        : 'bg-stone-800/40 border border-stone-800 text-stone-300 hover:bg-stone-800/80 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm font-medium">
                      <span>{preset.title}</span>
                      <span className="text-xs font-mono text-amber-400">{preset.coolingCapacity}</span>
                    </div>
                    <span className="text-xs text-stone-400 mt-1 line-clamp-1">
                      {preset.woodOrigin} · {preset.bonsaiType}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Microclimate Simulation Controller */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-stone-800/80 backdrop-blur-md space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-mono uppercase text-amber-400 tracking-wider">
                  Điều Tiết Bản Lề Cối Âm Dương
                </h3>
                <span className="text-xs font-mono text-amber-300">{hingeAngle}° Mở Xoay</span>
              </div>
              <input
                type="range"
                min="0"
                max="270"
                value={hingeAngle}
                onChange={(e) => setHingeAngle(Number(e.target.value))}
                className="w-full accent-amber-500 bg-stone-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-stone-400">
                <span>0° Đóng Kín Chống Bão</span>
                <span>135° Đón Gió Mát Mùa Nam</span>
                <span>270° Mở Rộng Toàn Cảnh Kênh</span>
              </div>

              <div className="pt-3 border-t border-stone-800/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-stone-300">Vận Tốc Gió Đối Lưu Tự Nhiên</span>
                  <span className="text-xs font-mono text-emerald-400">{(activePreset.airflowVelocity)}</span>
                </div>
                <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${airflowLevel}%` }}
                  />
                </div>
              </div>

              {/* Solfeggio Resonant Web Audio */}
              <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-stone-200">Âm Hưởng Trà Đạo Solfeggio</div>
                  <div className="text-[11px] text-stone-400 font-mono">
                    {activePreset.frequencies[0]}Hz & {activePreset.frequencies[1]}Hz Tần Số Tĩnh Tâm
                  </div>
                </div>
                <button
                  onClick={toggleAudio}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center gap-2 ${
                    isPlayingAudio
                      ? 'bg-amber-500 text-stone-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isPlayingAudio ? 'bg-stone-950 animate-ping' : 'bg-stone-500'}`} />
                  {isPlayingAudio ? 'Tắt Âm Thanh' : 'Kích Hoạt Chuông'}
                </button>
              </div>
            </div>
          </div>

          {/* Visual Presentation & Metrics */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-stone-800/90 relative overflow-hidden shadow-2xl">
              {/* Architectural Canvas Preview */}
              <div className="relative aspect-[16/10] rounded-2xl bg-stone-950 border border-stone-800/80 overflow-hidden flex items-center justify-center">
                {/* SVG Visual Representation */}
                <svg className="w-full h-full p-8" viewBox="0 0 600 380" fill="none">
                  {/* Canal Water Surface with Ripples */}
                  <rect x="0" y="260" width="600" height="120" fill="url(#canalGrad14B)" opacity="0.6" />
                  <path d="M0 290 C150 280, 300 300, 450 285 C520 278, 580 292, 600 290 L600 380 L0 380 Z" fill="#0c1a24" opacity="0.4" />
                  <path d="M0 320 C180 310, 320 330, 480 315 C550 310, 590 322, 600 320 L600 380 L0 380 Z" fill="#081017" opacity="0.6" />

                  {/* Moat Water Perimeter Ring */}
                  <ellipse cx="300" cy="270" rx="240" ry="60" stroke="#0ea5e9" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
                  <ellipse cx="300" cy="270" rx="210" ry="50" stroke="#38bdf8" strokeWidth="1" opacity="0.3" />

                  {/* Pavilion Stilts & Foundation */}
                  <rect x="180" y="230" width="12" height="60" fill="#78350f" rx="2" />
                  <rect x="408" y="230" width="12" height="60" fill="#78350f" rx="2" />
                  <rect x="240" y="240" width="10" height="40" fill="#92400e" rx="2" />
                  <rect x="350" y="240" width="10" height="40" fill="#92400e" rx="2" />

                  {/* Pavilion Base Platform */}
                  <polygon points="140,240 460,240 430,225 170,225" fill="#451a03" stroke="#b45309" strokeWidth="1.5" />

                  {/* Pavilion Hinged Doors (Dynamic Rotation) */}
                  <g transform={`rotate(${hingeAngle - 135} 200 180)`}>
                    <line x1="200" y1="130" x2="200" y2="225" stroke="#d97706" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
                    <rect x="195" y="140" width="8" height="75" fill="#f59e0b" opacity="0.3" rx="1" />
                  </g>
                  <g transform={`rotate(${-(hingeAngle - 135)} 400 180)`}>
                    <line x1="400" y1="130" x2="400" y2="225" stroke="#d97706" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
                    <rect x="397" y="140" width="8" height="75" fill="#f59e0b" opacity="0.3" rx="1" />
                  </g>

                  {/* Pavilion Columns */}
                  <line x1="220" y1="120" x2="220" y2="225" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />
                  <line x1="380" y1="120" x2="380" y2="225" stroke="#92400e" strokeWidth="6" strokeLinecap="round" />

                  {/* Imperial Curved Roof */}
                  <path d="M120 125 Q300 70 480 125 L450 115 Q300 60 150 115 Z" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
                  <path d="M150 115 Q300 50 450 115 L430 100 Q300 45 170 100 Z" fill="#78350f" stroke="#d97706" strokeWidth="1.5" />
                  {/* Roof Finial Jewel */}
                  <circle cx="300" cy="55" r="7" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                  <circle cx="300" cy="55" r="3" fill="#ffffff" />

                  {/* Bonsai Tùng La Hán Cổ Thụ 600 Năm Dáng Phụ Tử Tương Tùy */}
                  <g transform="translate(100, 160)">
                    {/* Bonsai Pot */}
                    <polygon points="10,60 50,60 44,72 16,72" fill="#292524" stroke="#78716c" strokeWidth="1" />
                    {/* Dual Trunks (Phụ Tử) */}
                    <path d="M25 60 Q15 35 22 10 Q28 0 20 -10" stroke="#44403c" strokeWidth="7" fill="none" strokeLinecap="round" />
                    <path d="M35 60 Q45 40 40 25 Q35 15 42 5" stroke="#57534e" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                    {/* Cloud Canopies */}
                    <ellipse cx="20" cy="-10" rx="16" ry="9" fill="#065f46" opacity="0.85" />
                    <ellipse cx="10" cy="15" rx="12" ry="7" fill="#047857" opacity="0.8" />
                    <ellipse cx="42" cy="5" rx="13" ry="8" fill="#059669" opacity="0.8" />
                    <ellipse cx="36" cy="25" rx="11" ry="6" fill="#10b981" opacity="0.75" />
                  </g>

                  {/* Breeze Airflow Flowlines */}
                  <path d="M50 190 C120 170, 200 200, 290 185 C360 170, 440 190, 550 180" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.6">
                    <animate attributeName="stroke-dashoffset" from="100" to="0" dur="4s" repeatCount="indefinite" />
                  </path>
                  <path d="M30 210 C140 195, 230 220, 310 205 C400 190, 480 210, 570 195" stroke="#67e8f9" strokeWidth="1" strokeDasharray="6 8" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" from="120" to="0" dur="3.5s" repeatCount="indefinite" />
                  </path>

                  {/* Gradients */}
                  <defs>
                    <linearGradient id="canalGrad14B" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Floating Metric Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/80 border border-stone-700/80 text-[11px] font-mono text-emerald-400">
                    Hạ Nhiệt: {activePreset.coolingCapacity}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/80 border border-stone-700/80 text-[11px] font-mono text-sky-400">
                    Chu Vi Hào: {activePreset.moatPerimeter}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 text-right">
                  <span className="px-2.5 py-1 rounded-md bg-stone-900/80 border border-amber-800/80 text-[11px] font-mono text-amber-300">
                    Cao Độ: {activePreset.elevation}
                  </span>
                </div>
              </div>

              {/* Descriptive Overview */}
              <div className="mt-6">
                <h4 className="text-xl font-serif text-stone-100 font-normal">
                  {activePreset.title}
                </h4>
                <p className="mt-2 text-sm text-stone-300 leading-relaxed font-light">
                  {activePreset.description}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="mt-6 pt-6 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
                  <div className="text-xs text-stone-400">Tuổi Gỗ Lõi</div>
                  <div className="text-sm font-mono text-amber-400 font-semibold mt-0.5">{activePreset.woodAge}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
                  <div className="text-xs text-stone-400">Tuổi Cây Thế</div>
                  <div className="text-sm font-mono text-emerald-400 font-semibold mt-0.5">{activePreset.bonsaiAge}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
                  <div className="text-xs text-stone-400">Gió Đối Lưu</div>
                  <div className="text-sm font-mono text-sky-400 font-semibold mt-0.5">{activePreset.airflowVelocity}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-950/60 border border-stone-800/60">
                  <div className="text-xs text-stone-400">Hòa Âm Solfeggio</div>
                  <div className="text-sm font-mono text-indigo-400 font-semibold mt-0.5">{activePreset.frequencies[0]}Hz / {activePreset.frequencies[1]}Hz</div>
                </div>
              </div>

              {/* Atelier Verification & Direct Hotline */}
              <div className="mt-6 p-4 rounded-xl bg-amber-950/30 border border-amber-900/40 space-y-2">
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
      </div>
    </section>
  );
}

export default SaigonCanalSideAncientHingedPoMuFlowerMoatPavilionV14;
