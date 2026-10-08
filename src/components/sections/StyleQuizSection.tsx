'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface QuizQuestion {
  id: number
  title: string
  subtitle: string
  options: {
    id: string
    label: string
    description: string
    stylePoints: {
      wabiSabi: number
      modernLuxury: number
      japandi: number
      contemporary: number
      indochine: number
    }
  }[]
}

const QUESTIONS: readonly QuizQuestion[] = [
  {
    id: 1,
    title: 'Cảm xúc nào bạn mong muốn nhất khi mở cửa bước về nhà?',
    subtitle: 'Hãy lắng nghe cảm giác đầu tiên của bạn sau một ngày dài làm việc ngoài phố thị.',
    options: [
      {
        id: 'q1-a',
        label: 'Sự tĩnh lặng nguyên sơ, trút bỏ mọi âu lo',
        description: 'Vách tường vữa vôi loang mờ, mùi gỗ ấm và ánh sáng gián tiếp êm dịu vỗ về tâm trí.',
        stylePoints: { wabiSabi: 3, japandi: 1, modernLuxury: 0, contemporary: 0, indochine: 1 },
      },
      {
        id: 'q1-b',
        label: 'Sang trọng chuẩn mực, chỉn chu từng đường nét',
        description: 'Mặt đá tự nhiên bóng mờ, kim loại mạ satin sắc sảo và sự ngăn nắp tuyệt đối.',
        stylePoints: { wabiSabi: 0, japandi: 0, modernLuxury: 3, contemporary: 1, indochine: 0 },
      },
      {
        id: 'q1-c',
        label: 'Ấm áp, mộc mạc và ngập tràn ánh nắng',
        description: 'Chất liệu gỗ sáng màu, nệm vải lanh mềm mại và sự thông thoáng gắn kết gia đình.',
        stylePoints: { wabiSabi: 1, japandi: 3, modernLuxury: 0, contemporary: 0, indochine: 0 },
      },
      {
        id: 'q1-d',
        label: 'Tự do, phóng khoáng và mang đậm dấu ấn nghệ thuật',
        description: 'Không gian mở liên hoàn, đối thoại cùng cảnh quan sông nước và tác phẩm nghệ thuật.',
        stylePoints: { wabiSabi: 0, japandi: 0, modernLuxury: 1, contemporary: 3, indochine: 0 },
      },
      {
        id: 'q1-e',
        label: 'Hoài niệm sâu lắng, thanh lịch di sản Á Đông',
        description: 'Vòm cửa cong mềm mại, gạch bông thủ công mát lạnh và hương gỗ cổ kính xoa dịu tâm hồn.',
        stylePoints: { wabiSabi: 1, japandi: 0, modernLuxury: 0, contemporary: 0, indochine: 3 },
      },
    ],
  },
  {
    id: 2,
    title: 'Nếp sống và thói quen sinh hoạt trọng tâm của gia đình bạn?',
    subtitle: 'Không gian sống được tạo tác để phục vụ con người, không phải để trưng bày.',
    options: [
      {
        id: 'q2-a',
        label: 'Thưởng trà, thiền định và tận hưởng khoảng lặng riêng tư',
        description: 'Cần một góc ban công lộng gió hoặc bục trà thất thiền định bên khung cửa sổ mát mẻ.',
        stylePoints: { wabiSabi: 3, japandi: 2, modernLuxury: 0, contemporary: 0, indochine: 2 },
      },
      {
        id: 'q2-b',
        label: 'Đón tiếp bạn bè quý, tiệc tối ẩm thực và thưởng rượu',
        description: 'Đảo bếp đá cẩm thạch rộng lớn, tủ rượu âm kính và hệ thống âm thanh đa vùng chuẩn mực.',
        stylePoints: { wabiSabi: 0, japandi: 0, modernLuxury: 3, contemporary: 2, indochine: 0 },
      },
      {
        id: 'q2-c',
        label: 'Quây quần sinh hoạt chung bên con nhỏ và người thân',
        description: 'Bàn ăn gỗ lớn trung tâm, sàn nhà phẳng an toàn, góc chơi sáng tạo cho trẻ nhỏ.',
        stylePoints: { wabiSabi: 1, japandi: 3, modernLuxury: 0, contemporary: 0, indochine: 1 },
      },
      {
        id: 'q2-d',
        label: 'Làm việc sáng tạo kết hợp thư giãn linh hoạt',
        description: 'Bàn làm việc nhìn ra thành phố, ánh sáng công năng chuẩn và kết nối thiên nhiên.',
        stylePoints: { wabiSabi: 0, japandi: 1, modernLuxury: 1, contemporary: 3, indochine: 0 },
      },
    ],
  },
  {
    id: 3,
    title: 'Diện tích và loại hình tổ ấm bạn dự kiến hoàn thiện?',
    subtitle: 'Giúp KTS tính toán tỷ lệ công năng và khối lượng vật liệu phù hợp nhất.',
    options: [
      {
        id: 'q3-a',
        label: 'Căn hộ tiêu chuẩn (Dưới 80m²)',
        description: 'Tối ưu hóa từng centimet với hệ tủ may đo giấu kín công năng thông minh.',
        stylePoints: { wabiSabi: 1, japandi: 3, modernLuxury: 1, contemporary: 1, indochine: 1 },
      },
      {
        id: 'q3-b',
        label: 'Căn hộ 2-3 phòng ngủ hoặc Nhà phố (80m² - 160m²)',
        description: 'Cân bằng giữa không gian sinh hoạt chung rộng mở và phòng ngủ riêng tư sâu lắng.',
        stylePoints: { wabiSabi: 2, japandi: 2, modernLuxury: 2, contemporary: 2, indochine: 2 },
      },
      {
        id: 'q3-c',
        label: 'Duplex, Penthouse hoặc Biệt thự (Trên 160m²)',
        description: 'Khoảng thông tầng tráng lệ, vật liệu nguyên khối và sân vườn nhiệt đới riêng biệt.',
        stylePoints: { wabiSabi: 3, japandi: 0, modernLuxury: 3, contemporary: 3, indochine: 3 },
      },
    ],
  },
  {
    id: 4,
    title: 'Thách thức vi khí hậu nhiệt đới nào bạn ưu tiên giải quyết nhất?',
    subtitle: 'Đặc thù khí hậu Sài Gòn nắng gắt mưa nhiều đòi hỏi giải pháp thụ động từ kiến trúc.',
    options: [
      {
        id: 'q4-a',
        label: 'Khắc chế nắng gắt hướng Tây nung nóng vách kính và sàn',
        description: 'Cần hệ lam gỗ tự nhiên xoay góc cản 80% bức xạ nhiệt và giảm tải điện năng điều hòa.',
        stylePoints: { wabiSabi: 2, japandi: 1, modernLuxury: 3, contemporary: 2, indochine: 1 },
      },
      {
        id: 'q4-b',
        label: 'Cân bằng độ ẩm mùa mưa 78-85% RH, ngăn chặn ẩm mốc',
        description: 'Ứng dụng vữa vôi khoáng tự nhiên, gỗ sấy chân không và lớp phủ sáp ong thở hai chiều.',
        stylePoints: { wabiSabi: 3, japandi: 2, modernLuxury: 1, contemporary: 1, indochine: 3 },
      },
      {
        id: 'q4-c',
        label: 'Đón trọn gió mát đối lưu sông Sài Gòn và hành lang xanh',
        description: 'Thiết kế trục thông gió xuyên phòng, cửa chớp nan gỗ truyền thống và hồ cảnh điều hòa.',
        stylePoints: { wabiSabi: 2, japandi: 3, modernLuxury: 1, contemporary: 2, indochine: 3 },
      },
      {
        id: 'q4-d',
        label: 'Cách ly tiếng ồn giao thông đô thị và bụi mịn PM2.5',
        description: 'Kính Low-E đa lớp, hệ rãnh tiêu âm âm học thính phòng và thác nước ion âm làm mát không khí.',
        stylePoints: { wabiSabi: 1, japandi: 1, modernLuxury: 3, contemporary: 3, indochine: 1 },
      },
    ],
  },
]

