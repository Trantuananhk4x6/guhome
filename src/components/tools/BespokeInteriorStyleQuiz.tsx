'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QuizOption {
  label: string
  desc: string
  styleKey: 'quiet-luxury' | 'wabi-sabi' | 'indochine' | 'japandi'
}

interface QuizQuestion {
  id: number
  title: string
  subtitle: string
  options: QuizOption[]
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    title: 'Nhịp điệu sống bạn tìm kiếm khi trở về tổ ấm?',
    subtitle: 'Không gian sống phản chiếu trạng thái nội tâm và năng lượng sống của gia chủ',
    options: [
      {
        label: 'Sự riêng tư tuyệt đối, tĩnh tại và tôn nghiêm',
        desc: 'Mọi góc nhìn đều chỉn chu, ánh sáng êm dịu che chở tâm trí khỏi nhịp sống xô bồ đô thị.',
        styleKey: 'quiet-luxury',
      },
      {
        label: 'Mộc mạc, tĩnh lặng và thuận tự nhiên',
        desc: 'Nơi thời gian chậm lại, chấp nhận sự bất toàn và vẻ đẹp phong sương của vạn vật.',
        styleKey: 'wabi-sabi',
      },
      {
        label: 'Hoài niệm chiều sâu văn hóa và nghệ thuật bản địa',
        desc: 'Giao thoa giữa vẻ đẹp di sản truyền thống Việt Nam và kiến trúc cổ điển tinh tế.',
        styleKey: 'indochine',
      },
      {
        label: 'Gọn gàng, thanh thoát và tối ưu công năng',
        desc: 'Tối giản đến từng chi tiết, ưu tiên khoảng thở thông thoáng và sự tiện nghi chuẩn xác.',
        styleKey: 'japandi',
      },
    ],
  },
  {
    id: 2,
    title: 'Bảng màu nào mang lại cảm giác dễ chịu nhất cho thị giác của bạn?',
    subtitle: 'Màu sắc định hình cảm xúc và khả năng giải tỏa căng thẳng sau ngày làm việc',
    options: [
      {
        label: 'Nâu hạt dẻ trầm ấm của gỗ óc chó kết hợp be cát và ánh kim mờ',
        desc: 'Tông màu đầm ấm, sang trọng kín đáo không bao giờ lỗi mốt theo thời gian.',
        styleKey: 'quiet-luxury',
      },
      {
        label: 'Xám đất nung, trắng ngà thô mộc và nốt rêu phong tự nhiên',
        desc: 'Bảng màu nguyên bản của đất sét, đá suối và vôi vữa khoáng chất.',
        styleKey: 'wabi-sabi',
      },
      {
        label: 'Vàng kem Đông Dương, đen gỗ mun huyền bí và điểm xuyết xanh ngọc bích',
        desc: 'Bảng màu vương giả cổ kính, giàu tính tự sự và chất thơ di sản Á Đông.',
        styleKey: 'indochine',
      },
      {
        label: 'Gỗ sồi sáng tự nhiên, trắng tuyết và xám tro Bắc Âu thanh lịch',
        desc: 'Bảng màu tươi sáng, khuếch tán ánh sáng ban mai tối đa khắp căn phòng.',
        styleKey: 'japandi',
      },
    ],
  },
  {
    id: 3,
    title: 'Bề mặt vật liệu nào khiến đôi tay bạn muốn chạm vào nhất?',
    subtitle: 'Xúc giác vật liệu là chìa khóa mở ra chiều sâu cảm xúc của một công trình may đo',
    options: [
      {
        label: 'Vân gỗ óc chó Bắc Mỹ mịn màng lau dầu tự nhiên & đá Travertine mài mờ',
        desc: 'Sờ vào cảm nhận được sự ấm áp của thớ gỗ hữu cơ và độ đầm mát của đá tự nhiên.',
        styleKey: 'quiet-luxury',
      },
      {
        label: 'Tường vữa đất khoáng xoa thô ráp & mặt gỗ lũa mộc nguyên tấm',
        desc: 'Gồ ghề phong sương, lưu giữ vết tích chế tác thủ công của người nghệ nhân.',
        styleKey: 'wabi-sabi',
      },
      {
        label: 'Gỗ gõ đỏ cẩn xà cừ óng ánh, mây đan mắt cáo thủ công và gạch bông cổ',
        desc: 'Đường nét uốn lượn mềm mại, xúc giác mây tre đan dẻo dai thân thuộc.',
        styleKey: 'indochine',
      },
      {
        label: 'Chiếu rơm Tatami thơm ngát, vải đũi linen dệt sợi và lam gỗ sồi thanh mảnh',
        desc: 'Nhẹ nhàng thanh khiết, êm ái dưới bàn chân trần khi di chuyển trong nhà.',
        styleKey: 'japandi',
      },
    ],
  },
  {
    id: 4,
    title: 'Nghi thức thư giãn yêu thích nhất của bạn tại gia?',
    subtitle: 'Cách bạn kết nối với chính mình và những người thân yêu trong không gian riêng tư',
    options: [
      {
        label: 'Thưởng thức ly vang Bordeaux bên đảo bếp đá tự nhiên và nghe nhạc jazz',
        desc: 'Ánh sáng hắt dịu dàng từ trần cao, không gian êm ả như một private lounge thượng lưu.',
        styleKey: 'quiet-luxury',
      },
      {
        label: 'Pha một ấm trà sen cổ thụ, ngắm góc tiểu cảnh rêu phong tĩnh lặng',
        desc: 'Hương trà thơm thoang thoảng quyện cùng mùi gỗ mộc trong buổi chiều tà.',
        styleKey: 'wabi-sabi',
      },
      {
        label: 'Đọc cuốn sách quý bên hiên ban công rợp bóng mát hoa sứ và gió sông Sài Gòn',
        desc: 'Gió tự nhiên luồn qua hệ cửa chớp lam gỗ, xua tan cái oi ả của khí hậu nhiệt đới.',
        styleKey: 'indochine',
      },
      {
        label: 'Thiền định tĩnh tâm trên đệm cói hoặc quây quần nấu ăn tối giản cùng gia đình',
        desc: 'Không gian không có đồ thừa, chỉ có sự gắn kết chân thành giữa các thành viên.',
        styleKey: 'japandi',
      },
    ],
  },
  {
    id: 5,
    title: 'Quy mô không gian bạn mong muốn GuHomes đồng hành kiến tạo?',
    subtitle: 'Mỗi dự án tại GuHomes đều được cá nhân hóa sâu sắc theo đặc thù công trình',
    options: [
      {
        label: 'Penthouse hoặc Căn hộ Duplex cao cấp (200m² - 450m²)',
        desc: 'Yêu cầu xử lý vách kính tràn viền, vi khí hậu tầng cao và tầm nhìn toàn cảnh.',
        styleKey: 'quiet-luxury',
      },
      {
        label: 'Biệt thự đơn lập ven sông hoặc dinh thự nhà vườn nghỉ dưỡng',
        desc: 'Kết nối thiên nhiên, sân vườn tiểu cảnh mặt nước và không gian sống bền vững.',
        styleKey: 'wabi-sabi',
      },
      {
        label: 'Nhà phố đô thị nhiều tầng (The Global City, Thủ Thiêm, Thảo Điền)',
        desc: 'Giải pháp giếng trời đối lưu gió tự nhiên, hạn chế bức xạ nhiệt hướng Tây.',
        styleKey: 'indochine',
      },
      {
        label: 'Căn hộ tiêu chuẩn 2-3 phòng ngủ tại các khu đô thị sinh thái (100m² - 180m²)',
        desc: 'Tối ưu không gian lưu trữ ẩn giấu, thông minh, thoáng đãng và ngập tràn ánh sáng.',
        styleKey: 'japandi',
      },
    ],
  },
]

