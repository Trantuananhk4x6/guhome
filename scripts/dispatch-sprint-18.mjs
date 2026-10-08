import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_18_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 18: KHÍ ĐỘNG HỌC GIÓ SÔNG SÀI GÒN, NHẬT KÝ SẤY CHÂN KHÔNG MỘC THẠNH XUÂN & BỘ TÙY BIẾN ĐỒ RỜI MAY ĐO ĐỘC BẢN]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt biểu dương và ghi nhận thành quả xuất sắc của Sprint 17:
- TropicalPatinaLab, TropicalHvacAirflowSimulator, và SmartHomeQuietSanctuary đã hoàn thành 100%, vượt qua tất cả 153 routes SEO và production build Next.js với 0 lỗi (Commit 988064e & 27a8cd7).
- Toàn bộ các hệ thống kiến trúc, vi khí hậu và tự động hóa tĩnh lặng đã được đưa vào vận hành chuẩn mực trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TRIỂN KHAI SPRINT 18:
"KHÍ ĐỘNG HỌC GIÓ SÔNG SÀI GÒN, NHẬT KÝ SẤY CHÂN KHÔNG MỘC THẠNH XUÂN & BỘ TÙY BIẾN ĐỒ RỜI MAY ĐO ĐỘC BẢN"

Mục tiêu cốt lõi: Nâng tầm giải pháp vi khí hậu tự nhiên lên cấp độ khí động học nhà ở ven sông (gió sông đối lưu, định luật Bernoulli, giảm -3.8°C tự nhiên không cần điều hòa); phô diễn bí quyết kỹ thuật làm chủ độ ẩm gỗ tự nhiên độc quyền tại Xưởng Thạnh Xuân 1.200m² (sấy chân không 21 ngày đạt EMC 10-12%, bộ tính co ngót mộng âm); và ra mắt bộ tùy biến đồ rời may đo độc bản (Bespoke Handcrafted Furniture) với mộng thắt lưng ong, cạnh Live Edge và dầu Osmo Đức.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍ NGHIỆM KHÍ ĐỘNG HỌC GIÓ SÔNG SÀI GÒN (RiverBreezeAerodynamicsLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/RiverBreezeAerodynamicsLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/khu-vuc/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Kiến Trúc Vi Khí Hậu Sông Nước:
   - Các căn hộ ven sông Sài Gòn (Thủ Thiêm, Ba Son, Bình Thạnh, Đảo Kim Cương, Phú Mỹ Hưng) đón luồng gió đối lưu tự nhiên vô giá. Thiết kế GuHomes mở rộng tầm đón gió, bố trí mặt bằng xuyên phòng kết hợp vách lam xoay pivot giúp căn hộ tự làm mát tự nhiên mà không cần đóng kín cửa bật điều hòa 24/7.
2. Tính năng kỹ thuật & UI tương tác:
   - 3 Hướng gió sông đặc trưng Sài Gòn:
     * 01. Gió Nam / Đông Nam (Gió biển & Sông Sài Gòn mang hơi nước dịu mát từ Cần Giờ, 3.8 m/s).
     * 02. Gió Tây Nam (Mùa mưa nhiệt đới mát ẩm, đối lưu mạnh, 5.2 m/s).
     * 03. Gió Chướng Đông Bắc (Mùa khô Sài Gòn, se lạnh vào sáng sớm & đêm, 2.8 m/s).
   - Thanh trượt điều khiển khí động học:
     * Độ mở cửa kính lùa ban công chính (Balcony Sliding Aperture: 0% - 100%).
     * Góc xoay vách lam gỗ tự nhiên Louver / Pivot phòng ngủ (0° - 90°).
     * Ô thoát gió logia sau (Rear Louver Exhaust: Đóng / Mở 30% / Mở trọn 100%).
   - Bộ tính toán định luật Bernoulli & Hiệu ứng Venturi thời gian thực:
     * Vận tốc gió lưu thông trong phòng (m/s).
     * Tỷ lệ trao đổi khí tươi (Air Changes per Hour - ACH, từ 1.2 ACH lên 8.5 ACH).
     * Nhiệt độ cảm nhận tự nhiên giảm sâu (Sensory Cooling: từ 0°C đến -3.8°C).
     * Nồng độ CO2 phòng ngủ (từ 1.150 ppm giảm xuống 480 ppm cho giấc ngủ sâu không đau đầu).
   - Mô phỏng trực quan SVG/CSS: Luồng hạt vector gió (wind flow stream lines) lướt sóng mềm mại xuyên qua mặt bằng phòng khách, bàn trà và qua khe lam gỗ phòng ngủ thoát ra ngoài.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: NHẬT KÝ SẤY CHÂN KHÔNG & CÂN BẰNG ĐỘ ẨM MỘC THẠNH XUÂN (KilnMoistureDiary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/KilnMoistureDiary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/du-toan-chi-phi/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Kỹ Nghệ Mộc Thạnh Xuân:
   - Gỗ tự nhiên Bắc Mỹ nhập về Việt Nam có độ ẩm ban đầu chỉ 6% - 8%. Trong khi đó mùa mưa TP.HCM ẩm độ lên đến 85%. Đóng đồ ngay sẽ làm gỗ hút ẩm trương phù, kẹt ray và xé mặt bàn.
   - Tại Xưởng Thạnh Xuân 1.200m², GuHomes sử dụng lò sấy chân không áp suất âm (-0.08 MPa, 42°C - 48°C) trong 21 ngày để đưa độ ẩm gỗ đạt ngưỡng Cân Bằng Độ Ẩm (EMC - Equilibrium Moisture Content) chuẩn xác 10% - 12%, thích ứng vĩnh viễn với thời tiết Sài Gòn.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ tính toán độ co ngót cơ lý học gỗ (Radial vs Tangential Shrinkage Calculator):
     * Chọn loại gỗ: FAS American Walnut (Óc chó Bắc Mỹ), European White Oak (Sồi trắng Châu Âu), Myanmar Teak (Gỗ Tếch Miến Điện), Red Wood (Gõ đỏ Nam Phi).
     * Nhập chiều rộng tấm gỗ (mm, ví dụ mặt bàn 900mm, cánh tủ 600mm).
     * Chênh lệch độ ẩm mùa khô (MC 11%) sang mùa mưa (MC 15%).
     * Tính toán chính xác độ giãn nở theo phương xuyên tâm (Radial) và tiếp tuyến (Tangential) bằng mm.
     * Hiển thị giải pháp cơ khí mộng âm GuHomes: Khe co giãn kỹ thuật 2.5mm giấu nẹp và liên kết mộng nổi tự do (Floating Panel) triệt tiêu nguy cơ xé gỗ 100%.
   - Biểu đồ 4 pha sấy chân không 21 ngày với 6 đầu dò điện trở đo độ ẩm lõi gỗ:
     * Pha 1: Ủ ẩm & ổn định ứng suất nội tại (Day 1-3).
     * Pha 2: Gia nhiệt chân không & thoát ẩm mao dẫn (Day 4-9, MC 28% -> 18%).
     * Pha 3: Rút ẩm tế bào sâu (Day 10-16, MC 18% -> 12%).
     * Pha 4: Dưỡng gỗ cân bằng EMC vi khí hậu Thạnh Xuân (Day 17-21, EMC 11.2%).
   - Chứng thư kiểm định độ ẩm Delmhorst trước khi đóng mộc.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BỘ TÙY BIẾN ĐỒ RỜI MAY ĐO ĐỘC BẢN (BespokeFurnitureCustomizer.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/BespokeFurnitureCustomizer.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/phong-cach/page.tsx\`:
1. Triết lý Đồ Rời May Đo Độc Bản (Bespoke Handcrafting):
   - Đồ nội thất sản xuất hàng loạt thiếu hồn và không vừa vặn với kích thước từng góc nhà. GuHomes chế tác từng chiếc bàn ăn, ghế bành thư giãn, bàn trà khối đá theo đúng nhân trắc học của gia chủ.
2. Tính năng kỹ thuật & UI tương tác:
   - 3 Tác phẩm mộc đồ rời biểu tượng:
     * 01. Bàn Ăn Nguyên Tấm Solid FAS Walnut (Kích thước 2m2 - 3m0, dày 50mm).
     * 02. Ghế Thư Giãn Lounge Gỗ Teak Mộc bọc Da Tuscany Ý (Góc tựa 105° công thái học).
     * 03. Bàn Trà Khối Đá Tự Nhiên Travertine Navona Ý nguyên khối kết hợp chân gỗ sồi xẻ tư.
   - Bộ chọn tùy biến chi tiết thủ công:
     * Cạnh biên gỗ: Cạnh uốn tự nhiên (Live Edge mộc mạc) / Vát góc 45° Chamfer thanh thoát / Bo tròn Bullnose mềm mại.
     * Kỹ thuật mộng gỗ cơ khí: Mộng Đuôi Én đục tay (Hand-cut Dovetail) / Mộng Thắt Lưng Ong Đôi (Double Butterfly Inlay gỗ mun) / Mộng Âm Dương chốt gỗ sồi (Mortise & Tenon).
     * Lớp dầu phủ hoàn thiện: Osmo Polyx-Oil Đức mờ (Matte 3032) / Dầu mộc tự nhiên (Natural Raw 3044) / Sáp ong hữu cơ truyền thống.
   - Bảng tính thông số động thời gian thực:
     * Trọng lượng sản phẩm (kg).
     * Số giờ lao động thủ công của nghệ nhân mộc Thạnh Xuân (36 - 54 giờ chế tác tay & chà nhám 6 cấp độ từ P80 đến P800).
     * Mức giá ước tính may đo minh bạch.
     * Nút "Đăng ký Chế tác Thửa riêng": Kích hoạt Modal liên hệ VIP kèm mã cấu hình độc bản (ví dụ: \`GU-BESPOKE-2026-X\`).

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (đảm bảo null check kỹ lưỡng cho mọi tìm kiếm mảng).
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-18): add RiverBreezeAerodynamicsLab, KilnMoistureDiary, and BespokeFurnitureCustomizer with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Hãy triển khai ngay bây giờ!`;

console.log('Updating master-orchestrator-state.json for Sprint 18...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-16-sprint-18-river-breeze-kiln-bespoke-furniture',
    title: 'Khí Động Học Gió Sông Sài Gòn, Nhật Ký Sấy Chân Không Mộc Thạnh Xuân & Bộ Tùy Biến Đồ Rời May Đo Độc Bản',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 18 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 18', TARGET_ID, SPRINT_18_DIRECTIVE],
  { stdio: ['ignore', 'pipe', 'pipe'] }
);

let stdout = '';
let stderr = '';

child.stdout.on('data', (data) => {
  stdout += data.toString();
});

child.stderr.on('data', (data) => {
  stderr += data.toString();
});

child.on('close', (code) => {
  console.log(`Command finished with exit code ${code}`);
  if (stdout) console.log('STDOUT:\n', stdout);
  if (stderr) console.error('STDERR:\n', stderr);
  process.exit(code ?? 0);
});
