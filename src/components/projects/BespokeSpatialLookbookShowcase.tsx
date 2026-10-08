'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useQuickQuote } from '@/components/layout/QuickQuoteModal'
import { Label } from '@/components/ui/Label'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

interface TactileMaterial {
  name: string
  source: string
  finish: string
  tactileFeel: string
  climateRole: string
  hex: string
}

interface ClimateMetric {
  title: string
  value: string
  detail: string
}

interface LookbookItem {
  id: string
  title: string
  subtitle: string
  location: string
  area: string
  climateChallenge: string
  solution: string
  tempReduction: string
  humidityControl: string
  image: string
  imageAlt: string
  soundscapeName: string
  soundscapeFreq: number
  tactileMaterials: TactileMaterial[]
  climateMetrics: ClimateMetric[]
  specs: { label: string; value: string }[]
  quoteStyle: string
}

const LOOKBOOKS: LookbookItem[] = [
  {
    id: 'metropole',
    title: 'Penthouse The Opera Metropole',
    subtitle: 'Đối thoại cùng mặt trời lặn bên sông Sài Gòn',
    location: 'Bán đảo Thủ Thiêm, TP. Thủ Đức',
    area: '345 m² · Duplex 2 tầng thông tầng 7.2m',
    climateChallenge: 'Độ ẩm 78% quanh năm, bức xạ nhiệt mặt trời lặn hướng Tây nung nóng vách kính tới 48°C lúc 15:30 chiều.',
    solution: 'Hệ lam xoay gỗ Teak rừng sấy chân không kết hợp mành tre hun khói và khe lấy gió vi khí hậu sông, hạ nhiệt tự nhiên.',
    tempReduction: '-6.5°C',
    humidityControl: '55% RH',
    image: '/media/ben-kia-song/12-1600.webp',
    imageAlt: 'Penthouse The Opera Metropole Thủ Thiêm thiết kế nội thất vi khí hậu GuHomes',
    soundscapeName: 'Gió Sông & Sóng Nước Bán Đảo',
    soundscapeFreq: 432,
    tactileMaterials: [
      {
        name: 'Gỗ Teak Miệt Vườn Sấy Chân Không',
        source: 'Vườn cây lâm nghiệp bền vững, hoàn thiện tại Xưởng Thạnh Xuân 1.200m²',
        finish: 'Lau dầu thực vật gốc nước Osmo Đức 3 lớp',
        tactileFeel: 'Ấm áp, mịn màng vân thớ chìm, thoang thoảng mùi tinh dầu tự nhiên',
        climateRole: 'Kháng ẩm 78%, chống cong vênh biên độ nhiệt cao',
        hex: '#8B5A2B',
      },
      {
        name: 'Đá Travertine Navona Ý',
        source: 'Mỏ đá tự nhiên Tivoli, cắt CNC và mài mờ thủ công',
        finish: 'Bề mặt mài mờ vân mây (Honed), lỗ rỗng thở nano giữ ẩm mát',
        tactileFeel: 'Mát lạnh dịu nhẹ, xúc giác đá trầm tích tự nhiên',
        climateRole: 'Hấp thu nhiệt chậm, tản nhiệt đối lưu làm mát sàn',
        hex: '#D2B48C',
      },
      {
        name: 'Vữa Vôi Vỏ Hàu Sông Sài Gòn',
        source: 'Tro vỏ hàu Cần Giờ ủ men vi sinh và bột đá thạch anh',
        finish: 'Gạt tay mộc mạc phong cách Venetian Stucco',
        tactileFeel: 'Mịn xốp như đá phấn, tán xạ ánh sáng mềm mại',
        climateRole: 'Hút ẩm mùa mưa, nhả ẩm mùa khô, khử khuẩn không khí',
        hex: '#EAE6DF',
      },
    ],
    climateMetrics: [
      { title: 'Tốc độ gió đối lưu', value: '1.2 m/s', detail: 'Hút gió sông mát qua hành lang gió tự nhiên' },
      { title: 'Bức xạ nhiệt cản phá', value: '82%', detail: 'Hệ lam Teak thông minh tự điều hướng nắng' },
      { title: 'Tĩnh âm salon chính', value: '26 dBA', detail: 'Vách tiêu âm rãnh Fibonacci cách ly tiếng ồn đô thị' },
      { title: 'Tiết kiệm điện điều hòa', value: '38%', detail: 'Nhờ lớp đệm vi khí hậu hạ nhiệt 6.5°C' },
    ],
    specs: [
      { label: 'Hướng công trình', value: 'Tây Nam (View trực diện sông Sài Gòn)' },
      { label: 'Thời gian thi công', value: '95 ngày may đo trọn gói tại xưởng Thạnh Xuân' },
      { label: 'Vật liệu chủ đạo', value: 'Teak FAS, Travertine, Khung nhôm Anode champagne' },
      { label: 'Âm học thính phòng', value: 'Vòm parabol RT60 = 0.32s' },
    ],
    quoteStyle: 'modern-luxury',
  },
  {
    id: 'global-city',
    title: 'Dinh Thự The Global City',
    subtitle: 'Vật liệu nguyên bản và dòng chảy năng lượng thanh khiết',
    location: 'Đỗ Xuân Hợp, Phường An Phú, TP. Thủ Đức',
    area: '520 m² · Dinh thự 4 tầng mặt tiền kênh đào',
    climateChallenge: 'Gió nóng khô rát đường nhựa đô thị, ô nhiễm bụi mịn PM2.5 và tiếng ồn giao thông giờ cao điểm.',
    solution: 'Sân trong vách thác nước đá ngọc Onyx vàng mật ong xuyên sáng LED kết hợp bể ngâm bazan lục lăng ion âm thanh lọc.',
    tempReduction: '-4.8°C',
    humidityControl: '52% RH',
    image: '/media/nha-pho-hien-dai-nha-pho-1-mat-tien/1-1200.webp',
    imageAlt: 'Dinh thự The Global City nội thất mộc đá ngọc GuHomes',
    soundscapeName: 'Thác Nước Onyx Tĩnh Âm Kênh Đào',
    soundscapeFreq: 528,
    tactileMaterials: [
      {
        name: 'Đá Ngọc Onyx Vàng Mật Ong',
        source: 'Phiến đá ngọc xuyên sáng tự nhiên, ghép vân đối xứng Bookmatch',
        finish: 'Mài bóng quang học, tích hợp LED viền 2700K',
        tactileFeel: 'Mịn như ngọc bích, phản quang ánh sáng dịu mắt',
        climateRole: 'Cân bằng trường năng lượng, tạo điểm sáng không toả nhiệt',
        hex: '#C5A880',
      },
      {
        name: 'Đá Bazan Đắk Nông Nguyên Khối',
        source: 'Đá núi lửa vùng cao nguyên Tây Nguyên khai thác hợp chuẩn',
        finish: 'Đẽo tay sần tự nhiên kết hợp xẻ rãnh thoát nước',
        tactileFeel: 'Thô ráp nguyên thủy, lưu giữ độ ẩm mát lạnh',
        climateRole: 'Phát tán ion âm theo màn sương nước, giữ mát sân trong',
        hex: '#3E3D39',
      },
      {
        name: 'Gỗ Sao Cát Ghe Bầu Trăm Tuổi',
        source: 'Gỗ tái chế từ thân ghe bầu Nam Bộ ngâm nước sông nhiều thập kỷ',
        finish: 'Đánh cước sắt nổi vân tôm, giữ lớp patina cổ kính',
        tactileFeel: 'Đậm đà dấu ấn thời gian, chắc nịch như đá hóa thạch',
        climateRole: 'Kháng nước mặn và ẩm tuyệt đối, 0 cong vênh',
        hex: '#654321',
      },
    ],
    climateMetrics: [
      { title: 'Mật độ hạt bụi PM2.5', value: '< 10 µg/m³', detail: 'Màn nước ion âm lọc bụi mịn tự nhiên' },
      { title: 'Tĩnh âm thác nước', value: '18 dBA', detail: 'Âm thanh róc rách tần số chữa lành 528Hz' },
      { title: 'Độ ẩm vi mô ổn định', value: '52% RH', detail: 'Ngăn khô rát điều hòa cho gia đình' },
      { title: 'Chỉ số hoàn màu ánh sáng', value: 'CRI 98', detail: 'Ánh sáng phản chiếu qua ngọc Onyx ấm cúng' },
    ],
    specs: [
      { label: 'Hướng công trình', value: 'Đông Nam (Đón gió kênh đào mát lành)' },
      { label: 'Thời gian thi công', value: '120 ngày may đo độc bản tại xưởng Thạnh Xuân' },
      { label: 'Vật liệu chủ đạo', value: 'Onyx Iran, Bazan Gia Lai, Gỗ Sao Cát' },
      { label: 'Tĩnh âm vi mô', value: '< 18 dBA thác nước êm đềm' },
    ],
    quoteStyle: 'wabi-sabi',
  },
  {
    id: 'ecopark',
    title: 'Biệt Thự Đảo Ecopark SwanBay',
    subtitle: 'Ốc đảo sinh thái biệt lập bốn bề sóng nước',
    location: 'Đảo Đại Phước, Giáp ranh Quận 2 & Đồng Nai',
    area: '680 m² · Biệt thự sân vườn 3 mặt sông',
    climateChallenge: 'Hơi ẩm sương sớm bốc từ mặt nước sông Đồng Nai, gió bão nhiệt đới mùa mưa và nắng gắt phản xạ mặt nước.',
    solution: 'Hệ mái ngói âm dương Chợ Lớn 4 tầng men xanh lý, vòm gỗ Dổi sấy chân không và trục thông gió đối lưu tự nhiên 24/7.',
    tempReduction: '-5.2°C',
    humidityControl: '50% RH',
    image: '/media/chung-cu-1-2-ngu/0-1600.webp',
    imageAlt: 'Biệt thự đảo Ecopark SwanBay kiến trúc vi khí hậu GuHomes',
    soundscapeName: 'Chuông Gió Gốm & Gió Vườn Đảo',
    soundscapeFreq: 396,
    tactileMaterials: [
      {
        name: 'Ngói Âm Dương Men Xanh Lý Cây Mai',
        source: 'Lò gốm thủ công Chợ Lớn nung củi truyền thống 1.250°C',
        finish: 'Men xanh ngọc rạn tự nhiên, chống bám rêu phong',
        tactileFeel: 'Mát láng bề mặt men, gân cốt đất nung xốp giữ nhiệt tốt',
        climateRole: 'Tản 85% nhiệt mặt trời, bảo vệ lớp kết cấu mái vòm',
        hex: '#4A6B56',
      },
      {
        name: 'Gỗ Dổi Vàng Sấy Chân Không',
        source: 'Gỗ rừng trồng tuyển chọn, sấy đạt ẩm 10% tại Thạnh Xuân',
        finish: 'Lau sáp ong tự nhiên giữ trọn mùi thơm thanh khiết',
        tactileFeel: 'Mịn màng, ấm tay, ánh vàng óng ánh khi có nắng xiên',
        climateRole: 'Tự điều tiết ẩm phòng ngủ, xua đuổi côn trùng tự nhiên',
        hex: '#A07855',
      },
      {
        name: 'Đá Ong Xám Bến Nghé Cổ',
        source: 'Đá ong tổ ong tự nhiên cắt lát dày 30mm',
        finish: 'Bề mặt lỗ rỗng nguyên bản xịt áp lực cao',
        tactileFeel: 'Thô ráp mát lành, thấm nước nhanh tức thì',
        climateRole: 'Hút nước mưa thoát ẩm cực nhanh, chống trơn trượt sân vườn',
        hex: '#696969',
      },
    ],
    climateMetrics: [
      { title: 'Lưu lượng gió mát', value: '2.400 m³/h', detail: 'Hệ mái vòm kéo gió sông đối lưu tự nhiên' },
      { title: 'Nhiệt độ mặt sàn hiên', value: '27.5°C', detail: 'Đá ong xám giữ mát dưới nắng trưa 36°C' },
      { title: 'Kháng nấm mốc phòng', value: '100%', detail: 'Gỗ Dổi sấy chân không ngậm sáp ong tự nhiên' },
      { title: 'Thời gian thi công mái', value: '35 ngày', detail: 'Lắp ráp mộng gỗ truyền thống tại công trình' },
    ],
    specs: [
      { label: 'Hướng công trình', value: 'Nam · Đông Nam (3 mặt tiếp giáp mặt nước)' },
      { label: 'Thời gian thi công', value: '110 ngày may đo thủ công tại xưởng Thạnh Xuân' },
      { label: 'Vật liệu chủ đạo', value: 'Gỗ Dổi, Ngói men Chợ Lớn, Đá ong xám' },
      { label: 'Thính âm salon', value: 'Phòng hòa tấu Harpsichord RT60 0.34s' },
    ],
    quoteStyle: 'minimalist',
  },
  {
    id: 'riviera-thaodien',
    title: 'Biệt Thự Riviera Cove Thảo Điền',
    subtitle: 'Vươn console kính sàn thủy cung soi bóng nước triều dâng',
    location: 'Nguyễn Văn Hưởng, Thảo Điền, TP. Thủ Đức',
    area: '580 m² · Biệt thự đơn lập 3 tầng mặt sông Sài Gòn',
    climateChallenge: 'Độ ẩm 80% - 85% RH mùa mưa, sương muối hơi nước sông Sài Gòn và bức xạ nhiệt nắng gắt hướng Tây.',
    solution: 'Hệ lam nhôm Anode champagne xoay góc tản nhiệt 85%, sàn gỗ Teak Myanmar 28mm và đài quan sát kính Low-E 38mm.',
    tempReduction: '-5.8°C',
    humidityControl: '51% RH',
    image: '/media/ben-kia-song/12-1600.webp',
    imageAlt: 'Biệt thự Riviera Cove Thảo Điền thiết kế nội thất ven sông GuHomes',
    soundscapeName: 'Thủy Triều Sông & Chuông Gió 432Hz',
    soundscapeFreq: 639,
    tactileMaterials: [
      {
        name: 'Gỗ Teak Myanmar Lõi Già Tuyển Lựa',
        source: 'Kho gỗ quý xưởng Thạnh Xuân 1.200m², sấy chân không 10.5%',
        finish: 'Lau dầu sáp carnauba thực vật chịu sương muối bờ sông',
        tactileFeel: 'Mịn màng, không dăm gỗ, đầm chắc từng bước chân',
        climateRole: 'Chống mục rỗng ngâm sương, ổn định kích thước dưới biên độ ẩm',
        hex: '#7A5230',
      },
      {
        name: 'Kính Low-E SentryGlas 38mm',
        source: 'Kính siêu trong tôi nhiệt 3 lớp ghép màng chống va đập',
        finish: 'Mài bóng vi kim cương cạnh viền, kín nước tuyệt đối',
        tactileFeel: 'Trong suốt phẳng phiu, soi rõ đàn cá dưới đáy sông',
        climateRole: 'Chịu tải 500kg/m², cản 99.8% tia UV gây hại nội thất',
        hex: '#2E8B57',
      },
      {
        name: 'Nhôm Hàng Không Anode Champagne',
        source: 'Hợp kim 6063-T6 mạ Anodized mờ chống ăn mòn điện hóa',
        finish: 'Phun cát mịn bề mặt, ánh sâm-panh mờ sang trọng',
        tactileFeel: 'Mát lạnh kim loại tinh xảo, trơn tru cơ học',
        climateRole: 'Tản nhiệt bức xạ hướng Tây 85%, điều hướng gió sông',
        hex: '#D4AF37',
      },
    ],
    climateMetrics: [
      { title: 'Tản nhiệt hướng Tây', value: '85%', detail: 'Lam nhôm xoay góc 0 - 90 độ theo quỹ đạo mặt trời' },
      { title: 'Chịu tải sàn kính', value: '500 kg/m²', detail: 'Kính Low-E 3 lớp dày 38mm tải trọng an toàn tuyệt đối' },
      { title: 'Độ ẩm phòng khách', value: '51% RH', detail: 'Hút ẩm tự nhiên qua khe thoáng đối lưu hai chiều' },
      { title: 'Thời gian bảo hành', value: '5 năm', detail: 'Bảo dưỡng kết cấu mộc ngoài trời miễn phí trọn đời' },
    ],
    specs: [
      { label: 'Hướng công trình', value: 'Tây Nam (Mặt tiền trực diện khúc cong sông Sài Gòn)' },
      { label: 'Thời gian thi công', value: '115 ngày may đo trọn gói tại xưởng Thạnh Xuân' },
      { label: 'Vật liệu chủ đạo', value: 'Teak Myanmar, Kính Low-E 38mm, Nhôm Anode Champagne' },
      { label: 'Âm học thính phòng', value: 'Hệ tiêu âm Bongos RT60 = 0.29s' },
    ],
    quoteStyle: 'modern-luxury',
  },
  {
    id: 'chateau-phumyhung',
    title: 'Dinh Thự Lâu Đài Chateau Phú Mỹ Hưng',
    subtitle: 'Nghệ thuật khảm ngọc trầm hương và hồ cá Koi âm sàn kính',
    location: 'Bán Đảo Nam Viên, Phú Mỹ Hưng, Quận 7',
    area: '750 m² · Dinh thự đơn lập 3 tầng phong cách Tân cổ điển Quiet Luxury',
    climateChallenge: 'Gió nồm ẩm phương Nam mang hơi ẩm vịnh Cần Giờ 82% RH, chênh lệch nhiệt độ bề mặt sàn đá ban ngày và ban đêm.',
    solution: 'Sàn đá Travertine Navona Ý xẻ mộc thở nano, trần vòm nan gỗ Cẩm Lai tán âm và tượng Di Lặc Trầm hương nạm bạc 999 tỏa vi hương thanh khiết.',
    tempReduction: '-5.0°C',
    humidityControl: '52% RH',
    image: '/media/nha-pho-hien-dai-nha-pho-1-mat-tien/1-1200.webp',
    imageAlt: 'Dinh thự Chateau Phú Mỹ Hưng nội thất mộc đá ngọc GuHomes',
    soundscapeName: 'Suối Thạch Anh & Chuông Gốm 741Hz',
    soundscapeFreq: 741,
    tactileMaterials: [
      {
        name: 'Trầm Hương Chìm Nước Nạm Bạc 999',
        source: 'Phôi Trầm hương rừng Khánh Hòa nạm chỉ bạc ròng 0.20mm',
        finish: 'Khảm rãnh ngầm mộng đuôi én thủ công không dùng keo',
        tactileFeel: 'Thơm ngọt dịu mát, sớ dầu đen sánh ngậm tinh túy',
        climateRole: 'Tỏa vi hương kháng khuẩn, chống ẩm mốc phòng điều hòa',
        hex: '#4A2C11',
      },
      {
        name: 'Đá Cẩm Thạch Calacatta Gold',
        source: 'Mỏ đá tự nhiên Carrara Ý xẻ nguyên khối',
        finish: 'Mài bóng mờ Honed, phủ nano thở hai chiều',
        tactileFeel: 'Mịn màng tinh khôi, đường vân vàng kim hổ phách',
        climateRole: 'Giữ nhiệt mát dịu lâu dài, cân bằng nhiệt độ sàn nhà',
        hex: '#FDFBF7',
      },
      {
        name: 'Gỗ Cẩm Lai Nam Bộ Vân Lông Chuột',
        source: 'Cây gỗ quý già tuổi hoàn thiện tại Thạnh Xuân 1.200m²',
        finish: 'Đánh bóng bằng sáp ong rừng, không phủ bóng PU nhân tạo',
        tactileFeel: 'Mát đanh, chắc nặng, bóng mượt tự nhiên theo thời gian',
        climateRole: 'Chống mối mọt vĩnh viễn, triệt tiêu tiếng vang flutter echo',
        hex: '#3B2317',
      },
    ],
    climateMetrics: [
      { title: 'Tĩnh âm phòng khách', value: '22 dBA', detail: 'Vòm nan Cẩm Lai tán âm dải tần 2.500Hz - 4.000Hz' },
      { title: 'Kháng ẩm mốc tự nhiên', value: '100%', detail: 'Nhờ tinh dầu Trầm hương Khánh Hòa và sáp ong tự nhiên' },
      { title: 'Độ phản quang ánh sáng', value: 'CRI 98', detail: 'Hệ đèn âm trần 2700K tôn vinh chỉ bạc 999 và đá Calacatta' },
      { title: 'Giới hạn công trình', value: '12 căn/năm', detail: 'Đảm bảo KTS Trưởng trực tiếp giám sát từng cấu kiện' },
    ],
    specs: [
      { label: 'Hướng công trình', value: 'Đông Nam (Đón gió sông Nhà Bè trong lành)' },
      { label: 'Thời gian thi công', value: '135 ngày may đo độc bản tại xưởng Thạnh Xuân' },
      { label: 'Vật liệu chủ đạo', value: 'Calacatta Gold, Gỗ Cẩm Lai, Trầm Hương Nạm Bạc' },
      { label: 'Bảo chứng độc bản', value: 'Triện thư GU-AGARWOOD-MAITREYA-2026-X' },
    ],
    quoteStyle: 'contemporary',
  },
]

