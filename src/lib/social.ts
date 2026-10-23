'use client'

import { create } from 'zustand'

export type SocialQrType =
  | 'facebook'
  | 'tiktok'
  | 'zalo'
  | 'youtube'
  | 'instagram'
  | 'behance'
  | 'pinterest'

export interface SocialChannel {
  readonly id: string
  readonly label: string
  readonly name: string
  readonly handle: string
  readonly href: string
  readonly badge: string
  readonly schedule: string
  readonly responseTime: string
  readonly proofMetric: string
  readonly summary: string
  readonly description: string
  readonly actionLabel: string
  readonly highlights: readonly string[]
  readonly qrType: SocialQrType
}

export interface SocialProjectShowcaseItem {
  readonly id: string
  readonly code: string
  readonly title: string
  readonly subtitle: string
  readonly slug: string
  readonly location: string
  readonly area: string
  readonly style: string
  readonly materials: string
  readonly keyMetric: string
  readonly scheduleSlot: string
  readonly facebookBrief: string
  readonly tiktokBrief: string
}

export interface SocialContentRoadmapItem {
  readonly phase: string
  readonly title: string
  readonly cadence: string
  readonly deliverables: string
  readonly approvalOwner: string
}

export const SOCIAL_CHANNELS: readonly SocialChannel[] = [
  {
    id: 'facebook',
    label: 'Facebook',
    name: 'GuHomes — Thiết Kế, Thi Công & Sản Xuất Nội Thất',
    handle: 'GuHomes (TP. Hồ Chí Minh)',
    href: 'https://www.facebook.com/profile.php?id=61594054897878',
    badge: 'Fanpage Chính Thức',
    schedule: 'Thứ 3 · Thứ 5 · Chủ Nhật (20:00)',
    responseTime: 'Phản hồi Messenger ≤ 15 phút',
    proofMetric: '12 Công trình độc bản/năm · Xưởng mộc 1.200m²',
    summary:
      'Kênh nhật ký công trình thực tế, hồ sơ Case Study trước – sau bàn giao và tư vấn mặt bằng, dự toán 1-1 trực tiếp cùng KTS Trưởng.',
    description:
      'Trang Facebook chính thức của GuHomes là cuốn biên niên sử sống động từ thực địa công trường đến xưởng mộc gia công 1.200m² tại Thạnh Xuân, Quận 12. Tại đây, chúng tôi công bố trọn vẹn các bộ ảnh hoàn thiện thực tế, bóc tách giải pháp vi khí hậu chống nắng hướng Tây, phân tích chi tiết cấu tạo mộc tỷ lệ 1:5 và trực tiếp giải đáp bài toán mặt bằng, ngân sách 1-1 qua Messenger.',
    actionLabel: 'Truy cập Facebook GuHomes',
    highlights: [
      'Thứ Ba (20:00): Hồ sơ hoàn thiện thực tế (Case Study & Bóc tách mặt bằng trước – sau)',
      'Thứ Năm (20:00): Chuyên đề Vi khí hậu Sài Gòn & Vật liệu thật (Gỗ tự nhiên sấy EMC 10-12%, đá Travertine, vữa vôi)',
      'Chủ Nhật (20:00): Nhật ký Xưởng mộc 1.200m² Thạnh Xuân & Chuyện nghề KTS trực công trường',
      'Tư vấn phương án mặt bằng & khung dự toán minh bạch 1-1 cùng KTS Trưởng qua Messenger',
    ],
    qrType: 'facebook',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    name: 'GuHomes Studio — Thực Chiến Công Trường & Xưởng Mộc',
    handle: '@guconcept',
    href: 'https://www.tiktok.com/@guconcept',
    badge: 'Reels & Hậu Trường 60s',
    schedule: 'Thứ 4 · Thứ 6 · Thứ 7 (19:30)',
    responseTime: 'Giải đáp bình luận & tin nhắn trong ngày',
    proofMetric: 'Series 60s Bóc tách kỹ thuật & ASMR Xưởng mộc',
    summary:
      'Kênh video ngắn 60–90s ghi hình trực tiếp tại xưởng mộc Quận 12 và công trường: kiểm định nhà thô, soi mạch ghép laser ≤ 1mm và giải pháp chống nắng – ẩm.',
    description:
      'Không dàn dựng hào nhoáng, kênh TikTok của GuHomes đưa bạn bước thẳng vào tiếng bào gỗ tần bì tại xưởng Thạnh Xuân (Quận 12) và những buổi nghiệm thu ánh sáng 2700K lúc 18h chiều tại công trình. Mỗi video 60 giây là một bài học thực chiến: cách kiểm tra độ ẩm cốt gỗ bằng máy đo, cách giấu hệ cửa sát trần không khuôn và bí quyết xử lý căn hộ hướng Tây mặt sông.',
    actionLabel: 'Xem kênh TikTok GuHomes',
    highlights: [
      'Thứ Tư (19:30): Thực chiến công trường — Soi cốt nền laser, khe co ngót 2mm & nghiệm thu MEP',
      'Thứ Sáu (19:30): Biến hình không gian (Before/After) & Walk-through ánh sáng chiều Sài Gòn',
      'Thứ Bảy (19:30): ASMR Xưởng mộc 1.200m² — Nghệ nhân ghép mộng Kumiko, lau dầu Osmo 0% VOC',
      'Cẩm nang thực tế kiểm tra nhà thô trước khi nhận bàn giao từ chủ đầu tư',
    ],
    qrType: 'tiktok',
  },
  {
    id: 'zalo',
    label: 'Zalo',
    name: 'Zalo KTS Trưởng GuHomes',
    handle: '0368 757 916 (Hotline KTS)',
    href: 'https://zalo.me/0368757916',
    badge: 'Tư vấn trực tiếp 1-1',
    schedule: 'Trực chuyên môn Thứ 2 – Thứ 7 (08:30 – 21:00)',
    responseTime: 'Phản hồi chuyên môn trong 30 phút',
    proofMetric: '100% Hồ sơ do KTS Trưởng trực tiếp đọc & phản hồi',
    summary:
      'Kênh kết nối trực tiếp và nhanh nhất cùng KTS Trưởng. Phân tích mặt bằng hiện trạng, tư vấn hướng nắng – gió và lập khung ngân sách sơ bộ trong 24 giờ.',
    description:
      'Đường dây nối thẳng tới bàn làm việc của Kiến trúc sư trưởng GuHomes. Không qua nhân viên sale trung gian, bạn chỉ cần gửi ảnh hiện trạng, bản vẽ mặt bằng căn hộ/nhà phố hoặc những trăn trở về nếp sống gia đình — chúng tôi sẽ phản hồi với góc nhìn chuyên môn đa chiều, giải pháp vi khí hậu và dự toán thực tế trong vòng 24 giờ hoàn toàn miễn phí.',
    actionLabel: 'Nhắn tin Zalo với KTS Trưởng',
    highlights: [
      'Tiếp nhận bản vẽ mặt bằng & hình ảnh hiện trạng trực tiếp 1-1',
      'Tư vấn giải pháp vi khí hậu (hướng nắng, gió đối lưu) & khung ngân sách tách hạng mục trong 24 giờ',
      'Đặt lịch KTS Trưởng khảo sát thực địa tại công trình và mời thăm xưởng mộc Quận 12',
    ],
    qrType: 'zalo',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    name: 'GuHomes Living & Architecture',
    handle: '@guconcept',
    href: 'https://www.youtube.com/@guconcept',
    badge: 'Phim Tư Liệu & House Tour',
    schedule: '2 tuần / số phát sóng chuyên sâu (4K)',
    responseTime: 'Tư vấn chuyên sâu qua phần bình luận & mô tả',
    proofMetric: 'Phim tài liệu kiến trúc & đối thoại cùng gia chủ',
    summary:
      'Những thước phim chân thực sau ngày tháo giàn giáo, khám phá chiều sâu không gian sống và tay nghề chế tác nội thất may đo.',
    description:
      'Kênh tư liệu hình ảnh chuyển động ghi lại đời sống thực tế của từng công trình sau khi bàn giao: cách ánh nắng đổ bóng qua lam gỗ, tiếng bước chân êm ái trên sàn sồi tự nhiên, và độ bền bỉ của vật liệu mộc qua nhiều mùa mưa nắng Sài Gòn. Nơi bạn chiêm ngưỡng vẻ đẹp được tạo tác từ đôi bàn tay và sự tử tế của người thợ GuHomes.',
    actionLabel: 'Xem kênh YouTube GuHomes',
    highlights: [
      'House Tour chuyên sâu các căn hộ Penthouse, Duplex và Nhà phố nhiệt đới sau 6–12 tháng sử dụng',
      'Cận cảnh quy trình gia công đồ gỗ thủ công và lắp dựng thử (Dry-fit) tại xưởng Thạnh Xuân',
      'Đối thoại thẳng thắn về bài toán ngân sách, tiến độ và kiểm soát chất lượng thực tế',
    ],
    qrType: 'youtube',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    name: 'GuHomes Design Studio',
    handle: '@guconcept.vn',
    href: 'https://www.instagram.com/guconcept.vn',
    badge: 'Lookbook & Bảng Vật Liệu',
    schedule: 'Thứ 2 · Thứ 5 · Thứ 7 hàng tuần',
    responseTime: 'Phản hồi Direct Message trong ngày',
    proofMetric: 'Lưu trữ Moodboard vật liệu mộc & chi tiết tỷ lệ 1:1',
    summary:
      'Lookbook thị giác tôn vinh vẻ đẹp vật liệu mộc: đá travertine nguyên lỗ thở, gỗ sồi lau dầu, vữa vôi phủ tay và sắc màu tĩnh lặng.',
    description:
      'Không gian thị giác dành cho những tâm hồn đồng điệu với phong cách sống Quiet Luxury tinh tế và an yên. Mỗi khung hình là một nốt lặng nghệ thuật: chiều sâu thớ gỗ óc chó Bắc Mỹ, đường chỉ ron đá 2mm chuẩn xác, ánh hoàng hôn buông lơi trên mặt bàn ăn hay moodboard vật liệu độc bản được tuyển chọn riêng cho từng gia chủ.',
    actionLabel: 'Khám phá Instagram GuHomes',
    highlights: [
      'Cảm hứng thẩm mỹ Quiet Luxury tinh tế, tối giản nhưng đậm đà hơi ấm gia đình Việt',
      'Bộ sưu tập mẫu vật liệu (Material Board) độc bản được tạo tác riêng cho từng dự án',
      'Góc nhìn cận cảnh (Macro) về vẻ đẹp lên nước tự nhiên (Patina) của gỗ, đá, da thuộc và đồng thau',
    ],
    qrType: 'instagram',
  },
  {
    id: 'behance',
    label: 'Behance',
    name: 'GuHomes Portfolio & Architecture',
    handle: 'behance.net/guhomes',
    href: 'https://www.behance.net/guhomes',
    badge: 'Hồ Sơ Đồ Án Quốc Tế',
    schedule: 'Cập nhật theo mỗi kỳ nghiệm thu dự án trọng điểm',
    responseTime: 'Kết nối chuyên môn & đối tác kiến trúc',
    proofMetric: 'Hồ sơ kỹ thuật 1:5 & mặt bằng công năng độ phân giải cao',
    summary:
      'Hồ sơ đồ án kiến trúc và thiết kế nội thất hoàn chỉnh: bản vẽ kỹ thuật chi tiết, concept không gian và câu chuyện tạo tác.',
    description:
      'Trang trưng bày các đồ án tiêu biểu của GuHomes dành cho giới chuyên môn kiến trúc và các gia chủ yêu cầu tiêu chuẩn thẩm mỹ khắt khe. Nơi thể hiện mạch lạc sự phát triển ý niệm từ những nét phác thảo tay đầu tiên đến hồ sơ thi công chi tiết (Shop Drawing) và không gian thực tế sau hoàn thiện.',
    actionLabel: 'Xem hồ sơ Behance',
    highlights: [
      'Bộ sưu tập đồ án kiến trúc & nội thất hoàn chỉnh với độ phân giải cao',
      'Bản vẽ kỹ thuật chi tiết cấu tạo mộc, mặt bằng công năng và kịch bản chiếu sáng 2700K',
      'Các dự án biệt thự, penthouse và nhà phố nhiệt đới tiêu biểu tại TP. Hồ Chí Minh',
    ],
    qrType: 'behance',
  },
  {
    id: 'pinterest',
    label: 'Pinterest',
    name: 'GuHomes Visual Moodboards',
    handle: 'pinterest.com/guhomes',
    href: 'https://www.pinterest.com/guhomes',
    badge: 'Thư Viện Cảm Hứng',
    schedule: 'Cập nhật hàng tuần theo bộ sưu tập phong cách',
    responseTime: 'Lưu bảng ghim mẫu theo từng phòng chức năng',
    proofMetric: 'Hàng trăm bảng phối vật liệu & chi tiết nội thất may đo',
    summary:
      'Bộ sưu tập bảng tâm trạng (Moodboard), phối màu và chi tiết vật liệu mộc dành cho tổ ấm hiện đại tại khí hậu Sài Gòn.',
    description:
      'Kho tàng cảm hứng thị giác được KTS GuHomes tuyển lựa và phân loại kỹ càng: từ sự tương phản giữa đá travertine và gỗ óc chó, cách xếp lớp ánh sáng ấm 2700K, đến các chi tiết tay nắm đồng thau và rèm lanh mộc mạc. Nơi gia chủ dễ dàng lưu lại và định hình "Gu" sống của chính mình trước buổi gặp đầu tiên.',
    actionLabel: 'Xem bảng cảm hứng Pinterest',
    highlights: [
      'Phân loại trực quan theo phong cách: Quiet Luxury, Hiện đại Nhiệt đới, Wabi-Sabi, Japandi, Indochine',
      'Gợi ý chi tiết cấu tạo: đảo bếp đá tự nhiên, hệ tủ âm tường, góc đọc sách và phòng tắm thông gió',
      'Tài liệu tham khảo trực quan giúp gia chủ dễ dàng trao đổi ý tưởng cùng KTS GuHomes',
    ],
    qrType: 'pinterest',
  },
]

