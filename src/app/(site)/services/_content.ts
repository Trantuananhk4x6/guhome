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
  'Đo hiện trạng, đo nắng lúc ba giờ chiều, một trang tóm tắt đề bài',
  'Hai phương án mặt bằng, kèm lý do chúng tôi nghiêng về phương án nào',
  'Bảng vật liệu có mẫu thật, xem ngay trong căn phòng sẽ dùng nó',
  'Phối cảnh những phòng bạn ở nhiều nhất',
  'Hồ sơ thi công nội thất, tỷ lệ 1:20 và 1:5 cho hạng mục khó',
  'Thống kê vật tư, thiết bị và đồ rời kèm mã hàng để bạn tự đối chiếu giá',
]

const ARCHITECTURE: readonly string[] = [
  'Phương án khối và mặt bằng từng tầng',
  'Mặt đứng, mặt cắt, chi tiết lớp che nắng phía tây',
  'Tính thông gió và chống hắt mưa cho giếng trời',
  'Hồ sơ xin phép xây dựng nộp tại quận',
  'Phối hợp với kỹ sư kết cấu, điện nước và điều hoà',
  'Giám sát tác giả suốt phần xây thô',
]

const RENOVATION: readonly string[] = [
  'Đánh giá kết cấu, đường điện nước và độ ẩm tường trước khi vẽ',
  'Danh sách những gì đập bỏ và những gì giữ nguyên',
  'Hồ sơ cải tạo kèm biện pháp thi công trong nhà vẫn có người ở',
  'Thủ tục đăng ký thi công với ban quản lý toà nhà',
  'Tiến độ chia theo khu vực, để gia đình không phải dọn đi cả lượt',
  'Danh mục phát sinh có thể lường trước, kèm chi phí ước tính',
]

const BUILD: readonly string[] = [
  'Bóc tách khối lượng và dự toán theo từng hạng mục',
  'Hợp đồng không có dòng nào ghi “tạm tính”',
  'Hệ tủ đóng tại xưởng quen, kiểm tra vân gỗ trước khi ghép',
  'Một buổi ở công trường mỗi tuần, và cả ngày vào các mốc quan trọng',
  'Nghiệm thu từng hạng mục, biên bản có ảnh gửi trong ngày',
  'Bảo hành 24 tháng cho phần nội thất cố định',
]

const FURNITURE: readonly string[] = [
  'Bản vẽ chế tác 1:1 cho chi tiết ghép và bo cạnh',
  'Chọn phôi tại xưởng, đo độ ẩm gỗ trước khi cắt tấm đầu tiên',
  'Mẫu hoàn thiện duyệt tận tay, không duyệt qua ảnh chụp',
  'Đo lại hiện trường sau khi tường đã tô xong',
  'Vận chuyển và lắp đặt, kể cả khi phải tháo rời để vào lọt thang máy',
]

const VISUAL: readonly string[] = [
  'Phối cảnh những không gian chính',
  'Nghiên cứu ánh sáng ban ngày và ánh sáng buổi tối',
  'Bảng phối vật liệu dựng ở tỷ lệ thật',
  'Một đoạn video đi qua không gian theo lối vào thật',
]

const STYLING: readonly string[] = [
  'Kế hoạch mua đồ rời bám theo phần ngân sách còn lại',
  'Chọn vải, thảm, gốm và cây chịu được nắng của ban công',
  'Sắp đặt và cân chỉnh toàn bộ ánh sáng buổi tối trước ngày bàn giao',
  'Bộ ảnh hoàn thiện chụp trong ngày đẹp trời gần nhất',
  'Sổ tay bảo trì: thứ gì lau bằng gì, bao lâu dưỡng lại mặt gỗ',
]

