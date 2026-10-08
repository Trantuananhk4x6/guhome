import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_26_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 26: BẢO TÀNG MỘNG GỖ CỔ TRUYỀN, VI KHÍ HẬU GIÓ SÔNG SÀI GÒN & DỊCH VỤ DỌN NHÀ WHITE-GLOVE]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 25:
- SaigonCourtyardAtriumLab, BespokeWalkInWardrobeVault, và ArtisanCraftsmanPassport đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống giếng trời Atrium khí động học, phòng thay đồ vi khí hậu trầm hương và hộ chiếu nghệ nhân chip NFC đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 26:
"BẢO TÀNG MỘNG GỖ CỔ TRUYỀN, VI KHÍ HẬU GIÓ SÔNG SÀI GÒN & DỊCH VỤ DỌN NHÀ WHITE-GLOVE"

Mục tiêu cốt lõi: Tôn vinh nghệ thuật ghép mộng mộc truyền thống không đinh kim loại của xưởng Thạnh Xuân; tối ưu hóa luồng thông gió tự nhiên vi khí hậu gió sông Sài Gòn; và nâng chuẩn phục vụ thượng khách với dịch vụ dọn nhà nghi thức White-Glove Concierge.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: BẢO TÀNG MỘNG GỖ CỔ TRUYỀN (ArtisanBespokeJoineryVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanBespokeJoineryVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Khớp Nối Mộc Không Đinh Sắt:
   - Đồ gỗ bền vững hàng trăm năm nhờ triết lý tôn trọng sự co ngót tự nhiên của thớ gỗ. Không dùng đinh sắt rỉ sét hay keo dán công nghiệp, nghệ nhân Thạnh Xuân ghép nối bằng các kết cấu mộng phức tạp chịu tải trọng hàng tấn.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Khớp mộng mộc bậc thầy:
     * 01. Mộng Đuôi Én Đan Cài (Dovetail Joint) - Khóa chặt ngăn kéo gỗ óc chó vĩnh cửu.
     * 02. Chốt Bướm Nẹp Nứt Tự Nhiên (Butterfly Key Inlay) - Khóa vết nứt mặt bàn Live Edge bằng gỗ mun sừng.
     * 03. Mộng Khóa Ba Chiều Cổ Truyền (Three-Way Mitred Joint) - Chân bàn chân ghế khóa chặt không mối nối thô.
     * 04. Mộng Lỗ Xuyên Nêm Gỗ (Tusk Tenon Joint) - Khung giường và giá sách tháo lắp không cần ốc vít.
   - Trình phân rã 3D (Exploded View): Kéo thanh trượt để tách rời và ghép khớp mộng vào nhau trực quan.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: ĐIỀU PHỐI VI KHÍ HẬU GIÓ SÔNG SÀI GÒN (SaigonBreezeMicroclimateCurator.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBreezeMicroclimateCurator.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/khu-vuc/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Đón Gió Tự Nhiên Thay Máy Lạnh:
   - Tận dụng hướng gió mùa Tây Nam và Đông Bắc cùng dải gió đối lưu sông Sài Gòn qua các trục cửa lật khí động học. Căn nhà tự thở, mang khí trời trong lành vào phòng mà không gây bụi bặm.
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng hướng gió theo 4 tâm điểm bất động sản ven sông: Bán đảo Thủ Thiêm, Thảo Điền Riverside, Ba Son Golden River và Phú Mỹ Hưng.
   - Thước đo chất lượng không khí: Nồng độ CO2 hạ từ 1200 ppm (phòng kín bí) xuống < 450 ppm (chuẩn rừng sinh thái).
   - Biểu đồ tiết kiệm năng lượng điện: Giảm 45% hóa đơn tiền điện máy lạnh trong mùa khô.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: DỊCH VỤ DỌN NHÀ BẠCH KIM WHITE-GLOVE (ConciergeWhiteGloveMovingAudit.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ConciergeWhiteGloveMovingAudit.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Ngày Về Nhà Mới Là Ngày An Vui:
   - Loại bỏ hoàn toàn sự mệt mỏi và bề bộn của ngày chuyển nhà. Đội ngũ chuyên gia GuHomes mang găng tay trắng, bọc bảo vệ toàn bộ tác phẩm nghệ thuật, đồ gốm, tranh sơn mài và treo xếp phẳng phiu từng bộ âu phục trong tủ trước giờ gia chủ bước vào cửa.
2. Tính năng kỹ thuật & UI tương tác:
   - Quy trình 5 bước White-Glove: Bảo hiểm tranh & cổ vật -> Thùng gỗ chống sốc may đo -> Xe chuyên dụng đệm khí nén -> Bố trí chuẩn nhân trắc học -> Nghi thức xông trầm & cắm hoa tươi đón gia chủ.
   - Form đăng ký dịch vụ chuyển dọn tân gia trọn gói với mã tiếp đón VIP \`GU-WHITEGLOVE-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-26): add ArtisanBespokeJoineryVault, SaigonBreezeMicroclimateCurator, and ConciergeWhiteGloveMovingAudit with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!"
`;

console.log('Updating master-orchestrator-state.json for Sprint 26...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-24-sprint-26-joinery-breeze-whiteglove',
    title: 'Bảo Tàng Mộng Gỗ Cổ Truyền, Vi Khí Hậu Gió Sông Sài Gòn & Dịch Vụ Dọn Nhà White-Glove',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 26 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 26', TARGET_ID, SPRINT_26_DIRECTIVE],
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
