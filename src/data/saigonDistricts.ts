export interface DistrictFaq {
  question: string
  answer: string
}

export interface DistrictHub {
  slug: string
  name: string
  subHeading: string
  badge: string
  heroDescription: string
  prominentProjects: string[]
  microclimateSpecs: {
    averageHumidity: string
    solarRadiation: string
    windSpeed: string
    riverProximity: string
  }
  architecturalChallenges: {
    title: string
    problem: string
    solution: string
  }[]
  materialPalette: {
    name: string
    origin: string
    application: string
  }[]
  geoCoordinates: {
    latitude: number
    longitude: number
  }
  address: {
    street: string
    ward: string
    district: string
    city: string
  }
  faqs: DistrictFaq[]
}

export const SAIGON_DISTRICTS: Record<string, DistrictHub> = {
  'thu-thiem': {
    slug: 'thu-thiem',
    name: 'Bán Đảo Thủ Thiêm',
    subHeading: 'Trung tâm tài chính mới bên sông Sài Gòn — Nơi giao thoa giữa ánh sáng mặt nước và gió lộng tầng cao',
    badge: 'Đô Thị Mới Thủ Thiêm · TP. Thủ Đức',
    heroDescription:
      'Thủ Thiêm sở hữu tầm nhìn trực diện sông Sài Gòn và đường chân trời Quận 1. Tuy nhiên, căn hộ và duplex trên cao tại The Metropole hay Empire City phải đối mặt với hiện tượng phản xạ nhiệt mặt nước cực mạnh vào buổi chiều và gió giật mạnh ở các tầng 25+. GuHomes áp dụng triết lý Quiet Luxury với hệ lam gỗ xoay, kính Low-E cản nhiệt và phân tầng ánh sáng gián tiếp 2700K.',
    prominentProjects: [
      'The Metropole Thủ Thiêm (The Opera & The Galleria)',
      'Empire City Thủ Thiêm (Cove Residences & Linden)',
      'The River Thủ Thiêm',
      'Lotte Eco Smart City',
    ],
    microclimateSpecs: {
      averageHumidity: '78–82% quanh năm',
      solarRadiation: 'Chỉ số UV 10–11 vào xế chiều',
      windSpeed: 'Gió giật tầng cao 4.5–6.2 m/s',
      riverProximity: 'Khoảng cách bờ sông 80–150m',
    },
    architecturalChallenges: [
      {
        title: 'Bức xạ nhiệt mặt nước sông xế chiều',
        problem: 'Mặt nước sông Sài Gòn đóng vai trò như chiếc gương cầu khổng lồ phản xạ nhiệt lượng vào các căn hộ hướng Tây/Tây Nam.',
        solution: 'Thiết kế hệ lam gỗ óc chó tự nhiên xoay 45° kết hợp rèm vải lanh Bỉ cản nhiệt hai lớp, hạ nhiệt độ phòng khách 5°C.',
      },
      {
        title: 'Gió giật và tiếng rít qua khe cửa tầng cao',
        problem: 'Ở độ cao trên 100m, áp lực gió sông gây tiếng rít khí động học khó chịu và rung lắc cửa kính trượt khổ lớn.',
        solution: 'Gia cố khung nhôm cầu cách âm cách nhiệt Schüco, gioăng cao su EPDM kép và hệ vách tiêu âm vữa vôi Calce.',
      },
    ],
    materialPalette: [
      {
        name: 'Đá Silver Vein-Cut Travertine',
        origin: 'Tivoli, Ý',
        application: 'Đảo bếp nguyên khối và vách phòng khách hướng sông',
      },
      {
        name: 'Gỗ Óc Chó Bắc Mỹ FAS EMC 10%',
        origin: 'Mỹ',
        application: 'Hệ tủ mộc may đo âm tường với khe co ngót 4mm',
      },
      {
        name: 'Vữa vôi Calce Limewash',
        origin: 'Ý',
        application: 'Bề mặt tường tự thở điều hòa vi khí hậu',
      },
    ],
    geoCoordinates: {
      latitude: 10.7769,
      longitude: 106.7092,
    },
    address: {
      street: 'Đại lộ Vòng Cung, Khu đô thị mới Thủ Thiêm',
      ward: 'Phường An Khánh',
      district: 'TP. Thủ Đức',
      city: 'TP. Hồ Chí Minh',
    },
    faqs: [
      {
        question: 'Căn hộ The Metropole Thủ Thiêm hướng Tây nên xử lý nội thất thế nào để không bị nóng?',
        answer:
          'GuHomes khuyên dùng hệ vách đệm lam gỗ xoay kết hợp rèm lanh dệt thô hai lớp và đá Travertine bề mặt mờ. Đá tự nhiên có quán tính nhiệt lớn, hấp thụ nhiệt thừa ban ngày và tỏa mát vào ban đêm.',
      },
      {
        question: 'Thời gian thi công hoàn thiện nội thất penthouse tại Thủ Thiêm mất bao lâu?',
        answer:
          'Thông thường từ 60 đến 75 ngày làm việc, bao gồm 45 ngày gia công may đo tại xưởng mộc Thạnh Xuân và 20 ngày lắp đặt, tinh chỉnh tại công trình theo quy chuẩn nghiệm thu 7 giai đoạn.',
      },
    ],
  },

  'thao-dien': {
    slug: 'thao-dien',
    name: 'Bán Đảo Thảo Điền',
    subHeading: 'Ốc đảo sinh thái châu Âu giữa lòng nhiệt đới — Độ ẩm cao 85% và nếp sống giao hòa cùng thiên nhiên',
    badge: 'Khu Biệt Thự & Căn Hộ Hạng Sang · TP. Thủ Đức',
    heroDescription:
      'Được ôm trọn bởi khúc uốn sông Sài Gòn thơ mộng, Thảo Điền sở hữu không gian xanh rợp bóng mát nhưng cũng là nơi có độ ẩm không khí cao nhất nhì thành phố (lên tới 85% vào mùa mưa). Kiến trúc nội thất tại D\'Edge, Holm Villas hay Q2 Thảo Điền đòi hỏi giải pháp bảo tồn gỗ nghiêm ngặt, sử dụng gỗ Teak tự nhiên và thông gió xuyên phòng không góc chết.',
    prominentProjects: [
      'D\'Edge Thảo Điền (Hồ bơi vô cực đáy kính)',
      'Holm Residences Thảo Điền (Biệt thự ven sông)',
      'Q2 Thảo Điền',
      'The Nassim Thảo Điền',
    ],
    microclimateSpecs: {
      averageHumidity: '82–86% vào mùa mưa',
      solarRadiation: 'Ánh nắng tán xạ qua tán cây cổ thụ',
      windSpeed: 'Gió sông mát lành 1.8–3.2 m/s',
      riverProximity: 'Bán đảo bao bọc 3 mặt sông',
    },
    architecturalChallenges: [
      {
        title: 'Độ ẩm cao gây ẩm mốc và giãn nở gỗ công nghiệp',
        problem: 'Độ ẩm 85% kết hợp máy lạnh bật ngắt quãng khiến gỗ công nghiệp dễ hút ẩm mục nát và nấm mốc phát triển.',
        solution: '100% gỗ tự nhiên FAS xử lý lau dầu Osmo gốc thực vật, cho phép thớ gỗ thở tự nhiên mà kháng ẩm tuyệt đối.',
      },
      {
        title: 'Tối ưu hóa tầm nhìn sân vườn và ban công nhiệt đới',
        problem: 'Nhiều căn hộ có ban công sâu nhưng thiếu kết nối thị giác giữa phòng khách và mảng xanh ngoài trời.',
        solution: 'Hạ cốt sàn logia ngang bằng sàn phòng khách, sử dụng vách kính trượt giấu khung âm tường toàn phần.',
      },
    ],
    materialPalette: [
      {
        name: 'Gỗ Teak (Gỗ Giá Tỵ) Tự Nhiên',
        origin: 'Đông Nam Á',
        application: 'Sàn logia, bàn ăn ngoài trời và vách ốp khu vực ẩm',
      },
      {
        name: 'Vải Lanh Bỉ Dệt Thô Mộc',
        origin: 'Bỉ',
        application: 'Bọc sofa, rèm cửa hai lớp kháng ẩm tự nhiên',
      },
      {
        name: 'Đồng Thau Thủ Công Hoàn Thiện Xước',
        origin: 'Việt Nam',
        application: 'Tay nắm cửa may đo, phụ kiện phòng tắm patina',
      },
    ],
    geoCoordinates: {
      latitude: 10.8032,
      longitude: 106.741,
    },
    address: {
      street: 'Đường Nguyễn Văn Hưởng & Xa Lộ Hà Nội',
      ward: 'Phường Thảo Điền',
      district: 'TP. Thủ Đức',
      city: 'TP. Hồ Chí Minh',
    },
    faqs: [
      {
        question: 'Tại sao GuHomes ưu tiên gỗ Teak và gỗ Óc Chó tại Thảo Điền?',
        answer:
          'Gỗ Teak và Óc Chó Bắc Mỹ có hàm lượng dầu tự nhiên cao và độ co ngót thể tích cực thấp, không bị phồng rộp hay mốc mọt khi tiếp xúc độ ẩm sông 85% quanh năm.',
      },
      {
        question: 'GuHomes có nhận cải tạo biệt thự cổ sân vườn tại Thảo Điền không?',
        answer:
          'Có. GuHomes chuyên sâu mảng cải tạo biệt thự cao cấp: xử lý chống thấm ngược nền móng, thông gió đối lưu vi khí hậu và bảo tồn cấu trúc kiến trúc nguyên bản.',
      },
    ],
  },

  'phu-my-hung': {
    slug: 'phu-my-hung',
    name: 'Khu Đô Thị Phú Mỹ Hưng',
    subHeading: 'Không gian chuẩn mực Nam Sài Gòn — Đón trọn luồng gió mát Nam Viên và nếp sống thanh bình',
    badge: 'Đô Thị Kiểu Mẫu · Quận 7',
    heroDescription:
      'Phú Mỹ Hưng (đặc biệt là khu Nam Viên với Lâu đài Chateau, Biệt thự Mỹ Gia, The Peak Midtown) là thiên đường của những gia chủ tìm kiếm sự tĩnh tại. Địa thế đón trọn luồng gió hướng Nam từ biển Cần Giờ thổi về, mang theo không khí trong lành nhưng cũng giàu hơi ẩm muối khoáng. GuHomes tạo lập ngôn ngữ kiến trúc cân bằng với giếng trời đối lưu và chất liệu đá phiến mộc mạc.',
    prominentProjects: [
      'Khu Biệt Thự Lâu Đài Chateau Phú Mỹ Hưng',
      'Biệt thự phố vườn Mỹ Gia & Mỹ Văn',
      'Midtown The Peak & The Signature',
      'Scenic Valley & Green Valley',
    ],
    microclimateSpecs: {
      averageHumidity: '76–80% quanh năm',
      solarRadiation: 'Nắng hướng Nam chan hòa, mát mẻ',
      windSpeed: 'Gió Nam - Đông Nam 2.5–4.0 m/s',
      riverProximity: 'Rạch R 배 & sông Cảnh Quan',
    },
    architecturalChallenges: [
      {
        title: 'Hơi ẩm muối khoáng làm xỉn phụ kiện kim loại',
        problem: 'Gió từ hướng biển Cần Giờ mang vi lượng muối khoáng có thể làm ố mạ crom hoặc oxy hóa bản lề phụ kiện thông thường.',
        solution: '100% phụ kiện inox SUS 304 chuẩn hàng hải và đồng thau đúc nguyên khối hoàn thiện sáp vi tinh thể.',
      },
      {
        title: 'Tổ chức không gian thông tầng cho nhà phố & biệt thự',
        problem: 'Nhà phố liền kề thường bị thiếu sáng và bí khí ở trục giữa nhà.',
        solution: 'Thiết kế lõi giếng trời thông gió thẳng đứng, kết hợp vách lam gỗ lấy sáng gián tiếp và tiểu cảnh khô Wabi-Sabi.',
      },
    ],
    materialPalette: [
      {
        name: 'Đá Phiến Slate Xẻ Thô',
        origin: 'Đà Nẵng',
        application: 'Tường thông tầng giếng trời, hồ cá Koi và hiên nhà',
      },
      {
        name: 'Gỗ Sồi Trắng Bắc Mỹ (White Oak)',
        origin: 'Mỹ',
        application: 'Sàn gỗ xương cá, tủ áo cánh kính Moru',
      },
      {
        name: 'Gạch Gốm Thủ Công Nung Men Tro',
        origin: 'Bát Tràng',
        application: 'Bếp đảo và điểm nhấn phòng trà đạo',
      },
    ],
    geoCoordinates: {
      latitude: 10.7228,
      longitude: 106.7198,
    },
    address: {
      street: 'Đại lộ Nguyễn Lương Bằng, Khu đô thị Phú Mỹ Hưng',
      ward: 'Phường Tân Phú',
      district: 'Quận 7',
      city: 'TP. Hồ Chí Minh',
    },
    faqs: [
      {
        question: 'Nhà phố biệt thự tại Phú Mỹ Hưng có cần lắp giếng trời thông gió không?',
        answer:
          'Rất nên lắp đặt. Giếng trời tạo hiệu ứng ống khói (stack effect), hút khí nóng thoát lên trên và kéo luồng gió mát hướng Nam tràn qua các tầng, giảm 40% thời gian chạy điều hòa.',
      },
      {
        question: 'GuHomes có xưởng sản xuất trực tiếp không?',
        answer:
          'GuHomes sở hữu xưởng mộc may đo riêng tại Thạnh Xuân, Quận 12 với hệ thống máy dán cạnh tự động và thợ mộc gia truyền, kiểm soát dung sai dưới 1.5mm.',
      },
    ],
  },

  'ba-son': {
    slug: 'ba-son',
    name: 'Ba Son — Trung Tâm Quận 1',
    subHeading: 'Vị thế di sản ven sông giữa trái tim Sài Gòn — Tách biệt ồn ào đô thị bằng không gian Quiet Luxury tĩnh tại',
    badge: 'Bất Động Sản Hàng Hiệu · Quận 1',
    heroDescription:
      'Nằm tại vị trí kim cương nơi sông Sài Gòn gặp trung tâm lịch sử Quận 1, khu phức hợp Ba Son (Grand Marina Saigon, Vinhomes Golden River) là biểu tượng đỉnh cao của phong cách sống thượng lưu. Thách thức lớn nhất tại đây là tiếng ồn đô thị từ các trục đường huyết mạch và ánh sáng đèn đêm thành phố. GuHomes tạo lập một "ốc đảo tĩnh lặng" tuyệt đối với tường vữa vôi tiêu âm và giải pháp ánh sáng rãnh âm trần dịu mắt.',
    prominentProjects: [
      'Grand Marina Saigon (Marriott & JW Marriott Residences)',
      'Vinhomes Golden River (Aqua & Luxury Villas)',
      'The Centennial Ba Son',
    ],
    microclimateSpecs: {
      averageHumidity: '74–78%',
      solarRadiation: 'Nắng sớm hướng Đông lấp lánh',
      windSpeed: 'Gió khúc sông Bến Nghé 2.0–3.5 m/s',
      riverProximity: 'Mặt tiền sông Sài Gòn & Thảo Cầm Viên',
    },
    architecturalChallenges: [
      {
        title: 'Ô nhiễm tiếng ồn đô thị và đèn xe ban đêm',
        problem: 'Căn hộ trung tâm chịu ảnh hưởng bởi tiếng còi xe và ánh đèn đô thị gây xao động giấc ngủ.',
        solution: 'Hệ thống rèm may đo 3 lớp kết hợp vách tường ốp gỗ bọc nỉ tiêu âm gián tiếp, giảm độ ồn xuống dưới 32dB.',
      },
      {
        title: 'Tối ưu hóa không gian sống đắt giá từng centimet',
        problem: 'Giá trị mỗi mét vuông tại Ba Son thuộc hàng cao nhất cả nước, đòi hỏi công năng cực kỳ chuẩn mực.',
        solution: 'Hệ tủ module giấu nẹp, tích hợp bàn làm việc trượt âm tường và phụ kiện Hafele thông minh mở rộng diện tích.',
      },
    ],
    materialPalette: [
      {
        name: 'Đá Cẩm Thạch Nero Marquina & Calacatta',
        origin: 'Tây Ban Nha & Ý',
        application: 'Mặt bàn ăn, ốp phòng tắm master và kệ tivi',
      },
      {
        name: 'Gỗ Óc Chó Lau Dầu Mờ (Matte Finish)',
        origin: 'Mỹ',
        application: 'Vách ốp trang trí, hệ tủ kịch trần không tay nắm',
      },
      {
        name: 'Kính Vân Sóng Khung Kim Loại Tối Giản',
        origin: 'Đức',
        application: 'Vách ngăn phòng thay đồ và phòng làm việc',
      },
    ],
    geoCoordinates: {
      latitude: 10.7836,
      longitude: 106.7082,
    },
    address: {
      street: 'Số 2 Tôn Đức Thắng, Phường Bến Nghé',
      ward: 'Phường Bến Nghé',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
    },
    faqs: [
      {
        question: 'Thiết kế căn hộ hàng hiệu Grand Marina Saigon có cần tuân theo quy chuẩn của Marriott không?',
        answer:
          'GuHomes am hiểu sâu sắc quy chuẩn Fit-out của các đơn vị quản lý quốc tế (Marriott, Savills, CBRE): vật liệu chống cháy chuẩn Class A, phụ kiện chịu lực đạt chứng chỉ quốc tế và bảo vệ lớp kính Low-E.',
      },
      {
        question: 'Làm thế nào để nhận dự toán chi phí nội thất căn hộ tại Ba Son?',
        answer:
          'Quý gia chủ có thể sử dụng công cụ Dự toán chi phí trực tuyến của GuHomes tại trang /du-toan-chi-phi hoặc liên hệ Hotline 0368 757 916 để KTS Trưởng đến tận nơi khảo sát mặt bằng.',
      },
    ],
  },
}

export const DISTRICT_LIST = Object.values(SAIGON_DISTRICTS)
