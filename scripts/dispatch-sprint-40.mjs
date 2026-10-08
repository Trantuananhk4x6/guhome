import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const TARGET_ID = '2f5ce5fe-ad05-4f10-95a6-3b7c495b4b22';
const LANGUAGE_SERVER_EXE = 'C:\\Users\\Admin\\AppData\\Local\\Programs\\antigravity\\resources\\bin\\language_server.exe';
const STATE_PATH = path.resolve('scripts/master-orchestrator-state.json');

const SPRINT_40_DIRECTIVE = `[MASTER ORCHESTRATOR DIRECTIVE - SPRINT 40: BÀN TRÀ TRẦM HƯƠNG, BỂ SAN HÔ ĐẠI DƯƠNG & XƯỞNG DAO THÉP DAMASCUS]
KTS Trưởng kiêm Kỹ sư trưởng GuHomes (Session ${TARGET_ID}):

Master Orchestrator cùng Elite QA nhiệt liệt chúc mừng thành quả Sprint 39:
- SaigonFloatingOrchidAtelier, ArtisanSunkenKoiAquariumVault, và ArtisanMarbleSundialGardenVault đã hoàn tất 100%, vượt qua toàn bộ 153 routes SEO và production build Next.js với 0 lỗi.
- Toàn bộ các hệ thống vườn lan rừng treo không trọng lực, bể cá Koi âm sàn kính 32mm và đồng hồ mặt trời cẩm thạch Yên Bái đã vận hành hoàn hảo trên nhánh enhaceta!

THEO MỆNH LỆNH VẬN HÀNH XUYÊN ĐÊM PHI GIÁN ĐOẠN, CHÚNG TA TIẾP TỤC TIẾN VÀO SPRINT 40:
"BÀN TRÀ TRẦM HƯƠNG, BỂ SAN HÔ ĐẠI DƯƠNG & XƯỞNG DAO THÉP DAMASCUS"

Mục tiêu cốt lõi: Thiết kế bàn trà độc bản kết hợp trầm hương tự nhiên Khánh Hòa và gỗ mun sừng; chế tác bể san hô nước mặn vi sinh khép kín kính Low-Iron không keo viền; và kiến tạo xưởng dao bếp rèn tay thép Damascus 128 lớp giấu ngầm nam châm vách gỗ.

----------------------------------------------------------------------
TIỂU DỰ ÁN 1: BÀN TRÀ NGHỆ NHÂN TRẦM HƯƠNG VÀ GỖ MUN (SaigonAgarwoodTeaBespokeVault.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/SaigonAgarwoodTeaBespokeVault.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/projects/page.tsx\`:
1. Triết lý Hương Mộc Tĩnh Lặng Khởi Sinh Năng Lượng:
   - Thân bàn kết hợp phiến lũa trầm hương Khánh Hòa tự nhiên tích tụ nhựa thơm quý hiếm và gỗ Mun Sừng đen nhánh bóng bẩy như đá cẩm thạch. Bề mặt khay trà hạ âm rãnh thoát nước bằng đá Nero Marquina vân mây vàng. Hệ thống bếp từ vi gốm điều chỉnh nhiệt độ nước chính xác theo 5 mốc danh trà: 80°C (Lục trà) -> 85°C (Bạch trà) -> 90°C (Ô Long) -> 95°C (Shan Tuyết) -> 100°C (Phổ Nhĩ).
2. Tính năng kỹ thuật & UI tương tác:
   - Bộ chọn nhiệt độ pha trà kỹ thuật số tương tác với thanh đo nhiệt trực quan.
   - Thử nghiệm độ phân bổ nhựa trầm và độ cứng chống xước mặt đá.
   - Mô phỏng khói trầm lan tỏa thoang thoảng khi nhiệt độ bàn trà ấm lên.

----------------------------------------------------------------------
TIỂU DỰ ÁN 2: BỂ SAN HÔ ĐẠI DƯƠNG NANO REEF SỐNG (PrivateSaltwaterNanoReefSanctuary.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/studio/PrivateSaltwaterNanoReefSanctuary.tsx\` và tích hợp vào \`src/app/(site)/studio/page.tsx\`, \`src/app/(site)/phong-cach/page.tsx\` và \`src/app/(site)/du-toan-chi-phi/page.tsx\`:
1. Triết lý Một Đại Dương Thu Nhỏ Giữa Lòng Dinh Thự:
   - Hệ sinh thái rạn san hô sống nước mặn tự cân bằng sinh học vi mô; kính Low-Iron 19mm quang học cắt laser mài bóng cạnh dán keo silicon cấu trúc vô hình. Dải đèn LED quang phổ biển 400-470nm kích thích san hô phát huỳnh quang lộng lẫy về đêm; hệ máy tách bọt Protein Skimmer siêu êm < 20 dBA triệt tiêu hoàn toàn mùi tanh mặn đô thị.
2. Tính năng kỹ thuật & UI tương tác:
   - Bảng chỉ số môi trường biển thời gian thực: Độ mặn 1.025 SG, Canxi 420 ppm, Magie 1350 ppm, Nhiệt độ 25.0°C.
   - Chuyển đổi chế độ ánh sáng: Ánh nắng trưa nhiệt đới -> Hoàng hôn rạn san hô -> Huỳnh quang biển đêm Deep Blue.
   - Trình duyệt bộ sưu tập các loài san hô mềm LPS và SPS thích nghi cao.

----------------------------------------------------------------------
TIỂU DỰ ÁN 3: XƯỞNG DAO BẾP GIA TRUYỀN THÉP DAMASCUS (ArtisanDamascusSteelChefKnifeAtelier.tsx)
----------------------------------------------------------------------
Xây dựng component \`src/components/tools/ArtisanDamascusSteelChefKnifeAtelier.tsx\` và tích hợp vào \`src/app/(site)/du-toan-chi-phi/page.tsx\`, \`src/app/(site)/studio/page.tsx\` và \`src/app/(site)/contact/page.tsx\`:
1. Triết lý Vũ Khí Nghệ Thuật Của Bếp Trưởng Gia Tộc:
   - Bộ 5 dao bếp chế tác từ thép Damascus 128 lớp rèn đập thủ công vân nước chảy mộng mị, độ cứng 62 HRC giữ cạnh bén siêu hạng; cán dao gỗ Mun sừng và ngọc bích nhân tạo may đo vừa vặn lòng bàn tay gia chủ. Giá treo dao từ tính Neodymium giấu kín sau lớp veneer gỗ óc chó; thẻ bảo dưỡng mài bén trọn đời bằng đá nước tự nhiên Kyoto (\`GU-KNIFE-2026-X\`).
2. Tính năng kỹ thuật & UI tương tác:
   - Mô phỏng góc mài dao 15° chuẩn Nhật Bản và độ bén cắt giấy siêu mịn.
   - Bộ tuyển chọn 5 dáng dao chuyên biệt: Gyuto (Đầu bếp đa năng), Santoku (Ba đức tính), Yanagiba (Cắt Sashimi lát mỏng), Nakiri (Thái rau củ), Petty (Gọt tỉa hoa quả).
   - Form đăng ký khắc tên gia chủ và họa tiết phong thủy laser độc bản trên lưỡi dao.

----------------------------------------------------------------------
QUY CHUẨN XÁC THỰC BẮT BUỘC TRƯỚC KHI BÁO CÁO:
1. TypeScript: Chạy 'npx tsc --noEmit' đạt 0 lỗi.
2. Routing & SEO: Chạy 'npx tsx scripts/test-routes-seo.ts' đạt 100% routes PASS.
3. Production Build: Chạy 'npm run build' exit code 0.
4. Cập nhật scripts/master-orchestrator-state.json và commit git trên nhánh enhaceta:
   'feat(sprint-40): add SaigonAgarwoodTeaBespokeVault, PrivateSaltwaterNanoReefSanctuary, and ArtisanDamascusSteelChefKnifeAtelier with 100% SEO pass'
----------------------------------------------------------------------
`;

