import type { Metadata } from 'next'

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
  title: 'Studio',
  description:
    'AN ATELIER làm nội thất và kiến trúc ở TP. Hồ Chí Minh từ năm 2016. Mười hai công trình một năm là trần, đủ để người ngồi với bạn buổi đầu vẫn là người có mặt ở công trường ngày cuối.',
  path: '/studio',
})

/* --------------------------------- content -------------------------------- */

const FACTS: readonly { label: string; value: string }[] = [
  { label: 'Thành lập', value: '2016' },
  { label: 'Địa bàn', value: 'TP. Hồ Chí Minh, và đi tỉnh khi công trình đáng để đi' },
  { label: 'Thường làm', value: 'Căn hộ bàn giao thô, nhà phố, quán ăn và spa' },
  { label: 'Nhịp làm việc', value: 'Mười hai công trình một năm, và đó là trần' },
]

const PHILOSOPHY: readonly string[] = [
  'Ba giờ chiều tháng Tư, nắng tây vào tới giữa phòng khách và nằm lại đó đến gần sáu giờ. Đó là giờ chúng tôi hẹn quay lại. Buổi sáng thì căn nhà nào cũng dễ thương — phải đợi đến chiều mới thấy mảng sàn nóng đến mức không ai kê ghế lên, và thấy cái góc bếp đã tắt nắng từ mười giờ. Mặt bằng chỉ được vẽ sau khi chúng tôi biết bóng nắng dừng ở đâu trên sàn.',
  'Mười đến mười hai phần trăm ẩm là mức gỗ phải sấy về trước khi vào nhà ở đây. Cao hơn thì qua mùa mưa đầu tiên cánh tủ sẽ vênh, và sau đó không ai chữa lại được. Ngoài chuyện độ ẩm, chúng tôi chọn vật liệu theo cách chúng cũ đi hơn là theo cách chúng đẹp lúc vừa lắp xong. Travertine giữ dấu tay. Đồng thau hai năm nữa xỉn xuống thành một màu ấm hơn hôm nay, còn sồi trắng thì vàng dần về phía cửa sổ và ở lại nhạt trong bóng cái tủ đứng cạnh nó.',
  'Một mảng tường không treo gì không phải là chỗ chưa làm xong. Đó là chỗ để mắt đặt xuống. Ở lần duyệt cuối, chúng tôi thường bỏ đi nhiều hơn là thêm vào.',
  'Phần còn lại là chuyện thói quen. Ai về nhà muộn nhất, cái túi được thả xuống chỗ nào ngay khi vừa vào cửa, bữa tối ăn ở bàn hay đứng ở đảo bếp, cánh cửa tủ lạnh mở ra có chắn mất lối đi không. Chúng tôi hỏi những câu đó trong buổi đầu tiên và ghi lại gần như nguyên văn. Một ngôi nhà tốt không bắt người ở phải học lại cách sống của chính mình.',
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
    body: 'Buổi đầu thường có một khoảng lặng, và nó luôn rơi đúng lúc hỏi về tiền. Gia chủ nhìn đi chỗ khác, rồi đưa ra một con số tròn trịa mà chính họ cũng biết là chưa thật. Chúng tôi không ép. Nhưng ngân sách nói càng muộn thì càng phải vẽ lại nhiều, nên đến cuối buổi chúng tôi sẽ hỏi lại, nhẹ hơn. Phần còn lại của hôm ấy là đo đạc, là xuống hỏi ban quản lý xem thang máy chở hàng dài bao nhiêu, và là ngồi im nghe hai vợ chồng cãi nhau rất lịch sự về chuyện có nên bỏ cái bồn tắm.',
    output: 'Bản đo hiện trạng · một trang tóm tắt đề bài · khung ngân sách tách theo hạng mục.',
  },
  {
    title: 'Phác thảo',
    duration: '3–4 tuần',
    body: 'Hai phương án mặt bằng, không bao giờ ba. Ba phương án nghĩa là chưa cái nào đủ chắc, và nó đẩy phần khó nhất sang cho bạn. Cùng với bản vẽ là một hộp mẫu thật, và chúng tôi mang cái hộp ấy đến chính căn phòng sẽ dùng nó, vào buổi chiều. Miếng laminate cầm trên tay dưới nắng bốn giờ có màu khác hẳn nó trên màn hình, và khác cả chính nó dưới đèn showroom. Bếp phải chốt ngay ở giai đoạn này, vì bếp kéo theo đường nước, đường gas và ống hút mùi cùng một lúc.',
    output: 'Hai mặt bằng bố trí · hộp mẫu vật liệu để lại nhà bạn · phối cảnh những phòng bạn ở nhiều nhất.',
  },
  {
    title: 'Chi tiết',
    duration: '4–6 tuần',
    body: 'Đây là giai đoạn hồ sơ dày lên và tiến độ chậm lại. Bản vẽ đi tới mức người thợ không còn phải đoán gì nữa; khe hở giữa hai cánh tủ được ghi là ba milimét, và hướng vân khi ghép hai tấm gỗ cũng được vẽ ra. Rồi tới đoạn phải chờ. Vữa trát tay cần chừng một tháng mới ngừng co ngót, và một mã veneer hết lô là cả bảng vật liệu phải mở ra xem lại. Không ai sai cả. Nhưng lịch vẫn lùi, nên chúng tôi nói trước những chỗ ấy ngay từ bây giờ, để đến lúc đó bạn không phải ngồi nghe một lời giải thích.',
    output: 'Hồ sơ thi công nội thất · shop drawing cho từng hạng mục khó.',
  },
  {
    title: 'Ra công trường',
    duration: '4–7 tháng',
    body: 'Bốn đến bảy tháng ấy phần lớn là bụi và tiếng máy cắt vọng lên từ tầng dưới. Chúng tôi có mặt mỗi tuần một buổi, và cả ngày vào những hôm không sửa lại được. Rồi đến ngày cuối, và ngày cuối không giống bất kỳ ngày nào trước nó. Chúng tôi đến từ sáng, tắt hết đèn trần, rồi đợi tới sáu giờ chiều mới bật lại từng ngọn một và chỉnh độ mở của rèm cho đến khi căn phòng đứng yên. Gia chủ vào sau đó chừng mười lăm phút. Họ thường không nói gì trong hai phút đầu, và chúng tôi đã học được cách đứng im trong hai phút đó.',
    output: 'Biên bản nghiệm thu có ảnh · một buổi styling · sổ tay bảo trì cho từng loại vật liệu.',
  },
]

