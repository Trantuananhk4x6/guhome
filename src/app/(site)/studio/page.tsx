import type { Metadata } from 'next'

import { TactileMaterialLab } from '@/components/sections/TactileMaterialLab'
import { TenEngineeringNormsSection } from '@/components/sections/TenEngineeringNormsSection'
import { StudioSocialShowcaseSection } from '@/components/studio/StudioSocialShowcaseSection'
import { WoodshopTourSection } from '@/components/studio/WoodshopTourSection'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buildMetadata } from '@/lib/seo'
import { pad2 } from '@/lib/utils'
import { getPublishedProjects } from '@/server/queries/projects'
import { getMaterials } from '@/server/queries/site'
import type { ProjectSummary } from '@/types/content'

import { ImageFrame } from './_components/ImageFrame'
import { Reveal, TextReveal } from './_components/motion'

export const metadata: Metadata = buildMetadata({
  title: 'Studio — Tầm nhìn, Sứ mệnh, 06 Giá trị cốt lõi & Xưởng mộc 1.200m²',
  description:
    'GuHomes làm nội thất và kiến trúc ở TP. Hồ Chí Minh từ năm 2016 với xưởng mộc 1.200m² tại Thạnh Xuân, Quận 12. Mười hai công trình một năm là trần. Cùng một KTS Trưởng đồng hành từ buổi đầu đến ngày tháo giàn giáo.',
  path: '/studio',
})

/* --------------------------------- content -------------------------------- */

const STUDIO_ANCHORS: readonly { code: string; label: string; href: string }[] = [
  { code: '01', label: 'Cách nghĩ', href: '#cach-nghi' },
  { code: '02', label: 'Tầm nhìn & Sứ mệnh', href: '#tam-nhin-su-menh' },
  { code: '03', label: '06 Giá trị cốt lõi', href: '#gia-tri-cot-loi' },
  { code: '04', label: 'Kênh FB/TikTok & 06 Dự án lên sóng', href: '#kenh-truyen-thong' },
  { code: '05', label: 'Quy trình 4 bước', href: '#quy-trinh' },
  { code: '06', label: 'Nguyên tắc & Vật liệu', href: '#nguyen-tac-vat-lieu' },
]

const FACTS: readonly { label: string; value: string }[] = [
  { label: 'Thành lập', value: '2016 · Trụ sở An Khánh & Xưởng mộc 1.200m² Thạnh Xuân, Quận 12' },
  { label: 'Địa bàn', value: 'TP. Hồ Chí Minh, và các tỉnh thành phía Nam khi công trình đủ duyên' },
  { label: 'Chuyên sâu', value: 'Thiết kế kiến trúc, thi công & sản xuất nội thất may đo trọn gói' },
  { label: 'Nhịp làm việc', value: 'Mười hai công trình một năm: Đủ để KTS Trưởng có mặt tại công trường mỗi tuần' },
]

interface Pillar {
  badge: string
  code: string
  title: string
  lead: string
  body: string
  commitments: readonly { index: string; text: string }[]
}

const VISION_DATA: Pillar = {
  badge: '01 · Tầm nhìn dài hạn (Vision)',
  code: 'ARCH-DIPTYCH / 01',
  title: 'Trở thành studio kiến trúc và nội thất may đo biểu tượng tại Việt Nam.',
  lead: 'Tiên phong định hình chuẩn mực không gian sống nguyên bản: mỗi ngôi nhà là một thực thể độc bản, hòa quyện vi khí hậu nhiệt đới, lưu giữ nếp sống riêng ("đúng Gu") và trường tồn cùng năm tháng.',
  body: 'GuHomes không đo lường sự thành công bằng số lượng công trình trải dài khắp thành phố, mà bằng chiều sâu cảm xúc và độ bền vật lý trong từng mét vuông được tạo tác. Chúng tôi kiên định theo đuổi con đường thủ công chuẩn mực: nơi thẩm mỹ không lấn át con người, nơi vật liệu mộc được thở cùng khí trời, và nơi mỗi góc nhà trở thành chốn neo đậu bình yên, cùng gia đình đi qua bao biến chuyển của cuộc đời một cách thanh lịch và ấm áp.',
  commitments: [
    {
      index: '01.1',
      text: 'Thiết kế "may đo" cá nhân hóa: Tôn trọng thói quen sinh hoạt và nếp sống thật của từng thành viên, không sao chép mặt bằng mẫu.',
    },
    {
      index: '01.2',
      text: 'Thích ứng vi khí hậu Sài Gòn: Đón gió đối lưu tự nhiên, kiểm soát bức xạ nắng hướng Tây và chống ẩm 75–80% bền bỉ.',
    },
    {
      index: '01.3',
      text: 'Vật liệu tự nhiên lên nước theo thời gian: Tuyển chọn gỗ tự nhiên sấy chuẩn EMC 10–12%, đá Travertine nguyên lỗ thở và vữa vôi thủ công.',
    },
    {
      index: '01.4',
      text: 'Mô hình trọn gói khép kín: Từ ý niệm kiến trúc đến xưởng mộc gia công trực tiếp 1.200m² tại Thạnh Xuân, Quận 12.',
    },
  ],
}

