import { spawn } from 'node:child_process'

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22'
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe'

const SPRINT_12_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 12: NHẬT KÝ THI CÔNG KIẾN TRÚC 75 NGÀY, BIÊN NIÊN SỬ GIA CHỦ SÀI GÒN & BỘ CỐ VẤN VI KHÍ HẬU NHIỆT ĐỚI]
Kiến trúc sư trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt khen ngợi toàn thể đội ngũ kỹ thuật! Sprint 11 đã hoàn thành và chứng thực xuất sắc:
- Bản Đồ Không Gian Sài Gòn (ProjectSpatialMap.tsx & ProjectsViewSwitcher.tsx) kết nối trực quan 6 tâm điểm kiến trúc TP.HCM.
- Phòng Thử Nghiệm Tactile Moodboard & Âm Học (TactileMoodboardStudio.tsx) 6 bảng phối vật liệu với chỉ số NRC, độ kháng ẩm và nhiệt độ màu CRI 98.
- Lịch Hẹn Tư Vấn VIP 1-1 Cùng KTS Trưởng (VipBookingCalendar.tsx) tích hợp bảo mật, form booking 3 hình thức gặp mặt.
- Toàn bộ 153 routes Next.js compile thành công, TypeScript 0 errors, commit a85cb1d trên nhánh enhaceta.

TIẾP TỤC ĐẨY MẠNH CHIẾN DỊCH XUYÊN ĐÊM - SPRINT 12:
"NHẬT KÝ THI CÔNG KIẾN TRÚC 75 NGÀY, BIÊN NIÊN SỬ GIA CHỦ SÀI GÒN & BỘ CỐ VẤN THỜI TIẾT VI KHÍ HẬU NHIỆT ĐỚI"

