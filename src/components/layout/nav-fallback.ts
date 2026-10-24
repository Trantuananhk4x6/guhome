import type { NavItem } from '@/types/content'

export interface SubmenuLinkItem {
  id: string
  label: string
  href: string
  meta?: string
  badge?: string
}

export interface SubmenuColumn {
  heading: string
  items: SubmenuLinkItem[]
}

export interface HeaderSubmenuConfig {
  eyebrow: string
  title: string
  viewAllLabel: string
  viewAllHref: string
  columns: SubmenuColumn[]
  footerNote?: string
  footerActionLabel?: string
  footerActionHref?: string
}

/**
 * Rich architectural submenus for each primary destination in the Header & MobileMenu.
 * Every route and anchor here is verified against actual pages and section IDs.
 */
export const HEADER_SUBMENUS: Record<string, HeaderSubmenuConfig> = {
  '/projects': {
    eyebrow: 'Portfolio · 105+ Công trình thực tế',
    title: 'Tuyển tập dự án thiết kế & thi công may đo',
    viewAllLabel: 'Xem toàn bộ dự án',
    viewAllHref: '/projects',
    columns: [
      {
        heading: 'Theo loại hình không gian',
        items: [
          {
            id: 'proj-all',
            label: 'Tất cả công trình',
            href: '/projects',
            meta: 'Toàn bộ 105+ dự án đã bàn giao tại TP.HCM',
            badge: 'ALL',
          },
          {
            id: 'proj-can-ho',
            label: 'Căn hộ & Penthouse',
            href: '/projects?category=can-ho',
            meta: 'The Metropole, Empire City, Lumière, Ba Son',
            badge: '01',
          },
          {
            id: 'proj-nha-pho',
            label: 'Nhà phố (Townhouses)',
            href: '/projects?category=nha-pho',
            meta: 'Giải pháp giếng trời đối lưu & chắn nắng hướng Tây',
            badge: '02',
          },
          {
            id: 'proj-biet-thu',
            label: 'Biệt thự & Resort',
            href: '/projects?category=biet-thu-resort',
            meta: 'Biệt thự ven sông Thảo Điền, Phú Mỹ Hưng, nghỉ dưỡng',
            badge: '03',
          },
          {
            id: 'proj-thuong-mai',
            label: 'Không gian Thương mại',
            href: '/projects?category=thuong-mai',
            meta: 'Showroom, Flagship Store, Văn phòng & Lounge',
            badge: '04',
          },
          {
            id: 'proj-khong-gian',
            label: 'Không gian Chuyên biệt',
            href: '/projects?category=khong-gian',
            meta: 'Phòng trà đạo, Hầm rượu, Phòng nghe nhạc & Atelier',
            badge: '05',
          },
        ],
      },
      {
        heading: '06 Dự án Trọng điểm (Flagship)',
        items: [
          {
            id: 'proj-ben-kia-song',
            label: 'Bên Kia Sông — The Opera',
            href: '/projects/ben-kia-song',
            meta: 'Penthouse 134 m² · Thủ Thiêm · Luxury Đương đại',
            badge: 'FB/TT',
          },
          {
            id: 'proj-tam-rem-be-tong',
            label: 'Tấm Rèm Bê Tông',
            href: '/projects/tam-rem-be-tong',
            meta: 'Nhà phố 4 tầng 168 m² · Gò Vấp · Nhiệt đới',
            badge: 'FB/TT',
          },
          {
            id: 'proj-buc-tuong-soi',
            label: 'Bức Tường Sồi & Đất Thở',
            href: '/projects/buc-tuong-soi',
            meta: 'Căn hộ 96 m² · TP. Thủ Đức · Wabi-Sabi Bản địa',
            badge: 'FB/TT',
          },
          {
            id: 'proj-nang-mat-ong',
            label: 'Nắng Mật Ong — Lumière',
            href: '/projects/nang-mat-ong',
            meta: 'Căn hộ 96 m² · An Phú · Quiet Luxury',
            badge: 'FB/TT',
          },
          {
            id: 'proj-dem-nhung-den',
            label: 'Đêm Nhung Đen & Trầm Óc Chó',
            href: '/projects/dem-nhung-den',
            meta: 'Nhà phố 260 m² · Phú Nhuận · Gỗ Óc Chó Bắc Mỹ',
            badge: 'FB/TT',
          },
          {
            id: 'proj-hoi-tho-hinoki',
            label: 'Hơi Thở Hinoki & Xưởng Mộc',
            href: '/projects/hoi-tho-hinoki',
            meta: '240 m² · Mộng gỗ Kumiko & Xưởng 1.200 m²',
            badge: 'FB/TT',
          },
        ],
      },
    ],
    footerNote: 'Cần tìm công trình có mặt bằng tương tự nhà bạn?',
    footerActionLabel: 'Xem lịch lên sóng & Brief 06 dự án',
    footerActionHref: '/studio#kenh-truyen-thong',
  },

  '/phong-cach': {
    eyebrow: 'Ngôn ngữ thẩm mỹ · 10 lối thiết kế',
    title: 'Cùng một kỷ luật thi công, nhiều cách kể chuyện',
    viewAllLabel: 'Xem tất cả 10 phong cách',
    viewAllHref: '/phong-cach',
    columns: [
      {
        heading: 'Phong cách được chọn nhiều nhất',
        items: [
          {
            id: 'style-modern-luxury',
            label: 'Sang trọng đương đại · Modern Luxury',
            href: '/phong-cach/sang-trong-duong-dai',
            meta: 'Đá Travertine nguyên lỗ thở, gỗ óc chó & đồng thau',
            badge: '01',
          },
          {
            id: 'style-minimalism',
            label: 'Tối giản · Minimalism',
            href: '/phong-cach/toi-gian',
            meta: 'Phẳng lặng, giấu khuôn cửa, chuẩn xác từng milimet',
            badge: '02',
          },
          {
            id: 'style-wabi-sabi',
            label: 'Wabi-sabi · Thô mộc tĩnh tại',
            href: '/phong-cach/wabi-sabi',
            meta: 'Vữa vôi xoa tay, gỗ sồi lau dầu & vẻ đẹp thời gian',
            badge: '03',
          },
          {
            id: 'style-indochine',
            label: 'Indochine · Đông Dương đương đại',
            href: '/phong-cach/indochine',
            meta: 'Con tiện gỗ sẫm, gạch bông & thông gió nhiệt đới',
            badge: '04',
          },
          {
            id: 'style-japandi',
            label: 'Nhật Bản · Japandi',
            href: '/phong-cach/nhat-ban',
            meta: 'Gỗ tần bì sáng màu, mộng Kumiko & giấy Washi',
            badge: '05',
          },
        ],
      },
      {
        heading: 'Bản sắc riêng & Công cụ định hình Gu',
        items: [
          {
            id: 'style-modern-classic',
            label: 'Tân cổ điển · Modern Classic',
            href: '/phong-cach/tan-co-dien',
            meta: 'Tỉ lệ vàng, phào chỉ tinh giản & bố cục đối xứng',
            badge: '06',
          },
          {
            id: 'style-tropical',
            label: 'Nhiệt đới · Tropical Modern',
            href: '/phong-cach/nhiet-doi',
            meta: 'Hiên sâu, lam gỗ cản bức xạ & cây xanh bản địa',
            badge: '07',
          },
          {
            id: 'style-east-asian',
            label: 'Á Đông · East Asian',
            href: '/phong-cach/a-dong',
            meta: 'Trầm tĩnh, chiều sâu bóng đổ & không gian thưởng trà',
            badge: '08',
          },
          {
            id: 'style-quiz',
            label: 'Trắc nghiệm tìm đúng Phong cách',
            href: '/phong-cach#trac-nghiem-phong-cach',
            meta: 'Cá nhân hóa ngôn ngữ thiết kế theo thói quen sống',
            badge: 'QUIZ',
          },
          {
            id: 'style-moodboard',
            label: 'Bàn Phối Vật Liệu & Âm Học',
            href: '/phong-cach#ban-phoi-vat-lieu',
            meta: 'Trải nghiệm xúc giác đá, gỗ, vải lanh & tiêu âm',
            badge: 'LAB',
          },
        ],
      },
    ],
    footerNote: 'Chưa chắc phong cách nào hợp với mặt bằng hiện tại?',
    footerActionLabel: 'Làm bài trắc nghiệm Gu 2 phút',
    footerActionHref: '/phong-cach#trac-nghiem-phong-cach',
  },

  '/du-toan-chi-phi': {
    eyebrow: 'Minh bạch tài chính · Bóc tách thực tế',
    title: 'Công cụ dự toán & kiểm soát ngân sách',
    viewAllLabel: 'Mở trang dự toán',
    viewAllHref: '/du-toan-chi-phi',
    columns: [
      {
        heading: 'Công cụ & Bảng tính chuyên sâu',
        items: [
          {
            id: 'calc-budget',
            label: 'Bảng tính dự toán theo từng phòng',
            href: '/du-toan-chi-phi#bang-tinh-du-toan',
            meta: 'Tự động bóc tách theo m², loại hình & cấp độ vật liệu',
            badge: '01',
          },
          {
            id: 'calc-cabinetry',
            label: 'Xưởng mộc & Hệ tủ may đo',
            href: '/du-toan-chi-phi#xuong-moc-may-do',
            meta: 'Chi tiết cốt gỗ, phụ kiện Blum/Hafele & đơn giá xưởng',
            badge: '02',
          },
          {
            id: 'calc-materials',
            label: 'Phòng thí nghiệm vật liệu thật',
            href: '/du-toan-chi-phi#phong-vat-lieu',
            meta: 'Kiểm chứng độ bền ẩm, chống trầy & tuổi thọ vật tư',
            badge: '03',
          },
          {
            id: 'calc-matrix',
            label: 'Ma trận đối chiếu năng lực nhà thầu',
            href: '/du-toan-chi-phi#doi-chieu-nha-thau',
            meta: 'So sánh tiêu chuẩn GuHomes và thị trường đại trà',
            badge: '04',
          },
          {
            id: 'calc-cashflow',
            label: 'Lịch thanh toán & 06 mốc nghiệm thu',
            href: '/du-toan-chi-phi#lich-thanh-toan',
            meta: 'Kế hoạch dòng tiền minh bạch, cam kết 0% phát sinh ẩn',
            badge: '05',
          },
        ],
      },
    ],
  },

  '/khu-vuc': {
    eyebrow: 'Địa lý & Vi khí hậu TP.HCM',
    title: 'Giải pháp kiến trúc theo từng khúc sông Sài Gòn',
    viewAllLabel: 'Xem bản đồ 04 khu vực',
    viewAllHref: '/khu-vuc',
    columns: [
      {
        heading: '04 Tâm điểm bất động sản hạng sang',
        items: [
          {
            id: 'area-map',
            label: 'Bản đồ Không gian & Vi khí hậu Sài Gòn',
            href: '/khu-vuc',
            meta: 'Phân tích hướng nắng, độ ẩm & tốc độ gió từng khu',
            badge: 'MAP',
          },
          {
            id: 'area-thu-thiem',
            label: 'Bán đảo Thủ Thiêm · TP. Thủ Đức',
            href: '/khu-vuc/thu-thiem',
            meta: 'The Metropole, Empire City, The River · Chống bức xạ sông',
            badge: '01',
          },
          {
            id: 'area-thao-dien',
            label: 'Bán đảo Thảo Điền · TP. Thủ Đức',
            href: '/khu-vuc/thao-dien',
            meta: 'Holm, D’Edge, Q2 Thảo Điền · Kháng ẩm 85% mùa mưa',
            badge: '02',
          },
          {
            id: 'area-phu-my-hung',
            label: 'Khu đô thị Phú Mỹ Hưng · Quận 7',
            href: '/khu-vuc/phu-my-hung',
            meta: 'Chateau, Midtown The Peak · Đón gió Nam & giếng trời',
            badge: '03',
          },
          {
            id: 'area-ba-son',
            label: 'Ba Son — Trung tâm Quận 1',
            href: '/khu-vuc/ba-son',
            meta: 'Grand Marina, Golden River · Tiêu âm đô thị < 32dB',
            badge: '04',
          },
          {
            id: 'area-solar',
            label: 'Công cụ tính bức xạ nhiệt hướng Tây',
            href: '/khu-vuc#tinh-buc-xa-nhiet',
            meta: 'Đo nhiệt lượng mặt đứng & giải pháp lam gỗ/Low-E',
            badge: 'TOOL',
          },
        ],
      },
    ],
  },

  '/studio': {
    eyebrow: 'GuHomes Studio · Từ 2016 tại Sài Gòn',
    title: 'Triết lý, Tầm nhìn, Giá trị cốt lõi & Xưởng mộc',
    viewAllLabel: 'Khám phá toàn bộ Studio',
    viewAllHref: '/studio',
    columns: [
      {
        heading: 'Hồ sơ năng lực & Định vị thương hiệu',
        items: [
          {
            id: 'stu-cach-nghi',
            label: 'Cách nghĩ & Triết lý thiết kế',
            href: '/studio#cach-nghi',
            meta: 'Kiến trúc lùi lại một bước để nhường chỗ cho người ở',
            badge: '01',
          },
          {
            id: 'stu-tam-nhin',
            label: 'Tầm nhìn & Sứ mệnh',
            href: '/studio#tam-nhin-su-menh',
            meta: 'Biểu tượng Quiet Luxury & Kỷ luật công trường minh bạch',
            badge: '02',
          },
          {
            id: 'stu-gia-tri',
            label: '06 Giá trị cốt lõi (Your Peace, Our Craft)',
            href: '/studio#gia-tri-cot-loi',
            meta: 'Chữ Tín, Đúng Gu, Chuẩn milimet & Giới hạn 12 dự án/năm',
            badge: '03',
          },
          {
            id: 'stu-social',
            label: 'Kênh FB/TikTok & 06 Dự án lên sóng',
            href: '/studio#kenh-truyen-thong',
            meta: 'Lộ trình truyền thông, lịch đăng bài & Content Brief',
            badge: '04',
          },
          {
            id: 'stu-quy-trinh',
            label: 'Quy trình 04 bước làm việc',
            href: '/studio#quy-trinh',
            meta: 'Khảo sát 15:00 chiều, vẽ kỹ thuật, xưởng mộc & bảo hành',
            badge: '05',
          },
          {
            id: 'stu-vat-lieu',
            label: 'Nguyên tắc & Bảng vật liệu thật',
            href: '/studio#nguyen-tac-vat-lieu',
            meta: 'Xưởng mộc 1.200 m² Thạnh Xuân, Quận 12 & 18 nghệ nhân',
            badge: '06',
          },
        ],
      },
    ],
  },

  '/services': {
    eyebrow: 'Dịch vụ may đo trọn gói · 01 Đầu mối',
    title: 'Chúng tôi làm gì, và dừng lại ở đâu',
    viewAllLabel: 'Xem chi tiết dịch vụ',
    viewAllHref: '/services',
    columns: [
      {
        heading: '05 Hạng mục chuyên môn & Ranh giới nghề',
        items: [
          {
            id: 'srv-noi-that',
            label: 'Thiết kế nội thất',
            href: '/services#thiet-ke-noi-that',
            meta: 'Bản vẽ kỹ thuật tỉ lệ 1:20 và 1:5 cho chi tiết chạm tay',
            badge: '01',
          },
          {
            id: 'srv-kien-truc',
            label: 'Thiết kế kiến trúc',
            href: '/services#thiet-ke-kien-truc',
            meta: 'Mặt cắt thông gió, giếng trời & lớp vỏ che nắng Tây',
            badge: '02',
          },
          {
            id: 'srv-thi-cong',
            label: 'Thiết kế & Thi công trọn gói',
            href: '/services#thiet-ke-thi-cong',
            meta: 'Đồng bộ từ bản vẽ KTS đến xưởng mộc và công trường',
            badge: '03',
          },
          {
            id: 'srv-cai-tao',
            label: 'Cải tạo không gian có sẵn',
            href: '/services#cai-tao',
            meta: 'Thăm dò kết cấu, xử lý ẩm chân tường & mở luồng sáng',
            badge: '04',
          },
          {
            id: 'srv-do-roi',
            label: 'Đồ nội thất đặt riêng (Bespoke)',
            href: '/services#do-noi-that',
            meta: 'Chế tác theo số đo nhân trắc học của chính gia chủ',
            badge: '05',
          },
          {
            id: 'srv-tu-choi',
            label: '07 việc GuHomes từ chối nhận',
            href: '/services#nguyen-tac-tu-choi',
            meta: 'Những nguyên tắc nói thẳng ngay từ buổi gặp đầu tiên',
            badge: 'RULE',
          },
        ],
      },
    ],
  },

  '/journal': {
    eyebrow: 'Ghi chép xưởng & Công trường',
    title: 'Viết giữa hai lần ra công trường',
    viewAllLabel: 'Đọc tất cả bài viết',
    viewAllHref: '/journal',
    columns: [
      {
        heading: 'Chuyên đề kỹ thuật & Vật liệu tiêu biểu',
        items: [
          {
            id: 'jrn-all',
            label: 'Toàn bộ sổ tay & Bài viết chuyên sâu',
            href: '/journal',
            meta: 'Ghi chép thực chiến về gỗ, đá, ánh sáng & vi khí hậu',
            badge: 'ALL',
          },
          {
            id: 'jrn-oc-cho',
            label: 'Chọn gỗ óc chó cho khí hậu Sài Gòn',
            href: '/journal/chon-go-oc-cho-cho-khi-hau-sai-gon',
            meta: 'Độ ẩm cân bằng 12%, khe thở 4mm & dầu cứng Osmo',
            badge: '01',
          },
          {
            id: 'jrn-anh-sang',
            label: 'Ánh sáng nhân tạo theo 4 lớp',
            href: '/journal/anh-sang-nhan-tao-theo-lop',
            meta: 'Lý do phải chia mạch đèn riêng từ lúc tường chưa xây',
            badge: '02',
          },
          {
            id: 'jrn-wabi',
            label: 'Wabi-sabi trong căn hộ nhỏ',
            href: '/journal/wabi-sabi-trong-can-ho-nho',
            meta: 'Giữ khoảng thở thị giác và bề mặt vữa vôi tự nhiên',
            badge: '03',
          },
          {
            id: 'jrn-ban-giao',
            label: 'Từ bản vẽ đến ngày bàn giao',
            href: '/journal/tu-ban-ve-den-ban-giao',
            meta: 'Hành trình kiểm soát sai số dưới 1mm tại hiện trường',
            badge: '04',
          },
          {
            id: 'jrn-bep',
            label: 'Vật liệu bền vững cho gian bếp',
            href: '/journal/vat-lieu-ben-vung-cho-bep',
            meta: 'Chọn mặt đá, cốt tủ chống ẩm và chiều cao chuẩn người nấu',
            badge: '05',
          },
        ],
      },
    ],
  },
}

