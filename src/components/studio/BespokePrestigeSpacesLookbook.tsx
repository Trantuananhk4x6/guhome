'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SpaceLookbook {
  id: string
  title: string
  shortTitle: string
  subtitle: string
  location: string
  area: string
  year: string
  climateSolution: string
  materialPalette: string[]
  lightingSpecs: string
  heroDescription: string
  daylightImage: string
  nightImage: string
  features: { label: string; value: string }[]
}

const LOOKBOOK_SPACES: SpaceLookbook[] = [
  {
    id: 'metropole-penthouse',
    title: 'Penthouse The Opera Metropole Thủ Thiêm',
    shortTitle: 'Metropole Thủ Thiêm',
    subtitle: 'Đối thoại giữa dòng sông Sài Gòn và ánh sáng tĩnh lặng tầng cao',
    location: 'Bán đảo Thủ Thiêm, TP. Thủ Đức',
    area: '320m² thông tầng 6.2m',
    year: '2025 - 2026',
    climateSolution: 'Vách kính Low-E tràn viền kết hợp hệ lam gỗ óc chó xoay điều hướng nắng chiều, duy trì nhiệt độ nội thất mát hơn 4.8°C so với ngoài trời.',
    materialPalette: [
      'Đá Travertine Navona honed nhập khẩu Ý cao 6.2m',
      'Gỗ Óc Chó Bắc Mỹ FAS tuyển vân cuộn sóng sấy ẩm 10-12%',
      'Đồng thau xước xát thủ công tự tối màu tự nhiên',
      'Vải dệt boucle cao cấp & da Mastrotto Ý',
    ],
    lightingSpecs: 'Hệ chiếu sáng 3 tầng âm trần CRI > 95, dải nhiệt độ màu 2700K - 3000K, dimmer tự động theo nhịp sinh học hoàng hôn Sài Gòn.',
    heroDescription: 'Tại tầng cao The Opera Metropole, thử thách lớn nhất là sự tiết chế. KTS GuHomes kiến tạo một không gian mở khoáng đạt, nơi mọi góc nhìn đều tôn vinh khúc quanh dòng sông, nhưng bên trong vẫn giữ vẹn nguyên sự ấm cúng, che chở và tĩnh tại tuyệt đối cho gia chủ.',
    daylightImage: '/media/ben-kia-song/12-1600.webp',
    nightImage: '/media/anh-kim-van-da/0-800.webp',
    features: [
      { label: 'Cao độ thông tầng', value: '6.20 mét' },
      { label: 'Hệ vách kính', value: 'Low-E 3 lớp cản nhiệt 78%' },
      { label: 'Sàn gỗ', value: 'Óc Chó FAS xương cá tỷ lệ vàng' },
      { label: 'Xưởng gia công', value: 'May đo Thạnh Xuân 1.200m²' },
    ],
  },
  {
    id: 'global-city-estate',
    title: 'Dinh Thự Vườn The Global City',
    shortTitle: 'The Global City',
    subtitle: 'Kiến trúc vi khí hậu đa tầng với giếng trời đối lưu nhiệt tự nhiên',
    location: 'An Phú, TP. Thủ Đức',
    area: '520m² (5 tầng)',
    year: '2025',
    climateSolution: 'Hiệu ứng ống khói nhiệt (chimney effect) từ giếng trời trung tâm giúp hút khí nóng thoát lên mái và kéo luồng gió mát đối lưu qua từng phòng ngủ.',
    materialPalette: [
      'Gỗ Teak Tây Bắc bách niên ngâm tẩm chống mối mọt nhiệt đới',
      'Đá cẩm thạch Calacatta Borghini vân mây tự nhiên',
      'Thép tấm cắt CNC phủ sơn tĩnh điện vi hạt xước',
      'Gạch gốm thông gió nung nhiệt cao bản địa',
    ],
    lightingSpecs: 'Ánh sáng tự nhiên xuyên thấu qua hệ lam giếng trời ban ngày; ban đêm chuyển sang kịch bản ánh sáng ấm cúng tập trung vào các đảo công năng.',
    heroDescription: 'Dinh thự vườn tại The Global City là bài toán thích ứng hướng Tây nắng gắt. Thay vì bọc kín bê tông, GuHomes tạo ra lớp vỏ kép (double-skin facade) với hàng hiên cây xanh và lam gỗ, biến ánh nắng gay gắt thành những vệt sáng nhảy múa thi vị trên sàn nhà.',
    daylightImage: '/media/nha-pho-hien-dai-nha-pho-4-oc-cho-phong-khach/0-1600.webp',
    nightImage: '/media/kham-go-soi/15-1600.webp',
    features: [
      { label: 'Quy mô công trình', value: '1 trệt, 4 lầu & sân thượng' },
      { label: 'Độ giảm nhiệt', value: '-5.5°C vào giờ cao điểm nắng' },
      { label: 'Hệ mộc nội thất', value: 'Gỗ Teak & Sồi tự nhiên' },
      { label: 'Độ hoàn thiện', value: '100% may đo độc bản' },
    ],
  },
  {
    id: 'ecopark-island-villa',
    title: 'Biệt Thự Đảo Grand Island Ecopark',
    shortTitle: 'Đảo Grand Island',
    subtitle: 'Không gian tĩnh dưỡng Zen Retreat bốn bề mặt nước và cây xanh',
    location: 'Quần đảo Grand Island, Ecopark',
    area: '680m² ven hồ',
    year: '2026',
    climateSolution: 'Hệ thống hồ nước tuần hoàn ôm trọn chu vi kết hợp hiên rộng 3.5m chắn mưa tạt nhiệt đới, mở rộng tầm nhìn 360 độ ra mặt hồ tĩnh lặng.',
    materialPalette: [
      'Gỗ Gõ Đỏ Nam Bộ và Mun Sừng nguyên khối 200 năm tuổi',
      'Đá phiến xám suối chẻ tay chống rêu mốc ẩm ướt',
      'Vách trượt Shoji khung gỗ tự nhiên bọc lụa tơ tằm',
      'Chiếu Tatami dệt rơm khô xuất khẩu Nhật Bản',
    ],
    lightingSpecs: 'Ánh sáng hắt chân tường và đèn lồng thủ công tạo cảm giác thư giãn tuyệt đối cho nghi thức thiền định và thưởng trà đạo.',
    heroDescription: 'Một kiệt tác nghỉ dưỡng mặt nước riêng tư, nơi gia chủ có thể cởi bỏ đôi giày sau hành trình dài để chạm đôi bàn chân trần vào từng phiến gỗ Gõ Đỏ ấm áp, lắng nghe tiếng cá quẫy đuôi dưới chân cầu gỗ và tận hưởng sự tĩnh lặng tuyệt đối.',
    daylightImage: '/media/song-cat/7-1200.webp',
    nightImage: '/media/may-trang-tang-cao/4-1200.webp',
    features: [
      { label: 'Mặt nước bao quanh', value: 'Chu vi 120 mét mặt hồ' },
      { label: 'Phòng trà đạo', value: 'Thiết kế ngắm sen nổi' },
      { label: 'Gỗ tự nhiên', value: 'Gõ Đỏ & Mun Sừng nguyên tấm' },
      { label: 'Giới hạn thi công', value: 'Nằm trong 12 dự án/năm' },
    ],
  },
  {
    id: 'bason-sky-villa',
    title: 'Sky Villa Grand Marina Saigon Ba Son',
    shortTitle: 'Grand Marina Ba Son',
    subtitle: 'Giao thoa giữa dòng sông lịch sử và chuẩn mực sống Branded Residence bên sông Sài Gòn',
    location: 'Số 2 Tôn Đức Thắng, Bến Nghé, Quận 1',
    area: '420m² ban công kính uốn cong 180°',
    year: '2026',
    climateSolution: 'Hệ lam kính Low-E 3 lớp xoay thông minh cản bức xạ nắng hướng Đông Nam, tối ưu gió mát ven sông Sài Gòn đối lưu tự nhiên không cần điều hòa 24/7.',
    materialPalette: [
      'Đá Marble Palissandro mài mờ nhập khẩu Ý',
      'Gỗ Óc Chó Bắc Mỹ tuyển sấy vi sóng ẩm độ 8-10%',
      'Đồng thau xước xát thủ công viền cạnh mạ PVD vàng champagne',
      'Kính đúc gợn sóng thủ công tạo hiệu ứng khúc xạ nước sông',
    ],
    lightingSpecs: 'Kịch bản chiếu sáng gián tiếp hắt khe trần vô hình, dải nhiệt độ 2700K - 3500K điều chỉnh theo chu kỳ bình minh và hoàng hôn cảng Ba Son.',
    heroDescription: 'Tọa lạc trên mảnh đất di sản Ba Son ven sông Sài Gòn, Sky Villa Grand Marina là đỉnh cao của phong cách Quiet Luxury. GuHomes chắt lọc từng đường cong kim hoàn, đưa ánh sáng dòng sông vào sâu trong lòng không gian sống, tạo nên một tư gia tĩnh lặng giữa trái tim đô thị phồn hoa.',
    daylightImage: '/media/chung-cu-1-2-ngu/0-1600.webp',
    nightImage: '/media/nha-pho-hien-dai-nha-pho-1-mat-tien/0-1200.webp',
    features: [
      { label: 'Tầm nhìn ven sông', value: 'Trọn vẹn 180 độ khúc quanh Ba Son' },
      { label: 'Cao độ trần thông thoáng', value: '3.65 mét tiêu chuẩn Branded' },
      { label: 'Hệ mộc nội thất', value: 'Óc Chó & Palissandro may đo' },
      { label: 'Cam kết chất lượng', value: 'May đo Thạnh Xuân 1.200m²' },
    ],
  },
  {
    id: 'chateau-phumyhung-manor',
    title: 'Dinh Thự Lâu Đài Chateau Phú Mỹ Hưng',
    shortTitle: 'Château Phú Mỹ Hưng',
    subtitle: 'Nét kiêu hãnh bán cổ điển bên dòng rạch Thầy Tiêu thanh bình Nam Sài Gòn',
    location: 'Khu A Phú Mỹ Hưng, Phường Tân Phú, Quận 7',
    area: '750m² sân vườn cảnh quan 4 mặt',
    year: '2026',
    climateSolution: 'Hệ thống hiên che hành lang nhiệt đới kết hợp vườn cây bóng mát cản bức xạ nắng Tây, sàn gỗ 5 tầng thoáng khí chống nồm ẩm Nam Bộ.',
    materialPalette: [
      'Gỗ Gõ Đỏ Pachyloba tuyển chọn vân tuyển từ xưởng Thạnh Xuân',
      'Đá Granite tự nhiên mài chải mặt nước bể cảnh quan',
      'Chi tiết chỉ phào thạch cao khoáng thủ công dát vàng điểm xuyết',
      'Vải dệt lanh thô nhập khẩu Bỉ rèm 3 lớp cách nhiệt',
    ],
    lightingSpecs: 'Hệ thống đèn chùm pha lê chế tác độc bản kết hợp dải hắt sáng 2700K tạo chiều sâu ấm áp cho các vòm trần cao 4.2 mét.',
    heroDescription: 'Ẩn mình bên nhánh rạch Thầy Tiêu xanh mát của đô thị Phú Mỹ Hưng, Dinh Thự Chateau là bản tuyên ngôn của sự thịnh vượng và tĩnh lặng. GuHomes kết hợp tinh hoa kiến trúc Pháp cổ điển với giải pháp vi khí hậu nhiệt đới Sài Gòn, mang lại trải nghiệm sống vương giả mà ấm cúng cho nhiều thế hệ.',
    daylightImage: '/media/luxury-nha-pho-nha-pho-1/0-1600.webp',
    nightImage: '/media/luxury-nha-pho-nha-pho-2/0-1600.webp',
    features: [
      { label: 'Không gian mở', value: '4 mặt sân vườn cảnh quan xanh mát' },
      { label: 'Cao độ thông tầng', value: '4.2 mét tiêu chuẩn lâu đài' },
      { label: 'Hệ mộc nội thất', value: 'Gõ Đỏ & Travertine chế tác riêng' },
      { label: 'Tiêu chuẩn bảo hành', value: 'Bảo trì trọn đời xưởng Thạnh Xuân' },
    ],
  },
]

