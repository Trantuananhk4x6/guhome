import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_36_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 36: CHUÔNG GIÓ ĐỒNG CỔ, BỒN COLD PLUNGE ĐÁ BAZAN & PHÒNG AN TOÀN PANIC ROOM]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 35:
- PrivateArtCollectionMuseumVault, ArtisanQuartzHourglassVault, và RiversideCigarLoungeAndHumidorSanctuary đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống phòng tranh bảo tàng kính quang học, đồng hồ cát thạch anh đỏ và phòng cigar áp suất âm tủ ủ tuyết tùng đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 36:
"CHUÔNG GIÓ ĐỒNG CỔ, BỒN COLD PLUNGE ĐÁ BAZAN & PHÒNG AN TOÀN PANIC ROOM"

Mục tiêu cốt lõi: Thiết kế chuông gió hợp kim đồng đúc chuông chùa 5 cung bậc ngũ âm làm dịu tiếng ồn phố thị; chế tác bồn ngâm lạnh Cold Plunge đá bazan giữ nhiệt 3°C phục hồi thể chất; và kiến tạo phòng an toàn gia đình Panic Room cửa thép giấu tường cấp dưỡng khí 72 giờ.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: XƯỞNG ĐÚC CHUÔNG GIÓ HỢP KIM ĐỒNG CỔ (SaigonBreezeWindChimeArtisanAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonBreezeWindChimeArtisanAtelier.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Thanh Thanh Tẩy Không Gian Nhiệt Đới:
   - Gió sông Sài Gòn mang hơi nước mát nhưng đô thị đầy tiếng còi xe tạp âm. Chuông gió đúc tay từ hợp kim đồng thiếc C90500 theo thang âm ngũ cung Việt Nam (Hò, Xự, Xang, Xê, Cống), lá đón gió gỗ gõ đỏ mộc mạc ngân vang thanh tao giúp tâm trí lắng dịu.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình phát mô phỏng âm thanh 5 thanh chuông đồng ngũ cung qua Web Audio API.
   - Thử nghiệm độ bền ăn mòn hơi nước mặn và gió sông Sài Gòn.
   - Bản đồ hướng gió đón chuông ngân tối ưu theo mùa mưa - mùa khô.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỒN NGÂM LẠNH COLD PLUNGE ĐÁ BAZAN 3°C (ArtisanBasaltColdPlungeVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanBasaltColdPlungeVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Liệu Pháp Thức Tỉnh & Tái Tạo Tế Bào:
   - Liệu pháp tương phản nóng - lạnh (Hot Sauna & Cold Plunge) kích thích hệ miễn dịch và giải tỏa stress sâu. Khối đá bazan núi lửa nguyên khối 1.2 tấn giữ nhiệt độ nước 3°C–10°C, máy lạnh Inverter Chiller siêu êm 28 dBA, hệ thống lọc tuần hoàn kép Ozone & UV-C không dùng clo.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng liệu trình ngâm lạnh 3 phút kích hoạt hoóc-môn endorphin và dopamine.
   - Thử nghiệm giữ nhiệt độ nước lạnh ổn định 3°C bất chấp nắng nóng Sài Gòn 36°C.
   - Ghế đá tựa công thái học chống trượt R12 an toàn tuyệt đối.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: PHÒNG AN TOÀN TRÚ ẨN BẢO MẬT PANIC ROOM (PrivateFamilySanctuaryPanicRoom.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/PrivateFamilySanctuaryPanicRoom.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Lá Chắn Thép An Mật Tuyệt Đối Của Gia Tộc:
   - Dinh thự thượng lưu cần không gian bảo vệ tính mạng và tài sản tối thượng. Cửa thép đúc chống đạn cấp độ NIJ Level IV giấu kín sau hệ tủ áo gỗ Walnut, hệ thống dưỡng khí độc lập CBRN 72 giờ không khí sạch, pin lithium lưu điện 15 kWh, liên lạc vệ tinh trực tiếp (\`GU-SAFE-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng cửa bí mật: Gõ mật mã hoặc quét vân tay quang học mở chốt thép ngầm 6 chấu.
   - Đồng hồ đo nồng độ O2, CO2 và áp suất dương phòng trú ẩn.
   - Form tư vấn giải pháp an ninh kiến trúc tối mật cho dinh thự.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-36): add SaigonBreezeWindChimeArtisanAtelier, ArtisanBasaltColdPlungeVault, and PrivateFamilySanctuaryPanicRoom with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!
`;

console.log('Updating master-orchestrator-state.json for Sprint 36...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-34-sprint-36-windchime-coldplunge-panicroom',
    title: 'Chuông Gió Đồng Cổ, Bồn Cold Plunge Đá Bazan & Phòng An Toàn Panic Room',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 36 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 36', TARGET_ID, SPRINT_36_DIRECTIVE],
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