const CONSULT: readonly string[] = [
  'Một buổi 90 phút tại chính công trình',
  'Nhận xét mặt bằng và luồng đi lại trong nhà',
  'Định hướng vật liệu, màu và nhiệt độ ánh sáng',
  'Khung ngân sách và thứ tự nên làm trước, làm sau',
  'Bản ghi nhớ gửi lại trong vòng ba ngày, để bạn cầm đi làm việc với nhà thầu',
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
  if (key.includes('do-noi-that') || key.includes('dat-rieng') || key.includes('do-go')) {
    return FURNITURE
  }
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
    'Phần việc dài nhất của studio: từ chỗ đặt cái bàn ăn đến độ dày của một nẹp gỗ.',
    'Chúng tôi sống thử trong bản vẽ trước khi chốt nó: một buổi sáng cả nhà cùng ra cửa, một bữa tối có tám người, một chiều mưa không ai đi đâu được. Mặt bằng chỉ đứng yên khi không còn tình huống nào phải giải thích vòng vo.\n\nSau đó mới tới vật liệu và ánh sáng. Vật liệu chọn theo cách chúng cũ đi và theo độ ẩm ngoài trời; đèn thì tính theo việc bạn làm trong phòng — đọc sách, thái rau, hay chỉ ngồi yên sau chín giờ tối.',
  ),
  fallback(
    2,
    'kien-truc-cai-tao',
    'Kiến trúc & cải tạo',
    'Mở lại một ô cửa, bỏ một bức tường, trả ánh sáng về chỗ nó nên tới.',
    'Phần lớn căn hộ mười năm tuổi không cần đập đi làm lại. Chúng tôi đọc kết cấu, tìm ra bức tường nào được phép bỏ, ô thông tầng nào nên mở rộng, và cái cầu thang nào đang chiếm mất phần sáng nhất của mặt bằng.\n\nHồ sơ cải tạo luôn đi kèm biện pháp thi công cho nhà vẫn có người ở, và một danh mục phát sinh có thể lường trước — vì thứ nằm sau lớp tường cũ hiếm khi giống bản vẽ hoàn công.',
  ),
  fallback(
    3,
    'thi-cong-giam-sat',
    'Thi công & giám sát',
    'Chúng tôi chỉ nhận thi công cho những bản vẽ do chính mình làm ra.',
    'Khi thiết kế và thi công nằm trong cùng một đầu mối, khoảng cách giữa bản vẽ và hiện trường gần như biến mất: mẫu duyệt tại xưởng, shop drawing do chính người sẽ cắt gỗ đọc, sai số xử lý ngay trong tuần thay vì thành một cuộc thương lượng ở cuối dự án.\n\nMỗi tuần một buổi ở công trường và một biên bản có ảnh gửi về trong ngày. Phát sinh được báo trước khi làm, kèm con số, không phải sau khi đã trót làm.',
  ),
  fallback(
    4,
    'tu-van-vat-lieu',
    'Tư vấn vật liệu & ánh sáng',
    'Chín mươi phút cho những căn nhà chỉ cần chỉnh lại vài quyết định quan trọng.',
    'Không phải nhà nào cũng cần một bộ hồ sơ đầy đủ. Có khi bạn đã có nhà thầu, đã chốt phần lớn phương án, và chỉ cần một người ngồi xuống nói thẳng: mảng tường này nên dừng ở đâu, đèn nên bao nhiêu Kelvin, sàn gỗ này sau năm năm sẽ trông thế nào.\n\nChúng tôi làm việc tại chính công trình, trong 90 phút, rồi gửi lại một bản ghi nhớ để bạn cầm đi nói chuyện với đội thi công.',
  ),
  fallback(
    5,
    'styling-ban-giao',
    'Styling & bàn giao',
    'Lớp cuối cùng: vải, gốm, sách, cây — thứ khiến căn nhà trông như đã có người ở.',
    'Một không gian xong phần cứng vẫn có thể trống rỗng. Bước này chọn đồ rời, cân lại toàn bộ ánh sáng buổi tối, và sắp đặt cho tới khi căn phòng trông như thể ai đó vừa đứng dậy khỏi ghế.\n\nBàn giao kèm bộ ảnh hoàn thiện và một cuốn sổ mỏng: mặt đá lau bằng gì, gỗ bao lâu dưỡng lại một lần, tấm rèm nào giặt được ở nhà.',
  ),
]

/* ------------------------------ what we decline ---------------------------- */

/**
 * The paragraph most studio sites leave out. Deliberately uneven in length —
 * one of these is a single clause.
 */
export const EXCLUSIONS: readonly string[] = [
  'Chúng tôi không nhận thiết kế mà chưa đi xem hiện trạng. Ảnh chụp bằng điện thoại không cho biết trần cao bao nhiêu, dầm chạy ở đâu, và ba giờ chiều nắng vào tới đâu.',
  'Không vẽ theo một thư mục ảnh có sẵn. Nếu bạn đã chọn xong hình mẫu và chỉ cần người dựng lại cho giống, việc đó có người làm nhanh hơn và rẻ hơn chúng tôi.',
  'Không ký hồ sơ cho phương án của người khác.',
  'Không nhận thi công cho bản vẽ không phải của studio, vì chúng tôi không đứng ra bảo hành được cho những chi tiết mình chưa từng tính.',
  'Không có gói “thiết kế miễn phí khi thi công”. Bản vẽ là phần tốn thời gian nhất; gói nó vào giá thi công chỉ có nghĩa là bạn đang trả tiền ở một dòng khác.',
  'Không hứa bàn giao vào tuần sát Tết. Xưởng mộc đóng cửa từ hai ba tháng Chạp, thợ về quê, và không ai rút ngắn được thời gian sơn khô.',
]