const MISSION_DATA: Pillar = {
  badge: '02 · Sứ mệnh phụng sự (Mission)',
  code: 'ARCH-DIPTYCH / 02',
  title: 'Phụng sự tổ ấm bằng sự tử tế, dự toán minh bạch và kỷ luật xưởng mộc.',
  lead: 'Chuyên sâu thiết kế, thi công, cung cấp và lắp đặt nội thất trọn gói theo yêu cầu của khách hàng: Bằng sự tận tâm chân thành, quy trình minh bạch rõ ràng và kỷ luật công trường nghiêm cẩn.',
  body: 'Sứ mệnh của GuHomes là hiện thực hóa trọn vẹn giấc mơ tổ ấm của gia chủ, giải phóng bạn khỏi mọi âu lo, căng thẳng và sự bất an thường trực trong hành trình xây dựng. Bằng xưởng gia công mộc trực tiếp 1.200m² tại Thạnh Xuân, Quận 12, hồ sơ kỹ thuật 1:5 rõ ràng từ bản vẽ đến ngày lắp đặt hoàn thiện, và sự tận tâm với từng mối ghép mộng gỗ, chúng tôi trao gửi một không gian sống đủ ấm cúng để trở về, đủ tĩnh lặng để lắng nghe chính mình.',
  commitments: [
    {
      index: '02.1',
      text: 'Dự toán minh bạch tuyệt đối: Bóc tách khối lượng trước khi vẽ 3D, không chi phí ẩn, không phát sinh bất ngờ.',
    },
    {
      index: '02.2',
      text: 'Xưởng mộc 1.200m² Thạnh Xuân, Quận 12: Trực tiếp sản xuất, lắp dựng thử (Dry-fit) 100% và kiểm soát dung sai laser ≤ 1.0mm.',
    },
    {
      index: '02.3',
      text: 'Hồ sơ kỹ thuật 1:5 đồng bộ: Khớp nối chính xác giữa hệ thống cơ điện (MEP), trần – sàn và đồ gỗ nội thất may đo.',
    },
    {
      index: '02.4',
      text: 'Cùng một KTS Trưởng đồng hành: Từ buổi lắng nghe đầu tiên đến ngày nghiệm thu ánh sáng 2700K và trao chìa khóa bàn giao.',
    },
  ],
}

interface CoreValue {
  number: string
  tag: string
  title: string
  subtitle: string
  body: string
  proof: string
}

