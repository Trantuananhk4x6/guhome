'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type PavilionModelId = 'tatami' | 'live-edge' | 'river-balcony'

export type TeaTypeId = 'shan-tuyet' | 'sen-tay-ho' | 'o-long'

interface TeaSpec {
  id: TeaTypeId
  nameVi: string
  subtitleVi: string
  originVi: string
  waterTempC: number
  steepingTimeSec: number
  flavorProfileVi: string
  colorHex: string
  culturalNoteVi: string
  icon: string
}

const TEAS_DATA: Record<TeaTypeId, TeaSpec> = {
  'shan-tuyet': {
    id: 'shan-tuyet',
    nameVi: 'Shan Tuyết Cổ Thụ Tà Xùa 300 Năm',
    subtitleVi: 'Ancient Wild Snow Tea · Đỉnh Mây Sơn La',
    originVi: 'Rừng chè cổ thụ Tà Xùa ở độ cao 1.800m, thu hái búp 1 tôm 2 lá phủ lông tơ tuyết trắng',
    waterTempC: 88,
    steepingTimeSec: 25,
    flavorProfileVi: 'Hương thơm khói lam chiều, mật ong rừng, vị chát thanh thoát ngọt hậu sâu nơi cuống họng',
    colorHex: '#D4AF37',
    culturalNoteVi: 'Búp trà hấp thụ linh khí sương mây vùng núi cao, đem lại sự an tĩnh và tỉnh thức tinh thần sau ngày dài.',
    icon: '🍵',
  },
  'sen-tay-ho': {
    id: 'sen-tay-ho',
    nameVi: 'Trà Sen Bách Diệp Tây Hồ Thượng Hạng',
    subtitleVi: 'Sacred Lotus Tea · Tinh Hoa Hà Thành',
    originVi: 'Hồ Tây, ướp thủ công từ 1.500 bông sen Bách Diệp thu hái lúc bình minh còn đọng sương',
    waterTempC: 85,
    steepingTimeSec: 30,
    flavorProfileVi: 'Hương sen thơm ngát thanh khiết, vị trà êm dịu thanh tao, lưu hương nhiều giờ trong khoang miệng',
    colorHex: '#E5A9A9',
    culturalNoteVi: 'Được mệnh danh là thiên cổ đệ nhất trà của người Việt, là phẩm vật quý chỉ dùng đãi khách tri âm.',
    icon: '🪷',
  },
  'o-long': {
    id: 'o-long',
    nameVi: 'Ô Long Lão Trà Đại Hồng Bào Ủ Gỗ',
    subtitleVi: 'Aged Oolong Rock Tea · Thần Khí Trà Thất',
    originVi: 'Cao nguyên Lâm Đồng ủ chum sành nung củi trên 10 năm theo kỹ thuật cổ truyền',
    waterTempC: 95,
    steepingTimeSec: 40,
    flavorProfileVi: 'Nốt hương gỗ trầm, quả chín sấy khô, sắc nước nâu đỏ hổ phách sánh mịn như mật',
    colorHex: '#9E472A',
    culturalNoteVi: 'Hàm lượng polyphenol cao giúp hạ nhịp tim, thư giãn các bó cơ và đưa thân tâm về trạng thái thiền định.',
    icon: '🍂',
  },
}

interface PavilionModel {
  id: PavilionModelId
  titleVi: string
  subtitleVi: string
  materialVi: string
  lightingMoodVi: string
  soundscapeVi: string
  tagVi: string
  icon: string
  descriptionVi: string
  features: string[]
  ergonomicNoteVi: string
}

