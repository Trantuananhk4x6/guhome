import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_23_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 23: VỮA VÔI THỦ CÔNG WABI-SABI, HẦM RƯỢU CIGAR VI KHÍ HẬU & PHIÊN TƯ VẤN 1-1 VỚI KTS TRƯỞNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 22:
- TactileHardwareAtelier, TropicalBonsaiEcologyLab, và BespokeTimberCareVault đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi (Commit b218caa).
- Toàn bộ các hệ thống kim khí đồng mộc may đo, cảnh quan sinh thái biophilic và cổng dưỡng gỗ tận gia VIP Care đã vận hành trơn tru trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC BƯỚC VÀO SPRINT 23:
"VỮA VÔI THỦ CÔNG WABI-SABI, HẦM RƯỢU CIGAR VI KHÍ HẬU & PHIÊN TƯ VẤN 1-1 VỚI KTS TRƯỞNG"

Mục tiêu cốt lõi: Khám phá chiều sâu xúc giác của bề mặt tường vữa vôi khoáng tự nhiên xoa tay Wabi-Sabi; làm chủ kỹ thuật hầm rượu & cigar vi khí hậu không đọng sương không rung chấn cho Penthouse; và thiết lập cổng tiếp đón tư vấn 1-1 thượng khách trực tiếp với KTS Trưởng GuHomes.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍ NGHIỆM VỮA VÔI THỦ CÔNG WABI-SABI (ArtisanLimePlasterLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanLimePlasterLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Bề Mặt Tường Xúc Giác Wabi-Sabi:
   - Trong không gian Quiet Luxury, các mảng tường không dùng sơn hóa chất công nghiệp bóng lộn, mà dùng vữa vôi khoáng tự nhiên quét xoa bay thủ công (Hand-troweled Lime Plaster). Bề mặt để mộc, loang màu tự nhiên theo độ ẩm và ánh sáng.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Hiệu ứng vữa vôi khoáng biểu tượng:
     * 01. Vôi Thô Tadelakt Ma-rốc (Moroccan Waterproof Tadelakt) - Xoa bóng bằng đá mã não tự nhiên, kháng nước tuyệt đối cho phòng tắm master.
     * 02. Vữa Vôi Bát Tràng Tro Rơm (Straw & Ash Mineral Plaster) - Ánh sợi rơm nếp mờ ảo, tỏa mùi thơm đất ẩm sau mưa mùa hạ.
     * 03. Vôi Bột Đá Cẩm Thạch Roman Marmorino (Crushed Carrara Marble Plaster) - Mịn màng như lụa, phản xạ tán quang êm dịu.
     * 04. Vữa Đất Sét Tự Nhiên Thô Mộc (Raw Earth Clay Render) - Tự điều hòa độ ẩm phòng, 0% hợp chất bay hơi VOC.
   - Bộ chỉnh góc ánh sáng xiên (Raking Light 15° - 45° - 75°): Quan sát bóng đổ vi mô của các vết bay xoa tay của nghệ nhân.
   - Thử nghiệm độ thoát ẩm (Vapor Permeability) & khả năng kháng mốc kiềm tính tự nhiên 100% dưới khí hậu nhiệt đới ẩm TP.HCM.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: HẦM RƯỢU & TỦ CIGAR VI KHÍ HẬU CHUẨN XÁC (SommelierWineCigarVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SommelierWineCigarVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/du-toan-chi-phi/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Bảo Tồn Bộ Sưu Tập Rượu Vang & Cigar:
   - Khí hậu Sài Gòn nắng gắt 38°C và độ ẩm 85% là khắc tinh của rượu vang Grand Cru và xì gà Cuba. Một hầm rượu đẳng cấp đòi hỏi sự kiểm soát vi khí hậu tuyệt đối 24/7 không đọng sương, không rung chấn.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Chuẩn mực kỹ thuật đỉnh cao:
     * Nhiệt độ vàng rượu vang 14°C ± 0.5°C & Độ ẩm cân bằng 68% không ngưng tụ giọt nước.
     * Kính hộp 3 lớp Low-E phủ khí Argon cản 99.9% tia cực tím phá hủy tannin.
     * Khay giá gỗ Tuyết Tùng Tây Ban Nha (Spanish Cedar) tự kháng mối mọt và tỏa hương thơm nồng ấm cho cigar.
     * Máy nén biến tần Inverter tách rời ngoài ban công, triệt tiêu vi rung chấn (< 0.01 mm/s) để rượu ngủ yên tĩnh tuyệt đối.
   - Bộ điều khiển tương tác mô phỏng hiển thị nhiệt độ, độ ẩm và chỉ số rung động thời gian thực.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: CỔNG TƯ VẤN 1-1 TRỰC TIẾP VỚI KTS TRƯỞNG (LeadArchitectPrivateSession.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/consultation/LeadArchitectPrivateSession.tsx\` và tích hợp vào \`src/app/(site)/contact/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Tiếp Đón Thượng Khách:
   - Trần 12 công trình/năm là lời cam kết: Người ngồi nghe bạn hôm đầu cũng là người có mặt ở công trường ngày cuối. Gia chủ được làm việc trực tiếp 1-1 với KTS Trưởng GuHomes.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Bước trong buổi làm việc riêng tư:
     * Bước 1: Lắng nghe nếp sống và gu thẩm mỹ của gia đình.
     * Bước 2: Phác thảo ý tưởng không gian 2D/3D hand-sketch trực tiếp tại bàn trà.
     * Bước 3: Trực tiếp cảm nhận các mẫu gỗ óc chó, đá vôi và vữa vôi trong Hộp mẫu xúc giác.
     * Bước 4: Lập sơ bộ kế hoạch tài chính và tiến độ thi công trọn gói.
   - Form đăng ký bảo mật 100% kèm mã tiếp đón VIP \`GU-STUDIO-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (kiểm tra null-check cho mọi mảng và state).
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-23): add ArtisanLimePlasterLab, SommelierWineCigarVault, and LeadArchitectPrivateSession with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Hãy bắt tay triển khai ngay lập tức!`;

console.log('Updating master-orchestrator-state.json for Sprint 23...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-21-sprint-23-plaster-wine-lead-architect',
    title: 'Vữa Vôi Thủ Công Wabi-Sabi, Hầm Rượu Cigar Vi Khí Hậu & Phiên Tư Vấn 1-1 Với KTS Trưởng',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 23 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 23', TARGET_ID, SPRINT_23_DIRECTIVE],
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
