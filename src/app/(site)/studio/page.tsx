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
    'AN ATELIER làm nội thất và kiến trúc ở TP. Hồ Chí Minh từ năm 2016. Tối đa mười hai công trình một năm, và người ngồi với bạn buổi đầu cũng là người có mặt ở công trường ngày cuối.',
  path: '/studio',
})

/* --------------------------------- content -------------------------------- */

const FACTS: readonly { label: string; value: string }[] = [
  { label: 'Thành lập', value: '2016' },
  { label: 'Địa bàn', value: 'TP. Hồ Chí Minh và các tỉnh lân cận' },
  { label: 'Thường làm', value: 'Căn hộ bàn giao thô, nhà phố, quán ăn và spa' },
  { label: 'Nhịp làm việc', value: 'Tối đa 12 công trình một năm' },
]

const PHILOSOPHY: readonly string[] = [
  'Việc đầu tiên khi nhận một căn nhà là quay lại xem nó vào ba giờ chiều. Đó là giờ nắng tây đổ thẳng vào mặt tiền, giờ quyết định một căn phòng sẽ được dùng hay bị bỏ không suốt cả năm. Mặt bằng chỉ được vẽ sau khi chúng tôi đã biết bóng nắng dừng ở chỗ nào trên sàn.',
  'Vật liệu thì chọn theo hai thứ: cách chúng cũ đi, và độ ẩm ở đây. Gỗ đưa vào nhà phải sấy về khoảng mười đến mười hai phần trăm ẩm, nếu không thì qua mùa mưa đầu tiên cánh tủ sẽ vênh và không ai chữa được nữa. Còn đá travertine giữ dấu tay, đồng thau xỉn xuống thành màu ấm hơn lúc mới — những thứ đó chúng tôi để yên cho thời gian làm.',
  'Một mảng tường không treo gì không phải là chỗ chưa làm xong. Cảm giác rộng đến từ tỷ lệ và từ chỗ cho mắt nghỉ, không đến từ số lượng chi tiết. Ở lần duyệt cuối, chúng tôi thường bỏ bớt nhiều hơn là thêm vào.',
  'Phần còn lại là thói quen của người ở. Ai về muộn nhất, giày cất ở đâu, bữa tối ăn trên bàn hay đứng ở đảo bếp, mở cánh tủ lạnh ra có chắn mất lối đi không. Một thiết kế tốt không bắt người ở phải học lại cách sống trong chính ngôi nhà của mình.',
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
    body: 'Chúng tôi đo hiện trạng vào khung giờ bạn có nhà, rồi quay lại một lần nữa vào giữa chiều để biết nắng vào sâu tới đâu. Với căn hộ, buổi đó còn để hỏi ban quản lý ba điều rất cụ thể: giờ nào được phép thi công, thang máy chở hàng dài bao nhiêu, và mảng tường nào là vách cứng không được đụng vào. Chỗ hay hỏng ở bước này là gia chủ ngại nói con số thật; ngân sách nói càng muộn thì càng phải vẽ lại nhiều.',
    output: 'Bản đo hiện trạng · một trang tóm tắt đề bài · khung ngân sách tách theo hạng mục.',
  },
  {
    title: 'Phác thảo',
    duration: '3–4 tuần',
    body: 'Hai phương án mặt bằng, không bao giờ ba: ba phương án thường có nghĩa là chưa phương án nào đủ chắc, và nó đẩy phần quyết định sang phía gia chủ. Kèm theo là mẫu vật liệu thật — bạn cầm miếng laminate lên xem trong chính căn phòng sẽ dùng nó, vào buổi chiều, chứ không xem trên màn hình. Đây cũng là lúc phải chốt vị trí bếp, vì bếp kéo theo đường nước, đường gas và ống hút mùi; đổi sau là đổi cả ba.',
    output: 'Mặt bằng bố trí · bảng vật liệu có mẫu cầm tay · phối cảnh những phòng bạn ở nhiều nhất.',
  },
  {
    title: 'Chi tiết',
    duration: '4–6 tuần',
    body: 'Giai đoạn ít ảnh đẹp nhất và tốn thời gian nhất. Nội thất được vẽ tới mức người thợ không phải đoán: độ dày mặt bàn, hướng vân gỗ khi ghép, khe hở ba milimét giữa hai cánh tủ, ổ điện nằm sau đầu giường ở cao độ nào. Khu vực ẩm dùng cốt chống ẩm và chân tủ bếp nhấc khỏi sàn — ở đây thứ giết chân tủ là nước lau nhà mỗi ngày, không phải mưa. Đèn tính theo việc bạn làm trong phòng chứ không theo số bóng trên trần.',
    output: 'Hồ sơ thi công nội thất · shop drawing cho hạng mục khó · thống kê vật tư và thiết bị.',
  },
  {
    title: 'Ra công trường',
    duration: '4–7 tháng',
    body: 'Mỗi tuần một buổi ở công trường, và có mặt cả ngày vào những mốc không sửa lại được: hôm ghép tấm đá mặt bếp, hôm treo cánh tủ đầu tiên, hôm cân chỉnh đèn. Với căn hộ, phần lớn rủi ro nằm ở khâu vận chuyển — một tấm gỗ dài hai mét tư có vào lọt thang máy hay không phải biết từ lúc còn trên bản vẽ. Trước ngày bàn giao, chúng tôi tắt hết đèn trần, dựng lại toàn bộ ánh sáng buổi tối và chỉnh từng độ mở của rèm.',
    output: 'Nghiệm thu từng hạng mục có ảnh · styling · sổ tay bảo trì cho từng loại vật liệu.',
  },
]