async function main() {
  console.log('[MASTER-ORCHESTRATOR] Updating state and preparing Sprint 40 dispatch...');

  let state = {};
  if (fs.existsSync(STATE_PATH)) {
    try {
      state = JSON.parse(fs.readFileSync(STATE_PATH, 'utf8'));
    } catch (e) {
      console.error('Failed to parse state file:', e);
    }
  }

  state.activeDirective = {
    directiveId: 'dir-38-sprint-40-agarwood-reef-damascus',
    title: 'Bàn Trà Trầm Hương, Bể San Hô Đại Dương & Xưởng Dao Thép Damascus',
    sentAt: new Date().toISOString(),
    targetAgentId: TARGET_ID
  };

  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2), 'utf8');
  console.log('[MASTER-ORCHESTRATOR] State updated to Sprint 40.');

  const child = spawn(
    LANGUAGE_SERVER_EXE,
    ['send-agent-message', '--to', TARGET_ID, '--message', SPRINT_40_DIRECTIVE],
    { stdio: 'inherit' }
  );

  child.on('exit', (code) => {
    console.log(`[MASTER-ORCHESTRATOR] Directive Sprint 40 dispatched with exit code: ${code}`);
    process.exit(code ?? 0);
  });
}

main().catch((err) => {
  console.error('[MASTER-ORCHESTRATOR] Error in dispatch-sprint-40:', err);
  process.exit(1);
});
