'use client'

import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRightIcon, CheckIcon } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

export type MaterialId = 'american-walnut' | 'myanmar-teak' | 'raw-brass' | 'tuscany-leather'

export type TimeEpoch = 0 | 1 | 5 | 15 | 30

interface EpochDetail {
  yearLabel: string
  headline: string
  visualDescription: string
  tactileFeel: string
  colorHex: string
  gradientOverlay: string
  patinaScore: number
  maintenanceNote: string
}

interface MaterialSpec {
  id: MaterialId
  nameVi: string
  scientificName: string
  originVi: string
  tagVi: string
  jankaHardness: string
  finishType: string
  naturalOil: string
  longevityRating: string
  applicationVi: string
  corePhilosophy: string
  epochs: Record<TimeEpoch, EpochDetail>
}

const MATERIALS_DATA: Record<MaterialId, MaterialSpec> = {
  'american-walnut': {
    id: 'american-walnut',
    nameVi: 'Gỗ Óc Chó Bắc Mỹ (FAS American Walnut)',
    scientificName: 'Juglans nigra · Xuất xứ Bắc Mỹ (Appalachian)',
    originVi: 'Gỗ hạng FAS nhập khẩu chính ngạch, sấy kiln 9–11% EMC',
    tagVi: 'Vua Mộc Nội Thất · Càng dùng càng sáng mật ong',
    jankaHardness: '1,010 lbf (Độ đầm chắc cao, chống co ngót)',
    finishType: 'Lau dầu thực vật Osmo Polyx-Oil 2 thành phần (0% VOC)',
    naturalOil: 'Dầu hạt lanh, dầu thistle và sáp carnauba tự nhiên',
    longevityRating: '50+ năm (Giá trị truyền đời)',
    applicationVi: 'Hệ tủ áo Master, đảo bếp, bàn ăn nguyên tấm và lam ốp tường',
    corePhilosophy:
      'Gỗ Óc Chó tự nhiên có đặc tính quang học ngược lại với gỗ công nghiệp: qua năm tháng tiếp xúc ánh sáng và oxy không khí, gỗ chuyển dần từ sắc nâu tím sẫm sang ánh vàng mật ong đằm thắm, vân cuộn mây nổi rõ hiệu ứng 3D.',
    epochs: {
      0: {
        yearLabel: 'Ngày Bàn Giao',
        headline: 'Màu nâu chocolate ánh tím nguyên bản',
        visualDescription:
          'Bề mặt gỗ mới lau dầu Osmo có màu nâu trầm đậm đà, ánh tím nhẹ đặc trưng của phôi gỗ óc chó Appalachian tuyển chọn. Thớ gỗ mịn, đồng nhất và thơm mùi tinh dầu tự nhiên.',
        tactileFeel: 'Mịn màng, mờ satin (semi-matte), sờ vào cảm nhận được vi vân tự nhiên không bị màng sơn nhựa hóa bít tắc.',
        colorHex: '#3D2F28',
        gradientOverlay: 'linear-gradient(135deg, #3d2f28 0%, #2b201a 100%)',
        patinaScore: 20,
        maintenanceNote: 'Đã hoàn thiện 2 lớp dầu lót và 1 lớp sáp bóng mờ tại xưởng Thạnh Xuân.',
      },
      1: {
        yearLabel: 'Sau 1 Năm',
        headline: 'Độ no dầu ổn định, tông màu ấm dần',
        visualDescription:
          'Gỗ đã thích ứng trọn vẹn với chu kỳ mưa nắng Sài Gòn. Tông tím mờ dần, nhường chỗ cho sắc nâu hạt dẻ ấm áp. Các tom gỗ mở tự nhiên tiếp tục thở cùng độ ẩm phòng.',
        tactileFeel: 'Bề mặt đanh chắc hơn, cảm giác ấm tay vào mùa mưa và mát rượi vào những ngày nắng gắt.',
        colorHex: '#4A372C',
        gradientOverlay: 'linear-gradient(135deg, #4a372c 0%, #34241b 100%)',
        patinaScore: 40,
        maintenanceNote: 'Chăm sóc đơn giản: lau khăn cotton ẩm vắt ráo. Chưa cần tra dầu mới.',
      },
      5: {
        yearLabel: 'Sau 5 Năm',
        headline: 'Bắt đầu chuyển sắc mật ong (Golden Walnut Patina)',
        visualDescription:
          'Quang hóa tự nhiên tạo nên tầng sắc hổ phách tuyệt đẹp. Các đường vân gỗ uốn lượn trở nên rõ nét và có chiều sâu quang học 3 chiều khi ánh đèn Warm Dim 2700K chiếu nghiêng.',
        tactileFeel: 'Bề mặt nhẵn bóng tự nhiên như lụa nhờ xúc giác tay người chạm thường xuyên tại tay vịn và cạnh bàn.',
        colorHex: '#5A4232',
        gradientOverlay: 'linear-gradient(135deg, #5a4232 0%, #422d20 100%)',
        patinaScore: 65,
        maintenanceNote: 'Dưỡng định kỳ 1 lớp sáp mỏng Osmo Maintenance Wax (kỹ thuật viên GuHomes hỗ trợ miễn phí).',
      },
      15: {
        yearLabel: 'Sau 15 Năm',
        headline: 'Chiều sâu trầm tích vượt thời gian',
        visualDescription:
          'Màu gỗ đạt độ chín muồi hoàn hảo: sắc vàng mật ong ấm kết hợp ánh nâu hổ phách quý phái. Không còn là một món đồ nội thất mua về, mà là một thực thể sống mang dấu ấn gia đình.',
        tactileFeel: 'Các góc bo tròn trở nên mềm mượt lạ kỳ, vết mài mòn nhẹ do sinh hoạt tạo nên cá tính độc bản duy nhất.',
        colorHex: '#684C37',
        gradientOverlay: 'linear-gradient(135deg, #684c37 0%, #4e3523 100%)',
        patinaScore: 88,
        maintenanceNote: 'Thớ gỗ bền vững vĩnh cửu, cấu trúc mộng mộc không hề lỏng lẻo hay phát ra tiếng cọt kẹt.',
      },
      30: {
        yearLabel: 'Sau 30 Năm (Truyền Đời)',
        headline: 'Di sản đồ mộc vô giá lưu truyền thế hệ',
        visualDescription:
          'Bề mặt gỗ sở hữu lớp patina tự nhiên bóng mờ cổ kính không thể làm giả bằng bất kỳ công nghệ sơn nhân tạo nào. Mỗi vân gỗ kể câu chuyện về ba mươi năm ấm êm của gia đình.',
        tactileFeel: 'Cảm giác chạm vào một món đồ gia bảo: đầm, ấm, mịn và tĩnh lặng tuyệt đối.',
        colorHex: '#72523B',
        gradientOverlay: 'linear-gradient(135deg, #72523b 0%, #553926 100%)',
        patinaScore: 100,
        maintenanceNote: 'Có thể đánh bóng lại như mới bất cứ lúc nào chỉ với một lượt lau sáp tự nhiên.',
      },
    },
  },
  'myanmar-teak': {
    id: 'myanmar-teak',
    nameVi: 'Gỗ Teak Miến Điện Tự Nhiên (Myanmar Teak)',
    scientificName: 'Tectona grandis · Rừng tự nhiên Đông Nam Á',
    originVi: 'Khối gỗ trên 50 năm tuổi, giàu tinh dầu silica tự nhiên',
    tagVi: 'Khắc Tinh Ẩm Ướt · Bền bỉ cả trong môi trường biển & sân vườn',
    jankaHardness: '1,070 lbf (Hàm lượng dầu cao, không mục nát)',
    finishType: 'Để mộc đánh sáp tự nhiên hoặc lau dầu Teak chuyên dụng',
    naturalOil: 'Nhựa Teak Oil nội sinh tự kháng nấm mốc và mối mọt',
    longevityRating: '70+ năm (Vật liệu đóng du thuyền cao cấp)',
    applicationVi: 'Sàn ban công, vách phòng tắm master, lam chắn nắng mặt Tây',
    corePhilosophy:
      'Gỗ Teak là loài gỗ duy nhất sở hữu hàm lượng silica và dầu kháng nước tự nhiên dồi dào. Trước nắng mưa nhiệt đới Sài Gòn, Teak không co ngót mà từ từ chuyển sang ánh xám bạc ánh kim (Silver-Grey Patina) vô cùng thanh lịch.',
    epochs: {
      0: {
        yearLabel: 'Ngày Bàn Giao',
        headline: 'Màu vàng nâu ánh xanh ô-liu tự nhiên',
        visualDescription:
          'Mặt gỗ thô có màu vàng sáng xen lẫn các sọc sẫm màu tự nhiên của tinh dầu silica. Khi vừa xẻ và chà nhám, gỗ tỏa hương thơm ngọt nhẹ đặc trưng.',
        tactileFeel: 'Hơi nhờn nhẹ do tinh dầu tự nhiên tiết ra, bám chân rất tốt, không trơn trượt.',
        colorHex: '#6E5C3B',
        gradientOverlay: 'linear-gradient(135deg, #6e5c3b 0%, #4d3f26 100%)',
        patinaScore: 25,
        maintenanceNote: 'Lau sạch bề mặt bằng dung dịch trung tính, không cần phủ bóng hóa chất.',
      },
      1: {
        yearLabel: 'Sau 1 Năm',
        headline: 'Đồng nhất màu vàng rơm sang trọng',
        visualDescription:
          'Dưới tác động của ánh nắng, các vệt sẫm màu biến mất, toàn bộ bề mặt chuyển sang tông vàng rơm (Golden Brown) đồng nhất, óng ả và ấm áp.',
        tactileFeel: 'Mịn màng, các sợi xơ gỗ đan cài chặt chẽ, hoàn toàn không thấm nước mưa.',
        colorHex: '#7C6741',
        gradientOverlay: 'linear-gradient(135deg, #7c6741 0%, #594729 100%)',
        patinaScore: 45,
        maintenanceNote: 'Rửa trôi bụi bẩn bằng nước sạch; dầu tự nhiên trong thân gỗ tự động bảo vệ cốt gỗ.',
      },
      5: {
        yearLabel: 'Sau 5 Năm',
        headline: 'Sắc vàng sẫm quý tộc (Mellow Golden Patina)',
        visualDescription:
          'Khu vực nội thất chuyển sang màu cánh gián sáng lộng lẫy. Nếu đặt ngoài ban công hoặc logia nắng mưa, bề mặt bắt đầu ngả sang tông xám khói ánh bạc thanh nhã.',
        tactileFeel: 'Thớ gỗ đanh cứng, bề mặt chống trầy xước tự nhiên vượt trội.',
        colorHex: '#8A7248',
        gradientOverlay: 'linear-gradient(135deg, #8a7248 0%, #63502f 100%)',
        patinaScore: 70,
        maintenanceNote: 'Gia chủ có thể lựa chọn: giữ màu bạc phong trần hoặc quét 1 lớp dầu Teak để lấy lại màu vàng.',
      },
      15: {
        yearLabel: 'Sau 15 Năm',
        headline: 'Chuẩn mực Silver-Patina của du thuyền siêu sang',
        visualDescription:
          'Nếu tiếp xúc môi trường ngoài trời, bề mặt đạt sắc xám bạc ánh kim (Weathered Silver-Grey) danh giá như sàn du thuyền Riva Ý. Bên trong lõi gỗ vẫn vàng ươm nguyên vẹn.',
        tactileFeel: 'Cảm giác chân thực của gỗ phong hóa tự nhiên: mộc, mát, vững chãi.',
        colorHex: '#8C857B',
        gradientOverlay: 'linear-gradient(135deg, #8c857b 0%, #696259 100%)',
        patinaScore: 90,
        maintenanceNote: 'Tuyệt đối không mục ruỗng, mối mọt không thể xâm nhập.',
      },
      30: {
        yearLabel: 'Sau 30 Năm (Truyền Đời)',
        headline: 'Bất biến trước thời gian và khí hậu biển',
        visualDescription:
          'Trở thành chứng nhân kiến trúc trường tồn. Dù đặt ở ban công hứng trọn nắng hướng Tây hay phòng tắm xông hơi ẩm ướt, gỗ Teak vẫn giữ nguyên phom dáng.',
        tactileFeel: 'Độ ổn định kích thước tuyệt đối, cảm giác ấm áp và tĩnh tại.',
        colorHex: '#757069',
        gradientOverlay: 'linear-gradient(135deg, #757069 0%, #534f49 100%)',
        patinaScore: 100,
        maintenanceNote: 'Tuổi thọ vượt xa vòng đời của một công trình căn hộ hiện đại.',
      },
    },
  },
  'raw-brass': {
    id: 'raw-brass',
    nameVi: 'Đồng Thau Mộc Nguyên Khối (Raw Unlacquered Brass)',
    scientificName: 'Hợp kim đồng CuZn37 nguyên chất không phủ màng keo',
    originVi: 'Đồng thau đúc và phay CNC nguyên khối tại xưởng cơ kim',
    tagVi: 'Xúc Giác Kim Khí Sống · Ghi dấu thời gian',
    jankaHardness: 'Độ bền cơ học vượt trội, chịu lực va chạm vĩnh cửu',
    finishType: 'Đánh mờ thủ công bằng giấy ráp hạt mịn, để mộc tự nhiên',
    naturalOil: 'Không sử dụng sơn bóng PU nhằm giữ khả năng tự kháng khuẩn tự nhiên',
    longevityRating: '100+ năm (Không bong tróc màng sơn)',
    applicationVi: 'Tay nắm tủ phay mộc, chân đế bàn trà, ray chỉ âm tường, phụ kiện vòi nước',
    corePhilosophy:
      'Đồng thau phủ keo công nghiệp sau vài năm sẽ bị ố đốm lốm đốm do keo nứt. GuHomes sử dụng đồng thau mộc không sơn keo (Living Finish): kim loại phản ứng với mồ hôi tay và không khí, hình thành lớp Patina màu sô-cô-la cổ điển tự bảo vệ kim loại vĩnh cửu.',
    epochs: {
      0: {
        yearLabel: 'Ngày Bàn Giao',
        headline: 'Vàng kim rực rỡ, phay xước sợi tóc Hairline',
        visualDescription:
          'Bề mặt sáng bừng ánh vàng ấm áp của kim loại quý. Các đường phay xước hairline tinh xảo phản chiếu ánh đèn như một tác phẩm kim hoàn trang sức.',
        tactileFeel: 'Mát lạnh, sắc sảo từng đường vát cạnh 45°, nặng chắc tay.',
        colorHex: '#C5A059',
        gradientOverlay: 'linear-gradient(135deg, #c5a059 0%, #8f7035 100%)',
        patinaScore: 15,
        maintenanceNote: 'Được lau sạch dầu mỡ cơ khí trước khi lắp đặt hoàn thiện.',
      },
      1: {
        yearLabel: 'Sau 1 Năm',
        headline: 'Bắt đầu hình thành lớp Patina mờ dịu mắt',
        visualDescription:
          'Độ chói gắt ban đầu dịu xuống thành tông vàng trầm ấm. Những điểm ngón tay chạm thường xuyên vẫn giữ ánh vàng bóng, trong khi các góc khuất sẫm dần tự nhiên.',
        tactileFeel: 'Mềm mại hơn, bớt cảm giác sắc lạnh kim loại công nghiệp.',
        colorHex: '#B28E46',
        gradientOverlay: 'linear-gradient(135deg, #b28e46 0%, #7d5f27 100%)',
        patinaScore: 35,
        maintenanceNote: 'Chỉ cần lau khăn khô mềm. Tránh dùng hóa chất tẩy rửa mạnh có tính axit.',
      },
      5: {
        yearLabel: 'Sau 5 Năm',
        headline: 'Màu nâu đồng cổ điển (Vintage Bronze Tone)',
        visualDescription:
          'Quá trình oxy hóa tự nhiên tạo nên màu đồng cổ sâu lắng. Sự tương phản giữa nơi tay chạm bóng sáng và viền kẽ sẫm màu tạo nên vẻ đẹp điêu khắc sống động.',
        tactileFeel: 'Ấm áp, nhẵn mượt lạ kỳ, hoàn toàn không dính bẩn hay để lại dấu vân tay nhờn.',
        colorHex: '#997435',
        gradientOverlay: 'linear-gradient(135deg, #997435 0%, #684a1e 100%)',
        patinaScore: 65,
        maintenanceNote: 'Lớp oxit mỏng bên ngoài chính là lớp giáp bảo vệ lõi đồng vĩnh viễn.',
      },
      15: {
        yearLabel: 'Sau 15 Năm',
        headline: 'Sắc trầm mặc Antiqued Brass sang trọng',
        visualDescription:
          'Màu sắc biến chuyển thành tông nâu sẫm ánh vàng (Dark Antiqued Brass) giống như trong các dinh thự cổ điển tại Florence hay Paris. Đẳng cấp thời gian không thể sao chép.',
        tactileFeel: 'Cảm giác như chạm vào một món đồ tạo tác trăm năm tuổi.',
        colorHex: '#7C5C26',
        gradientOverlay: 'linear-gradient(135deg, #7c5c26 0%, #523a13 100%)',
        patinaScore: 85,
        maintenanceNote: 'Nếu muốn lấy lại màu vàng ban đầu, chỉ cần dùng kem đánh bóng đồng chuyên dụng.',
      },
      30: {
        yearLabel: 'Sau 30 Năm (Truyền Đời)',
        headline: 'Di sản kim khí mang vẻ đẹp bất tử',
        visualDescription:
          'Không bao giờ bị rỉ sét hay ăn mòn thủng. Lớp patina thâm trầm hòa quyện tuyệt mỹ cùng chất gỗ tự nhiên đã lên nước của hệ tủ mộc GuHomes.',
        tactileFeel: 'Bóng mịn tự nhiên, cầm nắm chắc chắn, cơ cấu chuyển động cơ khí vẫn trơn tru.',
        colorHex: '#64471B',
        gradientOverlay: 'linear-gradient(135deg, #64471b 0%, #412c0c 100%)',
        patinaScore: 100,
        maintenanceNote: 'Giá trị sưu tầm và giá trị thẩm mỹ tăng trưởng theo cấp số nhân theo thời gian.',
      },
    },
  },
  'tuscany-leather': {
    id: 'tuscany-leather',
    nameVi: 'Da Bò Thuộc Thảo Mộc Tuscany (Vegetable-Tanned Leather)',
    scientificName: 'Da bò đực nguyên tấm thuộc bằng tanin vỏ cây mimosa & hạt sồi Ý',
    originVi: 'Vùng Santa Croce sull’Arno, Tuscany, miền Trung nước Ý',
    tagVi: 'Hơi Ấm Hữu Cơ · Càng dùng càng bóng mịn',
    jankaHardness: 'Dày 2.2 – 2.5mm, độ dẻo dai xé rách đạt chuẩn cao nhất',
    finishType: 'Thuộc thảo mộc hoàn toàn không chứa crom (Chrome-Free 100%)',
    naturalOil: 'Tanin tự nhiên và mỡ động vật thẩm thấu sâu từng sợi collagen',
    longevityRating: '40+ năm (Không bong tróc nổ da như Simili công nghiệp)',
    applicationVi: 'Lót đáy khay trang sức Master, tay nắm bọc da khâu tay, vách ốp đầu giường',
    corePhilosophy:
      'Da công nghiệp và da thuộc crom nhanh chóng bị rộp, nổ màng nhựa sau 2–3 năm nồm ẩm nhiệt đới. Da thuộc thảo mộc tự nhiên vùng Tuscany thấm hút mồ hôi, "thở" cùng không khí và sẫm màu hổ phách tuyệt đẹp khi có nhiệt độ cơ thể người tiếp xúc.',
    epochs: {
      0: {
        yearLabel: 'Ngày Bàn Giao',
        headline: 'Màu da bò mộc tự nhiên (Natural Tan / Vachetta)',
        visualDescription:
          'Màu be sáng ánh hồng cam nguyên bản của da thuộc mộc. Các nếp nhăn tự nhiên, lỗ chân lông và vết muỗi đốt mộc mạc được giữ nguyên vẹn không bị bả bột nhựa che lấp.',
        tactileFeel: 'Đanh chắc, hơi cứng nhẹ ban đầu, mùi thơm thảo mộc tự nhiên thư thái dịu dàng.',
        colorHex: '#D5A87B',
        gradientOverlay: 'linear-gradient(135deg, #d5a87b 0%, #a4784e 100%)',
        patinaScore: 20,
        maintenanceNote: 'Đã được thoa một lớp kem dưỡng dầu chồn mỏng chống thấm nước ban đầu.',
      },
      1: {
        yearLabel: 'Sau 1 Năm',
        headline: 'Ngả màu bánh mật ấm cúng (Honey Tan)',
        visualDescription:
          'Tiếp xúc với ánh sáng mặt trời và sự cầm nắm hàng ngày, da chuyển sang màu bánh mật ong ấm áp. Bề mặt bắt đầu có độ bóng nhẹ tự nhiên.',
        tactileFeel: 'Da mềm mại hơn rõ rệt, đàn hồi êm ái khi ấn ngón tay.',
        colorHex: '#BD8956',
        gradientOverlay: 'linear-gradient(135deg, #bd8956 0%, #8e5e2e 100%)',
        patinaScore: 45,
        maintenanceNote: 'Thoa sáp dưỡng da tự nhiên định kỳ 6 tháng/lần để giữ độ ẩm cho sợi collagen.',
      },
      5: {
        yearLabel: 'Sau 5 Năm',
        headline: 'Sắc caramel đậm đà, bóng láng tự nhiên',
        visualDescription:
          'Chuyển hẳn sang tông màu caramel ấm áp và quyến rũ. Các vết cọ xát nhẹ tạo nên hiệu ứng loang màu sống động (pull-up effect) đầy nghệ thuật.',
        tactileFeel: 'Cực kỳ êm ái, trơn láng như nhung lụa, cảm giác ấm áp đặc trưng của da thật.',
        colorHex: '#A36F3D',
        gradientOverlay: 'linear-gradient(135deg, #a36f3d 0%, #764b1f 100%)',
        patinaScore: 70,
        maintenanceNote: 'Không bao giờ lo nổ da, bong tróc màng sơn như các loại da PU hay da công nghiệp.',
      },
      15: {
        yearLabel: 'Sau 15 Năm',
        headline: 'Màu nâu cà phê hổ phách (Deep Amber Patina)',
        visualDescription:
          'Lớp Patina hoàn mỹ: màu nâu đậm bóng loáng như hạt dẻ cười rang. Từng nếp gấp da trở thành chi tiết thẩm mỹ đắt giá, thể hiện đẳng cấp thượng lưu tinh tế.',
        tactileFeel: 'Dẻo dai phi thường, đầm tay, lưu giữ hơi ấm cơ thể rất lâu.',
        colorHex: '#835429',
        gradientOverlay: 'linear-gradient(135deg, #835429 0%, #573312 100%)',
        patinaScore: 90,
        maintenanceNote: 'Độ bền sợi da vẫn nguyên vẹn 100%, đường chỉ khâu thủ công sáp ong vẫn chắc nịch.',
      },
      30: {
        yearLabel: 'Sau 30 Năm (Truyền Đời)',
        headline: 'Tuyệt tác đồ da thủ công trường tồn',
        visualDescription:
          'Màu sắc đen thẫm ánh nâu huyền bí, bề mặt bóng như gương cổ điển. Đây là vẻ đẹp mà các nhà sưu tập đồ da xa xỉ Hermès hay Louis Vuitton luôn săn đón.',
        tactileFeel: 'Mềm dẻo tuyệt đối, không có một vết nứt gãy cốt da.',
        colorHex: '#663F1B',
        gradientOverlay: 'linear-gradient(135deg, #663f1b 0%, #42250c 100%)',
        patinaScore: 100,
        maintenanceNote: 'Một báu vật xúc giác của gia đình có thể trao truyền cho thế hệ con cháu.',
      },
    },
  },
}

