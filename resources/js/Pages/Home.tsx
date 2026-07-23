import React from "react";
import { Link } from "@inertiajs/react";
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  Phone, 
  Calendar, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  UserCheck, 
  HeartPulse 
} from "lucide-react";
import MainLayout from "@/Layouts/MainLayout";

interface ServiceDetail {
  id: number;
  slug: string;
  title: string;
  pillar_title: string;
  tagline: string;
  description: string;
  detailed_description: string;
  includes: string[];
  candidates: string[];
  price: string;
  estimated_time: string;
}

interface ServicePillar {
  id: number;
  title: string;
  tagline: string;
  description: string;
  icon_name: string;
  services: ServiceDetail[];
}

interface Article {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  read_time: string;
  date: string;
}

interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  subheading?: string;
  image_url: string;
  desktop_image?: string;
  mobile_image?: string;
  link?: string;
  primary_button_text?: string;
  primary_button_link?: string;
  secondary_button_text?: string;
  secondary_button_link?: string;
  order: number;
  is_active: boolean;
}

interface Review {
  id: number;
  patient_name: string;
  service_name?: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at?: string;
}

interface Props {
  servicePillars: ServicePillar[];
  latestNews: Article[];
  featuredServices: ServiceDetail[];
  banners?: Banner[];
  reviews?: Review[];
}

