import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_52_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 52: PHÒNG HÒA ÂM TIÊU SÁO TRÚC, XƯỞNG DỆT LỤA TƠ SEN & CHIÊNG ĐỒNG NĂNG LƯỢNG 432HZ]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA tiếp tục mở rộng chuỗi sáng tạo tinh hoa với Sprint 52:
"PHÒNG HÒA ÂM TIÊU SÁO TRÚC, XƯỞNG DỆT LỤA TƠ SEN & CHIÊNG ĐỒNG NĂNG LƯỢNG 432HZ"

Mục tiêu cốt lõi: Thiết kế phòng hòa âm tiêu sáo trúc bản địa vách tre hun khói và đá ong xám Đồng Nai; kiến tạo xưởng khung dệt lụa tơ sen và Lãnh Mỹ A mặc nưa thủ công khung gỗ Gõ Đỏ; và chế tác chiêng đồng phong thủy Tây Nguyên âm vang tần số 432Hz kích hoạt sóng não Theta.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: PHÒNG HÒA ÂM TIÊU SÁO TRÚC BẢN ĐỊA (SaigonAcousticFluteSanctuaryPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAcousticFluteSanctuaryPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Thanh Khí Ngân Vang Rừng Trúc:
   - Phòng hòa âm tiêu sáo với hệ vách ốp nan tre hun khói xử lý vi sinh chống mọt tự nhiên kết hợp phiến đá ong xám Đồng Nai tiêu âm dải cao gắt; gương âm học parabol tập trung luồng âm thanh trong trẻo; thời gian vang RT60 = 0.34s; tủ kính trưng bày bảo quản các tiêu bản sáo trúc bản địa, tiêu bát khổng và sáo Shakuhachi kiểm soát độ ẩm 55% RH tránh nứt thân trúc.
2. Tính năng kỹ thuật & UI tương tác:
   - Trình nghe thử âm sắc sáo trúc thanh thoát ngũ cung qua Web Audio API.
   - Biểu đồ phân tích dạng sóng âm mộc và độ tinh khiết hài âm.
   - Điều khiển 3 kịch bản ánh sáng thiền tịnh rọi điểm tiêu sáo.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: XƯỞNG KHUNG DỆT LỤA TƠ SEN THỦ CÔNG (SaigonArtisanBespokeLoomSilkPavilion.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonArtisanBespokeLoomSilkPavilion.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Tinh Hoa Sợi Tơ - Tinh Túy Đất Trời:
   - Không gian bảo tồn kỹ nghệ dệt lụa truyền thống với khung cửi may đo gỗ Gõ Đỏ nguyên khối đánh bóng sáp ong tự nhiên; nơi dệt các tấm vải bọc nội thất và rèm cửa từ tơ sen Đồng Tháp Mười và lụa Lãnh Mỹ A nhuộm mủ mặc nưa trứ danh Tân Châu; hệ chiếu sáng rọi sợi 5000K CRI 99 hiển thị trung thực độ óng ánh của từng sợi tơ.
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng con thoi dệt lụa lướt nhịp nhàng qua lại kèm âm thanh lách cách êm ái.
   - Bộ sưu tập 4 chất liệu tơ lụa quý hiếm (Tơ Sen Tháp Mười, Lãnh Mỹ A, Tơ Tằm Hà Đông, Đũi Nam Cao).
   - Form đặt dệt mẫu vải may đo độc bản cho dinh thự.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: CHIÊNG ĐỒNG NĂNG LƯỢNG SÓNG NÃO 432HZ (ArtisanBronzeWindGongSanctuaryAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanBronzeWindGongSanctuaryAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Âm Thanh Vũ Trụ Tái Tạo Năng Lượng Sinh Học:
   - Tác phẩm chiêng đồng đúc thủ công theo bí truyền Tây Nguyên từ đồng mắt cua và thiếc vàng; được cân chỉnh âm học chính xác ở tần số chữa lành 432Hz kích hoạt trạng thái sóng não Theta; giá treo gỗ Cẩm Lai uốn cong tự nhiên kết hợp dây thừng bện xơ dừa cổ truyền; dùi gõ bọc da hươu mềm tạo độ ngân vang sâu lắng kéo dài trên 90 giây (\`GU-GONG-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Trình gõ thử chiêng đồng phát âm vang 432Hz với hiệu ứng ngân rung dài lâu qua Web Audio API.
   - Biểu đồ phân tích phổ tần số cộng hưởng sóng não Theta (4-8 Hz) và Alpha.
   - Form tư vấn chọn kích thước chiêng và hoa văn phong thủy riêng biệt.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-52): add SaigonAcousticFluteSanctuaryPavilion, SaigonArtisanBespokeLoomSilkPavilion, and ArtisanBronzeWindGongSanctuaryAtelier with 100% SEO pass'
`;

async function dispatchSprint52() {
  console.log(`[Master Orchestrator] Dispatching Sprint 52 to Agent ${TARGET_ID}...`);

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
    } catch (e) {
      console.error('Error reading state:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-50-sprint-52-flute-silkom-gong',
    title: 'Phòng Tiêu Sáo Trúc, Khung Dệt Tơ Sen & Chiêng Đồng Năng Lượng 432Hz',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf-8');
  console.log('[Master Orchestrator] State updated with Sprint 52 directive.');

  const proc = spawn(LANGUAGE_SERVER_EXE, [
    'send-message',
    '--recipient', TARGET_ID,
    '--message', SPRINT_52_DIRECTIVE
  ], { stdio: 'inherit', shell: true });

  proc.on('close', (code) => {
    console.log(`[Master Orchestrator] Language server send-message exited with code: ${code}`);
  });
}

dispatchSprint52();