function defaultChildrenFor(href: string): NavItem[] | undefined {
  const submenu = HEADER_SUBMENUS[href]
  if (!submenu) return undefined
  const flat = submenu.columns.flatMap((col) => col.items)
  return flat.map((sub, idx) => ({
    id: sub.id,
    label: sub.label,
    href: sub.href,
    order: idx,
  }))
}

/**
 * Used when `getNavigation()` returns nothing (fresh database, seed not run).
 * The admin navigation editor is the source of truth once rows exist.
 */
export const FALLBACK_HEADER_NAV: NavItem[] = [
  { id: 'fallback-home', label: 'Trang chủ', href: '/', order: 0 },
  {
    id: 'fallback-projects',
    label: 'Dự án',
    href: '/projects',
    order: 1,
    children: defaultChildrenFor('/projects'),
  },
  {
    id: 'fallback-styles',
    label: 'Phong cách',
    href: '/phong-cach',
    order: 2,
    children: defaultChildrenFor('/phong-cach'),
  },
  {
    id: 'fallback-du-toan',
    label: 'Dự toán',
    href: '/du-toan-chi-phi',
    order: 3,
    children: defaultChildrenFor('/du-toan-chi-phi'),
  },
  {
    id: 'fallback-khu-vuc',
    label: 'Khu vực',
    href: '/khu-vuc',
    order: 4,
    children: defaultChildrenFor('/khu-vuc'),
  },
  {
    id: 'fallback-studio',
    label: 'Studio',
    href: '/studio',
    order: 5,
    children: defaultChildrenFor('/studio'),
  },
  {
    id: 'fallback-services',
    label: 'Dịch vụ',
    href: '/services',
    order: 6,
    children: defaultChildrenFor('/services'),
  },
  {
    id: 'fallback-journal',
    label: 'Bài viết',
    href: '/journal',
    order: 7,
    children: defaultChildrenFor('/journal'),
  },
  { id: 'fallback-contact', label: 'Liên hệ', href: '/contact', order: 8 },
]