const CORE_VALUES: readonly CoreValue[] = [
  {
    number: '01',
    tag: 'TÂM & TÍN',
    title: 'Chữ Tín Làm Gốc',
    subtitle: 'Nói thật, làm thật và chịu trách nhiệm đến cùng.',
    body: 'Chữ Tín là sinh mệnh của GuHomes. Giữa một thị trường nhiều lời hứa hoa mỹ, chúng tôi chọn minh bạch từng con số dự toán ngay từ buổi đầu, không giấu chi phí và không vẽ thêm thứ không phục vụ đời sống gia chủ. Đã cam kết loại gỗ, mã đá nào thì nhập đúng chuẩn loại đó; đã hẹn ngày dọn vào thì không để gia chủ phải chờ.',
    proof: '100% vật tư có biên bản nghiệm thu phôi đầu vào trước khi gia công',
  },
  {
    number: '02',
    tag: 'ĐỘC BẢN',
    title: 'Đúng "Gu" Nếp Sống Thật',
    subtitle: 'May đo theo nếp sống thật, không sao chép khuôn mẫu có sẵn.',
    body: 'Không có căn nhà thứ hai giống căn nhà của bạn. GuHomes không áp đặt cái tôi của kiến trúc sư lên người ở, mà kiên nhẫn ngồi nghe bạn kể về thói quen sinh hoạt: bữa tối thích quây quần ở bàn ăn hay đảo bếp, ai là người về sau cùng bật ngọn đèn nào. Chúng tôi chép lại và chuyển hóa thành ngôn ngữ không gian độc bản của riêng bạn.',
    proof: 'Không tái sử dụng rập khuôn bất kỳ bản vẽ mặt bằng nào',
  },
  {
    number: '03',
    tag: 'KỶ LUẬT 1:5',
    title: 'Chuẩn Mực Từng Milimet',
    subtitle: 'Vẽ tới chỗ người thợ không còn phải đoán; chế tác tại xưởng 1.200m².',
    body: 'Tại GuHomes, từng khe co ngót gỗ óc chó tự nhiên, đường chỉ ron đá 2mm, đến hướng vân khi ghép hai tấm ván đều được quy định chặt chẽ trên bản vẽ tỷ lệ 1:5. Cùng với xưởng sản xuất nội thất 1.200m² tại Thạnh Xuân, Quận 12 và 18 nghệ nhân mộc, chúng tôi kiểm soát chất lượng để sản phẩm thực tế sắc sảo hơn cả phối cảnh 3D.',
    proof: 'Dung sai mạch ghép kiểm định bằng máy bắn cốt laser ≤ 1.0mm',
  },
  {
    number: '04',
    tag: 'VI KHÍ HẬU',
    title: 'Thấu Hiểu Vi Khí Hậu Sài Gòn',
    subtitle: 'Thiết kế thích ứng với nắng gắt hướng Tây và độ ẩm 80% của Sài Gòn.',
    body: 'Độ ẩm 75–80% quanh năm và bức xạ nhiệt mặt tiền hướng Tây là đề bài cốt lõi của mọi công trình tại TP.HCM. GuHomes giải quyết từ gốc bằng lớp vỏ đệm kiến trúc, lam chắn nắng, khe thông hơi giấu sau nan tủ áo và hệ thống đối lưu khí tươi tự nhiên xuyên phòng.',
    proof: 'Giảm 3.0–3.5°C nhiệt độ bề mặt nội thất hướng chịu nắng gắt',
  },
  {
    number: '05',
    tag: 'NGUYÊN BẢN',
    title: 'Tôn Trọng Vật Liệu Thật',
    subtitle: 'Đá Travertine nguyên lỗ thở, gỗ sấy chuẩn 10–12% và dầu hữu cơ 0% VOC.',
    body: 'Chúng tôi ưu tiên những vật liệu có lỗ thở tự nhiên và lên nước (Patina) đẹp theo thời gian: gỗ óc chó Bắc Mỹ, gỗ sồi trắng xử lý xà phòng, vữa vôi xoa tay, đồng thau mộc và dầu lau gỗ hữu cơ Osmo (Đức) không chứa dung môi độc hại — an toàn tuyệt đối cho sức khỏe gia đình.',
    proof: 'Độ ẩm cốt gỗ xuất xưởng kiểm định nghiêm ngặt ở ngưỡng EMC 10–12%',
  },
  {
    number: '06',
    tag: 'TRỌNG TÂM',
    title: 'Tận Tâm Trọn Vẹn (12 Công Trình/Năm)',
    subtitle: 'Giới hạn số lượng dự án để cùng một KTS Trưởng theo sát đến ngày cuối.',
    body: 'Mười hai công trình mỗi năm là mức trần tự nguyện của GuHomes. Người ngồi lắng nghe những băn khoăn của bạn hôm đầu cũng là người leo giàn giáo kiểm tra khe co ngót, mối nối gỗ vào tháng thứ tám, kèm chế độ bảo hành kỹ thuật và bảo trì định kỳ tận tâm.',
    proof: 'Bảo hành kỹ thuật 24 tháng & Bảo trì định kỳ 06 tháng/lần',
  },
]

const PHILOSOPHY: readonly string[] = [
  'Một chiều tháng Sáu, mưa xuống ngay lúc đang đo dở, và trong mười phút cả căn hộ đổi màu. Ánh sáng ngoài trời rút về một thứ xám phẳng lì, không còn cái bóng đổ nào để giấu đi thứ gì. Mảng vữa nào loang thì lúc ấy hiện ra hết. Chúng tôi hay đợi cho tạnh rồi mới đo tiếp, vì mười phút đó nói được nhiều hơn cả buổi sáng hôm trước.',
  'Có một cái mùi mà căn hộ nào ở đây đóng cửa một tuần cũng có. Nó bám vào rèm trước, rồi mới tới lớp giấy lót trong ngăn kéo. Vì cái mùi ấy mà studio không đóng tủ áo kín bưng bao giờ, và phòng tắm trong hồ sơ của chúng tôi luôn có một khe thông hơi nào đó, giấu sau nan gỗ nếu cần. Sàn thì có tiếng của nó. Gạch bóng khuếch đại từng bước chân; gỗ nuốt bớt đi. Không ai đưa chuyện ấy vào bản yêu cầu thiết kế, và ai cũng nhận ra nó trong tuần đầu tiên dọn vào.',
  'Một mảng tường không treo gì không phải là chỗ chưa làm xong. Ở lần duyệt cuối, thứ bị gạch khỏi bản vẽ bao giờ cũng nhiều hơn thứ được thêm vào.',
  'Nhưng phần khó nhất nằm ở những câu không có trong bảng khảo sát nào. Ai là người về sau cùng, và người đó bật ngọn đèn nào trước tiên. Bữa tối ăn ở bàn, hay ăn đứng ở đảo bếp vì đứng thì nhanh hơn và không ai phải dọn. Cánh cửa nào trong nhà chưa bao giờ có ai đóng. Một ngôi nhà tốt không bắt người ở học lại cách sống của chính mình, nên chúng tôi hỏi hết trong buổi đầu và chép lại gần như nguyên văn, nhất là những chỗ hai vợ chồng trả lời khác nhau.',
]

interface ProcessStep {
  title: string
  duration: string
  body: string
  output: string
}

