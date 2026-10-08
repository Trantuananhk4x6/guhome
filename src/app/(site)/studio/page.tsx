import type { Metadata } from 'next'

import { Button } from '@/components/ui/Button'
import { CheckIcon } from '@/components/ui/icons'
import { Label } from '@/components/ui/Label'
import { Rule } from '@/components/ui/Rule'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { buildMetadata } from '@/lib/seo'
import { cn, pad2 } from '@/lib/utils'
import { getPublishedProjects } from '@/server/queries/projects'
import { getMaterials } from '@/server/queries/site'
import type { ProjectSummary } from '@/types/content'

import { ImageFrame } from './_components/ImageFrame'
import { Reveal, TextReveal } from './_components/motion'
import { TactileMaterialLab } from '@/components/sections/TactileMaterialLab'
import { TactileMoodboardStudio } from '@/components/studio/TactileMoodboardStudio'
import { MicroclimateSimulator } from '@/components/sections/MicroclimateSimulator'
import { WoodshopTourSection } from '@/components/studio/WoodshopTourSection'
import { ConstructionTimelineDiary } from '@/components/projects/ConstructionTimelineDiary'
import { ClientChroniclesSection } from '@/components/sections/ClientChroniclesSection'
import { TropicalWeatherAdvisory } from '@/components/tools/TropicalWeatherAdvisory'
import { ArchitecturalLightingLab } from '@/components/studio/ArchitecturalLightingLab'
import { WoodJoineryExplorer } from '@/components/studio/WoodJoineryExplorer'
import { TenEngineeringNormsSection } from '@/components/sections/TenEngineeringNormsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Studio',
  description:
    'GuHomes làm nội thất và kiến trúc ở TP. Hồ Chí Minh từ năm 2016. Mười hai công trình một năm là trần. Người ngồi nghe bạn hôm đầu cũng là người có mặt ở công trường ngày cuối.',
  path: '/studio',
})

/* --------------------------------- content -------------------------------- */

const FACTS: readonly { label: string; value: string }[] = [
  { label: 'Thành lập', value: '2016' },
  { label: 'Địa bàn', value: 'TP. Hồ Chí Minh, và các tỉnh thành khi công trình đủ duyên' },
  { label: 'Chuyên sâu', value: 'Thiết kế, thi công & sản xuất nội thất trọn gói theo yêu cầu' },
  { label: 'Nhịp làm việc', value: 'Mười hai công trình một năm — đủ để KTS có mặt tại công trường mỗi tuần' },
]

interface Pillar {
  badge: string
  title: string
  lead: string
  body: string
  commitments: readonly string[]
}

const VISION_DATA: Pillar = {
  badge: 'Tầm nhìn dài hạn',
  title: 'Trở thành studio kiến trúc – nội thất trọn gói biểu tượng tại Việt Nam.',
  lead: 'Tiên phong định hình chuẩn mực không gian sống nguyên bản: mỗi ngôi nhà là một thực thể độc bản, hòa quyện vi khí hậu nhiệt đới, lưu giữ nếp sống riêng ("đúng Gu") và trường tồn cùng năm tháng.',
  body: 'GuHomes không đo lường sự thành công bằng số lượng công trình trải dài khắp thành phố, mà bằng chiều sâu cảm xúc trong từng mét vuông được tạo tác. Chúng tôi kiên định theo đuổi con đường thủ công chuẩn mực: nơi thẩm mỹ không lấn át con người, nơi vật liệu mộc được thở cùng khí trời, và nơi mỗi góc nhà trở thành chốn neo đậu bình yên, cùng gia đình đi qua bao biến chuyển của cuộc đời một cách thanh lịch và ấm áp.',
  commitments: [
    'Thiết kế "may đo" cá nhân hóa — tôn trọng thói quen sinh hoạt và nếp sống thật của từng thành viên',
    'Thích ứng vi khí hậu Sài Gòn: đón gió đối lưu tự nhiên, lấy sáng thông minh và chống ẩm bền bỉ',
    'Mô hình trọn gói khép kín: từ ý niệm kiến trúc đến xưởng mộc gia công trực tiếp tại Quận 12',
  ],
}

