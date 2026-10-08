import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_42_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 42: ĐỒNG HỒ NƯỚC CLEPSYDRA, TỦ BẢO TỒN TOURBILLON & TIỂU CẢNH RỪNG NGẬP MẶN]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 41:
- SaigonCalocedrusHomeCinemaSanctuary, ArtisanMotherOfPearlChessPavilion, và ArtisanRiverPebbleAcupressureWalkway đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống phòng chiếu phim gỗ Bách Xanh âm học Dolby Atmos, bàn cờ Mun sừng khảm ốc xà cừ và lối sỏi suối bấm huyệt sưởi ấm đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 42:
"ĐỒNG HỒ NƯỚC CLEPSYDRA, TỦ BẢO TỒN TOURBILLON & TIỂU CẢNH RỪNG NGẬP MẶN"

Mục tiêu cốt lõi: Thiết kế đồng hồ nước thủy lực học Clepsydra giọt thời gian gõ nhịp chuông đồng 1Hz; chế tác tủ xoay bảo tồn đồng hồ Tourbillon và xì gà vi khí hậu 68% RH; và kiến tạo tiểu cảnh sinh thái rừng ngập mặn Cần Giờ thu nhỏ giếng trời dinh thự.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: ĐỒNG HỒ NƯỚC THỦY LỰC HỌC CLEPSYDRA (SaigonClepsydraWaterClockVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonClepsydraWaterClockVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Dòng Chảy Thời Gian Hữu Hình:
   - Cỗ máy đếm giờ thủy lực học chế tác từ ống thủy tinh borosilicate trong suốt kết hợp phao đồng thau đúc cát. Nước cất tinh khiết nhỏ giọt chính xác 1 giây (1Hz) làm dao động búa gõ nhỏ vào chuông đồng ngân vang thanh âm thiền định dịu êm. Bệ đỡ đá phiến đen Thanh Hóa nguyên khối triệt tiêu rung động môi trường; ánh sáng LED 2400K soi bóng bọt nước huyền ảo.
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng giọt nước rơi và thanh âm chuông đồng 1Hz qua Web Audio API.
   - Thử nghiệm độ chính xác sai số < 1 giây / 24 giờ của hệ thủy lực đối trọng.
   - Bản vẽ kỹ thuật chuyển động cơ khí thủy lực học vector SVG.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: TỦ XOAY BẢO TỒN TOURBILLON & CIGAR (HorologyTimepieceAndCigarVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/HorologyTimepieceAndCigarVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Bảo Tồn Cỗ Máy Đo Đếm Thời Gian Thượng Thừa:
   - Tủ âm tường bọc gỗ Spanish Cedar giữ ẩm 68% RH và nhiệt độ 20°C cho cả bộ sưu tập Patek Philippe và xì gà thượng hạng. 6 ổ xoay mô phỏng cử động cổ tay dùng động cơ Mabuchi Nhật Bản siêu tĩnh < 10 dBA với 4 chế độ số vòng quay mỗi ngày (TPD); kính Low-E cản 100% tia cực tím bảo vệ men nung mặt số đồng hồ; khóa vân tay quang học bảo mật cao.
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ chọn chương trình xoay TPD (650 / 800 / 950 / 1200 vòng/ngày) theo thương hiệu đồng hồ.
   - Bảng đồng hồ theo dõi độ ẩm 68% RH và nhiệt độ 20.0°C thời gian thực.
   - Mô phỏng cơ chế lên dây cót êm ái cho đồng hồ cơ khí.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: TIỂU CẢNH SINH THÁI RỪNG NGẬP MẶN CẦN GIỜ (SaigonMangroveBoutiqueEcologyLab.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/SaigonMangroveBoutiqueEcologyLab.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Hồn Thiên Nhiên Bản Địa Cần Giờ Trong Dinh Thự:
   - Giếng trời kết hợp hồ tiểu cảnh nước lợ nuôi dưỡng cây bần, đước đôi, dừa nước và rêu tự nhiên; hệ thống bơm đối lưu mô phỏng thủy triều sông Sài Gòn lên xuống 6 giờ/chu kỳ; màng lọc sinh học cát thạch anh lọc nước trong vắt không mùi; bộ đèn full-spectrum 4500K chiếu sáng chu kỳ ngày đêm cho cây quang hợp khỏe mạnh (\`GU-MANGROVE-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ mô phỏng nhịp triều cường sông Sài Gòn (Triều lên / Đỉnh triều / Triều rút).
   - Bộ chỉ số nước sinh thái tự nhiên: Độ mặn 12 ppt, pH 7.4, Oxy hòa tan 6.5 mg/L.
   - Form tư vấn giải pháp giếng trời sinh thái ngập mặn biệt thự ven sông.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-42): add SaigonClepsydraWaterClockVault, HorologyTimepieceAndCigarVault, and SaigonMangroveBoutiqueEcologyLab with 100% SEO pass'
----------------------------------------------------------------------
`;

async function main() {
  console.log('[MASTER-ORCHESTRATOR] Updating state and preparing Sprint 42 dispatch...');

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed to parse state file:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-40-sprint-42-clepsydra-tourbillon-mangrove',
    title: 'Đồng Hồ Nước Clepsydra, Tủ Bảo Tồn Tourbillon & Tiểu Cảnh Rừng Ngập Mặn',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[MASTER-ORCHESTRATOR] State updated to Sprint 42.');

  const child = spawn(
    LANGUAGE_SERVER_EXE,
    ['send-agent-message', '--to', TARGET_ID, '--message', SPRINT_42_DIRECTIVE],
    { stdio: 'inherit' }
  );

  child.on('exit', (code) => {
    console.log(`[MASTER-ORCHESTRATOR] Directive Sprint 42 dispatched with exit code: ${code}`);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('[MASTER-ORCHESTRATOR] Error in dispatch-sprint-42:', err);
  process.exit(1);
});
