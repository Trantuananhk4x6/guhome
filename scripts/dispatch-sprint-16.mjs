import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_16_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 16: LA BÀN PHONG THỦY VI KHÍ HẬU SÀI GÒN, PHÒNG THỬ NGHIỆM TIÊU ÂM RT60 & CỔNG DỊCH VỤ THƯỢNG KHÁCH VIP CONCIERGE]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt khen ngợi thành quả rực rỡ của Sprint 15:
- BespokeCabinetryStudio, CurvedWoodCraftLab, và ContractorComparisonMatrix đã hoàn thành xuất sắc 100%, vượt qua tất cả 153 routes SEO và production build Next.js với 0 lỗi (Commit 8851f93 & 3db3d5d).
- Toàn bộ hệ thống giao diện, xúc giác vật liệu, và triết lý Quiet Luxury của GuHomes đang ở đỉnh cao chất lượng.

THEO MỆNH LỆNH TIẾP NỐI XUYÊN ĐÊM PHI GIÁN ĐOẠN TỪ GIA CHỦ, CHÚNG TA LẬP TỨC TRIỂN KHAI SPRINT 16:
"LA BÀN PHONG THỦY VI KHÍ HẬU SÀI GÒN, PHÒNG THỬ NGHIỆM TIÊU ÂM RT60 & CỔNG DỊCH VỤ THƯỢNG KHÁCH VIP CONCIERGE"