const MISSION_DATA: Pillar = {
  badge: 'Sứ mệnh phụng sự',
  title: 'Kiến tạo không gian, nâng tầm phong cách sống.',
  lead: 'Chuyên sâu thiết kế, thi công, cung cấp và lắp đặt nội thất trọn gói theo yêu cầu của khách hàng — bằng sự tận tâm chân thành, quy trình minh bạch rõ ràng và kỷ luật công trường nghiêm cẩn.',
  body: 'Sứ mệnh của GuHomes là hiện thực hóa trọn vẹn giấc mơ tổ ấm của gia chủ, giải phóng bạn khỏi mọi âu lo, căng thẳng và sự bất an thường trực trong hành trình xây dựng. Bằng xưởng gia công mộc trực tiếp, quy trình khép kín rõ ràng từ bản vẽ ý niệm đến ngày lắp đặt hoàn thiện, và sự tận tâm nghiêm cẩn với từng mối ghép, chúng tôi trao gửi một không gian sống đủ ấm cúng để trở về, đủ tĩnh lặng để lắng nghe chính mình, và đủ tinh tế để tự hào đón tiếp người thân quý.',
  commitments: [
    'Dự toán minh bạch tuyệt đối — nói giá trước khi vẽ, không chi phí ẩn, không phát sinh bất ngờ',
    'Kiểm soát chất lượng đồng bộ từ xưởng sản xuất đến hiện trường lắp đặt ngoài thực tế',
    'Cùng một người đồng hành: từ buổi lắng nghe đầu tiên đến ngày trao chìa khóa vào tay gia chủ',
  ],
}

interface CoreValue {
  number: string
  tag: string
  title: string
  subtitle: string
  body: string
}

const CORE_VALUES: readonly CoreValue[] = [
  {
    number: '01',
    tag: 'Tâm & Tín',
    title: 'Chữ Tín Làm Đầu',
    subtitle: 'Nói thật, làm thật và chịu trách nhiệm đến cùng.',
    body: 'Chữ Tín là sinh mệnh của GuHomes. Giữa một thị trường nhiều lời hứa hoa mỹ, chúng tôi chọn minh bạch từng con số dự toán ngay từ buổi đầu, không giấu chi phí và không vẽ thêm thứ không phục vụ đời sống gia chủ. Đã cam kết loại gỗ, loại đá nào thì nhập đúng loại đá đó; đã hẹn ngày dọn vào thì không để gia chủ phải chờ. Sự trung thực với vật liệu và trách nhiệm trọn vẹn là lời hứa danh dự của người làm nghề.',
  },
  {
    number: '02',
    tag: 'Độc bản',
    title: 'Đúng "Gu" Bản Sắc',
    subtitle: 'May đo theo nếp sống thật, không sao chép khuôn mẫu có sẵn.',
    body: 'Không có căn nhà thứ hai giống căn nhà của bạn. GuHomes không áp đặt cái tôi của kiến trúc sư lên người ở, mà kiên nhẫn ngồi nghe bạn kể về thói quen sinh hoạt: bữa tối thích quây quần ở bàn ăn hay ăn vội ở đảo bếp, ai là người về sau cùng bật ngọn đèn nào, thói quen đọc sách bên bậu cửa sổ. Chúng tôi chép lại và chuyển hóa những điều thầm kín ấy thành ngôn ngữ hình khối, ánh sáng và vật liệu riêng biệt của riêng bạn.',
  },
  {
    number: '03',
    tag: 'Kỷ luật & Xưởng mộc',
    title: 'Chuẩn Mực & Tỉ Mỉ',
    subtitle: 'Vẽ tới chỗ người thợ không còn phải đoán; gia công sắc nét từng milimet.',
    body: 'Một bộ hồ sơ kỹ thuật chi tiết tiết kiệm nhiều tiền hơn mọi cuộc mặc cả với thợ thầu. Tại GuHomes, từng khe co ngót gỗ, đường chỉ ron đá, đến hướng vân khi ghép hai tấm ván đều được quy định chặt chẽ trên bản vẽ. Cùng với xưởng sản xuất nội thất trực tiếp với đội ngũ thợ lành nghề, chúng tôi kiểm soát chất lượng từ phôi gỗ đến lớp hoàn thiện, để sản phẩm ngoài đời thực luôn sắc sảo, đằm thắm và tinh tế hơn cả phối cảnh 3D.',
  },
  {
    number: '04',
    tag: 'Thấu hiểu bản địa',
    title: 'Bền Vững Nhiệt Đới',
    subtitle: 'Thiết kế thích ứng với nắng gắt và độ ẩm 80% của Sài Gòn.',
    body: 'Độ ẩm 75–80% quanh năm và những cơn mưa rào bất chợt là người thầy khắt khe nhất của studio. GuHomes ưu tiên những vật liệu có lỗ thở tự nhiên: đá travertine, gỗ tự nhiên lau dầu, vữa vôi thủ công, đồng thau mộc — những chất liệu không sợ thời tiết mà càng đi qua năm tháng, càng trầm tích vẻ đẹp của sự phong sương và ấm áp.',
  },
  {
    number: '05',
    tag: 'Trọng tâm duy nhất',
    title: 'Your Success, Our Focus',
    subtitle: 'Sự an tâm và nụ cười của bạn là đích đến cuối cùng.',
    body: '"Cùng một người từ buổi gặp đầu đến khi tháo giàn giáo." Người ngồi lắng nghe những băn khoăn của bạn hôm đầu cũng là người leo giàn giáo kiểm tra mối nối vào tháng thứ tám, không qua bất kỳ khâu trung gian nào để câu bạn dặn rơi mất dọc đường. Sự bình yên và nụ cười hài lòng khi bạn mở cánh cửa bước vào tổ ấm mới chính là thành công trọn vẹn nhất của GuHomes.',
  },
]