export const SOCIAL_SHOWCASE_PROJECTS: readonly SocialProjectShowcaseItem[] = [
  {
    id: 'ben-kia-song',
    code: 'PRJ-01',
    title: 'Bên Kia Sông — Penthouse The Opera Residence',
    subtitle: 'Đối thoại giữa tầm nhìn panorama sông Sài Gòn và sự tĩnh tại nguyên bản',
    slug: '/projects/ben-kia-song',
    location: 'Thủ Thiêm, TP. Thủ Đức',
    area: '134 m²',
    style: 'Luxury Đương Đại',
    materials: 'Gỗ óc chó FAS, đá Travertine nguyên lỗ thở, vôi khoáng Calce Ý, kính Low-E',
    keyMetric: 'Giảm 3.5°C bức xạ nắng Tây mặt sông',
    scheduleSlot: 'Tuần 1 & 2 · T3/T5 (FB) & T4/T7 (TikTok)',
    facebookBrief:
      '[FB Case Study — Album 12 ảnh thực tế & Bản vẽ mặt bằng] Phân tích bài toán căn hộ góc hướng Tây Nam nhìn thẳng ra sông Sài Gòn chịu bức xạ nhiệt lớn từ 14h–17h30. GuHomes giải quyết bằng hệ rèm tổ ong hai lớp âm trần kết hợp vữa vôi khoáng Calce Ý hấp thụ bức xạ và mặt bàn đá Travertine nguyên lỗ thở không phủ bóng nhựa, giữ nhiệt độ bề mặt luôn mát hơn 3.5°C.',
    tiktokBrief:
      '[TikTok 60s — Hook 3s đầu: "Nhà hướng Tây nhìn ra sông Sài Gòn: Đẹp lúc hoàng hôn nhưng 3 giờ chiều nóng như lò lửa — Xử lý sao?"] Cận cảnh đo nhiệt kế hồng ngoại trên vách kính Low-E và bề mặt đá Travertine lúc 15h30 chiều; lướt dọc đảo bếp gỗ óc chó Bắc Mỹ ghép vân liền mạch tại xưởng Thạnh Xuân.',
  },
  {
    id: 'tam-rem-be-tong',
    code: 'PRJ-02',
    title: 'Tấm Rèm Bê Tông — Nhà Phố 4 Tầng Hướng Tây',
    subtitle: 'Kiến trúc hai lớp vỏ thở cùng nắng gió nhiệt đới Gò Vấp',
    slug: '/projects/tam-rem-be-tong',
    location: 'Gò Vấp, TP.HCM',
    area: '168 m² (4 tầng)',
    style: 'Hiện Đại Nhiệt Đới',
    materials: 'Gạch bông gió đất nung, hệ lam gỗ ngoài trời, bê tông xoa nhám, cây xanh bản địa',
    keyMetric: 'Lớp vỏ đệm 60cm cắt nắng gắt 16:00',
    scheduleSlot: 'Tuần 2 & 3 · T5/CN (FB) & T6 (TikTok)',
    facebookBrief:
      '[FB Chuyên Đề Vi Khí Hậu — 10 ảnh mặt cắt & Thực tế] Nhà phố một mặt tiền hướng chính Tây trong hẻm Gò Vấp. Thay vì đóng kín mặt tiền bằng kính và rèm dày, KTS GuHomes lùi ranh kính vào 60cm để tạo khoảng đệm khí động học với lớp lam bê tông xoa nhám và gạch bông gió đất nung, vừa chắn 80% tia bức xạ trực tiếp vừa tạo luồng gió đối lưu xuyên suốt giếng trời.',
    tiktokBrief:
      '[TikTok 60s — Hook 3s đầu: "Đừng bịt kín nhà phố hướng Tây bằng kính hộp! Hãy xem lớp rèm bê tông biết thở này lúc 4 giờ chiều."] Quay timelapse bóng nắng di chuyển qua hệ gạch bông gió từ 14h đến 17h; thử nghiệm thả khói nhẹ kiểm chứng luồng gió tươi hút từ mặt tiền lên khe thoát nhiệt đỉnh giếng trời.',
  },
  {
    id: 'buc-tuong-soi',
    code: 'PRJ-03',
    title: 'Bức Tường Sồi & Đất Thở — Căn Hộ Tối Giản & Wabi-Sabi',
    subtitle: 'Nghệ thuật giấu toàn bộ hệ tủ lưu trữ sau một mặt phẳng gỗ sồi nguyên bản',
    slug: '/projects/buc-tuong-soi',
    location: 'TP. Thủ Đức, TP.HCM',
    area: '96 m²',
    style: 'Minimalist & Wabi-Sabi Bản Địa',
    materials: 'Ván gỗ sồi tự nhiên lau dầu, vữa vôi xoa tay thủ công, cửa giấu khuôn (Hidden Door)',
    keyMetric: 'Dung sai mạch ghép laser ≤ 1.0mm',
    scheduleSlot: 'Tuần 3 & 4 · T3 (FB) & T4/T7 (TikTok)',
    facebookBrief:
      '[FB Hồ Sơ Chi Tiết Mộc 1:5 — Album 10 ảnh] Để một căn hộ 96m² của gia đình trẻ có con nhỏ luôn giữ được sự tĩnh lặng tuyệt đối mà không thiếu chỗ chứa đồ, GuHomes thiết kế "Bức tường Sồi" dài 8,4m chạy dọc trục phòng khách – bếp. Ẩn sau hệ ván sồi ghép đồng vân là cửa phòng ngủ phụ giấu khuôn (Hidden Door), tủ giày âm, kho chứa máy hút bụi và tủ kỹ thuật điện.',
    tiktokBrief:
      '[TikTok 60s — Hook 3s đầu: "Nhìn tưởng chỉ là một bức tường gỗ phẳng lì, nhưng bên trong giấu tới 4 căn phòng và 18m³ tủ đồ!"] KTS trực tiếp mở từng khoang tủ âm và cánh cửa giấu khuôn không lộ bản lề; zoom cận cảnh tia laser xanh kiểm tra mạch ghép gỗ sồi thẳng tắp với dung sai dưới 1mm.',
  },
  {
    id: 'nang-mat-ong',
    code: 'PRJ-04',
    title: 'Nắng Mật Ong & Ngưỡng Cửa Sồi — Lumière Riverside',
    subtitle: 'Sắc ấm mật ong làm dịu ánh sáng phản xạ từ mặt nước sông Sài Gòn',
    slug: '/projects/nang-mat-ong',
    location: 'An Phú, TP. Thủ Đức',
    area: '96 m²',
    style: 'Quiet Luxury Đương Đại',
    materials: 'Da bò thật màu mật ong, đá vân mây ánh vàng, sàn gỗ sồi xương cá, đồng thau mộc',
    keyMetric: 'Khử ánh sáng trắng gắt phản xạ từ mặt sông',
    scheduleSlot: 'Tuần 4 & 5 · T5/CN (FB) & T6 (TikTok)',
    facebookBrief:
      '[FB Lookbook & Moodboard Vật Liệu — 10 ảnh] Căn hộ tầng cao tại An Phú đón lượng ánh sáng phản xạ rất gắt từ mặt sông vào buổi trưa. Thay vì dùng tông trắng – xám dễ gây mỏi mắt, GuHomes khóa bảng vật liệu ở 4 sắc độ ấm: sàn gỗ sồi lát xương cá xử lý xà phòng, sofa da bò thảo mộc màu mật ong, vòm ngưỡng cửa bo cong thủ công và phụ kiện đồng thau mộc.',
    tiktokBrief:
      '[TikTok 60s — Hook 3s đầu: "Tại sao căn hộ tầng cao nhiều kính lại dễ gây nhức mắt nếu chọn sai tông màu nội thất?"] So sánh thực tế mẫu đá bóng gương bị chói lóa dưới nắng trưa và mẫu gỗ sồi lau dầu + đá mờ honed dịu mắt tại chính phòng khách căn hộ Lumière Riverside.',
  },
  {
    id: 'dem-nhung-den',
    code: 'PRJ-05',
    title: 'Đêm Nhung Đen & Trầm Óc Chó — Nhà Phố 4 Tầng',
    subtitle: 'Bản giao hưởng của gỗ óc chó Bắc Mỹ và 4 lớp kịch bản ánh sáng chiều tối',
    slug: '/projects/dem-nhung-den',
    location: 'Phú Nhuận & Quận 7, TP.HCM',
    area: '260 m²',
    style: 'Luxury Đương Đại · Gỗ Óc Chó',
    materials: 'Gỗ óc chó Bắc Mỹ sấy EMC 10-12%, đá Onyx chiếu sáng ngược, nhung xám viền đồng, kính khói',
    keyMetric: '4 lớp kịch bản ánh sáng 2700K (CRI ≥ 97)',
    scheduleSlot: 'Tuần 5 & 6 · T3/CN (FB) & T4/T7 (TikTok)',
    facebookBrief:
      '[FB Chuyên Đề Ánh Sáng & Gỗ Óc Chó — 12 ảnh] Gia chủ là doanh nhân chỉ thực sự trở về nhà sau 19h tối và mong muốn một không gian tĩnh tại như boutique lounge để tái tạo năng lượng. GuHomes loại bỏ hoàn toàn đèn huỳnh quang trắng giữa trần, thay bằng 4 lớp ánh sáng ấm 2700K có chỉ số hoàn màu CRI ≥ 97 chiếu xước qua thớ gỗ óc chó Bắc Mỹ và đảo đá tự nhiên.',
    tiktokBrief:
      '[TikTok 60s — Hook 3s đầu: "Tắt hết đèn trần đi! Đây là cách một ngôi nhà gỗ óc chó 260m² lột xác vào lúc 7 giờ tối."] Trình diễn trực tiếp quá trình bật lần lượt 4 lớp ánh sáng (Ambient · Task · Accent · Grazing) làm nổi bật đường vân gỗ óc chó và hốc đá tự nhiên trong đêm.',
  },
  {
    id: 'hoi-tho-hinoki',
    code: 'PRJ-06',
    title: 'Hơi Thở Hinoki & Xưởng Mộc 1.200m² Thạnh Xuân',
    subtitle: 'Tinh thần thủ công mộng gỗ Nhật – Việt không đinh vít và dầu lau hữu cơ 0% VOC',
    slug: '/projects/hoi-tho-hinoki',
    location: 'Thủ Đức & Xưởng Thạnh Xuân, Quận 12',
    area: '240 m² · Xưởng 1.200 m²',
    style: 'Japandi & Thủ Công Mộng Gỗ',
    materials: 'Gỗ tần bì trắng ghép Kumiko không đinh sắt, giấy Washi, dầu hữu cơ Osmo 0% VOC',
    keyMetric: '18 nghệ nhân mộc · Lắp dựng Dry-fit tại xưởng',
    scheduleSlot: 'Chuyên đề cố định Thứ Bảy hàng tuần (FB & TikTok)',
    facebookBrief:
      '[FB Nhật Ký Xưởng Mộc Thạnh Xuân — Album 14 ảnh hậu trường & hoàn thiện] Hành trình từ những kiện gỗ nguyên liệu kiểm định độ ẩm 10–12% tại xưởng mộc 1.200m² (Thạnh Xuân, Quận 12) đến hệ vách trượt Shoji – Kumiko ghép mộng thủ công không dùng đinh sắt. Toàn bộ bề mặt gỗ được lau 3 lớp dầu thực vật Osmo (Đức) không chứa dung môi độc hại, giữ trọn mùi hương gỗ tự nhiên và an toàn tuyệt đối cho trẻ nhỏ.',
    tiktokBrief:
      '[TikTok 60s ASMR — Hook 3s đầu: "Tiếng sập khít của mối ghép mộng gỗ không một cây đinh sắt tại xưởng 1.200m² của GuHomes."] Thu âm ASMR chân thực tiếng bào tay, tiếng lắp mộng gỗ Kumiko, quá trình lau dầu Osmo làm nổi bừng vân gỗ và quy trình lắp dựng thử 100% (Dry-fit) tại xưởng trước khi xuất xưởng.',
  },
]