interface StyleResultDetail {
  title: string
  subtitle: string
  archetype: string
  tagline: string
  coreMaterials: string[]
  lightingPhilosophy: string
  microclimateSolution: string
  recommendedProjects: string[]
  guAdvice: string
}

const STYLE_RESULTS: Record<string, StyleResultDetail> = {
  'quiet-luxury': {
    title: 'Quiet Luxury - Sang Trọng Tĩnh Lặng',
    subtitle: 'Nét thanh lịch không cần phô trương, sự đắt giá toát lên từ chi tiết và tỷ lệ',
    archetype: 'Gia chủ tìm kiếm sự tinh tế tột bậc, sâu sắc và bền vững',
    tagline: 'Sang trọng thực thụ là khi bước vào căn nhà, bạn cảm thấy sự thư thái tuyệt đối chứ không phải sự áp đảo của vật chất.',
    coreMaterials: [
      'Gỗ Óc Chó Bắc Mỹ (FAS Grade) vân tuyển chọn',
      'Đá tự nhiên Travertine Navona honed nhập khẩu',
      'Kim loại đồng thau xước mờ thủ công',
      'Da bò Ý Mastrotto xử lý hữu cơ',
    ],
    lightingPhilosophy: 'Ánh sáng 3 tầng (Layered Lighting) với chip LED CRI > 95, nhiệt độ màu 2700K - 3000K ấm áp không chói gắt.',
    microclimateSolution: 'Thiết kế khe co ngót kỹ thuật 3mm cho gỗ tự nhiên thích ứng độ ẩm Sài Gòn 80% RH quanh năm.',
    recommendedProjects: [
      'Penthouse The Opera Metropole Thủ Thiêm',
      'Biệt thự compound Thảo Điền Quận 2',
      'Sky Villa Ba Son Grand Marina Saigon',
    ],
    guAdvice: 'Gu thẩm mỹ của bạn hướng về chiều sâu xúc giác và giá trị trường tồn. Bạn phù hợp nhất với triết lý may đo giới hạn 12 công trình/năm của GuHomes.',
  },
  'wabi-sabi': {
    title: 'Wabi-Sabi - Vẻ Đẹp Của Sự Tĩnh Lặng & Phong Sương',
    subtitle: 'Tôn trọng quy luật tự nhiên, vẻ đẹp thô mộc từ dấu vết thời gian',
    archetype: 'Gia chủ tìm kiếm sự an yên, kết nối sâu sắc với tự nhiên và nội tâm',
    tagline: 'Khi buông bỏ những đường nét sắc lẹm công nghiệp, căn nhà trở thành chốn neo đậu bình yên nhất của tâm hồn.',
    coreMaterials: [
      'Vữa đất khoáng tự nhiên xoa tay thủ công',
      'Gỗ tần bì hoặc sồi xẻ mộc lau dầu sáp ong',
      'Đá suối chẻ tay tự nhiên nguyên khối',
      'Gốm men tro Bát Tràng hỏa biến mộc',
    ],
    lightingPhilosophy: 'Ánh sáng gián tiếp hắt khe trần tạo cảm giác ấm áp như ánh lửa bập bùng trong hoàng hôn.',
    microclimateSolution: 'Hệ thống thông gió đối lưu tự nhiên xuyên suốt các gian phòng, cây xanh lọc bụi mịn và hạ nhiệt vi khí hậu.',
    recommendedProjects: [
      'Duplex Wabi-Sabi Eco Thảo Điền',
      'Căn hộ Mộc Tâm Khu Đô Thị Sala',
      'Zen Garden Villa Ecopark',
    ],
    guAdvice: 'Tổ ấm của bạn cần khoảng thở hơn là đồ đạc lấp đầy. Hãy để các KTS GuHomes cùng bạn chọn từng tấm gỗ mộc để kiến tạo không gian sống thuận tự nhiên.',
  },
  'indochine': {
    title: 'Indochine - Di Sản Á Đông & Cổ Điển Bản Địa',
    subtitle: 'Giao hưởng lãng mạn giữa kiến trúc Pháp và chất liệu truyền thống Việt Nam',
    archetype: 'Gia chủ yêu chiều sâu văn hóa, nét đẹp ký ức và nghệ thuật thủ công tinh xảo',
    tagline: 'Một không gian mang hơi thở của Sài Gòn xưa: trang nhã, thi vị và đầy chất tự sự.',
    coreMaterials: [
      'Gỗ Gõ Đỏ Nam Bộ bách niên đục mộng truyền thống',
      'Mây đan mắt cáo tự nhiên thủ công làng nghề',
      'Gạch bông men cổ điển ép thủy lực',
      'Chi tiết đồng đúc tiện tay vi mô',
    ],
    lightingPhilosophy: 'Đèn chùm đồng cổ điển phối cùng ánh sáng vàng dịu từ đèn lồng mây tre tạo cảm xúc thi vị.',
    microclimateSolution: 'Hệ cửa chớp louver đón gió đối lưu giải nhiệt hướng Tây, sàn gạch mát lạnh chân trong mùa nắng gắt Sài Gòn.',
    recommendedProjects: [
      'Dinh thự The Global City kiến trúc Đông Dương',
      'Nhà phố Cổ Kính Thảo Điền',
      'Căn hộ Heritage Riverside Quận 4',
    ],
    guAdvice: 'GuHomes có thế mạnh xưởng may đo Thạnh Xuân với đội ngũ thợ mộc lành nghề có thể tạo tác nên các mộng gỗ và đường soi chỉ tinh tế chuẩn phong cách Indochine.',
  },
  'japandi': {
    title: 'Japandi - Tối Giản Ấm Áp & Tinh Khiết',
    subtitle: 'Sự hòa quyện hoàn hảo giữa triết lý Zen Nhật Bản và sự ấm cúng của Bắc Âu',
    archetype: 'Gia chủ hiện đại, năng động, yêu chuộng lối sống ngăn nắp và công năng đỉnh cao',
    tagline: 'Càng ít đồ đạc thừa thãi, tâm trí càng thảnh thơi sáng suốt.',
    coreMaterials: [
      'Gỗ Sồi Trắng Bắc Mỹ (White Oak) bề mặt mờ nhung',
      'Chiếu Tatami dệt rơm khô tự nhiên chống ẩm',
      'Vải dệt thô linen hữu cơ',
      'Mặt đá nhân tạo nung kết chống trầy xước tuyệt đối',
    ],
    lightingPhilosophy: 'Ánh sáng tự nhiên tràn ngập qua rèm lụa mỏng ban ngày, ban đêm sử dụng ánh sáng vàng 3000K phân tầng.',
    microclimateSolution: 'Hệ tủ lưu trữ âm tường kịch trần với hệ thống hút ẩm thông minh, giữ đồ dùng luôn khô ráo trong mùa mưa TP.HCM.',
    recommendedProjects: [
      'Căn hộ Japandi Zen Garden Sala Thủ Thiêm',
      'Nhà phố Tối Giản Thông Gió Phú Mỹ Hưng',
      'Minimalist Retreat Villa Bình Dương',
    ],
    guAdvice: 'Mọi vật dụng trong nhà bạn sẽ có đúng một vị trí hoàn hảo. Đội ngũ KTS GuHomes sẽ thiết kế hệ thống tủ may đo module chuẩn xác tới từng milimet.',
  },
}