const TIME_STEPS: readonly TimeEpoch[] = [0, 1, 5, 15, 30]

export function TropicalPatinaLab({ className }: { className?: string }) {
  const [selectedMatId, setSelectedMatId] = useState<MaterialId>('american-walnut')
  const [selectedEpoch, setSelectedEpoch] = useState<TimeEpoch>(5)

  const material = MATERIALS_DATA[selectedMatId] ?? MATERIALS_DATA['american-walnut']
  const currentEpoch = material.epochs[selectedEpoch] ?? material.epochs[0]
  const uniqueId = useId()

  return (
    <section className={cn('u-gutter py-16 lg:py-24 bg-surface/50 border-y border-line', className)}>
      <div className="mx-auto w-full max-w-[110rem]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Phòng Thí Nghiệm Lão Hóa Vật Liệu Tự Nhiên · GuHomes Patina Lab
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-accent/10 text-accent border border-accent/20">
                Wabi-Sabi &amp; Heirloom Longevity
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-ink mt-3 tracking-tight">
              Vẻ Đẹp Trầm Tích Qua Thời Gian
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-[68ch] mt-3 leading-relaxed">
              Sự xa xỉ đích thực không nằm ở bề mặt phủ bóng công nghiệp nhanh nứt nẻ, mà ở khả năng già đi một cách thanh lịch (Patina Aging) của các vật liệu mộc tự nhiên dưới vi khí hậu nhiệt đới Sài Gòn.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted shrink-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Mô phỏng quang học từ 0 đến 30 năm</span>
          </div>
        </div>

        {/* Material Selection Tabs */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(Object.keys(MATERIALS_DATA) as MaterialId[]).map((id) => {
            const m = MATERIALS_DATA[id]
            const isSelected = selectedMatId === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedMatId(id)}
                className={cn(
                  'p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between',
                  isSelected
                    ? 'border-accent bg-canvas shadow-md ring-1 ring-accent/40'
                    : 'border-line bg-surface hover:bg-canvas/60 hover:border-line-dark'
                )}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent">
                    {m.longevityRating}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-ink mt-1">
                    {m.nameVi}
                  </h3>
                </div>
                <p className="text-[11px] text-muted font-mono mt-3 truncate">{m.tagVi}</p>
              </button>
            )
          })}
        </div>

        {/* Main Interactive Studio Console */}
        <div className="mt-8 grid grid-cols-12 gap-8 items-start">
          {/* Left Column: Visual Swatch & Time Slider */}
          <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
            {/* Swatch & Visualizer Card */}
            <div className="p-8 rounded-3xl bg-canvas border border-line relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-line/60 text-xs font-mono">
                <span className="text-muted">Biến Thiên Quang Học &amp; Xúc Giác</span>
                <span className="text-accent font-semibold">
                  Chỉ số Patina: {currentEpoch.patinaScore} / 100
                </span>
              </div>

              {/* Dynamic Texture Swatch Display */}
              <div className="mt-6 relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-line flex items-center justify-center p-6 shadow-inner">
                {/* Background Simulated Material Gradient */}
                <motion.div
                  key={`${selectedMatId}-${selectedEpoch}`}
                  initial={{ opacity: 0.6, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{ background: currentEpoch.gradientOverlay }}
                />

                {/* Subtle Grain Overlay Pattern */}
                <div
                  className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 80%)`,
                  }}
                />

                {/* Floating Inspection Card on Swatch */}
                <div className="relative z-10 p-6 rounded-2xl bg-canvas/80 backdrop-blur-md border border-line max-w-md text-center shadow-lg">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-accent font-semibold">
                    {currentEpoch.yearLabel}
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl text-ink font-normal mt-1">
                    {currentEpoch.headline}
                  </h4>
                  <div className="mt-3 flex items-center justify-center gap-2 text-xs font-mono text-muted">
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-line shadow-sm"
                      style={{ backgroundColor: currentEpoch.colorHex }}
                    />
                    <span>Mã màu tự nhiên: {currentEpoch.colorHex.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Interactive Timeline Slider */}
              <div className="mt-8 pt-6 border-t border-line/60">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-mono uppercase tracking-wider text-muted">
                    Trượt để tua nhanh dòng thời gian (0 – 30 Năm):
                  </label>
                  <span className="text-xs font-mono text-accent font-semibold">
                    {currentEpoch.yearLabel}
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {TIME_STEPS.map((epoch) => {
                    const isSelected = selectedEpoch === epoch
                    const detail = material.epochs[epoch]
                    return (
                      <button
                        key={epoch}
                        type="button"
                        onClick={() => setSelectedEpoch(epoch)}
                        className={cn(
                          'p-3 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center gap-1',
                          isSelected
                            ? 'border-accent bg-surface ring-1 ring-accent/40 shadow-sm'
                            : 'border-line/60 bg-canvas hover:border-line-dark'
                        )}
                      >
                        <span className="text-xs font-mono font-semibold text-ink">
                          {epoch === 0 ? 'Mới' : `${epoch} Năm`}
                        </span>
                        <div
                          className="w-4 h-4 rounded-full border border-line mt-1"
                          style={{ backgroundColor: detail.colorHex }}
                        />
                        <span className="text-[9px] font-mono text-muted mt-0.5">
                          {detail.patinaScore}%
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Epoch Details Box */}
              <div className="mt-6 p-5 rounded-2xl bg-surface border border-line text-xs font-mono space-y-3">
                <div>
                  <span className="text-accent font-semibold">Biểu hiện thị giác: </span>
                  <span className="text-ink font-light leading-relaxed">{currentEpoch.visualDescription}</span>
                </div>
                <div>
                  <span className="text-accent font-semibold">Cảm giác xúc giác (Tactile Feel): </span>
                  <span className="text-ink font-light leading-relaxed">{currentEpoch.tactileFeel}</span>
                </div>
                <div className="pt-2 border-t border-line/60">
                  <span className="text-muted">Chế độ bảo dưỡng khuyến nghị: </span>
                  <span className="text-muted/90 font-light">{currentEpoch.maintenanceNote}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Material Science & Architectural Philosophy */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            {/* Material Philosophy Card */}
            <div className="p-8 rounded-3xl bg-canvas border border-line">
              <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
                Triết Lý Khoa Học Vật Liệu
              </span>
              <h3 className="font-serif text-2xl text-ink font-light mt-2">
                {material.nameVi}
              </h3>
              <p className="text-xs font-mono text-muted mt-1">{material.scientificName}</p>

              <p className="text-sm font-light text-ink mt-4 leading-relaxed">
                {material.corePhilosophy}
              </p>

              <div className="mt-6 pt-6 border-t border-line/60 space-y-3 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-muted">Độ cứng Janka:</span>
                  <span className="text-ink">{material.jankaHardness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Hoàn thiện bề mặt:</span>
                  <span className="text-accent">{material.finishType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Dưỡng chất tự nhiên:</span>
                  <span className="text-ink">{material.naturalOil}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Vòng đời sử dụng:</span>
                  <span className="text-accent font-semibold">{material.longevityRating}</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-surface border border-line text-xs font-mono">
                <span className="text-muted block mb-1">Ứng dụng tiêu biểu trong căn hộ:</span>
                <span className="text-ink font-semibold">{material.applicationVi}</span>
              </div>
            </div>

            {/* Quiet Luxury vs Industrial Contrast */}
            <div className="p-6 rounded-3xl bg-surface border border-line">
              <span className="text-xs font-mono uppercase tracking-wider text-muted block mb-3">
                Đối Chiếu Giá Trị Sau 10 Năm Sử Dụng
              </span>

              <div className="space-y-4 text-xs font-mono">
                <div className="p-4 rounded-2xl bg-canvas border border-line">
                  <p className="text-accent font-semibold">Mộc Tự Nhiên Lau Dầu GuHomes:</p>
                  <p className="text-muted font-light mt-1 leading-relaxed">
                    Càng dùng càng đượm màu mật ong, bề mặt nhẵn bóng nhờ tiếp xúc tay người, dễ dàng làm mới tại gia chỉ với một giọt dầu thực vật.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-canvas border border-line/60 opacity-80">
                  <p className="text-rose-600/90 font-semibold">Vật Liệu Công Nghiệp Phủ Nhựa (Melamine / PU):</p>
                  <p className="text-muted font-light mt-1 leading-relaxed">
                    Sau 3–5 năm nhiệt đới Sài Gòn, mép nẹp chỉ bị hở keo, bề mặt ố vàng hoặc trầy xước không thể khắc phục, buộc phải phá dỡ làm mới toàn bộ.
                  </p>
                </div>
              </div>
            </div>

            {/* Consultation Callout */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-espresso to-[#2B231D] text-canvas relative overflow-hidden">
              <span className="text-xs font-mono uppercase tracking-widest text-accent-soft">
                Cảm Nhận Trực Quan
              </span>
              <h4 className="font-serif text-xl sm:text-2xl font-light text-canvas mt-2">
                Chạm thử phiến vật liệu mộc đã lên Patina 15 năm
              </h4>
              <p className="text-xs text-canvas/80 mt-3 font-light leading-relaxed">
                Tại Studio GuHomes, chúng tôi lưu giữ các phiến gỗ óc chó và khối đồng thau mộc đã qua hơn một thập kỷ sử dụng để bạn trực tiếp cảm nhận độ ấm và chiều sâu xúc giác trước khi ra quyết định thiết kế.
              </p>
              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-canvas text-xs font-mono tracking-wider hover:bg-accent/90 transition-all shadow-lg"
                >
                  <span>Đăng ký tham quan phòng mẫu vật liệu</span>
                  <ArrowUpRightIcon className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