Mục tiêu cốt lõi: Thiết lập vị thế dẫn đầu công nghệ kiến trúc bản địa thích ứng vi khí hậu Sài Gòn, triệt tiêu hoàn toàn sự mê tín dị đoan bằng phương pháp khoa học vi khí hậu nhiệt đới thực nghiệm; xử lý âm học kiến trúc thính phòng cho Penthouse trần cao; và cung cấp trải nghiệm tiếp đón thượng khách triệu đô VIP Concierge.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: LA BÀN PHONG THỦY VI KHÍ HẬU SÀI GÒN (TropicalFengShuiCompass.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/TropicalFengShuiCompass.tsx\` và tích hợp vào \`src/app/(site)/khu-vuc/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Quiet Luxury & Khoa học vi khí hậu nhiệt đới:
   - Gia chủ thượng lưu tại Sài Gòn (Thủ Thiêm, Thảo Điền, Phú Mỹ Hưng, Bình Thạnh) thường lúng túng giữa Phong Thủy Bát Trạch cổ truyền và thực tế công năng nhiệt đới.
   - GuHomes giải mã phong thủy bằng khoa học vi khí hậu: Bát Quái Bản Mệnh kết hợp trực tiếp với dữ liệu khí tượng Sài Gòn (hướng gió đối lưu sông Sài Gòn 2.4 - 3.8 m/s, độ ẩm 78%, góc nắng bức xạ mặt trời Tây Nam lên tới 48°C - 52°C).
2. Tính năng kỹ thuật & UI tương tác:
   - La bàn số 360° tương tác bằng SVG với kim chỉ hướng hoàng kim (Gold Compass Needle), hiển thị 8 hướng: Bắc (0°), Đông Bắc (45°), Đông (90°), Đông Nam (135°), Nam (180°), Tây Nam (225°), Tây (270°), Tây Bắc (315°).
   - Bộ tính Quái Số & Bát Quái thông minh:
     * Nhập Năm sinh (1960 - 2010) + Giới tính (Nam / Nữ) -> Tự động tính Quái Số (Càn Kim, Khảm Thủy, Cấn Thổ, Chấn Mộc, Tốn Mộc, Ly Hỏa, Khôn Thổ, Đoài Kim), phân loại nhóm Đông Tứ Mệnh vs Tây Tứ Mệnh.
     * Đánh giá 4 hướng Cát (Sinh Khí, Diên Niên, Thiên Y, Phục Vị) và 4 hướng Hung (Tuyệt Mệnh, Ngũ Quỷ, Lục Sát, Họa Hại).
   - Đối chiếu thực nghiệm Vi Khí Hậu Sài Gòn cho từng hướng:
     * Hướng Nam / Đông Nam: Hướng gió sông Sài Gòn mát rượi (đón sinh khí đối lưu tự nhiên, giải phóng tích nhiệt).
     * Hướng Tây / Tây Nam: Hứng bức xạ nhiệt gay gắt buổi chiều, vách kính tích nhiệt 48°C - 52°C gây áp suất nhiệt cao.
     * Hướng Bắc / Đông Bắc: Gió se lạnh cuối năm (tháng 12 - tháng 2), ánh sáng tán xạ dịu mắt không gây chói.
     * Hướng Đông: Đón nắng sớm bình minh ấm áp, sinh năng lượng tích cực đầu ngày.
   - Giải pháp may đo kiến trúc GuHomes:
     * Với hướng nắng rát: Hệ lam trượt xoay gỗ Teak tẩm sấy vi khí hậu, kính hộp Low-E 2 lớp bơm khí trơ Argon, rèm cản nhiệt voan lụa.
     * Với hướng đón gió lành: Cửa lùa kịch trần Panorama, sàn gỗ Óc Chó (Walnut) lau dầu Osmo thở tự nhiên, vách tiêu âm mở rộng luồng khí.
   - Tương tác: Slider xoay góc la bàn 0° - 360° hoặc click nhanh 8 hướng; selector Năm sinh và Giới tính. Touch target >= 44px, chuẩn responsive 375px/390px không tràn viền ngang.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: PHÒNG THỬ NGHIỆM TIÊU ÂM & TÁN ÂM KIẾN TRÚC RT60 (AcousticDampeningSimulator.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/AcousticDampeningSimulator.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/projects/page.tsx\` và \`src/app/(site)/phong-cach/page.tsx\`:
1. Triết lý Quiet Luxury:
   - Đỉnh cao của sự xa xỉ trong căn hộ là sự tĩnh lặng (Acoustic Sanctuary).
   - Các căn Penthouse và Duplex trần cao (3.5m - 5.5m) với nhiều diện tích kính và sàn đá hoa cương thường bị dội âm chát chúa (RT60 > 1.8s), khiến việc nghe nhạc Hi-End (Bang & Olufsen, Devialet) hay trò chuyện gia đình trở nên mỏi mệt.
2. Tính năng kỹ thuật & UI tương tác:
   - 3 Không gian thực tế:
     * Căn hộ Duplex Thảo Điền (80m² x trần 4.2m)
     * Penthouse Thủ Thiêm (140m² x trần 3.6m)
     * Biệt thự Chateau Phú Mỹ Hưng (65m² x trần 3.8m)
   - So sánh đối chiếu trực quan (Tình trạng thô mặc định vs Hệ mộc tiêu âm GuHomes):
     * Tình trạng thô (Unconditioned): Sàn gạch bóng kiếng, tường bê tông sơn nước thường, vách kính trần -> RT60 = 1.82s (Vọng âm chát chúa, chói gắt, mệt tai).
     * Giải pháp mộc tiêu âm GuHomes:
       - Vách ốp lam gỗ Sồi/Walnut xẻ rãnh tiêu âm vi lỗ chuẩn Sabine (Micro-perforated acoustic grooved panels - NRC 0.85).
       - Trần vữa vôi khoáng tự nhiên (Lime plaster) xốp nhẹ triệt tiêu sóng đứng.
       - Sàn gỗ tự nhiên 15mm có đệm mút cao su non cách âm va đập 22dB.
       - Rèm nỉ linen Bỉ 3 lớp triệt tiêu phản xạ kính -> RT60 = 0.45s (Tiêu chuẩn phòng hòa nhạc Opera, âm trầm ấm, sâu lắng, yên bình tuyệt đối).
   - Biểu đồ dải tần số âm thanh (Frequency Band Chart: 125Hz, 250Hz, 500Hz, 1kHz, 2kHz, 4kHz) mô phỏng độ suy giảm vang âm.
   - Bộ trực quan hóa sóng âm (Sound wave visualizer pulse) mô phỏng tiếng vỗ tay dội âm (Echo Clang) vs tiếng vỗ tay tĩnh lặng êm dịu (Dampened Clarity).

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: CỔNG DỊCH VỤ TIẾP ĐÓN THƯỢNG KHÁCH VIP CONCIERGE (VipConciergePortal.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/consultation/VipConciergePortal.tsx\` và tích hợp vào \`src/app/(site)/contact/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Quiet Luxury:
   - Trải nghiệm tiếp đón thượng lưu xứng tầm gia chủ sở hữu bất động sản triệu đô.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 bước Onboarding thượng khách:
     * Bước 1: Nhận diện bất động sản (Chọn các khu căn hộ cao cấp: The Opera Metropole, Empire City Cove, Serenity Sky Villas, Grand Marina Saigon, The River, Biệt thự Chateau... hoặc nhập địa chỉ riêng).
     * Bước 2: Tải lên bản vẽ mặt bằng CAD/PDF hoặc yêu cầu KTS mang máy quét 3D Laser Leica khảo sát tận nơi.
     * Bước 3: Dịch vụ xe đưa đón GuHomes Concierge (Xe riêng đưa đón gia chủ từ tư gia đến Xưởng Mộc Thạnh Xuân 1.200m², Q.12 tham quan quy trình tẩm sấy mộng gỗ thủ công).
     * Bước 4: Nghi thức tiếp đón tại Studio (Trà Shan Tuyết cổ thụ ủ lạnh, Cà phê Arabica Cầu Đất rang mộc thủ công, hoặc Rượu vang hữu cơ tuyển chọn).
   - Validation biểu mẫu chặt chẽ, tạo mã thượng khách tức thì (GU-VIP-2026-XXXX), modal thông báo xác nhận lịch hẹn sang trọng, hotline 0368 757 916 và kết nối trực tiếp KTS Trưởng.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (chú ý null check cho Array.find).
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-16): add TropicalFengShuiCompass, AcousticDampeningSimulator, and VipConciergePortal'
5. Gửi tin nhắn báo cáo lại kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Hãy triển khai ngay bây giờ!`;

console.log('Updating master-orchestrator-state.json for Sprint 16...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-14-sprint-16-fengshui-acoustic-concierge',
    title: 'La Bàn Phong Thủy Vi Khí Hậu Sài Gòn, Phòng Thử Nghiệm Tiêu Âm RT60 & Cổng Dịch Vụ Thượng Khách VIP Concierge',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 16 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 16', TARGET_ID, SPRINT_16_DIRECTIVE],
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
