import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_27_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 27: HỆ LÀM MÁT NƯỚC MƯA NHIỆT ĐỚI, XƯỞNG SƠN MÀI THẾP VÀNG & KÉT KỶ VẬN GIA ĐÌNH]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 26:
- ArtisanBespokeJoineryVault, SaigonBreezeMicroclimateCurator, và ConciergeWhiteGloveMovingAudit đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống bảo tàng mộng mộc cổ truyền, vi khí hậu gió sông Sài Gòn và dịch vụ chuyển dọn tân gia White-Glove đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 27:
"HỆ LÀM MÁT NƯỚC MƯA NHIỆT ĐỚI, XƯỞNG SƠN MÀI THẾP VÀNG & KÉT KỶ VẬT GIA ĐÌNH"

Mục tiêu cốt lõi: Ứng dụng lượng mưa tự nhiên nhiệt đới làm mát thụ động sàn mái penthouse; tôn vinh nghệ thuật sơn mài truyền thống 15-20 lớp thếp vàng mài nước; và thiết lập khoang két kỷ vật gia đình chống cháy 1000°C ẩn sau vách mộng gỗ giấu kín.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: HỆ LÀM MÁT & THU NƯỚC MƯA NHIỆT ĐỚI (SaigonMonsoonRainwaterHarvestLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonMonsoonRainwaterHarvestLab.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Biến Mưa Sài Gòn Thành Nguồn Sống Vi Khí Hậu:
   - Sài Gòn có lượng mưa lên đến 2.400mm/năm. GuHomes thiết kế hệ thống thu gom nước mưa mái dốc dẫn qua bể lắng cát thạch anh và sỏi lọc sinh học, tuần hoàn phun sương làm mát mái bê tông penthouse, hạ nhiệt tức thì từ 55°C xuống 32°C.
2. Tính năng kỹ thuật & UI tương tác:
   - 4 Tầng lọc vi sinh tự nhiên: Màng lọc rác thô -> Bể lắng cát thạch anh -> Bồn đá cuội vi sinh -> Đèn khử khuẩn UV.
   - Thử nghiệm làm mát sàn mái bê tông nhiệt đới: Sàn mái truyền thống 54.5°C vs Mái tuần hoàn GuHomes 31.8°C (-22.7°C).
   - Chỉ số tiết kiệm nước sạch: Cung cấp 100% nước tưới cảnh quan và bù ẩm hồ cá Koi suốt mùa mưa.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: XƯỞNG SƠN MÀI BẢN ĐỊA BÁT TRÀNG x THẠNH XUÂN (HandcraftedLacquerArtisanAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/HandcraftedLacquerArtisanAtelier.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Sơn Ta Đất Việt & Chiều Sâu Quang Học:
   - Không dùng sơn PU công nghiệp vô hồn mau xước. Nghệ nhân xưởng Thạnh Xuân phối hợp nghệ nhân sơn mài Bát Tràng sử dụng nhựa cây sơn Phú Thọ nguyên chất (Sơn Ta), thếp vàng quỳ 24K, vỏ trứng và bạc lá, trải qua 18 lớp quét - ủ ẩm - mài nước kéo dài 90 ngày.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ cắt lớp 18 tầng sơn mài: Cốt gỗ kháng ẩm -> Vải xô bồi -> Sơn then bó hom -> Thếp vàng lá 24K -> Sơn cánh gián phủ -> Mài nước bằng than củi xoan.
   - Trình so sánh độ bóng sâu (Depth of Field): Sơn công nghiệp phẳng lì vs Sơn mài GuHomes lung linh đa tầng dưới ánh hoàng hôn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: KÉT KỶ VẬT GIA ĐÌNH & GIA PHẢ SỐ CHỐNG CHÁY (PrivateFamilyArchiveVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/PrivateFamilyArchiveVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Lưu Truyền Kỷ Vật Bách Niên:
   - Nơi cất giữ trang sức gia bảo, sổ đỏ bất động sản, gia phả dòng họ và nhật ký đời người. Giấu kín hoàn toàn sau vách tủ gỗ óc chó với cơ chế trượt mộng âm tĩnh lặng, bọc sợi gốm cách nhiệt ceramic chịu nhiệt 1000°C trong 4 giờ.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng trượt mở vách gỗ giấu kín bằng cảm biến vi chạm.
   - Thử nghiệm khả năng chịu nhiệt chuẩn UL 72 Class 350: Lửa ngoài 1000°C -> Nhiệt độ trong két < 45°C bảo vệ giấy tờ và ổ cứng dữ liệu số.
   - Form tư vấn tích hợp két bảo mật bí mật cho Penthouse & Biệt thự kèm mã tiếp đón VIP \`GU-VAULT-2026-X\`.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-27): add SaigonMonsoonRainwaterHarvestLab, HandcraftedLacquerArtisanAtelier, and PrivateFamilyArchiveVault with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!`;

console.log('Updating master-orchestrator-state.json for Sprint 27...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-25-sprint-27-rainwater-lacquer-vault',
    title: 'Hệ Làm Mát Nước Mưa Nhiệt Đới, Xưởng Sơn Mài Thếp Vàng & Két Kỷ Vật Gia Đình',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 27 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 27', TARGET_ID, SPRINT_27_DIRECTIVE],
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
