'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type SceneId = 'dawn' | 'solar-shield' | 'evening-soiree' | 'night-sanctuary'

interface SceneDetail {
  id: SceneId
  num: string
  nameVi: string
  subtitleVi: string
  icon: string
  colorTempK: number
  colorHex: string
  brightnessPercent: number
  soundLevelDb: number
  draperyPercent: number
  hvacTempC: number
  airPurityPpm: number
  keypadAction: string
  sensoryNarrative: string
  knxActionSummary: string
  specs: {
    lighting: string
    hvac: string
    drapery: string
    audioAcoustic: string
  }
}

const SMART_SCENES: Record<SceneId, SceneDetail> = {
  dawn: {
    id: 'dawn',
    num: '01',
    nameVi: 'Bình Minh Thức Giấc',
    subtitleVi: 'Dawn Awakening · Nhịp sinh học tuần hoàn',
    icon: '🌅',
    colorTempK: 2400,
    colorHex: '#F6D2A2',
    brightnessPercent: 40,
    soundLevelDb: 28,
    draperyPercent: 35,
    hvacTempC: 25.5,
    airPurityPpm: 8,
    keypadAction: 'Nhấn 1 chạm nhẹ công tắc phay đồng thau đầu giường',
    sensoryNarrative:
      'Không có tiếng chuông báo thức giật mình. Rèm lanh Bỉ tự động hé mở 35% đón luồng gió ban mai sông Sài Gòn. Đèn LED Warm Dim nhẹ nhàng tăng độ sáng từ 1800K lên 2700K trong vòng 15 phút, kích hoạt tự nhiên hormone cortisol giúp bạn tỉnh giấc trong cảm giác sảng khoái.',
    knxActionSummary: 'Kích hoạt rèm động cơ Somfy êm ái + Dimmable LED 1800K-2700K + Cấp khí tươi ERV lọc PM2.5',
    specs: {
      lighting: 'Tăng sáng dần 15 phút, Warm Dim từ 1800K đến 2700K mô phỏng ánh dương thật',
      hvac: 'Hệ thống cấp khí tươi ERV Daikin bù oxy, tăng nhiệt độ phòng êm dịu lên 25.5°C',
      drapery: 'Mô-tơ rèm lanh Somfy giấu ray âm trần mở êm < 30dB, đón ánh sáng khuếch tán',
      audioAcoustic: 'Âm thanh tiếng chim hót mộc khu vườn Thảo Điền phát nhẹ từ loa âm trần Bang & Olufsen',
    },
  },
  'solar-shield': {
    id: 'solar-shield',
    num: '02',
    nameVi: 'Nắng Chiều Sài Gòn',
    subtitleVi: 'Tropical Solar Shield · Cách nhiệt vi khí hậu tự động',
    icon: '☀️',
    colorTempK: 3000,
    colorHex: '#FFECCC',
    brightnessPercent: 65,
    soundLevelDb: 26,
    draperyPercent: 85,
    hvacTempC: 24.0,
    airPurityPpm: 10,
    keypadAction: 'Tự động kích hoạt khi cảm biến bức xạ đo nhiệt độ mặt kính vượt 38°C',
    sensoryNarrative:
      'Lúc 14:30 khi nắng xế chiều nung nóng các khối kính căn hộ hướng Tây, hệ thống tự động hạ 85% lớp rèm cản nhiệt dệt sợi thủy tinh. Điều hòa VRV duy trì 24°C và đưa luồng gió lướt sát trần (hiệu ứng Coanda), giữ không gian mát rượi mà không có gió lạnh thốc vào người.',
    knxActionSummary: 'Cảm biến bức xạ mặt kính KNX + Đóng rèm cản nhiệt + Điều hòa luồng gió lướt trần Coanda',
    specs: {
      lighting: 'Bù sáng nhẹ bằng đèn hắt trần gián tiếp 3000K, giữ không gian sáng sủa tự nhiên',
      hvac: 'Điều hòa VRV miệng gió ABS tăng lưu lượng gió lạnh, duy trì nhiệt độ ổn định 24°C',
      drapery: 'Rèm cản nhiệt dệt mật độ cao hạ xuống, chặn 92% tia hồng ngoại và bức xạ nhiệt',
      audioAcoustic: 'Vách kính Low-E kín khít cách ly hoàn toàn tiếng còi xe giờ cao điểm bên ngoài',
    },
  },
  'evening-soiree': {
    id: 'evening-soiree',
    num: '03',
    nameVi: 'Dạ Tiệc Thân Mật',
    subtitleVi: 'Intimate Evening · Ánh vàng hổ phách đàm đạo',
    icon: '🍷',
    colorTempK: 2100,
    colorHex: '#E8A366',
    brightnessPercent: 50,
    soundLevelDb: 40,
    draperyPercent: 10,
    hvacTempC: 23.5,
    airPurityPpm: 6,
    keypadAction: 'Nhấn phím "Scene 3" tại sảnh đón hoặc bàn đảo bếp',
    sensoryNarrative:
      'Toàn bộ ánh sáng trắng công nghiệp bị triệt tiêu hoàn toàn. Căn nhà ngập tràn ánh vàng nến 2100K từ dải hắt trần cove và rãnh kệ tủ rượu gỗ óc chó. Hệ thống hút mùi đảo bếp hoạt động ở mức êm nhất, âm thanh Jazz mộc vang lên đầm ấm quanh bàn tiệc.',
    knxActionSummary: 'Đèn cove Warm Dim 2100K + Chiếu sáng điểm tác phẩm điêu khắc + Âm thanh đa vùng',
    specs: {
      lighting: 'Độ rọi 150 Lux ấm cúng, đèn rọi tranh CRI 98 tôn vinh bộ sưu tập gốm và tranh sơn mài',
      hvac: 'Nhiệt độ 23.5°C mát dịu, bổ sung 30% gió tươi duy trì sự sảng khoái khi đông khách',
      drapery: 'Rèm mở thoáng đón trọn tầm nhìn Panorama triệu đô sông Sài Gòn lung linh về đêm',
      audioAcoustic: 'Hệ thống âm thanh Hi-End đa vùng kích hoạt playlist Acoustic ấm áp',
    },
  },
  'night-sanctuary': {
    id: 'night-sanctuary',
    num: '04',
    nameVi: 'Tĩnh Lặng Tuyệt Đối',
    subtitleVi: 'Night Sanctuary · Giấc ngủ sâu dưới 22dB',
    icon: '🌙',
    colorTempK: 1800,
    colorHex: '#A06E44',
    brightnessPercent: 10,
    soundLevelDb: 21,
    draperyPercent: 100,
    hvacTempC: 25.0,
    airPurityPpm: 5,
    keypadAction: 'Nhấn giữ phím "Master Off" 1.5 giây tại táp đầu giường',
    sensoryNarrative:
      'Tắt toàn bộ đèn báo hiệu LED màu xanh/đỏ gây ô nhiễm ánh sáng trong phòng ngủ. Rèm lanh kép đóng kín 100% cản sáng tuyệt đối. Máy lạnh chuyển sang chế độ Whisper Quiet &lt; 22dB (êm hơn tiếng thở khẽ), giữ ẩm 60% bảo vệ niêm mạc họng cho giấc ngủ sâu không mộng mị.',
    knxActionSummary: 'Dập tắt 100% đèn LED báo nguồn + Đóng rèm cản sáng 100% + Chế độ quạt gió siêu êm 21dB',
    specs: {
      lighting: 'Tắt toàn bộ ánh sáng chính; chỉ để lại đèn rọi chân tường 1800K dẫn đường nếu thức dậy ban đêm',
      hvac: 'Điều hòa chạy ở mức tĩnh 21dB, tự động tăng 0.5°C lúc 03:00 sáng để cơ thể không bị nhiễm lạnh',
      drapery: 'Đóng kín 2 lớp rèm cản sáng Blackout 100%, cách âm tiếng còi tàu đêm sông Sài Gòn',
      audioAcoustic: 'Ngắt hoàn toàn sóng vô tuyến không cần thiết, phòng ngủ trở thành ốc đảo thanh lọc tâm trí',
    },
  },
}

