'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

export type SoundscapeType = 'wood' | 'rain' | 'wind'

interface SoundscapeTrack {
  id: SoundscapeType
  name: string
  subtitle: string
  icon: string
  color: string
}

const TRACKS: SoundscapeTrack[] = [
  {
    id: 'wood',
    name: 'Tiếng Mộc May Đo',
    subtitle: 'Âm hưởng xưởng mộc Thạnh Xuân',
    icon: '🪵',
    color: '#D4A373',
  },
  {
    id: 'rain',
    name: 'Mưa Nhiệt Đới Thảo Điền',
    subtitle: 'Mưa rơi tí tách trên ban công xanh',
    icon: '🌧️',
    color: '#2DD4BF',
  },
  {
    id: 'wind',
    name: 'Gió Đối Lưu Sông Sài Gòn',
    subtitle: 'Gió sông luồn qua hệ lam gỗ êm đềm',
    icon: '🍃',
    color: '#60A5FA',
  },
]

export function SensorySoundscape({ className }: { className?: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<SoundscapeType>('wood')
  const [volume, setVolume] = useState(0.2) // Subtle 20% volume
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const activeNodesRef = useRef<{
    stop: () => void
  } | null>(null)

  // Initialize or get AudioContext
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
      const masterGain = audioCtxRef.current.createGain()
      masterGain.gain.setValueAtTime(volume, audioCtxRef.current.currentTime)
      masterGain.connect(audioCtxRef.current.destination)
      masterGainRef.current = masterGain
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume()
    }
    return audioCtxRef.current
  }, [volume])

  // Stop current synthesizer nodes
  const stopCurrentNodes = useCallback(() => {
    if (activeNodesRef.current) {
      activeNodesRef.current.stop()
      activeNodesRef.current = null
    }
  }, [])

  // Pure Web Audio API: Synthesize "Gió Đối Lưu Sông Sài Gòn"
  const startWindSynth = useCallback((ctx: AudioContext, destination: GainNode) => {
    const bufferSize = ctx.sampleRate * 3
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let lastOut = 0.0

    // Brown noise for deep wind rumble
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      const val = (lastOut + 0.02 * white) / 1.02
      lastOut = val
      output[i] = val * 3.5
    }

    const whiteNoise = ctx.createBufferSource()
    whiteNoise.buffer = noiseBuffer
    whiteNoise.loop = true

    // Lowpass filter with slow undulating sweep
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(280, ctx.currentTime)

    // LFO to simulate river breeze swells
    const lfo = ctx.createOscillator()
    lfo.frequency.setValueAtTime(0.2, ctx.currentTime) // 5s cycle
    const lfoGain = ctx.createGain()
    lfoGain.gain.setValueAtTime(140, ctx.currentTime)
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.01, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 1.5)

    whiteNoise.connect(filter)
    filter.connect(gain)
    gain.connect(destination)

    whiteNoise.start()
    lfo.start()

    return {
      stop: () => {
        try {
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5)
          setTimeout(() => {
            whiteNoise.stop()
            lfo.stop()
            whiteNoise.disconnect()
            filter.disconnect()
          }, 600)
        } catch {}
      },
    }
  }, [])

  // Pure Web Audio API: Synthesize "Mưa Nhiệt Đới Thảo Điền"
  const startRainSynth = useCallback((ctx: AudioContext, destination: GainNode) => {
    const bufferSize = ctx.sampleRate * 2
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0

    // Pink noise generator for gentle rainfall texture
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.016898
      const val = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11
      output[i] = val
      b6 = white * 0.115926
    }

    const rainSource = ctx.createBufferSource()
    rainSource.buffer = noiseBuffer
    rainSource.loop = true

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(1200, ctx.currentTime)
    bandpass.Q.setValueAtTime(0.8, ctx.currentTime)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.01, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 1.2)

    rainSource.connect(bandpass)
    bandpass.connect(gain)
    gain.connect(destination)

    rainSource.start()

    // Periodic soft raindrop resonant pings on leaves
    let isDropletActive = true
    const dropletInterval = setInterval(() => {
      if (!isDropletActive || ctx.state !== 'running') return
      try {
        const dropOsc = ctx.createOscillator()
        const dropGain = ctx.createGain()
        const freq = 1600 + Math.random() * 1200
        dropOsc.frequency.setValueAtTime(freq, ctx.currentTime)
        dropOsc.frequency.exponentialRampToValueAtTime(freq * 0.5, ctx.currentTime + 0.08)

        dropGain.gain.setValueAtTime(0.08, ctx.currentTime)
        dropGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

        dropOsc.connect(dropGain)
        dropGain.connect(destination)

        dropOsc.start()
        dropOsc.stop(ctx.currentTime + 0.09)
      } catch {}
    }, 450)

    return {
      stop: () => {
        isDropletActive = false
        clearInterval(dropletInterval)
        try {
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5)
          setTimeout(() => {
            rainSource.stop()
            rainSource.disconnect()
            bandpass.disconnect()
          }, 600)
        } catch {}
      },
    }
  }, [])

  // Pure Web Audio API: Synthesize "Tiếng Mộc May Đo"
  const startWoodSynth = useCallback((ctx: AudioContext, destination: GainNode) => {
    // Gentle ambient workshop resonance + rhythmic wood planing sound
    const bufferSize = ctx.sampleRate * 2
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = noiseBuffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.15
    }

    const shavingNoise = ctx.createBufferSource()
    shavingNoise.buffer = noiseBuffer
    shavingNoise.loop = true

    const lowpass = ctx.createBiquadFilter()
    lowpass.type = 'lowpass'
    lowpass.frequency.setValueAtTime(450, ctx.currentTime)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0.01, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1)

    shavingNoise.connect(lowpass)
    lowpass.connect(gain)
    gain.connect(destination)

    shavingNoise.start()

    // Gentle woodblock chime / tapping cadence (wooden mallet & timber chisel)
    let isTapping = true
    const tapInterval = setInterval(() => {
      if (!isTapping || ctx.state !== 'running') return
      try {
        const osc = ctx.createOscillator()
        const tapGain = ctx.createGain()
        osc.type = 'sine'
        const baseFreq = 220 + (Math.random() > 0.5 ? 40 : 0)
        osc.frequency.setValueAtTime(baseFreq, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.7, ctx.currentTime + 0.15)

        tapGain.gain.setValueAtTime(0.12, ctx.currentTime)
        tapGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)

        osc.connect(tapGain)
        tapGain.connect(destination)

        osc.start()
        osc.stop(ctx.currentTime + 0.16)
      } catch {}
    }, 1200)

    return {
      stop: () => {
        isTapping = false
        clearInterval(tapInterval)
        try {
          gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5)
          setTimeout(() => {
            shavingNoise.stop()
            shavingNoise.disconnect()
            lowpass.disconnect()
          }, 600)
        } catch {}
      },
    }
  }, [])

  // Start synthesizing the active track
  const playTrack = useCallback(
    (track: SoundscapeType) => {
      const ctx = getAudioContext()
      if (!masterGainRef.current) return

      stopCurrentNodes()

      if (track === 'wind') {
        activeNodesRef.current = startWindSynth(ctx, masterGainRef.current)
      } else if (track === 'rain') {
        activeNodesRef.current = startRainSynth(ctx, masterGainRef.current)
      } else if (track === 'wood') {
        activeNodesRef.current = startWoodSynth(ctx, masterGainRef.current)
      }

      setIsPlaying(true)
    },
    [getAudioContext, stopCurrentNodes, startWindSynth, startRainSynth, startWoodSynth],
  )

  // Pause on page visibility change (tab blur)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && isPlaying) {
        if (audioCtxRef.current?.state === 'running') {
          audioCtxRef.current.suspend()
        }
      } else if (!document.hidden && isPlaying) {
        if (audioCtxRef.current?.state === 'suspended') {
          audioCtxRef.current.resume()
        }
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [isPlaying])

  // Update volume
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(volume, audioCtxRef.current.currentTime + 0.1)
    }
  }, [volume])

  const togglePlay = () => {
    if (isPlaying) {
      stopCurrentNodes()
      setIsPlaying(false)
    } else {
      playTrack(currentTrack)
    }
  }

  const changeTrack = (track: SoundscapeType) => {
    setCurrentTrack(track)
    if (isPlaying) {
      playTrack(track)
    }
  }

  const activeTrackObj = TRACKS.find((t) => t.id === currentTrack) ?? TRACKS[0]!

  return (
    <div className={cn('relative inline-flex items-center font-sans select-none', className)}>
      {/* Soundscape Control Capsule */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/90 border border-line/80 shadow-md backdrop-blur-md transition-all hover:border-accent/60">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={cn(
            'w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 text-xs',
            isPlaying
              ? 'bg-accent text-white shadow-sm shadow-accent/40 animate-pulse'
              : 'bg-canvas text-muted hover:text-ink border border-line',
          )}
          title={isPlaying ? 'Dừng âm thanh xúc giác' : 'Bật âm thanh không gian'}
          aria-label={isPlaying ? 'Dừng âm thanh' : 'Bật âm thanh'}
        >
          {isPlaying ? (
            <span className="flex items-center gap-0.5">
              <span className="w-0.5 h-2.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 h-3.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </span>
          ) : (
            <span>♫</span>
          )}
        </button>

        {/* Current Track Label & Selector Trigger */}
        <button
          onClick={() => setIsMenuOpen((o) => !o)}
          className="flex items-center gap-1.5 text-xs text-left group"
        >
          <span className="text-sm">{activeTrackObj.icon}</span>
          <span className="font-body font-medium text-ink/85 group-hover:text-accent transition-colors max-w-[140px] truncate hidden sm:inline">
            {activeTrackObj.name}
          </span>
          <span className="text-[10px] text-muted/60 transition-transform group-hover:translate-y-0.5">▼</span>
        </button>

        {/* Volume Slider */}
        {isPlaying ? (
          <input
            type="range"
            min="0"
            max="0.4"
            step="0.02"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-12 h-1 bg-line rounded-lg appearance-none cursor-pointer accent-accent hidden sm:inline-block"
            title={`Âm lượng: ${Math.round((volume / 0.4) * 100)}%`}
          />
        ) : null}
      </div>

      {/* Track Selection Popover */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-2 w-72 bg-surface/98 border border-line/90 rounded-2xl p-3 shadow-2xl backdrop-blur-xl z-50 text-ink"
          >
            <div className="flex items-center justify-between pb-2 border-b border-line/60">
              <span className="text-[11px] font-mono text-muted uppercase tracking-wider">Không gian âm học Quiet Luxury</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-muted hover:text-ink text-xs p-1"
                aria-label="Đóng"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              {TRACKS.map((track) => {
                const isActive = currentTrack === track.id
                return (
                  <button
                    key={track.id}
                    onClick={() => {
                      changeTrack(track.id)
                      setIsMenuOpen(false)
                    }}
                    className={cn(
                      'flex items-center gap-3 p-2.5 rounded-xl text-left transition-all',
                      isActive
                        ? 'bg-accent/15 border border-accent/40 text-accent font-medium'
                        : 'hover:bg-canvas text-ink/80',
                    )}
                  >
                    <span className="text-xl shrink-0">{track.icon}</span>
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-medium leading-tight">{track.name}</span>
                      <span className="text-[10px] text-muted truncate mt-0.5">{track.subtitle}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            <p className="text-[10px] text-muted/60 mt-3 pt-2 border-t border-line/40 text-center font-mono">
              Âm thanh tạo bằng Web Audio API · 0ms latency
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
