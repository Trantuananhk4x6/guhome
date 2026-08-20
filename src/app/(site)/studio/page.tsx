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
    'AN ATELIER là studio kiến trúc trong nhà tại TP. Hồ Chí Minh — cách chúng tôi đọc ánh sáng, chọn vật liệu và đưa một ngôi nhà đi từ bản vẽ đầu tiên đến ngày bàn giao.',
  path: '/studio',
})

/* --------------------------------- content -------------------------------- */

const FACTS: readonly { label: string; value: string }[] = [
  { label: 'Thành lập', value: '2016' },
  { label: 'Địa bàn', value: 'TP. Hồ Chí Minh & miền Nam' },
  { label: 'Nhịp làm việc', value: 'Tối đa 12 dự án mỗi năm' },
]

const PHILOSOPHY: readonly string[] = [
  'Chúng tôi bắt đầu từ ánh sáng. Ở Sài Gòn nắng đến sớm và gắt; một ô cửa đặt lệch nửa mét có thể làm hỏng cả buổi chiều của căn phòng. Trước khi vẽ mặt bằng, chúng tôi đo hướng nắng, theo dõi bóng đổ trong ngày, rồi mới quyết định chỗ nào để ngồi, chỗ nào để đi qua.',
  'Vật liệu được chọn vì cách chúng cũ đi. Gỗ óc chó sẫm màu dần, đá travertine giữ lại dấu tay, đồng thau xỉn xuống thành một sắc ấm hơn lúc mới. Chúng tôi tránh những bề mặt chỉ đẹp trong tháng đầu tiên và bắt đầu xấu từ tháng thứ bảy.',
  'Chúng tôi tin vào chỗ trống. Một mảng tường không treo gì, một khoảng sàn không kê gì — đó là nơi mắt được nghỉ. Cảm giác rộng rãi đến từ tỷ lệ, không đến từ số lượng chi tiết.',
  'Và cuối cùng là thói quen. Bạn pha cà phê lúc mấy giờ, đọc sách ở đâu, cất giày chỗ nào, ai là người về muộn nhất. Một thiết kế tốt không bắt người ở phải học lại cách sống trong chính ngôi nhà của mình.',
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
    body: 'Chúng tôi đến xem hiện trạng vào đúng khung giờ bạn ở nhà nhiều nhất: đo nắng, nghe tiếng ồn vọng từ đường, mở thử từng cánh cửa. Rồi ngồi lại và hỏi những câu rất đời thường — nhà có mấy người, ai dậy sớm nhất, bữa tối ăn ở đâu, món đồ nào không thể bỏ đi.',
    output: 'Hồ sơ hiện trạng · bản tóm tắt đề bài · khung ngân sách.',
  },
  {
    title: 'Phác thảo',
    duration: '3–4 tuần',
    body: 'Hai phương án mặt bằng, không nhiều hơn — ba phương án thường có nghĩa là chưa phương án nào đủ chắc. Đi kèm là bảng vật liệu đầu tiên: những mẫu gỗ, đá, vải bạn cầm được trên tay, xem dưới đúng thứ ánh sáng của căn nhà mình.',
    output: 'Mặt bằng công năng · bảng vật liệu · phối cảnh các không gian chính.',
  },
  {
    title: 'Chi tiết',
    duration: '4–6 tuần',
    body: 'Giai đoạn ít lãng mạn nhất và quan trọng nhất. Nội thất được vẽ đến mức người thợ không phải đoán: độ dày mặt bàn, hướng vân gỗ, khe hở giữa hai cánh tủ, vị trí ổ điện nấp sau tủ đầu giường. Đèn được tính theo độ rọi cần cho từng việc, không theo số bóng.',
    output: 'Hồ sơ kỹ thuật thi công · thống kê vật tư · bản vẽ chi tiết cho hạng mục khó.',
  },
  {
    title: 'Bàn giao',
    duration: 'Theo tiến độ công trường',
    body: 'Mỗi tuần một buổi ở công trường, và có mặt bất cứ khi nào một hạng mục khó bắt đầu. Trước ngày bàn giao, chúng tôi dựng lại toàn bộ ánh sáng vào buổi tối, chỉnh từng độ mở của rèm, rồi trao nhà kèm một cuốn sổ mỏng: vật liệu nào lau bằng gì, bao lâu dưỡng lại mặt gỗ một lần.',
    output: 'Nghiệm thu từng hạng mục · styling · sổ tay bảo trì.',
  },
]

interface Principle {
  title: string
  body: string
}

