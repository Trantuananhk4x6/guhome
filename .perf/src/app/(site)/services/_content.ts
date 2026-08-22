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
  'Đo hiện trạng, và một buổi quay lại đo vào ba giờ chiều',
  'Hai phương án mặt bằng, kèm lý do chúng tôi nghiêng về phương án nào',
  'Bảng vật liệu có mẫu thật, xem trong chính căn phòng sẽ dùng nó',
  'Phối cảnh những phòng bạn ở nhiều nhất',
  'Hồ sơ thi công nội thất, tỉ lệ 1:20 và 1:5 cho hạng mục khó',
  'Thống kê vật tư và thiết bị kèm mã hàng, để bạn tự đối chiếu giá',
]

const ARCHITECTURE: readonly string[] = [
  'Phương án khối và mặt bằng từng tầng',
  'Mặt đứng, mặt cắt, chi tiết lớp che nắng phía tây',
  'Tính thông gió và chống hắt mưa cho giếng trời',
  'Hồ sơ xin phép xây dựng nộp tại quận',
  'Phối hợp với kỹ sư kết cấu, điện nước và điều hoà',
  'Giám sát tác giả suốt phần xây thô, mỗi tuần một buổi',
]

const RENOVATION: readonly string[] = [
  'Thăm dò kết cấu, đường điện nước và độ ẩm chân tường trước khi vẽ',
  'Danh sách những gì đập bỏ và những gì giữ nguyên',
  'Hồ sơ cải tạo kèm biện pháp thi công cho nhà vẫn có người ở',
  'Thủ tục đăng ký thi công với ban quản lý toà nhà',
  'Tiến độ chia theo khu vực, để gia đình không phải dọn đi cả lượt',
  'Danh mục phát sinh lường trước được, kèm chi phí ước tính',
]

const BUILD: readonly string[] = [
  'Bóc tách khối lượng và dự toán theo từng hạng mục',
  'Hợp đồng không có dòng nào ghi “tạm tính”',
  'Hệ tủ đóng tại xưởng quen, xem vân gỗ trước khi ghép',
  'Một buổi ở công trường mỗi tuần, và cả ngày vào các mốc quan trọng',
  'Nghiệm thu từng hạng mục, biên bản có ảnh gửi trong ngày',
  'Bảo hành 24 tháng cho phần nội thất cố định',
]

const FURNITURE: readonly string[] = [
  'Bản vẽ chế tác 1:1 cho chi tiết ghép và bo cạnh',
  'Chọn phôi tại xưởng, đo độ ẩm gỗ trước khi cắt tấm đầu tiên',
  'Duyệt mẫu hoàn thiện tận tay tại xưởng, trước khi hàng rời khỏi đó',
  'Đo lại hiện trường sau khi tường đã tô xong',
  'Vận chuyển và lắp đặt, và nếu phải tháo rời để lọt thang máy thì cũng làm',
]

const VISUAL: readonly string[] = [
  'Phối cảnh những không gian chính',
  'Nghiên cứu ánh sáng ban ngày và ánh sáng sau bảy giờ tối',
  'Bảng phối vật liệu dựng ở tỉ lệ thật',
  'Một đoạn video đi qua không gian theo đúng lối vào thật',
]

const STYLING: readonly string[] = [
  'Kế hoạch mua đồ rời bám theo phần ngân sách còn lại',
  'Chọn vải, thảm, gốm và cây chịu được nắng ban công',
  'Cân chỉnh toàn bộ ánh sáng buổi tối trước ngày bàn giao',
  'Bộ ảnh hoàn thiện chụp vào ngày đẹp trời gần nhất',
  'Sổ tay bảo trì ghi rõ thứ gì lau bằng gì, bao lâu dưỡng lại mặt gỗ',
]

