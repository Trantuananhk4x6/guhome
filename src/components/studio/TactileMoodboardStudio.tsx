'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTactileSampleBoxStore } from '@/lib/tactile-sample-box'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export interface MaterialLayer {
  name: string
  spec: string
  tactileFeel: string
  swatchGradient: string
  borderTone: string
}

export interface CuratedMoodboard {
  id: string
  title: string
  subtitle: string
  tagline: string
  description: string
  layers: MaterialLayer[]
  acousticsNRC: number // 0.60 - 0.75
  humidityResistance: string // e.g. "98%"
  lightTemp: string
  criRating: number
  bestFor: string
  audioCharacteristics: string
}

export const MOODBOARD_COLLECTION: CuratedMoodboard[] = [
  {
    id: 'hoang-hon-thu-thiem',
    title: 'Hoàng Hôn Thủ Thiêm',
    subtitle: 'Nhiệt Huyết Bờ Đông · Dịu Êm Nắng Chiều Tây',
    tagline: 'Đá Travertine Ý + Gỗ Óc Chó FAS + Vôi Khoáng Calce + Đèn Warm Dim 2700K',
    description:
      'Lấy cảm hứng từ ánh hoàng hôn rực rỡ buông xuống khúc sông Thủ Thiêm. Các lỗ rỗng tự nhiên của đá Travertine kết hợp thớ gỗ óc chó FAS thẫm màu giúp hấp thụ bức xạ nhiệt và cân bằng ánh sáng chói chang từ mặt kính căn hộ.',
    layers: [
      {
        name: 'Đá Travertine Roman Cổ Điển',
        spec: 'Xẻ thô giữ lỗ thở tự nhiên 20mm',
        tactileFeel: 'Mát lạnh khi chạm, tiêu tán nhiệt bức xạ mặt trời hướng Tây',
        swatchGradient: 'from-[#D9CEBA] via-[#C8B89E] to-[#B3A082]',
        borderTone: 'border-[#C8B89E]/50',
      },
      {
        name: 'Gỗ Óc Chó FAS Bắc Mỹ',
        spec: 'Sấy chân không EMC 10–12%, dầu Osmo Đức',
        tactileFeel: 'Mịn màng thớ vân mây, tỏa hương dầu hạt lanh tự nhiên',
        swatchGradient: 'from-[#4A3326] via-[#352319] to-[#25170F]',
        borderTone: 'border-[#4A3326]/50',
      },
      {
        name: 'Vôi Khoáng Calce Ý Phủ Bay',
        spec: 'Vôi tôi thủ công chuyển sắc 3 lớp',
        tactileFeel: 'Mờ mịn vỏ trứng, khuếch tán ánh hoàng hôn dịu mắt',
        swatchGradient: 'from-[#E6DFD3] via-[#DDD3C3] to-[#CDC0AE]',
        borderTone: 'border-[#DDD3C3]/50',
      },
      {
        name: 'Hệ Đèn Chiếu Warm Dim 2700K',
        spec: 'LED Bridgelux CRI 98, góc chiếu 24°',
        tactileFeel: 'Ánh sáng mật ong ấm cúng, êm dịu cho đôi mắt sau giờ làm việc',
        swatchGradient: 'from-[#FFB86C] via-[#FF9E44] to-[#E67E22]',
        borderTone: 'border-[#FFB86C]/50',
      },
    ],
    acousticsNRC: 0.72,
    humidityResistance: '97% (Chống nồm ẩm Sài Gòn)',
    lightTemp: 'Warm Dim 2700K → 1800K khi giảm sáng',
    criRating: 98,
    bestFor: 'Penthouse & Duplex hướng Tây sông Sài Gòn (The Opera, The River, Cove Empire)',
    audioCharacteristics: 'Triệt tiêu 72% tiếng vang dội từ kính khổ lớn, cho âm thanh hội thoại ấm và rõ.',
  },
  {
    id: 'gio-song-thao-dien',
    title: 'Gió Sông Thảo Điền',
    subtitle: 'Nhiệt Đới Xanh Mát · Kháng Ẩm Tuyệt Đối',
    tagline: 'Gỗ Teak Mộc + Vải Lanh Bỉ + Terrazzo Nhám + Cây Trầu Bà Nam Mỹ',
    description:
      'Dành riêng cho những biệt thự và căn hộ bán đảo Thảo Điền nơi độ ẩm mùa mưa lên tới 85%. Gỗ Teak giàu tinh dầu tự nhiên kết hợp sợi lanh Bỉ thoáng khí tạo nên không gian thanh mát, không bao giờ có mùi ẩm mốc.',
    layers: [
      {
        name: 'Gỗ Teak Miến Điện Nguyên Tấm',
        spec: 'Hàm lượng dầu tự nhiên cao, chống nước',
        tactileFeel: 'Đầm chắc, sáp dầu tự nhiên kháng nước và mối mọt trọn đời',
        swatchGradient: 'from-[#8C6239] via-[#6F4E2D] to-[#543A21]',
        borderTone: 'border-[#8C6239]/50',
      },
      {
        name: 'Vải Lanh Bỉ Dệt Thô',
        spec: '100% sợi Flax tự nhiên vùng Flanders',
        tactileFeel: 'Nhăn nhẹ quý phái, thoáng mát gấp 3 lần vải dệt công nghiệp',
        swatchGradient: 'from-[#E4DDD3] via-[#D3C7B6] to-[#C0B29F]',
        borderTone: 'border-[#D3C7B6]/50',
      },
      {
        name: 'Đá Terrazzo Hạt Thạch Anh Nhám',
        spec: 'Bột đá cẩm thạch trắng mài mờ satin',
        tactileFeel: 'Nhám nhẹ chống trơn trượt, mát bàn chân trần buổi sớm',
        swatchGradient: 'from-[#C5C7C4] via-[#ADB0AC] to-[#929691]',
        borderTone: 'border-[#ADB0AC]/50',
      },
      {
        name: 'Sắc Xanh Cây Bản Địa Nhiệt Đới',
        spec: 'Monstera & Chuối Rẻ Quạt lọc không khí',
        tactileFeel: 'Tươi tắn, làm mềm các đường nét góc cạnh của kiến trúc',
        swatchGradient: 'from-[#2D5A46] via-[#1E3F30] to-[#12281E]',
        borderTone: 'border-[#2D5A46]/50',
      },
    ],
    acousticsNRC: 0.68,
    humidityResistance: '98% (Chịu ẩm cao nhất)',
    lightTemp: 'Neutral Warm 3000K tự nhiên',
    criRating: 97,
    bestFor: 'Biệt thự Holm Villas, D’Edge Thảo Điền, Nhà vườn ven sông',
    audioCharacteristics: 'Hấp thụ tiếng mưa rào nhiệt đới gõ lên mái kính và cửa sổ.',
  },
  {
    id: 'tinh-lang-chateau',
    title: 'Tĩnh Lặng Chateau',
    subtitle: 'Đẳng Cấp Quyền Quý · Trầm Tích Năm Tháng',
    tagline: 'Gỗ Mun Sọc + Da Thuộc Thảo Mộc Ý + Kim Loại Đồng Thau Xước + Lụa Tơ Tằm',
    description:
      'Thiết kế dành cho những chủ nhân yêu thích vẻ đẹp thâm trầm, trang trọng và uy nghiêm. Sự kết hợp giữa da thuộc Veg-Tan vùng Tuscany và đồng thau xước tay sẽ đổi màu patina tuyệt đẹp sau nhiều năm sinh sống.',
    layers: [
      {
        name: 'Gỗ Mun Sọc May Đo',
        spec: 'Vân sọc đen huyền bí, đầm chắc tuyệt đối',
        tactileFeel: 'Cứng chắc như đá, bề mặt vuốt mịn láng không tì vết',
        swatchGradient: 'from-[#2B2625] via-[#1F1C1B] to-[#141211]',
        borderTone: 'border-[#2B2625]/50',
      },
      {
        name: 'Da Bò Thuộc Thảo Mộc (Tuscany)',
        spec: '100% Full-grain da bò Ý thuộc tannin vỏ cây',
        tactileFeel: 'Mềm mại dẻo dai, tỏa hương da thảo mộc đặc trưng sang trọng',
        swatchGradient: 'from-[#6E473B] via-[#52332A] to-[#3B221B]',
        borderTone: 'border-[#6E473B]/50',
      },
      {
        name: 'Đồng Thau Xước Thủ Công',
        spec: 'Brass nguyên khối oxy hoá tự nhiên (Patina)',
        tactileFeel: 'Ánh kim loại mờ ấm áp, sáng lên tại những điểm bàn tay hay chạm',
        swatchGradient: 'from-[#C5A059] via-[#A88440] to-[#8C6B2D]',
        borderTone: 'border-[#C5A059]/50',
      },
      {
        name: 'Lụa Tơ Tằm Bảo Lộc Dệt Tay',
        spec: 'Sợi tơ óng tự nhiên dệt mật độ cao',
        tactileFeel: 'Mượt mà như nhung nước, cách âm rèm cửa và gối tựa',
        swatchGradient: 'from-[#D8C7B5] via-[#C5B09B] to-[#AE9780]',
        borderTone: 'border-[#D8C7B5]/50',
      },
    ],
    acousticsNRC: 0.75,
    humidityResistance: '95% (Dưỡng ẩm da định kỳ)',
    lightTemp: 'Amber Gold 2400K thư giãn',
    criRating: 99,
    bestFor: 'Biệt thự Chateau Phú Mỹ Hưng, Penthouse Grand Marina Ba Son',
    audioCharacteristics: 'Hệ số tiêu âm cao nhất (0.75), hoàn hảo cho phòng đọc sách và phòng nghe nhạc Hi-End.',
  },
  {
    id: 'wabi-sabi-thien-tu',
    title: 'Wabi-Sabi Thiền Tự',
    subtitle: 'Nâng Niu Sự Vô Thường · Chân Mộc Bình Yên',
    tagline: 'Gỗ Sồi Tự Nhiên + Giấy Dó Thủ Công + Vữa Rơm Hữu Cơ + Đất Sét Nung',
    description:
      'Tìm về chốn ẩn náu an yên nơi tâm hồn được gột rửa mọi áp lực đô thị. Sử dụng giấy Dó truyền thống Việt Nam và vữa rơm hữu cơ đưa thiên nhiên mộc mạc nhất vào từng nhịp thở.',
    layers: [
      {
        name: 'Gỗ Sồi Trắng Xử Lý Xà Phòng',
        spec: 'Sồi Bắc Mỹ sấy chân không màu sáng tự nhiên',
        tactileFeel: 'Chân trần bước lên thấy ấm êm, vân gỗ mộc mạc nhẹ nhàng',
        swatchGradient: 'from-[#D5C2A5] via-[#C4AE8E] to-[#B29A78]',
        borderTone: 'border-[#D5C2A5]/50',
      },
      {
        name: 'Giấy Dó Bắc Ninh Thủ Công',
        spec: 'Vỏ cây dó đập tay ép mỏng cho chao đèn',
        tactileFeel: 'Xốp nhẹ, lọc ánh sáng thành quầng mờ sương tựa trăng rằm',
        swatchGradient: 'from-[#F5EFE6] via-[#E8DFD1] to-[#DACDBD]',
        borderTone: 'border-[#E8DFD1]/50',
      },
      {
        name: 'Vữa Rơm Khoáng Hữu Cơ',
        spec: 'Vôi tôi trộn rơm nếp đồng bằng Bắc Bộ',
        tactileFeel: 'Sần ráp tự nhiên, mùi rơm khô thoang thoảng gợi nhớ đồng quê',
        swatchGradient: 'from-[#C7BAA7] via-[#B5A590] to-[#A08F79]',
        borderTone: 'border-[#B5A590]/50',
      },
      {
        name: 'Gạch Gốm Đất Sét Nung Củi',
        spec: 'Gốm đất đỏ nung lò củi truyền thống',
        tactileFeel: 'Chát nhẹ tay người, mát lạnh và tích tụ năng lượng thổ nhưỡng',
        swatchGradient: 'from-[#A45A3E] via-[#8B452D] to-[#713420]',
        borderTone: 'border-[#A45A3E]/50',
      },
    ],
    acousticsNRC: 0.70,
    humidityResistance: '96% (Vôi rơm kháng ẩm tự nhiên)',
    lightTemp: 'Nến Ấm 2200K – 2700K',
    criRating: 97,
    bestFor: 'Không gian Thiền, Phòng trà đạo, Căn hộ nhỏ phong cách Nhật Bản',
    audioCharacteristics: 'Triệt tiêu sóng đứng tần số trung, tái tạo không gian tĩnh mịch tuyệt đối.',
  },
  {
    id: 'hien-dai-nhiet-doi',
    title: 'Hiện Đại Nhiệt Đới',
    subtitle: 'Đối Lưu Khí Trời · Kết Cấu Bền Vững',
    tagline: 'Gỗ Căm Xe Tái Sinh + Kính Gân Moru + Gốm Bát Tràng Mờ + Bê Tông Mài',
    description:
      'Giao thoa giữa ngôn ngữ hình khối dứt khoát của kiến trúc hiện đại và linh hồn nhiệt đới Sài Gòn. Kính gân Moru tạo sự riêng tư tinh tế mà vẫn để luồng sáng tự nhiên tràn ngập không gian.',
    layers: [
      {
        name: 'Gỗ Căm Xe Tuyển Chọn',
        spec: 'Gỗ căm xe lâu năm thớ đanh chắc',
        tactileFeel: 'Rắn rỏi, chuyển dần sang màu cánh gián đằm thắm',
        swatchGradient: 'from-[#733B2B] via-[#5A2B1E] to-[#431D14]',
        borderTone: 'border-[#733B2B]/50',
      },
      {
        name: 'Kính Gân Moru Siêu Trong',
        spec: 'Kính cường lực rãnh sóng 8mm',
        tactileFeel: 'Gợn sóng lăn tăn, làm mờ bóng người sau vách ngăn',
        swatchGradient: 'from-[#E1E8E6] via-[#C9D4D1] to-[#AFC0BD]',
        borderTone: 'border-[#C9D4D1]/50',
      },
      {
        name: 'Gốm Men Tro Bát Tràng Mờ',
        spec: 'Gốm thủ công vuốt tay men tro củi',
        tactileFeel: 'Mịn màng lỳ sương, không bám vân tay',
        swatchGradient: 'from-[#8E9B90] via-[#758277] to-[#5C6A5E]',
        borderTone: 'border-[#758277]/50',
      },
      {
        name: 'Bê Tông Mài Lộ Cốt Liệu',
        spec: 'Mài bóng mờ phủ sealer thẩm thấu gốc nước',
        tactileFeel: 'Mát lạnh bằng phẳng, tạo nền tảng vững chắc cho đồ gỗ',
        swatchGradient: 'from-[#9B9E9B] via-[#858885] to-[#6E716E]',
        borderTone: 'border-[#858885]/50',
      },
    ],
    acousticsNRC: 0.65,
    humidityResistance: '97% (Bền bỉ nhiệt đới)',
    lightTemp: '3000K Trung Tính Ấm Áp',
    criRating: 96,
    bestFor: 'Nhà phố hiện đại, Shophouse The Global City, Căn hộ duplex',
    audioCharacteristics: 'Cân bằng hài hòa giữa độ sống động của âm thanh và độ rõ của giọng nói.',
  },
  {
    id: 'toi-gian-tinh-khiet',
    title: 'Tối Giản Tinh Khiết',
    subtitle: 'Tách Bạch Tâm Trí · Tôn Vinh Khoảng Trống',
    tagline: 'Gỗ Ash Sáng Màu + Đá Thạch Anh Trắng + Nhôm Anode Mờ + Vải Cotton Organic',
    description:
      'Một bản tuyên ngôn về sự thanh khiết. Mọi chi tiết thừa thãi bị gạt bỏ để nhường chỗ cho ánh sáng, bóng đổ và sự chuyển động của làn gió Sài Gòn. Giúp gia chủ trút bỏ mệt mỏi ngay khi bước qua ngưỡng cửa.',
    layers: [
      {
        name: 'Gỗ Tần Bì (Ash) Tự Nhiên',
        spec: 'Vân elip đều đặn, màu vàng rơm thanh lịch',
        tactileFeel: 'Sáng bừng không gian, thớ gỗ mịn êm ái dưới ngón tay',
        swatchGradient: 'from-[#E5D7C3] via-[#D5C4AC] to-[#C2AF94]',
        borderTone: 'border-[#D5C4AC]/50',
      },
      {
        name: 'Đá Thạch Anh Nhân Tạo Trắng Mờ',
        spec: '93% thạch anh nguyên chất chống ố kháng khuẩn',
        tactileFeel: 'Mịn màng không lỗ rỗng, dễ dàng vệ sinh',
        swatchGradient: 'from-[#F8F8F7] via-[#EEEEEC] to-[#E2E2E0]',
        borderTone: 'border-[#EEEEEC]/50',
      },
      {
        name: 'Nhôm Định Hình Anode Mờ Champagne',
        spec: 'Xử lý bề mặt điện hóa chống xước tay',
        tactileFeel: 'Sắc sảo, góc cạnh chuẩn xác từng milimet cơ khí',
        swatchGradient: 'from-[#D0C5B4] via-[#BDB09E] to-[#A89A87]',
        borderTone: 'border-[#BDB09E]/50',
      },
      {
        name: 'Vải Cotton Hữu Cơ Dệt Chéo',
        spec: '100% sợi bông hữu cơ không tẩy trắng',
        tactileFeel: 'Dịu nhẹ thân thiện tối đa với làn da nhạy cảm',
        swatchGradient: 'from-[#FAF6F0] via-[#EDE6DC] to-[#DDD4C6]',
        borderTone: 'border-[#EDE6DC]/50',
      },
    ],
    acousticsNRC: 0.62,
    humidityResistance: '96%',
    lightTemp: '3500K Sáng Tinh Khiết',
    criRating: 97,
    bestFor: 'Căn hộ chung cư tối giản, Không gian làm việc sáng tạo tại gia',
    audioCharacteristics: 'Mang lại sự khúc chiết, thoáng đãng và tươi sáng cho không gian.',
  },
]