export function SmartHomeQuietSanctuary({ className }: { className?: string }) {
  const [activeSceneId, setActiveSceneId] = useState<SceneId>('night-sanctuary')
  const scene = SMART_SCENES[activeSceneId] ?? SMART_SCENES['night-sanctuary']
  const uniqueId = useId()

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Công Nghệ Ẩn Mình Chuẩn KNX Châu Âu · GuHomes Quiet Technology
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Invisible Smart Home
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Nhà Thông Minh Vô Hình &amp; Tĩnh Lặng
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Nhà thông minh đỉnh cao không phải là những màn hình cảm ứng chói lóa hay đèn LED xanh đỏ nhấp nháy làm ô nhiễm giấc ngủ. Đó là công nghệ ẩn mình tuyệt đối, phục vụ xúc giác và nhịp sinh học thông qua công tắc cơ đồng thau mộc nguyên khối Ekinex / Basalte chuẩn Châu Âu.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Tiêu chuẩn dây Bus KNX tuổi thọ 30+ năm</span>
          </div>
        </div>

        {/* 4 Tactile Scene Plates Selector */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(SMART_SCENES) as SceneId[]).map((id) => {
            const sc = SMART_SCENES[id]
            const isSelected = activeSceneId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActiveSceneId(id)}
                className={cn(
                  'p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group',
                  isSelected
                    ? 'border-accent bg-canvas shadow-lg ring-1 ring-accent/40'
                    : 'border-line bg-surface hover:bg-canvas/60 hover:border-line-dark'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-accent">{sc.num}</span>
                  <span className="text-2xl group-hover:scale-110 transition-transform">{sc.icon}</span>
                </div>
                <div className="mt-4">
                  <h3 className="font-serif text-base font-medium text-ink">{sc.nameVi}</h3>
                  <p className="text-[11px] text-muted font-mono mt-1">{sc.colorTempK}K · {sc.soundLevelDb}dB</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Main Ambience Simulation Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Ambience Monitor & Physical Keypad Preview */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            {/* Live Atmosphere Light Box */}
            <div className="p-8 rounded-3xl bg-canvas border border-line relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Mô Phỏng Quang Phổ &amp; Âm Học Không Gian</span>
                <span className="text-accent font-semibold">Kịch Bản {scene.num}: {scene.nameVi}</span>
              </div>

              {/* Dynamic Ambience Chamber */}
              <div
                className="mt-6 relative h-64 sm:h-72 w-full rounded-2xl border border-line p-6 flex flex-col justify-between overflow-hidden transition-colors duration-700 shadow-inner"
                style={{
                  backgroundColor: '#161311',
                }}
              >
                {/* Simulated Glow from Cove Lighting */}
                <motion.div
                  key={scene.id}
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: scene.brightnessPercent / 100 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 10%, ${scene.colorHex} 0%, transparent 70%)`,
                  }}
                />

                {/* Status Chips Top Bar */}
                <div className="relative z-10 flex flex-wrap gap-2 text-[11px] font-mono text-white/90">
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    💡 Nhiệt độ màu: {scene.colorTempK}K
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    🔊 Độ ồn nền: {scene.soundLevelDb} dBA
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    🪟 Rèm lanh: Mở {scene.draperyPercent}%
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                    ❄️ Điều hòa: {scene.hvacTempC}°C
                  </span>
                </div>

                {/* Center Moodboard Copy */}
                <div className="relative z-10 max-w-md mx-auto text-center p-4 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent-soft">
                    {scene.subtitleVi}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-normal mt-1 text-white">
                    {scene.nameVi}
                  </h4>
                  <p className="text-xs text-white/70 mt-2 font-light leading-relaxed">
                    {scene.keypadAction}
                  </p>
                </div>

                {/* Bottom Air Quality & Noise Bar */}
                <div className="relative z-10 flex justify-between items-center text-[10px] font-mono text-white/60 pt-2 border-t border-white/10">
                  <span>Khí tươi ERV: {scene.airPurityPpm} μg/m³ (Chuẩn WHO)</span>
                  <span>KNX Invisible Scene Active</span>
                </div>
              </div>

              {/* Real-time Metric Gauges */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-line/60">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Quang thông ánh sáng</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {scene.brightnessPercent}%
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Warm Dim 0–100%</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Độ ồn máy lạnh</p>
                  <p className="text-2xl font-serif mt-1 font-light text-accent">
                    {scene.soundLevelDb} dB
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Êm hơn tiếng thở (&lt;25dB)</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Độ rọi Kelvin</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {scene.colorTempK}K
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Circadian Rhythm</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <p className="text-[11px] font-mono text-muted">Bụi mịn PM2.5</p>
                  <p className="text-2xl font-serif mt-1 font-light text-ink">
                    {scene.airPurityPpm} <span className="text-xs">μg/m³</span>
                  </p>
                  <p className="text-[10px] text-muted mt-0.5">Lọc tĩnh điện Daikin</p>
                </div>
              </div>
            </div>

            {/* Sensory Narrative Box */}
            <div className="p-6 rounded-3xl bg-surface border border-line text-xs font-mono">
              <span className="text-accent uppercase tracking-wider block mb-2 font-semibold">
                Ký Ức Xúc Giác &amp; Cảm Nhận Thực Tế
              </span>
              <p className="text-sm font-light text-ink leading-relaxed font-sans">
                {scene.sensoryNarrative}
              </p>
              <div className="mt-4 pt-3 border-t border-line/60 text-[11px] text-muted flex items-center gap-2">
                <span className="text-accent">✓ Lệnh bus ngầm:</span>
                <span>{scene.knxActionSummary}</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Subsystem Specs & Hardware Standards */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* 4 Systems Automation Matrix */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Hạ Tầng Điều Khiển Tự Động
              </span>
              <h3 className="font-serif text-2xl text-ink font-light mt-2">
                4 Phân Hệ Tích Hợp Đồng Bộ
              </h3>

              <div className="mt-6 space-y-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <span className="text-accent">01. Chiếu Sáng</span>
                    <span className="text-muted text-[10px]">· DALI-2 &amp; KNX</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    {scene.specs.lighting}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <span className="text-accent">02. Vi Khí Hậu &amp; Điều Hòa</span>
                    <span className="text-muted text-[10px]">· Daikin / Mitsubishi VRV</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    {scene.specs.hvac}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <span className="text-accent">03. Động Cơ Rèm &amp; Che Nắng</span>
                    <span className="text-muted text-[10px]">· Somfy Sonesse Ultra</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    {scene.specs.drapery}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface border border-line">
                  <div className="flex items-center gap-2 text-ink font-semibold">
                    <span className="text-accent">04. Âm Thanh &amp; Tiêu Âm</span>
                    <span className="text-muted text-[10px]">· Hi-End Multi-zone</span>
                  </div>
                  <p className="text-muted font-light mt-1.5 leading-relaxed">
                    {scene.specs.audioAcoustic}
                  </p>
                </div>
              </div>
            </div>

            {/* Why KNX Wired vs Zigbee/Wi-Fi Callout */}
            <div className="p-6 rounded-3xl bg-surface border border-line text-xs font-mono">
              <span className="text-muted uppercase tracking-wider block mb-2 font-semibold">
                Tại Sao GuHomes Chọn Dây Bus KNX Thay Vì Wi-Fi?
              </span>
              <p className="text-muted font-light leading-relaxed">
                Các hệ thống nhà thông minh không dây (Tuya/Zigbee) thường xuyên chập chờn, rớt mạng và lỗi kết nối sau 2 năm. GuHomes đi dây cáp bus chuyên dụng KNX ngầm trong tường: phản hồi tức thì 0.05 giây, bảo mật tuyệt đối không bị hack, và bền bỉ hơn 30 năm song hành cùng tuổi thọ công trình.
              </p>
            </div>

            {/* Consultation CTA */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-espresso to-[#2B231D] text-canvas relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Trải Nghiệm Thực Tế
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-canvas mt-2">
                Trực tiếp bấm thử công tắc phay đồng thau tại Studio
              </h4>
              <p className="text-xs text-canvas/80 mt-3 font-light leading-relaxed">
                Mời bạn ghé thăm Studio GuHomes để chạm thử cảm giác nhấn đầm chắc của phím cơ mộc Ekinex và trải nghiệm sự chuyển đổi ánh sáng Warm Dim không giật mắt.
              </p>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
                >
                  <span>Đặt lịch trải nghiệm công nghệ KNX</span>
                  <ArrowUpRightIcon className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