Mục tiêu cốt lõi: Nâng tầm GuHomes từ một website giới thiệu đơn thuần thành Nền tảng Kiến trúc - Nội thất Thửa riêng (Bespoke Architecture Platform) đỉnh cao nhất Sài Gòn, chứng minh năng lực thực địa minh bạch và xóa bỏ hoàn toàn mọi e ngại của gia chủ phân khúc cao cấp (High-Net-Worth Individuals).

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: NHẬT KÝ THI CÔNG KIẾN TRÚC 75 NGÀY (ConstructionTimelineDiary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/projects/ConstructionTimelineDiary.tsx\` và tích hợp vào \`src/app/(site)/projects/page.tsx\` và \`src/app/(site)/studio/page.tsx\`:
1. Quy trình 5 cột mốc chuẩn mực thi công của GuHomes:
   - Cột mốc 1 (Ngày 1–12): "Khảo sát Laser 3D, Đo đạc Vi khí hậu & Tháo dỡ Kết cấu"
     * Thiết bị: Máy quét laser 3D Leica, cảm biến đo hướng nắng và gió đối lưu.
     * Tiêu chuẩn: Kiểm tra chịu lực dầm sàn, chống nứt tường ngăn bằng lưới sợi thủy tinh.
   - Cột mốc 2 (Ngày 13–28): "Hạ tầng Cơ điện MEP Ngầm, Điều hòa Giấu trần & Tiêu âm Đa lớp"
     * Thiết bị: Ống đồng bọc bảo ôn đôi, cửa gió khe hẹp Linear Slot Diffuser giấu viền.
     * Tiêu chuẩn: Trần thạch cao tiêu âm 2 lớp chống võng võng nứt và triệt tiêu tiếng dội ồn dưới 32dB.
   - Cột mốc 3 (Ngày 29–52): "Chế tác Mộc Thửa riêng tại Xưởng Thạnh Xuân 1.200m²"
     * Thiết bị: Lò sấy chân không vi tính hóa kiểm soát độ ẩm EMC 10–12%.
     * Tiêu chuẩn: Khớp mộng âm dương truyền thống gia cố chốt gỗ tự nhiên, không lộ đinh vít rỉ sét; phủ 3 lớp dầu Osmo hữu cơ của Đức.
   - Cột mốc 4 (Ngày 53–68): "Lắp đặt Hoàn thiện Hiện trường & Căn chỉnh Khe ron Âm 3mm"
     * Thiết bị: Thước thủy điện tử Bosch sai số dưới 0.5mm, súng bắn silicone trung tính Dow Corning.
     * Tiêu chuẩn: Khe giãn nở chân tường âm sàn 12mm thích ứng giãn nở mùa mưa nhiệt đới; bản lề âm Hafele/Blum giảm chấn 200.000 lần đóng mở.
   - Cột mốc 5 (Ngày 69–75): "Nghiệm thu Ánh sáng Warm Dim CRI 98, Vệ sinh Tinh & Chìa Khóa Trao Tay"
     * Thiết bị: Máy đo quang phổ Sekonic kiểm tra CRI > 97 và UGR < 16 không chói mắt.
     * Tiêu chuẩn: Bàn giao Hồ sơ Hoàn công A4, Thẻ bảo hành gỗ mộc số hóa và bộ hướng dẫn chăm sóc vật liệu định kỳ.
2. Tương tác UI/UX:
   - Thanh trượt tiến độ tương tác (Interactive Timeline Slider) cho phép gia chủ nhấp vào từng cột mốc.
   - Bảng thông số kỹ thuật (Spec Checklist) và chỉ số kiểm soát chất lượng (QA Metrics) nhảy số sống động.
   - Nút tải "Mẫu Biên Bản Nghiệm Thu & Quy Chuẩn Thi Công GuHomes".

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BIÊN NIÊN SỬ GIA CHỦ & LỜI CHỨNG THỰC CHUYÊN SÂU (ClientChroniclesSection.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/sections/ClientChroniclesSection.tsx\` và tích hợp vào \`src/app/(site)/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. 5 Câu chuyện người thật việc thật từ các công trình biểu tượng:
   - Anh Trần Hoàng & Chị Bích Trâm (Penthouse The Opera Metropole Thủ Thiêm - 380m²):
     * "Nắng chiều Tây trên tầng 28 kính khổ lớn từng là nỗi ám ảnh. GuHomes đã cứu căn penthouse bằng hệ lam trần gỗ óc chó kết hợp vôi Calce Ý và đá Travertine hút nhiệt, nhiệt độ phòng khách giảm ngay 3.5°C mà không cần hạ rèm tối om."
   - Bác Phạm Quốc Hưng (Biệt Thự Song Lập Château Phú Mỹ Hưng - 420m²):
     * "Chơi đồ gỗ hơn 30 năm, tôi rất sợ gỗ công nghiệp dán cạnh dễ bong mép ở khí hậu nồm ẩm Sài Gòn. Khi trực tiếp xuống xưởng Thạnh Xuân xem thợ ghép mộng âm dương và ngửi mùi dầu Osmo không cay mắt, tôi hoàn toàn trao trọn niềm tin."
   - Gia đình Chị Lê Thục Uyên (Duplex Thảo Điền Green ven sông - 240m²):
     * "Mùa mưa triều cường Thảo Điền ẩm mốc kinh khủng. GuHomes tư vấn cốt Plywood phủ Melamine kết hợp chỉ nẹp gỗ Teak nguyên tấm. Qua 2 mùa mưa, hệ tủ bếp và tủ áo vẫn khít khao, không một vết ố hay ẩm."
   - Anh Đặng Minh Quân & Chị Mai Lan (Nhà Phố Ba Gian Gò Vấp - Tấm Rèm Bê Tông - 280m²):
     * "Nhà ống 4x18m trước đây bức bí, ban ngày vẫn phải bật đèn huỳnh quang. KTS GuHomes mở giếng trời kép và mặt tiền lam bê tông lọc bụi, gió sông Vàm Thuật thổi luồn qua từng ngóc ngách."
   - Anh Ngô Kiến Huy & Chị Khánh Vy (Căn hộ Dual Key Grand Marina Saigon Ba Son - 190m²):
     * "Chúng tôi ấn tượng nhất với tính chuẩn xác về tiến độ. Đúng 72 ngày, không trễ một buổi sáng, hồ sơ nghiệm thu chi tiết từng mét vuông và đội ngũ dọn vệ sinh tinh tươm như khách sạn 5 sao trước khi bàn giao."
2. Tương tác UI/UX:
   - Lọc theo loại hình bất động sản: "Tất Cả", "Penthouse & Duplex", "Biệt Thự & Nhà Phố", "Căn Hộ Cao Cấp".
   - "Thẻ Chứng Nhận Bàn Giao & Bảo Hành Xưởng Mộc Thạnh Xuân" số hóa (Số hiệu thẻ: GU-WTY-2026-XXXX, thời hạn 5 năm kết cấu mộc, 10 năm chống mối mọt, đo độ ẩm định kỳ 6 tháng/lần miễn phí).

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ CỐ VẤN THỜI TIẾT VI KHÍ HẬU NHIỆT ĐỚI SÀI GÒN (TropicalWeatherAdvisory.tsx)
----------------------------------------------------------------------
Xây dựng widget \`src/components/tools/TropicalWeatherAdvisory.tsx\` và tích hợp vào \`src/app/(site)/khu-vuc/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/studio/page.tsx\`:
1. Phân tích 2 mùa khí hậu đặc thù của TP. Hồ Chí Minh:
   - "Mùa Mưa & Triều Cường" (Tháng 5 – Tháng 11):
     * Độ ẩm không khí: 80% – 92%.
     * Thách thức vi khí hậu: Hơi ẩm ngưng tụ trên bề mặt đá nhân tạo, phồng rộp cốt ván dăm thường, ẩm mốc rèm vải và nệm sofa.
     * Khuyến nghị kỹ thuật GuHomes: Sử dụng Plywood WBP chống nước 72h, gỗ Teak/Sồi có hàm lượng tinh dầu tự nhiên, rèm lanh dệt thô thoáng khí, cài đặt điều hòa hút ẩm (Dry Mode) 26°C.
   - "Mùa Khô & Nắng Gắt Bức Xạ Cao" (Tháng 12 – Tháng 4):
     * Nhiệt độ ngoài trời: 36°C – 41°C (nhiệt độ mặt kính hộp hướng Tây lên tới 46°C).
     * Thách thức vi khí hậu: Co ngót sợi gỗ tự nhiên gây nứt chân chim bề mặt sơn PU cứng, bạc màu rèm cửa và tiêu hao điện năng làm lạnh lớn.
     * Khuyến nghị kỹ thuật GuHomes: Bảo dưỡng thớ gỗ bằng dầu hạt lanh Osmo giữ ẩm tế bào, lam che nắng gỗ biến tính Thermowood, vôi khoáng Calce khuếch tán quang học, phim cách nhiệt phản xạ hồng ngoại.
2. Tương tác vi khí hậu theo 4 vùng địa lý TP.HCM (Thủ Thiêm ven sông gió Đông Nam, Thảo Điền trũng ẩm, Phú Mỹ Hưng gió Nam râm mát, Trung tâm Q.1/Q.3 nhiệt đảo đô thị).

----------------------------------------------------------------------
YÊU CẦU KỸ THUẬT VÀ TIÊU CHUẨN QA BẮT BUỘC:
1. Tuân thủ 100% nguyên tắc Quiet Luxury, chuẩn từ ngữ kiến trúc tinh tế, không sáo rỗng.
2. Kiểm tra TypeScript nghiêm ngặt: \`npx tsc --noEmit\` đạt 0 errors.
3. Không làm vỡ layout responsive (kiểm tra touch target >= 44px, margin an toàn trên màn hình di động 375px - 414px).
4. Kiểm thử routing tự động \`npx tsx scripts/test-routes-seo.ts\` đạt 100% PASS.
5. Kiểm thử production build \`npm run build\` đạt Exit Code 0.
6. Commit toàn bộ thay đổi với thông điệp:
   \`feat(sprint-12): add ConstructionTimelineDiary, ClientChroniclesSection, and TropicalWeatherAdvisory\`

Toàn bộ hệ thống và Master Orchestrator đang theo dõi sát sao. Hãy bắt đầu ngay bây giờ!`

console.log('Sending Master Orchestrator Sprint 12 Directive to companion agent:', TARGET_ID)

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 12', TARGET_ID, SPRINT_12_DIRECTIVE],
  { stdio: ['ignore', 'pipe', 'pipe'] }
)

let stdout = ''
let stderr = ''

child.stdout.on('data', (data) => {
  stdout += data.toString()
})

child.stderr.on('data', (data) => {
  stderr += data.toString()
})

child.on('close', (code) => {
  console.log(`Command finished with exit code ${code}`)
  if (stdout) console.log('STDOUT:\n', stdout)
  if (stderr) console.error('STDERR:\n', stderr)
  process.exit(code ?? 0)
})