export function TactileMoodboardStudio({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState<string>('hoang-hon-thu-thiem')
  const { openModal } = useTactileSampleBoxStore()

  const currentBoard =
    MOODBOARD_COLLECTION.find((b) => b.id === selectedId) ?? MOODBOARD_COLLECTION[0]!

  return (
    <section className={cn('relative bg-[#0E1211] text-[#F3F1EC] py-16 sm:py-24 overflow-hidden border-y border-white/10', className)}>
      <div className="u-gutter mx-auto w-full max-w-[110rem] relative z-10">
        {/* Header Title */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-mono uppercase tracking-widest">
              <span>Phòng Thí Nghiệm Xúc Giác &amp; Âm Học</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mt-3 tracking-tight">
              Tactile Moodboard Studio
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-[58ch] mt-3 font-light leading-relaxed">
              6 bản phối vật liệu độc bản được nghiên cứu khoa học: kết hợp hệ số tiêu âm NRC chống ồn đô thị, độ kháng ẩm 80% Sài Gòn và quang phổ đèn LED 2700K êm ái.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60">
            <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-accent font-semibold">NRC: 0.60 – 0.75</span> (Hệ số tiêu âm)
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-accent font-semibold">EMC: 10% – 12%</span> (Cân bằng ẩm)
            </div>
            <div className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10">
              <span className="text-accent font-semibold">CRI &ge; 97</span> (Độ chuẩn màu)
            </div>
          </div>
        </div>

        {/* 6 Moodboard Horizontal Selector */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MOODBOARD_COLLECTION.map((board) => {
            const isActive = selectedId === board.id
            return (
              <button
                key={board.id}
                type="button"
                onClick={() => setSelectedId(board.id)}
                className={cn(
                  'px-4 py-2.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 border flex items-center gap-2',
                  isActive
                    ? 'bg-accent text-white border-white/30 shadow-lg shadow-accent/25 font-semibold'
                    : 'bg-white/[0.03] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.07]',
                )}
              >
                <span>{board.title}</span>
                {isActive && <CheckIcon className="text-xs" />}
              </button>
            )
          })}
        </div>

        {/* Active Moodboard Showcase Grid */}
        <div className="mt-10 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: 4 Physical Material Swatches Matrix */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2">
              <p className="text-xs font-mono uppercase text-accent tracking-wider">
                Cấu Trúc 4 Lớp Vật Liệu Xúc Giác:
              </p>
              <span className="text-xs font-mono text-white/40">Bản phối: {currentBoard.title}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentBoard.layers.map((layer, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-5 rounded-2xl bg-[#090C0B] border transition-all duration-500 hover:scale-[1.02] flex flex-col justify-between min-h-[170px]',
                    layer.borderTone,
                  )}
                >
                  <div>
                    {/* Visual Color/Texture Swatch Bar */}
                    <div
                      className={cn(
                        'w-full h-8 rounded-lg mb-3 shadow-inner bg-gradient-to-r',
                        layer.swatchGradient,
                      )}
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-accent">Lớp 0{idx + 1}</span>
                      <span className="text-[10px] font-mono text-white/40">GuHomes Curated</span>
                    </div>
                    <h4 className="font-serif text-base text-white font-normal mt-1">{layer.name}</h4>
                    <p className="text-[11px] font-mono text-white/60 mt-0.5">{layer.spec}</p>
                  </div>

                  <p className="text-xs text-white/80 font-light mt-3 leading-relaxed border-t border-white/5 pt-2 italic">
                    &quot;{layer.tactileFeel}&quot;
                  </p>
                </div>
              ))}
            </div>

            {/* Acoustic Character Note */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 text-xs text-white/70">
              <span className="text-base text-accent shrink-0 mt-0.5">🎧</span>
              <div>
                <strong className="text-white">Đặc tính âm học:</strong> {currentBoard.audioCharacteristics}
              </div>
            </div>
          </div>

          {/* Right Column: Diagnostic Lab & Conversion Card */}
          <div className="col-span-12 lg:col-span-5 bg-[#090C0B] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBoard.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col justify-between"
              >
                <div>
                  <div className="pb-4 border-b border-white/10">
                    <span className="text-xs font-mono text-accent uppercase tracking-widest">
                      {currentBoard.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-light mt-2">
                      {currentBoard.title}
                    </h3>
                    <p className="text-xs text-white/60 font-mono mt-1">{currentBoard.tagline}</p>
                  </div>

                  <p className="text-white/80 text-xs sm:text-sm mt-4 font-light leading-relaxed">
                    {currentBoard.description}
                  </p>

                  {/* 3 Real-time Diagnostics Gauges */}
                  <div className="mt-6 space-y-4 border-t border-white/10 pt-5">
                    {/* Gauge 1: NRC Acoustic Coefficient */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-white/70">Hệ Số Tiêu Âm NRC:</span>
                        <span className="text-accent font-semibold">{currentBoard.acousticsNRC} / 1.0</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${currentBoard.acousticsNRC * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-accent/80 to-accent"
                        />
                      </div>
                      <p className="text-[10px] text-white/40 mt-1">Hấp thụ {Math.round(currentBoard.acousticsNRC * 100)}% sóng phản xạ, giảm tiếng ồn đô thị</p>
                    </div>

                    {/* Gauge 2: Humidity Resistance */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-white/70">Khả Năng Chống Ẩm Sài Gòn:</span>
                        <span className="text-emerald-400 font-semibold">{currentBoard.humidityResistance}</span>
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                        <div style={{ width: '97%' }} className="h-full bg-emerald-500" />
                      </div>
                    </div>

                    {/* Gauge 3: Light Temperature & CRI */}
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-accent font-mono text-[10px] uppercase block">Ánh Sáng Khuyên Dùng:</span>
                        <span className="text-white font-medium">{currentBoard.lightTemp}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white/50 font-mono text-[10px] uppercase block">Chỉ số màu:</span>
                        <span className="text-accent font-bold font-mono">CRI {currentBoard.criRating}</span>
                      </div>
                    </div>

                    {/* Best for */}
                    <div className="text-xs text-white/70">
                      <strong className="text-white">Không gian lý tưởng:</strong> {currentBoard.bestFor}
                    </div>
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={openModal}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent hover:bg-accent/90 text-white font-medium text-xs font-mono transition-all shadow-lg shadow-accent/20 min-h-[46px]"
                  >
                    <span>Lưu Bảng Moodboard &amp; Nhận Hộp Mẫu Tại Nhà</span>
                    <ArrowUpRightIcon className="text-sm" />
                  </button>

                  <a
                    href="https://zalo.me/0368757916"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-white/15 bg-white/5 text-white/80 hover:text-white hover:bg-white/15 text-xs font-mono transition-colors min-h-[40px]"
                  >
                    <span>💬 Thảo Luận Bảng Phối Với KTS Trưởng</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
