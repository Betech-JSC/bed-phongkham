<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServicePillar;
use App\Models\Service;

class CardiologyServicesSeeder extends Seeder
{
    /**
     * Run the database seeds for Cardiology Services & Pillars.
     */
    public function run(): void
    {
        // Xóa sạch dịch vụ cũ để đảm bảo dữ liệu chuẩn xác 17 dịch vụ từ file DOCX
        Service::query()->delete();
        // -------------------------------------------------------------
        // TRỤ CỘT I: TẦM SOÁT – PHÁT HIỆN SỚM BỆNH TIM MẠCH
        // -------------------------------------------------------------
        $pillar1 = ServicePillar::updateOrCreate(
            ['id' => 1],
            [
                'title' => 'Trụ cột I: Tầm soát & Phát hiện sớm',
                'tagline' => 'Phát hiện sớm - Phòng ngừa biến chứng',
                'description' => 'Phát hiện sớm bệnh tim mạch và các yếu tố nguy cơ trước khi có biến chứng lâm sàng xảy ra.',
                'icon_name' => 'Search',
                'order' => 1,
            ]
        );

        $servicesP1 = [
            [
                'slug' => 'kham-tim-mach-tong-quat',
                'title' => 'Khám tim mạch tổng quát',
                'pillar_title' => 'Tầm soát & Phát hiện sớm',
                'tagline' => 'Đánh giá sức khỏe trái tim toàn diện',
                'description' => 'Khám lâm sàng chuyên khoa kết hợp các chỉ số sinh hóa và chẩn đoán hình ảnh để tầm soát tổng thể sức khỏe tim mạch.',
                'detailed_description' => 'Gói khám tim mạch tổng quát cung cấp giải pháp tầm soát toàn diện cho hệ tuần hoàn. Phối hợp giữa khám lâm sàng trực tiếp bởi bác sĩ chuyên khoa với trang thiết bị cận lâm sàng hiện đại giúp phát hiện sớm nguy cơ suy tim, bệnh van tim, xơ vữa động mạch và đột quỵ.',
                'includes' => [
                    'Khám chuyên khoa Tim mạch',
                    'Đo huyết áp chuẩn hóa',
                    'Đo BMI, vòng bụng',
                    'Điện tim (ECG) 12 đầu cần',
                    'Siêu âm tim Doppler màu',
                    'Xét nghiệm sinh hóa máu cần thiết (Mỡ máu, Đường huyết, Chức năng gan thận)',
                    'Đánh giá nguy cơ tim mạch tổng thể',
                    'Tư vấn dự phòng bệnh, theo dõi điều trị lâu dài'
                ],
                'candidates' => [
                    'Người ≥35 tuổi cần tầm soát định kỳ',
                    'Người chưa từng khám tim bao giờ',
                    'Bệnh nhân chuẩn bị phẫu thuật lớn',
                    'Người khám sức khỏe định kỳ',
                    'Người có các bệnh lý nền (Đái tháo đường, mỡ máu...)',
                    'Người có tiền sử gia đình mắc bệnh tim mạch hoặc đột quỵ'
                ],
                'price' => '500.000 VNĐ - 1.200.000 VNĐ',
                'estimated_time' => '60 - 90 phút',
                'is_featured' => true,
            ],
            [
                'slug' => 'tam-soat-tang-huyet-ap',
                'title' => 'Tầm soát tăng huyết áp',
                'pillar_title' => 'Tầm soát & Phát hiện sớm',
                'tagline' => 'Phát hiện sớm kẻ giết người thầm lặng',
                'description' => 'Đánh giá chi tiết các chỉ số huyết áp để xác định tình trạng huyết áp dao động hoặc tăng huyết áp ẩn giấu.',
                'detailed_description' => 'Tăng huyết áp hầu như không có triệu chứng rõ ràng. Dịch vụ tầm soát giúp đo lường chuẩn xác, phát hiện sớm tình trạng tăng huyết áp ẩn giấu hoặc tăng huyết áp áo choàng trắng để đưa ra phác đồ phòng ngừa sớm nhất.',
                'includes' => [
                    'Khám lâm sàng tim mạch',
                    'Đo huyết áp chuẩn y khoa',
                    'Đo điện tâm đồ (ECG)',
                    'Holter huyết áp khi có chỉ định',
                    'Xét nghiệm cận lâm sàng cần thiết',
                    'Tư vấn chế độ ăn uống, sinh hoạt và phác đồ theo dõi'
                ],
                'candidates' => [
                    'Người huyết áp dao động thất thường',
                    'Người trên 40 tuổi',
                    'Người béo phì, thừa cân',
                    'Người rối loạn chuyển hóa',
                    'Người bệnh đái tháo đường',
                    'Gia đình có người bị tăng huyết áp'
                ],
                'price' => '350.000 VNĐ',
                'estimated_time' => '45 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'tam-soat-nhoi-mau-co-tim',
                'title' => 'Tầm soát nguy cơ nhồi máu cơ tim',
                'pillar_title' => 'Tầm soát & Phát hiện sớm',
                'tagline' => 'Chủ động phòng ngừa biến cố mạch vành',
                'description' => 'Đánh giá nguy cơ hẹp tắc mạch vành và xơ vữa động mạch gây thiếu máu cơ tim cấp tính.',
                'detailed_description' => 'Nhồi máu cơ tim xảy ra khi mạch máu nuôi tim bị tắc nghẽn do mảng xơ vữa hoặc cục máu đông. Gói tầm soát này được thiết kế để phát hiện sớm tình trạng xơ vữa động mạch vành và thiếu máu cơ tim tiềm ẩn, ngăn ngừa đột quỵ tim cấp tính.',
                'includes' => [
                    'Khám chuyên khoa tim mạch',
                    'Điện tâm đồ (ECG) phát hiện thiếu máu cơ tim',
                    'Siêu âm tim đánh giá chức năng co bóp cơ tim',
                    'Xét nghiệm bộ mỡ máu chuyên sâu (LDL-C, Cholesterol, Triglyceride, HDL-C)',
                    'Các xét nghiệm sinh hóa & men tim cần thiết',
                    'Đánh giá nguy cơ tim mạch & Lập kế hoạch dự phòng'
                ],
                'candidates' => [
                    'Nam >40 tuổi, Nữ >50 tuổi',
                    'Người thường xuyên hút thuốc lá',
                    'Người thừa cân, béo phì',
                    'Người mắc bệnh đái tháo đường',
                    'Người rối loạn lipid máu',
                    'Người có bệnh lý nền tim mạch'
                ],
                'price' => '600.000 VNĐ',
                'estimated_time' => '60 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'tam-soat-dot-quy',
                'title' => 'Tầm soát nguy cơ đột quỵ',
                'pillar_title' => 'Tầm soát & Phát hiện sớm',
                'tagline' => 'Bảo vệ não bộ khỏi biến cố mạch máu',
                'description' => 'Tầm soát các yếu tố nguy cơ tai biến mạch máu脑 xuất phát từ tim mạch như rung nhĩ, xơ vữa động mạch, tăng huyết áp.',
                'detailed_description' => 'Đột quỵ脑 hoàn toàn có thể phòng ngừa nếu kiểm soát tốt các yếu tố nguy cơ lớn như rung nhĩ, huyết áp cao và xơ vữa mạch máu. Chương trình tầm soát giúp phát hiện nguy cơ hình thành cục máu đông và tổn thương mạch máu kịp thời.',
                'includes' => [
                    'Khám chuyên khoa tim mạch',
                    'Điện tâm đồ (ECG) tầm soát loạn nhịp tim',
                    'Siêu âm tim Doppler kiểm tra dòng máu và van tim',
                    'Holter ECG (nếu nghi ngờ rối loạn nhịp kịch phát)',
                    'Holter huyết áp (nếu có chỉ định)',
                    'Phối hợp chụp MRI sọ não',
                    'Xét nghiệm máu & Đánh giá thang điểm nguy cơ đột quỵ',
                    'Tư vấn phác đồ dự phòng biến cố'
                ],
                'candidates' => [
                    'Người bị Rung nhĩ hoặc nghi ngờ rối loạn nhịp',
                    'Bệnh nhân Tăng huyết áp',
                    'Bệnh nhân Bệnh mạch vành',
                    'Bệnh nhân Suy tim',
                    'Bệnh nhân Đái tháo đường',
                    'Người cao tuổi (trên 60 tuổi)',
                    'Người rối loạn chuyển hóa lipid',
                    'Người hút thuốc lá lâu năm'
                ],
                'price' => '800.000 VNĐ',
                'estimated_time' => '75 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'tam-soat-roi-loan-nhip-tim',
                'title' => 'Tầm soát rối loạn nhịp tim',
                'pillar_title' => 'Tầm soát & Phát hiện sớm',
                'tagline' => 'Định vị và xử lý các nhịp đập bất thường',
                'description' => 'Phát hiện các cơn nhịp tim nhanh, nhịp chậm, ngoại tâm thu hoặc rối loạn dẫn truyền điện học của tim.',
                'detailed_description' => 'Rối loạn nhịp tim gây ra hồi hộp, hụt hẫng, choáng váng, ngất xỉu hoặc thậm chí đột tử. Tầm soát rối loạn nhịp tim giúp kết luận chính xác nguyên nhân gây loạn nhịp và đưa ra hướng điều trị phù hợp nhất.',
                'includes' => [
                    'Khám lâm sàng tim mạch',
                    'Đo điện tâm đồ (ECG)',
                    'Holter điện tim theo dõi (nếu cần thiết)',
                    'Siêu âm tim kiểm tra cấu trúc cơ tim',
                    'Xét nghiệm điện giải & chức năng tuyến giáp khi cần',
                    'Kết luận nguyên nhân rối loạn nhịp',
                    'Tư vấn dự phòng và phác đồ điều trị lâu dài'
                ],
                'candidates' => [
                    'Người có triệu chứng cảnh báo: Hồi hộp, đánh trống ngực, hụt nhịp, đau ngực không rõ nguyên nhân, mệt mỏi, khó thở, chóng mặt, ngất xỉu',
                    'Người có bệnh lý nền: Tăng huyết áp, mỡ máu cao, đái tháo đường, bệnh mạch vành, suy tim, cường giáp, ngưng thở khi ngủ',
                    'Yếu tố nguy cơ & Lối sống: Người cao tuổi (≥60 tuổi), béo phì, hút thuốc, rượu bia, căng thẳng mãn tính',
                    'Tiền sử gia đình: Có người thân bị rối loạn nhịp tim, đột quỵ hoặc đột tử'
                ],
                'price' => '450.000 VNĐ',
                'estimated_time' => '60 phút',
                'is_featured' => false,
            ],
        ];

        foreach ($servicesP1 as $srv) {
            Service::updateOrCreate(
                ['slug' => $srv['slug']],
                array_merge($srv, [
                    'service_pillar_id' => $pillar1->id,
                    'pillar_title' => $pillar1->title,
                ])
            );
        }

        // -------------------------------------------------------------
        // TRỤ CỘT II: ĐIỀU TRỊ – QUẢN LÝ LIÊN TỤC
        // -------------------------------------------------------------
        $pillar2 = ServicePillar::updateOrCreate(
            ['id' => 2],
            [
                'title' => 'Trụ cột II: Điều trị & Quản lý liên tục',
                'tagline' => 'Đồng hành chuyên sâu - Kiểm soát mãn tính',
                'description' => 'Quản lý và điều trị chuyên sâu, liên tục các bệnh lý tim mạch mãn tính tại địa phương.',
                'icon_name' => 'Stethoscope',
                'order' => 2,
            ]
        );

        $servicesP2 = [
            [
                'slug' => 'quan-ly-tang-huyet-ap',
                'title' => 'Quản lý & điều trị Tăng huyết áp',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Kiểm soát an toàn, phòng ngừa đột quỵ',
                'description' => 'Điều chỉnh liều thuốc huyết áp tối ưu và theo dõi sát sao chỉ số để tránh biến chứng đột quỵ, suy tim, suy thận.',
                'detailed_description' => 'Tăng huyết áp đòi hỏi việc quản lý liên tục. Chương trình giúp cá thể hóa phác đồ điều trị, lựa chọn thuốc tối ưu theo khuyến cáo y khoa cập nhật, đảm bảo huyết áp đạt mục tiêu an toàn lâu dài.',
                'includes' => [
                    'Khám định kỳ chuyên khoa tim mạch',
                    'Đo điện tâm đồ (ECG) kiểm tra biến chứng cơ tim',
                    'Holter huyết áp khi có chỉ định',
                    'Điều chỉnh và phối hợp thuốc hạ áp tối ưu',
                    'Xét nghiệm khi cần (chức năng thận, điện giải máu)',
                    'Theo dõi chỉ số huyết áp liên tục & Nhắc lịch tái khám'
                ],
                'candidates' => [
                    'Mới phát hiện tăng huyết áp cần dò liều',
                    'Đang điều trị tăng huyết áp nhưng chỉ số chưa ổn định',
                    'Huyết áp dao động thất thường kèm nhiều bệnh nền'
                ],
                'price' => '300.000 VNĐ / lần khám',
                'estimated_time' => '30 - 45 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-roi-loan-lipid-mau',
                'title' => 'Quản lý Rối loạn lipid máu (Mỡ máu)',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Dọn dẹp mảng xơ vữa trong lòng mạch',
                'description' => 'Kiểm soát ngặt nghèo các chỉ số mỡ xấu (LDL-C, Triglyceride) để phòng ngừa và làm chậm tiến triển xơ vữa động mạch.',
                'detailed_description' => 'Rối loạn mỡ máu dẫn đến mảng xơ vữa làm hẹp lòng mạch. Chương trình quản lý lipid máu kết hợp xét nghiệm định kỳ, điều trị thuốc statin/ezetimibe tối ưu và theo dõi tác dụng phụ của thuốc nghiêm ngặt.',
                'includes' => [
                    'Khám chuyên khoa tim mạch',
                    'Xét nghiệm định kỳ các chỉ số mỡ máu (Cholesterol toàn phần, Triglyceride, LDL-C, HDL-C)',
                    'Điều chỉnh liều thuốc điều trị rối loạn lipid máu',
                    'Theo dõi men gan (AST/ALT) và theo dõi tác dụng phụ khác',
                    'Theo dõi hiệu quả điều trị đạt LDL-C mục tiêu'
                ],
                'candidates' => [
                    'Nhóm có nguy cơ tim mạch cao: Đã từng nhồi máu cơ tim, đột quỵ, thiếu máu cơ tim, can thiệp mạch vành; người mắc đái tháo đường, tăng huyết áp, bệnh thận mạn; tăng cholesterol gia đình',
                    'Nhóm có nguyên nhân thứ phát: Hội chứng chuyển hóa, béo phì, suy giáp, hội chứng thận hư, xơ gan mật, lối sống kém lành mạnh'
                ],
                'price' => '350.000 VNĐ / lần khám',
                'estimated_time' => '30 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-roi-loan-nhip',
                'title' => 'Quản lý Rối loạn nhịp tim',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Kiểm soát nhịp tim, an tâm vui sống',
                'description' => 'Theo dõi và kiểm soát nhịp tim cho bệnh nhân mắc các bệnh lý rối loạn nhịp mãn tính hoặc sau can thiệp.',
                'detailed_description' => 'Bệnh nhân rối loạn nhịp cần được quản lý nhịp tim và dùng thuốc chống loạn nhịp/kháng đông đúng liều lượng nhằm ngăn ngừa nguy cơ hình thành huyết khối, đột quỵ hoặc suy tim tiến triển.',
                'includes' => [
                    'Đo điện tâm đồ (ECG) định kỳ',
                    'Đo Holter điện tim đánh giá tần số và hình thái nhịp',
                    'Xét nghiệm cận lâm sàng kiểm tra khi cần',
                    'Điều chỉnh liều thuốc chống loạn nhịp và kháng đông',
                    'Theo dõi định kỳ và đánh giá nguy cơ tái phát'
                ],
                'candidates' => [
                    'Người mắc các bệnh lý tim: Bệnh cơ tim, thiếu máu cục bộ, bệnh tim bẩm sinh, đã từng phẫu thuật tim',
                    'Người cao tuổi bị suy giảm hệ thống dẫn truyền điện của tim',
                    'Bệnh nhân mắc bệnh mãn tính: Tăng huyết áp, đái tháo đường, bệnh tuyến giáp (cường giáp)',
                    'Người có lối sống hút thuốc, lạm dụng chất kích thích',
                    'Tiền sử gia đình có người mắc rối loạn nhịp tim hoặc đột tử'
                ],
                'price' => '400.000 VNĐ / lần khám',
                'estimated_time' => '45 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-sau-dat-stent-can-thiep-tim-mach',
                'title' => 'Quản lý sau đặt stent & can thiệp tim mạch',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Phục hồi tối ưu, ngăn ngừa tái hẹp stent',
                'description' => 'Theo dõi chuyên sâu cho bệnh nhân sau đặt stent mạch vành, phẫu thuật tim nhằm chống tái hẹp và phòng ngừa biến cố.',
                'detailed_description' => 'Sau khi đặt stent hoặc phẫu thuật tim, bệnh nhân cần tuân thủ nghiêm ngặt phác đồ kháng tiểu cầu đôi và kiểm soát tốt các yếu tố nguy cơ để giữ stent luôn thông suốt, tránh tái phát nhồi máu cơ tim.',
                'includes' => [
                    'Khám chuyên khoa tim mạch tái khám',
                    'Điện tim (ECG) kiểm tra tưới máu cơ tim',
                    'Siêu âm tim đánh giá chức năng thất và van tim',
                    'Xét nghiệm máu kiểm tra chức năng đông máu, mỡ máu, chức năng thận',
                    'Điều chỉnh thuốc (kháng tiểu cầu, statin, hạ áp)',
                    'Theo dõi nguy cơ tái phát và phục hồi chức năng tim mạch'
                ],
                'candidates' => [
                    'Bệnh nhân sau can thiệp mạch vành (đặt stent)',
                    'Bệnh nhân sau biến cố nhồi máu cơ tim cấp',
                    'Bệnh nhân sau mổ thay van tim hoặc phẫu thuật bắc cầu mạch vành'
                ],
                'price' => '500.000 VNĐ / lần khám',
                'estimated_time' => '45 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-suy-tim',
                'title' => 'Quản lý suy tim chuyên sâu',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Tăng sức bền cơ tim, cải thiện chất lượng sống',
                'description' => 'Theo dõi sát sao chỉ số co bóp cơ tim, cân nặng, tình trạng dịch ứ đọng và tối ưu hóa phác đồ điều trị suy tim nền tảng.',
                'detailed_description' => 'Phác đồ phối hợp thuốc tối ưu trong điều trị suy tim giúp cải thiện triệu chứng khó thở, giảm tỷ lệ nhập viện cấp cứu và kéo dài tuổi thọ cho bệnh nhân suy tim mãn tính.',
                'includes' => [
                    'Khám lâm sàng kiểm tra các dấu hiệu ứ dịch (phù chân, khó thở, tĩnh mạch cổ)',
                    'Siêu âm tim định kỳ đo phân suất tống máu (EF)',
                    'Điện tâm đồ (ECG)',
                    'Xét nghiệm máu (chức năng thận, điện giải đồ, men tim)',
                    'Điều chỉnh thuốc theo khuyến cáo điều trị suy tim mới nhất',
                    'Theo dõi cân nặng và tư vấn lượng nước, muối đưa vào hàng ngày'
                ],
                'candidates' => [
                    'Suy tim EF giảm (HFrEF), EF bảo tồn (HFpEF)',
                    'Bệnh nhân suy tim mạn tính cần ổn định phác đồ điều trị',
                    'Bệnh nhân suy tim do tăng huyết áp, bệnh mạch vành hoặc bệnh cơ tim'
                ],
                'price' => '400.000 VNĐ / lần khám',
                'estimated_time' => '45 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-nguy-co-tim-mach-dai-thao-duong',
                'title' => 'Quản lý nguy cơ tim mạch ở bệnh nhân đái tháo đường',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Bảo vệ kép Tim & Thận toàn diện',
                'description' => 'Tập trung quản lý và giảm thiểu biến cố nhồi máu cơ tim, đột quỵ, suy tim và suy thận ở người bệnh tiểu đường.',
                'detailed_description' => 'Phần lớn bệnh nhân đái tháo đường gặp biến cố tử vong do bệnh tim mạch. Chương trình không thay thế bác sĩ nội tiết mà tập trung phối hợp tối ưu hóa các nhóm thuốc có lợi ích bảo vệ tim và thận cho bệnh nhân tiểu đường.',
                'includes' => [
                    'Đánh giá ban đầu: Khám chuyên khoa tim mạch, Đánh giá nguy cơ tim mạch tổng thể, Điện tim, Siêu âm tim (Holter điện tim/huyết áp nếu cần)',
                    'Xét nghiệm định kỳ: HbA1c, Đường huyết, Mỡ máu, Creatinin, eGFR, Albumin niệu (ACR), Điện giải, Acid uric',
                    'Theo dõi liên tục: Huyết áp, Cân nặng, Vòng bụng, Tuân thủ thuốc, Lối sống, Mục tiêu LDL-C, Mục tiêu Huyết áp, Mục tiêu HbA1c',
                    'Phối hợp điều trị: Phối hợp với bác sĩ Nội tiết, Đánh giá chỉ định các thuốc có lợi ích tim mạch, Điều chỉnh thuốc tim mạch & kiểm soát yếu tố nguy cơ'
                ],
                'candidates' => [
                    'Đái tháo đường type 2 mới phát hiện',
                    'Đái tháo đường đang điều trị tại các phòng khám nội tiết',
                    'Tiền đái tháo đường có nhiều yếu tố nguy cơ',
                    'Đái tháo đường kèm tăng huyết áp hoặc rối loạn lipid máu',
                    'Đái tháo đường có albumin niệu hoặc bệnh thận mạn',
                    'Đái tháo đường đã có bệnh mạch vành, đột quỵ hoặc bệnh động mạch ngoại biên'
                ],
                'price' => '500.000 VNĐ / lần khám',
                'estimated_time' => '60 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-nguy-co-tim-mach-toan-dien',
                'title' => 'Quản lý nguy cơ tim mạch toàn diện',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Kiểm soát đa yếu tố, bảo vệ hệ tuần hoàn',
                'description' => 'Chương trình quản lý tổng thể cho đối tượng có từ 2 yếu tố nguy cơ tim mạch trở lên nhằm phòng ngừa các biến cố nguy hiểm.',
                'detailed_description' => 'Lập hồ sơ nguy cơ cá thể hóa và theo dõi định kỳ giúp điều chỉnh phác đồ thuốc kết hợp tư vấn dinh dưỡng, vận động khoa học để giảm thiểu tối đa nguy cơ tim mạch tổng thể.',
                'includes' => [
                    'Lập hồ sơ theo dõi nguy cơ tim mạch cá nhân',
                    'Khám và theo dõi định kỳ chuyên khoa tim mạch',
                    'Điều chỉnh thuốc kiểm soát các chỉ số sinh hóa',
                    'Tư vấn chế độ dinh dưỡng chuyên sâu cho bệnh tim mạch',
                    'Tư vấn chế độ vận động và luyện tập an toàn',
                    'Đánh giá lại nguy cơ tim mạch tổng thể mỗi 6–12 tháng'
                ],
                'candidates' => [
                    'Người có từ 2 yếu tố nguy cơ tim mạch trở lên (Ví dụ: Tăng huyết áp, Đái tháo đường, LDL-C cao, Hút thuốc lá, Thừa cân béo phì)'
                ],
                'price' => '450.000 VNĐ / lần khám',
                'estimated_time' => '45 phút',
                'is_featured' => false,
            ],
        ];

        foreach ($servicesP2 as $srv) {
            Service::updateOrCreate(
                ['slug' => $srv['slug']],
                array_merge($srv, [
                    'service_pillar_id' => $pillar2->id,
                    'pillar_title' => $pillar2->title,
                ])
            );
        }

        // -------------------------------------------------------------
        // TRỤ CỘT III: CHĂM SÓC - THEO DÕI TIM MẠCH TỪ XA, TẠI CỘNG ĐỒNG
        // -------------------------------------------------------------
        $pillar3 = ServicePillar::updateOrCreate(
            ['id' => 3],
            [
                'title' => 'Trụ cột III: Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Chăm sóc tận nơi - Đồng hành liên tục',
                'description' => 'Chương trình chăm sóc sức khỏe tim mạch tại nhà và cộng đồng - điểm khác biệt lớn nhất của phòng khám.',
                'icon_name' => 'Activity',
                'order' => 3,
            ]
        );

        $servicesP3 = [
            [
                'slug' => 'kham-tim-mach-tai-cong-dong',
                'title' => 'Khám tim mạch tại cộng đồng',
                'pillar_title' => 'Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Dịch vụ y tế chuyên khoa tận nhà',
                'description' => 'Đội ngũ y bác sĩ mang thiết bị thăm khám tận nơi cho những bệnh nhân lớn tuổi, đi lại khó khăn hoặc khách hàng VIP.',
                'detailed_description' => 'Dịch vụ khám tận nhà giúp người bệnh không cần di chuyển phức tạp. Bác sĩ mang theo thiết bị đo điện tim và siêu âm xách tay để đảm bảo thăm khám chuẩn xác ngay tại gia đình.',
                'includes' => [
                    'Khám lâm sàng chuyên khoa tim mạch tận nơi',
                    'Đo huyết áp chuẩn hóa',
                    'Đo điện tim (ECG) tại chỗ',
                    'Siêu âm tim xách tay (nếu có chỉ định)',
                    'Tư vấn phác đồ chăm sóc, dinh dưỡng và sử dụng thuốc tại nhà'
                ],
                'candidates' => [
                    'Người cao tuổi sức khỏe yếu',
                    'Người khó khăn trong di chuyển',
                    'Khách hàng VIP cần chăm sóc riêng',
                    'Bệnh nhân sau xuất viện cần theo dõi tận nhà'
                ],
                'price' => '1.000.000 VNĐ - 1.500.000 VNĐ',
                'estimated_time' => '60 phút tại nhà',
                'is_featured' => false,
            ],
            [
                'slug' => 'dien-tim-tai-cong-dong',
                'title' => 'Điện tim tại cộng đồng',
                'pillar_title' => 'Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Đo và phân tích điện tâm đồ tận nơi',
                'description' => 'Dịch vụ đo điện tâm đồ tận nhà hoặc tại cộng đồng giúp phát hiện kịp thời các bất thường điện học của tim.',
                'detailed_description' => 'Đo điện tim là phương pháp an toàn, không xâm lấn nhưng mang lại giá trị chẩn đoán lớn. Dịch vụ đưa thiết bị điện tim đến tận cơ sở/nhà riêng giúp tầm soát nhanh chóng và an toàn.',
                'includes' => [
                    'Thực hiện đo điện tâm đồ (ECG) 12 đầu cần tận nơi',
                    'Holter điện tim (nếu cần thiết)',
                    'Siêu âm tim phối hợp (nếu có chỉ định)',
                    'Xét nghiệm cận lâm sàng khi cần',
                    'Phân tích biểu đồ và trả kết quả tận tay kèm tư vấn'
                ],
                'candidates' => [
                    'Nhóm có bệnh lý nền & nguy cơ cao: Tăng huyết áp (≥130/80 mmHg), Đái tháo đường, Rối loạn mỡ máu, Hút thuốc lá, Thừa cân béo phì',
                    'Nhóm tuổi & tiền sử gia đình: Người từ 40 - 55 tuổi nên kiểm tra hàng năm; Tiền sử gia đình mắc bệnh tim mạch sớm',
                    'Nhóm có triệu chứng nghi ngờ: Đau thắt ngực/tức ngực; Khó thở khi gắng sức/nằm; Hồi hộp, đánh trống ngực; Chóng mặt, ngất xỉu; Mệt mỏi kéo dài'
                ],
                'price' => '350.000 VNĐ',
                'estimated_time' => '30 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'holter-dien-tim-theo-doi',
                'title' => 'Holter điện tim theo dõi 24h/48h',
                'pillar_title' => 'Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Giám sát nhịp tim liên tục suốt ngày đêm',
                'description' => 'Gắn thiết bị ghi điện tim liên tục 24-48 giờ giúp bắt trọn các cơn rối loạn nhịp kịch phát hoặc tiềm ẩn.',
                'detailed_description' => 'Nhiều cơn loạn nhịp chỉ xuất hiện thoáng qua trong ngày. Thiết bị Holter điện tâm đồ nhỏ gọn được gắn trên ngực bệnh nhân giúp ghi lại liên tục mọi nhịp đập khi sinh hoạt, làm việc và ngủ nghỉ.',
                'includes' => [
                    'Khám lâm sàng đánh giá chỉ định',
                    'Gắn máy Holter điện tim nhỏ gọn trên ngực bệnh nhân',
                    'Hướng dẫn bệnh nhân ghi nhật ký hoạt động',
                    'Tháo thu máy sau 24 - 48 giờ',
                    'Phân tích dữ liệu bằng phần mềm chuyên dụng và bác sĩ đọc kết quả, tư vấn'
                ],
                'candidates' => [
                    'Người có triệu chứng nghi ngờ rối loạn nhịp: Hồi hộp, đánh trống ngực, khó thở, chóng mặt, ngất xỉu',
                    'Người có bệnh lý tim mạch tiềm ẩn: Tiền sử nhồi máu cơ tim, bệnh cơ tim phì đại',
                    'Theo dõi hiệu quả điều trị: Đánh giá thuốc chống loạn nhịp hoặc chức năng máy tạo nhịp',
                    'Phát hiện thiếu máu cơ tim thầm lặng'
                ],
                'price' => '600.000 VNĐ',
                'estimated_time' => '24h - 48h đeo máy',
                'is_featured' => false,
            ],
            [
                'slug' => 'holter-huyet-ap-theo-doi',
                'title' => 'Holter huyết áp theo dõi 24h',
                'pillar_title' => 'Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Đo huyết áp tự động liên tục 24 giờ',
                'description' => 'Theo dõi biến thiên huyết áp trong suốt 24h giúp phát hiện tăng huyết áp ẩn dấu, áo choàng trắng và huyết áp ban đêm.',
                'detailed_description' => 'Máy Holter huyết áp tự động bơm đo huyết áp định kỳ 15-30 phút/lần cả ngày lẫn đêm, cung cấp biểu đồ biến thiên huyết áp chính xác để bác sĩ tối ưu thời gian uống thuốc.',
                'includes' => [
                    'Khám lâm sàng ban đầu',
                    'Gắn thiết bị Holter huyết áp 24h',
                    'Thu hồi thiết bị sau 24h',
                    'Phân tích biểu đồ huyết áp ngày & đêm',
                    'Điều chỉnh phác đồ điều trị và thời gian dùng thuốc'
                ],
                'candidates' => [
                    'Nghi ngờ "Tăng huyết áp áo choàng trắng" hoặc "Tăng huyết áp ẩn dấu"',
                    'Tăng huyết áp dao động bất thường (ngày/đêm)',
                    'Đánh giá hiệu quả tác dụng thuốc hạ áp 24h',
                    'Tăng huyết áp thai kỳ (theo dõi nguy cơ tiền sản giật)',
                    'Xuất hiện triệu chứng tụt huyết áp (chóng mặt, hạ huyết áp tư thế)',
                    'Tăng huyết áp kháng trị',
                    'Bệnh lý đi kèm: Đái tháo đường, rối loạn thần kinh thực vật, đau ngực'
                ],
                'price' => '500.000 VNĐ',
                'estimated_time' => '24h đeo máy',
                'is_featured' => false,
            ],
            [
                'slug' => 'theo-doi-tim-mach-tu-xa',
                'title' => 'Theo dõi tim mạch từ xa qua công nghệ số',
                'pillar_title' => 'Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Bác sĩ đồng hành cùng bạn mọi lúc mọi nơi',
                'description' => 'Giám sát chỉ số huyết áp, nhịp tim và tư vấn từ xa định kỳ thông qua các ứng dụng công nghệ và kênh số.',
                'detailed_description' => 'Giúp bác sĩ và bệnh nhân duy trì kết nối liên tục. Các chỉ số sức khỏe hàng ngày của bệnh nhân được theo dõi để kịp thời phát hiện bất thường và điều chỉnh lịch khám trước khi có sự cố.',
                'includes' => [
                    'Khám đánh giá đầu vào',
                    'Theo dõi chỉ số huyết áp bệnh nhân tự đo tại nhà',
                    'Theo dõi nhịp tim và các dấu hiệu bất thường',
                    'Tư vấn trực tiếp qua Điện thoại / Zalo',
                    'Nhắc lịch tái khám định kỳ',
                    'Điều chỉnh lịch khám và phác đồ khi có dấu hiệu bất thường'
                ],
                'candidates' => [
                    'Bệnh nhân đang trong chương trình quản lý tim mạch của phòng khám',
                    'Bệnh nhân tim mạch vừa xuất viện',
                    'Bệnh nhân sau can thiệp mạch vành, van tim, tim bẩm sinh...'
                ],
                'price' => '200.000 VNĐ / tháng',
                'estimated_time' => 'Theo dõi liên tục',
                'is_featured' => false,
            ],
        ];

        foreach ($servicesP3 as $srv) {
            Service::updateOrCreate(
                ['slug' => $srv['slug']],
                array_merge($srv, [
                    'service_pillar_id' => $pillar3->id,
                    'pillar_title' => $pillar3->title,
                ])
            );
        }
    }
}
