'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon } from '@/components/ui/icons'

interface AcousticLayer {
  step: string
  nameVi: string
  specVi: string
  frequencyTargetVi: string
  descriptionVi: string
  absorptionCoeffVi: string
}

const ACOUSTIC_LAYERS: AcousticLayer[] = [
  {
    step: '01',
    nameVi: 'Tán Âm Toán Học QRD Gỗ Óc Chó (Quadratic Residue Diffuser)',
    specVi: 'Phay gỗ Óc Chó Bắc Mỹ nguyên khối CNC độ sâu đa tầng tại xưởng Thạnh Xuân',
    frequencyTargetVi: '500 Hz – 4.000 Hz (Dải giọng nói điện ảnh & nhạc cụ)',
    descriptionVi:
      'Các rãnh phay toán học theo chuỗi số nguyên tố khuếch tán sóng âm đều khắp phòng mà không làm mất năng lượng âm thanh. Giữ cho giọng thoại diễn viên tròn vành rõ chữ, âm trường mở rộng tự nhiên như trong nhà hát.',
    absorptionCoeffVi: 'Hệ số tán âm Diffusion Coeff: 0.88',
  },
  {
    step: '02',
    nameVi: 'Bẫy Âm Trầm Góc Phòng Kẹp Len Kvadrat (Corner Bass Trap)',
    specVi: 'Khoang bẫy góc vát 45° nén bông khoáng 100kg/m³ bọc len cừu Đan Mạch',
    frequencyTargetVi: '30 Hz – 120 Hz (Dải tiếng nổ điện ảnh & âm trầm sâu)',
    descriptionVi:
      'Góc phòng là nơi tích tụ áp suất âm trầm tạo nên hiện tượng ù rền khó chịu (Room Modes). Bass Trap triệt tiêu sóng đứng, biến âm bass của dàn loa Subwoofer thành những cú đấm sâu, gọn gàng và dứt khoát.',
    absorptionCoeffVi: 'Hệ số hấp thụ dải trầm NRC: 0.95 ở 63Hz',
  },
  {
    step: '03',
    nameVi: 'Vách Cách Âm Khối Nặng Kép Knauf Cleaneo (Double-Stud Wall)',
    specVi: 'Hệ khung đôi tách biệt cơ học cách âm STC 68 chống rung sàn bê tông',
    frequencyTargetVi: '20 Hz – 20.000 Hz (Toàn dải âm thanh điện ảnh Dolby Atmos)',
    descriptionVi:
      'Kết cấu phòng trong phòng (Room-in-Room) với chân đế đệm cao su Neoprene hấp thụ xung động. Thượng khách có thể thưởng thức bom tấn âm lượng 105dB lúc nửa đêm mà phòng ngủ bên cạnh vẫn tĩnh lặng như tờ.',
    absorptionCoeffVi: 'Chỉ số cách âm vách STC: 68 dB',
  },
  {
    step: '04',
    nameVi: 'Trần Bầu Trời Sao Tiêu Âm & Rèm Kéo Nhung Nặng 800g/m²',
    specVi: 'Sợi quang học dẫn sáng Constellation + Nhung cotton chống cháy tiêu âm',
    frequencyTargetVi: '2.000 Hz – 16.000 Hz (Dải tiếng mưa rơi, lá rơi, tiếng thì thầm)',
    descriptionVi:
      'Mặt trần mô phỏng bầu trời sao đêm kết hợp bông tiêu âm sợi polyester tái chế. Hấp thụ các sóng phản xạ bậc cao từ trên xuống, tạo hiệu ứng âm thanh vòm Dolby Atmos trôi nổi lơ lửng trên không trung.',
    absorptionCoeffVi: 'NRC: 0.92 dải tần số cao',
  },
]