type ActiveTab = 'overview' | 'tactile' | 'climate'

export function BespokeSpatialLookbookShowcase({ className }: { className?: string }) {
  const [selectedId, setSelectedId] = useState('metropole')
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview')
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const { openQuoteModal } = useQuickQuote()

  const currentLookbook = LOOKBOOKS.find((l) => l.id === selectedId) ?? LOOKBOOKS[0]!

  // Dọn dẹp âm thanh khi unmount hoặc đổi công trình
  useEffect(() => {
    return () => {
      stopAudio()
    }
  }, [selectedId])

  const stopAudio = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop()
        oscillatorRef.current.disconnect()
      } catch {
        // bỏ qua nếu đã stop
      }
      oscillatorRef.current = null
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect()
      gainNodeRef.current = null
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {})
      audioContextRef.current = null
    }
    setIsPlayingAudio(false)
  }

  const toggleSoundscape = async () => {
    if (isPlayingAudio) {
      stopAudio()
      return
    }

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AudioCtx()
      audioContextRef.current = ctx

      // Sóng sin tần số hài hòa mô phỏng trường âm vi khí hậu
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(currentLookbook.soundscapeFreq, ctx.currentTime)

      // Điều chế dao động nhẹ tạo cảm giác gió sông / sóng nước
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime)
      lfoGain.gain.setValueAtTime(15, ctx.currentTime)
      lfo.connect(osc.frequency)
      lfo.start()

      // Làm êm âm lượng
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.2)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      oscillatorRef.current = osc
      gainNodeRef.current = gain
      setIsPlayingAudio(true)
    } catch {
      setIsPlayingAudio(false)
    }
  }

  return (
    <section
      id="lookbook-khong-gian"
      className={cn('u-gutter py-[clamp(4.5rem,10vh,8rem)] bg-surface/50 border-t border-line/60', className)}
    >
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-line">
          <div className="flex flex-col gap-3 max-w-[70ch]">
            <Label rule tone="accent">
              Tuyển Tập Lookbook Không Gian 2026
            </Label>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-normal text-ink leading-[1.2]">
              Khám phá giải pháp không gian thực tế tại các tâm điểm bất động sản Sài Gòn.
            </h2>
            <p className="font-body text-[1rem] text-ink/75 leading-relaxed mt-1">
              Mỗi công trình là một bài toán vi khí hậu đặc thù, được xưởng mộc Thạnh Xuân 1.200m² của GuHomes may đo riêng biệt từng chi tiết mộng gỗ, lớp sơn mài và phiến đá tự nhiên.
            </p>
          </div>

          {/* Lookbook Navigation Tabs */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {LOOKBOOKS.map((lb) => {
              const isActive = lb.id === selectedId
              return (
                <button
                  key={lb.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(lb.id)
                    stopAudio()
                  }}
                  className={cn(
                    'group relative flex min-h-[44px] items-center gap-2.5 rounded-full border px-5 py-2.5 font-body text-xs sm:text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer',
                    isActive
                      ? 'border-accent bg-espresso text-canvas shadow-md'
                      : 'border-line bg-surface hover:border-accent/50 hover:bg-canvas text-ink/80',
                  )}
                >
                  <span className={cn('h-2 w-2 rounded-full', isActive ? 'bg-accent animate-pulse' : 'bg-line')} />
                  <span>{lb.title.replace('Penthouse ', '').replace('Dinh Thự ', '').replace('Biệt Thự Đảo ', '')}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* View Mode Switcher Subtabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-line/60 pb-4">
          <div className="flex items-center gap-2 bg-canvas/80 p-1 rounded-xl border border-line">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={cn(
                'min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-mono transition-all',
                activeTab === 'overview'
                  ? 'bg-espresso text-canvas font-medium shadow-xs'
                  : 'text-muted hover:text-ink',
              )}
            >
              1. Tổng Quan Không Gian
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tactile')}
              className={cn(
                'min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-mono transition-all',
                activeTab === 'tactile'
                  ? 'bg-espresso text-canvas font-medium shadow-xs'
                  : 'text-muted hover:text-ink',
              )}
            >
              2. Bóc Tách Xúc Giác Vật Liệu
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('climate')}
              className={cn(
                'min-h-[38px] px-4 py-1.5 rounded-lg text-xs font-mono transition-all',
                activeTab === 'climate'
                  ? 'bg-espresso text-canvas font-medium shadow-xs'
                  : 'text-muted hover:text-ink',
              )}
            >
              3. Mặt Cắt Vi Khí Hậu
            </button>
          </div>

          {/* Soundscape Interactive Player */}
          <button
            type="button"
            onClick={toggleSoundscape}
            className={cn(
              'min-h-[40px] px-4 py-2 rounded-full border text-xs font-mono flex items-center gap-2.5 transition-all cursor-pointer',
              isPlayingAudio
                ? 'border-accent bg-accent/15 text-accent shadow-sm animate-pulse'
                : 'border-line bg-canvas hover:border-accent/40 text-muted hover:text-ink',
            )}
            title="Nghe mô phỏng âm học môi trường vi khí hậu"
          >
            <span className={cn('h-2 w-2 rounded-full', isPlayingAudio ? 'bg-accent' : 'bg-line')} />
            <span>{isPlayingAudio ? 'Đang phát trường âm: ' : 'Mô phỏng âm học: '} {currentLookbook.soundscapeName} ({currentLookbook.soundscapeFreq}Hz)</span>
          </button>
        </div>

        {/* Dynamic Lookbook Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentLookbook.id}-${activeTab}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14 items-start"
          >
            {/* Left 7 Cols: Image & Visual Representation */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-surface shadow-2xl group rounded-2xl">
                <Image
                  src={currentLookbook.image}
                  alt={currentLookbook.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/20 to-transparent" />

                {/* Overlaid Badges */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                  <div className="flex flex-col gap-1 text-canvas">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-soft">
                      {currentLookbook.location}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-canvas">
                      {currentLookbook.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center justify-center rounded-lg bg-espresso/85 border border-accent/40 px-3.5 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-[11px] uppercase text-accent-soft">Hạ nhiệt</span>
                      <span className="font-display text-lg font-medium text-canvas">{currentLookbook.tempReduction}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center rounded-lg bg-espresso/85 border border-accent/40 px-3.5 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-[11px] uppercase text-accent-soft">Cân bằng ẩm</span>
                      <span className="font-display text-lg font-medium text-canvas">{currentLookbook.humidityControl}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Material Swatches Palette Bar */}
              <div className="p-5 rounded-xl border border-line bg-surface/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-muted shrink-0">
                  Bảng Màu & Cảm Quan Vật Liệu:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto flex-1 sm:justify-end">
                  {currentLookbook.tactileMaterials.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-canvas border border-line/60">
                      <span
                        className="h-6 w-6 rounded-full border border-black/10 shrink-0 shadow-xs"
                        style={{ backgroundColor: p.hex }}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-medium text-ink truncate">{p.name}</span>
                        <span className="text-[10px] text-muted truncate">{p.finish}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Tab-dependent Deep Breakdown */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Header Info */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 font-mono text-xs text-accent">
                  <span>● LOOKBOOK {currentLookbook.id.toUpperCase()}</span>
                  <span>·</span>
                  <span>{currentLookbook.area}</span>
                </div>
                <h4 className="font-display text-2xl text-ink">
                  {currentLookbook.subtitle}
                </h4>
              </div>

              {/* Tab 1: Overview */}
              {activeTab === 'overview' && (
                <div className="flex flex-col gap-4">
                  {/* Climate Challenge & Solution Card */}
                  <div className="flex flex-col gap-4 rounded-xl border border-line bg-canvas p-6 shadow-sm">
                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-red-700/80 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                        Thách thức vi khí hậu thực tế:
                      </span>
                      <p className="font-body text-sm text-ink/80 leading-relaxed">
                        {currentLookbook.climateChallenge}
                      </p>
                    </div>

                    <div className="h-[1px] w-full bg-line" />

                    <div className="flex flex-col gap-1.5">
                      <span className="font-mono text-xs uppercase tracking-wider text-accent flex items-center gap-1.5">
                        <CheckIcon className="h-3.5 w-3.5 text-accent" />
                        Giải pháp may đo GuHomes:
                      </span>
                      <p className="font-body text-sm text-ink/90 font-medium leading-relaxed">
                        {currentLookbook.solution}
                      </p>
                    </div>
                  </div>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {currentLookbook.specs.map((s, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg border border-line/70 bg-surface/60 flex flex-col gap-1">
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">{s.label}</span>
                        <span className="font-body text-xs font-medium text-ink">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Tactile Material Breakdown */}
              {activeTab === 'tactile' && (
                <div className="flex flex-col gap-3.5">
                  <div className="rounded-xl border border-line bg-canvas p-4 text-xs font-body text-ink/80 leading-relaxed">
                    Tất cả phôi gỗ, phiến đá và vữa khoáng đều được gia công hoàn thiện tại <strong className="text-ink">Xưởng mộc Thạnh Xuân 1.200m²</strong> để kiểm soát dung sai dưới 0.5mm và tối ưu hóa phản xạ ánh sáng tự nhiên.
                  </div>

                  {currentLookbook.tactileMaterials.map((mat, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-line bg-canvas shadow-xs flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="h-3.5 w-3.5 rounded-full border border-black/10" style={{ backgroundColor: mat.hex }} />
                          <h5 className="font-body text-sm font-semibold text-ink">{mat.name}</h5>
                        </div>
                        <span className="text-[10px] font-mono text-muted uppercase">Mã VL 0{idx + 1}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5 pt-1 text-xs text-ink/80">
                        <div>
                          <span className="text-muted">Cảm quan xúc giác: </span>
                          <span className="font-medium text-ink">{mat.tactileFeel}</span>
                        </div>
                        <div>
                          <span className="text-muted">Xử lý hoàn thiện: </span>
                          <span>{mat.finish}</span>
                        </div>
                        <div>
                          <span className="text-muted">Vai trò vi khí hậu: </span>
                          <span className="text-accent font-medium">{mat.climateRole}</span>
                        </div>
                        <div className="text-[11px] text-muted italic pt-1">
                          Nguồn gốc: {mat.source}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 3: Climate Aerodynamics & Cross Section */}
              {activeTab === 'climate' && (
                <div className="flex flex-col gap-4">
                  <div className="rounded-xl border border-accent/30 bg-espresso text-canvas p-5 shadow-md">
                    <span className="font-mono text-xs uppercase tracking-wider text-accent-soft block mb-1">
                      Mô hình đối lưu & khí động học nhiệt đới
                    </span>
                    <p className="font-body text-xs sm:text-sm text-canvas/85 leading-relaxed">
                      Ứng dụng chênh lệch áp suất nhiệt độ giữa mặt đất và tầng cao, kết hợp lớp đệm gió sông Sài Gòn để tạo luồng khí đối lưu 24/7 mà không phụ thuộc hoàn toàn vào hệ thống HVAC.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLookbook.climateMetrics.map((metric, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-line bg-canvas shadow-xs flex flex-col gap-1.5">
                        <span className="font-mono text-xs text-muted uppercase tracking-wider">{metric.title}</span>
                        <span className="font-display text-2xl font-medium text-accent">{metric.value}</span>
                        <span className="text-xs text-ink/75 leading-relaxed">{metric.detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl border border-line bg-surface/70 text-xs text-ink/80 flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-600 shrink-0" />
                    <span>Hệ cảm biến IoT giám sát nhiệt ẩm vi mô liên tục báo về ứng dụng gia chủ GuHomes.</span>
                  </div>
                </div>
              )}

              {/* CTA Action Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="button"
                  onClick={() => openQuoteModal(currentLookbook.quoteStyle)}
                  className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-full bg-espresso hover:bg-ink text-canvas font-medium text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-md cursor-pointer border border-accent/40"
                >
                  <span>Nhận Báo Giá Không Gian Này</span>
                  <ArrowUpRightIcon className="text-base text-accent" />
                </button>

                <Link
                  href="/du-toan-chi-phi"
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-full border border-line hover:border-accent hover:bg-canvas text-ink text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Bóc tách m² từng phòng</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
