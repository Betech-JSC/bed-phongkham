export interface NewsItem {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: "Kiến thức tim mạch" | "Tin tức phòng khám" | "Hướng dẫn điều trị";
  readTime: string;
  image: string;
}

export const newsList: NewsItem[] = [
  {
    slug: "nhan-biet-tang-huyet-ap-am-tham",
    title: "Nhận biết sớm dấu hiệu tăng huyết áp âm thầm và cách phòng ngừa",
    excerpt: "Tăng huyết áp thường không có triệu chứng rõ rệt nhưng lại gây ra biến chứng cực kỳ nguy hiểm như tai biến mạch máu não và suy tim.",
    content: `
      <p>Tăng huyết áp (huyết áp cao) được gọi là "kẻ giết người thầm lặng" vì bệnh tiến triển mà không có bất kỳ triệu chứng cảnh báo nào. Nhiều người chỉ phát hiện ra mình bị tăng huyết áp khi đã gặp phải những biến chứng nghiêm trọng như đột quỵ, nhồi máu cơ tim hoặc suy thận.</p>
      
      <h3>1. Tăng huyết áp là gì?</h3>
      <p>Huyết áp là áp lực của dòng máu lên thành động mạch nhằm đưa máu đi nuôi cơ thể. Theo hướng dẫn điều trị của Bộ Y tế Việt Nam và Hội Tim mạch học, một người được chẩn đoán tăng huyết áp khi chỉ số huyết áp tâm thu ≥ 140 mmHg và/hoặc huyết áp tâm trương ≥ 90 mmHg đo tại phòng khám.</p>
      
      <h3>2. Những dấu hiệu cảnh báo cần lưu ý</h3>
      <p>Dù đa số không có triệu chứng, một số bệnh nhân có thể gặp các biểu hiện thoáng qua như:</p>
      <ul>
        <li>Đau đầu, đặc biệt là đau vùng chẩm (sau gáy) vào buổi sáng sớm.</li>
        <li>Chóng mặt, hoa mắt, hoặc có cảm giác mất thăng bằng nhẹ.</li>
        <li>Ù tai, khó thở khi gắng sức nhẹ.</li>
        <li>Chảy máu cam không rõ nguyên nhân.</li>
        <li>Mệt mỏi kéo dài, giảm khả năng tập trung làm việc.</li>
      </ul>
      
      <h3>3. Cách phòng ngừa tăng huyết áp hiệu quả</h3>
      <p>Để bảo vệ bản thân và gia đình khỏi căn bệnh nguy hiểm này, BSCKII Đoàn Khôi khuyến nghị thực hiện lối sống lành mạnh:</p>
      <ul>
        <li><strong>Hạn chế muối:</strong> Ăn nhạt hơn, lượng muối nạp vào cơ thể dưới 5g mỗi ngày (khoảng 1 thìa cà phê). Hạn chế thực phẩm chế biến sẵn, dưa cà muối.</li>
        <li><strong>Chế độ ăn nhiều rau xanh:</strong> Tăng cường ăn rau quả, ngũ cốc nguyên hạt, cá và các nguồn chất béo lành mạnh (dầu ô liu, các loại hạt).</li>
        <li><strong>Duy trì cân nặng hợp lý:</strong> Giảm cân nếu bị thừa cân hoặc béo phì. Cố gắng giữ chỉ số khối cơ thể (BMI) từ 18.5 đến 23.</li>
        <li><strong>Luyện tập thể chất:</strong> Tập thể dục đều đặn ít nhất 30 phút mỗi ngày (đi bộ nhanh, chạy bộ nhẹ, bơi lội...) từ 5-7 ngày mỗi tuần.</li>
        <li><strong>Hạn chế bia rượu và bỏ hoàn toàn thuốc lá:</strong> Chất độc trong thuốc lá trực tiếp hủy hoại thành mạch máu, làm tăng nhanh quá trình xơ vữa.</li>
        <li><strong>Kiểm soát căng thẳng:</strong> Tránh lo âu quá mức, ngủ đủ giấc từ 7-8 tiếng mỗi ngày.</li>
      </ul>
      
      <h3>4. Tầm quan trọng của việc tự đo huyết áp và khám tầm soát</h3>
      <p>Cách duy nhất để biết chính xác bạn có bị tăng huyết áp hay không là <strong>đo huyết áp định kỳ</strong>. Người trên 35 tuổi nên đi khám tầm soát tim mạch tối thiểu 1 lần mỗi năm để bác sĩ đánh giá các yếu tố nguy cơ tim mạch tổng thể và phát hiện bệnh kịp thời.</p>
    `,
    date: "2026-07-15",
    author: "BSCKII Đoàn Khôi",
    category: "Kiến thức tim mạch",
    readTime: "5 phút đọc",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60"
  },
  {
    slug: "khi-nao-can-do-holter-dien-tim-24h",
    title: "Khi nào bạn cần đo Holter điện tâm đồ 24h-48h liên tục?",
    excerpt: "Holter điện tâm đồ là thiết bị ghi lại hoạt động điện học của tim liên tục trong 24 đến 48 giờ tại nhà, giúp phát hiện các rối loạn nhịp tim thoáng qua.",
    content: `
      <p>Trong quá trình thăm khám tim mạch, nhiều bệnh nhân chia sẻ họ thường xuyên bị hồi hộp, trống ngực hoặc hụt nhịp khi ở nhà. Tuy nhiên, khi đến phòng khám và đo điện tâm đồ (ECG) thông thường trong khoảng 1-2 phút, kết quả lại hoàn toàn bình thường. Đó là lý do phương pháp đo Holter điện tâm đồ ra đời.</p>
      
      <h3>1. Đo Holter điện tâm đồ là gì?</h3>
      <p>Holter điện tâm đồ là một thiết bị y khoa nhỏ gọn, chạy bằng pin được đeo trên người bệnh nhân thông qua các điện cực dán trên ngực. Thiết bị này sẽ liên tục ghi nhận hoạt động điện tim của bạn trong suốt 24 giờ đến 48 giờ (bao gồm cả khi bạn làm việc, tập luyện, ăn uống và đi ngủ) trong điều kiện sinh hoạt bình thường tại nhà.</p>
      
      <h3>2. Khi nào bác sĩ chỉ định gắn Holter điện tim?</h3>
      <p>BSCKII Đoàn Khôi chỉ định gắn Holter điện tâm đồ trong các trường hợp sau:</p>
      <ul>
        <li><strong>Có triệu chứng nghi ngờ loạn nhịp:</strong> Cảm giác hồi hộp, đánh trống ngực, nhịp tim đập nhanh kịch phát hoặc cảm giác tim bỏ nhịp xuất hiện rải rác trong ngày.</li>
        <li><strong>Chóng mặt hoặc ngất xỉu không rõ nguyên nhân:</strong> Loại trừ khả năng ngất do tim đập quá chậm (block nhĩ thất) hoặc quá nhanh (nhịp nhanh thất).</li>
        <li><strong>Tầm soát cơn Rung nhĩ ẩn giấu:</strong> Đặc biệt quan trọng ở bệnh nhân bị đột quỵ não không rõ nguyên nhân hoặc bệnh nhân suy tim.</li>
        <li><strong>Đánh giá hiệu quả điều trị:</strong> Kiểm tra xem các thuốc chống loạn nhịp tim đang dùng có kiểm soát được nhịp tim hay không.</li>
        <li><strong>Đánh giá nguy cơ đột tử:</strong> Ở những bệnh nhân suy tim nặng hoặc sau nhồi máu cơ tim có tổn thương cơ tim nhiều.</li>
      </ul>
      
      <h3>3. Những lưu ý khi đeo máy Holter điện tim tại nhà</h3>
      <p>Để đảm bảo kết quả đo chính xác nhất, người bệnh cần lưu ý một số điểm sau:</p>
      <ul>
        <li><strong>Tránh làm ướt thiết bị:</strong> Bệnh nhân không được tắm, bơi lội hoặc làm bắn nước vào máy. Nên tắm rửa sạch sẽ trước khi đến phòng khám lắp đặt máy.</li>
        <li><strong>Không tự ý tháo máy:</strong> Không được bóc các điện cực dán trên ngực hoặc rút dây cáp kết nối trừ khi có hướng dẫn chi tiết của nhân viên y tế.</li>
        <li><strong>Ghi chép nhật ký triệu chứng:</strong> Ghi lại chính xác thời gian xảy ra các triệu chứng (như hồi hộp, khó thở, chóng mặt) và hoạt động lúc đó để bác sĩ đối chiếu với biểu đồ điện tim ghi nhận được.</li>
        <li><strong>Tránh xa các thiết bị từ trường mạnh:</strong> Tránh dùng máy dò kim loại, đệm điện hoặc đứng quá gần lò vi sóng đang hoạt động. Điện thoại di động vẫn có thể sử dụng bình thường nhưng tránh để quá sát ngực.</li>
      </ul>
      
      <p>Kết quả từ máy Holter điện tâm đồ sẽ cung cấp một bức tranh toàn cảnh về nhịp tim của bạn, giúp bác sĩ chẩn đoán chính xác và đưa ra phác đồ điều trị kịp thời bảo vệ trái tim của bạn.</p>
    `,
    date: "2026-07-10",
    author: "BSCKII Đoàn Khôi",
    category: "Hướng dẫn điều trị",
    readTime: "6 phút đọc",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=800&auto=format&fit=crop&q=60"
  },
  {
    slug: "dinh-duong-lanh-manh-cho-nguoi-suy-tim",
    title: "Chế độ dinh dưỡng lành mạnh giúp giảm gánh nặng cho người suy tim",
    excerpt: "Dinh dưỡng đóng vai trò cốt lõi trong việc quản lý suy tim mãn tính, giúp cải thiện sức co bóp cơ tim và giảm tỷ lệ phù nề, nhập viện.",
    content: `
      <p>Đối với bệnh nhân suy tim, việc tuân thủ phác đồ thuốc là chưa đủ. Một chế độ ăn uống khoa học được thiết kế riêng có vai trò cực kỳ quan trọng giúp giảm bớt gánh nặng làm việc cho cơ tim vốn đã suy yếu, ngăn chặn tình trạng ứ nước gây khó thở và nâng cao chất lượng cuộc sống.</p>
      
      <h3>1. Quy tắc hàng đầu: Giảm muối (Natri)</h3>
      <p>Muối giữ nước trong cơ thể. Khi lượng nước trong máu tăng lên, tim phải đập mạnh hơn để bơm máu, dẫn đến tình trạng suy tim tiến triển nặng hơn, gây phù chân, tràn dịch màng phổi và khó thở dữ dội.</p>
      <ul>
        <li>Lượng Natri khuyến cáo cho người suy tim nhẹ là dưới 2.000 mg/ngày (tương đương 1 thìa cà phê muối gạt). Với suy tim nặng, con số này có thể cần giảm xuống dưới 1.500 mg/ngày.</li>
        <li>Không thêm muối hoặc gia vị mặn (nước mắm, hạt nêm, mì chính) khi nấu ăn và tại bàn ăn. Nên dùng các loại thảo mộc, chanh, tỏi, ớt để làm tăng hương vị tự nhiên của món ăn.</li>
        <li>Hạn chế tối đa các thực phẩm muối chua (dưa cải, cà muối), các loại hạt sấy muối, giò chả, lạp xưởng và thực phẩm đóng hộp.</li>
      </ul>
      
      <h3>2. Kiểm soát lượng nước nạp vào cơ thể</h3>
      <p>Bệnh nhân suy tim trung bình và nặng thường gặp khó khăn trong việc đào thải nước dư thừa qua thận. Việc nạp quá nhiều nước sẽ gây ứ dịch nhanh chóng.</p>
      <ul>
        <li>Lượng nước uống hàng ngày (bao gồm nước lọc, canh, súp, sữa, nước hoa quả) nên dao động từ 1.5 đến 2 lít đối với người suy tim nhẹ.</li>
        <li>Đối với suy tim nặng hoặc có tình trạng phù, lượng nước cần hạn chế ngặt nghèo hơn theo chỉ định trực tiếp của bác sĩ (khoảng 1.2 - 1.5 lít/ngày).</li>
      </ul>
      
      <h3>3. Bổ sung các nhóm chất có lợi cho tim</h3>
      <p>Người bệnh nên ưu tiên các thực phẩm chứa nhiều chất xơ, kali, magie và chất béo không bão hòa:</p>
      <ul>
        <li><strong>Rau xanh và quả chín:</strong> Cung cấp vitamin và chất xơ, giúp chống táo bón (tránh gắng sức khi đi ngoài làm tăng áp lực đột ngột lên tim). Chú ý bổ sung quả giàu Kali (chuối, bơ, cam) nếu đang dùng thuốc lợi tiểu thải Kali.</li>
        <li><strong>Cá béo:</strong> Cá hồi, cá thu, cá trích chứa nhiều Axit béo Omega-3 giúp bảo vệ cơ tim, kháng viêm và giảm nguy cơ rối loạn nhịp.</li>
        <li><strong>Ngũ cốc nguyên hạt:</strong> Yến mạch, gạo lứt giúp kiểm soát đường huyết và cholesterol máu hiệu quả.</li>
      </ul>
      
      <p>Hãy nhớ rằng việc thay đổi chế độ dinh dưỡng cần thực hiện từ từ để cơ thể thích nghi. Bệnh nhân nên tự theo dõi cân nặng hàng ngày vào buổi sáng sau khi đi tiểu. Nếu cân nặng tăng đột ngột hơn 1-1.5kg trong 2 ngày, đó có thể là dấu hiệu cơ thể bị tích nước và cần liên hệ ngay với bác sĩ điều trị.</p>
    `,
    date: "2026-07-05",
    author: "BSCKII Đoàn Khôi",
    category: "Kiến thức tim mạch",
    readTime: "5 phút đọc",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=60"
  },
  {
    slug: "ung-dung-so-hoa-trong-quan-ly-huyet-ap",
    title: "Ứng dụng công nghệ số và AI trong quản lý tăng huyết áp tại nhà",
    excerpt: "Phòng khám MediPlus HP tiên phong ứng dụng phần mềm số hóa để theo dõi liên tục huyết áp của người bệnh từ xa, giảm thiểu biến chứng đột quỵ.",
    content: `
      <p>Sự phát triển của công nghệ y tế số hóa và trí tuệ nhân tạo (AI) đang thay đổi hoàn toàn cách chúng ta quản lý sức khỏe. Tại MediPlus HP, chúng tôi tự hào là đơn vị tiên phong ứng dụng giải pháp theo dõi huyết áp và tim mạch từ xa qua số hóa dữ liệu, giúp bác sĩ đồng hành cùng người bệnh 24/7.</p>
      
      <h3>1. Hạn chế của việc khám bệnh truyền thống</h3>
      <p>Thông thường, người bệnh tăng huyết áp chỉ đi khám 1 tháng 1 lần. Bác sĩ chỉ có thể đưa ra quyết định điều chỉnh thuốc dựa trên một vài chỉ số huyết áp đo được tại thời điểm khám. Tuy nhiên, huyết áp dao động liên tục theo thời tiết, mức độ căng thẳng, giấc ngủ và chế độ ăn. Đo huyết áp thưa thớt dễ dẫn đến việc bỏ sót các cơn huyết áp cao vọt về đêm hoặc sáng sớm – thời điểm vàng xảy ra đột quỵ.</p>
      
      <h3>2. Giải pháp theo dõi số hóa từ xa của MediPlus HP</h3>
      <p>Bệnh nhân tham gia chương trình theo dõi số hóa sẽ được:</p>
      <ul>
        <li><strong>Tạo hồ sơ bệnh án điện tử trực tuyến:</strong> Mọi thông số sức khỏe được lưu trữ bảo mật trên đám mây.</li>
        <li><strong>Gửi chỉ số huyết áp hàng ngày:</strong> Người bệnh tự đo huyết áp bằng máy đo chuẩn hóa tại nhà, sau đó gửi chỉ số qua kênh liên lạc chuyên dụng Zalo/App.</li>
        <li><strong>Hệ thống phân tích và cảnh báo thông minh:</strong> AI sẽ tự động phân tích biểu đồ biến thiên huyết áp. Nếu phát hiện chỉ số vượt ngưỡng an toàn hoặc có xu hướng tăng dần, hệ thống sẽ phát tín hiệu cảnh báo đến đội ngũ y tế.</li>
      </ul>
      
      <h3>3. Bác sĩ đồng hành và can thiệp kịp thời</h3>
      <p>Khi nhận được cảnh báo hoặc chỉ số biến động từ hệ thống, BSCKII Đoàn Khôi và các trợ lý y tế sẽ liên hệ trực tiếp với người bệnh qua cuộc gọi để kiểm tra sức khỏe, hướng dẫn dùng thuốc cấp cứu hoặc điều chỉnh liều thuốc ngay mà không cần đợi đến lịch tái khám định kỳ.</p>
      
      <p>Việc số hóa quản lý huyết áp giúp tỷ lệ bệnh nhân kiểm soát đạt huyết áp mục tiêu tại phòng khám tăng từ 55% lên 85%, giảm đáng kể tỷ lệ nhập viện cấp cứu do biến cố tim mạch. Đây chính là tương lai của y tế thông minh – y tế chủ động và dự phòng sớm.</p>
    `,
    date: "2026-06-28",
    author: "BSCKII Đoàn Khôi",
    category: "Tin tức phòng khám",
    readTime: "4 phút đọc",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=60"
  }
];