interface Principle {
  title: string
  body: string
}

const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Một người theo suốt',
    body: 'Người ngồi với bạn ở buổi đầu cũng là người leo giàn giáo soi mối nối vào tháng thứ tám. Trong studio không có khâu bàn giao nội bộ nào để thông tin rơi mất dọc đường.',
  },
  {
    title: 'Nói giá trước khi vẽ',
    body: 'Khung chi phí tách theo hạng mục được gửi ngay sau buổi khảo sát. Nếu một lựa chọn làm lệch khung đó — đá tự nhiên thay cho đá nhân tạo chẳng hạn — bạn biết con số chênh trong cùng tuần, chứ không phải lúc quyết toán.',
  },
  {
    title: 'Vẽ tới chỗ không ai phải đoán',
    body: 'Một bộ hồ sơ chặt tiết kiệm nhiều tiền hơn mọi cuộc mặc cả với nhà thầu. Nó cũng giữ cho chất lượng khỏi phụ thuộc vào trí nhớ của người thợ đứng ở đó hôm ấy.',
  },
  {
    title: 'Mười hai công trình một năm',
    body: 'Con số đó là trần, không phải chỉ tiêu. Giữ được nó thì chúng tôi còn thời gian đứng ở công trường, thay vì duyệt ảnh tiến độ qua Zalo lúc mười giờ đêm.',
  },
  {
    title: 'Không có mẫu nhà',
    body: 'Chúng tôi không mang phương án của gia đình này sang nhà gia đình khác, kể cả khi hai căn cùng một mặt bằng chủ đầu tư và cùng hướng cửa.',
  },
  {
    title: 'Từ chối sớm',
    body: 'Chúng tôi nói không ngay trong buổi gặp đầu, chứ không nói vòng vo rồi im lặng ba tuần. Danh sách đầy đủ nằm ở trang dịch vụ; ở đây bạn chỉ cần biết là nó có thật, và nó dài.',
  },
]

