import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_39_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 39: VƯỜN LAN TREO KHÔNG TRỌNG LỰC, BỂ CÁ KOI ÂM SÀN & ĐỒNG HỒ MẶT TRỜI ĐÁ CẨM THẠCH]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 38:
- SaigonAudiophileVinylSanctuary, SaigonRiversideOutdoorFirePitVault, và PrivateHimalayanSaltCaveWellnessVault đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống phòng thẩm âm đĩa than Hi-End RT60 0.35s, bồn lửa ngoài trời sunken lounge ven sông và phòng muối khoáng hồng Himalaya đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 39:
"VƯỜN LAN TREO KHÔNG TRỌNG LỰC, BỂ CÁ KOI ÂM SÀN & ĐỒNG HỒ MẶT TRỜI ĐÁ CẨM THẠCH"

Mục tiêu cốt lõi: Thiết kế vườn lan rừng nhiệt đới treo cáp không trọng lực với hệ thống sương mù siêu âm; chế tác bể cá Koi âm sàn kính cường lực 32mm bước đi trên mặt nước với hệ lọc vi sinh siêu êm; và kiến tạo đồng hồ mặt trời điêu khắc đá cẩm thạch Yên Bái chuẩn tọa độ Sài Gòn 10.7769° N.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: VƯỜN LAN RỪNG TREO KHÔNG TRỌNG LỰC (SaigonFloatingOrchidAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonFloatingOrchidAtelier.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Thiên Nhiên Lơ Lửng Giữa Đô Thị:
   - Các nhánh lan hoàng thảo rừng nguyên sinh được ghép trên gỗ lũa cổ thụ, treo lơ lửng bằng dây cáp SS316 siêu mảnh 1.2mm tạo cảm giác bay bổng không trọng lực. Hệ vòi phun sương siêu âm hạt mịn 5 micron tự động duy trì độ ẩm 80-85% mô phỏng vi khí hậu rừng ẩm nhiệt đới Nam Bộ. Đèn LED full-spectrum 3500K CRI 98 hỗ trợ quang hợp tự nhiên giấu kín trong khe trần.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình điều khiển chu kỳ phun sương vi khí hậu tự động.
   - Thử nghiệm độ ẩm và nhiệt độ quanh tán lan rừng.
   - Danh mục 5 giống lan quý bản địa Việt Nam thích ứng hoàn hảo vi khí hậu Sài Gòn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỂ CÁ KOI THỦY SINH ÂM SÀN KÍNH CƯỜNG LỰC (ArtisanSunkenKoiAquariumVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/ArtisanSunkenKoiAquariumVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Dòng Nước Tĩnh Tại Chảy Dưới Từng Bước Chân:
   - Lối đi chính đại sảnh đặt trên bể cá Koi âm sàn 12m³ lót đá cuội sông Đồng Nai. Mặt kính đi bộ 3 lớp dán phim SentryGlas dày 32mm siêu trong Low-Iron chịu tải 800 kg/m². Hệ lọc trống tự động Drum Filter kết hợp lắng vi sinh tĩnh âm thanh dưới 18 dBA, đèn đáy hồ 3000K chiếu rọi đàn cá bơi lượn tĩnh tại.
2. Tính năng kỹ thuật & UI tương tác:
   - Chế độ bước đi trên mặt nước với hiệu ứng gợn sóng tương tác.
   - Bộ chỉ số nước thời gian thực: pH 7.2, Oxy hòa tan 7.8 mg/L, Nhiệt độ 25.5°C.
   - Thử nghiệm độ chịu tải kính và lớp phủ chống trượt nano.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: ĐỒNG HỒ MẶT TRỜI ĐÁ CẨM THẠCH ĐIÊU KHẮC (ArtisanMarbleSundialGardenVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanMarbleSundialGardenVault.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Ghi Dấu Thời Gian Bằng Ánh Nắng Sài Gòn:
   - Khối cẩm thạch trắng Yên Bái nguyên khối tiện gọt tinh xảo đặt giữa vườn đón nắng. Kim đồng thau phay CNC nghiêng chính xác 10.7769° theo vĩ độ TP. Hồ Chí Minh. Mặt đĩa đá khắc thủ công 24 tiết khí phương Đông và bóng nắng di chuyển êm đềm ghi lại từng khoảnh khắc thanh bình (\`GU-SUNDIAL-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng bóng nắng đổ theo từng giờ trong ngày từ bình minh đến hoàng hôn.
   - Bộ chuyển đổi lịch tiết khí cổ truyền sang lịch dương hiện đại.
   - Form tư vấn chế tác điêu khắc đá phong thủy cá nhân hóa.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-39): add SaigonFloatingOrchidAtelier, ArtisanSunkenKoiAquariumVault, and ArtisanMarbleSundialGardenVault with 100% SEO pass'
----------------------------------------------------------------------
`;

async function main() {
  console.log('[MASTER-ORCHESTRATOR] Updating state and preparing Sprint 39 dispatch...');

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed to parse state file:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-37-sprint-39-orchid-koi-sundial',
    title: 'Vườn Lan Treo Không Trọng Lực, Bể Cá Koi Âm Sàn & Đồng Hồ Mặt Trời Đá Cẩm Thạch',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[MASTER-ORCHESTRATOR] State updated to Sprint 39.');

  const child = spawn(
    LANGUAGE_SERVER_EXE,
    ['send-agent-message', '--to', TARGET_ID, '--message', SPRINT_39_DIRECTIVE],
    { stdio: 'inherit' }
  );

  child.on('exit', (code) => {
    console.log(`[MASTER-ORCHESTRATOR] Directive Sprint 39 dispatched with exit code: ${code}`);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('[MASTER-ORCHESTRATOR] Error in dispatch-sprint-39:', err);
  process.exit(1);
});