interface StyleResult {
  code: string
  title: string
  subtitle: string
  philosophy: string
  materials: string[]
  quoteStyleKey: string
  palette: string[]
  climateHighlight: string
}

const STYLE_RESULTS: Record<string, StyleResult> = {
  wabiSabi: {
    code: 'wabi-sabi',
    title: 'Wabi-Sabi Tĩnh Lặng & Vi Khí Hậu',
    subtitle: 'Vẻ đẹp của sự nguyên sơ, bất toàn và trường tồn cùng năm tháng',
    philosophy:
      'Tổ ấm của bạn là một ốc đảo biệt lập giữa Sài Gòn náo nhiệt. Không gian tôn vinh chất liệu tự nhiên để mộc: tường vữa vôi loang nhẹ, đá travertine xẻ thô và gỗ óc chó lau dầu thoang thoảng mùi thơm nguyên bản.',
    materials: ['Sơn vôi khoáng Ý Calce', 'Đá Travertine xẻ sọc', 'Gỗ óc chó lau dầu Osmo', 'Gốm mộc Bát Tràng'],
    quoteStyleKey: 'wabi-sabi',
    palette: ['#EAE5DA', '#A07753', '#78736A', '#3E2D21'],
    climateHighlight: 'Vữa vôi và đá xẻ thở hai chiều giúp hút ẩm dư thừa mùa mưa và hạ nhiệt 4.5°C tự nhiên.',
  },
  modernLuxury: {
    code: 'modern-luxury',
    title: 'Modern Quiet Luxury Chuẩn Mực',
    subtitle: 'Sự xa xỉ tinh tế đến từ tỷ lệ vàng và vật liệu chế tác đỉnh cao',
    philosophy:
      'Bạn yêu thích sự sắc nét, chỉn chu và đẳng cấp không phô trương. Không gian kết hợp giữa đá cẩm thạch tự nhiên, da bò thuộc Aniline Ý, kim loại đánh mờ và hệ cơ điện thông minh giấu kín tuyệt đối.',
    materials: ['Đá Marble Calacatta', 'Đồng thau xước satin', 'Gỗ sồi đen mờ', 'Kính tôi cường lực siêu trong'],
    quoteStyleKey: 'modern-luxury',
    palette: ['#1C1B18', '#A07753', '#DCD5C7', '#C7A57C'],
    climateHighlight: 'Khung nhôm Anode champagne kết hợp kính hộp Low-E 3 lớp triệt tiêu bức xạ nhiệt hướng Tây.',
  },
  japandi: {
    code: 'japandi',
    title: 'Japandi Ấm Cúng & Gắn Kết',
    subtitle: 'Giao thoa giữa nét tối giản Bắc Âu và chiều sâu mộc mạc Nhật Bản',
    philosophy:
      'Ngôi nhà ngập tràn ánh nắng và gió tự nhiên, là chốn trở về ấm cúng cho mọi thế hệ trong gia đình. Nội thất đường nét thanh thoát, vật liệu gỗ sáng màu kết hợp vải lanh Bỉ và nan gỗ thông thoáng.',
    materials: ['Gỗ sồi trắng tự nhiên', 'Vải lanh Bỉ dệt thô', 'Nan gỗ thông đối lưu', 'Vữa vôi mờ mịn'],
    quoteStyleKey: 'japandi',
    palette: ['#F4F1EA', '#C7A57C', '#B2ABA0', '#5A4231'],
    climateHighlight: 'Nan chớp gỗ thông kéo gió đối lưu tự nhiên liên tục, giữ phòng khô ráo không ẩm bí.',
  },
  contemporary: {
    code: 'contemporary',
    title: 'Contemporary Organic Đương Đại',
    subtitle: 'Phóng khoáng, tự do và đối thoại cùng nhịp thở nghệ thuật đô thị',
    philosophy:
      'Không gian mở không ranh giới, tôn vinh tầm nhìn panorama ra thành phố và dòng sông Sài Gòn. Từng góc nhà là một sân khấu ánh sáng với các hình khối uốn lượn hữu cơ và tác phẩm nghệ thuật độc bản.',
    materials: ['Bê tông vi sinh Microcement', 'Kính gợn sóng Fluted Moru', 'Gỗ óc chó nguyên khối', 'Thép đen đúc mỏng'],
    quoteStyleKey: 'modern-luxury',
    palette: ['#131210', '#8A8277', '#A07753', '#ECE8DF'],
    climateHighlight: 'Mặt bằng mở liên thông tối ưu luồng gió sông Sài Gòn, kết hợp kính tán xạ giảm chói.',
  },
  indochine: {
    code: 'indochine',
    title: 'Indochine Tropical Heritage Di Sản',
    subtitle: 'Bản hòa ca giữa nét thanh lịch Pháp cổ và chiều sâu văn hóa bản địa Nam Bộ',
    philosophy:
      'Không gian đậm chất thơ với những đường cong vòm duyên dáng, sàn gạch bông xi măng mát rượi dưới chân, chất gỗ Gõ Đỏ Lào bóng mờ và quạt trần cánh gỗ lá sen ve vuốt từng làn gió mát.',
    materials: ['Gỗ Gõ Đỏ Lào tiện thủ công', 'Gạch bông xi măng cổ điển', 'Mây đan mắt cáo tự nhiên', 'Gốm men xanh lý Cây Mai'],
    quoteStyleKey: 'indochine',
    palette: ['#2F3E34', '#C9A063', '#E8DFD0', '#5C3826'],
    climateHighlight: 'Hệ cửa chớp gỗ kết hợp gạch hoa gió đón luồng khí mát tầng thấp và đẩy khí nóng lên cao.',
  },
}