export function BespokeInteriorStyleQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [consultPhone, setConsultPhone] = useState<string>('')
  const [consultName, setConsultName] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  // Play subtle feedback sound via Web Audio API
  const playSound = (freq = 528, duration = 0.15) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {
      // Audio autoplay restrictions safe ignore
    }
  }

  const handleSelectOption = (styleKey: string) => {
    playSound(440, 0.12)
    const nextAnswers = [...answers, styleKey]
    setAnswers(nextAnswers)

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Compute most frequent styleKey
      const counts: Record<string, number> = {}
      for (const k of nextAnswers) {
        counts[k] = (counts[k] || 0) + 1
      }
      let bestKey = 'quiet-luxury'
      let maxCount = 0
      for (const [key, count] of Object.entries(counts)) {
        if (count > maxCount) {
          maxCount = count
          bestKey = key
        }
      }
      setSelectedStyle(bestKey)
      playSound(528, 0.4)
    }
  }

  const handleReset = () => {
    playSound(396, 0.1)
    setCurrentQuestion(0)
    setAnswers([])
    setSelectedStyle(null)
    setIsSubmitted(false)
  }

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!consultPhone.trim()) return
    playSound(639, 0.3)
    setIsSubmitted(true)
  }

  const resultData = selectedStyle ? STYLE_RESULTS[selectedStyle] : null

  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0e0e11] via-[#141418] to-[#0e0e11] text-[#e8e4dc] overflow-hidden border-t border-b border-[#2d2822]">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#c5a880] rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#8a7658] rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#241f19] border border-[#4a3f31] text-[#d4b996] text-xs uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4b996] animate-pulse" />
            GuHomes Interactive Tool
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#f4efe6] tracking-tight">
            Khám Phá Gu Thẩm Mỹ Của Bạn
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#a39c8f] max-w-2xl mx-auto font-light leading-relaxed">
            Trả lời 5 câu hỏi xúc giác để tìm ra ngôn ngữ thiết kế phản chiếu chân thực nhất bản sắc và tâm hồn bạn.
          </p>
        </div>

        {/* Quiz Body */}
        <div className="relative min-h-[440px] bg-[#1a1815]/80 backdrop-blur-md rounded-2xl border border-[#3b3429] p-6 sm:p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {!selectedStyle ? (
              // Questions flow
              (() => {
                const q = QUIZ_QUESTIONS[currentQuestion]
                if (!q) return null
                return (
                  <motion.div
                    key={`q-${q.id}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full"
                  >
                    {/* Progress indicator */}
                    <div className="flex items-center justify-between mb-6 border-b border-[#2d2822] pb-4">
                      <span className="text-xs uppercase tracking-wider text-[#9d9282]">
                        Câu hỏi {q.id} trên {QUIZ_QUESTIONS.length}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {QUIZ_QUESTIONS.map((item, idx) => (
                          <div
                            key={item.id}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === currentQuestion
                                ? 'w-6 bg-[#c5a880]'
                                : idx < currentQuestion
                                ? 'w-2 bg-[#705e46]'
                                : 'w-2 bg-[#2d2822]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Question title */}
                    <div className="mb-6">
                      <h3 className="text-lg sm:text-xl font-serif text-[#f2ede4] leading-snug">
                        {q.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#8c8273] mt-1 font-light">
                        {q.subtitle}
                      </p>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                      {q.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          type="button"
                          onClick={() => handleSelectOption(opt.styleKey)}
                          className="group text-left p-4 rounded-xl bg-[#231f1a] hover:bg-[#2e2820] border border-[#383126] hover:border-[#c5a880] transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-[#c5a880]"
                        >
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full border border-[#524636] group-hover:border-[#c5a880] text-[#c5a880] text-xs flex items-center justify-center font-serif mt-0.5">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-[#eae5dc] group-hover:text-[#f7f4ed] leading-snug">
                                {opt.label}
                              </p>
                              <p className="text-xs text-[#8c8273] group-hover:text-[#a89d8c] mt-1.5 leading-relaxed font-light">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )
              })()
            ) : (
              // Result View
              resultData && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="border-b border-[#3b3429] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#c5a880] font-medium">
                        Kết quả phân tích Gu thẩm mỹ của bạn
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif text-[#f7f4ee] mt-1">
                        {resultData.title}
                      </h3>
                      <p className="text-xs text-[#a19685] italic mt-0.5">
                        {resultData.subtitle}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="self-start sm:self-auto text-xs px-3 py-1.5 rounded-lg border border-[#4a3f31] text-[#b3a694] hover:text-[#f0ece3] hover:border-[#c5a880] transition-colors"
                    >
                      Làm lại bài trắc nghiệm
                    </button>
                  </div>

                  {/* Tagline block */}
                  <blockquote className="p-4 rounded-xl bg-[#231f1a] border-l-2 border-[#c5a880] text-sm text-[#d8d1c5] font-light leading-relaxed italic">
                    "{resultData.tagline}"
                  </blockquote>

                  {/* Specs Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-[#211d18] border border-[#332b21] space-y-2">
                      <h4 className="font-serif text-[#c5a880] text-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                        Vật liệu xúc giác cốt lõi
                      </h4>
                      <ul className="space-y-1.5 text-[#b5aa99]">
                        {resultData.coreMaterials.map((mat, mIdx) => (
                          <li key={mIdx} className="flex items-center gap-2">
                            <span className="text-[#877864]">•</span>
                            <span>{mat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-xl bg-[#211d18] border border-[#332b21] space-y-2">
                      <h4 className="font-serif text-[#c5a880] text-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                        Triết lý chiếu sáng & Vi khí hậu
                      </h4>
                      <p className="text-[#b5aa99] leading-relaxed">
                        <strong className="text-[#eae5dc]">Ánh sáng:</strong> {resultData.lightingPhilosophy}
                      </p>
                      <p className="text-[#b5aa99] leading-relaxed">
                        <strong className="text-[#eae5dc]">Khí hậu TP.HCM:</strong> {resultData.microclimateSolution}
                      </p>
                    </div>
                  </div>

                  {/* GuHomes Advice */}
                  <div className="p-4 rounded-xl bg-[#25201a] border border-[#443828]">
                    <p className="text-xs text-[#c9bfae] leading-relaxed">
                      <strong className="text-[#c5a880]">Lời khuyên từ KTS Trưởng GuHomes:</strong> {resultData.guAdvice}
                    </p>
                  </div>

                  {/* Consultation Form */}
                  <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#2a241b] to-[#1f1b15] border border-[#524432]">
                    {!isSubmitted ? (
                      <form onSubmit={handleConsultSubmit} className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                          <h4 className="text-sm font-serif text-[#f2ede4]">
                            Nhận bản phân tích chi tiết & bản phác thảo ý tưởng từ KTS Trưởng
                          </h4>
                          <span className="text-[11px] text-[#8e8271]">
                            May đo độc bản · Giới hạn 12 công trình/năm
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Họ tên của bạn..."
                            value={consultName}
                            onChange={(e) => setConsultName(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-lg bg-[#181613] border border-[#423729] text-[#e8e4dc] placeholder-[#73695b] focus:outline-none focus:border-[#c5a880]"
                          />
                          <input
                            type="tel"
                            placeholder="Số điện thoại hoặc Zalo (bắt buộc)..."
                            value={consultPhone}
                            onChange={(e) => setConsultPhone(e.target.value)}
                            required
                            className="w-full px-3 py-2 text-xs rounded-lg bg-[#181613] border border-[#423729] text-[#e8e4dc] placeholder-[#73695b] focus:outline-none focus:border-[#c5a880]"
                          />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                          <span className="text-[11px] text-[#7d7363]">
                            Hotline KTS Trưởng: <a href="tel:0368757916" className="text-[#c5a880] hover:underline">0368 757 916</a> · Xưởng may đo Thạnh Xuân 1.200m²
                          </span>
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-[#c5a880] hover:bg-[#d8be97] text-[#14120f] text-xs font-medium transition-all shadow-md active:scale-95"
                          >
                            Gửi yêu cầu tư vấn 1-1
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="text-center py-3 space-y-1">
                        <p className="text-sm font-medium text-[#c5a880]">
                          Đã gửi yêu cầu thành công!
                        </p>
                        <p className="text-xs text-[#a89d8d]">
                          Kiến trúc sư Trưởng GuHomes sẽ liên hệ trực tiếp với bạn qua số {consultPhone} trong vòng 2 giờ làm việc để chia sẻ góc nhìn chuyên sâu.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default BespokeInteriorStyleQuiz