const PAVILION_MODELS: Record<PavilionModelId, PavilionModel> = {
  tatami: {
    id: 'tatami',
    titleVi: 'Trà Thất Chiếu Tatami Truyền Thống',
    subtitleVi: 'Traditional Igusa Tatami Tea Room · Bàn Trũng Âm Sàn',
    materialVi: 'Chiếu cói tự nhiên Igusa Nhật Bản thơm dịu + Bàn trũng Kotatsu hạ sàn gỗ sồi + Khung lụa Shoji',
    lightingMoodVi: 'Ánh sáng khuếch tán mềm 2200K qua vách giấy Shoji Washi thủ công',
    soundscapeVi: 'Tiếng nước sôi reo tí tách từ ấm gang Nanbu Tekki Nhật Bản',
    tagVi: 'Tịnh Lạc Cổ Điển · Chiếu Cói Thơm Mộc',
    icon: '🏯',
    descriptionVi:
      'Lấy cảm hứng từ các trà thất Kyoto kết hợp vi khí hậu Sài Gòn. Toàn bộ nền phòng trà được nâng cao 400mm tạo khoang trũng âm sàn (Horigotatsu) giúp người ngồi buông chân thoải mái mà không bị tê mỏi khi đàm đạo hàng giờ.',
    features: [
      'Chiếu cói tự nhiên Igusa có khả năng tự thanh lọc và hút ẩm phòng',
      'Bàn trũng nâng hạ điện giấu âm sàn mở rộng không gian khi cần thiền tọa',
      'Hệ cửa lùa trượt lụa Shoji cách âm tiêu âm chuẩn NRC 0.45',
      'Tủ trà giấu âm tường trưng bày ấm tử sa Nghi Hưng quý hiếm',
    ],
    ergonomicNoteVi: 'Chiều cao mặt bàn 380mm chuẩn nhân trắc học người Á Đông, đệm ngồi lụa tơ tằm êm ái.',
  },
  'live-edge': {
    id: 'live-edge',
    titleVi: 'Bàn Trà Thủy Mặc Khối Gỗ Mun & Đá Vôi',
    subtitleVi: 'Sculptural Live-Edge Mun Ebony & Limestone Tea Table',
    materialVi: 'Gỗ Mun sọc nguyên tấm dày 80mm giữ mép bìa tự nhiên + Chân đá vôi Travertine đục tay',
    lightingMoodVi: 'Đèn rọi chùm tia hẹp 15° Warm Dim 1800K tụ điểm như ánh nến dạ tiệc',
    soundscapeVi: 'Tiếng gáo tre múc nước róc rách vào chậu gốm men tro',
    tagVi: 'Thủy Mặc Điêu Khắc · Trầm Ổn Uy Nghi',
    icon: '⛰️',
    descriptionVi:
      'Một tác phẩm điêu khắc độc bản nằm giữa lòng căn penthouse. Mặt gỗ Mun sọc với các vân đen vàng uốn lượn như bức tranh thủy mặc kỳ vĩ, được kê vững chãi trên khối đá vôi thô mộc, tạo điểm tựa phong thủy vững vàng.',
    features: [
      'Mặt gỗ giữ nguyên cạnh mộc (Live Edge) với lớp hoàn thiện dầu sáp Osmo mờ',
      'Chân đế đá nguyên khối nặng 180kg triệt tiêu hoàn toàn rung chấn mặt bàn',
      'Hệ thống cấp thoát nước giấu âm trong chân đá nối thẳng về ống trục',
      'Bếp từ âm phẳng tàng hình dưới mặt bàn để đun nước pha trà',
    ],
    ergonomicNoteVi: 'Ghế ngồi tựa thấp bằng gỗ Teak bọc da thuộc thảo mộc, nâng đỡ hoàn hảo đốt sống thắt lưng.',
  },
  'river-balcony': {
    id: 'river-balcony',
    titleVi: 'Góc Thiền Trà Ban Công Ven Sông',
    subtitleVi: 'Open-Air River Breeze Tea Balcony · Lam Gỗ Xoay',
    materialVi: 'Gỗ Teak Myanmar kháng nước tuyệt đối + Rèm tre trúc chẻ tay + Bồn sỏi suối tự nhiên',
    lightingMoodVi: 'Ánh hoàng hôn vàng óng ả sông Sài Gòn hòa cùng đèn lồng gốm hắt sàn',
    soundscapeVi: 'Gió sông thổi qua tán cây sứ đại cùng tiếng chuông gió đồng ngân vang',
    tagVi: 'Giao Hòa Trời Đất · Đón Gió Sông Mát Lành',
    icon: '🍃',
    descriptionVi:
      'Tận dụng luồng gió đối lưu tự nhiên từ sông Sài Gòn. Hệ lam gỗ Teak xoay 360 độ cho phép gia chủ linh hoạt che chắn nắng xế chiều hoặc mở toang đón gió mát lành buổi tối, biến ban công thành chốn bồng lai giữa đô thị.',
    features: [
      'Gỗ Teak chịu nắng mưa không mối mọt cong vênh suốt 30 năm',
      'Bồn tiểu cảnh sỏi suối và vòi nước chảy tuần hoàn hạ nhiệt 2-3°C',
      'Hệ rèm cuốn tre trúc dệt tay che chắn 70% bức xạ nắng Tây gắt',
      'Sàn gỗ nan hở thoát nước mưa tức thì, chân trần luôn khô ráo',
    ],
    ergonomicNoteVi: 'Ghế bành mây đan thủ công tựa lưng 115 độ giúp thả lỏng hoàn toàn cơ hoành hô hấp.',
  },
}