const PROCESS: readonly ProcessStep[] = [
  {
    title: 'Lắng nghe',
    duration: '2-3 tuần',
    body: 'Buổi đầu thường có một khoảng lặng, và nó luôn rơi đúng lúc hỏi về tiền. Gia chủ nhìn đi chỗ khác, rồi đưa ra một con số tròn trịa mà chính họ cũng biết là chưa thật. Chúng tôi không ép. Nhưng ngân sách nói càng muộn thì càng phải vẽ lại nhiều, nên đến cuối buổi thế nào cũng có người hỏi lại, nhẹ hơn. Hai tiếng còn lại trôi đi trong thước dây và máy đo laser, trừ một quãng chúng tôi chỉ ngồi im nghe hai vợ chồng cãi nhau rất lịch sự về chuyện có nên bỏ cái bồn tắm. Quãng đó thường có ích hơn phần đo đạc.',
    output: 'Bản đo hiện trạng · một trang tóm tắt đề bài · khung ngân sách tách theo hạng mục.',
  },
  {
    title: 'Phác thảo',
    duration: '3-4 tuần',
    body: 'Hai phương án mặt bằng, không bao giờ ba. Ba phương án nghĩa là chưa cái nào đủ chắc, và nó đẩy phần khó nhất sang cho bạn. Cùng với bản vẽ là một hộp mẫu thật, mang tới chính căn phòng sẽ dùng nó, vào buổi chiều. Miếng laminate cầm trên tay dưới nắng bốn giờ có màu khác hẳn nó trên màn hình, và khác cả chính nó dưới đèn showroom. Bếp thì phải chốt ngay trong giai đoạn này. Dời cái bồn rửa đi bốn mươi phân thôi là đường nước dưới sàn lẫn ống hút mùi trên trần đều phải vẽ lại, mà động tới ống hút mùi thì kéo theo cả trần thạch cao.',
    output: 'Hai mặt bằng bố trí · hộp mẫu vật liệu để lại nhà bạn.',
  },
  {
    title: 'Chi tiết',
    duration: '4-6 tuần',
    body: 'Đây là giai đoạn hồ sơ dày lên và tiến độ chậm lại. Bản vẽ đi tới mức người thợ không còn phải đoán gì nữa; khe hở giữa hai cánh tủ được ghi thành một con số, và hướng vân khi ghép hai tấm gỗ cũng được vẽ ra. Rồi tới đoạn phải chờ. Vữa trát tay cần chừng một tháng mới ngừng co ngót, và một mã veneer hết lô là cả bảng vật liệu phải mở ra xem lại. Không ai sai cả. Nhưng lịch vẫn lùi, nên chúng tôi nói trước những chỗ ấy ngay từ bây giờ, để đến lúc đó bạn khỏi phải ngồi nghe một lời giải thích.',
    output: 'Hồ sơ thi công nội thất · shop drawing cho từng hạng mục khó · bảng vật tư có mã hàng.',
  },
  {
    title: 'Ra công trường',
    duration: '4-7 tháng',
    body: 'Bốn đến bảy tháng ấy phần lớn là bụi và tiếng máy cắt vọng lên từ tầng dưới. Chúng tôi có mặt mỗi tuần một buổi, và cả ngày vào những hôm mà làm sai thì không sửa lại được. Rồi đến ngày cuối, và ngày cuối không giống bất kỳ ngày nào trước nó. Sáng hôm ấy chúng tôi đến sớm, tắt hết đèn trần, rồi ngồi đợi tới sáu giờ chiều mới bật lại từng ngọn một, chỉnh độ mở của rèm cho đến khi căn phòng đứng yên. Gia chủ vào sau đó chừng mười lăm phút. Họ thường không nói gì trong hai phút đầu, và chúng tôi đã học được cách đứng im trong hai phút đó.',
    output: 'Biên bản nghiệm thu có ảnh · một buổi styling · sổ tay bảo trì cho từng loại vật liệu · số điện thoại của người thợ đã đi phần điện.',
  },
]

interface Principle {
  title: string
  body: string
}

const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Một người theo suốt',
    body: 'Người ngồi với bạn ở buổi đầu cũng là người leo giàn giáo soi mối nối vào tháng thứ tám. Giữa hai buổi ấy không có một cuộc bàn giao nội bộ nào để câu bạn dặn rơi mất dọc đường.',
  },
  {
    title: 'Nói giá trước khi vẽ',
    body: 'Khung chi phí tách theo hạng mục được gửi ngay sau buổi khảo sát. Đổi từ đá nhân tạo sang đá tự nhiên thì con số chênh nằm trong hộp thư của bạn ngay tuần đó, lúc còn kịp đổi ý.',
  },
  {
    title: 'Vẽ tới chỗ không ai phải đoán',
    body: 'Một bộ hồ sơ chặt tiết kiệm nhiều tiền hơn mọi cuộc mặc cả với nhà thầu. Nó cũng giữ chất lượng khỏi phụ thuộc vào trí nhớ của người thợ có mặt hôm ấy. Hồ sơ ở lại; người thợ thì đổi.',
  },
  {
    title: 'Mười hai công trình một năm',
    body: 'Con số đó là trần, không phải chỉ tiêu. Giữ được nó thì tháng nào cũng còn đủ buổi để đứng ở công trường; vượt qua nó thì công trình của bạn bắt đầu đi qua màn hình điện thoại lúc mười giờ đêm, và chúng tôi biết rõ chuyện đó dẫn tới đâu.',
  },
  {
    title: 'Không có mẫu nhà',
    body: 'Chúng tôi không mang phương án của gia đình này sang nhà gia đình khác, ngay cả khi hai căn cùng một mặt bằng chủ đầu tư và cùng hướng cửa.',
  },
  {
    title: 'Từ chối sớm',
    body: 'Lời từ chối, nếu có, sẽ đến ngay trong buổi gặp đầu. Ba tuần im lặng cũng là một câu trả lời, chỉ là một câu trả lời tệ. Danh sách đầy đủ nằm ở trang dịch vụ; ở đây bạn chỉ cần biết là nó dài.',
  },
]

