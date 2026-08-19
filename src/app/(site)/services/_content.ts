/**
 * Editorial scaffolding for /services.
 *
 * `getServices()` owns the copy; this module only supplies what the table has no
 * column for — the deliverables list under each service — plus a small default
 * set so the page still reads as a page on a database that has not been seeded.
 */

import { slugify } from '@/lib/utils'
import type { ServiceItem } from '@/types/content'

/* ------------------------------ deliverables ------------------------------- */

const DESIGN: readonly string[] = [
  'Khảo sát hiện trạng, đo nắng và bản tóm tắt đề bài',
  'Hai phương án mặt bằng công năng',
  'Bảng vật liệu kèm mẫu thật cầm được trên tay',
  'Phối cảnh các không gian chính',
  'Hồ sơ kỹ thuật thi công nội thất',
  'Thống kê vật tư, đồ rời và thiết bị',
]

const ARCHITECTURE: readonly string[] = [
  'Phương án tổng mặt bằng và tổ chức khối tích',
  'Mặt đứng, mặt cắt, chi tiết vỏ công trình',
  'Hồ sơ xin phép xây dựng',
  'Phối hợp kết cấu, điện nước và điều hoà',
  'Giám sát tác giả trong suốt quá trình xây thô',
]

const RENOVATION: readonly string[] = [
  'Đánh giá hiện trạng kết cấu và hệ kỹ thuật',
  'Phương án tháo dỡ và giữ lại',
  'Hồ sơ cải tạo kèm biện pháp thi công',
  'Kế hoạch tiến độ theo từng khu vực ở',
  'Danh mục hạng mục phát sinh có thể lường trước',
]

const BUILD: readonly string[] = [
  'Bóc tách khối lượng và dự toán chi tiết',
  'Hợp đồng theo hạng mục, không có khoản mở',
  'Xưởng mộc riêng cho hệ tủ và đồ đặt làm',
  'Giám sát tại công trường mỗi tuần một buổi',
  'Nghiệm thu từng hạng mục kèm biên bản ảnh',
  'Bảo hành 24 tháng phần nội thất cố định',
]

const VISUAL: readonly string[] = [
  'Phối cảnh 3D các không gian chính',
  'Nghiên cứu ánh sáng ngày và đêm',
  'Bảng phối vật liệu ở tỷ lệ thật',
  'Video dạo bước qua không gian',
]

const STYLING: readonly string[] = [
  'Kế hoạch mua sắm đồ rời theo ngân sách',
  'Chọn vải, thảm, gốm và cây xanh',
  'Sắp đặt và chỉnh ánh sáng trước ngày bàn giao',
  'Bộ ảnh hoàn thiện của công trình',
  'Sổ tay bảo trì từng loại vật liệu',
]

const CONSULT: readonly string[] = [
  'Buổi làm việc 90 phút tại công trình',
  'Nhận xét mặt bằng và luồng di chuyển',
  'Định hướng vật liệu, màu và ánh sáng',
  'Khung ngân sách và trình tự ưu tiên',
  'Bản ghi nhớ gửi lại trong vòng ba ngày',
]

/** Bullet lines already written into the service description win over everything. */
function bulletsFromDescription(description: string | null): string[] {
  if (!description) return []
  return description
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-–—•*]\s+/.test(line))
    .map((line) => line.replace(/^[-–—•*]\s+/, '').trim())
    .filter((line) => line.length > 0)
}

/**
 * Deliverables for a service. Falls back to a keyword read of the title/slug so
 * a newly added service still gets an honest list rather than an empty column.
 */
export function deliverablesFor(service: ServiceItem): readonly string[] {
  const authored = bulletsFromDescription(service.description)
  if (authored.length > 0) return authored

  const key = slugify(`${service.slug} ${service.title}`)

  if (key.includes('thi-cong') || key.includes('giam-sat') || key.includes('tron-goi')) return BUILD
  if (key.includes('cai-tao')) return RENOVATION
  if (key.includes('kien-truc') || key.includes('xay')) return ARCHITECTURE
  if (key.includes('3d') || key.includes('phoi-canh') || key.includes('hinh-anh')) return VISUAL
  if (key.includes('styling') || key.includes('ban-giao') || key.includes('do-roi')) return STYLING
  if (key.includes('tu-van')) return CONSULT
  return DESIGN
}