export const FALLBACK_FOOTER_NAV: NavItem[] = [
  { id: 'fallback-f-home', label: 'Trang chủ', href: '/', order: 0 },
  { id: 'fallback-f-projects', label: 'Dự án', href: '/projects', order: 1 },
  { id: 'fallback-f-styles', label: 'Phong cách', href: '/phong-cach', order: 2 },
  { id: 'fallback-f-du-toan', label: 'Dự toán chi phí', href: '/du-toan-chi-phi', order: 3 },
  { id: 'fallback-f-khu-vuc', label: 'Khu vực TP.HCM', href: '/khu-vuc', order: 4 },
  { id: 'fallback-f-studio', label: 'Studio', href: '/studio', order: 5 },
  { id: 'fallback-f-services', label: 'Dịch vụ', href: '/services', order: 6 },
  { id: 'fallback-f-journal', label: 'Bài viết', href: '/journal', order: 7 },
  { id: 'fallback-f-contact', label: 'Liên hệ', href: '/contact', order: 8 },
]

export function withFallbackNav(items: NavItem[], fallback: NavItem[]): NavItem[] {
  return items.length > 0 ? items : fallback
}

/* --------------------------------- roles ---------------------------------- */

export interface NavRoles {
  home: NavItem | null
  lead: NavItem | null
  rest: NavItem[]
  contact: NavItem | null
}

