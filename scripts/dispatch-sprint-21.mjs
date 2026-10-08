import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_21_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 21: PHÒNG THƯỞNG TRÀ TỊNH TÂM, KỸ NGHỆ ĐẢO BẾP KHỐI ĐÁ CHEF ISLAND & BẢNG TIẾN ĐỘ DÒNG TIỀN 6 ĐỢT MINH BẠCH]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng mốc son lịch sử: CỘT MỐC 20 SPRINT LIÊN TỤC ĐÃ HOÀN THÀNH 100%!
- TactileTextileDraperyLab, SubfloorAcousticMoistureShield, và EstateRenovationDiagnostic đã hoàn tất toàn diện với commit 1167aee trên nhánh enhaceta!
- Đạt 0 lỗi TypeScript, 100% routes SEO pass và 153/153 trang static build hoàn hảo!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC BƯỚC VÀO SPRINT 21:
"PHÒNG THƯỞNG TRÀ TỊNH TÂM, KỸ NGHỆ ĐẢO BẾP KHỐI ĐÁ CHEF ISLAND & BẢNG TIẾN ĐỘ DÒNG TIỀN 6 ĐỢT MINH BẠCH"

Mục tiêu cốt lõi: Khắc họa chiều sâu văn hóa trà đạo tịnh tâm Wabi-Sabi kết hợp tinh hoa trà cổ thụ Việt Nam; bóc tách giải pháp cơ điện - cấp thoát nước âm giấu kín của đảo bếp đá nguyên khối (Chef Island); và xây dựng công cụ tài chính minh bạch dòng tiền 6 đợt nghiệm thu giúp gia chủ hoàn toàn an tâm khi làm nhà.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: KHÔNG GIAN THƯỞNG TRÀ TỊNH TÂM TĨNH LẶNG (TeaSanctuaryPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/TeaSanctuaryPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Trà Đạo Quiet Luxury:
   - Phòng trà trong tư gia thượng lưu không chỉ là nơi tiếp khách quý, mà là trạm dừng tĩnh tâm, nuôi dưỡng nội lực sau những biến động ngoài thương trường.
2. Tính năng kỹ thuật & UI tương tác:
   - 3 Mô hình phòng trà may đo:
     * 01. Trà Thất Chiếu Tatami Truyền Thống: Chiếu cói tự nhiên Igusa Nhật Bản thơm ngát, bàn trũng Kotatsu hạ sàn, vách lụa Shoji tán quang êm đềm.
     * 02. Bàn Trà Thủy Mặc Khối Gỗ Mun & Đá Vôi: Mặt bàn nguyên tấm phay mộc cạnh tự nhiên (Live Edge), chiếu đèn rọi tụ điểm 1800K như ánh nến.
     * 03. Góc Thiền Trà Ban Công Ven Sông: Hệ lam gỗ Teak xoay chắn gió tạt, rèm tre đan thủ công, bồn sỏi suối tự nhiên tạo âm thanh róc rách.
   - Trải nghiệm pha trà cảm quan (Sensory Tea Ritual):
     * Chọn loại trà: Shan Tuyết Cổ Thụ Tà Xùa 300 năm, Sen Tây Hồ ướp bông sớm, hay Ô Long Lão Trà Đại Hồng Bào.
     * Điều chỉnh nhiệt độ nước: 85°C (Hương cốm ngọt ngào) -> 92°C (Vị chát dịu hậu ngọt sâu thẳm).
     * Xem trước không gian ánh sáng nến ấm và ghi chép nhân trắc học chiều cao ngồi bệt êm ái.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: KỸ NGHỆ ĐẢO BẾP ĐÁ NGUYÊN KHỐI CHEF ISLAND (ChefIslandPlumbingVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ChefIslandPlumbingVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/du-toan-chi-phi/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Trung Tâm Đảo Bếp:
   - Đảo bếp không chỉ là nơi nấu nướng mà là sân khấu ẩm thực của gia chủ. Mọi đường ống cấp thoát nước, dây điện cao áp và ống hút mùi phải ẩn mình hoàn toàn trong khối đá tự nhiên.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Tầng công nghệ cơ điện đỉnh cao:
     * Tầng 1: Chậu rửa âm đá tự nhiên nguyên khối vát góc 15° không có đường nối keo silicon, triệt tiêu 100% nấm mốc đen.
     * Tầng 2: Cụm xi-phông chống mùi P-Trap bằng đồng đúc chịu nhiệt độ dầu mỡ sôi 120°C và lưu lượng thoát cực đại 45 lít/phút.
     * Tầng 3: Cột ổ cắm điện âm sàn cơ khí chuẩn IP67 nâng hạ tự động, tự ngắt điện khi phát hiện nước tràn mặt bàn đá.
     * Tầng 4: Hệ thống hút mùi mặt bàn Downdraft lưu lượng 1100 m³/h giấu âm trong hệ tủ mộc Plywood chịu ẩm, độ ồn < 38dB.
   - Sơ đồ mặt cắt kỹ thuật tương tác: Xem hướng di chuyển của khói thức ăn và dòng nước thoát êm ru không tạo tiếng ùng ục trong căn hộ.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: BẢNG TIẾN ĐỘ DÒNG TIỀN & 6 GIAI ĐOẠN NGHIỆM THU (CashflowMilestoneScheduler.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/CashflowMilestoneScheduler.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Minh Bạch Dòng Tiền:
   - GuHomes cam kết không bao giờ thu tiền vượt quá giá trị công việc hoàn thành trên công trường. Mỗi đồng tiền gia chủ chuyển đều gắn liền với một biên bản nghiệm thu có chữ ký của KTS Trưởng.
2. Tính năng kỹ thuật & UI tương tác:
   - Nhập ngân sách dự kiến (ví dụ: 800 triệu, 1.5 tỷ, 3 tỷ, 5 tỷ):
   - Tự động bóc tách tiến độ 6 đợt thanh toán chuẩn mực:
     * Đợt 1 (15%): Ký kết hợp đồng thiết kế & Khảo sát đo đạc hiện trạng 3D Leica.
     * Đợt 2 (20%): Bàn giao hồ sơ kỹ thuật thi công A3 & Chốt duyệt phôi gỗ thực tế tại Xưởng Thạnh Xuân.
     * Đợt 3 (25%): Hoàn thành cải tạo thô, chống thấm 3 lớp, ống gió điều hòa VRV & đi dây điện KNX.
     * Đợt 4 (20%): Nghiệm thu mộng gỗ đồ mộc tại Xưởng Thạnh Xuân trước khi phun dầu Osmo Đức.
     * Đợt 5 (15%): Lắp đặt hoàn thiện toàn bộ nội thất liền tường & đồ rời, vệ sinh công nghiệp.
     * Đợt 6 (5%): Bàn giao Hộp Mộc Hoàng Kim, chìa khóa, hồ sơ hoàn công & kích hoạt bảo hành 10 năm.
   - Biểu đồ tiến độ trực quan theo tuần (Tuần 1 đến Tuần 12) kèm danh mục nghiệm thu chi tiết từng đợt.
   - Nút "Xuất Kế Hoạch Dòng Tiền & Đặt Lịch Hẹn": Mở Modal liên hệ kèm mã tiến độ \`GU-CASHFLOW-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (kiểm tra null-check cho mọi mảng và state).
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-21): add TeaSanctuaryPavilion, ChefIslandPlumbingVault, and CashflowMilestoneScheduler with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Hãy triển khai ngay bây giờ!`;

console.log('Updating master-orchestrator-state.json for Sprint 21...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-19-sprint-21-tea-island-cashflow',
    title: 'Phòng Thưởng Trà Tịnh Tâm, Kỹ Nghệ Đảo Bếp Khối Đá Chef Island & Bảng Tiến Độ Dòng Tiền 6 Đợt Minh Bạch',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 21 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 21', TARGET_ID, SPRINT_21_DIRECTIVE],
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