/** Paragraphs of a service description, blank-line separated. */
export function paragraphsOf(description: string | null): string[] {
  if (!description) return []
  return description
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0 && !/^[-–—•*]\s+/.test(block))
}

/* --------------------------- unseeded-database set ------------------------- */

function fallback(
  index: number,
  slug: string,
  title: string,
  summary: string,
  description: string,
): ServiceItem {
  return {
    id: `fallback-${slug}`,
    slug,
    indexLabel: String(index).padStart(2, '0'),
    title,
    summary,
    description,
    cover: null,
    order: index,
  }
}

export const FALLBACK_SERVICES: readonly ServiceItem[] = [
  fallback(
    1,
    'thiet-ke-noi-that',
    'Thiết kế nội thất',
    'Từ mặt bằng công năng đến chiếc tay nắm cuối cùng — một hồ sơ đủ chặt để người thợ không phải đoán.',
    'Đây là phần việc chiếm nhiều thời gian nhất của studio. Chúng tôi bắt đầu bằng cách sống thử trong bản vẽ: mô phỏng một buổi sáng đi làm, một bữa tối có khách, một chiều mưa cả nhà ở trong. Mặt bằng chỉ được chốt khi không còn tình huống nào phải giải thích vòng vo.\n\nSau đó là vật liệu và ánh sáng. Chúng tôi chọn theo cách chúng cũ đi, và tính độ rọi theo từng việc bạn làm trong phòng — đọc sách, nấu ăn, hay chỉ ngồi yên.',
  ),
  fallback(
    2,
    'kien-truc-cai-tao',
    'Kiến trúc & cải tạo',
    'Can thiệp vào vỏ công trình: mở lại ô cửa, dịch một bức tường, trả ánh sáng về đúng chỗ nó nên tới.',
    'Nhiều ngôi nhà không cần xây mới, chỉ cần được sửa đúng chỗ. Chúng tôi đọc lại kết cấu, tìm ra bức tường nào có thể bỏ, ô thông tầng nào nên mở, và cầu thang nào đang ăn mất phần đẹp nhất của mặt bằng.\n\nHồ sơ cải tạo luôn đi kèm biện pháp thi công và một danh mục những gì có thể phát sinh — để bạn biết trước điều gì đang chờ mình phía sau lớp tường.',
  ),
  fallback(
    3,
    'thi-cong-giam-sat',
    'Thi công & giám sát',
    'Một đầu mối chịu trách nhiệm cho cả bản vẽ lẫn kết quả cuối cùng trên công trường.',
    'Studio nhận thi công trọn gói với những dự án do chính mình thiết kế. Hệ tủ và đồ đặt làm đi qua xưởng mộc quen, nơi chúng tôi kiểm tra vân gỗ trước khi ghép và soi lại từng mối nối trước khi sơn.\n\nMỗi tuần có một buổi ở công trường, và một biên bản ảnh gửi về cho gia chủ. Mọi phát sinh đều được báo trước khi làm, không phải sau khi làm.',
  ),
  fallback(
    4,
    'tu-van-vat-lieu',
    'Tư vấn vật liệu & ánh sáng',
    'Một buổi làm việc gọn cho những căn nhà chỉ cần được chỉnh lại vài quyết định quan trọng.',
    'Không phải dự án nào cũng cần một hồ sơ đầy đủ. Đôi khi bạn đã có nhà thầu, đã có phần lớn phương án, và chỉ cần một người ngồi xuống nói thẳng: mảng tường này nên dừng ở đâu, đèn nên ấm bao nhiêu, sàn gỗ này sẽ trông thế nào sau năm năm.\n\nChúng tôi làm việc tại chính công trình, trong 90 phút, và gửi lại bản ghi nhớ để bạn cầm đi làm việc với đội thi công.',
  ),
  fallback(
    5,
    'styling-ban-giao',
    'Styling & bàn giao',
    'Lớp cuối cùng: vải, gốm, sách, cây — những thứ khiến căn nhà trông như đã có người ở.',
    'Một không gian hoàn thiện phần cứng vẫn có thể trống rỗng. Bước này chọn đồ rời, chỉnh lại toàn bộ ánh sáng vào buổi tối, và sắp đặt đến khi căn phòng trông như thể ai đó vừa rời khỏi ghế.\n\nChúng tôi bàn giao kèm bộ ảnh hoàn thiện và một cuốn sổ mỏng: vật liệu nào lau bằng gì, bao lâu dưỡng lại mặt gỗ một lần.',
  ),
]