const FALLBACK_MATERIALS: readonly { name: string; description: string }[] = [
  {
    name: 'Gỗ óc chó',
    description:
      'Đi vào mặt bàn và hệ tủ trung tâm, chỗ tay người chạm nhiều nhất, vì đó cũng là chỗ nó đẹp lên chứ không xấu đi.',
  },
  {
    name: 'Đá travertine',
    description:
      'Lỗ rỗ tự nhiên giữ ánh sáng lại trong lòng đá. Chỗ nào hay ướt thì phải trám trước, và trám rồi vẫn nên lau khô.',
  },
  {
    name: 'Vữa vôi phủ tay',
    description:
      'Sắc độ mỗi mảng tường lệch nhau một chút. Đó là dấu bay, không phải lỗi.',
  },
  {
    name: 'Đồng thau',
    description:
      'Chừng hai năm nữa, cái tay nắm bạn cầm mỗi ngày sẽ sáng lên trong khi phần còn lại xỉn xuống thành một màu ấm hơn hôm lắp.',
  },
  {
    name: 'Vải lanh mộc',
    description: 'Ngồi lâu thì nhăn. Chúng tôi chọn nó chính vì thế.',
  },
  {
    name: 'Sồi trắng xử lý xà phòng',
    description:
      'Sàn giữ được sắc nhạt qua nhiều năm, và sáng sớm đi chân trần vẫn thấy ấm dưới lòng bàn chân.',
  },
]

/* ---------------------------------- page ---------------------------------- */

function captionFor(project?: ProjectSummary): string {
  if (!project) return ''
  return [project.title, project.location].filter((part): part is string => Boolean(part)).join(' · ')
}

function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise.catch(() => fallback),
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ])
}