const CONSULT: readonly string[] = [
  'Một buổi 90 phút tại chính công trình',
  'Nhận xét mặt bằng và luồng đi lại trong nhà',
  'Định hướng vật liệu, màu và nhiệt độ ánh sáng',
  'Khung ngân sách, và thứ tự nên làm trước làm sau',
  'Bản ghi nhớ gửi lại trong ba ngày, để bạn cầm đi làm việc với nhà thầu',
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
    'Phần việc dài nhất của studio, từ chỗ đặt cái bàn ăn đến độ dày của một nẹp gỗ.',
    'Một mặt bằng chỉ đứng yên khi chúng tôi đã thử sống trong nó. Buổi sáng cả nhà cùng ra cửa một lúc, lối đi có tắc không. Bữa tối tám người, cái ghế cuối cùng ngồi vào bằng cách nào. Một chiều mưa không ai đi đâu được, ba người ngồi ba chỗ khác nhau, chỗ nào cũng đủ sáng để đọc chứ.\n\nVật liệu và ánh sáng đến sau. Đèn chọn theo việc bạn làm trong phòng, không theo số bóng trên trần; một cái bàn ăn cần ánh sáng rơi thẳng xuống mặt bàn, còn một góc ngồi sau chín giờ tối thì chỉ cần đủ để thấy mặt người đối diện.',
  ),
  fallback(
    2,
    'kien-truc-cai-tao',
    'Kiến trúc & cải tạo',
    'Mở lại một ô cửa, bỏ một bức tường, trả ánh sáng về chỗ nó nên tới.',
    'Sau lớp tường cũ hiếm khi có đúng thứ ghi trong bản vẽ hoàn công. Chúng tôi mở vài lỗ thăm dò trước khi vẽ nét đầu tiên, đo độ ẩm chân tường, dò lại đường điện — rồi vẫn ghi vào hồ sơ một danh mục phát sinh lường trước được, vì luôn còn thứ chưa lường hết.\n\nKết luận thường làm chủ nhà hơi hụt hẫng. Một căn hộ mười năm tuổi phần lớn chỉ cần dỡ hai bức tường, kéo lại đường điện và làm mới ánh sáng là rộng hẳn ra. Phạm vi chúng tôi đề xuất vì thế hay nhỏ hơn phạm vi bạn đang hình dung.',
  ),
  fallback(
    3,
    'thi-cong-giam-sat',
    'Thi công & giám sát',
    'Chúng tôi chỉ nhận thi công cho những bản vẽ do chính mình làm ra.',
    'Khi thiết kế và thi công nằm chung một đầu mối, khoảng cách giữa bản vẽ và hiện trường gần như biến mất. Mẫu được duyệt tại xưởng. Sai số xử lý trong tuần, lúc nó còn nhỏ hơn một cuộc thương lượng.\n\nMỗi tuần một buổi ở công trường, và một biên bản có ảnh gửi về trong ngày. Phát sinh được báo trước khi làm, kèm con số. Báo sau khi đã trót làm thì gọi là thông báo, không phải là hỏi ý.',
  ),
  fallback(
    4,
    'tu-van-vat-lieu',
    'Tư vấn vật liệu & ánh sáng',
    'Chín mươi phút cho những căn nhà chỉ cần chỉnh lại vài quyết định quan trọng.',
    'Không phải nhà nào cũng cần một bộ hồ sơ đầy đủ. Có khi bạn đã có nhà thầu, đã chốt phần lớn phương án, và chỉ cần một người ngồi xuống nói thẳng rằng mảng tường này nên dừng ở đâu và sàn gỗ kia sau năm năm sẽ trông thế nào.\n\nChúng tôi làm việc tại chính công trình, trong 90 phút, rồi gửi lại một bản ghi nhớ để bạn cầm đi nói chuyện với đội thi công.',
  ),
  fallback(
    5,
    'styling-ban-giao',
    'Styling & bàn giao',
    'Lớp cuối cùng, thứ khiến căn nhà trông như đã có người ở từ lâu.',
    'Một không gian xong phần cứng vẫn có thể trống rỗng. Bước này chọn đồ rời, cân lại toàn bộ ánh sáng buổi tối, và sắp đặt cho tới khi căn phòng trông như thể ai đó vừa đứng dậy khỏi ghế.\n\nBàn giao kèm bộ ảnh hoàn thiện và một cuốn sổ mỏng, ghi mặt đá lau bằng gì, gỗ bao lâu dưỡng lại một lần, tấm rèm nào giặt được ở nhà.',
  ),
]

/* ------------------------------ what we decline ---------------------------- */

/**
 * The paragraph most studio sites leave out. Deliberately uneven: one is a bare
 * single line, one opens on a condition, one on a fronted object, one on a
 * colon. No two of them are built the same way, and none of them apologises.
 */
export const EXCLUSIONS: readonly string[] = [
  'Chúng tôi không nhận việc mà chưa từng đến đứng trong chính căn nhà đó. Ảnh gửi qua tin nhắn giúp được rất nhiều cho lần trao đổi đầu, nhưng chưa tấm ảnh nào nói được trần thật sự cao bao nhiêu, hay năm giờ chiều nắng đã bò tới đâu trên sàn.',
  'Nếu bạn đã có sẵn một thư mục ảnh và chỉ cần người dựng lại cho giống, có những đơn vị làm việc đó nhanh hơn và rẻ hơn chúng tôi rất nhiều. Không phải lời chê. Chúng tôi làm việc đó dở thật.',
  'Studio không ký tên vào phương án do người khác vẽ.',
  'Bản vẽ của người khác thì chúng tôi cũng không nhận thi công. Một mối nối mình chưa từng ngồi tính thì không đứng ra bảo hành được, mà bảo hành nói suông thì cả hai bên đều biết là nói suông.',
  'Có một điều chúng tôi rất mong được biết sớm: gia đình có xem phong thuỷ hay không. Có xem thì cứ nói ngay buổi đầu và mời thầy vào cùng, chúng tôi vẽ được. Nhưng một tờ giấy ghi hướng bếp và ngày động thổ đưa sang ở tháng thứ năm, khi hồ sơ đã xong, thì thứ phải vẽ lại không phải cái bếp, mà là cả mặt bằng.',
  'Không có gói “thiết kế miễn phí khi thi công”. Bản vẽ là phần tốn thời gian nhất trong toàn bộ công việc này, nên gói nó vào giá thi công chỉ có nghĩa là bạn vẫn trả tiền cho nó, ở một dòng khác, chỗ bạn không nhìn thấy.',
  'Tuần sát Tết thì đừng hẹn bàn giao, với chúng tôi hay với bất kỳ ai. Xưởng mộc đóng cửa từ hai ba tháng Chạp và thợ về quê từ trước đó cả tuần; không ai rút ngắn được khoảng ấy, kể cả bằng tiền.',
]