const PRINCIPLES: readonly Principle[] = [
  {
    title: 'Một người phụ trách, từ đầu đến cuối',
    body: 'Kiến trúc sư ngồi với bạn buổi đầu tiên cũng là người đứng ở công trường ngày cuối cùng. Không có khâu bàn giao nội bộ nào để thông tin rơi mất giữa đường.',
  },
  {
    title: 'Ngân sách nói thẳng từ buổi đầu',
    body: 'Chúng tôi đưa khung chi phí trước khi vẽ, và báo ngay khi một lựa chọn vật liệu làm lệch khung đó. Không có khoản nào xuất hiện vào phút chót.',
  },
  {
    title: 'Bản vẽ đủ chi tiết để không ai phải đoán',
    body: 'Một bộ hồ sơ chặt chẽ tiết kiệm nhiều tiền hơn bất kỳ cuộc mặc cả nào với nhà thầu, và giữ cho chất lượng không phụ thuộc vào trí nhớ của người thợ.',
  },
  {
    title: 'Mỗi năm tối đa mười hai dự án',
    body: 'Con số đó giữ cho chúng tôi còn thời gian đứng ở công trường, thay vì chỉ gửi email và duyệt ảnh tiến độ.',
  },
  {
    title: 'Không có mẫu nhà',
    body: 'Hai công trình của chúng tôi không giống nhau, vì hai gia đình không giống nhau. Chúng tôi không mang phương án của người này sang nhà người khác.',
  },
  {
    title: 'Nói thật khi nên từ chối',
    body: 'Nếu đề bài chưa hợp với cách studio làm việc, chúng tôi nói ngay trong buổi gặp đầu — và giới thiệu người phù hợp hơn nếu chúng tôi biết ai đó.',
  },
]

const FALLBACK_MATERIALS: readonly { name: string; description: string }[] = [
  { name: 'Gỗ óc chó', description: 'Vân trầm, sẫm màu dần theo năm. Dùng cho mặt bàn và hệ tủ trung tâm.' },
  { name: 'Đá travertine', description: 'Bề mặt rỗ tự nhiên, giữ ánh sáng lại thay vì hắt nó đi.' },
  { name: 'Vữa vôi phủ tay', description: 'Mỗi mảng tường một sắc độ hơi khác nhau — dấu của bàn tay người trát.' },
  { name: 'Đồng thau', description: 'Tay nắm, chỉ viền, chân bàn. Xỉn xuống thành màu ấm sau chừng hai năm.' },
  { name: 'Vải lanh mộc', description: 'Rèm và bọc ghế. Nhăn nhẹ khi ngồi lâu, và điều đó là cố ý.' },
  { name: 'Sồi trắng xử lý xà phòng', description: 'Sàn giữ được sắc nhạt, đi chân trần vẫn thấy ấm vào sáng sớm.' },
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
            Chúng tôi thiết kế cho mười năm sau, không phải cho tấm ảnh đầu tiên.
          </TextReveal>

          <div className="mt-16 grid gap-12 lg:grid-cols-12">
            <Reveal delay={0.15} className="lg:col-span-6">
              <p className="u-body-lg max-w-[52ch]">
                AN ATELIER là studio kiến trúc trong nhà tại TP. Hồ Chí Minh. Chúng tôi nhận một số
                lượng dự án có hạn mỗi năm, để mỗi ngôi nhà đều được đi đến cùng — từ đường nét đầu
                tiên trên giấy can đến chiếc tay nắm cuối cùng được siết.
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
                  Philosophy
                </Label>
                <h2 className="u-display-sm mt-8 max-w-[16ch] text-ink">
                  Vật liệu thật, ánh sáng thật, và đủ chỗ trống để sống.
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
                Manifesto
              </Label>
            </Reveal>
            <TextReveal
              as="p"
              delay={0.1}
              className="u-display mt-10 max-w-[14ch] text-canvas"
            >
              Không gian mang tính cách.
            </TextReveal>
            <Reveal delay={0.2}>
              <p className="u-body-lg mt-10 max-w-[46ch] text-canvas/60">
                Tính cách ấy là của người ở, không phải của kiến trúc sư. Việc của chúng tôi là dựng
                đúng cái khung để nó hiện ra.
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
              eyebrow="Process"
              index={2}
              title="Bốn bước, không bước nào bị rút gọn."
              lead="Trung bình một ngôi nhà đi hết chặng này trong mười đến mười bốn tháng. Chúng tôi nói trước lịch trình ấy, và giữ đúng nó."
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
                      <p className="u-label">Bàn giao</p>
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
              eyebrow="How we work"
              index={3}
              title="Cách chúng tôi làm việc."
              lead="Studio không có phòng ban. Có sáu nguyên tắc, và chúng tôi bị ràng buộc bởi chúng nhiều hơn bất kỳ khách hàng nào."
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
              eyebrow="Materials"
              index={4}
              title="Những vật liệu chúng tôi quay lại nhiều nhất."
              lead="Không phải vì chúng đắt, mà vì chúng tử tế với thời gian và với người chạm vào mỗi ngày."
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
                  Next
                </Label>
                <h2 className="u-display-sm mt-8 max-w-[18ch] text-ink">
                  Kể cho chúng tôi nghe về ngôi nhà bạn đang nghĩ tới.
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