export default async function StudioPage() {
  const [featured, materials] = await Promise.all([
    withTimeout(getPublishedProjects({ featured: true, limit: 6 }), 1500, [] as ProjectSummary[]),
    withTimeout(getMaterials(), 1500, []),
  ])
  const projects = featured

  const hero = projects[0]
  const portrait = projects[1]
  const wide = projects[2]

  return (
    <div className="pb-[var(--spacing-section)]">
      {/* ---------------------------------- hero --------------------------------- */}
      <section className="u-gutter pt-28 md:pt-32">
        <div className="mx-auto w-full max-w-[110rem]">
          <Label rule index="-">
            Studio
          </Label>

          <TextReveal as="h1" className="u-display mt-10 max-w-[16ch] text-ink">
            Cùng một người, từ buổi gặp đầu đến hôm tháo giàn giáo.
          </TextReveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <Reveal delay={0.15} className="lg:col-span-6">
              <p className="u-body-lg max-w-[52ch]">
                GuHomes làm nội thất và kiến trúc ở TP. Hồ Chí Minh từ năm 2016. Phần lớn công
                việc là căn hộ nhận bàn giao thô và nhà phố một mặt tiền; thỉnh thoảng có một quán
                ăn nhỏ chỉ mở buổi tối. Studio nhận tối đa mười hai công trình một năm, đủ để người
                ngồi nghe bạn hôm đầu vẫn là người có mặt hôm thợ ghép tấm đá bếp đầu tiên. Nhiều
                hơn thì hỏng.
              </p>
            </Reveal>

            <Reveal delay={0.25} stagger={0.08} className="lg:col-span-5 lg:col-start-8">
              <dl>
                {FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    data-reveal-item
                    className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1.5 sm:gap-6 border-t border-line py-4 sm:py-5"
                  >
                    <dt className="u-label">{fact.label}</dt>
                    <dd className="font-body text-[0.9375rem] text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <Rule />
            </Reveal>
          </div>

          {/* Quick Anchor Navigation Bar */}
          <nav
            aria-label="Điều hướng nhanh trang Studio"
            className="mt-10 sm:mt-14 border-y border-line bg-surface/70 px-4 py-4 sm:px-6"
          >
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3">
              <span className="u-label text-accent">Mục lục hồ sơ Studio:</span>
              <ul className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-6 gap-y-2.5">
                {STUDIO_ANCHORS.map((anchor) => (
                  <li key={anchor.code}>
                    <a
                      href={anchor.href}
                      className="group inline-flex items-center gap-2 font-body text-[0.875rem] text-ink/80 transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-[0.75rem] font-semibold text-accent">
                        {anchor.code}
                      </span>
                      <span className="underline decoration-transparent underline-offset-4 transition-all group-hover:decoration-accent">
                        {anchor.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>

      {hero ? (
        <section className="u-gutter mt-[calc(var(--spacing-section)*0.7)]">
          <div className="mx-auto w-full max-w-[110rem]">
            <ImageFrame
              media={hero.cover}
              alt={hero.cover?.alt ?? `${hero.title} - không gian do GuHomes thiết kế`}
              ratio="aspect-[16/9]"
              sizes="(min-width: 1024px) 92vw, 100vw"
              width={2400}
              priority
              caption={captionFor(hero)}
            />
          </div>
        </section>
      ) : null}

      {/* ------------------------------- philosophy ------------------------------ */}
      <section id="cach-nghi" className="u-gutter mt-[var(--spacing-section)] scroll-mt-28">
        <div className="mx-auto grid w-full max-w-[110rem] gap-12 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-16 xl:gap-x-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Label rule index={1}>
                  Cách nghĩ
                </Label>
                <h2 className="u-display-sm mt-8 max-w-[16ch] text-ink">
                  Cái gì rồi cũng phải sống qua một mùa mưa ở đây.
                </h2>
              </Reveal>

              {portrait ? (
                <ImageFrame
                  media={portrait.cover}
                  alt={portrait.cover?.alt ?? `${portrait.title} - chi tiết nội thất`}
                  ratio="aspect-[3/4]"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  width={1200}
                  parallax
                  strength={0.4}
                  caption={captionFor(portrait)}
                  className="mt-14 hidden lg:block"
                />
              ) : null}
            </div>
          </div>

          <Reveal stagger={0.1} className="lg:col-span-6 lg:col-start-7">
            <div className="flex flex-col gap-8">
              {PHILOSOPHY.map((paragraph, i) => (
                <p
                  key={i}
                  data-reveal-item
                  className="max-w-[64ch] font-body text-[1.0625rem] leading-[1.85] text-ink/85"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --------------------------- vision & mission ---------------------------- */}
      <section id="tam-nhin-su-menh" className="u-gutter mt-[var(--spacing-section)] scroll-mt-28">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Tầm nhìn & Sứ mệnh"
              index={2}
              title="Kiến tạo không gian nguyên bản, nâng tầm phong cách sống Việt."
              lead="Kế thừa nền tảng xây dựng và xưởng sản xuất nội thất trực tiếp từ năm 2016, GuHomes xác lập một định hướng kiên định: mỗi ngôi nhà là một giải pháp không gian toàn diện, tối ưu hóa công năng, thích ứng vi khí hậu bản địa và cá nhân hóa thẩm mỹ ('đúng Gu') cho từng gia chủ."
            />
          </Reveal>

          {/* Architectural Diptych: Daylight Surface vs Espresso Night */}
          <div className="mt-16 grid gap-0 border border-line lg:grid-cols-2">
            <Reveal
              delay={0.08}
              className="group relative flex flex-col justify-between border-b border-line bg-surface p-8 sm:p-12 lg:border-r lg:border-b-0"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[0.75rem] font-medium uppercase tracking-wider text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {VISION_DATA.badge}
                  </span>
                  <span className="font-mono text-[0.75rem] uppercase tracking-widest text-muted">
                    {VISION_DATA.code}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[1.625rem] font-normal leading-[1.32] text-ink sm:text-[1.95rem]">
                  {VISION_DATA.title}
                </h3>
                <p className="mt-4 font-body text-[1rem] font-medium leading-[1.75] text-ink/90">
                  {VISION_DATA.lead}
                </p>
                <p className="mt-4 font-body text-[0.9375rem] leading-[1.85] text-ink/75">
                  {VISION_DATA.body}
                </p>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <span className="u-label text-muted">Chỉ mục định hướng chiến lược:</span>
                <dl className="mt-4 flex flex-col gap-3">
                  {VISION_DATA.commitments.map((item) => (
                    <div
                      key={item.index}
                      className="grid grid-cols-[2.75rem_1fr] items-baseline gap-2 border-l-2 border-accent/40 pl-3"
                    >
                      <dt className="font-mono text-[0.75rem] font-semibold text-accent">
                        {item.index}
                      </dt>
                      <dd className="font-body text-[0.875rem] leading-snug text-ink/85">
                        {item.text}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal
              delay={0.16}
              className="group relative flex flex-col justify-between bg-espresso p-8 text-canvas sm:p-12"
            >
              <div>
                <div className="flex items-center justify-between border-b border-canvas/15 pb-4">
                  <span className="inline-flex items-center gap-2 border border-accent-soft/40 bg-accent/20 px-3 py-1 font-mono text-[0.75rem] font-medium uppercase tracking-wider text-accent-soft">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" />
                    {MISSION_DATA.badge}
                  </span>
                  <span className="font-mono text-[0.75rem] uppercase tracking-widest text-canvas/50">
                    {MISSION_DATA.code}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[1.625rem] font-normal leading-[1.32] text-canvas sm:text-[1.95rem]">
                  {MISSION_DATA.title}
                </h3>
                <p className="mt-4 font-body text-[1rem] font-medium leading-[1.75] text-canvas/90">
                  {MISSION_DATA.lead}
                </p>
                <p className="mt-4 font-body text-[0.9375rem] leading-[1.85] text-canvas/70">
                  {MISSION_DATA.body}
                </p>
              </div>

              <div className="mt-8 border-t border-canvas/15 pt-6">
                <span className="u-label text-canvas/50">Cam kết thực thi công trình:</span>
                <dl className="mt-4 flex flex-col gap-3">
                  {MISSION_DATA.commitments.map((item) => (
                    <div
                      key={item.index}
                      className="grid grid-cols-[2.75rem_1fr] items-baseline gap-2 border-l-2 border-accent-soft/50 pl-3"
                    >
                      <dt className="font-mono text-[0.75rem] font-semibold text-accent-soft">
                        {item.index}
                      </dt>
                      <dd className="font-body text-[0.875rem] leading-snug text-canvas/85">
                        {item.text}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------- core values -------------------------------- */}
      <section id="gia-tri-cot-loi" className="u-gutter mt-[var(--spacing-section)] scroll-mt-28">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="06 Giá trị cốt lõi · Your Peace, Our Craft"
              index={3}
              title="Sáu trụ cột danh dự giữ chúng tôi đi đúng hướng."
              lead="Văn hóa làm nghề của GuHomes được xây dựng trên nền tảng chữ TÍN, kỷ luật bản vẽ 1:5 tại xưởng mộc 1.200m² (Thạnh Xuân, Quận 12) và triết lý lấy sự bình yên của gia chủ làm đích đến cuối cùng."
            />
          </Reveal>

          <Reveal stagger={0.08} className="mt-16">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CORE_VALUES.map((val) => (
                <article
                  key={val.number}
                  data-reveal-item
                  className="group relative flex flex-col justify-between border border-line bg-surface p-8 transition-all duration-300 hover:border-accent hover:bg-canvas hover:shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-line pb-4">
                      <span className="font-mono text-[0.875rem] font-semibold text-accent">
                        {val.number} / 06
                      </span>
                      <span className="border border-line bg-canvas px-3 py-1 font-mono text-[0.6875rem] font-medium tracking-wider text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                        {val.tag}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[1.4375rem] font-normal text-ink transition-colors group-hover:text-accent">
                      {val.title}
                    </h3>

                    <p className="mt-2 font-body text-[0.875rem] font-medium leading-relaxed text-accent">
                      {val.subtitle}
                    </p>

                    <p className="mt-4 font-body text-[0.875rem] leading-[1.8] text-ink/75">
                      {val.body}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-line/70 pt-3.5">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
                      Bảo chứng thực thi GuHomes:
                    </span>
                    <p className="mt-1 font-mono text-[0.75rem] font-medium text-ink">
                      ✓ {val.proof}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ------------ social media ecosystem & 6 showcase projects --------------- */}
      <StudioSocialShowcaseSection />

      {/* --------------------------------- quote --------------------------------- */}
      <section className="mt-[var(--spacing-section)] bg-espresso py-[calc(var(--spacing-section)*0.85)] text-canvas">
        <div className="u-gutter">
          <div className="mx-auto w-full max-w-[110rem]">
            <Reveal>
              <Label rule tone="light">
                Nói thẳng
              </Label>
            </Reveal>
            <TextReveal
              as="p"
              delay={0.1}
              className="u-display mt-10 max-w-[14ch] text-canvas"
            >
              Người lạ bước vào không cần biết ai đã thiết kế chỗ này.
            </TextReveal>
            <Reveal delay={0.2}>
              <p className="u-body-lg mt-10 max-w-[46ch] text-canvas/60">
                Họ chỉ cần biết chỗ treo áo khoác, và biết bật ngọn đèn nào khi về lúc mười một giờ
                đêm mà không muốn đánh thức ai trong nhà. Chúng tôi dựng cái khung đó rồi lui ra.
                Ngôi nhà là của người ở.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------- process -------------------------------- */}
      <section id="quy-trinh" className="u-gutter mt-[var(--spacing-section)] scroll-mt-28">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Quy trình"
              index={5}
              title="Bốn giai đoạn, và chỗ hay hỏng của từng giai đoạn."
              lead="Một căn hộ đi hết bốn giai đoạn này mất khoảng bảy tháng; nhà phố có phần xây thô thì gần gấp đôi. Con số ấy chúng tôi nói ngay từ buổi đầu, kể cả khi nghe xong bạn đổi ý."
            />
          </Reveal>

          <ol className="mt-20">
            {PROCESS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={0.05 * i}>
                  <div className="grid gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-16 lg:py-16">
                    <div className="lg:col-span-3">
                      <span className="u-label text-accent">{pad2(i + 1)}</span>
                      <h3 className="u-display-sm mt-5 text-ink">{step.title}</h3>
                      <p className="u-label mt-4">{step.duration}</p>
                    </div>
                    <div className="lg:col-span-6">
                      <p className="max-w-[58ch] font-body text-[1rem] leading-[1.85] text-ink/85">
                        {step.body}
                      </p>
                    </div>
                    <div className="lg:col-span-3">
                      <p className="u-label">Kết thúc bằng</p>
                      <p className="mt-4 font-body text-[0.875rem] leading-relaxed text-muted">
                        {step.output}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <Rule />
        </div>
      </section>

      {wide ? (
        <section className="u-gutter mt-[calc(var(--spacing-section)*0.8)]">
          <div className="mx-auto w-full max-w-[110rem]">
            <ImageFrame
              media={wide.cover}
              alt={wide.cover?.alt ?? `${wide.title} - công trình hoàn thiện`}
              ratio="aspect-[21/9]"
              sizes="(min-width: 1024px) 92vw, 100vw"
              width={2400}
              caption={captionFor(wide)}
            />
          </div>
        </section>
      ) : null}

      {/* ---------------------------- how we work -------------------------------- */}
      <section id="nguyen-tac-vat-lieu" className="u-gutter mt-[var(--spacing-section)] scroll-mt-28">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Nguyên tắc"
              index={6}
              title="Sáu điều studio tự buộc vào mình."
              lead="Cả sáu đều trói chúng tôi chặt hơn trói bạn, và viết ra là để bạn có cái mà chỉ vào."
            />
          </Reveal>

          <Reveal stagger={0.07} className="mt-20">
            <div className="grid gap-x-16 gap-y-0 md:grid-cols-2">
              {PRINCIPLES.map((principle, i) => (
                <div key={principle.title} data-reveal-item className="border-t border-line py-10">
                  <span className="u-label text-accent">{pad2(i + 1)}</span>
                  <h3 className="mt-5 font-display text-[1.5rem] font-normal leading-tight text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] font-body text-[0.9375rem] leading-[1.8] text-muted">
                    {principle.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------- materials ------------------------------ */}
      <section className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Vật liệu"
              index={7}
              title="Bảng vật liệu của studio hẹp đi theo từng năm."
              lead="Mỗi lần gạch một dòng khỏi bảng là một lần đã có công trình phải sửa. Thứ không trụ nổi qua mùa mưa thì gạch; nhà cung cấp lặng lẽ đổi công thức mà không báo thì cũng gạch. Những gì còn lại đã ở với chúng tôi đủ lâu để dám ký vào tờ bảo hành."
            />
          </Reveal>

          {materials.length > 0 ? (
            <Reveal stagger={0.06} className="mt-16">
              <ul className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {materials.map((material) => (
                  <li key={material.id} data-reveal-item>
                    <ImageFrame
                      media={material.media}
                      alt={material.media?.alt ?? material.name}
                      ratio="aspect-[4/3]"
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                      width={800}
                      variant="revealScale"
                    />
                    <h3 className="mt-6 font-display text-[1.375rem] font-normal text-ink">
                      {material.name}
                    </h3>
                    {material.description ? (
                      <p className="mt-3 max-w-[38ch] font-body text-[0.875rem] leading-[1.8] text-muted">
                        {material.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : (
            <Reveal stagger={0.05} className="mt-16">
              <ul className="grid gap-x-16 md:grid-cols-2 lg:grid-cols-3">
                {FALLBACK_MATERIALS.map((material) => (
                  <li key={material.name} data-reveal-item className="border-t border-line py-8">
                    <h3 className="font-display text-[1.375rem] font-normal text-ink">
                      {material.name}
                    </h3>
                    <p className="mt-3 max-w-[38ch] font-body text-[0.875rem] leading-[1.8] text-muted">
                      {material.description}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* --------------------------- tactile material lab ------------------------ */}
      <TactileMaterialLab />

      {/* --------------------------- woodshop tour ------------------------------- */}
      <WoodshopTourSection />

      {/* -------------------- 10 engineering norms manifesto -------------------- */}
      <TenEngineeringNormsSection className="mt-[var(--spacing-section)]" />

      {/* ----------------------------------- cta --------------------------------- */}
      <section className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto w-full max-w-[110rem] border-t border-line pt-16">
          <Reveal>
            <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Label rule tone="accent">
                  Bước tiếp
                </Label>
                <h2 className="u-display-sm mt-8 max-w-[18ch] text-ink">
                  Việc đầu tiên chúng tôi làm cho bạn là ngồi nghe hết một buổi.
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-8">
                <Button href="/contact" size="lg" withArrow>
                  Liên hệ studio
                </Button>
                <Button href="/projects" variant="underline">
                  Xem dự án
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
