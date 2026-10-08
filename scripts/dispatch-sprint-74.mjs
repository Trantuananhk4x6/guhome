import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_74_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 74: THÍNH PHÒNG MANDOLIN VÒM BÁCH XANH, HỒ CÁ KOI ĐÁY KÍNH XUYÊN TẦNG & TRÁP TRANG SỨC SỪNG TRÂU CẨN XÀ CỪ]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session \${TARGET_ID}):

Master Orchestrator cùng Elite QA ghi nhận và biểu dương kết quả xuất sắc của Sprint 73. Tiếp tục chuỗi sáng tạo tinh hoa không ngừng nghỉ, phát lệnh SPRINT 74:
"THÍNH PHÒNG MANDOLIN VÒM BÁCH XANH, HỒ CÁ KOI ĐÁY KÍNH XUYÊN TẦNG & TRÁP TRANG SỨC SỪNG TRÂU CẨN XÀ CỪ"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm đàn Mandolin 8 dây vòm gỗ Bách Xanh Tây Bắc âm học RT60 = 0.32s; kiến tạo sân trong hồ cá Koi ngắm trăng đáy kính xuyên tầng 38mm hạ nhiệt vi khí hậu 4.6°C đón gió sông Sài Gòn; và chế tác tráp trang sức hoàng gia sừng trâu nước luộc dầu thảo mộc cẩn xà cừ Tam Khôi ốc đỏ Singapore lót lụa tơ tằm Vạn Phúc.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: THÍNH PHÒNG MANDOLIN VÒM BÁCH XANH (SaigonAcousticMandolinSanctuarySalon.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticMandolinSanctuarySalon.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Âm Sắc Dây Đôi Mandolin & Hương Thơm Bách Xanh Tự Nhiên:
   - Đại thính phòng hòa âm đàn Mandolin Neapolitan lưng quả lê 24 nan ghép tinh xảo và Mandolin chạm vòm F-hole; soundboard gỗ Thông Đỏ Lang Biang xẻ xốp chọn lọc; nan vòm tán âm gỗ Bách Xanh Mộc Châu tỏa hương thơm tinh dầu tự nhiên xua đuổi côn trùng và khử ẩm mốc; thời gian vang RT60 = 0.32s; hệ tủ vi khí hậu 50% RH bảo tồn độ căng dây và keo da thú tự nhiên.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe trích đoạn kinh điển: Vivaldi Mandolin Concerto RV 532, Santa Lucia, O Sole Mio qua Web Audio API.
   - Bảng 8 dây đàn (4 cặp dây kép G3-D4-A4-E5) tương tác cho phép vuốt phím phát chuỗi tremolo dồn dập đặc trưng.
   - Điều khiển 3 kịch bản ánh sáng thính phòng hoàng hôn sông Sài Gòn (2200K, 2700K, 1800K).

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: HỒ CÁ KOI ĐÁY KÍNH XUYÊN TẦNG (SaigonCanalSideGlassBottomKoiCourtyard.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonCanalSideGlassBottomKoiCourtyard.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Thủy Cảnh Xuyên Tầng & Vi Khí Hậu Sông Nước Nam Bộ:
   - Hồ cá Koi ngắm trăng ngoài sân trong với đáy kính cường lực 3 lớp Low-E dày 38mm trong suốt nhìn thẳng xuống sảnh tiếp khách hoặc hầm rượu ngầm; thác nước bậc thang đá hoa cương Gia Lai mài bóng xả bọt mịn tuần hoàn sinh học 120m³/h tạo dưỡng khí oxy dồi dào; rãnh đón gió sông Sài Gòn luân chuyển khí tươi hạ nhiệt vi khí hậu 4.6°C, triệt ẩm nồm sàn tầng trệt; hệ vi lọc Drum Filter kết hợp dàn lọc Bakki Shower than hoạt tính gáo dừa Bến Tre.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình hiển thị trực quan mặt cắt xuyên tầng: tầng hồ cá lộ thiên và góc nhìn ngửa từ hầm rượu ngầm ngắm đàn Koi bơi lội dưới ánh trăng.
   - Bộ theo dõi chỉ số thủy sinh và vi khí hậu: Nhiệt độ nước 24.5°C, pH 7.2, DO 8.5mg/L, giảm nhiệt độ không gian 4.6°C.
   - Web Audio tiếng nước suối thác tràn róc rách kết hợp tiếng cá Koi đớp mồi êm dịu 30dB.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: TRÁP TRANG SỨC SỪNG TRÂU CẨN XÀ CỪ (ArtisanHornMotherOfPearlJewelryChestAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanHornMotherOfPearlJewelryChestAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Nghệ Thuật Ngự Dụng Sừng Trâu & Lụa Tơ Tằm Cung Đình:
   - Hộp trang sức chế tác từ các phiến sừng trâu nước luộc trong tinh dầu hồi quế 7 ngày để uốn phẳng; cẩn xà cừ Tam Khôi ốc đỏ Singapore sắc cầu vồng óng ả họa tiết "Tứ Quý Trúc Mai Bình An"; bản lề và tay nắm bằng bạc ta 999 đúc tay nguyên khối; lòng tráp lót 3 tầng nhung lụa tơ tằm Vạn Phúc dệt hoa văn mây tía chống trầy xước ngọc ngà châu báu; ổ khóa ngầm bằng đồng thau chạm khắc hoa mai triều Nguyễn (\`GU-JEWELRY-CHEST-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Kính soi cận cảnh hoa văn xà cừ ngũ sắc dưới góc chiếu ánh sáng xoay vòng 360 độ.
   - Mô phỏng cơ cấu đóng mở nắp tráp êm ái với bản lề giảm chấn bạc đúc.
   - Form cá nhân hóa: Chọn kích cỡ (Khuê Các / Hoàng Gia / Đại Triều), khắc gia huy chìm hoặc tên chủ nhân cẩn chỉ bạc.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi (lưu ý array indexing type assertion khi noUncheckedIndexedAccess bật).
2. Typography Quiet Luxury: Tuyệt đối không dùng em-dash '—' (dùng '-'), không dùng en-dash '–' trong khoảng số.
3. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS (153/153 routes).
4. Production Build: Chạy 'npm run build' (next build --webpack) exit code 0.
5. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-74): add SaigonAcousticMandolinSanctuarySalon, SaigonCanalSideGlassBottomKoiCourtyard, and ArtisanHornMotherOfPearlJewelryChestAtelier with 100% SEO pass'
`;

async function dispatchSprint74() {
  console.log(`[Master Orchestrator] Dispatching Sprint 74 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-72-sprint-74-mandolin-glasskoi-jewelrychest',
    title: 'Thính Phòng Mandolin Vòm Bách Xanh, Hồ Cá Koi Đáy Kính Xuyên Tầng & Tráp Trang Sức Sừng Trâu Cẩn Xà Cừ',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 74 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_74_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint74();
