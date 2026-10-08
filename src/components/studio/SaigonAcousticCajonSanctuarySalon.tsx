'use client'

import React, { useState, useEffect, useRef } from 'react'

interface RhythmTrack {
  id: string
  title: string
  region: string
  tempo: number
  snareTension: string
  description: string
  frequencies: number[]
}

interface StrikeTechnique {
  id: string
  name: string
  vietnameseName: string
  pitch: string
  decay: number
  description: string
  impactZone: string
}

interface LightingScene {
  id: string
  name: string
  kelvin: number
  lux: number
  description: string
  colorTempHex: string
}

const RHYTHM_TRACKS: RhythmTrack[] = [
  {
    id: 'bossa-nova',
    title: 'Bossa Nova Hoàng Hôn',
    region: 'Sông Sài Gòn hoàng hôn',
    tempo: 124,
    snareTension: 'Căng nhuyễn 85%',
    description: 'Nhịp gõ lả lướt mềm mại kết hợp âm bass trầm êm ái và tiếng rào nhẹ của 4 dây snare guitar.',
    frequencies: [80, 120, 220, 800, 2800]
  },
  {
    id: 'rumba-flamenco',
    title: 'Rumba Flamenco',
    region: 'Âm sắc Andalucia vi khí hậu',
    tempo: 140,
    snareTension: 'Căng giòn 95%',
    description: 'Độ nảy đanh thép của mặt tapa Bạch Dương Phần Lan hòa quyện âm slap sắc sảo và tiếng rè kim loại.',
    frequencies: [85, 140, 320, 1200, 3200]
  },
  {
    id: 'ly-ngua-o',
    title: 'Biến Tấu Lý Ngựa Ô Nam Bộ',
    region: 'Dân gian đương đại Sài Gòn',
    tempo: 112,
    snareTension: 'Thả lỏng 70%',
    description: 'Tiết tấu vó ngựa giòn giã mô phỏng âm hưởng phương Nam, cộng hưởng cùng vòm gỗ Trắc đỏ đen dày dặn.',
    frequencies: [75, 110, 260, 950, 2400]
  }
]

const STRIKE_TECHNIQUES: StrikeTechnique[] = [
  {
    id: 'bass',
    name: 'Bass Strike',
    vietnameseName: 'Gõ Lòng Thùng - Âm Trầm 80Hz',
    pitch: '80 Hz',
    decay: 0.28,
    description: 'Bàn tay khép hờ tiếp xúc tâm mặt gõ tapa, tạo xung âm trầm tròn đầy kích hoạt buồng cộng hưởng gỗ Trắc ngàn năm.',
    impactZone: 'Tâm thùng (vùng 1/3 giữa)'
  },
  {
    id: 'slap',
    name: 'Slap Strike',
    vietnameseName: 'Vỗ Mép Trên - Âm Đanh 2.8kHz',
    pitch: '2.800 Hz',
    decay: 0.12,
    description: 'Các đầu ngón tay vỗ dứt khoát vào mép trên của mặt tapa, làm rung tức thời 4 dây snare thép mạ đồng.',
    impactZone: 'Mép trên cùng góc thùng'
  },
  {
    id: 'touch',
    name: 'Touch Strike',
    vietnameseName: 'Chạm Rê Ngón - Âm Tinh Tế 1.2kHz',
    pitch: '1.200 Hz',
    decay: 0.08,
    description: 'Lực miết nhẹ tạo nhịp ghost-note lướt qua bề mặt gỗ, tạo độ sâu không gian và triệt tiêu tạp âm phòng nghe.',
    impactZone: 'Toàn bộ viền mép biên'
  }
]

const LIGHTING_SCENES: LightingScene[] = [
  {
    id: 'intimate-2400k',
    name: 'Dạ Tiệc Thân Mật (2400K)',
    kelvin: 2400,
    lux: 45,
    description: 'Ánh nến ấm áp làm nổi bật thớ vân đỏ đen huyền bí của gỗ Trắc Nam Bộ và độ nhẵn mộc của mặt gõ.',
    colorTempHex: '#ffad5a'
  },
  {
    id: 'recital-2900k',
    name: 'Biểu Diễn Thính Phòng (2900K)',
    kelvin: 2900,
    lux: 120,
    description: 'Ánh sáng halogen studio chuẩn xác, tôn vinh hình khối vòm elip âm học và hệ tủ vi khí hậu 50% RH.',
    colorTempHex: '#ffd199'
  },
  {
    id: 'meditation-1900k',
    name: 'Thiền Định Tĩnh Lặng (1900K)',
    kelvin: 1900,
    lux: 20,
    description: 'Vệt sáng vàng hổ phách dịu êm đưa người nghe vào trạng thái lắng đọng tuyệt đối giữa phố thị phồn hoa.',
    colorTempHex: '#ff8a24'
  }
]

