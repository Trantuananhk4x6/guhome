import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_47_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 47: PHÒNG THÍNH ÂM CELLO GỖ THÍCH, MÀN MƯA DÂY XÍCH ĐỒNG KUSARI-TOI & TỦ BÍCH HỌA DÁT VÀNG THƯ PHÁP]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo nghệ thuật cao cấp với Sprint 47:
"PHÒNG THÍNH ÂM CELLO GỖ THÍCH, MÀN MƯA DÂY XÍCH ĐỒNG KUSARI-TOI & TỦ BÍCH HỌA DÁT VÀNG THƯ PHÁP"

Mục tiêu cốt lõi: Thiết kế phòng thính âm chuyên sâu đàn Cello & đàn dây thính phòng vỏ gỗ Thích và Vân Sam Cremona; kiến tạo màn nước mưa rơi tuần hoàn qua xích đồng Kusari-Toi giếng trời thông tầng 12 mét; và chế tác tủ may đo bích họa thếp vàng quỳ 24K thư pháp gia huấn.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG THÍNH ÂM CELLO VÒM GỖ THÍCH (SaigonAcousticCelloListeningVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticCelloListeningVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Dư Ba Trầm Sâu Của Dây Đàn Cello:
   - Phòng thính âm dành riêng cho người yêu nhạc cổ điển với hệ vòm cong tán âm QRD (Quadratic Residue Diffuser) theo tỷ lệ vàng Fibonacci ghép từ gỗ Thích (European Maple) và gỗ Vân Sam (Spruce) chuẩn đàn hòa nhạc; bệ ngồi nghệ sĩ lót phiến đá bazan nguyên khối khử rung chấn; hệ rèm len cừu tự nhiên dệt tay Đà Lạt dày 650g/m² triệt tiêu tạp âm tần số cao; thời gian vang RT60 hoàn hảo 0.38s.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử âm sắc Cello mộc mạc qua Web Audio API: Bach Cello Suite No. 1 in G Major (Prelude), The Swan (Saint-Saëns).
   - Biểu đồ phân tích phổ tần số cộng hưởng 65Hz - 1000Hz của thùng đàn Cello.
   - Điều khiển kịch bản chiếu sáng thính phòng: Ánh nến Hổ Phách 2000K, Rọi Điểm Soloist CRI 99 2700K, Dạ Tiệc Thính Phòng 3000K.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: MÀN MƯA XÍCH ĐỒNG KUSARI-TOI GIẾNG TRỜI (SaigonRainwaterCascadeAtriumSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonRainwaterCascadeAtriumSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Giọt Nước Thanh Âm Tẩy Rửa Tâm Hồn:
   - Giếng trời thông tầng 4 tầng biệt thự trang bị cụm 7 dây xích đồng thau nguyên chất Kusari-Toi thả từ mái kính xuống hồ sỏi sông Đồng Nai; hệ thống thu gom và tuần hoàn nước mưa tự nhiên qua lọc cát thạch anh, than gáo dừa hoạt tính và đèn diệt khuẩn UV-C; dòng nước róc rách làm dịu nhiệt độ tâm nhà giảm ngay 3-5°C; âm thanh nước chảy tự nhiên đạt mức thư thái 22 dBA.
2. Tính năng kỹ thuật & UI tương tác:
   - Điều khiển 3 lưu lượng dòng nước: Mưa Phùn Mùa Xuân (Sương nhẹ), Mưa Rào Mùa Hạ Dịu Dàng (Tuần hoàn êm), Thác Đổ Thiền Định (Thanh tẩy).
   - Mô phỏng âm thanh tiếng nước chảy róc rách qua Web Audio API.
   - Bảng theo dõi nhiệt độ vi khí hậu giảm nhiệt và độ ẩm cân bằng tự nhiên.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: TỦ BÍCH HỌA DÁT VÀNG QUỲ THƯ PHÁP GIA HUẤN (ArtisanGoldLeafCalligraphyCabinetryAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanGoldLeafCalligraphyCabinetryAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Nếp Nhà Trọng Đạo - Chữ Vàng Truyền Đời:
   - Hệ tủ may đo gỗ Gụ lau nguyên khối chạm khắc chìm thủ công và thếp vàng quỳ 24K Kiêu Kỵ các tác phẩm thư pháp chữ Quốc ngữ hoặc Hán tự (Gia Hòa Vạn Sự Hưng, Tĩnh Tâm Dưỡng Khí, Tri Túc); phụ kiện tay nắm đồng đúc nguyên khối hình mây cuốn cổ điển; ngăn bí mật âm hồi khóa bằng mộng trượt ẩn không dùng then kim loại (\`GU-CALLIG-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ chọn tác phẩm thư pháp dát vàng với hiệu ứng phản xạ ánh sáng vàng quỳ lấp lánh dưới góc nghiêng.
   - Kính phóng đại 15x soi chi tiết thớ gỗ Gụ lau và lớp vàng lá 24K thủ công.
   - Form tư vấn may đo khắc gia huấn và châm ngôn cá nhân hóa cho từng gia tộc.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-47): add SaigonAcousticCelloListeningVault, SaigonRainwaterCascadeAtriumSanctuary, and ArtisanGoldLeafCalligraphyCabinetryAtelier with 100% SEO pass'
`;

async function dispatchSprint47() {
  console.log(`[Master Orchestrator] Dispatching Sprint 47 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-45-sprint-47-cello-kusaritoi-goldcalligraphy',
    title: 'Phòng Thính Âm Cello, Màn Mưa Xích Đồng Kusari-Toi & Tủ Thư Pháp Dát Vàng',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 47 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_47_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint47();