export const HOME_HREF = '/'
export const LEAD_HREF = '/projects'
export const CONTACT_HREF = '/contact'

/** `/projects/` and `/projects?x=1` are the same destination as `/projects`. */
export function navPath(href: string): string {
  const head = href.split('?')[0] ?? href
  const path = head.split('#')[0] ?? head
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path
}

/**
 * Ensures the header navigation always includes key customer journeys
 * (`Trang chủ`, `Dự án`, `Phong cách`, `Dự toán`, `Studio`, `Dịch vụ`, `Bài viết`)
 * in a clean, balanced order without duplicate paths.
 */
export function normalizeHeaderNav(items: NavItem[]): {
  primary: NavItem[]
  contact: NavItem
} {
  const byPath = new Map<string, NavItem>()
  for (const item of items) {
    byPath.set(navPath(item.href), item)
  }

  const curatedOrder: readonly { href: string; defaultLabel: string }[] = [
    { href: '/', defaultLabel: 'Trang chủ' },
    { href: '/projects', defaultLabel: 'Dự án' },
    { href: '/phong-cach', defaultLabel: 'Phong cách' },
    { href: '/du-toan-chi-phi', defaultLabel: 'Dự toán' },
    { href: '/khu-vuc', defaultLabel: 'Khu vực' },
    { href: '/studio', defaultLabel: 'Studio' },
    { href: '/services', defaultLabel: 'Dịch vụ' },
    { href: '/journal', defaultLabel: 'Bài viết' },
  ]

  const used = new Set<string>()
  const primary: NavItem[] = []

  curatedOrder.forEach((slot, idx) => {
    const existing = byPath.get(slot.href)
    used.add(slot.href)
    // Keep Header labels concise so the top bar never wraps or crowds
    const label =
      slot.href === '/du-toan-chi-phi'
        ? 'Dự toán'
        : slot.href === '/khu-vuc'
          ? 'Khu vực'
          : existing?.label ?? slot.defaultLabel

    const customChildren =
      existing?.children && existing.children.length > 0
        ? existing.children
        : defaultChildrenFor(slot.href)

    primary.push({
      id: existing?.id ?? `hdr-${idx}`,
      label,
      href: slot.href,
      order: idx,
      children: customChildren,
    })
  })

  // Append any custom admin-created routes that aren't in the default set or contact
  for (const item of items) {
    const p = navPath(item.href)
    if (!used.has(p) && p !== CONTACT_HREF) {
      used.add(p)
      primary.push(item)
    }
  }

  const contactItem = byPath.get(CONTACT_HREF) ?? {
    id: 'hdr-contact',
    label: 'Liên hệ',
    href: CONTACT_HREF,
    order: 99,
  }

  return { primary, contact: contactItem }
}

export function groupNav(items: NavItem[]): NavRoles {
  let home: NavItem | null = null
  let lead: NavItem | null = null
  let contact: NavItem | null = null
  const rest: NavItem[] = []

  for (const item of items) {
    const path = navPath(item.href)
    if (home === null && path === HOME_HREF) home = item
    else if (lead === null && path === LEAD_HREF) lead = item
    else if (contact === null && path === CONTACT_HREF) contact = item
    else rest.push(item)
  }

  if (lead === null) lead = rest.shift() ?? null

  return { home, lead, rest, contact }
}

/** True when the row is the real `/projects` entry, not a stand-in promoted above. */
export function isLeadProjects(item: NavItem | null): boolean {
  return item !== null && navPath(item.href) === LEAD_HREF
}

