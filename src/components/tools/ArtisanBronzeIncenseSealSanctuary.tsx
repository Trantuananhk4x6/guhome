'use client'

import { useState, useId, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'

type SealPattern = 'van-chu' | 'hoa-sen' | 'gia-huy'

interface PatternOption {
  id: SealPattern
  name: string
  burnMinutes: number
  symbolism: string
  ashWidth: string
  patternPath: string
}

const PATTERNS: Record<SealPattern, PatternOption> = {
  'van-chu': {
    id: 'van-chu',
    name: 'Triện Chữ Vạn Vô Cực (Swastika Eternity)',
    burnMinutes: 45,
    symbolism: 'Vạn điều cát tường, vòng tròn phúc lộc tuần hoàn không bao giờ dứt.',
    ashWidth: 'Đường rãnh 2.5mm • Độ sâu 3.0mm',
    patternPath: 'M 15 15 L 85 15 L 85 50 L 50 50 L 50 85 L 15 85',
  },
  'hoa-sen': {
    id: 'hoa-sen',
    name: 'Triện Liên Hoa Tịnh Độ (Lotus Purity)',
    burnMinutes: 50,
    symbolism: 'Thanh lọc khí vận, giữ tâm trí tĩnh lặng như đóa sen hé nở sớm mai.',
    ashWidth: 'Đường rãnh 2.8mm • Độ sâu 3.2mm',
    patternPath: 'M 50 15 C 20 30 20 70 50 85 C 80 70 80 30 50 15 Z',
  },
  'gia-huy': {
    id: 'gia-huy',
    name: 'Triện Gia Huy May Đo (Custom Monogram)',
    burnMinutes: 60,
    symbolism: 'Khắc họa chữ ký và biểu tượng gia tộc độc bản, tụ linh khí lưu truyền.',
    ashWidth: 'Đường rãnh 3.0mm • Độ sâu 3.5mm CNC micron',
    patternPath: 'M 20 20 L 80 20 L 50 50 L 80 80 L 20 80 Z',
  },
}

type RitualStep = 1 | 2 | 3 | 4 | 5

interface StepInfo {
  step: RitualStep
  name: string
  tool: string
  instruction: string
}

const RITUAL_STEPS: StepInfo[] = [
  {
    step: 1,
    name: 'San Phẳng Tro Trắng',
    tool: 'Xẻng nén tro đồng thau mạ vàng cát',
    instruction: 'Nén phẳng nhẹ lớp tro lót đốt từ vỏ quả trẩu trắng tinh để tạo bệ đỡ thông khí.',
  },
  {
    step: 2,
    name: 'Đặt Khuôn Đồng Thau',
    tool: 'Khuôn triện đồng thau nguyên khối CNC',
    instruction: 'Đặt cân bằng khuôn triện vào chính giữa lư hương, tránh chạm vào mép thành.',
  },
  {
    step: 3,
    name: 'Rải Bột Trầm Khánh Hòa',
    tool: 'Thìa múc trầm gò tay cán mây',
    instruction: 'Gạt đều từng thìa bột trầm hương loại 1 vào các rãnh khuôn, nén nhẹ tay vừa đủ chặt.',
  },
  {
    step: 4,
    name: 'Nhấc Khuôn Tạo Hình',
    tool: 'Núm tay cầm cách nhiệt',
    instruction: 'Nhấc thẳng đứng khuôn đồng lên dứt khoát, để lại đường trầm ấn sắc nét nguyên vẹn.',
  },
  {
    step: 5,
    name: 'Châm Lửa & Khởi Hương',
    tool: 'Thanh hương mồi không khói',
    instruction: 'Châm đốm than đỏ vào đầu mạch hương, khói trầm bắt đầu uốn lượn tỏa mùi ngọt sâu.',
  },
]

export function ArtisanBronzeIncenseSealSanctuary({ className }: { className?: string }) {
  const componentId = useId()

  const [activePattern, setActivePattern] = useState<SealPattern>('van-chu')
  const [currentStep, setCurrentStep] = useState<RitualStep>(1)
  const [isBurning, setIsBurning] = useState<boolean>(false)
  const [burnProgress, setBurnProgress] = useState<number>(0)
  const [familyInitials, setFamilyInitials] = useState<string>('GU')
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)

  const currentPatternOpt = PATTERNS[activePattern]
  const currentStepData = RITUAL_STEPS.find((s) => s.step === currentStep) ?? RITUAL_STEPS[0]!

  // Burning progress timer
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isBurning) {
      timer = setInterval(() => {
        setBurnProgress((prev) => {
          if (prev >= 100) {
            setIsBurning(false)
            return 100
          }
          return prev + 2
        })
      }, 500)
    }
    return () => clearInterval(timer)
  }, [isBurning])

  const startIgnition = () => {
    setCurrentStep(5)
    setIsBurning(true)
    setBurnProgress(0)
  }

  const resetRitual = () => {
    setIsBurning(false)
    setBurnProgress(0)
    setCurrentStep(1)
  }

  return (
    <section
      aria-labelledby={`heading-${componentId}`}
      className={cn('u-gutter py-16 md:py-24 transition-colors duration-700 bg-stone-950 text-stone-100', className)}
    >
      <div className="mx-auto max-w-[110rem] space-y-12">
        {/* Header Block */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-stone-800/80 pb-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono tracking-wider uppercase text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Xiang Dao Incense Seal • Khánh Hòa Agarwood &amp; Brass CNC
            </div>
            <h2 id={`heading-${componentId}`} className="u-display-sm text-stone-100">
              Bộ Khuôn Triện In Hương Trầm Đồng Thau &amp; Nghệ Thuật Trầm Ấn Thượng Lưu
            </h2>
            <p className="text-base text-stone-400 font-light leading-relaxed">
              Trọn bộ dụng cụ thưởng trầm hương theo chuẩn mực Trầm Ấn đạo (Xiang Dao). Khay đồng thau nguyên khối mạ vàng cát kết hợp khuôn triện CNC khắc hoa văn Chữ Vạn, Hoa Sen hoặc Gia Huy riêng biệt. Bột trầm tự nhiên rừng già Khánh Hòa cháy âm ỉ liên tục 45 - 60 phút, dẫn dắt tâm trí vào cõi tĩnh tại thuần khiết.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact?service=bronze-incense-seal"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-none bg-amber-500 text-stone-950 hover:bg-amber-400 transition-colors font-medium text-xs tracking-wider uppercase min-h-[44px]"
            >
              Đặt Chế Tác Khuôn Triện Riêng
              <ArrowUpRightIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Main Grid: Interactive Seal Stage & Step-by-Step Ritual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Incense Seal Visual Simulation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] border border-stone-800 bg-stone-900/40 p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 backdrop-blur-md bg-stone-950/60 px-4 py-2.5">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Hoa Văn Triện</span>
                    <span className="text-xs font-mono font-medium text-amber-400">{currentPatternOpt.name.split('(')[0]}</span>
                  </div>
                  <div className="h-6 w-px bg-stone-800" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-stone-400">Thời Gian Tỏa Hương</span>
                    <span className="text-xs font-mono text-emerald-400">{currentPatternOpt.burnMinutes} Phút</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'inline-block w-2.5 h-2.5 rounded-full',
                      isBurning ? 'bg-rose-500 animate-ping' : 'bg-stone-600'
                    )}
                  />
                  <span className="text-[11px] font-mono text-amber-300">
                    {isBurning ? `Đang Tỏa Khói (${burnProgress}%)` : `Bước ${currentStep}/5: ${currentStepData.name}`}
                  </span>
                </div>
              </div>

              {/* Center Incense Burner Plate Simulation */}
              <div className="relative my-auto flex flex-col items-center justify-center py-4">
                {/* Brass Burner Censer Plate */}
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-full border-4 border-amber-600/60 bg-gradient-to-tr from-stone-900 via-stone-800 to-amber-950 shadow-2xl flex items-center justify-center p-4">
                  {/* White Ash Bed */}
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-stone-200 border border-stone-300 shadow-inner flex items-center justify-center relative overflow-hidden">
                    {/* Pattern Grooves or Powder Path */}
                    {currentStep >= 3 && (
                      <svg viewBox="0 0 100 100" className="w-28 h-28 sm:w-36 sm:h-36">
                        {/* Background Groove */}
                        <path
                          d={currentPatternOpt.patternPath}
                          fill="none"
                          stroke="#78350f"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Burning glowing ember trace */}
                        {isBurning && (
                          <path
                            d={currentPatternOpt.patternPath}
                            fill="none"
                            stroke="#f43f5e"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray="200"
                            strokeDashoffset={200 - (burnProgress / 100) * 200}
                            className="transition-all duration-300"
                          />
                        )}
                      </svg>
                    )}

                    {/* Step 1 & 2 Preview: Flat ash or brass seal on top */}
                    {currentStep === 1 && (
                      <span className="text-[10px] font-mono text-stone-600 uppercase text-center px-4">
                        Tro trắng trẩu đã san phẳng mịn
                      </span>
                    )}

                    {currentStep === 2 && (
                      <div className="w-28 h-28 border-2 border-dashed border-amber-700 flex items-center justify-center">
                        <span className="text-[9px] font-mono text-amber-800 uppercase text-center">
                          Đã đặt khuôn đồng thau CNC
                        </span>
                      </div>
                    )}

                    {/* Smoke Whisps when burning */}
                    {isBurning && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-24 h-24 rounded-full bg-white/20 blur-md animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar inside Stage */}
              <div className="border-t border-stone-800/80 pt-3 backdrop-blur-md bg-stone-950/70 p-4 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-400">
                      Bước {currentStepData.step}: {currentStepData.name}
                    </span>
                    <h3 className="text-sm font-medium text-stone-100">{currentStepData.tool}</h3>
                    <p className="text-xs text-stone-400">{currentStepData.instruction}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {currentStep < 5 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep(((currentStep % 5) + 1) as RitualStep)}
                        className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase font-semibold transition-all min-h-[44px]"
                      >
                        Bước Tiếp Theo &rarr;
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={isBurning ? resetRitual : startIgnition}
                        className={cn(
                          'px-4 py-2.5 font-mono text-xs uppercase font-semibold transition-all min-h-[44px]',
                          isBurning
                            ? 'border border-stone-700 text-stone-300 hover:bg-stone-800'
                            : 'bg-rose-500 hover:bg-rose-400 text-white'
                        )}
                      >
                        {isBurning ? 'Dọn Tro Làm Lại' : '🔥 Châm Lửa Trầm Ấn'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Pattern Selector Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.values(PATTERNS).map((pat) => {
                const isActive = pat.id === activePattern
                return (
                  <button
                    key={pat.id}
                    type="button"
                    onClick={() => {
                      setActivePattern(pat.id)
                      resetRitual()
                    }}
                    className={cn(
                      'p-3.5 border text-left transition-all min-h-[44px]',
                      isActive
                        ? 'border-amber-400 bg-amber-500/10 text-stone-100'
                        : 'border-stone-800 bg-stone-900/40 hover:border-stone-700 text-stone-400'
                    )}
                  >
                    <div className="text-[11px] font-mono text-amber-400 uppercase">{pat.name.split('(')[0]}</div>
                    <div className="text-xs font-medium text-stone-200 truncate mt-0.5">{pat.symbolism.split(',')[0]}</div>
                    <div className="text-[10px] text-stone-500 mt-1">{pat.ashWidth}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Right Column: Custom Monogram Seal Ordering & Technical Specifications */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-stone-900/40 border border-stone-800 p-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 block">
                  1. May Đo Khắc Gia Huy Dòng Họ (Bespoke Monogram)
                </span>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  GuHomes thiết kế và phay CNC vi mô khuôn đồng theo ký tự dòng họ hoặc biểu tượng phong thủy riêng của gia chủ.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="text"
                    maxLength={4}
                    value={familyInitials}
                    onChange={(e) => setFamilyInitials(e.target.value.toUpperCase())}
                    placeholder="VD: GU, TRAN"
                    aria-label="Ký tự gia huy khắc trên khuôn triện đồng"
                    className="w-28 bg-stone-950 border border-stone-700 px-3 py-2 text-center text-sm font-mono tracking-widest text-amber-400 uppercase focus:border-amber-400 outline-none min-h-[44px]"
                  />
                  <span className="text-xs text-stone-400 font-light">
                    Kèm mã số chế tác: <span className="font-mono text-amber-400">GU-SEAL-2026-X</span>
                  </span>
                </div>
              </div>

              {/* Complete Kit Components */}
              <div className="pt-4 border-t border-stone-800 space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300 block">
                  Trọn Bộ Dụng Cụ Trầm Ấn Đạo GuHomes
                </span>
                <div className="space-y-2 text-xs text-stone-300">
                  <div className="p-3 border border-stone-800 bg-stone-950/40 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-amber-300 block">1. Lư Đồng Thau Mạ Vàng Cát</span>
                      <span className="text-[11px] text-stone-400">Đúc nguyên khối Ø12cm, nặng 1.2kg đầm tay</span>
                    </div>
                    <span className="font-mono text-xs text-amber-400">100% Brass</span>
                  </div>
                  <div className="p-3 border border-stone-800 bg-stone-950/40 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-amber-300 block">2. Bột Trầm Tự Nhiên Khánh Hòa</span>
                      <span className="text-[11px] text-stone-400">Hũ thủy tinh 50g trầm kiến tự nhiên không hóa chất</span>
                    </div>
                    <span className="font-mono text-xs text-amber-400">Hạng 1</span>
                  </div>
                  <div className="p-3 border border-stone-800 bg-stone-950/40 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-amber-300 block">3. Bộ Thìa Xẻng Nén Tro Rồng Mây</span>
                      <span className="text-[11px] text-stone-400">6 món dụng cụ đồng thau chạm khắc thủ công</span>
                    </div>
                    <span className="font-mono text-xs text-amber-400">6 Món</span>
                  </div>
                </div>
              </div>

              {/* Custom Order Submission */}
              <div className="pt-4 border-t border-stone-800">
                {isFormSubmitted ? (
                  <div className="p-4 border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 flex-shrink-0" />
                    <span>
                      Đã ghi nhận yêu cầu chế tác bộ khuôn triện trầm ấn gia huy &ldquo;{familyInitials}&rdquo;. Nghệ nhân GuHomes sẽ gửi bản vẽ thiết kế đường nét CNC trong 24 giờ.
                    </span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsFormSubmitted(true)}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs uppercase tracking-wider font-semibold transition-colors min-h-[44px]"
                  >
                    Đăng Ký Đặt Chế Tác Bộ Trầm Ấn
                  </button>
                )}
              </div>
            </div>

            {/* Quick Contact Link */}
            <div className="p-5 border border-stone-800 bg-stone-950 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xs font-mono uppercase text-amber-400 tracking-wider">
                  Trải Nghiệm Thưởng Trầm Tại Studio
                </h3>
                <p className="text-xs text-stone-400 font-light">
                  Mời bạn ghé không gian trà thất GuHomes trải nghiệm nghi thức đốt trầm ấn thư thái.
                </p>
              </div>
              <Link
                href="/contact"
                className="whitespace-nowrap px-4 py-2 border border-stone-700 text-stone-300 hover:border-amber-400 text-xs font-mono uppercase tracking-wider transition-colors min-h-[44px] flex items-center"
              >
                Đặt Lịch Trải Nghiệm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
