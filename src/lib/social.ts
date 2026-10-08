'use client'

import { create } from 'zustand'

export interface SocialChannel {
  readonly id: string
  readonly label: string
  readonly name: string
  readonly handle: string
  readonly href: string
  readonly badge: string
  readonly summary: string
  readonly description: string
  readonly actionLabel: string
  readonly highlights: readonly string[]
  readonly qrType: 'zalo' | 'facebook' | 'general'
}

export const SOCIAL_CHANNELS: readonly SocialChannel[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    name: 'GuHomes — Thiết Kế, Thi Công & Sản Xuất Nội Thất',
    handle: 'GuHomes (TP. Hồ Chí Minh)',
    href: 'https://www.facebook.com/profile.php?id=61594054897878',
    badge: 'Fanpage chính thức',
    summary:
      'Đơn vị chuyên sâu về thiết kế, thi công, cung cấp và lắp đặt nội thất may đo theo yêu cầu của khách hàng — tận tâm trong từng chi tiết, minh bạch trong từng quy trình.',
    description:
      'Trang Facebook chính thức của GuHomes là nơi lưu giữ nhịp đập sống động từ thực địa công trường đến xưởng mộc gia công tại Quận 12. Tại đây, chúng tôi chia sẻ tường tận từng thước phim chuyển động của ánh sáng trên mảng tường vữa vôi, sự đầm chắc của từng thớ gỗ tự nhiên được tuyển lựa, và câu chuyện bàn giao những tổ ấm trọn vẹn tại TP. Hồ Chí Minh. Đội ngũ KTS trực tiếp túc trực lắng nghe, tư vấn phương án mặt bằng và dự toán 1-1 qua Messenger.',
    actionLabel: 'Truy cập Facebook GuHomes',
    highlights: [
      'Nhật ký thực địa & video bàn giao không gian hoàn thiện sắc nét',
      'Tư vấn phương án mặt bằng & dự toán minh bạch 1-1 qua Messenger',
      'Quy trình khép kín: Thiết kế — Sản xuất xưởng mộc — Thi công lắp đặt',
      'Chia sẻ kinh nghiệm nhận bàn giao nhà thô và kiểm định vật tư',
    ],
    qrType: 'facebook',
  },
  {
    id: 'zalo',
    label: 'Zalo',
    name: 'Zalo KTS Trưởng GuHomes',
    handle: '0368 757 916 (Hotline KTS)',
    href: 'https://zalo.me/0368757916',
    badge: 'Tư vấn trực tiếp 1-1',
    summary:
      'Kênh kết nối trực tiếp và nhanh nhất cùng KTS Trưởng. Phân tích hiện trạng, tư vấn công năng và lập khung ngân sách sơ bộ trong ngày.',
    description:
      'Đường dây nối thẳng tới bàn làm việc của Kiến trúc sư trưởng GuHomes. Không cần thủ tục rườm rà, bạn chỉ cần gửi ảnh hiện trạng, bản vẽ mặt bằng căn hộ/nhà phố hoặc những trăn trở về nếp sống gia đình — chúng tôi sẽ phản hồi với góc nhìn chuyên môn đa chiều, giải pháp vi khí hậu và dự toán thực tế trong vòng 24 giờ hoàn toàn miễn phí.',
    actionLabel: 'Nhắn tin Zalo với KTS Trưởng',
    highlights: [
      'Tiếp nhận bản vẽ mặt bằng & hình ảnh hiện trạng 24/7',
      'Tư vấn giải pháp vi khí hậu (hướng nắng, gió đối lưu) & ngân sách sơ bộ trong 24 giờ',
      'Hẹn lịch KTS đến khảo sát trực tiếp tại công trình miễn phí',
    ],
    qrType: 'zalo',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    name: 'GuHomes Living & Architecture',
    handle: '@guhomes.vn',
    href: 'https://www.youtube.com/@guconcept',
    badge: 'Video thực tế & House Tour',
    summary:
      'Những thước phim chân thực sau ngày tháo giàn giáo, khám phá chiều sâu không gian và tay nghề chế tác nội thất.',
    description:
      'Kênh tư liệu hình ảnh chuyển động ghi lại đời sống thực tế của từng công trình sau khi bàn giao: cách ánh nắng đổ bóng qua lam gỗ, tiếng bước chân êm ái trên sàn sồi tự nhiên, và độ bền bỉ của vật liệu mộc qua nhiều mùa mưa nắng Sài Gòn. Nơi bạn chiêm ngưỡng vẻ đẹp được tạo tác từ đôi bàn tay và sự tử tế của người thợ GuHomes.',
    actionLabel: 'Xem kênh YouTube GuHomes',
    highlights: [
      'House tour chi tiết các căn hộ, nhà phố và không gian mang đậm bản sắc riêng',
      'Cận cảnh quy trình gia công đồ gỗ thủ công và lắp ráp tại xưởng',
      'Kinh nghiệm thực chiến: xử lý ẩm mốc, tối ưu lưu thông gió và ánh sáng tự nhiên',
    ],
    qrType: 'general',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    name: 'GuHomes Design Studio',
    handle: '@guhomes.vn',
    href: 'https://www.instagram.com/guconcept.vn',
    badge: 'Lookbook & Bảng vật liệu',
    summary:
      'Lookbook thị giác tôn vinh vẻ đẹp vật liệu mộc: đá travertine thở, gỗ sồi lau dầu, vữa vôi phủ tay và sắc màu tĩnh lặng.',
    description:
      'Không gian thị giác dành cho những tâm hồn đồng điệu với phong cách sống tinh tế và an yên. Mỗi khung hình là một nốt lặng nghệ thuật: chiều sâu thớ gỗ, đường chỉ ron đá chuẩn xác, ánh hoàng hôn buông lơi trên mặt bàn ăn hay moodboard vật liệu độc bản được tuyển chọn riêng cho từng gia chủ.',
    actionLabel: 'Khám phá Instagram GuHomes',
    highlights: [
      'Cảm hứng thẩm mỹ tinh tế, tối giản nhưng đậm đà hơi ấm gia đình',
      'Bộ sưu tập mẫu vật liệu (Moodboard) độc bản được tạo tác riêng cho từng dự án',
      'Góc nhìn cận cảnh về vẻ đẹp phong sương của vật liệu tự nhiên qua thời gian',
    ],
    qrType: 'general',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    name: 'GuHomes Studio',
    handle: '@guhomes.vn',
    href: 'https://www.tiktok.com/@guconcept',
    badge: 'Mẹo không gian & Hậu trường xưởng',
    summary:
      'Video ngắn giàu trải nghiệm: mẹo nhận bàn giao nhà thô, kỹ thuật thi công giấu kín và hậu trường xưởng mộc.',
    description:
      'Góc nhìn hậu trường không giấu giếm từ xưởng gia công mộc Thạnh Xuân (Quận 12) và thực địa công trình: vạch trần các lỗi kỹ thuật dễ bị che đậy sau trần thạch cao, bí quyết phân biệt các dòng gỗ - đá, và những giải pháp tối ưu từng centimet công năng cho không gian sống đô thị.',
    actionLabel: 'Xem TikTok GuHomes',
    highlights: [
      'Cẩm nang thực tế kiểm tra nhà thô trước khi nhận bàn giao từ chủ đầu tư',
      'Hậu trường thợ mộc chế tác đồ gỗ thủ công chuẩn xác từng đường cắt',
      'Mẹo sắp xếp công năng thông minh, tăng diện tích lưu trữ cho nhà phố & căn hộ',
    ],
    qrType: 'general',
  },
  {
    id: 'behance',
    label: 'Behance',
    name: 'GuHomes Portfolio & Architecture',
    handle: 'behance.net/guhomes',
    href: 'https://www.behance.net/guhomes',
    badge: 'Hồ sơ thiết kế quốc tế',
    summary:
      'Hồ sơ đồ án kiến trúc và thiết kế nội thất hoàn chỉnh: bản vẽ kỹ thuật chi tiết, concept 3D và câu chuyện tạo tác không gian.',
    description:
      'Trang trưng bày các đồ án tiêu biểu của GuHomes dành cho giới chuyên môn kiến trúc và các gia chủ yêu cầu tiêu chuẩn thẩm mỹ cao. Nơi thể hiện mạch lạc sự phát triển ý niệm từ những nét phác thảo tay đầu tiên đến hồ sơ thi công chi tiết và không gian thực tế sau hoàn thiện.',
    actionLabel: 'Xem hồ sơ Behance',
    highlights: [
      'Bộ sưu tập đồ án kiến trúc & nội thất hoàn chỉnh với độ phân giải cao',
      'Bản vẽ kỹ thuật chi tiết cấu tạo mộc, mặt bằng công năng và bố trí ánh sáng',
      'Các dự án biệt thự, penthouse và không gian thương mại độc bản',
    ],
    qrType: 'general',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    name: 'GuHomes Visual Moodboards',
    handle: 'pinterest.com/guhomes',
    href: 'https://www.pinterest.com/guhomes',
    badge: 'Cảm hứng thị giác',
    summary:
      'Bộ sưu tập bảng tâm trạng (Moodboard), phối màu và chi tiết vật liệu mộc dành cho tổ ấm hiện đại.',
    description:
      'Kho tàng cảm hứng thị giác được KTS GuHomes tuyển lựa kỹ càng: từ sự tương phản giữa đá travertine và gỗ óc chó, cách xếp lớp ánh sáng ấm 2700K, đến các chi tiết tay nắm đồng thau và rèm lanh mộc mạc. Nơi gia chủ dễ dàng tìm thấy "Gu" sống của chính mình.',
    actionLabel: 'Xem bảng cảm hứng Pinterest',
    highlights: [
      'Hàng trăm bảng Moodboard vật liệu & cách phối màu theo từng phong cách',
      'Gợi ý cách bố trí góc làm việc, phòng ngủ yên tĩnh và bếp mở ấm cúng',
      'Cập nhật xu hướng kiến trúc vi khí hậu và vật liệu bền vững mới nhất',
    ],
    qrType: 'general',
  },
]

interface SocialModalState {
  isOpen: boolean
  activeId: string
  openModal: (channelIdOrLabel?: string) => void
  closeModal: () => void
  setActiveId: (id: string) => void
}

const FIRST_CHANNEL = SOCIAL_CHANNELS[0]!

function resolveChannelId(hint?: string): string {
  if (!hint) return FIRST_CHANNEL.id
  const lower = hint.trim().toLowerCase()
  const matched = SOCIAL_CHANNELS.find(
    (c) => c.id.toLowerCase() === lower || c.label.toLowerCase() === lower || c.name.toLowerCase().includes(lower),
  )
  return matched ? matched.id : FIRST_CHANNEL.id
}

export const useSocialModalStore = create<SocialModalState>((set) => ({
  isOpen: false,
  activeId: FIRST_CHANNEL.id,
  openModal: (hint) =>
    set({
      isOpen: true,
      activeId: resolveChannelId(hint),
    }),
  closeModal: () => set({ isOpen: false }),
  setActiveId: (id) => set({ activeId: id }),
}))