export default function Home({ servicePillars, latestNews, banners = [], reviews = [] }: Props) {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const activeBanners = banners.length > 0 ? banners : [
    {
      id: 1,
      eyebrow: 'Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi',
      title: 'Tầm Soát & Điều Trị Bệnh Tim Mạch Toàn Diện',
      subtitle: 'Chăm sóc trái tim khỏe mạnh chuẩn Y Khoa Quốc Tế',
      subheading: 'Ứng dụng hệ thống máy siêu âm Doppler tim hiện đại, đo Holter điện tâm đồ 24h kết hợp phác đồ điều trị cá nhân hóa.',
      image_url: '/assets/heart_care.png',
      desktop_image: '/assets/heart_care.png',
      mobile_image: '',
      link: '/lien-he',
      primary_button_text: 'Đặt Lịch Khám Ngay',
      primary_button_link: '/lien-he',
      secondary_button_text: 'Tìm Hiểu Dịch Vụ',
      secondary_button_link: '/dich-vu',
      order: 1,
      is_active: true
    }
  ];

  const currentBanner = activeBanners[currentSlideIndex % activeBanners.length];
  const isDefaultBanner = currentBanner.image_url === '/assets/heart_care.png' || 
                          currentBanner.desktop_image === '/assets/heart_care.png' ||
                          currentBanner.image_url?.endsWith('heart_care.png');

  const commitments = [
    { title: "Phát hiện sớm bệnh tim mạch", desc: "Khám chuyên khoa, xét nghiệm Holter, ECG, siêu âm kết hợp phân tích AI giúp phát hiện nguy cơ sớm nhất." },
    { title: "Điều trị đúng – Đáng tin cậy", desc: "Đội ngũ bác sĩ chuyên môn giỏi, quy trình chuẩn y khoa, minh bạch trong phác đồ điều trị." },
    { title: "Kết nối chuyên gia Trung ương", desc: "Hợp tác trực tiếp với các chuyên gia đầu ngành từ Viện Tim mạch Quốc gia, BV 108, BV Tim HN." },
    { title: "Phục vụ Tận tâm – Bảo mật", desc: "Lợi ích và sự an toàn của người bệnh luôn được đặt lên hàng đầu trong mọi hoạt động." }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Search":
        return <HeartPulse className="text-secondary" size={24} />;
      case "Stethoscope":
        return <Stethoscope className="text-secondary" size={24} />;
      case "Activity":
        return <Activity className="text-secondary" size={24} />;
      default:
        return <Heart className="text-secondary" size={24} />;
    }
  };

  return (
    <MainLayout>
      {/* 1. HERO BANNER SLIDER */}
      <section className="relative pt-[88px] pb-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[2.2/1] rounded-card overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 group">
            {/* Desktop Image */}
            <img 
              src={currentBanner.desktop_image || currentBanner.image_url || '/assets/heart_care.png'} 
              alt={currentBanner.title} 
              className={`w-full h-full object-cover transition-transform duration-700 ${currentBanner.mobile_image ? 'hidden md:block' : 'block'}`}
            />

            {/* Mobile Image (if specified) */}
            {currentBanner.mobile_image && (
              <img 
                src={currentBanner.mobile_image} 
                alt={currentBanner.title} 
                className="w-full h-full object-cover md:hidden block"
              />
            )}

            {/* Content Overlay */}
            {!isDefaultBanner && (
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-transparent flex items-center p-6 md:p-12 lg:p-16">
                <div className="max-w-xl text-white space-y-3 animate-fade-in">
                  {currentBanner.eyebrow && (
                    <span className="inline-block px-3 py-1 bg-secondary/90 backdrop-blur-xs text-white text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
                      {currentBanner.eyebrow}
                    </span>
                  )}
                  
                  <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-md">
                    {currentBanner.title}
                  </h1>

                  {currentBanner.subtitle && (
                    <p className="text-xs sm:text-base font-bold text-teal-200">
                      {currentBanner.subtitle}
                    </p>
                  )}

                  {currentBanner.subheading && (
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed line-clamp-2 hidden sm:block">
                      {currentBanner.subheading}
                    </p>
                  )}

                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    {(currentBanner.primary_button_text || currentBanner.link) && (
                      <Link
                        href={currentBanner.primary_button_link || currentBanner.link || '/lien-he'}
                        className="bg-secondary hover:bg-secondary-dark text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full shadow-md transition-all hover:scale-105 inline-flex items-center gap-2"
                      >
                        {currentBanner.primary_button_text || 'Đặt Lịch Khám Ngay'}
                        <ArrowRight size={16} />
                      </Link>
                    )}

                    {currentBanner.secondary_button_text && (
                      <Link
                        href={currentBanner.secondary_button_link || '#services'}
                        className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm px-6 py-2.5 sm:py-3 rounded-full backdrop-blur-xs transition-all hover:scale-105 border border-white/30"
                      >
                        {currentBanner.secondary_button_text}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Slider Dots Navigation (if > 1 banner) */}
            {activeBanners.length > 1 && (
              <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
                {activeBanners.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlideIndex(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      currentSlideIndex === idx ? 'w-8 bg-secondary' : 'w-2.5 bg-white/60 hover:bg-white'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. FEATURED SERVICES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs text-secondary font-bold uppercase tracking-wider">TẦM SOÁT & ĐIỀU TRỊ</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              Dịch Vụ Y Tế Nổi Bật
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
            <p className="text-sm text-text-light mt-2 leading-relaxed">
              Phòng khám cung cấp giải pháp khám và tầm soát tim mạch chất lượng cao với trang thiết bị y khoa hiện đại và đội ngũ chuyên gia tận tâm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gradient-to-b from-[#FCFCFC] to-[#E9F5F5] p-6 rounded-card flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 shadow-sm bg-slate-100">
                  <img 
                    src="/assets/screening_service.png" 
                    alt="Tầm soát tim mạch toàn diện" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-primary-dark transition-colors">
                  Tầm Soát Tim Mạch Toàn Diện
                </h3>
                <p className="text-xs text-text-light leading-relaxed mb-6">
                  Gói khám sức khỏe tim mạch chuyên sâu giúp phát hiện sớm các nguy cơ xơ vữa động mạch, suy tim, bệnh mạch vành tiềm ẩn.
                </p>
              </div>
              <Link 
                href="/dich-vu/kham-tim-mach-tong-quat" 
                className="flex items-center justify-center gap-2 border border-primary/20 hover:border-primary bg-white hover:bg-primary text-primary hover:text-white text-sm font-bold py-2.5 px-5 rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer w-full text-center"
              >
                Tìm hiểu thêm
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-b from-[#FCFCFC] to-[#E9F5F5] p-6 rounded-card flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 shadow-sm bg-slate-100">
                  <img 
                    src="/assets/holter_service.png" 
                    alt="Đo Holter Điện Tâm Đồ 24h" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-primary-dark transition-colors">
                  Đo Holter Điện Tâm Đồ 24h/48h
                </h3>
                <p className="text-xs text-text-light leading-relaxed mb-6">
                  Đeo thiết bị ghi nhịp tim liên tục suốt ngày đêm giúp chẩn đoán chính xác các cơn loạn nhịp tim thầm lặng, nguy cơ đột quỵ.
                </p>
              </div>
              <Link 
                href="/dich-vu/holter-dien-tim-24h-48h" 
                className="flex items-center justify-center gap-2 border border-primary/20 hover:border-primary bg-white hover:bg-primary text-primary hover:text-white text-sm font-bold py-2.5 px-5 rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer w-full text-center"
              >
                Tìm hiểu thêm
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-b from-[#FCFCFC] to-[#E9F5F5] p-6 rounded-card flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div>
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 shadow-sm bg-slate-100">
                  <img 
                    src="/assets/telehealth_service.png" 
                    alt="Quản lý Huyết áp từ xa AI" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3 group-hover:text-primary-dark transition-colors">
                  Quản Lý Huyết Áp Từ Xa AI
                </h3>
                <p className="text-xs text-text-light leading-relaxed mb-6">
                  Số hóa chỉ số đo huyết áp định kỳ tại nhà kết hợp phân tích AI và kết nối trực tuyến liên tục với bác sĩ chuyên khoa.
                </p>
              </div>
              <Link 
                href="/dich-vu/theo-doi-tim-mach-tu-xa" 
                className="flex items-center justify-center gap-2 border border-primary/20 hover:border-primary bg-white hover:bg-primary text-primary hover:text-white text-sm font-bold py-2.5 px-5 rounded-full shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer w-full text-center"
              >
                Tìm hiểu thêm
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. TRUSTBAR / CREDIBILITY SECTION */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            
            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                <Award size={24} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-extrabold text-primary leading-none">20+ Năm</p>
                <p className="text-xs text-text-light mt-1.5 leading-snug">BSCKII Đoàn Khôi trực tiếp khám</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                <UserCheck size={24} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-extrabold text-primary leading-none">10,000+</p>
                <p className="text-xs text-text-light mt-1.5 leading-snug">Bệnh nhân tin tưởng điều trị</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                <Activity size={24} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-extrabold text-primary leading-none">100% Chuẩn</p>
                <p className="text-xs text-text-light mt-1.5 leading-snug">Thiết bị siêu âm, holter hiện đại</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 transition-transform group-hover:scale-110">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-extrabold text-primary leading-none">Liên Kết Sâu</p>
                <p className="text-xs text-text-light mt-1.5 leading-snug">Viện Tim mạch QG, Bạch Mai, BV 108</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHT SERVICES SECTION (3 TRỤ CỘT BẢO VỆ) */}
      <section className="py-20 relative overflow-hidden bg-slate-50/30">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/services_bg_custom.jpg"
            alt="Dịch vụ chuyên sâu background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-sm font-bold uppercase tracking-wider text-secondary">Dịch vụ chuyên sâu</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
              3 TRỤ CỘT BẢO VỆ TRÁI TIM BỀN VỮNG
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
            <p className="text-sm text-text-light mt-2 leading-relaxed">
              Chúng tôi cung cấp dải dịch vụ hoàn chỉnh từ tầm soát phát hiện sớm đến điều trị dài hạn và theo dõi sức khỏe chủ động từ xa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicePillars.map((pillar) => (
              <div 
                key={pillar.id} 
                className="bg-white p-8 rounded-card border border-slate-100 shadow-[0_4px_12px_rgba(0,75,135,0.02)] hover:shadow-[0_12px_30px_rgba(0,75,135,0.06)] hover:bg-gradient-to-br hover:from-[#f0f9ff]/90 hover:to-[#e0f2fe]/90 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-primary/15"
              >
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(pillar.icon_name)}
                  </div>
                  <span className="text-sm text-secondary font-bold uppercase tracking-wider">{pillar.tagline}</span>
                  <h3 className="text-lg font-bold text-primary mt-2 mb-4 group-hover:text-primary-dark transition-colors">{pillar.title}</h3>
                  <p className="text-sm text-text-light leading-relaxed mb-6">{pillar.description}</p>
                  
                  <ul className="flex flex-col gap-2.5 mb-8">
                    {pillar.services.slice(0, 3).map((srv) => (
                      <li key={srv.id} className="flex items-center gap-2 text-sm font-medium text-text-primary">
                        <CheckCircle2 size={16} className="text-secondary shrink-0" />
                        <span className="truncate">{srv.title}</span>
                      </li>
                    ))}
                    {pillar.services.length > 3 && (
                      <li className="text-sm text-text-light italic font-medium pl-6">
                        + và {pillar.services.length - 3} dịch vụ chuyên sâu khác...
                      </li>
                    )}
                  </ul>
                </div>
                
                <Link 
                  href={`/dich-vu`} 
                  className="flex items-center justify-center gap-2 bg-slate-50 group-hover:bg-primary group-hover:text-white text-primary text-sm font-bold py-3 px-4 rounded-btn transition-all duration-300 w-full"
                >
                  Chi tiết dịch vụ
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link 
              href="/dich-vu"
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm px-8 py-3 rounded-btn shadow-md transition-all hover:scale-105"
            >
              Xem tất cả dịch vụ & Bảng giá
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BOOKING & ACTION BANNERS SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full rounded-card overflow-hidden transition-all duration-300 min-h-[260px] md:min-h-[300px] flex items-center bg-[#cbdbe5]">
            <img
              src="/assets/heart_stethoscope_banner.jpg"
              alt="Đặt lịch khám bệnh"
              className="absolute inset-0 w-full h-full object-cover object-right md:object-center z-0"
            />
            
            <div className="relative z-20 max-w-xl p-6 md:p-10 flex flex-col gap-3 text-text-primary">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-primary">
                Đặt Lịch Khám Bệnh Trực Tuyến
              </h3>
              
              <p className="text-sm text-text-primary font-medium leading-relaxed max-w-md">
                Đặt lịch khám nhanh chóng và thuận tiện. Bác sĩ chuyên khoa trực tiếp tư vấn, thăm khám.
              </p>
              
              <div className="mt-2">
                <Link 
                  href="/lien-he" 
                  className="bg-secondary hover:bg-secondary-dark text-white text-sm font-bold px-8 py-3 rounded-btn shadow-sm transition-all hover:scale-105 whitespace-nowrap cursor-pointer inline-block"
                >
                  Đặt lịch khám
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST NEWS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="max-w-xl text-center md:text-left flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Tin tức & Y học</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                CẬP NHẬT KIẾN THỨC SỨC KHỎE TIM MẠCH
              </h2>
              <div className="w-16 h-1 bg-secondary rounded-full md:mr-auto md:ml-0 mx-auto" />
            </div>
            <Link 
              href="/tin-tuc"
              className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 text-primary text-sm font-bold px-6 py-3 rounded-btn shadow-sm transition-all"
            >
              Xem tất cả bài viết
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <article 
                key={news.id}
                className="bg-white rounded-card overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-text-light mb-3">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-semibold">
                        {news.category}
                      </span>
                      <span>{news.read_time}</span>
                    </div>
                    <h3 className="text-base font-bold text-primary mb-3 hover:text-secondary transition-colors leading-snug line-clamp-2">
                      <Link href={`/tin-tuc/${news.slug}`}>{news.title}</Link>
                    </h3>
                    <p className="text-xs text-text-light leading-relaxed line-clamp-3 mb-4">
                      {news.excerpt}
                    </p>
                  </div>
                </div>
                
                <div className="p-6 pt-0 border-t border-slate-50 flex justify-between items-center text-xs text-text-light">
                  <span>Bởi {news.author}</span>
                  <Link 
                    href={`/tin-tuc/${news.slug}`}
                    className="text-secondary font-bold hover:underline inline-flex items-center gap-1 group"
                  >
                    Đọc tiếp
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMMITMENTS SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Cam kết chất lượng</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
              SỰ AN TÂM CỦA BỆNH NHÂN LÀ SỨ MỆNH CỦA CHÚNG TÔI
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {commitments.map((cmt, idx) => (
              <div key={idx} className="bg-white p-6 rounded-card border border-slate-100 shadow-[0_4px_12px_rgba(0,75,135,0.02)] hover:shadow-[0_10px_25px_rgba(0,75,135,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col gap-4 group">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary shrink-0 transition-transform group-hover:scale-110">
                  <Award size={22} />
                </div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide">{cmt.title}</h3>
                <p className="text-xs text-text-light leading-relaxed">{cmt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.5. PATIENT REVIEWS SHOWCASE SECTION */}
      {reviews.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Đánh giá & Cảm nhận</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">
                GHI NHẬN TỪ BỆNH NHÂN THĂM KHÁM
              </h2>
              <div className="w-16 h-1 bg-secondary mx-auto rounded-full" />
              <p className="text-xs text-text-light mt-1">
                Những chia sẻ chân thực từ người bệnh đã trải nghiệm dịch vụ khám và điều trị chuẩn y khoa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {reviews.slice(0, 3).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-50 p-6 rounded-card border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <span key={i} className="text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-700 italic leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-primary">{rev.patient_name}</h4>
                      {rev.service_name && (
                        <span className="text-[11px] text-secondary font-medium block">
                          {rev.service_name}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ Đã xác thực
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CALL TO ACTION BANNER (FULL WIDTH YOUMED STYLE) */}
      <section className="w-full bg-gradient-to-r from-primary to-[#0072c6] py-16 md:py-20 relative overflow-hidden text-white border-t border-b border-primary/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-0" />
        
        <svg className="absolute w-0 h-0" width="0" height="0">
          <defs>
            <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
              <path d="M0.5,0.18 C0.32,0.02 0.08,0.08 0.02,0.28 C-0.08,0.55 0.15,0.8 0.5,0.98 C0.85,0.8 1.08,0.55 0.98,0.28 C0.92,0.08 0.68,0.02 0.5,0.18 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text & Buttons */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Bảo vệ trái tim của bạn cùng BSCKII Đoàn Khôi
              </h3>
              <p className="text-sm md:text-base text-white/85 leading-relaxed max-w-xl">
                Đặt lịch hẹn tư vấn và tầm soát sớm nhất để hạn chế tối đa nguy cơ đột quỵ, nhồi máu cơ tim thầm lặng. Chúng tôi liên hệ lại để xác nhận lịch ngay.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center lg:justify-start items-center w-full sm:w-auto">
                <Link 
                  href="/lien-he" 
                  className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-primary text-sm font-bold px-8 py-3.5 rounded-full shadow-md transition-all hover:scale-105 text-center cursor-pointer whitespace-nowrap"
                >
                  <Calendar size={18} />
                  Đặt lịch hẹn trực tuyến
                </Link>
                <a 
                  href="tel:0384326785" 
                  className="flex items-center justify-center gap-2 border border-white/30 hover:border-white bg-transparent hover:bg-white/10 text-white text-sm font-bold px-8 py-3.5 rounded-full transition-all text-center cursor-pointer whitespace-nowrap"
                >
                  <Phone size={18} className="text-secondary" />
                  Gọi trực tiếp: 038 432 6785
                </a>
              </div>
            </div>

            {/* Right Column: Heart-shaped image container with rings */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
                {/* Decorative concentric rings in background */}
                <div className="absolute inset-0 border border-white/20 rounded-full scale-[1.12]" />
                <div className="absolute inset-0 border border-white/10 rounded-full scale-[1.24]" />
                
                {/* Heart container */}
                <div 
                  className="relative w-full h-full bg-white/10 overflow-hidden border-2 border-white/20 shadow-xl transition-transform duration-500 hover:scale-105"
                  style={{ clipPath: "url(#heart-clip)" }}
                >
                  <img
                    src="/assets/family.png"
                    alt="Gia đình hạnh phúc"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
