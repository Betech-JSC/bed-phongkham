import Image from "next/image";
import Link from "next/link";
import { 
  Award, 
  BookOpen, 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Stethoscope 
} from "lucide-react";

export const metadata = {
  title: "Giới thiệu Bác sĩ & Phòng khám - Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi",
  description: "Tìm hiểu về BSCKII Đoàn Khôi với gần 20 năm kinh nghiệm tim mạch và cơ sở vật chất phòng khám chuyên khoa nội - BSCKII Đoàn Khôi Hải Phòng.",
};

export default function AboutPage() {
  const achievements = [
    "Gần 20 năm kinh nghiệm thăm khám và điều trị lâm sàng chuyên khoa Nội - Tim mạch.",
    "Nguyên Bác sĩ chuyên khoa khám chữa bệnh nội khoa tại các bệnh viện tuyến đầu.",
    "Liên kết chuyên môn sâu rộng với Viện Tim mạch Quốc gia, BV 108, BV Tim Hà Nội.",
    "Thành viên Hội Tim mạch học Việt Nam (VNHA).",
    "Tiên phong ứng dụng mô hình số hóa và AI trong theo dõi huyết áp, điện tim từ xa tại Hải Phòng."
  ];

  const coreStandards = [
    { title: "Phát hiện sớm bệnh lý", desc: "Tầm soát và phát hiện các nguy cơ tim mạch ở giai đoạn khởi phát chưa biến chứng." },
    { title: "Theo dõi & điều trị liên tục", desc: "Đảm bảo quá trình điều trị không bị gián đoạn, phục hồi sức khỏe trái tim bền vững." },
    { title: "Quản lý chủ động ngoài bệnh viện", desc: "Theo dõi và chăm sóc chỉ số huyết áp, nhịp tim định kỳ ngay tại nhà của người bệnh." },
    { title: "Kết nối chuyên gia tuyến trên", desc: "Liên kết trực tiếp với các chuyên gia đầu ngành từ Viện Tim mạch Quốc gia, BV 108, BV Tim Hà Nội." },
    { title: "Ứng dụng AI & Dữ liệu số", desc: "Áp dụng trí tuệ nhân tạo và số hóa dữ liệu điện tim, huyết áp để tối ưu hóa chẩn đoán." }
  ];

  const facilities = [
    {
      title: "Holter điện tâm đồ 24h-48h",
      desc: "Thiết bị đeo ngực thế hệ mới nhỏ gọn, không thấm nước, ghi lại từng nhịp đập của tim suốt ngày đêm để phát hiện loạn nhịp âm thầm."
    },
    {
      title: "Siêu âm tim Doppler màu chuyên sâu",
      desc: "Hệ thống siêu âm hiện đại giúp dựng hình ảnh cấu trúc van tim, đánh giá chính xác lực bóp và vận động vùng của cơ tim."
    },
    {
      title: "Đo huyết áp tự động chuẩn hóa",
      desc: "Thiết bị đo đạt chứng nhận lâm sàng quốc tế kết hợp lưu trữ chỉ số điện tử giúp đánh giá mức độ dao động huyết áp chuẩn y khoa."
    },
    {
      title: "Hệ thống số hóa dữ liệu bệnh án",
      desc: "Số hóa toàn bộ hồ sơ điện tim, huyết áp giúp liên kết nhanh với các chuyên gia tuyến Trung ương khi có ca bệnh khó."
    }
  ];

  return (
    <div className="bg-neutral-bg min-h-screen pt-24 pb-20">
      
      {/* Page Header */}
      <section className="relative text-white py-20 md:py-28 overflow-hidden bg-slate-900">
        <Image
          src="/assets/about_banner.jpg"
          alt="Giới thiệu banner"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-950/40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            GIỚI THIỆU
          </h1>
          <div className="w-20 h-1 bg-secondary rounded-full" />
        </div>
      </section>

      {/* Doctor Bio Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-start">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] rounded-card overflow-hidden shadow-2xl border-4 border-white bg-slate-100">
              <Image
                src="/assets/doctor_khoi.png"
                alt="BSCKII Đoàn Khôi"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="bg-white p-6 rounded-card shadow-sm text-center">
              <h3 className="font-bold text-primary text-base">BSCKII Đoàn Khôi</h3>
              <p className="text-xs text-text-light mt-1">Chuyên gia cố vấn chuyên môn & Trực tiếp thăm khám</p>
              <div className="flex justify-center gap-1.5 mt-3 text-secondary">
                <Award size={16} />
                <span className="text-xs font-semibold">Hội viên Hội Tim mạch học Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Người sáng lập & Chuyên môn</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                BSCKII ĐOÀN KHÔI
              </h2>
              <p className="text-base font-medium italic text-text-light">
                &ldquo;Trái tim khỏe mạnh là nền tảng của cuộc sống bình an. Chúng tôi cống hiến hết mình để bảo vệ nhịp đập trái tim bạn.&rdquo;
              </p>
            </div>
            
            <div className="h-px bg-slate-200 w-full my-2"></div>
            
            <p className="text-sm text-text-light leading-relaxed">
              Với gần 20 năm làm việc trong lĩnh vực nội khoa tim mạch, <strong>Bác sĩ chuyên khoa II Đoàn Khôi</strong> là một trong những chuyên gia uy tín hàng đầu tại Hải Phòng. Bác sĩ Khôi đã trực tiếp điều trị thành công hàng ngàn ca bệnh lý tim mạch phức tạp, từ tăng huyết áp mãn tính, suy cơ tim tiến triển, đến chẩn đoán sớm và xử trí các cơn loạn nhịp tim nguy hiểm.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                <BookOpen size={18} className="text-secondary" />
                Quá trình công tác & Điểm nhấn chuyên môn:
              </h3>
              <ul className="flex flex-col gap-3">
                {achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-text-primary">
                    <CheckCircle2 size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <Link
                href="/lien-he"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white text-sm font-bold px-6 py-3 rounded-btn shadow-md transition-all hover:scale-105 cursor-pointer"
              >
                <Calendar size={16} />
                Đặt lịch khám với Bác sĩ
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Vision card */}
            <div className="bg-slate-800/40 p-8 rounded-card flex flex-col gap-4">
              <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
                <Heart size={20} />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Tầm nhìn chiến lược</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Trở thành phòng khám chuyên khoa nội tim mạch số mẫu mực hàng đầu tại Hải Phòng. Tiên phong thiết lập mạng lưới quản lý bệnh tim mạch mãn tính từ xa, giúp bệnh nhân được bác sĩ chuyên khoa bảo vệ liên tục ngay cả khi ở nhà, giảm tỷ lệ biến chứng đột tử hoặc đột quỵ.
              </p>
            </div>

            {/* Mission card */}
            <div className="bg-slate-800/40 p-8 rounded-card flex flex-col gap-4">
              <div className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider">Sứ mệnh y khoa</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Đem đến dịch vụ y tế an toàn, chuyên nghiệp, chuẩn mực y khoa cao nhất nhưng vô cùng gần gũi với người dân địa phương. Kết nối nhanh chóng với các bệnh viện chuyên khoa lớn nhất cả nước, tạo ra điểm tựa y tế vững chắc và đáng tin cậy cho mọi gia đình.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5 Core Standards Section (Migrated from Homepage) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Mô hình & Mục tiêu</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              MÔ HÌNH CHĂM SÓC SỨC KHỎE TIM MẠCH TOÀN DIỆN
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
            <p className="text-base text-text-light mt-2">
              Chúng tôi xây dựng giải pháp chăm sóc tim mạch khép kín, tối ưu hóa công nghệ số và kết nối chuyên gia đầu ngành để bảo vệ sự bình an của trái tim bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Doctor Quick Profile */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="relative w-full h-[450px] sm:h-[500px] lg:h-[450px] xl:h-[500px] rounded-card overflow-hidden shadow-lg bg-slate-50">
                <Image 
                  src="/assets/doctor_khoi.png" 
                  alt="BSCKII Đoàn Khôi" 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent p-6 text-white">
                  <h3 className="text-xl font-bold">BSCKII Đoàn Khôi</h3>
                  <p className="text-sm text-secondary font-medium">Chuyên khoa Nội - Tim mạch</p>
                  <p className="text-xs text-slate-300 mt-1">Gần 20 năm kinh nghiệm chuyên sâu thăm khám và điều trị nội - tim mạch</p>
                </div>
              </div>
            </div>

            {/* Right side: 5 standards */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <h3 className="text-lg font-bold text-primary uppercase tracking-wide mb-2 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-secondary" />
                5 Tiêu chuẩn chăm sóc cốt lõi:
              </h3>
              
              <div className="flex flex-col gap-4">
                {coreStandards.map((std, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-primary">{std.title}</h4>
                      <p className="text-sm text-text-light mt-1 leading-relaxed">{std.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Facilities & Equipment Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary">Trang thiết bị y tế</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
            CƠ SỞ VẬT CHẤT & THIẾT BỊ HIỆN ĐẠI
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          <p className="text-sm text-text-light mt-2">
            Phòng khám được đầu tư bài bản, trang bị các thiết bị chuyên sâu chuẩn y khoa hỗ trợ chẩn đoán chính xác tuyệt đối các bệnh lý tim mạch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-card shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary shrink-0">
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-primary text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-text-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
