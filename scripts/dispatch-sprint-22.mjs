import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_22_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 22: PHÒNG THÍ NGHIỆM KIM KHÍ ĐỒNG MỘC MAY ĐO, CẢNH QUAN SINH THÁI NHIỆT ĐỚI BIOPHILIC & CỔNG DƯỠNG GỖ TẬN GIA VIP CARE]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 21:
- TeaSanctuaryPavilion, ChefIslandPlumbingVault, và CashflowMilestoneScheduler đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi (Commit 3ed767e).
- Toàn bộ các hệ thống phòng thưởng trà tịnh tâm, đảo bếp khối đá và minh bạch dòng tiền 6 đợt đã vận hành mượt mà trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC BƯỚC VÀO SPRINT 22:
"PHÒNG THÍ NGHIỆM KIM KHÍ ĐỒNG MỘC MAY ĐO, CẢNH QUAN SINH THÁI NHIỆT ĐỚI BIOPHILIC & CỔNG DƯỠNG GỖ TẬN GIA VIP CARE"

Mục tiêu cốt lõi: Nâng tầm chi tiết xúc giác phụ kiện kim khí may đo thủ công (Architectural Hardware & Silent Magnetic Latch); tích hợp giải pháp sinh thái cây xanh vi khí hậu chống nắng Tây và bụi mịn PM2.5 (Biophilic Ecology); và ra mắt cổng dịch vụ hậu mãi đặc quyền "Nghệ nhân dưỡng gỗ tận gia VIP Care" bảo tồn giá trị truyền đời cho tư gia.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍ NGHIỆM KIM KHÍ ĐỒNG MỘC MAY ĐO (TactileHardwareAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/TactileHardwareAtelier.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Xúc Giác Kim Khí Mộc:
   - Tay nắm cửa, then cài và bản lề là điểm chạm xúc giác đầu tiên khi gia chủ bước vào không gian. Kim khí trong Quiet Luxury phải đầm chắc, để mộc tự tạo lớp patina trầm mặc và đóng mở êm ru tuyệt đối.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Tác phẩm kim khí may đo độc bản:
     * 01. Tay Nắm Cửa Điêu Khắc Đồng Thau Mộc (Solid Unlacquered Brass Handle) - Phay rãnh chỉ âm công thái học, nặng 1.8kg đồng đặc, bóng ấm theo thân nhiệt người chạm.
     * 02. Tay Nắm Âm Tủ Gỗ Mun Sừng & Nẹp Đồng (Ebony & Brass Flush Pull) - Vuốt phẳng mượt mà không gờ cạnh, giấu đinh ốc 100%.
     * 03. Khóa Cửa Từ Tính Triệt Tiêu Âm Thanh (Silent Magnetic Latch) - Lưỡi khóa từ tính thụt mở êm ái, độ ồn đóng cửa < 18dB (êm hơn tiếng thì thầm).
     * 04. Then Cài Trục Xoay Cremone Khổ Lớn 2.8m (Architectural Cremone Bolt) - Đúc nguyên thanh đồng thau cho hệ cửa ban công gỗ kính đón gió sông.
   - Thử nghiệm âm học va đập: Khóa cơ truyền thống 65dB (tiếng cạch kim loại chói tai) vs Khóa từ tính GuHomes 18dB (êm ru không đánh thức giấc ngủ người bên cạnh).
   - Mô phỏng xoay lật 360° chi tiết tay nắm và cảm giác xúc giác (Tactile Touch Note).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BẢN ĐỒ CẢNH QUAN SINH THÁI NHIỆT ĐỚI BIOPHILIC (TropicalBonsaiEcologyLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/TropicalBonsaiEcologyLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/khu-vuc/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Sinh Thái Nhiệt Đới:
   - Cây xanh trong kiến trúc GuHomes đóng vai trò màng lọc sinh học cản nhiệt độ nắng Tây, hấp thụ bụi mịn PM2.5 và điều hòa vi khí hậu tự nhiên cho căn hộ cao tầng và biệt thự sân vườn.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Dòng thực vật nhiệt đới biểu tượng:
     * 01. Cây Bàng Vuông Biển Đảo (Barringtonia) - Tán lá dày xanh thẳm cản 85% bức xạ nhiệt, hoa thơm về đêm.
     * 02. Thạch Nam Bonsai Khối Lũa (Enkianthus perulatus) - Dáng lũa thiền định thanh lọc formaldehyde trong phòng khách.
     * 03. Hoa Giấy Gốc Cổ Thụ Lũa - Chịu hạn kiên cường dưới nắng Tây 40°C, hoa nở rực rỡ không tốn công chăm sóc.
     * 04. Vườn Thảo Mộc Ban Công (Hương Thảo, Bạc Hà) - Tỏa tinh dầu tự nhiên xua đuổi côn trùng và muỗi mùa mưa.
   - Hệ thống thoát nước & tưới ngầm 3 tầng kỹ thuật:
     * Tầng sỏi nhẹ Keramzit cách rễ, màng địa kỹ thuật lọc đất và hệ tưới nhỏ giọt ngầm tiết kiệm 60% nước không rò rỉ sàn ban công.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: CỔNG ĐẶT LỊCH NGHỆ NHÂN DƯỠNG GỖ TẬN GIA VIP CARE (BespokeTimberCareVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/BespokeTimberCareVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Chăm Sóc Truyền Đời:
   - Một công trình cao cấp cần được chăm sóc định kỳ như một tác phẩm nghệ thuật. GuHomes cung cấp đặc quyền nghệ nhân xưởng mộc Thạnh Xuân đến tận nhà dưỡng dầu định kỳ 6 tháng/lần miễn phí trong 5 năm đầu.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Bước trong quy trình "Spa Mộc Tận Gia":
     * Bước 1: Đo kiểm độ ẩm gỗ 6 điểm bằng máy Delmhorst Hoa Kỳ.
     * Bước 2: Cân chỉnh bản lề âm Blum & ray trượt âm tủ giảm chấn về dung sai 0.1mm.
     * Bước 3: Đánh bóng mờ thủ công bằng dầu Osmo Polyx-Oil Đức xóa mờ các vết trầy xước nhẹ.
     * Bước 4: Xông tinh dầu trầm hương tự nhiên khử khuẩn hệ tủ áo walk-in closet.
   - Tra cứu hồ sơ bảo hành kỹ thuật số: Nhập mã công trình (ví dụ: \`GU-VIP-2026\`) hoặc số điện thoại -> Hiển thị nhật ký bảo trì và nút "Đặt Lịch Nghệ Nhân Đến Tận Nhà" mở Modal xác nhận tức thì.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (kiểm tra null-check cho mọi mảng và state).
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-22): add TactileHardwareAtelier, TropicalBonsaiEcologyLab, and BespokeTimberCareVault with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Hãy bắt tay triển khai ngay lập tức!`;

console.log('Updating master-orchestrator-state.json for Sprint 22...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-20-sprint-22-hardware-biophilic-timber-care',
    title: 'Phòng Thí Nghiệm Kim Khí Đồng Mộc May Đo, Cảnh Quan Sinh Thái Nhiệt Đới Biophilic & Cổng Dưỡng Gỗ Tận Gia VIP Care',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 22 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 22', TARGET_ID, SPRINT_22_DIRECTIVE],
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