export interface StyleQuizSectionProps {
  className?: string
}

export function StyleQuizSection({ className }: StyleQuizSectionProps = {}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<StyleResult | null>(null)
  const { openQuoteModal } = useQuickQuote()

  const handleSelectOption = (questionId: number, optionId: string) => {
    const nextAnswers = { ...answers, [questionId]: optionId }
    setAnswers(nextAnswers)

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Tính điểm tìm phong cách chiến thắng
      const scores = { wabiSabi: 0, modernLuxury: 0, japandi: 0, contemporary: 0, indochine: 0 }
      for (const q of QUESTIONS) {
        const selectedId = nextAnswers[q.id]
        const opt = q.options.find((o) => o.id === selectedId)
        if (opt) {
          scores.wabiSabi += opt.stylePoints.wabiSabi
          scores.modernLuxury += opt.stylePoints.modernLuxury
          scores.japandi += opt.stylePoints.japandi
          scores.contemporary += opt.stylePoints.contemporary
          scores.indochine += opt.stylePoints.indochine
        }
      }

      let maxKey: keyof typeof scores = 'wabiSabi'
      let maxVal = -1
      for (const [key, val] of Object.entries(scores) as [keyof typeof scores, number][]) {
        if (val > maxVal) {
          maxVal = val
          maxKey = key
        }
      }

      const matched: StyleResult = STYLE_RESULTS[maxKey] ?? STYLE_RESULTS['wabiSabi']!
      setResult(matched)
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentStep(0)
    setResult(null)
  }

  const activeQuestion: QuizQuestion = QUESTIONS[currentStep] ?? QUESTIONS[0]!

  return (
    <section
      id="la-ban-tim-gu"
      data-home-section="STYLE_QUIZ"
      className={cn(
        'u-gutter relative isolate bg-canvas py-[clamp(4.5rem,10vh,8rem)] text-ink overflow-hidden border-t border-line/60',
        className
      )}
    >
      <div className="mx-auto w-full max-w-[100rem] relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Label rule tone="accent">
            Trắc Nghiệm Bản Sắc Thẩm Mỹ & Vi Khí Hậu
          </Label>
          <h2 className="mt-4 font-display text-[clamp(2rem,3.8vw,3.25rem)] font-normal leading-[1.25]">
            La Bàn Tìm Đúng "Gu" Của Bạn.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">
            Chỉ với 4 câu hỏi trực giác, hãy để KTS GuHomes giúp bạn định hình phong cách kiến trúc hòa hợp nhất với nếp sống và điều kiện nhiệt đới Sài Gòn.
          </p>
        </div>

        {/* Quiz Body Container */}
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-line bg-surface/80 p-6 sm:p-10 shadow-lg backdrop-blur-md"
              >
                {/* Progress Indicators */}
                <div className="flex items-center justify-between border-b border-line/60 pb-5 mb-8">
                  <div className="text-xs font-mono uppercase tracking-wider text-accent">
                    Câu hỏi 0{currentStep + 1} / 0{QUESTIONS.length}
                  </div>
                  <div className="flex items-center gap-2">
                    {QUESTIONS.map((q, idx) => (
                      <span
                        key={q.id}
                        className={cn(
                          'h-2 rounded-full transition-all duration-300',
                          idx === currentStep
                            ? 'w-8 bg-accent'
                            : idx < currentStep
                            ? 'w-3 bg-accent/50'
                            : 'w-3 bg-line',
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Title */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-normal leading-snug">
                    {activeQuestion.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted mt-2">
                    {activeQuestion.subtitle}
                  </p>
                </div>

                {/* Options List */}
                <div className="mt-8 flex flex-col gap-3.5">
                  {activeQuestion.options.map((opt) => {
                    const isChosen = answers[activeQuestion.id] === opt.id
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(activeQuestion.id, opt.id)}
                        className={cn(
                          'group flex flex-col items-start rounded-xl border p-4 sm:p-5 text-left transition-all duration-300 min-h-[56px] hover:border-accent hover:bg-canvas hover:shadow-md cursor-pointer',
                          isChosen
                            ? 'border-accent bg-canvas shadow-md'
                            : 'border-line/80 bg-canvas/60',
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="font-body text-sm sm:text-base font-medium text-ink group-hover:text-accent transition-colors">
                            {opt.label}
                          </span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-line text-xs text-muted group-hover:border-accent group-hover:text-accent transition-colors flex-shrink-0">
                            →
                          </span>
                        </div>
                        <p className="mt-1.5 text-xs text-muted leading-relaxed">
                          {opt.description}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              /* Quiz Result Card */
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl border border-accent/40 bg-espresso text-canvas p-7 sm:p-12 shadow-2xl overflow-hidden relative"
              >
                {/* Subtle Glow Accent */}
                <div aria-hidden="true" className="absolute top-0 right-0 h-48 w-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

                {/* Result Tag */}
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-accent-soft mb-6">
                  ✦ Phong cách tương thích cao nhất
                </div>

                <h3 className="font-display text-2xl sm:text-4xl font-normal text-canvas">
                  {result.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-accent-soft italic font-display">
                  "{result.subtitle}"
                </p>

                <p className="mt-6 text-sm sm:text-base text-canvas/80 leading-relaxed border-t border-canvas/15 pt-6">
                  {result.philosophy}
                </p>

                {/* Microclimate Highlight Card */}
                <div className="mt-6 p-4 rounded-xl border border-accent/30 bg-canvas/10 text-xs sm:text-sm text-canvas/90 flex items-start gap-3">
                  <CheckIcon className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-accent block mb-0.5">Điểm nhấn vi khí hậu tối ưu:</span>
                    <span>{result.climateHighlight}</span>
                  </div>
                </div>

                {/* Proposed Material Palette */}
                <div className="mt-6 border-t border-canvas/15 pt-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-canvas/60 mb-3">
                    Bảng vật liệu kiến trúc đề xuất (Gia công tại Xưởng Thạnh Xuân 1.200m²):
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {result.materials.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-2 rounded-full border border-canvas/20 bg-canvas/10 px-3.5 py-1.5 text-xs font-medium text-canvas/90"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Color Scheme Palette Preview */}
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-xs font-mono text-canvas/50">Dải màu chủ đạo:</span>
                  <div className="flex items-center gap-2">
                    {result.palette.map((color, idx) => (
                      <span
                        key={idx}
                        className="h-6 w-9 rounded-md border border-canvas/30 shadow-sm"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-canvas/15 pt-8">
                  <button
                    type="button"
                    onClick={() => openQuoteModal(result.quoteStyleKey)}
                    className="flex-1 inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-soft text-espresso font-medium text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_25px_rgba(197,168,128,0.35)] min-h-[48px] cursor-pointer"
                  >
                    <span>Nhận Bản Dự Toán & Mặt Bằng 3D Cho Phong Cách Này</span>
                    <ArrowUpRightIcon className="text-base" />
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-canvas/20 bg-canvas/5 text-canvas/75 hover:text-canvas hover:bg-canvas/10 text-xs font-mono transition-colors min-h-[48px] cursor-pointer"
                  >
                    ↺ Làm lại trắc nghiệm
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
