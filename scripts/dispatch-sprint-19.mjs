import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_19_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 19: XƯỞNG ĐÈN THỦ CÔNG GUHOMES ATELIER, BẢN ĐỒ MỎ ĐÁ GHÉP VÂN BOOKMATCH & NGHI THỨC BÀN GIAO HỘP MỘC HOÀNG KIM]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt khen ngợi kỳ tích Sprint 18:
- RiverBreezeAerodynamicsLab, KilnMoistureDiary, và BespokeFurnitureCustomizer đã hoàn tất 100%, vượt qua tất cả 153 routes SEO và production build Next.js với 0 lỗi (Commit 0938416 & a8a7c08).
- Toàn bộ các hệ thống khí động học gió sông, sấy chân không mộng âm và tùy biến may đo đồ mộc đã vận hành mượt mà trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC BƯỚC VÀO SPRINT 19:
"XƯỞNG ĐÈN THỦ CÔNG GUHOMES ATELIER, BẢN ĐỒ MỎ ĐÁ GHÉP VÂN BOOKMATCH & NGHI THỨC BÀN GIAO HỘP MỘC HOÀNG KIM"

Mục tiêu cốt lõi: Nâng tầm giải pháp ánh sáng mỹ thuật lên cấp độ chế tác đèn thủ công (Lighting Atelier); chinh phục vẻ đẹp điêu khắc của đá tự nhiên với bộ ghép vân đối xứng Bookmatch; và khẳng định đẳng cấp phục vụ thượng lưu qua Nghi thức bàn giao Hộp mộc Hoàng kim độc bản.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: XƯỞNG ĐÈN MAY ĐO THỦ CÔNG GUHOMES LIGHTING ATELIER (LightingAtelierCustomizer.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/LightingAtelierCustomizer.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Ánh Sáng Xúc Giác:
   - Ánh sáng trong không gian Quiet Luxury không đến từ đèn downlight chói gắt, mà đến từ các tác phẩm đèn may đo thủ công (Bespoke Luminaires) hòa quyện cùng đồng thau mộc, đá travertine và thủy tinh thổi miệng.
2. Tính năng kỹ thuật & UI tương tác:
   - 3 Tác phẩm đèn may đo biểu tượng:
     * 01. Đèn Thả Bàn Ăn Khối Đồng Thau Mộc Phay Xước & Ống Thủy Tinh Sọc Thổi Miệng (Fluted Glass & Raw Brushed Brass Linear Pendant).
     * 02. Đèn Cây Đứng Khối Điêu Khắc Đá Travertine Navona & Chao Vải Lanh Thô Tự Nhiên (Sculptural Travertine & Raw Linen Floor Lamp).
     * 03. Đèn Tường Hắt Hào Quang Gốm Men Tro Mờ Bát Tràng (Handcrafted Ceramic Wall Sconce).
   - Bộ điều chỉnh quang học chuyên nghiệp:
     * Nhiệt độ màu Warm Dim: 1800K (Nến ấm hoàng hôn) -> 2200K (Dạ tiệc êm đềm) -> 2700K (Ấm cúng thư giãn) -> 3000K (Trang nhã đọc sách).
     * Góc chiếu sáng (Beam Angle): 15° (Tụ điểm tranh tượng) / 36° (Rọi bàn trà) / 60° (Tỏa đều dịu êm).
     * Chỉ số hoàn màu cao cấp: CRI 98 (R9 > 92) giúp tôn vinh màu da người và độ sâu thớ vân gỗ óc chó.
   - Khung xem trước hiệu ứng vầng sáng hào quang (Light Halo Preview) thời gian thực và thông số công suất tiết kiệm điện.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BẢN ĐỒ MỎ ĐÁ TỰ NHIÊN & BỘ GHÉP VÂN ĐỐI XỨNG BOOKMATCH (NaturalStoneQuarryAtlas.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/NaturalStoneQuarryAtlas.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/projects/page.tsx\` và \`src/app/(site)/khu-vuc/page.tsx\`:
1. Triết lý Địa Chất & Đá Khoáng Tự Nhiên:
   - Đá nhân tạo sản xuất hàng loạt bằng hạt nhựa polyester sẽ bị lão hóa, ngả vàng dưới nắng Sài Gòn. GuHomes chỉ sử dụng đá khoáng tự nhiên nguyên khối được khai thác từ các mỏ đá trầm tích danh tiếng.
2. Tính năng kỹ thuật & UI tương tác:
   - Bản đồ 4 mỏ đá biểu tượng:
     * 01. Đá Travertine Navona (Mỏ đá ngầm Tivoli, Rome, Ý) - Vân rỗ khoáng mộc mạc, chống nồm ẩm hoàn hảo.
     * 02. Đá Marble Calacatta Viola (Mỏ Carrara, Ý) - Vân dập sắc tím rượu vang quý phái, xẻ nguyên khối làm đảo bếp.
     * 03. Đá Bazan Đen Cắt Thô (Mỏ đá Bình Định, Việt Nam) - Chịu lực va đập cực đại, chống trơn trượt khu vực ướt.
     * 04. Đá Vôi Trắng Búa Tay Bush-Hammered (Thanh Hóa, Việt Nam) - Xúc cảm sần thô gai góc mộc tự nhiên.
   - Trình mô phỏng ghép vân đối xứng (Bookmatch & Quadmatch Vein Alignment Simulator):
     * Chế độ ghép 2 tấm (Bookmatch đối xứng trục dọc) hoặc 4 tấm (Quadmatch hội tụ tâm điểm).
     * Người dùng tương tác xoay góc hoặc trượt mặt ghép vân để xem hiệu ứng bức tranh thủy mặc kỳ vĩ hình thành trên vách phòng khách.
   - Thử nghiệm độ thẩm thấu (Porosity) & 3 lớp phủ nano kháng ố độc quyền GuHomes.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: NGHI THỨC BÀN GIAO HỘP MỘC HOÀNG KIM & THẺ BẢO HÀNH KIM LOẠI (KeyHandoverRitualVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/sections/KeyHandoverRitualVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/du-toan-chi-phi/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Nghi Thức Bàn Giao (The Handover Ceremony):
   - Ngày dọn về nhà mới không chỉ là việc trao chìa khóa, mà là khoảnh khắc thiêng liêng chuyển giao một công trình nghệ thuật đã được ấp ủ hàng trăm ngày.
2. Tính năng kỹ thuật & UI tương tác:
   - Khám phá tương tác 4 ngăn trong "Hộp Mộc Bàn Giao Thửa Riêng" đóng từ gỗ óc chó Thạnh Xuân:
     * Ngăn 1: Chìa Khóa Đồng Thau Đúc Mộc & Mã Truy Cập Cửa Kỹ Thuật Số.
     * Ngăn 2: Hồ Sơ Hoàn Công Khổ A3 Đóng Bìa Vải Lanh Thô có chữ ký tay của KTS Trưởng & Kỹ Sư Giám Sát.
     * Ngăn 3: Hũ Tinh Dầu Trầm Hương Cổ Truyền Xông Nhà Mới & Lọ Dầu Dưỡng Gỗ Osmo Đức 125ml.
     * Ngăn 4: Thẻ Thép Đen Khắc Kim Loại VIP Card chứa mã QR liên kết Cổng Bảo Hành Số trọn đời 10 năm.
   - Trải nghiệm mở nắp hộp tương tác (Interactive Unboxing Ritual) với âm thanh chốt khóa mộc lách cách êm tai và modal xem giấy chứng nhận hoàn công trực quan.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (kiểm tra null-check cho mọi mảng và state).
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-19): add LightingAtelierCustomizer, NaturalStoneQuarryAtlas, and KeyHandoverRitualVault with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Hãy bắt tay triển khai ngay lập tức!`;

console.log('Updating master-orchestrator-state.json for Sprint 19...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-17-sprint-19-lighting-stone-handover-ritual',
    title: 'Xưởng Đèn Thủ Công GuHomes Atelier, Bản Đồ Mỏ Đá Ghép Vân Bookmatch & Nghi Thức Bàn Giao Hộp Mộc Hoàng Kim',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 19 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 19', TARGET_ID, SPRINT_19_DIRECTIVE],
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
