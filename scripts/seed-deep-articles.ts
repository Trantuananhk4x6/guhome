import { config } from 'dotenv'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { eq } from 'drizzle-orm'
import type { RichTextDoc } from '../src/types/content'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

interface DeepArticleSeedItem {
  slug: string
  title: string
  excerpt: string
  categoryId: string | null
  authorId: string | null
  status: 'published' | 'draft' | 'archived'
  tags: string[]
  readingMinutes: number
  publishedAt: Date
  seo: {
    title: string
    description: string
  }
  content: RichTextDoc
}

async function run() {
  const { db } = await import('../src/server/db/index')
  const schema = await import('../src/server/db/schema')

  // Find author
  const users = await db.select().from(schema.users).limit(1)
  const authorId = users[0]?.id ?? null

  // Find category
  const categories = await db.select().from(schema.categories).where(eq(schema.categories.kind, 'journal'))
  const categoryId = categories[0]?.id ?? null

  // Get active media list
  const mediaList = await db.select().from(schema.media).limit(60)
  if (mediaList.length === 0) {
    throw new Error('No media found in database!')
  }

  const m = (idx: number) => mediaList[idx % mediaList.length]!.id

  const articles: DeepArticleSeedItem[] = [
    {
      slug: 'nghe-thuat-anh-sang-3-lop-can-ho-cao-cap-sai-gon',
      title: 'Nghệ thuật ứng dụng ánh sáng 3 lớp (Ambient - Task - Accent) trong căn hộ cao cấp Sài Gòn',
      excerpt:
        'Không gian sang trọng không bao giờ tràn ngập ánh sáng chói chang từ một nguồn duy nhất. Tại GuHomes, ánh sáng được xem là chất liệu vô hình kiến tạo cảm xúc và chiều sâu tĩnh lặng cho mỗi tổ ấm.',
      categoryId,
      authorId,
      status: 'published',
      tags: ['Ánh sáng', 'Căn hộ cao cấp', 'Quiet Luxury', 'Thiết kế chiếu sáng', 'GuHomes'],
      readingMinutes: 7,
      publishedAt: new Date('2026-03-20T09:00:00Z'),
      seo: {
        title: 'Nghệ Thuật Chiếu Sáng 3 Lớp Căn Hộ Cao Cấp Sài Gòn | GuHomes',
        description:
          'Khám phá nghệ thuật phối hợp ánh sáng 3 tầng (Ambient - Task - Accent) tôn vinh chất liệu và nuôi dưỡng trạng thái thư thái cho gia chủ căn hộ cao cấp.',
      },
      content: {
        nodes: [
          {
            type: 'heading',
            level: 2,
            text: 'Ánh sáng — Vật liệu vô hình định hình cảm xúc không gian',
          },
          {
            type: 'paragraph',
            text: 'Trong kiến trúc nội thất đỉnh cao, ánh sáng không đơn thuần để xua tan bóng tối; ánh sáng là một chất liệu điêu khắc không gian. Một căn hộ dù đắt đỏ với đá tự nhiên nhập khẩu hay gỗ óc chó loại một cũng sẽ trở nên phẳng lặng và lạnh lẽo nếu chỉ sử dụng hệ đèn downlight rải đều vô hồn trên trần thạch cao. Tại GuHomes, chúng tôi tôn vinh sự tương phản giữa sáng và tối (chiaroscuro) thông qua hệ thống chiếu sáng ba lớp được tính toán tỉ mỉ.',
          },
          {
            type: 'image',
            mediaId: m(2),
            caption: 'Nguồn sáng gián tiếp hắt chân tường và khe rèm làm mềm các khối bê tông đặc cứng.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Lớp 1: Ambient Lighting — Ánh sáng bao bọc và êm dịu',
          },
          {
            type: 'paragraph',
            text: 'Ambient là lớp ánh sáng nền thay thế cho nguồn sáng ban ngày khi hoàng hôn buông xuống trên sông Sài Gòn. Thay vì để lộ tim đèn rọi thẳng vào mắt, GuHomes giấu nguồn sáng vào các khe trần thạch cao âm, khe chân tường hay phía sau tấm ốp gỗ tự nhiên. Ánh sáng tán xạ qua bề mặt vữa vôi hoặc giấy dán sợi dệt tự nhiên, lan tỏa đều khắp căn phòng với độ rọi êm dịu từ 150 - 200 Lux.',
          },
          {
            type: 'quote',
            text: 'Ánh sáng đẹp nhất là thứ ánh sáng bạn cảm nhận được hơi ấm và chiều sâu của nó, nhưng không bao giờ nhìn thấy bóng đèn đang nằm ở đâu.',
            attribution: 'KTS Trưởng GuHomes',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Lớp 2: Task Lighting — Ánh sáng phục vụ công năng chính xác',
          },
          {
            type: 'paragraph',
            text: 'Mỗi khu vực chức năng đòi hỏi nguồn sáng có chùm tia tập trung (beam angle) phù hợp để phục vụ sinh hoạt: đảo bếp cần góc chiếu 36° không bóng đổ khi thái gọt thực phẩm; bàn làm việc cần ánh sáng 500 Lux chống mỏi mắt; bàn trang điểm của nữ chủ nhân đòi hỏi chỉ số hoàn màu CRI > 97 để phản ánh sắc da chân thực nhất.',
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Chiếu sáng đảo bếp: Đèn rọi nam châm âm trần góc 36 độ, chống chói UGR < 13.',
              'Đọc sách phòng ngủ: Đèn đọc sách gắn đầu giường góc hẹp 15 độ, không làm phiền người bên cạnh.',
              'Khu vực tủ áo Walk-in Closet: Đèn LED thanh nhôm hắt chéo 45 độ gắn mép trong đợt gỗ.',
            ],
          },
          {
            type: 'image',
            mediaId: m(5),
            caption: 'Góc đọc sách với ánh sáng tập trung tôn vinh từng thớ vải linen và mặt bàn gỗ.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Lớp 3: Accent Lighting — Nốt nhạc trầm bổng của tác phẩm nghệ thuật',
          },
          {
            type: 'paragraph',
            text: 'Đây là lớp sáng tạo nên linh hồn của phong cách Quiet Luxury. Một chùm tia sáng hẹp 15° chiếu xiên làm nổi bật vân đá travertine lồi lõm, bức tranh sơn mài khổ lớn, hoặc chiếc bình gốm mộc vuốt tay từ nghệ nhân Bát Tràng. Sự luân chuyển giữa các mảng sáng và khoảng tối tĩnh mịch dẫn dắt thị giác gia chủ qua từng cung bậc cảm xúc khi bước chân về nhà sau một ngày làm việc áp lực.',
          },
        ],
      },
    },
    {
      slug: 'bao-ton-ve-dep-go-tu-nhien-do-am-80-tho-ca-guhomes',
      title: 'Bảo tồn vẻ đẹp gỗ tự nhiên trong môi trường độ ẩm 80% — Bí quyết từ thợ cả GuHomes',
      excerpt:
        'Sài Gòn có mùa mưa kéo dài với độ ẩm không khí thường xuyên vượt ngưỡng 80%. Làm sao để gỗ óc chó, sồi trắng tự nhiên không cong vênh, nứt toác theo năm tháng? Lời giải đến từ xưởng may đo nội thất GuHomes.',
      categoryId,
      authorId,
      status: 'published',
      tags: ['Xưởng mộc', 'Gỗ tự nhiên', 'Vi khí hậu Sài Gòn', 'Kỹ thuật thi công', 'GuHomes'],
      readingMinutes: 8,
      publishedAt: new Date('2026-03-22T10:30:00Z'),
      seo: {
        title: 'Bảo Tồn Gỗ Tự Nhiên Khí Hậu Ẩm Sài Gòn | Xưởng Mộc GuHomes',
        description:
          'Kinh nghiệm thực chiến xử lý khe co ngót, sấy gỗ chuẩn độ ẩm 10-12% và kỹ thuật lau dầu thẩm thấu bảo vệ đồ gỗ nội thất bền bỉ hàng chục năm.',
      },
      content: {
        nodes: [
          {
            type: 'heading',
            level: 2,
            text: 'Gỗ là vật thể sống — Nó hít thở cùng khí hậu ngôi nhà bạn',
          },
          {
            type: 'paragraph',
            text: 'Nhiều gia chủ băn khoăn khi nghe cảnh báo: "Ở Sài Gòn đừng dùng gỗ tự nhiên, ẩm cao dễ cong vênh, co ngót kẹt cánh tủ". Nhưng sự thật là, suốt hàng thế kỷ qua, những ngôi nhà rường cổ kính miền Trung hay biệt thự thời Pháp thuộc tại Quận 1 và Quận 3 vẫn đứng vững trước nắng mưa nhiệt đới. Vấn đề không nằm ở chất liệu gỗ, mà nằm ở sự thấu hiểu quy luật giãn nở tự nhiên và tay nghề của người thợ mộc.',
          },
          {
            type: 'image',
            mediaId: m(7),
            caption: 'Gia công mộng gỗ truyền thống kết hợp liên kết âm tại xưởng GuHomes.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Tiêu chuẩn sấy lò đạt độ ẩm cân bằng EMC 10% - 12%',
          },
          {
            type: 'paragraph',
            text: 'Phôi gỗ óc chó Bắc Mỹ (FAS Grade) khi nhập cảng thường có độ ẩm ngoài trời dao động mạnh. Tại xưởng mộc GuHomes, gỗ được đưa vào lò sấy đối lưu kiểm soát vi tính chậm rãi trong 35-45 ngày, hạ độ ẩm cốt gỗ xuống đúng mức cân bằng 10% - 12% — tương thích lý tưởng với điều kiện phòng máy lạnh đóng kín của căn hộ cao cấp tại TP.HCM.',
          },
          {
            type: 'quote',
            text: 'Người thợ mộc giỏi không ép gỗ phải đứng im theo ý mình. Anh ta tôn trọng hơi thở của nó, dành sẵn cho nó khe hở để giãn nở khi trời mưa mà không làm biến dạng toàn bộ cánh cửa.',
            attribution: 'Bác Thợ Cả Xưởng GuHomes (32 năm trong nghề)',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Khe co ngót kỹ thuật (Shadow Gap) — Nét đẹp đến từ công năng',
          },
          {
            type: 'paragraph',
            text: 'Trong mỗi thiết kế hệ tủ áo kịch trần, lam gỗ ốp tường hay mặt bàn ăn nguyên tấm, GuHomes luôn chủ động tạo các đường chỉ âm rút sâu từ 3mm đến 5mm (shadow gap) và sử dụng khớp nối trượt tự do (floating tenons). Khi độ ẩm mùa mưa tháng 9 tại Sài Gòn đạt đỉnh 85%, thớ gỗ nở ngang sẽ trượt êm ái trong biên độ cho phép mà không gây phồng rộp hay kẹt ray trượt.',
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Chống chỉ định lớp sơn PU bóng dày bịt kín lỗ thở bề mặt gỗ.',
              'Ứng dụng dầu lau thực vật tự nhiên (Hardwax Oil) thẩm thấu sâu vào mạch gỗ, giữ trọn mùi thơm mộc và cho phép gỗ trao đổi khí tự nhiên.',
              'Mộng âm dương kép phân bổ ứng suất đều trên toàn bộ khung chịu lực.',
            ],
          },
          {
            type: 'image',
            mediaId: m(11),
            caption: 'Bề mặt gỗ sồi lau dầu Rubio Monocoat chống bám nước mà vẫn mịn màng như nhung.',
          },
        ],
      },
    },
    {
      slug: 'penthouse-duplex-the-metropole-thu-thiem-song-sai-gon',
      title: 'Penthouse Duplex The Metropole Thủ Thiêm — Nghệ thuật đối thoại giữa nhịp sống sông Sài Gòn và sự tĩnh lặng',
      excerpt:
        'Ở độ cao tầng 32 nhìn thẳng ra khúc quanh sông Sài Gòn và trung tâm Quận 1, căn penthouse duplex được kiến tạo như một ốc đảo biệt lập — nơi âm thanh phố thị nhường chỗ cho sự an yên sâu thẳm.',
      categoryId,
      authorId,
      status: 'published',
      tags: ['Penthouse', 'The Metropole', 'Thủ Thiêm', 'Duplex', 'Dự án thực tế', 'GuHomes'],
      readingMinutes: 9,
      publishedAt: new Date('2026-03-25T14:00:00Z'),
      seo: {
        title: 'Penthouse Duplex The Metropole Thủ Thiêm | Không Gian Sống GuHomes',
        description:
          'Khám phá tuyệt tác Penthouse Duplex 380m2 tại The Metropole Thủ Thiêm: tầm nhìn panoramic sông Sài Gòn, khoảng thông tầng 6.8m và chất liệu đá tự nhiên nguyên khối.',
      },
      content: {
        nodes: [
          {
            type: 'heading',
            level: 2,
            text: 'Ốc đảo trên mây giữa trung tâm tài chính Thủ Thiêm',
          },
          {
            type: 'paragraph',
            text: 'The Metropole Thủ Thiêm nằm ở vị trí kim cương của bán đảo mới, ngay chân cầu Ba Son kết nối sang Quận 1. Gia chủ là một doanh nhân công nghệ thường xuyên di chuyển giữa các múi giờ quốc tế. Yêu cầu đặt ra cho đội ngũ KTS GuHomes là tạo nên một chốn nương náu thực sự: mở toang tầm nhìn panorama ra mặt nước sông Sài Gòn, nhưng bên trong phải mang đến sự tĩnh tại tuyệt đối, không có bất kỳ chi tiết thừa thãi nào làm xao nhãng tâm trí.',
          },
          {
            type: 'image',
            mediaId: m(14),
            caption: 'Không gian thông tầng 6.8m nhìn thẳng ra dòng sông Sài Gòn lấp lánh lúc hoàng hôn.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Khoảng thông tầng 6.8m và bức vách đá Travertine nguyên khối',
          },
          {
            type: 'paragraph',
            text: 'Trái tim của căn Penthouse là phòng khách duplex với khoảng thông tầng cao gần 7 mét. Điểm tựa thị giác là mảng tường ốp đá Travertine Navona nhập khẩu trực tiếp từ vùng mỏ Tivoli (Ý). Từng phiến đá dày 30mm được chọn vân cẩn thận, cắt theo tỷ lệ module bất đối xứng và thi công khe giấu vít chuyên dụng, tạo cảm giác như một vách núi đá tự nhiên sừng sững giữa bầu trời nhiệt đới.',
          },
          {
            type: 'quote',
            text: 'Sự xa xỉ không đến từ những món đồ đắt tiền dát vàng, mà đến từ khoảng thở của không gian và những buổi chiều ngồi ngắm mặt trời lặn sau những rặng dừa nước Thủ Thiêm.',
            attribution: 'KTS Trưởng Phụ Trách Dự Án Metropole',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Xử lý vi khí hậu bức xạ nhiệt mặt dựng kính hướng Tây Nam',
          },
          {
            type: 'paragraph',
            text: 'Căn duplex sở hữu mặt tiền kính Low-E tràn viền hướng Tây Nam đón trọn ánh nắng chiều gay gắt của Sài Gòn. GuHomes đã áp dụng giải pháp đệm không khí kép: hệ rèm dệt sợi thủy tinh chống bức xạ kết hợp lam gỗ trượt tự động phân lớp nhiệt trước khi chạm vào không gian sinh hoạt chính, giữ nhiệt độ bên trong luôn ổn định ở mức 24°C dịu mát.',
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Tổng diện tích sàn: 380m2 (2 tầng kết nối bằng cầu thang bay đúc thép nguyên khối).',
              'Vật liệu chủ đạo: Đá Travertine Navona, gỗ óc chó tự nhiên FAS, da bò mộc aniline Ý.',
              'Thời gian thi công & may đo nội thất tại xưởng: 150 ngày liên tục.',
            ],
          },
          {
            type: 'image',
            mediaId: m(18),
            caption: 'Cầu thang bay bậc gỗ lơ lửng kết hợp tay vịn da thủ công dẫn lối lên tầng lửng.',
          },
        ],
      },
    },
    {
      slug: 'vat-lieu-ban-dia-trong-kien-truc-duong-dai-travertine-gom-moc',
      title: 'Vật liệu bản địa trong kiến trúc đương đại — Từ gốm mộc Bát Tràng đến đá travertine Bình Thuận',
      excerpt:
        'Hành trình đi tìm bản sắc không gian của GuHomes không nằm ở việc nhập khẩu mọi thứ xa xôi, mà ở sự trân trọng những chất liệu ngàn đời của đất mẹ Việt Nam được mài giũa bằng tư duy thiết kế hiện đại.',
      categoryId,
      authorId,
      status: 'published',
      tags: ['Vật liệu bản địa', 'Gốm Bát Tràng', 'Đá Travertine', 'Thủ công', 'GuHomes'],
      readingMinutes: 8,
      publishedAt: new Date('2026-03-28T08:30:00Z'),
      seo: {
        title: 'Vật Liệu Bản Địa Kiến Trúc Đương Đại | GuHomes Studio',
        description:
          'Khám phá sự giao thoa giữa gốm thủ công vuốt tay, đá tự nhiên bản địa và vữa vôi truyền thống trong các không gian biệt thự & căn hộ cao cấp của GuHomes.',
      },
      content: {
        nodes: [
          {
            type: 'heading',
            level: 2,
            text: 'Bản sắc không gian đến từ cội rễ thổ nhưỡng',
          },
          {
            type: 'paragraph',
            text: 'Trong trào lưu toàn cầu hóa, nhiều ngôi nhà hiện đại rơi vào cái bẫy của sự vô danh (placelessness): một căn hộ ở Sài Gòn trông chẳng khác gì một căn hộ ở Seoul, London hay Dubai. GuHomes tin rằng một không gian chỉ thực sự có hồn khi nó đối thoại chân thành với vùng đất mà nó tọa lạc. Chúng tôi dành nhiều tháng ròng đến thăm những làng nghề gốm cổ truyền, các mỏ đá tự nhiên từ duyên hải miền Trung để tìm kiếm những chất liệu mang đậm linh hồn Việt.',
          },
          {
            type: 'image',
            mediaId: m(21),
            caption: 'Gốm men tro thủ công vuốt tay kết hợp mặt bàn đá cuội mài mộc.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Gốm mộc vuốt tay — Từng vết bấm móng tay của nghệ nhân',
          },
          {
            type: 'paragraph',
            text: 'Những chiếc đèn thả bàn ăn hay bình gốm mộc đặt ở sảnh đón không được đúc bằng khuôn công nghiệp hàng loạt. Nghệ nhân nặn đất sét phù sa sông Hồng trên bàn xoay thủ công, nung ở nhiệt độ 1250°C bằng củi củi nhãn cổ thụ. Mỗi vết rạn men, mỗi đốm tro vô tình đọng lại trên miệng gốm là một minh chứng độc bản của thời gian và lửa.',
          },
          {
            type: 'quote',
            text: 'Chạm tay vào một bức tường vữa vôi trộn rơm hay một vách đá xẻ thô, lòng bàn tay bạn sẽ cảm nhận được hơi thở ấm áp của đất, chứ không phải sự lạnh ngắt của nhựa hay kim loại mạ xi.',
            attribution: 'KTS Sáng Lập GuHomes',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Vữa vôi truyền thống (Lime Plaster) — Bức tường biết thở',
          },
          {
            type: 'paragraph',
            text: 'Vữa vôi là vật liệu hàng đầu thích ứng với khí hậu nhiệt đới gió mùa. Nhờ khả năng thoát ẩm tự nhiên và tính kiềm cao ngăn ngừa nấm mốc hiệu quả, các bức tường hoàn thiện bằng vữa vôi tại GuHomes không bao giờ bị ẩm mốc trong những đợt gió nồm hay mưa ngâu. Bề mặt mờ mịn tựa như làn da, đổi màu nhẹ nhàng theo từng góc chiếu của ánh ban mai.',
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Không phát thải hợp chất hữu cơ dễ bay hơi (Zero VOC) — bảo vệ tuyệt đối đường hô hấp trẻ nhỏ.',
              'Hấp thụ khí CO2 trong không khí trong suốt quá trình vôi hóa kéo dài hàng năm trời.',
              'Tạo hiệu ứng thị giác loang màu tự nhiên, mang lại sự trầm mặc và thư thái vô song.',
            ],
          },
        ],
      },
    },
  ]

  console.log(`Bắt đầu nạp ${articles.length} bài viết cẩm nang chuyên sâu vào Neon DB...`)

  for (const art of articles) {
    const coverMediaId = mediaList[Math.floor(Math.random() * mediaList.length)]!.id

    const existing = await db
      .select({ id: schema.articles.id })
      .from(schema.articles)
      .where(eq(schema.articles.slug, art.slug))

    if (existing.length > 0) {
      console.log(`- Cập nhật bài viết: ${art.slug}`)
      await db
        .update(schema.articles)
        .set({
          title: art.title,
          excerpt: art.excerpt,
          coverMediaId,
          categoryId: art.categoryId,
          authorId: art.authorId,
          status: art.status,
          tags: art.tags,
          readingMinutes: art.readingMinutes,
          seo: art.seo,
          content: art.content as any,
          publishedAt: art.publishedAt,
          updatedAt: new Date(),
        })
        .where(eq(schema.articles.slug, art.slug))
    } else {
      console.log(`- Thêm bài viết mới: ${art.slug}`)
      await db.insert(schema.articles).values({
        slug: art.slug,
        title: art.title,
        excerpt: art.excerpt,
        coverMediaId,
        categoryId: art.categoryId,
        authorId: art.authorId,
        status: art.status,
        tags: art.tags,
        readingMinutes: art.readingMinutes,
        seo: art.seo,
        content: art.content as any,
        publishedAt: art.publishedAt,
      })
    }
  }

  const allRows = await db.select({ id: schema.articles.id, title: schema.articles.title, slug: schema.articles.slug }).from(schema.articles)
  console.log(`✓ Đã nạp thành công! Tổng số bài viết hiện có trong DB: ${allRows.length}`)
  for (const r of allRows) {
    console.log(`  • [${r.slug}] ${r.title}`)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error('Lỗi nạp bài viết:', err)
  process.exit(1)
})
