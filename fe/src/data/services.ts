export interface ServiceDetail {
  slug: string;
  title: string;
  pillarTitle: string;
  tagline: string;
  description: string;
  detailedDescription: string;
  includes: string[];
  candidates: string[];
  price: string;
  estimatedTime: string;
}

export interface ServicePillar {
  title: string;
  tagline: string;
  description: string;
  iconName: "Search" | "Stethoscope" | "Activity";
  services: ServiceDetail[];
}

export const servicePillars: ServicePillar[] = [
  {
    title: "Trụ cột I: Tầm soát & Phát hiện sớm",
    tagline: "Phòng ngừa biến chứng",
    description: "Phát hiện sớm bệnh tim mạch và các yếu tố nguy cơ trước khi có biến chứng lâm sàng xảy ra.",
    iconName: "Search",
    services: [
      {
        slug: "kham-tim-mach-tong-quat",
        title: "Khám tim mạch tổng quát",
        pillarTitle: "Tầm soát & Phát hiện sớm",
        tagline: "Đánh giá sức khỏe trái tim toàn diện",
        description: "Khám lâm sàng toàn diện kết hợp đo đạc các chỉ số sinh hóa cơ bản và hình ảnh học tim mạch.",
        detailedDescription: "Gói khám tim mạch tổng quát tại MediPlus HP cung cấp giải pháp tầm soát toàn diện nhất cho hệ tuần hoàn của bạn. Chúng tôi phối hợp các phương pháp khám lâm sàng trực tiếp với trang thiết bị cận lâm sàng hiện đại để chẩn đoán chính xác các vấn đề như suy cơ tim, bệnh van tim, xơ vữa động mạch giai đoạn đầu hoặc nguy cơ đột quỵ tiềm ẩn.",
        includes: [
          "Khám chuyên khoa Tim mạch trực tiếp với Bác sĩ BSCKII Đoàn Khôi",
          "Đo huyết áp chuẩn hóa tự động",
          "Đo BMI, vòng bụng đánh giá nguy cơ béo phì",
          "Đo điện tâm đồ (ECG) 12 đầu cần chuẩn y khoa",
          "Siêu âm tim Doppler màu chuyên sâu (đánh giá chức năng tim, cấu trúc các van)",
          "Xét nghiệm sinh hóa máu cần thiết (Mỡ máu toàn phần, HDL-C, LDL-C, Triglyceride, đường huyết, chức năng gan thận)",
          "Đánh giá nguy cơ tim mạch tổng thể bằng thang điểm quốc tế",
          "Tư vấn dự phòng bệnh và lập kế hoạch theo dõi điều trị lâu dài"
        ],
        candidates: [
          "Người từ 35 tuổi trở lên cần tầm soát định kỳ",
          "Người chưa từng đi khám kiểm tra tim mạch bao giờ",
          "Bệnh nhân chuẩn bị thực hiện các cuộc phẫu thuật lớn",
          "Người cần kiểm tra sức khỏe tổng quát định kỳ",
          "Người có các bệnh lý nền (Đái tháo đường, tăng mỡ máu...)",
          "Người có tiền sử gia đình mắc bệnh tim mạch sớm hoặc đột quỵ"
        ],
        price: "500.000 VNĐ - 1.200.000 VNĐ (tùy thuộc mức độ xét nghiệm chỉ định thêm)",
        estimatedTime: "60 - 90 phút"
      },
      {
        slug: "tam-soat-tang-huyet-ap",
        title: "Tầm soát tăng huyết áp",
        pillarTitle: "Tầm soát & Phát hiện sớm",
        tagline: "Phát hiện sớm kẻ giết người thầm lặng",
        description: "Đánh giá chi tiết các chỉ số huyết áp để xác định tình trạng huyết áp dao động hoặc tăng huyết áp ẩn giấu.",
        detailedDescription: "Tăng huyết áp được mệnh danh là 'kẻ giết người thầm lặng' vì hầu như không có triệu chứng rõ ràng. Dịch vụ tầm soát tăng huyết áp tại MediPlus HP giúp bạn đo lường chuẩn xác, phát hiện sớm tình trạng tăng huyết áp ẩn giấu (chỉ tăng khi ở nhà hoặc khi căng thẳng) hoặc tăng huyết áp áo choàng trắng (chỉ tăng khi gặp bác sĩ) để đưa ra phác đồ phòng ngừa sớm nhất.",
        includes: [
          "Khám lâm sàng tim mạch chuyên sâu",
          "Đo huyết áp chuẩn hóa bằng thiết bị đạt tiêu chuẩn y khoa quốc tế",
          "Đo điện tâm đồ (ECG) phát hiện sớm các dấu hiệu phì đại tâm thất",
          "Gắn Holter huyết áp 24h khi có chỉ định (ghi nhận biến thiên huyết áp cả ngày lẫn đêm)",
          "Xét nghiệm cận lâm sàng cơ bản đánh giá tổn thương cơ quan đích",
          "Tư vấn phác đồ thay đổi lối sống không dùng thuốc hoặc thuốc nếu cần thiết"
        ],
        candidates: [
          "Người có huyết áp dao động thất thường lúc cao lúc thấp",
          "Người trên 40 tuổi có nguy cơ xơ vữa mạch máu",
          "Người bị thừa cân, béo phì hoặc rối loạn chuyển hóa",
          "Người mắc bệnh đái tháo đường",
          "Gia đình có người thân trực hệ bị tăng huyết áp"
        ],
        price: "350.000 VNĐ (Chưa bao gồm chi phí thuê thiết bị Holter 24h nếu có chỉ định)",
        estimatedTime: "45 phút"
      },
      {
        slug: "tam-soat-nhoi-mau-co-tim",
        title: "Tầm soát nguy cơ nhồi máu cơ tim",
        pillarTitle: "Tầm soát & Phát hiện sớm",
        tagline: "Chủ động phòng ngừa biến cố mạch vành",
        description: "Đánh giá tình trạng hẹp tắc mạch vành và các nguy cơ thiếu máu cơ tim cấp tính.",
        detailedDescription: "Nhồi máu cơ tim xảy ra khi mạch máu nuôi dưỡng tim bị tắc nghẽn hoàn toàn bởi mảng xơ vữa hoặc cục máu đông. Gói tầm soát này được thiết kế đặc biệt để phát hiện sớm tình trạng xơ vữa động mạch vành và thiếu máu cơ tim tiềm ẩn, từ đó ngăn ngừa nguy cơ đột quỵ tim cấp tính nguy hiểm đến tính mạng.",
        includes: [
          "Khám chuyên khoa tim mạch chuyên sâu",
          "Điện tâm đồ (ECG) phát hiện thiếu máu cơ tim tĩnh",
          "Siêu âm tim đánh giá chức năng co bóp cơ tim và vận động vùng của cơ tim",
          "Xét nghiệm chỉ số mỡ máu chuyên sâu (LDL-C, Triglyceride, Cholesterol toàn phần, HDL-C)",
          "Xét nghiệm chức năng và men tim cơ bản (Troponin-T/I siêu nhạy nếu cần)",
          "Lập kế hoạch dự phòng cơn đau thắt ngực hoặc nhồi máu cơ tim chủ động"
        ],
        candidates: [
          "Nam giới trên 40 tuổi và Nữ giới trên 50 tuổi",
          "Người thường xuyên hút thuốc lá hoặc ngửi khói thuốc lá thụ động",
          "Người bị béo phì, lười vận động thể chất",
          "Người mắc bệnh đái tháo đường hoặc rối loạn lipid máu nặng",
          "Người có bệnh lý mạch vành tiềm ẩn, thường xuyên đau thắt ngực khi gắng sức"
        ],
        price: "600.000 VNĐ",
        estimatedTime: "60 phút"
      },
      {
        slug: "tam-soat-dot-quy",
        title: "Tầm soát nguy cơ đột quỵ",
        pillarTitle: "Tầm soát & Phát hiện sớm",
        tagline: "Bảo vệ não bộ khỏi biến cố mạch máu",
        description: "Đánh giá các nguy cơ đột quỵ do xơ vữa động mạch cảnh hoặc do các rối loạn nhịp tim (như rung nhĩ).",
        detailedDescription: "Đột quỵ não có thể phòng ngừa nếu kiểm soát tốt các yếu tố nguy cơ lớn từ tim mạch như rung nhĩ, huyết áp cao và xơ vữa động mạch cảnh. Chương trình tầm soát đột quỵ của chúng tôi tập trung phát hiện cục máu đông từ tim, hẹp động mạch cảnh đưa máu lên não để ngăn chặn kịp thời các cơn tai biến.",
        includes: [
          "Khám lâm sàng tim mạch và kiểm tra tiếng thổi động mạch cảnh",
          "Điện tâm đồ (ECG) tầm soát loạn nhịp tim và rung nhĩ",
          "Siêu âm tim Doppler kiểm tra cục máu đông hoặc bệnh van tim",
          "Gắn Holter ECG nếu nghi ngờ có cơn rung nhĩ kịch phát ẩn giấu",
          "Đo Holter huyết áp (nếu cần)",
          "Xét nghiệm bộ mỡ máu và đông máu",
          "Đánh giá nguy cơ đột quỵ bằng thang điểm CHA2DS2-VASc",
          "Phối hợp chỉ định chụp cộng hưởng từ (MRI) sọ não tại các bệnh viện liên kết chất lượng cao"
        ],
        candidates: [
          "Người có chẩn đoán hoặc nghi ngờ Rung nhĩ",
          "Bệnh nhân tăng huyết áp kiểm soát kém",
          "Bệnh nhân có xơ vữa động mạch hoặc bệnh mạch vành",
          "Bệnh nhân suy tim",
          "Người bệnh đái tháo đường",
          "Người cao tuổi (trên 60 tuổi)",
          "Người có lối sống ít vận động, hút thuốc lá nhiều"
        ],
        price: "800.000 VNĐ (Không bao gồm chi phí chụp MRI tại bệnh viện liên kết)",
        estimatedTime: "75 phút"
      },
      {
        slug: "tam-soat-roi-loan-nhip-tim",
        title: "Tầm soát rối loạn nhịp tim",
        pillarTitle: "Tầm soát & Phát hiện sớm",
        tagline: "Định vị các nhịp đập bất thường",
        description: "Phát hiện các cơn nhịp tim nhanh, nhịp chậm hoặc các rối loạn dẫn truyền điện học của tim.",
        detailedDescription: "Rối loạn nhịp tim có thể gây ra cảm giác mệt mỏi, khó thở, ngất xỉu hoặc thậm chí là đột tử. Tầm soát rối loạn nhịp tim tại phòng khám giúp phát hiện các cơn nhịp đập bất thường, ngoại tâm thu, các hội chứng dẫn truyền bất thường bằng điện tâm đồ và Holter theo dõi liên tục.",
        includes: [
          "Khám lâm sàng tim mạch chuyên sâu",
          "Đo điện tâm đồ (ECG) tại chỗ",
          "Chỉ định gắn Holter điện tim 24h-48h để ghi nhận cơn loạn nhịp kịch phát",
          "Siêu âm tim kiểm tra cấu trúc cơ tim và van tim",
          "Xét nghiệm điện giải đồ và hormone tuyến giáp (nguyên nhân gây loạn nhịp phổ biến)",
          "Kết luận nguyên nhân và tư vấn kế hoạch điều trị lâu dài"
        ],
        candidates: [
          "Người có triệu chứng: hồi hộp, đánh trống ngực, cảm giác hụt nhịp, đau ngực không rõ nguyên nhân",
          "Người thường xuyên mệt mỏi, khó thở, chóng mặt, xây xẩm hoặc từng bị ngất xỉu",
          "Người có bệnh lý nền tăng huyết áp, đái tháo đường, cường giáp",
          "Bệnh nhân đã có tiền sử bệnh tim mạch (suy tim, bệnh mạch vành)",
          "Người cao tuổi (hệ dẫn truyền tim bị lão hóa)",
          "Người có lối sống căng thẳng mãn tính, lạm dụng rượu bia, thuốc lá",
          "Tiền sử gia đình có người bị rối loạn nhịp tim hoặc đột tử trẻ tuổi"
        ],
        price: "450.000 VNĐ",
        estimatedTime: "60 phút"
      }
    ]
  },
  {
    title: "Trụ cột II: Điều trị & Quản lý liên tục",
    tagline: "Chăm sóc định kỳ chuẩn y khoa",
    description: "Quản lý và điều trị chuyên sâu, liên tục các bệnh lý tim mạch mãn tính tại địa phương.",
    iconName: "Stethoscope",
    services: [
      {
        slug: "quan-ly-tang-huyet-ap",
        title: "Quản lý & điều trị Tăng huyết áp",
        pillarTitle: "Điều trị & Quản lý liên tục",
        tagline: "Kiểm soát an toàn, phòng ngừa đột quỵ",
        description: "Điều chỉnh liều thuốc huyết áp tối ưu và theo dõi sát sao chỉ số để tránh các biến chứng đột quỵ, suy tim.",
        detailedDescription: "Tăng huyết áp cần được quản lý suốt đời. Chương trình quản lý tăng huyết áp tại MediPlus HP giúp thiết lập phác đồ cá nhân hóa, tối ưu liều lượng thuốc dựa trên các nghiên cứu lâm sàng mới nhất, tránh tình trạng nhờn thuốc hoặc biến chứng suy thận, suy tim.",
        includes: [
          "Khám và theo dõi định kỳ hàng tháng với BSCKII Đoàn Khôi",
          "Đo ECG kiểm tra biến chứng dày thất trái hoặc thiếu máu cơ tim",
          "Đo Holter huyết áp định kỳ để đánh giá hiệu quả thuốc",
          "Điều chỉnh phối hợp thuốc huyết áp phù hợp với từng cá thể",
          "Xét nghiệm định kỳ kiểm tra chức năng thận (Creatinine, Ure) và điện giải máu",
          "Theo dõi sát sao chỉ số huyết áp bệnh nhân tự đo tại nhà qua ứng dụng",
          "Nhắc lịch tái khám tự động qua Zalo/SMS"
        ],
        candidates: [
          "Người mới phát hiện tăng huyết áp cần dò liều thuốc",
          "Bệnh nhân đang điều trị tăng huyết áp nhưng chỉ số chưa ổn định",
          "Người bệnh tăng huyết áp kèm nhiều bệnh nền phức tạp (tiểu đường, suy thận...)"
        ],
        price: "300.000 VNĐ / lần khám tái khám định kỳ (đã bao gồm ECG và xét nghiệm cơ bản)",
        estimatedTime: "30 - 45 phút"
      },
      {
        slug: "quan-ly-mo-mau",
        title: "Quản lý Rối loạn lipid máu (Mỡ máu)",
        pillarTitle: "Điều trị & Quản lý liên tục",
        tagline: "Dọn dẹp mảng xơ vữa trong lòng mạch",
        description: "Kiểm soát chỉ số mỡ xấu để ngăn ngừa mảng xơ vữa động mạch.",
        detailedDescription: "Rối loạn mỡ máu dẫn đến hình thành các mảng xơ vữa làm hẹp lòng mạch, cản trở máu nuôi tim và não. Chúng tôi quản lý chỉ số lipid máu thông qua xét nghiệm định kỳ nghiêm ngặt, điều trị statin liều tối ưu và kết hợp hướng dẫn chế độ ăn giảm béo lành mạnh.",
        includes: [
          "Khám chuyên khoa tim mạch định kỳ",
          "Xét nghiệm định kỳ các chỉ số Cholesterol, Triglyceride, LDL-C, HDL-C",
          "Xét nghiệm kiểm tra men gan (AST, ALT) và men cơ (CK) khi dùng thuốc hạ mỡ máu nhóm Statin",
          "Điều chỉnh thuốc hạ mỡ máu tối ưu nhằm đạt LDL-C mục tiêu theo mức độ nguy cơ",
          "Tư vấn dinh dưỡng hạn chế chất béo bão hòa từ chuyên gia y tế",
          "Theo dõi hiệu quả bảo vệ thành mạch máu lâu dài"
        ],
        candidates: [
          "Bệnh nhân đã bị xơ vữa mạch máu (tiền sử nhồi máu cơ tim, đột quỵ, đặt stent)",
          "Người bệnh đái tháo đường, tăng huyết áp hoặc bệnh thận mãn tính cần hạ mỡ máu ngặt nghèo",
          "Người bị tăng Cholesterol gia đình di truyền nặng từ trẻ",
          "Người có lối sống chưa khoa học (ít vận động, hút thuốc, uống rượu bia)"
        ],
        price: "350.000 VNĐ / đợt tái khám kiểm tra (đã gồm bộ xét nghiệm lipid máu đầy đủ)",
        estimatedTime: "30 phút"
      },
      {
        slug: "quan-ly-suy-tim-chuyen-sau",
        title: "Quản lý suy tim chuyên sâu",
        pillarTitle: "Điều trị & Quản lý liên tục",
        tagline: "Tăng sức bền và cải thiện chất lượng sống",
        description: "Theo dõi sát sao cân nặng, tình trạng khó thở và tối ưu hóa các nhóm thuốc điều trị suy tim nền tảng.",
        detailedDescription: "Bệnh nhân suy tim cần một phác đồ phối hợp thuốc chặt chẽ ('tứ trụ' trong điều trị suy tim) để giúp cơ tim phục hồi co bóp, giảm tỷ lệ nhập viện cấp cứu. MediPlus HP cung cấp chương trình quản lý suy tim chuyên biệt giúp kiểm soát triệu chứng khó thở, sưng phù chân và giữ nhịp sinh hoạt ổn định.",
        includes: [
          "Khám lâm sàng đánh giá tình trạng ứ dịch (phù chân, tĩnh mạch cổ nổi, tiếng ran ở phổi)",
          "Siêu âm tim định kỳ kiểm tra phân suất tống máu (EF) và áp lực động mạch phổi",
          "Xét nghiệm kiểm tra điện giải, creatinine máu đánh giá chức năng thận",
          "Tối ưu hóa các thuốc điều trị suy tim theo khuyến cáo mới nhất từ Hội Tim mạch học Việt Nam và Châu Âu",
          "Hướng dẫn bệnh nhân tự theo dõi cân nặng và lượng nước tiểu hàng ngày",
          "Tư vấn hạn chế muối và lượng nước nạp vào cơ thể chi tiết"
        ],
        candidates: [
          "Bệnh nhân suy tim phân suất tống máu giảm (HFrEF) hoặc bảo tồn (HFpEF)",
          "Bệnh nhân suy tim mãn tính sau khi ra viện cần ổn định phác đồ",
          "Người bệnh suy tim do tăng huyết áp, bệnh mạch vành hoặc bệnh cơ tim"
        ],
        price: "400.000 VNĐ / lần khám (đã bao gồm siêu âm tim Doppler kiểm tra)",
        estimatedTime: "40 - 50 phút"
      },
      {
        slug: "quan-ly-nguy-co-tim-mach-tieu-duong",
        title: "Quản lý nguy cơ tim mạch ở bệnh nhân đái tháo đường",
        pillarTitle: "Điều trị & Quản lý liên tục",
        tagline: "Bảo vệ kép Tim & Thận toàn diện",
        description: "Tập trung bảo vệ tim và thận cho người bệnh tiểu đường, giảm tỷ lệ tử vong do biến cố tim mạch.",
        detailedDescription: "Hơn 70% bệnh nhân tiểu đường tử vong do các biến cố tim mạch chứ không phải do đường huyết cao đơn thuần. Chúng tôi áp dụng các nhóm thuốc hạ đường huyết thế hệ mới có tác dụng bảo vệ tim mạch và bảo vệ thận vượt trội để giúp bệnh nhân đái tháo đường sống khỏe mạnh, không lo tai biến.",
        includes: [
          "Đánh giá ban đầu: Khám tim mạch chuyên khoa, siêu âm tim, đo ECG",
          "Gắn Holter điện tim hoặc Holter huyết áp khi có chỉ định lâm sàng",
          "Xét nghiệm định kỳ kiểm tra HbA1c, chức năng thận (eGFR), chỉ số albumin niệu (ACR)",
          "Phối hợp chặt chẽ với Bác sĩ Nội tiết của bệnh nhân để tối ưu phác đồ",
          "Ưu tiên lựa chọn các nhóm thuốc hạ đường huyết có lợi ích bảo vệ tim và thận (SGLT2i, GLP-1RA)",
          "Kiểm soát toàn diện các yếu tố đi kèm (Huyết áp, Mỡ máu)"
        ],
        candidates: [
          "Bệnh nhân đái tháo đường type 2 mới phát hiện",
          "Người bệnh tiểu đường lâu năm có nhiều yếu tố nguy cơ tim mạch",
          "Người tiểu đường đã có biến chứng thận (microalbumin niệu, suy thận nhẹ)",
          "Người tiểu đường đã có bệnh mạch vành hoặc tiền sử đột quỵ"
        ],
        price: "500.000 VNĐ / đợt đánh giá toàn diện (bao gồm các xét nghiệm chuyên sâu)",
        estimatedTime: "60 phút"
      }
    ]
  },
  {
    title: "Trụ cột III: Theo dõi từ xa & Cộng đồng",
    tagline: "Chăm sóc vượt giới hạn địa lý",
    description: "Chương trình chăm sóc sức khỏe tim mạch tại nhà và cộng đồng - điểm khác biệt lớn nhất của MediPlus HP.",
    iconName: "Activity",
    services: [
      {
        slug: "kham-tim-mach-cong-dong",
        title: "Khám tim mạch tại cộng đồng",
        pillarTitle: "Theo dõi từ xa & Cộng đồng",
        tagline: "Y khoa hướng về gia đình và bản bản xã",
        description: "Đoàn y bác sĩ mang thiết bị y tế đến trực tiếp nơi cư trú để thăm khám cho các đối tượng đặc biệt.",
        detailedDescription: "Đối với những bệnh nhân lớn tuổi, đi lại khó khăn hoặc đang trong giai đoạn phục hồi sau tai biến, MediPlus HP cung cấp dịch vụ thăm khám tại nhà ở Hải Phòng. Đội ngũ y tế mang theo thiết bị đo điện tim và siêu âm xách tay để đảm bảo bệnh nhân nhận được dịch vụ y khoa chất lượng ngay tại giường bệnh.",
        includes: [
          "Khám bệnh lâm sàng chuyên khoa tim mạch tận nơi",
          "Đo huyết áp bằng máy đo chuẩn hóa y khoa tự động",
          "Đo điện tâm đồ (ECG) 12 đầu cần tại chỗ và phân tích ngay",
          "Siêu âm tim bằng máy siêu âm xách tay hiện đại (nếu có chỉ định đặt trước)",
          "Tư vấn trực tiếp phác đồ tự chăm sóc, dinh dưỡng và điều trị tại nhà cho người thân"
        ],
        candidates: [
          "Người cao tuổi sức khỏe yếu khó tự di chuyển đến phòng khám",
          "Bệnh nhân bị liệt hoặc hạn chế vận động sau tai biến đột quỵ",
          "Khách hàng đăng ký gói dịch vụ VIP chăm sóc sức khỏe tại nhà",
          "Bệnh nhân vừa xuất viện sau mổ tim cần theo dõi sát những ngày đầu"
        ],
        price: "1.000.000 VNĐ - 1.500.000 VNĐ / lần khám (tùy khu vực nội ngoại thành Hải Phòng)",
        estimatedTime: "60 phút tại nhà"
      },
      {
        slug: "holter-dien-tim-24h-48h",
        title: "Đo Holter điện tim 24h/48h theo dõi",
        pillarTitle: "Theo dõi từ xa & Cộng đồng",
        tagline: "Bắt trọn mọi nhịp đập thầm lặng suốt ngày đêm",
        description: "Gắn thiết bị ghi điện tim liên tục trong 24-48 giờ để bắt được các cơn loạn nhịp tim thầm lặng hoặc kịch phát.",
        detailedDescription: "Nhiều cơn loạn nhịp tim nguy hiểm chỉ xuất hiện thoáng qua trong ngày và không thể phát hiện khi đo điện tim vài phút tại phòng khám. Thiết bị Holter điện tâm đồ nhỏ gọn sẽ được đeo trên ngực của bệnh nhân trong 24-48h để liên tục ghi lại mọi nhịp đập, giúp bác sĩ phát hiện chính xác các cơn loạn nhịp lúc ngủ, lúc gắng sức hoặc lúc mệt mỏi.",
        includes: [
          "Khám lâm sàng đánh giá chỉ định ban đầu",
          "Lắp đặt thiết bị Holter điện tim nhỏ gọn, không thấm nước trên ngực bệnh nhân",
          "Bệnh nhân ra về và sinh hoạt bình thường tại nhà, ghi chép nhật ký triệu chứng (nếu có)",
          "Tháo máy sau 24-48h và nạp dữ liệu điện tim vào phần mềm chuyên dụng tại phòng khám",
          "Bác sĩ chuyên khoa đọc kết quả, phân tích biểu đồ điện tim chi tiết",
          "Tư vấn kết quả chuyên sâu và kê đơn điều trị phù hợp"
        ],
        candidates: [
          "Người thường xuyên có cảm giác tim đập nhanh, bỏ nhịp, hồi hộp, đánh trống ngực",
          "Người bị chóng mặt, xây xẩm mặt mày, hoặc từng bị ngất xỉu chưa rõ nguyên nhân",
          "Bệnh nhân sau nhồi máu cơ tim hoặc bệnh cơ tim phì đại cần đánh giá nguy cơ đột tử",
          "Theo dõi hiệu quả của các nhóm thuốc chống loạn nhịp tim đang sử dụng"
        ],
        price: "600.000 VNĐ / 24 giờ đo (thiết bị nhập khẩu chính hãng)",
        estimatedTime: "24h - 48h đeo thiết bị liên tục"
      },
      {
        slug: "theo-doi-tim-mach-tu-xa",
        title: "Theo dõi tim mạch từ xa qua số hóa",
        pillarTitle: "Theo dõi từ xa & Cộng đồng",
        tagline: "Bác sĩ đồng hành bên bạn mọi lúc mọi nơi",
        description: "Bác sĩ đồng hành hàng ngày cùng chỉ số của người bệnh thông qua các kênh liên lạc số và thiết bị cá nhân.",
        detailedDescription: "Một dịch vụ đột phá của MediPlus HP giúp kết nối liên tục giữa bác sĩ và bệnh nhân. Không chỉ gặp nhau khi đi khám bệnh, các chỉ số huyết áp, nhịp tim hàng ngày của bạn sẽ được theo dõi, phân tích bởi bác sĩ để kịp thời điều chỉnh lối sống, phát hiện bất thường trước khi xảy ra biến cố.",
        includes: [
          "Thiết lập hồ sơ sức khỏe điện tử cá nhân bảo mật trên hệ thống phòng khám",
          "Hướng dẫn người bệnh tự đo huyết áp và nhịp tim tại nhà đúng cách và chọn thiết bị chuẩn",
          "Nhận và phân tích chỉ số huyết áp/nhịp tim bệnh nhân gửi hàng tuần qua Zalo/Điện thoại",
          "Bác sĩ trực tiếp tư vấn qua Điện thoại/Zalo khi các chỉ số có biến động bất thường",
          "Nhắc lịch uống thuốc định kỳ và gửi tin nhắn nhắc lịch tái khám tự động",
          "Điều chỉnh khẩn cấp lịch khám trực tiếp nếu phát hiện dấu hiệu tim mạch bất thường"
        ],
        candidates: [
          "Bệnh nhân đang trong chương trình quản lý tim mạch lâu dài của phòng khám",
          "Bệnh nhân tim mạch vừa xuất viện cần giám sát chặt chẽ giai đoạn đầu tại nhà",
          "Bệnh nhân sau can thiệp mạch vành (đặt stent), thay van tim hoặc tim bẩm sinh cần theo dõi phục hồi"
        ],
        price: "200.000 VNĐ / tháng quản lý theo dõi từ xa",
        estimatedTime: "Theo dõi liên tục hàng tháng"
      }
    ]
  }
];

export const allServices: ServiceDetail[] = servicePillars.flatMap(p => p.services);
