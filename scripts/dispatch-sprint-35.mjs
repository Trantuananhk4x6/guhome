import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_35_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 35: PHÒNG TRANH BẢO TÀNG KÍNH QUANG HỌC, ĐỒNG HỒ CÁT THẠCH ANH & CIGAR LOUNGE VEN SÔNG]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 34:
- ArtisanLiveEdgeParquetFlooringVault, MonolithicCalacattaMarbleChefIslandVault, và RiversideDawnZenYogaPavilion đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống sàn gỗ mộng âm dương cổ thụ, đảo bếp Calacatta khối bếp từ tàng hình và phòng thiền yoga đón bình minh 528Hz đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 35:
"PHÒNG TRANH BẢO TÀNG KÍNH QUANG HỌC, ĐỒNG HỒ CÁT THẠCH ANH & CIGAR LOUNGE VEN SÔNG"

Mục tiêu cốt lõi: Thiết kế phòng trưng bày nghệ thuật tư gia kính quang học chống phản xạ < 0.5% đèn framing projector; chế tác đồng hồ cát thạch anh đỏ khung đồng cẩm lai; và kiến tạo phòng thưởng cigar ven sông áp suất âm không mùi với tủ ủ Spanish Cedar.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG TRANH NGHỆ THUẬT KÍNH BẢO TÀNG (PrivateArtCollectionMuseumVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/PrivateArtCollectionMuseumVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Tôn Vinh Kiệt Tác Hội Họa Gia Đình:
   - Những bức tranh sơn mài, sơn dầu và cổ vật gia truyền cần điều kiện trưng bày chuẩn bảo tàng Hermitage: Kính quang học chống phản quang độ trong suốt 99.5%, hệ thống ray Inox 316 chịu tải 250kg âm trần, đèn chiếu Framing Projector cắt tia sáng vừa khít khuôn tranh không lọt ra tường, điều hòa vi khí hậu 21°C ± 0.5°C & 50% RH.
2. Tính năng kỹ thuật & UI tương tác:
   - Thử nghiệm độ phản quang: Kính thông thường lóa bóng 8% vs Kính bảo tàng GuHomes trong suốt 0.5%.
   - Trình điều chỉnh đèn Framing Projector: Cắt mép ánh sáng hình chữ nhật bo khít tranh.
   - Giám sát độ ẩm và nhiệt độ bảo tồn tranh trực quan.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: XƯỞNG ĐỒNG HỒ CÁT TINH THỂ THẠCH ANH ĐỎ (ArtisanQuartzHourglassVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanQuartzHourglassVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Thời Gian Chậm Lại Giữa Đô Thị Vội Vã:
   - Bình thủy tinh Borosilicate thổi tay chứa cát thạch anh đỏ tự nhiên dòng chảy 60 phút hoàn hảo không vấp nghẽn. Khung tiện từ gỗ Cẩm Lai nguyên khối và 3 trụ đồng thau cát, tượng trưng cho 1 giờ đọc sách tĩnh tại buông bỏ điện thoại thông minh.
2. Tính năng kỹ thuật & UI tương tác:
   - Đồng hồ bấm giờ cát 60 phút tương tác trực quan dòng cát thạch anh mịn màng.
   - Âm thanh cát rơi siêu nhỏ chữa lành ASMR qua Web Audio API.
   - Thước đo độ mịn hạt cát 80 mesh tiêu chuẩn thiên văn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: CIGAR LOUNGE ÁP SUẤT ÂM & TỦ Ủ TUYẾT TÙNG (RiversideCigarLoungeAndHumidorSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/RiversideCigarLoungeAndHumidorSanctuary.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Thưởng Thức Đỉnh Cao Không Gây Phiền Lụy:
   - Phòng cigar ven sông thiết kế áp suất âm -15 Pa với hệ thống quạt hút lưu lượng 2.200 m³/h qua 3 tầng lọc than hoạt tính Carbon tổ ong và ion hóa triệt tiêu khói mùi 100%. Tủ ủ Humidor gỗ Spanish Cedar tự nhiên giữ ẩm 68% RH nuôi dưỡng lá xì gà Cohiba, ghế da bò Ý may tay.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình mô phỏng áp suất âm: Khói thuốc bị hút cuốn thẳng lên trần không tràn ra ngoài cửa.
   - Thử nghiệm độ ẩm tủ ủ Humidor 68% RH & nhiệt độ 18°C.
   - Form tư vấn phòng Cigar tư gia đẳng cấp (\`GU-CIGAR-2026-X\`).

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-35): add PrivateArtCollectionMuseumVault, ArtisanQuartzHourglassVault, and RiversideCigarLoungeAndHumidorSanctuary with 100% SEO pass'
5. Gửi tin nhắn báo cáo kết quả cho Master Orchestrator (Session 518ed476-6176-401f-a17a-e19bc0654bba).

Sẵn sàng nhận lệnh và triển khai!
`;

console.log('Updating master-orchestrator-state.json for Sprint 35...');
try {
  const state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
  state.activeDirective = {
    directiveId: 'dir-33-sprint-35-museumart-hourglass-cigarlounge',
    title: 'Phòng Tranh Bảo Tàng Kính Quang Học, Đồng Hồ Cát Thạch Anh & Cigar Lounge Ven Sông',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID,
  };
  state.lastDispatchedAt = Date.now();
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('State updated.');
} catch (e) {
  console.error('Failed to update state file:', e);
}

console.log('Sending Master Orchestrator Sprint 35 Directive to companion agent:', TARGET_ID);

const child = spawn(
  LANGUAGE_SERVER_EXE,
  ['agentapi', 'send-message', '--title=Master Orchestrator Directive - Sprint 35', TARGET_ID, SPRINT_35_DIRECTIVE],
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
