<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServicePillar;
use App\Models\Service;
use App\Models\Article;
use App\Models\SiteSetting;
use App\Models\Appointment;
use App\Models\PatientVital;
use App\Models\Author;
use App\Models\Review;
use App\Models\Banner;
use App\Models\Doctor;
use App\Models\DoctorSchedule;
use App\Models\Faq;
use App\Models\TreatmentResult;
use App\Models\Policy;
use App\Models\MediaFile;

class MediPlusSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Site Settings
        $settings = [
            'clinic_name' => 'Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi',
            'hotline_1' => '038 432 6785',
            'hotline_1_clean' => '0384326785',
            'hotline_2' => '0328 699 799',
            'hotline_2_clean' => '0328699799',
            'zalo_link' => 'https://zalo.me/0384326785',
            'email' => 'doankhoiclinic@gmail.com',
            'address' => '348 Nguyễn Lương Bằng, Lê Thanh Nghị, Hải Phòng',
            'working_hours' => 'Sáng: 07:30 – 11:30 | Chiều: 13:30 – 18:30 (Thứ 2 - Chủ Nhật)',
            'hero_banner' => '/assets/heart_care.png',
            'tagline' => 'Trái tim bình an – Muôn vàn hạnh phúc',
        ];

        foreach ($settings as $key => $val) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $val]);
        }

        // 2. Pillars & Services
        // Pillar 1
        $pillar1 = ServicePillar::updateOrCreate(
            ['id' => 1],
            [
                'title' => 'Trụ cột I: Tầm soát & Phát hiện sớm',
                'tagline' => 'Phòng ngừa biến chứng',
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
                'description' => 'Khám lâm sàng toàn diện kết hợp đo đạc các chỉ số sinh hóa cơ bản và hình ảnh học tim mạch.',
                'detailed_description' => "Gói khám tim mạch tổng quát tại MediPlus HP cung cấp giải pháp tầm soát toàn diện nhất cho hệ tuần hoàn của bạn. Chúng tôi phối hợp các phương pháp khám lâm sàng trực tiếp với trang thiết bị cận lâm sàng hiện đại để chẩn đoán chính xác các vấn đề như suy cơ tim, bệnh van tim, xơ vữa động mạch giai đoạn đầu hoặc nguy cơ đột quỵ tiềm ẩn.",
                'includes' => [
                    'Khám chuyên khoa Tim mạch trực tiếp với Bác sĩ BSCKII Đoàn Khôi',
                    'Đo huyết áp chuẩn hóa tự động',
                    'Đo BMI, vòng bụng đánh giá nguy cơ béo phì',
                    'Đo điện tâm đồ (ECG) 12 đầu cần chuẩn y khoa',
                    'Siêu âm tim Doppler màu chuyên sâu (đánh giá chức năng tim, cấu trúc các van)',
                    'Xét nghiệm sinh hóa máu cần thiết (Mỡ máu toàn phần, HDL-C, LDL-C, Triglyceride, đường huyết, chức năng gan thận)',
                    'Đánh giá nguy cơ tim mạch tổng thể bằng thang điểm quốc tế',
                    'Tư vấn dự phòng bệnh và lập kế hoạch theo dõi điều trị lâu dài'
                ],
                'candidates' => [
                    'Người từ 35 tuổi trở lên cần tầm soát định kỳ',
                    'Người chưa từng đi khám kiểm tra tim mạch bao giờ',
                    'Bệnh nhân chuẩn bị thực hiện các cuộc phẫu thuật lớn',
                    'Người cần kiểm tra sức khỏe tổng quát định kỳ',
                    'Người có các bệnh lý nền (Đái tháo đường, tăng mỡ máu...)',
                    'Người có tiền sử gia đình mắc bệnh tim mạch sớm hoặc đột quỵ'
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
                'detailed_description' => "Tăng huyết áp được mệnh danh là 'kẻ giết người thầm lặng' vì hầu như không có triệu chứng rõ ràng. Dịch vụ tầm soát tăng huyết áp tại MediPlus HP giúp bạn đo lường chuẩn xác, phát hiện sớm tình trạng tăng huyết áp ẩn giấu (chỉ tăng khi ở nhà hoặc khi căng thẳng) hoặc tăng huyết áp áo choàng trắng (chỉ tăng khi gặp bác sĩ) để đưa ra phác đồ phòng ngừa sớm nhất.",
                'includes' => [
                    'Khám lâm sàng tim mạch chuyên sâu',
                    'Đo huyết áp chuẩn hóa bằng thiết bị đạt tiêu chuẩn y khoa quốc tế',
                    'Đo điện tâm đồ (ECG) phát hiện sớm các dấu hiệu phì đại tâm thất',
                    'Gắn Holter huyết áp 24h khi có chỉ định (ghi nhận biến thiên huyết áp cả ngày lẫn đêm)',
                    'Xét nghiệm cận lâm sàng cơ bản đánh giá tổn thương cơ quan đích',
                    'Tư vấn phác đồ thay đổi lối sống không dùng thuốc hoặc thuốc nếu cần thiết'
                ],
                'candidates' => [
                    'Người có huyết áp dao động thất thường lúc cao lúc thấp',
                    'Người trên 40 tuổi có nguy cơ xơ vữa mạch máu',
                    'Người bị thừa cân, béo phì hoặc rối loạn chuyển hóa',
                    'Người mắc bệnh đái tháo đường',
                    'Gia đình có người thân trực hệ bị tăng huyết áp'
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
                'description' => 'Đánh giá tình trạng hẹp tắc mạch vành và các nguy cơ thiếu máu cơ tim cấp tính.',
                'detailed_description' => "Nhồi máu cơ tim xảy ra khi mạch máu nuôi dưỡng tim bị tắc nghẽn hoàn toàn bởi mảng xơ vữa hoặc cục máu đông. Gói tầm soát này được thiết kế đặc biệt để phát hiện sớm tình trạng xơ vữa động mạch vành và thiếu máu cơ tim tiềm ẩn, từ đó ngăn ngừa nguy cơ đột quỵ tim cấp tính nguy hiểm đến tính mạng.",
                'includes' => [
                    'Khám chuyên khoa tim mạch chuyên sâu',
                    'Điện tâm đồ (ECG) phát hiện thiếu máu cơ tim tĩnh',
                    'Siêu âm tim đánh giá chức năng co bóp cơ tim và vận động vùng của cơ tim',
                    'Xét nghiệm chỉ số mỡ máu chuyên sâu (LDL-C, Triglyceride, Cholesterol toàn phần, HDL-C)',
                    'Xét nghiệm chức năng và men tim cơ bản (Troponin-T/I siêu nhạy nếu cần)',
                    'Lập kế hoạch dự phòng cơn đau thắt ngực hoặc nhồi máu cơ tim chủ động'
                ],
                'candidates' => [
                    'Nam giới trên 40 tuổi và Nữ giới trên 50 tuổi',
                    'Người thường xuyên hút thuốc lá hoặc ngửi khói thuốc lá thụ động',
                    'Người bị béo phì, lười vận động thể chất',
                    'Người mắc bệnh đái tháo đường hoặc rối loạn lipid máu nặng',
                    'Người có bệnh lý mạch vành tiềm ẩn, thường xuyên đau thắt ngực khi gắng sức'
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
                'description' => 'Đánh giá các nguy cơ đột quỵ do xơ vữa động mạch cảnh hoặc do các rối loạn nhịp tim (như rung nhĩ).',
                'detailed_description' => "Đột quỵ não có thể phòng ngừa nếu kiểm soát tốt các yếu tố nguy cơ lớn từ tim mạch như rung nhĩ, huyết áp cao và xơ vữa động mạch cảnh. Chương trình tầm soát đột quỵ của chúng tôi tập trung phát hiện cục máu đông từ tim, hẹp động mạch cảnh đưa máu lên não để ngăn chặn kịp thời các cơn tai biến.",
                'includes' => [
                    'Khám lâm sàng tim mạch và kiểm tra tiếng thổi động mạch cảnh',
                    'Điện tâm đồ (ECG) tầm soát loạn nhịp tim và rung nhĩ',
                    'Siêu âm tim Doppler kiểm tra cục máu đông hoặc bệnh van tim',
                    'Xét nghiệm bộ mỡ máu và đông máu',
                    'Đánh giá nguy cơ đột quỵ bằng thang điểm CHA2DS2-VASc'
                ],
                'candidates' => [
                    'Người có chẩn đoán hoặc nghi ngờ Rung nhĩ',
                    'Bệnh nhân tăng huyết áp kiểm soát kém',
                    'Bệnh nhân có xơ vữa động mạch hoặc bệnh mạch vành',
                    'Bệnh nhân suy tim',
                    'Người cao tuổi (trên 60 tuổi)'
                ],
                'price' => '800.000 VNĐ',
                'estimated_time' => '75 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'tam-soat-roi-loan-nhip-tim',
                'title' => 'Tầm soát rối loạn nhịp tim',
                'pillar_title' => 'Tầm soát & Phát hiện sớm',
                'tagline' => 'Định vị các nhịp đập bất thường',
                'description' => 'Phát hiện các cơn nhịp tim nhanh, nhịp chậm hoặc các rối loạn dẫn truyền điện học của tim.',
                'detailed_description' => "Rối loạn nhịp tim có thể gây ra cảm giác mệt mỏi, khó thở, ngất xỉu hoặc thậm chí là đột tử. Tầm soát rối loạn nhịp tim tại phòng khám giúp phát hiện các cơn nhịp đập bất thường, ngoại tâm thu, các hội chứng dẫn truyền bất thường bằng điện tâm đồ và Holter theo dõi liên tục.",
                'includes' => [
                    'Khám lâm sàng tim mạch chuyên sâu',
                    'Đo điện tâm đồ (ECG) tại chỗ',
                    'Siêu âm tim kiểm tra cấu trúc cơ tim và van tim',
                    'Xét nghiệm điện giải đồ và hormone tuyến giáp (nguyên nhân gây loạn nhịp phổ biến)'
                ],
                'candidates' => [
                    'Người có triệu chứng hồi hộp, đánh trống ngực, cảm giác hụt nhịp',
                    'Người thường xuyên mệt mỏi, khó thở, chóng mặt, xây xẩm hoặc từng bị ngất',
                    'Người có bệnh lý nền tăng huyết áp, đái tháo đường, cường giáp'
                ],
                'price' => '450.000 VNĐ',
                'estimated_time' => '60 phút',
                'is_featured' => false,
            ]
        ];

        foreach ($servicesP1 as $srv) {
            Service::updateOrCreate(['slug' => $srv['slug']], array_merge($srv, ['service_pillar_id' => $pillar1->id]));
        }

        // Pillar 2
        $pillar2 = ServicePillar::updateOrCreate(
            ['id' => 2],
            [
                'title' => 'Trụ cột II: Điều trị & Quản lý liên tục',
                'tagline' => 'Chăm sóc định kỳ chuẩn y khoa',
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
                'description' => 'Điều chỉnh liều thuốc huyết áp tối ưu và theo dõi sát sao chỉ số để tránh các biến chứng đột quỵ, suy tim.',
                'detailed_description' => "Tăng huyết áp cần được quản lý suốt đời. Chương trình quản lý tăng huyết áp tại MediPlus HP giúp thiết lập phác đồ cá nhân hóa, tối ưu liều lượng thuốc dựa trên các nghiên cứu lâm sàng mới nhất, tránh tình trạng nhờn thuốc hoặc biến chứng suy thận, suy tim.",
                'includes' => [
                    'Khám và theo dõi định kỳ hàng tháng với BSCKII Đoàn Khôi',
                    'Đo ECG kiểm tra biến chứng dày thất trái hoặc thiếu máu cơ tim',
                    'Điều chỉnh phối hợp thuốc huyết áp phù hợp với từng cá thể',
                    'Xét nghiệm định kỳ kiểm tra chức năng thận (Creatinine, Ure) và điện giải máu'
                ],
                'candidates' => [
                    'Người mới phát hiện tăng huyết áp cần dò liều thuốc',
                    'Bệnh nhân đang điều trị tăng huyết áp nhưng chỉ số chưa ổn định',
                    'Người bệnh tăng huyết áp kèm nhiều bệnh nền phức tạp'
                ],
                'price' => '300.000 VNĐ / lần khám',
                'estimated_time' => '30 - 45 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-mo-mau',
                'title' => 'Quản lý Rối loạn lipid máu (Mỡ máu)',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Dọn dẹp mảng xơ vữa trong lòng mạch',
                'description' => 'Kiểm soát chỉ số mỡ xấu để ngăn ngừa mảng xơ vữa động mạch.',
                'detailed_description' => "Rối loạn mỡ máu dẫn đến hình thành các mảng xơ vữa làm hẹp lòng mạch, cản trở máu nuôi tim và não. Chúng tôi quản lý chỉ số lipid máu thông qua xét nghiệm định kỳ nghiêm ngặt, điều trị statin liều tối ưu và kết hợp hướng dẫn chế độ ăn giảm béo lành mạnh.",
                'includes' => [
                    'Khám chuyên khoa tim mạch định kỳ',
                    'Xét nghiệm định kỳ các chỉ số Cholesterol, Triglyceride, LDL-C, HDL-C',
                    'Xét nghiệm kiểm tra men gan (AST, ALT) khi dùng Statin',
                    'Điều chỉnh thuốc hạ mỡ máu tối ưu nhằm đạt LDL-C mục tiêu'
                ],
                'candidates' => [
                    'Bệnh nhân đã bị xơ vữa mạch máu (đã đặt stent, nhồi máu cơ tim, đột quỵ)',
                    'Người bệnh đái tháo đường, tăng huyết áp cần hạ mỡ máu ngặt nghèo',
                    'Người bị tăng Cholesterol gia đình di truyền'
                ],
                'price' => '350.000 VNĐ / lần khám',
                'estimated_time' => '30 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-suy-tim-chuyen-sau',
                'title' => 'Quản lý suy tim chuyên sâu',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Tăng sức bền và cải thiện chất lượng sống',
                'description' => 'Theo dõi sát sao cân nặng, tình trạng khó thở và tối ưu hóa các nhóm thuốc điều trị suy tim nền tảng.',
                'detailed_description' => "Bệnh nhân suy tim cần một phác đồ phối hợp thuốc chặt chẽ ('tứ trụ' trong điều trị suy tim) để giúp cơ tim phục hồi co bóp, giảm tỷ lệ nhập viện cấp cứu. MediPlus HP cung cấp chương trình quản lý suy tim chuyên biệt giúp kiểm soát triệu chứng khó thở, sưng phù chân và giữ nhịp sinh hoạt ổn định.",
                'includes' => [
                    'Khám lâm sàng đánh giá tình trạng ứ dịch (phù chân, tĩnh mạch cổ)',
                    'Siêu âm tim định kỳ kiểm tra phân suất tống máu (EF) và áp lực động mạch phổi',
                    'Xét nghiệm kiểm tra điện giải, creatinine máu đánh giá chức năng thận',
                    'Tối ưu hóa các thuốc điều trị suy tim theo khuyến cáo mới nhất'
                ],
                'candidates' => [
                    'Bệnh nhân suy tim phân suất tống máu giảm (HFrEF) hoặc bảo tồn (HFpEF)',
                    'Bệnh nhân suy tim mãn tính sau khi ra viện cần ổn định phác đồ',
                    'Người bệnh suy tim do tăng huyết áp, bệnh mạch vành hoặc bệnh cơ tim'
                ],
                'price' => '400.000 VNĐ / lần khám',
                'estimated_time' => '40 - 50 phút',
                'is_featured' => false,
            ],
            [
                'slug' => 'quan-ly-nguy-co-tim-mach-tieu-duong',
                'title' => 'Quản lý nguy cơ tim mạch ở bệnh nhân đái tháo đường',
                'pillar_title' => 'Điều trị & Quản lý liên tục',
                'tagline' => 'Bảo vệ kép Tim & Thận toàn diện',
                'description' => 'Tập trung bảo vệ tim và thận cho người bệnh tiểu đường, giảm tỷ lệ tử vong do biến cố tim mạch.',
                'detailed_description' => "Hơn 70% bệnh nhân tiểu đường tử vong do các biến cố tim mạch chứ không phải do đường huyết cao đơn thuần. Chúng tôi áp dụng các nhóm thuốc hạ đường huyết thế hệ mới có tác dụng bảo vệ tim mạch và bảo vệ thận vượt trội để giúp bệnh nhân đái tháo đường sống khỏe mạnh, không lo tai biến.",
                'includes' => [
                    'Đánh giá ban đầu: Khám tim mạch chuyên khoa, siêu âm tim, đo ECG',
                    'Xét nghiệm định kỳ kiểm tra HbA1c, chức năng thận (eGFR), chỉ số albumin niệu (ACR)',
                    'Phối hợp chặt chẽ với Bác sĩ Nội tiết của bệnh nhân để tối ưu phác đồ',
                    'Ưu tiên lựa chọn các nhóm thuốc hạ đường huyết bảo vệ tim và thận'
                ],
                'candidates' => [
                    'Bệnh nhân đái tháo đường type 2 mới phát hiện',
                    'Người bệnh tiểu đường lâu năm có nhiều yếu tố nguy cơ tim mạch',
                    'Người tiểu đường đã có biến chứng thận (microalbumin niệu)'
                ],
                'price' => '500.000 VNĐ / lần khám',
                'estimated_time' => '60 phút',
                'is_featured' => false,
            ]
        ];

        foreach ($servicesP2 as $srv) {
            Service::updateOrCreate(['slug' => $srv['slug']], array_merge($srv, ['service_pillar_id' => $pillar2->id]));
        }

        // Pillar 3
        $pillar3 = ServicePillar::updateOrCreate(
            ['id' => 3],
            [
                'title' => 'Trụ cột III: Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Chăm sóc vượt giới hạn địa lý',
                'description' => 'Chương trình chăm sóc sức khỏe tim mạch tại nhà và cộng đồng - điểm khác biệt lớn nhất của MediPlus HP.',
                'icon_name' => 'Activity',
                'order' => 3,
            ]
        );

        $servicesP3 = [
            [
                'slug' => 'kham-tim-mach-cong-dong',
                'title' => 'Khám tim mạch tại cộng đồng',
                'pillar_title' => 'Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Y khoa hướng về gia đình và bản bản xã',
                'description' => 'Đoàn y bác sĩ mang thiết bị y tế đến trực tiếp nơi cư trú để thăm khám cho các đối tượng đặc biệt.',
                'detailed_description' => "Đối với những bệnh nhân lớn tuổi, đi lại khó khăn hoặc đang trong giai đoạn phục hồi sau tai biến, MediPlus HP cung cấp dịch vụ thăm khám tại nhà ở Hải Phòng. Đội ngũ y tế mang theo thiết bị đo điện tim và siêu âm xách tay để đảm bảo bệnh nhân nhận được dịch vụ y khoa chất lượng ngay tại giường bệnh.",
                'includes' => [
                    'Khám bệnh lâm sàng chuyên khoa tim mạch tận nơi',
                    'Đo huyết áp bằng máy đo chuẩn hóa y khoa tự động',
                    'Đo điện tâm đồ (ECG) 12 đầu cần tại chỗ và phân tích ngay',
                    'Siêu âm tim bằng máy siêu âm xách tay hiện đại (nếu có chỉ định đặt trước)',
                    'Tư vấn trực tiếp phác đồ tự chăm sóc, dinh dưỡng và điều trị tại nhà cho người thân'
                ],
                'candidates' => [
                    'Người cao tuổi sức khỏe yếu khó tự di chuyển đến phòng khám',
                    'Bệnh nhân bị liệt hoặc hạn chế vận động sau tai biến đột quỵ',
                    'Khách hàng đăng ký gói dịch vụ VIP chăm sóc sức khỏe tại nhà'
                ],
                'price' => '1.000.000 VNĐ - 1.500.000 VNĐ',
                'estimated_time' => '60 phút tại nhà',
                'is_featured' => false,
            ],
            [
                'slug' => 'holter-dien-tim-24h-48h',
                'title' => 'Đo Holter điện tim 24h/48h theo dõi',
                'pillar_title' => 'Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Bắt trọn mọi nhịp đập thầm lặng suốt ngày đêm',
                'description' => 'Gắn thiết bị ghi điện tim liên tục trong 24-48 giờ để bắt được các cơn loạn nhịp tim thầm lặng hoặc kịch phát.',
                'detailed_description' => "Nhiều cơn loạn nhịp tim nguy hiểm chỉ xuất hiện thoáng qua trong ngày và không thể phát hiện khi đo điện tim vài phút tại phòng khám. Thiết bị Holter điện tâm đồ nhỏ gọn sẽ được đeo trên ngực của bệnh nhân trong 24-48h để liên tục ghi lại mọi nhịp đập, giúp bác sĩ phát hiện chính xác các cơn loạn nhịp lúc ngủ, lúc gắng sức hoặc lúc mệt mỏi.",
                'includes' => [
                    'Khám lâm sàng đánh giá chỉ định ban đầu',
                    'Lắp đặt thiết bị Holter điện tim nhỏ gọn, không thấm nước trên ngực bệnh nhân',
                    'Bệnh nhân ra về và sinh hoạt bình thường tại nhà, ghi chép nhật ký triệu chứng',
                    'Tháo máy sau 24-48h và nạp dữ liệu điện tim vào phần mềm chuyên dụng',
                    'Bác sĩ chuyên khoa đọc kết quả, phân tích biểu đồ điện tim chi tiết'
                ],
                'candidates' => [
                    'Người thường xuyên có cảm giác tim đập nhanh, bỏ nhịp, hồi hộp',
                    'Người bị chóng mặt, xây xẩm mặt mày, hoặc từng bị ngất xỉu',
                    'Bệnh nhân sau nhồi máu cơ tim cần đánh giá nguy cơ đột tử'
                ],
                'price' => '600.000 VNĐ',
                'estimated_time' => '24h - 48h đeo thiết bị',
                'is_featured' => false,
            ],
            [
                'slug' => 'theo-doi-tim-mach-tu-xa',
                'title' => 'Theo dõi tim mạch từ xa qua số hóa',
                'pillar_title' => 'Theo dõi từ xa & Cộng đồng',
                'tagline' => 'Bác sĩ đồng hành bên bạn mọi lúc mọi nơi',
                'description' => 'Bác sĩ đồng hành hàng ngày cùng chỉ số của người bệnh thông qua các kênh liên lạc số và thiết bị cá nhân.',
                'detailed_description' => "Một dịch vụ đột phá của MediPlus HP giúp kết nối liên tục giữa bác sĩ và bệnh nhân. Không chỉ gặp nhau khi đi khám bệnh, các chỉ số huyết áp, nhịp tim hàng ngày của bạn sẽ được theo dõi, phân tích bởi bác sĩ để kịp thời điều chỉnh lối sống, phát hiện bất thường trước khi xảy ra biến cố.",
                'includes' => [
                    'Thiết lập hồ sơ sức khỏe điện tử cá nhân bảo mật trên hệ thống phòng khám',
                    'Hướng dẫn người bệnh tự đo huyết áp và nhịp tim tại nhà đúng cách và chọn thiết bị',
                    'Nhận và phân tích chỉ số huyết áp/nhịp tim bệnh nhân gửi hàng tuần',
                    'Bác sĩ trực tiếp tư vấn qua Điện thoại/Zalo khi các chỉ số có biến động bất thường'
                ],
                'candidates' => [
                    'Bệnh nhân đang trong chương trình quản lý tim mạch lâu dài của phòng khám',
                    'Bệnh nhân tim mạch vừa xuất viện cần giám sát chặt chẽ giai đoạn đầu tại nhà',
                    'Bệnh nhân sau can thiệp mạch vành, thay van tim cần theo dõi phục hồi'
                ],
                'price' => '200.000 VNĐ / tháng',
                'estimated_time' => 'Theo dõi liên tục',
                'is_featured' => false,
            ]
        ];

        foreach ($servicesP3 as $srv) {
            Service::updateOrCreate(['slug' => $srv['slug']], array_merge($srv, ['service_pillar_id' => $pillar3->id]));
        }

        // 3. Authors
        Author::firstOrCreate(
            ['name' => 'BSCKII Đoàn Khôi'],
            [
                'title' => 'Chuyên khoa II Tim mạch - Trưởng phòng khám',
                'avatar' => '/assets/doctor.png',
                'bio' => 'Hơn 25 năm kinh nghiệm chẩn đoán và điều trị bệnh lý tim mạch, huyết áp tại Hải Phòng.'
            ]
        );
        Author::firstOrCreate(
            ['name' => 'ThS.BS Nguyễn Văn An'],
            [
                'title' => 'Chuyên gia Siêu âm Tim & Mạch máu',
                'avatar' => '/assets/doctor.png',
                'bio' => 'Chuyên gia siêu âm tim Doppler màu và chẩn đoán xơ vữa động mạch.'
            ]
        );

        // 4. Reviews / Patient Testimonials
        Review::firstOrCreate(
            ['patient_name' => 'Bác Trần Văn Hùng (68 tuổi)'],
            [
                'service_name' => 'Tầm soát tăng huyết áp & Holter 24h',
                'rating' => 5,
                'comment' => 'Bác sĩ Khôi khám rất kỹ, giải thích nhẹ nhàng chu đáo. Máy Holter 24h nhỏ gọn không ảnh hưởng sinh hoạt.',
                'is_approved' => true
            ]
        );
        Review::firstOrCreate(
            ['patient_name' => 'Chị Lê Thị Thanh (45 tuổi)'],
            [
                'service_name' => 'Khám tim mạch tổng quát',
                'rating' => 5,
                'comment' => 'Phòng khám sạch đẹp, nhân viên lễ tân nhiệt tình. Kết quả siêu âm tim có ngay sau 15 phút.',
                'is_approved' => true
            ]
        );

        // 5. Banners
        Banner::firstOrCreate(
            ['title' => 'Tầm Soát Tim Mạch Toàn Diện Hải Phòng'],
            [
                'subtitle' => 'Chăm sóc trái tim khỏe mạnh cùng BSCKII Đoàn Khôi',
                'image_url' => '/assets/heart_care.png',
                'link' => '/dich-vu',
                'order' => 1,
                'is_active' => true
            ]
        );

        // 6. Doctors & Schedule
        $doc = Doctor::firstOrCreate(
            ['name' => 'BSCKII Đoàn Khôi'],
            [
                'specialty' => 'Chuyên khoa II Nội Tim mạch',
                'experience' => '25+ Năm kinh nghiệm',
                'avatar' => '/assets/doctor.png',
                'bio' => 'Trưởng khoa Tim mạch uy tín tại Hải Phòng, chuyên môn cao về Tăng huyết áp và Suy tim.',
                'order' => 1
            ]
        );

        DoctorSchedule::firstOrCreate(
            ['doctor_id' => $doc->id, 'day_of_week' => 'Thứ 2 - Thứ 7'],
            [
                'shift' => 'Sáng 07:30 – 11:30 | Chiều 13:30 – 18:30',
                'room' => 'Phòng khám số 1'
            ]
        );

        // 7. FAQs
        Faq::firstOrCreate(
            ['question' => 'Phòng khám có nhận đặt lịch hẹn trước không?'],
            [
                'answer' => 'Có, bệnh nhân có thể đặt lịch hẹn trực tuyến qua website hoặc gọi hotline 038 432 6785 để không phải chờ đợi.',
                'category' => 'Đặt lịch khám',
                'order' => 1
            ]
        );

        // 8. Treatment Results
        TreatmentResult::firstOrCreate(
            ['patient_title' => 'Bệnh nhân Bùi Văn T. (62t) - Kiểm soát huyết áp thành công'],
            [
                'before_image' => '/assets/screening_service.png',
                'after_image' => '/assets/holter_service.png',
                'diagnosis' => 'Tăng huyết áp độ 2 dao động kèm xơ vữa động mạch cảnh nhẹ.',
                'outcome' => 'Sau 3 tháng dùng phác đồ phối hợp liều thấp và Holter theo dõi, huyết áp duy trì 125/80 mmHg ổn định.'
            ]
        );

        // 9. Policies
        Policy::firstOrCreate(
            ['slug' => 'chinh-sach-bao-mat'],
            [
                'title' => 'Chính sách bảo mật thông tin bệnh nhân',
                'content' => 'MediPlus HP cam kết bảo mật tuyệt đối toàn bộ hồ sơ bệnh án và thông tin cá nhân của bệnh nhân theo đúng quy định pháp luật y tế.'
            ]
        );

        // 10. Media Files
        MediaFile::firstOrCreate(
            ['filename' => 'heart_care.png'],
            [
                'url' => '/assets/heart_care.png',
                'file_type' => 'image',
                'file_size' => '1024500'
            ]
        );

        // 11. Initial Appointments & Consultation Leads
        Appointment::firstOrCreate(
            ['phone' => '0912345678'],
            [
                'patient_name' => 'Nguyễn Văn Hải',
                'gender' => 'Nam',
                'address' => 'Quận Ngô Quyền, Hải Phòng',
                'notes' => 'Hay bị tăng huyết áp ban đêm, nhức đầu vùng gáy.',
                'doctor_notes' => 'Đã gọi tư vấn, hẹn tái khám đo Holter huyết áp 24h.',
                'service_slug' => 'tam-soat-tang-huyet-ap',
                'status' => 'confirmed',
                'confirmed_at' => now(),
            ]
        );

        Appointment::firstOrCreate(
            ['phone' => '0988776655'],
            [
                'patient_name' => 'Trần Thị Mai',
                'gender' => 'Nữ',
                'address' => 'Huyện An Dương, Hải Phòng',
                'notes' => 'Tư vấn gói khám tim mạch tổng quát cho người cao tuổi (72 tuổi).',
                'status' => 'pending',
            ]
        );

        // 12. Articles (6 Rich Medical Articles)
        $categoriesMap = [];
        $categoriesList = [
            'Tăng huyết áp',
            'Kiến thức Y khoa',
            'Chẩn đoán hình ảnh',
            'Dinh dưỡng & Lối sống',
            'Cấp cứu tim mạch',
            'Dược phẩm & Điều trị'
        ];

        foreach ($categoriesList as $index => $catName) {
            $cat = \App\Models\ArticleCategory::updateOrCreate(
                ['slug' => \Illuminate\Support\Str::slug($catName)],
                [
                    'name' => $catName,
                    'order' => $index + 1
                ]
            );
            $categoriesMap[$catName] = $cat->id;
        }

        $articlesList = [
            [
                'slug' => '5-dau-hieu-canh-bao-tang-huyet-ap-am-thang',
                'title' => '5 Dấu hiệu cảnh báo tăng huyết áp ẩn giấu ít người chú ý',
                'category' => 'Tăng huyết áp',
                'excerpt' => 'Tăng huyết áp được mệnh danh là "kẻ giết người thầm lặng". Nhận biết sớm các triệu chứng thoáng qua như hoa mắt, nặng đầu vùng gáy để phòng ngừa đột quỵ.',
                'content' => '<p>Tăng huyết áp xảy ra khi áp lực máu lên thành động mạch cao hơn mức bình thường. Nhiều người chỉ phát hiện bệnh khi đã xuất hiện biến chứng nguy hiểm như nhồi máu cơ tim hay tai biến mạch máu não.</p><h4>Các dấu hiệu cần lưu ý:</h4><ul><li>Đau nhức đầu vùng chẩm gáy vào sáng sớm.</li><li>Hoa mắt, chóng mặt khi thay đổi tư thế đột ngột.</li><li>Hồi hộp, đánh trống ngực hoặc tức nhẹ ngực trái.</li><li>Mất ngủ kéo dài, ngủ không sâu giấc.</li><li>Chảy máu cam đột ngột không rõ nguyên nhân.</li></ul><p>Khi có các triệu chứng trên, bạn nên đo huyết áp ngay và đến cơ sở y tế chuyên khoa tim mạch để được chẩn đoán chuẩn xác.</p>',
                'image' => '/assets/screening_service.png',
                'author' => 'BSCKII Đoàn Khôi',
                'read_time' => '5 phút đọc',
                'date' => '15/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'huong-dan-do-huyet-ap-tai-nha-chuan-xac',
                'title' => 'Hướng dẫn đọc chỉ số đo huyết áp tại nhà chính xác theo chuẩn Bộ Y Tế',
                'category' => 'Kiến thức Y khoa',
                'excerpt' => 'Tự đo huyết áp tại nhà giúp bác sĩ theo dõi được biến động huyết áp thực tế. Tìm hiểu quy trình đo đúng cách và thời điểm đo tốt nhất trong ngày.',
                'content' => '<p>Đo huyết áp tại nhà đúng kỹ thuật đóng vai trò 50% trong thành công của phác đồ điều trị tăng huyết áp.</p><h4>Quy tắc vàng khi đo huyết áp:</h4><ol><li>Nghỉ ngơi thả lỏng ít nhất 5-10 phút trước khi đo.</li><li>Không uống cà phê, trà đậm hoặc hút thuốc lá trước khi đo 30 phút.</li><li>Tựa lưng vào ghế, đặt tay ngang tầm tim.</li><li>Đo 2 lần liên tiếp cách nhau 1-2 phút và lấy giá trị trung bình.</li></ol>',
                'image' => '/assets/telehealth_service.png',
                'author' => 'BSCKII Đoàn Khôi',
                'read_time' => '4 phút đọc',
                'date' => '18/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'holter-huyet-ap-24-gio-la-gi',
                'title' => 'Holter huyết áp 24 giờ là gì và khi nào bệnh nhân tim mạch cần thực hiện?',
                'category' => 'Chẩn đoán hình ảnh',
                'excerpt' => 'Phương pháp theo dõi huyết áp liên tục 24h giúp phát hiện hiện tượng "Tăng huyết áp áo korotkoff (áo bàng trắng)" và tăng huyết áp ẩn giấu ban đêm.',
                'content' => '<p>Holter huyết áp là thiết bị đo huyết áp tự động đeo trên người trong vòng 24 giờ, giúp ghi lại biểu đồ huyết áp cả lúc làm việc lẫn khi ngủ đêm.</p><p>Kỹ thuật này cực kỳ quan trọng đối với các bệnh nhân nghi ngờ huyết áp áo bàng trắng hoặc huyết áp tăng vọt vào rạng sáng.</p>',
                'image' => '/assets/holter_service.png',
                'author' => 'ThS.BS Nguyễn Văn An',
                'read_time' => '6 phút đọc',
                'date' => '19/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'che-do-an-dash-cho-nguoi-benh-cao-huyet-ap',
                'title' => 'Chế độ ăn DASH cho người bệnh cao huyết áp: Thực đơn khoa học giảm áp lực mạch máu',
                'category' => 'Dinh dưỡng & Lối sống',
                'excerpt' => 'DASH (Dietary Approaches to Stop Hypertension) là chế độ ăn uống được chứng minh lâm sàng giúp hạ huyết áp tự nhiên mà không cần tăng liều thuốc.',
                'content' => '<p>Chế độ ăn DASH chú trọng thực phẩm giàu kali, canxi, magie và chất xơ, đồng thời cắt giảm muối natri xuống dưới 2.000 mg/ngày.</p><h4>Thực phẩm khuyến khích:</h4><ul><li>Rau xanh đậm (rau bina, cải kale).</li><li>Trái cây tươi (chuối, táo, cam).</li><li>Hạt ngũ cốc nguyên cám và cá biển giàu Omega-3.</li></ul>',
                'image' => '/assets/heart_care.png',
                'author' => 'BSCKII Đoàn Khôi',
                'read_time' => '7 phút đọc',
                'date' => '20/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'dau-nguc-trai-khi-nao-can-di-kham-ngay',
                'title' => 'Đau ngực trái khi nào cần đi khám tim mạch và xử trí cấp cứu ngay lập tức?',
                'category' => 'Cấp cứu tim mạch',
                'excerpt' => 'Phân biệt đau ngực do cơ xương khớp và đau thắt ngực do thiếu máu cơ tim / nhồi máu cơ tim. Đừng bỏ qua giờ vàng cấp cứu.',
                'content' => '<p>Đo thắt ngực là triệu chứng điển hình của bệnh lý mạch vành. Đau thường có cảm giác như bị đá nặng đè lên ngực, lan ra vai trái hoặc hàm dưới.</p>',
                'image' => '/assets/screening_service.png',
                'author' => 'BSCKII Đoàn Khôi',
                'read_time' => '5 phút đọc',
                'date' => '21/07/2026',
                'is_published' => true,
            ],
            [
                'slug' => 'nhung-luu-y-khi-dung-thuoc-huyet-ap',
                'title' => 'Những lưu ý quan trọng khi sử dụng thuốc huyết áp hàng ngày bạn tuyệt đối không được quên',
                'category' => 'Dược phẩm & Điều trị',
                'excerpt' => 'Tuyệt đối không tự ý dừng thuốc khi thấy huyết áp trở về bình thường. Tìm hiểu lý do vì sao phải uống thuốc huyết áp đều đặn đúng giờ.',
                'content' => '<p>Thuốc điều trị tăng huyết áp giúp duy trì áp lực máu ổn định. Dừng thuốc đột ngột có thể gây ra hiện tượng huyết áp bật nảy (rebound hypertension) dẫn đến đột quỵ.</p>',
                'image' => '/assets/telehealth_service.png',
                'author' => 'ThS.BS Nguyễn Văn An',
                'read_time' => '5 phút đọc',
                'date' => '21/07/2026',
                'is_published' => true,
            ],
        ];

        foreach ($articlesList as $art) {
            $art['article_category_id'] = $categoriesMap[$art['category']];
            Article::updateOrCreate(['slug' => $art['slug']], $art);
        }
    }
}
