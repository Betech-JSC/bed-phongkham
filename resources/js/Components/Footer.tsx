import { Link, usePage } from "@inertiajs/react";
import { MapPin, Phone, Mail, Clock, ShieldCheck, HeartPulse } from "lucide-react";

export default function Footer() {
  const { props } = usePage();
  const settings = (props as any).settings || {};
  
  const clinicName = settings.clinic_name || 'Phòng Khám Chuyên Khoa Nội - BSCKII Đoàn Khôi';
  const address = settings.address || '348 Nguyễn Lương Bằng, Lê Thanh Nghị, Hải Phòng';
  const hotline1 = settings.hotline_1 || '038 432 6785';
  const hotline1Clean = settings.hotline_1_clean || '0384326785';
  const hotline2 = settings.hotline_2 || '0328 699 799';
  const hotline2Clean = settings.hotline_2_clean || '0328699799';
  const email = settings.email || 'doankhoiclinic@gmail.com';

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-white to-[#f0f7ff] text-text-light border-t border-slate-200 pt-16 pb-8 overflow-hidden">
      {/* Background Cardiology Patterns (EKG Waves) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.035] text-secondary">
        {/* Left EKG Line */}
        <svg className="absolute left-[-50px] bottom-[-20px] w-[350px] h-[150px]" viewBox="0 0 300 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M 0,50 L 70,50 L 78,45 L 83,55 L 90,50 L 98,50 L 105,20 L 115,80 L 125,50 L 138,50 L 143,55 L 148,45 L 155,50 L 300,50" />
        </svg>
        {/* Right EKG Line */}
        <svg className="absolute right-[-30px] bottom-[-10px] w-[400px] h-[180px]" viewBox="0 0 300 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M 0,50 L 120,50 L 128,45 L 133,55 L 140,50 L 148,50 L 155,20 L 165,80 L 175,50 L 188,50 L 193,55 L 198,45 L 205,50 L 300,50" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Info & Intro */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <img
                  src={settings.logo_dark || "/assets/logo.png"}
                  alt="Phòng khám BSCKII Đoàn Khôi Logo"
                  className="w-11 h-11 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold text-primary tracking-tight leading-none uppercase">
                  Phòng Khám Nội
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">
                  BSCKII Đoàn Khôi
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-light leading-relaxed mt-2">
              Trung tâm quản lý tim mạch cộng đồng hàng đầu tại Hải Phòng. Tận tâm - Chuyên sâu - An toàn - Số hóa kết nối chuyên gia đầu ngành.
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs text-text-light">
              <ShieldCheck size={16} className="text-secondary" />
              <span>Đạt tiêu chuẩn chất lượng Sở Y tế Hải Phòng</span>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-2.5 mt-4">
              {settings.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#1877f2] text-slate-500 hover:text-white flex items-center justify-center transition-all shadow-xs border border-slate-200/50 hover:scale-105"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {settings.zalo_link && (
                <a
                  href={settings.zalo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#0068ff] text-slate-500 hover:text-white flex items-center justify-center transition-all shadow-xs border border-slate-200/50 hover:scale-105"
                  aria-label="Zalo"
                >
                  <span className="text-[10px] font-black uppercase tracking-tighter">Zalo</span>
                </a>
              )}
              {settings.social_youtube && (
                <a
                  href={settings.social_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#ff0000] text-slate-500 hover:text-white flex items-center justify-center transition-all shadow-xs border border-slate-200/50 hover:scale-105"
                  aria-label="Youtube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.508 9.388.508 9.388.508s7.518 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-secondary">
              Liên kết nhanh
            </h4>
            <ul className="flex flex-col gap-3.5 text-sm">
              <li>
                <Link href="/" className="hover:text-primary hover:underline transition-all">Trang chủ</Link>
              </li>
              <li>
                <Link href="/gioi-thieu" className="hover:text-primary hover:underline transition-all">Giới thiệu bác sĩ</Link>
              </li>
              <li>
                <Link href="/dich-vu" className="hover:text-primary hover:underline transition-all">Dịch vụ y khoa</Link>
              </li>
              <li>
                <Link href="/tin-tuc" className="hover:text-primary hover:underline transition-all">Tin tức & Y học</Link>
              </li>
              <li>
                <Link href="/lien-he" className="hover:text-primary hover:underline transition-all">Đặt lịch khám bệnh</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Working Hours */}
          <div>
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-secondary">
              Thời gian khám bệnh
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="text-secondary shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="font-bold text-primary">Thứ Hai - Chủ Nhật</p>
                  <p className="text-xs text-text-light mt-0.5">Sáng: 07:30 – 11:30</p>
                  <p className="text-xs text-text-light mt-0.5">Chiều: 13:30 – 18:30</p>
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-slate-200 pt-3">
                <HeartPulse className="text-accent shrink-0 mt-0.5" size={18} />
                <p className="text-xs text-text-light">
                  Khám trực tiếp với Bác sĩ Đoàn Khôi. Đăng ký trước để hạn chế thời gian chờ đợi.
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-0.5 after:bg-secondary">
              Thông tin liên hệ
            </h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-secondary shrink-0 mt-1" size={18} />
                <span className="text-text-light">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-secondary shrink-0" size={18} />
                <div>
                  <a href={`tel:${hotline1Clean}`} className="hover:text-primary block font-bold text-primary">
                    {hotline1}
                  </a>
                  <a href={`tel:${hotline2Clean}`} className="hover:text-primary block text-xs text-text-light">
                    {hotline2}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-secondary shrink-0" size={18} />
                <a href={`mailto:${email}`} className="hover:text-primary truncate">
                  {email}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-200 my-8"></div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {currentYear} {clinicName}. Đã đăng ký bản quyền. Giấy phép hoạt động Sở Y tế Hải Phòng.</p>
          <div className="flex gap-4">
            <Link href="/lien-he" className="hover:text-primary">Chính sách bảo mật</Link>
            <Link href="/lien-he" className="hover:text-primary">Điều khoản dịch vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