const PHILOSOPHY: readonly string[] = [
  'Một chiều tháng Sáu, mưa xuống ngay lúc đang đo dở, và trong mười phút cả căn hộ đổi màu. Ánh sáng ngoài trời rút về một thứ xám phẳng lì, không còn cái bóng đổ nào để giấu đi thứ gì. Mảng vữa nào loang thì lúc ấy hiện ra hết. Chúng tôi hay đợi cho tạnh rồi mới đo tiếp, vì mười phút đó nói được nhiều hơn cả buổi sáng hôm trước.',
  'Có một cái mùi mà căn hộ nào ở đây đóng cửa một tuần cũng có. Nó bám vào rèm trước, rồi mới tới lớp giấy lót trong ngăn kéo. Vì cái mùi ấy mà studio không đóng tủ áo kín bưng bao giờ, và phòng tắm trong hồ sơ của chúng tôi luôn có một khe thông hơi nào đó, giấu sau nan gỗ nếu cần. Sàn thì có tiếng của nó. Gạch bóng khuếch đại từng bước chân; gỗ nuốt bớt đi. Không ai đưa chuyện ấy vào bản yêu cầu thiết kế, và ai cũng nhận ra nó trong tuần đầu tiên dọn vào.',
  'Một mảng tường không treo gì không phải là chỗ chưa làm xong. Ở lần duyệt cuối, thứ bị gạch khỏi bản vẽ bao giờ cũng nhiều hơn thứ được thêm vào.',
  'Nhưng phần khó nhất nằm ở những câu không có trong bảng khảo sát nào. Ai là người về sau cùng, và người đó bật ngọn đèn nào trước tiên. Bữa tối ăn ở bàn, hay ăn đứng ở đảo bếp vì đứng thì nhanh hơn và không ai phải dọn. Cánh cửa nào trong nhà chưa bao giờ có ai đóng. Một ngôi nhà tốt không bắt người ở học lại cách sống của chính mình, nên chúng tôi hỏi hết trong buổi đầu và chép lại gần như nguyên văn — nhất là những chỗ hai vợ chồng trả lời khác nhau.',
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
    duration: '2–3 tuần',
    body: 'Buổi đầu thường có một khoảng lặng, và nó luôn rơi đúng lúc hỏi về tiền. Gia chủ nhìn đi chỗ khác, rồi đưa ra một con số tròn trịa mà chính họ cũng biết là chưa thật. Chúng tôi không ép. Nhưng ngân sách nói càng muộn thì càng phải vẽ lại nhiều, nên đến cuối buổi thế nào cũng có người hỏi lại, nhẹ hơn. Hai tiếng còn lại trôi đi trong thước dây và máy đo laser, trừ một quãng chúng tôi chỉ ngồi im nghe hai vợ chồng cãi nhau rất lịch sự về chuyện có nên bỏ cái bồn tắm. Quãng đó thường có ích hơn phần đo đạc.',
    output: 'Bản đo hiện trạng · một trang tóm tắt đề bài · khung ngân sách tách theo hạng mục.',
  },
  {
    title: 'Phác thảo',
    duration: '3–4 tuần',
    body: 'Hai phương án mặt bằng, không bao giờ ba. Ba phương án nghĩa là chưa cái nào đủ chắc, và nó đẩy phần khó nhất sang cho bạn. Cùng với bản vẽ là một hộp mẫu thật, mang tới chính căn phòng sẽ dùng nó, vào buổi chiều. Miếng laminate cầm trên tay dưới nắng bốn giờ có màu khác hẳn nó trên màn hình, và khác cả chính nó dưới đèn showroom. Bếp thì phải chốt ngay trong giai đoạn này. Dời cái bồn rửa đi bốn mươi phân thôi là đường nước dưới sàn lẫn ống hút mùi trên trần đều phải vẽ lại, mà động tới ống hút mùi thì kéo theo cả trần thạch cao.',
    output: 'Hai mặt bằng bố trí · hộp mẫu vật liệu để lại nhà bạn.',
  },
  {
    title: 'Chi tiết',
    duration: '4–6 tuần',
    body: 'Đây là giai đoạn hồ sơ dày lên và tiến độ chậm lại. Bản vẽ đi tới mức người thợ không còn phải đoán gì nữa; khe hở giữa hai cánh tủ được ghi thành một con số, và hướng vân khi ghép hai tấm gỗ cũng được vẽ ra. Rồi tới đoạn phải chờ. Vữa trát tay cần chừng một tháng mới ngừng co ngót, và một mã veneer hết lô là cả bảng vật liệu phải mở ra xem lại. Không ai sai cả. Nhưng lịch vẫn lùi, nên chúng tôi nói trước những chỗ ấy ngay từ bây giờ, để đến lúc đó bạn khỏi phải ngồi nghe một lời giải thích.',
    output: 'Hồ sơ thi công nội thất · shop drawing cho từng hạng mục khó · bảng vật tư có mã hàng.',
  },
  {
    title: 'Ra công trường',
    duration: '4–7 tháng',
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
      <section className="u-gutter pt-[calc(var(--spacing-section)*0.75)]">
        <div className="mx-auto w-full max-w-[110rem]">
          <Label rule index="—">
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
                    className="grid grid-cols-[9rem_1fr] gap-6 border-t border-line py-5"
                  >
                    <dt className="u-label">{fact.label}</dt>
                    <dd className="font-body text-[0.9375rem] text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <Rule />
            </Reveal>
          </div>
        </div>
      </section>

      {hero ? (
        <section className="u-gutter mt-[calc(var(--spacing-section)*0.7)]">
          <div className="mx-auto w-full max-w-[110rem]">
            <ImageFrame
              media={hero.cover}
              alt={hero.cover?.alt ?? `${hero.title} — không gian do GuHomes thiết kế`}
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
      <section className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto grid w-full max-w-[110rem] gap-16 lg:grid-cols-12 lg:gap-20">
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
                  alt={portrait.cover?.alt ?? `${portrait.title} — chi tiết nội thất`}
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
      <section id="tam-nhin-su-menh" className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Tầm nhìn & Sứ mệnh"
              index={2}
              title="Kiến tạo không gian, nâng tầm phong cách sống."
              lead="Kế thừa nền tảng xây dựng và sản xuất nội thất trọn gói từ năm 2016, GuHomes xác lập một định hướng kiên định: mỗi ngôi nhà là một giải pháp không gian toàn diện, tối ưu hóa công năng, thích ứng vi khí hậu bản địa và cá nhân hóa thẩm mỹ ('đúng Gu') cho từng gia chủ."
            />
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Tầm nhìn (Vision) Card - Warm Architectural Paper Monograph */}
            <Reveal delay={0.08} className="group relative flex flex-col justify-between overflow-hidden border border-line bg-surface p-8 sm:p-12 transition-all duration-500 hover:border-accent hover:shadow-[0_20px_50px_rgba(160,119,83,0.12)]">
              {/* Architectural Precision Corner Brackets */}
              <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent/40 transition-colors duration-500 group-hover:border-accent" />

              {/* Architectural Monogram Watermark */}
              <span aria-hidden="true" className="pointer-events-none absolute -right-4 -bottom-6 select-none font-display text-[7.5rem] font-bold tracking-tighter text-ink/[0.03] transition-all duration-700 group-hover:text-accent/[0.07] group-hover:scale-105">
                VISION
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-[0.75rem] font-medium tracking-wide text-accent uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    {VISION_DATA.badge}
                  </span>
                  <span className="font-mono text-[0.8125rem] text-muted">01 / 02</span>
                </div>
                <h3 className="mt-6 font-display text-[1.625rem] font-normal leading-[1.3] text-ink sm:text-[1.875rem] transition-colors duration-300 group-hover:text-accent">
                  {VISION_DATA.title}
                </h3>
                <p className="mt-4 font-body text-[1rem] font-medium leading-[1.75] text-ink/90">
                  {VISION_DATA.lead}
                </p>
                <p className="mt-4 font-body text-[0.9375rem] leading-[1.85] text-ink/75">
                  {VISION_DATA.body}
                </p>
              </div>

              <div className="relative z-10 mt-8 border-t border-line pt-6">
                <span className="u-label text-muted">Trọng tâm định hướng:</span>
                <ul className="mt-4 flex flex-col gap-3">
                  {VISION_DATA.commitments.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-body text-[0.875rem] text-ink/80 transition-colors duration-300 hover:text-ink">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent shadow-xs">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Sứ mệnh (Mission) Card - Deep Espresso Lacquer High-Contrast */}
            <Reveal delay={0.16} className="group relative flex flex-col justify-between overflow-hidden border border-line bg-espresso text-canvas p-8 sm:p-12 transition-all duration-500 hover:border-accent-soft hover:shadow-[0_20px_50px_rgba(19,18,16,0.25)]">
              {/* Architectural Precision Corner Brackets in Gold */}
              <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent-soft/40 transition-colors duration-500 group-hover:border-accent-soft" />
              <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent-soft/40 transition-colors duration-500 group-hover:border-accent-soft" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent-soft/40 transition-colors duration-500 group-hover:border-accent-soft" />
              <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-accent-soft/40 transition-colors duration-500 group-hover:border-accent-soft" />

              {/* Architectural Monogram Watermark */}
              <span aria-hidden="true" className="pointer-events-none absolute -right-4 -bottom-6 select-none font-display text-[7.5rem] font-bold tracking-tighter text-canvas/[0.03] transition-all duration-700 group-hover:text-accent-soft/[0.08] group-hover:scale-105">
                MISSION
              </span>

              <div className="relative z-10">
                <div className="flex items-center justify-between border-b border-canvas/15 pb-4">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent-soft/40 bg-accent/20 px-3.5 py-1 text-[0.75rem] font-medium tracking-wide text-accent-soft uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-soft animate-pulse" />
                    {MISSION_DATA.badge}
                  </span>
                  <span className="font-mono text-[0.8125rem] text-canvas/50">02 / 02</span>
                </div>
                <h3 className="mt-6 font-display text-[1.625rem] font-normal leading-[1.3] text-canvas sm:text-[1.875rem] transition-colors duration-300 group-hover:text-accent-soft">
                  {MISSION_DATA.title}
                </h3>
                <p className="mt-4 font-body text-[1rem] font-medium leading-[1.75] text-canvas/90">
                  {MISSION_DATA.lead}
                </p>
                <p className="mt-4 font-body text-[0.9375rem] leading-[1.85] text-canvas/70">
                  {MISSION_DATA.body}
                </p>
              </div>

              <div className="relative z-10 mt-8 border-t border-canvas/15 pt-6">
                <span className="u-label text-canvas/50">Cam kết hành động:</span>
                <ul className="mt-4 flex flex-col gap-3">
                  {MISSION_DATA.commitments.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-body text-[0.875rem] text-canvas/85 transition-colors duration-300 hover:text-canvas">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/30 text-accent-soft shadow-xs">
                        <CheckIcon className="h-3 w-3" />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------------- core values -------------------------------- */}
      <section id="gia-tri-cot-loi" className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Giá trị cốt lõi"
              index={3}
              title={`"Your Success, Our Focus" — Năm điều giữ chúng tôi đi đúng hướng.`}
              lead="Văn hóa doanh nghiệp của GuHomes được xây dựng trên nền tảng chữ TÍN và triết lý lấy sự an tâm, hạnh phúc của gia chủ làm trọng tâm duy nhất. Đây là năm chuẩn mực chúng tôi dùng để soi chiếu trong từng bản vẽ, từng buổi duyệt vật liệu và từng giờ có mặt tại công trường."
            />
          </Reveal>

          <Reveal stagger={0.08} className="mt-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {CORE_VALUES.map((val) => {
                const isHero = val.number === '05'
                return (
                  <div
                    key={val.number}
                    data-reveal-item
                    className={cn(
                      'group relative flex flex-col justify-between overflow-hidden border border-line bg-surface p-8 transition-all duration-500 hover:border-accent hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/5',
                      isHero
                        ? 'border-accent/40 bg-gradient-to-br from-surface via-surface to-surface-alt lg:col-span-2'
                        : 'lg:col-span-1',
                    )}
                  >
                    {/* Top Accent Gradient Line on Hover */}
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent via-accent-soft to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    {/* Watermark Number */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-6 top-3 select-none font-display text-[5.5rem] font-bold leading-none text-ink/[0.04] transition-all duration-700 group-hover:text-accent/[0.12] group-hover:translate-x-1 group-hover:-translate-y-1"
                    >
                      {val.number}
                    </span>

                    <div className="relative z-10">
                      <div className="flex items-center justify-between border-b border-line pb-4">
                        <span className="font-mono text-[0.875rem] font-semibold text-accent">{val.number}</span>
                        <span className="rounded-full border border-line bg-canvas/70 px-3 py-1 font-mono text-[0.6875rem] font-medium tracking-wider text-muted group-hover:border-accent/40 group-hover:text-accent transition-colors duration-300">
                          {val.tag}
                        </span>
                      </div>

                      <div className={cn(isHero && 'lg:grid lg:grid-cols-12 lg:gap-8')}>
                        <div className={cn(isHero ? 'lg:col-span-5' : 'w-full')}>
                          <h3 className="mt-5 font-display text-[1.375rem] font-normal text-ink group-hover:text-accent transition-colors duration-300">
                            {val.title}
                          </h3>

                          <p className="mt-2 font-body text-[0.875rem] font-medium leading-relaxed text-ink/85">
                            {val.subtitle}
                          </p>

                          {isHero ? (
                            <div className="mt-4 hidden lg:inline-flex items-center gap-2 rounded-sm border border-accent/30 bg-accent/10 px-3 py-1 text-[0.6875rem] font-medium uppercase tracking-wider text-accent">
                              <span>★ Triết lý nền tảng GuHomes</span>
                            </div>
                          ) : null}
                        </div>

                        <div className={cn(isHero ? 'lg:col-span-7' : 'w-full')}>
                          <p className="mt-4 font-body text-[0.875rem] leading-[1.8] text-muted group-hover:text-ink/80 transition-colors duration-300">
                            {val.body}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-6 flex items-center justify-between border-t border-line/60 pt-3">
                      <span className="u-label text-[0.6875rem] text-accent/70 tracking-widest uppercase">
                        GuHomes Standard
                      </span>
                      <span className="text-[0.6875rem] font-mono text-muted/60">
                        Pillar {val.number}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

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
      <section className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Quy trình"
              index={4}
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
              alt={wide.cover?.alt ?? `${wide.title} — công trình hoàn thiện`}
              ratio="aspect-[21/9]"
              sizes="(min-width: 1024px) 92vw, 100vw"
              width={2400}
              caption={captionFor(wide)}
            />
          </div>
        </section>
      ) : null}

      {/* ---------------------------- how we work -------------------------------- */}
      <section className="u-gutter mt-[var(--spacing-section)]">
        <div className="mx-auto w-full max-w-[110rem]">
          <Reveal>
            <SectionHeading
              eyebrow="Nguyên tắc"
              index={5}
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
              index={6}
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
                    <h3 className="font-display text-[1.375rem] font-normal text-ink">{material.name}</h3>
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

      {/* -------------------- tactile moodboard studio --------------------------- */}
      <TactileMoodboardStudio className="mt-[var(--spacing-section)]" />

      {/* ----------------- architectural optical lighting lab -------------------- */}
      <ArchitecturalLightingLab className="mt-[var(--spacing-section)]" />

      {/* -------------------- tropical weather advisory -------------------------- */}
      <TropicalWeatherAdvisory className="mt-[var(--spacing-section)]" />

      {/* ----------------------- microclimate simulator -------------------------- */}
      <MicroclimateSimulator />

      {/* --------------------------- woodshop tour ------------------------------- */}
      <WoodshopTourSection />

      {/* ----------------------- wood joinery explorer --------------------------- */}
      <WoodJoineryExplorer className="mt-[var(--spacing-section)]" />

      {/* ---------------------- construction timeline diary ----------------------- */}
      <ConstructionTimelineDiary className="mt-[var(--spacing-section)]" />

      {/* -------------------- 10 engineering norms manifesto -------------------- */}
      <TenEngineeringNormsSection className="mt-[var(--spacing-section)]" />

      {/* ----------------------- client chronicles section ----------------------- */}
      <ClientChroniclesSection className="mt-[var(--spacing-section)]" />

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