export function BespokeAcousticHomeCinemaLab({ className }: { className?: string } = {}) {
  const [activeLayerIndex, setActiveLayerIndex] = useState<number>(0)
  const [acousticMode, setAcousticMode] = useState<'calibrated' | 'untreated'>('calibrated')
  const [isAudioSimPlaying, setIsAudioSimPlaying] = useState<boolean>(false)

  const currentLayer = ACOUSTIC_LAYERS[activeLayerIndex] ?? ACOUSTIC_LAYERS[0]!

  const rt60Time = acousticMode === 'calibrated' ? 0.30 : 1.25
  const clarityIndexD50 = acousticMode === 'calibrated' ? 92 : 48

  return (
    <section className={cn('relative overflow-hidden bg-[#0a0a0d] py-24 text-[#e2e2ea] border-t border-[#1a1a24]', className)}>
      {/* Cinematic Deep Violet/Indigo Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(112,66,248,0.08),transparent_65%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2d2448] bg-[#141024] px-3.5 py-1 text-xs uppercase tracking-[0.2em] text-[#a78bfa]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa] animate-ping" />
            Âm Học Điện Ảnh Tư Gia · Dolby Atmos &amp; THX Certified Cinema Lab
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#f5f3ff]">
            Phòng Chiếu Phim Hi-End &amp; Tán Âm Gỗ Óc Chó
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#9d9aa8]">
            Âm thanh đỉnh cao không đến từ việc mua chiếc loa đắt nhất, mà đến từ việc kiểm soát từng phản xạ của sóng âm trong phòng. GuHomes kết hợp cấu kiện tán âm toán học QRD phay gỗ óc chó Thạnh Xuân với bẫy trầm Kvadrat để mang đến trải nghiệm điện ảnh chân thực rung cảm từng giác quan.
          </p>
        </div>

        {/* 2-Column Core Architecture */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left Column: 4 Technical Acoustic Anatomy Layers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-[#231e36] bg-[#100d1c]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#211b33] pb-5">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#a78bfa]">
                    4 Tầng Giải Phẫu Âm Học Phòng Chiếu
                  </span>
                  <h3 className="mt-1 font-serif text-xl sm:text-2xl text-[#f5f3ff]">
                    Kiểm Soát Toàn Dải Từ 30Hz Đến 20.000Hz
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#1b152e] px-3 py-1 text-xs font-mono text-[#a78bfa]">
                  <span>Tiêu chuẩn: THX pm3 &amp; Dolby Atmos</span>
                </div>
              </div>

              {/* Layer Selection Chips */}
              <div className="mt-6 flex flex-col gap-2.5">
                {ACOUSTIC_LAYERS.map((layer, idx) => {
                  const isSelected = idx === activeLayerIndex
                  return (
                    <button
                      key={layer.step}
                      type="button"
                      onClick={() => setActiveLayerIndex(idx)}
                      className={cn(
                        'flex items-center justify-between p-3.5 rounded-xl border text-left transition-all min-h-[56px]',
                        isSelected
                          ? 'border-[#a78bfa] bg-[#21183c] text-white shadow-[0_0_15px_rgba(167,139,250,0.18)]'
                          : 'border-[#211b33] bg-[#0c0a14] text-[#8e8a9d] hover:border-[#382b5c] hover:text-[#dcd8ed]'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#2e2154] font-mono text-xs font-bold text-[#c4b5fd]">
                          {layer.step}
                        </span>
                        <div>
                          <span className="block text-xs sm:text-sm font-medium">
                            {layer.nameVi.split(' (')[0]}
                          </span>
                          <span className="block text-[11px] text-[#787388] line-clamp-1">
                            {layer.frequencyTargetVi}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#a78bfa]/80 hidden sm:inline">
                        {layer.step === '01' ? 'QRD Diffuser' : layer.step === '02' ? 'Bass Trap' : layer.step === '03' ? 'STC 68' : 'RT60 0.3s'}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Active Layer Detail Card */}
              <div className="mt-6 rounded-xl border border-[#2b2245] bg-[#161129] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#a78bfa]">
                    TẦNG {currentLayer.step} · CHI TIẾT CẤU KIỆN
                  </span>
                  <span className="rounded-full bg-[#271d44] px-2.5 py-0.5 font-mono text-[10px] text-[#c4b5fd]">
                    {currentLayer.absorptionCoeffVi}
                  </span>
                </div>

                <h4 className="mt-2 font-serif text-lg sm:text-xl text-[#f5f3ff]">
                  {currentLayer.nameVi}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#c3bed4]">
                  {currentLayer.descriptionVi}
                </p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#231b38]">
                  <div className="rounded-lg bg-[#0e0a1a] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#6f6786]">Quy Cách Sản Xuất</span>
                    <span className="mt-1 block text-xs font-medium text-[#dcd8ed]">
                      {currentLayer.specVi}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[#0e0a1a] p-3">
                    <span className="block font-mono text-[10px] uppercase text-[#6f6786]">Dải Tần Số Mục Tiêu</span>
                    <span className="mt-1 block text-xs font-medium text-[#a78bfa]">
                      {currentLayer.frequencyTargetVi}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive RT60 Acoustic Simulator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#231e36] bg-[#100d1c]/90 p-6 sm:p-8 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-[#211b33] pb-4">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#a78bfa]">
                    Mô Phỏng Âm Học RT60 &amp; Độ Rõ Tiếng
                  </span>
                  <h3 className="mt-1 font-serif text-lg sm:text-xl text-[#f5f3ff]">
                    Phòng Trước vs Sau Xử Lý GuHomes
                  </h3>
                </div>
              </div>

              {/* Mode Toggle Switch */}
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-[#090710] p-1.5 border border-[#211b33]">
                <button
                  type="button"
                  onClick={() => setAcousticMode('calibrated')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    acousticMode === 'calibrated'
                      ? 'bg-[#a78bfa] text-[#0d091b] font-bold shadow-md'
                      : 'text-[#878099] hover:text-[#a78bfa]'
                  )}
                >
                  Rạp GuHomes (THX &amp; QRD)
                </button>
                <button
                  type="button"
                  onClick={() => setAcousticMode('untreated')}
                  className={cn(
                    'py-2 px-3 rounded-lg text-xs font-mono transition-all text-center',
                    acousticMode === 'untreated'
                      ? 'bg-red-900 text-white font-bold shadow-md'
                      : 'text-[#878099] hover:text-white'
                  )}
                >
                  Phòng Chưa Xử Lý (Gạch Men)
                </button>
              </div>

              {/* Visualized RT60 Meter */}
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-[#2a2245] bg-[#130f24] p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#c4b5fd] font-medium">Thời Gian Âm Vang RT60 (Reverberation Time)</span>
                    <span className="font-mono font-bold text-base text-[#a78bfa]">{rt60Time.toFixed(2)} giây</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-[#0a0714] overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        acousticMode === 'calibrated'
                          ? 'w-[24%] bg-gradient-to-r from-[#6d28d9] to-[#a78bfa]'
                          : 'w-[95%] bg-gradient-to-r from-orange-500 to-red-600'
                      )}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-mono text-[#78718e]">
                    <span>Chuẩn THX: 0.25s - 0.35s</span>
                    <span>{acousticMode === 'calibrated' ? '✓ Đạt Chuẩn Điện Ảnh Tuyệt Đối' : '⚠️ Bị Vang Kéo Dài Quá Mức'}</span>
                  </div>
                </div>

                <div className="rounded-xl border border-[#2a2245] bg-[#130f24] p-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#c4b5fd] font-medium">Chỉ Số Rõ Lời Thoại Điện Ảnh D50</span>
                    <span className="font-mono font-bold text-base text-[#a78bfa]">{clarityIndexD50}%</span>
                  </div>
                  <div className="mt-2 h-2.5 w-full rounded-full bg-[#0a0714] overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        acousticMode === 'calibrated'
                          ? 'w-[92%] bg-gradient-to-r from-[#7c3aed] to-[#c4b5fd]'
                          : 'w-[48%] bg-gradient-to-r from-amber-600 to-red-500'
                      )}
                    />
                  </div>
                  <span className="mt-1.5 block text-[10px] text-[#9b94af]">
                    {acousticMode === 'calibrated'
                      ? 'Từng tiếng thì thầm của nhân vật trong bom tấn điện ảnh nghe tách bạch, không bị lấn át bởi tiếng nổ bass.'
                      : 'Tiếng nổ trầm làm rung kính và ù tai, lời thoại diễn viên bị nhòe khó nghe rõ.'}
                  </span>
                </div>
              </div>

              {/* Audio Demo Simulator Button */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setIsAudioSimPlaying(!isAudioSimPlaying)}
                  className="w-full flex items-center justify-between p-3 rounded-xl border border-[#2b2245] bg-[#0c0916] text-xs font-mono text-[#c4b5fd] hover:border-[#a78bfa] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{isAudioSimPlaying ? '⏸' : '▶️'}</span>
                    <span>{isAudioSimPlaying ? 'Đang mô phỏng dải tần âm học...' : 'Nghe thử mô phỏng âm thanh mẫu'}</span>
                  </div>
                  <span className="text-[10px] text-[#78718e]">
                    {acousticMode === 'calibrated' ? 'Dolby Atmos 7.2.4' : 'Stereo Thô'}
                  </span>
                </button>
              </div>

              {/* CTA Consultation */}
              <div className="mt-6 pt-4 border-t border-[#211b33]">
                <Link
                  href="/du-toan-chi-phi"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#a78bfa] py-3.5 text-center text-xs font-mono font-bold tracking-wider text-[#0e0a1a] hover:bg-[#c4b5fd] transition-all shadow-[0_4px_20px_rgba(167,139,250,0.25)]"
                >
                  <span>Dự toán trọn gói phòng chiếu phim tư gia</span>
                  <ArrowUpRightIcon className="text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