export function SaigonAcousticCajonSanctuarySalon() {
  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [activeStrike, setActiveStrike] = useState<string>('bass')
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0)
  const [snareTensionValue, setSnareTensionValue] = useState<number>(85)
  const [humidityLevel] = useState<number>(50.2)
  const [reverbTime] = useState<number>(0.31)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const selectedTrack = (RHYTHM_TRACKS[selectedTrackIndex] ?? RHYTHM_TRACKS[0]) as RhythmTrack
  const activeScene = (LIGHTING_SCENES[activeSceneIndex] ?? LIGHTING_SCENES[0]) as LightingScene

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {})
      }
    }
  }, [])

  const getAudioContext = () => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }

  const triggerStrikeSound = (strikeId: string) => {
    setActiveStrike(strikeId)
    const ctx = getAudioContext()
    const now = ctx.currentTime

    const strike = (STRIKE_TECHNIQUES.find((s) => s.id === strikeId) ?? STRIKE_TECHNIQUES[0]) as StrikeTechnique

    if (strike.id === 'bass') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(110, now)
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.15)
      
      gain.gain.setValueAtTime(0.7, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + strike.decay)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + strike.decay)
    } else if (strike.id === 'slap') {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(800, now)
      osc.frequency.exponentialRampToValueAtTime(2600, now + 0.04)

      gain.gain.setValueAtTime(0.5, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + strike.decay)

      // Add noise burst for snare rattle
      const bufferSize = ctx.sampleRate * 0.08
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const output = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }
      const whiteNoise = ctx.createBufferSource()
      whiteNoise.buffer = noiseBuffer

      const noiseFilter = ctx.createBiquadFilter()
      noiseFilter.type = 'highpass'
      noiseFilter.frequency.value = 1800

      const noiseGain = ctx.createGain()
      const snareFactor = snareTensionValue / 100
      noiseGain.gain.setValueAtTime(0.4 * snareFactor, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      whiteNoise.connect(noiseFilter)
      noiseFilter.connect(noiseGain)
      noiseGain.connect(ctx.destination)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      whiteNoise.start(now)
      osc.stop(now + strike.decay)
      whiteNoise.stop(now + 0.08)
    } else {
      // Touch ghost note
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(1200, now)
      gain.gain.setValueAtTime(0.18, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + strike.decay)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start(now)
      osc.stop(now + strike.decay)
    }
  }

  const togglePlayback = () => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current)
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      const track = selectedTrack
      let step = 0
      const intervalMs = Math.round((60 / track.tempo / 2) * 1000)

      timerRef.current = setInterval(() => {
        const pattern = [
          'bass', 'touch', 'slap', 'touch',
          'bass', 'bass', 'slap', 'touch'
        ]
        const currentStrike = (pattern[step % pattern.length] ?? 'bass') as string
        triggerStrikeSound(currentStrike)
        step++
      }, intervalMs)
    }
  }

  return (
    <section className="relative w-full bg-[#12100e] text-[#e2d9cc] py-20 px-4 md:px-8 border-y border-[#3d3229]/60 overflow-hidden font-sans">
      {/* Background Ambience */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(ellipse at 50% 20%, ${activeScene.colorTempHex} 0%, transparent 70%)`
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#c59b27]/40 bg-[#1c1815]/80 text-[#d4af37] text-xs uppercase tracking-widest mb-4">
            <span>Thính Phòng Hòa Âm Bản Địa</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            <span>GuHomes Studio 2026</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#f5efe6] mb-6 leading-tight">
            Thính Phòng Trống Cajon Vòm Trắc
          </h2>
          <p className="text-[#b5a797] text-base md:text-lg leading-relaxed font-light">
            Sự hội tụ tinh diệu giữa nghệ thuật mộc thủ công Nam Bộ và kỹ thuật xử lý âm học vi khí hậu nhiệt đới.
            Khung đàn tạc từ gỗ Trắc đỏ đen nghìn năm tuổi, vòm elip tiêu âm RT60 = 0.31s triệt tiêu hoàn toàn sóng đứng.
          </p>
        </div>

        {/* Acoustic Specs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14 bg-[#181412] p-5 rounded-2xl border border-[#2d2520]">
          <div className="border-r border-[#2d2520]/60 pr-4">
            <span className="block text-xs uppercase tracking-wider text-[#8c7e70] mb-1">Thời Gian Vang</span>
            <span className="text-xl md:text-2xl font-serif text-[#d4af37]">RT60 = {reverbTime}s</span>
            <span className="block text-[11px] text-[#716457] mt-0.5">Tiêu tán dải 100Hz - 4kHz</span>
          </div>
          <div className="border-r border-[#2d2520]/60 pr-4">
            <span className="block text-xs uppercase tracking-wider text-[#8c7e70] mb-1">Độ Ẩm Vi Khí Hậu</span>
            <span className="text-xl md:text-2xl font-serif text-[#d4af37]">{humidityLevel}% RH</span>
            <span className="block text-[11px] text-[#716457] mt-0.5">Tủ kính hút ẩm tự động</span>
          </div>
          <div className="border-r border-[#2d2520]/60 pr-4">
            <span className="block text-xs uppercase tracking-wider text-[#8c7e70] mb-1">Chất Liệu Khung Thùng</span>
            <span className="text-lg md:text-xl font-serif text-[#f5efe6]">Gỗ Trắc Đỏ Đen</span>
            <span className="block text-[11px] text-[#716457] mt-0.5">Mộc bản Nam Bộ ngâm sấy</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-[#8c7e70] mb-1">Mặt Gõ Tapa</span>
            <span className="text-lg md:text-xl font-serif text-[#f5efe6]">Bạch Dương 3mm</span>
            <span className="block text-[11px] text-[#716457] mt-0.5">4 Dây Snare Thép Mạ Đồng</span>
          </div>
        </div>

        {/* Main Grid: Interactive Stage & Audio Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: Visual Instrument & Strike Simulator (7 cols) */}
          <div className="lg:col-span-7 bg-[#171310] rounded-2xl p-6 md:p-8 border border-[#2b231e] relative shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#2d241f]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">Tương Tác Xung Âm Mặt Tapa</span>
                <h3 className="text-xl font-serif text-[#f5efe6] mt-1">Hộp Trống Cajon Nam Bộ Cao Cấp</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#251f1a] text-[#a39483] border border-[#382f28]">
                Vòm Elip Khử Phản Xạ
              </span>
            </div>

            {/* Visual Cajon Box Interactive Area */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#261f1a] to-[#120e0c] rounded-xl border-2 border-[#47382d] p-6 flex flex-col justify-between overflow-hidden group">
              {/* Wood Grain Simulation Details */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c59b27_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Top Slap Area */}
              <button
                type="button"
                onClick={() => triggerStrikeSound('slap')}
                className={`w-full py-4 px-3 rounded-lg border text-center transition-all min-h-[44px] cursor-pointer flex flex-col items-center justify-center ${
                  activeStrike === 'slap'
                    ? 'border-[#d4af37] bg-[#d4af37]/20 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'border-[#3d3229]/80 bg-[#1c1613]/80 hover:border-[#c59b27]/60'
                }`}
              >
                <span className="text-xs uppercase tracking-widest text-[#e5c158] font-medium">Vùng Vỗ Mép (Slap Strike)</span>
                <span className="text-[11px] text-[#a89988]">Tần số 2.800Hz - Rung 4 dây Snare giòn giã</span>
              </button>

              {/* Center Bass Area */}
              <button
                type="button"
                onClick={() => triggerStrikeSound('bass')}
                className={`w-4/5 mx-auto py-8 px-4 rounded-xl border text-center transition-all min-h-[44px] cursor-pointer flex flex-col items-center justify-center my-4 ${
                  activeStrike === 'bass'
                    ? 'border-[#d4af37] bg-[#d4af37]/25 shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                    : 'border-[#3d3229]/80 bg-[#1e1713]/90 hover:border-[#c59b27]/60'
                }`}
              >
                <span className="text-sm uppercase tracking-wider text-[#f5efe6] font-semibold">Tâm Thùng Gỗ Trắc (Bass Strike)</span>
                <span className="text-xs text-[#d4af37] mt-1">Xung trầm 80Hz - Buồng cộng hưởng sâu lắng</span>
                <span className="text-[10px] text-[#8c7e70] mt-1">Nhấp chuột hoặc chạm để cảm nhận nhịp đập</span>
              </button>

              {/* Rim Touch Area */}
              <button
                type="button"
                onClick={() => triggerStrikeSound('touch')}
                className={`w-full py-3 px-3 rounded-lg border text-center transition-all min-h-[44px] cursor-pointer flex flex-col items-center justify-center ${
                  activeStrike === 'touch'
                    ? 'border-[#d4af37] bg-[#d4af37]/20 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'border-[#3d3229]/80 bg-[#1c1613]/80 hover:border-[#c59b27]/60'
                }`}
              >
                <span className="text-xs uppercase tracking-widest text-[#c59b27] font-medium">Rê Mép Viền (Touch Ghost-Note)</span>
                <span className="text-[11px] text-[#a89988]">Tần số 1.200Hz - Âm chạm nhung mộc bản</span>
              </button>
            </div>

            {/* Snare Tension Regulator Slider */}
            <div className="mt-6 pt-5 border-t border-[#2d241f]">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="snare-tension-slider" className="text-xs uppercase tracking-wider text-[#b5a797]">
                  Độ Căng Dây Snare Kim Loại Bên Trong:
                </label>
                <span className="text-sm font-mono text-[#d4af37] font-medium">{snareTensionValue}%</span>
              </div>
              <input
                id="snare-tension-slider"
                type="range"
                min="30"
                max="100"
                value={snareTensionValue}
                onChange={(e) => setSnareTensionValue(Number(e.target.value))}
                className="w-full h-2 bg-[#2d2520] rounded-lg appearance-none cursor-pointer accent-[#d4af37]"
              />
              <div className="flex justify-between text-[11px] text-[#716457] mt-1">
                <span>Âm đục ấm (30%)</span>
                <span>Chuẩn thính phòng (85%)</span>
                <span>Giòn tan đanh thép (100%)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Track Player & Atmosphere (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Rhythm Track Player */}
            <div className="bg-[#171310] rounded-2xl p-6 border border-[#2b231e] shadow-xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#2d241f]">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#d4af37]">Trích Đoạn Nhịp Gõ Mộc</h4>
                <span className="text-[11px] text-[#8c7e70]">Web Audio API</span>
              </div>

              {/* Track Selector Buttons */}
              <div className="flex flex-col gap-2.5 mb-5">
                {RHYTHM_TRACKS.map((track, idx) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => {
                      if (isPlaying && timerRef.current) {
                        clearInterval(timerRef.current)
                        setIsPlaying(false)
                      }
                      setSelectedTrackIndex(idx)
                    }}
                    className={`text-left p-3.5 rounded-xl border transition-all min-h-[44px] cursor-pointer ${
                      selectedTrackIndex === idx
                        ? 'border-[#c59b27] bg-[#221c17]'
                        : 'border-[#2d2520] bg-[#14110f] hover:border-[#42362e]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-[#f5efe6]">{track.title}</span>
                      <span className="text-xs font-mono text-[#d4af37]">{track.tempo} BPM</span>
                    </div>
                    <p className="text-xs text-[#8c7e70] line-clamp-1">{track.description}</p>
                  </button>
                ))}
              </div>

              {/* Master Play Button */}
              <button
                type="button"
                onClick={togglePlayback}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#e5c158] text-[#12100e] font-semibold text-sm tracking-wide uppercase shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 min-h-[44px] cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                    <span>Tạm Dừng Thính Phòng</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span>Khởi Động Hòa Âm ({selectedTrack.title})</span>
                  </>
                )}
              </button>
            </div>

            {/* Lighting Scene Controller */}
            <div className="bg-[#171310] rounded-2xl p-6 border border-[#2b231e] shadow-xl">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#d4af37] mb-3">
                Kịch Bản Quang Tuyến Thính Phòng
              </h4>
              <p className="text-xs text-[#8c7e70] mb-4">
                Điều tiết quang phổ giữ sắc độ ấm áp cho gỗ Trắc cổ và tâm thế thư thái của gia chủ:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {LIGHTING_SCENES.map((scene, idx) => (
                  <button
                    key={scene.id}
                    type="button"
                    onClick={() => setActiveSceneIndex(idx)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all min-h-[44px] cursor-pointer flex flex-col items-center justify-center ${
                      activeSceneIndex === idx
                        ? 'border-[#d4af37] bg-[#231b15]'
                        : 'border-[#2d2520] bg-[#14110f] hover:border-[#3d3229]'
                    }`}
                  >
                    <span 
                      className="w-3 h-3 rounded-full mb-1.5 shadow-sm"
                      style={{ backgroundColor: scene.colorTempHex }}
                    />
                    <span className="text-[11px] font-medium text-[#f5efe6]">{scene.kelvin}K</span>
                    <span className="text-[10px] text-[#8c7e70]">{scene.lux} Lux</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#b5a797] italic mt-3 text-center">
                {activeScene.description}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Brand Verification Note */}
        <div className="pt-8 border-t border-[#2d241f] flex flex-col md:flex-row items-center justify-between text-xs text-[#8c7e70] gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
            <span>Xưởng mộc chế tác 1.200m² tại Thạnh Xuân, Q.12, TP. Hồ Chí Minh</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Hotline tư vấn âm học: <strong className="text-[#f5efe6] font-medium">0368 757 916</strong></span>
            <span>Email: <strong className="text-[#f5efe6] font-medium">guhomesvn@gmail.com</strong></span>
            <span className="hidden lg:inline text-[#625549]">Giới hạn 12 công trình/năm</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SaigonAcousticCajonSanctuarySalon
