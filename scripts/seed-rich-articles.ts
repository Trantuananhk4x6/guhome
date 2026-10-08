import { config } from 'dotenv'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { eq, inArray } from 'drizzle-orm'
import type { RichTextDoc, RichTextNode } from '../src/types/content'

interface ArticleSeedItem {
  slug: string
  title: string
  excerpt: string
  coverMediaId: string
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
  content: {
    nodes: Array<
      | { type: 'heading'; level: 2 | 3 | 4; text: string }
      | { type: 'paragraph'; text: string }
      | { type: 'image'; mediaId: string; caption?: string }
      | { type: 'gallery'; mediaIds: string[] }
      | { type: 'video'; mediaId: string }
      | { type: 'quote'; text: string; attribution?: string }
      | { type: 'list'; ordered: boolean; items: string[] }
      | { type: 'projectRef'; projectId: string }
      | { type: 'divider' }
      | Record<string, unknown>
    >
  }
}

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..')
config({ path: join(root, '.env.local') })

async function run() {
  const { db } = await import('../src/server/db/index')
  const schema = await import('../src/server/db/schema')

  // Find or verify author (admin)
  const users = await db.select().from(schema.users).limit(1)
  const authorId = users[0]?.id ?? null

  // Find journal category
  const categories = await db.select().from(schema.categories).where(eq(schema.categories.kind, 'journal'))
  const categoryId = categories[0]?.id ?? null

  console.log(`Author ID: ${authorId}, Category ID: ${categoryId}`)

  // Update theme settings with correct phone and social links
  console.log('Updating themeSettings with valid phone and rich social channels...')
  await db.update(schema.themeSettings).set({
    brand: {
      companyName: 'GuHomes',
      shortName: 'GU',
      tagline: 'Kiến tạo không gian, nâng tầm phong cách sống',
      logoMediaId: '19348918-93fc-4192-b899-19c38c78a92b',
      faviconMediaId: '6e07cb2e-61db-4c80-949c-0d57644233fa',
      email: 'guhomesvn@gmail.com',
      phone: '0368 757 916',
      address: '14 Đường 41, Phường An Khánh, TP. Thủ Đức, TP. Hồ Chí Minh (Xưởng mộc: Thạnh Xuân, Quận 12)',
      social: [
        { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61594054897878' },
        { label: 'Zalo', href: 'https://zalo.me/0368757916' },
        { label: 'YouTube', href: 'https://www.youtube.com/@guconcept' },
        { label: 'Instagram', href: 'https://www.instagram.com/guconcept.vn' },
        { label: 'TikTok', href: 'https://www.tiktok.com/@guconcept' },
        { label: 'Behance', href: 'https://www.behance.net/guhomes' },
        { label: 'Pinterest', href: 'https://www.pinterest.com/guhomes' },
      ],
    },
    updatedAt: new Date(),
  })
  console.log('Theme settings updated successfully!')

  // Rich articles to upsert
  const newArticles: ArticleSeedItem[] = [
    {
      slug: 'thiet-ke-noi-that-penthouse-the-opera-metropole',
      title: 'Thiết kế nội thất Penthouse The Opera Metropole: Đối thoại cùng dòng sông Sài Gòn và ánh sáng đương đại',
      excerpt: 'Tại The Opera Metropole Thủ Thiêm, thử thách lớn nhất không phải là phô diễn sự xa hoa mà là sự tiết chế có chủ đích: làm sao để 320m² thông tầng vừa ôm trọn khúc cong sông Sài Gòn, vừa lưu giữ trọn vẹn sự ấm cúng, tĩnh tại cho gia chủ.',
      coverMediaId: '97d90cde-5f5a-4e5b-af74-8c3813691e3b',
      categoryId,
      authorId,
      status: 'published' as const,
      tags: ['The Metropole Thủ Thiêm', 'Penthouse', 'Nội thất cao cấp', 'Contemporary Luxury', 'GuHomes'],
      readingMinutes: 8,
      publishedAt: new Date('2026-03-15T09:00:00Z'),
      seo: {
        title: 'Thiết kế nội thất Penthouse The Opera Metropole Thủ Thiêm | GuHomes',
        description: 'Dự án nội thất Penthouse The Opera Metropole Thủ Thiêm do GuHomes thiết kế thi công trọn gói: giải pháp vi khí hậu, kính Low-E tràn viền và ngôn ngữ vật liệu độc bản.',
      },
      content: {
        nodes: [
          {
            type: 'paragraph',
            text: 'Tại bán đảo Thủ Thiêm, nơi dòng sông Sài Gòn uốn lượn ôm trọn tầm nhìn về trung tâm Quận 1, The Opera Metropole là biểu tượng đỉnh cao của phong cách sống thượng lưu. Khi nhận đề bài thiết kế căn Penthouse thông tầng diện tích hơn 320m² cho anh Vũ, đội ngũ KTS GuHomes đã đặt ra một câu hỏi cốt lõi: Làm sao để vẻ đẹp choáng ngợp của ngoại cảnh không lấn át sự ấm cúng, riêng tư của một tổ ấm thực thụ?',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Bối cảnh vi khí hậu: Bài toán nắng chiều và hệ vách kính Low-E tràn viền',
          },
          {
            type: 'paragraph',
            text: 'Căn hộ sở hữu dải kính mặt tiền hướng Tây Nam, đón trọn ánh hoàng hôn buông xuống cầu Ba Son. Tuy nhiên, cường độ bức xạ nhiệt tại TP. Hồ Chí Minh đòi hỏi giải pháp xử lý vi khí hậu nghiêm cẩn. GuHomes đã kết hợp hệ rèm âm trần hai lớp tự động, kết hợp cùng lớp đệm không khí và bố trí hệ lam gỗ sồi tự nhiên tại các khoảng thông tầng nhằm tán xạ ánh sáng gắt, chỉ giữ lại những luồng sáng êm dịu nhất rót vào phòng khách.',
          },
          {
            type: 'image',
            mediaId: '631e4c9d-bfa9-45e6-beb6-adc3e4bf883a',
            caption: 'Phối cảnh 3D không gian phòng khách thông tầng Penthouse The Opera Metropole - ánh sáng tự nhiên giao hòa cùng vật liệu đá mộc.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Bảng vật liệu tinh giản: Khi đá Travertine và gỗ óc chó lên tiếng',
          },
          {
            type: 'paragraph',
            text: 'Thay vì lạm dụng kim loại bóng bẩy hay các chi tiết phào chỉ rườm rà, GuHomes chọn ngôn ngữ "Quiet Luxury" - sự sang trọng thầm lặng được thể hiện qua xúc giác và chất lượng gia công đỉnh cao:',
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Đá Travertine Navona nhập khẩu: Bề mặt mài mờ (honed finish) giữ trọn vẹn những lỗ rỗng tự nhiên, tạo cảm giác mộc mạc mà quyền uy cho mảng tường thông tầng cao 6.2 mét.',
              'Gỗ óc chó Bắc Mỹ (FAS grade): Tuyển chọn từng tấm ván có vân cuộn xoáy đồng đều, sấy đạt ẩm độ tiêu chuẩn 10-12% để không bao giờ cong vênh trước gió biển Sài Gòn.',
              'Đồng thau xước mờ thủ công: Điểm xuyết tinh tế ở các tay nắm cửa, chân đế sofa và viền kính lùa, tự động sẫm màu ấm áp theo thời gian tương tác của gia chủ.',
              'Hệ sơn hiệu ứng vữa vôi hữu cơ: Không chứa VOC độc hại, có khả năng hút ẩm tự nhiên và phản xạ ánh sáng đèn 3000K một cách dịu mắt.',
            ],
          },
          {
            type: 'quote',
            text: 'Một không gian sống đẳng cấp không cần phải lớn tiếng chứng minh giá trị. Đẳng cấp thực sự hiển hiện khi gia chủ cởi bỏ đôi giày sau một ngày bận rộn, chạm chân lên sàn gỗ ấm và lắng nghe sự tĩnh lặng tuyệt đối sau cánh cửa kính.',
            attribution: 'KTS Trưởng GuHomes',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Kiểm soát chất lượng: Từ bản vẽ chi tiết đến xưởng mộc Quận 12',
          },
          {
            type: 'paragraph',
            text: 'Toàn bộ đồ rời và hệ tủ âm tường trong công trình được sản xuất trực tiếp tại xưởng mộc của GuHomes tại Thạnh Xuân, Quận 12. Mỗi liên kết mộng gỗ, đường chỉ ron đá 2mm và khe thoát đèn LED đều được triển khai hồ sơ thi công tỉ mỉ tới tỷ lệ 1:5, đảm bảo thực tế hoàn thiện vượt trội so với bản vẽ phối cảnh.',
          },
          {
            type: 'projectRef',
            projectId: 'c1a8bb5a-f7df-4d10-a239-d96c5c6c74b3',
          },
          {
            type: 'paragraph',
            text: 'Quý gia chủ đang sở hữu căn hộ tại The Metropole, Empire City hoặc các dự án ven sông TP. Thủ Đức có thể liên hệ trực tiếp với KTS GuHomes để được khảo sát hiện trạng và tư vấn giải pháp mặt bằng chuyên sâu.',
          },
        ],
      },
    },
    {
      slug: 'wabi-sabi-can-ho-duplex-anh-khoa',
      title: 'Wabi-Sabi trong căn hộ Duplex: Chiều sâu xúc giác của vữa vôi thủ công và ánh sáng hai tầng',
      excerpt: 'Wabi-Sabi tại GuHomes không dừng lại ở màu be nhạt hay chiếc bình gốm mộc, mà là câu chuyện về vật liệu thở cùng khí trời: ba lớp vữa vôi phủ tay, thớ gỗ sồi tự nhiên giữ nguyên vết nứt và khoảng thông tầng ngập tràn nắng mai.',
      coverMediaId: 'e1b232cc-0e45-4fe5-825d-d11595ec1810',
      categoryId,
      authorId,
      status: 'published' as const,
      tags: ['Wabi Sabi', 'Căn hộ Duplex', 'Vữa vôi thủ công', 'Ánh sáng tự nhiên', 'GuHomes'],
      readingMinutes: 7,
      publishedAt: new Date('2026-03-20T10:00:00Z'),
      seo: {
        title: 'Thiết kế căn hộ Duplex Wabi-Sabi thông tầng | GuHomes',
        description: 'Khám phá không gian Wabi Sabi mộc mạc và tĩnh tại trong căn hộ duplex thông tầng do GuHomes may đo: vật liệu tự nhiên, vữa vôi thủ công và ánh sáng tự nhiên.',
      },
      content: {
        nodes: [
          {
            type: 'paragraph',
            text: 'Trong dòng chảy náo nhiệt của đô thị hiện đại, Wabi-Sabi nổi lên như một triết lý sống trân quý vẻ đẹp của sự bất toàn, mộc mạc và dấu ấn của thời gian. Đối với căn hộ Duplex của gia đình anh Khoa, GuHomes đã hiện thực hóa tinh thần ấy không bằng những món đồ trang trí đắt tiền, mà bằng sự chân thực tuyệt đối của vật liệu.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Khoảng thông tầng: Nơi ánh sáng trở thành vật liệu kiến trúc chính',
          },
          {
            type: 'paragraph',
            text: 'Khoảng thông tầng cao gần 6 mét được thiết kế như một giếng sáng trung tâm. Ánh nắng ban mai đi qua hệ lam gỗ sồi, đổ những vệt bóng dài trên nền sàn vi xi măng mài bóng mờ. Vào mỗi thời khắc trong ngày - từ bình minh trong trẻo, buổi trưa rực rỡ đến hoàng hôn màu mật ong - căn phòng như một bức tranh sống động chuyển mình theo tự nhiên.',
          },
          {
            type: 'image',
            mediaId: '7ace332d-0a3f-4d31-a36b-9978c0789154',
            caption: 'Góc nhìn từ tầng lửng xuống phòng khách - sự giao hòa tinh tế giữa gỗ mộc, vải lanh và vữa vôi phủ tay.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Ba lớp vữa vôi thủ công: Bức tường biết thở',
          },
          {
            type: 'paragraph',
            text: 'Khác với lớp sơn công nghiệp phẳng lì và lạnh lẽo, tường vữa vôi thủ công tại dự án này được người thợ GuHomes miết từng nhát bay qua ba công đoạn: lớp lót tạo độ bám, lớp vữa trộn sợi đay chống nứt chân chim và lớp hoàn thiện xoa mịn bằng sáp ong tự nhiên. Bề mặt vôi có độ xốp vi mô, giúp cân bằng độ ẩm phòng khi Sài Gòn bước vào những tháng mưa dầm 80% độ ẩm.',
          },
          {
            type: 'quote',
            text: 'Một vết nứt tự nhiên trên thớ gỗ, một vệt gợn không đều trên mảng tường trát tay không phải là khuyết tật. Đó là hơi thở của sự sống và bàn tay thủ công người thợ, điều mà máy móc rập khuôn không bao giờ sao chép được.',
            attribution: 'Ghi chép công trình GuHomes',
          },
          {
            type: 'projectRef',
            projectId: '9d41b17b-aa4d-4f71-8736-1cd2a11fba0b',
          },
        ],
      },
    },
    {
      slug: 'nhat-ky-thi-cong-nha-pho-the-global-city',
      title: 'Nhật ký thi công The Global City: Kỷ luật công trường và độ chính xác từng milimet của GuHomes',
      excerpt: 'Từ lúc tiếp nhận bàn giao thô đến ngày trao chìa khóa tại The Global City, KTS GuHomes có mặt trực tiếp mỗi tuần để kiểm soát độ phẳng tường, đường ống luồn dây điện và khe co ngót cửa gỗ.',
      coverMediaId: 'aec70178-ce10-4450-88dc-1014ba5c5c88',
      categoryId,
      authorId,
      status: 'published' as const,
      tags: ['The Global City', 'Nhà phố thương mại', 'Kỷ luật công trường', 'Xưởng mộc', 'GuHomes'],
      readingMinutes: 6,
      publishedAt: new Date('2026-03-25T08:30:00Z'),
      seo: {
        title: 'Nhật ký thi công hoàn thiện nhà phố The Global City | GuHomes',
        description: 'Quy trình kiểm soát chất lượng thi công phần thô đến hoàn thiện nội thất nhà phố The Global City của GuHomes: kỷ luật công trường, vật liệu chuẩn mực.',
      },
      content: {
        nodes: [
          {
            type: 'paragraph',
            text: 'The Global City (An Phú, TP. Thủ Đức) là đại đô thị phức hợp với tiêu chuẩn khắt khe bậc nhất từ chủ đầu tư Masterise Homes. Nhận trọng trách thi công hoàn thiện nhà phố 5 tầng cho gia đình chú Phúc, GuHomes xác định: chất lượng công trình không bắt đầu ở lớp sơn bề mặt, mà được quyết định từ cốt thép và hệ cơ điện ngầm sâu trong vách tường.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Giai đoạn phần thô: Những tiêu chuẩn không thỏa hiệp',
          },
          {
            type: 'paragraph',
            text: 'Trước khi bắt tay vào lắp đặt nội thất gỗ, đội ngũ kỹ sư GuHomes tiến hành trắc đạc lại toàn bộ cos sàn, kiểm tra góc vuông bằng laser và xử lý chống thấm ngược 4 lớp cho toàn bộ khu vực vệ sinh và ban công. Mọi đường ống cấp thoát nước đều được test áp lực liên tục 48 giờ ở mức 8 bar nhằm loại bỏ 100% rủi ro rò rỉ sau khi ốp đá.',
          },
          {
            type: 'image',
            mediaId: 'aec70178-ce10-4450-88dc-1014ba5c5c88',
            caption: 'Hiện trường nghiệm thu cốt thép và hệ thống cơ điện ngầm tại The Global City - sự cẩn trọng là nguyên tắc sống còn.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Quy tắc 12 công trình/năm: Đảm bảo KTS đồng hành trực tiếp',
          },
          {
            type: 'paragraph',
            text: 'Tại GuHomes, chúng tôi duy trì mức trần tối đa 12 công trình mỗi năm. Lý do rất rõ ràng: Kiến trúc sư trưởng thiết kế phương án cũng chính là người trực tiếp kiểm tra từng viên gạch lát, từng đường ron đá và đo đạc kích thước thực tế tại công trường mỗi tuần. Chúng tôi không bao giờ giao khoán cho thầu phụ trung gian để giữ vững chữ Tín danh dự.',
          },
          {
            type: 'projectRef',
            projectId: '1b232118-9126-41af-8b19-b90ca964a616',
          },
        ],
      },
    },
    {
      slug: 'thiet-ke-phong-tra-dao-trong-nha-pho-hien-dai',
      title: 'Không gian Trà đạo trong nhà phố hiện đại: Khoảng lặng thiền định giữa lòng đô thị náo nhiệt',
      excerpt: 'Một gian trà thất không chỉ là nơi thưởng thức hương vị trà shan tuyết cổ thụ, mà là chốn neo đậu bình yên của tâm hồn. Khám phá cách GuHomes đưa ánh sáng gián tiếp và gỗ tần bì vào phòng trà Á Đông đương đại.',
      coverMediaId: '255b04c6-977f-4033-9fa1-02e0c3ab81b4',
      categoryId,
      authorId,
      status: 'published' as const,
      tags: ['Phòng trà', 'Văn hóa Á Đông', 'Gỗ tần bì', 'Zen Living', 'GuHomes'],
      readingMinutes: 6,
      publishedAt: new Date('2026-03-28T14:00:00Z'),
      seo: {
        title: 'Thiết kế phòng trà đạo gia đình đẹp và tĩnh tại | GuHomes',
        description: 'Tư vấn thiết kế phòng trà đạo trong nhà phố và biệt thự: phong cách Zen thiền định, vật liệu gỗ tần bì tự nhiên, ánh sáng gián tiếp ấm cúng.',
      },
      content: {
        nodes: [
          {
            type: 'paragraph',
            text: 'Trong nhịp sống gấp gáp của Sài Gòn, ngày càng nhiều gia chủ tìm kiếm một không gian riêng tư để tĩnh tâm, đọc sách hoặc đón tiếp những người bạn tâm giao bên chén trà thơm. Phòng trà đạo không cần diện tích quá lớn - chỉ từ 12 đến 20m² là đủ để kiến tạo một thế giới tách biệt hoàn toàn khỏi khói bụi và tiếng ồn bên ngoài.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Vành trăng tần bì: Ngôn ngữ hình khối lấy cảm hứng từ thiên nhiên',
          },
          {
            type: 'paragraph',
            text: 'Điểm nhấn trung tâm của phòng trà là hệ vách gỗ tần bì uốn cong hình vầng trăng khuyết, phía sau giấu dải đèn LED nhiệt độ màu 2400K mô phỏng ánh trăng rằm. Khi đèn bật sáng, ánh sáng vàng ấm hắt nhẹ lên mảng tường giấy dó dệt tay, mang lại cảm giác bình yên sâu thẳm ngay từ giây phút bước chân qua thềm cửa.',
          },
          {
            type: 'image',
            mediaId: '255b04c6-977f-4033-9fa1-02e0c3ab81b4',
            caption: 'Không gian phòng trà Trăng Trong Vách - sự tối giản chuẩn xác đem lại chiều sâu suy tưởng.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Xử lý âm học và thông gió tự nhiên',
          },
          {
            type: 'paragraph',
            text: 'Để tạo nên sự tĩnh tại hoàn hảo, GuHomes gia cố lớp bông khoáng tiêu âm dày 50mm bên trong hệ vách thạch cao hai lớp, giảm thiểu 85% tiếng ồn vọng từ đường phố. Cùng với đó, cửa trượt Shoji bằng gỗ và giấy can mờ giúp đối lưu luồng khí mát tự nhiên mà không gây gió lùa gắt.',
          },
          {
            type: 'projectRef',
            projectId: 'b952ffc2-32a8-43e6-9e60-8aeffc80695e',
          },
        ],
      },
    },
    {
      slug: 'noi-that-can-ho-my-gia-phu-my-hung-quan-7',
      title: 'Nội thất căn hộ Mỹ Gia Phú Mỹ Hưng: Tối ưu vi khí hậu đón gió sông và nốt trầm gỗ ấm',
      excerpt: 'Với độ ẩm nhiệt đới đặc thù tại khu vực Nam Sài Gòn, GuHomes ứng dụng giải pháp khí hậu bản địa, kết hợp gỗ óc chó Bắc Mỹ sấy đạt chuẩn 10-12% để bảo toàn độ bền cho căn hộ 3 phòng ngủ gia đình.',
      coverMediaId: '7699547d-860a-4457-b7be-9fd98e7425e8',
      categoryId,
      authorId,
      status: 'published' as const,
      tags: ['Phú Mỹ Hưng', 'Quận 7', 'Căn hộ 3 phòng ngủ', 'Gỗ óc chó', 'GuHomes'],
      readingMinutes: 7,
      publishedAt: new Date('2026-04-01T09:15:00Z'),
      seo: {
        title: 'Thiết kế nội thất căn hộ Mỹ Gia Phú Mỹ Hưng Quận 7 | GuHomes',
        description: 'Mẫu thiết kế thi công nội thất căn hộ Mỹ Gia Phú Mỹ Hưng: không gian ấm áp, công năng tối ưu cho gia đình 3 thế hệ, gỗ tự nhiên cao cấp.',
      },
      content: {
        nodes: [
          {
            type: 'paragraph',
            text: 'Tọa lạc tại khu Nam Viên - nơi có mật độ cây xanh và mặt nước cao nhất Phú Mỹ Hưng, căn hộ Mỹ Gia thừa hưởng luồng gió mát lành từ nhánh sông Rạch Đĩa. Đề bài đặt ra cho GuHomes là thiết kế không gian cho gia đình ba thế hệ: vừa ấm áp, sang trọng cho ông bà, vừa tiện nghi hiện đại cho con cái và có góc học tập vui tươi cho cháu nhỏ.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Gỗ óc chó tự nhiên: Sự bền bỉ trước khí hậu cận sông',
          },
          {
            type: 'paragraph',
            text: 'Khu vực gần sông nước tại Quận 7 thường có độ ẩm cao hơn 5-8% so với khu vực trung tâm. Nếu sử dụng gỗ công nghiệp giá rẻ hoặc gỗ tự nhiên chưa đạt độ khô chuẩn, sau hai mùa mưa cánh tủ sẽ bị kẹt hoặc bong tróc mép dán. GuHomes kiên quyết sử dụng gỗ óc chó tự nhiên loại 1, được sấy công nghiệp qua 45 ngày để triệt tiêu toàn bộ ứng suất nội tại, phủ dầu Rubio Monocoat thực vật giữ vân gỗ sống động và an toàn tuyệt đối cho sức khỏe.',
          },
          {
            type: 'image',
            mediaId: '7699547d-860a-4457-b7be-9fd98e7425e8',
            caption: 'Không gian phòng khách căn hộ Mỹ Gia Phú Mỹ Hưng - tone màu gỗ trầm ấm hòa cùng ánh sáng tự nhiên tràn ngập qua ban công.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Quy hoạch mặt bằng mở kết nối gia đình',
          },
          {
            type: 'paragraph',
            text: 'Bằng cách phá bỏ bức tường ngăn chia giữa phòng bếp và phòng ăn, chúng tôi tạo nên một "trái tim" sinh hoạt liền mạch. Đảo bếp kết hợp bàn ăn 8 chỗ trở thành nơi cả gia đình cùng chuẩn bị bữa tối, chuyện trò sau một ngày học tập và làm việc.',
          },
        ],
      },
    },
    {
      slug: 'phong-cach-japandi-giao-thoa-bac-au-va-nhat-ban',
      title: 'Phong cách Japandi trong không gian sống hiện đại: Giao hòa giữa tối giản Bắc Âu và nét mộc Nhật Bản',
      excerpt: 'Japandi là sự kết tinh giữa công năng gọn gàng Scandinavian và tinh thần tôn vinh vật liệu nguyên bản Nhật Bản. Cùng KTS GuHomes khám phá cách phối màu, chọn thớ gỗ và bố trí ánh sáng chuẩn gu.',
      coverMediaId: 'a5a91aca-82b7-4aba-b84d-20e83f3ebc26',
      categoryId,
      authorId,
      status: 'published' as const,
      tags: ['Japandi', 'Scandinavian', 'Tối giản', 'Gỗ sồi', 'GuHomes'],
      readingMinutes: 6,
      publishedAt: new Date('2026-04-03T11:00:00Z'),
      seo: {
        title: 'Phong cách Japandi trong thiết kế nội thất hiện đại | GuHomes',
        description: 'Tìm hiểu phong cách thiết kế nội thất Japandi: sự kết hợp hoàn hảo giữa nét mộc Nhật Bản và tính thực dụng Bắc Âu, mang đến tổ ấm thanh bình.',
      },
      content: {
        nodes: [
          {
            type: 'paragraph',
            text: 'Nếu như phong cách Scandinavian mang lại sự thoáng đãng, ấm cúng (Hygge) thì tinh thần Wabi-Sabi Nhật Bản lại bổ sung chiều sâu triết lý và sự trân trọng những vẻ đẹp mộc mạc. Sự gặp gỡ của hai trường phái này tạo nên phong cách Japandi - một trong những xu hướng nội thất được yêu thích nhất của các gia chủ hiện đại.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Đặc trưng cốt lõi của phong cách Japandi',
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Bảng màu trung tính ấm: Trắng ngà, be cát, xám nhạt kết hợp với nốt trầm của gỗ sồi hoặc tần bì lau dầu tự nhiên.',
              'Đường nét thanh mảnh, hình khối thấp: Bàn ghế và giường ngủ thường có chân thấp sát sàn, tạo cảm giác trần nhà cao thoáng và mở rộng tầm nhìn.',
              'Vật liệu hữu cơ tự nhiên: Chiếu tatami dệt rơm khô, vải linen mộc, mây đan mắt cáo và gốm vuốt tay mộc mạc.',
              'Loại bỏ chi tiết dư thừa: Mỗi món đồ hiện diện trong căn phòng đều phải có công năng sử dụng rõ ràng hoặc mang lại niềm vui tinh thần sâu sắc.',
            ],
          },
          {
            type: 'image',
            mediaId: 'a5a91aca-82b7-4aba-b84d-20e83f3ebc26',
            caption: 'Căn hộ Japandi Bậc Chiếu Mùa Xuân - đường nét tối giản tôn vinh thớ gỗ tự nhiên và sự thoáng đạt.',
          },
        ],
      },
    },
    {
      slug: 'so-sanh-da-travertine-va-da-nung-ket-bep',
      title: 'Đá Travertine và Đá nung kết: Nên chọn vật liệu nào cho mặt bếp và vách trang trí?',
      excerpt: 'So sánh khoa học và kinh nghiệm thực chiến trên công trường giữa vẻ đẹp độc bản của đá vôi tự nhiên Travertine và độ cứng vượt trội của đá nung kết Sintered Stone thế hệ mới.',
      coverMediaId: 'b60adb93-9109-41cd-98c0-d1e6511a84f2',
      categoryId,
      authorId,
      status: 'published' as const,
      tags: ['Vật liệu', 'Đá Travertine', 'Đá nung kết', 'Bếp', 'GuHomes'],
      readingMinutes: 7,
      publishedAt: new Date('2026-04-05T15:30:00Z'),
      seo: {
        title: 'So sánh đá Travertine và đá nung kết ốp bếp | GuHomes',
        description: 'Nên chọn đá Travertine tự nhiên hay đá nung kết cho mặt bếp và vách tivi? Phân tích chi tiết độ bền, khả năng chống ố, chịu nhiệt và thẩm mỹ.',
      },
      content: {
        nodes: [
          {
            type: 'paragraph',
            text: 'Trong một căn nhà cao cấp, mặt đá đảo bếp và vách trang trí phòng khách thường chiếm từ 15-25% tổng chi phí gói hoàn thiện nội thất. Việc lựa chọn sai chủng loại đá có thể dẫn đến hiện tượng ố vàng vì nước chanh, mẻ cạnh khi va đập hoặc ngấm nước sau một năm sử dụng. Dưới đây là phân tích chi tiết từ xưởng gia công đá của GuHomes.',
          },
          {
            type: 'heading',
            level: 2,
            text: '1. Đá Travertine (Đá vôi tự nhiên trầm tích)',
          },
          {
            type: 'paragraph',
            text: 'Đá Travertine được hình thành qua hàng ngàn năm từ các suối khoáng nóng, mang vẻ đẹp hoang sơ với những lỗ rỗng tự nhiên đặc trưng. Đây là loại đá từng xây dựng nên Đấu trường Colosseum tại Rome.',
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Ưu điểm: Vẻ đẹp phong sương, chiều sâu thị giác độc bản không tấm nào trùng lặp, giữ nhiệt tốt, sờ vào rất đầm ấm.',
              'Nhược điểm: Độ xốp cao, dễ thấm dầu mỡ nếu không được trám keo epoxy chuyên dụng và quét phủ chống thấm định kỳ 12 tháng/lần.',
              'Khu vực khuyên dùng: Vách tivi, ốp lò sưởi giả, đảo trà khô, bàn console lối vào.',
            ],
          },
          {
            type: 'heading',
            level: 2,
            text: '2. Đá nung kết (Sintered Stone / Porcelain khổ lớn)',
          },
          {
            type: 'paragraph',
            text: 'Đá nung kết được tạo thành từ bột khoáng tự nhiên, ép dưới áp lực 25.000 tấn và nung ở nhiệt độ trên 1.200°C, mô phỏng quá trình hình thành đá magma sâu trong lòng đất.',
          },
          {
            type: 'list',
            ordered: false,
            items: [
              'Ưu điểm: Độ hút nước < 0.05% (chống ố tuyệt đối), chịu nhiệt độ cao đặt được chảo nóng trực tiếp, độ cứng Mohs cấp 7 chống trầy xước dao kéo.',
              'Nhược điểm: Đòi hỏi máy cắt CNC tia nước chuyên dụng để vát mòi 45 độ, nếu thợ tay nghề yếu rất dễ mẻ mép ghép.',
              'Khu vực khuyên dùng: Mặt bếp nấu, chậu rửa âm đá đúc, mặt bàn ăn hàng ngày, sàn phòng tắm.',
            ],
          },
          {
            type: 'quote',
            text: 'Lời khuyên của GuHomes: Hãy dùng đá nung kết cho mặt bàn bếp nơi dầu mỡ và nhiệt độ thử thách mỗi ngày, và dành đá Travertine cho vách tường phòng khách nơi ánh đèn rọi vào khoe trọn từng thớ trầm tích tự nhiên.',
            attribution: 'Bộ phận Vật liệu GuHomes',
          },
        ],
      },
    },
    {
      slug: 'nghe-thuat-chieu-sang-da-tang-layered-lighting',
      title: 'Quy chuẩn chiếu sáng đa tầng (Layered Lighting): Đánh thức cảm xúc thị giác sau 6 giờ tối',
      excerpt: 'Một căn phòng chỉ có một bóng đèn trần sẽ mãi phẳng lặng và thiếu chiều sâu. Tìm hiểu cách KTS GuHomes kết hợp ba tầng sáng: Ambient, Task và Accent để biến ngôi nhà thành một tác phẩm nghệ thuật sau hoàng hôn.',
      coverMediaId: '3070203a-d43c-4be3-80d1-be5bed18b844',
      categoryId,
      authorId,
      status: 'published' as const,
      tags: ['Ánh sáng', 'Layered Lighting', 'Cảm xúc', 'Nội thất sang trọng', 'GuHomes'],
      readingMinutes: 7,
      publishedAt: new Date('2026-04-07T18:00:00Z'),
      seo: {
        title: 'Quy chuẩn chiếu sáng đa tầng Layered Lighting nội thất | GuHomes',
        description: 'Bí quyết thiết kế ánh sáng nội thất đa tầng (Layered Lighting) chuẩn chuyên gia: nhiệt độ màu 2700K-3000K, chỉ số CRI > 95, tạo chiều sâu cảm xúc.',
      },
      content: {
        nodes: [
          {
            type: 'paragraph',
            text: 'Khi mặt trời lặn sau những tòa nhà chọc trời, ánh sáng nhân tạo chính thức đảm nhận vai trò định hình không gian sống. Một thiết kế nội thất xuất sắc có thể bị phá hỏng hoàn toàn nếu chỉ dùng những bóng đèn tuýp trắng chói chang 6500K chiếu thẳng từ đỉnh đầu xuống sàn. Tại GuHomes, ánh sáng được xem là một loại vật liệu vô hình nhưng quyền năng nhất.',
          },
          {
            type: 'heading',
            level: 2,
            text: 'Ba tầng ánh sáng trong kiến trúc chuẩn mực',
          },
          {
            type: 'list',
            ordered: true,
            items: [
              'Tầng sáng bao quanh (Ambient Light): Ánh sáng nền tổng thể tạo sự dễ chịu, thường đến từ các hắt khe trần thạch cao hoặc đèn chiếu gián tiếp, tuyệt đối không gây lóa mắt.',
              'Tầng sáng công năng (Task Light): Đèn rọi hội tụ tại đảo bếp, đèn đọc sách đầu giường, đèn gương trang điểm với góc chiếu hẹp 24-36 độ.',
              'Tầng sáng cảm xúc (Accent Light): Đèn spotlight rọi tranh nghệ thuật, hắt khe tủ rượu hoặc chân tường, làm nổi bật đường vân đá và kết cấu xúc giác của vật liệu.',
            ],
          },
          {
            type: 'heading',
            level: 2,
            text: 'Chỉ số hoàn màu CRI > 95 và nhiệt độ màu 2700K - 3000K',
          },
          {
            type: 'paragraph',
            text: 'Chúng tôi chỉ định chip LED có chỉ số hoàn màu CRI (Color Rendering Index) tối thiểu từ 95 trở lên. Dưới nguồn sáng chuẩn, màu sắc tự nhiên của món ăn trên bàn ăn, sắc da hồng hào của người thân và vân gỗ óc chó mới được tái hiện một cách chân thực và quyến rũ nhất.',
          },
        ],
      },
    },
  ]

  console.log(`Inserting/Upserting ${newArticles.length} master articles...`)

  for (const art of newArticles) {
    // Check if slug exists
    const existing = await db.select({ id: schema.articles.id }).from(schema.articles).where(eq(schema.articles.slug, art.slug))
    if (existing.length > 0) {
      console.log(`- Updating article: ${art.slug}`)
      await db.update(schema.articles).set({
        title: art.title,
        excerpt: art.excerpt,
        coverMediaId: art.coverMediaId,
        categoryId: art.categoryId,
        authorId: art.authorId,
        status: art.status,
        tags: art.tags,
        readingMinutes: art.readingMinutes,
        seo: art.seo,
        content: art.content as unknown as RichTextDoc,
        publishedAt: art.publishedAt,
        updatedAt: new Date(),
      }).where(eq(schema.articles.slug, art.slug))
    } else {
      console.log(`- Inserting new article: ${art.slug}`)
      await db.insert(schema.articles).values({
        slug: art.slug,
        title: art.title,
        excerpt: art.excerpt,
        coverMediaId: art.coverMediaId,
        categoryId: art.categoryId,
        authorId: art.authorId,
        status: art.status,
        tags: art.tags,
        readingMinutes: art.readingMinutes,
        seo: art.seo,
        content: art.content as unknown as RichTextDoc,
        publishedAt: art.publishedAt,
      })
    }
  }

  const allArts = await db.select({ count: schema.articles.id }).from(schema.articles)
  console.log(`All articles count in Neon DB: ${allArts.length}`)
  console.log('Seed completed successfully!')
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed articles error:', err)
  process.exit(1)
})