export const SOCIAL_CONTENT_ROADMAP: readonly SocialContentRoadmapItem[] = [
  {
    phase: 'Giai đoạn 01 (Tuần 1 – Tuần 2)',
    title: 'Định vị Vi Khí Hậu & Năng Lực Xưởng Mộc 1.200m²',
    cadence: 'FB: T3 · T5 · CN (20:00) | TikTok: T4 · T6 · T7 (19:30)',
    deliverables:
      'Lên sóng dự án "Bên Kia Sông" (Penthouse Thủ Thiêm) & "Tấm Rèm Bê Tông" (Nhà phố Gò Vấp) + Series hậu trường Xưởng mộc Thạnh Xuân Quận 12.',
    approvalOwner: 'KTS Trưởng kiểm duyệt kỹ thuật · Ban Giám đốc phê duyệt',
  },
  {
    phase: 'Giai đoạn 02 (Tuần 3 – Tuần 4)',
    title: 'Chuẩn Mực Chi Tiết 1:5 & Bảng Vật Liệu Quiet Luxury',
    cadence: 'FB: T3 · T5 · CN (20:00) | TikTok: T4 · T6 · T7 (19:30)',
    deliverables:
      'Lên sóng dự án "Bức Tường Sồi & Đất Thở" & "Nắng Mật Ong (Lumière Riverside)" + Video soi dung sai laser ≤ 1mm & kiểm định độ ẩm gỗ 10–12%.',
    approvalOwner: 'KTS Trưởng & Quản đốc Xưởng mộc Quận 12',
  },
  {
    phase: 'Giai đoạn 03 (Tuần 5 – Tuần 6)',
    title: 'Nghệ Thuật Ánh Sáng 2700K & Thủ Công Mộng Gỗ Độc Bản',
    cadence: 'FB: T3 · T5 · CN (20:00) | TikTok: T4 · T6 · T7 (19:30)',
    deliverables:
      'Lên sóng dự án "Đêm Nhung Đen & Trầm Óc Chó" & "Hơi Thở Hinoki" + Chuyên đề tư vấn mặt bằng & dự toán minh bạch trực tiếp qua Zalo/Messenger.',
    approvalOwner: 'Ban Giám đốc & Trưởng phòng Thiết kế GuHomes',
  },
]