const FALLBACK_MATERIALS: readonly { name: string; description: string }[] = [
  {
    name: 'Gỗ óc chó',
    description:
      'Mặt bàn và hệ tủ trung tâm. Vân trầm, và mỗi năm lại sẫm thêm một chút ở đúng những chỗ tay hay chạm.',
  },
  {
    name: 'Đá travertine',
    description:
      'Lỗ rỗ tự nhiên giữ ánh sáng lại thay vì hắt đi. Đặt ở chỗ hay ướt thì phải trám trước.',
  },
  {
    name: 'Vữa vôi phủ tay',
    description:
      'Mỗi mảng tường một sắc độ hơi khác nhau. Đó là dấu bay của người trát, không phải lỗi.',
  },
  {
    name: 'Đồng thau',
    description:
      'Tay nắm, chỉ viền, chân bàn. Chừng hai năm nữa nó sẽ xỉn xuống thành màu ấm hơn hôm lắp.',
  },
  {
    name: 'Vải lanh mộc',
    description: 'Rèm và bọc ghế. Ngồi lâu thì nhăn, và chúng tôi chọn nó chính vì thế.',
  },
  {
    name: 'Sồi trắng xử lý xà phòng',
    description:
      'Sàn giữ được sắc nhạt qua nhiều năm. Sáng sớm đi chân trần vẫn thấy ấm dưới lòng bàn chân.',
  },
]

/* ---------------------------------- page ---------------------------------- */

function captionFor(project: ProjectSummary): string {
  return [project.title, project.location].filter((part): part is string => Boolean(part)).join(' · ')
}

export default async function StudioPage() {
  const featured = await getPublishedProjects({ featured: true, limit: 6 })
  const projects = featured.length > 0 ? featured : await getPublishedProjects({ limit: 6 })
  const materials = await getMaterials()

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
            Ở Sài Gòn, nắng đến từ hướng tây và ở lại rất lâu.
          </TextReveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <Reveal delay={0.15} className="lg:col-span-6">
              <p className="u-body-lg max-w-[52ch]">
                AN ATELIER làm nội thất và kiến trúc ở TP. Hồ Chí Minh từ năm 2016. Phần lớn công
                việc là căn hộ nhận bàn giao thô và nhà phố một mặt tiền; thỉnh thoảng có một quán
                ăn nhỏ chỉ mở buổi tối. Mỗi năm studio nhận tối đa mười hai công trình, đủ để người
                ngồi với bạn buổi đầu vẫn là người có mặt ở công trường hôm thợ ghép tấm đá bếp đầu
                tiên. Nhiều hơn thì hỏng.
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
              alt={hero.cover?.alt ?? `${hero.title} — không gian do AN ATELIER thiết kế`}
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
                  Một căn nhà tự nói ra rất nhiều, nếu chịu đến đúng giờ.
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
              index={2}
              title="Bốn giai đoạn, và chỗ hay hỏng của từng giai đoạn."
              lead="Một căn hộ đi hết bốn giai đoạn này mất khoảng bảy tháng; nhà phố có phần xây thô thì gần gấp đôi. Chúng tôi nói con số ấy ngay từ buổi đầu, kể cả khi nghe xong bạn đổi ý."
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
              index={3}
              title="Sáu điều studio tự buộc vào mình."
              lead="Ở đây không có phòng ban, nên cũng không có chỗ nào để đẩy trách nhiệm sang. Sáu điều dưới đây trói chúng tôi chặt hơn trói bạn."
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
              index={4}
              title="Bảng vật liệu của studio hẹp đi theo từng năm."
              lead="Một thứ không trụ nổi qua mùa mưa, hoặc nhà cung cấp lặng lẽ đổi công thức mà không báo, là nó bị gạch đi. Những thứ còn lại đã ở với chúng tôi đủ lâu để dám đứng ra bảo hành."
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
                  Gửi mặt bằng bàn giao, và nói bạn muốn dọn vào tháng nào.
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
