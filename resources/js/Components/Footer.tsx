import { Link, usePage } from "@inertiajs/react";
import { MapPin, Phone, Mail, Clock, Heart, ShieldCheck } from "lucide-react";

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
  const workingHours = settings.working_hours || 'Sáng: 07:30 – 11:30 | Chiều: 13:30 – 18:30 (Thứ 2 - Chủ Nhật)';

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: About */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="MediPlus HP Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <span className="text-base font-extrabold text-white uppercase tracking-tight">
                MediPlus HP
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              {clinicName}. Trực tiếp thăm khám và điều trị bởi BSCKII Đoàn Khôi gần 20 năm kinh nghiệm.
            </p>
            <div className="flex items-center gap-2 text-xs text-secondary font-semibold">
              <ShieldCheck size={16} />
              <span>Chuyên môn y khoa chuẩn mực – Tận tâm</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Liên Kết Nhanh</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-secondary transition-colors">Trang chủ</Link></li>
              <li><Link href="/gioi-thieu" className="hover:text-secondary transition-colors">Giới thiệu BSCKII Đoàn Khôi</Link></li>
              <li><Link href="/dich-vu" className="hover:text-secondary transition-colors">Các dịch vụ tầm soát & điều trị</Link></li>
              <li><Link href="/tin-tuc" className="hover:text-secondary transition-colors">Tin tức & Cẩm nang tim mạch</Link></li>
              <li><Link href="/lien-he" className="hover:text-secondary transition-colors">Đăng ký đặt lịch hẹn</Link></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dịch Vụ Nổi Bật</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              <li><Link href="/dich-vu/kham-tim-mach-tong-quat" className="hover:text-secondary transition-colors">Khám tim mạch tổng quát</Link></li>
              <li><Link href="/dich-vu/tam-soat-tang-huyet-ap" className="hover:text-secondary transition-colors">Tầm soát tăng huyết áp</Link></li>
              <li><Link href="/dich-vu/holter-dien-tim-24h-48h" className="hover:text-secondary transition-colors">Đo Holter điện tim 24h</Link></li>
              <li><Link href="/dich-vu/quan-ly-suy-tim-chuyen-sau" className="hover:text-secondary transition-colors">Quản lý suy tim chuyên sâu</Link></li>
              <li><Link href="/dich-vu/kham-tim-mach-cong-dong" className="hover:text-secondary transition-colors">Khám tim mạch tại nhà</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Thông Tin Liên Hệ</h4>
            <ul className="flex flex-col gap-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-secondary shrink-0" />
                <span><a href={`tel:${hotline1Clean}`} className="hover:text-white">{hotline1}</a> - <a href={`tel:${hotline2Clean}`} className="hover:text-white">{hotline2}</a></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-secondary shrink-0" />
                <span>{email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock size={16} className="text-secondary shrink-0 mt-0.5" />
                <span>{workingHours}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {clinicName}. Tất cả quyền được bảo lưu.</p>
          <p className="flex items-center gap-1">
            Thiết kế cho sức khỏe trái tim <Heart size={14} className="text-accent fill-accent" /> tại Hải Phòng
          </p>
        </div>
      </div>
    </footer>
  );
}