interface Principle {
  title: string
  body: string
}

const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Một người theo suốt',
    body: 'Kiến trúc sư ngồi với bạn buổi đầu cũng là người leo giàn giáo soi mối nối vào tháng thứ tám. Không có khâu bàn giao nội bộ nào để thông tin rơi mất giữa đường.',
  },
  {
    title: 'Nói giá trước khi vẽ',
    body: 'Khung chi phí tách theo từng hạng mục được gửi ngay sau buổi khảo sát. Khi một lựa chọn làm lệch khung đó — đá tự nhiên thay cho đá nhân tạo chẳng hạn — chúng tôi báo con số chênh trong cùng tuần, thay vì để nó xuất hiện lúc quyết toán.',
  },
  {
    title: 'Bản vẽ đủ chi tiết để không ai phải đoán',
    body: 'Một bộ hồ sơ chặt tiết kiệm nhiều tiền hơn mọi cuộc mặc cả với nhà thầu, và giữ cho chất lượng không phụ thuộc vào trí nhớ của người thợ hôm đó.',
  },
  {
    title: 'Mười hai công trình một năm',
    body: 'Con số đó là trần, không phải chỉ tiêu. Nó giữ cho chúng tôi còn thời gian đứng ở công trường thay vì chỉ duyệt ảnh tiến độ qua Zalo.',
  },
  {
    title: 'Không có mẫu nhà',
    body: 'Chúng tôi không mang phương án của gia đình này sang nhà gia đình khác, kể cả khi hai căn cùng một mặt bằng chủ đầu tư và cùng hướng cửa.',
  },
  {
    title: 'Có những việc chúng tôi từ chối',
    body: 'Nếu bạn cần hồ sơ trong hai tuần để kịp ngày khởi công, hoặc muốn studio ký vào phương án do người khác vẽ, chúng tôi nói không ngay trong buổi gặp đầu — và giới thiệu người phù hợp hơn nếu biết ai đó.',
  },
]

const FALLBACK_MATERIALS: readonly { name: string; description: string }[] = [
  {
    name: 'Gỗ óc chó',
    description: 'Dùng cho mặt bàn và hệ tủ trung tâm. Vân trầm, và sẫm thêm một chút mỗi năm.',
  },
  {
    name: 'Đá travertine',
    description: 'Bề mặt rỗ tự nhiên giữ ánh sáng lại thay vì hắt đi. Cần trám lại lỗ rỗ nếu đặt ở chỗ hay ướt.',
  },
  {
    name: 'Vữa vôi phủ tay',
    description: 'Mỗi mảng tường một sắc độ hơi khác — dấu bay của người trát, không phải lỗi.',
  },
  {
    name: 'Đồng thau',
    description: 'Tay nắm, chỉ viền, chân bàn. Sau chừng hai năm thì xỉn xuống thành màu ấm hơn lúc mới.',
  },
  { name: 'Vải lanh mộc', description: 'Rèm và bọc ghế. Ngồi lâu sẽ nhăn, và chúng tôi chọn nó vì thế.' },
  {
    name: 'Sồi trắng xử lý xà phòng',
    description: 'Sàn giữ được sắc nhạt suốt nhiều năm, sáng sớm đi chân trần vẫn thấy ấm.',
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
            Nhà ở Sài Gòn phải chịu được nắng tây và độ ẩm quanh năm.
          </TextReveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <Reveal delay={0.15} className="lg:col-span-6">
              <p className="u-body-lg max-w-[52ch]">
                AN ATELIER làm nội thất và kiến trúc ở TP. Hồ Chí Minh từ năm 2016 — phần lớn là căn
                hộ nhận bàn giao thô, nhà phố một mặt tiền và vài quán ăn nhỏ. Mười hai công trình
                một năm là giới hạn chúng tôi tự đặt: nhiều hơn thì không còn ai kịp có mặt vào ngày
                thợ ghép tấm đá đầu tiên.
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
                  Ánh sáng trước, vật liệu sau, thói quen người ở sau cùng.
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
                Họ chỉ cần thấy đèn bật đúng chỗ, ghế ngồi đúng tầm và tủ giày đủ chứa dép của cả
                nhà. Tính cách trong một ngôi nhà là của người ở; chúng tôi chỉ dựng cái khung để nó
                hiện ra.
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
              title="Bốn giai đoạn, và chỗ dễ hỏng của từng giai đoạn."
              lead="Một căn hộ đi hết bốn giai đoạn này mất khoảng bảy tháng; nhà phố có phần xây thô thì gần gấp đôi. Chúng tôi nói con số ấy ngay buổi đầu, kể cả khi nó làm bạn đổi ý."
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
              title="Sáu điều chúng tôi tự ràng buộc mình."
              lead="Studio không có phòng ban, nên cũng không có chỗ để đẩy trách nhiệm. Sáu điều dưới đây ràng buộc chúng tôi chặt hơn ràng buộc bạn."
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
              lead="Mỗi lần một thứ không trụ nổi qua mùa mưa, hoặc nhà cung cấp lặng lẽ đổi công thức, nó bị gạch khỏi danh sách. Những gì còn lại đã ở đủ lâu để chúng tôi dám bảo hành."
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
                  Gửi mặt bằng bàn giao và nói bạn muốn dọn vào tháng nào.
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