export function BespokePrestigeSpacesLookbook() {
  const [activeSpaceId, setActiveSpaceId] = useState<string>('metropole-penthouse')
  const [isNightMode, setIsNightMode] = useState<boolean>(false)
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false)

  const activeSpace = LOOKBOOK_SPACES.find((s) => s.id === activeSpaceId) || LOOKBOOK_SPACES[0]!

  const playFrequency = (freq = 528) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      gain.gain.setValueAtTime(0.06, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.3)
      osc.onended = () => { ctx.close().catch(() => {}) }
    } catch {
      // Audio safe fallback
    }
  }

  const handleSelectSpace = (id: string) => {
    playFrequency(528)
    setActiveSpaceId(id)
  }

  const toggleLightingMode = () => {
    playFrequency(isNightMode ? 440 : 660)
    setIsNightMode(!isNightMode)
  }

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0c0b0a] text-[#ede8df] overflow-hidden border-t border-[#29241d]">
      <div className="relative max-w-7xl mx-auto">
        {/* Eyebrow and Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#29241d] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1a14] border border-[#3d3324] text-[#c5a880] text-xs uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
              GuHomes Architectural Lookbook
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f7f3eb] tracking-tight">
              Tuyển Tập Không Gian Danh Giá
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#9c9180] max-w-2xl font-light">
              Mỗi công trình là một cuộc đối thoại độc bản giữa thổ nhưỡng vi khí hậu, ánh sáng và bản sắc sống của gia chủ thượng lưu.
            </p>
          </div>

          {/* Space switcher tabs */}
          <div className="flex flex-wrap gap-2">
            {LOOKBOOK_SPACES.map((space) => (
              <button
                key={space.id}
                type="button"
                onClick={() => handleSelectSpace(space.id)}
                className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border ${
                  activeSpaceId === space.id
                    ? 'bg-[#c5a880] text-[#14120f] border-[#c5a880] shadow-lg'
                    : 'bg-[#181511] text-[#a39785] border-[#30281e] hover:border-[#524433] hover:text-[#e0d8cc]'
                }`}
              >
                {space.shortTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Active Space Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpace.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Visual presentation column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#3b3225] bg-[#1a1713] shadow-2xl group">
                <img
                  src={isNightMode ? activeSpace.nightImage : activeSpace.daylightImage}
                  alt={activeSpace.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to media placeholder
                    const target = e.target as HTMLImageElement
                    target.src = '/media/ben-kia-song/12-1600.webp'
                  }}
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Day / Night mode toggle switch */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 p-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-xs">
                  <button
                    type="button"
                    onClick={toggleLightingMode}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      !isNightMode
                        ? 'bg-[#c5a880] text-[#14120f] font-medium shadow-sm'
                        : 'text-[#9c9180] hover:text-white'
                    }`}
                  >
                    Nắng Tự Nhiên
                  </button>
                  <button
                    type="button"
                    onClick={toggleLightingMode}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      isNightMode
                        ? 'bg-[#c5a880] text-[#14120f] font-medium shadow-sm'
                        : 'text-[#9c9180] hover:text-white'
                    }`}
                  >
                    Dạ Đăng 2700K
                  </button>
                </div>

                {/* Location and area pill */}
                <div className="absolute bottom-4 left-4 z-10 flex flex-wrap gap-2 text-xs">
                  <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 text-[#f0ece3]">
                    {activeSpace.location}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 text-[#c5a880]">
                    {activeSpace.area}
                  </span>
                </div>

                {/* Zoom button */}
                <button
                  type="button"
                  onClick={() => setIsZoomModalOpen(true)}
                  className="absolute bottom-4 right-4 z-10 p-2 rounded-lg bg-black/70 backdrop-blur-sm border border-white/10 text-[#d4cbbe] hover:text-white hover:border-[#c5a880] transition-colors text-xs flex items-center gap-1.5"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  Xem Toàn Cảnh
                </button>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeSpace.features.map((feat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#171410] border border-[#2b241b] text-center">
                    <p className="text-[11px] text-[#857a6b] uppercase tracking-wider">{feat.label}</p>
                    <p className="text-xs font-serif text-[#f2ede4] mt-1 font-medium">{feat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content & Insights column */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs text-[#c5a880] uppercase tracking-widest font-mono">
                  {activeSpace.year} · GuHomes Portfolio
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-[#f7f4ee] mt-1 leading-tight">
                  {activeSpace.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#b0a594] mt-1 font-light italic">
                  {activeSpace.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#c7beaf] font-light leading-relaxed">
                {activeSpace.heroDescription}
              </p>

              {/* Climate solution card */}
              <div className="p-4 rounded-xl bg-[#1a1612] border border-[#3b3123] space-y-2">
                <h4 className="text-xs font-serif text-[#c5a880] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
                  Giải Pháp Vi Khí Hậu Sài Gòn
                </h4>
                <p className="text-xs text-[#b8ad9c] leading-relaxed font-light">
                  {activeSpace.climateSolution}
                </p>
              </div>

              {/* Material palette list */}
              <div className="space-y-2">
                <h4 className="text-xs font-serif text-[#c5a880] uppercase tracking-wider">
                  Bảng Vật Liệu Xúc Giác Độc Bản
                </h4>
                <ul className="space-y-1.5 text-xs text-[#aea392]">
                  {activeSpace.materialPalette.map((mat, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2">
                      <span className="text-[#857560] mt-0.5">•</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA & Hotline */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-[#c5a880] hover:bg-[#d4ba94] text-[#14120f] text-xs font-medium text-center transition-all shadow-md active:scale-95"
                >
                  Đăng Ký Tham Quan & Tư Vấn KTS
                </a>
                <a
                  href="tel:0368757916"
                  className="px-4 py-2.5 rounded-xl bg-[#1f1b15] hover:bg-[#2a241d] border border-[#3d3324] text-[#e8e4db] text-xs font-light text-center transition-all"
                >
                  Hotline KTS: 0368 757 916
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {isZoomModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <div className="relative max-w-5xl w-full">
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="absolute -top-12 right-0 text-[#d8d0c2] hover:text-white text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10"
              >
                Đóng Toàn Cảnh ✕
              </button>
              <img
                src={isNightMode ? activeSpace.nightImage : activeSpace.daylightImage}
                alt={activeSpace.title}
                className="w-full max-h-[80vh] object-contain rounded-xl border border-[#443828] shadow-2xl"
              />
              <div className="text-center mt-3 text-xs text-[#a39785]">
                {activeSpace.title} · {isNightMode ? 'Chế độ chiếu sáng dạ đăng 2700K' : 'Chế độ ánh sáng ban ngày tự nhiên'}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default BespokePrestigeSpacesLookbook
