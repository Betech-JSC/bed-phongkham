import React from "react";
import { Link } from "@inertiajs/react";
import SEOHead from "@/Components/SEOHead";
import { motion } from "motion/react";
import { 
  Award, 
  BookOpen, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Stethoscope,
  Search,
  RefreshCw,
  Home,
  Target,
  Activity,
  Cpu,
  Users,
  Smartphone,
  HeartPulse,
  MonitorCheck
} from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  avatar: string;
  bio?: string;
  detailed_bio?: string;
}

interface Faq {
  id: number;
  question: string;
  answer: string;
}

interface Props {
  settings?: Record<string, string>;
  doctors?: Doctor[];
  faqs?: Faq[];
}

export default function About({ settings = {}, doctors = [], faqs = [] }: Props) {
  const missionStandards = [
    {
      step: "01",
      title: "Phát hiện sớm bệnh lý tim mạch",
      desc: "Khám chuyên khoa, xét nghiệm, ECG, Holter điện tim dài ngày và siêu âm giúp phát hiện yếu tố nguy cơ tim mạch ở giai đoạn sớm nhất."
    },
    {
      step: "02",
      title: "Điều trị đúng và kịp thời",
      desc: "Đội ngũ bác sĩ chuyên môn giỏi, áp dụng y học chứng cứ, quy trình chuẩn y khoa và minh bạch phác đồ điều trị."
    },
    {
      step: "03",
      title: "Theo dõi liên tục ngoài bệnh viện",
      desc: "Holter điện tim CAI-300 theo dõi liên tục đến 14 ngày, Holter huyết áp và thiết bị theo dõi tại nhà để quản lý lâu dài bệnh mạn tính."
    },
    {
      step: "04",
      title: "Kết nối chuyên gia tuyến Trung ương",
      desc: "Hợp tác hội chẩn với các chuyên gia tim mạch và nội khoa tại các bệnh viện tuyến Trung ương; hỗ trợ kết nối và theo dõi sau chuyển tuyến."
    },
    {
      step: "05",
      title: "Đồng hành lâu dài cùng người bệnh",
      desc: "Nhắc tái khám định kỳ, tư vấn dinh dưỡng, thay đổi lối sống và đồng hành xuyên suốt hành trình bảo vệ sức khỏe tim mạch."
    }
  ];

  const careModels = [
    { title: "Khám và đánh giá toàn diện", desc: "Thăm khám chuyên khoa đầy đủ, không bỏ sót các yếu tố nguy cơ tiềm ẩn." },
    { title: "Phát hiện sớm các yếu tố nguy cơ", desc: "Tầm soát và cảnh báo sớm trước khi các bệnh lý tim mạch tiến triển nặng." },
    { title: "Theo dõi bằng phương tiện hiện đại", desc: "Trang bị Holter ECG CAI-300 (đến 14 ngày), Holter huyết áp và thiết bị theo dõi tại nhà." },
    { title: "Quản lý lâu dài các bệnh mạn tính", desc: "Đồng hành kiểm soát bệnh liên tục, lập hồ sơ số hóa và nhắc lịch tái khám định kỳ." },
    { title: "Nhắc tái khám định kỳ", desc: "Hệ thống nhắc lịch tự động giúp người bệnh duy trì lộ trình điều trị đúng và đủ." },
    { title: "Tư vấn ăn uống dinh dưỡng & lối sống", desc: "Hướng dẫn chi tiết chế độ ăn, tập luyện và thay đổi thói quen bảo vệ tim mạch." },
    { title: "Kết nối chuyên gia khi cần", desc: "Hội chẩn trực tiếp với các chuyên gia tuyến Trung ương và hỗ trợ chuyển tuyến kịp thời." },
    { title: "Đồng hành trong suốt quá trình", desc: "Không chỉ khám hôm nay mà theo dõi, tư vấn và chăm sóc sức khỏe lâu dài." }
  ];

  const facilities = [
    {
      title: "Siêu âm tim Doppler màu chuyên sâu",
      desc: "Đánh giá cấu trúc, chức năng tim, phân xuất tống máu (EF), phát hiện sớm các bệnh lý van tim và cơ tim."
    },
    {
      title: "Siêu âm mạch máu",
      desc: "Khảo sát hệ thống mạch máu ngoại biên, phát hiện sớm xơ vữa động mạch, hẹp tắc mạch và biến chứng."
    },
    {
      title: "Điện tâm đồ (ECG)",
      desc: "Ghi nhận hoạt động điện của tim, phát hiện rối loạn nhịp tim, thiếu máu cơ tim và các bất thường cấu trúc."
    },
    {
      title: "Holter điện tim dài ngày CAI-300 (Đến 14 ngày)",
      desc: "Công nghệ tiên phong theo dõi điện tim liên tục lên đến 14 ngày, phát hiện rối loạn nhịp tim xuất hiện không thường xuyên hoặc vào ban đêm."
    },
    {
      title: "Holter huyết áp theo dõi 24h (ABPM)",
      desc: "Theo dõi sự biến thiên huyết áp liên tục trong 24 giờ, chẩn đoán chính xác tăng huyết áp ẩn dấu và áo choàng trắng."
    },
    {
      title: "Thiết bị theo dõi điện tim tại nhà",
      desc: "Hỗ trợ người bệnh theo dõi chỉ số tim mạch ngay tại nhà và gửi dữ liệu số hóa trực tiếp cho bác sĩ phân tích từ xa."
    },
    {
      title: "Hệ thống xét nghiệm & Lấy mẫu tại nhà",
      desc: "Hệ thống xét nghiệm chuyên nghiệp đánh giá nguy cơ tim mạch, mỡ máu, tiểu đường và dịch vụ lấy mẫu tại nhà khi cần."
    }
  ];

  return (
    <MainLayout>
      <SEOHead 
        title="Giới thiệu Bác sĩ & Phòng Khám"
        description="Thông tin giới thiệu về BSCKII Đoàn Khôi - Chuyên gia Nội Tim Mạch với hơn 20 năm kinh nghiệm khám và điều trị tại các bệnh viện lớn."
        schema={{
          "@context": "https://schema.org",
          "@type": "Physician",
          "name": "BSCKII Đoàn Khôi",
          "medicalSpecialty": "Cardiovascular",
          "description": "Bác sĩ Chuyên khoa II Nội Tim mạch hơn 20 năm kinh nghiệm điều trị các bệnh lý tim mạch, tăng huyết áp, suy tim và đột quỵ.",
          "hospitalAffiliation": {
            "@type": "MedicalClinic",
            "name": "Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi"
          }
        }}
      />
      <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
        
        {/* Page Header */}
        <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
          <img
            src={settings.about_main_image || "/assets/about_banner.jpg"}
            alt="Giới thiệu banner"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-slate-950/50 pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
            <span className="text-sm sm:text-base md:text-lg font-bold tracking-wider text-white bg-white/20 px-6 py-2 rounded-full border border-white/30 shadow-sm backdrop-blur-xs">
              {settings.about_eyebrow || "Phòng khám Chuyên khoa Nội - BSCK. II Đoàn Khôi"}
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
              {settings.about_title || "TRUNG TÂM TIM MẠCH SỐ & QUẢN LÝ TIM MẠCH CỘNG ĐỒNG"}
            </h1>
          </div>
        </section>

        {/* Doctor Bio Section (ĐỘI NGŨ CHUYÊN GIA - GIỮ NGUYÊN) */}
        <section className="bg-white overflow-hidden py-16 md:py-20 border-b border-slate-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-10">
              
              {/* Top Header */}
              <div className="flex flex-col items-center text-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary">Giới thiệu đội ngũ</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  ĐỘI NGŨ CHUYÊN GIA
                </h2>
                <div className="w-16 h-1 bg-secondary rounded-full mt-1" />
              </div>

              {/* Main Doctor Profile Container (BỎ BORDER CARD) */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start py-2">
                
                {/* Doctor Image & Quick Info (BỎ TEXT DƯỚI ẢNH BÁC SĨ, PHỐNG TO ẢNH BÁC SĨ) */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-full lg:w-80 shrink-0 flex flex-col gap-4 items-center lg:items-start text-center lg:text-left"
                >
                  <div className="relative w-full aspect-[3/4] max-w-[320px] rounded-2xl overflow-hidden shadow-xs bg-slate-100">
                    <img
                      src={doctors[0]?.avatar || "/assets/doctor_khoi.png"}
                      alt={doctors[0]?.name || "BSCKII. Đoàn Văn Khôi"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Doctor Detailed Bio Content */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex-1 flex flex-col gap-6 text-sm text-text-primary leading-relaxed"
                >
                  
                  {/* Name Header */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-primary">
                      {doctors[0]?.name || "BSCKII. Đoàn Văn Khôi"}
                    </h3>
                    <p className="text-sm font-bold text-secondary uppercase tracking-wider mt-1">
                      {doctors[0]?.specialty || "Bác sĩ Nội khoa – Chuyên sâu Tim mạch"}
                    </p>
                  </div>

                  {doctors[0]?.detailed_bio ? (
                    <div 
                      className="space-y-4"
                      dangerouslySetInnerHTML={{ __html: doctors[0].detailed_bio }}
                    />
                  ) : (
                    <>
                      {/* Paragraph 1 */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        BSCKII Đoàn Khôi được đào tạo bài bản tại Trường Đại học Y Hà Nội, có gần 20 năm kinh nghiệm trong lĩnh vực Nội khoa – Tim mạch. Không chỉ trực tiếp khám và điều trị người bệnh, bác sĩ còn có nhiều năm đảm nhiệm các vị trí lãnh đạo chuyên môn tại bệnh viện tuyến tỉnh và Sở Y tế, tham gia quản lý chất lượng khám chữa bệnh, phát triển hệ thống y tế cơ sở và triển khai các chương trình phòng chống bệnh không lây nhiễm.
                      </p>

                      {/* Paragraph 2 */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        Sự kết hợp giữa kinh nghiệm lâm sàng, quản lý y tế và kết nối chuyên môn là nền tảng để xây dựng mô hình chăm sóc tim mạch cộng đồng hiện đại. Trung tâm đồng thời duy trì hợp tác chuyên môn với các chuyên gia tim mạch và nội khoa tại nhiều cơ sở y tế tuyến Trung ương, tạo điều kiện để người bệnh được tiếp cận với các ý kiến chuyên môn khi cần thiết.
                      </p>

                      {/* Paragraph 3 */}
                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                        Trung tâm tập trung phát triển chuyên sâu trong các lĩnh vực: Tăng huyết áp, Rối loạn nhịp tim, Rung nhĩ, Bệnh mạch vành, Suy tim, Đau ngực, Khó thở, Theo dõi sau đặt stent và sau điều trị tại bệnh viện; Đánh giá nguy cơ đột quỵ; Quản lý các yếu tố nguy cơ tim mạch, Rối loạn lipid máu, Đái tháo đường, Thừa cân béo phì và các bệnh mạn tính ở người cao tuổi.
                      </p>

                      {/* Quote */}
                      <div className="border-l-4 border-secondary bg-slate-50 p-4 rounded-r-xl italic text-primary font-bold text-sm sm:text-base my-1">
                        &ldquo;Trái tim chỉ có một - Hãy chủ động bảo vệ từ hôm nay.&rdquo;
                      </div>
                    </>
                  )}

                </motion.div>

              </div>

              {/* Sub-sections: Cooperation & Working Motto Grid */}
              <div className="flex flex-col gap-10 pt-6 border-t border-slate-100">
                
                {/* Hospital Cooperation (HỢP TÁC CHUYÊN GIA TỪ) */}
                <div className="flex flex-col gap-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                    <Building2 size={18} className="text-secondary" />
                    HỢP TÁC CHUYÊN GIA TỪ
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
                    {[
                      { name: "Viện Tim mạch Việt Nam", logo: "/assets/logo_vien_tim.png" },
                      { name: "BV Trung ương Quân đội 108", logo: "/assets/logo_bv_108.png" },
                      { name: "Bệnh viện Tim Hà Nội", logo: "/assets/logo_bv_tim_hn.png" },
                      { name: "Bệnh viện Vinmec Times City", logo: "/assets/logo_vinmec.png" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center justify-center text-center gap-3 group">
                        <div className="h-16 w-full flex items-center justify-center p-1">
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <span className="text-sm font-bold text-primary leading-snug">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Working Motto (PHƯƠNG CHÂM LÀM VIỆC - HÌNH BÊN PHẢI TO RA CÂN ĐỐI LAYOUT) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-100">
                  <div className="md:col-span-6 flex flex-col gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-secondary flex items-center gap-2">
                      <Stethoscope size={20} className="text-secondary" />
                      PHƯƠNG CHÂM LÀM VIỆC
                    </h3>
                    <p className="text-base sm:text-lg font-bold text-primary italic leading-relaxed bg-slate-50 p-5 rounded-2xl border-l-4 border-secondary shadow-2xs whitespace-pre-line">
                      {settings.about_founder_quote ? settings.about_founder_quote : "Phát hiện sớm – Theo dõi liên tục\nCan thiệp kịp thời – Đồng hành lâu dài."}
                    </p>
                  </div>

                  <div className="md:col-span-6 w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-xs bg-slate-100">
                    <img
                      src={settings.about_story_img1 || "/assets/heart_ultrasound.png"}
                      alt="Hình ảnh siêu âm tim bác sĩ thực hiện"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* SECTION MỚI: SỨ MỆNH & TẦM NHÌN (HƠN CẢ KHÁM BỆNH - ĐỊNH VỊ HUB TIM MẠCH - TONE SÁNG Y TẾ) */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-50 via-teal-50/30 to-blue-50/20 border-y border-slate-200/70 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col gap-14">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                SỨ MỆNH & TẦM NHÌN DÀI HẠN
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full mt-1" />
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 font-medium">
                Xây dựng hệ sinh thái chăm sóc sức khỏe tim mạch chuẩn y khoa, chủ động và toàn diện ngay tại địa phương.
              </p>
            </div>

            {/* Sứ mệnh - 5 Tiêu chuẩn cốt lõi Grid */}
            <div className="flex flex-col gap-6">

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {missionStandards.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white border border-slate-200/80 hover:border-secondary/60 rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-secondary font-mono">
                        {item.step}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-primary leading-snug group-hover:text-secondary-dark transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tầm nhìn dài hạn Banner - HUB TIM MẠCH CỘNG ĐỒNG KHU VỰC (MÀU BRAND XANH PRIMARY, BỎ ICON) */}
            <div className="bg-gradient-to-r from-primary via-primary-dark to-primary text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 justify-between shadow-xl border border-primary/20">
              <div className="flex-1 flex flex-col gap-3">
                <div>
                  <span className="text-sm font-bold uppercase tracking-widest text-secondary bg-white px-4 py-1.5 rounded-full shadow-2xs">
                    Mục tiêu dài hạn
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  TRỞ THÀNH &ldquo;HUB TIM MẠCH CỘNG ĐỒNG KHU VỰC&rdquo;
                </h3>
                <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-light">
                  Xây dựng trung tâm tim mạch chuyên sâu uy tín tại khu vực Hải Phòng; tiên phong trong ứng dụng công nghệ số, theo dõi tim mạch từ xa và quản lý bệnh mạn tính. Từng bước trở thành trung tâm kết nối chuyên môn giữa y tế cơ sở và các chuyên gia tim mạch tuyến Trung ương.
                </p>
              </div>

              <div className="shrink-0">
                <Link
                  href="/lien-he"
                  className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-btn shadow-md transition-all hover:scale-103"
                >
                  <HeartPulse size={18} />
                  Đồng hành cùng chúng tôi
                </Link>
              </div>
            </div>

            {/* MÔ HÌNH CHĂM SÓC KHÁC BIỆT - LAYOUT TRÁI PHẢI */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-4">
              {/* Bên trái: Hình ảnh bác sĩ chăm sóc bệnh nhân */}
              <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-sm bg-slate-100 min-h-[420px] h-full">
                <img
                  src={settings.about_care_image || "/assets/doctor_caring_patient.png"}
                  alt="Bác sĩ thăm khám bệnh nhân"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/doctor_caring_patient.png'; }}
                />
              </div>

              {/* Bên phải: Tiêu đề MÔ HÌNH CHĂM SÓC KHÁC BIỆT + 8 điểm */}
              <div className="lg:col-span-7 flex flex-col justify-center gap-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight pb-1 border-b-2 border-secondary/30 uppercase">
                    {settings.about_care_title || "MÔ HÌNH CHĂM SÓC KHÁC BIỆT"}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 italic">
                    {settings.about_care_desc || "Khác với mô hình khám bệnh truyền thống, Trung tâm hướng tới xây dựng hệ thống quản lý sức khỏe tim mạch liên tục, lấy người bệnh làm trung tâm và đồng hành trong suốt hành trình bảo vệ trái tim."}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {careModels.map((c, i) => (
                    <div key={i} className="flex flex-col gap-1 bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs hover:border-secondary/40 transition-colors">
                      <h4 className="text-sm font-bold text-primary">{c.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Facilities & Equipment Section (BASIC LIST BÊN TRÁI - HÌNH ẢNH BÊN PHẢI) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight uppercase">
              {settings.about_tech_title || "HỆ THỐNG KỸ THUẬT"}
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* CỘT TRÁI (7 COLUMNS): Nội dung Textarea thuần túy */}
            <div className="lg:col-span-7 flex flex-col gap-4 text-sm sm:text-base text-slate-700 leading-relaxed font-medium whitespace-pre-line">
              {settings.about_tech_content || `Trung tâm có hệ thống trang thiết bị hiện đại phục vụ chẩn đoán và theo dõi bệnh tim mạch:
• Siêu âm tim
• Siêu âm mạch máu
• Điện tâm đồ
• Holter điện tim dài ngày
• Holter huyết áp
• Thiết bị theo dõi điện tim tại nhà
• Hệ thống xét nghiệm chuyên nghiệp
• Dịch vụ lấy mẫu xét nghiệm tại nhà khi cần.

Đặc biệt, Trung tâm triển khai Holter điện tim dài ngày CAI-300, có khả năng theo dõi điện tim liên tục đến 14 ngày, góp phần nâng cao khả năng phát hiện các rối loạn nhịp tim xuất hiện không thường xuyên.

Các phương tiện chẩn đoán được kết nối với hệ thống lưu trữ dữ liệu số, hỗ trợ theo dõi lâu dài, đánh giá diễn biến bệnh theo thời gian và tạo thuận lợi cho việc hội chẩn các chuyên gia khi cần thiết.`}
            </div>

            {/* CỘT PHẢI (5 COLUMNS): Single Equipment Image */}
            <div className="lg:col-span-5 w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 relative group">
              <img
                src={settings.about_tech_image || "/assets/heart_care.png"}
                alt="Trang thiết bị máy móc y tế phòng khám"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                onError={(e) => { (e.target as HTMLImageElement).src = '/assets/heart_care.png'; }}
              />
            </div>

          </div>
        </section>

      </div>
    </MainLayout>
  );
}