export function TeaSanctuaryPavilion({ className }: { className?: string } = {}) {
  const [selectedModelId, setSelectedModelId] = useState<PavilionModelId>('tatami')
  const [selectedTeaId, setSelectedTeaId] = useState<TeaTypeId>('shan-tuyet')
  const [waterTemp, setWaterTemp] = useState<number>(88)

  const currentModel = PAVILION_MODELS[selectedModelId]
  const currentTea = TEAS_DATA[selectedTeaId]

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Trà Đạo &amp; Thiền Định · GuHomes Sanctuary Atelier
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Wabi-Sabi Tĩnh Lặng
              </span>
            </div>
            <h2 className="u-display mt-3 text-ink">
              Không Gian Thưởng Trà Tịnh Tâm Tĩnh Lặng
            </h2>
            <p className="u-body mt-2 max-w-[56ch] text-muted">
              Phòng trà trong tư gia thượng lưu không chỉ là nơi tiếp khách quý, mà là trạm dừng tâm thức — nơi gia chủ
              trút bỏ những ồn ào phố thị để lắng nghe hơi thở và tái tạo năng lượng nội tại.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted">Vật liệu tinh tuyển:</span>
            <span className="text-xs font-mono font-medium text-ink bg-canvas px-3 py-1.5 rounded-full border border-line">
              Cói Igusa · Gỗ Mun · Đá Vôi
            </span>
          </div>
        </div>

        {/* 3 Pavilion Models Selector Tabs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {(Object.keys(PAVILION_MODELS) as PavilionModelId[]).map((id) => {
            const model = PAVILION_MODELS[id]
            const isSelected = selectedModelId === id

            return (
              <button
                key={model.id}
                type="button"
                onClick={() => setSelectedModelId(id)}
                className={cn(
                  'group relative text-left rounded-2xl p-6 border transition-all duration-300 min-h-[170px] flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-canvas ring-1 ring-accent/30 shadow-lg'
                    : 'border-line bg-canvas/60 hover:border-line-hover hover:bg-canvas'
                )}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{model.icon}</span>
                    <span
                      className={cn(
                        'text-[10px] font-mono px-2.5 py-0.5 rounded-full border',
                        isSelected
                          ? 'border-accent/30 bg-accent/10 text-accent font-semibold'
                          : 'border-line text-muted'
                      )}
                    >
                      {model.tagVi}
                    </span>
                  </div>

                  <div className="mt-4 font-serif text-lg font-medium text-ink group-hover:text-accent">
                    {model.titleVi}
                  </div>
                  <div className="mt-1 text-xs text-muted line-clamp-1">{model.subtitleVi}</div>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="activeTeaPavilionIndicator"
                    className="absolute bottom-0 left-6 right-6 h-0.5 bg-accent"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Pavilion Deep-Dive & Sensory Tea Brewing Ritual */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Interactive Architecture & Craft Specs */}
          <div className="lg:col-span-7 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b border-line pb-4">
                <span className="text-3xl">{currentModel.icon}</span>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Giải Pháp Kiến Trúc May Đo
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-ink font-normal">
                    {currentModel.titleVi}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm sm:text-base text-muted font-light leading-relaxed">
                {currentModel.descriptionVi}
              </p>

              {/* Sensory Ambience Cards */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase">
                    <span>💡</span>
                    <span>Ánh Sáng Khuyên Dùng</span>
                  </div>
                  <div className="mt-1 text-xs text-ink font-medium leading-relaxed">
                    {currentModel.lightingMoodVi}
                  </div>
                </div>

                <div className="rounded-xl border border-line bg-surface/50 p-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase">
                    <span>🔔</span>
                    <span>Âm Thanh Trầm Lắng</span>
                  </div>
                  <div className="mt-1 text-xs text-ink font-medium leading-relaxed">
                    {currentModel.soundscapeVi}
                  </div>
                </div>
              </div>

              {/* 4 Architectural Features */}
              <div className="mt-6">
                <span className="text-xs font-mono uppercase tracking-wider text-muted font-semibold">
                  Chi Tiết Kỹ Nghệ Chế Tác:
                </span>
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentModel.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-ink">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ergonomics Quote */}
              <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs font-serif italic text-ink">
                &ldquo;{currentModel.ergonomicNoteVi}&rdquo;
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex items-center justify-between">
              <span className="text-xs text-muted">KTS Trưởng GuHomes trực tiếp khảo sát góc tĩnh tâm.</span>
              <a
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-mono text-accent hover:underline font-semibold"
              >
                <span>Xem Công Trình Đã Thi Công</span>
                <ArrowUpRightIcon className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Sensory Tea Tasting & Temperature Ritual */}
          <div className="lg:col-span-5 rounded-2xl border border-line bg-canvas p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="border-b border-line pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-muted">Nghi Thức Thưởng Trà</span>
                <h4 className="font-serif text-xl sm:text-2xl text-ink font-normal mt-1">
                  Tuyển Tập Danh Trà Cổ Thụ
                </h4>
              </div>

              {/* 3 Tea Types Selector */}
              <div className="mt-5 space-y-2.5">
                {(Object.keys(TEAS_DATA) as TeaTypeId[]).map((teaId) => {
                  const tea = TEAS_DATA[teaId]
                  const isSelected = selectedTeaId === teaId

                  return (
                    <button
                      key={tea.id}
                      type="button"
                      onClick={() => {
                        setSelectedTeaId(teaId)
                        setWaterTemp(tea.waterTempC)
                      }}
                      className={cn(
                        'w-full text-left rounded-xl p-3.5 border transition-all flex items-center justify-between',
                        isSelected
                          ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                          : 'border-line bg-surface/40 hover:bg-surface'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tea.icon}</span>
                        <div>
                          <div className="font-serif text-sm font-medium text-ink">{tea.nameVi}</div>
                          <div className="text-[11px] text-muted">{tea.subtitleVi}</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-accent">{tea.waterTempC}°C</span>
                    </button>
                  )
                })}
              </div>

              {/* Current Tea Deep Flavor Profile */}
              <div className="mt-6 rounded-xl border border-line bg-surface/50 p-4">
                <div className="flex items-center justify-between text-xs font-mono text-muted">
                  <span>Hương Vị Đặc Trưng:</span>
                  <span className="text-accent font-semibold">Thời gian hãm: {currentTea.steepingTimeSec} giây</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm font-serif text-ink leading-relaxed">
                  {currentTea.flavorProfileVi}
                </p>
                <div className="mt-3 pt-3 border-t border-line/60 text-[11px] text-muted font-light leading-relaxed">
                  {currentTea.culturalNoteVi}
                </div>
              </div>

              {/* Interactive Temperature Scrub */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted">Nhiệt Độ Nước Pha Trà:</span>
                  <span className="font-bold text-accent text-sm">{waterTemp}°C</span>
                </div>
                <input
                  type="range"
                  min={80}
                  max={98}
                  step={1}
                  value={waterTemp}
                  onChange={(e) => setWaterTemp(Number(e.target.value))}
                  className="w-full mt-2 accent-amber-600"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted mt-1">
                  <span>80°C (Dịu ngọt)</span>
                  <span>88°C (Cân bằng)</span>
                  <span>98°C (Đậm sâu)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <a
                href="/contact"
                className="w-full min-h-[44px] rounded-xl bg-accent px-5 py-3 text-xs font-bold text-canvas hover:bg-accent-hover transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Đăng Ký Tư Vấn Không Gian Trà Thất</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