export type SocialModalTab = 'channel' | 'projects'

interface SocialModalState {
  isOpen: boolean
  activeId: string
  activeTab: SocialModalTab
  openModal: (channelIdOrLabel?: string, tab?: SocialModalTab) => void
  closeModal: () => void
  setActiveId: (id: string) => void
  setActiveTab: (tab: SocialModalTab) => void
}

const FIRST_CHANNEL = SOCIAL_CHANNELS[0]!

function resolveChannelId(hint?: string): string {
  if (!hint) return FIRST_CHANNEL.id
  const lower = hint.trim().toLowerCase()
  const matched = SOCIAL_CHANNELS.find(
    (c) =>
      c.id.toLowerCase() === lower ||
      c.label.toLowerCase() === lower ||
      c.name.toLowerCase().includes(lower),
  )
  return matched ? matched.id : FIRST_CHANNEL.id
}

export const useSocialModalStore = create<SocialModalState>((set) => ({
  isOpen: false,
  activeId: FIRST_CHANNEL.id,
  activeTab: 'channel',
  openModal: (hint, tab = 'channel') =>
    set({
      isOpen: true,
      activeId: resolveChannelId(hint),
      activeTab: tab,
    }),
  closeModal: () => set({ isOpen: false }),
  setActiveId: (id) => set({ activeId: id }),
  setActiveTab: (tab) => set({ activeTab: tab }),
}))
